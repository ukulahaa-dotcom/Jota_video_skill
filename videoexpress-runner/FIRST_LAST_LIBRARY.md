# First Frame, Last Frame dari LIBRARY (photo 1 -> photo 2), 2026-11-22

Ide owner: "photo 1 as first frame dan photo 2 as last frame". Kedua frame diambil dari library VideoExpress (gambar yang sudah lolos QC wajah dan cek mata), bukan dibuat di dialog. Dialog memakai Reference Photo Type Human dan menghasilkan wajah realistis.

## Hasil uji
- `PC01U6-SHOT01` (7 detik): kamera bergerak dari full shot ke close-up, wajah tetap polos dengan kulit natural. QC wajah LULUS (0 kepala berfitur).
- Pembanding: Create Video biasa dengan tokoh yang berjalan mendekat kamera memunculkan bibir, rongga mata, dan titik merah di dahi (DITOLAK).
- **Aturan**: setiap shot yang membawa wajah mendekat ke kamera = First/Last dari library.

## Format shot (shots.json)
```json
{ "id": "SHOT01", "tool": "first_last", "people": "yes", "length": 5, "format": "natural",
  "start": { "type": "PAKAI_ULANG", "image": "<PHOTO1>", "folder": "My Artistly Images" },
  "first_image": "<PHOTO1>", "last_image": "<PHOTO2>", "frame_folder": "My Artistly Images",
  "video_prompt": "SHOT01: ... TRANSITION: one continuous natural movement from the first frame to the last frame with smooth easing; nothing else changes. ... nobody else enters the frame." }
```
- `start` diisi Photo 1 supaya gerbang QC gambar `jalankan-vx run` memeriksanya. Photo 2 dicek manual sebelum dipakai.
- ID job tidak terbaca di mode ini, tapi klip tetap jadi. Unduh dengan `unduh-vx.mjs <dir> <TAG>-SHOT01 --tunggu 30`.

## Kode di apps/videoexpress-runner/runner.mjs (createFirstLastVideo, di awal fungsi setelah setRatio)
```js
  // Owner 2026-11-22: "photo 1 as first frame dan photo 2 as last frame" -> kedua frame diambil dari library (gambar yang
  // sudah lolos QC wajah + cek mata), bukan dibuat di dialog (uji SHOT11: dialog membuat wajah lengkap, tipe Human).
  if (shot.first_image && shot.last_image) {
    const folder = shot.frame_folder || 'My AI Images';
    await pickRefFromLibrary(page, 'First Frame from Library \\(beta\\)', folder, shot.first_image);
    log(`  first frame dari library: ${shot.first_image}`);
    await pickRefFromLibrary(page, 'Last Frame from Library \\(beta\\)', folder, shot.last_image);
    log(`  last frame dari library: ${shot.last_image}`);
    await page.screenshot({ path: path.join(HERE, `firstlast-${shot.id}.png`) }).catch(() => {});
    await setModalText(page, 2, labeledPrompt(shot, label));
    const jb0 = await page.evaluate(() => window.__jr.jobId());
    await page.locator('.bbm-modal--open button:visible').filter({ hasText: /^\s*Create Video\s*$/ }).first().click();
    let job0 = '';
    for (let i = 0; i < 20; i++) { await sleep(1000); job0 = await page.evaluate(() => window.__jr.jobId()); if (job0 && job0 !== jb0) break; }
    if (!job0 || job0 === jb0) { log('  ID job tidak terbaca (first_last library)'); await page.screenshot({ path: path.join(HERE, `gagal-${shot.id}-fll.png`) }).catch(() => {}); job0 = 'tidak-terbaca'; }
    await page.keyboard.press('Escape').catch(() => {});
    await page.evaluate(() => window.__jr.closeAll()).catch(() => {});
    return { job: job0, audio: null };
  }
```

## Validasi plan (checkNatural)
```js
if (s.tool === 'first_last' && !(s.first_image && s.last_image) && !String(s.last_frame_prompt || '').startsWith('MANDATORY RULES:')) errors.push(`${tag}: first_last butuh last_frame_prompt berformat MANDATORY RULES (atau first_image + last_image dari library)`);
if (s.tool === 'first_last' && !!s.first_image !== !!s.last_image) errors.push(`${tag}: first_last library wajib first_image DAN last_image`);
```

## Peta 2026-11-22: multi-shot kamera
- Peta read-only (`jalankan-vx.mjs uji-peta`, 0 klik Create): **tidak ada alat multi-shot kamera** di akun. Create with AI berisi: Create Video From Prompt, Text To Video, First Frame/Last Frame, Smart Edit, Stylize Character, Image To Video (Old), Lipsync (Old), Outpainting, AI Sound Maker, Inpainting. Advanced Mode tidak punya pengaturan kamera.
- **Multi-shot JOTA = rangkaian shot**: LAST_FRAME (`sambung: true`) untuk aksi bersambung, First/Last dari library (FIRST_LAST_LIBRARY.md) untuk ganti ukuran atau sudut, dan cut biasa untuk pindah adegan.
- Dialog First/Last punya pilihan `Reference Photo Type: 3D` (runner: `ref_type: "3D"`). Pakai bila suatu saat mode dialog dipakai lagi; uji 2026-11-22 dengan tipe Human menghasilkan wajah realistis.
