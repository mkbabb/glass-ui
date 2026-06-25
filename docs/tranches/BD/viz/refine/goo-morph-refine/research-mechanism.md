# RESEARCH-3 — the FIX MECHANISM (glass-ui internals): goo-morph-refine

**Role.** Map the EXACT tokens/recipes to retune so the `/motion/deck` (PagerDots →
DeckPager → carousel) dot indicator GOO-MORPHS with FULL liquid weight — slower, with
bigger dots, a fatter goo neck, and a weightier flow — WITHOUT re-forking any primitive
and WITHOUT minting a new spring family (compose the shipped `useWormMorph` + `useLiquidFlex`
+ `--spring-bouncy` + the `morph-bridge.css` goo trick). The user has rejected SUBTLE TWICE
— go FAR.

**Binding north star.** `design.md` + the iOS-27 Liquid Glass language (the six-layer
optical composite) + glass+PAPER morphism + the `BA.W-NO-GRAY` warm-chroma floor + the
`[[feedback-liquid-weight-universal]]` law (inertia / weight / bounce / squish on ALL
motion; pager/deck dots goo-morph like the Google-deck worm). NO legacy, idiomatic,
gestalt, compositor-only, PRM-carved, Safari-compatible.

---

## 0. THE DEFECT — verbatim (USER-FEEDBACK-2026-06-23 #2)

> "/motion/deck is awful... The animation is **far too fast**, the **dot far too small**,
> the **goo and morphing far too subtle**. It should **stretch and flow more slowly**."

This is the SECOND rejection of the goo-morph (W-PAGER-GOO-MORPH shipped the worm; the
builder flagged the small-dot prominence risk; the user confirmed it). The worm + merge
exist and are STRUCTURALLY correct — but every magnitude reads under-dialed: the clock is
quick, the 6px dot disappears, and the goo neck pinches off before the eye registers a
metaball merge. The fix is a coordinated MAGNITUDE retune across four axes, all on the
EXISTING `--pager-*` token surface + the in-SFC SVG-goo filter constants — ZERO new
recipe, ZERO new spring, ZERO primitive edit.

---

## 1. ROOT CAUSE — every magnitude is dialed for SUBTLE; the four axes are coupled

The worm anatomy (verified on disk, `PagerDots.vue` + `useWormMorph.ts`):

| axis | token / source | HEAD value | reads as |
|---|---|---|---|
| **clock** | `--pager-worm-duration` | **1.3s** (already bumped 0.57→1.3 "safe-blind") | partial; still no WEIGHT inside the glide |
| **spring** | `--pager-worm-spring` = `var(--spring-bouncy)` | response 0.5 / ζ 0.55 / overshoot +12.6% | a brisk pop — light, not heavy |
| **dot size** | `--pager-dot-size` | **0.375rem (6px)** | a near-invisible pip; the worm rest length W = 6px |
| **elongation ref** | `--pager-dot-elongated` | **1.5rem (24px)** | the reference span (the worm peaks at W+pitch, ~30px+) |
| **squish cap** | `--pager-worm-max-stretch` | **1.08** (≈+8%) | a sub-perceptual gel swell |
| **goo blur** | `feGaussianBlur stdDeviation` | **4** | a thin fringe — the neck reaches only ~6px |
| **goo threshold** | `feColorMatrix … 0 0 0 18 -7` | cutoff **M/N = 7/18 ≈ 0.389** | a HIGH cutoff → the neck pinches off early/thin |

### 1a. THE GOO NECK MATH (the load-bearing subtlety root cause)

The merge neck is the worm's blurred fringe bridging the residual gap to the dot it
passes. Model (the classic gooey filter — `feGaussianBlur` stdev `s`, alpha-threshold at
`cutoff = M/N`, the neck survives where the summed blurred edge-alpha at the gap midpoint
clears the cutoff; `scratchpad/worm-bridge.mjs`):

```
residual-gap bridge alpha (worm fringe → next dot):
  gap=4px:   s4=0.617  s7=0.775  s8=0.803  s9=0.824
  gap=8px:   s4=0.317  s7=0.568  s8=0.617  s9=0.657
  gap=12px:  s4=0.134  s7=0.391  s8=0.453  s9=0.505
  gap=16px:  s4=0.046  s7=0.253  s8=0.317  s9=0.374
```

