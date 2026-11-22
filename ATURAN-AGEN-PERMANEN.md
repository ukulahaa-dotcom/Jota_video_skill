# Blok aturan permanen untuk AGENTS.md / CLAUDE.md (semua worker JOTA)

Tempel blok ini di bagian atas AGENTS.md proyek JOTA, dan buat CLAUDE.md berisi baris `@AGENTS.md`.

## STANDAR PERMANEN OWNER 2026-11-22 (WAJIB, berlaku untuk Claude, ChatGPT, Codex, dan worker mana pun)
Sebelum mulai pekerjaan video JOTA apa pun, baca `skills/jota-video/references/STANDAR_SINEMATIK_KANG_OHAN.md` (bagian STANDAR PERMANEN WAJAH) dan `skills/artistly-runner/RESEP_KISAH.md`. Aturan di bawah mengalahkan aturan lama yang bertentangan di file mana pun.
1. **Kamera bebas, tidak menghindari wajah** di close-up, medium, maupun wide. Kamera punggung atau kepala terpotong demi lolos QC = FATAL.
2. **Wajah faceless = kulit asli orang itu**: tanpa mata, alis, hidung, bibir, atau mulut. Tone sama dengan leher dan tangan, tekstur pori natural, cahaya kunci dari samping. Bukan topeng atau tambalan pucat. Kata "smooth blank skin surface" DILARANG. Acuan emas: C1 dan D (folder Drive `3. Uji JOTA/_CEK-DRIVE/SKILL-UPDATE-20261122`).
3. **Shot yang membawa wajah mendekat ke kamera = First Frame, Last Frame DARI LIBRARY** (photo 1 + photo 2 yang sudah lolos QC; `tool: first_last` + `first_image` + `last_image`). Lihat `skills/videoexpress-runner/FIRST_LAST_LIBRARY.md`.
4. **Gaya channel 3D realistis sinematik**: preset Artistly `kisah-3d-realistis`, VideoExpress `image_type: 3d`.
5. **Prompt**: dilarang "every person ... reference sheet" dan blok "crowd" di adegan satu orang. Sebut jumlah orang dengan pasti. Adegan ramai: Reference Photo 1 = tokoh utama, Photo 2 = foto kelompok figuran.
6. **Dialog**: tokoh tidak berbicara atau tertawa di prompt VideoExpress (mulut muncul). Video hanya gestur, audio ElevenLabs terpisah, satu pembicara per shot.
7. **Durasi mengikuti cerita**. Strategi: tema 60/25/15, long-form 8-12 menit, Shorts 30-60 detik (`STRATEGI_KONTEN_KANG_OHAN.md`).
8. `--paksa` hanya setelah tanda QC dilihat mata. Cek mata setiap kandidat dibandingkan dengan acuan emas.
9. Riset skill sinematografi AI video di GitHub setiap sesi, lalu catat di STANDAR_SINEMATIK bagian 9.
10. Publikasi menunggu persetujuan owner. Jangan unggah file yang memuat nama atau akun owner ke GitHub.

