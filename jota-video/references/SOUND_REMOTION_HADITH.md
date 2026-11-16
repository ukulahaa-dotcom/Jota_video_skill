# JOTA Sound Design, ElevenLabs, Remotion Text Animation & Hadith Reference

Decision: owner 2026-11-05. **Design spec for skill v3.98.0**; the completed output is an updated native Google Sheet *template*, not a functioning Sheet→ElevenLabs→Remotion→Runner adapter.

**Native Sheet master (JOTA Automation):**
https://docs.google.com/spreadsheets/d/18sDM9tPsWxQ2IUKAbiRGcbjvVQRE3Gr7nysw9pgQzP0/edit

## A. Keep a complete film soundtrack plan, not one field called "sound"

Each storyboard `SHOT_ID` carries `AUDIO CUE IDS`, `VOICE PROFILE ID(S)`, `HADITH SOURCE ID`, and `REMOTION OVERLAY IDS` linking actual rows in `AUDIO_CUES`, `VOICE_MASTER`, `HADITH_SOURCES`, and `TEXT_ANIMATION`/`REMOTION_PRESETS`. `RUNNER_MANIFEST` references the same IDs and separate audio, text, and assembly statuses; **image/video approval is not final audio/title approval**.

Create one row **per actual audible event** in `AUDIO_CUES`. Events are *not* forced into every shot; `SILENCE` with an intentional reason is allowed.

Sound categories:
- `DIALOGUE`: exact speaker, Indonesian dialogue, registered voice identity, approved TTS audio asset; timeline position and gain.
- `NARRATION`: separate narrator voice ID; source verified if quoting a hadith, no voice changing between shots.
- `AMBIENCE`: wind, room tone, night crickets, classroom air, rain, distant traffic as appropriate; looping only when actually continuous.
- `FOLEY`: footsteps per foot contact, cotton sleeve rustle, hand-phone contact, door taps exactly aligned with real contact, paper picked up with a plausible source and physical interaction.
- `SPECIAL_SFX`: other motivated special sound effects (e.g. a dramatic thunder clap that genuinely happens within the story). Never add flashy sound effects without a visible/narrative cause.
- `TRANSITION_SFX`: only if a deliberate approved film transition uses it; never automatic whooshes everywhere.
- `SILENCE`: intentionally no voice/SFX at a particular moment.

For every cue record `CUE_ID`, `SHOT_ID`, triggering action/contact and actor, `TYPE`, onset and duration in **seconds relative to the shot** (the final Video Prompt remains timestamp-free), provider/source, `VOICE LOCK CODE` if spoken, exact **ElevenLabs SFX text prompt** or existing library asset ID, output audio link/ID, pan/gain/mix position, loop yes/no, no-music lock, generation status, owner approval and QC evidence.

### ElevenLabs Sound Effects policy

- Use ElevenLabs **Sound Effects** generation for discrete ambience/Foley/special sound design, **not** background music. Prefer a **single physically coherent sound per generated asset** and combine layers in the final soundtrack for precise timing. Example: one shoe hitting a wooden floor; reuse twice at their actual ground-contact times.
- Specify material, action, location, distance and desired texture in the prompt. Include `no speech, no music` for nonvoice effects. Don't request a nonexistent cause (e.g. a ringtone when a phone is simply lifted).
- Save each approved asset with a stable ID and link. **Reuse approved ambience and sound effects** across shots/episodes when settings are identical; this reduces generation latency and preserves sonic consistency.
- Sound Effects API supports setting duration and looping; use the model ID explicitly after compatibility testing. The ElevenLabs v2 model is documented as deprecated in favor of v3; don't rely on a default without checking. Product docs: https://elevenlabs.io/docs/overview/capabilities/sound-effects ; https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert . Use actual pricing/settings from the connected account if needed; no invented credits or timings.
- Voice dialogue/narration is a **different asset-generation operation** from Sound Effects. Track actual ElevenLabs voice ID and settings in `VOICE_MASTER`; **never use merely a human-readable nickname** as provider voice ID. Each shot explicitly resolves the required voice profile even when the previous shot used another speaker. `NONE` means no spoken audio, not an invitation to invent dialogue.
- Explicit **NO MUSIC** per project, track and soundtrack. Generated SFX with stray melody or voices is rejected. Avoid audio duplication between retained native VideoExpress track and post-added SFX: define which audio track is authoritative; when separate audio is approved, mute conflicting native video sound during assembly (do not double-layer). Do not discard native audio automatically without first knowing whether it contains useful Foley and no music; owner/project settings decide.

## B. Remotion-only role: graphics and text overlays

Owner asked for Remotion text animation. `TEXT_ANIMATION` is the shot-timed text ledger; each row maps to an existing `REMOTION_PRESETS` React composition and a unique overlay asset ID. Remotion may render **typographic overlays only** (titles, subtitles, captions, Arabic hadith text, Indonesian translation, attribution) — it is **not** authorized to replace VideoExpress in generation of moving character scenes. Existing provider/video export lock still applies until owner authorizes a new assembly backend.

