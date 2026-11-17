# JOTA Video Skill

Skill produksi video JOTA (salinan dari PC E:\JOTA-Standby\Jota_Content_Factory\skills, 2026-11-17).

- `artistly-runner/` — Artistly + QC lokal + resep video kisah (`RESEP_KISAH.md`, standar emas).
- `videoexpress-runner/` — runner VideoExpress.
- `jota-video/` — skill utama produksi video JOTA.
- `jota-telegram/` — notifikasi Telegram.

Di Mac: clone repo ini lalu salin folder yang dibutuhkan ke folder skills Claude. Jangan simpan API key di repo ini.

- `apps/artistly-runner/` — salinan skrip yang dipakai resep kisah (motion-kisah.py, suara-karakter.json pustaka suara dialog, elevenlabs.py, komik-gaya.json preset kisah-3d-boneka, qc-vlm.mjs, produksi-gambar.mjs). Salin ke Jota_Content_Factory/apps/artistly-runner di Mac. Update 2026-11-17.
