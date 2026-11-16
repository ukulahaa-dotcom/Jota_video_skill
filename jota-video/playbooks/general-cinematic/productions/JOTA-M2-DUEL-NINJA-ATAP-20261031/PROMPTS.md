# JOTA-M2-DUEL-NINJA-ATAP-20261031

Video uji format prompt. Owner 2026-10-31: "uji dulu ya yang profesional, coba bikin 3 adegan pertarungan ninja pakai jota 2 saja", lalu memilih 16:9 dan "Paragraf saja".

**Pengecualian tercatat:** prompt video ditulis sebagai satu paragraf mengalir (gaya system prompt resmi VideoExpress, repo ai-playbooks/videoexpress-two-character-agent, 2026-10-30), bukan template PRO berlabel. Tujuan: membandingkan hasilnya dengan produksi lama yang memakai template berlabel. Aturan lain skill tetap berlaku (SAMBUNG, gallery OFF, setelan, G11).

Kartu: 1B JOTA 2, 2A 16:9, 3C S12, 4B 3 scene, 5A dialog, 6A VideoExpress, 7A dengan judul, 8H G11 laga.

## Cerita
Kaito dan Ren, dua murid ninja, berlatih duel tangan kosong di dek kayu atap dojo gunung saat matahari terbenam. SC01 saling memberi hormat dan pertukaran pertama. SC02 Ren menyapu rendah, Kaito mundur lalu membalas, Ren menahan dengan dua lengan. SC03 serangan terakhir bertemu di tengah, keduanya tertawa, memberi hormat; kamera naik ke wide. G11: tanpa senjata, tanpa darah, tanpa luka.

## Character bible
- **CH01 Kaito:** teenage boy ninja apprentice about 16, slim and slightly taller than Ren, short spiky black hair with a red cloth headband, warm brown eyes, charcoal-grey wrap gi with a red sash, black cloth forearm wraps, dark split-toe tabi socks. Moves fast and bouncy. Voice: young, eager.
- **CH02 Ren:** teenage girl ninja apprentice about 16, athletic, long black hair in a high ponytail tied with a teal cord, dark brown eyes, navy-blue wrap gi with a teal sash, grey cloth forearm wraps, dark split-toe tabi socks. Moves calm and precise. Voice: confident, light teasing.
- Identity tags (diulang kata per kata): `Kaito, the teenage boy with short spiky black hair, a red headband and a charcoal-grey gi with a red sash` dan `Ren, the teenage girl with a long black high ponytail and a navy-blue gi with a teal sash`.

## Props bible
Tidak ada senjata. Satu lonceng perunggu besar di rangka kayu. Tidak ada benda lain di dek.

## Peta lokasi: dek atap dojo
LAYOUT: a flat wooden training deck on top of a mountain dojo; one large bronze bell hanging in a dark wooden frame at the far left edge of the deck; one tall twisted pine tree at the far right edge; a low curved tile roof ridge behind the deck; misty mountain valley and orange sunset clouds in the background. Camera side: side-on from the front edge of the deck. Kaito always screen left facing right, Ren always screen right facing left. Light: low setting sun on the right, warm orange rim light, soft cool shadows to the left.

## Tabel scene
| SC | Metode | Alasan | Keadaan awal | Aksi | Keadaan akhir | Framing akhir |
|---|---|---|---|---|---|---|
| SC01 | KEYFRAME | Scene pertama | Berdiri tegak 3 m berhadapan, tangan di sisi | Bow, kuda-kuda, Kaito pukul telapak, Ren tangkis, mundur | Kuda-kuda 2 m, napas berat, angin di baju | Medium wide side-on |
| SC02 | SAMBUNG | Lokasi dan waktu sama | Sama dengan akhir SC01 | Ren sapu rendah, Kaito mundur dua langkah, balas telapak, Ren tangkis silang, terdorong satu langkah | Kuda-kuda 2 m lagi, tersenyum tipis | Medium wide side-on |
| SC03 | SAMBUNG | Lokasi dan waktu sama | Sama dengan akhir SC02 | Melangkah maju, lengan bertemu di tengah, tahan, tertawa, mundur, bow | Berdiri tegak saling hormat, matahari hampir tenggelam | Wide, kamera naik |

## Gambar acuan
CH01-KAITO-REF-v1:
```text
Full-body character reference of Kaito: a teenage boy ninja apprentice about 16 years old, slim build, short spiky black hair with a red cloth headband, warm brown eyes, friendly face, wearing a charcoal-grey wrap gi with a red sash, black cloth forearm wraps and dark split-toe tabi socks. Standing straight, front view, neutral relaxed pose, friendly calm expression, mouth closed, eyes open looking at the camera. Plain pure white background, even studio lighting, no props, no text. original high-quality 3D animated family film style, soft global illumination, expressive stylized characters, rich detailed environments
```
CH02-REN-REF-v1:
```text
Full-body character reference of Ren: a teenage girl ninja apprentice about 16 years old, athletic build, long black hair in a high ponytail tied with a teal cord, dark brown eyes, confident face, wearing a navy-blue wrap gi with a teal sash, grey cloth forearm wraps and dark split-toe tabi socks. Standing straight, front view, neutral relaxed pose, friendly calm expression, mouth closed, eyes open looking at the camera. Plain pure white background, even studio lighting, no props, no text. original high-quality 3D animated family film style, soft global illumination, expressive stylized characters, rich detailed environments
```

