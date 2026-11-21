// Adapter paket ChatGPT (gpt/INSTRUKSI-CHATGPT-PAKET.md, paket.json) -> lembar karakter + acuan lokasi + shots.json + kisah-vx.json.
// Dibuat 2026-11-21 untuk paket Piring Keempat / Uang Titipan (order PC-01). Isi cerita diambil dari paket; perubahan produksi
// (mis. kamera di belakang tokoh yang menghadap kamera) wajib ditulis di <prod>/penyesuaian.json dengan alasan, bukan diam-diam.
//
// pakai:
//   node paket-kisah.mjs cek    <paketDir> <prodDir> <PREFIX>               -> laporan validasi (VALIDASI.md)
//   node paket-kisah.mjs lembar <paketDir> <prodDir> <PREFIX>               -> <prod>/lembar/naskah.json (Artistly: lembar tokoh + lokasi)
//   node paket-kisah.mjs shots  <paketDir> <prodDir> <PREFIX> film|shorts    -> <prod>/<set>/shots.json + kisah-vx.json
//        env BATCH=1-11 membatasi shots.json ke nomor shot itu (picker VideoExpress hanya menjangkau gambar terbaru).
// WAJIB per kelompok kecil (2026-11-21 PC01PK: 30 dari 42 gambar hilang dari picker): gambar (HANYA=<=8 shot) -> tinjau ->
//   pilih.json -> run kelompok itu SEGERA, baru kelompok berikutnya. Picker VideoExpress hanya menjangkau ~25 gambar terbaru dan
//   gambar buatan VideoExpress tidak bisa diimpor ulang. Gambar diganti -> naikkan "versi" (ID baru).
// REVISI OWNER 2026-11-22 (FATAL, menggantikan aturan 2026-11-21 "kamera belakang / tanpa close-up tangan"): sudut kamera TIDAK
//   boleh dikorbankan demi lolos QC faceless. Faceless = wajah polos tanpa mata/alis/hidung/mulut dari sudut mana pun, BUKAN wajah
//   disembunyikan. Kamera mengikuti storyboard (lihat skills/jota-video/references/STANDAR_SINEMATIK_KANG_OHAN.md): establishing
//   eksterior bangunan, wide, medium, OTS, close-up tangan/benda, low/high angle, tracking, drone. Wajah yang muncul = perbaiki
//   lembar/prompt/gambar awal dan render ulang, bukan memutar kamera ke punggung.
// Gaya: 3D realistis sinematik (image_type 3d), satu gaya per film. Transisi halus: "sambung": true -> LAST_FRAME shot sebelumnya.
// penyesuaian.json: { "tokoh": {"A": {"tubuh": "..."}}, "shot": {"F21": {"pose": "...", "gerak": "...", "kamera": "<kunci KAMERA atau teks bebas>", "sambung": true, "alasan": "..."}} }
import fs from 'node:fs';
import path from 'node:path';
import { skripGambar, skripLembar, skripAcuan, cekPemeran, cekLingkungan } from './pemeran.mjs';

const [mode, paketDir, prodDir, PREFIX, SET = 'film'] = process.argv.slice(2);
if (!mode || !paketDir || !prodDir || !PREFIX) throw new Error('pakai: node paket-kisah.mjs cek|lembar|shots <paketDir> <prodDir> <PREFIX> [film|shorts]');
const baca = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const P = baca(path.join(paketDir, 'paket.json'));
if (!P) throw new Error('PACKAGE_NOT_FOUND: paket.json tidak ada atau tidak valid di ' + paketDir);
const ADJ = baca(path.join(prodDir, 'penyesuaian.json'), { tokoh: {}, shot: {} });
const TOKOH = Object.fromEntries(Object.entries(P.tokoh).map(([k, t]) => [k, { ...t, ...(ADJ.tokoh?.[k] || {}) }]));
const pad = (n) => String(n).padStart(2, '0');
const nomor = (id) => Number(String(id).replace(/\D/g, ''));
const namaLembar = (k) => `${PREFIX}_LBR_${k}`; // lembar 4 sudut: hanya cek mata
const namaAcuan = (k) => `${PREFIX}_ACU_${k}`; // satu figur: Reference Photo VideoExpress
const namaLokasi = (k) => `${PREFIX}_LOK_${k}`;
const BOILER = /Fully faceless humans, no eyes, nose or mouth anywhere\.\s*|\s*Keep the established wardrobe and room layout\.\s*|\s*Hide all front faces\.|\s*Real-time 1x speed, one action only; preserve object count and placement\.|\s*Vertical 9:16 safe composition\./g;
const bersih = (s = '') => s.replace(BOILER, '').replace(/\s+/g, ' ').trim();
const BAD = /\b(slow|slowly|slow motion|in unison|in sync|marching|all together)\b/i;
const kata = (n) => n.map((x) => x.teks).join(' ').trim().split(/\s+/).filter(Boolean).length;

