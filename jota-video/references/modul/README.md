# JOTA CONTENT FACTORY — MASTER PROMPT SKILLS PACK

> Modular Markdown instructions for automatic cinematic faceless animation, realistic motion, authentic Islamic storytelling, and non-musical audio design.

## Included files

| File | Purpose |
|---|---|
| `JOTA_SUPER_STRICT_QC_V2.md` | One-pass, **pre-generation-only** QC across character, faceless style, objects, physics, age, story logic, and timing |
| `JOTA_OBJECT_PHYSICS_CONTINUITY_V1.md` | Specialized object identity, counts, hand grips, gravity, throws, landing, and continuity |
| `JOTA_CHILD_BEHAVIOR_STORY_LOGIC_V1.md` | Age-appropriate activities, reactions, purposeful movement, and natural cause/effect |
| `JOTA_CINEMATIC_CAMERA_DIRECTOR_V1.md` | Professional camera angles, shot sizes, camera movement, lenses, framing, screen direction, lighting |
| `JOTA_NATURAL_DIALOGUE_ISLAMIC_STORYTELLING_ENGINE_V1.md` | Natural Indonesian dialogue, narrator, ~60-second hikmah, Qur'an and sahih-hadith sourcing discipline |
| `JOTA_PROFESSIONAL_VOICE_SOUND_DESIGN_ENGINE_V1.md` | ElevenLabs-aware voice performance, dialogue, ambience, Foley, animation text SFX, **no music** |

## Recommended usage

Use **one AI Prompt Generator** that reads the master rules and only the necessary specialist modules. Do not spawn an extra QC agent. A typical process is:

1. **Input:** one short story idea + locked character/reference descriptions + target lesson.
2. **Interpret:** identify story, ages, location, verified sources, duration, and relevant objects.
3. **Plan:** choose purposeful actions, short age-appropriate dialogue, 1 main hikmah, camera setup, and non-musical audio cues.
4. **Validate inside the same generation request:** apply the rules in `JOTA_SUPER_STRICT_QC_V2.md` and any relevant specialist module.
5. **Output:** finalized storyboard and a concise, actionable generation prompt for each shot, plus dialogue/voice/SFX plans as needed.
6. **Produce:** send approved plans to video/TTS/SFX generators. **No post-render QC, no frame analysis, and no automatic regeneration.**

## Rule hierarchy

When rules conflict, use this order:

1. **Accurate religious attribution and sourced meaning**: never invent Qur'an, hadith, Salaf quotations, or religious rulings.
2. **Character identity and absolute faceless consistency**: no eyes, eyebrows, nose, mouth, or lip sync.
3. **Character behavior and script causality**: one activity/reaction must have a reason and outcome.
4. **Object permanence and plausible physics**: no duplication, morphing, floating, or teleportation.
5. **Voice, dialogue, and environmental sound realism**: age-appropriate delivery and sound-to-action sync.
6. **Cinematic camera style**: use the simplest professional shot serving the story.
7. **Resource efficiency**: reduce unnecessary calls, instructions, and generation complexity.

## Suggested prompt-generator invocation

```text
SYSTEM INSTRUCTIONS:
Apply JOTA_SUPER_STRICT_QC_V2.md as the governing QC policy.
Use the included specialist modules when relevant to this story:
- Object Physics & Continuity
- Child Behavior & Story Logic
- Cinematic Camera Director
- Natural Dialogue & Islamic Storytelling
- Professional Voice & Sound Design

Do not create a standalone QC pass, post-render analysis, or automatic retries.
No music. All people remain completely faceless.
Religious claims require credible, verified source attribution; otherwise report NEEDS VERIFIED SOURCE.
Output one final script, compact timed storyboard, and one final video prompt per shot.

USER IDEA:
Ummi memanggil Umair yang sedang bermain, lalu dia merapikan mainan dan datang.
Target video: 60 detik. Target hikmah: berbuat baik kepada orang tua.
```

## Notes about implementation

- The module instructions are **not training weights** and do not guarantee flawless text-to-video output.
- `PRE-GENERATION QC STATUS: PASS` means the *prompt* has been checked for coherence; it does not certify a video render.
- If verified religious source material is not available, the system should avoid unsupported religious attribution rather than assert it.
- Internal voice IDs shown in the Voice module are **examples, not official ElevenLabs provider voice IDs**. Map them to provider IDs after casting.
- ElevenLabs feature/API details may evolve. Validate current model and parameter support before implementing API requests; the voice document provides a design specification, not a guarantee that every tag works with every model.
- Do not clone the voice of any real adult or child without appropriate authorization and consent.
- Do not output music, melodic stingers, rhythmic soundtracks, or chants as effects.

**END OF JOTA MASTER SKILLS README**


## Modul tambahan (owner 2026-11-04 04:50)
| File | Fungsi |
|---|---|
| `JOTA_PROFESSIONAL_STORYBOARD_DIRECTOR_VIDEOEXPRESS_V1.md` | Premis, 1 hikmah, 12 field per shot, bible tokoh/benda/lokasi, state ledger, BARU vs LAST FRAME, contoh 6 x 10 detik |
| `JOTA_FACELESS_IMAGE_VIDEO_PROMPT_ENGINE_V1.md` | Image Prompt mengunci desain, Video Prompt hanya menggerakkan; template master tokoh, KEYFRAME, LAST FRAME, shot tangan saja, kartu hikmah |

## Penyelarasan dengan SKILL.md (berlaku di atas isi modul)

**v4.0 (2026-11-05):** aturan teknis (prompt, pose wajah, BARU vs SAMBUNG, suara, durasi) sekarang hanya di `SKILL.md` v4 bagian 2 sampai 5 dan `METODE_PROMPT.md`. Modul ini acuan berpikir saja; daftar di bawah adalah catatan lama.
1. **Pose wajah:** modul storyboard bagian 6 dan prompt engine bagian 4 dan 19 masih melarang menunduk, profil, tidur, dan close-up (ditulis untuk v3.72). Keputusan owner v3.73 (04:31): yang dilarang hanya wajah tertutup, membelakangi kamera, dan memutar dari tertutup lalu terbuka lagi. Tabel pose aman di modul tetap dipakai sebagai saran blocking, bukan larangan; super QC tidak menolaknya.
2. **Durasi:** serial Shorts 6 shot x 10 detik (60 detik).
3. **Format kerja:** field per shot dan ledger di modul ditulis lewat `brief.json` (`adegan`, `alur`, `benda`, `kamera`, `latar`, `foley`, `dialog`, `sambung`, `akhir`); `dari-brief.mjs` membangun shots.json. Jangan mengarang field shots.json baru.
4. **Suara:** dialog dan narator ElevenLabs voice-over; ambience lewat `latar`, bunyi aksi lewat `foley`. Tanpa musik.
5. **Biaya:** VideoExpress gratis; yang dihemat token Claude dan ChatGPT (modul menyebut kredit, abaikan).
6. **Peta UI VideoExpress:** pakai `skills/videoexpress-runner/SKILL.md` dan `PETA_UI.md`, bukan daftar kontrol di prompt engine bagian 18.
