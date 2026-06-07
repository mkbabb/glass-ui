# fourier-viz-surfaces — fourier is the canonical 3.3.0 dock-regression VICTIM; its canvases do NOT converge with W17, but two of them want the W17 substrate; the rest is a thin idiom/coordination carry

Lane verdict: fourier-analysis's viz UI is a deep, mature glass-ui consumer (dock,
configurator, tabs, sliders, hover-popover, view-transitions, useClipboard,
scroll-driven). Its three docks are textbook victims of the 3.3.0 simple-collapse
regression, so its ONLY safe consume path is the AW.W1 3.4.0 publish — NOT `^3.3.0`.
Its epicycle/convergence/frequency canvases are a DIFFERENT primitive than W17's
proximity-graph lattice (no convergence on the *component*), but two of them
hand-roll exactly the dpr-resize + RAF-park machinery that W17's `useCanvas2D`
substrate ships — a real substrate-only convergence. Aurora/blob/Constellation as
backdrops: zero usage, zero demand — honest negative. Two fourier-local glass-ui
carries (the `cartoon-card` shim, the `--viz-amber` AA-contrast darken) are still
live and ride W22-26 glass-atoms.

## Findings

### 1. fourier pins `^3.1.0`, has **3.1.0 installed**, and is partially stale — and CANNOT bump to `^3.3.0` because of the dock regression

- `web/package.json:14` = `"@mkbabb/glass-ui": "^3.1.0"`; installed dist at
  `web/node_modules/@mkbabb/glass-ui/package.json` = **3.1.0** (verified today).
- The installed 3.1.0 dist is *partially* behind the two SATISFIED-UPSTREAM asks the
  hub ledger claims (ADOPTION-ASKS.md:117,125): the `useId` VT-name fix IS present
  in `dist/dock.js` (grep `glass-dock-${useId` hit) but the ConfiguratorLayer `inert`
  fix is NOT in `dist/configurator.js` (grep `inert` empty) — `inert` shipped 3.1.1,
  fourier is one patch behind it.
- The ledger's prescription "one-line `^3.1.0`→`^3.2.0` caret bump" (ADOPTION-ASKS.md:125,117)
  is **now superseded by the 3.3.0 dock regression**: 3.3.0 froze GlassDock's
  start-collapsed first-expand width-morph (AW.md headline; AW.W1 goal criterion
  "frozen-at-collapsed-width … ≈19px that shipped in 3.3.0"). A `^3.2.0` caret
  would resolve to 3.3.0 on `npm install`, so the bump must be **pinned/floored at
  the AW.W1 3.4.0 publish**, not an open `^3.2.0`/`^3.3.0` caret.

### 2. ALL THREE fourier docks use the EXACT broken pattern: `:start-collapsed="true"` + `#collapsed` two-layer collapse

- `CanvasControlsDock.vue:81` — `<GlassDock ref="dockRef" fit-content :start-collapsed="true">` with a `<template #collapsed>` (CanvasControlsDock.vue:106-109).
- `EditorControlsDock.vue:56` — `<GlassDock :collapse-delay="2000" :start-collapsed="true" fit-content>` with `<template #collapsed>` (EditorControlsDock.vue:58).
- `AnimationControls.vue:58-62` — `<GlassDock class="animation-dock" :collapse-delay="2000" :start-collapsed="true">` with a rich `<template #collapsed>` (mini play-btn `.play-btn--mini` + `.mini-progress` fill + speed `MetricBadge`, AnimationControls.vue:64-78).
- AW.W1's goal criterion names this exact shape ("a bare `<GlassDock>` that STARTS
  collapsed with a default slot + a `#collapsed` slot … not the DockLayerGroup
  multi-pane switch"). fourier is the in-the-wild reproduction of the regression.
- fourier's own e2e already exercises the broken path: `web/e2e/visualization-ux.spec.ts:60-84`
  drives "AnimationControls' GlassDock sets `:start-collapsed="true"`" → hover →
  settles on the `expanded` class via "the FLIP-crossfade." A naive `^3.3.0` bump
  would red these specs (state toggles, width stuck) — the regression is *observable
  in fourier's existing CI*, not just theoretical.

### 3. fourier's canvas surfaces are NOT W17 Constellation (no convergence on the component), but TWO want the W17 `useCanvas2D` substrate