function cek() {
  const e = [], w = [];
  for (const [k, t] of Object.entries(TOKOH)) for (const x of cekPemeran([t]).filter((x) => !/kurang beragam|tinggi badannya sama/.test(x))) e.push(`tokoh ${k}: ${x}`);
  const semua = Object.values(TOKOH);
  if (semua.length >= 2) for (const x of cekPemeran(semua).filter((x) => /sama/.test(x))) w.push(`tokoh: ${x}`);
  for (const [k, l] of Object.entries(P.lokasi)) for (const x of cekLingkungan(l)) e.push(`lokasi ${k}: ${x}`);
  for (const set of ['film', 'shorts']) {
    const S = P[set] || [];
    w.push(`${set}: ${S.length} shot (jumlah mengikuti cerita, tidak dipatok)`);
    let dur = 0;
    for (const s0 of S) {
      const s = { ...s0, ...(ADJ.shot?.[s0.id] || {}) };
      if ((s.tokoh || []).length > 2) e.push(`${s.id}: ${s.tokoh.length} tokoh (maks 2)`);
      if ((s.tokoh || []).length >= 2 && s.tokoh.every((t) => TOKOH[t])) for (const x of cekPemeran(s.tokoh.map((t) => TOKOH[t]))) e.push(`${s.id} (${s.tokoh.join('+')}): ${x}`);
      for (const t of s.tokoh || []) if (!TOKOH[t]) e.push(`${s.id}: tokoh ${t} tidak didefinisikan`);
      if (!P.lokasi[s.lokasi]) e.push(`${s.id}: lokasi ${s.lokasi} tidak didefinisikan`);
      if (BAD.test([s.pose, s.gerak, s.kamera].join(' '))) e.push(`${s.id}: kata terlarang "${[s.pose, s.gerak, s.kamera].join(' ').match(BAD)[0]}"`);
      if (!(s.narasi || []).length) w.push(`${s.id}: tanpa narasi`);
      for (const n of s.narasi || []) if (n.suara !== 'NARATOR' && !P.suara?.[n.suara] && !P.suara?.['TOKOH_' + n.suara]) e.push(`${s.id}: suara ${n.suara} tanpa pemetaan`);
      dur += Math.max(kata(s.narasi || []) * 0.55, 0);
      // Owner 2026-11-22: kamera dikorbankan demi faceless = FATAL. Tolak sisa aturan lama di storyboard/penyesuaian.
      if (/\b(belakang|tangan)\b|facing away|from behind only|seen only from behind|\brear\b|no front view|crop all heads|hide all front faces/i.test(String(s.kamera || ''))) e.push(`${s.id}: kamera "${s.kamera}" = aturan lama menyembunyikan wajah; pakai bahasa kamera STANDAR_SINEMATIK`);
      if (kata(s.narasi || []) > 26) w.push(`${s.id}: narasi ${kata(s.narasi || [])} kata dalam satu shot (buru-buru); pecah jadi 2 shot / beri adegan reaksi`);
    }
    w.push(`${set}: narasi total sekitar ${Math.round(dur)} detik (0,55 dtk/kata)`);
    // Kualitas storyboard (STANDAR_SINEMATIK_KANG_OHAN.md): hook visual, establishing tiap lokasi baru, variasi ukuran shot.
    const ss = S.map((s0) => ({ ...s0, ...(ADJ.shot?.[s0.id] || {}) }));
    if (ss.length && !/establishing|drone|low|close|insert|tracking/i.test(String(ss[0].kamera || ''))) w.push(`${set}: shot 1 (HOOK) tanpa kamera kuat (${ss[0]?.kamera || 'kosong'}); hook wajib klip klimaks bergerak dengan sudut dramatis`);
    const lokasiAwal = new Set();
    for (const s of ss) if (!lokasiAwal.has(s.lokasi)) { lokasiAwal.add(s.lokasi); if (!/establishing|drone|wide/i.test(String(s.kamera || ''))) w.push(`${s.id}: lokasi ${s.lokasi} muncul pertama tanpa establishing/wide (penonton tidak tahu ini di mana)`); }
    for (let i = 2; i < ss.length; i++) if (ss[i].kamera && ss[i].kamera === ss[i - 1].kamera && ss[i].kamera === ss[i - 2].kamera) w.push(`${ss[i].id}: 3 shot berturut-turut kamera "${ss[i].kamera}" (monoton)`);
    if (set === 'film' && dur < 480) w.push(`film: ${Math.round(dur / 60 * 10) / 10} menit < 8 menit (strategi long-form 8-12 menit). Durasi mengikuti cerita: kembangkan storyboard (setup, konflik bertahap, reaksi, akibat), jangan memadatkan cerita.`);
  }
  if (!P.ayat_layar?.length) w.push('ayat_layar kosong');
  return { e, w };
}

