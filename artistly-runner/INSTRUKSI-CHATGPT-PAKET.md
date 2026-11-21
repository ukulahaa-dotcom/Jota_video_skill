# INSTRUKSI UNTUK CHATGPT: FORMAT PAKET PRODUKSI KANG OHAN

ChatGPT, kamu menyiapkan paket cerita. Claude (worker di PC) yang memproduksi. Ikuti format ini supaya paket bisa langsung diproduksi tanpa ditebak.

## 1. Lokasi dan nama
- Simpan satu ZIP per episode di: `E:\JOTA-Standby\Jota_Content_Factory\gpt\productions\`
- Nama: `Kang_Ohan_<Judul_Singkat>_HDT_Paket_<YYYYMMDD>.zip` (contoh: `Kang_Ohan_Dua_Kebun_HDT_Paket_20261121.zip`).
- Isi ZIP (UTF-8):
  - `paket.json` (WAJIB, format di bagian 3; inilah yang diproduksi)
  - `HDT_MASTER.md` (storyboard untuk dibaca manusia)
  - `SUMBER.md` (ayat/hadis + rujukan + teks Arab + terjemah; tandai mana FAKTA dan mana DUGAAN/ilustrasi)
  - `METADATA_YOUTUBE.md` (judul, deskripsi, tag, ide thumbnail)
  - `MANIFEST.txt` (daftar file + sha256)

## 2. Aturan isi (wajib)
- **Faceless = wajah polos** (kulit mulus tanpa mata, alis, hidung, mulut), BUKAN wajah disembunyikan. REVISI OWNER 2026-11-22 (FATAL): aturan lama "kamera dari belakang, close-up hanya tangan" DICABUT karena mengorbankan visual (penonton hanya melihat punggung dan langsung pergi). Rencanakan kamera seperti sutradara film: depan, tiga perempat depan, OTS, close-up, low/high angle, tracking, drone. Ikuti `skills/jota-video/references/STANDAR_SINEMATIK_KANG_OHAN.md`.
- **Kolom `kamera` memakai kunci**: `establishing` (eksterior bangunan + jalan), `drone`, `wide`, `medium`, `ots`, `close`, `insert` (tangan + benda), `low`, `high`, `tracking`, `diam`, atau satu kalimat bahasa Inggris yang menyebut ukuran shot + sudut + satu gerak kamera. Setiap lokasi baru dibuka `establishing`/`drone`/`wide`. Tidak boleh 3 shot berturut-turut dengan kamera yang sama.
- **Arsitektur lokasi wajib jelas**: tulis jenis bangunan, fasad, atap, pintu/etalase, bahan dinding, jalan di depannya, dan isi interior yang membedakan (toko = rak barang, etalase kaca, meja kasir, timbangan; rumah = ruang tamu, dapur). Toko jangan sampai terlihat seperti ruang rumah.
- `"sambung": true` pada shot yang melanjutkan aksi shot sebelumnya di tempat yang sama (gambar awal = frame terakhir shot sebelumnya) supaya transisi halus tanpa jump cut.
- Gaya visual satu untuk seluruh channel: **3D realistis sinematik** (kolom `gaya` diabaikan adapter). Jangan menulis "live-action" atau "photorealistic".
- Nabi, Rasul, malaikat, dan hal gaib TIDAK digambarkan. Ucapan Nabi/Rasul disampaikan narator ("beliau bersabda ..."), bukan suara aktor.
- Hanya fakta dari sumber. Peristiwa, dialog, nama, latar yang tidak disebut sumber ditulis sebagai ilustrasi/DUGAAN, bukan dinyatakan sebagai isi Al-Qur'an/hadis.
- Tanpa musik. Tanpa rekaman qari dari internet (hak cipta). Ayat = teks Arab + terjemah di layar, dibacakan terjemahnya oleh narator.
- Satu tokoh atau dua tokoh berlembar per shot (runner hanya punya 2 slot karakter). Adegan 3+ orang: tulis sebagai adegan latar tanpa wajah atau pecah menjadi beberapa shot.
- Gerak: satu aksi per shot, kecepatan nyata 1x. JANGAN pakai kata slow, slowly, slow motion, in unison, in sync, marching, all together.
- Benda yang terlihat jelas: tulis bentuk, ukuran, bahan, warna, jumlah (contoh: "one round clay cup, small, reddish brown").
- Kontinuitas: satu benda milik satu tokoh tidak muncul ganda di frame yang sama.
- Rumus cerita berlabel: HOOK -> SETUP -> CONFLICT -> CLIMAX -> RESOLUTION -> MORAL MESSAGE -> REFLECTION & DISCUSSION.
- Hook 2 detik pertama: klip klimaks bergerak + satu kalimat pelajaran + teks besar.
- Narasi Bahasa Indonesia, enak didengar, tidak terburu-buru. Hitung panjang: sekitar 0,55 detik per kata. Satu shot maksimal 10 detik (sekitar 16 kata); beri ruang napas: adegan reaksi, establishing, dan akibat boleh berisi narasi pendek.
- **Durasi mengikuti cerita, bukan cerita dipadatkan demi durasi** (owner 2026-11-22). Cerita yang utuh = setup yang memperkenalkan tokoh dan dunianya, konflik yang naik bertahap (minimal 3 tahap), klimaks, akibat, hikmah. Jumlah shot mengikuti kebutuhan cerita (tidak dipatok 42).
- Strategi Kang Ohan: Long-form 8-12 menit (target jam tayang), Shorts 30-60 detik. Tiap film panjang menghasilkan 2-3 Shorts (funnel Related Video). Bila sumber cerita terlalu tipis untuk 8 menit, tambahkan penjelasan sejarah/latar/tafsir yang bersumber (ditandai FAKTA), bukan dramatisasi karangan.
- Publikasi OFF. Paket tidak boleh berisi perintah posting, akun, kata sandi, atau token.

## 3. Format `paket.json`
```json
{
  "judul": "Dua Kebun",
  "subjudul": "Ketika Kekayaan Membuat Lupa Diri",
  "sumber": ["QS. Al-Kahfi: 32-44"],
  "label_ilustrasi": "Visual merupakan ilustrasi artistik",
  "gaya": "3D realistic cinematic animation (diabaikan adapter; gaya channel tetap)",
  "tokoh": {
    "A": {"peran": "...", "usia": "about 45", "tubuh": "stocky with a round belly and thick arms", "tinggi": "average height", "kulit": "...", "rambut": "...", "penutup": "... atau none", "pakaian": "potongan, bahan, warna, kondisi (min 5 kata)", "aksesoris": "... atau none", "alas": "..."}
  },
  "lokasi": {
    "KEBUN": {"lokasi": "...", "waktu": "...", "cuaca": "...", "cahaya": "...", "depan": "...", "tengah": "...", "belakang": "...", "detail": "..."}
  },
  "film": [
    {"id": "F01", "babak": "HOOK", "lokasi": "KEBUN", "tokoh": ["A"],
     "pose": "He stands between the fruit trees, chest out, one hand on his hip, his blank smooth face turned up to the sky ... (BAHASA INGGRIS, gambaran frame awal)",
     "kamera": "low",
     "sambung": false,
     "gerak": "satu aksi, Bahasa Inggris",
     "benda": [{"nama": "cup", "detail": "one round clay cup ..."}],
     "narasi": [{"suara": "NARATOR", "teks": "..."}],
     "sfx": "suara alam/benda yang relevan, tanpa musik"}
  ],
  "shorts": [ "... format sama, id S01-S09 ..." ],
  "ayat_layar": [{"surah": 18, "ayat": 32, "arab": "...", "terjemah": "...", "rujukan": "Kemenag"}],
  "penutup": ["kalimat hikmah singkat", "rujukan singkat"],
  "suara": {"NARATOR": "narator", "TOKOH_A": "pria_penguasa"}
}
```
- `tokoh` dan `lokasi`: tulis dalam Bahasa Inggris, lengkap semua kolom (sistem menolak kolom kosong; tiap orang harus beda tubuh, tinggi, kulit, usia, pakaian).
- `narasi[].suara`: NARATOR atau kunci tokoh. Pilihan suara tokoh: pemuda_baik, pemuda_emosi, pemuda_teman, pemuda_rakyat, pria_bijak, kakek, kakek_renta, pria_penguasa, pria_kasar, wanita_dewasa, wanita_muda, wanita_2, anak. Bila dialog adalah kutipan ayat, utamakan narator ("Ia berkata, ...").
- `ayat_layar`: teks Arab dan terjemah wajib dari sumber resmi dan ditandai "perlu dicek ustadz".

## 4. Yang dikerjakan Claude setelah ZIP masuk
Validasi paket -> lembar karakter satu file per tokoh -> gambar awal + QC wajah -> klip VideoExpress per kelompok -> QC klip -> rakit (ElevenLabs, SFX, teks, panel ayat) -> QC akhir -> Google Drive + versi HP + laporan QC. Kekurangan paket dilaporkan, tidak dikarang.
