// QC klip VideoExpress per klip, FIFO dan paralel dengan render/unduh (owner 2026-11-18: "pararel check workflow,
// bukan series, tidak perlu menunggu semua selesai, first in first out check").
//
// Tiap klip yang muncul di folder produksi (unduhan LABEL.mp4 di akar folder atau klip/*.mp4) langsung masuk antrean
// menurut waktu tibanya. Dua tahap berjalan bersamaan seperti ban berjalan:
//   tahap A (CPU): ekstrak 1 frame/detik + qc-cepat.py (YOLO orang, YuNet wajah, potongan kepala)
//   tahap B (GPU): potongan kepala -> VLM lokal (llama-server tetap menyala, 2 permintaan sekaligus)
// Sementara klip N di tahap B, klip N+1 sudah di tahap A.
//
// Vonis per klip (qc-klip/hasil.json dan satu baris log):
//   LULUS        tidak ada kepala berfitur, adegan 'none' tanpa orang
//   CEK_WAJAH    kepala (kotak YOLO atau deteksi YuNet) yang menurut VLM bermata/hidung/mulut -> lihat lembar *-tanda.jpg
//   CEK_ORANG    adegan people 'none' tetapi YOLO menemukan orang di >= 2 frame (sosok kecil di hook Dzulqarnain SHOT01)
//   CEK_SUARA    suara bawaan klip berisi ucapan manusia menurut Whisper lokal (qc-suara.py); detail di hasil.json "suara"
//
// pakai: node qc-klip.mjs <folder_produksi> [--pantau] [--diam MENIT] [file.mp4 ...]
//   tanpa --pantau: cek klip yang ada lalu selesai. --pantau: terus memantau sampai tidak ada klip baru selama --diam menit (default 30).
import fs from 'node:fs';
import path from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run = promisify(execFile); // tahap A async agar tahap B (fetch ke llama-server) tetap jalan bersamaan
// Aturan potong/filter/VLM ada di qc-kepala-lib.mjs (sama dengan gerbang gambar qc-gambar-shot.mjs).
import {pathToFileURL} from 'node:url';

const ROOT = 'E:/JOTA-Standby';
const APP = path.join(ROOT, 'Jota_Content_Factory/apps/artistly-runner');
const FF = path.join(ROOT, 'tools/ffmpeg/ffmpeg-9.0.2-essentials_build/bin/ffmpeg.exe');
const {potongKepala, cekDaftarKepala, buatLembar, PY} = await import(pathToFileURL(path.join(APP, 'qc-kepala-lib.mjs')).href);
const {pastikanServer} = await import(pathToFileURL(path.join(APP, 'vlm-server.mjs')).href);

const argv = process.argv.slice(2);
const pantau = argv.includes('--pantau');
const diamMenit = Number(argv[argv.indexOf('--diam') + 1]) || 30;
const pos = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--diam');
const [folder, ...fileManual] = pos;
if (!folder) throw new Error('pakai: node qc-klip.mjs <folder_produksi> [--pantau] [--diam MENIT] [file.mp4 ...]');
const QC = path.join(folder, 'qc-klip');
fs.mkdirSync(QC, {recursive: true});
const HASIL = path.join(QC, 'hasil.json');
const hasil = fs.existsSync(HASIL) ? JSON.parse(fs.readFileSync(HASIL, 'utf8')) : {};
const simpan = () => fs.writeFileSync(HASIL, JSON.stringify(hasil, null, 1));
const log = (s) => { const l = `[${new Date().toLocaleTimeString()}] ${s}`; console.log(l); fs.appendFileSync(path.join(QC, 'qc.log'), l + '\n'); };

