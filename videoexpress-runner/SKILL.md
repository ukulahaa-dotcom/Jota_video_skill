---
name: videoexpress-runner
version: 1.10.15
description: Pengetahuan pasti tentang VideoExpress yang dipakai JOTA Runner (apps/videoexpress-runner/runner.mjs). Baca sebelum mengubah Runner atau menulis shots.json. Fitur yang tidak ada di file ini atau di PETA_UI.md wajib dipetakan dulu, tidak boleh ditebak.
---

# VideoExpress untuk JOTA Runner

1.10.15 — cartoon_2d opt-in melalui cartoon-2d.mjs/cartoon-review.mjs, ImageType2d existing terverifikasi, karakter/grouprefs proyek, QC operator aktual terikat otorisasi/hash, batas3/REVIEW, satuworker dan native mute. Mekanisme TESTED; gambar referensi nyata ada, pilot klip/film belum selesai. Baca ../jota-video/references/CARTOON_2D_MAC.md. Default faceless/stickman/object dipertahankan.

Optional delegated object-Mac review may reuse an actual Remotion alpha layer only when exact cards/frame count/resolution props SHA, file SHA, project authorization, assets path and alpha ProRes duration/codec match. Faceless/stickman and default rendering unchanged. TESTED core regression and stale/outside-cache rejection. Camera14 clips complete; two actual continuity failures require video-only repair, source draft is not final visual PASS.

Object operator execution fix 2026-11-12: keep structured registry in shots, compile a concise visual-only prompt without quoted JSON/dialogue before submission and bind actual executed prompt SHA to each job/clip. Explicit VideoExpress dialogue rejection is not a submitted job. Exact private asset selection verifies media ID/name and uses observed More pagination. Defaults faceless/stickman unchanged. Operator/core tests PASS; camera render still in progress, no completed-video claim.

Owner 2026-11-12 explicitly delegated image/video QC for the camera production to ChatGPT. Opt-in object-ASMR Mac operator review requires scoped authorization and actual saved-image hash-bound inspection. Up to one left and one right hand may be inspected. Clip decoder/duration/job/hash checks remain mandatory; visual review is recorded separately, never fabricated as a local-model PASS. No owner QC pause for this authorized project; publication remains locked. Faceless/stickman defaults unchanged. IMPLEMENTED; operator/core regression tests PASS, live rendering not yet proved.

Object ASMR camera pilot 2026-11-12: kalibrasi zero-human-head memperlakukan observasi kepala manusia jelas sebagai blok, termasuk REVIEW akibat count mismatch expected0; bukan PASS konten. Tanpa observasi/uncertain tetap gagal kalibrasi. Kegagalan kalibrasi objek berhenti sebagai infrastruktur sebelum menghabiskan retry visual atau mengantre REVIEW. Tidak mengubah grader faceless/stickman.

Mac authoring-import: lihat skills/jota-video/references/CHATGPT_AUTHORING_MAC.md. Prompt ChatGPT dipertahankan; ref-only tanpa manusia tidak meminta desain manusia, tetapi tetap harus QC dan verifikasi library. Jangan menyatakan ref/scene tersedia dari antrean saja.

Sumber file ini hanya dua: kode Runner yang sudah terbukti di produksi (dengan kode kejadian) dan `PETA_UI.md` hasil pemetaan otomatis. VideoExpress gratis (tanpa token atau kredit); yang dihemat hanya token Claude dan ChatGPT.

## Preset object_asmr_pov — 1.10.10

Adapter object-asmr.mjs dan descriptor terpisah; Image Type memakai nilai existing photorealistic (Cinematic), bukan tombol preset baru. Creative/Enhance/gallery OFF; worker/antrean/sesi Mac tetap satu. Objek/tangan opsional/no wajah/pantulan, SFX ElevenLabs, native mute, kamera statis, hard cut. QC object-asmr-v1 mandiri dengan gate/hash/library dan sampling klip berurutan; tidak memakai aturan kulit/family/stickman. Baca ../jota-video/references/OBJECT_ASMR_PRESET.md. IMPLEMENTED; bukti test/smoke dan batas live di OPEN_ITEMS, belum production-ready.

## Runtime Mac 2026-11-11

Kode 0.22.8: cabang kondisional JOTA_RUNTIME_MODE=mac untuk checkpoint lokal tanpa Git, routing antrean terisolasi, narator default lokal, assembly ffmpeg tanpa editor timeline, serta gate semua uploader Mac. Prompt faceless byte-identik; default cloud tidak berubah. Baca [MAC_RUNTIME.md](../jota-video/references/MAC_RUNTIME.md). Tes komponen lulus; pilot stickman Mac15detik selesai dengan MP4/readback server yang terverifikasi.

## Orkestrator, tiga QC, video review, dan owner gate — owner 2026-11-09

