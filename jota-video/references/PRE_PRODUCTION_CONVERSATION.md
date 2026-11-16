# Percakapan awal dan katalog gaya visual JOTA

Keputusan owner 2026-11-11: diskusikan arah cerita secara natural dan perbarui skill. IMPLEMENTED: panduan/katalog, manager GPT mini, draft dan preferensi persisten per owner/chat, menu pilihan teks, konteks pertanyaan terakhir dan validasi kemampuan sebelum handoff. SPEC: tombol inline, renderer/preset gaya tambahan. Tidak ada renderer/preset baru pada rilis ini.

## Dimensi konsep yang berbeda

| Dimensi | Contoh | Cara menanyakan |
| --- | --- | --- |
| Tema/ide | Kejujuran, perjalanan, pertandingan | Ceritanya tentang apa bro? |
| Pesan | Menepati janji, bekerja sama | Pesan yang ingin dibawa apa? |
| Basis cerita | Fiksi pembawa hikmah; hadis sahih | Fiksi hikmah atau ingin mengangkat hadis tertentu? |
| Genre | Drama, horor, laga, perang, sport, komedi, keluarga, petualangan | Mau suasana atau genre yang bagaimana? |
| Gaya visual | 3D Cartoon, Stickman 2D, Storybook | Tampilannya ingin seperti apa? |
| Karakter | Jumlah tokoh utama dan pendukung, lama/baru, referensi | Tokoh utamanya siapa dan berapa orang? |
| Pengaturan | Durasi, rasio, narasi, bahasa | Tanyakan yang belum jelas atau gunakan default yang diizinkan. |

Hadis adalah basis/sumber materi, bukan gaya gambar. Jangan menyamakan fiksi hikmah dengan kejadian hadis. Kutipan/derajat/nomor hadis wajib bersumber terverifikasi; jangan mengarangnya. Aturan konten JOTA yang sudah berlaku tetap berlaku pada semua genre/gaya, termasuk kepala tanpa fitur wajah dan tanpa musik.

## Alur percakapan yang dituju

1. Kenali lingkup: diskusi, naskah, storyboard, produksi baru, revisi, atau status. Pertanyaan tentang gaya bukan instruksi produksi.
2. Baca informasi yang sudah diberikan. Simpan jawaban dalam draft percakapan persisten; jangan membuat owner mengulang ide/genre/preset.
3. Jika ide belum ada, tawarkan lima ide, utamakan hikmah kehidupan, kejujuran, keluarga, persahabatan atau petualangan. Tidak ada klaim pasti viral. Ide yang sudah diberikan langsung dikembangkan.
4. Mode terbimbing menanyakan satu atau dua hal penting per giliran. Jangan memulai dengan formulir panjang. Tema, genre, gaya dan karakter tidak perlu ditanyakan ulang bila sudah jelas.
5. Karakter pendukung hanya jika cerita membutuhkan; lebih banyak tokoh bukan otomatis lebih baik. Kapasitas runner/referensi tetap membatasi shot. Pastikan acuan karakter dan QC sebelum gambar scene.
6. Ringkas konsep dengan tema/pesan/basis/genre/gaya/cast/pengaturan. Jika owner masih membahas pilihan, tunggu instruksi melanjutkan. Instruksi produksi eksplisit yang cukup jelas memakai default JOTA dan menyebut asumsi singkat; tidak ada izin tambahan per tahap.
7. Setelah otorisasi produksi, ikuti urutan existing: ide → pengaturan → konsep → naskah → karakter → storyboard → gambar → animasi → audio → assembly → Drive. QC/retry/REVIEW dan penguncian sesi tetap. Publishing menunggu persetujuan terpisah.

Contoh diskusi:
Owner: Mau ngobrol ide horor stickman dulu.
Manager: Siap bro, stickman 2D. Mau misteri ringan atau lebih menegangkan? Ada ide kejadian atau mau saya tawarkan beberapa?
Owner: Dua sahabat di sekolah kosong.
Manager: Oke, dua sahabat di sekolah kosong. Saya susun konsep misterinya dulu; belum masuk produksi.

Contoh instruksi cukup jelas:
Owner: Buat video stickman 2D 60 detik, dua sahabat saling membantu ketika tersesat, narasi Indonesia, 9:16.
Manager: Siap bro. Cerita petualangan tentang kerja sama, dua sahabat, 60 detik dan narasi Indonesia. Saya lanjutkan pengembangan konsep melalui jalur produksi yang tersedia.

Contoh permintaan gaya belum didukung:
Owner: Buat storybook cat air.
Manager: Storybook cocok untuk konsep buku cerita, bro. Pipeline gaya ini belum teruji di runner. Konsep/naskahnya bisa dibahas dulu; produksi perlu dukungan style dan QC yang sesuai.
Jangan mengantrekan render 3D faceless sebagai pengganti tersembunyi.

