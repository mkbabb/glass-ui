# GOO-MORPH — GREENFIELD lens-b (CROSS-ENGINE / PERF-FIRST)

The goo-morph re-interrogated from first principles through the **flawless-on-WebKit +
compositor-cheap** lens. North star: a Next-click on `/navigation/carousel` and a
`deck.next()` on `/motion/deck` must read as **two masses that NECK, thin to a real
waist, and SNAP** — a decisive liquid metaball — in BOTH Chrome and Safari, BOTH modes,
at 60fps with the goo `<filter>` raster computed ONCE. Survival-of-the-fittest: keep
`useGooMorph` + the `#glass-goo` filter + the landed dark-fix; **re-invent only the one
thing that is broken — the silhouette topology.**

---

## 0. LIVE DIAGNOSIS (Chromium, light, real Next-click + rAF sampling — not trusted, reproduced)

`/navigation/carousel`, real `[aria-label="Next slide"]` click, `--goo-len-ratio` +
`--goo-t` sampled per frame:

| Datum | Measured | Read |
|---|---|---|
| filter `#glass-goo` | `stdDeviation="10"` LITERAL, `feColorMatrix … 24 -11`, `sRGB`, region `-50%/200%` | Safari-structure is **correct** (§L7 clean) — NOT the defect |
| peak `lenRatio` | **2.166 @ 124ms** | the worm DOES swell — the *number* passes |
| settle | by ~500ms; `--goo-t` lands at **2.018, then 3.009** (per-step residual ~+0.018) | the spring **never lands on the integer** — a sub-pixel creep accrues every step |
| `data-traveling` | held ON for ~1.0s+ then cleared; layer `opacity:0.55` the whole window | the bridge is visible too LONG — slow fade, not a punctuated merge |
| **the peak SHAPE (screenshot)** | a long **warm-cream TRAY**, scalloped left edge + a soft bump right | **THE DEFECT** — one fat capsule sliding, **no thin waist, no pinch** |

Deck: the JUDGE-2 rest-slab is FIXED (`opacity:0` at rest, gated on `[data-traveling]`,
warm-cream radial on worm + plate). The dark-fix (`oklch(from --card 0.68 0.05 h)` +
`saturate/brightness` companion) is landed and correct.

**So three of the four user complaints are already addressed by fix2 + the static filter:**
Safari-structure ✓, not-slow (124ms peak) ✓, no-gray ✓. **The ONE unmet bar is the
verbatim headline: "does not goo morph … MORPH BLOB and MEATBALL from one to another."**
The current silhouette is a single elongated mass — it can never neck-and-pinch because
**there is nothing for it to pinch *from*.**

### Root cause — the topology is a stretch, not a merge

`useGooMorph.paint()` projects ONE worm whose `len` peaks at `W + |B−A|` and whose
cross-axis `pinch = max(girthFloor, 1/√r)`. With `girthFloor` 0.74–0.85 the worm **stays
fat** — it spans the gap as a continuous bar. The static plates underneath are at full
alpha and the worm sits over them, so the goo threshold sees ONE big blob and yields ONE
big rounded rectangle. **A metaball waist only appears when two SEPARATE alpha masses sit
a tuned distance apart so their blur fringes overlap into a thin bridge** — the IQ
`smin` 2D analogue. The current engine deletes that gap by construction (the worm IS the
bridge). The filter is doing nothing a `border-radius` could not.

---

## 1. THE GREENFIELD CORE IDEA — the **two-bead barbell**, the goo supplies the waist

Stop painting a stretching bar. Paint **two travelling round beads** (a HEAD bead leaving
the source slot, a LEAD bead arriving at the target slot) inside the goo container, and
let the **`#glass-goo` blur→threshold filter weld the waist between them** — exactly the
mechanism the filter was built for, finally fed the input it needs. The morph is then a
genuine 2-mass metaball: at mid-travel the two beads are close → their fringes fuse into a
**thin warm-cream neck**; past mid-travel they separate → the threshold **pinches the neck
to a filament and snaps it**. This is the Gemini blob↔meatball read, and it is **pure
compositor transform** on two static elements through a **static** filter — Safari-flawless
by construction.

