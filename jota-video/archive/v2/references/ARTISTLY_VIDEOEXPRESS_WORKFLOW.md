# JOTA Artistly → VideoExpress image-first workflow — v2.0 (Artistly character reference + P1/P2/P3, 2026-10-23)

**Before a NEW video production:** owner must explicitly choose `JOTA_1` or `JOTA_2`, otherwise ask once and hold media with `MODE_SELECTION_PENDING`. See [`CREATIVE_MODES.md`](CREATIVE_MODES.md). Shared Artistly/VideoExpress provider identity and credit/rights gates apply in both.

**Effective JOTA design decision (owner instruction, 2026-10-22):** **Artistly** at `app.artistly.ai` creates and stores **START IMAGES / STILL REFERENCES**. **VideoExpress AI** at `app.videoexpress.ai` imports accepted Artistly stills using its visible **Import Media → Import from Artistly** integration and exclusively creates **ALL MOVING VIDEO CLIPS and final native VIDEO exports**. Artistly is **not** a video-generation alternative. **NO local/other-provider substitute moving video**, ever, without a future explicit owner change. Legacy accepted VideoExpress stills may remain in old projects; new image-first JOTA episodes default to Artistly.

This is a **skill + production asset contract**, not a running API client, scheduler, or authorization to generate new media merely because GitHub files changed. The user explicitly permits current JOTA operations to control **the existing Chrome tabs for Artistly and VideoExpress** (2026-10-22), including visible application navigation and organizing folders. The authorization does not cover unrelated tabs, passwords, hidden API keys, cookies, undocumented endpoint calls, spending credits without budget review, publishing, closing user projects, or unattended/background execution. Preserve any unrelated unsaved edits and use a dedicated new tab/project where possible.

## Separate owner-trained manual VideoExpress scene-staging path (2026-10-24)
The owner can **manually** choose the existing approved Artistly/reference character image in VideoExpress `Reference Photo 1`, then write a new VideoExpress **Image Prompt** for the particular pose/location/background, enable Creative Mode + image enhancement + Consistent Character, create/review the resulting VideoExpress-native scene still, and use that still for VideoExpress video. This is a newer explicitly requested **manual** scene-composition route, not proof VideoExpress generated an approved image or a silent replacement of the Artistly canonical-character bible or the full-automation/default Artistly-image workflow described below. Do not invent `artistly_source_id` for VideoExpress-generated derivative stills: track original canonical reference separately from `videoexpress_scene_still_id`. Follow [VIDEOEXPRESS_MANUAL_SCENE_WORKFLOW.md](VIDEOEXPRESS_MANUAL_SCENE_WORKFLOW.md). For user-requested manual prompt help only, provide prompts and script; perform no provider mutation or generation.

## Prompt-first filmmaker checks
Before image/video/dialogue generation, load [`FILMMAKER_PREGEN_QC.md`](FILMMAKER_PREGEN_QC.md), [`CHARACTER_CONSISTENCY.md`](CHARACTER_CONSISTENCY.md), then P1 [image](PROMPT_IMAGE_DIRECTOR.md), P2 [motion](PROMPT_MOTION_DIRECTOR.md), P3 [dialogue](PROMPT_DIALOGUE_DIRECTOR.md). **Artistly builds canonical actor identities before any individual scene image**, VideoExpress animates exact approved imported stills. `P1_IMAGE_READY`, `P2_MOTION_READY` and `P3_DIALOGUE_READY` demand actual references, cinematography, movement, timing, audio and licensing consistency before paid jobs. Owner previously selected JOTA 2 for Kancil; do not re-ask on this episode. This documentation-only task authorizes no fresh generation. Post-render use quick real playback and complete final-film review (deepen only on observed failures); prompt QC cannot guarantee model output.

## Evidence & capability boundaries

