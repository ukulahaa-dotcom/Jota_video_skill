# JOTA bahasa kamera: ukuran shot, sudut, gerakan, lensa, kamera animasi studio, pola adegan

Dipakai saat menulis bagian ADEGAN di setiap Video and Audio Prompt. Kolom "Frasa prompt" ditulis persis (bahasa Inggris) di prompt VideoExpress.

## 0. Batasan penting dari metode sambung frame

Sejak v3.25 scene di lokasi dan waktu yang sama wajib SAMBUNG (`CONSISTENCY_RULES.md` bagian 2). Jadi satu rangkaian adegan di satu ruangan adalah **satu pengambilan panjang tanpa potongan**. Potongan ke sudut baru hanya terjadi di scene KEYFRAME (pindah lokasi, pindah posisi besar, lompatan waktu). Konsekuensinya:
- Tidak bisa "cut" mendadak ke sudut lain (misalnya shot-reverse-shot) di tengah sekuens, karena itu butuh gambar awal baru.
- Variasi ukuran shot dan sudut dibuat **lewat gerakan kamera di dalam scene** yang tetap di dalam gambar awal: push-in ke tokoh atau benda, pan pelan antar tokoh, tilt ke benda di tangan, arc kecil sekitar 15 derajat. Pull-out paling jauh kembali ke framing awal. Gerakan yang memperlihatkan bagian ruangan baru dilarang (`CONSISTENCY_RULES.md` bagian 7 poin 8).
- Gerakan kamera di awal scene harus melanjutkan arah dan kecepatan akhir scene sebelumnya. Kalau SC01 berakhir dengan kamera diam, SC02 dimulai dari kamera diam.
- Potongan ke sudut baru hanya lewat scene KEYFRAME yang memenuhi syarat `CONSISTENCY_RULES.md` 2B. Keinginan ganti sudut saja bukan alasan untuk KEYFRAME.

## 1. Ukuran shot

| Nama | Singkatan | Isi frame | Kegunaan | Frasa prompt |
|---|---|---|---|---|
| Extreme wide shot | EWS | Lanskap luas, tokoh sangat kecil | Pembuka, skala dunia | `extreme wide shot` |
| Wide / long shot | WS | Seluruh tubuh dan banyak lingkungan | Memperkenalkan lokasi | `wide shot` |
| Full shot | FS | Tubuh utuh kepala sampai kaki | Aksi tubuh, kostum | `full shot, head to toe` |
| Medium wide | MWS | Lutut ke atas | Dua tokoh bergerak | `medium wide shot` |
| Medium shot | MS | Pinggang ke atas | Dialog umum | `medium shot` |
| Medium close-up | MCU | Dada ke atas | Dialog, vlog | `medium close-up` |
| Close-up | CU | Kepala dan bahu | Emosi (JOTA 2) | `close-up` |
| Extreme close-up | ECU | Detail (mata, tangan, benda) | Penekanan detail | `extreme close-up on` |
| Insert / detail | INS | Benda penting | Petunjuk cerita | `insert shot of` |
| Establishing shot | EST | Lokasi sebelum adegan | Awal sekuens | `establishing shot of` |
| Two-shot | 2S | Dua tokoh dalam satu frame | Percakapan dalam satu take | `two-shot` |
| Group shot | GS | Banyak tokoh | Keluarga, kerumunan | `group shot` |
| Over-the-shoulder | OTS | Dari balik bahu tokoh A melihat B | Dialog (JOTA 1 bagus: wajah A tidak terlihat) | `over-the-shoulder shot from behind [A] toward [B]` |
| Point of view | POV | Apa yang dilihat tokoh | Imersi | `first-person POV shot` |
| Selfie / vlog | SELF | Kamera depan ponsel | Vlog karakter | `A wide-angle selfie shows` |

## 2. Sudut kamera

