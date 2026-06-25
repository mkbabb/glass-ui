# Paper-grid — BD research + brainstorm (WARP + PERTURBATION deepening + the SHARED wave-math primitive)

**Lane** BD viz-research / paper-grid · **Status** AUTHORED 2026-06-22 · **Branch** prototype/liquid-dock ·
**Substrate-grounded** against `src/components/custom/paper-grid/**` + `src/composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts` + the concentric/dot-flow-field math at HEAD ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. Return: a 4-6 line summary; this doc is the binding artifact.

> Read alongside: the BC paper-grid research `docs/tranches/BC/research/viz/paper-grid.md` (the birth doc — Golus AA + IQ warp + Bridson curl) · the shipped `paper-grid/composables/paperGrid.ts` (the ONE math source) · `concentric/composables/ringField.ts` + `dot-flow-field/composables/flowField.ts` (the two siblings that ALSO carry the wave-math, in THREE copies) · `ORCHESTRATOR-NOTES.md` (the BD edicts: ZERO Canvas2D, WebGPU/WebGL2-only, Safari-first, KISS+DRY).

---

## 0. TL;DR — the two findings that drive everything

**Finding 1 (the architectural opportunity).** The user keeps citing "the SAME wave-based math" for grid + concentric + dot-matrix. The substrate ALREADY agrees with that intent at the math level but VIOLATES it at the code level: paper-grid (`potentialFBM`+`curlFBM`), concentric (`sampleRingField` over `ellipsoidalRadius`, `RING_GRAVITY=9.81`, `ω=√(g·k)`), and dot-flow-field (`gerstnerVelocity` + `curlFBM`, `FLOW_GRAVITY=9.81`, the SAME dispersion) all speak the SAME two-part vocabulary — a **Gerstner/Tessendorf sum-of-sines dispersion law `ω=√(g·k)`** + a **Bridson divergence-free `curlFBM` over a value-noise potential**. But they carry it as **THREE independent copies** of `potentialFBM`/`valueNoise`/`curlFBM` (one in each viz) plus two copies of the `√(g·k)` dispersion (`RING_GRAVITY`, `FLOW_GRAVITY`). The shared `flow.{glsl,wgsl}.ts` chunk only factors the **curl OPERATOR** (basis-agnostic), not the **basis** or the **dispersion**. The BD mandate is to mint the ONE shared **wave-field primitive** the three CONSUME (the AV.W2 `procedural-color` precedent applied to FLOW/WAVE), so a perturbation tuning lands ONCE and the three move together — exactly "the same wave-based math."

**Finding 2 (the warp is deliberately SHALLOW — that is the deepening surface).** paper-grid's default `waveAmplitude: 0.1`, `waveScale: 0.5` (LOW freq), single-octave-ish curl warp is tuned "felt, not loud" — a clearly-readable grid that bows. The user now wants to **DEEPEN** the warp/perturbation. The deepening is NOT "crank `waveAmplitude`" (that smears the grid into noise and kills legibility — the original "blurry mess" defect). It is a **structured multi-scale deepening**: a coarse coherent advection (the readable bow) + a finer per-line perturbation layer + an optional flow-aligned anisotropy + a depth/parallax illusion — each a NAMED, separately-tunable register so "deep" reads as RICH-but-legible, never smeared.

---

## 1. The shipped paper-grid, read precisely (the substrate we deepen)

