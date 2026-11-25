# JOTA pada Mac — versi 1.3.0

Keputusan owner 2026-11-11: selesaikan kesiapan produksi Mac termasuk Artistly dan tukang posting. Ini adalah profil runtime untuk kode bersama, bukan fork runner/preset baru. Instruksi runtime Mac di sini mengatasi prosedur GitHub yang tidak tersedia. Aturan konten, prompt, QC, budget retry dan persetujuan publikasi tetap berlaku.

## Lokasi dan perintah
Root instalasi: /Users/koharudin/JOTA-Local-20261110.
Repo utama Jota_Content_Factory; repo eksekusi Jota_runner. Runtime lokal: Jota_runner/local/jota.mjs. Node 22 dipakai lewat launcher JOTA.command, tanpa mengganti Node global. Dependensi Python terisolasi di .venv. Profil login VideoExpress dan Artistly terpisah di aplikasi masing-masing.

Antrean aktif Mac hanya local-state/queue.json. Jangan membaca ulang gpt/perintah.json historis sebagai pekerjaan baru dan jangan menjalankan auto/jaga lama. Siapkan dengan aksi siapkan, gambar dengan gambar/uji-gambar, produksi end-to-end dengan buat, lanjut dengan produksi. Gunakan ID unik, preset tersimpan dan hash shots. Enqueue bukan bukti berhasil. Status run ada di local-state/runs/<ID>/stage.json dan worker.log.

Satu worker dan satu penguncian VideoExpress bersama. Mode persistent_session memakai jeda operasional 60 detik antar pekerjaan dengan sesi tersimpan; login ulang otomatis tidak dilakukan. SESSION_REQUIRED/pembatasan login memicu backoff 20 menit dan rekonsiliasi. Mode legacy tetap memakai cooldown 20 menit. File lock dari crash tidak direbut otomatis; audit PID/job/progress terlebih dahulu. Pekerjaan RUNNING terputus tidak diulang otomatis. Jangan menghapus progress, partial-video atau qc-attempts untuk melanjutkan.

## Preset object ASMR

Preset ketiga object_asmr_pov dirutekan worker yang sama, tanpa ref karakter manusia/fallback faceless, QC object-asmr-v1 dan object-clip-qc sebelum ffmpeg/delivery. Narasi default OFF; SFX wajib CloneVoice (dulu ElevenLabs), native mute, no music. Resume/signature, outbox, retry tiga/REVIEW, library/hash dan semua klip wajib tetap. Baca OBJECT_ASMR_PRESET.md dan OPEN_ITEMS untuk bukti/batas test/live. Tidak menambah sesi/login/worker atau antrean historis.

## Produksi

Audit4.23.9/code0.22.7: technical delivery bukan visual PASS. Pekerjaan faceless Mac baru wajib video_qc.required; renderer memeriksa klip sebelum assembly dan sumber LAST_FRAME, worker/delivery memeriksa bukti job/prompt/hash/frame.1FPS+frameakhir adalah sampling; naturalitas gerak/pakaian/warna antarshot belum otomatis disahkan. Konten FAIL mengalahkan receipt Drive yang secara teknis valid. New API writer menggunakan policy terikat SHA dan natural_realtime_v1 dengan beat setiap detik. Jangan memakai Saheela60detik sebagai contoh visual lolos: screenshot owner menunjukkan wajah. MP4 original tidak diubah.

Gunakan generator/validator existing. Brief lama tanpa preset tetap faceless. Stickman tetap 2D character-first dan profil stickman-v1; referensi keluarga faceless tidak menjadi fallback. Default audio CloneVoice (owner 2026-11-26, [CLONEVOICE_MAC.md](CLONEVOICE_MAC.md); dulu ElevenLabs), native VideoExpress dimute, tanpa musik. Narator default dapat dipilih lewat nama persis dengan perintah voice; karakter/proyek yang punya voice lock tetap memakai lock.

### Opsi pasca_mac: RIFE dan Foley lokal (owner 2026-11-17)