- **Verified from authenticated UI, 2026-10-22:** Artistly Personal Designs has **Manage folders**, folder creation, **Bulk Move**. Four named JOTA categories were created and their names verified in its folder-management list. **Artistly Personal Designs warns of 1-year retention** (download important images for longer retention).
- **Verified from authenticated UI, 2026-10-22:** VideoExpress editor has **Import Media → Import from Artistly**; the picker populated with Artistly-image entries; its warning states **only 16:9 and 9:16** imports are supported, and **1:1 is rejected**. This proves the visible cross-product picker, **NOT a successful import of a new JOTA scene image**, and is **not evidence of a published/programmatic API**.
- **Verified from authenticated UI, 2026-10-22:** VideoExpress Media Library supports **Create folder** categories; four named JOTA categories were created and visible. Media Library displays a **40-day hosting retention** warning. Project file retention and category semantics should be rechecked if the provider updates the UI.
- **Verified previously in authenticated UI:** Kancil SC01/SC02 approved Artistly images imported to VideoExpress images `45736022` and `45742089`, yielding native clips `45737550` and `45742361`. **Read-only authenticated UI finding, 2026-10-23:** Artistly `Consistent Characters → Multi-consistent Characters` exposes two image/library reference slots; VideoExpress `Create with AI` lists Consistent Character, Lipsync HD, First Frame–Last Frame and AI Sound Maker. **NOT VERIFIED:** those features' efficacy for consistent 2D animal acting, exact lipsync timing, arbitrary batch/API support, billing limits, user-specific music licenses. Do not invent IDs, private endpoints or capability results.

## Ownership and release lock

1. `artistly.ai`: **still image generator/source** and image gallery. All source-image prompt IDs and versioning belong to JOTA GitHub prompt pack; Artistly image ID/URL/folder are captured when observable.
2. `videoexpress.ai`: **only video generator, moving-shot library, native audio/timeline, and final video exporter**. Verify video project, imported-still identity, generated clip/job ID, final native VideoExpress export ID.
3. `GitHub (private JOTA repo)`: source of truth for scene IDs, exact image and video prompts, shot grids, dialogue cues, asset manifest and QC/revision decisions, with no copied proprietary images/secrets/API keys.
4. **Sound by owner-selected mode:** `JOTA_1` no music or lip-sync, but ambient nature sounds/Foley allowed; `JOTA_2` properly licensed and requested music and supported lip-sync allowed, alongside ambience. Listen to entire mix, verify rights, no narrator in a dialogue-only story in either mode.
5. **Facial detail by selected mode:** `JOTA_1` absolutely faceless humans/animals in all frames; `JOTA_2` full faces, expressions and mouth motion permitted with identity/anatomy continuity checks. Actual Islamic historical/religious claims still require accurate sourcing and restrictive Allah/prophet/angel depiction policy regardless of mode; generated text needs reviewed native overlays.

## Stable scene identity and naming

Never depend solely on a library tile's truncated title, folder sort position, or visual resemblance.

- **Episode key:** `JOTA-PB01-KANCIL_BUAYA-20261022` (future projects use same PBxx slug + date naming).
- **Image prompt ID:** `[SC01-IMG-v1]`; Artistly image label/caption/title or stored prompt prefix starts with this ID where supported; `SC01-IMG-v2` is a *new* image candidate, not a renamed old asset.
- **Approved still:** `[SC01-IMG-v1-APPROVED]` as an *asset ledger status*, not an assumption that editing the provider label renames its canonical image ID.
- **Video prompt ID:** `[SC01-VID-v1]`; it must refer to **the exact approved image version** and the actual imported VideoExpress asset ID.
- **Native video clip:** `[SC01-CLIP-v1]` in ledger with verified video generation job and library clip IDs; no generated clip is "approved" based on completion notification.
- **Dialogue/audio cue:** `[SC01-DIA-v1]` linked to named character `K1/C1`, with measured offsets/durations. This is not a video prompt and must not be pasted into a motion prompt likely to generate mouths.
- **Final export:** `[EP-KANCIL-BUAYA-CANDIDATE-v01]` with VideoExpress project/export ID, file facts/hash and review decision. Never overwrite a rejected export.

**Immutable mapping:** `episode_id + scene_id + still_prompt_version + artistly_source_id + imported_videoexpress_image_id + video_prompt_version + generated_videoexpress_clip_id + audio_cue_version + QA status`. An unknown ID is `null`, never guessed. If any imported image cannot be matched, **STOP SCENE**: `IMAGE_IDENTITY_UNVERIFIED`.

## Actual folder organization (both apps use flat categories, not presumed nested directories)

**Artistly — created and UI-verified 2026-10-22:**
- `JOTA-00_SHARED-CHARACTER_REFS` — only character/world/prop reference pictures accepted for reuse.
- `JOTA-PB01-KANCIL_BUAYA-20261022-01_CANDIDATES` — generated opening images awaiting examination.
- `JOTA-PB01-KANCIL_BUAYA-20261022-02_APPROVED` — reviewed exactly chosen source stills; **only these** may be selected for video import.
- `JOTA-PB01-KANCIL_BUAYA-20261022-99_REJECTED` — rejected visuals and version history (do not delete when still useful for diagnosing).

