# Reference sheet dan arahan sutradara untuk VideoExpress — versi 0.2.0 (USULAN, sebagian teruji)

Status: **USULAN, BELUM TERUJI di VideoExpress.** Produksi tetap memakai aturan SKILL.md, PROMPT_FACELESS_V4.0.0.md dan
CONSISTENCY_RULES.md sampai uji di bagian 7 lulus dan owner menaikkan status ini menjadi wajib.

Asal: owner 2026-11-17 meminta hal baik dari tutorial AI Films World (VideoExpress 3.5) diterjemahkan ke sudut pandang
VideoExpress dan JOTA ("ikuti yang baik ... terjemahkan ke POV video express"), dengan reference sheet bukan hanya untuk tokoh
tetapi juga ruangan, lingkungan, dan benda. Yang TIDAK diambil dari tutorial: wajah, dialog di prompt video, musik, gaya fotorealistis.

## 1. Prinsip

VideoExpress mengikuti instruksi yang jelas dan konkret, tetapi tidak selalu (V6: 2 dari 11 gambar tetap berwajah; musik muncul
walau dilarang). Maka: (a) beri VideoExpress bahan visual yang tetap dan instruksi yang konkret; (b) periksa hasilnya otomatis.
Siapkan bahan sekali, simpan di folder yang jelas, ambil yang dibutuhkan per shot, periksa.

## 2. Pustaka acuan (reference sheet)

```
characters/acuan/
  tokoh/<NAMA>/       depan, 34-kiri, 34-kanan, samping-kiri, belakang   (latar netral abu muda, badan utuh, baju resmi tokoh)
  ruang/<RUANG>/      denah-atas (diagram), sudut-A..D                  (KOSONG tanpa orang, cahaya resmi)
  lingkungan/<TEMPAT>/ lebar, sedang; varian pagi / sore / malam / hujan (KOSONG tanpa orang)
  benda/<BENDA>/      depan, samping, dipegang-tangan (tangan tanpa wajah) untuk skala
```

- Setiap gambar acuan juga disimpan di Media Library VideoExpress (My AI Images) dengan nama unik:
  `REF-<SERIAL>-<JENIS>-<NAMA>-<SUDUT>[-<WAKTU>]`, contoh `REF-UWAIS-TOKOH-UWAIS-34KIRI`, `REF-AMPLOP-RUANG-MAKAN-SUDUTA-PAGI`.
  Slot Reference Photo hanya bisa memilih dari Media Library, bukan dari file Mac.
- Salinan lokal di folder di atas beserta `acuan.json`: nama library, mediaId bila ada, sha256, prompt, hasil jota-wajah.
- Satu set dipakai ulang untuk semua episode serial yang sama (hemat kredit, identitas tetap).
- Tokoh: satu gambar per sudut, BUKAN satu gambar berisi beberapa sudut (VideoExpress bisa menggambar tokoh berulang).
- Ruang dan lingkungan selalu kosong: orang di acuan ruangan bisa membuat VideoExpress menambah tokoh asing.
- Denah atas tidak dipasang di slot; dipakai untuk Buku keadaan, penulisan prompt dan QC (jendela kiri, pintu kanan, meja tengah).
- Benda tidak masuk slot pada shot bertokoh; dipakai untuk deskripsi prompt (warna, ukuran dibanding tangan) dan QC.

### Prompt gambar acuan (Create Image, Image Type 3D, Creative OFF, Enhance OFF, public gallery OFF)

Tokoh, satu per sudut:
`MANDATORY RULES: faceless 3D Pixar-style character reference, single character only, full body head to shoes, <SUDUT> view,
neutral light-gray seamless background, even soft studio light, no props, no text. <DESKRIPSI TOKOH dari tokoh.json: umur, tinggi cm,
rambut, baju persis>. The face is completely smooth uninterrupted skin with no eyes, eyebrows, nose, nostrils, lips or mouth.
Same outfit and proportions as the approved front reference.` (sudut selain depan memakai acuan depan di Reference Photo 1)

Ruang/lingkungan, satu per sudut:
`MANDATORY RULES: empty 3D Pixar-style environment reference, NO people, NO characters, NO animals, <RUANG> seen from <SUDUT:
posisi kamera dan arah>, <letak benda tetap dari denah>, <cahaya dan waktu>, vertical 9:16, no text.` (sudut B-D memakai sudut A
di Reference Photo 1 agar perabot dan warna sama)

## 3. Aturan pemakaian 2 slot Reference Photo

| Shot | Slot 1 | Slot 2 |
|---|---|---|
| 1 tokoh di ruang/lingkungan | tokoh, sudut yang cocok dengan kamera shot | ruang/lingkungan, sudut yang cocok (dan waktu yang sama) |
| 2 tokoh | tokoh A sudut cocok | tokoh B sudut cocok; ruangan dijaga lewat gambar awal dan prompt |
| Close-up benda tanpa tokoh | benda | ruang sudut cocok |
| Ruang kosong / establishing | ruang sudut cocok | lingkungan (bila terlihat lewat jendela/pintu) |

Pemetaan kamera ke sudut tokoh: `front`/`facing camera` -> depan; `three-quarter` + tokoh di kiri frame -> 34-kanan (menghadap ke
tengah), di kanan frame -> 34-kiri; `profile`/`side` -> samping; `from behind`/`rear` -> belakang. Pemetaan dicatat di shots.json
(`refs[].sudut`) agar bisa diaudit.

