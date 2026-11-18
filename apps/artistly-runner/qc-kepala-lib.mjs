// Inti QC wajah bersama untuk frame klip (qc-klip.mjs) dan gambar sebelum render (qc-gambar-shot.mjs), supaya
// keduanya selalu memakai aturan yang sama.
//   1. qc-cepat.py: YOLO orang (+ potongan kepala), YuNet wajah, OCR teks.
//   2. Deteksi YuNet dipotong juga (YuNet sering "menemukan wajah" di kepala boneka polos dan pemandangan).
//   3. Potongan terlalu kecil (YOLO) atau buram (varians Laplacian < MIN_TAJAM) tidak dikirim ke VLM.
//   4. Sisanya ke VLM lokal (llama-server GPU), 2 sekaligus.
import fs from 'node:fs';
import path from 'node:path';
import {execFile, execFileSync} from 'node:child_process';
import {promisify} from 'node:util';
import {pathToFileURL} from 'node:url';

const run = promisify(execFile); // async agar permintaan VLM klip lain tetap berjalan
const ROOT = 'E:/JOTA-Standby';
const APP = path.join(ROOT, 'Jota_Content_Factory/apps/artistly-runner');
export const PY = path.join(ROOT, '.venv/Scripts/python.exe');
const {cekKepala} = await import(pathToFileURL(path.join(APP, 'qc-vlm.mjs')).href);

// Kepala (kotak orang YOLO) lebih sempit dari 2,5% lebar frame (48 px pada 1920) terlalu kecil untuk wajah yang
// terbaca; tetap dihitung sebagai orang. Uji 2026-11-18: sebagian besar 1308 potongan Dzulqarnain sekecil ini.
export const MIN_KEPALA = Number(process.env.JOTA_QC_MIN_KEPALA || 0.025);
// Ketajaman (varians Laplacian potongan 448 px). Kalibrasi 2026-11-18 dari tinjauan mata:
//   wajah nyata: Dzulqarnain SHOT31 5-180, prajurit SHOT08 37-337, Usman SHOT10/17 6-57;
//   alarm palsu (kerumunan latar buram, tekstur batu/api): 1-4 pada 117 dari 119 potongan.
// Ambang 5 membuang alarm palsu tanpa kehilangan satu pun wajah nyata di data itu.
export const MIN_TAJAM = Number(process.env.JOTA_QC_MIN_TAJAM || 5);

// frames: daftar path gambar; dir: folder kerja (dibuat ulang). Hasil: {cepat, kepala (layak VLM), buram}.
export async function potongKepala(frames, dir) {
  fs.mkdirSync(path.join(dir, 'kepala'), {recursive: true});
  fs.writeFileSync(path.join(dir, 'daftar.json'), JSON.stringify(frames));
  await run(PY, [path.join(APP, 'qc-cepat.py'), path.join(dir, 'daftar.json'), path.join(dir, 'cepat.json'), path.join(dir, 'kepala')], {timeout: 600000, maxBuffer: 16 * 1024 * 1024});
  const cepat = JSON.parse(fs.readFileSync(path.join(dir, 'cepat.json'), 'utf8'));
  const pot = await run(PY, ['-c', `import json,sys,os,cv2
from PIL import Image
c=json.load(open(sys.argv[1],encoding='utf-8'));d=sys.argv[2];lebar=[];out=[]
for i,r in enumerate(c):
  im=Image.open(r['file']).convert('RGB');lebar.append(im.width)
  for j,(x,y,w,h) in enumerate(r.get('kotak_wajah',[])):
    s=max(w,h)*1.8;cx,cy=x+w/2,y+h/2
    k=im.crop((int(max(0,cx-s/2)),int(max(0,cy-s/2)),int(min(im.width,cx+s/2)),int(min(im.height,cy+s/2))))
    if k.width<8 or k.height<8: continue
    k=k.resize((448,max(8,int(448*k.height/k.width))));f=os.path.join(d,'y%03d-w%d.png'%(i+1,j));k.save(f);out.append([i,f])
tajam={f:round(float(cv2.Laplacian(cv2.imread(os.path.join(d,f),0),cv2.CV_64F).var()),1) for f in os.listdir(d) if f.endswith('.png')}
print(json.dumps({'lebar':lebar,'yunet':out,'tajam':tajam}))`, path.join(dir, 'cepat.json'), path.join(dir, 'kepala')], {maxBuffer: 16 * 1024 * 1024});
  const {lebar, yunet, tajam} = JSON.parse(pot.stdout.trim().split('\n').pop());
  const kandidat = [];
  cepat.forEach((r, i) => (r.kepala || []).forEach((k) => {
    const o = Number(path.basename(k).match(/-o(\d+)\.png$/)[1]); const b = r.kotak_orang[o];
    if (b && b[2] - b[0] >= MIN_KEPALA * lebar[i]) kandidat.push({file: k, frame: frames[i], sumber: 'yolo'});
  }));
  for (const [i, k] of yunet) kandidat.push({file: k, frame: frames[i], sumber: 'yunet'});
  for (const k of kandidat) k.tajam = tajam[path.basename(k.file)] ?? 0;
  const kepala = kandidat.filter((k) => k.tajam >= MIN_TAJAM);
  return {cepat, kepala, buram: kandidat.length - kepala.length};
}

// VLM per kepala, 2 sekaligus. Hasil: potongan yang bermata/hidung/mulut.
export async function cekDaftarKepala(kepala) {
  const tanda = []; let idx = 0;
  const kerja = async () => { while (idx < kepala.length) { const k = kepala[idx++];
    let r; try { r = await cekKepala(k.file); } catch (e) { r = {error: e.message}; }
    const fitur = ['eyes', 'nose', 'mouth'].filter((x) => r[x] === true);
    if (r.human_head && fitur.length) tanda.push({...k, fitur, bukti: r.evidence}); } };
  await Promise.all([kerja(), kerja()]);
  return tanda;
}

// Lembar gambar (tinggi 300 px, 4 per baris) untuk ditinjau mata.
export function buatLembar(out, gambar) {
  if (!gambar.length) return null;
  execFileSync(PY, ['-c', `import sys
from PIL import Image
fs=sys.argv[2:];ims=[Image.open(f).convert('RGB') for f in fs]
ims=[i.resize((int(i.width*300/i.height),300)) for i in ims]
rows=[ims[i:i+4] for i in range(0,len(ims),4)]
out=Image.new('RGB',(max(sum(i.width for i in r) for r in rows),300*len(rows)),'black')
for y,r in enumerate(rows):
  x=0
  for i in r: out.paste(i,(x,y*300));x+=i.width
out.save(sys.argv[1],quality=85)`, out, ...gambar]);
  return out;
}
