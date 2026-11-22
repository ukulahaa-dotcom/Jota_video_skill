# STANDAR SINEMATIK KANG OHAN (owner 2026-11-22, FATAL, berlaku untuk semua produksi)

Teguran owner atas Piring Keempat dan Uang Titipan (PC-01 2026-11-21):
- Visual toko tidak jelas dan terlihat seperti di dalam rumah.
- Penonton hanya melihat punggung, sehingga tidak ada hook visual dan penonton langsung pergi.
- Sudut kamera tidak profesional karena dikorbankan demi lolos QC faceless. **Menipu kamera demi lolos QC adalah tindakan fatal.**
- Narasi dan storyboard buru-buru, mengejar durasi.
- Gaya visual tidak jelas: realistis atau 3D.

Dokumen ini MENGGANTIKAN semua aturan lama yang bertentangan:
- "kamera dari belakang";
- "tanpa close-up tangan";
- "berdampingan membelakangi kamera";
- "Every person keeps facing away from the camera";
- "seen only from behind";
- "pilih gambar yang murni membelakangi";
- `rear_only`.

## STANDAR PERMANEN WAJAH FACELESS (owner 2026-11-22: "gunakan ini forever ... jangan terulang ... INGAT dan CATAT")
1. **Kamera TIDAK menghindari wajah.** Close-up, medium, dan wide boleh dan wajib menampilkan wajah dari depan atau tiga perempat bila adegan butuh. Memutar kamera ke punggung atau memotong kepala demi lolos QC = FATAL.
2. **Wajah = kulit orang itu sendiri**: tanpa mata, alis, hidung, bibir, atau mulut. Kata "smooth blank skin surface" DILARANG karena menghasilkan wajah manekin.
3. **FACE SKIN**: tone, warna, pori, dan cahaya sama dengan leher, telinga, dan tangan; menyatu tanpa tepi atau tambalan pucat.
4. **FACE TEXTURE**: pori halus, warna sedikit tidak rata, kilap lembut di dahi dan pipi, bulu halus, kerut sesuai usia, janggut tipis menyambung dari rahang. Tidak boleh mulus, datar, airbrush, atau plastik. Uji D 2026-11-22 (`uji-kulit/D/gambar/hal-01-1.png`) lolos: wajah terbaca sebagai kulit asli.
5. **FACE LIGHT**: cahaya kunci dari samping, bayangan lembut, rim light. Cahaya rata = topeng.
6. **Acuan emas** dicentang owner: C1 (`uji-kulit/BC/gambar/hal-02-1.png`). QC mata menolak kandidat dengan tone wajah yang berbeda dari leher, walau QC otomatis lolos.
7. Tokoh tidak berbicara atau tertawa di prompt VideoExpress (mulut muncul). Dialog = gestur + audio ElevenLabs, satu pembicara per shot.
8. **Kebebasan kamera (owner 2026-11-22: "bebas memainkan angle camera dan shot dimana saja")**: semua sudut dan ukuran shot boleh. Shot yang membawa wajah dekat ke kamera = First/Last dari library. QC wajah dan cek mata tetap wajib.
9. Semua blok ini sudah tertanam di `pemeran.mjs` (lembar, acuan), `paket-kisah.mjs` (adegan, kelompok, video), dan preset Artistly `kisah-3d-realistis`. Jangan dihapus.
## 0. Introspeksi: kesalahan saya (Claude) dan penyebabnya
1. **Faceless saya artikan sebagai "wajah tidak terlihat".** Definisi owner adalah "tanpa mata, hidung, mulut", yaitu wajah POLOS yang boleh terlihat dari depan. Keputusan owner 2026-11-08 dan 2026-11-09 sudah mencabut `rear_only` serta membolehkan close-up dan putaran 360°. Saya malah mundur ke kamera punggung.
2. **Lembar karakter tanpa sudut depan.** `skripLembar` hanya berisi belakang, tiga perempat belakang, dan samping. Akibatnya VideoExpress tidak pernah melihat rupa depan yang polos, lalu mengarang wajah saat tokoh menoleh. Saya mengatasi gejalanya dengan memutar kamera ke punggung, padahal penyebabnya ada di acuan. Memory `jota-referensi-karakter` sudah meminta sudut "depan, samping, belakang, wajah polos", dan saya tidak menurutinya.
3. **Instruksi ChatGPT yang saya tulis memerintahkan kamera dari belakang** (`gpt/INSTRUKSI-CHATGPT-PAKET.md`). Semua paket akhirnya ditulis "rear/rear-quarter, no front view", jadi kesalahan saya menular ke penulis storyboard.
4. **Gaya campur aduk.** Paket menulis "realistic cinematic live-action" dan adapter memakai `image_type: human`. Padahal uji Qabil-Habil membuktikan gaya realistis membuat VideoExpress melengkapi wajah (17/20 kepala). Gaya tidak pernah saya putuskan.
5. **QC hanya menilai "lolos faceless", tidak menilai "enak ditonton".** Tidak ada gerbang untuk hook visual, establishing lokasi, variasi ukuran shot, atau keterbacaan arsitektur. Video yang membosankan tetap lolos.
6. **Durasi saya laporkan, tetapi cerita tidak saya kembangkan.** Narasi 2,8 menit dipaksakan ke 42 shot, sehingga terasa buru-buru. Seharusnya cerita yang menentukan durasi.
7. **Fitur VideoExpress tidak saya kembangkan.** First Frame/Last Frame dan LAST_FRAME (sambung) sudah ada di runner, tetapi tidak saya pakai. Semua shot memakai start BARU, sehingga hasilnya jump cut.

