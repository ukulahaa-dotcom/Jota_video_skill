"""Detektor lompatan gambar pada video final (owner 2026-11-27: "gambarnya loncat-loncat, jump cut kayak bolak-balik").
Tanpa API, deterministik. Video dibaca 10 fps abu-abu kecil, lalu tiap potongan (penurunan kemiripan mendadak) dinilai:
  BOLAK-BALIK : frame sesudah potongan mirip frame yang SUDAH tampil beberapa detik sebelumnya (adegan diputar ulang /
                varian dari gambar awal yang sama disambung). Penonton melihat gambar mundur lalu maju lagi.
  JUMP-CUT    : frame sebelum dan sesudah potongan mirip komposisinya tapi melompat (subjek/kamera bergeser tiba-tiba).
  BERSIH      : potongan ke ukuran/sudut yang jelas berbeda (boleh).
Keluar kode 1 bila ada BOLAK-BALIK atau JUMP-CUT, jadi bisa dipakai sebagai gerbang sebelum kirim.
pakai: python -I cek-lompat.py <video.mp4> [--lembar <folder>]  (--lembar menyimpan gambar sebelum/sesudah tiap temuan)"""
import os, sys, subprocess
import numpy as np

BIN = r'E:\JOTA-Standby\tools\ffmpeg\ffmpeg-9.0.2-essentials_build\bin'
FF = os.path.join(BIN, 'ffmpeg.exe')
FPS, W, H = 10, 96, 54
POTONG_ATAS = 0.93  # kemiripan frame berurutan di bawah ini (dan jauh di bawah tetangganya) = potongan
JUMP_MIN = 0.55    # potongan dengan kemiripan sebelum/sesudah di atas ini = komposisi sama tapi melompat
TEPI_MIN = 0.35    # ... dan bentuk bendanya (peta tepi) juga mirip
BALIK = 0.90      # frame sesudah potongan mirip frame lama setinggi ini = adegan mundur/diulang
JENDELA = (0.8, 10.0)  # detik ke belakang yang dibandingkan untuk BOLAK-BALIK


def baca(video):
    raw = subprocess.run([FF, '-v', 'error', '-i', video, '-vf', f'fps={FPS},scale={W}:{H},format=gray', '-f', 'rawvideo', '-'],
                         capture_output=True, check=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
    # peta tepi (gradien): menangkap bentuk benda; langit di atas + tanah di bawah saja tidak dianggap mirip
    gx, gy = np.diff(fr, axis=2)[:, :-1, :], np.diff(fr, axis=1)[:, :, :-1]
    ed = np.sqrt(gx ** 2 + gy ** 2)
    return norm(fr), norm(ed)


def norm(x):
    x = x.reshape(len(x), -1).copy()
    x -= x.mean(1, keepdims=True)
    x /= np.linalg.norm(x, axis=1, keepdims=True) + 1e-6
    return x


def tc(i):
    t = i / FPS
    return f'{int(t // 60)}:{t % 60:05.2f}'


def periksa(video):
    fr, ed = baca(video)
    nx = (fr[1:] * fr[:-1]).sum(1)  # kemiripan frame i dengan i+1
    temuan = []
    for i in range(len(nx)):
        # potongan = penurunan kemiripan TUNGGAL; tetangganya tetap mirip. Gerak cepat di dalam klip (sabit, dayung)
        # menurunkan beberapa frame berturut-turut, jadi dilewati. Komposisi mirip yang melompat (perahu kembali ke kiri)
        # juga tertangkap walau kemiripannya masih tinggi (contoh 0,85).
        nb = [nx[j] for j in (i - 2, i - 1, i + 1, i + 2) if 0 <= j < len(nx)]
        if not nb or min(nb) < 0.9 or nx[i] > POTONG_ATAS or nx[i] > min(nb) - 0.04:
            continue
        a, b = i, i + 1  # frame terakhir sebelum, frame pertama sesudah
        # frame hitam/pudar (transisi grafik) dilewati
        lo, hi = max(0, b - int(JENDELA[1] * FPS)), b - int(JENDELA[0] * FPS)
        balik = 0.0
        if hi > lo:
            sim = fr[lo:hi] @ fr[b]
            j = int(sim.argmax()); balik = float(sim[j]); jlama = lo + j
        dekat = float(nx[i]); tepi = float(ed[a] @ ed[b])
        if balik >= BALIK and balik > dekat + 0.05:
            temuan.append(('BOLAK-BALIK', a, b, f'mirip frame {tc(jlama)} ({balik:.2f}), sebelum potongan {dekat:.2f}'))
        elif dekat >= JUMP_MIN and tepi >= TEPI_MIN:
            temuan.append(('JUMP-CUT', a, b, f'komposisi sama tapi melompat (terang {dekat:.2f}, tepi {tepi:.2f})'))
        else:
            temuan.append(('BERSIH', a, b, f'terang {dekat:.2f}, tepi {tepi:.2f}'))
    return temuan


def lembar(video, temuan, folder):
    from PIL import Image
    os.makedirs(folder, exist_ok=True)
    for jenis, a, b, _ in temuan:
        if jenis == 'BERSIH':
            continue
        gs = []
        for t in ((a - 5) / FPS, a / FPS, b / FPS, (b + 5) / FPS):
            p = os.path.join(folder, '_f.png')
            subprocess.run([FF, '-y', '-v', 'error', '-ss', f'{max(0, t):.2f}', '-i', video, '-frames:v', '1', '-vf', 'scale=480:-1', p], check=True)
            gs.append(Image.open(p).convert('RGB')); gs[-1].load()
        im = Image.new('RGB', (480 * 4, gs[0].height))
        for k, g in enumerate(gs):
            im.paste(g, (480 * k, 0))
        im.save(os.path.join(folder, f'{jenis}_{tc(b).replace(":", "m")}.jpg'), quality=85)
    p = os.path.join(folder, '_f.png')
    if os.path.exists(p):
        os.remove(p)


if __name__ == '__main__':
    v = sys.argv[1]
    t = periksa(v)
    buruk = [x for x in t if x[0] != 'BERSIH']
    for jenis, a, b, ket in t:
        print(f'{tc(b)}  {jenis:11s} {ket}')
    print(f'{len(t)} potongan, {len(buruk)} bermasalah')
    if '--lembar' in sys.argv:
        lembar(v, t, sys.argv[sys.argv.index('--lembar') + 1])
    sys.exit(1 if buruk else 0)
