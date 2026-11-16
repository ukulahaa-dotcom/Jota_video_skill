# JOTA aturan konsistensi: karakter, benda, tata letak, keadaan, kamera

Keputusan owner 2026-10-25. Berlaku untuk JOTA 1 dan JOTA 2, untuk Claude, ChatGPT, dan agen lain. Kalau ada aturan lain di skill yang bertentangan dengan file ini soal konsistensi atau pemilihan metode scene, file ini yang menang.

Pemicu v3.25: video `JOTA-M1-SARAH-MEMBANTU-ABA-20261025-v1`. Semua scene terjadi di ruangan yang sama, tapi tiap scene dibuat dari gambar baru (KEYFRAME). Hasilnya: peci Aba hilang di SC04, buku hijau dan biru berubah jadi oranye lalu krem, tumpukan buku yang sudah dibereskan muncul lagi berserakan, tinggi Sarah berubah, dan kamera hanya satu sudut lebar.

Pemicu v3.26: produksi `JOTA-M1-SAHEELA-UMAIR-BERMAIN-20261025` berhenti di SC01 setelah 4 render. Frame dibandingkan dengan teks bible yang ditulis sebelum gambar ada, padahal gambar acuan sendiri sudah berbeda dari teks (rambut Umair terlihat di bawah peci, tirai 3 panel bukan 2). Semua selisih juga dianggap sama fatalnya. Selain itu, gerakan kamera di percobaan 1 dan 3 memperlihatkan bagian ruangan baru sehingga muncul pintu dan bukaan yang tidak ada di gambar awal.

## 1. Prinsip

1. **Dunia cerita hanya bergerak maju.** Apa pun yang terlihat di layar tetap berlaku sampai ada aksi di layar yang mengubahnya. Buku yang sudah ditaruh di rak tetap di rak. Peci yang dipakai tetap dipakai.
2. **Konsistensi dikunci sebelum prompt ditulis**, lewat empat dokumen di `PROMPTS.md`: Character bible (bagian 3), Props bible (bagian 4), Peta lokasi (bagian 5), dan Buku keadaan (bagian 6).
3. **Teks kunci disalin, tidak ditulis ulang.** Kalimat ciri tokoh, benda, dan tata letak ditulis sekali di bible, lalu disalin huruf per huruf ke setiap prompt. Tidak boleh diringkas, diganti sinonim, atau ditulis "same as before".
4. **Konsistensi mengalahkan kecepatan dan variasi.** Kalau generate paralel atau kamera yang ramai membuat konsistensi berisiko, pilih konsistensi.
5. **Gambar yang sudah disetujui menang atas teks.** Teks bible adalah rencana. Begitu gambar acuan tokoh dan gambar awal scene lolos, teks diperbarui agar sesuai gambar (bagian 2D). Cek konsistensi membandingkan dengan gambar, bukan dengan teks lama.
6. **Hanya pelanggaran fatal yang menghentikan produksi.** Detail hiasan dicatat lalu jalan terus (bagian 9B).

## 2. Metode scene: SAMBUNG atau KEYFRAME (wajib)

### 2A. SAMBUNG: frame terakhir jadi gambar awal scene berikutnya

Scene **wajib** SAMBUNG kalau ketiga syarat ini terpenuhi:

1. **Lokasi sama**: ruangan atau area yang sama dengan scene sebelumnya.
2. **Waktu bersambung**: tidak ada lompatan waktu.
3. **Tokoh tetap di area aksi yang sama**: tidak pindah ke titik lain ruangan yang tidak terlihat di frame terakhir, dan tidak keluar lalu masuk lagi.

Cara kerja:
- Gambar awal = frame sambungan klip sebelumnya yang lolos cek (bagian 9), dipilih lewat `Use from Library`. Klip sebelumnya di-trim tepat di frame itu (`SCENE_WORKFLOW.md` D3).
- **Tidak ada Image Prompt dan tidak klik Create Image.** Hanya Video and Audio Prompt.
- Ganti sudut atau ukuran shot di lokasi yang sama dilakukan **dengan gerakan kamera di dalam klip** (push-in, arc, crane, pull-out), bukan dengan gambar baru.
- Tidak ada batas jumlah klip dalam satu rantai, tapi setiap frame sambungan wajib lolos cek bagian 9. Frame yang sudah melenceng tidak boleh dipakai menyambung, karena kesalahannya akan terbawa ke semua scene berikutnya.
- Scene SAMBUNG tidak bisa di-generate paralel dengan scene sebelumnya. Ini konsekuensi yang diterima owner demi konsistensi.

