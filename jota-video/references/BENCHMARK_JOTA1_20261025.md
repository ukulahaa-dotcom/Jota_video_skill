# Benchmark JOTA 1 faceless, 2026-10-25

Uji langsung oleh Claude di akun VideoExpress owner, proyek `JOTA-M1-BENCHMARK-SAHEELA-20261025`, memakai storyboard owner "Saheela Membantu Ummi di Dapur" (SC01 Pagi di Rumah, SC02 Daftar Belanja, SC03 Pergi ke Pasar). Tujuan: menemukan resep JOTA 1 yang paling andal untuk cerita Islami anak di YouTube.

Batas uji: jumlah sampel kecil (1 sampai 5 per uji), satu sesi, satu akun. Suara dan lip-sync tidak bisa dinilai Claude; owner perlu menonton klip V1 sampai V4. Penilaian wajah memakai kriteria `SYARIAT_GAMBAR.md` v3.10: manusia tanpa mata, hidung, mulut; hewan tanpa mata, moncong atau paruh tertutup boleh.

## Hasil gambar

| Uji | Cara | Hasil |
|---|---|---|
| I1 | VideoExpress `Create Image`, 2D, Creative mode ON, deskripsi tokoh biasa + kalimat larangan "no eyes, no nose, no mouth" | GAGAL: kedua tokoh berwajah lengkap |
| I2 | VideoExpress, 2D, Creative mode OFF, Enhance image OFF, prompt **dibuka kalimat positif** `Faceless Islamic children's cartoon illustration. Every character has a plain blank face: a smooth empty skin-colored oval with nothing drawn on it, like an unpainted doll face.` | LOLOS: K1 dan K2, semua manusia polos (4 dari 4 tokoh) |
| I3 | Artistly Fast Image Designer (Create From Prompt), prompt sama dengan I2 | GAGAL: berwajah lengkap (1 sampel) |
| I4 | Resep I2 + entok dan kucing | Manusia lolos; entok bermata titik, kucing bermata dan bermulut: GAGAL |
| I5 | Hewan ditulis `drawn like a soft plush toy with a smooth blank head and no eyes at all` | Kucing lolos; entok masih bermata titik |
| I6 | VideoExpress `Smart Edit` dengan instruksi biasa "hapus mata entok" | Entok lolos, tapi **anak perempuan jadi berwajah**: GAGAL. Smart Edit menggambar ulang seluruh gambar |
| I7 | Smart Edit yang dibuka kalimat genre faceless dan menegaskan semua tokoh tetap polos | LOLOS 2 dari 2: manusia, kucing, entok tanpa mata |
| I8 | `Use Consistent Character` dengan Reference Photo = keyframe K1, resep I2, lokasi baru (supermarket SC03) | LOLOS 2 dari 2, pakaian dan proporsi tokoh konsisten |

## Hasil video (dicek 4 sampai 5 frame per klip, kepala diperbesar)

| Uji | Cara | Hasil |
|---|---|---|
| V1 | Create Video From Prompt dari K1, 10 detik, Enhance video OFF | LOLOS semua frame; gerak cukup kalem |
| V2 | Sama, Enhance video ON | LOLOS semua frame; gerak lebih hidup (melompat kecil) |
| V3 | First Frame, Last Frame: K1 ke K2, 16:9 | LOLOS wajah; klip berakhir tepat di K2. Durasi sekitar 7 detik. Di tengah klip ada lompatan sudut kamera karena tata letak K1 dan K2 berbeda (jendela pindah sisi) |
| V4 | Dari gambar hasil I7 (hewan), `Narration Video` bahasa Indonesia suara Gadis | Manusia dan entok LOLOS. Kucing saat bergerak memunculkan hidung, garis mulut, kumis, tanpa mata: LOLOS menurut aturan hewan v3.10 |

Waktu render teramati 6 sampai 8 menit per klip (lebih cepat dari 12 menit di uji sebelumnya).

## Temuan teknis

