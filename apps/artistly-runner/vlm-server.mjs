// Server VLM lokal yang tetap menyala (llama-server, Qwen3-VL-4B, GPU) untuk QC cepat.
// 2026-11-18: inferLocalJson menjalankan llama-mtmd-cli sekali per gambar (model 2,5 GB dimuat ulang, tanpa -ngl
// sehingga jalan di CPU): +-10 detik per potongan kepala, 1308 potongan Dzulqarnain = 3-4 jam. Server ini memuat
// model sekali ke GPU dan melayani permintaan lewat HTTP 127.0.0.1 saja. Tanpa token, tanpa internet.
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {parseModelJson} from '../videoexpress-runner/local-model-json.mjs';

const MODEL = process.env.JOTA_VLM_DIR || 'E:/JOTA-Standby/models/qwen3-vl-4b';
const PORT = Number(process.env.JOTA_VLM_PORT || 8139);
const URL_ = `http://127.0.0.1:${PORT}`;
// sha256 llama-server.exe runtime b12211 CUDA 12.4 (dihitung 2026-11-18 dari folder runtime terverifikasi).
const SERVER_SHA = '75e1099fec4b0e2c0ddd90813653a6a70638b79c6f6d38bf3103c85d7312e89e';
const LOG = 'E:/JOTA-Standby/local-state/vlm-server.log';

async function hidup() {
  try { const r = await fetch(`${URL_}/health`, {signal: AbortSignal.timeout(2000)}); return r.ok; } catch { return false; }
}

export async function pastikanServer() {
  if (await hidup()) return URL_;
  const v = JSON.parse(fs.readFileSync(path.join(MODEL, 'verified.json')));
  if (v.runtime !== 'b12211') throw new Error('Manifest model tidak sah');
  const exe = path.join(MODEL, 'runtime', 'llama-server.exe');
  if (createHash('sha256').update(fs.readFileSync(exe)).digest('hex') !== SERVER_SHA) throw new Error('llama-server berubah, cek ulang runtime');
  const args = ['-m', path.join(MODEL, 'Qwen3VL-4B-Instruct-Q4_K_M.gguf'), '--mmproj', path.join(MODEL, 'mmproj-Qwen3VL-4B-Instruct-Q8_0.gguf'),
    '--host', '127.0.0.1', '--port', String(PORT), '-ngl', '99', '-c', '8192', '-np', '2', '--image-max-tokens', '1024', '--no-webui'];
  fs.mkdirSync(path.dirname(LOG), {recursive: true});
  const out = fs.openSync(LOG, 'a');
  const child = spawn(exe, args, {detached: true, stdio: ['ignore', out, out], windowsHide: true,
    env: {...process.env, HF_HUB_OFFLINE: '1', TRANSFORMERS_OFFLINE: '1'}});
  child.unref();
  for (let i = 0; i < 120; i++) { await new Promise((r) => setTimeout(r, 1000)); if (await hidup()) return URL_; }
  throw new Error(`llama-server tidak siap dalam 120 detik, lihat ${LOG}`);
}

// Satu pertanyaan gambar -> JSON sesuai skema. temp 0 seperti inferLocalJson.
export async function tanyaGambar({prompt, schema, key, imageFile, maxTokens = 300}) {
  const url = await pastikanServer();
  const b64 = fs.readFileSync(imageFile).toString('base64');
  const mime = /\.jpe?g$/i.test(imageFile) ? 'image/jpeg' : 'image/png';
  const body = {temperature: 0, seed: 42, max_tokens: maxTokens,
    response_format: {type: 'json_schema', json_schema: {name: 'hasil', schema, strict: true}},
    messages: [{role: 'user', content: [{type: 'image_url', image_url: {url: `data:${mime};base64,${b64}`}}, {type: 'text', text: prompt}]}]};
  const r = await fetch(`${url}/v1/chat/completions`, {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(body), signal: AbortSignal.timeout(300000)});
  if (!r.ok) throw new Error(`llama-server HTTP ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  return parseModelJson(j.choices?.[0]?.message?.content || '', key);
}

export async function matikanServer() {
  // llama-server tidak punya endpoint shutdown; hentikan prosesnya lewat taskkill (hanya llama-server port ini).
  const {execFileSync} = await import('node:child_process');
  try { execFileSync('taskkill', ['/IM', 'llama-server.exe', '/F'], {stdio: 'ignore'}); } catch {}
}
