# BD.W-GOO-CAROUSEL-DECK — the goo-morph slide TRANSITION + the de-dup + the blob morph

**Band.** BD union — viz/refine (the iOS-27 liquid-dock + liquid-weight refinement).
**Build-spec.** `docs/tranches/BD/viz/refine/goo-carousel-deck/BUILD-SPEC.md` (binding).
**Research.** `research-root-cause.md` (live), `research-target.md` (SOTA + target), `research-mechanism.md` (in-repo map).

---

## THE USER DEFECT (verbatim)

1. *"the goo effect is AWFUL — needs a great deal of refinement. Does NOT work at all on SAFARI, is far too SLOW, and does not goo morph. How does the Google Gemini carousel work? It should MORPH BLOB and MEATBALL from one to another."*
2. *"Carousel and deck should use the SAME underlying SUBSTRATE — in fact, a carousel should likely use a DECK? Are they the same thing? Should we de-duplicate these elements?"*
3. *"/navigation/carousel transitions should be more GLASSY, have more DISTORTION and INERTIA."*

NB: the pager-dots WORM goo-morph (`BD.W-PAGER-GOO-MORPH`) is DONE + Safari-safe (the static SVG filter). This wave is the **carousel/deck TRANSITION goo + the de-dup + the blob↔meatball morph** — it REUSES the worm pattern, it does not re-invent it.

---

## THE FIX (gestalt, no-legacy)

ONE goo-morph TRANSITION engine, ONE Safari-safe goo filter, the blob↔meatball morph as a shading lerp, the gray-hole rider. NO engine merge, NO WebGL pass on a UI transition, NO `var()`-driven filter, NO new spring.

1. **De-dup the ENGINE, not the components.** `useWormMorph` → **`useGooMorph`** (`/motion-core`) — the ONE two-edge stretch→merge→pinch→settle driver (tokenPrefix + girthFloor params). The pager worm becomes consumer #1; the carousel slide-plate #2; the deck slide-plate #3. `useWormMorph.ts` is DELETED (clean break, the no-dual-path discipline). **`/carousel`(embla) + `/deck`(useDeck) stay DISTINCT components** — the role fork is load-bearing (an item-scroller with drag-peek vs a full-viewport keyboard-paged aria-live presentation). The de-dup is at the substrate layer only (the engine + the `PagerDots` oracle + the `--spring-*` vocab — the last two already shared).

2. **The carousel/deck slide goo-morph (the headline).** The OUTGOING slide-plate silhouette + the INCOMING plate sit in ONE goo container under the STATIC library goo `<filter>` (the renamed `GlassGooFilter`/`#glass-goo`, `color-interpolation-filters="sRGB"`, region `-50%/200%`, literal `stdDeviation=7`/threshold — the `DockGooFilter` Safari-safe mount, reused). As the index advances the warm-cream plates travel; their blurred fringes overlap mid-travel → a warm metaball NECK wells up bridging them → past the midpoint the threshold pinches it off → the destination plate re-forms. **The Gemini "morph blob and meatball from one to the next" read.** Driven on `useGooMorph` off embla `select`/`scrollProgress` (carousel) and the deck index (deck); the crisp readable content rides an UNFILTERED layer on top.

3. **Glass + distortion + inertia (the §L1 six-layer law).** The slide-plate is a real warm-cream glass tier (all six `design.md §L1` layers via `--glass-level` + the element-level oklab tint, NEVER gray — `BA.W-NO-GRAY`); the rim LENSES via `.glass-lens`/`--glass-refract` (`@supports`-gated; the un-gated blur+tint+goo is the Safari floor); the travel rides a `--spring-*`-derived `--{prefix}-goo-flow` `linear()` curve + the `useLiquidFlex` reciprocal squish (necks-then-releases). Liquid glass flowing, not a flat embla scroll.

4. **The blob↔meatball MORPH + the SLOW fix.** `metaball.frag`/`metaball.wgsl`'s hard `uStage>0.5` early-return → a `uMorphT` flat↔dressed shading lerp over the SHARED `smin` field (the geometry is identical — the body is the same metaball; only the lit/shadow SURFACE differs, so the morph is a SHADING interpolation, NOT a geometry rebuild). `variant` resolves the `morphT` endpoint (back-compat). The "far too SLOW" is the 1536² backing store — clamp the goo-blob DPR `Math.min(dpr,2)` (the aurora `proof:perf-producer` cap, never applied to the blob). The transition path NEVER touches the WebGL renderer (the structural Safari fix).

5. **The gray-hole rider.** `.glass-pager-ring` reads RAW `--glass-bg-floating` (the substitution-trap — it never engages the W55/dark tint seam, so a pill over a bright carousel image reads gray). Re-point onto `color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength))` (the dock `--glass-bg-dock` precedent; no-op at the 0% default).

---

## THE DE-DUP — the precise answer

