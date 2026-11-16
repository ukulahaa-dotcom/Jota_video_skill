# JOTA VideoExpress — Cinematic Motion Prompt Director (P2, v2.2 continuity-aware)

**Job:** turn an **actual approved Artistly frame**, identified in the VideoExpress native library, into a believable film shot. VideoExpress is the **only JOTA moving-video generator** and native exporter. The Artistly reference and frame source ID are prerequisites; never render from an imaginary screenshot or a text-to-video fallback that loses canonical cast identity.

## P2 new camera continuity contract — longest useful ≤10s + First/Last for extended shots
For a shot that needs 10s or longer, read [`CONTINUOUS_SHOT_FIRST_LAST.md`](CONTINUOUS_SHOT_FIRST_LAST.md) and include a take/segment plan **before** expensive media jobs: `TAKE_ID`, physical start and attainable end pose, camera lens/axis/height/velocity, character/reference and prop positions, environment/lighting, target ≤10s and **actual native duration afterward**, `planned_last_frame_ref` and `actual_last_frame_ref`. VideoExpress advertises 10s All-Access but specific generator must really support it; don't claim or enforce fictional 10s after a shorter output. For `SEG02+`, first input = **verified exact end image of prior real VideoExpress segment**; last input = reachable planned next pose. Use native First Frame/Last Frame if two fields and image identities are observed; no external rerender/fake source. Frame-to-frame continuous physical velocity, water reaction and rightward camera movement must continue, no recast, lighting jump, action reset or stylized transition. After render quick-check seam adjacent last/first 0.5s and revise only failing segment. Do not claim seamless without actual short moving-video inspection. Visual mouth movement with spoken dialogue requires proven VideoExpress native audio-linked Lipsync HD route, not First/Last video-only plus later TTS.

## Hard P2 audio scope distinction — JOTA2
`Video Only` is available **ONLY when no visible character mouths audible dialogue in this shot**: establishing scene, travel/physical action, or a deliberate non-speaking cutaway. The prior JOTA2 Kancil 60s film used `Video Only` for expressive speaking-mouth shots, then separately placed TTS. Owner found out-of-sync audio. For a speaking actor **do not use the example's VIDEO ONLY setting**; follow [`DIALOGUE_SYNC_FIRST.md`](DIALOGUE_SYNC_FIRST.md) and native VideoExpress audio-coupled `Lipsync HD Video` after pilot validation. `P3S_SYNC_READY` and `P4_AV_SYNC_ACCEPTED` are mandatory. Do not generate silent mouth motion and claim later timeline alignment equals speech synchronization.

## Evidence / supported workflow selection

