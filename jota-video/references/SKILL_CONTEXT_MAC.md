# Isi skill penuh pada model Mac

Full source bundle: JOTA SKILL, runner SKILL, MAC_RUNTIME dan QC_RECOVERY. Faceless menambah master prompt video V4 dan image V6. Stickman menambah TWO_PRESETS dan descriptor2D; contoh manusia/3D pada manual bersama tidak berlaku untuk stickman. Source lengkap disisipkan sebagai dokumen berlabel file/hash, bukan hanya judul/tautan/ringkasan. Guide Hermes lokal juga diinjeksi saat Hermes dipanggil.

Loader membaca manifest context.json setiap panggilan, memverifikasi seluruh isi terhadap SHA dan version frontmatter, serta snapshot manifest konsisten. Konten hilang/stale/terlalu besar diblokir sebelum API. Rilis skill yang sah harus memperbarui manifest setelah meninjau perubahan; jangan menyegarkan hash tanpa meninjau sumber. Tidak ada fallback ke instruksi statis lama. Input penuh dicatat lewat provenance (hash/bytes/source), bukan menyimpan rahasia di prompt.

GPT mini: shared writer/revision path menerima preset eksplisit. System message berisi bundle + policy + batas task. count_model_tokens.py berjalan pada .venv/tiktoken o200k_base; preflight menghitung messages/schema dengan margin framing dan output maksimum. Reservasi biaya memakai profile existing GPT4.1mini dan capUSD0.10/day/max100calls; reserve dilepas hanya bila biaya respons terkonfirmasi. Provider tetap no fallback. Token konteks lebih banyak dari ringkasan dan dapat mencapai cap lebih cepat; tidak menaikkan budget otomatis.

Hermes: AIAgent mendapat full ephemeral_system_prompt; skip_context_files tidak menghilangkan injeksi eksplisit ini. Alias jota-supervisor-skilled memakai bobot jota-writer yang sama dan num_ctx65536; tidak mengubah alias lama, mengunduh model baru, atau memberi tools. Timeout dan heartbeat supervisor menjaga keputusan lokal yang lebih panjang tetap terpantau. Bukan auto-learning skill atau otorisasi eksekusi model.

Deploy: install tiktoken dalam .venv, cache encoding ke models/tokenizer-cache, buat alias Ollama dari jota-writer dengan PARAMETER num_ctx65536; muat ulang koordinator/supervisor hanya saat tidak WRITING/PLANNING. Jangan restart producer untuk perubahan konteks penulis. Tes test-skill-context.py menangkap payload lengkap/preset/provenance, rejects drift dan oversized text, serta constructor Hermes tanpa paid calls. Smoke model nyata disimpan terpisah dari fixture. Test pembacaan dokumen bukan bukti bahwa model mematuhi seluruh aturan di setiap video; validator dan QC aktual tetap wajib.

## Bukti pengujian 2026-11-11

Payload test memasukkan literal lengkap setiap file dan hash yang sama; Faceless121907bytes, stickman118315bytes sebelum tambahan task/machine policy. Tidak ada API pada fixture. Model GPT nyata menerima31918/32122prompttokens dan menjawab versi4.23.11/1.10.8, stickman2D, kepala polos, no music, izin publikasi terpisah dengan benar. Respons kedua memakai cache prefix dan biaya providerUSD0.0038616; bukan biaya produksi video.

Hermes lokal64K awalnya salah mengambil defaultfaceless dari sejarah manual. Kontrak preset eksplisit di akhir systemcontext dan di awal task memperbaikinya; file probe gagal tetap disimpan. Probe v2 nyata menjawab aturan/versi/preset dengan benar; waktu warm17.84detik bukan jaminan kinerja cold. Backend tidak melaporkan jumlah token ke wrapper; usage menandai unknown dan menyimpan source/context/loaderhash. Nilai konteks65536 diverifikasi di model Ollama yang dimuat. Injeksi terbukti, kepatuhan sempurna setiap generasi tidak diklaim.

Seluruh regression Python terkait dan core runner lulus. SHA antrean tetap selama kedua smoke, tidak ada render, approval atau posting. Berlaku pada panggilan baru; proyek/keputusan tersimpan tidak diputar ulang.
