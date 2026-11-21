#!/usr/bin/env node
// Artistly Runner: menjalankan fitur Artistly lewat "resep" JSON di browser yang terlihat.
// Satu resep = urutan langkah (buka halaman, isi kolom, klik, tunggu, ambil gambar, unduh, PDF, komik).
// Fitur Artistly baru cukup ditambah resep di folder recipes/, tanpa mengubah kode.
// Tidak pernah membaca atau mengisi password. Login dilakukan owner sendiri sekali (di Mac) atau lewat secret ARTISTLY_EMAIL dan ARTISTLY_PASSWORD (GitHub Actions).
// Terpisah dari VideoExpress Runner (owner 2026-11-04): folder, profil browser, paket, dan workflow sendiri.
//
//   node artistly.mjs login                         login Artistly sekali (profil browser sendiri, terpisah dari VideoExpress)
//   node artistly.mjs list                          daftar resep
//   node artistly.mjs run <resep> [--var k=v ...]   jalankan resep (nama di recipes/ atau path file)
//   node artistly.mjs inspect <url>                 catat semua kolom dan tombol di halaman, untuk menulis resep baru
//   node artistly.mjs pesanan [id]                  kerjakan pesanan dari pesanan.json (storybook, lalu komik kalau diminta)
//   node artistly.mjs peta                          peta UI Artistly, hanya membaca (qc/PETA_ARTISTLY.md)
//   node artistly.mjs storybook --var ide=.. --var nama=..   satu storybook sampai PDF (GitHub Actions: artistly-runner)

import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const RECIPES = path.join(HERE, 'recipes');
const PROFILE = process.env.ARTISTLY_PROFILE || path.join(HERE, 'profile');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadEnv() {
  const f = path.join(HERE, '.env');
  if (!fs.existsSync(f)) return {};
  return Object.fromEntries(fs.readFileSync(f, 'utf8').split('\n').map((l) => l.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/)).filter(Boolean).map((m) => [m[1], m[2].replace(/^["']|["']$/g, '')]));
}
const ENV = { ...loadEnv(), ...process.env };
export const ARTISTLY_DIR = ENV.ARTISTLY_DIR || path.join(os.homedir(), 'Documents', 'Artistly');
const APP_DIR = ENV.ARTISTLY_APP_DIR || path.join(ARTISTLY_DIR, 'Aplikasi');

function log(...a) {
  const line = `[${new Date().toLocaleTimeString()}] ${a.join(' ')}`;
  console.log(line);
  fs.appendFileSync(path.join(HERE, 'artistly.log'), line + '\n');
}

// ---------- resep ----------

// Ganti {{nama}} dengan variabel; {{env.NAMA}} dari .env.
export function fill(tpl, vars) {
  if (typeof tpl === 'string') return tpl.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, k) => {
    const v = k.startsWith('env.') ? ENV[k.slice(4)] : k.split('.').reduce((o, p) => (o == null ? o : o[p]), vars);
    if (v == null) throw new Error(`Variabel {{${k}}} belum diisi`);
    return String(v);
  });
  if (Array.isArray(tpl)) return tpl.map((x) => fill(x, vars));
  if (tpl && typeof tpl === 'object') return Object.fromEntries(Object.entries(tpl).map(([k, v]) => [k, fill(v, vars)]));
  return tpl;
}

export function loadRecipe(nameOrPath) {
  const f = fs.existsSync(nameOrPath) ? nameOrPath : path.join(RECIPES, nameOrPath.endsWith('.json') ? nameOrPath : nameOrPath + '.json');
  if (!fs.existsSync(f)) throw new Error(`Resep tidak ditemukan: ${nameOrPath}`);
  const r = JSON.parse(fs.readFileSync(f, 'utf8'));
  const errs = validateRecipe(r);
  if (errs.length) throw new Error(`Resep ${path.basename(f)} tidak valid: ${errs.join('; ')}`);
  return r;
}

const ACTIONS = ['goto', 'click', 'clickNear', 'fill', 'select', 'press', 'wait', 'waitFor', 'scroll', 'snapshotImages', 'collectImages', 'download', 'pdf', 'preview', 'komik', 'screenshot', 'assertText', 'log'];
export function validateRecipe(r) {
  const e = [];
  if (!r.name) e.push('name kosong');
  if (!Array.isArray(r.steps) || !r.steps.length) e.push('steps kosong');
  (r.steps || []).forEach((s, i) => { if (!ACTIONS.includes(s.do)) e.push(`langkah ${i + 1}: aksi "${s.do}" tidak dikenal`); });
  for (const v of r.vars || []) if (!v.name) e.push('vars tanpa name');
  return e;
}

// ---------- browser ----------

async function openBrowser() {
  const { chromium } = await import('playwright');
  // GitHub Actions (JOTA_CI=1): headless, sesi dari ARTISTLY_SESSION_FILE kalau ada, login lewat ensureLogin.
  if (ENV.JOTA_CI === '1') {
    const browser = await chromium.launch({ headless: true });
    const sess = ENV.ARTISTLY_SESSION_FILE;
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, acceptDownloads: true, ...(sess && fs.existsSync(sess) && fs.statSync(sess).size > 10 ? { storageState: sess } : {}) });
    ctx.on('close', () => browser.close().catch(() => {}));
    await ctx.newPage();
    return ctx;
  }
  const opts = { headless: false, viewport: null, chromiumSandbox: true, args: ['--start-maximized'], acceptDownloads: true };
  try { return await chromium.launchPersistentContext(PROFILE, { ...opts, channel: ENV.JOTA_CHANNEL ?? 'chrome' }); }
  catch { return chromium.launchPersistentContext(PROFILE, opts); }
}

// Popup Artistly (peta 2026-11-04): tawaran MFA "Not today | Turn on" dan panel "Latest Updates" dengan "Close"
// menutupi tombol, sehingga klik timeout. Ditutup setelah setiap pindah halaman.
export async function tutupPopup(page) {
  for (const txt of ['Not today', 'Close']) {
    const b = page.getByRole('button', { name: txt, exact: true }).filter({ visible: true }).first();
    if (await b.count().catch(() => 0)) { await b.click({ timeout: 3000 }).catch(() => {}); await sleep(600); }
  }
  await page.keyboard.press('Escape').catch(() => {});
}

const perluLogin = (page) => /\/login|sign-?in|\/auth/i.test(page.url()) || false;
// Login otomatis hanya di CI, dengan ARTISTLY_EMAIL dan ARTISTLY_PASSWORD dari GitHub Secrets (diisi owner sendiri).
// Skrip tidak pernah mencetak password. Di Mac tetap login manual sekali (node artistly.mjs login).
export async function ensureLogin(page) {
  await page.goto('https://app.artistly.ai/dashboard', { waitUntil: 'domcontentloaded' }).catch(() => {});
  await sleep(4000);
  const adaPassword = async () => (await page.locator('input[type=password]').count()) > 0;
  if (!perluLogin(page) && !(await adaPassword())) { log('login Artistly: sudah masuk'); return true; }
  if (ENV.JOTA_CI !== '1') throw new Error('Artistly minta login. Jalankan: node artistly.mjs login');
  const email = ENV.ARTISTLY_EMAIL; const pass = ENV.ARTISTLY_PASSWORD;
  if (!email || !pass) throw new Error('Secret ARTISTLY_EMAIL atau ARTISTLY_PASSWORD belum diisi di GitHub (Settings > Secrets and variables > Actions)');
  for (let i = 1; i <= 3; i++) {
    await page.waitForSelector('input[type=password]', { timeout: 30000 }).catch(() => {});
    const inputs = await page.evaluate(() => [...document.querySelectorAll('input')].map((x) => `${x.type}|${x.name}|${x.placeholder}|${!!x.offsetParent}`));
    log('input halaman login: ' + inputs.join(' ; '));
    await page.locator('input[type=email]:visible, input[name*=mail i]:visible, input:not([type=password]):not([type=hidden]):not([type=checkbox]):visible').first().fill(email);
    await page.locator('input[type=password]:visible').first().fill(pass);
    const btn = page.locator('button:visible, input[type=submit]:visible').filter({ hasText: /log ?in|sign ?in|masuk|continue/i }).first();
    if (await btn.count()) await btn.click(); else await page.keyboard.press('Enter');
    await sleep(8000);
    await page.goto('https://app.artistly.ai/dashboard', { waitUntil: 'domcontentloaded' }).catch(() => {});
    await sleep(4000);
    const ok = !perluLogin(page) && !(await adaPassword());
    log(`login Artistly CI percobaan ${i}: ${ok ? 'OK' : 'belum, URL ' + page.url()}`);
    if (ok) { if (ENV.ARTISTLY_SESSION_FILE) await page.context().storageState({ path: ENV.ARTISTLY_SESSION_FILE }).catch(() => {}); return true; }
    fs.mkdirSync(path.join(HERE, 'qc'), { recursive: true });
    await page.screenshot({ path: path.join(HERE, 'qc', `artistly-gagal-login-${i}.png`) }).catch(() => {});
  }
  throw new Error('Login Artistly gagal 3 kali; lihat qc/artistly-gagal-login-*.png di artefak');
}

// Cari elemen terlihat berdasarkan teks, placeholder, label, atau CSS.
function locate(page, s) {
  if (s.css) return page.locator(s.css).filter({ visible: true }).nth(s.nth ?? 0);
  if (s.placeholder) return page.getByPlaceholder(s.placeholder, { exact: !!s.exact }).filter({ visible: true }).nth(s.nth ?? 0);
  if (s.label) return page.getByLabel(s.label, { exact: !!s.exact }).filter({ visible: true }).nth(s.nth ?? 0);
  if (s.role) return page.getByRole(s.role, { name: s.text, exact: !!s.exact }).filter({ visible: true }).nth(s.nth ?? 0);
  if (s.text) return page.getByText(s.text, { exact: s.exact !== false }).filter({ visible: true }).nth(s.nth ?? 0);
  throw new Error('Langkah tanpa target (css, placeholder, label, role, atau text)');
}

async function imageUrls(page, css) {
  return page.evaluate((sel) => [...document.querySelectorAll(sel)].flatMap((e) => {
    const out = [];
    if (e.tagName === 'IMG') out.push(e.currentSrc || e.src);
    const bg = getComputedStyle(e).backgroundImage.match(/url\("?(.*?)"?\)/);
    if (bg) out.push(bg[1]);
    return out;
  }).filter((u) => u && !u.startsWith('data:') && !/avatar|logo|icon|\.svg/i.test(u)), css);
}

const py = (code, args = []) => execFileSync('python3', ['-c', code, ...args], { stdio: 'inherit' });