### 1a. The barbell geometry (replaces the single-worm `paint()`)

Two beads, each a round droplet of rest-diameter `D = girth · W` (D < W, so each bead is
SMALLER than a slide — beads, not plates). `A`,`B` are the measured slot centers, `p∈[0,1]`
the normalized progress, `D` the bead diameter:

```
gap(p)   = |B − A| · sin(π·p)        // 0 at the ends, MAX at mid-travel — the beads pull apart then back
headC(p) = lerp(A, B, easeOut(p))    // the leaving bead, slightly ahead
leadC(p) = lerp(A, B, easeIn(p))     // the arriving bead, slightly behind
// at p=0 both beads sit at A (one mass); at p=1 both at B (one mass);
// at p=0.5 they straddle the midpoint a tuned `--goo-neck-gap` apart → the waist welds
```

The **only** per-frame writes are `transform: translate(headC) scale(headStretch)` and
`translate(leadC) scale(leadStretch)` on the two bead elements — two compositor transforms,
zero layout, zero filter re-raster. The goo filter (static) does the welding. `headStretch`
/`leadStretch` are the squash-&-stretch on each bead toward the other (anticipation +
follow-through, §L4) — they elongate toward the neck at mid-travel and round out at the ends.

### 1b. Why this finally pinches (the waist math the filter needs)

The waist appears iff `gap` at mid-travel lands in the **weld band**: close enough that the
two `stdDeviation=10` fringes overlap above the `feColorMatrix` threshold, but far enough
that the overlap is a *thin* bridge, not a merged blob. That band is a function of `D`,
`gap_max`, `blur`, and the threshold slope — and it is **tunable as ONE token**
`--goo-neck-gap` (the mid-travel separation as a fraction of `D`). This is the lever the
current engine lacks entirely: there is no separation to tune. A live-π sweeps `--goo-neck-gap`
∈ {0.4D … 1.1D} until the captured waist width / bead width ≤ ~0.45 (a real waist) at p=0.5.

### 1c. The squash-&-stretch + dwell (the FEEL — §L4 cartoon register, liquid-weight)

- **Anticipation:** at travel start the lead bead **buds** out of the source bead (scale
  0→1 over the first ~12%) before separating — the mass gathers before it throws (§L4).
- **Stretch toward the neck:** each bead elongates on-axis as `gap` opens (the
  `useLiquidFlex` volume-preserving reciprocal squish, cap read off `--{prefix}-max-stretch`)
  — the necking beads are taffy, not rigid pills.
- **The DWELL is the neck held open:** the existing `--{prefix}-flow` `linear()` already
  dwells at mid (the carousel curve sits ~0.43–0.52 across 30–55%); keep it — it holds the
  waist open ~250–400ms so the pinch READS (weighty liquid, never a flicker).
- **Snap + settle overshoot:** past the dwell the lead bead arrives with the `--spring-*`
  tail overshoot (the bounce IS the land), the trailing bead pinches off and is reabsorbed.
- **Morph-MORE-on-move (velocity couple):** a fast drag → wider `gap_max` + higher stretch
  cap (the neck thins MORE and the beads throw FARther); a slow keyboard step → a gentler
  neck. Read embla `scrollProgress()` velocity / `deck` step-rate into a bounded
  `--goo-throw` multiplier (the `useLiquidFlex` `maxStretch` lever — no new spring).

### 1d. PRM (§L5 / motion-canon P6)

Under reduce: **one bead**, snapped to target center, `gap=0`, no rAF, no stretch; the goo
layer is `display:none` (a static blur+threshold is pure cost with no travel to weld). A
terminal opacity cross-fade survives. Identical to the worm's PRM discipline today.

---

## 2. THE BOLDEST MOVE — **delete the static N-plate bed; the barbell IS the metaball**

