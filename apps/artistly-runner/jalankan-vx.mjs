// Jalankan satu perintah runner VideoExpress (apps/videoexpress-runner/runner.mjs) di PC dengan kunci 'videoexpress' yang sama
// dengan worker jota.mjs daemon, supaya tidak bentrok profil browser. Dipakai untuk uji Artistly -> VideoExpress (owner 2026-11-16).
// pakai: node jalankan-vx.mjs <perintah runner> [arg...]
//
// Khusus `run <shots.json>` (2026-11-18):
//   1. Gerbang QC gambar: gambar shot yang akan dikirim dicek dulu (qc-gambar-shot.mjs). Ada yang perlu dilihat -> berhenti
//      sebelum render. Lewati dengan --paksa setelah gambar ditinjau mata.
//   2. Impor ulang otomatis: picker VideoExpress hanya menampilkan gambar terbaru, gambar lama "tidak ditemukan"
//      (Dzulqarnain 2026-11-17: SHOT21-37). Gambar itu diimpor ulang dari peta gambarSumber() lalu run diulang, maks 3 putaran.
//   3. Impor awal: gambar yang belum tercatat di local-state/vx-galeri.json diimpor sebelum run pertama (hemat ~2 menit/gambar
//      pencarian sia-sia). Catatan diisi otomatis setiap impor dan setiap shot yang terkirim.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const LOCAL = process.env.JOTA_RUNNER_LOCAL || 'E:/JOTA-Standby/Jota_runner/local';
const APP = 'E:/JOTA-Standby/Jota_Content_Factory/apps/artistly-runner';
const { state, app, command, lock } = await import(pathToFileURL(path.join(LOCAL, 'runtime.mjs')).href);
const argv = process.argv.slice(2);
const paksa = argv.includes('--paksa');
const [cmd, ...rest] = argv.filter((a) => a !== '--paksa');
if (!cmd) throw new Error('pakai: node jalankan-vx.mjs <perintah> [arg...] [--paksa]');

// Shot yang akan dikirim pada run ini: belum pernah selesai/terkirim, atau ada di daftar regen revisi baru.
function shotTertunda(shotsFile) {
  const s = JSON.parse(fs.readFileSync(shotsFile, 'utf8'));
  const pf = path.join(path.dirname(shotsFile), 'progress.json');
  const pr = fs.existsSync(pf) ? JSON.parse(fs.readFileSync(pf, 'utf8')) : { shots: {} };
  const revBaru = (s.revision || 1) > (pr.revision || 0);
  return s.shots.map((x) => x.id).filter((id) => {
    const st = pr.shots?.[id]?.status;
    return !['CLIP_READY', 'SUBMITTED'].includes(st) || (revBaru && (s.regen || []).includes(id));
  });
}

// Gerbang prompt HDT (owner 2026-11-18, FATAL): tanpa SPEED 1x, tanpa gerak per tokoh, atau ada kata lambat/serempak
// -> berhenti. Tidak bisa dilewati --paksa.
if (cmd === 'run' && rest[0]) {
  const { cekShotsFile } = await import(pathToFileURL(path.join(APP, 'prompt-hdt.mjs')).href);
  const salah = cekShotsFile(JSON.parse(fs.readFileSync(rest[0], 'utf8')), shotTertunda(rest[0]));
  if (salah.length) { console.log(`BERHENTI: prompt melanggar aturan HDT-JOTA:\n- ${salah.join('\n- ')}`); process.exit(3); }
}

if (cmd === 'run' && rest[0] && !paksa) {
  const tunda = shotTertunda(rest[0]);
  if (tunda.length) {
    console.log(`QC gambar sebelum render: ${tunda.join(',')}`);
    try { execFileSync(process.execPath, [path.join(APP, 'qc-gambar-shot.mjs'), path.dirname(rest[0]), '--shot', tunda.join(',')], { stdio: 'inherit' }); }
    catch (e) {
      if (e.status === 2) { console.log('BERHENTI: ada gambar yang perlu dilihat (lihat qc-gambar/*-tanda.jpg). Ganti gambarnya, atau jalankan ulang dengan --paksa setelah ditinjau mata.'); process.exit(2); }
      throw e;
    }
  }
}

