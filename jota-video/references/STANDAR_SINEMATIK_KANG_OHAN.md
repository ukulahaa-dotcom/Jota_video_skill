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
7. Tokoh tidak berbicara atau tertawa di prompt VideoExpress (mulut muncul). Dialog = gestur + audio CloneVoice (Mac 2026-11-26; dulu ElevenLabs), satu pembicara per shot.
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

### 2d. Rambut wajib, bukan kepala botak licin (owner 2026-11-28 "kepalanya kenapa botak semua?")
- Faceless + kepala botak licin terlihat seperti manekin. Setiap tokoh wajib punya rambut nyata yang ditulis per orang (keriting, lurus, ikal, uban, cepak) atau kain penutup kepala; tulis juga "nobody has a smooth shiny bald head".
- Bila sejarah menuntut kepala dicukur (misal pendeta Mesir kuno), wujudkan sebagai cepak/tunggul rambut bertekstur dan campur dengan kain penutup; jangan semua orang sama.
- Prompt VideoExpress mengunci rambut: "hair exactly as in the start image".

### 2e. Multi-shot jangan membuat close-up kepala (fakta QC 2026-11-28, Piramida K3)
- Beat close-up/medium yang dikarang VideoExpress di dalam multi-shot (CUT TO) memunculkan WAJAH ASLI (mata, hidung, mulut) pada tokoh faceless: 17M pendeta (7/18 kepala), 20M pekerja memegang tali (3/33). Klip lebar dari gambar awal yang sama tetap faceless.
- Aturan: beat multi-shot untuk adegan berorang hanya boleh benda/tangan/kaki tanpa kepala (kereta luncur, asap, tali di tanah) atau tetap sejauh gambar awal. Close-up kepala hanya dari gambar awal Artistly sendiri yang sudah lolos QC.
- Beat yang memunculkan wajah dibuang di rakit (titik potong dari scdet), bukan disamarkan.

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
4. **Klip lanjutan supaya narasi panjang tidak membekukan gambar** (Piramida EP01, 2026-11-26, owner "sesuaikan dengan narasi... penonton mengerti"):
   - Narasi tetap utuh; video yang menyesuaikan dengan klip lanjutan LAST_FRAME. Perlambatan maksimal sekitar 1,12x (pengecualian 1,25x untuk drone yang bergerak pelan); frame beku hanya jaring pengaman dan dilaporkan.
   - Runner hanya menerima id `SHOTnn` (angka). Label seperti 01R/01B dinomori ulang di proyek tersendiri, dan `label.json` dipakai untuk mengganti nama hasil unduhan.
   - `impor-artistly` hanya bisa mengambil gambar yang memang ada di Artistly. Frame lokal atau gambar hasil retouch tidak bisa diunggah, jadi lanjutan wajib memakai LAST_FRAME.
   - HASIL CEK MATA: lanjutan yang terus mendorong kamera mendekat ke tekstur batu berhalusinasi (pintu berlipat, batu meleleh, piramida muncul di rongga, jumlah piramida berubah), padahal QC otomatis meluluskan semua.
     - Prompt lanjutan yang aman: "the camera hovers almost still at the same distance and drifts very slowly ...; X stays exactly one / unchanged".
     - Klip dipotong sampai sebelum tekstur meleleh. Pilih klip terbaik dari beberapa take; jangan sambung otomatis.
   - Bila klip tetap kurang dan kalimat narasi menunjuk sesuatu ("dua lubang kecil: pintu asli di atas, terowongan di bawah"), sisipkan gerak kamera pelan pada gambar storyboard dengan label deterministik. Ini membantu penonton paham dan tidak terlihat seperti gambar diam.
   - Referensi owner 2026-11-27 (infografis "VideoExpress 3.5 Master Prompt", buatan AI Gemini Notebook; teksnya banyak rusak, jadi klaimnya DUGAAN sampai diuji). Yang diambil karena cocok dengan hasil cek mata:
     - Prompt disusun berlapis: framing → subjek → aksi → cahaya → dinamika lingkungan → (audio: JOTA tanpa musik) → **KEADAAN AKHIR**.
     - Setiap gerak kamera wajib memakai kata **kecepatan eksplisit** (slow, unhurried, drifts very slowly).
     - Cacat dicegah dengan **kalimat positif** ("every stone edge stays crisp and sharply in focus") daripada daftar larangan yang panjang.
     - Kode: `shots-piramida-ep01.mjs` (END STATE per shot + baris TAJAM), dengan panjang prompt sekitar 900 karakter.
   - **MULTI-SHOT TERBUKTI (uji 2026-11-27, `film/uji-multishot`, gambar Khufu PIR01_08N, klip 6 dtk):**
     - Kedua format menghasilkan 3 shot wide → medium → close-up dalam satu klip. Deteksi ffmpeg `scene>0.3` menemukan potongan di 1,5/4,0 dtk (A) dan 1,75/3,75 dtk (B), dan strip frame cocok.
     - Format A: `[Multi-Shot] Beat 1 (0 to 2s): WIDE SHOT ... Beat 2 (2 to 4s): MEDIUM SHOT, internal cut ... Beat 3 (4 to 6s): CLOSE-UP, internal cut ...`.
     - Format B: `Three shots in one video with hard cuts. (0 to 2s) wide ... CUT TO (2 to 4s) medium ... CUT TO (4 to 6s) close-up ...`.
     - B lebih konsisten: tekstur close-up tetap batu lapuk dan warnanya sama. Pada A, close-up menjadi balok mulus dan warna medium lebih gelap.
     - Tag `[Multi-Shot]` tidak diperlukan.
     - Batasan:
       - Validator runner MENOLAK timestamp berbentuk `0-2s`; tulis `(0 to 2s)`.
       - Potongan tidak persis di detik yang ditulis (±0,5 dtk).
       - Gerak di dalam tiap beat hampir diam. Bila butuh gerak, tulis satu gerak pelan per beat.
       - Klip tetap sekitar 6 dtk karena durasi otomatis VideoExpress, jadi maksimal sekitar 3 beat.
     - Kegunaan: pengganti klip lanjutan untuk shot dokumenter benda/tempat tanpa orang (wide → detail). Tokoh dan wajah belum diuji.
     - **Aturan owner 2026-11-27: pakai multi-shot sesuai kebutuhan adegan, jangan dipaksakan.**
       - Multi-shot dipakai saat narasi memperkenalkan lalu menunjuk detail, atau saat satu shot mencakup beberapa hal berurutan.
       - Gerak tunggal atau lanjutan LAST_FRAME dipakai untuk drone, tracking, reveal, suasana, dan adegan bertokoh.
   - BELUM diuji: flag `--no` dan tag [Camera Left/Right].
