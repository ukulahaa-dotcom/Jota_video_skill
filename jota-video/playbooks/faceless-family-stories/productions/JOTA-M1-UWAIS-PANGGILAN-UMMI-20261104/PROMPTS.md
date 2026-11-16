# JOTA PILOT EPISODE — UWAIS MENJAWAB PANGGILAN UMMI

> **Status:** DISETUJUI OWNER UNTUK PRODUKSI; pengiriman via Runner diaktifkan lewat shots.json. Status video dan delivery belum terverifikasi. Hasil belum boleh menjadi aturan resmi tanpa persetujuan owner.
>
> Repo sumber: `ohan78/Jota_Content_Factory` → `skills/jota-video/SKILL.md` **v3.80.0**, `characters/tokoh.json`, `characters/suara.json`, H02E (format pembanding).

## Keputusan Pilot

- **Project:** `JOTA-M1-UWAIS-PANGGILAN-UMMI-20261104`; **tag:** `UWUMMI04`.
- **Format:** YouTube Shorts/Reels vertikal 9:16, 60 detik, enam shot 10 detik, high-end stylized **3D** (menyamakan gaya acuan seri Uwais).
- **Playbook:** PB01 Faceless Family Stories. Cerita fiksi keluarga, bukan kisah sejarah.
- **Tokoh:** Uwais (15 tahun), Ummi (37 tahun); **tidak pernah satu frame**. Shot Uwais memakai `Uwais_soleh` dan shot Ummi memakai `Ummi` dari Media Library `Serial Uwais youtube`.
- **Sumber hikmah:** QS. Al-Isra ayat 23, tentang berbuat baik dan berkata mulia kepada orang tua. Ini tidak menyatakan bahwa dialog tokoh adalah hadis.
- **Cerita:** Uwais ingin menyelesaikan bacaannya. Ketika Ummi memanggil makan, ia menjawab dengan santun, menutup satu buku dengan hati-hati, lalu datang kepada Ummi.
- **Satu hikmah:** `Jawab panggilan orang tua dengan santun, lalu tindak lanjuti dengan perbuatan baik.`
- **Kamera:** static/very subtle move. Kepala tegak, maksimal quarter turn, wajah polos 3/4 terpapar cahaya; tanpa pose tidur/menunduk/profil penuh.
- **Suara:** dialog ElevenLabs `eleven_v3` sesuai `characters/suara.json`: Uwais = `JOTA Alif`, Ummi = `JOTA Putri Maharani - Neutral and WItty`, Narator = `JOTA Kang Nandar`. VideoExpress tidak membuat suara manusia, tidak ada lipsync. Semua soundscape adalah ambiens dan Foley non-musik.
- **QC:** pre-generation only. **Tidak ada QC video otomatis**, tidak ada regenerasi otomatis, dan tidak ada publish otomatis. Owner menilai kelayakan hasil.

## Storyboard 60 detik

| Shot | Waktu | Tokoh di layar | Gambar awal | Aksi utama | Suara |
|---|---|---|---|---|---|
| SHOT01 | 00–10s | UWAIS | BARU + Consistent Character | Hook: satu halaman lagi | [thoughtful] Wah, tinggal satu halaman lagi. |
| SHOT02 | 10–20s | UMMI | BARU + Consistent Character | Ummi memanggil dari pintu | [gentle] Uwais, makanannya sudah siap. Sini dulu, Nak. |
| SHOT03 | 20–30s | UWAIS | BARU + Consistent Character | Uwais mendengar dan menjawab | [warm] Iya, Ummi. Aku simpan buku dulu, ya. |
| SHOT04 | 30–40s | UWAIS | BARU + Consistent Character | Buku ditutup dengan benar | Hanya ambience & Foley |
| SHOT05 | 40–50s | UWAIS | BARU + Consistent Character | Uwais bangkit dan menuju Ummi | Hanya ambience & Foley |
| SHOT06 | 50–60s | UMMI | BARU + Consistent Character | Hikmah: menjawab dengan santun | [calm] Hikmahnya: jawab orang tua dengan santun. Tunjukkan bakti melalui kebaikan kecil setiap hari. |


## Character & Object Bible

### UWAIS

`faceless 15-year-old Indonesian Muslim boy, the eldest child, a beardless teenager, 160 cm tall, very slim and lanky (50 kg), as tall as Ummi, warm sawo-matang brown skin, short black hair that is wavy and leaning curly (loose waves and soft curls), warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth. No glasses.`

### UMMI

