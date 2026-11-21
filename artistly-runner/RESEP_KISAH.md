# RESEP KISAH: Artistly + QC lokal + VideoExpress (standar emas JOTA)

Owner 2026-11-16: "workflow artistly + videoexpress dahsyat ... saya jadikan contoh yang hebat untuk diikuti kisah-kisah lainnya. Target monetize di YouTube, Facebook dan Instagram."
Contoh acuan: **Kisah Qarun** (`gpt/artistly/KISAH-QARUN-20261116` + `gpt/productions/KISAH-QARUN-VX-20261116`), 93 detik, 9:16, 11 adegan.
Hasil acuan di Drive: `2. Artistly JOTA/Kisah Qarun 20261116/Kisah Qarun (VideoExpress).mp4`.

Kenapa resep ini dipakai: Artistly menjaga konsistensi tokoh dan baju (gambar diam), QC lokal menyaring gambar tanpa token, VideoExpress hanya menggerakkan gambar yang sudah lolos (bukan membuat tokoh dari nol), lalu narasi dan caption dirakit lokal.

## FATAL OWNER 2026-11-22: KAMERA SINEMATIK, BUKAN KAMERA PUNGGUNG (menggantikan aturan yang bertentangan di bawah)
Wajib baca dulu `skills/jota-video/references/STANDAR_SINEMATIK_KANG_OHAN.md` dan `STRATEGI_KONTEN_KANG_OHAN.md`.
- Faceless berarti wajah POLOS tanpa mata, alis, hidung, dan mulut, dan wajah itu boleh terlihat dari depan, dari samping, dan dalam close-up. Mengorbankan sudut kamera demi lolos QC (punggung, tanpa close-up, "facing away") adalah tindakan FATAL.
- Aturan berikut di dokumen ini DICABUT:
  - pilih gambar "murni membelakangi";
  - kamera "fixed far behind";
  - close-up tangan tidak dipakai;
  - serah-terima berdampingan membelakangi.
- Bila wajah muncul, perbaikannya urut: lembar acuan 4 sudut (ada sudut depan polos), lalu kandidat gambar awal, lalu FACELESS LOCK di prompt, lalu render ulang.
- Gaya channel: 3D realistis sinematik (`image_type: 3d`).
- Setiap lokasi dibuka dengan establishing. Arsitektur harus terbaca: toko tidak boleh tampak seperti rumah.
- Hook visual dengan sudut kuat. Transisi halus memakai LAST_FRAME / First-Last Frame.
- Durasi mengikuti cerita (long-form 8-12 menit).

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

## FATAL OWNER 2026-11-18 (kedua): SETIAP ORANG DAN LINGKUNGAN DIDEFINISIKAN SATU PER SATU
Teguran owner: semua penduduk berbadan tegap, berotot sama, tinggi sama, seperti boneka/robot. Di kehidupan nyata ada yang gemuk, pendek, kurus, kulit terang, kulit gelap, dan seterusnya.
Fakta penyebab:
- preset `kisah-sinematik-natural` memaksa "defined muscles, broad shoulders, long strong arms" ke semua orang;
- `buat-naskah.mjs` Ashabul Kahfi menempelkan KULIT ("defined muscles and visible veins", sun-tanned) ke setiap tokoh;
- satu kalimat `WARGA`/`PEMUDA` dipakai untuk seluruh kelompok.

Perbaikan:
- **`apps/artistly-runner/pemeran.mjs`**: setiap orang yang tampak wajib punya profil sendiri. Isinya peran, usia, tubuh, tinggi (sebaiknya relatif), kulit (warna + tekstur), janggut/rambut yang tampak, penutup kepala, pakaian (potongan, bahan, warna, kondisi), aksesoris, alas kaki. Setiap adegan wajib punya lingkungan: lokasi, waktu, cuaca, cahaya, latar depan, tengah, belakang, detail bahan.
- **Keragaman diperiksa otomatis.** Untuk kelompok 2 orang atau lebih:
  - bentuk tubuh minimal min(n, 4) macam;
  - tinggi tidak boleh sama semua;
  - untuk 3 orang atau lebih, kulit dan usia tidak boleh sama semua;
  - pakaian tidak boleh ada yang sama persis.
- **Gambar Artistly**: skrip halaman disusun `skripGambar({pemeran, adegan, lingkungan})`. `produksi-gambar.mjs` menolak naskah gaya `kisah-*` yang tidak punya PERSON n per orang dan ENVIRONMENT (exit 3, tanpa jalan pintas).
- **Klip VideoExpress**: `promptHDT` mewajibkan `tokoh[].fisik` + `lingkungan`, lalu mencetak CHARACTERS (PERSON n = Character A/B/...) dan ENVIRONMENT. Gerbang `jalankan-vx.mjs` ikut memeriksanya.
- **Preset `kisah-sinematik-natural`**: tubuh, tinggi, usia dan warna kulit sekarang mengikuti deskripsi tiap orang, tidak lagi otot seragam.
- **Kerumunan**: hanya orang yang didefinisikan yang boleh tampak (jumlah "Exactly N" = jumlah PERSON).
- **Rambut (keputusan owner 2026-11-18 "boleh sebagian", menggantikan aturan 2026-11-17 "rambut selalu tertutup")**: laki-laki tetap memakai penutup kepala, tetapi rambutnya boleh terlihat sebagian di pinggir (keriting, ikal, lurus, beruban, hitam, cokelat), sesuai kolom `rambut` tiap orang. Tetap dilarang botak dan dilarang tanpa penutup. Sudah diterapkan di preset `kisah-sinematik-natural`, `kisah-3d-boneka`, dan `kisah-semi3d-boneka`.

