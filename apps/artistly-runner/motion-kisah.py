#!/usr/bin/env python3
"""Video narasi kisah 9:16 (Shorts/Reels/TikTok) dari gambar adegan Artistly: narator ElevenLabs + caption karaoke
kata demi kata + gerak kamera + crossfade. Lokal di PC dengan ffmpeg; tanpa VideoExpress.

Pakai: python motion-kisah.py kisah.json
kisah.json:
  {"gambar_dir": "gambar",                         # folder hasil produksi-gambar.mjs (qc.json berisi pilihan per halaman)
   "judul": "KISAH QARUN", "subjudul": "Kisah dalam Al-Qur'an",
   "narator": {"voice_id": "...", "stability": 0.5, "style": 0.25, "speed": 1.0, "eq": "jernih"},  (eq opsional)
   "pemeran": {"Qabil": "pemuda_emosi", "Habil": "pemuda_baik"},   (opsional; kunci dari suara-karakter.json)
   "adegan": [{"hal": 1, "narasi": "..."}, {"gambar": "gambar/hal-02-2.png", "narasi": "..."},
              {"klip": "klip/x.mp4", "narasi": ["Qabil berteriak.", {"tokoh": "Qabil", "teks": "Aku akan membunuhmu!"}]}],
   "penutup": ["Harta adalah titipan.", "..."],
   "keluaran": "video/Kisah Qarun.mp4"}
"hal" memakai pilihan QC (qc.json "pilih"), atau "gambar" untuk memilih manual.
"""
import json, os, subprocess, sys, tempfile, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import elevenlabs
FFMPEG = os.environ.get('JOTA_FFMPEG', r'E:\JOTA-Standby\tools\ffmpeg\ffmpeg-9.0.2-essentials_build\bin\ffmpeg.exe')
W, H, FPS, SR = 1080, 1920, 30, 44100
KUNING, PUTIH, HITAM = (255, 214, 64), (255, 255, 255), (12, 12, 16)


def font(n, s): return ImageFont.truetype(os.path.join(HERE, 'fonts', n), s)


# EQ penjernih narator (owner 2026-11-17: Kang Nandar terdengar "mendem"; energi 2-5 kHz cuma 0,15%).
# Aktif bila "narator": {"eq": "jernih"}; hasil uji: kejernihan 2-5 kHz naik ke ~1%. Cache narasi tetap mp3 mentah.
EQ_NARATOR = {'jernih': 'highpass=f=90,equalizer=f=220:t=q:w=1:g=-4,equalizer=f=3200:t=q:w=1:g=5,equalizer=f=7000:t=q:w=1:g=3,acompressor=threshold=-18dB:ratio=3:attack=5:release=80',
              # Efek suara karakter (suara-karakter.json "efek"); pitch digeser, tempo dikembalikan agar waktu kata tetap cocok.
              'berat': 'asetrate=44100*0.92,aresample=44100,atempo=1.0870,equalizer=f=120:t=q:w=1:g=3',
              'tua': 'asetrate=44100*0.96,aresample=44100,atempo=1.0417,vibrato=f=5:d=0.06',
              'anak': 'asetrate=44100*1.22,aresample=44100,atempo=0.8197,highpass=f=150'}

# Pustaka suara karakter untuk dialog (owner 2026-11-17: "buatlah beberapa karakter suara yang berbeda").
PUSTAKA = json.load(open(os.path.join(HERE, 'suara-karakter.json'), encoding='utf-8'))
# Ucapan Nabi/Rasul/malaikat/Allah tidak boleh diperankan suara aktor; sampaikan lewat narator ("beliau bersabda...").
TERLARANG = {'nabi', 'rasul', 'rasulullah', 'malaikat', 'allah', 'jibril', 'tuhan'}
JEDA_DIALOG = 0.3


