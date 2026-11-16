# JOTA Educational Story Workflow — Original module v1.3.0

Status: DOCUMENTED / PLAN ONLY. Study of [ai-playbooks slow_english_learning_videos](https://github.com/ai-playbooks/slow_english_learning_videos), README and SYSTEM_PROMPT, confirmed a narrative teaching structure with two recurring 3D speaking characters, brief timed story beats, reference images, short clips, queue batching, timeline and export. This JOTA specification is independently written; it does NOT copy the source system prompt or grant permission to run it.

## Goal and supported subjects
Make original educational stories for children and families using faceless characters, narration, explanatory typography and original 2D cinematic storybook illustrations. Works for Arabic, English, Japanese, Indonesian, mathematics, science, history, manners and other carefully researched topics. Curriculum and content review change by subject. Production itself is NOT authorized merely by choosing a topic.

## Differences from source
- Source: recurring **3D English-speaking, lip-synced** characters. JOTA: original **2D featureless-face** characters; every animate being in every frame must have no eyes, eyebrows, nose, mouth, lips or implied features. Never lip-sync.
- Source: spoken dialogue inside video/audio prompts. JOTA v3.0: a separately timed **narrator who is not an on-screen character** may use TTS; any on-screen character who speaks is generated natively in the same VideoExpress job (video + voice together, Video Only OFF), filmed without visible mouth in JOTA 1. See `../SKILL.md` rule 4. Avoid fake voice cloning.
- Source: approximately 4–5-second sequential beats as default. JOTA: **learning-objective-dependent** pacing; extend display time when literacy or calculation needs reading/thinking. Do not import fixed timing or scene length as a provider guarantee.
- Source: accepting visual outputs with only minimal appearance review during the main run. JOTA: full-media faceless QA, spelling, pedagogy, verified claims and owner review are mandatory.
- Source: requires a browser agent and includes browser-specific interaction steps. JOTA v3.30: operator chosen by the owner on the settings card, AI (agent controls only the Artistly/VideoExpress Chrome tabs) or Manual (owner clicks, agent supplies per-scene steps). See `../SKILL.md` section 3.
- Source: 3D Pixar-style reference. JOTA: original 2D cinematic storybook; do not reproduce protected studio characters, logos or assets.

## Reusable lesson pipeline
1. **Intent and permission:** PLAN_ONLY by default. Record subject, language/dialect, target age, prior knowledge, platform and curriculum or applicable authority. New media requires explicit request; publication needs separate approval.
2. **Learning outcome:** write 1–3 observable competencies (e.g. correctly pronounce three Arabic classroom nouns; solve one addition with blocks), not just a theme.
3. **Fact and pedagogy check:** compile topic-specific source ledger, simplified explanation, key facts, likely misconceptions, reviewer and any high-stakes claims. Arabic grammar/harakat and translations require qualified review; factual science/health needs dependable sources; Qur'an/hadith separately verified.
4. **Narrative hook:** design child-sized challenge -> exploration -> demonstration -> recall/response -> payoff. Emotion expressed through posture, hands, scenery and narration, never face.
5. **Locked character/world bible:** 1–2 recurring characters for early pilots, original wardrobe and proportions, approved faceless references, count/scale and scene continuity. More characters only if instructional need is clear.
6. **Lesson/beat grid:** label BEAT01…N. Each beat has competency, narrator/role line, exact approved onscreen text, cognitive demand, visible action, duration estimate, image ID, clip ID and checking question. Longer language text needs longer on-screen holds.
7. **Visual generation plan:** plan independent image and motion prompts; one subject/action per shot. Don't embed Arabic or complex formulas into diffusion-image prompts: typeset text with a deterministic RTL-capable caption or editor overlay.
8. **Audio plan:** use Indonesian instructions if Indonesian learners; target-language pronunciation from a vetted voice/speaker; repeat natural phrases at comfortable speed with pauses. Narrator may be TTS; on-screen character speech is native in the same job (JOTA 1: no eyes and no nose ever; a mouth only while speaking). No music in JOTA 1.
9. **Proof scene:** after an explicit owner generate order only (run by Runner, SKILL.md 3A), test one scene for faceless stability, correct pronunciation, caption legibility and meaningful movement before any batch.
10. **Private assembly:** maintain scene IDs, output jobs, narration cue durations and exact accepted candidate. Keep source images/videos private; timeline scenes ordered with readable transitions.
11. **Evaluation:** apply E01–E16 base evals plus educational evals. Require comprehensive visual review, audio review, text accuracy, misconception check and owner approval.
12. **Release:** private review render with proven file identity and metrics; *never auto-publish*.

## Skill composition
`SKILL.md` -> `EDUCATIONAL_WORKFLOW.md` -> subject preset (`ARABIC_LANGUAGE_LESSONS.md` or `GENERAL_SUBJECTS.md`) -> `LESSON_BRIEF.md` -> `EDUCATIONAL_QA.md` -> baseline `FACELESS_CHARACTER.md` + `SCENE_WORKFLOW.md` (QC section G) + `../evals/CHECKLIST.md`.

## Privacy and source rights
Use made-up names/aliases, not children's real identity; source references are linked and summarized, not cloned/copied for commercial use without applicable rights. VideoExpress job batch sizes, audio options, Arabic voice quality and browser automation capability require verification against the live product at execution time, not guesses.
