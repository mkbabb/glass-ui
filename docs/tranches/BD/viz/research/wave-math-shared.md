# The SHARED wave-math field primitive — ONE math source for aurora · paper-grid · concentric · dot-matrix · blob (BD generative-viz redevelopment)

**Lane** BD viz-research / shared-math · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Substrate-grounded** against `src/composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts` + `procedural-color.{glsl,wgsl}.ts` + `paper-grid/composables/paperGrid.ts` + `concentric/composables/ringField.ts` + `dot-flow-field/composables/flowField.ts` + the aurora `domainWarp` at HEAD ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. Return: a 4-6 line summary; THIS doc is the binding artifact.

> Read alongside the sibling research that already diagnosed the fork: `papergrid-warp.md` §0 (Finding 1 — three copies of the basis, two of the dispersion), `concentric-levelset.md` §0 (the field overturn — level sets of an arbitrary `F(p,t)`), `dotmatrix-image.md` (the dot-matrix image-tessellation). This doc is the CANONICAL shared-primitive design those three CONSUME.

---

## 0. TL;DR — the finding and the proposal

**The substrate ALREADY agrees with the user's intent at the math level but VIOLATES it at the code level.** Every procedural-field viz speaks the SAME two-part vocabulary:

1. A **Bridson divergence-free curl-noise warp** — `curlFBM(p) = ∇⊥ψ` over a value-noise fbm potential ψ (the "liquid not noise" advection — Bridson, *Curl-Noise for Procedural Fluid Flow*, SIGGRAPH 2007).
2. A **Tessendorf/Gerstner sum-of-sines wave** with the deep-water dispersion `ω = √(g·k)` (Tessendorf, *Simulating Ocean Water*, SIGGRAPH 2001) — the coherent, physically-grounded breathing/drift.

But they carry it as **THREE+ independent copies** of the noise basis + **TWO copies** of the dispersion constant. The shared `flow.{glsl,wgsl}.ts` chunk factors ONLY the basis-agnostic curl OPERATOR — not the basis, not the dispersion, not the warp composition.

**The proposal: mint ONE shared `wave-field` chunk family (the AV.W2 `procedural-color` precedent applied to FLOW + WAVE), with FOUR layers, each a separately-named export, spliced per-backend (GLSL + WGSL) and mirrored ONCE in JS.** A perturbation tuning then lands ONCE and aurora + paper-grid + concentric + dot-matrix + blob move together — literally "the same wave-based math."

The chunk is **WebGPU/WebGL2-only by construction** (a pure shader-string + a JS twin for the round-trip gate — no Canvas2D, the BD mandate satisfied trivially).

---

## 1. The fork surface, read precisely (what is duplicated TODAY)

| Math leaf | aurora | paper-grid | concentric | dot-flow-field | blob | shared today? |
|---|---|---|---|---|---|---|
| `hash21` (2D value-noise hash) | own (`aurora.frag`/`.wgsl`) | own (`paperGrid.ts` + shaders) | — (analytic rings) | own (`flow-field.glsl`) | own (`goo-dot.wgsl`) | **NO — 4 copies** |
| `valueNoise` (quintic-faded) | own | own | — | own | own | **NO — 4 copies** |
| `potentialFBM` (3-octave fbm) | own (`fbm`, 2.02 lac) | own (`potentialFBM`) | — | own | own | **NO — 4 copies** |
| `curlFBM` OPERATOR | **shared chunk** `flow.glsl.ts` | **shared chunk** | — (none yet) | **shared chunk** (+ JS twin) | own | **PARTIAL — operator shared, JS twin re-mirrored** |
| `CURL_EPS = 0.012` | (in chunk) | own (`paperGrid.ts:37`) | — | own (`flowField.ts`) | — | **NO — re-declared in 2 JS twins** |
| Gerstner wave `A·sin(k·(D·p) − ωt + φ)` | — (uses fbm warp) | — | own (`sampleRingField`) | own (`gerstnerVelocity`) | — | **NO — 2 copies** |
| Dispersion `ω = √(g·k)`, `g = 9.81` | — | — | `RING_GRAVITY=9.81` | `FLOW_GRAVITY=9.81` | — | **NO — 2 copies of the constant + the law** |
| `domainWarp` (IQ double-warp `f(p+w(p))`) | own (Quilez `q→r`) | own (`curlWarp` counter-flow) | — | — | — | **NO — 2 copies of the composition** |

**The diagnosis:** the curl OPERATOR is shared, but the three things AROUND it that the user's "same wave-based math" actually names — the **noise BASIS**, the **dispersion LAW**, and the **warp COMPOSITION** — are forked 2-4 ways. A "deepen the warp" tuning today requires editing N files and risks the three viz drifting apart (precisely the "they should move together" the user wants).