### 2B. KEYFRAME: gambar baru

KEYFRAME **hanya** dipakai kalau salah satu terjadi:

1. **SC01** dan gambar pembuka OP2.
2. **Pindah lokasi**: ruangan lain, keluar rumah, tempat lain.
3. **Pindah posisi besar di lokasi yang sama**: tokoh pindah ke bagian ruangan yang tidak terlihat di frame terakhir (contoh: dari rak buku ke meja makan di sisi lain ruangan).
4. **Lompatan waktu**: siang ke malam, hari berikutnya.

Ukuran shot KEYFRAME: **paling dekat yang masih memuat semua tokoh dan benda cerita**, biasanya medium two-shot lutut ke atas. Tidak memakai shot lebar seluruh ruangan. Alasan: saat `Use Consistent Character` dicentang, VideoExpress sendiri menyarankan close-up (dicatat di repo workflow resmi tim VideoExpress, 2026-08), dan shot lebar di Sarah v1 paling banyak melenceng. Makin sedikit ruangan yang terlihat, makin sedikit yang bisa berubah.

Kalau KEYFRAME terjadi di lokasi yang pernah dipakai:
- Image Prompt menyalin Peta lokasi (bagian 5) dan **keadaan terkini dari Buku keadaan** (bagian 6), bukan keadaan awal cerita. Benda yang sudah dibereskan digambar sudah rapi.
- Reference Photo: gambar acuan karakter (CH-REF). Kalau slot cukup, tambahkan gambar lokasi (LOC-REF) atau frame terakhir scene terakhir di lokasi itu.

**Dilarang** memakai KEYFRAME untuk scene yang memenuhi syarat SAMBUNG, dengan alasan apa pun (lebih cepat, bisa paralel, ingin sudut baru).

### 2C. Tabel keputusan per scene

Sebelum menulis prompt, isi kolom ini di Tabel scene. Agen menulis alasannya, tidak hanya tandanya.

| Pertanyaan | Ya | Tidak |
|---|---|---|
| Ini SC01 atau OP2? | KEYFRAME | lanjut |
| Lokasi berbeda dari scene sebelumnya? | KEYFRAME | lanjut |
| Ada lompatan waktu? | KEYFRAME | lanjut |
| Tokoh pindah ke bagian ruangan yang tidak terlihat di frame terakhir? | KEYFRAME | SAMBUNG |

### 2D. Kunci dari gambar (IMAGE LOCK)

Teks yang ditulis sebelum gambar dibuat hampir tidak pernah cocok 100 persen dengan hasil generate. Supaya cek konsistensi tidak gagal terus karena selisih yang sudah ada sejak awal, teks dikunci ulang dari gambar.

1. **Setelah gambar acuan tokoh (CH-REF) lolos**, agen melihat gambarnya dan menulis ulang kalimat KUNCI tokoh agar menggambarkan apa yang benar-benar terlihat. Contoh: teks "hair fully hidden under the peci", gambar memperlihatkan rambut pendek di sisi kepala, maka teks menjadi "short black hair visible at the sides under the peci".
2. **Pengecualian:** kalau gambar melanggar syarat yang tidak boleh ditawar, gambarnya yang diulang, bukan teksnya yang diubah. Syarat itu: JOTA 1 mata atau hidung terlihat, hijab tidak menutup rambut, atribut yang wajib ada di cerita hilang (misalnya peci tidak ada sama sekali), atau warna dan jenis baju jauh dari yang dipilih owner.
3. **Setelah gambar awal SC01 (dan setiap KEYFRAME) lolos**, kalimat LAYOUT, Props bible, dan KEADAAN AWAL scene itu ditulis ulang sesuai gambar: jumlah jendela dan panel tirai, posisi bangku dan rak, pintu atau bukaan yang terlihat, warna dan jumlah benda.
4. Catat di `RUN_STATE.json` bagian `image_lock`: ID gambar, kalimat lama, kalimat baru. Commit sebelum scene berikutnya dibuat.
5. Semua prompt sesudahnya memakai kalimat baru, tetap disalin huruf per huruf.
6. Selisih antara teks lama dan gambar yang sudah dikunci **tidak dihitung gagal** dan tidak memakai jatah ulang.

