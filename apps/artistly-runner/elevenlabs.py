#!/usr/bin/env python3
"""ElevenLabs TTS untuk motion-komik.py (owner punya akun, 2026-11-16).

API key TIDAK PERNAH ditulis di repo atau dicetak. Dibaca dari environment ELEVENLABS_API_KEY, atau dari
environment User Windows (HKCU\\Environment) yang diisi owner sendiri:
  [Environment]::SetEnvironmentVariable('ELEVENLABS_API_KEY', '<key>', 'User')

Pakai: python elevenlabs.py suara      -> daftar suara di akun (nama, voice_id, label), tanpa key
       python elevenlabs.py kuota      -> sisa karakter langganan
"""
import json, os, sys, urllib.request, urllib.error

API = 'https://api.elevenlabs.io'


def kunci():
    k = os.environ.get('ELEVENLABS_API_KEY')
    if not k and os.name == 'nt':
        try:
            import winreg
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, 'Environment') as h:
                k = winreg.QueryValueEx(h, 'ELEVENLABS_API_KEY')[0]
        except OSError:
            k = None
    if not k: raise SystemExit('ELEVENLABS_API_KEY belum diisi owner (lihat docstring elevenlabs.py).')
    return k.strip()


def _req(path, data=None, accept='application/json'):
    h = {'xi-api-key': kunci(), 'Accept': accept}
    body = None
    if data is not None: h['Content-Type'] = 'application/json'; body = json.dumps(data).encode()
    r = urllib.request.Request(API + path, data=body, headers=h, method='POST' if body else 'GET')
    try:
        with urllib.request.urlopen(r, timeout=120) as resp: return resp.read()
    except urllib.error.HTTPError as e:
        pesan = e.read().decode(errors='replace')[:300]
        raise SystemExit(f'ElevenLabs HTTP {e.code}: {pesan}')


def tts(teks, voice_id, out_mp3, model='eleven_multilingual_v2', stability=0.4, similarity=0.8, style=0.35, speed=1.0):
    """Tulis mp3 44.1 kHz. style lebih tinggi = lebih ekspresif."""
    data = {'text': teks, 'model_id': model,
            'voice_settings': {'stability': stability, 'similarity_boost': similarity, 'style': style, 'use_speaker_boost': True, 'speed': speed}}
    open(out_mp3, 'wb').write(_req(f'/v1/text-to-speech/{voice_id}?output_format=mp3_44100_128', data, 'audio/mpeg'))


def tts_waktu(teks, voice_id, out_mp3, model='eleven_multilingual_v2', stability=0.5, similarity=0.8, style=0.25, speed=1.0):
    """Seperti tts(), plus waktu tiap kata dari endpoint with-timestamps: list {kata, mulai, selesai} (detik)."""
    import base64
    data = {'text': teks, 'model_id': model,
            'voice_settings': {'stability': stability, 'similarity_boost': similarity, 'style': style, 'use_speaker_boost': True, 'speed': speed}}
    r = json.loads(_req(f'/v1/text-to-speech/{voice_id}/with-timestamps?output_format=mp3_44100_128', data))
    open(out_mp3, 'wb').write(base64.b64decode(r['audio_base64']))
    al = r.get('alignment') or r.get('normalized_alignment') or {}
    kata, cur, mulai, akhir = [], '', None, None
    for ch, s, e in zip(al.get('characters', []), al.get('character_start_times_seconds', []), al.get('character_end_times_seconds', [])):
        if ch.isspace():
            if cur: kata.append({'kata': cur, 'mulai': mulai, 'selesai': akhir}); cur = ''
            continue
        if not cur: mulai = s
        cur += ch; akhir = e
    if cur: kata.append({'kata': cur, 'mulai': mulai, 'selesai': akhir})
    return kata


def sfx(teks, out_mp3, durasi=None, pengaruh=0.45):
    """Sound effect dari teks (ElevenLabs Sound Effects, /v1/sound-generation). durasi 0.5-22 detik atau None (otomatis)."""
    data = {'text': teks, 'prompt_influence': pengaruh}
    if durasi: data['duration_seconds'] = max(0.5, min(22.0, float(durasi)))
    open(out_mp3, 'wb').write(_req('/v1/sound-generation?output_format=mp3_44100_128', data, 'audio/mpeg'))


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else ''
    if cmd == 'suara':
        v = json.loads(_req('/v2/voices?page_size=100'))
        for x in v.get('voices', []):
            lab = x.get('labels') or {}
            print(f"{x['name'][:28]:28} {x['voice_id']}  {lab.get('gender', '')} {lab.get('age', '')} {lab.get('accent', '')} {lab.get('language', '')} {x.get('category', '')}")
    elif cmd == 'kuota':
        s = json.loads(_req('/v1/user/subscription'))
        print('paket', s.get('tier'), 'terpakai', s.get('character_count'), 'dari', s.get('character_limit'))
    else:
        raise SystemExit(__doc__)


if __name__ == '__main__':
    main()
