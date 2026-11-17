// Produksi gambar Artistly + QC lokal tanpa token (PC Windows).
// Alur: gambar-v6 -> qc-cepat (YOLO orang, potong kepala) -> Qwen3-VL lokal per kepala (wajah) dan per gambar (balon/tulisan)
//       -> halaman yang semua gambarnya TOLAK dipindah ke gambar/ditolak/ (nama baru -vRRR) -> generate ulang, maks --ulang putaran.
// Hasil: gambar/qc.json (status per file, pilihan per halaman) dan gambar/tinjau-qc.jpg untuk owner.
// pakai: node produksi-gambar.mjs <naskah.json> [--ulang 2] [--tanpa-generate]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {cekVlm, cekKepala, cekAnatomi} from './qc-vlm.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.JOTA_ROOT || 'E:/JOTA-Standby';
const PY = path.join(ROOT, '.venv/Scripts/python.exe');
const args = process.argv.slice(2);
const naskahPath = path.resolve(args.find((a) => !a.startsWith('--') && a.endsWith('.json')) || '');
if (!fs.existsSync(naskahPath)) throw new Error('pakai: node produksi-gambar.mjs <naskah.json> [--ulang 2] [--tanpa-generate]');
const ulangMaks = Number(args[args.indexOf('--ulang') + 1]) || (args.includes('--ulang') ? 0 : 2);
const tanpaGenerate = args.includes('--tanpa-generate');
const naskah = JSON.parse(fs.readFileSync(naskahPath, 'utf8'));
const GDIR = path.join(path.dirname(naskahPath), 'gambar');
const QCF = path.join(GDIR, 'qc.json');
const log = (...m) => console.log(`[${new Date().toLocaleTimeString()}]`, ...m);
const sha = (f) => createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const ANGKA = {no: 0, zero: 0, one: 1, single: 1, two: 2, three: 3, four: 4, five: 5};

// Jumlah orang yang diminta prompt ("Exactly two people", "no people"); null bila tidak tertulis.
export function harapOrang(script = '') {
  const m = script.match(/\bexactly (one|two|three|four|five|\d+) (?:people|persons?|humans?|boys|children|figures)\b/i)
    || script.match(/\b(no|zero) (?:people|humans?|persons?)\b/i);
  if (!m) return null;
  const k = m[1].toLowerCase();
  return /^\d+$/.test(k) ? Number(k) : ANGKA[k];
}

export function putuskan(r) {
  const alasan = [];
  if (r.wajah_kepala > 0) alasan.push(`wajah ${r.wajah_kepala}`);
  // Orang berlebih: TOLAK hanya bila YOLO dan VLM sama-sama menghitung lebih (YOLO kadang menghitung potongan tubuh).
  const lebihYolo = r.harap != null && r.orang > r.harap, lebihVlm = r.harap != null && r.vlm_orang > r.harap;
  if (lebihYolo && lebihVlm) alasan.push(`orang ${r.orang}>${r.harap}`);
  // Figur manekin/botak lolos YOLO tapi terhitung VLM (uji 2026-11-16 KISAH-FIRAUN hal-05-2: YOLO 0, VLM 10, harap 1).
  else if (r.harap != null && r.harap > 0 && r.vlm_orang >= r.harap + 3) alasan.push(`VLM ${r.vlm_orang} orang, harap ${r.harap}`);
  // Adegan tanpa orang: figur apa pun (termasuk figur botak mirip bayi yang lolos YOLO) langsung TOLAK.
  else if (r.harap === 0 && (r.orang > 0 || r.vlm_orang > 0 || r.figur)) alasan.push('ada figur di adegan tanpa orang');
  if (r.balon) alasan.push('balon/tulisan');
  if (r.kostum) alasan.push('kostum superhero');
  // Owner 2026-11-17 (Qabil-Habil): postur chibi di sebagian adegan membuat tinggi tokoh berubah-ubah. Hanya untuk preset dewasa.
  if (r.chibi) alasan.push('postur chibi');
  if (alasan.length) return {status: 'TOLAK', alasan: alasan.join(', ')};
  const cek = [];
  if (lebihYolo !== lebihVlm) cek.push(`orang YOLO ${r.orang} VLM ${r.vlm_orang} harap ${r.harap}`);
  if (r.harap != null && r.orang < r.harap) cek.push(`orang ${r.orang}<${r.harap}`);
  if (r.error) cek.push('QC error');
  if (r.ragu) cek.push('VLM ragu');
  return cek.length ? {status: 'CEK', alasan: cek.join(', ')} : {status: 'LULUS', alasan: ''};
}

function generate() {
  log('generate gambar-v6', naskahPath);
  const r = spawnSync(process.execPath, [path.join(HERE, 'jalankan-mode.mjs'), 'gambar-v6', naskahPath], {stdio: 'inherit', env: {...process.env, TEMP: path.join(ROOT, 'temp'), TMP: path.join(ROOT, 'temp')}});
  const logf = path.join(ROOT, 'local-state/artistly-gambar-v6.log');
  const ekor = fs.existsSync(logf) ? fs.readFileSync(logf, 'utf8').split('\n').slice(-5).join('\n') : '';
  if (/minta login/i.test(ekor)) { log('BERHENTI: Artistly minta login. Owner jalankan E:\\JOTA-Standby\\JOTA.cmd login-artistly'); return false; }
  if (r.status !== 0) { log('generate gagal, exit', r.status); return false; }
  return true;
}

