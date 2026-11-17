---
name: jota-video
description: Produksi video JOTA (kisah dan edukasi Islami faceless untuk anak dan keluarga) dari ide sampai MP4 di Google Drive, YouTube private, dan draft Facebook. Semua klip bergerak dibuat di VideoExpress 3.5 oleh Runner lokal di Mac (references/MAC_RUNTIME.md; sumber skill GitHub ukulahaa-dotcom/Jota_video_skill) dengan prompt wajib FACELESS V4.0.0 bertimeline, tanpa voice native, QC per shot dan jalur video review sesudah maksimal tiga percobaan. Storyboard diisi otomatis; owner memeriksa MP4 sebelum posting. Tanpa musik, tanpa wajah.
version: 4.23.26
---

# JOTA Video Production v4

4.23.24 — Owner 2026-11-17: akun GitHub lama mati; tidak ada kaitan lagi dengannya. Satu-satunya GitHub JOTA adalah `ukulahaa-dotcom`, sumber skill `ukulahaa-dotcom/Jota_video_skill`. GitHub Actions tidak dipakai; produksi di Mac (MAC_RUNTIME.md).

4.23.23 — Owner 2026-11-17: opsi Mac `pasca_mac` (RIFE per klip dan Foley lokal Hunyuan untuk suara latar, dengan ducking) di [MAC_RUNTIME.md](references/MAC_RUNTIME.md). Default audio ElevenLabs, native dimute, dan tanpa musik tidak berubah.

4.23.22 — Owner2026-11-13 meminta film Lentera180detik sampaiDrive. cartoon_2d memakai runtime Mac bersama, acuan karakter sendiri, inspeksi ChatGPT terikat bukti, audio terukur/cache khusus2D dan overlayRemotion rentang pendek. Regresi core byte-identical faceless dan tes adapter PASS; pilot masih berjalan. Tidak ada posting.

Optional delegated object-Mac review may reuse an actual Remotion alpha layer only when exact cards/frame count/resolution props SHA, file SHA, project authorization, assets path and alpha ProRes duration/codec match. Faceless/stickman and default rendering unchanged. TESTED core regression and stale/outside-cache rejection. Camera14 clips complete; two actual continuity failures require video-only repair, source draft is not final visual PASS.

Object operator execution fix 2026-11-12: keep structured registry in shots, compile a concise visual-only prompt without quoted JSON/dialogue before submission and bind actual executed prompt SHA to each job/clip. Explicit VideoExpress dialogue rejection is not a submitted job. Exact private asset selection verifies media ID/name and uses observed More pagination. Defaults faceless/stickman unchanged. Operator/core tests PASS; camera render still in progress, no completed-video claim.

Owner 2026-11-12 explicitly delegated image/video QC for the camera production to ChatGPT. Opt-in object-ASMR Mac operator review requires scoped authorization and actual saved-image hash-bound inspection. Up to one left and one right hand may be inspected. Clip decoder/duration/job/hash checks remain mandatory; visual review is recorded separately, never fabricated as a local-model PASS. No owner QC pause for this authorized project; publication remains locked. Faceless/stickman defaults unchanged. IMPLEMENTED; operator/core regression tests PASS, live rendering not yet proved.

Object ASMR camera pilot 2026-11-12: kalibrasi zero-human-head memperlakukan observasi kepala manusia jelas sebagai blok, termasuk REVIEW akibat count mismatch expected0; bukan PASS konten. Tanpa observasi/uncertain tetap gagal kalibrasi. Kegagalan kalibrasi objek berhenti sebagai infrastruktur sebelum menghabiskan retry visual atau mengantre REVIEW. Tidak mengubah grader faceless/stickman.

**v4.0.0 (2026-11-05, owner 22:31: "rombak total, sesuai tutorial VideoExpress 3.5 dan NATURAL, mengacu hasil trial saya yang smooth, buang yang bertentangan").** File ini satu-satunya aturan yang berlaku. Versi lama ada di `archive/SKILL_v3.100.1.md` dan **bukan instruksi**. Kalau referensi lain di repo bertentangan dengan file ini, file ini yang menang; referensi lain hanya dipakai untuk bagian yang disebut di peta referensi (bagian 10).

Tiga sumber kebenaran, urutan menang kalau bertentangan:
1. **Keputusan owner yang tercatat dengan tanggal** (file ini dan `CHANGELOG.md`).
2. **Uji smooth owner** ([`references/BENCHMARK_OWNER_SMOOTH_20261104.md`](references/BENCHMARK_OWNER_SMOOTH_20261104.md)): 19 klip owner, faceless bertahan, kamera halus.
3. **Tutorial resmi VideoExpress 3.5** ([`../videoexpress-runner/references/VideoExpress_3.5_Tutorial.pdf`](../videoexpress-runner/references/VideoExpress_3.5_Tutorial.pdf)) dan peta UI akun ([`../videoexpress-runner/PETA_UI.md`](../videoexpress-runner/PETA_UI.md)).

Di awal setiap sesi: baca file ini dan bagian atas [`OPEN_ITEMS.md`](OPEN_ITEMS.md), sebut versinya dalam satu baris. Bahasa ke owner: Indonesia, singkat, langsung ke inti.

## Runtime Mac — keputusan owner 2026-11-11

Profil Mac aktif memakai runner bersama, antrean terisolasi, checkpoint lokal dan assembly ffmpeg. Baca [MAC_RUNTIME.md](references/MAC_RUNTIME.md) untuk jalur Mac; instruksi GitHub di bagian historis bukan prosedur Mac. IMPLEMENTED dan TESTED komponen lokal; pilot stickman Mac15detik teruji sampai MP4 Drive dengan download/hash/decoder independen. Posting tetap memerlukan persetujuan terpisah. Tidak ada aturan khusus stickman yang mengganti default faceless.

### Insiden kualitas Saheela — 2026-11-11

MP4 Saheela tersimpan dan hash/decoder lolos, tetapi screenshot hasil render memperlihatkan fitur wajah manusia. Status kualitasnya FAIL, bukan teruji visual. Gate klip faceless sebelumnya tidak dipanggil (hanya stickman). Kini pekerjaan faceless Mac baru wajib `video_qc.required`, pemeriksaan anatomi pada sampel1FPS + frame akhir setelah render, dan bukti terikat job/URL/prompt/hash sebelum assembly/delivery. Observer wajib memiliki kalibrasi kontrol yang masih cocok. Ini sampling, bukan pemeriksaan setiap frame; naturalitas gerak dan pakaian belum otomatis disahkan.

Penulis API memuat `policies/authoring.json` yang terikat SHA dokumen aktif, menyimpan provenance di brief/shots/usage dan menolak policy yang kedaluwarsa. Profile opt-in `natural_realtime_v1` memerlukan beat untuk setiap detik, semua aksi sampai akhir, tempo normal dan kamera sesuai cerita; tidak memakai fase default yang memotong akhir. Default legacy faceless di luar profil ini tetap kompatibel, tetapi runtime Mac tidak membolehkan render baru tanpa gate video. Jangan menyatakan gerak sudah natural sebelum uji klip nyata. Referensi METODE_PROMPT lama adalah sejarah; master videoV4 dan imageV6 tetap acuan aktif, dengan profil gerak terverifikasi strukturnya ini. Posting tetap terkunci. Detail [QUALITY_INCIDENT_SAHEELA_20261111.md](references/QUALITY_INCIDENT_SAHEELA_20261111.md).

### Injeksi isi skill penuh — owner 2026-11-11

Saat menulis cerita/revisi prompt atau mengambil keputusan supervisor, GPT-4.1 mini dan Hermes menerima teks lengkap SKILL JOTA terbaru, skill runner, MAC_RUNTIME, referensi pemulihan QC dan template preset yang relevan melalui loader bersama `local/skill_context.py`. Faceless memuat master videoV4 dan imageV6 penuh; stickman memuat TWO_PRESETS dan descriptor2D, tidak mengaktifkan template manusia/3D. Aturan Mac terbaru/preset mengatasi contoh historis cloud/NATURAL/suara native yang masih ada dalam manual. Ini injeksi konteks runtime, bukan pelatihan atau jaminan model selalu patuh.

Snapshot sumber diverifikasi manifest SHA/version setiap panggilan. Jika dokumen berubah tanpa rilis manifest yang ditinjau, file hilang, atau konteks melebihi batas, panggilan diblokir; isi tidak dipotong atau diganti ringkasan diam-diam. Usage mencatat seluruh daftar sumber, hash konteks, preset dan versi. Hermes memakai alias model lokal berkonteks64K, tools tetap nol; GPT memakai preflight tokenizer untuk reservasi biaya di capharian existingUSD0.10. Polling/status rutin tidak memuat ulang model untuk belajar dan tidak membakar token AI. Prompt/aset proyek lama tidak ditulis ulang akibat injeksi baru. Detail [SKILL_CONTEXT_MAC.md](references/SKILL_CONTEXT_MAC.md).

### Pemulihan QC oleh agent — owner 2026-11-11

IMPLEMENTED, mekanisme lokal TESTED; pilot pemulihan nyata harus dibaca dari task/run, bukan dianggap berhasil karena antrean. Supervisor aktif mendeteksi laporan QC gagal yang terikat job/prompt/aset, menugaskan penulis API memperbaiki aksi/beat/prompt atau komposisi awal, lalu validator membuat proyek revisi terpisah dan mengantrekan aksi `repair`. Klip lain dipertahankan hanya bila identitas/prompt/bukti sama; turunan LAST_FRAME diinvalidasi. Agent melaporkan diagnosis, revisi masuk antrean, QC sampel per shot, assembly, dan hasil teknis Drive. Tidak mengklaim naturalitas atau semua frame lolos berdasarkan sampling.

Maksimal tiga percobaan per shot sepanjang lineage; hitungan tidak direset karena proyek revisi baru. Kegagalan teknis/jurnal ambigu tidak menyebabkan render ulang kreatif. Setelah budget habis, kebijakan REVIEW existing dipakai dengan label gagal QC dan posting tetap terkunci. Rancangan tidak valid mendapat maksimal tiga koreksi dalam budget API existing; budget/API/validasi yang tetap gagal dilaporkan sebagai blocker spesifik. Tidak ada biaya AI untuk polling rutin. Detail [QC_RECOVERY_MAC.md](references/QC_RECOVERY_MAC.md).

### Operasi proaktif Mac — 2026-11-11

n8n watchdog aktif setiap menit melalui HTTP bridge lokal berautentikasi; pengawas launchd cadangan memakai lock/dedupe sama. Laporan progres setiap lima menit hanya saat produksi aktif, hasil dikirim otomatis, layanan koordinasi stale dapat direstart maksimal dua kali/jam tanpa restart atau requeue produksi. Caffeinate mencegah idle-sleep selama otomasi owner aktif agar Telegram tetap diterima; layar boleh tidur, tanpa mengubah pengaturan daya permanen. Telegram transport punya deadline dan kegagalan notifikasi tidak menghentikan pekerjaan.

