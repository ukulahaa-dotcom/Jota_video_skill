# Image Prompt JOTA — Face-Free V5.0.0 (2026-11-08)

**Status:** aktif untuk pembuatan gambar JOTA yang baru, gambar OUTPUT harus diaudit visual; bukan jaminan generator mematuhi larangan mata. Skill JOTA 4.20.3, Runner 0.18.2, Prompt video tetap V4.0.0. Gambar VideoExpress lama sudah dihapus owner. Tidak boleh memakai referensi/nama lama tanpa bukti file ada.

## Kontrak prompt

- Baris awal: VERTICAL 9:16 FACELESS 3D ANIMATED STILL. ZERO FACIAL FEATURES IS THE TOP PRIORITY.
- Jelaskan facial geometry sebagai bidang kulit tanpa struktur: tidak boleh ada mata, pupil, lubang mata, alis, hidung atau tonjolan hidung, mulut, bibir, gigi, jenggot, kacamata, masker. Bukan sekadar kata "faceless".
- Setelah face lock: kamera dan arah kepala. Untuk risiko tinggi default **REAR CAMERA ONLY**, tokoh menghadap menjauhi kamera. Jangan ada frontal/profile face; tunjukkan rambut, bahu, tangan, dan gerak tubuh.
- Jumlah tokoh, nama, umur yang tepat dan tinggi relatif, pakaian, lalu pose tangan dan letak seluruh benda: jangan biarkan model menebak.
- Ruang dan cahaya konsisten: meja kayu gelap, tirai di kiri, rak rendah di kanan, dinding krem, lantai pucat; jangan masukkan benda yang tak disebut dalam shot.
- Penutup: ulangi bahwa jika bidang wajah terlihat maka hanya kulit polos tanpa mata dan mulut. No extra characters, duplicated props, logo, or text.
- Image Type 3D, Automatically Enhance OFF, Creative Mode OFF, Gallery OFF. Tidak membuat video atau audio pada tahap ini.
- Tanpa referensi karena owner telah menghapus seluruh gambar VideoExpress: b.image_reference_policy="none", s.refs kosong, consistent_character=false. Jangan diam-diam memakai Uwais_soleh maupun Uwais_kacamata.
- **Batas platform:** tanpa Reference Photo, UI VideoExpress dapat memberi pratinjau 1 gambar tanpa tombol Save Image. Gunakan b.image_preview_only=true untuk membuat gambar V5 baru, mengunduh PNG dan menulis awal/image-stage.json berisi PREVIEW_ONLY/can_use_from_library=false/owner_approved=false. Itu BUKAN kandidat library atau gambar siap render. Ketika visual lolos, perlu transfer/import gambar terpilih ke library atau workflow terbukti yang bisa Save Image sebelum menjalankan video.
- Setelah setiap generasi, buka gambar nyata; jika masih ada mata, mulut, kacamata, atau figur dewasa menggantikan Uwais 15 tahun, tolak. Jangan meloloskan gambar dari hasil workflow GitHub success.

## Audit awal proyek

Proyek image batch: `gpt/productions/JOTA-M1-AMPLOP-HILANG-UWAIS-20261108/image-v5`, tag `AMPI50`, 11 gambar BARU yang akan dibuat, 7 sambungan Last Frame di storyboard (tidak dibuat pada tahap gambar). Seluruh gambar lama tidak digunakan. Status gate:gambar; tidak ada produksi video.

## Sampel prompt aktual SHOT03

```text
VERTICAL 9:16 HIGH QUALITY FACELESS 3D ANIMATED STILL. ZERO FACIAL FEATURES IS THE TOP PRIORITY. VERY IMPORTANT ART DIRECTION: Human heads are blank uninterrupted natural skin-colored shapes, like smooth unpainted featureless 3D animated characters. Zero eyes, zero eye sockets, zero eyelids, zero eyebrows, zero pupils, zero nose or nose bump, zero nostrils, zero mouth, zero lips, zero teeth, zero beard, zero glasses. Blank surface is real skin, NOT a mask and NOT a face covering; no shadows or dots resembling eyes. REAR CAMERA ONLY. Camera behind the characters at shoulder height, everyone faces AWAY from camera. No frontal or profile view of any face. Show backs of heads and hands, not faces. CAST: Exactly 1 human characters. Uwais: exactly a 15-year-old Indonesian child or teenager, about 160 cm, wearing warm ivory long-sleeved koko shirt with a standing collar, open olive-green overshirt with a chest pocket, relaxed beige trousers ending above the ankles, off-white sneakers. POSE: Rear three-quarter view. ONE 15-year-old Uwais, slim, smaller shoulders than an adult, short wavy dark hair, olive overshirt over ivory koko, beige trousers. He stands at the wooden dining table with both hands EMPTY. His right palm hovers several centimeters above a paper envelope, about to move it away from water. Head facing away from camera. PROPS AND ROOM: ONE small cream envelope with ONE narrow blue stripe lies FLAT ON THE TABLE, dry corner beside a few water droplets. ONE closed blue notebook lies farther from the water. The envelope is NOT held by any hand. A simple modest Indonesian family dining room: cream walls, ONE dark rectangular wooden table, low wooden shelf on the right, curtained left window, pale tile floor, warm soft morning sunlight. Keep the background furniture consistent between shots. Do not add objects other than ones specifically listed for the shot. Keep physically plausible body proportions, no extra people, no duplicates, no random objects, no text, no logos. FINAL IMAGE CHECK: Every visible face area is ONE continuous blank skin-colored surface. Absolutely no eyes, sockets, eyebrows, nose, mouth, lips, beard or glasses. If rear-only, show no facial plane whatsoever.
```
