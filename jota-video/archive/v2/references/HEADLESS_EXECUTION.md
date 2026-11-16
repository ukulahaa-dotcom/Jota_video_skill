# Nonintrusive automation architecture — design only

**Status:** unattended automation PLANNED, NOT DEPLOYED, NOT ENABLED. **2026-10-22 owner exception** separately authorizes *foreground Chrome tab control for Artistly and VideoExpress in active scoped tasks*. This is NOT a headless/background worker, and a skill edit does not authorize media generation.

## Provider lock overrides executor options
Read [`VIDEOEXPRESS_PROVIDER_LOCK.md`](VIDEOEXPRESS_PROVIDER_LOCK.md). Browser/API/remote worker choices change **only the way the agent operates VideoExpress**, never the generation or final-export engine. The architecture diagram's optional FFmpeg/postprocess text **does not authorize FFmpeg-generated replacements or independent rendering as a JOTA video**. If a verified way to use the owner's VideoExpress project is unavailable, state `BLOCKED_VIDEOEXPRESS` and preserve the job ledger. No third-party video generation or generic MP4—even as an "emergency" substitute. Explicit new owner authorization is needed to ever change providers.

## Hard desktop noninterference
**Superseded for two provider sites only:** the 2026-10-22 user explicitly permits JOTA to take over Chrome tabs **for `app.artistly.ai` and `app.videoexpress.ai`**. During an authorized active task, JOTA may navigate/click these visible app tabs, open dedicated provider tabs, create explicitly requested asset folders, and use their supported UI workflows. Always verify site/account/target project, preserve unrelated tabs and unsaved work, never touch hidden session material/API keys/credentials or bypass the application's authentication/security controls. **No generation on a skill-edit-only turn, no publish without separate permission.** The prior no-focus-steal rule remains the DEFAULT for all unrelated applications, accounts and unattended/background operation. Calling Chrome through Desktop Commander is *foreground browser control*, not headless; do not represent it as a deployed automation worker.

## Future architecture (authorized implementation separate)
```
  Approved JOTA Brief
        |
        v
  Script / Rights / Character & World / Shot-ID Guard
        |
        v
  Story & Character Bible + Prompt Pack  ---> Approval Gate
        |
        v
  ARTISTLY approved 16:9/9:16 stills + source ID ledger
        |
        +--> Provider adapter (documented API ONLY if allowed and verified)
        |           OR isolated Cloud Browser (no user's desktop)
        |
        +--> Private asset storage with retention/rights metadata
        |
        v
  VIDEOEXPRESS import matched still -> scene video jobs -> full-frame QA
        |
        v
  Native VideoExpress dialogue/ambient sound + timeline + export
        |
        v
  Private Review Candidate ---> Owner Explicit Approval
        |
        v
  Separate Publishing Gate / Postiz / YouTube (opt-in only)
```

## Executor priority
1. Official supported API/connector with scoped credentials and compliant terms, if demonstrably available.
2. Isolated **cloud browser/worker**, separate browser profile and runtime, if site terms and authenticated session permit and the user has authorized computer use. **Do not** claim VideoExpress offers a public generation API unless verified.
3. Isolated noninteractive subprocess on a dedicated host when the Mac need not display anything. Use a separate OS user and service identity; verify it cannot control/switch active desktop. Localhost only and no public ports.
4. **Current limited owner-consented Chrome UI operation** for Artistly/VideoExpress is permitted during active tasks; it is a visible browser path, not an isolated worker. Confirm exact site/account/project and user-requested action; never infer permissions for third-party sites, bypasses or spending.
5. If no permitted execution path is available, STOP with the precise blocker; do not bypass local security settings.

## Queue and traceability
Store run_id, user_intent_id, source revision, chosen provider, subject aliases, asset ids, prompt hash, request id, provider job id, states `PENDING / SENT / RUNNING / READY / REJECTED / RETRY / BLOCKED`, cost estimate/actual, timestamps, scene continuity and audit log. Use single-writer lock for each project and bounded retry. Resume only after reconciling provider library and local ledger, never resubmit blindly.

## Account, data and security
- Project identity lock: GitHub repository/branch, exact provider account, worker/host, media library folder and channel.
- Store credentials in a scoped secret manager or private OS keychain, **never** in Markdown, Git, logs or shell command arguments.
- Never scrape private session cookies or bypass anti-bot, OAuth, MFA, purchase controls, privacy prompts or provider terms. Service access requiring interaction is an approved one-time user step.
- Verify third-party license and commercial terms, CloneVoice optional and not a requirement. Do not use voice cloning without person's rights/consent.
- Quotas, credit consumption, provisioning, new paid service, or public release require owner authorization if not already granted.

## Integration boundaries
- `n8n` may orchestrate queue and approvals **when subsequently implemented**, never directly override quality gates.
- `FFmpeg` may be used for technical probing/QA of authorized existing files. **JOTA final movie assembly and export remain native to VideoExpress**, not a substitute FFmpeg renderer. No fallback output.
- `Postiz` is publishing-adjacent; keep it DISCONNECTED from automatic publish until explicit target/channel approval and verified token permissions.
- The existing local `Jota_Content_Factory` app and its `QUALITY_GATE_LOCKED` are outside this skill update; nothing is enabled.

## Confirmed Google Drive video destinations (2026-10-21)

Drive account identity was verified through the connected Google Drive service: `jotaauto1@gmail.com`, within pre-existing `JOTA AUTOMATION / 02_Konten / Video`. A dedicated folder and three child folders were successfully created (no duplicate `02_Konten/Video` folder):

- [JOTA VIDEO PRODUCTION](https://drive.google.com/drive/folders/1rADq2DqH0z-8bqTYdMCRbGygS6ttFNP5) — canonical storage root for JOTA videos.
- [01_Draft](https://drive.google.com/drive/folders/1zIh8bMUtiJqMfX9hJbZkAHeisZqdMbo1) — work-in-progress draft renders.
- [02_Review](https://drive.google.com/drive/folders/12amEEZWh-4cetGPnGJdFQ2n0CYcZoXc3) — private owner-review candidates after QA.
- [03_Final](https://drive.google.com/drive/folders/1wS0eDrxOa3cyj5iHvlDP2vanIY_D0D-A) — owner-approved final media.

**Important:** Folders exist; **automatic file transfer/upload has not been implemented or verified**. Never claim a video was saved to Drive without an actual uploaded file ID, size/codec verification, confirmed account and visibility. VideoExpress export and Google Drive upload are separate stages. If a compatible upload connector only accepts runtime file references, do not fake a file URI or use secret/session extraction. No auto-publication and no weakening of `QUALITY_GATE_LOCKED`.

## Background status reporting
During an active authorized run: concise chat status at meaningful milestones (intake ready; scene ledger locked; N/N scenes complete; QA defect; export verified; blocking question). Do not promise continuation after chat completion unless an actual scheduled agent / remote worker is running. No silent work implied by GitHub file storage alone.

## Proof to implement later
Demonstrate 30-minute unattended dry run in a safe sandbox while user edits other apps; measure frontmost-process invariance, no UI prompts/popups, zero input injection and no focus switches; verify queue recovery, scene privacy, audit log and fully disabled auto-publish. Only then consider production enablement with owner approval.
