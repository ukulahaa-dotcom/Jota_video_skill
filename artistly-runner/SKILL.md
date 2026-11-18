---
name: artistly-runner
version: 1.9.0
description: Menjalankan Artistly (storybook, komik balon kata, puzzle, coloring book, desain, peta UI) di PC Windows E:\JOTA-Standby lewat apps/artistly-runner/artistly.mjs untuk produk digital, dan video kisah standar emas (Artistly + QC lokal + VideoExpress + narasi ElevenLabs) untuk YouTube, Facebook, Instagram. Baca sebelum mengubah artistly.mjs, menulis resep atau naskah, atau menjalankan Artistly.
---

# Artistly Runner

## STANDAR EMAS VIDEO KISAH (owner 2026-11-16)

Owner: workflow Artistly + VideoExpress "dahsyat", konsistensi Artistly bagus, jadikan contoh untuk semua kisah lain; target monetisasi YouTube, Facebook, Instagram.
**1.9.0 (2026-11-18, Kisah Dzulqarnain):** QC otomatis paralel FIFO (`unduh-vx.mjs --tunggu --qc`, `qc-klip.mjs`, VLM llama-server GPU, filter buram), gerbang QC gambar + impor ulang otomatis di `jalankan-vx.mjs run`, QC suara Whisper (`qc-suara.py`, cek lafal narasi otomatis di `motion-kisah.py`), aturan arah gerak = arah hadap, pose = pose gambar, tokoh utama gagah (bukan boneka), kepala searah badan. Detail di RESEP_KISAH.md.

**Setiap video kisah baru mengikuti [RESEP_KISAH.md](RESEP_KISAH.md)** dengan Kisah Qarun sebagai acuan:
naskah bersumber -> gambar Artistly (`produksi-gambar.mjs`, QC lokal) -> impor ke VideoExpress -> klip `PAKAI_ULANG` dari My Artistly Images -> QC wajah frame klip -> `motion-kisah.py` (narator ElevenLabs, caption karaoke, suara klip) -> cek ustadz -> paket upload (owner yang upload).
Agen tidak membuat tokoh langsung di VideoExpress untuk kisah; tokoh selalu dari gambar Artistly yang lolos QC.

Sumber pengetahuan di file ini hanya tiga: hasil uji di akun owner (dengan tanggal dan kode kejadian), `PETA_ARTISTLY.md` hasil `node artistly.mjs peta`, dan `PETA_LENGKAP.md` hasil `node peta-lengkap.mjs`. Fitur yang belum tercatat di sini dipetakan dulu, tidak ditebak.

## Keputusan owner 2026-11-15

- **GitHub tidak dipakai lagi** (akun owner kena suspend). Workflow `artistly-runner`, secret `ARTISTLY_EMAIL`/`ARTISTLY_PASSWORD`, dan `gh api` di bawah hanya catatan sejarah. Commit hanya lokal, tidak ada push.
- **Pembagian mesin**: PC Windows (`E:\JOTA-Standby`) khusus Artistly; Mac memegang VideoExpress. Artistly tidak dijalankan di Mac supaya satu akun tidak dipakai dua mesin.
- **Tujuan**: Runner bisa mengoperasikan semua menu Artistly untuk membuat produk digital yang dijual di Lynk, Amazon (KDP), Tokopedia, Shopee, dan platform sejenis.
- **Batas jualan**: Runner berhenti di "paket siap upload" (file produk, cover, mockup, judul, deskripsi, tag per platform). Upload dan publish listing dilakukan owner sendiri; Runner tidak login ke marketplace mana pun.
- Lisensi akun (peta 2026-11-15, My Purchases): **Artistly Unlimited (Full Pay)** dan **Niche Finder**. Isi hak komersialnya belum dibaca (`Check Details`); owner memastikan sebelum produk pertama dijual. Amazon KDP mewajibkan deklarasi konten AI saat upload.

## PC Windows (2026-11-15)

- Profil login: `apps/artistly-runner/profile`. Login ulang oleh owner: `E:\JOTA-Standby\JOTA.cmd login-artistly`, login sampai dashboard, lalu tutup jendela Chrome (tombol X; pesan "Cmd+Q" berasal dari Mac). Sesi pernah habis dalam sekitar 11 jam (terverifikasi 19:44 WIB, ditolak 23:40 WIB 2026-11-14).
- `jota.mjs artistly` hanya mengizinkan `login, list, komik, storybook, gambar-v6, peta-gambar`. `peta` dan `peta-lengkap` dijalankan langsung dengan node portable `E:\JOTA-Standby\tools\node\node-v22.23.5-win-x64\node.exe`; isi `JOTA_RUNNER_LOCAL=E:\JOTA-Standby\Jota_runner\local` supaya memakai kunci `artistly` yang sama.
- `peta-lengkap.mjs` hanya membaca: membuka tiap alat dan kartu kategori, mencatat kolom/tombol/kartu plus screenshot. Tidak pernah klik Generate, Save, Delete, Share, Download, Upload, Train, atau Buy, dan tidak mengisi kolom. Hasil di `qc/peta-lengkap/`; salinan terakhir `skills/artistly-runner/PETA_LENGKAP.md`.
- Belum ada generasi live di PC (`generation_submitted: false`). Fitur baru dianggap TESTED hanya setelah satu uji kecil Private dan owner menilai hasilnya.

## Instalasi Mac 2026-11-11

Login profil Artistly lokal sudah diverifikasi; generasi live2gambar Private V6 berhasil, dependensi Playwright/Pillow/OpenCV dan perakit komik PDF lokal TESTED. Jalur resmi Mac melalui Jota_runner/local/jota.mjs artistly, terpisah dari profil VideoExpress. Output staging, tanpa unggah otomatis. Baca [MAC_RUNTIME.md](../jota-video/references/MAC_RUNTIME.md). Login dan PDF sintetis bukan bukti generasi storybook live; batas resep dan kegagalan historis di bawah tetap berlaku.

