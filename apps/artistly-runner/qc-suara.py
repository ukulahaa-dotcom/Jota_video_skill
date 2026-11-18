#!/usr/bin/env python3
"""QC suara lokal dengan faster-whisper (gratis, tanpa internet setelah model terunduh).

Owner 2026-11-18 (Kisah Dzulqarnain): "suara juga ada bahasa yang aneh". Suara bawaan klip VideoExpress seharusnya hanya
efek suara alam (prompt: "Only these sounds are heard, no music"), tetapi AI video kadang menambah gumaman/ucapan.

Mode:
  klip  : python qc-suara.py klip <hasil.json> <file.mp4 ...>
          Setiap ucapan yang terdeteksi di suara klip = BERSUARA (perlu dibisukan/dipotong/render ulang).
  narasi: python qc-suara.py narasi <hasil.json> <audio> "<teks naskah>"
          Bandingkan transkrip dengan naskah (kemiripan kata) untuk pelafalan yang salah.
Model: E:\\JOTA-Standby\\models\\whisper (faster-whisper "small", CPU int8 agar tidak berebut GPU dengan VLM).
"""
import json, os, re, sys, difflib
from faster_whisper import WhisperModel

MODEL_DIR = os.environ.get('JOTA_WHISPER_DIR', r'E:\JOTA-Standby\models\whisper')
UKURAN = os.environ.get('JOTA_WHISPER_MODEL', 'small')


def muat():
    return WhisperModel(UKURAN, device='cpu', compute_type='int8', download_root=MODEL_DIR, cpu_threads=8)


def ucapan(model, f):
    # vad_filter membuang bagian tanpa suara manusia; no_speech_prob tinggi = kemungkinan bukan ucapan.
    seg, info = model.transcribe(f, vad_filter=True, beam_size=1, condition_on_previous_text=False)
    out = []
    for s in seg:
        t = s.text.strip()
        if t and s.no_speech_prob < 0.6 and len(re.sub(r'\W', '', t)) >= 2:
            out.append({'mulai': round(s.start, 1), 'selesai': round(s.end, 1), 'teks': t, 'no_speech': round(s.no_speech_prob, 2), 'logprob': round(s.avg_logprob, 2)})
    return out, info.language, round(info.language_probability, 2)


def norm(t):
    return re.sub(r"[^a-z0-9' ]", ' ', t.lower()).split()


def main():
    mode, out = sys.argv[1], sys.argv[2]
    model = muat()
    hasil = {}
    if mode == 'klip':
        for f in sys.argv[3:]:
            u, lang, p = ucapan(model, f)
            v = 'BERSUARA' if u else 'LULUS'
            hasil[f] = {'vonis': v, 'bahasa': lang, 'yakin_bahasa': p, 'ucapan': u}
            print(v, os.path.basename(f), lang, p, ' | '.join(f"{x['mulai']}-{x['selesai']}s {x['teks']}" for x in u)[:200], flush=True)
    elif mode == 'narasi':
        f, teks = sys.argv[3], sys.argv[4]
        u, lang, p = ucapan(model, f)
        tr = ' '.join(x['teks'] for x in u)
        mirip = difflib.SequenceMatcher(None, norm(teks), norm(tr)).ratio()
        hasil[f] = {'vonis': 'LULUS' if mirip >= 0.75 else 'CEK_LAFAL', 'mirip': round(mirip, 2), 'transkrip': tr, 'naskah': teks, 'bahasa': lang}
        print(hasil[f]['vonis'], round(mirip, 2), tr[:200], flush=True)
    json.dump(hasil, open(out, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)


if __name__ == '__main__':
    if len(sys.argv) < 4: raise SystemExit(__doc__)
    main()
