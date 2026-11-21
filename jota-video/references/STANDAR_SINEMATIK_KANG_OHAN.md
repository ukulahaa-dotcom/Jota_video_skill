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
- Lembar karakter WAJIB empat sudut: depan, tiga perempat depan, samping, belakang (`pemeran.mjs skripLembar`). Wajah polos harus terlihat jelas di sudut depan.
- Bila QC menemukan wajah: perbaiki penyebabnya. Urutannya:
  1. lembar acuan;
  2. gambar awal (pilih kandidat lain);
  3. prompt (FACELESS LOCK);
  4. render ulang.
- Mengganti sudut kamera menjadi punggung demi lolos QC DILARANG. Bila tetap gagal setelah perbaikan, laporkan ke owner dengan bukti frame.

## 3. Bahasa kamera (shot grammar)
Kunci `kamera` di storyboard (adapter `paket-kisah.mjs` KAMERA):

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

Jawaban "tidak" berarti perbaiki sebelum render. Lolos QC faceless BUKAN berarti lolos produksi.

## 9. Riset skill harian (owner 2026-11-22 "setiap hari wajib cari skill di github")
- Setiap sesi kerja: cari skill atau referensi sinematografi AI video terbaru di GitHub (kata kunci: cinematography skill, AI video director, storyboard skill, first last frame, multi-shot), baca, ambil prinsip yang terbukti, lalu tulis di sini dengan tanggal dan sumber. Jangan menyalin teks panjang; cek lisensi. Setelah itu push mirror skill.
- Riset 2026-11-22:
  - `wuwangzhang1216/DirectorSKILL` (MIT): fungsi shot; anggaran gerak 1-1-1; aturan potong 30°; match cut lewat desain frame akhir/awal; template motion-only dan first/last.
  - `aicontentskills/ai-video-storyboard-skill` (MIT): lapisan konsistensi visual bersama (palet, cahaya, lensa).
  - `fal-ai-community/skills` cinematography: kosakata lensa, gerak, dan cahaya, dengan urutan prompt subject, context, lens/framing, camera motion, atmosphere, mood/colour.
  - Panduan first/last frame magichour.ai: frame kompatibel, pisahkan perubahan cahaya dari perubahan tata letak, periksa patahan menjelang frame akhir.
