# Benchmark prompt faceless VideoExpress (2026-11-01)

Tujuan: mencari cara menulis prompt yang paling sedikit memunculkan wajah. Semua shot memakai adegan yang sama dan paling sulit (adegan yang gagal di Umar separuh harta versi 1): Umar berlutut, tampak tiga perempat dari belakang, tangan bekerja dengan peti dan karung di depannya. Setiap shot gambar BARU, 10 detik, tanpa narasi. Dijalankan Runner mode auto; klip di Drive jotaauto1 `Video JOTA/JOTA-BENCH-FACELESS-20261101/`.

## Yang diuji

| Shot | Kata faceless | Style | Image Type |
|---|---|---|---|
| SHOT01 B1 (kontrol) | Negasi: aturan v3.53 apa adanya ("No eyes, no nose, no mouth" di 3 tempat) | Kartun 2D "anime-style" (S28) | 2d |
| SHOT02 B2 | Negasi | Kartun 2D datar tanpa kata "anime" | 2d |
| SHOT03 B3 | Positif saja: kepala "smooth egg-like surface, like a wooden artist's mannequin"; kata eyes, nose, mouth, face tidak muncul sama sekali | Kartun 2D datar | 2d |
| SHOT04 B4 | Positif saja | Kartun 2D "anime-style" | 2d |
| SHOT05 B5 | Positif saja | Animasi 3D (S40 versi positif) | 3d |
| SHOT06 B6 | Positif saja | Manekin kayu (S26) | 3d |

Dasar hipotesis:
- Model gambar dan video sering gagal memahami kalimat larangan; menyebut "eyes" dan "nose" bisa justru memancing model menggambarnya. Saran umum: jelaskan permukaan yang ada, bukan fitur yang tidak ada ([diskusi komunitas OpenAI](https://community.openai.com/t/creating-an-image-with-the-absence-of-something/995695)).
- Kata "anime-style" di style S28 diduga menarik ke wajah anime bermata besar (`EVALUASI.md` Umar S28, hipotesis 9).
- Benchmark 25 Okt: 3D wajah polos (S40) lolos di semua frame termasuk jarak dekat; manekin (S25 sampai S27) dinilai "Sangat" cocok.

## Lembar nilai (diisi owner setelah menonton)

| Shot | Wajah muncul? (detik pertama) | Gaya masih cocok? | Catatan |
|---|---|---|---|
| SHOT01 B1 | | | |
| SHOT02 B2 | | | |
| SHOT03 B3 | | | |
| SHOT04 B4 | | | |
| SHOT05 B5 | | | |
| SHOT06 B6 | | | |

Cara membaca:
- B1 berwajah, B2 polos: kata "anime" penyebabnya.
- B2 berwajah, B3 polos: kalimat negasi penyebabnya.
- B3 dan B4 sama-sama polos: kata positif cukup, "anime" boleh tetap.
- B5 atau B6 paling stabil: pertimbangkan ganti gaya default.
Pemenang dijadikan aturan di `PROMPT_PROFESIONAL.md` 2D dan dicatat di `CHANGELOG.md`.
