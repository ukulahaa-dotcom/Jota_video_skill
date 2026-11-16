# JOTA Character Consistency — source-of-truth architecture (v2.2, 2026-10-24)

## Same-character invariants at an extended-take seam
Read [`CONTINUOUS_SHOT_FIRST_LAST.md`](CONTINUOUS_SHOT_FIRST_LAST.md). The user wants one 20–30s seeming-camera-take, assembled from true VideoExpress ≤10s segments. Asset reference canon stays in Artistly. For the **following segment** the exact first-frame image **must be the previous video segment's actual rendered last frame** (not a newly recreated Artistly similar actor). The planned new target last-frame may be created in Artistly using the same approved K1/C1 references, but it must be physically reachable without relighting, changing scale/prop layout, jumping camera axis/velocity or adding actors. Characters' screen pose, fur/scales, water contact, gaze and lighting are frame-boundary continuity; after generation perform short motion-window verification. The official VideoExpress First/Last feature and 10s All-Access claim are capability indicators only; never assert invisible seams without live native verification. JOTA2 talking lipsync gate unchanged.

## Evidence-bound design decision

**Primary identity/reference construction happens in ARTISTLY; VideoExpress locks the approved reference image during motion generation.** This is a staged design decision, not a benchmarked claim of better output quality.

