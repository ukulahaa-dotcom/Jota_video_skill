// Profil fisik per orang + definisi lingkungan, untuk prompt gambar Artistly dan prompt klip VideoExpress (owner 2026-11-18, FATAL).
// Teguran owner (Ashabul Kahfi): semua penduduk berbadan tegap, berotot sama, tinggi sama, seperti boneka/robot.
// Fakta penyebab: preset kisah-sinematik-natural memaksa "defined muscles, broad shoulders, long strong arms" ke semua orang,
// buat-naskah.mjs menempelkan KULIT ("defined muscles and visible veins", sun-tanned) ke setiap tokoh, dan satu kalimat
// WARGA/PEMUDA dipakai untuk seluruh kelompok. Sekarang SETIAP orang yang tampak didefinisikan sendiri-sendiri.
//
// orang: {peran, usia, tubuh, tinggi, kulit, rambut, penutup, pakaian, aksesoris, alas}
//   tubuh  : bentuk badan (fat with a round belly / very thin / stocky and thick-necked / lean and wiry / soft and slightly plump ...)
//   tinggi : short / average / tall, sebaiknya relatif ("a head shorter than the baker")
//   kulit  : warna kulit (pale / olive / light brown / dark brown / very dark) + tekstur (wrinkled, sunburnt, freckled ...)
//   rambut : janggut/kumis/rambut yang tampak (beard tetap satu bentuk solid; wajah tetap polos)
//   penutup: penutup kepala (bentuk, warna, cara diikat); owner 2026-11-18: rambut BOLEH terlihat sebagian di pinggir
//            penutup (keriting, ikal, lurus, beruban), tetap tidak botak dan tidak tanpa penutup
//   pakaian: potongan, panjang, bahan, warna, kondisi (patched, faded, clean, dusty)
//   aksesoris: tas, sabuk, gelang, tongkat, dll. atau 'none'
//   alas   : alas kaki
// lingkungan: {lokasi, waktu, cuaca, cahaya, depan, tengah, belakang, detail}

export const FIELD_ORANG = ['peran', 'usia', 'tubuh', 'tinggi', 'kulit', 'rambut', 'penutup', 'pakaian', 'aksesoris', 'alas'];
export const FIELD_LINGKUNGAN = ['lokasi', 'waktu', 'cuaca', 'cahaya', 'depan', 'tengah', 'belakang', 'detail'];
const LABEL = {peran: 'role', usia: 'age', tubuh: 'body build', tinggi: 'height', kulit: 'skin', rambut: 'beard and hair showing at the edges of the head covering', penutup: 'head covering', pakaian: 'clothing', aksesoris: 'accessories', alas: 'footwear'};
const LABEL_L = {lokasi: 'location', waktu: 'time of day', cuaca: 'weather and air', cahaya: 'light', depan: 'foreground', tengah: 'midground', belakang: 'background', detail: 'materials and set details'};

export const KERAGAMAN = 'REAL PEOPLE, NOT CLONES: each person listed below has his own body build, height, age, skin tone, beard, clothing and accessories as written; they look clearly different from each other (fat, thin, short, tall, old, young, light and dark skin), each drawn exactly once.';

export function orangTeks(o, i) {
  // Tanpa penutup kepala (Pesan Ayah 2026-11-21): baris penutup dibuang agar tidak memancing kain/peci di kepala.
  const tanpa = /^none\b/i.test(o.penutup || '');
  return `PERSON ${i + 1}: ` + FIELD_ORANG.filter((k) => !(tanpa && k === 'penutup')).map((k) => `${tanpa && k === 'rambut' ? 'hair (fully visible, bare head)' : LABEL[k]}: ${o[k]}`).join('; ') + '.';
}
export function lingkunganTeks(l) {
  return 'ENVIRONMENT: ' + FIELD_LINGKUNGAN.map((k) => `${LABEL_L[k]}: ${l[k]}`).join('; ') + '.';
}

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

