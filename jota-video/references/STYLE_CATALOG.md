# JOTA katalog style video (S01 sampai S40, terakhir ditambah v3.18)

**Sejak v3.51 semua video faceless (JOTA 1). Style yang ditandai untuk JOTA 2 atau berwajah hanya boleh dipakai dengan resep faceless dari `FACELESS_CHARACTER.md`; default semua paket S28.**

Dipakai saat bertanya "style video jenis apa?" (langkah 2 di `../SKILL.md`). Tampilkan seluruh tabel ke owner sebagai daftar bernomor, lalu pop-up berisi 4 style yang paling cocok dengan tema dan mode, plus pilihan ketik nomor lain.

## Cara kerja style di VideoExpress 3.5

Fakta dari tutorial Alex "I Tested The NEW Video Express 3.5 Creative Mode [Style Tag Test]" (YouTube `8gJkpp85aB0`):
- Centang `Use Creative mode`, lalu tulis **style tag** (teks gaya) di awal atau akhir Image Prompt. Tidak ada daftar menu style yang tetap; style ditentukan oleh teks.
- Style yang diuji di tutorial: kolase dokumenter ala Vox, hyperrealistic, 2D ala Disney, 2D ala Ghibli, 3D CGI, 3D ala Pixar, Lego, Minecraft, Roblox.
- `Automatically enhance my video prompt` bisa **tercentang lepas sendiri saat durasi diubah**. Atur durasi dulu, lalu pastikan Enhance OFF (aturan v3.26).
- Prompt video hasil enhance bisa dilihat lewat klik kanan klip > `Details`. Pakai ini untuk mengecek dialog tidak berubah.

Karena style hanya teks, daftar di bawah tidak membatasi. Tulisan Arab atau kaligrafi tidak digenerate AI (hurufnya rusak); tambahkan sebagai teks atau gambar di editor. Owner boleh minta style lain; tulis style tag barunya dengan pola yang sama.

## Aturan nama merek

Style tag di JOTA memakai **deskripsi gaya**, bukan nama studio atau merek (Disney, Pixar, Ghibli, Lego, Minecraft, Roblox). Alasannya: karakter dan tampilan merek itu dilindungi, dan konten yang dimonetisasi lebih aman memakai gaya original. Kolom "mirip" hanya untuk membantu owner memahami, tidak ditulis di prompt.

## Katalog

Kolom JOTA 1: seberapa cocok untuk karakter tanpa wajah. "Sangat" = wajah kosong terlihat wajar di gaya itu. "Hati-hati" = wajah kosong bisa terlihat aneh atau menyeramkan, atau model cenderung menggambar wajah.

