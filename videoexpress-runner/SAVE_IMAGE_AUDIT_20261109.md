# Audit Save Image — Claude dan ChatGPT

Status: **TESTED — satu gambar dihasilkan, disimpan, dan ditemukan/dipilih kembali dari My AI Images**. Kualitas produksi belum disetujui; QC tetap PENDING. Instruksi owner 2026-11-09: perbaiki kode dan regression test, uji satu gambar hingga tersimpan dan ditemukan kembali; jangan ubah auto:false, lewati QC, render atau publish video.

## Bukti kegagalan dan root cause

- Run `42546871975`, job `128933661565`, source `04cddcedfee3e3efb807431c24cb3f2d2182de16`: login OK 01:41:59 UTC. SHOT04 menghasilkan satu image `/preview/…jpg` pada 01:42:08. Kedua pencarian Save di slide gagal; `SAVE_FAILED / PREVIEW_ONLY`, exit 1. Upload PNG ke Drive bukan bukti My AI Images.
- PR #18, head `4870f7e52b0e26eeab7130c9ea32d47afbc69a53`, draft: label fallback tetap dibatasi slide. Klasifikasi preview masih memakai ketiadaan `.button-save-image` di slide; patch itu belum menyelesaikan jalur single image dan belum punya regression/live test.
- Pemetaan read-only `42572311547`, job `129012236814`, source `2b22737cac738e0a87fd8b28b04d0b191dbc83a8`: berhasil login 06:19:59 UTC, membaca skrip UI `/bundle/js/videoeditor.min.js`. `ModalCreateWithAi` memakai `.image-slider-buttons` pada modal untuk single image; pair memakai kontrol `.swiper-slide-pair-item`. Handler UI Save mengirim `uuid`, `isShared`, `generatorName`, mengembalikan `mediaId`, lalu menampilkan tautan My AI Images. Tidak membuat gambar/video selama pemetaan.
- Bug tambahan: `idGambarBaru(0)` dipakai sebagai snapshot sekaligus lower bound; saat library kosong, polling mengembalikan objek snapshot alih-alih array. Polling semua ID baru juga bisa mencampur aset dari job lain.

## Perbaikan 0.18.4

`image-save.mjs`: scope active slide untuk pair dan toolbar modal untuk single. Hanya kontrol Save eksplisit yang terlihat dan aktif; ambiguity berhenti. Listener respons dipasang sebelum klik; tidak mengirim endpoint Save secara langsung. Receipt wajib mediaId positif, UUID, isShared=0 dan respons sukses.

`runner.mjs gambar`: ambil hanya mediaId dari receipt, rename dan baca ulang nama persis, download dan catat SHA-256 file preview serta library. Bila encoding berbeda, cocokkan pixel hasil decode yang dinormalisasi 128×128: aspek berbeda maksimal 0,5%, RGB RMSE maksimal 0,02. Identitas mediaId dan hasil visual tetap harus cocok; ini bukan persetujuan QC. Reload halaman; ambil lagi aset dari API library, buka Use from Library → My AI Images → nama persis → Choose. Simpan screenshot dan `library-evidence.json` berisi commit, run, ID, hash, nama, hasil retrieval; QC tetap pending.

Journal `*-save-receipts.json` mencegah generate ulang bila Save sudah dikonfirmasi namun retrieval gagal. Journal parsial/different prompt berhenti untuk inspeksi. Kandidat lama tanpa bukti, deleted asset, atau hash/prompt berubah tidak boleh dianggap selesai. Snapshot memakai `idGambarBaru()`; lower bound 0 sah.

## Regression dan batas pengujian

- `node apps/videoexpress-runner/test.mjs`: lulus lokal, termasuk receipt privat, server error, mediaId job lain, rename mismatch.
- `JOTA_TEST_CHROMIUM=/usr/bin/chromium node apps/videoexpress-runner/test-image-save.mjs`: lulus lokal dengan Chromium. Fixture mencakup toolbar di luar slide, pair, hidden/disabled/old slide/ambiguous control, klik dan respons Save, empty-library zero-bound.
- Fixture browser bukan uji akun VideoExpress. Pair belum diuji ulang live; pengujian nyata dibatasi satu gambar tanpa reference.
- `plan` input uji hanya ditolak gate gambar (sesuai tujuan); validator prompt lolos. Gate tidak dicabut untuk membuat plan hijau.

## Uji nyata terisolasi

Input: `gpt/productions/JOTA-M1-SAVE-IMAGE-TEST-20261109/shots.json`, satu SHOT04, tag `SVIMG09`, `auto:false`, `gate:gambar`, Enhance/Creative/Gallery OFF, tanpa reference lama. Salinan prompt asli dengan ejaan eksplisit no eyes/no nose/no mouth agar lolos validator V6. Folder produksi awal tidak dijalankan ulang.

