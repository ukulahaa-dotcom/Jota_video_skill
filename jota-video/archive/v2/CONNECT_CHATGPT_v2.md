# Connect JOTA video skill — GitHub + ChatGPT/Codex (updated 2026-10-24, v2.4.3)

## v2.4.3 Source-of-truth gate before each task/scene
Before doing substantive JOTA work, read the actual connected GitHub `skills/jota-video/SKILL.md` and [`references/EXECUTION_SOURCE_GUARD.md`](references/EXECUTION_SOURCE_GUARD.md) from the verified repository and apply only the domain files needed. Each Create Video job MUST have a fresh evidence-backed preflight; JOTA 1/2 choice must come from the owner, SC01 has the only initial Image Prompt and SC02+ uses saved native previous frame, speaking characters use the SAME video+dialogue generation prompt, Video Only OFF, no standalone TTS for character speech. If evidence/control mismatches, STOP. Treat this as a protocol, not a persistent memory setting or currently running automated code. See E125–E132 for regression specs. Chat use is supported; no Work handoff is needed merely to retain rules.

## v2.4.2 speaking character = native dialogue+motion in ONE VideoExpress Video and Audio Prompt
**MANDATORY owner correction v2.4.2 — dialogue and video are ONE native job.** Whenever a character **ngobrol, dialog, ngomong, or vlogs**, put ADEGAN/camera/movement + exact **SCRIPT NGOMONG** + character's voice/performance + soundscape in the SAME VideoExpress **Video and Audio Prompt**, and generate that character's speaking video **and voice together** with the SAME native Create Video job. **Video Only (No Sound) = OFF** when the character speaks. NEVER silently generate a silent character video with Video Only then add a separate Text to Speech/voice-over dialogue afterward; never double the character voice. **Separate Text to Speech or sound generation is permitted for BACKGROUND ONLY** (e.g., duck calls, wind, footsteps, ambient Foley), NOT for any speaking character. A failed native talking-video attempt is NOT permission to switch to detached dialogue. For locked JOTA 1 faceless, if the native talking video introduces eyes or a mouth, mark `NATIVE_DIALOGUE_QA_BLOCKED`, retry only bounded joint native correction or ask explicitly for a mode decision; do not dub character speech. For JOTA 2, check real audio and lip-sync of joint video; do not assume QA from a prompt or audio-track metadata. The user's supplied `Entok.mp4` is 30.139 s/1920x1080 with audio and visually expressive speaking faces; it is not a faceless JOTA 1 reference or automatic mode change. SC01 uses ONE initial Image Prompt + one native Video and Audio Prompt; SC02+ reuse the exact saved selected previous video end frame and write ONLY Video and Audio Prompt (no new Image Prompt).

## v2.4.1 correction — image generation for SC01 ONLY
**Binding owner rule for manual continuous scenes:** Write one **IMAGE PROMPT** only for the initial SC01 shot to place the existing character/reference in the correct background. From SC02 onward, the user chooses/saves a clear actual frame from the previous clip, trims that clip to the selected frame, then chooses the same saved image via VideoExpress **Use from Library** as the next first frame. **NO new Image Prompt and NO Create Image** for SC02, SC03, ... ; author **VIDEO AND AUDIO PROMPT ONLY**, with ADEGAN, SCRIPT NGOMONG, natural sound, camera and visual motion continuity. Never revert to per-scene image generation for manual continuation; regression cases E113–E117 enforce this distinction. See [VIDEOEXPRESS_MANUAL_SCENE_WORKFLOW.md](references/VIDEOEXPRESS_MANUAL_SCENE_WORKFLOW.md).

## v2.4 manual VideoExpress tutorial (owner-trained)
The user supplied a screenshot of the authenticated VideoExpress `Image Prompt` / `Video and Audio Prompt` panels and a seven-step manual method. For manual prompt support, follow [VIDEOEXPRESS_MANUAL_SCENE_WORKFLOW.md](references/VIDEOEXPRESS_MANUAL_SCENE_WORKFLOW.md): **SC01 ONLY** image prompt = present pose/action + background + scene location; approved human character Reference Photo + Creative/Enhance/Consistent; separate video prompt = contextual professional shot/camera movement, action, surroundings and explicitly labelled **SCRIPT NGOMONG**; Advanced/Enhanced/manual 10s where available, private and not Video Only for speech; manual generate; then select/save clear real frame, trim previous video to it and use as next visual reference; for selfie keep host in frame entire time and phone invisible. The VideoExpress-native scene still is a derivative of approved canonical character reference; Artistly remains default canonical/source image provider for automated image-first episodes, and VideoExpress still owns all moving video. All steps are *instructions* until manual videos and synced dialogue are watched. Updating GitHub does not create a new video/automation.

