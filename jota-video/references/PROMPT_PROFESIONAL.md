# Template PRO: prompt profesional JOTA (dipertahankan khusus METODE PRO)

> **Status sejak v3.96.0 (owner 2026-11-05):** Dokumen ini tetap utuh sebagai referensi metode **PRO / Structured Professional**; semua blok, pemeriksaan, dan tekniknya **tetap tersedia**. Akan tetapi, instruksi lama yang menyatakan template berlabel ini wajib untuk *semua* Video Prompt **digantikan** oleh aturan pemilihan metode di [`METODE_PROMPT.md`](METODE_PROMPT.md) dan [`../SKILL.md`](../SKILL.md). **NATURAL / VideoExpress** menggunakan **seluruh kedalaman informasi** (fisika, urutan aksi, kamera, cahaya, bunyi, kontinuitas, faceless) tetapi menuliskannya **sebagai paragraf sinematik detail yang mengalir**, tanpa header ACTION/CAMERA/LIGHT/SOUND, daftar, atau timestamp di Video Prompt. **Natural tidak berarti pendek.** Image Prompt tetap sangat rinci dan boleh terstruktur.

### Ruang lingkup metode PRO (v3.96)
- Pemanggilan **"metode PRO"** memakai template terstruktur di dokumen ini. Istilah `"gaya_prompt": "lengkap"` adalah nilai lama yang dipakai generator untuk PRO.
- Pemanggilan **"metode natural"** atau **"metode VideoExpress"** memakai [`METODE_PROMPT.md`](METODE_PROMPT.md). `"gaya_prompt": "natural"` adalah nilai kompatibilitas generator; implementasi NATURAL detail masih memerlukan penyesuaian kode `dari-brief.mjs`.
- Jika paragraf lama di bawah menyebut "wajib semua video", baca itu sebagai **wajib untuk metode PRO**. Jangan menempelkan blok ini mentah-mentah ke Video Prompt NATURAL. Provider video tetap mengikuti lock pada skill utama.


Riwayat 2026-10-31 (metode PRO): setiap Image Prompt KEYFRAME dan setiap Video and Audio Prompt versi terstruktur memakai template di file ini, termasuk suara latar dan suara sekitar. Sejak v3.96.0, pilihan NATURAL VideoExpress menggunakan format narasi mengalir di `METODE_PROMPT.md`. Tujuannya hasil yang terasa seperti film animasi studio, bukan video AI. Template PRO menggantikan template F5 di `SCENE_WORKFLOW.md` sebagai template wajib. Isi bible, Buku keadaan, BLOK KUNCI, dan cek K1 sampai K7 (`CONSISTENCY_RULES.md`) tetap berlaku tanpa perubahan.

## 1. Ciri video AI yang harus dihindari dan penangkalnya

Penonton mengenali video AI dari kesalahan kecil yang berulang. Setiap baris di template menutup salah satu celah ini.

| Ciri video AI | Penangkal di template |
|---|---|
| Gerakan melayang, kaki meluncur di lantai, tanpa bobot | ADEGAN: setiap gerak punya awal, puncak, dan akhir; kaki menapak; benda berat diangkat pelan dengan dua tangan |
| Tokoh diam lalu tiba-tiba bergerak cepat | ADEGAN: gerak sudah berjalan dari frame pertama, percepatan dan perlambatan alami |
| Kamera melayang tanpa alasan, berputar, atau zoom digital | KAMERA: perilaku kamera sungguhan (dolly, pan, tilt), gerak dimulai dan berhenti pelan, setiap gerak punya alasan dan framing akhir; lensa hanya disebut di style 3D (bagian 2A) |
| Gaya bergeser di tengah video (2D jadi 3D, kartun jadi realistis) atau tokoh berubah | Bagian 2A: style tag di awal dan di KUNCI, kosakata sesuai kelompok style, KUNCI tokoh dari bible, kamera tidak memperbesar kepala |
| Cahaya datar dari segala arah, bayangan berubah arah | CAHAYA: satu sumber cahaya utama yang terlihat atau jelas asalnya, arah bayangan tetap |
| Tekstur dan garis "mendidih", detail berubah tiap frame | CAHAYA dan KUNCI: kalimat stabilitas gaya |
| Tangan berubah bentuk, jari bertambah, benda menempel atau tembus | ADEGAN: kontak tangan dengan benda ditulis jelas; HINDARI: daftar cacat tubuh dan benda |
| Komposisi simetris kaku di tengah | KAMERA: penempatan sepertiga layar, latar depan dan belakang berlapis |
| Suara kosong, satu dengung panjang, atau musik muncul sendiri | SUARA tiga lapis per segmen waktu: Ambience (suasana), Foley (suara aksi), Room (akustik ruang) |
| Bibir bergerak tanpa suara, atau suara tanpa sumber | SCRIPT NGOMONG dan SUARA: dialog ditulis sekali, setiap suara terikat aksi |

## 2. Aturan menulis

1. **Tulis yang ada, bukan yang tidak ada.** Di semua bagian selain HINDARI, tulis keadaan yang diinginkan: "the camera holds on a medium shot", bukan "the camera does not move". Semua larangan dikumpulkan di blok HINDARI di akhir. Dua pengecualian: kalimat FACELESS di KUNCI ditulis persis seperti template lama SCENE_WORKFLOW F5 karena sudah lolos benchmark JOTA 1, dan kalimat KUNCI tokoh serta benda disalin huruf per huruf dari bible (cek K2 dan K4), termasuk larangan seperti "never more, never fewer".
2. **Satu aksi kecil per sekitar 3 detik.** Klip 10 detik berisi tiga atau empat ketukan, tidak lebih.
3. **Setiap suara punya sumber di layar atau di sekitar lokasi**, dan ditulis di segmen waktu tempat suara itu terjadi.
4. **Suasana terdengar sesekali, bukan terus-menerus.** Tulis kejadian suara yang spesifik ("a rooster crows once far away"), bukan dengung panjang. Kata hum, drone, whir, buzz, static, dan silence tidak dipakai di luar HINDARI. Suasana yang dibuat terus-menerus cenderung dirender sebagai desis latar.
5. **Kata benda adalah perintah.** Setiap benda, jumlah, dan perumpamaan bisa muncul di layar. Jangan menulis perumpamaan ("like a dream"); tulis kenyataannya ("soft warm light from the left window").
6. **Panjang prompt.** Di produksi Saheela dan Umair (v3.26), prompt 7.100 sampai 8.000 karakter diterima dan dirender sampai selesai, jadi panjang bukan masalah utama. Yang wajib: setelah menempel, agen membaca panjang isi kotak prompt dari halaman dan memastikan sama dengan panjang teks di `PROMPTS.md` (tidak terpotong). Kalau terpotong atau ditolak, pendekkan dulu kalimat suasana dan rincian ADEGAN, lalu HINDARI. KUNCI, KEADAAN AWAL, KEADAAN AKHIR, dan KAMERA tidak dipendekkan.
7. **Musik.** JOTA 1: tidak ada musik. JOTA 2: musik tidak dibuat oleh generator klip (lisensinya tidak jelas dan sulit dikendalikan); musik berlisensi, kalau dipakai, ditambahkan saat rakit.

## 2A. Konsistensi gaya dan karakter (wajib, keputusan owner 2026-10-31)

Teknik "terlihat profesional" tidak boleh mengorbankan konsistensi. Kalau dua hal ini bertabrakan, konsistensi yang menang.

**Gaya**
1. Satu proyek satu style dari `STYLE_CATALOG.md`. Style tag disalin persis, tidak diubah, tidak dicampur dengan style lain.
2. Style tag ditulis dua kali di setiap Video and Audio Prompt: baris `STYLE:` tepat setelah label `SC##`, dan di KUNCI. Keduanya identik huruf per huruf. Di Image Prompt JOTA 1 S28, kalimat pembuka faceless tetap kalimat pertama (sudah berfungsi sebagai penanda gaya), lalu style tag di KUNCI.
3. Kosakata mengikuti kelompok style:

| Kelompok | Contoh style | Boleh dipakai | Tidak dipakai di luar HINDARI |
|---|---|---|---|
| 2D (kartun, ilustrasi, cel) | S28 dan style 2D lain di katalog | ukuran shot (wide, medium, close), sudut, layered painted background, simpler and lighter background detail, one foreground element at the frame edge, soft cel-shaded light | lens, mm, depth of field, bokeh, blur, photographic, cinematic lighting, realistic, skin texture, film grain |
| 3D (animasi 3D) | S40, S12 | semua kosakata 2D ditambah lensa (misalnya 35mm), shallow depth of field, soft background blur, sesuai style tag | photorealistic, live action, real photo |

4. CAHAYA di style 2D ditulis sebagai cahaya ilustrasi ("warm morning light from the upper left, soft cel shading"), bukan pencahayaan foto.
5. HINDARI selalu memuat `No style change, no photorealistic conversion.` dan untuk 2D ditambah `No 3D rendering.`

