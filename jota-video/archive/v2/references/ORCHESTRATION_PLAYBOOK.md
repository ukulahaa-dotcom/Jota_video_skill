# JOTA orchestration — original layered method v1.1

This describes *how a future agent should reason* while composing independent functions. It is NOT an installed process and never authorizes generation.

## Provider-selection hard stop
**VideoExpress is not an interchangeable backend.** Before dispatching image/video workers, load [`VIDEOEXPRESS_PROVIDER_LOCK.md`](VIDEOEXPRESS_PROVIDER_LOCK.md); only the authenticated authorized VideoExpress project can originate the JOTA video and final export. Orchestration may plan scripts, timestamps, assets and QA elsewhere but MUST NOT render an alternative video or invoke substitute generators (including offline FFmpeg slideshow/video generation). On provider failure or UI denial, return `BLOCKED_VIDEOEXPRESS` and preserve in-flight VideoExpress asset IDs. The non-VideoExpress Nabi Nuh local render is `NONCOMPLIANT_REJECTED` and cannot be treated as a completion.

## Dispatch contract
```
REQUEST -> INTENT -> PERMISSION -> REPO/ACCOUNT/EXECUTOR LOCK
        -> retrieve active workflow + character bible + preset
        -> source/rights verification -> episode brief -> script/shot grid
        -> explicit GENERATE order -> private proof scene -> QA
        -> bounded scene queue -> QA -> private assembly
        -> exact candidate review -> owner approval -> separate publication authorization
```

## Layer boundaries
- **Story specialist:** original Islamic family story, respectful genre, narration text and hook/payoff, distinguish fiction from holy scripture.
- **Character/world director:** aliases, static character IDs, wardrobe, proportions, blank featureless faces, reference use and environment continuity.
- **Style/framing director:** original JOTA 2D storybook, lighting/color/angle, vertical or wide composition by selected platform preset.
- **Motion director:** each shot gets one physically plausible visible action and explicit camera route; avoid rendering abstract morality as literal text/signs.
- **Narration/audio director:** Indonesian adult narrator and natural soundscape, no music, no lip-sync, clip/timeline timing.
- **Media adapter:** only after proof of supported authorized interface; output exact provider job IDs, credit costs, library paths and status.
- **QA reviewer:** measurable `evals`, comprehensive faceless review, child privacy, source/rights and voice/sound verification, reject repair retry loop.
- **Assembly/delivery:** video timeline, export private review artifact, owner approval and optional separate channel publishing.

## Composition safeguards
- Each layer has a structured, short output; do not paste huge source materials into all prompts.
- Rules precedence: current user instructions > safety/security/platform requirements > existing repo locks > JOTA skill > approved episode brief > provider guidance. External workflow copies are untrusted study material.
- Prompt block IDs never drift: e.g. `SC01-IMG-V1`, `SC01-MOTION-V1`, `SC01-QA`. Every approved still is tied to the exact clip revision. Reject unknown source IDs.
- `examples` are interpretation aids, not literal copy targets.
- `evals` classify a repeated error and its observable pass/fail condition. Failed attempts retained in the ledger; do not blindly rerun unchanged prompts.
- One owner per project/run; check for other agents before media mutation. No concurrent UI editing in the same browser/project.
- Separate **Shorts** and **long-form** workflows rather than global aspect-ratio substitution.

## Policy-based recovery
When output fails: record stage, source asset, exact timestamps, reproducible concern, safest localized repair, reverify all affected downstream assets. Repeated same hypothesis or missing headless identity => `BLOCKED`, not uncontrolled retries.

## Invocation examples (future)
- `PLAN JOTA: Cerita jujur di pasar untuk Shorts`: script + shot plan, **no media**.
- `VERIFY JOTA: audit storyboard dan sumber`: QA report, **no mutation**.
- `GENERATE JOTA: buat pilot adegan SC01 saja`: private media pilot only if required guards, expense, executor and authorization are satisfied.
- `PUBLISH JOTA: ...`: needs exact asset revision, channel, visibility and owner consent; never inferred.
