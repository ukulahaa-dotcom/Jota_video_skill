# JOTA Professional Storyboard — Google Sheets & Two-Reference Visual Gate

**Decision date:** 2026-11-05. **Workflow spec version:** 1.0 (skill v3.97.0). This is the **desired production protocol**, not a claim that the existing Runner already implements Sheets read/write, two-reference assignment, image scoring or automatic approval.

**Native storyboard template (Google Sheets account JOTA Automation):**
https://docs.google.com/spreadsheets/d/18sDM9tPsWxQ2IUKAbiRGcbjvVQRE3Gr7nysw9pgQzP0/edit

Template has a **DEMO only** (four example shots, no real generated reference images), with **14 tabs** as of v3.98 (four additional sheets for sound design, voice identity, hadith and Remotion): `MULAI_DI_SINI`, `EPISODE`, `CAST_MASTER`, `SET_LAYOUT`, `OBJECT_REGISTRY`, `SCENARIO`, `STORYBOARD`, `IMAGE_QC`, `TEXT_ANIMATION`, `RUNNER_MANIFEST`, `VOICE_MASTER`, `AUDIO_CUES`, `HADITH_SOURCES`, `REMOTION_PRESETS`. Additional rules: [`SOUND_REMOTION_HADITH.md`](SOUND_REMOTION_HADITH.md). For each actual episode, copy this template into a **new** production sheet; leave the master unchanged. Do not overwrite real images or source values with sample links.

## Why this protocol exists

Observed owner failures: across shots, garment colors drift, backpack moves from back to front, room furniture changes location, characters gain faces; sometimes an image generator returns **two candidates but neither or only one** matches the refs. Runner cannot reliably infer compliance without visual reasoning. A poorly specified storyboard causes phantom paper, phones that float/morph/duplicate, unclear/aimless gestures and broken physical cause/effect. The remedy is **a scene bible plus an approved starting image for each new view, followed by LLM visual inspection and owner sign-off before moving-image generation**.

## Nonnegotiable 2-reference rule for new views with people

For every `NEW_VIEW` / `KEYFRAME` / fresh camera angle that must generate a starting image with a person:
- **Ref1 — CAST_OUTFIT_MASTER**: the **same faceless character** with the **exact outfit, colors, trousers, shoes, bag, accessories, placement, size and number** for that part of the story. Example: brown backpack **ON THE BACK** with TWO shoulder straps, never repositioned in front. A change of clothing is a deliberate narrative event and requires a new approved outfit master.
- **Ref2 — SET_LAYOUT_MASTER**: the **approved room/location image** including spatial map: position of door/window/table/chairs, relative sides, object inventory, lighting direction, landmarks and permissible camera angles. Changing viewpoint does **not** justify rearranging room geometry.
- **Image Prompt** explicitly identifies which traits come from each reference. The generation request must actually attach both references in the generator UI, not merely mention them as words. Record **actual asset IDs, project, folder and the two selected reference IDs**, not placeholder strings.
- For `LAST_FRAME` continuity from the same time/place/character, prefer the last **approved/actually delivered** clip frame. Maintain the shot source and its real frame asset ID; never guess the source. The end of a source clip must retain enough torso/head/outfit to establish identity. For major angle changes or a close-up that breaks identity, cut to a fresh `NEW_VIEW` with the pair of refs.
- If more than one photographed character is required and the UI exposes only two reference-photo slots, **do not silently sacrifice Ref2**. Plan a **single approved composite CAST+OUTFIT group reference** for Ref1 (if it is visually reliable), leaving Ref2 for the layout, or split into shots. Record any exception for owner review.

Both references must be **owner-approved** before generating a NEW_VIEW in production. If no approved room master exists, generate the room keyframe first, visually inspect it and seek approval; do not fabricate layout.

## Faceless, outfit and layout at the start of every Video Prompt NATURAL

**Superseded for prompt wording by owner 2026-11-05 16:40 (v3.99.7, `METODE_PROMPT.md` top):** NATURAL follows the owner's smooth-clip pattern (camera, ordered action with speech, one faceless sentence, one positive appearance sentence) with no prohibitions. The locks below remain the *content* that must be true, stated positively and briefly, not a long opening block. Former rule: the first **natural-language sentences** of the VideoExpress **Video and Audio Prompt** must explicitly lock:
1. "Every visible character remains completely faceless throughout the entire video, from the first frame to the last frame and every camera angle, exactly as in the approved starting image."
2. "Keep the exact character identity, hairstyle, outfit color/pieces, shoes, accessories and backpack placement from Ref1 / the selected starting image throughout the video."
3. "Preserve the positions and spatial relationships of the door, window, furniture, props, and lighting as in Ref2 / the approved scene layout throughout the video."