**Karakter**
1. Kalimat KUNCI setiap tokoh disalin huruf per huruf dari Character bible yang sudah dikunci ulang dari gambar acuan yang lolos (`CONSISTENCY_RULES.md` 2D IMAGE LOCK). Tidak diringkas, tidak diparafrase, tidak ditambah kata sifat baru.
2. Setiap KEYFRAME sesudah SC01 memakai `Use Consistent Character` dengan Reference Photo = keyframe SC01 yang lolos (benchmark I8). Scene bersambung tetap SAMBUNG dari frame terakhir.
3. Kamera tidak memperbesar kepala atau benda kecil melebihi ukurannya di gambar awal (tidak ada push-in ke wajah). Detail yang diperbesar digambar ulang oleh AI dan di situlah atribut, warna, dan wajah polos JOTA 1 paling sering berubah. Close-up kepala dibuat sebagai KEYFRAME baru, bukan lewat gerakan kamera.
4. Suara tiap tokoh ditulis dengan deskripsi yang sama persis di setiap scene, diambil dari kolom Suara di Character bible.
5. Tokoh yang tidak ada di Character bible tidak muncul. Figuran yang dibutuhkan cerita ditambahkan ke bible dulu.

## 2B. Lapisan detail sinematik (wajib untuk style 3D dan kalau owner meminta "sinematik dan detail", sejak v3.31)

Masalah: prompt yang hanya menyebut tokoh, lokasi, dan satu cahaya menghasilkan gambar yang benar tapi datar (permukaan polos, latar kosong, cahaya rata). Detail datang dari benda nyata yang disebut satu per satu, bukan dari kata "highly detailed" atau "8K".

Di Image Prompt, tambahkan lima baris ini setelah baris `Composition:` (style 3D seperti S40, S12, S25). Style 2D cukup baris 1, 2, dan 4 dengan kosakata 2D.

1. `Materials:` minimal 3 bahan yang terlihat, masing-masing dengan tanda pakai. Contoh: `riveted iron chain mail with dull worn edges`, `coarse wool cloak with frayed hem and dust in the folds`, `cracked dark leather belt with a brass buckle`, `sun-bleached canvas tent with patched seams`.
2. `Depth:` tiga lapis yang jelas. Foreground (benda di tepi frame, agak buram di 3D), midground (tokoh dan aksi), background (landmark dan langit). Contoh: `foreground: a broken spear shaft in the sand at the lower left edge; midground: the rider and his horse; background: rows of dunes and a far line of tents under a pale sky`.
3. `Atmosphere:` satu sampai dua unsur udara yang menangkap cahaya: debu tertiup, kabut tipis, asap api unggun, butiran pasir, uap. Contoh: `fine dust drifting through the low sun rays`.
4. `Light:` cahaya utama (arah, warna, jam), cahaya tepi (rim light) yang memisahkan tokoh dari latar, dan pantulan lembut dari tanah atau dinding. Contoh: `low golden sun from the right as key light, a thin warm rim light on the turban and shoulders, soft bounce light from the sand`.
5. `Grade:` satu kalimat warna film. Contoh: `warm amber highlights and cool teal shadows, rich contrast, gentle film grain`.

Di Video and Audio Prompt:
- ADEGAN menyebut gerak sekunder yang membuat gambar hidup: kain dan ekor surban tertiup, debu naik dari langkah, panji berkibar, bara api terbang. Satu sampai dua per segmen, tetap mengikuti bobot gerak.
- KAMERA memakai paralaks: benda latar depan melintas pelan di depan lensa saat kamera bergeser.
- CAHAYA menyalin baris Light dan Atmosphere dari Image Prompt, ditambah perubahan cahaya yang punya alasan (matahari muncul, api membesar).
- Detail tetap tunduk pada aturan konsistensi 2A: bahan, warna, dan jumlah benda disalin dari bible, bukan ditambah di tengah video.

Batas: satu titik fokus per shot. Detail paling tajam ada di tokoh dan satu benda penting, latar lebih sederhana. Jangan menulis daftar kata sifat tanpa benda ("epic, stunning, ultra detailed").

## 2C. Gerak natural (wajib, keputusan owner 2026-11-01)

Temuan owner di beberapa video JOTA dari berbagai sesi dan agen: barisan penunggang kuda berjalan mundur, kepala berputar 360 derajat, tangan berputar aneh. Model video paling sering gagal di gerak yang rumit, gerak banyak tokoh sekaligus, dan gerak yang arahnya tidak ditulis jelas.

**A. Aturan menulis prompt (dicek A11 sebelum Create)**
1. Satu tokoh utama, satu aksi utama per segmen waktu. Aksi sederhana dan biasa dilakukan manusia: berjalan maju, mengangkat, meletakkan, menunjuk, menunduk. Tidak menggabungkan dua aksi tangan dalam satu segmen.
2. Arah gerak ditulis lengkap: siapa bergerak, ke arah mana dalam frame, dan bahwa arahnya sama dengan arah hadap. Contoh: `walks forward away from the camera, in the direction he is facing`. Hewan tunggangan: `the horses walk forward head first, in the direction they face`.
3. Banyak tokoh atau hewan (barisan, kerumunan, pasukan): diam di tempat atau bergerak pelan searah, kecil di kejauhan. Jangan meminta mereka berbelok, berbalik, menyusul, atau menyeberang di depan kamera. Kerumunan yang diam diberi gerak kecil per orang yang bergiliran, bukan satu gerak untuk semua, dan kamera tidak menembus kerumunan (bagian 2F poin 4 dan 6).
4. Kepala: hanya menunduk, mendongak, atau menoleh paling jauh seperempat putaran. Di JOTA 1 kepala tetap menghadap arah yang sama.
5. Tangan dan lengan: gerak lurus dan pendek (meraih, menggenggam, mengangkat, menurunkan). Jangan memutar, memelintir, mengayun melingkar, atau memindah benda dari tangan ke tangan.
6. Tokoh di atas kuda: tetap duduk; kuda hanya berjalan pelan maju atau berdiri. Tidak berlari, berbalik, atau mundur.
7. Kalau aksinya rumit (bertarung, mencabut senjata sambil bergerak, naik atau turun kendaraan), pecah jadi shot yang lebih kecil: tangan saja, atau hasil akhirnya saja.
8. HINDARI wajib memuat: `No walking or riding backward, no reversed motion, no moonwalking. No head turning more than a quarter turn, no spinning head. No twisting, rotating, or bending arms, wrists, or fingers in unnatural directions. No limbs passing through the body. No bodies changing shape. No horses or people sliding without stepping.`

**B. Cek gerak setelah klip jadi (oleh agen, sebelum klip masuk timeline)**

Ambil frame setiap 0,5 detik dari 0 detik sampai akhir klip, susun berurutan, perbesar tokoh dan hewan. Klip `NOT_USED` kalau satu saja terjadi:

| Cek | Gagal kalau |
|---|---|
| M1 Arah jalan | Tokoh atau hewan berpindah ke arah punggungnya (mundur), atau kaki melangkah berlawanan dengan arah badan berpindah |
| M2 Kepala | Kepala berputar lebih dari seperempat putaran, berbalik ke punggung, atau berputar terus |
| M3 Tangan dan lengan | Lengan, pergelangan, atau jari tertekuk ke arah yang tidak mungkin, berputar, bertambah, atau hilang |
| M4 Tubuh | Badan memelintir, memanjang, menyatu dengan benda atau tokoh lain, atau berubah bentuk |
| M5 Kaki dan meluncur | Tokoh atau hewan berpindah tanpa melangkah, melayang, atau kakinya menembus tanah |
| M6 Hewan | Kuda berjalan mundur, kakinya bertambah atau tertukar, kepala menghadap arah yang salah dari gerak badan |
| M7 Benda | Benda di tangan berpindah tangan sendiri, berputar sendiri, menembus badan, atau berubah bentuk |
| M8 Barisan | Barisan tokoh atau hewan bergerak berlawanan dengan arah hadap mereka, saling menembus, atau barisan yang seharusnya diam bergeser bersama-sama (Umar S28 SHOT18) |

Cara cepat mengecek M1 dan M8: bandingkan posisi tokoh di dua frame berurutan. Kalau bergeser ke arah yang ditunjuk punggungnya, itu mundur.

Klip yang gagal: tulis ulang prompt dengan gerak lebih sederhana (aturan A), render ulang. Setelah 3 kali gagal, ganti dengan shot yang lebih aman. Catat di `RUN_STATE.json` nomor cek yang gagal dan detiknya, misalnya `M1 barisan kuda mundur 3,0-6,0 s`.

## 2D. Blok ATURAN WAJIB di awal setiap prompt (keputusan owner 2026-11-01, sejak v3.33)

Temuan owner: beberapa klip masih lolos dengan wajah, dan gerak aneh muncul di hasil Claude maupun ChatGPT. Aturan yang hanya ditulis di KUNCI dan HINDARI (akhir prompt) kalah oleh kalimat aksi dan kamera di tengah prompt. Karena itu aturan faceless dan gerak natural ditulis ulang **di awal** setiap prompt, sebelum STYLE, keadaan, adegan karakter, dan kamera.

**Urutan wajib**
- Image Prompt: blok ATURAN WAJIB adalah teks paling awal (tanpa label), lalu STYLE, lalu isi gambar.
- Video and Audio Prompt: baris `SC##: judul`, langsung blok ATURAN WAJIB, lalu STYLE, KEADAAN AWAL, ADEGAN, KAMERA, dan seterusnya.
- Blok ini tetap ada walau aturan yang sama juga ditulis di KUNCI dan HINDARI. Tidak boleh diringkas atau diparafrase; disalin persis.

