# Generator shots.json resep rendang (owner 2026-11-07 04:02). Jalankan: python3 buat-shots.py
import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
STYLE = "Photorealistic, super realistic cinematic cooking-show video, shot on a full-frame cinema camera, shallow depth of field, soft natural window light, true-to-life skin and food textures, warm natural color grading."
LAY = "A bright modern kitchen: white marble countertop, matte black faucet, light-oak cabinets, a black induction cooktop with a wide black iron wok, soft daylight from a window on the left."
HANDS = "The cook is a modest Muslim woman in syar'i dress, seen only from the chest down: a full black burqa-style abaya with a black niqab: loose black sleeves reaching the wrists with fitted cuffs, so no forearm skin ever shows; a long black khimar falling over her chest; a cream linen apron over the abaya; only her clean hands with warm brown skin, short natural nails and no rings are bare. Same hands and outfit as the reference photo."
RI = "HANDS ONLY: Only the cook's hands, her long sleeves, and at most her hijab- and apron-covered torso appear at the edge of the frame. The head and face are never in the frame."
RV = "HANDS ONLY: Only the cook's hands, her long sleeves, and at most her hijab- and apron-covered torso appear. The sleeves stay down to the wrists for the entire video. The head and face never enter the frame at any moment; the camera never tilts up or pulls back to reveal the head."
# Acuan diimpor owner 2026-11-07 05:38 lewat Import from Artistly; nama kartu = awal prompt halaman acuan.
REF = [{"library": "My Artistly Images", "name": "The cook: a Muslim woman in a full black", "peran": "tokoh"}]
def img(scene):
    return "\n".join(["MANDATORY RULES:", RI, "NO TEXT: No words, letters, logos, or watermarks anywhere.", f"STYLE: {STYLE}", f"SCENE: {scene}", f"LAYOUT: {LAY}", f"HANDS: {HANDS}", "Aspect ratio 9:16."])
def vid(i, judul, cam, motion, sound):
    return "\n".join([f"SHOT{i:02d}: {judul}", "MANDATORY RULES:", RV, "NO HUMAN VOICES: no talking, humming, or singing in the clip; only the cooking sounds described.", "NO MUSIC: no background music, no melody, no beat.", "REAL TOOLS: every sound comes from the tool or food on screen at that moment.", f"STYLE: {STYLE}", f"CAMERA: {cam}", "MOTION:", motion, "SOUND:", sound, "CONSISTENCY LOCK:", f"STYLE: {STYLE} Keep this exact style.", f"HANDS: {HANDS}", f"LAYOUT: {LAY}"])
