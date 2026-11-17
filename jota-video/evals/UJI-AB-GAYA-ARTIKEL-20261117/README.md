# Uji A/B: prompt JOTA V4 vs gaya artikel AI Films World (2026-11-17)

Status: DISIAPKAN SAJA. Belum ada generate. Generate butuh izin owner terpisah.

- `A-JOTA-V4.txt`: SHOT04 "Tuduhan yang terlalu cepat" persis dari PROMPT_FACELESS_V4.0.0.md (4.517 karakter).
- `B-GAYA-ARTIKEL.txt`: shot dan tokoh sama, gaya artikel: aksi konkret tiap 2 detik (tanpa kalimat pengisi),
  kamera berubah per segmen (slide, push-in ke tangan, pull-back; tanpa close-up wajah), First frame dan Final frame
  ditulis konkret (4.711 karakter, di bawah batas UI sekitar 4.745).
- Aturan JOTA tetap: kunci wajah polos di setiap segmen, tanpa suara manusia, tanpa musik, ElevenLabs sesudah render.
  Perbedaan kecil: kalimat "Sound effects are added in ElevenLabs... No generated audio." per segmen diganti oleh baris Soundtrack.
- Cara uji yang adil: gambar awal sama, pengaturan sama (3D, Creative OFF, Enhance OFF, 9:16, 10 detik, gallery OFF),
  satu render per prompt, lalu jota-wajah 8B 3 fps + penilaian owner (gerak hidup, kamera, sambungan frame akhir).

## Percobaan generate 2026-11-17 (owner: "iya coba uji") — BELUM jalan

- Gambar awal yang dipakai: `JOTA-M1-AMPLOP-IMAGE-SIMPLE-V6-20261108/awal/SHOT04-1.png` (Umair dan Uwais, front three-quarter).
  jota-wajah 8B: PASS, 2 kepala polos. QC visual V6 lama juga PASS sementara.
- Hambatan: gambar itu PREVIEW_ONLY (tidak ada di Media Library VideoExpress). Runner Mac hanya bisa memakai gambar awal dari
  library (`PAKAI_ULANG`) atau Create Image baru. Unggah file lokal ke library belum dipetakan (yang ada hanya Import from Artistly, di PC).
  Membuat gambar awal baru per proyek membuat A dan B tidak berangkat dari gambar yang sama, jadi tidak adil.
- Jalan keluar: (1) owner unggah SHOT04-1.png ke Media Library VideoExpress dengan nama unik, lalu shot A dan B memakai
  `"start": {"type": "PAKAI_ULANG", "image": "<nama>"}`; atau (2) owner buat dua video manual dari gambar itu dengan prompt A dan B
  (Enhance OFF, 9:16, 10 detik, public gallery OFF), lalu klip diperiksa jota-wajah.
