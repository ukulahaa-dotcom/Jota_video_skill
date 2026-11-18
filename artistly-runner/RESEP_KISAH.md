# RESEP KISAH: Artistly + QC lokal + VideoExpress (standar emas JOTA)

Owner 2026-11-16: "workflow artistly + videoexpress dahsyat ... saya jadikan contoh yang hebat untuk diikuti kisah-kisah lainnya. Target monetize di YouTube, Facebook dan Instagram."
Contoh acuan: **Kisah Qarun** (`gpt/artistly/KISAH-QARUN-20261116` + `gpt/productions/KISAH-QARUN-VX-20261116`), 93 detik, 9:16, 11 adegan.
Hasil acuan di Drive: `2. Artistly JOTA/Kisah Qarun 20261116/Kisah Qarun (VideoExpress).mp4`.

Kenapa resep ini dipakai: Artistly menjaga konsistensi tokoh dan baju (gambar diam), QC lokal menyaring gambar tanpa token, VideoExpress hanya menggerakkan gambar yang sudah lolos (bukan membuat tokoh dari nol), lalu narasi dan caption dirakit lokal.

## FATAL OWNER 2026-11-18 (Ashabul Kahfi): PROMPT KLIP WAJIB FORMAT HDT-JOTA
Teguran owner: pemuda berbaris dan melangkah sama persis, mengangkat tangan serempak seperti pramuka; gerak terasa slow motion; koin di tangan tidak bulat. "Fatal, dont do it again." Fakta di `buat-shots.mjs` lama: aturan kelompok cuma satu baris umum (`KELOMPOK`), ACTION satu kalimat untuk semua orang, kata "slow/slowly" muncul di ACTION/CAMERA banyak adegan, benda tidak dideskripsikan, komposisi `perlambat_maks: 1.0` (tidak diperlambat saat rakit). DUGAAN (belum dibuktikan): slow motion berasal dari kata "slowly" di prompt atau bawaan VideoExpress; buktikan dengan membandingkan render ulang prompt HDT.
- Semua prompt klip disusun dengan `apps/artistly-runner/prompt-hdt.mjs` `promptHDT()` (diadaptasi dari Hollywood Director Template milik owner). Isinya:
  - **SPEED 1x**: real-time, bukan slow motion.
  - **CAMERA lengkap**: framing, lensa, gerak, fokus, tujuan.
  - **PERFORMANCE per tokoh**: setiap tokoh diberi huruf A/B/C dengan posisi dan pakaian pembeda. Gerak bernomor (maks 3) memakai detik mulai-selesai. Setiap gerak menyebut bagian tubuh, arah, jarak; mulai di detik berbeda (selisih 0.3-1.0 detik) dan aksinya berbeda.
  - **Orang latar**: diam atau aksi kecil yang tidak sama.
  - **PROP LOCK**: setiap benda yang dilihat penonton ditulis bentuk, ukuran, bahan, warna, jumlah, cara dipegang. Contoh koin: "exactly three small perfectly round flat silver discs, about 2 cm wide".
- `promptHDT` menolak hal-hal berikut:
  - kata slow/slowly/slow motion/dreamy di gerak tokoh;
  - kata in unison/march/in step;
  - dua tokoh dengan gerak sama atau mulai di detik sama;
  - gerak di bawah 1.2 detik atau kurang dari 6 kata;
  - benda (coin, sword, bread, cup, lamp, dll.) tanpa PROP LOCK berbentuk.
- `jalankan-vx.mjs run` memeriksa ulang shots.json: prompt tanpa SPEED/PERFORMANCE atau berisi kata lambat/serempak -> BERHENTI (exit 3). Gerbang ini **tidak bisa dilewati `--paksa`**.
- Faceless tetap: akting lewat postur, tangan, langkah, bahu; tanpa ekspresi wajah, lip-sync, atau dialog. Kamera mendekat (push-in) ke orang di latar: terbukti memunculkan wajah (Ashabul Kahfi R1 adegan 8 dan 24, mata anjing adegan 16; lihat juga CROWD LOCK Firaun), jadi kamera diam/jauh. Crash zoom dan dolly zoom BELUM pernah diuji; tidak ada data, jangan dianggap aman atau terlarang sebelum dicoba.