# (judul, kamera, adegan awal, gerak, suara, foley [(t, suara)], narasi, label langkah)
S = [
 ("Bahan rendang", "A static top-down overhead shot of the whole counter.",
  "Top-down flat lay on the marble counter: 1 kg raw beef on a wooden board, a glass jug of thick white coconut milk, shallots, garlic, red curly chilies, ginger, galangal, lemongrass, kaffir lime leaves, bay leaves, a turmeric leaf, cinnamon sticks, cloves, cardamom, half a nutmeg and asam kandis in small white bowls; the cook's hands rest at the bottom edge.",
  "The cook's hands slide the bowl of red chilies and the glass jug of coconut milk a little closer to the centre, then rest flat on the marble.",
  "Soft scrape of bowls on marble, a glass jug set down gently.", [(1.5, "a ceramic bowl sliding on marble"), (4, "a glass jug set down on marble")],
  "Rendang daging khas Padang. Siapkan satu kilo daging sapi, satu setengah liter santan kental, dan bumbunya.", None),
 ("Kupas bawang", "A static macro close-up at a 45-degree angle over a white bowl.",
  "Macro close-up: the cook's hands hold a shallot and a small paring knife over a white bowl half full of peeled shallots and garlic cloves.",
  "The left hand turns the shallot while the right hand peels away the papery skin with the paring knife, then drops the peeled shallot into the bowl; she picks up a garlic clove and peels it the same way.",
  "Dry papery skin crackling, a small knife tapping, a peeled shallot dropping into a ceramic bowl.", [(1, "dry onion skin peeling and crackling"), (3.5, "a shallot dropping into a ceramic bowl"), (6, "garlic skin crackling")],
  "Kupas dua puluh siung bawang merah dan sembilan siung bawang putih.", ("1", "BUMBU HALUS", "Kupas bawang merah dan putih")),
 ("Masuk blender", "A static close-up at a 45-degree angle, focused on the open glass blender jar.",
  "Close-up: an open glass blender jar holding peeled shallots and garlic on the marble; a small plate of sliced red curly chilies, ginger and galangal beside it; the cook's right hand holds the plate.",
  "The cook tips the sliced red chilies into the jar, then adds the ginger and galangal slices with her fingers, and places the lid on the jar.",
  "Chilies and spice slices dropping into a glass jar, the plastic lid clicking shut.", [(1, "sliced chilies dropping into a glass blender jar"), (4, "ginger slices dropping into glass"), (6.5, "a blender lid clicking shut")],
  "Masukkan ke blender bersama seratus gram cabai merah keriting, jahe, dan lengkuas.", ("2", "BUMBU HALUS", "Cabai, jahe, lengkuas ke blender")),
 ("Haluskan bumbu", "A static side close-up at eye level with the blender jar.",
  "Side close-up of the closed glass blender jar full of shallots, garlic, red chilies, ginger and galangal; the cook's left hand rests on the lid and her right finger is on the button.",
  "The cook presses the button; the blades spin and the chunks turn into a smooth, bright orange-red paste while her left hand holds the lid steady. She releases the button and the paste settles.",
  "A blender motor starting, whirring steadily, then stopping.", [(0.8, "a kitchen blender motor starting"), (2, "a blender whirring a thick paste"), (6.8, "a blender motor stopping")],
  "Haluskan sampai benar-benar lembut.", ("3", "BUMBU HALUS", "Haluskan sampai lembut")),
 ("Daun dan serai", "A static close-up from slightly above a wooden board.",
  "Close-up on a wooden cutting board: a lemongrass stalk, a turmeric leaf, kaffir lime leaves and bay leaves; the cook's right hand holds a chef's knife upside down above the lemongrass.",
  "The cook bruises the lemongrass by pressing it twice with the back of the knife, then ties the turmeric leaf into a simple knot with both hands and lays it beside the kaffir lime leaves.",
  "Two dull thuds of a knife spine on wood, a leaf rustling as it is knotted.", [(1.2, "the back of a knife thudding on lemongrass on a wooden board"), (2.6, "a second knife thud on wood"), (5, "a fresh leaf rustling and being knotted")],
  "Memarkan serai, simpulkan daun kunyit, lalu siapkan daun jeruk dan daun salam.", ("4", "BUMBU UTUH", "Serai dimemarkan, daun kunyit disimpul")),
 ("Rempah utuh", "A static top-down overhead shot of a small white bowl.",
  "Top-down: an empty small white bowl on the marble surrounded by cinnamon sticks, cloves, cardamom pods, half a nutmeg and two dried asam kandis slices; the cook's fingers reach in from the bottom.",
  "The cook's fingers place the cinnamon sticks into the bowl, then a pinch of cloves, the cardamom pods, the half nutmeg and the asam kandis, one after another.",
  "Small dry spices clinking softly into a ceramic bowl.", [(1, "cinnamon sticks placed in a ceramic bowl"), (3, "cloves dropping into a ceramic bowl"), (5, "cardamom pods dropping"), (6.5, "a nutmeg dropping into a bowl")],
  "Siapkan juga kayu manis, cengkih, kapulaga, pala, dan asam kandis.", ("5", "BUMBU UTUH", "Kayu manis, cengkih, kapulaga, pala, asam kandis")),
 ("Potong daging", "A static close-up at a 45-degree angle over the wooden board.",
  "45-degree close-up: a slab of raw beef on a wooden board; the cook's left hand holds it with curled fingertips and her right hand holds a chef's knife.",
  "The cook slices the beef across the grain into thick strips with steady strokes, then cuts the strips into neat 4 cm cubes and pushes them together with the flat of the knife.",
  "A sharp knife cutting through raw meat and tapping the wooden board.", [(1, "a sharp knife slicing raw beef on a wooden board"), (3.5, "knife tapping a wooden board"), (6.5, "beef cubes pushed with a knife blade")],
  "Potong daging melawan serat, kira-kira empat sentimeter.", ("6", "DAGING", "Potong melawan serat, ±4 cm")),
 ("Santan dan bumbu", "A static low side angle at the height of the wok rim.",
  "Low side angle: the wide black iron wok on the cooktop holding the orange-red spice paste; the cook's left hand holds the glass jug of thick white coconut milk above it, her right hand holds a long wooden spatula.",
  "The cook pours a thick stream of coconut milk into the wok over the paste, sets the jug down, and stirs slowly with the wooden spatula until the sauce turns an even pale orange.",
  "Thick coconut milk pouring and splashing gently, a wooden spatula stirring in a metal wok.", [(0.8, "thick coconut milk pouring into a metal wok"), (4.2, "a glass jug set down"), (5, "a wooden spatula stirring liquid in a wok")],
  "Masukkan santan dan bumbu halus ke kuali. Aduk terus dengan api sedang supaya santan tidak pecah.", ("7", "MEMASAK", "Santan + bumbu, aduk terus")),
 ("Rempah ke kuali", "A static top-down shot directly over the wok.",
  "Top-down over the wok: pale orange coconut sauce bubbling gently; the cook's right hand holds the bruised lemongrass and the knotted turmeric leaf, the small bowl of whole spices beside the cooktop.",
  "The cook drops in the lemongrass and the knotted turmeric leaf, then the kaffir lime and bay leaves, then tips in the bowl of whole spices, and gives one slow stir with the spatula.",
  "Leaves and spices dropping into bubbling liquid, a gentle simmer.", [(0.5, "a liquid simmering gently in a wok"), (1.2, "lemongrass dropping into a bubbling sauce"), (4.5, "whole spices dropping into liquid"), (6.5, "a wooden spatula stirring")],
  "Tambahkan serai, daun-daunan, dan rempah utuh.", ("8", "MEMASAK", "Serai, daun, rempah utuh")),
 ("Masukkan daging", "A slow push-in at a 45-degree angle toward the wok.",
  "Close-up: the orange coconut sauce boiling with a thin layer of glistening oil; the cook's hands hold the wooden board of raw beef cubes tilted over the wok.",
  "The cook slides the beef cubes from the board into the sauce with the knife blade, sets the board aside, and turns the beef gently with the spatula until every piece is covered.",
  "Raw beef plopping into a boiling sauce, steady bubbling, a spatula turning the meat.", [(1, "raw meat cubes plopping into boiling sauce"), (3, "a thick sauce boiling"), (5.5, "a wooden spatula turning meat in a wok")],
  "Setelah santan mendidih dan mulai berminyak, masukkan daging.", ("9", "MEMASAK", "Santan berminyak, masukkan daging")),
 ("Masak empat jam", "A static macro close-up at a low angle over the wok surface.",
  "Macro close-up: beef chunks in a thick, dark brown rendang sauce bubbling slowly, glossy red-brown oil on the surface; the tip of the wooden spatula at the edge of the frame.",
  "The thick sauce bubbles slowly; the spatula turns two chunks of beef over, revealing a dark caramelized side, and the sauce clings to the meat as it settles.",
  "Slow thick bubbling, a soft scrape of the spatula on the wok.", [(0.5, "a very thick sauce bubbling slowly"), (3, "a wooden spatula scraping a wok gently"), (6, "thick bubbles popping")],
  "Kecilkan api. Aduk sesekali kurang lebih empat jam, sampai kuah mengering dan berwarna cokelat gelap.", ("10", "± 4 JAM, API KECIL", "Aduk sesekali sampai cokelat gelap")),
 ("Sajikan", "A slow top-down push-in over the plate.",
  "Top-down: a white plate on the marble with a mound of steamed white rice and dark glossy beef rendang beside it; the cook's fingers hold a few thin slices of red chili above the plate.",
  "The cook sprinkles the red chili slices over the rendang, places a small spoon beside the plate, and withdraws her hands, leaving the finished plate in soft daylight.",
  "A spoon set down on marble, a calm kitchen.", [(4.5, "a metal spoon set down on marble")],
  "Rendang siap disajikan. Selamat mencoba.", None),
]
shots, langkah = [], []
for i, (judul, cam, awal, gerak, suara, foley, narasi, lab) in enumerate(S, 1):
    shots.append({"id": f"SHOT{i:02d}", "title": judul, "people": "hands", "start": {"type": "BARU"}, "refs": REF, "consistent_character": True,
                  "narration": narasi, "voice": "KOKI", "suara_latar": "a quiet modern kitchen", "foley": [{"t": t, "suara": f} for t, f in foley],
                  "length": 8, "save_last_frame": False, "transition": "cut",
                  "image_prompt": img(awal), "video_prompt": vid(i, judul, cam, gerak, suara)})
    if lab: langkah.append({"t": (i - 1) * 8 + 0.4, "no": lab[0], "label": lab[1], "teks": lab[2], "lama": 3.4})