async function qc() {
  const q = fs.existsSync(QCF) ? JSON.parse(fs.readFileSync(QCF, 'utf8')) : {versi: 1, file: {}, pilih: {}};
  const semua = fs.readdirSync(GDIR).filter((n) => /^hal-\d\d-\d\.png$/.test(n)).sort();
  for (const n of Object.keys(q.file)) if (!semua.includes(n)) delete q.file[n];
  const baru = semua.filter((n) => q.file[n]?.sha !== sha(path.join(GDIR, n)));
  if (baru.length) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jota-qc-'));
    try {
      const daftar = path.join(tmp, 'daftar.json'), hasil = path.join(tmp, 'hasil.json');
      fs.writeFileSync(daftar, JSON.stringify(baru.map((n) => path.join(GDIR, n))));
      log(`qc-cepat ${baru.length} gambar`);
      const p = spawnSync(PY, [path.join(HERE, 'qc-cepat.py'), daftar, hasil, path.join(tmp, 'kepala')], {stdio: ['ignore', 'ignore', 'inherit'], env: {...process.env, TEMP: path.join(ROOT, 'temp'), TMP: path.join(ROOT, 'temp')}});
      if (p.status !== 0) throw new Error('qc-cepat gagal');
      for (const c of JSON.parse(fs.readFileSync(hasil, 'utf8'))) {
        const n = path.basename(c.file), hal = Number(n.slice(4, 6));
        const r = {sha: sha(c.file), orang: c.orang, harap: harapOrang(naskah.halaman?.[hal - 1]?.script), skor_yunet: c.skor_wajah, wajah_kepala: 0, kepala: []};
        try {
          for (const k of c.kepala) {
            const v = await cekKepala(k);
            const ada = Boolean(v.human_head && (v.eyes || v.nose || v.mouth));
            r.kepala.push({ada_wajah: ada, bukti: v.evidence}); if (ada) r.wajah_kepala++;
          }
          const g = await cekVlm(c.file);
          r.balon = g.speech_bubbles_or_text; r.kostum = g.superhero_costume_adult; r.ragu = g.uncertain; r.vlm_orang = g.people; r.figur = g.human_like_figures;
          // Cek tangan berlebih ikut dicatat tetapi tidak memutuskan: uji 2026-11-17 model 4B melewatkan tangan ketiga.
          if (['kisah-3d-dewasa', 'kisah-3d-boneka'].includes(naskah.gaya) && r.orang > 0) { const a = await cekAnatomi(c.file); r.chibi = a.child_proportions; r.tangan_lebih = a.extra_arms_or_hands; r.anatomi = a.evidence; }
        } catch (e) { r.error = e.message; }
        Object.assign(r, putuskan(r));
        q.file[n] = r;
        fs.writeFileSync(QCF, JSON.stringify(q, null, 1));
        log(n, r.status, r.alasan);
      }
    } finally { fs.rmSync(tmp, {recursive: true, force: true}); }
  }
  // Hitung ulang status dari data tersimpan (aturan putuskan bisa berubah tanpa menjalankan VLM lagi).
  for (const r of Object.values(q.file)) Object.assign(r, putuskan(r));
  // Pilihan per halaman: LULUS dulu, lalu CEK; null bila semua TOLAK.
  const halaman = [...new Set(semua.map((n) => n.slice(0, 6)))];
  q.pilih = Object.fromEntries(halaman.map((h) => {
    const c = semua.filter((n) => n.startsWith(h));
    return [h, c.find((n) => q.file[n]?.status === 'LULUS') || c.find((n) => q.file[n]?.status === 'CEK') || null];
  }));
  fs.writeFileSync(QCF, JSON.stringify(q, null, 1));
  return q;
}

function tolakHalaman(q) {
  const ulang = Object.entries(q.pilih).filter(([, v]) => v === null).map(([h]) => h);
  const dt = path.join(GDIR, 'ditolak'); fs.mkdirSync(dt, {recursive: true});
  for (const h of ulang) for (const n of Object.keys(q.file).filter((x) => x.startsWith(h))) {
    // Nama baru wajib: memindah dengan nama sama gagal diam-diam bila file lama sudah ada (pelajaran buku Umair).
    let tujuan; do tujuan = path.join(dt, `${n.slice(0, -4)}-v${Math.floor(Math.random() * 1000)}.png`); while (fs.existsSync(tujuan));
    fs.renameSync(path.join(GDIR, n), tujuan);
    q.file[n].dipindah = path.basename(tujuan);
    log('ditolak', n, '->', path.basename(tujuan), q.file[n].alasan);
  }
  for (const h of ulang) for (const n of Object.keys(q.file).filter((x) => x.startsWith(h))) delete q.file[n];
  fs.writeFileSync(QCF, JSON.stringify(q, null, 1));
  return ulang;
}

let putaran = 0, q;
while (true) {
  if (!tanpaGenerate && !generate()) break;
  if (!fs.existsSync(GDIR)) { log('folder gambar belum ada'); break; }
  q = await qc();
  const kosong = Object.values(q.pilih).filter((v) => v === null).length;
  if (!kosong) { log('semua halaman punya gambar lolos QC'); break; }
  if (tanpaGenerate || putaran >= ulangMaks) { log(`${kosong} halaman masih tanpa gambar lolos (putaran ulang habis)`); break; }
  log(`putaran ulang ${++putaran}: ${tolakHalaman(q).join(', ')}`);
}
if (q) {
  spawnSync(PY, [path.join(HERE, 'lembar-qc.py'), QCF, path.join(GDIR, 'tinjau-qc.jpg')], {stdio: 'inherit'});
  const st = Object.values(q.file).reduce((a, r) => ({...a, [r.status]: (a[r.status] || 0) + 1}), {});
  log('RINGKASAN', JSON.stringify(st), 'pilihan', JSON.stringify(q.pilih));
}
