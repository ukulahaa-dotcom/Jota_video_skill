# Benchmark tokoh faceless (wajah polos) — 2026-11-07

Diminta owner 18:36 WIB: "benchmark video user untuk membuat faceless, cari di seluruh youtube, study, simpulkan". Disusun Claude.

## Cara riset dan batasnya
- Pencarian YouTube lewat runner (`jota-studi-youtube`, yt-dlp ytsearch, 10 kata kunci, 146 hasil; daftar di rilis privat `studi-youtube/faceless1.tgz`).
- Subtitle YouTube **tidak bisa diambil** dari runner (YouTube meminta login anti-bot) dan kredit vidIQ habis, jadi isi tutorial dibaca lewat artikel teknik, bukan transkrip video. Bahan yang ditonton langsung: Reels "Galery Faceless" (24 detik, 102 rb views, diunduh runner) dan semua hasil produksi JOTA hari ini.
- Catatan istilah: di YouTube "faceless" kebanyakan berarti **kanal tanpa wajah kreator** (stickman, kartun anak, kisah Alkitab), bukan tokoh berwajah polos. Kanal tokoh berwajah polos sungguhan sedikit dan hampir semuanya kanal Islami (little muslim lab "Faceless Animation", GoodDeed Kids, Galery Faceless/Musafir Ilmu, tutorial Meywulanda "Animasi Muslimah 3D Faceless").

## Temuan yang dipakai JOTA

### A. Gambar acuan menentukan wajah (terbukti hari ini)
1. **Acuan wajib ada untuk tokoh dewasa.** Lampu Teras 05C tanpa acuan Aba: VideoExpress menggambar wajah lengkap (mata, hidung, mulut). Dengan acuan, wajah polos bertahan.
2. **Acuan tidak boleh berjenggot/berkumis.** Acuan "Aba" lama berjenggot: mesin membaca jenggot sebagai mulut dan menambah hidung serta mata (Ranting, Lampu, Catatan, 2026-11-07). Pengganti: `Aba_polos`.
3. **Acuan yang baik** (artikel Kling/Neolemon/Atlas, cocok dengan tutorial Alex VideoExpress): satu tokoh, badan penuh, tampak depan, cahaya rata, latar polos terang, wajah polos terlihat jelas, baju sederhana warna solid. Bayangan gelap di wajah dibaca mesin sebagai fitur wajah.
4. **Teks tidak boleh bertentangan dengan foto.** Kalau prompt menulis ciri yang tidak ada di foto (atau sebaliknya), mesin mencampur keduanya dan wajah/tokoh bergeser. Kunci penampilan di tokoh.json harus sama persis dengan foto acuannya.

### B. Gerak dan kamera
5. Klip pendek, satu aksi sederhana, kamera pelan satu arah. Wajah paling sering "tumbuh" di tengah gerak panjang.
6. Hindari close-up wajah, menunduk, dan putaran kepala besar (sudah di SKILL bagian 5); artikel Kling menyebut hal yang sama.
7. **Adegan malam/gelap berisiko**: Lampu Teras (malam, cahaya samping keras) memunculkan wajah paling banyak. Untuk tokoh di adegan gelap: cahaya hangat merata di wajah, bukan bayangan setengah wajah.

### C. Gaya visual
8. **Makin stilistis makin aman.** Gaya papercraft/flat (Galery Faceless) dan manekin (Sayan Roy) jarang memunculkan wajah, karena mesin tidak "berharap" ada wajah realistis. Gaya Pixar realistis paling sering memunculkan wajah pada pria dewasa. Seri baru boleh memakai papercraft untuk doa/hikmah.
9. Teks di layar dipasang lewat Remotion, bukan digambar AI (Galery Faceless salah ketik: "YAMIG KARUS", "TADAK DAPAT").

### D. Konsistensi antarshot
10. Rantai klip dari frame terakhir untuk adegan yang sama, acuan tokoh dipasang di setiap klip BARU.
11. Label kartu unik per produksi ulang (tag baru) dan rakit lokal dari klip per label; timeline proyek VideoExpress bernama sama menyimpan klip lama.

## Format yang laku (untuk ide konten)
- Doa pendek papercraft 20-30 detik, satu frasa satu metafora benda (Galery Faceless, 102 rb views).
- Kisah anak Islami faceless (little muslim lab), nasyid anak faceless.
- Kategori besar non-Islami: stickman edukasi, kisah Alkitab animasi (MonsGuide 381 rb), kartun anak ("FACELESS AI Animated Videos for Kids", 431 rb).

## Sumber
- Pencarian YouTube runner 2026-11-07 (rilis privat studi-youtube).
- Neolemon, "Kling AI and Grok AI Character Consistency Tips (2026)".
- Atlas Cloud, "Solving Character Inconsistency: Kling 3.0 Image-to-Video".
- DEV Community ref_vid, "How we keep one character's face the same across AI video shots".
- Tutorial VideoExpress (Alex, Sayan Roy) yang sudah ada di SCENE_WORKFLOW.md dan FACELESS_CHARACTER.md.
- Reels Galery Faceless (rilis privat studi-reels).
