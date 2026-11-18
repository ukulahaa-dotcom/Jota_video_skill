// Unduh klip VideoExpress berdasarkan label (mis. QRNVX-SHOT01) dari library My AI Videos, hanya membaca.
// Profil dan kunci 'videoexpress' sama dengan worker. pakai: node unduh-vx.mjs <folder_tujuan> <LABEL1> [LABEL2 ...]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const ROOT = 'E:/JOTA-Standby';
const VX = path.join(ROOT, 'Jota_Content_Factory/apps/videoexpress-runner');
const { lock } = await import(pathToFileURL(path.join(ROOT, 'Jota_runner/local/runtime.mjs')).href);
const { chromium } = await import(pathToFileURL(path.join(VX, 'node_modules/playwright/index.mjs')).href);
// --tunggu [MENIT]: terus memeriksa library tiap 60 detik dan mengunduh tiap klip begitu selesai (default 60 menit).
// --qc: jalankan qc-klip.mjs --pantau di latar (sekali per folder) sehingga tiap klip yang tiba langsung dicek, FIFO.
const argv = process.argv.slice(2);
const tunggu = argv.includes('--tunggu');
const iT = argv.indexOf('--tunggu'), batasMenit = Number(argv[iT + 1]) > 0 ? Number(argv[iT + 1]) : 60;
const [out, ...labels] = argv.filter((a, i) => !a.startsWith('--') && !(i === iT + 1 && Number(a) > 0));
if (!out || !labels.length) throw new Error('pakai: node unduh-vx.mjs <folder> <LABEL...> [--tunggu [MENIT]] [--qc]');
fs.mkdirSync(out, { recursive: true });
if (argv.includes('--qc')) {
  const pid = path.join(out, 'qc-klip', '.pantau.pid');
  let jalan = false;
  if (fs.existsSync(pid)) { try { process.kill(Number(fs.readFileSync(pid, 'utf8')), 0); jalan = true; } catch {} }
  if (!jalan) {
    const { spawn } = await import('node:child_process');
    const c = spawn(process.execPath, [path.join(ROOT, 'Jota_Content_Factory/apps/artistly-runner/qc-klip.mjs'), out, '--pantau'], { detached: true, stdio: 'ignore', windowsHide: true });
    c.unref(); console.log(`QC FIFO berjalan di latar (pid ${c.pid}), log: ${path.join(out, 'qc-klip', 'qc.log')}`);
  } else console.log('QC FIFO sudah berjalan untuk folder ini');
}
const release = lock('videoexpress');
let ctx;
try {
  ctx = await chromium.launchPersistentContext(path.join(VX, 'profile'), { headless: false, viewport: null, channel: 'chrome' });
  const page = ctx.pages()[0] || (await ctx.newPage());
  await page.goto('https://app.videoexpress.ai/', { waitUntil: 'domcontentloaded' });
  const masuk = await page.getByText('Create with AI').first().waitFor({ state: 'visible', timeout: 60000 }).then(() => true).catch(() => false);
  console.log('URL', page.url(), masuk ? 'login OK' : 'BELUM LOGIN');
  if (!masuk) throw new Error('VideoExpress belum login (sesi habis?)');
  const ambil = () => page.evaluate(async () => {
    const cats = (await fetch('/library/get_categories/4').then((r) => r.json())).data || [];
    const cat = cats.find((c) => /^my ai videos$/i.test(c.title || '')) || cats.find((c) => /ai video/i.test(c.title || ''));
    if (!cat) return { err: 'kategori My AI Videos tidak ada' };
    const L = await fetch(`/api/library/get_media/4?categoryId=${cat.id}&page=1&start=0&limit=60&query=&orderBy=id&orderDir=desc&filter=`).then((r) => r.json());
    const res = [];
    for (const m of L.results || []) {
      let vp = '';
      if (!String(m.name || '').match(/^[A-Z0-9]+-SHOT\d\d/)) { const d = await fetch(`/ai/api/get_media_prompt_data/${m.id}`).then((r) => r.json()).catch(() => null); vp = d && d.data ? String(d.data.videoPrompt || d.data.prompt || '').slice(0, 40) : ''; }
      res.push({ id: m.id, name: m.name, status: m.status, type: m.type, url: m.mediaPath, vp });
    }
    return { res };
  });
  const sisa = new Set(labels), mulai = Date.now();
  for (let putaran = 0; sisa.size; putaran++) {
  if (putaran) { if (!tunggu || Date.now() - mulai > batasMenit * 60000) break; await page.waitForTimeout(60000); }
  // 2026-11-18: API library sesekali membalas kosong ("Unexpected end of JSON input"); saat --tunggu, coba lagi putaran berikutnya.
  let rows;
  try { rows = await ambil(); } catch (e) { if (!tunggu) throw e; console.log(`library gagal dibaca (${String(e.message).split('\n')[0].slice(0, 80)}), coba lagi`); continue; }
  if (rows.err) throw new Error(rows.err);
  for (const lab of [...sisa]) {
    const m = rows.res.find((x) => x.type === 'video' && (String(x.name || '').startsWith(lab) || x.vp.startsWith(lab + ':')));
    const diam = putaran && tunggu; // saat menunggu, status "belum siap" tidak dicetak ulang tiap menit
    if (!m) { if (!diam) console.log(`${lab}: belum ada di library`); continue; }
    // 2026-11-18: status completed tetapi mediaPath masih kosong beberapa menit (Dzulqarnain SHOT01-R2) -> belum siap.
    if (m.status !== 'completed' || !m.url) { if (!diam) console.log(`${lab}: status ${m.status}${m.url ? '' : ' (file belum siap)'}`); continue; }
    const f = path.join(out, `${lab}.mp4`);
    if (fs.existsSync(f) && fs.statSync(f).size > 100000) { console.log(`${lab}: sudah ada, dilewati`); sisa.delete(lab); continue; }
    // 2026-11-16: unduhan CDN kadang putus (Qabil-Habil SHOT03); coba ulang sampai 4 kali.
    let ok = false;
    for (let c = 1; c <= 4 && !ok; c++) {
      try { const r = await ctx.request.get(m.url, { timeout: 300000 }); if (!r.ok()) throw new Error('HTTP ' + r.status()); fs.writeFileSync(f, await r.body()); ok = true; }
      catch (e) { console.log(`${lab}: percobaan ${c} gagal (${String(e.message).split('\n')[0].slice(0, 80)})`); await page.waitForTimeout(5000 * c); }
    }
    if (ok) { console.log(`${lab}: id ${m.id} -> ${f} (${fs.statSync(f).size} byte)`); sisa.delete(lab); } else console.log(`${lab}: GAGAL diunduh`);
  }
  }
  if (sisa.size) console.log(`belum terunduh: ${[...sisa].join(' ')}`);
} finally { await ctx?.close().catch(() => {}); release(); }
