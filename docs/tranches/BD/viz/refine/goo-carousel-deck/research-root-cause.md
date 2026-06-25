# RESEARCH-1 — LIVE ROOT-CAUSE: goo / carousel / deck de-dup

Live-inspected on `http://localhost:5173` (Chromium via chrome-devtools-mcp). Every value below is a **resolved computed value** off the live DOM, not a source read.

The user feedback decomposes into THREE distinct defects + ONE de-dup question. They are NOT the same surface — the brief conflates "the goo effect" (which is the WebGL metaball blob) with the carousel/deck transitions (which today have NO goo at all). The confirmed mechanisms:

---

## DEFECT 1 — "the goo effect is AWFUL … does NOT work on SAFARI, far too SLOW, does not goo morph … MORPH BLOB and MEATBALL"

There are TWO candidate "goo" surfaces. The feedback's own clue ("MORPH BLOB and MEATBALL from one to another") points at the **WebGL goo-blob metaball**; the brief's Safari clue ("var()-driven feGaussianBlur is the WebKit-broken class") points at the **CSS SVG goo filters**. Both diagnosed:

### 1a. The WebGL goo-blob — `variant: "blob" | "meatball"` is a STATIC FLIP, never a MORPH (the literal user defect)

- File: `src/components/custom/goo-blob/composables/uploadBlobUniforms.ts:315`, `uniformBridgeWGPU.ts:169`.
- Live: `/substrates/blob` mounts ONE WebGL2 canvas (1536×1536, `webgl2` confirmed available).
- The mechanism: `const isMeatball = config.variant !== "blob"` → `gl.uniform1f(U.uLit, isMeatball ? 1 : 0)` + `gl.uniform1f(U.uShadow, …)`. **`blob` = fill-only floor (uLit 0); `meatball` = full lit + soft-shadow march (uLit 1).** This is a BOOLEAN uniform toggle — it switches rendering pipelines instantly. **There is NO `uMorphT` scalar interpolating blob↔meatball.** The user explicitly asks for a CONTINUOUS morph ("from one to another", "like the Gemini carousel"); the code gives a hard variant switch.
- ROOT CAUSE: the morph the user wants does not exist. The two shapes already share the SAME `smin` (smooth-minimum) SDF field — the body geometry is identical; only the SURFACE shading (lit/unlit/shadow) differs. A morph is therefore a SHADING lerp (`mix(unlitColor, litColor, uMorphT)` + a shadow-strength ramp) on a registered `@property`-style scalar — NOT a geometry rebuild. The field is already metaball; the merge mechanism is already `smin`. The miss is purely that the variant is a step, not a ramp.

### 1b. "far too SLOW" — the goo-blob is a 1536×1536 full-canvas per-frame fragment march

- Live canvas backing store: `1536 × 1536` (≈2.36M px) painted EVERY frame with a per-pixel SDF march + (in meatball) a soft-shadow secondary march + `fwidth()` AA. On an integrated GPU or Safari's more conservative WebGL2 path this is the "slow" read. (The blur worm and CSS goo are cheap; the WebGL march is the cost.)
- NB the CLAUDE.md `proof:perf-producer` already fences a "one-canvas+dispose invariant" and a "sub-2×-DPR cap" for aurora — the blob's 1536² backing store suggests the DPR cap is NOT applied to goo-blob (a 2×-DPR 768-CSS-px canvas = 1536 backing). This is the SLOW lever: cap the blob backing-store DPR and/or drop the meatball soft-shadow march resolution.

### 1c. Safari — the CSS SVG goo filters ARE static/literal (Safari-SAFE by construction; NOT the defect, but the pattern to REUSE)

- `#pager-goo feGaussianBlur` resolved `stdDeviation="8"` — a **STATIC literal**, not `var()`-driven. ✅ Safari-safe.
- `.pager-goo-layer` live: `filter: url("#pager-goo")` (REGULAR `filter`, NOT `backdrop-filter: url()` — WebKit bug 245510 avoided ✅), `opacity: 0.65` (the opaque-layer technique — translucency lives ONCE at the layer, not on the merged shapes ✅), `will-change: transform`, `contain: layout paint`.
- `dock-fission-goo` + `dock-morph` bridges: `fission-bridge.css:27` header explicitly records "SAFARI-FIRST … REGULAR `filter: url(#…)` … STATIC `<defs>`, NOT backdrop-filter". The animated axes are `f(var(--neck-t))` on the MOVING shapes — the FILTER itself is never `var()`-driven. ✅
- CONCLUSION: the shipped W-PAGER-GOO-MORPH worm + the fission/morph bridges are the CORRECT Safari-safe goo pattern (static `<filter>`, opaque shapes move under it, regular `filter:`, 52–65% translucency at the layer). **Reuse THIS pattern for any new carousel/deck goo — never a `var()`-animated `feGaussianBlur stdDeviation`, never `backdrop-filter: url()`.**

