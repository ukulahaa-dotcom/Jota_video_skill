# CloneVoice: narasi, dialog, dan SFX JOTA di Mac

Keputusan owner 2026-11-26 (chat Mac, Claude): "rombak untuk audio dan sfx menggunakan app.clonevoice.ai". Semua suara produksi JOTA di Mac (narator, dialog tokoh, suara latar, foley) dibuat di **app.clonevoice.ai**. ElevenLabs tidak lagi dipakai untuk produksi baru di Mac. Aturan lain tetap berlaku: VideoExpress hanya visual, audio native klip dimute, tanpa musik, satu pembicara per shot, dan publikasi menunggu persetujuan owner.

Status: **TESTED** (2026-11-26).
- Uji live: `clonevoice-source.mjs` menghasilkan narasi suara clone owner (MP3 mono 44,1 kHz, 3,98 detik) dan SFX langkah kaki (MP3 stereo, 10,0 detik). Waktu proses 17,5 detik dan 49,9 detik. Hasil uji: `local-state` tidak diubah, file di scratchpad sesi.
- Tes regresi: `apps/videoexpress-runner/test.mjs` dan `Jota_runner/local/test.mjs` PASS.
- Belum ada film penuh dengan CloneVoice yang diperiksa owner.

## Alur kode

| Bagian | File | Isi |
|---|---|---|
| Sumber audio | `apps/videoexpress-runner/clonevoice-source.mjs` | Buka app.clonevoice.ai dengan profil Chrome Worker Runner, kirim cue, tunggu status `Completed` di My Audios (maks 180 detik), unduh, cek decoder ffmpeg. |
| Narasi/dialog/SFX | `apps/videoexpress-runner/narasi-tokoh.mjs` | Dengan `JOTA_AUDIO_PROVIDER=clonevoice`: ucapan → cue `speech`, `suara_latar`/`foley` → cue `sfx` (Design Sound, Non Instrumental). SFX di-loop lalu dipotong sesuai durasi shot. Foley lokal Hunyuan dan suara klip VideoExpress tidak dipakai. |
| Worker | `Jota_runner/local/worker.mjs` | Worker Mac selalu memasang `JOTA_AUDIO_PROVIDER=clonevoice` dan memvalidasi paket sebelum render. Hasil rakitan lama tanpa CloneVoice ditolak (`CLONEVOICE_REASSEMBLY_REQUIRED`). |
| Katalog | `node Jota_runner/local/jota.mjs voices` | Daftar suara clone berstatus Completed (hanya membaca). |
| Pilih narator | `node Jota_runner/local/jota.mjs voice "<nama>"` | Menyimpan `local-state/clonevoice-narrator.json`. Proyek lama tidak berubah. |
| Cek akun | `node Jota_runner/local/jota.mjs check-accounts` | Bagian `clonevoice.verified` dan jumlah suara. |

Cue disimpan di `<proyek>/clonevoice-audio/<sha256>.audio`. Kunci dari `[project, cue]`, jadi teks atau suara yang sama tidak dibuat dua kali. File `.submitted` mencegah kirim ganda; bila status belum `Completed`, cek My Audios dulu sebelum mengulang (`CLONEVOICE_PENDING`). Judul aset di CloneVoice: `JOTA <28 heksa pertama kunci>`.

## Suara

Urutan pemilihan suara per tokoh: `clonevoice_voices` di shots.json → `local-state/clonevoice-narrator.json` (khusus NARATOR) → `local-state/clonevoice-voices.json` → bawaan kode.

Bawaan kode (katalog akun 2026-11-26). Narator default diganti owner 2026-11-26 ke **Gilang Perkasa** setelah film uji 60 detik: suara clone narator lama kadang kurang jelas. Film uji: `gpt/productions/JOTA-UJI-CLONEVOICE-FILM-20261126` (versi narator lama di `versi-aba/`).

| Tokoh | Suara CloneVoice | Bahasa sumber |
|---|---|---|
| NARATOR | Gilang Perkasa (kategori System) | Indonesian |
| ABA | suara clone owner, dipetakan di `local-state/clonevoice-voices.json` (tidak di repo) | Indonesian |
| UMAIR | umair 2 | Indonesian |
| SAHEELA | saheela | Indonesian |

Tokoh lain wajib diisi di shots.json, contoh:

```json
"clonevoice_voices": { "IBU": { "name": "saheela", "sourceLanguage": "Indonesian", "category": "Cloned" } }
```

