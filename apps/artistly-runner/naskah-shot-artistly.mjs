// shots.json (adapter paket-kisah) -> naskah Artistly gambar awal per shot dengan formula acuan emas D.
// Dibuat 2026-11-22 (Ibu Musa REV4): gambar awal Artistly lebih baik daripada jalankan-vx gambar (wajah, arsitektur zaman).
// Template saat ini untuk kisah Mesir kuno dengan tokoh perempuan berkhimar; sesuaikan ERA dan kalimat wajah untuk kisah lain.
// pakai: node naskah-shot-artistly.mjs <shots.json> <out naskah.json> <dariNo> <sampaiNo>
import fs from 'node:fs';
const [, , SF, OUT, A = '1', B = '999'] = process.argv;
const s = JSON.parse(fs.readFileSync(SF, 'utf8'));
const no = (id) => Number(id.replace(/\D/g, '')) % 100;
const LIGHT = 'LIGHT: strong warm sunlight from the left side of frame as the key light, so one side of each face is lit and the other side falls into soft natural shadow, with a gentle rim light; each face shows the same gradient of light and shadow as the hands of the same person.';
const TEX = 'FACE TEXTURE: each featureless face has real natural skin texture like a close-up photograph: visible fine pores, slightly uneven tone with faint warmer and darker areas, a soft natural sheen on the forehead and cheekbones, fine vellus hair and faint fine lines; never smooth, flat, airbrushed or plastic.';
const ERA = 'The world is ancient Egypt: mudbrick, plaster, timber, linen and clay only; no glass windows, no modern objects, no signs, no wires, no writing. Every object has a believable real-world size relative to the people and obeys gravity: it rests on a surface or is held firmly in the hands.';
const ANGKA = ['no', 'one', 'two', 'three', 'four'];
const halaman = [], peta = [];
for (const x of s.shots) {
  const n = no(x.id);
  if (n < +A || n > +B || x.tool === 'first_last') continue;
  const L = x.image_prompt.split('\n');
  const persons = L.filter((l) => /^PERSON \d+:/.test(l)).map((l) => l.replace('beard and hair showing at the edges of the head covering: none visible', 'hair: none visible'));
  const scene = L.find((l) => l.startsWith('SCENE:')) || '';
  const env = L.find((l) => l.startsWith('ENVIRONMENT:')) || '';
  const parts = ['Cinematic 3D animated feature film still, realistic CGI.'];
  if (persons.length) {
    parts.push(`${persons.length > 1 ? 'Each woman' : 'The woman'} has no eyes, no eyebrows, no nose and no mouth. ${persons.length > 1 ? 'Each face' : 'Her face'} is simply a smooth continuation of her own skin, exactly the same colour, pores and sheen as her hands, shaped by the cheekbones and jaw underneath. Only the featureless face oval and the hands are uncovered; every head covering and robe is opaque and covers hair, neck, chest, arms and legs.`);
    parts.push('CHARACTERS:', ...persons, scene, env, ERA, LIGHT, TEX, `Exactly ${ANGKA[persons.length]} ${persons.length > 1 ? 'people' : 'person'}.`);
  } else {
    parts.push(scene.replace(', people small in the frame', ''), env, ERA, 'No people.');
  }
  halaman.push({ script: parts.join('\n') });
  peta.push(x.id);
}
fs.writeFileSync(OUT, JSON.stringify({ nama_pdf: `nil shot ${A}-${B}.pdf`, kategori_v6: 'Artistic Designer V2', rasio: '16:9', karakter: [], halaman, _shot: peta }, null, 2));
console.log(peta.join(' '));
