---
name: jota-faceless-image-video-prompt-engine
version: 1.0.0
language: id-ID
mode: pre-generation-prompt-planning
provider: VideoExpress AI (motion)
updated: 2026-11-04
---

# JOTA FACELESS IMAGE & VIDEO PROMPT ENGINE v1.0

> **SUPER STRICT VISUAL IDENTITY • FACIAL-FEATURE-FREE • CHARACTER & OBJECT CONTINUITY • VIDEOEXPRESS READY**  
> Dua hal yang berbeda: **Image Prompt mengunci desain visual**, sementara **Video Prompt menggerakkan gambar yang sudah terkunci tanpa menciptakan desain ulang**.

## 0. SCOPE & PRECEDENCE

Modul ini menambah sistem JOTA yang sudah ada, bukan menggantikan:

- `skills/jota-video/SKILL.md` — sumber aturan tertinggi; saat dibaca untuk penyusunan ini: v3.72.0 (4 November 2026).
- `references/PROMPT_PROFESIONAL.md` — format PRO yang **wajib dipakai** untuk Image Prompt dan Video and Audio Prompt.
- `references/CONSISTENCY_RULES.md` — karakter, benda, tata letak, ledgers, LAST FRAME.
- `references/SCENE_WORKFLOW.md` — langkah produksi VideoExpress.
- `references/STORYTELLING_FILM.md` — shot list, transisi, 60-detik/long-form.
- `characters/tokoh.json` — identitas visual tokoh aktif dan pembeda antar tokoh.
- `characters/suara.json` — identitas suara ElevenLabs.

Jika dokumen ini bertentangan dengan repo aktif, **repo yang menang**. Tujuan modul: membuat prompt **lebih lengkap di tahap pra-produksi**, bukan membuat mesin pemeriksa render baru.

**Immutable production policies:**

1. Semua manusia di layar **faceless sepenuhnya**, termasuk figur tambahan.
2. **Tidak ada musik**; ambience dan Foley natural diperbolehkan.
3. **Video bergerak hanya melalui VideoExpress**; generator lain hanya untuk referensi gambar diam sesuai pilihan owner.
4. **Tokoh tidak berbicara di klip** dan tidak melakukan aksi lipsync; dialog/narasi ditempel sebagai ElevenLabs voice-over sesuai repo.
5. **Public gallery OFF** ketika membuat gambar/video di VideoExpress.
6. **QC ketat pada teks prompt sebelum produksi**, tanpa pemindaian frame video, tanpa pemeriksaan otomatis pascarender, tanpa regenerasi otomatis.
7. Klip yang menyambung ruang-waktu-area menggunakan **LAST FRAME** dari klip sebelumnya, bukan gambar KEYFRAME baru.

---

## 1. MASTER PRINCIPLE: THE START IMAGE IS THE VISUAL CONTRACT

**Gambar awal memuat informasi karakter yang jauh lebih konkret daripada larangan dalam Video Prompt.** Maka:

- `IMAGE PROMPT`: deskripsi karakter lengkap, wajah polos tanpa fitur, pakaian, pose kepala, prop, lokasi, cahaya, komposisi, hitungan benda.
- `VIDEO PROMPT`: jangan menuntut model membangun ulang karakter; animasikan **hanya** aksi yang dibutuhkan dari gambar yang sama, dengan gerakan minimal, kamera sederhana, dan posisi akhir yang stabil.
- `LAST FRAME`: dari sumber frame riil yang ditetapkan, tanpa image prompt baru, konsistensi memakai frame tersebut.
- `AUDIO`: suara manusia disinkronkan di editor/ElevenLabs, bukan instruksi agar mulut bergerak.

**One approved reference → same character identity in all shots.** Prompt bukan jaminan 100% hasil model; keberhasilan sangat tergantung kualitas referensi dan batas model.

---

## 2. CHARACTER IDENTITY BIBLE — SSOT

Sebelum membuat prompt, salin kunci karakter dari repo, **bukan mengarang dari usia atau nama**.

```text
CHAR_ID: CH_UMAIR
NAME: Umair
AGE: {from tokoh.json}
FACELESS_MASTER_IMAGE_ASSET: {exact approved library file}
KUNCI: {copy verbatim from characters/tokoh.json}
PEMBEDA: {copy verbatim from characters/tokoh.json}
BODY_SCALE: {height / relative height from repo}
HAIR: {exact length, texture and color}
CLOTHING: {exact fabric, color and cut}
FOOTWEAR: {exact type and color}
RIGHT_HAND: {empty / PR_ID}
LEFT_HAND: {empty / PR_ID}
VOICE_ID: {from suara.json, voice-over only}
```

**Urutan prioritas identitas**:
1. Master character image yang disetujui.
2. `tokoh.json` yang cocok dengan master.
3. Bible scene untuk pose, posisi dan objek.
4. Prompt gambar baru atau prompt gerak.

Jangan menggunakan “same character as before” sebagai pengganti deskripsi yang harus disalin lengkap untuk KEYFRAME. Jangan campur baju/rambut/ukuran tokoh.

---

