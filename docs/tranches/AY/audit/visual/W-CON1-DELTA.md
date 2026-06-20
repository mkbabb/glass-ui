# W-CON1 — constellation resize re-fit (transpose-UP) + auto-drift wander + alpha — DELTA

<!-- surface-paths: src/components/custom/constellation/Constellation.vue, src/components/custom/constellation/constellationField.ts, src/components/custom/constellation/constellationInteraction.ts -->
<!-- surface-hash: c9338215152f171930864c5ea24256167c283c41e7984582ecb37b14f76200ac -->
<!-- RE-SHOT + RE-POINTED (BB.W-DELTA-RESHOOT, 2026-06-17; RE-SHOT AGAIN + SURFACE-PATH RE-POINT
     BC.W-DELTA-RESHOOT, 2026-06-20): the BA.W-HYGIENE RETIRE-with-rationale (removed-header retire-dodge,
     stamped f3637de6…) is REVERSED, and the surface-paths header is RE-POINTED off a BC-carved file.
     THE CARVE: at BC the Canvas2D `constellationDraw.ts` (the four `ctx`-bound draw passes) was RETIRED
     — the lattice now renders on `createGpuSubstrate` (WebGPU/WebGL2 instanced points+lines), the
     JS-side render leaf relocated to `constellationRender.ts`, and the pointer/well/warp/auto-drift
     INTERACTION machinery carved into `constellationInteraction.ts` (+ `constellationWell.ts` at
     BC.W-CARVE6). The W-CON1 captured surface is the RESIZE RE-FIT + AUTO-DRIFT WANDER behaviour
     (`refitField` in `constellationField.ts` + the wander cadence/warp in `constellationInteraction.ts`),
     NOT the retired rasterizer — so the surface MOVED (constellationDraw.ts → constellationInteraction.ts),
     it did not vanish. The surface-paths header re-points constellationDraw.ts → constellationInteraction.ts
     (Constellation.vue + constellationField.ts RESOLVE unchanged), and the surface-hash is RE-STAMPED
     against the CURRENT re-pointed bytes (BC: c9338215…). The 12 own-surface W-CON1-*-{light,dark}.png
     captures (refit / refit-before / autodrift) are RE-SHOT on the LIVE /substrates/constellation surface
     (`:5199`, Chrome-headless-new ANGLE→Metal, desktop 1280 + mobile 390, both modes, the third
     `<Constellation>` via the DEMO-PRIVATE `window.__constellationRefit` seam). The refit-coverage
     verdict (≥90% fills box) is RE-VALIDATED on current bytes — the live re-shoot reads the canvas
     filling its host on BOTH axes with the `window.__constellationRefit` seam LIVE.
     Live-verified-fresh, not retire-dodged. -->

**Wave:** AY.W-CON1 · **Status:** live-verified · **Verdict:** PASS (the recessive
`--constellation-alpha` midpoints HELD — no E3 tune needed; the π readback ratified
the shipped 0.80 / 0.88).

**RG2 RE-CAPTURE (AY.W-CON-FIX, 2026-06-09):** the four `W-CON1-*-mobile-*.png` were
1280×721 DESKTOP screenshots showing a sparse left column with no focal ring — the
DELTA-honesty defect B2-con1 F2 named. They are NOW re-captured at a REAL 390-width
viewport (the proven W-CON2 mobile protocol — the section card renders 314px wide
inside the 390px viewport), showing a FILLED box + the accent focal ring. The
fabricated "mobile 375×667" protocol line is struck (the true capture viewport is
390-width; the section card content is 314×421). The four refit-BEFORE 360×241 PNGs
are unchanged (the before-number 0.259 coverage is the real π readback; the small
lattice in a small box is a legitimate "before").

**Route:** `/substrates/constellation` (the storybook substrate scene — `resolveScene("substrates", "constellation")`).
**Surface:** the third `<Constellation>` (the "resize re-fit + auto-drift wander"
section) — exposed to the π lane via the DEMO-PRIVATE `window.__constellationRefit`
seam (`field` + a programmatic `resizeTo(w, h)` RO-driver).
**Viewports:** desktop 1280×800 + REAL mobile 390-width (section card 314×421) · **Schemes:** {light, dark}.
**Device:** Chrome-headless-new, ANGLE→Metal (the real dev-box GPU path).