export function cekPemeran(daftar = []) {
  const e = [];
  daftar.forEach((o, i) => {
    for (const k of FIELD_ORANG) if (!o?.[k] || !String(o[k]).trim()) e.push(`orang ${i + 1} (${o?.peran || '?'}): ${k} kosong`);
    if (o?.tubuh && String(o.tubuh).split(/\s+/).length < 3) e.push(`orang ${i + 1}: tubuh terlalu umum "${o.tubuh}" (contoh: "fat with a round belly and thick arms")`);
    if (o?.pakaian && String(o.pakaian).split(/\s+/).length < 5) e.push(`orang ${i + 1}: pakaian terlalu umum "${o.pakaian}" (potongan, bahan, warna, kondisi)`);
  });
  const n = daftar.length;
  if (n >= 2) {
    const beda = (k) => new Set(daftar.map((o) => norm(o[k]))).size;
    if (beda('tubuh') < Math.min(n, 4)) e.push(`bentuk tubuh kurang beragam: ${beda('tubuh')} macam untuk ${n} orang (minimal ${Math.min(n, 4)})`);
    if (beda('tinggi') < 2) e.push('semua orang tinggi badannya sama');
    if (n >= 3 && beda('kulit') < 2) e.push('semua orang warna kulitnya sama');
    if (beda('pakaian') < n) e.push('ada orang dengan pakaian sama persis');
    if (n >= 3 && beda('usia') < 2) e.push('semua orang usianya sama');
  }
  return e;
}

export function cekLingkungan(l) {
  if (!l) return ['lingkungan kosong (lokasi, waktu, cuaca, cahaya, depan, tengah, belakang, detail)'];
  return FIELD_LINGKUNGAN.filter((k) => !l[k] || !String(l[k]).trim()).map((k) => `lingkungan.${k} kosong`);
}

// Skrip halaman Artistly: CHARACTERS per orang + SCENE (aksi/komposisi) + ENVIRONMENT. Melempar error bila tidak lengkap.
const ANGKA = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export function skripGambar({pemeran = [], adegan, lingkungan, tambahan = ''}) {
  const e = [...cekPemeran(pemeran), ...cekLingkungan(lingkungan)];
  if (!adegan) e.push('adegan (aksi + komposisi) kosong');
  if (e.length) throw new Error(`skrip gambar ditolak:\n- ${e.join('\n- ')}`);
  const n = pemeran.length;
  // 2026-11-22 uji sinematik: blok KERAGAMAN ("real crowd ... fat, thin, short, tall") pada adegan SATU orang memancing
  // kerumunan klon tokoh yang sama (Artistly 5/9 halaman, VideoExpress 5/8 shot). Hanya untuk 2+ orang.
  const orang = n ? `${n >= 2 ? KERAGAMAN + '\n' : ''}CHARACTERS:\n${pemeran.map(orangTeks).join('\n')}\n` : '';
  return `${orang}SCENE: ${adegan}\n${lingkunganTeks(lingkungan)}${tambahan ? `\n${tambahan}` : ''}\n${n ? `Exactly ${ANGKA[n] || n} ${n === 1 ? 'person' : 'people'}.` : 'No people.'}`;
}

