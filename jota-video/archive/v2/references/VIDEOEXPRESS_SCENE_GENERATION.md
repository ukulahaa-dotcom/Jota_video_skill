# JOTA Artistly still → VideoExpress scene-generation contract — v2.2 (P1/P2 + continuous First/Last, 2026-10-24)

**Creative-mode gate:** Before any new film, require an explicit owner choice of `JOTA_1` or `JOTA_2` ([`CREATIVE_MODES.md`](CREATIVE_MODES.md)); do not infer one or generate with `MODE_SELECTION_PENDING`. Older blank-face/no-music examples are **JOTA_1 examples only**. In `JOTA_2`, expressive full faces, requested supported lip-sync and rights-cleared music are permitted; never apply JOTA_1 facial/music rejection to JOTA_2. Universal provenance/privacy/copyright/technical QA remains.

**Scope:** a reusable, original JOTA prompt-and-review workflow. This is a **skill specification**, not a VideoExpress agent, installed plugin, background automation or permission to render. Inherit `../SKILL.md`, `VIDEOEXPRESS_PROVIDER_LOCK.md`, mode-specific `FACELESS_CHARACTER.md` for JOTA_1, `WORKFLOW.md` and the selected playbook. **Artistly is the owner-approved still-image generator; VideoExpress alone** creates JOTA moving video clips and final video exports; no fallback video renderer. Import approved Artistly stills via the visible VideoExpress integration and consult [`ARTISTLY_VIDEOEXPRESS_WORKFLOW.md`](ARTISTLY_VIDEOEXPRESS_WORKFLOW.md). User approval to change this skill is **not** approval to create media.

## Extended scene duration — owner priority 2026-10-24
Before any P1/P2 video shot, read [`CONTINUOUS_SHOT_FIRST_LAST.md`](CONTINUOUS_SHOT_FIRST_LAST.md) whenever planning a native segment near 10 seconds or an apparent continuous take beyond 10 seconds. The official VideoExpress All-Access page advertises 10-second clips and First Frame/Last Frame, but that is **not a guarantee each UI mode returns 10.0s** (observed JOTA2 Lipsync HD request 6s → 5.042s). Use the **longest useful actual supported duration up to 10s**; do not stretch a short reaction. For long takes, design `TAKE_ID` and consecutive segment cards: `SEG[n].actual_last_frame_ref == SEG[n+1].first_frame_ref`, plus a reachable next last-frame image and stable camera axis/speed/actor/environment state. The true native rendered final frame, **not planned end target**, must become the following segment's first-frame source. Only use VideoExpress native First/Last inputs when observed; verify moving boundary footage at each join, avoid cover-up fades and keep audio/water ambience continuous. Visible JOTA2 speech must retain native synchronized talking generation; First/Last video-only cannot fake spoken mouth movement. No automatic media job authorized by this skill-only amendment.

## Priority: professional prompt quality BEFORE rendering
This earlier scene-generation guide is now subordinate to [`FILMMAKER_PREGEN_QC.md`](FILMMAKER_PREGEN_QC.md), [`CHARACTER_CONSISTENCY.md`](CHARACTER_CONSISTENCY.md), [`PROMPT_IMAGE_DIRECTOR.md`](PROMPT_IMAGE_DIRECTOR.md), [`PROMPT_MOTION_DIRECTOR.md`](PROMPT_MOTION_DIRECTOR.md), and [`PROMPT_DIALOGUE_DIRECTOR.md`](PROMPT_DIALOGUE_DIRECTOR.md). **Character identity is established in Artistly's approved reference library before SCxx**; exact imported VideoExpress image IDs then anchor motion/lip-sync. P1/P2/P3 pre-gen checks must PASS before any charged job. This guide contains historical JOTA_1 examples and must not override JOTA_2 expressive character design. Use quick real output checks and complete final film review, not indiscriminate exhaustive clip diagnosis after every render. Do not submit any media on an update-skill-only request.

## Why this contract exists

The genuine VideoExpress Nabi Nuh Draft 01 audit, [`PB06 Nabi Nuh QA audit`](../playbooks/prophets-companions-moral-stories/productions/nuh-anak-20261021/QA_AUDIT_20261021.md), rejected SC06/SC08 for human facial details, SC08 for photoreal/3D style drift, SC07/SC13 for inconsistent ark geometry and SC05/SC15 for invented glyphs. The production scene manifest contained short visual intentions, not uniformly complete, approved start-image and video-generation prompts. **Hypothesis, not proven provider root cause:** weak frame-level constraints and insufficient pre-render checks allowed these failures. This workflow makes each gate observable; text safeguards alone cannot guarantee VideoExpress output.

## Required scene card before generating anything

