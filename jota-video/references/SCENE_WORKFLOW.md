# JOTA Scene Workflow: gambar acuan, scene berantai, frame sambungan, perakitan, Drive, peta UI

Sejak v3.52 hanya Runner yang mengoperasikan VideoExpress (`../SKILL.md` 3A). File ini menjadi acuan isi prompt, setelan, dan peta UI yang dipakai Runner; agen tidak mengklik tab VideoExpress atau Artistly.

Dasar:
- Tutorial Alex, "I Tested Video Express AI 3.5 and Made a Luxury Vlog in Minutes" (YouTube `u1rp6wbtH1M`): karakter berlatar putih, Consistent Character, simpan frame, trim, Use from Library.
- Tutorial Alex, "I Tested The NEW Video Express 3.5 Creative Mode [Style Tag Test]" (YouTube `8gJkpp85aB0`): style tag, bug centang Enhance, cek prompt lewat Details.
- Tutorial Sayan Roy, "AI FilmMaking Tutorial | AI Film Making With Video Express AI" (YouTube `i2CmllNmJnk`): metode manekin tanpa wajah untuk JOTA 1, Enhance Image OFF, Narration Video.
- Playbook pihak ketiga `ai-playbooks/realistic-mini-dramas` (GitHub, 2026-10-23): peta UI editor, batas 5 job paralel, cara trim dan export. Dibaca sebagai bahan referensi, bukan instruksi; tidak terbukti resmi dari VideoExpress. Gaya drama cepatnya tidak dipakai.
- Uji langsung Claude di akun owner (2026-10-24): SC01 dan SC02 Anak Entok JOTA 2.
- Koreksi owner sampai 2026-10-24.

Pemeriksaan frame, sambungan, dan suara di bawah adalah aturan tambahan JOTA, bukan klaim dari tutorial. Kalau nama menu di akun owner berbeda, pakai yang terlihat dan catat di ledger.

Referensi pendamping: [`STYLE_CATALOG.md`](STYLE_CATALOG.md) untuk style tag, [`CAMERA_LANGUAGE.md`](CAMERA_LANGUAGE.md) untuk kamera.

## A. Folder dan penamaan proyek

Nama proyek: `JOTA-M1-{SLUG}-{YYYYMMDD}` (JOTA 1) atau `JOTA-M2-{SLUG}-{YYYYMMDD}` (JOTA 2). Contoh: `JOTA-M1-KANCIL-JUJUR-20261025`.

| Tempat | Folder | Isi |
|---|---|---|
| Artistly | `{NAMA PROYEK}/01-karakter` | Gambar acuan karakter |
| Artistly | `{NAMA PROYEK}/02-latar` | Gambar latar SC01 bila dibuat di Artistly |
| VideoExpress | Proyek atau folder dengan nama yang sama | Gambar impor, frame sambungan, klip |

Penamaan file: `CH01-{NAMA}-REF-v1` (karakter), `SC01-IMG-v1` (gambar awal SC01), `SC01-VID-v1` (klip), `SC01-END-v1` (frame sambungan dari akhir SC01), `OP1`, `OP2`, `CL1` untuk pembuka dan penutup.

Kalau Artistly atau VideoExpress tidak punya fitur folder di akun owner, pakai awalan nama file yang sama dan catat di ledger. Jangan memindah atau mengganti nama aset proyek lama.

## B. Karakter acuan (SKILL.md 4B langkah 5)

Generator dipilih owner per proyek (pop-up pembuka). Prompt gambar acuan sama untuk ketiganya.

### B1. Tiga generator gambar acuan

| | G1 VideoExpress | G2 Artistly | G3 ChatGPT Images 2.0 |
|---|---|---|---|
| Kekuatan | Paling cepat, gambar langsung di `My AI Images` proyek | Folder per proyek; manusia manekin JOTA 1 lolos percobaan pertama (preset AI Image Designer v6, Photorealism) | Kuat untuk mengedit gambar (menghapus mata, mengganti baju), hingga 10 gambar konsisten dalam satu permintaan |
| Kelemahan | Tidak ada folder | Perlu impor ke VideoExpress | Gaya bisa bergeser antar sesi; konektor Drive ChatGPT hanya baca |
| Cara masuk ke VideoExpress | Sudah di sana | `Import Media > Import from Artistly` | Unduh dari ChatGPT, unggah lewat `Import Media` (unggah file) |
| Siapa yang bisa menjalankan | Claude atau ChatGPT | Claude atau ChatGPT | ChatGPT, atau owner. Claude tidak bisa membuat gambar ChatGPT |
| Status uji | Teruji (Rebutan Mangga; benchmark JOTA 1 S28 lolos) | Teruji (manekin Anak Entok lolos; kartun wajah polos S28 gagal di Artistly Fast) | Unggah otomatis oleh ChatGPT mode agen ke VideoExpress belum teruji; kalau agen tidak bisa mengunggah: `AUTOMATION_BLOCKED` |

Saran default: G1 untuk JOTA 2 dan JOTA 1 S28, G2 untuk manusia manekin JOTA 1, G3 untuk memperbaiki gambar acuan yang hampir benar (misalnya induk entok yang muncul cekungan mata: unggah gambarnya ke ChatGPT lalu minta `remove the eyes completely, keep the head surface smooth and blank, change nothing else`).

Aturan semua generator:
- Nama di VideoExpress: `CH01-NAMA-REF-v1`, `FG01-NAMA-REF-v1`. Catat generator dan ID aset di RUN_STATE (`"generator": "G1"`).
- Satu generator per proyek untuk semua tokoh supaya gayanya sama. G3 boleh dipakai untuk mengedit gambar dari G1 atau G2.
- Gambar G3 tidak disimpan di Drive sebagai syarat; tujuannya VideoExpress.

Satu gambar acuan per karakter: tampak depan seluruh tubuh, pose netral, latar putih polos. Untuk JOTA 1 tambahkan satu gambar tampak belakang, karena banyak shot JOTA 1 diambil dari belakang.

Template JOTA 1 (metode manekin, lihat [`FACELESS_CHARACTER.md`](FACELESS_CHARACTER.md)):
```text
Full-body character reference of [nama]: a [varian manekin, misal smooth light-wood artist mannequin] figure with a smooth featureless oval head, [tinggi dan bentuk badan], wearing [pakaian dan warna persis], [aksesori tetap].
Standing straight, front view, neutral relaxed pose, arms at the sides.
No human facial features: no eyes, no eyebrows, no nose, no mouth.
Plain pure white background, even studio lighting, no props, no text.
[STYLE TAG dari katalog]
```
Hewan JOTA 1: `a smooth sculpted [bahan] [jenis hewan] figure with a blank eyeless head, [ciri khas]`.

Template JOTA 2:
```text
Full-body character reference of [nama]: [jenis/usia], [tinggi dan bentuk badan], [wajah: bentuk, warna mata, rambut], [pakaian dan warna persis], [aksesori tetap].
Standing straight, front view, neutral relaxed pose, friendly calm expression, mouth closed, eyes open looking at the camera.
Plain pure white background, even studio lighting, no props, no text.
[STYLE TAG dari katalog]
```

Hewan memakai template yang sama: jenis, ukuran, warna bulu atau bulu sayap, ciri khas (misalnya jengger merah, bulu putih bersih).

