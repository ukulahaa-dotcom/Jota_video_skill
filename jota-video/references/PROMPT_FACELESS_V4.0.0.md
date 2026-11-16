# MASTER PROMPT JOTA FACELESS V4.0.0 — 8 NOVEMBER 2026

Status: WAJIB untuk prompt baru berorang; LULUS pengujian Node/validator, BELUM TERUJI live VideoExpress dan belum disetujui owner sebagai video final. Baseline V3.0 yang diuji manual hanya sejarah, tidak digunakan lagi untuk produksi baru.

## Kunci perubahan dari V3

1. Kunci wajah polos ditulis di setiap interval, di dalam setiap gerakan (tanpa heading KEEP FACELESS, FIRST FRAME, SPEECH, FINAL FACE).
2. VideoExpress tidak menerima kata-kata dialog atau narasi, tidak meminta orang bicara, lip-sync, atau suara manusia.
3. Dialog/narasi hanya metadata shots.json dan ditambahkan ElevenLabs pada rakit audio.
4. VideoExpress bisa memproduksi musik meski prompt melarang. Karena itu audio asli klip dibuang dalam mode elevenlabs_only. Foley/ambience dipilih dari ElevenLabs. SFX VideoExpress hanya setelah sumber audio diperiksa dan owner menyetujui.
5. Aksesori mengikuti foto acuan yang disetujui; jika foto lama berkacamata tetapi owner meminta tanpa kacamata, jangan pakai foto tersebut. Sediakan gambar acuan baru yang sudah disetujui.
6. Gunakan Save Last Frame ketika cast, ruangan, waktu, sudut kamera, dan letak semua benda melanjutkan shot sebelumnya; jangan gunakan untuk perpindahan scene dan flashback.
7. Pengaturan: Image Type 3D, Creative OFF, Enhance OFF, 9:16, paling lama 10 detik per klip, no public gallery.
8. Sertakan akhir frame yang cocok dengan awal shot berikut dan filmisasi benda tanpa teleportasi/morphing.
9. Panjang Video Prompt harus muat UI (batas sebelumnya teruji sekitar 4.745 karakter); prompt semua shot AMPLOP V4 kini di bawah batas itu.
10. Jangan gunakan perubahan skill sebagai izin untuk memulai produksi; status AMPLOP tetap auto=false dan image QC gate aktif.

## Susunan reusable

SHOT-ID di baris awal, lalu satu kalimat kamera, satu kalimat karakter dan lokasi, satu larangan suara manusia dan musik.
Timeline: rentang 0:00–0:02, 0:02–0:04, 0:04–0:06, 0:06–0:08, 0:08–0:10.
Setiap rentang menyatakan aksi yang benar-benar berlangsung dan PERMUKAAN WAJAH POLOS tanpa mata, rongga mata, hidung, mulut, lipsync, tanpa garis wajah.
Baris akhir menjelaskan last frame tetap cocok untuk sambungan berikut. Tidak ada blok heading khusus faceless. Tidak ada dialog dalam tanda kutip; dialog hanya dalam JSON ElevenLabs.

## Contoh dari storyboard V4 yang diregenerasi (belum dirender)

### SHOT04 — Tuduhan yang terlalu cepat

Status start image: BARU.

