# JOTA cinematic dialogue film — Artistly stills + VideoExpress dialogue v2.1 (sync-first)

**Task type:** one-minute or longer short-form fictional cinema where the story is told by **character-to-character dialogue**, not by a narrator. Inherits `../SKILL.md`, `VIDEOEXPRESS_PROVIDER_LOCK.md`, `ARTISTLY_VIDEOEXPRESS_WORKFLOW.md`, `VIDEOEXPRESS_SCENE_GENERATION.md`, `FACELESS_CHARACTER.md` **for JOTA_1 only**, `QA_RELEASE.md` and the selected playbook. Artistly generates stills only; VideoExpress generates moving video and final native export. This is **independently authored JOTA guidance**; third-party workflow/skill prose, demos, film characters and reference images are not assets to reproduce. A script or skill change does not itself grant media creation or publishing permission.

## Speaking shot architecture v2.1 — owner feedback on film V1
For visible talking characters, **audio must drive the mouth**. Previous Kancil private VideoExpress export `740550` composed silent clips with 12 detached TTS segments and failed the owner's sync/natural voice acceptance. The new authoritative [`DIALOGUE_SYNC_FIRST.md`](DIALOGUE_SYNC_FIRST.md) replaces that method for `JOTA_2`. Do not treat simple timeline alignment as mouth sync. Verify real `Lipsync HD Video` combined A/V or another native audio-coupled UI route with a small 2D animal pilot before full-film production, with `P3S_SYNC_READY` and `P4_AV_SYNC_ACCEPTED`. If animal lip-sync fails, STOP the bulk run and inspect supported native alternatives. Keep JOTA_1 faceless/no lipsync unchanged. Real human audiovisual review is indispensable for conversation naturalness.

## Dialogue director P3 — required before voice/lip-sync jobs
Read [`PROMPT_DIALOGUE_DIRECTOR.md`](PROMPT_DIALOGUE_DIRECTOR.md), [`CHARACTER_CONSISTENCY.md`](CHARACTER_CONSISTENCY.md) and [`FILMMAKER_PREGEN_QC.md`](FILMMAKER_PREGEN_QC.md) before any new dialogue production. Every speaking turn needs named `actor_id` and actual reusable voice/audio asset ID when available, exact **spoken-only line**, measured/estimated timed window, listener reaction and framing, JOTA mode, and licensed music/ambient scope. The VideoExpress UI exposes Lipsync HD but animal 2D-specific efficacy is **unverified**. Do not claim the lipsync works based only on menu visibility; for JOTA 2 use a permitted small one-speaker proof once generation is authorized, and if necessary a versioned dialogue reaction cutaway approved by owner. For JOTA 1, no mouth animation or music. The main QC effort is pre-gen. After actual render do a brief lip/audio/actor sanity preview plus full private film playback at release; a prompt is not proof of synchronization.

## Dialogue is permitted in both modes; facial animation is mode-specific
A new film must be explicitly locked to `JOTA_1` or `JOTA_2` using [`CREATIVE_MODES.md`](CREATIVE_MODES.md). Dialogue-only and narrator-led are story dimensions independent of mode: don't add a narrator to a dialogue-only film in either creative mode. `JOTA_1` forbids mouth/lip-sync and music; `JOTA_2` permits requested supported speaking faces/lip-sync and properly licensed music.

**In JOTA_1 only**, the "no lip-sync / all humans and animals faceless" rule is absolute. A *dialogue film* is still possible:
- Every line is performed **in-world by an identified character** on a rights-cleared VideoExpress TTS/audio asset. For `JOTA_1`, eyes/mouth stay blank; for `JOTA_2` expressive speaking faces and supported lip-sync are allowed. Neither mode adds an omniscient narrator to dialogue-only scripts.
- Identify the speaker by framing, body orientation, posture, ear/tail/hand gesture, reaction shot, spatial sound placement and preceding shot. The character is not merely a narrator describing the action.
- Script a beat for the listener after each meaningful line. Separate action from dialogue: describe the visible bodily response in the motion prompt, and align recorded character voices to editor timeline cues.
- If VideoExpress interprets quoted text as on-screen speech/lip-sync or generates faces, do **not** embed spoken lines in the visual motion prompt. Use the provider's supported **separate voice/TTS/editor audio track** after observing that workflow works. Never present a synthetic mouth or mouthless sound as lip movement.
- If the authorized VideoExpress UI cannot provide separate assignable voices for this project, record `CHARACTER_AUDIO_BLOCKED` (not "narration added") and do not replace the engine.
- **JOTA_1 prohibits music; JOTA_2 allows user-requested rights-cleared music**, while natural ambience is always allowed: flowing river, wind in leaves, occasional birds, gentle rain, footsteps, and physical-action Foley. Mix these below dialogue and review the complete soundtrack to exclude melody/songs/synthetic noise. Never assume an audio track is music-free without listening.