**Carousel and deck are NOT the same thing; do NOT merge them.** A carousel shows N items with peek/drag-momentum (`basis-1/3`, 2.5-up); a deck shows ONE slide full-viewport, keyboard-paged, aria-live "Slide N of M". The CLAUDE.md fence is binding (`/deck` is "DISTINCT from /carousel's embla item-scroller"). **Three substrate layers ARE shared (the real de-dup):** (1) the goo-morph TRANSITION engine — ONE `useGooMorph` (this wave); (2) the pager oracle — ONE `PagerDots`/`pagerWindow` (already done); (3) the spring vocab — ONE `--spring-*` family (already done, extended to the carousel here). **The seam that STAYS forked (recorded):** embla's drag-momentum multi-item scroll physics is genuinely embla's — the goo-morph rides as the TRANSITION layer ON it (the way `PagerDots` rides the embla `select` event). A full-viewport single-slide carousel IS effectively a deck and SHOULD compose `useDeck` + `useGooMorph` rather than embla — but that is a consumer choice, not a forced merge.

---

## GATE — `proof:goo-carousel-deck` (NEW, `["local","ci"]`) + `proof:no-gray` G7 (extend-in-place)

The structural gate is device-free SOURCE asserts (the Safari-safe-filter + no-WebGL-transition + one-engine + spring-unforked + blob-morph-continuity + DPR-cap witnesses) with self-test bites; the BINDING paint is the π (born-RED on the HEAD flat-embla/hard-flip/gray ground).

### `proof:goo-carousel-deck` clauses (born-RED on HEAD)

- **G1 — ONE goo-morph engine (de-dup / M4).** Assert `src/composables/motion/useGooMorph.ts` EXISTS and exports `useGooMorph`; assert `src/components/custom/pager-dots/useWormMorph.ts` is DEFINITION-ABSENT (the no-dual-path delete); assert `PagerDots.vue` + `CarouselContent.vue` + the deck demo slide each IMPORT `useGooMorph` (≥2 binary consumers, the J-inv-10 bar). **Self-test bite:** a planted second `useWormMorph`-shaped two-edge stretch impl REDS.
- **G2 — STATIC filter, Safari-safe (M1).** Read `GlassGooFilter.vue` (strip comments) → assert `feGaussianBlur stdDeviation` is a LITERAL (not `var(`/not a per-frame re-write), `color-interpolation-filters="sRGB"` present, the filter region is `x="-50%" … width="200%" …`, regular `filter:` (NOT `backdrop-filter: url(`). **Self-test bite:** a planted `stdDeviation="var(--x)"` REDS; a planted `backdrop-filter: url(` on the slide goo layer REDS.
- **G3 — no WebGL transition path (M3).** Grep the carousel/deck slide-transition recipe + `useGooMorph` for `useMetaballRenderer`/`metaball.frag`/`metaball.wgsl`/`useGpuSubstrate`/`useWebGLCanvas` → assert ZERO references (the goo-morph is the SVG-filter + transform class only). **Self-test bite:** a planted `useMetaballRenderer` import on the slide path REDS.
- **G4 — compositor-only (M2, cross-assert).** Assert `proof:no-layout-animation` covers `useGooMorph`'s per-frame writes (transform/scale/opacity/--goo-t custom; no layout property). (Cross-asserts the sibling gate; no re-impl.)
- **G5 — spring vocab unforked (M5).** Assert the `--carousel-goo-flow`/`--deck-goo-flow` are `linear()` curves emitted by `regen-spring-tokens.mjs` from the SPRING_PRESETS table (NOT a hand-authored bezier, NOT a new spring preset); assert NO new `--spring-<name>` preset minted. **Self-test bite:** a planted hand-authored `cubic-bezier(...)` carousel-goo curve REDS; a planted new `--spring-foo` preset REDS.
- **G6 — the role fork preserved (M6).** Assert `/carousel` (`useCarousel.ts`/embla) and `/deck` (`useDeck.ts`) are TWO distinct exported components/composables; assert NEITHER imports the other's engine. **Self-test bite:** a planted `useDeck` import inside `useCarousel` (the merge) REDS.
- **G7 — the blob morph is a continuous lerp (M8).** Read `metaball.frag.ts`/`metaball.wgsl.ts` → assert `uMorphT` is read AND mixed (`mix(... , uMorphT)` / a `uMorphT`-gated lerp); assert NO hard `uStage > 0.5` early-return that BYPASSES the dressing (the dressing is mixed, not cut); assert the `smin` field expression is byte-unchanged (the geometry-shared fence). **Self-test bite:** a planted re-introduced hard `uStage>0.5; return;` cut REDS.
- **G8 — the blob DPR cap (M9).** Read `useMetaballRenderer.ts` → assert the backing-store DPR is clamped `Math.min(... , 2)` (the aurora cap). **Self-test bite:** a planted un-capped `devicePixelRatio` backing-store write REDS.