---

## 2. The proposed shared chunk — `wave-field.{glsl,wgsl}.ts` (the ONE source)

Home: `src/composables/glass/webgl/shaders/wave-field.glsl.ts` + `wave-field.wgsl.ts` (beside `flow.{glsl,wgsl}.ts` and `procedural-color.{glsl,wgsl}.ts` — the established shared-chunk dir). The existing `flow.*` chunk's `curlFBM` operator is **absorbed into / re-exported through** this family so there is ONE flow home (no parallel chunk; `flow.*` either folds in or stays as the operator-only leaf this family `${…}`-splices — see §6 disposition).

Four NAMED layers, each a `/* glsl */` / `/* wgsl */` `export const` template string (the AV.W2 splice mechanism — no `#include`, no bundler step, the emitted shader is char-identical to a hand-inline):

### Layer 1 — `WAVE_BASIS` (the noise BASIS, the missing shared leaf)

The genuinely-shared, byte-identical noise basis the four viz each re-mint today:

```glsl
// hash21 → valueNoise (quintic fade) → fbmPotential (N-octave, FBM_ROT mat2(0.8,0.6,-0.6,0.8))
float hash21(vec2 p);
float valueNoise(vec2 p);            // quintic-faded 2D value noise
float fbmPotential(vec2 p, int octaves);  // the host noise basis ψ — N-octave fbm
```

This is the leaf the host TODAY defines as `potentialFBM` before splicing the curl chunk. Minting it shared closes the 4-copy `hash21`/`valueNoise`/`fbm` fork. The **lacunarity/gain are chunk constants** (2.02 lac / 0.5 gain — aurora's value, the suite default) so the basis is ONE; a viz that genuinely needs a different basis (the blob's organic field) passes its own — but the DEFAULT is shared.

### Layer 2 — `CURL_FLOW` (the curl OPERATOR — the existing `flow.*` chunk, re-homed)

The divergence-free 2D curl `∇⊥ψ = (∂ψ/∂y, −∂ψ/∂x)`, central-difference at `CURL_EPS` — **byte-identical to today's `CURL_FBM_GLSL`/`CURL_FBM_WGSL`**. It wraps `fbmPotential` (Layer 1) as its potential, so the basis + operator are ONE math source. `CURL_EPS = 0.012` is the chunk constant (closing the 2-copy re-declare in the JS twins).

```glsl
vec2 curlFlow(vec2 p, int octaves);   // ∇⊥(fbmPotential) — the Bridson liquid warp
```

### Layer 3 — `GERSTNER_WAVE` (the dispersion LAW + the sum-of-sines — the missing shared leaf)

The Tessendorf/Gerstner deep-water wave + the dispersion `ω = √(g·k)` that concentric (`RING_GRAVITY`) and dot-flow (`FLOW_GRAVITY`) fork today:

```glsl
const float WAVE_GRAVITY = 9.81;     // the ONE dispersion constant (was RING_GRAVITY + FLOW_GRAVITY)
float waveDispersion(float k);       // ω = sqrt(WAVE_GRAVITY · k) — the deep-water law
// one wave component: A·sin(k·dot(D,p) − ω·t + φ), with the ANALYTIC gradient for curl-free flow
WaveSample gerstnerWave(vec2 p, float t, vec4 comp /*A,λ,φ,dirAngle*/);
```

The analytic-gradient form is shared (the `∂h/∂p` concentric + dot-flow both transcribe) so the curl of the wave potential is exact (no finite difference where it can be analytic — the dot-flow `gerstnerVelocity` precedent).

### Layer 4 — `DOMAIN_WARP` (the warp COMPOSITION — the IQ double-warp + the counter-flow)

The IQ domain-warp substitution `f(p) → f(p + w(p,t))` packaged ONCE, with the named registers the deepening surface needs (§4):

```glsl
// the canonical liquid warp: a coarse readable advection + a fine per-line perturbation,
// TWO counter-flowing curl terms (Alex Harri counter-flow — never visibly loops) + the
// optional Gerstner breathe term. Each scale/amp is a uniform; the COMPOSITION is shared.
vec2 domainWarp(vec2 p, float t, WaveWarpParams w);
```

This is the seam paper-grid's `curlWarp` + aurora's `domainWarp` both fork — unified, so "deepen the warp" is ONE edit to the composition + the uniform defaults.

---

## 3. The consume contract — how each viz reads the ONE source

