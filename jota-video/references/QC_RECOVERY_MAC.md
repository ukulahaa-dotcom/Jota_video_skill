# Pemulihan QC Mac oleh tim agent

Owner 2026-11-11: tidak bergantung pada Codex untuk tiap revisi. Supervisor Hermes menugaskan penulis OpenRouter GPT-4.1 mini yang memakai policy skill terikat SHA. Output model hanya JSON deklaratif: shot, alasan, mode video/image, pose awal, aksi, akhir, kamera, dan beat per detik. Model tidak memberi kode, approval, token, path atau perintah shell.

Alur: bukti QC gagal → diagnosis tersimpan → rencana/koreksi tervalidasi → child revision immutable → antrean repair → generate gambar ulang bila perlu → QC gambar dan library → generate klip terdampak → QC klip → audio/teks/assembly → decoder/durasi/hash → salinan Drive → laporan final. Pembacaan server Drive masih dilaporkan pending sampai terbukti; file lokal bukan bukti upload server. Posting tidak dijalankan.

Bukti sumber dan proyek gagal dipertahankan. Ref diimpor hanya dari project induk/preset sama dan proof karakter asli terverifikasi. Desain/cast/palet/pakaian/lokasi/durasi/narasi tidak diubah model. Redesign dibatasi pose/komposisi/aksi shot; perubahan desain karakter penuh perlu operator. Image dan clip QC baru wajib jika prompt/aset berubah; klip tak berubah dipertahankan dengan jejak job/prompt/hash/frame. LAST_FRAME descendants perlu dibuat ulang, final state source wajib mempertahankan kontrak kontinuitas. Brief legacy tanpa pemetaan klip 1:1 tidak direvisi otomatis secara spekulatif.

Batas: max3 percobaan render/QC per shot lintas lineage, tidak reset ke1 karena folder baru. Planning max3 validasi; semua memakai budget API existing USD0.10/hari, tanpa model fallback. Error API/budget/validator/kalibrasi/decoder atau jurnal submit/save ambigu dilaporkan spesifik dan tidak mengirim ulang job. Max retry memicu REVIEW existing bila bukti/aset teknis mendukung; review tidak mendapat PASS/publishing approval.

Status agent: QC mengirim alasan dan bukti; writer mengirim revisi tervalidasi; production mengantre dan memakai worker/sesi tunggal; QC mengirim PASS sampel shot/job aktual; assembly melaporkan mulai; produksi melaporkan MP4 dan status Drive. Reports dedupe berdasarkan run/shot, bukan klaim hasil berdasarkan niat model. Tidak setiap frame diperiksa; naturalitas gerak/warna antarshot belum disahkan otomatis.

IMPLEMENTED + TESTED mekanisme lokal. Test recovery memakai observer/plan fixture, actual generator/gates dan source aset nyata tanpa render uji; ini bukan bukti akurasi model atau pilot selesai. Bukti live ditulis di task local-state/hermes/recovery dan run local-state/runs, receipt delivery proyek revisi. Hanya proyek yang benar-benar mencapai MP4/readback disebut teruji produksi.

## Bukti live awal

Policy1 menghasilkan tiga rencana yang ditolak sebelum dispatch (slow camera/beat count). Schema policy2 diperketat: jumlah beat persis durasi, kamera enum, bukti lama dipertahankan. Supervisor task82f47c6bd27d1ff0c4e0 membuat RCDF3D6CAA dan worker resmi mengirim hanya SHOT05 attempt2 job7accaa8b-18bc-49ad-987d-7b8291d59b1a; sembilan klip lama dilewati. Ini bukti autonomous planning/dispatch/submission, belum bukti MP4. Tidak ada model menulis code/approval.

Update bukti: SHOT05 job7accaa8b-18bc-49ad-987d-7b8291d59b1a PASS pada tiga sampel0/3/5.88detik, notice QC SENT39. QC berikutnya menolak SHOT06 dan supervisor menugaskan rencana/revisi/antrean kedua secara otomatis (task2ee111bd076c1b515cc2, childRCACB2C77D), tanpa Codex menulis prompt produksinya. MP4 penuh masih pending; ini bukti pemulihan per-shot dan kelanjutan otonom, bukan klaim final video selesai.