## 1. Gaya visual: DIPUTUSKAN 3D REALISTIS SINEMATIK
- Satu gaya untuk seluruh channel: **3D realistic cinematic animation, feature-film CGI quality**. Kulit dan kain bertekstur natural, material PBR, key light jelas, grading kaya tapi natural. Di VideoExpress dipakai `image_type: 3d`.
- Alasan (fakta):
  - Wajah polos tampak wajar di 3D, sedangkan di live-action terlihat seperti mayat atau topeng (uncanny).
  - Uji Qabil-Habil: gaya realistis menghasilkan wajah dilengkapi VideoExpress pada 17/20 kepala.
  - Benchmark V3 owner: Image Type 3D dengan face lock bisa menampilkan wajah polos saat menghadap kamera dan saat berputar 360°.
  - 3D sinematik dengan cahaya dramatis lebih kuat sebagai thumbnail dan hook.
- Kulit tetap natural (keputusan 2026-11-18 "bagus kulitnya"), proporsi dewasa, tidak chibi atau boneka.
- Dilarang mencampur gaya dalam satu film. Kolom `gaya` dari paket ChatGPT diabaikan adapter.

## 2. Faceless yang benar
- Wajah = permukaan kulit mulus TANPA mata, alis, hidung, bibir, mulut, dari semua sudut. Bukan topeng, bukan disembunyikan.
- Per tokoh: lembar 4 sudut LBR (depan, tiga perempat depan, samping, belakang; `skripLembar`) sebagai Reference Photo, ditambah ACU satu figur (`skripAcuan`) sebagai cadangan. Kalimat prompt mengikuti 2b.
- Bila QC menemukan wajah: perbaiki penyebabnya. Urutannya:
  1. lembar acuan;
  2. gambar awal (pilih kandidat lain);
  3. prompt (FACELESS LOCK);
  4. render ulang.
- Mengganti sudut kamera menjadi punggung demi lolos QC DILARANG. Bila tetap gagal setelah perbaikan, laporkan ke owner dengan bukti frame.

### 2b. HASIL UJI 2026-11-22 (PC-01, `gpt/productions/PC01-UJI-SINEMATIK-20261122`): FAKTA
- **Lembar 4 sudut di Artistly** (preset baru `kisah-3d-realistis`):
  - 4/4 lolos QC dan wajah polos terlihat dari depan.
  - Preset `kisah-sinematik-natural` memaksa kain kepala pada tokoh "penutup: none". Preset baru tidak.
  - Tokoh gemuk sempat tampak anak-anak. Solusinya menulis usia dewasa di `usia`/`tubuh` (contoh "mature middle-aged adult man", "head one seventh of body height", "grey at the temples").