Setting di Artistly: `Use Creative mode` ON. Enhance prompt ON untuk JOTA 2; **OFF untuk JOTA 1** supaya kata manekin dan faceless tidak ditulis ulang. Generate ulang sampai sesuai. Cek tiap gambar: ciri fisik sesuai bible, JOTA 1 benar-benar tanpa wajah, tidak ada teks atau benda lain.

## C. SC01: gambar latar dengan karakter, lalu video (SKILL.md 4B langkah 6)

1. Buka `Create with AI > Create Video From Prompt`.
2. Centang `Use Consistent Character` dan isi `Reference Photo` dengan gambar acuan karakter yang tampil di SC01 (satu karakter per slot). `Automatically enhance my image prompt` **OFF di semua mode** (v3.26). `Use Creative mode` dan `Image Type` mengikuti style (v3.27, menggantikan aturan lama "Creative mode selalu dicentang"):
   - JOTA 1 S28 kartun wajah polos: `Image Type` `2d`, Creative mode **OFF** (benchmark v3.11, `FACELESS_CHARACTER.md` metode B).
   - JOTA 1 manekin S25 sampai S27: `Image Type` `photorealistic` seperti tutorial manekin; Creative mode ikuti `FACELESS_CHARACTER.md` metode A, varian lain diuji dulu.
   - S40 dan S12: `Image Type` `3d`.
   - JOTA 2 manusia: `Image Type` `human`, Creative mode boleh ON.
3. Kalau karakter di SC01 lebih banyak dari slot `Reference Photo` yang tersedia: kurangi tokoh yang tampil di SC01 (tokoh lain masuk belakangan lewat gerakan kamera), atau buat gambar grup di Artistly dulu lalu impor. Catat di ledger.
4. Tulis IMAGE PROMPT SC01 (bagian F), klik `Create Image`. Biasanya keluar dua pilihan; pilih yang identitas karakternya paling cocok dengan acuan.
5. Tulis VIDEO AND AUDIO PROMPT SC01 (bagian F).
6. Setting video, **urutannya penting**:
   1. `Advanced Mode` ON.
   2. `Manual Video Length` 10 detik.
   3. Setelah durasi diatur, pastikan `Automatically enhance my image prompt` dan `Automatically enhance my video prompt` OFF (keputusan v3.26, `CONSISTENCY_RULES.md` bagian 8 poin 11). Keduanya bisa berubah sendiri saat dialog dirender ulang atau durasi diubah, jadi cek tepat sebelum Create.
   4. `Video Only (No Sound)` OFF kalau ada yang bicara.
   5. `Share this in the public gallery` OFF dan rasio sesuai proyek. Keduanya kembali ke default (gallery ON, Vertical 9:16) setiap kali dialog dibuka ulang, jadi cek di setiap scene.
   6. `Lipsync HD Video` tidak dipakai kecuali owner meminta. `Narration Video` dipakai untuk cerita JOTA 1 yang dibawakan narator: klik `Create Video`, lalu di dialog TTS pilih bahasa dan suara, tempel teks narasi (maksimal 120 karakter), `Import Speech`, `Create Narration Video`. Video and Audio Prompt mengikuti `PROMPT_PROFESIONAL.md` 4A.
7. Klik `Create Video`.

## D. Frame sambungan, scene SAMBUNG, dan pemilihan metode (SKILL.md 4B langkah 7)

Baca D5 dulu untuk memilih metode tiap scene. D1 sampai D4 hanya untuk scene SAMBUNG.

### D0. Aturan tanpa bengong (wajib, fatal kalau dilanggar, v3.13)

Keputusan owner 2026-10-25: di klip 10 sampai 11 detik **tidak boleh ada detik ketika tokoh tidak bergerak dan tidak ada yang bicara** (bengong). Ini berlaku di awal, tengah, dan akhir klip, untuk JOTA 1 dan JOTA 2.

1. **Gerak dari detik pertama.** ADEGAN dibuka `From the very first frame, ...` dengan aksi yang sudah berjalan. Dilarang `After a short natural pause`, `pause`, `beat`, `waits`, `holds still`, `stands still`, `freezes`, `stops and looks`.
2. **Beat sheet di ADEGAN (setiap ketukan juga menyebut gerakan kamera sesuai emosi, `CAMERA_LANGUAGE.md` 3B).** Klip dipecah tiga atau empat ketukan bertanda waktu, misalnya `0-3s:`, `3-6s:`, `6-8s:`, `8-10s:`. Setiap ketukan berisi minimal satu aksi yang terlihat (tangan, badan, berjalan, menoleh, mengambil benda). Di ketukan cukup ditulis siapa bicara, `[Tokoh] speaks line 1.`; **teks kalimat hanya ditulis sekali, di SCRIPT NGOMONG** dengan awalan `Line 1, ...`. Kalimat yang ditulis dua kali (di ketukan dan SCRIPT) membuat VideoExpress menolak job: "Your dialogues are too long and won't fit in the generated video" (uji S40, 2026-10-25).
3. **Pendengar ikut bergerak.** Saat satu tokoh bicara, tokoh lain bereaksi dengan gerak: mengangguk, menunjuk, membalik kertas, mendekat. Tidak ada tokoh yang mematung menunggu giliran.
4. **Celah antar kalimat diisi aksi**, bukan diam. Dialog maksimal sekitar 15 kata per 10 detik dan tersebar sampai sekitar detik ke-8.
5. **Akhir klip tetap bergerak.** Dua detik terakhir berisi aksi lanjutan yang pelan dan jelas (berjalan pergi, melambai, menaruh benda, memeluk). Kamera boleh melambat, tokoh tidak membeku. Frasa wajib di AKHIR SHOT: `The characters keep moving gently until the very last frame; no one freezes or stands idle.`
6. **Hewan dan lingkungan tidak menggantikan gerak tokoh.** Daun bergoyang atau kamera bergerak bukan pengganti aksi tokoh.
7. **Saat rakit:** kalau masih ada potongan bengong di awal atau akhir klip, potong (gunting `Cut`, klik kanan > `Delete`, `Auto Align Clips`). Cara mencari batasnya: klik kanan klip > `Separate Audio and Video` (muncul notifikasi "Audio and video have been separated"), lalu lihat gelombang suara di track audio; bagian yang datar adalah diam. Potong video dan audionya di titik yang sama supaya tetap sinkron. Cara ini dari repo workflow resmi tim VideoExpress, belum diuji di akun owner. Kalau bengong di tengah lebih dari sekitar 1 detik, scene diulang dengan beat sheet yang lebih padat.

### D0b. Gerak fisik natural (wajib, v3.20)

Temuan uji S40 2026-10-25: prompt `Saheela hops on the stool happily` menghasilkan Saheela turun dari bangku dengan gerakan aneh (kaki dan badan tidak menapak wajar). Model video lemah pada perpindahan badan besar, terutama naik atau turun dari benda. Aturan:

1. **Jangan pindah ketinggian di dalam klip.** Tokoh yang berdiri di bangku, kursi, meja, tangga, atau batu tetap di sana sampai akhir klip, dua kaki menapak. Kalau cerita perlu naik atau turun, jadikan scene sendiri dan tulis langkahnya: `holds Ummi's hand, steps down slowly with one foot, then the other foot, both feet land on the floor`.
2. **Kata kerja terlarang untuk tokoh di atas benda:** hops, jumps, bounces, spins, twirls, skips, dances, leaps. Gantinya gerak tubuh atas: claps her hands, nods, raises both hands, leans forward, points, hugs, waves.
3. **Satu gerak badan besar per klip** (berjalan, duduk, berdiri, berbalik). Selebihnya gerak tangan dan kepala. Klip dialog mengutamakan gerak tangan dan tubuh atas.
4. **Gerak besar ditulis sebagai urutan fisik**, bukan satu kata: bukan `sits down`, tapi `bends her knees, puts one hand on the chair, and sits down slowly`. Sebut kontak dengan benda: kaki menapak lantai, tangan memegang meja.
5. **Kegembiraan anak** ditunjukkan lewat tangan dan tubuh atas (bertepuk, mengepalkan tangan ke atas, memeluk Ummi), bukan melompat, kecuali tokoh berdiri di lantai dengan ruang lapang dan lompatan memang inti adegan.
6. **Keselamatan anak terlihat:** anak di bangku atau dekat kompor selalu dengan tangan orang dewasa di dekatnya; jangan ada aksi yang tampak berbahaya untuk ditiru penonton anak.

Cek C27d di `evals/CHECKLIST.md`.

### D1. Siapkan frame bersih sejak menulis prompt

Untuk scene yang akan disambung (SAMBUNG):
- Dialog selesai sekitar detik ke-8; sisa klip berisi aksi lanjutan yang pelan (aturan D0 poin 5), bukan diam.
- Frame sambungan dipilih dari bagian gerak pelan itu: mulut tertutup, tidak buram, tokoh utuh. Tidak perlu tokoh membeku.
- Scene SAMBUNG berikutnya dibuka `Continue directly from the selected frame, the same motion continues from the very first frame` supaya gerak tidak berhenti di sambungan.

### D2. Syarat frame sambungan (semua wajib)

| No | Syarat | Cara cek |
|---|---|---|
| 1 | Sesudah kata terakhir selesai diucapkan, tidak ada suku kata yang terpotong | Dengarkan; ambil frame setidaknya sekitar 0,3 detik setelah suara bicara berhenti |
| 2 | Gambar tajam, tidak blur gerak | Perbesar frame |
| 3 | Semua tokoh yang harus ada terlihat utuh, tidak terpotong tepi, tidak setengah berbalik | Lihat seluruh frame |
| 4 | Identitas cocok dengan **gambar acuan asli** (CH-REF), bukan hanya dengan scene sebelumnya: pakaian, warna, proporsi, aksesori, jumlah tokoh | Bandingkan berdampingan dengan CH-REF |
| 5 | JOTA 1: tidak ada mata atau hidung yang jelas terlihat, dan semua tokoh diam dengan wajah polos (frame sambungan diambil sesudah bicara). JOTA 2: mata terbuka, mulut tertutup, tidak sedang berkedip | Perbesar wajah |
| 6 | Tidak ada cacat: jari aneh, benda meleleh, tokoh tambahan, tulisan acak | Lihat seluruh frame |
| 7 | Kamera sudah diam atau hampir diam | Tonton 1 detik sebelumnya |
| 8 | Lolos cek konsistensi S1 sampai S5: atribut tokoh, skala, jumlah dan posisi benda, tata letak, posisi tokoh di layar | Bandingkan dengan CH-REF dan Buku keadaan, `CONSISTENCY_RULES.md` 9B |

### D3. Langkah memilih, menyimpan, dan memotong

1. Masukkan klip ke timeline.
2. Cari mundur dari akhir klip sampai titik kata terakhir selesai. Pilih frame **paling dekat ke akhir** yang memenuhi semua syarat D2. Frame paling akhir sering jelek (buram, berubah), jadi jangan langsung pakai `Save last frame` tanpa dilihat.
3. Simpan frame itu (ikon simpan frame di timeline, atau klik kanan > `Save last frame` kalau frame terakhir memang lolos). Beri nama `SC01-END-v1`. Buka `My AI Images` dan cek hasil simpanannya.
4. **Trim klip tepat di frame itu**, hapus potongan sisanya. Akhir klip setelah trim harus sama dengan frame yang disimpan. Caranya (teruji): playhead di frame itu, klik ikon gunting `Cut` di toolbar timeline (memotong klip di bawah playhead), lalu **klik kanan potongan sisa > `Delete`**. Tombol Delete atau Backspace di keyboard tidak berfungsi. **Jangan klik ikon tempat sampah di kiri track**: itu menghapus seluruh track. Setelah menghapus, klik `Auto Align Clips` (ikon `+|+` di kiri track) supaya tidak ada celah.
5. Scene berikutnya: `Create Video From Prompt > Use from Library > My AI Images > SC01-END-v1` (klik sekali pada folder dan gambar, lalu `Choose`). **Tidak ada Image Prompt, tidak klik Create Image.** Tulis VIDEO AND AUDIO PROMPT saja, setting sama seperti C.6.
6. Selain ekor klip, buang juga bagian diam di **awal** klip (tokoh membeku sebelum mulai bergerak atau bicara) dengan cara yang sama, sisakan sekitar 0,1 detik sebelum kata pertama. Jangan memotong 2 detik diam di akhir sebelum frame sambungan disimpan; potong sesudahnya kalau terasa terlalu lama.

### D4. Kalau tidak ada frame yang lolos

| Keadaan | Tindakan |
|---|---|
| Tokoh masih bicara sampai akhir klip | Jangan potong di tengah kalimat. Ulang scene dengan dialog lebih pendek dan aksi lanjutan pelan di akhir (D0) |
| Semua frame setelah dialog buram atau cacat | Ulang scene, kurangi gerakan kamera di akhir |
| Identitas, benda, atau tata letak sudah bergeser dari CH-REF atau Buku keadaan | Ulang scene ini (maksimal 3 kali). Jangan dilanjutkan, karena pergeseran akan menumpuk di scene berikutnya. Sesudah 3 kali: `CONSISTENCY_BLOCKED` |
| Frame lolos tapi tidak bisa dipilih lewat Use from Library | `CONTINUITY_SOURCE_BLOCKED`. Jangan membuat gambar mirip lalu mengakuinya sebagai frame yang sama |

Alternatif: fitur `First Frame / Last Frame` VideoExpress boleh dipakai hanya kalau sudah terbukti berhasil di akun owner. Gambar awal tetap frame asli dari klip sebelumnya.

### D5. Memilih metode per scene: SAMBUNG atau KEYFRAME (v3.25)

Aturan wajibnya ada di [`CONSISTENCY_RULES.md`](CONSISTENCY_RULES.md) bagian 2. Ringkasnya:

| Tanda | Kapan | Gambar awal | Bisa paralel |
|---|---|---|---|
| `SAMBUNG` (wajib bila syaratnya terpenuhi) | Lokasi sama, waktu bersambung, tokoh tetap di area aksi yang sama | Frame sambungan klip sebelumnya yang lolos D2 dan cek konsistensi 9B (D1 sampai D4) | Tidak, menunggu klip sebelumnya |
| `KEYFRAME` | SC01; pindah lokasi; pindah posisi besar ke bagian ruangan yang tidak terlihat di frame terakhir; lompatan waktu | Image Prompt baru dengan karakter acuan (Reference Photo 1) dan lokasi acuan (Reference Photo 2, kalau slot tersedia), menggambarkan keadaan terkini di Buku keadaan | Ya, antar rantai yang berbeda |