## KEPUTUSAN OWNER TERBARU (2026-11-16 malam, menggantikan aturan lama yang bertentangan)
- **Durasi standar 3 menit**, sekitar 22 adegan, narasi lebih pelan (speed 0.9), ada jeda emosi; hook, pengenalan, konflik, klimaks, akibat, hikmah + ayat.
- **Semua adegan bergerak di VideoExpress.** Gambar diam tidak dipakai lagi sebagai pengganti. Kerumunan dibuat klip VideoExpress tetapi **berdiri di tempat** (jubah, obor, debu, kamera yang bergerak; tidak berjalan), supaya tidak ada kepala terbalik. Bila QC/agen menemukan cacat: render ulang klip itu di VideoExpress dengan prompt lebih ketat (VideoExpress unlimited), bukan diganti gambar diam.
- **ARAHAN OWNER 2026-11-17 (menggantikan aturan "berdiri di tempat" di atas):** jangan mengurangi atau mendiamkan gerakan demi aman. Perbaiki prompt geraknya (arah badan = arah jalan, kamera dari depan-samping tokoh yang berjalan, satu aksi jelas per klip), lalu QC strip frame dan render ulang bila cacat. Gerak natural kecepatan 1x: jangan menulis "slow" di prompt dan jangan memperlambat klip. Setiap adegan punya hook. SFX natural berlapis tanpa musik. Pembuka: hook 2-3 detik, lalu teks emas "KANG OHAN PRESENTS" berkilau + dentuman sekitar 2 detik, baru judul. Hewan digambar TANPA MATA (hidung, mulut, telinga, bulu boleh). (Qabil-Habil adegan 5 sempat diganti berdiri sebelum arahan ini; jangan ditiru.)
- **Proporsi dan tangan** (owner 2026-11-17, Qabil-Habil): adegan 11 tangan 3, dan adegan chibi bercampur dengan adegan dewasa sehingga tinggi tokoh berubah-ubah (adegan 5, 9-12, 15 Qabil-Habil sudah diganti gambar `kisah-3d-dewasa`). Wajib: semua gambar tokoh satu video memakai preset `kisah-3d-dewasa`, deskripsi tokoh menyebut "same height" dan "exactly two arms and two hands", kamera adegan dua orang diam tanpa zoom. `produksi-gambar` menolak postur chibi otomatis (cek anatomi VLM). Tangan berlebih tidak tertangkap model 4B, jadi agen memeriksa strip frame.
- **Postur dewasa proporsional**: gaya `kisah-3d-dewasa` (komik-gaya.json; kepala sekitar 1/7 tinggi badan, bahu lebar, kaki panjang, bukan chibi/anak). `3d-animasi` hanya untuk komik anak. Qarun/Firaun/Nuh/Luth dan Qabil-Habil (owner: preset baru mulai video SETELAH Qabil) memakai `3d-animasi`; video sesudah Qabil-Habil wajib **`kisah-3d-boneka`** (owner 2026-11-17: 3D boneka, badan proporsional, kepala selalu tertutup kain, tidak botak). `kisah-3d-dewasa` (realistis) DILARANG: VideoExpress melengkapi wajah (Qabil-Habil SHOT12-R2 17/20 kepala berwajah). Aksi "menjawab/berbicara" juga dilarang di prompt VideoExpress karena memunculkan mulut; tulis "silent, nobody speaks". Kepala yang diangkat dari tangan juga memunculkan wajah: potong klip sebelum itu atau tulis aksi yang tidak mengangkat kepala.

- **HOOK 2 DETIK (data Facebook 2026-11-17, owner):** "Jangan sombong / Kisah Firaun" 3-second view rate 24.3%; retensi jatuh 41.6% -> 14.0% di detik 2-4 karena 0-2.5 detik pertama kartu judul buram diam dan pelajaran baru muncul di detik 3-8. 90% penonton bukan follower. Wajib:
  1. Detik 0-2: klip KLIMAKS yang bergerak + kalimat klimaks/pelajaran inti diucapkan narator di kata pertama + teks besar (`hook_teks` di kisah-vx.json, tampil 0-2.4 detik). Contoh: "Raja yang mengaku Tuhan, mati tenggelam di laut." Baru sesudahnya "Ini kisah Firaun."
  2. Tidak ada layar diam/buram di awal. Kartu judul diam dihapus: `judul_overlay` (default saat ada `intro`) menaruh judul di atas klip adegan 2 yang bergerak. Intro KANG OHAN PRESENTS 1.6 detik.
  3. Ukur: target video_view_rate (3 detik) di atas 30%.