Workflow branch `fix/save-image-verified-20261109` di `Jota_runner`: `jota-runner-uji.yml`, mode gambar. Hanya npm/test/Chromium/gambar/artifact; tidak ada antrean produksi, render, upload video, publish atau persetujuan owner otomatis. Login saat pengujian mematuhi jeda satu login per 20 menit. Run 42573918068 (source 16d4063) menghasilkan satu gambar dan Save mengembalikan mediaId `48060154`, UUID `aa71a83f-f7c9-44fa-960e-275466226da9`, isShared=0. Nama berhasil dibaca ulang. Pada 06:40:31 UTC run berhenti karena byte SHA berbeda; screenshot memuat pesan UI bahwa gambar tersimpan di My AI Images. Run ini membuktikan Save terjadi; acceptance diselesaikan run pemulihan di bawah.

Run 42574840109 (source 6c40f8c) mencoba sesi yang tersedia saja: `SESSION_REQUIRED`, tidak ada login dan tidak ada generate. Run 42574993572 dibatalkan ketika masih menunggu jeda, sebelum login/generate, agar pengujian memakai kode final dengan penolakan receipt duplikat dan retensi bukti kegagalan.

**Run akhir [42575475145](https://github.com/ohan78/Jota_runner/actions/runs/42575475145), job 129022190576: SUCCESS.** Source kode `c1edfa8bb48143c69d9decb6013822ab4f225cdf`; workflow saat run `5a4eac754c62f61f0d41605d8250b41dd5fc8467`. Login 07:01:19 UTC. Journal dipulihkan, **tidak mengklik Create Image lagi**. Pada 07:01:22 aset terbaca lewat API My AI Images, nama persis `SVIMG09-SHOT04-AWAL-1`. Halaman di-reload; Runner membuka Use from Library → My AI Images, menemukan nama tersebut, menyimpan screenshot, lalu Choose berhasil. Selesai 07:01:32 UTC. `library-evidence.json` mencatat `reloaded:true`, `retrieved:true`, `ui_retrieved:true`, `owner_approved:false`.

| Bukti | Nilai |
|---|---|
| Media ID / UUID | `48060154` / `aa71a83f-f7c9-44fa-960e-275466226da9` |
| Dimensi preview / library | 1088×1920 / 1088×1920 |
| SHA-256 preview | `5277b0afc7128e9ee4dd53a83d003a11a7d65d9aeecb450c26415381801b1add` |
| SHA-256 library | `a435e48fde22f9266ba4b2da1c386afc73ae3ec1045f6117fed4bd530c88c76e` |
| RGB RMSE / aspect error | `0.005718863065332846` (<0.02) / `0` |
| Artifact | [13655393377](https://github.com/ohan78/Jota_runner/actions/runs/42575475145/artifacts/13655393377), digest `sha256:a2fd74071bfc563f9ecb670a2ee72a7c48c47f2d36132f7d91bddd05d9feb53f` |

Gambar preview, unduhan library, dan screenshot library juga dibuka dan dibandingkan oleh ChatGPT. Perbedaan byte tidak berarti aset salah; keduanya JPEG dengan ukuran sama dan isi visual cocok. File `SHOT04-1.png` mengikuti nama legacy Runner, tetapi bytes-nya JPEG; hash di atas berlaku untuk bytes asli tanpa konversi.

Bukti permanen di [folder uji](../../gpt/productions/JOTA-M1-SAVE-IMAGE-TEST-20261109/awal/): `library-evidence.json`, `SHOT04-1-content.json`, preview asli, gambar library, screenshot `SHOT04-48060154-library.png`, receipt, kandidat, `qc.json`. Kerangka QC memiliki owner PENDING, tidak ada cek PASS atau APPROVED. Validator prompt valid; `plan` tetap exit 1 karena gate gambar menahan video. Tidak ada produksi/publikasi video atau perubahan auto:false.

PR perbaikan: [Content Factory #19](https://github.com/ohan78/Jota_Content_Factory/pull/19). PR regression otomatis/workflow uji khusus: [Runner #1](https://github.com/ohan78/Jota_runner/pull/1). Workflow permanen `jota-save-image-uji.yml` default peta, source_ref dapat dipin ke SHA. Workflow gambar menjalankan kedua regression test sebelum Generate. Bengkel umum dipertahankan. Mode gambar pada fixture yang sudah memiliki receipt memulihkan aset yang sama; uji live baru wajib memakai folder/tag baru yang diotorisasi, jangan menghapus journal untuk memaksa generate ulang.

## Jika uji gagal

Jangan mengganti kegagalan menjadi success atau memakai preview sebagai kandidat. Baca save-error, journal dan screenshot. Jika Save sudah terjadi, pulihkan retrieval dari receipt; jangan generate ulang. Jangan merge PR selector-only #18 sebagai solusi. Lanjutkan perbaikan berdasarkan bukti. Status TESTED di atas hanya berlaku pada jalur satu gambar tanpa reference yang diuji, bukan jaminan QC atau seluruh mode VideoExpress.
