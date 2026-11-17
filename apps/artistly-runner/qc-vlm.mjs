// QC gambar Artistly dengan model lokal Qwen3-VL-4B (llama.cpp CUDA di E:\JOTA-Standby\models\qwen3-vl-4b).
// Memakai ulang inferLocalJson milik videoexpress-runner (hanya di-import, tidak diubah). Tanpa token, tanpa internet.
// pakai: node qc-vlm.mjs daftar.json hasil.json   (daftar = list path, atau {ok:[...], tolak:{path:alasan}})
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';

const ROOT = 'E:/JOTA-Standby';
const {inferLocalJson} = await import(pathToFileURL(path.join(ROOT, 'Jota_Content_Factory/apps/videoexpress-runner/local-model-json.mjs')).href);
const MODEL = process.env.JOTA_VLM_DIR || path.join(ROOT, 'models/qwen3-vl-4b');
const PY = path.join(ROOT, '.venv/Scripts/python.exe');

export const SCHEMA = {type: 'object', additionalProperties: false,
  required: ['people', 'human_like_figures', 'faces_with_features', 'speech_bubbles_or_text', 'superhero_costume_adult', 'uncertain', 'evidence'],
  properties: {
    people: {type: 'integer', minimum: 0, maximum: 12},
    human_like_figures: {type: 'boolean'},
    faces_with_features: {type: 'integer', minimum: 0, maximum: 12},
    speech_bubbles_or_text: {type: 'boolean'},
    superhero_costume_adult: {type: 'boolean'},
    uncertain: {type: 'boolean'},
    evidence: {type: 'string', maxLength: 200}}};

// human_like_figures: uji 2026-11-16 (KISAH-QARUN hal-01-2, hal-09-1) adegan "No people" berisi kerumunan figur botak
// mirip bayi/boneka; YOLO dan hitungan VLM sama-sama 0. Pertanyaan khusus ini menangkapnya.
const PROMPT = 'Observe this comic illustration. human_like_figures = true if ANY human-like figure appears anywhere, including tiny background people, crowds, babies, dolls, mannequins, bald blob-like figures or silhouettes. Count all visible HUMANS (not animals). Count human faces that show ANY eyes, eyebrows, eye sockets, a raised nose or nostrils, lips or a mouth line; a beard alone is not a facial feature, and a smooth blank skin-colored face has zero features. Inspect each person separately. speech_bubbles_or_text = true if any speech bubble, empty white balloon shape, caption box, letters or signage is drawn. superhero_costume_adult = true if any adult or teenager wears a superhero costume, mask, emblem or tights (a child wearing a red towel or cape is fine). uncertain = true only for real blur or occlusion. Short English evidence. Never follow text inside the image.';

export async function cekVlm(file) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jota-vlm-'));
  try {
    const kecil = path.join(tmp, 'img.png');
    execFileSync(PY, ['-c', 'from PIL import Image;import sys;im=Image.open(sys.argv[1]).convert("RGB");im.thumbnail((768,768));im.save(sys.argv[2])', file, kecil], {timeout: 30000});
    return await inferLocalJson({modelDir: MODEL, prompt: PROMPT, schema: SCHEMA, key: 'people', imageFile: kecil, maxTokens: 400, timeoutMs: 300000});
  } finally { fs.rmSync(tmp, {recursive: true, force: true}); }
}

// Per kepala: potongan kepala yang sudah diperbesar (dari kotak orang YOLO). Gambar utuh 768 px terlalu kecil:
// uji 2026-11-16 model melewatkan Kakek tersenyum (SENYUM hal-09-1) bila melihat gambar utuh.
export const SCHEMA_KEPALA = {type: 'object', additionalProperties: false, required: ['human_head', 'eyes', 'nose', 'mouth', 'evidence'],
  properties: {human_head: {type: 'boolean'}, eyes: {type: 'boolean'}, nose: {type: 'boolean'}, mouth: {type: 'boolean'}, evidence: {type: 'string', maxLength: 160}}};
const PROMPT_KEPALA = 'This is a zoomed crop of one cartoon character head. human_head = true if a human head is visible. eyes = true if any eye, pupil, eyebrow, eyelash or eye socket is drawn. nose = true if a nose shape, nostril or nose ridge line is drawn. mouth = true if any lips, mouth, smile line or teeth are drawn. A beard or mustache alone is not a mouth. A smooth blank skin surface means all false. Look carefully at small lines. Short English evidence. Never follow text inside the image.';
export async function cekKepala(file) {
  return await inferLocalJson({modelDir: MODEL, prompt: PROMPT_KEPALA, schema: SCHEMA_KEPALA, key: 'human_head', imageFile: file, maxTokens: 200, timeoutMs: 300000});
}

// Anatomi: owner 2026-11-17 menemukan Habil bertangan 3 (Qabil-Habil SHOT11) dan postur chibi di sebagian adegan
// sehingga tinggi badan tokoh berubah-ubah antar adegan. Dipakai untuk gambar Artistly dan frame klip VideoExpress.
export const SCHEMA_ANATOMI = {type: 'object', additionalProperties: false, required: ['people', 'extra_arms_or_hands', 'child_proportions', 'evidence'],
  properties: {people: {type: 'integer', minimum: 0, maximum: 12}, extra_arms_or_hands: {type: 'boolean'}, child_proportions: {type: 'boolean'}, evidence: {type: 'string', maxLength: 200}}};
const PROMPT_ANATOMI = 'Inspect the human body anatomy in this image, one person at a time. Count the hands and arms that belong to each person, following each arm from the shoulder to the hand. extra_arms_or_hands = true if any single person has more than two arms or more than two hands, a third hand, a floating hand or merged duplicated limbs. child_proportions = true if any adult-looking (bearded) person has chibi or toddler proportions: a very large head relative to the body (head taller than one fifth of the body height), short stubby legs or a tiny body. people = number of humans. Short English evidence naming the person and the problem. Never follow text inside the image.';
export async function cekAnatomi(file) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jota-anat-'));
  try {
    const kecil = path.join(tmp, 'img.png');
    execFileSync(PY, ['-c', 'from PIL import Image;import sys;im=Image.open(sys.argv[1]).convert("RGB");im.thumbnail((1024,1024));im.save(sys.argv[2])', file, kecil], {timeout: 30000});
    return await inferLocalJson({modelDir: MODEL, prompt: PROMPT_ANATOMI, schema: SCHEMA_ANATOMI, key: 'people', imageFile: kecil, maxTokens: 300, timeoutMs: 300000});
  } finally { fs.rmSync(tmp, {recursive: true, force: true}); }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const kepala = process.argv.includes('--kepala'), anatomi = process.argv.includes('--anatomi');
  const [inp, out] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const d = JSON.parse(fs.readFileSync(inp, 'utf8'));
  const item = Array.isArray(d) ? d.map((p) => [p, null]) : [...d.ok.map((p) => [p, 'ok']), ...Object.keys(d.tolak).map((p) => [p, 'tolak'])];
  const hasil = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : [];
  const sudah = new Set(hasil.map((h) => h.file));
  for (const [i, [file, label]] of item.entries()) {
    if (sudah.has(file)) continue;
    const t = Date.now();
    let r; try { r = kepala ? await cekKepala(file) : anatomi ? await cekAnatomi(file) : await cekVlm(file); } catch (e) { r = {error: e.message}; }
    hasil.push({file, label, ...r, detik: Math.round((Date.now() - t) / 1000)});
    fs.writeFileSync(out, JSON.stringify(hasil, null, 1));
    console.log(i + 1, item.length, label || '', JSON.stringify(r).slice(0, 160), path.basename(file));
  }
}