Contoh dari Saheela dan Umair: LAYOUT lama "two cream curtain panels", gambar SC01 memperlihatkan tiga panel, maka LAYOUT dan Props bible diubah menjadi tiga panel. Klip SC01 yang setia pada gambar awalnya lolos cek tata letak.

## 3. Character bible (kunci per tokoh)

Setiap tokoh punya baris lengkap. Kolom kosong tidak boleh; kalau memang tidak ada, tulis "tidak ada".

Sejak v3.49 "tokoh" di sini termasuk setiap orang yang tampil: pedagang, penjaga, pemilik tangan di shot tangan, dan kelompok figuran (satu baris per kelompok, misalnya `TOWNSPEOPLE`). Orang yang tampil tanpa baris bible ditafsir ulang oleh model; di Umar S28 SHOT04 satu pedagang tanpa KUNCI menjadi empat orang berwajah (`PROMPT_PROFESIONAL.md` 2F poin 1).

| Kolom | Isi | Contoh (Aba) |
|---|---|---|
| ID, nama, peran | | CH02, Aba, ayah Sarah |
| Usia dan bentuk badan | usia, postur | sekitar 35 tahun, ramping, tegap |
| Tinggi relatif | perbandingan dengan tokoh lain, dalam posisi berdiri | tertinggi; kepala Sarah setinggi dada Aba |
| Kulit | warna dan nuansa | light warm tan skin |
| Rambut | warna, panjang, model, terlihat atau tertutup | short black hair, only the sides visible under the peci |
| Penutup kepala | jenis, warna, kapan dipakai | black round peci, worn in every frame |
| Wajah | JOTA 1: oval polos; JOTA 2: ciri wajah lengkap | blank oval face |
| Baju atas | jenis, warna dengan nuansa, lengan, kerah, kancing | light sky-blue long-sleeve baju koko, mandarin collar, three white buttons |
| Bawahan | jenis, warna | dark brown long trousers |
| Alas kaki | jenis, warna; dalam rumah juga ditulis | barefoot indoors |
| Aksesori | jam, tas, kacamata, dan lain-lain | tidak ada |
| Benda yang dibawa | kalau selalu dibawa | tidak ada |
| Sifat | 2 sampai 3 sifat yang memengaruhi gerak dan reaksi | sabar, lembut, suka memuji |
| Gaya gerak | cara bergerak yang tetap | tenang, membungkuk pelan, tangan terbuka saat menjelaskan |
| Suara | usia, nada, logat | warm calm adult male voice |

Aturan:
1. **Kalimat KUNCI tokoh** ditulis sekali dalam bahasa Inggris dari baris bible, lalu disalin persis ke setiap prompt yang memuat tokoh itu. Contoh:
   `Aba: a slim faceless father about 35 years old, light warm tan skin, short black hair visible only at the sides, a black round peci always on his head in every frame, light sky-blue long-sleeve baju koko with a mandarin collar and three white buttons, dark brown long trousers, barefoot.`
2. **Atribut yang mudah hilang ditulis sebagai larangan juga.** Contoh: `His black peci never comes off and his full hair is never shown.` Atribut seperti ini: penutup kepala, hijab, kacamata, tas, warna baju yang mirip dengan latar.
3. **Warna selalu dengan nuansa** (`light sky-blue`, `dusty pink`, `cream`), tidak hanya `blue` atau `pink`.
4. **Pakaian tidak berubah dalam satu hari cerita**, kecuali ada adegan ganti baju di layar.
5. **Tinggi relatif ditulis di setiap prompt yang memuat dua tokoh atau lebih**, sebagai kalimat SKALA: `SCALE: when both stand, Sarah's head reaches Aba's chest. Their sizes never change; crouching or kneeling only bends their bodies.`
6. **Sifat dan gaya gerak menentukan aksi.** Tokoh sabar tidak tiba-tiba membentak; anak yang sopan menyerahkan benda dengan dua tangan. Perubahan sifat hanya kalau itu inti cerita dan tertulis di naskah.
7. **Gambar acuan karakter (CH-REF)** dibuat dari kalimat KUNCI tokoh: badan utuh kepala sampai kaki, latar polos, semua atribut terlihat. Setelah lolos, kalimat KUNCI tokoh dikunci ulang dari gambar ini (bagian 2D). CH-REF dipakai sebagai pembanding di setiap cek frame.