Owner memilih ChatGPT di sesi percakapan sebagai penulis naskah/storyboard/prompt baru; konfigurasi writer_policy=chatgpt_pending menyimpan permintaan baru sampai paket ChatGPT tersedia. Ini bukan API ChatGPT bulanan atau janji naskah otomatis ketika sesi owner tidak aktif. Paket jota.authoring-draft.v1 diimpor lewat authoring-import: validator mempertahankan prompt, membuat proyek terisolasi, mengantre acuan buaya/lingkungan lalu karakter manusia dan scene melalui worker existing. Reference-only tanpa manusia melewati pembuatan desain manusia saja; QC gambar/library tetap wajib. Paket preserve_prompts tidak boleh ditulis ulang GPT mini/lokal ketika QC gagal; laporkan bukti untuk revisi ChatGPT. Jalur penulis OpenRouter lama tetap tersedia hanya bila dipilih eksplisit lewat konfigurasi; perilaku proyek legacy tidak ditulis ulang. Manager percakapan tetap GPTmini, pool biayaUSD0.10/hari dan100panggilan tidak berubah. Pemulihan QC proyek legacy tetap mengikuti QC_RECOVERY_MAC.md dan worker tunggal. Skill tidak memperbarui dirinya otomatis. Pembacaan server Drive mandiri belum lengkap; laporan menyebut batas bukti. Detail CHATGPT_AUTHORING_MAC.md.

IMPLEMENTED + TESTED: jadwal n8n nyata trigger success, dedupe dan timeout, recovery terbatasi, penulis API -> perbaikan validator -> storyboard aktual tanpa mengubah antrean uji. Full video dari instruksi teks baru belum pilot; Saheela dari brief unggahan sudah MP4 server-readback verified.

### Kebijakan progresif Mac terbaru — owner 2026-11-11

Untuk pekerjaan baru dari konektor Mac, gambar dan QC diproses per shot; shot yang lolos seluruh gate langsung disubmit animasi tanpa menunggu storyboard lengkap atau persetujuan owner. Ini menggantikan gate persetujuan storyboard Mac sebelumnya. Infrastruktur/sesi/slot tetap tunggal; LAST_FRAME menunggu sumber kontinuitas sah; semua klip wajib lengkap untuk assembly. QC tidak dilewati; maksimal tiga pemeriksaan dan REVIEW existing tetap. Publishing tetap butuh persetujuan terpisah. IMPLEMENTED dan regresi TESTED; leadtime produksi progresif belum dibenchmark, bukan jaminan sekali generate pasti benar.

## Percakapan konsep, genre dan gaya visual — owner 2026-11-11

Skill membedakan tema/ide, pesan cerita, basis cerita (fiksi hikmah atau hadis terverifikasi), genre, gaya visual, jumlah/identitas karakter, serta durasi/rasio/bahasa/narasi. Genre seperti drama, horor, laga, perang, sport, keluarga atau petualangan tidak menentukan gaya visual. Faceless adalah aturan wajah tanpa fitur; kontrak preset kini faceless/stickman/object_asmr_pov, bukan daftar seluruh gaya seni.

Mode bantu cari ide: ngobrol singkat dan bertahap, tanyakan hanya hal penting yang belum jelas; bila belum ada ide tawarkan lima pilihan relevan. Jangan mengulang pertanyaan yang sudah dijawab. Mode diskusi/naskah/storyboard berhenti pada lingkupnya tanpa antrean produksi. Untuk produksi yang sudah jelas, rangkum konsep dan gunakan default JOTA yang berlaku dengan asumsi singkat; jangan memaksa wawancara atau persetujuan baru per tahap. Persetujuan ringkasan cukup sekali bila owner memang masih memilih arah cerita, bukan gate tambahan pada instruksi produksi eksplisit. Persetujuan publikasi tetap terpisah.

Katalog awal untuk dibahas: 3D Cartoon, 2D Cartoon, Stickman 2D, Motion Comic, Paper Cutout dan Storybook. Storybook berarti tampilan ilustrasi buku cerita (misalnya cat air/lukisan digital), bukan jenis gerakan atau bukti bahwa video sudah dianimasikan. Comic memakai panel/ilustrasi komik; paper cutout memakai potongan kertas berlapis. Kamera dan gerak tetap direncanakan terpisah. Jangan memakai nama studio sebagai kewajiban style.

Status kemampuan: jalur existing 3D Cartoon faceless, Stickman2D dan object_asmr_pov tetap memakai konfigurasi masing-masing. Kartun2D umum kini memiliki preset opt-in cartoon_2d dengan adapter, referensi proyek dan profil inspeksi operator aktual; IMPLEMENTED/TESTED mekanisme, pilot/video belum dianggap selesai sebelum bukti klip/Drive. Baca [CARTOON_2D_MAC.md](references/CARTOON_2D_MAC.md). Motion Comic, Paper Cutout, Storybook dan gaya tambahan lain tetap SPEC. Opsi UI2D saja bukan bukti produksi; jangan fallback gaya diam-diam.

IMPLEMENTED intake Telegram multi-turn dengan GPT-4.1 mini, memori per owner/chat, slot draft/preferensi berprovenance, menu pilihan teks, kontrol /memori /lupakan /konsep /batal, dan handoff conversation_spec tervalidasi ke penulis existing. Model menafsirkan; kode mengizinkan eksekusi hanya dari instruksi owner dan kemampuan yang tersedia. Diskusi/preferensi/pertanyaan tidak enqueue; revisi proyek diarahkan terpisah. Status/kontrol memori tidak membutuhkan AI. Inline keyboard dan gaya tambahan tetap SPEC. Tes mekanisme dan probe model dicatat di OPEN_ITEMS; jangan menganggap semua percakapan selalu dipahami sempurna. Skill Telegram [jota-telegram](../jota-telegram/SKILL.md) mengatur memori, kutipan bukti slot, isolasi dan batas API. Detail bidang, katalog dan contoh percakapan: [PRE_PRODUCTION_CONVERSATION.md](references/PRE_PRODUCTION_CONVERSATION.md).

## Preset produksi — faceless, stickman dan object ASMR

Preset `object_asmr_pov` menggunakan adapter objek tersendiri, descriptor photorealistic existing, no face/reflection/full human, tangan opsional, no music, narasi OFF default, SFX ElevenLabs wajib, kamera statis dan hard cut. Struktur objects/shots/action_timeline dan QC object-asmr-v1 tidak memakai template kulit/keluarga/3D faceless atau stickman. Queue/worker/sesi/checkpoint/assembly/Drive Mac tetap sama. Detail [OBJECT_ASMR_PRESET.md](references/OBJECT_ASMR_PRESET.md). IMPLEMENTED; hasil test dan batas live di OPEN_ITEMS. Modul object physics v1 tetap acuan pre-generation saja; atas permintaan owner, profil preset ini menambah QC hasil terpisah tanpa mengubah modul tersebut.


`preset` tervalidasi: `faceless`, `stickman` atau `object_asmr_pov`. Brief tanpa preset tetap generator faceless existing; preset lain ditolak. Instruksi khusus kulit, rambut, karakter keluarga dan Image Type 3D di bagian faceless/historis dokumen ini **hanya untuk faceless**, tidak diwariskan ke stickman. Gate, batas tiga pemeriksaan/REVIEW, penguncian slot, sesi login, audio ElevenLabs, ffmpeg/Remotion, penyimpanan dan Drive memakai infrastruktur bersama. Tidak ada publikasi tanpa persetujuan terpisah; pilot ini tidak mempunyai metadata unggah sosial.

Stickman: Classic 2D Stickman Cartoon, kepala bulat kosong tanpa mata/alis/hidung/mulut, garis/proporsi/palet/pakaian/properti konsisten, emosi melalui tubuh dan komposisi, tanpa lipsync atau musik. `image_type:2d` memakai opsi selector yang sudah dipetakan dan diverifikasi sebelum Create; bukan tombol preset stickman rekaan. Character-first melalui `stickman-characters.mjs`: generate → Save/library/readback → QC profil stickman → pasang ref proyek → gambar scene. Bukti terikat hash dan revisi; perubahan desain memakai proyek revisi baru. Jangan mengisi kekosongan dengan referensi keluarga faceless.

Urutan kerja: ide → pengaturan (default 60 detik/9:16/narasi aktif/bahasa Indonesia jika tidak disebut) → konsep → naskah → karakter → storyboard → gambar → animasi → audio → assembly. Ide yang sudah ada langsung dikembangkan; bila belum ada tawarkan lima ide/niche hikmah/kejujuran/keluarga/persahabatan/petualangan, tanpa klaim viral. Nyatakan asumsi singkat, tidak menambahkan approval per tahap. Permintaan diskusi/naskah/storyboard berhenti pada lingkup itu. Gunakan sekitar 3/5/6–7/8–10 scene untuk 15/30/45/60 detik; pecah klip lebih panjang dari 10 detik dengan keadaan awal/akhir yang eksplisit dan total timeline tepat.

IMPLEMENTED dan TESTED lokal: routing, generator, karakter, profil QC, pengikat resume/revisi, narasi opsional, assembly lengkap, isolasi sosial; regresi faceless byte-identik. **Belum teruji produksi stickman** sebelum bukti Save/QC/job/klip/MP4 Drive aktual tersedia. Detail format, contoh, batas QC sampel dan bukti: [TWO_PRESETS.md](references/TWO_PRESETS.md).

## Persiapan dan kelanjutan workflow (2026-11-09)

Owner meminta workflow membantu agen bekerja aktif. `siapkan` memvalidasi/build draft tanpa menuntut QC gambar sudah lolos. `uji-gambar` mengantre persiapan lalu satu tahap gambar secara eksplisit, dengan jeda login tetap dijaga. auto:false dan gate tidak diubah; tidak ada kelanjutan otomatis ke video. Status perintah baru mengikat run ID dan menyimpan tindakan berikutnya. Selama sesi aktif, Claude/ChatGPT mengikuti hasil sampai terminal dan memperbaiki penyebab, tidak berhenti pada dispatch. Workflow tidak membangunkan sesi chat yang sudah berakhir atau merevisi prompt lewat API berbayar. Detail dan batas bukti: `skills/videoexpress-runner/WORKFLOW_AKTIF_20261109.md`.


## UPDATE OWNER — IMAGE PROMPT SEDERHANA V6.0.0 (2026-11-08)

