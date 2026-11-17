## 4.23.27 — 2026-11-17 — Claude (Mac)

Uji nyata reference sheet (owner: "silakan tulis dan uji"): 9 + 10 gambar Create Image lewat runner Mac, semua tersimpan di My AI Images dengan nama unik dan dicek jota-wajah 8B. Acuan tokoh dengan sudut depan di Reference Photo 1 berhasil (profil dan belakang benar, identitas sama). Acuan ruang dengan Reference Photo mengunci isi ruangan tetapi juga sudut kamera, jadi belum terbukti. REFERENCE_SHEET_DAN_ARAHAN.md 0.2.0 bagian 8. Tanpa video, tanpa publikasi.

## 4.23.26 — 2026-11-17 — Claude (Mac)

Owner meminta hal baik dari tutorial AI Films World (VideoExpress 3.5) diterjemahkan ke sudut pandang VideoExpress dan JOTA, dengan reference sheet untuk tokoh, ruangan, lingkungan dan benda. Ditambahkan `references/REFERENCE_SHEET_DAN_ARAHAN.md` 0.1.0 berstatus USULAN BELUM TERUJI: pustaka acuan per sudut di Media Library dan folder skill, aturan 2 slot Reference Photo, first/final frame konkret, aksi konkret tiap 2 detik tanpa kalimat pengisi, kamera mengikuti aksi, pustaka gerak, QC anatomi/fisika/kontinuitas, review film utuh. Prompt uji A/B SHOT04 disimpan di `evals/UJI-AB-GAYA-ARTIKEL-20261117/`. Aturan produksi wajib tidak berubah sampai uji bagian 7 lulus.

## 4.23.25 — 2026-11-17 — Claude (Mac)

Owner meminta pemeriksa faceless yang lebih kuat di Mac ("pasang") dan pencatatannya di repo ("Ya, tulis"). Ditambahkan opsi `qc_wajah_mac` di runtime Mac. Perkakasnya `jota-wajah`: YOLOv8s dan Apple Vision mencari kepala, setiap kepala dipotong lalu dinilai Qwen3-VL-8B, ditambah penilaian frame utuh, pada 3 frame per detik. Tanpa opsi, QC klip faceless tidak berubah. Uji pada 9 gambar lama dan satu klip buatan: semua benar. Model 8B juga menemukan hidung timbul di contoh kalibrasi SHOT04 yang selama ini dianggap polos. Belum dipakai di produksi nyata. Aturan di MAC_RUNTIME.md 1.3.0.

## 4.23.24 — 2026-11-17 — Claude (Mac)

Owner: akun GitHub lama sudah mati, jadi tidak boleh ada kaitan lagi; fokus hanya ke GitHub `ukulahaa-dotcom`. Rujukan aktif diganti ke `ukulahaa-dotcom/Jota_video_skill`, yaitu deskripsi SKILL.md, bagian Infrastruktur, jalur laporan 5 menit, CONNECT.md, README.md, playbooks/CATALOG.json, dan dua modul referensi. Bagian Actions dan secrets ditandai tidak dipakai, karena produksi sekarang di Mac dengan kredensial lokal. Catatan sejarah (CHANGELOG lama, laporan audit, bukti run, naskah produksi lama) dibiarkan apa adanya sebagai arsip.

## 4.23.23 — 2026-11-17 — Claude (Mac)

Owner menyetujui klip uji SHOT09 (RIFE dan Foley Hunyuan, narasi −16 LUFS, SFX −26 LUFS dengan ducking) dan meminta opsi ini disambungkan. Ditambahkan opsi `pasca_mac` di runtime Mac: `rife_fps` di `rakitLokal` dan `foley_lokal` di `narasi-tokoh.mjs`, dengan ElevenLabs sebagai cadangan. Tanpa opsi, perilaku tidak berubah. Regresi runtime Mac PASS. Ducking dengan dialog nyata dan RIFE di dalam `finish` belum teruji live. Aturan di MAC_RUNTIME.md 1.2.0. Catatan: perubahan sempat salah dipasang di Runner lama dan jaga lama, lalu dikembalikan; jaga lama (`id.jota.runner-jaga`) dinonaktifkan sesuai aturan "jangan menjalankan auto/jaga lama".

## 4.23.22 follow-up — actual Lentera delivery and scoped audio fix

Actual180s/27shot limited-animation film delivered and independently downloaded from Drive; real failed clips preserved. Cartoon-only60-input audio EOF bound/thread fix; existing faceless/stickman regression PASS. See Lentera FINAL180-R2 RUN_REPORT for actual sample QC, editorial limits and no-posting evidence.

##4.23.22 —2026-11-13 —ChatGPT

Owner meminta film27shot/180detik2D sampaiDrive. Tambah adapter/preset cartoon_2d, project references/grouprefs, scoped actual operator QC, exact compiled prompts and technical clip hashes, shared Mac worker/audio/assembly/delivery, exact audio request cache only2D and bounded tempo; Remotion overlay span only2D. Core regression/faceless byte identity and adapter isolation testsPASS. Actual reference imagesSaved/readback and viewed; film not yet complete. Three old presets unchanged; no socialposting.

## 4.23.18 — 2026-11-12 — ChatGPT

## 2026-11-12 — ChatGPT — camera illustrative MP4 delivered

Actual84s/14-shot private MP4 and independent Drive download/hash/decoder verified. Owner delegated QC; no posting. Source09/11 continuity failures preserved and corrected;09 uses a clean2s end hold. Historical models remain disclosed illustrations, not exact replicas. No every-frame/perceptual-audio certainty claimed. See [run evidence](../../gpt/productions/JOTA-M1-ASMR-CAMERA-EVOLUTION-20261112-OPERATOR-R3/RUN_REPORT.md). Component regression/context/operator/text-cache tests PASS; no new live faceless/stickman claim.

## 4.23.21 — ChatGPT — 2026-11-12

Optional delegated object-Mac review may reuse an actual Remotion alpha layer only when exact cards/frame count/resolution props SHA, file SHA, project authorization, assets path and alpha ProRes duration/codec match. Faceless/stickman and default rendering unchanged. TESTED core regression and stale/outside-cache rejection. Camera14 clips complete; two actual continuity failures require video-only repair, source draft is not final visual PASS.

## 4.23.20 — ChatGPT — 2026-11-12

Object operator execution fix 2026-11-12: keep structured registry in shots, compile a concise visual-only prompt without quoted JSON/dialogue before submission and bind actual executed prompt SHA to each job/clip. Explicit VideoExpress dialogue rejection is not a submitted job. Exact private asset selection verifies media ID/name and uses observed More pagination. Defaults faceless/stickman unchanged. Operator/core tests PASS; camera render still in progress, no completed-video claim.

## 4.23.19 — ChatGPT — owner delegation 2026-11-12

Owner 2026-11-12 explicitly delegated image/video QC for the camera production to ChatGPT. Opt-in object-ASMR Mac operator review requires scoped authorization and actual saved-image hash-bound inspection. Up to one left and one right hand may be inspected. Clip decoder/duration/job/hash checks remain mandatory; visual review is recorded separately, never fabricated as a local-model PASS. No owner QC pause for this authorized project; publication remains locked. Faceless/stickman defaults unchanged. IMPLEMENTED; operator/core regression tests PASS, live rendering not yet proved.

Pilot object ASMR menemukan bug kalibrasi: shared face screen mengembalikan REVIEW untuk satu kepala ketika expected0; kontrol negatif sebelumnya keliru menuntut REJECT. Profil objek kini menerima bukti kepala manusia jelas sebagai blocked control (v2); uncertain/absent observation/PASS tetap gagal. Tidak melonggarkan gate aset, tidak mengubah grader faceless/stickman. Kegagalan kalibrasi menghentikan pipeline sebagai infrastruktur sebelum consume visual attempts/REVIEW. Regresi core/object/context/authoring/dialogue PASS, source bukti di produksi kamera. QC_UNAVAILABLE lama diarsipkan sebagai insiden infrastruktur, bukan diubah ke PASS; actual candidate inspection belum pernah terjadi saat insiden. Tidak ada regenerasi gambar atau job video dari perbaikan kalibrasi.

## 4.23.17 — 2026-11-11 — ChatGPT

Owner meminta preset ketiga object_asmr_pov pada runtime Mac. Tambah descriptor/schema/adapter registry dan lima fase aksi kausal, kamera statis/hard cut, prompt objek tanpa karakter keluarga, SFX ElevenLabs/narator opsional, QC objek/tangan dan sampel urutan klip. Worker/queue/Save/library/checkpoint/audio/ffmpeg/Drive sama; preset terbawa outbox/resume/retry/review. Assembly menolak klip hilang/stale. Default/prompt/template faceless dan stickman tidak dimigrasikan. Versi RunnerSkill1.10.10/core0.22.10; manifest konteks full-skill diperbarui, object policy terpisah. Tes lokal dan smoke resmi dicatat di OPEN_ITEMS; jangan klaim video live/MP4/Drive atau production-ready tanpa bukti. Tidak posting.

## 4.23.13 — 2026-11-11 — ChatGPT

Owner meminta penerapan Telegram dengan pemahaman konteks dan memori. Tambah skill jota-telegram1.0.0, panduan model scoped, slot grounded by current-message quote, preferensi opt-in/draft/histori per owner/chat, kontrol memori, menu teks, pembedaan diskusi/status/revisi/produksi dan handoff idempotent conversation_spec. Style unsupported/karakter/rasio/hadis diblokir sesuai kemampuan, tidak fallback diam-diam. Producer/QC/posting tetap existing; flag aktif setelah tes. Tidak ada inline keyboard atau renderer gaya baru.

## 4.23.12 — 2026-11-11 — ChatGPT

Owner meminta pembaruan skill sesudah diskusi intake dan gaya storybook. Pisahkan tema/pesan/basis cerita/genre/gaya/cast/pengaturan, percakapan bertahap tanpa mengulang informasi, default/direct-production dan lingkup diskusi tetap. Katalog enam gaya + definisi Storybook, status existing faceless3D/stickman2D vs SPEC gaya baru. Tambah referensi penuh pada loader dan pin manifest; dialog/menu Telegram multi-turn masih SPEC, bukan klaim implementasi. Tidak mengubah preset, gate atau produksi existing.

## 4.23.11 — 2026-11-11 — ChatGPT

Owner meminta isi skill terakhir diinjeksi ke Hermes dan GPT mini. Loader bersama memuat dokumen lengkap yang dipin SHA/version dan template sesuai preset. Provenance di usage, gagal tertutup bila stale/hilang/terlalu besar; tidak ada silent summary. Hermes alias lokal64K tanpa tools; preflight tokenizer GPT untuk reservasi budget existing. Tidak rerender proyek lama atau posting. Tes payload dan smoke model dibedakan dari uji produksi video.

## 4.23.10 — 2026-11-11 — ChatGPT

Keputusan owner: agent harus menindaklanjuti QC tertahan, merevisi hanya shot terdampak, generate ulang, QC, assembly dan melaporkan hasil. Implementasi Mac memakai rencana deklaratif API terikat skill, revisi terpisah dengan bukti asal, antrean/slot tunggal, batas tiga per shot lintas revisi, dan jalur REVIEW existing. Laporan PASS menyebut sampling; failure teknis/jurnal ambigu tidak diulang. Unit/integrasi bukan bukti pilot sampai MP4/readback nyata. Posting tetap terkunci.

## 4.23.9 — 2026-11-11 — ChatGPT

Audit insiden Saheela: file teknis lolos tetapi konten faceless FAIL. Tambah gate klip faceless opt-in di core dan wajib untuk Mac baru, sumber LAST_FRAME, binding/cache/attempts, pisahkan content status. Penulis membaca machine policy terikat SHA dokumen; profil natural_realtime_v1 wajib beat lengkap dan tempo normal. Dokumen METODE_PROMPT lama ditandai historis, bukan dipakai untuk mengganti template legacy secara diam-diam. Full naturalness/live profile pilot belum dibuktikan; tidak rerender Saheela atau posting.

## 4.23.8 — 2026-11-11 — ChatGPT

Audit keluhan owner workflow pasif: aktifkan n8n jadwal1menit, fallback watchdog/dedupe, laporan progres5menit/hasil otomatis, recovery koordinasi terbatasi, caffeinate selama otomasi owner aktif. Pisahkan kegagalan transport dari status produksi. Budget API memakai biaya aktual + reservasi belum terselesaikan; keylimit tetapUSD5, capharian tetapUSD0.10. Aktifkan writer OpenRouter baru, validasi dan koreksi maks3; live fixture gagal smiles lalu diperbaiki dan lolos generator. Tidak rerun Saheela atau posting. Revisi visual otomatis/readback Drive mandiri masih belum lengkap; tidak mengklaim produksi teks penuh teruji dari fixture storyboard.

## 4.23.7 — 2026-11-11 — ChatGPT

Owner meminta leadtime singkat dan shot lolos QC langsung animasi. Tambah scoped gambar/QC --only, streaming Mac per shot dalam worker tunggal, cache kalibrasi hanya bila hash kontrol sesuai, dan hapus kebutuhan approval storyboard untuk policy Mac baru. Default prompt faceless dan gate teknis tetap; assembly masih semua klip, posting terpisah. Regresi runner/konektor/upload/supervisor PASS. Saheela produksi RUNNING, belum bukti MP4. Leadtime belum diukur; tidak menjamin generasi sekali benar.

# 2026-11-11 — Hasil akhir migrasi Mac — ChatGPT

v4.23.6/1.10.6/0.22.6, Artistly1.1.1/1.0.1. Semua tes lokal PASS termasuk scoped-screen regression dan HTTP bridge nyata. Pilot stickman Mac berhasil sampai MP4 Drive dengan download/hash/decoder independen, bukan hanya dispatch. Scoped screen pernah mengganti kandidat lama; fix terbatas stickman dan recovery berbasis bukti. Audio/Remotion/Drive nyata lulus. n8n monitor manual SUCCESS; Hermes skill dipasang tanpa core/model call. Tidak ada posting/approval palsu. Batas: QC video sampling3frame, storybook live belum diuji, Sheet endpoint belum valid, YouTube channel read scope belum ada.

# 2026-11-11 — v4.23.6 / Runner Skill 1.10.6 / kode 0.22.6 — ChatGPT

Owner meminta semua komponen siap di Mac termasuk Artistly dan tukang posting. IMPLEMENTED runtime lokal bersyarat, checkpoint tanpa Git, antrean terisolasi, audio default lokal, staging ffmpeg, gate uploader dan dokumentasi Mac. TESTED regresi runner/Artistly, 12 tes lokal, kalibrasi ARM64, login layanan dan PDF sintetis. Prompt faceless tidak berubah. Pilot Mac aktual belum final saat entri dibuat; tidak ada posting. Akun Meta dan Sheet bergantung konfigurasi valid.

## Catatan hambatan 2026-11-10 — ChatGPT

GitHub account suspended403 terkonfirmasi diGit/CLIAPI/connector; fix0.22.5 belumdipush. Ditambahkan test-stickman-checkpoint berbasisGitreal tanpa network: reproduce dirtyshots/concurrentstatus, fixmenyimpanrefs/QC/statusremote. Bukti dan langkahresume dicatat, tidak ada dispatchretry/MP4/posting palsu.

# 2026-11-10 — v4.23.5 — ChatGPT

Pilot nyata42737284900: karakter2D Save/library/QC PASS dan6scene tersimpan; gagal checkpoint sebelumQCscene karena shots.json hasil pemasanganreferensi belum distage. Checkpoint kini memasukkan shots.json khususstickman; regresilokalPASS. Seluruhaset/budgetdipertahankan, SHOT01 percobaanRUNNINGtidakdireset. Agenmembuka semua7PNG: SHOT03 keduanya dompetganda,bendaFAIL disimpan, tidakmemalsukanPASS. Kontrol3Daktualditolakprofil2D. Belumklip/MP4pilot.

# 2026-11-10 — v4.23.4 — ChatGPT

Kalibrasi CPU nyata menemukan full-grader salah PASS pada kontrol bermata/mulut. Bukti gagal dipertahankan. Pemeriksa netral tanpa targetdesain mengenali kontrol kosong PASS_LOCAL dan bermata REJECT; gabungan gate permukaan independen+profil lengkap TESTED CPU dua kontrol, bukan klaim full-grader dapat dipercaya sendiri. Gate menuntut metode kalibrasi baru, QC frame klip juga memakai permukaan independen. Regresi test.mjs dan mekanisme media PASS. Bukti di gpt/audits/TWO-PRESETS-20261110. Kontrol3D tambahan masih menunggu hasil; pilot gambar belum dispatch saat pencatatan.

# 2026-11-10 — v4.23.3 — ChatGPT

Perkuat identitas referensi stickman memakai mediaId+nama unik aktual saat pemilihan, SHA256 byte asli dan pembacaan ulang cacheQC klip; isi berubah ditolak. Assembly memeriksa durasi target/decoder; SFX/ambience wajib yang gagal menghentikan delivery stickman. Metadata preset ikut child antrean gambar/video/review. TESTED suite lokal default/JOTA_AUTO=1; test-stickman-media ffmpeg nyata + mocked visual inference (bukan QC produksi) PASS. Prompt/gate faceless existing tetap. Kalibrasi modelCPU dan pilot masih menunggu hasil.

# 2026-11-10 — v4.23.2 — ChatGPT

Lengkapi Sheet stickman (cast/config/revisi/narasi) dan kartu teks/dalil opsional melalui komposisi Remotion baru yang tidak mengubah komposisi faceless. Kartu dalil butuh kecocokan teks/sumber dengan verified_sources. TESTED render sintetis3detik1080x1920 H264/AAC, teks dibuka dan ffmpeg decodePASS; unit timing/reject sumber tidak sah, suite lokalPASS. Bukti gpt/audits/TWO-PRESETS-20261110. Pilot VideoExpress tetap menunggu jeda login; bukan produksi selesai. PR30 mengisolasi environment tes JOTA_AUTO yang sudah menggagalkan review sebelum perubahan preset; runtime tidak diubah.

# 2026-11-10 — v4.23.1 — ChatGPT

Perketat owner posting gate untuk stickman meskipun bukan proyek orchestrated (legacy faceless tetap sama), tambah budget QC klip tersimpan maksimal tiga dan antre review existing setelah habis. TESTED lokal suite62 kelompok termasuk penolakan posting tanpa owner. Pilot resmi stickman-jujur-20261110-pilot-01 sedang ditahan jeda login existing; belum ada aset/job/MP4 pilot.

# 2026-11-10 — v4.23.0 — ChatGPT

Owner meminta implementasi dua preset end-to-end, faceless tidak berubah, tanpa posting. IMPLEMENTED: preset tervalidasi/default lama, generator stickman terpisah, karakter dahulu melalui runner/gate existing, QC stickman, pengikat resume/revisi, narasi opsional, assembly lengkap dan 2D. TESTED lokal node test.mjs (termasuk byte-identik output faceless audit ff05a19) dan regression DOM Save Image Chromium. Belum PRODUCTION_READY: pilot live menunggu bukti karakter/scene/klip/Drive. Tidak mengubah antrean atau aset produksi existing. Detail TWO_PRESETS.md.

# 2026-11-10 — v4.22.1 — ChatGPT

Perbaiki kegagalan livecheckpoint (committer identity dan konflik pointerSheet), watchdog bukan workerQC, dua false-positive grader (anatomi kucing/uncertain gesture). Pulihkan hasilQC nyata dari Drive tanpa resetbudget; sourceFAIL tetaptercatat. Gitbareintegrationtest +node test.mjs PASS. Belum mengklaim delivery MP4.

# 2026-11-09 — v4.22.0 — ChatGPT

Keputusan terbaru owner: workflow aktif sampai Drive, QC maksimal tiga percobaan lalu video review; posting setelah owner check. IMPLEMENTED coordinator/watchdog, durable QC budget, isolated review render/delivery, owner approval Telegram dan posting hash/platform gate; progres/receipt persist. Source FAIL/auto:false tetap, review bukan PASS palsu. TESTED lokal node test.mjs + actionlint. Live delivery baru belum dibuktikan saat commit.

# 2026-11-09 — v4.21.2 — ChatGPT

Owner meminta render langsung per shot yang seluruh QC lolos, QC shot lain tetap berjalan. Tambah progressive_video, scope ketat, journal/checkpoint, dependensi LAST_FRAME ditahan, final assembly tetap menunggu lengkap. Perbaiki Super Storyboard: sinkron awal, status per shot, sepuluh tab berdata episode dan dropdown valid; bukan hanya tiga tab di akhir. Regression node test.mjs dan actionlint PASS lokal. Live per-shot video belum dibuktikan; tidak mengklaim PRODUCTION_READY.

### v4.21.1 (2026-11-09, ChatGPT; penyelesaian kendali Telegram dan naskah lokal)
- Runtime teks llama-completion single-turn dengan checksum, diagnostik generator tidak hilang, revisi naskah maksimal tiga berdasarkan alasan validator nyata. Tidak melewati gate.
- Larangan eksplisit fitur seperti no facial features/no eyes, nose, or mouth diterima; aksi fitur positif tetap ditolak. Schema aksi model satu kalimat supaya tidak melampaui tiga kalimat per shot.
- TESTED regression lokal termasuk revisi setelah WAJAH dan batas tiga percobaan. Telegram nyata 42680480751 (receipt166), poller42680580491 dan reporter pos terkirim; naskah CPU42684248685 dan kalibrasi3gambar42710721872 SUCCESS; listener42709704294 aktif dengan poller otomatis. Batas dan kegagalan awal di AUTOMATION_TELEGRAM_20261109.md. Tidak mengklaim episode lolos.

