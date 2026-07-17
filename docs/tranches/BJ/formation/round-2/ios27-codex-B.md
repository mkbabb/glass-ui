# Round 2 — ios27-codex-B (fable)

Marks: /Users/mkbabb/Programming/glass-ui/docs/tranches/BJ/formation/ios27/MARKS-B.md

## Summary

Read all 60 frames + 6 stills. The corpus resolves into 11 concrete idioms feeding families F and G. Radius grammar is a strict role-scale (card > circle|pill|capsule, concentric nesting, constant superellipse smoothness) that directly cures the ledger's radius-canon-collapse. The gradient-backdrop-blur target is proven three ways: a directional graded scrim behind Spotlight (V3/f-0004), a radial glow pool around a floated control against black (F49/F50), and detent-graded sheet opacity (V1/f-0009 vs f-0011) — never a uniform slab. Two material capabilities glass-ui lacks appear clearly: adaptive content-color tint (Find My sheet inherits the map's green and blooms warm where an orange avatar sits behind it, V4/f-0011) and a specular edge caustic that concentrates on the lower rim, carries iridescence, animates a full hue cycle on Siri, and lights up during motion (V2/f-0007-0021, V1/f-0005). The blob greenfield reference is a 3D chrome metaball with a mobile pearlescent specular sweep morphing pill-orb-pill (V2/f-0004/0017/0019), material per the METAL FLOW stills. The dock greenfield analog is Find My's glass tab bar with a liquid-sliding selection pill + cluster/edge-fade overflow (no mid-glyph clipping, no interior scroll) — cures F47/F27/F04/F05 in one gesture. Motion always makes the material react (staggered entry, squash morphs, rim glow) — the liquid-weight edict made literal.

## Highlights (10)

### radius-role-scale

**Observed:** Control Center (V1/f-0002-0003, V2/f-0023) is the Rosetta Stone: rounded-rect cards (~R28-40, continuous corner) CONTAIN circles (toggles/quick-actions), pills (Focus/Sleep), and tall capsules (brightness/volume). Standalone toggles = circles; mode selectors + fields + inline actions = stadium pills; sliders = tall capsules with bottom-anchored fill + bottom glyph; icons/thumbnails = rounded-squares. Nesting is always concentric (inner R = outer R - padding) and a card never sits inside a pill.

**Implication:** Codify ONE opinionated role-keyed radius table (sheet/card | field | mode | control | slider | icon) with constant superellipse smoothness and radius scaling by size, then gate it. This cures the ledger's radius-canon-collapse (F12/F15/F17/F45/F48) with a table + lint, not spot fixes — and beats iOS by being provably consistent where iOS is only consistent by convention.

### gradient-backdrop-blur

**Observed:** Blur+luminance is never a uniform slab. Spotlight (V3/f-0004) shows a DIRECTIONAL graded scrim behind the 'Search or Ask' pill: darkest/most-blurred near the pill, easing toward the bottom. F49/F50 (IMG_2287/2288) show a RADIAL glow pool around a floated segmented control against pure black, peaking at the element and falling to black. Maps/Find My sheets grade opacity by detent (transparent partial V1/f-0009, opaque full V1/f-0011).

**Implication:** The gradient-backdrop-blur experiment (adopt the landed --glass-halo-* cohort) should render blur+brightness that concentrates near the floated surface and falls off radially/directionally, plus an overall SUBTLER element blur than glass-ui ships today (the F28/F48 heavy-uniform-blur defect). Judge effectiveness against the Spotlight + F49 references.

### adaptive-content-color-tint

**Observed:** The Find My bottom sheet (V4/f-0005-0013) is glass that INHERITS the map's green/teal tint — not neutral grey. In f-0011 the People tab sits under an orange-haired avatar showing through the map, and the frosted sheet BLOOMS a warm pink/orange patch exactly at that position. CC quick-action circles (V1/f-0002) carry wallpaper-tinted chromatic rims for the same reason.

**Implication:** glass-ui's material should sample a positional/dominant tint from its backdrop rather than fixing a neutral grey frost — a living frost that takes hue AND luminance from what's behind it, non-uniformly. This is the single property that most makes a surface read as glass vs a grey card; iOS does it, glass-ui does not yet.

### specular-edge-caustic

**Observed:** The glass boundary is a specular caustic, not a 1px border. The Siri result panel (V2/f-0006-0011, f-0021) carries a thin bright iridescent band on its LOWER rim + corners whose hue CYCLES across frames (cool blue-green-pink to warm orange-red) — the light travels along the boundary. The Spotlight pill (V3/f-0004) and CC sliders mid-animation (V1/f-0005) show the rim LIGHTING UP during motion/entry.