| Axis | What ships at HEAD | Source |
|---|---|---|
| **Crisp line** | Ben Golus screen-space-derivative AA grid (`gridCoverage`) — constant N device-px at any DPR/zoom; the blur-kill | `paperGrid.ts:gridCoverage`, both shaders |
| **Liquid warp** | IQ domain warp `g += curlWarp(g,t)` — TWO counter-flowing curl terms (Alex Harri counter-flow, never visibly loops) over the Bridson `curlFBM` | `paperGrid.ts:curlWarp` |
| **Curl basis** | 3-octave quintic-faded value-noise `potentialFBM` (FBM_ROT `mat2(0.8,0.6,-0.6,0.8)`) → `curlFBM` central-difference 2D curl | `paperGrid.ts:potentialFBM/curlFBM` |
| **Pointer bulge** | LOCAL Gaussian repel/attract `cursorBulge` | `paperGrid.ts:cursorBulge` |
| **Two tiers** | minor rule + bolder major every `majorEvery` cells, brightest-wins `max` | both shaders `fs_main` |
| **Substrate** | WGSL primary + WebGL2 GLSL fallback over `useGpuSubstrate`; fullscreen-triangle, NO vertex/compute/storage buffer (the LIGHTEST viz) | `paper-grid.wgsl.ts`, `paper-grid.glsl.ts` |
| **Identity** | warm-cream `--foreground` ink over TRANSPARENT (page reads through); teal-on-navy REMOVED (`proof:viz-papergrid` P5) | `constants.ts:WARM_IDENTITY_INK` |
| **Config** | `PaperGridConfig` (cellSize/majorEvery/alphas/lineWidth/waveAmplitude/waveScale/waveSpeed/fieldAlpha/bulge*/interactive/PRM) | `constants.ts` |

The default is deliberately calm: `waveAmplitude: 0.1`, `waveScale: 0.5`, `waveSpeed: 0.15`, `bulgeStrength: 0.12`. **This is the calm floor the deepening must ADD a register above, never replace** (the suffusion-at-`fieldAlpha:0.12` site-wide use stays calm; the demo/hero use goes deep).

---

## 2. The SHARED wave-math primitive — the DRY mandate, made concrete (the headline of this doc)

### 2.1 What the three viz REALLY share today (the latent DRY)

| Primitive | paper-grid | concentric | dot-flow-field |
|---|---|---|---|
| Value-noise basis `valueNoise`/`hash21` | ✅ own copy | ❌ (sinusoid field) | ✅ own copy |
| `potentialFBM` (3-oct, FBM_ROT 0.8/0.6) | ✅ own copy | ❌ | ✅ own copy |
| `curlFBM` (Bridson 2D curl) | ✅ via splice + own JS copy | ❌ | ✅ via splice + own JS copy |
| `ω=√(g·k)` dispersion, `g=9.81` | ❌ (no dispersion yet) | ✅ `RING_GRAVITY` | ✅ `FLOW_GRAVITY` |
| Sum-of-sines crest math | ❌ | ✅ `sampleRingField` | ✅ `gerstnerVelocity` |

Two latent shared facts: **(A)** the value-noise `potentialFBM`→`curlFBM` stack is duplicated 3× (paper-grid, dot-flow, + the GLSL/WGSL splices); **(B)** the `√(g·k)` Tessendorf dispersion is duplicated 2× (concentric, dot-flow) with two different constant names for the SAME `9.81`. The user's "same wave-based math" is the intent to MAKE this DRY explicit.

### 2.2 The proposed ONE primitive: `composables/glass/wave/waveField.ts` (+ `.glsl.ts`/`.wgsl.ts` chunks)

Mint a single shared **wave-field** leaf — the AV.W2 `procedural-color` + the BB.B1 `flow.glsl.ts` precedent applied to the FULL wave vocabulary (not just the curl operator). It owns:

1. **`WAVE_GRAVITY = 9.81`** + **`dispersion(k) = sqrt(WAVE_GRAVITY * k)`** — the ONE Tessendorf deep-water law (`RING_GRAVITY`/`FLOW_GRAVITY` collapse onto it, clean break).
2. **`valueNoise`/`hash21`/`potentialFBM`** — the ONE value-noise basis (the 3 copies collapse; concentric GAINS it for a perturbation term it does not have today).
3. **`curlFBM`** — already factored as the OPERATOR; the BASIS now lives beside it so a host need not redefine `potentialFBM` (the splice-order law relaxes — the chunk ships basis+operator together, the host can still override `potentialFBM` for a custom basis).
4. **`gerstnerSum(p, t, components)` / `gerstnerGrad`** — the analytic sum-of-sines height + ∇⊥ (dot-flow's `gerstnerVelocity`, concentric's `sampleRingField` both reduce to it).
5. **`warpPerturb(p, t, params)`** — THE shared deepenable warp: a multi-scale composite (coarse curl advection + fine perturbation + dispersion-coupled phase), the SINGLE knob-set the three drive.