## 3. ABSOLUTE FACELESS IMAGE SPECIFICATION

**Khusus IMAGE PROMPT dan master image**, gunakan perintah visual positif **serta negatif** yang eksplisit:

```text
FACELESS CHARACTER DESIGN:
A completely smooth, seamless, skin-toned blank face surface extending continuously from the forehead to the chin. The face is an unpainted, featureless surface with no carved or drawn anatomy. The head retains natural overall human shape and ears where appropriate, but there are no eyes, eyebrows, eyelashes, nose, nostrils, mouth, lips, teeth, or facial marks. No facial-expression lines. The surface remains smooth from front and gentle three-quarter views.
```

**Gaya animasi:** pertahankan style tag dari katalog proyek (misalnya S28 kartun 2D; atau style 3D jika owner menetapkannya). Jangan mengubah style 2D menjadi 3D di tengah serial.

**Faceless master tidak sama dengan masker yang menutupi wajah.** Jangan membuat: masker medis, helm, kain penutup muka, balaclava, cadar, blur, solid hitam, atau wajah yang “disembunyikan” oleh kamera kecuali memang karakter berpakaian demikian sesuai alur cerita. Yang diinginkan adalah **permukaan wajah polos asli dari desain karakter**.

**Antropomorfisme:** jika karakter nonmanusia dimaksudkan faceless, definisikan bentuk bagian kepala yang polos sesuai karakter; jangan memberi wajah manusia sebagai solusi.

---

## 4. FACE POSE SAFETY LOCK — DARI KEGAGALAN NYATA JOTA

Repo JOTA mencatat kesalahan berulang ketika AI menambah mata/hidung/mulut pada pose **menunduk, berbaring, tidur, profil 90°, close-up muka, atau saat membalikkan kepala sepenuhnya**. Maka penggunaan pose aman menjadi prioritas lebih tinggi daripada aksi literal yang berisiko.

### Pose default aman

```text
Head upright, chin level, relaxed neck, gentle front-to-three-quarter orientation (approximately 0–45 degrees), stable posture, soft even lighting, medium or medium-wide framing.
```

### Pose berisiko dan substitusi aman

| Naskah berisiko | Pengganti yang mempertahankan makna |
|---|---|
| “Anak melihat HP dengan menunduk” | HP dipegang setinggi dada, anak duduk tegak, kamera menyorot tangan dan HP dari medium |
| “Anak membaca buku menunduk” | Buku diangkat agak tegak pada meja/penyangga, kepala tetap tegak |
| “Anak tidur di ranjang” | Jam alarm/selimut sebagai insert; atau anak sudah duduk tegak di tepi ranjang |
| “Karakter bangun dari posisi berbaring” | Cut ke posisi duduk di tepi ranjang, jika time jump sah -> KEYFRAME |
| “Profil samping penuh 90°” | Framing three-quarter ringan, body mengarah lawan bicara, kepala tidak full profile |
| “Karakter membelakangi kamera lalu berbalik” | Gunakan 3/4 awal, cukup rotasi kepala 15–30°; jangan paksakan full turn |
| “Ekspresi sedih wajah close-up” | Medium shot: bahu turun, badan diam, tangan menenangkan; suara dan jeda mengantar emosi |
| “Bermain bola sambil berlari-lari” | Pecah shot: menyiapkan bola, satu langkah, tendangan sederhana, arah akhir jelas |

**Batas 45° adalah pedoman produksi dari repo, bukan angka kontrol yang dijamin oleh VideoExpress.**

---

## 5. CHARACTER MASTER IMAGE PROMPT — TEMPLATE LENGKAP

Gunakan untuk pembuatan reference character **gambar diam** sebelum episode. Master sebaiknya **satu karakter per gambar**, background netral, tubuh jelas, pakaian serial tetap, tanpa kolase sudut sulit jika generator sulit mempertahankan identitas.

```text
STYLE: {EXACT PROJECT STYLE TAG — e.g., warm cinematic stylized 3D animation / S28 as defined in active JOTA catalog}.
MANDATORY IMAGE CHARACTER LOCK:
Create exactly ONE full-body human character. {COPY EXACT KUNCI from characters/tokoh.json}. {COPY EXACT PEMBEDA}. Preserve established body proportions and age. Same hairstyle, clothing, footwear and accessories as the approved character bible.

ABSOLUTE FACELESS MASTER:
A smooth, blank, featureless skin-toned face surface from forehead to chin, like an unpainted doll face naturally integrated into the head. No eyes, eyebrows, eyelashes, nose, nostrils, mouth, lips, teeth or facial-expression marks. Facial surface remains completely smooth in the displayed angle. Not a mask or covering.

POSE:
Standing naturally, head upright, chin level, soft three-quarter front view, both hands relaxed by sides, balanced weight, natural joints and fingers. No dramatic head tilt or exaggerated pose.

COMPOSITION:
One character only, full body clearly visible, neutral simple studio background, medium-long lens perspective, stable scale, centered with adequate margins. No crop through hands or feet.

LIGHT:
Soft, even studio light, clear form, no deep facial shadows, physically coherent highlights.

QUALITY:
Clean consistent linework or materials appropriate to style; no anatomy artifacts, no extra fingers, no blended limbs, no floating accessories.

AVOID:
Additional people, face features, closed eyes, smiling mouth, nose ridge, floating facial parts, mask, veil as an unwanted face cover, facial shadows that imply a nose or mouth, text, logos, collage, split-screen, costume variation, extra limbs.
```

