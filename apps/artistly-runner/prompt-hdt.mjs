// Penyusun + pemeriksa prompt klip VideoExpress format HDT-JOTA (owner 2026-11-18, "copy referensi Hollywood").
// Dari template Hollywood Director (HDT/MPT): durasi eksplisit, gerak bernomor PER TOKOH dengan detik mulai/selesai,
// kamera lengkap (framing, lensa, gerak, kecepatan, fokus, tujuan), kunci benda, kunci kontinuitas.
// Adaptasi JOTA: faceless (akting lewat postur, tangan, langkah; tanpa ekspresi wajah/lip-sync), SFX natural tanpa musik.
//
// Teguran owner 2026-11-18 (Ashabul Kahfi), FATAL, tidak boleh terulang:
//   1. Berbaris/melangkah sama persis bersama-sama -> setiap tokoh WAJIB gerak berbeda, mulai di detik berbeda, tempo berbeda.
//   2. Slow motion -> kecepatan nyata 1x. Kata "slow/slowly/slow motion/gently drifting" dilarang di gerak tokoh.
//   3. Gerak "pramuka" (seragam, kaku) -> gerak tiap tokoh didefinisikan jelas: bagian tubuh, arah, jarak, waktu.
//   4. Benda fokus (koin dll.) -> bentuk, ukuran, bahan, warna, jumlah, cara dipegang ditulis detail ("koin = bulat").
//
// pakai di buat-shots.mjs:
//   import { promptHDT, cekShot } from '.../prompt-hdt.mjs';
//   const p = promptHDT({id, judul, jenis:'orang'|'kosong', len, aturan, gaya, avoid, latar, suara, lock,
//     kamera: {framing, lensa, gerak, fokus, tujuan},
//     tokoh: [{nama, posisi, gerak: [[0, 2.5, 'turns his torso to the left and lifts his right hand to his chest'], ...]}],
//     benda: [{nama, detail}]});
// jalankan-vx.mjs run memanggil cekShotsFile() sebagai gerbang wajib (tanpa --paksa).

// 2026-11-18 (teguran kedua): setiap tokoh WAJIB punya fisik (pemeran.mjs: tubuh, tinggi, kulit, usia, janggut, penutup,
// pakaian, aksesoris, alas) dan shot WAJIB punya lingkungan (lokasi, waktu, cuaca, cahaya, depan, tengah, belakang, detail).
import { KERAGAMAN, orangTeks, lingkunganTeks, cekPemeran, cekLingkungan, cekSkripTeks } from './pemeran.mjs';

const LAMBAT =/\b(slow(ly|er)?|slow[- ]?motion|slo-?mo|in slow|gently drift(s|ing)?|languid(ly)?|dreamy|floaty)\b/i;
const SERENTAK = /\b(in unison|in sync|synchroni[sz]ed|all together|at the same time|simultaneously|march(es|ing)?|in step|in formation|in a row raising)\b/i;
// Benda yang biasa jadi fokus penonton -> wajib ada di benda[] dengan detail bentuk.
const BENDA = /\b(coins?|silver|sword|spear|staff|cane|bread|loaf|cup|bowl|jar|scroll|book|lamp|torch|key|ring|stone tablet|letter|basket|rope|knife|shield|crown)\b/i;
const BENTUK = /\b(round|circular|disc|flat|square|rectangular|oval|cylindrical|long|thin|thick|straight|curved|spherical|domed)\b/i;

export const SPEED = 'SPEED: real-time 1x live-action speed like real footage, NOT slow motion, no floaty movement; each movement starts and ends at its written seconds with natural acceleration.';
export const BEDA = 'INDIVIDUAL PERFORMANCE: each character does his own different movement, starting at a different second at his own tempo; never the same gesture at the same moment, never marching or stepping in sync.';
export const JAUH = 'BACKGROUND PEOPLE: far background people stay mostly still or do small unrelated actions.';