## 0. Pilih kisah (aturan isi)
- Sumber jelas: ayat Al-Qur'an (surat:ayat) atau hadis sahih dengan nomor. Narasi = parafrase makna, bukan terjemahan resmi. **Ustadz memeriksa sebelum tayang.**
- Nabi, malaikat, hal gaib: tidak pernah digambarkan dan Nabi tidak diberi dialog. Cerita disampaikan lewat tokoh lain, latar, benda, atau adegan tanpa orang.
- Azab atau kekerasan: tunjukkan akibat (bangunan amblas, kota kosong), tanpa korban, darah, atau gore.
- Semua tokoh faceless. Janggut boleh (bentuk padat), tanpa kumis.

## 1. Naskah (`gpt/artistly/KISAH-<NAMA>-<TGL>/naskah.md`)
- Judul + hook 1 kalimat (adegan 1 harus memancing rasa ingin tahu dalam 3 detik pertama).
- CHARACTER LOCK per tokoh (umur tampak, tubuh, kulit, janggut, baju dan warnanya, penutup kepala) dan LOCATION LOCK.
- Tabel adegan: nomor, gambaran adegan, narasi, sumber ayat/hadis. 9-12 adegan, narasi 8-25 kata per adegan.
- Durasi: narator ElevenLabs sekitar 2.2 kata per detik. Target total 60-90 detik (Shorts, Reels, FB Reels).
- Penutup: hikmah 1-2 kalimat + sebut sumber.

## 2. Gambar Artistly + QC lokal (tanpa token)
- `naskah.json`: `"gaya"` (Qarun: `3d-animasi`), `kategori_v6: "Artistic Designer V2"`, satu `script` per adegan berisi `CHARACTERS:` (lock lengkap diulang setiap adegan) + `SCENE:` + `Exactly N people.` (untuk QC hitung orang).
- Adegan tanpa orang: `"tanpa_orang": true` + `No people.` (tanpa ini Artistly menggambar kerumunan figur botak).
- Hindari kata "superhero" dan kata yang memancing wajah (smile, laugh, look at camera).
- **Jangan menyebut benda yang tidak diinginkan, walau dengan "no ..."** (uji Kisah Nabi Nuh 2026-11-16: "No rainbow" malah memunculkan pelangi di 4 dari 4 gambar; setelah kata itu dihapus dan langit ditulis "soft overcast morning sky", pelangi hilang). Deskripsikan yang diinginkan saja. Pengecualian yang terbukti perlu: "no people / no figures" untuk `tanpa_orang`.
- Kapal Nabi Nuh: tulis "box-shaped wooden ark ... NO masts, NO sails" supaya tidak menjadi kapal layar berbendera.
- QC lokal tidak menilai benda (pelangi, patung, kapal salah bentuk): agen tetap melihat `tinjau-qc.jpg`.
- Jalankan: `node apps/artistly-runner/produksi-gambar.mjs <naskah.json>` (generate, QC, generate ulang otomatis maks 2 putaran).
- Agen hanya melihat `gambar/tinjau-qc.jpg` dan memeriksa gambar **CEK**. Waspadai figur aneh di kerumunan dan pekerja yang tampak seperti bayi (gaya 3D).

## 3. Klip VideoExpress dari gambar lolos
1. Impor tiap gambar pilihan (`qc.json` `pilih`): `node apps/artistly-runner/jalankan-vx.mjs impor-artistly <gambar/hal-NN-k.png> <TAG>_NN`.
   - **Impor dari adegan terakhir ke adegan pertama** (Qabil-Habil 2026-11-16: dengan 22 adegan dan folder My Artistly Images berisi puluhan gambar lama, QHBVX_01-02 yang diimpor paling awal tidak terjangkau picker runner, "tidak ditemukan"). Bila tetap gagal: impor ulang gambar itu lalu `run --only SHOTxx`.
