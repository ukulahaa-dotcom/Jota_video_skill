# JOTA VideoExpress — Character Dialogue & Voice Director (P3, v2.1 speech-synchronized)

**Job:** make characters feel like actors in an original film, not AI-slideshow narration. The dialogue specification is an **independently quality-checked production artifact** tied to a character/voice ID, shot image/video ID, speech duration and visual reaction, even if a single VideoExpress panel later combines them.

**Narrative lock for Kancil/Buaya:** **NO narrator. ONLY named in-world Kancil and Buaya voices**, with conversations, interruptions and reactions. This narrative rule applies even to expressive **JOTA_2**, where lip-sync and licensed music are *permitted*, never compulsory.

## Mandatory JOTA2 spoken acting override (2026-10-23)
This module's previous separate audio cue + lip-sync prompt is now a **planning structure**, NOT permission to drag unrelated TTS under a Video Only actor shot. Read [`DIALOGUE_SYNC_FIRST.md`](DIALOGUE_SYNC_FIRST.md) (new authoritative production and owner QC feedback). **Visible speaking animal → P3S_SYNC_READY → native VideoExpress coupled speech+mouth clip → P4_AV_SYNC_ACCEPTED after genuine playback.** Use the literal short Indonesian actor line, emotional intent, breath/pause timing and single visible mouth. For the 60s film V1, `Video Only` + Ardi/Fadhlan TTS failed owner review. Never use `video_only=true` or unlinked separate audio for a talking face. TTS files can be **sources for genuine native audio-coupled lip-sync** only if the app's actual lip-sync controls can select that exact audio; otherwise they must not be presented as synchronized. The authenticated UI does expose `Lipsync HD Video` in Create Video From Prompt but 2D animal outcome is not yet proven. Require one pilot and audible QC before batch.

## Provider route — choose only after UI proof