## SC01 Image Prompt (SC01-IMG)
```text
An original high-quality 3D animated family film still, a medium-wide side-on shot at chest height of a flat wooden training deck on top of a mountain dojo at sunset. Kaito, the teenage boy with short spiky black hair, a red headband and a charcoal-grey gi with a red sash, stands on the left third of the frame facing right, feet together, arms relaxed at his sides, looking straight at Ren with an eager half-smile. Ren, the teenage girl with a long black high ponytail and a navy-blue gi with a teal sash, stands on the right third facing left, about three meters away, arms at her sides, chin slightly raised, a calm confident smile. One large bronze bell hangs in a dark wooden frame at the far left edge of the deck, one tall twisted pine tree stands at the far right edge, a low curved tile roof ridge runs behind them, and a misty mountain valley with orange sunset clouds fills the background. The low setting sun on the right throws a warm orange rim light along both figures and long soft shadows to the left across the wooden planks. Both full bodies sit inside the center of the frame with open deck space between them for the coming fight.
```

## SC01 Video and Audio Prompt
```text
SC01: Hormat dan pukulan pertama. The medium-wide side-on shot holds on the wooden training deck on top of the mountain dojo at sunset, warm orange light from the low sun on the right and a light wind tugging at both gi sleeves. From the very first frame Kaito, the teenage boy with short spiky black hair, a red headband and a charcoal-grey gi with a red sash, and Ren, the teenage girl with a long black high ponytail and a navy-blue gi with a teal sash, bow to each other at the same time, then slide their right feet back and raise their open hands into a fighting stance. Ren tilts her head and says in Indonesian with a light teasing voice, "Siap, Kaito? Jangan menahan diri." Kaito grins and answers in Indonesian, "Kamu yang harus siap!" A moment later Kaito steps forward and pushes a fast open-palm strike toward Ren's shoulder, and Ren sweeps it aside with her forearm in one smooth motion. Both spring back one step, knees bent, breathing hard, eyes locked on each other, as the camera pushes in slowly until both full bodies fill the frame side by side. They end about two meters apart in a ready stance, still shifting their weight and moving their hands, Kaito on the left and Ren on the right. Close sounds of bare feet sliding on wooden planks, the sharp slap of forearm on forearm, cloth snapping in the wind, and a distant hawk cry over the valley.
```

## SC02 Video and Audio Prompt (SAMBUNG, gambar awal SC01-END-v1)
```text
SC02: Sapuan rendah. Continue directly from the selected frame, the same motion continues from the very first frame: the medium-wide side-on shot on the wooden deck at sunset, Kaito, the teenage boy with short spiky black hair, a red headband and a charcoal-grey gi with a red sash, on the left and Ren, the teenage girl with a long black high ponytail and a navy-blue gi with a teal sash, on the right, both already circling in their ready stance. Initially Ren drops low and swings a sweeping kick along the planks toward Kaito's ankles, and Kaito takes two quick steps back so her leg passes just in front of his feet. A moment later Kaito plants his front foot and drives a straight open-palm push toward Ren, and she crosses both forearms in front of her chest to block it, her feet sliding back one step on the boards with a scrape. The camera tracks sideways with them at the same height, keeping both full bodies in frame. Ren laughs once under her breath and Kaito shakes out his hand with a playful wince. They finish two meters apart again in a ready stance, chests rising and falling, still moving their hands, Kaito on the left and Ren on the right. No one speaks words; only sharp breaths, the thud of feet on wood, the scrape of tabi on planks, cloth snapping in the wind and the same distant hawk cry over the valley.
```

## SC03 Video and Audio Prompt (SAMBUNG, gambar awal SC02-END-v1)
```text
SC03: Imbang lagi. Continue directly from the selected frame, the same motion continues from the very first frame: the medium-wide side-on shot on the wooden deck, the sun now touching the mountains on the right, Kaito, the teenage boy with short spiky black hair, a red headband and a charcoal-grey gi with a red sash, on the left and Ren, the teenage girl with a long black high ponytail and a navy-blue gi with a teal sash, on the right. Initially both step in at the same time and their forearms meet in the center of the deck with a solid thud, and they push against each other, arms trembling, faces close and determined. A moment later Kaito's mouth breaks into a laugh, Ren laughs too, and they both step back and lower their hands. Kaito says in Indonesian, "Imbang lagi." Ren answers in Indonesian with a grin, "Besok aku yang menang." They straighten up and bow to each other while the camera slowly pulls back and rises above the deck until the bronze bell on the left, the pine on the right and the orange valley all fill a wide frame. Both keep moving gently, rolling their shoulders and turning toward the sunset until the very last frame. Soft wind across the rooftop, cloth rustling, their light laughter, one soft ring of the bronze bell touched by the wind, and the distant hawk cry fading over the valley.
```
