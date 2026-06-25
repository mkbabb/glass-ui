# Pass-E component deep-audit — substrates/glass-material

**Page:** `/substrates/glass-material` · **Demo:** `demo/stories/substrates/glass-material.vue`

## What this page actually demos (the real src)

This is not a single SFC — it is the **glass MATERIAL grammar** itself: the CSS mixin + two composables + the token ladder. The audited src:

- `src/styles/glass/material.css` — the `.glass-material::before` moving-specular catch-light (layer 4) + the rim wiring (layer 3) + `--glass-specular-core` accent-tint + the W-CLEAR scrim.
- `src/styles/glass/ladder.css` — the five rungs `glass-{wash,quiet,resting,floating,overlay}` (layer 1 backdrop blur+saturate · layer 2 surface tint via `color-mix(in oklab,…)` · layer 5 under-shadow + drop-shadow · layer 6 grain `::after`).
- `src/styles/glass/rim.css` — the `--glass-material-rim` inset ring + `--glass-border-accent` (layer 3, per-instance chromatic accent).
- `src/styles/glass/{squircle,surfaces}.css` — the `@supports(corner-shape:superellipse(2))` squircle + `.glass-lens` refract + `.glass-chromatic` fringe.
- `src/composables/glass/useSpecularTracking.ts` (146L) — the DRY rAF-coalesced pointer→`--mouse-x/y` write seam (`createSpecularWriter` core, two deliveries: composable + `vSpecular` directive).
- `src/composables/glass/useGlassBackdropLuminance.ts` (542L) — the iOS-27 sampled-backdrop observer (luma + ambient-hue histogram → `--glass-backdrop-luma`/`--glass-backdrop`/`--glass-ambient-hue`).

## Audit findings

### (1) ANIMATION affordance — STRONG, one dead leg
- **Catch-light:** `::before` rest intensity `0` (dormant, zero idle tracks), hover/active lift `0.1/0.16`, position interpolated on `--ease-standard` per §6 ("position-tracked"). The transition is OPT-IN (`:hover`/`:active`/`.glass-specular-track` only) so a bare idle rung attaches **0** keyframes tracks — exemplary. **PASS.**
- **PRM:** the writer skips the position write under reduce; CSS pins `--specular-x/y` to centred `50%`. **PASS.**
- **DEAD leg — the press lens-swell is RETIRED** (`material.css:302-314`, DDR-LENS-BAKE). The `:active` `--glass-refract` swell never PARSED as `backdrop-filter` (3-token `url() <n> url()`), so the press-depth animation reaches no filter — `scale` is now BAKED at 28. Honest, but the **press read on `.glass-lens` is now flat** (only the shared gleam-lift carries it). The chromatic-aberration RGB-split successor (`--glass-lens-chroma`) is BD's perf-gated re-build.
- **MISSING — entrance.** The plates have NO mount entrance (no `vReveal`/`.scroll-cascade`/spring-mount); they pop in at full opacity. Per motion-canon P2 (enter-bouncy) + the page's own "HIGH animation affordance for EVERY component" bar, the demo's glass cards should bloom-in (`useLiquidReveal`/`.scroll-cascade`). Demo-side, but the COMPONENT grammar offers no entrance hook the demo composes.

### (2) PROCEDURAL VIZ — n/a to the material; the Aurora backdrop is the viz
The page stages glass over `<Aurora>` (StoryHero full-bleed). The material itself is CSS, not GPU. The Aurora it floats over is the audited surface for `substrates/aurora`. The ambient-hue histogram (`useGlassBackdropLuminance`) reads the aurora `<canvas>` — the one cross-viz coupling, correctly via `drawImage+getImageData` over the SAME pixel pass (no second canvas). **PASS** for what is here.

### (3) PERFORMANCE — STRONG
- Specular write: rAF-coalesced (1 `getBoundingClientRect` + 1 style write per frame regardless of pointer Hz), cancels on dispose. **PASS.**
- Observer: ≤4 Hz throttle (bounded ≥250ms), IntersectionObserver-gated (`rootMargin:200px`), parks on `document.hidden`/PRM (single mount sample). Composes `useRAFLoop`/`useIntersectionPause`/`useResizeObserver` — no hand-rolled loop. **PASS.**
- No layout animation in the grain/specular/rim (all compositor: opacity/transform/box-shadow/mask). **PASS.**
- WATCH: `backdrop-filter` is the costliest idiom — five live rungs + the deep tier on ONE page is the heaviest material route. Acceptable (the demo is the material showcase), but the BD deep-20px push must re-measure HERE.

