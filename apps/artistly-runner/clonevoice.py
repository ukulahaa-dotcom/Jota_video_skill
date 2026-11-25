#!/usr/bin/env python3
"""CloneVoice untuk motion-kisah.py (owner 2026-11-26: audio dan SFX JOTA pindah dari ElevenLabs ke app.clonevoice.ai).

Antarmuka sama dengan elevenlabs.py yang dipakai motion-kisah.py:
  tts_waktu(teks, suara, out_mp3) -> [{kata, mulai, selesai}]   suara = dict dengan kunci "clonevoice"
  sfx(teks, out_mp3, durasi)                                     durasi dipotong/diulang tepat (fade di ujung)
Browser dijalankan lewat clonevoice.mjs (Playwright, sesi login owner). Tanpa API key.

Waktu kata: CloneVoice tidak memberi timestamp. Dipakai faster-whisper (word_timestamps) bila terpasang, disejajarkan
ke kata naskah; jika tidak ada, kata dibagi rata menurut panjang huruf di rentang bicara (perkiraan, caption tetap jalan).

Suara: entri suara-karakter.json / "narator" kisah.json memakai kunci
  "clonevoice": {"nama": "Gilang Perkasa", "kategori": "System", "bahasa": "Indonesian"}
Narator tanpa kunci itu memakai narator default PUSTAKA["narator"]["clonevoice"]. Tokoh tanpa kunci itu -> berhenti
(tidak jatuh ke ElevenLabs diam-diam).

Pakai mandiri: python clonevoice.py tts "Nama Suara" "teks" out.mp3   |   python clonevoice.py sfx "prompt" 2.5 out.mp3
"""
import difflib, json, os, re, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
NODE = os.environ.get('JOTA_NODE', 'node')
# ffmpeg sama dengan motion-kisah.py (PC: path tetap; Mac/Linux: JOTA_FFMPEG atau ffmpeg di PATH).
_PC = r'E:\JOTA-Standby\tools\ffmpeg\ffmpeg-9.0.2-essentials_build\bin\ffmpeg.exe'
FFMPEG = os.environ.get('JOTA_FFMPEG') or (_PC if os.name == 'nt' and os.path.exists(_PC) else 'ffmpeg')
FFPROBE = os.path.join(os.path.dirname(FFMPEG), 'ffprobe' + ('.exe' if FFMPEG.endswith('.exe') else '')) if os.path.dirname(FFMPEG) else 'ffprobe'


def _jalan(jenis, job):
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False, encoding='utf-8') as f:
        json.dump(job, f, ensure_ascii=False); p = f.name
    try:
        r = subprocess.run([NODE, os.path.join(HERE, 'clonevoice.mjs'), jenis, p], cwd=HERE, env={**os.environ, 'JOTA_FFMPEG': FFMPEG}, capture_output=True, text=True, timeout=900)
    finally:
        os.unlink(p)
    if r.returncode != 0:
        raise SystemExit(f'CloneVoice {jenis} gagal: {(r.stderr or r.stdout).strip().splitlines()[-1] if (r.stderr or r.stdout).strip() else r.returncode}')


