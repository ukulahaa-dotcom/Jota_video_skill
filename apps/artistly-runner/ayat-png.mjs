// Render teks ayat Arab berharakat ke PNG transparan lewat Chromium (owner 2026-11-19: "huruf arab nya yang bagus ya bro").
// Pillow di venv tanpa raqm tidak bisa menyambung huruf Arab, jadi shaping dilakukan browser.
// Font bawaan: Amiri Quran (SIL OFL, assets/fonts/amiri-quran), tulisan Utsmani seperti mushaf.
// pakai: node ayat-png.mjs <keluaran.png> "<teks arab>" [file-font.ttf] [lebar]
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('../videoexpress-runner/package.json', import.meta.url));
const { chromium } = require('playwright');
const FONT = fileURLToPath(new URL('../../assets/fonts/amiri-quran/AmiriQuran-Regular.ttf', import.meta.url));
const [out, teks, font = FONT, lebar = '980'] = process.argv.slice(2);
if (!out || !teks) throw new Error('pakai: node ayat-png.mjs <keluaran.png> "<teks arab>" [file-font.ttf] [lebar]');
const b64 = fs.readFileSync(font).toString('base64');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Ayat';src:url(data:font/ttf;base64,${b64}) format('truetype')}
html,body{margin:0;background:transparent}
#a{display:inline-block;width:${lebar}px;padding:56px 48px 70px;box-sizing:border-box;direction:rtl;text-align:center;
font-family:'Ayat',serif;font-size:92px;line-height:2.15;color:#f3d98b;
background:linear-gradient(180deg,rgba(10,6,2,.0),rgba(10,6,2,.62) 18%,rgba(10,6,2,.62) 82%,rgba(10,6,2,.0));
border-top:2px solid rgba(243,217,139,.55);border-bottom:2px solid rgba(243,217,139,.55);
text-shadow:0 2px 8px rgba(0,0,0,.9)}
</style></head><body><div id="a">${teks}</div></body></html>`;
const browser = await chromium.launch({ channel: process.env.JOTA_CHANNEL ?? 'chrome' }).catch(() => chromium.launch());
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.locator('#a').screenshot({ path: out, omitBackground: true });
await browser.close();
console.log('ayat', out);