## Original visual art direction for cinematic 2D

- Original hand-drawn, hand-painted 2D storybook animation inspired by broad classical Japanese animation craft: warm watercolor backgrounds, layered cel movement, textured foliage, natural light, composed silhouettes, and believable weight. **No replication of Studio Ghibli characters, backgrounds, shots, layouts, logos or soundtracks**; "Ghibli" is a user mood reference, not a provider asset or an instruction to copy protected visuals.
- For each project, lock: palette and painted medium; visible character species/silhouette/markings; recurring prop geometry; river/road layout; time of day; aspect ratio; direction of screen movement. Repeat lock in *each* self-contained scene prompt. Reference approved stills where supported.
- Dialogue may be emotionally precise without literal facial expression: shift weight, stop mid-action, tense shoulders, wag/retract tail, rotate ears **without exposing a facial surface**, lean forward, pause, follow a companion.
- For **JOTA_1 only**, prefer back, dorsal/top-down, cropped body, shadow without faces, long shot framing for animals. A crocodile's snout, eye, nostril or teeth detail is not a faceless exemption. Never rotate the camera into a blank face and later rely on text exclusions; the frame must be physically face-safe.

## Cinema grammar and shot-to-shot continuity

1. Set a global **screen geography / 180-degree axis**: e.g., near bank always left, destination bank right. State each camera side of the line, subject and eyeline/bodyline orientation. Do not reverse travel direction after a cut unless a clearly motivated new axis is established.
2. Plan a readable progression of wide establishing, medium dialogue, reaction/insert and motivated action shots. Avoid endless equal-length still images with camera-only zooms; every shot must change a physical/psychological state.
3. Use **lens-equivalent** framing as an art/shot instruction only (28 mm wide, 50 mm medium, 85 mm compression). Do not claim the VideoExpress model provides calibrated real lenses. One specified camera move per generated clip, with exact opening and ending composition.
4. Record `shot_id`, time range, approved start image ID, source/destination screen coordinates, subject count, main physical motion, lens/framing, camera movement/end, character dialogue ID/audio range, Foley and last-frame handoff.
5. Plan cuts at logical action or dialogue beats; do not cut midway through an unfinished syllable. Make explicit 0.3–1.0s reaction/breath/room-tone spaces where the scene affords them. Never create artificially sustained blank footage.
6. **Timing is provisional** until the actual recorded voice is measured and the editor timeline inspected. Do not speed voices to force a six-second grid. If a sentence overruns, rewrite or rebalance a shot before generating additional expensive footage. Check the provider's currently supported shot-length control, rather than asserting a perpetual 3–10 second limit.
7. Generation stills are **unlettered**; captions/titles/subtitles are made with reviewed native VideoExpress editor text, not AI-painted visual glyphs.

## Scene prompt and recorded audio separation

For each shot produce **three distinct blocks**, never mix the spoken dialogue text into an image prompt:
- `[SCxx-IMG-vN]`: the **Artistly-generated** safe opening still in original 2D and exact 16:9/9:16, subject count/crop, wardrobe/species, surrounding geography, material, negative space and lighting. Inspect and approve actual Artistly still, then confirm matching imported item in VideoExpress before motion.
- `[SCxx-VID-vN]`: a VideoExpress motion prompt grounded on the **observed and identified VideoExpress-imported Artistly still**; subject's physically visible beginning/change/ending plus one camera move. Selected-mode creative rules persist: `JOTA_1` faceless/no lip-sync/no music; `JOTA_2` expressive faces, optional requested supported lip-sync and licensed music. Universal no-unintended-text, identity/rights/privacy/provenance guards persist. Use silent video generation where the verified provider controls allow audio to be added later; otherwise render transient clean Foley and check actual output.
- `[SCxx-DIA-vN]`: **not a video prompt**; editor/audio cue: speaker ID, exact Indonesian line, cue start/end, voice identity, delivery, pan/distance and listening character gesture. The character should seem to speak within the story even while the visual has no mouth. No narrator track exists.