The two transposed-UP behaviours (the slides bespoke `constellation.ts` re-fit +
`drift()`, which L.W-ADOPT will DELETE) now live in the glass-ui engine, so the
adoption is a behaviour-preserving swap, not a regression — the "fix at the ROOT"
precept, no longer inverted.

---

## Captured own-surface PNGs (real on-disk, ≥1024 B, `\x89PNG`)

The refit before/after pair + the auto-drift capture, per viewport × scheme:

| capture | desktop-light | desktop-dark | mobile-light | mobile-dark |
|---|---|---|---|---|
| refit BEFORE (drift-out, small lattice vs large box) | `W-CON1-refit-before-desktop-light.png` | `W-CON1-refit-before-desktop-dark.png` | `W-CON1-refit-before-mobile-light.png` | `W-CON1-refit-before-mobile-dark.png` |
| refit AFTER (filled, first post-resize frame) | `W-CON1-refit-desktop-light.png` | `W-CON1-refit-desktop-dark.png` | `W-CON1-refit-mobile-light.png` | `W-CON1-refit-mobile-dark.png` |
| auto-drift (focal re-targeted on the cadence) | `W-CON1-autodrift-desktop-light.png` | `W-CON1-autodrift-desktop-dark.png` | `W-CON1-autodrift-mobile-light.png` | `W-CON1-autodrift-mobile-dark.png` |

The own-surface set carries the `W-CON1-refit-*-light.png` AND `W-CON1-refit-*-dark.png`
pair the `proof:live-verified-ledger:ay` own-surface + {light,dark} floor requires.

---

## BEFORE / AFTER paired-π readbacks (the binding numbers)

Captured per frame off the live `__constellationRefit.field` engine state — NOT a
prose claim, NOT a grep. (`node bbox coverage = (max−min)/canvasExtent` per axis.)

### (1) REFIT-FILLS-BOX-IN-ONE-FRAME — the BLOCKER fix (numeric, the cardinal DELTA)

The field is shrunk to 360×240 and let settle (the small-canvas lattice — what a
seed-once / no-refit field would still show on the next frame), then grown to
1280×720. The bbox coverage is sampled on the VERY NEXT rendered frame.

| viewport-scheme | BEFORE covW × covH (small lattice vs 1280×720 box — the drift-out) | AFTER covW × covH (frame 1, refit applied) |
|---|---|---|
| desktop-light | 0.259 × 0.325 | **0.920 × 0.985** |
| desktop-dark  | 0.259 × 0.325 | **0.920 × 0.984** |
| mobile-light  | 0.259 × 0.325 | **0.920 × 0.982** |
| mobile-dark   | 0.259 × 0.325 | **0.920 × 0.982** |

- BEFORE (the lag the fix removes): ~26% × ~33% — well under the `< 60%` drift-out
  ceiling. A seed-once field keeps its small-canvas positions and would drift OUT at
  `speed` px/frame ("takes a while to expand out").
- AFTER (the fix): ≥ 92% on EACH axis on the FIRST post-resize frame — `refitField`
  proportionally rescaled the lattice on the size-change frame, BEFORE the first
  post-resize `stepField`. PASS (≥ 90% both axes).

### (1b) REFIT-SHEAR — the portrait→landscape transpose (RG3, AY.W-CON-FIX)

The uniform-grow arm above is INVARIANT under a uniform scale — bbox-coverage is
structurally pinned (`bbox_new/canvas_new = bbox_old/canvas_old`), so it cannot
distort and the 0.92 "after" is trivially-green for any box. The case that BINDS the
aesthetic claim is a NON-UNIFORM (sheared) refit — the actual deck slide-enter
TRANSPOSE the whole wave exists to fix. RG3 adds a shear arm to
`constellation-refit-live.spec.ts`: a portrait→landscape `resizeTo(360×720) →
resizeTo(1280×360)` drive (`sx ≠ sy` strongly), with the post-transpose coverage read
off the live engine:

| arm | sx | sy | covW (frame 1) | covH (frame 1) | verdict |
|---|---|---|---|---|---|
| portrait→landscape transpose | 3.56 | 0.50 | **92%** | **97%** | PASS (≥ 90% both axes) |

The sheared lattice STILL fills both axes ≥ 90% on the first post-transpose frame —
`refitField` rescales per-axis (`sx = w/prevW`, `sy = h/prevH`), so the wide box is
spanned on both axes even when the transpose swaps the aspect. Captured:
`W-CON-FIX-shear-transpose-desktop-light.png` (the transposed 1280×360 field). The
shear arm is the one that binds the transpose claim; the uniform-grow arm stays as the
cool-down/coverage-tautology check.

### (4) FIELD-COOLS-AFTER-REFIT — the heat-up invariant

Mean node |v| pre-resize vs ≥ 30 frames post-refit is within ±5% (the π
`speedRatio` assert passed): `refitField` scales POSITIONS only — `node.{vx,vy}`
are base-width direction vectors `k`-scaled at step time, UNTOUCHED, so the field
does not accelerate / re-settles cleanly. (CPU-oracle floor: the
`refit-conserves-velocity` unit case asserts byte-identical velocities.)

### (2) AUTO-DRIFT-CADENCE — the wander π readback (NO click)

Demo cadence `{ minIdle: 1400, jitter: 600 }` (≈1.4–2.0 s). Over a 5 s window the
focal re-targeted to a DIFFERENT node each fire, the spring chasing it (the
warp-spec's `closing-frames ≥ 5` spring-eased metric held in the gate):

| viewport-scheme | fires (≥ 2) | focalIndex trace (each a new node) |
|---|---|---|
| desktop-light | 3 | 20 → 30 → 46 |
| desktop-dark  | 3 | 20 → 30 → 46 |
| mobile-light  | 3 | 20 → 30 → 46 |
| mobile-dark   | 3 | 20 → 30 → 46 |

The auto-drift fires on the SAME warp spring (no second rAF, no second mechanic) —
the 2nd target-source of the AX.W17 "drift + warp are ONE mechanic" thesis. A
synthetic click DURING a wander pre-empts the cadence (the gate's pre-empt assert;
`warpSettled` reports NOT-arrived while a click warp is in flight).

### (3) PRM-SUPPRESSES-WANDER

Under `prefers-reduced-motion: reduce` the `focalIndex` NEVER changed over ≥ 2
cadence windows (5 s) — the cadence does not advance (the `stepField` call lives
inside the `!reducedMotion` block; the WARP precedent, NOT fire-but-freeze). PASS
(0 re-targets).

### (5) `--constellation-alpha` BOTH-MODE π readback

The live `getComputedStyle(canvas).--constellation-alpha` MATCHES the declared
per-mode token — the plumbing reaches the field:

| scheme | live `--constellation-alpha` | declared token (tokens.css) | verdict |
|---|---|---|---|
| light | **0.80** | `0.80` (`:512`) | MATCH (±0.01) |
| dark  | **0.88** | `0.88` (`:2071`) | MATCH (±0.01) |

The recessive midpoints (AX.W17) HELD over cream/ink — no E3 retune; the π readback
ratified the shipped value (the binding truth, not a hand-set number).

---

## Gate evidence

- `proof:constellation-refit-live` (the NET-NEW π gate, `scripts/proof-constellation-refit-live.mjs`
  + `tests-visual/constellation-refit-live.spec.ts`) — **PASS** (1/1 spec; all five
  assert groups green on the real device, + the RG3 SHEAR arm — the portrait→landscape
  transpose, AY.W-CON-FIX).
- `proof:constellation-field` (the CPU-oracle floor) — **PASS** (25/25 at HEAD; +6
  net-new from W-CON1: refit-fills-box, refit-conserves-velocity, refit-noop-first-layout,
  wander-arms-then-fires, wander-yields-to-click, wander-picks-different-node, +
  the default-OFF byte-identity canary).
- `npx vue-tsc --noEmit` — **EXIT 0** (clean over the whole surface).

**Verdict: PASS.** The re-fit + auto-drift behaviours are transposed UP into the
shared engine; deleting the slides bespoke copy and consuming
`@mkbabb/glass-ui/constellation` is now a behaviour-preserving swap.
