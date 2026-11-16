# JOTA original story-to-video workflow — v1.5 (10s + native continuous-first/last chaining)

## Scope
This is the independently written JOTA pipeline supporting owner-selected **JOTA_1** faceless/no music and **JOTA_2** expressive cinematic/licensed music. The mode-selection gate in [`CREATIVE_MODES.md`](CREATIVE_MODES.md) precedes new video generation. Do not infer a mode or soften universal privacy/provider rights requirements. External prompts/skills may be incompatible and must not be copied or blindly executed.

## Long take default — up to 10s per segment; First/Last Frame for continuous >10s
Read [`CONTINUOUS_SHOT_FIRST_LAST.md`](CONTINUOUS_SHOT_FIRST_LAST.md) for both modes. Before generation, separate **scene** (story unit) from **shot/take** (same uninterrupted camera) from **native segment** (one provider result). Aim for the longest useful supported segment **up to 10s**, not a fake forced 10s reaction; verify VideoExpress's specific mode UI, actual final video duration and whether First/Last two-image controls exist. Longer apparent shots use next `first_frame` = **previous clip's actual last frame** (not the planned target), then a consistent reachable `last_frame` target in VideoExpress's native First/Last Frame mode. Maintain uninterrupted action, directional motion, camera position/velocity, actor IDs, props, light and audio. C0 plan/C1 frame pair/C2 small boundary check/C3 complete take review. **Do not crossfade over unexplained jump**, duplicate action or stretch seconds. For JOTA2 speaking actors First/Last cannot replace actual phoneme-driven native lipsync. Preserve no narrator on dialogue-only films and no music on JOTA1. This docs-only change does not authorize creating assets.

## New JOTA 2 speaking gate — before mass-generating scenes
For **visible speaking** characters, read [`DIALOGUE_SYNC_FIRST.md`](DIALOGUE_SYNC_FIRST.md): owner rejected V1 `740550` because animated mouths and separately generated native TTS were not synchronized. **One actual short Lipsync HD animal+Indonesian pilot must be listened to and watched** (`P3S_SYNC_READY`, `P4_AV_SYNC_ACCEPTED`) before bulk production. Silent motion clips are fine for genuinely non-speaking landscapes/crossing/reactions, NOT a way to make visible talking mouths with separately aligned TTS. If native animal lip-sync unavailable, fail closed rather than replacing VideoExpress provider or accepting fake sync. No narrator for dialogue-only film. Keep actual final-film audible+visual QA and owner publishing gate.

## Gate ZERO — immutable VideoExpress provider lock
Read [`VIDEOEXPRESS_PROVIDER_LOCK.md`](VIDEOEXPRESS_PROVIDER_LOCK.md). **Artistly AI supplies inspected source stills; VideoExpress AI remains the EXCLUSIVE engine for moving video and final native JOTA exports.** Apply [`ARTISTLY_VIDEOEXPRESS_WORKFLOW.md`](ARTISTLY_VIDEOEXPRESS_WORKFLOW.md) for still/scene matching and library folders. Any other engine-generated MP4 or slideshow is an **automatic reject**, no matter how closely it matches the requested topic, duration or style. Verify account, exact project, job/asset IDs and VideoExpress export provenance. If blocked by login, browser control, credits, API limitations or quality lock, record `BLOCKED_VIDEOEXPRESS`; never fall back to local rendering, Python/Pillow/FFmpeg/Blender, Sora/Higgsfield, other services or replacement edited video. Google Drive upload is not evidence of provider provenance. Check this rule again immediately before delivery.

## Gate A — Authorization and feasibility
- Confirm GOAL, exact project/repository/account, desired output (Shorts 9:16 default or 16:9 long), budget/credits, creative constraints, assets and age/privacy rights.
- Default to **PLAN ONLY** unless current user asks to create media. Never infer permission to publish.
- Validate available service capabilities and terms, account credits if observable, copyright/license usage, and headless feasibility. Reject any step requiring interactive popup/focus unless owner grants a separate explicit exception.
- Existing JOTA repository quality guard is *independent*. It remains active.

## Gate B — Research and story architecture
- Choose original ethical/emotional premise: e.g. amanah, sabar, jujur, syukur, birrul walidain, kindness.
- Record story type `FICTION` or `FACTUAL`; religious authority/verse/hadith metadata if present, qualified reviewer outcome, claim confidence, and source permission.
- Draft hook, understandable setup, dilemma, consequential choice, payoff, grounded takeaway, then single-sentence CTA only if needed.
- Define narration language and target audience. Scripts must be original, voice length tested, and revised before scene creation.

## Gate C — Lock creative world and characters
- Compose a `character_bible` and `world_bible` with immutable labels and neutral reference IDs, height relationships, wardrobe, colors, proportions, scene geography and lighting.
- Generate reference/start-frame art in **Artistly** *only with media authorization* and **16:9/9:16** aspect; independently inspect each source still at full size for the **selected mode's character policy** (JOTA_1 faceless; JOTA_2 coherent expressive faces). Reuse the exact accepted Artistly image after VideoExpress native import; record both providers' IDs.
- Reuse accepted references by stable ID. Tool Consistent Character or start-frame chaining is not a guarantee; if a face appears, reject/regenerate.