- Kalimat larangan saja tidak bekerja. Yang bekerja adalah **menyebut genre faceless sebagai kalimat pertama** dan menggambarkan wajah secara positif ("plain blank face, smooth empty oval, like an unpainted doll face").
- Untuk gaya kartun ini, generator VideoExpress patuh, Artistly Fast tidak.
- Hewan paling sulit, terutama burung. Urutan perbaikan: frasa "plush toy smooth blank head", lalu Smart Edit yang menegaskan ulang semua tokoh tetap polos.
- `Narration Video` membuka dialog TTS: bahasa `id-ID` tersedia dengan suara Ardi, Arif, Eduardo, Fadhlan, Gadis, Indah, Irene, Mertie, Osbaldo, Samantha. Batas teks **120 karakter per klip**. Ada juga tab CloneVoice.ai, rekam suara, dan impor audio.
- First Frame, Last Frame cocok hanya kalau dua keyframe berurutan punya tata letak dan sudut kamera yang sama.
- Operasional browser: referensi elemen dari pencarian bisa basi setelah dialog dirender ulang (satu klik mengenai `Lipsync HD`, bukan Enhance). Selalu cek centang dengan memperbesar layar sebelum Create.

## Kesimpulan: resep JOTA 1 yang direkomendasikan

1. Gaya **S28 Kartun Islami wajah polos** (style tag di `STYLE_CATALOG.md`), mirip storyboard owner.
2. Generator **G1 VideoExpress**, Image Type 2D, Creative mode OFF, Enhance image OFF.
3. Setiap Image Prompt dibuka kalimat genre faceless yang persis (lihat `FACELESS_CHARACTER.md` metode B).
4. Keyframe tiap scene dibuat dengan `Use Consistent Character` dari keyframe pertama yang sudah lolos.
5. Hewan: frasa plush toy; kalau mata masih muncul, Smart Edit dengan penegasan ulang semua tokoh polos.
6. Video: Create Video From Prompt 10 detik; Enhance video OFF sejak v3.26 (saat benchmark ini ON). First Frame, Last Frame hanya untuk keyframe bertata letak sama.
7. Narator: `Narration Video` id-ID, maksimal 120 karakter per klip.
8. Agen tetap mengecek kepala di setiap keyframe sebelum dipakai (aturan v3.10).

Aset uji (ID job video): V1 `0bbec2a3-8f79-47d7-a41f-43a934d27379`, V2 `c486cc9a-e3b1-4e78-ad92-b8350823217e`, V3 dan V4 tercatat di My AI Videos proyek benchmark.

## Ronde 2: dialog antar tokoh (2026-10-25 siang)

Gambar awal K2 (lolos), dialog 3 kalimat Saheela dan Ummi, prompt dengan BLOK KUNCI faceless ditambah `even while speaking... voices are heard without any lip movement`.

| Uji | Cara | Hasil |
|---|---|---|
| D1 | Dialog native, two-shot samping | GAGAL: Saheela memunculkan mulut terbuka saat bicara |
| D2 | Dialog native, over-the-shoulder dari belakang Saheela | GAGAL: model tetap memutar ke two-shot; Saheela dan Ummi bergantian memunculkan mulut |
| D3 | Dialog native, "voice-only, body language only, never with a mouth" | GAGAL: mulut muncul pada pembicara |
| D4 | `Narration Video` dengan TTS satu kalimat Saheela | GAGAL: model menganggap suara milik Saheela dan menggambar mulut; kamera juga zoom ke close-up |

Pola: begitu ada suara ucapan yang bisa dikaitkan ke tokoh di layar, model VideoExpress menambah mulut untuk lip-sync, apa pun isi prompt-nya. Wajah kembali polos di frame tanpa ucapan. Klip tanpa ucapan (V1, V2) dan narator yang bukan tokoh di layar (V4, Saheela tidak bicara) tetap lolos.

Kesimpulan: dialog native atau TTS lewat Narration Video tidak bisa dipakai untuk JOTA 1 di VideoExpress saat ini. Satu-satunya jalan yang tersisa: video dibuat tanpa ucapan, lalu suara dialog ditambahkan sebagai audio terpisah di timeline (Text to Speech editor atau rekaman). Ini bertentangan dengan aturan inti 4 (karakter bicara satu job native), jadi butuh keputusan owner sebelum masuk skill.