## v2.3 continuity reference (native VideoExpress; skill-only change)
The [Alex VideoExpress 3.5 tutorial](https://youtu.be/u1rp6wbtH1M) demonstrates a critical correction: if a generated clip has an ugly raw final frame, scrub native footage to choose a clean earlier frame, save it to My AI Images, trim the predecessor at that exact frame and select the same saved image under `Create Video From Prompt → Use from Library` for continuation. For supported native First/Last workflows the exact saved frame is still mandatory; no merely similar generated lookalike. The added JOTA C1/C2 gates require native asset IDs, exact trim-to-frame verification, moving camera/actor momentum match, unbroken audio and preserved dialogue. Recheck actual clip lengths after trimming; contiguous timeline bricks do not establish a smooth join. See `references/CONTINUOUS_SHOT_FIRST_LAST.md` and regression tests E95–E102. This documentation update authorizes no media generation or publication.

## v2.2 long-take workflow (prior baseline)
When a user asks to make a scene as long as possible and to connect 10s shots into one continuous cinematic take, load `references/CONTINUOUS_SHOT_FIRST_LAST.md` before P1/P2. Prefer longest **useful** supported VideoExpress segment ≤10s, then native First/Last chaining from the **real previous rendered last frame** to a preplanned physically possible target; verify camera/actor movement and audio at each seam. Capability per mode is unknown until actual authenticated UI and output inspection. For JOTA2 talking characters retain real VideoExpress audio-driven Lipsync HD; visible speaking mouth cannot be video-only segment + separate TTS. No media generation on skill-update-only instruction.

## Verified current integration
- GitHub plugin is already connected in this conversation to account **ohan78** (email verified by connector: `ohan78@gmail.com`).
- Private source of truth: https://github.com/ohan78/Jota_Content_Factory/tree/main/skills/jota-video
- Codex repository entry point: https://github.com/ohan78/Jota_Content_Factory/blob/main/AGENTS.md
- The private repo and documentation can be read/updated through the authorized GitHub connector when a new chat has access.

## What this does NOT do
GitHub connector access is **not** the same as installing a native ChatGPT skill or granting continual background execution. Current ChatGPT integration cannot automatically take this repo's `SKILL.md` and register it globally without a supported plugin/skill installation action. In this conversation there is no such write action. There is **no running VideoExpress headless worker**, n8n workflow or active background job.

## Main playbook menu (v2.0.0; 7 content playbooks)
Use the canonical content menu at [playbooks/README.md](playbooks/README.md) and machine-readable [playbooks/CATALOG.json](playbooks/CATALOG.json). The root `SKILL.md` is a shared policy/dispatcher; each category's real skill is `playbooks/<category>/SKILL.md`. Choose the correct playbook by user intent and leave shared QA/presets/references in their current folders. For suggested video themes, wait for chat approval before recording them in `playbooks/<category>/ideas/approved/`; even then the status is PLAN_ONLY until separately instructed.

## Owner voice/lip sync correction v2.1
For JOTA 2 on-camera speech, the 2026-10-23 owner-rejected film V1 used VideoExpress `Video Only` and separate independent Indonesian TTS, creating unsynchronized speech; follow `references/DIALOGUE_SYNC_FIRST.md`: actual coupled speaking-video generation (verified native Lipsync HD or actual source-audio-coupled native route), one visible speaker, conversational words/timbre and **real audible + visible pilot** before full batch. No fast-but-unsynced scene production, no public upload. V1 export remains private historical and JOTA2 is already selected for this episode.

## Prompt-first filmmaker contract (v2.0)
For film production: before generating, read `references/FILMMAKER_PREGEN_QC.md`, `references/CHARACTER_CONSISTENCY.md`, then `references/PROMPT_IMAGE_DIRECTOR.md`, `references/PROMPT_MOTION_DIRECTOR.md`, `references/PROMPT_DIALOGUE_DIRECTOR.md`. Use P1/P2/P3 pre-gen readiness gates; real provider reference IDs only. JOTA 1 retains faceless/no music; JOTA 2 allows expressive faces and rights-cleared music. Quick actual output sanity and one complete private-film QA remain required. JOTA Kancil is owner-selected JOTA 2; no new media on this skill-only change. **This is GitHub-linked guidance, not a deployed autonomous app or an installed native ChatGPT skill.**

## How to invoke now (without browser/UI installation)
Ask: 
> “Buka GitHub `ohan78/Jota_Content_Factory`, baca `skills/jota-video/SKILL.md` dan menu `skills/jota-video/playbooks/README.md`. Pilih kategori skill yang cocok. Mode `PLAN_ONLY`, jangan generate video.”

For Code/Codex/Work tasks done **inside that repository**, the root `AGENTS.md` routes agent to this skill and preserves the quality lock. This is persistent **within the repository**, not across arbitrary chats/apps.

## Recommended user Project instruction (paste once if desired)
```
Untuk seluruh pekerjaan JOTA VIDEO PRODUCTION:
gunakan repository GitHub privat ohan78/Jota_Content_Factory,
selalu tanyakan JOTA 1 atau JOTA 2 untuk setiap tugas video baru bila user tidak menyebutkannya; mode yang sudah dipilih tetap berlaku pada follow-up episode yang sama,
baca AGENTS.md lalu skills/jota-video/SKILL.md,
dan modul terkait seperlunya. Ikuti versi terbaru yang ada di GitHub,
dengan user approval sebelum pembuatan gambar/video; Artistly untuk gambar 16:9/9:16, import ke VideoExpress, VideoExpress saja untuk video dan ekspor; 
tanya dulu mode untuk setiap tugas video BARU jika belum disebut: JOTA 1 (faceless manusia/hewan, tanpa musik/lip-sync) ATAU JOTA 2 (cinematic ekspresi/wajah lengkap, musik berlisensi dan lip-sync boleh). Keduanya Full Automation, privasi dan source/technical QC tetap wajib, sumber Islami valid jika membahas fakta agama,
dan kontrol Chrome hanya untuk Artistly/VideoExpress bila task saat ini mengizinkan, sesuai persetujuan owner 2026-10-22. Jangan menyentuh tab lain, secret, atau API tidak terdokumentasi. Jangan generate media pada permintaan pembaruan skill.
Jangan publish tanpa instruksi eksplisit yang menyebut channel dan revisi.
```

## Skill installation path (future work, NOT accomplished)
If supported plugin marketplace or local agent skill installer becomes available:
1. Review installation method and third-party permission/security; do not give an AI new access blindly.
2. Install/register from the private authenticated JOTA path or a maintained package.
3. Verify the installed exact skill version/hash by a benign `PLAN_ONLY` test, no media generation.
4. Audit permissions and revoke unnecessary privileges; do not weaken `QUALITY_GATE_LOCKED`.
5. Record tool/platform installation evidence separately. If the platform does not support installation, keep GitHub-linked method; never claim auto-activation.

## Background-execution path (future, only after owner authorization)
For **unattended background work**, use an isolated cloud computer or documented generation API only when verified, safe and within provider terms. **For active task-scoped work, the owner has now permitted Chrome tab control for Artistly and VideoExpress only.** This does not prove or authorize background automation. For architecture and acceptance see `references/HEADLESS_EXECUTION.md` and `automation/IMPLEMENTATION_BACKLOG.md`. A future worker must persist run state, keep outputs private, stop without generation when user instructs PLAN_ONLY, and never publish without separate owner approval.

## Current user preference
Owner explicitly chose two production profiles: **JOTA 1** (faceless/no music) and **JOTA 2** (expressive cinematic, optional rights-cleared music). Ask for mode selection on every **new independent video task**, hold video jobs until selected; do not unilaterally default. Both are FULL AUTOMATION with Artistly stills, VideoExpress moving clips/native exports, privacy, rights and technical QC. Dialogue-only vs narrated is separate. **Do not create media on skill-update-only requests.** Chat progress updates should reflect actual completed stages; no unsupported “background still running” claims.