## Jalur

- **Terpisah dari VideoExpress** (owner 2026-11-04): kode di `apps/artistly-runner/` (paket, profil browser `ARTISTLY_PROFILE`, salinan `upload-drive.mjs` sendiri), workflow `artistly-runner`. Perubahan di sini tidak menyentuh `apps/videoexpress-runner/` dan tidak membangunkan Runner VideoExpress di Mac.
- **Tidak ada hasil ke Drive sebelum dicek** (owner 2026-11-04, setelah KOMIK-H01): komik hanya di-commit ke folder naskahnya; agen melihat `pratinjau-gambar.jpg` dan halaman komik, owner menyetujui, baru diunggah.

- (Sejarah, tidak berlaku sejak 2026-11-15) Workflow `artistly-runner` (tab Actions atau `gh api .../actions/workflows/artistly-runner.yml/dispatches`). Server GitHub, headless, login otomatis dengan secret `ARTISTLY_EMAIL` dan `ARTISTLY_PASSWORD` (diisi owner sendiri 2026-11-04; login lolos percobaan pertama). Agen tidak pernah meminta, mengetik, atau mencetak password.
- Mode:
  - `peta`: hanya membaca. Mencatat dashboard, semua tautan fitur, form tiap alat Storybook Studio, Personal Designs. Hasil `skills/artistly-runner/PETA_ARTISTLY.md` (di-commit otomatis).
  - `storybook`: satu buku dari ide (Idea To Illustrated Book) sampai PDF dan `pratinjau.jpg`, ke Drive `Video JOTA/Storybook <nama> <tanggal>/` dan artefak. Data anak pembeli hanya lewat input workflow, tidak di repo.
  - `komik`: naskah di repo (tokoh serial fiksi) sampai PDF komik. `naskah` boleh beberapa path dipisah koma: semua Generate dikirim dulu, lalu diambil. `ambil_saja=1` mengambil buku terbaru tanpa Generate. Gambar yang sudah ada di `gambar/` tidak dibuat ulang; naskah cukup diedit lalu dijalankan lagi untuk merakit ulang balon.
  - `peta-lengkap` (`node peta-lengkap.mjs`): hanya membaca, semua alat dan sub-alat. Lihat bagian PC Windows.
- PC Windows (utama sejak 2026-11-15): `node artistly.mjs login` sekali lewat `JOTA.cmd login-artistly`, lalu perintah yang sama tanpa `JOTA_CI`. Mac tidak menjalankan Artistly lagi.

## Pengetahuan pasti (uji 2026-11-04)

| Hal | Temuan |
|---|---|
| Popup | Tawaran MFA (`Not today`, `Turn on`) dan panel `Latest Updates` (`Close`) menutupi tombol; klik timeout. `tutupPopup()` dijalankan setelah setiap pindah halaman. |
| Storybook Studio | Alat berupa tombol (bukan tautan) di `https://app.artistly.ai/ai/ai-storybook-studio`: v7 Idea To Illustrated Book, v7 Script To Storybook, Idea To Storybook, Multi-Character Storybook, Coloring Books, Script To Storybook V2, Personalized Alphabet Book, Personalized Name Bedtime Storybook. |
| Script To Storybook | Character Source `Use Reference Photo` (1 sampai 4 foto, urut sesuai tokoh pertama muncul di naskah) atau `AI Character`; `Book Format` Dual atau Single Page Layout; `Story Script` berbahasa Inggris, maks 5000 huruf, "page breaks are chosen automatically" (jumlah gambar bisa beda dari jumlah halaman naskah); `Dimensions` default 1:1 (1024 x 1024); `Book Details (Optional)`; tombol `Generate`. |
| Kirim | Setelah `Generate`, tombol menjadi `Submitting...` dengan progres persen (unggah foto). **Pindah halaman sebelum selesai membatalkan kiriman** (kejadian KOMIK-H01 05:51: berhenti di 11%, tidak ada buku). Runner menunggu sampai selesai, maks 15 menit. |
| Personal Designs | Filter `Script to Storybook` ikut memuat buku lama dari alat lain (KOMIK-H01 05:45: terambil buku lama "Super Max Adventure" yang berwajah). Buku dikenali per folder URL gambar: folder yang belum ada sebelum kirim = buku baru, terbaru tampil dulu. |
| Gambar | Tiap halaman punya `<id>-caption.png` (dengan teks cerita) dan `<id>.png` (polos). Komik memakai yang polos. |
| Faceless | `AI Character` dan Artistly Fast pernah menggambar wajah (benchmark 2026-10-25, buku lama di akun). Hasil `Use Reference Photo` dengan foto acuan faceless belum teruji; setiap komik dicek owner lewat `pratinjau-gambar.jpg` sebelum dipakai. |

## Katalog alat (peta lengkap 2026-11-15, belum ada yang diuji generate kecuali tercatat)

Kolom hasil peta; batas angka dari atribut form. "Unggah" = input file Drag & Drop.