## 4. Props bible (benda)

Setiap benda yang disentuh, dipindah, atau disebut dalam cerita diberi ID.

| Kolom | Contoh |
|---|---|
| ID | PR01 |
| Benda dan jumlah persis | exactly 6 hardcover books |
| Warna per buah | 3 grass-green, 2 dark navy-blue, 1 orange |
| Ukuran dan bentuk | each about the size of a school notebook, thick hard covers |
| Tempat awal | scattered on the beige rug, center of the room |

Aturan:
1. **Jumlah, warna, ukuran, dan bentuk tidak pernah berubah.** Tidak ada benda yang bertambah, hilang, berganti warna, atau berubah bentuk.
2. **Benda baru tidak muncul** di area aksi kecuali ditulis di naskah dan masuk Props bible.
3. **Pilih jumlah kecil.** Maksimal sekitar 6 benda sejenis yang dihitung, karena model video sulit menjaga jumlah yang banyak (belum diuji, bagian 11). Benda latar yang tidak disentuh (buku di rak) cukup ditulis sebagai bagian tata letak, tidak dihitung.
4. **Kalimat KUNCI benda** disalin persis ke setiap prompt yang memuat benda itu, misalnya: `PR01 BOOKS: exactly six hardcover books, three grass-green, two dark navy-blue, one orange, each the size of a school notebook. Never more, never fewer, never other colors.`

## 5. Peta lokasi (tata letak)

Setiap lokasi diberi ID dan ditulis dari sudut kamera utama (master angle).

| Kolom | Contoh LOK01 ruang baca |
|---|---|
| Kalimat tata letak | a tall window with cream curtains on screen left, a low wooden bench against the back wall in the center, a tall white bookshelf on screen right, a beige rug in the center, light wooden floor |
| Pencahayaan dan waktu | late morning, warm sunlight from the window on screen left, soft shadows falling to the right |
| Area aksi | the rug between the bench and the bookshelf |
| Sudut kamera utama | eye level, from the room's entrance facing the back wall |
| Benda tetap | jendela, bangku, rak, karpet: tidak pernah pindah |

Aturan:
1. Kalimat tata letak disalin persis ke setiap Image Prompt dan Video and Audio Prompt di lokasi itu, diawali `LAYOUT:`.
2. Landmark tidak pernah pindah sisi layar. Kalau kamera berputar (arc), tulis landmark mana yang akan terlihat di akhir gerakan.
3. Pencahayaan sama sepanjang scene di lokasi itu, kecuali ada lompatan waktu (yang berarti KEYFRAME).
4. Lokasi yang dipakai lebih dari satu scene dibuatkan gambar lokasi tanpa tokoh (LOC-REF) dengan rasio yang sama.
5. Kamera tidak boleh menyorot bagian ruangan yang belum ditulis di peta. Kalau cerita butuh, tambahkan dulu ke peta lokasi.

## 6. Buku keadaan (state ledger)

Tabel ini diisi untuk setiap scene sebelum prompt ditulis. Isinya keadaan dunia di awal dan akhir scene.

| SC | Keadaan awal | Aksi yang mengubah | Keadaan akhir |
|---|---|---|---|
| SC01 | Sarah di kiri, Aba di kanan dekat rak; PR01: 6 buku di karpet | Sarah memungut 2 buku hijau, menyerahkan ke Aba | Sarah kiri tangan kosong; Aba kanan memegang 2 buku hijau; PR01: 4 di karpet (1 hijau, 2 biru, 1 oranye), 2 di tangan Aba |
| SC02 | sama persis dengan keadaan akhir SC01 | Aba menaruh 2 buku hijau di rak baris kedua | Aba menghadap rak; PR01: 4 di karpet, 2 di rak baris kedua |