**Prompt harus spesifik karakter**. Jangan mendefinisikan rambut/baju sendiri jika repo sudah punya versi master.

---

## 6. KEYFRAME IMAGE PROMPT — SHOT01 ATAU LOMPATAN SAH

Gunakan hanya bila `START_SOURCE=BARU`:

```text
MANDATORY RULES:
STYLE: {EXACT STYLE TAG}; exact same visual language as the approved character master.
CHARACTER: {FULL VERBATIM CHARACTER KUNCI + PEMBEDA + SIZE, no paraphrase}.
FACELESS DESIGN: Completely smooth featureless skin-colored face from forehead to chin, no eyes, eyebrows, nose, mouth or other facial marks; no face covering or masking. Front-to-soft-three-quarter angle.
FACE POSE LOCK: Upright head, level chin, stable shoulders, medium or medium-wide framing, face surface clearly smooth and evenly lit. Avoid full profile and looking down.

SCENE:
{EXACT LOCATION/TIME/WEATHER}.
LAYOUT: {SINGLE FROZEN ROOM MAP: screen left, center, right, foreground, background}.
LIGHT: {SINGLE GROUNDED SOURCE, consistent direction}.

OPENING STATE:
{CHARACTER A: position, posture, hands, object holder, body facing}.
{CHARACTER B: only if approved; relative height, left/right and differences}.
OBJECTS: {OBJECT ID, exactly how many, exact shape/color/material and location}.

CINEMATIC FRAMING:
{9:16 or 16:9} aspect ratio; {shot size}; camera at {fixed angle/height}; proper lead room and headroom; visible destination/path if movement will occur; enough background detail for readable geography.

START-OF-ACTION MOMENT:
Freeze precisely at the initial action state, before the motion begins. Both hands and all relevant objects have physically plausible contact or resting states.

AVOID:
Extra characters, duplicated props, transformed objects, inconsistent face, eyes/nose/mouth, head downward, full side profile, extreme face close-up, extra fingers, text, watermark, split panels, dreamlike physics.
```

**Catatan video produksi:** sistem meminta UI `Use Consistent Character` dengan master asset yang benar bila prosedur repo mengharuskannya. Jangan menganggap prompt saja cukup untuk mengunci wajah.

---

## 7. SUPER-STRICT VIDEO PROMPT — ANIMATE, DON'T REDESIGN

Perintah untuk **Video and Audio Prompt** berbeda dari Image Prompt. Jika sumber gambar sudah faceless, gunakan **prompt gerak singkat, konkret, berurutan**, dan tidak menjadikan wajah pusat perhatian. **Jangan menuliskan deskripsi bicara, senyum, menangis dengan gerakan muka, berkedip, atau close-up muka di video prompt.**

**TEMPLATE (English, mengikuti layout Template PRO repo):**

```text
MANDATORY RULES:
Use the provided approved start image as the exact visual source for character identity, hairstyle, clothing, location layout, lighting and objects. Preserve visual continuity. Maintain physically natural movements and believable body balance. Use only the planned characters and props.

STYLE: {EXACT STYLE TAG}.

OPENING STATE:
{EXACT START STATE FROM KEYFRAME OR PREVIOUS LAST FRAME, including room layout, body position, hands and prop locations.}

ACTION:
0–3s: {ONE PRIMARY SMALL PHYSICAL ACTION, physically feasible}.
3–6s: {NEXT LOGICAL PHYSICAL ACTION; do not add another unrelated objective}.
6–10s: {SETTLE AND HOLD THE INTENDED END POSITION STABLY}.

CAMERA:
{SIZE/ANGLE}; {STATIC or ONE REALISTIC MOVEMENT}; {reason for movement}; {start and end framing}; gentle ease in/out.

LIGHT:
{ONE MOTIVATED SOURCE, direction consistent with image}.

SOUND:
AMBIENCE: {natural location-specific sounds only, time-coded}.
FOLEY: {sound caused by the exact action, time-coded}.
ROOM: {natural room acoustics; no constant artificial humming}.
Human voice is produced separately as synchronized voice-over in the JOTA workflow. No music.

END STATE:
{FINAL CHARACTER POSTURE, HAND STATE, PROP COUNT, PROP LOCATION, CAMERA FRAMING}.
Hold a stable final composition suitable for the next LAST FRAME connection.

CONSISTENCY LOCK:
STYLE: {copy exact style}.
CHARACTER: {copy verbatim relevant kunci from source of truth if required by current repo template}.
SCALE: {if two characters; explicit relative height}.
DIFFERENCES: {if two characters; disambiguation}.
OBJECTS IN HANDS: {exact hand, object ID, count and contact; or NONE}.
OBJECT COUNT LOCK: {object registry lines, unchanged}.
LAYOUT: {exact room landmarks and lighting}.

AVOID:
random actions, unexplained changes in positions, unnatural rotations, teleportation, extra objects, duplicated objects, morphing, hand clipping, floating objects, inconsistent clothing, unexpected people, camera jump, abrupt perspective shifts, visible talking gestures.
```

