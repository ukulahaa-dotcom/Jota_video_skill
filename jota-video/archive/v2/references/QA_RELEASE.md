# JOTA quality and release gate v2.2 — prompt, native long-take seam and actual dialogue QA

## New mandatory continuity QC — First Frame / Last Frame extended take
Read [`CONTINUOUS_SHOT_FIRST_LAST.md`](CONTINUOUS_SHOT_FIRST_LAST.md). For a planned continuous camera take >10s, require: **C0** take/pan/actor/world audio lock; **C1** exact verified next first = prior **actual rendered last frame**, paired with reachable planned next last image and real native First/Last controls; **C2** short native ending/beginning **moving-video** seam check (camera speed, subject position, momentum, shadow, frame freeze, footsteps/water, audio continuity), with a small bounded repair rather than rewinding entire take; and **C3** assembled straight-cut camera take reviewed at normal speed before calling it `SEAMLESS_QA_PASS`. Metadata matching and two stills alone are NOT seam QA. Silence/voice ownership and native P3S/P4 lip-sync gate remain stronger for talking faces; no detached TTS to fake a speaking oner. Do not add stock crossfade/fade to mask an actual visual mismatch. All credits/provider IDs and native editor/output identity must be real; no full film final acceptance solely from prompt checks.

## New mandatory JOTA 2 dialogue QC gate
An on-camera speaking JOTA 2 actor MUST pass [`DIALOGUE_SYNC_FIRST.md`](DIALOGUE_SYNC_FIRST.md): native VideoExpress one-piece generated speech+face or verified audio-source-coupled lip-sync; one visible speaking mouth and natural Indonesian line. **Never accept** `Video Only` animal animation plus independent aligned TTS as valid lip-sync. `P3S_SYNC_READY` precedes generation, `P4_AV_SYNC_ACCEPTED` demands audible **and** visual actual video review: phoneme-to-mouth opening and closure, pauses/silence, speaker ID, exact Indonesian words and vocal performance. PCM RMS and 3 midpoint stills are NOT proof; an owner-reported disconnect overrides prior technical-export PASS. Before another one-minute film, a short real animal pilot must pass and be evidenced. Final private film needs normal-speed full video+audio watch/listen, even after prompt-first QA. JOTA1 no mouth/no music stays unchanged.

## Critical release gate — VIDEOEXPRESS_ORIGIN_REQUIRED
Read [`VIDEOEXPRESS_PROVIDER_LOCK.md`](VIDEOEXPRESS_PROVIDER_LOCK.md). Before any JOTA draft/review/final video is reported as produced or delivered, require evidence of **VideoExpress account, project, scene/library job identifiers and VideoExpress final export**. A file merely being playable, having correct resolution/duration, passing faceless QA, or being uploaded to Drive is **insufficient**. **Any video created using a different video engine is `NONCOMPLIANT_REJECTED`, never JOTA-approved.** The owner-approved **Artistly still-image generation** is not a forbidden alternative video engine: for image-first productions, record Artistly source still ID, full-size visual QA and verified native VideoExpress imported-image reference before the first VE clip. VideoExpress remains exclusive for moving video, native assembly and final export. Reference: [Artistly → VideoExpress asset workflow](ARTISTLY_VIDEOEXPRESS_WORKFLOW.md). If origin is unproven, mark `PROVIDER_ORIGIN_UNVERIFIED`; if VideoExpress fails or is inaccessible, mark `BLOCKED_VIDEOEXPRESS`, never generate a fallback. Keep existing `QUALITY_GATE_LOCKED` and all other checks.

## Do not weaken the existing project guard
`docs/QUALITY_STANDARD.md` keeps the local JOTA Content Factory generation/approval API disabled with `QUALITY_GATE_LOCKED`; this documentation package does not modify any code or guard. New standards below add to rather than replace that lock.

## Built-in quality before generation (authoritative)
First lock actual Artistly character reference IDs and production world bible in [`CHARACTER_CONSISTENCY.md`](CHARACTER_CONSISTENCY.md). Then evaluate [`FILMMAKER_PREGEN_QC.md`](FILMMAKER_PREGEN_QC.md) and P1 [image director](PROMPT_IMAGE_DIRECTOR.md), P2 [motion director](PROMPT_MOTION_DIRECTOR.md), P3 [dialogue director](PROMPT_DIALOGUE_DIRECTOR.md). Each applicable gate must be `PASS` **before the corresponding billed provider action**. This should prevent predictable reference, framing, camera, acting, dialog timing, audio/music rights and cast drift. `PROMPT_QC_PASS` does **not** certify generated image/video quality. Full Automation and mode selection remain unchanged.

## Mode gate before any QA or generation
A new video must have `creative_mode=JOTA_1` or `JOTA_2` explicitly selected by the owner, as defined in [`CREATIVE_MODES.md`](CREATIVE_MODES.md). If `null`, set `MODE_SELECTION_PENDING`, and **do not submit media jobs or mark quality approved**. For JOTA_2, do not reject facial features, natural facial expressions, optional supported lip-sync or appropriately licensed music *solely* because they conflict with JOTA_1. For JOTA_1 the existing absolute faceless, no music, no lip-sync restrictions remain hard blocks. All other safety, privacy, commercial-rights, technical motion/audio quality and provider gates remain in both.