Opsi ini hanya berlaku di Mac. Kalau `pasca_mac` tidak ada, semua default di atas tetap berlaku. Owner menyetujui hasil uji SHOT09 Sandal Masjid pada 2026-11-17 ("bagus bro"), lalu meminta opsi ini disambungkan ("Ya, sebagai opsi"). Tools-nya ada di `~/JOTA-Tools` (`jota-rife`, `jota-foley` di `~/.local/bin`). Kodenya di `apps/videoexpress-runner/pasca-lokal.mjs` pada runtime Mac, dengan tes `test-pasca-lokal.mjs`.

```json
"pasca_mac": { "rife_fps": 60, "foley_lokal": true }
```

- **`rife_fps`** (25, 30, 50, atau 60; 48 ditolak karena Final Cut tidak punya timeline 48p). Di `rakitLokal`, setiap klip dihaluskan dengan RIFE sesudah cek hash QC terhadap byte klip asli dan sebelum normalisasi, lalu dirakit pada fps tersebut. RIFE tidak pernah melewati potongan antar-shot. Kalau RIFE gagal, assembly berhenti supaya timeline tidak bercampur fps.
- **`foley_lokal`** (true). Di `narasi-tokoh.mjs`, suara latar shot dibuat HunyuanVideo-Foley dari gambar shot itu. Prompt-nya `suara_latar` (bahasa Inggris), dengan musik dan suara manusia dilarang. Hasilnya disetel ke −26 LUFS (diukur lalu dikoreksi dengan penguatan tetap) dan turun saat dialog atau narasi shot yang sama berbunyi (sidechain: threshold 0.05, ratio 4, attack 20, release 400). Kalau Foley lokal gagal, shot itu kembali ke SFX ElevenLabs. Audio native VideoExpress tetap dimute. Foley per aksi (`"foley": [...]`) tetap ElevenLabs.
- Waktu proses di M4 Pro 24 GB: Foley sekitar 10 detik per detik video, RIFE sekitar 4 detik per detik video. Jangan menjalankan MOSS SFX bersamaan (RAM).
- Status: IMPLEMENTED. Teruji tes unit dan regresi runtime Mac (test.mjs, presets, object-media, stickman-media, cartoon-2d, Jota_runner/local). Foley lokal teruji nyata di `narasi-tokoh.mjs` (2 shot, −26,4 LUFS). RIFE teruji per klip (24 ke 60 fps). Ducking dengan dialog nyata ElevenLabs dan RIFE di dalam `finish` produksi belum teruji live.

### Opsi qc_wajah_mac: pemeriksa faceless per kepala (owner 2026-11-17)

Opsi ini hanya berlaku di Mac, untuk proyek faceless yang memakai `video_qc.required`. Kalau `qc_wajah_mac` tidak ada, QC klip faceless tetap memakai `face-anatomy.mjs` (frame utuh, Qwen3-VL-4B, 1 frame per detik). Owner meminta pemeriksa yang lebih kuat dipasang ("pasang") dan dicatat di repo ("Ya, tulis"). Perkakasnya `jota-wajah` (`~/.local/bin`, folder `~/JOTA-Tools/face-qc`). Kodenya di `apps/videoexpress-runner/wajah-mac.mjs` pada runtime Mac, dipanggil dari `faceless-clip-qc.mjs`, dengan tes `test-wajah-mac.mjs`.

```json
"qc_wajah_mac": { "model": "8b", "fps": 3 }
```