async function runSteps(page, ctx, recipe, vars, state) {
  for (const [i, raw] of recipe.steps.entries()) {
    if (raw.if && !fill(`{{${raw.if}}}`, vars).trim()) continue;
    const s = fill(raw, { n: '{{n}}', ...vars });
    const tag = `${i + 1}/${recipe.steps.length} ${s.do}${s.note ? ' (' + s.note + ')' : ''}`;
    log(tag);
    const timeout = (s.timeout_s || 30) * 1000;
    switch (s.do) {
      case 'goto': await page.goto(s.url, { waitUntil: 'domcontentloaded' }); await sleep(s.settle_ms ?? 3000);
        if (perluLogin(page)) { await ensureLogin(page); await page.goto(s.url, { waitUntil: 'domcontentloaded' }); await sleep(s.settle_ms ?? 3000); }
        await tutupPopup(page); break;
      case 'click': { const l = locate(page, s); await l.waitFor({ state: 'visible', timeout }); await l.scrollIntoViewIfNeeded(); await l.click(); await sleep(s.settle_ms ?? 800); break; }
      case 'clickNear': { // klik tombol di dalam kartu yang memuat teks tertentu (misalnya tombol panah di kartu fitur)
        const ok = await page.evaluate(({ text, button }) => {
          const t = [...document.querySelectorAll('*')].find((e) => e.offsetParent && e.children.length === 0 && (e.innerText || '').trim() === text);
          let c = t; for (let k = 0; k < 6 && c; k++) { c = c.parentElement; const b = c && [...c.querySelectorAll('button,a')].find((x) => !button || (x.innerText || '').trim() === button); if (b) { b.click(); return true; } }
          return false;
        }, { text: s.text, button: s.button || null });
        if (!ok) throw new Error(`Tombol di dekat "${s.text}" tidak ditemukan`); await sleep(s.settle_ms ?? 800); break; }
      case 'fill': { const l = locate(page, s); await l.waitFor({ state: 'visible', timeout }); await l.fill(''); await l.fill(String(s.value));
        const got = await l.inputValue(); if (got !== String(s.value)) throw new Error(`Isi kolom tidak sesuai (${got.length} dari ${String(s.value).length} karakter)`); break; }
      case 'select': { // dropdown: native select atau combobox buatan
        const l = locate(page, s); await l.waitFor({ state: 'visible', timeout });
        const tagName = await l.evaluate((e) => e.tagName);
        if (tagName === 'SELECT') await l.selectOption({ label: s.option });
        else { await l.click(); await sleep(500); await page.getByRole('option', { name: s.option, exact: true }).first().click().catch(async () => page.getByText(s.option, { exact: true }).filter({ visible: true }).last().click()); }
        await sleep(600);
        const shown = await l.evaluate((e) => (e.tagName === 'SELECT' ? e.selectedOptions[0]?.text : e.innerText || e.value || '').trim());
        if (!shown.includes(s.option)) throw new Error(`Pilihan "${s.option}" tidak terpilih (terbaca "${shown}")`); break; }
      case 'press': await page.keyboard.press(s.key); break;
      case 'wait': await sleep((s.seconds || 1) * 1000); break;
      case 'waitFor': if (s.text) await page.getByText(s.text, { exact: !!s.exact }).first().waitFor({ state: 'visible', timeout }); else await page.locator(s.css).first().waitFor({ state: 'visible', timeout }); break;
      case 'scroll': await page.mouse.wheel(0, s.dy || 800); await sleep(500); break;
      case 'snapshotImages': state.before = new Set(await imageUrls(page, s.css || 'img')); break;
      case 'collectImages': { // tunggu gambar baru (yang belum ada saat snapshotImages)
        const end = Date.now() + (s.timeout_s || 600) * 1000; let got = [];
        while (Date.now() < end) {
          if (s.reload_every_s && got.length === 0 && state.lastReload && Date.now() - state.lastReload > s.reload_every_s * 1000) { await page.reload({ waitUntil: 'domcontentloaded' }); await sleep(4000); state.lastReload = Date.now(); }
          state.lastReload = state.lastReload || Date.now();
          got = (await imageUrls(page, s.css || 'img')).filter((u) => !s.new_only || !state.before?.has(u));
          if (s.match) got = got.filter((u) => new RegExp(s.match).test(u));
          got = [...new Set(got)];
          if (got.length >= (s.min || 1)) {
            // stable_s: tunggu jumlah gambar tidak bertambah selama stable_s detik (buku muncul bertahap).
            if (!s.stable_s) break;
            if (got.length !== state.lastCount) { state.lastCount = got.length; state.stableSince = Date.now(); }
            else if (Date.now() - state.stableSince >= s.stable_s * 1000) break;
          }
          await sleep((s.poll_s || 10) * 1000);
        }
        if (got.length < (s.min || 1)) throw new Error(`Gambar baru belum muncul setelah ${s.timeout_s || 600} detik`);
        state.images = got; log(`  ${got.length} gambar didapat`); break; }
      case 'download': { // unduh gambar yang dikumpulkan
        const dir = path.resolve(s.dir); fs.mkdirSync(dir, { recursive: true });
        const list = (state.images || []).map((u) => (s.strip_query ? u.split('?')[0] : u));
        const files = [];
        for (const [k, u] of list.entries()) {
          const isCap = /-caption\./.test(u);
          const sub = s.split_caption && !isCap ? (s.plain_dir || 'polos') : '';
          fs.mkdirSync(path.join(dir, sub), { recursive: true });
          const ext = (u.match(/\.(png|jpe?g|webp)$/i) || ['', 'png'])[1];
          const name = fill(s.name || 'gambar-{{n}}', { ...vars, n: String(k + 1).padStart(2, '0') }) + '.' + ext;
          const f = path.join(dir, sub, name);
          const r = await ctx.request.get(u, { timeout: 120000 });
          if (!r.ok()) throw new Error(`Unduh gagal HTTP ${r.status()}: ${u}`);
          fs.writeFileSync(f, await r.body()); files.push(f);
        }
        state.files = files; log(`  ${files.length} file di ${dir}`); break; }
      case 'pdf': py(`import sys,glob\nfrom PIL import Image\nfs=sorted(glob.glob(sys.argv[1]))\nassert fs,'tidak ada gambar untuk PDF'\nim=[Image.open(f).convert('RGB') for f in fs]\nim[0].save(sys.argv[2],save_all=True,append_images=im[1:])\nprint('PDF',sys.argv[2],len(fs),'halaman')`, [path.resolve(s.images), path.resolve(s.out)]); break;
      case 'preview': py(`import sys,glob,math\nfrom PIL import Image\nfs=sorted(glob.glob(sys.argv[1]))\nW=360\nth=[Image.open(f).convert('RGB') for f in fs]\nth=[i.resize((W,int(i.height*W/i.width))) for i in th]\nH=max(i.height for i in th);c=5;r=math.ceil(len(th)/c)\nS=Image.new('RGB',(W*c,H*r),'white')\nfor k,i in enumerate(th): S.paste(i,((k%c)*W,(k//c)*H))\nS.save(sys.argv[2],quality=80)\nprint('Pratinjau',sys.argv[2])`, [path.resolve(s.images), path.resolve(s.out)]); break;
      case 'komik': { const script = path.join(APP_DIR, 'komik.py'); if (!fs.existsSync(script)) throw new Error('komik.py tidak ditemukan di ' + APP_DIR);
        execFileSync('python3', [script, path.basename(s.naskah)], { cwd: path.dirname(path.resolve(s.naskah)), stdio: 'inherit' }); break; }
      case 'screenshot': { const f = path.join(HERE, 'qc', `artistly-${s.name || Date.now()}.png`); fs.mkdirSync(path.dirname(f), { recursive: true }); await page.screenshot({ path: f }); log('  ' + f); break; }
      case 'assertText': if (!(await page.getByText(s.text, { exact: !!s.exact }).first().isVisible().catch(() => false))) throw new Error(`Teks "${s.text}" tidak terlihat`); break;
      case 'log': log('  ' + s.message); break;
    }
  }
}

export async function runRecipe(name, vars = {}, { ctx: given, state: givenState } = {}) {
  const recipe = loadRecipe(name);
  vars.artistly_dir = vars.artistly_dir || ARTISTLY_DIR;
  for (const v of recipe.vars || []) {
    if (vars[v.name] == null && v.default != null) vars[v.name] = fill(v.default, vars);
    if (vars[v.name] == null && v.required) throw new Error(`Resep ${recipe.name} butuh --var ${v.name}=...${v.help ? ' (' + v.help + ')' : ''}`);
    if (v.max && String(vars[v.name] ?? '').length > v.max) throw new Error(`${v.name} ${String(vars[v.name]).length} karakter, maksimal ${v.max}`);
    if (v.options && vars[v.name] != null && !v.options.includes(vars[v.name])) throw new Error(`${v.name} harus salah satu: ${v.options.join(', ')}`);
  }
  const ctx = given || (await openBrowser());
  const page = ctx.pages()[0] || (await ctx.newPage());
  const state = givenState || {};
  try {
    log(`RESEP ${recipe.name}`);
    await runSteps(page, ctx, recipe, vars, state);
    log(`RESEP ${recipe.name} selesai`);
    return state;
  } catch (e) {
    const f = path.join(HERE, `gagal-artistly-${recipe.name}.png`);
    await page.screenshot({ path: f }).catch(() => {});
    log(`GAGAL ${recipe.name}: ${e.message} (tangkapan layar ${f})`);
    throw e;
  } finally { if (!given) await ctx.close().catch(() => {}); }
}

// ---------- pesanan.json (alur skill pesanan-artistly) ----------

function pesananFile() { return path.join(APP_DIR, 'pesanan.json'); }
function readPesanan() { const f = pesananFile(); if (!fs.existsSync(f)) throw new Error('pesanan.json tidak ditemukan di ' + APP_DIR); return JSON.parse(fs.readFileSync(f, 'utf8')); }
function setStatus(id, status) {
  const f = pesananFile(); const data = readPesanan();
  const list = Array.isArray(data) ? data : data.pesanan || [];
  const p = list.find((x) => String(x.id) === String(id)); if (!p) return;
  p.status = status;
  const tmp = f + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(data, null, 2)); fs.renameSync(tmp, f);
}