`faceless 37-year-old Indonesian Muslim mother, 160 cm tall (56 kg), warm sawo-matang brown skin, long black khimar hijab covering hair, neck, chest and arms down to the hips, long loose dusty salmon-pink skirt to the ankles, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth.`

### Properti tunggal

OBJECT_001: exactly one medium-sized dark-blue hardcover book with plain unmarked cover and cream pages; it rests on exactly one wooden slanted reading stand on the left table. No duplicate books. The book retains its exact size, color, thickness, material and location except for the explicit closing action in SHOT04.

### Peta lokasi

A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.

### Konsistensi & Rule Kandidat

1. Setiap shot **berorang** memakai `BARU` + foto acuan Media Library + `Consistent Character`: **bukan** `LAST_FRAME`, mengikuti pengecualian serial foto-acuan `SKILL.md v3.80.0`.
2. Hanya **satu orang** pada setiap shot; Ummi dan Uwais bergantian sebagai subjek, tanpa dua referensi sekaligus.
3. Buku tetap **satu** dengan desain konstan. Buku open pada SHOT01/03, ditutup hanya SHOT04, tetap closed pada SHOT05. Buku di luar frame ketika Ummi terlihat—bukan menghilang.
4. Tidak meminta ekspresi wajah, lip-sync, dialog native, gerakan kepala besar, atau pose yang mendorong timbulnya fitur wajah.
5. Teks hikmah/ayat ditambahkan lewat editor, **bukan** digambar oleh VideoExpress. Ucapan agama adalah paraphrase editorial yang merujuk ayat terverifikasi.
6. Dalam VideoExpress, `Image Type: 3d`, `Enhance Image/Video Prompt: OFF`, `Gallery: OFF`, `Manual Video Length: 10`, `9:16`.

## Buku Keadaan antarshot

| Shot | Awal | Akhir |
|---|---|---|
| 01 | Uwais duduk, buku biru terbuka | Uwais masih duduk, buku tetap terbuka |
| 02 | Ummi berdiri sendiri di pintu | Ummi tetap berdiri, tangan turun |
| 03 | Uwais duduk, buku terbuka | Uwais menghadap sedikit ke arah suara, buku terbuka |
| 04 | Uwais duduk, buku terbuka | Uwais duduk, buku biru tertutup di stand |
| 05 | Uwais duduk, buku tertutup | Uwais berdiri dekat pintu, buku tetap tertutup |
| 06 | Ummi berdiri sendiri di pintu | Ummi di pintu, framing akhir untuk teks hikmah |

## Prompt Lengkap Per Shot

Semua teks di bawah adalah **draf prompt yang dapat ditinjau**; `shots.json` mengandung teks yang sama secara verbatim. Untuk setiap shot berorang, foto acuan dipilih dari folder `Serial Uwais youtube` dengan `Consistent Character: ON`.

### SHOT01 — Hook: satu halaman lagi

**Voice (ElevenLabs):** UWAIS.  **Dialog:** [thoughtful] Wah, tinggal satu halaman lagi.

**Image Prompt**

```text
MANDATORY RULES:
FACELESS: Faceless 3D animated film image. STRICT FACELESS CHARACTER DESIGN RULE: every human has one continuous smooth blank natural skin-toned facial surface from forehead to chin, with absolutely no eyes, eyebrows, nose, nostrils, lips, mouth or facial details. The side profile remains smooth and featureless.
NATURAL POSE: A relaxed, upright, anatomically credible pose with ordinary hand shape and five fingers per hand. The full blank face stays uncovered and evenly lit at a front three-quarter angle.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
SCENE: Uwais is seated upright beside the reading stand, calmly reading the single OPEN dark-blue book with his hands relaxed on the table.
CAMERA: Stable medium-wide eye-level front three-quarter shot, camera static, room doorway remains visible on screen right.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
CHARACTER LOCK: UWAIS: faceless 15-year-old Indonesian Muslim boy, the eldest child, a beardless teenager, 160 cm tall, very slim and lanky (50 kg), as tall as Ummi, warm sawo-matang brown skin, short black hair that is wavy and leaning curly (loose waves and soft curls), warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth. No glasses.
OBJECT_001: exactly one medium-sized dark-blue hardcover book with plain unmarked cover and cream pages; it rests on exactly one wooden slanted reading stand on the left table. No duplicate books. The book retains its exact size, color, thickness, material and location except for the explicit closing action in SHOT04. The book is currently OPEN.
COMPOSITION: Vertical 9:16, naturally framed medium or medium-wide, one clearly identifiable character only, stable visual style and consistent source lighting.
AVOID (NEGATIVES): Any face details, multiple copies of people or props, hair or clothing changes, added person, unreadable extra props, visible text or logos.
```

