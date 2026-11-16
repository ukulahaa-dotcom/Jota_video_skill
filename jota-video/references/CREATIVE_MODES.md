# JOTA mode kreatif: hanya JOTA 1

**Sejak v3.51 (keputusan owner 2026-11-01): JOTA 2 dihapus karena melanggar syariat. Semua video faceless (JOTA 1), tanpa pilihan lain. Bagian JOTA 2 di bawah hanya sejarah dan tidak dipakai.**

Mengikuti [`../SKILL.md`](../SKILL.md) bagian 2. Kalau berbeda, SKILL.md yang menang.

## Memilih mode

- Mode dipilih owner lewat kartu pengaturan (SKILL.md 4A) untuk setiap video baru. Default kartu: JOTA 1.
- Mode tidak ditebak dari topik, gaya, video lama, atau aset yang ada.
- Revisi atau lanjutan episode yang sama memakai mode yang sudah dikunci. Video baru memilih lagi.
- Ganti mode di tengah episode hanya atas perintah owner, sebagai revisi baru. Aset lama tidak dihapus atau diganti nama.

## Perbedaan

| | JOTA 1: faceless, ramah konten Islami | JOTA 2: cinematic umum |
|---|---|---|
| Wajah manusia | Mata dan hidung tidak pernah ada. Mulut boleh muncul sesaat hanya saat tokoh bicara; wajah diam tetap polos. Gagal hanya kalau mata atau hidung jelas terlihat; bayangan samar dan tekstur tidak dihitung (`SYARIAT_GAMBAR.md`) | Wajah dan ekspresi penuh boleh, anatomi wajar dan konsisten |
| Hewan, robot, boneka, benda bernyawa | Tanpa mata. Paruh atau moncong tertutup boleh sebagai bentuk kepala | Bebas |
| Suara | Dialog native satu job (default kartu); narator `Narration Video` kalau dipilih owner | Dialog native satu job dengan lip-sync; narator kalau dipilih |
| Musik | Tidak ada musik, lagu, atau melodi. Suara alam dan Foley boleh | Tidak dibuat generator klip. Musik berlisensi jelas ditambahkan saat rakit, volume di bawah dialog |
| Gaya | S28 kartun wajah polos (default anak, teruji), S40 3D wajah polos; manekin S25 sampai S27 untuk dokumenter | Sesuai brief: 2D, 3D, atau sinematik lain, tetap original |
| Cek agen | Kepala gambar acuan dan keyframe diperbesar sebelum dipakai | Tidak ada cek wajah oleh agen |

Gambar JOTA 1 yang memunculkan mata atau hidung: ulang dengan shot lebih jauh maksimal 2 kali, lalu satu kali Smart Edit yang dibuka kalimat faceless (benchmark I7). Masih gagal: `FACELESS_QA_BLOCKED`, hambatan nyata. Suara karakter tidak di-dubbing.

## Berlaku di kedua mode

- Provider: gambar acuan dari generator pilihan owner (VideoExpress, Artistly, ChatGPT Images), video hanya VideoExpress.
- Film dialog tidak memakai narator kecuali owner memilih "dialog dan narator" di kartu.
- Konten agama nyata: Allah, nabi, dan malaikat tidak digambarkan; klaim harus bersumber. JOTA 2 bukan jalan pintas untuk itu.
- Privasi anak: tidak memakai foto, wajah, atau nama asli anak. Semua hasil private sampai owner mengizinkan publish.
- QC hasil oleh owner (SKILL.md aturan inti 5).

## Penamaan

- Episode baru: `JOTA-M1-{SLUG}-{YYYYMMDD}` (JOTA 1) atau `JOTA-M2-{SLUG}-{YYYYMMDD}` (JOTA 2).
- `RUN_STATE.json`: `creative_mode`, `style`, `ratio`.
- Aset lama (misalnya `JOTA-PB01-KANCIL_BUAYA-20261022`) tidak diganti nama.

Status produksi ada di [`../playbooks/README.md`](../playbooks/README.md).
