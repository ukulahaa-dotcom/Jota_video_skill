---
name: jota-prophets-companions-moral-histories
version: 3.0.0
description: PB06 kisah nabi, sahabat, dan orang zalim yang tercatat dalam sumber, bahasa Indonesia, tanpa menggambarkan nabi, dengan ibrah yang jelas. Mengikuti skills/jota-video/SKILL.md.
---

# PB06: Kisah Para Nabi, Sahabat, dan Orang Zalim

Baca dulu [`../../SKILL.md`](../../SKILL.md), [`../../references/ISLAMIC_HISTORY_SOURCE_POLICY.md`](../../references/ISLAMIC_HISTORY_SOURCE_POLICY.md), dan [`../../references/VIDEOEXPRESS_PROVIDER_LOCK.md`](../../references/VIDEOEXPRESS_PROVIDER_LOCK.md). Video Nabi Nuh 2026-10-21 yang dibuat di luar VideoExpress berstatus `NONCOMPLIANT_REJECTED` dan bukan hasil PB06.

## Pilih satu kategori

- `QURANIC_PROPHET`: hanya dari Al-Qur'an, hadis, dan tafsir bernama. **Nabi tidak digambarkan**: tanpa tubuh, tangan, siluet, jejak kaki sebagai avatar, atau suara yang diklaim suara beliau.
- `SAHABI_HISTORY`: riwayat dengan sumber dan status keshahihan. JOTA 1: sahabat bernama boleh diperankan sebagai tokoh kartun faceless S28 (keputusan owner 2026-10-31), setiap aksi dan ucapan dari sumber. Rasulullah tetap tidak tampil; kehadiran beliau hanya disebut narator. Di luar JOTA 1 faceless: tidak memerankan sahabat bernama.
- `QURANIC_OPPRESSOR`: Fir'aun, Qarun, kaum terdahulu, sesuai sumber. Bedakan azab yang disebut sumber dari adegan bencana karangan.
- `FICTIONAL_AKHLAQ`: cerita karangan berlabel `FIKSI INSPIRATIF`, tidak disebut kejadian nyata atau hadis.
- `OTHER_HISTORICAL`: tokoh sejarah lain dengan nama, waktu, dan tingkat kepastian yang jelas.

## Langkah

1. Satu ibrah yang bisa dipraktikkan, bukan mempermalukan.
2. Kumpulkan sumber: ayat, nomor hadis, derajat, tafsir, makna Arab dan Indonesia. Tandai yang lemah atau diperdebatkan.
3. Setiap kalimat bermuatan klaim punya `CLAIM_ID` di ledger. `UNSUPPORTED` memblokir naskah. Tidak mengarang ucapan langsung kalau sumber tidak menyebutnya.
4. Naskah Shorts (default fase latihan) mengikuti format 2A di `../../references/STORYTELLING_FILM.md`: satu kejadian bersumber, satu pesan. Naskah film YouTube mengikuti struktur episode di file yang sama (hook, pembuka channel, dunia saat itu, pengenalan, pemicu, ketegangan, klimaks, balik arah, penutup dengan pelajaran). Konteks zaman ditandai `KONTEKS`, adegan pengisi ditandai `PENGISI` di ledger. Bedakan parafrase narator dari kutipan suci.
5. Storyboard: lokasi, arsitektur, benda, tangan orang tanpa nama, geografi, teks kaligrafi dan overlay. Tidak ada properti yang salah zaman.
6. Suara: narasi bahasa Indonesia oleh narator non-karakter, tanpa musik, tanpa lip-sync. Tidak meniru suara tokoh mulia.
7. Produksi sesuai alur scene di `SKILL.md`. Orang biasa yang tampil tanpa wajah.
8. QC: setiap visual, suara, kutipan, penggambaran, kronologi, lisensi, privasi. Yang tidak bersumber atau terlarang ditolak.
9. Owner melihat kandidat private. Publish dengan izin terpisah.

## Batas tema

Akhiri dengan pelajaran pribadi yang membumi (sabar, tawakal, dermawan, rendah hati, batas kekuasaan dunia). Jangan menyebut bencana modern sebagai azab atau menyebut orang hidup sebagai tokoh zalim Al-Qur'an.

## Hasil

Kategori, ledger sumber, ibrah, naskah per bagian, tabel scene, aturan tokoh dan latar, QC suara dan teks.
