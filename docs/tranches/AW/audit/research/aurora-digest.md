# Aurora SOTA research (32-agent, complete)

## SYNTHESIS — the aurora path-forward + README + wave seeds

All three deliverables are written and well-formed. Synthesis complete.

## Deliverables

**(1) The Aurora path-forward** — `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/aurora/PATH-FORWARD.md` (468 lines). Grounds against the live shader (the baseline is already a sophisticated single-pass painterly engine, not a mesh gradient), then plans: §1 the painterly engine (structure-tensor/ETF keystone → van-Gogh energy-graded atomic strokes → real height-field impasto → genuine oil-pastel deposition → optional Kubelka-Munk pigment mixing), §2 the full-OKLCh pipeline + derive-color front door (the `OKLCH_MATRICES_GLSL` chunk is authored and 1e-6-verified but unspliced), §3 the ~7-atom simplified option set over the ~28-field schema, §4 the WebGPU evaluation (**stage it** — Baseline 25 Nov 2025 all-engines, deployable-not-yet-widely-available, hand-WGSL over TSL), §5 interactivity (cursor-as-light, velocity, stateful wake, WCAG-gated), §6 the perf budget (the `sampleBase`-per-stroke-cell hot path, renderScale, field-bake hoist). Ends with the headline + 5 highest-value adopts. Every technique cited with 2026-06-06 access dates.

**(2) The research-backed README** — `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/README.md` (415 lines). Comprehensive consumer guide accurately reflecting the *shipped* surface (with file:line anchors) while signposting the AW direction: what aurora is + why it is not a mesh gradient, use cases, the four medium modes + the painterly engine, the API/instance methods/config atoms, `deriveAurora`, best practices, the color/perf notes (linear OETF, the linear-vs-OKLCh interpolation gap, IGN dither, DPR clamp, offscreen-park), examples, design considerations, and a sectioned cited reference list (noise/warp/flow · color · mesh-gradient · painterly/NPR/Van Gogh · impasto/pigment · dither/tonemap · WebGPU).

**(3) The AW aurora wave seeds** — `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/aurora-wave-seeds.md` (303 lines, waves/ dir was empty). Ten waves (AW.W1–W10), each with **scope** (file:line anchors), the **SOTA technique** it lands (cited), and the **gate** (matching the repo's `proof:*` convention): W1 OKLCh in-shader (`proof:aurora-oklch-interp`), W2 derive-color (`…-derive-gamut`), W3 atoms (`…-atoms-roundtrip`), W4 structure-tensor keystone (`…-tensor-field`), W5 van-Gogh (`…-vangogh-preset`), W6 impasto relight (`…-impasto-relight`), W7 oil-pastel (`…-oilpastel-medium`), W8 WebGPU (`…-backend-fallback` + `…-wgsl-equivalence`), W9 interactivity (`…-interaction-prm`), W10 README (`proof:doc-consistency`). Closes with a sequencing table (arc · ships-on · depends-on · gate).

**Headline:** the aurora is already a sophisticated single-pass painterly engine, not a mesh gradient — so the path to *stunning* is four targeted folds over a strong baseline, not a rewrite: derive stroke orientation from the color field's own **structure tensor** (brushwork that hugs the forms like real Van Gogh), move color into **OKLCh in-shader** (the matrices already sit unused in the repo), collapse the 28-field surface to **~7 intuitive atoms**, and **stage WebGPU** as the multi-pass substrate — with the cheap transformative color and options wins shipping on WebGL2 today.

**The 5 highest-value adopts:** (1) in-shader OKLCh palette interpolation — splice the already-1e-6-verified matrices, kill muddy midtones, zero new payload; (2) structure-tensor/ETF stroke orientation — the keystone every painterly wave consumes; (3) the van-Gogh energy-graded atomic-stroke variant (Starry Night turbulence cascade); (4) real height→normal→relit impasto, retiring the faked rim; (5) simplified atoms + derive-color front door (split-comp/tetradic harmonies, bell chroma, warm/cool temperature). All five except the WebGPU multi-pass half ship on WebGL2 now.

---

## Lane briefs

### Lane 1

I now have the full picture, grounded against the existing shader. The aurora already implements Quilez double-warp, rotated-octave fBM, IGN dither, anisotropic nuclei, brushstroke SDFs, and four mediums. The SOTA gaps are clear. Here is the brief.

---

# Aurora SOTA brief — Lane `fbm-domain-warp`

Research for the glass-ui AURORA procedural backdrop. Goal: stunning gradient-art backdrops, genuinely painterly oil-pastel + a true van-gogh mode, full OKLCh, derive-color, simplified controls, WebGPU, interactive. This is research + wave seeds only — no implementation.

## What the aurora already has (so we don't re-seed it)

Read against the live shader, the current pipeline is already strong:

- Quilez canonical **double domain-warp** — `aurora.frag.ts:206-247` `domainWarp()` runs `q = fbm(p)`, `r = fbm(p + 4q)`, `warped = p + amount*r`. This is exactly the `iquilezles.org/articles/warp/` `pattern()` shape.
- **Rotated-octave fBM** — `aurora.frag.ts:164-174`, `p = FBM_ROT * p * 2.02`, gain 0.5, uniform-driven octave count. Matches the IQ `fbm/` optimized loop (avoids `pow`, rotates the domain per octave to kill axis-alignment).
- **IGN dither + ACES + linear pipeline + OETF** — `aurora.frag.ts:185-187, 330-343`. Jimenez interleaved-gradient-noise dither in display space; banding is already handled (the Codrops/Bayer concern is covered).
- **Curved swept-brushstroke SDFs**, best-of-9 placement, 4 stroke layers, impasto rim/shadow, bristle raggedness — `brush.glsl.ts`. This is real stroke-based rendering.
- **Anisotropic nuclei** (elongation + angle), softmax palette blend, four PEER mediums (watercolor/pastel/crayon/oil) — `mediums.glsl.ts`, `presets.ts:38-46`.
- Flow field with radial/swirl/diagonal/curl + cursor swirl — `flow.glsl.ts`.

So the seeds below target **genuine SOTA gaps**, not re-implementations.

## Findings + techniques (cited)

### 1. Analytic-derivative fBM (the biggest single upgrade)

IQ's *value noise derivatives* — `fbm` accumulates a value AND its 2D gradient as a `vec3`/`vec4` in one pass, then attenuates higher octaves by `1.0/(1.0+dot(d,d))`. This produces erosion-like / swirl-aware fBM with "flat areas as well as more rough areas" — the non-uniform, atmospheric character the user wants. Analytic derivatives are ~5x cheaper than central differences and give an exact flow direction for free (no `eps` sampling). [iquilezles.org/articles/morenoise — 2008](https://iquilezles.org/articles/morenoise/)

The current `fbm()` returns a scalar only; `mediumWatercolor` already pays for 4 `sampleBase` calls just to finite-difference an edge gradient (`mediums.glsl.ts:30-35`) — analytic derivatives would replace that with one call and make the gradient exact.

### 2. Curl noise / bitangent noise for divergence-free flow

Bridson's curl-noise gives an exactly incompressible, swirling velocity field — particles/strokes never bunch or stall, which is the "fluid, atmospheric" motion target. [Bridson, Hourihan, Nordenstam, SIGGRAPH 2007 (PDF)](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf); [Dissecting Curl Noise — Dziewanowski](https://emildziewanowski.com/curl-noise/). Classic 2D curl is `vec2(dN/dy, -dN/dx)` — and with analytic-derivative fBM (finding 1) those partials are already in hand, so curl flow is nearly free. The cheaper variant is **bitangent noise**: `cross(grad A, grad B)` is divergence-free by construction with ~30% over simplex and only 2 gradients vs curl's 3. [atyuwen.github.io/posts/bitangent-noise — 2018](https://atyuwen.github.io/posts/bitangent-noise/). The current `flowField` (`flow.glsl.ts:21-24`) only uses one fBm sample for an angle in `multi` mode — curl would be a strictly better organic flow.

### 3. Iterative domain warp / self-advection

Beyond the single 2-level warp, walking coordinates along the flow field for 4–8 steps "dramatically transforms appearance" — this is what gives smoke/aurora its layered, stretched-taffy look. [Curl Noise — rombo.tools, 2026-01-01](https://www.rombo.tools/2026/01/01/curl-noise/); [Tiling Simplex/Flow Noise, JCGT 2022 (PDF)](https://www.jcgt.org/published/0011/01/02/paper-lowres.pdf). The current warp is a fixed 2-level nest (`aurora.frag.ts:208-211`); making depth/advection-steps an atom would unlock far richer flow.

### 4. ETF + LIC = the real van-gogh mechanism

The canonical way to get a genuine Van Gogh / Munch look is **Edge Tangent Flow** (orient strokes along the structure tensor's smaller-eigenvalue eigenvector) visualized by **Line Integral Convolution** (smear a noise field along those flow lines). This is the textbook NPR painterly-rendering pipeline and is explicitly cited as producing "a Vincent Van Gogh or Edvard Munch style." [Line Integral Convolution — Wikipedia](https://en.wikipedia.org/wiki/Line_integral_convolution) (Cabral & Leedom 1993); [Edge Tangent Flow NPR — 3dstereophoto blog, 2018-05](http://3dstereophoto.blogspot.com/2018/05/non-photorealistic-rendering-edge.html); [Artistic Stylization Part III: Anisotropy and Filtering, EG2011 (PDF)](http://kahlan.eps.surrey.ac.uk/EG2011/eg2011-npr3.pdf). The aurora's strokes currently orient off `flowField`; orienting them off a structure-tensor-derived ETF of the *underlying color field* (so strokes hug color boundaries, like Van Gogh's contours around the moon) is the missing ingredient for "congruent to real Van Gogh."

### 5. OKLCh interpolation in-shader + hue-path control

Interpolating color in OKLCh avoids the gray/muddy mid-tones sRGB and HSL produce, and exposes a **hue-path** choice (shorter vs longer way around the wheel) — the latter is how you get arresting rainbow sweeps without crossing gray. [How OKLCH Makes Better Gradients — Blue Monkey Makes](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients); [Why CSS gradients look grayish — Toolbox365](https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/); [gradients.fyi OKLCH mesh generator](https://gradients.fyi/). Aurora currently bakes the palette to linear-sRGB CPU-side (`aurora.frag.ts:16, 60-61`) and blends stops via softmax in linear — so stop→stop blends cross linear-RGB, not OKLCh. The shared chunk already has Ottosson OKLCh matrices (`procedural-color.glsl.ts`); blending the palette in OKLab instead would make every gradient richer for free.

### 6. Stripe/OpenAI mesh-gradient baseline (we already beat the core)

Stripe is layered Simplex-fBm + a `sin/cos` UV mesh modulation, minigl, one pass. [How To: Stripe Gradient — Kevin Hufnagl](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/); [Stripe Mesh Gradient WebGL gist](https://gist.github.com/jshaw/a7315da7b4d1be3ef341009c1ca72c99). Aurora's nuclei-softmax + domain-warp + ACES + dither is already a more advanced substrate; the gap vs Stripe is not technique but **simplicity of the control surface** (Stripe is ~4 knobs) and WebGPU.

### 7. WebGPU path

A WGSL compute/render port unlocks storage buffers for per-stroke data, larger nuclei/stop counts, and timestamp-query-driven adaptive quality. The repo already ships a WGSL substrate (`src/composables/glass/webgpu/glassShader.wgsl`) and a renderer seam, so the path exists. (Bitangent/curl noise are commonly delivered as WebGPU/WebGL Three.js nodes — [CurlNoise, Three.js Blocks](https://www.threejs-blocks.com/docs/module-CurlNoise) — confirming the WGSL feasibility.)

## ADOPT for glass-ui aurora — wave-seed list

Each is a concrete AW (next aurora tranche) wave/fold. Ordered by impact-per-effort.

- **AW.fbm-deriv — analytic-derivative fBM core.** Promote `fbm()` to return `vec3 (value, dValue/dx, dValue/dy)` per IQ morenoise; add the `1/(1+dot(d,d))` octave attenuation as a `--warp-erosion` atom (0 = current smooth fBm, 1 = eroded/atmospheric). Replace `mediumWatercolor`'s 4-sample finite-difference (`mediums.glsl.ts:30-35`) with the analytic gradient. Foundation for AW.curl-flow and AW.etf-strokes. [morenoise](https://iquilezles.org/articles/morenoise/)

- **AW.curl-flow — divergence-free flow field.** Replace the single-sample `multi` angle and the curl perturbation in `flow.glsl.ts` with true curl noise `vec2(d.y, -d.x)` from the AW.fbm-deriv gradient (or bitangent `cross`). New flow atom `pattern: "curl"`. Gives fluid, non-stalling atmospheric movement. [Bridson 2007](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf), [bitangent-noise](https://atyuwen.github.io/posts/bitangent-noise/)

- **AW.warp-advect — iterative/self-advecting warp.** Make warp depth an atom (`--warp-steps` 1–8): walk `p` along the flow field N times before sampling the palette, instead of the fixed 2-level nest at `aurora.frag.ts:208-211`. Unlocks smoke/aurora stretched-taffy flow from the same atoms. [rombo.tools curl](https://www.rombo.tools/2026/01/01/curl-noise/), [JCGT flow noise](https://www.jcgt.org/published/0011/01/02/paper-lowres.pdf)

- **AW.vangogh — ETF-oriented strokes + LIC pass (the headline van-gogh mode).** Compute a structure tensor of the warped color field, take the smaller-eigenvalue eigenvector as the stroke orientation (ETF), and orient `bestOil` strokes + a thin LIC noise smear along it so strokes hug color contours (the moon-halo / cypress-swirl signature). This is the documented NPR Van-Gogh pipeline; pairs with existing impasto. No subject matter — pure flow + brushwork. [ETF NPR blog](http://3dstereophoto.blogspot.com/2018/05/non-photorealistic-rendering-edge.html), [LIC Wikipedia](https://en.wikipedia.org/wiki/Line_integral_convolution), [EG2011 anisotropy PDF](http://kahlan.eps.surrey.ac.uk/EG2011/eg2011-npr3.pdf)

- **AW.oklch-blend — OKLCh palette interpolation + hue-path atom.** Blend palette stops in OKLab (splice the existing Ottosson matrices from `procedural-color.glsl.ts`) instead of the current linear-sRGB softmax, and add a `huePath: "short" | "long"` atom for rainbow sweeps. Makes every gradient richer with zero new payload (chunk already imported). [Blue Monkey OKLCH](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients), [Toolbox365](https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/)

- **AW.derive-color — derive a full palette from one seed + harmony.** A `deriveColor(seed, scheme)` atom (analogous/complementary/triadic/split, generated in OKLCh) so a consumer hands one OKLCh seed and gets a coherent multi-stop palette — the "atoms of control" goal. CPU-side, feeds the existing `uPalette`. [gradients.fyi](https://gradients.fyi/)

- **AW.simplify — collapse the control surface.** Audit the ~30 uniforms into a small atom set (zones=nuclei, noise=warp/flow, color=palette/derive) with sane presets, Stripe-style. The complexity is the gap vs Stripe, not the visuals. [Stripe how-to](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/)

- **AW.wgpu — WebGPU/WGSL render path.** Port FRAGMENT_SRC to WGSL on the existing `glassShader.wgsl` substrate; storage buffers lift the `MAX_NUCLEI=6`/`MAX_STOPS=8` caps and enable per-stroke buffers for the van-gogh mode. Keep the WebGL path as fallback (the `useWebGLCanvas` seam already gates capability). [Three.js CurlNoise WebGPU](https://www.threejs-blocks.com/docs/module-CurlNoise)

- **AW.interactive — flow-field cursor advection (beyond swirl).** The current cursor does a radial rotate (`aurora.frag.ts:229-244`); with the curl field in place, inject the cursor as a moving vortex/source in the velocity field so the paint genuinely flows around the pointer over time (a decaying advected disturbance), not just a static rotation. [Bridson 2007 (boundary/source handling)](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf)

## Key source URLs (all accessed 2026-06-06)

- Domain warping: https://iquilezles.org/articles/warp/
- fBM (rotated octaves, exp2(-H)): https://iquilezles.org/articles/fbm/
- Value noise + analytic derivatives: https://iquilezles.org/articles/morenoise/
- Curl-noise (Bridson 2007): https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf
- Dissecting curl noise: https://emildziewanowski.com/curl-noise/
- Bitangent (divergence-free, cheap): https://atyuwen.github.io/posts/bitangent-noise/
- Curl noise + self-advection: https://www.rombo.tools/2026/01/01/curl-noise/
- Tiling Simplex/Flow noise (JCGT 2022): https://www.jcgt.org/published/0011/01/02/paper-lowres.pdf
- Line Integral Convolution: https://en.wikipedia.org/wiki/Line_integral_convolution
- Edge Tangent Flow NPR (van-gogh): http://3dstereophoto.blogspot.com/2018/05/non-photorealistic-rendering-edge.html
- Stylization anisotropy/filtering (EG2011): http://kahlan.eps.surrey.ac.uk/EG2011/eg2011-npr3.pdf
- OKLCh gradients: https://bluemonkeymakes.com/articles/oklch-makes-better-gradients
- OKLCh banding: https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/
- gradients.fyi (OKLCh mesh): https://gradients.fyi/
- Stripe gradient technique: https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/

Relevant existing files: `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts` (warp + fbm + main), `flow.glsl.ts` (flow field), `brush.glsl.ts` (stroke SDFs), `mediums.glsl.ts` (mediums + finite-diff gradient), `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (Ottosson OKLCh matrices + OETF, already spliced), `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgpu/glassShader.wgsl` (existing WGSL substrate for AW.wgpu).

---

### Lane 2

I have everything I need. The current aurora already has flow-field, curved strokes, impasto, broken color, mediums, OKLCh palette, nuclei/zones, cursor interaction, and the AV.W2 shared-color seam. The seeds must target genuine SOTA gaps. Let me compile the brief.

---

# Aurora SOTA Research Brief — Lane "curl-noise-flow"

Research only. No implementation. Every finding cited with URL + date (all accessed 2026-06-06).

## What's already in the codebase (so seeds don't re-pitch existing work)

Grounding read of the live shader set:
- `flow.glsl.ts:6-51` — `flowField()` dispatches radial/swirl/diagonal/multi, adds a single `fbm`-angle curl perturbation, blends a cursor swirl. **This is angle-warp curl, NOT true divergence-free curl-of-potential.**
- `brush.glsl.ts:72-233` — curved swept-brushstroke SDF (`curvedStroke`), impasto rim/shadow (`paintOver`), best-of-9 cell placement (`bestOil`), broken-color jitter. Strong already.
- `aurora.frag.ts:29-90` — partials assembler; OKLCh palette baked CPU-side to linear sRGB; nuclei/zones with per-nucleus anisotropy; warp modes fbm/cellular/hybrid; mediums smooth/pastel/watercolor/oil/crayon; ACES tonemap; shares OETF+FBM_ROT with the blob via `procedural-color.glsl.ts`.

The aurora is sophisticated. The seeds below push it to genuine SOTA: true incompressible curl flow, streamline-following stroke pathing, structure-tensor brush orientation, and better-than-Stripe gradient layering.

---

## Findings + techniques

### 1. Curl noise = curl of a vector potential → divergence-free by construction
Bridson's method builds velocity as `v = ∇ × ψ` where `ψ` is a noise vector potential; because `div(curl) ≡ 0`, the field is exactly incompressible — no sources/sinks, no particle clustering/gaps, fluid-like swirl. In 2D it collapses to a single scalar potential: `v = (∂ψ/∂y, −∂ψ/∂x)` — a 90° rotation of the gradient.
- Bridson, "Curl-Noise for Procedural Fluid Flow," SIGGRAPH 2007 — https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf (accessed 2026-06-06)
- ResearchGate record — https://www.researchgate.net/publication/216813629_Curl-noise_for_procedural_fluid_flow (accessed 2026-06-06)

Concrete finite-difference recipe (2D), from Dziewanowski's dissection:
```
vec2 curl(p, eps):
  dX = noise(p+ex) - noise(p-ex)
  dY = noise(p+ey) - noise(p-ey)
  return vec2(dY, -dX) / (2*eps)   // NOTE the (dY, -dX) swap — this is what makes it curl, not gradient
```
3D is `∇×P = (∂Pz/∂y−∂Py/∂z, ∂Px/∂z−∂Pz/∂x, ∂Py/∂x−∂Pz/∂y)` via 6 samples. Apply curl to the SDF gradient of a shape to get surface-parallel flow (zone-conforming motion).
- Dziewanowski, "Dissecting Curl Noise" — https://emildziewanowski.com/curl-noise/ (accessed 2026-06-06)

**Gap in current code:** `flow.glsl.ts:27-32` perturbs a *direction angle* by `fbm`. That is not divergence-free and can produce sinks/sources (visible as pooling/thinning). Swapping to true 2D `curl(ψ)` gives genuinely fluid, incompressible aurora motion for free.

### 2. "Improving Curl Noise" (brand new, SIGGRAPH Asia 2025) — n-D div-free via cross-products + reprojection
Generalizes curl noise to any dimension by taking the cross product of `n−1` scalar-noise gradients; streamlines are the intersections of iso-contours of the scalar fields. Headline addition: **reprojection** — after integrating a step, snap the point back onto the exact streamline (iso-contour intersection). This decouples streamline accuracy from integration step size, so loops close and streaks stay connected at low cost. Ships ShaderToy-ready GLSL (image warp, 2D/3D constrained curl, marble).
- Paper — https://dl.acm.org/doi/10.1145/3757377.3763980 (SIGGRAPH Asia 2025, accessed 2026-06-06)
- Reference shaders/code — https://github.com/janba/DivFree-VectorNoise (accessed 2026-06-06)

### 3. `bitangent noise` — cheap analytic div-free 3D noise (no 6-tap finite diff)
Builds a divergence-free field from the cross product of the analytic gradients of two simplex-noise channels — one noise eval per output instead of 6 neighbor taps. HLSL + GLSL provided. Best perf-path if curl flow ships.
- atyuwen, "Fast Divergence-Free Noise Generation in Shaders" — https://atyuwen.github.io/posts/bitangent-noise/ (accessed 2026-06-06)

### 4. Recursive fBm domain warping (iquilezles) — the gradient-art engine
`f(p)=fbm(p+4·fbm(p+4·fbm(p)))`, carrying the intermediate 2D warp vectors `q` and `r` out so they can drive **color**, not just density. The `q`/`r` magnitudes become palette/lightness inputs → the "swirly eroded organic" look that beats a flat mesh gradient. 4-6 octaves per fBm.
- Quílez, "Domain Warping" — https://iquilezles.org/articles/warp/ (accessed 2026-06-06)

**Gap:** current warp has fbm/cellular/hybrid modes but does not (per the assembler) expose the intermediate warp vectors as color drivers. That's the single biggest "gradient-art" upgrade.

### 5. Stripe/OpenAI mesh-gradient look is beatable with layered counter-flowing waves + noise-modulated blur
Alex Harri's deconstruction of a premium flowing gradient: sum 3-4 simplex waves at harmonic wavelength divisors (1.0/1.3/1.86/3.25) with mixed-sign speeds (some travel backward so it never reads as one-directional scroll); displace a 1D gradient LUT by the summed noise; **modulate blur by a separate noise raised to a power** so the field has crisp moments between soft ones; compress the Y axis so motion streams horizontally instead of churning. Quintic smoothstep on alpha kills banding.
- Harri, "A flowing WebGL gradient, deconstructed" — https://alexharri.com/blog/webgl-gradients (accessed 2026-06-06)
- Stripe mesh-gradient package writeup — https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2 (accessed 2026-06-06)

### 6. OKLCh gradients: interpolate in OKLab (rectangular), not OKLCh-hue, for the path; reserve hue-arc for derive-color
Ottosson's OKLab is perceptually uniform; OKLCh is its polar form. Key practitioner finding: **OKLCh hue interpolation takes "unexpected detours" through unintended/out-of-gamut hues and darkens at the midpoint** — for a clean two-stop gradient ramp, interpolate in OKLab (straight line, may pass through gray but no muddy detour). Use the OKLCh hue-arc deliberately only when you *want* the rainbow sweep. Equal numeric ΔL = equal perceived change, which is what makes a derive-color scheme (rotate H, scale C/L by fixed steps) look even.
- Ottosson, "A perceptual color space for image processing" — https://bottosson.github.io/posts/oklab/ (accessed 2026-06-06)
- Evil Martians, "OKLCH in CSS" — https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl (accessed 2026-06-06)
- Toolbox365, gradient banding + OKLCH — https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/ (accessed 2026-06-06)

**Note for code:** palette is baked CPU-side to linear sRGB (`aurora.frag.ts:60-62`). The interpolation-space choice (OKLab vs OKLCh-hue) should be the CPU bake decision, and a "derive-color" variant is naturally a CPU-side OKLCh operation (one base color → N stops by fixed H/C/L deltas).

### 7. Van-Gogh brushstrokes: orient strokes by the Edge Tangent Flow / structure tensor (this is the real "congruent to van Gogh" lever)
The defining property of authentic painterly stroke fields is that strokes follow the **structure-tensor minor eigenvector** (the edge-tangent flow, ETF) — strokes curve *along* features the way van Gogh's do, not along a uniform flow. Compute per-pixel structure tensor `J=[[Jxx,Jxy],[Jxy,Jyy]]` from Sobel gradients, smooth it, take the minor eigenvector → stroke direction. Anisotropic Kuwahara then squeezes/rotates its kernel to that orientation for the painterly smoothing. This is the Kyprianidis/Papari lineage.
- Maxime Heckel, "On Crafting Painterly Shaders" (structure tensor → anisotropic Kuwahara, full passes) — https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ (accessed 2026-06-06)
- Kyprianidis NPR III (anisotropy + flow-based filtering) — http://kahlan.eps.surrey.ac.uk/EG2011/eg2011-npr3.pdf (accessed 2026-06-06)
- ETF overview — http://3dstereophoto.blogspot.com/2018/05/non-photorealistic-rendering-edge.html (accessed 2026-06-06)
- "Hidden Turbulence in van Gogh's The Starry Night" (the strokes literally encode a turbulent/Kolmogorov flow field — validates curl-flow as the right substrate for a van-Gogh variant) — https://arxiv.org/pdf/2310.03415 (accessed 2026-06-06)

**Gap:** `bestOil` orients strokes from the *flow field + jitter* (`brush.glsl.ts:206-210`). Deriving stroke angle from the structure tensor of the underlying base color is the upgrade that makes strokes hug the gradient's own forms — the van-Gogh signature.

### 8. Impasto: height field → normals → GGX specular is the SOTA for "thick paint catches light"
Accumulate per-stroke paint into a height field (canvas tooth + bristle ridges), derive normals from height gradients, light with a GGX microfacet specular. Current code fakes this with a static rim/shadow add (`paintOver:173-178`); a real height-accumulation + normal-based catch-light reads as genuinely raised pigment and can react to cursor as a moving light.
- Substance impasto generator (height/vector → normal/ID maps) — https://80.lv/articles/setting-up-an-oil-painting-generator-in-substance-3d-designer (accessed 2026-06-06)
- Differentiable stroke planning / dual parameterization (height-field paint model) — https://arxiv.org/pdf/2604.02752 (accessed 2026-06-06)

### 9. WebGPU/TSL is the modern path; offload curl-advected particles to a compute pass
TSL compute shaders advect 100k+ particles through a noise/flow field on the GPU; the established pattern is screen-space flow field → sample → world motion. Relevant if aurora ever grows a particle/ember layer or moves the stroke placement off the per-pixel best-of-9 into a compute pass.
- Maxime Heckel, "Field Guide to TSL and WebGPU" (Oct 2025) — https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/ (accessed 2026-06-06)
- three.js WebGPU compute fluid particles example — https://threejs.org/examples/webgpu_compute_particles_fluid.html (accessed 2026-06-06)
- CurlNoise TSL/WebGPU module — https://www.threejs-blocks.com/docs/module-CurlNoise (accessed 2026-06-06)

---

## ADOPT for glass-ui aurora — wave seeds (AW tranche)

Each is a concrete, independently-shippable wave or fold. Ordered by impact/effort.

- **AW.W?-α · True divergence-free curl flow.** Replace the angle-warp in `flow.glsl.ts:26-33` with real 2D curl-of-potential `v=(∂ψ/∂y, −∂ψ/∂x)` (4-tap finite diff on the existing `fbm`, or analytic **bitangent noise** for 1-eval cost). Keep the existing pattern dispatch as the *base* potential bias; curl perturbs incompressibly. Headline: genuinely fluid, no pooling/thinning. Sources: Bridson 2007; Dziewanowski; atyuwen bitangent.

- **AW.W?-β · Streamline reprojection (SIGGRAPH Asia 2025).** Fold the "Improving Curl Noise" reprojection step into the flow integration so stroke/medium streaks follow connected streamlines and loops close — quality lift at near-zero cost. Source: janba/DivFree-VectorNoise + ACM 3757377.3763980.

- **AW.W?-γ · Warp-vector color drive (iquilezles).** Extend the warp stage to carry the intermediate `q`/`r` 2D warp vectors out of `domainWarp()` and feed their magnitudes into palette LUT position + value bias. This is the biggest "gradient-art, better-than-Stripe-mesh" upgrade for the smooth/pastel mediums. Source: iquilezles warp.

- **AW.W?-δ · Structure-tensor stroke orientation (the van-Gogh fold).** In `bestOil` (`brush.glsl.ts:206-210`), derive per-cell stroke angle from the structure tensor (Sobel of `sampleBase`) minor eigenvector instead of flow+jitter, behind a `uStrokeOrient` switch (`flow` | `tensor`). Add a dedicated `vangogh` preset that combines tensor orientation + curl flow + load-drag shape + high broken-color jitter — atomic brushstrokes that hug the gradient's forms, no subject matter. Sources: Heckel painterly; Kyprianidis NPR III; Starry Night turbulence arXiv.

- **AW.W?-ε · OKLab-path palette bake + derive-color variant.** Move the CPU palette bake to interpolate in OKLab (straight perceptual line, no hue-detour darkening) for ramps, with an explicit OKLCh hue-arc opt-in. Add a `deriveColor(base)` mode: one base OKLCh color → N stops by fixed H/C/L deltas (the "atoms of control / simplified options" ask). Sources: Ottosson OKLab; Evil Martians; Toolbox365.

- **AW.W?-ζ · Stripe-beating smooth medium: counter-flowing harmonic waves + noise-modulated blur.** For the `smooth` medium, layer 3-4 harmonic-divisor waves with mixed-sign speeds, displace the palette LUT, and modulate softness by a powered noise (crisp-between-soft), quintic-smoothstep the blend to kill banding. Source: Alex Harri deconstruction.

- **AW.W?-η · Real impasto: height field → normals → GGX catch-light.** Upgrade `paintOver`'s static rim/shadow (`brush.glsl.ts:173-178`) to accumulate a paint height field and light it with a GGX specular whose light direction tracks the cursor — thick paint that genuinely catches a moving light. Sources: Substance impasto; differentiable stroke planning arXiv. (Oil-pastel/crayon mediums inherit the tooth-height term.)

- **AW.W?-θ · Cursor as incompressible vortex + moving light.** Replace the cursor angle-blend (`flow.glsl.ts:34-49`) with a curl-consistent vortex injected into the potential (so the cursor stirs the fluid without breaking divergence-free), and reuse the same cursor position as the impasto light from AW-η. Ties interactivity to the physics. Sources: Bridson (procedural vortex primitives); Dziewanowski.

- **AW.W?-ι (optional, forward-looking) · WebGPU/TSL compute path.** Scope a compute-shader port of stroke placement (move best-of-9 off the per-pixel fragment loop) and an optional curl-advected ember/particle layer, gated on the existing `useWebGLCanvas` substrate. Defer unless a WebGPU substrate lands. Sources: Heckel TSL field guide; three.js WebGPU fluid example; threejs-blocks CurlNoise.

**Sequencing note:** α→β→θ form the "fluid physics" arc (do together); γ→ε→ζ form the "gradient-art / smooth-mode" arc; δ→η form the "painterly / van-Gogh" arc. Each arc is independently demoable.

Relevant files (absolute): `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/flow.glsl.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/brush.glsl.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/mediums.glsl.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/composables/color.ts`, `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/shaders/procedural-color.glsl.ts`.

---

### Lane 3

I have everything I need. The Starry Night turbulence finding (Kolmogorov / Batchelor scaling, brushstroke scale 0.09–6 cm) is a striking anchor for a physically-grounded Van Gogh flow field. Let me synthesize the brief.

# SOTA Research Brief — Aurora Gradient-Noise Variants (Lane: gradient-noise-variants)

Tranche-development research only. No implementation. Audience: an AW aurora tranche.

## What the Aurora already has (baseline, so seeds don't re-invent)

Read from source before researching, so every seed is a genuine delta:

- **Noise**: hand-rolled 2D `hash21` value-noise + 5-octave rotated FBM (`FBM_ROT = mat2(0.8,0.6,-0.6,0.8)`, 2.02 lacunarity), plus Worley/cellular f1 — `src/components/custom/aurora/constants/shaders/aurora.frag.ts:136-203`.
- **Warp**: Quilez canonical double domain-warp + cellular/hybrid modes + cursor swirl — `aurora.frag.ts:206-247`.
- **Flow**: radial/swirl/diagonal/multi dispatch with curl perturbation + cursor anchor — `flow.glsl.ts:6-40`.
- **Brush**: curved swept-stroke SDF with bulge spine, shape profiles, impasto edge, best-of-9 placement — `brush.glsl.ts`.
- **Color**: OKLCh palette baked CPU-side to linear sRGB; ACES tonemap; in-shader `srgbToOklab`/`oklabToLinearSrgb` matrices available but unused by aurora — `procedural-color.glsl.ts:73-134`, `aurora.frag.ts:15-27`.
- **Banding**: 1-LSB Interleaved Gradient Noise (IGN) dither in **display space after OETF** — `aurora.frag.ts:185-187, 343`. This is already the SOTA dither choice (see below).
- **Substrate**: WebGL2 only; CSS-gradient fallback for low-power — `renderMode.ts`.

So the gaps are: noise is **value-noise-only** (no simplex/gradient noise, no blue noise, no Gabor); color is a **static baked LUT** (no procedural/derive-color palette); flow is **kinematic, not physically-grounded** (no curl-of-FBM divergence-free field, no structure-tensor stroke orientation); substrate is **WebGL-only** (no WebGPU/compute path).

## Findings — the noise-variant trade-off matrix

For smooth, banding-free, painterly backdrops:

| Variant | Look | Cost (2D) | Banding behavior | Verdict for aurora |
|---|---|---|---|---|
| **Value noise** (current) | Soft but tends "blocky"; needs many octaves | cheapest | bell-ish after fBm, but cubic-smoothstep interp shows faint lattice | fine for the wash layer; weak as the sole base |
| **Perlin (gradient) noise** | Smoother than value; faint axis-aligned directional bands | 4 gradient samples/px 2D | grid-derived gradients align bands to axes | strictly better than value, but anisotropy is a banding source |
| **Simplex (`snoise`)** | **Isotropic**, no axis artifacts, bell-shaped −1..1 distribution, cheap analytic derivative | 3 samples/px 2D, scales far better to 3D/4D | "−1..1, more or less bell-shaped distribution... helps minimize banding in fBm" | **the painterly-backdrop default**; the analytic gradient also feeds curl-noise for free |
| **Worley / cellular** (current) | Cellular "territories", crystalline | 9-cell (or Gustavson 2×2, with edge artifacts) | hard cell edges = the opposite of smooth | keep as a *texture/zone* modulator, not a gradient base |
| **Gabor noise** | Band-limited, controllable orientation+frequency — sparse convolution of Gabor kernels | expensive (kernel convolution) | best spectral control of any variant; can be made anisotropic on purpose | high-value but heavy; a stretch goal for directional brush-grain, not the base field |
| **Blue noise** | Spectrally even, no low-freq clumping | texture lookup or generated | **best dither**; bands → "finely stippled gradients" | adopt as an *optional upgrade* to IGN for the final 8-bit dither |

Key SOTA notes:
- Simplex's no-axis-artifact property comes from its gradient distribution (the `41 / 289` coprime shuffle gives "good isotropic distribution"); it has "a well-defined and continuous gradient everywhere computed quite cheaply" — which is exactly what flow/curl noise wants.
- 3D simplex sampled on an animated z-slice gives temporally-coherent flow that a 2D value-noise scroll cannot — the band traverse looks like advection, not panning.
- **Blue noise > white noise > IGN** strictly for banding, but the article that coined IGN (Jimenez) argues IGN is the best *texture-free* option and warns: don't double-dither on 6-bit panels, and dither in display space at ±0.5 LSB (which the aurora already does). So blue-noise is an *optional* gain, not a correctness fix.

## Findings — beyond noise: color, flow, and the painterly stack

**1. Procedural / derive-color palettes (IQ cosine palettes).** `color(t) = a + b·cos(2π(c·t + d))`, a/b/c/d ∈ RGB vectors — a, b control brightness/contrast; c is hue-frequency; d is per-channel phase (hue separation). A full harmonious palette from 12 numbers, no LUT. e.g. warm: `d=(0.00,0.33,0.67)`. This is the canonical **derive-color** primitive — one anchor color + a/b/c/d → an infinite smooth gradient ramp. For OKLCh fidelity, run the cosine in OKLCh (L,C,H) rather than RGB and convert with the matrices already in `procedural-color.glsl.ts`, so the ramp is perceptually uniform and chroma-stable.

**2. OKLCh in-shader interpolation.** Aurora bakes its palette to a linear-RGB LUT and mixes RGB between stops — RGB-space mixing is where "muddy middles" and value dips come from. OKLCh mixing (lerp L and C, shortest-arc lerp H) keeps mid-gradient saturation and luminance, the exact thing Stripe/OpenAI mesh gradients get right. The matrices are already spliced-ready in the shared chunk.

**3. Stripe/OpenAI mesh-gradient recipe.** Their look = **multi-octave simplex fBm in the warp + sinusoidal UV mesh modulation** (`sin/cos` on UVs with time offsets) to read as "liquid surface / stretched fabric", over a small set of color points each radiating a field. Aurora's nuclei-softmax field is already this shape; the missing pieces are the simplex base and the sinusoidal mesh warp.

**4. Curl noise for true fluid flow.** Curl of a 2D noise potential is **divergence-free by construction** → guaranteed incompressible, fluid-like advection with no sources/sinks. Aurora's current flow is kinematic (atan + noise perturb). Replacing with `curl(ψ)` where `ψ = fBm(simplex)` gives genuinely fluid band motion — and simplex's analytic derivative makes the curl nearly free.

**5. Van Gogh — physically-grounded brushstrokes.** Two SOTA anchors:
- **Orientation via structure tensor / edge-tangent flow (ETF).** Painterly renderers (anisotropic Kuwahara lineage) compute a smoothed structure tensor (Sobel → `J = [[Jxx,Jxy],[Jxy,Jyy]]`), eigen-decompose for the local minor-eigenvector, and lay strokes along that tangent field. This is how strokes "follow the form" instead of sitting on a fixed flow pattern. The aurora's swept-stroke SDF already exists — it needs the tensor-derived orientation field feeding stroke angle.
- **Turbulence-correct swirl.** Van Gogh's Starry Night sky measurably follows **Kolmogorov turbulence** (14 swirls match) and small strokes match **Batchelor scaling**; stroke scales span ~0.09–6 cm. A van-gogh flow variant should use a **multi-scale curl field with a −5/3 (Kolmogorov) energy cascade** across octaves and a stroke-length distribution tied to local flow energy — that is what makes it *congruent to real Van Gogh* rather than a generic swirl. No subject matter needed; it's purely the flow+stroke statistics.

**6. WebGPU/WGSL.** Compute shaders unlock what WebGL can't: bake the noise/flow/structure-tensor fields into storage textures **once per N frames** (the tensor and curl fields are expensive but slowly-varying), then the render pass just samples them — 10×+ headroom for the heavy Kuwahara/Gabor/multi-pass painterly stack. WGSL also compiles AOT for consistent cross-driver output. This is a parallel substrate, not a rewrite — the GLSL chunks port to WGSL and `useWebGLCanvas` gains a sibling.

## ADOPT for glass-ui aurora — wave seeds

Each is a concrete AW wave/fold. Ordered roughly by value-to-effort.

- **AW.Wx — `noiseBasis` axis (simplex base).** Add a `noiseBasis: "value" | "simplex"` uniform; splice Ashima/McEwan-Gustavson `snoise` (2D + 3D) into a new `noise-basis.glsl` shared chunk. Default existing presets to `value` (zero visual delta), let new presets opt into `simplex` for the isotropic, band-free base. 3D snoise on an animated z gives advection-style motion. *This is the headline noise fold.*

- **AW.Wx — Derive-color variant (cosine palette in OKLCh).** New `paletteMode: "stops" | "derive"`. In `derive` mode the config carries one anchor + `a/b/c/d` OKLCh vectors; the shader evaluates `L,C,H = a + b·cos(2π(c·t+d))` and converts via the existing OKLCh matrices. One control-atom (anchor + 4 vectors) → infinite harmonious ramp. Directly serves "simplified options" + "derive-color variant".

- **AW.Wx — OKLCh in-shader stop interpolation.** Switch the nuclei palette mix from linear-RGB lerp to OKLCh lerp (L,C linear; H shortest-arc). Kills muddy middles; this is the single biggest "better than Stripe/OpenAI mesh" gain. Matrices already present.

- **AW.Wx — Curl-noise flow field.** Replace the kinematic `flowField` core with `curl(ψ)`, `ψ = fBm(snoise)`, gated behind a `flowMode: "kinematic" | "curl"` so existing presets are untouched. Divergence-free → genuinely fluid band drift.

- **AW.Wx — Sinusoidal mesh warp fold.** Add the Stripe-style `sin/cos`-on-UV mesh modulation as an additive warp term (`uMeshAmount`, `uMeshScale`) layered onto `domainWarp`. Cheap, high arrest-factor "liquid fabric" read.

- **AW.Wx — Van Gogh flow + stroke orientation (structure tensor).** Compute a structure tensor over the warped color field, eigen-decompose, and feed the minor-eigenvector tangent into the brush stroke angle. Strokes follow the form. Pair with a Kolmogorov-cascade (−5/3 octave weighting) curl field and a flow-energy-tied stroke-length distribution for the dedicated `van-gogh` variant — congruent to real Van Gogh turbulence, no subject matter.

- **AW.Wx — Blue-noise dither upgrade (optional).** Add `ditherMode: "ign" | "blue"`; sample a small tiled blue-noise texture (or generated approximation) instead of IGN for the final ±0.5 LSB display-space dither. Keep IGN default (texture-free). Marginal but real on low-contrast wash gradients.

- **AW.Wx — Oil-pastel medium pass (anisotropic Kuwahara + tooth).** For the genuinely-painterly oil-pastel mode, run a small anisotropic Kuwahara smoothing (Papari circular kernel, structure-tensor-elliptical) as a medium pass before the brush layer, multiplied by paper-tooth noise. This is the documented oil-painting-look pipeline; gives the "oil-pastel-redolent" quality the current per-pixel tooth noise can't.

- **AW.Wx — Gabor-noise brush grain (stretch).** Band-limited, orientation-controllable Gabor noise for directional bristle/canvas grain inside strokes — the only variant with real spectral control. Heavy; scope as opt-in for the high-fidelity van-gogh/oil paths only.

- **AW.Wx — WebGPU/WGSL substrate sibling.** Port the noise/flow/tensor chunks to WGSL; add a compute pass that bakes the slowly-varying fields (structure tensor, curl potential, Gabor grain) into storage textures every N frames, render pass samples them. Extend `resolveRenderMode` to a `"webgpu" | "webgl" | "css"` tier with WebGL as the fallback. Unlocks the heavy painterly stack at 60fps and AOT-consistent output. *Largest wave; the "modern WebGPU" goal.*

## Sources (all accessed 2026-06-06)

- [Simplex vs Perlin: When and Why — PulseGeek](https://pulsegeek.com/articles/simplex-noise-vs-perlin-noise-when-and-why/)
- [Simplex noise — Wikipedia](https://en.wikipedia.org/wiki/Simplex_noise)
- [The Book of Shaders: Noise (Ch.11)](https://thebookofshaders.com/11/) and [Cellular noise (Ch.12)](https://thebookofshaders.com/12/)
- [Efficient computational noise in GLSL — McEwan, Gustavson et al., arXiv:1204.1461](https://arxiv.org/pdf/1204.1461) and [ar5iv HTML](https://ar5iv.labs.arxiv.org/html/1204.1461)
- [Ashima webgl-noise GLSL `snoise`](https://github.com/ashima/webgl-noise/wiki) / [hughsk/glsl-noise simplex 3d](https://github.com/hughsk/glsl-noise/blob/master/simplex/3d.glsl)
- [Worley noise — Wikipedia](https://en.wikipedia.org/wiki/Worley_noise) / [Gustavson cellular GLSL notes](https://itn-web.it.liu.se/~stegu76/GLSL-cellular/GLSL-cellular-notes.pdf)
- [How to (and how not to) fix color banding — frost.kiwi](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/) (IGN, display-space ±0.5 LSB, don't-double-dither)
- [Free blue noise textures — Moments in Graphics](https://momentsingraphics.de/BlueNoise.html)
- [On Crafting Painterly Shaders — Maxime Heckel](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) (Kuwahara → Papari → structure-tensor anisotropic, multi-pass)
- [Oil Painting Style Rendering Based on Kuwahara Filter (PDF)](https://scispace.com/pdf/oil-painting-style-rendering-based-on-kuwahara-filter-rdf4wd0ne2.pdf)
- [A Van Gogh inspired 3D Shader Methodology — Sharma thesis (PDF)](https://core.ac.uk/download/pdf/147237812.pdf)
- [Hidden Turbulence in van Gogh's The Starry Night — arXiv:2310.03415](https://arxiv.org/pdf/2310.03415) (Kolmogorov/Batchelor scaling, stroke scales)
- [Procedural Color Palettes — Inigo Quilez](https://iquilezles.org/articles/palettes/) (cosine palette `a+b·cos(2π(ct+d))`)
- [Curl-Noise for Procedural Fluid Flow — Bridson (PDF)](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf) / [Dissecting Curl Noise — Dziewanowski](https://emildziewanowski.com/curl-noise/)
- [OKLCH makes better gradients — Blue Monkey Makes](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients) / [OKLCH perceptual color design — ColorArchive](https://colorarchive.org/guides/oklch-perceptual-color-design-guide/)
- [Stripe Mesh Gradient WebGL recipe (Medium)](https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2) / [gradient-stripe (fBm simplex + sinusoidal mesh)](https://github.com/exzenter/gradient-stripe)
- [WGSL spec — W3C](https://www.w3.org/TR/WGSL/) / [WebGPU Compute Shader Basics — webgpufundamentals](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html) / [Field Guide to TSL and WebGPU — Maxime Heckel](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/)

Relevant source files: `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts`, `.../shaders/flow.glsl.ts`, `.../shaders/brush.glsl.ts`, `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/shaders/procedural-color.glsl.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/renderMode.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/presets.ts`.

---

### Lane 4

I have a complete picture. The current aurora is a 2D nuclei-softmax gradient-art field with painterly mediums — strong on gradient art, but it has NO true northern-lights structure (no curtains, no height-banding, no green-magenta emission physics) and its "oil/van-gogh" brushwork is medium-modulated noise, not flow-oriented atomic strokes. The research gives me the concrete techniques to seed waves. Synthesizing the brief now.

---

# AW Aurora — SOTA research brief (lane: volumetric-aurora)

Research only. No implementation. Baseline read: the shipped aurora is a 2D **nuclei-softmax gradient field** (`composition.glsl.ts`) + Quilez double-warp (`aurora.frag.ts:206`) + four painterly mediums (`mediums.glsl.ts`, 232 lines) + ACES tonemap, palette baked CPU-side in linear-OKLCh. It is gradient-art, **not** a northern-lights renderer: no curtain/ribbon structure, no height-banding, no emission-color physics, and its "oil/van-gogh" brushwork is noise-modulated color (`mediums.glsl.ts`), not flow-oriented atomic strokes. The research below targets the two named goals: (a) a genuine **aurora-borealis** structural mode, and (b) **atomic, flow-oriented brushwork** that betters the current medium overlays.

## Findings

### 1. True aurora structure = curtain raymarch, not 2D noise

The canonical real-time approach extrudes a 2D noise "footprint" downward through a volume via a short raymarch loop. The curtain look is **not** one noise field — it is the **absolute difference of two scrolling Perlin/fBm fields** (`abs(noiseA - noiseB)`), which produces the thin veiny streaks instead of solid blobs (Roy Theunissen breakdown, 2022-09-17). Two layers scroll at different speeds/scales, often opposed.
- Source: Roy Theunissen, "Aurora Borealis: A Breakdown" — https://blog.roytheunissen.com/2022/09/17/aurora-borealis-a-breakdown/ (2022-09-17)

The reference real-time shader is **nimitz "Auroras"** (Shadertoy XtGGRt, 2017): a `for(i<50)` raymarch where each step samples a `triNoise2d` field at `rd.xz/rd.y` (the `/rd.y` is the perspective foreshortening that makes the curtain recede to the horizon), accumulates with an exponential falloff `exp2(-i*0.065 - 2.5) * smoothstep(0,5,i)`, applies a height gate `clamp(rd.y*15 + 0.4, 0, 1)`, and colors via a per-step sine ramp `sin(1 - vec3(2.15,-0.5,1.2) + i*0.043)*0.5+0.5` — the phase-offset RGB sine **is** the green→magenta→cyan banding, keyed to march depth `i`.
- Source: nimitz "Auroras", Shadertoy https://www.shadertoy.com/view/XtGGRt (2017); GLSL mirror gist https://gist.github.com/47475c0734a2db0d1320d2582564f77f
- `triNoise2d` reused across the demoscene (RiftRay `xyptonjtroz.glsl`): https://github.com/jimbo00000/RiftRay/blob/master/shaders/xyptonjtroz.glsl

### 2. The physics gives the color model for free (height-banding)

Aurora color is **altitude-stratified**, and this maps directly onto a 1D LUT keyed by march height:
- **Green (557.7 nm, atomic oxygen)** — 100–150 km, the dominant band.
- **Red (630.0 nm, atomic oxygen)** — >200 km, long-lived state, soft upper fringe.
- **Blue/violet/pink (molecular nitrogen)** — 80–100 km low edge, only in intense events.
- **Purple (ionic nitrogen, 427.8 nm)** — 400 km+, faint upper crown.
- Source: AuroraWatch UK, Lancaster — https://wp.lancs.ac.uk/aurorawatchuk/2017/05/10/the-vivid-lights-what-causes-the-colour-of-the-aurora/ (2017-05-10); Face the Outdoors aurora color guide — https://www.facetheoutdoors.com/colors-of-the-northern-lights/

The academic GPU model (Lawlor & Genetti, "Interactive Volume Rendering Aurora on the GPU", WSCG 2011) factors the display into a **2D electron-flux footprint × a height-dependent energy-deposition function**. Electrons 1–20 keV deposit over 50–500 km; the deposition curve (from the MSIS atmosphere model) is precomputed to a small 2D LUT (intensity × altitude → emission). The dimensional factoring (2D map + 1D height curve instead of 3D volume) is itself a **2× speedup**, and a 2D-SDF of the footprint accelerates the empty-space skip (~3.5×). This is the principled version of nimitz's hack.
- Source: Lawlor & Genetti, WSCG 2011 — https://www.cs.uaf.edu/~olawlor/2011/aurora_WSCG_2011.pdf ; readable slides https://slidetodoc.com/interactive-volume-rendering-aurora-on-the-gpu-orion/
- Modern volumetric writeup (flipped-sphere raymarch, cubemap footprint, SDF accel): Toni Sagristà, "Rendering volume aurorae and nebulae" — https://tonisagrista.com/blog/2024/rendering-aurorae-nebulae/ (2024)

### 3. Atomic brushwork = oriented strokes along a flow field, not noise multiply

The current mediums apply anisotropic noise *aligned to a global `flowAngle`*. SOTA painterly rendering orients each stroke to a **per-pixel direction field** derived from image structure:
- **Structure tensor → Anisotropic Kuwahara** (Kyprianidis & Döllner, PG 2009): smooth the structure tensor, take eigenvalues; the **minor eigenvector** gives local orientation, `(λ1−λ2)/(λ1+λ2)` gives anisotropy. The filter becomes an **ellipse** stretched along the feature, with 8 sector weights — this is what gives the "oil-painting directional, sharp-edge" look in real time on GPU. Temporally coherent with no extra passes.
- Source: Kyprianidis & Döllner, "Image and Video Abstraction by Anisotropic Kuwahara Filtering" — https://www.kyprianidis.com/p/pg2009/index.html (2009); GPU Pro chapter https://www.kyprianidis.com/p/gpupro/
- **Edge Tangent Flow (ETF)** (Kang, Lee, Chui, "Flow-Based Image Abstraction"): build a smooth tangent field by rotating image gradients 90° and iteratively aligning weak vectors to strong neighbors. This is the **artist-friendly seam** — brush strokes follow it, palettes are independent. The van-gogh swirl is exactly an ETF over a curl/turbulence field.
- Source: Coherent Line Drawing, Kang et al. — https://cg.postech.ac.kr/papers/kang_npar07_hi.pdf ; ETF primer http://3dstereophoto.blogspot.com/2018/05/non-photorealistic-rendering-edge.html
- Van Gogh impasto specifically uses **fluid-sim / curl-noise vector fields** for stroke alignment (Olsen, "Fluid Simulation as a Tool for Painterly Animation" — https://users.cs.northwestern.edu/~sco590/npr/van_gogh.pdf), and real Starry Night brushwork was measured to follow **Kolmogorov turbulence** scaling (arXiv 2310.03415, "Hidden Turbulence in van Gogh's The Starry Night" — https://arxiv.org/pdf/2310.03415) — i.e. multi-scale curl noise is the *physically congruent* orientation field. Impasto relief is faked by deriving a **normal map from accumulated stroke height** and applying a cheap directional light (per the Van Gogh shader theses — TAMU Pal 2004, http://oaktrust.library.tamu.edu/bitstream/1969.1/1125/1/etd-tamu-2004B-VIZA-Pal-2.pdf).

### 4. Gradient art (the Stripe/OpenAI bar) = OKLCh mesh + grain + progressive blur

The current shader already bakes OKLCh→linear CPU-side (good). The SOTA mesh-gradient bar adds: **interpolate in OKLCh** (no muddy midtones, no hue-skew — already done CPU-side; should also be the *in-shader* nuclei blend space), **a per-stop grain/dither** (the shader has IGN dither at `aurora.frag.ts:343` — already present), and **progressive blur** between zones. A WebGPU-native escape hatch (`mcp`-free) compute path enables **reaction-diffusion / curl-advection** to evolve the field instead of static warp.
- Source: gradients.fyi (OKLCh mesh + noise + progressive blur reference) — https://gradients.fyi/ ; "OKLCH Gradients and Perceptual Smoothness" — https://colors.jarhalab.com/wiki/oklch-gradients-and-perceptual-smoothness
- WebGPU compute backdrops: Codrops reaction-diffusion in WGSL — https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/ ; WebGPU fluid sim — https://tympanus.net/codrops/2025/02/26/webgpu-fluid-simulations-high-performance-real-time-rendering/

## Techniques (distilled)

| Technique | What it buys | Source |
|---|---|---|
| `abs(noiseA − noiseB)` two-field difference | thin curtain streaks vs solid blobs | Theunissen |
| Short raymarch with `xz/y` perspective + `exp2(-i·k)` falloff | recede-to-horizon curtain volume | nimitz XtGGRt |
| Height→color 1D LUT (green 100-150 / red >200 / violet 80-100 / purple 400+ km) | physically-correct emission banding | AuroraWatch, Lawlor |
| 2D footprint × height-deposition factoring + 2D-SDF skip | cheap volumetric, empty-space accel | Lawlor & Genetti 2011 |
| Structure-tensor eigen-orientation + anisotropic Kuwahara ellipse | oriented oil strokes, sharp edges, temporally coherent | Kyprianidis 2009 |
| Edge Tangent Flow (gradient⟂, iterative smoothing) | artist-friendly stroke direction field | Kang et al. |
| Curl/turbulence (Kolmogorov-scaled multi-octave) flow field | van-gogh-congruent swirl orientation | arXiv 2310.03415, Olsen |
| Stroke-height → normal map → directional light | impasto relief without geometry | TAMU NPR theses |
| OKLCh in-shader blend + progressive blur + grain | clean mesh-gradient midtones | gradients.fyi |
| WGSL compute (reaction-diffusion / curl advection) | living field, WebGPU path | Codrops, Sagristà |

## ADOPT for glass-ui aurora — wave seeds

Each is a concrete AW wave/fold. They layer onto the existing `useWebGLCanvas` substrate + per-partial shader assembler; mode selection rides a new `structure`/`mode` uniform alongside the existing `uMedium`.

- **AW.W1 — `mode="borealis"` curtain substrate.** New `aurora-borealis.glsl.ts` partial: a `≤32`-step raymarch on the existing full-screen UV, curtain density = `abs(fbmA − fbmB)` of two opposed-scroll fields, perspective via `uv.x / (uv.y + ε)`, accumulation `exp2(-i·k)·smoothstep`. Gate behind the `mode` uniform so the gradient field stays the default. Keep it on WebGL2 (no WebGPU dep). (nimitz XtGGRt, Theunissen)

- **AW.W2 — height-banded emission LUT (OKLCh).** A 1D height→color ramp baked CPU-side in OKLCh from the *existing* palette stops, mapping march-height to green(low)→red(high)→violet(crown). Reuses the linear-OKLCh bake path already in `color.ts`; adds a `uHeightBands[...]` or small LUT uniform. This is the "derive-color variant" — the aurora palette derives from one base hue + the physical band offsets. (AuroraWatch, Lawlor)

- **AW.W3 — atoms-of-control schema for borealis.** Expose curtain zones as the same nuclei vocabulary already shipped (`uNucleiPos/Radius/...`): each nucleus seeds a curtain's lateral position, intensity, and band-bias. One config schema spans gradient + borealis; "simplified options" = a 3-knob preset (intensity / altitude-spread / hue) that expands to the full atom set. (matches DESIGN.md §2 invariant 1)

- **AW.W4 — ETF / structure-tensor stroke orientation (replaces global `flowAngle`).** Build a per-pixel direction field — for the procedural field, sample the gradient of the warped nuclei field and rotate 90° (cheap analytic ETF, no multi-pass needed); feed it as the stroke tangent into `mediums.glsl.ts` instead of the single `uFlowAngle`. This is the single highest-leverage change for "atomic brushstrokes": strokes follow the color boundaries. (Kang ETF, Kyprianidis)

- **AW.W5 — `medium="vangogh"` atomic-stroke mode.** A genuine stroke pass: discrete SDF strokes placed on a jittered grid, each oriented by the AW.W4 field, length/curvature from a **Kolmogorov-scaled curl-noise** field, per-stroke OKLCh hue/value jitter (the existing `brokenColorJitter` is the seed), layered back-to-front. No subject matter — pure field. Strictly a peer medium like crayon (`uMedium==5`). (arXiv 2310.03415 turbulence; Olsen; TAMU theses)

- **AW.W6 — impasto relief fold.** Accumulate stroke height into a scalar; derive a normal via screen-space derivatives (`dFdx/dFdy`); apply one cheap directional light for the raised-paint look. Rides on AW.W5; `uImpasto` already exists as a uniform name to repurpose. (TAMU NPR theses)

- **AW.W7 — oil-pastel fidelity pass.** Upgrade the existing `mediumPastel`/crayon tooth from isotropic-ish noise to **anisotropic Kuwahara-style sector smoothing** along the AW.W4 orientation — the "genuinely oil-pastel-redolent" ask. Tooth + broken-color + Kuwahara flattening along feature direction = the real pastel-on-tooth look. (Kyprianidis 2009)

- **AW.W8 — interactivity: cursor as wind, not just swirl.** The existing cursor-rotate (`aurora.frag.ts:229`) drives the gradient warp; extend it to perturb the borealis curtain phase and the ETF field locally (a "wind" that bends curtains + strokes near the pointer). Reuses `uCursor/uCursorStrength/uCursorRadius`. (dynamic/interactive goal)

- **AW.W9 (stretch) — WebGPU compute escape hatch.** A WGSL `mode` that advects the field with curl-noise or a reaction-diffusion step in a compute pass for a *living* (not just drifting) backdrop, behind a `@supports`/`navigator.gpu` capability gate with the WebGL2 path as fallback. Honors the existing PRM-freeze + offscreen-pause substrate contract. (Codrops WGSL, Sagristà) — flag as substrate-without-consumer risk per invariant 10; ship only if a consumer binds it.

## Risk / fit notes
- The borealis mode is a *new structural pole* — it should be additive behind a `mode` uniform, not a rewrite; DESIGN.md's "single shader, single draw, zero deps, no top-level medium branches" invariant (§3) means the curtain raymarch must route inside one program like the mediums do, or DESIGN.md §3 gets an explicit amendment wave.
- AW.W4 (ETF) is the dependency root for AW.W5–W7; sequence it first.
- Everything except AW.W9 stays on WebGL2 / the existing substrate, PRM-freeze, and OKLCh-CPU-bake paths — no new runtime deps.

Files grounding this brief: `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts` (main, 348 lines; warp at :206, cursor at :229, OETF at :339, dither at :343), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/mediums.glsl.ts` (232 lines, the four mediums to extend), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/composition.glsl.ts` (60 lines, nuclei-softmax), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/DESIGN.md` (v4.1 — §2 invariants, §3 non-goals to amend for borealis), `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (134 lines, shared OETF/OKLCh chunk).

---

### Lane 5

I now have a complete picture of both the SOTA literature and the current aurora implementation. The flow field is procedural-pattern based (radial/swirl/diagonal/multi) not structure-tensor/ETF based; render mode is WebGL2-only with a CSS fallback (no WebGPU path); flow doesn't drive palette placement; van-gogh is a preset not a distinct stroke architecture. Synthesizing the brief.

---

# SOTA research brief — aurora skyscape-procedural lane

Research for glass-ui's `Aurora` procedural backdrop. Findings, techniques, and concrete wave-seeds. All web sources cited with URL + access date (2026-06-06). File:line refs are to the current aurora implementation.

## Where aurora is today (grounding)

- **Composition**: multi-nuclei anisotropic-Gaussian softmax field over an OKLCh palette LUT, baked to linear sRGB. `composition.glsl.ts:20-59`, `color.ts:42-64`.
- **Palette is fully OKLCh + value.js Ottosson core**, with a `deriveAurora(seed, {harmony})` one-color seeder already shipping (`analogous|complementary|triad|monochrome`). `color.ts:152-200`.
- **Oil medium** is a real curved-spine swept-brushstroke SDF with best-of-9-cell placement, bristle-ragged edges, internal streaking, and an *additive* impasto rim/shadow term. `brush.glsl.ts:72-233`. The impasto is a faked rim light (`+impastoAmp*rim*vec3(...)`, `brush.glsl.ts:175`), **not** a height-field/normal-lit surface.
- **Flow** is a procedural pattern dispatch (`none|radial|swirl|diagonal|multi`) — `flow.glsl.ts:6`. By design invariant 5 (`DESIGN.md:24`), **flow never drives which palette stop a pixel picks**; it only bends stroke direction. There is no image-derived orientation/structure-tensor field.
- **Render path** is WebGL2-only with a CSS-gradient fallback (`renderMode.ts:9`). **No WebGPU.** "Modern WebGPU" is a genuine gap.
- **No atmospheric/scattering model.** The "Sky/Dawn" presets are hand-authored nuclei palettes, not physics-derived golden-hour gradients.
- van Gogh is one preset (`Oil Van Gogh`), riding the same generic oil stroke architecture — not a distinct turbulent-flow stroke field.

## Findings (techniques worth adopting)

### 1. Procedural sky = Rayleigh + Mie + ozone, sun-angle-driven
The canonical real-time sky is a raymarched scattering integral: Rayleigh density `exp(-h/8km)` with `β=(0.0058,0.0135,0.0331)` gives the blue; Mie (`scaleHeight≈1.2km`, anisotropy `g`) gives the forward-scattered golden-hour haze around the sun; ozone `β_abs=(0.00065,0.00188,0.00008)` removes green/yellow and is what makes **purple/magenta sunsets and blue-hour**. The whole palette is driven by ONE control — **sun elevation angle**: high angle = short optical path = blue; 2–15° = long path = warm orange/red; -5° to -15° (below horizon) = indirect scatter = blue-hour purples. The horizon→zenith band is a `smoothstep(skyDir.y)`, output ACES-tonemapped. A 250×64 transmittance LUT replaces the nested light-march for real-time. ([Maxime Heckel — On Rendering the Sky, Sunsets, and Planets](https://blog.maximeheckel.com/posts/on-rendering-the-sky-sunsets-and-planets/), accessed 2026-06-06; [Scratchapixel — Simulating the Colors of the Sky](https://www.scratchapixel.com/lessons/procedural-generation-virtual-worlds/simulating-sky/simulating-colors-of-the-sky.html), accessed 2026-06-06; [wwwtyro/glsl-atmosphere](https://github.com/wwwtyro/glsl-atmosphere), accessed 2026-06-06.)

**The mapping to aurora**: you don't need a full hemisphere raymarch for a flat backdrop. You need the *color logic* — a `sunElevation` + `turbidity`/`mieG` + `ozone` parameter triple that **derives a vertical golden-hour/blue-hour/alpenglow gradient palette** procedurally. This becomes a second `deriveAurora`-class seeder: instead of one seed color, one sun-angle yields the whole congruent sky ramp.

### 2. Golden/blue-hour/alpenglow have known palette signatures
Golden hour = warm yellows→oranges→reds, low contrast, soft shadows (atmosphere filters blue when sun is low). Blue hour = deep blue, no sharp shadows, serene/cool. Alpenglow = a reddish band cast on high surfaces (5k–25k ft clouds as canvas) needing *partial* cloud gaps for contrast/variation. These map cleanly onto OKLCh ramps: golden hour is a high-L, mid-C ramp walking h≈40→70; blue hour is mid-L, mid-C around h≈250→280; alpenglow is a localized warm (h≈20) wash over a cool base. ([PhotoPills — Mastering Golden Hour, Blue Hour](https://www.photopills.com/articles/mastering-golden-hour-blue-hour-magic-hours-and-twilights), accessed 2026-06-06; [Wikipedia — Golden hour (photography)](https://en.wikipedia.org/wiki/Golden_hour_(photography)), accessed 2026-06-06; [NPT — Sunset, Alpenglow & Blue Hour at Glacier](https://www.nationalparkstraveler.org/2024/11/photography-national-parks-sunset-alpenglow-and-blue-hour-glacier-national-park), accessed 2026-06-06.)

### 3. Cosine palettes — atoms-of-control colorization
Quilez's `color(t) = a + b·cos(2π(c·t + d))` (4 RGB vectors) generates an entire infinitely-smooth gradient from 12 numbers, no LUT, no banding. `a`=bias/brightness, `b`=contrast/amplitude, `c`=frequency, `d`=per-channel phase. This is the most compact "atoms of control" gradient primitive in existence and is the natural backbone for a *generative* palette mode (vs hand-authored stops). ([Iñigo Quilez — Palettes](https://iquilezles.org/articles/palettes/), accessed 2026-06-06.)

### 4. OKLab for interpolation, OKLCh for authoring
The smoothness rule: author in OKLCh (independent L/C/h knobs), but **interpolate the gradient in OKLab (straight Cartesian line)**, not OKLCh (cylindrical arc) — OKLCh hue interpolation between far-apart hues takes "unexpected detours way outside perceptible colors." Aurora already bakes to linear sRGB so mix happens in linear, which is safe; but the *palette ramp construction* in `deriveAurora`/`samplePalette` should mix in OKLab when stops are far apart in hue, to kill the grey dead-zone. ([Toolbox365 — Why CSS gradients look grayish: OKLCH](https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/), accessed 2026-06-06; [MDN — oklab()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklab), accessed 2026-06-06.)

### 5. Flowing-gradient craft: stacked simplex octaves + grain dither
The Stripe/Linear/OpenAI "ethereal glow" is stacked simplex octaves at *irregular* wavelength ratios (÷1.00, 1.30, 1.86, 3.25) with per-octave speed (some negative) so the motion never reads as a single drift, color sampled through a 1D gradient texture by a `lightness` coordinate, soft `smoothstep` wave-blur. Critically, the premium look needs a **grain/noise overlay to defeat 8-bit banding** — the single biggest "looks AI-generic vs looks intentional" differentiator. Aurora has `paperGrain` (`DESIGN.md:62`) but it's a flat hash; a blue-noise / ordered-dither grain is the upgrade. ([Alex Harri — A flowing WebGL gradient, deconstructed](https://alexharri.com/blog/webgl-gradients), accessed 2026-06-06; [Kevin Hufnagl — Stripe gradient teardown](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/), accessed 2026-06-06.)

### 6. Anisotropic Kuwahara + structure tensor = the real painterly engine
The SOTA painterly look is the **anisotropic Kuwahara filter** driven by a **structure tensor**: compute the tensor via Sobel, smooth with Gaussian, take the eigenvector of the smallest eigenvalue → the **Edge Tangent Flow (ETF)** orientation field. Stretch elliptical Kuwahara kernels along that flow; multi-scale kernels = brushes of different sizes guided by a saliency map. Papari extension = circular kernel, 8 sectors, Gaussian sector weighting (`eta≈0.1`, `lambda≈0.5`). This is what gives "brush follows the form" instead of a grid of strokes. Aurora's strokes follow a *procedural pattern* flow, not an *image-derived* ETF — adopting ETF over the composition field is the leap from "stylized" to "painterly." ([Maxime Heckel — On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/), accessed 2026-06-06; [ResearchGate — Oil Painting Style Rendering Based on Kuwahara Filter](https://www.researchgate.net/publication/334689545_Oil_Painting_Style_Rendering_Based_on_Kuwahara_Filter), accessed 2026-06-06; [3dstereophoto — NPR: Edge Tangent Flow](http://3dstereophoto.blogspot.com/2018/05/non-photorealistic-rendering-edge.html), accessed 2026-06-06.)

### 7. Real impasto = height field → normal → GGX specular
The difference between aurora's faked rim-light and *actual* impasto: accumulate a per-stroke **height field** (front-to-back splat of modulated stroke heights, bristle ridges perturbing height), derive surface normals from the height gradient, light with a **GGX microfacet specular** under a movable key light. "Paint thickness / roughness / specularity" become the three knobs. This is what makes oil read as physically thick paint catching a raking light. ([modding-forum — Diffuse, Specular & Normal Maps](https://www.modding-forum.com/guide/17-diffuse-specular-and-normal-maps/), accessed 2026-06-06; [shader-tutorial.dev — Normal Mapping](https://shader-tutorial.dev/intermediates/normal-mapping/), accessed 2026-06-06; the impasto/GGX height-field formulation summarized from the painterly-rendering literature search, accessed 2026-06-06.)

### 8. Van Gogh specifically = turbulent flow field, not generic oil
Van Gogh's *Starry Night* strokes follow a measurable turbulent flow — the luminance power spectrum matches Kolmogorov turbulence (eddies at multiple scales, an energy cascade). Animating it in NPR uses a **region map + per-region vector field** that strokes flow along. So a *true* van-gogh variant is: (a) a curl-noise / turbulence flow field with multi-scale eddies (not the current smooth swirl), (b) strokes ride that field, (c) dense, short, directional, value-driven strokes with broken color. It's an architecture, not a preset. ([AIP/Physics of Fluids — Hidden turbulence in van Gogh's The Starry Night](https://pubs.aip.org/aip/pof/article/36/9/095140/3312767/Hidden-turbulence-in-van-Gogh-s-The-Starry-Night), accessed 2026-06-06; [arXiv 2310.03415 — Hidden Turbulence in van Gogh's Starry Night](https://arxiv.org/pdf/2310.03415), accessed 2026-06-06; [ResearchGate — Animating Van Gogh's Starry Night (region map + vector fields)](https://www.researchgate.net/figure/Animating-Van-Goghs-Starry-Night-a-Region-map-and-vector-fields-b-A-frame-in-the_fig11_5658288), accessed 2026-06-06.)

### 9. WebGPU/TSL — the modern path with a free WebGL fallback
WebGPU is stable in 2026 evergreen browsers. The win for aurora is **compute shaders + storage buffers**: precompute the structure-tensor/ETF field, or a stroke-particle buffer, once per frame instead of per-pixel re-derivation; persist a height-field accumulation buffer across frames. TSL (Three.js Shading Language) authors once and transpiles to both WGSL and GLSL — `WebGPURenderer` falls back to WebGL automatically (`forceWebGL:true` to test). This means a WebGPU upgrade need not fork the codebase or drop the WebGL2 path. ([Maxime Heckel — Field Guide to TSL and WebGPU](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/), accessed 2026-06-06; [WebGPU Fundamentals — Compute Shader Basics](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html), accessed 2026-06-06; [W3C — WGSL spec](https://www.w3.org/TR/WGSL/), accessed 2026-06-06.)

---

## ADOPT for glass-ui aurora — wave-seed list (AW tranche)

Each is a concrete, self-contained wave/fold. Ordered roughly by leverage-per-effort. They respect the existing invariants (single shader, token-first, presets-in-consumers, OKLCh core).

- **AW.W1 — Skyscape palette seeder (`deriveSky`).** New seeder peer to `deriveAurora`: input `{sunElevation, turbidity, ozone, mieG}` → output a congruent N-stop OKLCh sky ramp via the Rayleigh/Mie/ozone *color logic* (not a full raymarch). One angle sweeps golden-hour→blue-hour→alpenglow. Pure JS in `color.ts`, gamut-mapped through value.js. Pairs with finding 1+2. *No shader change — it's a palette producer.*

- **AW.W2 — Cosine-palette generative mode.** Add `palette: {mode:"stops"} | {mode:"cosine", a,b,c,d}` to `AuroraConfig`. The 12-number Quilez form gives infinite banding-free ramps from atoms-of-control, ideal for the "simplified options" goal. `samplePalette` branches on mode (one cheap `cos`). Finding 3.

- **AW.W3 — OKLab ramp interpolation.** Fix the grey-dead-zone: when adjacent palette stops are far in hue, build the LUT / `samplePalette` mix in OKLab not raw linear-lerp-of-endpoints. Kills the muddy mid-tone on warm↔cool ramps (Sky/Dawn presets). Finding 4. *Small, high-fidelity-per-line.*

- **AW.W4 — Vertical atmosphere gradient axis.** Add an optional zenith→horizon vertical luminance/hue band derived from finding 1 (the `smoothstep(skyDir.y)` horizon term) composited under the nuclei field, so skyscape presets read as *sky* (light low, deep high) not flat mottle. Token-driven `--aurora-horizon`. Finding 1.

- **AW.W5 — Blue-noise grain dither.** Replace the flat-hash `paperGrain` with a blue-noise / ordered-dither overlay scaled to ~1 LSB, defeating 8-bit banding. This is the single biggest "premium vs generic" lever and applies to every preset. Finding 5.

- **AW.W6 — Structure-tensor / ETF stroke orientation.** The painterly leap: derive an Edge-Tangent-Flow field from the *composition field's* gradient (Sobel→structure tensor→min-eigenvector, Gaussian-smoothed) and feed it as the stroke direction in `bestOil` instead of the procedural `flowField`. Strokes follow the color form. Add as a new `flow.source: "pattern" | "etf"`. Finding 6. *Largest payoff for "genuinely painterly."*

- **AW.W7 — Anisotropic-Kuwahara smooth/pastel medium.** Add a Kuwahara-based `medium` (Papari circular 8-sector, ETF-stretched elliptical kernel) for the atmospheric/oil-pastel pole — gives the wet-on-wet, edge-preserving, painterly *blur* the references demand without visible strokes. `eta=0.1, lambda=0.5`. Finding 6.

- **AW.W8 — True impasto: height-field + GGX.** Upgrade oil from faked rim-light to a real height-field accumulation → normal → GGX specular under a movable key light. New uniforms `uPaintThickness, uRoughness, uLightDir`. Makes oil read as thick paint catching raking light. Finding 7. *Pairs naturally with AW.W6.*

- **AW.W9 — Van Gogh turbulence variant (proper atomic brushstrokes).** A distinct stroke architecture, not a preset: curl-noise/multi-scale-eddy turbulence flow field (Kolmogorov-style energy cascade), dense short directional strokes riding it, value-driven length, broken color. Composes AW.W6 (ETF) + AW.W8 (impasto) + a turbulence `flow.source:"turbulent"`. No subject matter — pure stroke-field congruent to real van Gogh. Finding 8.

- **AW.W10 — WebGPU/TSL render path with WebGL2 fallback.** Add `webgpu` to `AuroraRenderMode`; port the pipeline to TSL so it transpiles to WGSL+GLSL from one source, `WebGPURenderer` auto-falls-back to the existing WebGL2 path. Use a compute pass to precompute the ETF field (AW.W6) and persist the height-field buffer (AW.W8) across frames instead of per-pixel re-derivation. Finding 9. *Enabler for W6–W9 at full fidelity; do last.*

- **AW.W11 — Simplified "one-knob" preset surface.** Leveraging W1+W2: expose a tiny consumer API — pick a `mood` (`golden-hour|blue-hour|alpenglow|meadow|...`) or a single seed color/sun-angle, and derive the full congruent config. Satisfies the "atoms of control / simplified options" goal while the full `AuroraConfig` stays for power users. Findings 1–4.

**Sequencing note:** W1–W5 are JS/palette + cheap-shader, independently shippable, immediate visual lift. W6–W9 are the painterly-engine core and stack (ETF → Kuwahara → impasto → van-gogh). W10 (WebGPU/TSL) is the substrate that makes W6–W9 cheap enough to run live; it can land before or after W6–W9 but unlocks their full-resolution form.

---

### Lane 6

I now have a complete picture of the existing architecture and the SOTA landscape. Let me synthesize the brief.

Here is the research brief.

---

# Aurora oil-pastel / NPR — SOTA research brief (Lane: oil-pastel-npr)

## 0. Where the aurora is today (baseline, so the seeds don't re-invent)

The aurora is already a sophisticated single-pass procedural painter, not a plain mesh gradient. Confirmed in source:

- **Color field**: softmax-Gaussian "nuclei" with per-nucleus elongation/angle → palette LUT, baked CPU-side to linear sRGB. `src/components/custom/aurora/constants/shaders/composition.glsl.ts:8`, `:20`.
- **Organic boundaries**: Quilez double domain-warp (fbm/cellular/hybrid) + cursor swirl. `aurora.frag.ts:206`.
- **Flow field**: radial/swirl/diagonal/multi + curl-noise + cursor swirl, returns a unit direction. `flow.glsl.ts:6`.
- **Brush primitive**: curved swept-stroke SDF with quadratic-bulge spine, bristle-ragged edges, rounded caps, internal streaks, impasto rim/shadow, best-of-9-neighbor cell placement. `brush.glsl.ts:72`, `:188`.
- **Mediums (4 peers)**: watercolor (wet-edge + granulation), pastel (anisotropic fbm tooth), crayon (wax-on-tooth), oil (4 stroke layers + optional crosshatch + linen tooth). `mediums.glsl.ts`.
- **Color science**: full Ottosson OKLab/OKLCh matrices + sRGB OETF already exist in the shared chunk, but aurora does **not** splice the OKLCh matrices — it bakes the palette in linear CPU-side and mixes in linear RGB. `procedural-color.glsl.ts:73`, noted at `aurora.frag.ts:27`.
- **Output**: ACES tonemap, film grain, OETF, IGN dither, premultiplied alpha. `aurora.frag.ts:330`.

The gaps the SOTA fills: (1) the painterly look is **forward-only** — strokes are placed and composited, never *flow-guided from the image's own structure* (no structure tensor); (2) color mixing is **linear RGB**, so overlapping pigments grey-out instead of producing painterly secondaries; (3) there is **no relit impasto** — impasto is a fixed rim/shadow, not a height-field lit by a movable light; (4) the "oil-pastel" feel is approximated by tooth-noise multiply, not a deposition/tooth-occlusion model; (5) no WebGPU path; (6) stroke direction is noise-jittered flow, not a per-pixel coherent tensor field — the thing that makes Van Gogh read as Van Gogh.

---

## 1. Findings (with citations)

### A. Anisotropic Kuwahara filtering — the canonical "make a gradient read as oil paint" operator
The generalized/anisotropic Kuwahara filter is the single most-cited real-time oil-painting operator. It abstracts an image into flat, directional, edge-preserving regions that look hand-painted, and runs in real-time on the GPU.
- Base Kuwahara: split a kernel into 4 sectors, output the mean of the **minimum-variance** sector → smooths interiors, preserves edges. Papari extension uses 8 circular sectors with Gaussian weighting to kill boxiness. Maxime Heckel, "On Crafting Painterly Shaders," documents the full progression (4-sector → 8-sector circular → Gaussian weights → polynomial weights → structure-tensor anisotropy). https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ (accessed 2026-06-06).
- Anisotropic version (Kyprianidis & Kang & Döllner, PG 2009): orientation + anisotropy come from the **eigenvalues/eigenvectors of the smoothed structure tensor**; the circular kernel is squeezed and rotated into an ellipse aligned to local structure → "directional information as found in oil paintings." https://www.kyprianidis.com/p/pg2009/index.html (accessed 2026-06-06).
- Polynomial weighting functions (Kyprianidis & Semmo) replace the per-sector Gaussian convolution with a closed-form polynomial `[(x+ζ) − ηy²]²` so the whole thing runs in one pass with no convolution, "in real-time, similar quality." https://diglib.eg.org/bitstreams/3309663a-3134-44bc-9297-2fa33554277d/download (accessed 2026-06-06).
- LYGIA ships a ready GLSL `kuwahara()` (Kyprianidis-derived); it warns it's "extremely computationally expensive" at full anisotropy. https://lygia.xyz/filter/kuwahara (accessed 2026-06-06).

Implementation knobs that matter: sector count (8), anisotropy `α = (λ₁−λ₂)/(λ₁+λ₂)`, ellipse eccentricity from α, sharpness exponent `q` on the per-sector variance weight, and a coherence threshold to avoid flicker in flat noise.

### B. Structure tensor → flow field (the directional substrate for everything)
Both the Kuwahara filter and stroke orientation want the **same** input: a smoothed structure-tensor field. Compute derivatives (Sobel or derivative-of-Gaussian), form `J = [[Ix·Ix, Ix·Iy],[Ix·Iy, Iy·Iy]]`, Gaussian-smooth the three channels, then the minor eigenvector's argument is the local "grain" direction and `α=(λ₁−λ₂)/(λ₁+λ₂)` is coherence. The minor eigenvector points *along* edges/features, which is exactly the brushstroke direction.
- Kyprianidis PG2009 (above) and the tractography paper both derive orientation this way; the tractography paper notes the tensor is "smoother… more robust to noise" than the raw gradient and uses coherence to gate stroke width/length and termination. "Applying Medical Imaging Tractography Techniques to Painterly Rendering," arXiv 2511.00702 — strokes seeded per grid cell, traced by RK2(3) along the tensor field, simplified (Ramer–Douglas–Peucker) into Bézier curves, terminated when coherence < 0.5. https://arxiv.org/html/2511.00702v1 (accessed 2026-06-06).

For the aurora this is special: the "image" is procedural, so the tensor can be computed *analytically/cheaply* from the same nuclei+warp field that already exists — the flow then follows the color zones for free (Van Gogh's strokes follow the forms).

### C. Pigment-realistic color mixing (Kubelka–Munk) — the "not-grey" headline
RGB `mix()` is why overlapping painterly strokes muddy out. Kubelka–Munk spectral mixing makes blue+yellow→green, with hue-arc and saturation that read as real paint.
- **spectral.js / spectral.glsl** — MIT, **pure-math, no LUT**, 38 spectral bands (380–750nm), `spectral_mix(colA, tintA, wA, colB, tintB, wB, …)` mixing 2–4 colors in-shader. This is the directly-adoptable one. https://github.com/rvanwijnen/spectral.js/blob/3.0.0/README.md (accessed 2026-06-06); CSS-Tricks writeup https://www.cssscript.com/realistic-color-mixing-spectral/ (accessed 2026-06-06).
- **Mixbox** (Sochorová & Jamriška, SIGGRAPH 2021) — higher fidelity via a latent-pigment space, but needs a **LUT texture** and is **CC BY-NC** (commercial requires a license). https://github.com/scrtwpns/mixbox (accessed 2026-06-06). Recommendation: spectral.js for licensing/zero-asset reasons; Mixbox only if a paid license is acceptable.

### D. Impasto as a relit height field (the "stunning 3D paint" axis)
Real impasto reads because paint has *thickness* that catches a raking light. SOTA builds a per-pixel **height field** (canvas substrate + accumulated stroke height with bristle ridges), derives a normal from its gradient, and does specular relighting. Crucially: thin strokes inherit canvas roughness, thick impasto overrides it.
- "Differentiable Stroke Planning with Dual Parameterization," arXiv 2604.02752 — "a height-field representation… models both the canvas substrate and the impasto accumulation… per-pixel height contribution is procedurally perturbed to emulate bristle-induced ridges… thickness-aware modulation couples paint and canvas geometry." https://arxiv.org/pdf/2604.02752 (accessed 2026-06-06).
- Normal-from-height + specular is standard (LearnOpenGL Normal Mapping). The aurora already has the stroke coverage to drive height; it just needs `normal = normalize(vec3(-dH/dx, -dH/dy, 1))` and a Blinn-Phong specular lobe from a `uLightDir`. https://learnopengl.com/Advanced-Lighting/Normal-Mapping (accessed 2026-06-06).

### E. Oil-pastel material truth (what the medium *physically* is — to model it, not fake it)
Oil pastel = pigment + oil + wax. Creamy, velvety under moderate pressure, **slick/glossy when burnished or layered heavily, matte when scumbled into tooth**, strokes and the paper tooth stay visible, smudge-blendable (finger/stump). Layers physically mix rather than chemically bind. This is materially distinct from soft pastel (chalky, dusty) and from oil (no impasto ridges, but a waxy sheen).
- Artchive, "Oil Pastels: History, Techniques," https://www.artchive.com/art-mediums/oil-pastels/ (accessed 2026-06-06); Fine Art Tutorials, "Oil Pastel Techniques: The Ultimate Guide," https://finearttutorials.com/guide/oil-pastel-techniques/ (accessed 2026-06-06).
- Modeling implications: (1) a **waxy specular film** (low-roughness, broad lobe) that *grows with layer count* (burnish), distinct from oil's sharp impasto glint; (2) **tooth occlusion** — pigment deposits on tooth peaks, skips valleys, so light pressure shows paper, heavy pressure fills it; (3) **scumbling** — a broken upper layer letting the lower color show through (a coverage<1 second pass), which is the signature oil-pastel move the current crayon medium half-does.

### F. Van Gogh specifically (atomic brushstrokes, depth, no subject matter)
Van Gogh = many discrete, directional, impasto strokes, each a single loaded color, following the form's flow. The SOTA approach is surface-particle / cell-seeded stroke placement oriented by a flow/tensor field, with per-stroke broken color and impasto height.
- Sharma, "A Van Gogh Inspired 3D Shader Methodology" (TAMU thesis) — patchy directional strokes, each with specific color + direction, procedurally generated rather than hand-painted; impasto via surface particles. https://core.ac.uk/download/pdf/147237812.pdf (accessed 2026-06-06).
- The aurora's `bestOil` already does cell-seeded strokes; what's missing for true Van Gogh is (1) tensor-coherent direction (D/B above) instead of noise-jittered flow, (2) per-stroke pigment color via spectral mix, (3) relit impasto height, (4) a *longer, curvier, denser* swept-stroke regime ("brushwork" mode pushed further).

### G. Mesh-gradient SOTA (what we're bettering — Stripe/OpenAI)
The Stripe/OpenAI look is, technically, *much simpler* than the aurora already is: stacked simplex-noise layers at desynchronized scales, domain-warp via `coord + time*flow`, gradient-texture color lookup, exponent-biased blur for occasional sharp edges. No tensor, no pigment, no impasto.
- Alex Harri, "A flowing WebGL gradient, deconstructed," https://alexharri.com/blog/webgl-gradients (accessed 2026-06-06).
- "Moving Mesh Gradient… Stripe Mesh Gradient WebGL," https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2 (accessed 2026-06-06).
- Takeaway: the aurora *already exceeds* this on structure; to feel *more premium* than Stripe the wins are (1) painterly blend modes / pigment mixing instead of linear mix, (2) a "smooth/clean" preset that competes head-on (simpler atoms, see §H), (3) the relit-impasto and Kuwahara modes that no mesh-gradient product ships.

### H. WebGPU / modern path
WebGPU is now broadly shipping (Safari/iOS included) and unlocks **compute** — the natural home for true stroke-based rendering (instanced strokes, ping-pong height accumulation, multi-pass tensor) that a single WebGL fragment shader fakes.
- Maxime Heckel, "Field Guide to TSL and WebGPU," https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/ (accessed 2026-06-06); WebGPU Fundamentals compute basics https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html (accessed 2026-06-06); "WebGPU in 2025" https://dev.to/amaresh_adak/webgpu-in-2025-the-complete-developers-guide-3foh (accessed 2026-06-06).
- The substrate (`useWebGLCanvas`) is WebGL2-only today; a WGSL aurora would be a multi-pass pipeline (tensor pass → Kuwahara/flow pass → stroke/height pass → relight pass), the canonical compute story.

---

## 2. ADOPT for glass-ui aurora — wave-seed list (each a concrete AW wave/fold)

Ordered roughly by impact/effort. Each is scoped to fold into the existing partial-splice architecture (`aurora.frag.ts` assembler).

- **AW.W?-α — Structure-tensor flow substrate.** Add `structureTensor(p,t)` computed analytically from the same `sampleBase`/nuclei field (cheap: 4 `sampleBase` taps for Sobel, or analytic gradient of the softmax field), Gaussian-smoothed in screen space; expose `minorEigenvector` (direction) + `coherence` `α=(λ₁−λ₂)/(λ₁+λ₂)`. Feed this into `flowField` (new `uFlowPattern == "tensor"`) so strokes follow the color zones. This is the keystone the next three seeds consume. New partial `tensor.glsl.ts`.

- **AW.W?-β — Anisotropic Kuwahara medium (new peer `uMedium`).** 8-sector polynomial-weighted Kuwahara, ellipse rotated/squeezed by the W?-α tensor, sharpness `q` and radius as uniforms. This is the single biggest "gradient → genuine oil painting" win and competes with nothing in the mesh-gradient market. Add `kuwahara.glsl.ts`; dispatch as a peer alongside oil/pastel/crayon at `aurora.frag.ts:321`. Guard cost: cap sector samples, gate on `uStrokeAmount`, and ship a perf preset (it's the expensive medium — flag in budget.ts).

- **AW.W?-γ — Spectral (Kubelka–Munk) pigment mixing.** Vendor `spectral.glsl` (MIT) as a new shared chunk sibling to `procedural-color.glsl.ts`; route `paintOver` stroke compositing (`brush.glsl.ts:182`) and the palette `mix` (`composition.glsl.ts:16`) through `spectral_mix` behind a `uPigmentMix` toggle. Overlapping Van-Gogh strokes then produce real secondaries instead of grey. KISS escape hatch: keep linear `mix` as the default for the "smooth/clean" preset.

- **AW.W?-δ — Relit impasto height field.** Accumulate a per-pixel `height` alongside `result` in `mediumOil` (each `paintOver` adds bristle-ridge height ∝ coverage·impasto), derive `normal = normalize(vec3(dHdx, dHdy, k))` via `fwidth`/dual-sampling, add a Blinn-Phong specular lobe from a new `uLightDir`/`uLightColor`. Makes impasto catch a *movable* raking light (interactive-pointer-as-light is a natural fold). Extends the existing fixed rim/shadow at `brush.glsl.ts:174`.

- **AW.W?-ε — True oil-pastel medium (replace the tooth-multiply approximation).** New/overhauled medium modeling the §E material: tooth-occlusion deposition (`pigment = base · toothMask(pressure)`), a **scumble** broken-upper-layer pass (coverage<1 letting lower color through), and a **wax specular film** whose roughness drops + sheen grows with layer count (burnish), distinct from oil's sharp glint. This is the literal "oil-pastel mode genuinely oil-pastel-redolent" ask. Reworks `mediumCrayon`/`mediumPastel` in `mediums.glsl.ts`.

- **AW.W?-ζ — Van Gogh stroke regime.** A new `uStrokeMode` ("vangogh") that combines W?-α tensor direction + W?-γ per-stroke pigment + W?-δ height + longer/curvier swept strokes (push `lenMul`, `bulge`, density in `bestOil`/`mediumOil`). Atomic, directional, congruent-to-real-VanGogh strokes with no subject matter — exactly the brief. All in `mediums.glsl.ts`/`brush.glsl.ts`, no new partial.

- **AW.W?-η — Aurora consumes in-shader OKLCh + a derive-color variant.** Aurora currently bakes the palette in linear CPU-side and never splices `OKLCH_MATRICES_GLSL` (`aurora.frag.ts:27`). Splice it so value-variance, broken-color, and palette drift happen in **OKLCh** (perceptually uniform L/C/H) instead of the current RGB `hueShift`/luma tricks (`aurora.frag.ts:257`). Add a **derive-color** mode: from one seed OKLCh, generate the whole palette via hue-rotation/analogous/complementary arcs + L/C ramps (the "atoms of control" + simplified-options ask) — one color in, a coherent painterly palette out.

- **AW.W?-θ — "Atoms of control" config simplification + a clean/premium preset.** Collapse the current wide config surface to a small atom set (zones=nuclei, noise=warp, color=palette/derive, medium, flow) with smart derived defaults; ship a flagship "smooth" preset that beats Stripe/OpenAI head-on (desynced multi-octave warp + pigment mix + subtle grain, no strokes). This is the "simplified options / bettering mesh gradients" ask; touches `presets.ts`/config schema, no shader risk.

- **AW.W?-ι — Interactive/dynamic folds.** Pointer-as-light (drives W?-δ `uLightDir`), pointer-as-tensor-seed (already half-present via cursor swirl in `flow.glsl.ts:35`), and scroll/velocity-driven stroke density. Cheap, high-delight, rides existing cursor uniforms.

- **AW.W?-κ (stretch) — WebGPU/WGSL multi-pass pipeline.** Port aurora to a WGSL compute pipeline on a WebGPU substrate: pass 1 tensor, pass 2 Kuwahara/flow, pass 3 instanced stroke + height accumulation (ping-pong), pass 4 relight. This is where true stroke-based rendering (not single-pass faking) lives, and the modern-WebGPU ask. Large; gate behind capability detection with the WebGL2 path as fallback. New `webgpu/aurora.wgsl` mirroring `glassShader.wgsl`.

---

## 3. Recommended adoption order / dependency notes
- **W?-α (tensor) is the keystone** — β (Kuwahara), ζ (Van Gogh) and the best version of δ all consume it. Land it first.
- **γ (spectral) and δ (impasto) are independent** and each individually transformative; γ is lower-risk (vendored MIT chunk + a toggle).
- **η/θ (OKLCh + derive-color + atoms)** are mostly CPU/config and de-risk the "stunning + simple" UX ask without shader peril — good parallel track.
- **Licensing watch:** use **spectral.js (MIT)**, not Mixbox (CC-BY-NC), for the in-shader pigment chunk. The Kuwahara math (Kyprianidis papers) is technique, not licensed code; reimplement rather than copy LYGIA verbatim to keep the house OETF/OKLCh single-source intact.
- **Perf watch:** the anisotropic Kuwahara is the expensive one (LYGIA flags it). Gate it as its own medium, cap sample counts, and add a budget.ts entry; it must respect the existing reduced-motion freeze and offscreen-pause substrate.

---

### Lane 7

The Washington Post and ZME summaries already gave the load-bearing facts (14 swirls, Kolmogorov −5/3 at large scales, Batchelor at small scales, luminance-as-energy). That's sufficient for the brief. I have everything needed. Let me compose the final brief.

I now have a complete research corpus and full grounding in the existing aurora codebase. Here is the brief.

---

# Aurora "vangogh-brushstrokes" — SOTA research + AW wave-seeds

## TL;DR

The glass-ui aurora is **already a stroke-based painterly engine**, not a mesh gradient. `brush.glsl.ts` ships curved-spine SDF strokes with bristle-ragged edges, impasto rim/shadow, end-cap blobs, best-of-9 placement, and `brokenColorJitter`; `mediums.glsl.ts` has oil/pastel/crayon/watercolor; `flow.glsl.ts` drives stroke direction; `composition.glsl.ts` has a softmax-nuclei color field; OKLCh matrices already exist in `procedural-color.glsl.ts` but **aurora doesn't splice them yet** (palette baked CPU-side). So a Van Gogh variant is a *targeted extension*, not a rewrite. The research below pinpoints the five things genuinely missing for Van-Gogh-redolent brushwork and the gradient-art ambition.

The single most important research finding: Van Gogh's authentic look is not "swirls" decoratively — it is a **turbulent energy cascade** where stroke *size* correlates with luminance/energy across scales (Kolmogorov −5/3 at large scales, Batchelor scaling at the small). The aurora's 4-layer big→fill stroke stack is already the right *shape* for this; it needs to be made **flow-coherent and energy-graded** rather than independent layers.

---

## Findings (with citations)

### 1. Procedural Van Gogh brushstroke methodology (the closest prior art)

Sharma's TAMU thesis is the canonical procedural-Van-Gogh reference: brushstrokes generated procedurally (not hand-painted) by sampling **random positions in texture space**, reading **color from a color map and direction from a flow map** at each position, drawing each stroke with assigned color + direction, with user controls for **brushstroke profile, size, color, direction**. Impasto via a **height-field** modeling both canvas substrate and paint accumulation, **per-pixel height procedurally perturbed for bristle ridges/grooves**, canvas micro-geometry from **composite noise**, normals from **height-field spatial gradients**, lit Blinn-Phong. — TAMU thesis (Sharma, 2013), via [oaktrust.library.tamu.edu/handle/1969.1/151313](http://oaktrust.library.tamu.edu/handle/1969.1/151313) and [core.ac.uk/download/pdf/147237812.pdf](https://core.ac.uk/download/pdf/147237812.pdf). Accessed 2026-06-06.

**Gap vs glass-ui:** the aurora's impasto is a *2D rim/shadow fake* (`brush.glsl.ts` `paintOver` adds `+0.18` rim on one side, `−0.25` shadow on the other). It has **no real height field and no light-direction-coupled normal lighting**. This is the single biggest fidelity lever (see Seed AW-1).

### 2. Van Gogh = turbulence, quantitatively

Researchers analyzed Starry Night's brushstroke luminance as an energy field: **the 14 main swirls follow Kolmogorov's −5/3 cascade at large scales; the smallest strokes follow Batchelor scaling** (luminance diffusing as a passive scalar). Stroke *size, relative spacing, and intensity* track turbulent-flow statistics — both scaling regimes coexist. — [Hidden turbulence in van Gogh's The Starry Night, Physics of Fluids 36, 095140 (2024)](https://pubs.aip.org/aip/pof/article/36/9/095140/3312767), arXiv preprint [arxiv.org/pdf/2310.03415](https://arxiv.org/pdf/2310.03415); plain-language: [Washington Post 2024](https://www.washingtonpost.com/science/interactive/2024/starry-night-vincent-van-gogh-painting-turbulence-physics-explained/), [ZME Science](https://www.zmescience.com/science/news-science/van-goghs-starry-night-atmospheric-physics/). Accessed 2026-06-06.

**Takeaway for the variant:** a Van Gogh preset should (a) drive strokes along a **swirl/curl flow field** (the aurora has `uFlowPattern==2` swirl + curl-noise already), and (b) **grade stroke length/density by local luminance** — big strokes where the field is bright/energetic, fine strokes in the dark passages. That energy-grading is the missing congruence (Seed AW-2).

### 3. Flow field / stroke orientation — Edge Tangent Flow & structure tensor

SOTA stroke orientation is **not random** — it follows the image's own structure. **Edge Tangent Flow (ETF)** is a smoothed gradient-perpendicular direction field that guides strokes along feature tangents; computed by iteratively smoothing the gradient weighted by magnitude. The **structure tensor** (`J=[[Jxx,Jxy],[Jxy,Jyy]]` from Sobel `Sx,Sy`) gives local orientation via its dominant **eigenvector**, and **anisotropy from the eigenvalue ratio** `(λ1−λ2)/(λ1+λ2)`. — Kang et al. "Coherent Line Drawing" [cg.postech.ac.kr/papers/kang_npar07_hi.pdf](https://cg.postech.ac.kr/papers/kang_npar07_hi.pdf); Kyprianidis & Kang "Image and Video Abstraction by Anisotropic Kuwahara Filtering," CGF 2009 [kyprianidis.com/p/pg2009](https://www.kyprianidis.com/p/pg2009/index.html); ETF Shadertoy [shadertoy.com/view/tdBXR1](https://www.shadertoy.com/view/tdBXR1). Accessed 2026-06-06.

**Gap vs glass-ui:** aurora's flow field is **parametric** (radial/swirl/diagonal/multi + curl) and ignores the color field it paints over. Strokes don't *align to the gradient of the nuclei field itself*. A structure-tensor pass over `sampleBase` would make strokes hug the color territories like real brushwork hugs forms (Seed AW-3). The aurora already does finite-difference luma gradients in `mediumWatercolor` — the machinery is half there.

### 4. Domain warping / flow advection (the gradient-art engine)

The canonical recipe for "better than Stripe/OpenAI mesh gradients" is **iterated domain warping** `fbm(p + fbm(p + fbm(p)))` plus **flow-field Euler advection**: compute the FBM gradient field by finite differences, then iteratively advect coordinates along it to simulate **gas-giant banded vortices**. Lacunarity **2.01–2.04 not exactly 2.0**; inter-octave rotation `mat2(0.8,0.6,−0.6,0.8)`; ridged variant `abs(noise−0.5)`. Lowest octave gets direct time injection (slow large flow), highest gets sinusoidal time (subtle detail). — [MiniMax-AI/skills domain-warping.md](https://github.com/MiniMax-AI/skills/blob/main/skills/shader-dev/techniques/domain-warping.md); Inigo Quilez [fBM](https://iquilezles.org/articles/fbm/) + [warp](https://iquilezles.org/articles/warp/). Accessed 2026-06-06.

**Gap vs glass-ui:** aurora does a **single double-warp** (`domainWarp` = Quilez 2-level). It does **not** iterate Euler-advection along the warp gradient. Adding a few advection steps is what gives the *liquid van-Gogh-sky banding* that flat domain warp can't (Seed AW-4). Stripe's whole effect is ~10kb/800 lines of exactly this class of noise+warp ([Medium/Caden Chen](https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2), [bram.us](https://www.bram.us/2021/10/13/how-to-create-the-stripe-website-gradient-effect/)) — the aurora is already richer; the advection step is the differentiator.

### 5. Anisotropic Kuwahara (the painterly-flatten finish)

The anisotropic Kuwahara filter adapts kernel shape/scale/orientation to the **smoothed structure tensor**, flattening *along* feature directions while keeping edges sharp — "the clearness of cartoon but the directional information of oil paintings," real-time on GPU, temporally coherent. Sectors weighted by polynomial-approx-Gaussian; `σ ≈ radius/3`. — [Kyprianidis & Kang CGF 2009](https://www.kyprianidis.com/p/pg2009/index.html); [Maxime Heckel, "On Crafting Painterly Shaders"](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) (concrete GLSL multi-pass: structure-tensor → anisotropic-Kuwahara → tonemap); Acerola's Kuwahara videos. Accessed 2026-06-06.

**Use for glass-ui:** a *light* anisotropic-Kuwahara post-pass would give the "abstract gradient-art / oil-pastel" mode its painterly cohesion **without strokes** — directly serving the user's "oil-pastel mode genuinely painterly" goal. It's a finishing filter on the color field, orthogonal to the stroke engine (Seed AW-6).

### 6. Impasto height-field + relief lighting (the "thick paint" depth)

Multiple sources converge: build a **height field** from accumulated stroke contributions (additive or max-pool on overlap), derive **normals via finite differences / `dFdx,dFdy`** (3× faster than manual finite-diff), light **Blinn-Phong** with a single directional light. Recent work synchronizes **color + normal maps per stroke** (dual-network trained on photometrically-scanned brush samples). — [Differentiable Stroke Planning (arXiv 2604.02752)](https://arxiv.org/pdf/2604.02752); [Im2Oil (arXiv 2209.13219)](https://arxiv.org/pdf/2209.13219); [Lee & Lin SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6026300); [Heightfield shading, nils-olovsson.se](https://nils-olovsson.se/articles/heightfield_shading/); [LearnOpenGL normal mapping](https://learnopengl.com/Advanced-Lighting/Normal-Mapping). Accessed 2026-06-06.

**Gap vs glass-ui:** confirmed — aurora's `StrokeHit.edgeN` *already carries the per-stroke height-proxy*, but it's only used for a static rim color. Accumulating it into a real `paintHeight` and lighting it from a single `uLightDir` is a high-fidelity, contained change (Seed AW-1).

### 7. OKLCh in-shader + derive-color

OKLCh chroma (distance from achromatic axis) beats HSL saturation for "how colorful." Palette extraction: sample up to ~90k pixels → **K-means++ at K≈14 in Oklab** (rectangular form → Euclidean distance, hue circularity handled), merge clusters within ~0.07 Oklab distance, hash-seed for determinism. — [Towards Data Science K-means palette](https://towardsdatascience.com/a-step-by-step-tutorial-using-k-means-to-extract-image-color-themes-43e04808b2be/), [Observable/Klimenko](https://observablehq.com/@romaklimenko/finding-palettes-of-dominant-colors-with-the-k-means-cluste). WebGPU 2026 support broad (Chrome/Edge/Firefox desktop, Safari 26 macOS/iOS, Chrome Android 121+) — [webgpufundamentals.org](https://webgpufundamentals.org/), [Maxime Heckel TSL/WebGPU field guide](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/). Accessed 2026-06-06.

**Gap vs glass-ui:** `brokenColorJitter` jitters in **RGB via a YIQ-style hue-rotation matrix** (`hueShift`), not OKLCh — so per-stroke variation shifts *luminance and saturation unevenly*. The `OKLCH_MATRICES_GLSL` chunk is already authored and 1e-6-verified; aurora just needs to splice it and jitter `(L, C, h)` independently (Seed AW-5). This is the "full OKLCh" and "atomic per-stroke variation" the user asked for, done perceptually.

---

## ADOPT for glass-ui aurora — wave-seed list

Each is a concrete AW-tranche wave/fold. Ordered by fidelity-impact per unit risk.

- **AW-1 · Real impasto height-field + relief lighting** *(headline; HIGH impact)*. Accumulate `StrokeHit.edgeN × coverage × impastoAmp` into a per-pixel `paintHeight` across the 4 stroke layers in `mediumOil`; add a `linen tooth` height base. Derive normal via `dFdx/dFdy(paintHeight)` (already in-pattern — `fwidth` is used for AA). Light Blinn-Phong from a new `uLightDir`/`uLightAngle` uniform. Replaces the static `±rim/shadow` fake in `brush.glsl.ts:paintOver` with view-consistent paint relief. *Files: `brush.glsl.ts`, `mediums.glsl.ts`, `aurora.frag.ts` uniforms, `useAurora`/runtime uniform plumbing, config schema.*

- **AW-2 · Van Gogh preset + energy-graded strokes** *(headline)*. A new `uMedium`/`uStrokeMode` Van Gogh configuration: swirl flow (`uFlowPattern=2`) + curl, **stroke length & layer density modulated by local luminance** of `sampleBase` (big energetic strokes in bright passages, fine strokes in darks) — the Kolmogorov/Batchelor congruence. Add `uEnergyGrade` knob. Ships as a named preset in the consumer-facing presets, NOT subject matter. *Files: `mediums.glsl.ts` (`bestOil` density/len from luma), `constants/presets`.*

- **AW-3 · Structure-tensor flow alignment** *(MEDIUM)*. Compute a Sobel structure tensor over `sampleBase` (extend the existing finite-diff luma-gradient in `mediumWatercolor`), take the dominant-eigenvector orientation + eigenvalue-ratio anisotropy, and **blend it into `flowField`** so strokes hug the color territories. Anisotropy drives `uStrokeAnisotropy` locally. Makes brushwork *read the gradient art it sits on*. *Files: new `tensor.glsl.ts` partial, `flow.glsl.ts`, `aurora.frag.ts` assembler.*

- **AW-4 · Flow-advected domain warp** *(MEDIUM; gradient-art lever)*. Extend `domainWarp` with N Euler-advection steps along the FBM gradient field (`field(p)` finite-diff already shown in research). A `uFlowAdvect` knob (0 = current double-warp, >0 = banded vortex flow). This is what pushes the smooth-gradient mode past Stripe/OpenAI mesh gradients into liquid van-Gogh-sky banding. *Files: `aurora.frag.ts:domainWarp`.*

- **AW-5 · OKLCh per-stroke broken color** *(MEDIUM; "full OKLCh")*. Splice the existing `OKLCH_MATRICES_GLSL` into aurora (the chunk is authored + gated, aurora currently doesn't reference it). Rewrite `brokenColorJitter` to jitter **L, C, h independently in OKLCh** instead of the RGB `hueShift` matrix — perceptually-even atomic variation, the "atoms of control." Add a small `uChromaJitter`/`uHueJitter`/`uValueJitter` split. *Files: `aurora.frag.ts` (splice + `brokenColorJitter`), assembler import.*

- **AW-6 · Anisotropic-Kuwahara oil-pastel finish** *(MEDIUM; serves "oil-pastel genuinely painterly")*. A light single-pass anisotropic Kuwahara (structure-tensor-steered, reusing AW-3's tensor) as a finishing filter for the smooth/pastel mediums — flattens along feature directions for true oil-pastel cohesion *without* the stroke cost. Gated by a `uKuwahara` strength so it's opt-in. *Files: new `kuwahara.glsl.ts`, `mediums.glsl.ts` dispatch.*

- **AW-7 · Derive-color from image** *(MEDIUM; "derive-color variant")*. CPU-side K-means++ in Oklab (K configurable, hash-seeded for determinism, 0.07-merge) over a user-supplied image/element → emits the `uPalette` stops aurora already consumes. Pure CPU, feeds the existing baked-linear palette path; no shader change. *Files: new `deriveAuroraPalette.ts` in `aurora/`, exposed via `useAurora`.*

- **AW-8 · Simplified options surface** *(LOW risk; "simplified options")*. The config schema now exposes ~30 uniforms. Introduce 4–6 high-level "atoms" (e.g. `energy`, `texture`, `swirl`, `palette`, `relief`) that fan out to the low-level uniforms, with the full set still available as an advanced tier. Directly answers "atoms of control" + "simplified options." *Files: `useAurora`/config schema, presets.*

- **AW-9 · WebGPU/TSL substrate path** *(LARGER; "modern WebGPU")*. Aurora rides `useWebGLCanvas` (WebGL2). A WebGPU/TSL backend (compute-shader stroke accumulation into a storage texture, then a render pass) would unlock per-stroke height accumulation in a compute pass (cleaner than the best-of-9 fragment hack) and align with the 2026 WebGPU baseline. Frame as a parallel substrate behind the existing `renderMode` seam (`"webgl" | "css"` → add `"webgpu"`), feature-detected, WebGL2 as fallback. *Files: `useWebGLCanvas` sibling, `Aurora.vue` `resolveRenderMode`.* **Highest effort — recommend last, after AW-1..6 prove the look in WebGL2.**

- **AW-10 · Dynamic/interactive deepening** *(LOW–MEDIUM)*. The cursor seam already swirls flow + warps domain. Extend to **paint-deposition interactivity**: cursor drag deposits a transient energy/height bump that decays (couples to AW-1's height field + AW-2's energy grade), so the user "paints into" the field. *Files: `flow.glsl.ts`/`domainWarp` cursor block, `useAurora.setCursor`.*

---

## Key file references (existing, load-bearing)

- `src/components/custom/aurora/constants/shaders/brush.glsl.ts` — curved-spine SDF stroke, bristle edge, `paintOver` 2D rim/shadow (AW-1 target), `bestOil` best-of-9 placement.
- `src/components/custom/aurora/constants/shaders/mediums.glsl.ts` — `mediumOil` 4-layer stroke stack (AW-2 energy-grade target), pastel/crayon/watercolor.
- `src/components/custom/aurora/constants/shaders/flow.glsl.ts` — parametric flow field (AW-3/AW-4/AW-10 target).
- `src/components/custom/aurora/constants/shaders/aurora.frag.ts:domainWarp` — single Quilez double-warp (AW-4 target); `brokenColorJitter`/`hueShift` RGB jitter (AW-5 target); already splices `${OETF_GLSL}`/`${FBM_ROT_GLSL}`.
- `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` — `OKLCH_MATRICES_GLSL` already authored + 1e-6-gated, **not yet spliced by aurora** (AW-5 unblocks it).
- `src/components/custom/aurora/composables/useAurora.ts` — uniform plumbing / `setCursor` / `renderMode` seam (AW-7/8/9/10).

**Headline pairing for the tranche:** AW-1 (real impasto relief) + AW-2 (energy-graded Van Gogh strokes) + AW-5 (OKLCh atomic variation) together deliver the "proper atomic brushstrokes — depth, variation, congruent to real Van Gogh, no subject matter" the user asked for; AW-4 + AW-6 + AW-7 + AW-8 deliver the "stunning gradient-art / oil-pastel / derive-color / simplified atoms" half. AW-9 is the WebGPU modernization, sequenced last.

---

### Lane 8

All confirmed. Here is the research brief.

---

# Aurora SOTA brief — Lane: stroke-based rendering (SBR)

Research-only. No implementation. Findings, techniques, then a wave-seed adopt list for tranche AW.

Context grounding: the existing aurora is a single WebGL2 full-screen fragment shader (`src/components/custom/aurora/composables/runtime.ts`, `constants/shaders/aurora.frag.ts`) with composition (multi-nuclei OKLCh softmax field + Quilez double-fBm domain warp) then an orthogonal `medium` pass (`smooth | pastel | watercolor | oil`) where `oil` routes a `strokeMode` (`oil | knife | crayon | chunky`). The current "strokes" are *procedural texture* (anisotropic fBm tooth, curved-spine multiply) — they do NOT decompose the gradient into discrete oriented brush atoms. That gap is exactly what real SBR closes. See `src/components/custom/aurora/DESIGN.md:42-65` (pipeline) and `:148-161` (load-bearing notes).

---

## 1. The canonical algorithm — Hertzmann multi-layer curved-stroke painterly rendering

The foundational, directly-portable recipe. Full algorithm extracted from Hertzmann's own survey, *A Survey of Stroke-Based Rendering*, IEEE Computer Graphics & Applications, July/August 2003 (`/tmp/sbr_survey.txt:793-1096`, pulled from https://www.dgp.toronto.edu/~hertzman/sbr02/hertzmann-cga03.pdf). Origin paper: Hertzmann, *Painterly Rendering with Curved Brush Strokes of Multiple Sizes*, SIGGRAPH 1998 (https://mrl.cs.nyu.edu/publications/painterly98/, accessed 2026-06-06).

**Coarse-to-fine layered paint loop** (survey lines 857-889):
- Brush radii `r1…rn`, largest→smallest, ideally powers of two `ri = r1·2^(i-1)`.
- Each layer paints against a *reference image* = source blurred by a Gaussian of σ = `fσ·ri` (so a brush only captures detail ≥ its own size).
- Grid spacing = `ri`. In each grid cell, sum the area error `Σ|Ip − Iri|`; if it exceeds threshold `T`, seed a stroke at the *max-error point* in that cell (NOT a jittered grid point — that would miss thin features).
- Plan all strokes for a layer, then render in random order (z-buffer with random z avoids the regularity artifact). Earlier (larger) layers stay visible underneath — this is what gives the painting depth.

**Curved stroke growth** (`makeSplineStroke`, survey lines 1037-1096, figure-11 geometry at 949-956):
- Stroke = list of control points + one constant color (sampled from reference at the start point) + a brush radius. Rendered as a cubic B-spline; control-point spacing = `r`.
- At each point: compute gradient `g` from Sobel-filtered luminance, then **rotate 90°**: `vi = (-gy, gx)` — strokes run *normal* to the gradient, i.e. along isocontours of roughly-constant color.
- Two candidate normals (`θ±π/2`); pick the one minimizing curvature (angle to previous direction ≤ π/2). Reverse if `vi·vi-1 < 0`.
- **Curvature filter** `fc`: `vi = fc·vi + (1-fc)·vi-1` — low `fc` = stiff straight strokes, high `fc` = whippy curved strokes.
- Terminate when: max length reached; OR (after min length) the reference color at the new point is closer to the painting than to the stroke color (the stroke has left its color region). Vanishing-gradient guard: if `r·|g| < 1` continue straight in the previous direction.

**Style = parameter vector** (the whole aesthetic is ~8 numbers): approximation threshold `T`, brush sizes `R`, curvature filter `fc`, blur factor `fσ`, min/max stroke length, opacity `α`, grid factor `fg`, plus per-stroke color jitter (hue/sat/value/RGB). Hertzmann names "Impressionist", "Expressionist", "Pointillist" etc. purely as presets over this vector. A reference Python port confirms typical values `R={8,4,2}`, `T=1.0–4.0`, `fc=0.25–1.0`, `fσ=0.5`, `maxLen=16`, `minLen=4–10` (https://www.dgp.toronto.edu/~bastani/npr/painterly.html, accessed 2026-06-06; https://github.com/pschaldenbrand/PyPainterly).

Single-layer predecessor (Litwinowicz 1997, survey 793-811): short strokes on a jittered grid, each oriented by an **orientation field** φ(p) = normal of image gradient, with constant-region holes filled by thin-plate-spline interpolation. This is the cheapest oriented-stroke variant and maps cleanly to instanced quads.

---

## 2. Orientation fields — gradient normal vs Edge Tangent Flow (ETF)

Stroke direction is the soul of the look. Two levels of sophistication:

- **Gradient normal** (Hertzmann/Litwinowicz): φ = rot90(∇luminance). Cheap, but noisy in flat regions and gives jagged flow.
- **Edge Tangent Flow (ETF)** — Kang, Lee, Chui, *Coherent Line Drawing*, NPAR 2007 (https://cg.postech.ac.kr/papers/kang_npar07_hi.pdf), and *Flow-Based Image Abstraction*, IEEE TVCG 2009 (semantic scholar 31c2e7…). ETF builds a smooth tangent field: take gradient, rotate 90°, then iteratively align each vector to nearby *higher-magnitude* neighbors (a bilateral-style smoothing that respects edges). Result: vectors parallel to edge tangents, coherent across flat zones, no holes. This is what makes flow-guided strokes look hand-laid rather than noisy. The aurora's existing flow field (`flowField` / `FlowPattern`) is the seam to upgrade to ETF-quality coherence.

**Structure tensor** is the unifying primitive for both orientation *and* anisotropy in a fragment shader: `J = [[Jxx,Jxy],[Jxy,Jyy]]` from Sobel `Gx,Gy`, smoothed, then eigen-decomposed → dominant orientation + an anisotropy scalar `A=(λ1-λ2)/(λ1+λ2)`. Sources: Kyprianidis & Döllner, *Image and Video Abstraction by Anisotropic Kuwahara Filtering*, CGF / NPAR 2009 (https://www.kyprianidis.com/p/npar2009/) and the GPU implementation in *GPU Pro* (https://www.kyprianidis.com/p/gpupro/). The aurora already computes a flow vector per fragment; promoting it to a structure-tensor-derived field would unify warp-curl, stroke direction, and anisotropy under one math seam.

---

## 3. Painterly *appearance* in a fragment shader (no per-stroke geometry)

Two screen-space families that look painterly without spawning thousands of stroke quads — both fit the aurora's "single shader, single draw" invariant (DESIGN.md:27):

- **Anisotropic Kuwahara filter** — generalize the classic Kuwahara (split kernel into N sectors, output the mean of the lowest-variance sector) into an *ellipse* shaped/rotated by the structure tensor, with Gaussian or polynomial sector weights. Produces "the clearness of cartoon illustration but with directional information as in oil paintings" — i.e. flat color territories with directional brush texture along feature flow (Kyprianidis 2009; multi-scale variant https://www.kyprianidis.com/p/npar2011/jkyprian-npar2011.pdf). Practical multi-pass recipe (compute tensor → anisotropic-Kuwahara → tonemap + texture) walked through in Maxime Heckel, *On Crafting Painterly Shaders* (https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/, accessed 2026-06-06) — already cited in DESIGN.md:168.
- **Impasto via height field → normal → lighting.** Reproduce the tactile oil look by accumulating a per-stroke *height* contribution (bristle-ridge perturbation), deriving a normal from the height gradient, and adding a specular/diffuse term so ridges catch light. Thin strokes inherit canvas roughness; thick impasto overrides it (search-corroborated technique; the Van Gogh 3D-shader thesis builds exactly this height-field substrate: Sharma, *A Van Gogh Inspired 3D Shader Methodology*, Texas A&M, https://core.ac.uk/download/pdf/147237812.pdf). The aurora's current `impasto` uniform is a flat multiply — promoting it to a height→normal→spec lighting term is the single biggest fidelity win for the oil pole.

---

## 4. Van Gogh specifically — directional syntax + geometric exaggeration

The thing that makes brushwork read as *Van Gogh* (not just "oil") is **orientation-as-syntax**: strokes align with the principal curvature of forms and exaggerate it. Modern reference: *Thinking Like Van Gogh: Structure-Aware Style Transfer via Flow-Guided 3D Gaussian Splatting*, arXiv 2601.10075 (2026, https://arxiv.org/html/2601.10075, accessed 2026-06-06). Portable ideas even though it's a 3D/Gaussian method:

- **"Exaggeration in the essential"** — orientation is the carrier of style; stroke direction follows flow, not photographic detail.
- **Brush elongation + stroke alignment** — isotropic primitives stretched into anisotropic strokes by maximizing the eigenvalue ratio along flow `t`. Maps to: drive stroke anisotropy from the structure-tensor anisotropy scalar.
- **Directional-projection of motion**: `Δμ_corr = (1-λ)Δμ + λ(Δμ·d)d` — constrain change to the flow direction. Useful for *animating* strokes so they breathe along flow rather than drift randomly.
- **Chromatic decoupling in Lab**: freeze a/b chroma, let L deform with structure — prevents muddy color under aggressive deformation. The aurora is already full-OKLCh, so this is a natural fold (animate L, lock Ch).
- Impasto = visible structural relief (~3mm paint ridges), not surface texture — reinforces the §3 height-field point.

The user's "no subject matter" constraint is satisfiable: aurora has no image to decompose, so apply the Hertzmann/ETF stroke machinery to the *internal gradient of the procedural nuclei field itself* (the softmax color field IS the "source image"). Strokes then trace the iso-bands of the generated gradient — genuine atomic brushstrokes over abstract color, congruent to Van Gogh's directional syntax, zero subject.

---

## 5. Modern / GPU / real-time variants

- **Object-space / instanced-quad SBR for WebGL**: brush strokes as screen-aligned textured quads, vertex shader fetches tangent from a distance/flow map and rotates the quad to align with flow; multiple layers (few large base quads covering silhouette → many small detail quads on top). Todd & Hanson, RPI (https://www.cs.rpi.edu/~cutler/classes/advancedgraphics/S14/final_projects/scott_andy.pdf; https://scotttodd.github.io/projects/painterly-rendering); GPU Hacks brush-strokes write-up (https://gpuhacks.wordpress.com/2012/01/30/brush-strokes/, 2012). This is the WebGPU-instancing path — a second render pass over the aurora's color field.
- **Ciallo: GPU-Accelerated Rendering of Vector Brush Strokes**, SIGGRAPH 2024 (https://dl.acm.org/doi/10.1145/3641519.3657418) — analytic GPU rasterization of stylized strokes along vector curves; the current SOTA for *rendering* (not planning) brush strokes in real time.
- **Differentiable / neural stroke planning** (offline → bake): the survey arXiv 2302.00595 (2023, Hertzmann et al., *Stroke-Based Rendering: From Heuristics to Deep Learning*) taxonomy = greedy → optimization/relaxation → RL → differentiable vector graphics → transformer. MambaPainter (SIGGRAPH Asia 2024 Posters, single-step SSM, https://dl.acm.org/doi/10.1145/3681756.3697906) and *Differentiable Stroke Planning with Dual Parameterization* (arXiv 2604.02752, April 2026 — Bézier control points + varying width + RGBA + texture, layer-composited through a differentiable renderer) are the high-fidelity planners. For aurora these are **offline preset-bake tools**, not runtime: plan a stroke set once, bake to a texture/instance buffer the shader replays.
- **OKLab/OKLCh perceptual interpolation** is now standard for gradient quality and ships in CSS Color 4, Photoshop, Unity, Godot, Bevy (https://bottosson.github.io/posts/oklab/; Bevy PR 19330; Wikipedia Oklab). The aurora is already OKLCh — the actionable nuance is **hue-path control** (short vs long arc; long arcs detour through out-of-gamut/unintended hues) for the derive-color variant.
- **Mesh-gradient baseline to beat** (Stripe/OpenAI look): layered Simplex fBm (lacunarity↑ / persistence↓) + sinusoidal domain warp of UVs, 3-octave for 60fps mobile (Hufnagl https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/; exzenter/gradient-stripe). The aurora's Quilez double-fBm warp already exceeds this; SBR strokes are how it *betters* it rather than matching it.
- **Domain/curl warping** for the swirling Starry-Night flow: Quilez domain warping (https://iquilezles.org/articles/warp/) + curl noise from gradient-noise derivatives (tuxalin procedural-tileable-shaders, https://deepwiki.com/tuxalin/procedural-tileable-shaders/4.2-domain-warping). Already in the aurora's `warpMode`; the fold is to *share* this field with the stroke orientation field.

---

## ADOPT for glass-ui aurora / wave-seeds (tranche AW)

Each is a concrete, scoped wave/fold. Ordered cheapest-highest-leverage first.

- **AW.Wa — Structure-tensor orientation seam.** Replace the ad-hoc per-fragment flow vector with a structure-tensor field computed from the *internal nuclei/softmax gradient* (Sobel on the generated color field, smoothed). Output: dominant orientation θ + anisotropy scalar A. One math primitive feeding warp-curl, stroke direction, AND stroke elongation. Foundation for every wave below. (Refs §2; `aurora.frag.ts` `flowField`.)

- **AW.Wb — ETF-coherent flow upgrade.** Iteratively align the tensor field to higher-magnitude neighbors (Kang ETF) so flow is coherent across flat color zones — kills the noisy stroke jitter the current fBm-tooth oil mode shows. Promotes existing `FlowPattern`/`curl` to ETF quality. (Refs §2.)

- **AW.Wc — Anisotropic-Kuwahara `medium: "painterly"` (new peer mode).** Add an anisotropic-Kuwahara pass (ellipse shaped by AW.Wa tensor) as a peer medium beside pastel/watercolor/oil, dispatched at `main()` like crayon. Gives flat directional color territories with oil-painting feature flow — the single biggest "genuinely painterly" upgrade that stays single-shader/single-draw. (Refs §3, DESIGN.md:53-56,156.)

- **AW.Wd — Impasto height→normal→light (oil-pole fidelity).** Promote the flat `impasto` uniform to: accumulate per-stroke ridge height, derive normal from height gradient, add diffuse+specular so ridges catch a virtual light. Thin strokes inherit canvas tooth, thick strokes override it. This is what makes oil read as *physical paint*. (Refs §3, §4; DESIGN.md `impasto`.)

- **AW.We — Hertzmann curved-stroke layer for the Van Gogh variant.** A real second render pass: greedy multi-layer (large→small radius), seed strokes at max-error points of the procedural field, grow cubic-spline strokes normal to the gradient with curvature filter `fc`, composite large-under-small. Strokes are *atoms* (orientation + length + color + width), not texture. Expose `T, R[], fc, fσ, minLen, maxLen, α` as the Van Gogh preset vector. No subject matter — the "source image" is the generated nuclei field. (Refs §1, §4.)

- **AW.Wf — Van Gogh directional syntax + Lab-decoupled animation.** Drive stroke anisotropy from tensor anisotropy A; exaggerate orientation along principal flow ("exaggeration in the essential"). Animate strokes by directional projection (move along flow `d`, not random drift) and breathe **L only, lock Ch** in OKLCh to avoid muddy color. Congruent to real Van Gogh; satisfies "depth + variation". (Refs §4.)

- **AW.Wg — Per-stroke color jitter (broken color, principled).** Replace/extend the current bounded `brokenColor` hash with Hertzmann-style per-stroke hue/sat/value jitter sampled at stroke birth in OKLCh, jitter ranges as preset params. This is canonical "broken color" — pigment variation per stroke, not per pixel. (Refs §1; DESIGN.md:158.)

- **AW.Wh — Instanced-quad stroke renderer (WebGPU path, optional/tiered).** For the highest-fidelity tier: a second pass emitting instanced textured brush-stroke quads rotated by the AW.Wa field (Todd/Hanson object-space SBR; Ciallo for analytic rendering). Tier behind `resolveRenderMode` device-tier resolver (`constants/renderMode.ts`) so low-end devices keep the single-shader path. (Refs §5.)

- **AW.Wi — Offline stroke-plan bake tool (preset authoring).** A demo-private/offline tool using a differentiable or greedy planner (Dual-Parameterization arXiv 2604.02752 / MambaPainter / PyPainterly) to *plan* a stroke set from a target gradient, baked to a texture or instance buffer the runtime replays. Keeps the runtime cheap; moves the expensive planning to preset-bake time (mirrors the existing thumbnail-bake pattern, DESIGN.md:153). (Refs §1, §5.)

- **AW.Wj — Derive-color + OKLCh hue-path control.** For the "derive-color variant": generate a full palette from 1-2 seed OKLCh stops via perceptual interpolation with explicit **short/long hue-arc** control (long arcs detour out of gamut — must be a deliberate knob, not default). Simplifies the public API (fewer authored stops) toward the user's "simplified options" goal. (Refs §5; `composables/color.ts` `oklchToLinear`/`flattenPalette`.)

- **AW.Wk — Unify warp + flow + stroke onto one field (simplification fold).** Architectural: today domainWarp and flowField are separate. Collapse both onto the AW.Wa structure-tensor field so cursor deflection, color-band curl, and stroke direction all read one coherent vector field — fewer uniforms, more congruent motion, satisfies "atoms of control: zones, noise, color". (Refs §2; DESIGN.md:24-25,67-74.)

### Key sources (URL + date)
- Hertzmann, *A Survey of Stroke-Based Rendering*, IEEE CG&A, Jul/Aug 2003 — https://www.dgp.toronto.edu/~hertzman/sbr02/hertzmann-cga03.pdf (accessed 2026-06-06)
- Hertzmann, *Painterly Rendering with Curved Brush Strokes of Multiple Sizes*, SIGGRAPH 1998 — https://mrl.cs.nyu.edu/publications/painterly98/
- Hertzmann et al., *Stroke-Based Rendering: From Heuristics to Deep Learning* (survey), arXiv 2302.00595, 2023 — https://arxiv.org/pdf/2302.00595
- Kang/Lee/Chui, *Coherent Line Drawing*, NPAR 2007 — https://cg.postech.ac.kr/papers/kang_npar07_hi.pdf ; *Flow-Based Image Abstraction*, TVCG 2009
- Kyprianidis & Döllner, *Image and Video Abstraction by Anisotropic Kuwahara Filtering*, CGF/NPAR 2009 — https://www.kyprianidis.com/p/npar2009/ ; GPU Pro impl — https://www.kyprianidis.com/p/gpupro/
- *Thinking Like Van Gogh: Structure-Aware Style Transfer via Flow-Guided 3D Gaussian Splatting*, arXiv 2601.10075, 2026 — https://arxiv.org/html/2601.10075
- Sharma, *A Van Gogh Inspired 3D Shader Methodology*, Texas A&M — https://core.ac.uk/download/pdf/147237812.pdf
- *Differentiable Stroke Planning with Dual Parameterization*, arXiv 2604.02752, Apr 2026 — https://arxiv.org/pdf/2604.02752
- MambaPainter, SIGGRAPH Asia 2024 Posters — https://dl.acm.org/doi/10.1145/3681756.3697906
- *Ciallo: GPU-Accelerated Rendering of Vector Brush Strokes*, SIGGRAPH 2024 — https://dl.acm.org/doi/10.1145/3641519.3657418
- Todd/Hanson, *Object-Space Painterly Rendering for WebGL*, RPI — https://www.cs.rpi.edu/~cutler/classes/advancedgraphics/S14/final_projects/scott_andy.pdf ; https://scotttodd.github.io/projects/painterly-rendering
- Maxime Heckel, *On Crafting Painterly Shaders* — https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ (accessed 2026-06-06)
- Quilez, *Domain Warping* — https://iquilezles.org/articles/warp/ ; Bottosson, *Oklab* — https://bottosson.github.io/posts/oklab/
- PyPainterly (reference Hertzmann port) — https://github.com/pschaldenbrand/PyPainterly ; impl params at https://www.dgp.toronto.edu/~bastani/npr/painterly.html

Relevant repo files: `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/DESIGN.md` (pipeline `:42-65`, oil/crayon notes `:148-161`), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts` (composition + medium + post), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/composables/color.ts` (OKLCh math), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/composables/runtime.ts` (createAurora lifecycle), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/renderMode.ts` (device-tier resolver — the seam for the tiered instanced-quad path AW.Wh).

---

### Lane 9

I have everything needed. The current `uImpasto` is consumed only as a fixed-RGB edge-rim multiplier inside `paintOver` (brush.glsl.ts:173-178) — confirming there is no real height field, normal, or movable light. Here is the brief.

---

# SOTA Brief — Impasto / Paint-Relief Lighting for glass-ui Aurora

Lane: **impasto-lighting**. Research only — no implementation. The goal: give the aurora's oil/van-gogh modes genuine 3D paint thickness (normal-mapped relief + specular ridges), tactile depth, and per-stroke variation that reads as real impasto.

## Where glass-ui is today (grounding)

- The oil medium already builds curved swept brushstroke SDFs in 4 jittered layers with bristle-ragged edges, streaking, and per-stroke broken color — a strong stroke *geometry* base. `src/components/custom/aurora/constants/shaders/brush.glsl.ts:72` (`curvedStroke`), `:188` (`bestOil` best-of-9 placement), `mediums.glsl.ts:124` (`mediumOil`, 4-layer stack).
- **But "impasto" today is a fake.** `uImpasto` only drives a *fixed-color* edge rim and shadow inside `paintOver` — `brush.glsl.ts:173-178` adds `vec3(0.18,0.15,0.11)` on one side and subtracts a cool shadow on the other, gated by `step(0.0, s.crossN)` (which side of the stroke). There is **no height field, no surface normal, no light vector** — the "highlight" is hardcoded to a phantom upper-left light and never moves, never responds to color, never accumulates between overlapping strokes. `mediums.glsl.ts:223-226` canvas tooth is a flat multiply, not a height contribution.
- Flow orientation is *prescribed* (radial/swirl/diagonal/curl), `flow.glsl.ts:6` — not *derived* from the image content, so strokes don't bend around the gradient's own features the way Kuwahara/ETF strokes do.
- Color machinery is solid and OKLCh-correct already: shared Ottosson matrices + sRGB OETF in `src/composables/glass/webgl/shaders/procedural-color.glsl.ts:46`; ACES tonemap + IGN dither in `tonemap.glsl.ts:5`. The lighting work should stay in **linear light, before tonemap**.

The whole lane is: replace the fake fixed-rim with a real **height field → screen-space normal → movable directional light (diffuse + Blinn specular on ridges)** pass, and derive stroke orientation from a structure tensor so the brushwork is congruent to real painting.

## The techniques (cross-verified)

### 1. Paint as a height field, lit by its own normal (the core)
The canonical real-time model (IMPaSTo, Baxter/Wendt/Lin, NPAR 2004) stores **each paint layer as a height field**; the modern differentiable-stroke formulation (arXiv 2024) accumulates **per-stroke per-pixel height into a global height field** and computes **surface normals directly from the height field by finite differences**, then **modulates specular on ridges where height variation is greatest** — "the characteristic glossy peaks of thick impasto." This is exactly the missing piece in glass-ui.
- Normal from height (the standard Sobel/finite-difference emboss): `n = normalize(vec3(-(h(x+e)-h(x-e))/2e * strength, -(h(y+e)-h(y-e))/2e * strength, 1.0))`. Sobel gives a smoother gradient than Prewitt. Encoded X→R, Y→G, Z→B in tangent space ([LearnOpenGL Normal Mapping](https://learnopengl.com/Advanced-Lighting/Normal-Mapping); [graphicsandprogramming Krita height/normal tutorial](https://www.graphicsandprogramming.net/eng/tutorial/krita/make-textures-in-krita/krita-tutorial-map-displacement-height-normal); [Vextrude height→normal](https://vextrude.com/normal_map)).
- Lighting: diffuse `max(dot(N,L),0)` + Blinn-Phong specular `pow(max(dot(N,H),0), shininess)` with H the half-vector. Specular keyed to the ridge (high `|∂h|`) sells the wet-paint catch-light. Run in linear light before ACES.

### 2. Bristle-induced ridges + thickness-aware modulation
The differentiable-stroke paper: don't use smooth stroke height — **procedurally perturb the height with bristle ridges and grooves** so each stroke carries the furrows of individual bristles. And **thickness-aware blend**: thin strokes inherit canvas roughness; thick impasto strokes *override* the canvas texture as they pile up. glass-ui already has the ingredients (`bristleAmp`, the streak fbm in `paintOver`) — they just need to feed a **height channel** instead of (only) a color tint. (arXiv [Differentiable Stroke Planning, 2024](https://arxiv.org/pdf/2604.02752); IMPaSTo height-field-per-layer, [UNC gamma](http://gamma.cs.unc.edu/IMPASTO/publications/Baxter-IMPaSTo_Web-NPAR04.pdf)).

### 3. Structure-tensor / ETF orientation (paint that bends around its own content)
Anisotropic Kuwahara (Kyprianidis & Kang, PG 2009) derives a **smoothed structure tensor** from the image, and its eigenvectors give local orientation + anisotropy; the eigenvector of the **smallest eigenvalue is the edge-tangent direction (ETF)** — the natural brush-stroke direction. Building J = [[Jxx,Jxy],[Jxy,Jyy]] from Sobel gradients, then orienting strokes along the minor eigenvector, is *the* way SBR/painterly renderers make strokes follow features instead of a fixed grid. ([Kyprianidis PG2009 anisotropic Kuwahara](https://www.kyprianidis.com/p/pg2009/index.html); [Maxime Heckel, On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) — structure tensor + Sobel matrices + multi-pass pipeline; [ETF / structure-tensor orientation primer](http://3dstereophoto.blogspot.com/2018/05/non-photorealistic-rendering-edge.html)). Maxime Heckel's post is the best modern WebGL walkthrough but **explicitly stops before the impasto lighting half** — that gap is precisely this lane.

### 4. Anisotropic-Kuwahara color flattening (the oil-paint *look* under the relief)
The Kuwahara family flattens color into stroke-shaped patches that preserve edges (cartoon clarity + oil-painting directionality). Gao/Li (IEEE 2019) drive **bump mapping from the edge-orientation field + gradient magnitude + saliency to fake the thickness/layers of oil strokes** — i.e., the same structure tensor feeds *both* the color flattening *and* the height/normal. ([Oil Painting Style Rendering Based on Kuwahara Filter, IEEE 2019](https://ieeexplore.ieee.org/document/8772035); [Image and Video Abstraction by Anisotropic Kuwahara Filtering](https://www.researchgate.net/publication/220507613_Image_and_Video_Abstraction_by_Anisotropic_Kuwahara_Filtering)).

### 5. Pigment depth via Kubelka-Munk (optional, for "real oil")
IMPaSTo's color realism comes from **Kubelka-Munk pigment optics, not RGB** — thickness-dependent absorption/scatter (K/S), so thick paint goes opaque and thin glazes stay translucent, and mixing is subtractive (no muddy sRGB midtones). A simplified K/S two-constant approximation is shader-feasible and gives glazes real depth. ([IMPaSTo, UNC](http://gamma.cs.unc.edu/IMPASTO/publications/Baxter-IMPaSTo_Web-NPAR04.pdf); [K-M verification for acrylics](https://www.researchgate.net/publication/264844752_Verification_of_the_Kubelka-Munk_Turbid_Media_Theory_for_Artist_Acrylic_Paint_Summer_2004); [CoolerSpace, arXiv 2024 — efficient physically-correct color programming](https://arxiv.org/pdf/2409.02771)). Lower priority than 1-3 — glass-ui's OKLCh subtractive-ish path is already decent; flag K-M as a stretch fold.

### 6. Gradient-art base (to beat Stripe/OpenAI mesh gradients)
Stacked simplex-noise octaves at distinct frequency/amplitude/phase-speed, desynchronized, drive lightness; **OKLCH interpolation** kills muddy midtones and hue shift that sRGB/HSL blends produce; grain/dither defeats banding; noise-driven variable blur with a `pow()` exponent biases toward intermittent sharpness. ([Alex Harri, A flowing WebGL gradient deconstructed](https://alexharri.com/blog/webgl-gradients); [gradients.fyi OKLCH mesh generator](https://gradients.fyi/); [ColorFlow mesh editor](https://colorflow.ls.graphics/)). glass-ui already does OKLCh + dither; the differentiator is the **impasto relief on top** — no mesh-gradient tool ships paint-relief lighting, so that's the arresting edge.

## ADOPT for glass-ui aurora — wave seeds (AW tranche)

Each is a concrete, independently-landable wave. Ordered by leverage.

- **AW.W1 — Height-field + screen-space normal pass (HEADLINE).** Add a `float height` accumulator alongside the color in `mediumOil`: every `paintOver` deposits height (proportional to coverage × per-layer thickness, modulated by streak fbm for bristle furrows) instead of only tinting. After the 4-layer stack, compute the normal by Sobel finite-difference on the accumulated height (`brush.glsl.ts`/`mediums.glsl.ts` boundary), and apply diffuse + Blinn specular from a **movable `uLightDir`** uniform, in linear light *before* `aces()` in `tonemap.glsl.ts`. **Retire the fixed-RGB rim hack at `brush.glsl.ts:173-178`** — the rim becomes an emergent consequence of the normal, not a phantom-light constant. Wire `uLightDir` into `uniformBridge.ts`/`presets.ts`.

- **AW.W2 — Bristle-furrow height channel + thickness-aware canvas.** Feed the existing `bristleAmp`/streak noise into the *height* (per-bristle ridges/grooves), and make the canvas tooth (`mediums.glsl.ts:223`) a **height contribution** that thick strokes override (thickness-aware blend: thin → canvas roughness dominates, thick → impasto wins). Gives genuine palette-knife vs bristle-brush relief difference per `uStrokeMode`.

- **AW.W3 — Structure-tensor flow (`derive` flow pattern).** New `uFlowPattern` value that builds a smoothed structure tensor from `sampleBase`'s luma gradient (Sobel → J → minor eigenvector / ETF) and orients strokes along it, so brushwork bends around the gradient's own features. Slots cleanly into `flow.glsl.ts:6` as a 5th branch; congruent-to-real-van-gogh directionality. This is also the natural home for a **derive-color** variant (strokes pick palette from the structure they follow).

- **AW.W4 — Movable / interactive light (cursor-anchored).** Reuse the existing cursor seam (`useCursorInteraction.ts`, `flow.glsl.ts:35` cursor swirl) to also drive `uLightDir` — the catch-lights track the pointer, making the relief tactile and "alive." Plus a slow auto-orbit when idle. This is the dynamic/interactive headline once W1 lands.

- **AW.W5 — Van-gogh variant preset.** A `presets.ts` entry: structure-tensor flow (W3) + high bristle-furrow height (W2) + dense small dabs + high specular shininess + strong stroke anisotropy. No subject matter — pure abstract gradient — but with proper atomic directional impasto strokes. Depends on W1-W3.

- **AW.W6 — Anisotropic-Kuwahara color-flatten fold (oil-pastel fidelity).** A pre-pass (or per-pixel sector estimate) that flattens `sampleBase` into oriented stroke-shaped color patches before strokes are laid, so the oil-pastel mode reads as genuinely painterly patches, not noise. Drive its kernel from the same structure tensor as W3 (shared tensor = one cost).

- **AW.W7 — Kubelka-Munk pigment depth (stretch).** Replace (or gate) the RGB stroke compositing with a simplified two-constant K/S subtractive model so thick paint goes opaque and glazes stay translucent — thickness from the W1 height field directly drives opacity. Highest fidelity, highest risk; ship only if W1-W2 land clean.

- **AW.W8 — WebGPU compute path (forward-looking).** The height-field accumulate + structure-tensor build are multi-pass/neighborhood ops that map naturally to WGSL compute (G-buffer with packed normal + albedo, deferred light). Per `useWebGLCanvas` substrate (`AU.W6`), a WebGPU backend would let the impasto pass scale; gate behind capability detection, WebGL2 stays the fallback. ([WebGPU deferred + normal buffers](https://www.webgpu.com/showcase/deferred-rendering-in-webgpu-sponza/); [WGSL spec](https://www.w3.org/TR/WGSL/)).

**Sequencing:** W1 is the keystone (everything visual hangs off the height field + normal). W2 and W3 are independent and parallel after W1. W4/W5 depend on W1-W3. W6/W7/W8 are folds/stretches. The "simplified options" goal: expose just `uLightDir`, `uImpastoDepth`, `uShininess`, and a `flow=derive` toggle as the new atoms — the rest stays internal.

## Sources
- [IMPaSTo: A Realistic, Interactive Model for Paint — Baxter/Wendt/Lin, NPAR 2004 (UNC gamma)](http://gamma.cs.unc.edu/IMPASTO/publications/Baxter-IMPaSTo_Web-NPAR04.pdf) — accessed 2026-06-06
- [Differentiable Stroke Planning with Dual Parameterization, arXiv 2024](https://arxiv.org/pdf/2604.02752) — accessed 2026-06-06
- [Maxime Heckel — On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) — accessed 2026-06-06
- [Kyprianidis & Kang — Image and Video Abstraction by Anisotropic Kuwahara Filtering, PG 2009](https://www.kyprianidis.com/p/pg2009/index.html) — accessed 2026-06-06
- [Gao/Li — Oil Painting Style Rendering Based on Kuwahara Filter, IEEE 2019](https://ieeexplore.ieee.org/document/8772035) — accessed 2026-06-06
- [LearnOpenGL — Normal Mapping](https://learnopengl.com/Advanced-Lighting/Normal-Mapping) — accessed 2026-06-06
- [graphicsandprogramming — Krita height/normal/displacement tutorial](https://www.graphicsandprogramming.net/eng/tutorial/krita/make-textures-in-krita/krita-tutorial-map-displacement-height-normal) — accessed 2026-06-06
- [Vextrude — height map to normal](https://vextrude.com/normal_map) — accessed 2026-06-06
- [Edge Tangent Flow / structure-tensor orientation primer](http://3dstereophoto.blogspot.com/2018/05/non-photorealistic-rendering-edge.html) — accessed 2026-06-06
- [Alex Harri — A flowing WebGL gradient, deconstructed](https://alexharri.com/blog/webgl-gradients) — accessed 2026-06-06
- [gradients.fyi — OKLCH mesh gradient generator](https://gradients.fyi/) — accessed 2026-06-06
- [ColorFlow — mesh gradient editor](https://colorflow.ls.graphics/) — accessed 2026-06-06
- [Kubelka-Munk turbid-media verification for acrylic paint, 2004](https://www.researchgate.net/publication/264844752_Verification_of_the_Kubelka-Munk_Turbid_Media_Theory_for_Artist_Acrylic_Paint_Summer_2004) — accessed 2026-06-06
- [CoolerSpace — physically-correct, efficient color programming, arXiv 2024](https://arxiv.org/pdf/2409.02771) — accessed 2026-06-06
- [WebGPU deferred rendering with normal G-buffers](https://www.webgpu.com/showcase/deferred-rendering-in-webgpu-sponza/) — accessed 2026-06-06

**Key in-repo references for the wave seeds:** `src/components/custom/aurora/constants/shaders/brush.glsl.ts:173` (fake rim to retire), `:72` `curvedStroke`, `:188` `bestOil`; `mediums.glsl.ts:124` `mediumOil`, `:223` canvas tooth; `flow.glsl.ts:6` `flowField` (add `derive` branch), `:35` cursor seam; `aurora.frag.ts:104` `uImpasto` uniform, `:321-324` medium dispatch; `tonemap.glsl.ts:5` (insert lighting before `aces()`); `src/composables/glass/webgl/shaders/procedural-color.glsl.ts:46` (OETF — keep lighting in linear before this).

---

### Lane 10

The aurora already has OKLCh stops, `deriveAurora` (harmony-based derive-color), and gamut mapping. So the OKLCh and derive-color asks are partially shipped — the gap is in-shader OKLCh interpolation (palette is baked to linear-sRGB on the CPU and interpolated in linear sRGB, not in OKLab per-pixel). That's an important grounding for the wave seeds. I have everything I need.

---

# SOTA brief — Kuwahara / painterly post-process for the aurora backdrop

Lane: **kuwahara-painterly**. Research only — no implementation. Every claim cited.

## What the aurora already has (grounding)

The aurora is NOT a blank slate. It ships a curved-stroke SDF brush system, four mediums, a flow field, and OKLCh color:

- `src/components/custom/aurora/constants/shaders/brush.glsl.ts:72` — `curvedStroke` (quadratic-bulge spine SDF, bristle-ragged edges, end-cap blobs, impasto rim) + `bestOil` best-of-9-neighbor placement (`brush.glsl.ts:188`).
- `mediums.glsl.ts:124` — `mediumOil` layers 4 stroke passes (big/med/small/fill) + optional crosshatch + canvas tooth; `mediumWatercolor`/`mediumPastel`/`mediumCrayon` are peer mediums.
- `flow.glsl.ts:6` — `flowField` is **procedural only**: radial / swirl / diagonal / curl-noise / cursor. It is NOT derived from the rendered image's structure.
- `composition.glsl.ts:9` — `samplePalette` reads a **CPU-baked linear-sRGB LUT**; interpolation happens in linear sRGB, not OKLab per-pixel.
- `composables/color.ts:152` — `deriveAurora` already does harmony-based derive-color over OKLCh stops with `gamutMapOKLab`.

The **two structural gaps** the SOTA closes: (1) no edge-preserving Kuwahara post-pass that flattens noise into painterly regions, and (2) the brushwork follows a *made-up* flow field rather than the image's own gradient structure — which is exactly what makes real painting (and Van Gogh specifically) read as intentional.

## Technique 1 — Basic Kuwahara (the floor)

Box around each pixel, split into 4 quadrants; compute mean + variance per quadrant (luminance variance via `dot(var, vec3(0.299,0.587,0.114))`); **output the mean of the lowest-variance quadrant**. Variance selection is what preserves edges — flat regions win, so the image flattens into paint-like patches. Full GLSL in the Heckel writeup. [Maxime Heckel, "On Crafting Painterly Shaders", maximeheckel.com, accessed 2026-06-06](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/); [LYGIA `filter/kuwahara`, lygia.xyz, accessed 2026-06-06](https://lygia.xyz/v1.1.4/filter/kuwahara). Weakness: blocky 4-quadrant artifacts.

## Technique 2 — Generalized (Papari) Kuwahara

Replace the box with a **circular kernel split into 8 sectors**, each weighted by a Gaussian falloff (`sigma = radius/3.0`) from center, then converge by inverse-variance weighting instead of hard min-select. Removes the blocky look, gives smooth rounded patches. The Gaussian per-sector weight can be swapped for a cheaper **polynomial weight** `(x + eta) - lambda*y²` squared-and-clamped (`eta=0.1`, `lambda=0.5`) for perf. [Heckel, accessed 2026-06-06](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/).

## Technique 3 — Anisotropic Kuwahara (the SOTA core)

The canonical oil-painting filter. Kyprianidis/Kang/Döllner 2009; GPU-friendly polynomial reformulation 2010. The kernel **deforms to local image structure** so strokes elongate along feature contours and the result reads as directional brushwork, not mush.

Pipeline (multi-pass):
1. **Structure tensor** via Sobel: `(dot(Sx,Sx), dot(Sy,Sy), dot(Sx,Sy))`, then **Gaussian-blur the tensor** (smooths the orientation field).
2. **Eigenanalysis** → `lambda1, lambda2`; orientation `phi = -atan2(t.y, t.x)`; **anisotropy** `A = (lambda1-lambda2)/(lambda1+lambda2)` (0 = isotropic/flat, →1 = strong edge).
3. **Elliptical kernel**: semi-axes `a = R*clamp((alpha+A)/alpha, …)`, `b = R*clamp(alpha/(alpha+A), …)`, rotated by `phi`. `alpha` (~1.0) controls how aggressively the ellipse stretches.
4. **N=8 sector** sampling with polynomial weights using `_Zeta` (weight spread; high → blur) and `_ZeroCrossing` (sector overlap, edge prominence).
5. **Final converge**: `w_k = 1/(1 + pow(hardness*std_k, 0.5*q))`, output `= sum(m_k*w_k)/sum(w_k)`. `_Sharpness`/`q` sets how defined the color-segment borders are; `_Hardness` controls high-frequency detail retention.

Reference defaults from the canonical Acerola implementation: `_Alpha 0.5–2.0`, `_KernelSize 5–15 px`, `_N 4–8`, `_Hardness 1–5`, `_Q 0.5–2.0`, `_Zeta 0.5–2.0`, `_ZeroCrossing 0.1–0.5 rad`. [Kyprianidis et al., PG2009, kyprianidis.com, accessed 2026-06-06](https://www.kyprianidis.com/p/pg2009/index.html); ["Anisotropic Kuwahara with Polynomial Weighting Functions", EG diglib, accessed 2026-06-06](https://diglib.eg.org/bitstreams/3309663a-3134-44bc-9297-2fa33554277d/download); [GarrettGunnell/Post-Processing `AnisotropicKuwahara.shader`, github.com, accessed 2026-06-06](https://github.com/GarrettGunnell/Post-Processing/blob/main/Assets/Kuwahara%20Filter/AnisotropicKuwahara.shader).

## Technique 4 — Multi-scale anisotropic Kuwahara

Run the filter coarse-to-fine over 3–5 scales (increasing sigma per scale) and combine. Coarse scales remove small clutter and set large flat regions; fine scales add detail without reintroducing noise — the most "finished painting" look. [Kyprianidis et al., NPAR2011, kyprianidis.com, accessed 2026-06-06](https://www.kyprianidis.com/p/npar2011/jkyprian-npar2011.pdf).

## Technique 5 — The structure tensor IS the brushstroke flow field

Key cross-cutting insight: the **same smoothed structure-tensor eigenvector** that orients the Kuwahara kernel is the correct flow field for brushstroke placement. Van Gogh's strokes empirically follow the direction of edges of dominant features — structure-aware, not arbitrary. So a single tensor pass feeds BOTH the painterly flatten AND stroke direction, replacing the aurora's procedural `flowField`. [Kyprianidis (structure-tensor flow), kyprianidis.com, accessed 2026-06-06](https://www.kyprianidis.com/p/pg2009/index.html); ["Thinking Like Van Gogh: Structure-Aware Style", arxiv.org/abs/2601.10075, accessed 2026-06-06](https://arxiv.org/pdf/2601.10075).

## Technique 6 — When to apply / how to combine with the gradient

- Kuwahara is a **post-process over the rendered gradient+noise field**, applied LAST (or just before tonemap). In Susurrus it is literally the only post-pass and still carries the whole look. [Codrops "Susurrus", tympanus.net, 2026-04-24](https://tympanus.net/codrops/2026/04/24/susurrus-crafting-a-cozy-watercolor-world-with-three-js-and-shaders/).
- Underneath it, the gradient should be a **layered-fBM-into-gradient-ramp** field (octaves at decreasing amplitude 0.30/0.26/0.22, opposing flow drift, `pow(t, 3–4)` to bias toward sharp regions) — this is the OpenAI/Stripe-class mesh-gradient substrate the Kuwahara then "paints over." [Alex Harri "A flowing WebGL gradient, deconstructed", alexharri.com, accessed 2026-06-06](https://alexharri.com/blog/webgl-gradients).
- Tune kernel size vs strength carefully — too large loses discernibility. [Heckel, accessed 2026-06-06](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/).

## Technique 7 — Modern WebGPU

Compute shaders + storage textures replace WebGL ping-pong FBOs for the multi-pass tensor→eigen→filter chain: write to a `StorageTexture` at arbitrary positions, no resample-repack between passes. WebGPU is broadly shippable in 2026 (Chrome/Edge/Firefox desktop; Safari 26 across Apple platforms). [Three.js WebGPU compute/storage thread, discourse.threejs.org, accessed 2026-06-06](https://discourse.threejs.org/t/webgpu-compute-storagetexture-to-store-non-color-data/85272); [Phish Chiang "WebGPU — From Ping Pong WebGL To Compute Shader", medium.com, accessed 2026-06-06](https://medium.com/phishchiang/webgpu-from-ping-pong-webgl-to-compute-shader-%EF%B8%8F-1ab3d8a461e2).

## Technique 8 — OKLCh in the loop

Aurora already derives palettes in OKLCh on the CPU but **bakes to linear sRGB and interpolates there** (`composition.glsl.ts:9`, `color.ts`). SOTA mesh gradients interpolate in OKLab/OKLCh to kill muddy mid-tones and hue shifts. Kuwahara's per-sector mean should also be computed in OKLab so averaging two adjacent paint regions doesn't desaturate the boundary. [gradients.fyi OKLCH mesh generator, accessed 2026-06-06](https://gradients.fyi/); [OKLCH perceptual-uniformity rationale, instantgradient.com, accessed 2026-06-06](https://instantgradient.com/blog/mesh_gradient_generator_review).

---

## ADOPT for glass-ui aurora — wave seeds (AW tranche)

Each is a concrete fold against the existing files above. Ordered roughly by dependency.

**AW.W?-a — Structure-tensor pass (the keystone).** Add a Sobel structure-tensor + Gaussian-tensor-smooth + eigen pass that outputs `(tangent.xy, phi, anisotropy)` per pixel. Two consumers from day one (avoids overfit): the new Kuwahara pass AND a rewired `flowField`. WebGL: extra FBO; mark as the WebGPU-migration anchor. Source: Kyprianidis PG2009 / Acerola shader.

**AW.W?-b — Anisotropic Kuwahara post-pass medium.** New peer medium `mediumKuwahara` (or a post-stage flag) running 8-sector elliptical-kernel filtering driven by AW-a's tensor, with uniforms mapping to existing knob vocab: `uKuwaharaRadius`, `uKuwaharaSharpness` (q), `uKuwaharaHardness`, `uKuwaharaZeta`, `uKuwaharaN`. This is the genuine "oil-painting flatten" the current multiplicative mediums can't produce. Apply LAST, before `tonemap.glsl`.

**AW.W?-c — Rewire `flowField` onto the structure tensor.** In `flow.glsl.ts:6`, add a `uFlowPattern == 5` "structure" mode that reads AW-a's eigenvector instead of synthesizing direction. The oil/pastel/crayon mediums then place strokes ALONG real color contours — the single biggest "is this intentional or noise" lever. Keep procedural patterns as presets.

**AW.W?-d — Van-Gogh variant (stroke mode + preset).** Extend `mediumOil`'s `uStrokeMode` (`brush.glsl.ts`/`mediums.glsl.ts:124`) with a `vangogh` mode: shorter dense comma-strokes, strong curvature (raise `bulge`), tight per-stroke broken-color jitter (already have `brokenColorJitter`), high `bristleAmp`, strokes locked to the structure-tensor flow from AW-c, heavier impasto rim. Ship as a palette-agnostic preset (no subject matter — pure congruent brushwork). Source: van Gogh structure-aware paper.

**AW.W?-e — Multi-scale finish.** Make the Kuwahara pass run 2–3 scales coarse-to-fine (increasing sigma). Single `uKuwaharaScales` knob (1 = current/cheap, 3 = gallery). Removes small-scale clutter while holding large flat regions — the "finished" look. Source: Kyprianidis NPAR2011.

**AW.W?-f — In-shader OKLab averaging + interpolation.** Move palette interpolation and Kuwahara per-sector mean into OKLab (the repo already has `srgbToOKLab`/`oklabToLinearSRGB` JS; port the matrices into the shared `procedural-color.glsl.ts` chunk noted in CLAUDE.md). Kills muddy boundaries where two paint regions average. Source: OKLCh perceptual-uniformity refs.

**AW.W?-g — Simplified atom-of-control knob collapse.** Current oil medium exposes ~15 stroke uniforms. Collapse to 3–4 "atoms": **zones** (palette/nuclei density), **noise** (domain-warp + fBM character), **paint** (a single 0–1 "painterliness" that co-drives Kuwahara radius+sharpness AND stroke amount/anisotropy). Map the fine uniforms as derived functions of the atoms; keep advanced knobs behind a power-user surface. Aligns with the "atoms of control" goal.

**AW.W?-h — WebGPU compute backend (forward-looking).** Re-express the tensor→eigen→Kuwahara multipass as WebGPU compute + storage textures behind the existing `AuroraRenderMode` seam (`renderMode.ts:9`) — add a `"webgpu"` tier that auto-resolves when `navigator.gpu` is present, falling back to the WebGL FBO path. Removes ping-pong overhead for the new multi-pass chain. Source: Three.js WebGPU compute / Phish Chiang ping-pong→compute.

**AW.W?-i — Dynamic/interactive coupling.** The cursor already perturbs `flowField`; extend it to locally raise `anisotropy`/lower Kuwahara radius near the cursor (a "wet brush dragging through wet paint" smear) — interactive without a new input surface. Cheap, reads as alive.

Notes for the tranche author: AW-a is the hard dependency for b/c/d/e/i and the WebGPU motivation for h; ship it first. The aurora's existing brush SDF system (`brush.glsl.ts`) is complementary, not redundant — Kuwahara flattens the field into regions, the SDF strokes lay visible bristle-marks on top; van-gogh mode is the two working in registration via the shared tensor flow.

---

### Lane 11

I have a comprehensive picture. Let me synthesize the brief.

Brief follows.

---

# SOTA brief: procedural canvas/paper/tooth texture synthesis for the Aurora painterly backdrop

Lane: **canvas-paper-texture** — the substrate grain that interacts with pigment. Research only; wave-seeds at the end. All findings cross-referenced against the current implementation in `src/components/custom/aurora/`.

## What Aurora already does (the baseline to better)

The existing shader is mature. Reading `mediums.glsl.ts` and `aurora.frag.ts`:

- **Granulation is already modeled as pigment-in-tooth** — `mediums.glsl.ts:39-42`: `paper = 0.5*vnoise(p*160) + 0.5*vnoise(p*360)`, then `col *= 1 - uGranulation * pigLoad * (paper-0.5)` where `pigLoad = 1 - luma`. Darker (heavier) pigment settles more. This is physically the right shape but it's a flat multiply, not a height-field deposition.
- **Canvas tooth = anisotropic linen weave** — `mediums.glsl.ts:222-226`: two `vnoise` octaves stretched `vec2(0.6, 2.4)`, multiplied at `toothAmp * uCanvasGrain`. Single-channel, no height/normal, no light interaction.
- **Crayon tooth** (`mediums.glsl.ts:75-122`) is the most evolved: multi-scale anisotropic `vnoise` rotated to flow, "pressed crumbs", "waxy film" highlight, broken-color pigment cells. Closest to real substrate-pigment behavior already.
- **Oil strokes** are 4-layer curved SDF brushstrokes with bristle streaks + impasto (`mediums.glsl.ts:124-232`, `brush.glsl`).
- **Post**: ACES tonemap → `uPaperGrain` hash dither → linear→sRGB OETF → IGN dither (`aurora.frag.ts:329-343`).

The gaps versus SOTA, in one line each: tooth is a **flat luminance multiply, not a height-field with light**; pigment is **averaged in RGB, not subtractively mixed**; brushstrokes are **procedural SDFs, not structure-tensor/flow-tensor-oriented**; everything is **single-pass fragment, no compute/feedback** so no wet-on-wet diffusion or true granular settling; color is OKLCh at authoring but the medium math runs in linear-RGB.

## Findings (techniques + citations)

### 1. Substrate is a height-field; granulation is gravity into its valleys

The physical model the references converge on: paper/canvas has a micro-relief **height-field**; heavy/large pigment particles **settle into the valleys**, light/small particles stay on **peaks**, and the visible granular speckle is that sorting. Rough/cold-press paper amplifies it because "the tooth catches pigment differently at every point" ([Natural Pigments, "Measuring Watercolor Granulation"](https://www.naturalpigments.com/artist-materials/measuring-watercolor-granulation); [Strathmore, "All About Watercolor Granulation"](https://www.strathmoreartist.com/blog-reader/all-about-watercolor-granulation-by-sarah-becktel); accessed 2026-06-06). The painterly-rendering literature uses exactly this: "a height-field representation can model both the canvas substrate and the impasto accumulation of paint... per-pixel height contributions procedurally perturbed to emulate bristle-induced ridges and grooves" ([Differentiable Stroke Planning, arXiv 2604.02752](https://arxiv.org/pdf/2604.02752); accessed 2026-06-06).

Adoptable shape: build one shared **paper height-field `H(p)` in `[0,1]`** (multi-octave fBm + anisotropic weave + a coarse cold-press lump), derive a **surface normal** from `H`'s gradient, and make every medium read `H`. Granulation becomes `settle = smoothstep(peak, valley, H)` weighted by particle weight; tooth becomes a **lambert term** off the normal under a fixed key light (gives real ridge/valley shading instead of a value multiply). This is the single highest-leverage change — it unifies the four currently-separate tooth blocks onto one substrate and makes them physically coherent.

### 2. Pigment must mix subtractively, not by RGB average — and the licensing fork matters

RGB/linear interpolation produces "desaturated, muddy midtones"; subtractive Kubelka-Munk mixing makes yellow+blue go through green and keeps saturation up ([Mixbox README, scrtwpns/mixbox](https://github.com/scrtwpns/mixbox); accessed 2026-06-06). Two GPU paths:

- **Mixbox** — 16-pigment latent space, `mixbox_lerp()` + a LUT texture, SIGGRAPH 2021. **License is CC BY-NC 4.0 — unusable in a shipped/commercial library.** Note it and move on.
- **Spectral.js** — **MIT licensed**, ships `spectral.glsl` for WebGL, generates spectral reflectance curves 380–750 nm with K-M absorption/scattering, and already uses **OKLab/OKLCh** for perceptually-uniform gamut mapping ([CSS Script, "Spectral.js"](https://www.cssscript.com/realistic-color-mixing-spectral/); accessed 2026-06-06). This is the shippable path and it's natively OKLCh-aligned, fitting Aurora's "full OKLCh" goal.
- DIY: single-constant K-M (`K/S = (1-R)²/2R`, mix in K/S, invert) is ~10 lines of GLSL and dependency-free — the [vanity_ibex Kubelka-Munk VEX writeup](https://vanity-ibex.xyz/blog/kubelka_munk_colormixing/) and [PaintMixer (lindemeier)](https://github.com/lindemeier/PaintMixer) document the math (accessed 2026-06-06).

Aurora's palette is already baked to linear sRGB and ACES-tonemapped in linear (`aurora.frag.ts:150-152`); subtractive mixing would replace the `mix()` in `samplePalette`/region-blend with a K-S lerp so nuclei boundaries blend like wet paint, not like cross-fading lights.

### 3. Brushstroke atoms: orient by structure tensor / flow tensor (the Van Gogh path)

The current oil brush is a jittered SDF along a hand-authored `flowField`. SOTA orients strokes by the **structure tensor**: Sobel gradients → tensor `J = [[Gx², GxGy],[GxGy, Gy²]]` → eigen-decompose → the minor-eigenvector angle is the stroke direction, the eigenvalue ratio is the anisotropy/aspect ([Maxime Heckel, "On Crafting Painterly Shaders"](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/); [Kyprianidis et al. 2009, "Image and Video Abstraction by Anisotropic Kuwahara Filtering"](https://www.kyprianidis.com/p/pg2009/index.html); [Godot anisotropic Kuwahara shader](https://godotshaders.com/shader/anisotropic-kuwahara-filter/); all accessed 2026-06-06). The Godot shader's parameter set is a ready vocabulary: `KernelSize`, `Hardness` (detail preservation), `Sharpness` (`pow(Hardness*1000*sigma², 0.5*Sharpness)` — splotch definition), `Zeta` (polynomial weight spread), 8 sectors.

The Van Gogh specifics, from a 2026 paper, are unusually clean and directly mappable:
- **Stroke = anisotropic primitive**; elongate by maximizing the **eigenvalue ratio** `η₂/η₁`, and concentrate energy **along** stroke vs perpendicular ([arXiv 2601.10075, "Thinking Like Van Gogh"](https://arxiv.org/abs/2601.10075); accessed 2026-06-06). This is exactly `uStrokeAnisotropy` but derived from the field rather than a uniform.
- **Chrominance/lightness decoupling**: constrain only the **a/b (chroma) channels**, free **L (lightness)** to deform with geometry — this is what prevents "muddy color artifacts" under aggressive stroke deformation. In OKLCh terms: let the stroke/impasto modulate **L only**, lock **C and h** to the underlying nucleus palette. Aurora currently jitters hue in `brokenColorJitter` — the paper says hue jitter should be small and **value/L is the load-bearing variation axis** for stroke depth.
- The older [Sharma TAMU thesis, "A Van Gogh inspired 3D Shader Methodology"](https://core.ac.uk/download/pdf/147237812.pdf) gives the practical atom: sample random positions, read color + a **flow map** to set per-stroke direction, draw oriented strokes (accessed 2026-06-06). Aurora's `bestOil` is one good-quality variant of this; orienting it by structure tensor + per-stroke L-from-height gives congruent-to-real-Van-Gogh directionality and depth without subject matter.

### 4. Atmosphere/mesh-gradient pole: flow-noise domain warp beats static fBm warp

For the smooth/OpenAI/Stripe pole, the SOTA upgrade over Aurora's Quilez double-warp (`aurora.frag.ts:206-225`) is **flow noise** — displace coordinates by the **analytic gradient** of the noise (Perlin–Neyret flow noise), which gives directional, current-like motion and "fewer directional artifacts, eliminating ad-hoc rotations" ([Inigo Quilez, "Domain warping"](https://iquilezles.org/articles/warp/) and ["fBm"](https://iquilezles.org/articles/fbm/); [pkh.me, "Sharing everything about gradient noise"](https://blog.pkh.me/p/42-sharing-everything-i-could-understand-about-gradient-noise.html); [Alex Harri, "A flowing WebGL gradient deconstructed"](https://alexharri.com/blog/webgl-gradients); all accessed 2026-06-06). Combined with the existing breath-paced drift, this is what makes the smooth mode read as living gradient-art rather than a noise field. Mesh-gradient generators that lead in 2026 stack noise-warp + OKLCh/OKLab + film-grain overlay exactly this way ([Instant Gradient, "7 Mesh Gradient Generators Compared (2026)"](https://instantgradient.com/blog/mesh_gradient_generator_review); accessed 2026-06-06).

### 5. Reaction-diffusion as a texture *generator*, not the look itself

Gray-Scott RD produces organic coral/marbling/granular-clump fields ([amandaghassaei/ReactionDiffusionShader](https://github.com/amandaghassaei/ReactionDiffusionShader); [piellardj/reaction-diffusion-webgl](https://github.com/piellardj/reaction-diffusion-webgl); [MROB Gray-Scott Explorer](http://www.mrob.com/pub/comp/xmorphia/ogl/index.html); all accessed 2026-06-06). Crucially, Amanda Ghassaei's variant **adds a vector field that orients the diffusion** — feed Aurora's flow field in and the RD clumps align to brushstroke direction, which is exactly the granulation/clumping van-Gogh pigment-settling pattern. RD is **stateful** (needs ping-pong feedback), so it's a multi-pass / compute addition, not a single-pass fragment tweak. Best used as: bake an RD **granulation/settling mask** once per resize into a texture, then the single-pass medium shader samples it. This keeps the main render single-draw.

### 6. WebGPU is the modern substrate for the stateful work

WebGPU shipped broadly by 2026 (Chrome/Edge/Firefox desktop; Safari 26 on macOS/iOS/iPadOS/visionOS) ([Weskill, "WebGPU & the Future of Graphics: 2026"](https://blog.weskill.org/2026/04/webgpu-future-of-graphics-building-2026.html); accessed 2026-06-06). The compute-shader RD pattern: two **storage textures** ping-ponged, workgroup size 64, a **shared-memory pixel cache** prefetching the 3×3 Laplacian neighborhood behind a workgroup barrier — "compute variants significantly outperform fragment approaches" ([Codrops, "Reaction-Diffusion Compute Shader in WebGPU"](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/); accessed 2026-06-06). For true wet-on-wet, the shallow-water/Stam fluid path runs in WGSL compute at interactive rates ([kishimisu/WebGPU-Fluid-Simulation](https://github.com/kishimisu/WebGPU-Fluid-Simulation), Stam "Real-Time Fluid Dynamics for Games"; accessed 2026-06-06). The pragmatic posture: keep the WebGL2 single-pass core as the floor, add a **WebGPU compute tier** (gated like Aurora's existing `resolveRenderMode` device-tier resolver) that pre-bakes RD granulation + optional wet diffusion into textures the fragment core samples.

### 7. Anisotropic Kuwahara as an optional *finish* pass

Running an anisotropic Kuwahara pass over the composited atmospheric output flattens regions along feature directions while keeping edges crisp — "the clearness of cartoon illustrations while exhibiting directional information as found in oil paintings" ([Kyprianidis 2009](https://www.kyprianidis.com/p/pg2009/index.html); accessed 2026-06-06). It's multi-pass (structure tensor → filter), so it's a tier-gated finish, not the core. It would give the smooth pole an instant painterly "abstracted" variant without authoring strokes.

---

## ADOPT for glass-ui aurora — wave-seed list

Each is a concrete AW (next aurora tranche) wave/fold. Ordered by leverage-per-risk. All preserve the single-draw WebGL2 core unless marked **[tier]**.

- **AW.W-tooth — unified paper height-field + normal substrate.** Replace the four separate tooth blocks (`mediums.glsl.ts:40, 61-63, 104-106, 222-226`) with one shared `paperHeight(p)` (fBm + anisotropic weave + coarse cold-press lump) and a derived normal. Every medium reads it. Tooth becomes a lambert shade off a fixed key light, not a value multiply. Single new uniform `uPaperRoughness` (smooth hot-press → rough cold-press). Highest leverage; dependency-free; pure fragment.

- **AW.W-granulate — gravity-into-valleys granulation.** Re-derive granulation as `settle = smoothstep(peakThresh, valleyThresh, H) * particleWeight`, where `particleWeight` is a per-nucleus pigment property (new `OklchStop`/nucleus field, e.g. `granular: 0..1`). Heavy pigments speckle in valleys, light ones stay on peaks — the real watercolor model. Folds the current `pigLoad` logic into the height-field from W-tooth.

- **AW.W-subtractive — Kubelka-Munk / spectral pigment mixing.** Swap the region-blend and palette `mix()` for subtractive K-M lerp. Ship either the MIT **spectral.glsl** (already OKLCh-native) or a ~10-line single-constant K-M inline (zero-dep, preferred for the "no external libraries" invariant in DESIGN.md §3). Note Mixbox is CC BY-NC — **do not adopt**. Makes nuclei boundaries blend like wet paint. New `uPigmentMix: 0..1` to dial RGB↔subtractive.

- **AW.W-tensor — structure-tensor stroke orientation.** Derive oil/pastel stroke direction from the local structure tensor of the base color field (Sobel → eigen) instead of only the authored `flowField`. Blend authored-flow ↔ tensor-flow by a new `uStrokeFollow: 0..1`. Strokes then curl around color regions like real brushwork. Reuses the existing `bestOil` SDF; only the direction source changes.

- **AW.W-vangogh — L-decoupled impasto + congruent stroke depth.** Implement the "Thinking Like Van Gogh" decoupling in OKLCh: stroke/impasto modulates **L only**, locks **C/h** to the nucleus palette; depth comes from height-field normal + L variation, not hue jitter. Reduce `brokenColorJitter` hue range, raise its value/L range. Add a dedicated `strokeMode: "vangogh"` (anisotropy from eigenvalue ratio, tight directional energy, swirling tensor flow). Delivers the "proper atomic brushstrokes, depth, variation, congruent to real Van Gogh, no subject matter" ask.

- **AW.W-flownoise — flow-noise domain warp for the smooth pole.** Upgrade `domainWarp` (`aurora.frag.ts:206`) to displace by the analytic noise gradient (Perlin–Neyret flow noise) for current-like, artifact-free motion. Directly raises the smooth/atmospheric mode above static-fBm Stripe/OpenAI mesh gradients. Pure fragment; reuses breath drift.

- **AW.W-derive — derive-color variant from atoms of control.** A generator that takes a single seed color (or 1–2 anchors) + OKLCh rules (analogous/complementary/triadic spans, L/C ramps) and emits the full nucleus palette + value biases. Satisfies the "derive-color variant" and "atoms of control / simplified options" asks. CPU-side in `color.ts`; no shader change.

- **AW.W-rd [tier] — reaction-diffusion granulation bake.** Gray-Scott RD with a flow-oriented vector field (Ghassaei variant), baked once per resize into a granulation/clumping mask texture the single-pass medium samples. Adds organic pigment-clump structure to granulation/oil. Stateful → ping-pong; gate behind `resolveRenderMode` high tier so the low-tier path stays single-draw.

- **AW.W-webgpu [tier] — WebGPU compute tier.** Add a WebGPU backend (mirroring the goo-blob/`useWebGLCanvas` substrate's tiering) for the stateful work: compute-shader RD bake (storage textures, workgroup 64, shared pixel cache) and an optional Stam shallow-water wet-on-wet diffusion pass for true watercolor bleed. WebGL2 stays the universal floor; WebGPU is the enhanced tier where available (Safari 26+ now covers Apple platforms).

- **AW.W-kuwahara [tier] — anisotropic Kuwahara finish.** Optional post pass (structure tensor → 8-sector polynomial-weighted Kuwahara) over the atmospheric output for an instantly-abstracted painterly variant with no authored strokes. Parameter vocabulary: `kernelSize`, `hardness`, `sharpness`, `zeta`. Multi-pass → tier-gated finish.

### Net architecture note
The four small folds (W-tooth, W-granulate, W-subtractive, W-flownoise) stay inside the existing single-pass WebGL2 shader and DESIGN.md's "single draw / no deps" invariant — they're the stunning-now path. W-tensor + W-vangogh upgrade brushwork in place. The stateful/heavy work (W-rd, W-webgpu, W-kuwahara) is explicitly **tier-gated** so it never regresses the low-end single-draw floor — consistent with `resolveRenderMode` and the offscreen-pause substrate. W-derive is the "atoms of control / simplified options" headline and is pure CPU OKLCh.

Key files for the implementing tranche: `src/components/custom/aurora/constants/shaders/mediums.glsl.ts` (tooth/granulation/strokes), `aurora.frag.ts:206-247` (domain warp), `brush.glsl` (stroke SDF), `composition.glsl` (palette blend → subtractive mix), `composables/color.ts` (OKLCh + derive-color), `constants/renderMode.ts` (tier gating for the WebGPU/RD/Kuwahara tiers).

---

### Lane 12

I have comprehensive material across all the requested frontiers. Let me synthesize the brief. I'll ground the findings against the existing implementation I read (specific file:line references).

---

# SOTA Research Brief — Aurora Procedural Paint-Medium Rendering
**Lane: palette-knife-medium** · tranche-development (research + wave-seeds only, NO implementation) · 2026-06-06

## 0. Where the current aurora stands (grounding)

The aurora is already a serious painterly engine, not a naive mesh-gradient. The substrate worth knowing before reading the SOTA:

- **Composition** = N OKLCh palette stops + up to 6 anisotropic Gaussian "nuclei" with a softmax blend, plus a Quilez double domain-warp (`aurora.frag.ts:206-247`, `domainWarp`).
- **Mediums** are dispatched as four peers at `main()` (`aurora.frag.ts:321-324`): `mediumPastel`, `mediumWatercolor`, `mediumOil`, `mediumCrayon`.
- **Oil** is genuinely stroke-based: a curved swept-brushstroke SDF (`brush.glsl.ts:72` `curvedStroke`), best-of-9-neighbor cell placement (`brush.glsl.ts:188` `bestOil`), 4 stacked stroke layers + optional crosshatch, per-mode params for `oil/knife/brushwork` (`mediums.glsl.ts:124-232`).
- **Impasto** today = a fake rim highlight + shadow on opposite stroke sides (`brush.glsl.ts:173-178`), NOT a real height-field/normal relight.
- **Color** is linear-sRGB baked CPU-side from OKLCh (`color.ts`), with a real `deriveAurora()` one-seed→harmonious-palette already shipping (`color.ts:152`), gamut-mapped through value.js. Mixing inside the shader is plain **linear-RGB lerp** (the palette LUT + medium multiplies) — NOT pigment mixing.
- **Flow** drives stroke direction but is a hand-authored pattern field (`none/radial/swirl/diagonal/multi`), NOT derived from the image's own structure.

So the gaps the SOTA closes: (1) impasto is faked, not relit height; (2) stroke direction is a pattern, not the gradient's structure tensor; (3) color mixing is RGB-lerp, not pigment; (4) watercolor is a thin edge-darken trick, not a bleed/granulation model; (5) no WebGPU compute path; (6) Van Gogh mode is just an oil stroke-mode, not atomic discrete strokes.

---

## 1. Findings by technique (with citations)

### 1.1 Anisotropic Kuwahara — the canonical "make it look oil-painted" filter
The Kuwahara filter centers a window, splits it into sectors, and emits the mean color of the lowest-variance sector — edge-preserving smoothing that erases texture but keeps boundaries, reading as flat painterly patches. The Papari extension uses a circular kernel + 8 sectors + Gaussian/polynomial weighting; the **anisotropic** variant warps the kernel into an ellipse oriented and scaled by the local **structure tensor**, so patches follow image features like real brushwork. GPU implementations run real-time; a multi-pass pipeline (structure tensor → anisotropic Kuwahara → tonemap) is standard. Bump-mapping from the orientation field adds an impasto "thickness" cue.
— Maxime Heckel, *On Crafting Painterly Shaders* (blog, accessed 2026-06-06), https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ ; Kyprianidis/Kang/Döllner, *Image and Video Abstraction by Anisotropic Kuwahara Filtering* (ResearchGate), https://www.researchgate.net/publication/220507613 ; Gao/Li, *Oil Painting Style Rendering Based on Kuwahara Filter* (2019), https://www.semanticscholar.org/paper/337e39c942e0c73c4d587f59a79639141210f7bc

> Relevance: the aurora generates its own color field, so it can compute a structure tensor on its *own* output cheaply (no input image). This is the single highest-leverage adopt — it makes EVERY medium follow the gradient's real grain instead of a hand-authored flow pattern.

### 1.2 Structure tensor + eigenvector flow — brushstrokes that follow the image
The structure tensor J = [[Jxx,Jxy],[Jxy,Jyy]] is built from Gaussian-smoothed gradient products (Sobel). Its eigenvectors give the dominant local orientation; **coherence** α = ((λ₁−λ₂)/(λ₁+λ₂))² measures how directional the region is (use it to set stroke length/width and to fade strokes in flat zones). This is more robust to noise and smoother than raw gradient direction.
— Maxime Heckel (above) ; tractography paper §structure-tensor (below).

### 1.3 Tractography streamlines — long coherent strokes (the Van Gogh swirl)
A Nov-2025 paper ports DTI streamline tracing to painterly rendering: seed strokes in cells where color error exceeds a threshold, then **integrate along the structure tensor's eigenvector** with RK2(3) until coherence < 0.5 or max length, simplify (Ramer-Douglas-Peucker), fit to Bézier, color from the tract midpoint. Multi-layer coarse→fine (widths 50/25/5/2.5 px). Produces the long, curved, flow-following strokes that read as Van Gogh's swirling fields. Offline (~15 min) as written, but the *integration idea* is the value — short fixed-step streamlines are cheap in a fragment shader.
— Hertz et al., *Applying Medical Imaging Tractography Techniques to Painterly Rendering of Images* (arXiv 2511.00702, 2025-11), https://arxiv.org/html/2511.00702v1

### 1.4 Impasto as real height field + relighting (the missing depth)
To get tactile oil, build a **height field** = canvas substrate (fBm + weave) + per-stroke paint accumulation, perturb procedurally for bristle ridges/grooves, then derive a normal (screen-space derivative of height) and do a directional diffuse+specular relight. Thickness-aware: thin strokes inherit canvas roughness, thick impasto overrides it. This is what makes impasto catch a raking light instead of a painted-on rim.
— Suruchi Sharma, *A Van Gogh Inspired 3D Shader Methodology* (thesis, TAMU), https://core.ac.uk/download/pdf/147237812.pdf ; *Painterly Lighting through Normal Map Deformation*, F. Indeherberge (ArtStation), https://www.artstation.com/artwork/LeVn9A ; height-field impasto summary in the search corpus.

> Relevance: the aurora's impasto today (`brush.glsl.ts:173-178`) is a fixed rim/shadow. Replacing it with an accumulated paint-height → `dFdx/dFdy` normal → single moving key-light is a clean upgrade and unifies oil/knife/Van Gogh/crayon under one lighting model with a `--light-angle` knob (which becomes a gorgeous interactive axis).

### 1.5 Pigment mixing (Kubelka-Munk / Mixbox) — paint that mixes like paint
RGB lerp of blue+yellow gives muddy gray; real pigment gives vibrant green. Kubelka-Munk models this via spectral absorption/scattering. **Mixbox** is a drop-in `mixbox_lerp(rgb1, rgb2, t)` with a real **GLSL implementation** (also HLSL/WGSL ecosystem) — it converts to a latent CMYK+residue space, K-M mixes there, returns RGB. **spectral.js** is an MIT-licensed K-M alternative (7 primary curves) usable in JS/GLSL. Caveat: Mixbox is CC BY-NC (non-commercial free; commercial license needed) — spectral.js is the permissive choice.
— Mixbox / Secret Weapons, https://scrtwpns.com/mixbox/ ; spectral.js (rvanwijnen), https://github.com/rvanwijnen/spectral.js ; *Generating Spectral Paint Curves With ML*, L. Wander, https://larswander.com/writing/spectral-paint-curves/ ; K-M theory, https://en.wikipedia.org/wiki/Kubelka%E2%80%93Munk_theory

> Relevance: where overlapping strokes meet today, they hard-composite (`brush.glsl.ts` `paintOver` does `mix(col,c,alpha)` in linear RGB). Pigment-mixing the overlap is the difference between "mesh gradient" and "wet paint." High-impact for the painterly modes; gate it behind a `pigmentMix` flag for cost.

### 1.6 OKLCh/OKLab — the perceptual baseline (already mostly done, one refinement)
OKLab for *interpolating between* colors; OKLCh for *modifying* L/C/h of one color. Tailwind v4 shipped on OKLCh for gradients then **reverted to OKLab** before release because OKLCh hue interpolation between opposing hues detours through colors humans can't perceive. Browser support is ~95%+ (Chrome/Edge 111+, Safari 15.4+, FF 113+).
— Tailwind issue #14955, https://github.com/tailwindlabs/tailwindcss/issues/14955 ; *OKLCH gradient criticism* (BigGo, 2025-08), https://biggo.com/news/202508251312_OKLCH_Color_Model_Criticism ; Blue Monkey Makes, https://bluemonkeymakes.com/articles/oklch-makes-better-gradients

> Relevance: aurora already bakes OKLCh→linear CPU-side and derives palettes in OKLab via value.js — good. The refinement: the shader's palette LUT blends the baked stops in *linear RGB*, which can dull mid-stops. Blending in OKLab (or storing an OKLab LUT) keeps mid-gradient chroma up. Minor but on-brand.

### 1.7 The Stripe/OpenAI mesh-gradient baseline (what to beat)
Stripe's effect is ~10kb / ~800 lines: minigl + fBm Simplex (multi-octave) + sinusoidal UV mesh warp + a CSS `skewY(-12deg)` container trick for the diagonal. That's the entire bar. The aurora's nuclei+softmax+domain-warp+mediums already exceed it on richness; the gap is purely *finish* (depth, pigment, structure-following strokes), not architecture.
— Bram.us, *How To create the Stripe Website Gradient Effect*, https://www.bram.us/2021/10/13/how-to-create-the-stripe-website-gradient-effect/ ; Stripe mesh-gradient WebGL gist, https://gist.github.com/jshaw/a7315da7b4d1be3ef341009c1ca72c99

### 1.8 Flow foundations (domain warping / curl noise)
Quilez domain-warping = `f(p + f(p + f(p)))`; warping by the noise *gradient* (flow noise) gives directional smear; **curl noise** (curl of an fBm potential) gives divergence-free fluid-like motion ideal for animated, never-pooling drift. A 2025 SIGGRAPH Asia paper ("Improving Curl Noise") refines artifacts.
— iquilezles.org/articles/warp/, https://iquilezles.org/articles/warp/ ; *Improving Curl Noise* (SIGGRAPH Asia 2025), https://dl.acm.org/doi/10.1145/3757377.3763980 ; al-ro curl noise, https://al-ro.github.io/projects/particles/

> Relevance: aurora's drift is the warp scroll + nuclei orbit. A curl-noise term on the flow field (instead of the current `uFlowCurl` local perturbation in `bestOil`, `brush.glsl.ts:209`) gives a more convincingly *liquid* animation for the smooth/watercolor modes.

### 1.9 Watercolor — Curtis/Kubelka-Munk model (the real bleed)
Canonical watercolor = shallow-water sim on a paper-height model + Kubelka-Munk pigment compositing, yielding edge-darkening (pigment deposited where water evaporates at the stroke rim), granulation (pigment settling in paper tooth), backruns/blooms, and pigment separation. Lightweight procedural variants (vector pigment advection) run real-time. The aurora's watercolor today (`mediums.glsl.ts:26-48`) does edge-darken + granulation as luma-gradient tricks — correct instinct, shallow model.
— Curtis et al., *Computer-Generated Watercolor* (SIGGRAPH '97), https://grail.cs.washington.edu/projects/watercolor/paper_small.pdf ; *GPU Programming for Real-Time Watercolor Simulation* (TAMU thesis), https://oaktrust.library.tamu.edu/server/api/core/bitstreams/5575e4a6-40fd-4946-ad32-f83712ddc02f/content ; *A lightweight, procedural, vector watercolor engine* (I3D 2012), https://dl.acm.org/doi/10.1145/2159616.2159627

### 1.10 WebGPU compute path
WebGPU exposes a real compute pipeline (WebGL2 has none — everything is fragment-shader workaround). For stroke-based rendering this matters: strokes can be generated in a compute pass into a storage buffer (workgroup shared memory, `workgroupBarrier`) instead of the per-pixel best-of-9 brute force the aurora does now (`bestOil` samples 9 cells × 4 layers PER PIXEL). Order-of-magnitude wins for particle/procedural workloads. The glass substrate already has a WGSL path (`src/composables/glass/webgpu/glassShader.wgsl`).
— webgpufundamentals compute basics, https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html ; Three.js Roadmap, *WebGL vs WebGPU*, https://threejsroadmap.com/blog/webgl-vs-webgpu-explained ; W3C WGSL, https://www.w3.org/TR/WGSL/

### 1.11 Stroke-based rendering theory (atoms, greedy vs optimized)
SBR = compositing discrete marks onto a canvas. Two families: **greedy** placement (Hertzmann's "curved brush strokes of multiple sizes" — coarse layers first, refine where error is high) and **optimization** (iteratively adjust to minimize objective). Strokes-as-atoms, coarse→fine layering, gap-fill passes. The aurora's 4-layer `mediumOil` is exactly Hertzmann's coarse→fine layering done per-pixel; the theory says to add an error-driven *seeding* step so strokes land where the gradient actually needs them.
— Hertzmann, *Painterly rendering with curved brush strokes of multiple sizes* (SIGGRAPH '98), https://dl.acm.org/doi/10.1145/280814.280951 ; Hertzmann, *Stroke-Based Rendering* (course notes), https://www.cs.ucdavis.edu/~ma/SIGGRAPH02/course23/notes/S02c23_3.pdf

---

## 2. Synthesis — the distinct-media model

The unifying insight: **separate the three layers that today are entangled in each medium function** —
1. **Color field** (composition: nuclei + warp + palette) — medium-independent.
2. **Direction field** (should come from the *structure tensor of the color field*, replacing/augmenting the authored flow pattern) — shared by all media.
3. **Medium surface** (how pigment sits: bleed vs tooth vs ridge vs chalk) — the per-medium part, but all reading ONE shared **paint-height field** that a single relight pass lights.

Each medium then = a recipe over {direction field, height field, mixing rule, grain}:
- **Watercolor** = no height (flat), structure-tensor-guided wet-edge darkening + granulation + K-M glaze where washes overlap.
- **Pastel/chalk** = low height, high tooth grain, broken color, soft K-M-ish layering.
- **Oil impasto / palette-knife** = high height accumulation, sharp knife edges (high hardness), specular relight, pigment-mix on overlap.
- **Van Gogh** = structure-tensor streamline strokes (short RK2 integration), high impasto, broken color along the stroke, the swirl coming from the flow+curl field — atomic strokes, not a texture multiply.

---

## 3. ADOPT for glass-ui aurora — wave-seed list (tranche "AW")

Each is a concrete, independently-shippable fold. Ordered by leverage. These are SEEDS — sizing/gating happens at tranche planning.

- **AW.W1 — Structure-tensor direction field.** Compute the structure tensor of the aurora's own color field (Sobel on `sampleBase`, Gaussian-smoothed gradient products), extract the dominant eigenvector + coherence. Feed it into `bestOil`'s `flow` (`brush.glsl.ts:206`) and every medium's flow read, replacing the hand-authored pattern as the *default*. Strokes now follow the gradient's real grain. Coherence drives stroke length/opacity (fade in flat zones). Highest leverage — every medium improves at once. *Refs 1.1, 1.2.*

- **AW.W2 — Real impasto height + relight.** Replace the fake rim/shadow (`brush.glsl.ts:173-178`) with a shared **paint-height accumulator**: strokes add height, canvas weave is base height, derive a normal via `dFdx/dFdy`, do one directional diffuse+specular pass with a `--light-angle` uniform. Unifies oil/knife/Van-Gogh/crayon lighting; makes a moving/interactive key-light the headline interaction. *Refs 1.4.*

- **AW.W3 — Van Gogh atomic-streamline mode.** New stroke mode: short fixed-step RK2 streamline integration along the structure-tensor eigenvector (from AW.W1) for genuinely *long, curved, flow-following* strokes, broken-color along the spine, max impasto. This is the "proper atomic brushstrokes, congruent to real Van Gogh, no subject matter" ask. Builds on W1+W2. *Refs 1.3, 1.11.*

- **AW.W4 — Pigment mixing on overlap.** Swap the linear-RGB `mix()` in `paintOver` (and stroke-meets-stroke boundaries) for spectral Kubelka-Munk mixing via **spectral.js GLSL** (MIT — avoid Mixbox's non-commercial license). Gate behind a `pigmentMix` config flag for cost. Turns overlapping strokes from "blended pixels" into "wet paint." *Refs 1.5.*

- **AW.W5 — Watercolor bleed/granulation upgrade.** Promote `mediumWatercolor` from luma-gradient edge-darken to a proper model: structure-tensor-guided wet-edge pigment deposition, paper-tooth granulation already present, plus backrun blooms and K-M glaze where washes overlap. Keep it lightweight (procedural advection, not full shallow-water). *Refs 1.9.*

- **AW.W6 — Anisotropic-Kuwahara "smooth+" medium.** Add a Kuwahara-filtered variant of the `smooth` medium (structure-tensor-oriented elliptical kernel) that reads as flat painterly patches — the clean modern-poster look that beats Stripe/OpenAI mesh gradients on finish without strokes. Reuses the W1 structure tensor. *Refs 1.1.*

- **AW.W7 — OKLab in-shader blend.** Store the palette LUT in OKLab (or blend the baked stops in OKLab not linear-RGB) so mid-gradient chroma holds. Small, pairs with the existing OKLCh CPU bake; closes the one perceptual gap. *Refs 1.6.*

- **AW.W8 — Curl-noise flow for liquid drift.** Replace/augment the local-curl perturbation (`brush.glsl.ts:209`, `uFlowCurl`) and the warp scroll with a divergence-free curl-noise term so smooth/watercolor animation reads as flowing liquid that never pools. *Refs 1.8.*

- **AW.W9 — WebGPU compute stroke pass.** Move stroke generation from per-pixel best-of-9 (`bestOil`, 9 cells × 4 layers every pixel) to a WebGPU compute pass that emits strokes into a storage buffer once per frame; fragment pass just composites. Big perf headroom for dense Van-Gogh stroke counts; the glass substrate already has a WGSL path to extend. Keep the WebGL2 fragment path as fallback. *Refs 1.10.*

- **AW.W10 — Simplified author surface + one-seed derive.** The user wants "atoms of control" + "simplified options." Collapse the ~25 medium/stroke uniforms behind a small set of perceptual knobs (e.g. `medium`, `texture` 0–1, `light` angle, `density`, `flow`) that fan out to the low-level uniforms — and lean on the already-shipping `deriveAurora(seed)` (`color.ts:152`) so a consumer gives ONE color + a medium and gets a stunning backdrop. Pure ergonomics layer over W1–W9. *Refs 1.6, existing `deriveAurora`.*

- **AW.W11 — Error-driven stroke seeding (stretch).** Add a coarse error-estimate so strokes seed where the color field has high local variance (Hertzmann's difference-image idea) instead of uniform density gating (`brush.glsl.ts:199`). Sharpens detail zones, saves strokes in flat zones. *Refs 1.11.*

---

## 4. Sources
- Maxime Heckel, *On Crafting Painterly Shaders* — https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ (accessed 2026-06-06)
- Kyprianidis/Kang/Döllner, *Image and Video Abstraction by Anisotropic Kuwahara Filtering* — https://www.researchgate.net/publication/220507613 (accessed 2026-06-06)
- Gao/Li, *Oil Painting Style Rendering Based on Kuwahara Filter* (2019) — https://www.semanticscholar.org/paper/337e39c942e0c73c4d587f59a79639141210f7bc (accessed 2026-06-06)
- *Applying Medical Imaging Tractography Techniques to Painterly Rendering of Images* (arXiv 2511.00702, 2025-11) — https://arxiv.org/html/2511.00702v1 (accessed 2026-06-06)
- Suruchi Sharma, *A Van Gogh Inspired 3D Shader Methodology* (TAMU thesis) — https://core.ac.uk/download/pdf/147237812.pdf (accessed 2026-06-06)
- *Painterly Lighting through Normal Map Deformation*, F. Indeherberge — https://www.artstation.com/artwork/LeVn9A (accessed 2026-06-06)
- Mixbox / Secret Weapons — https://scrtwpns.com/mixbox/ (accessed 2026-06-06)
- spectral.js (rvanwijnen, MIT) — https://github.com/rvanwijnen/spectral.js (accessed 2026-06-06)
- Lars Wander, *Generating Spectral Paint Curves With ML* — https://larswander.com/writing/spectral-paint-curves/ (accessed 2026-06-06)
- Kubelka-Munk theory (Wikipedia) — https://en.wikipedia.org/wiki/Kubelka%E2%80%93Munk_theory (accessed 2026-06-06)
- Tailwind CSS issue #14955 (OKLab gradient interpolation) — https://github.com/tailwindlabs/tailwindcss/issues/14955 (accessed 2026-06-06)
- *OKLCH Color Model Criticism* (BigGo, 2025-08) — https://biggo.com/news/202508251312_OKLCH_Color_Model_Criticism (accessed 2026-06-06)
- Blue Monkey Makes, *How OKLCH Makes Better Gradients* — https://bluemonkeymakes.com/articles/oklch-makes-better-gradients (accessed 2026-06-06)
- Bram.us, *How To create the Stripe Website Gradient Effect* — https://www.bram.us/2021/10/13/how-to-create-the-stripe-website-gradient-effect/ (accessed 2026-06-06)
- Stripe mesh-gradient WebGL gist — https://gist.github.com/jshaw/a7315da7b4d1be3ef341009c1ca72c99 (accessed 2026-06-06)
- Inigo Quilez, *Domain Warping* — https://iquilezles.org/articles/warp/ (accessed 2026-06-06)
- *Improving Curl Noise* (SIGGRAPH Asia 2025) — https://dl.acm.org/doi/10.1145/3757377.3763980 (accessed 2026-06-06)
- al-ro, *Curl Noise* — https://al-ro.github.io/projects/particles/ (accessed 2026-06-06)
- Curtis et al., *Computer-Generated Watercolor* (SIGGRAPH '97) — https://grail.cs.washington.edu/projects/watercolor/paper_small.pdf (accessed 2026-06-06)
- *GPU Programming for Real-Time Watercolor Simulation* (TAMU thesis) — https://oaktrust.library.tamu.edu/server/api/core/bitstreams/5575e4a6-40fd-4946-ad32-f83712ddc02f/content (accessed 2026-06-06)
- *A lightweight, procedural, vector watercolor engine* (I3D 2012) — https://dl.acm.org/doi/10.1145/2159616.2159627 (accessed 2026-06-06)
- WebGPU Fundamentals, *Compute Shader Basics* — https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html (accessed 2026-06-06)
- Three.js Roadmap, *WebGL vs WebGPU Explained* — https://threejsroadmap.com/blog/webgl-vs-webgpu-explained (accessed 2026-06-06)
- W3C, *WebGPU Shading Language (WGSL)* — https://www.w3.org/TR/WGSL/ (accessed 2026-06-06)
- Hertzmann, *Painterly rendering with curved brush strokes of multiple sizes* (SIGGRAPH '98) — https://dl.acm.org/doi/10.1145/280814.280951 (accessed 2026-06-06)
- Hertzmann, *Stroke-Based Rendering* (course notes) — https://www.cs.ucdavis.edu/~ma/SIGGRAPH02/course23/notes/S02c23_3.pdf (accessed 2026-06-06)

**Key source files referenced:** `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts`, `.../shaders/brush.glsl.ts`, `.../shaders/mediums.glsl.ts`, `.../composables/color.ts`, `.../constants/presets.ts`, `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgpu/glassShader.wgsl`.

---

### Lane 13

I have everything I need to synthesize a tight, well-cited brief. The IOLITE page is JS-gated but I have AgX's behavior characterization from multiple sources. Let me compose the final brief.

---

# SOTA Research Brief — Aurora OKLCh Shader Interpolation (Lane: oklch-shader-interp)

Research date: 2026-06-06. Tranche-development; research + wave-seeds only, NO implementation. All sources cited inline.

## Where aurora stands today (the ground truth)

The current shader is already sophisticated, which sharpens where the SOTA gaps actually are:

- `src/composables/glass/webgl/shaders/procedural-color.glsl.ts:73-134` — the **full Ottosson OKLab/OKLCh pipeline already exists in GLSL** (4 `mat3` literals, cube-root nonlinearity, `oklchToOklab`/`oklabToOklch` with hue in radians), spliced from value.js's exact constants and gated at 1e-6. But the comment at `:69-72` notes: *"aurora has no in-shader OKLCh path today, so it does NOT splice this."*
- `src/components/custom/aurora/constants/shaders/composition.glsl.ts:samplePalette` — the palette LUT interpolates **`mix(uPalette[i0], uPalette[i1], t)` in LINEAR sRGB**, not OKLab. The palette is baked CPU-side to linear (`aurora.frag.ts:15`). This is *better* than gamma-sRGB lerp but is the exact muddy-midtone failure the SOTA literature warns about: a linear-RGB blend of a vivid blue→yellow pair still passes through a desaturated grey because chroma is not preserved.
- `aurora.frag.ts:331-343` — already has ACES tonemap + Jimenez IGN dither + the mandatory `linearToSrgb` OETF seam.
- `aurora.frag.ts`/`flow.glsl.ts`/`brush.glsl.ts` — already has domain-warp (Quilez double-warp), nuclei softmax field, a curved swept-brushstroke SDF with impasto edge highlight, four "mediums" (pastel/watercolor/oil/crayon), and a cursor swirl.

So aurora has the *machinery* (OKLCh matrices, brush SDF, flow) but the **color path runs in linear sRGB and the brush orientation is not flow-aligned to the color field.** That is precisely the lane.

## Findings (with citations)

### 1. OKLab/OKLCh — why it beats sRGB/linear-lerp for gradients

- OKLab is a matrix → cube-root → matrix pipeline; "very efficient on GPU." Coordinates are "perceptually orthogonal, so one can be altered without affecting the other two," giving "even transitions" that avoid the hue-shift of CIELAB/CIELUV and the desaturation of CAM16-UCS. — Ottosson, *A perceptual color space for image processing*, bottosson.github.io/posts/oklab (2020). [https://bottosson.github.io/posts/oklab/](https://bottosson.github.io/posts/oklab/)
- The muddy-midtone failure is concrete: a blue→yellow sRGB/linear lerp drives all three channels to moderate values at t=0.5 = "a desaturated brownish gray that doesn't belong in any design system." OKLCh "follows the perceptual color wheel, so a gradient from blue to yellow passes through cyan and green instead of through gray." — DEV Community, *Why Your Color Transitions Look Muddy* (2024/2025). [https://dev.to/alphashark/css-gradients-why-your-color-transitions-look-muddy-and-how-to-fix-them-2k7j](https://dev.to/alphashark/css-gradients-why-your-color-transitions-look-muddy-and-how-to-fix-them-2k7j)
- HSL is broken for this: equal L numbers across hues look unequally bright; "hue shifts can inadvertently alter perceived brightness." OKLCh "encodes perceived lightness consistently across all hues" and reaches P3. — Evil Martians, *OKLCH in CSS: why we moved from RGB and HSL*. [https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)

### 2. Hue interpolation has a *direction* — load-bearing for art

When you lerp OKLCh hue you must pick an arc. The four CSS-canonical methods: **shorter** (default), **longer**, **increasing** (clockwise), **decreasing** (counterclockwise). "When the hue angle difference passes through 180° during transition/animation, increasing/decreasing will NOT flip to the other side like shorter/longer do." For an *animated* aurora this matters: `shorter` can pop mid-animation; `increasing` rotates the rainbow smoothly forever. — MDN, *`<hue-interpolation-method>`*. [https://developer.mozilla.org/en-US/docs/Web/CSS/hue-interpolation-method](https://developer.mozilla.org/en-US/docs/Web/CSS/hue-interpolation-method)

### 3. Full in-shader OKLCh pipeline — already derivable from the repo

The transform is `linearRGB → (M1) → LMS → cbrt → (M2) → Lab → (polar) → LCh`, and back. Aurora's repo already has all four matrices and both polar conversions at `procedural-color.glsl.ts:76-134`; the only missing piece is a `mixOklch(a, b, t, hueMode)` helper and wiring `samplePalette`/`nucleiField` to call it. Reference HLSL/GLSL ports confirm the same matrix-cbrt-matrix shape. — yum-food/HLSL_OKLAB. [https://github.com/yum-food/HLSL_OKLAB](https://github.com/yum-food/HLSL_OKLAB)

### 4. Gamut clipping — the missing safety net for high-chroma OKLCh

Interpolating/perturbing in OKLCh routinely produces (L,C,H) triples outside sRGB. Naive per-channel RGB clamp distorts hue and desaturates (the same muddiness, reintroduced at the output). Ottosson's perceptual clip: the sRGB gamut at constant hue ≈ a triangle with corners (0,0), (1,0), and a hue-only **cusp** (L_cusp, C_cusp). `find_cusp(a,b)` + `find_gamut_intersection(...)` project (L1,C1) toward a point on the L axis, refined by one Halley iteration — preserving hue, trading chroma for lightness gracefully. Adaptive-α formulas let you tune lightness-preservation vs single-point projection. — Ottosson, *Gamut clipping*. [https://bottosson.github.io/posts/gamutclipping/](https://bottosson.github.io/posts/gamutclipping/)

### 5. Procedural palette from one seed — two complementary engines

- **Harmony-rotation in OKLCh** (the "derive-color" headline): hold L, hold C roughly constant, rotate H by a fixed offset — complementary 180°, analogous ±30°, triadic 120°, split-comp, tetrad. Stepping L by ~0.1 at fixed H yields perceptually-even tints/shades. Because L is perceptually uniform, every derived stop is *guaranteed* balanced. — ColorAide harmonies + OKLCh generators. [https://facelessuser.github.io/coloraide/harmonies/](https://facelessuser.github.io/coloraide/harmonies/), [https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- **IQ cosine palette** (cheap GPU gradient ramp): `color(t) = a + b·cos(2π(c·t + d))`, with a=bias, b=amplitude, c=frequency, d=per-channel phase. Vary d per channel (e.g. 0.00/0.33/0.67) for hue separation; integer c for C1-continuous cycling. Ideal as a *fallback/auto* ramp when no palette stops are supplied. — Quilez, *Palettes*. [https://iquilezles.org/articles/palettes/](https://iquilezles.org/articles/palettes/)

### 6. Painterly / Van-Gogh brushwork — the orientation problem is solved by the structure tensor

The canonical NPR oil-paint pipeline: **structure tensor** (Sobel Gx/Gy → Jxx,Jxy,Jyy, smoothed) gives a per-pixel **edge-tangent flow** direction and an **anisotropy** measure; strokes/kernels are then *oriented and elongated along that flow* (circular kernel → ellipse). — Maxime Heckel, *On Crafting Painterly Shaders* (full 3-pass GLSL: structure-tensor → anisotropic-Kuwahara → tonemap). [https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) · Kyprianidis & Döllner, *Image and Video Abstraction by Anisotropic Kuwahara Filtering*, CGF 2009. [https://www.kyprianidis.com/p/pg2009/](https://www.kyprianidis.com/p/pg2009/)

For genuine Van-Gogh congruence (no subject matter, pure backdrop): the academic methodology stresses **per-stroke control of profile/size/color/direction**, strokes that "stick" to the field with **curvature**, **broken color** (per-stroke hue/value jitter — aurora already has `brokenColorJitter` at `aurora.frag.ts:276`), and **impasto** via per-pixel height → normal perturbation → relief lighting (ridges/grooves from bristles), composited over canvas microgeometry. — Sharma, *A Van Gogh inspired 3D Shader Methodology*, TAMU thesis. [https://oaktrust.library.tamu.edu/handle/1969.1/151313](https://oaktrust.library.tamu.edu/handle/1969.1/151313) · Van Gogh Gallery, *Impasto*. [https://blog.vangoghgallery.com/index.php/en/2012/12/17/van-goghs-painting-technique-impasto/](https://blog.vangoghgallery.com/index.php/en/2012/12/17/van-goghs-painting-technique-impasto/)

The decisive upgrade vs aurora's current brush: today the brush SDF is placed on a grid (`bestOil` best-of-9 cells) and the swirl is a cursor effect. SOTA orients **every** stroke along the local color-field flow (structure tensor of the nuclei/warp field) — which is exactly *the* visual signature of Van Gogh's skies (the swirl follows the value gradient).

### 7. Flow fields — curl noise for the swirl substrate

Van-Gogh swirl and "alive" mesh-gradient motion both want **divergence-free** flow. Curl noise (`curl` of a noise potential) is "mathematically guaranteed divergence-free — no sources or sinks," giving natural swirling that doesn't clump. **Bitangent/divergence-free noise** ships as a single dependency-free GLSL/HLSL function. This is the natural driver for both the stroke-orientation field AND the domain-warp advection. — Bridson et al., *Curl-Noise for Procedural Fluid Flow*, SIGGRAPH 2007 [https://dl.acm.org/doi/10.1145/1276377.1276435](https://dl.acm.org/doi/10.1145/1276377.1276435) · *Fast Divergence-Free Noise* (bitangent noise) [https://atyuwen.github.io/posts/bitangent-noise/](https://atyuwen.github.io/posts/bitangent-noise/)

### 8. Mesh-gradient SOTA (Stripe/OpenAI class) — and how to beat it

Stripe's technique is stacked simplex octaves at varied scales/speeds, noise→color via a **1D gradient texture** `texture2D(u_gradient, vec2(t, 0.5))`, layered with sequential `mix()`. It is *not* perceptual — colors live in HSL/CSS, midtones can mud. — Alex Harri, *A flowing WebGL gradient, deconstructed* [https://alexharri.com/blog/webgl-gradients](https://alexharri.com/blog/webgl-gradients) · exzenter/gradient-stripe [https://github.com/exzenter/gradient-stripe](https://github.com/exzenter/gradient-stripe). **Aurora already exceeds this** (nuclei field, domain warp, brush). The way to *decisively* beat it: make the noise→color lookup an **OKLCh ramp** (no muddy mids by construction) + flow-aligned brush over it.

### 9. Tonemap — ACES washes out vivid hues; AgX preserves them

Aurora tonemaps with ACES (`aurora.frag.ts:330`). ACES "pushes colors toward white the brighter they are" and renders bright yellow/green/cyan "washed out" on sRGB — a real liability for a saturated gradient-art backdrop. **AgX** (Blender 4.0 default) has "better fundamentals," a more natural roll-off, and far better hue/saturation retention in highlights — the right DRT for arresting saturated color. — modelviewer/Khronos PBR-Neutral discussion [https://modelviewer.dev/examples/tone-mapping](https://modelviewer.dev/examples/tone-mapping) · three.js AgX issue #27362 [https://github.com/mrdoob/three.js/issues/27362](https://github.com/mrdoob/three.js/issues/27362) · minimal AgX, IOLITE [https://iolite-engine.com/blog_posts/minimal_agx_implementation](https://iolite-engine.com/blog_posts/minimal_agx_implementation).

### 10. Banding/dither — already handled, can extend

Aurora has Jimenez IGN 1-LSB dither (`aurora.frag.ts:185,343`). For deeper gradients, blue-noise-texture dither + the quantization formula `floor(c*(n-1)+0.5)/(n-1)` enables intentional posterization (oil-pastel banding-as-style). — Maxime Heckel, *The Art of Dithering* [https://blog.maximeheckel.com/posts/the-art-of-dithering-and-retro-shading-web/](https://blog.maximeheckel.com/posts/the-art-of-dithering-and-retro-shading-web/).

### 11. WebGPU — the modern substrate

WGSL is the path forward (Blender-class compute, AOT-validated, consistent cross-hardware; 2026 adds pointer support). For aurora specifically, the value is **compute pre-pass**: compute the structure-tensor flow field / stroke seed buffer once per frame in a compute shader, sample in the fragment pass — exactly what real-time painterly renderers do. — W3C WGSL spec [https://www.w3.org/TR/WGSL/](https://www.w3.org/TR/WGSL/) · WebGPU compute basics [https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html) · GM Shaders WebGPU [https://mini.gmshaders.com/p/webgpu](https://mini.gmshaders.com/p/webgpu).

---

## ADOPT for glass-ui aurora — wave-seed list (AW tranche)

Each is a concrete, self-contained wave/fold. Ordered by leverage; the first three are the lane headline.

- **AW.W?-α — OKLCh palette interpolation (THE headline).** Splice `OKLCH_MATRICES_GLSL` (already in `procedural-color.glsl.ts:73`) into `aurora.frag.ts`, and replace the linear `mix()` in `composition.glsl.ts:samplePalette` with `mixOklch(a, b, t, hueMode)` (lerp L, C linearly; interpolate H along the chosen arc). Bake the palette CPU-side to **OKLCh** instead of linear-sRGB, convert to linear only at the LUT output. Kills the muddy-midtone grey. **Lowest-cost, highest-impact — the matrices and gate already exist.**

- **AW.W?-β — `hueMode` axis + animated hue rotation.** Add a `uHueArc` uniform (`shorter|longer|increasing|decreasing`) to the OKLCh mix. Default `increasing` for animated palette-drift so the rainbow never flips at 180° (the `uPaletteDrift` path at `aurora.frag.ts:132`). Exposes "rotate the whole palette around the wheel" as one atom of control.

- **AW.W?-γ — Ottosson perceptual gamut clip.** Add `find_cusp`/`find_gamut_intersection`/adaptive-α clip from the gamut-clipping post; run it on every OKLCh→sRGB output (palette stops, per-stroke broken-color, nuclei value bias). Lets presets push high chroma without per-channel clamp muddiness. Gate it like the existing 1e-6 equivalence test.

- **AW.W?-δ — derive-color variant (`mode="derive"`).** One seed `oklch(L C H)` → procedural N-stop palette by harmony rotation (analogous ±30 / triadic 120 / split-comp / tetrad) holding L,C, stepping where needed. Plus an **IQ cosine ramp** auto-mode (`a+b·cos(2π(c·t+d))`) for a zero-config gradient. This is the "atoms of control" simplification: pick a seed + a harmony, get a stunning palette. Wire into `useConfiguratorState` per-preset.

- **AW.W?-ε — structure-tensor flow-aligned brushstrokes (the Van-Gogh upgrade).** Compute the structure tensor (Sobel Gx/Gy) of the *nuclei/warp color field* in-shader; derive edge-tangent direction + anisotropy; orient the existing `curvedStroke` SDF (`brush.glsl.ts`) along that flow instead of grid placement. This makes brushwork *follow the value gradient* — the actual signature of Van Gogh's skies. Reuse the existing `brokenColorJitter` for per-stroke broken color.

- **AW.W?-ζ — curl-noise swirl substrate.** Replace/augment the cursor-only swirl (`aurora.frag.ts:227`) and the domain-warp advection with divergence-free **curl/bitangent noise** as the shared flow field driving BOTH stroke orientation (ε) and warp drift. Single dependency-free GLSL function; gives physically-plausible swirl for the van-gogh + oil-pastel modes.

- **AW.W?-η — AgX display transform (swap ACES).** Add AgX as a `uTonemap` option (keep ACES as a mode) and default the saturated/gradient-art presets to AgX. Fixes the bright-yellow/green/cyan wash-out so the backdrop reads arresting, not washed. Minimal-AgX GLSL is a known drop-in.

- **AW.W?-θ — impasto relief lighting for the oil/van-gogh medium.** Extend the existing impasto edge-highlight (`brush.glsl.ts paintOver`) into a real per-pixel height→normal→directional-light pass (ridges/grooves from stroke direction + canvas microgeometry). Gives genuine 3D oil-paint depth. Single fake light dir uniform; no extra pass needed in the fragment path.

- **AW.W?-ι — oil-pastel posterization-as-style fold.** Add an optional OKLCh-space quantization (`floor(c*(n-1)+0.5)/(n-1)` on L, soft on C/H) + blue-noise dither for the pastel medium, so oil-pastel reads as genuine chalky stepped pigment rather than a smooth gradient. Composes with the existing IGN dither.

- **AW.W?-κ — WebGPU/WGSL compute pre-pass (forward-looking, gate behind feature detect).** Port the structure-tensor flow field (ε) + stroke-seed buffer to a WGSL compute pass sampled by the fragment shader, with the WebGL2 path as fallback. This is the modern-substrate + dynamic/interactive enabler (cursor advects the compute field). Stage last — it's the biggest lift and depends on ε landing first.

**Cross-cutting note for the tranche:** the in-shader OKLCh matrices, the 1e-6 CPU-equivalence gate, the curved-stroke SDF, `brokenColorJitter`, the IGN dither, and a flow-dispatch scaffold ALL already exist in-repo. The lane is mostly *wiring existing primitives into the color path + adding the structure-tensor orientation* — not greenfield. α/β/δ are near-pure wins; γ/ε/ζ are the depth; η/θ/ι are the finish; κ is the future substrate.

---

### Lane 14

I have everything I need. Here is the research brief.

---

# SOTA Research Brief — Aurora palette-generation lane

Lane: **palette-generation** (procedural color-harmony from a seed). Tranche-development research; NO implementation. Concrete AW wave-seeds at the end.

## What already exists in the repo (the baseline to beat)

The aurora ships a real but **simple** seed-to-palette deriver:

- `deriveAurora(seed, options)` — `src/components/custom/aurora/composables/color.ts:152` — takes ONE CSS color or `OklchStop`, ramps `stopCount` stops across a fixed painterly L band `[0.35, 0.95]` (`DERIVE_L_BAND`, `color.ts:134`), with a single linear chroma falloff toward the apex (`C = anchor.C * (1 - (1 - chromaFalloff) * t)`, `color.ts:193`).
- Harmony is a **linear hue walk**: `deriveHue()` (`color.ts:203`) does `analogous` (±hueSpread/2 around anchor), `complementary` (`anchor + 180·t`), `triad` (`anchor + 240·t`), `monochrome` (flat). The `AuroraHarmony` union is at `color.ts:110`.
- Every stop is gamut-mapped through value.js's Ottosson core via `gamutMapStop()` (`color.ts:250`) with a 6-step inward-chroma nudge to clear sRGB over-1 escapes. This part is already SOTA-grade and should be kept verbatim.

The painterly/brush machinery is also already strong — curved-spine SDF strokes, best-of-9 cell placement, impasto rim/shadow, `brokenColorJitter` per-stroke hue/value jitter (`brush.glsl.ts`). The DESIGN.md (`aurora/DESIGN.md`) documents nuclei composition, mediums, flow, cursor.

**The gap is the palette generator, not the painter.** Current derive is a monotone L-ascending ramp with one chroma curve and a naive hue lerp. The SOTA below produces palettes that are adaptive, muddy-zone-aware, temperature-shifted, and easing-driven — which is exactly the "derive a stunning palette from atoms of control" the user wants.

## Findings (web research, all in OKLCh / perceptual space)

### 1. Adaptive harmony beats fixed-angle rotation — meodai/pro-color-harmonies
The canonical SOTA library (a port of royalfig/colorpalette.pro, Ryan Feigenbaum's "magic numbers"). Operates **exclusively in OKLCh**. Key ideas:
- **Adaptive, not rigid.** Instead of "complementary = hue+180°", relationships **bend** based on the base color's L/C. Four "style" strategies reshape the same harmony: `square` (strict geometric +180/+120/+240, symmetric L/C tweaks), `triangle` (perceptual bending that *avoids muddy color zones*, applies "Chroma Narratives"), `circle` (emotional/story-driven hue+L bands with "Color Hierarchy roles"), `diamond` (luminosity-aware, prioritizes L/C for UI usability).
- **Threshold-based adaptation.** If base L < 0.3 → generate *lighter* variants for visibility; if L > 0.7 → generate *darker, richer* variants; smooth-interpolate near thresholds so transitions never snap.
- **`avoidMuddyZones` / `getComplementaryHue` / `getTriadicHues`** utilities + muddy-hue-range constants in `src/utils/color.ts`. Muddy zones = the olive/khaki hue bands where naive lerps die into "dead grays."
- **Composable post-modifiers** (each 0–1 intensity, applied in sequence): `sine` (sinusoidal hue ±~45° + L ±~0.15 over index), `wave` (logistic-map irregular drift), `zap` (~90° spiral hue shifts), `block` (triangular stepped contrast). `enhancePalette`/`polishPalette` kill dead grays.
- Signature: `generate(baseColor:{l,c,h}, paletteType, {style, modifiers, interpolation}) → OKLCH[]`.
Source: https://github.com/meodai/pro-color-harmonies (fetched 2026-06-06).

### 2. Anchors + positional easing in polar space — meodai/poline
Dependency-free TS micro-lib. Different generative model worth folding in:
- Draw **lines between ≥2 anchor points** in polar color space; `getColorAt(0..1)` samples ANY color along the whole journey as one continuous path.
- **Positional easing functions** per axis (default sinusoidal) map `[0,1]→[0,1]` to control how colors distribute between anchors — this is the "atoms of control" abstraction the user is after: a few anchors + an easing curve = an infinite, smooth, art-directable ramp.
Source: https://meodai.github.io/poline/ + https://github.com/meodai/poline (2026-06-06).

### 3. Perceptual ramps need easing curves on L and C, not linear — Adobe Leonardo / OKLCh tooling
- Leonardo (Nate Baldwin, Adobe Spectrum) generates ramps in CAM02/OKLAB/OKLCH driven by **contrast-ratio targets**, with multiple **easing curves** for the L and C journeys (not linear). "Lightness moves up/down, chroma stretches outward, hue spins" are three independent eased axes.
- OKLCh is perceptually uniform: equal numeric steps = equal perceived steps, so a hue rotation at fixed L/C *preserves perceived brightness* (HSL does not). This is why all SOTA generators moved to OKLCh.
- A bell/bezier **chroma curve** (low C at both dark and light ends, peak C in the mids) reads far more natural than the current single linear falloff — neon mids, desaturated atmospheric extremes.
Sources: https://www.infoq.com/news/2020/03/adobe-leonardo-accessible-colors/ , https://colorarchive.org/guides/oklch-perceptual-color-design-guide/ (2026-06-06).

### 4. Painterly color = temperature-shift, not just value-shift (the "van Gogh congruent" axis)
The single most-cited rule across painting sources, and the biggest missing ingredient for a genuinely painterly palette:
- **Lights shift WARMER, shadows shift COOLER.** "To pick a lighter color, increase brightness then slide to a warmer hue; for darker, decrease brightness then slide to a colder hue." (Baudisch 157; Gamblin.)
- Color is mixed through **warm–cool contrast** rather than picked along one hue — this is "what makes painted skin and metal feel less stamped out." A flat hue ramp reads stamped; a temperature-coupled ramp reads painted.
- In OKLCh terms: as L rises, nudge hue toward warm (~60–90°, yellow/orange); as L falls, nudge toward cool (~250–280°, blue/violet). A small coupled hue delta per L step. This is the *single* fold that would make the oil-pastel/van-Gogh modes read congruent with real paint.
Sources: https://alfredbaudisch.com/experiments/2d-art/157-digital-painting-color-fundamentals-and-hue-shifting/ , https://gamblincolors.com/understanding-color-temperature/ , https://realismtoday.com/painting-shadows-warmer-cooler/ (2026-06-06).

### 5. Mesh-gradient / "ethereal glow" reference math (Stripe/OpenAI/Linear lineage)
- Stripe's effect is a ~10KB WebGL shader: **stacked simplex-noise octaves** at de-tuned wavelengths/speeds (e.g. L/1.00, L/1.30, L/1.86 with 0.85/1.15/0.60 amplitudes, some negative speeds to break monotony), color mapped through a **1-D gradient texture** (`texture2D(u_gradient, vec2(t,0.5))`), distance-based blur, quintic smoothstep.
- The palette feeds this as the gradient-texture LUT — so a better palette generator directly upgrades every mesh-gradient/atmospheric mode, not just the painterly ones. The aurora already bakes stops to a linear-sRGB LUT (`flattenPalette`, `color.ts:42`), so this is a drop-in win.
Sources: https://alexharri.com/blog/webgl-gradients , https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/ , https://www.learnui.design/blog/mesh-gradients.html (2026-06-06).

### 6. Flow-guided painterly NPR (for the brush lane, adjacent)
Anisotropic Kuwahara (Kyprianidis 2009) + structure-tensor edge-tangent-flow is the academic SOTA for oil-painting abstraction: smoothed 2×2 structure tensor → eigenvectors give local orientation, eigenvalue ratio gives anisotropy → elliptical weighted sectors aligned to flow average color by lowest-variance sector. The repo's `bestOil` already approximates the *output* (flow-aligned strokes); the **palette** lane's contribution is to make broken-color jitter pull from harmony-derived neighbor stops rather than a flat hue hash.
Sources: https://www.kyprianidis.com/p/pg2009/ , https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ (2026-06-06).

## Techniques worth adopting (distilled)

1. OKLCh-native generation throughout (already true — keep).
2. **Eased L and C journeys** (bezier/sinusoidal), not linear ramps. Bell-shaped chroma curve.
3. **Adaptive harmony** keyed on seed L/C (dark seeds → lighter siblings, light → richer-darker).
4. **Muddy-zone avoidance** — push hue out of the olive/dead-gray bands during interpolation.
5. **Temperature-coupling** — warm-as-it-lightens / cool-as-it-darkens hue delta = painterly congruence.
6. **Anchors + positional-easing** sampling model (poline) for art-directable multi-anchor palettes.
7. **Composable post-modifiers** (sine/wave/zap/block) for controlled variation without re-authoring.
8. Keep the existing **gamut-map nudge** (`gamutMapStop`) as the final guard — it's already best-practice.

## ADOPT for glass-ui aurora — wave-seed list (AW tranche)

Each is a concrete, atomic fold extending `deriveAurora`/`AuroraHarmony` without breaking the shipped surface. Sized to one wave or one fold.

- **AW.W?-α — Eased L/C journeys.** Replace the single linear chroma falloff (`color.ts:193`) and linear L ramp with selectable easing on each axis: add `lightnessEasing`/`chromaEasing: "linear" | "sine" | "bell" | CubicBezier` to `DeriveAuroraOptions`. Bell chroma (peak in mids, desaturated extremes) is the new default. Pure additive — old callers default to current behavior. Cite: Leonardo/OKLCh ramp tooling.

- **AW.W?-β — Temperature-coupled hue (painterly congruence).** Add `temperatureShift?: number` (0..1) to `deriveHue`/options: couple a warm-as-L-rises / cool-as-L-falls hue delta onto every harmony. This is the headline "real van-Gogh congruent" fold — it's what makes oil/pastel modes read as mixed paint, not stamped hue. Drives `brokenColorJitter` in `brush.glsl.ts` to pull from the warmer/cooler neighbor too. Cite: Baudisch 157, Gamblin, Realism Today.

- **AW.W?-γ — Adaptive harmony + muddy-zone avoidance.** Port pro-color-harmonies' threshold logic: dark seeds (L<0.3) bias derived stops lighter, light seeds (L>0.7) bias darker/richer, smooth-interpolate near the thresholds; add an `avoidMuddyZones` pass that nudges interpolated hues out of the olive/dead-gray bands. New `harmonyStyle?: "geometric" | "perceptual"` option (geometric = current rigid rotation, default; perceptual = adaptive). Cite: meodai/pro-color-harmonies.

- **AW.W?-δ — Composable palette modifiers.** Add an optional `modifiers?: { sine?, wave?, zap?, block? }` post-pass (each 0..1) over the derived stops, mirroring pro-color-harmonies. Gives "atoms of control" variation (hue/L/C ripple) over any base harmony with zero re-authoring. Deterministic, DOM-free. Cite: meodai/pro-color-harmonies modifiers.

- **AW.W?-ε — Anchor + positional-easing palette mode.** A second generator entry `deriveAuroraFromAnchors(anchors: OklchStop[], easing?)` modeled on poline — draw the ramp between ≥2 anchors in OKLCh with a per-axis positional-easing function, `sampleAt(0..1)`. Complements single-seed derive for art-directed multi-color palettes (the multi-nuclei zones in DESIGN.md §2.1 each want a distinct anchor). Cite: meodai/poline.

- **AW.W?-ζ — Expand the harmony union.** Add `split-complementary` and `tetradic` to `AuroraHarmony` (`color.ts:110`) — the two SOTA schemes the current union omits. Both are clean angle sets the existing `deriveHue` switch can host (split-comp = anchor + 150/210; tetrad = anchor + 90/180/270). Cite: pro-color-harmonies harmony types.

- **AW.W?-η — Simplified "atoms" preset API.** A thin `auroraFromSeed(seed, mood?)` convenience over `deriveAurora` that bundles harmony+easing+temperature+modifier defaults behind a tiny mood vocab (`"atmospheric" | "painterly" | "vivid" | "muted"`) — the "simplified options" the user wants, layered on the full-control surface beneath. Pure consumer ergonomics, no shader change.

- **AW.W?-θ (cross-lane note) — WebGPU/WGSL parity.** The palette LUT bake (`flattenPalette`, linear-sRGB Float32Array) is renderer-agnostic and ports to a WGSL storage buffer unchanged when the modern-WebGPU lane lands. Flagging so the palette folds above are authored renderer-neutral. Cite: WebGPU 2025 procedural-gradient state (DEV/webgpufundamentals).

**Surface discipline:** every fold above is additive on `DeriveAuroraOptions`/`AuroraHarmony` with current behavior as the default branch — no break to the shipped `deriveAurora` signature, the `@mkbabb/glass-ui/aurora` subpath, or the gamut-map guard. Per the repo's "presets in consumers" rule, the new mood/anchor presets ship in `demo/stories/aurora/presets.ts`, not the library.

**Key file references:** `src/components/custom/aurora/composables/color.ts:110` (`AuroraHarmony`), `:152` (`deriveAurora`), `:203` (`deriveHue`), `:250` (`gamutMapStop`), `:134` (`DERIVE_L_BAND`); `src/components/custom/aurora/constants/shaders/brush.glsl.ts:219` (`brokenColorJitter` call site); `src/components/custom/aurora/DESIGN.md` (composition/medium invariants).

---

### Lane 15

I have everything I need. The flow field is currently sin/fbm-angle based (not true divergence-free curl, and not multi-vortex). The palette is baked CPU-side (no in-shader OKLCh interpolation, no derive-color). There's no impasto height-field lighting, no anisotropic-Kuwahara structure-tensor flow, no blue-noise dither, and the Van Gogh mode is generic oil strokes (not turbulence-scaled). Those are exactly the SOTA gaps. Writing the brief now.

---

# Aurora SOTA research brief — gradient-art backdrops & procedural painterliness

Lane: **gradient-art-backdrops**. Research only; no implementation. Every claim cited with URL + access date (2026-06-06). File:line references are to the current glass-ui aurora at `src/components/custom/aurora/`.

## 0. Where the aurora already stands (baseline)

The aurora is far past a toy mesh gradient. It already ships: multi-nuclei softmax composition, Quilez double-fBm domain warp, OKLCh palettes baked to **linear** sRGB (`composables/color.ts`), ACES tonemap, curved-spine SDF brushstrokes with best-of-9 placement + impasto edge rim + broken-color jitter (`constants/shaders/brush.glsl.ts:72-233`), four peer mediums (watercolor/pastel/crayon/oil) (`mediums.glsl.ts`), a flow field (`flow.glsl.ts`), cursor deflection into both warp and flow, and capture/thumbnail runtime modes (`DESIGN.md`).

So the bar is high. The SOTA gaps that would make it *stunning* rather than *very good* are specific and concentrated in five places: **the flow field is fake-curl** (`flow.glsl.ts:21-33` uses `fbm`-angle, not divergence-free curl, and has no multi-vortex structure), **palette interpolation is CPU-baked** (no in-shader OKLCh blend, no derive-color), **there is no structure-tensor / anisotropic-Kuwahara feedback** so strokes don't *follow the image's own edges*, **there is no impasto height-field relit by a light** (only a fixed edge-rim in `brush.glsl.ts:173-178`), and **there is no blue-noise dither** before the 8-bit output (`DESIGN.md` post stage uses a flat `hash − 0.5` paper grain).

---

## 1. How the reference aesthetic is actually made

### 1a. Stripe / mesh-gradient lineage — animated noise over a gradient LUT
Stripe's gradient is ~10KB / ~800 lines on a custom minigl, animating a mesh with **3-layer Simplex noise** driven entirely in the fragment shader, designed to hold 60fps on mobile. ([bram.us teardown](https://www.bram.us/2021/10/13/how-to-create-the-stripe-website-gradient-effect/), 2021; [Kevin Hufnagl teardown](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/), accessed 2026-06-06.)

Alex Harri's deconstruction is the cleanest statement of the core trick: **don't pick colors per-pixel — sample a 1D gradient texture by a noise value.** Multiple Simplex octaves stack with mismatched frequency *and* speed multipliers (some negative) to create directional flow and break visible periodicity; a per-pixel `pow(t, ~3.0)` biases the noise toward "periods of sharpness." Critically, his shader runs in **flat linear RGB** with no perceptual color space. ([alexharri.com/blog/webgl-gradients](https://alexharri.com/blog/webgl-gradients), accessed 2026-06-06.) **Aurora already beats this** on color (OKLCh→linear) and on composition (nuclei vs. wave-stack). The takeaway is the *gradient-LUT-sampled-by-noise* idiom for cheap atmospheric depth between nuclei.

### 1b. OpenAI lineage — curated randomness, not pure random
OpenAI's identity (Ben Barry, 2017) started as **4 random corner colors interpolated**; the 2020 site stacked **transformed radial gradients** (scale/rotate/skew/translate on a 4-color set) at ~6KB, serving a unique gradient per page load. The lesson across the progression is **constraint design** — variation is *seeded and bounded*, never pure chance, which is what reads as "curated." ([justinjay.wang/methods-for-random-gradients](https://justinjay.wang/methods-for-random-gradients/), accessed 2026-06-06.) This validates aurora's preset-anchored nuclei, and points at a **seeded "derive a full preset from one base color + a seed"** generator (§3, seed AW-3).

### 1c. The current SOTA tool — paper.design "Paper Shaders"
The closest thing to "the OpenAI/Linear aesthetic productized" today is paper.design's **grain-gradient** shader: up to 7 colors, `softness`, `intensity` (distortion between bands), `noise` (grain), and a `shape` axis (wave/dots/truchet/corners/ripple/blob/sphere), shipped as a React component over GLSL. ([shaders.paper.design/grain-gradient](https://shaders.paper.design/grain-gradient), accessed 2026-06-06.) The headline modern move: **grain is a first-class, animated layer, not an afterthought.** "Grainy gradients" are *the* 2025 idiom. ([Frontend Masters — Grainy Gradients](https://frontendmasters.com/blog/grainy-gradients/); [Design Magazine — How Gradients Got Rough](https://designmagazine.com.au/how-gradients-got-rough/), accessed 2026-06-06.)

### 1d. OKLCh is the differentiator the references mostly lack
sRGB/HSL gradient interpolation produces the notorious **gray-band / muddy-midtone** artifact (orange→blue dips through the desaturated cube center); OKLCh interpolation keeps chroma up and reads as perceptually even steps, and the **hue path** (short vs. long arc) is a deliberate authoring choice. ([gradients.fyi](https://gradients.fyi/); [Blue Monkey Makes — OKLCH gradients](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients), accessed 2026-06-06.) Aurora already bakes OKLCh CPU-side — but baking means **the blend between two stops happens in linear sRGB, not OKLCh.** Moving the LUT interpolation *into the shader in OKLCh* (or pre-resampling the LUT densely in OKLCh) is the gap (seed AW-1).

---

## 2. How to *better* it — the painterliness techniques

### 2a. Anisotropic Kuwahara + structure tensor — the single biggest depth upgrade
This is the technique that makes NPR output read as *genuinely painted* rather than *noise-textured*. Pipeline (Kyprianidis & Kang 2009, the canonical reference + its GPU Pro implementation):

1. **Structure tensor** from Sobel: `J = [[Sx·Sx, Sx·Sy],[Sx·Sy, Sy·Sy]]`, then smooth it.
2. **Eigen-decomposition** → local dominant orientation + an anisotropy measure (how edge-like vs. flat the neighborhood is).
3. **Kuwahara**: circular kernel split into **8 Gaussian-weighted sectors**; output = mean color of the **lowest-variance sector** (this is what flattens-while-preserving-edges).
4. **Anisotropic adaptation**: squeeze/rotate that kernel into an **ellipse aligned to the tensor**, so smoothing runs *along* edges and the painterly flattening follows real feature directions → sharper, feature-abiding strokes.

([Kyprianidis & Kang, "Image and Video Abstraction by Anisotropic Kuwahara Filtering," 2009](https://www.kyprianidis.com/p/pg2009/); [GPU implementation, GPU Pro](https://www.kyprianidis.com/p/gpupro/); [Maxime Heckel, "On Crafting Painterly Shaders"](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/), accessed 2026-06-06.) Polynomial sector weights `[(x+ζ) − ηy²]²` (η≈0.1) approximate the Gaussian faster. The structure tensor is **the same math** that should drive the brush flow field — strokes that follow the painting's own gradient field is exactly what aurora's `flow.glsl.ts` does *not* do today (its flow is independent of the color field). This is seed AW-2 (tensor) feeding AW-4 (Kuwahara), and it directly serves "ultra-high-fidelity brushwork."

### 2b. Edge Tangent Flow (ETF) — smooth, coherent stroke direction
ETF (Kang et al., refining Cabral-Leedom LIC) iteratively smooths the tensor field so stroke directions stay coherent across the image instead of jittering per-pixel — the difference between hatching that *reads* and hatching that looks like noise. ([Maxime Heckel, painterly shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/), accessed 2026-06-06.) Aurora's strokes currently take direction from `flowField()` + per-cell jitter (`brush.glsl.ts:206-210`); an ETF-smoothed tensor field would replace that with image-coherent direction.

### 2c. Curl noise — real divergence-free flow, not fbm-angle
Aurora's `flow.glsl.ts:21-23,27-32` builds direction from `fbm`-as-angle. The correct technique for fluid-looking, swirling, non-converging flow is **curl noise**: take the curl of a noise potential → a divergence-free field, so streamlines swirl without sources/sinks (no ugly convergence knots). ([Bridson et al., "Curl-Noise for Procedural Fluid Flow," SIGGRAPH 2007](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf); [Emil Dziewanowski, "Dissecting Curl Noise"](https://emildziewanowski.com/curl-noise/); 2D **bitangent noise** is a cheap single-call divergence-free variant: [atyuwen.github.io](https://atyuwen.github.io/posts/bitangent-noise/), accessed 2026-06-06.) This is a near-drop-in upgrade to `flowField()` (seed AW-5).

### 2d. Impasto as a height field, relit by a light vector
The fixed edge-rim in `paintOver` (`brush.glsl.ts:173-178`) fakes impasto with a hardcoded warm/cool offset. SOTA impasto **accumulates a per-stroke height field** (canvas tooth + bristle ridges from harmonic frequencies with per-stroke random phase), derives a **normal from the height gradient**, and **relights it with a movable light** — thin strokes inherit canvas roughness, thick strokes override it. ([differentiable stroke-planning / impasto height-field paper, arXiv:2604.02752](https://arxiv.org/pdf/2604.02752); [oil-painting height-field bump shader, danlivings.co.uk](https://www.danlivings.co.uk/blog/oil-painting-effect-shader-unity/), accessed 2026-06-06.) A real normal+light gives view-/light-dependent specular that turns flat color into *paint*, and pairs naturally with cursor (light follows pointer). Seed AW-6.

### 2e. Van Gogh, done *correctly* — turbulence-scaled strokes (the headline differentiator)
The user wants a Van Gogh variant with "proper atomic brushstrokes, depth, congruent to real Van Gogh." The thing that makes Starry Night *Starry Night* and not "swirly oil" is now a **published physics result**: the 14 main whirling shapes obey **Kolmogorov's energy-cascade scaling** at large scale, and the paint *within* strokes obeys **Batchelor scaling** (small-scale passive-scalar turbulence) — with **luminance used as a proxy for kinetic energy** and **brushstroke size as the spatial scale.** ([Hidden Turbulence in van Gogh's The Starry Night, arXiv:2310.03415](https://arxiv.org/pdf/2310.03415); [AIP Publishing summary](https://publishing.aip.org/publications/latest-content/beneath-the-brushstrokes-van-goghs-sky-is-alive-with-real-world-physics/), accessed 2026-06-06.) Concretely this means a Van Gogh mode should: (1) seed a handful of **vortices** (curl-noise + a few placed rotational centers), (2) **scale stroke length/width to the energy cascade** so larger eddies carry longer strokes and detail strokes get shorter (a power-law over scale), and (3) **couple stroke luminance to local flow energy.** Procedural Starry-Night work corroborates the recipe: multi-frequency vortex fields + strokes oriented to the field + impasto noise stacked at 10×/20×/40×, painted **background→foreground** in 12,000-stroke order. ([Medium — Canvas to Code: The Starry Night](https://medium.com/@kombib/canvas-to-code-the-starry-night-and-algorithms-that-dream-in-color-a3dffa8b03cb); [Stroke-based Starry Night, ResearchGate fig.](https://www.researchgate.net/figure/Animating-Van-Goghs-Starry-Night-a-Region-map-and-vector-fields_fig11_5658288), accessed 2026-06-06.) No subject matter required — it's the *statistics of the strokes*, not the cypress, that make it read as Van Gogh. Seed AW-7. This is the most defensible "better than a mesh gradient" claim in the brief.

### 2f. Blue-noise dither before 8-bit — kill the banding
Smooth gradients band on the 8-bit output buffer; the fix is **adding blue noise right before quantization, in the shader where full float precision still exists** (a post-buffer pass is too late). Blue noise is perceptually less visible than white/`hash` noise. ([Mikkel Gjøl, "Removing Banding in Linelight"](https://pixelmager.github.io/linelight/banding.html); [Moments in Graphics — free blue-noise textures](https://momentsingraphics.de/BlueNoise.html); [shader-tutorial.dev — banding & dithering](https://shader-tutorial.dev/advanced/color-banding-dithering/), accessed 2026-06-06.) Aurora's current `hash − 0.5` paper grain (`DESIGN.md` post stage) is white noise; swapping the final dither term to a tiled blue-noise lookup is a small, high-impact change. Seed AW-8.

### 2g. WebGPU compute — strokes as particles (the modern-rendering ask)
For "modern WebGPU + atomic strokes," the SOTA architecture is **stroke-based rendering with strokes as compute particles**: each stroke = a particle (position, direction, length, color, lifetime) updated in a compute pass, then rasterized — instead of the current per-pixel best-of-9 SDF search (which redundantly evaluates every stroke at every pixel). This is *the* canonical compute-to-render pattern and scales to far more, far cheaper strokes. ([teachme.sh — Compute to Render (WebGPU)](https://www.teachme.sh/webgpu/compute-to-render); [Three.js Roadmap — WebGPU compute shaders](https://threejsroadmap.com/blog/introduction-to-webgpu-compute-shaders); [Object-Space Painterly Rendering for WebGL, RPI](https://www.cs.rpi.edu/~cutler/classes/advancedgraphics/S14/final_projects/scott_andy.pdf), accessed 2026-06-06.) Aurora is WebGL2-only today; a WebGPU compute path is a large but high-ceiling fold and the right home for *thousands* of true atomic strokes. Seed AW-9.

---

## 3. ADOPT for glass-ui aurora — wave-seed list

Each is a concrete AW (aurora) wave/fold. Ordered roughly by impact-per-effort. Seams named to the current files.

- **AW-1 · In-shader OKLCh palette interpolation (derive-color seam).** Today the palette is baked to linear sRGB and blended in linear (`composables/color.ts`, `aurora.frag.ts:60`). Fold: either (a) densely resample the LUT *in OKLCh* CPU-side before flattening, or (b) carry L/C/h into the shader and interpolate perceptually + Oklab→linear (the matrices already exist in `procedural-color.glsl.ts`). Add a **`deriveFrom: OklchStop` config field** that generates the full `palette[]` + `nuclei[]` bias from one base color via analogous/complementary hue offsets. Kills muddy midtones; delivers the "derive-color variant" + "simplified options" ask. *(Refs §1d, §1b.)*

- **AW-2 · Structure-tensor pass.** Compute a smoothed structure tensor (Sobel → `J`, eigen-decompose) over the composed color field. In WebGL2 this is a cheap second pass to a texture; in the single-pass shader, a small fixed-tap local estimate. Produces a per-pixel **(orientation, anisotropy)** field. Foundation for AW-4 and AW-5. *(Refs §2a, §2b.)*

- **AW-3 · Seeded preset generator ("curated randomness").** A `generateAuroraPreset(seed, baseColor?)` that bounds nuclei count/position/radius, picks a hue scheme, and seeds flow — so "random" presets read as curated, OpenAI-style. Pairs with AW-1's derive-color. Demo-side (presets live in consumers per memory rule), but the *generator primitive* can ship. *(Refs §1b, §1c.)*

- **AW-4 · Anisotropic-Kuwahara "smooth" medium upgrade.** Replace/augment the `smooth` pole with an 8-sector Gaussian (or polynomial-weight) Kuwahara that adapts its kernel to the AW-2 tensor. This is the single biggest "reads as painted" upgrade for the atmospheric pole, and gives the oil-pastel/painterly poles edge-coherent flattening underneath the strokes. *(Refs §2a.)*

- **AW-5 · Curl-noise flow field.** Replace `flow.glsl.ts:21-23,27-32` fbm-angle with a true divergence-free curl field (bitangent-noise variant for one cheap call), optionally **blended with the AW-2 tensor direction** so flow follows the image. Removes convergence knots; makes swirl/multi patterns read as fluid. *(Refs §2c, §2b.)*

- **AW-6 · Impasto height-field + relight.** Accumulate per-stroke height (canvas tooth + harmonic bristle ridges, per-stroke random phase) → normal from gradient → relight with a `uLightDir` uniform (default top-left; **optionally driven by cursor**). Replaces the hardcoded warm/cool rim in `brush.glsl.ts:173-178` with real view/light-dependent specular. *(Refs §2d.)*

- **AW-7 · Van Gogh turbulence mode (headline).** A `strokeMode: "vangogh"` (or medium variant) that: seeds N placed vortices + curl flow (AW-5); **scales stroke length/width by a power-law over eddy scale** (Kolmogorov cascade); **couples stroke luminance to local flow energy** (Batchelor); paints background→foreground in size order. No subject matter — the *stroke statistics* carry the Van Gogh read. Most defensible "better than mesh gradient" claim; pairs with AW-6 impasto. *(Refs §2e.)*

- **AW-8 · Blue-noise dither before output.** Swap the final white-noise `hash − 0.5` paper grain for a tiled blue-noise sample applied pre-quantization in linear (full precision), keeping a separate larger-grain "paper" layer for texture. Eliminates banding on quiet/low-contrast presets. Tiny change, visible polish. *(Refs §2f.)*

- **AW-9 · WebGPU compute stroke pipeline (large fold).** A WebGPU render path where strokes are compute particles (position/dir/length/color/life) updated in a compute pass and instanced-rasterized, instead of per-pixel best-of-9 SDF (`brush.glsl.ts:188-233`). Unlocks thousands of true atomic strokes + dynamic stroke spawning/decay; the right home for AW-7 at scale. Gate behind feature-detect with the WebGL2 path as fallback. *(Refs §2g.)*

- **AW-10 · Animated first-class grain layer ("grainy gradient" idiom).** Make grain an animated, parameterized layer (intensity + scale + drift) rather than a static post term — the dominant 2025 idiom and what paper.design productizes. Composes with AW-8's blue noise (dither stays static/correct; *decorative* grain animates). *(Refs §1c, §2f.)*

- **AW-11 · Simplify the public knob surface.** The config has ~35 fields (`DESIGN.md` §5). Fold the painterly axes behind a small set of intent knobs (e.g. `painterliness`, `energy`, `grain`, `light`) that fan out to the low-level uniforms, keeping the full surface available for power users. Directly serves the "simplified options" ask and makes AW-1/AW-7 approachable. *(Refs §1b constraint-design lesson.)*

## Sources
- [bram.us — Stripe gradient effect](https://www.bram.us/2021/10/13/how-to-create-the-stripe-website-gradient-effect/) · [Kevin Hufnagl — Stripe teardown](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/) · [Alex Harri — WebGL gradients deconstructed](https://alexharri.com/blog/webgl-gradients) · [Justin Jay Wang — Methods for random gradients](https://justinjay.wang/methods-for-random-gradients/) · [paper.design — Grain Gradient shader](https://shaders.paper.design/grain-gradient) · [Frontend Masters — Grainy Gradients](https://frontendmasters.com/blog/grainy-gradients/) · [Design Magazine — How Gradients Got Rough](https://designmagazine.com.au/how-gradients-got-rough/) · [gradients.fyi — OKLCH mesh generator](https://gradients.fyi/) · [Blue Monkey Makes — OKLCH gradients](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients) · [Kyprianidis & Kang — Anisotropic Kuwahara 2009](https://www.kyprianidis.com/p/pg2009/) · [Kyprianidis — Anisotropic Kuwahara on the GPU](https://www.kyprianidis.com/p/gpupro/) · [Maxime Heckel — On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) · [Bridson — Curl-Noise for Procedural Fluid Flow 2007](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf) · [Emil Dziewanowski — Dissecting Curl Noise](https://emildziewanowski.com/curl-noise/) · [atyuwen — Bitangent (divergence-free) noise](https://atyuwen.github.io/posts/bitangent-noise/) · [arXiv:2310.03415 — Hidden Turbulence in van Gogh's The Starry Night](https://arxiv.org/pdf/2310.03415) · [AIP — van Gogh's sky physics](https://publishing.aip.org/publications/latest-content/beneath-the-brushstrokes-van-goghs-sky-is-alive-with-real-world-physics/) · [Medium — Canvas to Code: The Starry Night](https://medium.com/@kombib/canvas-to-code-the-starry-night-and-algorithms-that-dream-in-color-a3dffa8b03cb) · [arXiv:2604.02752 — Differentiable Stroke Planning (impasto height field)](https://arxiv.org/pdf/2604.02752) · [danlivings.co.uk — Oil-painting effect shader](https://www.danlivings.co.uk/blog/oil-painting-effect-shader-unity/) · [Mikkel Gjøl — Removing Banding in Linelight](https://pixelmager.github.io/linelight/banding.html) · [Moments in Graphics — Free blue-noise textures](https://momentsingraphics.de/BlueNoise.html) · [shader-tutorial.dev — Color banding & dithering](https://shader-tutorial.dev/advanced/color-banding-dithering/) · [teachme.sh — Compute to Render (WebGPU)](https://www.teachme.sh/webgpu/compute-to-render) · [Three.js Roadmap — WebGPU compute shaders](https://threejsroadmap.com/blog/introduction-to-webgpu-compute-shaders) · [RPI — Object-Space Painterly Rendering for WebGL](https://www.cs.rpi.edu/~cutler/classes/advancedgraphics/S14/final_projects/scott_andy.pdf)

All accessed 2026-06-06.

---

### Lane 16

I now have a complete picture of the current "atoms" model and all the SOTA research. Writing the brief.

---

# SOTA brief — Aurora procedural color-field composition (Lane: color-zones-atoms)

Research for tranche-AW. No implementation. Grounded against the live aurora at `src/components/custom/aurora/`.

## Where aurora is today (the baseline "atoms")

The current composition model is a **softmax-weighted Gaussian nuclei field** — `MAX_NUCLEI = 6` color blobs, each with position, radius, anisotropy (elongation + angle), a `paletteBias` (which OKLCh stop it pulls toward), and a `valueBias`. The field is a softmax over `exp(-beta·d²/r²)` weights.

- Nucleus atom: `src/components/custom/aurora/constants/presets.ts:22-46` (`AuroraNucleus`).
- Field accumulation: `src/components/custom/aurora/constants/shaders/composition.glsl.ts:20-59` — anisotropic Gaussian, softmax normalize, slow palette drift.
- Palette is a CPU-baked linear-sRGB LUT, sampled with smoothstep between stops: `composition.glsl.ts:9-17`.
- Color is full OKLCh already, single-sourced through value.js Ottosson primitives, and there is already a `deriveAurora(seed, {harmony})` one-color→N-stop deriver with analogous/complementary/triad/monochrome schemes: `src/components/custom/aurora/composables/color.ts:152-200`.
- Flow field (radial/swirl/diagonal/multi + curl + cursor swirl): `flow.glsl.ts`.
- Oil medium already does curved swept-stroke SDFs, best-of-9-neighbor grid placement, bristle-ragged edges, impasto rim/shadow, broken-color jitter: `brush.glsl.ts`.

So aurora is **not** a mesh gradient — it is a per-pixel weighted-blob field. That is the right substrate; the gaps are in *control authoring*, *boundary richness*, and *stroke-field fidelity*. Below is the SOTA that closes those gaps.

---

## Findings & techniques

### 1. Mesh-gradient art-direction model (control points + handles + blend modes)

The Stripe/Linear/Vercel-class tools expose colors as **independent control points that each radiate outward (multi-point glow)**, each with draggable bezier handles shaping how the color flows, and a **per-point blend mode** (Screen/Overlay/Soft-Light/Multiply) so colors *interact* in the fragment shader rather than linearly averaging. Crucially, SOTA tools blend in **OKLab/LCH, not RGB** to kill muddy mid-tones.

- ColorFlow (advanced mesh editor, 8 stackable WebGL effects, OKLab/LCH blend option) — https://colorflow.ls.graphics/ and the Figma plugin https://www.figma.com/community/plugin/1613867457443153377/ (updated April 2026).
- "Building a Mesh Gradient Generator" (control-point + bezier-handle + bilinear/bicubic patch math) — https://tkalmi.dev/blog/mesh-gradient-generator
- ColorFffy / GradientsHub blend-mode + interpolation-space writeups — https://colorffy.com/mesh-gradient-generator, https://gradientshub.com/tools/mesh-gradient-generator (2025).

Relevance: aurora's softmax already *is* a multi-point glow, but every nucleus blends the same way (softmax average). A **per-nucleus blend mode** and a **softmax→bias modes** (so one blob can "screen" a bright bloom over the field instead of averaging into it) is the single biggest art-direction lever missing.

### 2. Domain warping for organic boundaries (fbm-of-fbm)

The canonical `fbm(p + fbm(p + fbm(p)))` recursive warp. Knobs that map cleanly onto art direction: `WARP_STRENGTH` (0.5 subtle → 2.0 strong), `WARP_DEPTH` (1/2/3 nesting), `NUM_OCTAVES` (4 coarse → 6 fine), `TIME_SCALE`, and **lacunarity 2.01–2.04 (not exactly 2.0) to kill lattice artifacts**. The recommended finishing move is a **cosine palette** applied to the warped scalar field, then bloom + tonemap.

- Domain-warping technique doc (formulas + parameter names) — https://github.com/MiniMax-AI/skills/blob/main/skills/shader-dev/techniques/domain-warping.md
- Curl-noise flow (Bridson) for the "multi" flow pattern — https://al-ro.github.io/projects/particles/

Relevance: aurora's `warpAmount/warpScale/warpDrift` exist but are a single warp pass. A 2–3-deep recursive warp on the *boundary coordinate* (not the whole field) gives the wispy, cloud-like demarcations between zones that the flat softmax can't.

### 3. Cosine palettes — the minimal "derive-color" atom

`color(t) = a + b·cos(2π(c·t + d))` with `a,b,c,d` as RGB vectors. `a` = brightness/bias, `b` = contrast, `c` = how many hue cycles across the ramp, `d` = phase per channel. Four vectors → an entire infinite-ramp palette. This is the gold-standard "simplified options / derive-color from minimal atoms" formula.

- Inigo Quilez, "Palettes" — https://iquilezles.org/articles/palettes/

Relevance: aurora's `deriveAurora` is good but OKLCh-ramp-shaped (deep→pale band). A **cosine-palette deriver** (authored in OKLab so the cosine oscillation stays perceptually even) gives a second, more *vivid/playful* derive mode from 4 small vectors — exactly the "simplified options" ask. Pair: keep `deriveAurora` for atmospheric, add a cosine-OKLab deriver for arresting/saturated.

### 4. OKLab vs OKLCh — pick the space per operation

Use **OKLab (cartesian) for mixing/interpolation** (no gray dead-zone, no hue drift), and **OKLCh (polar) for editing L/C/H of a single color**, with **explicit hue-path control** (`longer hue` / `shorter hue`) on any hue-wheel travel. RGB gradients look "grayish/boring"; OKLab fixes the muddy mid-tone.

- Evil Martians, "OKLCH in CSS" — https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
- Why RGB gradients look wrong / LCH-OKLCh fix — https://www.pavelp.cz/posts/eng-cpp-gradients-and-colorspaces/
- Banding/dirty-midtone + OKLCh — https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/

Relevance: aurora already bakes the LUT in **linear sRGB** (`flattenPalette` → `oklchToLinear`), so the *interpolation happens in linear-light RGB, not OKLab*. That is the classic muddy-midtone bug between distant hues. Baking the LUT by stepping in **OKLab and converting per LUT-texel** (instead of linearizing the 8 stops and letting the GPU lerp linearly) is a high-value, low-risk fidelity win.

### 5. Painterly fidelity — structure tensor / ETF + anisotropic Kuwahara

The SOTA real-time painterly pipeline (Kyprianidis/Kang/Döllner; Maxime Heckel's 2024 walkthrough):
1. **Structure tensor** via Sobel (Jxx, Jyy, Jxy) → local dominant orientation + anisotropy.
2. **Anisotropic Kuwahara**: a circular kernel split into N sectors (4/8), each sector's variance computed, output = lowest-variance sector's average — and the kernel is **squeezed + rotated to follow the structure-tensor orientation**, which is what produces feature-aligned brush-stroke flattening with sharp edges. Polynomial sector weights (`eta=0.1, lambda=0.5`) replace Gaussian for speed.
3. Controllable: `kernelSize/radius` (4–12), `SECTOR_COUNT`, sharpness.

- Maxime Heckel, "On Crafting Painterly Shaders" (real-time WebGL, full pipeline + function names) — https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/
- Kyprianidis, anisotropic Kuwahara on the GPU — https://www.kyprianidis.com/p/gpupro/
- LYGIA's drop-in `kuwahara` — https://lygia.xyz/filter/kuwahara

### 6. Van Gogh stroke fields — Edge Tangent Flow + structure-tensor swirl orientation

For a van-gogh variant with *real* directional brushwork (no subject matter): orient strokes by an **Edge Tangent Flow (ETF) field** — compute the gradient, rotate 90°, then **iteratively smooth so weak vectors align with strong neighbors and all run parallel to features**. Van Gogh's actual swirls follow Kolmogorov turbulence scaling — so a **curl-noise / turbulence flow field** (not a hand-drawn swirl) is the physically-faithful orientation source.

- Hertzmann, "Painterly Rendering with Curved Brush Strokes of Multiple Sizes" (SIGGRAPH '98) — the canonical layered coarse-to-fine, gradient-normal stroke direction, per-style params (approximation threshold, min/max stroke length, curvature filter, blur, grid size, opacity, HSV jitter) — https://mrl.cs.nyu.edu/publications/painterly98/hertzmann-siggraph98.pdf (cert error on fetch; cite the canonical PDF).
- ETF construction detail + Starry Night turbulence — https://medium.com/@kombib/canvas-to-code-the-starry-night-and-algorithms-that-dream-in-color-a3dffa8b03cb, https://scitechdaily.com/discover-the-science-behind-the-swirls-of-the-starry-night/
- Stroke-direction = gradient-normal + interpolated direction field — https://mrl.cs.nyu.edu/publications/painterly98/

Relevance: aurora's oil medium already places curved strokes along a flow field with bristle edges and impasto — it is 80% there. The van-gogh gap is (a) **orientation from a structure-tensor/ETF field derived from the underlying color field** instead of the generic flow pattern (so strokes hug zone boundaries like real brushwork), (b) **layered coarse-to-fine** strokes (Hertzmann's multi-size pass — currently `strokeLayers: 1|2`, want 2–3 size tiers), and (c) **HSV/OKLCh per-stroke jitter** which already exists as `brokenColor` but should follow Hertzmann's separate hue/sat/value jitter ranges.

### 7. WebGPU compute substrate

The 2025 path: WGSL compute shaders, ping-pong buffers, domain-warp / curl-noise / flow-field sims at interactive framerate (ShaderVine ships 16 such compute sims). TSL (Three Shading Language) is the portable WebGL↔WebGPU authoring layer.

- ShaderVine (WebGPU compute, 16 sims incl. domain warping) — https://meditations.metavert.io/p/shadervine-a-webgpu-shader-editor
- Maxime Heckel, "Field Guide to TSL and WebGPU" — https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/
- "Best of WebGPU January 2025" — https://www.webgpuexperts.com/best-webgpu-updates-january-2025

Relevance: glass-ui already has a `webgpu/glassShader.wgsl` + a `useWebGLCanvas` substrate. A WebGPU aurora path is feasible but should be **additive behind capability detection**, not a rewrite — the current WebGL2 fragment shader is the floor.

---

## ADOPT for glass-ui aurora — wave seeds (tranche-AW)

Each is a concrete, self-contained fold. Ordered by value/effort.

- **AW.W?-α · OKLab LUT bake.** Replace the linear-sRGB palette LUT lerp with an **OKLab-interpolated bake** — step the LUT in OKLab and convert each texel to linear-sRGB on the CPU, so adjacent stops never pass through gray. Touches `color.ts:flattenPalette` + the LUT upload only; shader `samplePalette` lerp stays. Highest fidelity-per-line; kills the muddy-midtone class. Cite: Evil Martians, Pavel's devlog.

- **AW.W?-β · Per-nucleus blend mode (the headline art-direction atom).** Add `blend: "normal" | "screen" | "overlay" | "soft-light" | "multiply"` to `AuroraNucleus`. The field accumulator (`composition.glsl.ts`) routes a nucleus's contribution through its blend op against the running field instead of pure softmax-average — so a bright nucleus can bloom *over* a zone, a dark one can ground it. This is the single biggest "art-directable color regions" lever the mesh-gradient tools have and aurora lacks. Cite: ColorFlow, ColorFffy.

- **AW.W?-γ · Recursive domain-warp boundaries.** Promote `warpAmount/warpScale` to a 2–3-deep `fbm(p+fbm(p+fbm(p)))` warp with `warpDepth: 1|2|3` and lacunarity 2.03. Apply to the *zone-boundary coordinate* so demarcations between nuclei go wispy/cloud-like. Cite: domain-warping technique doc, al-ro curl noise.

- **AW.W?-δ · Cosine-OKLab derive mode.** Add a second deriver alongside `deriveAurora`: `deriveCosine({a,b,c,d})` evaluating `a+b·cos(2π(c·t+d))` in OKLab then gamut-mapping each stop. Four small vectors → vivid, playful palettes (the "simplified options / minimal atoms" ask). Keep `deriveAurora` for atmospheric; this is the arresting/saturated sibling. Cite: IQ Palettes.

- **AW.W?-ε · Structure-tensor stroke orientation (van-gogh fidelity).** Derive a structure tensor from the underlying nuclei field (Sobel on the sampled base) and orient oil strokes by its **minor-eigenvector ETF** instead of the generic `flowField`, so strokes hug zone boundaries like real brushwork. Add `strokeOrient: "flow" | "tensor"`. Cite: Heckel painterly shaders, Hertzmann, ETF construction.

- **AW.W?-ζ · Layered coarse-to-fine strokes.** Extend `strokeLayers` to a 2–3-tier coarse→fine size cascade (Hertzmann multi-size), with per-tier `strokeScale` and Hertzmann-style separate hue/sat/value jitter ranges feeding the existing `brokenColor` path. Closes the "depth + variation" van-gogh gap. Cite: Hertzmann '98.

- **AW.W?-η · Anisotropic-Kuwahara finishing pass (optional medium).** A `medium: "kuwahara"` (or a post-pass flag) running structure-tensor + anisotropic Kuwahara over the composed field for the genuinely-painterly oil-pastel flatten-along-features look — params `kernelRadius` (4–12), `sectorCount`, `sharpness`. Heavier; gate on perf budget. Cite: Kyprianidis GPU Kuwahara, LYGIA, Heckel.

- **AW.W?-θ · Hue-path control on derive + drift.** Expose explicit `huePath: "shorter" | "longer"` on `deriveAurora` and the palette-drift so hue travel never accidentally crosses the wrong side of the wheel. Tiny, pure-color, high polish. Cite: OKLCh hue-path (MDN/Evil Martians).

- **AW.W?-ι · WebGPU path (additive, capability-gated).** A WGSL aurora compute/fragment path behind the existing `useWebGLCanvas`/`webgpu` substrate detection, WebGL2 staying the floor. Enables compute-driven domain-warp/curl flow at higher octave counts. Scope as a separate wave; do NOT rewrite the WebGL2 shader. Cite: ShaderVine, Heckel TSL field guide.

- **AW.W?-κ · Dynamic/interactive zones.** The cursor already swirls flow; extend to let the cursor **temporarily perturb the nearest nucleus** (radius/paletteBias pull) for live, interactive art-direction, decaying back on release. Builds on `useCursorInteraction.ts`. Cite: mesh-gradient interactive-control tooling (Framer/SOSOTAR cursor-mesh).

## Key source files (for the implementing wave)
- Field/composition: `src/components/custom/aurora/constants/shaders/composition.glsl.ts:8-60`
- Nucleus atom + config shape: `src/components/custom/aurora/constants/presets.ts:22-106`
- Color/derive core: `src/components/custom/aurora/composables/color.ts:42-262`
- Flow field: `src/components/custom/aurora/constants/shaders/flow.glsl.ts`
- Oil stroke primitive: `src/components/custom/aurora/constants/shaders/brush.glsl.ts`

## Sources
- https://colorflow.ls.graphics/ (April 2026) · https://www.figma.com/community/plugin/1613867457443153377/
- https://tkalmi.dev/blog/mesh-gradient-generator · https://colorffy.com/mesh-gradient-generator · https://gradientshub.com/tools/mesh-gradient-generator (2025)
- https://github.com/MiniMax-AI/skills/blob/main/skills/shader-dev/techniques/domain-warping.md · https://al-ro.github.io/projects/particles/
- https://iquilezles.org/articles/palettes/
- https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl · https://www.pavelp.cz/posts/eng-cpp-gradients-and-colorspaces/ · https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/
- https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ · https://www.kyprianidis.com/p/gpupro/ · https://lygia.xyz/filter/kuwahara
- https://mrl.cs.nyu.edu/publications/painterly98/hertzmann-siggraph98.pdf · https://medium.com/@kombib/canvas-to-code-the-starry-night-and-algorithms-that-dream-in-color-a3dffa8b03cb · https://scitechdaily.com/discover-the-science-behind-the-swirls-of-the-starry-night/
- https://meditations.metavert.io/p/shadervine-a-webgpu-shader-editor · https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/ · https://www.webgpuexperts.com/best-webgpu-updates-january-2025

All sources accessed 2026-06-06.

---

### Lane 17

I now have a complete corpus across all six research axes: AgX (full code + looks), PBR Neutral, ACES, OKLab gamut clipping (Bottosson primary), flow-based painterly rendering (Hertzmann/ETF), oil-pastel/van Gogh, WebGPU, and dithering. Let me synthesize the brief.

---

# Aurora SOTA brief — lane "tonemapping-backdrops"

Research for a stunning, arresting procedural gradient-art backdrop. No implementation. Findings + concrete AW wave seeds.

## Where the aurora is today (grounding)

- **Tonemap is a bare ACES approximation** — `tonemap.glsl.ts:5-14` is the Narkowicz 6-term ACES fit, applied in linear, clamped to [0,1]. That curve is the weakest part of the look: it desaturates and skews hue exactly where the gradient is brightest. Called once at `aurora.frag.ts:330` (`col = aces(col)`), then OETF at `:339`, then IGN dither at `:343`.
- **Palette is baked CPU-side to linear sRGB** through a real OKLab/OKLCh core (`color.ts` consumes value.js `gamutMapOKLab`, `oklabToLinearSRGB`), with a working `deriveAurora()` single-seed → N-stop harmony generator (`color.ts:152-200`, analogous/complementary/triad/monochrome). The derive-color variant the user wants **already exists** — it just isn't surfaced as a first-class mode.
- **Brushwork exists but is "best-of-9-cell SDF"** (`brush.glsl.ts:188` `bestOil`) with curved-spine strokes, bristle raggedness, impasto rim/shadow. Direction comes from a per-layer `flow` vector + local curl. It is NOT flow-field-anchored (ETF), which is the gap between "generic turbulence" and "genuinely van Gogh" (see below).
- **Composition** is a multi-nuclei softmax Gaussian field (`composition.glsl.ts:20`) over a palette LUT — these are the "atoms of control" (zones/nuclei + noise warp + color stops) the user describes. Good substrate; the look is bottlenecked at tonemap + stroke-direction, not at the field model.

## Findings (with citations)

### 1. Tonemapping — AgX is the current SOTA, but with a known caveat for vivid backdrops

- **AgX (Troy Sobotka)** replaced Filmic as Blender 4.0's default. It handles over-exposure like a real camera (bright colors path toward white instead of clipping to a hue-skewed primary), giving more natural, filmic results than ACES/Reinhard. ([Blender 4.0 color management docs](https://developer.blender.org/docs/release_notes/4.0/color_management/), 2023)
- **Minimal AgX, no LUT, drop-in GLSL** exists — Benjamin Wrensch's IOLITE post is the canonical realtime port; three.js shipped it (based on Filament's port of Blender's). The core is: inset matrix → log2 encode over EV range `[-12.47, +4.03]` → 6th-order polynomial sigmoid → outset matrix → look. ([IOLITE minimal AgX](https://iolite-engine.com/blog_posts/minimal_agx_implementation), Wrensch; [three.js issue #27362](https://github.com/mrdoob/three.js/issues/27362), 2023)
  - Inset/outset matrices and the polynomial (from three.js `ToneMappingFunctions.js`):
    - `agxDefaultContrastApprox(x) = 15.5·x⁶ − 40.14·x⁵ + 31.96·x⁴ − 6.868·x³ + 0.4298·x² + 0.1191·x − 0.00232`
    - `AgxMinEv = -12.47393`, `AgxMaxEv = 4.026069`
- **AgX "looks" are cheap ASC-CDL grades** applied after the sigmoid — this is the dial that makes AgX *arresting* rather than flat. From the UE5/Filament port ([nxrighthere gist](https://gist.github.com/nxrighthere/eb208dae8b66dbe452af223f276e46cc); [darktable punchy thread](https://discuss.pixls.us/t/more-punchy-contrasted-look-in-agx-by-default/55279)):
  - apply: `val = pow(val·slope + offset, power); return luma + sat·(val − luma)` where `luma = dot(val, vec3(0.2126,0.7152,0.0722))`
  - **default**: slope 1, power 1, sat 1
  - **golden**: slope `(1.0,0.9,0.5)`, power `0.8`, sat `0.8` — warm, dialed-back, editorial
  - **punchy**: slope 1, power `1.35`, sat `1.4` — high contrast + saturation; the "match ACES expectations" preset
- **The caveat that matters for a gradient backdrop**: both ACES and AgX lose saturation — Khronos found bright yellow/green/cyan become *unreachable* on sRGB, washing out. ([Khronos PBR Neutral press](https://www.khronos.org/news/press/khronos-pbr-neutral-tone-mapper-released-for-true-to-life-color-rendering-of-3d-products), 2024)
- **Khronos PBR Neutral** is the counter-SOTA: ~13 lines, preserves hue+saturation via scalar brightness reduction, desaturating *only* the brightest highlights. From [modelviewer.dev/examples/tone-mapping](https://modelviewer.dev/examples/tone-mapping):
  ```glsl
  // startCompression = 0.8 - 0.04;  desaturation = 0.15;
  float x = min(color.r, min(color.g, color.b));
  float offset = x < 0.08 ? x - 6.25*x*x : 0.04;
  color -= offset;
  float peak = max(color.r, max(color.g, color.b));
  if (peak < startCompression) return color;          // mid-tones untouched
  float d = 1. - startCompression;
  float newPeak = 1. - d*d/(peak + d - startCompression);
  color *= newPeak/peak;
  float g = 1. - 1./(desaturation*(peak-newPeak)+1.);
  return mix(color, newPeak*vec3(1), g);
  ```
- **Takeaway for aurora**: the aurora is not an HDR scene — it's an *already-in-gamut* OKLCh palette. A filmic curve that crushes saturation is the wrong tool by default. The right design is **a selectable tonemap operator** (PBR-Neutral as the vivid default, AgX-punchy/golden as the filmic/editorial looks, ACES retired or kept as legacy) — operator choice becomes an *art axis*, not a fixed seam. ([Lune.dev tone-mapping overview](https://www.lune.dev/questions/9887/understanding-tone-mapping-techniques-and-their-impact-on-rendered-d-scenes); [three.js tone-mapping overview](https://discourse.threejs.org/t/tone-mapping-overview/75204))

### 2. Color richness — OKLab gamut handling (Bottosson)

- Björn Ottosson's [sRGB gamut clipping](https://bottosson.github.io/posts/gamutclipping/) (Jan 25, 2021) is the primary source the codebase already half-uses. Five strategies; **"Adaptive L₀ with α≈0.05"** is the recommended balance — preserves lightness when possible, prevents the desaturation that "preserve chroma" and naive clamping cause. Boundary found via the per-hue **cusp** (max-saturation point), fitted + Halley refinement.
- The aurora's `gamutMapStop()` (`color.ts:250`) already routes through value.js `gamutMapOKLab` (adaptive-L0, hue-exact) then a 0.1%-inward chroma loop. **Good**. The opportunity is the *opposite* direction — pushing chroma *outward* toward the cusp for vividness, and doing per-pixel gamut-aware compression in-shader rather than only CPU-side at the stops. ([colorjs.io gamut mapping](https://colorjs.io/docs/gamut-mapping); [coloraide gamut docs](https://facelessuser.github.io/coloraide/gamut/))
- For "better than Stripe/OpenAI mesh gradients": those are CSS radial-layer / mesh approximations. ([nineproo mesh-gradient explainer](https://nineproo.com/blog/mesh-gradients-backgrounds); [ScienceDirect noisy gradient meshes](https://www.sciencedirect.com/science/article/abs/pii/S1524070319300153)) The aurora's edge is that it's a true per-pixel OKLCh field with domain warp — it can interpolate in perceptual space and tonemap, which CSS cannot. The win is to *lean into* that: OKLCh-space stop interpolation in-shader (not linear-sRGB lerp at `composition.glsl.ts:16`).

### 3. Brushwork — the genuine van-Gogh gap is flow-field anchoring (ETF), not more noise

- The seminal algorithm is **Hertzmann 1998, "Painterly Rendering with Curved Brush Strokes of Multiple Sizes"** ([PDF, NYU MRL](https://mrl.cs.nyu.edu/publications/painterly98/hertzmann-siggraph98.pdf)): paint coarse-to-fine, multiple brush sizes, **curved strokes that follow the image gradient's normal** (strokes ride along iso-color contours), color sampled from the source at the stroke anchor. The aurora's `curvedStroke` is structurally close but its direction is `flow + local curl`, not anchored to the field gradient.
- **Edge Tangent Flow (ETF)** is the modern refinement (Kang et al., flow-based abstraction): a smoothed tangent field that strokes follow, producing "smooth line flows describing important shapes." ([Flow-Centric Painterly Rendering](https://www.academia.edu/98441900/Flow_Centric_Painterly_Rendering); [Hays & Essa, Image and Video Based Painterly Animation](https://faculty.cc.gatech.edu/~hays/papers/IVBPA_Final.pdf)) — each stroke's angle = arctan of interpolated gradients at its anchor. **This is the single highest-leverage change for "congruent to real van Gogh."** In a procedural field the gradient is free (the nuclei softmax has an analytic gradient; or `fbm`-curl).
- Van Gogh's spirals are turbulent/Navier-Stokes-like flow; strokes that *follow a curl-noise vector field* read as authentic motion vs generic turbulence ([Canvas to Code Starry Night](https://medium.com/@kombib/canvas-to-code-the-starry-night-and-algorithms-that-dream-in-color-a3dffa8b03cb); [Sharma, A Van Gogh Inspired 3D Shader Methodology, thesis PDF](https://core.ac.uk/download/pdf/147237812.pdf)). Impasto = directional rim light along the stroke tangent (the aurora's `paintOver` already has a rim/shadow at `brush.glsl.ts:174-178` — it needs the light direction to be a uniform so highlights are *coherent* across all strokes, which is what reads as 3D depth).
- **Multiple brush sizes** (Hertzmann's coarse-to-fine) is the missing depth axis — the aurora uses one cell size per layer. Stacking 2-3 size tiers (big background dabs → medium → fine accents) is what gives real paintings their layered density.

### 4. Oil-pastel — tooth + scumbling + smudge, not just grain

- Digital oil-pastel SOTA is **paper tooth (anisotropic high-freq grain that pigment catches on), scumbling (broken-color layering of scribbled strokes), and smudge/solvent blending** ([Mont Marte 10 oil-pastel techniques](https://www.montmarte.com/blogs/tips-techniques/oil-pastel-techniques); [oilpasteltechniques.com blending](http://www.oilpasteltechniques.com/blending-with-oil-pastels/); [ReelMind digital oil pastel](https://reelmind.ai/blog/create-stunning-digital-oil-pastel-art)). The aurora's crayon medium is "anisotropic tooth noise × base color" (`aurora.frag.ts:88`, `mediums.glsl`) — that's the tooth, missing the *scumble* (two-three offset broken-color layers) and *smudge* (a directional blur along the local flow that simulates a finger drag). True oil-pastel redolence = tooth + scumble + a smudge pass, all reading the same flow field.

### 5. Banding / smoothness — the gradient must be flawless

- The aurora already does the right thing: Jimenez IGN dither in *display* space post-OETF (`aurora.frag.ts:343`). IGN is the cheap, good-on-GPU choice. ([Demofox IGN](https://blog.demofox.org/2022/01/01/interleaved-gradient-noise-a-different-kind-of-low-discrepancy-sequence/); [Bart Wronski dithering pt3](https://bartwronski.com/2016/10/30/dithering-part-three-real-world-2d-quantization-dithering/))
- **SOTA upgrade**: blue-noise > IGN for low-contrast gradients (IGN's pattern is still visible and can alias), and **triangular-PDF (TPDF)** dither beats uniform. ([frost.kiwi how to fix banding](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/); [Moments in Graphics free blue noise](https://momentsingraphics.de/BlueNoise.html); [NVIDIA spatiotemporal blue noise](https://developer.nvidia.com/blog/rendering-in-real-time-with-spatiotemporal-blue-noise-textures-part-2/)) For a hero backdrop where banding is the most visible defect, a small blue-noise texture + TPDF remap is worth the one texture fetch.

### 6. WebGPU — yes, but fragment-path, and gated

- WebGPU now ships in Chrome/Edge/Firefox/Safari, ~65-70% desktop reach via Chromium. **Safari still lacks compute shaders** (as of mid-2025). ([WebGPU hits critical mass](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/); [MDN WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API))
- Critical finding: for a full-screen procedural backdrop, **the fragment-shader path is faster than compute in WebGPU** (measured) — so a WGSL *fragment* port is the right target, not a compute rewrite. This also sidesteps the Safari-compute gap entirely. The existing `useWebGLCanvas` substrate (WebGL2) stays the fallback. ([WebGPU vs WebGL benchmarks, SitePoint](https://www.sitepoint.com/webgpu-vs-webgl-inference-benchmarks/); WGSL is a near-1:1 transpile of the existing GLSL).

---

## ADOPT for glass-ui aurora — wave seeds (tranche AW)

Each is a concrete, independently-shippable AW wave/fold.

- **AW.W?-α — Selectable tonemap operator (HEADLINE).** Replace the fixed `aces()` (`tonemap.glsl.ts`) with a `uTonemap` int dispatch: `0` PBR-Neutral (new vivid default — preserves the OKLCh saturation the palette was authored for), `1` AgX-default, `2` AgX-punchy, `3` AgX-golden, `4` ACES (legacy). Splice the AgX inset/outset matrices + 6th-order sigmoid + ASC-CDL look block; splice PBR-Neutral's 13-line `CommerceToneMapping`. Surface as a config atom + per-preset. This is the single biggest look upgrade and directly answers "rich, non-clipped, filmic color."

- **AW.W?-β — AgX look grade as a first-class art axis.** Expose `slope`/`power`/`saturation`/`offset` (the ASC-CDL triplet) as live uniforms on top of whichever operator, so a consumer dials golden↔punchy continuously instead of picking a fixed preset. Cheap (one `pow` + one luma mix). Makes the backdrop "arresting" tunable per brand.

- **AW.W?-γ — In-shader OKLCh stop interpolation.** Change `samplePalette` (`composition.glsl.ts:9-17`) from linear-sRGB `mix` to OKLab-space interpolation (the procedural-color chunk already carries the OKLab matrices the blob uses). Perceptually-even ramps with no muddy mid-stop — the thing CSS mesh gradients structurally can't do. Pairs with γ': push chroma toward the per-hue cusp (Bottosson adaptive-L0, α≈0.05) for max vividness before tonemap.

- **AW.W?-δ — Flow-field-anchored brushstrokes (van-Gogh variant).** Give `bestOil`/`curvedStroke` (`brush.glsl.ts`) a true ETF/gradient-anchored direction: stroke angle = the analytic gradient of the nuclei field (or a curl-noise field), not `flow + local curl`. Add a *global* impasto light-direction uniform so rim highlights are coherent across all strokes (reads as real 3D paint depth). This is the "genuinely congruent to real van Gogh" lever. No subject matter — pure abstract flow.

- **AW.W?-ε — Multi-size brush tiers (Hertzmann coarse-to-fine).** Stack 2-3 `bestOil` passes at decreasing cell sizes (background dabs → medium → fine accents), each reading the same flow field. Gives the layered density real oil paintings have; the current single-cell-size pass reads flat by comparison.

- **AW.W?-ζ — Oil-pastel: tooth + scumble + smudge.** Upgrade the crayon/pastel mediums (`mediums.glsl`) from "tooth × base" to a three-part recipe: anisotropic tooth (keep) + a scumble pass (2 offset broken-color layers via the existing `brokenColorJitter`) + a smudge pass (short directional blur along local flow). This is what makes the oil-pastel mode "genuinely painterly."

- **AW.W?-η — Blue-noise + TPDF dither.** Swap the IGN dither (`aurora.frag.ts:343`) for a small tiled blue-noise texture remapped to a triangular PDF. Banding is the most visible defect on a hero gradient; this is the SOTA fix. Keep IGN as the texture-free fallback.

- **AW.W?-θ — `deriveAurora` as a first-class "derive-from-one-color" mode + simplified options.** The harmony generator already exists (`color.ts:152`). Surface it as a top-level config mode ("seed one color → full palette") with a *simplified* control set (seed + harmony + 1-2 sliders), hiding the per-stop atoms behind an "advanced" reveal. Directly answers "derive-color variant" + "simplified options."

- **AW.W?-ι — WebGPU/WGSL fragment backend (gated, additive).** Transpile the GLSL pipeline to a WGSL *fragment* shader (faster than compute, dodges Safari's compute gap), feature-detect `navigator.gpu`, fall back to the WebGL2 `useWebGLCanvas` substrate. No behavior change — same look, modern backend, headroom for the heavier multi-size brush passes (δ/ε). Pure substrate isolation per the library's subpath discipline.

- **AW.W?-κ (fold) — Retire bare ACES from the default seam.** Once the operator dispatch (α) lands, ACES stops being the silent default. It's the wrong curve for an in-gamut perceptual palette (crushes the exact yellows/greens/cyans the OKLCh stops were chosen for, per Khronos). Keep only as the `4` legacy option.

**Sequencing note:** α+γ (tonemap + OKLCh interp) are the gradient-art headline and ship first/independently. δ+ε+ζ are the brushwork tranche (van-Gogh + oil-pastel) and share the flow-field plumbing. η+θ are low-risk polish/UX folds. ι is the substrate modernization, last and gated.

**Primary sources:** [IOLITE minimal AgX](https://iolite-engine.com/blog_posts/minimal_agx_implementation) · [three.js AgX #27362](https://github.com/mrdoob/three.js/issues/27362) · [Blender 4.0 AgX docs](https://developer.blender.org/docs/release_notes/4.0/color_management/) · [Khronos PBR Neutral](https://www.khronos.org/news/press/khronos-pbr-neutral-tone-mapper-released-for-true-to-life-color-rendering-of-3d-products) + [modelviewer.dev code](https://modelviewer.dev/examples/tone-mapping) · [nxrighthere AgX UE5 looks gist](https://gist.github.com/nxrighthere/eb208dae8b66dbe452af223f276e46cc) · [Bottosson sRGB gamut clipping (2021)](https://bottosson.github.io/posts/gamutclipping/) · [Hertzmann 1998 curved brush strokes](https://mrl.cs.nyu.edu/publications/painterly98/hertzmann-siggraph98.pdf) · [Flow-Centric Painterly Rendering / ETF](https://www.academia.edu/98441900/Flow_Centric_Painterly_Rendering) · [Hays & Essa painterly animation](https://faculty.cc.gatech.edu/~hays/papers/IVBPA_Final.pdf) · [frost.kiwi banding/dither](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/) · [Demofox IGN](https://blog.demofox.org/2022/01/01/interleaved-gradient-noise-a-different-kind-of-low-discrepancy-sequence/) · [WebGPU critical mass](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/) · [WebGPU vs WebGL benchmarks](https://www.sitepoint.com/webgpu-vs-webgl-inference-benchmarks/)

---

### Lane 18

I have everything needed. Confirmed: the dither at line 343 is `col += (1.0/255.0) * (ign(gl_FragCoord.xy) - 0.5)` — a single scalar value added uniformly to all three channels (correlated across RGB), with a **uniform/rectangular** distribution despite the comment claiming "triangular," and **static** (no temporal frame offset). These are precisely the three SOTA gaps. Here is the brief.

---

# Aurora SOTA Research — Lane: Dithering / Banding Elimination

Research only. No implementation. Findings ground concrete AW wave-seeds at the end.

## Current state (what aurora ships today)

`src/components/custom/aurora/constants/shaders/aurora.frag.ts`:
- **L185-187** — `ign(p)` is the canonical Jorge Jimenez Interleaved Gradient Noise one-liner: `fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))))`.
- **L339** — `col = linearToSrgb(col)` applies the sRGB OETF (the linear→display transfer).
- **L343** — `col += (1.0 / 255.0) * (ign(gl_FragCoord.xy) - 0.5)` — the dither, applied **after** the OETF, in display space. Correct placement.
- **L331-332** — a separate `hash21`-based film grain is added in **linear** space before the OETF, scaled by `uPaperGrain`.

Three things the current code gets right, and three concrete gaps versus SOTA:

**Right:** (1) it uses IGN not white noise; (2) it dithers in display space, post-OETF, at the value being quantized — this is the single most important correctness rule (Wronski, frost.kiwi); (3) amplitude is 1 LSB (`1.0/255.0`), the textbook value for 8-bit output.

**Gaps:**
1. **The dither is NOT triangular** despite the L182-184 and L341 comments asserting "1-LSB triangular dither." `(ign(p) - 0.5)` is a **uniform (rectangular/RPDF)** distribution in `[-0.5, +0.5]/255`. A true TPDF dither needs either two summed noise samples or a remap. This is a comment/implementation mismatch and the headline refinement for this lane.
2. **The dither is static** — no temporal animation. On an animated backdrop that runs for minutes, a frozen dither pattern reads as a fixed film-of-grain texture stuck to the screen rather than dissolving into the motion. IGN has a known correct temporal scroll (Jimenez 5.588238 px/frame).
3. **The dither is a single scalar added to all three channels** (fully correlated RGB). Correlated dither shifts luminance and produces a visible monochrome grain; decorrelating per channel (or shaping for luminance-constancy) is the next quality rung.

## The techniques (cited)

### 1. Display-space placement is the non-negotiable rule

Dither must be added in the **same space as the quantization** — i.e. after the OETF/gamma encode, immediately before the 8-bit truncation, at the magnitude that's actually being rounded. Dithering in linear space and then applying the transfer spreads the noise non-uniformly across the tonal range and under-dithers exactly the dark mid-tones where banding is worst. Aurora already does this (L339 then L343). Keep it.
— Bart Wronski, "Dithering part three – real world 2D quantization dithering," 2016-10-30 — https://bartwronski.com/2016/10/30/dithering-part-three-real-world-2d-quantization-dithering/
— frost.kiwi, "How to (and how not to) fix color banding," — https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/

### 2. Triangular PDF (TPDF) beats uniform (RPDF) dither — the actual SOTA refinement

A uniform-PDF dither decorrelates the quantization error but leaves the error **variance modulated by the signal** — residual low-frequency "ghost bands" remain at the half-step crossings. A **triangular-PDF** dither (range doubled to ±1 LSB) makes the total error both zero-mean AND signal-independent in variance: it eliminates the residual banding "without over-noising the image" (Gjoel/Playdead via Wronski). The two canonical constructions:

- **Two-sample sum** (textbook): `tri = (n1 + n2) - 1.0` where `n1,n2 ∈ [0,1)` are two *independent* uniform samples; this is the convolution-of-two-rectangles definition, range `[-1,1]`, variance `Δ²/6`, mean 0.
  — dsprelated/comp.dsp dither thread — https://www.dsprelated.com/showthread/comp.dsp/220242-1.php
- **Single-sample remap** (Alex Vlachos, GDC 2015 "Advanced VR Rendering," slide ~49 — one noise tap, cheaper): take uniform `v∈[0,1]`, then
  ```glsl
  float orig = v * 2.0 - 1.0;
  v = orig * inversesqrt(abs(orig));   // triangular shaping
  v = max(-1.0, v);                    // guard the 0*rsqrt(0) NaN
  ```
  This reshapes one uniform sample into a triangular distribution in roughly `[-1,1]` with a single texture-free tap — ideal for aurora, which wants zero texture lookups.
  — Alex Vlachos, "Advanced VR Rendering," GDC 2015 — https://media.steampowered.com/apps/valve/2015/Alex_Vlachos_Advanced_VR_Rendering_GDC2015.pdf
  — Shadertoy "dithering: triangular valve" port — https://www.shadertoy.com/view/Md3XRf (403 to bot fetch; formula confirmed via ENB/ReShade ports below)
  — ENBSeries / ReShade "Triangular Dither" ports — http://enbdev.com/enbseries/forum/viewtopic.php?p=78179 , https://reshade.me/forum/shader-presentation/4858-triangular-dither

Net: the amplitude on a TPDF dither is `±1 LSB` (i.e. multiply the shaped `[-1,1]` value by `1.0/255.0`), versus the `±0.5 LSB` of the current uniform form.

### 3. Temporal animation of IGN (for an animated backdrop)

Naively adding `uTime` to the IGN coordinate destroys its low-discrepancy structure. Jimenez's empirically-tuned scroll is **5.588238 px/frame on both axes**, cycling frame mod 64:
```glsl
float x = pixelX + 5.588238 * float(frame % 64);
float y = pixelY + 5.588238 * float(frame % 64);
```
This keeps every 3×3 neighborhood a low-discrepancy set frame-to-frame, so the dither "boils" pleasantly and averages out over time instead of sitting static.
— Alan Wolfe (demofox), "Interleaved Gradient Noise: A Different Kind of Low Discrepancy Sequence," 2022-01-01 — https://blog.demofox.org/2022/01/01/interleaved-gradient-noise-a-different-kind-of-low-discrepancy-sequence/

### 4. Per-channel / luminance-shaped dither (decorrelation)

A single scalar dither added to R, G, and B identically is a pure luminance perturbation — visible as monochrome grain. Decorrelating the three channels (different offsets per channel) and/or shaping the noise so quantized RGB holds **luminance approximately constant** makes the dither far less perceptible, because the eye is more sensitive to luminance than to chroma. Bevy's banding fix and the dither literature both decorrelate channels.
— Bevy PR #5264 "Fix color banding by dithering image before quantization" — https://github.com/bevyengine/bevy/pull/5264
— Dither (Wikipedia), luminance-constancy / per-channel dither — https://en.wikipedia.org/wiki/Dither

### 5. Spatiotemporal blue noise (STBN) — the texture-based frontier (evaluate, likely defer)

STBN is the current best-in-class for animated dither: a small (64³ / 128²×64) texture where neighbors differ maximally in both space and time, and the noise is **toroidally progressive** so every still pixel rides a good sequence and the pattern low-pass-filters cleanly (a Gaussian blur removes it entirely — IGN does not filter out cleanly). For aurora this is a real upgrade in perceptual quality, but it costs a texture upload + a tap per pixel and breaks the current "texture-free, single-pass, zero-tap" property. Recommend it as an optional high-fidelity path, not the default.
— NVIDIA, "Rendering in Real Time with Spatiotemporal Blue Noise Textures, Part 2" — https://developer.nvidia.com/blog/rendering-in-real-time-with-spatiotemporal-blue-noise-textures-part-2/
— Wolfe et al. blue-noise vs IGN neighborhood analysis (demofox, link above)

### 6. OKLab/OKLch and dither interact (palette side, relevant to the broader aurora goal)

OKLab is now the default gradient-interpolation space in Photoshop and CSS Color 4; it is the right space to author the perceptually-uniform stop ramps the user wants. But a perceptually-smooth OKLab ramp **still bands at 8-bit output** — the smoother the ramp, the more visible the banding, because the steps are tiny and regular. So OKLch interpolation and display-space dither are complementary, not alternatives: do the ramp in OKLch, dither at the very end in sRGB display space. (Aurora already linearizes/OETFs correctly; the palette-space upgrade is a separate lane but the dither lane must stay the *last* op.)
— Björn Ottosson, "A perceptual color space for image processing (Oklab)" — https://bottosson.github.io/posts/oklab/
— Aras Pranckevičius, "Optimizing Oklab gradients," 2022-03-11 — https://aras-p.info/blog/2022/03/11/Optimizing-Oklab-gradients/

## ADOPT for glass-ui aurora — wave-seeds

Each is a concrete AW aurora wave/fold. Ordered cheapest-highest-leverage first.

- **AW · fold — TPDF dither (fix the lie in the comment).** Replace the uniform `(ign(p) - 0.5)` at `aurora.frag.ts:343` with a true triangular remap of the IGN sample (Vlachos single-tap form: `orig = v*2-1; tri = orig*inversesqrt(abs(orig)); tri = max(-1.,tri);`), amplitude `±1.0/255.0`. Zero new taps, zero textures. Also fix the L182-184 / L341 comments, which currently claim "triangular" for what is rectangular. This is the headline of the lane. *(Gate idea: a `proof:aurora-dither-tpdf` that asserts the shaped-noise variance / range matches TPDF, mirroring the existing `proof:aurora-space-gamma` seam.)*

- **AW · fold — animate the dither.** Feed a frame index into IGN via the Jimenez `5.588238 * (frame % 64)` scroll so the dither boils with the animation instead of sitting frozen. Aurora already has `uTime`; derive an integer frame (or pass a frame uniform from `frameLoop.ts`). Must respect the substrate's `prefers-reduced-motion` freeze — when the rAF parks under PRM, freeze the dither frame too (it already paints one static frame; that's fine).

- **AW · fold — decorrelate the dither across RGB.** Give R/G/B independent IGN offsets (e.g. add a small per-channel constant to the coordinate, or three different prime offsets) so the grain stops reading as monochrome luminance noise. Cheapest version: three IGN taps with offset coords; luminance-constant shaping is the stretch goal. Pairs naturally with the TPDF fold.

- **AW · fold — unify dither + film-grain ordering.** Today linear-space `hash21` grain (L331-332) and display-space IGN dither (L343) are two separate noise systems straddling the OETF. Audit whether the linear grain should also move post-OETF (grain is an aesthetic texture so linear is defensible, but document the intent), and ensure the dither is unconditionally the **last** op before premultiply on every medium path (pastel/watercolor/oil/crayon all funnel through `main()` after L324, so this holds — keep it invariant when the painterly lanes touch `main`).

- **AW · wave — optional STBN high-fidelity path.** Add a build/runtime flag that swaps the texture-free IGN for a spatiotemporal-blue-noise texture tap (128²×64), TPDF-remapped, animated by frame index. This is the genuinely SOTA result for a long-running animated backdrop and low-pass-filters cleanly. Gate behind a "fidelity" prop so the default stays zero-tap/single-pass; only consumers who want the most arresting result pay the texture cost. Cross-reference the goo-blob, which composes the same `useWebGLCanvas` substrate — a shared STBN texture on the substrate would serve both (substrate-without-≥2-consumers invariant satisfied: aurora + blob).

- **AW · note (cross-lane dependency) — keep dither last under OKLch palette work.** When the separate palette/derive-color lane moves stop interpolation into OKLch for perceptually-uniform ramps, the smoother ramps will band *more* at 8-bit, making this dithering lane more load-bearing, not less. The pipeline order must stay: OKLch ramp → linear compose → ACES → OETF → **TPDF dither** → premultiply. Flag this so the two lanes don't reorder each other.

### Source files referenced
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts` (L182-187 `ign`, L331-332 linear grain, L339 OETF, L341-343 dither, L300-324 `main` medium dispatch)
- `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (`OETF_GLSL` — shared sRGB transfer, spliced at L180)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/tonemap.glsl.ts` (notes the grain+IGN+OETF seam closes at `main()`)

---

### Lane 19

I now have all the material needed with verified dates and citations. Synthesizing the brief.

---

# WebGPU for the glass-ui Aurora — SOTA Research Brief
**Lane: webgpu-procedural** · 2026-06-06 · research only, no implementation

## TL;DR

WebGPU shipped in all four major browser engines as of **November 25, 2025** (Safari 26 was the last to land), so a WebGPU aurora is *deployable* in 2026 — but it is **not yet "Baseline widely available"** (the ~30-month-since-all-engines mark hasn't passed), and platform parity is incomplete (Firefox Linux/Android still in progress, Chrome Android needs 121+, Intel Macs partial). The honest 2026 posture is **WebGPU-first with the existing WebGL2 fragment shader as a real, tested fallback** — roughly 95% WebGPU reach, 5% WebGL2. The aurora is *already* a sophisticated WebGL2 painterly engine (oil/pastel/watercolor/crayon mediums, curved-stroke SDFs, domain warp, OKLCh-baked palette); WebGPU's payoff is not "make it possible" but "make it richer and faster" via compute shaders, storage buffers, and a multi-pass structure-tensor → anisotropic-Kuwahara pipeline that the single-pass WebGL2 fragment shader fundamentally cannot do.

---

## Findings

### 1. WebGPU readiness — deployable, not yet "Baseline widely available"

- All four engines ship WebGPU by default as of **Nov 25, 2025** (Safari 26 the last engine). Chrome/Edge 113+ (May 2023, D3D12/macOS/ChromeOS), Firefox 141+ Windows / 145+ Apple-Silicon macOS, Safari 26 (macOS Tahoe, iOS/iPadOS/visionOS 26). [web.dev, 2025-11-25](https://web.dev/blog/webgpu-supported-major-browsers); [VideoCardz, 2025](https://videocardz.com/newz/webgpu-is-now-supported-by-all-major-browsers)
- **Caveat — not full parity:** Firefox Linux/Android still in progress (Mozilla targeting Android 2026); Chrome Android needs 121+ on Android 12+ with Qualcomm/ARM GPU; Intel-based Macs partial. [web.dev, 2025-11-25](https://web.dev/blog/webgpu-supported-major-browsers); [WebGPU.com, 2025](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/)
- Community framing varies: some sources call early-2026 "Baseline" loosely ([VR.org, 2026](https://vr.org/articles/webgpu-baseline-2026-three-js-webxr-default)), but web.dev itself does **not** assign a Baseline date — it's "newly available across engines," not the 30-month "widely available" tier. Treat it as *production-viable-with-fallback*, not *assume-everywhere*.
- Production guidance is unanimous: **WebGPU-first, WebGL2-second**, detect via `navigator.gpu` + `requestAdapter()` null-check, lazy-load the matching path. ~95% WebGPU / 5% WebGL2 split reported. [Progosling, 2026-01](https://progosling.com/en/dev-digest/2026-01/webgpu-broad-shipping-adoption-checklist); [utsubo migration guide, 2026](https://www.utsubo.com/blog/webgpu-threejs-migration-guide)

### 2. What WebGPU buys a procedural backdrop over WebGL2

- **Compute shaders** (WGSL `@compute`) — absent in WebGL2 entirely. Direct buffer access, workgroup shared memory, synchronization; no more "encode data as textures and abuse draw calls as dispatches." Order-of-magnitude gains on particle/procedural workloads. [WGSL spec, W3C](https://www.w3.org/TR/WGSL/); [webgpufundamentals compute](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html)
- **Storage buffers** — up to ≥128MB binding vs WebGL2's ~64KB uniform cap. Lets the aurora drive **thousands of stroke instances from a buffer** instead of the current `MAX_NUCLEI 6` / `MAX_STOPS 8` uniform-array ceiling baked into `aurora.frag.ts:54-76`. [Chrome from-WebGL-to-WebGPU](https://developer.chrome.com/docs/web-platform/webgpu/from-webgl-to-webgpu)
- **Multi-pass / ping-pong is native and cheap** — storage textures + compute let you do structure-tensor → flow-field → Kuwahara as separate passes in one device, no FBO juggling. WebGL2 can multi-pass via FBOs but it's awkward; the current aurora is **single-pass** (everything in one `main()`), which caps brushwork quality. [Codrops reaction-diffusion WebGPU, 2024-05](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/); [Phish Chiang ping-pong→compute](https://medium.com/phishchiang/webgpu-from-ping-pong-webgl-to-compute-shader-%EF%B8%8F-1ab3d8a461e2)
- **Precision/consistency** — WGSL is statically validated, AOT-compilable, robust resource access → consistent cross-hardware results vs GLSL's per-driver variance. [WGSL spec](https://www.w3.org/TR/WGSL/); [webgpufundamentals WGSL](https://webgpufundamentals.org/webgpu/lessons/webgpu-wgsl.html)

### 3. Migration path (WebGL2 frag → WebGPU)

The mechanical port is well-trodden. Per [Chrome's from-WebGL-to-WebGPU guide](https://developer.chrome.com/docs/web-platform/webgpu/from-webgl-to-webgpu):

1. **Context** — `canvas.getContext('webgpu')` + `device.queue` (stateless; you own the canvas config) vs `getContext('webgl2')`.
2. **Pipeline** — build one `GPURenderPipeline` upfront (encapsulates all the global state WebGL2 set incrementally).
3. **Shaders** — GLSL → WGSL. The aurora's GLSL is portable in shape: `hash21/vnoise/fbm`, `domainWarp`, `curvedStroke`, ACES all translate. Bindings move from named uniforms to index/byte-offset.
4. **Uniforms → storage buffers + `GPUBindGroup`** — the aurora's ~40 uniforms (`aurora.frag.ts:57-117`) become a packed buffer; the nuclei/palette arrays become storage buffers (lifts the count ceilings).
5. **Coordinate space** — depth clip is `[0,1]` in WebGPU vs `[-1,1]` WebGL2 (irrelevant for a fullscreen quad, but note it).
6. **Errors** — async (`pushErrorScope`) vs synchronous `gl.getError()`.

**Abstraction option — TSL (Three Shading Language).** Write shaders once in JS-functional node form; `WebGPURenderer` auto-falls-back to WebGL when WebGPU is absent (`forceWebGL: true` for dev). Buys write-once dual-backend + a real node system over string-splicing. Costs: very verbose functional syntax, can't drop to raw WGSL, and **pulls in Three.js** — a heavy dependency the aurora (hand-rolled `useWebGLCanvas`) does not currently carry. [Maxime Heckel, TSL field guide, 2025-10-14](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/). For glass-ui's zero-Three, peer-dep-disciplined posture, **hand-written WGSL with a WebGL2 fallback** is the better fit than adopting Three+TSL.

### 4. Painterly / gradient-art SOTA (the "stunning, arresting" goal)

- **Anisotropic Kuwahara filter** is the canonical real-time oil/pastel abstraction: structure tensor (Sobel Gx/Gy) → smoothed edge-tangent field → squeeze+rotate an elliptical kernel along the flow → per-sector mean/variance → output lowest-variance sector. Gives "the clearness of cartoon illustration but the directional information of oil painting." This is a **multi-pass, texture-reading** filter — exactly what WebGPU compute/ping-pong enables and the current single-pass aurora cannot run. [Kyprianidis & Kang, *Image and Video Abstraction by Anisotropic Kuwahara Filtering*, Eurographics](https://diglib.eg.org/items/4cdcfa3c-afe3-4fd8-acaf-dbccce2ff216); [Maxime Heckel, *On Crafting Painterly Shaders*, 2024](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/); [*Oil Painting Style Rendering Based on Kuwahara Filter*, 2019](https://www.researchgate.net/publication/334689545_Oil_Painting_Style_Rendering_Based_on_Kuwahara_Filter)
- **Papari circular kernel** (8 sectors vs 4) + Gaussian/polynomial `[(x+ζ)−ηy²]²` sector weighting → sharper, more anisotropic, cheaper output. The 2024 refinement work targets exactly "sharper and more anisotropic." [Maxime Heckel, 2024](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/)
- **Van-Gogh brushstroke depth** = the aurora's existing `curvedStroke` SDF (`brush.glsl.ts`) **oriented by the structure-tensor edge-tangent field** (strokes perpendicular to max-contrast / along flow) + **impasto via height→normal lighting**: treat stroke coverage as a height field, derive a normal, add a directional catch-light + shadow rim. The aurora *already* fakes this with a fixed-vector rim (`brush.glsl.ts:173-178`); a real height-derived normal under a movable light is the upgrade. [LearnOpenGL Normal Mapping](https://learnopengl.com/Advanced-Lighting/Normal-Mapping); [Van Gogh 3D shader thesis (TAMU)](https://core.ac.uk/download/pdf/147237812.pdf); [Sharma, *A Van Gogh Inspired 3D Shader Methodology*](https://core.ac.uk/download/pdf/147237812.pdf)
- **Mesh-gradient bettering (Stripe/OpenAI/Linear class)** — the famous backdrops are ~10KB/~800-line WebGL noise+gradient quads; the aurora's domain-warp + softmax-nuclei field (`composition.glsl`, `domainWarp` at `aurora.frag.ts:206`) already exceeds them. The differentiator to push past them: **OKLCh interpolation + flow-field-aligned painterly overlay** (mesh gradients are smooth-only; nobody ships a painterly mesh gradient). [LearnUI mesh gradients deep-dive](https://www.learnui.design/blog/mesh-gradients.html); [Stripe mesh-gradient writeup](https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2)
- **OKLCh in-shader caveat** — interpolate in **OKLab (Cartesian), not OKLCh (polar hue)** for the *mixing* step: polar hue interpolation takes "unexpected detours" through out-of-gamut/grey mid-tones and darkens. Tailwind itself switched OKLCH→OKLab for gradients for this reason. The aurora currently bakes the palette to linear-sRGB CPU-side (`color.ts oklchToLinear`, `aurora.frag.ts:60`); doing the *blend* in OKLab in-shader removes mid-tone greying. Banding is separate (8-bit quantization — the aurora already handles it with IGN dither at `aurora.frag.ts:185,343`). [Tailwind issue #14955](https://github.com/tailwindlabs/tailwindcss/issues/14955); [Toolbox365 gradient banding/OKLCH](https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/); [Bevy PR #19330 OKLab/OKLCH gradient interpolation](https://github.com/bevyengine/bevy/pull/19330)

### 5. Where the current aurora is already strong (don't rebuild)

The WebGL2 engine is mature and should remain the fallback verbatim:
- Curved swept-stroke SDF with bristle-ragged edges, shape profiles, end-caps, fwidth-AA — `brush.glsl.ts:72-149`
- Four PEER mediums + broken-color jitter + impasto rim — `mediums.glsl.ts`, `brush.glsl.ts:155-183`
- Quilez double domain-warp + cellular/hybrid modes + cursor swirl — `aurora.frag.ts:206-247`
- Linear-space pipeline + ACES + spliced OETF + IGN dither (the AV.W1/W2 correctness work) — `aurora.frag.ts:330-343`
- Reduced-motion freeze upstream of the shader (`uTime` frozen by runtime) — `aurora.frag.ts:128-130`

The **ceilings** WebGPU lifts: `MAX_NUCLEI 6` / `MAX_STOPS 8` uniform arrays (`aurora.frag.ts:54-76`), single-pass-only (no structure-tensor/Kuwahara), `bestOil` 3×3 best-of-9 stroke placement (`brush.glsl.ts:188`) instead of a real instanced stroke buffer.

---

## ADOPT for glass-ui aurora — wave seeds (tranche AW)

Each is a concrete, independently-shippable fold. Ordered so the fallback contract lands first and nothing blocks on WebGPU ubiquity.

- **AW.W0 — Backend-select seam + WebGL2 fallback contract.** Add a `navigator.gpu` + `requestAdapter()` capability probe to `useWebGLCanvas`/`useAurora`; WebGPU-first, the *current* WebGL2 frag shader as the tested fallback. Lazy-load the WGSL path. Hand-written WGSL, **no Three.js/TSL** (preserves the zero-Three peer-dep posture). Gate: `proof:aurora-backend-fallback` (forces WebGL2, asserts identical visual contract). [Progosling 2026-01](https://progosling.com/en/dev-digest/2026-01/webgpu-broad-shipping-adoption-checklist)

- **AW.W1 — WGSL port of the existing fragment pipeline (parity, not new look).** Port `aurora.frag.ts` GLSL → WGSL behind the seam: noise/fbm/domainWarp/nuclei/mediums/ACES/OETF. Uniforms → one packed storage buffer; nuclei/palette → storage buffers (lifts `MAX_NUCLEI 6`/`MAX_STOPS 8`). Pixel-parity target against the WebGL2 reference. [Chrome from-WebGL-to-WebGPU](https://developer.chrome.com/docs/web-platform/webgpu/from-webgl-to-webgpu)

- **AW.W2 — Multi-pass structure-tensor flow field (compute).** New compute pass: Sobel Gx/Gy on the warped color field → smoothed structure tensor → per-pixel edge-tangent + anisotropy storage texture. This is the *atom of control* that orients brushwork. WebGPU-only; the WebGL2 fallback keeps its current flow-pattern enum. [Kyprianidis & Kang, Eurographics](https://diglib.eg.org/items/4cdcfa3c-afe3-4fd8-acaf-dbccce2ff216)

- **AW.W3 — Anisotropic Kuwahara medium (painterly headline).** Add an anisotropic-Kuwahara pass consuming the W2 tensor field (Papari 8-sector circular kernel + polynomial weighting), squeeze/rotate the kernel along edge-tangent. New `medium: "kuwahara-oil" | "kuwahara-pastel"`. This is the genuinely-painterly oil-pastel mode the user wants, and it *requires* the multi-pass W2 substrate. [Maxime Heckel 2024](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/); [Oil Painting via Kuwahara 2019](https://www.researchgate.net/publication/334689545_Oil_Painting_Style_Rendering_Based_on_Kuwahara_Filter)

- **AW.W4 — Van-Gogh stroke variant (atomic instanced brushstrokes).** Replace `bestOil`'s 3×3 best-of-9 grid (`brush.glsl.ts:188`) with a real stroke instance buffer (thousands of strokes in a storage buffer), each oriented by the W2 tangent field, reusing the existing `curvedStroke` SDF. Per-stroke length/width/bulge/color variance for congruent van-Gogh density. No subject matter — pure backdrop. [Sharma, Van Gogh 3D shader methodology](https://core.ac.uk/download/pdf/147237812.pdf)

- **AW.W5 — Impasto height→normal relief lighting.** Promote the fixed-vector rim (`brush.glsl.ts:173-178`) to a real impasto pass: accumulate stroke coverage as a height field, derive a normal, light it with a movable directional source → genuine thick-paint depth + specular catch-light. Token-driven light angle/intensity. [LearnOpenGL Normal Mapping](https://learnopengl.com/Advanced-Lighting/Normal-Mapping)

- **AW.W6 — OKLab in-shader blend + derive-color variant.** Move the palette *mixing* step into OKLab (Cartesian) in-shader to kill mid-tone greying (keep CPU OKLCh authoring). Add a `deriveFrom: <baseColor>` mode that generates the whole zone palette from one OKLCh anchor (rotate hue, step L/C) — the "derive-color variant" + "simplified options" ask. [Tailwind #14955](https://github.com/tailwindlabs/tailwindcss/issues/14955); [Bevy #19330](https://github.com/bevyengine/bevy/pull/19330)

- **AW.W7 — Atoms-of-control config + simplified preset surface.** Recompose the ~40-uniform schema into three control atoms — **zones** (nuclei/regions), **noise** (warp/flow/octaves), **color** (OKLCh palette/derive) — with a thin preset layer over them. Honors "procedurally generated from atoms of control" + "simplified options." Pure config/type wave, backend-agnostic; lands on both paths.

- **AW.W8 — Interactive/dynamic seam (compute-driven).** Lift cursor-swirl (`aurora.frag.ts:229`) into the compute flow-field pass so pointer input perturbs the structure tensor itself (strokes reflow around the cursor, not just the color field). WebGPU-only enhancement over the existing WebGL2 cursor warp. [Codrops reaction-diffusion compute, 2024](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/)

**Sequencing note:** W0→W1 are the WebGPU foundation + safety net (ship-anytime, 2026-safe). W2 is the gating substrate for the painterly headline. W3/W4/W5 are the "stunning" payload and all depend on W2's multi-pass tensor field — none are expressible in the single-pass WebGL2 fallback, which is the precise architectural reason WebGPU is worth adopting here rather than extending WebGL2 further. W6/W7 are backend-agnostic and can land independently on both paths.

---

## Source list (all accessed 2026-06-06)

- WebGPU browser support / Baseline: [web.dev, 2025-11-25](https://web.dev/blog/webgpu-supported-major-browsers) · [VideoCardz, 2025](https://videocardz.com/newz/webgpu-is-now-supported-by-all-major-browsers) · [WebGPU.com critical-mass](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/) · [MDN WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- Migration / compute / storage: [Chrome from-WebGL-to-WebGPU](https://developer.chrome.com/docs/web-platform/webgpu/from-webgl-to-webgpu) · [WGSL spec (W3C)](https://www.w3.org/TR/WGSL/) · [webgpufundamentals compute](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html) / [WGSL](https://webgpufundamentals.org/webgpu/lessons/webgpu-wgsl.html)
- Multi-pass / ping-pong: [Codrops reaction-diffusion, 2024-05](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/) · [Phish Chiang ping-pong→compute](https://medium.com/phishchiang/webgpu-from-ping-pong-webgl-to-compute-shader-%EF%B8%8F-1ab3d8a461e2)
- TSL: [Maxime Heckel field guide, 2025-10-14](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/)
- Painterly / Kuwahara / Van Gogh: [Maxime Heckel painterly shaders, 2024](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) · [Kyprianidis & Kang anisotropic Kuwahara (Eurographics)](https://diglib.eg.org/items/4cdcfa3c-afe3-4fd8-acaf-dbccce2ff216) · [Oil Painting via Kuwahara, 2019](https://www.researchgate.net/publication/334689545_Oil_Painting_Style_Rendering_Based_on_Kuwahara_Filter) · [Sharma Van Gogh 3D shader methodology](https://core.ac.uk/download/pdf/147237812.pdf) · [LearnOpenGL Normal Mapping](https://learnopengl.com/Advanced-Lighting/Normal-Mapping)
- OKLCh/OKLab: [Tailwind #14955](https://github.com/tailwindlabs/tailwindcss/issues/14955) · [Bevy PR #19330](https://github.com/bevyengine/bevy/pull/19330) · [Toolbox365 banding/OKLCH](https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/)
- Mesh gradients: [LearnUI deep-dive](https://www.learnui.design/blog/mesh-gradients.html) · [Stripe mesh-gradient writeup](https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2)
- Fallback strategy: [Progosling adoption checklist, 2026-01](https://progosling.com/en/dev-digest/2026-01/webgpu-broad-shipping-adoption-checklist) · [utsubo Three.js→WebGPU migration, 2026](https://www.utsubo.com/blog/webgpu-threejs-migration-guide)

**Local references (file:line):** current WebGL2 aurora — `src/components/custom/aurora/constants/shaders/aurora.frag.ts:54-76` (uniform-array ceilings), `:206-247` (domain warp + cursor swirl), `:330-343` (linear pipeline/OETF/dither); `src/components/custom/aurora/constants/shaders/brush.glsl.ts:72-149` (curved-stroke SDF), `:173-178` (fixed-vector impasto rim), `:188-233` (`bestOil` 3×3 placement). Existing WGSL precedent in-repo: `src/composables/glass/webgpu/glassShader.wgsl`.

---

### Lane 20

I now have a comprehensive, well-cited picture. The WebGPU-by-default-everywhere finding (as of Jan 2026) is the load-bearing fact that makes a WebGPU compute lane viable. Let me write up the brief.

---

# SOTA brief — WebGPU compute-driven painterly aurora

Lane: `webgpu-compute-paint`. Research only — produces wave seeds, no implementation.

## Where the aurora is today (baseline)

The current Aurora is a **single-pass WebGL2 fragment program**. Everything happens per-pixel in one `aurora.frag.ts`: composition (nuclei softmax + domain warp), then a `medium` branch, then post. Strokes are faked per-pixel:

- `src/components/custom/aurora/constants/shaders/brush.glsl.ts:188` — `bestOil()` walks a 3×3 cell neighborhood **for every pixel**, reconstructs the analytic stroke for each candidate cell, and keeps the one with max coverage. This is a per-pixel inversion of a stroke field — correct, but O(pixels × 9 strokes) and capped at a single best stroke per pixel (no genuine over-paint layering).
- `brush.glsl.ts:72` — `curvedStroke()` is an analytic SDF of one quadratic-spine stroke with bristle-ragged edges + impasto rim. Good primitive; trapped in fragment-side reconstruction.
- DESIGN.md invariant 8 (`DESIGN.md:27`) hard-codes "single draw, single shader, zero deps, no multi-pass." That invariant is exactly what this lane proposes to revisit — it was a WebGL2-era constraint.

The WebGPU substrate already exists in the repo (`src/composables/glass/webgpu/glassShader.wgsl`, `useWebGLCanvas.ts`), so glass-ui already has WGSL precedent and a canvas substrate to extend.

## Key finding that unlocks the lane

**WebGPU now ships by default in Chrome, Edge, Firefox, and Safari** — cross-browser-complete as of January 2026; Safari 26 on macOS Tahoe / iOS 26 / iPadOS 26, Firefox 141 (Win) + 145 (Apple Silicon). ~70% global support with the WebGL2 fallback covering the rest. Progressive enhancement (WebGPU primary, WebGL2 fallback) is the production-standard pattern, and Three.js r171+ ships automatic fallback. ([WebGPU.com, Nov 2025](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/); [byteiota, 2026](https://byteiota.com/webgpu-2026-70-browser-support-15x-performance-gains/); [web.dev](https://web.dev/blog/webgpu-supported-major-browsers))

Implication for glass-ui: a compute-driven aurora is viable as the **primary** path with the existing fragment-only aurora as the WebGL2 fallback. The `resolveRenderMode` device-tier resolver (`constants/renderMode.ts`) already exists to gate this.

## Techniques (SOTA, with citations)

### 1. Compute → render with ping-pong storage textures
The canonical real-time WebGPU painterly architecture: a **compute pass** mutates state into a storage texture each frame; a **render pass** (fullscreen triangle) samples it and colors/tonemaps. Two storage textures alternate read/write ("ping-pong"), swapped each iteration. Workgroup size 64 is the WebGPU default; tile 2×2 per thread + a workgroup-shared pixel cache for the 3×3 kernel cuts redundant texture reads. The compute variant measured **substantially faster than the fragment-shader equivalent**. ([Codrops / Robert Leitl, May 1 2024](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/); [robert-leitl/webgpu-reaction-diffusion](https://github.com/robert-leitl/webgpu-reaction-diffusion))

This is the spine of the whole lane: composition/medium becomes a multi-pass accumulation buffer instead of a one-shot fragment.

### 2. Reaction-diffusion as a paint/organic-texture pass
Gray-Scott RD on the ping-pong substrate produces coral/marble/wet-on-wet organic patterns natively. Coloring is a **separate render pass** (palette map + emboss veining + iridescence + vignette). ([Codrops, 2024](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/); [ShaderVine ships RD as 1 of 16 built-in compute sims, ping-pong storage textures](https://meditations.metavert.io/p/shadervine-a-webgpu-shader-editor)). RD gives the "wet medium" poles (watercolor granulation, oil bleed) real physical substrate instead of fBm fakery.

### 3. Explicit stroke instancing (the van-Gogh fold)
The SOTA replacement for `bestOil`'s per-pixel reconstruction: place strokes as **explicit primitives** — a compute pass writes a stroke buffer (position, direction, length, width, color, depth), a render pass draws them as **instanced camera-facing quads with additive/over blending**, contribution computed per-pixel in the fragment shader.

- This is precisely the **2D Gaussian-splatting render model** repurposed as a brush: each splat = one quad, Gaussian falloff in the fragment, painter's-algorithm "over" compositing back-to-front. ([WebGPU Gaussian splatting, BrightCoding Jun 2026](https://www.blog.brightcoding.dev/2026/06/05/stop-waiting-for-cuda-run-gaussian-splatting-in-your-browser-with-webgpu); [emergentmind overview](https://www.emergentmind.com/topics/webgpu-powered-gaussian-splatting))
- **Ciallo (SIGGRAPH 2024)** is the dedicated brush-stroke art: GPU rendering of vanilla / stamp / airbrush strokes, raster textures integrated with real-time editing, open-source. The stamp-brush model (a stroke = a sequence of stamped textured dabs along a polyline) maps directly onto a compute-placed stroke buffer. ([Ciallo, ACM SIGGRAPH 2024](https://dl.acm.org/doi/10.1145/3641519.3657418); [ShenCiao/brush-rendering-tutorial](https://github.com/ShenCiao/brush-rendering-tutorial))
- **Van Gogh authenticity:** strokes must share *related directionality*, align to **principal curvature / cross-contouring** (brushwork follows form), and use **impasto** thick-paint depth. The SOTA method extracts a **directional flow field** and aligns stroke primitives to it, with **luminance-structure decoupling** (geometry/orientation optimized separately from color) to avoid muddiness during aggressive abstraction. ([Thinking Like Van Gogh, arXiv 2601.10075, Jan 2026](https://arxiv.org/abs/2601.10075); [Van Gogh 3D shader thesis, Sharma](https://core.ac.uk/download/pdf/147237812.pdf)). For a *subject-free* backdrop, the flow field is procedural (the existing `flowField`), not image-derived — but the stroke-aligns-to-flow + per-stroke color/value jitter + depth-ordered over-paint is the authentic recipe.

### 4. Anisotropic Kuwahara as a painterly *post* pass
The most-cited oil-abstraction filter: compute a **structure tensor** via Sobel (pass 1), smooth it, then run an **anisotropic Kuwahara** whose circular 8-sector kernel is squeezed+rotated to the tensor's principal eigenvector (pass 2), then tonemap (pass 3). Produces directional oil-paint flattening that preserves edges. Polynomial sector weighting (η=0.1, λ=0.5) replaces the expensive Gaussian. Real-time on GPU; shipped in Blender's realtime compositor. ([Maxime Heckel, Oct 29 2024](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/); [Kyprianidis et al. 2009, "Image and Video Abstraction by Anisotropic Kuwahara Filtering"](https://www.kyprianidis.com/p/pg2009/); [Blender realtime AKF PR #110786](https://projects.blender.org/blender/blender/pulls/110786)). This is a multi-pass compute filter — impossible under the current single-pass invariant, natural under the proposed architecture. It can run *on top of* the composition buffer to add genuine oil-pastel grain that doesn't depend on noise tricks.

### 5. Line Integral Convolution for the smeared-pastel pole
LIC smears a noise texture **along the flow field's streamlines** — exactly the directional smear of pastel/oil. Multi-frequency noise gives multi-scale stroke feel; pink noise gives cloudy smearing. GPU LIC is real-time. ([LIC, Wikipedia](https://en.wikipedia.org/wiki/Line_integral_convolution); [Multi-frequency noise for LIC, IEEE](https://ieeexplore.ieee.org/document/567784/); [philogb LIC](https://philogb.github.io/blog/2012/08/14/playing-with-line-integral-convolutions/)). A LIC pass over the composition buffer is a cheaper, more coherent "pastel medium" than the current per-pixel anisotropic-fBm tooth, and shares the same flow field as the stroke pass.

### 6. Physically-grounded pigment mixing (Kubelka-Munk)
For genuinely painterly color where strokes overlap, blend in **pigment space (Kubelka-Munk: absorption K + scattering S)** not RGB — blue+yellow→green, vibrant not muddy. Mixbox (KM-based, ships in Rebelle) and spectral.js are the references; small GLSL/WGSL ports exist. ([Mixbox](https://github.com/scrtwpns/mixbox); [spectral.js](https://github.com/rvanwijnen/spectral.js/); [davis-pigment-mixing GLSL](https://github.com/STVND/davis-pigment-mixing)). This complements glass-ui's existing **OKLCh** palette: OKLCh for authoring/perceptual stops, KM for the *over-paint blend* where strokes physically overlap.

### 7. Mesh-gradient SOTA baseline (the floor to beat)
Stripe/OpenAI-class mesh gradients = fBm (octaves of simplex, lacunarity/persistence) + sinusoidal UV self-warp + **OKLab/LCH interpolation** for vibrancy, ~10KB. ([design-bootcamp/Medium](https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2); [shadergradient.co](https://shadergradient.co/)). The aurora already matches this with OKLCh + Quilez double-fBm warp. The *differentiator* the user wants is everything above #3–#6 — real strokes, real paint physics, multi-pass — which mesh gradients categorically lack.

---

## ADOPT for glass-ui aurora — wave seeds (AW tranche)

Each is a concrete, independently-shippable fold. Ordered roughly by dependency.

- **AW.W0 — WebGPU substrate + capability gate + WebGL2 fallback.** Extend `useWebGLCanvas` / `resolveRenderMode` to negotiate a `GPUDevice`; the existing fragment-only aurora becomes the declared WebGL2 fallback (zero-regression). Gate: `proof:aurora-fallback` renders both paths to within tolerance. Load-bearing fact: WebGPU is default-on in all major browsers as of Jan 2026, so WebGPU-primary is now legitimate. Revisits DESIGN.md invariant 8 (single-draw) explicitly with rationale.

- **AW.W1 — Compute composition buffer (ping-pong).** Move nuclei-softmax + domain-warp out of the fragment into a compute pass writing an OKLCh/linear-RGB storage texture; render pass samples + tonemaps. Workgroup 64, 2×2 tiles, shared-mem 3×3 cache per Codrops. This is the architectural spine every later wave attaches to.

- **AW.W2 — Reaction-diffusion medium pass.** Gray-Scott RD on the ping-pong substrate as a new `medium` ("flow"/"marble"/"wet") driving granulation + organic boundaries with real physics, replacing fBm-faked wet edges. Coloring stays in the render pass.

- **AW.W3 — Explicit stroke buffer + instanced-quad splatting (the van-Gogh headline).** Compute pass places strokes (a stroke = position + flow-aligned direction + length/width + per-stroke OKLCh color + depth), render pass draws them as instanced quads with depth-ordered "over" blend and Gaussian/Ciallo-stamp falloff. Replaces `bestOil`'s per-pixel reconstruction with genuine layered over-paint. Strokes align to the existing `flowField`; per-stroke value/hue jitter = the existing `brokenColor`. Authentic cross-contouring + impasto depth per the van-Gogh-flow paper.

- **AW.W4 — Anisotropic Kuwahara post-filter (oil-pastel fidelity).** Three-pass structure-tensor → AKF → tonemap on the composition buffer (polynomial weighting η=0.1/λ=0.5). Genuine directional oil abstraction instead of per-pixel tooth noise; this is the single biggest "genuinely painterly" lever for the smooth↔oil-pastel poles.

- **AW.W5 — LIC pastel-smear medium.** Multi-frequency-noise LIC along the shared flow field as the "pastel" medium — coherent directional smear that reuses W3's flow field, cheaper and more congruent than the current anisotropic-fBm pastel.

- **AW.W6 — Kubelka-Munk over-paint blend.** Where strokes/zones physically overlap, blend in KM pigment space (port mixbox/spectral.js to WGSL) so overlaps go vibrant not muddy. OKLCh stays the authoring space; KM is only the overlap operator. Directly serves "ultra-high-fidelity brushwork + gradient work."

- **AW.W7 — Derive-color variant + simplified atoms.** A `deriveFrom(seedColor)` that generates the full nuclei palette procedurally in OKLCh (analogous/triadic/split-complementary harmonies from one input), collapsing the config surface to a few atoms (zones, noise, color-seed) per the user's "simplified options / derive-color variant" ask. Pure-TS, no shader dependency — can land early/in parallel.

- **AW.W8 — Interactive flow advection.** Cursor doesn't just rotate the field (current behavior) — it injects velocity into the compute flow field that **advects** strokes/RD over several frames (momentum, wake, settle), giving the "dynamic/interactive" arresting quality. Builds on W1–W3's persistent compute state, which the current stateless fragment cannot express.

### Caveats to carry into planning
- Rolldown/Vite caveat from CLAUDE.md still applies to the bundle; the WGSL assets add a chunk — size it against the published subpath budget (`/aurora` is a standalone ~16KiB-gzip WebGL chunk today; WGSL + compute pipeline will grow it).
- DESIGN.md invariants 8 ("single draw / no multi-pass / zero deps") and the v4.1 non-goals are written for the WebGL2 era — **W0 must formally supersede them** in DESIGN.md rather than silently violate them (per the no-shadow-execution / tranche-format house rules).
- WebGPU storage-texture formats + `timestamp-query` profiling differ from WebGL2; budget gate (`profile:budget`) and the offscreen-pause / PRM-freeze substrate contracts (`proof:offscreen-pause`) must extend to the compute path — a parked rAF must also skip compute dispatch.

### Primary sources
- [WebGPU hits critical mass — all major browsers (WebGPU.com, Nov 2025)](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/) · [WebGPU 2026 support/perf (byteiota)](https://byteiota.com/webgpu-2026-70-browser-support-15x-performance-gains/) · [web.dev WebGPU](https://web.dev/blog/webgpu-supported-major-browsers)
- [Reaction-Diffusion Compute Shader in WebGPU — Codrops, May 1 2024](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/) · [robert-leitl/webgpu-reaction-diffusion](https://github.com/robert-leitl/webgpu-reaction-diffusion) · [ShaderVine](https://meditations.metavert.io/p/shadervine-a-webgpu-shader-editor)
- [Ciallo: GPU-Accelerated Rendering of Vector Brush Strokes — SIGGRAPH 2024](https://dl.acm.org/doi/10.1145/3641519.3657418) · [brush-rendering-tutorial](https://github.com/ShenCiao/brush-rendering-tutorial)
- [Thinking Like Van Gogh: Structure-Aware Style Transfer via Flow-Guided 3D Gaussian Splatting — arXiv 2601.10075, Jan 2026](https://arxiv.org/abs/2601.10075) · [Van Gogh 3D shader thesis (Sharma)](https://core.ac.uk/download/pdf/147237812.pdf)
- [WebGPU Gaussian splatting in the browser — BrightCoding, Jun 2026](https://www.blog.brightcoding.dev/2026/06/05/stop-waiting-for-cuda-run-gaussian-splatting-in-your-browser-with-webgpu) · [emergentmind WebGPU Gaussian splatting](https://www.emergentmind.com/topics/webgpu-powered-gaussian-splatting)
- [On Crafting Painterly Shaders — Maxime Heckel, Oct 29 2024](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) · [Image and Video Abstraction by Anisotropic Kuwahara Filtering — Kyprianidis et al. 2009](https://www.kyprianidis.com/p/pg2009/) · [Blender realtime AKF PR](https://projects.blender.org/blender/blender/pulls/110786)
- [Line Integral Convolution — Wikipedia](https://en.wikipedia.org/wiki/Line_integral_convolution) · [Multi-frequency noise for LIC — IEEE](https://ieeexplore.ieee.org/document/567784/)
- [Mixbox: Pigment-Based Color Mixing](https://github.com/scrtwpns/mixbox) · [spectral.js (Kubelka-Munk)](https://github.com/rvanwijnen/spectral.js/) · [davis-pigment-mixing GLSL](https://github.com/STVND/davis-pigment-mixing)
- [Stripe/OpenAI mesh-gradient teardown — design-bootcamp](https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2) · [shadergradient.co](https://shadergradient.co/)

Relevant repo files: `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/DESIGN.md` (invariant 8 + v4.1 non-goals to supersede), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/brush.glsl.ts:72,188` (the `curvedStroke` SDF + `bestOil` per-pixel reconstruction that W3 replaces), `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgpu/glassShader.wgsl` (existing WGSL precedent), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/renderMode.ts` (the device-tier resolver W0 extends).

---

### Lane 21

I have comprehensive material across every lane axis, grounded in the actual aurora codebase. Here is the brief.

---

# SOTA brief — Aurora shader-perf-mobile (lane: shader-perf-mobile)

Research for AW tranche seeding. Web-sourced, every claim cited. Grounded against the live aurora code so each wave-seed is concrete.

## Where aurora is today (codebase baseline)

- **Per-pixel cost is high and unbounded by content.** `aurora.frag.ts:164-174` runs `fbm()` at up to 5 octaves (`uNoiseOctaves`), and `domainWarp()` (`:206-247`) calls `fbm` **four times** per pixel (Quilez double-warp: `q.x q.y` then `r.x r.y`), plus `cellular()` (a 3×3 = 9-cell Worley loop, `:190-203`) in warp modes 1/2. So worst case is ~4×5 fbm-octave evaluations + a 9-tap Worley, every pixel, every frame. The mediums (`mediums.glsl.ts`) and brush SDF (`brush.glsl.ts`) stack more noise on top.
- **DPR is already clamped to 2** via `AV_DPR_MAX` (`budget.ts:22`, consumed at `runtime.ts:170`). This is the single resize lever today; there is **no resolution-scale / half-res path** below native-at-2×.
- **Palette is already baked CPU-side to linear-sRGB** (`color.ts`, header comment `aurora.frag.ts:15`) — aurora does NOT do per-pixel OKLCh→RGB. Good; matches SOTA.
- **Offscreen-park + reduced-motion-freeze already shipped** (`useWebGLCanvas.ts` AV.W7). The remaining perf headroom is in *fill rate and per-pixel ALU*, not scheduling.
- **No temporal/FBO machinery.** The substrate renders one full-res pass straight to the default framebuffer (`runtime.ts:176-179`); there is no render-to-texture, no history buffer.

The gap is clear: aurora is fill- and ALU-bound on mobile, with only a DPR clamp protecting it. The SOTA levers below all attack that.

---

## Findings by technique

### 1. DPR clamping is necessary but coarse — resolution scaling is the finer lever
At DPR 3 (iPhone X/11) you draw **9× the pixels** of DPR 1; "blindly using devicePixelRatio can really slow down your performance" ([WebGL Fundamentals, *Resizing the Canvas*](https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html), accessed 2026-06-06; [Khronos *HandlingHighDPI*](https://www.khronos.org/webgl/wiki/HandlingHighDPI)). DPR is also **not constant** (changes on browser zoom) and **not integer** (1.41×, 1.33× on some devices), so a clamp-and-cache-once read is fragile. Aurora's `AV_DPR_MAX=2` is the right first cut, but a *drift background* gains nothing from native 2× — a sub-1.0 render scale on top of the clamp is invisible on a soft gradient and is the biggest cheap win. The cost is quadratic in scale, so 0.75× render scale = **0.56× the fill** for no perceptible loss on smooth fields.

### 2. FBM octaves and the 4× domain-warp multiply are the ALU hot spot
Each octave adds detail but "each octave adds computational expense"; noise is "iterative and relatively expensive with hundreds of arithmetic operations per pixel… can easily overload ALUs of lower-to-mid-tier GPUs" ([foundryvtt issue #12961](https://github.com/foundryvtt/foundryvtt/issues/12961), accessed 2026-06-06; [Book of Shaders ch.13](https://thebookofshaders.com/13/)). Domain warping is `f(p + h(p))` and the canonical Quilez double-warp evaluates the base noise multiple times ([IQ *Domain Warping*](https://iquilezles.org/articles/warp/), accessed 2026-06-06) — exactly aurora's 4 fbm calls. **Two cheap wins** the SOTA names:
- **Amplitude via `exp2(-H)` not `pow()`** — geometric gain `G = exp2(-H)`, `a *= G` per octave; "most implementations hardcode G=0.5" ([IQ *fBM*](https://iquilezles.org/articles/fbm/), accessed 2026-06-06). Aurora already does `a *= 0.5` (`:171`), so it's fine — but the warp *frequency* loop is fixed; an `H`/gain uniform is one free authoring axis.
- **Derivative-based fbm** — accumulate the analytic noise derivative `d` and divide each octave by `(1.0 + dot(d,d))`. This concentrates detail where it matters and yields "comparable visual richness with **fewer octaves**," and analytic derivatives are "5× faster than the central-difference method" ([IQ *Noise derivatives / morenoise*](https://iquilezles.org/articles/morenoise/), accessed 2026-06-06). This is the single best "same look, fewer octaves" lever for the warp.

### 3. Texture-baking noise: trade ALU for bandwidth
"A common optimization is to use precomputed noise textures indexed instead of recomputed per pixel… for complicated noise a texture lookup should almost always be faster" ([foundryvtt #12961](https://github.com/foundryvtt/foundryvtt/issues/12961); [three.js forum](https://discourse.threejs.org/t/baking-fractional-brownian-motion-into-a-texture/27341), accessed 2026-06-06). Barth Paleologue reports texture-baking a density LUT was "the difference between 20fps and 500fps" combined with algorithmic cleanup, and that exploiting symmetry can drop a 2D problem to a 1D texture ([*Making Shaders Faster #1*](https://barthpaleologue.github.io/Blog/posts/making-shaders-faster-1/), accessed 2026-06-06). Caveat for mobile: this trades ALU for **memory bandwidth**, which is also scarce on mobile — bake the *base* value-noise tile (the `vnoise`/`hash21` foundation), keep the warp/fbm sum in-shader.

### 4. Half-res + bilateral/bilinear upsample — the headline fill-rate trick
Run the expensive fragment work into a **half-resolution FBO**, then draw a full-screen quad sampling that texture, letting bilinear stretch reconstruct ([*Rendering to Texture with Framebuffers*, ostefani.dev](https://ostefani.dev/tech-notes/rendering-to-texture-with-framebuffers); [LearnOpenGL *Framebuffers*](https://learnopengl.com/Advanced-OpenGL/Framebuffers), accessed 2026-06-06). "Rendering at half resolution for complex computations then upscaling can reduce GPU load while maintaining visual quality." For a *soft gradient with no hard edges*, plain bilinear upsample is near-lossless — aurora has no silhouettes that would need the edge-aware *bilateral* variant, so the cheap bilinear path is enough. This is a 4× fill reduction on the heavy pass and stacks multiplicatively with the DPR clamp and render scale.

### 5. Temporal upsampling / checkerboard — high ceiling, high integration cost
Checkerboard rendering shades half the pixels per frame and reconstructs the rest from history; "expensive fragment operations run at half-resolution then combine with the previous frame in a resolve shader… appears extremely close to native" ([Grokipedia *Checkerboard rendering*](https://grokipedia.com/page/Checkerboard_rendering); [daydreamsoft *Temporal Upscaling Beyond DLSS/FSR*](https://www.daydreamsoft.com/blog/temporal-upscaling-techniques-beyond-dlss-and-fsr-the-next-era-of-real-time-graphics-performance), accessed 2026-06-06). But it "requires deep integration… careful tuning, often combined with TAA to stabilize," and the backbone is **motion vectors** ([same sources]). Verdict for aurora: **mostly overkill** — aurora's motion is slow procedural drift with no camera/geometry velocity, so full reprojection is unwarranted. The cheap sibling that *does* apply: **temporal jitter + EMA blend** (accumulate `mix(history, current, 0.1)` over the half-res pass) to stabilize the upsample and let you drop another octave, since slow drift makes successive frames near-identical. Needs a ping-pong history FBO (aurora has none today).

### 6. WebGPU compute — real but not the near-term lever for a gradient
WebGPU brings "5-6× on modest systems, up to 100× on high-end" and removes the fragment-GPGPU indirection with real compute pipelines ([mashblog *WebGPU vs WebGL 2025*](https://mashblog.com/posts/webgpu-vs-webgl); [gjgalante medium](https://gjgalante.medium.com/webgl-vs-webgpu-the-performance-gap-fbd121fb221a), accessed 2026-06-06). But those gains are for **compute-bound GPGPU** (inference, particles), not a full-screen procedural fragment shader, which is fill/ALU-bound the same way under both APIs. WebGPU's real aurora value is *future-proofing + a compute prepass* (compute the warp/flow field into a storage texture once, sample it in the fragment pass) — adjacent to texture-baking (#3) but on-GPU. Treat as an opt-in renderer behind the existing `useWebGLCanvas` seam, not a rewrite.

### 7. OKLCh interpolation: keep it CPU-side (aurora already does)
Per-pixel OKLab is "10-20× slower than sRGB" interpolation, but **precomputing the gradient keys in OKLab at init drops that to 1.3-1.5×** — "all calculations up until the lerp do not depend on evaluation time" ([Aras Pranckevičius, *Optimizing Oklab gradients*](https://aras-p.info/blog/2022/03/11/Optimizing-Oklab-gradients/), accessed 2026-06-06). Aurora's CPU-baked linear palette (`color.ts`) is exactly this pattern and is correct. The SOTA refinement: bake the *full perceptual ramp* into a small **1D LUT texture** (e.g. 256×1) sampled by `paletteId`, so the shader's `samplePalette` is one `texture()` tap instead of a loop — and the ramp itself is interpolated in OKLCh on the CPU for banding-free midtones ([Aras; bevy PR #19330 OKLCh UI gradients](https://github.com/bevyengine/bevy/pull/19330), accessed 2026-06-06). Banding is then closed by the dither aurora already ships (IGN, `aurora.frag.ts:343`) ([frost.kiwi *How to fix color banding*](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/), accessed 2026-06-06).

### 8. Painterly / van-gogh brushwork — structure-tensor flow is the atomic technique
The SOTA painterly pipeline is **anisotropic Kuwahara driven by a structure tensor**: Sobel → structure tensor `Jxx=Sx², Jyy=Sy², Jxy=Sx·Sy` → eigen-decomposition → a *local orientation field* that elongates/rotates the kernel along image flow, "producing regions of color that follow edges, creating a more pronounced brush-stroke effect" ([Maxime Heckel *On Crafting Painterly Shaders*](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/); [Sharma thesis *Van Gogh-inspired 3D shader*](https://core.ac.uk/download/pdf/147237812.pdf), accessed 2026-06-06). Impasto thickness comes from bump-mapping the orientation field's gradient magnitude ([ResearchGate *Oil Painting Style Rendering via Kuwahara*](https://www.researchgate.net/publication/334689545)). Perf notes from Heckel: polynomial sector weighting beats Gaussian, kernel cost is **quadratic** (`kernelSize 4-12`), it's a multi-pass full-screen filter, near-60fps on WebGL. For aurora the key insight: aurora *already has* a flow field (`flow.glsl.ts`, `uFlowPattern`) — that IS the stroke-orientation field a van-gogh medium needs, so brushstrokes can ride the existing flow vectors instead of a separate Sobel pass. This is the bridge between the perf lane and the "stunning brushwork" goal: a real orientation-field-driven stroke, not a noise-multiply (aurora's current oil medium is closer to the latter).

---

## ADOPT for glass-ui aurora / wave-seeds (AW)

Each is a concrete wave/fold. Ordered cheapest-highest-ROI first.

- **AW.W? — `renderScale` axis under the DPR clamp.** Add `AV_RENDER_SCALE` to `budget.ts` and multiply into `w/h` in `runtime.ts:174-175` (and the goo-blob twin). Default ~0.85 on coarse-pointer/low-DPR-budget, 1.0 on desktop. Quadratic fill win, zero visual cost on a soft field. Pure CPU-side, no shader edit. *(Finding 1.)*

- **AW.W? — derivative-fbm warp to cut an octave.** Swap `fbm()` (`aurora.frag.ts:164`) for the analytic-derivative form that divides each octave by `(1+dot(d,d))`; this holds apparent detail at 3-4 octaves where it now needs 5, and the warp's 4 fbm calls each get cheaper. Add an `H`/gain uniform while there. *(Findings 2, IQ morenoise.)*

- **AW.W? — half-res FBO pass + bilinear upsample.** Extend `useWebGLCanvas` with an optional offscreen color FBO at `scale·resolution`; aurora renders the heavy field there, a trivial blit shader upsamples to the default framebuffer. 4× fill cut on the expensive pass, multiplies with the DPR clamp + renderScale. The substrate is the right home (the goo-blob inherits it). *(Finding 4.)*

- **AW.W? — palette LUT texture (1D 256×1) replacing the in-shader palette loop.** CPU-bake the OKLCh-interpolated ramp into a texture (extend `color.ts`); `samplePalette` becomes one `texture()` tap. Banding stays closed by the existing IGN dither. Keeps OKLCh perceptual quality at sRGB-tap cost. *(Finding 7, Aras.)*

- **AW.W? — baked base-noise tile (opt-in, mobile profile).** Bake the `vnoise`/`hash21` foundation (`aurora.frag.ts:136-157`) into a tiling R8/RG8 texture; the fbm loop samples it instead of recomputing the hash. Gate behind a `lowPower` profile since it trades ALU for bandwidth — measure before defaulting. *(Finding 3.)*

- **AW.W? — temporal EMA stabilizer (ping-pong history FBO).** Add a history buffer to the half-res pass and blend `mix(history, current, ~0.1)`; slow drift makes frames near-identical so this is near-free and lets you drop another warp octave without flicker. Cheap cousin of checkerboard — no motion vectors needed. Sequence *after* the FBO wave (depends on it). *(Finding 5.)*

- **AW.W? — van-gogh medium riding the existing flow field (the "stunning brushwork" headline).** Add a peer medium (alongside oil/pastel/crayon in `mediums.glsl.ts`) that lays oriented brushstrokes along `flow.glsl.ts`'s existing flow vectors — the flow field IS the structure-tensor orientation field, so no Sobel prepass. Stroke = curved swept SDF (aurora already has `brush.glsl.ts`) modulated by stroke-local color jitter (`uBrokenColor`) for variation + impasto highlight from the flow-gradient magnitude. Atomic, congruent-to-real-van-gogh directionality, no subject matter. This is where the perf lane and the art goal meet: the flow field already paid for is the brush director. *(Finding 8.)*

- **AW.W? — WebGPU compute-prepass renderer (future-proofing, opt-in).** Behind the `useWebGLCanvas` seam, add a WGSL renderer that computes the warp/flow field into a storage texture in a compute pass, sampled by a thin fragment pass. Not a rewrite, not the near-term win — stage last, as the modern-WebGPU axis the user wants. *(Finding 6.)*

### Sequencing note
W-order dependency: `renderScale` and `derivative-fbm` are independent and land first (pure wins, no new machinery). The **half-res FBO** wave is the keystone — the **temporal EMA** and any compute-prepass depend on the FBO/ping-pong infra it introduces. The **palette LUT** and **van-gogh medium** are independent of the FBO work and can run in parallel. Measure each on a real mid-tier mobile GPU (the sources stress mobile bandwidth/ALU asymmetry — a desktop profile will mislead).

### Source list
- WebGL Fundamentals — Resizing the Canvas: https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html (2026-06-06)
- Khronos HandlingHighDPI: https://www.khronos.org/webgl/wiki/HandlingHighDPI (2026-06-06)
- foundryvtt #12961 (noise texture baking): https://github.com/foundryvtt/foundryvtt/issues/12961 (2026-06-06)
- Book of Shaders ch.13 (FBM): https://thebookofshaders.com/13/ (2026-06-06)
- IQ — Domain Warping: https://iquilezles.org/articles/warp/ (2026-06-06)
- IQ — fBM (exp2 amplitude): https://iquilezles.org/articles/fbm/ (2026-06-06)
- IQ — Noise derivatives (morenoise): https://iquilezles.org/articles/morenoise/ (2026-06-06)
- Barth Paleologue — Making Shaders Faster #1: https://barthpaleologue.github.io/Blog/posts/making-shaders-faster-1/ (2026-06-06)
- three.js forum — Baking FBM into a texture: https://discourse.threejs.org/t/baking-fractional-brownian-motion-into-a-texture/27341 (2026-06-06)
- ostefani.dev — Rendering to Texture with Framebuffers: https://ostefani.dev/tech-notes/rendering-to-texture-with-framebuffers (2026-06-06)
- LearnOpenGL — Framebuffers: https://learnopengl.com/Advanced-OpenGL/Framebuffers (2026-06-06)
- Grokipedia — Checkerboard rendering: https://grokipedia.com/page/Checkerboard_rendering (2026-06-06)
- daydreamsoft — Temporal Upscaling Beyond DLSS/FSR: https://www.daydreamsoft.com/blog/temporal-upscaling-techniques-beyond-dlss-and-fsr-the-next-era-of-real-time-graphics-performance (2026-06-06)
- mashblog — WebGPU vs WebGL 2025: https://mashblog.com/posts/webgpu-vs-webgl (2026-06-06)
- gjgalante (Medium) — WebGL vs WebGPU performance gap: https://gjgalante.medium.com/webgl-vs-webgpu-the-performance-gap-fbd121fb221a (2026-06-06)
- Aras Pranckevičius — Optimizing Oklab gradients: https://aras-p.info/blog/2022/03/11/Optimizing-Oklab-gradients/ (2026-06-06)
- bevy PR #19330 — OKLab/OKLCh UI gradients: https://github.com/bevyengine/bevy/pull/19330 (2026-06-06)
- frost.kiwi — How to fix color banding: https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/ (2026-06-06)
- Maxime Heckel — On Crafting Painterly Shaders: https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/ (2026-06-06)
- Sharma — Van Gogh-inspired 3D shader methodology (thesis): https://core.ac.uk/download/pdf/147237812.pdf (2026-06-06)
- ResearchGate — Oil Painting Style Rendering via Kuwahara: https://www.researchgate.net/publication/334689545 (2026-06-06)

Relevant codebase anchors: `src/components/custom/aurora/constants/shaders/aurora.frag.ts:136-247` (noise/warp hot path), `:300-347` (main + OETF + dither), `src/components/custom/aurora/composables/runtime.ts:168-180` (resize/DPR), `src/components/custom/aurora/constants/budget.ts:22-61` (`AV_DPR_MAX`, `resolveBudgetDpr`), `src/components/custom/aurora/composables/color.ts` (CPU OKLCh palette bake), `src/components/custom/aurora/constants/shaders/flow.glsl.ts` + `brush.glsl.ts` + `mediums.glsl.ts` (existing flow field + stroke SDF the van-gogh medium reuses), `src/composables/glass/webgl/useWebGLCanvas.ts` (shared substrate — home for the half-res FBO + future WebGPU renderer).

---

### Lane 22

I now have a complete, well-cited research corpus. The structure-tensor / edge-tangent-flow (ETF) orientation field is the canonical missing piece for the van-gogh variant. I have enough to synthesize the brief. Let me compile the final deliverable.

# Aurora SOTA Research Brief — Lane: temporal-coherence

For tranche AW (aurora). Research + wave-seeds only, no implementation. Goal: stunning arresting gradient-art backdrops, genuinely painterly oil-pastel + an atomic-brushstroke van-gogh variant, all temporally coherent (no shimmer / "shower-door"), OKLCh-native, WebGPU-ready.

## 1. The problem, named

The shimmer the user wants gone has a literature name. In NPR animation it's the **"shower-door problem"**: if brush marks are anchored to the 2D screen plane, the moving content slides *behind* a static field of marks — like looking through textured glass. If marks instead stick to the animating content, the content looks correctly painted. Current aurora's `bestOil` brush ([`brush.glsl.ts:188`](src/components/custom/aurora/constants/shaders/brush.glsl.ts#L188)) places strokes on a **screen-space cell grid** (`floor(p / cellSize)`) with only per-cell hash jitter and a flow-direction input. The stroke *centers are pinned to screen-space cells* while the color field warps and drifts underneath them — this is structurally the shower-door failure mode: strokes that don't advect with the field they're painting. ([SOTA STAR, Bénard/Bousseau/Thollot 2011](https://inria.hal.science/inria-00636210); [GaTech NPR-coherence framework](https://faculty.cc.gatech.edu/~turk/my_papers/npr_coherence_ar.pdf), accessed 2026-06-06)

The foundational survey frames every solution as a trade-off between **three mutually-conflicting goals**:
1. **Flatness** — marks keep a consistent hand-made 2D texture/size (the "painted, not photographed" look).
2. **Motion coherence** — marks move *with* the underlying content (no shower-door slide).
3. **Temporal continuity** — marks fade/are born smoothly, no popping/flicker frame-to-frame.

You cannot maximize all three; you pick a budget. ([State-of-the-Art Report on Temporal Coherence for Stylized Animations, Bénard, Bousseau, Thollot, *Computer Graphics Forum* 30(8):2367-2386, 2011](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-8659.2011.02075.x); PDF Anubis-blocked, abstract via [Semantic Scholar](https://www.semanticscholar.org/paper/8437952b7e15b0ca8387b6be36e2002c08ae92c1) / [ResearchGate 220507275](https://www.researchgate.net/publication/220507275), accessed 2026-06-06)

## 2. Techniques (with what each solves)

**A. Divergence-free flow fields (bitangent / curl noise) — the coherence backbone.**
A curl/bitangent-noise vector field has zero divergence (no sources or sinks), so advected marks flow smoothly and never pile up or vanish at a point — the field reads like fluid, and motion stays continuous over time. Bitangent noise needs only **two** scalar-noise gradients (cross product) vs three for classic curl noise; with PCG corner-gradients the cost is ~30% over plain simplex (~1534µs 3D / ~2413µs 4D on a GTX 1060). This is the right substrate to *advect strokes along* instead of pinning them to a grid. ([atyuwen, "Fast Divergence-Free Noise Generation in Shaders"](https://atyuwen.github.io/posts/bitangent-noise/), accessed 2026-06-06; curl noise origin: Bridson 2007, via [UnityGraphicsProgramming Ch.6](https://freder.github.io/UnityGraphicsProgrammingBook1/html-translated/vol2/Chapter%206%20_%20Curl%20Noise-Explanation%20of%20Noise%20Algorithms%20for%20Pseudo-Fluids.html))

**B. 4D noise time-slicing — kills the "swimming"/loop without a flow sim.**
Animate 2D noise by sampling a **4D** field where the 4th axis is time (or trace a closed loop in a higher dim for a seamless cycle). This gives continuous, non-repeating evolution with no axis-aligned swimming artifacts — simplex is the right kernel (N+1 samples, no directional artifacts). The aurora's current warp scrolls 2D noise by `t * uWarpDrift` ([`aurora.frag.ts:208`](src/components/custom/aurora/constants/shaders/aurora.frag.ts#L208)), which translates the field (visible pan) rather than evolving it in place — a 4D/loop reform removes the pan. ([Three.js Roadmap, "10 Noise Functions for TSL"](https://threejsroadmap.com/blog/10-noise-functions-for-threejs-tsl-shaders); [The Book of Shaders Ch.11–13](https://thebookofshaders.com/11/), accessed 2026-06-06)

**C. Iterated domain warping (fbm-of-fbm) — the organic gradient body.**
`q=fbm(p); r=fbm(p+4q); color=fbm(p+4r)` compounds self-similar displacement into organic, marble/aurora-like flow; the intermediate `q`,`r` can *also* drive color, so geometry and palette co-vary. Aurora already runs the canonical Quilez double-warp ([`aurora.frag.ts:206–247`](src/components/custom/aurora/constants/shaders/aurora.frag.ts#L206)) — the SOTA move is to *advect the warp seed along a curl field* (technique A) and feed `q`/`r` into the color LUT for richer banding. ([Inigo Quilez, "Domain Warping"](https://iquilezles.org/articles/warp/); [fbm](https://iquilezles.org/articles/fbm/), accessed 2026-06-06)

**D. Edge-Tangent-Flow (ETF) / structure-tensor orientation field — THE van-gogh primitive.**
Van Gogh's "atomic brushstrokes" follow a **coherent orientation field**: strokes align to local feature directions and curve along them (the Starry Night swirl). The canonical way to derive that field is the **smoothed structure tensor** → edge-tangent-flow, then run an **anisotropic Kuwahara** filter whose elliptical kernel stretches along the tangent. This produces directional, painterly abstraction that *preserves and follows* structure — exactly the "proper atomic brushstrokes congruent to real van gogh, with depth and variation" the user wants, and it's derived procedurally from the gradient field (no subject matter needed). For aurora: compute the structure tensor of the warped color field, smooth it into an orientation field, and orient/curve each stroke spine to it instead of using `flow + hash jitter`. ([Kyprianidis & Döllner, "Image and Video Abstraction by Anisotropic Kuwahara Filtering," *CGF* 2009](https://www.kyprianidis.com/p/pg2009/); [EG2011 NPR course, Part III: Anisotropy & Filtering](http://kahlan.eps.surrey.ac.uk/EG2011/eg2011-npr3.pdf); [Oil Painting Style Rendering Based on Kuwahara Filter](https://scispace.com/pdf/oil-painting-style-rendering-based-on-kuwahara-filter-rdf4wd0ne2.pdf), accessed 2026-06-06)

**E. Stroke/texture advection with regeneration — the coherent-stroke transport.**
Video-painting SOTA translates/rotates/deforms strokes by forces from a temporally+spatially smoothed per-pixel optical-flow field, advecting stroke textures forward and back to minimize distortion, and **regenerating** strokes where the field stretches them too far (density maintenance). For a *procedural* field we already own the flow analytically (technique A/C), so we advect stroke **seeds** along it and re-seed on a Poisson/blue-noise density target — giving motion coherence + temporal continuity without an optical-flow estimate. ([Bénard et al. "Stylizing Animation By Example" lineage; Meier, "Painterly Rendering for Animation," SIGGRAPH 1996](https://www.academia.edu/153902/Painterly_rendering_for_animation); ["Deformable strokes towards temporally coherent video painting," *The Visual Computer* 2016](https://link.springer.com/article/10.1007/s00371-016-1256-6); ["Multi-style video stylization based on texture advection," 2015](https://link.springer.com/article/10.1007/s11432-014-5255-9), accessed 2026-06-06)

**F. Gabor noise — anisotropic, oriented stroke *texture* with spectral control.**
Sparse-convolution Gabor noise gives a procedural field with direct control over **orientation, principal frequency, bandwidth** — i.e. you can dial brush-bristle texture that's anisotropic and aligned to the ETF orientation field, with high-quality anisotropic filtering and no texture coordinates. This is the right tool for the *within-stroke* bristle/impasto streaking (aurora currently fakes this with fbm streaks at [`brush.glsl.ts:164`](src/components/custom/aurora/constants/shaders/brush.glsl.ts#L164)). ([Lagae, Lefebvre, Drettakis, Dutré, "Procedural Noise using Sparse Gabor Convolution," SIGGRAPH 2009](https://graphics.cs.kuleuven.be/publications/LLDD09PNSGC/) / [PDF](https://www-sop.inria.fr/reves/Basilic/2009/LLDD09/LLDD09PNSGC_paper.pdf), accessed 2026-06-06)

**G. Layered-radial / heightmap gradient compositing — the "better than Stripe/OpenAI mesh" body.**
OpenAI's identity gradients came from (1) smoothed Perlin **heightmaps** mapped to randomized multi-stop color scales, and (2) **layered, randomly-transformed radial gradients** stacked (scale/rotate/skew/translate per layer) — lightweight, organic, far richer than a 2-stop CSS gradient. Aurora's nuclei-softmax field ([`composition.glsl`](src/components/custom/aurora/constants/shaders/composition.glsl.ts)) is already a superset of (2); the win is OKLCh-correct multi-stop scales + per-zone anisotropy (already partly present via `uNucleiElong`/`uNucleiAngle`). ([Justin Jay Wang (OpenAI), "Methods for random gradients"](https://justinjay.wang/methods-for-random-gradients/); [gradients.fyi — OKLCH mesh + noise + progressive blur](https://gradients.fyi/), accessed 2026-06-06)

**H. WebGPU compute substrate — modern, ping-pong, advect-able.**
WebGPU compute (storage buffers, `atomicAdd`, ping-pong) makes real-time advection/reaction-diffusion/fluid feasible in-browser (Firefox + Safari shipped; iOS beta). Reference patterns: ping-pong reaction-diffusion, MLS-MPM ~100k particles on an iGPU, velocity-stretched particles for "sense of motion." This is the substrate for a true *stroke-advection* aurora (strokes as a particle buffer advected by curl noise, splatted each frame) rather than a per-pixel fragment re-derivation. ([Codrops, "Reaction-Diffusion Compute Shader in WebGPU," 2024](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/); [Codrops, "WebGPU Fluid Simulations," 2025-02-26](https://tympanus.net/codrops/2025/02/26/webgpu-fluid-simulations-high-performance-real-time-rendering/); [robert-leitl/webgpu-reaction-diffusion](https://github.com/robert-leitl/webgpu-reaction-diffusion), accessed 2026-06-06)

## 3. ADOPT for glass-ui aurora / wave-seeds (tranche AW)

Each is a concrete, self-contained wave or fold. Ordered foundation→payoff.

- **AW.W?-α — Curl/bitangent-noise flow substrate.** Add a divergence-free flow field (`bitangentNoise(p,t)`, 2-gradient cross-product, PCG corner gradients) as the canonical motion source, replacing the `t * uWarpDrift` scroll in `domainWarp` ([`aurora.frag.ts:208`](src/components/custom/aurora/constants/shaders/aurora.frag.ts#L208)). All drift (nuclei, warp, strokes) reads this one field → coherent, fluid, no-pile-up motion. *Fold target:* `flow.glsl.ts`. (Technique A.)

- **AW.W?-β — 4D in-place noise evolution (kill the pan/swim).** Promote `vnoise`/`fbm` ([`aurora.frag.ts:148–174`](src/components/custom/aurora/constants/shaders/aurora.frag.ts#L148)) to sample a 4D field with time as the 4th axis (or a closed time-loop for a seamless cycle), so the field *evolves in place* instead of translating. Removes the visible pan; keeps reduced-motion freeze (`t=frozenOffset`) intact. (Technique B.)

- **AW.W?-γ — Stroke advection: marks stick to the field (shower-door fix).** Re-architect `bestOil` so stroke **seed centers advect along the curl field** between frames (carry a phase/age per cell, advance seed position by the local flow vector) instead of pinning to `floor(p/cellSize)` ([`brush.glsl.ts:188`](src/components/custom/aurora/constants/shaders/brush.glsl.ts#L188)). Re-seed on a blue-noise density target with smooth birth/death fade for temporal continuity. This is the headline coherence fix. (Techniques A + E.)

- **AW.W?-δ — Van-Gogh variant: ETF/structure-tensor orientation field.** New `medium`/`strokeMode` that computes the smoothed structure tensor of the warped color field → edge-tangent-flow orientation, and orients+curves each stroke spine *along* it (replacing `flow + hash jitter` at [`brush.glsl.ts:206–210`](src/components/custom/aurora/constants/shaders/brush.glsl.ts#L206)). Strokes follow coherent swirling directions with depth/variation — congruent to real Van Gogh, zero subject matter. Pairs with anisotropic-Kuwahara-style elliptical coverage for the painterly flatten. (Technique D.)

- **AW.W?-ε — Gabor-noise bristle texture for oil-pastel fidelity.** Replace the fbm streak fake ([`brush.glsl.ts:164`](src/components/custom/aurora/constants/shaders/brush.glsl.ts#L164)) with oriented Gabor noise (orientation locked to the ETF field, tunable frequency/bandwidth) for genuine anisotropic bristle/impasto texture — the "genuinely oil-pastel-redolent" within-stroke grain. (Technique F.)

- **AW.W?-ζ — OKLCh-native palette + derive-color variant.** The palette is baked CPU-side to linear sRGB ([`color.ts` `oklchToLinear`](src/components/custom/aurora/composables/color.ts)); promote authoring + interpolation fully into OKLCh (perceptually-even stops, no muddy mid-tones), and add a **derive** mode that generates a harmonious multi-stop scale from 1–2 seed colors (hue/chroma/lightness ramps, à la OpenAI heightmap color-scale mapping). Simplifies the options surface to "atoms": zones, noise, color. (Techniques G + perceptual-color.)

- **AW.W?-η — Simplified "atoms of control" config + presets reframe.** Collapse the ~40-uniform surface ([`aurora.frag.ts:57–117`](src/components/custom/aurora/constants/shaders/aurora.frag.ts#L57)) onto three authoring atoms — **zones** (nuclei/anisotropy), **noise** (flow + warp + evolution), **color** (OKLCh scale + derive) — with mediums/van-gogh as a top-level mode. Presets stay in consumers per house rule; library ships its own identity defaults. (Cross-cut; supports the user's "simplified options" ask.)

- **AW.W?-θ — WebGPU compute path (stroke-particle advection).** Spike a WebGPU backend on the `useWebGLCanvas` substrate: strokes as a storage-buffer particle set advected by curl noise (ping-pong), splatted each frame, with velocity-stretch for motion — the true temporally-coherent stroke transport that a per-pixel fragment shader can only approximate. Gate behind feature-detect with the WebGL2 path as fallback. (Technique H; coordinate with the substrate's offscreen-pause/PRM machinery.)

- **AW.W?-ι (interactive depth) — cursor as a flow disturbance, not just a swirl.** Current cursor rotates `p` ([`aurora.frag.ts:229–244`](src/components/custom/aurora/constants/shaders/aurora.frag.ts#L229)); under the curl substrate, inject the cursor as a **transient vortex/force into the flow field** (decaying over time) so strokes genuinely flow around the pointer and relax back — "dynamic/interactive" with physical plausibility rather than a static rotation. (Techniques A + H.)

## 4. Key sources

- [SOTA Report on Temporal Coherence for Stylized Animations — Bénard, Bousseau, Thollot, CGF 2011](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-8659.2011.02075.x) (the field's taxonomy; PDF Anubis-gated, abstract via [Semantic Scholar](https://www.semanticscholar.org/paper/8437952b7e15b0ca8387b6be36e2002c08ae92c1))
- [Fast Divergence-Free (bitangent) Noise in Shaders — atyuwen](https://atyuwen.github.io/posts/bitangent-noise/)
- [Domain Warping & fbm — Inigo Quilez](https://iquilezles.org/articles/warp/)
- [Anisotropic Kuwahara / structure-tensor ETF — Kyprianidis & Döllner, CGF 2009](https://www.kyprianidis.com/p/pg2009/) + [EG2011 NPR course pt.III](http://kahlan.eps.surrey.ac.uk/EG2011/eg2011-npr3.pdf)
- [Procedural Noise using Sparse Gabor Convolution — Lagae et al., SIGGRAPH 2009](https://graphics.cs.kuleuven.be/publications/LLDD09PNSGC/)
- [Painterly Rendering for Animation — Meier, SIGGRAPH 1996](https://www.academia.edu/153902/Painterly_rendering_for_animation) + [Deformable strokes / temporally coherent video painting, 2016](https://link.springer.com/article/10.1007/s00371-016-1256-6)
- [Methods for random gradients — Justin Jay Wang / OpenAI](https://justinjay.wang/methods-for-random-gradients/) + [gradients.fyi (OKLCH mesh)](https://gradients.fyi/)
- [WebGPU Fluid Simulations — Codrops 2025](https://tympanus.net/codrops/2025/02/26/webgpu-fluid-simulations-high-performance-real-time-rendering/) + [Reaction-Diffusion WebGPU — Codrops 2024](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/)
- Van Gogh brushstroke/turbulence context (contested): [Physics of Fluids 2024 via ScienceDaily](https://www.sciencedaily.com/releases/2024/09/240917125301.htm) + [2025 rebuttal](https://modernsciences.org/van-gogh-starry-night-fluid-dynamics-debate-april-2025/)

All sources accessed 2026-06-06. Note: the Bénard SOTA PDF (`inria.hal.science/inria-00636210/file/paper.pdf`) is gated behind Anubis anti-bot and could not be fetched directly; taxonomy reconstructed from the abstract, the GaTech coherence-framework paper, and the video-painting follow-on literature.

---

### Lane 23

The substrate is single-pass (no FBO/ping-pong machinery), which confirms a velocity-field/feedback approach requires a real architectural extension. I have everything needed. Here is the brief.

---

# AW Aurora — SOTA brief, lane "interactive-flow"

Research into pointer/interaction-driven procedural backdrops, grounded against glass-ui's current aurora. The baseline is already strong (single-pass WebGL2 fragment program; OKLCh-baked palette; anisotropic nuclei softmax field; Quilez domain-warp; four mediums; best-of-9 curved-stroke oil with impasto/bristle/broken-color; demand-driven RAF; cursor enters as a *decaying Gaussian swirl* in both `domainWarp` and `flowField`). The gap is that interaction is **stateless and instantaneous** — the cursor rotates the field under itself but leaves no trace, no momentum, no persistence. SOTA pointer-coupling is **stateful**: the pointer writes into a velocity/dye field that *advects and decays over time*, so motion leaves wakes, eddies, and trails. That is the headline opportunity.

## Findings

### 1. The canonical interactive-fluid architecture (the thing to beat / borrow)
Pavel Dobryakov's WebGL-Fluid-Simulation is the de-facto reference for cursor-coupled backdrops (16k★). It is a Stam stable-fluids solver run as a chain of fragment passes over ping-pong float textures: **curl → vorticity → divergence → pressure (Jacobi ×N) → gradientSubtract → advection → splat → display**. Pointer becomes force via **delta tracking**: `dx = pointer.deltaX * SPLAT_FORCE`, splatted as a Gaussian into the velocity field at the pointer. Defaults: `CURL 30`, `SPLAT_RADIUS 0.25`, `SPLAT_FORCE 6000`, `VELOCITY_DISSIPATION 0.2`, `DENSITY_DISSIPATION 1`, `PRESSURE 0.8`, `PRESSURE_ITERATIONS 20`. ([repo](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation), accessed 2026-06-06; pass list + params via `script.js`, accessed 2026-06-06). The "Ripple Shader" / "Flow Cursor" commercial components are the productized version of exactly this — mouse movement seeds subtle waves, clicks trigger stronger ripple bursts that distort the gradient ([Framer Ripple Shader](https://www.framer.com/marketplace/components/ripple-shader/), accessed 2026-06-06; [CSS Script smokey fluid cursor](https://www.cssscript.com/smokey-fluid-cursor/), accessed 2026-06-06).

**Key constraint for glass-ui:** the current substrate (`src/composables/glass/webgl/useWebGLCanvas.ts`) is **single-pass, no FBO/ping-pong** (grep confirms zero framebuffer machinery). A full Stam solver is a multi-pass pipeline — DESIGN.md §3 explicitly lists "no multi-pass pipelines" as a non-goal. The realistic adoption is a **single feedback texture** (one ping-pong pair) holding an advecting "influence/velocity" field, not the full pressure-projected Navier-Stokes stack. That keeps it to one extra pass.

### 2. Divergence-free curl noise — the cheap, stateless half-step
Curl noise gives swirling, fluid-like flow that is **divergence-free by construction** (curl of a potential ⇒ no sources/sinks, particles neither clump nor scatter), driven by 3D simplex noise at (x, y, t) so turbulence evolves organically ([al-ro 3D curl noise](https://al-ro.github.io/projects/particles/), accessed 2026-06-06; [ResearchGate, Bridson et al. curl-noise](https://www.researchgate.net/publication/216813629_Curl-noise_for_procedural_fluid_flow), accessed 2026-06-06). The current `flowField` (`flow.glsl.ts`) adds *fBm-perturbed* curl, which is NOT divergence-free — the aurora's existing flow can pinch/spread. A true `curl(potential)` flow would read more genuinely fluid for the same cost, no state.

### 3. Orientation fields for the van Gogh variant (the missing brushstroke spine)
Van Gogh's brushwork is **strongly rhythmic** — regular strokes tightly arranged in a coherent, repetitive orientation field; the POET (Prevailing-Orientation-Extraction) work matches humans at recovering it ([EG/Springer brush-path extraction](https://link.springer.com/chapter/10.1007/978-3-319-31008-4_11), accessed 2026-06-06). The SOTA way to *drive* stroke orientation is the **structure tensor**, not the raw gradient: the tensor gives smoother, noise-robust local orientation, strokes follow the *eigenvector* of the smoothed tensor, and **tensor coherence controls stroke width/length** (high coherence ⇒ long thin confident strokes; low ⇒ short stubby dabs) ([arXiv 2511.00702 tractography→painterly](https://arxiv.org/html/2511.00702v1), accessed 2026-06-06; [Hertzmann SBR notes](https://www.cs.ucdavis.edu/~ma/SIGGRAPH02/course23/notes/S02c23_3.pdf), accessed 2026-06-06). glass-ui's oil already places curved strokes along `flowField`, but the flow is hand-authored pattern + noise — it does NOT derive orientation from the painted color field's own structure. Deriving it (structure tensor of `sampleBase`) is what makes strokes hug the color regions like real van Gogh, instead of sliding across them. Fluid simulation has been used directly as the stroke-orientation source for van-Gogh animation specifically (Olsen, "Fluid Simulation as a Tool for Painterly Animation", northwestern.edu/~sco590/npr/van_gogh.pdf, accessed 2026-06-06 — PDF didn't text-extract, but it's the canonical fluid→van-Gogh reference and closes the loop with finding #1: the *same* velocity field that the cursor stirs can orient the brushstrokes).

### 4. OKLCh perceptual interpolation + derive-color
Interpolating gradients **in OKLCh keeps saturation through the midpoint** (no muddy gray crossover that sRGB/HSL produce), and because OKLCh hue is perceptually uniform, **hue rotations produce genuinely harmonious palettes** — pick hues, hold C equal, vary L ([gradients.fyi](https://gradients.fyi/), accessed 2026-06-06; [colorarchive OKLCh guide](https://colorarchive.org/guides/oklch-perceptual-color-design-guide/), accessed 2026-06-06; [bluemonkeymakes](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients), accessed 2026-06-06). glass-ui *bakes* OKLCh to linear sRGB and interpolates the LUT in linear (`color.ts`) — fine for the final paint, but it forfeits the OKLCh hue-rotation trick at the *palette-generation* layer. A "derive-from-one-color" variant (the user's ask) is exactly OKLCh hue-rotation + equal-C harmonics: feed one accent, emit a 3–5 stop harmonized palette procedurally.

### 5. Parallax / depth coupling (cheap, high-impact, low-risk)
Mouse parallax = layered translate driven by lagged (lerp'd) cursor coords, projecting per-layer transforms across depths via `--rotateX`/`--rotateY` ([Creative Bloq](https://www.creativebloq.com/how-to/create-a-mouse-controlled-parallax-background-effect), accessed 2026-06-06; [CSS-Script tiltEffect](https://www.cssscript.com/tilt-effect-parallax-content/), accessed 2026-06-06). For a fragment shader this is a per-layer **UV offset** proportional to cursor displacement × a per-nucleus depth — the nuclei field parallaxes against the medium grain, giving genuine depth from one extra uniform. The aurora currently has *no* depth axis; nuclei and grain share one plane.

### 6. WebGPU / compute path (the modern-architecture ask)
WebGPU is broadly shipped as of 2026 (Chrome/Edge/Firefox desktop, Safari 26 on macOS/iOS/iPadOS, Chrome Android 12+) ([weskill 2026](https://blog.weskill.org/2026/04/webgpu-future-of-graphics-building-2026.html), accessed 2026-06-06). The fluid/feedback field is the textbook **compute + storage-texture ping-pong** workload — two storage textures alternating as input/output per frame, swapped after each dispatch ([Codrops reaction-diffusion WebGPU](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/), accessed 2026-06-06; [webgpu.com fluid showcase](https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/), accessed 2026-06-06). glass-ui already has a WGSL stub (`glassShader.wgsl`) and a `renderMode` device-tier resolver — the WebGPU velocity field is the natural home for the stateful pass, with the WebGL2 single-pass swirl as the fallback tier.

### 7. Performance + accessibility (binding constraints on the whole lane)
Pointer-coupled fields must **throttle to rAF** (coalesce `pointermove` deltas; one splat/frame, not one/event) and stay demand-driven. WCAG **2.3.3 Animation from Interactions** (AAA) requires non-essential interaction-motion be reducible — parallax/zoom/slide are the named vestibular triggers; under `prefers-reduced-motion` the field must freeze and parallax must drop to zero ([MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), accessed 2026-06-06; [web.dev motion](https://web.dev/learn/accessibility/motion), accessed 2026-06-06; [Pope Tech 2025](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/), accessed 2026-06-06). The substrate (`useWebGLCanvas`) already owns live PRM freeze + offscreen-pause — the new stateful field must hook the *same* gates, and `DockBackgroundToggle` (WCAG 2.2.2) must pause it too.

## ADOPT for glass-ui aurora — wave-seed list (AW)

Each is a concrete AW wave/fold. Ordered low-risk → high-architecture.

- **AW.W?-α — Divergence-free curl flow.** Replace the fBm-angle-perturbation in `flow.glsl.ts` with a true `curl(potential)` field (potential = simplex at (p, t)). Stateless, one-function swap, reads more genuinely fluid; preserves the radial-clarity special-case. (Finding #2.)

- **AW.W?-β — Stateful pointer wake (single feedback texture).** Add ONE ping-pong float texture to the substrate (the first FBO it has ever had — scoped as an *optional* second pass, not the full Stam stack). Pointer writes a Gaussian velocity splat via **delta tracking** (`SPLAT_FORCE`-scaled `deltaX/deltaY`, per Pavel Dobryakov); the field self-advects and dissipates each frame, then biases `flowField`/`domainWarp`. This is the headline: the cursor leaves *wakes and eddies that linger and decay*, not an instantaneous swirl. rAF-throttled, one splat/frame. (Findings #1, #7.)

- **AW.W?-γ — Click ripple / shockwave.** On pointerdown, seed a radial displacement impulse (expanding ring, amplitude-decaying) into the feedback field — the "click triggers a stronger burst" idiom. Reuses the W?-β texture; near-zero marginal cost. Honors PRM (suppressed under reduce). (Finding #1.)

- **AW.W?-δ — Structure-tensor stroke orientation (van Gogh fold).** Compute the structure tensor of `sampleBase` (the painted color field), orient oil strokes along its smoothed eigenvector, and **drive stroke width/length from tensor coherence** (coherent regions ⇒ long confident strokes; flat regions ⇒ stubby dabs). This is what gives the van-Gogh variant *atomic brushstrokes congruent to real van Gogh* — strokes that hug color regions with rhythmic orientation, not strokes sliding across them. Composes with W?-β so the cursor wake bends the orientation field. (Finding #3.)

- **AW.W?-ε — OKLCh derive-color variant.** A `derivePalette(accent, harmony)` that takes ONE OKLCh accent and emits a 3–5 stop palette via perceptually-uniform hue rotation at equal/structured C (analogous / triadic / split-complementary), L-laddered. Directly serves "derive-color variant" + "full OKLCh" + "simplified options" (one knob instead of authoring N stops). Lives in `color.ts` alongside the existing bake. (Finding #4.)

- **AW.W?-ζ — Cursor parallax depth.** Add a per-nucleus `depth` (0..1) and offset each nucleus's UV by `cursorDisplacement × depth × parallaxAmount`; medium grain stays on the base plane. One uniform, huge perceived-depth payoff, the nuclei swim against the grain as the pointer moves. Drops to zero under PRM (named vestibular trigger). (Findings #5, #7.)

- **AW.W?-η — WebGPU stateful tier.** Promote the W?-β/γ feedback field to a WebGPU **compute + storage-texture ping-pong** pass on the high tier (the WGSL stub + `renderMode` resolver already exist); WebGL2 single-pass swirl is the fallback. This is the "modern WebGPU / dynamic-interactive" ask realized as a device-tiered architecture, not a rewrite. (Finding #6.)

- **AW.W?-θ — Simplified-options surface + accessibility hardening (cross-cut).** Collapse the ~30-field `AuroraConfig` to a small "atoms of control" front (zones / noise / color / interaction) over the existing config (the user's "simplified options" ask). Wire every new stateful/parallax axis into the substrate's existing PRM-freeze + offscreen-pause + `DockBackgroundToggle` gates so the interactive field is fully WCAG 2.3.3 / 2.2.2 compliant — freeze field, zero parallax, suppress ripples under reduce. (Findings #7.)

**Architectural note for whoever plans AW:** seeds β/γ/η breach DESIGN.md §3's "no multi-pass pipelines / single draw" invariant — that invariant must be *consciously revised* (one optional feedback pass, gated by tier), not silently violated. α/δ/ε/ζ/θ stay within the single-pass envelope and can ship first as a stateless-but-stunning increment while the feedback-texture substrate work lands.

Key files for the planner: `src/components/custom/aurora/constants/shaders/{flow,brush,mediums,composition}.glsl.ts`, `.../composables/{cursorModel,useCursorInteraction,runtime,color}.ts`, `.../DESIGN.md` (§3 invariant revision, §4 cursor model), and the substrate `src/composables/glass/webgl/useWebGLCanvas.ts` (needs the first FBO/ping-pong pair) + `glassShader.wgsl` / `renderMode.ts` for the WebGPU tier.

---

### Lane 24

Confirmed: flow is pattern-driven (radial/swirl/diagonal/multi), not derived from the underlying color field's structure tensor. That's a key wave-seed — deriving stroke orientation from the gradient field itself (ETF) would make brushstrokes follow the painted forms like real Van Gogh. I have everything. Synthesizing the brief now.

---

# Aurora SOTA Brief — Lane: art-direction-controls

Research for the AW tranche (procedural painterly-gradient backdrop). NO implementation here — findings + wave-seeds. The aurora today (`presets.ts:68-106`) exposes ~30 config fields across composition/warp/medium/motion/output. The user wants to **simplify the control surface** while increasing expressive range. The brush engine is already strong (`brush.glsl.ts` — curved-spine SDF, best-of-9 placement, impasto rim, broken-color jitter); the gap is art-direction ergonomics, image-derived flow, and a WebGPU path.

## Findings

### 1. Pro tools converge on ~5 art-direction atoms + progressive disclosure
The Stripe-style mesh-gradient reference exposes a two-tier surface: an **essential set** the user actually touches (4 color stops + a speed slider) and an **advanced drawer** (turbulence, octaves, lacunarity, mesh-intensity, blend modes) behind a gear icon ([gradient-stripe README, GitHub, accessed 2026-06-06](https://github.com/exzenter/gradient-stripe/blob/main/README.md); [Hufnagl Stripe teardown, accessed 2026-06-06](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/)). Progressive disclosure is the canonical pattern: show essentials first, reveal complexity on demand to cut cognitive load ([UXPin, 2026](https://www.uxpin.com/studio/blog/what-is-progressive-disclosure/); [timgraf.com, accessed 2026-06-06](https://timgraf.com/ux-design/the-art-of-progressive-disclosure-in-ux-ui-design-balancing-complexity-and-clarity/)). Stripe itself fades loud hero gradients to white near content — art direction is *per-zone*, not one global look ([learnui.design mesh-gradients, accessed 2026-06-06](https://www.learnui.design/blog/mesh-gradients.html)).

The five expressive atoms that recur (palette · flow-speed · medium · density · mood) map cleanly. **Mood/color-temperature** is the highest-leverage single dial — warm (red/orange/yellow → energy) vs cool (blue/green/purple → calm) is the foundational mood lever in painting and lighting ([NuArtPlanet, accessed 2026-06-06](https://nuartplanet.com/creating-mood-in-art-with-color-temperature-warm-cool-explained/)), and the AI-temperature metaphor (low=structured, high=surprising) is the same conceptual shape consumers already understand ([Medium/Vaidya, accessed 2026-06-06](https://medium.com/@vaidyasantosh/dialling-up-creativity-how-temperature-shapes-ai-outputs-3c06eee589ba)).

### 2. Preset-morphing beats more knobs
The SOTA simplification move is **two presets + one blend knob** — interpolate every parameter between preset A and preset B on a single slider (soft-synth/Polyend/Illustrator-blend pattern: "for normal parameters, morphing is just interpolation between the two values") ([Polyend Backstage, accessed 2026-06-06](https://backstage.polyend.com/t/morph-between-two-presets/20141); [Adobe Illustrator blend tool, accessed 2026-06-06](https://helpx.adobe.com/illustrator/using/tool-techniques/blend-tool.html)). This gives latent-space-style range from a 1-D control. The aurora already has per-preset clone state (`cloneMode: "per-preset"`, DESIGN.md §Configurator) — a morph fold is a natural extension.

### 3. OKLCh is the right interpolation space — but hue-path is a hidden knob
sRGB gradient interpolation crosses the desaturated center of the RGB cube and produces a gray/muddy midpoint between opposing hues; OKLCh curves around to a brighter route ([Toolbox365, accessed 2026-06-06](https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/)). The aurora already bakes palette to **linear sRGB and ACES-tonemaps** (DESIGN.md §7), which is correct. The under-exploited lever: **hue-interpolation direction** (shorter vs longer arc) is itself an art-direction control — a longer-arc traverse can detour outside gamut and darken, or deliberately sweep a rainbow ([ColorArchive OKLCh guide, accessed 2026-06-06](https://colorarchive.org/guides/oklch-perceptual-color-design-guide/)). Tailwind v4 / Radix / Material You all moved to OKLCh palettes ([ColorArchive, accessed 2026-06-06](https://colorarchive.org/guides/oklch-perceptual-color-design-guide/)).

### 4. Derive-color: K-means++ in Oklab, ~50ms in JS
The modern dominant-color pipeline: resize → sample up to ~90k px → **K-means++ in Oklab** (rectangular OKLCh so distance is Euclidean, chromatic a/b weighted ~2× lightness so two reds at different brightness merge) → collapse clusters within ~0.07 Oklab distance → filter by count/saturation → sort by perceived significance. ~50ms for a 400×400 image in JS ([BVDART, accessed 2026-06-06](https://bvdart.nl/en/articles/dominant-color-extraction-in-practice); [okaneco/kmeans-colors, accessed 2026-06-06](https://github.com/okaneco/kmeans-colors)). Distinguish **dominant** (most pixels) from **representative** (defines the mood) — pick representative for a backdrop palette. A single-base-color derive is even cheaper: hold L/C, shift hue by 360/n for n stops; ±30° analogous, 180° complementary, 120° triad ([Chris Henrick OKLCh, accessed 2026-06-06](https://clhenrick.io/blog/color-experiments-with-oklch/); [arxiv 1709.02252 harmonic palette, accessed 2026-06-06](https://arxiv.org/pdf/1709.02252)).

### 5. Van Gogh fidelity needs Edge-Tangent-Flow, not pattern flow
The aurora's flow is **pattern-driven** — radial/swirl/diagonal/multi (`flow.glsl.ts:6-24`), chosen by the author, decoupled from the painted color field. Real Van Gogh brushstrokes follow the *forms* — strokes run along feature edges. The SOTA way to get this: the **structure tensor** of the image (Sobel ∂x/∂y → Jxx/Jyy/Jxy → eigen-decomposition); the eigenvector of the *smallest* eigenvalue is the **Edge Tangent Flow (ETF)** field, and stroke direction follows ETF per-pixel ([3dstereophoto ETF, accessed 2026-06-06](http://3dstereophoto.blogspot.com/2018/05/non-photorealistic-rendering-edge.html); [Kang et al. CGF09, accessed 2026-06-06](https://www.umsl.edu/~kangh/Papers/kang_cgf09.pdf)). Gaussian-smoothing the tensor gives smoother strokes "without additional post-processing and more robust to noise." For a *procedural* aurora the structure tensor can be taken of the nuclei/warp field directly (no input image), so strokes curl around the color zones — the missing congruence with real Van Gogh.

### 6. Anisotropic Kuwahara is the painterly-flatten primitive
The canonical real-time painterly look = **anisotropic Kuwahara**: circular kernel (Papari) squeezed/rotated into an ellipse by the structure tensor, Gaussian-weighted sectors, lowest-variance sector wins — flattens along feature directions while sharpening edges, GPU-real-time ([Kyprianidis GPU Pro, accessed 2026-06-06](https://www.kyprianidis.com/p/gpupro/); [Kang et al. CGF09](https://www.umsl.edu/~kangh/Papers/kang_cgf09.pdf); [lygia.xyz/filter/kuwahara, accessed 2026-06-06](https://lygia.xyz/filter/kuwahara)). Params: kernel radius (smoothing strength), sector count (4 box / 8 circular), σ = radius/3, η≈0.1 λ≈0.5 (polynomial weights) ([Maxime Heckel painterly shaders, accessed 2026-06-06](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/)). This gives the "oil-pastel genuinely painterly" pole the user wants — it's a *post-pass over the existing gradient*, orthogonal to the brush SDF.

### 7. Impasto = procedural height-field → normal → specular catch-light
The aurora has a flat impasto *rim* (`brush.glsl.ts:173-178` — a fixed-tint edge add). SOTA impasto builds a **per-stroke height-field** (paint accumulation), procedurally perturbed for bristle ridges/grooves, then derives a normal and does specular lighting so light rakes across the ridges; thin strokes inherit canvas roughness, thick strokes override it ([Medium/Hadwen impasto, Dec 2025](https://medium.com/real-ai-art/create-thick-impasto-3d-renders-with-ai-prompts-painterly-texture-and-sculptural-depth-ee95736f22eb); [Differentiable Stroke Planning, arxiv 2604.02752, accessed 2026-06-06](https://arxiv.org/pdf/2604.02752)). A movable light direction makes the impasto *interactive* (cursor = light source).

### 8. WebGPU: real for compute, optional for a pure fragment background
For a **single fullscreen-triangle fragment** background, WebGL2 is still fine — WebGPU's headline wins (storage buffers, compute, ping-pong, multi-target write) matter when you're simulating *particles/agents* (physarum, fluid: 100k particles updated <2ms, ~150× over fragment-encoded WebGL hacks) ([GMShaders WebGPU, accessed 2026-06-06](https://mini.gmshaders.com/p/webgpu); [Markaicode, accessed 2026-06-06](https://markaicode.com/webgpu-replaces-webgl-performance-boost/)). The clean migration is **Three.js TSL** (since r171, Sept 2025): write the material once in JS-node form, it compiles to WGSL on WebGPU and **auto-falls-back to WebGL2 GLSL**; ~95% browser coverage gets WebGPU, the rest WebGL2, zero-config ([utsubo migration guide, accessed 2026-06-06](https://www.utsubo.com/blog/webgpu-threejs-migration-guide); [Maxime Heckel TSL field guide, accessed 2026-06-06](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/); [threejs.org TSL spec, accessed 2026-06-06](https://threejs.org/docs/TSL.html)). Caveat for glass-ui: TSL means a Three.js dependency the aurora currently avoids ("zero deps", DESIGN.md §2.8) — a WebGPU path is justified only if the brush genuinely needs compute (stroke-as-agent simulation), otherwise keep the hand-written WGSL+GLSL pair or stay WebGL2.

## ADOPT for glass-ui aurora — wave-seeds

Each is a concrete AW wave/fold. Ordered: simplification first (the user's headline), then fidelity, then platform.

- **AW.W·simplify-surface** — Introduce a 5-atom *art-direction layer* over the 30-field `AuroraConfig`: `{ palette, flow (speed+pattern), medium, density, mood }`. `mood` is a single warm↔cool + calm↔energetic dial that re-derives `saturation`/`paletteDrift`/`breathDepth`/`warpAmount` via a documented mapping. The full config stays as the advanced/expert tier (progressive disclosure) — `AuroraConfig` is unchanged underneath; the atom layer is a *resolver* that expands to it. (Refs: finding 1.)

- **AW.W·preset-morph** — Add a `morph(a, b, t)` to the aurora API that lerps every numeric field of two preset configs on one 0..1 slider (hue via OKLCh shortest-arc, nuclei matched by index). Leverages existing per-preset clone state. One knob, latent-space range. (Refs: finding 2.)

- **AW.W·derive-from-image** — New `deriveAuroraPalette(imageOrColor)` helper: K-means++ in Oklab (a/b weighted 2× L, merge <0.07, pick *representative* not just dominant), or single-base-color harmony (hold L/C, hue-rotate 360/n; analogous/complementary/triad presets). Returns `OklchStop[]` ready for `config.palette`. ~50ms, no shader change. (Refs: finding 4.)

- **AW.W·hue-path-control** — Expose hue-interpolation direction (`shorter | longer | raw`) on the palette LUT bake in `color.ts` so a consumer can choose the perceptual route between stops (avoid muddy midpoints, or deliberately sweep a long rainbow arc). Currently implicit. (Refs: finding 3.)

- **AW.W·etf-flow** *(Van Gogh headline)* — Derive stroke orientation from the **structure tensor of the procedural color field** (Sobel on the nuclei/warp output → eigen-decompose → ETF = smallest-eigenvalue eigenvector), and feed it into `bestOil`'s `flow` arg instead of (or blended with) the pattern flow from `flow.glsl.ts`. Strokes then curl around the painted zones like real Van Gogh — closes the §2.4 congruence gap. Add `flowMode: "pattern" | "etf" | "hybrid"`. (Refs: finding 5.)

- **AW.W·kuwahara-painterly** — Add an anisotropic-Kuwahara post-pass medium (`medium: "painterly"` or a `kuwahara` post knob): structure-tensor-steered elliptical Kuwahara over the composed gradient, σ=radius/3, polynomial weights. This is the genuinely-oil-pastel flatten the user wants, orthogonal to the brush SDF — a 1-radius-knob control. (Refs: finding 6.)

- **AW.W·impasto-height** — Upgrade the flat impasto rim (`brush.glsl.ts:173-178`) to a procedural per-stroke **height-field → normal → specular** model with a movable light direction (cursor = raking light), bristle-ridge noise, thin-vs-thick canvas-roughness modulation. Makes the impasto read as sculptural paint and become interactive. (Refs: finding 7.)

- **AW.W·webgpu-eval** *(spike, gated)* — Evaluate a WebGPU/TSL path ONLY if a future stroke-as-agent simulation (strokes that flow/advect over time, fluid-paint mixing) is wanted — that's where compute pays off. For the current fragment-only renderer, stay WebGL2; if adopted, use Three.js TSL r171+ for the automatic WebGL2 fallback rather than a hand-maintained GLSL/WGSL pair, and weigh the new Three.js dependency against DESIGN.md §2.8 "zero deps". Default recommendation: **defer** unless compute is needed. (Refs: finding 8.)

Grounding files: `src/components/custom/aurora/constants/presets.ts:68-106` (the 30-field config to simplify), `.../DESIGN.md` (invariants, §2.8 zero-dep + §7 linear-sRGB/ACES already correct), `.../shaders/brush.glsl.ts:173-178` (flat impasto rim to upgrade), `.../shaders/flow.glsl.ts:6-24` (pattern-only flow to extend with ETF), `.../composables/color.ts` (OKLCh bake — hue-path lever).

---

### Lane 25

I have a complete picture. The current aurora already has OKLCh authoring, `deriveAurora` color-derivation, curl-noise flow, multi-layer oil strokes, and curved-stroke SDFs. The README even references planned WebGPU and structure-tensor/Kuwahara work. The research must identify what genuinely raises the bar beyond this strong baseline. Let me compose the brief.

# SOTA Research Brief — Aurora Procedural Backdrop (Lane: reference-shadertoy)

**Date:** 2026-06-06. Researcher lane: SOTA survey for the AW aurora tranche. Produces research + wave seeds only; no implementation.

## 0. Baseline (what glass-ui aurora ALREADY has)

Grounding the bar so the seeds target real gaps, not re-treads. Per `src/components/custom/aurora/DESIGN.md` and the shader set:

- Multi-nuclei softmax composition + Quilez double-fBm domain warp + cellular/hybrid warp modes (`composition.glsl.ts`, `aurora.frag.ts:1`).
- Four peer mediums — watercolor wet-edge, pastel anisotropic-fBm stroke, crayon paper-tooth, oil 4-layer curved-spine strokes with broken color + impasto (`mediums.glsl.ts:1`, `brush.glsl.ts:1`).
- Curl-noise flow field with radial/swirl/diagonal/multi patterns + cursor swirl (`flow.glsl.ts:6`).
- OKLCh-authored palette baked to linear sRGB, ACES tonemap, `deriveAurora(seed)` one-color→N-stop harmony (`README.md:154`, `composables/color.ts`).
- Cursor-interactive, breath-paced drift, reduced-motion freeze.

So the bar to beat is internal too. The genuinely-missing SOTA pieces below are: **structure-tensor-DRIVEN stroke orientation** (current strokes follow a synthetic flow field, not the painted image's own structure — this is the single biggest fidelity gap vs real Van Gogh), **streamline/tractography continuous strokes**, **anisotropic-Kuwahara region flattening**, and the **WebGPU/compute** substrate that makes those affordable.

---

## 1. Aurora / luminous-curtain exemplars

**nimitz — "Auroras" (Shadertoy XtGGRt).** The canonical procedural aurora. Technique: a cheap `triNoise2d` (three layered value-noise samples with a rotating coordinate) accumulated along a short ray; color is assigned by a gradient mapped to ray height and noise magnitude, with additive accumulation giving the luminous emissive curtain. What makes it stunning: the *additive emission* model (light adds, never occludes) + vertical streak coherence from the layered noise. Source: [shadertoy.com/view/XtGGRt](https://www.shadertoy.com/view/XtGGRt) (403 to fetch; technique corroborated via search, 2026-06-06).

**Godot "Volumetric Aurora Borealis with Polar Reflection."** 50-step volumetric ray-march of a procedural `triNoise2d` trail field with a polynomial sample-stride (denser near camera) + bi-color gradient sky + procedural starfield. Lesson for us: even a *2D* backdrop benefits from **emissive accumulation rather than alpha-over compositing** for the smooth/atmospheric pole — additive layering reads as light, not paint. Source: [godotshaders.com](https://godotshaders.com/shader/volumetric-aurora-borealis-with-polar-reflection/) (2026-06-06).

**Takeaway the current shader misses:** the "smooth" medium composites multiplicatively over a base field; an **additive-emission sub-mode** would give a genuinely *luminous* aurora pole (the OpenAI-hero glow) that multiply can't reach.

## 2. Mesh-gradient / "Stripe-class" exemplars (the gradient-art bar to beat)

**Alex Harri — "A flowing WebGL gradient, deconstructed."** The clearest teardown. Key moves: (a) 3 stacked simplex octaves at scales 1.0/0.6/0.4 with Y compressed ×3; (b) color from a **pre-rendered 1D gradient texture** sampled by noise value `t=(n+1)/2`; (c) **power-biased blur** `t=pow(t,3.0)` so edges are *intermittently sharp* rather than uniformly hazy — this is the trick that separates "alive" from "muddy"; (d) signed-distance-from-wave-contour instead of pixel-blur (cheap soft edges). Source: [alexharri.com/blog/webgl-gradients](https://alexharri.com/blog/webgl-gradients) (2026-06-06).

**Kevin Hufnagl — Stripe gradient teardown** + **exzenter/gradient-stripe.** fBm over simplex (octaves: higher freq / lower amp each layer) + **fragment-shader blend modes** (multiply/screen/overlay) so color zones *interact* rather than linearly mix — vibrant highlights/deep shadows a `mix()` can't produce. Source: [github.com/exzenter/gradient-stripe](https://github.com/exzenter/gradient-stripe) (2026-06-06).

**gradients.fyi + the OKLCH-banding literature.** OKLCH interpolation kills "grayish dirty mid-tones" because equal numeric steps = equal visual steps; plus **noise/grain overlay + progressive blur** are the two cheap finishing touches every modern mesh-gradient tool ships. Sources: [gradients.fyi](https://gradients.fyi/), [toolbox365 OKLCH banding](https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/) (2026-06-06).

**Takeaway:** glass-ui already mixes palette in linear and authors in OKLCh, but it **interpolates the palette LUT, then maps a softmax id**. The Stripe-class trick of **blend-mode zone interaction** + **power-biased sharpening of zone boundaries** is not present and is exactly what makes Stripe/OpenAI gradients read as "lit glass" vs "flat fill."

## 3. Painterly / oil / Van Gogh exemplars (the brushwork bar)

**Kyprianidis & Kang 2009 — "Image and Video Abstraction by Anisotropic Kuwahara Filtering"** (the canonical reference, and already named in glass-ui CLAUDE precepts). The algorithm: compute the **smoothed structure tensor** `T = G_σ * [gx² , gx·gy ; gx·gy , gy²]` (gx,gy via Sobel); its eigenvalues λ₁≥λ₂ give **anisotropy** `A=(λ₁−λ₂)/(λ₁+λ₂)` and eigenvector v₁ gives **local orientation**; build an **elliptical kernel** eccentric by A, rotated to v₁; split into 8 overlapping sectors with Gaussian/polynomial weights; output = weighted mean of the **lowest-variance sector**. Result: "flattening along feature directions while preserving boundaries… directional information as found in oil paintings." Sources: [kyprianidis.com/p/pg2009](https://www.kyprianidis.com/p/pg2009/), [kang_cgf09.pdf](https://www.umsl.edu/~kangh/Papers/kang_cgf09.pdf), Shadertoy impl [view/mllBDX](https://www.shadertoy.com/view/mllBDX) (2026-06-06).

**Maxime Heckel — "On Crafting Painterly Shaders."** The practitioner's path through the same ladder: classic Kuwahara → Papari circular 8-sector → Gaussian weighting (smooth sector transitions) → polynomial weighting (perf) → anisotropic with structure tensor. Confirms the **structure-tensor-rotated elliptical kernel** is the quality hinge. Source: [blog.maximeheckel.com/posts/on-crafting-painterly-shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) (2026-06-06).

**Tractography painterly rendering (arXiv 2511.00702, 2025) — the NEW idea.** Borrows DTI fiber-tracing: seed points on a grid, **trace streamlines by integrating the structure-tensor principal eigenvector**, render each streamline as one continuous brushstroke (color/width/opacity from image stats along the path). Beats Kuwahara by giving **globally coherent long strokes** instead of fragmented per-pixel flattening — i.e. *actual Van Gogh stroke continuity*. Source: [arxiv.org/pdf/2511.00702](https://arxiv.org/pdf/2511.00702) (2025; fetched 2026-06-06).

**gpuhacks "Brush Strokes."** Practical procedural-stroke compositing: a screen-grid of stroke quads, each **rotated to the tangent of a distance/flow field**, **scaled by distance-to-edge** (bold strokes in flat areas, fine strokes near edges), tinted by the underlying framebuffer color. Source: [gpuhacks.wordpress.com/2012/01/30/brush-strokes](https://gpuhacks.wordpress.com/2012/01/30/brush-strokes/) (2026-06-06).

**JangaFX — Curl Noise.** Why curl flow swirls without sinks/sources: rotate the noise-gradient 90° → divergence-free field; deviate from 90° to *intentionally* pinch color (sources/sinks) for variation. Source: [jangafx.com/insights/curl-noise](https://jangafx.com/insights/curl-noise) (2026-06-06).

**Takeaway — the single biggest gap:** glass-ui oil strokes orient to a **synthetic flow field** (`flow.glsl.ts`), NOT to the painted image's own structure. Real Van Gogh strokes *follow the forms* — sky strokes curl with the sky, cypress strokes climb the cypress. A **structure-tensor pass that orients strokes to the underlying nuclei-field gradient** is what closes the "congruent to real Van Gogh" gap the user named.

## 4. Modern substrate (WebGPU / TSL)

**Maxime Heckel — "Field Guide to TSL and WebGPU"** + Three.js TSL docs (r184). TSL is single-source → WebGL + WebGPU dual-backend (auto-fallback via `WebGPURenderer({forceWebGL})`). The win for us: **compute shaders** let the structure-tensor and Kuwahara passes run as a ping-pong/storage-texture stage instead of recomputing per-fragment — the only affordable way to do multi-tap structure tensor + streamline tracing at 60fps. Uniform-buffer + sampler handling is the documented gotcha. Sources: [field-guide-to-tsl-and-webgpu](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/), [threejs.org/docs/TSL](https://threejs.org/docs/TSL.html) (2026-06-06).

**Takeaway:** the current single-triangle/single-fragment constraint (DESIGN.md invariant 8) **structurally forbids** structure-tensor and Kuwahara (both need multi-tap neighborhood reads / a prior pass). README already concedes a WebGPU branch relaxes this. The compute substrate is the *enabler* for sections 3's quality jumps.

---

## ADOPT for glass-ui aurora — wave-seed list

Each is a concrete AW wave/fold. Ordered by visual ROI.

- **AW.W1 — Structure-tensor stroke orientation (HEADLINE, the Van Gogh fix).** Add a `tensorField(p)` that computes the smoothed structure tensor of the *nuclei/base color field* (Sobel of `sampleBase`, Gaussian-smoothed), returns `(orientation v1, anisotropy A)`. Route oil/pastel strokes to orient along v1 (not `flowField`) with length ∝ A. This makes brushwork *follow the painted forms* — the missing congruence with real Van Gogh. Fallback: keep `flowField` as the `flow.pattern="none"` default. Ref: Kyprianidis 2009, Heckel painterly.

- **AW.W2 — Anisotropic-Kuwahara region pole.** A new `medium: "kuwahara"` (or a `flatten` axis on oil) doing the 8-sector elliptical-kernel pass — eccentricity from A, rotation from v1, lowest-variance-sector output. Gives the flattened-yet-directional oil-region look between the smooth and stroke poles. Requires multi-tap → couples to AW.W6. Ref: kang_cgf09, Shadertoy mllBDX.

- **AW.W3 — Streamline/tractography stroke layer (the "ultra-high-fidelity brushwork").** Seed a grid, integrate the tensor eigenvector to trace continuous spines, feed those spines into the EXISTING `curvedStroke` primitive (`brush.glsl.ts`). Replaces the current best-of-9-neighbor synthetic placement with image-coherent *long* strokes — genuine impasto continuity, no subject matter. Ref: arXiv 2511.00702.

- **AW.W4 — Additive-emission "luminous" sub-mode for the smooth pole.** New compositing path: accumulate zone contributions *additively* (light adds) instead of multiplicatively, gated by a `luminosity` knob. Delivers the OpenAI/Sora hero glow and a true aurora-curtain look the current multiply pipeline can't reach. Ref: nimitz Auroras, Godot volumetric aurora.

- **AW.W5 — Blend-mode zone interaction + power-biased boundary sharpening (the Stripe-beater).** At nuclei-field compositing, let adjacent zones interact via screen/overlay (not just LUT mix), and sharpen zone boundaries with `pow(weight, k)` so transitions are intermittently crisp, not uniformly soft. This is the specific trick that makes Stripe/OpenAI gradients read as lit glass. Ref: Alex Harri, exzenter/gradient-stripe.

- **AW.W6 — WebGPU/compute substrate (enabler for W1–W3).** Add a WebGPU render path (TSL or hand-WGSL) with a compute pre-pass writing the structure-tensor + Kuwahara to a storage texture; the fragment stage reads it. Keep the WebGL2 single-triangle path as fallback (it already exists; the multi-tap features simply degrade off on WebGL). Relaxes DESIGN.md invariant 8 on the WebGPU branch only, exactly as README:205 anticipates. Ref: Heckel TSL field guide, threejs TSL.

- **AW.W7 — Curl-divergence color-pinch variation.** Cheap fold: in `flowField` multi-pattern, allow the curl rotation to deviate from 90° (a `divergence` knob) to deliberately create color sources/sinks — adds Frankenthaler-style pooling/pinching to the smooth pole. Ref: JangaFX curl noise.

- **AW.W8 — Grain + progressive-blur finishing pass + OKLCh-banding guard.** Add a final blue-noise grain (already partial via `paperGrain`) + a depth/edge-aware progressive blur, and verify zone interpolation rides OKLCh end-to-end to kill mid-tone banding. The two cheap finishing touches every modern mesh-gradient tool ships. Ref: gradients.fyi, toolbox365 OKLCH banding.

- **AW.W9 — Simplified authoring door (`deriveAurora` ↑).** The user asked for "simplified options." Extend `deriveAurora(seed)` to also pick medium + flow + a 2–4 nuclei layout from one seed color + a `mood` enum (`luminous|painterly|oil|watercolor`), so a consumer ships a stunning result with one color + one word. Builds on the existing `deriveAurora` (README:154). No new shader; pure authoring ergonomics.

**Non-goals confirmed (do NOT seed):** no per-pixel image-input mode (this is a *generative* backdrop, no subject matter — per DESIGN.md non-invariants); no multi-pass on the WebGL fallback (stays single-triangle); no raw-CSS-paste of any reference (memory: Tailwind-first / re-express via shader uniforms).

**Files of record:** `src/components/custom/aurora/DESIGN.md`, `.../constants/shaders/{aurora.frag,brush.glsl,mediums.glsl,flow.glsl,composition.glsl}.ts`, `.../composables/color.ts`, `.../README.md:154,205`.

---

### Lane 26

I have everything needed. Synthesizing the brief now.

---

# Aurora SOTA research — Lane "specular-light-2d"

Faking light, specular, luminosity, and luminous depth in a 2D procedural backdrop. Research-only — wave seeds, no implementation.

## What aurora already has (grounding)

The aurora shader is already mature. Confirmed in-repo:

- **OKLCh end-to-end** — palette baked CPU-side in linear sRGB, ACES tonemap in linear, mandatory `linearToSrgb` OETF, IGN dither in display space (`src/components/custom/aurora/constants/shaders/aurora.frag.ts:300-347`).
- **Single-seed palette derivation** — `deriveAurora()` with analogous/complementary/triad/monochrome harmony, painterly L-band clamp, value.js gamut-mapping (`src/components/custom/aurora/composables/color.ts:152-262`).
- **Quilez double domain-warp + FBM/cellular/hybrid** (`aurora.frag.ts:206-247`).
- **Four mediums** — watercolor, pastel, crayon, oil (`mediums.glsl.ts`).
- **Curved swept-brushstroke SDF** — quadratic-bulge spine, bristle-ragged edges, impasto rim catch-light + cool shadow, best-of-9 cell placement (`brush.glsl.ts`).

So the lane's job is **not** to add brushwork — it's to add the *luminosity layer* that's currently missing: there is **no bloom/glow pass, no fake-SSS inner glow, no light-leak, no atmospheric depth-fog, and no view-coherent specular catch-light**. The impasto rim in `brush.glsl.ts:174-178` is the only "light" term and it's per-stroke, not field-wide. That's the gap.

## Findings + techniques (cited)

### 1. Bloom is the single biggest "glow" lever — and it's a multi-pass downsample/upsample chain
Bloom = threshold bright pixels → blur → additively composite, simulating camera/eye light bleed ([LearnOpenGL Bloom](https://learnopengl.com/Advanced-Lighting/Bloom), accessed 2026-06-06). The SOTA quality win is the **physically-based pyramid**: progressive downsample with a 13-tap filter, then upsample with a 9-tap tent filter, accumulating at each level — wide, soft, energy-stable glow with no banding, far better than one big Gaussian ([LearnOpenGL — Phys.-Based Bloom](https://learnopengl.com/Guest-Articles/2022/Phys.-Based-Bloom), accessed 2026-06-06). Threshold uses a soft knee: `smoothstep(BLOOM_START, BLOOM_END, luma)` so the glow ramps in rather than popping ([GM Shaders Mini: Bloom](https://mini.gmshaders.com/p/gm-shaders-mini-bloom), accessed 2026-06-06). Mip pyramids approximate Gaussian blur with far fewer explicit taps ([single-pass bloom search, LearnOpenGL](https://learnopengl.com/Advanced-Lighting/Bloom), accessed 2026-06-06). Dual-Kawase is cheaper per pass (expanding bilinear corner taps) and is the mobile default ([bloom/Kawase search](https://learnopengl.com/Advanced-Lighting/Bloom), accessed 2026-06-06). WebGPU note: linear sampling makes the blur passes materially faster than WebGL, and a render-graph with ping-pong slots is the clean structure ([WebGPU complete guide 2026](https://explainx.ai/blog/webgpu-complete-guide-2026), accessed 2026-06-06).

**Aurora implication:** aurora is currently single-pass into one canvas (`useWebGLCanvas`). A true bloom needs ≥2 extra render targets (threshold → blur ping-pong → composite). This is the one structurally-heavy fold — flag it as a wave with a budget gate.

### 2. Fake subsurface scattering = the cheapest "lit from within" trick, and it's a one-liner
The Frostbite/Battlefield-3 translucency approximation (Barré-Brisebois & Bouchard, GDC 2011): build a distorted half-vector `H = normalize(L + N·δ)`, then `I_back = saturate(V · -H)^p · s` ([Alan Zucconi — Fast SSS](https://www.alanzucconi.com/2017/08/30/fast-subsurface-scattering-1/), accessed 2026-06-06; [Frostbite original](https://colinbarrebrisebois.com/2011/03/07/gdc-2011-approximating-translucency-for-a-fast-cheap-and-convincing-subsurface-scattering-look/), accessed 2026-06-06). δ = distortion, p = power (falloff sharpness), s = scale. In 2D there's no geometric normal — but **the gradient field already has one for free**: `N = normalize(vec2(dFdx(luma), dFdy(luma)))` (or the analytic gradient of the nuclei field). Pick a virtual light direction `L` and you get an inner glow that brightens where the field "faces" the light through its own translucency. This is what gives gradient art the *back-lit stained-glass* feel rather than flat color.

### 3. Specular/Phong catch-light gives the arresting "wet/glossy" highlight
Specular = fake mirror reflection of a light, the third Phong term over diffuse+ambient ([Tom Dalling — More Lighting](https://www.tomdalling.com/blog/modern-opengl/07-more-lighting-ambient-specular-attenuation-gamma/), accessed 2026-06-06; [LearnOpenGL — Lighting maps](https://learnopengl.com/Lighting/Lighting-maps), accessed 2026-06-06). With the field-normal from (2) and a virtual light, a `pow(max(dot(N, halfDir), 0), shininess)` term paints a tight specular sweep — the highlight that reads as a glossy lacquer pass over the gradient. Anti-aliased per-pixel via the same `fwidth` discipline aurora already uses on the brush edges (`brush.glsl.ts:110`).

### 4. Atmospheric/aerial perspective = the painter's depth-and-luminosity recipe
Distant planes go lighter, cooler (bluer), lower-contrast, softer — haze fills shadows and compresses contrast, which is *exactly* what makes a backdrop read as luminous deep space rather than flat paint ([Russell Collection — aerial perspective](https://russell-collection.com/what-is-aerial-perspective/), accessed 2026-06-06; [Number Analytics — atmospheric perspective](https://www.numberanalytics.com/blog/atmospheric-perspective-painting-techniques), accessed 2026-06-06). **Glazing**: build luminosity by layering transparent color rather than mixing opaque ([Naturalist Gallery — aerial perspective](https://naturalist.gallery/blogs/faq/aerial-perspective-in-art-mastering-the-illusion-of-depth), accessed 2026-06-06). In a shader this is a depth proxy (the warp/FBM value, or distance from a focal nucleus) driving a cool-haze lerp + chroma falloff + local-contrast reduction. Aurora's `deriveAurora` already does the *static* version (chroma falls off toward the pale apex, `color.ts:193`) — this makes it a **per-pixel, depth-driven** effect.

### 5. Light-leak / pseudo lens-flare adds cinematic luminous artifacts cheaply
Screen-space pseudo flare: downsample-threshold → generate ghosts (flip UV, sample along the vector through screen center, distance-fade) + halo (normalize radial vector, window-weight) + chromatic aberration (sample R/G/B at different UV offsets) → blur → additive composite, with optional lens-dirt multiply and starburst ([John Chapman — pseudo lens flare](https://john-chapman.github.io/2017/11/05/pseudo-lens-flare.html), accessed 2026-06-06). For a backdrop you don't need full ghosts — a **soft directional light-leak gradient + faint chromatic fringe on the brightest band** is the tasteful subset and composites additively on the existing single pass (no extra target needed). Procedural analog light-leaks are an established film-emulation move ([analog-film-emulator commit](https://github.com/jwagner/analog-film-emulator/commit/2aa74737a10bfa1301ecd044c66406ff368bd3d8), accessed 2026-06-06).

### 6. Van Gogh: flow-field brushwork is the structural difference, not random strokes
Van Gogh's strokes follow an inner logic — turbulent flow with measured scales (width ~0.09–1.5 cm, length ~1.2–6 cm, i.e. **length ≈ 4× width**), and the sky's swirling eddies track a coherent vector field ([Hidden Turbulence in The Starry Night, arXiv 2310.03415](https://arxiv.org/pdf/2310.03415), accessed 2026-06-06; [Canvas to Code — Mihailo Zoin/Medium](https://medium.com/@kombib/canvas-to-code-the-starry-night-and-algorithms-that-dream-in-color-a3dffa8b03cb), accessed 2026-06-06). The thesis SOTA is **impasto height → relit lighting**: brushstrokes carry a height/normal so the canvas catches a virtual light, which is the same fake-normal seam as (2)/(3) ([Sharma — Van Gogh 3D shader methodology, thesis PDF](https://core.ac.uk/download/pdf/147237812.pdf), accessed 2026-06-06; [Shadertoy 3cyXRt](https://www.shadertoy.com/view/3cyXRt), accessed 2026-06-06). Aurora's brush already follows `flowField` (`brush.glsl.ts:206-210`) but the flow is generic curl — a **van-gogh variant** wants a stronger swirl/turbulence flow (multi-vortex), the 4:1 length:width canon, and the impasto rim driving a *field-wide* relight rather than a fixed RGB rim.

### 7. Painterly post-filter (anisotropic Kuwahara) is the "consolidate into strokes" finisher
Anisotropic Kuwahara: structure-tensor (Sobel) → orientation → elliptical kernel squeezed/rotated along edges → per-sector lowest-variance average; Papari's 8-sector circular kernel + polynomial weights (η≈0.1, λ≈0.5) is the quality/perf sweet spot ([Maxime Heckel — On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/), accessed 2026-06-06). This is a *post* pass that flattens noise into brush-shaped patches — complementary to aurora's *constructive* brush SDFs. Worth noting but likely lower priority since aurora builds strokes forward rather than filtering them in.

### 8. Color foundations are SOTA-aligned already — extend, don't replace
OKLab/OKLCh is the perceptual-mix standard (now Photoshop/CSS-4/Godot default) ([Aras Pranckevičius — Optimizing Oklab gradients](https://aras-p.info/blog/2022/03/11/Optimizing-Oklab-gradients/), accessed 2026-06-06; [Björn Ottosson — Oklab](https://bottosson.github.io/posts/oklab/), accessed 2026-06-06). The **IQ cosine palette** `a + b·cos(2π(c·t+d))` is the generative-palette canon and is a near-free GPU-side alternative/complement to the CPU-baked stops — good for an animated "color breathing" axis from a single seed ([IQ — Procedural Color Palette](https://iquilezles.org/articles/palettes/), accessed 2026-06-06; [offscreencanvas — generative palettes](https://offscreencanvas.com/issues/generative-shader-color-palettes/), accessed 2026-06-06). Aurora bakes stops CPU-side and reads them as a LUT; a cosine-palette mode is an *additive* derive-color variant, not a replacement.

## ADOPT for glass-ui aurora — wave seeds (AW tranche)

Each is a concrete, isolatable fold. Ordered by impact-to-cost.

- **AW.W?: Field-normal + fake-SSS inner glow** *(highest impact, lowest cost)*. Derive a 2D field normal from the nuclei/warp gradient (`dFdx/dFdy` of luma or analytic), add the Frostbite back-light term `saturate(dot(V,-normalize(L+N·δ)))^p · s` as a *field-wide* additive in `main()` before tonemap. One virtual `uLightDir` uniform + δ/p/s knobs. Gives "lit from within / stained glass" depth with no extra render target. Builds on the linear pipeline already in `aurora.frag.ts`.

- **AW.W?: Specular catch-light pass**. Same field-normal + virtual light → a tight `pow(dot(N,H), shininess)` glossy sweep, `fwidth`-AA'd, additively composited and bloom-feeding. One `uSpecular` strength knob. Reuses the AA discipline in `brush.glsl.ts:110`.

- **AW.W?: Atmospheric depth-haze (per-pixel aerial perspective)**. Promote `deriveAurora`'s static chroma-falloff into a runtime depth proxy (warp value or focal distance): cool-tint lerp + chroma reduction + local-contrast compression with depth. `uHaze` + `uHazeColor` (default cool). Turns the backdrop from "flat gradient" into "receding luminous space." Pure `main()` addition.

- **AW.W?: Physically-based bloom pyramid** *(the one structural wave — gate it)*. Add threshold (soft-knee `smoothstep` on luma) → downsample 13-tap → upsample 9-tap tent → additive composite, as extra passes on `useWebGLCanvas` (or the WebGPU path with linear-sampler ping-pong). Needs 2-3 render targets + a `profile:budget` check for the added GPU cost and the offscreen-pause/PRM contract must extend to the new passes. The single biggest "it now GLOWS" lever — but the only fold that touches the substrate, so isolate it.

- **AW.W?: Tasteful light-leak + chromatic fringe**. Subset of pseudo-lens-flare: a directional soft light-leak gradient + faint per-channel UV-offset chromatic fringe on the brightest band, additive in the single pass (no ghosts/targets). `uLightLeak` strength + direction. Cinematic luminosity for near-zero cost.

- **AW.W?: Van-Gogh flow variant** *(painterly headline)*. New flow pattern: multi-vortex turbulence (stronger swirl than current curl) + enforce the 4:1 length:width stroke canon in `bestOil` + drive the impasto rim (`brush.glsl.ts:174-178`) off the *field normal relight* instead of a fixed RGB rim, so strokes catch the virtual light as impasto height. No subject matter — pure congruent brushwork/turbulence. Composes the AW field-normal seam.

- **AW.W?: IQ cosine-palette derive-color mode**. Additive `cloneMode`/derive variant: generate the palette from `a + b·cos(2π(c·t+d))` GPU-side from a single seed, with an animated `t` "color breathing" axis. Sits alongside `deriveAurora` (CPU stops) as a second derive path — simplified single-seed control. Pure color, no substrate change.

- **AW.W? (optional/low-priority): Anisotropic Kuwahara finisher**. Structure-tensor → 8-sector elliptical Kuwahara post pass (Papari + polynomial weights) as an *opt-in* medium-finisher that consolidates noise into brush-shaped patches. Lower priority — aurora builds strokes constructively, so this is a different (filter-based) idiom; ship only if a "photographic-painterly" look is wanted. Needs one extra pass (pairs naturally with the bloom-wave's render-target plumbing).

**Sequencing note:** the field-normal seam (first wave) is the shared substrate for SSS, specular, and the van-gogh relight — land it first, then SSS/specular/haze/light-leak are all cheap `main()`-level additions sharing it. Bloom is the one heavy, gated, substrate-touching wave; keep it isolated. All folds stay inside the existing linear→ACES→OETF order and the OKLCh/value.js color core — no color-pipeline rewrite.

**Key source files for the implementing waves:** `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts` (main + warp + noise), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/brush.glsl.ts` (impasto rim seam), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/mediums.glsl.ts` (medium dispatch), `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/composables/color.ts` (deriveAurora / cosine-palette seam), `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/useWebGLCanvas.ts` (the substrate the bloom wave must extend for extra render targets + PRM/offscreen-pause contract).

---

### Lane 27

I have a complete, well-cited research corpus and a precise read of the existing aurora. The Kolmogorov −5/3 / Batchelor turbulence finding on Starry Night is a concrete, citable technique for the Van Gogh variant. I'll now write the brief.

# Aurora SOTA Composition Research — Lane "composition-rules"

Research-only brief (tranche-development). Goal: aurora backdrops that read as **composed gradient art**, not noise — bettering Stripe/OpenAI mesh gradients, with genuinely painterly oil-pastel and a turbulence-grounded Van Gogh variant. All claims cited. Findings are grounded against the *existing* aurora at `src/components/custom/aurora/` so the wave-seeds target real gaps, not already-shipped capability.

---

## 0. What the aurora already has (so seeds don't re-propose it)

Read of the shipped shader corpus:
- Multi-nuclei softmax color field with **anisotropic Gaussian** zones — `constants/shaders/composition.glsl.ts:20-58` (`nucleiField`, elongation + angle per nucleus).
- Curved swept-brushstroke SDF with impasto edge, bristle ragging, best-of-9 cell placement, 4 shape profiles — `constants/shaders/brush.glsl.ts:1-234`.
- Directional **flow field** (radial/swirl/diagonal/curl-noise/cursor) — `constants/shaders/flow.glsl.ts:6-52`.
- Four mediums (watercolor wet-edge/granulation, pastel, crayon tooth, oil) — `constants/shaders/mediums.glsl.ts`.
- Full **OKLCh** Ottosson matrices in-shader — `src/composables/glass/webgl/shaders/procedural-color.glsl.ts:73-134`.
- ACES tonemap + **IGN dither** + film grain — `constants/shaders/tonemap.glsl.ts:5-15`, `aurora/DESIGN.md:78`.
- Breath motion, palette drift, cursor deflection of both color zones and flow — `DESIGN.md:36-66`.

**The real gap:** composition is **entirely artist-authored per preset** (`DESIGN.md:23` "Authored per preset, not generated"; `DESIGN.md:99` presets are "types only, no authored themes"). There is **no compositional intelligence** — nothing places nuclei on thirds/golden points, no value-structure scaffold, no leading-line flow derivation, no focal hierarchy, no derive-from-one-color generator, no structure-tensor coherent brush orientation, no WebGPU path. That is exactly where the SOTA composition lane lands.

---

## 1. Composition theory — applying it to a procedural field

**Rule of thirds / power points.** Divide the frame on a 3×3 grid; the four line-intersections ("power points" / "crash points") are the strong focal seats. ([digital-photography-school.com/rule-of-thirds](https://digital-photography-school.com/rule-of-thirds/), accessed 2026-06-06). Directly maps to nucleus placement: the *dominant* nucleus wants a power point, not center (center is the v1–v3 error the DESIGN doc explicitly forbids, `DESIGN.md:71`).

**Golden ratio / golden spiral for focal flow.** Artists place focal points, horizon lines and key elements on the golden grid; "if you place a point of interest on the smallest part of the golden spiral, the eye will naturally flow through the rest of the image" — distributing **visual weight** across the canvas. Crucially: "a composition with perfect golden-ratio proportions but poor value structure or weak focal points will still fall flat." ([virtualartacademy.com/golden-ratio-in-art](https://www.virtualartacademy.com/golden-ratio-in-art/); [artignition.com/golden-ratio-in-art](https://artignition.com/golden-ratio-in-art/), accessed 2026-06-06). Takeaway: the φ grid is a *placement prior* for nuclei, but it must ride on top of a value structure (next).

**Value structure is the load-bearing layer.** Foreground/value contrast "separates great landscape photography from acceptable" — the eye needs a clear light↔dark hierarchy and an entry point, not a flat field. ([naturettl.com/composition-landscape-photography](https://www.naturettl.com/composition-landscape-photography/); [bergreenphotography.com/the-rule-of-thirds](https://www.bergreenphotography.com/the-rule-of-thirds-in-photography-and-whats-next/), accessed 2026-06-06). The aurora has *within-region* value mottling (`DESIGN.md:30`) but **no global value armature** — no deliberate brightest-zone / darkest-zone / mid hierarchy. This is the difference between "noise that happens to have color" and "composed art."

**Leading lines.** Visual pathways (rivers, roads) guide the gaze toward the focal point; lines entering from a bottom corner are strongest, pulling foreground→depth. ([backcountryjourneys.com/leading-lines](https://backcountryjourneys.com/leading-lines-how-simple-geometry-can-improve-your-photography); [naturettl.com](https://www.naturettl.com/composition-landscape-photography/), accessed 2026-06-06). The aurora's `flowField` is *uniform-pattern* (radial/diagonal/etc.) — it has the machinery for leading lines but no concept of "flow that converges on the dominant nucleus."

---

## 2. Gradient/color science — bettering Stripe/OpenAI mesh

**Mesh-gradient composition heuristics.** A premium mesh blends 4–5 soft blurred color circles at different positions that overlap and blend; best palettes are **harmonious** (analogous, or warm/cool mix) over a base neutral + 2 main + 1–2 accents; perceptual spaces (OKLab/LCH) give "the cleanest gradients." ([learnui.design/blog/mesh-gradients](https://www.learnui.design/blog/mesh-gradients.html); [colorffy.com/mesh-gradient-generator](https://colorffy.com/mesh-gradient-generator), accessed 2026-06-06). The aurora's nuclei *are* this model — but the palette is hand-fed, never derived from harmony rules.

**OKLCh gradient craft (the actionable rules):**
- Equal-chroma multi-hue palettes "look equally saturated regardless of hue" — build by picking hues, fixing C, varying L. ([colorarchive.org/guides/oklch-perceptual-color-design-guide](https://colorarchive.org/guides/oklch-perceptual-color-design-guide/), accessed 2026-06-06).
- Harmony by **hue rotation**: complementary +180°, analogous ±30°, triadic +120/+240° — and in OKLCh these rotations "actually look harmonious," unlike HSL. Chroma should *taper at lightness extremes* to avoid edge oversaturation; tints raise L / drop C, shades drop L / slightly drop C, tones drop C at constant L. ([bluemonkeymakes.com/articles/oklch-makes-better-gradients](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients), accessed 2026-06-06).
- OKLCh changes are perceptually uniform — equal numeric step = equal visual step, no hue/sat drift through a ramp. ([oklch.click/blog/oklch-palette-mastery](https://oklch.click/blog/oklch-palette-mastery); [oklchpicker.com](https://oklchpicker.com/), accessed 2026-06-06).

This is the spine of a **derive-from-one-color** generator: one seed OKLCh stop → a harmony-rule palette → nuclei placed on a φ/thirds prior → value armature assigned. That single feature is what turns "atoms of control" into "stunning by default."

**Banding kill (already partly done, can upgrade).** White < IGN < blue noise for dither quality; blue noise has no low-frequency content so banding becomes "finely stippled gradients." IGN (Jimenez 2014) is the cheap ALU middle ground. ([bartwronski.com/2016/10/30/dithering-part-three](https://bartwronski.com/2016/10/30/dithering-part-three-real-world-2d-quantization-dithering/); [blog.frost.kiwi/GLSL-noise-and-radial-gradient](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/), accessed 2026-06-06). Aurora already uses IGN (`tonemap` note); a blue-noise tile is the SOTA upgrade for the smooth/atmospheric pole where banding is most visible.

---

## 3. Painterly fidelity — oil-pastel and Van Gogh

**Structure-tensor / edge-tangent-flow brush orientation (the key fidelity lever).** SOTA painterly NPR derives brush direction from a **smoothed structure tensor**: Sobel ∂I/∂x,∂I/∂y → 2×2 tensor (Jxx, Jyy, Jxy); its eigenvectors give the local edge-tangent **flow field**, eigenvalues give coherence → elliptical kernel eccentricity + rotation. Strokes then *follow image structure* instead of a uniform field. ([blog.maximeheckel.com/posts/on-crafting-painterly-shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/); Kyprianidis & Kang anisotropic Kuwahara, [kyprianidis.com/p/npar2011/jkyprian-npar2011.pdf](https://www.kyprianidis.com/p/npar2011/jkyprian-npar2011.pdf), accessed 2026-06-06). The aurora's strokes ride the *flow field* (uniform pattern), not a structure tensor of its own color field — so strokes don't "hug" zone boundaries the way real brushwork does. Wiring strokes to a structure tensor of the nuclei field is the single biggest painterly-fidelity upgrade.

**Anisotropic Kuwahara as the oil-pastel smoothing operator.** Papari's circular 8-sector kernel + Gaussian/polynomial weighting + tensor-driven elliptical adaptation produces "painting-like flattening along feature directions while preserving boundaries" — the exact oil-pastel "flattened pigment patches that respect edges" look. ([researchgate.net/publication/220507613](https://www.researchgate.net/publication/220507613_Image_and_Video_Abstraction_by_Anisotropic_Kuwahara_Filtering); diglib.eg.org polynomial-weighting paper, accessed 2026-06-06). Aurora has *no Kuwahara pass* — its pastel medium is fBm-stroke + tooth. Adding a tensor-driven AKF pass over the color field, *then* stroking, is the path to "genuinely oil-pastel-redolent."

**Van Gogh = procedurally-generated directional strokes, each with own color+direction.** The thesis literature: "Van Gogh's style is many individual brushstrokes where each has a specific color and direction… procedural techniques generate the patterns"; per-stroke height contribution is perturbed to emulate bristle ridges/grooves (impasto). ([core.ac.uk/download/pdf/147237812 — Sharma, *A Van Gogh inspired 3D Shader Methodology*, TAMU](https://core.ac.uk/download/pdf/147237812.pdf), accessed 2026-06-06). Aurora's `brush.glsl.ts` already does curved strokes + impasto — what's missing is the *Van Gogh compositional rhythm*.

**The Van Gogh rhythm is physically specific (citable atoms).** Starry Night's swirls statistically obey **Kolmogorov's −5/3 power law** at large scale and **Batchelor's law** at small scale — the luminance turbulence cascade of real atmospheric flow, with eddy sizes in an exact ratio. The swirls/curves act as deliberate **leading lines** that draw the eye to the brightest star and moon; hills and cypress echo the sky's directionality to unify the composition; impasto >1mm thick makes light play across the surface. ([arxiv.org/pdf/2310.03415 — *Hidden Turbulence in van Gogh's The Starry Night*](https://arxiv.org/pdf/2310.03415); [hyperallergic.com/956221](https://hyperallergic.com/956221/van-gogh-starry-night-follows-laws-of-physics-that-werent-discovered-yet/); [washingtonpost.com/science/interactive/2024/starry-night](https://www.washingtonpost.com/science/interactive/2024/starry-night-vincent-van-gogh-painting-turbulence-physics-explained/), accessed 2026-06-06). This gives a Van Gogh variant a **physics-grounded recipe** (no subject matter needed): a curl/turbulence flow whose energy spectrum is tuned to −5/3, strokes seeded along it with per-stroke color sampled locally, impasto height accumulation, swirls converging on the brightest value zone.

---

## 4. Platform — WebGPU & interactivity

WebGL2 has **no compute pipeline** — all GPGPU is faked through fragment shaders; WebGPU adds native compute (storage buffers, `var<workgroup>` shared memory, `workgroupBarrier()`), 10×+ on particle/physics-style work, shipping by default in Chrome 113+ (now 130+), Safari/Firefox progressing. ([sitepoint.com/webgpu-vs-webgl-inference-benchmarks](https://www.sitepoint.com/webgpu-vs-webgl-inference-benchmarks/); [webgpufundamentals.org/webgpu/lessons/webgpu-from-webgl](https://webgpufundamentals.org/webgpu/lessons/webgpu-from-webgl.html), accessed 2026-06-06). Relevance to aurora: the structure-tensor + Kuwahara passes and a true stroke-particle system (Van Gogh) are *multi-pass / compute-shaped* — they fit WebGPU compute far better than the current single-fragment model (`DESIGN.md:43` "single draw, single shader"). A WebGPU path is the modern substrate for the painterly poles; the existing WebGL2 fragment path stays the fallback.

---

## ADOPT for glass-ui aurora / wave-seeds (tranche AW)

Each is a concrete, scoped wave/fold. Ordered by leverage.

- **AW.W1 — Composition engine (CPU, `composition` lane headline).** A `composeNuclei()` atom: given a count + seed, place nuclei on a **rule-of-thirds / golden-grid prior** (dominant on a power point, never center per `DESIGN.md:71`), assign one dominant + supporting hierarchy. Output feeds the existing `AuroraNucleus[]`. Turns hand-authoring into atoms-of-control. *(§1)*

- **AW.W2 — Value-structure armature.** A global L/value scaffold layered under the nuclei: one brightest zone, one anchoring dark, mids between — so every generated field has a deliberate light↔dark hierarchy and an entry point, not just within-region mottle. Rides on top of `nucleiField`. *(§1 value structure)*

- **AW.W3 — Derive-from-one-color generator.** Seed OKLCh stop → harmony-rule palette (analogous ±30 / complementary +180 / triadic +120/240 in OKLCh), equal-C with L spread, chroma taper at L extremes, tints/tones/shades. The "simplified options" headline: one color in, composed palette out. *(§2 OKLCh)*

- **AW.W4 — Leading-line flow coupling.** Extend `flowField` (`flow.glsl.ts`) with a "converge" pattern: flow lines lead from a bottom/edge corner toward the dominant nucleus, so strokes act as gaze-paths to the focal seat (the Van Gogh "swirls toward the brightest star" mechanic, generalized). *(§1 leading lines, §3)*

- **AW.W5 — Structure-tensor brush orientation.** Compute a smoothed structure tensor of the nuclei color field (Sobel → 2×2 → eigenvectors); orient strokes/anisotropy along the **edge-tangent flow** instead of the uniform flow pattern. Biggest single painterly-fidelity gain — strokes hug zone boundaries like real brushwork. *(§3)*

- **AW.W6 — Anisotropic-Kuwahara oil-pastel pass.** A tensor-driven Papari/Kuwahara smoothing pass (circular 8-sector, polynomial weighting) over the color field before stroking — the "flattened pigment patches that respect edges" that makes the oil-pastel mode genuinely oil-pastel-redolent. *(§3)*

- **AW.W7 — Van Gogh variant (turbulence-grounded).** A new medium/strokeMode: curl-turbulence flow tuned toward a **Kolmogorov −5/3** energy spectrum, dense directional strokes seeded along it, each with locally-sampled color + accumulated impasto height, swirls converging on the brightest value zone. No subject matter — pure congruent-to-real-Van-Gogh rhythm. Builds on existing `brush.glsl.ts` + AW.W4/W5. *(§3, arxiv 2310.03415)*

- **AW.W8 — Blue-noise dither tile for the smooth pole.** Swap/augment the IGN dither with a tiled blue-noise texture on the atmospheric/smooth medium where low-frequency banding is most visible; keep IGN as the zero-memory fallback. *(§2 banding)*

- **AW.W9 — WebGPU compute substrate (modern path).** A WebGPU render path for the multi-pass painterly poles (structure-tensor + Kuwahara + stroke-particle compute), with the existing WebGL2 single-fragment path as graceful fallback. Modernization headline; only worth it once W5–W7 land (they're what need compute). *(§4)*

- **AW.W10 — Simplified options surface (atoms-of-control API).** Collapse the ~30-field `AuroraConfig` (`DESIGN.md:111-129`) behind a small high-level seed API — `{ seedColor, mood, medium, energy }` → the W1–W3 engines expand it to the full config. Power users keep the full config; the default door is "give me one stunning backdrop." *(§2 mesh heuristics — base+2+accent palette shape)*

---

## Source list (all accessed 2026-06-06)

Composition: [digital-photography-school.com/rule-of-thirds](https://digital-photography-school.com/rule-of-thirds/) · [naturettl.com/composition-landscape-photography](https://www.naturettl.com/composition-landscape-photography/) · [backcountryjourneys.com/leading-lines](https://backcountryjourneys.com/leading-lines-how-simple-geometry-can-improve-your-photography) · [virtualartacademy.com/golden-ratio-in-art](https://www.virtualartacademy.com/golden-ratio-in-art/) · [artignition.com/golden-ratio-in-art](https://artignition.com/golden-ratio-in-art/) · [bergreenphotography.com/the-rule-of-thirds](https://www.bergreenphotography.com/the-rule-of-thirds-in-photography-and-whats-next/)

Gradient/color: [learnui.design/blog/mesh-gradients](https://www.learnui.design/blog/mesh-gradients.html) · [colorffy.com/mesh-gradient-generator](https://colorffy.com/mesh-gradient-generator) · [colorarchive.org/guides/oklch-perceptual-color-design-guide](https://colorarchive.org/guides/oklch-perceptual-color-design-guide/) · [bluemonkeymakes.com/articles/oklch-makes-better-gradients](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients) · [oklch.click/blog/oklch-palette-mastery](https://oklch.click/blog/oklch-palette-mastery) · [oklchpicker.com](https://oklchpicker.com/)

Dithering: [bartwronski.com/2016/10/30/dithering-part-three](https://bartwronski.com/2016/10/30/dithering-part-three-real-world-2d-quantization-dithering/) · [blog.frost.kiwi/GLSL-noise-and-radial-gradient](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/)

Painterly: [blog.maximeheckel.com/posts/on-crafting-painterly-shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) · [kyprianidis.com/p/npar2011/jkyprian-npar2011.pdf](https://www.kyprianidis.com/p/npar2011/jkyprian-npar2011.pdf) · [researchgate.net/publication/220507613 (anisotropic Kuwahara)](https://www.researchgate.net/publication/220507613_Image_and_Video_Abstraction_by_Anisotropic_Kuwahara_Filtering) · [core.ac.uk/download/pdf/147237812 (Sharma, Van Gogh shader thesis, TAMU)](https://core.ac.uk/download/pdf/147237812.pdf)

Van Gogh turbulence: [arxiv.org/pdf/2310.03415 (Hidden Turbulence in The Starry Night)](https://arxiv.org/pdf/2310.03415) · [hyperallergic.com/956221](https://hyperallergic.com/956221/van-gogh-starry-night-follows-laws-of-physics-that-werent-discovered-yet/) · [washingtonpost.com/science/interactive/2024/starry-night](https://www.washingtonpost.com/science/interactive/2024/starry-night-vincent-van-gogh-painting-turbulence-physics-explained/)

WebGPU: [sitepoint.com/webgpu-vs-webgl-inference-benchmarks](https://www.sitepoint.com/webgpu-vs-webgl-inference-benchmarks/) · [webgpufundamentals.org/webgpu/lessons/webgpu-from-webgl](https://webgpufundamentals.org/webgpu/lessons/webgpu-from-webgl.html)

Codebase grounding: `src/components/custom/aurora/DESIGN.md` (esp. :23, :30, :43, :71, :99, :111-129); `constants/shaders/{composition,brush,flow,mediums,tonemap}.glsl.ts`; `src/composables/glass/webgl/shaders/procedural-color.glsl.ts:73-134`.

---

### Lane 28

I now have full grounding. The current aurora uses a single `sin(t·2π/period)` global breath plus per-nucleus drift phase and a palette hue breathe (`K_PAL=24.0`) — a single-octave temporal model. This is exactly the gap the SOTA research closes. Synthesizing the brief.

---

# SOTA brief — Aurora temporal aesthetics & painterly motion (lane: animation-easing-aurora)

Research-only. Wave-seeds are AW-tranche candidates; no implementation here. All findings cross-referenced against the current aurora implementation so each seed is net-new.

## Where aurora is today (grounding)

The temporal model is **single-octave**. `aurora.frag.ts:316-318` drives one global luminance wobble: `breath = sin(t·2π/uBreathPeriod); col *= 1 + uBreathDepth·breath·0.5`. Palette hue "breathe" is one cosine at `K_PAL = 24.0` (`aurora.frag.ts:132`, ~one cycle/33s). Per-nucleus motion is a single drift circle (`uNucleiDriftPhase`, `uniformBridge.ts:137`). Flow field (`flow.glsl.ts`) advances on `t·0.02` only in the `multi` pattern. DESIGN.md §2.7 codifies "Breath-paced motion. Primary warpDrift 0.005-0.010; full breath cycle 40-60s. Stroke texture stays static (material, not process)."

So: one breath sine, one palette cosine, one drift circle per nucleus, monotonic `t` into warp. **Everything is a single sinusoid or a linear ramp of `t`.** That is the entire temporal surface today. The SOTA below is almost all about *layering* time rather than adding new spatial features.

## Findings

### 1. Layered competing temporal rhythms — the core "alive" trick
Alex Harri's deconstruction (the canonical flowing-gradient writeup) stacks simplex-noise waves at related-but-not-harmonic frequency ratios, each with its own amplitude weight and **some travelling in opposite directions**: `L/1.00·0.85`, `L/1.30·1.15`, `L/1.86·0.60`, `L/3.25·0.40`. The load-bearing quote: *"Making some of the waves travel in the opposite direction prevents the final wave from feeling as if it's moving in one direction at a constant rate."* Flow drift constant `F = 0.043`, and *"if the flow is easily noticeable, there's too much of it."* ([alexharri.com, deconstructed WebGL gradient, accessed 2026-06-06](https://alexharri.com/blog/webgl-gradients))

The aurora's single breath sine is the opposite of this — it pulses uniformly. The fix is to sum 2-3 breath sinusoids at irrational period ratios (e.g. 47s / 31s / 19s) with opposing signs, so the global breath never resolves to an obvious beat. Same principle for warp drift and palette breathe.

### 2. Multi-octave time = parallax depth in 2D
Stripe's gradient (minigl + Gradient class) modulates the coordinate system by a **sinusoidal mesh** — `sin()`/`cos()` of UV with time offsets warping the noise against itself ("liquid / stretched fabric"), layered over FBM octaves with lacunarity/persistence. ([Kevin Hufnagl, How To: Stripe Website Gradient Effect, accessed 2026-06-06](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/)) The parallax literature gives the perceptual rule: closer = faster, farther = slower, and *"jumps between layer speed increments should follow a consistent upward curve"* for natural depth. ([Adobe, Layer depth parallax](https://helpx.adobe.com/animate/using/layer-depth.html); [SLYNYRD Pixelblog 23, Parallax Scrolling](https://www.slynyrd.com/blog/2019/11/12/pixelblog-23-parallax-scrolling)) Mapping into aurora: the large color zones (nuclei) should drift *slowly*, the warp octaves should advance *faster*, and the finest detail/grain faster still — a temporal-frequency ladder bound to the spatial-frequency ladder. Today every octave shares one drift rate.

### 3. Domain-warp animation via the q/r intermediates
Quilez's `f(p) = fbm(p + fbm(p + fbm(p)))` exposes intermediates `q` and `r`; *"introducing time as a parameter"* animates the warp, and color can be mixed on `|q|` and `r.y`. ([Inigo Quilez, Domain warping, accessed 2026-06-06](https://iquilezles.org/articles/warp/)) Aurora already does the double-fBM warp spatially but advances it on a single linear `t`. Threading a *slow, looped* time offset into the inner vs outer warp at different rates is what makes the color zones slowly inhale/exhale and curl rather than rigidly translate.

### 4. Seamless loops via toroidal time (donut sampling)
A perfect loop requires every time-dependent term periodic and phase-aligned at the boundary: `phase = fract(seconds/period)`, then `loopVec(p) = vec2(cos(p·TAU), sin(p·TAU))` fed as the time-offset into noise — *"works even if your noise isn't tileable, because the sampling path is closed."* For back-and-forth, ease a triangle wave: `pingpong(p) = easeInOut(1 - |2p-1|)` with `easeInOut(x)=x²(3-2x)`. ([shadergif.com, How to Make a Perfect Loop in GLSL, accessed 2026-06-06](https://shadergif.com/guides/how-to-make-a-perfect-loop/); [connorbell.ca, Generating Looping Noise](https://connorbell.ca/2017/09/09/Generating-Looping-Noise.html)) Aurora's `t·2π/period` breath is already periodic, but warp/flow/nuclei advance on **unbounded `t`** — so the composition as a whole never returns. This blocks: GIF/MP4 export, deterministic screenshots, and a perceptible "settled" rest state. Adopting toroidal time for warp + drift makes the entire backdrop a true closed loop.

### 5. Easing the breath itself (organic envelopes)
Raw `sin` for breath gives a symmetric pulse. Real breathing / candle-flame / cloud motion has asymmetric envelopes — slow inhale, faster exhale, a hold. The perfect-loop guide's `smoothstep`/`easeInOut` on a triangle wave gives an asymmetric, eased envelope without breaking periodicity. Alex Harri's blur uses `pow(t, 3.5)` to bias toward "periods of relative sharpness" — an exponent on a normalized noise value to shape the *temporal distribution* of an effect, not just its spatial one. ([alexharri.com, accessed 2026-06-06](https://alexharri.com/blog/webgl-gradients)) Aurora can shape breathDepth, saturation, and warp amount through eased envelopes so the motion has phrasing, not metronome.

### 6. Painterly motion: structure-tensor flow + Kuwahara (the van-gogh path)
The SOTA NPR pipeline for oil/van-gogh look is a 3-pass post-process: (1) **structure tensor** from Sobel derivatives `J=[[Jxx,Jxy],[Jxy,Jyy]]` giving local orientation; (2) **anisotropic Kuwahara** — circular kernel split into 8 Gaussian-weighted sectors, output = mean of lowest-variance sector, with the kernel *squeezed and rotated into an ellipse aligned to the tensor eigenvectors* ("the artist adapts brush flow to edge direction"); (3) tonemap. Polynomial weight `[(x+ζ)-ηy²]²` replaces the Gaussian for speed. ([Maxime Heckel, On Crafting Painterly Shaders, accessed 2026-06-06](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/); [Kyprianidis et al., Image and Video Abstraction by Anisotropic Kuwahara Filtering, Computer Graphics Forum 2009](https://www.kyprianidis.com/p/pg2009/)) Impasto literature adds a **height-field** for canvas + paint accumulation, per-pixel perturbed for bristle ridges, then relit — that ridge-relight is what reads as physical oil. ([Sharma, A Van Gogh inspired 3D Shader Methodology, TAMU thesis](https://core.ac.uk/download/pdf/147237812.pdf); [van Gogh Gallery, Impasto](https://blog.vangoghgallery.com/index.php/en/2012/12/17/van-goghs-painting-technique-impasto/))

Crucially for a backdrop: aurora **generates** its field, so it already *has* the flow field (`flowField()` in flow.glsl) and doesn't need Sobel — it can feed the analytic flow direction straight into an anisotropic Kuwahara pass, which is cheaper and more coherent than the image-derived NPR version. The structure tensor's *value* here is temporal coherence: tensor-driven NPR is *"temporally coherent without extra processing"* ([Kyprianidis 2009](https://www.kyprianidis.com/p/pg2009/)), which is exactly the constraint for an animated backdrop where frame-to-frame brush-flicker would be fatal. Today's oil mode (`mediums.glsl`, brush.glsl) is SDF swept-strokes; it has no region-flattening / variance-collapse step, which is why it reads as strokes-on-gradient rather than paint.

### 7. Modern interactivity grammar (velocity, not just position)
2025-26 reactive backdrops bind motion to **scroll/pointer velocity**, not position: tilt/parallax scales with scroll speed, "breath" *is* scroll speed, palette shifts as you move through content. ([Codrops, Scroll-Reactive 3D Gallery, 2026-03-09](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/); [Codrops, 3D Infinite Carousel with Reactive Gradients, 2025-11-11](https://tympanus.net/codrops/2025/11/11/building-a-3d-infinite-carousel-with-reactive-background-gradients/)) Aurora's cursor model (`cursorModel.ts`) is position-only with a 2s decay; it tracks where the pointer *is*, never how fast it moved. Velocity-reactive warp (fast flick → transient swirl burst that eases out) is the missing "alive" interaction.

### 8. OKLCh temporal color (hue-travel breathing)
OKLCh interpolation *"travels around the hue circle rather than through the gray center,"* keeping chroma up and avoiding muddy midpoints. ([Björn Ottosson, Oklab](https://bottosson.github.io/posts/oklab/); [Blue Monkey Makes, OKLCH Gradients](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients)) Aurora already bakes the palette in linear sRGB CPU-side. The temporal opportunity: do the palette *breathe* (the `K_PAL` hue cosine) as a small OKLCh **hue rotation** rather than a luminance wobble, so the backdrop slowly shifts hue-family over the breath cycle without ever desaturating — a "living palette." This is the temporal half of the "full OKLCh" goal.

### 9. Calm-tech constraint (the governing limit on all of the above)
WCAG 2.3.3 / `prefers-reduced-motion` guidance: reduce **amplitude and speed**, don't just kill motion. ([web.dev, prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion); [W3C WAI C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39); [Pope Tech, Accessible animation 2025-12-08](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/)) The `useWebGLCanvas` substrate already freezes to one static frame under PRM (CLAUDE.md, AV.W7). The temporal-aesthetics implication: layered competing rhythms (finding 1) must have a single global **amplitude/rate scalar** so PRM (and a future `breath-intensity` knob) can dial the whole temporal stack toward stillness without per-term edits. Design for one master tempo dial from the start.

## ADOPT for glass-ui aurora / wave-seeds

Each is a concrete AW wave/fold. Ordered roughly by leverage-to-cost.

- **AW.W?-α — Layered breath (multi-sinusoid temporal core).** Replace the single `breath = sin(t·2π/period)` (`aurora.frag.ts:317`) with a sum of 2-3 sinusoids at irrational period ratios and mixed signs (e.g. 47/31/19s). Same for warp-drift and the `K_PAL` palette breathe. One `uBreathTempo` master scalar gates the whole stack (finding 1, 9). Smallest diff, largest "alive" delta.

- **AW.W?-β — Temporal-frequency ladder (2D parallax).** Bind drift rate to spatial frequency: nuclei drift slowest, warp octaves faster, grain fastest, speeds on a consistent upward curve. Threads a per-octave time-scale into the existing fBM loop (finding 2). Makes flat zones read as foreground-over-background depth.

- **AW.W?-γ — Toroidal looped time.** Convert warp + nuclei-drift + flow time inputs from unbounded `t` to `loopVec(fract(t/period))` donut sampling so the *entire* composition is a closed loop (finding 4). Unlocks deterministic screenshots, GIF/MP4 export, and a true visual rest state for the demand-driven park loop. Pairs naturally with the existing periodic breath.

- **AW.W?-δ — Eased breath envelopes.** Shape breathDepth/warpAmount through `easeInOut(pingpong(phase))` and `pow()` biasing instead of raw `sin`, giving asymmetric inhale/exhale phrasing (findings 4, 5). Pure shader-side, no new uniforms beyond an envelope-shape constant.

- **AW.W?-ε — Velocity-reactive cursor.** Extend `cursorModel.ts` with pointer/scroll *velocity*; a fast flick injects a transient swirl-burst into `flowField`/`domainWarp` that eases out over ~1s, distinct from the steady position-attraction (finding 7). The "dynamic/interactive" goal's missing half.

- **AW.W?-ζ — Anisotropic Kuwahara medium (the van-gogh path).** New `medium` that feeds aurora's *analytic* `flowField()` direction (no Sobel needed — aurora generates the field) into an elliptical 8-sector Kuwahara variance-collapse pass, giving real flow-aligned paint-region flattening with built-in temporal coherence (finding 6). This is the structural step the current SDF oil mode lacks — strokes become *paint*, not strokes-on-gradient. Tensor-coherence is what keeps it flicker-free in motion.

- **AW.W?-η — Impasto height-relight.** Add a procedural paint-height field (flow-aligned ridge noise) and relight it with a fixed key light, perturbed per-pixel for bristle grooves (finding 6). The physical-oil "depth/variation congruent to real van gogh" the goal asks for — the brushstrokes catch light.

- **AW.W?-θ — Living OKLCh palette breathe.** Re-express the `K_PAL` palette cosine as a small OKLCh hue rotation (constant chroma) rather than luminance wobble, so the backdrop slowly shifts hue-family over the breath cycle without muddying (finding 8). Requires the palette breathe to move to OKLCh-space (the derive-color/full-OKLCh goal's temporal arm).

- **AW.W?-ι — Master tempo + reduced-motion dial.** A single `tempo`/`breathIntensity` scalar (0 = frozen, 1 = full) gating every temporal term, wired to live PRM. Codify in DESIGN.md as a §2 invariant so future temporal additions register against it (finding 9). Should land *with or before* AW-α so the layered stack is dial-able from day one.

**Sequencing note:** α + ι are the foundation (cheap, enabling); β + γ + δ are the temporal-aesthetics body; ε is interaction; ζ + η + θ are the painterly/van-gogh + OKLCh arm and are heavier (likely their own sub-tranche). DESIGN.md §2.7 ("Stroke texture stays static — material, not process") must be revisited for ζ/η: those make brushwork partly *process*, a deliberate amendment to record.

## Source ledger (all accessed 2026-06-06)
- Alex Harri, A flowing WebGL gradient, deconstructed — https://alexharri.com/blog/webgl-gradients
- Inigo Quilez, Domain warping — https://iquilezles.org/articles/warp/
- shadergif.com, How to Make a Perfect Loop in GLSL Shaders — https://shadergif.com/guides/how-to-make-a-perfect-loop/
- Connor Bell, Generating Looping Noise — https://connorbell.ca/2017/09/09/Generating-Looping-Noise.html
- Kevin Hufnagl, How To: Create the Stripe Website Gradient Effect — https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
- Maxime Heckel, On Crafting Painterly Shaders — https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/
- Kyprianidis et al., Image and Video Abstraction by Anisotropic Kuwahara Filtering (CGF 2009) — https://www.kyprianidis.com/p/pg2009/
- Suruchi Sharma, A Van Gogh inspired 3D Shader Methodology (TAMU thesis) — https://core.ac.uk/download/pdf/147237812.pdf
- van Gogh Gallery, Van Gogh's Painting Technique: Impasto — https://blog.vangoghgallery.com/index.php/en/2012/12/17/van-goghs-painting-technique-impasto/
- Björn Ottosson, A perceptual color space for image processing (Oklab) — https://bottosson.github.io/posts/oklab/
- Blue Monkey Makes, How OKLCH Makes Better Gradients — https://bluemonkeymakes.com/articles/oklch-makes-better-gradients
- Codrops, Building a Scroll-Reactive 3D Gallery (2026-03-09) — https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/
- Codrops, 3D Infinite Carousel with Reactive Background Gradients (2025-11-11) — https://tympanus.net/codrops/2025/11/11/building-a-3d-infinite-carousel-with-reactive-background-gradients/
- web.dev, prefers-reduced-motion — https://web.dev/articles/prefers-reduced-motion
- W3C WAI, C39 (prefers-reduced-motion) — https://www.w3.org/WAI/WCAG22/Techniques/css/C39
- Pope Tech, Design accessible animation and movement (2025-12-08) — https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/

**Grounding files:** current single-octave temporal model at `src/components/custom/aurora/constants/shaders/aurora.frag.ts:316-318` (breath), `:132` (palette `K_PAL`); flow time at `src/components/custom/aurora/constants/shaders/flow.glsl.ts` (`t*0.02`, multi-pattern only); nucleus drift at `src/components/custom/aurora/composables/uniformBridge.ts:137`; position-only cursor easing at `src/components/custom/aurora/composables/cursorModel.ts:17-19`; temporal invariant 2.7 at `src/components/custom/aurora/DESIGN.md`.

---

### Lane 29

I now have everything I need. The key cost finding: `sampleBase` is called 4× in the watercolor edge-detect, and once per stroke-cell inside `bestOil` (each call re-runs `domainWarp` → 2× fbm with up to 5 octaves, then `nucleiField`). For 4 stroke layers × 9 neighbors × 3 cells = the field is recomputed dozens of times per pixel in oil mode. That's the perf gap. I have enough to write the brief.

# Aurora shader audit — current state, gaps vs SOTA, and AW wave-seeds

Lane `cb-current-frag`. All paths under `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/`.

## What's there

A single-pass WebGL2 fragment program assembled at module load from W13-decomposed partials. `aurora.frag.ts` is the assembler + noise/warp foundation + `main()`; it splices `composition.glsl.ts` (palette LUT + nuclei softmax) · `flow.glsl.ts` (flow-field dispatch) · `tonemap.glsl.ts` (ACES) · `mediums.glsl.ts` (the four mediums, split pre/post brush) · `brush.glsl.ts` (curved-stroke SDF). The emitted string is character-equivalent to the prior hand-inlined shader (`aurora.frag.ts:42-48`).

**Pipeline** (`aurora.frag.ts:300-347`): `domainWarp` (Quilez double-fBm, `:206`) → `nucleiField` softmax (`composition.glsl.ts:20`) → linear-sRGB palette LUT (`composition.glsl.ts:9`) → value-variance + breath → medium dispatch (`:321-324`) → saturation → ACES (`tonemap.glsl.ts:6`) → paper grain → mandatory `linearToSrgb` OETF (`:339`) → 1-LSB IGN dither in display space (`:343`) → premultiplied alpha.

**Atoms of control** (`presets.ts:68-106`, ~30 fields): palette (2–8 OKLCh stops), nuclei (1–6, each carries `paletteBias`/`valueBias`/`driftRadius`/`driftPhase` + W-era anisotropy `elongation`/`angle`, `composition.glsl.ts:36-42`), `softmaxBeta`, `valueVariance`, warp (`amount`/`scale`/`drift`/`mode`/`octaves`), medium block, flow block, motion block, output block.

**Color** (`composables/color.ts`): palette baked CPU-side to linear sRGB via value.js Ottosson (`oklchToLinear`, `:42`). `deriveAurora(seed, {harmony, stopCount, lightnessSpread, chromaFalloff, hueSpread})` (`:152`) is a real single-seed→N-stop derive with 4 harmonies (analogous/complementary/triad/monochrome, `:202`) and per-stop `gamutMapStop` (`:250`). This is solid and already SOTA-shaped.

**Medium modes** (`uMedium`, dispatched `aurora.frag.ts:321-324`):
- **smooth** (0) — no overlay.
- **pastel** (1, `mediums.glsl.ts:50`) — anisotropic fBm stroke along flow + high-freq tooth. One `fbm` call + two `vnoise`. Cheap, reads as soft directional grain.
- **watercolor** (2, `mediums.glsl.ts:26`) — luma-gradient wet-edge mask (4× `sampleBase`, `:29-32`), granulation in paper tooth, wash banding. Decent wet-on-wet.
- **oil** (3, `mediums.glsl.ts:124`) — the heavy one. 4 stroke layers + optional crosshatch (`:182-220`) of `bestOil` best-of-9-neighbor curved-stroke placement (`brush.glsl.ts:188`), `uStrokeMode` routes oil/knife/chunky (`:130-161`). Curved-spine SDF with bristle-ragged edges, impasto rim/shadow, internal streaks (`brush.glsl.ts:72-183`).
- **crayon** (4, `mediums.glsl.ts:75`) — PEER medium, NOT strokes. Anisotropic tooth-noise multiply (3 `vnoise` octaves) rotated to flow + pressed-crumb darkening + waxy film + broken-color patches.

**Quality level**: a competent, thoughtful single-pass painterly shader — clearly above Stripe/OpenAI mesh-gradient *smoothness* work (those are pure warped color fields; aurora adds real medium texture). The color management is genuinely correct (linear pipeline, ACES, post-OETF dither, full OKLCh derive with gamut mapping). The perf hygiene is strong (offscreen park, PRM freeze, DPR cap, `fwidth` AA). **But the brushwork is procedural-cell SDF placement, not flow-guided structure-tensor painting** — which is the line between "nice generative texture" and "genuinely painterly / van-Gogh-redolent."

## Gaps vs SOTA

1. **Brushwork is grid-cell SDF, not structure-tensor flow-guided.** `bestOil` (`brush.glsl.ts:188`) places strokes on a jittered grid and orients them by the *flow field* (`flow.glsl.ts` — radial/swirl/diagonal/multi/curl). The DESIGN doc itself flags this: flow "never drives which palette stop" and strokes don't hug the color zones (`README.md:273-275`). SOTA NPR (Kyprianidis & Kang anisotropic Kuwahara, CGF 2009, already in references) derives stroke direction from the **structure tensor of the image's own color gradient** — strokes flow *along* edges and *around* color masses. That's what makes real Van Gogh read as Van Gogh: brushstrokes congruent to the underlying form, not a global swirl pattern. The current "Van Gogh" preset (`demo/.../presets.ts:257`) is just `flow: swirl + curl 0.55` — a global vortex, not per-zone directional brushwork.

2. **No pigment mixing — strokes are linear `mix`.** `paintOver` (`brush.glsl.ts:182`) composites with `mix(col, c, alpha)` in linear RGB. Real oil/oil-pastel layering is subtractive Kubelka-Munk pigment mixing — `spectral.js` (Kubelka-Munk on the GPU) is already in the reference list (`README.md:300`) but **not implemented**. Overlapping strokes of complementary hues currently muddy toward gray; KM mixing keeps them luminous and "paint-like."

3. **Crayon/oil-pastel is a tooth-multiply, not painterly.** `mediumCrayon` (`mediums.glsl.ts:75`) is anisotropic noise × base color. It reads as *textured gradient*, not oil-pastel. Genuine oil-pastel has: visible chunky directional strokes with waxy buildup, color-on-color smearing, broken edges where the stick lifts, and impasto-like ridges where pressure varied. None of the stroke machinery (`brush.glsl.ts`) is wired into crayon — it deliberately bypasses strokes (`mediums.glsl.ts:69-74`). The user explicitly wants this mode "genuinely painterly / oil-pastel-redolent."

4. **No in-shader OKLCh — all color work is CPU-baked or naive-RGB.** Confirmed: zero OKLCh references in the shader partials (the `OKLCH_MATRICES_GLSL` chunk exists in `procedural-color.glsl.ts:73` but aurora doesn't splice it). Consequences: palette interp is linear-RGB `mix` (`composition.glsl.ts:16`) so the gradient *midpoints desaturate* (the classic RGB-lerp gray-dip OKLCh fixes); `hueShift` for broken-color (`aurora.frag.ts:257`) is a YIQ-ish RGB matrix, not perceptual; `saturate3` is luma-lerp (`:284`); value-variance is a flat RGB multiply (`aurora.frag.ts:314`). Moving palette interp + broken-color + saturation into OKLCh would visibly improve gradient richness and keep brushstroke hue-jitter perceptually even.

5. **`nucleiField` is the only compositional primitive — no zones/regions/masks as first-class atoms.** Everything is Gaussian metaballs (`composition.glsl.ts:20`). The user wants "atoms of control: zones, noise, color." There's no notion of a hard-edged zone, a directional band, a ridge/valley field, or a per-zone medium. Cellular warp (`aurora.frag.ts:214`) is the closest to "territories" but it only perturbs the warp coordinate, not a true region partition.

6. **Field is recomputed dozens of times per pixel in oil mode (perf ceiling).** `sampleBase` (`mediums.glsl.ts:17`) re-runs the *entire* `domainWarp` (2 fBm calls, each up to 5 octaves) + `nucleiField` every call. It's called 4× in watercolor (`:29-32`) and **once per stroke cell** inside `bestOil` (`brush.glsl.ts:220`) — i.e. up to 9 neighbors × 4–5 layers ≈ 40+ full-field recomputes per fragment in oil mode. This is the single biggest cost and the thing that forces the DPR cap. A WebGPU compute-prepass that bakes the warped color field + structure tensor to a texture once would unlock far richer brushwork at the same frame budget.

7. **No WebGPU path.** Aurora is WebGL2-only — confirmed: the only `.wgsl` in the tree is `glassShader.wgsl` for the glass renderer (`composables/glass/webgpu/`), unrelated. `runtime.ts` composes `useWebGLCanvas` exclusively. The README already *plans* a WebGPU branch for "structure-tensor / Kuwahara passes" (`README.md:205-206, 274-275`) but it's vapor — no WGSL, no compute, no adapter probe. WebGPU is the enabling substrate for gaps 1, 2, and 6 (multi-pass: field bake → structure tensor → flow-guided stroke pass → KM composite).

8. **Single-pass ceiling blocks the SOTA techniques.** DESIGN §3 hard-bans multi-pass ("No multi-pass pipelines," `DESIGN.md:36`). That invariant is exactly what stops structure-tensor flow (needs a gradient pre-pass), anisotropic Kuwahara (needs a tensor field), and proper layered KM (benefits from accumulation). The WebGPU branch is the sanctioned place to relax it (`README.md:205`).

9. **Options surface is large and flat (~30 fields).** The user wants "simplified options." `AuroraConfig` (`presets.ts:68`) exposes every shader uniform directly; there's no high-level "style + intensity + seed-color" facade over the atomic controls. `deriveAurora` is a start but only covers the palette.

10. **Interactivity is cursor-swirl only.** `domainWarp` cursor rotate (`aurora.frag.ts:229-244`) + `flowField` cursor blend (`flow.glsl.ts:35-49`). No scroll-coupling, no audio/data reactivity, no pointer-velocity-driven stroke energy, no "paint accumulates where you dwell." The user wants "dynamic/interactive" — this is a thin seam to widen.

## SOTA techniques to pull from (with where they'd land)

- **Structure-tensor flow field** (Kyprianidis & Kang 2009; "Thinking Like Van Gogh" arXiv:2601.10075, both already cited). Compute the smoothed structure tensor of the warped color field; its minor-eigenvector gives the local edge-tangent. Orient brushstrokes along it → strokes hug color masses. This is *the* van-Gogh lever.
- **Anisotropic Kuwahara filtering** — directional smoothing that flattens regions into painterly facets while preserving edges, oriented by the structure tensor. Gives the "palette-knife flat patches with crisp boundaries" look far better than the current `bestOil` cells.
- **Kubelka-Munk pigment mixing on GPU** (spectral.js, cited but unused). Replace `paintOver`'s linear `mix` with subtractive KM so overlapping strokes stay luminous.
- **OKLCh in-shader interpolation + perturbation** — the `OKLCH_MATRICES_GLSL` chunk is already authored and gate-verified (`procedural-color.glsl.ts:73-134`); aurora just needs to splice it and route palette-interp/broken-color/saturation through it.
- **Curl-noise flow** (Bridson 2007, cited) for divergence-free swirl that reads as fluid motion rather than the current `fbm`-angle hack (`flow.glsl.ts:21-23`).
- **Compute pre-pass architecture** (Maxime Heckel "Field Guide to TSL and WebGPU," cited) — field-bake texture once, sample many times, kills the gap-6 recompute.

## ADOPT for glass-ui aurora — AW wave-seeds

Each is a concrete, self-contained wave/fold. Ordered roughly by dependency.

- **AW.Wx — In-shader OKLCh color core (WebGL, no new substrate).** Splice the existing `OKLCH_MATRICES_GLSL` into `aurora.frag.ts`; move palette LUT interp (`composition.glsl.ts:16`), `brokenColorJitter` hue-shift (`aurora.frag.ts:276`), and `saturate3` (`:284`) into OKLCh. Headline visual win for zero new architecture — richer gradient midpoints, perceptually-even broken-color. Cheapest high-value fold; do first.

- **AW.Wx — `deriveAurora` → full "style facade" (simplified options).** A high-level config builder: `aurora({ seed, style, intensity, motion })` where `style ∈ smooth|watercolor|oil-pastel|van-gogh|impasto` expands to the ~30 atomic fields. Keeps the atomic surface for power users; adds the simplified entry the user asked for. Pure CPU/TS, no shader change.

- **AW.Wx — Field-bake refactor (perf; pre-WebGPU).** Even in WebGL2, hoist the single `domainWarp`+`nucleiField` result so `sampleBase` (`mediums.glsl.ts:17`) and `bestOil` (`brush.glsl.ts:220`) stop recomputing the field 40×/pixel. Lets oil mode run at full DPR. Unblocks richer brush passes within the existing single-pass budget.

- **AW.Wx — WebGPU branch + compute pre-pass (new substrate).** Wire a `requestAdapter` probe into `resolveRenderMode` (`renderMode.ts`) → `webgpu | webgl | css` tiers. Port the pipeline to WGSL. Add a compute pass that bakes the warped color field + its structure tensor to textures. This is the enabling wave for the next three; relaxes the single-pass invariant on the WebGPU branch only (sanctioned by `README.md:205`).

- **AW.Wx — Structure-tensor flow-guided brushwork (the van-gogh headline).** On the WebGPU branch, derive stroke orientation from the baked structure tensor instead of the global flow field. Add a true `van-gogh` medium with short, dense, directional strokes that hug color masses — depth via layered short strokes, variation via per-stroke hue/length/width jitter, congruent to real Van Gogh, zero subject matter. This is the user's stated centerpiece.

- **AW.Wx — Kubelka-Munk pigment compositing.** Replace `paintOver`'s linear `mix` (`brush.glsl.ts:182`) with GPU KM mixing (spectral.js port). Overlapping/crosshatched strokes stay luminous instead of muddying. Applies to oil + the new van-gogh + oil-pastel modes.

- **AW.Wx — Genuine oil-pastel medium (rework crayon).** Wire the stroke machinery (`brush.glsl.ts`) into the oil-pastel path: chunky directional waxy strokes with buildup ridges, color smearing, broken lift-off edges — instead of the current tooth-multiply (`mediums.glsl.ts:75`). Make it KM-aware. Delivers the "genuinely oil-pastel-redolent" ask.

- **AW.Wx — Anisotropic Kuwahara facet pass.** A WebGPU post/medium pass for the flat-patch palette-knife look — structure-tensor-oriented directional smoothing. A new `impasto`/`knife` mode that reads as real palette-knife flats with crisp edges, replacing the `bestOil` `mode==1` approximation (`mediums.glsl.ts:146`).

- **AW.Wx — Zones as a first-class atom.** Extend composition beyond Gaussian nuclei: add region/band/ridge primitives so "zones, noise, color" are independently authorable atoms (per-zone palette + per-zone medium + per-zone flow). Lifts the ceiling on "procedurally generated from atoms of control."

- **AW.Wx — Widen interactivity.** Beyond cursor-swirl: scroll-progress coupling (the `useScrollProgress` composable already exists), pointer-velocity → stroke energy, dwell → paint accumulation. Small seams on `domainWarp`/`flowField` cursor inputs + the runtime cursor model (`cursorModel.ts`).

### Key file:line anchors
- Assembler + warp + main: `constants/shaders/aurora.frag.ts:47, 206, 300`
- Nuclei softmax + palette LUT: `constants/shaders/composition.glsl.ts:9, 20`
- Flow dispatch: `constants/shaders/flow.glsl.ts:6`
- Brush SDF + grid placement: `constants/shaders/brush.glsl.ts:72, 155, 182, 188`
- Four mediums (crayon tooth-multiply at `:75`): `constants/shaders/mediums.glsl.ts:26, 50, 75, 124`
- ACES: `constants/shaders/tonemap.glsl.ts:6`
- Unused OKLCh + OETF chunk: `src/composables/glass/webgl/shaders/procedural-color.glsl.ts:46, 73`
- OKLCh derive + gamut map (CPU): `composables/color.ts:42, 152, 250`
- Config shape (~30 atoms): `constants/presets.ts:68`
- WebGL-only substrate (no WebGPU): `composables/runtime.ts:26`; `constants/renderMode.ts:31`
- Pre-planned WebGPU/Kuwahara seeds in prose only: `README.md:205, 274`; `DESIGN.md:36`

---

### Lane 30

Confirmed — the shared `OKLCH_MATRICES_GLSL` chunk (already used by the goo-blob) gives aurora a ready in-shader OKLCh path it doesn't yet splice (it bakes CPU-side). That's a concrete wave seed.

I have a complete and verified picture. Here is the brief.

---

# Aurora SOTA Research Brief — Lane `cb-options-presets`

Audit of the aurora option set / presets / config, plus the SOTA crosswalk for the user's goal (stunning gradient-art backdrops, genuine oil-pastel + van-gogh modes, derive-color, simplified options, OKLCh, WebGPU, interactive). Produced as tranche-research; no implementation.

## 1. Current state — what's actually there

### The config shape (`AuroraConfig`) is large: ~30 top-level fields
`src/components/custom/aurora/constants/presets.ts:68-106`. Grouped:
- **Composition** — `palette[]`, `nuclei[]`, `softmaxBeta`, `valueVariance` (4)
- **Warp** — `warpAmount`, `warpScale`, `warpDrift`, `warpMode`, `noiseOctaves` (5)
- **Medium** — `medium`, `flow{}`, `strokeAmount`, `strokeScale`, `strokeAnisotropy`, `strokeLayers`, `strokeMode`, `wetEdge`, `granulation`, `impasto`, `brokenColor`, `canvasGrain` (12)
- **Motion** — `nucleiDrift`, `paletteDrift`, `breathDepth`, `breathPeriod` (4)
- **Output** — `saturation`, `paperGrain`, `alpha` (3)

`AuroraNucleus` itself carries 8 fields (`presets.ts:22-46`); `AuroraFlow` carries 5 (`presets.ts:57-66`).

### The configurator surface exposes nearly all of it
Six tabs (`demo/stories/aurora/config/options.ts:52-61`): Medium, Palette, Flow, Texture, Comp, Nuclei. The slider count is the tell:
- TextureLayer — **9 sliders** (`config/TextureLayer.vue`): strokeAmount, strokeScale, anisotropy, impasto, brokenColor, canvasGrain, wetEdge, granulation, paperGrain.
- CompositionLayer — **9 sliders + 1 tab** (`config/CompositionLayer.vue`): warpAmount/scale/drift, softmaxBeta, saturation, valueVariance, nucleiDrift, paletteDrift, breathDepth, breathPeriod.
- NucleiLayer — **8 sliders per nucleus** × up to 6 (`config/NucleiLayer.vue`).

This is a control surface for an *author tuning a shader*, not a *consumer choosing a backdrop*. Many knobs are medium-specific dead weight in the wrong mode (e.g. `wetEdge`/`granulation` only do anything under `watercolor`; `impasto`/`brokenColor` only under `oil`; `strokeMode`/`strokeLayers` are already conditionally hidden when `medium !== "oil"` — `MediumLayer.vue:20`).

### The derive-color variant already exists (partially)
`deriveAurora(seed, {stopCount, harmony, lightnessSpread, chromaFalloff, hueSpread})` is shipped and wired (`composables/color.ts:152-200`, `index.ts:31-34`, PaletteLayer "Derive from color" panel `config/PaletteLayer.vue:32-76`). Harmonies: `analogous` (default), `complementary`, `triad`, `monochrome`. It only derives the **palette**, not nuclei/medium/flow. It composes value.js's Ottosson core and gamut-maps every stop (`gamutMapStop`, `color.ts:250-262`). This is the seed of the user's "derive-color variant" — it needs *extension*, not invention.

### The "wispy-sky default" exists and should stay
`DEFAULT_AURORA_CONFIG` (`presets.ts:148-184`) is a 3-stop blue, `medium:"smooth"`, soft drift — the wispy sky. `OPENAI_SKY` (`demo/.../presets.ts:25-47`) is the richer 4-nuclei version. Keep both as the canonical default.

### 12 presets, all in the consumer (correct per "presets in consumers")
`demo/stories/aurora/presets.ts`: Sky, Dawn, Meadow, Deliberative, Day9, Oil Impasto, Oil Gestural, Oil Van Gogh, Crayon Sunset/Rainbow/Ocean, Speedtest.

### The painterly modes today (the gap vs. the goal)
- **Oil** — 4 stroke-layer curved-spine SDF brushwork with impasto rim-light + broken color (`mediums.glsl.ts:124-232`, `brush.glsl.ts`). Genuinely stroke-based, "best-of-9-neighbor" placement (`bestOil`), per-cell jitter/curl. This is the strongest existing painterly path.
- **Crayon/oil-pastel** — *not* strokes: anisotropic tooth-noise multiply into base color (`mediumCrayon`, `mediums.glsl.ts:75-122`). The user wants this "genuinely painterly/oil-pastel-redolent" — the current model is a texture multiply, not pigment-on-tooth deposition. Gap.
- **Van Gogh** — today is just `OIL_VANGOGH` = oil medium + `flow.pattern:"swirl"` + high curl (`demo/.../presets.ts:257-293`). The stroke *direction* comes from a hand-set swirl flow, **not** from the color field's own structure. The user wants "proper atomic brushstrokes congruent to real van gogh" — that requires structure-tensor-guided flow, which the shader does not have. The README itself names this gap (`README.md:275`: "The planned structure-tensor flow in the AW seeds derives direction from the color field's own gradient, so strokes hug the zones").

### WebGPU status — stub only
No WebGPU path for aurora. A WGSL glass shader exists for a different surface (`src/composables/glass/webgpu/glassShader.wgsl`). The README explicitly defers WebGPU to "the AW wave seeds" for "structure-tensor / Kuwahara passes" (`README.md:204-206`). Aurora is single-pass WebGL2, which structurally **cannot** do the multi-pass structure-tensor → line-integral-convolution → Kuwahara pipeline the SOTA painterly look needs.

### One asset already in hand for OKLCh-in-shader
The shared `procedural-color.glsl` chunk already exports `OKLCH_MATRICES_GLSL` (the four Ottosson `mat3` + space fns; `procedural-color.glsl.ts:73`+), and the goo-blob already splices it. Aurora currently bakes its palette CPU-side in linear (`color.ts:42-64`, `aurora.frag.ts:26`) and does **not** splice these. So in-shader OKLCh interpolation is a ready, low-cost adoption — the matrices are already written and verified.

## 2. SOTA techniques (verified, with what each buys)

**A. Mesh-gradient lineage (Stripe/OpenAI/Linear "ethereal glow").** The flowing look is layered fBm/simplex octaves (lacunarity+persistence) + a sinusoidal *mesh warp* of the UV + in-shader **blend modes** (multiply/screen/overlay) so colors *interact* rather than overlay. Aurora has the fBm + domain-warp half (`aurora.frag.ts:206-247`) but composites palette stops by `mix()` only — it has no blend-mode interaction layer, which is part of why mesh gradients read "vibrant" where aurora reads "soft." [Stripe gradient teardown / Bram.us; Alex Harri deconstruction]

**B. Anisotropic Kuwahara via structure tensor (Kyprianidis & Kang 2009).** The canonical real-time painterly NPR: smooth the **structure tensor** of the image to get a per-pixel orientation+anisotropy, then run a Kuwahara filter whose elliptical kernel is squeezed/rotated along that orientation. Output "has the clearness of cartoon illustration but the directional information of oil paintings" — i.e. it *flattens into directional painterly facets that follow the image's own features*. This is THE technique for "ultra-high-fidelity brushwork." Needs ≥2 passes (tensor pass, filter pass) → WebGPU/FBO. [Kyprianidis CGF 2009; Maxime Heckel painterly shaders]

**C. Kubelka-Munk spectral pigment mixing (spectral.js).** Models paint as absorption(K)/scattering(S) over a spectral reflectance curve, so blue+yellow→green (not gray) like real pigment. Ships `spectral.glsl` for the GPU. This is what makes oil/oil-pastel modes read as *real paint* rather than RGB lerp. The library already depends on value.js for OKLCh; KM mixing is the orthogonal upgrade for the *medium*, not the palette. [spectral.js / spectraljs.com; CoolerSpace arXiv:2409.02771]

**D. Flow-guided van-gogh strokes ("Thinking Like Van Gogh," arXiv:2601.10075).** Van Gogh's brushwork encodes a **2D directional flow field** that follows scene structure ("exaggeration in the essential"). The method extracts that flow field and combs strokes to align with it. The web translation: derive the stroke flow from the **structure tensor of the color field** (same tensor as B), so strokes curve *with* the zones — which is exactly the README's stated gap. Pair with luminance/structure decoupling (deform geometry, keep color stable). [arXiv:2601.10075]

**E. WebGPU + TSL multi-pass.** TSL authors shaders as JS node compositions compiling to both WGSL and GLSL, with first-class **compute shaders, storage buffers, and post-process passes** — the right substrate for the tensor→LIC→Kuwahara chain. Gives a clean WebGL2-fallback story (TSL emits GLSL too). [Maxime Heckel Field Guide to TSL; threejsroadmap WebGPU compute]

## 3. The simplified option set (proposal)

Two-tier "atoms of control" model. Tier 1 is the consumer-facing surface (≤7 knobs); Tier 2 is the full author surface, gated behind an "Advanced" disclosure. Nothing is removed from `AuroraConfig` — the simplification is in the *presented* surface and in *derived* defaults.

**Tier 1 — the atoms (consumer surface):**
1. **Seed color** (one OKLCh/hex) → drives `deriveAurora`.
2. **Harmony** (analogous · complementary · triad · split-comp · mono) → palette shape.
3. **Mood / energy** (calm ↔ vivid) → one slider mapping to `saturation` + `warpAmount` + `valueVariance` + breath together.
4. **Medium** (smooth · watercolor · pastel · oil · van-gogh) — promote van-gogh to a top-level medium, not an oil sub-mode + hand-set swirl.
5. **Texture amount** (0..1) → one slider mapping to the medium's dominant texture knob (`strokeAmount`/`wetEdge`/`canvasGrain` per medium).
6. **Motion** (still · breathing · drifting) → presets for the 4 motion fields.
7. **Zones** (2–6) → nuclei count; positions auto-arranged, hand-tunable in Advanced.

**Tier 2 — Advanced (unchanged full surface):** the current 6 tabs. The point is they're collapsed by default.

This collapses ~30 author fields → 7 consumer atoms while preserving the full shader. The mapping layer is a pure function (`resolveAtoms(atoms): AuroraConfig`) — testable, no shader change.

## 4. ADOPT for glass-ui aurora / wave-seed list

Each is a concrete AW (aurora) wave/fold idea. Ordered roughly by leverage and independence.

- **AW-W·atoms — Simplified atom surface + `resolveAtoms()`.** Add a `resolveAtoms(atoms) → AuroraConfig` pure mapper (Tier-1 → full config) and a collapsed "Advanced" disclosure on the configurator. Keep `AuroraConfig` whole; ship the 7-atom surface as the default consumer door. No shader change. (Library: the mapper + types; demo: the disclosure.)

- **AW-W·derive+ — Extend `deriveAurora` to the whole scene.** Today derives palette only. Add `harmony: "split-complementary" | "tetradic"` and a `temperature` axis (warm/cool bias) — the README already names these as planned (`README.md:166-168`). Add an optional `deriveScene(seed, mood)` that also arranges nuclei + picks a motion preset, so "one seed → a full stunning backdrop" is one call. Composes the existing value.js core; no new color math.

- **AW-W·vangogh — Van Gogh as a first-class medium with structure-tensor flow.** Promote van-gogh out of "oil + swirl preset" into `medium: "vangogh"` whose stroke direction is the **structure tensor of the color field** (not a hand-set `flow.pattern`). This closes the README-stated gap (`README.md:275`) and is the path to "atomic brushstrokes congruent to real van gogh." Atomic short directional strokes seeded per-cell (reuse `bestOil`'s placement, `brush.glsl.ts:188`) but oriented by the tensor. Needs the tensor pass (see WebGPU seed) or a cheap single-pass gradient-of-luma approximation as a WebGL2 fallback. Subject-matter-free by construction (it's a gradient field, not an image). [arXiv:2601.10075]

- **AW-W·kuwahara — Anisotropic-Kuwahara painterly facet pass.** Add the Kyprianidis-Kang anisotropic Kuwahara as an optional post pass driven by the structure tensor — flattens the field into directional painterly facets that hug the zones. This is the single biggest "ultra-high-fidelity brushwork" lever. Multi-pass → ships on the WebGPU branch; degrades to no-op on WebGL2. [Kyprianidis CGF 2009]

- **AW-W·pigment — Kubelka-Munk spectral mixing for oil/pastel mediums.** Replace the RGB `mix()` in the oil/crayon medium compositing with KM spectral mixing (spectral.js `spectral.glsl`) so overlapping strokes mix like real pigment (blue+yellow→green). Makes the oil-pastel mode "genuinely painterly." Scope to the painterly mediums only — smooth/atmospheric stays linear-sRGB for cost. [spectral.js]

- **AW-W·oklch-shader — In-shader OKLCh palette interpolation.** Splice the already-shipped `OKLCH_MATRICES_GLSL` (`procedural-color.glsl.ts:73`) so palette stops interpolate in OKLab/OKLCh *in the shader* (perceptually-even ramps, no muddy midpoints) instead of the current CPU-baked linear-sRGB `mix()` (`samplePalette`, `composition.glsl.ts:9-17`). The matrices are written and goo-blob-proven — this is low-cost and delivers the "full OKLCh" ask directly. Watch the `proof:aurora-space-gamma` seam.

- **AW-W·meshblend — Blend-mode interaction layer (mesh-gradient vibrancy).** Add an optional screen/overlay interaction between nuclei contributions (not just softmax `mix`) so the smooth/atmospheric pole reads as vibrant as Stripe/OpenAI mesh gradients rather than soft-muddy. One uniform-selected blend op in `nucleiField`/`samplePalette`. [Stripe teardown; Alex Harri]

- **AW-W·webgpu — WebGPU/TSL substrate + WebGL2 fallback.** Stand up the WebGPU path (TSL → WGSL, GLSL fallback) that the README already promises (`README.md:204-206`). This is the *enabling* wave for AW·kuwahara and the tensor-flow half of AW·vangogh — both need ≥2 passes / compute. TSL gives the dual-target emit so the single-pass WebGL2 aurora stays the fallback. Gate behind `resolveRenderMode` extension (`webgl | webgpu | css`). [Maxime Heckel TSL Field Guide]

- **AW-W·oilpastel — True oil-pastel deposition for crayon.** The current `mediumCrayon` (`mediums.glsl.ts:75-122`) is a tooth-noise *multiply*. Upgrade to pigment-on-tooth *deposition*: stroke-direction smearing of pigment into tooth valleys + waxy buildup on peaks + KM mixing (AW·pigment) where strokes cross. This is what makes oil-pastel read as wax pigment, not a texture filter.

- **AW-W·interactive — Richer dynamic/interactive seam.** Cursor today swirls warp+flow (`flow.glsl.ts:34-49`, `aurora.frag.ts:229-244`). Extend to: scroll-driven palette/breath progress (reuse the `useScrollProgress` motion composable), an audio/intensity input uniform, and a "paint a stroke" mode where the pointer deposits a transient stroke that decays — turning the backdrop into a live canvas. Keep all easing JS-side per the existing breath-paced contract.

### Sequencing note
AW·atoms, AW·derive+, AW·oklch-shader, AW·meshblend are **independent and WebGL2-shippable now** (no new substrate). AW·webgpu is the hinge wave that unblocks AW·kuwahara and the high-fidelity half of AW·vangogh. AW·pigment and AW·oilpastel can land single-pass (KM mixing is per-fragment) but pair best with the tensor flow. The wispy-sky default (`DEFAULT_AURORA_CONFIG` / `OPENAI_SKY`) is preserved across all of them — it's the `medium:"smooth"` atmospheric pole that every wave leaves untouched.

## Key files (absolute paths)
- Config shape + default: `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/presets.ts`
- Derive-color core: `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/composables/color.ts`
- Shader assembler + uniforms: `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts`
- Painterly mediums + brush: `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/mediums.glsl.ts`, `.../brush.glsl.ts`
- Composition/flow: `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/constants/shaders/composition.glsl.ts`, `.../flow.glsl.ts`
- Shared OKLCh-in-shader matrices (ready to splice): `/Users/mkbabb/Programming/glass-ui/src/composables/glass/webgl/shaders/procedural-color.glsl.ts`
- Configurator surface: `/Users/mkbabb/Programming/glass-ui/demo/stories/aurora/config/` (options.ts, MediumLayer/TextureLayer/CompositionLayer/PaletteLayer/FlowLayer/NucleiLayer .vue), `/Users/mkbabb/Programming/glass-ui/demo/stories/aurora/AuroraConfigDock.vue`
- Consumer presets: `/Users/mkbabb/Programming/glass-ui/demo/stories/aurora/presets.ts`
- Design + consumer docs (existing SOTA crosswalk + "AW wave seeds" references): `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/DESIGN.md`, `.../README.md`

Sources: [Kyprianidis & Kang, Anisotropic Kuwahara, CGF 2009](https://www.umsl.edu/~kangh/Papers/kang_cgf09.pdf) · [Maxime Heckel, On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) · [Stripe gradient teardown, Bram.us](https://www.bram.us/2021/10/13/how-to-create-the-stripe-website-gradient-effect/) · [Alex Harri, WebGL gradients deconstructed](https://alexharri.com/blog/webgl-gradients) · [spectral.js — Kubelka-Munk on the GPU](https://spectraljs.com/) · [Thinking Like Van Gogh, arXiv:2601.10075](https://arxiv.org/abs/2601.10075) · [Maxime Heckel, Field Guide to TSL and WebGPU](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/) · [CoolerSpace, arXiv:2409.02771](https://arxiv.org/pdf/2409.02771)

---

### Lane 31

I have the full pipeline. The codebase is sophisticated. The README already names the AW seeds (structure-tensor flow, Kuwahara, WebGPU, spectral.js/Kubelka-Munk, Van Gogh flow-guided). My brief should ground these against the actual code, cite file:line, and characterize the OKLCh-vs-sRGB split precisely.

Key finding I need to nail: the palette is baked to linear sRGB **CPU-side** (`oklchToLinear` at color/index.ts:50), so all in-shader interpolation (`samplePalette` mix at composition.glsl.ts:16) happens in **linear sRGB, not OKLCh**. That's the central gap. Let me verify there's no in-shader OKLCh path and confirm the brokenColorJitter/hueShift uses the YIQ-style sRGB matrix (not OKLCh).

This is confirmed in the code I've read: `hueShift` (aurora.frag.ts:257) is a YIQ-style sRGB rotation matrix; `samplePalette` mixes linear-sRGB triples; `OKLCH_MATRICES_GLSL` exists in the shared chunk but aurora explicitly does NOT splice it (procedural-color.glsl.ts:71-72 comment, confirmed by aurora.frag.ts:29-32 only importing FBM_ROT + OETF).

I have everything needed. Writing the brief.

# Aurora color-pipeline audit + AW wave-seed brief — Lane `cb-color-pipeline`

## 1. Where OKLCh ends and sRGB begins (the exact seam)

The aurora's color pipeline is **OKLCh at authoring/CPU, but linear-sRGB everywhere on the GPU.** OKLCh never reaches the shader. The hand-off is a single CPU bake.

**OKLCh territory (CPU/JS, value.js-backed):**
- `OklchStop {L,C,h}` is the authoring atom — `src/composables/color/index.ts:28`. Palettes are `OklchStop[]` (`presets.ts:70`).
- All CPU color math routes through value.js's Ottosson core, single-sourced in the `/color` leaf: `cssToOklch` (`color/index.ts:79`), `oklchToLinear` (`color/index.ts:50`), `oklchStopToHex` (`color/index.ts:88`), `oklchToGammaRgb` (`color/index.ts:64`).
- `deriveAurora` — the one-color→palette seam — is fully OKLCh: L-ramp + chroma-falloff + per-harmony hue walk, every stop gamut-mapped through value.js `gamutMapOKLab` (`aurora/composables/color.ts:152-200`, `gamutMapStop` at `:250-262`). This is genuinely good and the right foundation.

**The bake (the seam):** `flattenPalette` (`aurora/composables/color.ts:42-64`) calls `oklchToLinear` per stop (`:53`) → packs `MAX_STOPS × 3` linear-sRGB floats → `uniformBridge.ts:122-123` uploads them as `uPalette[8]`. **After this line OKLCh is gone.**

**sRGB territory (GPU, all of it):**
- `samplePalette` interpolates between stops with a plain `mix()` of **linear-sRGB triples** (`composition.glsl.ts:9-17`). Stop-to-stop gradients are therefore linear-RGB lerps, not OKLCh — the exact thing Stripe/OpenAI mesh gradients avoid because linear-RGB ramps go grey/muddy through the midpoint (blue→yellow passes through dishwater, not a clean arc).
- `hueShift` (`aurora.frag.ts:257-274`) is a **YIQ-ish luma-rotation matrix in sRGB**, not an OKLCh hue rotate. `brokenColorJitter` (`:276-282`) drives broken-color via this sRGB hueShift + a naive `valueMul`. Van-Gogh broken-color is currently sRGB hue-spin.
- `saturate3` (`:284-287`) is luma-lerp saturation in sRGB. `valueMod`/`breath`/medium darkening are all `col *= scalar` multiplies in linear-sRGB.
- The shared chunk *ships* the full Ottosson OKLab/OKLCh `mat3` set as GLSL (`procedural-color.glsl.ts:73-134`, `OKLCH_MATRICES_GLSL`) — but **aurora deliberately does not splice it** (`procedural-color.glsl.ts:71-72`; aurora imports only `FBM_ROT_GLSL` + `OETF_GLSL` at `aurora.frag.ts:29-32`). The goo-blob already perturbs in OKLCh in-shader; aurora has no in-shader OKLCh path.

**Linear/gamma plumbing is correct and locked.** Palette baked linear → ACES in linear (`tonemap.glsl.ts`) → mandatory `linearToSrgb` OETF before `fragColor` (`aurora.frag.ts:339`) → 1-LSB IGN dither in display space (`:343`). The OETF is single-sourced (`procedural-color.glsl.ts:46-59`) and gated by `proof:aurora-space-gamma`. **Don't touch this; the gap is purely that interpolation/hue/sat happen in linear-sRGB instead of OKLCh.**

**Scorecard:** authoring + derive + gamut-map = ~100% OKLCh. GPU interpolation, hue, saturation, broken-color = 0% OKLCh (all linear-sRGB). The single highest-leverage change is moving stop interpolation (and hue/sat ops) into OKLCh in-shader — the matrices are already written and validated to 1e-6.

## 2. Current technique inventory (what's already strong)

- **Composition:** multi-nuclei softmax-Gaussian attractors, anisotropic (elongation+angle) ellipses (`composition.glsl.ts:20-59`). Quilez double domain-warp + cellular/hybrid (`aurora.frag.ts:206-247`). This is solid mesh-gradient substrate.
- **Mediums (4 peers):** pastel (anisotropic fBm tooth), watercolor (luma-gradient wet-edge + granulation + wash band), oil (4-layer curved-spine brush SDF), crayon (anisotropic tooth-multiply). `mediums.glsl.ts`.
- **Brush:** curved-spine swept-stroke SDF with quadratic bulge, bristle-ragged edges, end-cap blobs, impasto rim-light, fwidth AA, best-of-9-neighbor cell placement (`brush.glsl.ts`). Genuinely advanced — this is the van-gogh substrate.
- **Flow:** radial/swirl/diagonal/multi + curl-noise + cursor swirl (`flow.glsl.ts`). **But flow is hand-authored direction, not derived from the image** — strokes don't hug the color zones.
- **Interaction:** JS-eased cursor enters both `domainWarp` (color swirl) and `flowField` (stroke bend). Good.

## 3. SOTA techniques to adopt (grounded against the code)

1. **OKLCh in-shader interpolation.** Replace the linear-sRGB `mix()` in `samplePalette` with OKLab/OKLCh interpolation. Aras Pranckevičius ("Optimizing Oklab gradients") shows you can interpolate in OKLab cheaply (the cube-root LMS is the only cost) and get clean, chroma-preserving ramps. The matrices already exist in `OKLCH_MATRICES_GLSL`. Hue interpolation must take the shorter arc (`interpolateHue` exists in value.js).

2. **Structure-tensor flow (the van-Gogh headline).** Real Van Gogh brushwork follows the *image's own gradient field* — strokes hug luminance contours and swirl around features. Kyprianidis-Kang anisotropic-Kuwahara (already in the references) computes a smoothed structure tensor whose eigenvectors give local orientation + anisotropy. Feeding that into `bestOil`'s `flow` arg makes strokes congruent to the field rather than a global pattern. This is exactly "atomic brushstrokes congruent to real Van Gogh, no subject matter."

3. **Kubelka-Munk / spectral pigment mixing** (spectral.js, in refs). Currently mediums *multiply* color (`col *= lay`), which darkens toward grey when two pigments overlap. Real oil/oil-pastel mixes subtractively in a spectral/KM space — blue+yellow→green, not grey. This is the difference between "looks like a multiply filter" and "looks like wet pigment." Adopt for oil + watercolor overlap.

4. **OKLCh-space broken color.** Replace the sRGB YIQ `hueShift` jitter (`brokenColorJitter`) with an OKLCh `h`-jitter + `C`-jitter at fixed `L`. Broken color is *hue* variation at constant value — OKLCh is the only space where that's perceptually true. This is the single change that makes oil-pastel mode read painterly instead of noisy.

5. **Per-stroke pigment tinting in OKLCh.** `bestOil` samples one `colAtMid` per stroke (`brush.glsl.ts:219`). Perturb each stroke's pigment in OKLCh (small ΔL, Δh, ΔC seeded per-cell) so adjacent strokes carry visibly distinct-but-harmonious pigment loads — the hallmark of impasto. Cheap; just reuses the matrices.

6. **WebGPU compute branch for the multi-pass NPR.** Structure-tensor + Kuwahara want a separable blur pass (read neighborhood), which the current single-triangle one-pass forbids (`README.md:204-206` already flags this). WebGPU (`navigator.gpu`, WGSL — a `glassShader.wgsl` already exists in the repo) gives storage textures + compute for the tensor smoothing pass while keeping WebGL2 as the fallback. The `useWebGLCanvas` substrate is the natural place to add a `useWebGPUCanvas` sibling.

7. **Simplified "atoms of control" config.** Current `AuroraConfig` has ~35 fields (`presets.ts:68-106`) — too many. The goal "atoms of control: zones, noise, color" maps to: **zones** (nuclei), **noise** (warp+octaves), **color** (palette/derive), **medium** (one enum + intensity). A `deriveAuroraScene(seed, mood)` that produces the whole config from 2-3 inputs is the user-facing simplification, layered over the full schema.

8. **Native OKLCh CSS placeholder.** `paletteToCssGradient` (`color.ts:80-89`) bakes stops to gamma hex and emits `linear-gradient(135deg, ...)` — an sRGB-interpolated gradient. Modern browsers support `linear-gradient(in oklch, ...)`; emitting that makes the first-paint placeholder match the (newly OKLCh) shader interpolation instead of approximating it in sRGB.

## 4. ADOPT for glass-ui aurora — AW wave seeds

Each is a concrete, independently-landable wave. Ordered by leverage.

- **AW.W1 — OKLCh in-shader palette interpolation.** Splice `OKLCH_MATRICES_GLSL` into `aurora.frag.ts`; rewrite `samplePalette` (`composition.glsl.ts:9-17`) to lerp in OKLab (shorter-arc hue). Keep the linear bake for the LUT *endpoints*; interpolate perceptually between them. Headline fidelity win, matrices already validated to 1e-6. Gate: extend `proof:aurora-space-gamma` with an interpolation-midpoint chroma assertion.

- **AW.W2 — OKLCh broken-color + per-stroke pigment.** Replace `brokenColorJitter`/`hueShift` (`aurora.frag.ts:257-282`) with an OKLCh h/C jitter at fixed L. Add per-cell OKLCh pigment perturbation to `bestOil`'s `colAtMid` (`brush.glsl.ts:219`). Makes oil-pastel + Van Gogh modes genuinely painterly. Depends on W1's matrix splice.

- **AW.W3 — Structure-tensor flow (Van Gogh brushstroke alignment).** Derive `flowField` direction from the smoothed structure tensor of the color field (eigenvector), with `anisotropy` scaling stroke elongation in `bestOil`. New `strokeMode: "vangogh"` or `flow.pattern: "structure"`. This is the "atomic brushstrokes congruent to real Van Gogh" deliverable. Single-pass approximation possible in WebGL2 (sample a small neighborhood); full quality wants W6.

- **AW.W4 — Spectral/Kubelka-Munk pigment overlap.** Port spectral.js KM mixing for the oil + watercolor medium overlap (replace the `col *= lay` multiplies in `mediums.glsl.ts`). Blue+yellow→green pigment mixing. Gate it behind a `pigmentMix: "linear" | "spectral"` config atom so the cheap path stays default.

- **AW.W5 — `deriveAuroraScene` (atoms of control).** A `(seed: string|OklchStop, mood: "atmospheric"|"painterly"|"vangogh"|"oil-pastel") → AuroraConfig` generator over the existing `deriveAurora` palette seam — produces nuclei layout + noise + medium from 2 inputs. The user-facing "simplified options." Layers over, doesn't replace, the full schema. Pure CPU/OKLCh; no shader change.

- **AW.W6 — WebGPU branch + multi-pass NPR.** `useWebGPUCanvas` sibling to `useWebGLCanvas`, WGSL transpile of the fragment pipeline, plus the compute passes (structure-tensor smoothing, anisotropic Kuwahara) the single-triangle WebGL2 path can't do. WebGL2 stays the fallback. Unlocks ultra-high-fidelity brushwork (W3 at full quality) + Kuwahara abstraction. Largest wave — branch-gated, capability-detected via `navigator.gpu`.

- **AW.W7 — OKLCh CSS placeholder + dynamic/interactive polish.** Emit `linear-gradient(in oklch, ...)` from `paletteToCssGradient` (`color.ts:80`) so the first-paint placeholder matches the OKLCh shader. Fold in richer cursor interaction (the existing JS-eased cursor is good; extend to multi-touch / scroll-coupled drift) for the "dynamic/interactive" goal.

**Sequencing:** W1→W2 (color-space foundation, ship first — biggest visible win for least code). W5 in parallel (CPU-only). W3→W4 (painterly depth). W6 last (infra). W7 polish throughout.

**Non-negotiables to preserve:** the linear-light render + mandatory OETF + IGN dither (`proof:aurora-space-gamma`); value.js as the single color-math source (`proof:single-color-core`); presets-in-consumers; the offscreen-park machinery. Every wave adds OKLCh *on top of* the existing correct linear plumbing — none of it rips out the gamma seam.

---

### Lane 32

I now have everything needed. The current aurora derives stroke direction from a *procedural flow field* (radial/swirl/diagonal/curl-noise) — not from the underlying color field's own structure. The SOTA painterly path (Kuwahara + structure tensor) derives stroke direction from the *gradient of the rendered image itself*, which is exactly what gives real Van Gogh congruence. That's the key technique gap. Let me compile the brief.

# Aurora SOTA Brief — WebGL2 → WebGPU path, painterly fidelity, and the AW wave seeds

Lane `cb-substrate-webgpu`. Read-only codebase audit + SOTA crosswalk. No implementation.

## 1. What's actually in the tree right now

**Substrate.** `useWebGLCanvas.ts` (`createWebGLCanvas`, line 120) is a clean, consumer-agnostic WebGL2 lifecycle: context create + `webglcontextlost`/`restored` self-heal (`buildContext` 266, `onContextRestored` 260), a three-reason suspend `Set` (`isRunning` 133), offscreen-park via `contentvisibilityautostatechange` (228) + tab-visibility (206), live `prefers-reduced-motion` monitor (147–183), and a `ResizeObserver` (272). It is hard-coded to WebGL2 in exactly one place — `canvas.getContext("webgl2", …)` at **line 267**. Everything else is API-shaped, not GL-shaped. The consumer seam is the `WebGLCanvasFrame` hooks (`frame`/`shouldContinue`/`resize`/`time`/`teardown`, 64–76) returned by `setup(gl)`.

**Aurora runtime.** `runtime.ts` `createAurora` (117) composes four seams over the substrate: `glSetup.ts` (compile/link + full-screen triangle + uniform cache), `uniformBridge.ts` (config→uniform dispatch, 93), `cursorModel.ts`, `frameLoop.ts` (single `drawArrays(TRIANGLES, 0, 3)`, frameLoop.ts:45). One full-screen triangle, one fragment program, ~43 uniforms (`UNIFORM_NAMES`, glSetup.ts:19–64).

**The shader.** `aurora.frag.ts` assembles GLSL partials: `composition.glsl` (palette LUT + softmax-Gaussian nuclei field), `flow.glsl` (radial/swirl/diagonal/multi/curl flow field), `brush.glsl` (curved swept-stroke SDF + best-of-9 cell placement), `mediums.glsl` (watercolor/pastel/crayon/oil peers), `tonemap.glsl` (ACES). Color is OKLCh **CPU-side** — `color.ts` bakes the palette to linear-sRGB via value.js Ottosson primitives (`oklchToLinear`, `flattenPalette` color.ts:42), and `deriveAurora` (color.ts:152) already exists: a one-seed→N-stop harmonious gamut-mapped palette generator (analogous/complementary/triad/monochrome). The shader itself has **no in-shader OKLCh** — `OKLCH_MATRICES_GLSL` exists in the shared chunk (`procedural-color.glsl.ts:73`) but aurora does **not** splice it (only `OETF_GLSL` + `FBM_ROT_GLSL`, aurora.frag.ts:162/180).

**WebGPU today: zero aurora wiring.** `src/composables/glass/webgpu/glassShader.wgsl` exists but is the **glass-panel refraction** shader (background blur/caustics/fresnel), not aurora, and a repo-wide grep for `webgpu|navigator.gpu|requestAdapter|wgsl` consumers returns **nothing** — it's a spec-only orphan with no runtime, no `requestAdapter`, no pipeline. So WebGPU is greenfield for this library. (`renderMode.ts` `AuroraRenderMode` is `"webgl" | "css" | "auto"` — no `"webgpu"` tier exists.)

## 2. SOTA findings (with citations)

**WebGPU is Baseline as of January 2026** — Chrome/Edge (113+), Safari 26 (iOS/macOS Tahoe, Sept 2025), Firefox 147 (Jan 13 2026). It is no longer speculative; ~65–70% of new web apps use it, and Three.js (r171+) / Babylon.js ship WebGPU-primary with **automatic WebGL2 fallback as the reference pattern**. The production recipe is *WebGPU primary, WebGL2 fallback for the ~5–10% tail* ([web.dev](https://web.dev/blog/webgpu-supported-major-browsers), [vr.org](https://vr.org/articles/webgpu-baseline-2026-three-js-webxr-default), [byteiota](https://byteiota.com/webgpu-2026-70-browser-support-15x-performance-gains/)).

**The single biggest painterly-fidelity gap: stroke direction is procedural, not image-derived.** Current aurora orients strokes off `flowField` — a hand-authored radial/swirl/diagonal pattern (flow.glsl.ts:6). The NPR SOTA — anisotropic Kuwahara + **structure tensor** (Kyprianidis/Kang 2009) — derives the stroke/smoothing direction from the **gradient of the rendered color field itself** via Sobel → 2×2 structure tensor (Jxx=Sx², Jyy=Sy², Jxy=Sx·Sy) → eigenvectors, then squeezes an elliptical kernel along the dominant local feature ([Kyprianidis CGF09 PDF](https://www.umsl.edu/~kangh/Papers/kang_cgf09.pdf), [diglib.eg.org](https://diglib.eg.org/items/4cdcfa3c-afe3-4fd8-acaf-dbccce2ff216)). This is exactly the difference between strokes that *lie on top of* the gradient and strokes that *follow* it — the latter is what reads as genuine Van Gogh. Maxime Heckel's painterly pipeline (already a DESIGN.md reference) is the concrete multi-pass form: **Pass 1** structure tensor → **Pass 2** flow-guided anisotropic Kuwahara (8-sector circular kernel, polynomial weights) → **Pass 3** tonemap ([blog.maximeheckel.com](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/)).

**Van Gogh congruence specifically** comes from coherent curved vector fields over the whole canvas + impasto height→normal lighting. The literature (Sharma TAMU thesis; the "Hidden Turbulence in Starry Night" arXiv) ties the look to turbulent/curl vector fields and displacement-as-normal impasto ([core.ac.uk thesis](https://core.ac.uk/download/pdf/147237812.pdf), [arXiv 2310.03415](https://arxiv.org/pdf/2310.03415)). Aurora has the ingredients (curl in flow.glsl, `impasto` rim in brush.glsl:173) but no global coherent stroke field and no height-field→normal lighting pass — impasto is a faked rim, not lit geometry.

**Multi-pass is the unlock and it's the WebGPU-shaped reason to migrate.** The single-pass full-screen-triangle architecture (DESIGN.md invariant 8, "single draw, single shader, no multi-pass") is the *exact constraint* that blocks structure-tensor flow guidance — you cannot read the rendered image's gradient in the same pass that produces it. WebGPU compute shaders make the structure-tensor pass + a particle/instanced-stroke pass natural (full read/write, no CPU round-trip), which fragment-only WebGL2 fakes awkwardly ([threejsroadmap compute](https://threejsroadmap.com/blog/introduction-to-webgpu-compute-shaders), [toji.dev](https://toji.dev/webgpu-best-practices/compute-vertex-data.html)).

**OKLCh mesh-gradient SOTA** (gradients.fyi, palettt, Blue Monkey) all interpolate **in OKLCh, in-shader**, with per-point radiating color fields + noise + progressive blur — beating sRGB/HSL banding and muddy midpoints ([gradients.fyi](https://gradients.fyi/), [bluemonkeymakes](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients)). Aurora interpolates its LUT in *linear-sRGB* (composition.glsl.ts:16 `mix(uPalette[i0], uPalette[i1])`), which is better than sRGB but **not** perceptually uniform — the in-shader OKLCh `mix` is the upgrade, and the matrices are already sitting unused in `OKLCH_MATRICES_GLSL`.

## 3. Migration shape: can WebGL2 and WebGPU coexist? Yes — cleanly.

The substrate is already the right seam. Three concrete facts make this low-risk:

1. **One backend-specific line.** `useWebGLCanvas.ts:267` is the only `getContext("webgl2")`. The whole lifecycle (suspend set, offscreen-park, PRM monitor, resize, dispose) is backend-agnostic — it would lift verbatim into a `createGPUCanvas` sibling.
2. **The consumer seam is hooks, not GL.** `setup(gl) → {frame, shouldContinue, resize, time, teardown}` is already device-shaped. A WebGPU variant returns the same hook shape over a `GPUDevice`/`GPUCanvasContext`. `runtime.ts` composes seams (glSetup/uniformBridge/frameLoop) that would each get a `*.wgsl`/`GPUBuffer` twin; the *config→uniform* logic in `uniformBridge.ts` is pure data marshalling that ports to a `writeBuffer` of a std140-aligned struct.
3. **Coexistence pattern = the Three.js model.** `resolveRenderMode` (renderMode.ts:31) already does mount-time tiering (`webgl`/`css`/`auto`). Add `"webgpu"`: `auto` → probe `navigator.gpu.requestAdapter()` → WebGPU if present, else WebGL2, else CSS placeholder. The CSS placeholder (`paletteToCssGradient`, color.ts:80) is the universal floor and never changes. Both GPU backends share the **CPU-side color core** (value.js, `deriveAurora`, `flattenPalette`) and the **config schema** unchanged — only the GPU translation diverges. The shader *math* (composition/flow/brush/mediums) transcribes GLSL→WGSL largely mechanically; the shared `procedural-color.glsl.ts` chunk would gain a WGSL twin (or be generated).

**What changes / what's load-bearing in the port:** GLSL `#version 300 es` → WGSL; uniform arrays → a std140/`@group @binding` uniform struct (the WGSL needs explicit 16-byte alignment — note the `_pad` discipline already shown in `glassShader.wgsl:17`); `gl.uniform*` calls → one `device.queue.writeBuffer`; `fwidth` (brush.glsl:110) maps to WGSL `dpdx/dpdy` derivatives; the full-screen triangle is identical (`glassShader.wgsl:168` already has the WGSL form). Multi-pass (the painterly unlock) needs render-target ping-pong or a compute pass — that's the genuinely new capability WebGPU buys, not just a re-spelling.

**Risk note:** don't dual-maintain two hand-written shader copies (the AV.W1 OETF-divergence class of bug). The shared-chunk pattern (`procedural-color.glsl.ts`) is the precedent — either generate WGSL from one source or keep a single equivalence-tested core, gated like `proof:blob-color-equivalence`.

---

## 4. ADOPT for glass-ui aurora — wave-seed list (tranche AW)

Each is a concrete, independently-landable AW wave/fold. Ordered roughly by leverage; the WebGPU substrate (AW.W0) is the spine the painterly waves want but several land on WebGL2 today.

- **AW.W0 — WebGPU substrate sibling (`createGPUCanvas`).** Lift the backend-agnostic lifecycle out of `useWebGLCanvas.ts` into a shared core; add a `createGPUCanvas` that returns the same `WebGLCanvasFrame`-shaped hooks over `GPUDevice`. Keep `createWebGLCanvas` as the fallback. Backend selected by an extended `resolveRenderMode` (`webgpu`/`webgl`/`css`/`auto`, probing `navigator.gpu`). The CSS placeholder stays the universal floor. *This is the coexistence spine — Three.js's WebGPU-primary + WebGL2-fallback model.*

- **AW.W1 — Single-source the GPU color/noise math across backends.** Before any second shader copy ships, make `procedural-color.glsl.ts` emit (or be twinned by) a WGSL chunk, gated by a CPU-equivalence test (`proof:aurora-space-gamma` + a new `proof:aurora-wgsl-equivalence`), mirroring the AV.W2 OETF convergence. Pre-empts the AV.W1 divergence-bug class for the port.

- **AW.W2 — In-shader OKLCh palette interpolation.** Splice the already-present `OKLCH_MATRICES_GLSL` into aurora and interpolate the LUT in OKLCh (composition.glsl `samplePalette`), not linear-sRGB. Lands on WebGL2 *today*; matches the OKLCh mesh-gradient SOTA (no muddy midpoints, perceptually-uniform bands). Low-risk, high visible payoff.

- **AW.W3 — Structure-tensor flow field (the Van Gogh unlock).** Derive stroke/medium direction from the gradient of the rendered color field (Sobel → 2×2 structure tensor → eigenvector) instead of (or blended with) the hand-authored `flowField`. Strokes then *follow* the gradient, not sit on it. Needs a read of the produced image → **multi-pass**, so this is the wave that most wants AW.W0's WebGPU compute pass (a WebGL2 ping-pong fallback is possible but awkward — flag the constraint in DESIGN.md invariant 8, which currently *forbids* multi-pass).

- **AW.W4 — Flow-guided anisotropic Kuwahara medium.** Add a Kuwahara medium peer (8-sector circular kernel, polynomial weights, ellipse squeezed along the AW.W3 tensor). This is the canonical "painterly abstraction" filter — gives the oil/pastel modes a true edge-preserving feature-aligned flatten that the current per-cell stroke SDF approximates. Cite Kyprianidis/Kang 2009 in DESIGN.md §8 (already half-referenced).

- **AW.W5 — Impasto height→normal lighting pass.** Replace the faked rim highlight (brush.glsl:173 `impastoAmp * rim`) with a real height field (stroke coverage accumulation) → screen-space normal (`dpdx/dpdy`) → a single virtual light. This is what makes oil read as *raised paint* under a raking light — the literature's impasto-as-displacement. Pairs with the Van Gogh variant for genuine depth.

- **AW.W6 — Van Gogh variant as a coherent curved stroke field.** Promote a first-class `vanGogh` register: a global curl/turbulence vector field (DESIGN.md already cites the Starry-Night turbulence work) driving long swept curved strokes (extend `curvedStroke`) with strong impasto (AW.W5) and broken-color (already in brush.glsl:219). No subject matter — pure brushwork field. This is the brief's headline variant; it composes AW.W3+W5 rather than being a one-off branch.

- **AW.W7 — Simplified "atoms of control" authoring surface + derive-color front door.** The config has ~30 fields; the brief wants *simplified options + a derive-color variant*. `deriveAurora` (color.ts:152) already turns one seed into a palette — expose a high-level `createAuroraFromSeed(seed, {mood, medium})` that fills the full config from a handful of atoms (zone count, noise character, color seed, medium), with the 30-field config as the power-user escape hatch. Matches the OKLCh-tool UX (one anchor → harmony → mesh).

- **AW.W8 — WebGPU compute-driven particle/instanced brushstrokes.** The "ultra-high-fidelity brushwork" ceiling: real stroke *primitives* (instanced billboarded quads or compute-placed particles) advected along the AW.W3 field, instead of per-pixel SDF best-of-9. This is the capability fragment-only WebGL2 can't reach and the strongest reason WebGPU exists here ([toji.dev compute-vertex](https://toji.dev/webgpu-best-practices/compute-vertex-data.html)). Highest effort; gate behind AW.W0+W3.

- **AW.W9 — Richer interactivity beyond cursor swirl.** Current interaction is a single cursor-swirl into warp+flow (DESIGN §4.6). With compute particles (AW.W8) the pointer can seed/drag actual strokes, scroll can advect the field, and `setCursor` can carry velocity (impasto smear direction). Dynamic/interactive per the brief; composes the existing `useCursorInteraction` seam.

**Coexistence verdict:** WebGL2 and WebGPU coexist cleanly because the substrate already isolates the backend to one line and exposes a hook-shaped consumer seam; the CPU-side OKLCh color core and config schema are shared unchanged. Land AW.W2 (OKLCh) and AW.W7 (derive front-door) on WebGL2 now; land AW.W0/W3/W5/W6/W8 as the WebGPU multi-pass arm. The migration shape is the Three.js model — WebGPU primary, WebGL2 fallback, CSS placeholder floor — not a rewrite.

**Key file:line anchors:** backend lock `useWebGLCanvas.ts:267`; consumer hook seam `useWebGLCanvas.ts:64-97`; tiering `renderMode.ts:31`; single-pass constraint `DESIGN.md` §2 inv 8; procedural flow (the gap) `flow.glsl.ts:6`; unused in-shader OKLCh `procedural-color.glsl.ts:73`; linear-not-OKLCh LUT mix `composition.glsl.ts:16`; faked impasto `brush.glsl:173`; derive-color core `color.ts:152`; orphan WGSL (glass, not aurora) `glassShader.wgsl`.

Sources: [web.dev WebGPU baseline](https://web.dev/blog/webgpu-supported-major-browsers) · [Three.js/WebXR WebGPU default](https://vr.org/articles/webgpu-baseline-2026-three-js-webxr-default) · [byteiota WebGPU 2026](https://byteiota.com/webgpu-2026-70-browser-support-15x-performance-gains/) · [Kyprianidis/Kang anisotropic Kuwahara CGF09](https://www.umsl.edu/~kangh/Papers/kang_cgf09.pdf) · [EG diglib Kuwahara](https://diglib.eg.org/items/4cdcfa3c-afe3-4fd8-acaf-dbccce2ff216) · [Maxime Heckel painterly shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) · [Sharma Van Gogh shader thesis](https://core.ac.uk/download/pdf/147237812.pdf) · [Starry Night turbulence arXiv](https://arxiv.org/pdf/2310.03415) · [WebGPU compute shaders](https://threejsroadmap.com/blog/introduction-to-webgpu-compute-shaders) · [toji.dev compute-vertex](https://toji.dev/webgpu-best-practices/compute-vertex-data.html) · [gradients.fyi OKLCh mesh](https://gradients.fyi/) · [Blue Monkey OKLCh gradients](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients)
