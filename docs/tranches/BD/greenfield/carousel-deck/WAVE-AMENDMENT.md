# CAROUSEL · DECK · PAGER-DOTS — the WAVE-AMENDMENT (reconciled vs the 116-wave union set)

> The concrete tranche amendment for the carousel-deck greenfield. Reference implementation:
> [`GOLDEN.md`](./GOLDEN.md), hardened by [`DELTA-ASSAY.md`](./DELTA-ASSAY.md) + `challenge/{1,2,3}.md`.
> RIDES the goo-morph barbell amendment ([`../goo-morph/WAVE-AMENDMENT.md`](../goo-morph/WAVE-AMENDMENT.md),
> `BD.W-GOO-BARBELL-NECK`) — does NOT re-author the barbell. KISS · DEFT · DRY · NO LEGACY · no dual-path.

---

## SUMMARY OF MUTATIONS (cite-by-filename, no duplicative work vs the barbell amendment + the 116 waves)

| disposition | wave (file) | action |
|---|---|---|
| **DEPEND (foundation)** | `BD.W-GOO-BARBELL-NECK` (authored by `../goo-morph/WAVE-AMENDMENT.md`) | the silhouette re-invent + concave throat + engine 3-ref projection + dwell-follows-neck + the 3-consumer barbell migration + the filter retune all live HERE. This item RIDES it — re-authors NONE of it. |
| **NEW (the owned de-dup)** | `BD.W-GOO-BRIDGE-SHELL.md` | author — `<GooBridge>` + `useGooTransition`: the Layer-2 SHELL de-dup across carousel/deck/pager. The barbell migration lands in ONE file, not three. Net-negative LOC. |
| **NEW (transition feel)** | `BD.W-CAROUSEL-DECK-GLASS.md` | author — the C3 glassy/distortion/inertia: the DIRECTIONAL squash-refraction on a per-slide wrapper + the deck §3 warm field (`deck.vue`, presets-in-consumers) + the light `plus-lighter` arm + the cartoon-cast (REUSES `--shadow-cartoon`) + the driver-vs-observer carve + the SMOOTHNESS gate + the mount-gate perf. |
| **INHERIT verbatim** | `union/waves/W-GOO-CAROUSEL-DECK-FIX2.md` | the dark warm-ink arm + the travel-gate. KEEP; the light `plus-lighter` arm is added SYMMETRIC by `BD.W-CAROUSEL-DECK-GLASS`. (Also a DEPEND of `BD.W-GOO-BARBELL-NECK`.) |
| **DEPEND (sibling)** | `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` | `--goo-weight = --motion-weight`; the anticipation uses `--ease-cartoon-punch`. Source-verified ABSENT from `src/styles/` (grep-empty) — honest sibling deps. `--shadow-cartoon` SHIPS (REUSED, not a dep — challenge-1 R3). |
| **SUPERSEDE** | `union/waves/W-GOO-CAROUSEL-DECK.md` · `union/waves/W-GOO-MORPH-REFINE.md` · `union/waves/W-PAGER-GOO-MORPH.md` | the N-plate bed + per-consumer hand-rolled shells + single-worm topology → superseded by the barbell (bed delete, by `BD.W-GOO-BARBELL-NECK`) + `<GooBridge>` (shell de-dup, by `BD.W-GOO-BRIDGE-SHELL`). Clean break, no alias. Record in their Disposition. **NOTE:** these three are ALREADY marked SUPERSEDE by the goo-morph amendment for the barbell topology — this item ADDS the shell-de-dup reason to the same SUPERSEDE (no double-prune; one record). |
| **FLAG (promoted INTO the bar)** | `BD.W-GOO-COMPOSITOR-DRIVE` (lens-b) | was flagged OUT; the live 6-fps / 3-distinct-frame slideshow (DELTA §3, challenge-3 R1) PROMOTES a SMOOTHNESS arm into `proof:carousel-deck-glass`. The `calc()` compositor-drive is the named honest resolution (or prove ≥N distinct frames post-route-chassis). NOT a separate wave to author here — its gate clause lives in `BD.W-CAROUSEL-DECK-GLASS`. |
| **FLAG (Chrome-rich enhancement)** | static-`feDisplacementMap` lens | `@supports`-gated, paired-π-checked, OUT of the bar (the squash-refraction floor is the proof). NO `backdrop-filter:url`. |
| **FLAG (demo-chassis, Band C)** | the carousel route 6-fps debt | `useIntersectionPause`/offscreen-park the aurora + canvas + backdrop-filters — the REAL reason the morph reads chuggy. Owned by the demo-chassis band, NOT this wave. |
| **NO-OP confirm** | the T13 carousel cadence | the carousel content-snap DRAG stays calm-overdamped (`drive` stays smooth, velocity-coupled neck swell but overshoot-FREE settle); the punch lives on the Next/deck/pager DRIVERS. HONORED by `BD.W-CAROUSEL-DECK-GLASS`. |
| **UNTOUCHED** | embla `useCarousel`, `useDeck`, `pagerWindow`, `DeckPager` (47-line wrapper) | the Layer-3 SURFACE engines are correct + distinct; byte-untouched on the interaction grammar. |