**PENTING:** Jika versi terbaru `PROMPT_PROFESIONAL.md` mewajibkan blok yang lebih spesifik atau menyatakan *jangan menyebut kata terkait wajah sama sekali pada video prompt*, **gunakan aturan terbaru repo tersebut**. Jangan menyisipkan paragraf panjang tentang mata/hidung/mulut pada video prompt hanya untuk mempertegas: pengalaman repo menunjukkan sumber wajah polos + gerak aman lebih penting daripada larangan yang diulang-ulang.

---

## 8. `LAST FRAME` VIDEO PROMPT — TIDAK MEMBUAT GAMBAR BARU

Saat lokasi, waktu dan area aksi berkesinambungan:

```text
SHOT_ID: SHOT{NN}
START_SOURCE: LAST_FRAME FROM SHOT{N-1}
IMAGE_PROMPT: NONE
REFERENCE: {SHOT{N-1}-END-v1}

MANDATORY RULES:
Continue the exact supplied frame. Preserve the same character scale, wardrobe, props, screen positions, room geometry, light direction, and visual style. No new characters or unmotivated objects.
STYLE: {EXACT STYLE TAG}.
OPENING STATE: {COPY PRIOR END STATE EXACTLY}.
ACTION: {one simple motion: e.g. he stands slowly without changing head orientation drastically}.
CAMERA: {single gentle movement or static}. Keep established screen geography.
SOUND: {Ambience / Foley / Room events with timestamps}. No music. Dialog stays in separate voice-over.
END STATE: {precise stable finishing pose; all props accounted for}.
CONSISTENCY LOCK: {copy exact required character/prop/layout locks from current repo template}.
AVOID: teleportation, sudden change of framing, new furniture, extra props, random gestures, body distortion.
```

**No Create Image** pada shot SAMBUNG. `Use from Library` memilih frame terakhir yang ditetapkan di storyboard; ini menjaga sambungan yang lebih baik daripada deskripsi saja.

---

## 9. IMAGE-TO-VIDEO MOTION CONSTRAINTS

### Motion grammar

```text
INITIAL STILLNESS / EXISTING ACTIVITY
→ TRIGGER
→ CLEAR PHYSICAL RESPONSE
→ NATURAL MOTION
→ SETTLED END FRAME
```

### Hands
- Hanya satu tangan menyentuh objek bila ceritanya cukup demikian.
- Lokasi sentuhan dinyatakan: jari memegang tepi/bagian bawah benda, bukan tembus benda.
- Jika kedua tangan memegang, posisi keduanya dijelaskan dan tidak melompat ke tempat baru.
- Hindari pertukaran benda tangan kiri ↔ kanan jika tidak dibutuhkan.

### Objects
- Benda selalu memiliki `OBJECT_ID`, ukuran, jumlah, orientasi dan posisi.
- Muncul/hilang hanya jika ada alasan fisik terlihat (misalnya keluar frame secara logis atau dimasukkan ke tas).
- Jangan memotong motion saat objek “di antara dua tangan” bila akan disambungkan dengan LAST FRAME.

### Feet & walking
- Kaki menapak bergantian; jangan geser melayang.
- Arah jalan menuju target layar yang jelas; kecepatan sesuai usia dan situasi.
- Jarak pergerakan tidak boleh lebih besar dari yang realistis dalam durasi klip.

### Voice-linked body performance
- Reaksi terhadap voice offscreen terjadi **setelah** cue masuk.
- Kepala tetap tegak dan gerak kecil; tubuh menghadap sumber suara secara halus.
- Dialog tidak memerlukan aksi bibir; suara direkam terpisah.

---

## 10. FRAME SAFETY / TEMPORAL CONTINUITY

Untuk setiap scene rencanakan tiga posisi konseptual:

1. `START FRAME`: pose benar, props benar, lokasi benar, kepala pada sudut aman.
2. `MIDDLE STATE`: satu perubahan fisik utama dengan jalur gerak jelas.
3. `END FRAME`: posisi baru stabil, semua benda masih terhitung, komposisi bisa disambung.

### State ledger examples

| Element | Start | Middle | End |
|---|---|---|---|
| Umair | Duduk tegak | Menoleh 20° | Tetap duduk three-quarter |
| Balok merah #1 | Di menara | Tidak disentuh | Tetap di menara |
| Kotak mainan #1 | Di kanan karpet | Tidak bergerak | Tetap di kanan karpet |
| Pintu kanan | Terlihat kanan layar | Tak berubah | Tetap kanan layar |
| Kamera | Medium-wide | Push-in perlahan | Medium, stabil |

Jangan membuat `END FRAME` yang membutuhkan lokasi atau orientasi baru secara mendadak.

---

## 11. AUTO-PROMPT COMPILER: GENERATE 2 SEPARATE PROMPTS ONLY WHEN NEEDED