Menggantikan aturan v3.7 "KEYFRAME default, SAMBUNG hanya untuk take lebih dari 10 detik". Alasan owner: gambar baru per scene di ruangan yang sama membuat atribut tokoh, benda, dan tata letak berubah (Sarah Membantu Aba v1).

Aturan pelaksanaan:
1. **Tabel scene wajib sebelum generate** (SKILL.md 4B langkah 3): `SC | metode | alasan metode | keadaan awal | aksi yang mengubah | keadaan akhir | framing kamera akhir`. Keadaan akhir scene N disalin persis menjadi keadaan awal scene N+1, termasuk hitungan benda (`CONSISTENCY_RULES.md` bagian 6).
2. **Image Prompt KEYFRAME** menggambarkan keadaan terkini dari Buku keadaan, bukan pose netral gambar acuan, bukan aksi yang mengulang dari awal, dan bukan keadaan awal cerita. Benda yang sudah dibereskan digambar sudah rapi.
3. **Lokasi acuan:** lokasi yang dipakai lebih dari satu scene punya Peta lokasi dan gambar lokasi tanpa tokoh (LOC-REF). Kalimat `LAYOUT:` disalin persis ke setiap prompt di lokasi itu. Landmark tidak boleh pindah sisi.
4. **Slot Reference Photo terbatas.** Kalau tokoh lebih banyak dari slot: tokoh utama di slot, tokoh lain lewat kalimat KUNCI tokoh. Catat pilihan di ledger. Jumlah slot di akun owner belum dicek (bagian K).
5. **Submit:** SC01 dan scene KEYFRAME dari rantai yang berbeda boleh di-submit berturut-turut, maksimal 5 job. Kalau muncul pesan *"You can generate up to 5 AI videos in parallel"*, job itu tidak dibuat: tunggu sekitar 60 detik lalu klik `Create Video` sekali lagi. Scene SAMBUNG di-submit satu per satu setelah klip di depannya jadi dan frame sambungannya lolos cek.
6. **Panel dibiarkan terbuka** di antara submit. Membuka ulang dialog mengembalikan rasio, public gallery, dan centang enhance ke default.
7. Setelah submit, catat `SC## → ID job` di `RUN_STATE.json` sebelum lanjut, supaya klip tidak tertukar.
8. Penamaan tetap `SC01`, `SC02`, dan seterusnya. Penanda metode ada di tabel scene, bukan di nama.

## E. Arah kamera

Pakai [`CAMERA_LANGUAGE.md`](CAMERA_LANGUAGE.md) untuk memilih gerakan dan [`CONSISTENCY_RULES.md`](CONSISTENCY_RULES.md) bagian 7 untuk cara menulisnya. Ringkasnya:
- Rantai SAMBUNG di satu lokasi adalah satu pengambilan panjang. Variasi sudut dibuat lewat gerakan kamera di dalam klip (push-in, arc, crane, pull-out), bukan gambar baru.
- Setiap Video and Audio Prompt punya blok `KAMERA`: framing awal, gerakan per ketukan (jenis, arah, kecepatan, framing awal dan akhir, alasan), dan framing akhir.
- Scene SAMBUNG: framing awal sama dengan framing akhir klip sebelumnya.
- Minimal dua jenis gerakan per klip, kepala dan penutup kepala tokoh utama selalu di dalam frame, garis 180 derajat dijaga.
- Vlog atau selfie: buka ADEGAN dengan `A wide-angle selfie shows ...`, ponsel dan tangan pemegang tidak terlihat.

## F. Template prompt dengan BLOK KUNCI

Template wajib untuk menulis prompt adalah template PRO di [`PROMPT_PROFESIONAL.md`](PROMPT_PROFESIONAL.md). Bagian F1 tetap menjadi acuan isi BLOK KUNCI. F2 sampai F5 adalah struktur lama yang disimpan sebagai arsip dan contoh; jangan dipakai sebagai template.

### F1. BLOK KUNCI (wajib di setiap prompt, ditulis ulang lengkap, tidak boleh disingkat)

BLOK KUNCI ditulis sekali per proyek di rencana, lalu **disalin persis** ke setiap Image Prompt dan setiap Video and Audio Prompt. Jangan menulis "same as before" atau meringkasnya.

JOTA 1 metode B (S28, S40, dan style kartun wajah polos lain, default anak):
```text
CONSISTENCY LOCK:
STYLE: [style tag persis dari katalog]. Keep this exact style for the entire video.
FACELESS: every person keeps a plain blank face oval in every frame of the entire video; no eyes and no nose ever appear, even while speaking. A mouth may appear only on the character who is speaking. Animals keep smooth blank heads with no eyes; beaks and muzzles stay closed.
[CH01 nama]: [kalimat KUNCI tokoh persis dari character bible, termasuk atribut yang tidak boleh hilang].
[CH02 nama]: [kalimat KUNCI tokoh persis].
SCALE: [kalimat tinggi relatif persis, kalau tokoh lebih dari satu].
[PR01 nama benda]: [kalimat KUNCI benda persis: jumlah, warna, ukuran. Never more, never fewer, never other colors.]
LAYOUT: [kalimat tata letak dan pencahayaan persis dari peta lokasi].
FRAME: [nama tokoh utama] remains in the shot the entire time. Aspect ratio [16:9 atau 9:16].
```

JOTA 1 metode A (manekin S25 sampai S27, dokumenter):
```text
CONSISTENCY LOCK:
STYLE: [style tag persis dari katalog]. Keep this exact style for the entire video.
FACELESS: Every human is a [varian manekin] mannequin figure with a smooth featureless oval head. Every animal is a smooth sculpted figure with a blank eyeless head. No human facial features: no eyes, no eyebrows, no nose, no mouth, in every frame of the entire video.
[CH01 nama]: [kalimat KUNCI tokoh persis dari character bible, termasuk atribut yang tidak boleh hilang].
[CH02 nama]: [kalimat KUNCI tokoh persis].
SCALE: [kalimat tinggi relatif persis, kalau tokoh lebih dari satu].
[PR01 nama benda]: [kalimat KUNCI benda persis: jumlah, warna, ukuran. Never more, never fewer, never other colors.]
LAYOUT: [kalimat tata letak dan pencahayaan persis dari peta lokasi].
FRAME: [nama tokoh utama] remains in the shot the entire time. Aspect ratio [16:9 atau 9:16].
NO MUSIC.
```

JOTA 2:
```text
CONSISTENCY LOCK:
STYLE: [style tag persis dari katalog]. Keep this exact style for the entire video.
[CH01 nama]: [kalimat KUNCI tokoh persis, termasuk wajah, rambut, warna mata].
[CH02 nama]: [kalimat KUNCI tokoh persis].
SCALE: [kalimat tinggi relatif persis, kalau tokoh lebih dari satu].
[PR01 nama benda]: [kalimat KUNCI benda persis].
LAYOUT: [kalimat tata letak dan pencahayaan persis].
Only the character who is speaking moves their mouth; listeners keep their mouths closed.
FRAME: [nama tokoh utama] remains in the shot the entire time. Aspect ratio [16:9 atau 9:16].
```

