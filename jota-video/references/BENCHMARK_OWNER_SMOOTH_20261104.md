# Benchmark video smooth owner (2026-11-04)

Sumber: video uji owner `Uji_Final_Video.mp4` (46,7 detik, 9:16, 25 fps, ada suara) dan data prompt 19 klip owner di My AI Videos (12:08 sampai 15:21 UTC), dibaca lewat Details di Media Library (tanpa Redesign, tidak ada yang dibuat ulang).

## Setting yang terbaca dari data klip

| Setting | Nilai di 19 klip |
|---|---|
| Generator | Create Video From Prompt (17), First Frame Last Frame (2) |
| Model | `vev3_image2video`, smoothness medium |
| Enhance video prompt | **ON di semua klip** |
| Narration Video | OFF, ucapan native di dalam prompt |
| Video Only | OFF |
| Durasi | 4 sampai 10 detik, kebanyakan 5 sampai 7 |
| Image Type gambar awal | `human` |
| Gambar awal | Kebanyakan frame terakhir klip sebelumnya (Save Last Frame). Sudut baru: Consistent Character dengan Reference Photo 1 = foto tokoh, Reference Photo 2 = frame ruangan yang sudah ada (untuk menjaga lokasi) |

## Pola Video Prompt owner

- Bahasa Indonesia sehari-hari, 1 sampai 3 kalimat, tanpa blok berlabel, tanpa timestamp.
- Urutan: posisi dan gerak kamera, lalu aksi tokoh berurutan, ucapan dalam tanda kutip di tengah aksi.
- Faceless cukup satu kalimat: "pertahankan wajah tetap faceless di seluruh video" atau "muka tetap faceless seperti referensi image". Tidak menyebut mata, hidung, atau mulut.
- Contoh: "Uwais mencari cari ummi, kamera mengikuti di depan Uwais, ketika Uwais maju kamera ikut mundur, pertahankan wajah tetap faceless di seluruh video, Uwais mencari ke halaman belakang, berputar ke kiri dan ke kanan" lalu ucapan.
- Enhance menulis ulang menjadi paragraf bahasa Inggris gaya sutradara, misalnya "A medium shot follows the young boy, Uwais, from a front-facing perspective as the camera moves backward ... keeps his face completely faceless throughout the entire video."

## Pola Image Prompt owner (sudut baru)

- "Portrait of the same faceless boy facing the camera in the room. The boy's face is completely smooth with no eyes, no nose, and no mouth." lalu baju, tas, dan "Preserve the same room setting, lighting, and character identity."
- Image Prompt menyebut fitur wajah secara eksplisit; Video Prompt tidak.

## Hasil frame per frame

Lolos:
- Faceless bertahan di tampak belakang, belakang serong (pipi dan telinga terlihat, detik 18 sampai 22), dan tampak depan berjalan ke kamera (detik 38 sampai 41).
- Kamera mengikuti dari belakang dan dari depan (mundur) dengan halus, kecepatan jalan normal, tanpa lompatan.
- Tas ransel ada di semua frame.

Belum lolos:
- Celana berubah dari navy menjadi jeans biru muda (detik 30 sampai 35), lalu kembali navy.
- Baju berubah dari kaos merah lengan pendek menjadi koko merah lengan panjang (tampak depan, detik 38 sampai 41).
- Mengetuk pintu dengan telapak terbuka (detik 7 sampai 11), bukan kepalan.
- Tokoh di uji ini anak berbaju merah, bukan Uwais versi bible (overshirt hijau zaitun).

## Keputusan untuk skill (v3.90)

- Kartu klip memakai format Video Prompt "natural" (satu paragraf pendek) sebagai default. Format blok lama tersedia dengan `"gaya_prompt": "lengkap"`.
- Ucapan tokoh di format natural adalah suara native di dalam prompt; tidak ada TTS ElevenLabs tambahan untuk klip itu.
- Prompt natural menambah satu kalimat kunci baju, tas, dan rambut sama dengan gambar awal, karena baju dan celana berubah di video owner.
- Enhance: owner memutuskan ON untuk video dan image (v3.92).
