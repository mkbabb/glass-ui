# Aurora SOTA research — surviving lanes (5/32; rest re-running)

## Lane 1

I have all the curl-noise math from the search summary (v = perpendicular gradient of potential, divergence-free). I have everything needed for the brief. Let me write the synthesis.

---

# AW Aurora Research Brief — Lane "fbm-domain-warp"

SOTA for fractal Brownian motion, domain warping, IQ-style organic flow fields, and how to push the aurora to stunning gradient-art. Research + wave-seeds only, no implementation. All citations carry URL + access date (2026-06-06).

## What the aurora already has (grounding)

The aurora is a single WebGL2 fragment program assembled from partials. It already implements a lot of the canonical machinery — the gap is in *fidelity*, *control atoms*, and *modern color/compute*, not in starting from zero.

- **Quilez double domain-warp is already in** — `domainWarp()` computes the textbook `q`/`r` two-level warp verbatim (`src/components/custom/aurora/constants/shaders/aurora.frag.ts:206-224`), with the `vec2(5.2,1.3)`/`vec2(1.7,9.2)`/`vec2(8.3,2.8)` offset constants and the `4.0*q`/`4.0*r` amplitudes exactly as IQ specifies.
- **Rotated-octave fBm is already in** but **shallow and value-only** — `fbm()` loops 5 octaves with `0.5` gain, `2.02` lacunarity, and a fixed `FBM_ROT = mat2(0.8,0.6,-0.6,0.8)` rotation between octaves (`aurora.frag.ts:164-174`, constant at `procedural-color.glsl.ts:66`). It returns a scalar only — **no analytic gradient**, so no flow-aligned erosion or curl is possible from it today.
- **Flow field is hand-dispatched, not divergence-free** — `flowField()` picks radial/swirl/diagonal/multi and perturbs by raw `fbm` (`flow.glsl.ts:5-51`). The "multi" pattern maps `fbm → angle` directly, which is *not* curl-free, so it doesn't read as fluid.
- **Color is CPU-baked linear-sRGB LUT, mixed in linear** — `samplePalette()` does a plain `mix()` between adjacent stops in linear-sRGB (`composition.glsl.ts:8-17`). The OKLCh matrices exist in the shared chunk (`procedural-color.glsl.ts:73-134`) but **aurora does not splice them** — there is no in-shader perceptual interpolation.
- **Mediums are mature** — watercolor wet-edge/granulation, pastel anisotropic fBm, crayon tooth-multiply, and a 4-layer curved-spine oil brush with best-of-9 placement, impasto rim-light, bristle-ragged edges (`mediums.glsl.ts`, `brush.glsl.ts`). This is genuinely strong; the van-Gogh gap is *stroke-direction sourcing* and *depth layering*, not stroke primitives.
- **Atoms of control already exist** — palette stops (OKLCh), nuclei (position/radius/bias/drift/elongation/angle), warp, flow, medium params (`DESIGN.md:78-131`). The "simplified options + derive-color variant" ask is a *re-grouping/derivation* problem over these atoms, not new atoms.

## The techniques (SOTA findings)

### 1. Domain warping — `f(p) = fbm(p + fbm(p + fbm(p)))`

The canonical recursive warp: replace `f(p)` with `f(g(p))` where `g(p) = p + h(p)`. Two-level GLSL (IQ verbatim):

```glsl
vec2 q = vec2(fbm(p+vec2(0,0)),      fbm(p+vec2(5.2,1.3)));
vec2 r = vec2(fbm(p+4.0*q+vec2(1.7,9.2)), fbm(p+4.0*q+vec2(8.3,2.8)));
return fbm(p + 4.0*r);
```

The intermediate `q` and `r` vectors are **meant to be exposed and used for color** — IQ's `pattern(p, out q, out r)` form. The aurora computes `r` but discards `q`; mapping `length(q)` and `length(r)` to chroma/value would add free atmospheric depth with zero extra noise calls. ([IQ — Domain warping](https://iquilezles.org/articles/warp/), accessed 2026-06-06.)

### 2. fBm — the gain `H` is the single most expressive knob

`fbm` is a sum of octaves where gain `G = 2^(-H)` (Hurst exponent). The optimized loop avoids `pow`:

```glsl
float G = exp2(-H); float f=1.0, a=1.0, t=0.0;
for(int i=0;i<N;i++){ t += a*noise(f*x); f*=2.0; a*=G; }
```

