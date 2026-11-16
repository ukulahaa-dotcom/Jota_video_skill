# Uji Runner di GitHub Actions (2026-11-01)

Tujuan: memastikan VideoExpress menerima Runner dari server GitHub, supaya produksi tidak bergantung pada laptop.

Workflow `.github/workflows/jota-runner-uji.yml` (dijalankan manual dari tab Actions atau oleh agen):
- `login`: buka VideoExpress, cek login, buka dialog Create lalu tutup. Tidak memakai kredit.
- `shot`: kirim satu shot 5 detik tanpa orang (`shots.json` di folder ini, tag UJIGH1). Memakai satu kredit video.

Login memakai secret `VX_SESSION` (sesi dari Mac, kirim `/sesi` ke bot Telegram JOTA) atau `VX_EMAIL` dan `VX_PASSWORD`.
`"auto": false` supaya Runner jaga di Mac tidak ikut menjalankannya.