| Sudut | Efek | Frasa prompt |
|---|---|---|
| Eye level | Netral, akrab | `eye-level angle` |
| High angle | Tokoh terlihat kecil atau lemah | `high angle looking down` |
| Low angle | Tokoh terlihat kuat atau megah | `low angle looking up` |
| Bird's eye / top-down | Pola, peta, kerumunan | `top-down bird's-eye view` |
| Worm's eye | Sangat dramatis dari tanah | `worm's-eye view from the ground` |
| Dutch angle | Gelisah, aneh | `dutch angle, tilted horizon` |
| Profile | Samping tokoh | `side profile angle` |
| Rear / back view | Dari belakang (JOTA 1 sangat cocok) | `rear view from behind` |
| Three-quarter | Antara depan dan samping | `three-quarter angle` |
| Shoulder level | Sedikit di bawah mata | `shoulder-level angle` |

## 3. Gerakan kamera

| Gerakan | Penjelasan | Kapan dipakai | Frasa prompt |
|---|---|---|---|
| Static / locked-off | Kamera diam | Dialog tenang, akhir scene untuk frame sambungan | `static locked-off camera` |
| Pan | Kamera berputar kiri atau kanan di tempat | Menyapu lokasi, mengikuti tokoh lewat | `slow pan left to right` |
| Tilt | Berputar naik atau turun di tempat | Menunjukkan tinggi bangunan, dari kaki ke wajah | `slow tilt up from [x] to [y]` |
| Dolly in / push in | Kamera maju mendekat | Menambah ketegangan, masuk ke emosi. JOTA 1: hanya ke benda atau tempat, bukan ke orang; close-up dibuat sebagai KEYFRAME (`PROMPT_PROFESIONAL.md` 2F) | `slow dolly push-in toward` |
| Dolly out / pull out | Kamera mundur menjauh | Mengungkap konteks, akhir adegan | `slow dolly pull-out revealing` |
| Truck / track | Kamera bergeser sejajar subjek | Mengikuti orang berjalan dari samping | `lateral tracking shot moving left alongside` |
| Follow shot | Kamera mengikuti dari belakang | Masuk ke lokasi bersama tokoh | `follow shot from behind` |
| Leading shot | Kamera mundur di depan tokoh yang berjalan | Vlog berjalan, dialog sambil jalan | `leading shot walking backward in front of` |
| Pedestal / boom | Kamera naik atau turun lurus | Dari anak ke dewasa, dari meja ke ruangan | `camera booms up` / `camera pedestals down` |
| Crane / jib | Gerak naik turun melengkung luas | Pembuka atau penutup megah | `sweeping crane shot rising above` |
| Arc / orbit | Kamera mengitari subjek | Pindah sisi tanpa potongan, momen penting | `slow 90-degree arc around` |
| Handheld | Goyang alami | Vlog, dokumenter, panik | `subtle handheld camera sway` |
| Steadicam / gimbal | Halus mengikuti | Long take berjalan | `smooth gimbal tracking shot` |
| Zoom in / out | Lensa mendekat tanpa kamera bergerak | Gaya dokumenter atau komedi | `slow optical zoom in on` |
| Crash zoom | Zoom sangat cepat | Komedi, kejutan | `sudden crash zoom onto` |
| Dolly zoom | Dolly dan zoom berlawanan, latar "melar" | Kaget, sadar sesuatu | `dolly zoom vertigo effect on` |
| Whip pan | Pan sangat cepat sampai blur | Pindah perhatian cepat (hati-hati: frame blur tidak boleh jadi frame sambungan) | `fast whip pan to` |
| Rack focus | Fokus pindah dari depan ke belakang | Mengalihkan perhatian dalam satu shot | `rack focus from [foreground] to [background]` |
| Reveal | Kamera bergerak melewati penghalang lalu memperlihatkan | Kejutan, lokasi baru | `camera moves past [object] to reveal` |
| Drone flyover | Terbang di atas lokasi | Pembuka lanskap | `aerial drone flyover above` |
| Drone top-down | Lurus ke bawah dari udara | Pola sawah, kandang, kota | `aerial top-down drone shot` |
| Drone orbit | Mengitari dari udara | Bangunan, monumen | `aerial drone orbit around` |
| FPV drone | Terbang cepat menukik | Aksi, energi tinggi | `fast FPV drone dive through` |
| Roll | Kamera berputar pada sumbunya | Mimpi, kacau | `slow camera roll` |
| Body mount / snorricam | Kamera menempel di tubuh tokoh | Panik, mabuk, kejar | `body-mounted camera locked to [character]` |
| Slow motion | Gerak lambat | Momen emosional, aksi | `in slow motion` |
| Time-lapse | Waktu dipercepat | Matahari terbit, pertumbuhan | `time-lapse of` |
| Hyperlapse | Time-lapse sambil bergerak | Perjalanan | `hyperlapse moving through` |

