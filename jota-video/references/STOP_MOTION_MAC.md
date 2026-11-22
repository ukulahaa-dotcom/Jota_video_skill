# Stop motion boneka realistis pada Mac — 1.2.0

Keputusan owner 2026-11-20 (percakapan Claude): video "Kucing dan Boneka" memakai preset baru `stop_motion`, gaya **realistis sesuai foto** boneka milik owner. Wajah boneka/mainan **boleh tampil seperti di foto acuan**, karena tokohnya boneka. Keputusan ini hanya berlaku untuk preset `stop_motion`; default faceless, stickman, object_asmr_pov dan cartoon_2d tidak berubah. Manusia tidak boleh muncul di preset ini (expected_heads manusia selalu 0).

Status: **TESTED produksi nyata** dua episode sampai MP4 di Drive (E01 versi 3 dan E02; owner menonton dan menyukai: "bagus banget", dengan catatan gerak kurang halus yang memicu versi 1.1.0). Episode 3 (Takut Gelap) sudah punya brief/storyboard, gambar belum dibuat karena sesi login VideoExpress habis. QC adalah sampel frame, bukan setiap frame; suara belum didengar model.

## Kontrak preset

- Adapter `apps/videoexpress-runner/stop-motion.mjs`, descriptor `presets/stop_motion.json` (versi 1.1.0), review `stop-motion-review.mjs`, tes `test-stop-motion.mjs`.
- Image Type `photorealistic`, Enhance/Creative/Gallery OFF, tanpa musik, audio native dimute, suara ElevenLabs, publikasi terkunci.
- Brief wajib `toy_faces:"as_reference"`, registry `toys` (ID + deskripsi visual), per shot `cast`, `expected_toys` = jumlah cast, `expected_heads` = 0. Shot tanpa mainan (mis. bola benang saja) memakai `cast:[]`.
- Prompt gambar dan video wajib menyebut stop-motion, no humans, dan prompt video no music. Nama merek/karakter dagang (Hello Kitty, Sanrio, Monchhichi, dst.) ditolak validator; gambar/logo merek di baju boneka tidak boleh muncul (Pelajaran 1).
- **Gerak (1.1.0, owner: "boneka harusnya jalan, jangan lompat-lompat"):** gerak halus dan kontinu; boneka berjalan dengan langkah kecil bergantian, kucing meluncur. Kata hop/jump/bounce/stepped memicu peringatan validator kecuali shot memberi `allow_hop:true`. Jangan menulis kalimat larangan yang memuat kata-kata itu (validator membacanya sebagai kata gerak); tulis "every movement stays grounded, gentle and continuous".
- LAST_FRAME belum diaktifkan; hard cut antar shot. Maksimal tiga percobaan video per shot (`video_attempts` 2..3 pada revisi), lalu REVIEW.

## Foto acuan (milik owner)

Foto diunggah owner sendiri ke Media Library VideoExpress, folder **`stop motion image`** (pakai spasi; nama persis hasil `peta-folder-acuan`). Runner tidak mengunggah otomatis. Acuan ditulis `{preset, project, library, name, owner_upload:true}` tanpa sha256 bila file asli tidak ada di Mac.

| Nama | Isi |
| --- | --- |
| IMG_1463 | boneka tampak depan (wajah jelas) |
| IMG_1464 | boneka tampak samping |
| IMG_1465 | boneka tampak belakang |
| IMG_1466 | kucing tampak depan |
| IMG_1467 | kucing tampak samping |

Aturan owner 2026-11-20: **bila mainan terlihat dari samping, pakai foto sampingnya** (IMG_1467 kucing, IMG_1464 boneka). Maksimal 2 acuan per shot, jadi pilih sudut paling cocok per mainan per shot. Kucing berkaki di hasil video **boleh** (keputusan owner); jangan ditolak hanya karena itu.

Perintah baca-saja runner: `peta-folder-acuan` (daftar folder dialog Select Image + screenshot) dan `unduh-folder-acuan "<folder>"` (pada pemakaian pertama tidak menemukan `img` yang bisa diunduh; andalkan screenshot).

## Suara anak (owner 2026-11-20)

Narator **anak perempuan sekitar 6 tahun** dan dialog dua karakter bersuara anak. Semua suara pustaka ElevenLabs, bukan tiruan suara anak asli; kesan usia dari `nada` (pitch lewat ffmpeg).

| Peran | Suara | nada |
| --- | --- | --- |
| NARATOR | JOTA Cahaya - Youthful, Clear and Engaging | 1.22 (E01 v3: 1.16) |
| BONEKA | JOTA Dakocan - Expressive, Cheerful and Clear | 1.14 |
| KUCING | JOTA Alif | 1.2 |

Narasi dan dialog ditulis sebagai `dialog:[{voice,text,t}]` per shot (narator `t:0.3`, tokoh menjawab sesudahnya); `narration` dikosongkan agar tidak ganda. Kalimat pendek: narator + 1–2 dialog per shot 7–8 detik. Teks suara tidak boleh masuk prompt visual.

## Resep episode (60 detik, 9:16, 8 shot 7–8 detik)

