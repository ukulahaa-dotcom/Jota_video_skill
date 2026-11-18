// Jalankan satu perintah runner VideoExpress (apps/videoexpress-runner/runner.mjs) di PC dengan kunci 'videoexpress' yang sama
// dengan worker jota.mjs daemon, supaya tidak bentrok profil browser. Dipakai untuk uji Artistly -> VideoExpress (owner 2026-11-16).
// pakai: node jalankan-vx.mjs <perintah runner> [arg...]
//
// Khusus `run <shots.json>` (2026-11-18):
//   1. Gerbang QC gambar: gambar shot yang akan dikirim dicek dulu (qc-gambar-shot.mjs). Ada yang perlu dilihat -> berhenti
//      sebelum render. Lewati dengan --paksa setelah gambar ditinjau mata.
//   2. Impor ulang otomatis: picker VideoExpress hanya menampilkan gambar terbaru, gambar lama "tidak ditemukan"
//      (Dzulqarnain 2026-11-17: SHOT21-37). Gambar itu diimpor ulang dari peta gambarSumber() lalu run diulang, maks 3 putaran.
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

const release = lock('videoexpress');
try {
  const logFile = path.join(state, `vx-${cmd}.log`);
  for (let putaran = 1; ; putaran++) {
    const awal = fs.existsSync(logFile) ? fs.statSync(logFile).size : 0;
    await command('runner.mjs', [cmd, ...rest], { cwd: app, log: logFile, timeout: 3 * 3600000 });
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
    // Diimpor dari nomor terbesar ke terkecil seperti perbaikan manual 2026-11-17 (37..21).
    for (const n of bisa.sort().reverse()) await command('runner.mjs', ['impor-artistly', peta[n], n], { cwd: app, log: path.join(state, 'vx-impor-artistly.log'), timeout: 600000 });
  }
  console.log('VX_OK ' + cmd);
} finally { release(); }