Owner menunjukkan contoh berhasil dengan perintah sederhana: **"KEEP FACELESS FOR ALL CHARACTERS" DI AWAL gambar**, lalu kamera, latar, dua karakter, dan pose. Tidak boleh dipaksa rear camera only; kamera harus **mengikuti storyboard**, termasuk FRONT THREE-QUARTER untuk SHOT04. Ini menggantikan aturan gambar V5 rear-only di bawah yang merupakan keputusan assistant tanpa persetujuan owner. Model gambar harus menghasilkan wajah mulus tanpa mata/hidung/mulut, tanpa kacamata/jenggot. Enhance wajib OFF (terverifikasi OFF pada run gambar V5); creative mode OFF dan gallery OFF. Tidak perlu prompt panjang dengan negative list berulang. Acuan aktif: `references/PROMPT_IMAGE_FACELESS_V6.0.0.md`.

Revisi baru menggunakan `gpt/productions/JOTA-M1-AMPLOP-IMAGE-SIMPLE-V6-20261108/shots.json`, tag `AMPIS6` dan 11 gambar baru. `auto:false`, `gate:gambar`, image_reference_policy=none karena seluruh library lama dihapus pemilik. Hasil tanpa referensi harus melewati Save Image di toolbar modal dan pembacaan ulang My AI Images (Runner Skill 1.7.4); preview atau klik Save bukan bukti library tersimpan atau QC PASS; tidak menjalankan render video sebelum lolos visual.

## HISTORIS, DIGANTI V6 DI ATAS: IMAGE PROMPT FACELESS V5.0.0 — 2026-11-08 (Skill 4.20.3)

Owner telah menghapus **seluruh gambar di VideoExpress** karena hasil image batch lama salah/memunculkan wajah Uwais. Jangan mengulang nama gambar lama dan jangan memakai referensi yang telah dihapus. Untuk regenerasi gambar baru: gunakan `image_prompt_version:"5.0.0"` dan `image_reference_policy:"none"`, tag baru, folder awal baru; kamera `rear_only` untuk scene berisiko. Image Prompt HARUS membuka dengan desain wajah faceless yang berupa bidang kulit mulus tanpa mata, lubang mata, hidung, mulut, garis wajah; usia anak dan pakaian spesifik, pose tangan dan jumlah benda, lalu tutup dengan face lock ulang. Default UI Image Type 3D, Enhance OFF, Creative OFF, Gallery OFF. Master prompt `references/PROMPT_IMAGE_FACELESS_V5.0.0.md`.

**Penting:** Image generation tanpa foto acuan di VideoExpress menghasilkan gambar pratinjau yang dapat diunduh. Diagnosis lama “tidak bisa Save Image” dikoreksi peta 42572311547: kontrol Save untuk satu gambar ada di toolbar modal, di luar slide. Runner 0.18.4 wajib memverifikasi respons Save dan menemukan kembali mediaId di My AI Images; status implementasi dan bukti live ada di Runner Skill 1.7.4. Karena library lama sudah dihapus, image-v5 memakai `image_preview_only:true`: screenshot/PNG disimpan ke repo untuk QC dan metadata `image-stage.json` wajib menyatakan PREVIEW_ONLY / library_saved=false. Itu **BELUM gambar final yang bisa dipilih untuk video**. Jangan pernah menulis QC PASS atau owner APPROVED hanya karena workflow sukses. Sesudah visual QC, butuh langkah memasukkan gambar ke library sebagai referensi sebelum produksi video, atau jalur VE yang terbukti menyimpan gambar.

**Kebijakan antiduplikasi:** cmdGambar lama melewati shot jika ada file `awal/SHOTxx-1.png`. Karena itu setiap percobaan perlu folder/tag baru, tidak boleh menimpa/memakai foto stale. Semua gambar lama pada proyek AMPLOP dilarang masuk produksi setelah owner menghapus library. Workflow video tetap ditahan oleh `gate:gambar`. Audio dan prompt video tetap V4.0.0/ElevenLabs.

## AUDIT GAMBAR V4 — 2026-11-08 13:03 WIB (Skill 4.20.2)

Image workflow berhasil menghasilkan 20 berkas gambar awal untuk 11 shot, namun bukan 20 gambar lolos QC: sebagian memiliki mata/mulut; Uwais tampak dewasa, dan 2 file Uwais hanyalah pratinjau tanpa tombol Save Image. QC PENDING semua. **DILARANG menjalankan video render sampai gambar lolos pemeriksaan sebenarnya**. Kondisi perintah 'gambar' sukses BUKAN bukti gambar layak. Jangan menandai owner APPROVED tanpa persetujuan atas gambar tertentu.

Perbaikan generator: `gate:gambar` WAJIB tetap diteruskan ke shots.json WALAU brief `auto:true` (bug sebelumnya dapat menghapus gate). `cmdGambar` harus GAGAL bila hanya menghasilkan gambar pratinjau yang tidak bisa dipilih sebagai library image. Prompt gambar per klip dapat disediakan dalam `klip[].image_prompt_v4`; referensi tanpa kacamata legal dipilih dengan `ref_tokoh_v4`, wajib sesuai instruksi `tanpa_kacamata`. Pilot pembetulan Uwais remaja 15 tahun dan adegan dua anak ada di `pilot/shots.json` proyek Amplop. Jalankan gambar saja lalu QC before full batch. Suara tetap ElevenLabs, tidak ada video auto dari pilot.

## UPDATE 2026-11-08 — OWNER IZINKAN LANJUT PRODUKSI V4 (4.20.1)

Owner secara eksplisit meminta melanjutkan video AMPLOP setelah perbaikan V4. Instruksi STOP historis di bawah tidak lagi melarang tahapan kerja proyek ini. Brief/shots AMPV4 revision 2 sudah auto=true, tetapi **gate gambar tidak dicabut**: buat dan QC 11 gambar awal terlebih dahulu (terutama Uwais tanpa kacamata, tanpa mata/hidung/mulut), lalu jalankan video dengan LAST_FRAME sesuai storyboard. Perintah saat ini `ampv4-20261108-gambar-01`, aksi gambar, slot 1; baru setelah gambar lulus lakukan aksi produksi sekali, tanpa menduplikasi run. Publishing tetap dilarang tanpa persetujuan terpisah.

## KEPUTUSAN OWNER TERBARU 2026-11-08 — PROMPT V4.0.0 AKTIF, PRODUKSI STOP

Owner menolak drama Amplop karena musik, suara tokoh asli VideoExpress, mata muncul, kacamata tidak konsisten dan aturan faceless terlalu terpisah. Keputusan ini MENGGANTIKAN semua ketentuan V3 yang bertentangan. Produksi AMPLOP tetap STOP (auto=false) dan tidak boleh di-dispatch tanpa perintah baru.

1. VideoExpress hanya gerak visual. Video Prompt tidak boleh menyebut kalimat dialog/narasi sama sekali. Ucapan, narasi, dan suara tokoh selalu ElevenLabs pada pascaproduksi. Tidak ada lip sync, gerak rahang berbicara, humming, singing, musik, atau native character speech.
2. Audio asli VideoExpress bisa memuat musik walau prompt melarang. Secara default semua audio klip VideoExpress DIBUANG saat perakitan ffmpeg: audio_policy=elevenlabs_only dan suara_klip=false. Ambience/foley default ElevenLabs. SFX VideoExpress hanya dipakai bila owner sudah mendengar dan menyetujui sumber audio (vx_sfx_approved=true); jangan berasumsi musik tidak ada.
3. Setiap gerakan dan setiap segmen timeline 0:00–0:10 WAJIB memuat secara langsung instruksi kulit wajah polos tanpa mata, hidung, mulut, gigi atau garis wajah. Tidak ada blok wajah khusus KEEP FACELESS, FIRST FRAME FACE LOCK, SPEECH FACE LOCK, FINAL FACELESS LOCK. Cukup kamera, deskripsi karakter, aturan suara, timeline lima rentang untuk 10 detik, dan frame akhir konsisten.
4. Karakter mengikuti gambar acuan yang disetujui, tanpa tambahan kacamata/jenggot/aksesori mendadak. Khusus AMPLOP: UWAIS TANPA KACAMATA, tidak mengambil ref bernama Uwais_kacamata. Pengaturan proyek ini tidak mengubah identitas semua proyek lama. Gambar awal wajib dilihat dan lulus zero eyes/nose/mouth sebelum render.
5. Kontinuitas: klip lanjutan dengan cast, lokasi, waktu, kamera dan posisi benda yang sama menggunakan Save Last Frame sebagai awal berikutnya. Bila flashback, pemeran atau ruangan berbeda, buat start BARU. Maksimal 3 sambungan berturut-turut sebelum jangkar acuan baru.
6. Image Type 3D, Creative OFF, Enhance OFF, Gallery OFF; audio character ElevenLabs, SFX sesuai QC, hadits Remotion dengan sumber sahih. Semua produk media sosial tetap butuh approval terpisah.
7. Versi saat ini Skill 4.20.0, Runner Skill 1.7.0, Runner Kode 0.18.0, Prompt 4.0.0. File master references/PROMPT_FACELESS_V4.0.0.md, audit produksi gpt/productions/JOTA-M1-AMPLOP-HILANG-UWAIS-20261108/REVIEW-V4.md. Hanya kode dan generator diuji; video nyata V4 BELUM QC, jangan klaim lolos.

## Laporan progres produksi 5 menit — keputusan owner 2026-11-08

**Preferensi tetap owner:** selama produksi JOTA aktif, laporkan status singkat sekitar **setiap 5 menit**, cukup: **tahap, klip terkonfirmasi/total, kendala, bantuan owner**. Jika ada kesalahan yang memerlukan akun, pilihan kreatif, izin, atau persetujuan, sebutkan jelas agar owner dapat membantu. Jangan mengarang progress, durasi, atau selesai; bila data per-shot tidak tersedia, tulis "belum terkonfirmasi". Tidak boleh posting ke media sosial.

**Jalur pengiriman (historis, tidak dipakai sejak akun GitHub lama mati 2026-11-17):** dulu GitHub Actions, workflow `.github/workflows/jota-laporan-5menit.yml`, menggunakan Telegram JOTA yang sudah dikonfigurasi untuk notifikasi produksi. Script laporan: `apps/videoexpress-runner/laporan-progress-5m.mjs`. Workflow dimulai manual dan kemudian mengirim setiap 300 detik selama sesi aktif; sebelum batas waktu GitHub Actions ia menjalankan kembali workflow sendiri. Cron periodik hanya sebagai pemulihan dan bisa terlambat karena penjadwal GitHub. Di Mac, laporan 5 menit dikerjakan watchdog operasi n8n (MAC_RUNTIME.md). Setelah FINAL proyek terdeteksi di arsip, kirim kabar akhir dan hentikan loop. Jangan menyamakan notifikasi Telegram dengan pesan otomatis di chat ChatGPT (jadwal ChatGPT minimal tiap jam).

