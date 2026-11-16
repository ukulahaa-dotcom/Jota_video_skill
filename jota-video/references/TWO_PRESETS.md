# Preset JOTA — audit dua preset 2026-11-10 dan ekstensi objek Mac 2026-11-11

Registry aktif sekarang faceless, stickman, object_asmr_pov dan cartoon_2d (operator Mac opt-in; lihat CARTOON_2D_MAC.md). Profil dan bukti runtime Mac terbaru: MAC_RUNTIME.md; detail preset objek: OBJECT_ASMR_PRESET.md. Audit GitHub di bawah adalah sejarah sebelum migrasi, bukan antrean aktif Mac. Default dua preset existing tidak berubah.

Audit dua preset historis: IMPLEMENTED; TESTED lokal; status pilot saat audit di bawah bukan status Mac terkini.

Audit awal: main `ff05a19`, JOTA 4.22.1/Runner Skill1.9.1/kode0.21.1. Manifest VERSI-JOTA tertinggal (4.21.1), sehingga versi aktual dibaca dari frontmatter/package. KETUKAN run42725599803 dan review42729332773 tercatat berjalan/pending; tidak diubah. Main terus menerima checkpoint/status; perubahan ini di cabang terpisah.

Workflow nyata: antrean `gpt/perintah.json` → penjaga publik `Jota_runner` (jeda login/slot1–3/antiduplikasi) → prepare-project/cek-brief/dari-brief → shots → jota-gambar → Save + mediaId + hash + readback/Choose → local face/visual QC → after-image-qc/progressive → jota-produksi → runner submit job/checkpoint → finish completed clip → ffmpeg → narasi-tokoh ElevenLabs/SFX → Remotion teks bila diminta → upload-drive receipt. Dispatch, preview dan nama file saja bukan bukti selesai. Prototipe backend/frontend lokal bukan jalur produksi.

## Kontrak

- `preset` menerima `faceless`/`stickman`/`object_asmr_pov`; objek memakai adapter dan QC terpisah pada runtime Mac. Tidak ditulis = faceless, tanpa migrasi brief/shots/antrean existing. Adapter faceless menyimpan konstanta, referensi, default, prompt, validasi dan gate lama. Descriptor `presets/faceless.json` menunjuk jalur lama; tidak mengoverride parameternya.
- Stickman memakai `presets/stickman.json`, `stickman.mjs`, `stickman-characters.mjs`, `stickman-qc.mjs`, `stickman-clip-qc.mjs`. Infrastruktur runner/antrean/login/Save/audio/ffmpeg/Drive tetap satu.
- Preset/config/signature brief/storyboard, karakter, shot/QC, timeline, job dan progress tersimpan per folder proyek. Checkpoint stickman terikat signature; perubahan desain/cerita membutuhkan folder/tag revisi baru. Tidak menimpa hasil lama. Ref hasil QC memuat preset, project, mediaId, nama unik, SHA, design signature. Karakter dan scene menggunakan label/tag berbeda.
- Character-first: workflow bersyarat stickman memasang model CPU existing, membuat desain melalui runner gambar, QC tanpa klaim approval owner, memverifikasi library, lalu memasang refs. Tiga pemeriksaan gagal menghasilkan REVIEW karakter; scene ditahan karena belum punya referensi sah. Tidak merender video referensi gagal sekadar untuk melewati gate.
- UI: opsi Image Type `2d` tercatat dalam PETA_UI dan Runner Skill (Human/2D/3D/Photorealistic/Other). `verifyBeforeCreate` membaca nilai aktual dan menolak mismatch. Creative OFF, Enhance OFF, Gallery OFF; tidak ada tombol bernama stickman yang diasumsikan.

## Brief

Contoh stickman: `apps/videoexpress-runner/examples/brief-stickman.json` (15 detik, tiga klip). Contoh faceless eksplisit: `apps/videoexpress-runner/examples/brief-faceless.json`; contoh lama `brief-preparation-test.json` tidak diubah.

