#!/usr/bin/env python3
"""QC cepat lokal untuk gambar Artistly (tanpa token, tanpa internet).

Detektor:
  - YOLOv8s (COCO): jumlah orang (kelas person).
  - YuNet (OpenCV): wajah dengan mata/hidung/mulut; faceless polos seharusnya tidak terdeteksi.
  - RapidOCR: tulisan yang ikut tergambar (huruf, balon berisi teks).

Pakai: python qc-cepat.py daftar.json hasil.json [folder_kepala]
  folder_kepala: simpan potongan kepala tiap orang (field "kepala") untuk qc-vlm.mjs --kepala.
  daftar.json = list path gambar, atau {"ok": [...], "tolak": {path: alasan}} (mode uji akurasi).
Model di E:\\JOTA-Standby\\models (yolov8s.pt, face_detection_yunet_2023mar.onnx).
"""
import json, os, sys
import cv2, numpy as np
from PIL import Image

MODELS = os.environ.get('JOTA_MODELS', r'E:\JOTA-Standby\models')


def muat():
    from ultralytics import YOLO
    from rapidocr_onnxruntime import RapidOCR
    yolo = YOLO(os.path.join(MODELS, 'yolov8s.pt'))
    yunet = cv2.FaceDetectorYN.create(os.path.join(MODELS, 'face_detection_yunet_2023mar.onnx'), '', (320, 320), 0.5, 0.3, 50)
    return yolo, yunet, RapidOCR()


def cek(path, yolo, yunet, ocr):
    im = np.array(Image.open(path).convert('RGB'))[:, :, ::-1].copy()  # BGR; file Artistly berupa WEBP walau .png
    h, w = im.shape[:2]
    r = yolo.predict(im, conf=0.35, classes=[0], verbose=False)[0]
    orang = [[round(float(v)) for v in b] for b in r.boxes.xyxy.tolist()]
    # Catatan uji 2026-11-16: YOLO kadang menghitung potongan tubuh (kaki Kakek KUAT hal-01-2) sebagai orang lain.
    # Membuang kotak yang tumpang tindih justru membuang anak yang berdiri di depan orang dewasa, jadi tidak dipakai;
    # produksi-gambar.mjs memakai hitungan VLM sebagai pembanding.
    yunet.setInputSize((w, h))
    _, f = yunet.detect(im)
    wajah = [] if f is None else [round(float(x[-1]), 3) for x in f]
    kotak_wajah = [] if f is None else [[round(float(v)) for v in x[:4]] for x in f]  # x, y, w, h (untuk dicek ulang VLM)
    t, _ = ocr(im)
    teks = [x[1] for x in (t or []) if x[2] > 0.6 and len(x[1].strip()) >= 2]
    return {'orang': len(orang), 'kotak_orang': orang, 'wajah': len(wajah), 'skor_wajah': wajah, 'kotak_wajah': kotak_wajah, 'teks': teks}


def potong_kepala(path, kotak, outdir, awal):
    """Potong kepala tiap orang (bagian atas kotak YOLO), diperbesar 448 px, untuk cek wajah per kepala dengan VLM."""
    im = Image.open(path).convert('RGB'); hasil = []
    for i, (x0, y0, x1, y1) in enumerate(kotak):
        bw, bh = x1 - x0, y1 - y0; s = max(bw * 0.75, bh * 0.22)
        cx, cy = (x0 + x1) / 2, y0 + s * 0.55
        c = im.crop((int(max(0, cx - s / 1.6)), int(max(0, cy - s / 1.4)), int(min(im.width, cx + s / 1.6)), int(min(im.height, cy + s / 1.4))))
        if c.width < 8 or c.height < 8: continue
        c = c.resize((448, max(8, int(448 * c.height / c.width))), Image.LANCZOS)
        f = os.path.join(outdir, f'{awal}-o{i}.png'); c.save(f); hasil.append(f)
    return hasil


def main(inp, out, kepala_dir=None):
    d = json.load(open(inp, encoding='utf-8'))
    item = [(p, None) for p in d] if isinstance(d, list) else [(p, 'ok') for p in d['ok']] + [(p, 'tolak') for p in d['tolak']]
    yolo, yunet, ocr = muat()
    hasil = []
    if kepala_dir: os.makedirs(kepala_dir, exist_ok=True)
    for i, (p, lab) in enumerate(item, 1):
        r = cek(p, yolo, yunet, ocr); r['file'] = p
        if kepala_dir: r['kepala'] = potong_kepala(p, r['kotak_orang'], kepala_dir, f'{i:03d}')
        if lab: r['label'] = lab
        hasil.append(r)
        print(i, len(item), lab or '', r['orang'], r['wajah'], len(r['teks']), os.path.basename(p), flush=True)
    json.dump(hasil, open(out, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)


if __name__ == '__main__':
    if len(sys.argv) not in (3, 4): raise SystemExit(__doc__)
    main(*sys.argv[1:])