**Video and Audio Prompt**

```text
SHOT01: Hook: satu halaman lagi
MANDATORY RULES:
FACELESS: One smooth blank skin-toned facial surface remains completely featureless in every frame, with no eyes, eyebrows, nose or mouth. No lip movement.
NATURAL MOTION: All body actions are physically plausible, slow and purposeful. Only small quarter head turns while the blank facial surface stays visible to the camera. Feet contact the ground; hands and objects retain their natural shapes.
ACTION CLARITY: Only the specified small actions occur; no random gestures, repeated waving, spinning, fidgeting or unexplained movements.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
OPENING STATE: Uwais is seated upright beside the reading stand, calmly reading the single OPEN dark-blue book with his hands relaxed on the table.
ACTION: Uwais remains seated upright with a relaxed posture, the book resting open on the tilted reading stand. He briefly raises his right hand near the book without touching or moving it. He gently rests that hand back on the tabletop, with the book still open.
CAMERA: Stable medium-wide eye-level front three-quarter shot, camera static, room doorway remains visible on screen right.
LIGHT: Soft consistent late-afternoon daylight enters from the window on screen left; gentle warm color grading; shadows retain the same direction.
SOUND: Quiet late-afternoon living room; distant birds from the window and a faint breeze. Only realistic location ambience, natural Foley and room acoustics are heard. NO HUMAN VOICES in the generated video: all character dialogue and narration are added separately in ElevenLabs. ABSOLUTELY NO MUSIC: no background score, melody, instruments, rhythmic tones or singing.
END STATE: Uwais remains seated upright; the single dark-blue book stays open on the same wooden reading stand.
CONSISTENCY LOCK:
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
UWAIS: faceless 15-year-old Indonesian Muslim boy, the eldest child, a beardless teenager, 160 cm tall, very slim and lanky (50 kg), as tall as Ummi, warm sawo-matang brown skin, short black hair that is wavy and leaning curly (loose waves and soft curls), warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth. No glasses.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
OBJECT_001: exactly one medium-sized dark-blue hardcover book with plain unmarked cover and cream pages; it rests on exactly one wooden slanted reading stand on the left table. No duplicate books. The book retains its exact size, color, thickness, material and location except for the explicit closing action in SHOT04. The book is currently OPEN.
AVOID (NEGATIVES): Eyes, nose, mouth, lip movement, talking animation, duplicated people, duplicated or morphing objects, object teleportation, unnatural walking, robotic gestures, camera cuts, extra faces, added props, text or logos, music of any kind.
```

**Foley:** soft sleeve fabric brushing the wooden tabletop once.

### SHOT02 — Ummi memanggil dari pintu

**Voice (ElevenLabs):** UMMI.  **Dialog:** [gentle] Uwais, makanannya sudah siap. Sini dulu, Nak.

**Image Prompt**

```text
MANDATORY RULES:
FACELESS: Faceless 3D animated film image. STRICT FACELESS CHARACTER DESIGN RULE: every human has one continuous smooth blank natural skin-toned facial surface from forehead to chin, with absolutely no eyes, eyebrows, nose, nostrils, lips, mouth or facial details. The side profile remains smooth and featureless.
NATURAL POSE: A relaxed, upright, anatomically credible pose with ordinary hand shape and five fingers per hand. The full blank face stays uncovered and evenly lit at a front three-quarter angle.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
SCENE: Ummi stands in the familiar doorway on screen right, alone and facing toward Uwais beyond the left edge of the frame.
CAMERA: Static eye-level medium shot from the living room toward the right doorway; a subtle slow push-in is allowed, ending in the same three-quarter view.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
CHARACTER LOCK: UMMI: faceless 37-year-old Indonesian Muslim mother, 160 cm tall (56 kg), warm sawo-matang brown skin, long black khimar hijab covering hair, neck, chest and arms down to the hips, long loose dusty salmon-pink skirt to the ankles, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth.
OBJECT REGISTRY: no moving handheld objects in this shot; no unexplained props appear.
COMPOSITION: Vertical 9:16, naturally framed medium or medium-wide, one clearly identifiable character only, stable visual style and consistent source lighting.
AVOID (NEGATIVES): Any face details, multiple copies of people or props, hair or clothing changes, added person, unreadable extra props, visible text or logos.
```