| No | Style | Mirip | Cocok untuk | JOTA 1 | Style tag (tulis persis di prompt) |
|---|---|---|---|---|---|
| S01 | 2D storybook hand-painted | Buku cerita bergambar | Cerita keluarga, fabel, kisah moral | Sangat | `original hand-painted 2D storybook illustration, soft watercolor texture, warm Indonesian countryside palette, gentle cinematic lighting` |
| S02 | 2D anime pedesaan painterly | Ghibli | Petualangan anak, alam, vlog kampung | Cocok | `original 2D painterly anime style, lush hand-painted backgrounds, soft natural light, gentle cel shading` |
| S03 | 2D kartun keluarga klasik | Film animasi 2D klasik | Komedi keluarga, dongeng | Hati-hati | `original classic 2D hand-drawn family cartoon style, clean expressive line art, bright friendly colors` |
| S04 | 2D flat vector | Motion graphic modern | Edukasi, penjelasan, infografis | Sangat | `clean flat 2D vector illustration, simple geometric shapes, limited modern color palette, smooth motion graphics` |
| S05 | Kolase cut-out dokumenter | Vox | Dokumenter sejarah, berita, explainer | Cocok | `editorial cut-out collage documentary style, black and white archival photo cutouts, paper texture, bold color accents, layered parallax` |
| S06 | Wayang siluet | Wayang kulit | Kisah tradisional, sejarah, cerita Islami | Sangat | `Indonesian shadow puppet silhouette style, intricate carved leather silhouettes, warm lantern backlight, layered shadow theater` |
| S07 | 2D watercolor lembut | Ilustrasi cat air | Cerita anak, puisi, renungan | Sangat | `soft 2D watercolor illustration, flowing pigment edges, pastel palette, paper grain` |
| S08 | 2D komik | Panel komik | Aksi ringan, cerita lucu | Hati-hati | `original 2D comic book style, bold ink outlines, halftone shading, dynamic composition` |
| S09 | Doodle / stickman | Gambar tangan sederhana | Explainer cepat, humor | Sangat | `simple hand-drawn doodle style, black marker lines on off-white paper, minimal color accents` |
| S10 | 2D chibi | Karakter imut | Konten anak, maskot | Hati-hati | `original cute chibi 2D style, big heads small bodies, soft pastel colors, rounded shapes` |
| S11 | Pixel art | Game retro | Nostalgia, game, humor | Cocok | `retro 16-bit pixel art style, limited palette, crisp pixel edges` |
| S12 | 3D animasi film keluarga | Pixar | Film keluarga, hewan bicara (JOTA 2) | Hati-hati | `original high-quality 3D animated family film style, soft global illumination, expressive stylized characters, rich detailed environments` |
| S13 | 3D CGI semi-realistik | Film CGI | Drama, aksi, fantasi | Hati-hati | `cinematic 3D CGI render, semi-realistic materials, dramatic lighting, film-quality detail` |
| S14 | Claymation | Stop-motion tanah liat | Cerita lucu, anak | Cocok | `handmade claymation stop-motion style, visible clay texture and fingerprints, miniature set, soft studio light` |
| S15 | Mainan balok | Lego | Humor, konten mainan | Cocok (wajah polos) | `original toy brick world style, glossy plastic bricks, studs visible, miniature toy set` |
| S16 | Dunia kotak voxel | Minecraft | Konten game, anak | Cocok | `original voxel block world style, cube-shaped terrain and characters, bright game lighting` |
| S17 | Avatar game kotak | Roblox | Konten game remaja | Cocok | `original blocky game avatar style, simple low-detail characters, colorful game world` |
| S18 | Low-poly | Game indie | Explainer, fantasi | Cocok | `low-poly 3D style, faceted geometric surfaces, flat shading, clean gradients` |
| S19 | Diorama miniatur | Tilt-shift | Kota, peternakan, pabrik | Cocok | `miniature diorama tilt-shift style, tiny handcrafted models, shallow depth of field` |
| S20 | Hyperrealistic sinematik | Film live-action | Drama, vlog realistis (JOTA 2) | Hati-hati | `hyperrealistic cinematic live-action look, natural skin and fabric detail, anamorphic lens, film color grading` |
| S21 | Dokumenter realistis | Liputan dokumenter | Peternakan, UMKM, proses kerja | Hati-hati | `realistic documentary footage look, natural available light, handheld observational camera` |
| S22 | Vlog ponsel | Konten UGC | Vlog karakter, review | Hati-hati | `realistic smartphone vlog footage, wide front camera, natural daylight, casual handheld feel` |
| S23 | Film vintage 80-90an | Film 16mm / VHS | Nostalgia, cerita masa lalu | Cocok | `vintage 1980s 16mm film look, warm faded colors, soft grain, light gate weave` |
| S24 | Hitam putih noir | Film noir | Misteri, sejarah | Cocok (siluet) | `black and white film noir style, high contrast hard shadows, venetian blind light` |
| S25 | Manekin putih dokumenter | Dokumenter manekin di tutorial Sayan Roy | Sejarah, dokumenter, kisah Islami | Sangat (default JOTA 1 dokumenter) | `cinematic faceless matte mannequin documentary, smooth white matte mannequin figures with featureless oval heads, realistic detailed environment and costumes, high-contrast lighting, volumetric haze` |
| S26 | Manekin kayu hangat | Manekin kayu pelukis | Cerita keluarga, fabel, edukasi, kampung | Sangat (manekin untuk cerita bergaya kayu) | `cinematic miniature world of smooth light-wood artist mannequin figures with featureless oval heads, visible wood grain, realistic fabric costumes, warm Indonesian village setting, soft golden light` |
| S27 | Manekin pastel lembut | Figur mainan lembut | Konten anak, belajar bahasa | Sangat | `soft pastel matte mannequin figures with rounded featureless heads, gentle toy-like proportions, bright clean set, soft studio lighting` |
| S28 | Kartun Islami wajah polos | Ilustrasi anak Muslim berwajah kosong | Kisah Islami anak, adab, keluarga, Ramadhan | Sangat (default JOTA 1 anak sejak v3.11, teruji) | `faceless Islamic children's cartoon, 2D anime-style illustration, clean line art, soft cel shading, warm cozy colors` (selalu didahului kalimat pembuka faceless, lihat `FACELESS_CHARACTER.md` metode B) |
| S29 | Papercraft berlapis | Kerajinan kertas potong 3D | Dongeng, fabel, kisah Islami anak | Sangat (tokoh kertas mudah tanpa wajah) | `layered papercraft cut-paper world, visible paper texture and soft drop shadows, handmade diorama look` |
| S30 | Origami | Hewan dan tokoh kertas lipat | Fabel hewan, edukasi alam | Sangat (bentuk lipat tidak bermata) | `origami folded-paper characters and world, crisp paper folds, soft studio light` |
| S31 | Boneka kain dan felt stop-motion | Boneka flanel | Cerita anak, lagu anak | Cocok (wajah polos kain) | `felt and fabric stop-motion puppets, stitched details, cozy handcrafted miniature set` |
| S32 | Papan tulis dan whiteboard | Animasi gambar tangan menjelaskan | Edukasi, doa harian, tips | Sangat | `whiteboard hand-drawn animation style, black marker lines appearing on white board, minimal color accents` |
| S33 | Lukisan tinta oriental | Sumi-e, kuas tinta | Kisah renungan, sejarah Asia | Cocok | `ink wash brush painting style, flowing black ink strokes, soft rice paper texture, muted colors` |
| S34 | Ornamen geometri Islami | Pola arabesk bergerak | Pembuka dan penutup, transisi, latar ayat | Sangat (tanpa makhluk bernyawa) | `animated Islamic geometric patterns and arabesque ornaments, gold and deep teal, elegant slow motion` |
| S35 | 3D toon cel-shaded | Anime 3D | Petualangan, aksi ringan | Hati-hati | `cel-shaded 3D toon render, bold outlines, flat anime-like shading, vibrant colors` |
| S36 | Kartun klasik 1930-an | Karet lentur hitam putih | Komedi pendek, nostalgia | Hati-hati | `original 1930s rubber-hose cartoon style, black and white, bouncy squash and stretch, film grain` |
| S37 | Isometrik | Dunia miring miniatur | Edukasi proses, kota, peternakan | Cocok | `isometric 3D illustration world, clean miniature buildings, soft pastel lighting` |
| S38 | Komik bergerak | Panel komik dianimasikan | Kisah bersambung, aksi | Hati-hati | `animated motion comic, comic panels with subtle parallax movement, bold ink lines` |
| S39 | Lukisan pasir | Sand art | Kisah renungan, sejarah | Sangat (siluet pasir) | `sand art animation, figures and scenes drawn in golden sand on a backlit glass table` |
| S40 | 3D sinematik wajah polos | Reels guru PAUD dan keluarga Muslim (contoh owner: akun arno.hardana) | Kisah keluarga, guru, adab, Ramadhan, format 9:16 | Sangat (wajah kosong tetap wajar; kacamata dan hijab jadi penanda tokoh) | `stylized 3D animated film look with realistic soft lighting, every character has a completely smooth blank skin-colored face with no eyes, no nose and no mouth, detailed realistic hands and fabric, shallow depth of field, warm golden-hour light` |