### v4.21.0 (2026-11-09, ChatGPT; owner meminta video otomatis sesudah QC tanpa approve, laporan semua pos dan instruksi Telegram)
- IMPLEMENTED: delegasi otomatis tanpa memalsukan owner APPROVED, QC lengkap+Save/library/hash tetap wajib; FAIL/REVIEW tetap menahan. Transisi after-image-qc mengantre satu video hanya setelah seluruh bukti lolos; auto:false dipertahankan sebelum lolos. Tidak mengotorisasi publikasi.
- IMPLEMENTED: pemeriksa visual lengkap CPU dengan kalibrasi negatif SHOT04/10; alasan blurred/unclear menjadi REVIEW; audit FAIL tidak ditimpa model. REVIEW exit 2 diperlakukan sebagai QC_HELD, bukan galat infrastruktur.
- IMPLEMENTED: Telegram semua pos/proyek, status per gambar/klip, instruksi owner terautentikasi dan dedup offset/outbox; naskah model lokal untuk /buat, tanpa API model berbayar. Regression lokal TESTED; bukti live ditulis di AUTOMATION_TELEGRAM_20261109.md setelah tersedia. Tidak klaim episode lolos dari PASS_LOCAL saja.

### v4.20.9 (2026-11-09, ChatGPT; keputusan owner: close-up dan 360 derajat aman, hapus larangannya)
- IMPLEMENTED: hapus penolakan close-up/pendekatan ke wajah, putaran tokoh dan orbit kamera di cek-brief, generator dan validator legacy. Hapus orbit satu arah dan konversi putaran otomatis ke First Frame, Last Frame; tool eksplisit tetap dihormati.
- TESTED lokal dan Actions run 42630262637 SUCCESS, source 908e5ab (verifikasi saja): regression close-up wajah, orbit 360 dari belakang ke depan, tokoh spins/turns 360, output generator dan validator; gate gambar/local-face required tetap memblokir yang belum disetujui. Tidak ada render/generate/publikasi dari perubahan ini; uji owner menjadi dasar pencabutan aturan, bukan klaim bukti render baru oleh agen.

### v4.20.8 (2026-11-09, ChatGPT; owner meminta workflow membantu agen aktif)
- IMPLEMENTED: pisahkan validasi persiapan dari kesiapan produksi; siapkan auto:false+gate:gambar membangun dan menyimpan draft, gate tetap memblokir video. Generasi sementara dan guard hash mencegah hasil usang diteruskan.
- IMPLEMENTED: perintah eksplisit uji-gambar mengantre tepat satu tahap gambar sesudah persiapan; korelasi command ID ke run dan next_action membantu agen menindaklanjuti. Tidak ada API model atau pemicu sesi chat; tidak auto-video/regenerasi tanpa batas.
- TESTED lokal: regression Runner dan actionlint. Actions 42618344212 TESTED berhasil menyimpan draft pada 6338430, status terikat run pada c904fcf. Child generate baru regression; bukan bukti QC gambar baru.

### v4.20.6 (2026-11-09, ChatGPT; owner meminta Runner memeriksa tanpa kredit/token API)
- `TESTED` fixture di GitHub Actions run 42591704690: pemeriksa faceless lokal CPU, pilihan A/B, REJECT per fitur pada salah satu tokoh, REVIEW pada ketidakpastian/jumlah kepala tidak cocok, laporan revisi prompt; tidak ada API model cloud.
- Runtime/model dipin checksum; kriteria lain/owner tetap PENDING, auto:false dan gate tidak dilepas. Metadata expected_heads dari cast baru, bukti terikat hash gambar.
- Test logika lulus; run Actions 42591704690 SUCCESS pada Qwen4B CPU: memilih B polos, menolak A berwajah dan semua kandidat SHOT02 termasuk campuran. 0 API model/0 token API berbayar, owner PENDING. Artifact 13661612286 dan bukti permanen di fixture. Model ringan/2B yang gagal tidak diaktifkan. Bukan jaminan semua gambar atau pemeriksaan klip.

### v4.20.5 (2026-11-09, ChatGPT; owner meminta perbaikan Save Image dan satu uji nyata)
- `TESTED` satu gambar tanpa reference, Runner 0.18.4 / Runner Skill 1.7.4: koreksi scope toolbar modal untuk single image, receipt privat mediaId, exact library readback, SHA-256 dan kecocokan isi pixel untuk encoding berbeda, reload/Choose dan journal retry. Empty library 0 diperbaiki.
- Test Node dan DOM Chromium lokal lulus; pemetaan read-only run 42572311547 berhasil. Run 42573918068 menghasilkan/menyimpan mediaId 48060154. Recovery run 42575475145 SUCCESS: tidak generate ulang, isi pixel cocok (RMSE 0.00571886), reload dan Choose dari My AI Images berhasil. Source c1edfa8, artifact 13655393377; gambar dan screenshot dibuka. Pair hanya fixture, belum live ulang.
- Tidak mengubah auto:false atau gate, tidak merender/mempublikasikan video. Dokumentasi bersama Claude/ChatGPT di Runner Skill dan laporan audit.

### v4.20.4 (2026-11-08, owner contoh prompt sederhana berhasil)
- Owner menegur pemaksaan rear camera only dan prompt gambar bertele-tele; dihapus sebagai default. Kamera SHOT04 kembali front three-quarter.
- Image Prompt V6.0.0 mengawali setiap prompt orang dengan KEEP FACELESS FOR ALL CHARACTERS, no eyes/nose/mouth, disusul kamera storyboard, latar, identitas dan pose. 11 gambar BARU di image-v6 dengan tag AMPIS6; no stale VideoExpress refs.
- Enhance Image Prompt tetap OFF, gate:gambar tetap aktif; hasil PREVIEW_ONLY tidak diartikan siap untuk video. Runner 0.18.3 memvalidasi awalan faceless dan Enhance OFF.

### v4.20.3 (2026-11-08, owner reset seluruh VideoExpress images)
- Rebuild image prompts sebagai profil V5.0.0 untuk seluruh 11 initial stills: top-priority smooth faceless geometry, rear-only camera, 15yo Uwais, posisi tepat tangan/amplop/buku, pakaian dan jumlah pemeran.
- Permintaan owner: gambar berwajah tetap dianggap DITOLAK meskipun workflow gambar success. Semua ID lama di VideoExpress telah dihapus owner sehingga tidak boleh diambil ulang.
- Runner v0.18.2: mode image_reference_policy=none tidak memakai refs & Consistent Character; image_preview_only menghasilkan PNG untuk QC, wajib image-stage.json dengan status PREVIEW_ONLY dan not in library, tidak bisa meloloskan video. V4 enhance OFF diperketat.
- Image master references/PROMPT_IMAGE_FACELESS_V5.0.0.md. Batch baru image-v5 tag AMPI50, gate:gambar tetap, video tidak otomatis berjalan.

### v4.20.2 (2026-11-08 13:03 WIB, owner menanyakan video belum jadi)
- Audit nyata 20 PNG awal dari run gambar 42443001956: sebagian mata/mulut, anak Uwais terlihat dewasa, 2 gambar Uwais hanya pratinjau dan tidak tersimpan di library. Semuanya QC PENDING; video memang BELUM pernah dibuat V4.
- Perbaikan BUG PENTING: `dari-brief.mjs` sebelumnya menghilangkan `gate:gambar` jika `auto:true`; sekarang gate diteruskan selalu. `runner.mjs gambar` sekarang menandai preview-only bukan gambar jadi.
- Dukungan prompt gambar spesifik shot `klip[].image_prompt_v4` dan referensi no-glasses `ref_tokoh_v4` untuk uji pemulihan identitas Uwais. Dua shot pilot disiapkan dulu, bukan render video.
- Kode Runner v0.18.1, skill 4.20.2; master video prompt masih V4.0.0. Tidak ada posting.

### v4.20.1 (2026-11-08, owner lanjutkan produksi setelah revisi V4)
- Owner meminta mulai lagi. 11 gambar awal untuk 18 shot AMPLOP masuk antrean gambar `ampv4-20261108-gambar-01` slot 1.
- Brief/shots tetap prompt 4.0.0, Runner 0.18.0; `auto:true` untuk perintah owner, tetapi `gate:gambar` wajib menahan render sampai gambar awal faceless tanpa kacamata diperiksa dan disetujui. Tidak ada publishing.
- Catatan STOP sebelum instruksi ini bersifat historis; video final belum dibuat oleh revisi V4.

### v4.20.0 (2026-11-08, review fatal AMPLOP, perintah STOP)
- Owner menolak musik VideoExpress, suara tokoh native VX, wajah bermata, kacamata Uwais tanpa persetujuan, dan blok faceless yang terpisah dari gerakan.
- Prompt baru V4.0.0 (per-shot format faceless_v4): setiap rentang 2 detik menyebut wajah polos saat aksi, tidak ada heading wajah terpisah dan tidak ada satu pun kalimat dialog/narasi dalam video_prompt.
- Kode generator/validator/runner 0.18.0: suara asli VX dimute dalam rakitLokal, output audio dari ElevenLabs saja. SFX VX alternatif hanya jika owner menyetujui audio sumber dan vx_sfx_approved=true. Prompt set Image Type 3D, Enhance OFF, Creative OFF.
- Identitas AMPLOP Uwais tanpa kacamata: ref lama Uwais_kacamata dinonaktifkan PER PROYEK (file tokoh.json global tidak diubah); butuh gambar baru tanpa wajah dan tanpa kacamata yang lolos owner QC. Sambungan tujuh transisi menggunakan Save Last Frame.
- Rilis disiapkan sebagai DRAFT REVIEW: 18 klip, 180 detik, 18 prompt V4, semua validator/test Node PASS, panjang prompt maksimal di bawah benchmark 4.745 karakter. Brief dan shots.json auto=false, gate gambar aktif, tag AMPV4 revisi 2, tidak ada render atau publikasi baru.
- Belum diuji LIVE VideoExpress; jangan menyatakan kualitas gambar/audio 100% aman sebelum QC visual/audio owner.

### v4.19.1 (2026-11-08, laporan progres produksi)
- Permintaan owner: status ringkas setiap 5 menit selama produksi, berisi tahap, klip terkonfirmasi, kendala, dan bantuan yang diperlukan.
- Workflow `ohan78/Jota_runner/.github/workflows/jota-laporan-5menit.yml` memanggil `apps/videoexpress-runner/laporan-progress-5m.mjs` dan mengirim lewat Telegram JOTA setiap 300 detik selama aktif. Status tak terverifikasi disebut eksplisit. Tidak membuat video atau posting media sosial.
- Interval GitHub Actions best effort (terutama saat pergantian runner); ChatGPT tidak dapat mengirim tugas tiap 5 menit. SOP `gpt/LAPORAN-PROGRES-JOTA.md`.

# Catatan perubahan skill jota-video

Versi terbaru di atas. Aturan yang berlaku selalu yang ada di `SKILL.md` dan file referensinya; catatan ini menjelaskan kapan dan kenapa aturan berubah, termasuk keputusan owner.

### v4.19.0 (2026-11-08, migrasi draft dan versioning)
- Pinned versions: Skill 4.19.0, Runner skill 1.6.0, Runner application 0.17.0, Prompt V3.1.0. Manifest gpt/VERSI-JOTA.json.
- Master prompt baru references/PROMPT_FACELESS_V3.1.0.md, retaining original owner-tested V3.0.0; V3.1.0 conditional glasses and metadata have not had live VideoExpress QC.
- Migrasi otomatis **draft-only** (no shots.json, no progress.json), preserve briefs/projects already rendered, no enqueue render/post. Inventory in gpt/MIGRASI_V3_20261108.json.
- **Hasil teruji kode:** 21/21 proyek brief-only -> 124 shot V3.1.0, 0 error validator, 20 gate gambar masih aktif, 33 folder dengan shots lama terlindungi. Ada 110 warning prompt di atas panjang textarea lama yang pernah diuji (4.745 karakter); ini membutuhkan uji UI, bukan kegagalan validator.
- Draft lama dibetulkan secara terbatas: posisi dua tokoh, sambungan saat cast berganti, objek awal (pen, paper, tray, glass, money), dan instruksi speaking/gesture yang memancing wajah. Narasi dan sumber tetap dipertahankan.

### v4.18.0 (2026-11-08, ChatGPT, implementasi Runner V3; pengujian live BELUM DILAKUKAN)
- Generator `apps/videoexpress-runner/dari-brief.mjs` menulis prompt V3 untuk klip kartu berorang dan **memaksa Image Type 3D walau brief lama meminta Human**: CAMERA DETAILS paling awal, KEEP FACELESS ENTIRE VIDEO, blank-skin eyes/glasses lock 0:00, SPEECH FACE LOCK, timeline sampai durasi 3–10 detik, SFX, final face lock. Dialog eksternal dimaksudkan untuk ElevenLabs pascarakit, bukan animasi lip sync.
- `apps/videoexpress-runner/runner.mjs`: validasi `format: faceless_v3`, Image Type wajib 3D, Enhance OFF bawaan, verifikasi heading dan pengunci mata/mulut/timeline/SFX. Mode Creative sudah OFF di UI runner (tetap). Proyek lama format NATURAL tetap diterima demi kompatibilitas.
- Smoke test generator terisolasi dengan brief RANTING (7 shot): **PASS**, 6 shot berorang berformat V3, Image Type 3D, Enhance OFF, kamera awal, timeline, pengunci first-frame/eyes/mouth dan penutup terisi. Ini **bukan** tes Node CI atau render VideoExpress.
- `apps/videoexpress-runner/test.mjs`: tambah tes regresi V3 untuk format, tipe, Enhance OFF, first-frame dan timeline. **Tes belum dieksekusi di CI/Node; render live belum diverifikasi**, jangan lapor LOLOS Runner sebelum uji langsung.

### v4.17.0 (2026-11-08, ChatGPT, konfirmasi owner "berhasil" V3)
- **WAJIB** semua Video Prompt faceless memakai `references/PROMPT_WAJIB_FACELESS_V3_20261108.md` dengan CAMERA DETAILS paling awal, KEEP FACELESS ENTIRE VIDEO, FIRST FRAME FACE LOCK, CRITICAL GLASSES RULE, SPEECH FACE LOCK, TIMELINE + SFX, FINAL FACELESS LOCK.
- Uji manual owner: V1 mulut terlihat saat dialog, V2 mouth berhasil tetapi mata muncul sejak awal; **V3 berhasil menjaga mata dan mulut hilang** pada senam 10 detik dan putar 360 derajat, berkacamata.
- Pengaturan benchmark: Image Type 3D, Creative mode OFF, Automatically Enhance OFF, 9:16, 10 detik. Dialog external voice-over tanpa lipsync, perkuat faceless setelah tiap dialog. Foto asli sebagai sumber referensi agar hasil natural.
- Bereskan kontradiksi lama di SKILL.md: Image Type human, Enhance ON, prompt NATURAL tanpa timeline digantikan untuk Video Prompt faceless. `dari-brief.mjs`/Runner belum diverifikasi menggunakan format V3: **hanya perubahan aturan dan dokumentasi, bukan klaim implementasi otomatis**.

### v4.16.0 (2026-11-07, Claude, uji owner 22:09)
- Prompt emas faceless (`references/PROMPT_EMAS_FACELESS_20261107.md`): kacamata + bicara bahasa Indonesia + putar 360 derajat, wajah polos 100%. Kalimat penutup wajib setelah ucapan terakhir. Ucapan native VideoExpress lolos uji ini.

### v4.15.0 (2026-11-07, Claude, uji manual owner 21:18-21:41)
- Image Type **3D** wajib (Creative mode OFF): uji owner, prompt sama, Creative mode memunculkan wajah lengkap, Image Type 3D faceless lolos. dari-brief bawaan image_type '3d' (sebelumnya 'human'). Belum TESTED di runner.
- Format prompt video baru yang lolos uji owner (adegan Aba lampu teras): blok **FACELESS RULES** berbutir di paling atas, lalu AUDIO, STYLE, COLOR LOGIC, CAMERA DETAILS, lalu **TIMELINE per 1-2 detik dengan SFX di tiap segmen**. Baju di prompt wajib sama dengan foto acuan (kaos olahraga beda dari acuan gamis = wajah muncul). SPEC: dari-brief menulis format ini. Uji owner 21:52: berputar 360 derajat tetap faceless dengan format ini.

### v4.14.0 (2026-11-07, Claude, owner 18:36)
- Benchmark tokoh faceless (`references/BENCHMARK_FACELESS_20261107.md`): acuan wajib untuk tokoh dewasa, tanpa jenggot, latar polos tampak depan; adegan malam berisiko; gaya stilistis (papercraft) lebih aman. Tiga baris baru di tabel bagian 5. Aba memakai acuan `Aba_polos` (owner 16:28 setuju tanpa jenggot). Rakit lokal jadi bawaan (timeline VideoExpress bernama sama memberi klip lama). Impor Artistly oleh runner (owner 18:13: jangan suruh owner).

### v4.13.0 (2026-11-07, Claude, owner 09:34)
- Antrean perintah berbasis file untuk ChatGPT mode chat: `gpt/perintah.json` dibaca workflow `jota-perintah` (Jota_runner, tiap 10 menit): siapkan, gambar, produksi; posting ditolak; jeda login 20 menit; status di `gpt/status-perintah.json`. Uji penolakan TESTED. Perbaikan audio 8 detik dan ekor hitam (IMPLEMENTED, diuji lokal).

### v4.12.1 (2026-11-07, Claude, owner 04:53)
- Saring wajah otomatis di gambar Artistly; naskah resep memotong frame di tulang selangka.

### v4.12.0 (2026-11-07, Claude, owner 04:02 dan 04:35)
- Lini video resep tangan: Remotion gaya acara memasak (`IntroMasak`, `LangkahMasak`, `OutroMasak`, serial.gaya = masak), suara KOKI (Putri Maharani), storyboard dan acuan juru masak di Artistly. Juru masak perempuan wajib syar'i.

### v4.11.2 (2026-11-06, Claude)
- YouTube hanya diunggah saat posting (public). Catatan kacamata hilang di klip SAMBUNG.

### v4.11.1 (2026-11-06, Claude)
- Aksesoris brief masuk Image Prompt natural. Posting: cadangan YouTube unggah ulang public, Instagram coba ulang, posting ulang per platform. H07 revisi 3. test.mjs lolos.

### v4.11.0 (2026-11-06, Claude, owner 17:08-18:44)
- Acuan tokoh dari Artistly: tokoh.json `ref` boleh { library, name } (Uwais_kacamata, Kakek_Hasan, Dimas di My Artistly Images). dari-brief menandai acuan `peran: tokoh`. H07 revisi 2: klip Uwais (02, 03, 04, 06) dengan acuan berkacamata dan ucapan ElevenLabs. test.mjs lolos.

### v4.10.1 (2026-11-06, Claude)
- Tidak ada lagi FINAL bolong. Diagnosa Last Image. Impor Artistly ke VideoExpress (`impor-artistly`, IMPLEMENTED, sedang diuji). test.mjs lolos.

### v4.10.0 (2026-11-06, Claude, owner 15:58)
- Rumus owner: membelakangi kamera lalu berbalik/menoleh = First Frame, Last Frame (awal membelakangi, akhir menghadap kamera faceless). `dari-brief.mjs` mendeteksi otomatis; gambar akhir mendukung beberapa tokoh. Ummi H01 SHOT04 revisi 3 dengan rumus ini. test.mjs lolos.

### v4.9.4 (2026-11-06, Claude)
- Batas id kartu per kiriman (`lib_batas`) supaya revisi tidak memakai klip lama. Puasa berhasil lewat rakit lokal (TESTED). test.mjs lolos.

### v4.9.3 (2026-11-06, Claude)
- finish: kesiapan klip lewat API, cadangan rakit lokal ffmpeg (IMPLEMENTED, uji di puasa). test.mjs lolos.

### v4.9.2 (2026-11-06, Claude, owner 13:03 "natural gak")
- Dialog ElevenLabs diberi waktu mulai per kalimat (`t`, dibatasi agar selesai di dalam klip); tokoh yang bicara diberi gerak kecil di Video Prompt. Shots Kakek E01/E02 dan Ummi H01 dibuat ulang. test.mjs lolos. SPEC: gema ruangan pada dialog.

### v4.9.1 (2026-11-06, Claude)
- Ummi H01 ditahan dan direvisi (SHOT04, SHOT06). Brief `suara_el` untuk klip revisi di episode bersuara native. Label detik lembar wajah diperbaiki. test.mjs lolos.

### v4.9.0 (2026-11-06, Claude, owner 12:10 "setuju pakai elevenlab saja")
- Semua ucapan tokoh lewat ElevenLabs: `dari-brief.mjs` tidak menulis ucapan di Video Prompt dan mengisi `dialog` (termasuk ucapan di langkah); `narasi-tokoh.mjs` membaca dialog lalu narator. Suara KAKEK_HASAN (Dakocan 0.94) dan DIMAS (Alif 1.14). Juga: runner memuat ulang halaman setelah kartu diberi nama label. Shots Kakek E01/E02 dibuat ulang. test.mjs lolos.

### v4.8.3 (2026-11-06, Claude, owner 10:51)
- Uwais berkacamata bulat hitam (tokoh.json, acuan Artistly `acuan/UWAIS.png`). gambar-v6 menunggu galeri stabil sebelum Generate. H07 masuk antrean atas persetujuan owner. test.mjs lolos.

### v4.8.2 (2026-11-06, Claude)
- `lembar-frame.sh` membuat lembar wajah 360 px. H07 ditahan (mulut terlihat). Aturan jarak login 20 menit.

### v4.8.1 (2026-11-06, Claude)
- `findCard` menamai kartu prompt-enhance kembar dengan label. `gambar-v6` menolak gambar galeri lama dan kembar; E01 diulang. test.mjs lolos.

### v4.8.0 (2026-11-06, Claude, owner 09:35)
- Serial baru Kakek Hasan dan Dimas (tokoh baru di tokoh.json tanpa ref), E01 "Sandal di Teras Masjid" (HR. Muslim 35) dan E02 "Salam Dulu, Dimas!" (HR. Muslim 54), masing-masing 60 detik. `dari-brief.mjs` mendukung tokoh tanpa acuan dan nama dua kata; `brief-ke-naskah.mjs` memakai deskripsi lengkap bila acuan belum ada; workflow `gambar-v6`. test.mjs dan uji artistly lolos.

### v4.7.1 (2026-11-06, Claude)
- Daftar kartu My AI Videos 200 terbaru (paralel). Gagal login menghentikan ulang otomatis; daftar periksa 3 menambah jeda dan uji login. test.mjs lolos.

### v4.7.0 (2026-11-06, Claude, owner 07:40)
- Bagian 10a ditulis ulang: storybook Artistly wajib per episode (storyboard bergambar, carousel, buku 10 episode). `brief-ke-naskah.mjs` baru (TESTED: dua naskah), `ekspor-acuan` dan `komik` IMPLEMENTED.

