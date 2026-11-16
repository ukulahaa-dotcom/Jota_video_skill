---
name: jota-faceless-family-stories
version: 3.29.0
description: PB01 cerita keluarga, fabel hewan, dan kisah moral fiksi untuk keluarga. Biasanya JOTA 1 faceless. Mengikuti skills/jota-video/SKILL.md.
---

# PB01: Cerita Keluarga dan Fabel Moral

Baca dulu [`../../SKILL.md`](../../SKILL.md), [`../../references/CONSISTENCY_RULES.md`](../../references/CONSISTENCY_RULES.md), dan [`../../references/PROMPT_PROFESIONAL.md`](../../references/PROMPT_PROFESIONAL.md). Untuk JOTA 1 baca [`../../references/FACELESS_CHARACTER.md`](../../references/FACELESS_CHARACTER.md).

Untuk cerita fiksi sehari-hari, fabel hewan, petualangan keluarga, dan nilai seperti jujur, sabar, berbagi. Kisah nabi atau sahabat masuk PB06. Situs bersejarah masuk PB05.

## Langkah

1. Tentukan penonton, satu nilai moral, premis fiksi, dan satu pilihan sulit tokoh. Tandai `FIKSI`. Jangan mengarang ayat, hadis, atau kutipan agama.
2. Buat character bible: alias peran, pakaian, warna, siluet, proporsi, gambar acuan. Tidak memakai foto atau nama asli anak. Kalau naskah menyebut lima saudara, pastikan lima muncul di setiap shot terkait.
3. Bentuk suara mengikuti kartu pengaturan: DIALOG antar tokoh (default), NARATOR, atau keduanya. Alur: pembuka yang memancing rasa ingin tahu → masalah → usaha → akibat → penyelesaian, pesan ditunjukkan lewat aksi.
4. Susun bible, peta lokasi, buku keadaan, dan tabel scene sesuai `../../SKILL.md` 4B langkah 3, termasuk pembuka dan penutup. Jaga arah layar (tokoh yang di kiri tetap di kiri) dan posisi properti.
5. Produksi sesuai `../../SKILL.md` 4B: SC01 KEYFRAME, scene berikutnya SAMBUNG dari frame terakhir kecuali pindah lokasi atau lompatan waktu. Semua prompt memakai template PRO.
   - JOTA 1: metode B kartun wajah polos (S28 default, S40 untuk 3D), lihat `../../references/FACELESS_CHARACTER.md`. Dialog native satu job diterima; mata dan hidung tidak pernah ada, mulut hanya saat bicara. Tanpa musik; suara latar dari katalog `PROMPT_PROFESIONAL.md` bagian 5. Manekin S25 sampai S27 hanya kalau owner memilihnya.
   - JOTA 2: ikuti PB07 untuk akting wajah.
6. Cek prompt sebelum Create sesuai `../../SKILL.md` bagian 6 dan [`../../evals/CHECKLIST.md`](../../evals/CHECKLIST.md): jumlah tokoh, dialog milik tokoh yang benar, tidak ada narator di film dialog, arah layar, privasi. Hasil dinilai owner.

## Hasil

Paket prompt (`PROMPTS.md`) dan `RUN_STATE.json` di folder produksi. Video sampai MP4 di Drive bila owner memerintahkan lewat kartu pengaturan.

## Proyek berjalan

Daftar dan status produksi: [`../README.md`](../README.md).