**Proyek monitor pertama:** `JOTA-M1-AMPLOP-HILANG-UWAIS-20261108`, perintah `ampl01-20261108-buat-01`, target 18 klip/180 detik. Bila status QC DITOLAK, baca alasan, koreksi hanya yang dibuktikan sesuai SOP lalu antrekan ulang tanpa duplikasi. Bila LOLOS dan belum ada progress.json, tetap laporkan apa yang terverifikasi. Detail SOP di [`gpt/LAPORAN-PROGRES-JOTA.md`](../../gpt/LAPORAN-PROGRES-JOTA.md).

## Release versions (2026-11-08)

**Versi yang berlaku sekarang: Skill 4.23.21, Skill Runner 1.10.11, kode Runner 0.22.11, Prompt V4.0.0. Riwayat versi terdahulu di bawah hanya arsip, bukan instruksi aktif.**

- Skill JOTA **4.19.0**; Runner skill **1.6.0**; Runner aplikasi **0.17.0**; Prompt wajib **FACELESS V3.1.0**.
- Manifest sumber versi: [gpt/VERSI-JOTA.json](../../gpt/VERSI-JOTA.json); master [references/PROMPT_FACELESS_V3.1.0.md](references/PROMPT_FACELESS_V3.1.0.md).
- Migrasi 21 proyek **brief-only** menghasilkan draft shots.json V3.1.0 tanpa memicu produksi; proyek yang sudah memiliki shots.json dilindungi dari migrasi massal. Hasil rinci di gpt/MIGRASI_V3_20261108.json.
- Uji V3.0.0 dari owner telah berhasil; V3.1.0 pada Runner masih perlu QC video live.

## 1. Aturan tetap (tidak pernah berubah tanpa keputusan owner)

1. **Faceless untuk semua manusia.** Wajah satu bidang kulit polos dari dahi sampai dagu: tanpa mata, alis, hidung, mulut, tanpa lipsync. Hewan tanpa mata. Allah, para nabi, dan malaikat tidak pernah digambarkan, termasuk siluet. Dasar: [`references/SYARIAT_GAMBAR.md`](references/SYARIAT_GAMBAR.md).
2. **Tanpa musik.** Ambience, foley, dan ucapan boleh. Setiap Video Prompt diakhiri `No music.`
3. **Dalil wajib bersumber.** Ayat dan hadis hanya dari sumber terverifikasi (kitab dan nomor, dicek ke sumber seperti sunnah.com atau quran.com). Dilarang mengarang teks, nomor, atau status. Yang belum terverifikasi tidak diucapkan dan tidak ditampilkan. Azan, bacaan Al-Qur'an, dan doa tidak dibuat oleh generator klip.
4. **Klip bergerak hanya dari VideoExpress.** Gambar diam boleh dari VideoExpress, Artistly, atau ChatGPT Images. ElevenLabs hanya untuk suara (narator, suara latar, foley). Remotion hanya untuk teks di layar (judul, kartu hadis, outro). Perakitan dan subtitle dengan ffmpeg di Runner.
5. **Public gallery OFF** di setiap Create, dibaca ulang tepat sebelum klik. Menu klik kanan **Share** (langsung publik) tidak pernah diklik.
6. **Operator hanya Runner** (runtime Mac, MAC_RUNTIME.md). Agen tidak mengklik VideoExpress lewat browser dan tidak menjalankan perintah di Mac owner.
7. **Izin.** "Buatkan video X" mengotorisasi naskah, storyboard, gambar, QC, render dan simpan MP4 di Drive. Keputusan terbaru owner 2026-11-09: orkestrator menindaklanjuti tanpa instruksi ulang; maksimal tiga percobaan QC per shot, lalu lanjut menjadi video REVIEW bila belum lolos. Owner memeriksa video sebelum posting. Jangan menganggap instruksi produksi atau batas tiga percobaan sebagai approval publikasi.
8. **QC.** Jalur normal tetap mewajibkan seluruh QC shot, hashes, kalibrasi dan Save/reload/library lolos sebelum submit progresif. Kebijakan terbaru `qc_policy:{approval:"automatic_after_all_checks",max_attempts:3,on_exhausted:"render_review"}` dan `automation:{orchestrated:true,progressive_video:true,video_after_qc:true,publish:false}` membatasi QC. Percobaan dicatat sebelum inference dan hasil disimpan ke repo. Setelah tiga percobaan yang belum lolos, buat proyek REVIEW terpisah dan MP4 DRAFT-UNVERIFIED beserta laporan QC; source auto:false/gate dan FAIL tetap utuh, bukan dipalsukan PASS. Bukti Save/library/hash tetap wajib; aset hilang atau kiriman ambigu tidak boleh dikarang. LAST_FRAME yang belum punya bukti masih perlu penanganan dependensi. Orkestrator memeriksa tahap/antrean berkala, melanjutkan render dan unggah Drive, maksimal tiga percobaan worker teknis. Setelah Drive memberi ID/URL, tunggu owner; readback terpisah tidak boleh diklaim tanpa bukti. `/setuju-posting ID yt,ig,fb` dari Telegram pemilik mengikat persetujuan pada hash MP4 yang dikirim dan platform. Poster memeriksa hash arsip yang sama sebelum publikasi. Posting gagal/ambigu tidak diulang otomatis untuk mencegah duplikasi. Tanpa konfirmasi owner, petugas posting terkunci.
9. **Biaya.** VideoExpress dan Actions di repo publik gratis. Yang dihemat hanya token Claude dan ChatGPT.

- **Setiap kesalahan diperbaiki di tempatnya** (owner 2026-11-06 04:49): kode atau aturan dibetulkan di commit yang sama, kesalahan dan pelajarannya dicatat di bagian 11, CHANGELOG, dan memory proyek Claude. Kesalahan yang sama tidak boleh terulang.

## 2. Cara VideoExpress 3.5 dipakai (tutorial resmi + uji smooth owner)

| Hal | Aturan v4 |
|---|---|
| Alat | `Create Video From Prompt`; First Frame, Last Frame hanya bila diminta eksplisit dalam storyboard. Close-up, putaran tokoh dan orbit kamera 360° diizinkan (owner 2026-11-09). Text To Video/Lipsync tidak dipakai. |
| Rasio | 9:16 untuk Shorts, Reels, TikTok. 16:9 hanya YouTube panjang. |
| Durasi klip | 3 sampai 10 detik, mengikuti aksi dan ucapan (uji owner: kebanyakan 5 sampai 7 detik). Cerita dibangun dari banyak klip pendek. Total Shorts sekitar 45 sampai 60 detik. |
| Enhance prompt | **OFF** untuk pengujian manual V3 ZERO EYES + ZERO MOUTH yang lolos 2026-11-08. Aturan lama ON digantikan untuk Video Prompt faceless. |
| Image Type | **`3d` wajib** untuk tokoh faceless; jangan `human` atau `photorealistic` (uji owner 2026-11-07 sampai 2026-11-08). |
| Creative mode | OFF. |
| Gambar awal | **Klip BARU**: klip pertama, sudut atau lokasi baru, ganti baju, lompatan waktu. Dibuat dengan `Use Consistent Character`: Reference Photo 1 = foto acuan tokoh, Reference Photo 2 = frame ruangan yang sudah disetujui (uji owner, menjaga lokasi). **Klip SAMBUNG**: tempat, waktu, dan sisi kamera sama; gambar awal = `Save Last Frame` klip sebelumnya lewat `Use from Library`, tanpa Image Prompt. |
| Pasang acuan lagi | Setiap 3 klip SAMBUNG berturut-turut, klip berikutnya BARU dengan foto acuan (rantai panjang tanpa acuan pernah menghanyutkan identitas, H02D). |
| Ucapan tokoh | **ElevenLabs** (owner 2026-11-06 12:10): ucapan di brief (`ucapan` klip atau langkah) menjadi `dialog` shot dan dibacakan `narasi-tokoh.mjs` dengan suara tetap per tokoh (`characters/suara.json`, suara pustaka, bukan tiruan suara anak). Video Prompt tanpa ucapan, jadi pelafalan benar dan mulut tidak muncul. Audio asli klip wajib dimute dan ambience ElevenLabs menggantikannya. Brief `"suara_tokoh": "native"` hanya bila owner minta. Setiap kalimat punya waktu mulai `t` (sesudah langkah aksi pemicunya, selesai sebelum klip habis); di Video Prompt tokoh yang bicara hanya mengangguk dan bergerak tangan kecil. |
| Narator | ElevenLabs suara Kang Nandar, hanya untuk pembuka singkat, hadis, dan penutup. Ditempel di klip tanpa ucapan tokoh. |
| Suara latar dan foley | Default ElevenLabs Sound Effects, dipilih setelah QC dan dicampur di bawah ucapan (`latar`, `foley` di brief). |

## 3. Prompt video WAJIB: FACELESS V4.0.0

Kamera dan identitas di bagian awal; tidak ada subtitle dialog atau spoken text di prompt video. Berikutnya 5 rentang 2 detik untuk 10 detik dengan gerakan spesifik dan kunci faceless TANPA heading blok tersendiri, lalu akhir shot yang bisa dipakai sebagai frame awal shot lanjutan. Semua suara karakter/narator tersimpan terpisah hanya untuk ElevenLabs. Audio asli klip dibuang agar musik VideoExpress tidak terbawa. SFX secara default dibuat dengan ElevenLabs dan hanya boleh memakai VideoExpress jika audio sudah disetujui.

Format V3.1.0 disimpan sebagai sejarah hasil uji manual owner, tetapi tidak boleh dipakai untuk produksi baru. Proyek lama yang sudah selesai tidak otomatis dimigrasikan. Jika ada ref yang bertentangan dengan kostum/aksesori yang disetujui, NONAKTIFKAN referensi tersebut daripada mengikuti atribut salah. Kondisi final selalu STOP sampai pengguna memberi perintah render baru.

**Image Prompt** (klip BARU): satu paragraf teknis tanpa label dan tanpa daftar larangan; mulai dari ukuran shot dan subjek, tokoh faceless eksplisit ("The face is completely smooth with no eyes, no nose, and no mouth"), baju per adegan, skala tokoh **selalu**, juga klip satu tokoh (umur dan tinggi cm; bila lebih dari satu tokoh: posisi kepala si kecil terhadap si besar saat berdiri dan duduk, dan hubungan ibu atau ayah dengan anak kecil, bukan kakak adik atau sepantar; owner 2026-11-05 23:16), pose awal, benda, ruangan dan cahaya, "Preserve the same room setting, lighting, and character identity." Kepala tegak, menghadap kamera atau tiga perempat.

**Metode PRO** (template berlabel di [`references/PROMPT_PROFESIONAL.md`](references/PROMPT_PROFESIONAL.md)) hanya kalau owner menulis "metode PRO".

## 4. Tokoh