2. `shots.json` (contoh generator: `gpt/productions/KISAH-QARUN-VX-20261116/buat-shots.mjs`): `tag` unik 3-10 huruf, `ratio 9:16`, `image_type 3d`, `enhance false`, tiap shot `start: {type: PAKAI_ULANG, image: <TAG>_NN, folder: "My Artistly Images"}`, `length` = panjang narasi adegan dibulatkan ke atas (3-10 detik), `people` yes/none, prompt disusun `promptHDT()` (MANDATORY RULES, SPEED, INDIVIDUAL PERFORMANCE, STYLE, CAMERA, PERFORMANCE per tokoh, PROP LOCK, VISUALS, SOUND, CONSISTENCY LOCK, AVOID); lihat bagian FATAL di atas.
   - ACTION adegan bicara/nasihat: tokoh **tetap di tempat sepanjang klip** (Qarun adegan 4: para tetua keluar frame setelah 2 detik).
   - Gerak sederhana dan lambat; kamera dorong/geser pelan; satu aksi utama per klip.
   - **GAYA STANDAR = `kisah-sinematik-natural` (owner 2026-11-18: "bagus kulitnya, ini yang saya mau")**: kulit manusia natural (sawo matang, tekstur dan pori halus, otot lengan/bahu/betis, urat di lengan bawah dan punggung tangan), bukan boneka/plastik/vinyl; wajah TETAP polos; kepala tertutup kain. Preset di `apps/artistly-runner/komik-gaya.json`, uji `gpt/artistly/UJI-KULIT-NATURAL-20261118`. Risiko: figuran kecil di latar ikut realistis dan bisa berwajah -> tulis "no other people in the background" bila adegan tidak butuh kerumunan; QC wajah tetap wajib. Preset `kisah-semi3d-boneka` tidak dipakai lagi untuk kisah baru.
   - **GERAK KELOMPOK NATURAL, TIDAK SERAGAM (owner 2026-11-18: "gerakannya sama persis, kayak baris-berbaris")**: saat beberapa orang berjalan/bekerja bersama, ACTION wajib menulis variasi: "each person moves at his own natural pace and rhythm, steps are not in sync, slightly different postures, one pauses to adjust his load, another glances to the side, small natural differences in timing". Hindari kata "in a line", "in formation", "in unison", "together in step" kecuali memang barisan tentara. QC strip: periksa langkah yang kembar.
   - **TOKOH UTAMA GAGAH, KEPALA SEARAH BADAN (owner 2026-11-18, Dzulqarnain SHOT05: "boneka banget, gak gagah, kepala seolah melintir dan melihat kamera")**:
     1. Raja/pemimpin/pahlawan TIDAK memakai kata "doll-like". Tulis: heroic adult, powerful muscular build, head one seventh of body height, long strong legs, tall leather boots (tidak bertelanjang kaki kecuali cerita memintanya), duduk tegak dengan kaki di sanggurdi, kamera rendah (low camera angle), kuda "tall powerful war stallion".
     2. Tokoh dari belakang: tulis "his head faces forward exactly like his body, we only see the back of his turban". Gambar Artistly yang kepalanya menoleh ke kamera sementara badan membelakangi (contoh `hal-05-1`) ditolak, walau wajahnya polos.
     3. Strip `qc-klip/*-gerak.jpg` dibuat untuk SEMUA klip berorang; agen memeriksa: kepala searah badan, arah gerak = arah hadap, postur gagah dan proporsi dewasa.
   - **ARAH GERAK = ARAH HADAP (owner 2026-11-18, hukum fisika)**: Dzulqarnain SHOT15, gambar menunjukkan pasukan menghadap kamera, prompt menulis "camera follows from far behind" -> VideoExpress membuat kuda berjalan mundur. Aturan:
     0. **POSE = POSE GAMBAR** (Dzulqarnain SHOT09: gambar berdiri di samping kuda, prompt "duduk di atas kuda" -> kaki menembus kuda). ACTION tidak boleh mengubah pose dasar gambar (berdiri/duduk/berkuda/berlutut); bila cerita butuh pose lain, buat gambar baru.
     1. Sebelum menulis ACTION/CAMERA, agen MELIHAT gambar awal dan menulis arah gerak sesuai arah hadap kepala/dada kuda dan orang (menghadap kamera -> bergerak ke arah kamera, kamera mundur di depan mereka; membelakangi -> menjauh; menyamping -> ke sisi itu).
     2. Gambar yang arah hadapnya campur (penunggang menghadap kamera di atas kuda yang membelakangi, atau sebagian rombongan menghadap berlawanan; contoh `hal-15-2`) ditolak untuk adegan berjalan/berkuda.
     3. Blok NATURAL MOTION wajib memuat: "Every horse, animal and person moves only in the direction its head and chest face, legs stepping forward; nobody walks or rides backward."
     4. QC klip membuat strip `qc-klip/*-gerak.jpg` (3 frame) untuk klip berjalan/berkuda; agen WAJIB melihat strip itu. Uji 2026-11-18: VLM lokal 4B tidak mampu menilai arah gerak atau arah hadap campur (melewatkan SHOT15), jadi pemeriksaan ini oleh agen, bukan otomatis.
   - **ATURAN KERUMUNAN (owner 2026-11-16):** Qarun adegan 7: saat kerumunan bergerak, VideoExpress memunculkan mata, hidung, dan kumis pada orang yang menoleh (QC 2 kepala berwajah; owner melihat mata). Owner kemudian: "kerumunan orang ga apa apa pakai video express kalau bisa konsisten". Jadi kerumunan BOLEH klip VideoExpress dengan syarat:
     1. Prompt `CROWD LOCK`: semua membelakangi/menyamping kamera sepanjang klip, tidak ada yang menoleh, kamera jauh dan tidak mendekat/memutar ke depan; AVOID "no head turning, no looking back, no faces in the crowd" (contoh `KISAH-FIRAUN-VX-20261116/buat-shots.mjs`, field `crowd`).
     2. QC wajah rapat setiap 1 detik untuk klip itu.
     3. Bila ada kepala berwajah: adegan kembali ke gambar diam Artistly (di `kisah-vx.json` tulis `hal` tanpa `klip`) atau render ulang sekali dengan prompt diperketat.
     - TESTED Kisah Firaun 2026-11-16: pekerja (adegan 3) dan bala tentara (adegan 7) dengan CROWD LOCK, kerumunan jauh dan membelakangi kamera: QC rapat 16 frame, 0 kepala berwajah. Satu-satunya wajah di klip tokoh tunggal (balkon, adegan 4), yang juga memunculkan patung; diganti gambar diam.
   - Tolak juga klip yang memunculkan patung/arca (bisa terbaca berhala) walau tidak diminta prompt.
   - **KERUMUNAN BERJALAN = GAMBAR DIAM** (owner 2026-11-16, Kisah Kaum Luth): pada kerumunan yang berjalan menjauh, VideoExpress membuat orang berkepala terbalik (kepala menghadap kamera sementara badan terus berjalan menjauh). QC wajah tidak menangkapnya karena wajahnya tetap polos. Jadi kerumunan yang berjalan memakai gambar diam Artistly; klip VideoExpress hanya untuk kerumunan yang diam di tempat (berdiri, mengacungkan obor, bekerja di tempat) atau yang dilihat dari sangat jauh (tentara Firaun). Agen juga memeriksa strip frame untuk kepala yang menghadap berlawanan arah badan.
   - QC wajah klip memakai frame rapat untuk klip berorang 3 atau lebih (setiap 1 detik), bukan hanya 3 frame.
