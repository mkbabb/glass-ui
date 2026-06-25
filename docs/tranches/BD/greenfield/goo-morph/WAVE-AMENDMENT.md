# GOO-MORPH — the WAVE-AMENDMENT (reconciled against the 116-wave union set)

> The concrete tranche amendment for the goo-morph greenfield. Reference implementation:
> [`GOLDEN.md`](./GOLDEN.md) (the barbell-with-a-concave-clip-path-neck), hardened by
> [`DELTA-ASSAY.md`](./DELTA-ASSAY.md) + `challenge/{1,2,3}.md`. KISS, DEFT, no legacy, no dual-path.

---

## SUMMARY OF MUTATIONS (cite-by-filename, no duplicative work)

| disposition | wave (file) | action |
|---|---|---|
| **NEW** | `BD.W-GOO-BARBELL-NECK.md` | author — the single amendment (engine projection re-invent + bed delete + filter retune + concave throat + cartoon-punch). |
| **SUPERSEDE** | `union/waves/W-GOO-CAROUSEL-DECK.md` | the single-plate-bed build → superseded (bed + single-worm projection deleted by BARBELL-NECK). Mark in its Disposition. |
| **SUPERSEDE (topology)** | `union/waves/W-GOO-MORPH-REFINE.md` | the girth-floor-on-the-single-worm + 7 magnitude retunes → SUPERSEDED for the barbell topology (the girth FLOOR is mooted by two real bodies). The pager BIG/SLOW magnitude asks fold into BARBELL-NECK's pager migration. |
| **INHERIT (depend)** | `union/waves/W-GOO-CAROUSEL-DECK-FIX2.md` | unchanged — BARBELL-NECK depends on it (dark-arm + travel-gate verbatim). |
| **DEPEND** | `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` (motion-spring-register siblings) | `--goo-weight` derives from `--motion-weight`; the pre-dip uses `--ease-cartoon-punch`. Honest lineage (challenge R3). |
| **UNTOUCHED (orthogonal, no conflict)** | `BD.W-FISSION-FILAMENT.md`, `BD.W-GOO-SPLIT-PERF.md`, `BD.W-DOCK-GOO-SPACING.md`, `W-DOCK-SCROLL-FISSION.md`, `BD.W-BLOB-*.md` | dock-fission goo (`#dock-fission-goo`) + the WebGL `<GooBlob>` viz are separate scales/engines. ONE optional touch: the concave `--neck-waist` throat MAY be DRYed into `BD.W-FISSION-FILAMENT`'s neck (flagged, not mandated). |
| **PRUNE** | none | no wave is deleted; the supersedes are recorded in-place (no-legacy clean break is in the build, not a wave deletion). |

No NEW wave beyond `BD.W-GOO-BARBELL-NECK` — the union reconciles to ONE amendment.

---

## NEW WAVE — `BD.W-GOO-BARBELL-NECK`

**Band: viz/refine · depends: `W-GOO-CAROUSEL-DECK-FIX2` (the dark-arm + travel-gate, inherited
verbatim) · `BD.W-MOTION-WEIGHT` (the `--motion-weight` lever `--goo-weight` derives from) ·
`BD.W-CARTOON-PUNCH` (the `--ease-cartoon-punch` raw `linear()`). Reference implementation:
`docs/tranches/BD/greenfield/goo-morph/GOLDEN.md`.**

> **STATUS: tranche-DEV PLAN doc, IMPLEMENTATION-gated.** The build re-invents the `useGooMorph`
> projection + ref contract, deletes the carousel/deck N-plate bed, retunes the `GlassGooFilter`
> defaults, adds the concave `--neck-waist` throat, and wires the cartoon-punch. It SUPERSEDES the
> single-worm topology (no legacy, no alias — clean break in the same amendment). ONE `useGooMorph`,
> three consumers (pager · carousel · deck) — a DRIVE refinement + a SILHOUETTE re-invent.

### The defect / the ask (live-verified born-RED, NOT a fake π)