Storyboard fields:
- `OVERLAY ID` and `SHOT_ID`, `VISIBLE TEXT` **exact spelling**, `TYPE` (TITLE, CAPTION, SUBTITLE, HADITH_ARABIC, HADITH_TRANSLATION, HADITH_CITATION), safe-area location, onset/end relative to shot, entrance/exit transitions, exact font and colors (as presets), source audio cue for lipless voice sync, owner approval.
- New Remotion fields: `ENGINE`, `REMOTION COMPOSITION`, `PRESET ID`, `FPS`, `START FRAME (SHOT)`, `END FRAME (SHOT)`, `SOURCE HADITH ID`, `ARABIC RTL RULE`, `TEXT LAYOUT / SAFE AREA`, rendered output URI, render approval and synced SFX ID.
- Templates: gentle title fade; caption slide-up; stable readable subtitles synchronized to the **actual generated voice waveform**; paired Arabic and Indonesian hadith displays with correct reading time. FPS and frame counts should match actual composition/shot metadata. Animations must not obscure faceless characters, props, or contact actions.
- **Arabic shaping/RTL**: use verified Arabic-supporting font and proper `direction: rtl`/bidi handling, confirm vowel diacritics remain intact, correct line wrapping and punctuation; avoid letter-by-letter effects that break Arabic joining. Render screenshots and have owner/agent check the actual Arabic composition before approving.
- Overlay/compositing interface with VideoExpress/Final Cut is **NOT YET TESTED**. If the backend cannot import rendered transparent overlays or final text clips, mark `BLOCKED_REMOTION_INTEGRATION` and do not substitute a full-video external render without explicit owner approval. Remotion docs: https://www.remotion.dev/docs/terminology/composition .

## C. Hadith is verified research, not an AI quotation

No model may invent or misattribute Arabic hadith text, translation, book, number, or grade just to fill a storyboard cell.

The `HADITH_SOURCES` tab owns every planned quote:
`HADITH_ID`, narrative purpose, **verbatim Arabic text**, verified Indonesian translation, collection and source book, **hadith number and edition / numbering convention**, authentication grade when grounded, stable original/authoritative link, verification notes, verified-by/date, owner approval, applied shots and Remotion overlay IDs, RTL/typography rule, on-screen citation, and status. Prefer primary collections or authoritative scholarly sources and verify the attribution and Arabic against the cited book. When grade is contested, describe by sourced evaluations rather than guessing.

**Gate:** No `HADITH_ARABIC`, `HADITH_TRANSLATION`, `HADITH_CITATION` overlay, hadith spoken narration, or claim of religious authentication unless source, exact wording and translation are verified **and** owner approves. Unverified hadith = `BLOCKED_HADITH`. If no hadith is relevant, `HADITH SOURCE ID = NONE`, and this gate is **not applicable**, not blocked. Existing demo phone-shot storyboard deliberately contains no hadith (all `NONE`); the `HD-TEMPLATE` row is deliberately blank/unverified and is **not an actual quote**.

Hadith overlay recommended composition:
1. Arabic original as one or more correctly shaped RTL lines, modest fade-in, long enough for reading.
2. Accurate Indonesian translation as its own caption with clear distinction from Arabic; no translation improvised by animation code.
3. Legible citation including source collection and accurate number; optionally small grade if the source's grade was checked.
4. No music. Only approved ambience/voices/SFX per audio ledger.

## D. Status and production gates

The existing `STORYBOARD!VIDEO GATE` concerns image/reference/dependency readiness only. Additional `FINISH GATE` and `RUNNER_MANIFEST!ASSEMBLY GATE` were added as **blocked template states** for audio and overlays. **Do not mistake text statuses for a functioning enforcement script.**

Sequence for future implementation:
`SCRIPT_APPROVED` → `SOURCE_HADITH_VERIFIED (if relevant)` → `IMAGE_APPROVED` → `VIDEO_CLIPS_RENDERED` → `VOICE_ASSETS_APPROVED` → `AMBIENCE_FOLEY_SFX_APPROVED` → `REMOTION_OVERLAYS_RENDERED_QC` → `ASSEMBLY_APPROVED` → `FINAL_OWNER_QC`.

A shot is **assembly-ready** only if all applicable audio cue IDs exist as approved audio assets (or intentionally `SILENCE`), every required character voice ID is approved, all required Remotion overlay IDs are rendered and QC-approved, and any referenced hadith is fully verified and approved. No soundtrack cue should start before its visual trigger. No overlay in video first frame with stale source or incorrect hadith citation. A change in dialogue, action timing, hadith, or voice ID invalidates dependent approvals and requires those assets to be regenerated or reviewed.

## E. Current implementation boundary

**Done:** master native Google Sheet has 14 tabs, including `VOICE_MASTER`, `AUDIO_CUES`, `HADITH_SOURCES`, and `REMOTION_PRESETS`; added storyboard IDs, Remotion columns and runner manifest planning columns, with demo Foley examples and no invented hadith quotes.

**Not done:** automatic ElevenLabs Sound Effects requests, approved voice profile API integration, waveform-based cue alignment, Remotion React composition code, alpha overlay import into VideoExpress or Final Cut, machine-validated asset gate, native Google Sheet ingestion in Runner, and finished production render. Do not claim these exist or run. PRO vs NATURAL video prompting and VideoExpress character-motion provider restriction remain unchanged.