- W17 ships a **proximity-graph drifting-node lattice** (`constellationField.ts`:
  seedField/stepField/edges/nodes/pointer-web/ripples). fourier draws **epicycle
  chains + partial-sum curves** (`BasisCanvas.vue` `drawEpicycleFrame`/`drawMultiBasesFrame`,
  `lib/canvas-drawing/epicycles.ts`). Different domain, different geometry — the
  `Constellation` *component* does not fit fourier; honest negative on component reuse.
- BUT the W17 substrate (`useCanvas2D`: dpr-clamped resize + RAF-park +
  offscreen/tab-hidden/reduced-motion freeze + dispose, AW.W17 scope §1) is exactly
  what fourier hand-rolls TWICE:
  - `composables/useCanvasSetup.ts` — dpr-aware canvas init + `ResizeObserver`
    lifecycle, `ctx.setTransform(dpr,0,0,dpr,0,0)`, `dpr = window.devicePixelRatio || 1`.
    It has NO dpr clamp (`useCanvas2D` clamps `Math.min(dpr,2)`), NO offscreen park,
    NO reduced-motion freeze.
  - `stores/animation.ts` — a shared pinia RAF clock with a reference-counted
    `setCanvasVisible` offscreen gate (the I.γ work) — but its gate is *offscreen-only*
    (driven by `BasisCanvas.vue:onMounted` IntersectionObserver). It has NO
    `document.hidden`/`visibilitychange` park and NO `prefers-reduced-motion` freeze
    (the store has zero `matchMedia`/`document.hidden` references). `useWebGLCanvas`
    (and therefore `useCanvas2D`) ALSO parks on tab-background + freezes one static
    frame under live PRM — fourier's animated epicycle loop honors *neither*.
  - `ConvergencePlot.vue` is a SECOND fully hand-rolled RAF canvas
    (`ConvergencePlot.vue:55-75` `startLoop`/`stopLoop` + its own dpr-resize
    `draw()` at :78-95 + `ResizeObserver` at :325). It has only a CSS
    `@media (prefers-reduced-motion: reduce)` (ConvergencePlot.vue:405) which CANNOT
    reach the JS RAF loop, and NO offscreen/tab-hidden park at all. This loop runs
    full-tilt while scrolled off-screen or in a background tab.
- `FrequencyGraph.vue` is a STATIC canvas (draw-on-mount/watch, `:159` `onMounted(() => draw())`,
  no RAF) — it would benefit only from the substrate's dpr-clamped resize, not the park.

### 4. fourier maintains a LEGITIMATE local `cartoon-card` shim — a still-live cross-repo coordination carry that rides W22-26 glass-atoms

- glass-ui RETIRED the `.cartoon-card` recipe at C.W5 (`src/styles/cards.css:2`
  "`.cartoon-card` + `.elevated-card` recipe classes were removed"); `cartoon-surface`
  survives as a decoration-only `@utility` (cards.css:33).
- fourier re-binds it locally and CORRECTLY (on the cascade, not a dead orphan):
  `web/src/style.css:107` `@utility cartoon-card { @apply cartoon-surface; border-color: var(--border); background: var(--card); }`. The shim comment (style.css:98-106)
  records "Cross-repo re-publish recorded as a coordination ask; this shim is the
  fourier-local KISS stop-gap." 14 application sites across 13 files (verified ~20
  `cartoon-card` class= usages in the viz tree). This is the per-consumer drift
  W22-26 (the unified `.glass-material` / glass-card perfection) should reconcile —
  either by re-shipping a canonical card recipe or by an explicit "consumers own
  their card surface" verdict.

### 5. fourier carries a `--viz-amber` AA-contrast darken — a token-rebaseline coordination ask glass-ui has NOT taken

- `web/src/style.css:120-122` overrides `:root { --viz-amber: hsl(35 76% 35%); --section-color-5: hsl(35 76% 35%); }` because glass-ui ships light `--viz-amber`
  ≈ 3.54:1 against `--background` (fails WCAG AA). Verified at HEAD: glass-ui
  `tokens.css:432` `--section-color-5: oklch(0.623 0.124 69.6)` (the amber, aliased
  to `--viz-amber` at tokens.css:452) — still the un-darkened value. The override is
  on the cascade (correct house pattern) and dark-mode is left untouched (style.css:123-126).
  This is a legitimate "rebaseline the upstream light token" ask the lighthouse/a11y
  wave (W32) or the token-assay (W20) could fold.

### 6. fourier's ConfiguratorLayer usage hits a repeated `header-actions` slot gap (workaround in 2 panels)

