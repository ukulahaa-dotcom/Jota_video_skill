# Evaluasi JOTA-M1-UMAR-BIN-KHATTAB-S28-20261101

Keputusan owner 2026-11-01 12:52: produksi ini dibiarkan selesai tanpa perubahan prompt. Hasilnya menjadi data untuk update skill berikutnya (rencana v3.49.0). Prompt yang dikirim Runner adalah versi sebelum v3.48 (label Indonesia, misalnya `SHOT16: Jendela pagi ATURAN WAJIB`); isi aturan faceless sama dengan v3.48.

Keputusan owner 13:15: produksi diselesaikan apa adanya tanpa mengulang shot gagal. Aturan v3.49 yang lahir dari evaluasi ini diuji di tema berikutnya; bandingkan hasilnya dengan tabel di bawah.

## Cara mengisi

Setelah `qc`, lihat lembar cek setiap shot dan isi kolom Hasil:
- `LOLOS`: tidak ada mata atau hidung, tidak ada orang tambahan.
- `WAJAH`: mata atau hidung terlihat jelas (tulis detik pertama muncul).
- `ORANG+`: muncul orang yang tidak ada di prompt.
- `GERAK`: gerak tidak natural (M1 sampai M8).
- `LAIN`: tulis singkat.

## Jenis shot dan dugaan risiko

Jenis: `KOSONG` (prompt tanpa orang), `TANGAN` (hanya tangan), `JAUH` (orang kecil atau dari belakang), `SEDANG` (tokoh dari belakang, dekat).
Kamera `BUKA AREA` = kamera bergerak ke bagian yang tidak ada di gambar awal, sehingga model mengarang isinya.

| Shot | Jenis | Gambar awal | Kamera | Dugaan risiko | Hasil | Catatan |
|---|---|---|---|---|---|---|
| SHOT01 | KOSONG | BARU | push ke jendela | Sedang: blok aturan menyebut orang | | |
| SHOT02 | KOSONG | LAST FRAME SHOT01 | push ke jendela | Sedang | | |
| SHOT03 | JAUH (pasar, ramai) | BARU | maju di jalan | Tinggi: banyak figuran | | |
| SHOT04 | JAUH ke TANGAN | LAST FRAME SHOT03 | glide ke tangan, BUKA AREA | Sedang | WAJAH, ORANG+, LAIN | Dilihat owner 12:57 (detik 0:05): satu pedagang dari belakang menjadi 4 orang berkerudung, close-up, wajah lengkap (mata, hidung, mulut, telinga). Gaya bergeser dari 2D S28 ke render semi-3D. Keranjang menjadi kurma yang ditebar. KUNCI shot ini tidak memuat definisi pedagang atau MEN, hanya STYLE dan LAYOUT. |
| SHOT05 | TANGAN ke lanskap | LAST FRAME SHOT04 | naik ke atap, BUKA AREA | Tinggi | | |
| SHOT06 | JAUH (sangat kecil) | BARU | pan lembah | Rendah | | |
| SHOT07 | SEDANG (Umar dan figuran) | BARU | ikut dari belakang | Tinggi: figuran di sisi lorong | WAJAH | Dilihat owner 12:54: Umar berdiri diam di tengah lorong, badan setengah berbalik, wajah anime lengkap menghadap kamera sudah sejak detik 0:01 (cek frame 0:00, kemungkinan gambar BARU sudah berwajah); prompt menulis Umar berjalan menjauh. Satu pria dekat di kanan juga berwajah. Figuran kecil lain (sekitar 20 orang, sorban dan khimar panjang) polos semua: data positif untuk aturan figuran. |
| SHOT08 | SEDANG ke TANGAN | LAST FRAME SHOT07 | turun ke tangan | Sedang | LAIN | Dilihat owner 12:58: gaya 3D, malam, pria bersorban dari belakang menghadap jendela berbintang dengan pelita. Isinya tidak cocok dengan SHOT07 S28 (pasar siang), tetapi cocok dengan SHOT07 proyek 3D lama (pelita dan jendela malam). Lihat bagian Bug Runner. |
| SHOT09 | TANGAN ke lanskap | LAST FRAME SHOT08 | mundur dan naik, BUKA AREA | Tinggi | | |
| SHOT10 | KOSONG | BARU | push ke jendela | Sedang | | |
| SHOT11 | KOSONG | LAST FRAME SHOT10 | pan ke pelita | Sedang | | |
| SHOT12 | TANGAN/KAKI | BARU | ikut kaki rendah | Rendah | | |
| SHOT13 | KAKI ke tubuh | LAST FRAME SHOT12 | tilt naik, BUKA AREA | Tinggi: tilt bisa sampai kepala | | |
| SHOT14 | SEDANG (masuk rumah) | BARU | ikut lewat pintu, BUKA AREA | Tinggi: isi ruangan dikarang | | |
| SHOT15 | TANGAN | BARU | push ke perkamen | Sedang | | |
| SHOT16 | TANGAN ke KOSONG | LAST FRAME SHOT15 | glide ke jendela, BUKA AREA | Tinggi | WAJAH, ORANG+ | Sudah terlihat owner 12:45: kerumunan 5 orang berkerudung, wajah lengkap menghadap kamera, padahal prompt tanpa orang |
| SHOT17 | JAUH | BARU | track samping | Rendah | | |
| SHOT18 | SEDANG (barisan dari belakang) | BARU | maju di antara barisan | Sedang: banyak kepala | GERAK, ORANG+ | Dilihat owner 13:01: wajah aman (semua dari belakang), tetapi orang yang duduk ikut bergeser bersama-sama seperti robot. Prompt menyuruh orang diam dan kamera maju di antara barisan yang rapat, jadi model menggerakkan barisan, bukan kamera. Muncul juga perempuan berkhimar di dalam barisan laki-laki, padahal prompt hanya menyebut laki-laki (salah secara adab shaf). |
| SHOT19 | SEDANG (Umar dari belakang) | BARU | ikut dari belakang | Rendah | | |
| SHOT20 | TANGAN | BARU | push ke tangan | Sedang | | |
| SHOT21 | KOSONG | BARU | push ke pintu | Sedang | | |
| SHOT22 | JAUH | BARU | naik dan mundur | Rendah | | |

