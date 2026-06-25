# BUILD-REPORT-1 — viz mechanics re-spec (paper-grid · concentric · dot-matrix)

**Wave** `BD.W-VIZ-RESPEC` · **Built** 2026-06-23 · **Branch** `prototype/liquid-dock`
**Builder** prototype + live-verify · **Server** `http://localhost:5173`

Three viz MECHANICS re-specced as design transpositions (NOT bug-fixes), each verified LIVE on a
real GPU. All three render with ZERO console errors; the whole repo typechecks (0 errors); siblings
intact. The warm-cream identity holds on all three (warm-amber ink/dots/contours over cream, no gray,
no teal/navy). All edits are GPU fragment/vertex passes — compositor-only, PRM-carved, Safari-safe
(`fwidth`/`dpdx`/`dpdy` only, the SAME WGSL↔GLSL math).

---

## 0. The shared `waveField` leaf (the architectural headline)

Minted `src/composables/glass/wave/` — the shared traveling-wave CELL-WARP leaf the spec directs
(the `flow.{glsl,wgsl}.ts` precedent extended), so paper-grid + concentric share ONE math and move
together. INTERNAL (off the public glass barrel — the substrate-leaf posture).

| file | lines | what |
|---|---|---|
| `waveField.ts` | 244 | the JS evaluator — `travelingEnvelope`/`curlScalar`/`cellTwist`/`waveFlow`/`cursorSwirl`/`heightField`/`waveSwell` |
| `waveField.glsl.ts` | 97 | the GLSL string chunk (host splices `${WAVE_FIELD_GLSL}` after its noise basis + `curlFBM`) |
| `waveField.wgsl.ts` | 93 | the WGSL twin |
| `index.ts` | 18 | the internal barrel |

The binding math (the C3 cure): `cellTwist(g, cellSize, t, …)` rotates each cell **about its own
center** (`cc = (floor(g/cs)+0.5)·cs`), gated by a moving Gaussian crest (`travelingEnvelope`) and
directed by the shared `curlFBM` flow — so the box stays in place but TWISTS as the wave passes
OVER and THROUGH, never the uniform line-bow. It SPLICES the existing `curlFBM` (no re-fork of the
curl operator). `waveFlow` is the CONTINUOUS twin (no per-cell seam) the level-set contours need.

---

## 1. PAPER-GRID — cell-twist on the grid lines (C3) ✓

**Defect (before):** the whole warm sheet bowed together as a unit (a uniform `curlWarp`
displacement, `F ≈ I` → the LINES bow). See `before-paper-grid-canvas.png`.

**Fix:** retired the LINE-warp; the kernel now `g = cellTwist(uv·gridScale, …)` + `cursorSwirl`.
Each cell twists about its own center as a traveling Gaussian crest sweeps the sheet; the lines stay
locally straight inside each cell (the Golus `dv` reads the FINAL twisted coord — the crisp-line
fence survives). The JS host drives a spring-eased `amp` envelope (0→1.06 overshoot → settles to 1;
PRM snaps to 0).

Files (3 lockstep arms + uniforms + constants + JS source):
- `shaders/paper-grid.wgsl.ts` — spliced `${WAVE_FIELD_WGSL}`, replaced `curlWarp+cursorBulge` with
  `cellTwist+cursorSwirl`, added `wave`/`wave2` struct lanes.
- `shaders/paper-grid.glsl.ts` — the GLSL twin (added `uWave`/`uWave2`/`uInteractive` uniforms).
- `composables/paperGrid.ts` — `samplePaperGrid` re-aimed onto `cellTwist`/`cursorSwirl` (imported
  from the leaf); the dead `curlWarp`/`cursorBulge` exports DELETED (clean break, no alias).
- `composables/uniformBridgeWGPU.ts` — buffer 144→176B; packs `wave`/`wave2` + the `amp` arg.
- `composables/paperGridWGPUSetup.ts` + `paperGridGLSetup.ts` — `getAmp` dep threaded.
- `composables/usePaperGrid.ts` — drives the spring-eased `amp` (PRM→0) per frame.
- `constants.ts` — retired `waveScale`/`waveAmplitude`; minted `twistMax`/`shearMax`/`waveDir`/
  `waveK`/`waveOmega`/`waveSigma`.
- `index.ts` — dropped `curlWarp`/`cursorBulge` from the barrel.
- `demo/stories/substrates/paper-grid.vue` + `presets.ts` — configurator rows + presets re-pointed.

**Constants (after):** `twistMax 0.55` (≈31° at the crest), `shearMax 0.24`, `waveDir [0.92,0.39]`,
`waveK 0.42`, `waveOmega 0.7`, `waveSigma 0.85` (a BROAD sweeping front → many cells twist at once).

