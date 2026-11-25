#!/usr/bin/env node
// CloneVoice (app.clonevoice.ai) untuk jalur PC: narasi/dialog (Create Audio) dan SFX (Design Sound), lewat browser
// Playwright dengan sesi yang owner login sendiri. Owner 2026-11-26: audio dan SFX JOTA pindah dari ElevenLabs ke CloneVoice.
// Dipanggil clonevoice.py (motion-kisah.py). Logika UI sama dengan modul Mac apps/videoexpress-runner/clonevoice-source.mjs
// (diuji live di Mac 2026-11-26), tanpa ketergantungan runner Mac.
//
// Pakai:
//   node clonevoice.mjs login                       buka browser terlihat; owner login sendiri (agen tidak mengetik sandi)
//   node clonevoice.mjs suara [Indonesian]          JSON suara Cloned + System untuk bahasa itu (hanya membaca)
//   node clonevoice.mjs tts <job.json>              job {nama, kategori, bahasa, teks, out}
//   node clonevoice.mjs sfx <job.json>              job {teks, out}
// Profil browser: CLONEVOICE_PROFILE, atau ARTISTLY_PROFILE, atau ./profile (sama dengan artistly.mjs).
// Profil tidak bisa dibuka dua proses sekaligus: jangan jalankan bersamaan dengan artistly.mjs.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ORIGIN = 'https://app.clonevoice.ai';
const PROFILE = process.env.CLONEVOICE_PROFILE || process.env.ARTISTLY_PROFILE || path.join(HERE, 'profile');
const CHANNEL = process.env.JOTA_CHANNEL ?? 'chrome';
const FFMPEG = process.env.JOTA_FFMPEG || 'ffmpeg';
const TUNGGU = +(process.env.CLONEVOICE_TUNGGU_DETIK || 300) * 1000;
const log = (s) => console.error(`[clonevoice] ${s}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const persis = (v) => new RegExp('^' + v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i');

async function buka(terlihat = false) {
  const { chromium } = await import('playwright');
  const opts = { headless: !terlihat && process.env.CLONEVOICE_HEADLESS !== '0', viewport: { width: 1500, height: 1000 }, acceptDownloads: true };
  let ctx;
  try { ctx = await chromium.launchPersistentContext(PROFILE, CHANNEL ? { ...opts, channel: CHANNEL } : opts); }
  catch (e) { if (!CHANNEL) throw e; ctx = await chromium.launchPersistentContext(PROFILE, opts); }
  const page = await ctx.newPage();
  page.setDefaultTimeout(15000);
  return { ctx, page };
}

async function kunjungi(page, rute) {
  await page.goto(ORIGIN + rute, { waitUntil: 'domcontentloaded', timeout: 45000 });
  const u = new URL(page.url());
  if (u.origin !== ORIGIN || u.pathname === '/login') throw Error('CLONEVOICE_SESSION_REQUIRED: jalankan "node clonevoice.mjs login", owner login sendiri');
  await page.locator('main').waitFor();
}

async function statusAset(page, judul) {
  await kunjungi(page, '/audio');
  const item = page.getByText(judul, { exact: true });
  await item.first().waitFor({ timeout: 4000 }).catch((e) => { if (e.name !== 'TimeoutError') throw e; });
  const n = await item.count();
  if (n > 1) throw Error('CLONEVOICE_DUPLICATE_ASSET: ' + judul);
  if (!n) return null;
  return item.evaluate((el) => {
    for (let x = el; x && x.tagName !== 'MAIN'; x = x.parentElement) {
      const l = x.innerText.split('\n').map((s) => s.trim()).filter(Boolean); const i = l.indexOf('Status');
      if (i >= 0) return l[i + 1] || 'Unknown';
    }
    return 'Unknown';
  });
}

async function unduh(page, judul, out) {
  const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 45000 }), page.getByRole('button', { name: 'Download ' + judul, exact: true }).click()]);
  const tmp = out + '.partial';
  try {
    await dl.saveAs(tmp);
    execFileSync(FFMPEG, ['-v', 'error', '-xerror', '-i', tmp, '-map', '0:a:0', '-f', 'null', '-'], { stdio: 'ignore', timeout: 60000 });
    fs.renameSync(tmp, out);
  } finally { fs.rmSync(tmp, { force: true }); }
}

async function kirimTts(page, judul, j) {
  await kunjungi(page, '/audio/create');
  const main = page.locator('main');
  const bahasa = async (i, nama) => { await main.getByRole('combobox').nth(i).click(); await page.getByRole('option', { name: persis(nama) }).first().click(); };
  // Bahasa referensi dipilih dulu: daftar suara System mengikuti bahasa ini (Indonesian: 33 suara, 2026-11-26).
  if (j.bahasa !== 'English') await bahasa(0, j.bahasa);
  await main.getByRole('button', { name: 'Select Voice', exact: true }).click();
  const cari = page.getByPlaceholder('Search voices...');
  const panel = page.locator('[role=dialog]').filter({ has: cari });
  await panel.locator('select').filter({ has: page.locator('option').filter({ hasText: /^Cloned$/ }) }).selectOption({ label: j.kategori });
  await cari.fill(j.nama);
  await panel.getByRole('button', { name: persis('Select voice ' + j.nama) }).click();
  await cari.waitFor({ state: 'hidden' });
  // Designed/Public Library hanya bisa bahasa Inggris (tulisan di halaman); target dikunci, jangan dipaksa.
  if (j.bahasa !== 'Indonesian' && !['Designed', 'Public Library'].includes(j.kategori)) await bahasa(1, 'Indonesian');
  await main.getByPlaceholder('Audio Name', { exact: true }).fill(judul);
  await main.getByPlaceholder('Enter your script...', { exact: true }).fill(j.teks);
  if (!(await main.getByRole('checkbox', { name: 'Agree to terms of service' }).isChecked())) throw Error('CLONEVOICE_TERMS_REQUIRED: owner centang terms of service di akun');
  await main.getByRole('button', { name: 'Create New Audio', exact: true }).click();
  const gen = page.getByRole('button', { name: 'Generate Audio', exact: true });
  await gen.waitFor();
  return gen;
}

async function kirimSfx(page, judul, j) {
  await kunjungi(page, '/design-sound/create');
  const main = page.locator('main');
  await main.getByRole('button', { name: 'Non Instrumental', exact: true }).click();
  await main.getByPlaceholder('Example: Epic Battle Music', { exact: true }).fill(judul);
  await main.getByPlaceholder(/^Example: Epic orchestral battle music/).fill(j.teks);
  const gen = main.getByRole('button', { name: 'Generate Sound', exact: true });
  await gen.waitFor();
  return gen;
}

async function buat(jenis, j) {
  if (!j.teks || !String(j.teks).trim()) throw Error('CLONEVOICE_SCRIPT_EMPTY');
  if (jenis === 'tts' && (!j.nama || !j.kategori || !j.bahasa)) throw Error('CLONEVOICE_VOICE_MISSING: job tts butuh nama, kategori, bahasa');
  const kunci = crypto.createHash('sha256').update(JSON.stringify([jenis, j.nama || '', j.kategori || '', j.bahasa || '', j.teks])).digest('hex');
  const judul = 'JOTA ' + kunci.slice(0, 28);
  const struk = j.out + '.submitted';
  const { ctx, page } = await buka();
  try {
    let st = await statusAset(page, judul);
    if (!st && !fs.existsSync(struk)) {
      const gen = jenis === 'tts' ? await kirimTts(page, judul, j) : await kirimSfx(page, judul, j);
      fs.writeFileSync(struk, judul + '\n', { flag: 'wx' }); // tanda sebelum klik: jangan kirim ganda bila proses putus
      await gen.click();
      await page.waitForURL((u) => u.pathname === '/audio', { timeout: 20000 }).catch((e) => { if (e.name !== 'TimeoutError') throw e; });
      log(`${jenis} terkirim: ${judul}`);
    }
    const batas = Date.now() + TUNGGU;
    while (st !== 'Completed' && Date.now() < batas) {
      if (/failed|error|cancel/i.test(st || '')) throw Error(`CLONEVOICE_RENDER_FAILED: ${judul} (${st})`);
      await sleep(6000); st = await statusAset(page, judul);
    }
    if (st !== 'Completed') throw Error(`CLONEVOICE_PENDING: ${judul} (${st || 'belum tampak'}); cek My Audios sebelum mengulang`);
    await unduh(page, judul, j.out);
    log(`${jenis} selesai: ${j.out}`);
  } finally { await ctx.close(); }
}

async function suara(bahasa = 'Indonesian') {
  const { ctx, page } = await buka();
  try {
    await kunjungi(page, '/audio/create');
    const main = page.locator('main');
    if (bahasa !== 'English') { await main.getByRole('combobox').nth(0).click(); await page.getByRole('option', { name: persis(bahasa) }).first().click(); }
    await main.getByRole('button', { name: 'Select Voice', exact: true }).click();
    const panel = page.locator('[role=dialog]').last(); const sel = panel.locator('select').first();
    const hasil = [];
    for (const kat of ['System', 'Cloned']) {
      await sel.selectOption({ label: kat }); await sleep(3000);
      for (const n of await panel.getByRole('button', { name: /^Select voice /i }).evaluateAll((b) => b.map((x) => x.getAttribute('aria-label').replace(/^Select voice /i, ''))))
        hasil.push({ nama: n, kategori: kat, bahasa });
    }
    return hasil;
  } finally { await ctx.close(); }
}

async function login() {
  const { ctx, page } = await buka(true);
  try {
    await page.goto(ORIGIN + '/audio', { waitUntil: 'domcontentloaded' });
    log('Silakan login sendiri di jendela browser (maks 10 menit).');
    const batas = Date.now() + 600000;
    while (Date.now() < batas) { const u = new URL(page.url()); if (u.origin === ORIGIN && u.pathname !== '/login') { log('Sesi aktif.'); return; } await sleep(3000); }
    throw Error('CLONEVOICE_SESSION_REQUIRED: login belum selesai');
  } finally { await ctx.close(); }
}

const [cmd, arg] = process.argv.slice(2);
try {
  if (cmd === 'login') await login();
  else if (cmd === 'suara') console.log(JSON.stringify(await suara(arg || 'Indonesian'), null, 1));
  else if (cmd === 'tts' || cmd === 'sfx') await buat(cmd, JSON.parse(fs.readFileSync(arg, 'utf8')));
  else { console.error('pakai: node clonevoice.mjs login | suara [bahasa] | tts <job.json> | sfx <job.json>'); process.exit(2); }
} catch (e) { console.error(e.message.split('\n')[0]); process.exit(1); }