Hanya tokoh dan benda yang tampil di scene itu yang ditulis di BLOK KUNCI scene tersebut. Teksnya tetap disalin persis dari bible. Isi setiap kalimat kunci mengikuti `CONSISTENCY_RULES.md` bagian 3 sampai 5.

### F2. IMAGE PROMPT (SC01, scene KEYFRAME, dan gambar pembuka OP2)

```text
[Nama tokoh] [keadaan terkini dari Buku keadaan: pose, posisi di layar kiri/kanan, arah badan, arah pandang ke siapa/apa, benda yang dipegang dan tangan mana] at [lokasi].
Objects now: [keadaan setiap benda dengan hitungan, misalnya: two grass-green books on the second shelf, one green and two navy-blue books on the rug].
Layout: [kalimat LAYOUT persis dari peta lokasi].
Behind: [latar penting, posisi benda dan hewan figuran].
Lighting: [waktu, arah matahari]. Camera: [ukuran shot, sudut, lensa].
[Aturan framing, misal: chest-up selfie composition, no visible phone.]
No text, no letters, no logos.
[BLOK KUNCI]
```

### F3. VIDEO AND AUDIO PROMPT (setiap scene)

Baris pertama selalu label scene, misalnya `SC02: Anak Entok M2`. Media Library memberi judul klip dari awal prompt, jadi label ini membuat klip mudah dicari, apalagi saat beberapa job berjalan paralel.

```text
SC##: [judul pendek proyek]
OPENING STATE:
[Scene SAMBUNG: Continue directly from the selected starting image, same take.] [posisi, pose, arah pandang, benda di tangan setiap tokoh, persis dari keadaan akhir scene sebelumnya]. [keadaan setiap benda dengan hitungan].

ACTION:
From the very first frame, [aksi yang sudah berjalan].
0-3s: [aksi tokoh A] while [reaksi gerak tokoh B]. [Tokoh A] speaks line 1.
3-6s: [aksi tokoh B, termasuk benda yang dipindah dan ke mana] while [reaksi gerak tokoh A]. [Tokoh B] speaks line 2.
6-8s: [aksi baru yang terlihat]. [Tokoh A] speaks line 3. (kalau ada kalimat 3)
8-10s: [aksi lanjutan pelan sampai frame terakhir, misalnya berjalan, menaruh benda, melambai]
No one stands idle at any moment: whenever nobody speaks, someone is visibly moving.

CAMERA:
Start: [ukuran shot], [sudut], [tinggi kamera], [lensa], camera placed [posisi di ruangan menurut peta lokasi], [Tokoh A] on screen [left/right], [Tokoh B] on screen [left/right], [landmark yang terlihat]. (Scene SAMBUNG: dibuka "The camera starts exactly at the framing of the selected starting image:")
0-3s: [jenis gerakan] [arah] at a [kecepatan] speed, from [framing] to [framing], because [alasan].
3-6s: [jenis gerakan] [arah] at a [kecepatan] speed, from [framing] to [framing], because [alasan; elemen efek kartun kalau ada].
6-8s: [jenis gerakan] [arah] at a [kecepatan] speed, from [framing] to [framing], because [alasan].
8-10s: the camera slows to almost still and ends on [framing akhir], [Tokoh A] on screen [left/right], [Tokoh B] on screen [left/right].
Rules: the camera stays on the same side of the characters for the whole clip. Keep every main character's full head, including headwear, inside the frame at all times.

DIALOGUE:
Line 1, [Nama] says exactly, in a [usia, karakter suara] Bahasa Indonesia voice: "[kalimat persis]"
Line 2, [Nama tokoh 2] replies exactly, in a [usia, karakter suara] Bahasa Indonesia voice: "[kalimat persis]"
Lines follow the timing in ACTION. Keep these exact words. No other speech. No narrator.

SOUND:
[suara lingkungan yang terlihat: angin, burung, langkah, suara entok]. [JOTA 1: No music.] [JOTA 2: musik berlisensi hanya bila diminta.]

END STATE:
[posisi, pose, benda di tangan setiap tokoh di akhir klip]. [keadaan setiap benda dengan hitungan].
Objects move only when a character moves them on screen. Nothing reappears, disappears, multiplies, changes color, or changes shape.

CLOSING MOTION:
[aksi lanjutan pelan di 2 detik terakhir]. All characters fully visible and sharp, mouths closed after the last word. The camera slows down. The characters keep moving gently until the very last frame; no one freezes or stands idle.

[BLOK KUNCI]
```

Arah pandang: untuk tokoh yang berinteraksi, pakai two-shot dari samping atau tiga perempat, keduanya saling menghadap dan menatap lawan bicara, bukan menatap kamera. Tatapan ke kamera hanya kalau cerita memang memintanya (vlog, sapaan ke penonton).

JOTA 2 dengan dialog: ADEGAN wajib menuliskan adegan ngobrolnya, bukan hanya aksi. Siapa menghadap siapa, siapa bicara lebih dulu (`turns to X and speaks to her, lips clearly moving`), reaksi pendengar, dan kamera melambat atau diam (two-shot) selama bicara. Tanpa ini, model sering menganggap SCRIPT NGOMONG sebagai suara di luar layar.

JOTA 1: dialog tokoh boleh native seperti JOTA 2 (mulut saat bicara diterima, mata dan hidung tidak). Narator (`Narration Video`) tetap pilihan untuk cerita bertutur; bagian SCRIPT NGOMONG diganti TANPA SUARA ORANG dan prompt tidak menyebut narator sama sekali (`PROMPT_PROFESIONAL.md` 4A, mencegah narator dobel). Di BLOK KUNCI JOTA 1 tulis: `Faces stay blank ovals; no eyes and no nose ever appear, even while speaking.`

### F4. Contoh terisi (vlog anak di kandang entok, JOTA 2, style S02, 16:9)

BLOK KUNCI proyek ini:
```text
CONSISTENCY LOCK:
STYLE: original 2D painterly anime style, lush hand-painted backgrounds, soft natural light, gentle cel shading. Keep this exact style for the entire video.
NAILA: 8-year-old Indonesian girl, slim, round face, dark brown eyes, black hijab, light green long-sleeve dress, white sneakers.
ENTOK: large white jumbo Muscovy ducks with red facial caruncles.
Only the character who is speaking moves their mouth; listeners keep their mouths closed.
FRAME: Naila remains in the shot the entire time. Aspect ratio 16:9.
```

SC01 IMAGE PROMPT:
```text
Naila stands at the entrance of a duck farm, smiling at the camera, chest-up selfie composition.
Behind: a simple bamboo fence and a group of white jumbo Muscovy ducks on green grass.
Lighting: soft morning sun from the left. Camera: medium close-up, eye level, 24mm wide lens.
No visible phone. No text, no letters, no logos.
[BLOK KUNCI di atas, disalin persis]
```

