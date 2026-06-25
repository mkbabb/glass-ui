# The shared FIELD / FLOW / WAVE engine — ONE GPU math source for the whole viz suite (BD viz-arch)

**Lane** BD viz-research / architecture · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Substrate-grounded** against `src/composables/glass/webgl/shaders/{procedural-color,flow}.{glsl,wgsl}.ts` + `src/components/custom/aurora/constants/shaders/procedural-color.wgsl.ts` + the 10 viz shader trees + `src/components/custom/{dot-flow-field/composables/flowField.ts,concentric/composables/ringField.ts,paper-grid/composables/paperGrid.ts,dot-matrix/composables/dotMatrixField.ts}` ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. THIS doc is the binding artifact; the wave that executes it is **`W-FIELD-ENGINE`** (named in §7).

> Read alongside `gpu-substrate-unify.md` (the GPU-only substrate spine this engine rides — the engine is WebGPU/WebGL2-only by construction, NO Canvas2D) and the per-viz REDEVELOP specs (blob/dot-matrix/concentric/paper-grid). The substrate doc owns "where the pixels get scheduled"; THIS doc owns "what math every shader samples."

---

## 0. TL;DR — the finding, and the one-sentence thesis

The mandate's premise ("aurora + blob + paper-grid + concentric + dot-matrix all sample similar aurora logic — propose the unified field engine") is **correct AND already half-built**: the parity-critical COLOR seam (`procedural-color.{glsl,wgsl}.ts`) and the FLOW seam (`flow.{glsl,wgsl}.ts` — `curlFBM`) are already ONE-source shared chunks. What is NOT shared — and is re-forked **5-6 times across the suite** — is the **NOISE BASIS** (`hash21`/`valueNoise`/`fbm`) and the **WAVE field** (the Gerstner/Tessendorf sum-of-sines, today trapped inside dot-flow-field alone). The redevelopment demands these be shared too: the new mandate says concentric + paper-grid + dot-matrix must all warp/perturb with **the SAME wave-based math**, and the dot-matrix must "leverage similar AURORA logic." That is impossible to do DRY without hoisting the noise+wave math into shared chunks beside the color+flow ones.

**Thesis:** mint ONE `field/` shader-chunk family — `noise` (the single hash/value-noise/fbm basis), `wave` (the Gerstner/Tessendorf sum-of-sines + its analytic gradient/curl), beside the EXISTING `color` (`procedural-color`) and `flow` (`curlFBM`) chunks — and re-point every viz's host shader to splice them. The result is a **four-chunk field engine** (`noise · wave · flow · color`) that is the ONE math source the whole suite consumes, per backend, with ZERO re-fork.

---

## 1. The HEAD shape — what is shared, what is forked

### 1a. Already ONE-source (the precedent to extend)

| chunk | GLSL home | WGSL home | what it owns | consumers |
|---|---|---|---|---|
| **color** | `glass/webgl/shaders/procedural-color.glsl.ts` (283L) | `aurora/constants/shaders/procedural-color.wgsl.ts` | sRGB OETF · Ottosson OKLab/OKLCh `mat3` · `FBM_ROT` constant · `samplePaletteRamp` (OKLab-rect + OKLCh-arc) · PCG2D hash + simplex `gnoise` (painterly basis) | aurora, blob, concentric, paper-grid, dot-* (every viz that tints) |
| **flow** | `glass/webgl/shaders/flow.glsl.ts` (`CURL_FBM_GLSL`) | `glass/webgl/shaders/flow.wgsl.ts` (`CURL_FBM_WGSL`) | `curlFBM(p)` — the basis-agnostic 2D curl of a `potentialFBM` the HOST defines | aurora (`warpMode:"curl"`), paper-grid (`curlWarp`), dot-flow-field |