5. **Grafik dari referensi asli berlisensi** (owner: denah/peta "mengecil" → cari referensi bagus):
   - Pakai sumber vektor atau resolusi tinggi: SVG Wikimedia CC BY-SA dan foto NASA domain publik.
   - Hapus teks asli dari SVG, render ulang dengan Playwright msedge pada 3000-3600 px, lalu tambahkan label bahasa Indonesia, gerak kamera, dan kredit lisensi di layar.
   - Unduhan wajib izin owner dan dicatat di `MANIFEST-REFERENSI.json`.
6. **Multi-shot kamera VideoExpress**: lewat prompt teks sudah terbukti (butir 4). Tombol atau mode multi-shot di UI belum dipetakan; jangan menebak tombol.
7. **Pelajaran produksi 2026-11-27 (Piramida kelompok 2):**
   - **Artistly bisa bergeser satu job.** Gambar yang diambil terlambat berisi hasil job SEBELUMNYA, jadi isi folder tidak sesuai nama folder.
     - Pilih gambar menurut ISI (lihat dengan mata), bukan menurut nama folder.
     - Jangan hapus folder gambar sebelum isinya dicek; pindahkan ke folder `-tergeser` saja.
   - **Gerbang HDT runner juga berlaku untuk shot dokumenter bertokoh** (`people:'yes'`).
     - Wajib ada `CHARACTER A: role: ...`. Untuk kerumunan, tulis satu peran kelompok dengan `REAL PEOPLE, NOT CLONES`.
     - Wajib ada blok `PERFORMANCE (real-time speed, ...)` sebelum `ENVIRONMENT:`, tanpa kata lambat (slow, gently drift) dan tanpa kata serempak.
     - Kata lambat untuk KAMERA boleh di luar blok PERFORMANCE.
     - Prompt natural bertokoh juga wajib, di awal prompt setelah baris aksi:
       - kalimat "faceless for the entire video";
       - kunci busana "... stay exactly as in the start image for the entire video";
       - kata rambut atau penutup kepala (hair/headdress).
     - Cek dulu SECARA OFFLINE sebelum `run`, supaya tidak gagal di tengah antrean:
       - `cekShotsFile` dari `prompt-hdt.mjs`;
       - `validate` dari `videoexpress-runner/runner.mjs` (boleh di-import; runner hanya jalan bila dipanggil langsung).
   - **ENVIRONMENT per shot harus sesuai zaman.** Shot rekonstruksi 2560 SM tidak boleh membawa ENV "today"; museum punya ENV sendiri.
   - **Label layar kecil** "Rekonstruksi" atau "Ilustrasi" pada gambar masa lalu dan benda yang bukan foto asli, supaya penonton tidak mengira itu rekaman nyata.