Yang wajib dicatat di setiap baris:
1. Posisi setiap tokoh: kiri, tengah, kanan layar; depan atau belakang.
2. Pose: berdiri, jongkok, berlutut, duduk.
3. Arah badan dan arah pandang.
4. Benda di tangan, dan tangan kiri atau kanan.
5. Keadaan setiap benda di Props bible, **dengan hitungan**: berapa di lantai, berapa di rak, berapa di tangan.
6. Keadaan lingkungan yang bisa berubah: pintu, tirai, lampu.
7. Framing kamera di akhir scene (untuk SAMBUNG berikutnya).

Aturan:
1. **Keadaan akhir SC(n) disalin persis menjadi keadaan awal SC(n+1).**
2. **Perubahan hanya lewat aksi di layar** dalam scene itu. Kalau tidak ada aksi yang menyentuh benda, benda itu tidak berubah.
3. **Yang sudah dibereskan tetap beres.** Dilarang ada scene yang menampilkan benda kembali berserakan setelah dibereskan, kecuali ada aksi di layar yang menjatuhkannya.
4. Keadaan awal dan akhir ditulis di setiap Video and Audio Prompt (blok KEADAAN AWAL dan KEADAAN AKHIR, `SCENE_WORKFLOW.md` F3), dengan kalimat penjaga wajib:
   `Objects move only when a character moves them on screen. Nothing reappears, disappears, multiplies, changes color, or changes shape.`

## 7. Kamera di Video and Audio Prompt (wajib detail)

Setiap Video and Audio Prompt punya blok `KAMERA` yang terpisah dari aksi tokoh. Gerakan kamera ditulis lengkap, bukan satu kata. Batas kamera terhadap orang (tidak membuka area baru, tidak mendekat ke orang, tidak menembus kerumunan) ada di `PROMPT_PROFESIONAL.md` 2F poin 2 sampai 4 dan berlaku di atas semua contoh di bagian ini.

```text
CAMERA:
Start: [ukuran shot], [sudut], [tinggi kamera], [lensa], camera placed [posisi di ruangan menurut peta lokasi], [Tokoh A] on screen [left/right], [Tokoh B] on screen [left/right], [landmark yang terlihat].
0-3s: [jenis gerakan] [arah] at a [very slow/slow/medium/fast] speed, from [framing awal] to [framing akhir], because [alasan emosi atau aksi].
3-6s: [jenis gerakan] [arah] at a [kecepatan], from [framing] to [framing], because [alasan].
6-8s: [jenis gerakan] [arah] at a [kecepatan], from [framing] to [framing], because [alasan].
8-10s: the camera slows to almost still and ends on [framing akhir], [Tokoh A] on screen [left/right], [Tokoh B] on screen [left/right].
Rules: the camera stays on the same side of the characters for the whole clip. The camera never reveals any part of the room outside the starting image. Keep every main character's full head, including headwear, inside the frame at all times.
```

