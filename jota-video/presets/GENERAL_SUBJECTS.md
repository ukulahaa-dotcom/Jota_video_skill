# JOTA General Educational Lessons — subject router v1.3.0

All lesson types inherit `EDUCATIONAL_WORKFLOW.md`, the baseline faceless/no-music rules and the existing repository's `QUALITY_GATE_LOCKED`. These are design presets, not autonomous instructions to generate.

| Learning track | Goal style | Required source/accuracy checks | Recommended visual mode |
|---|---|---|---|
| Arabic language | Understand and say vocabulary/dialogue | Arabic orthography + harakat, dialect, native pronunciation, Indonesian translation | Original 2D faceless story + deterministic RTL overlays |
| English / Japanese / Indonesian | Understand target expressions or grammar | Native/proficient voice, spelling, register, furigana (Japanese when needed), translation fidelity | Faceless characters + speaker-role cards/captions, no lip-sync |
| Mathematics | Explain and correctly solve one conceptual problem | Independently check answer, steps, units and number notation; avoid misleading manipulations | Counters, manipulatives, geometrical motion, equations typeset in editor |
| Science / nature | Explain one mechanism or observable phenomenon | Good educational references, correct processes, quantitative accuracy and limitations | Verified diagrams/rigged educational animation; animals 100% faceless |
| History | Distinguish period/events and causal facts | Multiple reliable sources where disputed, period-accurate costumes/objects, date check | Contextual map, architecture, object motion; all people faceless |
| Islam / akhlak | Practice an everyday moral | Distinguish fictional story from Qur'an/hadith, cite and verify any sacred claim | JOTA original 2D cinematic faceless storytelling |
| Health / safety | Understand non-diagnostic concepts and safe habits | Independent medical/health expert or trusted health source, avoid specific personal medical advice | Appropriate schematic animation; medical quality gate remains locked |
| Life skills / environment | Demonstrate constructive steps | Practical/cultural accuracy, age suitability, safety | Hands/object demonstrations, faceless original scenes |

## Story-to-learning architecture
- **Define competence** (not just topic). Start with concrete actions/objects; end with a question that assesses the intended competency.
- **Use original source-specific examples**, not copied character dialogue from other repositories or branded media.
- **Avoid overclaiming** about attention, retention, virality or curriculum equivalence. These are hypotheses until actual user/viewer testing.
- **Age-suitable pacing** based on material complexity, not only the source repository's beat duration; allow adequate time to read and reason.
- **Narration-first/fact-first when teaching:** a pleasant story never overrides factual truth. No fake experiments, fake religious citations or distorted scientific mechanisms.
- **Multilingual:** track language, pronunciation, orthography, meaning, voice and subtitles independently. An off-screen narrator may be TTS; on-screen characters who speak are generated natively in the same VideoExpress job (see `../SKILL.md` rule 4).
- **QA:** run base evals E01–E16 and educational evals. Human subject-matter reviewer acceptance is recorded; technical codec checks alone never imply teaching quality.

## Adaptation rules
Start with one lesson episode as a private **future** proof scene only after explicit generation order, run by the operator chosen on the card (AI or Manual). Until then, create curriculum plans/scripts/storyboards only.
