---
name: jota-educational-explainers
version: 3.0.0
description: PB03 video penjelasan matematika, sains, kesehatan, alam, dan keterampilan hidup dengan animasi yang benar-benar menunjukkan proses. Mengikuti skills/jota-video/SKILL.md.
---

# PB03: Video Penjelasan Edukasi

Baca dulu [`../../SKILL.md`](../../SKILL.md), [`../../references/EDUCATIONAL_WORKFLOW.md`](../../references/EDUCATIONAL_WORKFLOW.md), [`../../presets/GENERAL_SUBJECTS.md`](../../presets/GENERAL_SUBJECTS.md), [`../../evals/EDUCATIONAL_QA.md`](../../evals/EDUCATIONAL_QA.md). Template: [`../../templates/LESSON_BRIEF.md`](../../templates/LESSON_BRIEF.md).

Untuk menjelaskan cara kerja sesuatu. Sejarah situs masuk PB04, peninggalan terkait nabi PB05, kisah agama PB06.

## Langkah

1. Satu tujuan belajar yang bisa dicek, usia penonton, hasil yang diharapkan, satuan dan variabel, miskonsepsi umum.
2. Buat daftar fakta bersumber. Matematika: cek setiap langkah hitung. Sains: cek mekanisme sebab-akibat. Kesehatan: sumber tepercaya dan review ahli; penjelasan umum, bukan diagnosis.
3. Animasi harus menunjukkan proses yang bergerak, bukan beberapa gambar diam yang di-zoom.
4. Urutan: pertanyaan → contoh nyata → peragaan mekanisme → cek pemahaman → jawaban. Rumus dan istilah ditambahkan sebagai teks editor, bukan digambar AI.
5. JOTA 1: semua wajah kosong, tanpa musik. Organ dalam diagram anatomi boleh, harus akurat.
6. QC: rasio, tempo, keterbacaan, suara, sumber, akurasi, hak pakai, aturan mode.
7. `QUALITY_GATE_LOCKED` hanya berlaku untuk pipeline MVP lokal di repo (`backend/`, `animation/`), bukan untuk produksi JOTA di VideoExpress.

## Hasil

Brief pelajaran, daftar fakta, storyboard mekanisme, prompt scene, master teks, status QC edukasi.