Aturan:
1. **Lima unsur per gerakan:** jenis (push-in, pull-out, pan, tilt, arc, crane, tracking, snap zoom), arah (left, right, up, down, toward [tokoh]), kecepatan, framing awal dan akhir, dan alasannya. Pilihan gerakan sesuai emosi: `CAMERA_LANGUAGE.md` 3B.
2. **Minimal dua jenis gerakan berbeda per klip 10 detik**, kecuali momen doa yang sengaja tenang.
3. **SAMBUNG:** baris `Start` dibuka `The camera starts exactly at the framing of the selected starting image.` dan isinya sama dengan baris akhir KAMERA klip sebelumnya.
4. **Garis 180 derajat:** tokoh yang di kiri tetap di kiri. Pindah sisi hanya lewat arc yang terlihat dan ditulis di blok KAMERA.
5. **Headroom:** kepala utuh beserta peci, hijab, atau topi selalu di dalam frame. Close-up wajah dan potongan yang membuang ujung kepala dilarang untuk tokoh utama (di video Sarah, peci Aba hilang dari frame karena kepalanya terpotong).
6. **Variasi sudut di lokasi yang sama** dibuat lewat gerakan yang tetap di dalam gambar awal: push-in ke tokoh atau benda, pan pelan dari satu tokoh ke tokoh lain, tilt ke benda di tangan, arc kecil sekitar 15 derajat, lalu pull-out kembali paling jauh ke framing awal.
7. Kamera melambat di dua detik terakhir supaya frame sambungan tajam; tokoh tetap bergerak (aturan tanpa bengong, `SCENE_WORKFLOW.md` D0).
8. **Kamera tidak boleh memperlihatkan bagian ruangan di luar gambar awal klip itu**: dinding lain, pintu, jendela, atau sisi ruangan yang belum terlihat. Model akan mengarang bagian itu dan hasilnya berbeda di setiap klip. Bukti: SC01 Saheela dan Umair percobaan 1 dan 3 memunculkan pintu dan bukaan baru setelah kamera bergerak. Dilarang: pull-out lebih lebar dari framing awal, pan atau arc besar, crane naik yang memperlihatkan langit-langit, whip pan ke luar frame.
9. **Tanpa kata waktu** di scene yang waktunya bersambung: later, after a while, then evening, the next moment, meanwhile. Kata seperti ini membuat model mengubah cahaya.

## 8. Larangan (fatal)

1. Atribut tokoh hilang, berganti, atau berubah warna (peci, hijab, baju, alas kaki).
2. Tinggi atau ukuran tokoh berubah antar scene.
3. Benda bertambah, hilang, berganti warna, atau berubah bentuk.
4. Benda yang sudah dibereskan muncul berserakan lagi.
5. Landmark pindah sisi atau tata letak ruangan berubah.
6. Pencahayaan atau waktu berubah tanpa lompatan waktu di naskah.
7. KEYFRAME dipakai untuk scene yang memenuhi syarat SAMBUNG.
8. Kalimat KUNCI tokoh, benda, atau tata letak diringkas, diganti, atau ditulis "same as before".
9. Blok KAMERA kosong, hanya satu kata, atau tanpa framing akhir.
10. Gerakan kamera yang memperlihatkan bagian ruangan di luar gambar awal.
11. Kalimat kunci konsistensi (baju, warna, celana, tas, aksesoris, faceless) tidak ditulis ulang di prompt. Enhance ON sejak v3.92 bisa menulis ulang prompt, jadi kunci wajib ada di setiap prompt.

## 9. Cek oleh agen

### 9A. Sebelum submit setiap scene

| Cek | Lulus kalau |
|---|---|
| K1 Metode | Tanda SAMBUNG atau KEYFRAME sesuai tabel 2C, alasannya tertulis |
| K2 Kunci tokoh | Kalimat KUNCI setiap tokoh di scene identik huruf per huruf dengan bible |
| K3 Skala | Kalimat SCALE ada kalau tokoh lebih dari satu |
| K4 Benda | Kalimat KUNCI benda ada untuk setiap benda yang muncul |
| K5 Tata letak | Kalimat LAYOUT identik dengan peta lokasi |
| K6 Keadaan | KEADAAN AWAL sama persis dengan KEADAAN AKHIR scene sebelumnya; hitungan benda cocok |
| K7 Kamera | Blok KAMERA lengkap: Start, gerakan per ketukan dengan lima unsur, framing akhir |

Kalau satu cek gagal: perbaiki prompt dulu, jangan submit (`CONSISTENCY_BLOCKED`).

### 9B. Frame sambungan dan tingkat pelanggaran

Berlaku untuk frame sambungan setiap klip yang akan disambung (termasuk akhir SC01), selain syarat `SCENE_WORKFLOW.md` D2.

**Pembanding:** gambar acuan tokoh yang sudah dikunci, gambar awal klip itu, dan Buku keadaan. **Bukan** teks yang ditulis sebelum gambar ada (bagian 2D).

**Fatal: klip diulang**