## FATAL OWNER 2026-11-19 (ketiga): EMOSI/SIFAT TOKOH DAN SUASANA ADEGAN WAJIB, TANPA ANOMALI GERAK
Teguran owner: Tahlilan detik 1:06-1:14, tetangga di rumah duka melompat-lompat seperti kegirangan. Fakta prompt SHOT07: hanya gerak (angkat rantang, rapikan kerudung) tanpa emosi/suasana; gerak berakhir detik 7 dari klip 10 detik (3 detik tanpa arahan); SFX "footsteps"; strip QC hanya 6 frame sehingga lompatan lolos.
- `promptHDT` sekarang MENOLAK shot berorang tanpa `suasana_hati` (baris "MOOD OF THE SCENE" + larangan melompat/berjingkrak/menari/tampak riang) dan tokoh bergerak tanpa `emosi` (perasaan + cara bergerak, minimal 4 kata). Sisa detik setelah gerak terakhir wajib diisi (`lain`), bawaannya "kaki tetap di tempat, hanya bernapas". AVOID shot berorang selalu memuat "no jumping, no hopping, no bouncing, no dancing, no exaggerated or comic movement".
- SFX adegan diam: jangan menulis langkah kaki/ketukan bila tokoh tidak melangkah.
- Cek strip klip berorang: minimal 12 frame per klip (bukan 6), periksa juga emosi gerak sesuai narasi (duka = tenang, menunduk).