**JOTA 1, Image Prompt** (baris FACELESS pertama sesuai style):
```text
MANDATORY RULES:
FACELESS: {S28: Faceless Islamic children's cartoon illustration. | S40 dan 3D lain: Faceless 3D animated film image.} STRICT FACELESS CHARACTER DESIGN RULE: all human characters have completely smooth, blank, featureless faces. The entire facial surface is one continuous, uninterrupted area of natural skin tone from forehead to chin. No eyes, no eyebrows, no nose, no nostrils, no mouth, no lips, no eyelashes, and no facial expressions. The side-profile silhouette of every face stays smooth, with no protruding nose or lips. This applies to every person from every angle: frontal, side profile, three-quarter, and close-up. Animals have smooth blank heads with no eyes.
NATURAL POSE: Every person and animal stands, sits, or moves in a relaxed, physically natural pose. Heads face the same way as the body. Arms, hands, and fingers bend only in natural directions, with five fingers on each hand. Bodies keep normal human and animal proportions.
HEAD COVERING: Every man wears a turban or a cloth head covering that hides all of his hair. Every woman wears a long khimar that falls to the chest over a loose full-length robe and hides all of her hair. Nobody is bald or bareheaded.
```

**JOTA 1, Video and Audio Prompt**:
```text
SC##: {judul}
MANDATORY RULES:
FACELESS: STRICT FACELESS CHARACTER DESIGN RULE: all human characters have completely smooth, blank, featureless faces. The entire facial surface is one continuous, uninterrupted area of natural skin tone from forehead to chin. No eyes, no eyebrows, no nose, no nostrils, no mouth, no lips, no eyelashes, and no facial expressions. This rule is permanent for every frame of this clip, from every camera angle, including frontal, side profile, three-quarter, and close-up views. The side-profile silhouette stays smooth, with no protruding nose or lips. No facial feature may appear, emerge, or morph during motion, head movement, or camera moves. Characters show emotion only through body posture, hand gestures, small head movement, and composition. Animals keep smooth blank heads with no eyes.
NATURAL MOTION: Every movement is slow, simple, and physically natural, like real people filmed with a real camera. People and animals move forward in the direction they face, head first, never backward. Heads turn at most a quarter turn and stay in line with the body. Arms, wrists, hands, and fingers bend only in natural directions and never rotate, twist, or spin. Bodies, limbs, and objects keep their shape and size. Feet step fully on the ground; nobody slides or floats.
HEAD COVERING: Every man keeps a turban or a cloth head covering that hides all of his hair, and every woman keeps a long khimar that falls to the chest over a loose full-length robe, in every frame of this clip. Nobody is bald or bareheaded, and head coverings never come off.
```

**HINDARI JOTA 1 (wajib, sejak v3.47):** setiap Image Prompt dan Video and Audio Prompt JOTA 1 untuk shot berorang (`people: yes`) memuat kalimat ini di HINDARI: `No eyes, no nose, no mouth, no eyebrows, no ears drawn as facial features on any face. Never two faces on one head, no second face, no face on the back of any head, no double head. No character turning toward the camera.` Tokoh di KUNCI ditulis "always seen from behind or far away".

**JOTA 2**: hanya baris NATURAL MOTION (video) atau NATURAL POSE (gambar) di bawah `ATURAN WAJIB:`.

**Blok mengikuti jenis shot (sejak v3.49).** Blok di atas hanya untuk shot yang memang menampilkan orang (`people: yes`). Temuan produksi Umar S28 (SHOT16): shot tanpa orang yang tetap memuat "Every person...", "Every man... every woman..." menghasilkan kerumunan berwajah. Kalimat yang menyebut orang dibaca model sebagai isi adegan. Karena itu:

Shot tanpa orang (`people: none`), Image Prompt dan Video and Audio Prompt:
```text
MANDATORY RULES:
NO PEOPLE: This shot shows only the place and its objects. No person, no crowd, no figure, and no hand appears at any moment.
NATURAL MOTION: Cloth, flames, water, leaves, and dust move gently and naturally.
```
Tanpa FACELESS, HEAD COVERING, SURROUNDING PEOPLE, dan tanpa kalimat KUNCI tokoh. AVOID memuat `No people, no figures, no silhouettes`.

Shot hanya tangan (`people: hands`):
```text
MANDATORY RULES:
HANDS ONLY: Only one pair of adult hands and forearms in {warna} sleeves appear in the frame. No head, no face, and no other person enters the frame at any moment.
NATURAL MOTION: Hands and fingers move slowly and bend only in natural directions, with five fingers on each hand.
```
KUNCI wajib memuat baris `HANDS:` (pemilik tangan, lengan baju, warna, cincin atau benda yang selalu sama). AVOID memuat `No people, no head, no face`.

**Figuran di sekitar tokoh (permintaan owner 2026-11-01).** Shot berorang yang memuat figuran menambahkan baris ini di MANDATORY RULES, setelah HEAD COVERING:
```text
SURROUNDING PEOPLE: {jumlah, misalnya Four to six} townspeople in the background, small and far from the camera, bodies turned sideways or away, each busy with a task such as {tugas sesuai lokasi}. Men wear long robes and turbans and have full dark beards drawn as one simple solid shape along the jaw and chin. Women wear long khimar head coverings that fall to the chest over loose full-length robes. Every face stays smooth and blank above the beard line.
```
AVOID ditambah `no mustache, no facial features above the beard, no townspeople close to the camera, no townspeople looking at the camera`. KUNCI memuat satu baris kelompok figuran (misalnya `TOWNSPEOPLE:`). Jenggot dipakai karena figuran jauh cukup terbaca sebagai bentuk gelap di dagu; kumis tidak dipakai karena letaknya di antara hidung dan mulut, dua fitur yang paling sering lolos (sesuai sunnah memendekkan kumis, Bukhari 5892, Muslim 259). Data pertama: di SHOT07 Umar S28, sekitar 20 figuran kecil bersorban dan berkhimar tampil polos; jenggot belum pernah diuji, jadi produksi pertama yang memakainya dicatat di bagian 7.

**Baris HEAD COVERING** (keputusan owner 2026-11-01, sejak v3.38): wajib di JOTA 1 dan JOTA 2 untuk kisah Islami, sejarah, dan latar Arab. Temuan uji Runner: wajah polos ala boneka tanpa keterangan penutup kepala menghasilkan tokoh gundul semua. Teks persis ada di blok di atas (Image Prompt dan Video and Audio Prompt). Tokoh di bible tetap ditulis dengan penutup kepala yang spesifik (warna, bentuk), misalnya `dark maroon turban` atau `light blue khimar`. Hanya boleh dihapus untuk proyek yang latarnya bukan Islami dan owner menyebutnya.

Catatan: S28 yang menuntut kalimat pembuka faceless sebagai kalimat pertama tetap terpenuhi, karena kalimat pembuka itu kini menjadi isi baris FACELESS di posisi paling awal. Kata no, not, never di blok ini diizinkan (cek A5).

## 2F. Orang, kamera, dan figuran (wajib sejak v3.49, temuan produksi Umar S28 2026-11-01)

Semua aturan di bawah lahir dari klip yang gagal di produksi `JOTA-M1-UMAR-BIN-KHATTAB-S28-20261101` (lihat `EVALUASI.md` produksi itu). Statusnya hipotesis yang paling cocok dengan data, bukan hasil uji A/B; perbarui setelah produksi berikutnya.

1. **Setiap orang yang tampil punya kalimat KUNCI.** Termasuk pedagang, pemilik tangan, dan kelompok figuran. Shot berorang yang KUNCI-nya hanya STYLE dan LAYOUT dilarang. (SHOT04: pedagang tanpa KUNCI berubah menjadi empat orang berkerudung, berwajah, gaya bergeser ke semi-3D.)
2. **Kamera tidak membuka area yang tidak ada di gambar awal.** Pindah ke jendela, pintu, atau bagian ruangan lain yang belum terlihat dibuat sebagai KEYFRAME baru, bukan glide atau pan dari shot sebelumnya. (SHOT16: kamera bergeser dari tangan ke jendela, model mengarang kerumunan berwajah.)
3. **Kamera tidak mendekat ke orang.** Push in, glide, atau zoom menuju orang, wajah, atau kerumunan dilarang. Close-up tangan atau benda yang dipegang orang dibuat sebagai KEYFRAME `people: hands`. Push in pelan ke benda atau tempat kosong boleh. (SHOT04: kamera mendekat ke pedagang, figuran yang tadinya kecil digambar ulang dari dekat dengan wajah lengkap.)
4. **Kamera tidak menembus kerumunan atau barisan.** Untuk kerumunan dan barisan duduk: kamera diam, push in sangat sedikit dari belakang barisan terakhir, atau bergeser menyamping pada jarak tetap. (SHOT18: kamera maju di antara barisan rapat, barisan yang duduk ikut meluncur serempak seperti robot.)
5. **Tokoh utama selalu punya pekerjaan tangan dan tujuan di dalam frame.** Contoh: memikul gulungan tali sambil berjalan ke gerbang yang terlihat. Tokoh utama tidak ditempatkan sendirian di tengah lorong kosong dengan kamera tepat di belakangnya; pakai sudut tiga perempat dari belakang, tokoh di sepertiga kiri atau kanan frame, dengan figuran berlalu-lalang di depan dan belakangnya. Tetap sesuai KUNCI JOTA 1 "always seen from behind or far away"; shot samping dekat tidak dipakai untuk tokoh utama karena profil wajah memancing hidung. (SHOT07: Umar yang hanya diberi aksi berjalan berhenti, berbalik, dan menatap kamera dengan wajah lengkap.)
6. **Gerak figuran ditulis per orang dan bergiliran.** Contoh: `0-3s one man adjusts his sleeve. 4-6s another man nods slowly. 7-10s the palm-leaf roof sways.` Jangan satu gerak untuk semua orang sekaligus ("everyone breathes softly"). (SHOT18: gerak napas serentak terlihat seperti robot.)
7. **Shaf masjid.** Barisan shalat atau majelis di masjid dikunci "men only" di KUNCI. Kalau ada perempuan, mereka di shaf belakang yang terpisah dan ditulis eksplisit. (SHOT18: perempuan berkhimar muncul di dalam barisan laki-laki.)
8. **Figuran hanya di shot lebar atau sedang-lebar**, menyamping atau membelakangi, jumlahnya ditulis. Tidak ada figuran di close-up.
9. **Gambar BARU untuk shot berorang diperiksa kepalanya sebelum video dibuat** (sudah wajib di bagian 2 SKILL.md untuk JOTA 1). Temuan SHOT07: wajah sudah ada sejak detik 0:01, kemungkinan dari gambar awal; video dari gambar berwajah membuang kredit.

