# Progressive image QC to video

Keputusan owner: shot independen yang SELURUH kriteria QC lolos boleh dikirim ke renderer tanpa menunggu shot lain. Bukan PASS faceless saja. episode auto:false tetap; scope memverifikasi local face, visual calibration, image/prompt SHA dan Save/reload/library sebelum memasang gambar dalam memori untuk satu shot. LAST_FRAME belum dikirim secara progresif. Final assembly menunggu episode lengkap.

Jalankan progressive-image-qc.mjs dari workflow gambar. Ia menyimpan qc.json/local-visual-qc.json per shot, journal STARTED sebelum browser submit dan progress setelah submit ke GitHub. Journal ambigu tidak otomatis diulang dan memblokir transisi final sampai rekonsiliasi. /stop video_after_qc:false memblokir tahap selanjutnya. Tidak ada upload/publikasi dalam jalur parsial.

Super Storyboard: sebelumnya hanya STORYBOARD/IMAGE_QC/RUNNER_MANIFEST di akhir; tab lain masih DEMO. Sekarang tulis awal sepuluh tab EPISODE/SCENARIO/CAST_MASTER/SET_LAYOUT/OBJECT_REGISTRY/AUDIO_CUES/VOICE_MASTER dan tiga operasional; data ekspektasi bukan persetujuan QC. Pembaruan progres menulis tiga tab operasional. Nilai owner PENDING tetap, kebijakan otomatis tercantum EPISODE. NA ditampilkan PENDING dengan catatan NA karena dropdown template tidak mendukung NA; gate repo tetap memakai nilai asli. Render job/status dilaporkan di RUNNER_MANIFEST. Belum ada bukti video progresif nyata pada saat commit ini.

TESTED lokal: node apps/videoexpress-runner/test.mjs; test-progressive-qc memeriksa satu shot PASS bebas dari shot lain PENDING, FAIL/PENDING/stale image/stale prompt/calibration gagal/stop memblokir, LAST_FRAME ditahan, owner tidak dipalsukan. actionlint workflow gambar PASS. Catatan lama: retake run42682376961 benar menulis4baris Sheet terpisah, bukan episode lengkap.

## Verifikasi sesi 2026-11-09

Commit implementasi bbf54ed, workflow d32e4eb, aktivasi episode 5ea332b. Model faceless kini dipanggil per shot sebelum QC lengkap shot itu, bukan menunggu seluruh batch faceless selesai; kalibrasi anatomy tetap sekali per batch. Regression scoped screening mempertahankan REVIEW shot lain dan hanya memeriksa ID yang diminta. node test.mjs + actionlint PASS.

Super Storyboard episode lama yang dihubungkan kembali: 15yPKAVRDvEmQgD7nv_ykE5lvvsnaJUqwKYS3aZ2b2jc. Sepuluh tab diisi melalui connector dan dibaca kembali: EPISODE menunjuk revisi3/60detik/progressiveYES; STORYBOARD10shot; IMAGE_QC10aset campuran asli/retake; SCENARIO10; AUDIO_CUES13; dua tokohUMAIR/ABA. PENDING/QC_BLOCKED tetap tampil tanpa klaim PASS. Header, freeze, formatwrap dan dropdown dipertahankan; pemeriksaan visual melalui metadata API saja, bukan screenshot Google-rendered. Sheet diperbarui langsung untuk owner; workflow menangani pembaruan berikutnya.

Perintah lanjutan ketukr3-20261109-progressive-02 slot2. Run42715680638 masih mengerjakan kode checkout lama saat patch ditulis. Jangan klaim render baru sudah terjadi sebelum SUBMITTED/job_id aktual dan klip ditemukan. Sinkron Sheet baru sudah dibuktikan lewat readback, submit video progresif belum.
