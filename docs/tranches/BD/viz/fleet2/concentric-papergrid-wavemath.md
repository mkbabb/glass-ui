# Concentric level-set + paper-grid warp-deepening + the SHARED wave-math engine — the unified spec

**Lane** BD viz / fleet2 · **Status** SPEC 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. This doc is the binding artifact; the executing waves are
`BD.W-FIELD-ENGINE` (the shared `field/` chunk family, FIRST) → `BD.W-CONCENTRIC-LEVELSET` + `BD.W-PAPERGRID-WARP` (the two consumers).
**Synthesizes** `research/wave-math-shared.md`, `arch/shared-field-engine.md`, `research/concentric-levelset.md`, `research/papergrid-warp.md` against `VIZ-BAND-PLAN.md` D2 + the shipped substrate (`concentric/composables/ringField.ts`, `paper-grid/composables/paperGrid.ts`, `composables/glass/webgl/shaders/{flow,procedural-color}.{glsl,wgsl}.ts`).

> Read alongside `research/dot-suite-reconcile.md` (the 3-dot UNIFY into `<DotMatrix>` — a parallel consumer of the SAME engine) and `arch/gpu-substrate-unify.md` (the GPU-only spine the engine rides). This doc owns the field-engine SHAPE + its two field-viz consumers; the dot-suite doc owns the dot consumer.

---

## 0. The three findings that bind this wave-set

1. **The suite already speaks ONE wave-math vocabulary but forks it in code.** Bridson divergence-free `curlFBM` (∇⊥ψ over a value-noise potential) + Tessendorf/Gerstner sum-of-sines with deep-water dispersion `ω=√(g·k)`. The shared `flow.{glsl,wgsl}.ts` chunk factors ONLY the curl OPERATOR — the noise BASIS is forked 4-6×, the DISPERSION law twice (`RING_GRAVITY=9.81` in concentric, `FLOW_GRAVITY=9.81` in dot-flow), the WARP COMPOSITION twice. The user's "the SAME wave-based math" is the intent to make this DRY STRUCTURAL, not coincidental. **D2: mint ONE `field/` chunk family the suite consumes.**

2. **Concentric's SOURCE field is overturned; its EXTRACTION primitive survives.** The shipped concentric is perfect radial-sinusoid rings (rigid ellipses beating into moiré). The new spec: the field becomes the **level sets of an arbitrary curl-warped fbm terrain** `F(p,t)` — irregular topographic contours that drift together, breathe (stretch/shrink), and wobble per-level. The IQ `contourInk` per-pixel iso-contour extraction (already shipped, `mode:"static-contour"`) is KEPT and made the DEFAULT — it is GPU-native analytic marching-squares, no geometry buffer.

3. **Paper-grid's warp is deliberately shallow; the deepening is STRUCTURED, never cranked.** Default `waveAmplitude:0.1`/`waveScale:0.5` is "felt not loud." Deepening ≠ raising amplitude (that smears the grid into the original "blurry mess" defect). Deepening = a multi-scale composite — coarse readable bow + fine per-line perturbation + Gerstner dispersion breathe — each a NAMED separately-tunable register, legibility-floored at **cell-pitch CV < 0.15**.

The three are KIN by construction: a wave that washes the dot-matrix flows in the SAME direction the concentric contours drift and the paper-grid bows. ONE wave-math, three+ renders.

---

## 1. `BD.W-FIELD-ENGINE` — the shared `field/` chunk family (FIRST, the prerequisite)

### 1.1 Home + shape