Poin 10 sampai 13 dari produksi Shorts Umar separuh harta (2026-11-01, SHOT02 berwajah), status sama: hipotesis dari data, belum uji A/B.

10. **Tokoh yang bekerja dengan tangan membelakangi kamera, benda kerja di seberangnya.** Benda kerja (karung, timbangan, peti, tali) diletakkan di SEBERANG tokoh, lebih jauh dari kamera daripada tokoh. Kamera di belakang tokoh dan sedikit lebih tinggi, tokoh membelakangi kamera. Jangan meletakkan benda di samping atau di depan tokoh (antara tokoh dan kamera), karena model memutar tokoh menjadi tampak samping dan profil wajah muncul. Tulis posisi ini di KEADAAN AWAL dan LAYOUT di KUNCI, misalnya `the sacks lie on the far side of him, away from the camera; he faces away from the camera; camera behind him, slightly above`.
11. **Tidak ada aksi tangan di dekat kepala atau wajah.** Mengikat tali dengan mulut, mengusap wajah atau dahi, minum, makan, membetulkan sorban di dekat muka, dan sejenisnya tidak ditulis di ADEGAN. Aksi tangan tetap di bawah bahu, di benda kerja. Larangan ini juga ditulis di HINDARI (`Never hands near the head or face`).
12. **KEYFRAME pembuka tokoh utama memakai shot lebar.** Shot pertama yang memunculkan tokoh utama (biasanya SC01, juga KEYFRAME pindah lokasi) dibuat lebar, tokoh kecil di frame (sekitar sepertiga tinggi frame atau kurang), seluruh badan dan lingkungan terlihat. Ukuran shot lebih dekat hanya lewat SAMBUNG dari frame yang lolos cek, atau lewat shot tangan `people: hands`.
13. **Frame sumber berwajah menular ke semua shot SAMBUNG.** Wajah di frame terakhir ikut ke setiap shot yang memakai frame itu. Karena tidak ada QC otomatis (SKILL.md aturan inti 5), pencegahannya di prompt: rantai SAMBUNG sebaiknya dimulai dari shot tangan (`people: hands`) atau shot tanpa orang; tokoh utama di shot sangat lebar dari belakang dibuat sebagai KEYFRAME yang tidak menjadi sumber SAMBUNG (contoh: Umar separuh harta versi 3).

Runner memeriksa poin 1, 3, 4, dan blok jenis shot lewat bidang `people` dan `tag` di `shots.json` (README Runner, bagian Format shots.json). Poin 2, 5 sampai 12 diperiksa agen saat menulis prompt (cek A15 di bagian 6). Poin 13 diperiksa Runner sebelum setiap shot SAMBUNG, dan oleh agen atau owner untuk operator AI dan Manual.

## 2G. Faceless Character Lock (wajib sejak v3.58.0, permintaan owner 2026-11-02)

Dasar: analisa owner (dokumen "Faceless Master Prompt V1.0") dan bukti produksi 2026-11-01. ADMK01: semua tokoh berwajah lengkap walau setiap prompt memuat larangan wajah; tokoh berbicara dan gambar awal yang berwajah adalah pemicu utamanya. Gambar acuan karakter dari Create Image dengan kalimat faceless yang kuat lolos polos total (CH01-AYAH, CH02-ANAK di `evals/UJI-ACUAN-FACELESS-20261101/refs/`). Prinsipnya: wajah dikunci lewat **desain karakter dan gambar awal**, bukan lewat larangan di prompt video.

**1. Master karakter, sekali per tokoh.** Setiap tokoh punya master faceless di Media Library VideoExpress, folder `JOTA - Master 5 Karakter Faceless` (sudah berisi Ubadi_2, Saheela_4, Umair_7, Ukasyah_9, Uwais_12, semuanya 2D). Tokoh baru dibuat di VideoExpress Create Image dengan blok MANDATORY RULES 2D, latar putih polos, seluruh badan, lalu disimpan di folder itu. Bila memungkinkan dibuat character sheet: tampak depan, samping, tiga perempat, dan belakang dengan wajah, pakaian, dan proporsi yang sama; tampak samping wajib profil mulus tanpa tonjolan hidung atau bibir. Owner menyetujui master sekali; setelah itu master tidak dibuat ulang per video.

**2. Gambar awal setiap shot lolos faceless.** Video mengikuti gambar awal, jadi gambar awal yang berwajah pasti menghasilkan klip berwajah. Cara VideoExpress yang dipakai owner (alat **First Frame, Last Frame**):
- Scene pertama: `Use Consistent Character` ON, Reference Photo dari folder master (Reference Photo Type sesuai style), **First Frame Prompt** berisi latar dan adegan (template bagian 3), lalu Video and Audio Prompt (poin 3).
- Scene berikutnya: `Use Consistent Character` OFF, **First Frame from Library** memilih frame terakhir scene sebelumnya, lalu Video and Audio Prompt.
- Frame terakhir yang sudah berwajah tidak dipakai sebagai gambar awal scene berikutnya (poin 13 bagian 2F).
- Catatan Runner: alat ini belum diotomatisasi. Uji 2026-11-01 menunjukkan Create Video From Prompt dengan Consistent Character dan Reference Photo tidak menghasilkan job (UJIAC1 dan UJIAC2: tiga kiriman tanpa ID job, tidak ada klip). Runner harus diajari alat First Frame, Last Frame sebelum cara ini dipakai di produksi.

**3. Prompt video untuk shot dengan gambar awal: gerak dulu, deskripsi sedikit.** Karena desain tokoh sudah ditentukan gambar awal, Video and Audio Prompt untuk shot image-to-video (scene dengan First Frame, SAMBUNG, PAKAI ULANG) ditulis pendek dan didominasi gerak, bukan deskripsi visual panjang. Struktur:
```text
SHOT##: {judul}
{Blok MANDATORY RULES sesuai jenis shot, bagian 2D, disalin persis}
STYLE: {style tag persis}.
MOTION:
A continuous {durasi}-second shot. {Tokoh A}: {satu gerak tubuh atau tangan, arah jelas}. {Tokoh B}: {satu gerak}. Their facial surfaces remain completely blank, smooth, and featureless at every moment, including as their heads move. {Gerak lingkungan: kain, daun, uap, cahaya}. The camera {satu gerak kamera sederhana}. Preserve the original character designs and the {style} style. Subtle natural movement, no cuts, no facial transformation.
SOUND:
{Ambience, Foley, Room singkat; dialog hanya kalau paket menuntut, bagian 5 di bawah}
CONSISTENCY LOCK:
STYLE: {style tag persis}. Keep this exact style for the entire video.
{satu baris per tokoh: nama, pakaian, penutup kepala, "same blank face as the starting image"}
AVOID (NEGATIVES):
{kalimat HINDARI JOTA 1 bagian 2D, larangan gerak 2C poin 8, no cuts, no text}
```
Template PRO lengkap (bagian 4) tetap dipakai untuk Image Prompt dan First Frame Prompt (gambar yang menentukan desain), dan untuk shot tanpa gambar awal.

**4. Kata yang dilarang di ADEGAN, MOTION, dan KAMERA untuk shot berorang:** `smile`, `smiling`, `blink`, `wink`, `frown`, `laugh`, `cry`, `facial expression`, `looks at the camera`, `looking at the camera`, `turns to the camera`, `close-up of the face`. Emosi ditulis lewat tubuh: bahu turun, kepala menunduk, tangan memeluk, langkah melambat. Kepala menoleh paling jauh seperempat putaran (2C poin 4); tidak ada putaran kepala atau kamera 180 derajat. Runner menolak kata-kata ini (cek A16).

**5. Bicara tanpa mulut: ucapan tokoh selalu terpisah dari klip (keputusan owner 2026-11-02 06:04).** Owner memastikan mata dan hidung muncul karena tokohnya berbicara (ADMK01 dan uji manual owner). Karena itu tokoh **tidak pernah berbicara di dalam klip**:
- Klip dibuat tanpa suara orang (varian narator bagian 4A: NO HUMAN VOICES, tanpa bagian DIALOGUE). ADEGAN dan MOTION tidak menulis `speaks`, `says`, `talks`, `lip`, atau `mouth`.
- **Satu shot, satu pembicara.** Ucapan tokoh di shot itu diisi di `narration` (`shots.json`) dan suaranya di `voice` shot (suara tetap per tokoh, dicatat di bible). Runner membuatnya dengan `Narration Video` VideoExpress, maksimal 120 karakter; atau sebagai file ElevenLabs terpisah kalau owner memilih ElevenLabs.
- **Gestur bicara** untuk tokoh yang sedang "berbicara": tangan terbuka menjelaskan, menunjuk benda, kepala mengangguk kecil, badan condong ke lawan bicara, bahu bergerak mengikuti kalimat. Pendengar diam atau mengangguk pelan. Ditulis sebagai gerak tubuh, misalnya `the older brother gestures with an open right hand toward the tray and nods slightly, as if explaining`.
- Subtitle menyebut siapa yang berbicara (warna atau nama) saat dirakit.
- AVOID shot berorang memuat `no talking, no lip movement, no mouth`.
Runner menolak bagian DIALOGUE dan kata bicara di ADEGAN atau MOTION untuk proyek JOTA 1 (cek A16).