// Galeri VideoExpress yang diketahui (local-state/vx-galeri.json, nama -> waktu): gambar yang pernah diimpor atau pernah
// berhasil dipakai render. Ashabul Kahfi 2026-11-18: 29 gambar baru belum diimpor, run mencari satu per satu (~2 menit/gambar)
// lalu gagal semua; 1 jam terbuang sebelum impor ulang berjalan. Sekarang gambar baru diimpor DULU sebelum run.
const GALERI = path.join(state, 'vx-galeri.json');
const bacaGaleri = () => { try { return JSON.parse(fs.readFileSync(GALERI, 'utf8')); } catch { return {}; } };
function catatGaleri(nama) {
  if (!nama.length) return;
  const g = bacaGaleri(); const t = new Date().toISOString();
  for (const n of nama) g[n] = t;
  fs.writeFileSync(GALERI, JSON.stringify(g, null, 1));
}
const gambarShot = (shotsFile, ids) => {
  const s = JSON.parse(fs.readFileSync(shotsFile, 'utf8'));
  return [...new Set(s.shots.filter((x) => !ids || ids.includes(x.id)).map((x) => x.start?.image).filter(Boolean))];
};
async function imporGambar(nama, peta) {
  // Diimpor dari nomor terbesar ke terkecil seperti perbaikan manual 2026-11-17 (37..21).
  for (const n of [...nama].sort().reverse()) {
    await command('runner.mjs', ['impor-artistly', peta[n], n], { cwd: app, log: path.join(state, 'vx-impor-artistly.log'), timeout: 600000 });
    catatGaleri([n]);
  }
}

const release = lock('videoexpress');
try {
  const logFile = path.join(state, `vx-${cmd}.log`);
  if (cmd === 'run' && rest[0]) {
    const { gambarSumber } = await import(pathToFileURL(path.join(APP, 'qc-gambar-shot.mjs')).href);
    const peta = gambarSumber(path.dirname(rest[0]));
    const galeri = bacaGaleri();
    const baru = gambarShot(rest[0], shotTertunda(rest[0])).filter((n) => !galeri[n] && peta[n] && fs.existsSync(peta[n]));
    if (baru.length) {
      console.log(`impor awal: ${baru.length} gambar belum pernah masuk galeri VideoExpress: ${baru.join(' ')}`);
      await imporGambar(baru, peta);
    }
  }
  for (let putaran = 1; ; putaran++) {
    const awal = fs.existsSync(logFile) ? fs.statSync(logFile).size : 0;
    await command('runner.mjs', [cmd, ...rest], { cwd: app, log: logFile, timeout: 3 * 3600000 });
    if (cmd === 'run' && rest[0]) {
      // Shot yang sudah terkirim/selesai -> gambarnya terbukti ada di galeri.
      const pf = path.join(path.dirname(rest[0]), 'progress.json');
      const pr = fs.existsSync(pf) ? JSON.parse(fs.readFileSync(pf, 'utf8')) : { shots: {} };
      const ok = Object.entries(pr.shots || {}).filter(([, v]) => ['CLIP_READY', 'SUBMITTED'].includes(v.status)).map(([id]) => id);
      catatGaleri(gambarShot(rest[0], ok));
    }
    if (cmd !== 'run' || !rest[0] || putaran > 3) break;
    const baru = fs.readFileSync(logFile).subarray(awal).toString();
    const hilang = [...new Set([...baru.matchAll(/Gambar "([^"]+)" tidak ditemukan/g)].map((m) => m[1]))];
    if (!hilang.length) break;
    const { gambarSumber } = await import(pathToFileURL(path.join(APP, 'qc-gambar-shot.mjs')).href);
    const peta = gambarSumber(path.dirname(rest[0]));
    const bisa = hilang.filter((n) => peta[n] && fs.existsSync(peta[n]));
    console.log(`putaran ${putaran}: ${hilang.length} gambar tidak ditemukan di picker, impor ulang ${bisa.length}: ${bisa.join(' ')}`);
    if (bisa.length < hilang.length) console.log(`tanpa file sumber (impor manual): ${hilang.filter((n) => !bisa.includes(n)).join(' ')}`);
    if (!bisa.length) break;
    await imporGambar(bisa, peta);
  }
  console.log('VX_OK ' + cmd);
} finally { release(); }
