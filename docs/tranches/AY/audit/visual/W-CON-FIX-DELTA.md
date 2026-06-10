# W-CON-FIX — constellation fix cluster (zero-paint SOURCE + freeze-tautology + cool-honesty + RG2/RG3) — DELTA

**Lane:** AY.W-CON-FIX · **Status:** live-verified · **Verdict:** PASS (the five fix
arms land on the SHIPPED engine + the demo + the two π specs; no engine re-design —
honesty/park/spec/positioning residues).

**Specs:** `AY.W-SB1.md §1.5.2` (the zero-paint SOURCE arm) · `AY.W-CON2.md §8`
(F8.1 cool-honesty + F8.2 const-reconcile + F8.3 freeze-tautology) · `AY.W-CON1.md §0`
(RG2 mobile re-capture + RG3 shear arm).
**Device:** Chrome-headless-new, ANGLE→Metal (the real dev-box GPU path) on the live
demo at `:5199`.

---

## (1) The ZERO-PAINT SOURCE fix — `Constellation.vue` scoped root positioning (W-SB1 §1.5.2)

**Defect (born-RED at HEAD):** the scoped root rule `.constellation { position:
relative; inline-size:100%; block-size:100% }` compiles to `.constellation[data-v-…]`
→ specificity (0,2,0), which BEATS the consumer's `.story-hero-bg { position:absolute;
inset:0 }` (0,1,0). The host stays `position:relative` in-flow against the auto-height
`.story-hero` → collapses to **h=0**; the canvas never sizes past its 300×150 default
(RA-flow-fields §4: the DEAD constellation hero, 0 px painted).

**Fix (the chosen shape — option 1, `:where()` zero-specificity root):** the
CONTAINMENT axes (`contain` / `content-visibility` / `contain-intrinsic-size`) stay on
the scoped `.constellation` class (the component owns them); the LAYOUT/SIZING axes
(`position:relative; inline-size:100%; block-size:100%`) move to a `:where(.constellation)`
rule (specificity ZERO). So ANY consumer class wins the `position` cascade — a placed
parent (`position:absolute; inset:0`) sizes the component (the FourierField sibling
contract: its scoped root is also `position:absolute; inset:0`; both substrates now
FILL a placed parent rather than dictate their own flow). When the consumer does NOT
place it, the `position:relative` fallback keeps the host the canvas's offset parent and
the `100%` extents fill a sized parent (the default-path is preserved).

**π readback (live `/compositions/hero`, computed-style + canvas + `getImageData`):**

| viewport-scheme | host `position` | host block-size | canvas backing | painted px | verdict |
|---|---|---|---|---|---|
| desktop-light | **absolute** | 849 px | **1134×849** | 10676 | PAINTS |
| desktop-dark  | **absolute** | 849 px | **1134×849** | 10800 | PAINTS |
| mobile-light (390)  | **absolute** | 1471 px | **358×1471** | 783 | PAINTS |
| mobile-dark (390)   | **absolute** | 1410 px | **358×1410** | 799 | PAINTS |

- host `position` is now `absolute` (the consumer's `.story-hero-bg` wins — was pinned
  `relative` before).
- host block-size is the FULL `.story-hero` container height (was 0).
- canvas backing is SIZED to the host (was the 300×150 default).
- `getImageData` finds painted lattice pixels (was 0).

**BITE (the born-RED witness):** re-imposing `position:relative; block-size:100%` on the
scoped `.constellation` class collapses the host to 0 again (the (0,2,0) selector
re-beats the consumer). Captures: `W-CON-FIX-hero-paint-{desktop,mobile}-{light,dark}.png`.

---

## (2) The FREEZE-GATE TAUTOLOGY fix — `lastPaintedNow` record-at-paint (F8.3)

**Defect:** `__constellationFreeze.overlayPulseRadius()` RECOMPUTED the expected
constant (`(12 + 0·24)·k`); it never observed the `now` the engine handed `drawAnomaly`.
The freeze spec read exactly this, so the frame-stillness + cross-run asserts could only
fail if `field.k` changed — they asserted NOTHING about the frozen-`now` contract. A
regression of the load-bearing D1.2 fix (`Constellation.vue:395` handing the LIVE `now`
under freeze) kept `proof:constellation-freeze-live` GREEN.

**Fix (~8 lines, demo + spec):** the `drawAnomaly` closure stamps `lastPaintedNow = now`
inside the painter (the `now` the engine actually hands it), exposed as
`__constellationFreeze.paintedNow()`. `constellation-freeze-live.spec.ts` now asserts:
`paintedNow === FROZEN_NOW (0)` on BOTH mounts, frame-STABLE across the ≥36-rAF window,
and byte-identical cross-run. The overlay-phase leg is now a REAL observation of the
frozen-`now` contract.

**BITE PROVEN (the born-RED witness, run live):** reverting the handoff
(`isStatic ? FROZEN_NOW : now` → `now`) REDs the gate —
`the overlay painter was handed now=232.90 under freeze (expected FROZEN_NOW=0)`. Source
restored after the bite-check. `proof:constellation-freeze-live` GREEN 2/2.

---

## (3) The COOL-TOLERANCE HONEST restatement (F8.1) — re-tune the window, keep ±5%

**Defect:** the gate's `COOL_TOL` was silently widened ±5%→0.06 to pass, while the π
spec's `:18` comment still said "±5%" and the unit oracle asserted `0.05` (four sources
disagreeing); the 390-mobile worst case (~13–23% at the 30-frame window) was UNGATED.

**Decision (by MEASUREMENT — option (a)):** re-tune the SAMPLE WINDOW to genuinely meet
±5% on BOTH viewports + GATE the mobile worst case, NOT widen the tolerance. Measured
live (the binding numbers):

| viewport (canvas) | rest \|v\| | held peak | perturb | cool window | cooled \|v\| | cool err | verdict |
|---|---|---|---|---|---|---|---|
| desktop (1066×~320) | 0.1600 | 0.3677 | 2.30× | 60f | 0.1600 | 0.0% | PASS (±5%) |
| mobile-390 (314×420) | 0.1600 | 0.2645 | 1.65× | 70f | 0.1643 | 2.7% | PASS (±5%) |

`COOL_TOL` restored to **0.05**, the `:18` comment synced, the desktop window widened to
60f (margin under the headless rAF cadence variance), and a NET-NEW **390-width mobile
arm** added (`page.setViewportSize({width:390})` + 70-frame window) so the narrow-canvas
cool is GATED. **Physics:** the released-node ease-back is a first-order exponential
toward `speed` at `WELL_COOL_RELEASED = 7/s`, so the frames-to-±5% scale with the perturb
PEAK — larger on the narrow canvas (smaller `k` → proportionally stronger force), hence
the longer mobile window. The spec / unit oracle / π COOL_TOL / in-file comment now tell
ONE story: ±5%. `proof:constellation-egg-live` GREEN 1/1.

**F8.2 (const-reconcile, no engine change):** the three release consts (`WELL_RELEASE_RAMP
= 22`, `WELL_COOL_HELD = 1.5`, `WELL_COOL_RELEASED = 7`) recorded as DELIBERATE non-tokens
(invariant machinery); the two `--constellation-well-ramp` comments fixed (ARM-rate only,
release is the fixed brisk WELL_RELEASE_RAMP); the `22.0` derivation added to its
doc-comment.

---

## (4) RG2 — the four W-CON1 mobile PNGs RE-CAPTURED at REAL 390-width

**Defect:** the four `W-CON1-*-mobile-*.png` were 1280×721 DESKTOP screenshots of a
sparse left ~342px column with no focal ring — the DELTA-honesty defect B2-con1 F2.

**Fix:** re-captured at a REAL 390-width viewport (the proven W-CON2 mobile protocol —
the section card renders 314px wide inside the 390px viewport), showing a FILLED box +
the accent focal ring. The fabricated "mobile 375×667" protocol line is struck in
`W-CON1-DELTA.md` (the true viewport is 390-width; the section card content is 314×421).

| PNG | OLD (fake) | NEW (honest) |
|---|---|---|
| `W-CON1-refit-mobile-light.png` | 1280×721 | **314×421** |
| `W-CON1-refit-mobile-dark.png` | 1280×721 | **314×421** |
| `W-CON1-autodrift-mobile-light.png` | 1280×721 | **314×421** |
| `W-CON1-autodrift-mobile-dark.png` | 1280×721 | **314×421** |

---

## (5) RG3 — the shear arm (portrait→landscape transpose)

**Defect:** `constellation-refit-live.spec.ts` only drove a mild near-uniform
360×240→1280×720 grow — bbox-coverage is INVARIANT under a uniform scale (structurally
pinned), so the gate could not distort and the aesthetic transpose claim was unbound.

**Fix:** a NON-UNIFORM shear arm — `resizeTo(360×720) → resizeTo(1280×360)` (sx≈3.56,
sy=0.50, a portrait→landscape transpose) — asserting the sheared lattice STILL covers
both axes ≥ 90% on the first post-transpose frame. π readback:

| arm | sx | sy | covW (frame 1) | covH (frame 1) | verdict |
|---|---|---|---|---|---|
| portrait→landscape transpose | 3.56 | 0.50 | **92%** | **97%** | PASS (≥ 90% both axes) |

Capture: `W-CON-FIX-shear-transpose-desktop-light.png` (the transposed 1280×360 field).
`proof:constellation-refit-live` GREEN 1/1.

---

## Gate evidence (all GREEN)

- `proof:constellation-freeze-live` — **PASS** (2/2; the F8.3 `paintedNow === FROZEN_NOW`
  + frame-stable + cross-run, BITE proven).
- `proof:constellation-egg-live` — **PASS** (1/1; the honest ±5% COOL_TOL on both the
  desktop 60f arm AND the NET-NEW 390-mobile 70f arm; perturb / no-slingshot / PRM /
  state-reset unchanged).
- `proof:constellation-refit-live` — **PASS** (1/1; +the RG3 shear arm).
- `proof:constellation-warp-live` — **PASS** (1/1; NOT regressed by the `:where()` root).
- `proof:constellation-field` — **PASS** (25/25; the CPU-oracle floor unchanged).
- `proof:constellation-tokens` — **PASS** (the well-ramp comment fix is a comment, not a
  token value; the numeric cohort unbroken).
- `proof:constellation-substrate-single` — **PASS**.
- `npx vue-tsc --noEmit` — **EXIT 0**.

**Verdict: PASS.** The five fix arms land on the shipped engine + the demo + the π specs;
the zero-paint hero PAINTS, the freeze tautology is closed (bite-proven), the cool
honesty is ±5% across four sources with the mobile worst case gated, and the W-CON1 RG2
mobile fakes + the RG3 shear arm are honest.
