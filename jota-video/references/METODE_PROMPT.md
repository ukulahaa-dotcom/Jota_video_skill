> HISTORIS: metode 2026-11-05 ini mendahului master FACELESS V4 2026-11-08 dan audio ElevenLabs-only. Bukan kontrak aktif untuk dialog native atau format prose. Untuk operasi kini baca SKILL.md, PROMPT_FACELESS_V4.0.0.md, imageV6 dan policies/authoring.json. natural_realtime_v1 mengatur tempo/beat tanpa menghidupkan dialog native.

# Metode prompt NATURAL (v4.1, 2026-11-05)

Satu-satunya cara menulis prompt untuk VideoExpress, kecuali owner menulis "metode PRO". Dasarnya dua bukti: **uji smooth owner** (19 klip, [`BENCHMARK_OWNER_SMOOTH_20261104.md`](BENCHMARK_OWNER_SMOOTH_20261104.md)) dan **tooltip resmi VideoExpress 3.5** ("write one flowing paragraph in present tense like a director; start with the shot and camera; describe events in order; say what stays still as well as what moves; no timestamps or lists"). Versi lama dokumen ini: `archive/METODE_PROMPT_v3.99.md` (bukan instruksi).

Generator `apps/videoexpress-runner/dari-brief.mjs` menulis prompt ini otomatis dari kartu klip di `brief.json`. Agen menulis kartu klipnya dengan jelas; jangan menempel prompt buatan tangan kecuali owner meminta.

## Video Prompt

Urutan isi (owner 2026-11-05 22:54), satu atau dua paragraf mengalir, bahasa Inggris, ucapan bahasa Indonesia dalam tanda kutip:

1. **Faceless, satu kalimat.** `Keep Uwais faceless for the entire video, exactly like the reference image.`
2. **Penampilan, satu kalimat positif per tokoh.** `Uwais has his wavy black hair and wears his glasses and red koko shirt, with the same outfit and accessories exactly as in the reference image for the entire video.`
3. **Shot dan kamera.** Ukuran shot, posisi kamera, satu gerak yang jelas: mengikuti siapa, dari mana ke mana, berakhir menyorot apa. Contoh uji owner: kamera di depan Uwais dan mundur saat Uwais maju.
4. **Aksi berurutan, sebab lalu akibat.** "First ... Then ... Only after ... Finally". Siapa bergerak, anggota tubuh mana (kanan atau kiri), benda apa yang disentuh, dibawa ke mana, diletakkan di mana. Arah gerak ditulis positif ("walks forward to the door").
5. **Ucapan setelah pemicunya.** "Only after he knocks twice with his fist, he says: "Assalamu'alaikum, Ummi!"". Bukan saat masih berjalan.
6. **Yang diam, lalu musik.** `Everything else in the room stays still. No music.`

Tidak ditulis di Video Prompt:
- Mata, hidung, mulut, ekspresi wajah, lipsync.
- Kalimat larangan (never, no, nothing, tidak boleh) selain `No music.` Menyebut hal yang dilarang bisa memancingnya (pilot PLUMAIR1: kalimat "never bald" dan "never walks backward" diikuti botak dan mundur). Larangan baru hanya untuk masalah yang terbukti sering muncul, dengan bukti proyek.
- Blok berlabel (`MANDATORY RULES:`, `ACTION:`), daftar berpoin, timestamp. Label pelacak Runner `TAG-SHOTxx:` di awal wajib (dipakai Runner mencari klip); judul klip tidak ikut, judul hanya di Sheet.
- Benda atau orang yang tidak ada di gambar awal (nama yang disebut bisa digambar).

## Image Prompt (klip BARU saja)

Satu paragraf teknis, tanpa label dan tanpa daftar larangan (bukan blok PRO). Urutan: ukuran shot dan subjek, faceless eksplisit, baju adegan, skala tokoh (selalu: umur, tinggi cm, dan untuk dua tokoh posisi kepala saat berdiri dan duduk serta hubungan orang tua dan anak kecil, bukan kakak adik atau sepantar), skala tokoh bila lebih dari satu (perbandingan kepala dan tinggi cm dari tokoh.json), pose awal (kepala tegak, menghadap kamera atau tiga perempat), benda yang dipegang dan letaknya, ruangan dan cahaya, penutup konsistensi.

```text
Medium shot of the same faceless boy, Umair, standing in the living room facing the camera at a slight three-quarter angle. His face is completely smooth with no eyes, no nose, and no mouth. He wears a red long-sleeved koko shirt and navy trousers, barefoot. He holds one black TV remote in his right hand at chest height. Warm afternoon light comes from the window on the left. Preserve the same room setting, lighting, and character identity as the reference images.
```

Reference Photo 1 = foto acuan tokoh, Reference Photo 2 = frame ruangan yang disetujui.

## Contoh Video Prompt (klip SAMBUNG)

```text
UMAIR01-SHOT03: Keep Umair faceless for the entire video, exactly like the reference image. Umair has his straight short black hair and wears his red koko shirt, with the same outfit and accessories exactly as in the starting image for the entire video. Medium-wide shot from the hallway; the camera starts behind Umair at shoulder height and follows him slowly as he walks forward to the kitchen doorway, ending on Umair standing at the doorway with Ummi visible at the stove. First, Umair places the black TV remote on the coffee table with his right hand and lets go; the remote stays on the table. Then he walks forward at a normal pace, his bare feet stepping fully on the tiled floor. Only after he stops at the doorway, he says: "Iya, Ummi. Aku bantu, ya." Everything else in the room stays still. No music.
```

## Kapan klip BARU, kapan SAMBUNG

| Keadaan | Klip |
|---|---|
| Klip pertama, sudut kamera pindah sisi, lokasi baru, ganti baju, lompatan waktu | BARU (`"potong": true`), gambar awal dengan Reference Photo 1 tokoh + 2 ruangan |
| Tempat, waktu, sisi kamera sama; kamera hanya mengikuti atau mendekat pelan | SAMBUNG dari Save Last Frame |
| Sudah 3 SAMBUNG berturut-turut | BARU lagi (jangkar identitas) |
| Tokoh berputar/berbalik, termasuk 360° | Ikuti storyboard; tidak wajib BARU atau First Frame, Last Frame hanya karena putaran (owner 2026-11-09). QC hasil asli tetap wajib |
| Close-up tangan atau benda | BARU tersendiri; klip sesudahnya BARU lagi |

## Metode PRO

Template berlabel di [`PROMPT_PROFESIONAL.md`](PROMPT_PROFESIONAL.md), hanya kalau owner menulis "metode PRO" (`"gaya_prompt": "lengkap"` di brief).
