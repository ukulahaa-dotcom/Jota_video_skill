# Audit kualitas Saheela, 2026-11-11

## Bukti dan status

Owner menyerahkan tiga screenshot hasil render: fitur mata/hidung/mulut terlihat. MP4 asli tetap disimpan untuk audit. Hash/decoder dan server Drive telah terverifikasi secara teknis, tetapi itu tidak membuktikan aturan faceless. delivery.content_qc=FAIL dan status VISUAL_QC_FAILED; tidak ada approval/publikasi baru.

## Root cause

1. runner.mjs hanya memanggil stickman-clip-qc sebelum assembly. Cabang faceless tidak menjalankan inspeksi klip, sehingga wajah yang muncul setelah gambar awal tidak tertangkap.
2. Penulis API menggunakan instruksi statis; belum ada kontrak kebijakan yang dibaca dan dilacak terhadap skill terbaru.
3. dari-brief.mjs memilih masterV4; METODE_PROMPT 2026-11-05 masih mengklaim berlaku tunggal dan berisi dialog native. Dokumen itu sekarang ditandai historis. Metadata generator legacy juga tertinggal dari versi skill; trace penulis baru mencatat versi/hash aktual.
4. Timeline default6detik hanya mengambil fase awal/aksi/continue, tanpa fase akhir. Brief Saheela menulis gerakan kecil lalu stop dan kamera statis berulang. Ucapan “continue exact motion” setelah “stop” bertentangan.
5. QC gambar tidak membuktikan QC video. Full grader juga belum terbukti andal untuk warna pakaian/jumlah hewan; beberapa alasan PASS hanya mengulang deskripsi yang diharapkan. infer menerima satu kandidat dan teks prompt, bukan foto acuan atau shot tetangga; tidak ada bukti komparasi visual referensi di folder proyek.

## Perbaikan

- Gate video faceless untuk pekerjaan Mac baru:1FPS + frame akhir, kalibrasi kontrol cocok, job/prompt/URL/hash binding, cached frame hashes, maksimal3attempt, FAIL/REVIEW menghentikan assembly. Sumber LAST_FRAME juga diperiksa sebelum diwariskan.
- Legacy generator byte-identik bila field baru tidak dipakai; adapter Mac baru memaksa gate video.
- Runtime menolak proyek lama tanpa video policy daripada memberi label aman diam-diam.
- Machine authoring policy1.0.0, SHA dokumen terikat, trace di writer/brief/shots; dokumen berubah tanpa policy refresh menyebabkan penolakan sebelum panggilan API.
- Profil gerak baru wajib beat setiap detik dan tempo normal. Metadata lengkap bukan jaminan visual; perlu klip pilot nyata.
- Receipt teknis dipisahkan dari konten. Status gagal konten mengalahkan status delivered di manager, supervisor dan pengawas.

## Pengujian dan batas

Test decoder/sampling/cache/stale job memakai observer injected untuk mekanisme, bukan bukti akurasi model. Uji native pada potongan bus dari MP4 asli ditolak, tetapi alasan/count observer masih punya kontradiksi; jangan mengklaim akurasi sempurna. Naturalitas temporal, detail pakaian dan semua frame belum otomatis diverifikasi. Tidak melakukan render ulang episode ini dalam audit.