**Video and Audio Prompt**

```text
SHOT02: Ummi memanggil dari pintu
MANDATORY RULES:
FACELESS: One smooth blank skin-toned facial surface remains completely featureless in every frame, with no eyes, eyebrows, nose or mouth. No lip movement.
NATURAL MOTION: All body actions are physically plausible, slow and purposeful. Only small quarter head turns while the blank facial surface stays visible to the camera. Feet contact the ground; hands and objects retain their natural shapes.
ACTION CLARITY: Only the specified small actions occur; no random gestures, repeated waving, spinning, fidgeting or unexplained movements.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
OPENING STATE: Ummi stands in the familiar doorway on screen right, alone and facing toward Uwais beyond the left edge of the frame.
ACTION: Ummi stands calmly at the doorway with upright posture. She makes one small inviting open-palm gesture with her right hand. Her hand returns to rest naturally at her side.
CAMERA: Static eye-level medium shot from the living room toward the right doorway; a subtle slow push-in is allowed, ending in the same three-quarter view.
LIGHT: Soft consistent late-afternoon daylight enters from the window on screen left; gentle warm color grading; shadows retain the same direction.
SOUND: Quiet family room; one distant bird call outside. Only realistic location ambience, natural Foley and room acoustics are heard. NO HUMAN VOICES in the generated video: all character dialogue and narration are added separately in ElevenLabs. ABSOLUTELY NO MUSIC: no background score, melody, instruments, rhythmic tones or singing.
END STATE: Ummi remains standing in the doorway, hands relaxed, the doorway unchanged.
CONSISTENCY LOCK:
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
UMMI: faceless 37-year-old Indonesian Muslim mother, 160 cm tall (56 kg), warm sawo-matang brown skin, long black khimar hijab covering hair, neck, chest and arms down to the hips, long loose dusty salmon-pink skirt to the ankles, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
OBJECT REGISTRY: no moving handheld objects in this shot; no unexplained props appear.
AVOID (NEGATIVES): Eyes, nose, mouth, lip movement, talking animation, duplicated people, duplicated or morphing objects, object teleportation, unnatural walking, robotic gestures, camera cuts, extra faces, added props, text or logos, music of any kind.
```

**Foley:** a subtle rustle of long skirt fabric.

### SHOT03 — Uwais mendengar dan menjawab

**Voice (ElevenLabs):** UWAIS.  **Dialog:** [warm] Iya, Ummi. Aku simpan buku dulu, ya.

**Image Prompt**

```text
MANDATORY RULES:
FACELESS: Faceless 3D animated film image. STRICT FACELESS CHARACTER DESIGN RULE: every human has one continuous smooth blank natural skin-toned facial surface from forehead to chin, with absolutely no eyes, eyebrows, nose, nostrils, lips, mouth or facial details. The side profile remains smooth and featureless.
NATURAL POSE: A relaxed, upright, anatomically credible pose with ordinary hand shape and five fingers per hand. The full blank face stays uncovered and evenly lit at a front three-quarter angle.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
SCENE: Uwais sits beside the same one OPEN blue book, recognizes Ummi’s call from the doorway to his right.
CAMERA: Stable medium shot from the same front three-quarter camera side, a minimal gentle push-in, keeping the reading stand visible.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
CHARACTER LOCK: UWAIS: faceless 15-year-old Indonesian Muslim boy, the eldest child, a beardless teenager, 160 cm tall, very slim and lanky (50 kg), as tall as Ummi, warm sawo-matang brown skin, short black hair that is wavy and leaning curly (loose waves and soft curls), warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth. No glasses.
OBJECT_001: exactly one medium-sized dark-blue hardcover book with plain unmarked cover and cream pages; it rests on exactly one wooden slanted reading stand on the left table. No duplicate books. The book retains its exact size, color, thickness, material and location except for the explicit closing action in SHOT04. The book is currently OPEN.
COMPOSITION: Vertical 9:16, naturally framed medium or medium-wide, one clearly identifiable character only, stable visual style and consistent source lighting.
AVOID (NEGATIVES): Any face details, multiple copies of people or props, hair or clothing changes, added person, unreadable extra props, visible text or logos.
```

**Video and Audio Prompt**