The carousel/deck goo-morph paints **one wide stretching worm-PLATE over N full-height static
plates** — a single constant-cross-section rectangle, blurred + thresholded, can only fatten into a
rounded rectangle (a warm TRAY with one scalloped edge). There is NO geometry that can produce a
WAIST. **Live-captured on the real build** (`/navigation/carousel`, real Next-click,
`golden/delta-current-carousel-peak.png`): the worm peaks `scaleX 2.182 @ 135ms`, pinches UNIFORMLY
to the `0.74` girthFloor (`scaleY`), rendered 954×115 flat band — `hasLocalMinimum(crossAxisProfile)
= false` (a single convex mass; no dip between two peaks because there are not two peaks). The
layer opacity holds 0.55 across the WHOLE 1108ms window while motion settles by 556ms (the dead-slab
dwell). The user's headline ("does NOT goo morph … MORPH BLOB and MEATBALL") is a SHAPE problem.

This wave installs the BARBELL: TWO round warm-cream bodies (`D = restSize/φ`) + a SEPARATE neck
whose `clip-path` carves a smooth concave waist, welded by the static `#glass-goo` filter.

### The mechanism (GOLDEN §1–§2, with the challenge hardenings folded)

1. **`useGooMorph.paint()` RE-INVENT (an engine rewrite, honestly scoped — challenge R4/R7).** The
   ref contract changes `morphRef: Ref<HTMLElement>` → `{ bodyARef, bodyBRef, neckRef }` (three
   explicit refs — NOT `morph.children[i]` index-reaching). `paint()` writes the barbell projection
   (GOLDEN §2.1: `sep`/`bell`/`cA`/`cB`/`neckGirth`; bodies `D = restSize/φ`; neck `scaleX(gap/D)
   scaleY(neckGirth)` + the concave throat). `placeStatic`/`snap`/`drive`/the PRM early-return ALL
   re-authored to the 3-element model (coalesce to ONE resting body + zero the neck — no ghost
   throat; PRM hides bodyB+neck). KEEP: the `--goo-t` drive, the `linear()` flow transition, the
   rAF sampler, the public `travel`/`snap`/`drive` names, the `useLiquidFlex` squish, `clockMs`.
2. **The concave `--neck-waist` throat (NET-NEW — honestly, challenge R2).** A smooth concave
   `path()` (cubic Bézier sides, √φ-proportioned control points — NOT a 14-vertex polygon, which
   facets through the threshold, challenge R6). The shipped fission `--neck-filament` is an
   `inset()` capsule-thinner, NOT a hourglass — it is NOT reused for the waist. DRY option: the
   dock fission neck MAY adopt this same throat (one recipe, two consumers — flagged for
   `BD.W-FISSION-FILAMENT`, not mandated here).
3. **DELETE the N-plate bed (`CarouselContent.vue`).** Remove `plateEls`/`setPlate`/`plateIndices`/
   `placePlates`/the `v-for` plates/the `--plate-w` reserve — the tray's cause. `restSize()` returns
   the BEAD diameter `slideStep/φ`, not `step·0.82`. Render `bodyA`/`neck`/`bodyB`. KEEP the goo
   layer, the embla `select`/`scroll` wiring, the `previousScrollSnap()` travel-gate (fix2),
   `centerOf`/`slideStep`. Net-NEGATIVE LOC.
4. **The filter retune (`GlassGooFilter.vue` DEFAULTS; graph byte-unchanged).** Re-solved from the
   REAL baselines (lib default 7/20/-9; carousel mount 10/24/-11 — both live-verified) AGAINST the
   rendered post-threshold throat (challenge R1/R4): `blur ~10–13` carousel / `~8–10` deck / `~7–8`
   pager; `thresholdSlope ~15` (gooey shoulder, not the slope-24 razor); `thresholdOffset` re-solved
   for slope ~15 against the rendered rest edge. STATIC literals (Safari-safe), per-consumer props.
   **The blur is bounded so it does not FILL a thin throat** (challenge-3 R1 — measured, not asserted).
5. **The cartoon-punch FEEL (gated on `--goo-weight`, GOLDEN §2.3).** Anticipation bud (bodyB buds
   out of bodyA) + `--ease-cartoon-punch` pre-dip + stretch-toward-neck (`useLiquidFlex`) + √φ
   overshoot land + the trailing `--neck-specular-angle` conic sweep (lifted from
   `fission-bridge.css:491` — genuine reuse) + the moving-cast `::after` + the body-centre arc
   (`±D·0.06·sin(πp)`, PRM→0) + velocity-couple "morph more on fast drag." `--goo-weight` per
   consumer: carousel 1.0, pager 0.7, deck 0.4 (vestibular floor, no arc-overshoot — T13).