- **Lembar 4 sudut dipakai sebagai Reference Photo VideoExpress = GAGAL.**
  - VideoExpress menyalin tata letak lembar: 4-6 tokoh yang sama berbaris pada shot wide, OTS, tracking, dan First-Last (5 dari 8 shot). Satu kandidat (OTS) bahkan memunculkan wajah lengkap.
  - Image prompt saat itu menulis "every person ... exactly like the front view of the reference sheet". Owner: "pasti muncul semua lah".
  - **Penyebab (diagnosis owner)**: kalimat prompt "every person ... reference sheet" ditambah blok "crowd". Lembar tetap metode owner (uji Tiga di Gua lulus).
  - **Aturan**: Reference Photo bawaan = lembar 4 sudut (LBR). Prompt menyebut jumlah orang ("The one person in this scene", "Exactly one person in the whole frame") dan "the reference photo shows this person from several angles for identity only; draw him only once ... never copy the row of poses". Prompt TIDAK menulis "every person" / "reference sheet".
  - Opsi bila klon masih muncul: `"acuan": "ACU"` di penyesuaian.json memakai acuan satu figur (`skripAcuan`, `<PREFIX>_ACU_<X>`). Belum diuji.
- **Blok KERAGAMAN ("real people in a real crowd") pada adegan SATU orang memunculkan kerumunan klon** (Artistly 5/9 halaman). Kini blok itu hanya dipakai untuk 2 orang atau lebih, tanpa kata *crowd*.
- **Yang sudah terbukti bagus** (VideoExpress v1 dan Artistly):
  - establishing eksterior toko: fasad, atap genteng, awning, etalase, sepeda, terbaca jelas sebagai toko;
  - medium tiga perempat depan dan close dada ke atas dengan wajah polos tampak natural;
  - OTS pelanggan ke pemilik toko yang menghadap kamera, dan tracking di depan toko (Artistly).
- **Hybrid (owner 2026-11-22 "hybrid artistly dan videoexpress")**:
  - Artistly untuk lembar tokoh (LBR = Reference Photo) dan ACU cadangan.
  - Artistly juga boleh untuk gambar awal shot yang butuh komposisi kuat (establishing, OTS, tracking), yang lalu diimpor (`impor-artistly`) dan dipakai `PAKAI_ULANG`.
  - VideoExpress Create Image + Consistent Character (ACU) untuk shot tokoh lain, dan VideoExpress untuk semua klip.
  - Pilih kandidat terbaik dari keduanya. Gambar Artistly bisa diimpor ulang kapan saja; gambar VideoExpress tidak.
- Login VideoExpress: sesi runner ada di profil `local-state\profiles\videoexpress`, BUKAN Chrome biasa. Login lewat `E:\JOTA-Standby\JOTA.cmd login-videoexpress` (jendela runner), dan owner mengetik sendiri kode 2FA.
- Belum diuji (menunggu perintah owner): gambar awal dengan kalimat prompt yang sudah diperbaiki, klip, LAST_FRAME sambung, First-Last Frame, dan peta multi-shot.

- **Uji bicara (owner 2026-11-22, `bicara/PC01USB-SHOT01.mp4`, dari SHOT10-1)**: kelima orang berhitung bergantian ("Mari berhitung, mulai dari saya, satu!" ... "Lima!"), dan suara bawaan VideoExpress terdengar benar (Whisper).
  - HASIL: MULUT MUNCUL. Tokoh utama membuka mulut bergigi saat "satu" (detik 1,6), dan semua orang tertawa dengan mulut terlihat di akhir (detik 9,6). Mata tidak muncul. Kalimat "nothing opens on it" di prompt tidak menahan mulut.
  - Gambar awal tetap konsisten: figuran dan baju sama, tanpa klon.
  - **Aturan tetap**: tokoh tidak berbicara atau tertawa di prompt VideoExpress. Dialog = suara ElevenLabs saat rakit. Bahasa tubuh (angkat tangan, angguk, tepuk perut, angkat keranjang) terbukti jalan dan cukup untuk menandai giliran bicara.
