# JOTA kunci provider: tiga generator untuk gambar diam, VideoExpress untuk video (sejak v3.10, diselaraskan v3.27)

Keputusan owner 2026-10-21 (setelah insiden Nabi Nuh), diperbarui 2026-10-22 dan 2026-10-24. Berlaku untuk semua playbook dan semua agen yang menjalankan JOTA.

## Aturan

| Pekerjaan | Provider yang boleh |
|---|---|
| Karakter acuan (gambar diam) | Dipilih owner per proyek: VideoExpress `Create Image`, Artistly (`app.artistly.ai`), atau ChatGPT Images 2.0; atau gambar yang sudah disetujui owner |
| Gambar awal SC01 | VideoExpress `Create Image` dengan `Reference Photo` + `Use Consistent Character`, atau gambar Artistly yang diimpor |
| Gambar awal SC02 dan seterusnya | Frame yang disimpan dari klip VideoExpress sebelumnya, lewat `Use from Library` |
| Video bergerak (adegan karakter), timeline, trim, export | Hanya VideoExpress (`app.videoexpress.ai`); pengecualian aset pendukung tidak mengubah provider video |
| Dialog/narasi dan desain audio per cue | ElevenLabs voice TTS dan Sound Effects diizinkan sebagai **aset audio terpisah**, selama no music, dicatat di storyboard dan diimpor ke alur editing |
| Animasi teks saja | Remotion diizinkan untuk **aset overlay teks** (judul, subtitle, teks hadis/terjemahan/sumber), bukan animasi adegan atau pengganti VideoExpress; **import ke editor belum diuji**, jangan ganti backend export tanpa instruksi owner |

Impor dari Artistly lewat `Import Media > Import from Artistly`; gambar ChatGPT lewat unggah file di `Import Media`. Artistly dan ChatGPT tidak boleh dipakai untuk video bergerak (Sora tetap dilarang).

## Klarifikasi v3.98 (2026-11-05)

Owner menambah **ElevenLabs Sound Effects** dan **Remotion Text Animation** sebagai dua jalur **aset pendukung** dari storyboard Google Sheets. ElevenLabs dapat menghasilkan dialog/narasi/ambience/Foley/SFX per cue. Remotion hanya untuk grafis teks overlay; tidak boleh menggantikan klip bergerak dari VideoExpress, tidak boleh memproduksi montage/film penuh, dan tidak memberi izin ekspor final dengan backend lain. Bila alur VideoExpress tidak dapat menggunakan asset overlay Remotion, beri status `BLOCKED_REMOTION_INTEGRATION` dan minta keputusan owner, jangan berimprovisasi. Referensi aktif: `SOUND_REMOTION_HADITH.md`. Semua larangan musik tetap berlaku.

## Dilarang sebagai pengganti video

Python, Pillow, MoviePy, FFmpeg (membuat gambar atau slideshow), Blender, skrip animasi, OpenAI/Sora, Higgsfield, stock footage, montase klip lama, atau mesin video lain. Mendesak, gagal login, atau "yang penting ada MP4" bukan alasan.

## Kalau VideoExpress tidak bisa dipakai

Berhenti. Status `BLOCKED_VIDEOEXPRESS`, tulis penyebab persis dan langkah berikut, simpan semua ID proyek dan klip. Riset, naskah, dan prompt tetap boleh dikerjakan. Hanya owner yang bisa mengganti provider, dengan instruksi baru yang eksplisit.

## Bukti asal video

Sebuah video baru dianggap hasil JOTA kalau:
1. Akun dan proyek VideoExpress-nya jelas.
2. Setiap klip scene punya ID VideoExpress yang tercatat di ledger.
3. Export dibuat dari proyek VideoExpress yang sama.
4. Masih private. QC hasil dilakukan owner (sejak v3.8); agen tidak menyatakan klip lulus QC.
Upload ke Google Drive saja tidak membuktikan asal video. Kalau bukti kurang: `PROVIDER_ORIGIN_UNVERIFIED`.

## Insiden yang tidak boleh terulang

2026-10-21: file `JOTA_Kisah_Nabi_Nuh_2_Menit.mp4` dibuat di luar VideoExpress lalu diunggah ke Drive `01_Draft`. Status: `NONCOMPLIANT_REJECTED`, bukan video JOTA. File Drive (`1GoGWzkVW41VoAvYcjynHARWwS7gCUs9B`) jangan dikirim, dipindah, atau dipublikasikan, dan jangan dihapus tanpa izin owner.

## Akses browser

Owner mengizinkan (2026-10-22) agen mengendalikan tab browser untuk Artistly dan VideoExpress saja (ChatGPT dipakai di aplikasinya sendiri untuk G3), selama tugas aktif. Tidak menyentuh tab lain, password, cookie, API tersembunyi, atau pengaturan keamanan. Ini bukan pekerja otomatis yang jalan sendiri di latar belakang.
