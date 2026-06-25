# BD.W-VIZ-RESPEC — the three-viz MECHANICS re-spec (cell-twist · level-set · gravity)

**Tranche** BD union · **Band** viz/substrates · **Status** SPEC-AUTHORED 2026-06-23 ·
**Branch** prototype/liquid-dock · **Spec** `docs/tranches/BD/viz/refine/viz-respec/BUILD-SPEC.md`

## Headline

Three substrate vizzes have the WRONG mechanism — each paints exactly what its math specifies, and the
math specifies the wrong thing. This is a **design transposition (3×), not a bug-fix.** The user's
verbatim, decoded:

| # | route | the OVERTURN |
|---|---|---|
| C3 | `/substrates/paper-grid` | the LINES bow as a unit (a global domain warp `g=uv+h`); they must NOT wave — the CELLS must twist/morph in local boxes as a traveling wave passes OVER and THROUGH. **Re-aim: a traveling-wave-gated CELL-LOCAL twist (each box rotates/shears about its own center), the deformation GRADIENT not the displacement.** |
| C6 | `/substrates/concentric` | a radial sum-of-sines moiré (rings) — WRONG engine. It must be "essentially the PAPER GRID, but with concentric LEVEL-SET lines." **Re-aim: RETIRE `ringField.ts`; draw the iso-contours of a low-octave curl-warped fbm topography over the SAME wave-warp as paper-grid; vector-calculus level-set / gradient topology.** |
| C4 | `/substrates/dot-matrix` | a small 3D dot-SPHERE with weak (0.08) parallax. It must "persist MORE gravity to the cursor" and "function more in a 2D SPACE as a background effect." **Re-aim: add a 2D-plane register (sphere kept as a preset) + a DEEP, WIDE, WEIGHTY cursor-gravity well (dots pulled with spring inertia + overshoot).** |

The user names the shared basis THREE times — paper-grid + concentric are **ONE mechanism, two
renders**. This wave mints the shared `waveField` leaf (the `flow.{glsl,wgsl}.ts` precedent), so a tune
lands once and the two field viz move together; dot-matrix shares the `usePointerVelocityField` pointer
source. Full mechanics, exact files/lines, before/after, fences → BUILD-SPEC.

## Scope

- **Mint** `src/composables/glass/wave/waveField.{ts,glsl.ts,wgsl.ts}` + `index.ts` — the basis-agnostic
  cell-twist / traveling-wave-envelope / height-field math (splices the existing `curlFBM`, no re-fork).
  Off the public glass barrel (substrate posture). `docs/consumer-evidence/wave-field.md` (≥3 consumers).
- **paper-grid** — re-aim the warp from `curlWarp` (displacement → lines bow) to `cellTwist` (per-cell
  rotation/shear about the box center, gated by a moving wave-front, directed by the curl-flow scalar);
  `cursorBulge` → `cursorSwirl`; retire `waveScale`/`waveAmplitude`, mint the twist knobs; the Golus `dv`
  reads the FINAL twisted coord (crisp-line fence survives). Lockstep across `paper-grid.wgsl.ts` /
  `paper-grid.glsl.ts` / `paperGrid.ts` + the uniform bridges.
- **concentric** — DELETE `ringField.ts` (clean break); mint `levelField.ts` (low-octave fbm topography
  `heightField` + `heightRamp` + `waveSwell`); the KEPT `contourInk` IQ level-set is the PRIMARY render;
  splice the SAME `waveField`; `Concentric.vue` drop `pointer-events: none`; `interactive: true` default;
  cursor Gaussian well in `heightField`; retire the `renderMode`/sinusoid axis. Lockstep 3 arms.
- **dot-matrix** — additive `layout: "sphere" | "plane"` (sphere byte-preserved as a kept preset; plane
  the new background default) + a vertex branch; replace the tight repel-dimple + 0.08 parallax with a
  deep/wide attract well + a spring settle (ζ<1 overshoot) + a velocity-led comet-tail wake over the
  shared pointer field. Lockstep 3 arms.
- **Gates** — `proof:wave-field` (NEW round-trip) + extend `proof:viz-papergrid` (P4 cell-twist re-aim) /
  `proof:concentric` (level-set overturn + ringField-absent) / `proof:dot-matrix` (plane + gravity); each
  born-RED on HEAD. π specs extended (A1/B1/C1+C2), born-RED on the current defect, both modes, LOCAL.