// people per SHOT dari shots.json (people 'none' = adegan kosong).
const orangShot = {}, aksiShot = {};
try { for (const s of JSON.parse(fs.readFileSync(path.join(folder, 'shots.json'), 'utf8')).shots) { orangShot[s.id] = s.people; aksiShot[s.id] = (String(s.video_prompt || '').match(/ACTION:([^\n]*)/) || [])[1] || ''; } } catch {}
// Klip berpindah tempat (berjalan/berkuda/berbaris). Owner 2026-11-18 Dzulqarnain SHOT15: kuda menghadap kamera tetapi
// bergerak menjauh (berjalan mundur). Uji VLM lokal 4B: tidak mampu menilai arah gerak dari frame (melewatkan SHOT15,
// salah menandai SHOT36), jadi klip ini diberi strip 3 frame (10/50/90%) dan WAJIB dilihat agen: arah gerak = arah hadap.
const PINDAH = /\b(rides?|riding|walks?|walking|march(es|ing)?|gallop(s|ing)?|trot(s|ting)?|runs?|running|carry(ing)? .* forward|moves? forward|travel(s|ling)?|column|procession)\b/i;
const shotDari = (f) => (path.basename(f).match(/SHOT\d\d/) || [])[0];

const kunci = (f) => { const s = fs.statSync(f); return `${path.basename(f)}|${s.size}`; };
function cariKlip() {
  if (fileManual.length) return fileManual.filter((f) => fs.existsSync(f));
  const dirs = [folder, path.join(folder, 'klip')];
  const all = dirs.flatMap((d) => (fs.existsSync(d) ? fs.readdirSync(d).filter((n) => /SHOT\d\d.*\.mp4$/i.test(n)).map((n) => path.join(d, n)) : []));
  return all.filter((f) => fs.statSync(f).size > 100000 && Date.now() - fs.statSync(f).mtimeMs > 3000) // abaikan yang masih ditulis
    .sort((a, b) => fs.statSync(a).mtimeMs - fs.statSync(b).mtimeMs); // FIFO menurut waktu tiba
}

// ---------- tahap A: frame 1/detik + potongan kepala (CPU) ----------
async function tahapA(f) {
  const nama = path.basename(f, '.mp4') + '-' + fs.statSync(f).size;
  const dir = path.join(QC, nama);
  fs.rmSync(dir, {recursive: true, force: true});
  fs.mkdirSync(dir, {recursive: true});
  await run(FF, ['-y', '-loglevel', 'error', '-i', f, '-vf', 'fps=1', path.join(dir, 'f%02d.png')]);
  const frame = fs.readdirSync(dir).filter((n) => /^f\d+\.png$/.test(n)).sort().map((n) => path.join(dir, n));
  const kepala = await potongKepala(frame, dir);
  // Suara bawaan klip harus efek alam saja; ucapan manusia (bahasa aneh) -> CEK_SUARA. Owner 2026-11-18 Dzulqarnain.
  let suara = null;
  try { await run(PY, [path.join(APP, 'qc-suara.py'), 'klip', path.join(dir, 'suara.json'), f], {timeout: 600000, maxBuffer: 16 * 1024 * 1024}); suara = Object.values(JSON.parse(fs.readFileSync(path.join(dir, 'suara.json'), 'utf8')))[0]; } catch (e) { suara = {vonis: 'GAGAL', error: String(e.message).slice(0, 120)}; }
  return {f, nama, dir, frame, suara, ...kepala};
}

