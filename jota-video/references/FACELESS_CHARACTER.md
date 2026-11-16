# JOTA 1 faceless: metode B (kartun wajah polos) dan metode manekin

Keputusan owner 2026-10-25: syarat JOTA 1 adalah mata dan hidung tidak pernah ada; mulut boleh muncul sesaat ketika tokoh bicara (dasar: [`SYARIAT_GAMBAR.md`](SYARIAT_GAMBAR.md)). Teknik default untuk konten anak: metode B kartun wajah polos. Manekin tetap dipakai untuk dokumenter dan 3D.

Sejak v3.58.0 sistem kunci wajah ada di `PROMPT_PROFESIONAL.md` 2G (Faceless Character Lock): master karakter faceless di folder Media Library `JOTA - Master 5 Karakter Faceless`, gambar awal setiap shot dari Consistent Character dengan master itu (alat First Frame, Last Frame), prompt video pendek yang didominasi gerak, dan kata wajah terlarang. Bagian di bawah adalah riwayat dan temuan sebelumnya; kalau bertentangan, 2G yang berlaku.

## Dasar

Tutorial Sayan Roy, "AI FilmMaking Tutorial | AI Film Making With Video Express AI" (YouTube `i2CmllNmJnk`, 2026-07-19). Yang terlihat di videonya:
- Semua tokoh adalah manekin putih matte tanpa mata, hidung, mulut. Sebagian memakai seragam dan topi yang detail, sebagian polos.
- Image Prompt dibuka dengan `Cinematic faceless matte mannequin noir documentary, smooth white mannequin ...` dan memuat `no human facial features`.
- Video prompt menggerakkan **kamera** (push, circle, track), sementara manekin banyak diam: misalnya `mannequin officers remain still`.
- Setting yang terlihat: `Automatically enhance my image prompt` **OFF**, `Image Type: Photorealistic (Cinematic)`, `Use Consistent Character` OFF, `Narration Video` ON (narator, tokoh tidak bicara), `Video Only` OFF, public gallery OFF, rasio 16:9.

Tutorial itu membuat scene terpisah (tidak berantai) dan tidak ada tokoh yang bicara. JOTA memakai metode berantai dan kadang dialog, jadi aturan di bawah adalah penyesuaian JOTA yang belum diuji di akun owner.

## Kenapa wajah bisa tetap muncul

| Pemicu | Penangkal di metode manekin |
|---|---|
| Model terbiasa menggambar wajah manusia | Tokoh dijelaskan sebagai manekin sejak gambar acuan, bukan manusia |
| Enhance prompt menulis ulang dan membuang kata faceless | Enhance Image Prompt OFF untuk JOTA 1 (seperti tutorial). Enhance Video Prompt diuji ON dan OFF, cek lewat Details |
| Tokoh bicara di depan kamera | Metode B: dialog native diterima (mulut hanya saat bicara, benchmark D1 sampai D4). Metode manekin: tokoh yang bicara membelakangi kamera atau jauh |
| Close-up dan tokoh menoleh ke kamera | Shot medium sampai wide; gerakan kepala kecil |
| Hanya kalimat larangan | Kalimat positif dulu (bentuk manekin), larangan singkat sesudahnya |
| Frame sambungan sudah ada fitur samar | Cek wajah di setiap frame sambungan; ulang kalau ada |

## Metode B: kartun wajah polos (default JOTA 1 anak sejak v3.11)

Hasil benchmark 2026-10-25 (`BENCHMARK_JOTA1_20261025.md`): resep ini lolos di semua gambar manusia dan semua klip video yang diuji, sedangkan kalimat larangan saja gagal.

Kalimat pembuka wajib, ditulis persis sebagai kalimat **pertama** setiap Image Prompt (dan pembuka Smart Edit). Sejak v3.33 kalimat ini menjadi isi baris FACELESS di blok ATURAN WAJIB yang membuka setiap prompt (`PROMPT_PROFESIONAL.md` 2D):

