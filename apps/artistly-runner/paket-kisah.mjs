// Adapter paket ChatGPT (gpt/INSTRUKSI-CHATGPT-PAKET.md, paket.json) -> lembar karakter + acuan lokasi + shots.json + kisah-vx.json.
// Dibuat 2026-11-21 untuk paket Piring Keempat / Uang Titipan (order PC-01). Isi cerita diambil dari paket; perubahan produksi
// (mis. kamera di belakang tokoh yang menghadap kamera) wajib ditulis di <prod>/penyesuaian.json dengan alasan, bukan diam-diam.
//
// pakai:
//   node paket-kisah.mjs cek    <paketDir> <prodDir> <PREFIX>               -> laporan validasi (VALIDASI.md)
//   node paket-kisah.mjs lembar <paketDir> <prodDir> <PREFIX>               -> <prod>/lembar/naskah.json (Artistly: lembar tokoh + lokasi)
//   node paket-kisah.mjs shots  <paketDir> <prodDir> <PREFIX> film|shorts    -> <prod>/<set>/shots.json + kisah-vx.json
//        env BATCH=1-11 membatasi shots.json ke nomor shot itu (picker VideoExpress hanya menjangkau gambar terbaru).
// penyesuaian.json: { "tokoh": {"A": {"tubuh": "..."}}, "shot": {"F21": {"pose": "...", "gerak": "...", "kamera": "belakang|diam|tangan", "alasan": "..."}} }
import fs from 'node:fs';
import path from 'node:path';
import { skripGambar, skripLembar, cekPemeran, cekLingkungan } from './pemeran.mjs';

const [mode, paketDir, prodDir, PREFIX, SET = 'film'] = process.argv.slice(2);
if (!mode || !paketDir || !prodDir || !PREFIX) throw new Error('pakai: node paket-kisah.mjs cek|lembar|shots <paketDir> <prodDir> <PREFIX> [film|shorts]');
const baca = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const P = baca(path.join(paketDir, 'paket.json'));
if (!P) throw new Error('PACKAGE_NOT_FOUND: paket.json tidak ada atau tidak valid di ' + paketDir);
const ADJ = baca(path.join(prodDir, 'penyesuaian.json'), { tokoh: {}, shot: {} });
const TOKOH = Object.fromEntries(Object.entries(P.tokoh).map(([k, t]) => [k, { ...t, ...(ADJ.tokoh?.[k] || {}) }]));
const pad = (n) => String(n).padStart(2, '0');
const nomor = (id) => Number(String(id).replace(/\D/g, ''));
const namaLembar = (k) => `${PREFIX}_LBR_${k}`;
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
    const harap = set === 'film' ? 42 : 9;
    if (S.length !== harap) w.push(`${set}: ${S.length} shot (diminta ${harap})`);
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
    }
    w.push(`${set}: narasi total sekitar ${Math.round(dur)} detik (0,55 dtk/kata)`);
  }
  if (!P.ayat_layar?.length) w.push('ayat_layar kosong');
  return { e, w };
}

// Kamera faceless (RESEP_KISAH 2b.5): diam jauh di belakang, tidak mendekat/mengitari; close-up hanya tangan tanpa kepala.
const KAMERA = {
  belakang: 'The camera stays fixed far behind them at the same distance for the whole clip; it never moves closer and never circles around.',
  diam: 'The camera stays completely still on a tripod.',
  tangan: 'Close shot of only the hands and forearms; the frame cuts off below the shoulders so no head is in the frame. The camera stays still.'
};
const FRAME_POSE = { belakang: 'Seen from directly behind or from a rear three-quarter angle at a medium distance, medium wide shot.', diam: '', tangan: 'Close shot of only the hands and forearms, no head in the frame.' };
const STYLE = `STYLE: ${P.gaya || 'realistic cinematic live-action'}.`.replace(/, no eyes nose mouth, no music/, '');
const ATURAN = ['MANDATORY RULES:',
  'FACELESS: every person has a perfectly smooth blank natural skin surface where the face would be, exactly like the reference sheet: no eyes, no eyebrows, no nose, no lips, also in profile. Not a mask. Nobody faces the camera.',
  'REFERENCE: each reference image is a character sheet of ONE person seen from three angles; draw each person exactly once with the same body, height, skin, hair or head covering, clothes and accessories.',
  'OBJECTS: draw every object exactly as written, with the exact count; no duplicated objects.', STYLE].join('\n');
const KOSONG = ['MANDATORY RULES:', 'NO PEOPLE: no person, figure, body, hand or silhouette appears anywhere in the frame.', 'OBJECTS: draw every object exactly as written, with the exact count; no duplicated objects.', STYLE].join('\n');
const ringkas = (t) => `${t.peran.split(',')[0]}, ${t.usia}, ${t.pakaian.split(',')[0]}${/^none/i.test(t.penutup) ? ', bare head' : `, ${t.penutup}`}`;

