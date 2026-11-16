# Pemeran tetap JOTA (Media Library VideoExpress, folder "Serial Uwais youtube")

Diunggah owner 2026-11-02 22:05. Nama di bawah adalah nama gambar acuan di folder itu.

| Gambar | Peran | Keterangan |
|---|---|---|
| Uwais_soleh | Uwais Abdul Kohar, anak pertama, 15 tahun, tokoh utama | `UWAIS-ABDUL-KOHAR/` |
| Aba | Ayah Uwais, 46 tahun | owner 22:11, 22:14 |
| Ummi | Ibu Uwais, 37 tahun | owner 22:11, 22:14 |
| Sarah | Adik ke-5 (anak ke-6), bayi 6 bulan | owner 22:13 |
| Ubaid | Adik ke-4 (anak ke-5), 5 tahun | owner 22:13 |
| Umair | Adik ke-2 (anak ke-3), 10 tahun | owner 22:13 |
| Ukasyah_soleh | Adik pertama (anak ke-2), 13 tahun | owner 22:13 |
| Saheela_solehah | Adik ke-3 (anak ke-4), 7 tahun | owner 22:13 |

Satu shot paling banyak dua acuan (Reference Photo dan Reference Photo 2).

Urutan anak: Uwais (15), Ukasyah (13), Umair (10), Saheela (7), Ubaid (5), Sarah (6 bulan).

Suara tetap: `suara.json` (ElevenLabs, nada per usia).

## Tinggi dan berat (owner 2026-11-03, tinggi diperbarui dari foto keluarga 2026-11-04)

| Tokoh | Tinggi | Berat |
| --- | --- | --- |
| Aba | 165 cm | 62 kg |
| Ummi | 160 cm | 56 kg |
| Uwais | 160 cm | 50 kg |
| Ukasyah | 150 cm | 45 kg |
| Umair | 130 cm | 40 kg |
| Saheela | 115 cm | 35 kg |
| Ubaid | 90 cm | 29 kg |
| Sarah | 50 cm | 10 kg |

Kunci penampilan lengkap per tokoh ada di `tokoh.json`. Foto acuan di Media Library tidak punya skala (setiap foto satu tokoh memenuhi bingkai), jadi setiap shot berisi dua tokoh atau lebih wajib memuat baris `SCALE:` yang menyebut tinggi masing-masing dan perbandingannya (dibuat otomatis oleh `dari-brief.mjs`).

## Ciri dan baju tetap (owner 2026-11-03, diperbarui dari foto keluarga 2026-11-04)

Kulit semua tokoh sawo matang. Hanya Uwais dan Aba berkacamata; Aba satu-satunya berjenggot dan berkumis. Foto keluarga tidak disimpan di repo. Prompt gambar acuan baru: [`PROMPT_ACUAN.md`](PROMPT_ACUAN.md).

Pakaian sesuai foto acuan. Kalimat lengkap yang masuk prompt ada di `tokoh.json` (`kunci`); kolom pembeda wajib ikut di setiap shot berdua (`DIFFERENCES:`).

| Tokoh | Foto acuan | Ukuran | Pembeda dan baju |
| --- | --- | --- | --- |
| Uwais | `Uwais_soleh` | 160 cm, 50 kg | tallest, lanky beardless teenage boy, the only child wearing glasses, bare head with no peci unless stated, wavy, slightly curly black hair, olive-green overshirt over an ivory koko shirt |
| Ukasyah | `Ukasyah_soleh` | 150 cm, 45 kg | shorter beardless boy with no glasses, straight hair with soft waves, white knitted peci, beige koko shirt, backpack |
| Umair | `Umair` | 130 cm, 40 kg | child reaching Uwais's chest, no glasses, thin straight black hair with light bangs, red koko shirt, black backpack |
| Saheela | `Saheela_solehah` | 115 cm, 35 kg | small girl reaching Ummi's waist in a bright pink ruffled hijab |
| Ubaid | `Ubaid` | 90 cm, 29 kg | very small chubby toddler-sized boy reaching Uwais's hip, thin straight hair, white t-shirt |
| Sarah | `Sarah` | 50 cm, 10 kg | tiny baby in a pink headscarf |
| Aba | `Aba` | 165 cm, 62 kg | grown adult man, tallest and broadest, the only person with a beard and mustache, glasses, long white thobe |
| Ummi | `Ummi` | 160 cm, 56 kg | adult woman in a long black khimar over a long salmon-pink skirt |

Kesalahan yang pernah terjadi dan pencegahannya:
- Umair digambar setinggi Uwais seperti "Uwais ganti baju": baris `SCALE:` dan pembeda rambut (keriting vs lurus berponi) dan baju (overshirt hijau vs koko merah dan ransel).
- Aba digambar seperti Uwais berjenggot: pembeda "pria dewasa, satu-satunya yang berjenggot, uban di samping, gamis putih" vs "remaja tanpa jenggot".
- Tokoh tiba-tiba pindah ke belakang: posisi kiri/kanan ditulis di setiap shot berdua dan nyambung dengan shot sebelumnya.