- `BasisSelector.vue:121` and `ContourSettings.vue:191` carry the identical comment:
  "Panel-wide reset: ConfiguratorLayer has no header-actions slot, so the affordance
  lives at the top of the layer body" — then float a ghost reset `<Button>` inside
  the body (BasisSelector.vue:124-137). A header-actions slot on `ConfiguratorLayer`
  would let the reset live in the section header where it belongs. Two in-repo sites
  → a real ≥2-consumer affordance ask (W13 affordance lifts territory).

### 7. fourier ALREADY adopts the shipped glass-ui scroll-driven + view-transition surfaces — these are anti-findings for W16/useViewTransition (see Anti-findings)

## Wave-forming input

- **AW.W1 (dock collapse) is fourier's gating dependency.** fourier is the named
  in-the-wild reproduction of the 3.3.0 regression (3 docks, all `:start-collapsed +
  #collapsed`). Sequencing edge: fourier's glass-ui consume bump is **GATED on the
  AW.W1 3.4.0 publish** and must be a pin/floor at 3.4.0, NOT an `^3.2.0`/`^3.3.0`
  caret (a caret resolves to the broken 3.3.0). Add fourier's
  `web/e2e/visualization-ux.spec.ts` dock-expand path to the W1 cross-repo
  regression-evidence list (it exercises the exact frozen-width path).

- **AW.W17 `useCanvas2D` — fourier is the 3rd+ consumer of the SUBSTRATE (not the
  component).** Scope a *post-3.4.0* fourier adoption wave (consumer-side, fourier's
  own tranche) that swaps `composables/useCanvasSetup.ts` + the
  `ConvergencePlot.vue` hand-rolled RAF onto `createCanvas2D` — inheriting the
  dpr-clamp + `document.hidden` + live-PRM freeze fourier currently lacks. File
  bounds (fourier-side, NOT this campaign's write): `useCanvasSetup.ts`,
  `stores/animation.ts` (the RAF clock's park seam), `BasisCanvas.vue` (drop the
  local IntersectionObserver), `ConvergencePlot.vue`, `FrequencyGraph.vue`
  (dpr-resize only). Gate sketch: a fourier e2e/unit asserting the epicycle clock
  parks under `document.hidden` and freezes one frame under PRM. NOTE for the W17
  spec writer: this does NOT count toward W17's in-repo ≥2-consumer bar (the demo
  story + slides H.W10 already clear it) — fourier is downstream corroboration that
  the substrate is load-bearing beyond slides.

- **AW.W16 DeckProgress / `.glass-progress-rail` — NO fourier fit; do NOT name
  fourier as a consumer.** fourier's reading-progress rail (`PaperView.vue:313-314`
  `.paper-progress-track` + `.paper-progress-bar scroll-progress`) ALREADY uses
  glass-ui's shipped `.scroll-progress` native-timeline recipe (PaperView.vue:499
  `--scroll-progress-scroller: nearest`) — the *scroll-driven* mechanic, which is the
  RIGHT tool for a reading rail and is a DIFFERENT mechanic than W16's `:value`-driven
  `<Progress>` rail (deck-position). The AnimationControls `.mini-progress`/`.mini-fill`
  (AnimationControls.vue:78) is a trivial `width:%` div, not a `<Progress>` candidate.
  W16's two-consumer ledger (demo + slides H.W1) is correct WITHOUT fourier.

- **AW.W22-26 glass-atoms — fold fourier's two carries as evidence.** The
  `cartoon-card` shim (Finding 4) and the `--viz-amber` AA-darken (Finding 5) are
  live per-consumer drift. The glass-atoms unification wave should record an explicit
  verdict: either re-canonicalize a card recipe (reversing the C.W5 retirement under
  the ≥2-consumer rule — fourier alone has 14 sites + speedtest is a likely 2nd) OR
  affirm "consumers own their card surface" so the shim is the sanctioned pattern.
  The `--viz-amber` light value is a one-line token rebaseline for W20/W32.