```text
INPUT: storyboard shot + character bible + props bible + location bible + state ledger + selected output package + current SKILL rules.

IF shot.start = BARU:
    write IMAGE PROMPT using master reference + safe faceless pose + opening state.
    write VIDEO AND AUDIO PROMPT using same image opening state.
ELSE IF shot.start = LAST FRAME:
    IMAGE PROMPT = NONE.
    write VIDEO AND AUDIO PROMPT continuing prior end state exactly.
ELSE IF shot.start = PAKAI ULANG:
    IMAGE PROMPT = NONE unless repo explicitly requires a new generated reference.
    write VIDEO AND AUDIO PROMPT rooted in existing approved asset.

FOR EACH VIDEO PROMPT:
    use exactly one main narrative action;
    preserve character hair/clothes/scale;
    lock head upright, safe three-quarter angle through blocking, not excessive face-descriptions;
    lock prop identity, quantity, hand-contact;
    choose static or one simple camera move;
    time-code cause, motion and settled ending;
    add realistic ambience, Foley, room, no music;
    place all human dialogue in ElevenLabs VO planning, never visible native talking;
    obey current JOTA Template PRO syntax and precedence;
    internally perform pre-generation text QC.

OUTPUT:
    IMAGE PROMPT or NONE,
    VIDEO/AUDIO PROMPT,
    VOICE-OVER SCRIPT,
    SOURCE ASSET,
    END-STATE LEDGER,
    PRE-GENERATION PASS / REVISE.
```

Tidak ada pemanggilan model QC terpisah dan tidak ada cek hasil render otomatis.

---

## 12. AI QUALITY FAILURE → PREVENTION TABLE

| Risiko kegagalan | Penyebab perencanaan | Instruksi pencegahan di prompt |
|---|---|---|
| Mata/mulut muncul | Sudut menunduk, speaking animation, prompt ekspresi wajah | Master blank face; head upright; VO only; moderate 3/4 shot |
| Wajah berubah di shot berikutnya | KEYFRAME baru untuk shot sambung | LAST FRAME dari previous shot; stable end state |
| Rambut tokoh tertukar | Dua tokoh mirip, reference campur | Verbatim `tokoh.json`, `SCALE`, `DIFFERENCES`, kurangi dua tokoh se-shot |
| HP berubah jadi dua | Objek tanpa identity/count | OBJECT_ID+exactly one+holder+resting/end state |
| Kertas hilang di udara | Tanpa destination/physics | Travel path, air resistance, continuous grounded trajectory |
| Gerakan anak aneh | “react excitedly / move around” | Trigger → pause → one small body reaction → settle |
| Jari rusak saat grip | Aksi kompleks berturut-turut | Satu jenis grip dan aksi pendek, objek tetap terlihat |
| Tokoh teleport ke pintu | Jalur layar tidak ditetapkan | Established room map, direction and distance, sequential walking |
| Kamera melayang tanpa sebab | Instruksi gerakan dekoratif | Static as default; one motivated camera move |
| Baju tiba-tiba berubah | Kunci karakter disingkat | Copy exact clothing details, reference master |
| Ruang mendadak punya pintu baru | Kamera menampilkan area tak dipetakan | Stable lens/framing, bounded camera path, location landmarks |
| Musik muncul | Ambience generik atau musik diminta | Specific SFX events; `NO MUSIC` |
| Mulut bergerak saat audio tokoh | Native clip dialogue/lipsync | No native speech; VO ElevenLabs after visual generation |
| Teks berubah bentuk dalam gambar | Generator text rendering untuk overlay | Teks judul/subtitle dibuat di editor, bukan di image prompt |

---

## 13. THREE RISK LEVELS FOR PROMPT DESIGN

| Risk | Example | Best treatment |
|---|---|---|
| LOW | Satu karakter duduk tegak, sedikit menoleh | Single VideoExpress shot |
| MEDIUM | Berdiri, berjalan beberapa langkah | Pisah interaksi dengan prop dari gerak jalan; medium-wide |
| HIGH | Lempar HP, handoff cepat, dua anak mirip, tidur/bangun, profiled head turns | Reblock with prop resting, use offscreen voice, split scene or change depiction before rendering |

**Guideline:** do not ban every difficult action universally. Choose a safer equivalent that preserves story meaning and production cost. Requiring elaborate motions in one generation increases uncertainty.

---

## 14. EXAMPLE A — UMAIR DIPANGGIL UMMI (START IMAGE)

> **Template ilustratif.** Ganti `CHARACTER LOCK` dengan **kalimat asli** `tokoh.json` yang berlaku untuk karakter tersebut; contoh ini bukan klaim isi file saat ini.

