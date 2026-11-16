# JOTA Film Director — Best-Frame/Trim/Link Continuous Takes (v2.3.0, 2026-10-24)

**Authoritative for JOTA_1 and JOTA_2 shot duration, shot extension and continuity.** Goal: believable professional *oner* (apparent uninterrupted camera take) even when a story beat requires >10 seconds and the video engine creates several shorter clips. Owner's 2026-10-24 direction: maximize useful individual-shot duration **up to 10 seconds** and avoid jump cuts through **inspect → choose clean connection frame → save → exact timeline trim → reuse as next first frame → verify moving seam**. This 2.3 amendment follows the [2026-10-23 Alex VideoExpress 3.5 luxury-vlog tutorial](https://youtu.be/u1rp6wbtH1M), which visibly describes saving a better frame *earlier* than an ugly last frame, trimming after that point, then continuing from `Use from Library` (My AI Images). JOTA additionally requires motion, environment and sound matching; those stronger acceptance gates are **JOTA rules, not claims made by the YouTube creator**. All moving video, lipsync, editor assembly and export remain **native VideoExpress ONLY**; Artistly creates actor/still references, not animation. A skill-only update authorizes **NO new media jobs**.

## Capability confidence and hard constraints

- VideoExpress officially advertises **"10 Second AI Video Clips"** and **"First & Last Frame: Image To Video"** on All-Access (https://videoexpress.ai/go/) and has a *Video Express 3.0: First Frame, Last Frame* training entry (https://videoexpress.ai/tutorials/). This establishes **advertised product features, not successful on-account, per-tool 10.0-second generation or a guarantee of continuity**.
- Previous authenticated VideoExpress JOTA2 HD animal lipsync pilot: duration **5.042s** even when six seconds were selected; never infer actual video duration from a slider or marketing text. Different algorithms (Image to Video, Lipsync HD, First/Last Frame) may have different duration limits, aspect support, credits and audio capabilities. Use the **exact observed feature's input limits** plus downloaded media metadata; do not assume one route supports every advertised All-Access capability.
- **Default target segment:** the longest *narratively useful* native VideoExpress-supported duration **up to 10.0s**; default try 10s for a complex action if its specific provider UI really exposes it. **Not a minimum.** Make a 3–5s reaction if it serves the film; do not stretch simple actions or claim 10s when actual result is 5s.
- A **scene** is a story unit; a **shot** is a visual continuous camera take; a **generated segment** is an individual provider video result. E.g. one 26s shot can contain 10s + 10s + 6s segments with two continuity joins. Scene cuts are allowed between intentional change of point-of-view; **do not force an artificial oner over a true change of time/location**.
- No source-ID guesses, hidden API, provider substitution, blind retry or automatic public posting. Existing JOTA pilot and V1 media are immutable. Creative-mode selection remains as already locked for an episode.

## Shot architecture — decide *before* images or generations

Plan at two levels:

1. **Film/scene**: goal, physical geography, character/story/emotional arc and exact dialogue turn ownership, whether the shot is an intentional cut or must feel unbroken.
2. **Continuous-shot plan** \`TAKE_ID\`: shot beginning position, camera/lens/height/axis, light direction, all visible actor/body/prop coordinates and gaze lines, environmental state, direction/speed of travel, audio bed and intended total time (e.g. 26s). Name exactly one principal action arc with intermediate milestones.
3. **Segment grid**: \`SEG01 0–10s\`, \`SEG02 10–20s\`, \`SEG03 20–26s\` *only as a planning target*. Real start/end times are **recalculated from each VideoExpress downloaded/native clip**. Add \`first_frame_ref\`, \`target_last_frame_ref\`, \`actual_last_frame_ref\`, \`parent_segment_id\`, \`videoexpress_job_uuid\`, \`clip_id\`, \`actual_duration\`, \`join_id\`, \`speaker_turn_id\`, \`dialogue_audio_ref\` where applicable. Store identities in production manifest, NOT as letters/IDs in image-generation prompts.
4. **Continuity invariants (DO NOT CHANGE at segment boundary)**:
   - Exact **same approved Artistly reference/actor bible** (face, clothing if any, texture, scar, scale and proportions); scene setting/props and occupancy;
   - exact 16:9 raster/frame and 2D/3D style; screen direction, eyeline, camera axis, apparent focal length, shot height, dolly/track direction **and velocity**, horizon/parallax geometry;
   - time of day, sun angle, key/shadow positions, color grade, weather, river/current, reflection, dust/rain and background movement;
   - same **physical action state** (hooves, body rotation, head angle and crocodile buoyancy), momentum and foot-to-ground contact, not restarting action or resetting to an earlier position.
   - **sound** environment continuous; for JOTA_2 visible dialogue, spoken content/actor identity/mouth visemes belong to the actual native audio-coupled talking generation (see below).
5. **End-pose continuity card**: before provider job, describe segment's attainable end composition (not a jump to an impossible future pose). Design the next segment's end target with the **same camera path and world**. In the same oner the camera cannot teleport, reverse direction or instantly become a close-up.

## Seam-first workflow — SELECT → TRIM → LINK (mandatory before every continuation)

**Do not automatically use `Save Last Frame` on the rendered file.** Per the linked tutorial, a generated clip can end on a deformed face/hand, camera jerk, unwanted framing or an extra action after dialogue. The usable continuity boundary can lie **earlier**. In the native VideoExpress timeline or supported player:
1. **Inspect** the preceding clip's final ~1–2 seconds (extend if needed) at normal speed and frame-by-frame when possible. Find the **latest clean, stable frame** with the actor still in frame, physically plausible stance/contact/hand pose, stable camera axis, a usable next-action position and an uninterrupted background/lighting state. Avoid blurred, distorted, transitional, occluded, mid-blink/mid-word or already-changing-scene frames. A less-late frame is preferred if the final one is bad.
2. **Save the CHOSEN full-resolution source frame** using native VideoExpress timeline frame save/snapshot (or `Save Last Frame` only if the true final frame itself passes). Locate the resulting image in `My AI Images` and record exact library ID, native clip ID and selected time/frame index. An extracted thumbnail, AI-regenerated lookalike or intended target last image is **not** the selected frame.
3. **Trim the PREDECESSOR at exactly that same frame** in the native VideoExpress editor; remove its tail after the selected point. Confirm displayed post-trim last frame matches the saved still, visually and by provenance/frame index where supported. Record `selected_frame_time`, `trim_end_time`, `effective_actual_seconds`. Never leave a defective few seconds in the exported timeline. If the UI cannot perform a verifiable exact trim, mark `SEAM_TRIM_UNVERIFIED` and **do not label the join seamless**.
4. **LINK** using VideoExpress `Create with AI → Create Video From Prompt → Use from Library → My AI Images` to choose that **same saved frame** as next segment's starting image, then set the correct next action, consistent-character/reference options as actually available, 16:9/9:16, privacy and useful duration (up to 10s where supported). The video's demonstrated route does **not require generating another start image**. Alternatively use native `First Frame/Last Frame` with the exact saved first frame and a *reachable* new last target when the user's observed interface supports this path; it must not replace the real boundary frame with an unrelated generated approximation.
5. **MOTION MATCH / QA:** inspect ~0.5–1 second of actual moving footage before and after the join. Match camera speed/direction, body momentum, foot/hand contact, eyelines, actor screen position/scale, wind/water motions, backgrounds, grade/light and ambience. Detect one-frame flashes, pose resets, drift, stutters, freeze holds, duplication and hard audio gaps; identical still at the boundary is **necessary but not sufficient**. Check the assembled take at normal speed. Keep the approved edit of earlier clips immutable; regenerate/revise the minimum affected successor or select a better predecessor boundary when necessary.

**Mandatory protection:** if speech ends in the clip, select the seam at or after a natural full-word/sentence boundary; never trim off part of a phoneme. For JOTA_2 visible dialogue, preserve the verified audio-coupled talking route and P4 listening/lip sync. A purely video-only First/Last mode cannot become true lip sync by adding separate TTS. For JOTA_1 retain full faceless/no music. For either mode, an intentional directorial cut is permissible but must be labelled a different shot, **not** an achieved continuous take.

**Two different frame concepts:** `planned_last_frame_ref` is a desired ending before generation; `rendered_raw_last_frame_ref` is the actual final frame of the untrimmed generated clip; `selected_seam_frame_ref` is the inspected frame extracted at the chosen boundary; **`actual_last_frame_ref` for continuity means the verified post-trim final displayed frame**. For `SEG[n+1]`, `first_frame_ref` MUST equal `SEG[n].selected_seam_frame_ref`, and `SEG[n].trim_end_time` MUST correspond to its source timestamp. No confusing a preplanned target with a real source frame.

## Actual First Frame / Last Frame chaining — mandatory for >10s oner

**SEG01:** Create/approve the initial frame with Artistly (existing character refs). Use VideoExpress native image-to-video or verified First/Last mode. If the native feature accepts two images, use \`F1 = approved start frame\` and \`L1 = planned end-target frame\` (prepared in Artistly or provider native saved frame); motion prompt specifies physical path, camera and intermediate beats. Capture provider job and **actual** clip.

**SEAM 01 → 02 (mandatory upgraded contract):** Inspect SEG01's real **moving footage at its ending**, select the **best usable** full frame (which may precede the raw final frame), save that exact native image to My AI Images, and **trim SEG01 to that same frame** before creating SEG02. The **trimmed** SEG01 final frame and its saved `selected_seam_frame_ref` must agree. SEG02's exact first-frame input `F2` is the saved image, not planned end target `L1`, the raw last frame that was discarded, a thumbnail, or a lookalike. Use supported native VideoExpress image-to-video from library or First/Last as appropriate and verify the selected reference/clip IDs. Pixel matching is subject to native import/transcoding; absence of a verified same-image link sets `CONTINUITY_SOURCE_BLOCKED`. Never call an untrimmed bad frame a seamless boundary.

**SEG02:** Supply `F2 = SEG01.selected_seam_frame_ref` as the **next first-frame image** via native VideoExpress `Use from Library` or verified native First/Last. Add `L2` only if using the supported First/Last route and the target is physically attainable. Specify continued action (not a new establishing shot/restart), preserve actor-in-frame and direction, generate once per version, inspect its new ending, select the next clean boundary, trim, and continue as `F3 = SEG02.selected_seam_frame_ref`. Save real IDs, selected times and the *effective trimmed* duration at each link.

**When First/Last mode lacks real supported two-image inputs, lacks verified output or silently changes style:** no false \`SEAMLESS\` claim. Investigate a small documented native VideoExpress alternative only if its controls and assets really exist. Do not insert another video generator or a local render to fake continuity. Native clip durations may cap under 10s; recalculate actual segment count using real results.

**Assembly:** place **already boundary-trimmed** real provider segments contiguously in one native VideoExpress editor **single visual track** in take order; bind each to native clip IDs and source in/out points. Use a **straight/zero-duration cut** only when motion and framing actually continue. Contiguous timeline tiles or identical stills do not prove smoothness. Inspect for a one-frame duplicate/freeze and, if necessary, trim the duplicate at exactly the supported frame boundary without removing natural motion or dialogue phonemes. Do not disguise a broken join with dissolve/wipe/fade or abrupt reframing. Keep ambience truly continuous (native audio-only crossfade when supported); never double speech. After timeline edit verify clip sequence, source trim positions, running total and actual export separately.

## Prompts: long-take planning vs per-segment text

Describe each source frame and target using actual natural imagery/actor positions, not technical IDs or metadata in the generator text.

**First/Last segment 1 (initial 0–10s example, Kancil river crossing):**

> An original 2D hand-painted cinematic Indonesian jungle river painting, wide horizontal 16:9, same exact small chestnut Kancil from the approved reference on the near-left banyan riverbank. Its cream chest, tiny pointed ears, dark-tipped tail, four grounded deer hooves and golden expressive eyes remain consistent. Buaya Tua, the original older olive crocodile from the approved reference, floats near the flat stepping stone to the right with warm yellow eyes. The first frame captures Kancil preparing to leap onto the crocodile. In one continuous slow tracking camera move from left to right with no cuts, Kancil bends its knees, launches from the same near shore, and lands with realistic physical weight on Buaya's armored upper back; river ripples follow the impact; the camera keeps moving right at stable speed. The last frame is the Kancil firmly planted on Buaya, torso and gaze pointing right, same sunlight direction and banyan receding slowly behind. No camera reset, no teleport, no duplicated hooves, no unexplained new crocodiles, no text.

**Next segment, first frame EXACT previous actual last frame, new target \`L2\`:**

> Continue **the same uninterrupted 16:9 camera take** from this exact opening image, without moving the camera or resetting the deer. The Kancil begins already standing on Buaya with all four hooves in the precise previous positions. Carry on the same gentle left-to-right tracking speed and golden key-light direction. In one believable leap Kancil travels from Buaya onto the next crocodile's fully visible back; its paws contact first, body weight settles, and water ripples spread naturally. The head, fur, scales, prop spacing, actor sizes and riverbank parallax do not jump or change. The planned ending is Kancil balanced on the second crocodile with a forward gaze, still traveling screen right. No zoom jump, new scene, shot change, title, or lip motions unrelated to speech.

The text is a **director intent**, not proof the model can create exact-pixel seams. Use the first/last image fields, the true actual last frame, and the inspection gate below. **Do not paste "SEGxx" labels or job IDs in generative imagery/audio prompts** (prevents unwanted text on video).

## Dialogue and audio at >10s continuity joints (never regress JOTA2 lipsync)

- **JOTA_1**: faceless and no music; no visible facial dialogue. River/forest ambience and permitted offscreen actor speech may remain continuous in native editor.
- **JOTA_2 silent-mouth action**: use VideoExpress native First/Last and link original quiet ambience across join. For **visible speaking actors**, the v2.1.1 \`DIALOGUE_SYNC_FIRST.md\` is stronger than the desire for a longer take: ***exact audible speech must drive mouth movement.***
- If the observed First/Last Frame route generates **video-only**, it MUST NOT be used to turn a mouth-moving animal into a speaker with detached TTS. Keep the mouth at rest and start a speaking closeup via verified **native audio-coupled Lipsync HD**, or use a supported native talking generation that accepts continued first/last refs plus audio **only when actually proven**.
- Prefer place seamless segment joints at a **natural speech pause / after the full line**, with an uninterrupted native roomtone/river ambience track. A line must not be split across two independent lip-sync renders mid-syllable; if supported native tooling cannot preserve dialogue identity/viseme clock across a join, declare **\`LIPSYNC_CONTINUITY_BLOCKED\`** and design a legitimate motivated camera cut to a *non-talking* reaction/river/prop, never fake continuous speech.
- An intentional cut from a long, camera-moving wide to a one-character talking closeup is a **different shot** (normal professional cinema), not a broken oner. Distinguish editorial cuts from failed continuity.

## Quality is built in, but don't claim "seamless" from prompts alone

**C0 — pre-generation take plan:** \`TAKE_ID\`, actor/reference and world lock, duration target (max 10s *per segment only if supported*), camera pose/velocity/lens, boundary motion, actual intended cut vs oner, continuity target, sound/voice plan, authorizations. PASS allows SEG01.

**C1 — selected-frame/trim identity gate:** inspect predecessor ending; record `raw_last_frame_ref`, `selected_seam_frame_ref`, selected timestamp/index and reason for rejecting any bad raw last frame. Save the native image in My AI Images; trim predecessor **exactly** to it; confirm `trim_end_time` and `effective_actual_seconds`. Verify successor `first_frame_ref` uses that same saved source asset (and optional planned attainable target only for First/Last). Verify supported VideoExpress route, privacy, resolution, mode and real clip IDs. **NO PASS** if selected image and trimmed predecessor do not agree or if only a similar image is used.

**C2 — dynamic seam verification (required):** after each native segment inspect native real **moving footage** around the **trimmed** predecessor end and successor start (suggested ~0.5–1s each, not a guaranteed metric). Check last pre-trim body/hand/foot trajectory and first successor movement, camera direction/speed, matching actor/prop location and scale, light/background geography and sound. Reject freeze, duplicated held frame, temporal jump, vanishing character, impossible movement, audio pop or clipped syllable even when both stills match. If visibly discontinuous, do not append blindly; revise the minimum affected join using a better stable boundary or targeted next clip, preserving approved prior assets and source IDs.

**C3 — assembled apparent oner QA:** watch/listen every completed chained take at normal speed in the native editor, especially its two joins; audit for jump-cuts, camera direction reversal, changing animal sizes, lighting shift, teleporting, double animation beats, repeated dialogue or audio discontinuity. Verify native final export and owner acceptance separately. Visual seam PASS is **not** native P4 lipsync PASS. Source still references, actual clip IDs and short joint-QA status logged per join.

**FAIL states**: `DURATION_CAPABILITY_UNVERIFIED`, `FIRST_LAST_UI_NOT_VERIFIED`, `CONTINUITY_SOURCE_BLOCKED`, `BEST_SEAM_FRAME_UNVERIFIED`, `SEAM_TRIM_UNVERIFIED`, `FIRST_FRAME_LIBRARY_MISMATCH`, `SEAM_CAMERA_DISCONTINUITY`, `SEAM_MOTION_DISCONTINUITY`, `SEAM_ACTOR_OR_PROP_DRIFT`, `SEAM_TIME_FREEZE`, `SEAM_AUDIO_DISCONTINUITY`, `LIPSYNC_CONTINUITY_BLOCKED`, `OWNER_QA_PENDING`. Any "UNKNOWN" is not PASS; no authorization to bypass required review or change provider.

## Minimal versioned shot/take manifest (example; IDs are placeholders)

\`\`\`json
{
  "take_id": "TAKE_RIVER_CROSSING",
  "scene_id": "SC07",
  "mode": "JOTA_2",
  "editor_aspect": "16:9",
  "planned_total_seconds": 26,
  "continuous_camera": true,
  "world_reference": "RIVER_A",
  "camera_lock": {
    "axis": "near shore to far shore, movement screen left to right",
    "apparent_focal_length": "50mm-equivalent",
    "height": "animal-level",
    "movement": "constant slow rightward tracking",
    "sunlight": "golden upper-right"
  },
  "segments": [
    {
      "id": "SEG01",
      "target_seconds": 10,
      "actual_seconds": null,
      "first_frame_ref": "VERIFIED_ARTISTLY_START_IMAGE_ID",
      "planned_last_frame_ref": "VERIFIED_END_TARGET_IMAGE_ID",
      "raw_last_frame_ref": null,
      "selected_seam_frame_ref": null,
      "trim_end_time": null,
      "effective_actual_seconds": null,
      "actual_last_frame_ref": null,
      "videoexpress_clip_id": null
    },
    {
      "id": "SEG02",
      "target_seconds": 10,
      "actual_seconds": null,
      "first_frame_ref": "MUST_EQUAL_SEG01_ACTUAL_LAST_FRAME",
      "planned_last_frame_ref": "VERIFIED_END_TARGET_IMAGE_ID",
      "videoexpress_clip_id": null
    },
    {
      "id": "SEG03",
      "target_seconds": 6,
      "actual_seconds": null,
      "first_frame_ref": "MUST_EQUAL_SEG02_ACTUAL_LAST_FRAME",
      "planned_last_frame_ref": "VERIFIED_FINAL_POSE_IMAGE_ID",
      "videoexpress_clip_id": null
    }
  ],
  "joins": [
    {"from": "SEG01", "to": "SEG02", "selected_seam_frame_ref": "NATIVE_SAVED_IMAGE_ID", "selected_frame_time": null, "trim_end_time": null, "previous_trim_verified": false, "next_first_frame_matches": false, "motion_qa": "NOT_RUN", "boundary_qa": "NOT_RUN"},
    {"from": "SEG02", "to": "SEG03", "selected_seam_frame_ref": "NATIVE_SAVED_IMAGE_ID", "selected_frame_time": null, "trim_end_time": null, "previous_trim_verified": false, "next_first_frame_matches": false, "motion_qa": "NOT_RUN", "boundary_qa": "NOT_RUN"}
  ],
  "dialogue_policy": "No visible unsynchronized speech; use native synchronized talking route for on-camera dialogue"
}
\`\`\`

The JSON is a **conceptual plan** and not evidence that these clips were generated. Actual shot/segment durations and frame IDs must come from real VideoExpress results; update the manifest as each clip is completed. Focus on **fewer visible cuts and better continuity**, not making every single camera shot exactly ten seconds.
