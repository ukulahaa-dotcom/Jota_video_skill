// Gerbang QC gambar SEBELUM render VideoExpress (owner 2026-11-18). Dzulqarnain SHOT08: wajah prajurit sudah ada di
// gambar Artistly yang dipilih manual, baru ketahuan setelah klip dirender -> satu putaran render ulang terbuang.
// Aturan wajah sama persis dengan QC klip (qc-kepala-lib.mjs).
//
// pakai: node qc-gambar-shot.mjs <folder_produksi> [--shot SHOT01,SHOT08]   (--shot: hanya shot itu; dipakai jalankan-vx run)
//   Membaca shots.json; gambar tiap shot dicari lewat gambarSumber() (gambar_sumber.json, atau kisah-vx.json gambar_dir +
//   gambar/qc.json "pilih"). Vonis per gambar: LULUS, CEK_WAJAH, CEK_ORANG (adegan people none tetapi ada orang),
//   CEK_TEKS (OCR menemukan tulisan). Hasil di <folder>/qc-gambar/. Exit 2 bila ada yang perlu dilihat.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const APP = 'E:/JOTA-Standby/Jota_Content_Factory/apps/artistly-runner';

// Nama gambar VideoExpress (mis. DZQVX_08) -> file PNG lokal. Dipakai juga oleh jalankan-vx untuk impor ulang otomatis.
export function gambarSumber(folder) {
  const peta = {};
  const f = path.join(folder, 'gambar_sumber.json');
  if (fs.existsSync(f)) Object.assign(peta, JSON.parse(fs.readFileSync(f, 'utf8')));
  try {
    const kv = JSON.parse(fs.readFileSync(path.join(folder, 'kisah-vx.json'), 'utf8'));
    const gd = path.resolve(folder, kv.gambar_dir);
    const pilih = JSON.parse(fs.readFileSync(path.join(gd, 'qc.json'), 'utf8')).pilih || {};
    for (const s of JSON.parse(fs.readFileSync(path.join(folder, 'shots.json'), 'utf8')).shots) {
      const nama = s.start?.image; const nn = (nama || '').match(/_(\d+)$/)?.[1];
      if (nama && !peta[nama] && nn && pilih[`hal-${nn}`]) peta[nama] = path.join(gd, pilih[`hal-${nn}`]);
    }
  } catch {}
  return peta;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const folder = process.argv[2];
  if (!folder) throw new Error('pakai: node qc-gambar-shot.mjs <folder_produksi>');
  const {potongKepala, cekDaftarKepala, buatLembar} = await import(pathToFileURL(path.join(APP, 'qc-kepala-lib.mjs')).href);
  const iS = process.argv.indexOf('--shot'), hanya = iS > 0 ? new Set(process.argv[iS + 1].split(',')) : null;
  const shots = JSON.parse(fs.readFileSync(path.join(folder, 'shots.json'), 'utf8')).shots.filter((s) => !hanya || hanya.has(s.id));
  const peta = gambarSumber(folder);
  const pakai = {}; // gambar -> {file, shots, kosong}
  const hilang = [];
  for (const s of shots) {
    const n = s.start?.image; if (!n) continue;
    if (!peta[n] || !fs.existsSync(peta[n])) { hilang.push(`${s.id}:${n}`); continue; }
    (pakai[n] ||= {file: peta[n], shots: [], kosong: true}).shots.push(s.id);
    if (s.people !== 'none') pakai[n].kosong = false;
  }
  if (hilang.length) console.log(`file gambar tidak diketahui (tulis gambar_sumber.json): ${hilang.join(', ')}`);
  const dir = path.join(folder, 'qc-gambar');
  fs.rmSync(dir, {recursive: true, force: true}); fs.mkdirSync(dir, {recursive: true});
  const nama = Object.keys(pakai), file = nama.map((n) => pakai[n].file);
  const t = Date.now();
  const a = await potongKepala(file, dir);
  const tanda = await cekDaftarKepala(a.kepala);
  const hasil = {}; let perlu = 0;
  nama.forEach((n, i) => {
    const c = a.cepat[i], tw = tanda.filter((x) => x.frame === file[i]);
    const vonis = tw.length ? 'CEK_WAJAH' : pakai[n].kosong && c.orang > 0 ? 'CEK_ORANG' : c.teks.length ? 'CEK_TEKS' : 'LULUS';
    let lembar = null;
    if (vonis !== 'LULUS') { perlu++; lembar = buatLembar(path.join(dir, `${n}-tanda.jpg`), [file[i], ...tw.slice(0, 3).map((x) => x.file)]); }
    hasil[n] = {file: file[i], shots: pakai[n].shots, vonis, orang: c.orang, teks: c.teks, kepala_tanda: tw.map((x) => ({kepala: x.file, tajam: x.tajam, fitur: x.fitur, bukti: x.bukti})), lembar};
    if (vonis !== 'LULUS') console.log(`${n} (${pakai[n].shots.join(',')}): ${vonis}${c.teks.length ? ' teks=' + JSON.stringify(c.teks).slice(0, 60) : ''} -> ${lembar}`);
  });
  fs.writeFileSync(path.join(dir, 'hasil.json'), JSON.stringify(hasil, null, 1));
  console.log(`QC gambar: ${nama.length} gambar, ${nama.length - perlu} LULUS, ${perlu} perlu dilihat, ${a.kepala.length} kepala dicek VLM (${a.buram} buram dilewati), ${Math.round((Date.now() - t) / 1000)} detik`);
  process.exit(perlu || hilang.length ? 2 : 0);
}