`H` controls fractal dimension: `H≈1` (G=0.5) → smooth, billowy, atmospheric; `H→0` → rough, detailed, turbulent. **Exposing `H` as a uniform is the cheapest way to span "colored gas" ↔ "stormy/gestural" on one slider** — far more expressive than octave-count, which the aurora exposes today. Detuning lacunarity (2.01/1.99) or rotating per octave (the aurora's `FBM_ROT`, already present) kills axis-aligned grid artifacts. ([IQ — fBm](https://iquilezles.org/articles/fbm/), accessed 2026-06-06.)

### 3. fBm with analytic derivatives — flow-aligned, erosion-like organic structure

`noised()` returns `vec4(value, gradient.xyz)` in one pass (no central-difference cost). The headline move: feed the *running accumulated derivative* `d` back into the octave weight as a damping factor, so later octaves "flow along" the slope of earlier ones:

```glsl
a += b*n.x / (1.0 + dot(d,d));   // octaves damped where slope is steep
d += n.yz;                        // accumulate gradient
```

This is what makes IQ's terrain look eroded/flowing rather than uniformly noisy — "varied terrain with both flat and rough regions without discontinuous shaping functions." For the aurora this gives **non-uniform, atmospheric, fluid** color fields: smooth in some zones, turbulent in others, organically. The aurora's `fbm` returns scalar only — adopting a `noised()`/`fbmd()` variant unlocks both this *and* curl noise (below). ([IQ — fBm with derivatives / "more noise"](https://iquilezles.org/articles/morenoise/), accessed 2026-06-06.)

### 4. Curl noise — true divergence-free fluid flow

The aurora's flow field perturbs direction with raw fBm, which has divergence (sources/sinks) and so reads as wobble, not flow. Curl noise fixes this: take a scalar potential `φ` (an fBm field) and set velocity to its **perpendicular gradient**:

```
v = ∇⊥φ = (∂φ/∂y, −∂φ/∂x)   ⟹   ∇·v = 0  (guaranteed divergence-free)
```

Because the analytic-derivative `noised()` already hands you `∂φ/∂x, ∂φ/∂y`, curl noise is *one swizzle away* once you have derivative fBm. The result is continuously-evolving vortex/swirl motion — exactly the "fluid, non-uniform, atmospheric movement" target. fBm potential → turbulent multi-scale flow. ([Bridson et al., SIGGRAPH 2007 — Curl-Noise for Procedural Fluid Flow](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf); overview [Rombo — Curl Noise](https://www.rombo.tools/2026/01/01/curl-noise/); [Emil Dziewanowski — Dissecting Curl Noise](https://emildziewanowski.com/curl-noise/), all accessed 2026-06-06.)

### 5. Multi-wave desync — the Stripe/OpenAI-gradient fluidity trick

Alex Harri's teardown of the flowing WebGL gradient: layer 3 noise octaves with *different* frequencies AND *different* time-phase speeds (some negative), each with its own time offset, so nothing moves in lockstep:

```glsl
noise += simplex(x*(L/1.00)+F*t, t*S*1.00)*A*0.85;
noise += simplex(x*(L/1.30)+F*t, t*S*1.26)*A*1.15;
noise += simplex(x*(L/1.86)+F*t, t*S*1.09)*A*0.60;
```

Plus **noise-modulated blur** (`pow(noise,3)` biases toward sharp, with soft regions between) and a quintic smoothstep for edges. This is the recipe that beats static mesh gradients — the aurora's single `warpDrift` scalar drives everything at one rate today; **per-octave time desync** is a cheap upgrade to the "slowly alive" feel. ([Alex Harri — A flowing WebGL gradient, deconstructed](https://alexharri.com/blog/webgl-gradients), accessed 2026-06-06; companion [phaser.io repost](https://phaser.io/news/2025/05/a-flowing-webgl-gradient-deconstructed).)

### 6. OKLCh interpolation in-shader — and the Aras optimization

OKLab/OKLCh is perceptually uniform: blue→yellow stays vibrant instead of going gray; equal numeric steps = equal visual steps. The aurora mixes in linear-sRGB today, which dulls mid-gradient. Aras Pranckevičius' optimization: for *interpolation*, you can **drop the second matrix (M2)** and lerp in cube-root LMS space — visually identical to true OKLab, and only ~1.3–1.4× sRGB cost instead of 10–20×:

```
linear → (M1 · c) → cbrt   // interpolate HERE
            ↓ lerp
cbrt → (·)³ → (M1⁻¹ · c) → linear
```

For palettes, OKLCh (cylindrical) lets you interpolate hue along the short *or* long arc — long-arc hue sweeps are how you get rainbow-rich gradient art. The Ottosson matrices are already in the shared chunk (`procedural-color.glsl.ts:76-105`); aurora just needs to splice them. ([Aras — Optimizing Oklab gradients](https://aras-p.info/blog/2022/03/11/Optimizing-Oklab-gradients/); [Xor/GM Shaders — OkLab mini](https://mini.gmshaders.com/p/oklab); [Evil Martians — OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl), all accessed 2026-06-06.)

### 7. Van Gogh — flow-sourced strokes + structure/color decoupling

The 2026 "Thinking Like Van Gogh" paper's actionable ideas (the 3DGS machinery is out of scope, the *principles* are not):

- **Strokes follow structure** — Van Gogh's brushstrokes align to the directional flow of the form, not a global angle. The aurora's oil layers consume a flow vector already (`bestOil` takes `flow`), but that flow is the hand-picked pattern, not derived from the *color field's own gradient*. Sourcing stroke direction from the **gradient of the nuclei/warp field** (the `noised()` derivative) makes strokes hug the color zones the way Van Gogh's hug the form. ("In Van Gogh's paintings the strokes are laid coherently based on object shape.")
- **"Exaggeration in the essential"** — amplify structural/directional contrast, suppress detail. Translates to: boost stroke-direction coherence where the field gradient is strong, scatter where it's weak.
- **Luminance/structure ↔ color decoupling** — deform geometry (stroke layout) on the luminance/structure channel, optimize color separately, to avoid artifacts under aggressive abstraction. For the aurora: drive stroke *placement/direction* off the structure (gradient) field, drive *pigment* off the palette field, independently.

([Thinking Like Van Gogh, arXiv:2601.10075](https://arxiv.org/abs/2601.10075); [TAMU — Van Gogh-Inspired 3D Shader Methodology, Sharma](https://core.ac.uk/download/pdf/147237812.pdf), accessed 2026-06-06.)

### 8. Anisotropic Kuwahara — the painterly "smooth-but-edge-preserving" filter

Maxime Heckel's painterly recipe: three properties make paint read as paint — (1) absence of fine texture, (2) preserved hard edges, (3) quantized color. The **anisotropic Kuwahara filter** delivers all three: divide a kernel into sectors, output the mean of the lowest-variance sector → smooths flats while sharpening boundaries. The Papari extension uses a circular 8-sector kernel with Gaussian/polynomial weighting; a **structure tensor** (Sobel-derived) squeezes/rotates the kernel into an ellipse aligned to local edges — so the smoothing itself becomes directional brushwork. This is a *post* filter (needs the rendered field as input → second pass or compute), which is why it pairs naturally with the WebGPU move below. ([Maxime Heckel — On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/), accessed 2026-06-06.)

### 9. WebGPU/WGSL — the platform move for multi-pass + compute

WebGL2 has no compute pipeline; everything is a fragment-shader workaround, and the aurora is locked to a single full-screen pass (`DESIGN.md:38` "No multi-pass pipelines"). WebGPU adds compute shaders with direct buffer access, shared memory, workgroup sync — which is exactly what anisotropic Kuwahara (structure tensor + multi-pass), curl-noise advection of a stroke buffer, and ping-pong flow fields want. WGSL is stricter (Rust/Swift-like). The realistic path is a **WebGPU render path behind capability detection** with the WebGL2 fragment path as fallback, not a rip-and-replace. ([WebGPU Fundamentals — from WebGL](https://webgpufundamentals.org/webgpu/lessons/webgpu-from-webgl.html); [Maxime Heckel — Field Guide to TSL and WebGPU](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/); [W3C WGSL spec](https://www.w3.org/TR/WGSL/), accessed 2026-06-06.)

---

## ADOPT for glass-ui aurora — wave seeds

Each is a concrete AW aurora wave/fold. Ordered roughly by leverage-per-effort. All are dev-only seeds for a future AW tranche; none implemented here.

- **AW.W?-fbmd — derivative fBm foundation.** Add a `fbmd()` returning `vec3(value, dx, dy)` (analytic gradient, IQ `noised()` port) alongside the existing scalar `fbm`. Splice it into the shared `procedural-color.glsl.ts` chunk so the blob can share it. This is the **keystone** — it unblocks curl noise, flow-aligned strokes, and erosion damping. Keep the scalar `fbm` for cheap call sites. *(IQ morenoise §3.)*

- **AW.W?-curlflow — divergence-free flow field.** Replace `flowField`'s "multi" pattern (and add a new `flow.pattern: "curl"`) with `v = (∂φ/∂y, −∂φ/∂x)` from a `fbmd` potential. Time-evolve the potential. Gives genuinely fluid swirl motion instead of fBm wobble. Curl strength becomes a new control atom; `flowCurl` re-purposes cleanly. *(Bridson 2007 §4.)*

- **AW.W?-erosion-warp — flow-aligned domain warp.** Upgrade `domainWarp` to the derivative-damped accumulation `a += b·n / (1+dot(d,d))`, and **expose `q`/`r` to color** (map `length(q)`→chroma lift, `length(r)`→value mottle). Turns flat color zones into atmospheric, non-uniform, eroded-looking fields for free. *(IQ warp §1 + morenoise §3.)*

- **AW.W?-hurst — single-slider texture axis.** Replace/augment `noiseOctaves: 3|4|5` with a continuous Hurst `H` (gain) uniform. One slider spans billowy-gas ↔ stormy-gestural — a far better "atom of control" than octave count and the headline simplified-options win. *(IQ fbm §2.)*

- **AW.W?-oklch-mix — perceptual palette interpolation.** Splice `OKLCH_MATRICES_GLSL` (already in the shared chunk, `procedural-color.glsl.ts:73`) into aurora; replace `samplePalette`'s linear `mix` with the **Aras cube-root-LMS reduced interpolation** (drop M2). Add short/long hue-arc choice per stop pair for rainbow-rich sweeps. Kills mid-gradient dulling; ~1.3× cost. *(Aras + Ottosson.)*

- **AW.W?-octave-desync — per-octave time phase.** Give each warp/flow octave its own frequency *and* time-speed multiplier (some negative), per the Alex Harri recipe, so the field stops drifting in lockstep. Cheap upgrade to the "slowly alive" breath. Add noise-modulated edge softness (`pow(n,3)` blur bias) for sharp-amid-soft regions. *(Alex Harri.)*

- **AW.W?-vangogh-flow — structure-sourced strokes.** Source oil/pastel stroke *direction* from the **gradient of the color/structure field** (`fbmd` of the nuclei field), not the hand-picked flow pattern, so strokes hug the color zones like Van Gogh's hug the form. Add a `strokeCoherence` atom: high near strong gradients, scattered in flats ("exaggeration in the essential"). Decouple stroke placement (structure channel) from pigment (palette channel). *(arXiv:2601.10075 + TAMU thesis.)*

- **AW.W?-vangogh-depth — stroke depth layering.** Extend the 4-layer oil stack with a true back-to-front depth order + per-layer scale/value ramp so strokes read as physically stacked impasto (current layers composite but don't read as depth). Pair with directional impasto rim-light already in `paintOver` (`brush.glsl.ts:173-178`). The van-Gogh *variant* = curl-flow direction + structure-sourced coherence + depth stack, no subject matter. *(Van Gogh thesis impasto.)*

- **AW.W?-derive-color — palette from atoms.** A `deriveColor(seed | baseHue | mood)` helper that generates a full OKLCh palette + nuclei biases from 1–3 inputs (base hue, chroma energy, light/dark mood), using OKLCh's perceptual uniformity to guarantee balanced stops. Satisfies the "derive-color variant + simplified options" ask — control atoms collapse from ~20 to ~4 for the easy path, full atoms still exposed. *(OKLCh perceptual uniformity.)*

- **AW.W?-kuwahara — anisotropic Kuwahara painterly post (WebGPU-gated).** A second-pass anisotropic Kuwahara filter (structure tensor + circular 8-sector Papari kernel) over the rendered field for a smooth-but-edge-preserved painterly look that the per-pixel mediums can't achieve. Naturally a **WebGPU** path (needs multi-pass/compute); ships behind capability detection with the WebGL2 single-pass as fallback. *(Maxime Heckel painterly + WebGPU.)*

- **AW.W?-webgpu-path — WGSL render path behind detection.** Port the fragment pipeline to WGSL behind `navigator.gpu` detection, WebGL2 as fallback. Unlocks compute-driven curl advection, the Kuwahara pass, and ping-pong flow buffers. Scope as additive (the DESIGN.md "single-pass, zero-dep" invariant relaxes only on the WebGPU branch). Pairs with the existing `useWebGLCanvas` substrate seam (AU.W6). *(WebGPU Fundamentals + WGSL spec.)*

### Notes for the tranche planner

- The **fbmd keystone (AW-W?-fbmd) gates** curlflow, erosion-warp, and vangogh-flow — sequence it first.
- **oklch-mix, hurst, octave-desync, derive-color** are all WebGL2 fragment-path-compatible and independent — low-risk early waves.
- **kuwahara + webgpu-path** are the structural/platform waves — larger, gated behind capability detection, relax the single-pass invariant on the WebGPU branch only.
- The shared `procedural-color.glsl.ts` chunk (`src/composables/glass/webgl/shaders/`) is the right home for `fbmd` and the spliced OKLCh path — keeps aurora/goo-blob convergent (the AV.W2 contract).

**Relevant files:** `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts` (domainWarp:206, fbm:164), `.../shaders/flow.glsl.ts` (flowField:6), `.../shaders/composition.glsl.ts` (samplePalette:9), `.../shaders/brush.glsl.ts` + `mediums.glsl.ts` (oil/medium primitives), `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (shared OETF/FBM_ROT:66 + unspliced OKLCh matrices:73), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/DESIGN.md` (atoms-of-control spec).

---

## Lane 2

a 'plugin:skill' identifier where the colon separates the plugin name from the skill name. Skills without a plugin prefix are built-in.

---

## Lane 3

I have comprehensive coverage. Synthesizing the brief now.

---

# SOTA brief: gradient-noise variants for the glass-ui aurora backdrop

Lane: gradient-noise-variants. Research only — wave seeds, no implementation. Date: 2026-06-06.

## What the aurora already does (grounding)

The aurora is far past a naive mesh-gradient. It already ships the SOTA's core moves, so the wave seeds below are *extensions and substitutions*, not greenfield:

- Value-noise fBM + Quilez double **domain warp** with a spliced rotation constant (`aurora.frag.ts:164-247`, `domainWarp`).
- A **multi-nuclei softmax field** with per-nucleus **anisotropic Gaussian** (elongation + angle) over a CPU-baked **linear-sRGB palette LUT** — i.e. color math is already done in linear, tonemapped with ACES (`composition.glsl.ts`, `aurora.frag.ts:300-340`).
- A **curved swept-brushstroke SDF** with bristle-ragged edges, end-cap blobs, impasto rim-light, best-of-9-neighbor cell placement, broken-color jitter (`brush.glsl.ts`, full file).
- Four PEER mediums (watercolor / pastel / oil / crayon) + a **flow field** with curl perturbation and cursor swirl (`mediums.glsl.ts`, `flow.glsl.ts`).
- **Banding already handled**: 1-LSB **Interleaved Gradient Noise** dither in *display space after the OETF* (`aurora.frag.ts:185-187, 343`) — this is exactly the Jimenez/frost.kiwi canonical recipe (see citations). This is correct and SOTA; do not regress it.

The honest gaps versus the goal ("stunning, arresting, atomic control, true van-gogh, full OKLCh, derive-color, WebGPU, simpler options"): the **noise basis is value-noise only** (`vnoise`, `aurora.frag.ts:148`), color **interpolation in the LUT is linear-RGB not OKLCh** (`samplePalette`, `composition.glsl.ts`), there is **no flow-guided / structure-tensor brush direction** (strokes follow the flow field, not the underlying color gradient), **no blue-noise/Gabor option**, **no derive-color generator**, and **no WGSL/compute path** for the procedural pass.

## Findings by noise variant (the lane proper)

**Value noise (current basis).** Cheapest hash-lerp; fine under fBM + heavy domain warp, which is why the aurora gets away with it. Weakness: subtle axis-aligned/grid artifacts at low octaves, and the gradient is only C1 (the smoothstep fade), so very-low-frequency washes can show faint quilting before the warp hides it. ([GM Shaders Noise 3](https://mini.gmshaders.com/p/noise3))

**Perlin (gradient) noise.** Smoother C2 gradient than value noise, but **directional/axis bias** along the cardinal lattice — visible as a faint plus-shaped clumping in slow painterly washes. Costs 2^N gradient samples per pixel (4 in 2D). Mostly superseded by simplex for backdrops. ([webgl-noise / Gustavson, arXiv 1204.1461, 2012](https://arxiv.org/pdf/1204.1461); [GLSL Noise Algorithms gist](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83))

**Simplex noise.** The upgrade for smooth backdrops: **no noticeable directional artifacts**, continuous well-defined gradient everywhere, and cheaper in higher dims — N+1 samples (3 in 2D, **4 in 3D** vs Perlin's 8). The 3D form matters: it lets you animate the field by moving through a 3rd noise axis (true temporal evolution) instead of scrolling a 2D field. Differences vs Perlin "disappear under fBM" — but the lack of grid bias is exactly what a slow, near-static wash needs. Ashima/Gustavson `webgl-noise` is the canonical texture-free GLSL. ([Gustavson "Efficient computational noise in GLSL", arXiv 1204.1461, 2012](https://arxiv.org/pdf/1204.1461); [webgl-noise webdemo](https://stegu.github.io/webgl-noise/webdemo/))

**Worley / cellular noise.** Distance-to-nth-seed; good for organic *cellular territories*, not smooth washes. The aurora already uses it for `uWarpMode==1/2` (chunky "MEADOW" territories, `aurora.frag.ts:190-224`). Keep as a warp/region variant, not a base. ([Worley noise — Wikipedia](https://en.wikipedia.org/wiki/Worley_noise); [Book of Shaders ch.12](https://thebookofshaders.com/12/))

**Gabor noise.** A convolution of sparse white noise with a Gabor kernel — gives **precise spectral control** (orientation, frequency, bandwidth per band). This is the one *not* in the aurora and the most interesting for painterly work: it produces **oriented, wavy, banded** structure that reads like directional brush-grain or canvas weave, and you can steer its orientation field — i.e. anisotropic Gabor noise *is* a brush-direction field for free. Cost is higher (kernel sampling) but it's the SOTA basis for controllable directional texture. ([Worley vs Gabor summary, esimov / dl.acm 3233306](https://dl.acm.org/doi/pdf/10.1145/3233306); [Gabor noise overview, GM Shaders](https://mini.gmshaders.com/p/noise3))

**Blue noise.** Even spectral distribution, no low-frequency clumps. For backdrops its job is **dithering/stippling**, not the base field. The aurora already does the texture-free equivalent (IGN). A precomputed blue-noise tile (free 64×64 set from Moments-in-Graphics / Christoph Peters) dithers *marginally* cleaner than IGN on 10-bit and for animated grain, but IGN is the right default (no texture fetch). **Warning from the source: don't double-dither** on 6-bit panels (destructive moiré). ([frost.kiwi "How to fix color banding"](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/); [Moments in Graphics free blue-noise](https://momentsingraphics.de/BlueNoise.html); [Bart Wronski, optimizing blue-noise dithering, 2020](https://bartwronski.com/2020/04/26/optimizing-blue-noise-dithering-backpropagation-through-fourier-transform-and-sorting/))

## Cross-cutting techniques that make it "stunning"

**OKLCh interpolation in the LUT.** sRGB/linear interpolation between contrasting hues passes through a desaturated **muddy-gray midpoint** — the "gray band." OKLCh is the adopted standard for gradients precisely because it keeps chroma up and lightness even across the transition. The aurora bakes the palette to linear and `mix()`es in linear (`samplePalette`) — that's the muddy-midpoint path. Pre-resampling the palette LUT in OKLCh (CPU-side, more stops) gives clean, vivid hue arcs with zero shader cost. ([OKLCH gradients & perceptual smoothness, jarhalab](https://colors.jarhalab.com/wiki/oklch-gradients-and-perceptual-smoothness); [Blue Monkey Makes — OKLCH makes better gradients](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients); [MDN oklab()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklab))

**Structure-tensor / edge-flow brush direction (the van-gogh key).** Real painters orient strokes along the *local feature direction*. The SOTA NPR move is: compute the **structure tensor** (Sobel gradients → `[[Jxx,Jxy],[Jxy,Jyy]]`), smooth it, take the **minor eigenvector** as the local flow direction, then orient brushes/anisotropic filtering along it. This is the **Anisotropic Kuwahara** pipeline (Kyprianidis/Kang 2009) and Heckel's real-time browser implementation: Pass 1 structure tensor, Pass 2 anisotropic filter along the tensor, Pass 3 tonemap. The aurora's `bestOil` orients strokes by the *flow field*, not the color gradient — swapping to tensor-derived direction is what gives genuine van-Gogh swirl-around-features brushwork. ([Heckel "On Crafting Painterly Shaders"](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/); [Kang/Kyprianidis "Image and Video Abstraction by Anisotropic Kuwahara Filtering", CGF 2009](https://www.umsl.edu/~kangh/Papers/kang_cgf09.pdf); [Godot anisotropic Kuwahara](https://godotshaders.com/shader/anisotropic-kuwahara-filter/))

**Curl noise for divergence-free flow.** The aurora's flow curl is `atan(fbm)`-based — fine, but **curl noise** (curl of a potential field) is *mathematically divergence-free*, so the flow swirls like incompressible fluid with no sources/sinks (no clumping/scattering). For the "field reads slowly alive" goal and for stroke-direction fields, curl noise is the physically-plausible upgrade. Bitangent/3D-curl variants are cheap. ([al-ro 3D curl noise](https://al-ro.github.io/projects/particles/); [atyuwen bitangent noise](https://atyuwen.github.io/posts/bitangent-noise/); [Bridson et al. "Curl-noise for procedural fluid flow"](https://www.researchgate.net/publication/216813629_Curl-noise_for_procedural_fluid_flow))

**Domain-warp depth (Quilez warp-of-warp).** The aurora does the canonical double warp. Quilez's `fbm(p + fbm(p + fbm(p)))` *triple* warp is the cloud/painterly-depth recipe — one more recursion buys dramatic depth-of-field-like layering. Cheap to add as an octave-budget option. ([Quilez "Domain warping"](https://iquilezles.org/articles/warp/); [Book of Shaders ch.13 fBM](https://thebookofshaders.com/13/))

**Stochastic stamp/splat brushwork.** SIGGRAPH 2025 splat-brush work confirms the production recipe for "no repetitive stamping": **per-placement random jitter of scale AND rotation** so each brush dab differs — exactly what `bestOil`'s per-cell hash does, but the lesson is to push variance (length, width, bulge, hue, AND a stamp-shape index) harder for atomic-brushstroke fidelity. ([nv-tlabs SplatPainting, SIGGRAPH 2025](https://github.com/nv-tlabs/SplatPainting); [Diffusion Texture Painting, SIGGRAPH 2024](https://dl.acm.org/doi/10.1145/3641519.3657458))

**WebGPU / WGSL.** WebGL2 has no compute pipeline — a fragment shader is the only path there. WGSL compute buys workgroup shared memory and direct buffer access, which matters if a future aurora does **multi-pass** painterly work (structure tensor → filter → composite) where intermediate passes want to share data. For a single procedural fragment pass, fragment-shader WGSL is the like-for-like port; compute only pays off for the multi-pass tensor pipeline. The substrate (`useWebGLCanvas`) is WebGL2 today; a WGSL fragment port is a straight transliteration, a compute port is a real rearchitecture. ([WebGPU compute basics, webgpufundamentals](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html); [GM Shaders WebGPU](https://mini.gmshaders.com/p/webgpu); [WGSL spec, W3C](https://www.w3.org/TR/WGSL/))

## ADOPT for glass-ui aurora — wave seeds (AW tranche)

Each is a concrete, self-contained wave/fold. Ordered by impact-per-effort.

- **AW.W?-α — OKLCh palette LUT resample (HEADLINE, cheap).** CPU-side, resample the palette to a higher-stop linear-sRGB LUT by interpolating in **OKLCh** (not linear-RGB) before bake. Kills the muddy-gray midpoint on contrasting-hue presets with zero shader cost. Touches `composition.glsl.ts` `samplePalette` only by widening `MAX_STOPS`; the math lives in `color.ts`. Fold: extend the existing `oklchToLinear` to an `oklchLutResample(stops, n)`.

- **AW.W?-β — simplex noise basis as a `uNoiseBasis` option.** Add Ashima/Gustavson texture-free `snoise` alongside `vnoise`; switch `fbm` over a `uNoiseBasis` uniform (0 value / 1 simplex). Removes the value-noise grid quilting on slow low-octave washes. Adds the **3D-simplex animated-Z** sub-fold (evolve through a noise Z-axis instead of scrolling 2D) for true temporal life. Keep value noise as the cheap default; simplex for the "stunning" presets.

- **AW.W?-γ — structure-tensor brush direction (the van-gogh fold).** Before the oil pass, compute a smoothed structure tensor of the base color field (Sobel on `sampleBase`), take the minor eigenvector, and feed THAT as the brush `flow` into `bestOil` instead of (or blended with) `flowField`. This is the single change that makes strokes curve *around* color features like real van Gogh. Pair with pushed per-dab variance (scale+rotation jitter) per the SIGGRAPH-2025 anti-stamping lesson. Multi-pass; needs a render-target — gate as a quality tier.

- **AW.W?-δ — curl-noise flow field.** Replace the `atan(fbm)` curl in `flow.glsl.ts` with a true divergence-free curl-of-potential field. Cleaner incompressible swirl for the "slowly alive" motion and for the stroke-direction field. Drop-in to `flowField`; no new uniforms required beyond a strength.

- **AW.W?-ε — anisotropic Gabor-noise medium (new painterly basis).** Add a Gabor-noise medium whose **orientation field is driven by the flow/tensor direction** — gives oriented brush-grain / canvas-weave that the current value-noise mediums can't. This is the genuinely-new SOTA variant for the lane; ship as a 5th medium or a `uStrokeMode` so it composes with the brush SDF. Higher cost — quality tier.

- **AW.W?-ζ — derive-color generator (atom-of-control).** A CPU generator that takes ONE seed color (or two) + a harmony rule (analogous / triad / split-complement, all computed in OKLCh) and emits the full nuclei palette + biases. Satisfies the "derive-color variant" and "atoms of control / simplified options" goals. Pure `color.ts`; no shader change. Feeds the OKLCh LUT (W?-α).

- **AW.W?-η — Quilez triple-domain-warp depth tier + simplified preset axis.** Add an optional third warp recursion behind a single "depth" knob, and collapse the dense uniform set into ~4 high-level atoms (Zones / Noise / Color / Motion) the configurator exposes — the rest derive. Directly serves "simplified options" + "atoms of control."

- **AW.W?-θ — WGSL fragment port of the procedural pass (modern-WebGPU seed).** Straight transliteration of `FRAGMENT_SRC` to WGSL behind the existing render-mode switch (`renderMode.ts`), WebGL2 staying the fallback. Scoped as fragment-only; flag the multi-pass tensor pipeline (W?-γ) as the future compute-shader rearchitecture, not part of this seed. Validate against `proof:aurora-space-gamma` (the OETF seam must survive the port).

- **AW.W?-ι — blue-noise dither tier (optional, low priority).** Keep IGN as default; offer a precomputed blue-noise tile dither for animated-grain / 10-bit presets. Carry the frost.kiwi **double-dither warning** as an inline contract note. Marginal — sequence last.

**Do-not-regress note for the tranche:** the display-space post-OETF 1-LSB IGN dither (`aurora.frag.ts:343`) and the linear-pipeline ACES tonemap are already the SOTA banding/space recipe — any noise-basis or WGSL wave must preserve both seams (the `proof:aurora-space-gamma` gate).

### Sources
- [Gustavson, "Efficient computational noise in GLSL," arXiv 1204.1461, 2012](https://arxiv.org/pdf/1204.1461)
- [Ashima/Gustavson webgl-noise webdemo](https://stegu.github.io/webgl-noise/webdemo/)
- [Patricio Gonzalez Vivo — GLSL Noise Algorithms gist](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)
- [GM Shaders "Noise 3" (Xor)](https://mini.gmshaders.com/p/noise3)
- [Worley noise — Wikipedia](https://en.wikipedia.org/wiki/Worley_noise)
- [Book of Shaders ch.12 cellular](https://thebookofshaders.com/12/) · [ch.13 fBM](https://thebookofshaders.com/13/)
- [Non-periodic tiling of procedural noise (Gabor), dl.acm 3233306](https://dl.acm.org/doi/pdf/10.1145/3233306)
- [frost.kiwi "How to (and how not to) fix color banding"](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/)
- [Moments in Graphics — free blue-noise textures (Peters)](https://momentsingraphics.de/BlueNoise.html)
- [Bart Wronski — optimizing blue-noise dithering, 2020](https://bartwronski.com/2020/04/26/optimizing-blue-noise-dithering-backpropagation-through-fourier-transform-and-sorting/)
- [OKLCH gradients & perceptual smoothness — jarhalab](https://colors.jarhalab.com/wiki/oklch-gradients-and-perceptual-smoothness)
- [Blue Monkey Makes — OKLCH makes better gradients](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients)
- [MDN — oklab() CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklab)
- [Maxime Heckel — "On Crafting Painterly Shaders"](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/)
- [Kang/Kyprianidis — "Image and Video Abstraction by Anisotropic Kuwahara Filtering," CGF 2009](https://www.umsl.edu/~kangh/Papers/kang_cgf09.pdf)
- [Godot Shaders — Anisotropic Kuwahara filter](https://godotshaders.com/shader/anisotropic-kuwahara-filter/)
- [Inigo Quilez — "Domain warping"](https://iquilezles.org/articles/warp/)
- [al-ro — 3D Curl Noise](https://al-ro.github.io/projects/particles/) · [atyuwen — bitangent (divergence-free) noise](https://atyuwen.github.io/posts/bitangent-noise/) · [Bridson — Curl-noise for procedural fluid flow](https://www.researchgate.net/publication/216813629_Curl-noise_for_procedural_fluid_flow)
- [nv-tlabs SplatPainting, SIGGRAPH 2025](https://github.com/nv-tlabs/SplatPainting) · [Diffusion Texture Painting, SIGGRAPH 2024](https://dl.acm.org/doi/10.1145/3641519.3657458)
- [webgpufundamentals — WebGPU compute basics](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html) · [GM Shaders WebGPU](https://mini.gmshaders.com/p/webgpu) · [WGSL spec, W3C](https://www.w3.org/TR/WGSL/)

Key glass-ui file:line anchors — `src/components/custom/aurora/constants/shaders/aurora.frag.ts:148` (value-noise basis), `:164-174` (fBM loop), `:185-187,343` (IGN dither — already SOTA), `:206-247` (domain warp); `composition.glsl.ts` `samplePalette` (linear-RGB LUT — OKLCh gap); `brush.glsl.ts` `bestOil`/`curvedStroke` (stroke SDF, flow-not-tensor direction); `flow.glsl.ts` `flowField` (atan-curl, not divergence-free); `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (`OETF_GLSL`/`FBM_ROT_GLSL` splice source); `src/composables/glass/webgl/useWebGLCanvas.ts` (WebGL2 substrate — WGSL port target).

---

## Lane 4

I have everything I need. Let me write the brief.

---

# SOTA Research Brief — Aurora OKLCh Shader Color (Lane `oklch-shader-interp`)

Tranche-development research only. No implementation. All findings cross-referenced against the current aurora pipeline at `src/components/custom/aurora/`.

## Current-state baseline (what aurora already does)

- **Palette baked CPU-side to LINEAR sRGB** via value.js Ottosson core (`composables/color.ts:42` `flattenPalette` → `oklchToLinear`). The shader receives `uPalette[8]` as linear triples and interpolates them with a **linear-RGB `mix()`** in `samplePalette` (`composition.glsl.ts:9-17`). The OKLCh-ness is lost at the LUT boundary — interpolation BETWEEN baked stops happens in linear RGB, not OKLab.
- **`deriveAurora` already exists** (`color.ts:152-200`): seed-one-color → N-stop palette with `analogous|complementary|triad|monochrome` harmonies, gamut-mapped per stop through value.js `gamutMapOKLab` + a 6-step chroma-inward nudge (`gamutMapStop`, `color.ts:250-262`). This is solid CPU-side and is the foundation the lane should build on, not replace.
- **Shared OKLCh GLSL matrices exist but aurora does NOT splice them** (`procedural-color.glsl.ts:73-134` — `OKLCH_MATRICES_GLSL` with the exact value.js Ottosson `mat3` literals + `srgbToOklab`/`oklabToLinearSrgb`/`oklabToOklch`/`oklchToOklab`). Only the goo-blob splices these today; aurora splices just `OETF_GLSL` + `FBM_ROT_GLSL` (`aurora.frag.ts:29-32`). The in-shader OKLCh path is one splice away.
- **Painterly mediums are hand-rolled forward synthesis** (`mediums.glsl.ts`): oil = 4-layer best-of-9 curved-stroke SDF placement (`brush.glsl.ts` `bestOil`/`curvedStroke`/`paintOver`), crayon = anisotropic tooth noise, pastel/watercolor = directional fbm. Stroke direction comes from a `flowField` (flow.glsl.ts), NOT from an image-derived structure tensor. This is the gap vs. SOTA painterly rendering.

## Findings (SOTA, with citations)

### 1. Why OKLab/OKLCh beats sRGB-lerp for gradients

The canonical failure is the **muddy midtone**: lerping yellow↔blue in sRGB passes through gray because the channels cancel; OKLab preserves perceived lightness and chroma so the midpoint stays vivid. Ottosson's "perceptually orthogonal coordinates" let one attribute change without dragging the others ([Ottosson, *A perceptual color space for image processing*, Dec 2020](https://bottosson.github.io/posts/oklab/); [GM Shaders, *Mini: OkLab*, by Xor](https://mini.gmshaders.com/p/oklab)). OKLab is now Photoshop's default gradient interpolation and ships in CSS Color 4 ([Wikipedia, *Oklab color space*, accessed Jun 2026](https://en.wikipedia.org/wiki/Oklab_color_space)).

**Critical nuance for aurora — OKLab vs OKLCh for the actual interpolation.** OKL**Ch** hue interpolation walks the hue *circle*, which between widely-opposed hues takes "unexpected detours" through colors the designer never specified and through out-of-gamut regions that read as darkening. The industry settled answer: interpolate in **OKLab (Cartesian a/b)** — a straight line through color space — and reserve OKLCh hue-path interpolation for *intentional* adjacent-hue ramps. **Tailwind v4 shipped OKLab as its gradient default after trialing OKLCh in beta**, precisely to dodge the hue-detour ([*OKLCH Color Model Faces Criticism…*, BigGo, Aug 2025](https://biggo.com/news/202508251312_OKLCH_Color_Model_Criticism); [Bevy PR #19330, *Color interpolation in OKLab, OKLCH*](https://github.com/bevyengine/bevy/pull/19330)). This maps directly onto aurora: the **palette ramp bake** (adjacent painterly hues) is the OKLCh-hue-walk case; the **in-shader stop-to-stop blend** should be OKLab-Cartesian.

### 2. Full-pipeline OKLab in GLSL — the compact form

Inigo Quilez's `oklab_mix` skips a redundant matrix round-trip and is the production shape for stop blending ([GM Shaders, *Mini: OkLab*](https://mini.gmshaders.com/p/oklab)):

```glsl
vec3 lms1 = pow(kCONEtoLMS * lin1, vec3(1.0/3.0));
vec3 lms2 = pow(kCONEtoLMS * lin2, vec3(1.0/3.0));
vec3 lms  = mix(lms1, lms2, a);
lms *= 1.0 + 0.2 * a * (1.0 - a);   // the brightening "bump" that fights midtone dip
return kLMStoCONE * (lms * lms * lms);
```

The `lms *= 1.0 + 0.2*a*(1-a)` term is the load-bearing trick — a small mid-blend brightness lift that counteracts the residual luminance sag. **aurora's `procedural-color.glsl.ts` already carries the exact value.js Ottosson matrices** (`LINEAR_SRGB_TO_LMS`, `LMS_TO_OKLAB`, etc., lines 76-105), so aurora can implement `oklab_mix` against its OWN cube-root path with zero new constants and no 1e-6 drift from value.js. The note at `procedural-color.glsl.ts:27-31` explicitly warns the GM-Shaders convenience matrices are ~1e-4 off and would fail the equivalence gate — so adopt the *structure* of `oklab_mix`, not its literal matrices.

### 3. Gamut clipping that preserves hue (real-time, shader-ready)

Naive per-channel `clamp(rgb,0,1)` "distorts hues catastrophically." Ottosson's gamut-clip: work in OKLab, **keep hue fixed, project along a straight L–C line toward an `L0`** to the gamut boundary. The boundary at each hue approximates a triangle whose third corner is the **cusp `(L_cusp, C_cusp)`**, found by a polynomial fit + one Halley step (error < 1e-6), and the cusp depends only on hue so it precomputes into a 1D LUT ([Ottosson, *sRGB gamut clipping*, 2021](https://bottosson.github.io/posts/gamutclipping/); [Simon's Tech Blog, *Studying Gamut Clipping*, May 2021](http://simonstechblog.blogspot.com/2021/05/studying-gamut-clipping.html)). The **adaptive-L0** strategy (recommended for real-time, α≈0.05) keeps lightness mostly intact but avoids over-desaturating extremes:

```glsl
float Ld = L - 0.5;
float e1 = 0.5 + abs(Ld) + alpha * C;
float L0 = 0.5 * (1.0 + sign(Ld) * (e1 - sqrt(e1*e1 - 2.0*abs(Ld))));
```

aurora today does this **CPU-side per-stop** (`gamutMapStop`), which is correct for static palettes — but any **in-shader** OKLCh perturbation (broken-color hue jitter, per-nucleus hue bias, cursor-driven hue rotation) currently has NO gamut guard and relies on ACES + `clamp` to hide overshoot. A spliced in-shader cusp-clip closes that.

### 4. Mesh-gradient art direction (Stripe / OpenAI class)

The Stripe-class look is **FBM (stacked simplex octaves, higher freq + lower amplitude per octave) warped by a sinusoidal mesh** (`sin/cos` on UV with time offsets) so the noise warps against itself like liquid/fabric, plus **blend modes (multiply/screen/overlay) instead of plain `mix()`** so colors *interact* into vivid highlights and deep shadows ([Caden Chen, *Moving Mesh Gradient…Stripe Mesh Gradient WebGL*, Medium](https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2); [jordienr, *Stripe Mesh Gradient WebGL* gist](https://gist.github.com/jordienr/64bcf75f8b08641f205bd6a1a0d4ce1d)). Alex Harri's deconstruction adds the high-fidelity details: **desynchronized octaves** (some drift left, some right; distinct time multipliers), a **color-stop texture** read by `texture2D(u_gradient, vec2(t,0.5))` rather than discrete `mix()`, and a **`t = pow(t, 3.0)` bias** that pulls noise toward zero to create sharp "sweeps" and avoid uniform mush — fractal stacking inherently distributes values so no explicit dither is needed ([Alex Harri, *A flowing WebGL gradient, deconstructed*](https://alexharri.com/blog/webgl-gradients)). aurora already has domain-warp (Quilez double-warp, `aurora.frag.ts:206`) and IGN+ACES dither — what it lacks is the **blend-mode color interaction** and the **`pow`-biased stop mapping**; both bettered when done in OKLab.

### 5. Genuinely-painterly / Van Gogh brushwork — the structure-tensor flow field

The SOTA for "real brushstrokes that follow the painting's structure" is the **Edge Tangent Flow (ETF) / smoothed structure tensor**: compute the local gradient with a Sobel operator, build the structure tensor `J = [[Sx·Sx, Sx·Sy],[Sx·Sy, Sy·Sy]]`, smooth it, take its minor eigenvector — that's the direction strokes should flow ([Maxime Heckel, *On Crafting Painterly Shaders*](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/); [Kyprianidis & Kang, *Image and Video Abstraction by Anisotropic Kuwahara Filtering*, CGF 2009](https://www.kyprianidis.com/p/pg2009/)). The **Anisotropic Kuwahara filter** then flattens color *along* that flow while preserving edges — squeezing/rotating a circular kernel into a flow-aligned ellipse (8 sectors, polynomial weighting η=0.1 λ=0.5 for speed). Stacking ETF + **Line Integral Convolution** + directional shock-filter is the published recipe for "the clearness of cartoon illustration with the directional information of oil paintings" ([*Video Texture Synthesis Based on Flow-Like Stylization Painting*, PMC4124226](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4124226/); [*Flow-Centric Painterly Rendering*](https://www.academia.edu/98441900/Flow_Centric_Painterly_Rendering)).

**Why this matters for the Van Gogh ask:** aurora's strokes today flow along a *procedural* `flowField` (radial/swirl/diagonal patterns), which gives motion but NOT congruence — Van Gogh's strokes hug the *forms* in the image (the swirl of a sky, the contour of a cypress). A structure-tensor flow derived from the **noise/nuclei field itself** (its luma gradient) would make strokes curve *with* the color zones — the single biggest fidelity lever for "congruent to real Van Gogh." aurora already computes a luma gradient for watercolor wet-edges (`mediums.glsl.ts:30-35`) — that's a 4-tap structure-tensor seed already in the file.

### 6. WebGPU / modern substrate

WGSL compute shaders + **storage buffers** (GPU-persistent arrays readable by compute AND render passes) are the 2026 path for procedural fields: compute the palette LUT / cusp LUT / structure-tensor field once into a storage buffer, then sample it in the fragment pass ([W3C, *WebGPU Shading Language*](https://www.w3.org/TR/WGSL/); [Three.js Roadmap, *Introduction to WebGPU Compute Shaders*](https://threejsroadmap.com/blog/introduction-to-webgpu-compute-shaders); [Codrops, *False Earth: From WebGL Limits to a WebGPU-Driven World*, Apr 2026](https://tympanus.net/codrops/2026/04/21/false-earth-from-webgl-limits-to-a-webgpu-driven-world/)). TSL (Three Shading Language) lets one author once and target both WebGL2 and WebGPU ([Maxime Heckel, *Field Guide to TSL and WebGPU*](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/)). For aurora, the win is moving the multi-tap structure-tensor + Anisotropic-Kuwahara passes (expensive in a single fragment shader) into a compute prepass — but only if a second consumer or measured cost justifies the substrate (per the visual-load-bearing invariant).

---

## ADOPT for glass-ui aurora / wave-seeds

Each is a concrete, self-contained AW wave/fold. Ordered cheap→ambitious.

- **AW.Wn — `oklabMix` in-shader stop blend (HEADLINE, OKLCh-in-shader).** Replace the linear-RGB `mix()` in `samplePalette` (`composition.glsl.ts:16`) with an OKLab-Cartesian blend using the `oklab_mix` structure (cube-root LMS lerp + the `1+0.2·a·(1-a)` brightness bump). Splice `OKLCH_MATRICES_GLSL` (already authored, `procedural-color.glsl.ts:73`) into `aurora.frag.ts` — one import line. Kills muddy midtones between adjacent palette stops. Keep value.js's exact matrices (not GM-Shaders') to hold the 1e-6 equivalence gate. *Fold candidate, ~1 partial.*

- **AW.Wn — in-shader cusp gamut-clip for derived/jittered color.** Splice Ottosson's adaptive-L0 cusp-clip (`§3` snippet) and route every in-shader OKLCh perturbation (`brokenColorJitter`, per-nucleus hue bias) through it so no perturbed color overshoots sRGB before ACES. Precompute the per-hue cusp into a small `uniform` LUT (or the value.js cusp on the CPU). Closes the only un-guarded color path in the shader.

- **AW.Wn — OKLCh blend-mode color interaction (Stripe-class vividness).** Where palette zones meet, replace plain `mix()` with screen/overlay-style interaction performed in OKLab (lift L, combine chroma) instead of sRGB, so zone boundaries read as glowing highlights/deep shadows rather than flat crossfades (`§4`). Add the `t = pow(t, k)` stop-bias knob (`k≈2–3`) to `samplePalette` for sharp sweeping zones vs. soft washes — one new `uWarpStopBias`-style uniform.

- **AW.Wn — structure-tensor flow field (Van Gogh congruence, BIGGEST fidelity lever).** Derive stroke direction from the **luma-gradient structure tensor of the nuclei/noise field** (extend the 4-tap gradient already at `mediums.glsl.ts:30-35` into a smoothed `[[gx²,gxgy],[gxgy,gy²]]`, take the minor eigenvector) and feed THAT as the `flow` into `bestOil`/`mediumCrayon`/`mediumPastel` instead of the procedural `flowField`. Strokes then curve *with* the color forms — the Van Gogh "strokes hug the form" property (`§5`). Keep the procedural flow as a `uFlowMode` fallback. *This is the headline painterly wave.*

- **AW.Wn — Anisotropic-Kuwahara post-pass `medium` (oil-pastel painterliness).** Add a flow-aligned Anisotropic-Kuwahara flatten (8-sector elliptical kernel, polynomial weighting η=0.1 λ=0.5; `§5`) as a new peer `uMedium` or a post-stroke pass on the oil result — flattens color into painterly patches *along* the structure-tensor flow while keeping edges crisp. This is the "genuinely oil-pastel-redolent" upgrade the current multiplicative tooth-noise crayon only approximates. Cost-gate the kernel radius for the single-pass budget.

- **AW.Wn — `deriveAurora` simplified atoms + harmony expansion.** Surface the existing `deriveAurora` (`color.ts:152`) as the *primary* authoring path (seed-one-color is the user's stated "atoms of control" goal). Add `split-complementary` / `tetradic` harmonies and a `temperature` knob (warm/cool L-C bias) to `DeriveAuroraOptions`. Optionally a "derive from image/photo dominant color" entry that runs `srgbToOKLab` + a tiny histogram. Pure CPU, value.js-only, no shader change — KISS atomization.

- **AW.Wn — WebGPU/TSL substrate exploration (forward-looking, gate-first).** Spike a TSL authoring of the OKLab+structure-tensor path targeting WebGL2 *and* WebGPU, moving the multi-tap tensor + Kuwahara into a compute prepass writing a storage-buffer flow/color field (`§6`). Only land if a second consumer (goo-blob shares the substrate) or measured per-fragment cost justifies it per the visual-load-bearing invariant — otherwise document as deferred substrate with rationale.

## Key source files referenced (absolute paths)

- `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/shaders/procedural-color.glsl.ts` — shared OKLCh matrices (`:73-134`), OETF (`:46-59`), FBM_ROT (`:66`); aurora splices only OETF+FBM_ROT today.
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/composables/color.ts` — `deriveAurora` (`:152`), `gamutMapStop` (`:250`), `flattenPalette`→linear bake (`:42`).
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/composition.glsl.ts` — `samplePalette` linear-RGB `mix()` (`:16`), the OKLab-mix swap site.
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/mediums.glsl.ts` — mediums; luma-gradient seed at `:30-35` (structure-tensor starting point).
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/brush.glsl.ts` — `bestOil`/`curvedStroke`/`paintOver` (flow consumer site for the structure-tensor wave).
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts` — assembler + `${OKLCH_MATRICES_GLSL}` splice site (`:29-32`).

---

## Lane 5

I now have full coverage of both the SOTA literature and the exact current implementation. Here is the brief.

---

# SOTA gradient-art backdrops — research brief for the glass-ui aurora

**Lane:** gradient-art-backdrops · research only, no implementation · tranche AW seed
**Baseline read:** the aurora is already well past a naive mesh gradient. It ships multi-nuclei softmax composition (`composition.glsl.ts:20`), Quilez double-fBm domain warp, curved swept-brushstroke SDFs with best-of-9 placement (`brush.glsl.ts:188`), 4 peer mediums + 4 oil stroke-modes (`mediums.glsl.ts`), broken color, impasto edge catch-light, flow fields with cursor swirl (`flow.glsl.ts`), ACES tonemap (`tonemap.glsl.ts`), full OKLCh CPU bake + a shared OKLCh GLSL chunk that aurora does NOT yet splice (`procedural-color.glsl.ts:73`). The gaps below are what separates "very good procedural painting" from "arresting, SOTA, genuinely-painterly."

---

## Findings — how the reference aesthetics are actually built

### 1. The OpenAI/Stripe/Linear smooth-mesh look = stacked sine + simplex-displaced 1D waves, SDF-blurred, blend-moded
The canonical Stripe gradient is ~800 lines of `minigl` (~10kb). The aesthetic is NOT radial color stops — it is:
- **Stacked sine/simplex waves** at different wavelength `L`, speed `S`, amplitude `A` (scale factors like 0.64/0.40/0.48), summed to form an animated 1D height field; time is fed in as a noise dimension so motion is organic not geometric.
- **A flow constant** (`F ≈ 0.043`) added to position = lateral "canvas scrolling" so it never reads static.
- **SDF-based blur**, not pixel sampling: `alpha = clamp(0.5 + dist/blur, 0, 1)` with quintic smoothstep, and the *blur amount itself is noise-driven* so sharpness varies — `exponent ~3` bias toward zero gives "periods of relative sharpness."
- **Blend modes in the fragment shader** (multiply/screen/overlay) so colors *interact* (vibrant highlights, deep shadows) rather than linearly lerp.
- Source: [Alex Harri — WebGL gradients deconstructed](https://alexharri.com/blog/webgl-gradients) (accessed 2026-06-06); [Kevin Hufnagl — Stripe gradient teardown](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/) (accessed 2026-06-06); [Caden Chen / Bootcamp — Stripe mesh WebGL](https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2) (accessed 2026-06-06).
- **Where glass-ui is already ahead:** the nuclei softmax field is richer than stacked-wave color assignment. **What it lacks:** the aurora has NO in-shader blend-mode color interaction (it `mix()`es a LUT) and NO noise-driven dynamic blur/sharpness band. Those two are exactly what gives Stripe/OpenAI its luminous depth.

### 2. Genuinely-painterly = anisotropic Kuwahara driven by the structure tensor (the missing "real paint" engine)
The whole NPR literature (Kyprianidis et al.) converges on one engine: smooth the image along *local feature direction*, derived from the **structure tensor**.
- Compute structure tensor via Sobel: `Jxx=dot(Sx,Sx)`, `Jyy=dot(Sy,Sy)`, `Jxy=dot(Sx,Sy)`; Gaussian-smooth it; **eigen-decompose** → the minor eigenvector is the local edge-flow direction, eigenvalue ratio gives anisotropy/coherence.
- The Kuwahara circular kernel (8 sectors, polynomial weighting `[(x+ζ)−ηy²]²`, η≈0.1, λ≈0.5) is **squeezed and rotated into an ellipse** by the tensor — brush direction aligns to edges. Multi-scale via a saliency map for big-then-fine brushes.
- Source: [Maxime Heckel — On crafting painterly shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) (accessed 2026-06-06); [Kyprianidis 2009 — Image and Video Abstraction by Anisotropic Kuwahara Filtering](https://www.kyprianidis.com/p/pg2009/jkyprian-pg2009.pdf) (accessed 2026-06-06); [Kyprianidis 2011 multi-scale](https://www.kyprianidis.com/p/npar2011/jkyprian-npar2011.pdf); [ShaderToy anisotropic Kuwahara DtKczW](https://www.shadertoy.com/view/DtKczW).
- **Critical insight for glass-ui:** the aurora's flow field is *authored* (radial/swirl/diagonal/multi-curl in `flow.glsl.ts`) — it does NOT derive direction from the image's own color structure. Real paintings have brush direction that *follows the forms*. A structure-tensor flow field, computed from the nuclei color field itself, is the single biggest painterliness upgrade available. It also makes the oil/pastel strokes hug the color-zone boundaries instead of riding a global angle.

### 3. Van Gogh specifically = swirl flow that is physically turbulent + dense parameterized strokes following it
- Starry Night's swirls measurably follow **Kolmogorov atmospheric turbulence** scaling — the swirls are a real flow field, not decorative spirals. ([AIP Publishing / Eurekalert — van Gogh's sky alive with real-world physics](https://www.eurekalert.org/news-releases/1057862), accessed 2026-06-06).
- Procedural Starry Night = ~12,000 parameterized brushstrokes laid along a vector/direction field, region-mapped (PAMs), strokes animated along their direction field. ([Rethinking Style Transfer: Pixels to Parameterized Brushstrokes, arXiv 2103.17185](https://arxiv.org/pdf/2103.17185); [Thinking Like Van Gogh: Flow-Guided 3D Gaussian Splatting, arXiv 2601.10075](https://arxiv.org/pdf/2601.10075); both accessed 2026-06-06).
- **For glass-ui:** a van-gogh variant = (a) a curl/turbulence flow field with FBM-driven vortices at multiple scales (the aurora has the FBM, lacks the multi-vortex turbulence model), (b) dense, short, high-contrast directional strokes that *follow* it, (c) impasto ridge highlights perpendicular to stroke direction (the aurora already has impasto rim in `brush.glsl.ts:174` — it just needs the turbulent flow + denser short strokes). The "no subject matter" constraint is automatically satisfied — it's abstract turbulence, not a scene.

### 4. Real pigment color = Kubelka-Munk spectral mixing, not RGB/OKLCh lerp
The reason digital gradients look "plastic" and real paint looks deep: paint mixes *subtractively* via light absorption+scattering. Blue+yellow→green; RGB lerp gives muddy gray.
- spectral.js ships a **`spectral.glsl`** that runs K-M mixing on the GPU: RGB→7-primary spectral reflectance curve (W/C/M/Y/R/G/B)→K/S values→mix→back. Uses OKLab/OKLCh for gamut mapping. MIT-ish, generative-art-proven.
- Source: [rvanwijnen/spectral.js](https://github.com/rvanwijnen/spectral.js/) (accessed 2026-06-06); [STVND/davis-pigment-mixing GLSL](https://github.com/STVND/davis-pigment-mixing); [vanity-ibex K-M in VEX writeup](https://vanity-ibex.xyz/blog/kubelka_munk_colormixing/).
- **For glass-ui:** the aurora samples its palette with `mix(uPalette[i0], uPalette[i1], t)` (`composition.glsl.ts:16`) in linear sRGB. Replacing the palette *interpolation* and the stroke *over-paint* compositing with K-M mixing makes overlapping strokes and zone boundaries read as wet paint blending, not alpha over. This is the highest-fidelity color upgrade and it composes with the existing OKLCh bake.

### 5. Stroke alignment substrate = Line Integral Convolution (LIC)
LIC convolves noise along streamlines of a vector field → elongated streaks aligned to flow; longer streaks where flow is faster. It is the textbook way to turn a flow field into visible directional brushwork. ([Cabral & Leedom 1993, Wikipedia LIC](https://en.wikipedia.org/wiki/Line_integral_convolution); [ResearchGate — LIC-based painterly rendering](https://www.researchgate.net/post/How_to_implement_Line_Integral_Convolution_LIC-based_painterly_rendering); accessed 2026-06-06). The pastel medium's `fbm(along, across)` (`mediums.glsl.ts:58`) is a cheap LIC approximation — true streamline integration would make pastel/crayon dramatically more convincing.

### 6. Procedural palette from atoms = OKLCh harmony rotations (the "derive-color" variant)
Harmonies are hue rotations in OKLCh: complementary +180°, analogous ±30°, triadic ±120°, split-comp, tetradic. Equal chroma (C≈0.16 muted / 0.25 rich) + lightness ladder = colors of equal visual weight that *feel* matched. OKLCh interpolation also kills the sRGB "gray-band" midpoint. ([Blue Monkey — OKLCH gradients](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients); [ColorArchive OKLCH guide](https://colorarchive.org/guides/oklch-perceptual-color-design-guide/); [oklab-color-palette-generator](https://oklab-color-palette-generator.web.app/); accessed 2026-06-06). The aurora already has the OKLCh plumbing (`procedural-color.glsl.ts`, `color.ts`) — it has no *generative* palette layer; presets are hand-authored stops. A `derivePalette(baseHue, harmony, chroma, count)` is a small CPU function that turns one seed color into a full congruent palette.

### 7. WebGPU is the modern substrate; it unlocks the expensive techniques
WGSL compute shaders run fluid sim, slime-mold, reaction-diffusion, erosion at interactive FPS in-browser. The structure tensor (multi-pass), LIC (streamline integration), and K-M (per-pixel spectral) are all *exactly* the workloads WebGPU compute makes cheap vs a single WebGL2 fragment pass. ([WGSL spec, W3C](https://www.w3.org/TR/WGSL/); [ShaderVine WebGPU editor — fluid/physarum/reaction-diffusion in WGSL](https://meditations.metavert.io/p/shadervine-a-webgpu-shader-editor); [Maxime Heckel — Field Guide to TSL and WebGPU](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/); [Absulit/points WebGPU generative library](https://github.com/Absulit/points); accessed 2026-06-06). Note the structure-tensor + Kuwahara pipeline is inherently **multi-pass** (tensor pass → filter pass → tonemap) — that breaks the current "single draw, single shader" invariant (DESIGN.md §2.8). A WebGPU path is the clean way to add passes without ugly WebGL2 ping-pong FBOs.

---

## ADOPT for glass-ui aurora — wave-seed list (tranche AW)

Each is a concrete, independently-shippable AW wave/fold. Ordered by impact-per-effort.

- **AW.W1 — Structure-tensor flow field (THE headline painterliness fold).** Add a `flowMode: "authored" | "structure"` axis. In structure mode, compute the structure tensor of the nuclei color field (Sobel on `sampleBase`, Gaussian-smooth, eigen-decompose for minor-eigenvector direction + coherence), and feed that as the `flow` vector into `bestOil`/`mediumPastel`/`mediumCrayon` instead of `flowField()`. Strokes then hug color-zone forms. Coherence drives stroke length. Net-new file `structure.glsl.ts`; threads into `mediums.glsl.ts`. Highest fidelity gain. Ref: finding §2.

- **AW.W2 — Kubelka-Munk pigment mixing (THE headline color fold).** Port spectral.js `spectral.glsl` into a `pigment.glsl.ts` chunk (it can live in the shared `procedural-color.glsl.ts` family since the goo-blob would want it too — ≥2 consumers). Replace the palette `mix()` in `samplePalette` and the `paintOver` stroke compositing with K-M mix. Add `colorMix: "linear" | "pigment"` axis. Overlapping strokes + zone seams read as wet paint. Ref: finding §4. Source code: github.com/rvanwijnen/spectral.js.

- **AW.W3 — Stripe/OpenAI smooth-mesh medium upgrade (the "arresting gradient-art" fold).** Upgrade `medium: "smooth"` from blurred nuclei to the stacked-sine + noise-displaced + SDF-blur + blend-mode recipe: add in-shader multiply/screen/overlay blending between adjacent zones, and a **noise-driven dynamic-sharpness band** (blur amount = noise, exponent~3 bias) so the smooth mode gets the luminous Stripe depth instead of flat softmax. New uniforms `uBlendMode`, `uSharpnessBand`. Ref: finding §1.

- **AW.W4 — Van Gogh turbulence variant (the requested van-gogh atomic-brushstroke fold).** Add a `flow.pattern: "turbulent"` that builds a multi-scale curl/vortex field (FBM-driven rotational noise, 2–3 vortex scales, Kolmogorov-ish energy falloff) + a stroke profile tuned short/dense/high-contrast with perpendicular impasto ridges. Compose with AW.W1 structure flow. Pure abstract turbulence = no subject matter, congruent to real van Gogh sky dynamics. Ref: finding §3.

- **AW.W5 — Derive-color palette layer (the requested derive-color + simplified-options fold).** CPU `deriveAuroraPalette(seed: OklchStop, harmony: "analogous"|"complementary"|"triadic"|"split"|"tetradic", chroma, count): OklchStop[]` in `color.ts`. Turns one seed color into a congruent N-stop palette via OKLCh hue rotations + lightness ladder. Exposes a *simplified* config door (one color + one harmony enum) over the full 8-stop authoring. Ref: finding §6.

- **AW.W6 — LIC pastel/crayon substrate.** Replace the `fbm(along, across)` pastel/crayon stroke proxy with a short streamline-integrated LIC convolution of tooth noise along the (AW.W1) flow field. Makes pastel/crayon read as genuinely dragged pigment. Small, composes on top of AW.W1. Ref: finding §5.

- **AW.W7 — WebGPU render path (the requested modern-WebGPU fold).** Add a `renderMode: "webgl2" | "webgpu"` with a WGSL transpile of the pipeline, and use WebGPU compute to make the multi-pass structure-tensor (AW.W1) + LIC (AW.W6) cheap. Keep WebGL2 as the universal fallback via `resolveRenderMode` (`renderMode.ts` already device-tiers). This is the wave that lifts the DESIGN.md §2.8 "single draw, single shader" invariant — and should explicitly amend that invariant. Ref: finding §7.

- **AW.W8 — Multi-scale saliency brushes.** Drive the existing 4-layer oil stroke sizing (`mediums.glsl.ts:182`) off a saliency map (coherence from AW.W1's tensor): big brushes in low-detail zones, fine brushes at high-saliency edges — the Kyprianidis multi-scale move. Tightens the impasto where forms meet. Ref: finding §2 (multi-scale).

- **AW.W9 — Interactive/dynamic deepening (the requested dynamic+interactive fold).** Extend the cursor model beyond swirl: cursor *deposits* pigment that K-M-mixes into the field (AW.W2), cursor velocity stretches local strokes (AW.W1), idle = slow turbulent breath (AW.W4). Builds on `useCursorInteraction.ts` + `cursorModel.ts`. Ref: findings §2–§5 composed.

- **AW.W0 — Splice the shared OKLCh matrices into aurora's shader (cheap enabler).** Aurora currently does NOT splice `OKLCH_MATRICES_GLSL` (`procedural-color.glsl.ts:73` note; frag header confirms). AW.W2/W5 want in-shader OKLCh. Wire the existing shared chunk into `aurora.frag.ts` — zero net-new math, just the splice. Do first; unblocks W2/W5/W9.

**Sequencing:** AW.W0 → (W1 + W2 in parallel, the two headlines) → W3, W5 (independent) → W4, W6, W8 (build on W1) → W7 (substrate, enables cheap W1/W6) → W9 (composes all).

**Invariant to flag for the tranche plan:** AW.W1/W6/W7 break DESIGN.md §2.8 ("single draw, single shader, no multi-pass"). That invariant was correct for a fragment-only WebGL2 build; the SOTA painterly engine is inherently multi-pass. AW should formally amend §2.8 to "single draw on WebGL2 fallback; multi-pass permitted on the WebGPU path."

**Relevant files:** `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/{composition,flow,brush,mediums,tonemap,aurora.frag}.glsl.ts` · `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/composables/color.ts` · `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/shaders/procedural-color.glsl.ts` · `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/DESIGN.md` (§2.8 invariant to amend, §5 config API to extend).

## Partial synthesis

Both written artifacts are in place. Here is the complete synthesis.

---

# AURORA SOTA SYNTHESIS — path-forward, README, and AW wave seeds

The 5 briefs are unanimous on diagnosis and remedy. Aurora is already well past a naive mesh gradient — it ships Quilez double domain-warp, multi-nuclei anisotropic-Gaussian softmax composition, a curved swept-brushstroke SDF with best-of-9 placement, four peer mediums, fwidth-AA, ACES tonemap, the mandatory OETF, and post-transfer IGN dither (all verified in `aurora.frag.ts`, `composition.glsl.ts`, `brush.glsl.ts`, `mediums.glsl.ts`). The gap is not architecture — it is **fidelity, control atoms, and modern color/compute**. Five techniques recur across all briefs as the highest-value adopts. They are the spine of everything below.

## Deliverable 1 written: `src/components/custom/aurora/README.md` (305 lines)
## Deliverable 2 below: THE AURORA PATH-FORWARD
## Deliverable 3 below: THE AW WAVE SEEDS

---

# THE AURORA PATH-FORWARD

The concrete plan to make aurora arresting. Ordered by leverage-per-effort, sequenced by dependency. Every technique cited with access date 2026-06-06.

## Foundation: the keystone enablers (cheap, unblock everything)

Two cheap waves gate the rest. Land them first.

**1. Splice the OKLCh matrices + add derivative fBm.** `OKLCH_MATRICES_GLSL` is *already authored* in the shared `procedural-color.glsl.ts:73-134` (the exact value.js Ottosson matrices, 1e-6-equivalent) — aurora splices only `OETF_GLSL` + `FBM_ROT_GLSL` today, so the in-shader OKLCh path is **one import line away**. (Note: the chunk's `oklabToOklch` references a `PI` constant aurora must define on splice.) Alongside it, add a `fbmd()` returning `vec3(value, dx, dy)` — the IQ analytic-gradient `noised()` port ([IQ, *fBm with derivatives*](https://iquilezles.org/articles/morenoise/)). This single function is the **keystone**: it unblocks curl noise, flow-aligned strokes, erosion damping, and the structure tensor. Keep the scalar `fbm` for cheap call sites.

## The painterly engine: oil-pastel + Van Gogh brushwork

The single biggest fidelity lever, named identically by all four shader briefs:

**2. Structure-tensor flow field — strokes that hug the form.** Aurora's strokes today follow an *authored* `flowField` (radial/swirl/diagonal/multi). Real painters — and Van Gogh specifically — orient strokes along the *local feature direction* of the image. The SOTA NPR move (Kyprianidis & Kang, CGF 2009; Heckel) is the **Edge Tangent Flow / smoothed structure tensor**: Sobel the color field → build `J = [[gx², gxgy],[gxgy, gy²]]` → Gaussian-smooth → take the **minor eigenvector** as stroke direction, the eigenvalue ratio as coherence. Feed *that* as the `flow` into `bestOil`/`mediumPastel`/`mediumCrayon` instead of the procedural field. Strokes then curve *around* the color zones the way Van Gogh's hug the form. The 4-tap luma gradient already in `mediums.glsl.ts:30-35` (the watercolor wet-edge) is the structure-tensor seed already in the file. **This is the headline painterly wave.** ([Heckel — *On Crafting Painterly Shaders*](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/); [Kyprianidis & Kang 2009](https://www.kyprianidis.com/p/pg2009/).)

**3. The Van Gogh variant — physical turbulence, no subject matter.** Starry Night's swirls measurably follow **Kolmogorov atmospheric turbulence** scaling — they are a real flow field, not decorative spirals ([AIP/Eurekalert](https://www.eurekalert.org/news-releases/1057862)). The variant = (a) a `flow.pattern: "turbulent"` multi-scale curl/vortex field, (b) the structure-tensor coherence from #2, (c) dense short high-contrast directional strokes with perpendicular impasto ridges (the impasto rim already exists at `brush.glsl.ts:173-178` — it needs the turbulent flow + denser short strokes + "exaggeration in the essential": boost stroke coherence where the gradient is strong, scatter where weak). The "no subject matter" constraint is automatic — it is abstract turbulence. ([*Thinking Like Van Gogh*, arXiv:2601.10075](https://arxiv.org/abs/2601.10075).)

**4. Anisotropic Kuwahara painterly post-pass.** The engine the whole NPR literature converges on: an 8-sector circular kernel (Papari, polynomial weighting η≈0.1 λ≈0.5) **squeezed/rotated into a flow-aligned ellipse by the structure tensor**, outputting the lowest-variance sector mean — smooths flats while sharpening edges, giving the three properties that read as real paint: no fine texture, preserved hard edges, quantized color. This is inherently **multi-pass** (tensor → filter → tonemap), which is why it pairs with the WebGPU path. ([Heckel; Kyprianidis 2009.](https://www.kyprianidis.com/p/pg2009/))

## The color pipeline: full OKLCh + derive-color

**5. OKLab in-shader stop blend — kill the muddy midtone.** Aurora interpolates the LUT with a **linear-RGB `mix()`** (`composition.glsl.ts:16`), so contrasting hues pass through a desaturated gray midpoint. Replace with the IQ `oklab_mix` structure — cube-root LMS lerp + the load-bearing `lms *= 1.0 + 0.2·a·(1-a)` brightness bump that fights the luminance sag — against aurora's own spliced value.js matrices (not GM-Shaders', which are ~1e-4 off and fail the equivalence gate). **Critical nuance:** interpolate in **OKLab Cartesian (a/b)**, not OKLCh-hue-walk, for the stop-to-stop blend — OKLCh hue interpolation takes "unexpected detours" through unspecified colors; Tailwind v4 shipped OKLab as its gradient default after trialing OKLCh, precisely to dodge this. Reserve OKLCh hue-walk for the *palette ramp bake* (adjacent painterly hues), where it is the intentional case. ([Ottosson](https://bottosson.github.io/posts/oklab/); [Aras](https://aras-p.info/blog/2022/03/11/Optimizing-Oklab-gradients/); [Bevy PR #19330](https://github.com/bevyengine/bevy/pull/19330).)

**6. Kubelka-Munk pigment mixing — wet-paint depth (stretch).** The reason digital gradients read "plastic" and real paint reads deep: paint mixes *subtractively*. blue+yellow→green, not muddy gray. spectral.js ships a GPU `spectral.glsl` (RGB→7-primary reflectance→K/S→mix→back). Replacing the palette `mix()` and the `paintOver` stroke compositing with K-M makes overlapping strokes and zone seams read as wet paint blending, not alpha-over. Highest-fidelity color move; lives in the shared chunk since the goo-blob is a 2nd consumer. ([rvanwijnen/spectral.js](https://github.com/rvanwijnen/spectral.js/).)

**7. Derive-color simplification — the few intuitive knobs.** `deriveAurora` *already exists* (`color.ts:152`) — seed one color → N-stop gamut-safe palette via OKLCh harmony rotations. Surface it as the *primary* authoring path and expand: add `split-complementary` / `tetradic` harmonies and a `temperature` (warm/cool L-C bias) knob to `DeriveAuroraOptions`. Pure CPU, value.js-only, no shader change. This collapses the easy path from ~20 atoms to ~4: **one seed color + one harmony enum + one temperature + one mood** generates the whole palette + nuclei biases.

## The simplified option set

The full `AuroraConfig` (~30 fields) stays for power users. The simplified door is **four high-level atoms** the configurator exposes, the rest derived:

- **Color** — `deriveAurora(seed, harmony, temperature)` → palette + nuclei biases (#7).
- **Noise / texture** — a single continuous **Hurst `H`** (fBm gain) replacing `noiseOctaves: 3|4|5`. `H≈1` → billowy atmospheric gas; `H→0` → stormy/gestural. One slider spans the whole texture axis — far more expressive than octave count, the cheapest "atom of control" win. ([IQ — *fBm*](https://iquilezles.org/articles/fbm/).)
- **Motion** — one "depth/aliveness" knob driving per-octave time-desync (some octaves negative-speed, per Alex Harri) + optional Quilez triple-warp recursion. Stops the field drifting in lockstep.
- **Medium** — the existing `medium` + `strokeMode` enums.

## The WebGPU evaluation: STAGE, don't adopt now

**Verdict: stage behind capability detection; do not rip-and-replace.** All five briefs agree. The reasoning:

- WebGL2 has **no compute pipeline** — everything is a fragment-shader workaround, and aurora is locked to a single pass (DESIGN.md §2.8). The structure-tensor + Anisotropic-Kuwahara + LIC pipeline is **inherently multi-pass** (tensor → filter → composite); WebGPU compute + storage buffers are exactly the workload that makes it cheap. ([WGSL spec, W3C](https://www.w3.org/TR/WGSL/); [Heckel — *Field Guide to TSL and WebGPU*](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/).)
- **But the WebGL2 fragment path must remain the universal fallback.** The realistic shape is a `renderMode: "webgl2" | "webgpu"` behind `navigator.gpu` detection (the existing `resolveRenderMode` device-tiering is the natural seam), additive on the WebGPU branch only.
- **Sequence:** the OKLab blend (#5), Hurst (#2-axis), derive-color (#7), octave-desync, and even a WebGL2 single-fragment structure-tensor are all **WebGL2-compatible and ship first** as low-risk waves. The WebGPU path lands as a *substrate* wave that (a) does a straight WGSL transliteration of the fragment pipeline first, then (b) moves the multi-pass tensor/Kuwahara/LIC into a compute prepass. It formally amends DESIGN.md §2.8 to "single draw on the WebGL2 fallback; multi-pass permitted on the WebGPU path."
- **Gate-first.** Per the visual-load-bearing invariant, the compute rearchitecture lands only if a 2nd consumer (goo-blob shares the substrate) or measured per-fragment cost justifies it — otherwise it documents as deferred substrate with rationale.

**Baseline dates for the WebGPU decision:** WebGPU is Baseline-available in Chrome/Edge (since 2023) and Safari 26 (2025); Firefox shipped it 2025. As of 2026-06-06 it is broadly available on desktop but still patchy on older mobile — which is exactly why the WebGL2 fallback is non-negotiable and `navigator.gpu` detection gates the path.

## Interactivity

The cursor model (`useCursorInteraction.ts`, `cursorModel.ts`) already swirls both the color field and flow with Gaussian falloff + 2s decay. The path-forward extends it on top of the new engine:

- Cursor **velocity stretches local strokes** (via the structure-tensor flow, #2).
- Cursor **deposits pigment that K-M-mixes** into the field (#6) — a trail of real paint.
- **Idle = slow turbulent breath** (#3) rather than a dead static field.

All build on the existing `useCursorInteraction` seam — no new pointer plumbing.

## Performance budget

- **Hold the single-draw WebGL2 path.** The OKLab blend (#5), Hurst, octave-desync, and derive-color add **near-zero cost** (OKLab ~1.3× sRGB per Aras's M2-drop optimization; the rest are CPU-side or 1-uniform). These ship in the existing single-fragment budget against the current `W5-aurora-profile.json` (~769 MB-RSS build envelope, the live profiler's 4 medium cases).
- **Cost-gate the multi-pass work.** The structure tensor (multi-tap), Kuwahara (8-sector kernel), and LIC (streamline integration) are the expensive techniques — they ride a **quality tier** (gate kernel radius) on WebGL2, or move to the WebGPU compute prepass. Never default-on.
- **Preserve the park machinery.** Every wave inherits the offscreen/content-hidden/backgrounded park + the reduced-motion freeze (`useWebGLCanvas`, `proof:offscreen-pause`). A WGSL port must re-honor both seams.
- **Do not regress two SOTA seams:** the post-OETF 1-LSB IGN dither (`aurora.frag.ts:343`) and the linear-pipeline ACES tonemap are already the canonical banding/space recipe. Every noise-basis, color, or WGSL wave preserves both — `proof:aurora-space-gamma` enforces it.

---

# THE AW AURORA WAVE SEEDS

Concrete wave specs for a future AW tranche. Each: scope · the SOTA technique it lands · the gate. Dev-only seeds — none implemented here. Sequenced by dependency.

### AW.W0 — splice enablers (cheap keystone; do first)
**Scope.** Splice `OKLCH_MATRICES_GLSL` (already authored, `procedural-color.glsl.ts:73`) into `aurora.frag.ts` (one import + define `PI`); add `fbmd()` returning `vec3(value, dx, dy)` to the shared chunk so the blob shares it. Keep scalar `fbm`. **Technique.** IQ analytic-derivative `noised()`; the existing shared OKLCh matrices. **Gate.** `proof:shader-shared-source` stays green (aurora now references the spliced chunk); `npm run build` + `typecheck` green; born-RED canary asserts `fbmd` is referenced, not a dead splice. Unblocks W1/W2/W4/W5.

### AW.W1 — OKLab in-shader stop blend (color HEADLINE; cheap)
**Scope.** Replace the linear-RGB `mix()` at `composition.glsl.ts:16` with an OKLab-Cartesian `oklab_mix` (cube-root LMS lerp + `1+0.2·a·(1-a)` bump) against value.js's exact matrices. Add a `t = pow(t, k)` stop-bias uniform for sharp-sweep vs soft-wash. **Technique.** Ottosson OKLab; Aras M2-drop optimization (~1.3× sRGB); Alex Harri pow-bias. **Gate.** A born-RED `proof:aurora-oklch-interp` asserting `samplePalette` routes through the OKLab path (not bare `mix`); the aurora color-equivalence vitest gains a 1e-6 OKLab-blend assertion; no regression to `proof:aurora-space-gamma`.

### AW.W2 — structure-tensor flow field (painterly HEADLINE; biggest fidelity lever)
**Scope.** New `structure.glsl.ts`: Sobel the nuclei color field → smoothed `[[gx²,gxgy],[gxgy,gy²]]` → minor eigenvector + coherence. Add `flowMode: "authored" | "structure"`; in structure mode feed the eigenvector as `flow` into `bestOil`/`mediumPastel`/`mediumCrayon`. Coherence drives stroke length ("exaggeration in the essential"). Keep authored flow as fallback. **Technique.** Edge Tangent Flow / structure tensor (Kyprianidis & Kang 2009; Heckel). Builds on AW.W0 `fbmd`. **Gate.** `proof:aurora-flow-mode` asserts both flow modes resolve; build/typecheck green; browser-verify recorded (strokes curve around color zones). May break DESIGN.md §2.8 single-pass — amend on this wave.

### AW.W3 — Van Gogh turbulence variant
**Scope.** Add `flow.pattern: "turbulent"` — multi-scale curl/vortex field (FBM-driven rotational noise, 2–3 vortex scales, Kolmogorov-ish energy falloff) + a short/dense/high-contrast stroke profile with perpendicular impasto ridges. Composes with AW.W2 structure flow. **Technique.** Curl noise (Bridson 2007 — `v = (∂φ/∂y, −∂φ/∂x)`, divergence-free, one swizzle off `fbmd`); Kolmogorov turbulence (arXiv:2601.10075). **Gate.** `proof:aurora-flow-mode` extends to cover `turbulent`; phase-canon-style union test on `FlowPattern`; browser-verify the abstract-turbulence read (no subject matter).

### AW.W4 — derive-color simplification + Hurst atom (the simplified options)
**Scope.** (a) Expand `deriveAurora` with `split-complementary`/`tetradic` harmonies + a `temperature` knob; surface as the primary authoring door. (b) Replace `noiseOctaves: 3|4|5` with a continuous Hurst `H` (fBm gain) uniform. (c) Collapse the configurator to 4 atoms (Color/Noise/Motion/Medium), rest derived. **Technique.** OKLCh harmony rotations; IQ fBm Hurst exponent. Pure CPU + 1 uniform — WebGL2-compatible, near-zero cost. **Gate.** `deriveAurora` unit tests cover the new harmonies (gamut-safe, L-monotonic); `proof:no-value-default` stays green; the existing `AuroraConfig` surface preserved (additive).

### AW.W5 — Anisotropic Kuwahara post-pass (oil-pastel painterliness; quality tier)
**Scope.** A flow-aligned Anisotropic-Kuwahara flatten (8-sector elliptical kernel, η=0.1 λ=0.5, squeezed by the AW.W2 tensor) as a new `uMedium` peer or post-stroke pass. Cost-gate the kernel radius for the single-pass budget; full version rides AW.W7 WebGPU. **Technique.** Papari/Kyprianidis Anisotropic Kuwahara. **Gate.** `proof:aurora-flow-mode` (consumes the tensor); build green; quality-tier flag default-off; profiler delta recorded in `W5-aurora-profile.json`.

### AW.W6 — Kubelka-Munk pigment mixing + LIC pastel (wet-paint color/stroke; stretch)
**Scope.** Port spectral.js `spectral.glsl` into a shared `pigment.glsl.ts` (≥2 consumers: aurora + blob); add `colorMix: "linear" | "pigment"`, replacing palette `mix()` + `paintOver` compositing with K-M. Replace the pastel/crayon `fbm(along,across)` proxy with a short LIC streamline integration along the flow field. **Technique.** Kubelka-Munk subtractive mixing (spectral.js); Line Integral Convolution (Cabral & Leedom 1993). **Gate.** `proof:aurora-pigment-mix` asserts the K-M path; `proof:shader-shared-source` covers the new shared chunk; blob-equivalence gate unaffected.

### AW.W7 — WebGPU/WGSL render path (modern substrate; gate-first)
**Scope.** Add `renderMode: "webgl2" | "webgpu"` behind `navigator.gpu` detection (the `resolveRenderMode` seam). Straight WGSL transliteration of the fragment pipeline first; then move the AW.W2 tensor + AW.W5 Kuwahara + AW.W6 LIC into a compute prepass with storage buffers. WebGL2 stays the universal fallback. Formally amend DESIGN.md §2.8 ("single draw on WebGL2 fallback; multi-pass permitted on WebGPU"). **Technique.** WGSL compute + storage buffers (W3C WGSL spec; Heckel TSL guide). **Gate.** `proof:aurora-space-gamma` must survive the port (OETF seam intact in WGSL); `proof:offscreen-pause` re-honored; lands only if measured cost or the 2nd consumer justifies the substrate (visual-load-bearing invariant) — else documented deferred.

### AW.W8 — interactive pigment deposition + dynamic deepening
**Scope.** Extend `useCursorInteraction`: cursor velocity stretches local strokes (AW.W2), cursor deposits K-M-mixing pigment (AW.W6), idle = slow turbulent breath (AW.W3). **Technique.** Composed from W2/W3/W6. **Gate.** No new gate; build/typecheck green; browser-verify the trail + idle-breath; reduced-motion freeze still parks (no cursor motion under `reduce`).

### AW.W9 — the research-backed README (this deliverable)
**Scope.** Ship `aurora/README.md` (already written) as the consumer-facing guide; cross-link from DESIGN.md §10. **Gate.** `proof:doc-consistency` stays green; README references resolve against the actual exported surface.

---

# HEADLINE

**Aurora is one OKLab splice and one structure-tensor away from arresting.** The architecture is sound — Quilez warp, multi-nuclei softmax, curved-stroke SDF, four mediums, correct OETF, IGN dither all ship. The fidelity gap is that color interpolates in muddy linear-RGB and strokes follow an *authored* flow instead of the painting's own structure. Close those two and aurora reads as genuine OKLCh gradient-art and genuine Van Gogh brushwork.

## The 5 highest-value adopts

1. **OKLab in-shader stop blend** (AW.W1) — splice the *already-authored* matrices, swap `mix()` for `oklab_mix` with the brightness bump, interpolate in OKLab-Cartesian not OKLCh-hue. Kills the muddy midtone. ~1.3× cost, one import. *(Ottosson, Aras, Bevy/Tailwind v4.)*
2. **Structure-tensor flow field** (AW.W2) — derive stroke direction from the color field's own gradient (the 4-tap seed already in `mediums.glsl.ts:30-35`). Strokes hug the form like Van Gogh's. The single biggest painterliness lever. *(Kyprianidis & Kang 2009, Heckel.)*
3. **Derive-color + Hurst simplification** (AW.W4) — `deriveAurora` already exists; expand harmonies + add `temperature`, and replace octave-count with a continuous Hurst `H`. Four intuitive knobs over thirty. Pure CPU. *(OKLCh harmonies, IQ fBm.)*
4. **Van Gogh turbulence variant** (AW.W3) — divergence-free curl flow (one swizzle off the `fbmd` keystone) + Kolmogorov vortices + dense short strokes. Abstract turbulence, no subject matter. *(Bridson 2007, arXiv:2601.10075.)*
5. **WebGPU path, staged** (AW.W7) — `navigator.gpu`-gated `renderMode`, WebGL2 fallback non-negotiable, multi-pass tensor/Kuwahara on the compute branch only. Unlocks the expensive painterly engine without breaking the universal path. *(WGSL spec, Heckel TSL.)*

**Files written:** `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/README.md` (the research-backed README, 305 lines). The path-forward and the 10 AW wave seeds are the text above. **Key code anchors** for the AW planner: `aurora.frag.ts` (domainWarp:206, fbm:164, OETF:339, IGN:343) · `composition.glsl.ts:16` (the linear-mix → OKLab swap site) · `mediums.glsl.ts:30-35` (the structure-tensor seed) · `brush.glsl.ts:173-178` (impasto rim) · `color.ts:152` (deriveAurora) · `procedural-color.glsl.ts:73-134` (the unspliced OKLCh matrices, the `fbmd`/K-M home) · `renderMode.ts` (the WebGPU detection seam) · DESIGN.md §2.8 (the single-pass invariant AW.W2/W7 amend).