// Bahasa kamera (STANDAR_SINEMATIK_KANG_OHAN.md). Kunci di storyboard/penyesuaian: kamera "<kunci>" atau teks bebas sutradara.
// [frame gambar awal, gerak kamera di klip]. Satu gerak kamera per klip, gerak harus masuk akal secara fisik.
const KAMERA = {
  establishing: ['ESTABLISHING EXTERIOR: wide shot of the whole building facade and the street in front of it, eye level from across the street, clear architecture (roofline, storefront, doors, windows, awning, signboard without letters), people small in the frame.', 'The camera glides slowly sideways along the street (smooth dolly), revealing the building.'],
  drone: ['AERIAL: high drone view of the neighbourhood with the main building clearly in the centre.', 'The drone camera moves forward and slowly tilts down toward the building.'],
  wide: ['WIDE SHOT at eye level showing the whole space, the characters full body inside it, clear depth with foreground, midground and background.', 'The camera slowly pushes in a little.'],
  medium: ['MEDIUM SHOT from the front three-quarter angle at eye level, characters from the knees or waist up, blank faces clearly visible.', 'The camera holds steady with a gentle handheld breathing.'],
  ots: ['OVER-THE-SHOULDER SHOT: from behind the shoulder of the first character toward the second character, who faces the camera with a blank smooth face.', 'The camera holds steady, slight drift.'],
  close: ['CLOSE-UP of the main character from the chest up, front three-quarter angle, the blank smooth face clearly visible, shallow depth of field.', 'The camera slowly pushes in.'],
  insert: ['INSERT CLOSE-UP of the hands and the key object, the body partly visible and soft in the background, shallow depth of field.', 'The camera stays still, macro focus on the object.'],
  low: ['LOW ANGLE shot from below waist height looking up at the character, strong and heroic, sky or ceiling behind.', 'The camera slowly rises.'],
  high: ['HIGH ANGLE shot looking down at the character, making him or her look small and vulnerable.', 'The camera slowly cranes down.'],
  tracking: ['TRACKING SHOT from the side, the character walks in the direction the body faces.', 'The camera tracks alongside at the same speed.'],
  diam: ['', 'The camera stays completely still on a tripod.']
};
const kamera = (k, orang) => (KAMERA[k] || (k ? [String(k), ''] : KAMERA[orang ? 'medium' : 'wide']));
// Gaya diputuskan sekali per channel (owner 2026-11-22 "harus bisa decide"): 3D realistis sinematik. Alasan di STANDAR_SINEMATIK.
const GAYA_3D = '3D realistic cinematic animation, feature-film CGI quality, natural skin and fabric texture, physically based materials, cinematic lighting with clear key light, rich but natural colour grade';
const STYLE = `STYLE: ${GAYA_3D}.`;
// Owner 2026-11-22: "every person" + Reference Photo lembar 4 sudut = keempat figur ikut digambar. Sebut jumlah orang langsung,
// acuan = satu figur (namaAcuan), jangan menyebut "reference sheet" / "every person".
const SEBUT = ['', 'The one person in this scene', 'Both people in this scene'];
const aturan = (n) => ['MANDATORY RULES:',
  `FACELESS: ${SEBUT[n] || 'The people in this scene'} ${n === 1 ? 'has' : 'have'} a smooth blank natural skin face with no eyes, no eyebrows, no nose, no lips and no mouth, seen from any angle (front, three-quarter, profile, close-up), keeping the natural sculpted head shape with soft cheek, jaw and chin volume (never a flat oval patch). Not a mask, not hidden.`,
  `IDENTITY: ${n === 1 ? 'the reference photo shows this one person from several angles for identity only; draw him only once' : 'each reference photo shows one of them from several angles for identity only; draw each only once'} (same body, height, skin, hair or head covering, clothes and accessories), never copy the row of poses. Exactly ${n === 1 ? 'one person' : n === 2 ? 'two people' : n + ' people'} in the whole frame.`,
  'OBJECTS: draw every object exactly as written, with the exact count; no duplicated objects.', STYLE].join('\n');