**6. Yang tidak diambil dari dokumen owner, dan alasannya:**
- Pindah ke Kling, Runway, atau Veo: provider dikunci ke VideoExpress (`VIDEOEXPRESS_PROVIDER_LOCK.md`). Alat First Frame, Last Frame dengan Consistent Character di VideoExpress adalah padanannya.
- Pemeriksaan semua frame oleh agen atau Runner: QC otomatis dihapus atas keputusan owner 2026-11-01 (SKILL.md aturan inti 5). Owner yang menonton dan menyebut detik yang salah.
- Klip 3 sampai 5 detik: belum diubah karena owner memutuskan 10 detik per shot; menunggu keputusan owner (`OPEN_ITEMS.md`).
- Animasi 2D rigged (wajah polos permanen, AI hanya untuk latar): jalur yang paling pasti faceless, tetapi di luar VideoExpress; dicatat sebagai pilihan jangka panjang.


## 2H. Format bicara di klip (wajib untuk tokoh yang bicara, sejak v3.60.0)

Bukti: shot owner 2026-11-02 (pemuda backpacker, 3D Clay, 10 detik) bicara dengan suara di klip dan wajah tetap polos. Menggantikan larangan dialog di 2G poin 5 untuk shot `"speech": "clip"`.

1. Gambar awal dibuat dulu dengan Create Image dan harus polos sebelum Create Video.
2. Pengaturan: Consistent Character OFF, Lipsync HD Video OFF, Narration Video OFF, Video Only (No Sound) OFF, enhance video prompt OFF, Manual Video Length 10.
3. Urutan bagian (label boleh tebal `**...:**`): STYLE, CHARACTER, SCENE: 10 SECONDS dengan baris per detik, SCRIPT NGOMONG, SUARA, CAMERA, ENDING, STRICT CONSISTENCY.
4. CHARACTER memuat `completely faceless, no eyes, no nose, no eyebrows, no mouth` lalu pakaian lengkap. STRICT CONSISTENCY memuat `Completely blank face throughout. No eyes, nose, mouth, or facial features.`
5. Ucapan hanya di SCRIPT NGOMONG: `Line 1, <jenis suara>:` lalu satu kalimat dalam kutip. SUARA menyebutnya `Bahasa Indonesia voice-over` plus suara latar, `No background music.`
6. Saat ucapan, tubuh yang bergerak: angkat tangan, menunjuk, berjalan, memakai tas. Kata speaks, says, talks, lips, mouth, smile, blink, look at the camera, close-up tidak dipakai di luar CHARACTER dan STRICT CONSISTENCY (dicek Runner).
7. Satu tokoh per shot (`No extra characters`).

## 2D-1. Bahasa prompt di VideoExpress (keputusan owner 2026-11-01, sejak v3.48)

Semua teks yang ditempel ke VideoExpress (Image Prompt dan Video and Audio Prompt) ditulis dalam bahasa Inggris, termasuk label bagian dan judul shot setelah `SHOT##:`. Bahasa Indonesia hanya untuk narasi (yang tidak ditempel ke generator video) dan dokumen storyboard. Label yang dipakai:

| Label lama (dokumen ini) | Label di prompt |
|---|---|
| ATURAN WAJIB | MANDATORY RULES |
| SCRIPT NGOMONG | DIALOGUE |
| TANPA SUARA ORANG (varian narator) | NO HUMAN VOICES |
| LINGKUNGAN (varian shot) | SURROUNDINGS |
| AKSI (varian shot) | ACTION |
| KEADAAN AWAL | OPENING STATE |
| ADEGAN | ACTION |
| KAMERA | CAMERA |
| CAHAYA | LIGHT |
| SUARA | SOUND |
| KEADAAN AKHIR | END STATE |
| AKHIR SHOT | CLOSING MOTION |
| KUNCI | CONSISTENCY LOCK |
| HINDARI (NEGATIVES) | AVOID (NEGATIVES) |

Sejak v3.49 semua blok kode template dan contoh di repo (dokumen ini, `CONSISTENCY_RULES.md`, `SCENE_WORKFLOW.md`, `templates/PROMPTS_TEMPLATE.md`) sudah memakai label Inggris, jadi bisa disalin langsung. Nama Indonesia di kolom kiri hanya dipakai sebagai nama bagian di teks penjelasan. Runner menolak prompt yang masih memakai label Indonesia.

## 2E. Beberapa sudut dalam satu klip: Multi-Shot (belum diuji)

Permintaan owner 2026-11-01: dalam satu scene, tampilan dan adegan bisa berganti seolah beda scene. Info dari owner 2026-11-04 tentang Multi-Shot VideoExpress 3.5 (belum diverifikasi di akun): dipakai di Create with AI, Create Video From Prompt (label `New Multi-Shot`); kotak Video and Audio Prompt diisi beberapa shot berurutan dalam satu paragraf seperti arahan sutradara; kalimat present tense, dibuka dengan setup kamera, kejadian ditulis berurutan, perpindahan sudut ditulis seperti `Cut to a close-up ...`, dialog dalam tanda kutip dengan nama penutur; tanpa timestamp dan tanpa daftar poin; durasi diatur lewat Advanced Mode; hasil masuk My AI Videos.

Konsekuensi untuk JOTA:
- Prompt kartu klip sekarang menulis `A single continuous shot, no cuts` dan blok aturan berbentuk daftar. Untuk Multi-Shot, kalimat itu dibuang dan blok aturan diringkas menjadi kalimat biasa di akhir paragraf.
- Satu gambar awal dipakai untuk semua shot di dalam klip. Sudut baru setelah `Cut to` digambar model tanpa foto acuan, jadi risiko wajah (terutama tampak samping, lihat v3.88) lebih besar daripada klip BARU dengan Consistent Character.

Uji sebelum dipakai di produksi:
1. Satu klip uji, dua shot: misalnya kamera dari belakang Uwais mengetuk pintu, lalu `Cut to a close-up of his closed fist knocking on the door.` Tanpa timestamp.
2. Lolos kalau: sudut benar-benar berganti, tokoh, baju, dan tas tetap sama, wajah tetap polos (JOTA 1), gerak natural, dan suara tidak terputus.
3. Hasil uji dicatat di bagian 7 dan `CHANGELOG.md`, baru kemudian dijadikan pilihan di kartu klip. Sampai itu terjadi, satu klip tetap satu shot.

## 3. IMAGE PROMPT (SC01, scene KEYFRAME, OP2)

```text
{Blok MANDATORY RULES sesuai jenis shot Image Prompt dari bagian 2D, disalin persis, sebagai teks paling awal}
STYLE: {style tag persis}.
{Lokasi, waktu, cuaca}. {Tokoh A: pose, posisi di sepertiga kiri atau kanan layar, arah pandang, benda di tangan, dari Buku keadaan}. {Tokoh B ...}
Objects now: {keadaan setiap benda dengan hitungan}.
Composition: {ukuran shot}, eye level, side three-quarter view, main character on the {left/right} third of the frame, {satu benda latar depan di tepi frame} in the foreground, {landmark lokasi} in the background. {2D: layered painted background with simpler, lighter detail behind the characters. 3D: lensa, misalnya 35mm, with soft background depth of field.} Full heads and headwear inside the frame.
Light: {sumber cahaya utama yang jelas, misalnya warm morning light from the window on the left}, soft shadows falling to the {right}. {2D: soft cel shading.}
Texture: clean stable line art and consistent painted surfaces.
CONSISTENCY LOCK:
STYLE: {style tag persis}. Keep this exact style for the entire video.
{kalimat KUNCI tokoh persis, satu baris per tokoh}
{SCALE persis}
{kalimat KUNCI benda persis}
{LAYOUT persis}
{JOTA 1: FACELESS: blank empty face ovals for every person, in every frame.}
Aspect ratio {rasio}.
AVOID (NEGATIVES):
No text, no letters, no numbers, no logos, no watermark. No extra people, no extra fingers, no merged hands, no floating objects.
```

## 4. VIDEO AND AUDIO PROMPT (setiap scene)