No NEW wave beyond the TWO above — the union reconciles the de-dup to one shell wave + one feel wave,
both RIDING the barbell.

---

## NEW WAVE — `BD.W-GOO-BRIDGE-SHELL`

**Band: viz/refine · depends: `BD.W-GOO-BARBELL-NECK` (the engine 3-ref projection + barbell DOM,
inherited verbatim) · `W-GOO-CAROUSEL-DECK-FIX2` (the dark-arm + travel-gate). Reference:
`docs/tranches/BD/greenfield/carousel-deck/GOLDEN.md` §1.**

> **STATUS: tranche-DEV PLAN doc, IMPLEMENTATION-gated.** Factor the goo shell wiring — hand-rolled
> THREE times today — into ONE presentational SFC + ONE thin headless composition. The three
> consumers shrink to *measure slot centres → hand the bridge an index/fraction*. SUPERSEDES the
> per-consumer hand-rolled shells (no legacy, no alias — clean break). Net-negative LOC.

### The defect / the ask (live-verified born-RED this pass, NOT a doc claim)

The goo *shell wiring* is hand-rolled three times and DRIFTS:
- `CarouselContent.vue` — `placePlates`/`plateEls`/`setPlate`/`plateIndices`/`markTraveling` + the
  `v-for` plate bed + ~135 LOC of goo CSS + imports `GlassGooFilter` (live: 12 plates + 1 worm).
- `deck.vue` — its own `.deck-goo-plate`/`.deck-goo-worm` + its OWN `data-traveling` timer + its own
  dark arm + CSS (a DIFFERENT opacity-gate selector — `.deck-demo-stage[data-traveling] .deck-goo-layer`).
- `PagerDots.vue` — inlines its OWN `<svg id="pager-goo">` filter (`:233`) + `.pager-goo-layer` + N
  `.goo-dot` + ONE `.goo-worm` (the carousel IMPORTS `GlassGooFilter`; the pager inlines it — drift).

Three copies, one engine. **The de-dup that is actually missing is the SHELL** (the golden's Layer-2,
challenge-unanimous: it is real, net-negative LOC, the one thing this item independently owns).

### The mechanism (GOLDEN §1, challenge hardenings folded)