- **Cara kerja per frame.** YOLOv8s (telemetri ultralytics mati) dan Apple Vision (bawaan macOS, hanya penanda) mencari orang dan wajah. Setiap kepala dipotong, diperbesar ke 448 px, lalu dinilai Qwen3-VL per kepala: mata atau alis, hidung (termasuk hidung timbul), dan mulut. Frame utuh juga dinilai (jumlah orang, wajah berfitur, figur mirip manusia). Satu fitur pada satu kepala berarti REJECT. Ragu, gagal dinilai, atau jumlah orang tidak cocok dengan `expected_heads` berarti REVIEW. Semua status bukan PASS menggagalkan QC klip, sama seperti jalur default.
- **`model`**: `"8b"` (default; Qwen/Qwen3-VL-8B-Instruct-GGUF Q4_K_M + mmproj Q8_0, revisi `f982a07`, SHA-256 dicek, Apache-2.0) atau `"4b"` (model runtime yang sudah ada). Server-nya llama-server dari runtime 4B yang sudah terverifikasi. Runtime dan manifest lama tidak diubah.
- **`fps`**: 1 sampai 6, default 3, ditambah frame terakhir. Detik bulat jalur default selalu ikut disampel.
- **Uji 2026-11-17 (gambar dan klip lama, tanpa generate):** 9 gambar (wajah, polos, campuran, tokoh kecil). 4B dan 8B benar semua. Pemeriksa default salah menolak gambar polos 2 kali. Wajah yang muncul 0,4 detik di klip uji tertangkap. Model 8B menangkap hidung timbul pada ayah di contoh kalibrasi `examples/visual-negative/SHOT04.jpg` pada frame video, padahal contoh itu selama ini dianggap polos. Saat SHOT04 dinilai sebagai gambar aslinya, 8B meloloskannya, jadi deteksi hidung samar belum konsisten.
- **Waktu**: model 8B sekitar 11 detik per frame di M4 Pro 24 GB, model 4B sekitar 4 detik. Jangan dijalankan bersamaan dengan `jota-foley` atau `jota-sfx` (RAM).
- **Status: IMPLEMENTED.** Lolos tes unit dan regresi (`test-faceless-clip.mjs`, `test.mjs`, Jota_runner/local), dan lolos uji nyata pada gambar dan klip buatan. Belum dipakai di produksi nyata. Hasilnya prediksi model, bukan persetujuan owner. Frame sampel tidak membuktikan semua frame bebas wajah.

Checkpoint mode mac menyimpan objek menurut SHA256 serta manifest lokal; tidak pull/push GitHub. Template prompt faceless tidak diubah. Resume terikat preset/revisi. Core QC maksimal tiga, lalu REVIEW; jangan mengubah FAIL menjadi PASS. Jalur REVIEW tetap menolak aset teknis tidak sah.

Storyboards disimpan sebagai storyboard-local.json (format tab dari mapper existing). Apps Script JOTA_DRIVE_URL opsional untuk sinkron Sheet: harus endpoint script.google.com/.../exec yang valid, bukan URL folder Drive. Kegagalan Sheet tercatat terpisah; jangan mengklaim Sheet berhasil atau storyboard bergambar selesai sebelum gambar tersedia.

Assembly ffmpeg dari clip_url nyata, semua klip wajib ada, rasio/timeline/decoder diverifikasi. Audio tokoh/narasi dan SFX memakai pipeline existing; teks/kartu stickman memakai Remotion. File dirakit di staging lokal, kemudian disalin ke Drive Desktop. Receipt DRIVE_DESKTOP_LOCAL_COPY_VERIFIED hanya membuktikan salinan lokal: readback_verified tetap false sampai file server Drive benar-benar ditemukan dan dibaca kembali.

## Artistly
Login manual di Chrome khusus Artistly; launcher membuang JOTA_CI serta password CI. Output dipisah dalam local-state/artistly. Perakit komik memakai Pillow dan font repo. Tidak mengunggah buku/komik otomatis sebelum pemeriksaan hasil. Status resep yang masih SPEC atau pernah gagal tidak boleh diklaim teruji produksi hanya karena login berhasil.

## Posting
Pemasangan tidak memberi izin posting. config.posting_enabled default false. Semua entry point unggah di Mac memeriksa persetujuan terpisah yang terikat SHA256 media dan caption/metadata, platform, identitas pemberi persetujuan dan kedaluwarsa. Jalur wrapper juga menuntut readback Drive dan owner APPROVED. Journal STARTED mencegah unggah duplikat; kiriman ambigu harus direkonsiliasi.

YouTube: YT_CLIENT_ID/YT_CLIENT_SECRET/YT_REFRESH_TOKEN. Scope youtube.upload cukup untuk upload tetapi tidak untuk membaca channels.list; bedakan token diterima, izin upload, dan identitas channel terverifikasi. Meta: META_PAGE_ID dan META_PAGE_TOKEN untuk Facebook Page; Instagram profesional harus tertaut. Kredensial hanya local-state/accounts.env berizin 0600, tidak dicetak/di-commit. Layanan tidak tersedia atau token kosong berarti BLOCKED, bukan siap posting.