3. `node apps/videoexpress-runner/runner.mjs plan <shots.json>` harus "valid", lalu `jalankan-vx.mjs run <shots.json>` (maks 5 job paralel), tunggu sekitar 8-10 menit.
   - **Gerbang QC gambar otomatis (2026-11-18)**: sebelum render, `run` memanggil `qc-gambar-shot.mjs <folder> --shot <shot yang akan dikirim>`. Gambar `CEK_WAJAH` / `CEK_ORANG` / `CEK_TEKS` menghentikan run sebelum ada render (lembar `qc-gambar/*-tanda.jpg`). Ganti gambarnya, atau setelah ditinjau mata jalankan dengan `--paksa`. Alasan: Dzulqarnain SHOT08, wajah prajurit sudah ada di gambar pilihan manual, baru ketahuan setelah klip jadi.
   - **Impor ulang otomatis**: picker VideoExpress hanya menampilkan gambar terbaru. `run` membaca "Gambar X tidak ditemukan", mengimpor ulang gambar itu dari peta `gambar_sumber.json` (atau `kisah-vx.json` gambar_dir + `qc.json` pilih, nama `TAG_NN` = `hal-NN`), lalu mengulang run (maks 3 putaran).
   - **Impor awal** (Ashabul Kahfi 2026-11-18: 29 gambar baru belum diimpor, run mencari satu per satu ~2 menit/gambar lalu gagal semua, 1 jam terbuang): sebelum run pertama, gambar yang belum tercatat di `local-state/vx-galeri.json` langsung diimpor. Catatan terisi otomatis setiap impor dan setiap shot yang terkirim; tidak perlu impor manual untuk produksi baru.