1. **`src/composables/motion/useGooTransition.ts` (NEW, headless).** A thin composition over
   `useGooMorph` (barbell 3-ref) — NOT a second engine. ONE driver contract: `travel(from,to)` (Next/
   page/dot-commit), `drive(fractionalIndex)` (the live carousel drag only), `snap(index)`. Reads the
   per-consumer `--{prefix}-flow`/`-duration`/`-weight` tokens. Owns the neck-gated dwell signal (the
   barbell's §6 neck-girth opacity), the squash-refraction coupling, the @supports/PRM carve.
2. **`src/components/custom/goo-bridge/GooBridge.vue` (NEW, presentational).** `aria-hidden` +
   `pointer-events:none` ALWAYS. Owns: the `GlassGooFilter` mount (ONE filter definition — the
   inline-`<svg>` de-dup), the `bodyA`/`neck`/`bodyB` barbell DOM, the neck-gated `data-traveling`
   opacity, the `.dark` warm-ink arm (FIX2 verbatim) + the `.light` `plus-lighter` lift, the
   `@supports not (filter:url())` cross-fade floor + PRM `display:none`. Props:
   `centerOf`/`restSize`/`index`/`fraction`/`vertical`/`token-prefix`/`goo-weight`/`blur`/`threshold-slope`.
3. **The three consumers shrink.** `CarouselContent.vue` DELETES `placePlates`/`plateEls`/`setPlate`/
   `plateIndices`/`markTraveling`/the `v-for` bed/the goo CSS → keeps embla wiring + `centerOf`/
   `slideStep` + ONE `<GooBridge token-prefix="carousel-goo" :goo-weight="1.0">`. `deck.vue` DELETES
   its goo `<div>`+CSS+timer → ONE `<GooBridge token-prefix="deck-goo" :goo-weight="0.4">`.
   `PagerDots.vue` DELETES the inline `<svg>` + `.pager-goo-layer` → ONE `<GooBridge
   token-prefix="pager-worm" :goo-weight="0.7">`; KEEPS the interaction buttons + `pagerWindow` +
   focus-survival-across-window (byte-untouched interaction grammar).
4. **Mount-gate (challenge-2 R5 fix).** The bridge filter layer is `content-visibility:hidden`
   (pre-warmed) OR `opacity:0 + contain:strict` at rest — NOT `display:none` (which forces a
   filter-compile on the first travel frame of the 6-fps route). The `<defs>` mount ALWAYS (the
   filter graph compiles once); only the consuming layer's visibility is gated. Mount on travel-start,
   unmount ≤80ms after settle (the neck-gated seam).

### The gate — `proof:goo-bridge-shell` (NEW, born-RED → GREEN; a REAL source-structure readback)

`scripts/proof-goo-bridge-shell.mjs`, `tags: ["local","ci"]`. The detector comment-strips first.

- **B1 — ONE `<GooBridge>` + ONE `useGooTransition`; ALL THREE consumers mount it.** The detector
  asserts `GooBridge.vue` + `useGooTransition.ts` exist, and `CarouselContent.vue` + `deck.vue` +
  `PagerDots.vue` each import + mount `<GooBridge>`. **RED on HEAD** (no `GooBridge.vue` /
  `useGooTransition.ts` exist; the three consumers hand-roll their own goo).
- **B2 — NO per-consumer hand-rolled goo shell.** The detector asserts `placePlates`/`plateIndices`/
  `setPlate` are GONE from `CarouselContent.vue`; the inline `<svg id="pager-goo">` is GONE from
  `PagerDots.vue`; the `.deck-goo-plate`/`.deck-goo-worm` hand-roll is GONE from `deck.vue`. **RED on
  HEAD** (`placePlates` at `CarouselContent.vue:119`; `<svg id="pager-goo">` at `PagerDots.vue:233`;
  `.deck-goo-plate` at `deck.vue:137`). RED-bite: a re-introduced `placePlates`/inline `<svg>`.
- **B3 — ONE `GlassGooFilter` definition.** The detector asserts the goo `<filter>` is mounted ONCE
  (via `GooBridge`), no inline `<svg>` filter graph in any consumer. RED-bite: a second inline filter.
- **B4 — the bridge is `aria-hidden` + `pointer-events:none`; the interaction grammar is untouched.**
  The detector asserts `GooBridge` carries both attrs, and the carousel `tablist`/embla focus, the
  deck `role="group"`/`aria-live`, the pager `tablist`/24px hit-targets are present + unchanged.
- **B5 — the mount-gate is NOT `display:none`.** The detector asserts the bridge rest state is
  `content-visibility:hidden`/`opacity:0 + contain:strict` (challenge-2 R5), and the `<defs>` mount
  is unconditional. RED-bite: a `display:none` rest gate.

**Born-RED on HEAD:** B1 (no bridge), B2 (three hand-rolled shells live), B3 (carousel imports +
pager inlines two filter defs). GREEN only after the shell lands across all three consumers.

### The binding π — folded into `tests-visual/carousel-deck-glass.spec.ts` (shared with the feel wave)

The shell wave's π arm asserts: ONE `<GooBridge>` renders on each of the three real routes; the
carousel/deck/pager all paint the barbell through it (no per-consumer goo layer); the consumer LOC
diff-stat is net-negative (challenge-1 secondary — measured, not asserted).

---

## NEW WAVE — `BD.W-CAROUSEL-DECK-GLASS`

**Band: viz/refine · depends: `BD.W-GOO-BRIDGE-SHELL` (the bridge it decorates) · `BD.W-GOO-BARBELL-NECK`
(the neck-girth signal it couples to) · `BD.W-MOTION-WEIGHT` (`--goo-weight`) · `BD.W-CARTOON-PUNCH`
(`--ease-cartoon-punch`). Reference: `docs/tranches/BD/greenfield/carousel-deck/GOLDEN.md` §2–§3.**

> **STATUS: tranche-DEV PLAN doc, IMPLEMENTATION-gated.** The C3 transition feel: the DIRECTIONAL
> transform-only squash-refraction (Safari-native, on a per-slide wrapper), the deck §3 warm field,
> the light `plus-lighter` arm, the moving cartoon-cast, the driver-vs-observer inertia carve, and the
> SMOOTHNESS gate. Decorates `<GooBridge>` — no new engine.

### The defect / the ask (live-verified born-RED this pass)

Live `:5173` (Chrome): the carousel Next-click peaks at a shallow CONVEX slab (`scaleX 1.181 /
scaleY 0.92`, `hasLocalMinimum=false`), the worm OCCLUDES at `z-index:2` with NO content deform, the
layer opacity holds flat 0.55 across the whole travel (dead-slab dwell), the motion renders in **6
distinct frames / 7 total** (a slideshow — the route runs ~6 fps), and the deck slide panel resolves
`oklab(0.793 0.005 0.012 / 0.84)` `bgImage:none` (C≈0.0128 flat taupe — NO colorful field behind the
glass; the §3 "colorful field + defined edge" bar fails on the deck the carousel passes).

### The mechanism (GOLDEN §2–§3, challenge hardenings folded)

1. **The DIRECTIONAL squash-refraction on a per-slide WRAPPER (challenge-1 R1, challenge-3 R2).** A
   `.slide-squash` child of each `CarouselItem` (NEVER the embla-driven slide/container transform —
   embla owns that). It composes `transform: scaleX(var(--goo-squash-x)) scaleY(var(--goo-squash-y))`
   keyed off `--goo-neck`. SIGNED differential: outgoing `scaleX<1` compressing toward the seam
   (transform-origin = seam) + translate INTO it; incoming `scaleX>1` stretching OUT + translate out
   (`sign(outgoing) == −sign(incoming)`). The deck is free (full-viewport `inset:0` slides — squash
   maps directly). Pure `transform`, no filter, PRM-carved. Reuses the shipped `useLiquidFlex` (no
   new primitive). `scaleX·scaleY ≈ 1` (volume-preserving, §L4 squash-&-stretch).
2. **The deck §3 warm field (`deck.vue`, presets-in-consumers — DEMO change, NOT library).** The deck
   slide bg adopts the carousel's warm-cream→saffron radial field (the `auroraFallbackGround` static
   mesh / droplet `radial-gradient` recipe generalized) so the goo has warm chroma to bleed; the NECK
   region carries a LOWER fill alpha so the field reads through the thinnest part (the "field through
   the neck + edge" honest read).
3. **The light `plus-lighter` lift (symmetric to FIX2's dark arm).** `@supports`-gated so the
   warm-cream membrane GLOWS rather than greys in light mode. Both modes: C ≥ 0.015, H ∈ [45,85]
   (the tightened no-gray floor, challenge-2 R6).
4. **The moving cartoon-cast (REUSES `--shadow-cartoon`, challenge-1 R3 DRY win).** The bridge
   `::after` casts the SHIPPED `--shadow-cartoon` (+ `-sm/md/lg`) OPPOSITE the morph direction, scaled
   by `--goo-weight` — PUNCHES as the slide commits, snaps back on settle. PRM → static cast;
   survives `prefers-reduced-transparency` (the ink is a legibility anchor).
5. **The inertia register (driver-vs-observer carve, T13).** The anticipation pre-dip
   (`--ease-cartoon-punch`, entering body buds out of the leaver), `--goo-weight` per consumer
   (carousel-Next 1.0 / deck 0.4 / pager 0.7), √φ overshoot land. The carousel DRAG (`drive`) stays
   calm-overdamped — BUT carries WEIGHT (velocity-coupled neck swell via `usePointerVelocityField` →
   `useLiquidFlex.maxStretch`, "morph more on move") with an overshoot-FREE settle (challenge-3 R5:
   weight ≠ bounce). The velocity-couple is a neck-swell embellishment, not an overshoot — it does NOT
   contradict the calm carve. The Next/page/dot-commit DRIVERS carry the full cartoon punch.
6. **The dwell follows the NECK** (the barbell's §6 signal, re-pointed here) — visible EXACTLY while
   the goo deforms, gone ≤80ms after settle. Kills the flat-0.55/0.62 dead-slab dwell.

### The gate — `proof:carousel-deck-glass` (NEW, born-RED → GREEN; a REAL rendered readback)

`scripts/proof-carousel-deck-glass.mjs` + `tests-visual/carousel-deck-glass.spec.ts`,
`tags: ["local","ci","@webkit"]`. INHERITS the barbell `proof:goo-barbell` rendered-alpha gate. Every
born-RED is a REAL `getImageData`/transform readback — NEVER `neckGirth·const` arithmetic (the
cardinal fence the spike violated — challenge-1/2/3 unanimous TOP refutation).

- **G1 — DIRECTIONAL squash (challenge-3 R2 — the "wrong-reason" trap fix).** The slide PAIR's
  transform deforms through the waist on a real Next-click mid-momentum (embla translate
  simultaneously live, challenge-1 R1): `sign(outgoing seam-ward translate/scale) ==
  −sign(incoming)`, coupled to `--goo-neck`, on the `.slide-squash` WRAPPER (not the embla transform).
  NOT just `|sx·sy−1|<0.05` (a synchronized squash passes that for the wrong reason). Reads
  IDENTICALLY Chromium AND WebKit (`|webkit−chromium| ≤ 0.05`, the transform-only floor). **RED on
  HEAD** (the worm occludes at `z-index:2`; no content deform; no `.slide-squash`).
- **G2 — SMOOTHNESS (challenge-3 R1 + the live 6-fps readback — PROMOTED into the bar).** A
  paired-engine rAF frame-series proving the painted neck girth advances in ≥ N monotone-distinct
  steps with NO single value held > ~50ms across the travel (`distinctFrameCount` + `maxDwellPerValue`).
  **RED on HEAD** (6 distinct frames / 7 total — a 3-keyframe slideshow). GREEN via the `calc()`
  compositor-drive OR proven ≥N distinct frames after the route-chassis perf debt is paid.
- **G3 — §3 deck field + no-gray.** The deck slide PANEL pixel C ≥ 0.015, H ∈ [45,85] both modes (a
  warm field behind the goo — RENDERED pixel, not a token); the goo warm-cream both shells both modes;
  the light `plus-lighter` lift renders. **RED on HEAD** (the live `oklab(0.793 0.005 0.012)`
  C≈0.0128 near-gray taupe, `bgImage:none`).
- **G4 — dwell follows the neck.** The bridge opacity fades in as neckGirth crosses ~0 and out as it
  returns; GONE ≤80ms after settle. **RED on HEAD** (flat 0.55/0.62 across the whole window).
- **G5 — inertia carve.** The Next `--goo-weight = 1.0` (full cartoon punch); the drag stays
  calm-overdamped BUT velocity-couples a fatter neck on a fast fling with an overshoot-FREE settle
  (weight ≠ bounce, challenge-3 R5); the deck 0.4 (vestibular floor). **RED on HEAD** (no
  `--goo-weight`, no anticipation pre-dip).
- **G6 — §L7 + perf + the cardinal proof fence.** Static `#glass-goo` (sRGB, no `var(` in the graph,
  no `backdrop-filter:url` anywhere); `@supports`/PRM floors present; the bridge mount-gate is
  `content-visibility`/`contain:strict`, NOT `display:none` (challenge-2 R5); the π is a REAL
  rasterized `getImageData` readback (NEVER `neckGirth·const`); PAIRED Chromium + real
  Safari-26-on-Metal, `|webkit.waist − chromium.waist| ≤ 0.05` (challenge-2 R1).

**Self-test bites:** (a) both slides given identical `sx/sy` (synchronized, non-differential) → G1;
(b) the squash on the embla transform not the wrapper → G1; (c) a `neckGirth·const` synthetic profile
→ G6; (d) the squash read on `slides[active]` not the from/to pair → G1; (e) a `display:none` mount
gate → G6; (f) the deck reverted to the flat taupe → G3; (g) a single-engine green → G6.

### The binding π — `tests-visual/carousel-deck-glass.spec.ts`

A PAIRED-engine rAF frame-series on a REAL Next-click `/navigation/carousel` AND a REAL page-advance
`/motion/deck` AND a REAL dot-travel `<PagerDots>`, BOTH modes, Chromium AND real Safari-26-on-Metal
(`@webkit`), LIVE MOTION (NEVER `reducedMotion` for the morph arm). RASTERIZE the `<GooBridge>` output
→ `getImageData` → walk the post-threshold cross-axis alpha (the waist, shared with `proof:goo-barbell`),
the slide-PAIR signed differential squash under the throat (G1), the neck-gated opacity (G4), the
`distinctFrameCount` (G2), the warm-cream + deck-field panel chroma (G3). Born-RED CAPTURED LIVE this
pass: convex slab `scaleX 1.181`/`hasLocalMinimum=false`, flat 0.55 dwell, 6 distinct frames,
occlusion-only worm, deck `oklab(0.793 0.005 0.012)` taupe, three hand-rolled shells.

DELTA: `docs/tranches/BD/audit/visual/W-CAROUSEL-DECK-GLASS-DELTA.md` — the before (convex slab,
synchronized non-squash, flat dwell, taupe deck, slideshow) / after (signed differential squash
through a concave waist, neck-gated dwell, warm saffron deck field, ≥N distinct frames, cartoon-cast
punch), PAIRED Chromium+Safari-Metal, both modes.

### The gestalt row — `carousel-deck-glass`

A real Next-click reads: the entering card BUDS out of the leaver (anticipation dip), TWO warm-cream
bodies STRETCH into a thin CONCAVE waist that the content visibly SQUASHES THROUGH (the outgoing
compresses toward the seam, the incoming stretches out — a TRUE differential, transform-only,
Chrome=Safari), the neck DWELLS ~250–400ms then PINCHES + the card OVERSHOOTS home with a cartoon-cast
PUNCH — fling faster → the neck wells FATTER. The deck transmits a warm saffron field (no more gray).
The pager dots goo-WORM as a true two-bead barbell. Warm-cream both modes, both engines; the carousel
DRAG calm-overdamped but weighty (T13) while the Next/deck/pager carry the punch; the motion renders
SMOOTH (≥N distinct frames, no slideshow). ONE `useGooMorph`, ONE `<GooBridge>`, three thin mounts —
net-negative LOC, no fork, no legacy. Born-FAIL on HEAD; GREEN at close; W-REFLECT re-confirms on
fresh pixels. Wired into the union roster by `BD.W-GESTALT-WIRE`.

---

## FENCES (the non-negotiables)

- **The de-dup is at Layer 2 (the `<GooBridge>` shell), NOT Layer 3** — carousel (embla) + deck
  (`useDeck`) stay DISTINCT components that COMPOSE one bridge. Never merge them.
- **The barbell ENGINE is `BD.W-GOO-BARBELL-NECK`'s — RIDE it, never re-fork.** `useGooTransition` /
  `<GooBridge>` is a COMPOSITION, not a second engine.
- **The distortion is TRANSFORM-ONLY (squash-refraction), DIRECTIONAL, on a per-slide WRAPPER** —
  Safari-native; NEVER the embla transform; NEVER `backdrop-filter:url` (the `feDisplacementMap` lens
  is a flagged Chrome-rich enhancement OUT of the bar).
- **The driver-vs-observer carve is LOAD-BEARING** — the carousel DRAG is calm-overdamped but
  velocity-weighted (weight ≠ bounce); the Next/deck/pager carry the punch.
- **The SMOOTHNESS arm is IN the bar** — the live 6-fps slideshow promotes it (challenge-3 R1).
- **The born-RED is a REAL rendered `getImageData` readback, NEVER `neckGirth·const` arithmetic** (the
  cardinal fence the spike violated — challenge-1/2/3 unanimous).
- **PAIRED Chromium + real Safari-26-on-Metal** — the cross-engine headline is PAINT-proven, not
  reasoned (challenge-2 R1).
- **NO LEGACY** — the N-plate bed, the demo-hand-rolled deck goo, the inline pager `<svg>`, the
  single-worm topology, the timer-driven dwell, the deck near-gray slide are DELETED in the same
  amendment, not aliased.
