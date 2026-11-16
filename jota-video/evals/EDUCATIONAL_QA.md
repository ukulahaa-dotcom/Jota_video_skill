# JOTA Educational and Multilingual QA — v1.3.0 (NOT RUN)

This module adds teaching-quality checks to baseline `evals/CHECKLIST.md`; no generated video has been tested by this update. A PASS requires concrete timestamp/artifact and reviewer evidence, not model confidence.

| Eval | Required evidence / pass condition | Failure disposition |
|---|---|---|
| EDU01_OBJECTIVE | Lesson brief states observable learning objective, supported by story demonstration and final quiz | Rewrite storyboard before generation |
| EDU02_LEVEL | Vocabulary, speaking pace, sentence lengths and visual complexity suit declared age/level | Simplify or restructure |
| EDU03_ARABIC_SCRIPT | Arabic words/diacritics and endings accurate for declared form/context, proper RTL shaping and bidi punctuation | Block overlay and re-typeset; human review |
| EDU04_TARGET_PRONUNCIATION | Reviewed Arabic (or other target language) voice has correct phonemes, stress, vowels and speech clarity | Replace/re-record voice; do not claim native fluency |
| EDU05_TRANSLATION | Indonesian gloss/context faithful, no invented equivalent or false one-to-one word mapping | Revise script and subtitles |
| EDU06_DIALOGUE_FACIALS | Voices may alternate but every character remains 100% blank-faced without lip-sync in all frames | Reject affected clip and re-review |
| EDU07_RETENTION_PRACTICE | Lesson includes spaced recall/question with a real pause and visible confirmed answer | Add practice/replay beat |
| EDU08_SUBJECT_FACTS | Math computations, history dates, science mechanisms and cited Islamic claims verified by appropriate sources/reviewer | Block unsupported claims; separate fiction from facts |
| EDU09_TEXT_RENDER | All writing, math and Arabic produced by real typography overlays, checked for mirroring, legibility, safe framing | Do not generate lettering as part of AI background image |
| EDU10_CULTURAL_PRIVACY | Appropriate portrayal, no exposed child identifying details or inappropriate copied likenesses; content context respected | Quarantine/revise |
| EDU11_AUDIO | No music, voices clear, narration aligns with shot, no talk-over or missing end syllables | Rebuild mix and replay |
| EDU12_OWNER_SIGNOFF | Exact media candidate, educational script and visual QA accepted by owner; no auto-publication | Keep private draft only |

## Test fixtures — do not generate
1. Arabic word `قَلَمٌ` appears mirrored, incorrectly reshaped, or with a detached mark -> **FAIL EDU03/09**.
2. Voice pronounces `ح` like `ه` where distinguishable -> **FAIL EDU04** pending fluent review.
3. Characters appear to speak with lip movements -> **FAIL EDU06** regardless of otherwise perfect audio.
4. Math example displays 7 + 5 = 11 -> **FAIL EDU08** (example correct answer is 12).
5. Islamic fictional scene asserts a fabricated hadith without source -> **FAIL EDU08**.
6. Video ends before the listener gets time to answer the exercise -> **FAIL EDU07**.
7. No actual media exists but an agent claims `QA_PASS` -> **FAIL proof/evidence gate**.

All baseline face, child privacy, no music, delivery and `QUALITY_GATE_LOCKED` requirements remain independent and mandatory.
