# Object ASMR POV — preset v1.0.0

Status: IMPLEMENTED; pengujian mekanisme dicatat di OPEN_ITEMS dan logs. Belum teruji produksi VideoExpress/MP4/Drive untuk preset ini. Ini adapter worker Mac existing, bukan workflow atau sesi browser baru. Tidak ada posting.

## Pemakaian

Contoh lengkap: `apps/videoexpress-runner/examples/brief-object-asmr.json` (18 detik, tiga shot console orisinal). Salin ke folder proyek baru, ganti project/tag unik. Dari root instalasi Mac:

```sh
node Jota_runner/local/jota.mjs enqueue siapkan gpt/productions/JOTA-M1-OBJECT-ASMR-UNIK object-prepare-unik
```

Baca `local-state/runs/object-prepare-unik/stage.json`, worker.log dan storyboard-local.json. Prepare tidak menghasilkan gambar. Untuk produksi eksplisit: brief `auto:true`, `automation.video_after_qc:true`, lalu aksi `buat` sekali dengan ID baru. Aksi `gambar` tidak perlu produksi penuh; gate tetap aktif. Upload brief JSON Telegram diterima; percakapan penulis cerita/cast manusia dan paket jota.authoring-draft.v1 belum menjadi generator objek. Jangan mengklaim dukungan intake natural-language object penuh.

## Brief dan descriptor

`preset:object_asmr_pov`, `concept` wajib, `objects[]`, `shots[]`. Default durasi 30 detik (umum30–60), ratio9:16; durasi target eksplisit boleh18detik/15–30untuk contoh. Setiap shot3–8detik, total tepat duration; pecah shot panjang secara eksplisit. Ratio16:9 juga diterima. Image Type `photorealistic` adalah nilai opsi Photorealistic (Cinematic) existing di peta UI/validator, bukan tombol preset ASMR. Creative/Enhance/gallery OFF; verifyBeforeCreate existing membaca nilai aktual. Belum diuji live preset ini.

Field: sequence_mode chronological(default)/comparison/single_object/collection; hands_mode hands_only(default)/none; camera_style macro_mix(default)/pov/high_angle_45/straight_on. macro_mix bergantian POV dan45°. Shot.camera boleh macro_detail. Kamera statis, close-up memperlihatkan kontak/destinasi, hard cut sesudah aksi, tanpa orbit. narration_enabled defaultfalse; musicfalse wajib; object_physics_strict defaulttrue. False tidak mematikan gate teknis/visual. sfx_style mendeskripsikan foley realistis; text_overlay_style none(default)/minimal (Remotion).

Objek: object_id unik, name, quantity integerpositif, geometry/dimensi, color, material. Opsional allowed_changes/forbidden_changes dan reference milik proyek/preset sendiri dengan library My AI Images/name/mediaId/sha256; identity readback existing tetap wajib. Maksimal dua reference UI per shot. Tanpa reference memakai deskripsi registry, tidak ada fallback keluarga/manusia; ini belum jaminan identitas antargambar sempurna.

Shot: shot_id unik SHOT01, title, duration, primary_object, secondary_objects, start_state, end_state, action_timeline lima fase contiguous (`phase,start,end,action,cause`): establish→approach→contact→interact→settle. Waktu mulai0, akhir tepat durasi. Deskripsikan dukungan, tangan/force cause, kontak, lintasan dan kondisi akhir. Chronological dengan primary_object sama memerlukan end_state→start_state identik. Single_object memerlukan satu definisi. Collection/comparison tetap mengunci registry, bukan identitas baru dari perubahan nama.

Output juga memuat object_registry, timeline global, camera, hands_mode, visual_prompt/image_prompt, video_prompt, qc_profile, foley/sfx_plan, overlay dan preset/signature/revision. Semua tersinkron ke tab existing STORYBOARD, OBJECT_REGISTRY, AUDIO_CUES dan manifest lokal; gambar belum selesai sebelum Save/readback/QC nyata. LAST_FRAME objek sengaja ditolak pada v1: belum ada bukti source-state/camera continuity live. Faceless/stickman tetap mengikuti aturan existing.

## Audio dan QC

Narasi OFF tidak memanggil TTS kosong; ON hanya NARATOR/voice lock existing, tidak memaksa suara karakter. SFX wajib1–3cue/shot, `t` pada fase contact/interact dan dua detik muat dalam shot (batas foley existing). Pipeline ElevenLabs menghasilkan cue, ffmpeg menaruhnya sesuai waktu; native VideoExpress dibuang. SFX gagal menghentikan final, tidak diam-diam memakai audio native. `object-audio-evidence.json` mencatat cue/durasi, bukan klaim mendengar ketepatan onset SFX. Sinkron perceptual masih perlu pemeriksaan hasil nyata. Tanpa musik.

QC `object-asmr-v1`: profil mandiri object identity/count, geometri/material/palet, support/kontak/tidakclipping/float, start-state terbaca, no human heads/faces/reflections; tangan/fingers/grip hanya bila terlihat, hands_mode none melarang tangan. Independent head screen tetap menolak kepala termasuk blank. Objek bersama antarscene diperiksa lewat komposit anchor pilihan QC sebelumnya versus kandidat, dengan keputusan identitas terikat hash kedua gambar; anchor hilang/stale menahan kelanjutan. Kriteria identitas/baju/keluarga manusia tidak dipakai; kolom legacy ditandai NA sebagai jembatan format saja, gate mandiri tetap wajib.

Kalibrasi kontrol sintetis satu/dua perangkat + kontrol kepala berfitur terikat SHA harus lolos; ini kontrol kecil, **bukan benchmark lengkap model objek/tangan/gerak**. Error/ambigu=REVIEW, bukan PASS. Klip:1FPS + awal fase + frameakhir, pemeriksaan tiapframe terpilih dan contact sheet berurutan untuk kausalitas/lintasan/start/end. Sampling tidak membuktikan seluruh frame atau gerak natural sempurna; audio tidak diperiksa dari gambar. Bukti terikat preset/signature/job/URL/prompt/registry/hashframe/contactsheet/clip; assembly memeriksa hashbytes hasildownloadlagi. Aset stale/missing, job ambigu dan klip tidak lengkap ditolak.

Shared retry maksimal3 dan REVIEW tetap. Recheck calibration/transport bukan alasan render kreatif tanpa batas. Recovery memakai laporan object-clip-qc, rencana causal object dan kamera statis, validator revisi terpisah. Repair video-only harus menjaga start_state persis; perubahan komposisi perlu redraw. Reference registry yang berubah wajib diimpor/diikat ulang pada proyek revisi, tidak cross-preset. Paket ChatGPT preserve_prompts tetap memerlukan revisi ChatGPT, bukan GPTmini diam-diam. Assembly, checkpoint lokal, delivery Drive Desktop dan readback server mengikuti mekanisme existing; receipt salinan lokal bukan MP4 server-terverifikasi.

## Batas bukti

Test observer injection memeriksa mekanisme, bukan QC visual nyata. Smoke prepare resmi dapat dibuktikan tanpa browser/produksi. Generasi gambar, kalibrasi model nyata, animasi, SFX, assembly dan Drive live preset ini harus dibuktikan tersendiri sebelum klaim teruji produksi. Publikasi tetap memerlukan approval terpisah.