6. **The dwell follows the NECK, not a fixed timer.** The opacity gate fades in as `neckGirth`
   crosses ~0 and out as it returns → the bridge is visible EXACTLY while the goo deforms, gone
   ~80ms after settle (kills the live-captured dead-slab dwell). `markTraveling` re-pointed to this.
7. **Pager migration (`PagerDots.vue`).** The single worm → a true two-bead barbell (head+lead pip
   pair necking). NOTE: the pager is currently the SAME condemned single-worm — it is a THIRD
   consumer that ALSO migrates (NOT "prior-art proof" — challenge R5). A real fidelity GAIN to
   re-verify, not an assertion.
8. **Deck (`deck.vue` / `DeckPager.vue`).** Adopt the barbell at viewport scale; delete the single
   `deck-goo-plate`; `--goo-weight ≈ 0.4`.
9. **Tokens (NEW, declared once — challenge R3 honesty):** `--{prefix}-neck-gap` (pager 0.7 /
   carousel 0.78 / deck 0.85), `--neck-waist` (the concave throat depth), `--goo-weight` (per
   consumer; `= --motion-weight`, DEPENDS on `BD.W-MOTION-WEIGHT`). Bump
   `--carousel-goo-max-stretch` 1.24 → 1.32.

Compositor-only: every per-frame write is `transform`/`opacity`/`clip-path` on three children
(`proof:no-layout-animation`). Safari: the static `#glass-goo` graph is byte-unchanged; the concave
throat carries the polygon-under-filter Safari guard (clause C4 below).

### The gate — `proof:goo-barbell` (NEW, born-RED → GREEN; a REAL readback, NOT an arithmetic echo)

`scripts/proof-goo-barbell.mjs`, `tags: ["local","ci"]`. The detector comment-strips first +
exports a pure detector. **THE LOAD-BEARING PRINCIPLE (challenge R1, the cardinal anti-pattern):
the born-RED arm is a REAL rendered cross-axis alpha readback — NEVER `neckGirth·constant`
arithmetic.** The CI arm asserts the SOURCE structure (the barbell shape); the local/π arm is the
binding rendered truth.

- **C1 — the SILHOUETTE is two bodies + a neck, NOT a single plate (born-RED on HEAD).** The
  detector asserts `CarouselContent.vue` renders `bodyA`/`neck`/`bodyB` (three refs) and has NO
  `v-for` plate bed / `placePlates` / `plateIndices`. **RED on HEAD** (the `v-for="i in plateIndices"`
  plate bed + the single `wormEl` live at `CarouselContent.vue:298,305`). RED-bite: a re-introduced
  `placePlates`/`v-for` plate.
- **C2 — `useGooMorph` projects THREE transforms via an explicit ref group, ONE engine.** The
  detector asserts the `paint()` signature writes `bodyARef`/`bodyBRef`/`neckRef` (or the explicit
  3-ref group), NOT a single `morphRef.style.transform`; NO `.children[` index-reaching (the KISS
  fence, R4). The girth-FLOOR `pinch = Math.max(girthFloor, …)` is GONE (the two-body topology moots
  it). RED-bite: the single-`morphRef` `paint` restored, OR a `children[0/1/2]` index-reach.
- **C3 — the neck is a SMOOTH concave throat, NET-NEW (not the `inset()` idiom, not faceted).** The
  detector asserts the neck `clip-path` is a concave `path()`/`polygon()` with INWARD-pulling sides
  (a `--neck-waist`-parameterized concave throat), NOT `inset(...)` (the fission capsule-thinner)
  and NOT a >12-vertex hand-placed polygon (the faceting bite, R6). RED-bite: an `inset()` neck
  (the false-reuse), OR a 14-vertex polygon.
- **C4 — Safari: static filter + the polygon-under-filter guard (the §L7 fence, R5).** NO
  `backdrop-filter:\s*url\(`; `#glass-goo` `stdDeviation`/`feColorMatrix` stay LITERALS (no `var(`
  in the SVG graph); `color-interpolation-filters="sRGB"`; the `@supports not (filter:url())`
  cross-fade floor + the PRM `display:none` carve present. RED-bite: a `backdrop-filter:url()`, a
  var-driven `stdDeviation`, or a missing `@supports`/PRM floor.