| Viz | Layer 1 basis | Layer 2 curl | Layer 3 wave | Layer 4 warp | new-vs-shipped |
|---|---|---|---|---|---|
| **aurora** | `fbmPotential` (its 2.02 loop IS the default) | `curlFlow` on `warpMode:"curl"` | optional breathe | `domainWarp` (replaces local `domainWarp`) | folds local copies onto chunk |
| **paper-grid** | `fbmPotential` | `curlFlow` (the readable bow) | breathe term (deepening §4) | `domainWarp` (replaces `curlWarp`) | DEEPENS via the shared params |
| **concentric** | `fbmPotential` (NEW — for the irregular field `F`) | `curlFlow` per-level perturb | `gerstnerWave` (replaces `sampleRingField`'s local sum) | `domainWarp` global drift | the level-set overturn (concentric-levelset.md) consumes this |
| **dot-matrix** | `fbmPotential` (the image-wash mask) | `curlFlow` (the wash flow) | `gerstnerWave` (the natural wave-over) | `domainWarp` | NEW consumer (dotmatrix-image.md) |
| **dot-flow-field** | `fbmPotential` | `curlFlow` (+ JS twin folds onto the shared JS) | `gerstnerWave` (replaces local) | — | folds local copies |
| **blob** | optional (organic field can stay local) | optional satellite-drift | optional | optional | OPT-IN consumer (blob.md) |

**The DRY win:** a single tuning to `WAVE_GRAVITY`, the lacunarity, `CURL_EPS`, or the warp composition lands in ONE chunk and the whole suite re-derives. "Move generally together with inner variation" (the concentric spec) is exactly the shared global flow (Layer 4 `domainWarp`) + a per-instance seed offset (each viz/level passes its own `p + seedOffset` into the SAME chunk).

---

## 4. The "deepen the warp" surface (paper-grid + concentric), structured-not-smeared

The user wants DEEPER warp/perturbation. The fence (from `papergrid-warp.md` Finding 2): deepening is NOT "crank the amplitude" (smears the grid into the "blurry mess" defect). It is **multi-scale structure**, each a NAMED uniform register inside Layer 4:

- **`warpCoarse`** — the readable low-freq bow (today's single warp). KEEP legible.
- **`warpFine`** — a finer, lower-amplitude per-line curl perturbation layer (the new "deep" detail; counter-flowing so it never loops).
- **`waveBreathe`** — the Layer-3 Gerstner term modulating the warp amplitude over time (the "breathing" — coherent, physical, `ω=√(g·k)`).
- **`anisotropy`** (optional) — stretch the warp along the local flow direction (the topographic level-set "stretch/shrink" — concentric).

"Deep" = coarse + fine + breathe composed, each separately tunable, so it reads RICH-but-legible. The SAME registers drive concentric's per-level-set perturbation (each iso-contour wobbles on its own seed through the SAME `domainWarp`) and dot-matrix's wave-wash.

---

## 5. Why ONE shared chunk (not N forks) — the architecture rationale

1. **The user's literal ask.** "the SAME wave-based math" / "similar aurora logic" — a shared chunk is the only architecture where that is STRUCTURALLY true (not coincidentally-similar code that drifts).
2. **The DRY/no-fork seam the repo already enforces.** AV.W2 `procedural-color.{glsl,wgsl}.ts` (the OETF + OKLCh matrices + FBM_ROT, ONE color math across both backends) is the exact precedent — a genuinely-shared-AND-identical math leaf the procedural surfaces splice. `flow.{glsl,wgsl}.ts` is the half-done version (operator only). This completes it.
3. **WebGPU/WebGL2-only, zero Canvas2D.** The chunk is a pure shader string per backend + a JS twin (for the `proof:*` numeric round-trip ONLY, never a render path). No `getContext("2d")`. The BD mandate is satisfied by construction.
4. **Performance.** ONE basis means a viz pays for the fbm octaves ONCE; the curl + wave + warp share the same `fbmPotential` evaluation where they overlap (no redundant noise taps).
5. **The ≥3-consumer bar is already MET-and-exceeded.** `curl-fbm.md` books 3 consumers for the operator; the wave-field family adds basis (4 consumers) + dispersion (2→shared) + warp (2→shared). Every layer clears the shared-chunk bar.

---

## 6. The splice-order law + the `flow.*` disposition (the no-dual-path fence)

**The dependency contract (carried from `flow.*`):** a WGSL function may only call a function declared EARLIER (no forward decl); GLSL allows a prototype. So the chunk EXPORTS its layers in dependency order (`WAVE_BASIS` → `CURL_FLOW` → `GERSTNER_WAVE` → `DOMAIN_WARP`) and the host splices them in that order ABOVE `main()`. Each layer is an independent `export const` so a viz that needs only the basis + curl (paper-grid) splices two, not four.

**The `flow.{glsl,wgsl}.ts` disposition (W-PRUNE-CONSOLIDATE / no-dual-path):** `flow.*` currently owns `curlFBM`/`CURL_FBM_{GLSL,WGSL}`. Two clean options, NO dual path:
- **(A) Fold-in (preferred).** `flow.*`'s curl operator BECOMES `wave-field.*`'s Layer 2 (re-named `curlFlow`, wrapping the shared `fbmPotential`); `flow.*` is RETIRED (its `curlFBM` callers re-point onto the wave-field chunk). Clean break, no alias — the BD "no legacy" mandate.
- **(B) Compose.** `wave-field.*` `${CURL_FBM_GLSL}`-splices the existing `flow.*` chunk (keeps the operator's single home, adds the basis + wave + warp around it). `flow.*` survives as the operator-only leaf.

Recommend **(A)** — the user's mandate is gestalt-first, no-legacy; one chunk home for ALL the flow/wave/warp math is the cleaner gestalt. The JS twins (`paperGrid.ts`/`flowField.ts`/`ringField.ts` `potentialFBM`+`curlFBM`+`CURL_EPS`+`*_GRAVITY`) collapse onto ONE shared JS module (`src/composables/glass/waveFieldMath.ts`) the `proof:*` round-trip reads — closing the 2-4-copy JS fork too.

**Machine-lock proposal:** `proof:wave-field-single` (the superset of the booked `proof:single-color-core` shape) — (1) ONE chunk home, no parallel basis/curl/dispersion definition in any viz shader; (2) every viz `${…}`-splices the named layers it uses; (3) the JS twin is ONE module; (4) a numeric round-trip per layer (the GLSL/WGSL/JS agree within ε) + a self-test bite (a planted second `hash21`/`9.81`/`CURL_EPS` re-declaration in a viz reds the gate). The existing `proof:flow-field` / `proof:viz-papergrid` numeric round-trips FOLLOW the fold (assert against the shared module).

---

## 7. Risks + the open decisions for the wave

- **Basis-divergence risk.** aurora's fbm carries a per-octave domain-cost tier (AX.W12 §3a) the blob/grid do not. The shared `fbmPotential(p, octaves)` takes `octaves` as a param so each viz keeps its cost tier WITHOUT forking the basis — but verify the brush/medium aurora paths (which carry their OWN `hash21` for the painterly register) are LEFT (they are a distinct decorative basis, not the warp basis — a fence, like the silver-quad neutral exception).
- **The blob is OPT-IN.** Per the rename/redevelop mandate (blob.md), blob's organic satellite field may stay local — the shared chunk is OFFERED, not forced. The ≥3-bar is already met without it.
- **WGSL `array`/struct uniforms.** Layer 3/4 take a `WaveWarpParams`/`vec4 comp` — the WGSL struct + the GLSL uniform-pack must agree (the `uniformBridge` typed-struct precedent, dot-flow's `uniformBridgeWGPU.ts`). The shared chunk declares the math, the host owns the uniform plumbing (the basis-agnostic discipline).
- **DECISION for the wave:** fold-in (A) vs compose (B) for `flow.*`; whether `domainWarp` is one chunk or aurora keeps its Quilez `q→r` double-warp as a distinct `auroraWarp` (its painterly look may diverge from the grid's counter-flow — verify on capture before forcing the unify).

---

## 8. Summary

The suite ALREADY speaks one wave-math vocabulary (Bridson curl + Tessendorf `ω=√(g·k)`) but forks the BASIS (4×), the DISPERSION (2×), and the WARP COMPOSITION (2×) — the shared `flow.*` chunk factors only the curl operator. Mint ONE `wave-field.{glsl,wgsl}.ts` chunk family (the AV.W2 `procedural-color` precedent for FLOW+WAVE) with four named layers — `WAVE_BASIS` (noise), `CURL_FLOW` (Bridson curl, absorbing `flow.*`), `GERSTNER_WAVE` (the ONE `ω=√(g·k)` dispersion), `DOMAIN_WARP` (the IQ multi-scale warp composition) — spliced per-backend (WebGPU + WebGL2, zero Canvas2D) + mirrored ONCE in a shared JS module for the round-trip gate. aurora · paper-grid · concentric · dot-matrix · dot-flow-field CONSUME it (blob opt-in); a perturbation tuning lands once and the suite moves together. The "deepen the warp" surface is a multi-scale structured register (coarse bow + fine perturb + Gerstner breathe), NOT amplitude-cranking. Retire `flow.*` clean (fold-in, no alias); collapse the JS twins onto one module; machine-lock with `proof:wave-field-single`.
