---
name: jota-runner
description: Operator runner JOTA di PC (E:\JOTA-Standby) untuk menjalankan produksi nyata - Artistly (gambar), VideoExpress (video), unduh klip, QC wajah, narasi dan SFX CloneVoice (owner 2026-11-26; motion-kisah.py + clonevoice.py/clonevoice.mjs, lihat jota-video/references/CLONEVOICE_MAC.md bagian PC), rakit, Drive. Pakai saat owner meminta membuat/merender/memperbaiki video JOTA di PC, bukan sekadar merancang. Untuk aturan sutradara/cerita pakai skill jota-sutradara.
---

# JOTA Runner (PC Windows)

Skill ini hanya berfungsi di PC JOTA, karena runner mengendalikan browser profil Artistly/VideoExpress di mesin ini. Aturan kreatif, gerbang penonton, dan templat prompt ada di skill **jota-sutradara**. Baca juga dua skill itu sebelum mulai.

## Lokasi dan alat
- Root: `E:\JOTA-Standby`, repo kerja `E:\JOTA-Standby\Jota_Content_Factory` (aturan proyek: `AGENTS.md`).
- node: `E:\JOTA-Standby\tools\node\node-v22.23.5-win-x64\node.exe`
- ffmpeg: `E:\JOTA-Standby\tools\ffmpeg\ffmpeg-9.0.2-essentials_build\bin`
- git: `E:\JOTA-Standby\tools\git\cmd\git.exe -c safe.directory=* -c user.name='JOTA Windows' -c user.email=jota-windows@localhost`
- Dokumen runner lengkap: `skills\artistly-runner\SKILL.md`, `skills\artistly-runner\RESEP_KISAH.md`, `skills\videoexpress-runner\SKILL.md`, `skills\videoexpress-runner\FIRST_LAST_LIBRARY.md`.
- Login: owner sendiri (`E:\JOTA-Standby\JOTA.cmd login-videoexpress`). Agen tidak mengetik password atau 2FA.

## Perintah inti (cwd `apps\artistly-runner`)
| Langkah | Perintah |
| --- | --- |
| Validasi paket | `node paket-kisah.mjs cek <paketDir> <prodDir> <PREFIX>` |
| Lembar tokoh | `node paket-kisah.mjs lembar ...` |
| Shots | `node paket-kisah.mjs shots <paketDir> <prodDir> <PREFIX> film` (env `BATCH=a-b` atau `HANYA=id,id`) |
| Naskah gambar awal | `node naskah-shot-artistly.mjs <shots.json> <naskah.json> <dari> <sampai>` |
| Gambar Artistly + QC | `node produksi-gambar.mjs <naskah.json> --ulang 1` |
| Impor ke VideoExpress | `node jalankan-vx.mjs impor-artistly <png> <NAMA>` |
| Render | `node jalankan-vx.mjs run <film\shots.json>` |
| Unduh | `node unduh-vx.mjs <dir> <LABEL...> --tunggu 60` |
| QC klip | `node qc-klip.mjs <dir> <mp4>` |
| Validasi shots | `node ..\videoexpress-runner\runner.mjs plan <shots.json>` |

## Aturan operasi (pelajaran nyata)
1. **Per kelompok maksimal 8 shot**: gambar, lalu pilih, impor, dan render. Picker VideoExpress hanya menjangkau sekitar 25 gambar terbaru.
2. Gambar awal dari Artistly. Pilih berdasarkan ISI adegan, karena Artistly kadang mengirim ulang gambar lama (late pickup). Kepala faceless wajib terlihat. Gambar harus di posisi aksi.
3. Perubahan produksi ditulis di `penyesuaian.json` (dengan alasan). Ganti gambar = naikkan `versi`, sehingga ID-nya baru (SHOT1xx/2xx). `pilih.json` memetakan ID ke nama gambar.
4. `paket-kisah shots` menimpa `gambar_sumber.json`, jadi pulihkan dari cadangan sesudahnya. Jangan menjalankannya ke `film\shots.json` saat render sedang berjalan.
5. Satu lock per layanan (`E:\JOTA-Standby\local-state\locks`). Lock mati boleh dihapus hanya setelah memastikan PID-nya tidak ada.
6. QC: `--paksa` hanya setelah tanda QC dilihat mata. Cek strip gerak setiap klip untuk wajah, benda menciut/hilang, gerak aneh, dan aurat.
7. Variabel PowerShell tidak peka huruf besar/kecil. Kunci angka di Add-Member bisa gagal; olah JSON dengan node.
8. Setelah memperbaiki skill atau kode: commit lokal, salin ke mirror `E:\JOTA-Standby\export\Jota_video_skill`, lalu push lewat skrip push mirror (izin tetap owner). File yang memuat nama atau akun owner tidak boleh masuk mirror.
9. Publikasi hanya dengan izin owner. Ustadz cek sebelum tayang.
10. **UI VideoExpress 2026-11-26 (Multi-Shot):** klik JS tidak diproses untuk tombol rasio dan Create Video; runner memakai klik mouse sungguhan. Slider durasi dan centang enhance video prompt hilang; durasi diatur VideoExpress, jadi ukur durasi dari klip yang diunduh. Sebelum menyimpulkan runner rusak, lihat screenshot `gagal-SHOTxx*.png`.