```text
Faceless Islamic children's cartoon illustration. Every character has a plain blank face: a smooth empty skin-colored oval with nothing drawn on it, like an unpainted doll face.
```

Kalau ada hewan, kalimat pembuka menjadi:

```text
Faceless Islamic children's cartoon illustration where people AND animals are faceless. Every person has a plain blank face oval. Every animal is drawn like a soft plush toy with a smooth blank head and no eyes at all; a closed beak or muzzle shape is fine.
```

Di setiap tokoh tulis kata `faceless` (`Saheela, a small faceless girl in a black khimar hijab...`). BLOK KUNCI memakai style S28 dan baris:

```text
FACELESS: every person keeps a plain blank face, a smooth empty skin-colored oval with nothing drawn on it, in every frame of the entire video, even when turning or moving. Animals keep smooth blank heads with no eyes; beaks and muzzles stay closed.
```

Setting: generator G1 VideoExpress, `Image Type` 2D, `Use Creative mode` OFF, `Automatically enhance my image prompt` OFF. Keyframe scene berikutnya memakai `Use Consistent Character` dengan keyframe pertama yang sudah lolos. Video: Create Video From Prompt, Enhance video OFF (v3.26).

Hewan yang masih bermata (sering terjadi pada burung): pakai `Smart Edit` dengan gambar itu sebagai Reference Photo, Reference Photo Type 2D, Enhance OFF, prompt dibuka kalimat genre faceless lalu menegaskan semua tokoh tetap polos dan hanya mata hewan yang dihapus. Smart Edit menggambar ulang seluruh gambar, jadi tanpa penegasan itu tokoh manusia bisa berubah berwajah.

Yang gagal di benchmark dan tidak dipakai: kalimat larangan saja, Creative mode ON untuk gaya ini, Artistly Fast untuk gaya ini, Smart Edit tanpa penegasan.

## Tiga varian manekin (metode A, untuk dokumenter dan 3D)

| Varian | Cocok untuk | Bentuk tokoh (ditulis di prompt) |
|---|---|---|
| M1 Manekin putih dokumenter | Sejarah, dokumenter, kisah Islami, PB04 sampai PB06 | `smooth white matte mannequin figures with featureless oval heads` |
| M2 Manekin kayu hangat | Cerita keluarga, fabel, edukasi, nuansa kampung | `smooth light-wood artist mannequin figures with featureless oval heads, visible wood grain` |
| M3 Manekin pastel lembut | Konten anak, PB01 dan PB02 | `soft pastel matte mannequin figures with rounded featureless heads, gentle toy-like proportions` |

Pakaian dan aksesori tetap boleh dan disarankan: hijab, peci, gamis, seragam, caping, sarung. Pakaian dipakai di atas tubuh manekin. Untuk hijab, bagian wajah adalah oval manekin yang mulus.

Hewan dibuat sebagai patung pahatan halus dengan bahan yang sama dengan varian manekinnya, kepala tanpa mata. Contoh entok: `a smooth sculpted white matte Muscovy duck figure with a blank eyeless head and a red sculpted caruncle`. Hasil uji Anak Entok: model sering memunculkan cekungan mata pada hewan keramik. Perbaikan tercepat: edit gambar acuan dengan ChatGPT Images 2.0 (G3) untuk menghapus mata, lalu pakai shot medium atau wide untuk hewan. Paruh tertutup boleh (keputusan owner 2026-10-25).

## Kalimat wajib

Ditulis di gambar acuan, setiap Image Prompt, dan BLOK KUNCI setiap scene:

```text
FACELESS: Every human is a [varian] mannequin figure with a smooth featureless oval head. Every animal is a smooth sculpted figure with a blank eyeless head; its beak or muzzle stays closed and never moves like speech. No human facial features: no eyes, no eyebrows, no nose, no mouth, in every frame of the entire video.
```

## Gerak dan kamera untuk JOTA 1