| Alat (URL) | Sub-alat dan kolom | Produk jualan |
|---|---|---|
| Kids Puzzles (`/ai/kids-puzzles`) | Word Search (Words, Words per Puzzle 6 sampai 10, Difficulty Easy/Hard/Very Hard, Solution Color); Spot the Difference (Idea maks 200, halaman 1 sampai 25); Shadow Matching (Idea, halaman 1 sampai 25, Book/Text Color); Crossword (Theme maks 100, halaman 1 sampai 25); Counting Numbers (Idea, halaman 1 sampai 25, Page Title opsional); Bi-Lingual Word to Image Matching (Idea, halaman 1 sampai 25, warna, Language termasuk Arabic, Indonesian, Malay); Sudoku (halaman 1 sampai 50, Easy 4x4/Medium 9x9/Hard 16x16); Complete the Word; Spot the Correct Spelling; Activity Book Builder (Title, unggah, nomor halaman); Logic Puzzle For Adults (Title, Theme, 1 sampai 25 puzzle, grid 3/4/5, level, difficulty) | Buku aktivitas KDP, PDF printable Lynk/Shopee/Tokopedia |
| AI Design Agents (`/ai/ai-design-agents`) | Clip Art (prompt); Coloring Page (prompt); T-shirt Designs (kategori); Youtube Thumbnails; Book Cover (Title, Author, Genre, Theme, Imagery, Color Scheme); Seamless Patterns (Style); Soulmate Sketch; Wall Art Sketch (Style); Music Storyboard (unggah, Style maks 150); Cookbook Creator (Recipe Idea, Title maks 100, warna, unggah); Joke Book for Kids (Theme, Title, halaman 1 sampai 25, unggah); Coloring Book Advance (Title, Theme, halaman 1 sampai 30, Reference Prompt maks 1000, unggah) | Coloring book, joke book, cookbook, cover KDP, clipart bundle, wall art |
| AI Design Assistants (`/ai/ai-design-assistants`) | Unggah satu gambar: Product Holding, Mockup Creator, Product Photos, AI Portrait, AI Upscaler, Custom Upscaler, Photo Editor, Sketch to 3D Render, Text Editor, AI Stylizer, Colorify Pages, Photo to Coloring Page, Character Sheet; Merch Magic (dua unggahan); Character Creator (Quantity); Storybook Illustrator (prompt); Pinterest Pin Creator (URL pin); Aspect Ratio Calculator (inci) | Mockup dan foto listing, upscale untuk cetak |
| AI Image Designer v6 (`/ai/image-designer-v6`) | Kategori: Create From Prompt, v4 Image Designer (`/ai/ai-image-designer`, Prompt Enhancer), Perfect Text BETA, Artistic Designer (V1/V2), Photorealism, Animal, Seamless Patterns (V1/V2), Logo, T-Shirt Designs, Social Media Posts, Poster Maker, Sticker, Cards & Invites. Form tiap kategori belum terbaca; mode `gambar-v6` sudah ada | Poster, sticker, kartu undangan, kaos |
| AI Storybook Studio (`/ai/ai-storybook-studio`) | Lihat Pengetahuan pasti. Alat berupa tombol; peta lengkap gagal mengkliknya, form v7 Idea/Script dari peta 2026-11-14 | Buku cerita anak, buku nama anak (custom order) |
| Consistent Characters (`/ai/consistent-characters`) | Realistic Images, 3d & 2d Style Images (unggah), Multi-consistent Characters (dua unggahan) | Tokoh serial komik dan buku |
| AI Art Illustrator (`/ai/ai-illustrator`) | Daftar gaya (A-Z, favorit); form per gaya belum terbaca | Ilustrasi |
| AI Bulk Actions (`/ai/ai-workflow`) | `Create New Action`; belum dipetakan lebih dalam | Produksi massal |
| Flipbooks (`/flipbook`) | Create New (dari Personal Designs), Read, Affiliate Link | Flipbook digital |
| Editor lanjutan | Advanced AI Image Designer membuka `editor.artistly.ai` (editor berlapis) | Edit akhir |

Fitur baru di dashboard (Inpainting, Smart Image Expander, Instant Scene, Magic Merch, Train Your Own Photos) adalah tautan `dashboard#` tanpa halaman sendiri; Magic Merch tersedia sebagai Merch Magic di AI Design Assistants.

## Urutan mengajarkan (usulan 2026-11-15)

1. Kids Puzzles dan Coloring Book Advance: tanpa tokoh atau wajah, kolom sederhana, hasil PDF siap jual (KDP, Lynk).
2. Merch Magic, Mockup Creator, dan AI Upscaler: foto listing untuk produk no. 1.
3. Book Cover: cover KDP.
4. Storybook dan komik (sudah ada mode), lalu Personalized Name Bedtime Storybook untuk pesanan custom; tetap cek faceless.
5. Image Designer v6 (sticker, poster, kaos), Seamless Patterns, Clip Art.

Tiap alat: peta form sampai tombol Generate, satu uji kecil Private, owner menilai, lalu resep di `recipes/` dan baris di tabel Pengetahuan pasti.

## Komik lewat Image Designer v6 (TESTED di PC 2026-11-15, KOMIK-HIKMAH-SENYUM-20261115)