// ---------- tahap B: VLM per kepala (GPU) ----------
async function tahapB(a) {
  const tanda = await cekDaftarKepala(a.kepala);
  const shot = shotDari(a.f), kosong = orangShot[shot] === 'none';
  const frameOrang = a.cepat.filter((r) => r.orang > 0).length;
  const yunet = a.cepat.reduce((s, r) => s + r.wajah, 0);
  const vonis = tanda.length ? 'CEK_WAJAH' : kosong && frameOrang >= 2 ? 'CEK_ORANG' : a.suara?.vonis === 'BERSUARA' ? 'CEK_SUARA' : 'LULUS';
  // Lembar tanda: potongan yang ditandai + frame utuhnya, untuk dilihat mata sebelum memutuskan render ulang.
  const lembar = vonis === 'LULUS' ? null : buatLembar(path.join(QC, `${a.nama}-tanda.jpg`), vonis === 'CEK_ORANG'
    ? a.cepat.filter((r) => r.orang > 0).slice(0, 4).map((r) => r.file) : vonis === 'CEK_SUARA' ? [a.frame[0]] : tanda.slice(0, 6).flatMap((t) => [t.file, t.frame]));
  let gerak = null;
  // Owner 2026-11-18 SHOT05: kepala tokoh menoleh ke kamera sementara badan membelakangi, postur boneka tidak gagah.
  // Strip dibuat untuk SEMUA klip berorang (bukan hanya yang berpindah) dan wajib dilihat agen.
  if (!kosong && (frameOrang > 0 || PINDAH.test(aksiShot[shot] || '')) && a.frame.length >= 3) {
    const n = a.frame.length, pilih = [0.1, 0.5, 0.9].map((r) => a.frame[Math.min(n - 1, Math.round((n - 1) * r))]);
    gerak = buatLembar(path.join(QC, `${a.nama}-gerak.jpg`), pilih);
  }
  hasil[kunci(a.f)] = {file: a.f, shot, vonis, kepala_dicek: a.kepala.length, kepala_buram: a.buram, kepala_tanda: tanda.map((t) => ({kepala: t.file, frame: path.basename(t.frame), sumber: t.sumber, tajam: t.tajam, fitur: t.fitur, bukti: t.bukti})),
    frame_berorang: frameOrang, frame_total: a.frame.length, suara: a.suara, yunet_wajah: yunet, lembar, lihat_gerak: gerak, waktu: new Date().toISOString()};
  simpan();
  log(`QC ${path.basename(a.f)}: ${vonis}${tanda.length ? ` (${tanda.length}/${a.kepala.length} kepala berfitur)` : ''}${vonis === 'CEK_ORANG' ? ` (orang di ${frameOrang}/${a.frame.length} frame)` : ''}${lembar ? ' -> ' + lembar : ''}${gerak ? ` | LIHAT (kepala searah badan? arah gerak = arah hadap? postur gagah, proporsi dewasa?) -> ${gerak}` : ''}`);
}
// ---------- ban berjalan ----------
const pidFile = path.join(QC, '.pantau.pid');
if (pantau) fs.writeFileSync(pidFile, String(process.pid));
await pastikanServer();
log(`mulai${pantau ? ' memantau' : ''} ${folder}`);
const dikerjakan = new Set(Object.keys(hasil));
let antreB = Promise.resolve(), terakhirBaru = Date.now();
try {
  for (;;) {
    const baru = cariKlip().filter((f) => !dikerjakan.has(kunci(f)));
    for (const f of baru) {
      dikerjakan.add(kunci(f)); terakhirBaru = Date.now();
      let a; try { a = await tahapA(f); } catch (e) { log(`QC ${path.basename(f)}: GAGAL tahap A (${String(e.message).slice(0, 120)})`); continue; }
      // tahap B klip ini mengantre di belakang tahap B klip sebelumnya; loop langsung lanjut ke tahap A klip berikutnya.
      antreB = antreB.then(() => tahapB(a)).catch((e) => log(`QC ${path.basename(f)}: GAGAL tahap B (${e.message})`));
    }
    if (!pantau) break;
    if (Date.now() - terakhirBaru > diamMenit * 60000) { log(`tidak ada klip baru ${diamMenit} menit, berhenti`); break; }
    await new Promise((r) => setTimeout(r, 15000));
  }
  await antreB;
  const v = Object.values(hasil);
  log(`ringkasan: ${v.filter((x) => x.vonis === 'LULUS').length} LULUS, ${v.filter((x) => x.vonis !== 'LULUS').length} perlu dilihat: ${v.filter((x) => x.vonis !== 'LULUS').map((x) => path.basename(x.file)).join(', ') || '-'}; strip wajib dilihat: ${v.filter((x) => x.lihat_gerak).map((x) => path.basename(x.file)).join(', ') || '-'}`);
} finally { if (pantau) fs.rmSync(pidFile, {force: true}); }