If text-to-video provides no controllable start-frame references for required character consistency, do not claim those constraints held; prefer a verified VideoExpress image-to-video route or mark the applicable scene blocked.

## One-minute planning

- Default `10 shots x 6s = 60s` **is a screenplay target only**. Actual sound timing and VideoExpress available durations may force a revision; the sum of accepted clips and edits must equal the intended final duration.
- Two speaking characters, one voice track per character (plus optional sound effects); avoid more than one long spoken line per 6-second shot.
- A no-narrator script has a **dramatic exchange**: desire -> obstacle -> proposal -> response -> decision -> action -> consequence -> character acknowledgement. Do not convert a monologue into a "dialogue film" by printing speaker labels on a storybook.
- For dialogue exchanges, use cuts/reactions and recognizable left/right placement. Distinguish vocal register by pitch/timbre/pace, not real-world impersonation.

## On-set / provider gates (no autonomous generation)

1. **PROJECT/RIGHTS**: verified intended Artistly account/still-image folder and VideoExpress account/project, budget, current user **media generation authorization**, private-gallery OFF, original assets. Owner explicitly permitted scoped active Chrome control on 2026-10-22; browser access alone is not permission to generate on skill-edit tasks, extract credentials or automate unattended.
2. **SCRIPT**: title, character voices, timed lines, exact *zero narration* constraint, world geography and 2D look accepted as production target.
3. **IMAGE**: Artistly source still reviewed using **selected-mode facial/anatomy quality** (faceless only for JOTA_1; expressive character identity/continuity for JOTA_2), no unwanted text, intended style and geography; imported image in VideoExpress is exactly the approved still. Unknown or failing still blocks the motion step.
4. **MOTION**: generate bounded take after image acceptance; identify project, provider job, clip ID and sample first/last frames. Inspect **all frames** before scene acceptance, paying attention to facial artifacts during head turns and crocodile wakes.
5. **DIALOGUE / AMBIENCE**: use distinct named character voices on supported VideoExpress native audio/TTS/editor tracks; no narrator for a dialogue-only film, no fake speaker attribution. `JOTA_1`: no lip-sync or music, clean nature/Foley. `JOTA_2`: supported/requested lip-sync and rights-cleared music permitted. Listen to the full mix. Listen from start to end.
6. **ASSEMBLY**: check shot order, screen direction, visual action, dialogue cues and turn-taking, foley, transitions, exact 16:9 framing, export identity.
7. **REVIEW**: full video and rights/**mode-specific facial quality**/audio/story QC; private native VideoExpress export only. Explicit owner candidate approval is separate from authorizing generation; publication requires another instruction.

## Known failure cases / repair routing

- Voice sounds like a narrator, or all characters share one disembodied voice -> FAIL `DIEGETIC_VOICE`: separate named actor voice tracks and frame reactions.
- `JOTA_1` only: quoted dialogue causes animal mouth/lips to appear -> FAIL `FACELESS_DIALOGUE`: remove spoken text from motion prompt and rebuild a safe visual clip; keep dialogue only in voice timeline.
- Shot suddenly flips river banks or changes species markings -> FAIL `AXIS/CONTINUITY`: use the locked layout and last accepted frame, redo only linked bad shots.
- `JOTA_1` only: crocodiles gain eyes/nostrils/teeth on head turns -> FAIL `ANIMAL_FACELESS`: physically keep camera above/behind, reject full generated clip.
- A beautiful near-static still with floating-camera movement but no action -> FAIL `STORY_MOTION`: replace with legible character/object movement and a motivated cut.
- Generated subtitles/title corrupt -> FAIL `EDITOR_TEXT`: blank generated frame and verified native overlay.

**Evidence rule:** a passed prompt checklist never equals passed video; recording voice or a screenshot does not equal completed one-minute movie; a provider-origin verified export still requires full QA and owner acceptance.