## Fences (binding)

1. NO legacy — the line-warp + the radial-sinusoid engine OVERTURNED (no alias); the sphere SURVIVES as a
   kept preset. 2. Single-math-source — every shader edit lockstep JS↔WGSL↔GLSL, round-trip-locked. 3.
   Crisp-line / fine-dot floor — Golus `gridCoverage` + IQ `contourInk` + `fwidth` SDF UNTOUCHED; twist
   ≤ ~18°, contours LOW-octave, dot radius ≤ 0.5·pitch; `dv`/`fwidth` read the final warped coord. 4.
   Liquid-weight — inertia/overshoot/squish on every motion, host `SpringProgress`/`useLiquidFlex` clock,
   no new spring token. 5. Warm-cream identity + transparent ground + presets-in-consumers + NO teal/navy
   — MECHANICS+MOTION, not a hue. 6. Compositor-only · PRM → one static frame (square grid / finished
   contour map / rest lattice) then park · Safari-first WGSL-primary/WebGL2-fallback (SAME math) · ZERO
   Canvas2D · `fwidth`/`dpdx`/`dpdy` not `fwidthFine`.

## The REAL gate sketch — `proof:wave-field` + the born-RED π readbacks

### `scripts/proof-wave-field.mjs` (`["local","ci"]`) — the shared-leaf round-trip (device-free)

```
WF1  exists-once       waveField.{ts,glsl.ts,wgsl.ts}+index present; off the public glass barrel;
                       splices CURL_FBM_* (no re-fork of the curl operator) — born-RED (leaf absent at HEAD).
WF2  round-trip        cellTwist / travelingEnvelope / heightField evaluate JS↔WGSL↔GLSL to ≤1e-5 at a
                       fixed (p,t) sample grid (structural transcription + numeric — the single source).
WF3  ≥3-consumer       docs/consumer-evidence/wave-field.md lists paper-grid+concentric LIVE + the booked
                       <Card grid animated> breathe (the shared-chunk bar).
self-test bite         a planted divergent JS↔WGSL transcription of cellTwist REDs WF2.
```

### The π readback — born-RED on the CURRENT defect (the binding paint truth)

`tests-visual/paper-grid.spec.ts` — **A1 cells-twist-not-lines-bow** (the headline, born-RED):

```ts
// At the active substrate, sample the painted grid under the WGSL primary (navigator.gpu) AND the
// WebGL2 fallback. The decisive separation: a per-CELL corner-angle deviation (cells twist) vs a
// per-LINE straightness RMS (lines locally straight). HEAD has these SWAPPED.
test("paper-grid: CELLS twist, LINES do not bow [BD.W-VIZ-RESPEC A1]", async ({ page }) => {
  await gotoSubstrate(page, "/substrates/paper-grid");
  const m = await measureGridDeformation(page, { atWaveCrest: true });
  // CELLS twist at the crest — a real per-cell rotation (HEAD ≈ 0: cells translate rigidly → born-RED):
  expect(m.meanCellCornerAngleDevDeg).toBeGreaterThanOrEqual(6);    // visibly twisted boxes
  expect(m.meanCellCornerAngleDevDeg).toBeLessThanOrEqual(18);      // legibility floor — a lean, not a tumble
  // LINES stay locally straight through a CALM band (HEAD: lines bow → high RMS → born-RED on the SWAP):
  expect(m.calmBandLineRmsPx).toBeLessThanOrEqual(m.crispLineWidthPx);
  // crisp — 1 device-px at the captured DPR (Golus invariant survives the cell-twist):
  expect(m.minorLineWidthPx).toBeCloseTo(m.crispLineWidthPx, 1);
});
// A2 — the wave TRAVELS: a per-column twist-energy timeline shows ONE peak translating at constant c,
//      returning to square behind it (a static / global-pulse build shows no traveling peak).
// A5 — PRM: under emulateReducedMotion, ONE static SQUARE-grid frame (env≈0), parked.
```

`tests-visual/concentric.spec.ts` — **B1 level-set-not-rings** (born-RED on the perfect ellipses):