const KOSONG = ['MANDATORY RULES:', 'NO PEOPLE: no person, figure, body, hand or silhouette appears anywhere in the frame.', 'OBJECTS: draw every object exactly as written, with the exact count; no duplicated objects.', STYLE].join('\n');
const ringkas = (t) => `${t.peran.split(',')[0]}, ${t.usia}, ${t.pakaian.split(',')[0]}${/^none/i.test(t.penutup) ? ', bare head' : `, ${t.penutup}`}`;

function lembar() {
  const dir = path.join(prodDir, 'lembar'); fs.mkdirSync(dir, { recursive: true });
  const halaman = [], daftar = [];
  for (const [k, t] of Object.entries(TOKOH)) {
    halaman.push({ script: skripAcuan(t) }); daftar.push(`hal-${pad(halaman.length)} -> ${namaAcuan(k)} (tokoh ${k}: ${t.peran}; ACUAN satu figur, opsi penyesuaian acuan=ACU)`);
    halaman.push({ script: skripLembar(t) }); daftar.push(`hal-${pad(halaman.length)} -> ${namaLembar(k)} (tokoh ${k}: lembar 4 sudut = Reference Photo bawaan)`);
  }
  for (const [k, l] of Object.entries(P.lokasi)) {
    halaman.push({ script: `${KOSONG}\n${skripGambar({ pemeran: [], lingkungan: l, adegan: `LOCATION REFERENCE: wide establishing view of the whole ${l.lokasi}, eye level, everything in its fixed place.`, tambahan: 'Wide landscape 16:9 frame.' })}` });
    daftar.push(`hal-${pad(halaman.length)} -> ${namaLokasi(k)} (lokasi ${k}: ${l.lokasi})`);
  }
  fs.writeFileSync(path.join(dir, 'naskah.json'), JSON.stringify({ nama_pdf: `${PREFIX} lembar.pdf`, kategori_v6: 'Artistic Designer V2', gaya: 'kisah-3d-realistis', rasio: '16:9', karakter: [], halaman }, null, 1));
  fs.writeFileSync(path.join(dir, 'NAMA-IMPOR.txt'), daftar.join('\n') + '\n');
  console.log(daftar.join('\n'));
}