Satu scene 10 detik memakai **dua sampai tiga gerakan kamera yang dimotivasi cerita**, satu per ketukan beat sheet (lihat bagian 3B). Gerakan yang tidak punya alasan cerita tetap dihindari karena bisa membuat karakter berubah atau keluar frame.

## 3B. Kamera animasi studio profesional (wajib, keputusan owner 2026-10-25)

Tujuannya: penonton merasa menonton kartun produksi studio besar. Kamera **tidak boleh datar statis sepanjang klip**. Setiap ketukan beat sheet memilih gerakan sesuai emosi, dan kecepatannya mengikuti cerita: lambat untuk hangat, sedih, kagum; cepat untuk kaget, lucu, aksi. Nama studio tidak ditulis di prompt (aturan nama merek di `STYLE_CATALOG.md`); yang ditulis adalah teknik kameranya.

| Momen cerita | Gerakan kamera | Elemen efek animasi (digambar, bukan teks) | Frasa prompt |
|---|---|---|---|
| Kaget, terkejut | Snap zoom atau crash zoom cepat ke medium close-up, kadang camera shake kecil | Garis kejut memancar, tanda kaget berupa garis-garis kecil di atas kepala, tetes keringat kartun | `sudden snap zoom in to a medium close-up with a tiny camera shake, cartoon surprise burst lines radiate around her head` |
| Senang, gembira | Bounce kecil, push-in cepat lalu melambat | Kilau bintang, percikan cahaya, hati kecil | `quick playful push-in that eases out, sparkles and tiny stars pop around them` |
| Hangat, sayang (peluk, menasihati) | Slow push-in pelan | Cahaya lembut, bokeh hangat | `very slow gentle push-in, warm soft light glow` |
| Sedih, menyesal | Slow pull-out atau crane naik pelan | Hujan kecil, warna sedikit redup | `slow pull-back revealing her small in the frame, soft blue tint` |
| Penemuan, kagum | Reveal: kamera bergerak melewati benda lalu memperlihatkan | Kilau di objek | `camera glides past the shelf to reveal the shining object, small twinkles` |
| Lucu, komedi | Whip pan cepat lalu berhenti, atau zoom cepat ke reaksi | Garis gerak, debu kartun | `fast whip pan to the reaction, cartoon speed lines` |
| Tegang, penasaran | Dolly zoom (vertigo) singkat atau push-in pelan terus | Bayangan memanjang | `short dolly zoom vertigo effect, background stretches` |
| Pindah tempat, perjalanan | Tracking samping atau leading shot mengikuti | Daun beterbangan, garis angin | `lateral tracking shot following them at walking pace` |
| Pembuka atau penutup | Crane atau drone pelan, pull-out lebar | Matahari, burung | `sweeping slow crane shot rising to a wide view` |
| Doa, momen ibadah | Slow push-in atau statis singkat dengan cahaya lembut, tanpa efek ramai | Cahaya hangat tenang | `slow reverent push-in, calm warm light, no flashy effects` |