**The DRY win:** a perturbation/warp tuning (the user's "deepen") is edited ONCE in `waveField.ts` + its two shader twins; paper-grid (warp the UV), concentric (perturb each level-set radius), dot-matrix (advect the dot field) all re-resolve. The round-trip gate (`proof:wave-field` JS↔GLSL↔WGSL) locks the three-way numeric identity.

**The fence (KISS, not over-abstraction):** the primitive owns the BASIS-AGNOSTIC math (noise, dispersion, curl, gerstner, the warp composite). Each viz keeps its OWN field-EXTRACTION (paper-grid's `gridCoverage`, concentric's isoline `de`, dot-matrix's tessellation stamp) — the warp is shared, the RENDER is per-viz. This is the IQ "domain warp is the substitution `f(p)→f(g(p))`; `g` is shared, `f` is the viz."

### 2.3 The migration ladder (consume-and-collapse, no big-bang)

1. Mint `waveField.{ts,glsl.ts,wgsl.ts}` with the union vocabulary (numerically byte-identical to today's `paperGrid.ts` basis so paper-grid's parity holds).
2. paper-grid: re-point `potentialFBM`/`curlFBM`/`curlWarp` onto the shared leaf (the warp composite moves IN); delete the local copies.
3. concentric: GAIN the `warpPerturb` term on its ring radii (the user's "perturb with the SAME wave-based math as the grid lines"); collapse `RING_GRAVITY` onto `WAVE_GRAVITY`.
4. dot-matrix/dot-flow: re-point onto the shared `gerstnerSum`+`curlFBM`; collapse `FLOW_GRAVITY`.
5. The `flow.{glsl,wgsl}.ts` chunk's curl operator stays (re-exported FROM `waveField` for back-compat-free continuity, or folded in).

---

## 3. The brainstorm — 10 ideas to DEEPEN the warp/perturbation (each with a SOTA anchor + a falsifiable bar)

> Every idea is COMPOSITOR-class GPU fragment math (fullscreen-triangle, no new buffer), Safari-first (WGSL primary + WebGL2 fallback, the SAME math), PRM-carved (the warp freezes to one static frame), and warm-identity-default (deep registers OPT-IN; suffusion stays calm).

### Idea 1 — The two-band warp split (coarse ADVECTION + fine PERTURBATION) ★ the headline deepening
The single deepening that gives "rich but legible." Today the warp is ONE curl term scaled by `waveAmplitude`. Split it:
- **`advectAmplitude`** — the LOW-freq coherent bow (today's `waveScale: 0.5`), the whole-sheet liquid flow. KEPT calm-ish so cells stay readable.
- **`perturbAmplitude` + `perturbScale`** — a HIGHER-freq, LOWER-amplitude per-region wobble layer ADDED on top (a second curl octave at ~3-4× the spatial frequency). This is what reads as "deep" — the lines acquire a fine living tremor over the coarse bow, like ink on a sheet of water that is itself rippling.
- The two compose `g += advect(g,t) + perturb(g,t)`. Each separately tunable.
**SOTA anchor:** IQ multi-scale domain warp (`g(p)=p+h1(p)+h2(f·p)`, iquilezles.org/articles/warp) — the layered-octave warp is the canonical "deep" warp. **Bar:** at the deep preset the per-line tremor amplitude (measured as RMS line-position deviation over a 2s window) is ≥2× the coarse-only baseline WHILE the cell-pitch CV (coefficient of variation of inter-line spacing) stays <0.15 (legible — not smeared). Both modes.

### Idea 2 — Dispersion-coupled phase (the wave RIPPLES, not just drifts)
Couple the warp to the shared `ω=√(g·k)` dispersion so the bow PROPAGATES as a traveling wave, not a static-shape drift. Add a sum-of-2-Gerstner-components advection term: `g += Σ gerstnerDir_i · A_i · sin(k_i·(g·dir_i) − ω_i·t + φ_i)` with `ω_i = dispersion(k_i)`. Short waves travel faster than long (real water) — the grid gets a genuine ripple-propagation read.
**SOTA anchor:** Tessendorf deep-water dispersion (already in concentric/dot-flow — this brings it to the grid, satisfying "same wave-math"). **Bar:** a horizontal scanline FFT over time shows ≥2 distinct propagating frequency components with the correct `ω∝√k` ratio (short faster); a single-drift baseline shows none.

### Idea 3 — "A wave washing over naturally" — the directional pulse front
The user's dot-matrix mandate ("a wave washing over naturally") generalizes to the grid as a deepening register: a soft GAUSSIAN-envelope amplitude front that sweeps across the sheet (`localAmp = baseAmp + pulseAmp·exp(−(dot(g,dir)−ct)²/σ²)`), so the warp is momentarily DEEP where the wash passes and calm elsewhere — a wave of liquidity travels across the grid. Auto-fires on an interval OR on a pointer fling.
**SOTA anchor:** the "wash" is a moving-Gaussian amplitude modulation (the cursor-bulge `exp(−d²/2r²)` lifted to a moving LINE front). **Bar:** a per-column warp-energy timeline shows a single localized peak translating left→right at constant `c` (the wash), returning to baseline behind it; both modes; PRM → static.

### Idea 4 — Flow-aligned anisotropic line weight (the lines THICKEN along the flow)
Deepen by making the grid RESPOND to the flow direction, not just bow: modulate each tier's `targetWidth` by the local flow magnitude/alignment — a line nearly parallel to the curl flow thins; a line crossing it thickens (a shear-stress read). `targetWidth *= 1 + anisoStrength·|dot(lineNormal, flowDir)|·|flow|`. The grid reads like a stress field, the "topological gradient map" the user cites for concentric, applied to the grid.
**SOTA anchor:** anisotropic line rendering / structure-tensor-aligned stroke weight (Kyprianidis, the aurora kuwahara tensor precedent). **Bar:** lines crossing the flow are measurably bolder (≥1.4× coverage) than flow-parallel lines at the same DPR; off → uniform.

### Idea 5 — Curl-vorticity glow (the warp REVEALS where the field swirls)
A near-free deepening: the `curlFBM` field already carries vorticity (the magnitude of the local rotation). Tint a faint warm glow into the cells where `|curl|` is high — the most-swirling regions softly brighten, so the invisible flow field becomes legible THROUGH the grid (the grid as a flow visualizer). One extra `length(curl)` read, mapped to a low-alpha additive term.
**SOTA anchor:** vorticity confinement / curl-magnitude flow viz (Bridson §confinement). **Bar:** the brightened regions track the analytic `|curl|` maxima frame-to-frame (correlation ≥0.7); the warm-identity ink hue is preserved (no new hue — `proof:viz-papergrid` P5 holds).

### Idea 6 — Depth-parallax multi-sheet (a 3-layer grid at different warp depths)
Render TWO-OR-THREE grid sheets at slightly different warp amplitudes + a small parallax offset coupled to the pointer, compositing back-to-front at decreasing alpha. The sheet reads as VOLUMETRIC — a stack of warping grids with depth, the lines nearest the viewer warping most. A genuinely "deep" read for a flat fragment.
**SOTA anchor:** parallax layered backgrounds / multi-plane (the dot-matrix dot-SPHERE depth-shade precedent). **Bar:** pointer move produces differential layer translation (near layer moves >far layer); ≤3 sheets so the fill cost stays one fragment pass with a 3-iteration loop (budget: <0.5ms added at 1080p on the dev GPU). Off → single sheet (byte-identical).

### Idea 7 — Cursor as a FLUID stirring rod (velocity-injected curl)
Upgrade the static Gaussian `cursorBulge` to a velocity-reactive STIR: the pointer injects momentum into the curl field along its motion vector (`curlInject = pointerVel · exp(−d²/2r²)`), so dragging the cursor leaves a transient swirling wake in the grid that decays over ~1s — the birthdaycolor.com-grade "stir the liquid" interactivity. Composes `usePointerVelocityField` (already in the suite, BB.B4) — NO new pointer sampler.
**SOTA anchor:** velocity-advected dye / stable-fluids splat (Stam) reduced to a procedural decaying-impulse (no real solve — a budgeted impulse-response approximation). **Bar:** a pointer fling produces a visible swirling wake that persists ≥0.8s and decays smoothly to baseline; PRM → static (no wake); composes the shared field.

### Idea 8 — Breathing dispersion (the whole sheet inhales/exhales on the wave clock)
The calmest deep register for site-wide suffusion: a slow global amplitude breath `amp(t) = base·(1 + breathDepth·sin(2π·t/period))` coupled to the dispersion clock, so the suffused grid gently inhales over ~8-12s — "a blob/cloud washing over naturally" at the calmest end. This is the booked `flow.glsl.ts` consumer #2 "paper-grid-breathe" MADE deep + made the suffusion default's living quality.
**SOTA anchor:** the aurora `breathing` MOTION_FIELDS register (BA.W-STAGE) — the calmest-non-dead drift. **Bar:** the suffused grid (`fieldAlpha: 0.12`) shows a perceptible-but-calm amplitude oscillation (global warp-energy varies ±15-25% over the period) while never dropping a cell below legibility; both modes; PRM → frozen mid-breath.

### Idea 9 — Level-set CONTOUR overlay mode (the bridge to concentric — "topological gradient map")
The user describes concentric as "the level-set lines of a topological gradient map" and wants the grid to share that math. Add an OPT-IN `contourOverlay` register to the grid: render the iso-contours of the `potentialFBM` potential (the SAME scalar the curl warps) AS faint warm lines THROUGH the grid, so the grid and its own warp-field's level-sets co-exist — the grid visibly traces the topology it is flowing over. This is literally concentric's level-set render, on the grid's shared scalar field. Brightest-wins union with the grid lines.
**SOTA anchor:** marching-squares / fragment iso-contour (`fract(N·ψ)` banded smoothstep — the concentric isoline `de` reused). **Bar:** the contour lines track the `potentialFBM` level-sets (they are the SAME field the warp uses); off by default; on → a measurable second line family at the potential's iso-levels.

### Idea 10 — Squircle-cell warp (iOS-27 superellipse cells, the dock-hallmark congruence)
A deepening that ties to the BD dock-hallmark/squircle theme: replace the `1−|fract(g)·2−1|` triangle-wave cell with a SUPERELLIPSE (squircle, n≈4) distance, so the warped cells read as soft iOS-27 rounded squares rather than hard crosses. Subtle, but it lifts the whole grid into the liquid-glass corner-language (`W-SQUIRCLE`/`--radius-concentric` congruence in the SEED).
**SOTA anchor:** superellipse / squircle SDF (the iOS continuous-corner law, the BD `W-SQUIRCLE` wave). **Bar:** the cell intersections read as rounded-square nodes not sharp crosses at a measurable corner radius; `n=1` (or off) reproduces the hard grid byte-identical (the no-op floor).

---

## 4. The robust CONFIGURATOR (the studio the deepening needs)

Today `PaperGridConfig` exposes a flat 18-field bag. The deepening demands a GROUPED studio (`useConfiguratorState<PaperGridConfig>` over the AZ.W-HIERARCHY hierarchy vocabulary), with `<ConfiguratorLayer>` sections:

- **Grid** — `cellSize` · `majorEvery` · `minorAlpha`/`majorAlpha` · `lineWidth` · `cellShape` (triangle/squircle, Idea 10).
- **Warp (the deepening cluster)** — `advectAmplitude`/`advectScale`/`advectSpeed` (coarse bow) · `perturbAmplitude`/`perturbScale` (fine tremor, Idea 1) · `dispersionCoupling` (Idea 2) · `anisoStrength` (Idea 4) · `vorticityGlow` (Idea 5).
- **Wash & breath** — `washEnabled`/`washSpeed`/`washWidth` (Idea 3) · `breathDepth`/`breathPeriod` (Idea 8).
- **Depth** — `layers` (1-3, Idea 6) · `parallaxStrength`.
- **Pointer** — `bulgeMode` (repel/attract/STIR, Idea 7) · `bulgeStrength`/`bulgeRadius` · `stirDecay`.
- **Contour** — `contourOverlay`/`contourLevels` (Idea 9).
- **Identity** — `lineColor` (warm default) · `background` (transparent default) · `fieldAlpha` (the global subtlety) · `respectReducedMotion`.

PRESETS-in-consumers: a `suffusion` preset (calm, `fieldAlpha:0.12`, deep registers off) + a `deep-demo` preset (all deepening on) live in `demo/stories/substrates/presets.ts`, NEVER a library token. The studio is born with the configurator hierarchy — the same chassis aurora/blob studios compose.

---

## 5. Mouse/keyboard INTERACTIVITY (the birthdaycolor-grade surface)

- **Pointer (the headline):** the STIR rod (Idea 7) over `usePointerVelocityField` — drag injects a decaying swirl. Repel/attract stays the calm fallback. Hover → the wash front (Idea 3) optionally chases the cursor.
- **Keyboard:** arrow keys nudge a virtual "wind direction" that biases the curl advection (the whole sheet leans into the wind); space → fire a wash pulse (Idea 3); `+`/`−` → live `advectAmplitude` (deepen/calm on the fly); `c` → toggle contour overlay (Idea 9). Each keyboard action is an accessible, discrete, PRM-respecting control.
- **The accessibility floor:** every interactive register is OFF under `prefers-reduced-motion` for the CONTINUOUS terms (one static frame), but discrete keyboard toggles (contour/wind) stay available — the gesture confirms, the physics off (the W-MOTION-CANON P6 split).

---

## 6. The fences (binding — the deepening must not break these)

1. **Legibility floor.** Deep ≠ smeared. Every deep register has a CV-of-cell-pitch bar (<0.15) — the original "blurry mess" defect must never recur. The suffusion default stays calm.
2. **ONE math source, three consumers.** The shared `waveField` primitive is the DRY win; `proof:wave-field` round-trips JS↔GLSL↔WGSL; the three viz CONSUME, never re-fork. The basis numerics stay byte-identical to today's `paperGrid.ts` so parity holds across the migration.
3. **No new buffer.** Every idea is fullscreen-fragment math (Ideas 6's 3-sheet loop, 9's contour, all stay one fragment pass) — paper-grid stays the LIGHTEST viz; no compute/storage/vertex buffer added.
4. **Safari-first.** WGSL primary + WebGL2 fallback, SAME math, parity ΔE ≤2.0/p99≤5.0. ZERO Canvas2D (the BD mandate — paper-grid already has no 2D path; keep it).
5. **Warm-identity + presets-in-consumers.** Deep registers are OPT-IN; the warm `--foreground` ink + transparent ground stay the default; teal-on-navy stays REMOVED (P5); no new hue token from a deep register (Idea 5's glow reuses the ink hue).
6. **Compositor-only + PRM.** All warp is per-fragment (no layout); PRM → one static frame then park (the leaf gate). The deepening adds richness to the PAINT, never a layout cost.

---

## 7. Recommended cut (the falsifiable shortlist for the BD wave)

The minimal high-value deepening that satisfies "deepen the warp + same wave-math + robust configurator/interactivity," in priority order:
1. **The shared `waveField` primitive** (§2) — the DRY headline; collapses the 3 copies, enables every other idea to land once.
2. **Idea 1 (two-band advect+perturb)** — the core "deep but legible" warp.
3. **Idea 2 (dispersion-coupled ripple)** — brings the literal "same wave-math" (`ω=√(g·k)`) to the grid.
4. **Idea 7 (cursor STIR)** — the birthdaycolor-grade interactivity, over the existing `usePointerVelocityField`.
5. **Idea 8 (breathing dispersion)** — the calm suffusion default's living quality (the booked `flow.glsl.ts` consumer-#2 "paper-grid-breathe" finally deep).
6. **The grouped configurator** (§4) + the keyboard surface (§5).
Ideas 3/4/5/6/9/10 are the OPT-IN richness tier — each lands behind its own config flag, byte-identical at the off/default.

Wave naming suggestion: `BD.W-PAPERGRID-WARP` (the grid deepening + studio) + `BD.W-WAVE-FIELD` (the shared primitive, sequenced FIRST so concentric/dot-matrix consume it) — mirroring how `flow.glsl.ts` was minted before its consumers.
