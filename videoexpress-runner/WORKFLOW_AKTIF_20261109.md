# Workflow persiapan dan hasil yang bisa ditindaklanjuti

TESTED persiapan dan penyimpanan draft nyata di GitHub; belum klaim gambar baru atau siap produksi.

## Bukti 2026-11-09

- Kode 033edb8, merge Content Factory PR #22 38bc84e; workflow 31fd309, merge Runner PR #3 0267b785.
- Uji verifikasi run 42616952338 SUCCESS: regression/build, tidak commit/generate/render/publish.
- Perintah nyata qcwa30-20261109-siapkan-fix-06 dikirim penjaga run 42618314224; persiapan run **42618344212 SUCCESS**, job 129163764794, source private 0885d5c dan workflow 0267b785.
- Commit **6338430** menyimpan shots.json, HASIL-CEK.txt dan workflow-state.json. Dibaca ulang dari origin/main: 5x6=30 detik, auto:false, gate:gambar, local_face_screen enabled+required, expected_heads 1/1/2/2/2. SHA256 shots bc98f847628fe47104761bbf2cf7314d70da8a76fdc9b4a0ff64ca069ee76567 cocok. Tahap antre gambar dan dispatch produksi SKIPPED.
- Rekonsiliasi run 42618426872 SUCCESS, commit **c904fcf**: status selesai mengikat run_id 42618344212 dan hasil success. Tidak menulis QC PASS/owner APPROVED.
- Node regression/actionlint keempat workflow lulus. Child generate uji-gambar baru regression, **belum live** dalam perubahan ini. Pilot ini belum memiliki gambar asli baru. Pemeriksa model lokal sebelumnya diuji run 42591704690, bukan bukti gambar pilot ini.

Masalah terbukti: run siapkan 42615775890 tetap memanggil runner plan, sehingga BARU+gate:gambar menahan draft sebelum shots.json disimpan. Status perintah lama “dijalankan” hanya membuktikan dispatch, tidak mempunyai korelasi run. Workflow lama bahkan menyuruh mengulang buat untuk penolakan gate yang sama.

## Perilaku

- `siapkan`: cek brief, generator, validasi schema/prompt shots; simpan shots.json, HASIL-CEK.txt, workflow-state.json dalam satu commit. Gate gambar dinilai sebagai status produksi yang masih tertahan, bukan alasan menggagalkan persiapan. auto:false tetap false. Tidak menghasilkan gambar atau video.
- `uji-gambar`: persiapan yang sama, lalu tambahkan tepat satu perintah gambar anak `<id>-gambar` ke gpt/perintah.json. Penjaga menjalankannya setelah jeda login memenuhi syarat. Tidak mengantre video atau mengisi QC PASS/APPROVED.
- `gambar`: workflow gambar yang sudah ada; cek hash draft jika disuplai, generate/Save/library tetap oleh Runner, pemeriksa CPU lokal tetap required sesuai proyek. Semua ditolak atau tidak pasti menghasilkan feedback, bukan regenerasi tanpa batas.
- `buat`/`produksi`: tetap mempunyai pemeriksaan gate produksi. Bukan cara menyiapkan gambar yang belum disetujui. Perubahan ini tidak mengotorisasi video.

Contoh perintah (SPEC contoh, jangan disalin dengan ID yang sudah digunakan):

```json
{"id":"proyek-uji-gambar-unik","aksi":"uji-gambar","folder":"gpt/productions/JOTA-M1-NAMA-20261109","slot":3}
```

Perintah eksplisit uji-gambar dibutuhkan untuk lanjut otomatis. Siapkan saja tetap berhenti sesudah persiapan sesuai arti perintahnya. Jangan menambah perintah duplikat ketika status dikirim/berjalan/menunggu_gambar/ditahan. Jeda login dapat menahan gambar; persiapan lain tidak ikut macet di belakangnya.

## Bukti dan tindakan agen

`workflow-state.json` memuat tahap, run ID/URL, source commit, hash brief/shots, error, peringatan, gate produksi dan next_action. Hasil ini bukan PASS gambar. Generator dijalankan pada folder sementara tanpa JOTA_LEWATI_QC; hasil gagal tidak menimpa shots yang tervalidasi. Sebelum push, hash brief/shots dicek lagi setelah rebase. Jika brief berubah, berhenti agar draft usang tidak diteruskan.

Status perintah baru dihubungkan ke nama run yang mengandung ID persis: dikirim, berjalan, menunggu_gambar, selesai, gagal atau perlu_audit. Perintah lama tanpa ID run tidak ditebak berdasarkan waktu. “Selesai” berarti workflow tahap itu selesai, bukan episode lolos QC. Kegagalan tidak otomatis mengirim ulang prompt yang sama. Run yang belum ditemukan setelah sepuluh menit diberi perlu_audit, tidak di-dispatch ganda. Korelasi memakai 100 run terbaru; bila run aktif keluar dari jendela, agen perlu audit Actions langsung.

Claude/ChatGPT selama sesi aktif: baca status dan run terkait sampai terminal; baca HASIL-CEK.txt/workflow-state.json, dan untuk gambar awal/local-face-feedback.md serta local-face-screen.json. Jika perlu revisi, perbaiki penyebab lalu validasi sebelum ID perintah baru. Dua kegagalan dengan sebab sama harus diaudit, bukan pengulangan buta. Jangan mengakhiri sesi hanya karena dispatch diterima ketika langkah berikutnya masih dapat dikerjakan. Berhenti pada hasil terverifikasi atau hambatan yang membutuhkan owner.

GitHub Actions tidak dapat membangunkan percakapan ChatGPT/Claude yang telah selesai dengan sendirinya. Revisi prompt oleh agen tetap membutuhkan sesi aktif atau integrasi agen terpisah. Workflow ini tidak memakai API inferensi berbayar, tidak mengirim Telegram, dan tidak menjanjikan revisi otomatis di luar sesi.

## Uji tanpa produksi

Workflow jota-gpt-antre menerima source_ref + verifikasi_saja:true + siapkan_saja:true. Ref selain main hanya boleh mode verifikasi. Mode ini menjalankan regression dan persiapan di checkout sementara, tidak commit/menambah antrean/generate/render/publish. Gunakan SHA kode private untuk audit.

Regression mencakup auto:false+BARU lolos persiapan tetapi tetap ditolak gate produksi, draft salah tidak menimpa shots, environment tidak melewati QC, korelasi ID run, child gambar tunggal dan hash, ID/path/slot tidak sah, gate dan owner tidak diluluskan. actionlint memeriksa empat workflow yang diubah.