```text
STYLE: warm cinematic 3D animated film look, soft realistic materials; use the actual approved JOTA style instead if it differs.

CHARACTER IDENTITY:
Exactly one 9-year-old Indonesian boy, Umair. {PASTE EXACT LOCKED CHARACTER DESCRIPTION AND DIFFERENCES FROM ACTIVE tokoh.json, INCLUDING CLOTHES/HAIR/BODY SCALE}.

ABSOLUTE FACELESS DESIGN:
His face is a smooth uninterrupted blank skin-toned surface, with no eyes, eyebrows, nose, nostrils, mouth, lips or facial expression details. It is naturally featureless, not covered by a mask or fabric. Upright head, level chin, gentle front-three-quarter orientation.

LOCATION:
A modest Indonesian family living room in the afternoon. Soft daylight from screen-left. A rug in the center and an open doorway to the kitchen on screen-right. No other people are visible.

START FRAME:
Umair sits naturally upright on the rug, calmly arranging one wooden red block on a small tower of two additional blocks. All three blocks remain distinct, solid and correctly sized. His head stays upright and does not angle downward. Both hands are in physically plausible positions. One toy box sits to his right.

CAMERA:
Medium-wide eye-level shot, vertical 9:16, showing upper body, hands, blocks, rug, and right-side doorway. Stable clean composition; no face close-up.

LIGHT:
Soft consistent natural daylight; no severe facial shadows.

AVOID:
Eyes, eyebrows, nose, mouth, drawn facial anatomy, face covering, extra toys, duplicates, additional characters, extra hands, altered clothing, unreadable text, logos, split-screen.
```

**NOTE:** Jika menata balok memerlukan kepala menunduk atau interaksi tangan yang terlalu kompleks, ubah gambar menjadi posisi **balok sudah tersusun**; video hanya menunjukkan Umair berhenti bermain. Sebab-akibat tetap tersampaikan tanpa risiko besar.

---

## 15. EXAMPLE B — VIDEO PROMPT SHOT02 (LAST FRAME)

```text
SHOT: SHOT02 - Umair hears Ummi calling.
MANDATORY RULES:
Continue the exact supplied start frame. Preserve the same boy's identity, clothes, hair, body scale, room geometry, block count, and light direction. Natural body mechanics and stable contact with the floor.

STYLE: {EXACT STYLE TAG FROM PROJECT}.
OPENING STATE:
Umair remains seated upright on the central rug. Three wooden blocks are in their established positions. The doorway remains on screen-right. The toy box remains on the right side of the rug.

ACTION:
0-3s: Umair briefly pauses his ongoing play. His hands become still.
3-6s: he gently rotates his upright head a small quarter-turn toward the doorway, keeping shoulders relaxed.
6-10s: he settles into a calm listening posture and remains stable for the next connected clip.

CAMERA:
Static medium shot, or an extremely subtle push-in that keeps the doorway on screen-right. One controlled movement maximum.

LIGHT:
Unchanged soft daylight from screen-left.

SOUND:
AMBIENCE: brief distant birds outside a modest home.
FOLEY: soft cloth movement when his arms settle.
ROOM: calm natural interior resonance.
VOICE: separate ElevenLabs offscreen Ummi line, synchronized after video generation: "Umair, tolong bantu Ummi, Nak."
NO MUSIC.

END STATE:
Umair remains seated upright, his head gently oriented toward the doorway, hands still. Three blocks and one toy box stay in exactly their established locations. Hold the final frame briefly.

CONSISTENCY LOCK:
{COPY EXACT CHAR / PROP / LAYOUT LOCKS REQUIRED BY THE LATEST JOTA TEMPLATE PRO}.

AVOID:
random waving, jumping, sudden standing, object duplication, shape morphing, teleported furniture, abrupt viewpoint changes, unnatural head rotation, visible speaking animation.
```

**No Image Prompt** for this LAST_FRAME shot; use saved last frame of previous shot.

---

## 16. EXAMPLE C — OBJECT HANDLING (ONE SMARTPHONE)

**Storyboard design:** demi konsistensi, start dengan HP **sudah digenggam**; hindari transisi pickup yang tidak diperlukan jika inti cerita adalah mendengar telepon.

```text
SHOT: A boy holds one black smartphone.
SOURCE: approved KEYFRAME, same approved faceless character.
OPENING STATE: boy seated upright, phone already resting firmly in his right hand at chest height; exactly one black phone; phone screen remains oriented toward him; left hand relaxed.
ACTION: The boy subtly shifts the smartphone upward no more than a few centimeters, then steadies his right hand; no handoff or complex rotation.
CAMERA: locked medium shot showing full hand and device, with stable perspective.
PHYSICS: the smartphone maintains one identical rigid rectangular shape, weight, color and orientation. Fingers keep continuous realistic contact; device does not float or duplicate.
END STATE: one smartphone remains in the same right hand, steady near chest, screen angle unchanged.
AUDIO: appropriate quiet indoor ambience and small clothing movement; no music; voice added separately.
```

Jika naskah memang meminta **mengambil HP dari meja**, storyboard boleh memecahnya menjadi: (1) tangan mendekati, (2) satu grip pelan, (3) HP sudah di tangan — tetapi hindari membuat tiga fase sulit dalam satu klip dengan banyak gerak kamera.

---

## 17. EXAMPLE D — NO PEOPLE / HANDS ONLY / HIKMAH CARD

### NO PEOPLE