Stickman: project/tag unik, duration (default60), ratio (9:16 default atau16:9), narration_enabled (defaulttrue), language(defaultid), concept/script, characters. Setiap desain mencakup head/proportions/line_width/palette/clothing/props/body_language/background. Referensi pengguna diimpor ke proyek dengan identitas media nyata lalu dipakai untuk desain/QC; tidak menganggap nama saja sebagai referensi lolos.

Setiap kartu klip: judul, detik3–10, tokoh, tujuan, emosi, lokasi, properti, kamera(posisi/gerak/fokus), awal, aksi[], akhir, transisi, tempo/environment_motion opsional, dialog[{voice,text,t}], narration, ambience, foley. Total wajib duration. Pecah scene panjang secara eksplisit agar keadaan antara tidak dikarang. Generator memberi ID/timeline/prompt/QC dan Sheet existing membaca metadata itu. Storyboard bergambar belum selesai sebelum Save/QC aset tersedia.

`narration_enabled:false` menghapus TTS; SFX/ambience masih boleh. Tanpa audio apa pun menghasilkan video hening dengan native audio sudah dibuang. Dialog memerlukan voice_locks per karakter (voice_id/suara tetap); NARATOR memakai voice existing. Teks ucapan tidak masuk prompt visual. Timing strict menolak audio yang tidak muat. Tidak ada blok youtube/facebook di preset stickman.

## QC dan batas bukti

QC teknis existing tetap: kandidat/hash, mediaId Save/readback, tidak stale, job/checkpoint antiduplikasi, durasi dan semua klip tersedia. Profil stickman memeriksa kepala bulat kosong, garis/proporsi/palet/anggota badan, aksi terbaca, gaya2D, setting/properti storyboard; tidak memakai grader kulit/rambut/anatomi realistis. Kalibrasi memakai fixture2D kepala kosong dan kepala berwajah; kegagalan model = REVIEW, bukan PASS. Ini kontrol kecil, bukan bukti model sempurna.

QC klip mengambil frame awal/tengah/akhir. **Sampling bukan pemeriksaan seluruh frame atau jaminan kontinuitas temporal penuh.** LAST_FRAME stickman memerlukan QC sumber, cast/lokasi/keadaan yang sama, maksimal tiga sambungan. Klip gagal ditahan; review existing tetap dibedakan dari PASS. Assembly stickman menolak klip hilang termasuk override bolong, mendukung kanvas16:9, memangkas klip ke durasi shot; audio native tidak disalin.

Tanpa musik/detail wajah; Allah/nabi/malaikat tidak digambarkan. Dalil perlu sumber/teks/URL/verifikator nyata; cerita pilot adalah fiksi pembawa hikmah, bukan peristiwa hadis. Publikasi tetap memerlukan persetujuan terpisah existing; pilot tidak posting.

## Pengujian

`node apps/videoexpress-runner/test.mjs` PASS termasuk test-presets: default lama, output faceless byte-identik SHA256 `26950dceacd8f7f6f3810930066ee0b5823892bef5c198c833f2cc8eff621d6a` terhadap generator audit ff05a19, unknown preset, 2D tanpa keluarga/3D, resume/signature, refs lintas proyek, narasiON/OFF, QC profile fail-closed, assembly tidak lengkap, route shared, metadata sosial kosong. `test-image-save.mjs` Chromium PASS lokal (sandbox syscall memerlukan eksekusi di luar sandbox). Model inference yang dimock hanya bukti kontrol alur, bukan QC produksi.

Kartu teks stickman opsional: `on_screen_text:[{text,t,duration}]` per shot; `hadis:{teks,sumber}` hanya jika cocok tepat dengan `verified_sources:[{text,source,url,verified_by}]`. Komposisi Remotion `StoryCards` menghasilkan overlay transparan lalu ffmpeg mencampurnya tanpa menambah durasi. Kegagalan kartu wajib menghentikan delivery. Render sintetis3detik lokal TESTED dan gambar dibuka: gpt/audits/TWO-PRESETS-20261110; ini bukan klip pilot VideoExpress.