**Implication:** Replace flat rim borders with a lower-weighted specular highlight (lit from below/within) + optional subtle iridescent sweep that animates on entry/interaction. This is the tasteful, material-property version of the aurora/rim work (V-A95, F04/F05) — a caustic, not a bolted-on outline ring.

### liquid-glass-blob

**Observed:** Siri invocation (V2/f-0004, f-0017, f-0018) inflates the Dynamic Island into a 3D chrome/liquid-metal ORB: dark glossy body, a mobile pearlescent specular streak sweeping the equator, top rim highlight, iridescent caustic. It morphs pill-orb-pill on a spring squash and collapses to a listening dot-ring (f-0019). The Siri app icon (V3/f-0005) is the same chrome orb. Material matches the METAL FLOW / images-2 liquid-metal stills.

**Implication:** The blob greenfield (A12) should render as a real 3D metaball (the value.js implementation) shaded with a specular highlight + subtle iridescence like liquid metal, morphing from a pill on a spring — not a flat CSS blur blob.

### dock-glass-tray-sliding-pill

**Observed:** Find My's tab bar (V4/f-0005-0013) is a stadium glass tray with a brighter glass selection pill that LIQUID-SLIDES between the four tabs frame to frame. The home dock (all videos) is the same tray holding rounded-square icons. Overflow is never clipped mid-glyph — device markers cluster into a '+3' overflow pill (V4/f-0009); nothing scrolls inside the bar.

**Implication:** Dock greenfield: glass stadium tray + a liquid-sliding selection pill (the goo-morph/liquid-weight edict made literal) + edge-fade/cluster overflow + NO interior scroll. Adopting the Find-My tab-bar model cures F47 (mid-glyph clip), F27 (interior scroll), and F04/F05 (nested-ring shape) in one gesture.

### bottom-sheet-detents-grabber

**Observed:** Maps and Find My sheets carry a grabber pill, snap to small/medium/large detents (V1/f-0008/0009/0010/0011), scale content, and grade material opacity with height — glass at partial detents (map bleeds through), near-opaque when full. Overlays either slide from an edge (banners: frosted rounded-rect capsule, leading rounded-square icon, blur+shadow, V2/f-0005/0020, V3/f-0002) or morph out of the Dynamic Island (Siri).

**Implication:** glass-ui sheets/popovers should adopt grabber + snap detents + material-grading (more transparent partial, more opaque full), and pick entry per role: slide-from-edge for banners, morph-from-origin for contextual panels.

### segmented-capsule-progress

**Observed:** F49/F50 (IMG_2287/2288) show a discrete-level control: a dark stadium track where the filled portion is a SOLID white pill that GROWS (High to Extra High extends it and swallows a dot) and the remaining steps render as dots. It reads instantly and carries weight as the pill absorbs a dot.

**Implication:** A better model for glass-ui's broken feedback-motion components (F21 scroll-progress-rim partial arcs, F22 loop jitter) than the current approach: fill-pill-plus-remaining-dots is legible, weighty, and unambiguous.

### staggered-reactive-motion

**Observed:** Motion is never a plain opacity fade. Control Center entry (V1/f-0005) fills density top-down (top modules dense while the bottom grid is still low-opacity) and the slider rims glow chromatically WHILE translating. The Siri blob squash-morphs; the Find My tab pill liquid-slides. The material always reacts to movement.

**Implication:** Hold every glass-ui transition to the liquid-weight edict: staggered entry, squash on morph, rim glow during motion — no bare fades. This is precisely the discipline the feedback components (F20 toast, F21 rim, F22 loop) were never held to.

### typography-hierarchy-and-light-glass

**Observed:** Consistent scale across every surface: hero heading/numeral (bold ~28-34) >> row title (~17 semibold) >> secondary (~15 grey) >> caption/tab (~11-13), with ONE accent color for interactive/status (blue Directions V4/f-0010, green 'Now'/toggle) and section headers as bold+chevron ('Places >', 'Recents >'). No mono ALL-CAPS jargon captions exist anywhere in iOS. Screenshot 2026-06-23 gives the light-mode frosted combobox: rounded-rect popover, hairline rim, soft shadow, checkmark selection (not fill).

**Implication:** Adopt this type ladder for the F15 audit and the story copy canon: bold heading, single accent, grey secondary, glyph-primary dense controls — the exact inverse of the meta-caption ALL-CAPS idiom the ledger kills (family D). Style light-glass surfaces (frosted popover + hairline rim + checkmark selection) as a first-class peer to dark, per the coexisting light/dark widgets in V4/f-0003.

