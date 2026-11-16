# JOTA Artistly — Image Prompt Director (P1, v2.0)

**Job:** generate an approved **single canonical START FRAME**, not motion, with cinematic acting potential and exact character reference fidelity. Works in `JOTA_1` or `JOTA_2` after owner locks mode. Actor continuity is first built in [Artistly Character Consistency](CHARACTER_CONSISTENCY.md), **not invented from scratch in each shot**. Only request generation after [`P1_IMAGE_READY`](FILMMAKER_PREGEN_QC.md).

## Required image shot-card fields

| Field | Direction | QC gate |
|---|---|---|
| `project_id, scene_id, shot_id, img_prompt_v, creative_mode` | Specific film and immutable revision | No missing or cross-episode IDs |
| `artistly_character_refs` | Exact K1/C1 source library/image IDs + version and slot mapping | No invented ID or implicit “same as before” |
| `world_ref` | Locked river/location geography and palette | Near bank LEFT, far bank RIGHT unless intentional crossing |
| `frame_spec` | 16:9 landscape native (Artistly supports 1344×768 in observed generator UI), composition rule of thirds, focal subject | VideoExpress import supports native 16:9 or 9:16; square rejected |
| `art_direction` | Original hand-painted 2D watercolor/cel-look for Kancil; visible coherent handmade outlines/texture | No licensed character/film frame replication, no plastic 3D drift |
| `blocking/actor_count` | Exact named subjects, scale hierarchy, limb contact, gaze, expression (JOTA 2), camera-visible body | Avoid “looking right but camera behind” contradiction |
| `camera_still` | Film shot size, camera position/height, 24/35/50/85 mm equivalent descriptive intent, DOF or painterly focus | No camera direction conflicting with required face visibility |
| `lighting/weather` | Key direction, light quality, horizon/river flow, scene-to-scene shadow consistency | No afternoon/night swap |
| `props/geometry` | Tree, stones, fruit, water contact, no accidental extra subjects | Continuity props accounted for |
| `planned_end_action` | Foretell what will move: tail shift, foot step, leaf falling, expression | Frame contains necessary physical handles |
| `negative_list` | Only **scene-relevant** exclusions incl unwanted text, extra limbs and copyrighted details; conditional face policy | JOTA 2 must NOT exclude eyes/nose/mouth; JOTA 1 must prohibit all facial features |

## Construction sequence — in-film-director order

1. **Pick actual source refs first:** Canonical K1 front/¾/profile/back and C1 source sheets should be approved. If `Multi-consistent Characters` actually supports chosen IDs in the authenticated UI, put K1 in Character 1 and C1 in Character 2 for a two-actor composition. Do not replace verified reference IDs with prose-only descriptions while assuming consistent output.
2. **Choose acting beat** and the frame the VideoExpress motion will actually start from. The image should capture **pre-action** balance: weight on rear hoof before step, head turned before line, still water before tail splash.
3. **Lay out 3 depth planes** (foreground, mid, background), camera angle and focal weight. For scenes with dialogue the speaker's face/muzzle should be sufficiently visible in `JOTA_2` *if* lip-sync will be attempted; plan separate speaker close-ups.
4. **Enforce identity and continuity** using short material/color/anatomy invariants from bible, no contradictory head orientation. One focal subject unless two are required.
5. **Use negative prompts sparingly:** positive controlled composition > repeated generalized 'no' phrases. No unrequested subtitles, typography, watermarks, duplicated appendages, mixed styles or unplanned props.
6. **Inspect assembled prompt** for conflicts, missing actual references and renderer target. Mark `P1_IMAGE_READY` only if all required fields PASS and image-generation authorization/credits are verified.

## Canonical Artistly image prompt template (copy/adapt, replace every bracketed placeholder)