~~~~text
SHOT04:
Camera: The camera is front three-quarter two-shot showing both boys at waist height, static camera, no zoom, focusing on Umair's accusatory pointing gesture and Uwais's still posture. Stable continuous cinematic 3D shot, 10 seconds, vertical 9:16.
Characters and place: Umair has his straight short black hair with light bangs and wears red long-sleeved koko shirt, navy trousers, white sneakers, with the same outfit and accessories exactly as in the reference image for the entire video. Uwais has his short black hair that is wavy and leaning curly and wears warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers, with the same outfit and accessories exactly as in the start image for the entire video. SCALE: real heights Uwais 160 cm, Umair 130 cm. Umair's head reaches the shoulder of Uwais. People standing together share the same floor level so heights compare honestly (sitting people keep the same body proportions); never enlarge a child to an adult's height and never shrink an adult. Keep these height differences exactly; every person is a clearly different individual. DIFFERENCES: Uwais = tallest, lanky beardless teenage boy, bare head with no peci unless stated, wavy, slightly curly black hair, olive-green overshirt over an ivory koko shirt, without glasses.; Umair = child whose head reaches Uwais's shoulder, no glasses, thin straight black hair with light bangs, red koko shirt, black backpack. Never give one person's hair, beard, or clothes to another. Preserve identities, clothing and objects.
Soundtrack: NO speech, NO spoken words, NO narration, NO human voice, NO lip-sync, NO whispering, NO singing, NO music, NO instruments. ElevenLabs supplies all character voices after rendering.
Timeline:
0:00-0:02: Inside the same family dining room, Umair stands on frame left in a red koko shirt and Uwais stands on frame right wearing an olive-green overshirt. They are visibly separate beside the dark wooden table. The blue notebook rests on the table, and the cream envelope is absent. Keep grounded body mechanics, identical clothing, head geometry and room. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. Sound effects are added in ElevenLabs after rendering. No generated audio.
0:02-0:04: Umair raises his right forearm and points once toward the empty part of the table, then turns his open palm toward Uwais. Uwais keeps both hands open and still at his sides, his posture upright. Keep grounded body mechanics, identical clothing, head geometry and room. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. Sound effects are added in ElevenLabs after rendering. No generated audio.
0:04-0:06: Continue that exact motion without inventing extra actions. Keep grounded body mechanics, identical clothing, head geometry and room. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. Sound effects are added in ElevenLabs after rendering. No generated audio.
0:06-0:08: Settle the existing movement with realistic gravity. Keep grounded body mechanics, identical clothing, head geometry and room. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. Sound effects are added in ElevenLabs after rendering. No generated audio.
0:08-0:10: Umair lowers his arm but remains tense; Uwais stands still on the right, facing his younger brother with an entirely blank face. Keep grounded body mechanics, identical clothing, head geometry and room. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. Sound effects are added in ElevenLabs after rendering. No generated audio.
Final frame retains cast, props, clothing and poses for the next linked shot. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. No music. No voices.
~~~~

### SHOT17 — Kakak memaafkan

Status start image: LAST_FRAME dari SHOT16.

~~~~text
SHOT17:
Camera: The camera is front three-quarter medium-wide two-shot at chest height, very slow gradual pullback, focusing on Uwais's forgiving gesture and the relaxed younger brother. Stable continuous cinematic 3D shot, 10 seconds, vertical 9:16.
Characters and place: Uwais has his short black hair that is wavy and leaning curly and wears warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers, with the same outfit and accessories exactly as in the start image for the entire video. Umair has his straight short black hair with light bangs and wears red long-sleeved koko shirt, navy trousers, white sneakers, with the same outfit and accessories exactly as in the reference image for the entire video. SCALE: real heights Uwais 160 cm, Umair 130 cm. Umair's head reaches the shoulder of Uwais. People standing together share the same floor level so heights compare honestly (sitting people keep the same body proportions); never enlarge a child to an adult's height and never shrink an adult. Keep these height differences exactly; every person is a clearly different individual. DIFFERENCES: Uwais = tallest, lanky beardless teenage boy, bare head with no peci unless stated, wavy, slightly curly black hair, olive-green overshirt over an ivory koko shirt, without glasses.; Umair = child whose head reaches Uwais's shoulder, no glasses, thin straight black hair with light bangs, red koko shirt, black backpack. Never give one person's hair, beard, or clothes to another. Preserve identities, clothing and objects.
Soundtrack: NO speech, NO spoken words, NO narration, NO human voice, NO lip-sync, NO whispering, NO singing, NO music, NO instruments. ElevenLabs supplies all character voices after rendering.
Timeline:
0:00-0:02: Begin at the EXACT previous shot final frame, maintaining poses, props, clothing, lighting and camera axis. Keep grounded body mechanics, identical clothing, head geometry and room. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. Sound effects are added in ElevenLabs after rendering. No generated audio.
0:02-0:04: The brothers gently lower the single cream envelope together onto the wooden table, releasing it only when it rests flat. After that Uwais makes one gentle reassuring tap on Umair's upper arm, then withdraws his hand. Keep grounded body mechanics, identical clothing, head geometry and room. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. Sound effects are added in ElevenLabs after rendering. No generated audio.
0:04-0:06: Continue that exact motion without inventing extra actions. Keep grounded body mechanics, identical clothing, head geometry and room. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. Sound effects are added in ElevenLabs after rendering. No generated audio.
0:06-0:08: Settle the existing movement with realistic gravity. Keep grounded body mechanics, identical clothing, head geometry and room. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. Sound effects are added in ElevenLabs after rendering. No generated audio.
0:08-0:10: The same envelope lies flat on the wooden table. Umair remains on frame left and Uwais on frame right, standing calmly side by side with relaxed shoulders. Keep grounded body mechanics, identical clothing, head geometry and room. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. Sound effects are added in ElevenLabs after rendering. No generated audio.
Final frame retains cast, props, clothing and poses for the next linked shot. Every visible face is smooth uninterrupted skin, with no eyes, eye sockets, eyelids, pupils, nose, lips, teeth, or mouth, and no facial motion.  No glasses or eyewear appear. No music. No voices.
~~~~