4. **Unduh + QC FIFO paralel** (owner 2026-11-18: cek jalan bersamaan dengan render, tidak menunggu semua klip). Langsung setelah `run`:
   `node apps/artistly-runner/unduh-vx.mjs <folder> <TAG>-SHOT01 ... <TAG>-SHOT37 --tunggu 60 --qc`
   - `--tunggu`: library dicek tiap 60 detik, tiap klip diunduh begitu selesai (status completed tetapi file belum siap dianggap belum selesai).
   - `--qc`: `qc-klip.mjs <folder> --pantau` berjalan di latar. Tiap klip yang tiba langsung dicek menurut urutan tiba: tahap A (1 frame/detik, YOLO, potongan kepala) dan tahap B (VLM per kepala di GPU) berjalan bersamaan seperti ban berjalan. Hasil di `<folder>/qc-klip/qc.log` dan `hasil.json`: `LULUS`, `CEK_WAJAH` (kepala bermata/hidung/mulut atau YuNet), `CEK_ORANG` (adegan people none tetapi ada orang di 2+ frame, misalnya sosok kecil di hook). Klip non-LULUS punya lembar `*-tanda.jpg`; lihat dengan mata sebelum render ulang (kepala buram sering salah tanda).
   - VLM memakai `vlm-server.mjs` (llama-server Qwen3-VL-4B, GPU, tetap menyala di 127.0.0.1:8139). Uji 2026-11-18: 2,5 detik per kepala, sebelumnya 10+ detik karena CLI memuat ulang model di CPU per gambar; jawabannya sama. Kepala lebih sempit dari 2,5% lebar frame dilewati VLM (tetap dihitung untuk CEK_ORANG). Potongan buram (varians Laplacian < 5) juga dilewati: kalibrasi Dzulqarnain/Usman, wajah nyata 5-337, alarm palsu kerumunan latar 1-4 (117 dari 119). Deteksi YuNet tidak langsung dianggap wajah; potongannya dicek VLM. Aturan bersama klip dan gambar ada di `qc-kepala-lib.mjs`.
   - **Referensi karakter (owner 2026-11-18)**: jangan membatasi sudut kamera demi menghindari wajah; buat lembar referensi faceless (depan/samping/belakang) untuk tokoh dan figuran. Fitur tersedia: Artistly Consistent Characters (3d & 2d, Multi-consistent 2 acuan) dan Storybook "Use Reference Photo" (1-4); VideoExpress "Use Consistent Character" hanya untuk gambar BARU di VideoExpress, bukan PAKAI_ULANG gambar Artistly. Kepatuhan faceless dengan acuan BELUM TERUJI; uji di kisah berikutnya.
   - Cek manual satu klip/ulang: `node apps/artistly-runner/qc-klip.mjs <folder> [file.mp4 ...]`.
   - **QC SUARA (owner 2026-11-18, "suara juga ada bahasa yang aneh")**: faster-whisper lokal (model small, CPU, `E:\JOTA-Standby\models\whisper`).
     - Suara klip: QC FIFO menjalankan `qc-suara.py klip`; ucapan manusia di suara bawaan klip -> `CEK_SUARA` (bisukan/potong/render ulang). Dzulqarnain: 37 klip bersih.
     - Narasi: `motion-kisah.py` mengecek tiap TTS ElevenLabs BARU dengan Whisper (kemiripan huruf >= 0.85, angka pakai kemiripan kata); meleset -> TTS ulang otomatis maks 3x. Penyebab kasus Dzulqarnain: ElevenLabs mengoceh ("Di sana, ia mendapati suatu kaum" terdengar "With Finland, with Van Routies"; adegan 22 dan "Mereka berkata:" juga rusak). `JOTA_CEK_LAFAL=0` mematikan cek.
     - Cek semua narasi cache: lihat `qc-suara.py narasi` atau transkripsi video final; nama Arab yang ditulis beda oleh Whisper ("Zul karnain") bukan masalah.