SC01 VIDEO AND AUDIO PROMPT:
```text
ACTION:
A wide-angle selfie shows Naila at the farm entrance, filmed like a front-facing phone vlog. Medium close-up, eye level, 24mm wide lens, subtle handheld sway. She waves, then gestures toward the ducks behind her.

DIALOGUE:
Line 1, Naila says exactly, in a cheerful 8-year-old girl's Bahasa Indonesia voice: "Halo semua! Hari ini aku ajak kalian lihat entok di kandang Baladewa."
Keep these exact words. No other speech. No narrator.

SOUND:
Soft duck calls, morning birdsong, light breeze. No music.

CLOSING MOTION:
In the final seconds Naila keeps moving: she waves at the ducks and turns back toward the camera, smiling, ducks waddling behind her. Fully visible and sharp. The camera slows down but the characters never freeze. 

[BLOK KUNCI disalin persis]
```

SC02 VIDEO AND AUDIO PROMPT (gambar awal: `SC01-END-v1`):
```text
ACTION:
Continue directly from the selected frame, camera starting still. A wide-angle selfie shows Naila walking slowly along the fence toward the ducks. Medium close-up, eye level, 24mm wide lens, slow leading shot moving backward in front of her at walking pace.

DIALOGUE:
Line 1, Naila says exactly, in a cheerful 8-year-old girl's Bahasa Indonesia voice: "Lihat, entoknya besar-besar. Yuk kita kasih makan!"
Keep these exact words. No other speech. No narrator.

SOUND:
Footsteps on grass, louder duck calls as she gets closer, light breeze. No music.

CLOSING MOTION:
In the final seconds Naila leans on the fence and scatters a last handful of feed, ducks pecking around her feet. Fully visible and sharp. The camera slows down but the characters never freeze. 

[BLOK KUNCI disalin persis]
```

### F5. Prompt lengkap JOTA 1 S28 dengan dialog (ARSIP sejak v3.28; template wajib sekarang template PRO di `PROMPT_PROFESIONAL.md`)

Setiap prompt ditulis **lengkap dan identik strukturnya** di setiap scene: kalimat pembuka faceless, keadaan awal, beat sheet, blok kamera, dialog persis, suara, keadaan akhir, akhir shot, BLOK KUNCI utuh. Contoh terisi scene SAMBUNG: `CONSISTENCY_RULES.md` bagian 10. Tidak boleh disingkat atau ditulis "same as before", karena VideoExpress membaca setiap job terpisah.

IMAGE PROMPT (keyframe):
```text
Faceless Islamic children's cartoon illustration. Every character has a plain blank face: a smooth empty skin-colored oval with nothing drawn on it, like an unpainted doll face.
[Lokasi, waktu]. [Tokoh A], [keadaan terkini dari Buku keadaan: pose, posisi kiri/kanan layar, arah pandang, benda dipegang]. [Tokoh B], ...
Objects now: [keadaan setiap benda dengan hitungan].
Camera: [ukuran shot], eye level, side three-quarter view, full heads and headwear inside the frame.
No text, no letters, no logos.
CONSISTENCY LOCK:
STYLE: faceless Islamic children's cartoon, 2D anime-style illustration, clean line art, soft cel shading, warm cozy colors. Keep this exact style for the entire video.
[A]: [kalimat KUNCI tokoh persis].
[B]: [kalimat KUNCI tokoh persis].
SCALE: [kalimat tinggi relatif persis].
[PR01]: [kalimat KUNCI benda persis].
LAYOUT: [kalimat tata letak dan pencahayaan persis].
FACELESS: blank empty face ovals for every person, in every frame.
Aspect ratio [16:9 atau 9:16, pilihan owner].
```

VIDEO AND AUDIO PROMPT:
```text
SC##: [judul proyek]
OPENING STATE:
[Scene SAMBUNG: Continue directly from the selected starting image, same take.] [posisi, pose, arah pandang, benda di tangan setiap tokoh]. [keadaan setiap benda dengan hitungan].

ACTION:
From the very first frame, [aksi yang sudah berjalan].
0-3s: [aksi A] while [reaksi gerak B]. [A] speaks line 1.
3-6s: [aksi B] while [reaksi gerak A]. [B] speaks line 2.
6-8s: [aksi baru]. [A] speaks line 3.
8-10s: [aksi lanjutan pelan sampai akhir]
No one stands idle at any moment: whenever nobody speaks, someone is visibly moving.

CAMERA:
Start: [ukuran shot], side three-quarter view, eye level, [lensa], camera placed [posisi menurut peta lokasi], [A] on screen [left/right], [B] on screen [left/right], [landmark]. (SAMBUNG: dibuka "The camera starts exactly at the framing of the selected starting image:")
0-3s: [jenis gerakan] [arah] at a [kecepatan] speed, from [framing] to [framing], because [alasan].
3-6s: [jenis gerakan sesuai emosi, misalnya snap zoom saat kaget] [arah] at a [kecepatan] speed, from [framing] to [framing], because [alasan; elemen efek kartun].
6-8s: [jenis gerakan] [arah] at a [kecepatan] speed, from [framing] to [framing], because [alasan].
8-10s: the camera slows to almost still and ends on [framing akhir], [A] on screen [left/right], [B] on screen [left/right].
Rules: the camera stays on the same side of the characters for the whole clip. Keep every main character's full head, including headwear, inside the frame at all times.

DIALOGUE:
Line 1, [A] says exactly, in a [suara] Bahasa Indonesia voice: "[kalimat 1]"
Line 2, [B] replies exactly, in a [suara] Bahasa Indonesia voice: "[kalimat 2]"
Line 3, [A] answers exactly: "[kalimat 3]"
Lines follow the timing in ACTION. Keep these exact words. No other speech. No narrator.

SOUND:
[suara lingkungan]. No music.

END STATE:
[posisi, pose, benda di tangan setiap tokoh]. [keadaan setiap benda dengan hitungan].
Objects move only when a character moves them on screen. Nothing reappears, disappears, multiplies, changes color, or changes shape.

CLOSING MOTION:
[aksi lanjutan pelan]. All characters fully visible and sharp, mouths closed after the last word. The camera slows down. The characters keep moving gently until the very last frame; no one freezes or stands idle.

CONSISTENCY LOCK:
STYLE: faceless Islamic children's cartoon, 2D anime-style illustration, clean line art, soft cel shading, warm cozy colors. Keep this exact style for the entire video.
[A]: [kalimat KUNCI tokoh persis dari character bible].
[B]: [kalimat KUNCI tokoh persis dari character bible].
SCALE: [kalimat tinggi relatif persis].
[PR01]: [kalimat KUNCI benda persis].
LAYOUT: [kalimat tata letak dan pencahayaan persis].
FACELESS: every person keeps a plain blank face oval in every frame of the entire video; no eyes and no nose ever appear, even while speaking. A mouth may appear only on the character who is speaking.
FRAME: [A] and [B] remain in the shot the entire time. Aspect ratio [16:9 atau 9:16, pilihan owner].
No background music.
```

Setting: Image Type 2D, Creative mode OFF, Enhance image OFF, Advanced Mode ON, durasi 10, Video Only OFF, Narration OFF (dialog native), public gallery OFF. Enhance image dan enhance video OFF (v3.26).

## G. Pembuka dan penutup film (SKILL.md 4B langkah 8)

Pembuka dan penutup adalah sekuens khusus (SQ00 dan SQ-END) di luar rantai cerita. Gambar pembuka OP2 boleh punya Image Prompt sendiri karena bukan bagian rantai scene cerita. Keduanya wajib ada di rencana scene.