| Kode | Pelanggaran |
|---|---|
| F1 Atribut | Atribut tokoh utama hilang atau berganti: peci atau hijab lepas, baju berganti warna atau jenis, alas kaki berganti |
| F2 Skala | Tinggi relatif tokoh berubah jelas dibanding gambar awal |
| F3 Benda cerita | Benda di Props bible bertambah, hilang, berganti warna atau bentuk; benda yang sudah dibereskan berserakan lagi |
| F4 Posisi | Kiri dan kanan tokoh tertukar, atau tokoh terpotong keluar frame di frame sambungan |
| F5 Landmark | Landmark besar muncul, hilang, atau pindah dibanding gambar awal klip: pintu, jendela, bangku, rak, meja |
| F6 Syariat | JOTA 1: mata atau hidung terlihat jelas |

**Ringan: catat `MINOR_DRIFT` di RUN_STATE, lanjut**

| Kode | Contoh |
|---|---|
| M1 Hiasan | Jumlah lipatan atau panel tirai, pola karpet, isi rak di latar, tekstur dinding |
| M2 Warna | Selisih nuansa kecil karena cahaya, warna dasar tetap sama |
| M3 Detail tokoh | Detail kecil yang sama dengan gambar acuan, misalnya rambut terlihat di tepi peci |
| M4 Posisi benda | Benda bergeser sedikit di area yang sama tanpa mengubah cerita |

Ragu antara fatal atau ringan: tanyakan "apakah penonton anak akan melihat ini sebagai benda atau tokoh yang berbeda?" Kalau ya, fatal.

**Aturan ulang:**
1. Maksimal 3 kali per scene, dihitung **hanya** untuk pelanggaran fatal.
2. Kalau pelanggaran fatal yang sama muncul di semua percobaan dan sudah ada di gambar awal, yang salah adalah gambar awalnya. KEYFRAME: buat ulang gambar awal. SAMBUNG: ulang klip sebelumnya dan pilih frame sambungan lain. Jangan mengulang video dari gambar awal yang sama lebih dari sekali untuk pelanggaran yang sama.
3. Frame sambungan boleh diambil dari mana saja di bagian akhir klip sesudah dialog selesai, asal lolos. Kalau pelanggaran baru muncul di detik terakhir (misalnya pintu baru di 9,6 detik), pilih frame lebih awal yang masih lolos, lalu trim klip di situ.
4. Sesudah 3 kali gagal fatal: `CONSISTENCY_BLOCKED`, laporkan kode pelanggaran dan bukti frame ke owner.

## 10. Contoh terisi: SC02 SAMBUNG di ruang baca (JOTA 1 S28)

Contoh ini menunjukkan isi konsistensi (keadaan, kamera, KUNCI) dan ditulis dengan struktur lama sebelum template PRO. Untuk struktur prompt yang berlaku, pakai contoh terisi di `PROMPT_PROFESIONAL.md` bagian 8.