// Lembar karakter SATU FILE (owner 2026-11-20, tangkapan layar VideoExpress: tiap slot Use Consistent Character diisi satu
// gambar berisi 3 sudut tokoh yang sama). Satu orang per lembar, tiga sudut berdampingan, badan penuh, tanpa wajah.
// Empat sudut (depan, tiga perempat depan, samping, belakang); faceless = wajah polos tanpa fitur, BUKAN wajah disembunyikan.
export function skripLembar(orang, nomor = 1) {
  const e = cekPemeran([orang]).filter((x) => !/kurang beragam|tinggi badannya sama/.test(x));
  if (e.length) throw new Error(`lembar karakter ditolak:\n- ${e.join('\n- ')}`);
  // Tanpa penutup kepala (Pesan Ayah 2026-11-21: "head covering: none" malah menghasilkan kain krem di kepala Arga):
  // baris penutup dibuang dan rambut ditulis sebagai rambut terbuka, tanpa menyebut kata penutup kepala.
  if (/^none\b/i.test(orang.penutup || '')) {
    const teks = 'PERSON 1: ' + FIELD_ORANG.filter((k) => k !== 'penutup').map((k) => `${k === 'rambut' ? 'hair (fully visible, bare head)' : LABEL[k]}: ${orang[k]}`).join('; ') + '.';
    return skripLembarTeks(teks);
  }
  return skripLembarTeks(orangTeks(orang, 0));
}
// ACUAN VideoExpress = SATU figur (owner 2026-11-22: lembar 4 sudut sebagai Reference Photo + kata "every person" membuat
// VideoExpress menggambar keempat figur di adegan). Lembar 4 sudut hanya untuk cek mata manusia.
export function skripAcuan(orang) {
  const e = cekPemeran([orang]).filter((x) => !/kurang beragam|tinggi badannya sama/.test(x));
  if (e.length) throw new Error(`acuan karakter ditolak:\n- ${e.join('\n- ')}`);
  return `CHARACTER REFERENCE PORTRAIT on a plain neutral light grey studio background: ONE single person, standing alone, full body from head to feet, front three-quarter view, relaxed natural stance, centred. The face has no eyes, no eyebrows, no nose, no lips and no mouth: it is simply his own skin, keeping the natural head shape. FACE SKIN: the featureless face is made of exactly the same skin as the neck, ears and hands of the same person: identical colour and tone, the same pores, fine texture and slight imperfections, lit by the same light with the same shadows and warmth; it flows seamlessly from forehead to cheeks, jaw and neck with no edge, no seam, no lighter or paler patch, no matte, waxy, plastic or painted look; subtle natural bone structure (brow ridge, cheekbones, jaw, chin) is visible only through soft light and shadow; ears allowed. Soft even studio lighting, no text, no labels.\n${orangTeks(orang, 0)}\nExactly one person. Wide landscape 16:9 frame.\nENVIRONMENT: location: plain studio backdrop; time of day: none; weather and air: none; light: soft even studio light; foreground: bare floor; midground: the single figure; background: seamless light grey; materials and set details: none.`;
}
function skripLembarTeks(orangBaris) {
  // 2026-11-22 owner: sudut kamera jangan dikorbankan demi faceless. Lembar lama hanya belakang/samping sehingga VideoExpress
  // tidak tahu rupa depan yang polos dan mengarang wajah saat tokoh menoleh. Kini EMPAT sudut termasuk DEPAN berwajah polos.
  return `CHARACTER SHEET on a plain neutral light grey studio background, one single person shown FOUR times side by side in a row at the same scale, full body from head to feet: 1 = front view facing the camera, 2 = front three-quarter view, 3 = exact side profile, 4 = back view. The same person, the same clothing and accessories in all four poses, standing relaxed in a natural confident stance. The face has no eyes, no eyebrows, no nose, no lips and no mouth: it is simply his own skin, clearly visible and blank in the front and three-quarter views, keeping the natural head shape. FACE SKIN: the featureless face is made of exactly the same skin as the neck, ears and hands of the same person: identical colour and tone, the same pores, fine texture and slight imperfections, lit by the same light with the same shadows and warmth; it flows seamlessly from forehead to cheeks, jaw and neck with no edge, no seam, no lighter or paler patch, no matte, waxy, plastic or painted look; subtle natural bone structure (brow ridge, cheekbones, jaw, chin) is visible only through soft light and shadow; ears allowed; hair and head as written below. Soft even studio lighting, no shadows on the background, no text, no labels.\n${orangBaris}\nExactly four figures of the same one person. Wide landscape 16:9 frame.\nENVIRONMENT: location: plain studio backdrop; time of day: none; weather and air: none; light: soft even studio light; foreground: bare floor; midground: the three figures; background: seamless light grey; materials and set details: none.`;
}

// Gerbang teks (naskah.json lama/baru di produksi-gambar.mjs, video_prompt di jalankan-vx.mjs).
export function cekSkripTeks(teks = '', harap) {
  const e = [];
  if (!/ENVIRONMENT: location:/.test(teks)) e.push('tanpa blok ENVIRONMENT lengkap (susun dengan skripGambar/promptHDT)');
  if (harap > 0) {
    // Prompt gambar: "PERSON n: role:" (profil lengkap). Prompt video promptHDT: "CHARACTER A: role:" (profil ringkas di KUNCI).
    for (let i = 1; i <= harap; i++) if (!new RegExp(`(PERSON ${i}|CHARACTER ${String.fromCharCode(64 + i)}): role:`).test(teks)) e.push(`PERSON ${i} tidak didefinisikan (${harap} orang diharapkan)`);
    if (harap >= 2 && !/REAL PEOPLE, NOT CLONES/.test(teks)) e.push('tanpa aturan keragaman fisik');
  }
  return e;
}