Pakai shot lingkungan/prop jika visual manusia terlalu berisiko atau narasi yang kuat membutuhkan ruang napas:

```text
An empty Indonesian kitchen table in warm morning light, one ceramic cup, one folded clean cloth, and a small open window. Locked-off camera, subtle changing daylight, slight curtain movement. Natural sparrow calls outside, a soft room ambience, no music, no new objects and no text.
```

### HANDS ONLY

Gunakan bila naskah menuntut aksi benda, tapi wajah/pose berisiko:

```text
Medium detail shot of a single pair of human hands gently placing one wooden block into a toy box. Exactly one red block is transferred, no duplication, no object transformation. Stable camera, natural contact and gravity. Face and head outside the frame. Soft wood contact sound, room ambience, no music.
```

### TEXT / HIKMAH CARD

Jangan meminta generator membuat teks panjang. Rencanakan **gambar background bersih**, overlay teks dibuat pada editor setelah video:

```text
BACKGROUND SHOT: warm uncluttered living room composition, soft daylight, empty negative space in upper-middle vertical frame for editor-added text. No text in generated video. Gentle ambience, no music.
EDITOR OVERLAY (Indonesian): "Jawab orang tua dengan santun. Bantu dalam kebaikan."
VOICEOVER: narrator's verified, short concluding hikmah.
```

---

## 18. VIDEOEXPRESS INPUT FIELDS — PETA PRA-SETELAN

Nama kontrol ini **dilaporkan** oleh dokumentasi/tutorial dan workflow yang tersedia; tampilan dapat berubah. Ikuti UI aktual dan SKILL utama, jangan memalsukan status.

| Control / bidang | Tujuan dalam rencana |
|---|---|
| `Image Prompt` | KEYFRAME baru saja; NONE untuk LAST_FRAME |
| `Use Consistent Character` / `Reference Photo` | Pilih master tokoh sesuai kebijakan repo dan jenis shot |
| `Use from Library` | Pilih saved LAST FRAME atau approved image asset |
| `Video and Audio Prompt` | Kamera, motion, ambience/Foley/room; tanpa dialog native |
| `Advanced Mode` + `Manual Video Length` | Atur durasi clip sesuai durasi yang tersedia |
| `Automatically enhance image/video prompt` | Ikuti setting repo aktif; biasanya hindari auto-enhance yang mengubah kunci |
| `Lipsync HD Video` | Tidak digunakan untuk mode faceless JOTA yang memakai VO terpisah |
| `Narration Video` | Ikuti mode narasi spesifik repo; jangan mencampur dengan native speaking |
| `Share this in the public gallery` | **OFF secara wajib** |
| `Image Type`, ratio 9:16/16:9 | Match style dan paket proyek |

Jangan mengklaim durasi, kontrol suara, kompatibilitas atau tombol **pasti tersedia** tanpa konfirmasi UI akun saat eksekusi. `Public gallery` harus diperiksa setiap dialog, karena setting bisa reset.

---

## 19. SUPER-STRICT PRE-GENERATION TEXT QC (NO POST-RENDER)

Cek internal sebelum prompt dikirim ke generator; bukan job QC terpisah.

### FACE & IDENTITY
- [ ] Approved master image benar-benar faceless, bukan masker.
- [ ] Head pose aman: tegak, level, three-quarter ringan.
- [ ] Tidak ada script instruction untuk smiling, blinking, lip sync, “look down” atau profile penuh.
- [ ] Identitas, ukuran, rambut, baju disalin persis dari sumber aktif.
- [ ] Jumlah manusia dan pembeda masing-masing jelas.

### OBJECT & PHYSICS
- [ ] Semua props penting memiliki ID, qty, warna, lokasi.
- [ ] Tangan yang memegang benda ditentukan.
- [ ] Tidak ada state yang mengizinkan benda berubah/duplikasi/menghilang.
- [ ] Lintasan lemparan dan titik mendarat jika ada logis.
- [ ] Beban, gravitasi, kontak, rotasi, dan gerakan kaki masuk akal.

### VIDEOEXPRESS & CONTINUITY
- [ ] `BARU`/`LAST FRAME` dipilih dengan benar.
- [ ] LAST FRAME tidak punya Image Prompt.
- [ ] Start state = previous end state bila menyambung.
- [ ] Prompt Inggris, perintah fisik konkret, camera movement maksimal satu yang relevan.
- [ ] Cahaya dan room layout stabil.
- [ ] Semua dialog suara tokoh berada di VO, tanpa aksi talking native.
- [ ] Sound: Ambience, Foley, Room, NO MUSIC.
- [ ] Gallery OFF tercantum pada work card.
- [ ] Penutup shot punya stable hold untuk sambungan.

### RELEASE POLICY
- Status `PRE-GENERATION TEXT PASS` hanya berarti **rencana dan prompt** secara logis memenuhi aturan.
- Jika gagal: **reblock dan edit prompt dalam call yang sama** sampai konsisten.
- **Tidak ada post-render QC oleh agen**, frame inspection otomatis, retry render atau “regenerate until fixed”.
- Pengawasan hasil klip akhir oleh owner di luar modul ini.