- Sumber kebenaran: [`characters/tokoh.json`](characters/tokoh.json) (foto acuan, tinggi, rambut, ciri, pembeda) dan [`characters/suara.json`](characters/suara.json). Tabel: [`characters/README.md`](characters/README.md).
- Foto acuan untuk bentuk fisik (badan, kepala, rambut, kulit, kacamata). **Baju ditulis per adegan** (`pakaian` di brief, misal piyama saat bangun subuh, koko dan peci saat ke masjid) dan berlaku sampai diganti di klip BARU.
- Paling banyak dua tokoh berfoto acuan per klip, dan dua slot Reference Photo dipakai tokoh + ruangan. Jadi **satu tokoh berfoto acuan per klip BARU** kalau ruangan dipakai; tokoh lain cukup suaranya atau tampil di klip lain. Tokoh sebaya sejenis (Uwais dan Ukasyah) tidak satu klip.
- Dua tokoh dalam satu klip: tulis posisi kiri/kanan, perbandingan tinggi (`SCALE`), dan pembeda. Hanya untuk aksi yang sama dan berdampingan.
- Figuran tanpa foto acuan: hanya tangan, lengan, atau punggung.
- **Foto acuan tokoh (benchmark 2026-11-07, [`references/BENCHMARK_FACELESS_20261107.md`](references/BENCHMARK_FACELESS_20261107.md)):** wajib ada untuk setiap tokoh dewasa (tanpa acuan, VideoExpress menggambar wajah lengkap). Satu tokoh, badan penuh, tampak depan, latar polos terang, cahaya rata, wajah polos jelas, **tanpa jenggot dan kumis** (jenggot dibaca sebagai mulut). Kunci penampilan di tokoh.json sama persis dengan fotonya. Acuan dibuat di Artistly dan diimpor runner (`impor-artistly`, dicocokkan lewat `sumber.json`); owner tidak diminta mengimpor.

## 5. Yang terbukti memunculkan wajah atau merusak tokoh (dicek `cek-brief.mjs`)

| Dilarang | Bukti | Gantinya |
|---|---|---|
| Tidur, berbaring, mata terpejam, kepala di bantal | UWAIS02C, 06, H02E | Tokoh sudah duduk tegak di tepi kasur, atau klip benda (alarm) dengan suara tokoh |
| Tampak samping penuh di gambar awal klip BARU | UJIKARTU2 | Gambar awal tiga perempat |
| Figuran berbadan penuh tanpa acuan | UWAIS03 | Tangan atau punggung saja |
| Klip SAMBUNG dari frame berpelukan atau wajah tertutup tubuh tokoh lain, lalu tokoh menegakkan badan atau menoleh | PUASA01 SHOT05 (mata dan mulut Saheela dan Ummi muncul, Ummi tampak sebaya) | Klip sesudah pelukan BARU dengan gambar awal satu tokoh menghadap kamera tiga perempat |
| Menunduk (lowers his head, head lowered, looks down), apalagi sambil bicara | UWAIS05, UWAIS07 SHOT05 (mulut Ukasyah muncul) | Kepala tegak, menghadap kamera atau tiga perempat; rasa bersalah lewat tangan dan ucapan |
| Kata gerak kabur (react, random, dancing, fidgeting) | Ep pilot Ummi | Satu kegiatan bernama, reaksi sederhana: berhenti, meletakkan, berdiri, berjalan |
| Ucapan terakhir tidak ditutup kalimat penjaga wajah | Uji owner 2026-11-07 22:09: mata muncul di akhir klip | Setelah ucapan terakhir tulis "keep his blank face perfectly smooth until the end"; format lengkap di [`references/PROMPT_EMAS_FACELESS_20261107.md`](references/PROMPT_EMAS_FACELESS_20261107.md) |
| Image Type Human/Photorealistic atau **Use Creative mode ON** (prompt sama) | Uji manual owner 2026-11-07 21:41: Creative mode = wajah lengkap; Image Type **3D** = faceless lolos | **Image Type: 3D**, Creative mode OFF (bawaan dari-brief sejak v4.15.0) |
| Acuan tokoh berjenggot/berkumis, atau tokoh dewasa tanpa acuan | Ranting, Lampu Teras, Catatan 2026-11-07 (mulut, hidung, mata Aba) | Acuan polos tanpa jenggot (`Aba_polos`) |
| Tokoh di adegan malam dengan cahaya samping keras (setengah wajah gelap) | Lampu Teras 2026-11-07 | Cahaya hangat merata di wajah; atau tokoh membelakangi/tampak belakang serong |
| Shot tangan dari atas saat tokoh lain duduk di meja yang sama | Setengah Kurma 2026-11-07 (tangan jadi banyak) | Medium shot satu tokoh terlihat sampai pinggang, satu aksi tangan |

Keputusan owner 2026-11-09: **close-up, kamera mendekat ke wajah, putaran tokoh 360° dan orbit kamera 360° diperbolehkan**. Tidak ditolak hanya karena ukuran shot atau arah putaran; jangan otomatis memaksa First Frame, Last Frame. Wajah yang terlihat tetap wajib polos dan diperiksa dari gambar asli. Uji owner adalah dasar pencabutan larangan; perubahan kode diuji regression, bukan klaim render baru.

Yang **boleh** (uji smooth owner): membelakangi kamera, tampak belakang serong, berjalan ke arah kamera, kamera mengikuti dari depan atau belakang, menoleh, berputar, asal ada kalimat faceless sepanjang video.

## 6. Alur produksi

```
ide owner → kartu (1 pesan) → brief.json (kartu klip) → cek-brief → shots.json
→ jota-gambar: 2 kandidat gambar awal per klip BARU → agen membuka gambar, pilih → Sheet storyboard
→ owner melihat Sheet dan menyetujui → jota-produksi: video, rakit, suara, subtitle, intro/outro
→ Drive (Video JOTA/<proyek>/) + YouTube private + Facebook DRAFT → owner menilai dan menerbitkan
```

1. **Kartu (satu pesan, owner menjawab sekali).** Isi default:
   ```
   Video "[JUDUL]": Reels/Shorts 9:16, ±60 detik, kartun 3D faceless, NATURAL, tanpa musik.
   Tokoh: [usulan]. Alur: [4-6 kalimat]. Dalil: [sumber, akan diverifikasi]. Balas "oke" atau ubah satu hal.
   ```
   YouTube panjang (16:9, 2 sampai 5 menit) hanya kalau owner minta.
2. **Brief.** Untuk permintaan video baru, wajib `qc_policy.approval:"automatic_after_all_checks"` dan `automation.video_after_qc:true`; auto:false sampai QC lengkap.  `playbooks/<kategori>/productions/JOTA-M1-<SLUG>-<YYYYMMDD>/brief.json` format kartu klip (`"klip"`), `"gate": "gambar"`, `tag` unik. Setiap klip: `kamera` (`posisi`, `gerak`, `fokus`), `awal`, `aksi` (langkah berurutan; `ucapan` melekat ke langkah pemicunya), `akhir` (= `awal` klip berikutnya), `potong: true` untuk klip BARU, `pakaian`, `latar`, `foley`. Contoh baku: `evals/PILOT-GATE-UMAIR-20261105/brief.json`.
3. **Cek dan bangun.** `node apps/videoexpress-runner/dari-brief.mjs <brief.json>` (menjalankan `cek-brief.mjs`), lalu `node apps/videoexpress-runner/runner.mjs plan <shots.json>` sampai lolos. `node apps/videoexpress-runner/test.mjs` kalau kode berubah.
4. **Gambar awal.** Commit, push, dispatch `jota-gambar`. Agen membuka kedua PNG tiap klip BARU dan foto acuannya, mengisi `awal/qc.json` (faceless, identitas, baju, ruang, pose, benda), memilih satu atau REGEN. `jota-sheet-sync` mode `tulis` mengisi Sheet "JOTA STORYBOARD | <proyek>" di folder Drive proyek.
5. **QC lengkap.** Mode otomatis tidak menunggu owner APPROVED. `after-image-qc.mjs` memeriksa seluruh bukti; yang belum lolos ditahan dan dilaporkan. Mode manual tetap tersedia jika diminta eksplisit.
6. **Video.** `"auto": true`, commit, push, dispatch `jota-produksi`. Satu produksi berjalan pada satu waktu; berikutnya lewat `apps/videoexpress-runner/antrean.txt`.
7. **Serah.** Laporan singkat: link FINAL Drive, YouTube private, Facebook draft. Tidak ada pemeriksaan frame oleh agen.
8. **Revisi** (hanya atas perintah owner): owner menyebut detik yang salah, agen memakai `PETA-WAKTU.txt` untuk menemukan shot, lalu memilih: Fix Video (`jota-runner-uji` mode `fix`, misal Fix Physics untuk benda menembus), kirim ulang satu shot (`regen`), atau rakit ulang (`jota-rakit-ulang`).
9. **Stop.** Owner bilang "stop": semua `"auto": false`, push, dan batalkan run yang berjalan.

## 7. Struktur cerita Shorts (±60 detik)

Hook (0 sampai 5 detik, masalah yang relevan) → kegiatan dan pemicu → pilihan tokoh yang terlihat → akibat → satu hikmah singkat oleh narator (dengan dalil kalau ada) → outro. Satu pesan, satu lokasi utama, satu tokoh utama. Dialog sehari-hari sesuai usia, pendek; anak tidak berceramah. Tidak ada teaser "besok" di akhir. Serial memakai blok `serial` (nama, hari, pesan maksimal 8 kata) untuk intro dan outro Remotion (`FOLLOW @ohankang`).

## 8. Infrastruktur (sejak 2026-11-05)

- **Actions tidak dipakai lagi** (owner 2026-11-17: akun GitHub lama mati, tidak ada kaitan lagi dengannya). Produksi berjalan di Mac lewat runtime lokal (MAC_RUNTIME.md). Satu-satunya GitHub JOTA adalah akun `ukulahaa-dotcom`; sumber skill `ukulahaa-dotcom/Jota_video_skill`.
- **Kredensial** (dulu secrets Actions, sekarang `local-state/accounts.env` dan `.env` Runner di Mac, izin 0600): `PRIVATE_REPO_TOKEN`, `VX_EMAIL`, `VX_PASSWORD`, `ELEVENLABS_API_KEY`, `JOTA_DRIVE_URL`, `YT_CLIENT_ID`, `YT_CLIENT_SECRET`, `YT_REFRESH_TOKEN`, `META_PAGE_ID`, `META_PAGE_TOKEN`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, Artistly. Agen tidak pernah menulis nilainya.
- **Drive** jotaauto1 lewat Apps Script `Jota_video` (versi 3: upload, Sheet episode, tulis, baca). Hasil: `1. Video JOTA/<proyek>/`. Foto acuan dari Telegram: `1. Video JOTA/Referensi JOTA/`.
- **Publikasi:** YouTube private otomatis; Facebook Reel DRAFT otomatis di Page Ohan Kang; Instagram @kohar_u3 lewat `jota-instagram` mode `posting` (langsung tayang, hanya atas perintah owner). Frekuensi wajar 1 sampai 2 video per hari per platform.
- **Telegram** @jota_runner_ohan_bot: instruksi `/buat <ide/durasi/tokoh>`, `/status`, `/gambar ID`, `/lanjut ID`, `/stop ID` dan foto referensi melalui satu poller `jota-telegram-ref`. Hanya chat/pengirim owner terdaftar. Jadwal sekitar 5 menit, GitHub dapat terlambat; balasan diterima dikirim sesudah commit. Naskah disusun model CPU lokal, divalidasi, kemudian antre gambar; bukan percakapan langsung dengan aplikasi ChatGPT/Claude. Seluruh pos mengirim status dan monitor semua proyek setiap sekitar 5 menit.
- **Runner VideoExpress:** semua tombol dan urutan klik tercatat di [`../videoexpress-runner/SKILL.md`](../videoexpress-runner/SKILL.md). Fitur yang belum tercatat dipetakan dulu (`jota-runner-uji` mode `peta`), tidak ditebak.