Satu pesan per episode, satu ruang tamu yang sama (lantai keramik krem, sofa krem, bantal beige). Struktur: pembuka → masalah → bantuan → tindakan → selesai → hikmah narator + kartu teks akhir. Contoh nyata: E01 Teman Baru, E02 Bola Benang yang Hilang (Saling Menolong), E03 Takut Gelap (Berani Bersama; brief ada, belum dirender). Urutan kerja: `buat-brief.mjs` → `dari-brief.mjs` → antre `gambar` (semua shot) → QC gambar Claude → pilih kandidat, tulis `start:{type:'PAKAI_ULANG',image}` dan `auto:true` → antre `produksi` → QC temporal klip → `REVIEW-REPORT.json` → suara/kartu → Drive.

## QC (Claude, bukan model lokal)

Profil `stop-motion-operator-v1`. `operator-authorization.json` schema `jota.stop-motion-operator-review.v1`, source `owner_claude_message`, publication false. Label reviewer ChatGPT/Codex tidak dipakai.

- Gambar (`jota.stop-motion-image-qc.v1`, reviewer `Claude actual image inspection`): terikat signature, prompt SHA, byte SHA library, human_heads 0, jumlah mainan. Cek: toy_identity, no_humans, no_brand_marks, stop_motion_look, counts, props_rigid, layout_continuity, readable_action.
- Klip: decoder/durasi/rasio/job/URL/prompt SHA, sampel 1FPS + frame akhir, lalu `visual_review` Claude (`Claude actual temporal inspection`) terikat binding klip. Buka semua sampel (strip frame per shot dengan ffmpeg tile).
- Local face screen tidak dijalankan (wajah mainan diizinkan).
- `REVIEW-REPORT.json` wajib ada di folder proyek sebelum pengiriman Drive (drive.mjs menyalinnya); isi jujur: percobaan per shot, cacat kecil, batas sampel.

## Revisi

- Satu/beberapa klip: brief `revision` (berurutan), `regen:[ids]`, `video_attempts:{id:2..3}`, `revision_parent` (signature + digest per shot induk, dibekukan di `revision-parent-rN.json`). Hanya shot di `regen` boleh berubah; shot lain dipakai ulang dan bukti klipnya diikat ulang setelah cek job/URL/hash identik.
- Audio-saja: `audio_revision:true` dengan `regen:[]`; digest shot hanya bidang visual (dialog/narration/voice/foley/audio_tempo/on_screen_text boleh berubah). Perubahan visual tetap ditolak. Tidak ada render ulang VideoExpress.
- Nama gambar kandidat unik per percobaan: percobaan 1 `<TAG>-SHOTxx-AWAL-n`, berikutnya `-P2-n`, `-P3-n`.

## Pelajaran (insiden nyata 2026-11-20)

1. **Logo muncul dari foto acuan.** Rompi boneka di foto punya gambar Hello Kitty; model menyalinnya walau prompt melarang logo. Perbaikan: deskripsi baju "plain solid blue fur with no patch, no face, no animal, no character and no logo". Jangan menulis kata "patch" (mengundang tempelan).
2. **Nama kandidat bentrok.** Nama sama di tiap percobaan membuat pemilihan aset eksak ditolak ("name ambiguous"). Perbaikan permanen: nama unik per percobaan. Insiden SHOT03: aset ditolak diganti nama `...-REJ1-n` (`namai-artistly id=nama`, di bawah kunci videoexpress).
3. **Kucing tumbuh kaki/ekor** saat bergerak jauh dari pose awal (E02 SHOT03/07). Mitigasi: kunci pose, kucing diam atau meluncur pendek, hanya boneka bergerak; owner menerima kaki.
4. **Daemon worker menyimpan modul lama.** Setelah mengubah kode runtime: `launchctl kickstart -k gui/$(id -u)/id.jota.local-worker`.
5. **Revisi dilewati** bila `progress.done` dari revisi lama; worker kini menjalankan render bila `data.revision > progress.revision`.
6. **Sesi login VideoExpress habis berulang** (`SESSION_REQUIRED`, backoff 20 menit). Hanya owner yang login manual (`runner.mjs login`, tutup jendela setelah editor tampil); jangan login otomatis dan jangan memasukkan password.
7. **ffmpeg penggabung suara pernah menggantung ~30 menit** (E02, 24 input; tidak bisa ditiru offline); file hasil tanpa moov. Pemulihan: hentikan, salin kembali `*-TANPA-NARASI.mp4` ke nama target (hash harus sama dengan `mac-postprocess.json` input_sha256), antre ulang. Khusus stop_motion ffmpeg kini dibatasi 10 menit.
8. **Unduhan CDN VideoExpress bisa ETIMEDOUT** sementara; antre ulang `produksi`, klip CLIP_READY tidak dikirim ulang.
9. **Link Drive:** ID file dari `xattr -p "com.google.drivefs.item-id#S" <file Drive Desktop>`, lalu konektor Drive `get_file_metadata` memberi `viewUrl` dan ukuran server (cocok = salinan ada di server; hash belum dibandingkan). Tulis URL polos agar bisa diklik.
10. **Kartu teks akhir** dibuat Remotion dari `on_screen_text` (mis. "Teman Baru", "Saling Menolong", "Berani Bersama").
11. **Tangan ganda pada boneka saat tampak samping/berjalan (E03 SHOT05).** Lengan jauh yang menjuntai terbaca sebagai tangan/ekor kedua. Owner menerima hasil ("memuaskan"). Bila ingin dihindari: prompt shot samping menyebut "exactly two arms, the far arm hidden behind the body", periksa kedua tangan di setiap frame sampel.