async function cmdPesanan(onlyId) {
  const data = readPesanan();
  const list = (Array.isArray(data) ? data : data.pesanan || []).filter((p) => (onlyId ? String(p.id) === String(onlyId) : p.status === 'Baru'));
  if (!list.length) { log('Tidak ada pesanan berstatus Baru.'); return; }
  const ctx = await openBrowser();
  try {
    // 1. Kirim semua Generate dulu (hemat waktu: Artistly memproses paralel).
    for (const p of list) {
      setStatus(p.id, 'Diproses');
      const idea = String(p.ide || '').slice(0, 200);
      await runRecipe('storybook-buat', { ide: idea, halaman: String(Math.min(+p.halaman || 10, 30)), bahasa: p.bahasa || 'Indonesian', gaya: p.gaya || "Children's Book" }, { ctx });
    }
    // 2. Ambil hasil per pesanan (urutan sama dengan urutan kirim).
    for (const p of list) {
      const dir = path.join(ARTISTLY_DIR, p.folder || `${p.kategori || 'Storybook'}/${p.id} ${p.nama_anak || ''}`.trim());
      const nama = (p.nama_anak || `Pesanan ${p.id}`).trim();
      await runRecipe('storybook-ambil', { dir, nama }, { ctx });
      if (/komik/i.test(p.catatan || '')) log(`${p.id}: catatan meminta komik. Tulis naskah-komik.json di ${dir}, lalu: node artistly.mjs run komik --var dir="${dir}"`);
      setStatus(p.id, 'Selesai');
    }
  } finally { await ctx.close().catch(() => {}); }
}

// ---------- inspect ----------

// Catat kolom, tombol, dan judul yang terlihat (dipakai inspect dan peta).
async function dumpPage(page) {
  return page.evaluate(() => {
    const v = (e) => !!e.offsetParent;
    const near = (e) => { let p = e; for (let i = 0; i < 4 && p; i++) { p = p.parentElement; const l = p && p.querySelector('label,h3,h4'); if (l && l.innerText.trim()) return l.innerText.trim().slice(0, 60); } return ''; };
    return {
      url: location.href,
      fields: [...document.querySelectorAll('textarea,input:not([type=hidden]),select,[role=combobox]')].filter(v).map((e) => ({ tag: e.tagName, type: e.type || e.getAttribute('role'), placeholder: e.placeholder || '', label: near(e), value: e.type === 'password' ? '' : (e.value || e.innerText || '').slice(0, 60) })),
      buttons: [...new Set([...document.querySelectorAll('button,[role=button],[role=tab],a')].filter(v).map((e) => (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 50)).filter(Boolean))],
      headings: [...new Set([...document.querySelectorAll('h1,h2,h3,h4,label')].filter(v).map((e) => e.innerText.trim().slice(0, 60)).filter(Boolean))],
    };
  });
}

// peta: hanya membaca (tidak mengklik Generate, Save, Delete, atau Share). Hasil qc/PETA_ARTISTLY.md + screenshot.
async function cmdPeta() {
  const ctx = await openBrowser(); const page = ctx.pages()[0] || (await ctx.newPage());
  const out = ['# Peta UI Artistly', '', `Dibuat otomatis ${new Date().toISOString()} oleh \`node artistly.mjs peta\` (hanya membaca).`, ''];
  const qc = path.join(HERE, 'qc'); fs.mkdirSync(qc, { recursive: true });
  const catat = async (nama) => {
    const d = await dumpPage(page); await page.screenshot({ path: path.join(qc, `artistly-peta-${nama}.png`) }).catch(() => {});
    out.push(`## ${nama}`, '', `URL: ${d.url}`, '', '- Kolom: ' + (d.fields.map((f) => `${f.tag}/${f.type} "${f.label || f.placeholder}"`).join(' | ') || '-'),
      '- Tombol: ' + (d.buttons.join(' | ') || '-'), '- Judul: ' + (d.headings.join(' | ') || '-'), '');
  };
  const coba = async (fn, ket) => { try { await fn(); } catch (e) { out.push(`> ${ket}: GAGAL ${e.message.split('\n')[0]}`, ''); } };
  try {
    await ensureLogin(page); await catat('dashboard');
    // Semua tautan fitur (untuk memilih fitur gambar dan tokoh konsisten tanpa menebak URL).
    const links = await page.evaluate(() => [...new Set([...document.querySelectorAll('a[href]')].map((a) => `${(a.innerText || a.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 50)} -> ${a.href}`))]);
    out.push('## Tautan di dashboard', '', ...links.map((l) => '- ' + l), '');
    for (const u of links.map((l) => l.split(' -> ')[1]).filter((u) => /consistent|character|designer|illustrat|image-generator|text-to-image|comic|komik/i.test(u)).slice(0, 6)) {
      await coba(async () => { await page.goto(u, { waitUntil: 'domcontentloaded' }); await sleep(4000); await catat('fitur-' + new URL(u).pathname.replace(/\W+/g, '-').slice(1, 40)); }, 'buka ' + u);
    }
    const buka = async (u) => { await page.goto(u, { waitUntil: 'domcontentloaded' }); await sleep(4000); await tutupPopup(page); };
    const STUDIO = 'https://app.artistly.ai/ai/ai-storybook-studio';
    await buka(STUDIO); await catat('storybook-studio');
    const tl = await page.evaluate(() => [...new Set([...document.querySelectorAll('a[href]')].filter((a) => a.offsetParent).map((a) => `${(a.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 50)} -> ${a.href}`))]);
    out.push('## Tautan di storybook studio', '', ...tl.map((l) => '- ' + l), '');
    // Alat yang dipertimbangkan untuk komik dan storybook (klik lalu catat form, tanpa Generate).
    const alat = [['Idea To Illustrated Book', ['Create New Story']], ['Script To Storybook', ['Create New Story']], ['Multi-Character Storybook', []], ['Script To Storybook V2', []],
      ['Consistent Characters (Train Your Own AI)', []], ['AI Image Designer v6', []], ['AI Art Illustrator (Multiple Style Options)', []]];
    for (const [nama, lanjut] of alat) {
      await coba(async () => {
        await buka(STUDIO);
        await page.getByText(nama, { exact: false }).filter({ visible: true }).last().click({ timeout: 15000 }); await sleep(4000); await tutupPopup(page);
        await catat('alat-' + nama.replace(/\W+/g, '-').toLowerCase());
        for (const l of lanjut) { await page.getByText(l, { exact: false }).filter({ visible: true }).first().click({ timeout: 10000 }); await sleep(3000); await tutupPopup(page); await catat('alat-' + nama.replace(/\W+/g, '-').toLowerCase() + '-' + l.replace(/\W+/g, '-').toLowerCase()); }
      }, 'buka ' + nama);
    }
    await buka('https://app.artistly.ai/personal-designs'); await catat('personal-designs');
    await coba(async () => { await page.getByRole('button', { name: 'Idea To Illustrated Book', exact: true }).filter({ visible: true }).first().click({ timeout: 15000 }); await sleep(4000);
      const n = (await imageUrls(page, 'main img')).length; out.push(`Gambar di filter Idea To Illustrated Book: ${n}`, ''); await catat('personal-designs-storybook'); }, 'filter personal designs');
  } finally {
    fs.writeFileSync(path.join(qc, 'PETA_ARTISTLY.md'), out.join('\n') + '\n'); log('Peta: ' + path.join(qc, 'PETA_ARTISTLY.md'));
    await ctx.close().catch(() => {});
  }
}

// peta-gambar (owner 2026-11-06 05:01: Artistly untuk gambar awal storyboard): hanya membaca. Membuka Consistent
// Characters dan AI Image Designer v6, mengklik setiap kategori di STEP 1, lalu mencatat form STEP 2 (kolom, tombol,
// pilihan rasio, unggah acuan). Tidak mengklik Generate, Train, Save, Delete, atau Share.
async function cmdPetaGambar() {
  const ctx = await openBrowser(); const page = ctx.pages()[0] || (await ctx.newPage());
  const out = ['# Peta alat gambar Artistly', '', `Dibuat otomatis ${new Date().toISOString()} oleh \`node artistly.mjs peta-gambar\` (hanya membaca).`, ''];
  const qc = path.join(HERE, 'qc'); fs.mkdirSync(qc, { recursive: true });
  const NAV = /^(Dashboard|Create Design|My Purchases|Mochamad Koharudin|AI Image Designer v6|AI Design Agents|AI Storybook Studio|AI Design Assistants|Kids Puzzles|Consistent Characters.*|AI Art Illustrator.*|AI Bulk Actions|My Flipbooks|Personal Designs|Community Designs|v4 Image Designer)$/;
  const BAHAYA = /generate|train|save|delete|share|publish|buy|upgrade|purchase|create new|submit/i;
  const catat = async (nama) => {
    const d = await dumpPage(page); await page.screenshot({ path: path.join(qc, `artistly-petagambar-${nama}.png`) }).catch(() => {});
    out.push(`## ${nama}`, '', `URL: ${d.url}`, '', '- Kolom: ' + (d.fields.map((f) => `${f.tag}/${f.type} "${f.label || f.placeholder}"${f.value ? ` = "${f.value}"` : ''}`).join(' | ') || '-'),
      '- Tombol: ' + (d.buttons.filter((b) => !NAV.test(b)).join(' | ') || '-'), '- Judul: ' + (d.headings.join(' | ') || '-'), '');
  };
  const kategori = () => page.evaluate((navSrc) => {
    const nav = new RegExp(navSrc);
    const el = [...document.querySelectorAll('main *, [class*=card], [class*=category]')].filter((e) => e.offsetParent && getComputedStyle(e).cursor === 'pointer');
    const t = el.map((e) => (e.innerText || '').trim().replace(/\s+/g, ' ')).filter((x) => x.length >= 3 && x.length <= 40 && !nav.test(x));
    return [...new Set(t)].slice(0, 12);
  }, NAV.source);
  try {
    await ensureLogin(page);
    for (const [nama, url] of [['consistent-characters', 'https://app.artistly.ai/ai/consistent-characters'], ['image-designer-v6', 'https://app.artistly.ai/ai/image-designer-v6']]) {
      await page.goto(url, { waitUntil: 'domcontentloaded' }); await sleep(5000); await tutupPopup(page); await catat(nama);
      const ks = await kategori(); out.push(`Kategori ${nama}: ${ks.join(' | ') || '-'}`, '');
      for (const k of ks.filter((x) => !BAHAYA.test(x)).slice(0, 8)) {
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded' }); await sleep(4000); await tutupPopup(page);
          await page.getByText(k, { exact: true }).filter({ visible: true }).first().click({ timeout: 10000 }); await sleep(4000); await tutupPopup(page);
          await catat(`${nama}-${k.replace(/\W+/g, '-').toLowerCase().slice(0, 30)}`);
          const ks2 = (await kategori()).filter((x) => !BAHAYA.test(x) && !ks.includes(x));
          if (ks2.length) out.push(`Pilihan lanjutan di "${k}": ${ks2.join(' | ')}`, '');
        } catch (e) { out.push(`> ${nama} / ${k}: GAGAL ${e.message.split('\n')[0]}`, ''); }
      }
    }
  } finally {
    fs.writeFileSync(path.join(qc, 'PETA_GAMBAR_ARTISTLY.md'), out.join('\n') + '\n'); log('Peta gambar: ' + path.join(qc, 'PETA_GAMBAR_ARTISTLY.md'));
    await ctx.close().catch(() => {});
  }
}