---

## 20. REQUIRED OUTPUT FORMAT — PER SHOT

```text
SHOT_ID:
NARRATIVE PURPOSE:
START_SOURCE: BARU / LAST FRAME SHOT## / PAKAI ULANG
REFERENCE IMAGE ASSET:
CHARACTER LOCK:
FACE POSE SAFETY:
OBJECT LOCK:
LOCATION / SCREEN MAP:
DURATION:
OPENING STATE:
IMAGE PROMPT: {full text or NONE}
VIDEO AND AUDIO PROMPT: {full English Template PRO}
DIALOGUE / ELEVENLABS VOICEOVER: {exact Indonesian text, voice ID, audio timing}
AUDIO SFX: {Ambience, Foley, Room; no music}
CAMERA:
END STATE:
TRANSITION:
PRE-GENERATION STATUS: PASS / REVISE
```

Optional data shape to support your own preproduction compiler **without claiming Runner compatibility**:

```yaml
shot_id: SHOT02
source_type: LAST_FRAME
source_shot: SHOT01
scene_seconds: 10
image_prompt: null
video_prompt: "..."
character_ids: [CH_UMAIR]
prop_ids: [PR_BLOCK_1, PR_BLOCK_2, PR_BLOCK_3]
voiceover:
  voice_id: UMMI
  text: "Umair, tolong bantu Ummi, Nak."
audio:
  ambience: "distant birds"
  foley: "soft clothing rustle"
  room: "quiet living room"
no_music: true
pre_generation_text_qc: PASS
```

**Khusus `shots.json` Runner:** hasilkan dengan mengikuti contoh dan schema runner yang **benar-benar ada** di repo (`apps/videoexpress-runner/examples/shots.example.json`), bukan menyalin YAML di atas sebagai pengganti.

---

## 21. FINAL MASTER DIRECTIVE TO PROMPT GENERATOR

```text
ROLE: JOTA Face-Free Image-to-Video Prompt Compiler and Pre-Generation Director.
INPUT: Approved storyboard, selected JOTA package, latest JOTA SKILL.md + PRO prompt template + consistency rules, character master assets, character.json/tokoh.json, props and location bible, per-shot state ledger.
RULES:
1. Maintain one unchanging approved character identity and a completely blank faceless surface in all humans.
2. For new KEYFRAME, generate a detailed static image prompt with blank face description and safe upright 0–45-degree three-quarter pose.
3. For LAST FRAME continuation, no image prompt; animate from saved source frame.
4. For video prompt, focus on one purposeful physical action, simple camera movement, consistent space and stable final state; never introduce native speaking/facial animation.
5. Track every important object's quantity, shape, location and hand-contact state. No duplication, teleportation, morphing or unexplained disappearance.
6. Use natural gravity and cause-effect motion. Avoid risky face poses and complicated handovers.
7. Preserve original style and visual identity. Use master character and exact repo kunci; no paraphrased wardrobe.
8. Add time-specific natural ambience/Foley/room; no music. Voices are provided separately via ElevenLabs.
9. Output prompts in current VideoExpress Template PRO fields, plus voice plan and start/end state.
10. Perform strict TEXT PRE-GENERATION QC internally. Do not add post-render inspection or automatic retry.
OUTPUT: exactly one image prompt if needed, one video/audio prompt, one voice-over plan, one end-state ledger, status PASS/REVISE per shot.
```

---

## 22. REFERENCE & PRACTICAL REMINDERS

- **Repo owner:** `ohan78/Jota_Content_Factory`, `skills/jota-video/SKILL.md` and its references (read live before implementing).
- **VideoExpress official tutorial index:** https://videoexpress.ai/tutorials/index.html — includes tutorials for Create Video from Prompt, First Frame/Last Frame and other editing features. Feature availability and actual UI must be verified on the account.
- **VideoExpress website:** https://videoexpress.ai/.
- **Do not confuse generic external VideoExpress workflows with owner-approved JOTA protocol.** The current repository rules win even when outside tutorials use lipsync or human faces.

---

## 23. ABSOLUTE FINAL RULES

**STATIC IMAGE DEFINES IDENTITY. VIDEO PROMPT DEFINES MOTION.**  
**ONE APPROVED FACELESS CHARACTER MASTER.**  
**NO EYES / NO NOSE / NO MOUTH IN CHARACTER IMAGES.**  
**HEAD POSE SAFE; NO EXPRESSION OR TALKING ANIMATION.**  
**VOICE-OVER ELEVENLABS, SEPARATE FROM CLIP.**  
**LAST FRAME FOR CONTINUING SCENES, NEVER AN UNNECESSARY NEW IMAGE.**  
**OBJECT COUNT, GRIP, GRAVITY AND ROOM GEOGRAPHY LOCKED.**  
**ONLY STORY-DRIVEN CAMERA MOVEMENT.**  
**NO MUSIC. PUBLIC GALLERY OFF.**  
**PRE-GENERATION QC ONLY. NO AUTOMATED RENDER RETRIES.**

*END — JOTA FACELESS IMAGE & VIDEO PROMPT ENGINE v1.0*
