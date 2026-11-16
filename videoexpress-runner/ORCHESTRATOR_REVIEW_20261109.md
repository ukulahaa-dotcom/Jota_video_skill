# Orkestrator dan QC maksimal tiga percobaan

Keputusan owner 2026-11-09: lanjut otomatis dari naskah sampai MP4 di Drive, maksimal3QC, kemudian video review jika belum lolos; posting baru setelah owner memeriksa. Ini mengganti kebijakan sebelumnya yang memblokir semua render sesudah QC gagal. Jalur normal PASS tetap progresif; jalur exhausted terpisah REVIEW, bukan menghapus FAIL atau memalsukan approval.

## Worker dan dependensi

Penyusun naskah CPU Telegram sudah ada (maks3revisi validator). Sheet diisi pada awal dan checkpoint. progressive-image-qc mencatat reservasi attempt sebelum inference dan checkpoint hasil; maksimal3 per shot/image signature, hasil FAIL tetap tercatat. Setelah selesai, coordinator mengantre render normal atau produksi-review. create-review-project membangun folder REVIEW baru, memakai bukti saved/library/hash dan menjaga source. Label/job_id klip yang sudah terkirim dipertahankan; kiriman ambigu memerlukan rekonsiliasi agar tidak diduplikasi. Source LAST_FRAME yang belum punya bukti tidak disulap menjadi valid. VideoExpress merender klip; ffmpeg merakit klip aslinya. ElevenLabs mengisi audio sesuai alur yang sudah ada.

jota-review menunggu seluruh klip, merakit, memvalidasi stream/durasi, mengirim DRAFT-UNVERIFIED.mp4 + REVIEW-REPORT.json ke Drive 3.UjiJOTA. Receipt merekam server ID/URL/hash/bytes dari data yang benar-benar dikirim, termasuk versi terkompres. Upload dicoba maksimal3; folder kosong/HTTP gagal tidak dilaporkan berhasil. Status UPLOADED_SERVER_ACK bukan verifikasi readback. Progres source storyboard diperbarui dari review-progress.json. Arsip privat memakai byte yang sama dengan MP4 Drive agar approval owner mengikat video yang akan diposting.

## Orkestrator

Watchdog v3 mengecek dispatcher tiap3menit walau antrean kosong. Dispatcher membaca latest main, menyegarkan run aktif yang tidak ada lagi dalam100run terbaru, lalu pipeline-orchestrator menilai files/QC/delivery dan mengantre tahap yang siap. Pekerjaan queued/active tidak digandakan; worker teknis retry maksimal3. Kegagalan teknis setelah batas tetap dilaporkan, bukan dibuatkan file/delivery palsu. Worker yang belum punya dependensi siap menunggu; tidak membakar inferensi supaya tampak sibuk. ChatGPT/Claude sesi chat bukan proses background yang dibangunkan oleh Actions.

## Owner check dan posting

Bot private sudah memfilter pemilik. Setelah memeriksa MP4, owner mengirim `/setuju-posting JOTA-M1-... yt,ig,fb` (boleh hanya yt). Handler mencatat updateID, hash MP4 dan platform; tidak pernah menyetel approval dari hasil QC atau batas percobaan. Orkestrator baru mengantre posting-approved sesudah bukti itu ada. POS8 memeriksa persetujuan sebelum download dan hash file arsip sebelum upload. Arsip berubah atau platform belum diizinkan => stop. Posting parsial/gagal tidak otomatis mengulang semua platform. Belum ada publikasi pada pengujian ini.

## Bukti dan batas

TESTED lokal node apps/videoexpress-runner/test.mjs (termasuk test-review-orchestrator.mjs dan test-drive-receipt.mjs); actionlint tujuh workflow PASS dengan pengecualian lama if:false YouTube di produksi. Fixtures menguji batas3, stale image/prompt, source FAIL tidak ditimpa, idempotent queue/retry, mock Drive success/HTTP failure/empty upload, owner approval/hash/platform dan tidak posting sebelum owner. Fixture bukan model inference atau unggah MP4 nyata. Run lama42715680638 masih QC dan42718666193 pending saat implementasi; status akhir harus dicek lagi. Tidak ada klaim video baru selesai atau PRODUCТION_READY.

## Bukti pengaktifan nyata

Kode f6bf5e4, workflow1b8079a, aktivasi3731587. Watchdogv3 run42722046439 IN_PROGRESS dan dispatcher42722105999 SUCCESS; gpt/orchestrator-state.json berhasil tersimpan pada23:38UTC dengan sumber KETUKAN dan posting locked. Status worker diperjelas pada dd87293: QC aktif tidak boleh disamakan dengan video aktif; hitung klip berdasarkan status/URL aktual. Dispatcher857a46a mencegah dispatch ganda jika run sudah ada tetapi status sebelumnya belum tersimpan. Ini bukti kontrol/kelanjutan, bukan bukti render atau delivery video.

Budget juga mengadopsi tepat satu QC model lama bila image SHA dan prompt SHA cocok serta ada observation/anatomy aktual; bukti lama tidak dihitung berulang atau direset menjadi tiga percobaan tambahan. Shot lama yang memang sudah lolos gate langsung dikirim lewat submit progresif; tidak menunggu QC ulang shot lain. Kiriman ambigu memblokir retry worker berbeda; lease progresif sendiri hanya berlaku di run GitHub yang sama. Node test.mjs PASS lokal termasuk import-prior/dedup/stale SHA/owner-platform gate. Tidak ada publikasi atau approval owner dibuat dalam pengujian.
