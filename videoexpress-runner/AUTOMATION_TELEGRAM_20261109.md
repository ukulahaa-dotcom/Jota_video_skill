# Delegasi QC, kelanjutan video dan Telegram

Keputusan owner 2026-11-09: tidak perlu approve manual setelah QC lengkap lolos, video boleh lanjut otomatis, semua pos/progres dilaporkan Telegram, instruksi episode baru boleh dari Telegram. Publikasi tetap terpisah.

Status: TESTED untuk logika gate/delegasi, runtime naskah CPU, pengiriman Telegram, poller/penjaga aktif dan kalibrasi anatomi tiga gambar. Episode belum lolos seluruh QC; bukan klaim video selesai atau model akurat 100%.

## Gate dan kelanjutan

`qc_policy.approval: automatic_after_all_checks` meniadakan syarat owner.status APPROVED. Field owner tetap PENDING; jangan mengarang persetujuan. Semua sembilan kriteria, identitas gambar/hash, Save/reload/Choose library tetap wajib. Kebijakan manual tetap didukung untuk file lama atau permintaan eksplisit.

`automation.video_after_qc:true` adalah izin video, bukan publish. `after-image-qc.mjs` menahan semua FAIL/REVIEW/PENDING; setelah seluruh bukti lolos, memasang PAKAI_ULANG, mengubah auto:false menjadi true, dan menambahkan satu perintah produksi berdasarkan hash bukti QC. Transisi dan alasannya tersimpan di awal/qc-transition.json. Produksi memeriksa auto:true sebelum browser dan memeriksa stop selama run. Antrean.txt lama tidak otomatis dikonsumsi tanpa lanjut_antrean eksplisit.

Model faceless saja tidak cukup. Model Qwen3-VL 4B sebelumnya salah meloloskan SHOT04/10; kata blurred/tidak jelas sekarang REVIEW dan PASS lama dengan alasan ambigu diblokir gate. FAIL audit dipertahankan. Pemeriksa visual lengkap lokal membandingkan storyboard/pakaian/ruang/pose/properti/jumlah tokoh/gaya; dua gambar negatif nyata wajib ditolak/ditahan saat kalibrasi sebelum penilaian model boleh meluluskan otomatis. Kalibrasi terbatas, bukan jaminan seluruh gambar. Model gagal kalibrasi berarti video tetap tertahan. Agen multimodal tetap boleh memeriksa seluruh kriteria secara nyata tanpa menunggu owner klik approve.

Exit 2 dari screen faceless adalah QC_HELD, bukan crash. Laporan tetap disimpan; workflow success setelah penanganan ini tidak berarti gambar PASS. Kesalahan runtime selain hasil QC tetap failure.

KETUK1 saat patch: 10 kandidat sudah mempunyai bukti library, tetapi SHOT04/10 FAIL wajah dan SHOT07 FAIL storyboard, SHOT02 REVIEW serta kriteria lain belum lengkap. Izin video diperbarui sesuai owner; auto tetap false. Tidak ada video yang boleh dikirim dari snapshot ini.

## Telegram

Bot yang sama: @jota_runner_ohan_bot. Satu poller menangani foto dan instruksi; tidak ada dua konsumen getUpdates. Hanya TELEGRAM_CHAT_ID dan pengirim owner. Untuk grup, TELEGRAM_USER_ID wajib; anggota lain tidak dapat mengirim perintah. Offset, ID update dan outbox mencegah duplikasi; balasan diterima dikirim sesudah commit antrean berhasil.

- `/buat <ide cerita, durasi, tokoh>`: simpan permintaan, model CPU lokal menyusun naskah, validator memeriksa, lalu antre gambar. Bukan percakapan dengan aplikasi ChatGPT/Claude dan tidak memakai API model berbayar. Jika naskah ditolak, status NEEDS_REVISION dan alasan dilaporkan; tidak mengulang prompt salah tanpa batas.
- `/status` atau `/status JOTA-M1-...`: status nyata, kandidat/QC/klip terkonfirmasi.
- `/gambar JOTA-M1-...`: antre gambar dari shots yang tersedia dengan hash draft.
- `/lanjut JOTA-M1-...`: minta kelanjutan video; seluruh QC tetap diperiksa, bukan bypass.
- `/stop JOTA-M1-...`: auto:false dan izin kelanjutan dimatikan. Tidak membatalkan klip yang sudah terlanjur disubmit; berhenti pada batas langkah berikutnya.
- `/bantuan`: panduan. Foto+caption tetap disimpan ke Drive referensi. Tidak ada perintah publikasi.

Workflow Telegram sekitar 5 menit dan dipicu manual bila perlu; GitHub schedule dapat terlambat. Workflow_run melaporkan antre/berjalan/selesai/gagal pada semua pos utama, tanpa rekursi reporter. Pesan per gambar hanya sesudah Save+readback terkonfirmasi; pesan per klip membedakan submitted dari selesai. Monitor dinamis seluruh proyek, tanpa konstanta Amplop/18 klip. Secrets Telegram harus ada di Jota_runner; nilai tidak ditulis ke repo/log.

## Uji

Regression: owner PENDING tidak memblokir QC lengkap terdelegasi; FAIL/REVIEW/pakaian PENDING, model tanpa kalibrasi, library/hash usang tetap memblokir; hanya satu antrean video; audit FAIL tidak ditimpa; alasan SHOT10 ambigu REVIEW; Telegram pemilik/grup/ID/path tidak sah, duplikasi update, larangan publish, builder naskah dan status run.