- **AW.W13 affordance — `ConfiguratorLayer` header-actions slot** (Finding 6): two
  in-repo workaround sites. Scope sketch: add an optional `#header-actions` /
  `#actions` slot to `ConfiguratorLayer.vue` rendered in the section header row;
  fourier's two reset buttons move into it. Gate: the slot renders, the collapsed
  state still inerts the body (don't reintroduce the aria-hidden-focus class).

## Anti-findings (verified FINE / already done)

- **`useViewTransition` (W17-adjacent) — fourier already does this correctly and
  does NOT need the glass-ui composable.** `router/index.ts:2` imports the SHIPPED
  `supportsViewTransitions` from the glass-ui root barrel (verified at
  `src/index.ts:159`), gates on it + `prefers-reduced-motion`, and hand-brackets
  `document.startViewTransition` in `beforeResolve`/`afterEach` for the `/w/`↔`/v/`
  viz-morph (router/index.ts:130-145, 175-185). glass-ui's `view-transition.css`
  owns the `::view-transition-*` LOOK (per the router comment). This is a *route-level*
  VT bracket — `useViewTransition` (AQ.W5, the `startViewTransition` substrate for
  *list/element* swaps) is not the right seam here. No adoption ask.

- **`useClipboard` — valid import, on the shipped surface.** 4 sites
  (`EquationResult.vue:4`, `useMorphConfig.ts:9`, `gallery/UserSlugBar.vue:5`) import
  `useClipboard` from `@mkbabb/glass-ui`; verified it ships on the root barrel via
  `composables/dom` (glass-ui `src/composables/dom/index.ts:20` + present in fourier's
  installed `dist/composables/dom/useClipboard.d.ts`). Not broken.

- **`supportsViewTransitions` — valid root-barrel import** (glass-ui `src/index.ts:159`).

- **Aurora / GooBlob / PaperBackdrop / DockBackgroundToggle / Constellation /
  WebGL substrate — ZERO usage, ZERO demand. Honest negative.** Grep of the whole
  `web/src` tree returns nothing. Aurora-as-a-paper-backdrop is a pure taste
  proposal with no consumer pull: the paper reader is a typeset-math surface
  (KaTeX, served by `@mkbabb/latex-paper`, not glass-ui) where a moving WebGL
  backdrop would actively harm legibility + battery. Do NOT invent this adoption.

- **fourier's offscreen-RAF gating is real and present** (`BasisCanvas.vue:onMounted`
  IntersectionObserver `rootMargin`-less + `anim.setCanvasVisible` reference-count,
  stores/animation.ts:`setCanvasVisible`). The gap is only the tab-hidden +
  reduced-motion legs (Finding 3) — the offscreen leg is already done, which is why
  the W17 substrate swap is a *deduplication + completion*, not a from-scratch add.

- **The Configurator stage|aside chassis is correctly adopted** (`VisualizationView.vue:194`
  `<Configurator scroll-mode="auto">` with `#stage`/`#aside` cells). This is the
  right glass-ui primitive for the viz layout — no W29 (aurora-configurator restyle)
  bearing here; W29 restyles the *aurora preset chrome*, which fourier does not use.

- **The DOCK-ANIMATION-CONVERGENCE.md claims verified at both HEADs.** fourier's dock
  asks (`glass-ui-dock-vt-name` useId, `glass-ui-a11y` inert, `asideSide`) are
  SHIPPED-upstream per §7; the useId fix IS in fourier's installed 3.1.0 dist; the
  `inert` fix is in 3.1.1 (one patch ahead of fourier's install). The doc's "fourier's
  only act is the `^3.2.0` ADOPT-NOW bump" is the ONE still-live item — and it is now
  superseded by the 3.3.0 dock regression (the bump must floor at 3.4.0, Finding 1).
  No NEW dock write is owed to glass-ui from fourier's side.

## Summary

fourier-analysis is a deep, healthy glass-ui consumer pinned at `^3.1.0` (3.1.0
installed). Its headline AW relevance is DEFENSIVE: all three viz docks
(CanvasControlsDock, EditorControlsDock, AnimationControls) use the exact
`:start-collapsed + #collapsed` shape that the 3.3.0 regression freezes, so fourier
MUST consume on the AW.W1 3.4.0 path — a `^3.2.0`/`^3.3.0` caret would red its own
dock e2e. Its epicycle/convergence canvases are NOT W17's lattice (no component
convergence) but `useCanvasSetup.ts` + `ConvergencePlot.vue` + the pinia RAF clock
hand-roll exactly W17's `useCanvas2D` substrate and lack its tab-hidden + reduced-
motion freeze — a real post-3.4.0 substrate-swap wave (fourier-side). Two fourier-
local glass-ui carries (the legitimate `cartoon-card` shim, the `--viz-amber`
AA-darken) ride W22-26/W20. A repeated `ConfiguratorLayer` header-actions workaround
is a W13 affordance ask. Aurora/blob/Constellation/backdrop: zero usage, zero
demand — honest negative; do not invent. W16 DeckProgress: no fit (paper already
uses the better-suited `.scroll-progress`). View-transitions + useClipboard: already
correctly adopted from the shipped surface.

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/fourier-viz-surfaces.md