Each `SCxx` must have:
- `scene_id` + `revision`, approved narration cue and exact intended duration;
- `subject_visibility`: actor purpose and actual frame scope: `EMPTY_WORLD`, `PROPS_ONLY`, `REAR_ONLY`, `EXPRESSIVE_3_4`, `SPEAKER_CLOSEUP`, `TWO_SHOT`, etc. Under `JOTA_1`, face-safe crop remains mandatory; under `JOTA_2`, normal expressive faces are allowed and should be staged visibly for dialogue.
- `subject_count` and who/what is explicitly **inside the frame**, not merely in the episode;
- locked original art style selected for project (e.g., original 2D painted Kancil film) + portrait/landscape, real Artistly actor reference IDs, shot composition, intended motion/camera endpoint and intended speaker/dialogue timing;
- immutable `character_bible_ref` if fictional people are present and `prop_bible_ref` if a recurring object is present;
- `start_image_prompt_id` (Artistly), `video_prompt_id` (VideoExpress), **`approved_artistly_source_image_id` plus `videoexpress_imported_image_id`**, `provider_project_id`, and source/review status (unknown IDs stay null; never invent IDs);
- prohibited elements, audio/narration plan, and exact reviewer decision.

**Hard stop:** a shot involving a prophet, Allah or an angel as a person/body/voice representation is invalid at storyboard stage, including rear view or silhouette. `JOTA_1` requires visible humans/animals to be faceless and without lip-sync; `JOTA_2` allows visible facial features, expressions and supported/requested lip-sync. If a religious or other factual claim is unreviewed, do not present it as verified.

## Build the shot in this order

1. **Frame-safe staging:** Prefer an empty place or an isolated object over a vague “child listening” shot. If hands suffice, show cropped forearms and hands only; explicitly compose the top of the frame as unoccupied by heads. For rear figures, the camera must never orbit into a face or expose a facial reflection. Decide real on-screen count; avoid accidentally rendering narrator/story subjects.
2. **Stable visual reference:** Describe the main object/character by shape, material, color, scale and screen position. Repeated ark shots use **one accepted, versioned, original ark reference**; label it illustrative, never a verified reconstruction. If a prop will return after leaving frame, establish a new approved reference image instead of relying on generator memory.
3. **Artistly approved start frame FIRST:** Draft a standalone `[SCxx-IMG-vN]` prompt for Artistly describing the exact 16:9/9:16 frame; inspect it there and record its actual source image ID. In VideoExpress use **Import Media → Import from Artistly**, check the exact approved thumbnail and imported image identity before writing/submitting motion. Never infer that an imported item retained source folder or that a text-to-video submission retained an opening reference. If the required Artistly source or matching VideoExpress import cannot be secured or verified, mark `START_FRAME_BLOCKED` or `IMAGE_IDENTITY_UNVERIFIED` and do not proceed for that shot.
4. **One legible visual event:** Draft `[SCxx-VID-vN]` based on the *observed* approved opening frame, not the intended frame. Define one physically visible action, its temporal progression and the end composition. Subject movement and camera movement are separate; do not turn a still slideshow into a claimed animated scene. Use only clip lengths observed as supported by the authorized VideoExpress UI, not a fixed assumed maximum.
5. **Repeat the selected visual invariant:** Each image/video prompt specifies the chosen creative mode, original art direction, JOTA_1 blank-face policy OR JOTA_2 intentional expressions/identity lock, stable props and no unintended AI-generated lettering. Put excluded items in an explicit exclusion tail; positive staging carries most of the safety burden. Avoid using facial-detail vocabulary as *positive* appearance guidance.
6. **Audio and text separation:** Keep character-dialogue vs narrator requirements of the brief in either mode. `JOTA_1`: separate actor voices without lip-sync/music; nature ambience/Foley allowed. `JOTA_2`: supported lip-sync and rights-cleared soundtrack allowed if requested, with music rights and mix QC. No random/unintended words, audio or AI text. Exact Indonesian titles, Qur'anic/Arabic text, dates and citations belong in **verified native VideoExpress editor overlays**, not generation prompts or generated book pages.
7. **Preview before committing:** Check public-gallery sharing OFF and exact intended VideoExpress project; inspect the accepted still and a proof clip. Use a bounded authorized take budget (not a default five-take batch). Never assume job success from a button click or a rendered-library notification.

## Original JOTA paste-ready prompt skeletons

Fill all angle, object and length placeholders **before** copying. These are JOTA-authored planning examples, not material copied from an external skill.

**Opening still `[SCxx-IMG-vN]`:**

