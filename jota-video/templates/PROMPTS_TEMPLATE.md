# {PROYEK}: "{JUDUL}"

Template paket produksi (skill jota-video, ikuti versi terbaru di `SKILL.md`). Label prompt berbahasa Inggris dan blok MANDATORY RULES mengikuti jenis shot (`PROMPT_PROFESIONAL.md` 2D, 2D-1, 2F). Aturan konsistensi wajib: `references/CONSISTENCY_RULES.md`. Template prompt wajib: template PRO di `references/PROMPT_PROFESIONAL.md` (blok IMAGE PROMPT dan VIDEO AND AUDIO PROMPT di bawah sudah memakai template itu; suara latar diambil dari katalog bagian 5). Agen mengisi semua `{...}`, lalu menyimpan file ini sebagai `playbooks/{kategori}/productions/{PROYEK}/PROMPTS.md`. Pelaksana menyalin teks di blok kode **persis**.

| | |
|---|---|
| Tema dari owner | {kalimat owner apa adanya} |
| Mode | {JOTA 1 / JOTA 2} |
| Genre | {G01 sampai G16 dari GENRE_CATALOG} |
| Style | {S28 / ...} |
| Rasio | {16:9 cinematic / 9:16 vertical, dipilih owner; jangan diisi sendiri} |
| Generator gambar | {G1 VideoExpress / G2 / G3} |
| Produser | Ukulahaa Creative Studio |
| Proyek VideoExpress | `{PROYEK}` (buat baru) |
| Jumlah scene | {N} x 10 detik |
| Pesan moral | {satu kalimat} |

## Cerita singkat

{3 sampai 5 kalimat: awal, masalah atau kejadian, puncak, penyelesaian, pesan.}

## Character bible

Semua kolom wajib diisi; tulis "tidak ada" kalau memang tidak ada.

| ID | Nama | Peran | Usia dan badan | Tinggi relatif | Kulit | Rambut | Penutup kepala | Baju atas | Bawahan | Alas kaki | Aksesori | Sifat | Gaya gerak | Suara |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| CH01 | {nama} | utama | ... | ... | ... | ... | ... | {jenis, warna bernuansa, lengan, kerah} | ... | ... | ... | ... | ... | ... |
| CH02 | {nama} | utama | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

Kalimat KUNCI tokoh (disalin persis ke setiap prompt):
```text
{CH01}: {satu kalimat Inggris berisi semua ciri, termasuk atribut yang tidak boleh hilang ditulis juga sebagai larangan}.
{CH02}: {...}.
SCALE: {kalimat tinggi relatif, misalnya: when both stand, X's head reaches Y's chest. Their sizes never change; crouching or kneeling only bends their bodies.}
```

## Props bible

| ID | Benda | Jumlah persis | Warna per buah | Ukuran dan bentuk | Tempat awal |
|---|---|---|---|---|---|
| PR01 | {benda} | {angka} | ... | ... | ... |

Kalimat KUNCI benda:
```text
PR01 {BENDA}: exactly {jumlah} {benda}, {warna per buah}, {ukuran}. Never more, never fewer, never other colors.
```

## Peta lokasi

| ID | Lokasi | Kalimat tata letak (dari sudut kamera utama) | Pencahayaan dan waktu | Area aksi | Sudut kamera utama |
|---|---|---|---|---|---|
| LOK01 | {lokasi} | {kiri layar ..., tengah ..., kanan layar ...} | ... | ... | ... |

Kalimat LAYOUT:
```text
LAYOUT: {tata letak persis}. {pencahayaan dan waktu}.
```

## Progres (diperbarui agen di setiap tonggak; owner mulai dari baris pertama yang belum LOLOS CEK)

| Shot | Gambar awal | Status | ID klip | Frame disimpan |
|---|---|---|---|---|
| 1 | BARU | BELUM | | |

## Shot list (film YouTube, default)

Format dan aturan: `references/STORYTELLING_FILM.md` bagian 9. Satu baris per shot.

| Shot | Bagian | Gambar awal | Durasi | Ukuran dan sudut | Gerak kamera dan alasannya | Isi visual | Jenis | Suara | Narasi persis atau (kosong) | Sumber / PENGISI / KONTEKS | Transisi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | A Hook | BARU | 5 s | ... | ... | ... | aman | ... | ... | ... | cut |

## Storyboard (format lama, hanya untuk video di bawah 2 menit)