At **HEAD (s=4, cutoff 0.389)** a neck survives only a ~4-6px residual gap — so the
worm has to be nearly ON the dot before a neck wells, and it pinches off the instant it
leaves. That IS "the goo and morphing far too subtle" — a hard hop with a flicker of
neck, not a fat metaball bridge.

At **s=8, cutoff ≈ 0.31-0.33** the neck survives a 12-16px gap — it wells up EARLY (as
the worm approaches), reads FAT across the whole crossing, and releases LATE (as the worm
clears). That is the Google-deck metaball worm.

### 1b. THE DOT-SIZE COUPLING (why bigger dots fix two things at once)

The worm width = `--pager-dot-size` (`.goo-worm { width: var(--pager-dot-size) }`). So a
6px dot is ALSO a 6px-thin worm — the elongated capsule is a hairline. Growing
`--pager-dot-size` → 11-13px grows the worm BODY (a fatter capsule reads as more liquid
mass), grows the resting pips (the "far too small" fix), AND fattens the fringe that
bridges (a wider worm edge clears the cutoff over a wider gap). The dot size is the
single most-coupled lever: it fixes prominence AND merge-fatness together.

The cell + hit-box stay 24px (`flex: 0 0 24px` goo-dot cell + the 24px `<button>`) — the
PAINTED pip grows within the cell; the WCAG 24px hit-target + the 30px center pitch are
UNTOUCHED (a11y kept). A 13px pip inside a 24px cell still has 5.5px of clear margin —
the dots stay DISCRETE at rest (the resting neck math: two 13px dots at 30px pitch carry
mid-alpha ≪ cutoff, so they do NOT merge with each other — only the worm merges them).

### 1c. THE WEIGHT (why slower clock + more squish, NOT a new spring)

The clock IS the weight (`--spring-bouncy-duration` 0.57s baked into `--worm-t`'s
transition); the overshoot IS the bounce (the `linear()` peaks +12.6% at ~14% of the
clock). The user wants "stretch and flow more SLOWLY" → a much longer clock (the 1.3s
partial is on the right axis but reads as a fast pop SLOWED, not a HEAVY flow). The
squish cap (1.08, ≈+8%) is sub-perceptual — raising it to ~1.18-1.22 makes the
velocity-swell VISIBLE (the gel bulges as it accelerates, the inertia read). NO new
spring family (the W-GLASS-CAL fence): the `--spring-bouncy` `linear()` curve is the
physics; the CLOCK + the SQUISH-CAP are the weight knobs, both already token-exposed.

---

## 2. THE FIX — five coordinated MAGNITUDE retunes (token-value only, no re-fork)

All five are token-value / SVG-constant edits in `PagerDots.vue` (the ONE home; DeckPager
+ carousel inherit). ZERO new recipe, ZERO new spring family, ZERO primitive edit. Go FAR
(the user rejected subtle twice) — these are the AGGRESSIVE end of each register.

### FIX-1 (clock) — SLOW the flow: `--pager-worm-duration` 1.3s → **2.0s**

