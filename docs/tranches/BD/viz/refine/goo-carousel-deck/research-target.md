# RESEARCH-TARGET — goo / carousel / deck refine + de-dup (BD.W-GOO-CAROUSEL-DECK)

The CORRECT design target the fix must hit. North star: `design.md` (the six-layer
optical composite, the 7 glass tiers, warm-cream identity) + the iOS-26/27 Liquid
Glass language + `BA.W-NO-GRAY` warm-chroma floor + the
`[[feedback-liquid-weight-universal]]` law (inertia/weight/bounce/squish on ALL
motion). NO legacy, idiomatic, gestalt, compositor-only, PRM-carved, **Safari-first**.

---

## 0. The three verbatim asks, restated as targets

1. **The goo is AWFUL — broken on Safari, too SLOW, does not goo-morph.** "How does
   the Google Gemini carousel work? It should MORPH BLOB and MEATBALL from one to
   another." → the goo-merge must actually fuse silhouette↔silhouette (a metaball
   neck wells up + pinches off), FAST, and work on Safari.
2. **Carousel (embla) and deck (useDeck) should share ONE substrate — "a carousel
   should likely use a DECK? Are they the same thing? De-duplicate."** → reconcile to
   ONE engine where they ARE the same; keep the fork only where the seam is real.
3. **`/navigation/carousel` transitions should be more GLASSY, have more DISTORTION
   and INERTIA.** → the slide change is a liquid-glass transition with lensing
   distortion + spring inertia + squish, not a flat embla scroll.

NB: the pager-dots **WORM goo-morph** (`BD.W-PAGER-GOO-MORPH`) is DONE + Safari-safe
(the static SVG filter). This wave is the **carousel/deck transition goo + the
de-dup** — it REUSES that pattern, it does not re-invent it.

---

## 1. DIAGNOSIS — what is actually broken (live-relevant)

### 1a. The "AWFUL goo" is the WebGL2 metaball renderer, NOT the pager worm

There are TWO goo mechanisms in the repo, and they are NOT the same:

| Mechanism | Where | Engine | Safari | Speed |
|---|---|---|---|---|
| **`useWormMorph` SVG goo** | `pager-dots/useWormMorph.ts` + `PagerDots.vue` | CSS `transform` + a **STATIC** `<filter id="pager-goo">` (`feGaussianBlur stdDeviation="8"` fixed, `feColorMatrix` fixed, then `feBlend`) | ✅ WORKS (static filter) | ✅ fast (compositor transform, blur computed once) |
| **`useMetaballRenderer` WebGL/WGSL goo** | `goo-blob/composables/useMetaballRenderer.ts` + `metaball.frag.ts` / `metaball.wgsl.ts` | per-frame fragment shader over a WebGL2 / WebGPU substrate | ⚠️ the AWFUL one — software-raster fallback / WebKit-degraded, a full per-frame shader pass | ❌ SLOW (per-frame raster) |

The user's "goo is AWFUL, does not work on Safari, far too slow" maps to the **WebGL
metaball-blob substrate** as it is currently *used as a carousel/transition device*.
The pager worm already proved the correct answer: **the goo morph between UI states
must be the static-filter SVG-goo trick (blur→alpha-threshold) over compositor
transforms — NOT a live WebGL fragment pass.** The carousel/deck transition must
inherit the worm's mechanism class, never the blob renderer.

> **The blob renderer is NOT being retired as a viz.** `<GooBlob>` stays a legitimate
> ambient procedural-art surface (a living membrane over its own substrate, the
> `RESEARCH.md` math is gate-green). The fix is: a **carousel/deck slide transition
> must never be driven by a WebGL metaball pass** — it is a UI-state morph, and a
> UI-state morph is the SVG-goo + transform class. The "AWFUL" judgement is about the
> goo being USED AS A TRANSITION at WebGL cost on Safari, not about the art viz.

### 1b. The Safari-broken class — the var()-driven feGaussianBlur (the literal trap)

The brief names it: **"the SVG goo filter must be STATIC/literal — a var()-driven
`feGaussianBlur` is the WebKit-broken class."** Confirmed by research + the existing
codebase pattern:

- A `<feGaussianBlur stdDeviation="var(--x)">` (or any per-frame `stdDeviation`
  re-write) is the WebKit-broken/expensive class: WebKit does not reliably honor a
  CSS-`var()`-driven SVG filter attribute, and even where it paints, **re-blurring
  every frame is a full filter re-raster** (the `283156 – blur effects on SVG have
  performance issues` WebKit bug; "far too slow").