- **Kulit wajah "tambalan putih" (owner 2026-11-22, FATAL)**: kata "smooth blank skin surface" membuat Artistly menggambar wajah manekin pucat. Paling parah pada kulit gelap; kalimat "same skin as neck and hands" saja tidak cukup.
  - Sudah diganti di preset `kisah-3d-realistis`, lembar, acuan, prompt adegan, dan prompt video: "no eyes ... mouth; the face is simply the person's own skin" ditambah blok FACE SKIN (warna, pori, cahaya sama dengan leher dan tangan, menyatu tanpa tepi atau tambalan pucat).
  - Hasil foto kelompok `grup-v3`: wajah jauh lebih menyatu dengan warna leher, tapi beberapa masih sedikit lebih terang. Kuli kehilangan rambut, jadi rambut wajib dicek per kandidat.
  - Wajah pucat di acuan menular ke VideoExpress. Acuan lama (LBR/GRP sebelum perbaikan ini) jangan dipakai lagi.
- **Dialog = gestur + audio terpisah (owner 2026-11-22)**: prompt hanya "EXPLAINING GESTURES" (angkat telunjuk, buka telapak, angguk, bahu) tanpa kata speak/say/laugh. Suara ElevenLabs ditempel mulai frame pertama shot.
  - Uji `bicara2`: 0 mulut di 12 frame (3 fps). Audio "Mari berhitung, mulai dari saya. Satu!" 2,7 detik dicek Whisper.
  - Gagal: gestur dilakukan orang yang salah (kuli, bukan tokoh baju cokelat). Kalimat "second from left" diabaikan.
  - **Aturan**: satu pembicara per shot, dan pembicara harus dibingkai sendiri atau dominan (medium/close/OTS ke pembicara), bukan wide berlima. Adapter memperingatkan bila lebih dari satu tokoh bicara dalam satu shot. Panjang klip = panjang ucapan, minimal 3 detik.
- **Uji kulit A/B/C (2026-11-22, `uji-kulit/banding.jpg`, penjual ikan kulit gelap, medium close-up)**:
  - A (preset dan blok kulit, cahaya rata) masih seperti topeng pucat.
  - B tidak teruji: gambarnya identik dengan A. Dugaan: runner Artistly mengambil gambar terlambat dari generate sebelumnya (log: "2 gambar disimpan" sekitar 20 detik setelah mulai). Setiap hasil Artistly dicek hash terhadap gambar lama.
  - **C (cahaya kunci dari samping + bayangan lembut + rim light) MENANG**: warna dan gradasi wajah sama dengan leher dan lengan.
  - **Aturan**: blok FACE LIGHT wajib di semua prompt berorang (adegan, lembar, kelompok, video). Wajah polos di bawah cahaya rata = topeng.
- **Gambar pasar v4 (acuan dengan cahaya samping)**: kulit wajah figuran menyatu dengan leher (kakek, kuli, ibu, penjual ikan). Masalah:
  - kandidat 1 menggandakan tokoh utama (tampak depan dan belakang dari lembar, jadi 6 orang);
  - kandidat 2 menyalin latar studio acuan;
  - wajah tokoh utama masih sedikit lebih terang dari lehernya.
  - Dugaan: lembar 4 sudut + foto kelompok di dua slot memicu salin tata letak. Usulan: tokoh utama memakai ACU satu figur (`"acuan": "ACU"`) saat digabung dengan foto kelompok.
- **KEPUTUSAN OWNER 2026-11-22 (acuan emas kulit wajah)**: dari `uji-kulit/banding.jpg` owner MENCENTANG C1 (`uji-kulit/BC/gambar/hal-02-1.png`), dengan alasan tone warna wajah = leher. A1, A2, B1, B2 DITOLAK karena wajah lebih terang dari leher. C2 diberi tanda ragu. Aturan QC mata: kandidat dengan wajah yang tone-nya berbeda dari leher dan tangan = TOLAK, walau QC otomatis lolos. Pakai C1 sebagai contoh pembanding saat meninjau.