---

## DEFECT 2 — "Carousel and deck should use the SAME SUBSTRATE … is a carousel a deck? De-duplicate."

Live-confirmed: **the carousel and deck are TWO DISTINCT ENGINES today.** They share the pager-DOTS (PagerDots) but NOTHING of the slide-transition substrate.

| | Carousel (`/navigation/carousel`) | Deck (`/motion/deck`) |
|---|---|---|
| Engine | `embla-carousel-vue` (`useCarousel.ts`) | `useDeck.ts` (pure headless index, ZERO DOM) |
| Slide motion | embla inline `transform: translate3d(…)` driven by embla's own JS rAF; CSS `transition-duration: 0s`, `transition-property: all` (no CSS transition at all) | CSS `transition: transform 0.45s var(--spring-deck), opacity 0.2s` on `.deck-demo-slide` (the demo owns the CSS) |
| DOM model | horizontal flex track, all slides in a row, `overflow: hidden`, drag/swipe via embla | absolute-stacked slides, one `[data-state=active]`, the rest `translateX(2rem)` + `opacity:0` |
| Pager dots | `<PagerDots>` (the worm) ✅ SHARED | `<DeckPager>` → `<PagerDots pattern="group">` (the worm) ✅ SHARED |
| Gesture | swipe/drag (embla) + chevrons + dots | keyboard (Arrow/Space/digit) + Prev/Next + dots |
| Live `--spring-deck` | unused (embla owns motion) | `linear(0, 0.09979 2.041%, …)` = `--spring-smooth` exactly |