Authenticated VideoExpress `Create with AI` menu observed 2026-10-23: `Create Video From Prompt`, `Image to Video`, `Lipsync HD`, `Narrate`, `Consistent Character`, `First Frame, Last Frame`, `Stylize Character`, `AI Sound Maker`, and legacy `Image To Video / Lipsync Video`. Public [v3 tutorials](https://videoexpress.ai/tutorials/index.html) list image/video, lip-sync and first/last frame. **Presence in menu is not evidence of successful rendering, exact quota, prompt-field length, or stylized animal-specific feature performance**. Inspect the authenticated generation form once per session and select the route actually supported for the intended shot.

**Preferred production path (supported from prior native import evidence):** approved Artistly source `SCxx-IMG-vN` → native VideoExpress imported image `ve_source_id` → `Image to Video` / `Create Video From Prompt` using that exact reference. Use the `First Frame, Last Frame` path **only after** confirming both frames and the feature's cost/function support; end-frame reference is optional, not invented.

## P2 scene-card fields — built-in professional direction

| Category | Required decisions made before submit |
|---|---|
| Reference identity | `creative_mode`, `scene_id`, `IMG-vN`, exact approved `artistly_image_id`, matching `ve_imported_image_id`, exact `VID-vN`, locked character/world IDs |
| Format/safety | editor **AND generation form** 16:9, original 2D for Kancil, private gallery OFF, correct `Image Type`, duration supported by current form, credit budget, no duplicate job |
| Shot and axis | lens-equivalent intention (not guaranteed physical optics), subject camera-left/right, camera height, eyeline and cut point to next shot |
| Starting state | EXACT same image as opening frame, initial actor pose, contact/prop/water positions, gaze/expression in JOTA 2 |
| One meaningful primary action | physical action verb + what moves, direction, distance/intensity, interactions and reaction; one primary action per clip |
| Motion physics | weight transfer, joint limits, water ripples/reflections, foot/stone contact, cloth/fur inertia and shadow change; consistent background |
| Time beats | `0–2s / 2–4s / 4–6s` only if actual clip length is 6s; otherwise scale beats to verified chosen duration |
| Camera | static/slow dolly/track/pan OR intentional handheld: one selected move, clear speed/direction, no random orbit/zoom |
| End state | deliberate pose/reaction/readable hold and physical place to cut; match next shot's geography and timing |
| Sound scope | Video Only if dialogue will be added in separate native track; otherwise specify precise supported live-dialogue/lipsync path; avoid contradictory simultaneous audio instructions |
| Negative drift | no unplanned actors/objects/extra limbs, morphing, style drift, camera flip, jump cut, accidental subtitles/logos, changing identity |

## Motion prompt compiler and lint

1. **Attach actual reference:** Resolve `ve_imported_image_id` and ensure preview shows the approved Artistly image; the prompt cannot replace source asset selection.
2. **Validate cast/physics:** K1 and C1 keep bible anatomy/proportions. Facial movement is **allowed and useful in JOTA 2**; do not copy JOTA 1's eye/mouth exclusions to JOTA 2.
3. **Stage action with screen direction:** one actor step + response is too much if six seconds cannot carry it. Use a shot/reverse-shot or separate physical reaction.
4. **Timeboxes:** allocate enough for visually readable action. Avoid impossible speed or simultaneous pan+dolly+zoom unless deliberate and actually supported.
5. **Camera and continuity:** same sunlight side and geography, no source image flip, no changing number of characters.
6. **Render setting lint:** provider set `16:9` twice (editor and generator), `2D`, requested supported length, `public gallery OFF`, text/auto enhancer OFF if it risks rewriting identity, `Video Only` or chosen lip-sync path, no unrequested narration/music. **Never blindly enable Video Only and Lipsync HD together.**
7. **Credit/idempotency:** one job per `SCxx-VID-vN`; capture accepted UUID; don't resubmit a pending/unknown job.

## Canonical VideoExpress motion prompt (replace placeholders)

```text
[PROJECT:<id> / <SCxx> / VID-vN / MODE:JOTA_1|JOTA_2]
SOURCE START IMAGE: EXACT VideoExpress imported asset <VE_IMAGE_ID>, originating from approved Artistly <ARTISTLY_SOURCE_ID> (IMG-vN). Start frame is identical. Reference actors <character_ids and version refs>; never replace/add characters.
SHOT GOAL: <one physical story beat with dramatic intention>.
CAMERA: <WS/MS/CU>, <lens-equivalent intent>, at <height>, <STATIC or one move at clear speed/direction>; axis <LEFT/RIGHT>, hold background landmarks <...>.
TIME (clip length <N>s, from supported form):
  0-<a>s: <initial expression and measured physical preparation>.
  <a>-<b>s: <one primary action with direction, distance, object/water contact and real consequences>.
  <b>-<N>s: <reaction/settle pose and clean cut end>.
ACTING: <character-specific gesture, gaze and mood>. JOTA_2: coherent natural eye/mouth/ear/tail expression where visible, stable face. JOTA_1: no facial features/lipsync.
WORLD LOCK: fixed <river bank geometry, props, color, sun direction, cast/body markings>.
PHYSICS: <weight shift, water displacement, shadow/reflections, limb articulation, inertia>.
CONTINUITY END: <specific ending pose/composition> prepares next shot <SCnext>.
AUDIO SCOPE: <VIDEO ONLY, audio dialogue comes from P3 later OR supported integrated live dialogue P3 explicit>; no random narration or unlicensed music.
AVOID: identity morphs, surprise extras, extra limbs, floating feet, animal size drift, duplicated eyes/teeth, text/logo, invented props, camera flip, unrequested cuts, photoreal/3D drift.
```

## JOTA 2 Kancil cinematic example — SC03 motion (NOT SUBMITTED)

```text
[JOTA-PB01-KANCIL_BUAYA / SC03 / VID-v2 / JOTA_2]
Use the EXACT VideoExpress imported Artistly SC03-IMG-v2 source frame <VE_IMAGE_ID>, visually matched to approved image <ARTISTLY_SOURCE_ID>; actor K1 mouse deer and C1 crocodile maintain approved reference versions. 16:9, original watercolor-cel 2D, six-second medium 50mm-equivalent riverbank two-shot, camera tripod stable at 1.2m; banyan and grey stones LEFT, far guava tree RIGHT, afternoon key from upper RIGHT.
0.0–1.5s: Kancil stands on rear hooves with front hoof lifted, turns curious amber eyes toward the crocodile; C1 watches from water.
1.5–3.5s: K1 places one front hoof carefully down on flat grey stone (visible hoof/stone contact and balanced weight), leans forward to pose the question; tail moves once and ears tilt slightly.
3.5–6.0s: C1's yellow-brown eyes narrow skeptically, its broad snout rises a few centimeters, creating soft water rings spreading outward and aligned reflected highlights. K1 holds its concerned grin; end on C1's response look for shot/reverse-shot cut.
Stable K1 cream throat/chestnut coat and C1 ochre shoulder scar/moss scales, natural animal limb count, believable crocodile buoyancy and surface ripples. No added third animal, unnecessary camera fly-around, floating hooves, surprise mouth/eye duplications, changing river geography, CGI texture or text. VIDEO ONLY: do not generate speech or a musical score during this motion pass; P3 adds distinct K1/C1 voice cues.
```

The example assumes **verified scene still and VideoExpress source assets** to be filled into placeholders. It is not yet an approved active production job and should not be submitted without actual IDs.

## Motion QC budget

**PRE-GEN hard block:** references match, one action, feasible beats, camera, physical consequence, continuity, exact aspect and private settings. Prompt quality PASS can be asserted locally without credits.

**POST-RENDER quick check (minimum):** one actual playback/check of first–middle–end for identity drift, action readable and duration/ratio, plus obvious audio/face anomalies. For an intentionally subtle reaction shot, explicitly record `INTENTIONAL_HOLD` in scene card; if static without narrative purpose, mark `MOTION_WEAK` and do not call it accepted. Detailed all-frame inspection only on meaningful suspect cases or required final-cut review—not on every routine clip.

**Meaningful render status progression:** `P2_MOTION_READY` → `VIDEO_JOB_SUBMITTED` → `VE_CLIP_RENDERED` → `RENDERED_QUICK_REVIEW` → `FINAL_QA_PASS`. No output acceptance based only on a well-written prompt.