Bagian ini juga dikirim utuh ke chat sebelum gambar atau klip pertama dibuat (SKILL.md 4B langkah 4).

| SC | Metode | Lokasi | Gambaran visual | Narasi atau dialog persis | Sumber | Durasi |
|---|---|---|---|---|---|---|
| SC01 | KEYFRAME | LOK01 | ... | "..." | ... | 10 s |

## Tabel scene

Metode ditentukan dengan tabel 2C di `CONSISTENCY_RULES.md`: lokasi sama, waktu bersambung, dan tokoh tetap di area aksi yang sama = SAMBUNG.

| SC | Metode | Alasan metode | Lokasi | Aksi dan dialog inti | Emosi dan kamera utama | Framing kamera akhir |
|---|---|---|---|---|---|---|
| SC01 | KEYFRAME | scene pertama | LOK01 | ... | ... | ... |
| SC02 | SAMBUNG | lokasi, waktu, area aksi sama | LOK01 | ... | ... | ... |

## Buku keadaan

Keadaan akhir SC(n) disalin persis menjadi keadaan awal SC(n+1). Benda dihitung.

| SC | Keadaan awal (posisi, pose, arah pandang, benda di tangan, hitungan benda) | Aksi yang mengubah | Keadaan akhir |
|---|---|---|---|
| SC01 | ... | ... | ... |
| SC02 | {sama persis dengan keadaan akhir SC01} | ... | ... |

## Setting setiap Create Video

1. Rasio sesuai tabel di atas (dialog kembali ke Vertical setiap dibuka).
2. Image Type `2d` (S28) atau sesuai style, Creative mode OFF untuk S28, Enhance image prompt OFF, Enhance video prompt OFF.
3. Gambar awal: keyframe scene itu (`Use from Library`) atau buat dengan IMAGE PROMPT di bawah, lalu cek kepala (JOTA 1: mata dan hidung tidak boleh ada).
4. Advanced Mode ON, Manual Video Length 10, Video Only OFF, public gallery OFF. Narration OFF untuk dialog native; ON untuk scene narator, dengan teks TTS dari Storyboard dan prompt video tanpa kata narator (`PROMPT_PROFESIONAL.md` 4A).
5. Scene KEYFRAME boleh disubmit berturut-turut (maksimal 5 job). Scene SAMBUNG disubmit satu per satu dari frame sambungan yang lolos cek S1 sampai S5 (`CONSISTENCY_RULES.md` 9B), tanpa Image Prompt. Catat `SC## -> ID job` di RUN_STATE.json.

## SC01: {judul scene}

IMAGE PROMPT (keyframe):
```text
{Blok MANDATORY RULES sesuai jenis shot Image Prompt dari PROMPT_PROFESIONAL.md 2D, disalin persis, sebagai teks paling awal}
STYLE: {style tag persis}.
{Lokasi, waktu, cuaca}. {Tokoh A: pose, posisi di sepertiga kiri atau kanan layar, arah pandang, benda di tangan, dari Buku keadaan}. {Tokoh B ...}
Objects now: {keadaan setiap benda dengan hitungan}.
Composition: {ukuran shot}, eye level, {JOTA 1: back three-quarter view or far away | JOTA 2: side three-quarter view}, main character on the {left/right} third of the frame, {satu benda latar depan di tepi frame} in the foreground, {landmark lokasi} in the background. {2D: layered painted background with simpler, lighter detail behind the characters. 3D: lensa, misalnya 35mm, with soft background depth of field.} Full heads and headwear inside the frame.
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

VIDEO AND AUDIO PROMPT:
```text
SC01: {judul pendek}
{Blok MANDATORY RULES sesuai jenis shot Video and Audio Prompt dari PROMPT_PROFESIONAL.md 2D, disalin persis}
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

{Ulangi blok SC untuk setiap scene, lengkap, tanpa disingkat. Scene SAMBUNG tidak punya IMAGE PROMPT.}

## Penutup produksi

Rakit urut, potong bengong di awal atau akhir klip, teks OP1 "Ukulahaa Creative Studio presents", OP2 "{JUDUL}", CL2 "TAMAT", CL3 kredit (maksimal 10 menit untuk teks), export High / FullHD / mp4 dengan nama `{PROYEK}-v1`, simpan ke Google Drive folder `Video JOTA`. Jangan publish.

## Kartu kerja per shot

Satu kartu per shot, format persis dari `references/STORYTELLING_FILM.md` bagian Paket ambil alih. Semua teks tempel ditulis utuh.