```text
SC##: {judul pendek}
{Blok MANDATORY RULES sesuai jenis shot Video and Audio Prompt dari bagian 2D, disalin persis}
STYLE: {style tag persis, sama dengan di KUNCI}.
OPENING STATE:
{SAMBUNG: Continue directly from the selected starting image, same take.} {posisi, pose, arah pandang, benda di tangan setiap tokoh}. {keadaan setiap benda dengan hitungan}.

ACTION:
From the very first frame, {aksi yang sudah berjalan}. Every movement has natural weight: it starts gently, peaks, and settles; feet stay planted on the ground while standing and step fully while walking.
0-3s: {aksi A, termasuk bagaimana tangan menyentuh benda} while {reaksi gerak B}. {A} speaks line 1.
3-6s: {aksi B, benda yang dipindah dan ke mana} while {reaksi gerak A}. {B} speaks line 2.
6-8s: {aksi baru}. {A} speaks line 3.
8-10s: {aksi lanjutan pelan menuju keadaan akhir}.
Whenever nobody speaks, someone is visibly moving: small natural actions such as adjusting a sleeve, shifting weight, or turning toward the other character.

CAMERA:
Start: {SAMBUNG: The camera starts exactly at the framing of the selected starting image:} {ukuran shot}, {sudut}, {tinggi}, {3D saja: lensa}, camera placed {posisi menurut peta lokasi}, {A} on screen {left/right}, {B} on screen {left/right}, {landmark}.
The camera behaves like a real film camera on a dolly or slider: every move eases in and eases out, with motivated, steady motion.
0-3s: {gerakan} {arah} at a {kecepatan} speed, from {framing} to {framing}, because {alasan}.
3-6s: {gerakan sesuai emosi} {arah} at a {kecepatan} speed, from {framing} to {framing}, because {alasan}.
6-8s: {gerakan} {arah} at a {kecepatan} speed, from {framing} to {framing}, because {alasan}.
8-10s: the camera eases to almost still and ends on {framing akhir}, {A} on screen {left/right}, {B} on screen {left/right}.
The camera stays on the same side of the characters for the whole clip. Every main character's full head, including headwear, stays inside the frame.

LIGHT:
{sumber cahaya utama dan arahnya, sama dengan gambar awal; 2D: tambah soft cel shading}. Shadows keep the same direction for the whole clip. {suasana warna, misalnya warm golden morning tones}. Line art, colors, and painted textures stay stable from the first frame to the last.

DIALOGUE:
Line 1, {A} says exactly, in a {suara tetap tokoh} Bahasa Indonesia voice: "{kalimat 1}"
Line 2, {B} replies exactly, in a {suara tetap tokoh} Bahasa Indonesia voice: "{kalimat 2}"
Line 3, {A} answers exactly: "{kalimat 3}"
Lines follow the timing in ACTION. Only these exact words are spoken.

SOUND:
0-3s: Ambience: {1 sampai 2 suara lokasi yang terdengar sesekali, dari katalog bagian 5}. Foley: {suara dari aksi 0-3s, misalnya soft footsteps on the wooden floor}. Room: {akustik lokasi, misalnya a small room with a soft close sound}. {A}'s line 1 in {A}'s own voice, matching {A}'s movements.
3-6s: Ambience: {suara lokasi berikutnya}. Foley: {suara dari aksi 3-6s}. {B}'s line 2.
6-8s: Ambience: {...}. Foley: {...}. {A}'s line 3.
8-10s: Ambience: {...}. Foley: {suara aksi lanjutan, misalnya fabric rustling softly}. Only these voices and sounds are heard.

END STATE:
{posisi, pose, benda di tangan setiap tokoh}. {keadaan setiap benda dengan hitungan}.
Objects move only when a character moves them on screen.

CLOSING MOTION:
{aksi lanjutan pelan}. All characters fully visible and sharp. The camera eases down. The characters keep moving gently until the very last frame.

CONSISTENCY LOCK:
STYLE: {style tag persis}. Keep this exact style for the entire video.
{kalimat KUNCI tokoh persis, satu baris per tokoh}
{SCALE persis}
{kalimat KUNCI benda persis}
{LAYOUT persis}
{JOTA 1: FACELESS: every person keeps a plain blank face oval in every frame of the entire video; no eyes and no nose ever appear, even while speaking. A mouth may appear only on the character who is speaking.}
FRAME: {A} and {B} remain in the shot the entire time. Aspect ratio {rasio}.

AVOID (NEGATIVES):
No music, no humming, no background drone, no hiss, no narrator, no other speech. No pause, no freezing, no idle standing. No sliding feet, no floating, no extra fingers, no merged or melting hands, no objects passing through bodies. No objects appearing, disappearing, multiplying, changing color, or changing shape. No style change, no photorealistic conversion{2D: , no 3D rendering}. No cuts. No text, no letters, no logos.
```

Catatan JOTA 2: baris FACELESS diganti `Only the character who is speaking moves their mouth; listeners keep their mouths closed.`; baris `No music` tetap (musik ditambahkan saat rakit kalau dipakai).

## 4A. Varian narator (`Narration Video`), wajib sejak v3.30

Masalah: VideoExpress membuat klip dengan suara asli dari model video, lalu menempelkan suara TTS narator. Pada `JOTA-M1-ABDURRAHMAN-BIN-AUF-20261031` owner mendengar suara narator dobel. Semua Video and Audio Prompt di produksi itu memuat bagian `NARASI: A calm male narrator tells this part of the story in Bahasa Indonesia; his voice is added separately.` dan baris `NARRATION:` di KUNCI. Penyebab paling mungkin: model video membaca kalimat itu sebagai perintah membuat suara narator sendiri, lalu TTS ditumpuk di atasnya. Kemungkinan ini belum dibuktikan dengan uji pembanding; verifikasinya adalah produksi narator berikutnya didengar owner (G3).

Aturan untuk setiap scene narator:
1. Teks narasi hanya diketik di kotak TTS (`Create Narration Video`). Video and Audio Prompt tidak memuat bagian NARASI atau SCRIPT NGOMONG, dan tidak memuat kata narrator, narration, voice-over, storyteller, nama bahasa, atau isi narasi. Larangan di HINDARI ditulis tanpa kata-kata itu.
2. Ganti bagian SCRIPT NGOMONG dengan:
```text
NO HUMAN VOICES:
This clip has no human voice at all: no talking, whispering, humming, singing, shouting, or crying aloud. Every character keeps a closed, blank face.
```
3. SUARA hanya Ambience, Foley, dan Room. Jangan menulis napas, isak, tangis, atau "someone out of view", karena bisa dibuat menjadi suara orang. Penutup segmen 8-10s: `Only these natural sounds are heard; there is no human voice.`
4. KUNCI: tidak ada baris NARRATION. Pakai `SILENT: no human voice is heard in this clip.`
5. HINDARI dimulai dengan: `No music, no humming, no background drone, no hiss, no human voice of any kind: no speech, no whispering, no singing, no crying sounds.`
6. Cek P3 sebelum Create: isi kotak video prompt dibaca dari halaman dan dicari kata `narrat`, `voice-over`, `voiceover`, `Bahasa`, `speak`, `says`, serta potongan kalimat narasi. Kalimat wajib di poin 2 dan 4 sengaja ditulis tanpa kata-kata itu, jadi hasil pencarian harus nol. Kalau ada, tulis ulang dulu.
7. Teks TTS maksimal 120 karakter. Suara narator dipilih satu untuk seluruh video (misalnya Ardi untuk laki-laki) dan dicatat di `RUN_STATE.json` kolom `voice`.
8. Durasi klip mengikuti panjang narasi ditambah 1 sampai 2 detik, bukan slider 10 detik. Data produksi Abdurrahman dan Khalid: 49 karakter = klip 6 detik, 70 karakter = 6 detik, 85 sampai 99 karakter = 7 sampai 8 detik. Frame sambungan diambil setelah narasi selesai (paling mudah: `Save Last Frame`).
9. **Produksi YouTube: pakai durasi penuh** (keputusan owner 2026-11-01). Teks narasi per scene 105 sampai 120 karakter (sekitar 16 sampai 19 kata), supaya klip sekitar 9 sampai 10 detik. Narasi yang lebih pendek ditambah kalimat yang tetap bersumber (konteks tempat, waktu, atau akibat), bukan kata pengisi. Beat sheet ADEGAN tetap 0-3s, 3-6s, 6-8s, 8-10s; aksi utama selesai di 8 detik.
10. **Belum diuji, jangan dipakai tanpa uji:** narasi sebagai trek suara terpisah di editor (`Import Media` > `Text to Speech`) dengan klip video penuh 10 detik tanpa `Narration Video`. Kalau uji lolos (suara Ardi tersedia, sinkron, tidak dobel), cara ini menggantikan poin 1 sampai 9 karena narasi bisa lebih panjang dari 120 karakter dan klip selalu 10 detik.

## 4B. Varian shot untuk produksi film YouTube (wajib sejak v3.35)

Dipakai untuk setiap shot di shot list `STORYTELLING_FILM.md` bagian 9. Satu shot satu aksi utama, karena klip pendek. Ditulis sedetail mungkin supaya model tidak menebak: siapa, di mana, benda apa dengan jumlah, ke arah mana bergerak, dari mana cahaya, suara apa.