### v4.7.0 (2026-11-06, Claude, owner 07:39)
- Rencana Artistly untuk monetisasi (SPEC): Storybook sebagai storyboard otomatis, carousel IG/FB, e-book per 10 episode, kompilasi video. Pilot A dengan Uwais H07.

### v4.7.0 (2026-11-06, Claude, owner 07:38)
- Bagian 10a: Storybook Studio Artistly untuk monetisasi (gambar adegan, carousel versi buku, thumbnail, produk digital buku cerita dan mewarnai). SPEC, pilot satu episode setelah ekspor acuan.

### v4.6.1 (2026-11-06, Claude)
- Matan Arab jadi kartu hadis (bukan subtitle Whisper). `runner.mjs ekspor-acuan` dan `artistly.mjs peta-adegan` untuk alur Artistly gambar adegan. test.mjs lolos.

### v4.6.1 (2026-11-06, Claude, tugas Pusat Komando)

- FINAL Uwais H07 tidak masuk antrean posting: mulut Ukasyah muncul di SHOT05 (menunduk sambil bicara). SHOT05 diulang (revisi 2), kepala tegak.
- `cek-brief.mjs`: pose yang terbukti memunculkan wajah kini juga diperiksa di kartu klip (`awal`, `aksi`, `akhir`); menunduk ditambahkan. `test.mjs` lolos.
- SKILL bagian 5 dan 11 ditambah.
- Revisi 2 SHOT05 jalan, tetapi FINAL v2 masih memakai klip lama (SSIM 0,98). Bug findCard label -R2 dicatat di SKILL 11, belum diperbaiki; H07 tetap di luar antrean posting.

### v4.6.0 (2026-11-06, Claude, owner 06:51)
- Bagian 10b baru: daftar periksa wajib (sebelum dispatch, saat menulis brief, sebelum antrean posting, setiap masalah) yang disusun dari semua kesalahan bagian 11. `apps/videoexpress-runner/lembar-frame.sh` untuk lembar frame FINAL lewat REST.

### v4.5.1 (2026-11-06, Claude)
- `runner.mjs findCard`: kecocokan lewat nama prompt enhance hanya bila tepat satu kartu; jalur pencarian dicatat. Puasa Saheela dirakit ulang dengan klip SHOT05-R2. test.mjs lolos.

### v4.5.0 (2026-11-06, Claude, owner 06:36)
- Delegasi owner: agen menyetujui storyboard dan gambar sendiri, wajib memeriksa contact sheet FINAL sebelum antrean posting. AGENTS.md aturan 9: satu produksi per jalur. Uwais H07 dan Ummi H01 disetujui dan diproduksi di jalur 2 dan 3.

### v4.4.3 (2026-11-06, Claude)
- Image Prompt klip tanpa orang dipertegas (UMMI01 SHOT07 sempat berisi pria berwajah). QC kandidat Uwais H07 dan Ummi H01 diisi; temuan kacamata Uwais dicatat.

### v4.4.2 (2026-11-06, Claude, owner 06:20 "masih keluar mata dan mulut")
- Bagian 5: SAMBUNG dari frame pelukan atau wajah tertutup terbukti memunculkan wajah (PUASA01 SHOT05). Puasa Saheela ditahan dari posting, revisi 2 hanya SHOT05 (BARU, satu tokoh). `dari-brief.mjs` meneruskan `revision`, `regen`, `facebook_draft`. Video baru masuk antrean posting setelah owner menilai FINAL.

### v4.4.1 (2026-11-06, Claude)
- Jalur paralel VideoExpress TESTED (gambar slot 2 bersamaan produksi slot 1, keduanya sukses). Produksi puasa Saheela sukses setelah perbaikan alat (cache tanpa apt).

### v4.4.0 (2026-11-06, Claude, owner 05:57)
- Pusat Komando JOTA: papan perintah tunggal (artifact dengan database) dan tugas terjadwal tiap jam yang memprosesnya dengan kunci versi; perintah lewat chat dicatat di papan dulu. Mencegah instruksi ganda dari dua sesi.

### v4.3.0 (2026-11-06, Claude, owner 05:50)
- Jalur paralel VideoExpress `slot` 1 sampai 3 (IMPLEMENTED, uji pertama berjalan). Cron posting ganda dihapus; kesalahan dua sesi bersamaan dicatat.

### v4.2.2 (2026-11-06, Claude, owner 05:47)
- Posting 3 slot per hari (07:07, 12:07, 19:07 WIB), menggantikan batas 1 per hari. Hitungan kapasitas produksi dicatat di bagian 8.

### v4.2.1 (2026-11-06, Claude)
- `runner.mjs gambar`: tunggu 10 menit per gambar, gagal satu shot tidak menghentikan shot lain, kandidat.json digabung. `jota-gambar`: lanjut otomatis 2 kali, screenshot gagal ke Drive (artifact publik dihapus). Dua kesalahan baru dicatat di bagian 11. test.mjs lolos.

### v4.2.0 (2026-11-06, Claude, owner 05:43 "anti gagal")
- `jota-produksi` (Jota_runner): cek shots.json di awal, cache Chromium dan ffmpeg statis tanpa apt, lanjut otomatis maksimal 2 kali dengan `sudah_terkirim` dari progress.json, kabar Telegram sukses atau gagal. Workflow lain yang memakai Chromium tidak lagi `--with-deps`.
- SKILL.md bagian 8: tabel "Alur anti gagal" dan siklus wajib catat, rencana, perbaiki, cek, tinjau, perbarui.

### v4.1.7 (2026-11-06, Claude, owner 05:23)
- Kompilasi per 10 episode (sebelumnya 7 per minggu), dipicu posting harian setelah episode tayang, tayang terjadwal Sabtu 09:07 WIB; `kompilasi.mjs` dan `kompilasi-cek.mjs` umum untuk semua serial.
- Dashboard serial baru: Ummi yang Hebat, Kisah Saheela, Umair si Amanah, Ubaid si Kecil, Nasihat Aba (10 tema masing-masing, hadis kandidat wajib dicek). Brief Ummi H01 dan puasa Saheela dihubungkan ke dashboard.

### v4.1.6 (2026-11-06, Claude, owner 05:15)
- Posting terjadwal: `jota-posting-harian` 19:07 WIB, 1 video per hari ke YouTube public, Instagram, Facebook; antrean `antrean-posting.txt`, riwayat `riwayat-posting.txt`. Produksi tidak lagi membuat draft Facebook; brief kembali `privacy: private` (puasa Saheela, Uwais H07, Ummi H01). Puasa Saheela jadi posting pertama, hari ini 19:07 WIB.

### v4.1.5 (2026-11-06, Claude, owner 05:01)
- Bagian 10a baru: Artistly untuk gambar awal storyboard saat VideoExpress sibuk, baju adegan bebas dengan ciri fisik dan skala tetap. Status SPEC dengan tiga syarat bukti. `artistly.mjs peta-gambar` dan mode workflow `peta-gambar` (hanya membaca) dibuat untuk syarat 1.
- ElevenLabs Text to Animation diperiksa dan tidak dipakai (model video pihak ketiga, bukan API, berkredit); animasi teks tetap Remotion.

### v4.1.4 (2026-11-06, Claude, owner 04:49)
- Aturan tetap baru: setiap kesalahan diperbaiki di tempatnya dan dicatat di SKILL.md bagian 11 (baru), CHANGELOG, dan memory proyek. Bagian 11 berisi kesalahan 2026-11-05 beserta pencegahannya.

### v4.1.3 (2026-11-05, Claude, owner 23:16)
- Image Prompt natural dengan dua tokoh atau lebih menyebut skala dua kali: perbandingan kepala dan tinggi nyata dalam cm dari tokoh.json ("Real heights: Ummi 160 cm, Saheela 115 cm; keep this height difference exactly, sitting or standing."). SKILL.md, METODE_PROMPT.md disesuaikan. test.mjs lolos.

### v4.1.3 (2026-11-05, Claude, owner 23:16)
- Image Prompt selalu menulis skala: umur dan tinggi cm tiap tokoh (juga klip satu tokoh); dua tokoh: posisi kepala si kecil saat berdiri dan duduk, dan hubungan ayah atau ibu dengan anak kecil, "never like siblings or the same age" (atas permintaan owner). SKILL.md bagian 3, METODE_PROMPT.md, `dari-brief.mjs`. test.mjs lolos. Uji 4 klip PUASAU4 dijalankan ulang dengan prompt ini.

### v4.1.2 (2026-11-05, Claude, owner 23:05 "coba generate 4 scene")
- `dari-brief.mjs`: Image Type bawaan `human` sesuai SKILL.md bagian 2 (sebelumnya masih `3d`); brief boleh `image_type`.
- Uji 4 klip `JOTA-M1-PUASA-SAHEELA-UJI4-20261105` (tag PUASAU4, klip 1 sampai 4 puasa Saheela, tanpa gate gambar, tanpa unggah YouTube) atas perintah owner untuk melihat hasil prompt v4.1.

### v4.1.1 (2026-11-05, Claude, owner 23:01)
- Video Prompt natural hanya diawali label pelacak `TAG-SHOTxx:` lalu langsung prompt, tanpa judul klip (judul tadinya ikut terketik ke VideoExpress). METODE_PROMPT.md disesuaikan. test.mjs lolos.

### v4.1.0 (2026-11-05, Claude, owner 22:54)
- Urutan Video Prompt NATURAL: faceless, lalu penampilan (baju dan aksesoris sama dengan gambar acuan), baru shot dan kamera, aksi berurutan, ucapan, yang diam, "No music." (sebelumnya kamera di depan). SKILL.md bagian 3, METODE_PROMPT.md, `dari-brief.mjs` diubah di commit yang sama; kalimat penampilan tidak mengulang hijab. `runner.mjs` cek kunci penampilan disesuaikan. test.mjs lolos.

### v4.0.1 (2026-11-05, Claude, owner 22:50 "ini pro atau natural?")
- Bug v4.0.0: Image Prompt klip NATURAL masih memakai blok PRO berlabel (MANDATORY RULES, CONSISTENCY LOCK, AVOID). `dari-brief.mjs` kini menulis Image Prompt satu paragraf teknis sesuai METODE_PROMPT.md (shot dan adegan, faceless, tokoh dan baju, skala, ruangan, gaya, penutup konsistensi), tanpa daftar larangan; shot tanpa orang juga satu paragraf. Field `image_format: "natural"`. Blok lama hanya untuk `gaya_prompt: "lengkap"` (metode PRO).
- `runner.mjs validate`: menerima `image_format: "natural"` (klip berorang wajib menyebut wajah halus/faceless, tanpa orang wajib "no people"). test.mjs lolos.
- Puasa Saheela: shots.json dibuat ulang, run jota-gambar yang memakai prompt lama dibatalkan dan dijalankan ulang.

### v4.0.0 (2026-11-05, Claude, owner 22:31 "rombak total")
- SKILL.md ditulis ulang dari nol (v3.100.1 diarsip di `archive/SKILL_v3.100.1.md`): satu aturan per topik, sesuai tutorial VideoExpress 3.5 dan uji smooth owner. Dibuang: tumpukan aturan wajah tiga lapis, pengecualian "shot berorang tidak boleh SAMBUNG" (v3.80), "6 shot x 10 detik", "baju harus sama dengan foto acuan" (diganti baju per adegan v3.93), alur Mac jaga dan Final Cut, pemicu push, dan rujukan dokumen lama sebagai instruksi.
- Ditetapkan: NATURAL satu-satunya default; ucapan tokoh native di klip, narator ElevenLabs hanya pembuka, hadis, penutup; klip BARU dengan Ref1 tokoh + Ref2 ruangan, SAMBUNG dari Save Last Frame, jangkar tiap 3 klip; Enhance ON; durasi 3 sampai 10 detik per klip; storyboard dan gambar disetujui di Sheet; Actions di Jota_runner.
- METODE_PROMPT.md ditulis ulang (lama: `archive/METODE_PROMPT_v3.99.md`).
- `dari-brief.mjs`: kalimat shot dan kamera selalu di depan (juga klip SAMBUNG), ditambah "everything else stays still". `narasi-tokoh.mjs`: audio klip NATURAL berucapan dipertahankan saat perakitan (dulu terbuang karena ada suara latar). test.mjs lolos.
- AGENTS.md, gpt/AGENTS.md, README modul: menunjuk ke v4.

### v3.100.1 (2026-11-05)
- Meta tersambung: Facebook Reel DRAFT otomatis (Page Ohan Kang), Instagram @kohar_u3 lewat workflow `jota-instagram` atas perintah owner. Secrets META_PAGE_ID dan META_PAGE_TOKEN (user token jangka panjang) di Jota_runner. Apps Script Sheet v3 terpasang dan diizinkan.

### v3.100.0 (2026-11-05)
- Actions pindah ke repo publik `ohan78/Jota_runner` (menit gratis; repo private kena batas billing). Workflow di repo ini dipindah ke `.github/workflows-nonaktif/`. Dispatch: `gh api -X POST repos/ohan78/Jota_runner/actions/workflows/<wf>/dispatches`. Tidak ada pemicu push lagi (produksi selalu lewat dispatch). Log di repo publik: ID Drive dan YouTube disamarkan.

### v3.99.8 (2026-11-05)
Owner 16:50: "kalau music tetap diingatkan, karena possibility-nya besar muncul; kalau yang possibility kecil tidak perlu ada larangan". Prompt NATURAL kembali diakhiri "No music."; prinsip larangan hanya untuk masalah berkemungkinan besar dicatat di `METODE_PROMPT.md`. Tes lolos.

### v3.99.7 (2026-11-05)
Owner 16:40: "hapus larangan jadi bingung, kan sudah saya kasih contoh". `dari-brief.mjs` menulis Video Prompt NATURAL dengan pola klip owner yang smooth (benchmark 2026-11-04): kamera, aksi berurutan dengan ucapan ("Then, Umair says softly"), satu kalimat faceless, satu kalimat penampilan (rambut, baju, bawaan), satu kalimat ruang. Blok kunci panjang v3.97 sampai v3.99.6 dan semua kalimat larangan ("nothing changes", "No music", "never") dihapus dari prompt NATURAL. Prompt pilot turun dari sekitar 1.800 ke 800 sampai 1.100 karakter. `METODE_PROMPT.md`, `STORYBOARD_SHEETS_GATE.md`, dan aturan inti 8 diperbarui di tempat. Pilot revisi 4: pintu dibuka ke arah dalam di SHOT02, SHOT03 hanya berjalan maju. Catatan: "No music" ikut dihapus; musik di klip diamati di pilot (aturan tanpa musik tetap berlaku). Tes 42 lolos.

### v3.99.6 (2026-11-05)
Owner 16:39: "ga perlu di tulis lah, natural saja, Uwais jalan maju dengan diikuti kamera". Kalimat larangan mundur dari v3.99.5 dicabut, dan kunci rambut v3.99.2 ditulis ulang tanpa kata "bald" dan "smooth skin-colored dome" (menyebut botak bisa memancing botak). NATURAL memakai deskripsi positif: tokoh dan arah geraknya ditulis langsung di aksi. Tes 42 lolos.

### v3.99.5 (2026-11-05)
Owner 16:16 menilai pilot PLUMAIR2: (1) masih tiba-tiba botak, (2) Umair mundur sebelum masuk pintu. Prompt NATURAL kini mengunci arah gerak ("only ever moves forward ... never steps, walks, or slides backward"), sama dengan `K_MOTION` format PRO yang tidak ikut ke NATURAL. Botak: kunci rambut v3.99.2 ada di prompt yang dikirim, tetapi VideoExpress menampilkan klip dengan prompt hasil Enhance ("kartu bernama prompt enhance" di log), sehingga kunci bisa hilang setelah ditulis ulang Enhance. Dugaan ini belum terbukti; uji yang diusulkan: pilot dengan `"enhance": false` (menunggu izin owner, karena Enhance ON keputusan owner v3.92). Temuan lain: GitHub Actions berhenti menjalankan job ("recent account payments have failed or your spending limit needs to be increased"), jadi produksi dan uji di server tertahan sampai owner membereskan billing GitHub. Tes 42 lolos.

### v3.99.4 (2026-11-05)
Owner 15:22: "kasih kode" (Apps Script untuk Sheet). `drive-upload.gs` mendapat aksi `sheet_episode` (salin MASTER ke folder proyek), `sheet_write` (tulis baris per nama header, pertahankan kolom keputusan owner), dan `sheet_read`; unggah lama tidak berubah; MASTER ditolak untuk ditulisi. `sheet-sync.mjs` (tulis/ambil), workflow `jota-sheet-sync`, langkah Sheet di `jota-gambar`. Tes: 42 lolos (baris cocok dengan header MASTER, persetujuan Sheet hanya untuk kandidat pilihan LLM); Apps Script disimulasikan dengan Spreadsheet tiruan (tulis, pertahankan APPROVED, baca, tolak MASTER, tab tidak ada). Status `IMPLEMENTED`: belum jalan di akun sampai owner menempel kode baru dan Deploy versi baru.

### v3.99.3 (2026-11-05)
Pelajaran pilot PLUMAIR1 dicatat di skill (owner 15:02: "sudah update skill?"). Ref2 ruangan dan gate gambar naik ke `TESTED` di akun; cara membuat master ruangan (klip pendek + Save Last Frame) ditulis di aturan 1A. Runner Skill 1.4.0: pelajaran PLRUANG1 dan PLUMAIR1 (gambar tanpa orang tidak masuk library, Ref2 terbukti, rambut hilang, folder My AI Videos sesekali gagal dibuka, klip revisi tidak ditemukan, `SHOTxx@n`, slider durasi), dan aturan agen: klip revisi yang tidak muncul sekitar 10 menit dihentikan dan dilaporkan, tidak ditunggu sampai batas. Tanpa perubahan kode.

### v3.99.2 (2026-11-05)
Owner 12:20 mengirim dua frame pilot: "rambut jadi botak". Frame akhir menunjukkan rambut hilang di tengah SHOT04 (gambar awalnya berambut) lalu terbawa ke SHOT05-06; shot teras tampak belakang aman. Penyebab: prompt NATURAL tidak mengunci rambut, dan kunci baju untuk semua tokoh kecuali Uwais kosong karena `tokoh.json` hanya punya `baju` untuk Uwais. Perbaikan: `tokoh.json` mendapat `rambut` untuk semua tokoh dan `baju` untuk tokoh lain (ransel dipindah ke `bawaan` per klip); `dari-brief.mjs` menulis kalimat kunci rambut di awal prompt NATURAL; `plan` memperingatkan prompt NATURAL berorang tanpa kunci rambut. Pilot: SHOT06 tidak lagi memutar badan (frame owner menunjukkan tonjolan hidung saat menoleh), revisi 2 membuat ulang SHOT04-06 dengan gambar awal yang sama. Tes 41 lolos.

### v3.99.1 (2026-11-05)
Keputusan owner 10:37: pilot 6 shot, suara dialog NATURAL pilihan (a) native VideoExpress, rekaman suara asli cukup di Drive, clone Umair dipakai. Rekaman `characters/suara-asli/` dan workflow `jota-suara-asli` dihapus dari repo (file Drive tetap, ID dicatat di `suara.json` `acuan_audio`). `suara.json` UMAIR = clone `Umair` nada 1. Pilot: `evals/PILOT-RUANG-20261105` (gambar ruangan master tanpa orang untuk Ref2) dan `evals/PILOT-GATE-UMAIR-20261105` (6 klip Umair pulang sekolah, `"gate": "gambar"`, `ref_ruang`, salam sesudah mengetuk). Perbaikan cek-brief dari pilot: "backpack on his back" tidak lagi dianggap pose berbaring, "keeping his head upright" tidak lagi dianggap bergerak menuju tempat. Tes 40 lolos.

### v3.99.0 (2026-11-05)
Pembangunan sistem untuk alur v3.97/v3.98 (owner 10:09: "sekarang system nya dibangun", Claude). Baru: `apps/videoexpress-runner/gate.mjs` dan perintah `qc-siap`, `pasang-gambar`; `jota-gambar` membuat kerangka `awal/qc.json` setelah dua kandidat tersimpan; `plan`/`run` menegakkan gate gambar kalau shots.json memuat `"gate": "gambar"` (kandidat dipilih agen multimodal, semua kriteria PASS/NA, owner APPROVED, sha256 cocok). Ref2 ruangan: `ref_ruang` di brief atau klip menjadi Reference Photo 2 untuk klip BARU satu tokoh, plus baris `ROOM REFERENCE` di Image Prompt; `cek-brief` menolak dua tokoh + ruangan. Tes 39 lolos; 50 shots.json lama divalidasi ulang tanpa perubahan hasil; brief tanpa `gate`/`ref_ruang` menghasilkan shots.json identik dengan sebelumnya. Status: gate `TESTED` tanpa browser, Ref2 `IMPLEMENTED` (belum diuji di akun). Tidak ada produksi atau kredit.

### v3.98.4 (2026-11-05)
Owner 10:03: "untuk membuat tokoh bicara hati-hati, describe dulu action mau ngapain; contoh yang tidak boleh: karakter belum sampai ke pintu tapi sudah mengucapkan assalamualaikum, too early". Aturan inti 4 dan algoritma storyboard: ucapan melekat pada langkah aksi yang sudah mencapai pemicunya. `dari-brief.mjs` menulis ucapan dengan "Only after that action is fully finished, ... says" (dan "Only after all of the action above is finished" untuk ucapan tingkat klip). `cek-brief.mjs` modul baru `[UCAPAN]`: ucapan tanpa aksi dan salam sebelum tokoh tiba atau mengetuk ditolak (konteks: `awal` klip dan semua langkah sampai langkah itu), ucapan sambil berjalan menuju tempat diberi peringatan. Dicek pada brief owner `UJI-KARTU-KLIP`, `UJI-NATURAL-OWNER`, `UJI-WORKFLOW-OWNER`, `UJI-GAMBAR-DULU`: tidak ada penolakan palsu. `STORYBOARD_SHEETS_GATE.md` 6a: onset dialog di Sheet sesudah aksi pemicu. Tes 37 lolos. Status: `TESTED` tanpa browser, belum diuji di klip nyata.