```text
SHOT03: Uwais mendengar dan menjawab
MANDATORY RULES:
FACELESS: One smooth blank skin-toned facial surface remains completely featureless in every frame, with no eyes, eyebrows, nose or mouth. No lip movement.
NATURAL MOTION: All body actions are physically plausible, slow and purposeful. Only small quarter head turns while the blank facial surface stays visible to the camera. Feet contact the ground; hands and objects retain their natural shapes.
ACTION CLARITY: Only the specified small actions occur; no random gestures, repeated waving, spinning, fidgeting or unexplained movements.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
OPENING STATE: Uwais sits beside the same one OPEN blue book, recognizes Ummi’s call from the doorway to his right.
ACTION: Uwais pauses his reading while the book stays completely still on the stand. He shifts his shoulders and turns his upright head only a quarter-turn toward the doorway on his right, maintaining a visible blank three-quarter facial surface. He gives a small natural nod, with both hands resting on the tabletop.
CAMERA: Stable medium shot from the same front three-quarter camera side, a minimal gentle push-in, keeping the reading stand visible.
LIGHT: Soft consistent late-afternoon daylight enters from the window on screen left; gentle warm color grading; shadows retain the same direction.
SOUND: Same quiet room tone with occasional bird sound from the left window. Only realistic location ambience, natural Foley and room acoustics are heard. NO HUMAN VOICES in the generated video: all character dialogue and narration are added separately in ElevenLabs. ABSOLUTELY NO MUSIC: no background score, melody, instruments, rhythmic tones or singing.
END STATE: Uwais remains seated and turns his body slightly toward the right doorway; the book remains open and untouched.
CONSISTENCY LOCK:
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
UWAIS: faceless 15-year-old Indonesian Muslim boy, the eldest child, a beardless teenager, 160 cm tall, very slim and lanky (50 kg), as tall as Ummi, warm sawo-matang brown skin, short black hair that is wavy and leaning curly (loose waves and soft curls), warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth. No glasses.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
OBJECT_001: exactly one medium-sized dark-blue hardcover book with plain unmarked cover and cream pages; it rests on exactly one wooden slanted reading stand on the left table. No duplicate books. The book retains its exact size, color, thickness, material and location except for the explicit closing action in SHOT04. The book is currently OPEN.
AVOID (NEGATIVES): Eyes, nose, mouth, lip movement, talking animation, duplicated people, duplicated or morphing objects, object teleportation, unnatural walking, robotic gestures, camera cuts, extra faces, added props, text or logos, music of any kind.
```

**Foley:** one soft shirt fabric rustle as shoulders turn.

### SHOT04 — Buku ditutup dengan benar

**Voice (ElevenLabs):** Tidak ada, ambience & Foley saja.  **Dialog:** —

**Image Prompt**

```text
MANDATORY RULES:
FACELESS: Faceless 3D animated film image. STRICT FACELESS CHARACTER DESIGN RULE: every human has one continuous smooth blank natural skin-toned facial surface from forehead to chin, with absolutely no eyes, eyebrows, nose, nostrils, lips, mouth or facial details. The side profile remains smooth and featureless.
NATURAL POSE: A relaxed, upright, anatomically credible pose with ordinary hand shape and five fingers per hand. The full blank face stays uncovered and evenly lit at a front three-quarter angle.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
SCENE: Uwais carefully closes exactly one open dark-blue book resting on the single tilted wooden reading stand.
CAMERA: Static medium-wide front three-quarter shot including Uwais’s upper torso, hand, the complete book and stand throughout the action.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
CHARACTER LOCK: UWAIS: faceless 15-year-old Indonesian Muslim boy, the eldest child, a beardless teenager, 160 cm tall, very slim and lanky (50 kg), as tall as Ummi, warm sawo-matang brown skin, short black hair that is wavy and leaning curly (loose waves and soft curls), warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth. No glasses.
OBJECT_001: exactly one medium-sized dark-blue hardcover book with plain unmarked cover and cream pages; it rests on exactly one wooden slanted reading stand on the left table. No duplicate books. The book retains its exact size, color, thickness, material and location except for the explicit closing action in SHOT04. The book starts OPEN and finishes CLOSED in this shot.
COMPOSITION: Vertical 9:16, naturally framed medium or medium-wide, one clearly identifiable character only, stable visual style and consistent source lighting.
AVOID (NEGATIVES): Any face details, multiple copies of people or props, hair or clothing changes, added person, unreadable extra props, visible text or logos.
```

**Video and Audio Prompt**