```text
SHOT##: [bagian A sampai I] {judul pendek}
MANDATORY RULES:
{blok persis dari bagian 2D: FACELESS (JOTA 1) dan NATURAL MOTION}
STYLE: {style tag persis}.
SHOT:
{jenis shot: aman / depan / suasana / pengisi}. {ukuran shot}, {sudut}, {tinggi kamera}, {3D: lensa}, camera placed {posisi menurut peta lokasi}. {tokoh atau benda utama} on the {left/right} third or center. {satu benda latar depan di tepi frame}. {landmark latar belakang}.
OPENING STATE:
{SAMBUNG: Continue directly from the selected starting image, same take.} {posisi, pose, arah hadap setiap tokoh}. {benda dengan hitungan}.
ACTION:
From the very first frame, {aksi yang sudah berjalan}. Every movement has natural weight: it starts gently, peaks, and settles.
{klip 5 detik: 0-2s, 2-4s, 4-5s. Klip bernarasi: 0-3s, 3-6s, 6-8s, 8-10s.} {satu aksi sederhana per segmen, arah gerak searah hadap ditulis jelas}.
SURROUNDINGS:
{orang di latar dan kegiatan umum mereka, kecil dan sibuk; hewan; benda bergerak karena angin}. Materials: {minimal 3 bahan dengan tanda pakai}. Depth: foreground {..}; midground {..}; background {..}. Atmosphere: {debu, kabut, asap, uap yang menangkap cahaya}.
CAMERA:
The camera behaves like a real film camera on a dolly or crane: every move eases in and eases out, with motivated, steady motion, and foreground elements pass slowly in front of the lens for parallax.
{satu atau dua gerakan sesuai durasi}: {gerakan} {arah} at a {kecepatan} speed, from {framing} to {framing}, because {emosi atau alasan cerita}.
Ends on {framing akhir}.
LIGHT:
{cahaya utama: arah, warna, jam}, {rim light}, {pantulan}. Grade: {warna film}. Shadows keep the same direction for the whole clip.
{shot bernarasi: TANPA SUARA ORANG dari bagian 4A. Shot tanpa narasi: baris yang sama juga dipakai.}
SOUND:
{per segmen: Ambience (1 sampai 2 suara lokasi), Foley (suara aksi), Room (akustik)}. Only these natural sounds are heard; there is no human voice.
END STATE:
{posisi, pose, benda dengan hitungan}. Objects move only when a character or the wind moves them on screen.
CLOSING MOTION:
{gerak kecil yang berlanjut}. The camera eases down. Gentle movement continues until the very last frame.
CONSISTENCY LOCK:
{STYLE, tokoh, SCALE, benda, LAYOUT, FACELESS, SILENT, FRAME dan rasio, disalin persis dari bible}
AVOID (NEGATIVES):
{baris larangan suara dan suara orang dari 4A} {baris gerak dari 2C poin 8} {larangan wajah JOTA 1} No close-up of any face. {adab: no idols, no visible awrah, no congregation prayer rows with an imam} No style change, no photorealistic conversion. No cuts. No text, no letters, no logos.
```

Image Prompt untuk shot KEYFRAME memakai bagian 3 dengan blok ATURAN WAJIB, ditambah baris LINGKUNGAN yang sama dengan video prompt-nya, supaya latar sudah hidup sejak gambar awal.

Cek tambahan sebelum Create: A13 shot sesuai shot list (bagian, ukuran, gerak kamera, narasi, jenis shot); A14 latar hidup (ada orang atau hewan atau benda yang bergerak, kecuali shot hening yang disengaja).

## 5. Katalog suara latar dan suara sekitar

Pilih dari lokasi yang sesuai, lalu sebar di segmen waktu. Setiap segmen cukup 1 sampai 2 suara suasana, ditulis sebagai kejadian sesekali. Suara ditulis dalam bahasa Inggris di prompt.

| Lokasi | Suasana (sesekali, jauh) | Foley umum | Ruang |
|---|---|---|---|
| Rumah, pagi | a rooster crows once far away; birds chirp briefly outside the window; a motorbike passes far down the lane | soft footsteps on tiles, a cup set on a wooden table, curtain fabric rustling | small room, soft close sound |
| Dapur | a pot lid rattles softly once; water drips into the sink | chopping on a wooden board, a spoon tapping a pan, a tap turned on briefly | small tiled room, light echo |
| Kamar, malam | crickets chirp outside now and then; a gecko calls once | blanket rustling, a book page turning, a pillow patted | quiet small room, close sound |
| Teras, hujan | rain patters on the roof and drips from the eaves; distant thunder rolls once | sandals on wet tiles, an umbrella shaken, a door creaking | semi-open porch, rain all around |
| Sawah, pematang | birds call across the field; wind passes through rice leaves now and then; a far tractor rumbles briefly | footsteps on soft dirt, grass brushing legs, a bucket handle creaking | wide open outdoors, sound fades naturally into the air |
| Kolam, kandang entok | ducks quack softly in the flock now and then; water ripples as a duck paddles | feed scattered on the ground, a wooden gate latch, wet mud steps | open outdoors |
| Masjid, mushola | soft footsteps of other worshippers far behind; a ceiling fan clicks once | prayer mat unrolled, cloth rustle, bare feet on carpet | large calm room, gentle echo |
| Pasar | vendors call far away; a motorbike horn far off; plastic bags rustle nearby | coins handed over, a basket set down, paper bag folded | busy open space |
| Sekolah, kelas | children laugh far down the hall; a school bell rings once far away | pencil on paper, chair legs on the floor, a book closed | classroom, light echo |
| Jalan kampung | a bicycle bell rings once; a dog barks far away; leaves rustle in a breeze | footsteps on gravel, a gate swinging | open lane |
| Warung makan | a wok sizzles at the back; plates clink at another table | spoon on a plate, a glass set down, a chair pulled | small busy room |

Masjid dan mushola: azan, bacaan Al-Qur'an, dan doa tidak dibuat oleh generator klip, karena lafalnya tidak bisa dijamin benar. Kalau cerita membutuhkannya, tambahkan rekaman asli yang lisensinya jelas saat rakit.

## 6. Cek anti-AI sebelum setiap Create (tambahan P2, setelah K1 sampai K7)

| Cek | Lulus kalau |
|---|---|
| A1 Bobot gerak | ADEGAN memuat kalimat bobot gerak dan kontak tangan dengan benda |
| A2 Kamera nyata | Kalimat ease in dan ease out, alasan dan framing akhir di setiap gerak; tidak ada gerak yang memperbesar kepala melebihi ukuran di gambar awal |
| A3 Cahaya | Satu sumber cahaya utama yang sama dengan gambar awal, arah bayangan tetap |
| A4 Suara tiga lapis | Setiap segmen waktu punya Ambience (suasana) dan Foley; ada baris Room (ruang); ditutup "Only these voices and sounds are heard" |
| A5 Larangan di tempatnya | Kata no, not, never, dan without hanya ada di blok ATURAN WAJIB, HINDARI, kalimat FACELESS, dan kalimat KUNCI yang disalin dari bible |
| A12 Blok ATURAN WAJIB | Image Prompt diawali blok MANDATORY RULES; Video and Audio Prompt punya blok MANDATORY RULES tepat setelah baris `SC##`, sebelum STYLE; isinya persis sama dengan bagian 2D sesuai jenis shot (berorang JOTA 1: FACELESS, NATURAL MOTION atau NATURAL POSE, HEAD COVERING, SURROUNDING PEOPLE kalau ada figuran; tanpa orang: NO PEOPLE; tangan: HANDS ONLY; JOTA 2: gerak saja ditambah HEAD COVERING untuk latar Islami) |
| A6 Utuh | Panjang isi kotak prompt di halaman sama dengan panjang teks di `PROMPTS.md` |
| A7 Komposisi | Tokoh utama di sepertiga layar, ada latar depan dan latar belakang |
| A8 Gaya | Baris STYLE setelah label dan STYLE di KUNCI identik dengan style tag katalog; untuk style 2D tidak ada kosakata 3D atau foto (lens, mm, depth of field, bokeh, blur, realistic) di luar HINDARI |
| A10 Detail sinematik | Style 3D atau permintaan sinematik: Image Prompt punya baris Materials (minimal 3 bahan dengan tanda pakai), Depth (3 lapis), Atmosphere, Light (utama, rim, pantulan), dan Grade; video prompt punya gerak sekunder dan paralaks (bagian 2B) |
| A11 Gerak natural | Setiap segmen satu aksi sederhana, arah gerak searah hadap ditulis jelas, barisan dan kerumunan diam atau bergerak pelan searah di kejauhan, kepala maksimal seperempat putaran, tangan tanpa gerak memutar, baris HINDARI gerak (bagian 2C poin 8) ada |
| A13 Sesuai shot list | Produksi film YouTube: bagian, ukuran shot, gerak kamera, jenis shot, dan narasi sama dengan shot list (`STORYTELLING_FILM.md` 9) |
| A14 Latar hidup | Baris LINGKUNGAN memuat orang, hewan, atau benda yang bergerak di latar, kecuali shot hening yang memang disengaja |
| A15 Orang dan kamera | Jenis shot (`people`) sesuai isi: tanpa orang memakai NO PEOPLE, tangan memakai HANDS ONLY, berorang memakai FACELESS dan HEAD COVERING; setiap orang dan kelompok figuran punya KUNCI; kamera tidak membuka area baru, tidak mendekat ke orang, tidak menembus kerumunan; tokoh utama punya pekerjaan tangan dan tujuan di frame; gerak figuran per orang dan bergiliran; shaf masjid laki-laki saja; tokoh yang bekerja membelakangi kamera dengan benda kerja di seberangnya; tidak ada aksi tangan di dekat kepala atau wajah; KEYFRAME pembuka tokoh utama shot lebar (bagian 2F) |
| A16 Faceless lock (v3.58.0) | Shot berorang: baris FACELESS memakai master faceless bagian 2D; ADEGAN, MOTION, dan KAMERA tanpa kata wajah terlarang (bagian 2G poin 4) dan tanpa aksi berbicara (poin 5); shot `"speech": "clip"` dicek dengan format 2H; shot dengan gambar awal memakai prompt gerak pendek (poin 3); gambar awal scene pertama dari Consistent Character dengan master folder; gambar awal berikutnya bukan frame berwajah |
| A9 Karakter | Kalimat KUNCI tiap tokoh identik dengan bible (K2), deskripsi suara tokoh sama dengan bible, tidak ada tokoh di luar bible, KEYFRAME sesudah SC01 memakai Reference Photo keyframe SC01 |