### v3.98.3 (2026-11-05)
Koreksi Claude atas v3.98.2 (owner 10:00: "dialog antara tokoh boleh kan, tidak pengaruh ke faceless"). v3.98.2 menulis "tokoh tidak bicara di klip" untuk semua paket, padahal sejak v3.90 metode NATURAL memakai ucapan native di Video Prompt (19 klip owner lolos faceless) dan `dari-brief.mjs` memang menulisnya begitu. Aturan inti 4, tabel bagian 2, `AGENTS.md`, dan `gpt/AGENTS.md` kini menulis: dialog antar tokoh boleh di semua metode, wajah tetap polos; NATURAL = ucapan native, PRO dan format lama = voice over ElevenLabs. Pertentangan yang tersisa (suara native berubah per klip vs voice lock v3.98) dicatat menunggu keputusan owner. Tanpa perubahan kode.

### v3.98.2 (2026-11-05)
Perbaikan aturan untuk kerja dua agen (owner 2026-11-05: "saya akan menggunakan dual komunikasi kamu dan chatgpt", Claude). Aturan baru: `AGENTS.md` bagian "Kerja dua agen" (pembagian file, pull sebelum edit dan push, satu commit per perubahan, `[Claude]`/`[ChatGPT]` di pesan commit, naik versi, serah terima di `OPEN_ITEMS.md`, konflik diputuskan owner); label status fitur `SPEC`/`IMPLEMENTED`/`TESTED`/`PRODUCTION_READY` (SKILL.md bagian 8). Diperbaiki: 3A dan deskripsi skill menulis jalur utama server GitHub dan Mac hanya cadangan (owner 2026-11-05: tidak tergantung MacBook); kalimat Final Cut di 3A dibatasi ke `"final": "finalcut"` sesuai keputusan 21:34; tabel bagian 2 tidak lagi menulis "dialog native" dan "tidak di-dubbing" (bertentangan dengan aturan inti 4) dan tidak lagi menulis "agen tidak memeriksa gambar" (bertentangan dengan aturan inti 5 v3.97); urutan berlaku aturan wajah dirangkum di aturan inti 9 (bukan aturan baru). Voice lock: `narasi-tokoh.mjs` memakai `voice_id` dari `suara.json` kalau ada dan berhenti dengan error kalau nama tidak cocok persis (dulu memakai hasil pertama diam-diam); semua nama di `suara.json` dicek cocok dengan akun ElevenLabs lewat `jota-daftar-suara`. `AGENTS.md` dan `gpt/AGENTS.md` diselaraskan (Enhance ON, voice over, NATURAL/PRO, kartu klip); contoh brief kartu klip baru `gpt/productions/CONTOH-KLIP/` karena `CONTOH-BRIEF` format lama ditolak `cek-brief` sejak v3.87. Tes 36 lolos.

### v3.98.1 (2026-11-05)
Audit Runner terhadap v3.98 (handover owner 2026-11-05, Claude). Kode: `runner.mjs` `checkNatural` tidak lagi menolak prompt NATURAL di atas 1.500 karakter (owner v3.96: "Natural bukan ringkas"); di atas 4.745 karakter (panjang terbukti, H02F SHOT05) hanya peringatan, dan `verifyBeforeCreate` tetap menolak Create kalau textarea memotong prompt. `plan` memberi peringatan kalau faceless tidak disebut di 700 karakter pertama prompt NATURAL berorang. `dari-brief.mjs` memindahkan kunci faceless dan baju ke kalimat pertama prompt NATURAL dan menambah kalimat kunci tata ruang (v3.97), isi kalimat lama tidak berubah. Tes: tes lama "kamera mendekat ke orang" dibalik (aturannya dicabut sejak v3.73), tes baru prompt panjang dan kunci depan; 35 tes lolos; 50 shots.json di repo divalidasi sebelum dan sesudah, hasil sama. Runner Skill naik ke 1.2.0: aturan Enhance diselaraskan ke v3.92 (ON) dan tabel status spesifikasi/terimplementasi/teruji untuk v3.97 dan v3.98. Tidak ada produksi atau kredit yang dipakai.

### v3.98.0 (2026-11-05)
Owner menambah soundtrack profesional per shot dan animasi teks Remotion pada template Google Sheet yang sama. Tab baru: `VOICE_MASTER` (voice lock), `AUDIO_CUES` (setiap event Foley/ambience/dialog/narasi/SFX khusus + prompt ElevenLabs Sound Effects, timing, output, mix), `HADITH_SOURCES` (Arab + terjemahan + kitab + nomor + grade sourced + URL + verifikasi + approval; larangan mengarang), dan `REMOTION_PRESETS` (React typography compositions title/subtitles/Arabic hadith RTL). Kolom relasi juga ditambahkan ke STORYBOARD, TEXT_ANIMATION, SCENARIO dan RUNNER_MANIFEST. **NO MUSIC**, suara berpemicu logis dan sinkron; reuse ambience/foley approved; voice profile spesifik tiap shot. **VideoExpress tetap generator adegan bergerak**, Remotion hanya aset overlay teks; impor overlay ke editor belum teruji. Dokumen baru `references/SOUND_REMOTION_HADITH.md`. Tidak ada suara, hadis palsu, animasi atau video yang di-generate; integrasi Runner belum ada.

### v3.97.0 (2026-11-05)
Owner menetapkan Storyboard Professional berbasis Google Sheets dengan skenario, cast/figuran, image faceless dan outfit, layout master, object registry, Image/Video Prompt lengkap, metode NEW_VIEW/LAST_FRAME, dua image candidate, image review oleh Claude/ChatGPT multimodal, owner approval, runner manifest dan timing text animation. **Untuk shot NEW_VIEW berorang:** Reference 1 = tokoh faceless + outfit/tas; Reference 2 = layout ruangan. **Awal NATURAL Video Prompt** mengunci faceless, outfit/tas dan room geometry untuk seluruh klip, kemudian detail sinematik mengalir. LLM melihat benar-benar gambar A dan B sebelum memilih, reject/regenerate bila tidak cocok; QC video pasca-render tetap oleh owner. Master sheet: https://docs.google.com/spreadsheets/d/18sDM9tPsWxQ2IUKAbiRGcbjvVQRE3Gr7nysw9pgQzP0/edit . SOP baru: `references/STORYBOARD_SHEETS_GATE.md`. **Keterbatasan:** Runner belum diintegrasikan ke Google Sheets atau LLM visual check, sehingga Sheet merupakan template dan SOP, bukan automasi berjalan. Tidak ada video dibuat dalam update ini.

### v3.96.0 (2026-11-05)
Keputusan owner: **dua metode prompt resmi**. PRO / Structured Professional **dipertahankan** dengan template berlabel untuk AI video lain di masa depan (tidak mengubah provider lock). NATURAL / VideoExpress Detailed Cinematic Flow **bukan prompt pendek**: boleh panjang, sangat detail, tetapi harus **mengalir sebagai paragraf sutradara tanpa poin, judul bagian, atau timestamp**. Tetap jelaskan posisi dan gerak kamera, tindakan langkah demi langkah dengan sebab-akibat, kontak tangan, identitas dan fisika benda (HP, kertas, dll.), posisi awal/akhir, kontinuitas visual, cahaya, foley, ambience, tanpa musik, serta faceless. Perintah "buatkan episode 3 metode natural / VideoExpress" memilih NATURAL; "metode PRO" memilih PRO. Referensi baru `references/METODE_PROMPT.md`; referensi lama `PROMPT_PROFESIONAL.md` dipertahankan sebagai PRO. Perubahan ini **dokumentasi skill**, bukan perubahan generator `dari-brief.mjs`; kode NATURAL saat ini masih terlalu singkat dan harus diselaraskan sebelum produksi yang mengklaim v3.96.

### v3.95.0 (2026-11-05)
Owner 05:23 dan 05:26: gambar referensi yang benar membuat video hampir tanpa kesalahan, jadi semua gambar awal dibuat dan dicek dulu sebelum video, di VideoExpress. Perubahan: perintah runner `gambar` dan workflow `jota-gambar` (buat gambar awal klip BARU, beri nama lewat edit item library, unduh ke repo dan Drive, berhenti); `pickFromLibrary` menggulir daftar supaya gambar awal yang lebih lama tetap ketemu. Uji: evals/UJI-GAMBAR-DULU-20261105 (4 klip, gambar awal klip 1 dan 3). Kartu klip mendapat `gambar_awal` (nama gambar lolos di My AI Images) yang menjadikan start PAKAI_ULANG. Hasil cek pertama: 2 dari 4 gambar gagal (sepatu dan celana dari foto acuan), jadi gerbang cek gambar memang diperlukan. Gambar hasil Create Image hanya masuk library setelah Save Image diklik, dan harus ditunggu sampai benar-benar jadi. Hasil video UJIGBR1 (4 klip, 35 detik): wajah tidak terlihat di semua frame, piyama abu dan kaki telanjang konsisten di klip 1 sampai 2, baju shalat konsisten di klip 3 sampai 4, sambungan frame terakhir mulus, aksi sesuai kartu. Catatan kecil: klip 3 kamera mendekat padahal kartu static; klip 4 sajadah berubah dari hijau berbingkai emas menjadi karpet krem bermotif; tangan berdoa terangkat setinggi kepala, bukan depan dada.

### v3.94.0 (2026-11-05)
Hasil uji UJIOWN1 (10 klip, 81 detik, workflow owner, Enhance ON). Lolos: faceless di semua tampak belakang; baju shalat (koko putih, sarung hijau kotak, peci, kaki telanjang) konsisten dari klip 6 sampai 10; sambungan frame terakhir halus; kamera mengikuti sesuai kartu. Gagal: klip 1 sampai 4 piyama tetapi celana krem dan sepatu putih dari foto acuan; klip 5 tokoh berubah menjadi pria dewasa botak berwajah karena klip 4 berakhir close-up tangan; klip 9 dan awal klip 10 wajah bermata, berhidung, dan bermulut saat berbalik ke kamera di klip sambung. Perubahan: aturan dan cek-brief [SAMBUNG] dan [WAJAH] untuk dua pola itu, Image Prompt baju ganti mengabaikan baju dan sepatu foto acuan, upload-drive mengompres MP4 di atas 35 MB (FINAL 39,6 MB sebelumnya tidak sampai ke Drive). Poin 4 owner (putar bebas) dipersempit: aman bila gambar awal klip sudah menampilkan wajah polos.

### v3.93.0 (2026-11-04)
Owner 23:16: baju tokoh harus bisa diganti sesuai keadaan (contoh bangun subuh tanpa baju lengkap dan sepatu); foto acuan tetap untuk bentuk fisik. Perubahan: `pakaian` per kartu klip, terbawa ke klip berikutnya sampai diganti; prompt natural menulis bentuk fisik dari foto acuan dan baju adegan dari gambar awal; peringatan baju beda dari foto acuan (H02D) tidak berlaku untuk format natural. Uji 10 klip workflow owner: evals/UJI-WORKFLOW-OWNER-20261104 (klip 1 dan 6 gambar baru, sisanya sambung frame terakhir, Enhance ON, piyama lalu baju shalat).
Bug ditemukan di uji UJIOWN1: dengan Enhance ON, nama kartu klip di My AI Videos menjadi prompt hasil enhance, sehingga label `TAG-SHOTxx:` hilang dan runner menunggu klip sambung tanpa akhir (75 menit, hanya SHOT01 dan SHOT06 terkirim). Perbaikan: `findCard` mencari klip lewat API Details (prompt asli masih diawali label) lalu memakai nama kartu hasil enhance. Bug kedua di langkah Finish: alamat video juga dicari lewat label di nama kartu, jadi semua klip dianggap belum dirender sampai batas tunggu habis. Perbaikan: `clipUrl` mengambil `mediaPath` dari API lebih dulu. Bug ketiga: Add to Timeline gagal di klip keempat karena nama kartu hasil Enhance banyak yang mirip; kartu sekarang dicari lewat nama file thumbnail dari API (unik per klip).

### v3.92.1 (2026-11-04)
Catatan rencana suara tokoh konsisten dari owner 23:03 sampai 23:09 (`references/SUARA_TOKOH_KONSISTEN.md`): voice tersimpan per tokoh, ganti suara per klip, pilah ucapan per tokoh di timeline. Voice Changer VideoExpress dicek: bekerja pada seluruh audio klip setelah jadi. Belum dibangun di runner, menunggu sumber suara dan izin kuota ElevenLabs.

### v3.92.0 (2026-11-04)
Owner 23:01: Enhance tidak memengaruhi hasil buruk; sebaiknya ON untuk video dan image, yang penting aturan kunci konsistensi ditulis ulang di setiap video. Ini menggantikan aturan OFF sejak v3.26 dan permintaan owner 18:50. Runner sekarang menyalakan kedua Enhance dan memeriksanya ON tepat sebelum Create (centang yang tidak terbaca tetap menggagalkan shot). Opsi brief `enhance_video` diganti `enhance` (default ON, `false` untuk mematikan). Risiko yang dipantau: enhancer image pernah dicatat bisa membuang kata faceless (FACELESS_CHARACTER.md); kalau gambar awal bermata, cek dulu teks prompt hasil enhance di Details.

### v3.91.0 (2026-11-04)
Owner 22:48 menjelaskan cara membuat video smooth: (1) kunci baju, warna, celana, tas, dan aksesoris ditulis ulang di setiap prompt sepanjang video, kamera harus jelas; (2) scene 1 sampai 7 memakai last frame, dan untuk klip last frame kamera ditulis setelah gerakan tokoh, boleh di setiap aksi; (3) scene 8 memakai First Frame, Last Frame: awal membelakangi kamera, akhir menghadap kamera dengan foto acuan faceless, wajib menulis pertahankan faceless di seluruh adegan; (4) tokoh boleh berputar bebas sampai menutup muka asal ditulis keep faceless entire video. Perubahan: prompt natural memuat kunci penampilan dari bible plus `bawaan` dan `aksesoris`, kalimat pengingat di akhir, urutan kamera mengikuti jenis klip, `aksi` boleh daftar langkah, klip `first_last` dengan `last_frame_prompt`, tanpa jangkar paksa (opsi `jangkar`), larangan pose membelakangi dan berbalik dilepas untuk format natural, gerak kamera wajib. Runner menolak `first_last` dari frame sebelumnya sampai pemetaan UI-nya diuji. Contoh: evals/UJI-NATURAL-OWNER-20261104.

### v3.90.0 (2026-11-04)
Owner 22:33 mengirim video uji yang smooth dan meminta dijadikan update skill. Data 19 klip owner dibaca dari Details Media Library (tanpa Redesign). Temuan: prompt owner pendek berbahasa Indonesia tanpa blok aturan, ucapan native di prompt, Enhance video ON di semua klip, gambar awal sudut baru memakai Reference Photo 2 berupa frame ruangan. Perubahan: format Video Prompt natural untuk kartu klip (default), validasi runner `checkNatural`, Narration Video dan TTS tidak dipakai untuk klip natural, opsi brief `enhance_video` (default tetap OFF menunggu keputusan owner karena owner 18:50 meminta Enhance tidak dipakai). Analisa frame: faceless dan gerak kamera lolos; baju, celana, dan ketukan pintu belum konsisten, jadi prompt natural menambah kalimat kunci baju dan tas.

### v3.89.0 (2026-11-04)
Temuan owner 22:30 dari hasil video yang smooth: faceless bertahan kalau gambar awal jelas faceless, lalu Video Prompt cukup meminta tokoh tetap faceless di seluruh video, walaupun berputar. Video Prompt tidak perlu menyebut tanpa mata, mulut, atau hidung; penyebutan itu hanya di Image Prompt. Perubahan generator: fungsi videoFaceless membuang kalimat fitur wajah dari Video Prompt (kunci tokoh, kalimat SHOT, blok FACELESS), blok FACELESS diganti kalimat faceless singkat, blok ORBIT dan K_FACE versi video tanpa fitur wajah. Image Prompt tidak berubah. Larangan kamera tampak samping di kartu klip tetap berlaku karena masalah SHOT03 terjadi di gambar awal.

### v3.88.0 (2026-11-04)
Temuan owner 18:37 pada UJI-KARTU-KLIP: tokoh melompat saat mengetuk, tangan terbuka, akhir klip menghadap kamera, jalan slow motion, kamera klip 5 salah posisi, tokoh jalan lalu balik, dan bengong di pintu. Penyebabnya ada di blok prompt bawaan: FACE_VID ("visible on the camera side"), END STATE ("handoff three-quarter angle, hold still"), ACTION CLARITY (menawarkan "turn the body, walk"), dan NATURAL MOTION ("slow"). Untuk shot kartu klip, blok itu diganti K_FACE, K_MOTION, K_ACTION, dan K_END, ditambah blok KNOCKING (kepalan tangan) dan field `belakang_tokoh`. Format lama tidak berubah. Uji: UJI-KARTU-KLIP-V2-20261104.
Owner 18:50: Enhance prompt tidak boleh dipakai saat membuat video. Aturan OFF sudah ada sejak v3.26, tapi pengecekan sebelum Create lolos diam-diam kalau centang Enhance tidak terbaca. Sekarang centang yang tidak terbaca membuat shot gagal sebelum Create, dan status Enhance setiap shot ditulis ke log run.
Owner 19:13 (gambar tidak sesuai acuan, ada yang bermata): diagnosa dari DIAGNOSA-gambar UJIKARTU2. Foto acuan Uwais_soleh dan Consistent Character terbukti terpasang di setiap shot. SHOT03 tampak samping: kedua gambar bermata dan berhidung. SHOT05 tampak depan: polos, tapi pose meniru foto acuan (tangan di saku) dan tas hilang karena foto acuan tanpa tas. Runner memilih gambar tanpa menilai. Perbaikan: cek-brief menolak kamera tampak samping pada klip berorang; K_FACE meminta kamera di depan atau belakang tokoh.

### v3.87.0 (2026-11-04)
- Owner 17:07: durasi klip otomatis, cerita dari klip berurutan yang berganti sudut, kamera diarahkan; algoritma kartu klip wajib diikuti.
- `cek-brief.mjs`: brief baru wajib `"klip"`; setiap kartu wajib awal, aksi, akhir, posisi kamera, fokus, satu gerakan kamera. Durasi otomatis (`durasiAuto`) sudah masuk 17:06.

### v3.86.0 (2026-11-04)
- Owner 16:51 menilai uji v3.85: sambungan last frame oke, tetapi kamera kacau dan tokoh "kayak orang gila gak jelas lagi ngapain". Owner memberi contoh urutan klip berisi posisi kamera, fokus, awal, aksi, akhir, dan ucapan; 16:54: klip close-up tangan harus BARU.
- `dari-brief.mjs`: brief `"klip"` (kartu klip) diubah jadi shot; `potong` = klip BARU, selain itu lanjut last frame (jangkar foto acuan setiap 3 klip); klip tangan; blok BACK VIEW untuk kamera di belakang tokoh; `cek-brief.mjs`: `izin_closeup` menurunkan larangan close-up jadi peringatan.
- Owner 17:05: durasi klip otomatis dari isi (`durasiAuto`), tidak lagi 10 detik tetap; `detik` hanya untuk menimpa. Contoh owner menjadi 10, 6, 8, 10, 9 detik.
- Owner 16:59: setiap klip wajib Consistent Character + foto acuan dan deskripsi tokoh; klip tangan sekarang ikut memakai foto acuan dan kunci tokoh (uji yang sedang jalan dibuat sebelum aturan ini: SHOT02 tanpa foto acuan).
- Uji `evals/UJI-KARTU-KLIP-20261104` dari contoh owner, 5 klip, `"auto": true`, ke 3. Uji JOTA.

### v3.85.0 (2026-11-04)
- Owner 15:35 dan 15:40: gerak tokoh tidak natural karena storyboard terkunci per klip 10 detik; "management last frame" dipakai supaya gerakan bebas mengalir.
- `dari-brief.mjs`: adegan `"durasi"` lebih dari 10 detik dipecah otomatis jadi klip bersambung LAST_FRAME, jangkar foto acuan setiap 3 klip, panjang klip mengikuti ketukan; klip lanjutan boleh tanpa ucapan; opsi `"tanpa_youtube"` untuk uji.
- Uji `evals/UJI-ADEGAN-PANJANG-20261104` (Uwais pulang sekolah, 28 detik menjadi 3 klip 8, 8, 9 detik), `"auto": true`, hasil ke 3. Uji JOTA.

### v3.84.0 (2026-11-04)
- Review total faceless (owner 11:51, setuju 12:03, minta generate auto 12:04). Temuan: pose yang terbukti memunculkan wajah dicabut v3.73 sebagai "dugaan", lalu H02E gagal dan H02F berisi tidur di shot 1, 3, 4; prompt video sekitar 780 kata dengan kalimat yang bertentangan ("faces clearly visible" dan "No looking at the camera").
- `cek-brief.mjs`: tidur, berbaring, kepala di bantal, mata terpejam, close-up, dan kamera ke wajah kembali ditolak; menunduk dan menulis jadi peringatan; peringatan baju beda dari foto acuan. Diuji ke brief lama: H02F lama (8) dan H02E (3) tertolak, H01H dan H03B lolos.
- `dari-brief.mjs`: shot tangan (`"tangan"`, people `hands`, HANDS ONLY tanpa foto acuan) dan uji A/B `"ringkas": true` (video prompt pendek tanpa kalimat bertentangan, field `varian` di shots.json).
- H02F ditulis ulang: SHOT01 dan 03 shot benda (alarm, jam), SHOT04 shot tangan menekan alarm, SHOT02 ringkas (pembanding SHOT05 dan 06 standar), `"auto": true`. Piyama tetap lewat teks (Runner belum bisa Smart Edit foto acuan baru); risiko dobel dicatat di `EVALUASI.md` produksi.

### v3.83.0 (2026-11-04)
- Owner 10:50 menilai H02E fatal: dua orang (satu tidur, Uwais berdiri), Uwais mondar-mandir, baju seperti mau ke mal. Owner menulis ulang cerita Ep 2 (alarm, jam 4, tidur lagi, alarm lagi, semangat Uwais, doa bangun tidur).
- `dari-brief.mjs`: `pakaian` per episode/shot untuk tokoh berfoto acuan (field `baju` di tokoh.json); blok `ONE PERSON ONLY` untuk shot satu tokoh.
- H02F disiapkan dari cerita owner, `"auto": false` (owner sedang generate manual).