Today the carousel paints **N static full-alpha slide-plates** (12 of them, live-counted)
PLUS the worm, and dims the active plate to 0.42 to fake a 2-mass read. That whole plate
bed is the reason the goo reads as a tray: full-alpha rectangles the width of a slide,
welded to a worm, threshold to one giant rounded slab. **Kill the plate bed entirely.** The
two travelling beads ARE the two masses — they need no static bodies to neck into, because
they neck into *each other*. This is a strict simplification (N+1 elements → 2 elements,
12 transform writes/frame → 2), a strict fidelity gain (real round beads welding a thin
waist instead of slab-on-slab), and a strict Safari win (a tighter filter region around two
small beads rasters far cheaper than over a slide-width slab). The `placePlates()` /
`plateEls` / `plateIndices` machinery is **deleted**, not refactored — the no-legacy law.

The single barbell engine then serves all three consumers unchanged in shape:
- **pager worm** → the two beads collapse to bead-diameter ≈ dot-diameter; the "worm"
  becomes the head+lead dot-pip pair necking (the v4 dotflow read — arguably MORE correct
  than today's single elongating pip).
- **carousel plate** → bead diameter ~0.6·slideStep, throw = one slide pitch.
- **deck plate** → bead diameter ~0.5·viewport, throw = viewport.

ONE engine, ONE filter, three scales — and the de-dup is not just preserved, it deepens
(the static-plate fork in `CarouselContent.vue` is removed, so there is LESS bespoke
per-consumer code, not more).

---

## 3. CROSS-ENGINE (Chrome + Safari) — the §L7 arms, re-affirmed and TIGHTENED

The barbell makes Safari *easier*, not harder. Every §L7 fact already holds and the new
topology strengthens them:

| §L7 fact | Status | Barbell delta |
|---|---|---|
| static `stdDeviation`/`feColorMatrix` LITERALS (WebKit bug 283156 — per-frame re-blur) | ✓ kept | unchanged — the filter is still static; only 2 transforms animate |
| `color-interpolation-filters="sRGB"` (WebKit bug 136418 — linearRGB waist) | ✓ kept | the waist is now THE feature — sRGB correctness matters MORE; gate it |
| NO `backdrop-filter: url()` (WebKit bug 245510) | ✓ kept | the goo is `filter:` on the opaque bead layer; the dark-fix `saturate/brightness` are plain CSS funcs appended after, Safari-native |
| generous region `-50%/-50%/200%/200%` | ✓ kept | the beads travel WITHIN the slot span; region can even TIGHTEN (two small beads, not a slide-wide slab) → cheaper raster |
| non-zero 1×1 hidden host | ✓ kept | unchanged |
| `@supports not (filter: url(#x))` floor | ✓ kept | floor = a plain cross-fade of two beads (no weld) — still legible |
| PRM topology-swap | ✓ kept | one bead, snap, layer `display:none` |

**The Safari fidelity reasoning (the user keeps flagging it):** the only thing WebKit
renders *differently* from Chrome in this graph is the blur color-space (forced sRGB) and
the raster cost of the region. Both are pinned: `sRGB` is declared (forcing Chrome to match
WebKit's forced-sRGB so the waist reads identically), and the region shrinks to the
two-bead span (cheaper on WebKit's SVG rasterizer than the slide-wide slab today). There is
no `var()`-driven attribute, no `backdrop-filter:url`, no per-frame filter mutation — the
whole "broken/slow on Safari" class is structurally absent, and the barbell removes the
ONE thing that was Chrome-only-pretty (the slab-tray that hid the absence of a real waist).
**Binding proof: a PAIRED-engine π (Chromium AND a real Safari-26-on-Metal capture, the
W-GOO-SPLIT-PERF device arm) of the waist at p=0.5 — the waist must read at ≤0.45 bead-width
on BOTH.** Single-engine green is not acceptance (§L7).

### Perf — the budget reconciliation

The barbell is **strictly cheaper** than HEAD: 2 transform writes/frame vs ~13 (worm + 12
plates), a static filter over a tighter region. The `BD.W-GOO-SPLIT-PERF` p50 budget (the
real-Safari-Metal un-automatable arm) governs the *dock fission* goo, not this transition;
this transition's cost falls UNDER it by construction (fewer masses, smaller region, no
per-frame blur). No new budget gate is owed — the existing `proof:no-layout-animation` +
the paired-engine π cover it. The morph runs offscreen-paused: the rAF only fires during a
travel window (it already self-terminates at `durMs+80`); at rest there is zero cost.

---

## 4. THE SETTLE BUG — fix the integer-land creep (a real defect found live)

`--goo-t` lands at 2.018 / 3.009 — a per-step residual the rAF reads but never zeroes. The
barbell `placeStatic()` already snaps `gap=0` and the single bead to the exact center at
travel-end, which **kills the creep** (the final paint is geometry-derived from `centerOf`,
not from the residual `--goo-t`). Re-affirm: the rAF's terminal `placeStatic(to)` is the
authority; the Houdini `--goo-t` overshoot tail is cosmetic-only and must never feed the
resting transform. (Today's `placeStatic` does this; the creep is visible because the
*plates* read `--goo-t`-adjacent state — deleting the plate bed removes that surface.)

---

## 5. DEFT INTEGRATION — the UNION, what changes vs what is BYTE-UNCHANGED

**Re-invent (broken):** `useGooMorph.paint()` — replace the single-worm two-edge projection
with the two-bead barbell projection (`headC`/`leadC`/`gap`/`headStretch`/`leadStretch`).
Same signature (`morphRef` becomes `headRef`+`leadRef`, or one `morphRef` that hosts two
bead children — KISS: one `morphRef` group, two `::before`/child beads positioned by CSS
custom props the engine writes). Same `travel`/`snap`/`drive` API. Same `--{prefix}-flow`/
`-duration`/`-max-stretch` tokens. Same `useLiquidFlex` squish.

**Refine (weak):** `CarouselContent.vue` — DELETE the N static-plate bed (`plateEls`,
`plateIndices`, `placePlates`, the `v-for` plates); keep the goo layer + the single
barbell host + `markTraveling` + the embla `select`/`scroll` wiring. `restSize()` returns
the **bead** diameter now, not the slide width.

**Keep (fit, BYTE-UNCHANGED):** `#glass-goo` (`GlassGooFilter.vue`) — the static graph is
correct; only RE-TUNE the three literals (`blur`/`thresholdSlope`/`thresholdOffset`) via a
live-π so the waist welds at the new bead scale (a values change inside the existing props,
no graph re-author). The landed dark-fix (`.dark .carousel-goo-layer` warm L0.68 +
`saturate/brightness`) — unchanged, it tints whatever silhouette the layer paints. The
embla travel-gate harden — unchanged. `useLiquidFlex`, the `--spring-*` family, the
`@property --goo-t` reg, the PRM/`@supports` floors — all unchanged. `DockGooFilter.vue` +
`useDockFission` — **untouched** (a separate goo at a separate scale; this brainstorm does
not fork or merge it; the `BD.W-GOO-SPLIT-PERF` budget governs it).

**One token added (per consumer):** `--{prefix}-neck-gap` (the mid-travel bead separation
as a fraction of `D` — the waist-tuning lever the engine currently lacks). Defaults:
pager 0.7, carousel 0.8, deck 0.85 (read live; π-swept).

---

## 6. DELTA-ASSAY vs the 116 union waves + `BD.W-GOO-SPLIT-PERF`

- **`BD.W-GOO-SPLIT-PERF`** — NO conflict. That wave is the dock-fission `#dock-fission-goo`
  real-Safari-Metal p50 *budget* (a measurement, not a render). The barbell touches only the
  carousel/deck `#glass-goo` transition; the dock goo is untouched. The barbell is strictly
  cheaper than HEAD, so it cannot regress that budget. **No amendment to W-GOO-SPLIT-PERF.**
- **`BD.W-GOOBLOB-*`** (SAT-SHADE / SQUIRCLE-REFRACT) — the `<GooBlob>` art viz, separate
  substrate (WebGL membrane); untouched. NO conflict.
- **`W-GOO-CAROUSEL-DECK` + `W-GOO-MORPH-REFINE` + `W-GOO-CAROUSEL-DECK-FIX2`** (union waves)
  — the barbell is the **next iteration** of exactly these. The amendment: a new wave
  **`BD.W-GOO-BARBELL`** SUPERSEDES the single-worm topology inside `useGooMorph` (the
  engine stays, the projection is re-invented), DELETES the carousel static-plate bed, RE-TUNES
  the `#glass-goo` literals. It INHERITS fix2's dark-arm + travel-gate verbatim. It is a
  refinement-in-place of the ONE engine, not a re-fork (M4 of the research-target acceptance
  bar holds: still ONE `useGooMorph`, still three consumers).
- **`W-PAGER-GOO-MORPH`** — the pager worm becomes the bead-pair at dot scale; verify the
  windowed-dot register still reads (the active-dot elongation becomes a two-pip neck). Minor
  amendment note on that wave: the worm's single-pip elongation is replaced by the barbell at
  dot scale (a fidelity gain — the dotflow read).

**No dup wave is created.** `BD.W-GOO-BARBELL` is the single amendment that lands the
barbell across all three consumers via the one engine; it reconciles cleanly because every
prior goo wave already converges on "ONE `useGooMorph`, static `#glass-goo`, Safari-first."

---

## 7. ACCEPTANCE (the gestalt is the bar — judge a real transition, BOTH engines, BOTH modes)

- **G1 (the headline):** a real Next-click / `deck.next()` shows two warm-cream beads
  NECK into a **thin waist** (≤0.45 bead-width at p=0.5, π-measured), the neck DWELLS open
  ~250–400ms, then PINCHES to a filament and SNAPS — a decisive blob↔meatball, NOT a tray
  with wavy edges. Born-RED on the current single-worm slab (the live screenshot is the
  RED witness).
- **G2 (Safari):** the waist reads IDENTICALLY on a real Safari-26-on-Metal capture
  (sRGB-pinned, static filter, no `backdrop-filter:url`) — paired-engine π, not single-green.
- **G3 (feel):** squash-&-stretch on the beads (anticipation bud + stretch-toward-neck +
  overshoot land), morph-more-on-fast-drag, weighty dwell — `useLiquidFlex` + `--{prefix}-flow`.
- **G4 (no-gray):** warm-cream both modes, the landed dark-fix unchanged — C ≥ 0.010, H ∈ [45,85].
- **G5 (perf/PRM):** 2 transforms/frame, static filter, offscreen-paused; PRM → one bead snap,
  layer `display:none`. `proof:no-layout-animation` green.
- **G6 (de-dup):** ONE `useGooMorph`, three consumers, ZERO second goo path; the carousel
  static-plate bed is DELETED (less code, not more).

---

## CORE IDEA (one line)

Replace the single fat stretching worm with a **two-bead barbell** — two round warm-cream
droplets that travel apart then back together, and let the static `#glass-goo` blur→threshold
filter weld the **thin necking waist between them** (the IQ `smin` 2D analogue the filter was
built for), so the morph finally reads as a real blob↔meatball metaball that thins and SNAPS
at the waist — Safari-flawless because nothing about the filter changes per frame, and
strictly cheaper because the N-plate bed is deleted.

## BOLDEST MOVE

**Delete the static N-plate bed entirely** (12 elements → 2 beads in the carousel): the two
travelling beads ARE the two masses that neck into each other, so the slab-on-slab full-alpha
plate machinery — the actual reason the goo reads as a warm tray instead of a metaball — is
removed wholesale, deepening the de-dup (less bespoke per-consumer code) while finally giving
the goo filter the two-separated-mass input it needs to produce a true pinching waist.