Jalur komik yang berhasil, menggantikan Script To Storybook yang selalu gagal dikirim:
1. `naskah.json` berisi satu prompt per gambar (halaman 1 = sampul), `kategori_v6: "Artistic Designer V2"`. Tiap prompt: gaya + kalimat faceless + "no text, no speech bubbles" + area atas kosong untuk balon + kunci pakaian setiap tokoh ditulis lengkap (tanpa acuan foto, konsistensi tokoh tetap baik).
2. `gambar-v6` (lewat `jota.mjs artistly gambar-v6 <naskah>`): 9 prompt selesai sekitar 8 menit, 2 gambar per prompt, 768x1344 (WEBP walau berakhiran .png).
3. Agen memeriksa setiap wajah dengan memotong dan memperbesar kepala: di uji pertama 2 dari 18 gambar berwajah (hal-09-1 Kakek tersenyum, hal-03-1 Umair bermulut). Yang berwajah tidak dipakai.
4. `naskah-rakit.json` ditulis langsung (sampul, halaman `baris: [2,2]`, halaman `teks`) dengan `"gaya_balon": "halus"`, lalu `python komik-render.py naskah-rakit.json` dari venv.
5. **Balon wajib diberi `x`, `y`, `ke` manual.** Penempatan otomatis menabrak narasi, menutup kepala, dan menunjuk tokoh yang salah (deteksi kulit menganggap kepala tokoh lain). Lihat halaman hasil, geser, render ulang (render sekitar 10 detik).
- Gaya `halus`: oval antialias, ekor melengkung ke pembicara, awan untuk `pikir`, ledakan krem untuk `teriak`, kotak narasi kuning, bayangan tipis. Tanpa `gaya_balon` tetap gaya lama.
- Urutan baca: balon pertama paling atas/kiri. Maks 2 balon per panel; satu balon lebih rapi bila ruang sempit.
- Sesi login Artistly di PC habis dalam 5 sampai 11 jam; owner login ulang dengan `JOTA.cmd login-artistly`.
- **Tinggi tokoh harus konsisten** (owner 2026-11-15, komik SENYUM: Umair terlihat lebih tinggi di beberapa panel, misalnya sampai bahu Uwais). Untuk komik berikutnya:
  - Prompt menulis tinggi dalam cm dan patokan tubuh untuk setiap pasangan tokoh yang muncul bersama, misalnya "Umair 120 cm, the top of his head reaches only Uwais's lower chest; Uwais 160 cm". Patokan diulang di adegan, bukan hanya di deskripsi tokoh.
  - Hindari sudut kamera yang mengacaukan skala (tokoh kecil di depan, tokoh besar jauh di belakang); minta "both standing on the same ground level, full bodies, side by side".
  - Saat memilih gambar, agen membandingkan tinggi kepala tokoh di setiap panel dengan panel lain dan dengan aturan cm; gambar yang selisihnya kelihatan (misalnya anak 8 tahun sampai bahu kakaknya) ditolak seperti gambar berwajah.