## Bug Runner: frame sambungan bisa diambil dari proyek lain (ditemukan 12:58)

Fakta dari kode `apps/videoexpress-runner/runner.mjs`:
- `clipReady`, `contextOnCard`, dan `clipUrl` mencari klip di My AI Videos hanya dari awal judul `SHOT07:`, lalu mengambil kartu pertama yang cocok.
- Proyek 3D lama `JOTA-M1-UMAR-BIN-KHATTAB-20261101` memakai nomor shot yang sama (SHOT01 sampai SHOT18) dengan judul yang juga diawali `SHOT07:`.
- Nama frame `SHOT07-END-v1` juga tidak memuat nama proyek.

Dugaan kuat (cocok dengan SHOT08, belum dipastikan di akun): ketika klip S28 sumber belum jadi, Runner menganggap kartu proyek 3D lama sebagai klip sumber, menyimpan frame terakhirnya, lalu shot SAMBUNG S28 mulai dari frame 3D itu. Shot yang mungkin terdampak: semua LAST FRAME (SHOT02, 04, 05, 08, 09, 11, 13, 16). SHOT04 (semi-3D dengan atap kota) dan SHOT08 (3D malam) cocok dengan pola ini. Risiko yang sama ada di `finish`: klip yang diunduh ke Final Cut bisa klip proyek lama kalau klip S28-nya belum jadi.

Akibat untuk evaluasi: shot LAST FRAME di produksi ini bukan data yang sah untuk menilai gaya S28 dan aturan prompt. Yang sah untuk evaluasi: shot BARU.

## Hipotesis yang diuji (belum terbukti)