**VideoExpress Media Library — created and UI-verified 2026-10-22:**
- `JOTA-PB01-KANCIL_BUAYA-20261022` — project-level/approved working collection (category, not necessarily a nested parent; VideoExpress timeline *project* is a separate saved entity).
- `JOTA-PB01-KANCIL_BUAYA-20261022-01_STILLS` — accepted imported Artistly stills; first land in vendor-managed `My Artistly Images` when imported, then use **visible Organize/Move** if the UI supports selecting exact item and destination. No blind moves.
- `JOTA-PB01-KANCIL_BUAYA-20261022-02_CLIPS` — scene videos rendered by VideoExpress, potentially first landing in `My AI Videos`; associate exact scene ID, take and prompt hash before moving.
- `JOTA-PB01-KANCIL_BUAYA-20261022-03_AUDIO` — legacy Kancil audio category, unchanged pending creative-mode choice; new JOTA 2 projects may hold rights-cleared music with license evidence.
  
**Folder creation is complete; asset filing is NOT complete.** New Kancil source images/clips do not yet exist, so no old images or VideoExpress clips were moved into these categories. Default vendor folders remain intact. Never infer that provider import respects Artistly's source-folder filtering; verify the exact thumbnail/ID from the picker.

**GitHub private source of truth:**
```text
skills/jota-video/playbooks/faceless-family-stories/productions/kancil-buaya-20261022/
  PRODUCTION_BIBLE_AND_SCRIPT.md    story, character world, dialogue and shot timing
  SCENE_IMAGE_VIDEO_PROMPTS.md      actual independent SCxx-IMG and SCxx-VID prompts
  ASSET_MANIFEST.json              still → import → clip → audio exact ID mapping
  RUN_STATE.json                   permissions, queue, QA and production checkpoints
```
Never put unrelated user photos, credentials or authentication data in GitHub.

## Fast execution order — prefer grouped provider stages
For authorized active production, read [`FULL_AUTOMATION.md`](FULL_AUTOMATION.md) and [`FAST_PRODUCTION.md`](FAST_PRODUCTION.md). **FULL AUTOMATION is owner-selected**, with FAST as its interaction strategy; manual assistance requires a separate explicit owner choice. `A → B → C → D → E → F → G` below are **scene-specific quality and identity gates**, NOT an order to complete one entire scene before drafting the next. Prepare all story cards/prompts first; group supported Artistly image generation and approval; then group native VideoExpress imports and bounded clip requests while retaining scene-to-asset IDs. Do not infer batch features not actually present. Preflight editor and **generator** aspect independently (both can diverge), Image Type 2D, public sharing OFF and prompt enhancers OFF. Keep costly deep inspections for failure or mandatory acceptance/release. Complete full visual/audio QA before accepting a clip or final export. A change-of-task to workflow review/pause forbids new generations.

## Per-scene pipeline — do not advance until gates pass

**A. Planning/preflight.** Confirm selected owner mode, explicit current media authorization, exact provider accounts, **original Artistly character/world bible and real reference IDs**, shot grid, time/aspect, project and scene IDs, credit ceiling, private gallery OFF, rights, and P1/P2/P3 checks. A skill update does not authorize a new job. If skill update or folder organization is the request, stop at documentation/UI organization without generating images/clips.

**B. Artistly P1 image prompt:** apply `[SCxx-IMG-vNN]` independently. Specify **16:9 (for landscape JOTA films) or 9:16 (for portrait)**, exact on-screen subject count, mode-appropriate intentional character angle/crop and expression (JOTA 1 physically faceless; JOTA 2 coherent full faces), original 2D painted style, character/world/prop locks, environment layout, empty/no-text surfaces, light direction and exclusions. Do not use 1:1. Use consistent-reference functionality *only if verified*, never as an evidence substitute.

**C. Artistly quick image sanity:** after pre-generation P1 QC, inspect candidate at full size for mode-appropriate character quality (JOTA_1 faceless; JOTA_2 expressive faces allowed with stable identity), anatomy, art style, geography, no unwanted letters, privacy and rights. Record actual image ID, dimensions, SHA/checksum when available, source prompt/version, folder and reviewer. **Select ONE approved scene image**; move/mark it in `02_APPROVED` using the UI, preserving other candidate/rejected IDs.