## Enam pilihan awal dan status aktual

| Gaya visual | Arti | Status produksi JOTA |
| --- | --- | --- |
| 3D Cartoon dengan wajah polos | Volume 3D, bahan dan pencahayaan ilustratif | Jalur faceless existing; konfigurasi/gate existing tetap, hasil tiap shot tetap memerlukan QC. Bukan jaminan setiap render lolos. |
| Stickman 2D | Figur sederhana, kepala bulat kosong, garis/palet konsisten | Preset stickman existing; pilot pendek pernah diverifikasi, proyek baru tetap wajib QC. |
| 2D Cartoon umum | Ilustrasi kartun datar dengan desain karakter lebih beragam | SPEC untuk konfigurasi/template/QC/pilot tersendiri. |
| Comic / Motion Comic | Panel dan ilustrasi komik dengan gerak karakter/kamera terencana | SPEC untuk pipeline end-to-end gaya ini. |
| Paper Cutout | Potongan kertas berlapis seperti panggung mini | SPEC untuk konfigurasi/template/QC/pilot tersendiri. |
| Storybook | Tampilan ilustrasi buku cerita; cat air atau lukisan digital lembut | SPEC untuk konfigurasi/template/QC/pilot tersendiri. Gaya ilustrasi tidak menentukan cara animasinya. |

Katalog tambahan untuk diskusi: Anime, Clay/Stop-motion Look, Watercolor, Sketch/Pencil, Whiteboard, Pixel Art, Low-poly 3D, Silhouette/Shadow, Realistic Cinematic. Ini nama gaya umum, bukan opsi UI VideoExpress yang telah dibuktikan atau preset produksi yang sudah dipasang. Watercolor dapat menjadi teknik tampilan storybook; sebuah genre dapat memakai beberapa gaya. Jangan mengklaim model/UI/plugin menyediakan semuanya tanpa audit nyata.

## Kontrak implementasi aktif

Preset eksekusi tetap faceless atau stickman. Draft memakai theme, message, story_basis, genre, visual_style, characters_count, characters, duration, ratio, narration dan language; source message/quote dicatat per bidang. Preferensi hanya disimpan atas permintaan eksplisit owner, dipisah dari pilihan proyek. Histori konteks dibatasi; slot tetap bertahan setelah restart. Setiap owner/chat memiliki namespace dan cache sendiri. /memori untuk melihat; /konsep untuk ringkasan; /lupakan mereset memori/cache percakapan tersebut; /batal membatalkan draft, bukan produksi yang sudah diantre.

Tanya hanya bidang inti yang belum jelas. Angka dipahami menurut pertanyaan terakhir; pilihan2 untuk gaya berbeda dari dua tokoh. Model wajib memberikan kutipan literal dari pesan current untuk perubahan slot; bidang kosong mempertahankan nilai lama. Saran model tidak menjadi pilihan owner sampai dipilih atau owner mendelegasikan pemilihan/default. Informasi negatif seperti jangan produksi menghentikan otorisasi draft; tanpa narasi mengubah narasi, bukan izin posting.

Diskusi yang lengkap tetap konsep sampai diminta dieksekusi. Permintaan produksi eksplisit dapat menunggu jawaban detail lalu diteruskan sekali saat cukup; tidak ada persetujuan baru setiap tahap. Instruksi langsung lengkap atau pakai default memakai asumsi singkat. Scope naskah/storyboard tidak berubah menjadi render. Revisi shot proyek nyata diteruskan ke jalur revisi existing; koreksi genre/gaya draft mengubah draft. Status berasal dari antrean/progress/QC/receipt aktual, bukan model menyatakan selesai.

Handoff ke penulis memakai conversation_spec tervalidasi, id Telegram nyata dan daftar source_message_ids. Adapter menolak style unsupported, style/preset mismatch, karakter tak terdaftar, cast count/rasio/bahasa/scope tak sesuai. Pilihan hadis memerlukan riset/sumber terverifikasi dan belum masuk produksi otomatis pada adapter teks. Narasi dan pilihan karakter dipertahankan sampai generator; tidak mengisi referensi stickman dengan keluarga faceless. Batas kemampuan terstruktur ada di skills/jota-telegram/capabilities.json.

Menu berupa teks enam pilihan dengan label kemampuan jujur. Style concept-only tetap tersimpan sebagai konsep, tidak diganti diam-diam. Inline keyboard adalah SPEC. Tambahan gaya memerlukan implementasi template/referensi/QC/pilot sendiri. Tidak ada posting dari pemilihan genre/gaya; publikasi selalu persetujuan terpisah.