### v3.82.0 (2026-11-04)
- Owner 09:40 (pilot Panggilan Ummi): ada musik, buku ditutup lalu hilang, Ummi jadi dua, Uwais bergerak tidak jelas. Penyebab: `narasi-tokoh.mjs` mencampur audio asli klip (berisi musik) 60%; prompt shot satu-tokoh menyebut tokoh lain; gerak tanpa tujuan dari brief ChatGPT.
- `narasi-tokoh.mjs`: audio klip dibuang bila ada suara latar (opsi `suara_klip`). `dari-brief.mjs`: tolak nama tokoh di luar `tokoh` shot dan gerak tanpa tujuan.
- H02E dirakit ulang tanpa audio klip (tanpa generate ulang).

### v3.81.0 (2026-11-04)
- Pilot "Uwais Menjawab Panggilan Ummi" (push ChatGPT 06:59) dan H02E (push 06:41) tidak pernah diproduksi: push hanya membangunkan Runner Mac lewat ntfy, Mac tidak hidup, dan `jota-produksi` hanya bisa dijalankan manual. `jota-runner-push.yml` sekarang juga menjalankan `jota-produksi` untuk `shots.json` auto yang belum punya FINAL. Keduanya dijalankan manual 08:25.

### v3.80.0 (2026-11-04)
- Owner menolak H02D (Uwais Hijrah Ep 2) 06:37: wajah jelas dan Uwais dobel beda baju, lempar-lempar kertas dan ada musik, tokoh di kasur jadi botak. Penyebab: shot SAMBUNG tanpa foto acuan; teks kunci (kacamata, baju tidur) berbeda dari foto acuan; regex fisika cocok dengan "pushes" dan contoh kertasnya menjadi adegan; larangan musik lemah.
- `dari-brief.mjs`: shot berorang selalu BARU + foto acuan (sambung diabaikan dengan peringatan); `kunci` brief diabaikan untuk tokoh berfoto acuan; blok fisika hanya untuk lempar/jatuh tanpa contoh benda; `NO MUSIC` di SOUND.
- `tokoh.json`: kacamata dihapus dari Uwais dan Aba (foto acuan tidak berkacamata).
- Yang dipertahankan: suara alarm, jam, jangkrik (dipuji owner).

### v3.79.0 (2026-11-04)
- Facebook Reel otomatis (owner 05:46): `upload-facebook.mjs` (Graph API video_reels), langkah di `jota-produksi` setelah YouTube, dan workflow `jota-facebook` untuk episode lama dari arsip. Default DRAFT, owner yang menerbitkan. Butuh Secrets META_PAGE_ID dan META_PAGE_TOKEN; tanpa itu langkah dilewati.

### v3.78.0 (2026-11-04)
- Audit VideoExpress 3.5 (owner 05:40): eleven_v4 tidak otomatis (default v3); penjelasan LAST_FRAME vs alat First Frame, Last Frame; adapter prompt dicatat; peringatan lebih dari satu gerak kamera per shot.

### v3.77.0 (2026-11-04)
- Owner 05:27, ikut tutorial VideoExpress 3.5: video prompt dibuka baris `SHOT:` (ukuran shot dan kamera, lalu satu paragraf aksi), aturan dan kunci di belakang; daftar fitur wajah dihapus dari video prompt (hanya kalimat positif "smooth blank face"), tetap lengkap di image prompt; image prompt dibuka baris `SCENE:`. Field brief opsional `shot` untuk framing gambar.

### v3.76.0 (2026-11-04)
- Owner 05:18: tutorial VideoExpress 3.5 masuk skill `videoexpress-runner` v1.1.0. Video prompt mengikuti aturan aplikasi (paragraf urut tanpa cap waktu, sebut yang diam). Perintah Runner `fix` (Fix Video) atas perintah owner.

### v3.75.0 (2026-11-04)
- `kunci` per shot di brief (misal baju tidur di kamar, peci di masjid).
- Owner 04:50: modul Storyboard Director dan Faceless Image & Video Prompt Engine masuk `references/modul/`, diselaraskan (pose wajah ikut v3.73, 6 shot, brief.json, tanpa kredit). Generator: wajah polos "bukan masker", tahan pose akhir 1 detik untuk sambungan.

### v3.74.0 (2026-11-04)
- Skill baru `skills/videoexpress-runner/` (pengetahuan pasti VideoExpress dari kode Runner) dan perintah `uji-peta` (pemetaan UI hanya membaca, hasil ke `PETA_UI.md`).

### v3.73.0 (2026-11-04)
- Owner 04:31: FACE LOCK dilonggarkan (hanya wajah tertutup, membelakangi, dan memutar tertutup-terbuka yang dilarang); close-up dan push-in boleh. Serial Shorts 6 shot (60 detik). Field `foley` per shot. eleven_v4 dengan cadangan v3; Sound Effects v3.

### v3.72.0 (2026-11-04)
- Owner 04:20: paket 6 modul JOTA disimpan di `references/modul/` sebagai acuan pra produksi. Titik yang bertentangan menunggu keputusan owner.

### v3.71.0 (2026-11-04)
- Owner 03:25: JOTA SUPER STRICT PROMPT QC ENGINE v2.0 menjadi acuan (`references/JOTA_SUPER_QC_ENGINE_v2.md`): nol QC pasca render dan nol regenerasi otomatis; agen hanya melaporkan link FINAL. Super QC: maksimal 2 benda bergerak per shot, tangan disebut, letak akhir benda, kamera stabil saat ada benda.

### v3.70.0 (2026-11-04)
- Owner 03:16: JOTA SUPER QC ENGINE v1.0 disimpan sebagai `references/JOTA_SUPER_QC_ENGINE.md`. Brief mendapat `alur` (timeline sebab-akibat 2 sampai 3 langkah), `benda` (OBJECT REGISTRY berID), dan `kamera`; super QC memeriksa alur, pendaftaran benda, dan gerak anak kecil.

### v3.69.0 (2026-11-04)
- Owner 03:13: super QC prompt pra-produksi `cek-brief.mjs` (modul WAJAH, TOKOH, GERAK, BENDA, FIGURAN, SAMBUNG, SUARA, HADIS) wajib lolos sebelum shots.json dibuat. Diuji ke semua brief lama: setiap kegagalan nyata (Ep2 tidur, Ep3 figuran dan menunduk, Ep5 dua Ukasyah dan menunduk, Ep6 berbaring) tertangkap; Ep4 dan Ep6 shot 2 yang berhasil lolos.

### v3.68.0 (2026-11-04)
- Owner 03:06: blok `ACTION CLARITY` (kegiatan bernama, reaksi sederhana, tanpa gestur acak) dan `OBJECT IDENTITY AND COUNT LOCK` (dari catatan ChatGPT: identitas, jumlah, kontak tangan, permanensi, urutan keadaan benda), menggantikan `OBJECTS IN HANDS`. Validator menolak kata gerak kabur dan gerak lebih dari 3 kalimat.

### v3.67.0 (2026-11-03)
- Owner 19:37, review semua kegagalan wajah: blok `FACE POSE LOCK` di image dan video prompt, benda dipegang setinggi dada, adegan tidur dan rebahan diganti duduk tegak, validator menolak kata pose berisiko. Uwais tanpa peci kecuali disebut. Owner 19:41: tidak kaku; sudut tiga perempat kiri/kanan, gerak dan kamera bervariasi tetap boleh.

### v3.66.0 (2026-11-03)
- Owner 18:58: blok `STRICT OBJECT PHYSICS AND CONTINUITY` (teks owner) otomatis di shot yang geraknya melempar, menjatuhkan, menggeser, atau memberi benda.
- Owner 18:42: suara latar per shot (`latar` -> ElevenLabs Sound Effects), suara klip dinaikkan, volume kalimat mengikuti arahan emosi (bisik dan mengantuk lebih pelan).
- Owner 18:36: blok `OBJECTS IN HANDS` di setiap video prompt berorang (benda tidak melayang, muncul, hilang, terbalik; serah terima tangan ke tangan). Rambut dibedakan: Uwais bergelombang cenderung ikal, Ukasyah lurus bergelombang, Umair dan Ubaid lurus tipis (`tokoh.json`).
- Owner 18:29: penutup tanpa teaser hari berikutnya. Antrean produksi `antrean.txt`. Acuan kualitas Ep1 H01E, Ep2 H02C, Ep3 H03B.

### v3.65.0 (2026-11-03)
- Owner 15:50: aturan inti 9 "Kunci tokoh tetap": `characters/tokoh.json` (foto acuan, tinggi, berat, kunci fisik dan baju sesuai foto, pembeda) wajib di setiap prompt; shot berdua wajib `SCALE:`, `DIFFERENCES:`, dan posisi tegas; figuran lewat `EXTRA:`. Tabel ciri dan baju di `characters/README.md`.
- UWAIS03 gagal fatal: teman sekelas tanpa foto acuan membuat wajah lengkap muncul pada Uwais dan teman, dan teman menjadi perempuan. Figuran kini hanya tangan atau punggung, kelas putra. Runner menyimpan screenshot gambar terpilih per shot (`DIAGNOSA-gambar-SHOTxx.png`) untuk penelusuran (bukan QC).
- Storyboard 30 episode Uwais Hijrah diperbarui (owner 16:10): dialog adik-adik, Aba, dan Ummi di setiap episode; figuran hanya tangan atau punggung (HARI 3, 18, 21); baju dan posisi (HARI 2, 3, 15, 24); acuan Family untuk shot seluruh keluarga (HARI 30); Sarah lewat kunci teks (HARI 27); narator Kang Nandar.
- UWAIS02B: peran Aba dan Uwais tertukar di shot membangunkan (pose berbeda dengan dua acuan). Aturan 9: dua acuan hanya untuk aksi yang sama dan berdampingan; selain itu satu tokoh per shot.
- UWAIS02C shot 1: pose tidur memunculkan mata terpejam dan hidung. Pose tidur digambar dari belakang. `jota-rakit-ulang` bisa mengganti satu shot (`ganti_shot`, `ganti_run_id`) dari proyek satu-shot tanpa generate ulang shot lain.
- Antrean produksi: `apps/videoexpress-runner/antrean.txt` (satu path shots.json per baris). Setiap produksi selesai, workflow menjalankan baris pertama lalu menghapusnya, jadi beberapa episode berjalan berurutan tanpa agen.
- Owner 18:29: penutup episode tidak menyebut judul atau kejadian hari berikutnya ("Besok: ..." dihapus dari storyboard); cukup "Hari ke-n, lulus! Alhamdulillah." Episode yang sudah jadi tidak diulang.
- Aturan 4 diperbarui: tokoh tidak bicara di klip, tetapi semua tokoh termasuk anak boleh bicara lewat voice over ElevenLabs v3 dan dialog bergantian per shot.

### v3.64.0 (2026-11-03)
- Owner 10:57: outro serial tidak menulis judul episode berikutnya; diganti "PESAN HARI INI" dari `serial.pesan` (pesan penting episode). Narasi teaser "Besok: ..." tetap boleh diucapkan.
- Suara Uwais diganti "JOTA Sebastian" (remaja, nada asli); owner 11:11 memilih dari contoh `_COBA-SUARA-UWAIS`.
- Narator diganti "JOTA Kang Nandar" (owner 11:43, lebih adem). Episode 1 diproduksi ulang sebagai UWAIS01C dengan narasi tokoh.
- Owner 11:56: hitungan hari tidak dijadikan judul. Intro Remotion menampilkan nama serial + judul hook (tanpa "HARI n/30"); judul YouTube "<judul hook> | Uwais Hijrah #n", "Hari n dari 30" di deskripsi.
- Suara Aba: clone owner "Koharudin" (owner 11:57).
- Kartu hadis (owner 12:27): shot yang narasinya memuat "HR." tampil sebagai kutipan utuh "isi hadis" + sumber emas (misal HR. Muslim 725, dilengkapi dari `sources`), bukan subtitle karaoke (`hadis-waktu.mjs`, `subtitle.py`). Format narasi: "<isi hadis>. HR. <perawi>."
- Outro: tombol "FOLLOW @ohankang" (channel YouTube owner) + ajakan "Ikuti 30 hari hijrah Uwais" (owner 12:42); bisa diganti lewat `serial.follow` dan `serial.ajak`.
- Suara (owner 13:10): semua tokoh memakai model ElevenLabs `eleven_v3`; Uwais diganti "JOTA Alif" (penutur asli Indonesia; Sebastian penutur Spanyol salah ucap "alarm", "Umair"). Narasi boleh memuat arahan emosi dalam kurung siku, misal "[excited] Ayo!" (tidak tampil di layar).
- Umair dibedakan tegas dari Uwais (tinggi sebahu, rambut lurus, dilarang memakai koko/overshirt Uwais) dan larangan "dua orang yang sama" di semua prompt (owner 13:04: Uwais jadi dua orang).
- Kompilasi mingguan (owner 13:11): FINAL tiap episode diarsipkan di GitHub Release `arsip-final`; setelah 7 episode satu minggu selesai, `jota-kompilasi` menggabung dengan ffmpeg (tanpa generate ulang) menjadi video panjang dengan bab per hari, unggah YouTube private dan Drive.
- `jota-rakit-ulang` bisa mengulang narasi (`narasi_ulang`) dari versi TANPA-NARASI tanpa generate klip.
- Tinggi dan berat tokoh (owner 14:23) di `characters/tokoh.json` beserta kunci pakaian sesuai foto acuan. Foto acuan tidak punya skala (penyebab Umair setinggi Uwais), jadi shot berisi dua tokoh atau lebih memuat baris `SCALE:` (tinggi + perbandingan, otomatis di `dari-brief.mjs`).
- Dialog bergantian per shot (`"dialog"`, owner 15:23: Umair boleh bicara, suara ElevenLabs v3 bernada anak). Shot berdua wajib menyebut posisi tokoh (kiri/kanan, keduanya utuh) dan nyambung dengan shot sebelumnya (owner 15:03: Umair tiba-tiba di belakang).
- Pelafalan: "HR." dibaca "Hadis riwayat" oleh narator (`pelafalan.json`); tulisan tetap HR.
- Jalur ChatGPT/Codex: folder `gpt/`, `brief.json` dibangun jadi shots.json (`dari-brief.mjs`), antrean otomatis `jota-gpt-antre`.
- Runner: pemilihan gambar Consistent Character menggulir carousel dan mengklik gambar terlihat (UWAIS02 SHOT02 gagal tanpa job).

### v3.63.0 (2026-11-03)
- Suara (owner 05:43 sampai 06:07): `"narrator": "tokoh"` membuat narasi per tokoh lewat ElevenLabs (`characters/suara.json`, nada per usia) dan menempelkannya setelah finish (`narasi-tokoh.mjs`); suara klip dipelankan jadi suara latar. ElevenLabs menolak suara anak (Voice Design diblokir), jadi suara anak memakai klip suara VideoExpress: shot tambahan format bicara dengan `"suara_untuk": "<shot>"` hanya diambil audionya (tidak masuk timeline) lalu ditempel di shot tujuan. Uwais, Aba, Ummi, Narator memakai ElevenLabs. Audio acuan per tokoh di Drive `_SUARA-KARAKTER`.

### v3.62.0 (2026-11-02)
- Teks animasi (owner 20:01): kotak judul hook 3,6 detik di atas, memantul-goyang lalu hilang; subtitle pop dengan kata aktif kuning.
- Remotion (`apps/jota-remotion`, owner 21:14 setuju): shots.json dengan blok `"serial": {"serial","hari","total","judul","besok"}` mendapat intro dan outro transparan di atas video (versi `-FINAL.mp4`); YouTube memakai -FINAL bila ada.
- Tokoh tetap serial: Uwais Abdul Kohar (`characters/UWAIS-ABDUL-KOHAR/`), menggantikan Rafi. Format bicara di klip diturunkan jadi eksperimen (owner 20:10: episode 1 memunculkan mata dan hidung); serial memakai cara BELAJAR1 (narasi, tanpa bicara di klip).
- Owner 18:39: tujuan akhir disimpan di YouTube. Runner mengunggah Shorts private (`upload-youtube.mjs`, YouTube Data API) setelah finish; Drive tetap arsip. Serial "30 Hari Rafi Hijrah" (`playbooks/faceless-family-stories/series/30-HARI-RAFI-HIJRAH/`).

### v3.61.0 (2026-11-02)
- Owner 18:07: "Jangan Malas Belajar" (BELAJAR1) bagus banget. Dijadikan acuan baku video bernarator (SKILL.md 5a).
- Subtitle otomatis Whisper (`apps/videoexpress-runner/subtitle.py`): setiap produksi menghasilkan versi `-SUB.mp4` di samping MP4 asli; owner memilih. Uji `jota-subtitle-uji`.

### v3.60.0 (2026-11-02)
- Owner 12:30: satu shot tokoh bicara tetap faceless. Pemicunya cara ucapan ditulis, bukan bicaranya. Format bicara di klip jadi aturan (SKILL.md aturan inti 4, `PROMPT_PROFESIONAL.md` 2H). Acuan asli di `evals/REF-BICARA-FACELESS-OWNER-20261102/`.
- Runner: `"speech": "clip"` per shot dengan cek format sendiri (checkSpeechClip); Video Only (No Sound) selalu OFF. Uji `evals/UJI-BICARA-20261102`.
- Runner (dicoba lalu diganti): shot dengan `refs` membuat gambar awal dengan Consistent Character + Reference Photo, lalu acuan dikosongkan (tombol Clear selection) dan Consistent Character OFF sebelum Create Video, supaya Create Video tidak terhambat. Uji 2 clip `evals/UJI-BICARA2-20261102` (acuan my family / Faceless Muslim Teen with Backpack).

- Runner (dari workflow resmi VideoExpress ai-playbooks): acuan dan Consistent Character tetap ON sampai Create Video; gambar baru dipilih di carousel (pasangan gambar Consistent Character) sampai Create Video aktif.

### v3.59.0 (2026-11-02)
- Keputusan owner 06:04: mata dan hidung muncul karena tokohnya berbicara. Dialog native di dalam klip dihapus (SKILL.md aturan inti 4 diganti, paket 2 diubah). Cara baru "bicara tanpa mulut": klip tanpa suara orang, satu pembicara per shot, ucapan lewat `Narration Video` dengan suara tetap tokoh (`voice` per shot) atau file ElevenLabs terpisah, gestur bicara, subtitle per pembicara. `PROMPT_PROFESIONAL.md` 2G poin 5.
- Runner 0.15.0: `voice` per shot untuk Narration Video; proyek JOTA 1 ditolak kalau shot berorang memuat bagian DIALOGUE atau kata bicara di ACTION/MOTION (cek A16, sebelumnya hanya peringatan).

### v3.58.0 (2026-11-02)
- Permintaan owner: analisa dokumen "Faceless Master Prompt V1.0" dijadikan aturan prompt. Ditulis di `PROMPT_PROFESIONAL.md` 2G (Faceless Character Lock) dan blok FACELESS bagian 2D diganti master faceless (wajah satu bidang kulit dari dahi sampai dagu, tanpa mata, alis, hidung, lubang hidung, mulut, bibir, bulu mata, ekspresi; profil samping mulus; tidak boleh muncul saat bergerak; emosi lewat tubuh).
- Diambil: master karakter sekali per tokoh di folder `JOTA - Master 5 Karakter Faceless` (character sheet depan, samping, tiga perempat, belakang bila memungkinkan); gambar awal setiap shot lolos faceless lewat alat First Frame, Last Frame (scene pertama Consistent Character + master, scene berikutnya frame terakhir, Consistent Character OFF; cara owner 2026-11-01 23:46); prompt video image-to-video pendek dan didominasi gerak; kata wajah terlarang (smile, blink, look at the camera, facial expression, dan sejenisnya) dicek Runner 0.14.0 (cek A16); aksi berbicara di layar ditangguhkan (bukti ADMK01) dan diberi peringatan Runner.
- Tidak diambil: pindah ke Kling, Runway, atau Veo (provider dikunci VideoExpress); QC semua frame oleh agen atau Runner (keputusan owner tanpa QC); klip 3 sampai 5 detik (menunggu keputusan owner, saat ini 10 detik); animasi 2D rigged (dicatat sebagai pilihan jangka panjang).
- Bukti pendukung: gambar acuan Create Image dengan kalimat faceless kuat lolos polos total (UJIAC refs CH01, CH02); Create Video From Prompt dengan Consistent Character tidak menghasilkan job (UJIAC1 dan UJIAC2, 2026-11-01), jadi Runner perlu diajari alat First Frame, Last Frame sebelum cara ini dipakai produksi.

### v3.57.0 (2026-11-01)
- Keputusan owner 21:34: rakit hanya di VideoExpress, tanpa Final Cut. Narasi ElevenLabs terpisah sebagai file mp3. Drive hanya menyimpan file yang dibutuhkan owner (MP4 final, PETA-WAKTU.txt, narasi). Runner 0.12.0: `finish` selalu export VideoExpress (juga untuk proyek narator), tidak mengunduh klip per shot dan tidak menulis FCPXML kecuali `"final": "finalcut"`. Bidang `final` dihapus dari `shots.json` produksi yang ada.
- Runner 0.10.0 sampai 0.11.0 (21:00 sampai 21:30): uji GitHub Actions lolos (login dan satu shot UJIGH1 jadi); workflow `jota-produksi` menjalankan produksi di server GitHub tanpa laptop, unggah Drive lewat Apps Script (`drive-upload.gs`, secret `JOTA_DRIVE_URL`); shot gambar baru dikirim lebih dulu, shot SAMBUNG menyusul; `sudah_terkirim` untuk melanjutkan run yang terputus tanpa kiriman ganda.

