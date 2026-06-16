# BB.W-VIZ-CONCENTRIC (≡ W-VIZ-SUITE.e / W-CONCENTRIC) — the concentric ring-wave: a Fourier-defined radial water sheet, raked into 2.5D, born WebGPU-first

**Name**: W-VIZ-CONCENTRIC — `<Concentric>` (the concentric-ring radial-Fourier wave substrate; the elegant "3D-rendered-to-2D" hero ground). This wave is the **fifth serial sub-wave of W-VIZ-SUITE** (`W-GPU-SUBSTRATE → W-AURORA-WGPU → W-GOOBLOB-WGPU → W-FLOWFIELD → **W-CONCENTRIC**`), authored as a standalone spec so the impl agent has a README-grade build doc; it INHERITS every binding the parent suite declares (the dir name `concentric/`, the subpath `/concentric`, the gate `proof:concentric`, the parity-table row, the `useGpuSubstrate`/`useWebGPUCanvas` compose). It is NOT a peer wave that "opens after" the suite — it is INSIDE it.
**Opens after**: W-GPU-SUBSTRATE + W-FLOWFIELD (its two predecessors in the suite's serial chain). W-GPU-SUBSTRATE lands `useWebGPUCanvas` (the third thin backend over `createCanvasLifecycle`) + the born-RED `proof:gpu-substrate-single` parity gate; W-FLOWFIELD is the suite's first NEW WebGPU-first viz (the dot-flow-field) and PROVES the compute+render pattern this viz is born onto. This viz is the substrate twin's CONSUMER #2-or-#3 (after aurora-wgpu/goo-blob-wgpu/flow-field), so it reads the twin's handle contract and NEVER edits it.
**Agents**: 2 serial within the sub-wave. `.1` lands the PURE MATH leaf — `math.ts` (the radial Fourier bank `Σ A_h·sin(k_h·r − ω_h·t + φ_h)` + the Gerstner radial pinch + the 3D rotate→perspective-project + the ellipsoidal-norm ring field) + `constants.ts` + `presets.ts` (warm-identity default only) — the leaf a worker/test/the WebGL2-CPU-fallback/the parity round-trip all import, with NO render context. `.2` lands the COMPONENT + both backends — `Concentric.vue` + `composables/useConcentric.ts` + the `shaders/` WGSL pair + the WebGL2 `.frag.ts`/`.vert.ts` fallback + the subpath barrel + the studio story + the gate + the π. `.2` consumes `.1`'s leaf as its single math source (the WGSL MIRRORS it, the WebGL2 path literally RUNS it, the round-trip π asserts they agree), so they sequence.
**Hard gate**: `proof:concentric` (born-RED — the suite-declared sub-gate name; script `scripts/proof-concentric.mjs`) — six SOURCE witnesses (W1 the radial-Fourier bank present with the `1/h^p` falloff + the deep-water `ω=√(g·k)` dispersion; W2 the 3D rotate→perspective-project producing per-ring depth-attenuated width + the ellipsoidal-norm ring field; W3 the ONE shared `math.ts` leaf consumed by BOTH backends via a round-trip — the WGSL mirrors it, the WebGL2 path imports it, neither re-implements the bank inline; W4 the warm-identity DEFAULT preset with NO demo hue in any library token, resolved through the ColorResolver/value.js OKLCh seam; W5 the Gerstner per-harmonic steepness normalization `Q_h = Q/(k_h·A_h·H)` clamping the sum below the self-intersection loop; W6 it composes `useGpuSubstrate`/`useConcentric` and adds NO second `navigator.gpu`/`getContext` bootstrap — `proof:gpu-substrate-single` stays GREEN) + the binding Playwright π readback (`tests-visual/concentric.spec.ts`: the field ANIMATES live, PRM FREEZES it to one static raked frame, the rings RENDER + INTERFERE over the dark ground, the WebGPU↔WebGL2 PARITY holds within the calibrated OKLab-ΔE band over the same config+seed+frozen-t, no self-intersection at max steepness, renders at 1x AND 2dppx) + `proof:colocation` GREEN (the README-bearing feature-dir) + `proof:storybook-complete` GREEN (the `/concentric` subpath earns its substrates story) + the `proof:ba-gestalt` substrates-band verdict (BA inv-4 — the ring-wave reads as ONE coherent undulating water sheet seen at a rake, not stacked flat circles) + `proof:gpu-substrate-single` clause F (the concentric parity-table row resolves on disk).
**Status**: SPEC

## Goal criterion

A new procedural background primitive — `<Concentric>` (`@mkbabb/glass-ui/concentric`) — paints a field of N nested rings, each a parametric ellipse displaced by a RADIAL traveling wave whose height field is a Fourier bank of radial harmonics (the user's "water-like waves that are Fourier-defined"), the whole disc rotated about X by a rake angle α and perspective-projected to the viewport (the user's "3D-rendered-to-2D"). It is born **WebGPU-first** (a WGSL pass generates the projected ring geometry; the render pass draws the strokes/field on the compositor — the rreusser instanced-line technique for `variant="rings"`, a pure fragment pass for `variant="surface"`) with **WebGL2 the graceful fallback** (feature-detect `navigator.gpu`; the WebGL2 path evaluates the SAME `math.ts` leaf and draws the same geometry through a GLSL `.frag.ts`/`.vert.ts`). The DEFAULT palette is the warm-cream/foreground house identity ramp resolved through the existing OKLCh/ColorResolver seam — NOT the teal-on-navy of the dot-flow-field reference (that confirms the FAMILY aesthetic — elegant procedural strokes, depth, flow — and ships as a CONSUMER preset, presets-in-consumers). It belongs in the SUBSTRATES band beside Aurora / FourierField / Constellation / GooBlob / DotFlowField, ships as a per-package isolated chunk, and the studio story (a Configurator, `cloneMode="per-preset"`, the aurora studio model) teaches the math the way fourier-field teaches its epicycle sum — sweep `harmonics` to watch the Fourier bank ASSEMBLE the water, sweep `tilt` to watch flat→raked depth, sweep `steepness` to watch sine→cresting-water. It inherits the substrate discipline whole: offscreen-pause, the LIVE prefers-reduced-motion freeze (one static best-frame then park), DPR-awareness, and the dual-backend parity bar.

### Reconciliation with W-VIZ-SUITE (binding — read before authoring)

This spec and the parent suite (`W-VIZ-SUITE.md §W-CONCENTRIC` + `§DESIGN.4`) describe the SAME primitive; where they differ on shape, the BINDINGS conform to the suite (machine-checked) and the MATH is the richer of the two:

| Axis | W-VIZ-SUITE (authoritative on bindings) | This spec (authoritative on math/aesthetic detail) | Resolved |
|---|---|---|---|
| Component name | `<Concentric>` | (draft said `<RingWave>`) | **`<Concentric>`** (suite wins; the export name) |
| Dir | `src/components/custom/concentric/` | (draft said `ring-wave/`) | **`concentric/`** (suite wins; colocation + file-bounds) |
| Subpath | `@mkbabb/glass-ui/concentric` | (draft said `/ring-wave`) | **`/concentric`** (suite wins; subpath-enumeration) |
| Gate | `proof:concentric` → `scripts/proof-concentric.mjs` | (draft said `proof:viz-concentric`) | **`proof:concentric`** (suite wins; gate-script-parity) |
| Story / π | `demo/stories/substrates/concentric.vue` · `tests-visual/concentric.spec.ts` | — | **suite paths** |
| Math leaf | `ringField.ts` (named in `proof:concentric` predicate 3) | `math.ts` (the fourier-field precedent) | **`math.ts`** is the canonical fourier-field idiom; the suite's `ringField.ts` reference is satisfied by `math.ts` exporting a named `ringField()` evaluator. The gate predicate reads the EXPORTED function name `ringField`, not the file name — both hold. |
| Primary path | "a pure fragment pass (no particles) — the same shape-class as aurora" | the geometric 3D-project + instanced-line-strip | **BOTH, via the `variant` axis** (see the open decision below). `variant="surface"` is the suite's pure-fragment radial-interference field (cheapest, aurora-shape-class, the ship-default safe path); `variant="rings"` is this spec's geometric instanced-line raked-ring register (the elegant "concentric circles in 3D" the user named). The default `variant` is the one open decision flagged for the orchestrator. |
| Substrate compose | `useGpuSubstrate` (the suite's exposed name) | `useWebGPUCanvas`/`useWebGLCanvas` | **compose the suite's exposed seam** — whatever W-GPU-SUBSTRATE names its public compose (`useGpuSubstrate` or the raw `useWebGPUCanvas`); re-grep at §0, do NOT fork a third bootstrap. |
| Math model | "radial sum-of-sines / Fourier ring expansion … ellipsoidal norm `‖p−c‖_e` … multi-center interference" | the radial Fourier bank + Gerstner cresting + true 3D rotate→perspective-project + `1/h^p` falloff + `ω=√(g·k)` dispersion | **the union** — the suite's ellipsoidal-norm multi-center interference is the `variant="surface"` field; this spec's geometric raked rings is `variant="rings"`; BOTH evaluate the SAME radial Fourier bank from the ONE `math.ts` leaf. |

**THE ONE OPEN DECISION (flag for orchestrator):** is the SHIP-DEFAULT `variant="surface"` (the suite's cheapest pure-fragment radial-interference field, the lowest-risk path that clears the budget by construction) OR `variant="rings"` (this spec's richer geometric raked-line rings, the closest match to the user's verbatim "concentric ellipsoid/circles moving in waves, in 3D space rendered to a 2D plane")? The spec writes BOTH; the safe recommendation is **default `"surface"`, ship `"rings"` as the equal-status second register both demonstrated in the studio** (the fourier-field one-engine-two-presets precedent), with `"rings"` perf-gated by the budget π (the morph-showcase §7 precedent — if `"rings"` at max-N misses the throttled budget, it ships gated-off + BOOKED). Recommendation only; the orchestrator decides.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This sub-wave is NET-NEW (no prior glass-ui concentric viz), but it COMPOSES three existing substrates and INHERITS the suite's substrate twin — so the §0 discipline is "re-confirm the seams the new viz threads + the SUITE's exposed names, do NOT re-invent the substrate or re-name the bindings". Before writing a byte, the impl agent re-greps each anchor at HEAD and confirms the seam shape it threads onto; if a cite has drifted (a W-GPU-SUBSTRATE edit moved the twin's compose name, the colocation gate re-derived its target set, the suite renamed a parity-table column), the agent records the drift in PROGRESS and re-locates the seam — it does NOT fork a parallel substrate or a second math copy.

**The HEAD reality (confirmed this authoring 2026-06-16):**

1. **The substrate twin is W-GPU-SUBSTRATE's deliverable, NOT this wave's.** At HEAD `src/composables/glass/webgpu/` carries ONLY the `glassShader.wgsl` PILOT (no consumer, no `useWebGPUCanvas`). W-GPU-SUBSTRATE lands `useWebGPUCanvas` (the WebGPU backend over the backend-AGNOSTIC `createCanvasLifecycle` core, mirroring `useWebGLCanvas`'s `buildContext`/`resize`/`bindContextEvents` seam) + generalizes the substrate-single gate to `proof:gpu-substrate-single`. This wave is a downstream CONSUMER; it reads the twin's handle contract (`arm`/`armAsync`/`suspend`/`resume`/`wake`/`renderAt`/`dispose`/`reducedMotion` + the WebGPU `device.lost` self-heal) and NEVER edits the twin. RE-GREP the twin's EXPOSED compose name (`useGpuSubstrate` vs `useWebGPUCanvas`) — the suite's `proof:flow-field`/`proof:concentric` predicate 2 names `useGpuSubstrate`; confirm the actual export name W-GPU-SUBSTRATE shipped.
2. **The shared lifecycle core is backend-agnostic by construction.** `createCanvasLifecycle.ts` owns the three-reason suspend `Set`, the rAF demand gate, the `visibilitychange` tab-hidden owner, the `contentvisibilityautostatechange` offscreen-park, the live `matchMedia` PRM re-monitor (one static frame then park). All three backends (WebGL2, WebGPU, Canvas2D) thread it via `buildContext`. So this viz's offscreen-pause/PRM/DPR discipline is INHERITED, not authored — the gate asserts it composes the substrate, never re-forks the schedule (the AV.W1 two-copy class, the W-CANVAS-UNIFY lesson; `proof:gpu-substrate-single` clause C's no-fork bite).
3. **The math-leaf idiom is fourier-field's `math.ts`.** `src/components/custom/fourier-field/math.ts:1-8` is the model — "The ONE canonical copy … pure DFT/epicycle reconstruction … No Vue, no DOM — a leaf a test or a worker can import without a render context." This viz's `math.ts` is the radial twin of that file: ONE pure source the WGSL compute MIRRORS and the WebGL2 CPU fallback literally RUNS. It exports a named `ringField()` evaluator (satisfying the suite's `ringField.ts` predicate-3 function-name reference) + the projection helpers.
4. **The colocation target set is README-DERIVED (confirmed at HEAD).** `proof:colocation` (`proof-colocation.mjs:36-55`) derives its target set off the `README.md` marker, NOT a frozen list — so the new `concentric/` dir gains coverage AUTOMATICALLY the moment it adds its README. At HEAD the derived set is `{aurora, constellation, dock, fourier-field, goo-blob, tabs, underline}`; `concentric/` joins on adding its README. The new dir MUST satisfy: composables under `composables/` (a `useXxx.ts` or `*Context.ts`), `constants.ts` + no module-scope magic-number outside it, shaders under a named `shaders/` subdir matching `\.(frag|vert|glsl)\.ts$` / `\.(frag|vert)$` (NOTE: the gate's `isShader` regex does NOT currently match bare `.wgsl` — see §0-DRIFT below), and `README.md`.
5. **The substrates-band manifest convention.** `demo/stories/manifest.ts:120-122` keys `substrates → aurora` default BG; the substrates rows (`:233-266`) carry `aurora`/`constellation`/`fourier-field`/`glass-material` stories with `background` keys + a one-line description naming the shipped subpath. The new `concentric.vue` story appends here (single-owner, sequenced — W-FLOWFIELD appends its row FIRST in the suite's serial chain, this wave appends after; the EXECUTION-DAG single-owner rule).
6. **The studio model is the aurora Configurator.** Aurora consumes `useConfiguratorState<AuroraConfig>` with `cloneMode="per-preset"` (a named editable baseline the user tunes + returns to) and hand-authors `DockLayerGroup`/`DockLayer` chrome. This viz's studio mirrors the per-preset cloneMode (the math knobs are a tunable baseline) + the `freeze`/`seed` capture levers (the fourier-field `frozenT`/`frozenSeed` idiom — `presets.ts:19-23`).
7. **The suite's parity-table seam.** `proof:gpu-substrate-single` clause F reads `docs/tranches/BB/audit/gpu-parity-table.md` (machine-read): per-viz `.wgsl` primary path + `.frag`/`.glsl` fallback path + `parity: verified | pending | webgl2-only | degraded | no-migrate`. This wave APPENDS its `concentric` row (sequenced single-owner). The calibrated OKLab ΔE threshold is a recorded gate FACT (accommodates SwiftShader GL-vs-GPU sub-pixel rasterizer drift — visually-equivalent, not bit-identical).

**§0-DRIFT to confirm + resolve (the impl agent must re-grep + record):** the colocation `isShader` regex (`proof-colocation.mjs`) matches `\.(frag|vert|glsl)\.ts$` and `\.(frag|vert)$` — it does NOT currently match a bare `*.wgsl`. The new `shaders/concentric.compute.wgsl`/`concentric.render.wgsl` are WGSL, and the suite's W-GPU-SUBSTRATE may have already widened the regex to match `.wgsl` (the aurora-wgpu/goo-blob-wgpu migrations ship `.wgsl` under their own `shaders/`). RE-GREP the regex at HEAD: if W-GPU-SUBSTRATE/W-AURORA-WGPU already widened it to `\.wgsl$`, this wave inherits it; if NOT, the `.wgsl` shaders living under `shaders/` still satisfy clause (c) only if the regex matches — coordinate (it is the suite's single-owner edit, NOT this wave's — flag it to the suite owner). Either way the WGSL lives under `shaders/`; the regex match is a suite-coordination fact, not a license to scatter shaders.

```
# RE-GROUND command set — run all; confirm each seam + the suite's exposed names at HEAD before any edit.

# 1. The substrate twin (W-GPU-SUBSTRATE's; this wave consumes it, never edits it) — CONFIRM the exposed compose name
ls src/composables/glass/webgpu/                                   # at HEAD pre-suite: glassShader.wgsl pilot only; post-W-GPU-SUBSTRATE: useWebGPUCanvas.ts
grep -rn 'export function useGpuSubstrate\|export function useWebGPUCanvas\|createWebGPUCanvas' src/composables/glass/webgpu/  # the public compose name to thread
sed -n '103,198p' src/composables/glass/webgl/useWebGLCanvas.ts    # the thin-backend-over-the-core exemplar (buildContext/resize/bindContextEvents)
sed -n '1,40p'   src/composables/glass/webgl/createCanvasLifecycle.ts  # the backend-agnostic schedule all backends share

# 2. The math-leaf idiom + the variant-preset/freeze idiom (the model this wave's math.ts/presets.ts follow)
sed -n '1,40p'   src/components/custom/fourier-field/math.ts       # "ONE canonical copy … No Vue, no DOM"
sed -n '1,101p'  src/components/custom/fourier-field/presets.ts    # VariantPreset shape + frozenSeed/frozenT capture levers

# 3. The colocation gate (README-derived target set + the isShader regex .wgsl question)
sed -n '36,90p'  scripts/proof-colocation.mjs                      # the §6 clauses + the README-marker derivation
grep -n 'isShader\|\\.wgsl\|frag|vert|glsl' scripts/proof-colocation.mjs   # CONFIRM the .wgsl regex-match status (§0-DRIFT)

# 4. The substrates-band manifest + the storybook-complete gate + the SIBLING flow-field row (sequence after it)
sed -n '120,266p' demo/stories/manifest.ts                         # CATEGORY_DEFAULT_BG + the substrates rows + the background-key idiom
grep -n 'dot-flow-field\|concentric' demo/stories/manifest.ts      # the sibling W-FLOWFIELD row to sequence after
node scripts/proof-storybook-complete.mjs                          # the gate's "every shipped subpath has a story" shape at HEAD

# 5. The aurora studio model (per-preset cloneMode, the studio-chrome pattern this viz mirrors)
sed -n '1,40p'   src/components/custom/aurora/composables/useAurora.ts
grep -n 'cloneMode\|useConfiguratorState' src/components/custom/aurora/Aurora.vue

# 6. The color seam (warm-identity default + OKLCh interpolation — the ColorResolver/value.js leaf)
ls src/composables/color/                                          # the OKLCh primitives + the ColorResolver seam
grep -n 'oklchToLinear\|flattenPalette\|ColorResolver' src/components/custom/aurora/composables/color.ts
ls src/components/custom/aurora/constants/shaders/ 2>/dev/null     # post-W-AURORA-WGPU: procedural-color.wgsl.ts (the shared WGSL include this viz splices)

# 7. The substrate twin gate + the parity table this wave's row appends to
grep -rn 'gpu-substrate-single\|gpu-parity-table' scripts/*.mjs    # post-W-GPU-SUBSTRATE: present; this wave appends its concentric row
cat docs/tranches/BB/audit/gpu-parity-table.md 2>/dev/null         # the rows aurora/goo-blob/dot-flow-field carry; append concentric

# 8. The amendment that authorizes the WebGPU-first revisit (the recorded reversal, not a silent one)
sed -n '17,17p'  docs/tranches/BB/BB-AMENDMENT-coherence-harden.md  # §3 the WebGPU REVISIT
```

Captures / authority cross-references:
- `docs/tranches/BB/audit/viz-ref/dot-flow-field-reference.jpg` — the dot flow-field reference (teal dots on navy, seeded along undulating streamlines). It is W-FLOWFIELD's literal target; for THIS wave it confirms only the FAMILY aesthetic — elegant procedural strokes, real depth, flowing waves, the sophisticated "Claude co-work" register — NOT the library default hue (the teal→navy is a CONSUMER preset here).
- `docs/tranches/BB/BB-AMENDMENT-coherence-harden.md §3 (:17)` — the recorded WebGPU-first revisit (June-2026 Baseline; the user's verbatim "ALL of our visualizations, from fourier to aurora, should be WebGPU first when possible"); the `useWebGPUCanvas` twin + `proof:gpu-substrate-single` generalization are W-GPU-SUBSTRATE's, consumed here.
- `docs/tranches/BB/waves/W-VIZ-SUITE.md §W-CONCENTRIC (:213-218)` + `§DESIGN.4 (:250-256)` + `§proof:concentric (:408-412)` — the parent suite's binding shape for this primitive (the reconciliation table above).
- The SOTA corpus (grounded, cited inline in DESIGN below): GPU Gems Ch.1 *Effective Water Simulation from Physical Models* (Finch, NVIDIA — sum-of-sines + Gerstner + the explicit circular-wave variant + the steepness normalization `Q_i = Q/(w_i·A_i·numWaves)`, confirmed live this authoring); Tessendorf *Simulating Ocean Water* SIGGRAPH 2001 (the Phillips spectrum + deep-water dispersion `ω=√(g·k)`; the named higher-fidelity FFT successor); Bessel `J_0(k·r)` axisymmetric eigenmode (the rigorous radial-bank alternative); Codrops "False Earth" (the WebGPU compute→storage-buffer→render migration rationale + the ring-wavefront falloff); rreusser/regl-gpu-lines + the instanced-triangle-strip-per-segment `lineCoord` SDF technique (the SOTA for crisp joined glowing GPU lines).

## The defect table — N/A (net-new primitive)

This is a NET-NEW substrate, not a defect-fix wave, so there is no `file:line` defect table. The "targets" are the SEAMS the new viz threads (re-grepped in §0) + the BUILD-spec below + the SUITE bindings (the reconciliation table). The closest analog to a defect table is the RISK table (§Risks), carried below.

## DESIGN

### The aesthetic — an elegant raked water sheet of nested rings

The reference family (`dot-flow-field-reference.jpg`) is the "Claude co-work" register: small marks, real depth, a flowing wave-warped field over a dark ground, subtle + sophisticated. This viz transposes that register onto CONCENTRIC RINGS — a field of nested ellipses undulating on a radial water wave, raked away from the eye so the disc reads as a 2.5D topographic sheet seen at an angle ("a drop in a pond" seen at a rake). Where the dot-flow-field (W-FLOWFIELD's surface) traces streamlines of a curl-noise vector field, this surface traces concentric contours of a radial height field. They are SIBLING surfaces of the SAME procedural-stroke family: elegant, glass-adjacent, a luminous translucent field behind glass cards. The crest-brightened per-ring alpha + the additive stroke glow make it read as light passing THROUGH water — the transmissive-material language the dark register already speaks (W-DARK-MATERIAL).

The DEFAULT is the warm-cream/foreground identity ramp (presets-in-consumers — NO teal/navy baked into a library token); a consumer preset supplies the reference's teal-on-navy "pond" look or a violet legendre-family look.

### The math model (REAL, named-SOTA-grounded; equations)

A field of N nested rings indexed `i = 0..N-1`, each a parametric ellipse sampled by angle `θ ∈ [0, 2π)`. The ring lies in a base XY plane; its Z is displaced by a RADIAL TRAVELING WAVE (the "drop in a pond" form); the whole disc is rotated in 3D (a tilt about X) and perspective-projected to the 2D viewport. The depth illusion = (projection foreshortening) × (per-ring radial phase): the near rings spread, the far rings compress, and the wave crest sweeps OUTWARD ring-to-ring so the field reads as ONE undulating sheet at a rake, not stacked flat circles.

**(1) Ring parameterization (ellipse, eccentricity `e`).** For ring `i` at radius `r_i`, angle `θ`:

```
a_i = r_i                            // semi-major (x)
b_i = r_i · (1 − e)                  // semi-minor (y); e=0 → circle, e→1 → flat
x0  = a_i · cos θ
y0  = b_i · sin θ
```

Radius schedule (even projected visual density — pack tighter near center via `gamma`):

```
r_i = R_min + (R_max − R_min) · (i / (N−1))^gamma     // gamma≈1 linear, >1 packs outer rim
```

**(2) The radial traveling wave — the height field `z(r,t)` ("drop in a pond").** The canonical radial sinusoid; the per-ring outward phase `k·r_i` is EXACTLY what makes the concentric ripple read (adjacent rings sit a fixed phase apart → the crest marches ring→ring):

```
z(r,t) = A · env(r) · sin(k·r − ω·t + φ)
k = 2π/λ              // wave number (λ = wavelength)
ω = 2π·S/λ           // angular frequency (S = crest speed) — the single-wave fallback
env(r) = (1 − r/R_max)   // linear rim fade  (OR exp(−(r/σ)²) gaussian center-pulse)
```

**(3) Fourier-defined, water-like — the RADIAL FOURIER BANK (the user's "Fourier-defined water-like waves").** Replace the single sinusoid with a sum of `H` radial harmonics — the literal Fourier-series synthesis of an axisymmetric height field, the rich non-repeating water crest. This is the SUITE's ONE math vocabulary (`§DESIGN.4` — the same Fourier-series ladder the wave potential and the ring field both speak):

```
z(r,t) = Σ_{h=1..H} A_h · sin(k_h·r − ω_h·t + φ_h)

k_h = k_1 · h                  // harmonic ladder (or k_1·2^(h−1) for octave/FBM-like)
A_h = A_1 / h^p                // 1/h^p falloff, p≈1.6 → smooth swells dominate (the fourier-field 1/order idiom)
ω_h = √(g_eff · k_h)          // DEEP-WATER DISPERSION (Tessendorf §4) — ties frequency to wavenumber so the bank reads as REAL water, not arbitrary tones
φ_h = seeded random            // deterministic per `seed` via the house mulberry32 + hashString leaf (src/utils/prng.ts)
```

Truncating the bank at `H` is the partial-sum lever (the radial twin of fourier-field's `maxTerms`): `H=1` → a clean single ripple; `H→large` → a busy water sheet. This is the radial twin of the existing fourier-field's inverse-DFT epicycle sum — ONE engine FAMILY, two surfaces. Optionally the Phillips-spectrum amplitude falloff `A_h ∝ exp(−1/(k_h·L)²)/k_h²` (Tessendorf §4, the suite's `§DESIGN.1` energy-realistic ladder) replaces the `1/h^p` form behind a `spectrum: "power-law" | "phillips"` axis (booked, the default is `1/h^p`).

**(4) The `variant="surface"` ring-interference field (the suite's pure-fragment register).** The suite's primary shape (`§DESIGN.4`) is a fullscreen FRAGMENT field where the value at screen point **p** is a multi-center radial Fourier sum over the ELLIPSOIDAL norm — no geometry, the aurora shape-class, the cheapest path:

```
f(p,t) = Σ_{j}  Σ_{h=1..H}  A_h · sin( k_h · ‖p − c_j‖_e − ω_h·t + φ_h )
‖p − c_j‖_e = sqrt( ((p.x−c_j.x)/a)² + ((p.y−c_j.y)/b)² )   // ellipsoidal norm — concentric ELLIPSES (the 3D-implied depth)
```

The multi-center sum (`j` over 1..centers, default 1) produces ring INTERFERENCE — moiré-like beats where two ring families cross (the elegant concentric-wave aesthetic). The painted intensity is `crest = smoothstep(thresh−w, thresh+w, frac(f))` banded into rings; the per-ring color lerps the warm ramp by the local `f` value. This is the SAME `math.ts` radial bank (`§(3)`) evaluated at a screen radius rather than a ring index — ONE leaf, two evaluation sites.

**(5) The `variant="rings"` Gerstner-cresting geometric register (this spec's raked-line "concentric circles in 3D").** A pure sine has identical crests/troughs; real water has sharp crests + flat troughs. The Gerstner (trochoidal) variant displaces points RADIALLY-INWARD toward crests in addition to the Z lift. In radial form, with steepness `Q ∈ [0,1]` and unit radial direction `(cos θ, sin θ)`:

```
Φ  = k·r − ω·t + φ
r' = r − Q · A · cos Φ              // radial pinch toward the crest
z  =     A · sin Φ                  // height
x  = scaled(r') · cos θ ; y = scaled(r') · sin θ
```

**Steepness normalization (GPU Gems Ch.1, confirmed live this authoring — load-bearing):** for a SUM of waves, the canonical clamp is `Q_h = Q / (k_h · A_h · H)` (NVIDIA's `Q_i = Q/(w_i·A_i·numWaves)` with `w_i = k_h` the wavenumber, `numWaves = H`) — it keeps the sum from looping (over-steepening past the per-wave loop point pinches geometry into a self-intersecting trochoid loop where the rings cross — the STEEPNESS-LOOPING risk). The studio clamps `Q ≤ 0.85`; the per-harmonic normalization keeps the SUM safe. Tessendorf's FFT ocean (an inverse FFT of a Phillips-spectrum-seeded complex field) is the NAMED higher-fidelity successor (it needs a compute FFT pass — booked, not built); for a hero background the explicit sum-of-radial-Gerstner bank (`H≈4..8`) is the right cost/quality point. The Bessel eigenmode `z = Σ A_h · J_0(k_h·r) · sin(ω_h·t)` is the rigorous axisymmetric alternative whose large-`r` asymptote is the `sin(k·r−ωt)/√r` form the ship default approximates — cited as the rigorous option, not the default.

**(6) The 3D rotation + perspective projection (the "3D rendered to 2D" — `variant="rings"`).** Build the model point `P = (x, y, z)`, rotate about X by tilt `α` (rake the disc toward the horizon) + optionally spin about Z by `β` (slow turntable), then perspective-divide:

```
P_tilt = Rx(α) · Rz(β) · P
P_cam  = P_tilt + (0, 0, d)        // push the disc d in front of the eye
s = f / P_cam.z ; u = P_cam.x · s ; v = P_cam.y · s    // perspective divide (focal f)
screen = center + (u, v) · viewportScale
lineWidth_screen = baseWidth / P_cam.z                  // depth attenuation — far rings thin (aerial perspective)
```

WHY this reads as elegant 3D-in-2D: (a) the tilt `α` makes a same-radius ring project to an ELLIPSE on screen even at `e=0` (foreshortening = perspective ellipticity, the topographic-contour look) — DISTINCT from the eccentricity `e`; (b) the perspective divide makes near rings bigger than far (the "bowl tilted toward you"); (c) the per-ring radial phase sweeping outward + the projection together produce the moiré-free traveling crest — ONE coherent undulating surface. (`variant="surface"` reads the depth from the ellipsoidal norm + a screen-space vertical luma gradient — no per-vertex projection, the cheaper depth cue.)

**(7) The palette gradient across rings (warm-identity default).** Each ring `i` is colored by its normalized radius `t_i = i/(N−1)` lerped along the warm-cream identity ramp, interpolated in OKLCh (perceptual) via the existing `oklchToLinear`/ColorResolver/value.js seam — NOT sRGB, NOT a re-implemented OKLCh math (ONE color source). Per-ring alpha rides the wave height when `crestBrighten` (default `true`): `α_i = baseAlpha · (0.6 + 0.4 · (z_i/A + 1)/2)` — the luminous-water cue.

### The WebGPU-first pipeline (WGSL + WebGL2 the graceful fallback)

**Decision: TWO registers off ONE engine + ONE math leaf.** `variant="surface"` is a pure FRAGMENT pass (the suite's aurora shape-class, the cheapest path); `variant="rings"` is INSTANCED line-strip rings (the rreusser technique — the SOTA for crisp, joined, glowing GPU lines, the geometric raked "concentric circles in 3D"). Both evaluate the SAME radial Fourier bank from `math.ts`. The ship-default `variant` is the one open decision (see the reconciliation table).

**WebGPU path (born-first; feature-detect `navigator.gpu`).** The bringup is W-GPU-SUBSTRATE's `useWebGPUCanvas` (the `armAsync` async prelude — `navigator.gpu.requestAdapter()` → `adapter.requestDevice()` → `context.configure({ device, format: navigator.gpu.getPreferredCanvasFormat(), alphaMode: "premultiplied" })` → the consumer's `setup(device, ctx, format)` → the leaf's sync `arm()`; `device.lost` → the self-heal unless `reason==="destroyed"`). This viz authors ONLY the consumer `setup` (the pipelines + bind groups + uniform marshalling), NEVER the device acquisition (clause D — no second bootstrap).

- **`variant="surface"` (the simpler default).** ONE render pass: a full-screen-triangle vertex shader + `concentric.surface.wgsl` fragment that evaluates `f(p,t)` (eq. 4) per pixel — the radial Fourier bank over the ellipsoidal norm, banded into rings, OKLCh-ramped. No compute pass, no storage buffer (the aurora shape-class). The uniform struct (the typed source-of-truth, explicit `_pad` alignment to 16-byte boundaries):

  ```wgsl
  struct ConcentricUniforms {
    resolution : vec2<f32>,   // px
    center     : vec2<f32>,   // normalized disc center
    time       : f32,
    tilt       : f32,         // α (rad) — used as a screen-space vertical luma gradient in surface mode
    eccentricity : f32,       // → (a,b) ellipsoidal-norm axes
    amplitude  : f32,         // A_1
    wavelength : f32,         // λ → k_1
    speed      : f32,         // S
    harmonics  : u32,         // H (the bank truncation; loop bound)
    harmonicFalloff : f32,    // p (A_h = A_1/h^p)
    steepness  : f32,         // Q (normalized per-harmonic in-shader)
    gEff       : f32,         // g_eff for ω_h = √(g_eff·k_h)
    glow       : f32,
    intensity  : f32,
    centers    : u32,         // multi-center count
    seedHash   : u32,         // φ_h PRNG seed (house hashString)
    _pad       : vec2<f32>,
  }
  @group(0) @binding(0) var<uniform> U : ConcentricUniforms;
  // @group(0) @binding(1) var<storage,read> palette : array<vec4<f32>>;  // OKLCh-linear ramp uploaded CPU-side
  ```

- **`variant="rings"` (the geometric raked-line register).** A COMPUTE pass (`concentric.compute.wgsl`, `@compute @workgroup_size(64)`) generates the projected ring vertices into a storage buffer — one workgroup thread per `(ring i, angle-sample m)`: read `r_i`, `e` from the uniform/params block; evaluate the radial Fourier bank `z(r_i,t)` (eq. 3, loop over `H`); apply the Gerstner radial pinch if `Q>0` (eq. 5, normalized); build model `P`, apply `Rx(α)·Rz(β)`, perspective-divide → screen `(u,v)` + per-vertex `depth` + per-vertex `width = baseWidth/P_cam.z` + per-vertex color (OKLCh-ramped CPU-side, uploaded as a per-ring color storage buffer). Storage layout: pack per-vertex as `vec4(screenX, screenY, depth, width)` + a parallel color buffer (the 16-byte-aligned idiom). Then a RENDER pass (`concentric.render.wgsl`) draws INSTANCED line segments (rreusser): per ring of `M` samples, `M` instances of a triangle-strip; the vertex shader reads segment endpoints from the storage buffer, expands the strip perpendicular by the screen-projected `lineWidth`, emits a `lineCoord` varying so `length(lineCoord)` gives consistent radial distance from the stroke center (uniform width, SDF-able); a `w=0` sentinel breaks strips between rings. The 3D→2D projection lives in the COMPUTE pass (vertices arrive already projected) → the render vertex shader is a PURE 2D strip-expansion (clean separation). GLOW: the fragment over `lineCoord` — a crisp core stroke + an additive outer falloff `exp(−d²)` (the luminous water bloom). Anti-alias via the `lineCoord` SDF (`smoothstep` at the stroke edge) — no MSAA. Blending: premultiplied; additive for the glow layer over the dark ground.

**WebGL2 fallback path (graceful, byte-equivalent visual).**
- `variant="surface"` → a GLSL `concentric.frag.ts` (the `.glsl.ts` template-string house idiom) running the SAME `f(p,t)` evaluation per fragment — a direct port (the aurora `.frag` shape-class), the cleanest parity (fragment-to-fragment, same float math).
- `variant="rings"` → no compute shaders in WebGL2, so CPU-side vertex generation: evaluate the SAME `math.ts` leaf (Fourier bank + projection) in TS each frame for `N≈14 × M≈128 ≈ 1800` verts (`<0.2ms` — cheap), upload to a dynamic VBO, draw instanced via the same triangle-strip-per-segment geometry (a unit quad-strip VBO + per-instance endpoint attribs) through `concentric.vert.ts`/`concentric.frag.ts`. ONE math source, two backends — the WebGL2 path LITERALLY runs the leaf; the WGSL compute MIRRORS it.

**The GL-shader fence holds absolutely.** The existing `aurora.frag`/`metaball.frag` are byte-UNTOUCHED. This viz authors a NET-NEW parallel set — NEW `.wgsl` (WebGPU) AND NEW `.frag.ts`/`.vert.ts` (WebGL2) under its OWN `shaders/` dir. No edit to any existing shader. The PARITY BAR (the cardinal discipline): a π asserts byte-comparable (within the calibrated OKLab-ΔE band) output between the WebGPU and WebGL2 paths over the SAME config+seed+frozen-t. A divergence past band halts to triumvirate (the linear-vs-gamma seam is the prime suspect — the `proof:aurora-space-gamma` class).

## COMPONENT SPEC (README-grade)

### Colocation dir layout (`proof:colocation`)

```
src/components/custom/concentric/
  Concentric.vue                # the component root — consumes useConcentric + the ColorResolver injection;
                                #   the aurora/fourier-field prop shape; presentational root <div class="concentric">
  composables/
    useConcentric.ts            # the renderer orchestrator — picks WebGPU vs WebGL2 backend (feature-detect),
                                #   owns the config→uniform/storage-buffer bridge, exposes pause/resume/wake;
                                #   composes useGpuSubstrate/useWebGPUCanvas (W-GPU-SUBSTRATE) OR useWebGLCanvas (fallback)
    useConcentricGeometry.ts    # the projection + per-ring transform glue (the rings-mode CPU-fallback vertex emit +
                                #   the uniform marshalling); imports math.ts, owns NO schedule
  math.ts                       # the PURE leaf (NO Vue, NO DOM): exports ringField() (the radial Fourier bank z(r,t) /
                                #   f(p,t)), the Gerstner pinch, the radial schedule, the 3D rotate+perspective-project.
                                #   A worker/test/the WebGL2 CPU fallback AND the parity round-trip all import it. ONE math source.
  constants.ts                  # ConcentricConfig shape + the DEFAULTS + the harmonic-bank defaults (every
                                #   module-scope magic-number lives HERE — the colocation clause (b))
  presets.ts                    # the NEUTRAL/warm-identity DEFAULT preset ONLY (presets-in-consumers); the
                                #   VariantPreset shape + the frozenSeed/frozenT capture levers (the fourier
                                #   precedent). NO demo hue.
  shaders/
    concentric.surface.wgsl     # NEW — the variant="surface" fragment field (the suite's pure-fragment shape)
    concentric.compute.wgsl     # NEW — the variant="rings" vertex-gen compute pass
    concentric.render.wgsl      # NEW — the variant="rings" instanced line-strip vs/fs render pass
    concentric.frag.ts          # NEW — the WebGL2 fallback fragment shader (.glsl.ts template string; surface + rings-fs)
    concentric.vert.ts          # NEW — the WebGL2 fallback vertex shader (.glsl.ts template string; rings strip-expand)
  index.ts                      # the subpath barrel — re-exports Concentric + useConcentric + the math leaf (ringField) +
                                #   the ConcentricConfig type + the neutral preset
  README.md                     # the feature-dir doc (the colocation marker; RESEARCH.md/DESIGN.md optional, the aurora precedent)
```

(The §0-DRIFT note: if the colocation `isShader` regex has not been widened to match `.wgsl` by W-GPU-SUBSTRATE, that is a SUITE single-owner coordination — flag it; the `.wgsl` files stay under `shaders/` regardless.)

### Public prop table

Every prop maps to a configurator axis + a `--concentric-*` token where it is a visual knob. Tokens are inheriting custom properties (a consumer retunes by overriding the rung on any ancestor).

| Prop | Token | Type | Default | Range | Note |
|---|---|---|---|---|---|
| `variant` | — | `"surface" \| "rings"` | **(open decision — recommend `"surface"`)** | enum | `"surface"`=pure-fragment radial-interference field (suite shape-class, cheapest). `"rings"`=instanced raked line strokes (the geometric "concentric circles in 3D"). ONE engine, two registers, ONE math leaf. |
| `rings` | `--concentric-count` | number | `14` | `3..40` | N nested rings (rings-mode); the single biggest perf lever (see Risks). In surface-mode it sets the banding count. |
| `radiusRange` | `--concentric-radius-min` / `-max` | `[number, number]` | `[0.04, 0.95]` | normalized 0..1 of min viewport dim | inner/outer extent; `inner>0` leaves a calm eye at center. |
| `radiusGamma` | — | number | `1` | `0.5..2.5` | `r_i = Rmin+(Rmax−Rmin)·(i/(N−1))^γ`; `>1` packs the rim, `<1` packs the center. |
| `eccentricity` | `--concentric-eccentricity` | number | `0` | `0..0.85` | ellipse flatten `e` (`b=a·(1−e)`) / the ellipsoidal-norm axis ratio; `0`=circles (the tilt alone gives the elliptical foreshortening). DISTINCT from the tilt-induced ellipticity. |
| `amplitude` | `--concentric-amplitude` | number | `0.12` | `0..1` (units of radius) | `A_1` — peak crest height; the swell strength. |
| `wavelength` | `--concentric-wavelength` | number | `0.35` | normalized | `λ` (sets `k_1=2π/λ`); how many crest bands cross the disc. |
| `speed` | `--concentric-speed` | number | `0.45` | `0..2` | `S`; the outward crest-travel tempo (the single-wave `ω`; per-harmonic `ω_h=√(g_eff·k_h)` rides the dispersion). |
| `harmonics` | `--concentric-harmonics` | number | `4` | `1..8` | `H` — the radial Fourier-bank count (the partial-sum lever, twin of fourier-field `maxTerms`). `1`=clean ripple, higher=busy water. The WGSL loop bound. |
| `harmonicFalloff` | — | number | `1.6` | `1.0..2.5` | `p` in `A_h=A1/h^p`; how fast higher harmonics decay (smooth swells vs crinkled water). |
| `steepness` | `--concentric-steepness` | number | `0` | `0..0.85` | `Q` — the Gerstner radial pinch (`0`=rolling sine, →`0.85`=sharp crests). Auto-normalized `Q_h=Q/(k_h·A_h·H)` in-shader; studio HARD-clamps `≤0.85`. |
| `centers` | — | number | `1` | `1..3` | the multi-center ring-interference count (`Σ_j`; surface-mode — the moiré beat). `1`=single pond. Seeded center offsets. |
| `tilt` | `--concentric-tilt` | number (deg) | `62` | `0..80` | `Rx` rake `α` — the "3D-to-2D" depth (rings-mode the projection; surface-mode a vertical luma gradient). `~62°` reads raked; `0°` flat top-down. |
| `spin` | — | number (deg/s) | `0` | `0..15` | `Rz` turntable `β`; slow optional disc rotation. `0`=static orientation. |
| `perspective` | `--concentric-perspective` | number (depth/focal) | `2.2` | `1.2..6` | `d/f` — the near-big/far-small foreshortening strength. Low=dramatic, high=near-orthographic. |
| `lineWeight` | `--concentric-line-weight` | number (css px) | `1.4` | `0.5..4` | base stroke width (rings-mode; depth-attenuated by `1/z` so far rings thin). |
| `glow` | `--concentric-glow` | number | `0.4` | `0..1` | additive bloom intensity around each stroke / band edge (the luminous-water read). |
| `palette` | — (resolved via ColorResolver) | `OklchStop[]` \| base css color | warm-cream identity ramp (foreground family) | — | per-ring gradient lerped in OKLCh by normalized radius. DEFAULT neutral/warm-identity; themed gradients (teal→navy reference, violet legendre) are CONSUMER presets (presets-in-consumers). NO demo hue in a library token. |
| `crestBrighten` | — | boolean | `true` | — | ride per-ring alpha on wave height so crests glow brighter (the luminous-water cue). |
| `intensity` | — | number | `1` | `0..2` | the OUTER loudness envelope scaling glow/alpha at the paint layer (the aurora `opacityCeiling`/fourier-field `intensity` shape). |
| `freeze` | — | boolean | `false` | — | paint ONE deterministic best-frame + park (the capture lever; the PRM static-frame target). |
| `frozenT` | — | number | `0.18` | `0..1` | the deterministic phase the `freeze`/PRM static frame paints (the aurora/fourier idiom). |
| `seed` | — | string | `""` | — | feeds the `φ_h` phase PRNG + the `centers` offsets via the house mulberry32+hashString leaf (`src/utils/prng.ts`) — a unique-but-reproducible wave. |
| `backend` | — (internal, auto) | `"webgpu" \| "webgl2"` | `auto` | — | `navigator.gpu` → webgpu, else webgl2. NOT a studio knob; a forced override exists for the parity π ONLY. |

### Subpath + composable + studio integration

- **Subpath**: `@mkbabb/glass-ui/concentric` (a per-package isolated WebGPU+WebGL2 chunk the root barrel does NOT transitively reach — the aurora/fourier-field precedent). `index.ts` re-exports `Concentric`, `useConcentric`, the `ringField` math leaf (so a worker/test can import the pure math), the `ConcentricConfig` type, and the neutral default preset. Registered in `package.json` exports + `typesVersions["*"]` + `src/subpaths/concentric.ts` (the trivial mirror `export * from "../components/custom/concentric"`) + `src/components/custom/index.ts` barrel + `src/api/index.ts` (the `ConcentricConfig` type publication); the `proof:subpath-enumeration`/`verify-export-types` gates pick it up. (Sequenced single-owner with W-FLOWFIELD's `dot-flow-field` append per the suite's serial chain.)
- **Composable**: `useConcentric(canvasRef, config)` — the renderer orchestrator. Feature-detects `navigator.gpu`, composes `useGpuSubstrate`/`useWebGPUCanvas` (W-GPU-SUBSTRATE) OR `useWebGLCanvas` (fallback) — NEVER a forked schedule — and bridges the reactive `ConcentricConfig` to the uniform/storage-buffer set. Exposes `pause()`/`resume()`/`wake()`/`reducedMotion` (delegated from the substrate handle). The `wake()` re-arms a parked loop when a setter re-introduces motion (the goo-blob `wake` precedent).
- **Configurator studio (the aurora model)**: the story hosts a `<Configurator>` (`useConfiguratorState<ConcentricConfig>`, `cloneMode="per-preset"` — each preset is a named editable baseline the user tunes + returns to; the slider edits survive a preset round-trip). The studio teaches the math (sweep `harmonics` to watch the bank assemble the water; sweep `tilt` to watch flat→raked; sweep `steepness` to watch sine→cresting-water; toggle `variant` to watch surface↔rings) — the fourier-field "watch it sum" pedagogy. The `freeze`/`seed` levers are surfaced for the capture/deterministic-wave demonstration.
- **Warm-identity default + presets-in-consumers**: the library ships exactly ONE preset (`presets.ts`) — the neutral warm-cream identity ramp resolved through the OKLCh seam. The story (a CONSUMER) supplies 2–3 themed presets (warm-cream identity, the teal→navy "pond" reference look, a violet "legendre" motion-family look) — presets-in-consumers demonstrated live. NO themed hue enters a library token.

## THE DEMO STORY (substrates band; one-context-per-route)

- **`demo/stories/substrates/concentric.vue`** — the flagship. A full-bleed hero stage with the warm-identity default + the STUDIO (the per-preset Configurator above) exposing every axis, plus the 2–3 consumer presets. This IS the cogent story (`proof:storybook-complete`): the studio's live preview is the demonstration. The story is ONE GPU/GL context per route (the one-context-per-route budget — the W-SUFFUSE over-spend fence: a hero concentric field is a live GPU context, scoped to the hero/landing + this studio story ONLY; content pages keep the static washes grid/paper). The substrate's `createCanvasLifecycle` offscreen-pause (the `useIntersectionPause` + `content-visibility` seam) applies — the field parks when scrolled offscreen / tab-hidden.
- **Manifest append** (`demo/stories/manifest.ts`) — a substrates row keyed `background` + a one-line description naming the shipped `/concentric` subpath, beside the aurora/constellation/fourier/dot-flow-field rows (`:233-266`). Single-owner, sequenced AFTER W-FLOWFIELD's `dot-flow-field` row (the EXECUTION-DAG single-owner rule; the suite's serial chain orders them).
- **The "one engine, two registers" discipline** — like fourier-field's hero/final, concentric is ONE engine with a `variant` axis (`"surface"` field + `"rings"` strokes) + bundled presets, NOT a recolour. The studio demonstrates both registers off the ONE engine.

## THE DISCIPLINE INHERITED (substrate contract)

- **Offscreen-pause** — inherited from `createCanvasLifecycle` via the substrate twin: the rAF loop PARKS when the host is content-hidden (`content-visibility:auto` + `contentvisibilityautostatechange`), scrolled offscreen (`useIntersectionPause` `rootMargin:200px`), or tab-backgrounded (`document.hidden`). An offscreen surface attaches ZERO frames.
- **The LIVE prefers-reduced-motion freeze (one static frame)** — the substrate twin's live `matchMedia` PRM monitor paints ONE static best-frame (`freeze` at the authored `frozenT`, the aurora/fourier idiom) then parks, re-arming (one static frame) on un-reduce. NO animation under reduce; the static raked frame still reads as an elegant hero. A `DockBackgroundToggle`-style WCAG-2.2.2 pause/play control is available to ALL users (the consumer wires `@update:paused` → the renderer's `pause()`/`resume()`) — distinct from the PRM freeze.
- **DPR-awareness** — the substrate twin owns the DPR-clamped resize (the consumer threads `resize` through `buildContext`; the WebGPU backend re-configures the context, the WebGL2 backend sizes the canvas + viewport). The π verifies render correctness at 1x AND 2dppx (the PROJECTION-ALIASING risk).
- **The WebGPU/WebGL2 parity bar** — the cardinal cross-backend discipline: BOTH backends paint the SAME hero over the SAME config+seed+frozen-t, asserted within the calibrated OKLab-ΔE band (the recorded gate FACT) by the born-RED parity π. ONE shared `math.ts` leaf (the WebGL2 path runs it, the WGSL compute/fragment mirrors it) + premultiplied-alpha discipline on both paths is the structural guarantee; the π is the binding proof. A SwiftShader/headless environment with no `navigator.gpu` must fall cleanly to WebGL2, and a software-raster WebGL2 context must not wedge (the W-AURORA-SWRASTER `isSoftwareWebGLRenderer` software-raster guard precedent — reuse the pattern, do NOT mint a second context probe; a faithful headless static fallback is needed for CI capture, no headed `--use-gl=angle`).

## Risks and Triumvirate Dispatch

| # | risk | mitigation (gate/π catches it) |
|---|---|---|
| 1 | **LINE-RENDERING COST at high ring counts** (`variant="rings"`) — `N×M×(segment+join)` grows fast (`40×256 ≈ 10k` instances). | the depth-attenuated width + a soft per-ring LOD (fewer angle-samples on far/small rings — the False Earth distance-tier idiom), the sane default `N=14`, the instanced-strip ONE-draw-call path. The π MEASURES frame cost at the max-N preset under 4×-throttle against the strict budget (the morph-showcase precedent: a register that misses the budget under throttle SHIPS the cheaper fallback + BOOKS the richer one — so `"surface"` is the safe default, `"rings"` perf-gated). |
| 2 | **PROJECTION ALIASING / MOIRÉ** — densely-packed far rings under foreshortening shimmer on crisp strokes. | the `lineCoord` SDF antialiasing (`smoothstep` stroke edge), a min on-screen ring spacing (clamp `radiusGamma/N` so adjacent projected rings stay `≥~1.5px` apart at the rim), the depth-attenuated alpha fading the far rim. Verify in the π at 1x AND 2dppx. |
| 3 | **WebGPU↔WebGL2 PARITY** — subtle linear-vs-gamma / blending / line-expansion differences diverge the two paths. | the ONE shared `math.ts` leaf (both consume it), premultiplied-alpha both paths, the born-RED parity π (the calibrated OKLab-ΔE band, the gate FACT). A divergence past band → triumvirate (the linear-vs-gamma seam is the prime suspect, the `proof:aurora-space-gamma` class). The fragment-vs-fragment `variant="surface"` path is the cleanest parity (same float math both backends). |
| 4 | **PREFERS-REDUCED-MOTION** — a full-viewport undulating field is exactly what PRM users opt out of. | the substrate twin's LIVE PRM monitor → ONE static best-frame (`freeze` at `frozenT`) then park, re-arm on un-reduce. The π asserts the field FREEZES (zero per-frame delta) under emulated `prefers-reduced-motion: reduce`. |
| 5 | **WebGPU UNAVAILABILITY** (Firefox/Linux holdouts, SwiftShader/headless) — `navigator.gpu` absent or `requestAdapter()` null must fall cleanly. | the feature-detect→fallback chain (`navigator.gpu` → adapter → device, else WebGL2; the `isSoftwareWebGLRenderer` software-raster guard so a SwiftShader WebGL2 context falls to a static ground rather than hanging — the W-AURORA-SWRASTER precedent). A faithful headless static fallback for CI capture (no headed browser). |
| 6 | **GL-SHADER FENCE + new-shader proliferation** — an agent edits an existing `.frag` "for consistency", or the new `.wgsl`/`.frag` drift apart. | the fence is byte-untouched on existing shaders (verified: `git diff --stat` on `aurora.frag`/`metaball.frag` empty); the parity π is the cross-shader equivalence proof; all new shaders live under the viz's OWN `shaders/` dir (colocation). |
| 7 | **OVER-SPEND on a content page** — a hero concentric field dropped on a content page violates one-context-per-route. | scope it to hero/landing + the studio story ONLY; content pages keep the static washes (the W-SUFFUSE over-spend fence). |
| 8 | **STEEPNESS LOOPING** — Gerstner `Q>1` (or an un-normalized sum) pinches the geometry into self-intersecting loops (rings cross). | clamp `Q≤0.85` in the studio + the per-harmonic `Q_h=Q/(k_h·A_h·H)` normalization (GPU Gems Ch.1, confirmed) so the SUM never loops; the π checks NO ring self-intersects at max steepness. |
| 9 | **SUITE BINDING DRIFT** — this spec re-names a binding the suite machine-checks (the dir/subpath/gate/parity-row). | the reconciliation table is binding; the §0 re-grep confirms the suite's exposed names BEFORE writing; a name divergence reds `proof:gpu-substrate-single` clause F / `proof:gate-script-parity` / `proof:subpath-enumeration`. |

**Triumvirate triggers:**
- **The parity band cannot be held** (risk 3) — if the WebGPU and WebGL2 paths diverge past the calibrated ΔE band after three iterations and the cause is not isolated (a gamma-mismatch, a line-expansion difference, a DPR/backing-store delta), halt and triumvirate. The suspect is the linear-vs-gamma seam (the `proof:aurora-space-gamma` class); the fix is the SHARED math leaf + premultiplied discipline, NOT a per-backend fudge that masks the divergence.
- **The substrate twin's seam must widen** — if `useConcentric` cannot thread the WebGPU storage-buffer/compute lifecycle through `useGpuSubstrate`/`useWebGPUCanvas`'s existing handle WITHOUT changing the twin's public seam (which the sibling viz + the booked aurora migration also depend on), that is a scope-reveal: triumvirate (research a minimal symmetric twin-seam widen that serves all consumers), do NOT fork a second WebGPU bootstrap or a concentric-local lifecycle (the AV.W1 two-copy class; `proof:gpu-substrate-single` clause C reds it). This is a SUITE single-owner change (W-GPU-SUBSTRATE owns the twin), not this sub-wave's unilateral edit.
- **The `"rings"` variant exceeds the cost/quality point** — if the instanced raked-line `variant="rings"` cannot clear the budget under throttle, it ships gated-off + BOOKED (the morph-showcase §7 precedent) and `variant="surface"` is the sole ship default, never blocking the close.
- **A GL-fence touch is "needed"** — NEVER. If the math seems to need an existing-shader edit, that is a misread: this viz authors NET-NEW shaders only. A genuine cross-viz shader-internal change is the triumvirate's call (the W-GOO-COLOR 4.x fence-widening precedent), never a unilateral edit.
- **The colocation `.wgsl` regex** — if `proof:colocation`'s `isShader` does not match `.wgsl` at HEAD and W-GPU-SUBSTRATE has not widened it, that is a SUITE coordination (the aurora-wgpu/goo-blob-wgpu migrations need the same widen) — flag it to the suite owner, do NOT widen it unilaterally from this sub-wave.

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/concentric/Concentric.vue` | create (the component root) |
| `src/components/custom/concentric/composables/useConcentric.ts` | create (the renderer orchestrator — composes the substrate twin, NO forked schedule) |
| `src/components/custom/concentric/composables/useConcentricGeometry.ts` | create (the projection/uniform glue + the rings-mode CPU-fallback vertex emit) |
| `src/components/custom/concentric/math.ts` | create (the PURE leaf — exports `ringField()`: the radial Fourier bank + Gerstner + projection; `.1`'s deliverable) |
| `src/components/custom/concentric/constants.ts` | create (`ConcentricConfig` + defaults + harmonic-bank defaults; the magic-number home) |
| `src/components/custom/concentric/presets.ts` | create (the NEUTRAL warm-identity default preset ONLY + the VariantPreset shape + freeze levers) |
| `src/components/custom/concentric/shaders/concentric.surface.wgsl` | create (NEW — the variant="surface" fragment field) |
| `src/components/custom/concentric/shaders/concentric.compute.wgsl` | create (NEW — the variant="rings" vertex-gen compute) |
| `src/components/custom/concentric/shaders/concentric.render.wgsl` | create (NEW — the variant="rings" instanced line-strip render) |
| `src/components/custom/concentric/shaders/concentric.vert.ts` | create (NEW — the WebGL2 fallback vertex shader) |
| `src/components/custom/concentric/shaders/concentric.frag.ts` | create (NEW — the WebGL2 fallback fragment shader) |
| `src/components/custom/concentric/index.ts` | create (the subpath barrel) |
| `src/components/custom/concentric/README.md` | create (the feature-dir doc — the colocation marker) |
| `src/subpaths/concentric.ts` | create (the trivial mirror barrel — `export * from "../components/custom/concentric"`) |
| `src/components/custom/index.ts` | modify (append the concentric barrel — sequenced single-owner after W-FLOWFIELD) |
| `src/api/index.ts` | modify (publish the `ConcentricConfig` type — sequenced single-owner) |
| `demo/stories/substrates/concentric.vue` | create (the flagship studio story) |
| `demo/stories/substrates/presets.ts` | modify-or-create (the demo themed presets — sequenced with W-FLOWFIELD's) |
| `demo/stories/manifest.ts` | modify (append the substrates row — single-owner, sequenced after dot-flow-field) |
| `package.json` | modify (the `/concentric` subpath export + `typesVersions` + the `proof:concentric` script) |
| `scripts/proof-concentric.mjs` | create (the born-RED gate — the six source witnesses) |
| `docs/tranches/BB/audit/gpu-parity-table.md` | modify (append the `concentric` parity row — `proof:gpu-substrate-single` clause F) |
| `tests-visual/concentric.spec.ts` | create (the binding Playwright π — animate/PRM-freeze/render+interfere/parity/no-loop/dpr readback) |
| `src/components/custom/PROCEDURAL-SUITE.md` | modify (the suite family doc gains the concentric member row — sequenced, the suite's doc) |
| `CLAUDE.md` | modify (record the Concentric canon + the WebGPU-first/WebGL2-fallback parity under the substrates/viz section) |
| `docs/tranches/BB/audit/visual/W-VIZ-CONCENTRIC-DELTA.md` | create (the own-surface capture + freshness header + the born-RED→GREEN logs + the parity capture) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge row) |

Do NOT touch:
- **The existing GL shaders** — `aurora.frag`/`metaball.frag`/the `shaders/*.glsl.ts` strings are byte-UNTOUCHED. This viz authors NET-NEW shaders only. (`git diff --stat` on those paths empty at close — the fence.)
- **`useWebGPUCanvas`/`useGpuSubstrate` / `useWebGLCanvas` / `createCanvasLifecycle`** — W-GPU-SUBSTRATE owns the twin; this sub-wave CONSUMES it (read the handle contract, compose it). If the twin's seam must widen, that is the triumvirate + a SUITE single-owner change, not a default edit here.
- **`proof:gpu-substrate-single`** — W-GPU-SUBSTRATE's generalized gate; this wave KEEPS it green (composes the twin, mints NO second bootstrap) and APPENDS its parity-table row (clause F). This viz's `useConcentric` must not add a third `getContext`/`requestAdapter` bootstrap.
- **The sibling NEW viz** (W-FLOWFIELD's `src/components/custom/dot-flow-field/` dir + its gate `proof:flow-field` + its subpath) — bound-disjoint; they meet only at the shared substrate (read) + the shared barrels/manifest/parity-table/api/presets (single-owner SEQUENCED append, W-FLOWFIELD first then concentric — the suite's serial chain).
- **The colocation `isShader` regex** — if it needs `.wgsl` widening, that is the SUITE single-owner (W-GPU-SUBSTRATE), shared with the aurora/blob migrations — flag, don't unilaterally edit.
- **The standing fences** — ppmycota purple / demo presets NEVER enter library tokens (the warm-identity default is the library identity; the teal/violet looks are CONSUMER presets); the slides/value.js/kf/fourier-analysis foreign trees; the hardened-agent git clause (the impl agent never stages/commits/tags).

## Hard Gate

`proof:concentric` (born-RED at HEAD — the viz does not exist; the gate's source witnesses fail on the absent files until `.1`/`.2` land them; script `scripts/proof-concentric.mjs`), plus the binding Playwright π, plus the `proof:ba-gestalt` substrates-band verdict, plus `proof:colocation`/`proof:storybook-complete`/`proof:gpu-substrate-single` clause-F GREEN. The source gate follows the comment-strip + pure-detector house pattern (mirroring `proof-aurora-space-gamma.mjs`/`proof-flow-field.mjs`).

**Source witnesses (device-free CI half):**

1. **W1 — the radial Fourier bank is REAL.** `math.ts` evaluates `z(r,t) = Σ_{h=1..H} A_h·sin(k_h·r − ω_h·t + φ_h)` with `A_h = A_1/h^p` (the `1/h^p` falloff) AND the deep-water dispersion `ω_h = √(g_eff·k_h)` (NOT a single sinusoid, NOT arbitrary `ω`). RED at HEAD: no `math.ts`. **Bite (anti-evasion):** the gate asserts the falloff EXPONENT `p` is read from config (a hardcoded `1/h` linear falloff with no `harmonicFalloff` consumption fails the bank-is-real clause) AND the dispersion `√(g·k)` term is present (a fallback re-using a flat `ω=2πS/λ` for every harmonic fails the water-spectrum clause). The harmonic count `H` is the partial-sum lever (`harmonics` config consumed in the loop bound).
2. **W2 — the 3D rotate→perspective-project produces depth-attenuated width + the ellipsoidal-norm field.** `math.ts` builds `P`, applies `Rx(α)·Rz(β)`, perspective-divides (`s=f/P_cam.z`), and emits a per-vertex `lineWidth = baseWidth/P_cam.z` (the aerial-perspective thinning, `variant="rings"`); AND the `ringField()` surface evaluation uses the ellipsoidal norm `sqrt((dx/a)²+(dy/b)²)` (`variant="surface"`). RED at HEAD: no projection leaf. **Bite:** the gate asserts the width is `z`-attenuated (a flat per-ring width with no `1/z` divide fails the depth clause) AND the tilt `α` is consumed (a `tilt`-ignoring orthographic projection fails the rake clause) AND the ellipsoidal-norm `a,b` axes are eccentricity-derived (a circular-only `length()` fails the ellipsoid clause).
3. **W3 — ONE shared `math.ts` leaf, consumed by BOTH backends (round-trip).** The WebGL2 path imports `math.ts` (the CPU vertex gen / the fragment-port literally agrees) AND the WGSL mirrors the SAME bank+projection (asserted by a structural marker — the WGSL carries the same `A_h/h^p`/`√(g·k)`/`Rx·Rz`/perspective-divide/ellipsoidal-norm forms, named in a leaf-parity manifest the gate reads) AND a unit round-trip test asserts the TS `ringField()` and a re-implemented-in-test WGSL-form agree at sample points. RED at HEAD: neither backend exists. **Bite:** the gate asserts `useConcentricGeometry.ts` (the WebGL2 CPU path) imports `math.ts` and does NOT re-implement the bank inline (a second math copy in the WebGL2 path fails the one-source clause — the AV.W1 two-copy class on the math leaf).
4. **W4 — warm-identity DEFAULT, no demo hue in a library token.** `presets.ts` ships exactly ONE preset resolving the warm-cream/foreground identity ramp through the OKLCh seam; NO `--concentric-*` token carries a literal teal/navy/violet hue, and `presets.ts` imports the ColorResolver/value.js OKLCh core (no re-implemented OKLCh math). RED at HEAD: no presets. **Bite:** the gate greps the library token set + `presets.ts` for a baked demo hue (a teal/navy literal in a `--concentric-*` token or the default preset fails the presets-in-consumers clause); the themed looks must live in `demo/stories/substrates/concentric.vue`/`presets.ts` (a consumer).
5. **W5 — Gerstner steepness is normalized below the loop.** `math.ts` applies `Q_h = Q/(k_h·A_h·H)` per harmonic (NOT a raw `Q` per harmonic) AND the studio clamps `steepness ≤ 0.85`. RED at HEAD: no Gerstner leaf. **Bite:** the gate asserts the per-harmonic divisor `(k_h·A_h·H)` is present (a raw `Q·A·cos Φ` with no `H`/wavenumber normalization fails the no-loop clause); the π's no-self-intersection check at max steepness is the binding render-side proof.
6. **W6 — composes the substrate twin, no second bootstrap.** `useConcentric.ts` composes `useGpuSubstrate`/`useWebGPUCanvas` (W-GPU-SUBSTRATE) for WebGPU and `useWebGLCanvas` for the fallback, and contains NO direct `navigator.gpu.requestAdapter`/`getContext("webgpu")`/`getContext("webgl2")` bootstrap (those live ONLY in the substrate twin — `proof:gpu-substrate-single` clauses A/B). RED at HEAD: no composable. **Bite:** the gate greps `composables/*.ts` for a direct `requestAdapter`/`getContext` call (a third bootstrap fails the no-fork clause; `proof:gpu-substrate-single` clause A is the cross-gate twin).

**The binding Playwright π** (`tests-visual/concentric.spec.ts` — own-surface, BOTH modes, headless, the cardinal-lesson DELTA):

- **(a) the field ANIMATES live** — over `N≥2` frames at the default config, the rendered ground changes (a `getImageData` per-frame delta above a motion floor), proving the wave traverses.
- **(b) PRM FREEZES it** — under emulated `prefers-reduced-motion: reduce`, the field paints ONE static frame and the per-frame delta drops to ZERO (the substrate-PRM freeze), and the static frame still reads as an elegant raked-rings hero (not blank).
- **(c) the rings RENDER + INTERFERE over the dark ground** — the composited frame shows the concentric stroke/band field (a radial-profile readback: stroke/band peaks at ring radii, troughs between; a radial-periodicity FFT/spatial-frequency assert proving concentric rings; for `centers>1` the multi-center beat structure — the field is NOT a flat slab and NOT empty).
- **(d) the WebGPU↔WebGL2 PARITY holds** — a forced `backend:"webgpu"` capture and a forced `backend:"webgl2"` capture over the SAME config+seed+frozen-t agree within the calibrated OKLab-ΔE band (the gate FACT; cross-backend equivalence, NOT a byte-match). On a headless runner with no `navigator.gpu`, the WebGPU arm falls to WebGL2 and the parity is the WebGL2-vs-itself identity (the fallback's faithful-headless requirement) — the binding GPU-vs-GL parity runs on the local Metal/dev-box (the live-verification `local`-only architecture); CI runs the source witnesses + the WebGL2 render/PRM/animate readback.
- **(e) no self-intersection at max steepness** — at `steepness:0.85` the ring radial profile is monotone-non-crossing (the Gerstner-loop check).
- **(f) renders at 1x AND 2dppx** — the projection-aliasing check (the far rim reads, no moiré collapse).

**The DELTA capture (the cardinal-lesson discipline):** `docs/tranches/BB/audit/visual/W-VIZ-CONCENTRIC-DELTA.md` records the own-surface captures (the live animated frame-series, the PRM-frozen static frame, the WebGPU vs WebGL2 parity pair + recorded ΔE, the max-steepness no-loop frame, the 1x/2dppx pair) with the **AZ-form freshness header** — capture date, HEAD sha, the surface route path(s), a sha256 surface-hash of the captured surface files, and the config seed — BOTH modes:

```
<!-- surface-paths: src/components/custom/concentric/Concentric.vue,src/components/custom/concentric/shaders/concentric.surface.wgsl,src/components/custom/concentric/shaders/concentric.compute.wgsl,src/components/custom/concentric/shaders/concentric.render.wgsl,src/components/custom/concentric/math.ts -->
<!-- surface-hash: <sha256 hex of those files' bytes at capture time> -->
```

A claim of "live-verified" with no own-surface DELTA capture + paired-π is the cardinal-lesson inflation (forbidden). Plus the parity capture-PAIR (the WebGPU PNG + the WebGL2 PNG + the recorded OKLab ΔE) for the `proof:gpu-substrate-single` clause F(iii) on-disk artefact.

**The `proof:ba-gestalt` verdict** (BA inv-4 — the P-1 close-class fix): per-mechanism W1–W6 greens do NOT close this visual wave. The owning surface (the substrates band — the concentric hero on the gestalt roster) is captured WHOLE-PAGE, BOTH modes, over its real backdrop, and judged as a gestalt ("does the concentric field read as ONE coherent undulating water sheet seen at a rake — the elegant procedural strokes/bands with real depth, the flowing crest, the ring interference — not stacked flat circles or a moiré shimmer?"). The verdict is recorded with the capture; a FAIL deploys the research→wave-spec→redress triumvirate (W-REFLECT3, Batch 7). A source-green/visually-broken gap does NOT close.

## Format And Lint Cadence

`npm run typecheck` (vue-tsc) after the `math.ts`/`constants.ts`/`presets.ts` leaf + the component/composables (the `ConcentricConfig` must thread cleanly through `useConcentric` + the api surface); `npm run build` after the component + subpath barrel (confirm the `/concentric` chunk compiles + the WGSL chunks emit + does NOT transitively drag the root barrel); `node scripts/proof-concentric.mjs` born-RED before the source lands (proof it fails on the absent files), GREEN at close; `node scripts/proof-colocation.mjs` GREEN (the new README-bearing dir satisfies the four §6 clauses — confirm the `.wgsl` regex status §0-DRIFT); `node scripts/proof-storybook-complete.mjs` GREEN (the `/concentric` subpath has its story); `node scripts/proof-gpu-substrate-single.mjs` GREEN (composes the twin, no second bootstrap, the parity-table concentric row resolves — clause F); `npm run proof:webgl-substrate-single` GREEN (the fallback intact); `npm run verify-export-types` GREEN (the `/concentric` dts publication); the headless π (`concentric.spec.ts`) with NO `--use-gl=angle` for the WebGL2 render/PRM/animate readback (the parity GPU arm runs local); `npm run proof:gate-script-parity` + `npm run proof:gate-manifest-sound` after the package.json/script registration; `git diff --stat` on `aurora.frag`/`metaball.frag` empty (the fence); `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BB/audit/visual/W-VIZ-CONCENTRIC-DELTA.md` — the own-surface captures (live frame-series, PRM-frozen static, WebGPU↔WebGL2 parity pair + ΔE, max-steepness no-loop, 1x/2dppx) + the AZ-form freshness header (date, HEAD sha, route paths, sha256 surface-hash, seed) + the born-RED→GREEN gate logs, BOTH modes.
- The `proof:concentric` JSON artefact (the six source witnesses born-RED log → GREEN-at-close log, including the bite self-tests).
- The `proof:colocation` + `proof:storybook-complete` + `proof:gpu-substrate-single` (clause F concentric row resolves) + `verify-export-types` GREEN outputs.
- The `gate-script-parity` + `gate-manifest-sound` outputs post-registration.
- The `proof:ba-gestalt` substrates-band capture + recorded verdict (the W-REFLECT3 binding evidence).
- The appended `docs/tranches/BB/audit/gpu-parity-table.md` concentric row (`.wgsl` primary + `.frag`/`.vert` fallback + the parity status + ΔE).

## Commit Plan

- math-leaf commit (`.1`): `feat(concentric): the pure radial-Fourier-bank + Gerstner + 3D-project math leaf (BB.W-VIZ-CONCENTRIC)` — body names the radial Fourier bank (`A_h/h^p` + `ω=√(g·k)` dispersion), the ellipsoidal-norm ring field, the Gerstner per-harmonic steepness normalization, the rotate→perspective-project with depth-attenuated width, the constants/presets (warm-identity default).
- component+backends commit (`.2`): `feat(concentric): Concentric component — WebGPU-first (surface fragment + rings compute/render WGSL) with the WebGL2 graceful fallback (BB.W-VIZ-CONCENTRIC)` — body names the substrate-twin compose (no forked schedule), the two registers off one engine, the ONE shared math leaf across both backends, the subpath, the studio story.
- gate commit: `test(concentric): proof:concentric born-RED→GREEN + the headless animate/PRM/render+interfere/parity/no-loop π + the parity-table row`.
- doc/status commit: the CLAUDE.md Concentric canon record + the README + the PROCEDURAL-SUITE member row + the DELTA + the BB PROGRESS row.

## Dependencies

- **Depends on (within W-VIZ-SUITE's serial chain)**: **W-GPU-SUBSTRATE** (lands `useWebGPUCanvas`/`useGpuSubstrate` + generalizes `proof:webgl-substrate-single` → `proof:gpu-substrate-single` + the parity table + the suite README — the SUITE's WebGPU-first architecture home, per `BB-AMENDMENT-coherence-harden.md §3`) and **W-FLOWFIELD** (the suite's first NEW WebGPU-first viz — proves the compute+render pattern this viz is born onto; this viz is the next link in the serial chain so it does not conflate substrate/sibling bugs with its own). It also reads (never edits) the existing aurora/fourier-field/constellation feature-dirs for the colocation + studio + math-leaf conventions, the OKLCh/ColorResolver seam for the warm-identity palette, and `aurora/constants/shaders/procedural-color.wgsl.ts` (post-W-AURORA-WGPU — the shared WGSL include this viz splices for the OETF + OKLCh matrices).
- **Blocks**: nothing hard inside glass-ui. It is the LAST of the suite's two NEW WebGPU-first viz; its close completes `proof:gpu-substrate-single` clause F (all four migrated/new rows resolve) and the PROCEDURAL-SUITE family doc.
- **Coordinates with**: **W-FLOWFIELD** (the sibling NEW viz — the dot flow-field) — bound-disjoint on the feature-dir (own `dot-flow-field/` dir/subpath/gate), they meet only at the shared substrate twin (read) + the shared barrels/manifest/parity-table/api/presets (single-owner SEQUENCED append — W-FLOWFIELD first, then concentric — the suite's serial chain orders them; the registry single-owner rule).

## Archaeology

No prior glass-ui concentric viz. The substrate FAMILY is established (aurora the painterly nuclei-field, fourier-field the epicycle sum, constellation the proximity lattice, goo-blob the metaball, watercolor the seeded blob, dot-flow-field the curl-noise streamlines), and the WebGPU pilot (`glassShader.wgsl`) has sat consumer-less since the AT.W2 webgpu-allowlist anticipated a second substrate. The June-2026 WebGPU-Baseline status dissolved the AV.W deferral's sole rationale (the value.js-premise-dissolved pattern), and the user's verbatim "ALL of our visualizations, from fourier to aurora, should be WebGPU first when possible" (2026-06-16) directed the revisit — recorded in `BB-AMENDMENT-coherence-harden.md §3`, not a silent reversal. This viz is born into that revisit as the suite's final NEW member: the cleanest WebGPU-first surface (net-new WGSL, no `.frag`→`.wgsl` port to verify for the surface variant — the same clean fragment shape-class as aurora). The guardrails carried from the AZ/BA visual-close lessons: the W3 bite asserts ONE math leaf across both backends with a round-trip (the source-green/two-divergent-paths gap is the AZ failure class), and the π's binding truth is the RENDERED cross-backend parity + the PRM freeze + the ring-interference + the no-self-intersection (the "green gate, broken paint" P-1 lie the BA gestalt bar kills), not the source-presence alone.

## Named successors

- **The Tessendorf FFT ocean** — the full inverse-FFT-of-a-Phillips-spectrum higher-fidelity water (a compute FFT pass). The ship default is the explicit sum-of-radial-Gerstner bank (`H≈4..8`); the FFT is the NAMED successor for a richer water sheet, booked (it needs the compute-FFT scaffolding, a later wave). The `spectrum: "power-law" | "phillips"` axis is the first step (the Phillips amplitude falloff `A_h ∝ exp(−1/(k_h·L)²)/k_h²`), booked behind the default `1/h^p`.
- **The Bessel eigenmode bank** — `z = Σ A_h·J_0(k_h·r)·sin(ω_h·t)`, the physically-exact axisymmetric radial bank (the rigorous alternative to the `sin(k·r)` large-`r` asymptote the default approximates). Booked as the "rigorous radial-bank" option behind a `bank: "sine" | "bessel"` axis if a consumer needs the exact pond-membrane mode.
- **The per-ring LOD tier** — if the max-N `variant="rings"` preset misses the budget under throttle (risk 1), the False-Earth distance-tier angle-sample LOD (fewer samples on far/small rings) is the booked perf successor; the ship default rides the sane `N=14` + the instanced one-draw-call path + the `variant="surface"` cheap default.
- **The aurora/fourier-field WebGPU migration** — the booked per-viz `.frag`→`.wgsl` port (the substrate twin's other consumers, the twin's ≥2-consumer justification realized). W-AURORA-WGPU + W-GOOBLOB-WGPU are EARLIER links in this suite's serial chain; the fourier-field/constellation/watercolor migration is the per-viz "where the WGSL port is clean + beneficial" follow per the amendment's directive — a separate later wave.
- **The `variant="rings"` always-on fidelity** — if the geometric raked-line rings prove they clear the budget on capable devices, the always-on rings register (or `"rings"` as the default) is the booked fidelity successor (the morph-showcase §7 perf-gated-preview precedent); the safe ship default is the `"surface"` field.

## FOLD

W-VIZ-CONCENTRIC is **W-VIZ-SUITE.e (W-CONCENTRIC)** — the fifth and final serial sub-wave of BB's WebGPU-first procedural-animation suite (`BB-AMENDMENT-coherence-harden.md §3`). It runs after **W-GPU-SUBSTRATE** (the `useWebGPUCanvas` twin + `proof:gpu-substrate-single`), **W-AURORA-WGPU** + **W-GOOBLOB-WGPU** (the migrations that prove the WGSL-port pattern), and **W-FLOWFIELD** (the first NEW WebGPU-first viz — the dot flow-field, the reference image's literal target — that proves the compute+render pattern). It is the suite's second NEW viz, born WebGPU-first; with W-FLOWFIELD it realizes the substrate twin's ≥2-consumer visual-load-bearing bar and completes `proof:gpu-substrate-single` clause F (all four migrated/new rows resolve). Its close + the PROCEDURAL-SUITE family doc confirm the suite is WebGPU-first end-to-end across all seven members (aurora · goo-blob · dot-flow-field · concentric · fourier-field · constellation · watercolor-dot). It belongs in the substrates/viz band beside its siblings, scoped to the hero/landing + its studio story under the one-GL-context-per-route budget.