const f = (t) => `${Number(t).toFixed(1)}s`;
// Profil ringkas untuk prompt VIDEO (2026-11-18): kolom VideoExpress terbukti utuh sampai 4745 huruf; penampilan lengkap sudah
// terkunci di gambar awal (prompt gambar memakai profil lengkap). Label "CHARACTER X:" dibaca validator runner sebagai KUNCI tokoh.
const ringkas = (o) => ['peran', 'usia', 'tubuh', 'tinggi', 'kulit', 'penutup', 'pakaian'].map((k) => `${k === 'peran' ? 'role' : k === 'usia' ? 'age' : k === 'tubuh' ? 'build' : k === 'tinggi' ? 'height' : k === 'kulit' ? 'skin' : k === 'penutup' ? 'head' : 'clothes'}: ${String(o[k]).split(',')[0]}`).join('; ');
export const HURUF = (i) => String.fromCharCode(65 + i);

export function promptHDT(s) {
  const err = cekShot(s);
  if (err.length) throw new Error(`${s.id}: prompt HDT ditolak:\n- ${err.join('\n- ')}`);
  const k = s.kamera;
  const baris = [`${s.id}: ${s.judul} (${s.len}s)`, s.aturan];
  const gerakSaja = (s.tokoh || []).map((t, i) => (t.diam ? null : `Character ${HURUF(i)}`)).filter(Boolean);
  const adaDiam = (s.tokoh || []).some((t) => t.diam);
  if (s.jenis === 'orang') baris.push(SPEED, adaDiam ? `ONLY ${gerakSaja.join(' and ')} MOVE${gerakSaja.length > 1 ? '' : 'S'}: everyone else stays completely still in his starting pose for the whole clip. Nobody walks, nobody leaves or enters the frame, no new people appear. The camera does not move.` : BEDA, JAUH);
  else baris.push(SPEED);
  baris.push(`STYLE: ${s.gaya}`,
    `CAMERA: ${k.framing}, ${k.lensa} lens. Movement: ${k.gerak}. Focus: ${k.fokus}. Purpose: ${k.tujuan}.`);
  // Owner 2026-11-19 (Tahlilan SHOT07: tetangga melompat-lompat kegirangan di adegan duka): suasana hati adegan dan
  // emosi/sifat tiap tokoh wajib ditulis; tokoh tetap berdiri di tempat kecuali gerak menyebut melangkah.
  if (s.jenis === 'orang' && s.suasana_hati) baris.push(`MOOD OF THE SCENE: ${s.suasana_hati}. Every gesture matches this mood; nobody jumps, hops, bounces, dances, sways, waves or looks cheerful.`);
  if (s.tokoh?.length) {
    baris.push(`PERFORMANCE (real-time speed, ${s.tokoh.length} character${s.tokoh.length > 1 ? 's' : ''}):`);
    s.tokoh.forEach((t, i) => {
      const huruf = String.fromCharCode(65 + i);
      baris.push(`Character ${huruf} - ${t.nama}${t.posisi ? `, ${t.posisi}` : ''}:`);
      // t.diam (uji 2026-11-18 Ashabul 60VX3: gerak per tokoh diabaikan VideoExpress, kelompok jadi gerak serupa; pola
      // Ashabul VX adegan 8 R2 "hanya raja bergerak, yang lain diam" berhasil): tokoh tetap di pose gambar awal.
      if (t.diam) { baris.push(`  STAYS COMPLETELY STILL for the whole clip in his exact starting pose and place (${t.diam}); only natural breathing; he does not walk, turn, bow or raise his hands.`); return; }
      if (t.emosi) baris.push(`  Emotional state and manner: ${t.emosi}.`);
      t.gerak.forEach(([a, b, aksi], j) => baris.push(`  Movement ${j + 1} (${f(a)}-${f(b)}): ${aksi}`));
      const akhir = Math.max(...t.gerak.map((g) => g[1]));
      baris.push(`  ${akhir < s.len ? `From ${f(akhir)} to ${f(s.len)}: ` : ''}${t.lain || 'feet stay planted in the same place, no walking or stepping; between movements only quiet breathing'}.`);
    });
  }
  if (s.suasana) baris.push(`ENVIRONMENT MOTION: ${s.suasana}`);
  if (s.benda?.length) baris.push('PROP LOCK (the audience looks at these, keep them exact in every frame):', ...s.benda.map((b) => `- ${b.nama}: ${b.detail}`));
  baris.push(lingkunganTeks(s.lingkungan),
    `SOUND: 0-${s.len}s ${s.suara}. Only these sounds are heard, no music, no voices.`,
    ['CONSISTENCY LOCK:', 'STYLE: keep the style above for the entire video.',
      ...(s.tokoh?.length ? ['REAL PEOPLE, NOT CLONES: each person keeps his own build, height, age, skin and outfit from the starting image.', ...s.tokoh.map((t, i) => `CHARACTER ${HURUF(i)}: ${ringkas(t.fisik)}.`)] : []), s.lock].filter(Boolean).join('\n'),
    `${s.avoid} No slow motion. No synchronized identical movements. No marching or parade-like stepping.${s.jenis === 'orang' ? ' No jumping, no hopping, no bouncing, no dancing, no exaggerated or comic movement.' : ''}${s.benda?.length ? ' Props never change shape, size, number or color.' : ''}`);
  return baris.join('\n');
}