- Biarkan **kamera** yang banyak bergerak: push in, arc, tracking, crane. Tokoh bergerak sederhana: berjalan, menunjuk, mengangkat benda, memberi makan.
- Hindari tokoh menoleh tajam ke kamera, close-up wajah, dan tertawa atau berteriak.
- Shot aman: rear view, over-the-shoulder dari belakang, medium wide, wide, siluet melawan cahaya.

## Suara untuk JOTA 1

- Suara mengikuti kartu pengaturan: default dialog antar tokoh (native satu job, poin di bawah). Kalau owner memilih **narator**: di VideoExpress centang `Narration Video`, klik `Create Video`, lalu di dialog TTS pilih Language `Indonesian (Indonesia)` dan suara (Ardi, Arif, Eduardo, Fadhlan, Gadis, Indah, Irene, Mertie, Osbaldo, Samantha), tulis narasi **maksimal 120 karakter per klip**, `Import Speech`, lalu `Create Narration Video`. Teruji 2026-10-25 (suara Gadis); kualitas suara dinilai owner.
- Dialog native di layar **dihapus sejak v3.59.0** (keputusan owner 2026-11-02: wajah muncul karena tokohnya berbicara). Percakapan dibuat dengan cara bicara tanpa mulut: klip tanpa suara orang, satu pembicara per shot, ucapan lewat `Narration Video` dengan suara tetap tokoh, dan gestur bicara (`PROMPT_PROFESIONAL.md` 2G poin 5).

## Setting VideoExpress khusus JOTA 1

| Setting | Nilai | Sumber |
|---|---|---|
| `Automatically enhance my image prompt` | OFF | Tutorial manekin |
| `Image Type` | `Photorealistic (Cinematic)` untuk M1; pilihan lain untuk M2 dan M3 diuji dulu | Tutorial manekin (M1) |
| `Use Consistent Character` + `Reference Photo` | ON dengan gambar acuan manekin | Aturan JOTA (tutorial manekin tidak memakai) |
| `Narration Video` | ON kalau cerita dibawakan narator | Tutorial manekin |
| `Automatically enhance my video prompt` | OFF (aturan v3.26 demi konsistensi). Catatan benchmark 2026-10-25: ON dan OFF sama-sama lolos faceless, ON memberi gerak lebih hidup | Aturan JOTA, benchmark |
| `Video Only`, public gallery | OFF | Aturan JOTA |

## Character bible JOTA 1

```yaml
character_id: CH01
alias: "Kakak"
varian_manekin: M2
bentuk: "smooth light-wood artist mannequin, slim, taller than CH02"
kepala: "smooth featureless oval head"
pakaian: "white peci, navy long-sleeve shirt, dark loose trousers"
warna: [navy, cream, light wood]
gestur: [menunjuk, menepuk bahu, membawa tas]
gambar_acuan: ["CH01-KAKAK-REF-v1 (depan)", "CH01-KAKAK-REF-v1-BACK (belakang)"]
ciri_tetap: "Kakak: smooth light-wood artist mannequin with a featureless oval head, white peci, navy long-sleeve shirt, dark loose trousers."
```

Tokoh terinspirasi keluarga owner memakai alias. Tidak ada nama asli, foto, atau data pribadi anak di prompt atau repo.

## QC wajah (gagal tertutup)

- Periksa seluruh klip, terutama saat tokoh menoleh, mendekat ke kamera, atau bicara. Frame sambungan diperbesar di bagian kepala.
- Kriteria lulus mengikuti [`SYARIAT_GAMBAR.md`](SYARIAT_GAMBAR.md): **gagal kalau mata atau hidung jelas terlihat** walau sekilas, atau mulut muncul pada tokoh yang sedang diam. Mulut pada tokoh yang sedang bicara tidak dihitung gagal.
- Tidak dihitung gagal: tekstur bahan, pantulan cahaya, bayangan samar, atau lekukan kecil yang tidak jelas membentuk fitur. Ukurannya: apakah orang biasa akan melihatnya sebagai mata? Kalau ya, gagal.
- Tokoh boleh menghadap kamera asal kepalanya tanpa fitur. Shot dari belakang tetap disarankan karena AI lebih jarang menambah wajah, bukan karena syarat syariat.
- Gambar yang memunculkan mata atau hidung: shot lebih jauh atau dari belakang maksimal 2 kali, lalu satu kali Smart Edit faceless (I7). Masih gagal: `FACELESS_QA_BLOCKED` (atau `NATIVE_DIALOGUE_QA_BLOCKED` kalau karena dialog), hambatan nyata sesuai `../SKILL.md` 3B poin 4.
- Tidak ada metode yang menjamin 100%. Jaminannya ada di pemeriksaan: tidak ada klip berwajah yang masuk film akhir.

