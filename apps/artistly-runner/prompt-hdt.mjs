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

const LAMBAT = /\b(slow(ly|er)?|slow[- ]?motion|slo-?mo|in slow|gently drift(s|ing)?|languid(ly)?|dreamy|floaty)\b/i;
const SERENTAK = /\b(in unison|in sync|synchroni[sz]ed|all together|at the same time|simultaneously|march(es|ing)?|in step|in formation|in a row raising)\b/i;
// Benda yang biasa jadi fokus penonton -> wajib ada di benda[] dengan detail bentuk.
const BENDA = /\b(coins?|silver|sword|spear|staff|cane|bread|loaf|cup|bowl|jar|scroll|book|lamp|torch|key|ring|stone tablet|letter|basket|rope|knife|shield|crown)\b/i;
const BENTUK = /\b(round|circular|disc|flat|square|rectangular|oval|cylindrical|long|thin|thick|straight|curved|spherical|domed)\b/i;

export const SPEED = 'SPEED: real-time 1x playback, normal 24 fps live-action speed exactly like real-life footage. NOT slow motion, no time stretching, no floaty or dreamy movement. Every movement starts and ends at the seconds written below, with natural acceleration and deceleration.';
export const BEDA = 'INDIVIDUAL PERFORMANCE: every character performs his own different movement, starts at a different second and moves at his own tempo. Never two people doing the same gesture at the same moment, never marching, never stepping in sync, never a stiff uniform line like a parade.';
export const JAUH = 'BACKGROUND PEOPLE: people far in the background are mostly still or do small unrelated actions (shifting weight, adjusting a sleeve, turning a shoulder), never the same action as anyone else.';

const f = (t) => `${Number(t).toFixed(1)}s`;

export function promptHDT(s) {
  const err = cekShot(s);
  if (err.length) throw new Error(`${s.id}: prompt HDT ditolak:\n- ${err.join('\n- ')}`);
  const k = s.kamera;
  const baris = [`${s.id}: ${s.judul} (${s.len}s)`, s.aturan];
  if (s.jenis === 'orang') baris.push(SPEED, BEDA, JAUH);
  else baris.push(SPEED);
  baris.push(`STYLE: ${s.gaya}`,
    `CAMERA: ${k.framing}, ${k.lensa} lens. Movement: ${k.gerak}. Focus: ${k.fokus}. Purpose: ${k.tujuan}.`);
  if (s.tokoh?.length) {
    baris.push(`PERFORMANCE (real-time speed, ${s.tokoh.length} character${s.tokoh.length > 1 ? 's' : ''}):`);
    s.tokoh.forEach((t, i) => {
      const huruf = String.fromCharCode(65 + i);
      baris.push(`Character ${huruf} - ${t.nama}${t.posisi ? `, ${t.posisi}` : ''}:`);
      t.gerak.forEach(([a, b, aksi], j) => baris.push(`  Movement ${j + 1} (${f(a)}-${f(b)}): ${aksi}`));
      if (t.lain) baris.push(`  Otherwise: ${t.lain}`);
    });
  }
  if (s.suasana) baris.push(`ENVIRONMENT MOTION: ${s.suasana}`);
  if (s.benda?.length) baris.push('PROP LOCK (the audience looks at these, keep them exact in every frame):', ...s.benda.map((b) => `- ${b.nama}: ${b.detail}`));
  baris.push(`VISUALS: ${s.latar}`,
    `SOUND: 0-${s.len}s ${s.suara}. Only these sounds are heard, no music, no voices.`,
    `CONTINUITY LOCK:\nSTYLE: ${s.gaya}. Keep this exact style for the entire video.\n${s.lock}`,
    `${s.avoid} No slow motion. No synchronized identical movements. No marching or parade-like stepping.${s.benda?.length ? ' Props never change shape, size, number or color.' : ''}`);
  return baris.join('\n');
}

// Pemeriksa satu spesifikasi shot (sebelum prompt disusun).
export function cekShot(s) {
  const e = [];
  const k = s.kamera || {};
  for (const x of ['framing', 'lensa', 'gerak', 'fokus', 'tujuan']) if (!k[x]) e.push(`kamera.${x} kosong`);
  const tokoh = s.tokoh || [];
  if (s.jenis === 'orang' && !tokoh.length) e.push('shot berorang tanpa tokoh[] (gerak tiap tokoh wajib didefinisikan)');
  const semuaAksi = [];
  tokoh.forEach((t) => {
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
  const mulai = tokoh.map((t) => t.gerak?.[0]?.[0]);
  if (new Set(mulai).size < mulai.length) e.push(`gerak pertama beberapa tokoh mulai di detik yang sama (${mulai.join(', ')}); beri jeda 0.3-1.0s`);
  if (s.suasana && LAMBAT.test(s.suasana) && s.jenis === 'orang') e.push('suasana berisi kata lambat pada shot berorang');
  // Benda fokus wajib dikunci.
  const teks = [s.latar, s.lock, ...tokoh.flatMap((t) => (t.gerak || []).map((g) => g[2]))].join(' ');
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
  if (people !== 'none') {
    if (!/PERFORMANCE \(/.test(p)) e.push('tanpa blok PERFORMANCE per tokoh (susun dengan promptHDT)');
    const perf = p.split(/PERFORMANCE \(/)[1]?.split(/\n(?:ENVIRONMENT MOTION|PROP LOCK|VISUALS):/)[0] || '';
    const l = perf.match(LAMBAT); if (l) e.push(`kata lambat di blok PERFORMANCE: "${l[0]}"`);
    const r = perf.match(SERENTAK); if (r) e.push(`kata serempak di blok PERFORMANCE: "${r[0]}"`);
  }
  return e.map((x) => `${id}: ${x}`);
}

export function cekShotsFile(shotsJson, ids) {
  const pilih = ids ? new Set(ids) : null;
  return shotsJson.shots.filter((x) => !pilih || pilih.has(x.id)).flatMap((x) => cekPromptTeks(x.id, x.people, x.video_prompt || ''));
}