**Public manufacturer evidence:** Artistly markets [Consistent Character, Multiple Consistent Characters and upload-your-character references](https://artistly.ai/) and provides [tutorials for custom consistent characters and multiple characters](https://artistly.ai/tutorials2/). VideoExpress lists [multi-character consistency, lip-sync and narration](https://videoexpress.ai/) and [v3 tutorials including First Frame–Last Frame, Stylize Character and Lipsync Video](https://videoexpress.ai/tutorials/index.html).

**Authenticated UI observation (read-only, 2026-10-23):**
- Artistly navigation has `Consistent Characters (Train Your Own AI)` at `https://app.artistly.ai/ai/consistent-characters`. The category chooser displays `Realistic Images`, `3d & 2d Style Images`, `Multi-consistent Characters`. Selecting the multi-character category visibly exposes `Character 1` and `Character 2` upload slots plus `Choose from library`. **The UI was opened, but no character training, image generation or reference-based multi-scene output was submitted or verified.** Entitlement, usage limits, costs, actual identity persistence, prompts after reference loading, and animal-specific success are **UNVERIFIED**.
- The authenticated VideoExpress `Create with AI` menu visibly lists `Create Video From Prompt`, `Image to Video`, `Lipsync HD`, `Narrate`, `Consistent Character`, `First Frame, Last Frame`, `Stylize Character`, `Lipsync Video (Old Algorithm)`, `AI Sound Maker`. Menu visibility does **not** prove animal-specific lip-sync quality, multi-character speaking turns, availability of every option in the user's quota, or a stable automated internal API.
- Native `Import Media → Import from Artistly` successfully imported previously approved Kancil SC01/SC02 images during an earlier active production turn. The direct UI bridge is **VERIFIED for specific prior assets**; an official programmatic API is not.

## Identity ownership: immutable per production revision

1. **CHARACTER BIBLE FIRST**: before scene-image or video prompts, create a separate approved reference per named actor with canonical `character_id`, species, size/proportions, body silhouette, palette/markings, eye/iris shape and color (JOTA 2), muzzle/teeth/ear/tail anatomy, age/personality, clothes/accessories (if any), reference views (front, profile, back, 3/4), expressions, pose variants and negative differentiation vs other actors. For JOTA 1 remove **all** facial anatomy/expressions and enforce faceless reference instead; mode is locked first.
2. **ORIGINAL/RIGHTS**: do not copy copyrighted characters or exact film-model sheets. Named `style_lock` means original art language, not a copied studio's proprietary characters/film frames.
3. **CHARACTER-ID / LIBRARY-ID LOCK**: assign immutable `K1` Kancil and `C1` Buaya reference IDs, an exact `artistly_reference_asset_id` for each, explicit `approved_reference_version`, and `reference_role` (Character 1 / Character 2). Only use the exact approved reference objects in Artistly consistent-character workflows; don't rely solely on repeating prose descriptions or using latest gallery tiles.
4. **SINGLE vs MULTI**: for a shot containing one actor, use an actually available Artistly consistent-character reference or reference-conditioned image operation. For K1+C1 together, prefer authenticated `Multi-consistent Characters` with **two separately identified actor images** in the two UI slots (when its available image/format/credits are verified). If it cannot accept the approved refs or produce film-compatible 16:9 stills, mark `REFERENCE_PIPELINE_BLOCKED` and use a **separately verified, owner-authorized** reference-conditioned Artistly workflow; no blind text-only substitution.
5. **WORLD/SET LOCK**: independently maintain `location_id`, river bank left/right geography, guava tree position, time of day, light direction, water flow, outfit/accessory/prop positions and scene color palette. Faces can be consistent while the environment jumps, so test both.
6. **START STILL ID**: each scene independently records `SCxx-IMG-vN`, approved Artistly still ID, exact character reference IDs and intended frame/crop. Require actual 16:9 or 9:16 compatible with VideoExpress native Artistly import.
7. **VIDEOEXPRESS MOTION**: import the **same** approved Artistly image, record `videoexpress_imported_image_id`. Use it as frame 1 for motion. VideoExpress's Consistent Character and First Frame–Last Frame paths can help when independently proven for that scene. Never assume the tool will preserve faces, outfit or anatomy just because the source frame was good; lock the identity in motion text and use a cheap end-frame check.
8. **DIALOGUE/LIPSYNC**: use the *same actor reference* and persistent `voice_id` for every scene. Prefer one clearly framed speaking face per lip-synced shot in JOTA 2; crosscuts and offscreen reactions make multi-actor identity/speaker ambiguity less likely. Only promise true lip-sync if selected VideoExpress workflow demonstrably supports stylized animal characters + the required audio and timing. If unsupported, use a **user-approved cinematic alternative** (in-world character audio with reaction/over-the-shoulder shot), not fabricated lip-sync.
9. **NO UNCONSCIOUS DRIFT**: if reference IDs, approved versions or source/VE import IDs mismatch, **STOP that scene before provider credit**. Recheck current authenticated UI controls before each new provider session, not every individual click.

## Kancil and Buaya sample identity bible — provisional creative proposal, NOT generated refs

- `K1` = small agile chestnut mouse deer, compact frame, pale cream throat/chest, warm brown dorsal stripe, amber eyes (JOTA 2 only), small triangular ears, short hooves, tiny black-tipped tail. Clever but friendly; expressions: curiosity → persuasion → confidence. Keep K1 noticeably smaller than C1 and not goat-shaped.
- `C1` = older broad olive-green crocodile, large heavy torso, ochre scar running across left shoulder, rough dark moss scutes, warm yellow-brown eyes (JOTA 2 only), broad but natural snout, long tail. Skeptical, then surprised; not a dragon, dinosaur or toy.
- `RIVER_A`: turquoise winding river, banyan with grey stones at **near-bank left**, guava-bearing tree at **far-bank right**, golden side light from upper right, realistic water movement. All shots preserve spatial axis and screen directions.
- Style suggestion: original hand-painted 2D watercolor jungle fable with imperfect brush texture and softly inked outlines. **No copied studio screenshots/layouts or named franchise characters.** All actor cards and refs need visual approval before being marked `LOCKED`.

These are prompt-generation defaults to be checked against the approved screenplay and art brief, not existing approved Artistly model IDs. Existing faceless SC01/SC02 moving clips and rejected Artistly SC03 image remain preserved; whether they fit the new expressive JOTA 2 cut is a separate creative decision.

## Minimal character identity manifest (example, all unknown IDs null)

```json
{
  "creative_mode": "JOTA_2",
  "characters": [
    {"character_id":"K1","name":"Kancil","artistly_reference_asset_id":null,"reference_version":"REF-v1","reference_qa":"NOT_RUN","voice_asset_id":null},
    {"character_id":"C1","name":"Buaya Tua","artistly_reference_asset_id":null,"reference_version":"REF-v1","reference_qa":"NOT_RUN","voice_asset_id":null}
  ],
  "location_id": "RIVER_A",
  "provider_consistency_validation": "NOT_RUN",
  "reference_provider": "Artistly",
  "motion_provider": "VideoExpress",
  "public_api_verified": false
}
```

**Experiment needed before calling the design VERIFIED:** create/approve the two original reference images in Artistly, load them as two library references, generate *two distinct 16:9 test still compositions* with different poses, compare real identities, then import one to VideoExpress and check 6s motion. Record successes, failures and cost. Until this experiment is executed, it is a **recommended workflow**, not proven output consistency.