**D. Native VideoExpress import:** in **Import Media → Import from Artistly**, select the **same** approved visual; compare thumbnail/composition and dimensions; execute supported UI import. Find the matching item in `My Artistly Images` and record the resulting **VideoExpress imported image asset ID**. If no ID is exposed, use defensible image-specific provider UI evidence and mark `IMPORT_ID_LIMITED`; do not silently match to an unrelated image. Optional `Organize` into `01_STILLS` after verifying the exact item.

**E. VideoExpress P2 motion prompt:** create a distinct `[SCxx-VID-vNN]` based on the **actual imported opening frame**, not an imagined one. Specify one physically meaningful action, consistent camera movement/end, lighting, character/prop continuity, and explicit **selected-mode** face/lip-sync/music boundaries; JOTA 2 allows natural visible faces and requested supported lip-sync/licensed music. For dialogue films: also prepare independent **P3 character-voice/lip-sync director cues** with speaker ID, timed line and rights before any voice or lip-sync job. JOTA_1 must not draw/animate mouths, while JOTA_2 may use requested supported lip-sync/expressive mouth acting. Natural river/wind/bird/rain ambience and physically motivated Foley may be used when user wishes; avoid tonal sound resembling music. Use only supported duration and private settings.

**F. Provider render & lean result sanity:** record actual VE video job, clip ID, matching image source, clip version and take, duration/cost; perform a short real beginning/middle/end playback with basic actor/motion/mode-appropriate facial quality, technical shape and audio scan. Mark `RENDERED_QUICK_REVIEW`, not definitive QC PASS from prompts or sampled frames. Investigate only observed anomalies; save **complete visual/audio/license QC for final assembled film** before owner review. Never batch forward known critically defective output. Clip library and project timeline entries must be reconciled by IDs, not filenames.

**G. Native timeline, export, review:** arrange only accepted VE clips in shot order; add native supported actor dialogue/audio/ambience; review mix without unrequested narration/music; JOTA_1 forbids music, JOTA_2 permits properly licensed music when requested. Export *from VideoExpress*, verify project/export provenance, duration, 16:9, codecs, 40-day asset retention/backup, source rights and private visibility. Owner approval to publish is separately required.

## Browser/UI guard

- **Current explicit owner exception (2026-10-22):** active Chrome tab control is permitted **only for Artistly and VideoExpress** in the authorized session/task. This supersedes JOTA's older blanket 'never foreground Chrome' rule for these two sites but does not make this a headless service. A browser operation is allowed **only in the scope of the current task**; being allowed to control tabs is NOT permission to generate new media on a skill-edit task.
- Prefer dedicated tabs or saved projects; do not discard user unsaved work, create side-effecting jobs on a shared project or re-submit in-flight tasks blind. Verify the expected URL/account before clicking a provider control. Preserve unrelated Chrome tabs.
- **Secret safety:** never read, print, transmit, persist or copy passwords, cookies, authentication/session headers, Artistly API keys, VideoExpress tokens, hidden endpoints or personal profile records. Do not guess the provider's private API or bypass supported UI. Only use documented/visible provider controls within authorization.
- **Retention:** Artistly Personal Designs warns images may expire after 1 year; VideoExpress Media Library warns files may expire after 40 days. Save source prompts, asset IDs and rights/QA evidence in GitHub; download private approved assets into authorized owner storage when actually permitted. No new unattended backup automation is implied.

## Status gates

- `ORGANIZATION_CONFIGURED`: confirmed folders exist; does not mean images imported or video generated.
- `ARTISTLY_STILL_APPROVED`: exact source image inspected and approved.
- `VE_IMPORT_VERIFIED`: exact Artistly source image located as matching imported VE image.
- `VE_SCENE_RENDERED`: actual native VideoExpress video clip ID and provider job evidence.
- `SCENE_QA_ACCEPTED`: full visual/audio scene QA.
- `VE_EXPORT_VERIFIED`: native final VideoExpress project/export identity and complete video QA (not owner approval).
- `OWNER_APPROVED` and `PUBLISHED_VERIFIED`: separate exact user decision and external release proof.
- Any unknown source/image/scene identity => `BLOCKED_IDENTITY`, not success or a fallback from another generator.