data = {"project": "JOTA-M1-RESEP-RENDANG-20261107", "tag": "RENDANG2", "auto": False, "ratio": "9:16", "image_type": "human", "head_covering": False, "captions": False, "narrator": "tokoh",
        "serial": {"gaya": "masak", "serial": "DAPUR JOTA", "judul": "Rendang Daging", "info": ["1 kg daging", "1,5 L santan", "± 4 jam api kecil"], "langkah": langkah,
                   "pesan": "Selamat mencoba!", "ajak": "Simpan resepnya, bagikan ke keluarga", "follow": "@ohankang"},
        "sources": ["IDN Times, Resep Rendang Daging Sapi Khas Padang: 1 kg daging, 1,5 L santan kental, 20 bawang merah, 9 bawang putih, 100 g cabai keriting, jahe, lengkuas, serai, kayu manis, pala, asam kandis, cengkih, kapulaga, daun kunyit, daun salam, daun jeruk; api kecil, rendang kering 5-6 jam, basah sekitar 4 jam. https://www.idntimes.com/food/recipe/resep-rendang-daging-sapi-khas-padang-bumbu-dan-cara-membuatnya-00-prv1d-q2s7yr",
                    "Pembanding: Kompas TV (resep rendang autentik Padang), Fimela (rendang Padang 1 kg daging)."],
        "shots": shots}
json.dump(data, open(os.path.join(HERE, "shots.json"), "w"), indent=2, ensure_ascii=False)
print(len(shots), "shot,", len(shots) * 8, "detik")
