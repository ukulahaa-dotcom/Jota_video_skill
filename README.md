# JOTA Video Skill

Skill produksi video JOTA (salinan dari PC E:\JOTA-Standby\Jota_Content_Factory\skills, 2026-11-17).

- `artistly-runner/` — Artistly + QC lokal + resep video kisah (`RESEP_KISAH.md`, standar emas).
- `videoexpress-runner/` — runner VideoExpress.
- `jota-video/` — skill utama produksi video JOTA.
- `jota-telegram/` — notifikasi Telegram.

Di Mac: clone repo ini lalu salin folder yang dibutuhkan ke folder skills Claude. Jangan simpan API key di repo ini.

- `apps/artistly-runner/clonevoice.mjs` + `clonevoice.py` — audio narasi/dialog/SFX dari app.clonevoice.ai (owner 2026-11-26; default motion-kisah.py).
- `apps/artistly-runner/` — salinan skrip yang dipakai resep kisah (motion-kisah.py, suara-karakter.json pustaka suara dialog, elevenlabs.py, komik-gaya.json preset kisah-3d-boneka dan kisah-sinematik-natural (standar baru), qc-vlm.mjs, produksi-gambar.mjs; 2026-11-18: qc-klip.mjs, qc-kepala-lib.mjs, qc-gambar-shot.mjs, vlm-server.mjs, qc-suara.py, qc-cepat.py, jalankan-vx.mjs, unduh-vx.mjs; aset/logo-kang-ohan-v3.png watermark default). Salin ke Jota_Content_Factory/apps/artistly-runner di Mac. Catatan Mac: path E:/JOTA-Standby, llama-server.exe (CUDA) dan faster-whisper perlu disesuaikan dengan instalasi Mac. Update 2026-11-18.

## Versi skill (update terakhir 2026-11-18)

| Skill | Versi | Isi |
|---|---|---|
| artistly-runner | 1.13.0 | Video kisah standar emas: Artistly + QC lokal + VideoExpress + narasi. 1.13.0: konsep disetujui owner (acuan Artistly -> Consistent Character VideoExpress, kelompok gambar diam), emosi tokoh + suasana adegan wajib, doa = gambar diam, unggah Drive lewat G:. 1.12.0: profil fisik per orang (tubuh, tinggi, kulit, usia, baju, aksesoris) + lingkungan wajib (pemeran.mjs), cek keragaman otomatis, preset natural tanpa otot seragam. 1.11.0: prompt klip wajib format HDT-JOTA (prompt-hdt.mjs: SPEED 1x bukan slow motion, gerak per tokoh berdetik berbeda, kamera lengkap, PROP LOCK benda fokus), gerbang prompt di jalankan-vx tanpa --paksa. 1.10.0: watermark logo KO, preset kisah-sinematik-natural (kulit natural, otot, urat), gerak kelompok tidak serempak, impor awal gambar baru, SFX tanpa suara orang, gambar diam setelah 2 kali gagal QC. 1.9.0: QC FIFO paralel (wajah VLM GPU, filter buram, strip gerak), gerbang QC gambar + impor ulang otomatis, QC suara Whisper, aturan arah gerak/pose/tokoh gagah. 1.8.0: preset kisah-3d-boneka dan kisah-sinematik-natural (standar baru), narator Yudo, dialog multi-suara (suara-karakter.json, termasuk kakek/nenek), arahan sutradara owner |
| videoexpress-runner | 1.10.15 | Pengetahuan VideoExpress dan shots.json |
| jota-video | 4.23.27 | Skill utama lama (alur GitHub Actions sudah tidak dipakai; sekarang lokal) + 7 playbook |
| jota-telegram | 1.0.2 | Bot percakapan Telegram |

Cara cek di Mac: buka `<skill>/SKILL.md`, lihat baris `version:`. Folder `apps/artistly-runner/` berisi skrip pendukung (bukan skill).