// peta-adegan (owner 2026-11-06 07:21): hanya membaca langkah sesudah unggah acuan di Consistent Characters.
// Mengunggah satu acuan faceless (3d & 2d) dan dua acuan (Multi-consistent), lalu mencatat form STEP 3 (prompt, gaya,
// rasio, tombol). Tidak menekan tombol yang membuat gambar atau memakai kredit.
async function cmdPetaAdegan(acuanDir) {
  const ctx = await openBrowser(); const page = ctx.pages()[0] || (await ctx.newPage());
  const out = ['# Peta Consistent Characters sesudah unggah acuan', '', `Dibuat otomatis ${new Date().toISOString()} (hanya membaca).`, ''];
  const qc = path.join(HERE, 'qc'); fs.mkdirSync(qc, { recursive: true });
  const acuan = fs.readdirSync(acuanDir).filter((f) => /\.png$/i.test(f)).map((f) => path.join(acuanDir, f));
  const catat = async (nama) => { await sleep(2500); const d = await dumpPage(page); await page.screenshot({ path: path.join(qc, `artistly-petaadegan-${nama}.png`), fullPage: true }).catch(() => {});
    out.push(`## ${nama}`, '', `URL: ${d.url}`, '', '- Kolom: ' + (d.fields.map((f) => `${f.tag}/${f.type} "${f.label || f.placeholder}"${f.value ? ` = "${f.value}"` : ''}`).join(' | ') || '-'), '- Tombol: ' + (d.buttons.join(' | ') || '-'), '- Judul: ' + (d.headings.join(' | ') || '-'), ''); };
  try {
    await ensureLogin(page);
    for (const [kat, n] of [['3d & 2d Style Images', 1], ['Multi-consistent Characters', 2]]) {
      try {
        await page.goto('https://app.artistly.ai/ai/consistent-characters', { waitUntil: 'domcontentloaded' }); await sleep(5000); await tutupPopup(page);
        await page.getByText(kat, { exact: true }).filter({ visible: true }).first().click({ timeout: 10000 }); await sleep(3000);
        const inputs = page.locator('input[type=file]');
        const cnt = await inputs.count(); out.push(`${kat}: ${cnt} input file`, '');
        for (let i = 0; i < Math.min(n, cnt, acuan.length); i++) { await inputs.nth(i).setInputFiles(acuan[i]); await sleep(4000); }
        await catat(kat.replace(/\W+/g, '-').toLowerCase());
        await page.mouse.wheel(0, 1500); await catat(kat.replace(/\W+/g, '-').toLowerCase() + '-bawah');
      } catch (e) { out.push(`> ${kat}: GAGAL ${e.message.split('\n')[0]}`, ''); }
    }
  } finally {
    fs.writeFileSync(path.join(qc, 'PETA_ADEGAN_ARTISTLY.md'), out.join('\n') + '\n'); log('Peta adegan: ' + path.join(qc, 'PETA_ADEGAN_ARTISTLY.md'));
    await ctx.close().catch(() => {});
  }
}

// gambar-v6 (owner 2026-11-06 08:01: gambar adegan Artistly untuk super storyboard): AI Image Designer v6, kategori
// "Artistic Designer V2", satu prompt per halaman naskah, rasio 9:16, Private, 2 gambar per halaman. Peta UI 2026-11-06
// (skills/artistly-runner/peta-gambar): textarea "Enter prompt here", select rasio, folder, visibilitas, jumlah, tombol
// "Generate Image". Gambar disimpan ke <folder naskah>/gambar/hal-NN-k.png. Halaman yang sudah punya gambar dilewati.
async function cmdGambarV6(naskahFile) {
  const nf = path.resolve(naskahFile); const n = JSON.parse(fs.readFileSync(nf, 'utf8'));
  const dir = path.join(path.dirname(nf), 'gambar'); fs.mkdirSync(dir, { recursive: true });
  const qc = path.join(HERE, 'qc'); fs.mkdirSync(qc, { recursive: true });
  const kat = n.kategori_v6 || 'Artistic Designer V2';
  // Preset gaya komik (komik-gaya.json, owner 2026-11-15): "gaya" di naskah menambah prompt gaya + kalimat wajib (faceless, tanpa teks)
  // di depan setiap script, sehingga script cukup berisi CHARACTERS dan SCENE.
  // Halaman "tanpa_orang": true memakai wajib_kosong, bukan wajib: kalimat wajib menyebut tokoh dan badan penuh, sehingga
  // Artistly selalu menambah kerumunan figur botak (uji 2026-11-16 KISAH-QARUN hal-01 dan hal-09, tiga putaran ditolak).
  let awalan = '', akhiran = '', awalanKosong = '', akhiranKosong = null;
  if (n.gaya) {
    const G = JSON.parse(fs.readFileSync(path.join(HERE, 'komik-gaya.json'), 'utf8'));
    const g = G.gaya[n.gaya]; if (!g) throw new Error(`gaya "${n.gaya}" tidak ada di komik-gaya.json: ${Object.keys(G.gaya).join(', ')}`);
    // Preset boleh punya "wajib" sendiri (kisah-3d-realistis 2026-11-22: wajib global melarang close-up wajah = kamera dikorbankan).
    awalan = `${g.prompt} ${g.wajib || G.wajib} `; awalanKosong = `${g.prompt_kosong || g.prompt} ${G.wajib_kosong || G.wajib} `; akhiran = g.akhir ? ' ' + g.akhir : ''; log(`gaya komik: ${g.nama}`);
    // 2026-11-17 Usman bin Affan: prompt/akhir gaya boneka menyebut "characters", sehingga halaman tanpa_orang tetap digambari
    // orang (hal 4, 5, 8: 1-2 figur). Halaman kosong memakai prompt_kosong dan akhir_kosong bila ada.
    if (g.prompt_kosong) akhiranKosong = g.akhir_kosong ? ' ' + g.akhir_kosong : '';
    // Film 16:9 (owner 2026-11-17, Dzulqarnain): kalimat komposisi vertikal di "wajib" diganti komposisi layar lebar.
    if (n.rasio === '16:9') {
      const lebar = (s) => s.replace(/Vertical 9:16 composition[^.]*\./, 'Wide cinematic 16:9 widescreen composition, full bodies visible, rule of thirds.');
      awalan = lebar(awalan); awalanKosong = lebar(awalanKosong);
    }
  }
  const ctx = await openBrowser(); const page = ctx.pages()[0] || (await ctx.newPage());
  const gagal = [];
  // 2026-11-06 KAKEK01: galeri lama dimuat lambat, sehingga gambar Saheela lama dan gambar halaman sebelumnya ikut tersimpan.
  // Semua URL yang pernah terlihat dicatat lintas halaman, daftar 'sebelum' diambil ulang tepat sebelum Generate, dan isi file yang
  // sama dengan file lain ditolak.
  const pernah = new Set(); const hashAda = new Set(fs.readdirSync(dir).filter((f) => /\.png$/.test(f)).map((f) => crypto.createHash('sha1').update(fs.readFileSync(path.join(dir, f))).digest('hex')));
  try {
    await ensureLogin(page);
    for (let i = 0; i < n.halaman.length; i++) {
      const no = String(i + 1).padStart(2, '0');
      if (fs.existsSync(path.join(dir, `hal-${no}-1.png`))) { log(`hal ${no}: sudah ada, dilewati`); continue; }
      try {
        await page.goto('https://app.artistly.ai/ai/image-designer-v6', { waitUntil: 'domcontentloaded' }); await sleep(5000); await tutupPopup(page);
        await page.getByText(kat, { exact: true }).filter({ visible: true }).first().click({ timeout: 15000 }); await sleep(8000);
        for (const u of await imageUrls(page, 'img')) pernah.add(u);
        await page.locator('textarea').filter({ visible: true }).first().fill(n.halaman[i].tanpa_orang ? awalanKosong + n.halaman[i].script + (akhiranKosong ?? akhiran) : awalan + n.halaman[i].script + akhiran);
        const sel = page.locator('select').filter({ visible: true });
        const pilih = async (re, val) => { for (let k = 0; k < await sel.count(); k++) { const s = sel.nth(k); const opts = await s.locator('option').allTextContents(); const o = opts.find((t) => re.test(t)); if (o && (!val || val.test(o))) { await s.selectOption({ label: o }); return o.trim(); } } return null; };
        const rasio = await pilih(n.rasio === '16:9' ? /16:9/ : /9:16/); const vis = await pilih(/^\s*Private\s*$/i); const jml = await pilih(/^\s*2\s*$/);
        log(`hal ${no}: rasio ${rasio || 'TIDAK ADA'}, ${vis || 'visibilitas ?'}, jumlah ${jml || '?'}`);
        if(ENV.JOTA_RUNTIME_MODE==='mac'&&(!rasio||!vis||!jml))throw new Error('Artistly Mac: required private visibility/ratio/count selector unavailable; do not generate');
        // 2026-11-06 acuan Uwais: hasil generate sebelumnya baru muncul di galeri setelah halaman dimuat, sehingga terambil sebagai
        // gambar baru (hasil bergeser satu halaman, halaman pertama berisi gambar terakhir run sebelumnya). Tunggu galeri stabil.
        { let stabil = 0, akhirTunggu = Date.now() + 90000; while (stabil < 3 && Date.now() < akhirTunggu) { await sleep(5000); let tambah = 0; for (const u of await imageUrls(page, 'img')) if (!pernah.has(u)) { pernah.add(u); tambah++; } stabil = tambah ? 0 : stabil + 1; } }
        await page.getByRole('button', { name: 'Generate Image', exact: true }).filter({ visible: true }).first().click();
        // 2026-11-06 (acuan Uwais, run ketiga): gambar yang muncul sesaat setelah Generate adalah hasil generate SEBELUMNYA
        // (hasil tiap halaman tersimpan satu halaman terlambat). Yang muncul dalam 8 detik pertama dicatat sebagai lama; bila hasil
        // baru belum terlihat setelah 90 detik, halaman dimuat ulang setiap 45 detik.
        await sleep(8000); { let sisa = 0; for (const u of await imageUrls(page, 'img')) if (!pernah.has(u)) { pernah.add(u); sisa++; } if (sisa) log(`hal ${no}: ${sisa} gambar sisa generate sebelumnya diabaikan`); }
        const cocokG = (u) => !pernah.has(u) && /artistly|cdn|amazonaws|cloudfront/i.test(u) && !/logo|icon|avatar/i.test(u);
        let baru = []; const mulaiT = Date.now(), akhir = mulaiT + 5 * 60 * 1000; let muatUlang = mulaiT + 90000;
        while (Date.now() < akhir && baru.length < 2) {
          await sleep(6000); baru = (await imageUrls(page, 'img')).filter(cocokG);
          if (baru.length < 2 && Date.now() > muatUlang) { muatUlang = Date.now() + 45000; await page.reload({ waitUntil: 'domcontentloaded' }).catch(() => {}); await sleep(6000); log(`hal ${no}: halaman dimuat ulang menunggu hasil`); }
        }
        if (!baru.length) { await page.screenshot({ path: path.join(qc, `v6-gagal-${no}.png`), fullPage: true }).catch(() => {}); throw new Error('gambar baru tidak muncul dalam 5 menit'); }
        let k = 0;
        for (const u of [...new Set(baru)].slice(0, 2)) { pernah.add(u); const r = await page.request.get(u); if (!r.ok()) continue; const buf = await r.body(); const h = crypto.createHash('sha1').update(buf).digest('hex'); if (hashAda.has(h)) { log(`hal ${no}: gambar kembar dengan file lain, dibuang`); continue; } hashAda.add(h); fs.writeFileSync(path.join(dir, `hal-${no}-${++k}.png`), buf); try { const sp = path.join(dir, 'sumber.json'); const m = fs.existsSync(sp) ? JSON.parse(fs.readFileSync(sp, 'utf8')) : {}; m[`hal-${no}-${k}.png`] = u; fs.writeFileSync(sp, JSON.stringify(m, null, 2)); } catch {} }
        if (!k) throw new Error('tidak ada gambar baru yang unik');
        log(`hal ${no}: ${k} gambar disimpan`);
      } catch (e) { gagal.push(`hal ${no}: ${e.message.split('\n')[0]}`); log(`hal ${no}: GAGAL ${e.message.split('\n')[0]}`); }
    }
  } finally { await ctx.close().catch(() => {}); }
  const fs2 = fs.readdirSync(dir).filter((f) => /\.png$/.test(f)).sort();
  if (fs2.length) py(`import sys,glob,math\nfrom PIL import Image\nfs=sorted(glob.glob(sys.argv[1]))\nW=300\nth=[Image.open(f).convert('RGB') for f in fs]\nth=[i.resize((W,int(i.height*W/i.width))) for i in th]\nH=max(i.height for i in th);c=4;r=math.ceil(len(th)/c)\nS=Image.new('RGB',(W*c,H*r),'white')\nfor k,i in enumerate(th): S.paste(i,((k%c)*W,(k//c)*H))\nS.save(sys.argv[2],quality=80)\nprint('Pratinjau',sys.argv[2])`, [path.join(dir, '*.png'), path.join(dir, 'pratinjau.jpg')]);
  if (gagal.length) throw new Error('Sebagian halaman gagal: ' + gagal.join('; '));
}