- The DONE pager worm does this CORRECTLY: `stdDeviation="8"` is a **literal**, the
  `feColorMatrix` alpha-threshold row is a **literal**, and the ONLY per-frame write
  is `transform: translate()/scale()` on the worm capsule. The blur kernel is
  computed once; the GPU composites the moving transform against the static filter.
  **This is the binding pattern for the carousel/deck goo.**

### 1c. The carousel transition today — flat embla, no glass, no goo

`/navigation/carousel` (`demo/stories/navigation/carousel.vue`) is plain `<Carousel>`
(`embla-carousel-vue`) — an item-translate scroll with a `transition-colors` border
swap on the active card. There is **zero** glass distortion, zero lensing, zero
inertial squish ON THE TRANSITION itself (embla's own momentum is a flat scroll, not
a liquid-glass deform). The user wants the slide change to read as liquid glass
flowing — the surface bends light as it travels, with spring inertia + squish.

### 1d. The de-dup gap — carousel and deck are TWO headless engines

| | Carousel | Deck |
|---|---|---|
| Engine | `embla-carousel-vue` (a 3rd-party DOM scroller, `useCarousel.ts`) | `useDeck.ts` (a pure reactive index core, ZERO DOM) + `useDeckSpring.ts` (DECK_SPRING = `.smooth`) |
| Role | paged ITEM scroller (peek, drag-momentum, multi-item-per-view, `basis-1/3`) | full-viewport keyboard-paged PRESENTATION register (one slide fills the view, aria-live "Slide N of M") |
| Pager | `PagerDots` (worm goo-morph, DONE) | `DeckPager` (windowed dots over the SAME PagerDots oracle) |
| Spring | none (embla owns scroll physics) | `DECK_SPRING` `.smooth` (response 0.5 / ζ 0.85) |

They are **NOT the same thing** — and the CLAUDE.md deck note is explicit: `/deck` is
"a clean MOVE of the slides donor's headless core, DISTINCT from /carousel's embla
item-scroller." A carousel can show 2.5 items with drag-peek; a deck shows ONE slide
and is keyboard-paged. **So the de-dup is NOT "merge into one component."** The de-dup
is at the **shared-substrate** layer (see §4) — they should share the goo-morph
TRANSITION engine + the pager oracle + the spring vocabulary, while keeping their two
distinct DOM/role surfaces.

---

## 2. SOTA RESEARCH — the Gemini carousel morph + how a blob↔meatball metaball
transition actually works

### 2a. The Gemini-carousel / Gmail-Gemini morph (the reference the user names)

The Google Gemini morph (the four-point-star → blob shape-shift, the Gmail summarize
animation) is, mechanically:

- **A shape MORPH between two silhouettes with the SAME anchor count** (the CSS
  `shape()` / SVG-path-interpolation approach — "all shapes must have the same number
  of anchor points or they jump"). The shapes spin + bleed gradient as they morph.
- For a **carousel** application the Gemini-class read is: the OUTGOING card's
  silhouette and the INCOMING card's silhouette **fuse through a goo neck** at the
  midpoint — one amorphous blob bridges them, stretches across the gap, then pinches
  off and re-forms as the destination card. This is exactly the **metaball-merge**
  the user describes: "MORPH BLOB and MEATBALL from one to another."

The web-idiomatic, Safari-safe expression of that read is **not** path-interpolation
per-frame and **not** a WebGL pass — it is the **SVG-goo bridge** (the morph-bridge.css
/ fission-bridge.css / pager-worm pattern already shipped): two solid warm-glass
plates blurred together + alpha-thresholded so their fringes **fuse into one
metaball silhouette**, then the threshold pinches them apart as they separate. The
neck wells up and releases — the literal "meatball morphs into the next."

### 2b. How a real blob↔meatball metaball transition works (the math, two valid paths)

1. **The SVG-goo (alpha-threshold) path — THE CHOSEN ONE for UI transitions.**
   - Two (or N) solid shapes are placed in a goo container.
   - `feGaussianBlur(stdDeviation=k)` bleeds each shape's alpha outward into a soft
     fringe. Where two fringes overlap, the summed alpha rises.
   - `feColorMatrix` on the **alpha channel only** (a steep multiply+bias row, e.g.
     `0 0 0 N -((N-1)/2)` with N≈18-20) thresholds the blurred alpha back to a SHARP
     edge — so the overlapping fringes snap to ONE continuous silhouette (the neck),
     and non-overlapping fringes snap back to the shape's own edge.
   - As the two shapes travel apart, the overlap shrinks → the threshold pinches the
     neck → it snaps off. **This IS the metaball merge.** The blur+threshold is the
     2D analogue of the smooth-minimum (smin) field the goo-blob shader computes in
     3D. (`feColorMatrix` threshold ≈ the IQ smin's seam fillet, done in screen-space
     alpha instead of a distance field.)
   - **Cost model:** the blur kernel + threshold are computed ONCE (static filter);
     only the shapes' `transform` changes per frame → the GPU composites a cached
     filter against moving transforms. Fast on Safari. This is the pager-worm proof.

2. **The smin SDF path (WebGL/WGSL) — the goo-blob art viz, NOT the transition.**
   - `smin(a, b, k)` (IQ-normalized, `k *= 4`) blends two signed-distance fields so
     the surface fuses with a quarter-circle fillet at the seam.
   - This is CORRECT for the ambient art blob (a living membrane) but is the WRONG
     COST for a UI transition on Safari (per-frame fragment raster, software-raster
     fallback = the "AWFUL/slow"). DO NOT drive a carousel/deck slide change with it.

### 2c. The iOS-26/27 Liquid Glass motion law (the GlassEffectContainer morph)

iOS 26 Liquid Glass is **gel-like + morphing**: "a GlassEffectContainer combines
multiple Liquid Glass shapes into a single shape that can morph individual shapes
into one another." The material **materializes** (gradually modulates light-bending),
is **fluid** (gel-flexible, instant touch response), and **distorts/lenses** as it
moves ("how light bends, how surfaces distort, how blur interacts with motion"). The
carousel transition target IS a GlassEffectContainer morph: the outgoing + incoming
glass plates are ONE goo container that fuses + lenses + springs between states.

---

## 3. THE TARGET SPEC — what the surface SHOULD look + feel like

### 3a. The goo-morph carousel/deck TRANSITION (the headline)

The slide change is a **GlassEffectContainer goo-morph** built on the **pager-worm
mechanism class** (static SVG filter + compositor transforms), NOT a WebGL pass:

- **Silhouette fuse (the meatball morph).** The outgoing slide-plate silhouette and
  the incoming slide-plate silhouette sit in ONE goo container under the STATIC
  `<filter>` (`feGaussianBlur stdDeviation` literal ≈ 7-9px, `feColorMatrix` alpha
  threshold literal `… 0 0 0 20 -9`, then `feBlend`/`feComposite` the sharp source
  back in for the crisp content). As the index advances, the plates travel along the
  axis; their blurred fringes overlap mid-travel → a **warm-cream metaball neck wells
  up bridging them into one mass** → past the midpoint the overlap shrinks → the neck
  **pinches off** and the destination plate re-forms. This is the literal "morph blob
  and meatball from one to the next."
- **Filter region MUST extend past bounds** — `x="-50%" y="-50%" width="200%"
  height="200%"` on the `<filter>` so the blur fringe (the neck) is not clipped (the
  research finding; otherwise the goo clips at the edge). ONE hidden `<svg><filter>`
  mounted once (the AppShell `<DockGooFilter>` mount precedent), referenced by id.
- **The goo silhouette layer is opaque + aria-hidden + behind the crisp content**
  (the pager-worm + fission-bridge discipline): the goo plates are SOLID warm-glass
  fills (the threshold eats translucent alpha), the readable card content rides an
  UN-filtered layer on top tracking the same scalar (text never goes through the goo,
  or `feColorMatrix` mangles it).
- **Driven on ONE inheriting scalar** (`--slide-morph-t` or reuse `--worm-t`-shaped
  drive): a Houdini `@property <number>` transitioned on the spring `linear()` clock;
  a short rAF reads the interpolated scalar and projects the two-edge geometry (the
  EXACT `useWormMorph` shape, generalized from a dot-pip to a card-plate). NO
  `SpringProgress` import on the static graph (root-barrel-safe).

### 3b. GLASS + DISTORTION + INERTIA on the transition (the §L1 six-layer law)

- **Glass.** The slide-plate is a real glass tier (`resting` for an in-card carousel,
  `floating`/`overlay` for a full-deck) composing ALL SIX `design.md §L1` layers:
  backdrop `blur()`+`saturate()`, warm surface tint, edge rim, inner catch-light,
  drop shadow, grain. The plate reads through `--glass-level` (the a11y bracket path)
  + the `--glass-bg-*` element-level oklab tint seam (the W55 adaptive lift/darken).
  **Warm-cream, NEVER gray** — the `BA.W-NO-GRAY` floor: the plate is warm MATERIAL
  at OKLab hue 62-75 (the `--card` warm-cream `hsl(36 48% 97%)` light /
  `hsl(24 8% 16%)` dark luminous-transmissive register), a saturation-lift over the
  page, never a flat charcoal slab. The neck/goo fill is the SAME warm-cream
  (`color-mix(in oklab, var(--card), white 8%)` domed-droplet radial — the
  morph-bridge plate fill), so the meatball is warm glass, not a gray blob.
- **Distortion (lensing).** As the plate travels it carries the
  `glass-refract` / `--glass-refract` edge-lensing axis (the `@supports
  (backdrop-filter: url(#…))`-gated squircle displacement; the un-gated blur+tint is
  the Safari floor). The light BENDS at the moving rim — the iOS "surfaces distort as
  they move." The lensing depth couples to travel velocity (more bend mid-fling). On
  WebKit (where `backdrop-filter: url()` is unsupported) the un-gated blur+tint+goo
  is the floor — the morph still reads, just without the SVG-displacement lens.
- **Inertia + squish (the liquid-weight law).** The travel rides a `--spring-*`
  curve (NOT a linear embla scroll): enter-bouncy `--spring-bouncy` (~20% overshoot)
  or `--spring-snappy` (~7%, the deck `.smooth`/`.snappy` register) — a finger-driven
  drag uses `snappy`, an auto/keyboard advance uses `smooth`. The plate STRETCHES
  along the travel axis (the volume-preserving `useLiquidFlex` reciprocal squish,
  capped LOW ≈ 1.08-1.4, GIRTH_FLOOR ≈ 0.72 so the meatball necks but never
  self-thins to a thread — the worm's exact discipline) and RELEASES-at-arrival
  (`RELEASE_AT_ARRIVAL ≈ 0.82`). The neck DWELLS open across the gap (the slow flow
  curve — the worm's `--pager-worm-flow` shape, not a front-loaded spring stop), so
  the morph reads as weighty liquid, not a fast flicker.

### 3c. The motion vocabulary (design.md §L2 + motion-canon, NO new clock)

- **Spatial legs** (translate/scale/the morph) → a `--spring-*` (`bouncy`/`snappy`/
  `smooth`) on its matching `--spring-*-duration` settle clock. **Effects legs**
  (opacity/filter blur-settle/color) → the no-overshoot `--ease-out` (P1 SPATIAL vs
  EFFECTS split). Fade coupled to transform (P3). The deck's `--spring-deck =
  var(--spring-smooth)` token is the deck's clock; the carousel's drag is `snappy`.
  **No new spring family is minted** — the W-GLASS-CAL spring fence holds.
- **Compositor-only** — `transform`/`scale`/`opacity`/`filter`/the `--*-t` custom,
  NEVER a layout property (`proof:no-layout-animation`). The plate reserves its
  settled footprint ONCE (a single layout solve); the morph is transform on it.
- **PRM-carved (P6)** — under `prefers-reduced-motion: reduce` the morph SNAPS to the
  target slide (the scalar jumps 0→1 in one frame), `--stretch` stays 1, no rAF, the
  goo silhouette layer is `display:none` (only a terminal opacity cross-fade survives
  — the worm's exact PRM discipline). The lensing distortion is off; legibility holds.

### 3d. The de-dup — ONE shared substrate, TWO surfaces (§4 details)

The carousel and deck KEEP their two distinct DOM/role surfaces (embla item-scroller
vs full-viewport keyboard deck) but SHARE the goo-morph transition engine, the pager
oracle, and the spring vocabulary — ONE engine for the goo, no third fork.

---

## 4. THE DE-DUP RECONCILIATION (the precise answer to "are they the same?")

**They are NOT the same component — do not merge them.** A carousel shows N items
with peek/drag-momentum (`basis-1/3`, 2.5-up); a deck shows ONE slide full-viewport,
keyboard-paged, aria-live. Merging would break both. The CLAUDE.md fence is binding:
`/deck` is DISTINCT from `/carousel`. **But three substrate layers SHOULD be shared
(the real de-dup) so there is no second fork of the same mechanism:**

1. **The goo-morph TRANSITION engine — ONE source (the headline de-dup).** Generalize
   `useWormMorph` (the dot-pip two-edge stretch-then-pinch) into a shared
   **`useGooMorph`** primitive (`/motion-core` or beside the worm) parameterized by
   the silhouette element + the centerOf-oracle + the rest footprint — the worm
   (dot-pip), the carousel slide-plate, and the deck slide-plate ALL drive it. The
   pager worm BECOMES a thin consumer of it (no behavior change — the worm IS the
   first consumer, the carousel/deck plates are #2/#3, the ≥2-consumer bar met). NO
   second goo engine, NO WebGL transition path. (If `useWormMorph` is already the
   right shape, the generalization is a rename + a parameterized footprint — confirm
   at build, do not re-fork.)
2. **The pager oracle — ALREADY shared (keep).** `PagerDots` is the ONE dot register;
   `DeckPager` windows the SAME `pagerWindow` oracle; the carousel story consumes
   `PagerDots`. This de-dup is DONE — the wave must not re-fork it.
3. **The spring vocabulary — ALREADY shared (keep + extend to carousel).** The deck
   rides `DECK_SPRING = .smooth` (= `--spring-smooth` token). The carousel transition
   reads the SAME `--spring-*` token family (`snappy` for drag, `smooth` for
   auto/keyboard) — never a carousel-local easing fork.

**The seam that STAYS forked (recorded, do not collapse):** embla's drag-momentum
scroll physics (multi-item peek) is genuinely embla's job and is NOT the deck's
single-slide model — the carousel keeps embla for the ITEM-SCROLL, and the goo-morph
rides as the ACTIVE-INDICATOR/transition layer ON it (the way `PagerDots` already
rides on the embla `select` event). A full-viewport single-slide carousel (one item
per view, no peek) is effectively a deck and SHOULD compose `useDeck` + the goo-morph
rather than embla — but that is a consumer choice, not a forced merge.

---

## 5. ACCEPTANCE BAR (the binding gestalt + machine checks)

A fix PASSES iff ALL hold (both modes, light + dark; verified on **Safari/WebKit**
AND Chromium — the Safari arm is the headline):

### Gestalt (the human/π verdict)
- [ ] **G1 — the meatball morph reads.** Advancing the slide shows ONE warm-cream
  metaball NECK well up bridging the outgoing→incoming plate, stretch across the gap,
  then pinch off + re-form. Not a hard cut, not a flat embla scroll, not two unrelated
  plates. The Gemini "morph blob and meatball" read.
- [ ] **G2 — glassy + distortion + inertia.** The slide-plate is real warm-cream
  glass (all six §L1 layers, NEVER gray), the rim LENSES/distorts as it travels, and
  the travel carries spring inertia + a volume-preserving squish that necks-then-
  releases. Reads as liquid glass flowing, not a CSS slide.
- [ ] **G3 — Safari-SMOOTH + FAST.** On WebKit the morph is smooth and fast (≈60fps,
  no jank, no wedge). The goo silhouette READS on Safari (static filter paints). No
  software-raster WebGL stall. The user's #1 defect ("AWFUL on Safari, far too slow")
  is dead.
- [ ] **G4 — warm identity holds.** The plate + neck are warm MATERIAL at OKLab hue
  62-75 (the `--card`/`--neutral` warm-cream/luminous-dark register), saturation-lift
  over the page, NEVER a gray/charcoal blob. (`BA.W-NO-GRAY` floor.)
- [ ] **G5 — PRM carved.** Under reduce, the morph snaps (no goo, no squish, no
  lensing), a terminal opacity cross-fade survives, legibility intact.

### Machine / structural (the gate)
- [ ] **M1 — STATIC filter, no var()-driven blur.** The `<filter>` `stdDeviation` +
  `feColorMatrix` values are LITERALS; the ONLY per-frame write is `transform`/`scale`
  /`opacity`/the `--*-t` custom. A `var()`-driven `feGaussianBlur stdDeviation` or a
  per-frame `stdDeviation` re-write REDS (the WebKit-broken class). Filter region is
  `-50%/-50%/200%/200%`.
- [ ] **M2 — compositor-only.** `proof:no-layout-animation` GREEN — zero layout
  property animates; the plate reserves its footprint once.
- [ ] **M3 — no WebGL transition path.** The carousel/deck slide change references NO
  `useMetaballRenderer`/`metaball.frag`/WebGL substrate. The goo is the SVG-filter +
  transform class only. (`<GooBlob>` as an ambient art viz is untouched.)
- [ ] **M4 — ONE goo-morph engine (de-dup).** There is ONE `useGooMorph`-class
  source; the worm, carousel, and deck consume it. NO second stretch/pinch
  implementation (the no-dual-path / `W-PRUNE-CONSOLIDATE` discipline). The pager
  oracle + spring vocabulary stay the ONE shared source (not re-forked).
- [ ] **M5 — spring vocabulary unforked.** The transition reads a `--spring-*` token
  (no carousel/deck-local easing literal); no new spring family minted.
- [ ] **M6 — the carousel/deck role fork is PRESERVED + recorded.** `/carousel`
  (embla item-scroller) and `/deck` (full-viewport keyboard register) stay distinct
  components; the de-dup is at the substrate layer only (§4). A "merge into one
  component" REDS the role fence.

### The binding visual π
- [ ] **π** — `tests-visual/*goo-carousel*.spec.ts` (LOCAL, real GPU + Safari arm):
  the morph frame-series (neck wells → bridges → pinches), the glass-six-layer + warm
  OKLab-hue readback, the spring-inertia squish frame-series, the Safari smooth/fast
  capture, the PRM single-paint — both modes. + the `proof:ba-gestalt` navigation
  verdict on a FRESH capture (the gestalt OR, the close decision).

---

## 6. NON-GOALS / fences (NO legacy, no over-build)

- Do NOT retire `<GooBlob>` the art viz (it stays a legitimate ambient procedural
  surface; the math is gate-green). The fix is the TRANSITION mechanism only.
- Do NOT merge `/carousel` and `/deck` into one component (the role fork is real).
- Do NOT mint a new spring/clock or a new color token (warm-cream is the library
  identity; presets-in-consumers — a slide's content hue is the consumer's, the goo
  fill is the warm-cream `--card` register).
- Do NOT introduce Lenis/GSAP/Locomotive (the native-first fence; the inertia is the
  `--spring-*` curve + the squish, not a JS momentum lib).
- Do NOT drive the goo with `backdrop-filter: url()` as the SOLE path (WebKit-
  unsupported) — the SVG-goo `filter:` on an OPAQUE silhouette layer is the floor;
  the `backdrop-filter: url()` refraction lens is the `@supports`-gated enhancement
  over it.
- Clean break — no back-compat alias if `useWormMorph` is renamed/generalized into
  `useGooMorph` (every call site re-points; the no-legacy law).

---

## Sources

- [Recreating Gmail's Google Gemini Animation — CSS-Tricks](https://css-tricks.com/recreating-gmails-google-gemini-animation/) (the same-anchor-count shape morph)
- [Google Gemini Effect — Aceternity UI](https://ui.aceternity.com/components/google-gemini-effect)
- [Gemini AI Visual Design — Google Design](https://design.google/library/gemini-ai-visual-design)
- [SVG Metaball Gooey Filter with feColorMatrix — Animation Patterns](https://animationpatterns.art/animations/gooey-blob-metaball-filter/) (static stdDeviation + threshold; animate transform; filter region -50%/200%)
- [Fluid Animations: Metaballs and Blob Effects — Effect.Labs](https://effect-labs.com/en/pages/blog/animations-fluides-css.html)
- [283156 — blur effects on SVG have performance issues — WebKit Bugzilla](https://bugs.webkit.org/show_bug.cgi?id=283156) (the per-frame re-blur cost / the "too slow" class)
- [136418 — feGaussianBlur unexpectedly lightens using linearRGB — WebKit Bugzilla](https://bugs.webkit.org/show_bug.cgi?id=136418) (use `color-interpolation-filters="sRGB"` — the pager-goo already does)
- [iOS 26 Liquid Glass: Comprehensive Swift/SwiftUI Reference — Conor Luddy](https://www.conor.fyi/writing/liquid-glass-reference) (GlassEffectContainer morph; gel/fluid/materialize/distort)
- [iOS 26 Liquid Glass Insights — Bhupesh Pruthi](https://medium.com/@bhupesh.pruthi/ios-26-liquid-glass-insights-7397ada6e2d6)
- Internal: `design.md §L1-L5` (six-layer composite, 7 tiers, spring presets, a11y brackets); `CLAUDE.md` BA.W-NO-GRAY (warm-chroma floor), W-DARK-MATERIAL (luminous-dark), W-PAGER-GOO-MORPH (the static-filter worm), the `--glass-tint-*` adaptive seam; `[[feedback-liquid-weight-universal]]` memory.