## Bukti
Regresi runner/media/DOM dan Artistly, tes lokal checkpoint/antrean/gate, serta kalibrasi model ARM64 tersimpan di logs/. Setiap klaim produksi harus menunjuk job, klip, audio, MP4, dan readback Drive nyata. Pilot Mac terpisah: JOTA-M1-STICKMAN-MAC-LANGKAH-20261111; lihat status aktual, bukan status historis pilot cloud.

## Bukti produksi Mac 2026-11-11

Pilot JOTA-M1-STICKMAN-MAC-LANGKAH-20261111 selesai: referensi karakter library48291491, 6 kandidat scene tersimpan; gambar QC PASS; tiga job f6a3738e-094b-4825-8100-9c76c2c25179, b4df2700-200b-421c-8d9e-a79ccc4f2c90, 430bf5ba-9c8a-4093-bebe-7ad418b21110 menghasilkan klip5.04detik. Setiap klip PASS pemeriksaan frame awal/tengah/akhir, bukan semua frame. Audio narasi/SFX ElevenLabs, Remotion3kartu, output1080x1920 berdurasi15.018667detik. Drive file1skLfSsAuD7DlvKAH_kXqQUl221W-1sJ3 diunduh kembali melalui MCP, SHA256 1b7a39d4c94886724ba4f7281c55396572bf959d87f4d73da70e3423d64febe3 cocok, decoder/video/audio PASS. Owner PENDING; tidak ada posting.

Bug scoped screen stickman ditemukan live: pemeriksaan shot berikutnya mengganti pilihan QC shot lama. Fix hanya memperbarui shot dalam only. Regresi khusus dan suite penuh PASS. Pilihan SHOT01 dipulihkan dari PASS/sha tercatat, bukan mengubah kriteria menjadi PASS; original disimpan di mac-selection-recovery.json. Job SUBMITTED tidak dikirim ulang.

Artistly1.0.1/Skill1.1.1: login dan generasi live2gambar Private melalui V6 berhasil, sumber/hash disimpan di local-state/artistly/live-smoke-20261111. PDF lokal2halaman dan Remotion sintetis lulus. Storybook end-to-end baru belum diuji. YouTube OAuth diterima dengan scope upload; identitas channel belum dibaca karena scope read tidak ada. Meta Page Ohan Kang dan Instagram kohar_u3 terverifikasi read-only. Tidak ada tes unggah sosial.

## n8n dan Hermes

n8n2.30.8 aktif di127.0.0.1:5678 dengan workflow JOTA Factory — Active operations watchdog. Jadwal1menit memanggil POST localhost8848/v1/ops/tick berautentikasi, bukan dispatch produksi. Pengawas launchd id.jota.operations-watchdog cadangan berbagi lock/dedupe. Bukti jadwal trigger SUCCESS tersimpan di execution metadata dan local-state/operations. Progres produksi dilaporkan5menit, hasil otomatis; idle tidak membakar token AI. Worker produksi tetap satu. Enqueue API umum tetap disabled.

Hermes v0.21.5+6146.g46904a3 dan skill jota-local-production tersedia. Runtime supervisor id.jota.hermes-supervisor sudah memanggil AIAgent lokal untuk keputusan QC, menugaskan recheck melalui antrean resmi, dan melanjutkan hasil QC yang lolos menurut policy progresif terbaru. GPT-4.1 mini/OpenRouter menangani percakapan dan penulisan brief baru dengan budget nyata, bukan laporan timer. Layanan stale diperiksa dan dipulihkan terbatas oleh watchdog; pemulihan QC baru memakai qc-recovery.py → repair-project.mjs → aksi repair pada worker tunggal. Baca QC_RECOVERY_MAC.md untuk scope, batas dan bukti; jangan mengklaim pilot berhasil hanya karena dispatch. Tidak ada auto-update skill atau publikasi.

## Kartun2D umum —2026-11-13

Preset cartoon_2d opt-in memakai adapter dan inspeksi operator aktual terpisah, reference/grouprefs proyek (maks2foto), audio/cache hanya2D, same queue/worker/browser/ffmpeg/Drive. Tanpa posting, tanpa mengubah preset lama. Mekanisme IMPLEMENTED/TESTED; bukti klip/Drive aktual wajib sebelum klaim film selesai. Detail CARTOON_2D_MAC.md.