Aturan:
1. Setiap baris beat sheet menyebut gerakan kamera dan kecepatannya, misalnya `3-5s: sudden snap zoom in as Saheela gasps...`.
2. Minimal dua jenis gerakan berbeda per klip 10 detik, kecuali adegan doa atau tenang yang sengaja pelan (tetap tidak bengong, aturan D0).
3. Elemen efek digambar sebagai bentuk kartun (garis, bintang, kilau, tetes keringat). Tidak boleh berupa tulisan atau huruf ("WOW", "!") karena AI merusak huruf.
4. Untuk momen doa, ayat, atau dzikir: kamera tenang, tanpa efek lucu, demi adab.
5. JOTA 1 (diganti v3.49): kamera tidak zoom, push in, atau snap zoom ke orang. Benchmark D4 pernah lolos satu klip zoom ke close-up, tetapi di produksi Umar S28 (SHOT04) kamera yang mendekat ke orang memunculkan wajah lengkap dan orang tambahan. Untuk momen kaget, sedih, atau kagum di JOTA 1: snap zoom atau push in ke benda yang menjadi sebab emosi, gerak tubuh dan tangan tokoh dari belakang, efek kartun (garis kejut) di sekitar tokoh tanpa mendekat, atau KEYFRAME baru berupa shot sedang dari belakang. Contoh di tabel dan pola adegan yang menyebut zoom ke tokoh atau wajah hanya berlaku untuk JOTA 2 (`PROMPT_PROFESIONAL.md` 2F poin 3).
6. Gerakan terakhir di detik 8 sampai 10 melambat supaya frame sambungan tidak buram; tokoh tetap bergerak (aturan D0).
7. **Batas v3.26:** baris tabel di atas yang melebar (slow pull-back, crane naik, tracking, whip pan, reveal) hanya dipakai di scene KEYFRAME yang memang dimulai dari gambar lebar itu, atau di OP2 dan penutup. Di dalam ruangan dan di scene SAMBUNG, ganti dengan versi yang tidak keluar dari gambar awal: sedih = slow push-in ke tokoh yang menunduk lalu kamera diam; kagum = push-in ke benda; lucu = snap zoom ke reaksi lalu kembali.

## 3C. Teknik khas animasi dan penyuntingan

| Teknik | Penjelasan | Kapan | Frasa prompt atau cara |
|---|---|---|---|
| Multiplane parallax | Lapisan depan, tengah, belakang bergeser beda kecepatan, memberi kedalaman 2D | Pembuka, perjalanan, adegan indah | `multiplane parallax camera move, foreground leaves pass faster than the background` |
| Smash zoom | Zoom sangat cepat dan tajam, lebih keras dari snap zoom | Kaget besar, komedi | `smash zoom onto her face` |
| Impact frame | Satu kilatan saat benturan, garis tebal memancar | Jatuh, tabrakan lucu | `impact flash with bold radial lines at the moment of the bump` |
| Camera shake | Getar singkat | Benturan, kaget, langkah raksasa | `brief cartoon camera shake` |
| Speed ramp | Lambat lalu cepat, atau sebaliknya | Puncak aksi, momen ajaib | `speed ramp from slow motion to normal speed` |
| Push-pull bounce | Mendekat lalu memantul sedikit mundur | Senang, lucu | `bouncy push-in that springs back slightly` |
| Shot-reverse-shot | Bergantian sudut ke pembicara A dan B | Dialog | Di lokasi yang sama (SAMBUNG): arc kecil sekitar 15 derajat atau pan pelan ke pembicara lalu kembali, di dalam gambar awal. Potongan MCU terpisah hanya kalau scene memang KEYFRAME |
| Reaction shot | Wajah atau badan pendengar bereaksi | Setelah kalimat penting atau kejutan | Di dalam klip: pan atau push-in singkat ke tokoh yang bereaksi, lalu kembali |
| Cutaway atau insert | Potongan ke benda penting | Petunjuk cerita, makanan, alat | Di dalam klip: push-in ke tangan dan benda (`slow push-in to the books in her hands`), lalu pull-out. Benda tetap sesuai Props bible |
| Follow dari depan | Kamera mundur di depan tokoh berjalan | Dialog sambil jalan | `leading shot walking backward in front of them` |
| Focus pull | Fokus pindah antar tokoh | Giliran bicara dalam satu frame | `focus pull from Saheela to Ummi as Ummi speaks` |
| Light leak dan kilau lensa | Cahaya hangat masuk frame | Pagi, momen haru | `soft warm light leak and gentle lens flare` |
| Transisi editor | Fade, dissolve, wipe di editor VideoExpress (klik kanan klip > Transition) | Pindah waktu atau tempat antar scene, pembuka dan penutup | Ditambahkan saat rakit, bukan di prompt. Jangan dipakai untuk menutupi sambungan yang jelek |

## 4. Lensa dan fokus