`PagerDots.vue` `--pager-worm-duration: 1.3s` → **`2.0s`**. The 1.3s "safe-blind" bump
was on the right axis but reads as a fast pop slowed; 2.0s is a genuinely WEIGHTY,
slow-flowing morph (the user's "stretch and flow more slowly", taken FAR). The
`--worm-t` transition + the rAF projection both read this token live (no second edit:
`useWormMorph.clockMs` reads `--pager-worm-duration`; the `travel` watch's settle-clear
timeout reads it too). Bounded sane: a deck pager at 2.0s still arrives well within a
deliberate page-advance gesture; the release-at-arrival (0.82× the clock) keeps the
squish punctuating the LAND, not dragging a tail.

### FIX-2 (spring) — KEEP `--spring-bouncy`, the weight is the clock + the squish

`--pager-worm-spring: var(--spring-bouncy)` — UNCHANGED (the W-GLASS-CAL spring fence:
`bouncy` is a shipped `SPRING_PRESETS` row, response 0.5 / ζ 0.55, overshoot +12.6%, in
the Apple 12-18% band). The "weightier flow" is the SLOWER CLOCK (FIX-1) + the BIGGER
SQUISH (FIX-5) over this same curve — NOT a new heavier `linear()` (which would mint a
6th family and red `proof:animation-coherence`'s EASING-TABLE-BOUND arm). The overshoot
the curve carries IS the bounce/rebound the user wants; on the 2.0s clock the overshoot
reads as a slow, heavy settle (the curve peaks at +12.6% at ~0.29s into a 2.0s glide,
then eases back — a luxuriant rebound, not a quick snap). RECORDED ALTERNATIVE (held): if
the live π still reads too light, the ONLY sanctioned heavier option is the SHIPPED
`useDragMorph` velocity-driven `"tanh"` register (the W-PAGER-GOO-MORPH §3a "higher-
fidelity live-SpringProgress path RESERVED for W-REFLECT"), not a new token spring.

### FIX-3 (dot size) — GROW the pip + the worm body: `--pager-dot-size` 6px → **0.8125rem (13px)**

`PagerDots.vue` `--pager-dot-size: 0.375rem` → **`0.8125rem`** (13px). This is the
single most-coupled lever (§1b): it fixes "the dot far too small" (a 13px pip reads as a
real dot, not a speck), it fattens the worm BODY (the worm width = this token, so the
capsule reads as liquid mass), AND it widens the bridging fringe (a 13px worm edge clears
the goo cutoff over a wider gap → the merge reads fatter for free). Bounded by the 24px
cell: 13px leaves 5.5px clear margin each side, so the resting dots stay DISCRETE (no
self-merge — §1b math) and the hit-box / center-pitch / a11y are byte-untouched. (12px is
the conservative floor; 14px the ceiling before the 24px cell crowds — 13px is the FAR
pick the rejected-twice mandate wants.)

### FIX-4 (elongation + goo) — FATTEN the neck: bigger elongation ref + fatter blur + lower threshold

Three coupled edits so the neck wells EARLY, reads FAT, releases LATE (§1a):

- **`--pager-dot-elongated`** `1.5rem (24px)` → **`2rem (32px)`** — the worm's max
  elongation reference grows with the bigger body so the peak span still bridges a full
  pitch+ (the worm visibly spans both dot centers at mid-travel). (This token is the
  reference reserve; the live peak is geometry-derived in `useWormMorph.paint` off the
  measured centers — the larger ref keeps the reserved footprint honest.)
- **`feGaussianBlur stdDeviation`** `4` → **`8`** (`PagerDots.vue` line 245) — the fat
  fringe. At s=8 the neck survives a 12-16px residual gap (§1a table) — the worm's
  approach + departure both carry a thick neck, the metaball read the user wants. (s=7 is
  the floor, s=9 the ceiling before the blur softens the resting pips' OWN edges into
  mush — 8 is the FAR-but-crisp pick; the dots stay round, the neck goes fat.)
- **`feColorMatrix` alpha row** `0 0 0 18 -7` → **`0 0 0 16 -5`** (`PagerDots.vue` line
  249) — the cutoff drops `7/18 ≈ 0.389` → `5/16 ≈ 0.313`. A LOWER cutoff = the fat
  blurred fringe crosses threshold sooner = a thicker, longer-reaching neck (it wells up
  while the worm is still approaching, holds across the whole crossing). The `18 -7` ratio
  also kept the dots slightly ERODED (a high cutoff shrinks the blurred disc back below
  its drawn size); `16 -5` restores the dots to full size AND fattens the neck. (Cutoff
  ~0.31-0.33 is the metaball sweet-spot; `16 -5` = 0.313, `18 -6`/`15 -5` = 0.333 are the
  conservative siblings — `16 -5` is the FAR pick.)

The filter stays STATIC (the Safari #184601 trap — NEVER animate `stdDeviation` /
`feColorMatrix`; only the opaque worm + dots move under it). `color-interpolation-
filters="sRGB"`, the `-50% -50% 200% 200%` region, the `will-change`/`contain`/`isolation`
compositor promotion, and the `@supports (filter: url())` gate + plain-worm floor are ALL
UNTOUCHED.

### FIX-5 (squish) — make the gel SWELL visible: `--pager-worm-max-stretch` 1.08 → **1.2**

`PagerDots.vue` `--pager-worm-max-stretch: 1.08` → **`1.2`** (≈+20%). The 1.08 cap is the
sub-perceptual "gel, not taffy" floor; the user wants the squish to READ. 1.2 is a
VISIBLE velocity-swell (the worm bulges along its travel axis as it accelerates, the
volume-preserving reciprocal pinch on the cross axis — the inertia/weight the law names)
while staying inside the "gel" band (NOT taffy; >1.3 would over-stretch into a string).
This rides `useLiquidFlex` UNCHANGED (the squish reads `--pager-worm-max-stretch` live via
the `maxStretch` getter — `useWormMorph.ts` line 99; ONE squish engine, no re-roll — the
W-LIQUID single-engine fence holds). The reciprocal cross-axis pinch
(`scale: stretch, 1/stretch`) is the EXISTING SegmentedTabs indicator law, axis-derived.

### The combined gestalt

A 13px warm dot (the worm rests on it as a fat capsule) STRETCHES on a 2.0s `--spring-
bouncy` glide into a 32px-span elongated worm that SWELLS +20% as it accelerates; an
s=8 / cutoff-0.31 goo neck wells up EARLY and bridges the dots it passes into ONE fat
metaball mass; the worm OVERSHOOTS +12.6% past the target and SETTLES back with slow
weight; the neck pinches off LATE as the source dot springs free. FAR more liquid +
squishy than the rejected-twice subtle pill. Every dot reads. The merge reads. The weight
reads.

---

## 3. THE GATE IMPACT — `proof:pager-goo` (the source-structure arm) stays GREEN; the π re-baselines

The W-PAGER-GOO-MORPH gate `proof:pager-goo` (P1-P6, to be authored at the wave —
NOT yet on disk at HEAD; only the worm + `PagerDots.vue` are landed) is a
SOURCE-STRUCTURE arm — it asserts SHAPE, not magnitudes, so this magnitude retune keeps
it GREEN by construction. Because the gate is authored FRESH, it must assert the TOKEN
REFERENCE / STATIC-FILTER SHAPE, never an exact magnitude literal (the design constraint
below). Per-clause:

- **P1 (no layout animation)** — UNCHANGED: the worm is still `transform: translate/scale`
  over a reserved footprint; bigger dot-size grows the reserved `width` (a one-time layout
  reserve, NOT an animated width — the P5 / motion-canon discipline holds). The
  `--pager-dot-elongated` grow is a reference token, not an animated property.
- **P2 (composes `useLiquidFlex`, no re-rolled squish)** — UNCHANGED: FIX-5 only changes
  the `--pager-worm-max-stretch` VALUE the existing `maxStretch` getter reads; no
  hand-rolled `1+tanh` / second reciprocal write is added.
- **P3 (rides `--spring-bouncy` @ its own clock)** — UNCHANGED: FIX-2 keeps
  `--pager-worm-spring: var(--spring-bouncy)`; FIX-1 changes only the `--pager-worm-
  duration` VALUE (still a per-spring clock, not `--spring-dock` / `--duration-normal`).
  The gate asserts the TOKEN reference, not the numeric — 2.0s passes.
- **P4 (opaque layer + STATIC filter + `@supports` gate)** — UNCHANGED: FIX-4 changes
  `stdDeviation` / `feColorMatrix` VALUES but the filter stays STATIC (never animated),
  the shapes stay full-alpha `currentColor`, the layer opacity stays
  `--pager-goo-layer-opacity`, the `@supports` gate + plain-worm floor stay. (When P4 is
  authored it must assert the filter SHAPE — `feGaussianBlur` + `feColorMatrix` present,
  sRGB interpolation, STATIC/never-animated, `@supports`-gated — NOT an exact
  `stdDeviation="8"` / `16 -5` magnitude; the magnitude is the design, not the gate.)
- **P5 (PRM snaps + drops goo + keeps fade)** — UNCHANGED: the recipe-local PRM block is
  untouched; bigger dots + fatter goo are all inside the `@supports`/no-PRM path.
- **P6 (landed ONCE in PagerDots; consumers inherit)** — UNCHANGED: every edit is in
  `PagerDots.vue`'s `.pager-dots` token scope + the SFC-local SVG filter; DeckPager +
  carousel inherit, no re-fork.

**`proof:pager-goo` action: when the gate is authored at the wave, P4 asserts the filter
SHAPE (feGaussianBlur+feColorMatrix present, sRGB, static, @supports-gated), NEVER an
exact `stdDeviation`/`feColorMatrix` magnitude — so the FAR magnitudes here need ZERO
gate-source coupling.** The gate is SHAPE; the magnitudes are the design.

**`proof:no-gray` (extended by the SIBLING glass-abrogate-gray triumvirate) is
UNAFFECTED** — the worm + dots paint `--pager-dot-active: var(--foreground)` (warm ink),
not a glass plate; no `--card`/glass-rung change here.

**`proof:no-layout-animation` (the library-wide reflow gate) stays GREEN** — every
animated channel is `transform`/`scale`/`opacity`/`filter` (the worm) — the bigger dot is
a static `width` reserve, the elongation a `scale`. No layout property animates.

### The BINDING π — `tests-visual/pager-goo.spec.ts` re-baselines (the close truth)

The magnitude change is a PAINT change, so the binding truth is the π frame-series
re-capture (BOTH modes, Chromium + WebKit, LIVE MOTION — never `reducedMotion` for the
morph arm), the `proof:ba-gestalt` navigation verdict, and a fresh DELTA at
`docs/tranches/BD/audit/visual/W-PAGER-GOO-MORPH-DELTA.md`. The π asserts re-baseline to
the FAR magnitudes:

- **The worm STRETCHES bigger** — the mid-flight `lenRatio` peak measured off the painted
  bounding box (the worm spans ≥ pitch+W ≈ 43px at peak with the 13px body), STRICTLY
  longer than the now-13px rest pip.
- **The neck reads FAT** — the pixel-connectivity scan finds a SOLID neck above the goo
  threshold across a WIDER gap than HEAD (the s=8 / 0.31-cutoff neck bridges 12-16px, vs
  HEAD's ~6px) — the merge is unmistakable, not a flicker.
- **The flow is SLOW** — the frame-series spans the 2.0s clock; the overshoot+settle
  position curve is non-monotonic (the +12.6% rebound) over a visibly longer glide.
- **The squish READS** — the cross-axis pinch is measurable (the worm narrows ≈ 1/1.2 ≈
  0.83× on the cross axis at peak swell).
- **PRM-instant** — the snap + goo-drop + fade-survives are byte-unchanged.
- **The `surface-hash` floor** on `PagerDots.vue` re-stamps (the magnitudes drifted; the
  ledger re-shoots its own surface — never a header retire-dodge).

---

## 4. THE EXACT EDIT LIST (for the implementer — magnitude-only, compose existing primitives)

All edits in `src/components/custom/pager-dots/PagerDots.vue` (the ONE home). ZERO
`useWormMorph.ts` edit, ZERO new token, ZERO new recipe, ZERO new spring.

| # | location | token / constant | HEAD | NEW | axis |
|---|---|---|---|---|---|
| 1 | `.pager-dots` `--pager-worm-duration` | clock | `1.3s` | **`2.0s`** | SLOW the flow (weight) |
| 2 | `.pager-dots` `--pager-worm-spring` | spring | `var(--spring-bouncy)` | **UNCHANGED** | the W-GLASS-CAL fence (weight = clock+squish) |
| 3 | `.pager-dots` `--pager-dot-size` | dot diameter | `0.375rem` (6px) | **`0.8125rem`** (13px) | BIGGER dot + fatter worm body |
| 4 | `.pager-dots` `--pager-dot-elongated` | elongation ref | `1.5rem` (24px) | **`2rem`** (32px) | bigger span reserve |
| 5 | `<feGaussianBlur>` `stdDeviation` | goo blur | `4` | **`8`** | FATTER goo fringe |
| 6 | `<feColorMatrix>` alpha row | goo threshold | `… 0 0 0 18 -7` | **`… 0 0 0 16 -5`** | LOWER cutoff → thicker neck |
| 7 | `.pager-dots` `--pager-worm-max-stretch` | squish cap | `1.08` | **`1.2`** | VISIBLE velocity swell |

**No change** to: the 24px goo-dot cell / 24px `<button>` hit-box / 30px center pitch
(a11y kept), the `--pager-goo-layer-opacity` (0.52 rail translucency), the `@supports`
gate + plain-worm floor, the PRM block, the `will-change`/`contain`/`isolation` Safari
promotion, the filter region / sRGB interpolation, `useWormMorph.ts` (the two-edge
geometry + the spring drive + the squish wiring all read the tokens live).

**FROZEN (do NOT touch — W-GLASS-CAL / motion-canon fences):**
- The `--spring-*` `linear()` curves + the `--spring-*-duration` clocks in
  `scheme-motion.css` (the worm uses its OWN `--pager-worm-duration` override, NOT the
  generated `--spring-bouncy-duration`).
- `useLiquidFlex` (the ONE squish engine — the worm reads its `--pager-worm-max-stretch`
  cap, never re-rolls).
- The `morph-bridge.css` goo trick shape (the pager filter is a SFC-local sibling — only
  its stdDev/threshold MAGNITUDES change).

---

## 5. WHY THIS IS THE GESTALT FIX, NOT A WORKAROUND

- **Magnitude-only on the EXISTING token surface.** Every edit is a `--pager-*` value or
  an SVG filter constant the worm already reads live. No new recipe, no new spring family,
  no new class, no primitive edit — the W-PAGER-GOO-MORPH machinery is correct; only the
  DIALS were set to subtle.
- **The four axes are coupled, fixed together.** Bigger dot-size fixes prominence AND
  fattens the worm body AND widens the bridging fringe; the fatter goo (stdDev + cutoff)
  fixes the neck; the slower clock + bigger squish fix the weight. ONE coordinated retune,
  not four disconnected patches.
- **The math is grounded.** The neck-bridge model (`scratchpad/worm-bridge.mjs`) shows
  s=4/cutoff-0.389 survives only a 6px gap (the subtle hop) while s=8/cutoff-0.31 survives
  12-16px (the fat metaball) — the FAR values are derived, not guessed.
- **No fence breached.** `--spring-bouncy` kept (W-GLASS-CAL), `useLiquidFlex` kept
  (W-LIQUID single-engine), the goo filter STATIC (Safari #184601), compositor-only
  (motion-canon P5 / `proof:no-layout-animation`), PRM-carved (P6), the 24px a11y hit-box
  + pitch kept, landed ONCE in PagerDots (DeckPager + carousel inherit — ≥2 consumers).
- **The gate stays honest.** `proof:pager-goo` is SHAPE (stays GREEN by construction); the
  BINDING truth is the π frame-series re-baseline (the worm reads bigger/slower/fatter on
  fresh pixels, both modes, both engines) + the `proof:ba-gestalt` navigation verdict —
  the source arm can never substitute for the paint (the cardinal-lesson split).
- **The user's law, taken FAR.** Rejected subtle TWICE → these are the AGGRESSIVE end of
  each register (2.0s, 13px, 32px, stdDev 8, cutoff 0.31, +20% squish) inside the sane
  bounds (the dots stay discrete, the neck stays a neck not mush, the squish stays gel not
  taffy, the clock stays within a deliberate page-advance). Liquid weight on every axis.

---

## APPENDIX — diagnostic scripts (reproducible)

- `scratchpad/goo-math.mjs` — the resting-dot self-merge check (13px dots at 30px pitch do
  NOT merge → the dots stay discrete; only the worm bridges them).
- `scratchpad/worm-bridge.mjs` — the worm-fringe → next-dot neck-bridge model (the §1a
  table; s=8 / cutoff-0.31 bridges a 12-16px gap, the FAR pick) + the threshold-pair
  cutoff sweep (`16 -5` = 0.313, the metaball sweet-spot).

The neck model uses the same Gaussian-edge-alpha plumbing the gooey `feGaussianBlur` +
`feColorMatrix` threshold implements, so the chosen stdDev/threshold map 1:1 to the
painted neck the π readback measures.