// storybook: satu pesanan dari argumen (dipakai GitHub Actions). Data anak tidak disimpan di repo (AGENTS.md):
// masuk lewat input workflow, hasil ke Drive dan artefak. Gambar lama dicatat dulu supaya buku lama tidak ikut terambil.
const FACELESS_ID = ' Semua tokoh tanpa wajah: wajah polos tanpa mata, hidung, mulut.';
async function cmdStorybook(vars) {
  const nama = (vars.nama || 'Storybook').trim();
  let ide = String(vars.ide || '').trim(); if (!ide) throw new Error('--var ide=... wajib');
  if (vars.faceless !== 'tidak') ide = ide.slice(0, 200 - FACELESS_ID.length).trim() + FACELESS_ID;
  const tgl = new Date().toISOString().slice(0, 10);
  const folder = vars.folder || `Storybook ${nama} ${tgl}`.replace(/[\\/]/g, '-');
  const dir = path.join(ENV.ARTISTLY_OUT || path.join(HERE, 'hasil-artistly'), folder);
  const ctx = await openBrowser(); const page = ctx.pages()[0] || (await ctx.newPage()); const state = {};
  try {
    await ensureLogin(page);
    await page.goto('https://app.artistly.ai/personal-designs', { waitUntil: 'domcontentloaded' }); await sleep(4000); await tutupPopup(page);
    await page.getByText('Idea To Illustrated Book', { exact: false }).filter({ visible: true }).first().click().catch(() => log('filter Idea To Illustrated Book tidak ada (belum pernah buat buku?)'));
    await sleep(4000); state.before = new Set(await imageUrls(page, 'main img')); log(`gambar lama dicatat: ${state.before.size}`);
    await runRecipe('storybook-buat', { ide, halaman: String(Math.min(+vars.halaman || 10, 30)), bahasa: vars.bahasa || 'Indonesian', gaya: vars.gaya || "Children's Book" }, { ctx });
    await runRecipe('storybook-ambil', { dir, nama }, { ctx, state });
    fs.writeFileSync(path.join(dir, 'PESANAN.txt'), `Nama: ${nama}\nIde yang dikirim (${ide.length} huruf): ${ide}\nHalaman: ${vars.halaman || 10}\nGaya: ${vars.gaya || "Children's Book"}\nBahasa: ${vars.bahasa || 'Indonesian'}\nCek pratinjau.jpg: judul sampul, salah ketik, wajah, tokoh tambahan.\n`);
    if (ENV.JOTA_DRIVE_URL) {
      try { execFileSync('node', [path.join(HERE, 'upload-drive.mjs'), dir, folder], { stdio: 'inherit' }); log(`Drive: Video JOTA/${folder}`); }
      catch { log('unggah Drive sebagian gagal; file lengkap ada di artefak workflow'); }
    }
    log(`SELESAI ${dir}`);
  } finally { await ctx.close().catch(() => {}); }
}

// ---------- komik (Script To Storybook) ----------
// Pengetahuan pasti ada di skills/artistly-runner/SKILL.md. Ringkasnya (uji 2026-11-04):
// - Form: Character Source "Use Reference Photo" (1-4 foto, urut sesuai tokoh pertama muncul di naskah), Book Format,
//   Story Script (Inggris, maks 5000 huruf, "page breaks are chosen automatically"), Dimensions, Generate.
// - Setelah Generate tombol menjadi "Submitting..." dengan progres %; pindah halaman sebelum selesai membatalkan kiriman.
// - Filter Personal Designs "Script to Storybook" memuat buku lama dari alat lain; buku dikenali per folder URL.
const REPO = path.resolve(HERE, '../..');
const PD = 'https://app.artistly.ai/personal-designs';
// peta-karakter (owner 2026-11-18: "ada multi karakter di Artistly"; karakter Image Designer v6 berbeda tiap adegan): hanya
// membaca form fitur berkarakter konsisten sesudah unggah acuan: AI Design Agents > Multi-Character Storybook dan Consistent
// Character Storybook, AI Design Assistants > Storybook Illustrator (Use Reference Photo). Mengunggah acuan ke input file
// lalu mencatat kolom, pilihan, tombol, dan tangkapan layar penuh. Tidak menekan Generate atau tombol yang memakai kredit.
async function cmdPetaKarakter(acuanDir) {
  const ctx = await openBrowser(); const page = ctx.pages()[0] || (await ctx.newPage());
  const out = ['# Peta fitur karakter konsisten Artistly sesudah unggah acuan', '', `Dibuat otomatis ${new Date().toISOString()} oleh \`node artistly.mjs peta-karakter\` (hanya membaca).`, ''];
  const qc = path.join(HERE, 'qc'); fs.mkdirSync(qc, { recursive: true });
  const acuan = fs.readdirSync(acuanDir).filter((f) => /\.png$/i.test(f)).sort().map((f) => path.join(acuanDir, f));
  const catat = async (nama) => { await sleep(2500); const d = await dumpPage(page); await page.screenshot({ path: path.join(qc, `artistly-petakarakter-${nama}.png`), fullPage: true }).catch(() => {});
    const opsi = await page.evaluate(() => [...document.querySelectorAll('select')].filter((s) => s.offsetParent).map((s) => [...s.options].map((o) => o.text.trim()).join(' / '))).catch(() => []);
    out.push(`## ${nama}`, '', `URL: ${d.url}`, '', '- Kolom: ' + (d.fields.map((f) => `${f.tag}/${f.type} "${f.label || f.placeholder}"${f.value ? ` = "${f.value}"` : ''}`).join(' | ') || '-'),
      '- Pilihan select: ' + (opsi.join(' || ') || '-'), '- Tombol: ' + (d.buttons.join(' | ') || '-'), '- Judul: ' + (d.headings.join(' | ') || '-'), ''); };
  const unggah = async (nama, maks) => {
    const inputs = page.locator('input[type=file]'); const cnt = await inputs.count();
    const multi = cnt ? await inputs.first().evaluate((e) => e.multiple).catch(() => false) : false;
    out.push(`${nama}: ${cnt} input file, multiple=${multi}`, '');
    if (cnt === 1 && multi) await inputs.first().setInputFiles(acuan.slice(0, maks));
    else for (let i = 0; i < Math.min(cnt, maks, acuan.length); i++) await inputs.nth(i).setInputFiles(acuan[i]);
    await sleep(12000);
  };
  const klik = (teks) => page.getByText(teks, { exact: false }).filter({ visible: true }).first().click({ timeout: 12000 });
  try {
    await ensureLogin(page);
    for (const kartu of ['Multi-Character Storybook', 'Consistent Character Storybook']) {
      const nama = kartu.replace(/\W+/g, '-').toLowerCase();
      try {
        await page.goto('https://app.artistly.ai/ai/ai-design-agents', { waitUntil: 'domcontentloaded' }); await sleep(5000); await tutupPopup(page);
        await page.getByText(new RegExp(`^\\s*(BETA\\s*)?${kartu}\\s*$`, 'i')).filter({ visible: true }).first().click({ timeout: 15000 }); await sleep(4000); await tutupPopup(page);
        await catat(nama);
        const cns = page.getByText('Create New Story', { exact: false }).filter({ visible: true }).first();
        if (await cns.count()) { await cns.click(); await sleep(4000); await tutupPopup(page); await catat(nama + '-form'); }
        const ref = page.getByText('Use Reference Photo', { exact: false }).filter({ visible: true }).first();
        if (await ref.count()) { await ref.click().catch(() => {}); await sleep(2000); }
        await unggah(nama, 4); await catat(nama + '-acuan');
        await page.mouse.wheel(0, 2000); await catat(nama + '-acuan-bawah');
      } catch (e) { out.push(`> ${kartu}: GAGAL ${e.message.split('\n')[0]}`, ''); }
    }
    try {
      await page.goto('https://app.artistly.ai/ai/ai-design-assistants', { waitUntil: 'domcontentloaded' }); await sleep(5000); await tutupPopup(page);
      await klik('Storybook Illustrator'); await sleep(4000); await tutupPopup(page); await catat('storybook-illustrator');
      await klik('Use Reference Photo'); await sleep(2500); await catat('storybook-illustrator-ref');
      await unggah('storybook-illustrator', 4); await catat('storybook-illustrator-acuan');
      await page.mouse.wheel(0, 2000); await catat('storybook-illustrator-acuan-bawah');
    } catch (e) { out.push(`> Storybook Illustrator: GAGAL ${e.message.split('\n')[0]}`, ''); }
  } finally {
    fs.writeFileSync(path.join(qc, 'PETA_KARAKTER_ARTISTLY.md'), out.join('\n') + '\n'); log('Peta karakter: ' + path.join(qc, 'PETA_KARAKTER_ARTISTLY.md'));
    await ctx.close().catch(() => {});
  }
}