```ts
test("concentric: irregular LEVEL-SET contours, not perfect rings [BD.W-VIZ-RESPEC B1]", async ({ page }) => {
  await gotoSubstrate(page, "/substrates/concentric");
  const c = await measureContours(page);
  // NOT perfect concentric ellipses — a circularity/rigidity metric shows IRREGULAR nested loops
  // (HEAD radial-sinusoid build is rigidly circular → born-RED):
  expect(c.loopCircularityCV).toBeGreaterThanOrEqual(0.12);        // loops vary (a topography, not rings)
  // contour density tracks 1/|∇H| — bunched on steep ground (the survey-map signature):
  expect(c.densityGradientCorrelation).toBeGreaterThanOrEqual(0.3);
  // the SAME wave flows the contours: a crest region's contours measurably migrate over the cycle:
  expect(c.contourMigrationAtCrestPx).toBeGreaterThan(2);
  // cursor wired — pointer-events:none is GONE; a cursor drag bulges the topography:
  expect(await page.locator(".concentric-canvas").evaluate(el =>
    getComputedStyle(el).pointerEvents)).not.toBe("none");
});
// B6 — PRM: one static contour-map frame, parked.
```

`tests-visual/dot-matrix.spec.ts` — **C1 plane + C2 strong gravity** (born-RED on the 0.08 parallax):

```ts
test("dot-matrix: 2D-plane field + strong weighty gravity [BD.W-VIZ-RESPEC C1/C2/C3]", async ({ page }) => {
  await gotoSubstrate(page, "/substrates/dot-matrix", { layout: "plane" });
  const g = await measureDotField(page);
  // C1 — a 2D-plane background lattice (dots fill the plane), NOT a centered floating sphere:
  expect(g.planeFillFraction).toBeGreaterThanOrEqual(0.6);         // dots across the view (HEAD sphere ≈ central disc)
  // C2 — strong, WIDE gravity: a dot within gravityRadius displaces toward the cursor by ≥ a real
  //      fraction of the pitch, measurably MORE than the shipped 0.08 parallax (born-RED on HEAD):
  expect(g.nearCursorDisplacementFracPitch).toBeGreaterThanOrEqual(0.25);
  expect(g.affectedDotFraction).toBeGreaterThanOrEqual(0.2);       // WIDE falloff — many dots feel it
  // C3 — weighty settle: after the cursor stops, the well LAGS + the dots ease back with a spring
  //      overshoot (ζ<1) over a perceptible window — NOT an instant snap:
  expect(g.settleOvershoot).toBeGreaterThan(0);
  expect(g.settleFrames).toBeGreaterThanOrEqual(8);
  // C4 — fine field preserved: max dot radius ≤ 0.5·pitch (the fwidth SDF crispness untouched).
  expect(g.maxDotRadiusFracPitch).toBeLessThanOrEqual(0.5);
});
// C5 — PRM: one static lattice frame (anchors, gravity off), parked.
```

Each π is **born-RED on HEAD** — A1 fails because the lines bow and the cells are rigid (the two metrics
are swapped); B1 fails because the rings are perfect ellipses and `pointer-events: none`; C2 fails because
the 0.08 parallax + the tight `·18` dimple give a near-zero displacement at any real distance. They go
GREEN only when the mechanism is transposed. Both modes (light/dark, WGSL primary + WebGL2 fallback),
LOCAL-tagged (real GPU + demo), ride the reflect wave + the `proof:ba-gestalt` substrates-band verdict.

## Acceptance (close-gate)

- `proof:wave-field` GREEN (the shared leaf round-trips; ≥3 consumers booked).
- `proof:viz-papergrid` P4 re-aimed GREEN (cell-twist, `waveScale`/`waveAmplitude` retired) + self-test.
- `proof:concentric` level-set GREEN (`ringField.ts` DEFINITION-ABSENT, `contourInk` primary, cursor wired).
- `proof:dot-matrix` plane+gravity GREEN (sphere preset preserved; well deep/wide/weighty).
- `proof:no-layout-animation` / `proof:pointer-velocity` STAY GREEN (compositor-only; reads the shared field).
- The π readbacks (A1/A2/A5 · B1/B6 · C1/C2/C3/C4/C5) GREEN both modes; the `proof:ba-gestalt` substrates
  verdict re-earned on a FRESH capture: grid CELLS twist (lines don't bow), concentric reads as a
  TOPOGRAPHIC contour map, the dot field is a 2D background with strong cursor gravity.
- All fences hold (warm-cream identity intact, crisp-line/fine-dot floor, liquid-weight, PRM, Safari).