- **C5 — no-gray inherited + `--goo-weight`/`--neck-gap` declared (R3).** The fix2 `.dark` warm-ink
  fill + `saturate/brightness` companion present (re-asserts `proof:no-gray`'s goo band); `--goo-weight`
  + `--neck-gap` + `--neck-waist` declared as real tokens; `--goo-weight` derives from `--motion-weight`
  (DEPEND, not a phantom). RED-bite: the dark arm reverted to `white N%`, OR a phantom `--motion-weight`
  read with no `BD.W-MOTION-WEIGHT` dep.
- **C6 — de-dup + three consumers (R5).** ONE `useGooMorph`; the carousel, deck, AND pager ALL bind
  the 3-ref barbell (no consumer keeps the single-worm); NO second goo engine. RED-bite: a consumer
  still binding the single `morphRef`.

**Self-test bites (each planted defect MUST red):** (a) the `v-for` plate bed restored → C1; (b) the
single-`morphRef` `paint` restored → C2; (c) a `children[i]` index-reach → C2; (d) an `inset()` neck
→ C3; (e) a 14-vertex polygon → C3; (f) a `backdrop-filter:url()` → C4; (g) a var-driven
`stdDeviation` → C4; (h) the dark arm → `white N%` → C5; (i) a consumer on the single worm → C6.

**What reds on HEAD (born-RED by construction):** C1 (the plate bed lives), C2 (the single-`morphRef`
`paint` lives at `useGooMorph.ts:171-221`), C3 (no concave throat exists), C6 (all three consumers
bind the single worm). GREEN only after the barbell lands across all three.

### The binding π — `tests-visual/goo-barbell.spec.ts` (the REAL readback the spike faked)

A PAIRED-engine rAF frame-series on a REAL Next-click `/navigation/carousel` AND a REAL `deck.next()`
`/motion/deck`, BOTH modes, Chromium AND **real Safari-26-on-Metal** (the `@webkit` tag), LIVE
MOTION (NEVER `reducedMotion` for the morph arm). The π RASTERIZES the goo-layer output to a canvas
(screenshot-crop + `getImageData`, or `drawImage` of the live filter output) and walks the
POST-THRESHOLD cross-axis alpha column — NEVER `neckGirth·0.34` (challenge R1, the cardinal bar):

```js
// at the neck peak (p≈0.5) AND the widest gap (p≈0.2/0.8 — the AA-drift worst case, R5):
//   bodyWidth  = max cross-axis alpha run of either body
//   waistWidth = min cross-axis alpha run of the FUSED alpha between the two body centres
//   waistRatio = waistWidth / bodyWidth
assert hasLocalMinimum(measuredCrossAxisProfile)        // a REAL dip between two peaks
assert waistRatio <= 0.45                                // a real concave waist (RENDERED, not arithmetic)
assert noStraightSegmentSteps(crossAxisProfile)          // smooth throat, not faceted (R6)
assert neckOpacity.risesThenFalls()                      // wells → pinches, not a monotone fade
assert bridgeGone within 80ms of settle                  // no dead-slab dwell
assert warmCream: C >= 0.010 && H in [45,85], both modes // never gray (fix2)
assert |webkit.waistRatio − chromium.waistRatio| <= 0.05 // PAIRED-engine, NOT single-green (R5)
```

**Born-RED proof (CAPTURED LIVE, not asserted — challenge R6, the honest born-RED):** the current
single-plate worm peak (live: `scaleX 2.182`, uniform `scaleY 0.74`, 954×115 flat band) has a
MONOTONE-convex cross-axis profile → `hasLocalMinimum = false` (RED) and `waistRatio ≈ 1.0` (the
global cross-axis min on a single convex mass = the body width itself; NOT "0.85/girthFloor" — the
golden §7 mis-stated this, corrected per challenge-1 R6). The DELTA artefact captured the RED
already: `golden/delta-current-carousel-peak.png` + the frame-series in `DELTA-ASSAY.md §0`.

**R5 transmission probe:** the π also measures the colorful field reading through the WELLING NECK
region (NOT a claim the solid body centre is transmissive — challenge-2 R3). If WebKit cannot
composite the backing field through the post-threshold alpha, the §3 read narrows to "field through
the neck + edge" (the achievable honest read).

DELTA: `docs/tranches/BD/audit/visual/W-GOO-BARBELL-NECK-DELTA.md` — the
rest→bud→stretch→neck→pinch→snap frame-series, before (the live slab, `hasLocalMinimum=false`,
waistRatio≈1.0) / after (the barbell, `hasLocalMinimum=true`, waistRatio≤0.45), the PAIRED
Chromium+Safari-Metal waist at the neck peak AND the widest gap, the PRM single-body snap, both modes.

### The gestalt row

**Union-roster surface: `goo-barbell` (the carousel + deck + pager meatball).** Verdict requirement:
a FRESH both-mode capture, a REAL Next-click/`deck.next()`, a mid-morph frame, the `@webkit` project
co-captured, surface-hash freshness floor. The gestalt judgement: two warm-cream bodies NECK into a
thin CONCAVE waist (waist/body ≤ 0.45, π-measured RENDERED), the neck DWELLS open ~250–400ms, then
PINCHES + SNAPS — a decisive blob↔meatball, NOT a tray, the colorful field glowing through the neck,
warm-cream both modes. Born-FAIL on HEAD (the live slab). GREEN at its OWN close; W-REFLECT
re-confirms on fresh pixels. Wired into the union roster by W-GESTALT-WIRE.

### Fences

- **The born-RED is a REAL rendered readback, NEVER arithmetic** (challenge R1 — the cardinal bar;
  the spike's `neckGirth·0.34` is the anti-pattern this gate must not be).
- **The concave throat is NET-NEW, named honestly** (R2 — not "reuse the `inset()` `--neck-filament`
  idiom"); DRY it to the dock OR justify it on its own rendered merit, never on a false `inset()`
  lineage.
- **`--goo-weight`/`--neck-gap`/`--neck-waist` are NEW; `--motion-weight`/`--ease-cartoon-punch` are
  real sibling deps** (R3 — no phantom-Band-0-reuse lineage).
- **Engine rewrite, not a values-only refine** (R4/R7 — `placeStatic`/`snap`/`drive`/PRM all
  re-authored; full three-consumer regression).
- **The polygon-under-filter Safari guard** (R5 — paired throat at the WIDEST gap; `inset()` fallback
  if WebKit differs >0.05); **the throat is smooth `path()`, not a faceted polygon** (R6).
- **Static `#glass-goo`, sRGB, regular `filter:url`, region, `@supports`/PRM floors** (the §L7
  contract; the graph byte-unchanged).
- **ONE `useGooMorph`, three consumers, the bed DELETED** (no second goo path; net-negative LOC).
- **NO LEGACY** — the single-worm projection + the N-plate bed + the girth-floor pinch + the
  slide-width `restSize` are DELETED in the same amendment, not aliased.

### Disposition links

- **`W-GOO-CAROUSEL-DECK`** → SUPERSEDED (the single-plate bed + single-worm projection deleted).
- **`W-GOO-CAROUSEL-DECK-FIX2`** → INHERITED verbatim (dark-arm + travel-gate; this wave depends).
- **`W-GOO-MORPH-REFINE`** → SUPERSEDED for the barbell topology (the girth FLOOR is mooted by two
  real bodies; the BIG/SLOW pager magnitude asks fold into the pager barbell migration).
- **`BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH`** → DEPENDED ON (the `--motion-weight` /
  `--ease-cartoon-punch` lineage).
- **`BD.W-FISSION-FILAMENT` / `BD.W-GOO-SPLIT-PERF` / `BD.W-DOCK-GOO-SPACING` / `BD.W-BLOB-*`** →
  ORTHOGONAL (dock-fission goo + WebGL viz, separate scales/engines). ONE optional DRY touch: the
  concave `--neck-waist` throat MAY be shared with `BD.W-FISSION-FILAMENT`'s neck (flagged).
- **The spike** (`golden/barbell-neck.html`) → DOWNGRADED from "de-risked" to "Chrome-eyeballed,
  Safari + post-blur waist UNVERIFIED" (its `measure()` is `neckGirth·0.34`, an arithmetic echo —
  the wave's π replaces it with a real rendered readback).
