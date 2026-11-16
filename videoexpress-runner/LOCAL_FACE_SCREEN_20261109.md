# Pemeriksa faceless lokal — Claude dan ChatGPT

Status: TESTED untuk fixture gambar existing di GitHub Actions. Bukan klaim bebas kesalahan pada semua gambar atau PRODUCTION_READY untuk seluruh produksi. Owner meminta pemeriksaan dilakukan Runner tanpa kredit/token API. Gambar uji berasal dari repo; tidak ada generation VideoExpress baru atau video/publikasi.

Model kandidat: Qwen3-VL-4B-Instruct Q4_K_M (Apache 2.0), revision `1cd86afb9a95c410a6038ab3b40d8b578c892266`; runtime llama.cpp CPU b12211 (MIT). Setup hanya mengunduh bobot/runtime publik, memverifikasi ukuran/SHA-256, lalu inference membaca file lokal. Tidak ada API model cloud, API key atau kuota token API. Komputasi lokal tetap menggunakan CPU/RAM dan waktu Actions. Bukan janji semua jenis runner GitHub selalu gratis; targetnya standard Linux pada repo publik Jota_runner.

Pengamatan model harus memiliki bukti per kepala: posisi, mata/hidung/mulut terlihat atau tidak, permukaan blank/featured/hidden/unclear, ketidakpastian dan alasan. Satu fitur pada siapa pun menolak seluruh kandidat. Kandidat hanya PASS_LOCAL ketika seluruh kepala yang diharapkan dilaporkan blank, tidak meragukan dan jumlahnya sesuai. Jawaban model adalah prediksi yang bisa keliru; tidak dianggap persetujuan owner atau jaminan seluruh kualitas produksi.

Hasil di `awal/local-face-screen.json` mengikat keputusan ke nama kandidat dan hash bytes gambar. Kandidat yang PASS_LOCAL dapat direkomendasikan; bila semuanya REJECT, tidak ada pilihan dan feedback revisi prompt disimpan. Tidak ada regenerasi tanpa batas, penulisan auto:true atau panggilan render. Model hanya mengisi faceless dan pilihan lokal; baju/identitas/ruang/kriteria lain serta owner tetap PENDING. Gate tambahan memblokir bukti hilang, pilihan ditolak, perubahan hash/jumlah kepala.

Fixture: `gpt/productions/JOTA-M1-LOCAL-FACE-QC-TEST-20261109`. SHOT01 A berwajah lengkap/B dua wajah polos, harus memilih B. SHOT02 C berwajah lengkap/D campuran satu polos satu berwajah, harus menolak keduanya. `BENCHMARK.json` berisi sumber dan harapan. Exit 2 dari pemeriksa berarti sebagian kasus ditahan/ditolak; workflow benchmark baru success jika `assert-local-face-benchmark.mjs` membuktikan hasil yang diharapkan, termasuk QC owner PENDING.

Percobaan yang tidak memenuhi syarat: OpenCV memiliki positif palsu pada kepala polos; CLIP cenderung lebih menyukai deskripsi blank bahkan pada contoh berwajah; SmolVLM 500M salah membaca wajah lengkap sebagai blank. Qwen 2B menolak contoh berwajah/campuran tetapi menambah kepala imajiner pada gambar polos, sehingga gate menahan rekomendasi. Bukti 2B dipertahankan sebagai percobaan yang tidak lolos, bukan keberhasilan. Jangan menurunkan batas atau mengabaikan head-count gate agar benchmark hijau.

Test tanpa model: `node apps/videoexpress-runner/test.mjs`. Setup CPU: `python3 apps/videoexpress-runner/setup-local-face-screen.py <cache>`. Pemeriksaan: `node apps/videoexpress-runner/local-face-screen.mjs <shots.json> <cache>`. Model/runtime sekitar 3 GB unduhan dan berjalan di CPU; bobot tidak disimpan di git.

Video belum diaktifkan. Pemeriksaan frame jarang tidak boleh diklaim membuktikan seluruh klip bebas fitur wajah. Tidak ada produksi video pada pengujian ini.

## Bukti GitHub Actions

[Run 42591704690](https://github.com/ohan78/Jota_runner/actions/runs/42591704690) SUCCESS, job 129074616717, source kode `df6a70edfe09c5ce8055fb04b3639507a8d8afb2`, workflow `d68e6e021dfa11c3dfd86335d6031a694019a6e0`. Verifikasi checksum berhasil 09:13:43 UTC; benchmark lulus 09:16:11 UTC. Tiga gambar unik diperiksa pada CPU standard Ubuntu, sekitar 49–51 detik per gambar; kandidat duplikat memakai cache dalam proses. Tidak ada login VideoExpress, generate baru, API model cloud, atau penggunaan MacBook.

| Kasus | Hasil nyata |
|---|---|
| SHOT01 A dua tokoh berfitur wajah | REJECT |
| SHOT01 B dua wajah polos | PASS_LOCAL, dipilih LFC09-BLANK-B |
| SHOT02 C berfitur wajah | REJECT |
| SHOT02 D satu polos, satu berfitur wajah | REJECT seluruh gambar |
| Pilihan SHOT02 | Tidak ada; ALL_REJECTED, llm.pilih=REGEN |
| Persetujuan owner / kriteria lain | PENDING, tidak diluluskan otomatis |
| API model / token API berbayar | 0 / 0 |

[Artifact 13661612286](https://github.com/ohan78/Jota_runner/actions/runs/42591704690/artifacts/13661612286), digest `sha256:72d3dff27a045a1ba7e388b85f1dc9f8ca4e809113df242e4ad8cea078baf21e`. Bukti juga disimpan permanen di folder fixture: BENCHMARK-RESULT.json, MODEL-VERIFIED.json, SOURCE-COMMIT.txt, awal/local-face-screen.json, awal/local-face-feedback.md, awal/qc.json.

Batas nyata: uji ini kecil (3 gambar unik), bukan ukuran akurasi populasi. Model masih bisa salah atau melewatkan fitur kecil; contohnya pelaporan hidung tidak selalu lengkap. Penolakan didasarkan pada salah satu fitur positif, sehingga contoh tersebut tetap ditolak. Hasil surface=blank tidak boleh mengalahkan eyes/nose/mouth=true. REVIEW, jumlah kepala tidak cocok, kegagalan model, bukti stale, atau model belum siap tidak boleh diloloskan. Owner/kriteria QC lain tetap menjadi gate terpisah. Pemeriksaan seluruh frame klip belum diimplementasikan.

Workflow `jota-local-face-qc-uji.yml` mengulang benchmark tanpa VideoExpress. Workflow gambar memanggil filter untuk proyek local_face_screen.enabled=true setelah kandidat diunduh; penolakan menulis marker gagal-local-face.txt sehingga tidak memicu ulang otomatis. Brief baru meneruskan metadata/count, proyek lama tanpa count ditahan untuk dilengkapi. Tidak mengirim laporan ke API AI atau otomatis memperbaiki/menerapkan prompt; feedback tersimpan untuk revisi yang diotorisasi.
