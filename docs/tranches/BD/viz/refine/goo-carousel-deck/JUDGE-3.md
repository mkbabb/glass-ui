# JUDGE-3 — BD.W-GOO-CAROUSEL-DECK (iteration 3)

**VERDICT: FAIL (meetsBar = false) — but a NARROW one.** The FOUR headline user defects
(AWFUL / does-NOT-work-on-Safari / too-SLOW / does-not-goo-morph) are ALL independently
verified RESOLVED, and the de-dup + liquid-weight asks are met. The single remaining blocker is
a **dark-mode gestalt**: during the morph the goo bridge masses composite to a **dim warm-gray /
gray-brown HALO** around the slide (effective L ≈ 0.31 over the dark aurora), NOT the
luminous-transmissive warm glass the W-DARK-MATERIAL register demands and the user keeps flagging
as "gray." The chroma metric clears the BA.W-NO-GRAY floor (C 0.0163, H 59°) — but **the gestalt
is the bar, not the metric**, and in dark mode it reads muddy.

Live-verified on `http://localhost:5173` (Chromium, light + dark), REAL `.click()` on the actual
Next button + real `deck.next()` handler + tight rAF frame-series sampling + MutationObserver on
the travel gate. Every datum below is independently reproduced; BUILD-REPORT-3 was trusted NOTHING.

---

## 1. THE FOUR HEADLINE DEFECTS — all VERIFIED RESOLVED

### (a) "does NOT work on SAFARI" — RESOLVED (structurally airtight)
Live SVG-filter graph readback (`#glass-goo`, the carousel + deck mount):
```
feGaussianBlur stdDeviation="10"   hasVar=false   (the WebKit var-driven-blur class ABSENT)
feColorMatrix  values="… 24 -11"   hasVar=false   (static literals)
color-interpolation-filters="sRGB" (WebKit linearRGB-lighten bug avoided)
region -50% -50% 200% 200%         (neck never clips)
filter: url(#glass-goo)            (regular filter, NOT backdrop-filter:url — bug 245510 avoided)
```
Deep stylesheet walk for `backdrop-filter: url(...)` → **0 rules** (false-positive in a naive
substring scan; the real walk confirms none). `@supports not (filter: url(#glass-goo))` floor +
`prefers-reduced-motion` carve both PRESENT for the carousel layer. **Safari-structurally-safe.**

### (b) "too SLOW" — RESOLVED (fast)
Real Next click, tight rAF sampling: the worm reaches peak width at **~128 ms**, settles by
~300 ms. The spring-derived `linear()` flow curve overshoots to 1.0147 (the bounce IS the weight).
Fast — the original "slow" defect does not reproduce.

### (c) "does not goo morph" — RESOLVED (engages, decisive merge)
On a CLEAN page load + ONE genuine `.click()` on the real Next button:
```
data-traveling toggles ON → .carousel-goo-layer opacity 0 → 0.55 (held through travel → fade-out)
worm peak width 970px from rest 353px → lenRatio 2.75   (a decisive two-mass neck across the gap)
```
The metaball bridge necks + pinches via the static SVG filter. **It goo-morphs.**

> CAVEAT on my own iteration-3 first pass: my INITIAL reproduction showed opacity 0 / no morph.
> That was a TEST ARTIFACT — repeated direct `onSelect()` calls + rapid over-clicking desynced
> `activeIndex`, tripping the `from === to` branch in `CarouselContent.onSelect` (which skips
> `markTraveling`). On a clean single real gesture the goo fires correctly. **NOTE for the build
> author:** the `from === to` early-return is fragile — a fast double-advance (or any path that
> pre-updates `activeIndex` before `select` fires) silently kills the goo. Worth hardening so the
> travel-gate keys off embla's `selectedScrollSnap() !== previousScrollSnap()` rather than the
> locally-tracked `activeIndex`, so rapid real swipes never drop the morph.

### (d) "AWFUL / the WebGL metaball" — RESOLVED
The carousel/deck transition uses the compositor SVG-goo (`useGooMorph` transforms + static
filter), NOT the per-frame `useMetaballRenderer` WebGL pass (the "AWFUL/slow" one). Correct.

---

## 2. THE DE-DUP (user ask #2) — CORRECT + IDIOMATIC
- `useGooMorph.ts` exists ONCE (353 L); the THREE consumers (PagerDots worm, carousel plate, deck
  plate) share it — no second goo fork.
- Carousel (`embla`, 2.5-item drag-peek scroller) and deck (`useDeck`, one-slide keyboard-paged)
  are correctly KEPT as distinct surfaces; the de-dup is at the shared goo-morph SUBSTRATE layer.
  This is the right answer to "are they the same thing?" — they are NOT; the shared substrate is
  the dedup. Well-reasoned, documented in research-target §1d/§3d.

