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

Status PC: **SPEC**. Jalur PC (`apps/artistly-runner/motion-kisah.py` + `elevenlabs.py` + `suara-karakter.json`) masih memakai API ElevenLabs. Modul `apps/videoexpress-runner/clonevoice-source.mjs` di repo ini adalah salinan modul Mac (Playwright, butuh `production-presets.mjs` dan `openBrowser` dari runner Mac), belum bisa dipanggil langsung oleh skrip PC.

Yang perlu dibuat di PC (belum ada, belum diuji):
1. Adaptor CloneVoice untuk `motion-kisah.py`: kirim teks per baris ke app.clonevoice.ai (Create Audio: Language Indonesian → Select Voice kategori System → nama suara → Create New Audio → Generate Audio), tunggu status Completed di My Audios, unduh MP3, cek decoder. SFX lewat Create Instrumental (SFX) / Design Sound, Non Instrumental.
2. Peta suara PC: narator `Gilang Perkasa` (System). Tokoh lain dari katalog akun; suara clone pribadi owner dipetakan di file lokal PC, tidak di repo.
3. Sesi CloneVoice di profil browser runner PC; owner login sendiri, agen tidak mengetik kata sandi.
Sampai adaptor PC selesai dan diuji, agen PC melapor ke owner sebelum membuat audio, bukan memakai ElevenLabs diam-diam.