```text
[SCxx-IMG-vN]
Original hand-painted 2D cinematic storybook illustration, [16:9 landscape OR 9:16 portrait as approved]. Image generated in Artistly at the native requested aspect ratio. ONLY IN THE FRAME: [exact subject(s), count, or explicitly unoccupied landscape]. The initial composition shows [precise positions, crop boundaries and props]. [Locked original character/prop appearance, if present]. [Stable environment and light]. Surfaces are clean and unlettered. Visible humans and animals, if any, are completely featureless-faced and never turn toward camera; prefer cropped hands/rear views. EXCLUSIONS: No eyes, eyebrows, eyelashes, noses, nostrils, mouths, lips, teeth, facial reflections, additional figures, prophet/angel depiction, text, lettering, logos, realism or 3D conversion.
```

**Video motion `[SCxx-VID-vN]` (after still approval):**

```text
[SCxx-VID-vN]
Use the verified VideoExpress-imported Artistly start image [actual imported image ID, matched to approved Artistly source ID] as the opening composition. Preserve its original painted 2D shapes, palette, fixed cast/crop, props and lighting. Over [verified seconds], [named subject or object] starts [physical state], then [one specific visible physical action], ending [measurable end state]. Camera [locked OR single named move and exact endpoint]. No unprompted scene change or added figures. Natural sound: [one justified brief environmental sound, or choose the supported silent-video option for editor narration]. For JOTA_1, speech remains off-screen and no mouth/face/music may appear. For JOTA_2, requested expressive speech/lip-sync and licensed music are permitted. UNIVERSAL EXCLUSIONS: no unexpected subjects, distorted anatomy, unauthorized religious figure depictions, invented text, unplanned props, visual style drift or camera flip.
```

The field labels are planning aids, not a claim about a provider-native prompt syntax or automatic compliance. If the VideoExpress UI's actual supported controls differ, inspect and adjust the **transport/UI**, not the core JOTA restrictions. Do not put real asset IDs in reusable public examples.

## Repair patterns from the rejected Nabi Nuh draft (do not regenerate without an order)

| Scene | Safer start-frame composition | Motion / forbidden shortcut |
|---|---|---|
| SC06 | Unoccupied tree and landscape through a seasonal change; **zero humans/animals** and no calendar lettering | Leaves and light change; never introduce a listening child or human “representing time” |
| SC08 | Close tabletop **wooden toy ark and cropped hands only**; camera crop excludes all heads, profiles and mirrors | Hands slide the toy slightly; no child's face or frontal head, no realistic/3D conversion |
| SC07 / SC10–SC13 | Reuse the **same accepted illustrative wooden ark** reference: curved umber hull, consistent roof and size | Keep silhouette across build, water and hillside; do not replace it with an arch/building |
| SC05 / SC15 | Blank book pages and text-free end card, with negative space | Add exact verified wording later using native editor overlay; never rely on AI-drawn scripture or title |

## Stop/go checkpoints for each clip

- **PRE-IMAGE:** `SCENE_CARD_PASS` requires approved shot subject count, source policy, staging, character/prop/style locks, audio/text treatment, **Artistly image source + 16:9/9:16**, credit ceiling and current owner authorization to generate. A skill update or folder creation is not media authorization. Otherwise `SCENE_CARD_BLOCKED`.
- **IMAGE:** record `[SCxx-IMG-vN]`, actual **Artistly** source image ID, approved folder and QA; then verify and record exact **VideoExpress import** item/ID before scene motion. `JOTA_1`: any facial marks cause `IMAGE_REJECTED`. `JOTA_2`: facial features are allowed, but warped/wrong expressions, inconsistent cast, surprise figures, unwanted text, or wrong props/style cause `IMAGE_REJECTED`. Do not generate video from rejected images.
- **VIDEO:** record `[SCxx-VID-vN]`, provider video job/library asset ID and actual first/last frames. Inspect the **entire clip**, including midmotion profiles, reflections, animal heads, wardrobe and ark silhouette. A midpoint still may **fail** a clip but cannot **pass** a clip.
- **REPAIR:** log `scene_id`, defect type, screenshot/time evidence, prompt/ref version and precise change; correct the **smallest** affected clip. After two retries with the same failure mechanism, stop and investigate with one-variable test plans instead of blind regeneration. Reconcile downstream chained clips.
- **TIMELINE:** only accepted scene versions enter the candidate timeline. Verify `accepted = included` in intended order, timings, off-screen narration, zero unintended music and native title overlays. The final VideoExpress export needs its own full visual/audio/religious/rights QA and exact provider provenance; owner acceptance is separate.

## Skill-only test (zero renders)

Before considering a change to this workflow complete, check the documented test cases in `../evals/CASES.json`: unsafe human-head framing, rejected visual style, missing approved start image, ark replacement, AI-rendered text and accidental render authorization must all return BLOCK/REJECT/PLAN_ONLY. This is a **documentation/logic review**, not proof of successful VideoExpress generation.