```text
SHOT04: Buku ditutup dengan benar
MANDATORY RULES:
FACELESS: One smooth blank skin-toned facial surface remains completely featureless in every frame, with no eyes, eyebrows, nose or mouth. No lip movement.
NATURAL MOTION: All body actions are physically plausible, slow and purposeful. Only small quarter head turns while the blank facial surface stays visible to the camera. Feet contact the ground; hands and objects retain their natural shapes.
ACTION CLARITY: Only the specified small actions occur; no random gestures, repeated waving, spinning, fidgeting or unexplained movements.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
OPENING STATE: Uwais carefully closes exactly one open dark-blue book resting on the single tilted wooden reading stand.
ACTION: Uwais stays seated upright, keeping his face in a front three-quarter view. His right hand makes clear contact with the top edge of the single book cover and slowly closes the open book without lifting it from the reading stand. He releases the book, which remains closed and motionless on the same stand.
CAMERA: Static medium-wide front three-quarter shot including Uwais’s upper torso, hand, the complete book and stand throughout the action.
LIGHT: Soft consistent late-afternoon daylight enters from the window on screen left; gentle warm color grading; shadows retain the same direction.
SOUND: The same quiet living room with faint birds outside. Only realistic location ambience, natural Foley and room acoustics are heard. NO HUMAN VOICES in the generated video: all character dialogue and narration are added separately in ElevenLabs. ABSOLUTELY NO MUSIC: no background score, melody, instruments, rhythmic tones or singing.
END STATE: Exactly one dark-blue book is now CLOSED on the wooden reading stand; Uwais’s right hand has released it and rests beside the stand.
CONSISTENCY LOCK:
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
UWAIS: faceless 15-year-old Indonesian Muslim boy, the eldest child, a beardless teenager, 160 cm tall, very slim and lanky (50 kg), as tall as Ummi, warm sawo-matang brown skin, short black hair that is wavy and leaning curly (loose waves and soft curls), warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth. No glasses.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
OBJECT_001: exactly one medium-sized dark-blue hardcover book with plain unmarked cover and cream pages; it rests on exactly one wooden slanted reading stand on the left table. No duplicate books. The book retains its exact size, color, thickness, material and location except for the explicit closing action in SHOT04. The book is currently OPEN.
AVOID (NEGATIVES): Eyes, nose, mouth, lip movement, talking animation, duplicated people, duplicated or morphing objects, object teleportation, unnatural walking, robotic gestures, camera cuts, extra faces, added props, text or logos, music of any kind.
```

**Foley:** soft hardcover book gently closing, single paper-and-cover sound, a soft fingertip leaving the book cover.

### SHOT05 — Uwais bangkit dan menuju Ummi

**Voice (ElevenLabs):** Tidak ada, ambience & Foley saja.  **Dialog:** —

**Image Prompt**

```text
MANDATORY RULES:
FACELESS: Faceless 3D animated film image. STRICT FACELESS CHARACTER DESIGN RULE: every human has one continuous smooth blank natural skin-toned facial surface from forehead to chin, with absolutely no eyes, eyebrows, nose, nostrils, lips, mouth or facial details. The side profile remains smooth and featureless.
NATURAL POSE: A relaxed, upright, anatomically credible pose with ordinary hand shape and five fingers per hand. The full blank face stays uncovered and evenly lit at a front three-quarter angle.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
SCENE: Uwais starts seated upright by the same table; the same book is already closed on the reading stand. The right-hand doorway is his destination.
CAMERA: Stable medium-wide eye-level three-quarter shot with a very gentle lateral follow toward the right; do not orbit or cross the room axis.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
CHARACTER LOCK: UWAIS: faceless 15-year-old Indonesian Muslim boy, the eldest child, a beardless teenager, 160 cm tall, very slim and lanky (50 kg), as tall as Ummi, warm sawo-matang brown skin, short black hair that is wavy and leaning curly (loose waves and soft curls), warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth. No glasses.
OBJECT_001: exactly one medium-sized dark-blue hardcover book with plain unmarked cover and cream pages; it rests on exactly one wooden slanted reading stand on the left table. No duplicate books. The book retains its exact size, color, thickness, material and location except for the explicit closing action in SHOT04. The book is currently CLOSED.
COMPOSITION: Vertical 9:16, naturally framed medium or medium-wide, one clearly identifiable character only, stable visual style and consistent source lighting.
AVOID (NEGATIVES): Any face details, multiple copies of people or props, hair or clothing changes, added person, unreadable extra props, visible text or logos.
```

**Video and Audio Prompt**