8. **FATAL sambungan (owner 2026-11-27: "perahu tadinya maju tiba-tiba mundur, ada yang ga smooth kayak jump cut"):**
   - **Penyebab.** Varian klip (R, B, M) dari gambar awal yang SAMA disambung langsung. Klip kedua mulai lagi dari posisi awal, jadi adegan melompat balik: perahu terlihat mundur, raja melompat, piramida mengulang.
   - **LAST_FRAME VideoExpress tidak selalu cocok, jadi ukur, jangan menebak.** Terbukti 2026-11-27 dengan `cek-lompat.py`: 10B dan 11B adalah lanjutan asli 10R dan 11R (kemiripan 1,00), sedangkan 14B tidak. Lanjutan yang cocok WAJIB langsung setelah induknya (R → B). Kesalahan v2: B diletakkan setelah M, sehingga patung dan piramida mundur lalu maju (owner: "loncat-loncat, bolak-balik").
   - **PNG lokal tidak bisa jadi gambar awal.** `impor-artistly` hanya memilih gambar yang sudah ada di Artistly (gagal untuk 1b dan 2c).
   - **Panjang 10 detik diabaikan VideoExpress.** Klip tetap keluar 6 detik (terbukti 12X/14X). Jangan rencanakan klip di atas 6 detik.
   - **Aturan potong di skrip rakit.** Dua klip boleh disambung hanya bila:
     - (a) lanjutan dari frame terakhir yang benar-benar cocok (cek frame pertama vs terakhir dengan mata), atau
     - (b) ukuran atau sudut shot jelas berbeda: lebar → dekat → sudut lain. Klip lebar kedua boleh masuk setelah shot dekat, tidak boleh langsung setelah klip lebar pertama.
   - **Beat lebar pembuka multi-shot dibuang** bila klip R dari gambar yang sama sudah dipakai. Titik potong diambil dari potongan internal yang terdeteksi (`cek-lompat.py <klip>` atau `scdet`), bukan angka tebakan. Contoh: 14M memotong di 1,1 dtk, 13M melarut di 2,6 dtk, 11M memotong di 2,3 dtk. Sisa 0,2 dtk beat lebar saja sudah terlihat sebagai kedipan bolak-balik.
   - **Gambar lebar yang sama boleh muncul lagi** hanya setelah sisipan dekat (lebar → dekat → dekat → lebar), dan harus diambil dari detik yang tidak menyerupai frame mana pun dalam 10 detik terakhir.
   - **Arah gerak harus sama antar klip.** Perahu ke kanan tetap ke kanan. Klip yang subjeknya menjauh atau berbalik arah dibuang.
   - **GERBANG OTOMATIS WAJIB: `apps/artistly-runner/cek-lompat.py <video.mp4> --lembar <folder>`** (salinan ada di `jota-video/scripts/`). Tanpa API, kurang dari 10 detik. Video dibaca 10 fps, lalu tiap potongan dinilai:
     - BOLAK-BALIK: frame sesudah potongan mirip frame yang sudah tampil 0,8 sampai 10 detik sebelumnya.
     - JUMP-CUT: komposisi dan bentuk benda (peta tepi) sama, tapi melompat.
     - BERSIH: berpindah ke ukuran atau sudut yang jelas berbeda.
     Gerak cepat di dalam klip (sabit, dayung) tidak dihitung. Kode keluar 1 = video DILARANG dikirim. Skrip rakit menjalankannya di akhir (`CEK-LOMPAT LULUS/GAGAL`).
   - **FATAL gerak halus (owner 2026-11-27: "patung dalam kaca ga smooth, patah-patah"):**
     - Klip VideoExpress 24 fps. Kalau diubah ke 25 fps dengan `fps=25` lalu diperlambat dengan `setpts`, frame-nya digandakan. Kamera jadi tersendat 2-4 kali per detik (terukur 66 detik tersendat di v3).
     - Aturan rakit: normalisasi ke 24 fps. Perlambatan dan konversi ke 25 fps WAJIB lewat `minterpolate=fps=25:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1:scd=fdiff:scd_threshold=8`. Grafik deterministik cukup `fps=25`.
     - Video tiap segmen harus SAMA panjang dengan audionya, termasuk adelay narasi 0,3 dtk. Kalau video lebih pendek, `concat -c copy` membuat celah yang diisi frame beku sekitar 0,35 dtk di setiap pergantian shot.
     - Render dengan `minterpolate` lambat (sekitar 45 menit per 2 menit film). Jalankan kelompok secara paralel di latar belakang.
     - `cek-lompat.py` juga mengukur SENDATAN (frame dobel saat kamera bergerak). Tiga detik atau lebih yang tersendat 2x = GAGAL.
     - Satu objek diam (patung, prasasti) jangan dipotong-potong pada skala yang mirip (sedang → dekat → sedang). Pakai satu gerak kamera panjang (R → lanjutan B), satu sisipan dekat, lalu tutup dengan skala yang jelas berbeda.
   - **Susunan klip diuji dulu.** Rakit pratinjau kecil per segmen dengan beberapa urutan kandidat, lalu jalankan `cek-lompat` dan pilih yang BERSIH tanpa frame beku. Detektor tidak menangkap transisi larut (dissolve) di dalam satu klip, jadi tetap lihat strip 2 fps segmen bersama.

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
- Riset 2026-11-27 (kiriman owner): `ratava/videoexpress-scripting-skill` v2.8.0, khusus VideoExpress 3.5.
  - Lisensi CC BY-NC 4.0 (Brent Wesley). Channel dimonetisasi, jadi teksnya TIDAK disalin; hanya prinsip yang diambil, dengan sumber dicatat.
  - Klaim sumber yang COCOK dengan temuan JOTA sendiri:
    - Push-in yang memperbesar detail membuat VE menggambar ulang dari teks (JOTA: dorongan ke tekstur berhalusinasi). Mulai klip di framing terdekat; framing lebih dekat = klip baru.
    - Cek frame terakhir sebelum LAST_FRAME; frame buram atau bergeser ikut diwarisi.
    - Enhance OFF (runner JOTA sudah memaksa).
    - "Cinematic" ditambah isyarat cahaya atau asap memicu slow motion; tulis "real-time footage at natural speed".
  - Klaim sumber yang BARU dan langsung diterapkan di `shots-piramida-ep01.mjs`:
    - Larangan hanya bekerja di blok `NEGATIVES:` di ekor prompt, ditulis "No ...". Di bagian lain, "no X" bisa terbaca sebagai perintah memunculkan X. Kalimat di luar blok ditulis positif.
    - Klip satu gerakan: "No cuts." Klip multi-shot: "No cuts other than the hard cuts described."
    - Kata "real-time footage at natural speed" ditambahkan di baris SPEED.
  - Klaim sumber yang BELUM diuji JOTA (status DUGAAN sampai dibuktikan):
    - Panjang klip 3-10 dtk bisa diatur per generasi. Runner JOTA menerima 3-10, tapi selama ini dipakai 6. Uji satu klip 10 dtk; bila terbukti, klip lanjutan berkurang dan BEKU makin jarang.
    - Kamera "locked-off" masih bisa melayang (bug VE yang diakui). Bila terjadi, render ulang, jangan ubah kalimat.
    - Suara per segmen waktu. Tidak penting untuk JOTA karena audio klip diganti narasi CloneVoice.
    - Baris SOUND `prompt-hdt.mjs` memuat "no music, no voices" di luar NEGATIVES. Dampaknya kecil karena audio klip tidak dipakai; pindahkan bila nanti audio klip dipakai.


## Gaya campuran dokumenter
- **Gaya campuran dokumenter** (owner 2026-11-26, Piramida EP01): fakta masa kini = foto dokumenter super realistis; rekonstruksi masa lalu = 3D realistis sinematik (manusia faceless); peta, penampang, ukuran, dan teks = grafik deterministik dari sumber, bukan AI. Gaya membedakan FAKTA dan ILUSTRASI tanpa perlu dijelaskan.