- **Uji klip pasar v5 (2026-11-22, acuan ACU satu figur + kelompok bertekstur)**:
  - Gambar awal SHOT10-1 bagus: tepat 5 orang, tanpa klon, tone wajah menyatu. Kandidat 2 DITOLAK karena penjual ikan berwajah lengkap: tanpa kata "blank", VideoExpress kadang menggambar wajah sungguhan, jadi gerbang QC + cek mata wajib.
  - Klip SHOT10 (berjalan + push-in) dan SHOT110 (kamera tripod, "berhenti di jarak medium"): di detik 0-3 (wide) wajah aman. Tapi tokoh tetap berjalan sampai close-up, lalu muncul garis bibir, rongga mata samar, dan **titik merah di dahi** (QC 3/22 dan 2/22 kepala berfitur). Kedua klip DITOLAK.
  - Fakta: kulit natural bertekstur + wajah yang mendekati kamera dalam video membuat VideoExpress memahat fitur wajah (pola sama dengan Qabil-Habil gaya realistis). "Tripod/berhenti di jarak medium" diabaikan.
  - Perbaikan yang sudah dipasang: kalimat tulang wajah diganti "front of the face is one rounded continuous surface, no eye sockets, no nose bump, no lip line" (hanya di prompt gambar); baris tekstur dibuang dari prompt video.
  - Usulan uji berikut, tanpa menghindari wajah: close-up dibuat lewat **First Frame, Last Frame**, dengan frame awal dan akhir sama-sama gambar wajah polos yang sudah lolos, supaya VideoExpress terkunci di antaranya. Pergerakan tokoh mendekat kamera dipecah: wide lalu cut ke close-up (gambar awal close-up sendiri), bukan berjalan masuk close-up dalam satu klip.
- **First Frame, Last Frame (2026-11-22)**:
  - **Mode dialog (frame dibuat di dialog) DITOLAK**: dialog memakai "Reference Photo Type: Human", sehingga frame akhir berwajah realistis lengkap, dan gerbang QC gambar tidak bisa memeriksa frame dialog. Runner juga salah membaca "Last Image tidak muncul": gambar sebenarnya sudah ada; deteksi memakai jumlah img, padahal frame diganti di tempat. BELUM diperbaiki.
  - **Mode library (owner: "photo 1 as first frame, photo 2 as last frame") SUDAH DIPASANG di runner**: shot `tool: first_last` + `first_image` + `last_image` (+ `frame_folder`, bawaan My AI Images) memilih kedua frame lewat tombol "First/Last Frame from Library (beta)", lalu Create Video. Kedua gambar wajib lolos QC wajah + cek mata dulu. Validasi `plan` lolos. **Belum diuji live** karena belum ada pasangan Photo 1/Photo 2 yang lolos.
  - Mencari Photo 1/2:
    - VideoExpress + ACU satu figur selalu menghasilkan badan penuh (menyalin pose acuan) walau prompt minta medium/close, dan orang latar berwajah;
    - Artistly tanpa preset menghasilkan proporsi anak dan framing tidak close, serta satu kandidat bergaris alis;
    - Artistly dengan preset `kisah-3d-realistis` memberi proporsi dewasa (lembar).
  - Rencana: Photo 1/2 dibuat di Artistly DENGAN preset `kisah-3d-realistis` + blok wajah standar + "adult man, head one seventh of body height", lalu impor dan pakai di mode library.
- **Bug `unduh-vx.mjs` (DIPERBAIKI)**: label SHOT11 cocok ke SHOT110 (startsWith), sehingga klip salah terunduh. Kini label harus utuh.
- **TEROBOSAN 2026-11-22: CLOSE-UP TANPA FITUR WAJAH = First Frame, Last Frame DARI LIBRARY** (`fl-preset/klip/PC01U6-SHOT01.mp4`, 7 detik):
  - Photo 1 = full shot pelanggan, Photo 2 = close-up dada ke atas. Keduanya Artistly preset `kisah-3d-realistis` + blok wajah standar, lolos QC dan cek mata, lalu diimpor.
  - Hasil: kamera bergerak mulus dari full shot ke close-up tanpa jump cut, wajah tetap polos dengan tone kulit menyatu sampai close-up. **QC wajah LULUS (0 kepala berfitur).**
  - Kontras: klip Create Video biasa dengan tokoh mendekat kamera memunculkan bibir, rongga mata, dan titik merah dahi.
  - Catatan: satu pejalan kaki berbaju putih (tampak belakang, tanpa wajah) masuk di latar. Tulis "nobody else enters the frame" di prompt video. ID job tidak terbaca di mode library, tapi klip tetap jadi (unduh lewat label).
  - **ATURAN**: setiap shot yang mendekat ke wajah (push-in, wide ke close, tokoh menoleh ke kamera) dibuat dengan `tool: first_last` + `first_image` + `last_image` dari gambar yang sudah lolos QC. Create Video biasa hanya untuk gerak yang tidak membawa wajah ke close-up.