### v3.56.0 (2026-11-01)
- Keputusan owner 20:43: proses tidak boleh terhenti dan tidak ada QC; owner menilai hasil akhir lalu menyebut detik yang salah untuk diulang. Runner 0.9.0: `finish` tidak lagi berhenti karena shot gagal atau klip tidak muncul; video dirakit dari klip yang ada dan shot yang tertinggal disebut di laporan. Revisi per shot lewat `"revision"` dan `"regen"` di `shots.json`; Runner mengirim ulang hanya shot itu dan menyimpan versi `-v2`. `PETA-WAKTU.txt` di Drive memetakan detik ke shot.
- Keputusan owner 20:44: Final Cut Pro tidak diperlukan. MP4 final adalah export VideoExpress yang disalin Runner langsung ke folder Drive proyek; Final Cut tidak dibuka otomatis, FCPXML tetap ditulis sebagai cadangan. Proyek narator ElevenLabs masih memerlukan Final Cut sampai narasi bisa dipasang di VideoExpress.

### v3.55.1 (2026-11-01)
- Keputusan owner 20:40: satu mode saja. Selama laptop menyala, jaga standby dan Mac ditahan tidak tidur, termasuk saat owner di luar dan memerintah lewat Claude di iPhone. Mode hadir dan tinggal serta perintah `/hadir` `/tinggal` dihapus (Runner 0.8.1).

### v3.55.0 (2026-11-01)
- Keputusan owner 20:32 sampai 20:35: tidak ada jadwal; Runner standby 24 jam dan wajib bangun saat ada instruksi, tanpa menebak; dua mode untuk owner di depan laptop dan owner pergi.
- Runner 0.8.0 `jaga`: satu proses selalu hidup (launchd RunAtLoad dan KeepAlive), dibangunkan push lewat GitHub Actions ke ntfy (`.github/workflows/jota-runner-push.yml`, topik di `jaga.json`), perintah Telegram `/status /mulai /stop /hadir /tinggal`, pemeriksaan saat hidup dan cadangan 10 menit. Mode hadir menahan Mac tidak tidur (caffeinate -i); mode tinggal menahan bangun hanya selama produksi (caffeinate -s).
- Jadwal 15 menit lama memasang jaga sendiri saat pertama menjalankan kode 0.8.0, lalu melepas dirinya (owner tidak membuka Terminal). `install-auto` kini sama dengan `install-jaga`.
- Pengecekan terjadwal agen ke Drive dihapus (permintaan owner); agen membaca `_STATUS_RUNNER.txt` hanya ketika owner bertanya.

### v3.54.0 (2026-11-01)
- Kejadian 19:00 sampai 20:30: owner mematikan semua auto pukul 19:00, tetapi proses Runner yang sudah berjalan tidak membaca ulang `shots.json`; UMSH03-SHOT02 tetap dikirim (terlihat di My AI Videos) dan proses itu menahan `auto.lock` (batas 6 jam), sehingga ADMK01 yang di-push 20:07 tidak dikerjakan. Agen juga baru menyebut hambatan suara narator di akhir dan sempat mengaku tidak bisa mengecek Drive padahal bisa.
- Runner 0.7.0 menulis status ke Drive jotaauto1 `Video JOTA/_STATUS_RUNNER.txt` (tick auto dan progres shot), supaya agen memantau lewat konektor Drive tanpa membuka VideoExpress (hemat token, permintaan owner 20:28: VideoExpress tetap dioperasikan Runner, bukan agen).
- Runner 0.7.0: `"auto"` dibaca ulang dari `main` sebelum setiap shot, saat `finish` menunggu render, dan sebelum `finish`; lock dicek lewat PID; proyek narator ElevenLabs dilewati selama suara di `.env` kosong atau suara clone owner. Tes ditambah di `test.mjs`.
- SKILL.md 3A: aturan stop, lock, dan pemantauan. Agen memantau progres sendiri lewat Drive jotaauto1 dan My AI Videos (hanya membaca, izin owner 20:23), menyebut hambatan `OPEN_ITEMS.md` di awal, dan memakai paket 2 kalau owner menjawab "bebas" sementara paket narator terhalang.
- 4A: subtitle paket 2 ditandai belum didukung Runner (subtitle hanya dari narasi).
- Proses lama yang masih memegang lock memakai kode sebelum 0.7.0; perbaikan berlaku setelah proses itu selesai atau mati.

### v3.53.1 (2026-11-01)
- Benchmark prompt faceless disiapkan (`evals/JOTA-BENCH-FACELESS-20261101/`, permintaan owner): 6 varian pada adegan yang sama (negasi lawan kata positif, kartun 2D anime lawan datar, 3D, manekin kayu). Dijalankan Runner mode auto; hasil dinilai owner di lembar nilai README-nya.
- Runner 0.6.1: `image_type` boleh diatur per shot di `shots.json` (dipakai benchmark untuk shot 3D di proyek 2D).

### v3.53.0 (2026-11-01)
- Keputusan owner 18:31: semua QC otomatis dihapus. Agen tidak menilai gambar atau klip; Runner 0.6.0 tidak lagi memeriksa wajah sebelum shot SAMBUNG, tidak membuat lembar cek atau menjalankan detektor di `finish`, dan perintah `qc` dihapus. QC hanya oleh owner di Final Cut (G3). SKILL.md aturan inti 5, bagian 2, 3A, 3B, P1; `PROMPT_PROFESIONAL.md` 2F poin 13.
- Dasar: Umar separuh harta versi 2 dan 3 berhenti di SHOT02 (GAGAL) dua kali. Cek wajah klip sumber yang ditambahkan di Runner 0.5.1 belum pernah diuji di Mac owner dan menggagalkan shot SAMBUNG, sehingga `finish` menolak jalan dan tidak ada output di Drive.
- Pencegahan wajah dipindah ke prompt: rantai SAMBUNG dimulai dari shot tangan atau tanpa orang; tokoh utama di shot sangat lebar sebagai KEYFRAME yang tidak menjadi sumber SAMBUNG.

### v3.52.0 (2026-11-01)
- Keputusan owner: operator VideoExpress hanya Runner. Operator AI (agen mengklik browser) dan Manual dihapus karena boros token. Kartu paket tidak lagi menanyakan operator. SKILL.md 3A, 3B poin 6, 3C, 4A, 4B langkah 4.
- Keputusan owner: pekerjaan tidak boleh berhenti di tengah jalan; selesai berarti output di Drive jotaauto1 `Video JOTA/<PROYEK>/`. Agen menulis `"auto": true`, commit, dan push di giliran yang sama dengan paket prompt; tidak meminta "lanjut", tidak memecah produksi per shot, tidak memberi owner perintah Terminal untuk `run` atau `finish`. Mode auto di Mac menyelesaikan `run` dan `finish`.
- Keputusan owner: agen tidak pernah menjalankan perintah di Mac owner (Desktop Commander, computer use, device shell); jalur ke Mac hanya repo dan mode auto.
- Keputusan owner: laporan ke owner singkat dan langsung ke inti, tanpa daftar pilihan.
- Dasar: Shorts Umar separuh harta (2026-11-01). Agen memberi perintah Terminal bertahap, menawarkan beberapa cara, dan memakai Desktop Commander tanpa izin; produksi berhenti di SHOT01 tanpa output di Drive.

### v3.51.3 (2026-11-01)
- Runner 0.5.1 menerapkan `PROMPT_PROFESIONAL.md` 2F poin 13 (permintaan owner): sebelum Save Last Frame untuk shot SAMBUNG, `run` memeriksa wajah di seluruh klip sumber dengan detektor MediaPipe (lembar cek `qc/<proyek>/SHOT##-SUMBER.jpg`). Wajah terdeteksi atau detektor tidak bisa dimuat: `run` berhenti seluruhnya, shot SAMBUNG tidak dikirim, notifikasi ke owner, dan `auto` tidak menjalankan `finish` untuk proyek itu. Owner meloloskan alarm palsu dengan `end_check: "LOLOS"` di `progress.json`.
- Kenapa seluruh klip, bukan hanya ujung: uji pada klip SHOT16 Umar S28 menunjukkan detektor tidak menangkap profil kecil di 1,5 detik terakhir, padahal hidung terlihat; wajah di detik 5 sampai 7,5 terdeteksi. Cek seluruh klip menahan shot itu, sedangkan klip UJI-RUNNER SHOT01 tetap lolos. Detektor tetap tidak sempurna; lembar cek perlu dilihat.

### v3.51.2 (2026-11-01)
- Dasar: Shorts Umar separuh harta (2026-11-01), SHOT02 berwajah. Owner meminta empat aturan ditambahkan ke `PROMPT_PROFESIONAL.md` 2F (poin 10 sampai 13), dicek lewat A15:
- 10: tokoh yang bekerja dengan tangan membelakangi kamera, benda kerja di seberang tokoh (lebih jauh dari kamera), kamera di belakang dan sedikit lebih tinggi. Benda di samping atau di depan tokoh memaksa model memutar tokoh ke tampak samping.
- 11: tidak ada aksi tangan di dekat kepala atau wajah (mengikat dengan mulut, mengusap wajah, minum).
- 12: KEYFRAME pembuka tokoh utama memakai shot lebar, tokoh kecil di frame.
- 13: frame sumber berwajah menular ke semua shot SAMBUNG; frame sumber wajib lolos cek wajah sebelum dipakai, dan Runner wajib berhenti sebelum shot SAMBUNG kalau gagal. Kode Runner belum menerapkan ini (detektor wajah hanya di `qc` dan `finish`); sampai diperbarui, `qc` shot sumber dijalankan dan dicek sebelum `run` shot SAMBUNG.

### v3.51.1 (2026-11-01)
- `AGENTS.md` disamakan dengan v3.51: kalimat "Mode JOTA 1 atau JOTA 2 dipilih owner" diganti aturan wajib faceless (JOTA 2 dihapus), kartu paket 1 sampai 4, dan narator ElevenLabs bukan suara clone owner.
- `CONNECT.md`: sisa penyebutan JOTA 2 dihapus (kode proyek M2, blok aturan "JOTA 2 hanya gerak"); blok aturan disesuaikan dengan jenis shot (FACELESS, NO PEOPLE, HANDS ONLY) seperti `PROMPT_PROFESIONAL.md` 2D.
- Temuan, belum diubah: `.env` Runner di Mac owner masih memakai suara ElevenLabs "Koharudin" (clone), bertentangan dengan keputusan owner di SKILL.md 3A. Menunggu owner memilih suara narator JOTA (`OPEN_ITEMS.md`).
- `.gitignore` di akar repo: `**/productions/**/progress.json` (catatan Runner berisi path lokal Mac owner) tidak masuk git; file tetap disimpan di disk (keputusan owner).

### v3.51.0 (2026-11-01)
- Keputusan owner: JOTA 2 (berwajah) dihapus karena melanggar syariat. Semua video wajib faceless (JOTA 1), tanpa pilihan lain. SKILL.md aturan inti 1 dan bagian 2, `CREATIVE_MODES.md`, katalog style, playbook PB07 diarsipkan, CHECKLIST C01. Runner menolak proyek berkode `-M2-`.
- Keputusan owner: kartu pengaturan diganti kartu paket berdasarkan output. Paket 1 Shorts Kisah (default), 2 Shorts Adab Keluarga, 3 Shorts Doa dan Edukasi, 4 YouTube Panjang. Paket 1 sampai 3 menghasilkan satu file 9:16 untuk YouTube Shorts, Instagram Reels, TikTok, dan Facebook Reels. Isi setiap paket di SKILL.md 4A; `CONNECT.md` ikut diperbarui.
- Subtitle besar di layar menjadi bagian semua paket (usulan agen, owner meminta skill diperbarui tanpa menjawab pertanyaan ini secara terpisah; bisa dimatikan per video). Runner: `"captions": true` di `shots.json` menulis teks narasi ke FCPXML per potongan 6 kata, di atas area bawah yang tertutup tombol aplikasi. Posisi teks belum diuji di Final Cut owner.
- Tokoh maskot channel belum diputuskan (`OPEN_ITEMS.md`).

### v3.50.0 (2026-11-01)
- Keputusan owner (dari saran teman yang channel faceless-nya berjalan): fase latihan memakai Shorts 9:16, 30 sampai 60 detik, satu pesan langsung ke inti, untuk YouTube Shorts, Reels, dan TikTok, sekaligus latihan konsistensi karakter. Format baru `STORYTELLING_FILM.md` 2A: hook 0 sampai 3 detik, satu kejadian, satu pesan, salam singkat; narasi sekitar 2,2 kata per detik; satu tokoh utama dengan pakaian khas yang dipakai ulang lintas video, satu lokasi, 3 sampai 6 shot dengan sebanyak mungkin LAST FRAME; komposisi 9:16.
- Keputusan owner (pilihan A): Shorts tanpa pembuka religi di awal (Alhamdulillah, shalawat, doa); cukup salam singkat di akhir. Pembuka channel tetap untuk format film YouTube.
- Kartu pilihan 4: A Shorts 30 sampai 60 detik menjadi default selama fase latihan; film YouTube minimal 2 menit menjadi B. Rasio tetap wajib dipilih.

### v3.49.1 (2026-11-01)
- Audit aturan atas permintaan owner ("cek aturan lagi, kalau ada yang aneh perbaiki"). Yang diperbaiki:
- Semua blok kode template dan contoh (`PROMPT_PROFESIONAL.md`, `CONSISTENCY_RULES.md`, `SCENE_WORKFLOW.md`, `templates/PROMPTS_TEMPLATE.md`) masih memakai label Indonesia walau v3.48 mewajibkan label Inggris; sekarang semua Inggris sehingga bisa disalin langsung. Tabel padanan 2D-1 ditambah DIALOGUE, NO HUMAN VOICES, SURROUNDINGS; Runner juga menolak SCRIPT NGOMONG, TANPA SUARA ORANG, LINGKUNGAN, AKSI.
- `CAMERA_LANGUAGE.md` 3B poin 5 masih membolehkan zoom ke medium close-up tokoh di JOTA 1 dan pola dialog JOTA 1 memakai snap zoom ke pembicara; bertentangan dengan 2F poin 3 dan data SHOT04. Sekarang zoom ke tokoh hanya JOTA 2; JOTA 1 memakai zoom ke benda, gerak tubuh dari belakang, efek kartun, atau KEYFRAME.
- `STORYTELLING_FILM.md` bagian 7 membolehkan 40 persen shot depan atau samping untuk tokoh, bertentangan dengan KUNCI JOTA 1 sejak v3.43 ("always seen from behind or far away"). Sekarang porsi itu hanya untuk figuran kecil di shot lebar; dolly mendekat dan mengikuti dari belakang diberi batas 2F.
- 2F poin 5 menyarankan shot samping untuk tokoh utama; diganti tiga perempat dari belakang supaya sesuai KUNCI JOTA 1.
- Kalimat yang mewajibkan faceless di setiap prompt (SKILL.md bagian 2, 3C poin 5, bagian 5; HINDARI JOTA 1 di 2D; cek A12) disesuaikan dengan blok per jenis shot.
- 2C poin 3 dan cek M8: kerumunan diam diberi gerak per orang bergiliran; barisan yang bergeser bersama dihitung gagal.
- `templates/PROMPTS_TEMPLATE.md`: tidak lagi menyebut v3.29; komposisi JOTA 1 tiga perempat dari belakang (sebelumnya side three-quarter view untuk semua mode).
- Contoh terisi `PROMPT_PROFESIONAL.md` 8 belum punya blok MANDATORY RULES dan larangan wajah ganda; ditambahkan.
- `CHARACTER bible` (`CONSISTENCY_RULES.md` 3) mencakup pedagang, pemilik tangan, dan kelompok figuran; bagian 7 merujuk batas kamera 2F.
- `CONNECT.md` tidak lagi menyebut minimal 3.29.0.

### v3.49.0 (2026-11-01)
- Dasar: evaluasi klip produksi Umar S28 yang dilihat owner (`playbooks/prophets-companions-moral-stories/productions/JOTA-M1-UMAR-BIN-KHATTAB-S28-20261101/EVALUASI.md`). SHOT16 tanpa orang menjadi kerumunan berwajah; SHOT07 Umar berbalik menatap kamera; SHOT04 pedagang tanpa KUNCI menjadi empat orang berwajah setelah kamera mendekat; SHOT18 barisan duduk meluncur serempak saat kamera menembus barisan, dan perempuan muncul di shaf laki-laki; SHOT08 mulai dari frame proyek 3D lama.
- Blok MANDATORY RULES mengikuti jenis shot (`PROMPT_PROFESIONAL.md` 2D): `NO PEOPLE` untuk shot tanpa orang dan `HANDS ONLY` untuk shot tangan, tanpa FACELESS dan HEAD COVERING yang memancing model menggambar orang.
- Aturan baru `PROMPT_PROFESIONAL.md` 2F dan cek A15: setiap orang dan kelompok figuran dikunci; kamera tidak membuka area yang tidak ada di gambar awal, tidak mendekat ke orang, tidak menembus kerumunan; tokoh utama selalu punya pekerjaan tangan dan tujuan di frame; gerak figuran per orang dan bergiliran; shaf masjid laki-laki saja.
- Permintaan owner: khimar perempuan panjang sampai dada dengan gamis longgar sampai kaki (baris HEAD COVERING); figuran laki-laki berjenggot sebagai satu bentuk padat di rahang dan dagu, tanpa kumis, hanya di shot lebar (baris SURROUNDING PEOPLE). Jenggot belum diuji.
- Bug Runner diperbaiki: klip dicari hanya dari `SHOT##:` tanpa menggulir daftar, sehingga klip proyek lain dengan nomor sama terambil (SHOT08) dan klip yang tertimbun di bawah daftar tidak pernah ketemu (`finish` menunggu SHOT01 dan SHOT02 lebih dari 20 menit). Sekarang `tag` proyek menjadi awal judul klip dan nama frame (`UMR28-SHOT07:`, `UMR28-SHOT07-END-v1`), kiriman ulang mendapat `-R2`, label dicatat di `progress.json`, dan daftar My AI Videos digulir dari atas sampai klip ketemu. `run` menolak proyek baru tanpa `tag`; produksi lama tanpa tag tetap berjalan dengan peringatan. Runner `plan` memeriksa `people`, blok per jenis shot, KUNCI tokoh, kamera yang menembus kerumunan atau mendekat ke orang, dan larangan kumis. Penggulir daftar belum diuji di akun owner.
- Perbaikan dokumen: setiap shot 10 detik (SKILL.md 4B langkah 7, sebelumnya tertulis 5 detik untuk shot tanpa narasi); label prompt berbahasa Inggris disebut di SKILL.md.

### v3.48.0 (2026-11-01)
- Keputusan owner: prompt yang ditempel ke VideoExpress seluruhnya bahasa Inggris, termasuk label bagian (MANDATORY RULES, OPENING STATE, ACTION, CAMERA, LIGHT, SOUND, END STATE, CONSISTENCY LOCK, AVOID) dan judul shot. Tabel padanan di `PROMPT_PROFESIONAL.md` 2D-1. Runner menolak label Indonesia. Produksi Umar S28, uji Runner, dan contoh shots.json sudah diubah.

### v3.47.0 (2026-11-01)
- Keputusan owner: JOTA 1 tidak boleh ada dua wajah dalam satu kepala, wajah di belakang kepala, maupun mata atau hidung yang muncul. HINDARI setiap prompt JOTA 1 wajib memuat: "No eyes, no nose, no mouth, no eyebrows, no ears drawn as facial features on any face. Never two faces on one head, no second face, no face on the back of any head, no double head." Runner menolak shots.json proyek `-M1-` tanpa larangan wajah ganda. Produksi Umar S28 sudah diperbarui.

### v3.46.0 (2026-11-01)
- Keputusan owner: lafaz Allah harus dibaca tebal (Alloh), bukan "Alah". Kamus `pelafalan.json` di Runner mengubah teks ucapan sebelum dikirim ke ElevenLabs (Allah, Allahu, Allahumma, Rasulullah, Abdullah, Alhamdulillah, Insya Allah, Masya Allah, Subhanallah, salam); teks storyboard tetap baku. Mengubah kamus otomatis membuat ulang narasi yang terdampak. `voice-test` bawaan kini memuat Allah, Allahumma, Rasulullah, Allahu Akbar.

### v3.45.0 (2026-11-01)
- Keputusan owner: narator JOTA tidak memakai suara clone owner. Kriteria narator: laki-laki dewasa bahasa Indonesia, hangat, tenang, tempo pelan seperti pendongeng, pengucapan Arab jelas, satu suara yang sama untuk semua episode. Runner: `voices --play` (cari dan putar calon narator bahasa Indonesia dari pustaka ElevenLabs), `voice-pick` (tambah ke akun dan tulis ELEVENLABS_VOICE_ID), `voice-test`. Endpoint pustaka suara belum diuji di akun owner.

### v3.44.0 (2026-11-01)
- Aturan owner: export final dari Final Cut memakai H.264 Better Quality 1920x1080 untuk YouTube, nama `<PROYEK>.mp4`, disimpan di folder Google Drive `Video JOTA/<PROYEK>/`; HEVC hanya arsip. Semua keluaran Runner wajib ke Google Drive: `finish` berhenti kalau Drive jotaauto1 tidak ada (kecuali `JOTA_ALLOW_LOCAL=1`) dan menulis `CARA-EXPORT-FINAL.txt` di folder proyek.

### v3.43.0 (2026-11-01)
- Temuan owner di video Umar versi 3D (S40, 18 shot lewat Runner): beberapa tokoh berwajah, termasuk tokoh yang di storyboard membelakangi kamera dibalik menghadap kamera, dan wajah tergambar di belakang kepala. Detektor wajah tidak menandai shot itu. Keputusan owner: JOTA 1 memakai S28 (sesuai data FACELESS_CHARACTER.md). Aturan prompt tambahan untuk semua shot berorang: tokoh di KUNCI ditulis "always seen from behind or far away", HINDARI ditambah "no face on the back of any head" dan "No character turning toward the camera".
- Temuan owner: cerita kurang mengalir dan tanpa suara sekitar. Storyboard sekarang disusun per adegan: 2 sampai 3 shot bersambung dengan LAST FRAME di dalam adegan, transisi crossfade antar adegan, narasi bersambung dengan kata penghubung dan jeda tanpa narasi. `shots.json` punya `scenes` dengan `ambience`; Runner membuat suara sekitar per adegan lewat ElevenLabs Sound Effects (maksimal 22 detik, diulang menerus di bawah klip) dan memasangnya di FCPXML lane -2; suara klip VideoExpress diturunkan.
- Produksi baru: `JOTA-M1-UMAR-BIN-KHATTAB-S28-20261101` (22 shot, 12 adegan).