| Bagian | Isi | Durasi | Cara buat |
|---|---|---|---|
| OP1 Produser | Teks "[NAMA PRODUSER] presents" di latar gelap, fade in dan fade out | 3 sampai 4 detik | Teks di editor VideoExpress |
| OP2 Judul | Shot sinematik dunia cerita (EWS atau drone flyover, tokoh kecil atau belum tampil), ruang kosong di tengah atau atas untuk judul. Teks judul film muncul pelan | 6 sampai 8 detik | Klip VideoExpress dari Image Prompt sendiri + teks judul di editor |
| Cerita | SC01 sampai SCN | Sesuai rencana | Rantai scene |
| CL1 Penutup visual | Scene terakhir diakhiri pull out lambat atau crane naik ke wide, lalu fade ke hitam | Bagian dari scene terakhir | Prompt scene terakhir |
| CL2 Tamat | Teks "TAMAT" atau "Selesai" | 2 sampai 3 detik | Teks di editor |
| CL3 Kredit | Judul film, Produser, Cerita dan sutradara, Karakter dibuat dengan Artistly, Video dibuat dengan VideoExpress, Musik (JOTA 2, nama dan lisensi), "Cerita ini fiksi" untuk cerita karangan, "Terima kasih sudah menonton" | 6 sampai 10 detik | Teks bergulir atau bergantian di editor |

Aturan teks:
- Semua tulisan (nama produser, judul, kredit) ditambahkan dengan alat teks di editor, **bukan digambar AI**. AI sering membuat huruf rusak.
- Image Prompt OP2 harus memuat `No text, no letters, no logos`.
- Gaya huruf default: sederhana dan elegan, warna emas klasik di latar gelap. Owner bisa mengganti.
- JOTA 1: pembuka dan penutup tanpa musik, cukup suara alam pelan. JOTA 2: musik berlisensi boleh.
- Fade ke hitam hanya untuk pembuka dan penutup, tidak untuk menutupi sambungan scene yang jelek.
- Kalau editor VideoExpress di akun owner tidak punya alat teks: export tanpa judul sebagai v1 (`TITLES_SKIPPED`), catat di `RUN_STATE.json`, lanjut ke Drive. Alat lain di luar VideoExpress tidak dipakai.

**Batas waktu teks (v3.9, wajib):** teks judul tidak boleh menahan penyerahan. Pemicu: produksi Rebutan Mangga macet 3,5 jam hanya di 4 teks judul padahal 6 klip sudah tersusun.
1. Mengerjakan semua teks OP dan CL maksimal **10 menit** sejak teks pertama dibuat.
2. Setiap blok teks yang ditambahkan harus langsung diisi teks yang benar. Blok berisi tulisan bawaan (misalnya "VIDEO APP", "Text Animations", "Your text here") tidak boleh tertinggal di timeline.
3. Kalau dalam 10 menit belum beres: hapus semua blok teks yang belum benar (klik kanan > `Delete`), export tanpa judul sebagai `v1`, unggah ke Drive, catat `TITLES_SKIPPED` di RUN_STATE, dan laporkan ke owner. Judul ditambahkan agen di `v2`.
4. Sebelum export, cek sekilas di preview bahwa tidak ada tulisan bawaan yang tampil. Ini pengaman, bukan QC.

## H. Tanpa QC agen, penyerahan ke Google Drive (v3.8)

Owner yang menilai hasil. Agen tidak menonton klip untuk menilai, tidak membandingkan dengan gambar acuan, dan tidak generate ulang karena perbedaan kecil.

Yang tetap dikerjakan agen:
1. **Cek setelan sebelum setiap Create** (P0 sampai P5 di `../SKILL.md`). Ini mencegah render 12 menit terbuang karena rasio vertikal atau public gallery menyala.
2. **Ulang hanya kalau gagal teknis:** render error, video kosong atau hitam, tanpa suara padahal ada dialog. Maksimal 3 kali per scene, lalu catat hambatannya.
3. **Scene SAMBUNG:** frame sambungan tetap dilihat dan dipilih sesuai D2, karena memilih frame memang butuh melihat gambar.
4. **Rakit:** klik kanan klip di `My AI Videos` > `Add to Timeline` sesuai urutan dan ID job (bukan urutan terbaru), potong bagian diam di awal dan akhir, `Auto Align Clips`, tambah pembuka dan penutup, `Save`.
5. **Export:** `Export Video` > High / FullHD / mp4. Tunggu sampai file muncul di `My Videos`.
6. **Simpan ke Google Drive:** unggah MP4 ke folder Google Drive `Video JOTA` di akun `jotaauto1@gmail.com` (ID `1GeDj4s0ubm0kCMr4SYseYGlZyZA7x_Us`) dengan nama `{PROYEK}-v1.mp4` (contoh `JOTA-M2-STICKMAN-MANGGA-20261024-v1.mp4`). Cara: unduh MP4 dari `My Videos` di browser yang sama (perintah owner untuk produksi sudah mencakup unduhan hasil ini), lalu unggah lewat drive.google.com yang login sebagai `jotaauto1@gmail.com`, atau lewat connector Google Drive kalau agen bisa membaca filenya. Jangan unggah ke akun atau folder lain. Kalau langkah unggah tidak bisa, catat `AUTOMATION_BLOCKED` di langkah itu dan serahkan link `My Videos` ke owner.
7. **Laporan ke owner:** link file Drive, daftar `SC## → ID klip`, durasi total, dan scene yang diulang karena gagal teknis. Lalu `RUN_STATE.json` diperbarui ke `DELIVERED`.

Hasil uji 2026-10-25 (Claude, sesi cloud): export berhasil dan file bisa dibaca di halaman (`/download/output/{id}`, video/mp4), tapi unggah ke Drive gagal karena shell sesi cloud tidak bisa menjangkau domain VideoExpress dan tab browser tidak bisa memilih file dari komputer owner. Di sesi seperti ini, langkah 6 berstatus `AUTOMATION_BLOCKED` (tidak diserahkan ke owner); jalankan dari agen yang punya akses file di komputer owner. Agen dengan akses file di komputer owner (Claude desktop yang tertaut atau ChatGPT dengan Full access) belum diuji.

## I. Masalah umum