Tambahan verifikasi mekanisme media: `node apps/videoexpress-runner/test-stickman-media.mjs` PASS (ffmpeg nyata, inferensi visual mock; bukan QC produksi). Cache PASS hanya dipakai setelah hash byte klip dibaca kembali. Pemilihan ref stickman memeriksa mediaId dan nama unik My AI Images; ref dari folder lain perlu diimpor dahulu. Kegagalan ambience/foley yang diminta menghentikan delivery stickman.

Temuan CPU aktual: full-grader memberi PASS salah pada fixture berwajah (audit failed-full-grader-calibration.json). Karena itu kelulusan wajah tidak boleh berdasarkan grader yang mengetahui target desain. Observer netral dengan schema permukaan membaca kontrol kosong PASS_LOCAL dan bermata REJECT; gabungan gate baru `independent_surface_and_profile_v1` lolos dua kontrol nyata. Hasil kedua komponen disimpan, bukan menyunting hasil grader lama. QC klip juga memakai observer permukaan independen. Ini bukan jaminan seluruh model akurat; kontrol3D dan pilot tetap perlu bukti.

Pilot live: PENDING. Wajib isi run, mediaId dan QC aktual, job/clip, ffprobe output serta readback MP4 Drive setelah tersedia. Tanpa bukti itu status belum teruji produksi.

## Bukti live pertama (2026-11-10)

Persiapan42734721343 SUCCESS termasuk regression Node22. Gambar42737284900 menghasilkan referensi BUDI mediaId48173319 (Save/readback/QC gabungan PASS) dan enam scene library-verified (48173728/731,48173788/793,48173890/892). Bukan bukti video selesai. Workflow gagal pada checkpoint sebelum QC scene: referensi yang dipasang mengubah shots.json, tetapi daftar checkpoint progresif tidak memasukkan file itu sehingga git pull--rebase tertahan perubahan belum di-stage. Fix khusus stickman menambahkan shots.json ke checkpoint. Source assets/QC/budget tetap disimpan; percobaan1 SHOT01 RUNNING yang terputus tidak dihapus/reset.

ChatGPT membuka referensi dan seluruh6kandidat. Kedua SHOT03 menampilkan dompet di tangan DAN bangku; benda=FAIL dicatat beserta hash dalam awal/manual-visual-audit.json. Tidak ada PASS palsu. Kandidat lain tetap menunggu QC lengkap. Kontrol negatif3D CPU nyata ditolak (classic_2d FAIL), bukti three-dimensional-negative.json; itu hanya kontrol penolakan, bukan acuan stickman.

## Hambatan akses setelah pilot

GitHub kemudian menolak Git fetch/push, REST user/repo, dan connector get_repo dengan HTTP403 `Sorry. Your account was suspended`. Penyebab suspensi tidak diketahui; tidak mengubah akun/token atau mencoba login tambahan. Fix checkpoint da1e6a4 dan audit FAIL tersimpan lokal tetapi belum dipush. Regresi Git bare/temp mereproduksi kegagalan dirtyshots+remoteadvance, lalu staging shots bersamaQC berhasil tanpa kehilangan statusremote. Pilot tidak mempunyai job video atau MP4 Drive. Setelah akses pulih, terapkan pendingpatch, periksa status/main dan antre satu retrygambar denganhashaktual; tidak mengubah/reset QCbudget atau memakai asetstale.

Log Sheet pilot mengabaikan lima kolom STORYBOARD baru yang tidak ada dalam template. Fix lokal menampilkan timeline/tujuan/emosi dalam kolom SCENE yang sudah dikenal; preset/QC juga ada dalam EPISODE. Row generation diuji, tetapi readback Sheet setelah fix belum dapat dilakukan karena GitHub diblokir.