ROOT-CAUSE ANALYSIS of the de-dup question:
- **They are NOT the same thing, and should NOT collapse to ONE engine.** The deck is a one-at-a-time full-viewport keyboard PRESENTATION register (DISTINCT by design per `useDeck.ts` header + CLAUDE.md §deck). The carousel is an embla ITEM-SCROLLER (drag/swipe, multi-item visible, `basis-2/3 sm:basis-1/3` partial slides — live in the demo's second section). A deck shows ONE slide; a carousel shows a SLIDING WINDOW of items. Forcing embla into the deck breaks the keyboard/aria-live PRESENTATION contract; forcing useDeck into the carousel loses drag/multi-item/free-scroll.
- **The de-dup ALREADY happened at the right seam: the pager-dots oracle.** PagerDots is the ONE shared substrate (`pagerWindow` math + the worm goo-morph), consumed by BOTH (carousel via `<PagerDots>`, deck via `<DeckPager>` → `<PagerDots pattern="group">`). That is the correct shared layer — the dots, not the engine.
- **The HONEST shared substrate that IS missing: the TRANSITION CURVE + the liquid-weight treatment.** The carousel has NO spring/inertia/distortion on its slide (embla raw translate, `transition: all 0s`); the deck has a calm `translateX` fade. NEITHER carries the goo/distortion/inertia the user wants. The thing to share is the **liquid-glass transition register** (the W-PAGER worm's `--pager-worm-flow` curve + `useLiquidFlex` squish + a goo bridge between outgoing/incoming slides), applied to BOTH transition surfaces — not a forced engine merge.

VERDICT: de-dup the TRANSITION LANGUAGE (one liquid-glass slide-transition register both consume), NOT the engine. The engine fork is correct and load-bearing.

---

## DEFECT 3 — "/navigation/carousel transitions should be more GLASSY, more DISTORTION, more INERTIA"

The single sharpest, most actionable defect. Live-confirmed the carousel slide transition is BARE:

- `[data-slot="carousel-content"] > div` (the embla track): `transform: matrix(1,0,0,1,0,0)` (inline `translate3d(0,0,0)`), `transition-duration: 0s`, `transition-property: all`, `filter: none`, `will-change: auto`.
- `[data-slot="carousel-item"]`: `filter: none`, `backdrop-filter: none`, `transform: none`, `transition: all`.
- ROOT CAUSE: embla drives a pure linear/eased JS translate with **zero distortion, zero squish, zero glass refraction, zero inertia overshoot.** There is no `--spring-*` curve, no `useLiquidFlex` reciprocal squish, no goo bridge, no `filter: blur/url()` on the incoming/outgoing edge. The slide just translates. This is the antithesis of [[feedback-liquid-weight-universal]] (inertia/weight/bounce/squish on ALL motion).
- The fix register already exists in-house and is Safari-safe: the W-PAGER worm's `--pager-worm-flow` weighty linear() curve, `useLiquidFlex` squish, and the static-filter goo bridge (fission/morph pattern). Apply a glass/distortion treatment to the carousel slide edge (a compositor `filter` or a goo-bridge between the leaving + arriving slide) + a velocity-squish + a spring/inertia overshoot. embla exposes `scrollProgress()` + `on('scroll')` — the squish/distortion can be driven off embla's live scroll progress (the same way useWormMorph reads `--worm-t`), so the engine stays embla but the SURFACE gets the liquid-weight treatment.

---

## The Gemini-carousel morph (research) + how a real blob↔meatball metaball transition works

- **Gemini morph technique** (CSS-Tricks "Recreating Gmail's Google Gemini Animation"): shape morphing via the CSS `shape()` function (or equal-anchor SVG path interpolation). The CARDINAL constraint: **the two shapes MUST have the SAME number of anchor points** and matched starting points, else the morph jumps instead of flows. This is the path-interpolation family — good for a 2-shape glyph morph, but NOT how a multi-blob metaball merge works.
- **The real blob↔meatball / dot↔dot metaball transition** (the goo-blob + worm already do this): the SDF `smin` (smooth-minimum / polynomial smooth-union) field. Two distance fields blended by `smin(d1, d2, k)` produce a NECK that wells up + pinches off as the shapes approach/separate — the "metaball merge". This is exactly what `metaball.frag`'s `sceneDistG` does (satellites smin'd into the body) and what the SVG goo filter (`feGaussianBlur` → `feColorMatrix` alpha-threshold) approximates in 2D for the worm/fission bridge. The blob↔meatball morph the user wants is therefore: keep the SAME smin field (geometry identical), and lerp the SURFACE (lit/shadow) on a `uMorphT` scalar — a shading morph over a shared metaball field, NOT a path interpolation.
- For the CAROUSEL transition: the Gemini "one card morphs into the next" reads as a metaball/goo bridge — the outgoing card's silhouette necks into the incoming card's via the SAME static-filter goo trick the worm uses (opaque silhouettes move under a static `feGaussianBlur`+threshold `<filter>`). Safari-safe by the W-PAGER pattern.

Sources:
- [Recreating Gmail's Google Gemini Animation — CSS-Tricks](https://css-tricks.com/recreating-gmails-google-gemini-animation/) (equal-anchor shape() morph)
- in-repo: `metaball.frag.ts` (`smin` SDF field), `useWormMorph.ts` + `PagerDots.vue` (static-filter goo metaball merge, Safari-safe).

---

## CONFIRMED ROOT-CAUSE SUMMARY (the precise mechanisms + live values)

1. **goo-blob does not MORPH blob↔meatball** — `variant` is a boolean uniform flip (`uLit`/`uShadow` 0|1, `uploadBlobUniforms.ts:315`), no `uMorphT` interpolation. Fix = a shading lerp on a registered scalar over the SHARED smin field.
2. **goo-blob is SLOW** — 1536×1536 per-frame WebGL2 SDF march + (meatball) a second soft-shadow march; the aurora-style sub-2×-DPR cap is NOT applied to the blob backing store. Fix = DPR-cap the backing store + reduce the shadow-march cost.
3. **Safari** — the CSS SVG goo filters are ALREADY static/literal (`stdDeviation="8"`, regular `filter: url()`, opaque-layer technique) — Safari-safe ✅. The WebGL blob's Safari risk is WebGL2 perf, not a broken filter. The static-filter worm/fission pattern is the model to REUSE for any new goo.
4. **carousel + deck are TWO engines** (embla vs useDeck) — correctly distinct; they ALREADY share the right substrate (PagerDots dots/worm). De-dup the TRANSITION LANGUAGE, not the engine.
5. **carousel slide transition is BARE** — embla raw `translate3d`, `transition: 0s all`, `filter: none`, no spring/squish/goo/distortion/inertia. The single sharpest fix: apply the liquid-weight register (W-PAGER flow curve + useLiquidFlex squish + static-filter goo bridge + spring inertia) driven off embla's live `scrollProgress()`.
6. **deck slide transition is CALM but bare** — `translateX(2rem)` + opacity on `--spring-deck`(=`--spring-smooth`), no goo/distortion. Same liquid-weight register applies.

The NORTH-STAR-correct fix is ONE shared liquid-glass slide-transition register (Safari-safe static-filter goo bridge + useLiquidFlex squish + spring inertia/overshoot, compositor-only, PRM-carved) consumed by BOTH the embla carousel (driven off `scrollProgress`) and the deck slide — plus a `uMorphT` shading morph + a DPR cap on the goo-blob. NO engine merge, NO `var()`-animated filter, NO backdrop-filter url().