def segmen_narasi(a, m, nar):
    """'narasi' string -> narator saja; list -> item string (narator) atau {"tokoh", "teks", "suara"?}. Hasil [(teks, suara, tokoh)]."""
    import re
    n = a['narasi']
    if isinstance(n, str): return [(n, nar, None)]
    hasil = []
    for it in n:
        if isinstance(it, str): hasil.append((it, nar, None)); continue
        tokoh = it.get('tokoh')
        if tokoh and TERLARANG & set(re.findall(r'\w+', tokoh.lower())):
            raise SystemExit(f'dialog "{tokoh}" ditolak: ucapan Nabi/malaikat tidak disuarakan pemeran, pakai narator')
        k = it.get('suara') or (m.get('pemeran') or {}).get(tokoh)
        if k not in PUSTAKA: raise SystemExit(f'tokoh "{tokoh}": suara "{k}" tidak ada di suara-karakter.json (isi "pemeran" di kisah.json)')
        hasil.append((it['teks'], PUSTAKA[k], tokoh))
    return hasil


def tts_cache(teks, s, cdir):
    """TTS ElevenLabs + waktu kata, cache <base>/narasi-cache (kunci sama dengan versi lama agar cache narator tetap terpakai)."""
    import hashlib
    model = s.get('model', 'eleven_multilingual_v2')
    kunci = hashlib.sha1(json.dumps([teks, s['voice_id'], model, s.get('stability', 0.5), s.get('style', 0.25), s.get('speed', 1.0)]).encode()).hexdigest()[:16]
    mp3, kj = os.path.join(cdir, kunci + '.mp3'), os.path.join(cdir, kunci + '.json')
    if os.path.exists(mp3) and os.path.exists(kj): return mp3, json.load(open(kj, encoding='utf-8'))
    # Owner 2026-11-18 (Dzulqarnain): ElevenLabs kadang menghasilkan ocehan bahasa aneh ("Di sana, ia mendapati suatu kaum"
    # terdengar "With Finland, with Van Routies"). Tiap TTS baru dicek Whisper lokal; tidak cocok naskah -> ulang, maks 3x.
    for coba in range(1, 4):
        kata = elevenlabs.tts_waktu(teks, s['voice_id'], mp3, model=model, stability=s.get('stability', 0.5), style=s.get('style', 0.25), speed=s.get('speed', 1.0))
        mirip = cek_lafal(mp3, teks)
        if mirip is None or mirip >= 0.85: break
        print(f'  TTS meleset (mirip {mirip:.2f}, coba {coba}): {teks[:60]}', flush=True)
    json.dump(kata, open(kj, 'w', encoding='utf-8'))
    return mp3, kata


_WHISPER = None
def cek_lafal(mp3, teks):
    """Kemiripan kata transkrip Whisper vs naskah (0-1); None bila faster-whisper tidak tersedia atau JOTA_CEK_LAFAL=0."""
    global _WHISPER
    if os.environ.get('JOTA_CEK_LAFAL') == '0': return None
    import re, difflib
    try:
        if _WHISPER is None:
            from faster_whisper import WhisperModel
            _WHISPER = WhisperModel('small', device='cpu', compute_type='int8', download_root=r'E:\JOTA-Standby\models\whisper', cpu_threads=8)
        seg, _ = _WHISPER.transcribe(mp3, language='id', beam_size=5)
        tr = ' '.join(z.text.strip() for z in seg)
    except Exception as e:
        print('  cek lafal dilewati:', e, flush=True); return None
    # Kalibrasi 2026-11-18 (narasi Dzulqarnain): kemiripan HURUF, audio baik 0.95-0.98 (Whisper menulis "Zul karnain"),
    # audio rusak 0.16-0.81. Angka: Whisper menulis "83-98" untuk "delapan puluh tiga ..." -> pakai kemiripan kata (baik 0.62).
    huruf = lambda t: re.sub(r'[^a-z]', '', t.lower())
    r = difflib.SequenceMatcher(None, huruf(teks), huruf(tr)).ratio()
    if re.search(r'\d', tr):
        kata = lambda t: re.sub(r'[^a-z0-9 ]', ' ', t.lower().replace("'", '')).split()
        if difflib.SequenceMatcher(None, kata(teks), kata(tr)).ratio() >= 0.6: r = max(r, 0.85)
    return r


def baca_wav(mp3, tmp, i, eq=None):
    w = os.path.join(tmp, f'n{i}.wav')
    af = ['-af', EQ_NARATOR[eq]] if eq else []
    subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', mp3, *af, '-ac', '1', '-ar', str(SR), w], check=True)
    with wave.open(w) as f: return np.frombuffer(f.readframes(f.getnframes()), dtype=np.int16).astype(np.float32) / 32768


