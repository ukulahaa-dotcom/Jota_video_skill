---
name: jota-language-learning
version: 3.0.0
description: PB02 video belajar bahasa Arab, Inggris, Jepang, dan Indonesia untuk anak dan keluarga, dengan teks dan pelafalan yang sudah diverifikasi. Mengikuti skills/jota-video/SKILL.md.
---

# PB02: Belajar Bahasa

Baca dulu [`../../SKILL.md`](../../SKILL.md), [`../../references/EDUCATIONAL_WORKFLOW.md`](../../references/EDUCATIONAL_WORKFLOW.md), dan [`../../evals/EDUCATIONAL_QA.md`](../../evals/EDUCATIONAL_QA.md). Bahasa Arab: [`../../presets/ARABIC_LANGUAGE_LESSONS.md`](../../presets/ARABIC_LANGUAGE_LESSONS.md). Lainnya: [`../../presets/GENERAL_SUBJECTS.md`](../../presets/GENERAL_SUBJECTS.md). Template: [`../../templates/LESSON_BRIEF.md`](../../templates/LESSON_BRIEF.md). Contoh (bukan perintah produksi): [`../../examples/ARABIC_BEGINNER_LESSON_EXAMPLE.md`](../../examples/ARABIC_BEGINNER_LESSON_EXAMPLE.md).

## Langkah

1. Tentukan bahasa dan ragam (Arab default fusha), usia, level, bahasa penjelas, tujuan belajar, format output.
2. Satu episode satu keterampilan kecil: 2 sampai 4 kosakata, atau satu dialog pendek. Tidak ada klaim pahala atau agama yang tidak bersumber.
3. Naskah: narator penjelas (TTS boleh karena bukan karakter di layar) atau tokoh yang bicara (native satu job sesuai `SKILL.md` aturan 4). Teks kosakata ditambahkan sebagai overlay di editor, bukan digambar AI.
4. Verifikasi terjemahan, tata bahasa, pelafalan, harakat, dan ejaan oleh orang yang kompeten. Arab: tipografi kanan-ke-kiri yang benar. Jepang: furigana bila perlu.
5. Susun irama: tampilkan kata, ulangi, jeda untuk menirukan, lalu tampilkan jawaban. Beri waktu baca yang cukup.
6. Produksi sesuai alur scene. JOTA 1: wajah kosong, tokoh yang bicara difilmkan tanpa terlihat mulutnya.
7. QC dasar ditambah pemeriksaan edukasi. Teks atau suara yang belum dicek ditulis `NOT_RUN`.

## Hasil

Brief pelajaran, naskah multibahasa dengan terjemahan, master teks Unicode, catatan pelafalan, tabel irama, rencana suara dan teks, status QC edukasi.