// Pemeriksa satu spesifikasi shot (sebelum prompt disusun).
export function cekShot(s) {
  const e = [];
  const k = s.kamera || {};
  for (const x of ['framing', 'lensa', 'gerak', 'fokus', 'tujuan']) if (!k[x]) e.push(`kamera.${x} kosong`);
  const tokoh = s.tokoh || [];
  if (s.jenis === 'orang' && !tokoh.length) e.push('shot berorang tanpa tokoh[] (gerak tiap tokoh wajib didefinisikan)');
  // Owner 2026-11-19: emosi/sifat tiap tokoh dan suasana hati adegan wajib (tetangga melompat-lompat di adegan duka).
  if (s.jenis === 'orang' && !s.suasana_hati) e.push('suasana_hati adegan kosong (contoh: "quiet grief, a house in mourning")');
  tokoh.filter((t) => !t.diam && !(t.nama || '').includes('hands only')).forEach((t) => { if (!t.emosi || String(t.emosi).split(/\s+/).length < 4) e.push(`${t.nama}: emosi/sifat kosong atau terlalu umum (contoh: "sad and quiet, moves gently with lowered shoulders")`); });
  // Tahlilan SHOT07: gerak berakhir di detik 7 dari klip 10 detik, sisa 3 detik tanpa arahan diisi VideoExpress sendiri.
  tokoh.filter((t) => t.gerak?.length).forEach((t) => { const akhir = Math.max(...t.gerak.map((g) => g[1])); if (s.len - akhir > 2.5 && !t.lain) e.push(`${t.nama}: gerak berakhir ${akhir}s dari ${s.len}s; isi sisa waktu atau tulis "lain" (apa yang dilakukan setelahnya)`); });
  if (tokoh.some((t) => !t.fisik)) e.push('ada tokoh tanpa fisik{} (pemeran.mjs: tubuh, tinggi, kulit, usia, janggut, penutup, pakaian, aksesoris, alas)');
  else e.push(...cekPemeran(tokoh.map((t) => t.fisik)));
  e.push(...cekLingkungan(s.lingkungan));
  const semuaAksi = [];
  if (tokoh.length && tokoh.every((t) => t.diam)) e.push('semua tokoh diam; minimal satu tokoh bergerak');
  tokoh.forEach((t) => {
    if (t.diam) { if (String(t.diam).split(/\s+/).length < 3) e.push(`${t.nama}: diam tanpa keterangan pose`); return; }
    if (!t.gerak?.length) e.push(`${t.nama}: tanpa gerak`);
    if ((t.gerak || []).length > 3) e.push(`${t.nama}: ${t.gerak.length} gerak, maks 3 per klip (jangan dipadatkan)`);
    (t.gerak || []).forEach(([a, b, aksi]) => {
      if (!(b > a) || a < 0 || b > s.len + 0.01) e.push(`${t.nama}: waktu ${a}-${b}s di luar 0-${s.len}s`);
      if (b - a < 1.2) e.push(`${t.nama}: "${aksi}" cuma ${(b - a).toFixed(1)}s, terlalu cepat untuk gerak manusia`);
      if (LAMBAT.test(aksi)) e.push(`${t.nama}: kata lambat/slow motion dilarang: "${aksi}"`);
      if (SERENTAK.test(aksi)) e.push(`${t.nama}: kata serempak/berbaris dilarang: "${aksi}"`);
      if (aksi.split(/\s+/).length < 6) e.push(`${t.nama}: gerak terlalu samar "${aksi}" (tulis bagian tubuh, arah, jarak)`);
      semuaAksi.push({ t: t.nama, a, aksi: aksi.toLowerCase().trim() });
    });
  });
  // Tokoh berbeda tidak boleh punya aksi sama, dan gerak pertama tidak boleh mulai di detik yang sama.
  for (let i = 0; i < semuaAksi.length; i++) for (let j = i + 1; j < semuaAksi.length; j++) {
    const x = semuaAksi[i], y = semuaAksi[j];
    if (x.t !== y.t && x.aksi === y.aksi) e.push(`${x.t} dan ${y.t} punya gerak sama persis: "${x.aksi}"`);
  }
  const mulai = tokoh.filter((t) => !t.diam).map((t) => t.gerak?.[0]?.[0]);
  if (new Set(mulai).size < mulai.length) e.push(`gerak pertama beberapa tokoh mulai di detik yang sama (${mulai.join(', ')}); beri jeda 0.3-1.0s`);
  if (s.suasana && LAMBAT.test(s.suasana) && s.jenis === 'orang') e.push('suasana berisi kata lambat pada shot berorang');
  // Benda fokus wajib dikunci.
  const teks = [s.lingkungan?.detail, s.lingkungan?.depan, s.lock, ...tokoh.flatMap((t) => (t.gerak || []).map((g) => g[2]))].join(' ');
  const m = teks.match(new RegExp(BENDA.source, 'gi')) || [];
  const dikunci = (s.benda || []).map((b) => `${b.nama} ${b.detail}`.toLowerCase()).join(' ');
  for (const w of new Set(m.map((x) => x.toLowerCase()))) if (!dikunci.includes(w.replace(/s$/, ''))) e.push(`benda "${w}" disebut tapi tidak ada di benda[] (tulis bentuk, ukuran, bahan, warna, jumlah, cara dipegang)`);
  (s.benda || []).forEach((b) => {
    if (!BENTUK.test(b.detail)) e.push(`benda ${b.nama}: bentuk tidak ditulis (contoh koin: "small perfectly round flat disc")`);
    if (b.detail.split(/\s+/).length < 12) e.push(`benda ${b.nama}: detail terlalu pendek`);
  });
  return e;
}