Then **flow naturally** into the shot: precise camera position and motion, starting pose, every cause → hand/foot/body motion → actual contact → object movement and physics → consequence → end state, plus synced foley/ambience and lighting. **Do not use point headings or timestamps inside the submitted NATURAL Video Prompt**. Narrative paragraphs may be long and detailed. Use the full PRO template **only** when `metode PRO` was selected. Never put contradicting instructions in the same video prompt.

Image Prompt for a new view is equally specific and may be more technical; it **must explicitly describe the totally smooth featureless faceless design without eyes/nose/mouth**, outfit lock, backpack placement and room geometry. When no actor is visible, do not place an actor reference or mention one needlessly.

## Professional storyboard: one source of truth

### Content before image generation

1. **SCENARIO**: film treatment and screenplay, narrative goal, hook, sequence, actions, purpose, dialog/narrator exact words, actors and extras, sound design, references/sources for claims, and character arc. Every shot supports the plot.
2. **CAST_MASTER**: one canonical faceless image for each character and deliberate outfit variant; identity, body scale, hair, garment color and cut, accessories, bag **on which side**, voice ID if relevant, approved asset link.
3. **SET_LAYOUT**: one or more room masters per location with topological descriptions; camera-facing directions, landmarks, lighting source/direction, props and geometry, approved asset link. Each new view uses **Ref2**.
4. **OBJECT_REGISTRY**: unique object ID, starting quantity/position, size/color/orientation, owner/hand (left vs right), contact/force, visible trajectory and landing/ending location. Each object must keep identity, count and mass; no phantom paper/phone.
5. **STORYBOARD**: shot ID, scene and order, duration (3–10 s according to action), method `NEW_VIEW` | `LAST_FRAME` | `FIRST_LAST` | `BROLL`, `LAST_FRAME_FROM`, camera start/move/end, initial actor pose and state, detailed cause→contact→effect action, end pose and prop state, Ref1/Ref2 IDs, **full final Image Prompt**, **full final NATURAL or PRO Video Prompt** (already converted for VideoExpress), two candidate image links, LLM selection, owner approval, dependency and gate, output clip link, text-animation ID.
6. **TEXT_ANIMATION / REMOTION_PRESETS**: overlay text, storyboard shot ID, approved Remotion composition/preset, safe-area, onset/end times and frames, fonts/size/color, voice/SFX synchronization, export overlay asset and Hadith ID when relevant. **Remotion produces text overlays only**; not replacement character-motion videos. Arabic Hadith text is proper RTL and verified.
6a. **Dialog tepat waktu (owner 2026-11-05):** setiap baris dialog di `SCENARIO`/`STORYBOARD` dan cue `DIALOGUE` di `AUDIO_CUES` menyebut aksi pemicunya, dan onset dialog ada **sesudah** aksi itu selesai (salam sesudah tiba dan mengetuk pintu, bukan saat masih berjalan). Sama seperti bunyi ketukan yang terdengar tepat saat kepalan menyentuh pintu.
7. **VOICE_MASTER / AUDIO_CUES**: real ElevenLabs voice IDs and settings per character, plus **one row per voice/ambience/Foley/SFX event** with prompt, trigger, timing, material and physical contact, asset ID, approval and NO MUSIC. SFX assets may be reused across shots; no random sound. See `SOUND_REMOTION_HADITH.md`.
8. **HADITH_SOURCES**: verbatim Arabic, verified Indonesian translation, collection/number/grade if sourced, URL, verifier/owner approval. Do not generate or display unverified hadith. No Hadith in shot = ID `NONE`.
9. **RUNNER_MANIFEST**: exact ordered, machine-readable shot ID, generation method, dependency, selected approved image ID or last-frame ID, exact final video prompt, duration, settings, sound cue IDs, voice IDs, Remotion overlay IDs, Hadith IDs and independent production approval gates. `RUNNER_MANIFEST` is a **proposed adapter**; current Runner still consumes repository `shots.json` and must not be described as already ingesting Sheets.


### Image generation and model-assisted selection

