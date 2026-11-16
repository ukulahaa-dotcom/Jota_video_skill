# JOTA headless automation — implementation backlog (no runtime mutation yet)

## Current proof / status — 2026-10-21
- **DOCUMENTED / GITHUB VERIFIED**: skill v1.1.0 and original modules persisted to private GitHub and routed from AGENTS.md; 18/18 files read back successfully.
- **SOURCE STUDY COMPLETE**: English-caption transcript of Paul's supplied YouTube live retrieved and studied. See `../references/PAUL_PONNA_YOUTUBE_STUDY.md`. Re-check if Paul publishes corrections or updated version.
- **CHATGPT NATIVE INSTALL NOT COMPLETE**: authenticated GitHub connector exists, but native ChatGPT skills list does not show a JOTA skill, and no install action is available in this run. See `../CONNECT_CHATGPT.md`.
- **HEADLESS AUTOMATION NOT IMPLEMENTED**: no isolated cloud computer, verified provider API, job queue, scheduler, VideoExpress runtime integration or unintrusive Mac QA pilot installed. New owner authorization/worker identity and provider terms must precede media execution.
- **NO GENERATION / PUBLICATION** performed as part of this skill update; existing quality lock unchanged.

## Goal
Translate the permanent skill into a separate nonintrusive execution service, without touching the user's foreground Mac session, existing JOTA local QA locks, or external paid/public services without permission.

## Required decisions before implementation
- Identify/authorize supported VideoExpress interface. **Do not assume a documented generation API exists**. Cloud browser integration only if compatible with provider terms and authentication; if not possible, report `HEADLESS_BLOCKED`.
- Decide worker platform (isolated cloud or truly headless worker) and data residency/retention for private child-inspired assets.
- Confirm VideoExpress/CloneVoice licensing, commercial use, upload quota, budget and cost caps.
- Owner permission for hosting/provisioning/credentials storage; no secrets in repo.

## Engineering milestones (all NOT STARTED)
1. **Read-only provider adapter probe**: identity, quota/account constraints, documented access, no UI writes.
2. **Source/license and Islamic reference registry**: verify required citations and rights before media.
3. **Production schema**: immutable brief, scene bible, shot timing grid, provider job ledger, private assets and sha256, pause/resume.
4. **Background runner**: scoped worker/queue with idempotency and bounded retries; no browser focus or foreground Mac input.
5. **Prompt adapters**: scene start-image, consistent faceless rendering, per-beat camera motion, private outputs.
6. **Audio and assembly**: no music; narration per scene or separate track depending on proven provider capabilities; isolated FFmpeg rendering.
7. **Review gates**: all-frame visual evaluation, human review, factual/religious/rights review, user acceptance.
8. **Optional n8n orchestration**: triggers and approval hooks (disabled by default), no changes to existing app quality-lock bypass.
9. **Optional Postiz/YouTube delivery**: integration behind separate consent and per-candidate approval, no unattended public posting.
10. **CI and canary**: static skill lint, simulated queue with dummy assets, headless/no-focus audit, full proof-of-done.
11. **Pilot**: single private sample only after owner authorizes media generation and confirms provider credit budget.

## Acceptance conditions
- A genuine isolated worker demonstrated to not switch tabs/windows, inject events into active Mac, show popups or request accessibility at runtime.
- No automatic media creation while user instruction is STUDY ONLY; no secret leaks or account/session ambiguity.
- QA_REJECTED content cannot export as publishable media; no auto-publishing.
- Existing `QUALITY_GATE_LOCKED` remains effective for local Jota_Content_Factory app until exact independent user-approved unlock criteria pass.
- `DOCUMENTED` is not called `AUTOMATED` until a successful isolated dry run and authorized functional test are evidenced.