### v3.42.0 (2026-11-01)
- Permintaan owner: Runner juga menjalankan Artistly untuk komik, storybook, gambar, dan fitur lain. `artistly.mjs` dengan mesin resep JSON (`artistly-recipes/`): `gambar`, `storybook-buat`, `storybook-ambil` (unduh versi caption dan polos, PDF, pratinjau), `komik` (memakai komik.py), perintah `pesanan` untuk pesanan.json, dan `inspect` untuk membuat resep fitur baru. Belum dijalankan di Mac owner.

### v3.41.1 (2026-11-01)
- Deskripsi skill diperbarui: Runner, Final Cut Pro, narasi ElevenLabs. Hasil uji Runner di Mac owner (commit a6cc7a0): `finish` selesai penuh, lembar cek, FCPXML dan klip ke Google Drive, Final Cut terbuka, export cadangan VideoExpress. Tampilan timeline di Final Cut belum dicek mata owner.

### v3.41.0 (2026-11-01)
- Runner 0.4.0: perintah `doctor` (cek kesiapan Mac: Node, Playwright, Chrome, Final Cut, Drive jotaauto1, ElevenLabs, Telegram, versi repo, login VideoExpress dengan `--browser`, tanpa menampilkan kunci), `voice-test` untuk mendengar narasi suara owner sebelum produksi, `run` mengulang otomatis sekali shot GAGAL setelah memuat ulang halaman, dan shot LAST_FRAME langsung menunggu putaran berikutnya kalau sumbernya belum terkirim (tidak menunggu render 25 menit sia-sia). Agen menjalankan `doctor` sebelum produksi Runner.

### v3.40.0 (2026-11-01)
- Keputusan owner: video final dirakit di Final Cut Pro (akun resmi owner), bukan hanya di VideoExpress. Runner `finalcut.mjs`: unduh klip per shot, FCPXML 1.10 (urutan, transisi `fade in`, `crossfade`, `fade out`, judul pembuka, logo, narasi di bawah klip), simpan ke Google Drive for desktop jotaauto1 `Video JOTA/<proyek>/`, buka Final Cut otomatis. Owner menonton lalu File > Share.
- Keputusan owner: narator memakai suara clone owner di ElevenLabs. Runner `elevenlabs.mjs` lewat API resmi, kunci hanya di `.env` lokal. Dengan `"narrator": "elevenlabs"`, klip VideoExpress dibuat tanpa Narration Video sehingga durasi klip tidak terpotong oleh panjang narasi; batas teks narasi 200 karakter, peringatan kalau audio melebihi klip.
- Artistly: tidak dipasang ke Runner dulu. Di uji Runner gambar VideoExpress selesai di dalam job video (sekitar 23 detik per shot), jadi Artistly menambah langkah tanpa menambah kecepatan. Dipertimbangkan hanya kalau uji perbandingan menunjukkan kualitas atau konsistensi tokoh lebih baik.
- Belum diuji di Mac owner: impor FCPXML ke Final Cut, transisi tanpa handle, API ElevenLabs.

### v3.39.0 (2026-11-01)
- Permintaan owner: full automasi. Runner 0.2.0: perintah `finish` (tunggu render, lembar cek, detektor wajah MediaPipe gratis, rakit timeline, export High FullHD mp4, unduh ke `~/JOTA/export/`), `auto` dengan jadwal launchd tiap 15 menit untuk `shots.json` bertanda `"auto": true`, notifikasi Mac dan Telegram (token di `.env` lokal). Hasil uji Runner 3 shot hari ini: buka dialog, setelan, narasi, durasi 10 detik, faceless lolos; Save Last Frame dan deteksi klip jadi diperbaiki setelah gagal. `finish` dan `auto` belum diuji di Mac owner.

### v3.38.0 (2026-11-01)
- Temuan owner dari uji Runner 3 shot: wajah polos lolos dan 3D bagus, tetapi semua tokoh gundul. Penyebab: prompt uji tidak menyebut penutup kepala, dan frasa wajah ala boneka mendorong kepala polos. Keputusan: baris `HEAD COVERING` masuk blok ATURAN WAJIB (`PROMPT_PROFESIONAL.md` 2D) untuk kisah Islami, sejarah, dan latar Arab, JOTA 1 dan JOTA 2. Runner menolak `shots.json` tanpa baris itu kecuali `"head_covering": false`.

### v3.37.0 (2026-11-01)
- Permintaan owner: otomasi murah tanpa biaya AI per klik. Skrip Playwright baru `apps/videoexpress-runner/` (perintah `login`, `plan`, `run`, `qc`) menjalankan `shots.json` di browser yang terlihat di Mac owner. Owner login sendiri; skrip tidak menyentuh password, tidak menghapus, tidak export, tidak publish. Pilihan kartu 9 ditambah C Runner (SKILL.md 3A). Paket prompt (4B langkah 4) sekarang juga menulis `shots.json` dengan teks yang sama dengan kartu kerja. Belum diuji di akun VideoExpress owner; uji pertama 2 sampai 3 shot.

### v3.36.0 (2026-11-01)
- Keputusan owner: sebelum generate gambar dan video, storyboard dan prompt detail wajib lengkap sebagai paket ambil alih, supaya owner bisa melanjutkan manual kalau token atau limit agen habis. Kolom Gambar awal di shot list (`BARU`, `LAST FRAME SHOT##`, `PAKAI ULANG`), kartu kerja per shot (setelan, langkah klik, semua teks tempel, nama frame yang disimpan, transisi), dan tabel progres di `PROMPTS.md`. Di `STORYTELLING_FILM.md`, SKILL.md 4B langkah 4, `PROMPTS_TEMPLATE.md`, `CONNECT.md`, checklist C72.

### v3.35.0 (2026-11-01)
- Temuan owner: cerita kaku dan lompat (langsung ke inti, satu scene satu fakta, tanpa suasana dan transisi). Keputusan owner setelah diskusi: produksi YouTube memakai struktur film. File baru `references/STORYTELLING_FILM.md`: struktur episode (hook, pembuka channel dengan Alhamdulillah, shalawat, dan doa, dunia saat itu, pengenalan, pemicu, ketegangan, klimaks, balik arah, penutup), teknik mendongeng (open loop, napas, kontras, bookend), tata bahasa kamera, transisi editor, adegan pengisi bertanda PENGISI, komposisi shot faceless (minimal 50 persen shot aman, depan dan samping boleh), desain suara, format shot list. Dasar: tata bahasa film (Salisbury University) dan praktik retensi YouTube (OutlierKit).
- Keputusan owner: durasi minimal 2 menit, panjang mengikuti cerita. Kartu pilihan 4 diganti.
- Template prompt varian shot (`PROMPT_PROFESIONAL.md` 4B) dengan bagian SHOT dan LINGKUNGAN, cek A13 dan A14. SKILL.md urutan baca, 4B langkah 2 dan 7, PB06 langkah 4, `PROMPTS_TEMPLATE.md`, `CONNECT.md`, checklist C71.

### v3.34.0 (2026-11-01)
- Pertanyaan owner: klip pendek, tidak memakai 8 sampai 10 detik. Penyebab: `Narration Video` memotong klip ke panjang narasi ditambah 1 sampai 2 detik (49 sampai 99 karakter = 6 sampai 8 detik). Keputusan untuk produksi YouTube: narasi 105 sampai 120 karakter per scene agar klip sekitar 9 sampai 10 detik (`PROMPT_PROFESIONAL.md` 4A poin 9). Narasi sebagai trek terpisah di editor dicatat sebagai calon cara, belum diuji (poin 10).
- Permintaan owner: beberapa sudut dalam satu klip. Label `Multi-Shot` di dialog belum diketahui cara pakainya; prosedur uji di `PROMPT_PROFESIONAL.md` 2E, belum wajib.
- Data perbandingan S28 dan S40 untuk JOTA 1 di `FACELESS_CHARACTER.md`; rekomendasi S28 sebagai default.

### v3.33.0 (2026-11-01)
- Temuan owner: beberapa klip masih lolos dengan wajah. Keputusan owner: aturan faceless dan gerak natural wajib ditulis ulang di awal setiap prompt video dan gambar, baru kemudian keadaan, adegan karakter, dan kamera. Blok ATURAN WAJIB baru di `PROMPT_PROFESIONAL.md` 2D (teks persis untuk Image Prompt dan Video and Audio Prompt, JOTA 1 dan JOTA 2), template bagian 3 dan 4, `PROMPTS_TEMPLATE.md`, SKILL.md bagian 3C poin 5 dan 5, P2, cek A12, checklist C70, dan instruksi ChatGPT di `CONNECT.md`. Aturan yang sama tetap ada di KUNCI dan HINDARI.

### v3.32.0 (2026-11-01)
- Temuan owner di beberapa video JOTA, dari berbagai sesi dan agen, tidak hanya produksi Claude: penunggang kuda beriringan berjalan mundur, kepala berputar 360 derajat, tangan berputar aneh. Sebelumnya tidak ada agen yang menyaring gerak, dan cek faceless hanya melihat wajah pada 4 sampai 8 frame per klip.
- Owner menemukan gerak aneh juga di hasil ChatGPT, jadi aturan gerak natural dan cek M1 sampai M8 juga ditulis di instruksi Project ChatGPT (`CONNECT.md`), bersama aturan narator v3.30.
- Keputusan owner: gerak yang aneh tidak boleh lolos, wajib natural. Aturan inti 5 diubah: agen sekarang menyaring setiap klip dengan cek gerak M1 sampai M8 pada frame setiap 0,5 detik sebelum klip masuk timeline (menggantikan "agen tidak menilai klip" dari keputusan sebelumnya). Aturan menulis prompt gerak natural dan baris HINDARI gerak di `PROMPT_PROFESIONAL.md` 2C, cek A11, checklist C69.

### v3.31.0 (2026-11-01)
- Permintaan owner: video sahabat dibuat sinematik dan sangat detail. Aturan baru `PROMPT_PROFESIONAL.md` 2B, lapisan detail sinematik: baris Materials, Depth, Atmosphere, Light (utama, rim, pantulan), dan Grade di Image Prompt style 3D; gerak sekunder dan paralaks di video prompt; cek A10. Belum diuji; produksi pertama `JOTA-M1-KHALID-BIN-WALID-20261101` (S40).
- Temuan produksi Khalid: S40 memunculkan wajah lengkap saat tokoh melangkah atau berbalik di klip video, walau gambar awal lolos. Resep baru di `FACELESS_CHARACTER.md` bagian Temuan S40 dalam gerak: tokoh diam membelakangi kamera, siluet berlatar cahaya, shot setinggi pinggang, shot benda tanpa tokoh. Use Consistent Character dengan acuan menghadap depan membuat keyframe ikut menghadap kamera; keyframe dari belakang dibuat tanpa CC.
- Prompt di chat: kalau total lebih dari sekitar 20.000 karakter, prompt dikirim sebagai berkas `PROMPTS.md` yang tampil di chat; tabel storyboard tetap pesan. Kalimat wajib varian narator ditulis tanpa kata `speak` supaya cek P3 bersih.

### v3.30.0 (2026-10-31)
- Temuan owner: suara narator dobel di `JOTA-M1-ABDURRAHMAN-BIN-AUF-20261031`. Video and Audio Prompt produksi itu menyebut narator berbahasa Indonesia, sehingga model video kemungkinan membuat suara orang sendiri di bawah TTS. Aturan baru `PROMPT_PROFESIONAL.md` 4A: teks narasi hanya di kotak TTS, prompt video tanpa kata narator atau isi narasi, bagian TANPA SUARA ORANG, SUARA tanpa napas atau tangis, cek P3 mencari kata terlarang. Disinkronkan di SKILL.md aturan inti 4, bagian 5, P3, `SCENE_WORKFLOW.md`, template, dan checklist C34c. Penyebab belum dibuktikan dengan uji pembanding.
- Keputusan owner: setelah tema ditentukan, storyboard dan semua prompt dikirim utuh di chat dan di-commit ke repo sebelum gambar atau klip pertama dibuat (SKILL.md 4B langkah 4, bagian Storyboard di `PROMPTS_TEMPLATE.md`, checklist C67). Operator AI lanjut tanpa menunggu kecuali owner meminta revisi.
- Keputusan owner: kartu pengaturan mendapat pilihan 9, operator VideoExpress AI atau Manual. Keputusan v3.24 yang menghapus jalur MANUAL diganti: Manual kembali sebagai pilihan owner, agen memberi langkah per scene dan tidak mengklik provider (SKILL.md 3A, checklist C68). Default tetap AI.

### v3.29.3 (2026-10-31)
- Keputusan owner: di JOTA 1, sahabat bernama boleh diperankan sebagai tokoh kartun faceless S28 dengan aksi dan ucapan dari sumber terverifikasi; Rasulullah tetap tidak digambarkan dan kehadirannya hanya disebut narator. Ditulis di `ISLAMIC_HISTORY_SOURCE_POLICY.md` dan PB06. Produksi pertama: `JOTA-M1-ABDURRAHMAN-BIN-AUF-20261031`.

### v3.29.2 (2026-10-31)
- Keputusan owner setelah uji `JOTA-M2-DUEL-NINJA-ATAP-20261031`: format prompt paragraf mengalir gaya system prompt resmi VideoExpress ditolak ("jangan kayak amatiran"). Template PRO yang rinci tetap wajib; dicatat di `PROMPT_PROFESIONAL.md` bagian 7.

### v3.29.1 (2026-10-31)
- Reset atas perintah owner: 11 folder produksi yang belum `DELIVERED` dihapus dari repo (Anak Entok Tersesat, Benchmark Saheela, Saheela Dapur, Saheela dan Umair Bermain, Sarah Membantu Aba, Uwais Membantu Kakek, Hari Hujan yang Hangat, Kancil-Buaya, Stickman Mangga, Apa yang Terjadi di Dalam Jantungmu, Cara Kerja Jantung, Nuh anak). Dua yang tersisa: Jantung Setiap Detik dan Perjalanan Makanan (`DELIVERED`). Riwayat tetap ada di git. Prompt uji konsistensi v3.25 di CONNECT.md dihapus karena bergantung pada folder Sarah. Aset di VideoExpress, Artistly, dan Drive tidak disentuh.

### v3.29.0 (2026-10-31)
- Review total dan perombakan atas permintaan owner. SKILL.md ditulis ulang dari 444 menjadi sekitar 225 baris tanpa membuang aturan: alur mode cepat dan mode lengkap dilebur menjadi satu alur produksi (4B) dengan tambahan mode lengkap (4C); catatan perubahan dipindah ke `CHANGELOG.md`; peta referensi menjadi tabel.
- Keputusan owner: pilihan genre. File baru `references/GENRE_CATALOG.md` berisi 16 genre (dongeng anak, kisah Islami, edukasi, dokumenter, anime, komik, photorealistic, animasi 3D, komedi, petualangan, laga, horor dan misteri, drama keluarga, fantasi, fiksi ilmiah, vlog) dengan struktur, tempo, kamera, suara, style disarankan, dan batasan per mode. Kartu pengaturan mendapat pilihan 8 Genre; kode pilihan 1 sampai 7 tidak berubah.
- Aturan yang saling bertentangan diperbaiki:
  - `CREATIVE_MODES.md` masih menyatakan JOTA 1 wajib manekin, mulut tidak pernah boleh, narator sebagai default, dan karakter acuan hanya dari Artistly. Ditulis ulang sesuai keputusan v3.10 sampai v3.28.
  - Playbook PB01 (yang paling sering dipakai) masih menyuruh metode manekin S26 atau S27, narator default, dan tokoh bicara membelakangi kamera. Disesuaikan ke S28 metode B, dialog native, template PRO.
  - PB07 masih menulis "SC02+ selalu dari frame tersimpan" dan QC per klip oleh agen. Disesuaikan ke aturan SAMBUNG atau KEYFRAME dan QC owner.
  - `FACELESS_CHARACTER.md` masih menulis narator sebagai default dan Enhance video ON atau OFF bebas. Disesuaikan.
  - `SCENE_WORKFLOW.md` F1 memakai kalimat FACELESS manekin ("no mouth") untuk semua JOTA 1, bertentangan dengan S28 metode B. Dipisah per metode.
  - `STYLE_CATALOG.md` menyuruh semua tokoh JOTA 1 ditulis sebagai manekin. Diperbaiki.
  - `EDUCATIONAL_WORKFLOW.md` menulis JOTA 1 "no visible mouth". Disesuaikan.
  - SKILL.md bagian 2 dan `SCENE_WORKFLOW.md` I menyuruh agen bertanya ke owner setelah 2 kali gagal faceless, bertentangan dengan aturan tidak berhenti di tengah. Sekarang: 2 kali shot lebih jauh, 1 kali Smart Edit faceless, lalu `FACELESS_QA_BLOCKED` sebagai hambatan nyata.
- Dua catatan produksi digabung: `RUN_LEDGER.md` (memakai status lama `GENERATING`, `READY_FOR_QA`, `ACCEPTED`) menjadi penunjuk; `RUN_STATE.json` satu-satunya catatan dengan field baru `genre`, `style_tag`, `voice`, `image_generator`, `assumptions`, `delivery`.
- Status: ditambah `EXPORTED` (MP4 di My Videos, belum di Drive), karena 5 dari 13 produksi berhenti di tahap akhir dan agen membuat kode sendiri. Aturan baru: hanya kode di SKILL.md bagian 8 yang boleh dipakai. Daftar status semua produksi dipindah ke `playbooks/README.md`.
- Label versi basi dihapus dari judul file referensi; rujukan ke penomoran langkah lama diperbarui di SCENE_WORKFLOW, PB01, CONNECT, dan AGENTS.md.
- Aplikasi Mac untuk memilih pengaturan lewat portal: ditunda atas keputusan owner sampai skill selesai.

### v3.28.1 (2026-10-31)
- Keputusan owner: gaya dan karakter wajib konsisten. `PROMPT_PROFESIONAL.md` bagian 2A: satu style per proyek, style tag ditulis di baris STYLE setelah label dan di KUNCI (identik), kosakata dibatasi per kelompok style, KUNCI tokoh disalin dari bible yang dikunci dari gambar, KEYFRAME memakai Reference Photo keyframe SC01, kamera tidak memperbesar kepala, suara tokoh tetap, tidak ada tokoh di luar bible. Cek baru A8 Gaya dan A9 Karakter.
- Koreksi v3.28.0: template PRO sempat menyuruh menulis lensa, depth of field, dan background blur untuk semua style, termasuk S28 2D. Kata fotografi seperti itu berisiko menarik gambar 2D ke arah 3D atau realistis dan merusak resep S28 yang sudah lolos benchmark. Sekarang lensa dan blur hanya untuk style 3D; style 2D memakai layered painted background dan soft cel shading. Contoh terisi diperbaiki dan dicek ulang.

### v3.28.0 (2026-10-31)
- Keputusan owner: template prompt profesional wajib dipakai selalu, termasuk suara latar dan suara sekitar, supaya hasil tidak terlihat seperti video AI. File baru `references/PROMPT_PROFESIONAL.md` berisi template PRO (Image Prompt dan Video and Audio Prompt), daftar ciri video AI dan penangkalnya, katalog suara latar untuk 11 jenis lokasi, dan cek anti-AI A1 sampai A7. Aturan inti 8.
- Struktur baru Video and Audio Prompt: bagian CAHAYA, SUARA tiga lapis (suasana, Foley, ruang) per segmen waktu, dan blok HINDARI di akhir untuk semua larangan. Kalimat FACELESS JOTA 1 tetap persis seperti sebelumnya karena sudah lolos benchmark. Template F5 menjadi arsip.
- Panjang prompt: tidak ada batas 6.000 karakter seperti klaim sumber luar, karena prompt 7.100 sampai 8.000 karakter di produksi Saheela dan Umair dirender sampai selesai. Yang wajib: isi kotak prompt dibaca ulang dan tidak terpotong.
- JOTA 2: musik tidak dibuat oleh generator klip; musik berlisensi ditambahkan saat rakit. Azan, bacaan Al-Qur'an, dan doa tidak dibuat oleh generator klip.
- Status: teknik baru di template belum diuji A/B di akun owner. Produksi pertama dicatat dengan `"template": "PRO"` di RUN_STATE dan diperbaiki dari temuan owner.

### v3.27.2 (2026-10-31)
- Keputusan owner: berhenti di tengah produksi berbahaya karena video tidak jadi kalau owner tidak sempat mengecek. Aturan 3 poin 4: kesalahan yang bisa diperbaiki agen (rasio salah, folder produksi belum ada, dialog berubah sendiri, setelan belum pasti) diperbaiki sendiri, dicatat, lalu produksi lanjut sampai MP4. `SHARED_SESSION_CONFLICT` dipulihkan sendiri dan baru menghentikan kerja setelah 3 kali berturut-turut. `PUBLIC_GALLERY_LEAK` dicatat dan dilaporkan tanpa menghentikan produksi. Status baru `NOT_USED`. Menggantikan versi v3.27.0 dan v3.27.1 yang menyuruh agen menunggu jawaban owner.

### v3.27.1 (2026-10-31)
- Keputusan owner: public gallery wajib OFF tanpa pengecualian dan tanpa pilihan ON (aturan inti 7). Berlaku untuk Create Image dan Create Video, dicek dari halaman tepat sebelum klik. Status baru `PUBLIC_GALLERY_LEAK`.

