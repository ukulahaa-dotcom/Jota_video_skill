// Server VLM lokal yang tetap menyala (llama-server, Qwen3-VL-4B, GPU) untuk QC cepat.
// 2026-11-18: inferLocalJson menjalankan llama-mtmd-cli sekali per gambar (model 2,5 GB dimuat ulang, tanpa -ngl
// sehingga jalan di CPU): +-10 detik per potongan kepala, 1308 potongan Dzulqarnain = 3-4 jam. Server ini memuat
// model sekali ke GPU dan melayani permintaan lewat HTTP 127.0.0.1 saja. Tanpa token, tanpa internet.
import fs from 'node:fs';
import path from 'node:path';
import {spawn, execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {parseModelJson} from '../videoexpress-runner/local-model-json.mjs';

const MODEL = process.env.JOTA_VLM_DIR || 'E:/JOTA-Standby/models/qwen3-vl-4b';
const PORT = Number(process.env.JOTA_VLM_PORT || 8139);
const URL_ = `http://127.0.0.1:${PORT}`;
// sha256 llama-server.exe runtime b12211 CUDA 12.4 (dihitung 2026-11-18 dari folder runtime terverifikasi).
const SERVER_SHA = '75e1099fec4b0e2c0ddd90813653a6a70638b79c6f6d38bf3103c85d7312e89e';
const LOG = 'E:/JOTA-Standby/local-state/vlm-server.log';

// 2026-11-22 audit RAM: 3 llama-server port 8139 menyala bersamaan (~12,9 GB). Penyebab: (1) cek /health 2 detik gagal saat
// server sibuk melayani QC -> server baru di-spawn; (2) beberapa proses QC (produksi-gambar + qc-klip) memanggil
// pastikanServer bersamaan; (3) Windows mengizinkan beberapa proses listen di port yang sama, sehingga server kedua/ketiga
// tidak gagal bind, tetapi model tidak muat di GPU ("failed to fit params to free device memory") dan memakan RAM.
// Sekarang: cek /health 10 detik, kunci spawn antarproses, dan jangan spawn bila llama-server port ini sudah ada.
async function hidup(ms = 10000) {
  try { const r = await fetch(`${URL_}/health`, {signal: AbortSignal.timeout(ms)}); return r.ok; } catch { return false; }
}

export function serverAda() {
  // Proses llama-server dengan port ini (walau /health belum menjawab karena sibuk/memuat model).
  try {
    const out = execFileSync('powershell', ['-NoProfile', '-Command',
      `Get-CimInstance Win32_Process -Filter "Name='llama-server.exe'" | Where-Object { $_.CommandLine -match '--port ${PORT}( |$)' } | ForEach-Object { $_.ProcessId }`],
      {encoding: 'utf8', windowsHide: true, timeout: 20000});
    return out.split(/\s+/).filter(Boolean).map(Number);
  } catch { return []; }
}
const KUNCI = 'E:/JOTA-Standby/local-state/locks/vlm-server-spawn.lock';
const pidHidup = (pid) => { try { process.kill(pid, 0); return true; } catch { return false; } };

async function tungguSiap(detik) {
  for (let i = 0; i < detik; i++) { if (await hidup(3000)) return true; await new Promise((r) => setTimeout(r, 1000)); }
  return false;
}

export async function pastikanServer() {
  if (await hidup()) return URL_;
  // Server sudah ada tetapi sibuk/memuat: tunggu, jangan spawn kedua.
  if (serverAda().length) { if (await tungguSiap(180)) return URL_; throw new Error(`llama-server port ${PORT} ada tetapi tidak menjawab /health dalam 180 detik; periksa ${LOG}, jangan spawn ganda`); }
  // Kunci spawn antarproses: hanya satu pemanggil yang menyalakan server; yang lain menunggu.
  fs.mkdirSync(path.dirname(KUNCI), {recursive: true});
  let punyaKunci = false;
  for (let i = 0; i < 200 && !punyaKunci; i++) {
    try { fs.writeFileSync(KUNCI, JSON.stringify({pid: process.pid, at: new Date().toISOString()}), {flag: 'wx'}); punyaKunci = true; }
    catch {
      let isi = {}; try { isi = JSON.parse(fs.readFileSync(KUNCI, 'utf8')); } catch {}
      if (isi.pid && !pidHidup(isi.pid)) { try { fs.unlinkSync(KUNCI); } catch {} continue; }
      if (await hidup(3000)) return URL_;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  if (!punyaKunci) throw new Error('kunci spawn llama-server tidak didapat dalam 200 detik');
  try {
    if (await hidup(3000)) return URL_;
    if (serverAda().length) { if (await tungguSiap(180)) return URL_; throw new Error(`llama-server port ${PORT} tidak menjawab; periksa ${LOG}`); }
    return await nyalakan();
  } finally { try { fs.unlinkSync(KUNCI); } catch {} }
}

async function nyalakan() {
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
