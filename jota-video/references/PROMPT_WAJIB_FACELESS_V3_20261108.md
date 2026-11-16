# PROMPT WAJIB JOTA — ZERO EYES + ZERO MOUTH V3 (2026-11-08)

**Status bukti: LOLOS uji manual owner** pada VideoExpress; 10 detik, Aba berkacamata, voice-over, jumping jacks, lateral hops, squat jump, putaran 360°. V1 mulut muncul saat bicara, V2 mulut hilang tetapi mata muncul sejak awal, **V3 mata dan mulut hilang** menurut pemeriksaan langsung owner. Belum dibuktikan otomatis oleh Runner / dari-brief.

**Keputusan owner: format V3 ini WAJIB untuk semua Video Prompt JOTA berikutnya.** Adaptasi nama tokoh, referensi asli, lokasi, baju, gerak, dialog, kamera, timeline, dan durasi per shot. Pertahankan urutan serta pengunci mata, kacamata (bila ada), mulut, first frame, voice-over, dan last frame. Jangan kembali ke format NATURAL satu paragraf tanpa timeline.

## Pengaturan VideoExpress manual teruji

Image Type **3D** (bukan Human/Photorealistic); **Creative Mode OFF**; **Automatically Enhance OFF**; **Public Gallery OFF**; **9:16**; **10 detik** untuk benchmark. Gambar awal harus sudah faceless, termasuk **kulit kosong di balik kacamata**. Gunakan foto asli / frame hasil sebelumnya sebagai referensi karakter/produk yang sesuai; foto asli produk lebih natural untuk iklan produk. Tanpa musik. Jangan memaksa 15 detik ke klip 10 detik. Penyesuaian 3–10 detik untuk scene lain.

## Kunci wajib saat menulis setiap prompt video

Urutan: **CAMERA DETAILS** → **KEEP FACELESS ENTIRE VIDEO — HIGHEST PRIORITY** → **CRITICAL GLASSES RULE** (jika berkacamata) → **FIRST FRAME FACE LOCK** → **SPEECH FACE LOCK** → **CHARACTER AND ENVIRONMENT** → **STYLE AND COLOR LOGIC** → **AUDIO** → **TIMELINE 0:00 sampai durasi** → **FINAL FACELESS LOCK**.

- Detail gerak per rentang 2 detik untuk klip 10 detik. Di setiap rentang: aksi spesifik berurutan, arah, kontak kaki, berat, gravitasi, kain, framing, dan **SFX** yang cocok.
- Dialog sebagai **external Indonesian voice-over**, bukan tokoh bicara atau lipsync. Suara tidak mengubah geometri wajah.
- Saat voice-over terjadi, ulangi wajah tetap polos. **Tepat setelah SETIAP ucapan**, ulangi instruksi: `Immediately after the final spoken word, keep his eyes absent, his mouth absent, and his entire face completely faceless.` Sesuaikan his/her.
- Selalu nyatakan **0:00 first frame sudah kosong**, bukan hanya meminta wajah menjadi polos selama video. Di balik setiap lensa kacamata harus kulit polos, **tanpa mata, pupil, kelopak, rongga mata, atau bayangan berbentuk mata**.
- Di setiap sudut, termasuk sisi, belakang, putaran 360°, wajah konsisten. Akhir prompt wajib `Keep his blank face perfectly smooth until the end.` (ganti gender sesuai karakter).
- Faceless berlaku untuk semua manusia, tanpa mata hidung mulut; hewan tanpa mata, tidak menampilkan Allah/nabi/malaikat. Semua hadis wajib sahih dan bersumber. Tidak ada musik.
- Pengaturan dan hasil ini diuji **manual oleh owner**, belum menjadi bukti bahwa generator `dari-brief.mjs` atau Runner mengeluarkan format V3. Saat integrasi, bandingkan prompt aktual dan QA frame output.

## Master video prompt (benchmark LOLOS owner, 10 detik)