Mint `src/composables/glass/webgl/shaders/field/` beside the existing shared chunks — each member a GLSL twin + a WGSL twin (the byte-identical-numerics discipline `procedural-color` already holds; `proof:gpu-substrate-single`'s ΔE bar measures both paths against ONE math):

```
field/
├── noise.glsl.ts  / noise.wgsl.ts   ← WAVE_BASIS — hash21 · valueNoise (quintic) · fbmPotential(p, octaves)  [NET-NEW hoist, collapses 4-6 forks]
├── wave.glsl.ts   / wave.wgsl.ts    ← GERSTNER_WAVE — WAVE_GRAVITY=9.81 · waveDispersion(k)=√(g·k) · gerstnerWave(p,t,comp)+analytic ∇  [HOIST from flowField.ts]
├── flow.glsl.ts   / flow.wgsl.ts    ← CURL_FLOW — curlFBM (Bridson ∇⊥), EXISTS; MOVE here, fold the JS twin's CURL_EPS=0.012
└── (color → re-export procedural-color)  ← EXISTS, FROZEN path (proof:blob-color-equivalence 1e-6 + the ΔE bar)
```

A fourth seam — **`DOMAIN_WARP`** — is the IQ multi-scale warp COMPOSITION (`f(p)→f(p+w(p,t))`), homed in `flow.*` beside `curlFlow` (it composes the basis + curl + the optional Gerstner breathe). It carries the named deepening registers §3.

The mechanism is the established **template-literal splice** (`${WAVE_BASIS_GLSL}` interpolated into the host `*_SRC` at module load — no `#include`, no bundler step; the emitted shader is char-identical to a hand-inline). The **splice-order law** (a WGSL fn calls only earlier-declared fns) means the host splices in dependency order `noise → flow/wave → domainWarp` ABOVE `main()`. Each layer an independent `export const` so a viz splices only what it uses (paper-grid: noise+flow; concentric: noise+flow+wave).

### 1.2 The four NAMED layers

| layer | exports | the missing-shared leaf it closes |
|---|---|---|
| **WAVE_BASIS** (`noise.*`) | `hash21` · `valueNoise` (quintic fade) · `fbmPotential(p, octaves)` (FBM_ROT `mat2(0.8,0.6,-0.6,0.8)`, lac 2.02 / gain 0.5 chunk-const, octaves param) | the 4-6× `hash21`/`valueNoise`/`fbm` fork; closes `flow`'s host-`potentialFBM` dependency |
| **CURL_FLOW** (`flow.*`) | `curlFlow(p, octaves)` = ∇⊥(fbmPotential), central-difference at `CURL_EPS=0.012` (now a chunk const, not re-declared in the JS twins) | byte-identical to today's `CURL_FBM_*`; wraps the SHARED basis instead of a host re-roll |
| **GERSTNER_WAVE** (`wave.*`) | `WAVE_GRAVITY=9.81` · `waveDispersion(k)=√(g·k)` · `gerstnerWave(p,t,comp)` (`A·sin(k·(D·p)−ωt+φ)`) + the ANALYTIC ∂h gradient | the 2× dispersion constant + the 2× sum-of-sines (`sampleRingField`, `gerstnerVelocity` reduce onto it) |
| **DOMAIN_WARP** (`flow.*`) | `domainWarp(p, t, WaveWarpParams)` — coarse advect + fine perturb + counter-flow + optional breathe (§3) | the 2× warp composition (`curlWarp` + aurora `domainWarp`) |

The JS twins (`paperGrid.ts`/`flowField.ts`/`ringField.ts` `potentialFBM`+`curlFBM`+`CURL_EPS`+`*_GRAVITY`) collapse onto ONE shared JS module `src/composables/glass/waveFieldMath.ts` the `proof:*` round-trip reads — closing the 2-4-copy JS fork. The JS twin is a TEST oracle ONLY, never a render path (the GPU-only mandate).

### 1.3 The layered pipeline every field-viz walks (the "aurora logic" the suite samples)

```
1. DOMAIN WARP   g = p + domainWarp(p, t, warpParams)        [flow: coarse curl + fine perturb + breathe]   ← SHARED scaffold
2. FIELD SAMPLE  f = hostField(g, t)                          ← the per-viz PROTAGONIST (stays local)
3. PERTURB       f += pertAmp · waveHeight(p, t, comps)       [wave]                                          ← SHARED
4. COLOR         rgb = samplePaletteRamp(stops, f) → OETF     [color]                                         ← SHARED
```

Steps 1/3/4 = the shared engine. Step 2 (`hostField`) = the ONE function that makes concentric≠paper-grid≠aurora: concentric's `baseFBM`+`contourDistance`, paper-grid's `gridCoverage`, aurora's `nucleiField`. **The fence against over-abstraction: the engine owns the SCAFFOLD, never the identity.** A viz forking the warp/wave/noise/color reds the gate; a viz keeping its own `hostField` is correct.

### 1.4 The `flow.*` disposition (no-dual-path) + the gate

**`flow.*` folds-in (Option A, the no-legacy gestalt).** Its `curlFBM` operator BECOMES the `CURL_FLOW` layer (re-named `curlFlow`, wrapping the shared `fbmPotential`); the old `CURL_FBM_*` callers re-point. Clean break, no alias. The `flow.*` JS twin's `CURL_EPS` re-declares collapse onto the shared module.

> Open decision for the wave (record, don't decide now): whether aurora keeps its Quilez `q→r` painterly double-warp as a DISTINCT `auroraWarp` (its painterly look may diverge from the grid's counter-flow — verify on capture before forcing the unify). The smooth/painterly basis split STAYS (the `gnoise`/PCG2D painterly pigment basis in `procedural-color` is KEPT distinct — AV.W2 §3a re-affirmed).

**Machine-lock — `proof:wave-field-single`** (the superset of `proof:single-color-core`): (1) ONE chunk home per layer, no parallel basis/curl/dispersion definition in ANY viz shader; (2) every viz `${…}`-splices the named layers it uses (not a re-roll); (3) the JS twin is ONE `waveFieldMath.ts` module; (4) a numeric round-trip per layer (GLSL/WGSL/JS agree within ε at a fixed sample set) + a self-test bite — a planted second `hash21`/`9.81`/`CURL_EPS` re-declaration in a viz REDS the gate. The existing `proof:viz-papergrid`/`proof:concentric`/`proof:flow-field` round-trips FOLLOW the fold (assert against the shared module). Parity table in `proof:gpu-substrate-single` gains `noise`/`wave` rows.

---

## 2. `BD.W-CONCENTRIC-LEVELSET` — irregular topographic level-sets

### 2.1 The overturn + the survivor

- **OVERTURN the SOURCE field.** No longer `Σ sin(radial)` perfect rings. `F(p,t)` is the level sets of an arbitrary curl-warped fbm terrain — irregular nested closed loops, the topographic-map look.
- **KEEP the EXTRACTION primitive.** The IQ `contourInk` per-pixel iso-contour distance — GPU-native analytic marching-squares, perfect AA, ZERO geometry. The shipped `mode:"static-contour"` already draws level sets of its envelope; the re-development generalizes the SOURCE feeding `contourInk` and makes the contour render the DEFAULT.
- **KEEP** the full-screen-triangle fragment shape-class (no vertex/storage buffer — the lightest GPU path), the single-math-source `field.ts`↔WGSL↔GLSL round-trip, the OKLCh height→hue ramp, the warm-cream identity + presets-in-consumers fence, the `createCanvasLifecycle` substrate (offscreen-pause/PRM/DPR).
- **KILL** — nothing: concentric is already born-WebGPU fragment-only, no `getContext("2d")` to delete.

### 2.2 The source field `F(p,t)` — three additive layers, all on the shared engine

```
g  = p + flowAmp · domainWarp(p, t, warpParams)       // §2.2 global flow — SHARED domainWarp (contours drift together)
F  = fbmPotential(g, octaves) + seed                   // §2.1 random terrain — SHARED WAVE_BASIS (the random curve)
   + swellAmp · Σ gerstnerWave(g, t, comp_i)           // §2.3 dispersion breathing — SHARED GERSTNER_WAVE (stretch/shrink)
fN = F·N + perturbAmp · levelJitter(round(F·N), t)     // §2.4 per-level wobble — 1D noise keyed on the contour INDEX
ink = contourInk(fN)                                   // IQ extraction — KEPT primitive
rgb = samplePaletteRamp(stops, F) → OETF               // height→hue: basins cool/cream, ridges warm/amber
```

- **§2.1 terrain** — LOW-octave / LOW-frequency `fbmPotential` so contours read as clean nested loops, NOT high-freq speckle (the "line is the point" fence). A `seed` rotates/offsets the input → a distinct random map per instance.
- **§2.2 global flow** — the WHOLE field samples at a curl-warped coordinate `g` (the IQ `F(p)→F(g(p))` substitution), so the ENTIRE contour set translates/shears/folds as ONE fluid sheet — byte-identical to paper-grid's warp mechanism, ONE shared `domainWarp`.
- **§2.3 breathing swell** — a small slow `gerstnerWave` sum raises/lowers local height → each contour inflates/deflates; out-of-phase `ω_i` → inner variation. OPTIONAL (`swellAmp:0` → pure terrain). Shares the suite `ω=√(g·k)` dispersion.
- **§2.4 per-level jitter** — offset each contour's height by a tiny per-INDEX 1D-noise so contour #3 wobbles independently of #4 — the cheap GPU per-ring life on ONE field eval (a richer variant: a level-keyed curl phase, §2.6 idea 4).

ONE fbm + ONE curl + ONE swell + ONE `contourInk` per pixel — LIGHTER than the shipped multi-center × multi-ring double loop.

### 2.3 The uniform re-shape (rings → field params)

The shipped `ConcentricUniforms` (`rings[8]`/`centers[4]`/palette) re-purposes lanes (the typed-struct `uniformBridgeWGPU.ts` source-of-truth pattern STAYS): `u0`(time/speed/aspect/fieldScale) · field(levels N/lineHalfW/AA/seed) · flow(flowAmp/warpScale/warpSpeed/warpScale2) · swell(swellAmp/perturbAmp/perturbSpeed/_pad) · centers[≤4] (optional swell origins) · palette[≤4] (UNCHANGED, the height ramp) · bg+hasBackground.

### 2.4 The dir shape (the carve idiom)

```
concentric/
  Concentric.vue              # thin props+refs+useConcentric() (~100L)
  composables/
    field.ts                  # THE single math source (replaces ringField.ts): hostField + levelJitter + contourDistance + fieldGradMag
    useConcentric.ts          # useGpuSubstrate picker + uniform pack + lifecycle
    concentric{GL,WGPU}Setup.ts · uniformBridgeWGPU.ts
  shaders/
    concentric.wgsl.ts        # WebGPU primary — splices field/{noise,flow,wave} + procedural-color
    concentric.glsl.ts        # WebGL2 fallback — same field math
  constants.ts · index.ts · README.md
```

### 2.5 The render budget + Safari

ONE fbm + ONE curl + ONE swell + ONE `contourInk` per pixel — comfortably clears the suite perf floor. Fragment-only (no compute, no storage buffer) is the MOST WebKit-safe GPU shape; `fwidth`/`dpdx`/`dpdy` only (NOT `fwidthFine` — Compatibility-Mode safe on Metal/WebKit, the shipped concentric already obeys); no `backdrop-filter:url()` (concentric paints its own pixels). WebGPU-primary / WebGL2-fallback, both the same fragment → parity `verified`.

### 2.6 The opt-in richness tier (each behind its own config flag, byte-identical at off)

1. **The living topographic map** (DEFAULT) — §2.2 above. Build first.
2. **Dispersion-breathing swell overlay** — the stretch/shrink, near-free, shares the suite dispersion.
3. **Topology-merge reveal (the figure-8)** — two drifting basins kiss + their contours MERGE into a figure-8 then a single loop. A topological event a per-ring mesh CAN NEVER do — the signature "this is a real field" moment.
4. **Per-level curl phase** — warp each contour's coord by a level-keyed curl phase so contour #3 flows on a slightly different phase than #4 (the inner variation done richer; one extra curl eval behind a cheap branch).
5. **Dual-tier contour (major/minor index rules)** — bold every M levels + faint between, two `contourInk` evals brightest-wins. DIRECTLY the paper-grid two-tier Golus pattern transposed — visually ties concentric to paper-grid.
6. **Gradient-hachure shading** — tint the between-contour fill by `|∇F|` (steep darker, flat lighter), the topographic relief register. Opt-in `fill` mode (the line-vs-fill axis).
7. **`fieldKind` axis (fbm vs sum-of-Gaussians)** — (a) curl-warped fbm (organic) vs (b) `Σ w_i·exp(−‖p−c_i‖²/2σ²)` (controlled distinct peaks → cleaner nested rings). Both feed the SAME `contourInk`.
8. **The image/SDF level-set** — feed `F` an SDF of a shape/glyph/logo → offset contours hugging the outline (depth-sonar). The EXACT mechanism the dot-matrix `target="sdf"` ask needs — concentric + dot-matrix share the SHAPE-FIELD source, not just the wave-math. **The cross-viz unifier.**
9. **Velocity-reactive ripple wake** — a pointer flick injects a transient decaying radial swell (a dropped pebble) propagating on `ω=√(g·k)`; the birthdaycolor-grade "the field is alive to you."
10. **Cartoon-shadow / depth-offset register** — draw each contour twice (ink + offset darker tone) or a `filter: drop-shadow` on the contour layer, composing `--shadow-cartoon-*`; an opt-in `cartoonShadow` axis mirroring the blob's. Decoration-only, PRM-safe.
11. **Static-contour print mode** — `motion:"static"` (speed=0) reads as a finished survey-map print. Free.

### 2.7 Rejected (recorded so a future agent does not re-open)

Marching-squares on GPU (compute→line segments→vertex draw — heavier, AAs worse, needs a buffer; the IQ per-pixel distance IS analytic marching-squares) · raymarched 3D iso-surface (massive overkill for 2D contours) · per-ring separate geometry (the OLD non-GPU-native way; CANNOT produce the topology-merge a scalar field gives free) · Canvas2D/d3-contour (BD mandate forbids; none to delete) · analytic-only rings (the thing being replaced; the radial-sinusoid SURVIVES as the optional swell §2.3).

### 2.8 Machine-lock

`proof:concentric` (rebaselined): clause 3 round-trips JS↔WGSL↔GLSL at a fixed sample set (the level-set field math, transcription-drift closed); clause 5 reds a themed literal in `constants.ts` (warm-cream identity; sea-chart/terrain palettes are demo presets). The shared wave-math via `proof:wave-field-single` (concentric splices, never re-forks). + the `proof:ba-gestalt` aurora/topographic verdict (a fresh capture — the field reads as a living contour map, not perfect rings). **Wave closes `complete_with_misses` if the contours do not read as an irregular living topographic map.**

---

## 3. `BD.W-PAPERGRID-WARP` — structured multi-scale warp deepening

### 3.1 The shipped floor we deepen above (never replace)

The default is deliberately calm: `waveAmplitude:0.1`/`waveScale:0.5`/`waveSpeed:0.15`/`bulgeStrength:0.12` — the suffusion-at-`fieldAlpha:0.12` site-wide use STAYS calm. The deepening ADDS a register ABOVE it (demo/hero use goes deep). The crisp Golus AA (`gridCoverage`, constant device-px at any DPR — the blur-kill), the IQ counter-flow `curlWarp` (Alex Harri, never visibly loops), the two-tier minor/major, the warm-cream `--foreground` ink over TRANSPARENT (page reads through; teal-on-navy REMOVED, `proof:viz-papergrid` P5) — all KEPT.

### 3.2 The deepening = the SHARED `domainWarp` named registers (NOT cranked amplitude)

The fence (Finding 3): deepening is multi-scale STRUCTURE inside Layer 4 `domainWarp`, each a NAMED uniform:

- **`advectAmplitude` / `advectScale` / `advectSpeed`** — the LOW-freq coherent bow (today's single warp). KEPT legible.
- **`perturbAmplitude` / `perturbScale`** — a HIGHER-freq LOWER-amplitude per-line curl octave ADDED on top (~3-4× the spatial frequency, counter-flowing so it never loops). THIS is what reads as "deep" — a fine living tremor over the coarse bow, ink on a sheet of water that is itself rippling.
- **`dispersionCoupling`** — a sum-of-2-Gerstner-components advection so the bow PROPAGATES as a traveling wave (short waves faster than long — real water, the literal "same wave-math" `ω=√(g·k)` brought to the grid).

`g += advect(g,t) + perturb(g,t) [+ disperse(g,t)]`. Each separately tunable. **Bar:** at the deep preset the per-line tremor RMS ≥2× the coarse-only baseline WHILE the cell-pitch CV < 0.15 (legible, not smeared). Both modes; PRM → one static frame.

### 3.3 The opt-in richness tier (each behind its own flag, byte-identical at off)

- **Directional wash front** (the user's "wave washing over naturally") — a moving-Gaussian amplitude front sweeping across the sheet (`localAmp = baseAmp + pulseAmp·exp(−(dot(g,dir)−ct)²/σ²)`), DEEP where the wash passes, calm elsewhere. Auto-fires on an interval OR a pointer fling. **Bar:** a per-column warp-energy timeline shows a single peak translating at constant `c`, returning to baseline behind it.
- **Flow-aligned anisotropic line weight** — modulate each tier's `targetWidth` by flow alignment (a line crossing the flow thickens, parallel thins — a shear-stress read, the "topological gradient map" applied to the grid; Kyprianidis structure-tensor precedent). **Bar:** crossing lines ≥1.4× coverage of parallel; off → uniform.
- **Curl-vorticity glow** — tint a faint warm glow where `|curl|` is high (the invisible flow legible THROUGH the grid; one `length(curl)` read). **Bar:** brightened regions track `|curl|` maxima (corr ≥0.7); the warm ink hue preserved (no new hue, P5 holds).
- **Depth-parallax multi-sheet** — 2-3 grid sheets at different warp depths + a pointer-coupled parallax, compositing back-to-front (volumetric read). ≤3 sheets (one fragment pass, a 3-iter loop, <0.5ms added at 1080p). Off → single sheet byte-identical.
- **Cursor as a FLUID stirring rod** — upgrade the static Gaussian `cursorBulge` to a velocity-injected STIR (`curlInject = pointerVel · exp(−d²/2r²)`) leaving a transient swirling wake decaying ~1s. Composes `usePointerVelocityField` (BB.B4 — no new sampler). **Bar:** a fling wake persists ≥0.8s; PRM → static.
- **Breathing dispersion** — a slow global amplitude breath `amp(t)=base·(1+breathDepth·sin(2π·t/period))` coupled to the dispersion clock (the suffused grid inhales over ~8-12s — the calmest deep register, the booked `flow.glsl.ts` consumer-#2 "paper-grid-breathe" finally deep). **Bar:** suffused grid warp-energy varies ±15-25% over the period while never dropping a cell below legibility; PRM → frozen mid-breath.
- **Level-set contour overlay** — render the iso-contours of the SAME `fbmPotential` the curl warps, AS faint warm lines THROUGH the grid (the grid traces the topology it flows over — literally concentric's level-set render on the grid's shared scalar). Brightest-wins union with the grid lines. The bridge to concentric.
- **Squircle-cell warp** — replace the triangle-wave cell with a superellipse (n≈4) so cells read as soft iOS-27 rounded squares (the `W-SQUIRCLE` / dock-hallmark congruence). `n=1`/off → hard grid byte-identical.

### 3.4 The robust configurator + interactivity

A GROUPED `useConfiguratorState<PaperGridConfig>` studio over the AZ.W-HIERARCHY vocabulary, `<ConfiguratorLayer>` sections: **Grid** (cellSize/majorEvery/alphas/lineWidth/cellShape) · **Warp** (advect*/perturb*/dispersionCoupling/anisoStrength/vorticityGlow) · **Wash & breath** (wash*/breathDepth/breathPeriod) · **Depth** (layers/parallaxStrength) · **Pointer** (bulgeMode repel/attract/STIR, bulge*/stirDecay) · **Contour** (contourOverlay/contourLevels) · **Identity** (lineColor warm-default / background transparent-default / fieldAlpha / respectReducedMotion).

Keyboard: arrows nudge a virtual wind biasing the curl advection · `space` fires a wash pulse · `+`/`−` live `advectAmplitude` · `c` toggle contour overlay. Discrete keyboard toggles stay available under PRM (the gesture confirms, the continuous physics off — W-MOTION-CANON P6). PRESETS-in-consumers: a `suffusion` preset (calm, deep off) + a `deep-demo` preset (all on) live in `demo/stories/substrates/presets.ts`, NEVER a library token.

### 3.5 Machine-lock

`proof:viz-papergrid` (extended): the legibility-CV<0.15 deep-preset bar, the per-line-tremor ≥2× RMS, each opt-in register's own falsifiable bar (above), the warm-identity/no-new-hue fence (P5), the shared wave-math via `proof:wave-field-single` (paper-grid splices noise+flow+domainWarp, never re-forks), the round-trip following the fold. + the `proof:ba-gestalt` substrate verdict (deep-but-legible, both modes).

---

## 4. The binding fences (across all three waves)

1. **Legibility floor.** Deep ≠ smeared. Every deep register carries a falsifiable bar (cell-pitch CV<0.15 / contours-read-as-clean-loops). The original "blurry mess" / "perfect rigid rings" defects must never recur. The suffusion default stays calm.
2. **ONE math source, N consumers.** The `field/` chunk family is the DRY win; `proof:wave-field-single` round-trips JS↔GLSL↔WGSL; aurora/paper-grid/concentric/dot-matrix/dot-flow CONSUME, never re-fork. Basis numerics stay byte-identical to today's `paperGrid.ts` so parity holds across the migration.
3. **No new buffer.** Every idea is fullscreen-fragment math (concentric's contour, paper-grid's 3-sheet loop — all one fragment pass). The two field-viz stay the LIGHTEST GPU path; no compute/storage/vertex buffer added.
4. **Safari-first / GPU-only.** WGSL primary + WebGL2 fallback, SAME math, ΔE ≤2.0/p99≤5.0. `fwidth`/`dpdx`/`dpdy` only (not `fwidthFine`); no `backdrop-filter:url()`; ZERO Canvas2D (neither viz has a 2D path — keep it).
5. **Warm-identity + presets-in-consumers.** Deep registers OPT-IN; the warm `--foreground` ink + transparent ground stay default; teal-on-navy/sea-chart/terrain are DEMO presets, never a library token.
6. **Compositor-only + PRM.** All warp/contour is per-fragment (no layout); PRM → one static frame then park. The deepening adds richness to the PAINT, never a layout cost.
7. **The smooth/painterly basis split is KEPT.** `field/noise` is the smooth atmospheric basis; `procedural-color`'s `gnoise`/PCG2D stays the painterly pigment basis (AV.W2 §3a re-affirmed). The `hostField` stays local per viz (the over-abstraction fence).

---

## 5. Sequencing + cross-viz coordination

**Sequence:** `BD.W-FIELD-ENGINE` (the `field/` chunk family + `proof:wave-field-single`) FIRST — mirroring how `flow.glsl.ts` was minted before its consumers. THEN `BD.W-CONCENTRIC-LEVELSET` + `BD.W-PAPERGRID-WARP` (parallel consumers) + the dot-suite `W-DOT-UNIFY`/`W-DOT-IMAGE` (the SAME engine). aurora + dot-flow fold their local copies onto the engine in lockstep.

**Cross-viz binds:** concentric §2.6-8 + dot-matrix `target="sdf"` share the SHAPE-FIELD source (`sceneDistG`/SDF) — coordinate the single-source fence with `research/blob.md`. paper-grid §3.3 contour-overlay IS concentric's level-set render on the shared scalar — the two viz are KIN. A tune to the shared `domainWarp`/`WAVE_GRAVITY`/lacunarity re-resolves the WHOLE suite. The `flow.*` fold-in is the W-PRUNE-CONSOLIDATE no-dual-path cleanup (clean break, no alias) — the JS twins collapse onto `waveFieldMath.ts`.