## 3. LIQUID-WEIGHT (user ask #3: glassy + distortion + inertia) — MET structurally
- INERTIA: spring-`linear()` flow overshoot 1.0147 + max-stretch 1.24 squish (`useLiquidFlex`).
- DISTORTION: `filter: url(#glass-goo)` metaball lensing on the bridge layer.
- GLASSY: the worm fill is the warm domed-droplet `radial-gradient(…, white 20% catch-light)`.

## 4. JUDGE-2 §1 DECK GRAY-SLAB-AT-REST — FIXED (both modes, confirmed)
`/motion/deck`, slide 1/6 "Welcome", at rest, BOTH modes:
```
.deck-goo-layer opacity = 0   (NOT 0.5)   stage data-traveling = false
```
The gate `.deck-demo-stage[data-traveling] .deck-goo-layer` resolves to 0.62 ONLY when traveling
(verified: with the transition disabled, `data-traveling` → opacity 0.62; at rest → 0). The deck's
own `glass-quiet` warm plate is the legible backing. **No permanent slab.** The §1 fail is dead.
Deck morph also engages on real `deck.next()` (tight poll: `data-traveling` toggles, peak 0.62).

## 5. CONSOLE — clean
Only the two PRE-EXISTING unrelated warnings (TooltipProvider `<Transition>` non-element-root +
aurora `useAurora` no-onInitError). ZERO goo-related errors across every real transition.

---

## 6. THE BLOCKER — the DARK-MODE goo reads as a gray-brown halo, not luminous warm glass

Live dark-mode readback of the carousel goo worm fill:
```
oklab(0.468 0.0084 0.0140)   C 0.0163   H 59.2°   (clears the warm floor on the NUMBER)
composited at 0.55 over the dark aurora (page L ~0.12) → effective L ≈ 0.31
```
Screenshots (real natural morph @~115ms AND a forced-peak pin), dark mode: the metaball masses +
neck flanking the slide read as a **dim warm-GRAY / gray-brown HALO/FRAME** around the slide, NOT
the luminous-transmissive warm glass the dark register requires. The dark goo is a FLAT dark fill —
it carries NO luminosity-lift / glow-where-light-passes companion (the W-DARK-MATERIAL transmissive
register: `saturate()/brightness()` lift so dark glass GLOWS where light passes). At effective
L 0.31 over the dark backdrop the perceptual read is muddy. This is exactly the "gray" the user
flags relentlessly — and **the gestalt is the bar, not the C≥0.010 metric**.

(Light mode is fine: worm fill C 0.0137 H 67.5°, composites warm-cream — acceptable.)

---

## 7. THE CONCRETE REFINEMENT (to pass)

The dark-mode goo bridge must read as **luminous warm transmissive glass**, not a dim gray-brown
halo. Specific, compositor-only, Safari-safe knobs:

1. **Lift the dark worm/plate fill luminance.** In `CarouselContent.vue` + `deck.vue` the worm/plate
   `radial-gradient` reads `currentColor` = `color-mix(in oklab, var(--card), white N%)`. The dark
   `--card` is L≈0.16; lifting the dark fill to ~L 0.62–0.70 (the dark-`--foreground`-derived warm
   register, NOT a gray white-mix) so that composited at 0.55 over the dark aurora the mass reads
   ABOVE L ~0.5 — a glowing warm membrane, not a dim frame. Use a `.dark` arm on the fill
   (`color-mix` toward the warm dark-ink at higher L), mirroring W-DARK-MATERIAL's elevation lift.
2. **Add the transmissive companion.** Give the dark goo layer a `saturate()/brightness()` lift (the
   dark-glass-glows-where-light-passes register) so the warm chroma reads as LIT glass, not a flat
   fill — keep it on `filter`/the fill, never `backdrop-filter:url` (Safari).
3. **Re-judge the dark morph as a GESTALT** (a real click in dark mode, a mid-morph frame): the two
   masses + neck must read as warm GLASS welling across the gap, with the dark aurora glowing
   THROUGH them — not a charcoal/taupe halo around the slide.

Also harden the carousel travel gate against the `from === to` desync (item 1d above) so a rapid
real swipe never silently drops the goo.

---

## 8. THE BAR

| User ask | status |
|---|---|
| does NOT work on Safari → Safari-static filter | **RESOLVED** (no var, sRGB, no backdrop-filter:url, @supports floor, PRM) |
| too SLOW → fast | **RESOLVED** (peak ~128ms) |
| does not goo morph → real metaball merge | **RESOLVED** (lenRatio 2.75 on a real click) |
| AWFUL/WebGL → compositor SVG-goo | **RESOLVED** |
| de-dup carousel/deck → ONE substrate | **CORRECT** (ONE useGooMorph; surfaces stay distinct) |
| glassy + distortion + inertia | **MET** (overshoot 1.0147 / max-stretch 1.24 / filter:url) |
| deck gray-slab-at-rest (JUDGE-2 §1) | **FIXED** (rest op 0, both modes) |
| warm NOT gray (BA.W-NO-GRAY) — DARK MODE | **FAIL** (dark goo masses read gray-brown halo @ effective L 0.31; not luminous warm glass) |