const STUDIO = 'https://app.artistly.ai/ai/ai-storybook-studio';
const folderDari =(u) => u.split('?')[0].replace(/\/[^/]*$/, '');

export function cekNaskahKomik(n, file = 'naskah') {
  const E = [], W = [];
  if (!Array.isArray(n.halaman) || !n.halaman.length) E.push(`${file}: halaman kosong`);
  const k = n.karakter || [];
  if (k.length > 4) E.push(`${file}: foto acuan maksimal 4 (Artistly)`);
  for (const f of k) if (!fs.existsSync(path.resolve(REPO, f))) E.push(`${file}: foto acuan tidak ada: ${f}`);
  const script = (n.halaman || []).map((h, i) => `Page ${i + 1}: ${h.script || ''}`).join('\n\n');
  if (script.length > 5000) E.push(`${file}: Story Script ${script.length} huruf, maksimal 5000`);
  (n.halaman || []).forEach((h, i) => {
    if (!h.script) E.push(`${file}: halaman ${i + 1} tanpa script`);
    // Naskah gambar wajib Inggris; kata Indonesia umum menandakan salah tempat (dialog ada di balon, bukan di script).
    if (/\b(dan|yang|tidak|sedang|dengan|kakak|adik)\b/i.test(h.script || '')) W.push(`${file}: halaman ${i + 1} script tampak berbahasa Indonesia; Artistly minta Inggris`);
    if (/\b(asleep|sleeping|lying|close-up|looks? down|head down)\b/i.test(h.script || '')) E.push(`${file}: halaman ${i + 1} pose terbukti memunculkan wajah (v3.84)`);
    const orang = !/\bno people\b/i.test(h.script || '');
    if (orang && !/faceless|blank face|no face/i.test(h.script || '')) E.push(`${file}: halaman ${i + 1} berorang tanpa kalimat faceless`);
    for (const b of h.balon || []) if (String(b.teks || '').split(/\s+/).length > 14) W.push(`${file}: halaman ${i + 1} balon lebih dari 14 kata, sulit dibaca`);
  });
  return { E, W, script };
}

async function bukaPD(page) {
  await page.goto(PD, { waitUntil: 'domcontentloaded' }); await sleep(5000); await tutupPopup(page);
  // muat lebih banyak sekali supaya buku lama tidak tertukar dengan buku baru
  const more = page.getByRole('button', { name: 'Load More', exact: true }).filter({ visible: true }).first();
  if (await more.count().catch(() => 0)) { await more.click().catch(() => {}); await sleep(4000); }
  const urls = [...new Set((await imageUrls(page, 'main img')).filter((u) => /artistly/.test(u)).map((u) => u.split('?')[0]))];
  const grup = new Map(); for (const u of urls) { const f = folderDari(u); if (!grup.has(f)) grup.set(f, []); grup.get(f).push(u); }
  return grup;
}

// Multi-Character Storybook (owner 2026-11-18; peta-karakter: form hanya textarea "Enter your script here..." + Choose
// Dimension (ada 9:16) + "Generate Story"; tanpa unggah foto, konsistensi tokoh dari definisi tokoh di naskah).
// naskah: {agen: 'multi', dimensi: '9:16', tokoh: '<blok definisi tokoh>', halaman: [{script}]}.
export function skripMulti(n) {
  return `${n.tokoh ? n.tokoh.trim() + '\n\n' : ''}${n.halaman.map((h, i) => `Page ${i + 1}: ${h.script}`).join('\n\n')}`;
}
async function kirimMulti(page, n, qc, tag) {
  await page.goto('https://app.artistly.ai/ai/ai-design-agents', { waitUntil: 'domcontentloaded' }); await sleep(5000); await tutupPopup(page);
  await page.getByText(/^\s*(BETA\s*)?Multi-Character Storybook\s*$/i).filter({ visible: true }).first().click({ timeout: 15000 }); await sleep(3000); await tutupPopup(page);
  const cns = page.getByText('Create New Story', { exact: false }).filter({ visible: true }).first();
  if (await cns.count()) { await cns.click(); await sleep(3000); await tutupPopup(page); }
  const script = skripMulti(n);
  // Uji 2026-11-18: naskah 5752 huruf ditolak toast "Please enter a shorter script, maximum 5000 characters".
  if (script.length > 5000) throw new Error(`${tag}: naskah Multi-Character ${script.length} huruf, maksimal 5000`);
  const ta = page.locator('textarea').filter({ visible: true }).first();
  await ta.fill(script); const got = await ta.inputValue();
  if (got.length < script.length) throw new Error(`${tag}: naskah Multi-Character terpotong (${got.length} dari ${script.length})`);
  const pil = await page.evaluate((d) => { for (const s of document.querySelectorAll('select')) { const o = [...s.options].find((x) => x.text.includes(d)); if (o) { s.value = o.value; s.dispatchEvent(new Event('change', { bubbles: true })); return o.text.trim(); } } return ''; }, n.dimensi || '9:16');
  if (!pil) throw new Error(`${tag}: dimensi ${n.dimensi} tidak ada di form Multi-Character`);
  log(`${tag}: Multi-Character, naskah ${script.length} huruf, dimensi ${pil}`);
  await page.screenshot({ path: path.join(qc, `multi-${tag}-sebelum.png`), fullPage: true }).catch(() => {});
  // Toast muncul sebentar lalu hilang: catat semua teks yang ditambahkan ke halaman.
  await page.evaluate(() => { window.__pesan = []; new MutationObserver((ms) => { for (const m of ms) for (const x of m.addedNodes) { const s = (x.innerText || x.textContent || '').trim(); if (s && s.length < 400) window.__pesan.push(s); } }).observe(document.body, { childList: true, subtree: true }); }).catch(() => {});
  await page.getByRole('button', { name: /Generate Story/i }).filter({ visible: true }).first().click();
  const end = Date.now() + 15 * 60 * 1000; let akhir = '', normal = 0, shot = 0;
  while (Date.now() < end) {
    await sleep(5000);
    const toast = (await page.evaluate(() => window.__pesan || []).catch(() => [])).find((s) => /shorter|maximum|error|failed|invalid|required/i.test(s));
    if (toast) { akhir = 'galat: ' + toast; break; }
    if (shot < 12) await page.screenshot({ path: path.join(qc, `multi-${tag}-t${String(++shot).padStart(2, '0')}.png`) }).catch(() => {});
    const t = (await page.evaluate(() => document.body.innerText).catch(() => '')).replace(/\s+/g, ' ');
    const pct = (t.match(/(\d{1,3})%/) || [])[1];
    if (/personal-designs|your-stor/i.test(page.url()) || /\bsuccess/i.test(t)) { akhir = 'terkirim'; break; }
    const err = t.match(/.{0,80}(error|failed|limit reached|insufficient).{0,120}/i);
    if (err) { akhir = 'galat: ' + err[0]; break; }
    if (!/generating|submitting|creating|please wait/i.test(t) && !pct) { if (++normal >= 12) { akhir = 'tombol kembali normal'; break; } continue; }
    normal = 0; log(`${tag}: membuat ${pct ? pct + '%' : ''}`);
  }
  await page.screenshot({ path: path.join(qc, `multi-${tag}-setelah.png`), fullPage: true }).catch(() => {});
  log(`${tag}: kirim selesai (${akhir || 'batas waktu'}), URL ${page.url()}`);
  if (!akhir || akhir.startsWith('galat')) throw new Error(`${tag}: Generate Story tidak terkirim (${akhir || 'lebih dari 15 menit'})`);
}