// Gerbang untuk shots.json yang sudah jadi (jalankan-vx.mjs run). Mengembalikan daftar pelanggaran per shot.
export function cekPromptTeks(id, people, p) {
  const e = [];
  if (!/SPEED: real-time 1x/.test(p)) e.push('tanpa aturan SPEED real-time 1x (susun dengan promptHDT)');
  const nTokoh = (p.match(/^Character [A-Z] - /gm) || []).length;
  e.push(...cekSkripTeks(p, people !== 'none' ? Math.max(1, nTokoh) : 0));
  if (people !== 'none') {
    if (!/PERFORMANCE \(/.test(p)) e.push('tanpa blok PERFORMANCE per tokoh (susun dengan promptHDT)');
    const perf = p.split(/PERFORMANCE \(/)[1]?.split(/\n(?:ENVIRONMENT MOTION:|PROP LOCK|ENVIRONMENT:|SOUND:)/)[0] || '';
    const l = perf.match(LAMBAT); if (l) e.push(`kata lambat di blok PERFORMANCE: "${l[0]}"`);
    const r = perf.match(SERENTAK); if (r) e.push(`kata serempak di blok PERFORMANCE: "${r[0]}"`);
  }
  return e.map((x) => `${id}: ${x}`);
}

export function cekShotsFile(shotsJson, ids) {
  const pilih = ids ? new Set(ids) : null;
  return shotsJson.shots.filter((x) => !pilih || pilih.has(x.id)).flatMap((x) => cekPromptTeks(x.id, x.people, x.video_prompt || ''));
}
