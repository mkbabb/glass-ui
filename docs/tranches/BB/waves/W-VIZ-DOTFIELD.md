# BB.W-VIZ-DOTFIELD — the dot flow-field substrate (curl-of-Fourier streamline ribbons, WebGPU-first)

**Name**: W-VIZ-DOTFIELD — the dot flow-field wave background (streamline-seeded dots over a Fourier-defined curl field, WebGPU-first / WebGL2-fallback)
**Opens after**: Batch P open (the PRIMITIVES/VIZ band — runs ‖ the rest of the W-VIZ-SUITE cohort; SEEDS + then COMPOSES the net-new `useWebGPUCanvas` substrate the suite shares). Soft-reads the suite's substrate decision: this wave is the FIRST consumer of `useWebGPUCanvas`, so it either lands the minimal WebGPU lifecycle backend itself (the seed) OR composes the suite-shared leaf if a sibling lands it first — the §0 RE-GROUND resolves which at HEAD. File-disjoint from the other viz waves (its own `custom/dot-flow-field/` dir + its own gate/π/story).
**Agents**: 2 serial within the wave (`.1` lands the WebGPU substrate seed + the field math + the WGSL compute/render pair + the WebGL2 transform-feedback fallback — the engine; `.2` lands the `DotFlowField.vue` SFC + the `useDotFlowField` driver + the configurator studio + the substrates story + the gate/π/DELTA — the surface. `.2` reads the engine contract `.1` makes concrete — the `useDotFlowField` handle shape + the uniform-pack form — so they sequence, never parallel).
**Hard gate**: `proof:viz-dotfield` (born-RED) — four falsifiable SOURCE witnesses (the field is the CURL of a Fourier-bank potential — divergence-free by construction, NOT a jittered grid; the WGSL `psi()` and the GLSL-ES `psi()` share the SAME mode-bank synthesis form — the parity-by-construction floor; the library DEFAULT config is warm-identity with NO teal/navy literal in any library token; all randomness routes through `src/utils/prng.ts` — deterministic seed) + the binding headless π readback (the field ANIMATES; PRM freezes it to ONE static frame; the dots render as streamline ribbons; the WebGPU-vs-WebGL2 output parity holds within the certify band over one seed at a fixed `renderAt(t)`) + the `proof:ba-gestalt` substrates-band verdict + `proof:colocation` (the feature-dir layout) + `proof:storybook-complete` (the flagship story present) + `proof:webgl-substrate-single` STAYS GREEN (the WebGPU sibling forks NO second lifecycle).
**Status**: SPEC

## Goal criterion

This wave succeeds if glass-ui ships a `DotFlowField` substrate that reads as the reference: small dots seeded ALONG undulating streamlines, rippling in coherent flowing ribbons like wind/fabric/water (the "Claude co-work" dot-wave aesthetic — `docs/tranches/BB/audit/viz-ref/dot-flow-field-reference.jpg`), NOT a rigid jittered grid and NOT a converging swirl. The field is REAL math — a divergence-free curl of a truncated 2D Fourier-series potential (Bridson 2007 curl-noise over a Tessendorf/Gerstner directional-wave bank), traced by streamline-seeded particles (the wind-map register), born WebGPU-first (`navigator.gpu` feature-detect) with a luminance-faithful WebGL2 transform-feedback fallback. It is visual-load-bearing: it ships with the flagship substrates story (the configurator studio, the aurora editable-baseline model) AND a documented single-flagship-demo path; the library default palette is warm-cream identity, the reference's teal-on-navy lives ONLY in a DEMO preset (presets-in-consumers). The discipline is INHERITED, not re-authored: offscreen-pause, the live-PRM one-static-frame freeze, the DPR policy, and the three-reason suspend Set ALL come from `createCanvasLifecycle` (the leaf the two backends compose). A wave whose per-mechanism gates pass but whose field reads as a grid (not ribbons) closes `complete_with_misses`, NOT `complete` — the `proof:ba-gestalt` gestalt verdict (BA inv-4) is the binding close decision, not the W1-W4 source greens.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the user's design target (`docs/tranches/BB/audit/viz-ref/dot-flow-field-reference.jpg` — teal dots over deep navy, seeded along undulating diagonal ↘ streamlines, coherent flowing ribbons with sparse troughs and bright crests) + the user's verbatim directive (2026-06-16): "ALL of our visualizations, from fourier to aurora, should be WebGPU first when possible" + "water-like waves that are Fourier-defined, 3D-rendered-to-2D" + "the procedural-animation should cover: the blob, aurora, constellation, fourier field, etc, too—extant items, too." It does NOT blind-rebuild the substrate or the color seam — it RE-GREPS them at HEAD and COMPOSES them (the §0 discipline; a stale cite is re-located, never trusted). Before touching a byte, the impl agent re-greps each anchor below and confirms the substrate seam shape, the colocation convention's auto-enrollment marker, the WebGPU pilot's status, and the configurator-state contract.

**The HEAD reality (CONFIRMED this authoring 2026-06-16 — the seam shapes the wave plugs into):**