### 2c. Adegan ramai: tokoh utama + kelompok figuran (owner 2026-11-22)
- Reference Photo 1 = lembar tokoh utama. Reference Photo 2 = foto kelompok figuran (`<PREFIX>_GRP_<KEY>`), dibuat Artistly dari `paket.figuran.<KEY>`: 3-6 orang, masing-masing didefinisikan sendiri, wajah polos, berdiri wajar di studio.
- Image prompt (`aturanGrup`) menyebut jumlah pasti ("Exactly N people in the whole frame"): tokoh utama digambar sekali sebagai fokus, figuran yang sama ditempatkan di sekitarnya dengan aksi sehari-hari masing-masing, tanpa berpose.
- Video prompt: figuran tetap di tempat, aksi kecil dengan ritme masing-masing, tidak serempak.
- Hasil render 2026-11-22 (SHOT10 pasar, 2 kandidat): figuran sama persis dengan foto kelompok (baju, tubuh, kerudung, sepatu bot) dan semua wajah polos; tokoh utama berbaur (kandidat 1 tepat 5 orang). Masalah: semua berdiri berbaris menghadap kamera seperti foto bersama, karena tata letak foto kelompok ikut disalin. Kandidat 2 menggandakan tokoh utama (6 orang). Perbaikan berikut: foto kelompok dibuat candid (tiap orang sedang beraktivitas, tersebar, tidak berbaris), dan prompt adegan menulis posisi + aksi tiap figuran (siapa di kios mana melakukan apa).

## 3. Bahasa kamera (shot grammar)Kunci `kamera` di storyboard (adapter `paket-kisah.mjs` KAMERA):

| Kunci | Fungsi cerita | Frame + gerak |
|---|---|---|
| `establishing` | memberi tahu "di mana" | eksterior fasad + jalan, dolly samping |
| `drone` | skala, pembuka babak, klimaks | aerial, maju sambil tilt down |
| `wide` | ruang dan posisi tokoh | eye level, kedalaman depan/tengah/belakang |
| `medium` | aksi dan bahasa tubuh | tiga perempat depan, pinggang ke atas |
| `ots` | hubungan dua tokoh | dari bahu A ke B yang menghadap kamera |
| `close` | emosi lewat postur, kepala, bahu | dada ke atas, DOF dangkal, push-in |
| `insert` | benda kunci (amplop, piring, koin) | tangan + benda, badan buram di latar |
| `low` | kuasa, gagah, ancaman | dari bawah ke atas |
| `high` | kecil, rapuh, terdesak | dari atas ke bawah |
| `tracking` | perjalanan | menyamping, arah jalan = arah hadap |

Aturan:
- Setiap shot punya fungsi cerita. Shot tanpa fungsi dibuang.
- Setiap lokasi baru dibuka `establishing`, `drone`, atau `wide`. Tidak boleh 3 shot berturut-turut dengan kamera sama (`cek` memperingatkan).
- Satu klip memakai satu gerak kamera, satu aksi tokoh, dan satu gerak lingkungan. Gerak kamera harus mungkin secara fisik.
- **Aturan potong:**
  - Antar-shot: ukuran shot berubah minimal satu tingkat, dan sudut berubah minimal 30°.
  - Jaga aturan 180° (tokoh A selalu di kiri layar dalam satu adegan) dan arah layar (pergi ke kanan, datang dari kiri).
- Vertikal 9:16 bukan potongan dari 16:9: susun dalam kedalaman, subjek besar di frame.
- Cahaya: arah key light disebut dan sama dalam satu adegan. Malam memakai cahaya praktis (lampu, lentera) sebagai motivasi.

## 4. Arsitektur dan lokasi harus terbaca
- Lokasi ditulis seperti production designer: jenis bangunan, era, fasad, atap, pintu/etalase, bahan dinding dan lantai, jalan di depannya, serta interior pembeda.
  - **Toko**: rak barang penuh, etalase kaca, meja kasir, timbangan, karung beras, papan nama polos tanpa huruf.
  - **Rumah**: ruang tamu, dapur.