function shots() {
  const S = (P[SET] || []).map((s0) => ({ ...s0, ...(ADJ.shot?.[s0.id] || {}) }));
  const ratio = SET === 'shorts' ? '9:16' : '16:9';
  const tag = `${PREFIX}${SET === 'shorts' ? 'S' : 'F'}`;
  const dir = path.join(prodDir, SET); fs.mkdirSync(dir, { recursive: true });
  const PILIH = baca(path.join(dir, 'pilih.json'), {});
  const [b0, b1] = (process.env.BATCH || '').split('-').map(Number);
  const FRAME = ratio === '9:16' ? 'Vertical 9:16 frame, staged in depth, subject large in frame (not a cropped wide shot).' : 'Wide 16:9 cinematic frame.';
  const list0 = [];
  const list = S.map((s) => {
    // versi ulang: gambar awal pengganti butuh ID adegan baru (SHOT107 = shot 7 versi 2); urutan rakit tetap nomor paket.
    const h0 = nomor(s.id), h = h0 + 100 * ((s.versi || 1) - 1), id = `SHOT${pad(h)}`, orang = (s.tokoh || []).length > 0;
    const pem = (s.tokoh || []).map((k) => TOKOH[k]);
    const [framing, gerakKamera] = kamera(s.kamera, orang);
    const pose = bersih(s.pose);
    const benda = (s.benda || []).map((b) => b.detail).join('; ');
    const adegan = `${framing ? framing + ' ' : ''}${pose}${benda ? ` Objects: ${benda}.` : ''}`.trim();
    const pilih = PILIH[h];
    // sambung (transisi halus, tanpa jump cut): gambar awal = frame terakhir shot sebelumnya (runner LAST_FRAME).
    const prev = list0[list0.length - 1];
    const sambung = s.sambung && prev && !pilih;
    const roles = pem.map((t, i) => `CHARACTER ${String.fromCharCode(65 + i)}: role: ${ringkas(t)}.`);
    const vp = (orang
      ? [`${id}: ${pose} ${gerakKamera}`.trim(), 'FACELESS LOCK: every person stays faceless for the entire video, with the same smooth blank face as in the start image, also when a head turns toward the camera or the camera moves closer. Hair or head covering and clothes exactly as in the start image for the entire video. Objects keep their count. No speaking, no lip movement.', 'SPEED: real-time 1x.', `PERFORMANCE (scene): ${bersih(s.gerak)}`, ...roles]
      : [`${id}: ${pose} ${gerakKamera}`.trim(), 'The scene stays empty of people for the entire video. Objects keep their count.', 'SPEED: real-time 1x.', `PERFORMANCE (scene): ${bersih(s.gerak)}`]
    ).concat(sambung ? ['CONTINUITY: continue directly from the start frame; the same motion continues from the very first frame, same light direction, same positions.'] : [])
      .concat(`ENVIRONMENT: location: ${P.lokasi[s.lokasi].lokasi}; light: ${P.lokasi[s.lokasi].cahaya}.`).join('\n');
    if (sambung) prev.save_last_frame = true;
    const item = {
      id, title: `${s.id} ${s.babak}`, people: orang ? 'yes' : 'none', adegan: h,
      start: pilih ? { type: 'PAKAI_ULANG', image: pilih, folder: pilih.startsWith(`${PREFIX}_`) ? 'My Artistly Images' : 'My AI Images' } : sambung ? { type: 'LAST_FRAME', from: prev.id } : { type: 'BARU' },
      refs: orang && !pilih && !sambung ? (s.tokoh || []).map((k) => ({ library: 'My Artistly Images', name: ADJ.acuan === 'ACU' ? namaAcuan(k) : namaLembar(k), peran: 'tokoh' })) : [],
      consistent_character: orang && !pilih && !sambung, image_type: '3d',
      length: Math.min(10, Math.max(5, Math.ceil(kata(s.narasi || []) / 1.7 + 1))), save_last_frame: false, transition: 'cut', narration: '',
      // SATU orang: lembar berisi 4 pose orang yang sama sering digambar jadi kembar (PC01PK SHOT02/10/12).
      image_prompt: `${orang ? aturan(pem.length) : KOSONG}\n${skripGambar({ pemeran: pem, lingkungan: P.lokasi[s.lokasi], adegan, tambahan: FRAME })}`,
      format: 'natural', video_prompt: vp, _paket: s.id, _alasan: ADJ.shot?.[s.id]?.alasan
    };
    // First Frame, Last Frame (runner tool first_last): "akhir" = pose frame akhir (mis. tokoh berbalik, wide -> close).
    // Runner: gambar awal BARU dibuat di dialog alat itu (tidak bisa PAKAI_ULANG/LAST_FRAME).
    if (s.akhir && !pilih && !sambung) {
      const [fr2] = kamera(s.kamera_akhir || s.kamera, orang);
      item.tool = 'first_last';
      item.last_frame_prompt = `${orang ? aturan(pem.length) : KOSONG}\nLAST FRAME of the same shot: same place, same light, same clothes and objects as the first frame.\n${skripGambar({ pemeran: pem, lingkungan: P.lokasi[s.lokasi], adegan: `${fr2 ? fr2 + ' ' : ''}${bersih(s.akhir)}`, tambahan: FRAME })}`;
      item.video_prompt = item.video_prompt.replace('SPEED: real-time 1x.', 'SPEED: real-time 1x.\nTRANSITION: one continuous natural movement from the first frame to the last frame with smooth easing; nothing else changes.');
    }
    list0.push(item);
    return item;
  });
  const hanya = (process.env.HANYA || '').split(',').filter(Boolean).map(Number); // HANYA=107,109 -> hanya ID itu
  const aktif = list.filter((x) => (hanya.length ? hanya.includes(x.adegan) : !b0 || ((x.adegan % 100 || 100) >= b0 && (x.adegan % 100 || 100) <= (b1 || b0))));
  // gambar_sumber.json: nama gambar pilihan -> file lokal (impor ulang otomatis jalankan-vx bila picker tidak menjangkau).
  const sumber = baca(path.join(dir, 'gambar_sumber.json'), {});
  for (const nama of Object.values(PILIH)) { const m = nama.match(/-(SHOT\d+)-AWAL-(\d+)$/); if (m) sumber[nama] = path.join(dir, 'awal', `${m[1]}-${m[2]}.png`); }
  fs.writeFileSync(path.join(dir, 'gambar_sumber.json'), JSON.stringify(sumber, null, 2));
  fs.writeFileSync(path.join(dir, 'shots.json'), JSON.stringify({ project: `${PREFIX}-${SET.toUpperCase()}`, tag, revision: 1, ratio, image_type: '3d', enhance: false,
    _catatan: `${P.judul} ${SET} ${ratio}, batch ${process.env.BATCH || 'semua'}. Dari paket ChatGPT; ${P.label_ilustrasi}`, shots: aktif }, null, 2));

  // Rakit (motion-kisah.py). Panel ayat pada shot yang narasinya membaca terjemah/rujukan ayat.
  const meta = fs.existsSync(path.join(paketDir, 'METADATA_YOUTUBE.md')) ? fs.readFileSync(path.join(paketDir, 'METADATA_YOUTUBE.md'), 'utf8') : '';
  const hook = (meta.match(/Thumbnail:\s*([^;\n]+)/) || [])[1]?.trim();
  const ay = P.ayat_layar?.[0];
  const surah = (P.sumber?.[0] || '').replace(/^QS\.\s*/, '').split(/\s+\d/)[0].trim();
  const tanpaKurung = (t) => t.replace(/[()]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  const pakaiAyat = (s) => ay && (s.narasi || []).some((n) => tanpaKurung(n.teks).includes(tanpaKurung(ay.terjemah).slice(0, 25)) || (surah && n.teks.includes(surah)));
  const suara = (k) => P.suara?.['TOKOH_' + k] || P.suara?.[k];
  const KISAH = {
    rasio: ratio, judul: P.judul.toUpperCase(), subjudul: P.subjudul,
    narator: { voice_id: 'gpzZjtWbZNetDrq8CXKD', _nama: 'JOTA Yudo', stability: 0.5, style: 0.3, speed: 0.95 },
    pemeran: Object.fromEntries(Object.keys(TOKOH).filter(suara).map((k) => [k, suara(k)])),
    hook_teks: hook, judul_overlay: true,
    intro: { teks: ['KANG OHAN', 'PRESENTS'], durasi: 1.6, sfx: 'cinematic trailer logo reveal, deep boom impact with shimmering sparkle and long reverb tail' },
    perlambat_maks: 1.0,
    sfx: { judul: 'deep cinematic boom impact with reverb tail', penutup: 'soft reflective cinematic chime with gentle reverb', volume: 0.3 },
    adegan: list.map((x, i) => {
      const s = S[i];
      // ia_dia (owner 2026-11-21 "ia=dia"): ElevenLabs sering salah melafalkan "ia" -> narasi memakai "dia".
      const lafal = (t) => (ADJ.ia_dia ? t.replace(/\bIa\b/g, 'Dia').replace(/\bia\b/g, 'dia') : t);
      const narasi = (s.narasi || []).map((n) => (n.suara === 'NARATOR' ? lafal(n.teks) : { tokoh: n.suara, teks: lafal(n.teks) }));
      return { hal: x.adegan, klip: s.klip || `${tag}-${x.id}.mp4`, narasi, sfx: `${s.sfx || 'quiet natural room tone'}, no music`, ...(pakaiAyat(s) ? { overlay: `ayat/ayat-${pad(ay.surah)}${String(ay.ayat).padStart(3, '0')}.png`, overlay_y: ratio === '9:16' ? 0.33 : 0.30 } : {}) };
    }),
    penutup: [P.penutup?.[0] || '', `Cerita fiksi, visual ilustrasi | ${P.penutup?.[1] || P.sumber?.[0] || ''}`],
    watermark: 'Kang Ohan Properties', akun: { judul: 'IKUTI KAMI', ig: '@kohar_u3', youtube: '@ohankang', facebook: '' },
    keluaran: `video/${P.judul} - ${SET === 'shorts' ? 'Shorts' : 'Film'}.mp4`
  };
  fs.writeFileSync(path.join(dir, 'kisah-vx.json'), JSON.stringify(KISAH, null, 2));
  console.log(`${SET} ${ratio} tag ${tag}: ${aktif.length}/${list.length} shot ke shots.json; perkiraan klip ${list.reduce((a, x) => a + x.length, 0)} dtk`);
  console.log(aktif.map((x) => `${x.id} ${x._paket} ${x.length}s ${x.people} refs=${x.refs.map((r) => r.name).join('+') || '-'} vid=${x.video_prompt.length}${x._alasan ? ' [ADJ]' : ''}`).join('\n'));
}

if (mode === 'cek') {
  const { e, w } = cek();
  const teks = `# VALIDASI ${P.judul} (${PREFIX})\n\n${e.length ? 'STATUS: DITOLAK' : 'STATUS: LOLOS'}\n\n## Error\n${e.map((x) => '- ' + x).join('\n') || '- tidak ada'}\n\n## Catatan\n${w.map((x) => '- ' + x).join('\n')}\n\n## Penyesuaian produksi (penyesuaian.json)\n${Object.entries(ADJ.tokoh || {}).map(([k, v]) => `- tokoh ${k}: ${JSON.stringify(v)}`).concat(Object.entries(ADJ.shot || {}).map(([k, v]) => `- ${k}: ${v.alasan || JSON.stringify(v)}`)).join('\n') || '- tidak ada'}\n`;
  fs.mkdirSync(prodDir, { recursive: true }); fs.writeFileSync(path.join(prodDir, 'VALIDASI.md'), teks); console.log(teks);
  if (e.length) process.exitCode = 2;
} else if (mode === 'lembar') lembar();
else if (mode === 'lokasi') {
  // Acuan lokasi lewat VideoExpress Create Image (2026-11-21: gaya preset kisah di Artistly menggambar kerumunan di acuan lokasi).
  const dir = path.join(prodDir, 'lokasi'); fs.mkdirSync(dir, { recursive: true });
  const shots = Object.entries(P.lokasi).map(([k, l], i) => ({
    id: `SHOT${pad(i + 1)}`, title: `LOKASI ${k}`, people: 'none', adegan: i + 1, start: { type: 'BARU' }, refs: [], consistent_character: false, image_type: 'human', length: 5, save_last_frame: false, transition: 'cut', narration: '',
    image_prompt: `${KOSONG}\n${skripGambar({ pemeran: [], lingkungan: l, adegan: `LOCATION REFERENCE: completely empty wide establishing view of the whole ${l.lokasi}, eye level, everything in its fixed place, nobody there.`, tambahan: 'Wide 16:9 cinematic frame.' })}`,
    format: 'natural', video_prompt: `SHOT${pad(i + 1)}: empty ${l.lokasi}. The camera stays completely still on a tripod. The scene stays empty of people for the entire video.\nSPEED: real-time 1x.\nPERFORMANCE (scene): light stays steady.\nENVIRONMENT: location: ${l.lokasi}; light: ${l.cahaya}.`, _lokasi: k
  }));
  fs.writeFileSync(path.join(dir, 'shots.json'), JSON.stringify({ project: `${PREFIX}-LOKASI`, tag: `${PREFIX}L`, revision: 1, ratio: '16:9', image_type: 'human', enhance: false, _catatan: `Acuan lokasi ${P.judul} (hanya gambar awal).`, shots }, null, 2));
  console.log(shots.map((s) => `${s.id} -> lokasi ${s._lokasi}`).join('\n'));
}
else if (mode === 'shots') shots();
else throw new Error('mode tidak dikenal: ' + mode);