The mechanism is the **template-literal splice**: each `export const X_GLSL = /* glsl */ \`…\`` is a string the host `*.frag.ts`/`*.wgsl.ts` interpolates (`${CURL_FBM_GLSL}`) into its own `*_SRC` at module load. NO `#include` preprocessor, NO bundler step — the emitted shader is character-identical to a hand-inlined one. The **splice-order contract** (the dependency law): a chunk that calls `potentialFBM` (flow's `curlFBM`) or needs `PI`/the OKLab matrices in scope requires the host to define/splice those FIRST. This is the established, gate-locked idiom — the engine EXTENDS it, mints no new mechanism.

### 1b. Re-forked 5-6× (the DRY debt the redevelopment forces us to pay)

**The noise basis.** There is no shared noise chunk. The Dave-Hoskins p3 `hash21` + quintic-faded `valueNoise` + the `fbm` octave loop are re-authored, per shader, today in:
- `aurora.wgsl.ts` / `aurora.frag.ts` (`hash21`/`hash22`/`vnoise`/`fbm`, 2.02 lacunarity)
- `paper-grid.{glsl,wgsl}.ts` (`hash21`/`valueNoise`/`potentialFBM`, 3-octave) — transcribes `paperGrid.ts`
- `dot-flow-field/shaders/flow-field.glsl.ts` + `flowField.ts` (`hash21`/`valueNoise`/`fbm`) — the SAME p3 hash, written as `vec3(p.x,p.y,p.x)` where paper-grid writes it scalar-unrolled
- `goo-blob/shaders/metaball-noise.wgsl.ts` + `watercolor-edges.glsl.ts` (the blob's own 3D-p3 hash + value noise)

These are **the same Dave-Hoskins/IQ value-noise family written four ways** (the AV.W2 §3a note already flags the divergence as "legitimately per-shader" — but that judgement predates the redevelopment mandate that they share wave-math, which forces a shared noise basis underneath the wave).

**The wave field.** The Gerstner/Tessendorf sum-of-sines `h(p,t) = Σ Aᵢ·sin(kᵢ·(Dᵢ·p) − ωᵢ·t + φᵢ)` with deep-water dispersion `ωᵢ = √(g·kᵢ)` + its ANALYTIC gradient/curl lives ONLY in `dot-flow-field/composables/flowField.ts` (+ its WGSL compute kernel transcription). Concentric's `ringField.ts` carries a DIFFERENT sum-of-sines (radial Fourier ring crests); paper-grid carries NONE (pure curl-fbm warp). The mandate says all three must perturb with the SAME wave math — so the wave field must be hoisted out of flow-field into a shared chunk all three splice.

---

## 2. The proposed engine — the four-chunk `field/` family

Mint a `field/` shader-chunk directory beside the existing shared chunks. Each member ships a GLSL twin + a WGSL twin (the byte-identical-numerics discipline `procedural-color` already holds, so `proof:gpu-substrate-single`'s ΔE bar measures both paths against ONE math).

```
src/composables/glass/webgl/shaders/field/
├── noise.glsl.ts   / noise.wgsl.ts    ← THE single hash + value-noise + fbm basis  (NET-NEW, hoist)
├── wave.glsl.ts    / wave.wgsl.ts     ← Gerstner/Tessendorf sum-of-sines + analytic ∇ (HOIST from flowField.ts)
├── flow.glsl.ts    / flow.wgsl.ts     ← curlFBM  (EXISTS — MOVE here, re-export from old path one cut)
└── color → re-export procedural-color  (EXISTS — stays put; the parity gate freezes its path)
```

> Co-locate the existing `flow.{glsl,wgsl}.ts` + `procedural-color.{glsl,wgsl}.ts` into `field/` for a single discoverable home, OR keep them and add only `noise`/`wave` — a layout decision for the wave, not a math one. The math contract below is layout-independent.

### 2a. `noise` — the ONE basis (the keystone hoist)

Exports (GLSL `_GLSL` / WGSL `_WGSL`, the splice-string idiom):
- `HASH_NOISE` — `hash21`/`hash22` (the Dave-Hoskins p3 hash, ONE canonical spelling) + `valueNoise` (quintic-faded 2D value noise).
- `FBM` — the configurable fbm octave loop. The lacunarity/octave divergence (aurora 2.02 + uniform octaves; paper-grid 3-octave) is parameterized, NOT re-forked: `fbm(p, octaves, lacunarity, gain)` with the host passing its constants. Reuses the shared `FBM_ROT` from `procedural-color` (already ONE-source).
- `potentialFBM` provider — the host wraps `fbm` as `potentialFBM` so `flow`'s `curlFBM` and `wave`'s perturbation term both find their basis. This closes the splice-order contract (`flow` already requires a host `potentialFBM`; now the host gets it from the shared basis instead of re-rolling it).

The painterly `gnoise`/PCG2D stays in `procedural-color` (it is the NPR pigment basis the smooth pole does NOT splice — the §3a smooth-vs-painterly split is correct and KEPT). `noise` is the SMOOTH/atmospheric basis; `procedural-color` keeps the painterly one. Two bases, each ONE-source.

### 2b. `wave` — the shared Gerstner/Tessendorf field (the mandate's "SAME wave-based math")

Hoist `flowField.ts`'s `WaveComponent[]` + `gerstnerVelocity` into a shared chunk:
- `WAVE_FIELD` — `waveHeight(p, t, waves)` = the sum-of-sines scalar height `h(p,t)`; `waveGrad(p, t, waves)` = the ANALYTIC ∇h (closed-form, no finite difference); `waveCurl(p,t,waves)` = `(∂h/∂y, −∂h/∂x)` (divergence-free advection, what flow-field rides today).
- The wave-component array is a UNIFORM struct (`array<vec4>` packing `amplitude·wavelength·directionAngle·phase` per component) — the std140/WGSL-alignment source-of-truth already proven by `uniformBridgeWGPU.ts`. `ωᵢ = √(g·kᵢ)` is DERIVED in-shader (not stored), per the Tessendorf dispersion relation.

The three consumers + how each rides it (the mandate, made concrete):
- **dot-flow-field** — advects its dot-matrix tessellation along `waveCurl` (today's flow, unchanged math, now shared). The mandate's "dots tessellate to display arbitrary images, a wave washing over naturally" is the wave field MODULATING the per-dot fade/grow over an image-derived target field.
- **concentric** — the "warp/perturb with the SAME wave-based math as the grid lines": its level-set ring field reads a `waveHeight` PERTURBATION term added to the ellipsoidal radius (the per-level-set subtle perturbation the mandate names), so the rings breathe on the same wave the grid does. ringField.ts's radial-Fourier crests STAY (they are the level-set GENERATOR); the wave is the shared PERTURBATION layered on.
- **paper-grid** — "deepen the warp/perturbation; SHARED wave-math with concentric + dot-matrix": today paper-grid warps on `curlWarp` (curl-fbm only). Add a `waveCurl`/`waveHeight` term to the domain warp so the grid bows on the SAME wave field, at deeper amplitude (the mandate's "deepen").

### 2c. `flow` + `color` — EXISTING, frozen-path

`flow` (`curlFBM`) and `color` (`procedural-color`) stay as-is. `color`'s path is FROZEN by `proof:gpu-substrate-single`'s ΔE bar + the `blob-color-equivalence` 1e-6 gate — the engine touches NEITHER's numerics. The only change is `flow`'s `potentialFBM` host-dependency is now satisfied by `noise` (a wiring change, byte-identical operator).

---

## 3. The layered field model — how the four chunks compose into "aurora logic" every viz samples

The unifying abstraction the mandate intuits ("similar aurora logic") is a **layered scalar/vector field pipeline** every fullscreen viz walks:

```
1. DOMAIN WARP   p' = p + warpAmp·( curlFBM(p,t)      [flow]
                                  + waveCurl(p,t)     [wave]   )   ← the "liquid" — DRY across aurora/paper-grid/concentric
2. FIELD SAMPLE  f  = hostField(p', t)                                ← the per-viz IDENTITY (nuclei softmax / ring crests / grid coverage / dot thickness)
3. PERTURB       f += pertAmp·waveHeight(p,t)                         ← the shared subtle per-feature wobble [wave]
4. COLOR         rgb = samplePaletteRamp(stops, f)  [color] → OETF    ← DRY OKLCh tint, ONE seam
```

- **Steps 1, 3, 4 are the SHARED engine** (flow + wave + color + noise underneath). Identical machinery across aurora, paper-grid, concentric, dot-matrix.
- **Step 2 is the per-viz protagonist** — the ONE function that makes aurora≠concentric≠paper-grid. It stays local (aurora's `nucleiField`, concentric's `sampleRingField`, paper-grid's `gridCoverage`, dot-matrix's `thickness(field)`). This is NOT over-abstracted: each `hostField` is the viz's reason to exist; the engine owns the warp/perturb/color SCAFFOLD around it.

This is the IQ domain-warp `f(p) → f(g(p))` discipline paper-grid already documents, GENERALIZED to a shared warp source. "Leverage similar aurora logic in dot-matrix areas" = dot-matrix's per-dot target field IS a `hostField` sampled at each dot center, warped + perturbed by the SAME steps 1/3, tinted by step 4.

---

## 4. Why this is the DRY/architectural answer (and the fences)

- **DRY — one math, N consumers.** The noise basis collapses 5-6 forks → 1 (per backend). The wave field collapses 1 trapped-in-flow-field → 1 shared (3 consumers). No viz re-derives hash/fbm/wave/color/flow. A wave-math improvement lands ONCE.
- **No new mechanism.** The engine is the EXISTING template-splice + splice-order contract + per-backend twin + ΔE-parity discipline `procedural-color`/`flow` already prove. Zero new abstraction to learn.
- **The smooth-vs-painterly split is KEPT (the fence against over-collapse).** `noise` is the smooth/atmospheric value-noise basis; `procedural-color`'s `gnoise`/PCG2D stays the painterly pigment basis. Collapsing the two would re-band the smooth aurora — they are deliberately distinct (AV.W2 §3a, RE-AFFIRMED).
- **The per-viz `hostField` stays local (the fence against over-abstraction).** The engine owns the SCAFFOLD, never the identity. A viz forking the warp/wave/color/noise reds the gate; a viz keeping its own `hostField` is correct.
- **GPU-only by construction.** Every chunk is a WGSL+GLSL pair; there is NO Canvas2D path (the mandate's ZERO-Canvas2D law holds — see `gpu-substrate-unify.md`). The CPU twins (`flowField.ts` etc.) stay as the round-trip TEST oracle (`proof:*` transcription gates), NOT a render path.
- **Parity preserved.** `color`'s numerics are frozen; `wave`/`noise` get their OWN per-backend byte-identical-numerics assertion + a CPU-transcription round-trip gate (the `flowField.ts ↔ flow-field.compute.wgsl` precedent generalized).

---

## 5. Migration map (the W-FIELD-ENGINE sub-steps — for the executing wave, NOT now)

1. **Hoist `noise`** — mint `field/noise.{glsl,wgsl}.ts` from the canonical Dave-Hoskins hash + value-noise + parameterized `fbm`. Re-point aurora/paper-grid/dot-flow-field/blob host shaders to splice it (the `fbm` loop becomes `fbm(p, oct, lac, gain)` with host constants). Byte-equivalence asserted per viz (the splice must reproduce the prior emitted shader numerics).
2. **Hoist `wave`** — mint `field/wave.{glsl,wgsl}.ts` from `flowField.ts`'s Gerstner sum + analytic ∇. dot-flow-field re-points (math unchanged). Add the `WAVE_FIELD` uniform struct to the bridge.
3. **Wire concentric + paper-grid** — add the shared `waveHeight`/`waveCurl` PERTURBATION/warp term (the redevelopment's "SAME wave math" + "deepen"). Each keeps its `hostField`.
4. **Co-locate flow/color into `field/`** (optional layout) — MOVE + one-cut re-export, clean break (no dual path).
5. **Gate** — `proof:field-engine`: (a) ONE noise basis (no surviving fork) (b) ONE wave field (c) every viz splices the chunks not a re-roll (d) the smooth/painterly fence (e) the per-viz `hostField`-stays-local fence + a self-test bite (a planted hash re-fork reds). `proof:gpu-substrate-single` extends its parity table with `wave`/`noise` rows.

---

## 6. Open questions for the wave (record, don't decide now)

- **Layout:** co-locate `flow`+`color` into `field/`, or leave them and add only `noise`+`wave`? (Discoverability vs churn — the parity gate path-pins `procedural-color`, so a move needs the gate's path updated in lockstep.)
- **`fbm` parameterization:** uniform-vs-constant octaves — pass octave count as a compile-time `const` per host (zero ALU cost, the GLSL-`const` idiom) vs a uniform (runtime-tunable, the configurator's reach). Lean compile-time `const` for the smooth pole (no per-frame cost), uniform only where the configurator must dial it.
- **The wave-component count cap:** the uniform `array<vec4, N>` needs a fixed N (std140). dot-flow-field's current N is the floor; concentric/paper-grid perturbation needs ≤ that. Pick the max-of-consumers N.

---

## 7. The executing wave

**`W-FIELD-ENGINE`** (Band 6 · AURORA, sequenced after the substrate spine `W-GPU-ONLY-SPINE` and before the per-viz REDEVELOP waves — blob/dot-matrix/concentric/paper-grid all CONSUME it). Depends-on: `gpu-substrate-unify.md`'s spine (GPU-only, no Canvas2D). Consumed-by: every fullscreen field viz. Gate: `proof:field-engine` + the extended `proof:gpu-substrate-single` parity table.