- Buat establishing eksterior dulu, lalu interior. Penonton harus tahu di mana tokoh berada dalam 2 detik.
- Acuan lokasi (VideoExpress `lokasi`) dibuat dari sudut establishing, lalu dicek mata: apakah terbaca sebagai toko, rumah, atau masjid?

## 5. Hook visual (0-3 detik)
- Klip klimaks paling dramatis: sudut kuat (`low`, `drone`, `close`, `insert`), gerak jelas, cahaya kontras, ditambah kalimat pelajaran dan teks besar (aturan HOOK 2 DETIK).
- Dilarang membuka dengan punggung statis, ruang gelap, atau kartu diam.
- Uji diri sebelum render: "Kalau saya scroll FB/YouTube, apakah frame pertama ini membuat saya berhenti?" Jawaban "tidak" berarti ganti shot.

## 6. Transisi halus, tanpa jump cut (VideoExpress)
1. **SAMBUNG / LAST_FRAME** (`"sambung": true`): dipakai saat aksi berlanjut di tempat, waktu, dan sisi kamera yang sama. Adapter mengisi `start: LAST_FRAME from` shot sebelumnya dan `save_last_frame: true`, dengan prompt "continue directly from the start frame".
   - Rantai sambung harus dalam satu kelompok run.
   - Maksimal 3 sambungan, lalu jangkar acuan baru.
   - Periksa frame terakhir: frame buram berarti pilih frame lebih awal (SCENE_WORKFLOW).
2. **First Frame, Last Frame** (`tool: first_last` di runner): dipakai untuk perubahan di dalam satu klip, misalnya tokoh berbalik, kamera dari wide ke close, atau pintu terbuka sampai interior terlihat.
   - Kedua frame harus kompatibel: subjek, rasio, dan geometri ruang sama.
   - Tulis satu transformasi kontinu dan easing-nya.
   - Tonton seluruh klip untuk memeriksa "patahan" menjelang frame akhir.
3. **Match cut**: rancang frame akhir shot A dan frame awal shot B bersamaan, misalnya bentuk, gerak, atau arah yang sama (piring berputar menjadi bulan).
4. **Multi-shot kamera VideoExpress**: BELUM DIPETAKAN. Sebelum dipakai, jalankan peta read-only (`jota-runner-uji mode=peta`) lalu uji satu klip kecil. Catat di `skills/videoexpress-runner/SKILL.md` dengan kode kejadian. Jangan menebak tombol.

## 7. Cerita menentukan durasi
- Rumus: HOOK → SETUP → CONFLICT → CLIMAX → RESOLUTION → MORAL. Konflik naik minimal 3 tahap.
- Beri ruang napas: adegan reaksi, akibat, dan establishing. Satu shot maksimal 16 kata narasi; lebih dari 26 kata ditandai buru-buru oleh `cek`.
- Long-form 8-12 menit dan Shorts 30-60 detik (STRATEGI_KONTEN_KANG_OHAN.md). Paket yang terlalu tipis dikembalikan untuk dikembangkan, tidak dipadatkan.
- Penambahan materi = penjelasan sejarah, latar, atau tafsir bersumber (FAKTA), bukan karangan.

## 8. Gerbang kualitas visual (sebelum klip dirender)
Agen melihat lembar tinjau setiap kelompok dan menjawab:
1. Apakah frame shot 1 punya hook?
2. Apakah lokasi terbaca dari arsitekturnya?
3. Apakah ukuran dan sudut shot bervariasi dan sesuai fungsi cerita?
4. Apakah wajah polos terlihat wajar (bukan oval tempelan)?
5. Apakah arah cahaya dan arah layar konsisten?
6. Apakah ada sambungan yang seharusnya LAST_FRAME?
7. Apakah gambar awal sudah di posisi aksi (tokoh di tepi air bila akan mencelupkan; kepala faceless terlihat bila tokoh akan bergerak)?
8. Apakah benda kunci berukuran baku dan masuk akal menurut cerita (peti bayi cukup besar, ukurannya sama di semua shot)?
9. Apakah skala lokasi nyata benar (Sungai Nil sangat lebar, bukan kali)?
10. Apakah busana sesuai syariat dan tokoh (aurat tertutup, usia terlihat sesuai)?
11. Apakah ada momen emosi yang membuat penonton ikut merasa (persiapan, ragu, melepas), bukan hanya perpindahan tempat?
12. Apakah hukum alam dan sifat benda terjaga (owner 2026-11-22: "jangan tiba-tiba benda yang dipegang jadi menciut dan hilang")? Benda tidak berubah ukuran, bentuk, warna, jumlah, atau posisi tanpa sebab; yang dipegang tetap di tangan; air mengalir, benda jatuh ke bawah; tokoh tidak berubah sifat, busana, atau proporsi. Prompt video wajib memuat OBJECT LOCK; strip gerak klip diperiksa untuk benda yang menciut/hilang.