### Delegasi owner (2026-11-06 06:36)

Owner: "kerjakan semua yang baik dan tidak perlu selalu izin". Pembaruan owner 2026-11-09: persetujuan gambar didelegasikan ke QC lengkap tanpa mengisi owner.status APPROVED palsu. Video lanjut otomatis setelah QC, publikasi/jadwal tayang tetap membutuhkan instruksi terpisah. Sebelum FINAL masuk antrean posting, agen wajib memeriksa contact sheet frame tiap 2 detik (wajah, skala, orang asing di shot kosong); temuan dicatat di bagian 11 dan klipnya diulang. Batas tetap: aturan bagian 1, publish hanya lewat posting terjadwal, tidak ada perubahan akun atau rahasia.

### Satu jalur perintah: Pusat Komando JOTA (owner 2026-11-06 05:57)

- Perintah produksi owner masuk lewat artifact **Pusat Komando JOTA** (https://claude.ai/artifact/TShUvD48AB3T56escKCVnG), koleksi `perintah` (jenis, serial, judul, catatan, status `baru`/`diproses`/`selesai`/`ditolak`/`dibatalkan`, balasan). Ringkasan status ditulis agen di dokumen `status/ringkasan`.
- Tugas terjadwal "Proses Pusat Komando JOTA" berjalan tiap jam: mengambil perintah `baru` dari yang terlama, mengubahnya ke `diproses` dengan `if_version` (kalau gagal, sesi lain sudah mengambil: lewati), mengerjakan, lalu menulis `selesai` dan balasan. Tidak ada perintah baru = berhenti tanpa kerja lain.
- Perintah yang datang lewat chat: agen lebih dulu mencatatnya di papan sebagai `diproses` (kalau belum ada yang sama), supaya sesi lain dan tugas terjadwal tidak mengerjakannya dua kali.

### Alur anti gagal (owner 2026-11-06 05:43)

Penyebab gagal yang pernah terjadi dikelompokkan, dan setiap kelompok punya penjaga di workflow `jota-produksi`:

| Kelompok | Kejadian | Penjaga |
|---|---|---|
| Alat sistem (apt) | Playwright `--with-deps` 12 menit, apt ffmpeg macet 10 menit | Tanpa apt di jalur utama: cache Chromium dan ffmpeg statis (dua sumber unduhan), apt hanya cadangan berbatas waktu |
| Isi shots.json salah | Image prompt PRO, judul ikut, skala lemah | `cek-brief`, `runner.mjs plan` di awal job (gagal dalam detik, sebelum alat berat) |
| Repo tidak sinkron | Commit belum di-push, perubahan tak ter-commit | `git status -sb` sinkron sebelum dispatch (agen) |
| Run terputus atau gagal di tengah | Batal, timeout, GitHub 500 | Langkah "Lanjut otomatis": dispatch ulang dengan `sudah_terkirim` dari progress.json, klip tidak dibuat ulang; maksimal 2 kali |
| Hasil tidak sampai | Artifact dihapus, unggah Drive | Unggah Drive di job produksi |
| Tidak ada yang tahu | Gagal diam-diam | Kabar Telegram setiap selesai atau gagal, beserta nama langkahnya |

Siklus setiap masalah (wajib): **catat** (bagian 11), **rencana**, **perbaiki** di tempatnya, **cek** dengan run nyata, **tinjau** hasilnya, lalu **perbarui** SKILL.md, CHANGELOG, dan memory proyek.

### Posting terjadwal (owner 2026-11-06 05:15)

- Produksi hanya membuat FINAL, arsip, dan YouTube **private**; tidak lagi membuat draft Facebook (kecuali `facebook_draft: true`). Brief menulis `youtube.privacy: "private"`.
- `jota-posting-harian` (Jota_runner) jalan tiga kali sehari: 07:07, 12:07, 19:07 WIB (owner 2026-11-06 05:47). Tiap slot mengambil baris pertama `apps/videoexpress-runner/antrean-posting.txt`, lalu YouTube public (`youtube-status.mjs`), Instagram Reel, Facebook Reel tayang, kabar ke Telegram, dan baris dipindah ke `riwayat-posting.txt`. Kalau FINAL belum ada, antrean berhenti supaya urutan terjaga; slot kosong dilewati.
- Kapasitas jujur (diukur 2026-11-05/06): satu episode 60 detik sekitar 50 sampai 60 menit di VideoExpress (satu sesi), jadi batas teori 20 sampai 24 episode per 24 jam tanpa gate; target realistis 6 sampai 10 per hari karena gate persetujuan owner, verifikasi hadis, dan batas wajar akun VideoExpress yang belum diketahui. Naik bertahap: 3 slot sekarang, 5 slot setelah antrean konsisten terisi seminggu, lebih dari itu hanya dengan data jangkauan. Instagram tetap maksimal 3 per hari.
- Setelah FINAL selesai dan owner menilainya layak (balas di chat atau Pusat Komando), agen menambah path shots.json ke antrean. Urutan tema berselang: 30 Hari Uwais Hijrah, Ummi yang Hebat, Kisah Saheela, lalu kembali ke Uwais (serial Uwais naik satu hari setiap gilirannya).
- Posting sekarang tanpa menunggu jadwal: dispatch `jota-posting-harian` dengan `jumlah`.
- **Jalur paralel VideoExpress** (owner 2026-11-06 05:50): input `slot` 1 sampai 3 di `jota-produksi` dan `jota-gambar`, grup antrean `jota-vx-<slot>`, satu run per jalur. Status `TESTED` 2026-11-06: jota-gambar Ummi H01 (slot 2, 22:51-22:57 UTC) berjalan bersamaan dengan jota-produksi puasa Saheela (22:26-23:01 UTC); keduanya sukses, sesi VideoExpress tidak saling memutus, gambar jadi dalam 6 menit. Berikutnya uji dua produksi video sekaligus sebelum memakai 3 jalur penuh.
- **Kompilasi setiap 10 episode** (owner 2026-11-06 05:23, monetisasi video panjang): setelah episode ke-10 suatu bagian tayang, `jota-posting-harian` memicu `jota-kompilasi`; FINAL digabung tanpa generate ulang, diunggah YouTube terjadwal Sabtu terdekat 09:07 WIB. Ukuran bagian `kompilasi_per` di dashboard (bawaan 10), judul dari `kompilasi_meta`.
- **Serial aktif** (dashboard di `playbooks/faceless-family-stories/series/`): 30 Hari Uwais Hijrah, Ummi yang Hebat, Kisah Saheela, Umair si Amanah, Ubaid si Kecil, Nasihat Aba, Kakek Hasan dan Dimas (tokoh baru, owner 2026-11-06 09:35). Masing-masing 10 episode tema pertama; hadis di dashboard berstatus kandidat sampai dicek di sumber primer (aturan dalil). Urutan tayang berselang antar serial.

## 9. Kerja dua agen dan status

- Claude dan ChatGPT memakai repo ini sebagai satu-satunya ingatan bersama; pembagian file dan protokol commit di [`AGENTS.md`](../../AGENTS.md). ChatGPT menulis brief di `gpt/productions/` lalu meminta owner atau Claude men-dispatch `jota-gpt-antre`.
- Setiap klaim fitur memakai label: `SPEC` (tertulis, belum ada kode), `IMPLEMENTED` (kode ada, belum diuji di akun), `TESTED` (diuji di akun, dengan bukti proyek), `PRODUCTION_READY` (dipakai di episode yang dinilai owner).
- Status produksi di `RUN_STATE.json` atau `progress.json`: `PLANNED`, `PROMPTS_READY`, `IMAGES_PENDING_APPROVAL`, `SUBMITTED`, `CLIP_READY`, `DELIVERED`, `OWNER_CHECKED`, `PUBLISHED_VERIFIED`. Hambatan: `BLOCKED_VIDEOEXPRESS`, `BLOCKED_HADITH`, `PUBLIC_GALLERY_LEAK`.
- Setiap perubahan aturan: naikkan `version`, tulis `CHANGELOG.md`, dan ubah atau hapus kalimat lama di commit yang sama. Jangan menumpuk blok baru di atas aturan yang bertentangan. Serah terima di bagian atas `OPEN_ITEMS.md`.

## 10. Peta referensi (hanya ini yang aktif)

| File | Dipakai untuk |
|---|---|
| [references/REFERENCE_SHEET_DAN_ARAHAN.md](references/REFERENCE_SHEET_DAN_ARAHAN.md) | USULAN belum teruji: reference sheet tokoh/ruang/lingkungan/benda per sudut, pemakaian 2 slot, arahan 2 detik dan final frame konkret, QC fisika |
| [references/PROMPT_FACELESS_V4.0.0.md](references/PROMPT_FACELESS_V4.0.0.md) | **WAJIB V4**: wajah polos tertanam setiap gerakan timeline, dialog ElevenLabs saja, audit audio dan Last Frame |
| [`references/METODE_PROMPT.md`](references/METODE_PROMPT.md) | Referensi lama NATURAL untuk Image Prompt dan latar historis, bukan standar Video Prompt faceless |
| [`references/BENCHMARK_OWNER_SMOOTH_20261104.md`](references/BENCHMARK_OWNER_SMOOTH_20261104.md) | Bukti uji smooth owner |
| [`../videoexpress-runner/SKILL.md`](../videoexpress-runner/SKILL.md), `PETA_UI.md`, tutorial PDF | Fitur dan tombol VideoExpress |
| [`references/STORYBOARD_SHEETS_GATE.md`](references/STORYBOARD_SHEETS_GATE.md) | Isi tab Google Sheet storyboard (bagian prompt di dalamnya diganti bagian 3 file ini) |
| [`references/SOUND_REMOTION_HADITH.md`](references/SOUND_REMOTION_HADITH.md) | Isi tab suara, Remotion, dan hadis di Sheet |
| [`references/SYARIAT_GAMBAR.md`](references/SYARIAT_GAMBAR.md), [`references/ISLAMIC_HISTORY_SOURCE_POLICY.md`](references/ISLAMIC_HISTORY_SOURCE_POLICY.md) | Batas syariat gambar dan sumber |
| [`references/modul/`](references/modul/README.md) | Prinsip cerita, perilaku anak, fisika benda, kamera, dialog, suara (acuan berpikir; aturan teknisnya sudah dirangkum di file ini) |
| `characters/`, `playbooks/`, `templates/` | Data tokoh, kategori konten, template |
| [`references/PROMPT_PROFESIONAL.md`](references/PROMPT_PROFESIONAL.md) | Hanya metode PRO atas permintaan owner |

Semua file lain di `references/` (CONSISTENCY_RULES, SCENE_WORKFLOW, STORYTELLING_FILM, FACELESS_CHARACTER, CAMERA_LANGUAGE, JOTA_SUPER_QC_ENGINE*, SUARA_TOKOH_KONSISTEN, dan lainnya) adalah **sejarah dan bacaan latar**, bukan instruksi. Kalau isinya berbeda dengan file ini, abaikan.

## 10a. Artistly wajib di setiap episode (owner 2026-11-06 05:01, 07:21, 07:40)

Artistly tidak boleh menganggur. Setiap brief episode juga menjadi **storybook Artistly** (Script To Storybook, Use Reference Photo, Single Page Layout, 9:16): satu halaman per klip, tokoh dari acuan faceless keluarga Uwais, baju adegan boleh bebas, ciri fisik dan skala tetap. Hasilnya dipakai tiga kali:
1. **Storyboard bergambar** di Sheet, berdampingan dengan kandidat gambar VideoExpress.
2. **Konten tambahan**: carousel Instagram dan Facebook dari halaman-halaman itu (posting terjadwal, bukan pengganti video).
3. **Produk**: kumpulan 10 episode menjadi buku cerita PDF atau flipbook untuk dijual (produk digital) dan amal jariyah.

Alur (status):
- `runner.mjs ekspor-acuan` (workflow `jota-runner-uji` mode `acuan`): gambar acuan tokoh dari Media Library ke `characters/acuan/<TOKOH>.png`. `IMPLEMENTED`; percobaan 2026-11-06 gagal login saat tiga jalur sibuk, diulang saat sepi.
- `artistly-runner/brief-ke-naskah.mjs <brief.json>`: naskah storybook di `<produksi>/storybook/naskah.json` (maks 5000 huruf, maks 4 acuan). `TESTED` untuk Uwais H07 dan Ummi H01 (4099 dan 4531 huruf).
- `artistly.mjs komik <naskah.json>` (workflow `artistly-runner` mode `komik`) membuat gambar. `IMPLEMENTED`; riwayat KOMIK-H01: unggah acuan berhenti di 33% dan buku lama berwajah sempat terambil, jadi setiap hasil diperiksa lembar gambarnya (wajah, skala) sebelum dipakai.
- Gambar Artistly ke Media Library VideoExpress untuk dipakai sebagai gambar awal: `SPEC` (Import Media belum diuji).

- `artistly.mjs gambar-v6 <naskah.json>` (workflow `artistly-runner` mode `gambar-v6`): AI Image Designer v6, satu prompt per halaman, 9:16, Private, 2 gambar per halaman, ke `<produksi>/storybook/gambar/`. Tidak butuh foto acuan, jadi dipakai untuk tokoh baru. `IMPLEMENTED`, pilot pertama Kakek Hasan dan Dimas E01 dan E02 (owner 2026-11-06 09:35).
- Tokoh baru tanpa foto acuan di Media Library (`tokoh.json` tanpa `ref`): `dari-brief.mjs` tidak memakai Consistent Character untuk klip itu; konsistensi dari kalimat penampilan lengkap di Image Prompt. Begitu gambar Artistly atau VideoExpress terpilih, simpan sebagai acuan tokoh di Media Library dan isi `ref`.

Animasi teks tetap Remotion. ElevenLabs Text to Animation diperiksa 2026-11-06: model video pihak ketiga, berkredit, bukan API, tidak dipakai.

## 10b. Daftar periksa wajib (disusun dari semua kesalahan di bagian 11)

Agen menjalankan daftar ini setiap kali; satu butir gagal = berhenti dan perbaiki dulu.

**Sebelum dispatch apa pun**
1. `git pull --rebase`, lalu `git status -sb` sinkron (tidak ahead, tidak ada perubahan tak ter-commit).
2. Baca commit terakhir di kedua repo; kalau ada sesi lain yang mengubah hal yang sama, gabungkan dulu (cron ganda, aturan ganda).
3. Cek grup jalur: satu run per `slot`; jangan menambah run tertunda kedua di jalur yang sama. Kalau ada run yang gagal login dalam satu jam terakhir, jangan dispatch apa pun sebelum satu uji login berhasil.
4. Brief lolos `cek-brief`, shots.json lolos `runner.mjs plan`, `test.mjs` lolos bila kode berubah.

**Saat menulis brief**
5. Klip sesudah pelukan atau wajah tertutup: klip BARU satu tokoh, bukan SAMBUNG. Tokoh membelakangi lalu berbalik atau menoleh: First Frame, Last Frame.
6. Dua tokoh sebaya atau sejenis tidak dalam satu shot; dua tokoh beda usia selalu dengan skala tertulis.
7. Shot tanpa orang: kalimat "empty scene"; periksa gambar ujinya, karena VideoExpress bisa menambah orang.
8. Penampilan khas (kacamata Uwais) harus ada di gambar acuan Media Library; kalau acuan belum punya, catat dan minta owner atau buat lewat Smart Edit.

**Sebelum FINAL masuk antrean posting**
9. `bash apps/videoexpress-runner/lembar-frame.sh <PROJECT>`, lalu buka lembar.jpg: tidak ada mata, hidung, mulut; skala orang tua dan anak benar; tidak ada orang asing; teks di layar benar (matan Arab tampil sebagai kartu, bukan subtitle salah dengar).
10. Video revisi: bandingkan lembar lama dan baru di detik yang direvisi; kalau sama, klip lama terpakai (cek log `findCard`).
11. Hanya video yang lolos 9 dan 10 yang ditambahkan ke `antrean-posting.txt`.

**Setiap masalah**
12. Catat di bagian 11 (tanggal, kejadian, pencegahan), perbaiki di tempatnya, uji dengan run nyata, perbarui CHANGELOG, memory proyek, dan serah terima OPEN_ITEMS.
13. Hindari aksi yang memunculkan kotak persetujuan di HP owner (menghapus atau mengubah tugas terjadwal yang terikat Mac); biarkan pengingat lama berjalan dan abaikan.

## 11. Kesalahan yang pernah terjadi dan pencegahannya

| Tanggal | Kesalahan | Pencegahan sekarang |
|---|---|---|
| 2026-11-09 | SHOT04: Save hanya dicari di slide; toolbar modal terlewat, PR #18 belum memperbaiki scope. Batas library kosong 0 juga salah dianggap snapshot | Runner 0.18.4: Save UI sesuai single/pair, receipt mediaId privat, exact asset readback dan SHA-256, reload dan Choose dari My AI Images, journal antiduplikasi. TESTED satu gambar: run 42575475145, mediaId 48060154, reload dan Choose dari My AI Images berhasil; auto:false dan QC gate tetap |
| 2026-11-05 | Image Prompt natural masih blok PRO (MANDATORY RULES, AVOID) | `dari-brief.mjs` menulis satu paragraf; validator menerima `image_format: natural` |
| 2026-11-05 | Judul klip ikut terketik di Video Prompt | Video Prompt hanya `TAG-SHOTxx:` lalu prompt |
| 2026-11-05 | Image Type masih 3d | Bawaan `human` |
| 2026-11-05 | Skala ibu dan anak lemah, berisiko tampak sepantar | Image Prompt selalu menulis umur, tinggi cm, posisi kepala berdiri dan duduk, hubungan orang tua dan anak |
| 2026-11-05 | Sheet di Drive tidak ditulis ulang setelah brief berubah | Setiap brief atau shots.json berubah: `jota-sheet-sync tulis` di giliran yang sama |
| 2026-11-05 | Commit lupa di-push sebelum workflow jalan | `git status -sb` harus sinkron sebelum dispatch |
| 2026-11-05 | Unggah Drive bergantung pada artifact yang dihapus | Unggah Drive di job produksi |
| 2026-11-05 | ID file Drive tampil di log publik (defaults per job menimpa shell penyamar) | Shell penyamar ditulis di defaults setiap job |
| 2026-11-05 | Run macet 40 menit di apt-get | `DEBIAN_FRONTEND=noninteractive`, stdin `/dev/null`, batas 10 menit |
| 2026-11-06 | Run produksi dibatalkan tanpa catatan; perubahan brief tidak ter-commit di folder kerja | Sebelum dispatch: `git status` bersih dan sinkron, lalu catat alasan pembatalan |
| 2026-11-06 | apt-get ffmpeg macet lagi meski noninteractive (run 42114419455, puasa Saheela gagal) | apt dibatasi 4 menit, cadangan ffmpeg statis; lewati kalau ffprobe sudah ada |
| 2026-11-06 | Playwright `--with-deps` makan 12 menit (apt lambat) | Chromium tanpa apt dari cache; install-deps hanya bila Chromium tidak bisa jalan |
| 2026-11-06 | jota-gambar H07 dan UMMI01 gagal: gambar belum jadi dalam 4 menit saat VideoExpress sibuk, run berhenti di shot pertama yang lambat | Tunggu 10 menit per gambar, lanjut ke shot berikutnya, kandidat digabung, lanjut otomatis 2 kali; diagnosa ke Drive |
| 2026-11-06 | Antrean GitHub satu grup `jota-produksi` hanya menyimpan satu run tertunda; run tertunda ketiga membatalkan yang kedua | Agen men-dispatch run VideoExpress baru hanya saat grup kosong atau satu berjalan; antrean panjang lewat `antrean.txt` |
| 2026-11-06 | Dua sesi Claude mengerjakan permintaan yang sama bersamaan; cron posting tertulis ganda (posting bisa dobel per slot) | Satu sesi saja per permintaan; sebelum mengubah workflow: `git pull` dan baca diff commit terakhir; cron dicek tidak ganda |
| 2026-11-06 | Puasa Saheela SHOT05 berwajah (SAMBUNG dari frame pelukan SHOT04); video hampir tayang otomatis | Ditahan dari antrean posting; SHOT05 jadi klip BARU satu tokoh, revisi 2 hanya SHOT05; aturan bagian 5 ditambah. Sebelum masuk antrean posting, owner menilai FINAL dulu |
| 2026-11-06 | Gambar awal klip tanpa orang (UMMI01 SHOT07) memunculkan pria kartun berwajah; Uwais tanpa kacamata di semua kandidat | Image Prompt tanpa orang dibuka "An empty scene with nobody in it" dan ditutup "stays completely empty of people"; kacamata Uwais butuh acuan Uwais_soleh berkacamata di Media Library (owner) |
| 2026-11-06 | Revisi 2 SHOT05 sudah dirender ulang (R2), tetapi FINAL masih memuat klip lama berwajah; kartu R2 bernama prompt enhance dan pencarian kartu lewat teks nama ambigu | `findCard` menolak kecocokan nama yang lebih dari satu dan mencatat jalur pencarian; agen selalu membandingkan frame FINAL lama dan baru di bagian yang direvisi |
| 2026-11-06 | Menghapus pengingat terjadwal memunculkan kotak persetujuan berulang di HP owner | Pengingat lama dibiarkan; pengingat baru hanya bila perlu (daftar periksa 13) |
| 2026-11-06 | FINAL Uwais H07: mulut Ukasyah muncul di SHOT05 (detik 31-33), tokoh menunduk sambil bicara; lembar frame 1 detik 150 px terlalu kecil untuk melihatnya | Ditahan dari antrean posting; SHOT05 diulang (revisi 2) dengan kepala tegak; `cek-brief` kini memeriksa pose terbukti di kartu klip (sebelumnya hanya brief "shots" lama) dan menolak menunduk; periksa wajah dengan potongan frame besar di detik tokoh bicara |
| 2026-11-06 | Revisi 2 H07 SHOT05 (run 42134088915) terkirim ke VideoExpress, tetapi FINAL v2 sama dengan v1 (SSIM 0,98 di semua detik, termasuk SHOT05); kartu `-R2` "ditemukan" 2 menit setelah dikirim, sebelum render selesai. Perbaikan findCard v4.5.1 belum cukup | Belum diperbaiki: findCard/namaKartu untuk label `-R2` wajib menolak kartu yang dibuat sebelum waktu kirim (cocokkan job id atau waktu), dan finish menunggu status completed kartu baru. Sampai itu, revisi satu shot dianggap tidak andal; agen selalu membandingkan SSIM FINAL lama dan baru di detik revisi |
| 2026-11-06 | Matan hadis Arab dibaca narator tampil sebagai subtitle karaoke Whisper yang salah ("Leisa Shadidu Vesura") di Uwais H07 | `hadis-waktu.mjs`: narasi berhuruf Arab selalu jadi kartu kutipan utuh dengan sumber dari `sources`; daftar periksa 9 juga memeriksa teks di layar |
| 2026-11-06 | Tiga jalur paralel: kartu klip lama keluar dari 40 kartu terbaru, finish gagal "Kartu PUASA01-SHOT02 tidak ada" (puasa dan Ummi H01) | Daftar kartu dibaca 200 terbaru |
| 2026-11-06 | Ulang otomatis dan beberapa dispatch beruntun membuat sekitar sepuluh login VideoExpress dalam 30 menit; sejak 00:23 UTC semua login ditolak | Gagal login ditulis ke `gagal-login.txt` dan menghentikan ulang otomatis; setelah gagal login, jeda 60 menit lalu satu uji login (`jota-runner-uji` mode login) sebelum dispatch lain; maksimal 3 jalur hanya bila login sehat |
| 2026-11-06 | Finish puasa berhenti: tiga kartu SHOT05-R2 bernama prompt enhance yang sama (kiriman ulang), kartu tidak bisa dipilih; ulang otomatis mengulang gagal yang sama | `findCard` memberi kartu yang prompt-nya diawali label nama label lewat API library (`edit_item`), lalu mencari lewat label; ulang otomatis untuk galat yang sama dibatalkan manual |
| 2026-11-06 | Artistly gambar-v6 E01: galeri lama (gambar Saheela) dan gambar halaman sebelumnya ikut tersimpan, halaman bergeser satu | Semua URL yang pernah terlihat dicatat lintas halaman, daftar diambil ulang tepat sebelum Generate (tunggu 8+3 detik), gambar yang isinya kembar ditolak; pratinjau wajib dicek sebelum dipakai |
| 2026-11-06 | Uwais H07 FINAL masih menampilkan mulut (SHOT01 Ukasyah, SHOT05-R2, klip Uwais bicara); lembar 150 px tidak menampakkannya | `lembar-frame.sh` juga membuat `wajah.jpg` (separuh atas, 360 px, tiap 2 detik); video tidak masuk antrean bila satu wajah punya mulut atau mata. Klip bicara tetap berisiko: usulan ke owner |
| 2026-11-06 | Login VideoExpress ditolak lagi 02:51 UTC setelah tiga login dalam 10 menit | Maksimal satu login per 20 menit per akun; setelah ditolak tunggu 60 menit lalu satu uji login. Rencana: simpan sesi terenkripsi agar tidak login tiap run (OPEN_ITEMS) |
| 2026-11-06 | Artistly gambar-v6 masih bergeser satu halaman: hasil generate sebelumnya muncul terlambat di galeri dan terambil sebagai gambar baru (halaman 1 berisi gambar terakhir run sebelumnya) | Sebelum Generate, galeri ditunggu sampai stabil (3 x 5 detik tanpa gambar baru, maks 90 detik). Gambar E01/E02 hanya dipakai sebagai acuan tokoh; untuk storyboard dibuat ulang |
| 2026-11-06 | Ummi H01 FINAL: wajah lengkap Uwais dan Saheela di SHOT04 (tokoh membelakangi lalu menoleh) dan wajah Saheela saat memeluk di SHOT06 | Membelakangi lalu berbalik/menoleh = First Frame, Last Frame (gambar akhir menghadap kamera faceless), otomatis dari `dari-brief.mjs` (owner 15:58). Tidak ada pelukan atau wajah menempel, ganti sentuhan tangan. Revisi memakai `suara_el` agar klip revisi bersuara ElevenLabs tanpa menggandakan suara native klip lain |
| 2026-11-06 | Puasa (klip 2026-11-05): kartu sudah bernama label di API tetapi tidak ditemukan di daftar kartu halaman; finish dua kali menunggu 50 menit lalu gagal | Kesiapan klip dicek lewat API (alamat video dan durasi) sebelum daftar kartu; bila klip tidak bisa dimasukkan ke timeline VideoExpress, video dirakit lokal dengan ffmpeg dari klip asli (`rakitLokal`, atau `JOTA_RAKIT=lokal`) |
| 2026-11-06 | Ummi H01 revisi 2 dirakit dengan klip LAMA SHOT04/SHOT06: data prompt kartu lama ikut menunjuk prompt kiriman terbaru (gambar awal sama), runner menamai kartu lama sebagai -R2 dua menit setelah kirim | Saat kirim, id kartu video terbesar dicatat (`lib_batas`); kartu dengan id tidak lebih besar diabaikan untuk label itu. Lembar wajah revisi wajib dibandingkan dengan versi lama: bagian revisi harus berbeda |
| 2026-11-06 | Ummi H01 revisi 3: First Frame, Last Frame gagal dua kali (Last Image tidak muncul 200 detik); finish tetap merakit tanpa SHOT04 dan SHOT07 lalu menimpa FINAL di Drive | Finish berhenti bila ada klip belum jadi (`JOTA_BOLEH_BOLONG=1` hanya atas perintah). Last Image gagal kini menyimpan tangkapan layar dan isi dialog untuk diagnosa |
| 2026-11-06 | Uwais berkacamata tidak bisa dibuat di VideoExpress (Consistent Character + kacamata selalu memunculkan wajah, dua kali) | Acuan tokoh dibuat di Artistly (faceless), diimpor lewat Import Media > Import from Artistly ke folder My Artistly Images, diberi nama tokoh (`namai-artistly id=nama`), lalu dipakai sebagai `ref` { library, name } di tokoh.json. Impor otomatis (`impor-artistly`) masih dikerjakan: centang kartu belum kena |
| 2026-11-06 | H07 revisi 2: Uwais tetap tanpa kacamata walau acuan berkacamata; Image Prompt tidak menyebut kacamata (regex penghapus kalimat wajah ikut membuang aksesoris, `aksesoris` brief tidak masuk Image Prompt) | `descI` menambah `aksesoris` brief ke Image Prompt ("wearing ... on the smooth blank face"); cek Image Prompt memuat semua aksesoris tokoh sebelum produksi |
| 2026-11-06 | YouTube Puasa gagal: "The user has exceeded the number of videos they may upload" (setiap finish ulang mengunggah salinan private) | Produksi tidak lagi mengunggah ke YouTube; unggahan YouTube hanya saat posting, langsung public. Batas unggah pulih sekitar 24 jam |
| 2026-11-06 | H07 revisi 3: kacamata muncul di klip BARU (02, 06) tetapi hilang di klip SAMBUNG (03, 04) | Klip tokoh berkacamata dibuat BARU dengan acuan berkacamata, bukan SAMBUNG; atau kacamata disebut lagi di setiap Video Prompt |
| 2026-11-06 | H07 revisi 4 (semua klip Uwais BARU + Consistent Character Uwais_kacamata + lensa berkilau): kacamata konsisten, tetapi wajah lengkap muncul di SHOT03 dan mata di balik lensa di SHOT04 | Kacamata pada tokoh faceless di VideoExpress tidak bisa dijamin bersih (5 percobaan). Jangan beri aksesoris di area wajah (kacamata, masker) pada tokoh yang tampil di klip video; menunggu keputusan owner untuk Uwais . Revisi 5 dengan kalimat ringkas ("glasses", "Keep Uwais faceless", owner 20:55) juga memunculkan mata dan mulut di SHOT03 |
| 2026-11-07 | Juru masak perempuan di video resep memakai lengan digulung sampai lengan bawah (aurat) | Video resep tangan (owner 04:35, "tetap syar'i, pakai jilbab"): juru masak perempuan berbaju syar'i, lengan panjang sampai pergelangan (tidak digulung), khimar menutup dada, hanya telapak dan punggung tangan yang terbuka; kepala tetap di luar frame |
| 2026-11-07 | FATAL (owner 04:53): satu gambar storyboard rendang (acuan juru masak) menampilkan wajah lengkap dan sempat dikirim ke owner | Setiap gambar Artistly disaring otomatis dengan deteksi wajah OpenCV (`saring-wajah.py`, langkah wajib di workflow gambar-v6); gambar berwajah dibuang sebelum disimpan. Naskah memotong frame di tulang selangka. Agen memeriksa setiap gambar sebelum dikirim ke owner |
| 2026-11-07 | Video rendang: audio FINAL hanya 8 detik (narasi dan foley hilang); kartu penutup resep membuat ekor hitam | `narasi-tokoh.mjs`: amix duration=longest + apad + atrim sepanjang video, dan gagal keras bila audio lebih pendek dari video. `bungkus.sh` masak: keluaran dipotong -t durasi video |