ID job: D1 `fc5f928e-abcb-417c-b597-92e9b46109dc`, D2 `ddbe2b04-618c-469c-8d0d-ddb1f2d5ea3e`, D3 `4c455cac-6b5b-48c2-8e49-c8b05f3debee`.

## Keputusan owner atas ronde 2

Owner menonton D1 sampai D4 dan menilai **berhasil**: mulut muncul hanya saat tokoh bicara, mata dan hidung tidak pernah muncul, sehingga tokoh bukan gambar wajah utuh. Kriteria JOTA 1 diubah di v3.12; dialog native dipakai untuk JOTA 1. Usulan dubbing di atas tidak dipakai.

## Ronde 3: style S40 3D sinematik wajah polos (2026-10-25 sore)

Keyframe: VideoExpress Create Image, Vertical 9:16, Image Type 3D, Creative OFF, Enhance image OFF, galeri publik OFF, prompt dibuka style tag S40. Hasil: kedua tokoh polos, tangan dan kain detail. LOLOS.

Video: Create Video From Prompt dari keyframe itu, Advanced Mode, Manual Video Length 10, Enhance video OFF, struktur F5 dengan 3 kalimat dialog native.

| Uji | Cara | Hasil |
|---|---|---|
| S40-V0 | Teks kalimat ditulis di beat sheet dan di SCRIPT NGOMONG | DITOLAK sebelum render: "Your dialogues are too long and won't fit in the generated video" (ID f56a316e-7e60-46fc-b460-21b69753bf54) |
| S40-V1 | Beat sheet hanya `Saheela speaks line 1.`, teks kalimat sekali di SCRIPT `Line 1, ... says exactly` | Diterima, render sekitar 8 menit, 1080x1920, 10,04 detik (job b64828db-9ae4-4aca-80b4-cd21929027fb) |

Cek 6 frame S40-V1 (0,5; 2; 3,7; 5,3; 7; 9,6 detik), kepala diperbesar:
- Mata dan hidung: tidak muncul di semua frame, kedua tokoh. LOLOS kriteria owner.
- Mulut: muncul pada Saheela di 0,5 detik (kalimat 1) dan pada Ummi di 3,7 dan 5,3 detik (kalimat 2), tipis, lalu hilang. Di frame terakhir Ummi masih ada garis senyum samar.
- Bengong: tidak ada; setiap frame ada aksi (menyerahkan mangkuk, mengusap kepala, melompat di bangku, mengaduk).
- Kamera: push-in pelan ada dan berakhir di close-up dua kepala. Insert tangan di 3-6 detik dan pull-back di 6-8 detik tidak dijalankan; model memilih satu gerak dorong panjang.
- Suara dan lip-sync: belum dinilai, owner perlu menonton klip "S40 test: Saheela 3D" di My AI Videos.

Temuan:
1. Teks dialog wajib hanya sekali (aturan v3.19). Kemungkinan VideoExpress menghitung semua teks berkutip sebagai ucapan.
2. Gaya 3D (S40) mematuhi wajah polos sama baiknya dengan S28 pada sampel ini (1 keyframe, 1 video).
3. Instruksi kamera berlapis (insert lalu pull-back dalam satu klip) belum andal; untuk ganti ukuran shot yang tegas, pecah menjadi dua scene KEYFRAME.

Teknik cek frame tanpa unduh (sesi cloud tidak bisa menjangkau CDN VideoExpress dari shell): di tab VideoExpress, buat elemen video baru dengan `crossOrigin='anonymous'` dari URL klip di timeline, seek ke beberapa detik, gambar ke satu canvas strip, tampilkan sebagai gambar di atas halaman, screenshot dan zoom, lalu hapus elemennya. CDN mengizinkan canvas (tidak tainted).

Catatan owner setelah menonton S40-V1: gerakan Saheela turun dari bangku tidak natural. Penyebab di prompt: ketukan 6-8 detik meminta `Saheela hops on the stool happily` (lompat di atas bangku). Aturan D0b v3.20 melarang ini.