## Metode manekin untuk JOTA 1

Sejak v3.11, default JOTA 1 untuk konten anak adalah S28 (kartun wajah polos), hasil benchmark 2026-10-25 (`BENCHMARK_JOTA1_20261025.md`). Manekin (S25, S26, S27) tetap pilihan untuk dokumenter dan gaya 3D. Style lain bertanda "Sangat" tetap boleh dipilih owner; tokohnya ditulis dengan kalimat FACELESS metode B atau metode manekin sesuai style (`SCENE_WORKFLOW.md` F1). Aturan lengkap: [`FACELESS_CHARACTER.md`](FACELESS_CHARACTER.md).

## Kombinasi yang disarankan

| Mode + tujuan | Style |
|---|---|
| JOTA 1 cerita keluarga atau fabel | S28, S26, S27, S06 |
| JOTA 1 kisah Islami anak | S28, S40, S29, S06 |
| Pembuka, penutup, latar ayat (semua mode) | S34 |
| JOTA 1 sejarah atau dokumenter | S25, S26, S06, S05 |
| JOTA 1 edukasi | S28, S32, S27, S04 |
| JOTA 1 fabel hewan | S30, S29, S28 |
| JOTA 2 film hewan bicara | S12, S02, S14 |
| JOTA 2 vlog karakter | S02, S22, S20 |
| JOTA 2 dokumenter | S05, S21, S23 |

## Status bukti

- Diuji di tutorial (versi mereknya): S03, S02, S05, S12, S13, S15, S16, S17, S20.
- Terlihat di tutorial Sayan Roy (`i2CmllNmJnk`): S25 versi putih matte.
- S40 teruji 2026-10-25 (keyframe dan video dialog 9:16, Image Type 3D, Creative OFF, Enhance OFF): mata dan hidung tidak pernah muncul, mulut hanya saat bicara. Lihat `BENCHMARK_JOTA1_20261025.md` ronde 3.
- S29 sampai S39 ditambahkan v3.17 dan belum teruji di akun owner; uji satu keyframe dulu, terutama wajah untuk JOTA 1.
- Teruji di akun owner: S28 (gambar dan video, VideoExpress, 2026-10-25), S09 (Rebutan Mangga, JOTA 2), S12 (Anak Entok JOTA 2). Lainnya belum; hasil pertama dicatat di ledger sebagai uji coba.