async function kirimKomik(page, n, qc, tag) {
  if (n.agen === 'multi') return kirimMulti(page, n, qc, tag);
  await page.goto(STUDIO, { waitUntil: 'domcontentloaded' }); await sleep(4000); await tutupPopup(page);
  await page.getByText(/^\s*(v7\s*)?(NEW\s*)?Script To Storybook\s*$/i).filter({ visible: true }).first().click({ timeout: 15000 }); await sleep(3000); await tutupPopup(page);
  const cns = page.getByText('Create New Story', { exact: false }).filter({ visible: true }).first();
  if (await cns.count()) { await cns.click(); await sleep(3000); }
  fs.writeFileSync(path.join(qc, `komik-${tag}-form.json`), JSON.stringify(await dumpPage(page), null, 2));
  const ref = page.getByText('Use Reference Photo', { exact: false }).filter({ visible: true }).first();
  if (await ref.count()) await ref.click().catch(() => {});
  const foto = (n.karakter || []).map((f) => path.resolve(REPO, f));
  if (foto.length) { await page.locator('input[type=file]').first().setInputFiles(foto); await sleep(12000); log(`${tag}: foto acuan diunggah ${foto.length}`); }
  // Single Page Layout = satu adegan per gambar (cocok untuk panel komik). Dual = gambar melebar dua halaman.
  const lay = n.layout || 'Single Page Layout';
  await page.getByText(lay, { exact: true }).filter({ visible: true }).first().click().catch(() => log(`${tag}: pilihan ${lay} tidak ditemukan`));
  const { script } = cekNaskahKomik(n);
  const ta = page.locator('textarea').filter({ visible: true }).first();
  await ta.fill(script); const got = await ta.inputValue(); if (got.length < script.length) throw new Error(`${tag}: Story Script terpotong (${got.length} dari ${script.length})`);
  // 2026-11-18: select terakhir yang terlihat adalah Language, bukan Dimensions. Cari select yang punya opsi berisi n.dimensi.
  if (n.dimensi) {
    const pil = await page.evaluate((d) => { for (const [i, s] of [...document.querySelectorAll('select')].entries()) { const o = [...s.options].find((x) => x.text.includes(d)); if (o) { s.value = o.value; s.dispatchEvent(new Event('change', { bubbles: true })); s.dispatchEvent(new Event('input', { bubbles: true })); return `${i}: ${o.text.trim()}`; } } return ''; }, n.dimensi);
    const semua = await page.evaluate(() => [...document.querySelectorAll('select')].map((s) => [...s.options].map((o) => o.text.trim()).join(' / ')).join(' || '));
    if (pil) log(`${tag}: dimensi dipilih ${pil}`); else throw new Error(`${tag}: dimensi ${n.dimensi} tidak ada di form; opsi select: ${semua}`);
  }
  await page.screenshot({ path: path.join(qc, `komik-${tag}-sebelum.png`), fullPage: true }).catch(() => {});
  await page.getByRole('button', { name: 'Generate', exact: true }).filter({ visible: true }).first().click();
  // Tunggu kiriman selesai: "Submitting..." hilang, atau pindah ke Personal Designs, atau muncul Success. Maks 15 menit.
  const end = Date.now() + 15 * 60 * 1000; let akhir = ''; let normal = 0;
  let shot = 0;
  // catat toast atau pesan yang muncul sebentar (KOMIK-H01 07:22: form hilang setelah 33% tanpa pesan terbaca)
  await page.evaluate(() => { window.__pesan = []; new MutationObserver((ms) => { for (const m of ms) for (const n of m.addedNodes) { const s = (n.innerText || n.textContent || '').trim(); if (s && s.length < 400) window.__pesan.push(s); } }).observe(document.body, { childList: true, subtree: true }); }).catch(() => {});
  while (Date.now() < end) {
    await sleep(5000);
    if (shot < 16) await page.screenshot({ path: path.join(qc, `komik-${tag}-t${String(++shot).padStart(2, '0')}.png`) }).catch(() => {});
    const t = (await page.evaluate(() => document.body.innerText).catch(() => '')).replace(/\s+/g, ' ');
    const pct = (t.match(/(\d{1,3})%/) || [])[1];
    if (/personal-designs/.test(page.url()) || /\bsuccess/i.test(t)) { akhir = 'terkirim'; break; }
    const err = t.match(/.{0,80}(error|failed|gagal|limit reached|insufficient).{0,120}/i);
    if (err && !/Submitting/i.test(t)) { akhir = 'galat: ' + err[0]; break; }
    // progres bisa hilang sebentar lalu halaman pindah; tunggu 60 detik tenang sebelum menyimpulkan
    if (!/Submitting/i.test(t) && !pct) { normal = (normal || 0) + 1; if (normal >= 12) { akhir = 'tombol kembali normal'; break; } continue; }
    normal = 0;
    log(`${tag}: mengirim ${pct ? pct + '%' : ''}`);
  }
  await page.screenshot({ path: path.join(qc, `komik-${tag}-setelah.png`), fullPage: true }).catch(() => {});
  const sesudah = (await page.evaluate(() => document.body.innerText).catch(() => '')).replace(/\s+/g, ' ');
  fs.writeFileSync(path.join(qc, `komik-${tag}-setelah.txt`), sesudah);
  const pesan = await page.evaluate(() => [...new Set(window.__pesan || [])]).catch(() => []);
  fs.writeFileSync(path.join(qc, `komik-${tag}-pesan.txt`), pesan.join('\n---\n'));
  log(`${tag}: pesan yang muncul: ${pesan.filter((x) => !/^\d+%$/.test(x)).slice(-8).join(' | ').slice(0, 600)}`);
  log(`${tag}: kirim selesai (${akhir || 'batas waktu'}), URL ${page.url()}`);
  if (!akhir || akhir.startsWith('galat')) throw new Error(`${tag}: Generate tidak terkirim (${akhir || 'lebih dari 15 menit'})`);
  // Bukti kiriman diterima: cerita muncul di "Your Stories" (KOMIK-H01 06:31: progres berhenti di 22%, cerita tidak tersimpan).
  const potong = script.slice(8, 60).trim();
  for (let i = 1; i <= 3; i++) {
    await page.goto(STUDIO, { waitUntil: 'domcontentloaded' }); await sleep(4000); await tutupPopup(page);
    await page.getByText(/^\s*(v7\s*)?(NEW\s*)?Script To Storybook\s*$/i).filter({ visible: true }).first().click({ timeout: 15000 }).catch(() => {});
    await sleep(3000); await page.getByText('Your Stories', { exact: false }).filter({ visible: true }).first().click().catch(() => {});
    await sleep(5000);
    const daftar = (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ');
    if (daftar.includes(potong.slice(0, 40))) { log(`${tag}: cerita tersimpan di Your Stories`); return; }
    await sleep(20000);
  }
  await page.screenshot({ path: path.join(qc, `komik-${tag}-your-stories.png`), fullPage: true }).catch(() => {});
  throw new Error(`${tag}: cerita tidak muncul di Your Stories; kiriman ditolak Artistly. Lihat qc/komik-${tag}-setelah.png dan .txt`);
}

function simpanGambar(base, perlu) {
  const mentah = fs.readdirSync(path.join(base, 'mentah')).filter((f) => /\.png$/.test(f)).sort();
  const gdir = path.join(base, 'gambar'); fs.mkdirSync(gdir, { recursive: true });
  const offset = mentah.length > perlu ? mentah.length - perlu : 0;
  if (offset) fs.copyFileSync(path.join(base, 'mentah', mentah[0]), path.join(gdir, 'sampul-artistly.png'));
  mentah.slice(offset).forEach((f, i) => fs.copyFileSync(path.join(base, 'mentah', f), path.join(gdir, `polos-${String(i + 1).padStart(2, '0')}.png`)));
  log(`${path.basename(base)}: gambar polos ${mentah.length} (panel ${mentah.length - offset}, sampul ${offset})${mentah.length - offset < perlu ? ' KURANG dari ' + perlu : ''}`);
}

function rakitKomik(base, n0) {
  let n = n0;
  const rakit = { keluaran: 'komik', nama_pdf: n.nama_pdf || 'Komik.pdf', kapital: n.kapital !== false, halaman: [] };
  const adaG = (g) => g && fs.existsSync(path.join(base, g));
  const sampulG = [n.sampul?.gambar, 'gambar/sampul-artistly.png', 'gambar/polos-01.png'].find(adaG);
  // jumlah gambar dari Artistly bisa kurang dari jumlah halaman naskah (pemenggalan otomatis): panel tanpa gambar dilewati
  const nG = fs.existsSync(path.join(base, 'gambar')) ? fs.readdirSync(path.join(base, 'gambar')).filter((f) => /^polos-\d+\.png$/.test(f)).length : 0;
  if (nG < n.halaman.length) log(`PERINGATAN ${path.basename(base)}: gambar ${nG}, naskah ${n.halaman.length} halaman; panel tanpa gambar dilewati`);
  n = { ...n, halaman: n.halaman.slice(0, nG) };
  if (n.sampul && sampulG) rakit.halaman.push({ jenis: 'sampul', gambar: sampulG, fokus: n.sampul.fokus || [0.5, 0.4], judul: n.sampul.judul, subjudul: n.sampul.subjudul, bawah: n.sampul.bawah });
  const per = n.panel_per_halaman || 6; const baris = n.baris || [2, 2, 2];
  for (let i = 0; i < n.halaman.length; i += per) {
    const potong = n.halaman.slice(i, i + per);
    rakit.halaman.push({ ...(i === 0 && n.judul_halaman ? { judul_halaman: n.judul_halaman } : {}), baris: potong.length === per ? baris : [potong.length], panel: potong.map((h, k) => ({ gambar: `gambar/polos-${String(i + k + 1).padStart(2, '0')}.png`, fokus: h.fokus || [0.5, 0.4], ...(h.narasi ? { narasi: h.narasi } : {}), ...(h.narasi_bawah ? { narasi_bawah: h.narasi_bawah } : {}), balon: h.balon || [] })) });
  }
  if (n.pesan) rakit.halaman.push({ jenis: 'teks', judul: n.pesan.judul, isi: n.pesan.isi });
  fs.writeFileSync(path.join(base, 'naskah-rakit.json'), JSON.stringify(rakit, null, 2));
  execFileSync('python3', [path.join(HERE, 'komik-render.py'), 'naskah-rakit.json'], { cwd: base, stdio: 'inherit' });
  py(`import sys,glob,math\nfrom PIL import Image\nfs=sorted(glob.glob(sys.argv[1]))\nif fs:\n W=420\n th=[Image.open(f).convert('RGB') for f in fs]\n th=[i.resize((W,int(i.height*W/i.width))) for i in th]\n H=max(i.height for i in th);c=4;r=math.ceil(len(th)/c)\n S=Image.new('RGB',(W*c,H*r),'white')\n for k,i in enumerate(th): S.paste(i,((k%c)*W,(k//c)*H))\n S.save(sys.argv[2],quality=80)`, [path.join(base, 'gambar', '*.png'), path.join(base, 'pratinjau-gambar.jpg')]);
  log(`KOMIK SELESAI ${path.join(base, 'komik')}`);
}

// komik <naskah.json>[,<naskah2.json>...]: semua Generate dikirim dulu (Artistly memproses paralel), lalu diambil.
// Buku baru = folder yang belum ada sebelum kirim, terbaru dulu di Personal Designs, dipasangkan terbalik dengan urutan kirim.
// Gambar yang sudah ada dilewati (langsung dirakit). KOMIK_AMBIL=1: jangan Generate, ambil buku terbaru.
async function cmdKomik(arg) {
  if (!arg) throw new Error('pakai: node artistly.mjs komik <naskah.json>[,<naskah2.json>]');
  const items = arg.split(',').map((f) => { const nf = path.resolve(f.trim()); return { nf, base: path.dirname(nf), tag: path.basename(path.dirname(nf)), n: JSON.parse(fs.readFileSync(nf, 'utf8')) }; });
  let gagal = 0;
  for (const it of items) { const q = cekNaskahKomik(it.n, it.tag); q.W.forEach((w) => log('PERINGATAN ' + w)); if (q.E.length) { q.E.forEach((e) => log('GAGAL ' + e)); gagal++; } }
  if (gagal) throw new Error('naskah belum lolos cek; perbaiki dulu');
  const qc = path.join(HERE, 'qc'); fs.mkdirSync(qc, { recursive: true });
  const butuh = items.filter((it) => { const g = path.join(it.base, 'gambar'); return !(fs.existsSync(g) && fs.readdirSync(g).filter((f) => /^polos-/.test(f)).length >= it.n.halaman.length); });
  if (butuh.length) {
    const ctx = await openBrowser(); const page = ctx.pages()[0] || (await ctx.newPage());
    try {
      await ensureLogin(page);
      const lama = new Set((await bukaPD(page)).keys()); log(`folder buku lama: ${lama.size}`);
      if (ENV.KOMIK_AMBIL !== '1') for (const it of butuh) await kirimKomik(page, it.n, qc, it.tag);
      const end = Date.now() + 40 * 60 * 1000; let pilih = null, last = '', stabil = 0;
      while (Date.now() < end) {
        const grup = await bukaPD(page);
        const baru = [...grup.entries()].filter(([f]) => !lama.has(f) || ENV.KOMIK_AMBIL === '1').slice(0, butuh.length);
        const sig = baru.map(([, u]) => u.length).join('/');
        log(`cek buku: ${grup.size} folder, baru ${baru.length}/${butuh.length}, gambar ${sig || '-'}`);
        const cukup = baru.length === butuh.length && baru.every(([, u], k) => u.filter((x) => !/-caption\./.test(x)).length >= butuh[butuh.length - 1 - k].n.halaman.length);
        // Artistly memilih pemenggalan halaman sendiri, jadi jumlah gambar bisa beda dari naskah: terima kalau lengkap
        // dan stabil 2 kali cek, atau semua buku sudah punya gambar dan stabil 5 kali cek (sekitar 5 menit).
        const ada = baru.length === butuh.length && baru.every(([, u]) => u.length > 0);
        if (ada) { if (sig === last) stabil++; else stabil = 0; last = sig; if ((cukup && stabil >= 2) || stabil >= 5) { pilih = baru; break; } }
        await sleep(60000);
      }
      if (!pilih) throw new Error('buku baru belum lengkap setelah 40 menit; lihat qc/komik-*-setelah.png');
      for (const [k, [folder, urls]] of pilih.entries()) {
        const it = butuh[butuh.length - 1 - k]; // terbaru = kiriman terakhir
        fs.writeFileSync(path.join(it.base, 'sumber-artistly.txt'), folder + '\n' + urls.join('\n') + '\n');
        const state = { images: urls };
        await runSteps(page, ctx, { steps: [{ do: 'download', dir: it.base, name: 'img-{{n}}', split_caption: true, plain_dir: 'mentah' }] }, {}, state);
        simpanGambar(it.base, it.n.halaman.length);
      }
    } finally { await ctx.close().catch(() => {}); }
  }
  // n.storyboard = true (owner 2026-11-18): storybook dipakai sebagai storyboard adegan video; cukup gambar per halaman
  // gambar/page-NN.<ext> (nomor dari URL "page-NN"; uji Multi-Character: berkas jpg, urutan unduhan tidak urut halaman).
  for (const it of items) if (!it.n.storyboard) rakitKomik(it.base, it.n); else simpanStoryboard(it.base, it.tag);
}

function simpanStoryboard(base, tag) {
  const urls = fs.readFileSync(path.join(base, 'sumber-artistly.txt'), 'utf8').trim().split('\n').slice(1);
  const mentah = fs.readdirSync(path.join(base, 'mentah')).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
  const gdir = path.join(base, 'gambar'); fs.mkdirSync(gdir, { recursive: true });
  mentah.forEach((f, i) => { const p = (urls[i] || '').match(/page-(\d+)/)?.[1] || String(i + 1).padStart(2, '0'); fs.copyFileSync(path.join(base, 'mentah', f), path.join(gdir, `page-${p.padStart(2, '0')}${path.extname(f)}`)); });
  log(`${tag}: storyboard ${mentah.length} gambar di ${gdir}`);
}

// daftar: catat gambar Personal Designs urut tampilan (URL, teks kartu terdekat) ke qc/DAFTAR_ARTISTLY.md. Hanya membaca.
async function cmdDaftar() {
  const ctx = await openBrowser(); const page = ctx.pages()[0] || (await ctx.newPage());
  const out = [`# Daftar Artistly ${new Date().toISOString()}`, ''];
  const dump = async (judul) => {
    const r = await page.evaluate(() => ({
      img: [...document.querySelectorAll('main img, img')].filter((i) => i.offsetParent).map((i) => (i.currentSrc || i.src).split('?')[0]).filter((u) => /artistly/.test(u)),
      a: [...new Set([...document.querySelectorAll('a[href]')].filter((x) => x.offsetParent && /flipbook|story|book|design/i.test(x.href)).map((x) => `${(x.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 60)} -> ${x.href}`))],
    }));
    out.push(`## ${judul}`, '', `URL: ${page.url()}`, '', `Gambar ${r.img.length}:`, ...r.img.slice(0, 40).map((u, k) => `${k + 1}. ${u}`), '', 'Tautan:', ...r.a.slice(0, 40).map((l) => '- ' + l), '');
  };
  try {
    await ensureLogin(page);
    for (const f of ['Script to Storybook', 'Idea To Illustrated Book']) {
      await page.goto(PD, { waitUntil: 'domcontentloaded' }); await sleep(6000); await tutupPopup(page);
      await page.getByRole('button', { name: f, exact: true }).filter({ visible: true }).first().click({ timeout: 15000 }).catch(() => out.push(`> filter ${f} tidak bisa diklik`));
      await sleep(6000); await dump('Personal Designs filter ' + f);
    }
    await page.goto('https://app.artistly.ai/flipbook', { waitUntil: 'domcontentloaded' }); await sleep(6000); await tutupPopup(page); await dump('My Flipbooks');
    // Riwayat cerita di Storybook Studio (Script To Storybook, tanpa Create New Story) dan tampilan daftar.
    await page.goto(STUDIO, { waitUntil: 'domcontentloaded' }); await sleep(5000); await tutupPopup(page);
    await page.getByText(/^\s*(v7\s*)?(NEW\s*)?Script To Storybook\s*$/i).filter({ visible: true }).first().click({ timeout: 15000 }).catch(() => {});
    await sleep(6000); await dump('Studio Script To Storybook');
    const teks = (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ');
    out.push('Teks halaman:', teks.slice(0, 3000), '');
    const qc0 = path.join(HERE, 'qc'); fs.mkdirSync(qc0, { recursive: true });
    await page.screenshot({ path: path.join(qc0, 'daftar-studio.png'), fullPage: true }).catch(() => {});
    const ys = page.getByText('Your Stories', { exact: false }).filter({ visible: true }).first();
    if (await ys.count()) { await ys.click().catch(() => {}); await sleep(7000); await dump('Studio Your Stories');
      out.push('Teks:', (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ').slice(0, 3000), '');
      await page.screenshot({ path: path.join(qc0, 'daftar-your-stories.png'), fullPage: true }).catch(() => {}); }
    const sw = page.getByText('Switch to List', { exact: true }).filter({ visible: true }).first();
    if (await sw.count()) { await sw.click().catch(() => {}); await sleep(5000); await dump('Studio Switch to List');
      out.push('Teks:', (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ').slice(0, 2000), '');
      await page.screenshot({ path: path.join(qc0, 'daftar-studio-list.png'), fullPage: true }).catch(() => {}); }
    const qc = path.join(HERE, 'qc'); fs.mkdirSync(qc, { recursive: true });
    await page.screenshot({ path: path.join(qc, 'daftar-flipbook.png'), fullPage: true }).catch(() => {});
  } finally {
    const qc = path.join(HERE, 'qc'); fs.mkdirSync(qc, { recursive: true });
    fs.writeFileSync(path.join(qc, 'DAFTAR_ARTISTLY.md'), out.join('\n') + '\n'); log('daftar selesai');
    await ctx.close().catch(() => {});
  }
}

async function cmdInspect(url) {
  const ctx = await openBrowser();
  const page = ctx.pages()[0] || (await ctx.newPage());
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  console.log('Atur halaman sampai formulir yang ingin dicatat terlihat, lalu tekan Enter di Terminal ini.');
  await new Promise((r) => process.stdin.once('data', r));
  const dump = await page.evaluate(() => {
    const v = (e) => !!e.offsetParent;
    const near = (e) => { let p = e; for (let i = 0; i < 4 && p; i++) { p = p.parentElement; const l = p && p.querySelector('label,h3,h4'); if (l && l.innerText.trim()) return l.innerText.trim().slice(0, 60); } return ''; };
    return {
      url: location.href,
      fields: [...document.querySelectorAll('textarea,input:not([type=hidden]),select,[role=combobox]')].filter(v).map((e) => ({ tag: e.tagName, type: e.type || e.getAttribute('role'), placeholder: e.placeholder || '', label: near(e), value: (e.value || e.innerText || '').slice(0, 60) })),
      buttons: [...new Set([...document.querySelectorAll('button,[role=button],[role=tab],a')].filter(v).map((e) => (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 50)).filter(Boolean))],
      headings: [...new Set([...document.querySelectorAll('h1,h2,h3,h4,label')].filter(v).map((e) => e.innerText.trim().slice(0, 60)).filter(Boolean))],
    };
  });
  const f = path.join(HERE, 'qc', `inspect-${new URL(url).pathname.replace(/\W+/g, '-')}.json`);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, JSON.stringify(dump, null, 2));
  console.log(`Tersimpan: ${f}`);
  await ctx.close();
}

async function cmdLogin() {
  const ctx = await openBrowser();
  const page = ctx.pages()[0] || (await ctx.newPage());
  await page.goto('https://app.artistly.ai/dashboard');
  console.log('\nLogin Artistly di jendela yang terbuka. Setelah dashboard tampil, tekan Cmd+Q di jendela itu.\n');
  await new Promise((r) => { ctx.on('close', r); const chk = () => setTimeout(() => { if (!ctx.pages().length) ctx.close().catch(() => {}).then(r); }, 500); ctx.on('page', (p) => p.on('close', chk)); ctx.pages().forEach((p) => p.on('close', chk)); });
  console.log('Login Artistly tersimpan.');
}

function cmdList() {
  for (const f of fs.readdirSync(RECIPES).filter((x) => x.endsWith('.json')).sort()) {
    const r = JSON.parse(fs.readFileSync(path.join(RECIPES, f), 'utf8'));
    console.log(`${f.replace('.json', '').padEnd(22)} ${r.title || r.name}${r.status ? '  [' + r.status + ']' : ''}`);
    for (const v of r.vars || []) console.log(`${''.padEnd(24)}--var ${v.name}=${v.required ? '(wajib)' : v.default != null ? `(default ${v.default})` : '(opsional)'}${v.help ? '  ' + v.help : ''}`);
  }
}

export function parseVars(args) {
  const vars = {};
  for (let i = 0; i < args.length; i++) if (args[i] === '--var') { const [k, ...v] = args[++i].split('='); vars[k] = v.join('='); }
  return vars;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const [cmd, arg, ...rest] = process.argv.slice(2);
  try {
    if (cmd === 'login') await cmdLogin();
    else if (cmd === 'list') cmdList();
    else if (cmd === 'run') await runRecipe(arg, parseVars(rest));
    else if (cmd === 'inspect') await cmdInspect(arg);
    else if (cmd === 'pesanan') await cmdPesanan(arg);
    else if (cmd === 'peta') await cmdPeta();
    else if (cmd === 'peta-gambar') await cmdPetaGambar();
    else if (cmd === 'gambar-v6') await cmdGambarV6(arg);
    else if (cmd === 'peta-adegan') await cmdPetaAdegan(arg || path.join(HERE, '../../skills/jota-video/characters/acuan'));
    else if (cmd === 'peta-karakter') await cmdPetaKarakter(arg);
    else if (cmd === 'komik') await cmdKomik(arg);
    else if (cmd === 'daftar') await cmdDaftar();
    else if (cmd === 'storybook') await cmdStorybook(parseVars([arg, ...rest].filter((x) => x !== undefined)));
    else console.log('Perintah: login | list | run <resep> [--var k=v] | inspect <url> | pesanan [id] | peta | storybook --var ide=... --var nama=...');
  } catch (e) { console.error('GAGAL: ' + e.message); process.exit(1); }
}