- Keluaran Artistly disimpan di Drive jotaauto1 `G:\My Drive\2. Artistly JOTA\<judul> <tanggal>\` (Drive for desktop di PC) setelah owner menyetujui; cek ada di server lewat konektor Google Drive.

## Preset gaya komik (2026-11-15, `apps/artistly-runner/komik-gaya.json`)

**Pilihan owner 2026-11-15: komik berikutnya memakai `superhero-amerika`.** Owner minta pilihan gaya seperti komik terkenal. Tujuh preset awal: `3d-animasi` (default), `superhero-amerika`, `manga`, `ligne-claire`, `komik-indonesia-klasik`, `webtoon`, `chibi-anak`. Lembar contoh: `gpt/artistly/CONTOH-GAYA-KOMIK-20261115/PILIHAN-GAYA-KOMIK.jpg`.
- Pakai: `"gaya": "<kunci>"` di `naskah.json` (gambar-v6 menambah `prompt` + `wajib` di depan dan `akhir` di belakang setiap script; script cukup CHARACTERS dan SCENE) dan di `naskah-rakit.json` (perakit memakai font, bentuk balon, warna narasi, latar, pita, garis panel, sudut, abu-abu dari `render`; `gaya_balon` otomatis `halus`).
- Prompt tidak menyebut merek, judul, atau tokoh penerbit (Marvel, DC, Tintin, dsb.); hanya ciri genre (tinta tebal, halftone, screentone, dll.).
- Kategori v6 tetap **Artistic Designer V2**. Uji 2026-11-15: kategori `Artistic Designer` (V1) memberi gaya komik paling kuat tetapi menggambar mata dan mulut serta balon kosong, jadi ditolak; `Create From Prompt` punya form lain (textarea tidak ditemukan, gagal aman tanpa Generate).
- Di V2 gaya superhero dan manga baru terasa setelah prompt tegas "2D, NOT 3D, NOT painterly" / "monochrome, zero color" plus `akhir` pengingat. Manga V2 masih menyisakan warna pada tokoh; `render.abu: true` membuat panel hitam putih. `ligne-claire`, `komik-indonesia-klasik`, dan `webtoon` hasilnya masih mirip satu sama lain; bedanya terutama di tampilan halaman dan balon.
- Tambahan 2026-11-15 dari dokumen owner "preset-produksi-komik": `kartun-klasik` (pilihan awal komik humor IG), `minimalis-doodle` (humor singkat, produksi cepat), `retro-pop-art` (poster, merch, promosi). Total 10 preset. TESTED 2026-11-16 (`CONTOH-GAYA-KOMIK-20261115/putaran4-preset-baru`, lewat `produksi-gambar.mjs`, 6 gambar 3 menit + QC 5 menit): keenam gambar faceless, tinggi Umair sebatas dada Uwais; kartun-klasik flat hangat, minimalis-doodle garis tipis di latar krem (aksen jingga tidak selalu muncul), retro-pop-art paling khas (sunburst, halftone, merah-kuning-biru). Satu CEK palsu: YOLO menghitung 1 orang padahal 2. Dokumen itu menekankan alis, mata, dan mulut ekspresif; bagian itu dibuang dan diganti gestur dan pose karena aturan faceless.
- Peta dokumen owner ke preset JOTA: KARTUN_KLASIK = `kartun-klasik`, MANGA_CHIBI = `chibi-anak` (atau `manga` bila hitam putih), WEBTOON_MODERN = `webtoon`, KOMIK_AMERIKA = `superhero-amerika`, MINIMALIS_DOODLE = `minimalis-doodle`, RETRO_POP_ART = `retro-pop-art`.

## Paket produksi komik (dari dokumen owner, wajib sebelum generate)

Sebelum menulis `naskah.json`, susun dan simpan di `naskah.md` folder episode:
1. Judul + premis satu kalimat; spesifikasi (preset, format, jumlah panel, target pembaca). Default komik IG: humor keseharian islami, 4 panel, `ig-4x5`.
2. **CHARACTER LOCK** per tokoh: nama, usia tampak, tinggi relatif (Umair setinggi dada Uwais, Uwais setinggi bahu Kakek), rambut, warna kulit, pakaian dan warnanya, aksesori, ciri khas. Wajah selalu kosong (faceless). Tempel blok ini utuh ke setiap prompt panel.
3. **LOCATION LOCK**: tata letak tempat, properti utama dan warnanya, waktu, pencahayaan. Posisi properti berkesinambungan antarpanel.
4. Storyboard per panel: fungsi panel (komik humor 4 panel: pengenalan, perkembangan, kejutan, punchline), ukuran shot dan sudut kamera, aksi dan gestur, properti, dialog persis dan pembicaranya, posisi balon.
5. Aturan teks: maksimal 2 balon per panel, maksimal 12 kata per balon, urutan baca kiri ke kanan lalu atas ke bawah, ekor ke pembicara, balon tidak menutupi kepala, tangan, atau aksi. Jangan menjelaskan ulang lelucon setelah punchline.
6. Prompt ilustrasi berbahasa Inggris, tanpa tulisan (gambar-v6 sudah menambah preset + `wajib`); dialog hanya di `naskah-rakit.json`.
7. Cek akhir: konsistensi tokoh, kesinambungan properti, keterbacaan dialog, kejelasan punchline.

## Komik IG (2026-11-15, TESTED render)

- `naskah-rakit.json`: `"ukuran": "ig-4x5"` (1080x1350, disarankan) atau `"ig-1x1"` (1080x1080), satu halaman `baris [2, 2]` + `judul_halaman`. Keluaran `halaman-NN.jpg` siap posting.
- Perakit merender 1.5x lalu memperkecil, jadi teks balon lebih besar dari versi A4 dan terbaca di HP (uji dengan panel KUAT).
- `ig-1x1` memotong atas-bawah gambar 9:16: kepala tokoh dan balon bisa terpotong. Atur ulang `fokus` dan `x/y` balon per panel, atau pakai `ig-4x5`.
- `"tanda": "@akun"` menulis nama akun kecil di pojok kanan bawah. Nama akun IG ditentukan owner (belum ada); jangan mengarang.
- Carousel promosi produk: contoh `BUKU-UMAIR-PAHLAWAN-20261115/buat-carousel.py` (8 slide 1080x1350: hook, twist, tokoh, isi, contoh, hadis, bonus, ajakan beli + `CAPTION-IG.md`). Harga tidak ditulis di slide.

## Produksi gambar + QC otomatis (2026-11-16): `produksi-gambar.mjs`

Jalur utama gambar di PC sejak 2026-11-16, menggantikan QC manual oleh agen (hemat token):
```
node apps/artistly-runner/produksi-gambar.mjs <folder>/naskah.json [--ulang 2] [--tanpa-generate]
```
1. `jalankan-mode.mjs gambar-v6` (kunci `artistly` yang sama dengan jota.mjs). Bila log berisi "minta login": berhenti, owner login.
2. QC per gambar baru (cache per sha256 di `gambar/qc.json`): YOLO hitung orang + potong kepala, Qwen3-VL per kepala (wajah), Qwen3-VL gambar utuh (balon/tulisan, kostum, hitung orang).
3. Status: **TOLAK** = ada wajah, balon/tulisan, kostum superhero, atau YOLO DAN VLM sama-sama menghitung orang lebih dari "Exactly N people" di prompt. **CEK** = hitungan YOLO dan VLM berbeda, orang kurang, atau QC error. Selain itu **LULUS**.
4. Pilihan per halaman (`qc.json` `pilih`): LULUS dulu, lalu CEK. Halaman yang semua gambarnya TOLAK dipindah ke `gambar/ditolak/` (nama -vRRR) lalu digenerate ulang, maksimal `--ulang` putaran (default 2).
5. `gambar/tinjau-qc.jpg`: lembar berlabel untuk owner/agen. Agen cukup melihat lembar ini (satu gambar) dan memeriksa yang CEK, bukan memotong setiap kepala.
- Uji `--tanpa-generate` pada komik KUAT (18 gambar, 15.5 menit): keempat penolakan manual tertangkap (wajah 01-1 dan 09-2, balon kosong 02-1 dan 07-1); pilihan halaman cocok dengan pilihan manual atau gambar lain yang juga lolos. Jalur generate live TESTED 2026-11-16 (3 preset baru: generate, QC, lembar). Generate ulang otomatis belum pernah terpicu (belum ada halaman yang semua gambarnya TOLAK).
- Yang tetap dinilai manusia: tinggi tokoh, warna properti, kesesuaian adegan dengan naskah, dan semua gambar CEK.

## Motion comic lokal (TESTED 2026-11-16, KOMIK-IG-SANDAL-20261116): `motion-komik.py`

Tanpa VideoExpress, tanpa akun, tanpa token (owner setuju 2026-11-16; VideoExpress tetap di Mac untuk animasi AI bila nanti perlu).
- `python motion-komik.py motion.json` (`rakit`, `judul`, `subjudul`, `penutup`, `durasi` per panel, `keluaran`). Memakai panel dari `naskah-rakit.json` komik yang sama; balon `koordinat: gambar` langsung berlaku karena gambar v6 sudah 9:16.
- Hasil MP4 1080x1920 30 fps H.264 (track audio senyap): kartu judul 2.2 detik, tiap panel zoom/geser pelan, balon muncul setelah 0.55 detik, crossfade 0.3 detik, kartu "Pesan Hikmah" 3.5 detik. Komik 4 panel = sekitar 22 detik, render sekitar 1 menit.
- Renderer: ukuran `shorts-9x16` (satu panel penuh tanpa margin). Huruf balon dikali 1.7 (`JOTA_SKALA_HURUF`); ukuran asli terlalu kecil di HP.
- ffmpeg: `E:\JOTA-Standby\tools\ffmpeg\ffmpeg-9.0.2-essentials_build\bin\ffmpeg.exe`.
- Suara (2026-11-16): `"suara": {"aktif": true, "tokoh": {"umair": {"nada": 1.25}, ...}, "dialog": [[{"tokoh", "teks"}], ...]}` per panel. TTS lokal Piper `id_ID-news_tts-medium` (satu suara dewasa, `E:\JOTA-Standby\models\piper`, paket `piper-tts` di venv). Suara anak dibuat dengan menaikkan nada (asetrate + atempo, tempo tetap). Durasi panel memanjang mengikuti panjang dialog; kartu penutup dibacakan narator ("Pesan hikmah. ..."). Sandal: 26.9 detik. Kualitas suara belum dinilai owner; agen tidak bisa mendengar, jadi selalu minta owner menilai.
- Owner 2026-11-16: suara Piper "kayak robot dan tidak natural". Mesin baru `"mesin": "edge"` (paket `edge-tts`, online, gratis, tidak resmi untuk komersial): Uwais `id-ID-ArdiNeural` pitch +12Hz rate +5%, Umair `id-ID-GadisNeural` pitch +35Hz rate +8%, narator Ardi -4Hz -5%. Hening awal/akhir tiap klip dipotong. Hanya teks dialog fiksi yang dikirim ke Microsoft. Sandal versi edge: 28 detik, menunggu penilaian owner.
- Owner 2026-11-16: Edge TTS "masih kurang". Mesin utama sekarang `"mesin": "elevenlabs"` (akun owner, `apps/artistly-runner/elevenlabs.py`, model `eleven_multilingual_v2`). API key diisi owner sendiri sebagai env User `ELEVENLABS_API_KEY` (dibaca juga dari HKCU\Environment); agen tidak pernah meminta, mencetak, atau menyimpan key. Key yang dipakai belum punya izin `user_read`, jadi `elevenlabs.py kuota` ditolak (TTS dan daftar suara jalan). Key yang benar diawali `sk_` (owner sempat menyimpan ID key).
  - Suara di akun: klon **Umair** `tiTQYEsBKdlGkbqhomam` (untuk Umair), `JOTA Dakocan - Expressive` `plgKUYgnlZ1DCNh54DwJ` (Uwais), `JOTA Putra - Smooth, Clear` `RWiGLY9uXI70QL540WNd` (narator), plus banyak suara id lain (`python elevenlabs.py suara`).
  - Video komersial butuh paket berbayar ElevenLabs. Sandal versi ElevenLabs 26 detik, menunggu penilaian owner.
- Musik belum ada: pakai pustaka lagu bebas royalti bawaan platform saat upload.

## Video narasi kisah (TESTED 2026-11-16, KISAH-QARUN-20261116): `motion-kisah.py`

- `naskah.md` (sumber ayat/hadis, batasan, lock, tabel adegan + narasi) -> `naskah.json` (prompt per adegan, `gaya`) -> `produksi-gambar.mjs` -> `kisah.json` -> `python motion-kisah.py kisah.json`.
- `kisah.json`: `adegan` [{`hal` (pakai pilihan qc.json) atau `gambar`, `narasi`}], `narator` (voice_id ElevenLabs), `judul`, `subjudul`, `penutup`, `keluaran`.
- Narator ElevenLabs `with-timestamps` (`elevenlabs.tts_waktu`) memberi waktu tiap kata -> caption karaoke Bangers 92 px di 70% tinggi layar, kata aktif kuning, maksimal 2 baris x 20 huruf, potong di akhir kalimat. Gerak kamera per adegan, crossfade 0.4 detik, kartu judul 2.5 detik, kartu "Pesan Hikmah" 4 detik.
- Qarun: 11 adegan, narasi Putra, 92.8 detik (lebih panjang dari perkiraan 70 detik; hitung sekitar 2.2 kata per detik), render 4.5 menit.
- Konten kisah: Nabi tidak digambarkan dan tidak diberi dialog; ayat diparafrasekan dengan nomor sumber; owner minta ustadz cek sebelum tayang.
- **Adegan tanpa orang wajib `"tanpa_orang": true`** di halaman naskah.json: gambar-v6 lalu memakai `wajib_kosong` (komik-gaya.json), bukan `wajib`. Dengan `wajib` biasa (menyebut tokoh dan badan penuh), Artistly menggambar kerumunan figur botak mirip bayi di 3 putaran berturut-turut walau prompt menulis "No people". Gaya `3d-animasi` juga cenderung membuat pekerja dan kerumunan mirip bayi gemuk; pertimbangkan gaya lain untuk kisah dewasa.
- QC: figur botak/boneka lolos YOLO dan hitungan VLM (0 orang). `qc-vlm.mjs` sekarang menanyakan `human_like_figures`; `produksi-gambar.mjs` menolak adegan `harap 0` bila ada figur. Uji: dua gambar yang kecolongan tertangkap.
- Bila proses produksi dihentikan paksa, kunci `local-state/locks/artistly.lock` tertinggal: periksa pid di dalamnya sudah mati, baru hapus.

## Gambar Artistly lolos QC -> klip VideoExpress (TESTED 2026-11-16, owner minta uji)

Proyek `gpt/productions/UJI-ARTISTLY-VX-QARUN-20261116`: 3 gambar Kisah Qarun (QC lokal LULUS) -> 3 klip 9:16 1080x1920 5 detik 24 fps, tanpa narasi.
1. Impor: `node apps/artistly-runner/jalankan-vx.mjs impor-artistly <gambar/hal-NN-k.png> <NAMA>` (runner VideoExpress, kunci `videoexpress` yang sama dengan worker). Gambar dicocokkan lewat `gambar/sumber.json` (URL CDN Artistly dari gambar-v6), masuk folder **My Artistly Images** dan diberi nama. Sekitar 40 detik per gambar.
2. `shots.json`: `start: {"type": "PAKAI_ULANG", "image": "<NAMA>", "folder": "My Artistly Images"}`. `start.folder` baru di runner VideoExpress (`pickFromLibrary`, izin owner 2026-11-16); tanpa folder tetap My AI Images. Prompt mengikuti format runner (MANDATORY RULES, FACELESS, HEAD COVERING, CONSISTENCY LOCK, AVOID); cek dulu `runner.mjs plan`.
3. `jalankan-vx.mjs run <shots.json>` (3 kiriman sekitar 45 detik), tunggu render sekitar 8 menit, lalu `node apps/artistly-runner/unduh-vx.mjs <folder> QRNVX-SHOT01 ...` (unduh dari My AI Videos lewat label, hanya membaca).
4. QC klip lokal: ambil frame (ffmpeg), `qc-cepat.py` dengan folder kepala, `qc-vlm.mjs --kepala`. Uji: 21 kepala di 6 frame, 0 berwajah.
- Hasil: gerak halus (dorong kamera, unta berjalan, istana amblas berdebu), identitas dan baju tetap sama dengan gambar Artistly.
- Produksi penuh (owner "Bagus, lanjutkan", 2026-11-16): `gpt/productions/KISAH-QARUN-VX-20261116` (`buat-shots.mjs` -> `shots.json`, 8 klip baru 7-10 detik sesuai panjang narasi + 3 klip uji dipakai ulang), lalu `python motion-kisah.py kisah-vx.json`: tiap adegan `"klip": "<mp4>"` menggantikan gambar diam; klip lebih pendek dari narasi diperlambat sampai 1.2x lalu frame terakhir ditahan; suara bawaan klip dicampur di bawah narasi (`JOTA_VOL_KLIP` 0.22). Hasil 93 detik.
  - Kelemahan terlihat: di klip adegan 4 dua tetua berjalan keluar layar setelah sekitar 2 detik, padahal narasi masih tentang nasihat mereka. Untuk adegan bicara, tulis di ACTION "both elders stay in place for the whole clip" dan larang keluar frame di AVOID. Kerumunan kadang kehilangan penutup kepala saat bergerak.
  - Pesan "Broken pipe" dari ffmpeg di akhir tiap klip normal (perakit berhenti membaca setelah durasi adegan).
- Penghalang: modal pengumuman dan pengingat "Protect your account" di VideoExpress menutupi tombol Import Media; owner menutupnya manual lewat `JOTA.cmd login-videoexpress` (tombol "nanti", bukan mengaktifkan 2FA). Perubahan kode penutup popup di runner VideoExpress ditolak izin, jadi tidak dipasang.

## QC lokal tanpa token (uji 2026-11-16)

Tujuan owner: pekerjaan rutin tidak memakai token Claude. PC: GTX 1660 Ti 6 GB, RAM 32 GB.
- `qc-cepat.py` (venv; ultralytics YOLOv8s, OpenCV YuNet, RapidOCR; model di `E:\JOTA-Standby\models`, telemetri ultralytics dimatikan): sekitar 1 detik per gambar. Uji 91 gambar (63 dipakai, 28 ditolak):
  - Jumlah orang dibanding "Exactly N people" di prompt: menangkap 9 penolakan orang tambahan; salah curiga 1 dari 41 gambar baik.
  - YuNet: semua wajah asli skor 0.75 ke atas, tetapi gambar faceless yang baik juga bisa sampai 0.81. Hanya untuk saringan awal, jangan dipakai menolak sendiri.
  - OCR tidak berguna untuk balon kosong (balon tanpa huruf).
- `qc-vlm.mjs` (Qwen3-VL-4B Q4 lokal lewat llama.cpp CUDA di `models/qwen3-vl-4b`, meng-import `videoexpress-runner/local-model-json.mjs` tanpa mengubahnya):
  - Gambar utuh 768 px: wajah kecil terlewat (Kakek tersenyum SENYUM hal-09-1 dinilai polos). Jangan dipakai untuk cek wajah.
  - `--kepala` pada potongan kepala dari kotak YOLO (diperbesar 448 px): 20 dari 20 benar (4 wajah tertangkap, 16 polos termasuk yang dicurigai YuNet), sekitar 14 detik per kepala.
  - Gambar utuh untuk balon kosong/tulisan: 4 dari 4 benar (KUAT hal-02-1 dan hal-07-1), sekitar 20 detik per gambar. Sampel kecil.
- Belum bisa dideteksi otomatis: warna properti berubah, kostum superhero (belum ada contoh uji), tinggi tokoh. Owner tetap menilai hasil akhir.

## Buku komik komersial (2026-11-15, BUKU-UMAIR-PAHLAWAN-20261115)

Alur dari naskah sampai paket siap jual (KDP paperback + PDF digital). Owner yang upload dan publish.
1. Naskah per kisah (8 panel) + `EKSTRA` (sampul, belakang, potret tokoh). Satu antrean `gambar-v6` berurutan; 45 prompt sekitar 50 menit.
2. Tinjau dengan lembar bergaris 10% (`tinjau.jpg`, label hal-NN-k). Tolak: wajah/mulut terlihat, orang tambahan atau tokoh ganda, balon kosong tergambar, warna properti berubah, kostum superhero muncul. Uji ini: 13 dari 90 gambar ditolak.
3. **Gambar yang ditolak harus dipindah dengan nama baru** (`ditolak/hal-NN-k-vRRR.png`); memindah dengan nama sama gagal diam-diam bila file lama sudah ada, sehingga runner melewati halaman itu.
4. Panel tanpa tokoh utama: jangan pakai preset superhero (kata superhero memunculkan orang berkostum); pakai gaya 2D bertinta tanpa kata itu (`TANPA-TOKOH`).
5. `buat-rakit.py` menyusun 24 halaman: sampul, halaman judul dan hak cipta (pernyataan ilustrasi AI), daftar isi, `jenis: tokoh` (kenalan tokoh), tiap kisah = 2 halaman panel + 1 halaman pesan hadis, lembar aktivitas, catatan orang tua. Balon dengan `koordinat: gambar` (x, y, ke dibaca dari garis tinjau, perakit mengubah ke panel).
6. `ukuran: kdp-8.5x11` + `nomor_halaman`: keluaran PDF biasa, `- CETAK KDP.pdf` (2588x3375, 300 dpi, termasuk bleed) dan `- DIGITAL.pdf`.
7. `sampul-kdp.py sampul.json`: sampul lengkap (punggung dari jumlah halaman; di bawah 79 halaman tanpa tulisan), kotak barcode kosong. `mockup-buku.py`: mockup sampul, isi terbuka, contoh bertanda CONTOH.
8. `LISTING.md`: judul, deskripsi, 7 kata kunci, kategori, deklarasi AI, saran harga, daftar cek owner (lisensi Artistly, cek hadis oleh ustadz, baca ulang, KDP Previewer).

## Naskah komik (`komik/<EPISODE>/naskah.json`)

```json
{
  "nama_pdf": "30 Hari Uwais Hijrah - Hari 1.pdf",
  "judul_halaman": "HARI 1  AZAN VS SATU RONDE LAGI",
  "layout": "Single Page Layout",
  "karakter": ["skills/jota-video/characters/UWAIS-ABDUL-KOHAR/acuan-depan.png"],
  "halaman": [
    { "script": "Faceless 3D animated style. Every person has a completely smooth blank skin-colored face with no eyes, no nose, no mouth. ...",
      "narasi": "Menjelang Maghrib...",
      "balon": [ { "teks": "Dikit lagi menang!", "jenis": "bicara", "siapa": "kiri" } ] }
  ],
  "pesan": { "judul": "Pesan Hari 1", "isi": ["...", "(HR. ...)"] }
}
```

Aturan naskah (dicek `cekNaskahKomik` sebelum Generate):
- `script` bahasa Inggris, satu adegan per halaman, total maks 5000 huruf. Halaman berorang wajib kalimat faceless; halaman tanpa orang menulis `No people`.
- Pose terlarang sama dengan jota-video v3.84: tidur, berbaring, close-up, menunduk. Tokoh duduk tegak, berdiri, atau berjalan.
- Tokoh yang punya foto acuan disebut "the boy in the reference photo"; foto lain ditambah ke `karakter` sesuai urutan muncul (maks 4). Tokoh tanpa foto ditulis lengkap (usia, tinggi relatif, rambut, baju) dari `skills/jota-video/characters/tokoh.json`.
- Dialog dan narasi (bahasa Indonesia) hanya di `balon` dan `narasi`, tidak di `script`. Maks sekitar 14 kata per balon, 2 balon per panel.
- Balon tanpa `x`/`y` diletakkan otomatis oleh `komik-render.py`: area tenang di bagian atas panel, menghindari kepala (kulit plus rambut di atasnya), tangan, kotak narasi, dan balon lain; `siapa` (`kiri`, `kanan`, `tengah`) memilih pembicara, ekor mengarah ke kepalanya. Kalau hasilnya menutup tokoh, isi `x`, `y`, dan `ke` (0 sampai 1 relatif panel) secara manual lalu rakit ulang.
- `jenis` balon: `bicara`, `pikir`, `teriak`. Tata letak default 6 panel per halaman (`baris: [2,2,2]`).

## Perakit (`apps/artistly-runner/komik-render.py`)

Halaman A4 200 dpi. Jenis halaman: `sampul` (gambar penuh, judul dengan gradasi), panel (pita `judul_halaman`), `teks` (pesan dan hadis). Font OFL di `apps/artistly-runner/fonts/` (Bangers untuk judul, Comic Neue untuk balon). Format naskah rakit kompatibel dengan `komik.py` lama di Mac.

## Pelajaran (tambahkan setiap kegagalan baru)

- KOMIK-H01 12:48 WIB: PDF berisi gambar buku lama "Super Max Adventure" (berwajah) terunggah ke Drive `Video JOTA/Komik H01` dengan judul kita. Sejak itu komik tidak diunggah otomatis.
- KOMIK-H01 07:22 UTC (tiga kali): setelah `Generate`, progres unggah sampai sekitar 33% lalu form hilang tanpa pesan; cerita tidak ada di Your Stories, tidak ada gambar baru. Dugaan (belum terbukti): foto acuan faceless ditolak karena alat mencari wajah anak. Belum ada komik Script To Storybook yang berhasil dari server.

- KOMIK-H01 05:38: placeholder `{{n}}` di nama unduhan diisi sebelum waktunya; `runSteps` sekarang membiarkan `{{n}}` untuk langkah download.
- KOMIK-H01 05:45: buku lama terambil lewat filter; diganti pengenalan per folder.
- KOMIK-H01 05:51: kiriman batal karena pindah halaman saat `Submitting...`; sekarang ditunggu.