### v3.27.0 (2026-10-31)
- Kontradiksi diperbaiki: titik persetujuan Langkah 7 poin 4 hanya untuk mode lengkap; mode cepat tetap tanpa persetujuan di tengah (keputusan v3.21 menang atas aturan v3.1).
- Disiplin menyelesaikan aturan 1 diselaraskan dengan batas aksi per giliran: tidak menunggu render di dalam giliran, titik lanjut ditulis di `RUN_STATE.json`. Larangan menyebut selesai sebelum MP4 tetap berlaku.
- Bagian baru "Kerja agen di tab VideoExpress": berhenti saat dialog berubah sendiri (`SHARED_SESSION_CONFLICT`), dua tab BUAT dan CEK, cek setelan dengan membaca halaman, segarkan library dari 50 persen, label scene tetap `SC##: judul` dan Image Prompt tanpa label.
- `SCENE_WORKFLOW.md` C langkah 2: Creative mode dan Image Type mengikuti style (S28: `2d`, Creative mode OFF), Enhance image OFF di semua mode, sesuai v3.11 dan v3.26. Peta UI L mendapat catatan dialog berubah sendiri dan library 50 persen.
- `VIDEOEXPRESS_PROVIDER_LOCK.md`: syarat bukti asal tidak lagi menyebut "lulus QC" (QC oleh owner sejak v3.8).
- Penunjuk versi basi diperbarui: `README.md`, `CONNECT_CHATGPT.md`, `CONNECT.md`, dan `AGENTS.md` di root (tiga generator gambar acuan).
- Sumber bagian browser: pengamatan di akun owner 2026-10-28, dan pembacaan skill komunitas `ratava/videoexpress-scripting-skill` v2.5.6 (lisensi CC BY-NC 4.0) sebagai referensi. Isinya tidak disalin; aturan ditulis ulang untuk JOTA. Aturan prompt dari sumber itu (larangan hanya di blok NEGATIVES, suara per segmen, tidak meminta hening) belum diadopsi sampai diuji A/B di akun owner.

### v3.26.1 (2026-10-27)
- Tambah referensi kualitas QR-001 dari video Ghibli Days yang dikirim owner: sasaran kualitas cerita/visual/suara, scorecard review owner, dan contoh penerapan orisinal. Referensi non-normatif; tidak mengubah aturan produksi, penyambungan, kewajiban faceless, maupun jatah ulang render.

### v3.26 (2026-10-25)
- Pemicu: produksi Saheela dan Umair berhenti di SC01 setelah 4 render karena frame dibandingkan dengan teks yang sudah berbeda dari gambar acuan sejak awal (rambut di bawah peci, 3 panel tirai), dan semua selisih dianggap fatal. Perbaikan di `CONSISTENCY_RULES.md`: gambar yang disetujui menang atas teks (2D IMAGE LOCK: teks bible, LAYOUT, Props dikunci ulang dari gambar); dua tingkat pelanggaran (fatal F1 sampai F6 wajib ulang, ringan M1 sampai M4 dicatat `MINOR_DRIFT` lalu lanjut); jatah ulang hanya dihitung untuk fatal; pelanggaran yang sudah ada di gambar awal diperbaiki di gambar awalnya; frame sambungan boleh diambil lebih awal dari detik terakhir.
- KEYFRAME memakai shot paling dekat yang memuat semua tokoh dan benda cerita, bukan shot lebar ruangan. Kamera tidak boleh memperlihatkan bagian ruangan di luar gambar awal (pintu baru muncul di percobaan 1 dan 3). Tanpa kata waktu di scene bersambung.
- Enhance Image Prompt dan Enhance Video Prompt OFF di semua scene, menggantikan aturan lama "centang ulang Enhance Video Prompt".
- Potong bengong saat rakit lewat `Separate Audio and Video` dan bagian gelombang suara yang datar (dari repo workflow resmi tim VideoExpress, belum diuji di akun owner).
- Sumber pembanding: repo `strontiumplatform/VideoExpress.ai-Full-Length-Consistent-Character-Realistic-Talking-Avatar-Video-Workflow` (tim VideoExpress, 2026-08-07), dibaca sebagai referensi, bukan instruksi.

### v3.25 (2026-10-25)
- Keputusan owner (pemicu: Sarah Membantu Aba v1, peci Aba hilang, buku berganti warna, tumpukan yang sudah dibereskan berserakan lagi, tinggi Sarah berubah, kamera satu sudut): file baru `references/CONSISTENCY_RULES.md`. Scene di lokasi dan waktu yang sama wajib SAMBUNG dari frame terakhir; KEYFRAME hanya untuk SC01, pindah lokasi, pindah posisi besar, atau lompatan waktu. Menggantikan aturan v3.7 "KEYFRAME default, SAMBUNG hanya untuk take lebih dari 10 detik" dan batas 3 klip per rantai. Wajib Character bible lengkap (tinggi relatif, atribut, sifat, gaya gerak), Props bible dengan jumlah dan warna, Peta lokasi, Buku keadaan dengan hitungan benda. Video and Audio Prompt mendapat blok KEADAAN AWAL, KAMERA (lima unsur per gerakan, framing awal dan akhir, headroom), dan KEADAAN AKHIR. Cek K1 sampai K7 sebelum submit dan S1 sampai S5 di setiap frame sambungan (`CONSISTENCY_BLOCKED`).

### v3.24 (2026-10-25)
- Keputusan owner: jalur MANUAL dihapus seluruhnya. Hanya ada jalur OTOMATIS; agen tidak menyerahkan langkah produksi ke owner. Kalau agen tidak bisa menjalankan langkah, statusnya `AUTOMATION_BLOCKED`. "Buatkan prompt" tetap boleh sebagai perencanaan saja.

### v3.23 (2026-10-25)
- Keputusan owner: aturan "kalau tidak bisa mengendalikan browser atau OTOMATIS gagal, lanjut ke jalur MANUAL" dihapus. Agen berhenti dengan `AUTOMATION_BLOCKED` dan melapor penyebabnya. Jalur MANUAL hanya dipakai kalau owner sendiri memintanya.

### v3.22 (2026-10-25)
- Folder kerja `~/JOTA/input/[judul]/` untuk bahan owner dan `~/JOTA/export/` untuk MP4. Agen mengecek bahan sebelum menyusun cerita.
- Mode cepat langkah 5: Consistent Character dari keyframe SC01, perbaikan mata lewat Smart Edit, satu scene satu job.
- Instruksi Project ChatGPT ditulis ulang lengkap di `CONNECT.md` setelah dua kegagalan: chat dibuka di luar Project (instruksi tidak terbaca) dan ChatGPT memakai Higgsfield. Larangan plugin video lain eksplisit.

### v3.21 (2026-10-25)
- Mode cepat memakai satu kartu pengaturan (mode, rasio, style, durasi, suara, gambar acuan, judul) yang dijawab owner dengan kode seperti "2B 3B". Setelah itu agen jalan sampai MP4 tanpa pertanyaan lain. Menggantikan mode cepat tanpa pertanyaan di v3.16.
- Robot dan benda bernyawa kartun di JOTA 1 ikut aturan hewan: tanpa mata.

### v3.20 (2026-10-25)
- Rasio tidak punya default lagi: owner memilih 16:9 cinematic atau 9:16 vertical untuk setiap video; kalau belum disebut, agen bertanya satu kali sebelum keyframe.
- Aturan gerak fisik natural (`SCENE_WORKFLOW.md` D0b) setelah uji S40: Saheela turun dari bangku dengan gerakan tidak wajar karena prompt meminta "hops on the stool". Dilarang lompat, putar badan, naik atau turun perabot di dalam klip; gerak besar ditulis langkah demi langkah, satu per klip.

### v3.19 (2026-10-25)
- Teks dialog hanya ditulis sekali, di SCRIPT NGOMONG (`Line 1, [Tokoh] says exactly...`). Beat sheet cukup `[Tokoh] speaks line 1.` Dialog ganda ditolak VideoExpress ("dialogues are too long"). Template F3, F5, PROMPTS_TEMPLATE, dan prompt produksi Saheela sudah disesuaikan.
- S40 3D sinematik wajah polos teruji (keyframe dan video dialog 9:16): mata dan hidung tidak muncul, mulut hanya saat bicara. Instruksi kamera berlapis dalam satu klip belum andal; ganti ukuran shot tegas dipecah jadi dua scene.

### v3.18 (2026-10-25)
- Style S40 3D sinematik wajah polos dari contoh Reels owner: wajah kosong, tangan dan kain detail, depth of field tipis, cahaya hangat, banyak shot detail tangan, subtitle tertanam. Belum diuji di VideoExpress.

### v3.17 (2026-10-25)
- Katalog style menjadi 39: tambah papercraft, origami, boneka felt, whiteboard, tinta oriental, ornamen geometri Islami (pembuka dan latar ayat), 3D toon, kartun 1930-an, isometrik, komik bergerak, lukisan pasir. Belum teruji di akun owner.
- Bahasa kamera: bagian 3C teknik khas animasi dan penyuntingan (multiplane parallax, smash zoom, impact frame, camera shake, speed ramp, shot-reverse-shot dengan KEYFRAME, reaction shot, cutaway, focus pull, light leak, transisi editor).

### v3.16 (2026-10-25)
- Mode cepat sebagai default: owner cukup menyebut tema; agen memakai default JOTA 1, S28, 16:9, G1, 6 scene, dialog native, tanpa pop-up dan tanpa titik persetujuan di tengah. Template paket produksi umum `templates/PROMPTS_TEMPLATE.md` yang bisa diisi Claude maupun ChatGPT.

### v3.15 (2026-10-25)
- Tiga pengaman eksekusi untuk semua agen (pemicu: ChatGPT berulang kali menulis "lanjut" tanpa bisa mengendalikan browser dan mengarang "12 gambar" yang tidak ada): cek kemampuan di pesan pertama, "lanjutkan" hanya kalau ada folder produksi dengan PROMPTS dan RUN_STATE (`NO_PRODUCTION_STATE`), laporan wajib bukti. Panduan ChatGPT diperbarui di `CONNECT.md`.

### v3.14 (2026-10-25)
- Kamera animasi studio wajib (keputusan owner): setiap ketukan beat sheet punya gerakan kamera sesuai emosi dan kecepatan cerita, minimal dua jenis gerakan per klip, elemen efek kartun (garis kejut, kilau, tetes keringat) tanpa tulisan; momen doa tetap tenang. Menggantikan anjuran lama "satu gerakan utama per scene". Tabel emosi ke gerakan di `CAMERA_LANGUAGE.md` 3B.

### v3.13 (2026-10-25)
- Aturan tanpa bengong (fatal, keputusan owner): di klip 10 sampai 11 detik tidak boleh ada detik tokoh tidak bergerak dan tidak bicara. Prompt dibuka `From the very first frame`, ADEGAN memakai beat sheet bertanda waktu, pendengar ikut bergerak, akhir klip berisi aksi lanjutan pelan. Menggantikan aturan lama "diam 2 detik di akhir" dan "After a short natural pause". Bengong di awal atau akhir dipotong saat rakit; di tengah, scene diulang.
- Template prompt lengkap JOTA 1 S28 dengan dialog (`SCENE_WORKFLOW.md` F5); setiap prompt ditulis utuh, tidak disingkat.

### v3.12 (2026-10-25)
- Keputusan owner setelah menonton uji dialog D1 sampai D4: JOTA 1 boleh dialog native; mulut yang muncul saat tokoh bicara diterima karena mata dan hidung tetap tidak ada sehingga tokoh bukan gambar wajah utuh. Mata dan hidung tetap syarat mutlak. Wajah diam tetap polos.

### v3.11 (2026-10-25)
- Hasil benchmark JOTA 1 di akun owner (storyboard Saheela): resep baru metode B kartun wajah polos (S28) dengan kalimat pembuka faceless positif, generator VideoExpress, Creative mode OFF, Enhance image OFF. Lolos di semua gambar manusia dan semua klip video yang diuji; kalimat larangan saja dan Artistly Fast gagal untuk gaya ini.
- Hewan: frasa plush toy, lalu Smart Edit dengan penegasan semua tokoh tetap polos. Narator Indonesia lewat `Narration Video` (maksimal 120 karakter per klip). First Frame, Last Frame teruji: tepat di frame akhir, tapi keyframe harus bertata letak sama.

### v3.10 (2026-10-25)
- Tiga generator gambar acuan dipilih owner per proyek di pop-up pembuka: G1 VideoExpress, G2 Artistly, G3 ChatGPT Images 2.0. ChatGPT dan Artistly hanya untuk gambar diam. Konektor Drive ChatGPT hanya baca, jadi gambar G3 masuk ke VideoExpress lewat unggah (`SCENE_WORKFLOW.md` B1).
- Keputusan owner soal hewan JOTA 1: paruh atau moncong tertutup boleh sebagai bagian bentuk kepala; mata tidak boleh sama sekali; paruh tidak terbuka atau bergerak seperti bicara.
- JOTA 1: gambar acuan dicek kepalanya oleh agen sebelum dipakai (pengecualian dari tanpa QC v3.8).

### v3.9 (2026-10-25)
- Teks judul OP/CL dibatasi 10 menit dan tidak boleh menahan penyerahan; kalau gagal, blok teks bawaan dihapus, export tanpa judul sebagai v1 (`TITLES_SKIPPED`). Pemicu: Rebutan Mangga macet 3,5 jam di 4 teks judul setelah 6 klip selesai dalam sekitar 1 jam (tes paralel v3.7 berhasil).

### v3.8 (2026-10-24)
- Keputusan owner: QC hasil oleh agen dihapus; owner yang mengecek. Agen hanya mengulang render gagal atau video kosong. Pengaman yang tetap: cek setelan sebelum Create, melihat frame sambungan SAMBUNG, bukti selesai nyata.
- Hasil akhir disimpan ke folder Google Drive `Video JOTA` di akun `jotaauto1@gmail.com` (ID `1GeDj4s0ubm0kCMr4SYseYGlZyZA7x_Us`). Status baru `CLIP_READY`, `ASSEMBLED`, `DELIVERED`, `OWNER_CHECKED` menggantikan `SCENE_VERIFIED` dan `ASSEMBLED_VERIFIED`.

### v3.7 (2026-10-24)
- Keputusan owner: frame terakhir tidak wajib, tergantung cerita. Default scene KEYFRAME (Image Prompt baru dari karakter acuan, menggambarkan keadaan akhir scene sebelumnya, paralel). SAMBUNG hanya untuk take kamera yang sama lebih dari 10 detik, dipecah SC03A/SC03B, maksimal sekitar 3 klip per take. Menggantikan pembagian SAMBUNG/CUT v3.6.
- Tabel kesinambungan wajib sebelum generate; gambar lokasi tanpa tokoh dan tata letak tetap untuk lokasi berulang; aturan arah pandang (two-shot samping atau tiga perempat, tidak menatap kamera); panel dibiarkan terbuka di antara submit.
- Sumber teknik: playbook pihak ketiga `ai-playbooks/videoexpress-stickman-story-agent` (bahan referensi, tidak terbukti resmi VideoExpress).

### v3.6 (2026-10-24)
- Generate paralel: scene ditandai `SAMBUNG` atau `CUT`. SC01 dan scene `CUT` (Image Prompt baru + karakter acuan) di-submit tanpa menunggu render, maksimal 5 job bersamaan; hanya scene `SAMBUNG` yang menunggu frame sambungan. Pemicu: owner menilai produksi berantai terlalu lama (sekitar 12 menit per scene, serial).
- Peta UI VideoExpress yang teruji (`SCENE_WORKFLOW.md` L): rasio dan Public Gallery kembali ke default setiap dialog dibuka; hapus klip lewat klik kanan (keyboard Delete tidak berfungsi); ikon tempat sampah menghapus track; `Auto Align Clips`; setelan export; pesan batas 5 job.
- Baris pertama Video and Audio Prompt `SC##: judul` supaya klip mudah dicari di Media Library.
- Buang bagian diam di awal klip saat trim.
- Sumber: uji langsung di akun owner dan playbook pihak ketiga `ai-playbooks/realistic-mini-dramas` (hanya bagian teknis UI; tidak terbukti resmi VideoExpress; aturan "tanpa QC" dan gaya drama cepatnya tidak diadopsi). Klip 4 sampai 5 detik, Creative mode ON untuk 3D, dan Enhance Video OFF dicatat sebagai bahan uji, belum aturan.

### v3.5 (2026-10-24)
- QC ringan atas keputusan owner: per klip cukup ditonton sekali dengan suara dan cek 3 hal; cek sambungan digabung dengan memilih frame; cek prompt lewat Details hanya kalau kata terdengar berbeda; ledger cukup ID klip dan hasil; film utuh tetap ditonton sekali sebelum export.

### v3.4 (2026-10-24)
- Kriteria JOTA 1 disesuaikan dengan dasar syariat (`references/SYARIAT_GAMBAR.md`): syaratnya mata, hidung, dan mulut tidak ada; gagal hanya kalau fitur jelas terlihat; bayangan samar dan tekstur tidak dihitung; tokoh boleh menghadap kamera; manekin adalah teknik, bukan syarat. Paruh hewan tertutup sementara dibolehkan sampai owner memutuskan.

### v3.3 (2026-10-24)
- Mengembalikan aturan "kerjakan sampai MP4 final" dari v2 (Completion discipline) yang hilang saat peleburan v3.0: tunggu render, lanjut sampai export, catat `RUN_STATE.json` di setiap tonggak, berhenti hanya karena hambatan nyata dengan titik lanjut yang persis. Pemicu: produksi 10 scene di ChatGPT berhenti saat SC02 baru 23 persen.

### v3.2 (2026-10-24)
- JOTA 1 memakai metode manekin (dari tutorial Sayan Roy `i2CmllNmJnk`): tokoh manekin berkepala oval mulus, hewan sebagai patung pahatan tanpa mata, kalimat FACELESS manekin di BLOK KUNCI.
- Style baru S25 manekin putih dokumenter, S26 manekin kayu hangat, S27 manekin pastel; jadi pilihan utama JOTA 1.
- JOTA 1: Enhance Image Prompt OFF, Narration Video sebagai default suara, uji Enhance Video Prompt ON dan OFF di scene pertama.
- Tidak ada jaminan 100%; jaminan ada di QC wajah yang menolak setiap klip berwajah.

### v3.1 (2026-10-24)
- Alur 10 langkah "buatkan video tema A": pop-up mode, style, rasio, produser; riset tema viral dengan data; Claude menentukan karakter dan figuran; folder proyek di Artistly; satu titik persetujuan sebelum klip video.
- Katalog 24 style (`references/STYLE_CATALOG.md`) dari tutorial Creative Mode VideoExpress 3.5, memakai deskripsi gaya, bukan nama merek.
- Bahasa kamera lengkap (`references/CAMERA_LANGUAGE.md`), termasuk batasan sudut pada metode sambung frame.
- Aturan frame sambungan: setelah kata terakhir, tajam, identitas dicek terhadap gambar acuan asli, tidak memotong dialog; scene diakhiri diam 2 detik.
- BLOK KUNCI wajib disalin persis di setiap prompt.
- Pembuka (produser presents, judul) dan penutup (tamat, kredit) dengan teks di editor.
- Bug UI dari tutorial: centang Enhance Video Prompt bisa lepas saat durasi diubah; cek prompt hasil enhance lewat Details.

### v3.0 (2026-10-24)

Semua patch v2.0 sampai v2.4.3 (termasuk execution source guard) dilebur ke versi ini. Keputusan yang diambil saat merapikan:
- Alur sambungan utama mengikuti tutorial VideoExpress 3.5 (pilih frame, simpan, trim, Use from Library). First Frame/Last Frame hanya alternatif kalau sudah terbukti jalan di akun owner.
- JOTA 1 dengan dialog: suara karakter tetap native satu job (koreksi owner v2.4.2 menang atas aturan lama "suara karakter terpisah"), karakter difilmkan tanpa terlihat wajahnya.
- Jalur MANUAL dan OTOMATIS dibedakan jelas dan dipilih owner.
- File v2 yang tumpang tindih dipindah ke `archive/v2/`.

Bukti aktivasi Telegram4.23.13: live GPT mini + restart memory PASS (live-1794384937), regressions PASS, legacy hook synchronized, conversation_enabled aktif, announcement SENT238. Draft UUID tidak diperlakukan production ID; angka2D tidak menetapkan jumlah tokoh; koreksi parsial tersimpan saat klarifikasi. Produksi/publikasi tidak dijalankan oleh pengujian.

2026-11-11 [ChatGPT] Bugfix percakapan4.23.13: sapaan tidak membuat draft atau menawarkan ide otomatis; obrolan umum mempertahankan respons manager, /ide tetap tersedia. Test sapaan/smalltalk/dedupe/preserve draft, hook dan core PASS; bot tunggal direload.

## 4.23.14 — 2026-11-11 — ChatGPT

Keputusan owner: perbaiki manager Telegram yang menjawab keluhan wajah dengan draft kosong. TelegramSkill1.0.1 menambahkan konteks copied-report/reply terpisah, pengikatan artifact lewat Drive, QC_FEEDBACK ter-grounding current quote, owner-reported provenance dan memori proyek/keluhan. Empty default-only draft tidak mengalahkan produksi; semua respons ikut histori. Tidak mengubah gate/QC/retry/prompt/render/publikasi atau draft baru owner. Unit, core regresi dan live GPT exact-message243/followup/status PASS; queue tetap. Bukti feedback-1794392944.

## 4.23.15 — 2026-11-11 — ChatGPT

Keputusan owner melalui screenshot: pertanyaan lokasi revisi dan waktu tidak boleh mendapat label status identik. TelegramSkill1.0.2 membedakan status_topic, memberi facts antrean/QC/check count/REVIEW lokal terikat proyek, klarifikasi revisi vs proyek baru, dan jawaban tindakan/waktu tanpa ETA palsu. Routine read-only status tanpa AI; daily budget error eksplisit. Unit/core dan snapshot integration PASS; live GPT ETA PASS, secondcall budgetblocked dan bukti parsial dipertahankan. CapUSD0.10/hari, gate/retry/produksi/publikasi tetap.

## 4.23.16 — 2026-11-11 — ChatGPT

Owner: naskah/storyboard/prompt dari sesiChatGPT diteruskan ke sistem. Addedauthoring-import dan boundedreference-revise, exactprompt/provenance, persistent coordinator di processor existing. Animal/environment/hands-crop terpisah dari humanQC dan prefix; schemahuman_headsvsanimal_count dan kalibrasinyata failclosed; referenceonly menjalankan QCtanpavideo, additionalapprovedrefs dipertahankan saat character-first. Tidakmengubahdefaultfaceless, regenerasiproyeklama, kuotabudget ataupublikasi. Skillrunner1.10.9/core0.22.9. Unit/corePASS, realrefQC/library->maincharacterstagePASS. Finalvideo belumselsai. Detailguide danOPEN_ITEMS.