## Gate D — Narration and shot grid
- Break voice into meaningful beats, each tagged `SC01`, `SC02`, etc., with in/out timestamps, one main action, framing, emotional change, continuity prop and exact voice cue.
- Select a short visual chunk the service can actually render; never assume a provider's maximum clip duration is unchanged.
- Choose whether the verified capability supports audio-synchronized scene generation or separately generated narration aligned in the editor. Do not enable a paid third-party integration or import someone else's cloned voice without permission.
- **Sound per chosen mode:** `JOTA_1` no music, nature/Foley permitted; `JOTA_2` licensed/requested music and supported lip-sync allowed, not mandatory. Verify exact sound mix, source rights and no unwanted artifacts.

## Gate E — Per-scene prompt pack and approved opening frame
- Follow **[`VIDEOEXPRESS_SCENE_GENERATION.md`](VIDEOEXPRESS_SCENE_GENERATION.md)**, the mandatory scene card, independently authored JOTA prompt skeletons, face-safe staging and stop/go checkpoints. A two-line scene idea is **not** an approved production-ready prompt.
- For every SC ID, specify exactly who/what is **visible in this frame**, where the crop stops, approved cast/world/prop reference, coherent 2D style, one physical action, camera ending and off-screen narration. For face-risk shots, prefer empty landscape, isolated props, cropped hands or safe rear view; never portray any prophet/angel/Allah.
- Generate a properly composed source **Artistly opening still** (16:9/9:16), inspect and approve it, and import **that exact image** using VideoExpress **Import Media → Import from Artistly**. Record Artistly source-image ID plus VideoExpress imported-image ID / defensible provider evidence. The visible picker does not prove a public automation API or a successful import of a particular scene. If the still cannot be matched, block the scene.
- Keep recurring props (especially the ark) tied to one accepted visual reference; never trust only the words "same ark". Ensure no AI-generated text/glyphs; exact wording uses verified native editor overlays.
- Each prompt restates the **selected creative mode's** art/character/audio requirements: `JOTA_1` hand-painted 2D, faceless/no music/lip-sync; `JOTA_2` specified cinematic art, expressive faces and optional licensed music/lip-sync. No unrequested elements. Negative instructions **supplement**, never replace, positive safe composition.
- Save distinct versioned **Artistly image prompt**, **VideoExpress video prompt**, dialogue/audio cue and real source/import/video provider asset IDs in the episode **ASSET_MANIFEST.json**. Keep Artistly and VideoExpress collection names separate. Reject bad stills **before** video credit is spent; never invent provider identifiers.

## Gate F — Limited pilot, full-clip gate and bounded repair
- One proof scene first; inspect its **approved still** and **entire generated motion**, including turns, reflections, transitions and all animals; a few sampled images can reject but never certify the whole clip.
- Check correct art medium, subject count/crop, active body/prop movement, stable recurring assets, permitted sounds and real scene advancement. If the start still is unsafe or unknown, STOP that scene before video creation.
- Queue further scenes only after proof accepted and only within the **current explicit media order and authorized budget**. Use real VideoExpress project/job/library identifiers; a click, toast or file extension never proves render success.
- For each failure log scene/time, reason, existing IDs and one bounded change; reject the candidate, do not simply rephrase and retry indefinitely. After two same-mechanism failures perform root-cause investigation and one-variable testing. Accepted versions alone move to the timeline.

## Gate G — Assembly and sound
- Order accepted clips exactly as approved shot grid. Detect temporal overlap/blank gaps, repair continuity, and set audio clips to start times based on measured voice durations.
- Recheck mode-specific music and lip-sync: absolutely none in `JOTA_1`; licensed and desired sources in `JOTA_2`; nature/Foley permitted in both. Dialogue-only films still require distinct in-world actor voices **without narrator**. Verify Indonesian wording, reverence for scriptural phrases, loudness and subtitle legibility.
- Crop/reframe *at scene design time*, not careless 16:9-to-9:16 conversion.
- For mobile shorts default 1080x1920 subject-safe framing; confirm actual output codec/fps/length rather than assuming from UI.

## Gate H — QA and owner review
- Check every accepted clip **before timeline insertion** and then the full native VideoExpress export, not only 3 screenshots. Sampled keyframes alone are insufficient for JOTA_1 whole-clip faceless compliance; JOTA_2 still requires adequate full visual/expressive-character continuity QA. Automated detection may assist but does not replace whole-frame human review.
- QA also includes continuity of identities/props, temporal motion, ambience, factual/religious sources, licensing, child privacy, accidental public-gallery share, subtitles and source rights.
- If anything fails, regenerate the smallest affected asset, update the ledger and repeat checks. Export can be a **private review candidate** only; this is distinct from publish approval.

## Gate I — Delivery and publishing
- Save versioned **VideoExpress native** project and render, obtain final verified file path and media facts; retain Artistly/source-import identities and archive approved assets before their documented provider retention windows. Record `N planned = N accepted = N timeline` with explicit exceptions for editorial cuts.
- Share private download/preview for owner review; do not publish to YouTube, Postiz, or social platforms without a later explicit action specifying channel and visibility.
- Production locks, billing checks, release gates, rollback and account identity controls remain in force. No unconditional AUTOSHIP for media.

## Recovery
Keep a small `RUN_LEDGER`. On tab loss, work interruption, provider error, or source contradiction, reacquire the **specific verified project** and reconcile the inventory before any retry. Avoid conflicting ownership (other agents editing the same project). Stop after repeated matching failures and investigate instead of changing unseen state.