## 4. Arahan klip 10 detik (terjemahan tutorial ke FACELESS V4)

Struktur tetap V4 (kamera, tokoh dan tempat, soundtrack, timeline 5 segmen, wajah polos di setiap segmen), dengan tiga perubahan:

1. **First frame 0:00 konkret**: posisi tiap tokoh (kiri/kanan frame, jarak), arah badan, benda penting dan letaknya, sudut kamera.
   Harus sama dengan gambar awal.
2. **Setiap segmen 2 detik berisi satu aksi fisik konkret + satu reaksi + satu instruksi kamera.** Tidak ada kalimat pengisi
   ("Continue that exact motion", "Settle the existing movement"). Satu aksi utama per segmen; aksi harus muat 2 detik secara fisik.
3. **Final frame 0:10 konkret**: posisi, arah badan, letak benda, ukuran shot. Final frame = first frame shot SAMBUNG berikutnya.

Kamera mengikuti aksi, bukan hiasan: geser pelan mengikuti orang berjalan, push-in kecil ke tangan/benda yang penting, pull-back
untuk memperlihatkan hasil. Maksimal tiga perubahan kamera per 10 detik. Tanpa close-up wajah kecuali storyboard memintanya
(wajah tetap polos). Batas UI sekitar 4.745 karakter.

## 5. Pustaka gerakan teruji

`references/PUSTAKA_GERAK.md` (dibuat saat uji pertama): daftar ketukan 2 detik yang terbukti mulus di VideoExpress (menunjuk,
menoleh badan, satu langkah, duduk, meletakkan benda) dan yang sering rusak (pelukan, wajah menempel, tangan bertaut rumit, lari cepat).
Prompt mengambil ketukan dari daftar ini. Setiap uji menambah baris dengan bukti klip.

## 6. QC hasil klip (selain wajah)

- Wajah: `jota-wajah` (opsi `qc_wajah_mac`), satu fitur = tolak.
- Anatomi dan fisika (usulan, tahap awal hanya menandai REVIEW, tidak menolak sendiri): jumlah lengan dan tangan per orang, jari menyatu,
  benda menembus tangan, benda muncul/hilang di luar naskah, kaki melayang, kecepatan gerak tidak wajar, kamera melompat.
  Sumber: cek anatomi PC (`qc-vlm.mjs` cekAnatomi) dibawa ke Mac + cek benda terhadap Buku keadaan.
- Kontinuitas: frame terakhir shot N dibandingkan frame pertama shot N+1 (tokoh, baju, posisi, cahaya, benda).
- Review film utuh: lembar kontak (frame awal dan akhir tiap shot berdampingan) + grafik loudness (narasi −16 LUFS, SFX −26 LUFS,
  tanpa musik) untuk penilaian owner dalam satu halaman.

## 7. Uji pertama (syarat naik status menjadi wajib)

1. Acuan tokoh Uwais 5 sudut: semua lolos jota-wajah 8B; baju, rambut dan tinggi sama antar sudut (cek visual).
2. Acuan ruang makan Amplop 4 sudut kosong: tanpa orang; meja, jendela, pintu cocok dengan denah antar sudut.
3. Satu shot dengan acuan sudut yang cocok vs tanpa acuan sudut: apakah identitas, baju, dan ruangan lebih konsisten.
4. Uji A/B prompt SHOT04 (`evals/UJI-AB-GAYA-ARTIKEL-20261117/`): V4 sekarang vs arahan bagian 4.
Hasil, termasuk yang gagal, dicatat di `evals/` dengan klip, hash dan laporan QC.

## 8. Hasil uji 2026-11-17 (runner Mac, Create Image, tanpa video)

Proyek `JOTA-M1-ACUAN-UWAIS-RUANG-20261117` (uji 1, tanpa Reference Photo) dan `-R2` (uji 2, sudut lanjutan dengan sudut pertama
di Reference Photo 1). Semua gambar tersimpan dan terbaca ulang di My AI Images dengan nama unik; QC wajah otomatis jota-wajah 8B.

| | Uji 1: prompt saja | Uji 2: + Reference Photo 1 |
|---|---|---|
| Tokoh Uwais | 5/5 polos; baju konsisten; belakang jadi rompi, samping masih 3/4 | samping profil penuh, belakang berlengan penuh, identitas sama; 1 dari 4 kandidat ditolak jota-wajah (hidung di profil) |
| Ruang makan | tanpa orang; lantai/lampu berubah antar sudut; sudut balik gagal; benda terlarang muncul | isi ruangan sama persis, TETAPI sudut kamera ikut tersalin (B/C/D mirip A) |

Aturan yang terbukti (naik dari usulan): **acuan tokoh** = sudut depan dulu, sudut lain dengan depan di Reference Photo 1, lalu jota-wajah
per kandidat (Consistent Character menghasilkan 2 kandidat; pilih yang PASS).
Belum terbukti: **acuan ruang per sudut**. Reference Photo mengunci isi sekaligus komposisi. Uji berikutnya: sudut balik dari prompt dengan
benda per sisi eksplisit lalu seleksi terhadap denah; dan perilaku ruang di slot 2 bersama tokoh di slot 1.
