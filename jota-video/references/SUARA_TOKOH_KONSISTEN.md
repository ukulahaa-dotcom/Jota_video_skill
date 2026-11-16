# Suara tokoh konsisten (rencana, belum dibangun)

Masalah (owner 2026-11-04): ucapan native VideoExpress berubah suara di setiap klip.

## Cara owner
1. Pilih suara terbaik tiap tokoh dari satu klip, simpan sesuai nama tokoh (misalnya `UWAIS`, `UMAIR`). Sampel boleh juga dari ElevenLabs.
2. Di klip berikutnya, suara tiap tokoh diganti dengan suara tersimpan itu.
3. Kalau dua tokoh bicara di satu klip, ucapannya dipilah per tokoh di timeline dulu, baru diganti.

## Fakta yang sudah dicek
- Voice Changer VideoExpress (menu klik kanan klip di Media Library) bekerja setelah klip jadi, pada seluruh audio klip: "Choose Sample Audio" sebagai suara tujuan, lalu Apply. Satu klip menjadi satu suara. Dibuka 2026-11-04 tanpa Apply.
- ElevenLabs punya Voice Changer (speech to speech, model multibahasa mendukung `id`, opsi buang suara latar) dan Speech to Text Scribe (waktu per kata, pembeda penutur). Kunci API ElevenLabs sudah ada di secret GitHub.

## Rencana runner
1. Audio klip diambil, Scribe mencari waktu tiap kalimat, dicocokkan dengan urutan ucapan di brief.
2. Setiap potongan diganti ke suara tetap tokohnya lewat Voice Changer, lalu dipasang di waktu yang sama.
3. Kalimat tidak ketemu atau urutan kacau: klip ditandai untuk dicek manual, tidak dipasang asal.

## Batas
- Ucapan berurutan dengan jeda: aman dipilah.
- Ucapan bertumpuk (dua tokoh bicara bersamaan): tidak bisa diganti per tokoh setelah klip jadi, karena dua suara sudah tercampur di satu jalur audio. Aman hanya kalau VideoExpress bisa menetapkan suara per tokoh saat klip dibuat; belum ditemukan pengaturan seperti itu.

## Menunggu keputusan owner
- Sumber suara tetap: clone dari klip VideoExpress terbaik atau suara ElevenLabs yang sudah ada (nama voice).
- Izin memakai kuota ElevenLabs untuk uji 1 klip dua tokoh.