```text
SHOT05: Uwais bangkit dan menuju Ummi
MANDATORY RULES:
FACELESS: One smooth blank skin-toned facial surface remains completely featureless in every frame, with no eyes, eyebrows, nose or mouth. No lip movement.
NATURAL MOTION: All body actions are physically plausible, slow and purposeful. Only small quarter head turns while the blank facial surface stays visible to the camera. Feet contact the ground; hands and objects retain their natural shapes.
ACTION CLARITY: Only the specified small actions occur; no random gestures, repeated waving, spinning, fidgeting or unexplained movements.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
OPENING STATE: Uwais starts seated upright by the same table; the same book is already closed on the reading stand. The right-hand doorway is his destination.
ACTION: Uwais pushes his chair back a little and stands up at a natural pace. He takes two gentle forward steps diagonally toward the right doorway, moving head-first with full foot contact, never walking backward. He stops near the doorway in a front three-quarter body position, still visible from the camera side.
CAMERA: Stable medium-wide eye-level three-quarter shot with a very gentle lateral follow toward the right; do not orbit or cross the room axis.
LIGHT: Soft consistent late-afternoon daylight enters from the window on screen left; gentle warm color grading; shadows retain the same direction.
SOUND: Quiet living room, distant birds and faint indoor room tone. Only realistic location ambience, natural Foley and room acoustics are heard. NO HUMAN VOICES in the generated video: all character dialogue and narration are added separately in ElevenLabs. ABSOLUTELY NO MUSIC: no background score, melody, instruments, rhythmic tones or singing.
END STATE: Uwais stands near the right doorway, body three-quarter to camera; exactly one closed blue book remains on the reading stand on the left.
CONSISTENCY LOCK:
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
UWAIS: faceless 15-year-old Indonesian Muslim boy, the eldest child, a beardless teenager, 160 cm tall, very slim and lanky (50 kg), as tall as Ummi, warm sawo-matang brown skin, short black hair that is wavy and leaning curly (loose waves and soft curls), warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth. No glasses.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
OBJECT_001: exactly one medium-sized dark-blue hardcover book with plain unmarked cover and cream pages; it rests on exactly one wooden slanted reading stand on the left table. No duplicate books. The book retains its exact size, color, thickness, material and location except for the explicit closing action in SHOT04. The book is currently CLOSED.
AVOID (NEGATIVES): Eyes, nose, mouth, lip movement, talking animation, duplicated people, duplicated or morphing objects, object teleportation, unnatural walking, robotic gestures, camera cuts, extra faces, added props, text or logos, music of any kind.
```

**Foley:** one soft wooden chair shift on tiled floor, two natural rubber-soled sneaker steps on indoor tile.

### SHOT06 — Hikmah: menjawab dengan santun

**Voice (ElevenLabs):** NARATOR.  **Dialog:** [calm] Hikmahnya: jawab orang tua dengan santun. Tunjukkan bakti melalui kebaikan kecil setiap hari.

**Image Prompt**

```text
MANDATORY RULES:
FACELESS: Faceless 3D animated film image. STRICT FACELESS CHARACTER DESIGN RULE: every human has one continuous smooth blank natural skin-toned facial surface from forehead to chin, with absolutely no eyes, eyebrows, nose, nostrils, lips, mouth or facial details. The side profile remains smooth and featureless.
NATURAL POSE: A relaxed, upright, anatomically credible pose with ordinary hand shape and five fingers per hand. The full blank face stays uncovered and evenly lit at a front three-quarter angle.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
SCENE: Ummi stands alone in the same right-hand doorway, calmly welcoming Uwais who approaches from off camera.
CAMERA: Static warm medium shot of Ummi at the same doorway, very gentle slow dolly out for the final composition.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
CHARACTER LOCK: UMMI: faceless 37-year-old Indonesian Muslim mother, 160 cm tall (56 kg), warm sawo-matang brown skin, long black khimar hijab covering hair, neck, chest and arms down to the hips, long loose dusty salmon-pink skirt to the ankles, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth.
OBJECT REGISTRY: no moving handheld objects in this shot; no unexplained props appear.
COMPOSITION: Vertical 9:16, naturally framed medium or medium-wide, one clearly identifiable character only, stable visual style and consistent source lighting.
AVOID (NEGATIVES): Any face details, multiple copies of people or props, hair or clothing changes, added person, unreadable extra props, visible text or logos.
```

**Video and Audio Prompt**