1. **Blok aturan memanggil orang.** Shot KOSONG dan TANGAN tetap memuat FACELESS ("Every person...") dan HEAD COVERING ("Every man... every woman..."). Model bisa membacanya sebagai daftar isi adegan. Kalau benar, shot KOSONG dan TANGAN akan lebih sering `ORANG+` daripada shot JAUH.
2. **Kamera BUKA AREA memancing karangan.** Kalau benar, shot bertanda BUKA AREA lebih sering gagal daripada push in biasa.
3. **Figuran banyak dan dekat memancing wajah.** Kalau benar, SHOT03, SHOT07, dan SHOT18 paling sering `WAJAH`.
4. **Tokoh utama tanpa tugas menoleh ke kamera.** Tokoh yang disorot sendirian di tengah frame, dari belakang, hanya diberi aksi berjalan, dibuat model menoleh ke belakang (pose khas tokoh utama di keramaian). Kalau benar, tokoh utama yang tangannya sibuk dan arah perhatiannya jelas di dalam frame lebih jarang menoleh.
5. **Kamera mendekat ke orang menghapus keamanan figuran.** Figuran polos karena kecil dan jauh; begitu kamera glide atau push in ke orang, model menggambar ulang mereka dari dekat dan wajah muncul (SHOT04). Kalau benar, shot yang mendekat ke orang gagal jauh lebih sering daripada shot yang jaraknya tetap.
6. **Shot SAMBUNG tanpa kalimat KUNCI tokoh membuat tokoh ditafsir ulang.** SHOT04 tidak mengunci pedagang; hasilnya jumlah, jenis kelamin, dan gaya berubah. Cek shot SAMBUNG lain yang KUNCI-nya hanya STYLE dan LAYOUT.
7. **Kamera menembus kerumunan diterjemahkan menjadi kerumunan yang bergerak.** Kalau jalur kamera terhalang orang (maju di antara barisan rapat) dan orang disuruh diam, model menggeser orangnya serempak. Kalau benar, shot kerumunan dengan kamera diam atau bergeser menyamping pada jarak tetap tidak menunjukkan gerak serempak.
8. **Gerak kecil yang sama untuk semua orang terlihat seperti robot.** "Small natural breathing movements" untuk semua orang sekaligus memberi gerak serentak. Gerak figuran perlu ditulis per orang dan bergiliran waktunya.
9. **Kata "anime-style" di style tag S28** menarik ke wajah anime. Data dari produksi ini saja tidak cukup; butuh uji A/B terpisah.

## Rencana v3.49.0 (menunggu hasil tabel di atas)

- Blok `NO PEOPLE` untuk shot KOSONG dan `HANDS ONLY` untuk shot TANGAN, tanpa kalimat yang menyebut orang; Runner memeriksa penanda `people` per shot.
- Kamera tidak boleh membuka area yang tidak ada di gambar awal; pindah ke area baru memakai KEYFRAME.
- Penutup kepala perempuan: khimar panjang sampai dada, gamis longgar sampai kaki.
- Figuran di sekitar tokoh (permintaan owner 2026-11-01): laki-laki berjenggot sebagai satu bentuk padat di rahang dan dagu, tanpa kumis; perempuan berkhimar panjang; hanya di shot lebar atau sedang-lebar, menyamping atau membelakangi, jumlah ditulis. Diuji dulu di SHOT03 dan SHOT07.
- Uji A/B style tag S28: "2D anime-style illustration" melawan "flat 2D picture-book illustration".
- Perbaikan dokumen: durasi shot tanpa narasi 10 detik di SKILL.md 4B langkah 7, label Inggris di SKILL.md baris 25 dan bagian 5.

## Temuan dari pemeriksaan shots.json (bukan dari klip)

- Pedagang di SHOT03 sampai SHOT05 tidak punya kalimat KUNCI sama sekali (bukan bagian MEN, tidak ada di bible). Tangan di SHOT15, SHOT16, dan SHOT20 juga tanpa KUNCI pemilik tangan. Tokoh yang muncul tanpa KUNCI melanggar `CONSISTENCY_RULES.md` (tidak ada tokoh di luar bible) dan bisa menjadi penyebab hipotesis 6.