Jawaban "tidak" berarti perbaiki sebelum render. Semua butir 7-11 berasal dari koreksi owner pada Ibu Musa REV4 (2026-11-22). Owner menilai sebagai PENONTON; tujuan utama penonton subscribe dan terus menonton, jadi tiap koreksi owner langsung dijadikan butir gerbang ini. Lolos QC faceless BUKAN berarti lolos produksi.

## 9. Riset skill harian (owner 2026-11-22 "setiap hari wajib cari skill di github")
- Setiap sesi kerja: cari skill atau referensi sinematografi AI video terbaru di GitHub (kata kunci: cinematography skill, AI video director, storyboard skill, first last frame, multi-shot), baca, ambil prinsip yang terbukti, lalu tulis di sini dengan tanggal dan sumber. Jangan menyalin teks panjang; cek lisensi. Setelah itu push mirror skill.
- Riset 2026-11-22:
  - `wuwangzhang1216/DirectorSKILL` (MIT): fungsi shot; anggaran gerak 1-1-1; aturan potong 30°; match cut lewat desain frame akhir/awal; template motion-only dan first/last.
  - `aicontentskills/ai-video-storyboard-skill` (MIT): lapisan konsistensi visual bersama (palet, cahaya, lensa).
  - `fal-ai-community/skills` cinematography: kosakata lensa, gerak, dan cahaya, dengan urutan prompt subject, context, lens/framing, camera motion, atmosphere, mood/colour.
  - Panduan first/last frame magichour.ai: frame kompatibel, pisahkan perubahan cahaya dari perubahan tata letak, periksa patahan menjelang frame akhir.
- Riset 2026-11-22 (malam, owner: "rajin cek skill di github ... monetize ... hilangkan keanehan, hukum alam, benda jangan menciut/hilang"). Hanya referensi, tidak diunduh atau dipasang:
  - `ultimatech-cn/recreate-video-prompt-skill`: pisahkan kontrol identitas dari kontrol gerak; tulis mekanika kontak dan lintasan benda secara eksplisit.
  - `MTDickens/VideoCoCo`: rencanakan keadaan fisik dulu (posisi, kontak, gravitasi) sebelum prompt video; JOTA memakai versi ringan: gambar awal di posisi aksi + OBJECT LOCK.
  - `Eric-Lautanen/seamless-ai-video-prompt-template`: subject lock + serah terima frame terakhir (sama dengan sambung/LAST_FRAME JOTA).
  - `nexploreinfo/ai-video-prompt-engineering-guide`: cek kontinuitas posisi dan proporsi benda antar shot.
  - Monetisasi/retensi (bahan riset, angka CPM/RPM tidak diverifikasi): `AgriciDaniel/claude-youtube` (naskah retensi dengan pattern interrupt tiap 60-90 detik, paket Shorts dengan loop), `jakeschincariol/youtube-agent-skill` (21 formula hook, pembaca retensi dari ekspor analitik), `yaxeen/storytelling-skills` (tuas psikologi cerita, audit grafik retensi).
  - Diterapkan: OBJECT LOCK di setiap prompt video `paket-kisah.mjs` (ukuran, bentuk, warna, jumlah tetap; benda yang dipegang tetap padat, ikut tangan, patuh gravitasi; tidak menciut, membesar, bengkok, meleleh, muncul, atau hilang) dan ukuran nyata relatif tubuh + gravitasi di prompt gambar.