| Lensa | Efek | Frasa prompt |
|---|---|---|
| Ultra wide 14-18mm | Ruang terasa luas, tepi melengkung | `14mm ultra-wide lens` |
| Wide 24mm | Lingkungan banyak, vlog | `24mm wide lens` |
| Normal 35mm | Natural, dokumenter | `35mm lens` |
| Standard 50mm | Mirip mata manusia | `50mm lens` |
| Portrait 85mm | Wajah indah, latar blur | `85mm portrait lens, shallow depth of field` |
| Telephoto 135-200mm | Latar dipadatkan, mengintip | `telephoto lens, compressed background` |
| Macro | Detail sangat dekat | `macro lens extreme detail` |
| Depth of field dangkal | Subjek tajam, latar blur | `shallow depth of field, creamy bokeh` |
| Deep focus | Semua tajam | `deep focus, everything sharp` |
| Anamorphic | Kesan film bioskop | `anamorphic lens, horizontal lens flares` |

## 5. Aturan komposisi dan kontinuitas

| Aturan | Isi | Penerapan di JOTA |
|---|---|---|
| Rule of thirds | Subjek di garis sepertiga | Tulis posisi tokoh: `subject on the left third` |
| Garis 180 derajat | Kamera tetap di satu sisi garis antar tokoh | Tokoh kiri tetap kiri di semua scene; ganti sisi hanya lewat arc yang terlihat |
| Aturan 30 derajat | Pergantian sudut minimal 30 derajat agar tidak terasa lompat | Berlaku saat sekuens baru |
| Eyeline match | Arah pandang konsisten | Tulis arah pandang di setiap scene |
| Lead room / nose room | Ruang kosong di arah tokoh menghadap atau berjalan | `with space ahead of her in the direction she walks` |
| Headroom | Jarak kepala ke tepi atas | Jaga sama antar scene |
| Leading lines | Garis lingkungan mengarah ke subjek | Pagar, jalan, pematang |
| Frame within frame | Tokoh dibingkai pintu atau jendela | Pembuka dramatis |
| Motivated movement | Kamera bergerak karena ada alasan (tokoh berjalan, sesuatu muncul) | Setiap gerakan kamera punya alasan di cerita |

## 6. Pola adegan siap pakai

| Jenis adegan | Urutan dalam satu sekuens (dibagi per scene 10 detik) |
|---|---|
| Pembuka cerita | EWS drone flyover → crane turun ke WS lokasi → follow shot tokoh masuk |
| Vlog karakter | Selfie MCU statis menyapa → leading shot berjalan → selfie berhenti menunjukkan objek → push in kecil ke objek |
| Dialog dua tokoh (JOTA 2) | Two-shot medium → arc kecil sekitar 15 derajat ke sisi pembicara → push in ke MCU saat kalimat penting |
| Dialog dua tokoh (JOTA 1 S28) | Two-shot tiga perempat dari belakang, kamera diam atau bergeser menyamping pelan → pembicara memberi gerak tangan saat kalimat penting → push in kecil ke benda yang dibicarakan (bukan ke tokoh, v3.49) |
| Kejutan atau penemuan | Follow shot → tokoh berhenti → dolly zoom atau push in cepat → reveal ke objek |
| Aksi atau kejar | Tracking samping cepat → FPV atau handheld → slow motion di puncak aksi → statis setelah aksi |
| Sedih atau renungan | Wide statis → slow pull out → crane naik perlahan |
| Penjelasan atau edukasi | Statis medium → push in ke insert benda → pull out kembali ke medium |
| Penutup | Pull out lambat → crane naik → EWS dengan langit, lalu layar menjadi gelap untuk kredit |

## 7. Cara menulis kamera: blok KAMERA

Sejak v3.25 kamera tidak lagi diselipkan di ADEGAN, tapi ditulis di blok `KAMERA` tersendiri. Format wajib dan aturannya: `CONSISTENCY_RULES.md` bagian 7. Setiap gerakan punya lima unsur: jenis, arah, kecepatan, framing awal ke framing akhir, dan alasan.

Pola satu baris gerakan: `[detik]: [gerakan] [arah] at a [kecepatan] speed, from [framing awal] to [framing akhir], because [motivasi].`

Contoh: `Medium close-up, eye-level angle, 24mm wide lens, slow leading shot walking backward in front of her at walking pace as she moves along the fence, ending with the camera coming to a complete stop.`

Akhir setiap scene: kamera melambat di 1 sampai 2 detik terakhir, tapi tokoh tetap melakukan aksi lanjutan pelan (aturan tanpa bengong, `SCENE_WORKFLOW.md` D0). Frame sambungan diambil dari bagian gerak pelan ini.