```text
CAMERA DETAILS: High-quality cinematic 3D animation, stable medium-wide full-body shot at chest height, natural 35mm lens perspective, soft and evenly distributed morning sunlight, stable exposure, and consistent camera framing. The camera remains fixed in front of Aba during the entire 10-second video, keeping his complete body visible from head to sandals. There are no cuts, no face close-ups, no sudden camera rotations, and no sudden zooms.

KEEP FACELESS ENTIRE VIDEO — HIGHEST PRIORITY: Aba must have exactly the same completely blank and featureless face in every frame, beginning with the very first frame at 0:00 and continuing without interruption until 0:10. His entire face is one continuous, smooth, uniformly skin-colored surface extending from his forehead to his chin. The facial surface is perfectly flat and featureless around the eye area, with no eye sockets, eyeballs, eyelids, pupils, irises, eyelashes, eyebrows, or eye-shaped shadows. There is no nose, mouth, lips, teeth, tongue, mustache, or beard. Nothing resembling human facial anatomy can appear at any time.

CRITICAL GLASSES RULE: Aba wears black-framed glasses with clear lenses positioned over a perfectly smooth, uninterrupted skin-colored surface. Behind both lenses there is only flat, blank skin. There are no eyes, no dark circles, no eyelids, no pupils, no eye sockets, and no facial features behind the glasses. The lenses may reflect the bright courtyard environment, but they must never reveal or generate eyes. The glasses are only an accessory attached to his completely featureless head.

FIRST FRAME FACE LOCK: At exactly 0:00, before any movement or audio begins, Aba is already completely faceless. His glasses rest over smooth blank skin, with no visible eyes behind either lens. This initial facial appearance is the permanent reference for every subsequent frame. His face never changes shape, texture, or geometry during jumping, rotation, or voice-over.

SPEECH FACE LOCK: All Indonesian dialogue is heard as external voice-over, never as visible character speech. Aba does not move his mouth, lips, cheeks, or jaw when the voice is heard. His face remains exactly identical during audio and silence, with smooth blank skin behind the glasses and no facial movement.

CHARACTER AND ENVIRONMENT: Aba is a 46-year-old Indonesian Muslim father with short textured black hair and medium-brown skin. He wears a plain white thobe, a black wristwatch, black sandals, and black-framed glasses. His head shape, hairstyle, glasses, clothing, and body proportions match the original faceless reference image. He stands on green grass in a peaceful Indonesian village courtyard with a large mango tree and warm morning sunlight.

STYLE AND COLOR LOGIC: High-quality cinematic stylized 3D animation, consistent character geometry, realistic gravity, natural body movement, accurate foot contact, believable clothing physics, bright but soft daylight, realistic green foliage, and balanced facial lighting that keeps the blank skin surface clearly visible.

AUDIO: One warm, energetic adult Indonesian male voice heard as external voice-over. Natural morning birds, gentle breeze, realistic footsteps, landing impacts, and fabric movements. The voice never triggers facial animation. No music.

TIMELINE:

0:00-0:02: Aba stands upright facing the camera, his entire face already completely blank and smooth from the first frame. His black glasses clearly cover two areas of uninterrupted skin-colored surface with no eyes, eyelids, pupils, or eye-shaped shadows. He raises his right hand in a friendly greeting. An external Indonesian male voice-over says: "Ayo, semangat!" Aba does not visually speak, and his face remains perfectly smooth throughout the voice-over. Immediately after the final spoken word, keep his eyes absent, his mouth absent, and his entire face completely faceless. He lowers his hand and bends his knees in preparation for jumping. SFX: (morning birds, gentle breeze, light clothing movement).

0:02-0:04: Aba performs two energetic jumping jacks. He pushes upward using both feet, spreads his legs outward while raising both arms above his head, then lands with bent knees. He performs a second jump, bringing his feet together and lowering his arms. His white thobe moves naturally with gravity and his glasses remain firmly attached. Throughout both jumps, the skin behind his glasses remains perfectly blank, smooth, and featureless, without any eyes appearing. His mouth also remains completely absent. SFX: (two soft landing impacts, grass compression, fabric swishes).

0:04-0:06: Aba performs two lateral hops, first toward the left side of the frame and then back toward the right. He shifts his weight naturally, pushes off from one foot, travels approximately half a meter, and lands with controlled knee bends. His arms move naturally for balance and his thobe swings with realistic momentum. His head stays upright and his glasses retain their original shape. The face beneath his glasses remains a completely smooth skin-colored surface with no eyes, eye sockets, nose, mouth, or facial movement. SFX: (two quick footsteps, grass impacts, fabric movement).

0:06-0:08: Aba bends both knees into a controlled squat and performs one powerful vertical jump. Both feet leave the ground before landing with natural knee flexion. Immediately after landing, he begins turning his entire body clockwise using small pivoting steps. His right-side profile, back, and left-side profile become visible as the rotation progresses. His head rotates naturally with his torso. From every angle, his head retains a smooth featureless facial surface without eye sockets, nose protrusions, mouth shapes, or eyelids. His black glasses remain firmly attached without revealing eyes. SFX: (strong landing thud, sandal shuffling, fabric swirling).

0:08-0:10: Aba completes his full 360-degree body rotation and returns to face the camera. His face looks exactly identical to the first frame: completely blank skin behind both glasses lenses, without eyes, pupils, eyelids, eyebrows, nose, mouth, or lips. He straightens his posture and places his right hand over his chest. An external Indonesian male voice-over says: "Alhamdulillah!" Aba does not visually speak. During the entire voice-over, the face behind his glasses stays completely blank and motionless. Immediately after the final spoken word, keep his entire face perfectly smooth and featureless, with no eyes or mouth appearing. The camera holds the complete full-body framing through the final frame. SFX: (gentle breeze, distant birds, subtle clothing movement).

FINAL FACELESS LOCK: At every moment from 0:00 through 0:10, Aba's face must remain exactly identical to the original completely blank faceless reference image. The area behind both glasses lenses is smooth, uninterrupted, uniformly skin-colored skin with no eyes, eyelids, eye sockets, pupils, eyebrows, or eye-shaped shadows. There is no nose, mouth, lips, teeth, or facial animation. All speech remains external voice-over without lip-sync. His face stays perfectly blank during standing, jumping, landing, turning, and speaking. Maintain consistent character geometry, clothing, glasses, hairstyle, and natural body motion. Natural sound effects and voice-over only. No music. Keep his blank face perfectly smooth until the end.
```

## Riwayat pengujian untuk diagnosis

- V1: prompt karakter "Aba says" → mulut muncul.
- V2: suara external voice-over → mulut hilang, tetapi mata muncul sejak 0:00.
- V3: pengunci **first frame + eye sockets + kacamata dengan kulit kosong + speech lock** → owner konfirmasi **berhasil** pada 2026-11-08.
