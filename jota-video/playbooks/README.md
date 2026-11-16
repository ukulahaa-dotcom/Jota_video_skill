# JOTA playbook kategori

Aturan bersama ada di [`../SKILL.md`](../SKILL.md): mode, provider, operator Runner, alur scene, QC, izin. Playbook hanya menambah aturan khusus kategori. Kalau ada yang bertentangan, `../SKILL.md` menang.

## Cara memilih

1. Pastikan mode (JOTA 1/JOTA 2) sudah dipilih owner.
2. Pilih satu playbook utama sesuai tujuan konten.
3. Permintaan campuran: pilih berdasarkan risiko klaim paling tinggi (PB05/PB06 untuk nabi dan situs, PB02 untuk bahasa, PB03 untuk sains).
4. Format platform (Shorts, long-form) dipilih setelahnya dari [`../presets/DELIVERY_MODES.md`](../presets/DELIVERY_MODES.md).
5. Ide baru diusulkan di chat dulu. Hanya ide yang dipilih owner dicatat di `ideas/approved/` (lihat [`ideas/README.md`](ideas/README.md)). Persetujuan ide bukan izin generate.

| ID | Untuk | Mode biasa | File |
|---|---|---|---|
| PB01 | Cerita keluarga dan fabel moral fiksi (genre G01, G09, G13) | JOTA 1 | [faceless-family-stories](faceless-family-stories/SKILL.md) |
| PB02 | Belajar bahasa | JOTA 1 | [language-learning](language-learning/SKILL.md) |
| PB03 | Penjelasan sains, matematika, kesehatan, keterampilan | JOTA 1 | [educational-explainers](educational-explainers/SKILL.md) |
| PB04 | Dokumenter sejarah umum | JOTA 1 | [historical-documentary-general](historical-documentary-general/SKILL.md) |
| PB05 | Situs terkait nabi dan arkeologi | JOTA 1 | [prophetic-heritage-documentary](prophetic-heritage-documentary/SKILL.md) |
| PB06 | Kisah nabi, sahabat, orang zalim dari sumber | JOTA 1 | [prophets-companions-moral-stories](prophets-companions-moral-stories/SKILL.md) |
| PB07 | DIARSIPKAN sejak v3.51 (JOTA 2 dihapus) | - | [general-cinematic](general-cinematic/SKILL.md) |

"Mode biasa" hanya petunjuk. Mode tetap dipilih owner per video.

Versi mesin: [`CATALOG.json`](CATALOG.json).

Ide yang sudah disetujui untuk perencanaan (2026-10-21): PB05 Misteri Al-Hijr dan PB06 Fir'aun: Kesombongan dan Kekuasaan. Lihat [`ideas/APPROVED_INDEX.md`](ideas/APPROVED_INDEX.md).

## Status produksi

Reset 2026-10-31 atas perintah owner: semua produksi yang belum sampai `DELIVERED` dihapus dari repo (riwayatnya tetap ada di git). Yang tersisa hanya video yang sudah jadi.

| Proyek | Kategori | Status |
|---|---|---|
| `JOTA-M2-JANTUNG-SETIAP-DETIK-20261026` | educational-explainers | `DELIVERED` |
| `JOTA-M2-PERJALANAN-MAKANAN-20261026` | educational-explainers | `DELIVERED` |

Produksi baru mulai dari kartu pengaturan (`../SKILL.md` 4A). Klip, gambar, dan proyek lama di VideoExpress dan Artistly tidak ikut terhapus oleh reset ini.