5. Klip CEK yang benar berwajah: render ulang dengan prompt diperbaiki; bila wajah datang dari gambar awal, ganti gambar/adegan kosong (lihat aturan wajah di atas). Unduhan render ulang ikut `--tunggu --qc` lagi.
- Popup VideoExpress (pengumuman, "Protect your account") menghalangi impor. "Later" hanya menunda sekitar 5 jam. **2026-11-16 malam owner mengaktifkan 2FA VideoExpress**, jadi pengingat 2FA seharusnya tidak muncul lagi. Saat sesi habis, owner login ulang lewat `JOTA.cmd login-videoexpress` dan mengetik sendiri kode 2FA dari HP; agen tidak pernah meminta kode. Menyembunyikan pengingat keamanan lewat kode runner ditolak izin, jangan dicoba lagi.
- Jangan jalankan saat worker VideoExpress sedang memproses job (kunci `videoexpress` mencegah tabrakan; bila LOCKED, tunggu).

## 4. Rakit (narasi + caption + suara klip)
- **Watermark = logo KO KANG OHAN (owner 2026-11-18)**: `apps/artistly-runner/aset/logo-kang-ohan-v3.png` (PNG transparan kiriman owner) otomatis di kanan atas oleh motion-kisah.py (lebar 9% layar 16:9 / 16% layar 9:16, opasitas 85%, bayangan tipis). `watermark_logo: false` di kisah-vx.json mematikan; tanpa logo kembali ke teks `watermark`.
- `kisah-vx.json`: `adegan` [{`hal`, `klip`, `narasi`}], `narator` (voice_id ElevenLabs; Qarun: JOTA Putra `RWiGLY9uXI70QL540WNd`), `judul`, `subjudul`, `penutup`, `keluaran`.
- `python apps/artistly-runner/motion-kisah.py kisah-vx.json`: caption karaoke kata demi kata, suara klip 22% di bawah narasi, kartu judul dan Pesan Hikmah. Render sekitar 5 menit.
- SFX (`"sfx"` di kisah-vx.json): per adegan (`adegan[].sfx`), `judul` (dentuman), `penutup`; dibuat ElevenLabs Sound Effects, disimpan di `sfx-cache`, ditekan otomatis saat narator bicara. **Tanpa whoosh transisi antarklip** (owner 2026-11-16: "suara transition antar clip nya hapus saja, mengganggu"); jangan isi `sfx.transisi`.
- **SFX tanpa suara orang** (Ashabul Kahfi 2026-11-18): jangan tulis "crowd murmur", "market chatter", "talking"; gumaman ElevenLabs terdengar seperti bahasa aneh dan mengacaukan cek Whisper video final. Pakai langkah kaki, roda gerobak, angin, api, burung, dan akhiri dengan "no voices".
- **Gambar diam setelah 2 kali gagal** (Ashabul Kahfi 2026-11-18): bila VideoExpress dua kali menambahkan wajah atau mata hewan pada adegan yang sama, isi adegan itu dengan `gambar` (gambar lolos QC, gerak kamera motion-kisah) alih-alih `klip`.
- Narasi disimpan di `narasi-cache` (kunci: teks + voice + setelan), jadi render ulang tidak memakai kredit ElevenLabs lagi.
- **Narator utama: JOTA Yudo** `gpzZjtWbZNetDrq8CXKD` (owner 2026-11-17). Kang Nandar hanya dengan `"eq": "jernih"`.
- **Dialog tokoh (owner 2026-11-17)**: pustaka suara di `apps/artistly-runner/suara-karakter.json` (narator, host, pemuda_baik, pemuda_emosi, pemuda_teman, pemuda_rakyat, pria_bijak, kakek, nenek, pria_penguasa, pria_kasar, wanita_dewasa, wanita_muda, wanita_2, anak; kakek = Eyang, nenek = Tuminah dari Voice Library, dipilih owner). Isi `"pemeran": {"Qabil": "pemuda_emosi"}` di kisah-vx.json, lalu `narasi` adegan boleh berupa list: `["Narasi.", {"tokoh": "Qabil", "teks": "Ucapan."}]` (atau `"suara": "<kunci>"` langsung). Caption dialog memakai warna tokoh dan label nama. Contoh: `temp/uji-dialog/kisah.json`.
  - Ucapan Nabi, Rasul, malaikat, Allah TIDAK disuarakan pemeran (skrip menolak); sampaikan lewat narator ("beliau bersabda...").
  - Dialog pendek (1 kalimat) dan seperlunya untuk hook; tokoh di klip tetap tidak membuka mulut (faceless). Suara kloning pribadi owner tidak dipakai.