**LIVE verdict (`after-paper-grid-celltwist2.png`):** the lower-left→center cells visibly twist into
diamond/rhombus shapes (cells rotated about their centers); the upper-right stays square; the wave
band sweeps over time. Lines locally straight, warm-amber over cream. Console: 0 errors. **PASS.**

---

## 2. CONCENTRIC — level-set contours over the shared wave-warp (C6) ✓

**Defect (before):** rigid concentric ellipses (a radial sum-of-sines moiré). Wrong mechanism.

**Fix:** RETIRED `ringField.ts` (deleted — the radial sum-of-sines engine); minted `levelField.ts`
(110 lines). The field is now `H = heightField(waveFlow(p)) + swellAmp·waveSwell` — a LOW-octave
value-noise topography sampled at the continuous traveling-wave-warped coordinate, extracted as the
KEPT IQ gradient-free `contourInk` level-set DE (the primary path; perfect GPU AA, density tracks
1/|∇H|). The cursor bulges the topography toward the pointer (gravity).

Files:
- `composables/levelField.ts` — NEW. `sampleHeight` (the round-trip source); a value-noise matching
  the shader's `valueNoise` EXACTLY (the single-math-source — fixed the earlier double-fbm divergence).
- `composables/ringField.ts` — DELETED (clean break).
- `shaders/concentric.wgsl.ts` + `concentric.glsl.ts` — fully rewritten: spliced the noise basis +
  `${CURL_FBM_*}` + `${WAVE_FIELD_*}`; `sampleHeight` via `waveFlow`; `contourInk` PRIMARY; a warm
  height ramp (basins cool-cream, ridges warm-amber). New struct/uniform lanes
  `wave`/`wave2`/`topo`/`cursor`; the radial-ring lanes retired.
- `composables/uniformBridgeWGPU.ts` — rewritten (336→208B layout; `wave`/`wave2`/`topo`/`cursor`).
- `composables/concentricWGPUSetup.ts` + `concentricGLSetup.ts` — `getCursor`/`getAmp` deps.
- `composables/useConcentric.ts` — the center-injection retired; now derives a domain-space cursor
  (the gravity well) + drives the spring-eased `amp`.
- `constants.ts` — retired `centers`/`ringComponents`/`axisRatio`/`renderMode`/`beatDetune`/
  `MAX_RINGS`/`MAX_CENTERS`/`ConcentricRenderMode`/`renderModeToInt`; minted `cellSize`/
  `heightOctaves`/`heightSeed`/`swellAmp`/`perturbAmp`/`twistMax`/`shearMax`/`waveDir`/`waveK`/
  `waveOmega`/`waveSigma`/`cursorWell`. `interactive` default flipped `false`→`true`.
- `Concentric.vue` — docstring re-aimed (kept `pointer-events:none` on the canvas — the listeners
  bind on the wrapper, so cursor gravity works).
- `index.ts` + `src/api/types-extra.ts` — dropped `RingComponent`/`RingCenter`/`renderModeToInt`/
  `ConcentricRenderMode`; export `sampleHeight`/`LevelFieldParams`.
- `demo/stories/substrates/concentric.vue` — controls rewritten (Contours / The wave / Cursor & theme);
  blurb + label re-aimed to the topographic-contour vocabulary.

**Constants (after):** `contourLevels 13`, `lineWidth 1.8`, `cellSize 1.2`, `heightOctaves 3`,
`swellAmp 0.22`, `twistMax 0.6`, `waveSigma 0.85`, `cursorWell 0.5`, `interactive true`.

**The key debugging step (recorded):** `cellTwist` shattered the contours into a mesh (per-cell
discontinuity). Minted `waveFlow` — a CONTINUOUS divergence-free flow warp gated by the SAME
traveling envelope — so the contours flow smoothly without seams (see
`after-concentric-canvas.png` (mesh) → `after-concentric-canvas3.png`/`after-concentric-final.png`
(smooth nested loops)).

**LIVE verdict (`after-concentric-final.png`):** flowing nested level-set iso-contours in warm-amber
over cream — a topographic map (density bunches on steep ground, sparse in basins), the contours
twist/flow as the wave crosses. NOT rings. Console: 0 errors. **PASS.**

---

## 3. DOT-MATRIX — 2D-plane register + strong cursor gravity (C4) ✓

**Defect (before):** the sphere is "good" (kept), but the cursor pull was a weak `0.08` parallax +
a tight `·18` dimple; no 2D background register.

**Fix:** additive `layout: "sphere" | "plane"` axis (the sphere SURVIVES as a kept preset; the plane
is the new default for the background use), + a DEEP, WIDE cursor-gravity well replacing the tight
dimple, + a spring settle (ζ<1 overshoot) so the well LAGS the cursor and eases back with weight.

Files:
- `constants.ts` — minted `DotLayout` + `layout`/`gravityStrength`/`gravityRadius`; default
  `layout "plane"`, `interactive true`, `pointerMode "attract"`, `gravityStrength 0.62`,
  `gravityRadius 0.7`.