Uji live dibedakan: koneksi bot+sendMessage dengan receipt, penerima perintah sintetis, polling nyata, draft model CPU dan benchmark visual. Jangan mengklaim round-trip instruksi masuk owner sebelum benar-benar ada pesan owner yang diproses. Mode uji QC tidak menghasilkan gambar/render/publish atau menulis hasil ke main.

## Bukti pemasangan dan pengujian awal

- Content Factory PR #24 merged 49197f2, Runner PR #4 merged ffa7211. Regression Actions 42678679294 SUCCESS pada kode 57d44a9.
- Telegram laporan semula disabled_manually; diaktifkan kembali atas instruksi owner. Run 42680480751 SUCCESS: getMe/getWebhookInfo benar, @jota_runner_ohan_bot, polling_available:true, sendMessage receipt 166; laporan status juga dikirim. Poller nyata run 42680580491 SUCCESS. Instruksi masuk owner belum diklaim diuji bila belum ada pesan baru.
- Uji CPU 42680445187 gagal di draft JSON sebelum penilaian gambar. Runtime teks diperbaiki menjadi llama-completion mode single-turn, dengan checksum binary pada manifest; bukan melonggarkan validator atau mengabaikan error. Perlu uji ulang.

## Hasil akhir pengujian dan aktivasi

- Kode utama Content Factory PR #24 merge 49197f2; runtime/revisi PR #25 merge 9fae10e; anatomi/fail-fast PR #26 merge 9c7e8bf. Runner PR #4 merge ffa7211, scope diagnostik PR #5 merge febeff2, kalibrasi PR #6 merge 1a0e8d9. Perbaikan dependensi crop 0da1ea4, penjaga Telegram e24553b/cd734fc, prompt anatomi terakhir 7e1b898.
- Naskah CPU **42684248685 SUCCESS**, source 154106b: dua klip fiksi, satu percobaan, api_calls=0, auto:false, gate:gambar dan PREPARED_IMAGE_QC_PENDING. Tidak mengantre proyek nyata dari probe. Logika revisi maksimal tiga diuji regression dengan penolakan WAJAH lalu perbaikan; tiga penolakan tetap berhenti.
- Telegram **42680480751 SUCCESS**: @jota_runner_ohan_bot, polling tersedia, receipt sendMessage **166**; laporan proyek juga terkirim. Reporter pos 42680600612 mengirim receipt **169**. Monitor **42681182150** berjalan setiap sekitar 300 detik.
- Poller nyata **42680580491 SUCCESS**. Penjaga **42709704294** aktif, membangunkan poller tanpa menunggu cron; poller otomatis **42710213095** dan **42710694753** SUCCESS. Polling satu penerima/concurrency, tidak membalas polling kosong. Saat pemeriksaan belum ada pesan owner baru: outbox 0; pengiriman perintah owner end-to-end belum diklaim TESTED. Parser/auth/dedup serta builder/queue diuji regression.
- Kalibrasi final **42710721872 SUCCESS**, source **7e1b898b2f0f16b4fff267d6c787bd9a1cc8a23f**, api_calls=0: SHOT04 REJECT, SHOT10 REJECT, kontrol polos PASS; masing-masing dua manusia sesuai jumlah yang diketahui. Pemeriksaan memakai crop analitis; gambar asli tidak diubah. Bukti ini terbatas pada tiga fixture, bukan jaminan semua gaya/gambar. Deskripsi fitur per model dapat berlebihan; keputusan penolakan kedua fixture cocok audit.
- Uji sebelumnya dicatat sebagai gagal, tidak dihapus: 42680445187 runtime JSON, 42681179198 isi draft, 42682465394 larangan fitur negatif/aksi terlalu panjang, 42684254965 kalibrasi JSON terpotong, 42708315312 ffmpeg tidak tersedia, 42709299754 ketidakpastian kontrol polos. Runtime teks, feedback validator, schema satu kalimat, Pillow 12.0.0 pada cache per versi Python, prompt anatomi dan fail-fast memperbaiki penyebab tersebut. Kalibrasi gagal berhenti sebelum batch, bukan memaksa lulus.
- Seluruh regression Node dan lint workflow terkait lulus. Kondisi false historis upload YouTube tetap dinonaktifkan. Tidak ada publikasi yang diotorisasi oleh fitur ini.

**Batas yang masih berlaku:** kalibrasi lulus bukan QC lengkap episode. Snapshot asli KETUK1 masih SHOT02 REVIEW, SHOT04/10 FAIL wajah, SHOT07 FAIL pose/storyboard; kriteria lain belum lengkap. Owner tidak perlu approve, tetapi video tetap ditahan oleh mutu gambar. Uji kalibrasi tidak mengisi PASS sembilan kriteria, tidak membuat persetujuan dan tidak mengirim video. QC klip/video final bukan fitur yang dibuktikan oleh pengujian gambar ini.

## Pemeriksaan filter pengirim terakhir

Poller run 42710694753, attempt terakhir/job129485698296 SUCCESS: chat_type=private dan owner filter enabled. Tidak ada pesan owner baru (0 diproses, 0 acknowledgement); tidak mengklaim tes pesan masuk end-to-end. Pemeriksaan jenis chat ditambahkan untuk menghindari grup tanpa TELEGRAM_USER_ID gagal diam-diam. Satu percobaan sebelumnya menangkap salah pemisah baris sebelum getUpdates; diperbaiki di f680b586, node --check lulus, kemudian poller nyata berhasil. Tidak ada pesan yang terlewat atau owner approval yang dibuat.