## KONSEP DISETUJUI OWNER 2026-11-19 ("konsepnya bagus"): Kisah Ashabul Kahfi 60 detik
Contoh: `gpt/productions/KISAH-ASHABUL-KAHFI-60FINAL-20261119/buat-shots.mjs`.
1. Profil fisik tiap tokoh (`pemeran.mjs`) -> acuan per tokoh di Artistly (Image Designer v6, satu orang, latar polos), plus satu gambar grup Artistly yang faceless sebagai acuan kelompok.
2. Acuan diimpor ke VideoExpress (`jalankan-vx.mjs impor-artistly <png> <NAMA>`; hanya gambar yang ada di galeri Artistly).
3. Gambar adegan dibuat di VideoExpress: start BARU + Use Consistent Character + acuan (`jalankan-vx.mjs gambar`), lalu kandidat dicek dengan MATA (wajah, orang tambahan, mata hewan).
4. Klip bergerak hanya untuk adegan yang terbukti aman: tanpa orang, atau satu tokoh tampak samping dengan latar tertutup (gerak tangan). Adegan kelompok = gambar diam konsisten dengan gerak kamera `motion-kisah`.
5. Narasi ElevenLabs dicek Whisper per mp3 cache; kata pembuka yang salah lafal diganti kalimatnya.
Catatan hasil: total 74,6 detik (narasi sekitar 60 detik + intro + penutup + kartu IKUTI KAMI). Unggah Drive di PC: salin MP4 ke `G:\My Drive\1. Video JOTA\<judul>\` (Google Drive for desktop, akun jotaauto1; tanpa batas ukuran, tersinkron sekitar 1 menit, link dicari lewat konektor Drive). `upload-drive.mjs` TIDAK jalan di PC: `JOTA_DRIVE_URL` di `local-state/accounts.env` berisi link folder Drive (drive.google.com), bukan URL web app Apps Script `/exec`, sehingga permintaan dialihkan ke halaman login Google (2026-11-19).

**V2 2026-11-19 (lebih banyak klip gerak, `KISAH-ASHABUL-KAHFI-60V2-20261119`):** LOLOS: satu tokoh tampak samping bersandar dinding batu (Yamlikha bangun, mengangkat tangan dan mengusap tengkuk); close-up tangan saja dengan koin bulat (mode `people: hands`; catatan: tangan kedua menghilang setelah 2 detik). GAGAL: satu tokoh berdiri tampak samping dengan tongkat (tongkat diayun-ayun, melangkah maju-mundur); kelompok dari belakang mendaki (tiga tokoh dan anjing menghilang dari frame); gambar awal kelompok "dari jauh di belakang" dengan acuan grup yang menghadap depan malah keluar menghadap kamera (2 dari 2). Hasil: 5 dari 9 adegan bergerak.

**Tahlilan 2026-11-19 (`gpt/productions/TAHLILAN-SUNNAH-20261119`, 11 adegan, 6 klip lolos):**
- Klip tanpa orang lolos 4 dari 4 (masjid subuh, ruang lentera, kitab, pemakaman); satu tokoh tampak samping dengan latar tertutup lolos 2 dari 2 (ibu menghitung uang, tetangga menunggu).
- **Doa:** gambar awal telapak menengadah benar, tapi VideoExpress MERAPATKAN telapak di depan dada/wajah (gaya doa agama lain) di 2 dari 2 klip (tangan saja, anak di makam). Adegan doa: pakai gambar diam, atau uji prompt yang lebih tegas sebelum dipakai.
- **Close-up tangan yang masih memperlihatkan lutut/badan** (dua perempuan berpegangan tangan): wajah lengkap muncul di tengah klip. Close-up tangan aman hanya bila bingkainya benar-benar tangan saja (koin Ashabul V2 lolos).
- **Gambar awal:** "close-up tangan berdoa" pertama keluar badan tanpa kepala; kalender dinding bergambar wajah orang (2 dari 2) -> jangan menulis kalender/poster/foto di latar; tulis "dinding polos".

## UJI KARAKTER KONSISTEN 2026-11-18 (Ashabul Kahfi 60 detik): FAKTA
- **Image Designer v6 tanpa acuan** (`gambar-v6`, profil teks per orang): baju dan tubuh cukup konsisten, tapi tokoh berubah antar-adegan (Yamlikha jadi anak kecil di pasar), jumlah orang meleset (adegan gua 6-8 orang), arah "dari belakang" diabaikan.
- **Multi-Character Storybook** (AI Design Agents; form hanya naskah maks 5000 huruf + Choose Dimension, ada 9:16, tanpa foto): konsistensi tokoh sangat baik, tapi **faceless diabaikan** (semua berwajah), gaya kartun, gua jadi wajah raksasa, anjing bermata, halaman sampul bertulisan. TIDAK dipakai.
- **Script To Storybook + 4 foto acuan**: dimensi hanya 1:1, 3:4, 16:9 (tanpa 9:16). Dua buku 3:4 terkirim, gambar tidak muncul di Personal Designs dalam 40 menit (belum diketahui sebabnya).
- **Consistent Character Storybook / Storybook Illustrator**: 1 foto tokoh saja.
- **VideoExpress Use Consistent Character + acuan dari Artistly** (`impor-artistly` hanya bisa gambar yang ADA di galeri Artistly; gambar rakitan lokal tidak ditemukan; acuan grup = gambar Artistly berisi 4 pemuda): gambar awal konsisten dan faceless untuk tokoh acuan. Gagal: penjual tua berjanggut selalu berwajah (3 dari 4 kandidat, 2 putaran), orang latar pasar berwajah walau prompt pasar sepi.
- **QC VLM `--kepala` meloloskan wajah penjual yang jelas** (SHOT08-1): gambar ramai wajib dicek mata.
- **Video dari gambar awal itu (prompt HDT):** uji 1 gerak per tokoh diabaikan (pemuda berjalan keluar frame, anak dan prajurit tambahan muncul, kamera bergerak; tiga pemuda sujud menutup wajah serupa). R2 "hanya satu tokoh bergerak, lainnya diam, kamera terkunci": tetap gagal (orang tambahan di tangga singgasana, tokoh lain ikut membungkuk, tiga pemuda mengangkat tangan berdoa bersamaan, kamera mendekat). Pola "satu bergerak, lainnya diam" yang berhasil di Ashabul VX adegan 8 R2 TIDAK berhasil untuk kelompok 4 orang.
- **Pecah per tokoh** (satu orang per klip, Consistent Character + acuan tunggal Artistly, kamera terkunci, satu gerak): gambar awal 6/6 satu orang, faceless, sesuai acuan. Video: SHOT51 (Yamlikha berlutut tampak samping, mengangkat telapak berdoa) LOLOS: satu orang, faceless, gerak sesuai. SHOT31 (si Sulung tampak dari belakang, hentak tongkat) GAGAL: ia berbalik ke kamera dan wajahnya lengkap muncul, tongkat berubah mirip pedang. SHOT52 (si Bungsu tampak belakang-samping, mulut gua terang di latar) GAGAL: tiga figur manusia muncul di mulut gua. Pola sementara (1 klip per kasus, belum aturan): pose awal membelakangi kamera memancing tokoh berbalik dan berwajah; latar bukaan terang/kosong (mulut gua, tangga singgasana) memancing figur tambahan.
- `unduh-vx.mjs` menerima label dipisah SPASI (`AKVXC-SHOT03 AKVXC-SHOT05`), bukan koma; label berkoma dicari sebagai satu label dan tidak pernah ditemukan.

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

- **RUMUS NASKAH WAJIB (owner 2026-11-19):** setiap naskah kisah disusun dan diberi label babak: **HOOK → SETUP → CONFLICT → CLIMAX → RESOLUTION → MORAL MESSAGE**. Owner juga minta cerita "lebih detail, enak didengar, enak dilihat, penonton paham dan ambil hikmahnya".
  - HOOK (0-3 detik): klip klimaks bergerak + satu kalimat yang memancing rasa ingin tahu (aturan HOOK 2 DETIK).
  - SETUP: siapa, di mana, nikmat atau keadaan awal; tokoh dan dunia dikenalkan dengan jelas.
  - CONFLICT: kesalahan, penolakan, atau ujian yang makin memuncak; dialog lewat narator.
  - CLIMAX: momen paling dahsyat (azab, keputusan, mukjizat), adegan drone/aksi terkuat.
  - RESOLUTION: akibat dan keadaan sesudahnya (sesal, selamat, bekas yang tersisa).
  - MORAL MESSAGE: hikmah yang konkret dan bisa diamalkan, 1-2 kalimat, lalu ajakan singkat.
  - AYAT DI MORAL (owner 2026-11-20): panel `ayat-png.mjs` (Arab Amiri Quran + `--terjemah` + `--rujukan "QS. Surat: ayat"`) sebagai `overlay`; narator mengantar ("Allah berfirman dalam surah ..., ayat ..."), lalu terjemah, lalu tafsir. **JANGAN pakai rekaman qari dari internet**: bacaan Misyari Rasyid (everyayah) kena klaim hak cipta. `audio_file` qari hanya untuk rekaman sendiri (ustadz/santri dengan izin tertulis) yang diberikan owner.
  - Panjang: kisah panjang sekitar 20 adegan (2,5-3 menit); Shorts 60 detik tetap memakai keenam babak secara ringkas.
  - **TARGET DETIK PER BABAK (aturan tetap owner 2026-11-19):** film 3 menit: HOOK 0:00-0:10 (detik 0-2 tetap klip klimaks + teks besar; intro KANG OHAN PRESENTS dan judul masuk jatah hook), SETUP 0:10-0:35, CONFLICT 0:35-1:45, CLIMAX 1:45-2:20, RESOLUTION 2:20-2:45, MORAL MESSAGE 2:45-3:00 (hikmah + dalil terverifikasi). Versi 60 detik dengan proporsi sama: hook 3, setup 8, conflict 23, climax 12, resolution 8, moral 6. Tabel waktu per adegan ditulis di naskah sebelum produksi; narator sekitar 1,7 kata/detik. Pelajaran Tsamud: climax hanya sekitar 17 detik (terlalu singkat); target 35 detik dengan beberapa adegan azab dari sudut berbeda. Setiap fakta harus berdasar Al-Qur'an, hadits shahih, atau riwayat tafsir yang disebut sebagai riwayat; tidak boleh mengarang.

## Pelajaran Uwais Al-Qarni (2026-11-20, `gpt/productions/KISAH-UWAIS-20261120`, 20 adegan, 2:27, HR. Muslim 2542)
Fakta dari produksi (bukan dugaan):
- **Gerbang QC gambar butuh `gambar_sumber.json`** (nama gambar -> file png) di folder produksi bila gambar awal adegan kosong dibuat di VideoExpress (`AWAL-1`) dan tokoh diimpor manual: tanpa itu `run` berhenti "file gambar tidak diketahui". Peringatan OCR `CEK_TEKS` ("口口", "HARE") pada pemandangan/bayangan daun = salah baca; setelah dilihat mata, `run --paksa`.
- **Impor awal gagal** untuk gambar buatan VideoExpress (`UWAI-SHOTxx-AWAL-1`) karena hanya gambar di galeri Artistly yang bisa diimpor, dan mengimpor ulang tokoh yang sudah diimpor tidak perlu. Catat semua nama di `local-state/vx-galeri.json` (nama -> waktu ISO) sebelum `run`.
- `jalankan-vx.mjs gambar` wajib path **absolut** ke shots.json (runner berjalan dari folder lain; path relatif ENOENT).
- Gambar Artistly: hal-02 (satu orang di ambang pintu) pertama keluar dengan kerumunan 3 orang (QC TOLAK orang 3>1). Perbaikan yang berhasil: tulis "He is the only person anywhere in the frame", "lonely small house at the edge of the village", "village lane deserted and silent"; pindahkan hasil lama ke `gambar/ditolak/` lalu jalankan `produksi-gambar.mjs` lagi (hanya halaman kosong yang dibuat ulang). Pose profil tiga-perempat menampakkan pipi dan terlihat anak-anak; pilih gambar yang murni membelakangi.
- Dua tokoh dari belakang di bukit (Umar jubah hijau + Uwais jubah tambal): prompt "both stand still" tetap menghasilkan keduanya berjalan menjauh pelan; hasil tetap natural, tanpa wajah (7 klip bertokoh lolos strip 12 frame, QC wajah 0). Satu tokoh berlutut (kamera naik) bergerak membungkuk seperti sujud; faceless tetap terjaga.
- **Anakronisme latar**: gambar awal "masjid Madinah awal" memunculkan bangunan berkubah di latar (adegan 9); diganti memakai gambar adegan lain tanpa kubah (`PILIH[9]`, `revision 2` + `regen: ['SHOT09']`, file lama dipindah ke `lama/`) dan kamera berbeda. Tulis latar "plain flat mud-brick wall" dan periksa kubah/menara.
- `subjudul` kartu judul maksimal sekitar 30 huruf (43 huruf terpotong di lebar 9:16).
- Estimasi durasi `kata/1.7+1` terlalu longgar: 166 detik diperkirakan, hasil 147,6 detik (narasi pendek dan rapat).
- Sumber hadis: sunnah.com memblokir fetch (403); hadeethenc.com dan en.tohed.com terbaca. Teks Arab ayat yang ditulis sendiri wajib cek ustadz.

## Pelajaran Tiga Orang di Gua (2026-11-20, `gpt/productions/KISAH-TIGA-GUA-20261120`, 21 adegan, 2:28, Muttafaq 'alaih riwayat Ibnu Umar)
Fakta dari produksi:
- **Hadis tidak menyebut zaman, tempat, nama, atau bangsa** ("tiga orang", "umat terdahulu"). Latar "natural dan realistis pada zamannya" tidak bisa dibuktikan; dibuat netral dan ditandai DUGAAN visual: perbukitan batu kapur Timur Tengah kuno, batu lapangan + bata lumpur beratap datar, tunik wol sebetis, tali pinggang, kain kepala, sandal kulit, lampu minyak tanah liat. Tanpa kubah/menara/tiang klasik/tulisan agar tidak menunjuk zaman atau agama tertentu. Pencarian web untuk arkeologi pakaian/rumah zaman itu tidak memberi sumber spesifik. Detail hadis (hadeethenc.com/id/browse/hadith/10417): seratus dinar, satu faraq (16 kati) gandum, sapi dan penggembala; Uraian menyebut unta untuk orang pertama.
- **`PILIH` harus kosong sebelum `jalankan-vx.mjs gambar`**: shot dengan `start` PAKAI_ULANG dilewati `gambar`, jadi run selesai dalam 1,5 menit tanpa gambar. `buat-shots.mjs` sekarang membaca `pilih.json` (ada setelah gambar ditinjau).
- Gerbang prompt natural menolak kata **"mouth"** (juga "mulut gua"/"cave mouth"): ganti "cave entrance".
- Kata benda berbentuk (batu besar) wajib kata bentuk persis `round` (bukan `rounded`): `BENTUK` memakai \b.
- **Kamera mendorong (push in) di klip satu/dua tokoh dari belakang membuat tokoh menoleh dan memperlihatkan profil wajah** (SHOT07 close-up pipi/hidung; SHOT15 kepala menoleh, QC CEK_WAJAH). Perbaikan yang lolos: tulis "The camera stays fixed in place behind him/them" dan kalimat positif "both men keep looking out at the herd for the entire video"; klip lama dipindah ke `lama/`, `revision 2` + `regen`. Klip tiga orang berjalan/duduk dari belakang dan kamera mengikuti lolos tanpa wajah (5 dari 5).
- QC CEK_WAJAH pada gambar bebatuan di aliran sungai (SHOT20) = pareidolia, bukan wajah.
- Estimasi `kata/1.7+1` = 174 detik, hasil 148,6 detik (mirip Uwais: estimasi terlalu longgar sekitar 12 persen).
- Whisper small mendengar "gua" sebagai "gue" di 2 dari 3 narasi dan "Engkau mengejekku" sebagai "enggak mau mengecekku": tidak konsisten antar narasi, dianggap kekeliruan Whisper (DUGAAN, belum diverifikasi dengan telinga).

### Revisi Tiga Orang di Gua (owner 2026-11-20, 4 putaran, hasil 175 detik) — FATAL untuk kisah berikutnya
Teguran owner: (1) amal tiap orang tidak jelas; (2) mekanisme jatuhnya batu tidak jelas; (3) doa orang kedua sudah membuka batu lebar padahal doa ketiga belum; (4) alur harus masuk logika: berjalan di lereng, melewati gua, longsor, bebatuan berhamburan, lari masuk gua, batu besar longsor menutup mulut gua; (5) gua harus ALAMI, bukan rapi.
- **Amal wajib dijelaskan eksplisit**: setelah tiap kisah satu kalimat "Itulah amalku: ..." (mendahulukan orang tua walau anak kelaparan / menahan diri dari zina karena takut Allah / menunaikan hak pekerja beserta seluruh hasilnya) dan kisahnya diceritakan runtut. Penonton harus bisa menyebut amalnya.
- **Mekanisme fisik harus terlihat**: hujan -> longsor (adegan kosong) -> lari masuk -> tebing licin runtuh, batu terlepas, menggelinding, mengganjal mulut gua (adegan dari luar) -> pandangan dari dalam. Hadis hanya menyebut hujan, gua, batu jatuh dari gunung; longsor kecil sebelumnya = penjelasan visual (DUGAAN), jangan diberi klaim hadis.
- **Celah batu bertahap dan konsisten dengan urutan doa**: doa 1 = celah sempit selebar tangan/lengan, doa 2 = lebih lebar tetapi tetap tidak muat dilewati orang, doa 3 saja yang terbuka penuh. Periksa urutan lebar celah di gambar awal sebelum render (gambar yang dibuat belakangan bisa lebih sempit dari yang sebelumnya; tukar urutannya).
- **Gua = lubang alami tidak rata**: tulis "rough irregular natural cave opening, jagged uneven dark hole with broken rock edges and fallen rubble at its base, no arch, no masonry, no brick, no stone blocks, no steps". Kata "arched entrance" menghasilkan lengkungan batu bata buatan (ditolak owner). Tambah "no arches, no brick, no masonry" ke AVOID.
- **Batas 3 menit dicek pada video jadi, bukan estimasi**: `motion-kisah.py` memotong klip menurut panjang narasi (jumlah klip 206 detik menghasilkan film 181 detik), jadi yang menentukan adalah jumlah kata narasi. Setiap tambahan adegan ringkasan menambah sekitar 5-7 detik; kata kasar: 1 kata sekitar 0,55 detik, ditambah intro dan kartu penutup sekitar 12 detik. Turun dari 183,9 ke 175,0 detik dengan membuang satu adegan dan memangkas 6 narasi.
- **ID adegan baru**: untuk mengganti gambar awal adegan kosong yang sudah ada, pakai ID baru (31->41 dst.) dan masukkan ID lama ke `OLD`; `gambar` melewati shot yang PNG awalnya sudah ada.
- **Kunci `local-state/locks/videoexpress.lock`**: menghentikan tugas jalankan-vx lewat TaskStop meninggalkan kunci basi (PID mati). Periksa PID dengan `Get-Process`, pastikan tidak ada proses jalankan-vx/runner, baru hapus.
- Gambar HP: bitrate 1400k menghasilkan 30,1 MB untuk 175 detik (di atas batas kirim 30 MB); pakai 1200k/80k audio (25,8 MB).

### Revisi 5 Tiga Orang di Gua (owner 2026-11-20: "jalan dimana, longsor dimana, gua dimana, tiba-tiba masuk gua") — LOGIKA RUANG WAJIB
- Adegan harus membentuk SATU lokasi yang tersambung. Urutan yang diterima: hook = akibatnya (tiga orang menghadap batu penyumbat di dalam gua) -> berjalan di jalan setapak lereng (gua terlihat di samping jalan) -> badai hujan datang -> BERLARI menuju gua (mulut gua terlihat di depan) -> masuk gua -> dari luar: tebing runtuh, batu besar longsor, menggelinding, menyumbat mulut gua -> dari dalam: cahaya menyempit -> terkurung -> mereka berdoa. Adegan longsor tanpa orang yang berdiri sendiri sebelum mereka masuk membingungkan dan dibuang.
- Penonton tidak boleh dipaksa menebak: tiap perpindahan tempat/tindakan (berlari, masuk, batu jatuh) wajib punya adegan sendiri dan narasinya menyebut tindakan itu ("berlari kencang mencari tempat berlindung", "lalu mereka masuk ke dalam sebuah gua di tepi jalan", "tiba-tiba tebing runtuh").
- Gambar Artistly untuk adegan lari: pilih yang mulut guanya terlihat di DEPAN tokoh (hal-08-2), bukan yang gua tertinggal di belakang.
- Sisipkan halaman Artistly baru HANYA di akhir `naskah.json`: menyisipkan di tengah menggeser nomor halaman sehingga gambar lama terbaca sebagai halaman lain.
- ID klip yang sama boleh dipakai dua kali dari satu gambar (hook dan adegan 5 memakai GU_DALAM dengan kamera berbeda).
- Hasil akhir 174,5 detik (membuang adegan ayat-lanjutan "Para ulama menjelaskan..." supaya batas 3 menit terjaga dan mengurangi klaim yang perlu ustadz; kartu penutup memuat pesan).

## 0. Pilih kisah (aturan isi)
- Sumber jelas: ayat Al-Qur'an (surat:ayat) atau hadis sahih dengan nomor. Narasi = parafrase makna, bukan terjemahan resmi. **Ustadz memeriksa sebelum tayang.**
- Nabi, malaikat, hal gaib: tidak pernah digambarkan dan Nabi tidak diberi dialog. Cerita disampaikan lewat tokoh lain, latar, benda, atau adegan tanpa orang.
- Azab (keputusan owner 2026-11-19, menggantikan aturan "tanpa korban"): kengerian murka Allah WAJIB digambarkan jelas seperti kejadian nyata sebagai hikmah: orang panik berlari, terseret banjir, rumah runtuh dan tenggelam, mayat bergelimpangan. Darah secukupnya boleh (noda darah bercampur lumpur di kain); tanpa luka terbuka menganga atau potongan tubuh. Mayat telungkup atau dari jauh/atas (pose berbaring terbukti memancing wajah). Catatan: YouTube bisa membatasi umur video berdarah.
- **TANPA GAMBAR DIAM (owner 2026-11-19, menggantikan "adegan kelompok = gambar diam"):** semua adegan klip bergerak 1x. Adegan kelompok/korban memakai kamera drone (melintas tinggi, mengikuti dari belakang-atas, naik memperlihatkan lembah) agar tokoh kecil; `promptHDT` menerima `drone: true` untuk adegan yang semua tokohnya diam (mis. mayat). Bila klip gagal 2 putaran, render ulang dengan sudut drone lebih tinggi, bukan gambar diam.
  - **Drone BUKAN kamera utama (owner 2026-11-19, Tsamud: "kenapa drone jadi kamera yang utama haha, yang terbaik lah"):** pilih kamera terbaik per adegan. Drone untuk pembuka/skala, kelompok besar, dan korban (maksimal sekitar 3 dari 18 adegan). Selebihnya kamera darat: close-up (tangan, benda), mengikuti dari belakang, low angle, handheld bergetar untuk bencana, dolly/gimbal, tilt, dorong ke depan. Tokoh tetap tampak belakang di kamera darat.
- **Pelajaran Tsamud (2026-11-19, fakta dari cek frame):**
  - Panjang klip: narator JOTA Yudo (speed 0.95) sekitar **1,7 kata/detik**, bukan 2,2. Rumus lama `kata/2.2+1.2` membuat narasi 5, 17, 18 lebih panjang 2-4,4 detik dari klip (frame beku). Hitung `kata/1.7+1`; narasi di atas sekitar 16 kata pecah jadi dua klip (cut kedua).
  - Gerak tokoh kelompok di VideoExpress gagal 2-3 kali: tiga pembesar saling dorong/berjingkat, orang berdiri serempak duduk, penantang mengacungkan tinju jadi melompat-lompat, pedang bengkok berubah lurus, orang muncul di latar. Yang lolos: tokoh DIAM TOTAL + kamera darat bergerak (dorong maju dari bawah, maju di antara bahu), atau satu tokoh berjalan menjauh dari kamera.
  - Gambar awal VideoExpress tanpa acuan untuk kelompok = foto berwajah lengkap (TOLAK). Artistly "hanya tangan" selalu menggambar beberapa pemahat berwajah. Gantinya adegan benda bercerita (pahat dan palu di depan pintu setengah jadi; sembilan belati di sekeliling api unggun).
  - Fasad bertiang ala Petra/Hegra = peninggalan Nabath; untuk Tsamud tulis "plain dwellings carved into cliffs, no columns".
  - **Mayat korban (owner 2026-11-19):** "kenapa mayatnya bergelimpangan rapi? ... diterjang alam pasti tidak teratur". Jangan menulis "four dead people lying..." (Artistly menjajarkan). Tulis posisi tiap mayat satu per satu: tempat berbeda (pojok, dekat pintu, tertimbun dinding, jauh di belakang), pose berbeda (telungkup, menyamping, tertindih batu, hanya kaki terlihat), plus "NOT in a row, NOT side by side, NOT arranged". Mayat telentang berjajar selalu dihidupkan VideoExpress (mengangkat tangan, merangkak, bangkit); pakai telungkup/tertimbun dan prompt video pendek. Cek dengan strip 3 fps.
  - **AKTIVITAS NATURAL, BUKAN FOTO BERSAMA (owner 2026-11-19):** "aktivitas orangnya natural saja, jangan seperti lagi di foto bareng-bareng". Artistly menjajarkan semua orang yang didaftar menghadap kamera. Untuk keramaian: definisikan maksimal 2 orang (tampak belakang), sisanya kerumunan kecil di lingkungan; tulis "Candid documentary moment: nobody poses, nobody stands in a row, nobody faces the camera". Setiap tokoh depan sedang melakukan pekerjaan wajar (memanggul keranjang, menarik tali, menata dagangan, menuntun unta), bukan berdiri menonton.
  - **PROMPT VIDEO SIMPEL (owner 2026-11-19: "prompt video nya simple dan jelas, jangan membuat bingung video express"), TERBUKTI:** mayat SHOT15 hidup di R2-R5 (prompt HDT panjang; prompt pendek berlabel dengan AVOID "crawling, standing up"), lalu DIAM total di R6 dengan `format: 'natural'`: satu paragraf, tidak menyebut gerakan tubuh sama sekali (juga tidak di AVOID), mayat ditulis sebagai bagian reruntuhan ("still bodies covered in dust lie on the ground like the stones around them... Everything on the ground is frozen and silent"), tanpa kata eyes/nose/mouth, hanya kamera dan debu yang bergerak. Pelajaran: jangan menyebut gerakan yang tidak diinginkan, karena menyebutnya justru memancingnya. Contoh di gpt/productions/KISAH-TSAMUD-20261119/buat-shots.mjs (S15).
  - Perbaikan cepat tanpa render ulang: sambung bagian bersih klip (ffmpeg concat) dengan potongan klip lain sebagai cut kedua.
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

### 2b. Lembar karakter SATU FILE per tokoh (owner 2026-11-20, uji lulus 2026-11-21)
Tiap slot Use Consistent Character di VideoExpress cukup diisi SATU gambar berisi tiga sudut tokoh yang sama.
1. Susun dengan `skripLembar(orang)` dari `apps/artistly-runner/pemeran.mjs` (satu orang, EMPAT sudut sejak 2026-11-22: depan, tiga perempat depan, samping, belakang; badan penuh; latar studio abu-abu; wajah polos terlihat jelas dari depan; gerbang QC menghitung empat figur). **REVISI 2026-11-22 siang:** lembar tetap Reference Photo, tetapi image prompt DILARANG menulis "every person ... reference sheet" dan blok "crowd" pada adegan 1 orang, karena itu membuat VideoExpress menggambar keempat figur (STANDAR_SINEMATIK 2b). Cadangan: ACU satu figur (`"acuan": "ACU"`). Preset Artistly kisah = `kisah-3d-realistis`.. Naskah lembar terpisah dengan `rasio: "16:9"`. Contoh: `gpt/artistly/KISAH-TIGA-GUA-20261120/buat-lembar.mjs` -> `lembar/naskah.json` -> `produksi-gambar.mjs` (gerbang menerima `CHARACTER SHEET` dengan satu PERSON; QC menghitung tiga figur).
2. Impor tiap lembar: `jalankan-vx.mjs impor-artistly <lembar/gambar/hal-NN-k.png> <TAG>_LBR_<X>` (impor pertama bisa timeout; ulangi).
3. Shot `start: {type: BARU}`, `consistent_character: true`, `refs: [{library: "My Artistly Images", name: "<TAG>_LBR_A", peran: "tokoh"}, ...]`. Runner memasang ref pertama di Reference Photo dan kedua di Reference Photo 2: **maks 2 tokoh berlembar per shot**. Image prompt menyebut: "each reference image is a character sheet of ONE person seen from three angles; draw each person exactly once". Contoh: `gpt/productions/KISAH-TIGA-GUA-LEMBAR-UJI-20261121/buat-shots.mjs`.
4. Hasil uji Tiga di Gua: 2 tokoh (A+B) dan 1 tokoh (C) cocok baju, kain kepala, tongkat, tas; tanpa wajah. Catatan: beda tinggi badan kurang terlihat (tulis selisih tinggi di SCENE); satu kandidat wajah polos tampak seperti oval tempelan, pilih kandidat yang natural. Adegan 3+ tokoh: belum diuji (slot ketiga belum diketahui); sementara pakai gambar Artistly PAKAI_ULANG atau pecah menjadi shot 2 tokoh.
5. Pelajaran Pesan Terakhir Ayah (Shorts 2026-11-21, `gpt/productions/KANG-OHAN-PESAN-AYAH-SHORT-20261121`):
   - Tokoh tanpa penutup kepala: tulis `penutup: 'none, ...'`; `skripLembar` membuang baris head covering (kalau ditulis, Artistly menggambar kain di kepala). Di gambar adegan VideoExpress tetap muncul topi/peci di sebagian kandidat: tulis "bare head with his short black hair visible" di pose dan tolak kandidat bertopi.
   - ~~Kamera dikunci jauh di belakang supaya wajah tidak muncul~~ DICABUT 2026-11-22. Mata atau hidung yang muncul saat kamera mendekat berarti acuan tidak punya sudut depan polos. Perbaiki lembar (4 sudut) dan FACELESS LOCK, lalu render ulang.
   - Gambar awal VideoExpress yang paling lama bisa tidak terjangkau picker ("tidak ditemukan di My AI Images") dan `impor-artistly` hanya bisa mengimpor gambar buatan Artistly: buat ulang gambar awal dengan ID adegan baru.
   - `unduh-vx.mjs` menerima label sebagai argumen TERPISAH (bukan dipisah koma).
   - Prompt natural wajib kalimat persis "... exactly as in the start image for the entire video" (gerbang runner).

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

### 4b. Paket ChatGPT `paket.json` (PC-01 2026-11-21: Piring Keempat + Uang Titipan)
- Adapter `apps/artistly-runner/paket-kisah.mjs`: `cek` (VALIDASI.md) -> `lembar` (Artistly, HANYA lembar tokoh) -> `lokasi` (acuan lokasi di VideoExpress; Artistly menggambar kerumunan di acuan lokasi) -> `shots film|shorts` (HANYA=<id> / BATCH=a-b). Semua perubahan atas paket ditulis di `<prod>/penyesuaian.json` dengan alasan (tokoh, pose, gerak, kamera, versi, klip potongan, narasi, `ia_dia`).
- **Per kelompok <= 8 shot: gambar -> tinjau -> pilih.json -> run SEGERA.** Picker VideoExpress hanya menjangkau ~25 gambar terbaru; gambar buatan VideoExpress tidak bisa diimpor ulang. Jangan membuat gambar kelompok lain (termasuk Shorts) sebelum kelompok yang dipilih terkirim. Gambar hilang dari picker -> naikkan `versi` (ID baru SHOT1xx/2xx).
- ~~Close-up tangan tidak dipakai; serah-terima berdampingan membelakangi kamera~~ DICABUT owner 2026-11-22 (kamera dikorbankan, visual membosankan). Pakai `insert`/`ots`/`medium` dengan wajah polos (STANDAR_SINEMATIK). Adapter kini memakai kunci kamera, lembar 4 sudut, `image_type 3d`, FACELESS LOCK tanpa "facing away", dan `sambung` (LAST_FRAME). `cek` menolak kamera "rear/no front view" dan memperingatkan hook lemah, lokasi tanpa establishing, kamera monoton, narasi padat, dan film < 8 menit.
- Adegan ramai (owner 2026-11-22): `paket.figuran.<KEY>` (3-6 profil). `lembar` membuat foto kelompok `<PREFIX>_GRP_<KEY>`, lalu shot `"figuran": "<KEY>"` memakai Reference Photo 1 = lembar tokoh dan Photo 2 = kelompok (STANDAR_SINEMATIK 2c). Ini menggantikan "adegan kelompok = gambar diam".
- Dua orang dari satu lembar sering jadi kembar -> baris ONE PERSON ONLY sudah di adapter; tetap periksa tiap kandidat (kembar, figur di tepi frame, rambut/peci beda dari lembar).
- Tokoh menoleh lalu wajah muncul (CEK_WAJAH): perbaiki acuan/gambar awal/prompt lalu render ulang. Memotong klip hanya untuk membuang detik cacat, bukan cara utama.
- `--paksa` hanya setelah tanda QC gambar dilihat mata; jangan pernah dirangkai otomatis.
- Narasi: cek tiap mp3 narasi-cache dengan Whisper terhadap naskah (per huruf, batas ~0,86) DAN periksa kata pembuka; ElevenLabs sering mengoceh di kata pertama ("Mereka" -> "Durefah", "ia" -> "Ceruya"). Owner: "ia=dia", jangan kaku: ganti kata ganti bila 2x gagal.
- Durasi mengikuti CERITA (owner 2026-11-22): paket yang tipis/buru-buru (dua paket ini ~2:50) dikembalikan atau dikembangkan dulu (setup, konflik bertahap, reaksi, akibat, penjelasan sejarah bersumber) dengan persetujuan owner. Jangan memadatkan cerita, dan jangan mengarang fakta.

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