### `proof:no-gray` G7 (NEW source witness — extend-in-place, no new KEY)

- **`pager-ring-reads-element-tint`.** Read `src/styles/glass/surfaces.css` (strip comments) → assert the `.glass-pager-ring` `background:` is `color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength))`, NOT raw `var(--glass-bg-floating)`. **Born-RED on HEAD** (raw token). **Self-test bite:** a planted raw-token `.glass-pager-ring` background REDS. (G1–G6 + the KEEP-NEUTRAL byte-asserts + the AA re-ratify untouched.)

### The binding π — `tests-visual/goo-carousel-deck.spec.ts` (LOCAL, real GPU, **Chromium + WebKit**, both modes)

Born-RED on HEAD (frame 1 of a carousel advance is a flat embla translate — NO goo silhouette; the blob is a hard variant cut; the pager-ring is raw-token gray).

1. **Morph frame-series** — advance `/navigation/carousel` (+ `/motion/deck`) over 8–12 frames; assert ONE continuous warm metaball NECK silhouette bridges the two plate centers at a mid-travel frame, then SEVERS at a late frame (the wells-up→pinches-off mass measure, the worm/`proof:goo-redress` π precedent). [G1]
2. **Glass-six-layer + warm-hue readback** — `getComputedStyle` the slide plate + the goo neck fill → OKLab C ≥ 0.010 at warm H ∈ [45,85] (NEVER gray); the six `--glass-*` legs present. [G2/G4]
3. **Spring-inertia squish frame-series** — `--stretch` ≠ 1 mid-travel (the velocity swell); `--goo-len-ratio` peaks at the midpoint (the stretch-then-contract bulge). [G2]
4. **Blob `uMorphT` morph** — `/substrates/blob` with `morphT` 0→1: a mid-`morphT` frame is BETWEEN the flat-blob and lit-meatball endpoints (not a hard cut); the silhouette (smin field) is byte-stable across the morph. [M8]
5. **Safari smooth/fast** (headline) — the WebKit project: the goo silhouette paints; no wedge; the blob morphs without the 1536² stall (frame time within budget). [G3]
6. **PRM single-paint** — under reduce: the slide snaps (no goo layer / `display:none`, no `--stretch`, no rAF); a terminal opacity cross-fade survives; the blob `morphT` jumps in one frame. [P6]
7. **G7 pager-ring** — `<PagerDots ring>` over a bright `--glass-backdrop: light` plate → composited `.glass-pager-ring` `background-color` OKLab C ≥ 0.010 at warm H ∈ [45,85] AND darker vs the flat-page no-op default; both modes. [M7]

+ the `proof:ba-gestalt` **navigation** verdict on a FRESH capture (G1–G5 — the close OR decision).

---

## FENCES (binding)

1. NO engine merge — carousel(embla) + deck(useDeck) stay distinct; the de-dup is the engine/oracle/vocab substrate layer.
2. NO WebGL pass on a UI transition — the goo-morph is the static-SVG-filter + transform class; `<GooBlob>` the art viz is untouched (the `uMorphT` ADD is back-compat).
3. NO `var()`-driven `feGaussianBlur` / per-frame re-blur; NO `backdrop-filter: url()` as the sole goo path (the regular `filter:` on an opaque layer is the floor; the refract lens is the `@supports`-gated enhancement).
4. NO new spring/clock/color token — the `--*-goo-flow` are SPRING_PRESETS-generated `linear()` curves; warm-cream is the identity.
5. NO Lenis/GSAP/Locomotive — inertia is the `--spring-*` curve + the squish.
6. NO re-warm of `--card`/saturate (W-GLASS-ABROGATE-GRAY landed it); NO re-tune of the shipped worm tokens (verify, not re-engineer).
7. Clean break — `useWormMorph`→`useGooMorph` + `DockGooFilter`→`GlassGooFilter` re-point every call site, no alias.
8. `in oklab` for the glass-tint (the `--surface-tint-*` in-srgb brand fence — AW.W26 — untouched); the `smin` field byte-untouched (the shader-geometry fence).

---

## MIGRATION

- `useWormMorph` → `useGooMorph({tokenPrefix:"pager-worm", girthFloor:0.72})` (internal — the worm consumer re-points; no public API change for `PagerDots`).
- `DockGooFilter`/`#dock-goo` → `GlassGooFilter`/`#glass-goo` (the fission/morph-bridge token consumers re-point one token each; clean-break rename).
- `<GooBlob>` gains an additive `morphT?: number` prop (`variant` resolves the endpoint — byte-back-compat for an un-setting consumer); a consumer ANIMATING `morphT` 0↔1 gets the live blob↔meatball morph.
- The carousel/deck slide goo-morph is additive (the slide change gets the liquid-glass treatment; the public `<Carousel>`/`useDeck` prop surface is unchanged).