function lembar() {
  const dir = path.join(prodDir, 'lembar'); fs.mkdirSync(dir, { recursive: true });
  const halaman = [], daftar = [];
  for (const [k, t] of Object.entries(TOKOH)) { halaman.push({ script: skripLembar(t) }); daftar.push(`hal-${pad(halaman.length)} -> ${namaLembar(k)} (tokoh ${k}: ${t.peran})`); }
  for (const [k, l] of Object.entries(P.lokasi)) {
    halaman.push({ script: `${KOSONG}\n${skripGambar({ pemeran: [], lingkungan: l, adegan: `LOCATION REFERENCE: wide establishing view of the whole ${l.lokasi}, eye level, everything in its fixed place.`, tambahan: 'Wide landscape 16:9 frame.' })}` });
    daftar.push(`hal-${pad(halaman.length)} -> ${namaLokasi(k)} (lokasi ${k}: ${l.lokasi})`);
  }
  fs.writeFileSync(path.join(dir, 'naskah.json'), JSON.stringify({ nama_pdf: `${PREFIX} lembar.pdf`, kategori_v6: 'Artistic Designer V2', gaya: 'kisah-sinematik-natural', rasio: '16:9', karakter: [], halaman }, null, 1));
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
  const FRAME = ratio === '9:16' ? 'Vertical 9:16 frame.' : 'Wide 16:9 cinematic frame.';
  const list = S.map((s) => {
    const h = nomor(s.id), id = `SHOT${pad(h)}`, orang = (s.tokoh || []).length > 0;
    const pem = (s.tokoh || []).map((k) => TOKOH[k]);
    const cam = s.kamera in KAMERA ? s.kamera : orang ? 'belakang' : 'diam';
    const pose = bersih(s.pose);
    const benda = (s.benda || []).map((b) => b.detail).join('; ');
    const adegan = `${orang ? FRAME_POSE[cam] + ' ' : ''}${pose}${benda ? ` Objects: ${benda}.` : ''}`.trim();
    const pilih = PILIH[h];
    const roles = pem.map((t, i) => `CHARACTER ${String.fromCharCode(65 + i)}: role: ${ringkas(t)}, seen only from behind or the side.`);
    const vp = (orang
      ? [`${id}: ${pose} ${KAMERA[cam]} Every person stays faceless for the entire video, hair or head covering and clothes exactly as in the start image for the entire video. Objects keep their count. No speaking.`, 'SPEED: real-time 1x.', `PERFORMANCE (scene): ${bersih(s.gerak)}`, ...roles]
      : [`${id}: ${pose} ${KAMERA[cam]} The scene stays empty of people for the entire video. Objects keep their count.`, 'SPEED: real-time 1x.', `PERFORMANCE (scene): ${bersih(s.gerak)}`]
    ).concat(`ENVIRONMENT: location: ${P.lokasi[s.lokasi].lokasi}; light: ${P.lokasi[s.lokasi].cahaya}.`).join('\n');
    return {
      id, title: `${s.id} ${s.babak}`, people: orang ? 'yes' : 'none', adegan: h,
      start: pilih ? { type: 'PAKAI_ULANG', image: pilih, folder: pilih.startsWith(`${PREFIX}_`) ? 'My Artistly Images' : 'My AI Images' } : { type: 'BARU' },
      refs: orang && !pilih ? (s.tokoh || []).map((k) => ({ library: 'My Artistly Images', name: namaLembar(k), peran: 'tokoh' })) : [],
      consistent_character: orang && !pilih, image_type: 'human',
      length: Math.min(10, Math.max(5, Math.ceil(kata(s.narasi || []) / 1.7 + 1))), save_last_frame: false, transition: 'cut', narration: '',
      image_prompt: `${orang ? ATURAN : KOSONG}\n${skripGambar({ pemeran: pem, lingkungan: P.lokasi[s.lokasi], adegan, tambahan: FRAME })}`,
      format: 'natural', video_prompt: vp, _paket: s.id, _alasan: ADJ.shot?.[s.id]?.alasan
    };
  });
  const aktif = list.filter((x) => !b0 || (x.adegan >= b0 && x.adegan <= (b1 || b0)));
  fs.writeFileSync(path.join(dir, 'shots.json'), JSON.stringify({ project: `${PREFIX}-${SET.toUpperCase()}`, tag, revision: 1, ratio, image_type: 'human', enhance: false,
    _catatan: `${P.judul} ${SET} ${ratio}, batch ${process.env.BATCH || 'semua'}. Dari paket ChatGPT; ${P.label_ilustrasi}`, shots: aktif }, null, 2));

  // Rakit (motion-kisah.py). Panel ayat pada shot yang narasinya membaca terjemah/rujukan ayat.
  const meta = fs.existsSync(path.join(paketDir, 'METADATA_YOUTUBE.md')) ? fs.readFileSync(path.join(paketDir, 'METADATA_YOUTUBE.md'), 'utf8') : '';
  const hook = (meta.match(/Thumbnail:\s*([^;\n]+)/) || [])[1]?.trim();
  const ay = P.ayat_layar?.[0];
  const surah = (P.sumber?.[0] || '').replace(/^QS\.\s*/, '').split(/\s+\d/)[0].trim();
  const pakaiAyat = (s) => ay && (s.narasi || []).some((n) => n.teks.includes(ay.terjemah.slice(0, 25)) || (surah && n.teks.includes(surah)));
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
      const narasi = (s.narasi || []).map((n) => (n.suara === 'NARATOR' ? n.teks : { tokoh: n.suara, teks: n.teks }));
      return { hal: x.adegan, klip: `${tag}-${x.id}.mp4`, narasi, sfx: `${s.sfx || 'quiet natural room tone'}, no music`, ...(pakaiAyat(s) ? { overlay: `ayat/ayat-${pad(ay.surah)}${String(ay.ayat).padStart(3, '0')}.png`, overlay_y: ratio === '9:16' ? 0.33 : 0.30 } : {}) };
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