- `composables/uniformBridgeWGPU.ts` — `buildDotsBuffer` plane branch (a 2D sunflower phyllotaxis
  disc, z=0); `dotInstanceCount` plane-aware; buffer 240→256B; new `u6` lane
  (layout/gravityStrength/gravityRadius/planeScale).
- `shaders/dot-matrix.wgsl.ts` + `dot-matrix.glsl.ts` — vs_main branches on `isPlane`: the plane
  lays the disc wide, a deep wide Gaussian well pulls dots TOWARD the cursor (they gather/brighten/
  swell), a burst over-pull (comet-tail); the sphere path KEPT but its well re-aimed off the tight
  `·18` dimple onto the wide `gravRadius` Gaussian. New `u6` struct lane.
- `composables/useDotSphere.ts` — `uU6` GL uniform wired.
- `composables/useDotMatrix.ts` — the push/active now ease on an inline critically-under-damped
  SPRING (response 0.42, ζ 0.7) so the well lags + settles with overshoot (the liquid-weight bounce);
  the engage scalar raised (cap 0.35→1.0).
- `index.ts` — exports `DotLayout`.
- `demo/stories/substrates/dot-matrix.vue` + `presets.ts` — lead is the 2D-plane default with a
  3D-sphere toggle (`DOT_MATRIX_PRESET_SPHERE` minted; the reference + sphere presets set
  `layout:"sphere"`); blurb + label re-aimed to the 2D-field/cursor-gravity vocabulary.

**LIVE verdict:**
- 2D plane (`after-dot-matrix-plane-gravity.png`): a 2D background field of fine warm-cream dots
  fills the card.
- Cursor gravity (`after-dot-matrix-plane-hold2.png`, pointer held at 35%×45%): a bright cluster of
  dots VISIBLY GATHERS toward the cursor (deep wide well), with a sparser void around it where dots
  were pulled in — decisively "MORE gravity."
- Sphere toggle (`after-dot-matrix-sphere2.png`): the kept dot-globe renders, depth-shaded.
- Console: 0 errors. **PASS.**

---

## 4. Verification

| check | result |
|---|---|
| `npx vue-tsc --noEmit -p tsconfig.json` (error TS count) | **0** (no NEW errors) |
| `node scripts/verify-siblings-intact.mjs --quiet` | **OK** (siblings intact) |
| dangling imports to retired symbols (ringField/curlWarp/cursorBulge/renderModeToInt/RingCenter) | **none** in `src/`+`demo/` |
| console errors on all 3 live pages | **0** (shaders compile clean on the live GPU path) |
| warm-cream identity (no gray / teal / navy) | **held** — warm-amber over cream on all three (screenshots) |
| compositor-only / PRM-carved | held — GPU fragment/vertex passes off the layout path; `amp`→0 + spring snap under PRM (the `respectReducedMotion`/`reducedMotion` path) |
| a11y (AA text contrast) | unaffected — the vizzes are background fields behind the unchanged StoryPage chrome; no page-text edit |
| Safari-safe | `fwidth`/`dpdx`/`dpdy` only (no `fwidthFine`); the SAME WGSL↔GLSL math both backends |

### Screenshots (`docs/tranches/BD/viz/refine/viz-respec/`)
- `before-paper-grid-canvas.png` — the line-bow defect (before)
- `after-paper-grid-celltwist2.png` — cells twist, lines don't bow (after)
- `after-concentric-canvas.png` — the mesh mid-debug · `after-concentric-final.png` — smooth nested
  level-set contour map (after)
- `after-dot-matrix-plane-hold2.png` — the 2D field + dots gathering under the cursor gravity well
- `after-dot-matrix-sphere2.png` — the kept 3D dot-sphere register

---

## 5. Out-of-scope (booked, not blocking the live fix)

This prototype delivers the binding VISUAL mechanics + the shared leaf + the live-verify. The spec's
gate + π-spec arms are NOT landed here (they are the full wave's machine-lock job):
- `scripts/proof-wave-field.mjs` (NEW) — the JS↔GLSL↔WGSL round-trip; `proof-viz-papergrid.mjs` /
  `proof-concentric.mjs` / `proof-dot-matrix.mjs` extensions (born-RED → GREEN). NOT written.
- `tests-visual/{paper-grid,concentric,dot-matrix}.spec.ts` — the π readbacks reference the retired
  evaluators (e.g. `concentric.spec.ts:20` comment names `sampleRingField`). NOT updated.
- `docs/consumer-evidence/wave-field.md` — the ≥3-consumer booking. NOT written.
- README docstrings in the three viz dirs still describe the old mechanisms. NOT updated.

None of these affect the build (0 typecheck errors) or the live render (0 console errors); they are
the gate/test/doc follow-up the orchestrator's gate-and-reflect arm owns.