```text
SHOT06: Hikmah: menjawab dengan santun
MANDATORY RULES:
FACELESS: One smooth blank skin-toned facial surface remains completely featureless in every frame, with no eyes, eyebrows, nose or mouth. No lip movement.
NATURAL MOTION: All body actions are physically plausible, slow and purposeful. Only small quarter head turns while the blank facial surface stays visible to the camera. Feet contact the ground; hands and objects retain their natural shapes.
ACTION CLARITY: Only the specified small actions occur; no random gestures, repeated waving, spinning, fidgeting or unexplained movements.
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
OPENING STATE: Ummi stands alone in the same right-hand doorway, calmly welcoming Uwais who approaches from off camera.
ACTION: Ummi stands calmly in a front three-quarter view by the doorway. She makes one small welcoming movement with her open hand toward the off-camera Uwais. She relaxes into a stable upright posture as the scene ends.
CAMERA: Static warm medium shot of Ummi at the same doorway, very gentle slow dolly out for the final composition.
LIGHT: Soft consistent late-afternoon daylight enters from the window on screen left; gentle warm color grading; shadows retain the same direction.
SOUND: Quiet room tone, soft birds at a distance, no sustained hum. Only realistic location ambience, natural Foley and room acoustics are heard. NO HUMAN VOICES in the generated video: all character dialogue and narration are added separately in ElevenLabs. ABSOLUTELY NO MUSIC: no background score, melody, instruments, rhythmic tones or singing.
END STATE: Ummi remains at the doorway, relaxed; framing settles on a clean ending suitable for an editor-added lesson caption.
CONSISTENCY LOCK:
STYLE: High-end stylized 3D animated family film, warm cinematic natural daylight, soft appealing proportions, stable detailed natural hair texture, realistic fabric folds, consistent warm color grading.
UMMI: faceless 37-year-old Indonesian Muslim mother, 160 cm tall (56 kg), warm sawo-matang brown skin, long black khimar hijab covering hair, neck, chest and arms down to the hips, long loose dusty salmon-pink skirt to the ankles, completely smooth blank featureless face with no eyes, no eyebrows, no nose, no mouth.
LAYOUT: A modest Indonesian family living room in late afternoon. A light wooden table with one tilted reading stand with a bottom ledge and one simple wooden chair is on screen left, an open doorway leading toward the dining area is on screen right, a warm cream wall behind, a small window on the left with soft afternoon daylight. Furniture, door placement and light direction remain unchanged in all shots.
OBJECT REGISTRY: no moving handheld objects in this shot; no unexplained props appear.
AVOID (NEGATIVES): Eyes, nose, mouth, lip movement, talking animation, duplicated people, duplicated or morphing objects, object teleportation, unnatural walking, robotic gestures, camera cuts, extra faces, added props, text or logos, music of any kind.
```

**Foley:** a very soft fabric movement as Ummi lowers her hand.

## Status & Ketentuan Promosi Aturan

- `PROMPT_QC`: rancangan sudah dicek secara logika dasar; ini **bukan hasil dari validator Runner**.
- `RUNNER_PLAN`: belum dijalankan oleh ChatGPT; pemeriksaan struktur dasar JSON dilakukan, bukan pengganti validator Runner.
- `RENDER`: antrean Runner diaktifkan lewat shots.json; status render dan file MP4 perlu verifikasi terpisah.
- `VIDEO_RESULT_QC`: **PENDING OWNER**. Tanpa melihat video sungguhan, jangan menyatakan karakter/gerak sudah konsisten.
- `RULE_PROMOTION`: candidate-only. Setelah owner menilai sukses, tambahkan bukti ID job, link hasil, serta catatan khusus; baru pertimbangkan memasukkan aturan yang terbukti berhasil ke `SKILL.md`.
- `PUBLISH`: OFF; unggah YouTube/Facebook tidak diaktifkan. Hasil hanya disimpan di Google Drive.

## Cara Mengaktifkan Saat Diizinkan

1. Pastikan pilihan paket (pilot ini dibuat sebagai **Paket 2 dengan modifikasi 60 detik dan gaya 3D**).
2. Baca ulang `skills/jota-video/SKILL.md` terbaru karena versi bisa berubah.
3. Konversi `brief.json` dengan generator repo jika relevan; jalankan validasi rencana Runner `node apps/videoexpress-runner/runner.mjs plan <shots.json>` sebelum `auto=true`.
4. Simpan dalam folder produksi PB01 di repo, kemudian push **hanya setelah izin produksi sesuai kartu**.
5. Jangan menaikkan versi skill otomatis berdasarkan status prompt. Kualitas video dinilai owner.

> Referensi dalil: https://quran.com/id/al-isra/23. Tidak ada ayat/hadis yang direka.