| Masalah | Perbaikan |
|---|---|
| Karakter keluar frame | Tambah `remains in the shot the entire time` di BLOK KUNCI, kurangi gerakan kamera |
| Ciri atau style berubah | Pastikan baris STYLE dan BLOK KUNCI disalin persis, kosakata sesuai kelompok style, kamera tidak memperbesar kepala (`PROMPT_PROFESIONAL.md` 2A); ulang scene kalau pelanggaran fatal |
| JOTA 1 muncul mata atau hidung (gambar acuan atau keyframe) | Ulang dengan shot lebih jauh maksimal 2 kali, cek Enhance image OFF dan kalimat pembuka faceless utuh, lalu satu kali Smart Edit faceless (I7). Masih gagal: `FACELESS_QA_BLOCKED`, hambatan nyata. Mulut saat bicara tidak perlu diulang |
| Frame terakhir buram | Pilih frame lebih awal yang lolos D2; ulang scene kalau tidak ada |
| Dialog terpotong di sambungan | Pendekkan dialog supaya selesai sekitar detik ke-8, sisanya aksi lanjutan pelan |
| Tokoh bengong (tidak bergerak dan tidak bicara) | Prompt: beat sheet 0-3s/3-6s/6-8s/8-10s, buka dengan `From the very first frame`, hapus kata pause/holds still; rakit: potong bengong di awal atau akhir; bengong di tengah: ulang scene |
| Kata dialog berubah | Cek `Details`, ulang dengan `Keep these exact words` |
| Centang Enhance berubah sendiri | Atur durasi dulu, lalu pastikan kedua Enhance OFF tepat sebelum Create |
| Tokoh SC01 lebih banyak dari slot Reference Photo | Lihat C.3 |
| Huruf judul rusak | Hapus teks dari Image Prompt, tambahkan teks di editor |
| Klip tidak terhapus dengan tombol Delete | Klik kanan potongan > `Delete`. Jangan pakai ikon tempat sampah track |
| Ada celah hitam di timeline setelah hapus | `Auto Align Clips` |
| Pesan batas 5 video paralel | Job tidak dibuat; tunggu sekitar 60 detik, klik `Create Video` sekali lagi |
| Klip paralel sulit dibedakan di Media Library | Pastikan baris pertama prompt `SC##: judul` |
| Hasil keluar vertikal padahal proyek 16:9 | Rasio kembali ke Vertical saat dialog dibuka ulang; ulang dengan Landscape |

## J. Catatan per scene di ledger

Cukup: `scene_id`, `videoexpress_clip_id`, hasil (`lolos` atau `ulang`), dan catatan singkat kalau diulang.

## K. Yang belum terverifikasi

- Tutorial menyebut VideoExpress dibayar sekali dan generate tanpa batas. Ini klaim kreator video, belum dicek untuk akun owner.
- Jumlah slot `Reference Photo`, fitur folder, dan alat teks di editor belum dicek di akun owner.
- Durasi 10 detik dan First/Last Frame diiklankan VideoExpress, hasil aktual harus diukur.
- Kualitas lip-sync karakter hewan 2D belum terbukti.
- Klip pendek 4 detik (tanpa dialog) atau 5 detik (dialog maksimal sekitar 8 kata) dari playbook pihak ketiga: render lebih cepat, tapi belum diuji untuk cerita JOTA. Uji di satu scene sebelum dipakai.
- Kualitas suara narator Indonesia (Gadis dan lainnya) belum dinilai owner.
- `Use Creative mode` ON untuk style 3D dan 2D (anjuran playbook yang sama) belum dibandingkan dengan OFF di akun owner.
- Enhance Video Prompt OFF menjadi aturan sejak v3.26 demi konsistensi; dampaknya pada kualitas gerak belum dibandingkan dengan ON di akun owner.

## L. Peta UI VideoExpress yang teruji

Diamati di akun owner 2026-10-24 (tanda Claude) dan dicocokkan dengan peta UI playbook pihak ketiga (tanda P). Kalau UI berubah, cari kontrol dari teksnya.

| Bagian | Perilaku | Sumber |
|---|---|---|
| Dialog Create Video From Prompt | Setiap kali dibuka ulang, rasio kembali ke `Vertical 9:16` dan `Share this in the public gallery` kembali ON. Atur ulang keduanya di setiap scene | Claude |
| Dialog | Isi prompt dan gambar dari scene sebelumnya bisa tertinggal. Hapus dan isi ulang kedua prompt. Biarkan panel terbuka di antara submit | P |
| Dialog berubah sendiri | 2026-10-28: tepat setelah `Create Image`, isi dialog berganti ke prompt job lain dan Creative mode serta public gallery menyala sendiri. Agen berhenti dan melapor (`SHARED_SESSION_CONFLICT`, SKILL.md bagian 3) | Claude |
| `Automatically enhance my image prompt` | Bisa tercentang lagi sendiri saat dialog dirender ulang; OFF, cek tepat sebelum Create Image | P (stickman) |
| `Reference Photo 1` dan `2` | Slot Consistent Character; berbeda dengan `Use from Library` yang memilih gambar awal klip | P (stickman) |
| `Image Type` | Nilai: `human`, `2d`, `3d`, `photorealistic`, `other` | Claude |
| `Manual Video Length` | Mencentangnya mereset slider ke 10; atur slider sesudah dicentang, lalu baca ulang | P |
| `Automatically enhance my video prompt` | Bisa berubah saat durasi diubah; sejak v3.26 dibiarkan OFF dan dicek tepat sebelum Create. Enhance menulis ulang teks (di SC01 Anak Entok kata dialog tetap utuh, tapi kalimat kunci bisa ikut ditulis ulang) | Claude, tutorial |
| `Create Video` | Sering di bawah layar; gulir di dalam dialog. Tombol `Close` kurang andal, pakai X kanan atas | P |
| Hasil submit | Notifikasi *"Your video will appear in your Media Library…"* = diterima. Pesan batas 5 job paralel = tidak dibuat | Claude, P |
| Media Library | `My Media > My AI Videos` untuk klip, `My AI Images` untuk frame tersimpan. Judul kartu = awal prompt. Klip yang masih render menampilkan cincin persen; keluar-masuk folder untuk menyegarkan. Dari 50 persen ke atas, segarkan sebelum setiap cek karena kartu sering berhenti di tengah walau klip sudah selesai | Claude, P, skill komunitas |
| Picker `Use from Library` | Klik sekali pada folder; klik dua kali bisa menutup picker | Claude |
| Timeline: hapus | Klik kanan potongan > `Delete`. Keyboard Delete tidak berfungsi. Ikon tempat sampah di kiri track menghapus seluruh track | Claude, P |
| Timeline: potong | Ikon gunting `Cut` memotong klip di bawah playhead | Claude |
| Timeline: rapikan | `Auto Align Clips` (`+|+`) merapatkan celah setelah hapus atau geser | P |
| Timeline: simpan frame | Ikon film `Save current frame` menyimpan ke `My AI Images`; cek hasilnya di sana | Claude |
| Timeline: playhead | Klik penggaris di atas track. Tidak ada input timecode dan tidak ada waveform; nilai titik potong dari gambar preview dan dengan memutar suara | Claude, P |
| Export | `Save`, lalu `Export Video` > `High` / `FullHD` / `mp4`. File muncul di `My Videos` dengan link unduh, disimpan 40 hari | P (belum diuji Claude) |
| Render | 6 sampai 12 menit per klip 10 detik (beberapa pengamatan) | Claude |
| `Smart Edit` | Prompt + Reference Photo, menghasilkan 2 gambar baru; menggambar ulang seluruh gambar, bukan menambal bagian | Claude |
| `First Frame, Last Frame` | Frame awal dan akhir dari prompt atau library (beta), Video and Audio Prompt, Consistent Character; tanpa slider durasi (klip uji sekitar 7 detik); berakhir tepat di frame akhir | Claude |
| `Narration Video` | Dialog TTS: Text to Speech (id-ID tersedia), CloneVoice.ai, rekam suara, impor audio; teks TTS maksimal 120 karakter | Claude |
| Referensi elemen agen | Bisa basi setelah dialog dirender ulang; cek centang dengan memperbesar layar sebelum Create | Claude |
