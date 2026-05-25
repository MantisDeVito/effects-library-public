// AUTO-GENERATED from recipes.json by _automation/recipes-drop/sync-recipes-data.mjs
// Do not edit — edit recipes.json, then re-run sync (server.mjs does this on startup).
window.RECIPES_DATA = {
  "version": "1.0",
  "description": "Common-effect recipes. Each recipe maps to one overlay clip, one SFX file, or both. Paths are relative to effects-library/.",
  "categories": [
    {
      "id": "whooshes",
      "name": "Whooshes"
    },
    {
      "id": "hits",
      "name": "Hits / impacts"
    },
    {
      "id": "camera",
      "name": "Camera sounds"
    },
    {
      "id": "risers",
      "name": "Risers / build-ups"
    },
    {
      "id": "ui",
      "name": "UI clicks / pops"
    },
    {
      "id": "notifications",
      "name": "Notifications / dings"
    },
    {
      "id": "typewriter",
      "name": "Typewriter / text reveal"
    },
    {
      "id": "reverse",
      "name": "Reverse whooshes"
    },
    {
      "id": "tape-stop",
      "name": "Tape stop / record scratch"
    },
    {
      "id": "countdown",
      "name": "Countdown / tick"
    },
    {
      "id": "stingers",
      "name": "Stingers / sub-drops"
    },
    {
      "id": "scifi-ui",
      "name": "Sci-fi / data UI"
    },
    {
      "id": "pickups",
      "name": "Game pickups / coins"
    },
    {
      "id": "light-leaks",
      "name": "Light leaks"
    },
    {
      "id": "glitch",
      "name": "Glitch / digital"
    },
    {
      "id": "paper",
      "name": "Paper"
    },
    {
      "id": "vhs",
      "name": "VHS / security cam"
    },
    {
      "id": "atmosphere",
      "name": "Atmosphere"
    },
    {
      "id": "smoke",
      "name": "Smoke / fog"
    },
    {
      "id": "sparks",
      "name": "Sparks / fire"
    }
  ],
  "recipes": [
    {
      "id": "whoosh-cinematic-high",
      "name": "Cinematic high whoosh",
      "category": "whooshes",
      "kind": "sfx",
      "tags": [
        "whoosh",
        "transition",
        "cinematic"
      ],
      "duration_sec": 1,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Cinematic Whoosh digital.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Bright high-end sweep. Drop on any cut to a new scene.",
      "priority": 100
    },
    {
      "id": "whoosh-stutter-sub",
      "name": "Stutter sub-bass whoosh",
      "category": "whooshes",
      "kind": "sfx",
      "tags": [
        "whoosh",
        "stutter",
        "sub"
      ],
      "duration_sec": 1,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Stutter Whoosh.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Choppy, low-end. Good on hard cuts with a low-frequency hit.",
      "priority": 100
    },
    {
      "id": "whoosh-digital-sweep",
      "name": "Digital sweep whoosh",
      "category": "whooshes",
      "kind": "sfx",
      "tags": [
        "whoosh",
        "digital",
        "sweep"
      ],
      "duration_sec": 1,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/mixkit-futuristic-sweep-pass-by-169.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Sci-fi / tech-y. Pairs well with glitch or RGB overlays.",
      "priority": 100
    },
    {
      "id": "hit-cinematic-boom",
      "name": "Cinematic sub-boom",
      "category": "hits",
      "kind": "sfx",
      "tags": [
        "hit",
        "boom",
        "sub",
        "cinematic"
      ],
      "duration_sec": 1,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Subdrop Low 02.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Cinematic low-frequency impact. Sits under a flash frame.",
      "priority": 100
    },
    {
      "id": "hit-mid-punch",
      "name": "Mid punch hit",
      "category": "hits",
      "kind": "sfx",
      "tags": [
        "hit",
        "punch",
        "impact"
      ],
      "duration_sec": 0.5,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Hit 3.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Punchy mid-range hit. Good for accenting beat-driven cuts.",
      "priority": 100
    },
    {
      "id": "hit-level-up-ping",
      "name": "Level-up positive ping",
      "category": "hits",
      "kind": "sfx",
      "tags": [
        "hit",
        "ping",
        "positive",
        "ui"
      ],
      "duration_sec": 1,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/level-up-2-199574.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Achievement / reveal sting. Common short-form vocab.",
      "priority": 100
    },
    {
      "id": "camera-dslr-shutter",
      "name": "DSLR shutter click",
      "category": "camera",
      "kind": "sfx",
      "tags": [
        "camera",
        "shutter",
        "click"
      ],
      "duration_sec": 0.3,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/COMCam_Mech_Mini_Gears,_Camera_Wind,_Handling,_Clicks,_Shutter_Ocular.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Source file contains multiple shutter takes — trim to the click you want in Premiere.",
      "priority": 100
    },
    {
      "id": "camera-film-advance",
      "name": "Film advance / mechanism",
      "category": "camera",
      "kind": "sfx",
      "tags": [
        "camera",
        "film",
        "mechanism",
        "vintage"
      ],
      "duration_sec": 0.8,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Super8.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Vintage Super-8-style mechanism. Pairs with film-grain or dust overlays.",
      "priority": 100
    },
    {
      "id": "camera-projector-roll",
      "name": "Projector roll loop",
      "category": "camera",
      "kind": "sfx",
      "tags": [
        "camera",
        "projector",
        "loop",
        "cinema"
      ],
      "duration_sec": 4,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Loop-Film.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Loopable projector-room ambience. Under credits / openings.",
      "priority": 100
    },
    {
      "id": "light-leak-warm-flash",
      "name": "Warm flash burst + shutter",
      "category": "light-leaks",
      "kind": "paired",
      "tags": [
        "light-leak",
        "flash",
        "warm",
        "shutter"
      ],
      "duration_sec": 1,
      "overlay": {
        "file": "overlays/Light Leaks/GettyImages-1294996046.mp4",
        "blend": "screen",
        "opacity": 1
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/COMCam_Mech_Mini_Gears,_Camera_Wind,_Handling,_Clicks,_Shutter_Ocular.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Photo-snap moment. Use at scene transitions.",
      "priority": 100
    },
    {
      "id": "light-leak-cold-streak",
      "name": "Cold streak + whoosh",
      "category": "light-leaks",
      "kind": "paired",
      "tags": [
        "light-leak",
        "streak",
        "transition"
      ],
      "duration_sec": 1.2,
      "overlay": {
        "file": "overlays/Light Leaks/03.mp4",
        "blend": "screen",
        "opacity": 1
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Whoosh Fast 01.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Fast directional streak. Hides hard cuts.",
      "priority": 100
    },
    {
      "id": "light-leak-slow-drift",
      "name": "Slow warm drift + cinema swell",
      "category": "light-leaks",
      "kind": "paired",
      "tags": [
        "light-leak",
        "drift",
        "slow",
        "cinematic"
      ],
      "duration_sec": 2.5,
      "overlay": {
        "file": "overlays/Bokeh/6302630_Light_Leak_Transition_3840x2160.mov",
        "blend": "screen",
        "opacity": 0.9
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Cinema-1.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Slower, breathier transition. For thoughtful / emotional cuts.",
      "priority": 100
    },
    {
      "id": "glitch-rgb-stutter",
      "name": "RGB stutter + glitch SFX",
      "category": "glitch",
      "kind": "paired",
      "tags": [
        "glitch",
        "rgb",
        "stutter",
        "digital"
      ],
      "duration_sec": 0.4,
      "overlay": {
        "file": "overlays/_backfill/glitch-rgb-stutter.mp4",
        "blend": "add",
        "opacity": 1,
        "_backfill_needed": true,
        "_backfill_query": "Pexels: RGB chromatic aberration glitch overlay, vertical-friendly, 1-2 sec"
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Glitch - 1.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Quick RGB-split glitch hit. Backfill overlay pending.",
      "priority": 100
    },
    {
      "id": "glitch-scanline-corruption",
      "name": "Scan-line corruption + static",
      "category": "glitch",
      "kind": "paired",
      "tags": [
        "glitch",
        "scanline",
        "corruption"
      ],
      "duration_sec": 0.6,
      "overlay": {
        "file": "overlays/_backfill/glitch-scanline-corruption.mp4",
        "blend": "screen",
        "opacity": 1,
        "_backfill_needed": true,
        "_backfill_query": "Pexels: digital scan-line corruption overlay, hard edges, 1 sec"
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Fast Glitch 1.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Mid-band digital corruption. Backfill overlay pending.",
      "priority": 100
    },
    {
      "id": "glitch-stutter-bitcrush",
      "name": "Quick stutter cut + bit-crush",
      "category": "glitch",
      "kind": "paired",
      "tags": [
        "glitch",
        "stutter",
        "bitcrush"
      ],
      "duration_sec": 0.4,
      "overlay": {
        "file": "overlays/_backfill/glitch-stutter-bitcrush.mp4",
        "blend": "overlay",
        "opacity": 1,
        "_backfill_needed": true,
        "_backfill_query": "Pexels: pixel sort / data-mosh / bit-crush overlay, short burst, 1 sec"
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/glitch-master-140900.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Quick stutter on a beat. Backfill overlay pending.",
      "priority": 100
    },
    {
      "id": "paper-crumple-rip",
      "name": "Crumple + paper rip",
      "category": "paper",
      "kind": "paired",
      "tags": [
        "paper",
        "crumple",
        "rip"
      ],
      "duration_sec": 1,
      "overlay": {
        "file": "overlays/Paper Textures/0_Crumpled_Paper_Paper_2160x3840.mp4",
        "blend": "multiply",
        "opacity": 1
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/paper-flutter-5933.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Scrapbook / handmade feel. Multiply for the texture overlay.",
      "priority": 100
    },
    {
      "id": "paper-marker-scribble",
      "name": "Pen / marker scribble + scratch",
      "category": "paper",
      "kind": "paired",
      "tags": [
        "paper",
        "marker",
        "scribble",
        "annotation"
      ],
      "duration_sec": 1.5,
      "overlay": {
        "file": "overlays/Paper Textures/0_Paper_Animation_3840x2160.mp4",
        "blend": "multiply",
        "opacity": 1
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Marker.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Underline / annotation moment. Pairs with text callouts.",
      "priority": 100
    },
    {
      "id": "paper-page-flutter",
      "name": "Page flutter + breeze",
      "category": "paper",
      "kind": "paired",
      "tags": [
        "paper",
        "flutter",
        "breeze"
      ],
      "duration_sec": 2,
      "overlay": {
        "file": "overlays/Paper Textures/GettyImages-1372026255.mp4",
        "blend": "screen",
        "opacity": 0.9
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Wind Gusts.mp3",
        "gain_db": -3,
        "offset_sec": 0
      },
      "notes": "Gentle reveal. Use before a quote or memory cut.",
      "priority": 100
    },
    {
      "id": "vhs-static-tape",
      "name": "Static noise + tape warble",
      "category": "vhs",
      "kind": "paired",
      "tags": [
        "vhs",
        "static",
        "analog",
        "tape"
      ],
      "duration_sec": 4,
      "overlay": {
        "file": "overlays/Security Camera/01_vhs_static_tape.mp4",
        "blend": "screen",
        "opacity": 0.85
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Fast Glitch 2.mp3",
        "gain_db": -3,
        "offset_sec": 0
      },
      "notes": "Sustained VHS look. Loop the overlay for longer clips.",
      "priority": 100
    },
    {
      "id": "vhs-scanlines-buzz",
      "name": "Scan-lines + signal buzz",
      "category": "vhs",
      "kind": "paired",
      "tags": [
        "vhs",
        "scanlines",
        "buzz"
      ],
      "duration_sec": 4,
      "overlay": {
        "file": "overlays/Security Camera/05_scan_lines.mp4",
        "blend": "overlay",
        "opacity": 0.6
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Glitch - 3.wav",
        "gain_db": -6,
        "offset_sec": 0
      },
      "notes": "Subtle scanline texture sitting over the shot. Low SFX gain.",
      "priority": 100
    },
    {
      "id": "vhs-tracking-error",
      "name": "Tracking error + glitch",
      "category": "vhs",
      "kind": "paired",
      "tags": [
        "vhs",
        "tracking",
        "glitch"
      ],
      "duration_sec": 1,
      "overlay": {
        "file": "overlays/Security Camera/02_analog_vhs.mp4",
        "blend": "screen",
        "opacity": 1
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Glitch - 7.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Punch-in tracking-error moment. Good for memory-flash cuts.",
      "priority": 100
    },
    {
      "id": "atmosphere-film-grain",
      "name": "Film grain loop",
      "category": "atmosphere",
      "kind": "overlay",
      "tags": [
        "atmosphere",
        "grain",
        "film",
        "loop"
      ],
      "duration_sec": 10,
      "overlay": {
        "file": "overlays/Dust or Film/0_Film_Grain_3840x2160.mp4",
        "blend": "overlay",
        "opacity": 0.4
      },
      "sfx": null,
      "notes": "Sustained look — duplicate / loop across longer shots.",
      "priority": 100
    },
    {
      "id": "atmosphere-dust-shaft",
      "name": "Dust shaft + room tone",
      "category": "atmosphere",
      "kind": "paired",
      "tags": [
        "atmosphere",
        "dust",
        "room"
      ],
      "duration_sec": 6,
      "overlay": {
        "file": "overlays/Dust or Film/01.mp4",
        "blend": "screen",
        "opacity": 0.7
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/MA_Beison_Atmosphere_on_the_Street_in_the_Town_1.mp3",
        "gain_db": -10,
        "offset_sec": 0
      },
      "notes": "Mood-setter for interiors. Keep SFX subtle.",
      "priority": 100
    },
    {
      "id": "atmosphere-bokeh-warm",
      "name": "Warm bokeh drift + pad swell",
      "category": "atmosphere",
      "kind": "paired",
      "tags": [
        "atmosphere",
        "bokeh",
        "warm",
        "swell"
      ],
      "duration_sec": 5,
      "overlay": {
        "file": "overlays/Bokeh/02.mp4",
        "blend": "screen",
        "opacity": 0.8
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Cinema-2.wav",
        "gain_db": -6,
        "offset_sec": 0
      },
      "notes": "Romantic / nostalgic mood. Layer under voice-over.",
      "priority": 100
    },
    {
      "id": "smoke-slow-reveal",
      "name": "Slow smoke reveal + low rumble",
      "category": "smoke",
      "kind": "paired",
      "tags": [
        "smoke",
        "reveal",
        "rumble"
      ],
      "duration_sec": 3,
      "overlay": {
        "file": "overlays/smoke-fog/03.mp4",
        "blend": "screen",
        "opacity": 1
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Subdrop Low 02.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Dramatic reveal. Time the SFX peak to the smoke clearing.",
      "priority": 100
    },
    {
      "id": "smoke-burst-whoosh",
      "name": "Smoke burst + whoosh",
      "category": "smoke",
      "kind": "paired",
      "tags": [
        "smoke",
        "burst",
        "whoosh"
      ],
      "duration_sec": 1.5,
      "overlay": {
        "file": "overlays/smoke-fog/05.mp4",
        "blend": "screen",
        "opacity": 1
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Whoosh Big 03.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Fast smoke transition. Hides hard cuts in action edits.",
      "priority": 100
    },
    {
      "id": "smoke-drift-ambient",
      "name": "Slow drift loop + ambient wind",
      "category": "smoke",
      "kind": "paired",
      "tags": [
        "smoke",
        "drift",
        "ambient",
        "loop"
      ],
      "duration_sec": 8,
      "overlay": {
        "file": "overlays/_backfill/smoke-drift-loop.mp4",
        "blend": "screen",
        "opacity": 0.7,
        "_backfill_needed": true,
        "_backfill_query": "Pexels: slow fog drift loop, dark background, 5-10 sec loopable"
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Wind Gusts.mp3",
        "gain_db": -6,
        "offset_sec": 0
      },
      "notes": "Sustained mood drift. Backfill overlay pending.",
      "priority": 100
    },
    {
      "id": "sparks-bright-burst",
      "name": "Bright spark burst + sizzle",
      "category": "sparks",
      "kind": "paired",
      "tags": [
        "sparks",
        "burst",
        "fire",
        "sizzle"
      ],
      "duration_sec": 1,
      "overlay": {
        "file": "overlays/fire-sparks/01.mp4",
        "blend": "screen",
        "opacity": 1
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Vadi Sound - Seeds and Sticks - Fire Burning Flames Sizzle.aac",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Punchy spark accent. Good on a beat hit.",
      "priority": 100
    },
    {
      "id": "sparks-ember-drift",
      "name": "Ember drift + crackle",
      "category": "sparks",
      "kind": "paired",
      "tags": [
        "sparks",
        "ember",
        "drift",
        "crackle"
      ],
      "duration_sec": 3,
      "overlay": {
        "file": "overlays/fire-sparks/04.mp4",
        "blend": "screen",
        "opacity": 0.9
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Vadi Sound - Seeds and Sticks - Fire Burning Flames Sizzle.aac",
        "gain_db": -6,
        "offset_sec": 0.5
      },
      "notes": "Slower ember mood. Same sizzle source, lower gain + later start.",
      "priority": 100
    },
    {
      "id": "sparks-magic-sparkle",
      "name": "Magic sparkle + chime",
      "category": "sparks",
      "kind": "paired",
      "tags": [
        "sparks",
        "sparkle",
        "magic",
        "chime"
      ],
      "duration_sec": 1.5,
      "overlay": {
        "file": "overlays/Bokeh/6301353_Celebration_Sparkle_3840x2160.mov",
        "blend": "screen",
        "opacity": 1
      },
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Synth Sparkle Tone High Pitch Tone Burst Ding 17.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Reveal / magical moment. Pairs well with logo stings.",
      "priority": 100
    },
    {
      "id": "riser-cinematic",
      "name": "Cinematic riser",
      "category": "risers",
      "kind": "sfx",
      "tags": [
        "riser",
        "build",
        "cinematic"
      ],
      "duration_sec": 2.5,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Riser.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Standard cinematic build-up. Use under text reveals or before a hard cut.",
      "priority": 100
    },
    {
      "id": "riser-engine-reverb",
      "name": "Engine reverb riser",
      "category": "risers",
      "kind": "sfx",
      "tags": [
        "riser",
        "engine",
        "reverb",
        "build"
      ],
      "duration_sec": 3,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/riser engine reverb.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Mechanical / engine-flavoured build. Pairs well with technical product reveals.",
      "priority": 100
    },
    {
      "id": "riser-sweep",
      "name": "Long sweep riser",
      "category": "risers",
      "kind": "sfx",
      "tags": [
        "riser",
        "sweep",
        "build"
      ],
      "duration_sec": 1.5,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/mixkit-fast-sweeping-transition-164.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Shorter sweep-as-build. Punchier than the two longer risers.",
      "priority": 100
    },
    {
      "id": "ui-hard-pop",
      "name": "Hard pop",
      "category": "ui",
      "kind": "sfx",
      "tags": [
        "ui",
        "pop",
        "click"
      ],
      "duration_sec": 0.3,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/mixkit-long-pop-2358.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Crisp pop under text reveals or button presses.",
      "priority": 100
    },
    {
      "id": "ui-arcade-bling",
      "name": "Arcade mechanical bling",
      "category": "ui",
      "kind": "sfx",
      "tags": [
        "ui",
        "arcade",
        "bling",
        "click"
      ],
      "duration_sec": 0.5,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/mixkit-arcade-mechanical-bling-210.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Mechanical click with tonal sparkle. Good on a positive UI cut.",
      "priority": 100
    },
    {
      "id": "ui-tick",
      "name": "Sharp tick",
      "category": "ui",
      "kind": "sfx",
      "tags": [
        "ui",
        "tick",
        "click",
        "snap"
      ],
      "duration_sec": 0.2,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Tick - Sound Effect (HD) - 128.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Tiny tick — micro-moments, beat ticks, on-frame snaps.",
      "priority": 100
    },
    {
      "id": "notif-message-bubble",
      "name": "Message bubble",
      "category": "notifications",
      "kind": "sfx",
      "tags": [
        "notification",
        "message",
        "bubble"
      ],
      "duration_sec": 0.6,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/message buble.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "iMessage / chat-style ping. Use when an SMS or DM appears on-screen.",
      "priority": 100
    },
    {
      "id": "notif-interface-hint",
      "name": "Interface hint",
      "category": "notifications",
      "kind": "sfx",
      "tags": [
        "notification",
        "interface",
        "hint"
      ],
      "duration_sec": 0.7,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/mixkit-interface-hint-notification-911.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Soft system notification. Tooltip / hint moments.",
      "priority": 100
    },
    {
      "id": "notif-bell-ding",
      "name": "Bell ding",
      "category": "notifications",
      "kind": "sfx",
      "tags": [
        "notification",
        "bell",
        "ding",
        "achievement"
      ],
      "duration_sec": 0.8,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/digital-bell-ding-demo-309885.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Classic completion / achievement ding.",
      "priority": 100
    },
    {
      "id": "typewriter-classic",
      "name": "Typewriter",
      "category": "typewriter",
      "kind": "sfx",
      "tags": [
        "typewriter",
        "text",
        "reveal",
        "type"
      ],
      "duration_sec": 3,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Typewriter Sound Effect.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Lay under animated text — trim to match your text length.",
      "priority": 100
    },
    {
      "id": "typewriter-marker",
      "name": "Marker write",
      "category": "typewriter",
      "kind": "sfx",
      "tags": [
        "typewriter",
        "marker",
        "annotation",
        "underline"
      ],
      "duration_sec": 1.5,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Marker.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Felt-tip annotation sound. Use under underlines / circle reveals.",
      "priority": 100
    },
    {
      "id": "typewriter-pencil",
      "name": "Pencil drawing",
      "category": "typewriter",
      "kind": "sfx",
      "tags": [
        "typewriter",
        "pencil",
        "draw",
        "sketch"
      ],
      "duration_sec": 2,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/drawing-lines-using-pencil-SBA-300055968.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Pencil-on-paper. Hand-drawn diagrams, sketches, scribbles.",
      "priority": 100
    },
    {
      "id": "reverse-cymbal",
      "name": "Reverse cymbal",
      "category": "reverse",
      "kind": "sfx",
      "tags": [
        "reverse",
        "cymbal",
        "pre-impact"
      ],
      "duration_sec": 1.6,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-cymbal-reverse-crescendo-suspense-climax-01.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Classic pre-impact build. Pair with a beat-aligned cut.",
      "priority": 100
    },
    {
      "id": "reverse-whoosh-long",
      "name": "Reverse whoosh (long)",
      "category": "reverse",
      "kind": "sfx",
      "tags": [
        "reverse",
        "whoosh",
        "pre-impact"
      ],
      "duration_sec": 4.59,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-suckback-reverse-transition-build-up-effect-l/02.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Slow build into the cut. Lay over the outgoing shot.",
      "priority": 100
    },
    {
      "id": "reverse-hit",
      "name": "Reverse hit",
      "category": "reverse",
      "kind": "sfx",
      "tags": [
        "reverse",
        "hit",
        "pre-impact",
        "short"
      ],
      "duration_sec": 1.252,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-transitions-reversed-low-swoop-02/01.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Quick reverse stab. Punchier than the long whoosh — use on fast cuts.",
      "priority": 100
    },
    {
      "id": "tape-vinyl-scratch",
      "name": "Vinyl record scratch",
      "category": "tape-stop",
      "kind": "sfx",
      "tags": [
        "scratch",
        "vinyl",
        "stop",
        "pattern-break"
      ],
      "duration_sec": 1.541,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/communications-phonograph-vinyl-record-scratch-17.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Hard pattern-break. Use for comedic pivots.",
      "priority": 100
    },
    {
      "id": "tape-cassette-stop",
      "name": "Cassette tape stop",
      "category": "tape-stop",
      "kind": "sfx",
      "tags": [
        "tape",
        "stop",
        "cassette",
        "pattern-break"
      ],
      "duration_sec": 1.32,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/communications-audio-visual-vcr-tape-stop-mechanical/01.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Drawn-out tape-deck stop. Slower than vinyl scratch.",
      "priority": 100
    },
    {
      "id": "tape-stutter-scratch",
      "name": "Quick stutter scratch",
      "category": "tape-stop",
      "kind": "sfx",
      "tags": [
        "scratch",
        "stutter",
        "DJ",
        "transition"
      ],
      "duration_sec": 0.5,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/stutter-scratch.mp3",
        "gain_db": 0,
        "offset_sec": 0,
        "_backfill_needed": true,
        "_backfill_suggestion": "Epidemic Sound search: 'DJ scratch' or 'stutter scratch' — short, rhythmic."
      },
      "notes": "DJ-style quick stutter. Bridges beats.",
      "priority": 100
    },
    {
      "id": "countdown-glitchy",
      "name": "Glitchy counter",
      "category": "countdown",
      "kind": "sfx",
      "tags": [
        "countdown",
        "counter",
        "glitchy",
        "digital"
      ],
      "duration_sec": 2,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Glitchy Counter.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Digital counter rolling numbers. Use under animated number reveals.",
      "priority": 100
    },
    {
      "id": "countdown-fast-forward",
      "name": "Fast forward",
      "category": "countdown",
      "kind": "sfx",
      "tags": [
        "countdown",
        "fast-forward",
        "tape",
        "time"
      ],
      "duration_sec": 1.5,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Fast Forward Sound Effect(MP3_160K).mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Tape-FF whine. Use for time-jump or skip-ahead cuts.",
      "priority": 100
    },
    {
      "id": "countdown-digital-counting",
      "name": "Digital counting",
      "category": "countdown",
      "kind": "sfx",
      "tags": [
        "countdown",
        "digital",
        "counter",
        "number"
      ],
      "duration_sec": 2,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Digital Counting Sound Effect.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Clean digital counting. Stats / metrics reveals.",
      "priority": 100
    },
    {
      "id": "stinger-braam",
      "name": "Cinematic braam",
      "category": "stingers",
      "kind": "sfx",
      "tags": [
        "stinger",
        "braam",
        "cinematic",
        "trailer"
      ],
      "duration_sec": 2.5,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/cinematic-braam.mp3",
        "gain_db": 0,
        "offset_sec": 0,
        "_backfill_needed": true,
        "_backfill_suggestion": "Epidemic Sound search: 'cinematic braam' or 'trailer brass hit' — sustained low brass."
      },
      "notes": "Big trailer-style brass hit with sustain. Use sparingly — once per video.",
      "priority": 100
    },
    {
      "id": "stinger-orchestral-hit",
      "name": "Orchestral hit (held)",
      "category": "stingers",
      "kind": "sfx",
      "tags": [
        "stinger",
        "orchestral",
        "hit",
        "swell"
      ],
      "duration_sec": 2,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/orchestral-hit.mp3",
        "gain_db": 0,
        "offset_sec": 0,
        "_backfill_needed": true,
        "_backfill_suggestion": "Epidemic Sound search: 'orchestral stinger' — short percussive hit with sustained tail."
      },
      "notes": "Classic film-stinger swell. Drop under a title card or chapter break.",
      "priority": 100
    },
    {
      "id": "stinger-sub-held",
      "name": "Sub-bass stinger (held)",
      "category": "stingers",
      "kind": "sfx",
      "tags": [
        "stinger",
        "sub",
        "bass",
        "held"
      ],
      "duration_sec": 3,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/sub-bass-stinger.mp3",
        "gain_db": 0,
        "offset_sec": 0,
        "_backfill_needed": true,
        "_backfill_suggestion": "Epidemic Sound search: 'sub bass drone' or 'sub stinger' — held low end, 2-3 sec."
      },
      "notes": "Held low-end under voice-over or a slow reveal. Differs from the quick sub-boom hit.",
      "priority": 100
    },
    {
      "id": "scifi-ui-sounds",
      "name": "Sci-fi UI",
      "category": "scifi-ui",
      "kind": "sfx",
      "tags": [
        "scifi",
        "ui",
        "tech",
        "interface"
      ],
      "duration_sec": 2,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Sci Fi UI Sounds.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Pack of tech-interface bleeps. Trim to the moment you want.",
      "priority": 100
    },
    {
      "id": "scifi-hacking",
      "name": "Hacking",
      "category": "scifi-ui",
      "kind": "sfx",
      "tags": [
        "scifi",
        "hacking",
        "tech",
        "digital"
      ],
      "duration_sec": 3,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Hacking Sound Effect .MP3 (MOST VIEWED VIDEO)(2).mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Generic 'they're typing fast' hacker bed. B-roll over a terminal shot.",
      "priority": 100
    },
    {
      "id": "scifi-data-reveal",
      "name": "Data reveal",
      "category": "scifi-ui",
      "kind": "sfx",
      "tags": [
        "scifi",
        "data",
        "reveal",
        "tech"
      ],
      "duration_sec": 1.5,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/data-reveal-sound-6460.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Dashboard / stats card reveal. Use under animated number or graph reveals.",
      "priority": 100
    },
    {
      "id": "pickup-coin",
      "name": "Coin pickup",
      "category": "pickups",
      "kind": "sfx",
      "tags": [
        "pickup",
        "coin",
        "game",
        "positive"
      ],
      "duration_sec": 0.5,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Coin.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Mario-style coin pickup. Small wins, single-item rewards.",
      "priority": 100
    },
    {
      "id": "pickup-magical-item",
      "name": "Magical item collect",
      "category": "pickups",
      "kind": "sfx",
      "tags": [
        "pickup",
        "magical",
        "collect",
        "sparkle"
      ],
      "duration_sec": 1,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/Collect Magical Item.wav",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Sparkly collect chime. Achievement / 'you unlocked' moments.",
      "priority": 100
    },
    {
      "id": "pickup-game-bonus",
      "name": "Game bonus",
      "category": "pickups",
      "kind": "sfx",
      "tags": [
        "pickup",
        "bonus",
        "game",
        "positive"
      ],
      "duration_sec": 1,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/game-bonus-2-294436.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "notes": "Multi-coin bonus chime. Bigger wins, combo moments.",
      "priority": 100
    },
    {
      "id": "epidemic-communications-audio-visual-vcr-tape-stop-mechanical",
      "name": "Audio Visual · VCR Tape · Stop",
      "category": "tape-stop",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "tape-stop",
        "audio visual",
        "vcr tape",
        "stop",
        "mechanical"
      ],
      "duration_sec": 1.32,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/communications-audio-visual-vcr-tape-stop-mechanical/01.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-audio-visual-vcr-tape-stop-mechanical/01.mp3",
          "duration_sec": 1.32,
          "label": "Take 01 (1.32s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-audio-visual-vcr-tape-stop-mechanical/02.mp3",
          "duration_sec": 0.926,
          "label": "Take 02 (0.93s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-audio-visual-vcr-tape-stop-mechanical/03.mp3",
          "duration_sec": 0.672,
          "label": "Take 03 (0.67s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-audio-visual-vcr-tape-stop-mechanical/04.mp3",
          "duration_sec": 0.707,
          "label": "Take 04 (0.71s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-audio-visual-vcr-tape-stop-mechanical/05.mp3",
          "duration_sec": 1.282,
          "label": "Take 05 (1.28s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-audio-visual-vcr-tape-stop-mechanical/06.mp3",
          "duration_sec": 1.173,
          "label": "Take 06 (1.17s)"
        }
      ],
      "notes": "6 takes inside — open variants to pick one."
    },
    {
      "id": "epidemic-communications-camera-digital-camera-canon-eos-5d-burst-mode",
      "name": "Camera · Digital Camera · Canon EOS 5D",
      "category": "camera",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "camera",
        "digital camera",
        "canon eos 5d",
        "burst mode"
      ],
      "duration_sec": 1.34,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-camera-canon-eos-5d-burst-mode.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-camera-canon-eos-5d-burst-mode.mp3",
          "duration_sec": 1.34,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-communications-camera-digital-slr-take-photos-flash-auto-foc",
      "name": "Camera · Digital SLR · Take Photos",
      "category": "camera",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "camera",
        "digital slr",
        "take photos",
        "flash",
        "auto focus",
        "buttons",
        "shutter clicks"
      ],
      "duration_sec": 1.956,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/28.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/01.mp3",
          "duration_sec": 0.145,
          "label": "Take 01 (0.14s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/02.mp3",
          "duration_sec": 0.249,
          "label": "Take 02 (0.25s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/03.mp3",
          "duration_sec": 0.251,
          "label": "Take 03 (0.25s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/04.mp3",
          "duration_sec": 0.195,
          "label": "Take 04 (0.20s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/05.mp3",
          "duration_sec": 0.251,
          "label": "Take 05 (0.25s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/06.mp3",
          "duration_sec": 0.251,
          "label": "Take 06 (0.25s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/07.mp3",
          "duration_sec": 0.251,
          "label": "Take 07 (0.25s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/08.mp3",
          "duration_sec": 0.31,
          "label": "Take 08 (0.31s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/09.mp3",
          "duration_sec": 0.061,
          "label": "Take 09 (0.06s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/10.mp3",
          "duration_sec": 0.095,
          "label": "Take 10 (0.10s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/11.mp3",
          "duration_sec": 0.8,
          "label": "Take 11 (0.80s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/12.mp3",
          "duration_sec": 0.675,
          "label": "Take 12 (0.68s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/13.mp3",
          "duration_sec": 0.057,
          "label": "Take 13 (0.06s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/14.mp3",
          "duration_sec": 0.304,
          "label": "Take 14 (0.30s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/15.mp3",
          "duration_sec": 0.146,
          "label": "Take 15 (0.15s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/16.mp3",
          "duration_sec": 0.268,
          "label": "Take 16 (0.27s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/17.mp3",
          "duration_sec": 0.11,
          "label": "Take 17 (0.11s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/18.mp3",
          "duration_sec": 0.066,
          "label": "Take 18 (0.07s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/19.mp3",
          "duration_sec": 0.37,
          "label": "Take 19 (0.37s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/20.mp3",
          "duration_sec": 0.136,
          "label": "Take 20 (0.14s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/21.mp3",
          "duration_sec": 0.194,
          "label": "Take 21 (0.19s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/22.mp3",
          "duration_sec": 0.172,
          "label": "Take 22 (0.17s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/23.mp3",
          "duration_sec": 0.213,
          "label": "Take 23 (0.21s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/24.mp3",
          "duration_sec": 0.082,
          "label": "Take 24 (0.08s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/25.mp3",
          "duration_sec": 0.161,
          "label": "Take 25 (0.16s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/26.mp3",
          "duration_sec": 0.216,
          "label": "Take 26 (0.22s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/27.mp3",
          "duration_sec": 0.659,
          "label": "Take 27 (0.66s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-digital-slr-take-photos-flash-auto-foc/28.mp3",
          "duration_sec": 1.956,
          "label": "Take 28 (1.96s)"
        }
      ],
      "notes": "28 takes inside — open variants to pick one."
    },
    {
      "id": "epidemic-communications-camera-olympus-om-d-e-m10-digital-camera-focu",
      "name": "Camera · Olympus OM D E M10 Digital Camera · Focus",
      "category": "camera",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "camera",
        "focus"
      ],
      "duration_sec": 0.117,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-olympus-om-d-e-m10-digital-camera-focu.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-olympus-om-d-e-m10-digital-camera-focu.mp3",
          "duration_sec": 0.117,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-communications-camera-slr-canon-ae-1-35mm-shutter-release-di",
      "name": "Camera · SLR · Canon AE-1",
      "category": "camera",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "camera",
        "slr",
        "canon ae-1",
        "35mm",
        "shutter release",
        "different time"
      ],
      "duration_sec": 0.275,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-slr-canon-ae-1-35mm-shutter-release-di/03.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-slr-canon-ae-1-35mm-shutter-release-di/01.mp3",
          "duration_sec": 0.105,
          "label": "Take 01 (0.10s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-slr-canon-ae-1-35mm-shutter-release-di/02.mp3",
          "duration_sec": 0.156,
          "label": "Take 02 (0.16s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-slr-canon-ae-1-35mm-shutter-release-di/03.mp3",
          "duration_sec": 0.275,
          "label": "Take 03 (0.28s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-slr-canon-ae-1-35mm-shutter-release-di/04.mp3",
          "duration_sec": 0.069,
          "label": "Take 04 (0.07s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-slr-canon-ae-1-35mm-shutter-release-di/05.mp3",
          "duration_sec": 0.102,
          "label": "Take 05 (0.10s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-slr-canon-ae-1-35mm-shutter-release-di/06.mp3",
          "duration_sec": 0.069,
          "label": "Take 06 (0.07s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-slr-canon-ae-1-35mm-shutter-release-di/07.mp3",
          "duration_sec": 0.101,
          "label": "Take 07 (0.10s)"
        }
      ],
      "notes": "7 takes inside — open variants to pick one."
    },
    {
      "id": "epidemic-communications-camera-take-photo-designed-flash-shutter-clic",
      "name": "Camera · Flash · Shutter Click",
      "category": "camera",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "camera",
        "take photo",
        "designed",
        "flash",
        "shutter click"
      ],
      "duration_sec": 0.531,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-take-photo-designed-flash-shutter-clic.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-camera-take-photo-designed-flash-shutter-clic.mp3",
          "duration_sec": 0.531,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-communications-cellphone-smartphone-camera-capture-photo-x9",
      "name": "Cellphone · Smartphone · Camera",
      "category": "camera",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "camera",
        "cellphone",
        "smartphone",
        "capture photo x9"
      ],
      "duration_sec": 0.245,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/communications-cellphone-smartphone-camera-capture-photo-x9/04.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-cellphone-smartphone-camera-capture-photo-x9/01.mp3",
          "duration_sec": 0.084,
          "label": "Take 01 (0.08s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-cellphone-smartphone-camera-capture-photo-x9/02.mp3",
          "duration_sec": 0.054,
          "label": "Take 02 (0.05s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-cellphone-smartphone-camera-capture-photo-x9/03.mp3",
          "duration_sec": 0.172,
          "label": "Take 03 (0.17s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-cellphone-smartphone-camera-capture-photo-x9/04.mp3",
          "duration_sec": 0.245,
          "label": "Take 04 (0.24s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-cellphone-smartphone-camera-capture-photo-x9/05.mp3",
          "duration_sec": 0.08,
          "label": "Take 05 (0.08s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-cellphone-smartphone-camera-capture-photo-x9/06.mp3",
          "duration_sec": 0.127,
          "label": "Take 06 (0.13s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-cellphone-smartphone-camera-capture-photo-x9/07.mp3",
          "duration_sec": 0.229,
          "label": "Take 07 (0.23s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-cellphone-smartphone-camera-capture-photo-x9/08.mp3",
          "duration_sec": 0.085,
          "label": "Take 08 (0.09s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-cellphone-smartphone-camera-capture-photo-x9/09.mp3",
          "duration_sec": 0.069,
          "label": "Take 09 (0.07s)"
        }
      ],
      "notes": "9 takes inside — open variants to pick one."
    },
    {
      "id": "epidemic-communications-phonograph-vinyl-record-scratch-17",
      "name": "Phonograph · Vinyl · Record Scratch 17",
      "category": "tape-stop",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "tape-stop",
        "phonograph",
        "vinyl",
        "record scratch 17"
      ],
      "duration_sec": 1.541,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/communications-phonograph-vinyl-record-scratch-17.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-phonograph-vinyl-record-scratch-17.mp3",
          "duration_sec": 1.541,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-communications-phonograph-vinyl-record-scratch-stop",
      "name": "Phonograph · Vinyl · Record Scratch",
      "category": "tape-stop",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "tape-stop",
        "phonograph",
        "vinyl",
        "record scratch",
        "stop"
      ],
      "duration_sec": 1.156,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/communications-phonograph-vinyl-record-scratch-stop/02.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-phonograph-vinyl-record-scratch-stop/01.mp3",
          "duration_sec": 0.587,
          "label": "Take 01 (0.59s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-phonograph-vinyl-record-scratch-stop/02.mp3",
          "duration_sec": 1.156,
          "label": "Take 02 (1.16s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/communications-phonograph-vinyl-record-scratch-stop/03.mp3",
          "duration_sec": 0.284,
          "label": "Take 03 (0.28s)"
        }
      ],
      "notes": "3 takes inside — open variants to pick one."
    },
    {
      "id": "epidemic-designed-riser-bass-sharp-detail-riser",
      "name": "Riser · Bass · Sharp Detail Riser",
      "category": "risers",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "risers",
        "riser",
        "bass",
        "sharp detail riser"
      ],
      "duration_sec": 0.812,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-bass-sharp-detail-riser.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-bass-sharp-detail-riser.mp3",
          "duration_sec": 0.812,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-designed-riser-build-suspenseful-cinematic",
      "name": "Riser · Build · Suspenseful",
      "category": "risers",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "risers",
        "riser",
        "build",
        "suspenseful",
        "cinematic"
      ],
      "duration_sec": 2.292,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-build-suspenseful-cinematic.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-build-suspenseful-cinematic.mp3",
          "duration_sec": 2.292,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-designed-riser-cymbal-reverse-crescendo-suspense-climax-01",
      "name": "Riser · Cymbal · Reverse",
      "category": "risers",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "risers",
        "riser",
        "cymbal",
        "reverse",
        "crescendo",
        "suspense",
        "climax 01"
      ],
      "duration_sec": 1.6,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-cymbal-reverse-crescendo-suspense-climax-01.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-cymbal-reverse-crescendo-suspense-climax-01.mp3",
          "duration_sec": 1.6,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-designed-riser-cymbal-reversed-pitched-up-suspense-climax",
      "name": "Riser · Cymbal · Reversed",
      "category": "risers",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "risers",
        "riser",
        "cymbal",
        "reversed",
        "pitched up",
        "suspense",
        "climax"
      ],
      "duration_sec": 0.856,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-cymbal-reversed-pitched-up-suspense-climax.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-cymbal-reversed-pitched-up-suspense-climax.mp3",
          "duration_sec": 0.856,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-designed-riser-short-cinematic-gritty",
      "name": "Riser · Short · Cinematic",
      "category": "risers",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "risers",
        "riser",
        "short",
        "cinematic",
        "gritty"
      ],
      "duration_sec": 0.524,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-short-cinematic-gritty.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-short-cinematic-gritty.mp3",
          "duration_sec": 0.524,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-designed-riser-suckback-reverse-transition-build-up-effect-l",
      "name": "Riser · Suckback · Reverse Transition",
      "category": "risers",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "risers",
        "riser",
        "suckback",
        "reverse transition",
        "build up effect",
        "long"
      ],
      "duration_sec": 4.666,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-suckback-reverse-transition-build-up-effect-l/05.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-suckback-reverse-transition-build-up-effect-l/01.mp3",
          "duration_sec": 1.644,
          "label": "Take 01 (1.64s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-suckback-reverse-transition-build-up-effect-l/02.mp3",
          "duration_sec": 4.59,
          "label": "Take 02 (4.59s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-suckback-reverse-transition-build-up-effect-l/03.mp3",
          "duration_sec": 4.047,
          "label": "Take 03 (4.05s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-suckback-reverse-transition-build-up-effect-l/04.mp3",
          "duration_sec": 0.086,
          "label": "Take 04 (0.09s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-suckback-reverse-transition-build-up-effect-l/05.mp3",
          "duration_sec": 4.666,
          "label": "Take 05 (4.67s)"
        }
      ],
      "notes": "5 takes inside — open variants to pick one."
    },
    {
      "id": "epidemic-designed-riser-transition-long-build-up-musical-mysterious-0",
      "name": "Riser · Transition · Long",
      "category": "risers",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "risers",
        "riser",
        "transition",
        "long",
        "build up",
        "musical",
        "mysterious 02"
      ],
      "duration_sec": 3.544,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-transition-long-build-up-musical-mysterious-0.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-transition-long-build-up-musical-mysterious-0.mp3",
          "duration_sec": 3.544,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-designed-riser-whoosh-transition",
      "name": "Riser · Whoosh · Transition",
      "category": "risers",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "risers",
        "riser",
        "whoosh",
        "transition"
      ],
      "duration_sec": 7.136,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-whoosh-transition.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/designed-riser-whoosh-transition.mp3",
          "duration_sec": 7.136,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-magic-spell-wand-reversed-whoosh-build-01",
      "name": "Spell · Wand · Reversed Whoosh",
      "category": "reverse",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "reverse",
        "spell",
        "wand",
        "reversed whoosh",
        "build 01"
      ],
      "duration_sec": 1.222,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/magic-spell-wand-reversed-whoosh-build-01.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/magic-spell-wand-reversed-whoosh-build-01.mp3",
          "duration_sec": 1.222,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-swooshes-swish-rope-thick-whoosh-fast-x3",
      "name": "Swish · Rope · Thick",
      "category": "whooshes",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "whooshes",
        "swish",
        "rope",
        "thick",
        "whoosh",
        "fast x3"
      ],
      "duration_sec": 0.23,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-swish-rope-thick-whoosh-fast-x3/01.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-swish-rope-thick-whoosh-fast-x3/01.mp3",
          "duration_sec": 0.23,
          "label": "Take 01 (0.23s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-swish-rope-thick-whoosh-fast-x3/02.mp3",
          "duration_sec": 0.167,
          "label": "Take 02 (0.17s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-swish-rope-thick-whoosh-fast-x3/03.mp3",
          "duration_sec": 0.168,
          "label": "Take 03 (0.17s)"
        }
      ],
      "notes": "3 takes inside — open variants to pick one."
    },
    {
      "id": "epidemic-swooshes-whoosh-classic-cicada-flyby-cinematic",
      "name": "Whoosh · Classic · Cicada Flyby",
      "category": "whooshes",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "whooshes",
        "whoosh",
        "classic",
        "cicada flyby",
        "cinematic"
      ],
      "duration_sec": 0.989,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-classic-cicada-flyby-cinematic.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-classic-cicada-flyby-cinematic.mp3",
          "duration_sec": 0.989,
          "label": null
        }
      ],
      "notes": null
    },
    {
      "id": "epidemic-swooshes-whoosh-short-deep-dry",
      "name": "Whoosh · Short · Deep",
      "category": "whooshes",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "whooshes",
        "whoosh",
        "short",
        "deep",
        "dry"
      ],
      "duration_sec": 0.445,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-short-deep-dry/01.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-short-deep-dry/01.mp3",
          "duration_sec": 0.445,
          "label": "Take 01 (0.45s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-short-deep-dry/02.mp3",
          "duration_sec": 0.407,
          "label": "Take 02 (0.41s)"
        }
      ],
      "notes": "2 takes inside — open variants to pick one."
    },
    {
      "id": "epidemic-swooshes-whoosh-short-stove-dry-01",
      "name": "Whoosh · Short · Stove",
      "category": "whooshes",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "whooshes",
        "whoosh",
        "short",
        "stove",
        "dry 01"
      ],
      "duration_sec": 0.445,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-short-stove-dry-01/02.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-short-stove-dry-01/01.mp3",
          "duration_sec": 0.255,
          "label": "Take 01 (0.26s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-short-stove-dry-01/02.mp3",
          "duration_sec": 0.445,
          "label": "Take 02 (0.45s)"
        }
      ],
      "notes": "2 takes inside — open variants to pick one."
    },
    {
      "id": "epidemic-swooshes-whoosh-transitions-reversed-low-swoop-02",
      "name": "Whoosh · Transitions · Reversed",
      "category": "reverse",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "reverse",
        "whoosh",
        "transitions",
        "reversed",
        "low swoop 02"
      ],
      "duration_sec": 1.252,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-transitions-reversed-low-swoop-02/01.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-transitions-reversed-low-swoop-02/01.mp3",
          "duration_sec": 1.252,
          "label": "Take 01 (1.25s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-transitions-reversed-low-swoop-02/02.mp3",
          "duration_sec": 1.096,
          "label": "Take 02 (1.10s)"
        }
      ],
      "notes": "2 takes inside — open variants to pick one."
    },
    {
      "id": "epidemic-swooshes-whoosh-wind-gusts",
      "name": "Whoosh · Wind Gusts",
      "category": "whooshes",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "whooshes",
        "whoosh",
        "wind gusts"
      ],
      "duration_sec": 1.553,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-wind-gusts/01.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-wind-gusts/01.mp3",
          "duration_sec": 1.553,
          "label": "Take 01 (1.55s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-wind-gusts/02.mp3",
          "duration_sec": 1.255,
          "label": "Take 02 (1.25s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/swooshes-whoosh-wind-gusts/03.mp3",
          "duration_sec": 1.083,
          "label": "Take 03 (1.08s)"
        }
      ],
      "notes": "3 takes inside — open variants to pick one."
    },
    {
      "id": "epidemic-user-interface-click-software-interface-pop-up-notification-",
      "name": "Click · Software · Interface",
      "category": "ui",
      "kind": "sfx",
      "priority": 10,
      "source": "epidemic",
      "tags": [
        "ui",
        "click",
        "software",
        "interface",
        "pop up",
        "notification",
        "classic"
      ],
      "duration_sec": 0.154,
      "overlay": null,
      "sfx": {
        "file": "shared-library/+100 High quality SFX/_epidemic/user-interface-click-software-interface-pop-up-notification-/04.mp3",
        "gain_db": 0,
        "offset_sec": 0
      },
      "variants": [
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/user-interface-click-software-interface-pop-up-notification-/01.mp3",
          "duration_sec": 0.096,
          "label": "Take 01 (0.10s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/user-interface-click-software-interface-pop-up-notification-/02.mp3",
          "duration_sec": 0.106,
          "label": "Take 02 (0.11s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/user-interface-click-software-interface-pop-up-notification-/03.mp3",
          "duration_sec": 0.086,
          "label": "Take 03 (0.09s)"
        },
        {
          "file": "shared-library/+100 High quality SFX/_epidemic/user-interface-click-software-interface-pop-up-notification-/04.mp3",
          "duration_sec": 0.154,
          "label": "Take 04 (0.15s)"
        }
      ],
      "notes": "4 takes inside — open variants to pick one."
    }
  ]
};