# Tata letak caption per rasio. 9:16 = Shorts; 16:9 = film YouTube (owner 2026-11-17, Dzulqarnain 5 menit).
CAP = {'ukuran': 92, 'y': 0.70, 'maks': 20, 'jarak': 108, 'wm_y': 150}


def set_rasio(r):
    global W, H, FC
    if r == '16:9':
        W, H = 1920, 1080
        CAP.update(ukuran=64, y=0.78, maks=36, jarak=74, wm_y=36)
    FC = None


def potong_caption(kata, maks=None):
    """Kelompokkan kata jadi potongan 2 baris (maks ~20 huruf per baris di 9:16, ~36 di 16:9)."""
    maks = maks or CAP['maks']
    hasil, baris, cur = [], [], []
    for k in kata:
        t = ' '.join(x['kata'] for x in cur + [k])
        if len(t) > maks and cur:
            baris.append(cur); cur = []
            if len(baris) == 2: hasil.append(baris); baris = []
        cur.append(k)
        if k['kata'][-1] in '.!?:' and (baris or len(' '.join(x['kata'] for x in cur)) > 10):
            baris.append(cur); cur = []; hasil.append(baris); baris = []
    if cur: baris.append(cur)
    if baris: hasil.append(baris)
    return hasil


FC = None
def gambar_caption(potongan, aktif):
    """Overlay RGBA caption: narator = kata aktif kuning, lainnya putih. Dialog tokoh = warna tokoh (aktif putih) + label nama."""
    global FC
    FC = FC or font('Bangers-Regular.ttf', CAP['ukuran'])
    lay = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    y = int(H * CAP['y'])
    tokoh = potongan[0][0].get('tokoh')
    if tokoh:
        wt = tuple(potongan[0][0].get('warna') or KUNING)
        d.text((W / 2, y - 52), tokoh.upper(), font=font('ComicNeue-Bold.ttf', 50), fill=wt, anchor='mm', stroke_width=6, stroke_fill=HITAM)
    for baris in potongan:
        teks = [k['kata'].upper() for k in baris]
        lebar = sum(d.textlength(t, font=FC) for t in teks) + d.textlength(' ', font=FC) * (len(teks) - 1)
        x = (W - lebar) / 2
        for k, t in zip(baris, teks):
            if k.get('tokoh'): isi = PUTIH if k is aktif else tuple(k.get('warna') or KUNING)
            else: isi = KUNING if k is aktif else PUTIH
            d.text((x, y), t, font=FC, fill=isi, stroke_width=max(6, CAP['ukuran'] // 10), stroke_fill=HITAM)
            x += d.textlength(t + ' ', font=FC)
        y += CAP['jarak']
    return lay


def kamera(im, t, arah):
    e = t * t * (3 - 2 * t); z = 1.03 + 0.08 * (e if arah % 2 == 0 else 1 - e)
    cw, ch = W / z, H / z
    dx = (W - cw) * (0.5 + (0.3 if arah % 4 < 2 else -0.3) * (e - 0.5)); dy = (H - ch) * 0.45
    return im.resize((W, H), Image.BICUBIC, box=(dx, dy, dx + cw, dy + ch))


def kartu(bg, atas, bawah, besar=140):
    im = bg.filter(ImageFilter.GaussianBlur(12)); im = Image.blend(im, Image.new('RGB', im.size, HITAM), 0.5)
    d = ImageDraw.Draw(im); y = H * 0.40
    for t in atas:
        d.text((W / 2, y), t, font=font('Bangers-Regular.ttf', besar), fill=KUNING, anchor='mm', stroke_width=8, stroke_fill=HITAM); y += besar * 1.05
    y += 30
    for t in bawah:
        f = font('ComicNeue-Bold.ttf', 58); kata, kini, ls = t.split(), '', []
        for k in kata:
            c = (kini + ' ' + k).strip()
            if d.textlength(c, font=f) <= W - 140: kini = c
            else: ls.append(kini); kini = k
        ls.append(kini)
        for l in ls: d.text((W / 2, y), l, font=f, fill=PUTIH, anchor='mm', stroke_width=4, stroke_fill=HITAM); y += 76
        y += 24
    return im


VOL_KLIP = float(os.environ.get('JOTA_VOL_KLIP', 0.22))


def info_klip(klip, tmp, i, dur):
    """Frame pertama (untuk kartu) dan audio bawaan klip VideoExpress (float32 mono SR, dipotong/ditambah sampai dur)."""
    png = os.path.join(tmp, f'k{i}.png'); wav = os.path.join(tmp, f'k{i}.wav')
    subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', klip, '-frames:v', '1', '-vf', f'scale={W}:{H}', png], check=True)
    r = subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', klip, '-vn', '-ac', '1', '-ar', str(SR), wav])
    audio = np.zeros(int(dur * SR), dtype=np.float32)
    if r.returncode == 0 and os.path.exists(wav):
        with wave.open(wav) as f: a = np.frombuffer(f.readframes(f.getnframes()), dtype=np.int16).astype(np.float32) / 32768
        audio[:min(len(a), len(audio))] = a[:len(audio)]
    return Image.open(png).convert('RGB'), audio


def frame_klip(klip, dur, maks=1.2):
    """Generator frame RGB 1080x1920 30 fps sepanjang dur: klip lebih pendek diperlambat sampai `maks` (kisah.json
    "perlambat_maks"; owner 2026-11-17 minta gerak natural 1x, jadi judul baru memakai 1.0), sisanya frame terakhir ditahan."""
    p = subprocess.run([FFMPEG, '-hide_banner', '-i', klip], capture_output=True, text=True).stderr
    import re
    m = re.search(r'Duration: (\d+):(\d+):([\d.]+)', p); asli = int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3]) if m else dur
    lambat = min(maks, max(1.0, dur / asli))
    vf = f'setpts={lambat:.4f}*PTS,fps={FPS},scale={W}:{H},tpad=stop_mode=clone:stop_duration={dur + 1:.2f}'
    proc = subprocess.Popen([FFMPEG, '-loglevel', 'error', '-i', klip, '-vf', vf, '-t', f'{dur:.3f}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    ukuran = W * H * 3; akhir = None
    while True:
        b = proc.stdout.read(ukuran)
        if len(b) < ukuran: break
        akhir = Image.frombytes('RGB', (W, H), b); yield akhir
    proc.wait()
    while akhir is not None: yield akhir


def sfx_audio(teks, dur, base, tmp):
    """SFX ElevenLabs (cache di <base>/sfx-cache, kunci sha1 teks+durasi) -> float32 mono SR."""
    import hashlib
    cache = os.path.join(base, 'sfx-cache'); os.makedirs(cache, exist_ok=True)
    mp3 = os.path.join(cache, hashlib.sha1(f'{teks}|{dur:.1f}'.encode()).hexdigest()[:16] + '.mp3')
    if not os.path.exists(mp3): elevenlabs.sfx(teks, mp3, round(dur, 1))
    return baca_wav(mp3, tmp, 'sfx-' + os.path.basename(mp3)[:8])


def taruh(arr, t, a, gain=1.0):
    j = max(0, int(t * SR)); n = min(len(a), len(arr) - j)
    if n > 0: arr[j:j + n] += a[:n] * gain


def lapis_watermark(teks):
    """Watermark kecil semi-transparan di pojok kanan atas (owner 2026-11-16: "Kang Ohan Properties", jangan mengganggu).
    Di luar area caption (70% tinggi) dan area tombol/judul platform di bawah."""
    lay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    if not teks: return lay
    d = ImageDraw.Draw(lay); f = font('ComicNeue-Bold.ttf', 30)
    w = d.textlength(teks, font=f)
    d.text((W - 36 - w, CAP['wm_y']), teks, font=f, fill=(255, 255, 255, 135), stroke_width=2, stroke_fill=(0, 0, 0, 90))
    return lay


def kartu_follow(bg, akun):
    """Kartu ajakan follow di akhir: akun = {"judul", "ig", "youtube", "facebook"} (diisi owner; kosong = kartu tidak dibuat)."""
    im = bg.filter(ImageFilter.GaussianBlur(14)); im = Image.blend(im, Image.new('RGB', im.size, HITAM), 0.6)
    d = ImageDraw.Draw(im)
    d.text((W / 2, H * 0.30), akun.get('judul', 'IKUTI KAMI'), font=font('Bangers-Regular.ttf', 120), fill=KUNING, anchor='mm', stroke_width=8, stroke_fill=HITAM)
    baris = [(k, w, akun[k]) for k, w in (('ig', (225, 48, 108)), ('youtube', (230, 33, 23)), ('facebook', (24, 119, 242))) if akun.get(k)]
    label = {'ig': 'Instagram', 'youtube': 'YouTube', 'facebook': 'Facebook'}
    y = H * 0.42
    for k, warna, isi in baris:
        d.rounded_rectangle((110, y, W - 110, y + 150), 40, fill=warna)
        d.text((W / 2, y + 45), label[k], font=font('ComicNeue-Bold.ttf', 44), fill='white', anchor='mm')
        d.text((W / 2, y + 103), isi, font=font('ComicNeue-Bold.ttf', 58), fill='white', anchor='mm')  # huruf kecil asli akun
        y += 190
    return im


def intro_frames(bg, teks=('KANG OHAN', 'PRESENTS'), dur=2.2):
    """Intro sinematik owner 2026-11-17: teks emas "KANG OHAN PRESENTS" muncul membesar-mengecil halus, kilau cahaya
    menyapu huruf, lalu memudar. Latar = frame hook digelapkan dan diburamkan. Generator frame RGB."""
    from PIL import ImageChops
    fp = r'C:\Windows\Fonts\palab.ttf'
    f1, f2 = ImageFont.truetype(fp, 128), ImageFont.truetype(fp, 58)
    mask = Image.new('L', (W, H), 0); d = ImageDraw.Draw(mask)
    d.text((W / 2, H * 0.47), teks[0], font=f1, anchor='mm', fill=255)
    # spasi huruf lebar untuk baris kedua
    t2 = '  '.join(teks[1]); d.text((W / 2, H * 0.47 + 130), t2, font=f2, anchor='mm', fill=255)
    gy = np.linspace(0, 1, H)[:, None]
    emas = np.stack([255 - 60 * gy, 232 - 100 * gy, 160 - 120 * gy], -1) * np.ones((1, W, 1))
    emas = Image.fromarray(np.clip(emas, 0, 255).astype(np.uint8))
    glow = mask.filter(ImageFilter.GaussianBlur(18))
    latar = Image.blend(bg.filter(ImageFilter.GaussianBlur(16)), Image.new('RGB', (W, H), (6, 5, 4)), 0.82)
    xs = np.arange(W)[None, :] + np.arange(H)[:, None] * 0.35
    n = int(dur * FPS)
    for i in range(n):
        t = i / (n - 1)
        a = min(1, t / 0.18) * (1 if t < 0.85 else max(0, (1 - t) / 0.15))
        z = 1.12 - 0.12 * min(1, t / 0.45) ** 0.5
        pos = -300 + (W + 900) * min(1, max(0, (t - 0.25) / 0.45))
        band = np.clip(1 - np.abs(xs - pos) / 110, 0, 1) ** 2
        kilau = Image.fromarray((band * 255).astype(np.uint8))
        teks_rgb = Image.composite(Image.new('RGB', (W, H), (255, 252, 235)), emas, ImageChops.multiply(kilau, mask))
        fr = latar.copy()
        fr.paste(Image.new('RGB', (W, H), (255, 190, 80)), (0, 0), glow.point(lambda v: int(v * 0.55 * a)))
        fr.paste(teks_rgb, (0, 0), mask.point(lambda v: int(v * a)))
        if z != 1:
            cw, ch = W / z, H / z
            fr = fr.resize((W, H), Image.BICUBIC, box=((W - cw) / 2, (H - ch) / 2, (W + cw) / 2, (H + ch) / 2))
        yield fr


def lapis_atas(atas, bawah, besar=None, warna=KUNING):
    """Teks besar di sepertiga atas di atas klip bergerak (judul overlay / teks hook), dengan bayangan gelap lembut."""
    besar = besar or (130 if H > W else 110)
    lay = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    n = len(atas); y0 = H * (0.16 if H > W else 0.14)
    bayang = Image.new('L', (W, H), 0); ImageDraw.Draw(bayang).rectangle((0, y0 - besar * 0.8, W, y0 + besar * (n + 0.6) + 80 * len(bawah)), fill=110)
    lay.paste(Image.new('RGBA', (W, H), (0, 0, 0, 255)), (0, 0), bayang.filter(ImageFilter.GaussianBlur(60)))
    y = y0
    for t in atas:
        d.text((W / 2, y), t, font=font('Bangers-Regular.ttf', besar), fill=warna, anchor='mm', stroke_width=8, stroke_fill=HITAM); y += besar * 1.02
    for t in bawah:
        if t: d.text((W / 2, y + 10), t, font=font('ComicNeue-Bold.ttf', int(besar * 0.42)), fill=PUTIH, anchor='mm', stroke_width=4, stroke_fill=HITAM); y += besar * 0.55
    return lay


def bungkus(teks, maks=16):
    kata, ls, kini = teks.split(), [], ''
    for k in kata:
        c = (kini + ' ' + k).strip()
        if len(c) <= maks: kini = c
        else: ls.append(kini); kini = k
    return ls + [kini]


def main(path):
    base = os.path.dirname(os.path.abspath(path)); m = json.load(open(path, encoding='utf-8'))
    set_rasio(m.get('rasio', '9:16'))
    gdir = os.path.join(base, m.get('gambar_dir', 'gambar'))
    pilih = json.load(open(os.path.join(gdir, 'qc.json'), encoding='utf-8')).get('pilih', {}) if os.path.exists(os.path.join(gdir, 'qc.json')) else {}
    nar = m['narator']; out = os.path.join(base, m.get('keluaran', 'video/kisah.mp4')); os.makedirs(os.path.dirname(out), exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        adegan = []
        for i, a in enumerate(m['adegan']):
            klip = os.path.join(base, a['klip']) if a.get('klip') else None
            f = klip or (os.path.join(base, a['gambar']) if a.get('gambar') else os.path.join(gdir, pilih.get(f"hal-{a['hal']:02d}") or ''))
            if not os.path.isfile(f): raise SystemExit(f'adegan {i + 1}: gambar/klip tidak ada atau tidak lolos QC ({f})')
            # Cache narasi (<base>/narasi-cache): render ulang (mis. hanya ganti SFX/klip) tidak memakai kredit ElevenLabs lagi.
            # Dialog: tiap segmen (narator/tokoh) di-TTS sendiri, disambung dengan jeda 0.3 detik; caption per segmen.
            cdir = os.path.join(base, 'narasi-cache'); os.makedirs(cdir, exist_ok=True)
            potongan, kata, bagian, t = [], [], [], 0.0
            for j, (teks, s, tokoh) in enumerate(segmen_narasi(a, m, nar)):
                mp3, kw = tts_cache(teks, s, cdir)
                au = baca_wav(mp3, tmp, f'{i}-{j}', s.get('efek') or s.get('eq'))
                if bagian: bagian.append(np.zeros(int(JEDA_DIALOG * SR), dtype=np.float32)); t += JEDA_DIALOG
                kw = [dict(k, mulai=k['mulai'] + t, selesai=k['selesai'] + t, tokoh=tokoh, warna=s.get('warna')) for k in kw]
                kata += kw; potongan += potong_caption(kw); bagian.append(au); t += len(au) / SR
            audio = np.concatenate(bagian); dur = len(audio) / SR + 0.45
            if klip: im, sfx = info_klip(klip, tmp, i, dur)
            else: im, sfx = Image.open(f).convert('RGB').resize((W, H), Image.LANCZOS), None
            adegan.append({'img': im, 'klip': klip, 'sfx': sfx, 'audio': audio, 'kata': kata, 'dur': dur, 'potong': potongan})
            print('narasi', i + 1, f"{adegan[-1]['dur']:.1f} detik", flush=True)
        T_JUDUL, T_TUTUP, X = 2.5, 4.0, int(0.4 * FPS)
        akun = {k: v for k, v in (m.get('akun') or {}).items() if v}
        T_FOLLOW = 3.5 if any(akun.get(k) for k in ('ig', 'youtube', 'facebook')) else 0
        # Urutan: tanpa "intro" = judul lalu adegan. Dengan "intro" (owner 2026-11-17): adegan 1 sebagai hook, lalu
        # intro emas KANG OHAN PRESENTS + dentuman, lalu kartu judul, lalu adegan 2 dst.
        I = m.get('intro') or {}
        T_INTRO = float(I.get('durasi', 2.2)) if I else 0
        # Feedback Facebook 2026-11-17 (Kisah Firaun: retensi jatuh 41.6% -> 14% di detik 2-4 karena kartu judul buram diam):
        # "judul_overlay" (default saat ada intro) menghapus kartu judul diam; judul tampil di atas klip adegan 2 yang bergerak.
        # "hook_teks" = kalimat klimaks besar di 0-2.2 detik adegan 1.
        J_OVER = bool(m.get('judul_overlay', bool(I)))
        if I: urutan = [('adegan', 0), ('intro', None)] + ([] if J_OVER else [('judul', None)]) + [('adegan', i) for i in range(1, len(adegan))]
        else: urutan = ([] if J_OVER else [('judul', None)]) + [('adegan', i) for i in range(len(adegan))]
        I_JUDUL = (1 if I else 0) if J_OVER else None  # adegan yang diberi judul overlay
        dur_item = lambda k, i: adegan[i]['dur'] if k == 'adegan' else (T_INTRO if k == 'intro' else T_JUDUL)
        total = sum(dur_item(k, i) for k, i in urutan) + T_TUTUP + T_FOLLOW
        L = int((total + 1) * SR)
        narasi = np.zeros(L, dtype=np.float32); latar = np.zeros(L, dtype=np.float32); t0 = 0.0
        # SFX ElevenLabs (owner 2026-11-16 "tambahkan sfx supaya tambah seru"): per adegan ("sfx"), whoosh transisi, dentuman judul.
        S = m.get('sfx') or {}
        vol_sfx, vol_trans = float(S.get('volume', 0.5)), float(S.get('volume_transisi', 0.55))
        whoosh = sfx_audio(S['transisi'], 1.2, base, tmp) if S.get('transisi') else None
        for n_item, (k, i) in enumerate(urutan):
            if k == 'judul' and S.get('judul'): taruh(latar, t0, sfx_audio(S['judul'], 2.5, base, tmp), 0.8)
            if k == 'intro': taruh(latar, t0, sfx_audio(I.get('sfx', 'cinematic trailer logo reveal, deep boom impact with shimmering sparkle and reverb tail'), T_INTRO, base, tmp), 0.9)
            if k == 'adegan':
                if i == I_JUDUL and S.get('judul'): taruh(latar, t0, sfx_audio(S['judul'], 2.5, base, tmp), 0.7)
                a = adegan[i]; taruh(narasi, t0 + (0.0 if n_item == 0 else 0.15), a['audio']); a['t0'] = t0
                if a['sfx'] is not None: taruh(latar, t0, a['sfx'], VOL_KLIP)
                teks_sfx = m['adegan'][i].get('sfx')
                if teks_sfx: taruh(latar, t0, sfx_audio(teks_sfx, min(22, a['dur']), base, tmp), vol_sfx)
                if whoosh is not None and n_item > 0: taruh(latar, t0 - 0.35, whoosh, vol_trans)
            t0 += dur_item(k, i)
        if m.get('penutup') and S.get('penutup'): taruh(latar, t0, sfx_audio(S['penutup'], 4.0, base, tmp), 0.6)
        # Ducking: latar diturunkan sampai 65% saat narator bicara (envelope 0.3 detik), narasi tetap dominan.
        env = np.convolve(np.abs(narasi), np.ones(int(0.3 * SR)) / int(0.3 * SR), mode='same')
        env = env / max(1e-6, env.max())
        latar = latar * (1 - 0.65 * np.clip(env * 3, 0, 1))
        narasi = narasi / max(1e-6, np.abs(narasi).max())
        mix = np.clip(narasi * 0.85 + latar, -1, 1)
        mix = mix / max(1.0, np.abs(mix).max()) * 0.95
        wav = os.path.join(tmp, 'suara.wav')
        with wave.open(wav, 'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
        proc = subprocess.Popen([FFMPEG, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                                 '-i', wav, '-shortest', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p',
                                 '-c:a', 'aac', '-b:a', '160k', '-ar', str(SR), '-movflags', '+faststart', out], stdin=subprocess.PIPE)
        wm = lapis_watermark(m.get('watermark', ''))
        def tulis(im):
            if m.get('watermark'): im = im.convert('RGBA'); im.alpha_composite(wm); im = im.convert('RGB')
            proc.stdin.write(im.tobytes())
        judul = kartu(adegan[0]['img'], bungkus(m.get('judul', '')), [m.get('subjudul', '')])
        lay_judul = lapis_atas(bungkus(m.get('judul', ''), 18 if H > W else 30), [m.get('subjudul', '')]) if J_OVER else None
        lay_hook = lapis_atas(bungkus(m['hook_teks'].upper(), 16 if H > W else 28), [], besar=118 if H > W else 96, warna=PUTIH) if m.get('hook_teks') else None
        prev, cache = None, {}
        for k, i in urutan:
            if k == 'judul':
                for f in range(int(T_JUDUL * FPS)): tulis(Image.blend(prev, judul, f / X) if prev is not None and f < X else judul)
                prev = judul; continue
            if k == 'intro':
                for fr in intro_frames(adegan[0]['img'], tuple(I.get('teks', ('KANG OHAN', 'PRESENTS'))), T_INTRO): tulis(fr)
                prev = fr; continue
            a = adegan[i]; n = int(a['dur'] * FPS)
            sumber = frame_klip(a['klip'], a['dur'], float(m.get('perlambat_maks', 1.2))) if a['klip'] else None
            for f in range(n):
                t = f / FPS; fr = next(sumber) if sumber else kamera(a['img'], f / max(1, n - 1), i)
                waktu = t - 0.15
                pot = next((p for p in a['potong'] if p[0][0]['mulai'] - 0.05 <= waktu <= p[-1][-1]['selesai'] + 0.25), None)
                if pot:
                    aktif = next((k for b in pot for k in b if k['mulai'] <= waktu <= k['selesai'] + 0.05), None)
                    kunci = (i, id(pot), id(aktif))
                    if kunci not in cache: cache[kunci] = gambar_caption(pot, aktif)
                    fr = fr.convert('RGBA'); fr.alpha_composite(cache[kunci]); fr = fr.convert('RGB')
                lap = lay_hook if (i == 0 and lay_hook is not None and t < 2.4) else (lay_judul if (i == I_JUDUL and lay_judul is not None and t < 3.0) else None)
                if lap is not None:
                    a_ = min(1, t / 0.2, (2.4 if i == 0 else 3.0) - t) if i == I_JUDUL or i == 0 else 1
                    l2 = lap if a_ >= 1 else Image.fromarray((np.array(lap) * np.array([1, 1, 1, max(0, a_)])).astype(np.uint8))
                    fr = fr.convert('RGBA'); fr.alpha_composite(l2); fr = fr.convert('RGB')
                if f < X and prev is not None: fr = Image.blend(prev, fr, f / X)
                tulis(fr)
            prev = fr
        tutup = kartu(adegan[-1]['img'], ['PESAN HIKMAH'], m.get('penutup', []), besar=110)
        for f in range(int(T_TUTUP * FPS)): tulis(Image.blend(prev, tutup, f / X) if f < X else tutup)
        if T_FOLLOW:
            ikut = kartu_follow(adegan[-1]['img'], akun)
            for f in range(int(T_FOLLOW * FPS)): tulis(Image.blend(tutup, ikut, f / X) if f < X else ikut)
        proc.stdin.close(); proc.wait()
        if proc.returncode: raise SystemExit('ffmpeg gagal')
    print('video', out, f'{total:.1f} detik')


if __name__ == '__main__':
    if len(sys.argv) != 2: raise SystemExit(__doc__)
    main(sys.argv[1])