- Narator: owner memilih **JOTA Kang Nandar** `aK834gEOxQEtviMPgurT` untuk Kisah Firaun (Qarun memakai Putra).
- Cek frame (ffmpeg select) dan volume (`volumedetect`, mean sekitar -17 dB).
- File untuk HP/chat: versi 720p crf 26 (di bawah 30 MB).

## 5. Monetisasi YouTube, Facebook, Instagram (cek ulang aturan resmi sebelum mendaftar; aturan platform bisa berubah)
**Hak pakai (wajib sebelum konten dimonetisasi)**
- Artistly: baca hak komersial lisensi (My Purchases, Check Details).
- VideoExpress: pastikan paket mengizinkan pemakaian komersial.
- ElevenLabs: paket berbayar (paket gratis tanpa hak komersial). Edge TTS dan Piper hanya untuk uji.
- Musik: hanya dari pustaka bebas royalti platform (YouTube Audio Library, musik bawaan FB/IG), ditambahkan saat upload.

**Hindari label "konten tidak orisinal / berulang"** (risiko terbesar konten AI massal)
- Tiap video kisah berbeda dengan naskah orisinal, narasi sendiri, dan hikmah. Jangan hanya mengganti judul di template yang sama.
- Jaga ciri khas seri: tokoh tetap, pembuka dan penutup khas JOTA, tapi isi dan adegan selalu baru.
- Variasikan hook, sudut kamera, dan panjang. Jangan unggah video yang hampir identik berturut-turut.
- Deklarasi konten AI: centang label AI/konten sintetis bila platform memintanya (YouTube: wajib untuk konten realistis yang diubah; animasi 3D jelas fiktif, tapi menandai tidak merugikan). Amazon KDP juga mewajibkan deklarasi.

**Syarat program** (angka resmi dicek di YouTube Studio / Professional Dashboard saat mendaftar)
- YouTube Partner Program butuh jumlah subscriber dan jam tayang atau tayangan Shorts minimum dalam periode tertentu. Video panjang 16:9 (3-8 menit, gabungan beberapa kisah) biasanya menghasilkan iklan lebih besar daripada Shorts; Shorts untuk menarik subscriber.
- Facebook: monetisasi lewat Professional Mode / Content Monetization; konten orisinal, bukan unggahan ulang.
- Instagram: fitur monetisasi Reels berbeda per negara; cek di Professional Dashboard. Fungsi utama IG: promosi dan arahkan ke produk (komik, buku) lewat link bio.

**Paket upload per video** (agen siapkan, owner yang upload)
- MP4 1080x1920 (asli) + 720p pratinjau.
- Judul (maks sekitar 60 huruf, hook + nama kisah), deskripsi (ringkasan, sumber ayat/hadis, ajakan subscribe/follow), 5-10 hashtag, thumbnail/cover (frame terbaik + judul besar).
- Catatan cek ustadz dan status lisensi.

## Biaya (owner 2026-11-16)
VideoExpress dan Artistly **unlimited, bayar sekali**: jumlah klip/gambar tidak perlu dihemat. Gambar diam hanya dipakai karena alasan kualitas (kerumunan berjalan, wajah muncul, patung). Biaya nyata hanya ElevenLabs (karakter narasi dan SFX; pakai `narasi-cache`/`sfx-cache`). Batas praktis VideoExpress: maks 5 job paralel dan waktu render.

## Biaya acuan Qarun
Artistly: 11 adegan x 2 gambar + ulang adegan 1 dan 9 (beberapa putaran). VideoExpress: 11 klip (3 x 5 detik + 8 x 7-10 detik). ElevenLabs: sekitar 1.100 karakter per render narasi. QC: lokal, 0 token.