```text
[PROJECT:<id> / <SCxx> / IMG-vN / MODE:JOTA_1|JOTA_2]
PURPOSE: opening reference frame for a moving cinematic shot about <action-to-follow>; the still is before the main movement.
REFERENCE ASSETS: Use the exact APPROVED Artistly <CHAR_ID>:<reference_asset_id>/<ref_version> (and <second actor id/ref> if present). Keep character design identical: <species, body scale ratio, palette, unique marks, head/muzzle/eye/ear/feet/tail if JOTA_2; or completely featureless face if JOTA_1>. Same world reference <WORLD_ID/ref>.
IMAGE: Original hand-crafted <art direction> 2D cinematic frame, exact LANDSCAPE 16:9. <shot size> from <camera physical position/height>, <lens-intent> equivalent. Subject occupies <screen position and frame percentage>, facing <specific direction> with <gaze and expression/pose appropriate for selected mode>, balanced weight on <anatomical contact point>. EXACTLY <count> characters visible, identified.
BLOCKING: left/right screen geography, foreground <...>, midground <...>, background <...>, water flow/shadow/props fixed. Scene start: <precise pose immediately before planned video action>.
LIGHT: <time>, sun/key from <side>, warm/cool palette, consistent prior SCxx.
CINEMATIC COMPOSITION: <dramatic focal beat, negative space for action, key silhouette, audience eyeline>.
STRICT NEGATIVES: no extra or morphed actors/limbs, inconsistent costume/color/markings, unwanted text or logos, wrong style/CGI, unauthorized protected characters. <JOTA_1 no facial marks or features anywhere OR JOTA_2 coherent normal intended eyes/nose/mouth and no facial distortions>.
```

## JOTA 2 — Kancil/Buaya 16:9 sample prompt (SC03 RE-DESIGN, NOT A RENDERED RESULT)

```text
[JOTA-PB01-KANCIL_BUAYA / SC03 / IMG-v2 / JOTA_2]
Use the same original approved Artistly Kancil K1 character reference <K1_REF_ID> and Buaya Tua C1 reference <C1_REF_ID>; do not invent or substitute reference IDs. A painterly original 2D animated river-fable frame, 16:9, soft hand-ink outlines, irregular lush watercolor vegetation, golden late-afternoon side light from upper right. A 50mm-equivalent camera is 1.2 m above the near left riverbank, framing a medium ¾ view of Kancil (small chestnut mouse deer, pale cream throat, small pointed ears, bright amber eyes, short black-tipped tail) on the left third. Kancil stands on a flat grey stone beneath the banyan roots, weight on rear hooves, front hoof lifted just before speaking, smiling inquisitively toward Buaya. C1 (large moss-olive elderly crocodile with broad recognizable snout, small ochre shoulder scar and natural yellow-brown eyes) surfaces from the teal water on the right-midground, body only partially seen, watching Kancil with a skeptical raised-brow expression. K1 is significantly smaller than C1; exactly TWO animal actors, no extra wildlife. Near bank banyan and stones LEFT, guava tree with red fruit on sunlit far bank RIGHT, soft river current from upper center toward lower left. Physically plausible anatomical proportions, purposeful crossed eyelines, individual shadow and water reflections. Camera image is pre-action: deer front hoof suspended, crocodile about to reply; allow enough face size for cinematic dialogue closeups in later shots. No printed subtitles, added people/animals, wrong cast, inconsistent eyes or markings, extra limbs, plastic 3D, imitation of recognizable commercial film frames or logos.
```

**Source reference IDs above are placeholders** and must be replaced only by real validated Artistly reference assets after the cast identity experiment. No JOTA 2 SC03 generation may be submitted with `<K1_REF_ID>`/`<C1_REF_ID>` left unresolved. The prior faceless SC03 rejected candidate must be kept as historical artifact, not overwritten.

## P1 preflight machine flags

```text
CHECK MODE_OWNER_LOCKED
CHECK CHARACTER_REFERENCE_ACTUAL_IDS
CHECK WORLD_REFERENCE_AND_AXIS
CHECK EXACT_SUBJECT_COUNT_AND_ANATOMY
CHECK OPENING_POSE_AND_VIDEO_ACTION_POSSIBLE
CHECK IMAGE_ASPECT_NATIVE_VIDEOEXPRESS_IMPORT
CHECK CINEMATOGRAPHY_AND_LIGHT
CHECK NEGATIVE_PROMPT_MODE_COMPATIBLE
CHECK ORIGINAL_IP_RIGHTS_PRIVATE_GALLERY_OFF
CHECK CURRENT_AUTHORISATION_AND_CREDIT_BUDGET
OUTPUT: P1_IMAGE_READY | P1_BLOCKED([failed fields])
```

After Artistly output: one **quick full-size visual review** of actual image for cast/ref consistency, intended camera, critical anatomy, text and unintended objects. This is cheap and necessary: a written prompt cannot certify its generated picture. Do not use 24fps frame extraction to inspect an image.