## Temuan S40 dalam gerak (produksi Khalid bin Walid, 2026-11-01)

Gambar awal S40 lolos (wajah polos), tetapi klip video memunculkan wajah lengkap (mata, hidung) setiap kali tokoh berputar ke samping atau menghadap kamera: SC01 (tokoh memantapkan tiang panji lalu menoleh), SC06 (tokoh mencabut pedang sambil berbalik), SC10 (tokoh melangkah di bukit pasir lalu menoleh ke samping). Kalimat "seen from behind", "never turns around", dan HINDARI "no side profile" tidak cukup kalau ADEGAN meminta tokoh melangkah atau bergerak besar.

Yang lolos di produksi yang sama:
- Tokoh tetap membelakangi kamera dengan gerak kecil saja (menunjuk, merapikan benda di dinding), kamera yang bergerak (SC02, SC08).
- Tokoh kecil di kejauhan atau menunggang kuda dari belakang (SC03, SC07).
- Shot benda tanpa tokoh (SC01 v2, SC04).

Resep JOTA 1 untuk style 3D dan scene emosional atau aksi:
1. Tokoh diam seperti patung, membelakangi kamera; gerak datang dari angin, cahaya, debu, dan kamera.
2. Siluet berlatar cahaya (matahari di belakang tokoh), sehingga sisi yang menghadap kamera gelap.
3. Shot setinggi pinggang atau tangan saja, kepala di luar tepi atas frame, untuk aksi tangan (mengambil panji, mencabut pedang).
4. Shot benda tanpa tokoh untuk pembuka dan momen sedih.
5. Jangan menulis aksi melangkah, berbalik, menoleh, atau berdiri dari duduk untuk tokoh utama yang terlihat dekat.

## Pilihan style JOTA 1 untuk YouTube (data produksi 2026-10-31 dan 2026-11-01)

| Style | Produksi | Klip gagal wajah | Catatan |
|---|---|---|---|
| S28 kartun 2D | Abdurrahman bin Auf | 4 dari 14 klip | Wajah polos terlihat wajar; tokoh bisa beraksi, asal tidak menoleh ke kamera atau tangan ke wajah |
| S40 3D sinematik | Khalid bin Walid | 6 dari 16 klip | Paling sinematik, tetapi wajah muncul setiap tokoh melangkah atau berbalik; aman hanya untuk siluet, shot belakang diam, tangan, dan benda |

Rekomendasi: S28 untuk cerita yang tokohnya banyak beraksi (default). S40 hanya kalau owner memilihnya untuk cerita yang bisa dituturkan lewat siluet, benda, dan lanskap. Data ini dari dua produksi saja; perbarui setiap ada produksi baru.


## Temuan video Umar 3D (2026-11-01)

S40 lewat Runner, 18 shot: tokoh yang ditulis duduk membelakangi kamera dibalik menghadap kamera dengan mata, hidung, mulut; beberapa kepala belakang ikut bergambar wajah. Detektor MediaPipe di Runner tidak menandai shot itu, jadi detektor hanya penanda kasar. Keputusan owner: JOTA 1 kembali ke S28. Semua shot berorang memakai frasa KUNCI "always seen from behind or far away" dan HINDARI "no face on the back of any head", "No character turning toward the camera".
