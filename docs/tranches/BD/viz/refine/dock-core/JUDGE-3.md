# JUDGE-3 — dock-core liquid morph + generalize (BD.W-DOCK-CORE), ITERATION 3

**Verdict: PASS.** Both JUDGE-2 blockers (A3 grow-from-centre, A12 draggable ITEMS) are
decisively fixed and live-verified on real Chrome via chrome-devtools-mcp at
http://localhost:5173, light + dark. The eight carried-forward PASSes are re-confirmed
un-regressed. Safari-relevant patterns checked. No still-subtle / still-gray / half result.

---

## LIVE EVIDENCE (getComputedStyle + frame-series + screenshots, this session)

### A3 — grow-from-centre (JUDGE-2 BLOCKER): DECISIVELY FIXED
The real auto-margin-centred collapsible dock on `/dock/overview` (dock[1], parent
`display:contents`, `margin: 0 358px auto`). Frame-series across a live collapse→expand
morph (60 frames @16ms):
- **cxExcursion: 0px** — the centre held 765.5 EVERY frame.
- **leftTravel == rightTravel == 86.5px** — the walls travel equal + opposite about the
  pinned centre (the binding signature of a true grow-from-centre).
- collapsed endpoint: w59, cx765.5, left736 / right795 (symmetric). expanded: w224,
  cx765.5, left653.5 / right877.5 (symmetric, equal+opposite delta ±82.5).
- scale path drives through a weighty overshoot then settles (the `scaleX(--dock-root-scale)`
  from `transform-origin: center` mechanism — container-justify-AGNOSTIC by construction).
This is no longer the +81px rightward lurch JUDGE-2 measured. The double-compensation is gone.

### A12 — draggable ITEMS (JUDGE-2 BLOCKER): DECISIVELY FIXED
The media-transport dock on `/dock/overview` (`.dock-items-draggable .glass-drag-grabbable`,
cursor:grab, touch-action:none, 3 `data-dock-draggable` icons Previous/Play/Next). A
synthesized real pointer grab-drag-release on item 0:
- item FOLLOWS pointer: `transform: matrix(1,0,0,1,8.75..43.75,0)` (compositor translateX).
- gel-squish live: `--stretch: 1.014` (capped, volume-preserving), `.glass-drag-lift` present.
- **REORDER COMMITS**: `[Previous,Play,Next]` → `[Play,Next,Previous]`.
A genuine grab-pull-squish-fling-reorder on the dock ICON items.

### Re-confirmed PASSes (no regression)
- **A1 — no broken rail.** `/dock/*` shell docks: 0 `.dock-hairline-slot`, 0
  `.dock-facet-chip`, 0 `.dock-stack` (the `mode="facets"` rail on `/dock/rail` is the
  intended feature register, 1 instance, not a broken artefact).
- **A4 — blur dial-back.** `--glass-blur-dock: blur(9px) saturate(1.4) brightness(1.02)`
  (light) / `blur(9px) saturate(1.30) brightness(1.12)` (dark) — calm material, not extreme.
- **A5 — shrunken icon align.** Expanded: every svg centre == its button centre exactly
  (687/687, 733/733, 798/798), all share icy 552.9. Collapsed dock is centred (w59, cx765.5,
  symmetric walls) — the single summary glyph sits at centre.
- **A7 — dropdown recolor bug GONE.** Real dropdown opened; dock plate bg before == after =
  `color(srgb 0.944 0.903 0.865 / 0.52)`. `recolorBug: false`, menu mounted.
- **A8 — trigger unify.** select · 2× dropdown all `.dock-trigger`, byte-identical
  `padding 4px 8px · border-radius 9999px · gap 4px`.
- **A10 — one dock + tabs, no real names.** `/dock/dock-gallery` TabBar is ONE
  `tb-glass-dock`; items are "A" / "B" / "C" (generic). The bottom dock carries the tabs
  facility.
- **A11 — vertical pill.** `/dock/rail`: clean warm-cream w67 capsules, `border-radius
  9999px`, `padding-inline 12px / padding-block 8-12px`. Not ugly, breathing padding.
- **A13 — the split (THE BIG ONE).** `/dock/dock-gallery` TabBar "Compose" toggle fires
  `dockRef.toggleSplit()`: `--island-t` climbs SMOOTHLY 0.037→0.092→0.166→0.25→0.34→0.44→
  0.53→0.62→0.71→0.78→0.85→0.91 (weighty inertial ease-in), `--dock-split-t` tracks in
  lockstep, `data-fissioned` reaches true, **1 fission island + 2 goo necks** render. The
  V↔H morph showcase (`/dock/morph-showcase`) presents the generalize-to-V/H register on the
  `--dock-morph-t` scalar (VT-crossfade default + liquid-teardrop preview).
- **M1 — weighty spring.** `--spring-dock-duration: 0.6s`; `--spring-dock` `linear()`
  overshoots to **1.104 at 14%** then settles — the ios27 audacious inertial arrival, NOT a
  tight snap.
- **S1 — no-gray, BOTH modes (DECISIVE).**
  - DARK (over dark page): dock plate `color(srgb 0.350 0.295 0.249 / 0.56)` → OKLab
    **L 0.42 · C 0.0266 · H 62.2°** — clears the strong warm-chroma floor (C≥0.020), warm-amber,
    R>G>B. White glyphs + text readable over it. NOT gray, NOT flat charcoal.
  - LIGHT (over white): OKLab **L 0.964 · C 0.0090 · H 65.2°** — warm-amber (gamut-bound
    near-white plate clears the materially-warm plate floor).
- **Safari.** No `backdrop-filter: url()` anywhere on the dock routes (the Safari-breaking
  pattern is ABSENT). The fission goo is the regular `filter: url(#dock-fission-goo)` SVG
  graph (cross-engine). The morph is `scale:`/`transform-origin`/`transform: translate` +
  `--stretch` (all cross-engine compositor channels).

## Screenshots (this session)
- `judge3-overview-light.png` — warm-cream luminous dock pills over the field, light
- `judge3-overview-dark.png` — warm-luminous dock plates over the field, dark, text readable
- `judge3-gallery-split.png` — the morph cards + the one-dock tab bar + fission island
- `judge3-rail-dark.png` — clean vertical warm-cream capsule pills
- `judge3-morph-showcase.png` — the V↔H morph showcase modal

## North-star conformance
- Glass is warm-cream LUMINOUS material in BOTH modes (BA.W-NO-GRAY floor cleared: dark
  C0.0266/H62°, light C0.009/H65°), readable text.
- Motion carries inertia/weight/overshoot (spring peak 1.104, 0.6s; the island-t inertial
  climb; the grow-from-centre overshoot) — slower/bigger/dramatic, not tight/springy.
- Compositor-only (scale/translate/transform-origin/--stretch), PRM-carved (per report:
  DOCK_SPRING.respectReducedMotion + prefersReducedMotion gates), Safari-safe (no
  backdrop-filter:url).

## VERDICT
PASS. The directive is decisively met. A3 grow-from-centre holds cx constant with symmetric
wall travel on the real auto-margin dock; A12 is a full grab-pull-squish-fling-reorder on the
dock icons; the split fires with weighty inertial goo; the glass is warm-luminous in both
modes; the spring is weighty/audacious; Safari-safe. No remaining blocker.