1. **The shared canvas lifecycle leaf is backend-agnostic and already correct (the compose target, NOT a rebuild).** `createCanvasLifecycle` (`src/composables/glass/webgl/createCanvasLifecycle.ts`, ~10.6 KB; CONFIRMED present) owns the three-reason suspend `Set` — the `CanvasSuspendReason` union is `"tab-hidden" | "off-screen" | "off-screen-io" | "manual"` (FOUR keys; the AX.W16 F6 split gives the content-visibility path `"off-screen"` and the IntersectionObserver fallback its OWN `"off-screen-io"` key — the spec's earlier "three-reason" prose trails the source; the gate counts the union, not the prose). It owns the rAF tick/wake demand gate, the `visibilitychange`/`document.hidden` owner, the `contentvisibilityautostatechange` offscreen-park, and the LIVE `prefers-reduced-motion` re-monitor (one static frame then park; re-arms on un-reduce via a `matchMedia` `change` listener). Its OWN header (lines 1-20) names the charter VERBATIM: "a thin context wrapper shares the EXACT same machinery — no forked second copy (the AV.W1 two-copy class)". The seam a backend hands the leaf is `CanvasFrameHooks` (`frame: (timeSec)=>void`, `shouldContinue: ()=>boolean`, `time?: (elapsedSec)=>number`, `teardown?: ()=>void`) returned from a `buildContext: () => CanvasFrameHooks` (called on `arm()` AND on a context-restore), plus `resize: () => void` (the consumer owns its DPR policy) and a `mode?: "live" | "capture"` (capture pre-seeds the `manual` suspension so the loop never auto-runs — `renderAt` draws). `useWebGLCanvas` (`webgl/useWebGLCanvas.ts`, ~70-line header CONFIRMED) is the WebGL2 thin backend over it (the `getContext("webgl2")` acquisition + the `webglcontextlost`/`restored` self-heal + the `ResizeObserver` + the consumer `setup`/`frame`/`resize`/`time` hook seam). The NEW `useWebGPUCanvas` is the SIBLING thin backend this wave seeds — the SAME leaf composition, a distinct context acquisition (`navigator.gpu.requestAdapter()`/`requestDevice()`), NO new schedule (the W-CANVAS-UNIFY single-substrate discipline is binding — a forked second lifecycle REDs `proof:webgl-substrate-single`'s single-source class, CONFIRMED present at `scripts/proof-webgl-substrate-single.mjs`).
2. **The WebGPU pilot is consumerless (the seed point).** `src/composables/glass/webgpu/glassShader.wgsl` (~6.4 KB; CONFIRMED — it is the ONLY file in `webgpu/`, NO `useWebGPUCanvas.ts` yet) is an EXISTING WGSL glass shader with NO consumer. It carries the exact convention to MIRROR: `struct Uniforms { resolution: vec2f, …, time: f32, _pad: f32 }` with explicit alignment padding, `@group(0) @binding(N) var<uniform> u: Uniforms`, and the `hash21`/`noise`/`fbm` value-noise idiom (lines 8-55). This wave is the FIRST real WebGPU consumer: it authors a NEW `dotFlowField.wgsl` (compute + render) in its own feature-dir `shaders/`, and seeds `useWebGPUCanvas` as the substrate. The pilot `.wgsl` is READ for convention — it is NOT edited (it stays the glass-shader seed for a future glass-WebGPU wave; editing it is a named fence breach).
3. **The colocation convention auto-enrolls a README-bearing feature-dir (`proof:colocation`).** The gate (`scripts/proof-colocation.mjs`, CONFIRMED; `deriveTargetDirs()` at lines 59-65) DERIVES its target set off the `README.md` adoption marker (clause (d)) — a `custom/<dir>/` becomes a colocation target the moment it carries a `README.md`. The four clauses: (a) every `^use[A-Z]`/`*Context.ts` composable lives under `<dir>/composables/` (NOT the package root); (b) a `<dir>/constants.ts` exists AND no composable carries a surviving module-scope `const [A-Z_]{3,} = <number>` magic-number outside it; (c) any `*.frag.ts`/`*.vert.ts`/`*.glsl.ts`/`*Skeleton.vue` asset lives in a named `shaders/`/`skeleton/` subdir; (d) a `<dir>/README.md` exists. So `custom/dot-flow-field/` is auto-bound the instant its README lands — the impl agent MUST build the dir to that shape FROM THE START (the gate is not optional; the named magic numbers — `g`, `breathPeriod`, the octave count, the size/alpha coefficients, the workgroup size — MUST live in `constants.ts`, NOT inline in a composable). Note the `.wgsl` extension is NOT in clause (c)'s enumerated list (`.frag.ts`/`.vert.ts`/`.glsl.ts`) — but the README documents the `shaders/` home and the wave PLACES every shader there regardless (the convention's spirit; if the gate must learn `.wgsl`, that is a single-line clause-(c) extension the gate owner lands, recorded as a §0 reveal).
4. **The configurator studio model is aurora's (the compose target).** `useConfiguratorState` (`src/components/custom/configurator/useConfiguratorState.ts`) with `cloneMode="per-preset"` is the editable-baseline studio pattern aurora uses (CLAUDE.md §Configurator — "Aurora consumes `cloneMode='per-preset'` because its chrome treats each preset as a named editable baseline the user tunes and returns to"). The dot-flow-field studio composes it identically. Aurora's feature-dir is the studio MODEL: `composables/` (10 files incl. `useAurora.ts`), `constants/` (with a nested `constants/shaders/`), `Aurora.vue`, `README.md`/`DESIGN.md`/`RESEARCH.md`, `index.ts` (CONFIRMED via `ls -R`).
5. **The PRNG single-source is the determinism leaf.** `src/utils/prng.ts` (CONFIRMED — exports EXACTLY `mulberry32(seed: number): () => number` and `hashString(str: string): number`; no other export) is the house single-source the watercolor-dot + goo-blob seed from. The dot-flow-field Poisson seeding + the per-mode Fourier phase seeding route through it — same `seed` ⇒ byte-reproducible field (the determinism the gate + the parity π require; the goo-blob free-clock lesson — a free-running `uTime` breaks capture-reproducibility, so the capture path renders at a fixed `t` offset via the substrate's `mode:"capture"` + `renderAt`).

```
# RE-GROUND command set — run all; confirm each seam at HEAD before any edit.

# 1. The shared canvas lifecycle leaf (the compose target — DO NOT fork)
sed -n '1,90p'   src/composables/glass/webgl/createCanvasLifecycle.ts   # the backend-agnostic core + the CanvasSuspendReason 4-key union + CanvasFrameHooks + buildContext/resize/mode seam
sed -n '1,90p'   src/composables/glass/webgl/useWebGLCanvas.ts          # the WebGL2 thin-backend exemplar (getContext/contextlost-restored/ResizeObserver/setup-frame-resize-time + mode:"capture"/renderAt)
node scripts/proof-webgl-substrate-single.mjs                          # the single-source rule the WebGPU sibling must NOT break (no forked lifecycle) — MUST STAY GREEN

# 2. The WebGPU pilot (the seed — READ, never edited)
sed -n '1,55p'   src/composables/glass/webgpu/glassShader.wgsl          # the struct Uniforms / _pad alignment + @group(0) @binding(N) + hash21/noise/fbm convention
ls src/composables/glass/webgpu/                                        # confirm NO useWebGPUCanvas yet (this wave seeds it)

# 3. The colocation convention (auto-enrollment off README.md)
sed -n '1,70p'   scripts/proof-colocation.mjs                          # the README-marker target derivation (deriveTargetDirs) + the (a)-(d) clauses
ls -R src/components/custom/constellation/                             # a colocation MODEL (components at root, composables/, constants.ts, README.md)
ls -R src/components/custom/aurora/                                    # the studio MODEL (composables/ + constants/{shaders} + README/DESIGN/RESEARCH)

# 4. The configurator studio model (aurora's editable-baseline pattern)
grep -n 'cloneMode\|per-preset' src/components/custom/configurator/useConfiguratorState.ts
grep -niE 'useConfiguratorState|cloneMode' src/components/custom/aurora/composables/useAurora.ts   # the per-preset studio compose

# 5. The PRNG single-source (determinism) + the substrates band manifest
sed -n '1,26p'   src/utils/prng.ts                                     # mulberry32 + hashString — route ALL randomness here
sed -n '100,150p' demo/stories/manifest.ts                             # the per-category bg map (substrates → "aurora" live-GL cluster) + the one-GL-per-route budget

# 6. The gate + subpath plumbing this wave registers
grep -n '"proof:colocation"\|"proof:storybook-complete"\|"proof:webgl-substrate-single"\|"proof:ba-gestalt"\|"proof:aurora-space-gamma"' package.json
grep -n '"./aurora"' package.json ; cat src/subpaths/aurora.ts        # the subpath + typesVersions shape + the one-line mirror barrel to clone for ./dot-flow-field
sed -n '1,60p'  scripts/proof-aurora-space-gamma.mjs                   # the SOURCE-witness gate pattern to mirror (regex-form witness + violations[] + self-test bite)
node scripts/proof-storybook-complete.mjs                              # the visual-load-bearing demo-story floor
```

Captures / authority cross-references:
- `docs/tranches/BB/audit/viz-ref/dot-flow-field-reference.jpg` — the user's design target (READ it; the aesthetic is the streamline-ribbon dot field, not a grid).
- The user's verbatim WebGPU-first directive (2026-06-16) + the "Fourier-defined water waves, 3D-rendered-to-2D" + "cover the extant viz too (blob/aurora/constellation/fourier)" ask.
- `src/composables/glass/webgl/createCanvasLifecycle.ts` + `useWebGLCanvas.ts` (the compose target — the substrate this wave's two backends ride).
- `src/composables/glass/webgpu/glassShader.wgsl` (the WebGPU seed — convention only, never edited).
- W-VIZ-SUITE (the cohort plan) — the suite that the other procedural-viz waves ride; this wave is the FIRST consumer of the shared `useWebGPUCanvas` and the NAMED WebGPU-substrate seed for the suite (aurora/fourier/constellation/blob migrate WebGPU-first on later suite waves; that arc is the NAMED successor, NOT this wave).

## The aesthetic target table (the reference image — what the field MUST read as)

| trait | the reference shows | the mechanism that produces it |
|---|---|---|
| coherent flowing RIBBONS, never bunching | long undulating parallel dot-lines that neither converge to a sink nor explode | the flow is the CURL of a potential — `v=(∂ψ/∂y,−∂ψ/∂x)` is divergence-free (`∇·v=0`) BY CONSTRUCTION (Bridson 2007); streamlines are the level-sets of ψ, so they stay parallel-coherent |
| the long-wave ROLL (water-like cadence) | big rolling swells overlaid with fine ripple | ψ is a truncated 2D Fourier bank (`A_k ∝ 1/k`, 1/f falloff — first modes dominate the silhouette); the temporal frequency `ω_k=√(g·κ_k)` (deep-water dispersion) makes long waves roll SLOWER than short ripples — the Tessendorf cadence |
| dots seeded ALONG lines, gaps BETWEEN ribbons | dots trace the streamlines; the inter-ribbon gaps are dark | two-tier placement: Poisson-disk SEED scatter (even ribbon spacing, no clumping) → forward-Euler TRACE of `L` dots per seed along the curl field (the wind-map streamline trace) |
| bright crests, sparse troughs | dots brighten on wave ridges, thin out in calm zones | the Gerstner height `h` drives per-dot `alpha = baseAlpha·(0.4+0.6·crest)`; `fadeByMagnitude` fades low-`|v|` dots toward transparent (the calm-trough thinning) |
| size variation along the flow | dots grow on fast flow | `size = lerp(sizeMin,sizeMax,smoothstep(0,vMax,|v|))` |
| organic breakup (not laminar-rigid) | the ribbons wander/break naturally | a low-amplitude FBM curl-noise term added to ψ (the `turbulence` axis — Bridson curl-noise seasoning over the clean Fourier ribbons) |
| the slow atmospheric breath | the whole field gently swells | `A_k·(1+breathDepth·sin(2π t/breathPeriod))` — mirrors aurora's calmest non-dead `breathing` register |

## The DESIGN — the field math (REAL, named-SOTA, with equations)

The model is a HYBRID **"potential-flow + directional-Fourier-warp"** field traced by streamline-seeded dots — the only model that produces the reference's coherent undulating dot-ribbons (recorded WHY-NOT for the alternatives below). Three named, load-bearing pieces.

### (A) The flow direction — divergence-free curl of a scalar potential (Bridson 2007)

The flow VECTOR at world point `p=(x,y)` at time `t` is the 2D curl of a scalar potential `ψ(p,t)`:

```
v(p,t) = ( ∂ψ/∂y , −∂ψ/∂x )
```

computed by central finite differences with epsilon `ε` (≈1px in field-space):

```
dψx = ψ(x+ε, y, t) − ψ(x−ε, y, t)
dψy = ψ(x, y+ε, t) − ψ(x, y−ε, t)
v   = ( dψy , −dψx ) / (2ε)          // the 90°-rotated gradient ⇒ exactly divergence-free (∇·v = 0)
```

The 90°-rotated-gradient identity is WHY the dots trace continuous ribbons that never bunch into sinks/sources (the reference's defining trait — the field neither converges nor explodes). This is **Bridson, Hourihan, Nordenstam, "Curl-Noise for Procedural Fluid Flow" (SIGGRAPH 2007)**, the canonical procedural-flow primitive. The exact finite-difference form `(dY,−dX)/(2δ)` + the FBM octave blend follow **Emil Dziewanowski, "Dissecting Curl Noise"**.

### (B) The potential ψ — the user's "Fourier-defined waves" (a truncated 2D Fourier series, NOT raw Perlin)

The flowing-fabric/ocean ripple is exactly a BAND of directional waves summed — a truncated Fourier synthesis (`N` = `directionCount`, default 5):

```
ψ(p,t) = Σ_{k=1..N}  A_k(t) · sin( κ_k · (D_k · p) − ω_k·t + φ_k )   +   turbulence · fbmCurl(p + panSpeed·t)
```

where for each mode `k`:
- `D_k = (cosθ_k, sinθ_k)` — a unit direction; `θ_k` fans `±directionSpread` around `flowAngle` (laminar at spread 0, isotropic at 90).
- `λ_k = wavelength / k` — per-mode wavelength (the base scale divided down the bank); `κ_k = 2π/λ_k` is the wavenumber.
- `A_k(t) = (waveAmplitude / k) · (1 + breathDepth·sin(2π t/breathPeriod))` — amplitude with the **1/f spectral falloff** (the first modes dominate the silhouette; higher modes add fine ripple), modulated by the slow breath.
- `φ_k` — a phase SEED (deterministic, `mulberry32(hashString(seed + ":" + k))() · 2π`).
- `ω_k = √(g·κ_k)` — the temporal frequency from the **deep-water DISPERSION relation** (Tessendorf §dispersion) — long waves roll slower than short ripples (the "water-like" cadence the user named). `g` is a tuned gravity constant in `constants.ts` (NOT 9.81 m/s² — a normalized-space constant chosen so the default cadence reads, ≈3.0).

Because `v` is the curl of this Fourier potential, the STREAMLINES are the level-sets of ψ — undulating parallel ribbons, exactly the reference. The added FBM curl-noise term (2-3 octaves, weight ×0.5/octave, scrolled `p + panSpeed·t`) is the `turbulence` axis — organic breakup without losing coherence (the Bridson curl-noise "seasoning" over the clean Fourier ribbons). This is **Tessendorf, "Simulating Ocean Water" (Clemson coursenotes 2001/2004)** — the height-field-as-sum-of-sinusoids + the dispersion timing — truncated to the analytic directional bank (the full IFFT2 Phillips-spectrum path is the NAMED ceiling/successor, §named successors).

### (C) The Gerstner warp — the "3D-rendered-to-2D" relief (Fournier-Reeves / GPU-Gems Ch.1)

To read as a height-shaded surface seen at a grazing angle, each dot's WORLD position is additionally Gerstner-displaced (trochoidal), for the SAME mode bank:

```
ϕ_k  = κ_k·(D_k·p) − ω_k·t                       // the per-mode phase (reuses κ_k, ω_k, D_k from ψ)
x'   = x + Σ_k Q_k·A_k·D_k.x·cos(ϕ_k)
y'   = y + Σ_k Q_k·A_k·D_k.y·cos(ϕ_k)
h    = Σ_k A_k·sin(ϕ_k)                           // the synthesized HEIGHT — drives per-dot shading
```

with `Q_k = steepness` (0 ⇒ pure sine ribbons; high ⇒ peaked crests). The **steepness clamp `Q·κ·A ≤ 1`** prevents self-intersecting trochoids (GPU-Gems Ch.1, Finch, "Effective Water Simulation from Physical Models"). `h` drives the per-dot SHADING — `crest = 0.5+0.5·h`, `alpha = baseAlpha·saturate(0.4+0.6·crest)` — giving the 2.5D relief banding the reference shows (bright ridges, dim troughs). This is the **"Fourier-defined water waves, 3D-rendered-to-2D"** ask: a Fourier/Gerstner height field projected to the dot plane. The Gerstner displacement is a per-dot VERTEX-stage offset (it perturbs the rendered dot position about its advected `pos`), NOT a re-advection — the advection is the curl field (A); the Gerstner term is the height-relief read (C). The two are summed at render.

### Dot placement — STREAMLINE-SEEDED (the reference's signature; NOT jittered-grid, NOT plain-Poisson)

Two-tier:
- **SEED tier** — scatter `S` seed points by **Poisson-disk (Bridson, "Fast Poisson Disk Sampling in Arbitrary Dimensions," SIGGRAPH 2007)** over the plane for even ribbon spacing (no clumping). Routed through `src/utils/prng.ts` so the seed scatter is deterministic.
- **TRACE tier** — from each seed, forward-Euler integrate the curl field for `L` steps (`path[i] = path[i−1] + v(path[i−1],t)·stepSize`), depositing a dot at each step ⇒ a ribbon of `L` dots along ONE streamline. Total `N = S·L` (default `S≈1000`, `L≈30` ⇒ ~30k dots). On the GPU this is the COMPUTE pass: each invocation owns ONE dot and advects it by the curl field one Euler step per frame (the streamline emerges as the dot's trail across frames + the per-ribbon offset seeding), so the trace is NOT a one-shot CPU pre-bake but the running advection — the wind-map model.
- **RESPAWN** — each dot carries a per-ribbon `age`; when `age > lifespan` OR the dot leaves the viewport it respawns at its fresh Poisson seed (`age=0`) — the standard **wind-map particle respawn** (anvaka/wind-lines, ESRI flow-layer) that keeps the field populated as it flows. A small per-dot `age` offset at seed time staggers respawns so the field never flickers all-at-once.

### Per-dot size & alpha as f(field)

```
size_i  = lerp(sizeMin, sizeMax, smoothstep(0, vMax, |v_i|))          // fast flow ⇒ bigger dots
crest_i = 0.5 + 0.5·h_i                                                // the Gerstner height → crest banding
magMask_i = mix(1, smoothstep(0, vMax, |v_i|), fadeByMagnitude)        // calm troughs thin out toward transparent
alpha_i = baseAlpha · saturate(0.4 + 0.6·crest_i) · magMask_i · ageFade_i
ageFade_i = smoothstep(0, fadeIn, age) · (1 − smoothstep(lifespan−fadeOut, lifespan, age))   // born-in / dying-out so respawn never pops
```

### Time evolution — the field BREATHES via three clocks

1. the Fourier phases advance `ϕ_k(t) = φ_k − ω_k·t` (the wave roll, dispersion-timed);
2. the curl-FBM domain scrolls `p + panSpeed·t` (turbulence drift);
3. a global slow breath multiplies amplitudes `A_k·(1 + breathDepth·sin(2π t/breathPeriod))` (the gentle swell — mirrors aurora's `breathing` register, `breathDepth≈0.06`).

`flowSpeed` scales ALL temporal terms. Under `prefers-reduced-motion: reduce`: freeze `t` at a fixed offset, render ONE static frame, park (the substrate's PRM contract — inherited from `createCanvasLifecycle`, NOT re-authored).

### WHY-NOT the alternatives (recorded, so a future agent does not re-litigate)

- **(b) pure sum-of-sines warping a base GRID** — gives a rippling grid, not ribbons; the reference is clearly NOT a grid (dots are seeded ALONG streamlines, with gaps BETWEEN ribbons). Rejected.
- **(d) full Tessendorf FFT (IFFT2 of a Phillips-spectrum complex field `h0(k)·e^{iω(k)t}`)** — the gold standard for a FULL ocean surface, but does NOT earn its `O(M²logM)` cost here: only `N≈5-12` directional modes produce the look, and the analytic Fourier sum is cheaper, deterministic, and trivially differentiable for the curl. **The NAMED ceiling/successor** if a future wave wants true spectral spread.
- **(a) raw curl-noise alone (FBM potential, no Fourier modes)** — nice turbulence but no long-wave ROLL; the directional Fourier bank IS the structure, curl-noise is the seasoning. Rejected as the sole field; KEPT as the `turbulence` term.

## The DESIGN — the WebGPU-first pipeline (WGSL compute + render)

Born WebGPU-first (`navigator.gpu` feature-detect) per the user's directive; WebGL2 the graceful fallback. The SOTA particle layout — confirmed against the live WebGPU-samples + workshop corpus (2025) — is instanced storage buffers, `@workgroup_size(64)` compute update, `ceil(N/64)` 1D dispatch with an `i < N` bounds guard, one instanced sprite render. The references: **Maxime Heckel, "A Field Guide to TSL and WebGPU" (2025)**; the **webgpu/webgpu-samples compute-shader particle samples** (the canonical ping-pong + instanced-draw pattern); **webgpufundamentals "Compute Shader Basics"** (workgroup_size 64 default + ceil-dispatch + the bounds guard).

### Storage + uniform layout (`dotFlowField.wgsl`)

```wgsl
struct Dot {                          // 32B, 16B-aligned (the instancedArray pattern)
    pos:      vec2<f32>,              //  8B  — current advected position (field-space)
    vel:      vec2<f32>,              //  8B  — last frame's curl velocity (drives size/alpha)
    seed:     vec2<f32>,              //  8B  — the Poisson seed (respawn target)
    age:      f32,                    //  4B
    ribbonId: f32,                    //  4B  — which ribbon (for the per-ribbon phase stagger)
}
@group(0) @binding(0) var<storage, read_write> dots: array<Dot>;   // N dots (5k-50k)
@group(0) @binding(1) var<uniform> U: Uniforms;

struct Uniforms {                     // WGSL-aligned (16B), uploaded once/frame
    resolution: vec2f, time: f32, flowSpeed: f32,        // 16B
    modeCount: u32, _pad0: u32, turbulence: f32, breathDepth: f32,   // 16B
    sizeRange: vec2f, baseAlpha: f32, fadeByMag: f32,    // 16B
    curlEps: f32, vMax: f32, dpr: f32, steepness: f32,   // 16B
    breathPeriod: f32, panSpeed: f32, lifespan: f32, gConst: f32,    // 16B
    modes: array<vec4f, 24>,          // 12 modes × 2 vec4: [k*2]=(dir.xy, λ_k, A_k), [k*2+1]=(ω_k, φ_k, _, _); modeCount gates the loop. (vec4 alignment is 16B — array stride is clean.)
    palette: array<vec4f, 4>,         // resolved stops (rgba, LINEAR)
}
```

The `vec4f` packing of the mode bank is deliberate: `array<vec4f, N>` has a clean 16B stride (no per-element padding surprises), so the `uploadDotFlowUniforms` TS writer fills a flat `Float32Array` 1:1 with the WGSL layout — and the SAME flat array re-packs as the GLSL-ES `uniform vec4 modes[24]` (one writer, two backends — the parity-by-construction win). All scalars are grouped into 16B rows with explicit `_pad` to dodge the WGSL struct-member alignment rules (the `glassShader.wgsl` `_pad` idiom).

### Compute pass — `@compute @workgroup_size(64)` (the SOTA default; ≤256 cap)

Dispatch `ceil(N/64)` workgroups, 1D. Per invocation `i = global_invocation_id.x` (guard `if (i >= arrayLength(&dots)) { return; }`):
1. eval ψ at `pos ± curlEps` (4 sites) by summing the Fourier bank + FBM curl-noise (a wgsl `fn psi(p: vec2f, t: f32) -> f32`); compute `v = vec2(dψy, −dψx) / (2·curlEps)`.
2. advect: `let dt = U.flowSpeed * FRAME_DT; dots[i].pos += v * dt; dots[i].vel = v; dots[i].age += dt;`
3. respawn: if `age > lifespan` OR `pos` offscreen ⇒ reset `pos` to `dots[i].seed`, `age = 0` (deterministic per seed; the seed was scattered Poisson on the CPU at init).

Compute is the right tool: `N≈30k × ~6 noise/Fourier taps = ~180k field evals/frame` — trivial on GPU compute, prohibitive on CPU; one dispatch updates ALL dots in parallel, no CPU round-trip.

**Single-buffer `read_write` vs ping-pong (the recorded SOTA choice).** The canonical WebGPU particle pattern is PING-PONG double-buffering (read buffer A, write buffer B, swap each frame) to avoid read-write hazards. That hazard exists ONLY when an invocation reads a NEIGHBOR'S slot (a flocking/SPH kernel). Here each invocation reads and writes ITS OWN slot exclusively (the curl field is sampled by `psi(pos)`, not by reading other dots), so a SINGLE `read_write` storage buffer is hazard-free and simpler — the explicit recorded choice. IF a future axis adds a neighbor read (a dot-repulsion / density term), it promotes to the two-buffer ping-pong (the NAMED successor — `useDotFlowField` would allocate the second buffer + swap the bind group each frame; the leaf schedule is untouched).

### Render pass — instanced quad draw

One unit-quad (4-vert triangle-strip, or a point-list) drawn `N` times; the vertex stage reads `dots[instance_index].pos` → applies the Gerstner offset (C) → clip space, scales the quad by `size_i` from `|vel|`; the fragment stage paints a soft round dot (smoothstep radial alpha — `1 − smoothstep(0.45, 0.5, length(uv−0.5))`) tinted from `palette` interpolated by `crest`, `alpha = baseAlpha·crest·magMask·ageFade`. Normal-over-the-dark-ground blend (NOT additive by default — additive blows out the dense crests; the additive register is an opt-in `blendMode` axis), `depthWrite:false`, **premultiplied alpha** (the overdraw-cheap path — the risk-table bound: 30k overlapping translucent quads is fill-rate-bound, so premultiplied + a tight `sizeRange` keeps overdraw sane). Instancing fits: every dot shares ONE quad geometry + ONE draw call; the GPU amortizes 30k transforms with zero per-dot CPU cost.

### Bind groups

`group(0) = { @binding(0) storage dots (compute: read_write / vertex: read), @binding(1) uniform U }`. Compute and render share the uniform; the storage buffer is `read_write` in the compute bind-group-layout entry and `read-only-storage` in the render bind-group-layout entry (TWO bind-group-layouts over the SAME buffer — WebGPU requires the usage flags to match the layout; the buffer is created with `STORAGE | (compute writes) | (vertex reads)`). The compute pipeline and the render pipeline each have their own layout; both reference the one buffer.

### `useWebGPUCanvas` — the net-new substrate sibling (the seed)

A SIBLING thin backend over `createCanvasLifecycle` (NOT a forked lifecycle — the W-CANVAS-UNIFY single-substrate discipline is binding). It owns ONLY the WebGPU-specific concerns and threads the SAME `CanvasFrameHooks` (`frame`/`shouldContinue`/`time?`/`teardown`) + `resize` + `mode` to the leaf:
- `navigator.gpu.requestAdapter()` / `adapter.requestDevice()` acquisition (ASYNC — the one shape the WebGL2 backend's synchronous `getContext` does not have; see the leaf-seam note below);
- the `GPUCanvasContext.configure({ device, format: navigator.gpu.getPreferredCanvasFormat(), alphaMode: "premultiplied" })`;
- the compute+render pipeline build (the analogue of `useWebGLCanvas`'s `buildContext` — it returns the `CanvasFrameHooks` the leaf schedules);
- a device-lost handler (`device.lost.then(...)` — the WebGPU analogue of `webglcontextlost`/`restored` → re-acquire device + re-build pipelines + re-arm), mirroring the WebGL2 self-heal.

It inherits the four-reason suspend Set, the offscreen-park, the live-PRM one-static-frame freeze, and the DPR policy WITHOUT re-authoring any of it. Scope is the MINIMUM contract (the risk-table fence): the suspend Set + PRM + offscreen + device-loss — NOT a full WebGPU-everything substrate (the broader aurora/fourier/constellation/blob WebGPU migration is the NAMED successor).

**The async-acquire leaf-seam note (a Triumvirate trigger, NOT a default edit).** `createCanvasLifecycle`'s `buildContext: () => CanvasFrameHooks` is SYNCHRONOUS (WebGL2's `getContext` is sync). WebGPU's `requestAdapter`/`requestDevice` are async. The impl agent re-greps `arm()` at HEAD: if `arm()` can `await buildContext()` (or the leaf already accepts a `Promise<CanvasFrameHooks>`), the sibling needs NO leaf edit. If the leaf seam CANNOT carry an async `buildContext` without an edit that also touches the WebGL2 path, that is the §Triumvirate scope-reveal — research the MINIMAL symmetric leaf-seam ADD (an OPTIONAL `buildContextAsync?` the WebGL backend ignores, or a `Promise`-tolerant `buildContext` return type the WebGL backend resolves synchronously), land it IN this wave with the WebGL2 backend proven byte-behaviour-identical (the §Triumvirate-routed leaf-seam ADD), NEVER a forked second schedule. The device acquire is gated so it runs once on `arm()` (lazy), not eagerly at mount.

## The DESIGN — the WebGL2 fallback (`navigator.gpu` absent)

Two viable forms (the impl agent decides per the parity measure, recorded in the DELTA):
- **(a) transform-feedback particle update (PREFERRED — output-parity-faithful).** A vertex-shader update pass writes `pos`/`vel`/`age` to a feedback buffer (ping-pong VBOs — TF requires distinct read/write buffers, so the WebGL2 path IS ping-pong even though the WebGPU path is single-buffer; this is a backend mechanism difference, not a math difference), then an instanced `gl.drawArraysInstanced` of the dot quad reads the updated buffer. This mirrors the compute path 1:1 (the SAME Fourier+curl `psi()` ported to GLSL ES 3.00 — the parity-by-construction floor) and keeps the dots GPU-resident. It composes the EXISTING `useWebGLCanvas` substrate (`setup(gl)` builds the TF program + feedback buffers + the instanced draw program, returns the `WebGLCanvasFrame` hooks; it inherits the substrate's offscreen-park + PRM freeze + DPR + context-loss self-heal).
- **(b) fragment-only field-sampled ground (the documented degraded path).** A single full-screen fragment pass samples the field per-pixel and draws a dot-screen via a periodic threshold of ψ (a "where does a streamline pass near this pixel" test — `fract(streamline-arc-length) < dotDuty`). Cheaper but lower-fidelity (no true particle ribbons, no respawn) — its parity band is documented-WIDER, not a byte-match.

The GL-SHADER FENCE holds absolutely: the new `dotFlowField.wgsl` + the new `dotFlowField.frag.ts`/`.vert.ts` are NET-NEW files in the feature-dir `shaders/`. `aurora.frag`/`metaball.frag` are byte-UNTOUCHED. The curl-noise idiom is COPIED into the new shader files (colocation), never spliced into aurora's `flow.glsl`.

## The COMPONENT SPEC (README-grade)

### Feature-dir layout (`proof:colocation` — auto-enrolled off the README.md marker)

```
src/components/custom/dot-flow-field/
├── DotFlowField.vue            # the SFC (components at root) — canvas host + props → configRef + DockBackgroundToggle wiring
├── composables/
│   ├── useDotFlowField.ts      # the driver — picks the backend (navigator.gpu ? useWebGPUCanvas : useWebGLCanvas), composes the substrate, owns the uniform pack, exposes pause/resume/wake/renderAt
│   ├── useDotFlowSeeds.ts      # Poisson-disk seed scatter + the deterministic per-mode phase seeding (routes through src/utils/prng.ts)
│   └── uploadDotFlowUniforms.ts# the per-frame uniform-pack writer (the Fourier mode bank → ONE flat Float32Array, re-packed for the WGSL std-layout AND the GLSL uniform array — the single writer)
├── constants.ts                # DEFAULT_DOT_FLOW_CONFIG (warm-identity) + the named magic numbers (gConst, breathPeriod, octaveCount, the size/alpha coefficients, WORKGROUP_SIZE=64, MAX_MODES=12, FRAME_DT)
├── shaders/
│   ├── dotFlowField.wgsl       # the WebGPU compute + render pair (net-new; the GL fence holds)
│   ├── dotFlowField.frag.ts    # the WebGL2 fallback fragment (GLSL ES 3.00 port of psi() + the dot paint)
│   └── dotFlowField.vert.ts    # the WebGL2 fallback vertex (transform-feedback update + the instanced read + the Gerstner offset)
├── index.ts                    # the package barrel (DotFlowField + useDotFlowField + DotFlowFieldConfig type + DEFAULT_DOT_FLOW_CONFIG)
└── README.md                   # the feature-dir doc (the field math, the WebGPU-first/WebGL2 paths, the axes, the Tessendorf successor) — ALSO the colocation auto-enrollment marker
```

### The public prop table (every configurator axis)

| prop | type | default | range | note |
|---|---|---|---|---|
| `density` | `number` | `1000` | `200..3000` (seed count `S`; total `N = S × pathLength`) | the ribbon-seed Poisson count — the master density knob; pairs with `pathLength` for total `N≈5k-50k` |
| `pathLength` | `number` | `30` | `8..60` (dots per ribbon `L`) | ribbon length — longer = more flowing-line read, shorter = more scattered-dot read |
| `dotSizeRange` | `[number,number]` | `[1.2, 3.5]` | min `0.5..4`, max `1..8` (device-px, DPR-scaled at the uniform pack) | per-dot radius span; the dot grows toward max as `\|v\| → vMax` |
| `flowSpeed` | `number` | `0.5` | `0..2` (× — scales all temporal clocks) | the wave-roll + advection speed; `0` = frozen field (the PRM target value) |
| `waveAmplitude` | `number` | `0.6` | `0..1.5` (master `A_k` scale) | ribbon undulation depth — how much the streamlines wave |
| `wavelength` | `number` | `0.35` | `0.1..1.0` (base λ in normalized units; `λ_k = base/k`) | the dominant wave scale — large = long rolling swells, small = tight ripples |
| `directionCount` | `number` | `5` | `1..12` (the Fourier bank size `N`; capped at `MAX_MODES=12`) | how many directional sinusoid modes sum into ψ; `1`=clean directional, `5-8`=rich water, `12`=complex chop |
| `flowAngle` | `number` | `-25` | `-180..180` (deg; the dominant-mode heading) | the overall flow direction (the reference flows diagonally ↘); modes fan around it via `directionSpread` |
| `directionSpread` | `number` | `35` | `0..90` (deg fan around `flowAngle`) | `0` = all modes parallel (laminar ribbons), `90` = isotropic (turbulent web) |
| `turbulence` | `number` | `0.15` | `0..0.6` (curl-FBM weight added to ψ) | the organic-breakup / curl strength — Bridson curl-noise seasoning over the clean Fourier ribbons |
| `steepness` | `number` | `0.4` | `0..1` (Gerstner `Q`, clamped `Q·κ·A≤1`) | the trochoidal crest sharpness — `0`=sinusoidal, high=peaked crests with the 2.5D relief shading |
| `fadeByMagnitude` | `number` | `0.7` | `0..1` | thins the calm troughs (the reference's sparse low-flow zones); `0` = uniform alpha |
| `baseAlpha` | `number` | `0.85` | `0.2..1` | the resting dot opacity before the crest/magnitude/age modulation |
| `breathDepth` | `number` | `0.06` | `0..0.2` | the slow atmospheric breath — mirrors aurora's calmest non-dead register |
| `blendMode` | `"normal" \| "additive"` | `"normal"` | — | normal-over-dark default (additive blows out dense crests); additive is the opt-in glow register |
| `palette` | `OklchStop[]` | WARM-IDENTITY (warm-cream → warm-amber, resolved via the `/color` ColorResolver seam + value.js OKLCh helpers) | — | **presets-in-consumers**: the LIBRARY default is warm-cream identity; the reference's TEAL-on-navy is a DEMO PRESET, NEVER a library token |
| `seed` | `number` | `1` | any integer (deterministic Poisson + phase via `src/utils/prng.ts`) | reuses the house single-source PRNG leaf; same seed ⇒ byte-reproducible field (the gate's determinism) |

Inherited from the substrate, NOT re-authored as props: the offscreen-pause, the live-PRM freeze, the DPR policy, the device/context-loss self-heal. A consumer's pause/play wires through `DockBackgroundToggle` (the WCAG-2.2.2 control — `v-model:paused` → the renderer's `pause()`/`resume()`), exactly as aurora/goo-blob do.

### Subpath + composable + studio

- **Subpath**: `@mkbabb/glass-ui/dot-flow-field` — a per-package flat subpath. The auto-resolved `src/subpaths/dot-flow-field.ts` mirror barrel is a ONE-LINE `export * from "../components/custom/dot-flow-field";` (the confirmed `src/subpaths/aurora.ts` shape; batch-resolved in vite.library.ts via the `src/subpaths/*.ts` glob — no hand-add to the vite config) + the `package.json` `exports` `{ types, import }` contract-v2 row + the `typesVersions["*"]` row, mirroring `./aurora`'s shape (confirmed at `package.json:307`). It is a STANDALONE WebGPU/WebGL2 chunk the root barrel does NOT transitively reach (the substrate-isolation discipline — like `/aurora`). The `proof:subpath-enumeration` count is bumped by one.
- **Composable**: `useDotFlowField(canvasRef, configRef, { mode? })` — the driver. It feature-detects `navigator.gpu` and composes EITHER `useWebGPUCanvas` (primary) OR `useWebGLCanvas` (fallback), owns the uniform pack (`uploadDotFlowUniforms`), exposes `pause()`/`resume()`/`wake()` (the substrate seam, NOT a second rAF) + a `renderAt(t)` capture entry (the fixed-`t` deterministic capture the gate's parity π uses; it relies on the substrate `mode:"capture"` pre-seeding the `manual` suspension so the live loop never auto-runs during a capture). A `mode?: "webgpu" | "webgl2" | "auto"` override forces a backend (the parity π drives both explicitly; `auto` is the default feature-detect).
- **Configurator studio (the aurora editable-baseline model)**: the demo studio composes `useConfiguratorState<DotFlowFieldConfig>` with `cloneMode="per-preset"` — each preset is a named editable baseline the user tunes and returns to (slider edits survive a preset round-trip). The studio chrome inherits the AZ.W-HIERARCHY configurator hierarchy vocabulary (section weight / label register / control rhythm) by composing `<ConfiguratorLayer>`/`<ConfiguratorRow>` (+ `<ColorSwatch>` for the palette stops, BA.W-CONFIG-CHASSIS); it does NOT re-author hierarchy.

### Warm-identity default + presets-in-consumers (the hard fence)

The library ships ONLY `DEFAULT_DOT_FLOW_CONFIG` — the neutral warm-identity palette (warm-cream → warm-amber, resolved via the `/color` ColorResolver seam + value.js OKLCh helpers; the house glassmorphic identity). The reference's teal-on-navy is a DEMO preset in `demo/stories/substrates/presets.ts`, NEVER a library token (the recurring ppmycota-purple-class leak — the gate asserts NO teal/navy literal in any library token or the DEFAULT config). The `palette` resolves through the `/color` ColorResolver injection seam (the same seam goo-blob's injected `ColorResolver` uses), so a consumer overrides the palette without editing library source.

## The DEMO STORY (the substrates band — the visual-load-bearing path)

Ships in the SUBSTRATES band beside aurora/fourier/constellation (the live-GL cluster, the one-GPU-context-per-route budget — `demo/stories/manifest.ts` `CATEGORY_DEFAULT_BG.substrates = "aurora"` confirmed at `manifest.ts:122`; this story declares its OWN dot-flow-field substrate, the one live context for its route, so it does NOT inherit the band's `aurora` default and stack a second GL context). The flagship story `demo/stories/substrates/dot-flow-field.vue`:
- a full-bleed `<DotFlowField>` behind a glass content card (the glass-first canon — the field is what makes the glass POP; the card reads as liquid glass over a live flowing substrate),
- driven by a demo Configurator (the studio model — `useConfiguratorState<DotFlowFieldConfig>` `cloneMode="per-preset"`, mirroring aurora),
- a `<DockBackgroundToggle>` wiring the WCAG-2.2.2 pause/play,
- inheriting the offscreen-pause (scroll away ⇒ rAF parks) + the PRM freeze (one static frame).

The DEMO presets (`demo/stories/substrates/presets.ts`, presets-in-consumers):
- **`Tideline`** — the reference's TEAL-on-deep-navy (teal dots, diagonal ↘ flow `flowAngle:-25`, `directionCount 6`, `directionSpread 35`, `steepness 0.4` — the user's target image).
- **`Cream Drift`** — the warm-identity default (warm-amber dots over the warm-cream/paper register — the house glassmorphic identity).
- **`Wind`** — laminar, `directionSpread 8`, long ribbons `pathLength 50`, low turbulence (the wind-map register).

The README.md (feature-dir) documents the field math (the curl-of-Fourier-potential model), the WebGPU-first/WebGL2-fallback paths, the configurator axes, and the named Tessendorf-FFT successor.

## The DISCIPLINE inherited (NOT re-authored)

- **Offscreen-pause** — `content-visibility:auto` + the `IntersectionObserver` `rootMargin:200px` seam (`useIntersectionPause` → `suspend("off-screen-io")`) + `document.hidden`, all ORed onto the leaf's `isRunning()` empty-Set park machinery (a parked rAF attaches ZERO frames — `proof:offscreen-pause`).
- **Live-PRM freeze** — the leaf OWNS + live-monitors `prefers-reduced-motion: reduce` (a `matchMedia` `change` listener), paints ONE static frame then parks; re-arms (one static frame) on un-reduce. The new `useWebGPUCanvas` sibling MUST NOT re-implement this (the risk-table regression: a re-implemented PRM path that drifts from the WebGL leaf's). Because both backends compose the SAME leaf, the PRM contract is the leaf's — the sibling adds only context acquisition + the device-lost handler.
- **DPR** — the device-pixel-ratio backing-store policy is the backend's `resize`; the dot `sizeRange` is DPR-scaled at the uniform pack (`uploadDotFlowUniforms` multiplies by `dpr`).
- **Determinism** — all randomness through `src/utils/prng.ts` (`mulberry32`+`hashString`); the capture path renders at a fixed `t` offset (`renderAt`), never the live clock (the goo-blob free-clock lesson — a free clock breaks BOTH capture-reproducibility AND the parity band).
- **The WebGPU/WebGL2 PARITY bar** — a headless π captures the WebGPU path and the WebGL2 path over the SAME seed+config at a fixed `renderAt(t)` and asserts mean + per-quadrant (4-tile) luminance + dot-count within a certify band (the aurora-swraster parity precedent — output parity between the two paths is MEASURED, not assumed). The fragment-only fallback (form b) gets a documented-WIDER band. Both paths MUST close the OETF seam with the SAME transfer (the `proof:aurora-space-gamma` class — a linear-in-WGSL / srgb-in-GLSL mismatch is the named divergence cause).

## Triumvirate Dispatch

- **The WebGPU substrate seed expands past the minimum contract.** If seeding `useWebGPUCanvas` reveals the leaf's `buildContext`/`CanvasLifecycleOptions` public seam CANNOT carry the WebGPU async-device-acquire / device-loss lifecycle WITHOUT a leaf-seam change (a change that also affects `useWebGLCanvas`), that is a scope-reveal: triumvirate (research the minimal leaf-seam ADD that serves BOTH backends symmetrically — an OPTIONAL async-init hook the WebGL backend ignores — plan-augment, redress) — do NOT fork a second lifecycle "just for WebGPU" (the W-CANVAS-UNIFY two-copy class). A leaf seam ADD is acceptable WHEN the WebGL backend is proven byte-behaviour-identical; a forked schedule is not. The broader aurora/fourier/constellation/blob WebGPU migration is the NAMED successor, NOT this wave — scope creep into a full WebGPU-everything substrate is the named expansion that invalidates the wave.
- **The two `psi()` copies cannot be proven equivalent.** If the WGSL `psi()` and the GLSL-ES `psi()` (the Fourier+curl math, two copies) cannot be asserted equivalent by the gate's structural-diff floor (the mode-bank synthesis form) AND the parity π diverges past the certify band, that is the silent-drift failure: triumvirate (research a shared SOURCE-OF-TRUTH for the mode-bank math — a generated WGSL+GLSL pair from one TS spec à la the spring-token regen, OR a documented per-line structural correspondence the gate checks) — do NOT hand-tune one path to match the other's pixels.
- **The dot-count budget cannot be met on the Metal dev box.** If `N = density×pathLength` at the default cannot hold p50 frame under 4×-throttle on the dev Metal box (NOT only headless SwiftShader — the AZ morph-showcase lesson: SwiftShader passed but the Metal box missed), that is a budget reveal: triumvirate (research the overdraw bound — smaller dots / premultiplied alpha / a budget clamp `density×pathLength ≤ ceiling` / a `directionCount` cap on the per-dot Fourier loop) — record the perf number in the DELTA, never ship an unmeasured default. The fragment OVERDRAW is the dominant cost, not the compute.
- **Diagnostic loop halt** — if the parity π still shows the two backends diverging past the certify band after THREE iterations and the cause is not isolated, halt and triumvirate. The suspect set: a linear-vs-gamma palette mismatch (`proof:aurora-space-gamma` class — both paths must close with the SAME OETF), a DPR/backing-store difference, a `premultiplied` vs straight-alpha blend-state mismatch between the two contexts, or a dot-count rounding (`ceil(N/64)·64` compute invocations vs the GL `drawArraysInstanced` instance count — the over-dispatched tail invocations MUST early-return via the `i >= arrayLength` guard so they paint nothing).

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/dot-flow-field/DotFlowField.vue` | create (the SFC) |
| `src/components/custom/dot-flow-field/composables/useDotFlowField.ts` | create (the driver — backend pick + uniform pack + the substrate compose + `renderAt` + `mode` override) |
| `src/components/custom/dot-flow-field/composables/useDotFlowSeeds.ts` | create (Poisson seed scatter + the deterministic per-mode phase seeding — routes through `src/utils/prng.ts`) |
| `src/components/custom/dot-flow-field/composables/uploadDotFlowUniforms.ts` | create (the per-frame uniform-pack writer — ONE flat Float32Array for both backends) |
| `src/components/custom/dot-flow-field/constants.ts` | create (`DEFAULT_DOT_FLOW_CONFIG` warm-identity + the named magic numbers, incl. `WORKGROUP_SIZE`/`MAX_MODES`/`FRAME_DT`) |
| `src/components/custom/dot-flow-field/shaders/dotFlowField.wgsl` | create (the WebGPU compute + render pair; net-new — the GL fence holds) |
| `src/components/custom/dot-flow-field/shaders/dotFlowField.frag.ts` | create (the WebGL2 fallback fragment — GLSL ES 3.00) |
| `src/components/custom/dot-flow-field/shaders/dotFlowField.vert.ts` | create (the WebGL2 fallback vertex — transform-feedback update + instanced read + Gerstner offset) |
| `src/components/custom/dot-flow-field/index.ts` | create (the package barrel) |
| `src/components/custom/dot-flow-field/README.md` | create (the feature-dir doc — also the colocation auto-enrollment marker) |
| `src/composables/glass/webgpu/useWebGPUCanvas.ts` | create (the net-new WebGPU substrate sibling over `createCanvasLifecycle` — the minimum contract) |
| `src/composables/glass/webgpu/index.ts` | create-IF (the webgpu substrate barrel, if the dir needs one for internal surface) |
| `src/composables/glass/index.ts` | modify-IF (re-export `useWebGPUCanvas` if it needs internal surface; like `useWebGLCanvas`) |
| `src/subpaths/dot-flow-field.ts` | create (the one-line mirror subpath barrel — `export * from "../components/custom/dot-flow-field";`, batch-resolved in vite.library.ts) |
| `src/api/index.ts` | modify (publish `DotFlowFieldConfig` + the `OklchStop`-class config types if not already public) |
| `package.json` | modify (the `./dot-flow-field` `exports` `{types,import}` + `typesVersions` rows + register `"proof:viz-dotfield"` in the `scripts` block + add it to `proof:all`/the parity manifest) |
| `scripts/gates.mjs` | modify-IF (register the gate row in the gates registry IF `proof:gate-script-parity` requires the gates.mjs↔package.json mirror — re-grep at HEAD; the gate row lands wherever the parity gate demands) |
| `scripts/proof-viz-dotfield.mjs` | create (the born-RED gate — the four source witnesses + the self-test bite, the `proof-aurora-space-gamma.mjs` regex-witness pattern) |
| `tests-visual/viz-dotfield.spec.ts` | create (the binding headless π — animate / PRM-freeze / ribbon-render / parity, BOTH modes, BOTH backends) |
| `demo/stories/substrates/dot-flow-field.vue` | create (the flagship story — the configurator studio) |
| `demo/stories/substrates/presets.ts` | create-or-modify (the Tideline/Cream Drift/Wind demo presets — presets-in-consumers) |
| `demo/stories/manifest.ts` | modify (register the substrates-band story row) |
| `src/components/custom/index.ts` | modify-IF (the custom barrel — only if the dir needs root-barrel surface; likely subpath-only like aurora) |
| `CLAUDE.md` | modify (record the dot-flow-field viz + the `useWebGPUCanvas` substrate seed under the procedural-substrate canon) |
| `docs/tranches/BB/audit/visual/W-VIZ-DOTFIELD-DELTA.md` | create (the field render + the parity capture + the perf number + the freshness header) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge row) |

Do NOT touch:
- **`aurora.frag`/`metaball.frag`/the aurora/goo-blob `shaders/*.glsl.ts` strings** — byte-UNTOUCHED. The curl-noise idiom is COPIED into the new feature-dir shaders, never spliced into aurora's `flow.glsl` (the GL-shader fence). A tempting reuse of aurora's curl-noise by EDITING it is the named fence breach.
- **`src/composables/glass/webgpu/glassShader.wgsl`** — the WebGPU pilot is READ for convention only (the `struct Uniforms`/`_pad` alignment + `@group(0) @binding(N)` + `hash21`/`noise`/`fbm` idiom); it stays the consumerless glass-shader seed for a FUTURE glass-WebGPU wave.
- **`createCanvasLifecycle.ts` / `useWebGLCanvas.ts`** — the leaf + the WebGL backend are COMPOSED, not edited. A leaf-seam widen (the async-acquire case) is a Triumvirate trigger (the symmetric-ADD rule, WebGL proven byte-identical), never a default edit. The `useWebGPUCanvas` sibling adds ONLY context acquisition + device-lost; it forks NO schedule (`proof:webgl-substrate-single`'s single-source class is binding — re-run it GREEN after the seed).
- **`useCanvas2D.ts` / the Canvas2D backend** — out of scope (this viz is GPU-resident; the 2D substrate is constellation/fourier's concern in their own waves).
- **The standing fences** — ppmycota purple / teal / navy NEVER enter library tokens (the demo teal preset lives in `demo/stories/substrates/presets.ts` ONLY); the slides/value.js/kf/speedtest foreign trees (no edit); the hardened-agent git clause (the impl agent never stages/commits/tags — the orchestrator owns the index).

### Disjointness

Two agent units, SERIAL within the wave (`.2` reads the `useDotFlowField` handle shape + the uniform-pack form `.1` makes concrete — the engine contract is the input to the SFC/studio/π, so they sequence, never run parallel):
- **W-VIZ-DOTFIELD.1 (the engine)** writes the shaders (`dotFlowField.wgsl`/`.frag.ts`/`.vert.ts`), the composables (`useDotFlowField`/`useDotFlowSeeds`/`uploadDotFlowUniforms`), `constants.ts`, and `useWebGPUCanvas.ts` (+ the webgpu barrel / glass index re-export). It owns NO SFC, NO studio, NO gate/π.
- **W-VIZ-DOTFIELD.2 (the surface)** writes `DotFlowField.vue`, `index.ts`, `README.md`, the subpath barrel, the `api`/`package.json`/`gates.mjs` registrations, the gate (`proof-viz-dotfield.mjs`), the π (`viz-dotfield.spec.ts`), the story + presets + manifest row, CLAUDE.md, and the DELTA. It reads `.1`'s engine contract but writes NONE of `.1`'s files.

Across the W-VIZ-SUITE cohort: this wave's `custom/dot-flow-field/` dir + its gate/π/story are component-family-disjoint from the sibling viz waves by construction. The registry single-owner rule: ONE wave per parallel group owns `package.json` + `scripts/gates.mjs` + `demo/stories/manifest.ts`; this wave's registrations land as single-row appends, sequenced after the cohort owner's edits per the EXECUTION-DAG single-owner rule.

## Hard Gate

`proof:viz-dotfield` (born-RED at HEAD — the dir does not exist; driven GREEN by the wave) — four falsifiable SOURCE witnesses (the comment-strip + pure-regex-detector house pattern, mirroring `proof-aurora-space-gamma.mjs`: read the source, test for the required FORM, push a `violations[]` entry on absence, ship a self-test bite), each RED at HEAD pre-wave, AND the binding headless π readback.

1. **W1 — the field is the CURL of a Fourier-bank potential (divergence-free, NOT a jittered grid).** The compute/update shader computes `v = (∂ψ/∂y,−∂ψ/∂x)` by the 90°-rotated finite-difference, and ψ sums a directional Fourier bank (`A_k ∝ 1/k`, `ω_k = √(g·κ_k)`). RED at HEAD: no shader exists. **Bite (anti-evasion):** the gate asserts the curl FORM is present (the `(dψy,−dψx)/(2·eps)` rotated-gradient — `vec2(dpsiY, -dpsiX)` / `(2.*eps)` — NOT a raw gradient `(dψx,dψy)`; a non-rotated gradient gives a CONVERGING/diverging field, NOT divergence-free ribbons; the gate reds a raw-gradient body) AND the Fourier-bank `1/k` falloff (`amplitude / k` or `/ float(k)`) + the dispersion `sqrt(g*kappa)` are present (a flat-amplitude bank or a missing dispersion fails the wave-roll clause). A jittered-grid placement (a `mod`/`floor` grid stamp instead of a Poisson-seed + Euler-advect) fails the streamline-seeded clause — the gate asserts `useDotFlowSeeds` carries the Poisson scatter, not a grid stamp.
2. **W2 — the two `psi()` copies share the SAME mode-bank synthesis form (the parity-by-construction floor).** The WGSL `psi()` (`dotFlowField.wgsl`) and the GLSL-ES `psi()` (`dotFlowField.frag.ts`/`.vert.ts`) are a structural match on the synthesis form — the mode loop, the `1/k` falloff, the dispersion, the curl finite-difference. RED at HEAD: neither exists. **Bite:** the gate's structural-diff asserts both bodies carry the SAME mode-loop shape (the `for (… k < modeCount …)` summation + the rotated-gradient curl); a drift between them (one path missing the dispersion term, one using a different falloff) reds the parity-form clause. The fragment-only fallback (form b) is exempted from the byte-form match BUT MUST declare its degraded-parity intent in a recorded comment the gate reads (a `// DEGRADED-PARITY: fragment-sampled ground` marker — the documented-wider-band declaration).
3. **W3 — the library DEFAULT is warm-identity; NO teal/navy literal in any library token.** `DEFAULT_DOT_FLOW_CONFIG` (`constants.ts`) resolves the warm-cream→warm-amber identity palette via the `/color` ColorResolver seam, and NO library token / DEFAULT config carries a teal/navy hex/oklch literal. RED-equivalent at HEAD: no config exists. **Bite:** the gate greps the library tree (`src/components/custom/dot-flow-field/` + any `src/styles` token it touches) for a teal/navy literal in a token-or-default position (the `#0a2a3a`-navy / teal-cyan oklch-hue band) and reds it; the teal preset is asserted to live in `demo/stories/substrates/presets.ts` ONLY (the presets-in-consumers fence — the ppmycota-purple-class anti-leak).
4. **W4 — determinism: all randomness through the house PRNG.** `useDotFlowSeeds` (Poisson + phase seeding) imports `mulberry32`+`hashString` from `src/utils/prng.ts` and uses NO `Math.random()`; the same `seed` ⇒ a byte-reproducible field. RED-equivalent at HEAD: no seeding exists. **Bite:** the gate asserts ZERO `Math.random()` in the feature-dir AND a `mulberry32`/`hashString` import; a free-clock capture path (a `performance.now()`/`Date.now()` in `renderAt`) fails the fixed-`t` clause.

5. **The π binding headless readback** (the cardinal-lesson DELTA, captured own-surface, BOTH modes, BOTH backends): a HEADLESS capture of the `demo/stories/substrates/dot-flow-field.vue` surface (via the chrome-devtools/playwright MCP, the house live-verify path — NOT a hand-rolled script) with a paired `getImageData` readback proving:
   - **(a) the field ANIMATES** — two captures `dt` apart (live clock) differ above a motion floor (mean-abs pixel delta > ε_motion; the field flows);
   - **(b) PRM freezes it to ONE static frame** — under emulated `prefers-reduced-motion: reduce`, two captures `dt` apart are IDENTICAL (zero motion frames, mean-abs delta == 0) on BOTH backends;
   - **(c) the dots render as streamline RIBBONS** — the captured field has the streamline signature (a directional autocorrelation peak along the flow heading / a non-grid dot distribution — NOT a uniform lattice; the anti-grid readback fails a regular-lattice FFT-peak), the dot-count within the budget-clamped `N`;
   - **(d) the WebGPU-vs-WebGL2 output parity** — over the SAME seed+config at a fixed `renderAt(t)`, the two backends' mean + per-quadrant (4-tile) luminance + dot-count land WITHIN the recorded certify band (the fragment-only fallback gets the documented-wider band). On a headless box where `navigator.gpu` is absent, the WebGPU arm is captured on a `navigator.gpu`-capable runner (or the parity arm is documented-deferred-to-the-Metal-box with the captured number, NEVER skipped silently).
   Captured to `docs/tranches/BB/audit/visual/W-VIZ-DOTFIELD-DELTA.md` with the AZ-form freshness header (capture date, HEAD sha, the surface paths, a sha256 surface-hash of the captured-surface source, the config seed) + the 4×-throttle Metal-box p50 frame number (the risk-table perf bound), BOTH modes.

6. **The `proof:ba-gestalt` verdict** (BA inv-4 — the P-1 close-class fix). Per-mechanism W1-W4 greens do NOT close this VISUAL wave. The owning surface (the substrates band — the dot-flow-field on the gestalt roster) is captured WHOLE-PAGE, BOTH modes, over its real backdrop, and judged as a gestalt ("does the field read as flowing dot-RIBBONS — the coherent undulating streamlines of the reference — not a rigid grid or a converging swirl, with the glass card reading as liquid glass over it?"). The verdict is recorded with the capture; a FAIL deploys the research→wave-spec→redress triumvirate (W-REFLECT3, Batch 7). A source-green/grid-looking gap does NOT close `complete`.

7. **`proof:colocation` + `proof:storybook-complete` + `proof:webgl-substrate-single`** — the feature-dir layout (composables/, constants.ts, shaders/, README.md — auto-enrolled off the README marker) AND the flagship substrates story present (the visual-load-bearing floor) AND the WebGPU sibling did NOT fork the lifecycle (the single-source rule STAYS GREEN). All three GREEN at close.

W1-W4 are the device-free CI half (`proof:viz-dotfield`); the π readback (W5) + the gestalt verdict (W6) + colocation/storybook/substrate-single (W7) are the binding visual/structural truth. ALL must hold for a clean close.

## Format And Lint Cadence

`npm run typecheck` (vue-tsc) after the engine composables + the SFC (the `DotFlowFieldConfig` + the `useDotFlowField` handle + the `useWebGPUCanvas` sibling must type cleanly through the api surface; the `@webgpu/types` ambient types may need a devDependency add — re-grep `tsconfig`'s `types` at HEAD); `npm run build` after the SFC + subpath (confirm the `/dot-flow-field` chunk compiles + the WebGPU/WebGL2 paths bundle + the chunk does NOT drag the root barrel — the substrate-isolation discipline); `node scripts/proof-viz-dotfield.mjs` born-RED before the source edits (proof it fails at HEAD — the dir does not exist), GREEN at close; `node scripts/proof-webgl-substrate-single.mjs` GREEN after the `useWebGPUCanvas` seed (the substrate stays single-source — no forked lifecycle); `node scripts/proof-colocation.mjs` + `node scripts/proof-storybook-complete.mjs` GREEN at close; the headless π (`viz-dotfield.spec.ts`) run (the animate/PRM/ribbon/parity readback); `npm run proof:gate-script-parity` + `npm run proof:gate-manifest-sound` + `npm run verify-export-types` after the package.json/gates.mjs/subpath registration; `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BB/audit/visual/W-VIZ-DOTFIELD-DELTA.md` — the headless field render (the streamline-ribbon signature, BOTH modes), the WebGPU-vs-WebGL2 parity capture (mean + per-quadrant luminance + dot-count within band), the 4×-throttle Metal-box p50 frame number, the PRM zero-motion-frame capture, + the AZ-form freshness header (date, HEAD sha, surface paths, sha256 surface-hash, config seed).
- The `proof:viz-dotfield` JSON artefact (born-RED log → GREEN-at-close log; the four source witnesses + the self-test bite results).
- The `proof:webgl-substrate-single` GREEN-after-seed output (the WebGPU sibling did not fork the lifecycle).
- The `proof:colocation` + `proof:storybook-complete` GREEN outputs.
- The `gate-script-parity` + `gate-manifest-sound` + `verify-export-types` outputs post-registration (the new `./dot-flow-field` subpath publishes).
- The `proof:ba-gestalt` substrates-band capture + recorded verdict (the W-REFLECT3 binding evidence).

## Commit Plan

- engine commit (`.1`): `feat(dot-flow-field): the curl-of-Fourier flow field engine + the useWebGPUCanvas substrate seed (BB.W-VIZ-DOTFIELD)` — body names the divergence-free curl-of-Fourier-potential model (Bridson/Tessendorf/Gerstner), the WGSL compute+render pair (single-buffer read_write, ceil(N/64) dispatch), the WebGL2 transform-feedback fallback, and the WebGPU substrate sibling over `createCanvasLifecycle` (no forked schedule).
- surface commit (`.2`): `feat(dot-flow-field): the DotFlowField SFC + the substrates studio story + warm-identity default (BB.W-VIZ-DOTFIELD)` — body names the configurator studio (per-preset editable baseline), the warm-identity default + the demo teal/cream/wind presets (presets-in-consumers), and the `/dot-flow-field` subpath.
- gate commit: `test(dot-flow-field): proof:viz-dotfield born-RED→GREEN + the headless animate/PRM/ribbon/parity π + parity registration`.
- doc/status commit: the CLAUDE.md procedural-substrate canon record + the feature-dir README + the DELTA doc + the BB PROGRESS row.

## Dependencies

- **Depends on**: the shared `createCanvasLifecycle` leaf (AU.W6 — read + composed, not edited) + the `/color` ColorResolver seam (AU.W5) + the `src/utils/prng.ts` single-source (AV.W14) + the configurator studio (`useConfiguratorState`). It SEEDS `useWebGPUCanvas` (net-new — this wave is the first consumer); if a sibling W-VIZ-SUITE wave lands the WebGPU substrate first, this wave COMPOSES it instead of seeding it (the §0 RE-GROUND resolves which at HEAD). No hard dependency on a sibling viz wave's paint output.
- **Blocks**: the broader W-VIZ-SUITE WebGPU-migration arc reads this wave's `useWebGPUCanvas` seed as its substrate (the NAMED successor — aurora/fourier/constellation/blob migrate WebGPU-first on later suite waves). This wave does NOT block another component-family wave (the viz-substrate bound is component-family-isolated).
- **Coordinates with**: the W-VIZ-SUITE cohort (the registry single-owner rule on `package.json`/`gates.mjs`/`manifest.ts` — single-row appends sequenced after the cohort owner) + W-CANVAS-UNIFY (the single-substrate discipline — the `useWebGPUCanvas` sibling honors it; file-disjoint).

## Archaeology

No prior glass-ui attempt at a dot flow-field viz or a WebGPU substrate consumer — `glassShader.wgsl` is a consumerless pilot (the WebGPU-first seed, never wired). The precedents this wave matches (not reinvents): aurora's `flow.glsl` curl-noise + ETF structure-tensor flow (the curl idiom — COPIED into the new shaders, never edited), `fourier-field/math.ts` (the epicycle/inverse-DFT `Σ c_k e^{2πikt}` synthesis — the Fourier idiom), the constellation field model (the Canvas2D substrate precedent), and the `useWebGLCanvas`/`createCanvasLifecycle` substrate (the thin-backend-over-the-leaf shape the `useWebGPUCanvas` sibling transposes — confirmed: the leaf owns the schedule, the backend owns `buildContext`/`resize`/`mode`/`renderAt`). The guardrails carried from the AZ/BA visual-close lessons: the W1 bite asserts the divergence-free CURL form (not a raw gradient — a converging field reads as a swirl, not ribbons — the source-green/wrong-field gap is the AZ failure class); the W5 π is the BINDING headless readback proving the RENDERED ribbon signature + the two-backend parity (a "green gate but a grid-looking field" close is exactly the P-1 lie BA told); and the determinism is PRNG-routed + fixed-`t` captured (the goo-blob free-clock lesson — a free clock breaks capture-reproducibility AND the parity band).

## Named successors

- **The W-VIZ-SUITE WebGPU-migration arc** — aurora + fourier + constellation + blob migrate WebGPU-first on later suite waves, reading THIS wave's `useWebGPUCanvas` seed as the substrate (the user's "all viz WebGPU-first, cover the extant items too" directive is a multi-wave arc, NOT this one wave — scoped here to seeding the minimum substrate + the first consumer; each extant viz is its own named successor wave that authors its NEW parallel `.wgsl` and LEAVES its `.frag` as the WebGL2 fallback, byte-equivalent output verified, the GL-shader fence held).
- **The full Tessendorf FFT spectral path** — IFFT2 of a Phillips-spectrum complex field (`h0(k)·e^{iω(k)t}`) for true spectral spread, if a future wave wants a full ocean surface beyond the `N≈5-12` analytic directional bank (the NAMED ceiling — the analytic bank ships now because it earns the look without the `O(M²logM)` cost).
- **The ping-pong promotion** — IF a future axis adds a neighbor read (a dot-repulsion / local-density term), the single-buffer `read_write` storage promotes to the canonical two-buffer ping-pong (the SOTA hazard-free pattern; `useDotFlowField` allocates the second buffer + swaps the bind group each frame; the leaf schedule is untouched).
- **The anisotropic-streak dot** — orient an elongated dot/streak along `v_i` (a stronger flow read) — booked as an additive `dotShape` axis if the round-dot default does not read flow-directional enough.
- **The fragment-only fallback promotion** — if the transform-feedback fallback (form a) proves heavy on low-end GPUs, the fragment-only field-sampled ground (form b) is the documented degraded path; promoting it to the default low-end path (with its documented-wider parity band) is the booked successor.
- The ONE conditional landed IN this wave: if the WebGPU substrate seed proves the leaf's public seam must widen to carry the async device-acquire / device-loss lifecycle symmetrically for both backends, that is a **Triumvirate-routed leaf-seam ADD** landed IN this wave (the WebGL backend proven byte-behaviour-identical) — NOT a deferred book and NOT a second fork.

## FOLD — how this wave slots into BB

This wave is the LEAD consumer of the BB **substrates/viz band** + the substrate SEED for the suite:
- **W-VIZ-SUITE substrate dependency** — W-VIZ-DOTFIELD seeds `useWebGPUCanvas` (the net-new WebGPU thin backend), which the rest of the W-VIZ-SUITE cohort's later WebGPU-migration waves (aurora/fourier/constellation/blob) read as their substrate. This wave ships the MINIMUM substrate contract (suspend Set + PRM + offscreen + device-loss) + the FIRST real consumer (the dot flow-field), proving the seam before the suite migrates the extant viz onto it.
- **The substrates demo band** — the `demo/stories/substrates/dot-flow-field.vue` story lands beside aurora/fourier/constellation in the live-GL cluster (one GPU context per route; the story declares its OWN dot-flow-field context, not the band's `aurora` default). The configurator studio reuses the AZ.W-HIERARCHY hierarchy vocabulary + the BA.W-CONFIG-CHASSIS `<ColorSwatch>` register.
- **The `proof:ba-gestalt` roster** — the dot-flow-field is added to the substrates-band gestalt roster; its whole-page both-modes verdict is the binding close decision (W-REFLECT3, Batch 7, is the authorized verdict-flipper).
- **The BB-AMENDMENT coherence-harden §3 WebGPU-first directive** — this wave is the concrete first discharge of that suite-wide directive (WebGPU-first when possible, WebGL2 the graceful fallback, the existing `useWebGLCanvas` IS the fallback path, never retired).