Observed authenticated VideoExpress `Create with AI` UI (2026-10-23): `Lipsync HD`, `Lipsync Video (Old Algorithm, Up to 30 seconds)`, `Narrate`, `Image to Video`, `Consistent Character`, and `AI Sound Maker`. The UI also exposes a `Text to Speech` tool. [Official tutorials](https://videoexpress.ai/tutorials/index.html) describe lip-sync and separate audio/video. **No verified successful Kancil animal-character lip-sync or exact voice-ID selector controls were tested in this documentation task**. Treat model/tool availability and animal-specific language/lip-sync as `UNKNOWN` until an authorized small proof; do not claim it supports automatic two-character mouth choreography.

**Preferred cinema strategy under JOTA_2:** Record/prepare one clearly named actor's dialogue per shot or closeup where possible; use clean **shot/reverse-shot** editing with separate voice tracks and cutaways to listening reactions. Let the native VideoExpress supported lip-sync feature align each *one-speaker* clip with a verified actual voice asset. For rapid dialogue or a two-character wide shot, split across adjacent shot IDs with shared scene geography and stable voice references rather than requesting a single AI model to guess which mouth should move when.

**JOTA_1** remains silent-face visual motion with off-camera/independent actor voice tracks and no lip-sync/music. Do NOT route JOTA_1 into lip-sync generator. Both modes may use native TTS, Foley and ambience if actual supported controls/rights verified.

## P3 dialogue-ready card — all fields required before any voice/lip-sync job

- `episode_id, creative_mode, SCxx, speaker_turn_id` and scene duration, fixed shared timeline.
- `speaker_character_id` = K1 or C1; `voice_id` actual reusable provider voice/audio reference if exposed (else null/unknown, do not invent); `listener_character_id`.
- Exact **spoken Indonesian line** including punctuation and expressive interjections; NO unrequested English/narrator lines, no generated subtitle text in image.
- `emotion_intent` (curiosity, teasing, caution, confidence, surprise), `delivery` (tempo, pitch direction, breath pause, warmth or gruffness) with stable individual character voice timbre and appropriate speed.
- `spoken_window_start/end_seconds` and **recorded or cautiously estimated duration**. Require timing QA *before* requesting render: script must fit within actual clip and allow startup/pre-breath and a small reaction tail; script-length estimates are NOT a guarantee of TTS duration.
- `camera_speaker_framing`: face size, eyeline and headroom for talking shot in JOTA_2, shot/reverse-shot axis and camera move; match actual still/clip ID. In JOTA_1 mouths must never animate.
- `mouth_plan` JOTA_2: supported lip-sync ON only with verified tool and actual audio asset; align visemes and mouth closure at line end; listener remains silent with small eye/head reaction. No duplicate talking mouths.
- `world_audio`: natural water/leaf sounds and sound effects with motivated position; music optional in JOTA_2 only with traceable license and appropriate dialogue ducking; no music in JOTA_1.
- `rights`: permission for generated/recorded voice, no voice cloning without consent, music source license (commercial/platform rights), no protected dialogue transcript copied.
- `post_scene_cut`: exactly what expression/action bridges into the next shot.

## P3 pre-generation QC: built-in checks

1. **Speaker attribution:** ONE speaker per P3 turn, no name ambiguity, consistent `voice_id` across all turns. If both characters speak in one 6s scene, either create two nonoverlapping individually timed P3 turns or move second line to next shot.
2. **Line length:** target a **short colloquial Indonesian sentence** per one 6s shot; rough 2–3 Indonesian words/s may be used as a planning heuristic, not a verified VideoExpress TTS timing rule. Better measure a supported TTS preview where available *without paid render*, then lock actual length.
3. **Performance beats:** actor intention and emotion change: Kancil playful inquiry; Buaya skeptical response; give listener a separate reaction. Avoid every speaker using same pitch/volume.
4. **Mouth/audio consistency:** for JOTA 2, do not promise lip-sync based solely on a prompt if actual VideoExpress control cannot pair actor/source video and voice clip. Image reference face must be large enough for actual articulation. JOTA 1 disallows mouth movement.
5. **Music rights and mixing:** music is optional for JOTA 2, must be rights-cleared and specifically chosen, ducked under active speech (no arbitrary dB value falsely presented as measured); avoid melody clash with nature sound. Both modes must listen to final audio before release.
6. **No narration:** P3 scripts never contain an offscreen storyteller for Kancil/Buaya; lines must be spoken by actual `K1` or `C1`. Use stage directions separate from spoken text so TTS doesn't read them aloud.
7. **Immutable actor assets:** all verified actual voice/audio/lipsync IDs logged. No duplicate voice job while previous status unknown.

## P3 dual-artifact template — *audio cue* and *lip-sync/acting prompt* (do not merge blindly)

**A. Voice/audio performance cue** (native VideoExpress TTS or approved imported actor recording; never paste stage direction as spoken text):

```text
[P3-DIA / <SCxx>-<TURNxx> / MODE:JOTA_2 / ACTOR:<K1|C1>]
ACTOR VOICE: <actual verified voice_id OR VERIFIED_RECORDED_AUDIO_ID>.
SPOKEN TEXT ONLY: "<exact words uttered in Indonesian>"
DELIVERY DIRECTION (NOT SPOKEN): <age/energy/timbre consistent with character, emotion, rhythm, emphasis, planned pauses>.
SPEECH WINDOW: <start>–<end> seconds (relative to chosen shot); no line overlap unless scripted intentionally.
LISTENER: <other character id>, SILENT during the window with <one reactive micro-beat>.
AMBIENCE/FOLEY: <one authorized environmental cue>.
MUSIC: <JOTA_1 NO MUSIC OR JOTA_2 explicit rights-cleared track source, desired mix and timing; NONE if not chosen>.
```

**B. Scene lip-sync/face-performance cue** (ONLY JOTA 2 and supported native VideoExpress route):

```text
[P3-LIPSYNC / <SCxx>-<TURNxx> / MODE:JOTA_2]
SOURCE: native VideoExpress approved video clip <VE_CLIP_ID> with speaking actor <CHAR_ID>, actual recorded/TTS voice track <VOICE_AUDIO_ID>.
CAMERA: close enough for one clearly readable character muzzle/face; stable eyeline; original 2D expression anatomy and exact character bible markings.
LIP SYNC: only actor <CHAR_ID> animates mouth during the audio words; match spoken syllabic timing and close mouth naturally during breaths/pauses. Only one synchronized mouth in frame. Listener <LISTENER_ID> is not speaking and reacts through eyes/ears/body without mouth movement.
ACTING: <intended emotional pivot>, one subtle head/ear/tail beat synchronized to key phrase; coherent jaw/muzzle dimensions, no teeth morph/duplicate jaws, no sudden actor identity change.
END: mouth rests closed and expression prepares the next shot <SCnext>. No captions/AI speech bubbles.
AUDIO: use only specified dialogue source, no narrator, no invented music; music later only if separately chosen and rights-cleared in JOTA_2.
```

**Operator rule:** The VideoExpress UI might accept only audio and a video asset without a textual lip-sync direction field. If so, keep B as a **director's QA/control specification**, populate only the controls genuinely available, and never invent an input field or private API to force it.

## Kancil JOTA 2 spoken dialogue plan — provisional cinema example

| Shot | Speaker | Exact line | Intent | Acting in screen | Target |
|---|---|---|---|---|---|
| SC03 | K1 | “Buaya, boleh aku lewat?” | polite cleverness | face ¾, eyes to water, one hoof gesture | a brief 6s K1 turn |
| SC04 | C1 | “Kenapa harus kubantu?” | guarded skepticism | water-level crocodile closeup, eyes narrow | a brief 6s C1 turn |
| SC05 | K1 | “Aku membawa kabar dari raja hutan!” | mischievous persuasion | K1 lively brow/ear movement | a brief 6s K1 turn |
| SC06 | C1 | “Kabar apa itu?” | rising curiosity | snout lifts, small splash, eye focus | a brief 6s C1 turn |

These are a *sample* for v2 cinema rewrite, not the original locked full screenplay; they require editorial signoff/continuity adjustment before final use. The lines can be expanded/rewritten only through versioned scene script and actor cues. Never infer they have already been generated.

## P3 status/proof

`P3_DIALOGUE_READY` requires the **text, character attribution, timing, consistent voice source, supported tool route and sound-rights gate** all PASS. Then `VOICE_ASSET_VERIFIED` / `LIPSYNC_RENDERED` / `AUDIO_MIX_QUICK_REVIEW` follow only with actual provider evidence.

**Prompt PASS is preproduction quality, not a claim that a rendered character actually spoke the words or lips moved correctly.** Reserve short actual A/V playback for newly generated dialogue, then one full assembled-film listen/visual check before final private export.