def durasi(f):
    return float(subprocess.run([FFPROBE, '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True, check=True).stdout.strip())


def _rentang_bicara(mp3):
    """(mulai, selesai) bagian bersuara: buang hening di awal/akhir (silencedetect -40 dB)."""
    d = durasi(mp3)
    r = subprocess.run([FFMPEG, '-v', 'info', '-i', mp3, '-af', 'silencedetect=n=-40dB:d=0.15', '-f', 'null', '-'], capture_output=True, text=True)
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', r.stderr)]
    en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', r.stderr)]
    a, b = 0.0, d
    if st and st[0] <= 0.05 and en: a = en[0]
    if st and (len(en) < len(st) or (en and en[-1] >= d - 0.05)): b = st[-1]
    return (a, b) if b - a > 0.2 else (0.0, d)


def _rata(kata, a, b):
    bobot = [max(1, len(k)) + 1 for k in kata]; tot = sum(bobot); t = a; hasil = []
    for k, w in zip(kata, bobot):
        dt = (b - a) * w / tot; hasil.append({'kata': k, 'mulai': round(t, 3), 'selesai': round(t + dt * 0.92, 3)}); t += dt
    return hasil


_WH = None
def _whisper(mp3):
    global _WH
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        return None
    if _WH is None:
        _WH = WhisperModel(os.environ.get('JOTA_WHISPER_MODEL', 'small'), device='cpu', compute_type='int8')
    seg, _ = _WH.transcribe(mp3, language='id', word_timestamps=True)
    return [(w.word.strip(), w.start, w.end) for s in seg for w in (s.words or []) if w.word.strip()]


def _norm(s):
    return re.sub(r'[^\w]', '', s.lower())


def waktu_kata(mp3, teks):
    kata = teks.split()
    a, b = _rentang_bicara(mp3)
    hasil = _rata(kata, a, b)
    w = _whisper(mp3)
    if w:
        sm = difflib.SequenceMatcher(a=[_norm(k) for k in kata], b=[_norm(x[0]) for x in w], autojunk=False)
        for blok in sm.get_matching_blocks():
            for i in range(blok.size):
                hasil[blok.a + i]['mulai'], hasil[blok.a + i]['selesai'] = round(w[blok.b + i][1], 3), round(w[blok.b + i][2], 3)
    for i in range(1, len(hasil)):  # jaga urutan naik walau sebagian kata tidak cocok
        if hasil[i]['mulai'] < hasil[i - 1]['mulai']: hasil[i]['mulai'] = hasil[i - 1]['selesai']
        if hasil[i]['selesai'] <= hasil[i]['mulai']: hasil[i]['selesai'] = hasil[i]['mulai'] + 0.15
    return hasil


def suara_dari(s, pustaka=None):
    cv = s.get('clonevoice') if isinstance(s, dict) else None
    if not cv and pustaka is not None: cv = (pustaka.get('narator') or {}).get('clonevoice')
    if not cv or not cv.get('nama'):
        raise SystemExit(f'Suara "{(s or {}).get("nama", "?")}" belum punya kunci "clonevoice" (nama, kategori, bahasa) di suara-karakter.json')
    return {'nama': cv['nama'], 'kategori': cv.get('kategori', 'System'), 'bahasa': cv.get('bahasa', 'Indonesian')}


def tts_waktu(teks, suara, out_mp3):
    """suara: dict {"nama","kategori","bahasa"} (lihat suara_dari). Tulis mp3, kembalikan waktu kata."""
    _jalan('tts', {**suara, 'teks': teks, 'out': os.path.abspath(out_mp3)})
    return waktu_kata(out_mp3, teks)


def sfx(teks, out_mp3, durasi_detik=None):
    """SFX CloneVoice (Design Sound, Non Instrumental; hasil sekitar 10 detik) dipotong/diulang ke durasi_detik."""
    mentah = out_mp3 + '.cv.mp3'
    if not os.path.exists(mentah): _jalan('sfx', {'teks': teks, 'out': os.path.abspath(mentah)})
    if not durasi_detik:
        os.replace(mentah, out_mp3); return
    d = float(durasi_detik); fade = min(0.4, d / 4)
    subprocess.run([FFMPEG, '-y', '-v', 'error', '-stream_loop', '-1', '-i', mentah, '-t', f'{d:.2f}',
                    '-af', f'afade=t=in:d=0.05,afade=t=out:st={max(0, d - fade):.2f}:d={fade:.2f}', '-ar', '44100', out_mp3], check=True)
    os.remove(mentah)


def main():
    c = sys.argv[1:] or ['']
    if c[0] == 'tts' and len(c) == 4:
        print(json.dumps(tts_waktu(c[2], {'nama': c[1], 'kategori': os.environ.get('CV_KATEGORI', 'System'), 'bahasa': 'Indonesian'}, c[3]), ensure_ascii=False))
    elif c[0] == 'sfx' and len(c) == 4:
        sfx(c[1], c[3], float(c[2])); print(c[3], durasi(c[3]))
    else:
        print(__doc__)


if __name__ == '__main__':
    main()