### (4) SAFARI — MOSTLY OK, two graceful degrades
- `backdrop-filter`: the build OWNS the `-webkit-` prefix pass (`vite.style-assets.ts`), source unprefixed to dodge Lightning dedup. **PASS** (Safari ≤17 paints).
- `mix-blend-mode: plus-lighter`: Safari 16.4+; non-supporting degrades to plain low-α warm overlay (no blowout). **PASS.**
- `mask-image` (specular edge-glint): Baseline 2023-12; non-supporting falls to `inset:0`+falloff bound. **PASS.**
- `corner-shape: superellipse(2)`: Chrome 139+ ONLY (no FF/Safari 2026) — honest `@supports` enhancement over `border-radius` round. The demo section LABELS this "Chrome 139+, progressively enhanced." **PASS** (Safari sees round, as designed).
- `.glass-lens` refract (`@supports(backdrop-filter:url())`): Chromium-only; Safari paints the blur base alone. Honest. **PASS.**

### (5) IDIOMATIC / no-legacy — CLEAN, one drift to canonize
- `createSpecularWriter` is the single position-write core; `useSpecularTracking` + `vSpecular` are two deliveries — NO re-pasted handler. The `--mouse-x/y` host-write → `--specular-x/y` mapped-channel VOCAB is documented + enforced. **EXEMPLARY.**
- The six-layer composite is ALL present (1 blur+saturate ladder · 2 oklab surface-tint · 3 rim+border-accent · 4 `::before` catch-light · 5 under-shadow+drop · 6 grain `::after`). **PASS — DESIGN.md six-layer composite fully realized.**
- `--glass-edge-light` whole-layer-not-color discipline is documented + gated (BE.W5). No dual-path.
- Minor: the retired press-swell leaves a comment block (`:302-314`) that is now pure history; fine as a fence note.

### (6) THE USER ASKS — the DEMO surface is the gap, not the component
The component grammar is excellent; the DEMO under-uses it against the user's bar:
- **"each sub-section in its OWN glassy card"** — UNMET. `StorySection` renders a bare `<section>` (no glass plate); `ShowcaseFrame tier="field"` is deliberately PLATE-LESS. The 9 sections read as flat bands, not glassy cards. The page should wrap each section in a `glass-quiet`/`<Card tier>` plate (with the `tier="field"` specimen INSIDE it so the demo glass still floats over the aurora — a card-in-a-card is the iOS register).
- **"main card area BIGGER"** — UNMET. Plates are fixed `h-28 w-44`; no hero/dominant specimen.
- **"leverage the dock APIs (contextual switching/animating)"** — UNMET. Nine static `StorySection`s; no dock-driven tab/layer switching between the material facets (a `<DockLayerGroup>` switching specular/tint/accent/lens/deep would be the idiomatic contextual-switch).
- **"deftly uses a series of glass-ui components (docks/anims/cards/tabs/buttons)"** — PARTIAL. Only `Button` + raw `glass-*` plates; no SegmentedTabs/dock/card/procedural composition.
- **"glass demos over COLORFUL aurora"** — MET (StoryHero full-bleed aurora). 
- **"standardize the import-path label"** — the page has NO top import-path comment in the canonical form (other pages carry `// import /substrates/x`); the head comment is prose. Add the standardized label.
- **"tighten superfluous language"** — the blurbs + script header are VERBOSE (the 8-line script preamble, the per-section paragraph blurbs). Tighten to one-line affordance statements.

## FOLD/MODIFY/AUGMENT/PRUNE → BD tranche map

| Finding | Action | BD wave |
|---|---|---|
| Deep tier blur 16→18-20px re-measure HERE (heaviest material route) | MODIFY | **BD.W-DEEP-GLASS-20PX** (cite this page as the perf-gate measure site) |
| Press lens-swell flat; build RGB-split chroma rim (perf-gated) | AUGMENT | **BD.W-GLASS-LENS-CHROMA** (re-decide → build) |
| Each section in its own glassy card + BIGGER hero specimen | MODIFY (demo) | **BD.W-DATA-BAND-GLASS** pattern → extend to substrates demo-chassis (`viz/ADDENDUM-DEMO-CHASSIS.md`) |
| Dock contextual-switch between material facets; tabs/card composition | AUGMENT (demo) | new demo-chassis wave under `viz/page-deep` (no src change — composes shipped dock/tabs) |
| Standardize `// import /substrates/glass-material` label; tighten blurbs | MODIFY (demo) | **BD.W-PAGE-HEADER-FOLD** / **BD.W-PAGE-OFFTOKEN-SWEEP** |
| Mount-entrance hook (`useLiquidReveal`/`.scroll-cascade`) on the specimens | AUGMENT (demo) | **BD.W-SCROLL-MOTION** consumer (already shipped; demo composes) |
| Six-layer composite, DRY specular, observer budget, Safari degrades | KEEP — no action | — (exemplary; do not touch the src grammar) |