```text
SC02: Sarah Membantu Aba
OPENING STATE:
Continue directly from the selected starting image, same take. Sarah stands on screen left, facing right toward Aba, hands empty. Aba stands on screen right beside the bookshelf, holding the two grass-green books with both hands. On the rug: one grass-green, two dark navy-blue and one orange book.

ACTION:
From the very first frame, Aba is already turning toward the bookshelf.
0-3s: Aba lifts the two grass-green books and slides them onto the second shelf while Sarah watches and claps softly. Aba speaks line 1.
3-6s: Sarah bends her knees, picks up the orange book from the rug with both hands, and stands up. Sarah speaks line 2.
6-8s: Sarah walks two small steps to Aba and holds the orange book out with both hands. Aba nods and reaches for it.
8-10s: Aba takes the orange book gently; both keep moving slowly until the last frame.
No one stands idle at any moment: whenever nobody speaks, someone is visibly moving.

CAMERA:
Start: The camera starts exactly at the framing of the selected starting image: medium wide two-shot, eye level, 35mm lens, camera placed at the room's entrance facing the back wall, Sarah on screen left, Aba on screen right, bookshelf on the right edge.
0-3s: slow push-in toward the bookshelf at a slow speed, from medium wide two-shot to medium shot of Aba and the shelf, because Aba's careful action is the focus.
3-6s: slow pan left at a slow speed, from Aba to Sarah, following her as she picks up the orange book, because her helping is the heart of the story.
6-8s: gentle pull-out at a medium speed, from medium shot to medium wide two-shot, because both characters come together.
8-10s: the camera slows to almost still and ends on a medium wide two-shot, Sarah on screen left, Aba on screen right, bookshelf on the right edge.
Rules: the camera stays on the same side of the characters for the whole clip. The camera never reveals any part of the room outside the starting image. Keep every main character's full head, including headwear, inside the frame at all times.

DIALOGUE:
Line 1, Aba says exactly, in a warm calm adult male Bahasa Indonesia voice: "Yang hijau kita taruh di sini, ya."
Line 2, Sarah replies exactly, in a cheerful seven-year-old girl Bahasa Indonesia voice: "Sarah ambil yang oranye, Aba!"
Lines follow the timing in ACTION. Keep these exact words. No other speech. No narrator.

SOUND:
Soft book thuds on wood, rustle of clothes, quiet birds outside the window. No music.

END STATE:
Sarah on screen left, facing Aba, hands empty. Aba on screen right, holding the orange book. On the second shelf: two grass-green books. On the rug: one grass-green and two dark navy-blue books.
Objects move only when a character moves them on screen. Nothing reappears, disappears, multiplies, changes color, or changes shape.

CLOSING MOTION:
Aba turns the orange book in his hands while Sarah sways gently. All characters fully visible and sharp, mouths closed after the last word. The camera slows down. The characters keep moving gently until the very last frame; no one freezes or stands idle.

CONSISTENCY LOCK:
STYLE: faceless Islamic children's cartoon, 2D anime-style illustration, clean line art, soft cel shading, warm cozy colors. Keep this exact style for the entire video.
Sarah: a faceless girl about 7 years old, light warm tan skin, dusty-pink hijab covering all her hair, cream long-sleeve blouse, teal long skirt, white socks, pink flat shoes.
Aba: a slim faceless father about 35 years old, light warm tan skin, short black hair visible only at the sides, a black round peci always on his head in every frame, light sky-blue long-sleeve baju koko with a mandarin collar and three white buttons, dark brown long trousers, barefoot. His black peci never comes off and his full hair is never shown.
SCALE: when both stand, Sarah's head reaches Aba's chest. Their sizes never change; crouching or kneeling only bends their bodies.
PR01 BOOKS: exactly six hardcover books, three grass-green, two dark navy-blue, one orange, each the size of a school notebook. Never more, never fewer, never other colors.
LAYOUT: a tall window with cream curtains on screen left, a low wooden bench against the back wall in the center, a tall white bookshelf on screen right, a beige rug in the center, light wooden floor. Late morning, warm sunlight from the window on screen left.
FACELESS: every person keeps a plain blank face oval in every frame of the entire video; no eyes and no nose ever appear, even while speaking. A mouth may appear only on the character who is speaking.
FRAME: Sarah and Aba remain in the shot the entire time. Aspect ratio 16:9.
No background music.
```

Ciri tokoh di contoh ini diambil dari video v1 sebagai ilustrasi. Untuk produksi, ciri diambil dari character bible proyek.

## 11. Belum terverifikasi

- **Panjang prompt maksimal VideoExpress belum diketahui.** Prompt dengan blok kunci lengkap jadi lebih panjang. Kalau VideoExpress menolak karena terlalu panjang, yang dipendekkan lebih dulu adalah deskripsi aksi di ADEGAN dan SUARA. Kalimat KUNCI, SCALE, benda, LAYOUT, KEADAAN, dan KAMERA tidak dipendekkan. Catat hasilnya di bagian ini.
- **Enhance Image Prompt dan Enhance Video Prompt OFF** (keputusan v3.26), karena enhancer bisa menulis ulang kalimat kunci. Repo workflow resmi tim VideoExpress juga menyarankan OFF setelah gambar acuan jadi, tapi menyebut efeknya belum terukur. Dampaknya pada kualitas gerak belum dibandingkan di akun owner.
- **Kepatuhan model pada hitungan benda** belum diuji. Mulai dari jumlah kecil.
- **Rantai SAMBUNG panjang** (6 klip atau lebih di satu ruangan) belum diuji di akun owner. Pergeseran identitas yang menumpuk adalah risiko utama, karena itu cek 9B wajib di setiap sambungan.