For each `NEW_VIEW`:
1. Runner image phase generates and saves **two actual image candidates**, A and B, with Ref1 and Ref2 selected; records Image Prompt, settings, source IDs, candidate asset IDs, accessible Drive/Media Library links and timestamp. The existing 2-image carousel is **not** proof that either candidate is correct.
2. A multimodal Claude or ChatGPT agent reads the real image bytes **and** both master refs (not just a URL or uninspected thumbnail) and compares each against the storyboard, including: every human fully faceless; identity and body scale; outfit/garment color; backpack on correct side; consistency of room topology; action start pose; prop ID/count/color/orientation; no duplicate character; image style and light. Result for each criterion: `PASS`, `FAIL`, with evidence and correction prompt.
3. Choose exactly **one** candidate only if **every required criterion passes**, record `SELECT`, `selected_asset_id`, image link and `LLM_APPROVED`. If neither passes, `REGEN`; modify **Image Prompt only where needed** (and maybe better master if owner approves), retain both reference images, generate again. Never silently choose the first image.
4. Owner sees final image, QC results and storyboard. `OWNER_APPROVED` is separate from `LLM_APPROVED`; a model verdict alone is **not** dispatch permission.
5. If the agent cannot access the images, mark `LLM_NOT_VERIFIED` / `BLOCKED`; never claim inspection. If Google Drive links are private, store accessible file IDs and use an authenticated connector or local materialization. Sheet `IMAGE()` preview is optional, not evidence of inspection.

### Production gates

**NEW_VIEW is READY only if**: current approved Ref1 and Ref2 exist and their asset IDs are resolved; candidate is visually inspected with every criterion PASS; selected image ID is nonblank and linked; Video Prompt matches scene + references; owner approves. **LAST_FRAME is READY only if**: source shot has an actual finished clip and saved last-frame asset, the current shot begins with the same physical state, owner approves; do not dispatch because source storyboard was merely approved. **TEXT_ANIMATION** is ready when timings, source and styling are approved. All missing/inconsistent fields yield `BLOCKED`, with actionable reason. Rules must be enforced **server-side / in Runner**, not merely by a spreadsheet text cell or formula.

Do not mistake the current Google Sheet `VIDEO GATE` formula for Runner integration. It is an **illustrative human-review gate** only. The actual Runner must refuse rendering without an explicit, verifiable machine-readable approval manifest and asset IDs. Any edits after approval invalidate dependent approved prompts/images until re-reviewed. Record approval timestamp, version and associated content hash in future schema.

### Safe Runner sequencing after approval

`SCRIPT_LOCKED` → `MASTERS_APPROVED` → `STORYBOARD_LOCKED` → `CANDIDATES_SAVED` → `LLM_IMAGE_APPROVED` → `OWNER_APPROVED` → `VIDEO_GENERATION` (sequential for LAST_FRAME dependencies; independent NEW_VIEW jobs may parallelize) → `ASSEMBLY` → `TEXT_ANIMATION + SUBTITLES + AUDIO` → `EXPORT / DRIVE` → `OWNER_FINAL_QC`. A Runner cannot **only** assemble videos immediately after still-image approval; it still has to **render the moving video clips first**.

The owner hopes this will make approximately 90% of videos usable, but **90% success is a target hypothesis, not a measured outcome**. Capture quality metrics (faceless defects, outfit drift, prop errors, layout drift, re-render rate, owner acceptance) across pilot episodes before claiming actual performance.

## Implementation status at creation

- **DONE:** native Google Sheet template with **14 tabs** including VOICE_MASTER, AUDIO_CUES, HADITH_SOURCES, REMOTION_PRESETS; demo Foley cues, Remotion text fields and unverified (blank) hadith placeholder, image review columns and planning gate formulas; skill documentation. **No real hadith has been provided or approved**.
- **IMPLEMENTED in repo (v3.99, tested without browser):** room layout as Reference Photo 2 for single-character NEW_VIEW (`ref_ruang`), candidate A/B record `awal/qc.json`, code-enforced approval gate (`gate.mjs`: chosen candidate, all criteria PASS/NA, owner APPROVED, sha256 match) behind `"gate": "gambar"`. Visual inspection is performed by Claude/ChatGPT in chat opening the real PNGs; there is no unattended LLM API callback (owner decision pending on cost).
- **NOT YET IMPLEMENTED:** automatic LLM review callback; Runner reading Sheets; ElevenLabs cue-by-cue generation and mixing; stable voice selection via Sheet; Remotion React composition/render and import into editor; Hadith source verification integration; end-to-end pilot. Spec: `SOUND_REMOTION_HADITH.md`.
- **Do not generate or publish** merely because this spec is added. New actual episode requires an owner brief and production authorization per `SKILL.md`. No tokens/credits or success rates may be invented.