IMPLEMENTED, regression lokal TESTED, kode0.21.1. Detail: `ORCHESTRATOR_REVIEW_20261109.md`. Worker naskah, storyboard, QC, submit, rakit dan Drive mendapat tahap sesuai dependensi; watchdog memeriksa walau antrean awal kosong. `max_attempts:3,on_exhausted:render_review` mengizinkan video review terpisah setelah tiga percobaan yang belum lolos, bukan memberi QC PASS palsu. Source auto:false dan gate tetap. Review memakai aset saved/library/hash sah dan membawa laporan asli ke Drive. Kiriman ambigu atau aset hilang tetap masalah teknis. Setelah Drive ACK, owner memeriksa; `/setuju-posting` dari pemilik mengizinkan platform dan hash video persis. Tidak ada approval otomatis akibat retry habis. Poster memverifikasi hash arsip sama; gagal parsial perlu rekonsiliasi, bukan retry semua platform. Unit test bukan bukti MP4 nyata. Baca bukti run sebelum klaim selesai.

## Close-up dan putaran 360° — keputusan owner 2026-11-09

Close-up termasuk wajah, gerak mendekat, putaran tokoh dan orbit kamera 360° diperbolehkan mengikuti storyboard. Larangan teks lama, orbit hanya depan-ke-belakang, serta konversi otomatis putaran menjadi First Frame, Last Frame dicabut. First Frame, Last Frame tetap tersedia bila diminta eksplisit. TESTED regression validator/generator lokal dan [Actions 42630262637](https://github.com/ohan78/Jota_runner/actions/runs/42630262637), source 908e5ab, mode verifikasi saja; tidak mengklaim uji render baru. Run awal 42630039440 berhenti di checkout ref SHA pendek, sebelum tes kode; pengulangan memakai SHA penuh berhasil. QC hasil asli tetap wajib, satu fitur mata/hidung/mulut tetap menolak gambar; gate tetap berlaku; persetujuan kini mengikuti kebijakan otomatis atau manual yang dipilih.


## Persiapan dan kelanjutan workflow (2026-11-09)

Owner meminta workflow membantu agen bekerja aktif. `siapkan` memvalidasi/build draft tanpa menuntut QC gambar sudah lolos. `uji-gambar` mengantre persiapan lalu satu tahap gambar secara eksplisit, dengan jeda login tetap dijaga. auto:false dan gate tidak diubah; tidak ada kelanjutan otomatis ke video. Status perintah baru mengikat run ID dan menyimpan tindakan berikutnya. Selama sesi aktif, Claude/ChatGPT mengikuti hasil sampai terminal dan memperbaiki penyebab, tidak berhenti pada dispatch. Workflow tidak membangunkan sesi chat yang sudah berakhir atau merevisi prompt lewat API berbayar. Detail dan batas bukti: `skills/videoexpress-runner/WORKFLOW_AKTIF_20261109.md`.


## Penomoran versi (2026-11-08)

Skill Runner **1.6.0** mengatur aplikasi Runner **0.17.0** (package.json) yang memakai prompt **V3.1.0** untuk proyek draft berorang; Skill JOTA **4.19.0**. Manifest di gpt/VERSI-JOTA.json. Rangkaian pengujian legacy dan V3 harus lulus sebelum produksi. Migrasi draft V3 melalui apps/videoexpress-runner/migrasi-pending-v3.mjs; 21 proyek/124 shot dan 0 error validator. Gate gambar pada 20 proyek tetap dipertahankan. 110 prompt melebihi panjang yang sebelumnya diuji (4.745 karakter), perlu tes UI. Versi format pada setiap shots.json tersimpan sebagai prompt_version dan pada setiap shot faceless sebagai format=faceless_v3. Gambar di balik kacamata wajib kosong jika karakter memang berkacamata; karakter tanpa kacamata tidak mendapat instruksi kacamata. Migrasi tidak merender/mempublikasikan.

## Aturan utama: dilarang menebak
1. Sebelum memakai tombol, alat, atau pengaturan yang tidak tercatat di sini atau di [`PETA_UI.md`](PETA_UI.md), jalankan pemetaan: dispatch `jota-runner-uji` dengan `mode=peta`. Workflow ini hanya membaca (tidak mengklik Create, Import, Save, atau Export) lalu menulis ulang `PETA_UI.md` di repo, plus screenshot tiap alat di artefak `uji-github`.
2. Kalau perilaku belum pasti setelah peta, uji satu hal kecil dulu (`mode=ui`, `ff`, `narasi`, atau `shot`), catat hasilnya di sini dengan kode kejadian, baru dipakai di produksi.
3. Nama tombol, label, dan selector di bawah ditulis persis seperti di layar. Jangan diterjemahkan.
4. Setiap kegagalan baru di Runner: tambahkan baris di bagian "Pelajaran" dengan kode proyek dan penyebabnya.

## Alat yang ada di akun (peta 2026-11-04, detail kontrol di PETA_UI.md)
| Alat | Status untuk JOTA |
| --- | --- |
| Create Video From Prompt | Dipakai (jalur utama Runner) |
| First Frame, Last Frame | Didukung Runner (`tool: first_last`); punya `First Frame from Library (beta)` dan `Last Frame from Library (beta)` |
| Smart Edit | Belum dipakai. Prompt edit + Reference Photo 1 dan 2 + `Save Image`: calon cara membuat ulang gambar acuan tokoh (misalnya menambah kacamata) |
| Text To Video | Jangan dipakai: tokoh bicara di klip (Actor Script), memancing wajah dan mulut |
| Lipsync Video (Old Algorithm) | Jangan dipakai: lipsync bertentangan dengan faceless |
| Image To Video (Old Algorithm), Stylize Character, Inpainting | Belum dipetakan isinya (perlu pilih gambar dulu) |
| Outpainting, AI Sound Maker | Tidak tersedia di paket akun (muncul layar `Upgrade`) |
| Editor: Text to Speech, Text Animations, Filters, Fast Cut, Automatic Captions, Audio Cutter, Import Media | Tidak dipakai; JOTA merakit, memberi subtitle, dan menarasikan di luar VideoExpress |

Catatan label: di dialog Create Video From Prompt textarea kedua berlabel `Video and Audio Prompt`; Image Type ada di `select[name=select-type]` (Human, 2D, 3D, Photorealistic (Cinematic), Other).

## IMAGE V6.0.0 — 2026-11-08 (AKTIF)

Owner mendemonstrasikan gambar faceless yang sesuai dengan prompt sederhana. Instruksi pertama wajib "KEEP FACELESS FOR ALL CHARACTERS." Semua wajah mulus tanpa mata/hidung/mulut. Kamera **sesuai storyboard**; larangan sebelumnya "rear only" dicabut. SHOT04 front three-quarter sesuai contoh owner. Enhance image prompt OFF (periksa checkbox sungguhan sebelum Create; run V5 mencatat Enhance OFF), Creative OFF, gallery OFF. Gunakan tag baru AMPIS6 dan folder image-v6; sumber ref lama tidak berlaku setelah library dihapus. Tanpa referensi, Save Image untuk satu gambar berada di toolbar modal, di luar slide (peta read-only 42572311547). Preview belum tersimpan sampai respons Save dan pembacaan ulang library terverifikasi. Video tetap QC-gated. Prompt video tetap V4.0.0, ElevenLabs untuk seluruh suara karakter.

## IMAGE-GEN V5.0.0 / RUNNER v0.18.2 — 2026-11-08

Pengguna menghapus seluruh gambar di VideoExpress, sehingga semua nama My AI Images / Reference Photo lama TIDAK boleh dianggap ada. Jalur gambar baru memakai ID/tag/folder baru; prompt V5 mengunci gambar sebagai wajah kosong tanpa mata, hidung, mulut, dan memilih sudut rear_only untuk adegan rawan. Insiden historis: Runner hanya mencari Save Image di dalam slide sehingga menganggap hasil tanpa reference sebagai preview-only. Peta 42572311547 menunjukkan kontrol modal di luar slide; lihat bagian Save Image di bawah. Untuk `image_preview_only:true`, simpan preview PNG ke repo dan `awal/image-stage.json` bertanda PREVIEW_ONLY, can_use_from_library=false, owner_approved=false. Ini bukan gambar siap dipakai Video Runner. Gate gambar tetap menahan render. Jangan menandai QC PASS hanya karena GitHub Actions success. Tidak boleh memakai media yang telah dihapus. Prompt video tetap V4.0.0; audio hanya ElevenLabs.

## AUDIT KOREKSI GAMBAR V4.0.0 — 2026-11-08 (Runner Skill 1.7.1, kode 0.18.1)

- Image-generator workflow sukses bukan berarti gambar lolos QC, sudah disetujui, atau klip video ada.
- Gambar pratinjau VideoExpress tanpa tombol Save Image **tidak** boleh dianggap kandidat library dan sekarang menghentikan cmdGambar dengan status error, meski file PNG telah diunduh.
- KRITIS: generator dari-brief.mjs harus meneruskan gate:gambar dari brief walau auto=true. Jangan sampai workflow buat melepas pengaman.
- Pilot gambar Uwais dan dua tokoh: gunakan karakter Uwais_soleh lama (tanpa kacamata, tetap wajib QC wajah), prompt menekankan usia remaja serta permukaan wajah polos. Simpan sebagai pilot, jangan otomatis memproduksi video dari pilot.
- Temuan nyata 20 gambar awal AMPV4: beberapa berwajah lengkap, beberapa objek salah, dua preview saja; 0 yang sudah disetujui. Jangan tandai lulus tanpa membuka gambar.
- Sumber versi utama: Skill JOTA 4.20.2, Runner Skill 1.7.1, kode Runner 0.18.1, prompt video V4.0.0.

## ATURAN AKTIF V4 2026-11-08 (menggantikan V3 di bawah)

Runner aplikasi 0.18.0, Skill JOTA 4.20.0, Runner Skill 1.7.0, Prompt 4.0.0. Format faceless_v4 wajib pengunci muka dalam setiap rentang timeline, bukan block title. TIDAK ADA teks dialog/narasi dalam video_prompt, TIDAK ADA native speech. ElevenLabs tunggal untuk suara semua tokoh, narator, ambience dan foley. Secara default audio_policy=elevenlabs_only, suara_klip=false. ffmpeg saat rakitLokal membuang audio asli VideoExpress (sumber musik). Opsi VX SFX perlu vx_sfx_approved=true setelah pemeriksaan sumber tanpa musik dan suara manusia.

Kostum/aksesori harus sesuai approved image. Untuk AMPLOP: Uwais tidak berkacamata, jangan gunakan Uwais_kacamata, dipakai override no-glasses per project. LAST_FRAME tersambung hanya jika cast, tempat, waktu, props, pose kontinu. Klip BARU bila flashback atau ganti cast. Cek frame asli sebelum render. Semua produksi tetap STOP sampai owner memberi perintah; hasil V4 baru teruji validator Node, belum teruji video live.

## Aturan aktif VideoExpress — JOTA V3 (keputusan owner 2026-11-08)

**Klip baru berorang wajib prompt `format: faceless_v3`** sebagaimana `skills/jota-video/references/PROMPT_FACELESS_V3.1.0.md`. Benchmark manual owner berhasil: wajah tetap polos tanpa mata atau mulut saat voice-over, kacamata, lompatan dan putaran 360 derajat (10 detik).

- **Image Type 3D**, **Use Creative mode OFF**, **Automatically enhance my image/video prompt OFF**, galeri publik OFF; durasi 3–10 detik, 9:16.
- Urutan Video Prompt: CAMERA DETAILS, KEEP FACELESS ENTIRE VIDEO, CRITICAL GLASSES RULE, FIRST FRAME FACE LOCK, SPEECH FACE LOCK, CHARACTER AND ENVIRONMENT, STYLE AND COLOR LOGIC, AUDIO, TIMELINE per detik dengan SFX, FINAL FACELESS LOCK. Nama dan wajah harus konsisten dengan foto faceless asli sejak 0:00, termasuk kulit polos di balik lensa.
- Ucapan berupa **external voice-over tanpa lip-sync**; audio dihasilkan ElevenLabs pada saat rakit. Setelah tiap ucapan, pengunci zero eyes/zero mouth diulang. End-lock sampai frame terakhir.
- `dari-brief.mjs` menghasilkan V3 untuk klip kartu dengan manusia; `runner.mjs` memvalidasi V3 dan mematikan Enhance secara default, kompatibel dengan shots lama `format: natural`. `test.mjs` telah ditambah tes regresi V3; **pelaksanaan tes Node dan uji UI Runner belum terverifikasi**.
- UI `Create Video From Prompt` menyediakan `select[name=select-type]` (Human, 2D, 3D, Photorealistic, Other), Advance Mode 3–10 detik dan Video Only. VideoExpress menyimpan klip 50 hari; arsip JOTA di Google Drive. Jangan klik Share.
- Prompt lama NATURAL satu paragraf tanpa timestamp adalah arsip kompatibilitas saja, **bukan standar produksi baru berorang**. Untuk shot tangan saja dan tanpa orang, pertahankan perlindungan khusus, tidak memaksa munculnya wajah.
- First Frame, Last Frame harus memakai frame faceless yang memang sudah tidak memiliki mata, terutama saat gerak berbalik. Jika klip lebih dari 10 detik, pecah per shot agar gerakan realistis. Gambar asli produk/referensi yang sah dipakai untuk realisme bila tersedia.

## Adapter prompt dan batas UI

`apps/videoexpress-runner/dari-brief.mjs` mempersiapkan `shots.json`; `runner.mjs` memakai `format: faceless_v3` untuk validasi prompt kamera, faceless 0:00, voice-over, timeline dan SFX. Batas textarea aktual belum diketahui; panjang 4.745 karakter pernah terbukti, dan `verifyBeforeCreate` harus menolak prompt terpotong. Jangan mengklaim V3 sudah lolos otomatis di VideoExpress sebelum uji live.

## Status terhadap jota-video v3.97 dan v3.98 (audit 2026-11-05)
Dibedakan: **spesifikasi** (tertulis di skill), **terimplementasi** (ada kodenya), **teruji** (ada tes atau klip nyata), **siap produksi**.
| Fitur v3.97/v3.98 | Status di Runner |
| --- | --- |
| Prompt NATURAL panjang tanpa batas 1.500 | Terimplementasi dan teruji tanpa browser (`test.mjs`); panjang di atas 4.745 belum teruji di UI |
| Kunci faceless, baju, tata ruang di awal prompt NATURAL | Terimplementasi di `dari-brief.mjs`, diperingatkan `plan`; belum diuji di klip nyata |
| Membaca Google Sheet (`STORYBOARD`, `RUNNER_MANIFEST`) | `IMPLEMENTED` v3.99.4, satu arah repo ke Sheet plus persetujuan owner dari `IMAGE_QC` (`sheet-sync.mjs`, Apps Script `drive-upload.gs`). Runner tetap membaca `shots.json`; Sheet bukan sumber prompt |
| Ref1 tokoh+baju dan Ref2 denah ruangan | `IMPLEMENTED` (v3.99): brief `ref_ruang` menjadi `refs[1]` dengan `peran: "ruang"` di klip BARU satu tokoh; `uploadRefs` memasangnya di `Reference Photo 2`. Dua tokoh tetap memakai kedua slot untuk tokoh. Perilaku VideoExpress dengan gambar ruangan di slot 2 belum diuji Runner (owner pernah memakainya manual, v3.90) |
| Dua kandidat gambar A/B + QC multimodal + persetujuan owner | `TESTED` tanpa browser (v3.99): `gambar` menyimpan dua kandidat, `qc-siap` membuat `awal/qc.json`, agen multimodal mengisi cek dan pilihan, owner menyetujui, `pasang-gambar` memasang `PAKAI_ULANG`, `plan`/`run` menolak yang belum lolos kalau `"gate": "gambar"` (`gate.mjs`, sha256 file). Pemeriksaan visualnya dikerjakan agen di chat, bukan panggilan API otomatis |
| Identitas aset (Media ID, anti tertukar antar job) | Sebagian: label unik `TAG-SHOTxx` dan nama frame `-END-v1`; gambar library masih dicari lewat nama folder dan label |
| Voice lock dari `VOICE_MASTER` | Sheet belum terhubung. Di kode (v3.98.2, `TESTED` tanpa API): `narasi-tokoh.mjs` memakai `voice_id` di `characters/suara.json` kalau ada; tanpa itu nama harus cocok persis (`suara-lock.mjs`), kalau tidak produksi berhenti dengan error. Semua nama di `suara.json` dicek cocok persis dengan akun lewat `jota-daftar-suara` 2026-11-05 |
| Sound effect per baris `AUDIO_CUES` | Belum ada. Yang ada: `suara_latar` per shot dan `foley` (maks 3) dari brief lewat ElevenLabs Sound Effects |
| Remotion overlay per shot, kartu hadis RTL | Belum ada. Gate hadis yang ada hanya `[HADIS]` di `cek-brief.mjs` (nomor wajib di `sources`) |
| Gate persetujuan yang ditegakkan kode | Gate gambar ada (`gate.mjs`, opt-in `"gate": "gambar"`). Gate audio, teks, dan hadis belum. Formula Sheet tetap hanya alat bantu |

## Akses dan sesi
- URL: `https://app.videoexpress.ai/`. Tanda sudah login: teks `Create with AI` terlihat.
- Di GitHub Actions (`JOTA_CI=1`): sesi dari secret `VX_SESSION`; kalau gagal, login dengan `VX_EMAIL` dan `VX_PASSWORD` (maksimal 3 kali), lalu sesi disimpan ke `JOTA_SESSION_FILE`.

## Membuat klip: dialog "Create Video From Prompt"
- Buka panel kanan dengan `a.button-generate-video` (`Create with AI`). Tombol ini toggle: klik hanya kalau kartu `Create Video From Prompt` (h3) belum terlihat. Lalu klik tombol panah di kartu itu.
- Dialog siap kalau ada textarea dan teks `Image Prompt`. Textarea #0 = Image Prompt, #1 = Video Prompt. Isi lewat setter nilai lalu event `input` dan `change`.
- Rasio: tombol `Vertical 9:16` atau `Landscape 16:9`. Yang aktif berwarna ungu `rgb(118, 86, 227)`.
- Image Type: `select` yang punya opsi bernilai `2d` (nilai lain dari shots.json `image_type`).
- Centang (dicari dari awal teks label):
  - `Use Creative mode`: OFF
  - `Automatically enhance my image prompt` dan `Automatically enhance my video prompt`: ON (v3.92); OFF hanya kalau `"enhance": false`
  - `Use Consistent Character`: ON hanya saat Create Image dengan acuan; OFF sebelum Create Video
  - `Lipsync HD Video`: OFF
  - `Narration Video`: ON hanya kalau narasi dibuat VideoExpress (`vxNarr`); JOTA memakai ElevenLabs, jadi biasanya OFF
  - `Share this in the public gallery`: selalu OFF, tanpa pengecualian
  - `Advanced Mode`: ON, lalu `Manual Video Length`: ON
  - `Video Only (No Sound)`: OFF
- Durasi: slider `input[type=range]` terakhir yang terlihat, digeser dengan mouse sampai nilainya tepat (`length`, JOTA 10 detik).
- Cek sebelum Create (`verifyBeforeCreate`): gallery OFF, enhance sesuai `enhOn`, Image Type, rasio, durasi, dan panjang prompt sama persis (prompt tidak terpotong). Kalau ada yang salah, Runner tidak mengklik Create. Cek panjang inilah pengaman batas textarea: Runner tidak memotong prompt sendiri.

## Gambar awal dan acuan tokoh
- `Use Consistent Character` ON memunculkan disclaimer; tutup dengan `I Agree`.
- Tombol `Reference Photo` dan `Reference Photo 2` (maksimal 2 tokoh berfoto acuan per shot) membuka dialog `Select Image` dari Media Library, bukan unggah file. Acuan ditulis `{ "library": "<folder>", "name": "<nama gambar>" }`; folder serial: `Serial Uwais youtube`.
- Di `Select Image`: tingkat atas berisi folder (Audio, Default, Images, My AI Images, folder buatan owner). Folder dibuka dengan satu klik (dua klik menutup dialog). Tombol `button.button-back` kembali ke daftar folder. Gambar dipilih dengan klik sekitar 60 px di atas labelnya, lalu `Choose`.
- `Create Image` menambah slide di carousel (`.swiper-slide img` atau `.swiper-slide-pair-item img`), tunggu maksimal 3 menit. Dengan Consistent Character hasilnya sepasang gambar.
- Gambar harus dipilih di carousel sampai tombol `Create Video` aktif (tidak disabled, opacity > 0,9). Carousel menumpuk gambar shot sebelumnya: geser ke slide terakhir (`.swiper-button-next`), gulir ke tengah layar, lalu klik gambar yang benar-benar terlihat, terbaru dulu (BICARA2, UWAIS02).
- Sebelum Create Video: kosongkan acuan (`button.button-select-image-clear`, "Clear selection") dan matikan Consistent Character. Kalau acuan masih terpasang, Create Video tidak membuat job (UJIAC1, UJIAC2, ASHAR1).
- Batas foto acuan: dua tokoh sebaya dan sesama jenis kelamin sering tertukar; dua acuan dengan pose berbeda bisa bertukar peran (lihat super QC `[TOKOH]`).

## Save Image dan bukti library (1.7.4, Claude dan ChatGPT)

Status `TESTED` untuk **satu gambar tanpa reference**: generate/Save run 42573918068, lalu recovery/reload/Choose dari My AI Images run 42575475145 SUCCESS, kode c1edfa8, mediaId 48060154, nama SVIMG09-SHOT04-AWAL-1. File JPEG preview/library berbeda byte tetapi ukuran sama 1088×1920 dan RGB RMSE 0.00571886 (<0.02); kedua gambar serta screenshot dibuka dan dibandingkan. Bukti tersimpan di folder uji dan laporan audit. QC owner tetap PENDING; tidak ada video. Root cause SHOT04 run 42546871975: selector lama dibatasi slide, sedangkan satu gambar memakai `button.button-save-image` pada `.image-slider-buttons` di modal. PR #18 masih membatasi pencarian di slide dan klasifikasi preview-nya masih bergantung pada class di slide, sehingga belum menuntaskan masalah.

Runner 0.18.4 memetakan kontrol modal untuk gambar tunggal dan kontrol per-item untuk pasangan. Tunggu respons POST Save UI, wajib `isShared=0`, UUID dan mediaId positif. Baca My AI Images memakai mediaId respons, periksa rename, unduh dan catat SHA-256 kedua file; cocokkan isi pixel hasil decode (rasio ±0,5%, RGB RMSE maksimal 0,02 pada 128×128) karena file preview dan library dapat berbeda encoding. Ini pemeriksaan identitas aset, bukan kelulusan QC visual. Reload halaman lalu buka `Use from Library` → `My AI Images` → nama persis → `Choose`; screenshot dan `awal/library-evidence.json` menjadi bukti. Klik Save atau workflow success saja bukan bukti selesai.

`idGambarBaru()` mengambil snapshot; `idGambarBaru(0)` mencari aset setelah batas 0, termasuk library kosong. Aset dari job lain tidak boleh menggantikan mediaId respons. `*-save-receipts.json` menyimpan hasil Save agar retrieval gagal tidak memicu generate ulang; journal parsial berhenti untuk inspeksi. Kandidat lama tanpa bukti atau berubah hash/prompt ditahan, bukan dilewati diam-diam. Tidak ada retry otomatis setelah SAVE_FAILED. `auto:false`, gate gambar, dan QC pending tidak berubah oleh keberhasilan save.

Regression: `node apps/videoexpress-runner/test.mjs` dan `node apps/videoexpress-runner/test-image-save.mjs` (Chromium), lulus lokal dan CI run 42575475145. Workflow gambar menjalankan keduanya sebelum generate; `jota-save-image-uji.yml` menyediakan uji terisolasi dengan source_ref dan jeda login. Mode pasangan hanya diuji fixture DOM, belum live ulang. Test DOM bukan bukti live VideoExpress. Laporan terperinci: `SAVE_IMAGE_AUDIT_20261109.md`.

## Pemeriksa faceless lokal tanpa API (1.7.5)

Status `TESTED` pada fixture gambar existing: run GitHub Actions 42591704690 SUCCESS, 4 kandidat/3 gambar unik. A berwajah ditolak, B faceless dipilih, pasangan keduanya berwajah ditolak termasuk kasus satu tokoh polos/satu berwajah. Owner QC tetap PENDING. Bukti ada di folder JOTA-M1-LOCAL-FACE-QC-TEST-20261109 dan artifact 13661612286. Model OpenCV/CLIP/SmolVLM dan percobaan Qwen 2B belum memenuhi benchmark, sehingga tidak boleh dipakai sebagai pemberi kelulusan otomatis. Model kandidat berikutnya: Qwen3-VL-4B-Instruct Q4_K_M dengan llama.cpp CPU b12211, bobot dan runtime dipin SHA-256 oleh `setup-local-face-screen.py`. Tidak ada API key, panggilan model cloud, atau token API berbayar. Ini tetap memakai waktu CPU/RAM Runner.

`node local-face-screen.mjs <shots.json> <model-directory>` memeriksa setiap kandidat yang tercatat pada `awal/kandidat.json`. `expected_heads` wajib diketahui agar gambar berorang bisa lolos. Satu fitur wajah terlihat pada satu tokoh = REJECT seluruh kandidat; kepala tersembunyi/kabur, model gagal/timeout, jawaban rusak atau jumlah kepala tidak cocok = REVIEW. Hanya semua permukaan wajah yang dilaporkan blank dengan hitungan sesuai yang menjadi PASS_LOCAL. Pilihan A/B dan laporan per tokoh tersimpan di `local-face-screen.json`/`local-face-feedback.md`. Kedua kandidat REJECT = ALL_REJECTED dan usulan REGEN; tidak ada regenerate atau perubahan prompt otomatis.

Brief baru membawa `local_face_screen:{enabled:true,required:true}` dan jumlah kepala dari cast; figuran tanpa hitungan eksplisit tetap REVIEW. Proyek lama memerlukan metadata ini sebelum memilih otomatis. Kriteria faceless boleh diisi oleh model lokal; seluruh kriteria lain serta owner tetap PENDING. `gate.mjs` menolak hasil lokal hilang/stale/ditolak sebelum memakai ulang gambar. File/gambar/jumlah kepala berubah berarti harus diperiksa ulang.

Pengujian khusus hanya membaca gambar JOTA yang sudah ada, tanpa login VideoExpress atau generate/render/publish. Pemeriksaan klip belum diaktifkan oleh fitur ini. Detail: `LOCAL_FACE_SCREEN_20261109.md`.

## Mengirim video
- `Create Video` diklik setelah tombolnya aktif. Kalau belum ada ID job dan belum muncul `Your video will appear`, klik diulang maksimal 3 kali (BICARA1). ID job dibaca dari teks `Video: <uuid>`.
- Kalau ID tidak terbaca setelah klik, jangan dianggap gagal (bisa menjadi job ganda); `finish` memastikan klipnya muncul.
- Video Prompt diawali label unik `TAG-SHOTxx:` (`-R2`, `-R3` untuk kiriman ulang). Label ini yang dicari di My AI Videos.
- Maksimal 5 job berjalan bersamaan (`MAX_PARALLEL`); tunggu render maksimal 25 menit per klip.

## Narasi bawaan VideoExpress (jarang dipakai JOTA)
- Muncul setelah Create Video kalau `Narration Video` ON: `select[name=speech_language]` (label `Indonesian (Indonesia)`), tombol suara `button.dropdown-toggle` berisi `span.text-ellipsis`, `textarea[name=text]`, `Import Speech`, lalu `Create Narration Video`.
- Suara Indonesia yang ada: Ardi, Arif, Eduardo, Fadhlan, Gadis, Indah, Irene, Mertie, Osbaldo, Samantha. Koharudin tidak ada di sini (clone Koharudin ada di ElevenLabs).

## Alat "First Frame, Last Frame"
- **2026-11-22 TEROBOSAN:** pakai mode LIBRARY (photo 1 -> photo 2), lihat [FIRST_LAST_LIBRARY.md](FIRST_LAST_LIBRARY.md). Mode dialog ditolak karena menghasilkan wajah realistis.
- Kartu h3 `First Frame, Last Frame` di Create with AI. Textarea #0 First Frame Prompt, #1 Last Frame Prompt, #2 Video Prompt. Tombol `Create First Image`, `Create Last Image`, `Create Video`.
- Gambar awal dan gambar akhir wajib dua-duanya ("Please select images for the first and last frames", UJIFF1). Opsi `Reference Photo Type: <jenis>` di select pertama.

## Dua mekanisme frame (jangan disamakan)
1. **LAST_FRAME (sambung):** klik kanan klip > `Save Last Frame` (nama `<label>-END-v1`), lalu shot berikutnya memilih gambar itu lewat `Use from Library` di Create Video From Prompt. Dipakai untuk lokasi, waktu, dan aksi yang bersambung (`"sambung": true` di brief).
2. **Alat First Frame, Last Frame:** satu klip dengan gambar awal dan gambar akhir yang dibuat di dialog alat itu (`tool: first_last`), untuk mengarahkan perubahan di dalam satu klip. Bukan cara menyambung antar shot.

## Media Library dan sambung frame
- Panel dibuka lewat menu samping `Media Library` (toggle). Klip ada di folder `My AI Videos` (buka dengan klik dua kali; judul panel `.library-panel-category-title`). Daftar terbaru di atas, klip lama perlu digulir.
- Klik kanan kartu klip: `Save Last Frame` (dialog dengan input Title dan `button.button-submit`) dan `Add to Timeline`.
- Frame tersimpan di `My AI Images` dengan nama `<label>-END-v1`. Kotak pencarian di Select Image mencari isi prompt, bukan judul, jadi jangan dipakai; tunggu gambar muncul di atas daftar.
- URL file klip: dari thumbnail `.../thumbnail/<id>_small.jpg` menjadi `.../video/<id>.mp4`.

## Timeline dan export VideoExpress (jalur perakitan utama `finish`, owner 2026-11-01 21:34; Final Cut hanya kalau `"final": "finalcut"`)
- Proyek baru: `a.button-new-project`; timeline kosong kalau tidak ada `.brick`.
- Export: `button.button-render-project`, isi `input[name=name]`, `select[name=quality]=high`, `select[name=size]=1080`, `select[name=format]=mp4`, lalu `Create`. Hasil di `button.button-open-movies` (My Videos), link unduh berisi `download`.

## Perintah Runner
`login`, `plan`, `run <shots.json> [--only SHOT01]`, `finish` (juga menyimpan frame `save_last_frame` yang belum tersimpan), `ref`, `gambar`, `qc-siap`, `pasang-gambar` (dua terakhir tanpa browser), `fix <label> "<jenis>"`, `jaga`, `auto`, `doctor`, `voices`, `voice-test`, `notify-test`, serta uji: `uji-login`, `uji-ui`, `uji-ff`, `uji-narasi`, `uji-peta`. Di GitHub: `jota-runner-uji` dengan `mode` = `login`, `ui`, `ff`, `narasi`, `peta`, `fix` (isi `label` dan `jenis`), atau `shot`.

## Pelajaran (kode kejadian)
- PLRUANG1 (2026-11-05, diagnosis historis dikoreksi 2026-11-09): Runner menganggap Create Image **tanpa** Consistent Character menghasilkan satu gambar pratinjau (`user-assets.renderplatform.com/preview/<uuid>.jpg`) tanpa tombol Save Image di dalam slide, dan belum menyimpannya di My AI Images. Kontrol satu gambar berada di toolbar modal (peta 42572311547), sehingga ketiadaan tombol di slide tidak membuktikan ketiadaan Save. Mode `gambar` kini mengunduhnya ke `awal/<SHOT>-1.png` dan `awal/pratinjau.json` untuk dicek saja. Gambar tanpa orang (master ruangan Ref2) masuk library lewat klip pendek + `save_last_frame`; `finish` menyimpan frame shot `save_last_frame` yang bukan sumber LAST_FRAME dan menyalin frame akhir ke `awal/<SHOT>-END.png` (di-commit `jota-produksi`).
- PLUMAIR1 (2026-11-05): gambar ruangan di `Reference Photo 2` (`ref_ruang`, folder `My AI Images`) terbukti dipakai: tata ruang kandidat sama dengan master. Gate `qc.json` menahan sampai owner setuju.
- PLUMAIR1: Umair botak di tengah SHOT04 walau gambar awal berambut, lalu botaknya terbawa lewat LAST_FRAME. Prompt NATURAL wajib kunci rambut (`rambut` di `tokoh.json`, jota-video v3.99.2).
- PLUMAIR1: `Folder My AI Videos tidak ditemukan/tidak terbuka` sesekali di CI dan menghentikan rantai LAST_FRAME. `openMyAIVideos` kini mencoba sampai 3 kali sambil menutup dan membuka panel Media Library.
- PLUMAIR1 revisi 2: klip `PLUMAIR1-SHOT04-R2` tidak pernah ditemukan di My AI Videos selama 25 menit (penyebab belum diketahui). Yang berhasil: kirim ulang semua shot dengan `tag` baru (PLUMAIR2); gambar `PAKAI_ULANG` yang disetujui tetap dipakai. Agen tidak menunggu sampai batas: kalau klip revisi tidak muncul dalam sekitar 10 menit setelah terkirim, hentikan run dan laporkan ke owner.
- `JOTA_SUDAH_TERKIRIM` menerima `SHOTxx@n` untuk shot revisi yang sudah terkirim sebagai percobaan n (label `-Rn`).
- Slider durasi kadang terbaca salah di percobaan pertama ("Durasi tidak bisa diatur ke 9, terbaca 5"); pengulangan otomatis run berhasil.
- UJIAC1, UJIAC2, ASHAR1: Consistent Character atau acuan masih ON saat Create Video, sehingga job tidak terbuat.
- BICARA1: klik pertama Create Video di CI tidak membuat job, jadi klik diulang.
- BICARA2, UWAIS02 SHOT02: gambar di carousel tidak terpilih (milik shot sebelumnya atau tergulir keluar layar), sehingga Create Video pudar.
- UJIFF1: First Frame, Last Frame wajib gambar akhir.
- ADMK01: finish membuka browser tanpa sesi, jadi login ulang di CI.

## Preset stickman — 1.10.5

Lihat `../jota-video/references/TWO_PRESETS.md`. Instruksi kulit/3D/keluarga di atas hanya adapter faceless. Stickman memakai opsi aktual `2d`, template/profil QC sendiri, karakter sebelum scene; slot, login, Save/readback, gate, audio, assembly dan Drive tetap bersama. IMPLEMENTED + TESTED lokal; pilot live belum selesai. Tidak mengubah auto/gate/proyek faceless existing.