Kalau satu cek gagal: perbaiki prompt dulu, lalu lanjut (tidak menghentikan produksi).

## 7. Status uji

Template ini disusun dari aturan JOTA yang sudah teruji (KUNCI, keadaan, kamera, faceless) ditambah teknik yang belum diuji di akun owner: larangan dikumpulkan di HINDARI, suara per segmen waktu, kalimat bobot gerak, kamera dolly, dan cahaya bersumber. Sumber teknik tambahan: pengalaman produksi JOTA dan pembacaan skill komunitas `ratava/videoexpress-scripting-skill` (CC BY-NC 4.0), ditulis ulang, tidak disalin.

Uji pembanding 2026-10-31 (`JOTA-M2-DUEL-NINJA-ATAP-20261031`): prompt paragraf mengalir gaya system prompt resmi VideoExpress (sekitar 1.300 karakter, tanpa label, tanpa HINDARI) ditolak owner sebagai terlalu dangkal. Keputusan owner: template PRO yang rinci tetap wajib; format paragraf tidak dipakai.

Evaluasi produksi `JOTA-M1-UMAR-BIN-KHATTAB-S28-20261101` (2026-11-01, sebelum v3.49): shot tanpa orang dan shot yang kameranya mendekat ke orang menghasilkan wajah dan orang tambahan; tokoh utama tanpa tugas menoleh ke kamera; kamera yang menembus barisan membuat barisan bergeser serempak; figuran kecil bersorban dan berkhimar polos. Hasilnya menjadi bagian 2F dan blok jenis shot di 2D. Jenggot figuran dan blok NO PEOPLE serta HANDS ONLY belum pernah diuji di akun owner; produksi pertama yang memakainya dicatat di sini.

Produksi pertama dengan template ini dicatat di `RUN_STATE.json` dengan `"template": "PRO"`. Kalau owner menemukan musik yang muncul sendiri, desis atau dengung, atau wajah muncul di JOTA 1, catat di `evals/CHECKLIST.md` dan perbaiki template, bukan kembali ke template F5 tanpa keputusan owner.

## 8. Contoh terisi (JOTA 1, S28, 16:9, scene SAMBUNG)

Contoh dari cerita Anak Entok yang Tersesat. Lolos cek A1 sampai A5 dan A8 dengan skrip pemeriksa (2026-10-31, diperbarui v3.28.1), panjang sekitar 5.800 karakter. Diperbarui v3.49: blok MANDATORY RULES (cerita keluarga tanpa latar Arab, jadi tanpa HEAD COVERING) dan larangan wajah JOTA 1 di AVOID ditambahkan, label Inggris. Belum dirender.

```text
SC02: Anak Entok yang Tersesat
MANDATORY RULES:
FACELESS: Every person keeps a completely smooth blank skin-colored face with nothing on it, like an unpainted doll face, in every frame of this clip and from every angle, including side view, three-quarter view, and while turning, bending, or moving. No eyes, no eyebrows, no nose, and no mouth ever appear. Animals keep smooth blank heads with no eyes.
NATURAL MOTION: Every movement is slow, simple, and physically natural, like real people filmed with a real camera. People and animals move forward in the direction they face, head first, never backward. Heads turn at most a quarter turn and stay in line with the body. Arms, wrists, hands, and fingers bend only in natural directions and never rotate, twist, or spin. Bodies, limbs, and objects keep their shape and size. Feet step fully on the ground; nobody slides or floats.
STYLE: faceless Islamic children's cartoon, 2D anime-style illustration, clean line art, soft cel shading, warm cozy colors.
OPENING STATE:
Continue directly from the selected starting image, same take. Zahra kneels on the grassy path on the left third of the screen, both hands open on her knees, looking at the low green bush on the right. Abi stands behind her on the right, holding the small blue feed bucket in his right hand. One small yellow duckling sits half hidden under the bush.

ACTION:
From the very first frame, Zahra is already leaning toward the bush. Every movement has natural weight: it starts gently, peaks, and settles; feet stay planted on the ground while standing and step fully while walking.
0-3s: Zahra slowly reaches out with both hands, palms up, fingers relaxed, while Abi bends forward at the waist to look. Zahra speaks line 1.
3-6s: The duckling takes two small steps out of the bush onto Zahra's palms; Zahra closes her hands gently around its body while Abi sets the bucket down on the path beside his right foot. Abi speaks line 2.
6-8s: Zahra lifts the duckling to her chest with both hands. Zahra speaks line 3.
8-10s: Zahra rises slowly onto one knee while Abi steps closer and points toward the pond path on the right.
Whenever nobody speaks, someone is visibly moving: small natural actions such as adjusting a sleeve, shifting weight, or turning toward the other character.

CAMERA:
Start: The camera starts exactly at the framing of the selected starting image: medium shot, eye level, side three-quarter view, camera placed on the path facing the bush, Zahra on screen left, Abi on screen right, the bush on the right edge.
The camera behaves like a real film camera on a dolly or slider: every move eases in and eases out, with motivated, steady motion.
0-3s: slow dolly push forward at a gentle speed, from medium shot to a closer medium shot of Zahra, her hands, and the bush, with Zahra's head kept at the same size, because the discovery matters.
3-6s: slight slide to the right at a slow speed, from medium close shot to a two-shot of Zahra and the duckling, because the duckling steps out.
6-8s: gentle tilt up at a slow speed, from the hands to Zahra's upper body, head, and hijab at the same size, because she holds the duckling close.
8-10s: the camera eases to almost still and ends on a medium shot, Zahra on screen left, Abi on screen right.
The camera stays on the same side of the characters for the whole clip. Every main character's full head, including headwear, stays inside the frame.

LIGHT:
Warm morning light from the upper left, the same as the starting image, soft cel shading. Shadows keep the same direction for the whole clip. Soft golden morning tones. Line art, colors, and painted textures stay stable from the first frame to the last.

DIALOGUE:
Line 1, Zahra says exactly, in a soft calm girl's Bahasa Indonesia voice: "Sini, sayang, jangan takut."
Line 2, Abi replies exactly, in a cheerful small boy's Bahasa Indonesia voice: "Kak, dia sendirian ya?"
Line 3, Zahra answers exactly: "Iya, kita cari ibunya."
Lines follow the timing in ACTION. Only these exact words are spoken.

SOUND:
0-3s: Ambience: birds call across the field once. Foley: grass brushing as Zahra leans forward. Room: wide open outdoors, sound fades naturally into the air. Zahra's line 1 in Zahra's own voice, matching Zahra's movements.
3-6s: Ambience: wind passes through rice leaves briefly. Foley: tiny duckling peeps, the plastic bucket set down on soft dirt. Abi's line 2.
6-8s: Ambience: a far rooster crows once. Foley: soft fabric rustle as Zahra lifts her hands. Zahra's line 3.
8-10s: Ambience: birds call again far away. Foley: Zahra's knee shifting on the grass, Abi's small footstep. Only these voices and sounds are heard.

END STATE:
Zahra kneels on one knee on the left, holding the duckling at her chest with both hands. Abi stands on the right, pointing toward the pond path with his right hand. The blue feed bucket rests on the path beside Abi's right foot. One duckling, in Zahra's hands.
Objects move only when a character moves them on screen.

CLOSING MOTION:
Zahra gently strokes the duckling's back with one thumb while Abi lowers his pointing hand. All characters fully visible and sharp. The camera eases down. The characters keep moving gently until the very last frame.

CONSISTENCY LOCK:
STYLE: faceless Islamic children's cartoon, 2D anime-style illustration, clean line art, soft cel shading, warm cozy colors. Keep this exact style for the entire video.
ZAHRA: small faceless girl, light blue hijab, mustard yellow long-sleeve tunic, white loose trousers, small brown sandals. Her hijab never comes off.
ABI: smaller faceless boy, white peci cap, light green t-shirt, brown shorts. His peci never comes off.
SCALE: when both stand, Abi's head reaches Zahra's shoulder. Their sizes never change.
PR01 DUCKLING: exactly one small yellow duckling with a smooth blank head and a closed bill. Never more, never fewer, never other colors.
PR02 BUCKET: exactly one small blue plastic feed bucket. Never more, never fewer, never other colors.
LAYOUT: grassy path in front, low green bush on the right, rice paddies and a wooden fence in the middle, soft hills behind. Morning sun from the upper left.
FACELESS: every person keeps a plain blank face oval in every frame of the entire video; no eyes and no nose ever appear, even while speaking. A mouth may appear only on the character who is speaking.
FRAME: Zahra and Abi remain in the shot the entire time. Aspect ratio 16:9.

AVOID (NEGATIVES):
No eyes, no nose, no mouth, no eyebrows, no ears drawn as facial features on any face. Never two faces on one head, no second face, no face on the back of any head, no double head. No character turning toward the camera. No music, no humming, no background drone, no hiss, no narrator, no other speech. No pause, no freezing, no idle standing. No sliding feet, no floating, no extra fingers, no merged or melting hands, no objects passing through bodies. No objects appearing, disappearing, multiplying, changing color, or changing shape. No style change, no photorealistic conversion, no 3D rendering. No cuts. No text, no letters, no logos.
```