## Required checks per scene — lightweight scene sanity, not exhaustive processing
Run a quick actual full-size still check and **short rendered-clip playback/technical check** (start/middle/end action and identity) at intermediate steps. Mark `RENDERED_QUICK_REVIEW` instead of `QA_ACCEPTED`; reserve **one full assembled-film playback** with complete voice/music/license/rights, visual and export QA before owner review. Deep frame extraction only when observed defects, mode-1 high-risk face artifacts or safety/privacy concerns justify it. Never silently waive a mandatory mode-specific or legal check solely to save time.

## Required checks per scene
- Story: action visibly advances the narrative, timing matches voice and character motivations are comprehensible.
- **Mode-conditional character QA:** `JOTA_1`: inspect complete playback/frame sequence by a defensible comprehensive method for absolutely no facial features on people/animals, including reflections/backgrounds and transitions; samples alone are insufficient. `JOTA_2`: visible eyes/nose/mouth/expression are **allowed**; inspect character identity stability, geometry, believable facial performance, unwanted deformations and continuity. Do not apply `faceless_all_frames` as a blocking requirement in JOTA_2.
- Body and props: hand count, anatomically credible poses, clothing, props, geography, character scale, temporally coherent movement.
- Privacy: child aliases and no identifying artifacts, addresses, birthdays, private photos, or private names in shared metadata.
- Sound: clean intentional dialogue, timing/loudness and transitions in both modes. `JOTA_1`: **no music, songs, melodic soundtrack or lip-sync**, environmental ambience/Foley allowed. `JOTA_2`: **music is allowed only with verifiable source/usage/commercial rights and proper dialogue ducking**; requested supported lip-sync is allowed but must be checked for timing, facial quality and voice consent. Any unlicensed or unrequested audio remains disallowed.
- Islamic integrity: when an episode contains actual Islamic/Qur'anic/history/source claims, require exact traceable sacred citations and applicable stricter depiction policy **in either mode**. For ordinary secular fiction in `JOTA_2`, mark Islamic source review `N_A` (do not invent a religious-accuracy requirement). Never fabricate historical/religious authenticity.
- Rights: asset source/license and provider commercial terms evidenced; third-party voice usage consent recorded; public-gallery share disabled.
- Format: verified FPS, duration, dimensions, video/audio codecs, playback in a real player and final file checksum. Artistly→VideoExpress image import must use **16:9 or 9:16**, not 1:1; verify actual imported item matches approved source still and retain both IDs. Note authenticated VideoExpress Media Library 40-day and Artistly Personal Designs 1-year retention warnings; back up approved files within their windows.

## Stage approval schema
```yaml
quality_gate_locked: true
creative_mode: JOTA_1 | JOTA_2 # required owner selection
mode_selected_by: OWNER
stage: DRAFT | REVIEW | OWNER_APPROVED | PUBLISHED
story_review: PASS | FAIL | NOT_RUN
character_bible_review: PASS | FAIL | NOT_RUN
faceless_all_frames: PASS | FAIL | NOT_RUN | N_A # N_A only for JOTA_2
facial_continuity_review: PASS | FAIL | NOT_RUN | N_A # N_A only for JOTA_1
music_license_review: PASS | FAIL | NOT_RUN | N_A # required when music used in JOTA_2; N_A if no music
islamic_source_review: PASS | FAIL | N_A | NOT_RUN
child_privacy_review: PASS | FAIL | NOT_RUN
licensing_review: PASS | FAIL | NOT_RUN
audio_review: PASS | FAIL | NOT_RUN
timeline_review: PASS | FAIL | NOT_RUN
render_metadata_check: PASS | FAIL | NOT_RUN
human_editor_review: PASS | FAIL | NOT_RUN
owner_approval_candidate_id: null
publish_authorization: null
```

**Any FAIL/NOT_RUN on a criterion required for the selected mode blocks `OWNER_APPROVED` and `PUBLISHED`.** Non-applicable mode-only checks are `N_A` with rationale, not silently skipped. Human inspection and express owner signoff cannot be replaced by model confidence.

## Proof of Done (distinguish states)
- `DOCUMENTED`: rules committed to GitHub; no running automation proven.
- `DRAFT_RENDERED`: a provider says it generated media, but file may not have been downloaded or checked.
- `LOCAL_VERIFIED`: precise file location + checksum + codec + visual/audio checks evidenced.
- `OWNER_APPROVED`: owner explicitly accepts exact candidate/revision.
- `PUBLISHED_VERIFIED`: separate explicit consent plus confirmed exact channel URL, visibility and correct media.
- `BLOCKED`: missing headless capability, credits, auth, external source, quality defect, license or owner consent.

Keep evidence timestamps, candidate version, prior revisions and rejection reasons. Publishing is **never** triggered by a successful download or export.

## Required privacy and content gates at publish
Before YouTube/Postiz: check rights and current platform synthetic-media disclosure rules as applicable, thumbnail and caption **selected-mode visual compliance**, child privacy, correct channel identity, no invented religious authority, schedule/timezone, paid implications, public/gallery setting, rollback/unpublish procedure and owner authorization.
