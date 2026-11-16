---
name: jota-general-cinematic
version: 3.29.0
description: PB07 film fiksi sinematik ekspresif mode JOTA 2, termasuk vlog karakter, dengan wajah, lip-sync native, dan musik berlisensi. Mengikuti skills/jota-video/SKILL.md.
---

# PB07: Film Sinematik Umum (JOTA 2) - DIARSIPKAN

**Tidak dipakai sejak v3.51: JOTA 2 dihapus atas keputusan owner 2026-11-01 (melanggar syariat). Semua video faceless memakai playbook lain. File ini hanya sejarah.**

Baca dulu [`../../SKILL.md`](../../SKILL.md), [`../../references/CREATIVE_MODES.md`](../../references/CREATIVE_MODES.md), [`../../references/PROMPT_PROFESIONAL.md`](../../references/PROMPT_PROFESIONAL.md), dan [`../../references/SCENE_WORKFLOW.md`](../../references/SCENE_WORKFLOW.md).

Dipakai hanya kalau owner memilih JOTA 2 untuk video ini. Kata "cinematic", cerita hewan, atau gambar referensi bukan berarti JOTA 2.

## Arahan kreatif

- **Wajah:** ekspresi, tatapan, dan gerak mulut boleh. Anatomi konsisten, tidak ada wajah atau tangan tambahan yang aneh.
- **Dialog:** satu job native per scene (video + suara bersama, Video Only OFF). Hanya tokoh yang bicara yang menggerakkan mulut. Narator hanya kalau diminta.
- **Musik:** tidak dibuat oleh generator klip. Musik berlisensi jelas, kalau dipakai, ditambahkan saat rakit, di bawah suara dialog.
- **Kamera:** pakai [`../../references/CAMERA_LANGUAGE.md`](../../references/CAMERA_LANGUAGE.md). Variasi sudut dibuat lewat gerakan kamera di dalam scene (push in, arc, crane), karena scene disambung tanpa potongan. Arah layar konsisten, aksi fisik terlihat. Vlog memakai pola selfie.
- **Gaya:** 2D, 3D, atau sinematik lain sesuai brief, desain original. Tidak meniru karakter atau adegan berhak cipta.

## Langkah

1. Kunci karakter dan lokasi (gambar acuan latar putih, character bible).
2. Naskah dialog dengan nama pembicara per baris, lalu tabel scene.
3. Ikuti `../../SKILL.md` 4B: SC01 dan scene KEYFRAME memakai Image Prompt + Video and Audio Prompt; scene SAMBUNG memakai frame terakhir + Video and Audio Prompt saja. Semua prompt template PRO.
4. Karakter hewan yang bicara: kerjakan SC01 dulu, catat di `RUN_STATE.json` bahwa lip-sync hewan belum teruji, lalu lanjut. Owner yang menilai kecocokan mulut dan suara.
5. Agen mengecek setelan dan frame sambungan; owner menilai klip dan film utuh. Jangan menolak klip hanya karena ada wajah.
6. Owner menyetujui revisi yang persis, export private. Publish dengan izin terpisah.

## Pelajaran dari produksi sebelumnya

- Film Kancil V1 `740550` ditolak owner: video dibuat Video Only lalu ditempel TTS, mulut dan suara tidak sinkron. Jangan diulang.
- Pilot lip-sync HD `45868259` keluar 5,042 detik walau diminta 6 detik, dan belum lulus QC audio-visual. Ukur durasi aktual.

## Konten agama

Kalau cerita memakai tokoh atau klaim agama nyata, aturan sumber dan larangan penggambaran tetap berlaku. Tawarkan versi fiksi sekuler kalau perlu.