`category`: `Cloned`, `Designed`, `System`, atau `Public Library`. **Suara Designed dan Public Library hanya bisa menghasilkan audio bahasa Inggris** (tulisan di halaman Create Audio, uji 2026-11-26 dengan favorit owner "Alien Diplomat"); untuk narasi Indonesia pakai System (pilih bahasa Indonesian dulu, 33 suara) atau Cloned. Cari suara: Create Audio > Language Indonesian > Select Voice > Sort Newest. Suara yang tidak ditemukan menghentikan validasi (`CLONEVOICE_VOICE_MISSING`); jangan diganti suara lain diam-diam. Hanya suara yang sudah owner buat atau setujui; jangan membuat clone suara orang lain atau anak tanpa izin owner.

## Aturan paket

- Rakit lokal ffmpeg wajib (`final: finalcut` ditolak).
- Ucapan masuk `dialog`/`narration` shot visual, bukan `suara_untuk`.
- Teks ucapan tidak boleh kosong (tag `[...]` tidak dihitung).
- Untuk `audio_policy: reviewed_vx_sfx`, setiap shot wajib punya `suara_latar` atau `foley`.
- Prompt SFX bahasa Inggris, konkret, sebut "no music, no voice".
- Terms of service CloneVoice harus sudah dicentang di akun (`CLONEVOICE_TERMS_REQUIRED`).

## Sesi dan larangan

- Sesi memakai profil Chrome Worker Runner yang sama dengan VideoExpress dan kunci `videoexpress` (tidak jalan bersamaan dengan render VideoExpress). Sesi aktif terbukti 2026-11-26.
- Bila sesi habis (`CLONEVOICE_SESSION_REQUIRED`), owner login sendiri di Chrome Worker Runner. Agen tidak mengetik kata sandi.
- Kredit CloneVoice terpakai setiap cue baru; uji cukup satu cue pendek.

## PC (E:\JOTA-Standby)

Status PC: **IMPLEMENTED**, uji live di Mac 2026-11-26 dengan sesi CloneVoice Mac (narasi Gilang Perkasa 18,9 dtk, whoosh SFX 1,2 dtk, jalur `motion-kisah.py` tts_cache/sfx_audio). **Belum diuji di Windows PC.**

| File | Isi |
|---|---|
| `apps/artistly-runner/clonevoice.mjs` | CLI Playwright: `login` (owner login sendiri), `suara [Indonesian]` (daftar System + Cloned), `tts <job.json>`, `sfx <job.json>`. Profil: `CLONEVOICE_PROFILE` / `ARTISTLY_PROFILE` / `./profile`. Jangan jalan bersamaan dengan artistly.mjs (profil sama). |
| `apps/artistly-runner/clonevoice.py` | Antarmuka seperti elevenlabs.py: `tts_waktu(teks, suara, out)` → waktu kata, `sfx(teks, out, durasi)` (dipotong/diulang tepat, fade). Waktu kata dari faster-whisper bila ada, selain itu dibagi rata menurut panjang huruf. ffmpeg mengikuti `JOTA_FFMPEG` / path PC. |
| `apps/artistly-runner/motion-kisah.py` | Default `PROVIDER = clonevoice` (env `JOTA_AUDIO_PROVIDER` atau kisah.json `audio_provider`; `elevenlabs` hanya bila diminta eksplisit). Cache `narasi-cache/cv-*.mp3`, `sfx-cache/cv-*.mp3`. |
| `apps/artistly-runner/suara-karakter.json` | `narator.clonevoice` = Gilang Perkasa (System, Indonesian). Entri tokoh lain belum dipetakan: tokoh tanpa kunci `clonevoice` menghentikan render (tidak memakai suara narator atau ElevenLabs diam-diam). |

Langkah pertama di PC:
1. `git pull`, lalu `node clonevoice.mjs login` di `E:\JOTA-Standby\...\apps\artistly-runner`: owner login sendiri di jendela yang terbuka.
2. `node clonevoice.mjs suara Indonesian` untuk melihat suara; isi kunci `"clonevoice": {"nama", "kategori", "bahasa"}` pada tokoh di `suara-karakter.json` (pilihan owner).
3. Uji satu kalimat: `python clonevoice.py tts "Gilang Perkasa" "Assalamualaikum." uji.mp3`, dengarkan, baru render kisah.
Teks + suara sama memakai aset CloneVoice yang sama (tidak membuat ulang, tidak memakai kredit lagi). Bila Whisper menilai lafal meleset, motion-kisah mencetak PERIKSA LAFAL: cek dengan telinga, ubah kata (mis. "ia" → "dia") bila perlu.
