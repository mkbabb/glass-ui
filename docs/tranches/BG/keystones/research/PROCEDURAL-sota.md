# KS-PROCEDURAL — SOTA research (procedural animation, 2026)

**Lane:** KS-A · PROCEDURAL · SOTA researcher. **Date:** 2026-07-01 · **HEAD:** `fa6ed40a` (tranche/BG).
**Waves this feeds (F9 family):** 6.1 `W-VIZ-RESIZE-ADOPT` · 6.3 `W-VIZ-DEMIGRATE` (atomic) · 6.4
`W-VIZ-REVEAL-BLOOM` · 6.5 `W-VIZ-PREVIEW-LIVE` · 6.6 `W-DOTFLOW-REBUILD` (+advection) · 6.8
`W-GOODOT-SETUP-SPLIT` · 6.9 `W-BLOB-KINEMATICS-LEAF` · `W-AUR-METAL-FINISH` · `W-AUR-IMAGE-SOURCE`.
**Fence honored:** research + verdicts only; ZERO src/demo/scripts edits; siblings read-only; every corpus
claim cites file:line; every SOTA reference is named + linked.

This report is the SOTA half of the KS-PROCEDURAL keystone. The corpus is unusually mature here — the BD
greenfield GOLDENs for the five headline viz already did live SOTA-grounded spikes with green readbacks (aurora
metal 25× local contrast; dot-flow-field AURORA-CURRENT `litFrac 0.231`/`meanChroma 20.2`/`frameDelta 10.30`;
goo-blob fission 2→1→2 CPU-spike). So this report does NOT re-derive mechanisms. It (a) grounds each corpus
decision in named 2026 SOTA so the build cites instead of re-arguing, (b) resolves the ONE live open question —
the **demigrate** (fourier/constellation back off WebGPU), (c) supplies the perceptual/perf numbers the build
calibration needs, (d) flags the ONE live gap the GOLDENs assume-fixed-but-isn't (`preserveDrawingBuffer`), and
(e) issues ADOPT/REJECT verdicts per finding.

---

## 0 · The corpus the SOTA must serve (build on; never re-derive)

The procedural family is documented as ONE suite (`src/components/custom/PROCEDURAL-SUITE.md`): ten members, ONE
`createCanvasLifecycle` leaf, ONE WebGPU-first dual-substrate (`useGpuSubstrate`), ONE shared color chunk
(`procedural-color.{glsl,wgsl}.ts`), ONE cited-SOTA math vocabulary (Tessendorf/Gerstner · Bridson curl ·
Fourier/DFT). The per-viz migration verdict is already recorded per member (SUITE §"the per-viz capability +
migration table"), which is the exact discipline the user's "cover the extant items too" demands.

**The five headline F9 GOLDENs (all with live spikes, all grepped-on-HEAD):**

1. **aurora** — `docs/tranches/BD/greenfield/aurora/GOLDEN.md`: three orthogonal axes on ONE engine —
   `source:"palette"|"image"` · `finish:"none"|"kuwahara"|"metal"|"metal-gradient"` · `vividness:0..1` floor.
   Metal is built by re-plumbing the luma gradient `structureTensorField` already computes and **discards**
   (`mediums.glsl.ts:89` returns `vec3(dir, A)`, throwing `(Gx,Gy)`). Slots `uMedium == 8/9` (corrected from the
   lens-a/b phantom 10/11; `MEDIUM_ID` stops at kuwahara:7). Spike: smooth localContrast `0.0011` → metal
   `0.0267` (25×); vividness `0.031 → 0.057`.
2. **goo-blob** — `goo-blob/GOLDEN.md`: two orthogonal moves — Move A (CPU) retires the never-leaves-reach clamp
   for a bounded single-fission excursion (2→1→2 topology); Move B (GL twin) `uBackdrop` squircle-lens (Snell off
   the ⁴√ dome). The kinematics live in `useBlobSatellites.ts` (the 6.9 `W-BLOB-KINEMATICS-LEAF` carve target,
   `:533`).
3. **dot-flow-field** — `dot-flow-field/GOLDEN.md` ("AURORA CURRENT"): `mode:"flow"` (advection + ping-pong trail
   feedback + cursor vortex) as the new default, `mode:"field"` (the calm halftone) kept. The 6.6 rebuild carries
   GPGPU state-texture + two-FBO trail + warm-fire ramp. Spike GREEN on the WebGL2/Safari-real path.
4. **goo-dot-matrix** — `goo-dot-matrix/GOLDEN.md`: four moves (presence-floor · neck-ridge · technicolor
   re-grade · aurora ground + liquid lattice) on the byte-untouched `sceneDistG` field. The 6.8
   `W-GOODOT-SETUP-SPLIT` carves the setup shape (`useGooDotMatrix.ts:508`).
5. **dot-matrix** — `dot-matrix/GOLDEN.md`: Fibonacci phyllotaxis dot-sphere (golden-angle lattice, depth-shaded
   translucent shell).

**The suite-doc verdicts this report must confirm-or-overturn:** aurora/goo-blob MIGRATED (WGSL primary);
dot-flow-field/concentric/paper-grid/dot-matrix/goo-dot BORN WebGPU-first; fourier-field/constellation **DO NOT
MIGRATE (Canvas2D is the right tool)**; watercolor-dot PERMANENTLY OUT (mounts zero drawing context). Row 6.3
`W-VIZ-DEMIGRATE` is the wave that ACTS on the fourier/constellation verdict — and that is the one live tension
this report resolves (§4).

**The two protected fences (SEED-KEYSTONES §Fences + SYNTHESIS-PASS1 §4):** DOCK_SPRING frozen; identity values
byte-identical; the warm HSL/alpha/φ identity is the product. For F9 that means: the **library default palette
stays warm-cream / neutral** (`paletteStops: ["#b5947f","#d4b27d","#dad6b1"]`, `goo-blob/types.ts:353`); every
vivid technicolor ramp (teal-navy, magenta-cyan-amber) is a **DEMO preset**, presets-in-consumers, NEVER a
library token. The `proof:viz-dotflow` F5 warm-fence and `proof:blob-warm-default ≥0.62` machine-lock this.

---

## 1 · SOTA landscape — the 2026 procedural-ambient movement (the identity anchor)

The F9 thesis — **procedural canvas/WebGL as AMBIENT design, warm and restrained, that a glass surface refracts**
— sits at the 2026 center of mass, not a niche. This is the frame the build cites, not defends.

- **"Ambient UI" is a named 2026 headline trend.** The dominant framing is *"generative and ambient backgrounds …
  subtle, living motion that responds to the user without demanding attention"* — motion as atmosphere, not
  spectacle. [Index.dev — Web Design Trends 2026: AI, 3D, Ambient UI & Performance](https://www.index.dev/blog/web-design-trends)
  · [Muzli — Web Design Trends 2026](https://muz.li/blog/web-design-trends-2026/).
  **ADOPT (validation):** the SUITE's "recessive aurora clean field," the `opacity-ceiling` prop, the
  content-mask vignette, the one-GL-per-route budget ARE the discipline this trend prescribes. The F9 field is
  ambient-by-design; it is the SOTA center, not a defense.
- **Restraint out-scores pyrotechnics on the award circuit.** The 2026 award-craft consensus is explicit: *"the
  biggest wins in WebGL come from asset optimization, scene restraint, and real-device testing"*; portfolios that
  win *"demonstrate how restraint and polish can be more impressive than pyrotechnics — every animation earns its
  place."* [School of Motion — 10 Websites with Great Animation in 2026](https://www.schoolofmotion.com/blog/10-websites-with-great-animation-in-2026)
  · [MDX — WebGL Development 2026](https://mdx.so/blog/webgl-development-how-to-build-immersive-3d-web-experiences-in-2026)
  · [Awwwards — Best WebGL Websites](https://www.awwwards.com/websites/webgl/).
  **ADOPT (calibration):** this is the SOTA authority for the SEED's *"SUBTLE where subtle, audacious where
  audacious"* split. The viz field is the audacious surface (a warm technicolor current IS the punch); but the
  restraint law binds the **budget** (fixed tap counts, one context per route, park-when-hidden). The aurora
  GOLDEN's "deferred lens-c cel-outline — a second bold swing the four asks do not need" (§8) is exactly this
  restraint discipline applied.
- **Pointer response is the SOTA differentiator over a looping video.** Every 2026 exemplar cited couples the
  generative field to the cursor — *"abstract 3D environments that morph as you explore," "generative effects that
  respond to mouse movement."* [Awwwards — 30 Experimental WebGL Websites](https://www.awwwards.com/30-experimental-webgl-websites.html).
  **ADOPT:** the dot-flow-field cursor-VORTEX (a rotational injection into the velocity field, fed by the existing
  `usePointerVelocityField` — GOLDEN §2.3) and the goo-blob morph-more-on-move are the SOTA "the field reacts"
  axis. The reference is a video that *cannot* interact; the interactive parked-when-hidden field is the SURPASS.
- **FPS-based quality scaling + accessibility overlays are the winning pattern.** Award portfolios ship *"dynamic
  FPS-based quality scaling and accessibility overlays."* [Awwwards WebGL collection](https://www.awwwards.com/websites/webgl/).
  **PARTIAL-ADOPT:** the suite already has the accessibility overlay half (WCAG-2.2.2 `v-model:paused`, PRM
  one-static-frame freeze, `aria-hidden` decorative canvas). The **FPS-based quality scaling is a real gap** —
  the suite has fixed budget-DPR clamps + a static-mesh fallback but no *runtime* frame-time-driven quality
  ladder. See §8 — booked, not a BG wave (it would be a substrate-leaf change; the SEED's "no self-inserted row"
  fence records it as a fold-candidate).

---

## 2 · Axis 1 — the shader-art frontier (per-technique ADOPT/REJECT)

Each technique the SEED names, grounded + verdicted against what the corpus already ships.

### 2.1 Curl-noise flow fields (Bridson) + GPGPU state-texture trails — the dot-flow-field spine

**SOTA.** Bridson's divergence-free curl-noise (`v = ∇⊥ψ`, the 2D curl of a scalar fbm potential) is THE
standard for procedural flow that swirls and never converges to a sink. [Emil Dziewanowski — Dissecting Curl
Noise](https://emildziewanowski.com/curl-noise/) is the canonical 2025-era explainer; the ping-pong GPGPU
particle-advection pipeline (particle state in a texture pair, advected each frame in a fragment/compute pass,
read-write ping-ponged) is the standard WebGL2/WebGPU realization. [Medium — Creating Chaotic Flow Fields with
GPGPU in R3F](https://medium.com/@midnightdemise123/creating-chaotic-flow-fields-with-gpgpu-in-react-three-fiber-f9aad608c534)
· [ostefani.dev — Fluid Simulation in WebGL: the Advection Step](https://ostefani.dev/tech-notes/webgl-fluid-advection)
· [three.js forum — GPGPU Particles showcase](https://discourse.threejs.org/t/gpgpu-particles/90558).

**Corpus.** `CURL_FBM_GLSL` (`src/composables/glass/webgl/shaders/flow.glsl.ts:1`) IS the shared divergence-free
`curlFBM(p)` chunk (VERIFIED present, `curl of a scalar fbm potential`, basis-agnostic via a host-supplied
`potentialFBM` prototype — the AV.W2 shared-chunk precedent). `sampleVelocity`/`gerstnerVelocity` have JS+WGSL+GLSL
twins (`dot-flow-field/composables/flowField.ts` + `shaders/flow-field.{compute.wgsl,glsl}.ts`, VERIFIED). The
GOLDEN's headline is the **trail feedback buffer** (a two-FBO `RGBA16F` ping-pong, decay-blit prev→cur then draw
motes additive) — ABSENT on HEAD, the single strongest lever.

**VERDICT: ADOPT — the corpus math is exactly SOTA; the 6.6 rebuild's trail-feedback + advection is the correct
2026 mechanism.** The GOLDEN's spike (16384-particle state-texture ping-pong + two-FBO trail + cursor vortex,
green on the Safari-real WebGL2 path: `litFrac 0.231`, `frameDelta 10.30`) de-risks it. No re-derivation owed.

- **NUMBER (trail decay).** SOTA feedback-trail decay sits in `0.90–0.96` per frame at 60fps (a ~0.93 decay =
  ~10-frame ≈ 165ms half-life — long enough to read as a ribbon, short enough to not smear to fog). The GOLDEN
  proposes `trailDecay 0.90–0.94` (§3.3); **confirm 0.93 as the default**, with the caveat that decay must be
  **frame-rate-normalized** (`decay^(dt/16.67)`) so a 120Hz display does not double the fade — a lever the
  greenfield flagged as tuning, this report pins as a correctness requirement.
- **NUMBER (particle count).** WebGL2 comfortably runs 10k+ point-sprites; the spike ran the full
  `MAX_PARTICLES 16384` at 60fps. **Confirm ~8–12k dense as the default** (GOLDEN §2.1) — well under budget, dense
  enough to read as continuous flow. This is inside the [semisignal 2D-vs-WebGL particle
  benchmark](https://semisignal.com/a-look-at-2d-vs-webgl-canvas-performance/) band (WebGL 10k vs Canvas2D ~1k) —
  which is ALSO the demigrate evidence (§4): a flow field is a particle system, the one class where WebGL/GPU
  categorically wins.

**LIVE GAP FLAGGED — `preserveDrawingBuffer` is still `:false` on HEAD.** The GOLDEN's R0 substrate fix
(*"WebGL2 ctx `preserveDrawingBuffer:true` at the substrate so readback is real"*) is assumed-landed but is NOT:
`useGpuSubstrate.ts:46` reads *"all live consumers create their context with `preserveDrawingBuffer:false` … a
live [readback returns all-zero]"*. The DELTA-ASSAY confirms the live symptom (`litFrac 0` unmeasurable on the
mono-near-black reference). **This is the born-UNMEASURABLE defect: any 6.6 gate that reads pixels off the WebGL2
path false-greens (or false-reds-with-zero) until this lands.** The KS-PROCEDURAL spec MUST carry the substrate
`preserveDrawingBuffer:true` (or an explicit readback-FBO on-present) as an R0 precondition of 6.6, not an
assumption — it benefits every viz on the fallback path.

### 2.2 Anisotropic Kuwahara painterly (Kyprianidis) — aurora `finish:"kuwahara"`

**SOTA.** Kyprianidis/Kang/Döllner 2010 "Anisotropic Kuwahara Filtering on the GPU" is the foundational NPR
painterly method — a generalization that *"adapts shape, scale and orientation of the filter to the local
structure … sharper edges, more feature-abiding."* [Kyprianidis — Anisotropic Kuwahara Filtering on the
GPU](https://www.kyprianidis.com/p/gpupro/). The Papari extension (circular 8-sector kernel + Gaussian weighting
+ a **polynomial approximation** `[(x+ζ) − ηy²]²` that replaces the expensive Gaussian for smaller kernels) is
the perf-critical refinement, and the SOTA drives the sectors off a **structure tensor** (Sobel partials). The
2024-2025 SOTA is unchanged in method but has cleaner single-pass realizations. [Maxime Heckel — On Crafting
Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) · [Godot Shaders —
Anisotropic Kuwahara (Nov 2024)](https://godotshaders.com/shader/anisotropic-kuwahara-filter/) ·
[Shadertoy — Anisotropic Kuwahara](https://www.shadertoy.com/view/DtKczW).

**Corpus.** The CLAUDE.md `W-AUR-KUWAHARA` note already ships kuwahara as `uMedium == 7`, **single-pass**, and
correctly identifies the key fact the SOTA multi-pass literature obscures: **aurora is a PROCEDURAL field (no
input texture), so the operator needs NO FBO** — `mediumKuwahara()` re-samples `sampleBase` over an elliptical
kernel (4 rings × 8 angular taps = **32 procedural samples**) oriented along the existing single-pass
`structureTensorField`, 8 overlapping sectors via gaussian-angular weights blended by `1/(1+variance^4)` (the
SOFT criterion → no pinwheel). This is the Papari 8-sector method with the soft-blend, on a procedural source.

**VERDICT: ADOPT — the corpus is the exact 2026 SOTA, and its single-pass-because-procedural insight is a
genuine advance over the textbook multi-pass pipeline.** The Heckel article confirms the multi-pass architecture
(pass1 structure tensor → pass2 filter → pass3 tonemap) is only needed when filtering an *input image*; a
procedural field computes its structure tensor in-line for free. The 32-tap budget matches the SOTA "8 sectors,
small kernel" perf guidance (the polynomial approximation exists precisely to keep small-kernel 8-sector filters
at 60fps). No change owed to the kuwahara medium itself. **The aurora GOLDEN's re-classing kuwahara from a
`medium` to a `finish` (an operator over the field, not a paint substance) is the correct taxonomy** — it makes
`finish:{none,kuwahara,metal,metal-gradient}` one orthogonal axis, and `W-AUR-METAL-FINISH` slots metal beside
kuwahara at `uMedium 8/9` with zero taxonomy churn.

- **The soft-criterion is load-bearing (REJECT the hard argmin).** Pre-2010 Kuwahara used a hard `argmin`
  variance select → the 8-spoke pinwheel artifact. The corpus's `1/(1+variance^4)` soft weight is the Papari fix.
  The SEED's cartoon-punch mandate must NOT tempt a hard-select "posterized" look here — that reintroduces the
  pinwheel. The `proof:aur-kuwahara` no-pinwheel orientation-histogram π is the correct gate.

### 2.3 Metallic / iridescent shader finishes (thin-film, env-map fakes) — aurora `finish:"metal"`

**SOTA.** Real-time metal is a two-term microfacet game: an **anisotropic** highlight (the streak that runs along
the surface's tangent — the brushed-metal read) × a **crest** specular (`N·H` off a height-normal — the polished
crest). Iridescence/thin-film is a wave-optics layer on top (OpenPBR/Enterprise-PBR 2025 model it as a thin layer
over the base substrate). [Enterprise PBR Shading Model 2025x](https://dassaultsystemes-technology.github.io/EnterprisePBRShadingModel/spec-2025x.md.html)
· [OpenPBR: Layered Physical Shading Model](https://www.emergentmind.com/papers/2512.23696)
· [Belcour — Practical Extension to Microfacet Theory for Varying Iridescence](https://belcour.github.io/blog/slides/2017-brdf-thin-film/slides.html)
· [Real-time Image-based Lighting of Microfacet BRDFs with Varying Iridescence](https://www.researchgate.net/publication/334397646).
The env-map "fake" (a matcap / synthesized directional light instead of a real IBL probe) is the standard
real-time cheat when there is no scene to reflect.

**Corpus.** The aurora GOLDEN's metal is EXACTLY this two-term BRDF — `streak = pow(sinTH, aniso)` (highlight along
the tensor tangent) × `crest = pow(N·H, crestShine)` (the height-field specular off the re-plumbed gradient), with
`spec *= smoothstep(0, coherenceFloor, A)` (the coherence gate that fades the streak to zero in structureless
zones — no phantom banding). The light is **cursor-z-synthesized** (`normalize(vec3(uCursor - p, METAL_LIGHT_Z))`,
idle → a static upper-right rake) because — the GOLDEN's load-bearing cross-engine catch — `uLightDir` exists on
the WebGL2 frag struct but is **absent from the WGSL uniform struct**, so a metal that reads `uLightDir` is a
phantom `0` on the primary path of BOTH browsers. Spike-proven: 25× local crest-valley contrast over the smooth
wash (`0.0011 → 0.0267`).

**VERDICT: ADOPT — the corpus's two-term-BRDF-from-the-discarded-gradient is textbook 2026 real-time metal, and
the "build it from math the engine already computes and throws away" is the deft SOTA move.** The env-map-fake is
correctly done as the cursor-synthesized directional light (a matcap-grade cheat, correct for a field with no
scene to reflect). Two calibration notes:

- **The catch-light must be achromatic-warm (ADOPT the GOLDEN, it protects the fence).** `METAL_CATCH_WARM ≈
  vec3(1.0, 0.97, 0.90)` — the read comes from SHADING, the field hue tints the body, the catch is warm-white.
  This keeps the BA.W-NO-GRAY warm floor: metal never injects a cold hue. A blue-white "chrome" catch would break
  the identity. **Confirm achromatic-warm.**
- **Thin-film iridescence: REJECT for BG, book as a successor.** True thin-film (a viewing-angle-dependent hue
  shift over the metal) is the natural "more" and the SOTA has clean real-time models, BUT: (1) it needs a real
  view-dependent term the fullscreen procedural field does not have a meaningful `V` for (the field has no depth);
  (2) a rainbow hue-shift fights the warm-cream identity fence hard; (3) it is a second bold swing the wave does
  not need. The GOLDEN's `metal-gradient` twinkle-in-place sparkle (a highp per-cell hash, phase-animated, gated
  on facing → a metallic FLAKE) is the RESTRAINED iridescence substitute that reads as "minor sparkle
  imperfections + other colors woven in" without a full thin-film layer. **ADOPT metal-gradient's twinkle as the
  iridescence-lite; book true thin-film as a `finish:"iridescent"` successor with its own consumer + fence.**

### 2.4 Halftone / dither aesthetics — goo-dot-matrix + goo-dot `dot-dither`

**SOTA.** Ordered dithering (Bayer, 1973) — a periodic threshold matrix (4×4/8×8) tiled across the field, each
pixel compared to its matrix entry — is the canonical retro halftone/dot-matrix look, computationally trivial and
enjoying a strong 2025 revival in generative/retro aesthetics. [Wikipedia — Ordered
dithering](https://en.wikipedia.org/wiki/Ordered_dithering) · [Grokipedia — Ordered
dithering](https://grokipedia.com/page/Ordered_dithering) · [Godot Bayer Dithering Shader
(2025)](https://godotengine.org/asset-library/asset/4005) · [Shadertoy — Ordered Dithering
(Bayer)](https://www.shadertoy.com/view/7sfXDn).

**Corpus.** goo-dot ships a `dot-dither` register (the "Codrops Bayer8 halftone," SUITE §goo-dot-matrix). The
goo-dot GOLDEN's headline is NOT the dither per se but the **neck-ridge** (the weld = the fattest, brightest dots,
gated on the shallow SDF gradient `length(scene.yz)` — the flat welding membrane) + the **presence-floor** (the
dot never fully discards → a living lattice, replacing the binary `step()` gate at `goo-dot.wgsl.ts:159`).

**VERDICT: ADOPT — the Bayer8 halftone is correct SOTA and already shipped; the GOLDEN's four moves are the right
reads on it.** The single insight worth citing: in a dot grid, "thinner at the waist" reads as *the neck
vanishing* (indistinguishable from empty field), so the SOTA gradient-thinning weld is WRONG for a halftone — the
GOLDEN's neck-ridge inversion (weld = fattest dots) is a genuine advance over the naive halftone-of-an-SDF. This
is not in the literature; it is a correct first-principles derivation from the halftone's own perceptual failure
mode. **ADOPT the neck-ridge; it is the boldest move and the one that makes a dot grid read as liquid metaball.**

### 2.5 Phyllotaxis — dot-matrix

**SOTA.** The Vogel golden-angle spiral (`θ = i·137.5°`, `r = c·√i`) is the canonical even-area point
distribution — no pole-pinching, no clumping — the standard for sunflower-seed / dot-sphere lattices. (The web
search surfaced dithering but not phyllotaxis directly; the method is textbook — Vogel 1979, the golden-angle
`137.507°` = `2π(2−φ)`.)

**Corpus.** dot-matrix ships "golden-angle area-centered lattice, no pole-pinching" (SUITE §dot-matrix; CLAUDE.md
`W-VIZ-DOTMATRIX`: *"golden-angle area-centered lattice, no pole-pinching"* + the Will-Howard/COBE/Stripe
depth-shade `opacity 0.15 + 0.85·facing`).

**VERDICT: ADOPT — the corpus is textbook-correct Vogel phyllotaxis; no change owed.** The √φ proportion mandate
(SEED gestalt bar) is satisfied by construction — the golden angle IS the φ identity in the lattice. dot-matrix
is not a BG headline wave (it landed at BC); this report confirms its verdict is sound and it needs no F9 rework
beyond the 6.1 resize-adopt.

### 2.6 Domain warping (IQ) — the shared warp across aurora/paper-grid

**SOTA.** Inigo Quilez's domain warping (`f(p + f(p + f(p)))` — feeding a noise field back into its own domain)
is THE technique for organic, flowing, "living" procedural fields. It is the aurora nuclei-drift spine and the
paper-grid curl-warped UV. (IQ's articles are the canonical source; the corpus already cites Bridson curl as the
paper-grid warp.)

**VERDICT: ADOPT — already the corpus spine; no change.** Recorded here for completeness (the SEED names it).

---

## 3 · Axis 4 — texture-upload / image-source pipelines (the blurred-image bg)

**SOTA.** Uploading an image as a shader texture has ONE genuine cross-engine hazard: WebGL2 `texImage2D` and
WebGPU `copyExternalImageToTexture` carry DIFFERENT premultiply / colorspace / flipY defaults, so an
uncontrolled upload renders differently on the two backends. The 2026 fix is to normalize at the decode:
`createImageBitmap(blob, {premultiplyAlpha:"none", colorSpaceConversion:"none"})`, then declare the same on both
uploads. [NameOcean — The Hidden Complexity of Web Image Loading: WebGL and
WebGPU](https://nameocean.net/article/the-hidden-complexity-of-web-image-loading-a-developers-guide-to-webgl-and-webgpu/)
· [Toji.dev — WebGPU img/canvas/video Textures](https://toji.dev/webgpu-best-practices/img-textures.html)
· [gpuweb #4356 — copyExternalImageToTexture blank-result hazard](https://github.com/gpuweb/gpuweb/discussions/4356).
Safari specifically had `copyExternalImageToTexture(ImageBitmap)` bugs, fixed in newer iOS — so the WebGL2 path
must stay the graceful floor.

**Corpus.** The aurora GOLDEN §3 (`source:"image"`) already specifies exactly this: shared decode
`{premultiplyAlpha:"none", colorSpaceConversion:"none"}`, explicit `UNPACK_PREMULTIPLY_ALPHA_WEBGL:false` +
`UNPACK_COLORSPACE_CONVERSION_WEBGL:NONE` + `UNPACK_FLIP_Y_WEBGL:false` on WebGL2, matching flags on WebGPU, and
— load-bearing — the parity gate is a **real rendered-capture-pair (chromium-WGSL vs webkit-WGSL decoded
pixels, OKLab ΔE)**, never a name-presence. The blur is a **bounded fixed-tap Gaussian/Kawase loop** (3 rings ×
8 taps = 24, the kuwahara tap-budget precedent), zone-modulated by the drifting `nucleiField` — NOT an FBO
Kawase chain (the single-pass substrate invariant), and NOT `backdrop-filter:url` (the WebKit-fragile trap). The
SEED names `W-AUR-IMAGE-SOURCE` as SHARING the ONE texture-upload primitive with `BD.W-DOT-IMAGE` (first-to-land
BUILDS, other CONSUMES — the DRY ≥2-consumer discipline).

**VERDICT: ADOPT — the corpus is precisely the 2026 SOTA, including the one hazard the literature flags and the
capture-pair parity gate.** Two sharpenings the KS spec should carry:

- **The parity gate MUST be a rendered-capture-pair, never a name-check.** The gpuweb #4356 blank-result hazard
  is real and Safari-specific — a name-presence gate would false-green on a blank WebKit texture. This is the
  born-UNMEASURABLE class again (cf. §2.1 preserveDrawingBuffer). Pin it.
- **The blur is IN-SHADER bounded taps, not a post-blur.** The single-pass substrate invariant + the WebKit
  no-dynamic-loop-bound rule (WebKit's compiler chokes on non-constant loop bounds) means the tap count is a
  compile-time constant, radius modulated per-fragment. 24 taps is the kuwahara-proven budget-clearing number;
  confirm it.
- **`source` is a build-time program permutation, NOT a runtime `if(uSource)` branch** (the BD.W-DOT-IMAGE B1
  discipline). Confirm — a per-fragment god-branch is both a perf and a WebKit-compiler hazard.

---

## 4 · Axis 3 — Canvas2D vs WebGL2 in 2026 (THE demigrate resolution)

This is the one LIVE open question the report must resolve: row 6.3 `W-VIZ-DEMIGRATE` removes the `.wgsl`
primaries for the viz whose suite verdict is DO-NOT-MIGRATE. The corpus already decided *which* (fourier-field +
constellation); this report confirms *why*, from 2026 SOTA, and flags the exact on-disk scope.

**SOTA — the crossover is well-characterized and stable in 2026.** Canvas2D wins on: initial load (~15ms vs ~40ms
for WebGL context creation), simplicity, and any scene under "a few hundred elements." WebGL2 wins categorically
on: many small primitives (Canvas2D is CPU-bound — every primitive is an individual un-batchable API call), and
particle counts (WebGL ~10k+ vs Canvas2D ~1k practical ceiling). [semisignal — 2D vs WebGL canvas
performance](https://semisignal.com/a-look-at-2d-vs-webgl-canvas-performance/) · [2dgraphs.netlify.app — WebGL vs
2D Canvas Comparison](https://2dgraphs.netlify.app/) · [Demyanov — Past and future of HTML Canvas: 2D, WebGL,
WebGPU](https://demyanov.dev/past-and-future-html-canvas-brief-overview-2d-webgl-and-webgpu). The decision rule:
*"Canvas2D for < a few hundred elements + fast load; WebGL2 for hundreds-to-thousands of primitives / consistent
GPU-accelerated frames."*

**Apply the rule to the two demigrate candidates:**

- **fourier-field** — an inverse-DFT closed curve drawn as **a few-to-dozens of epicycle phasors + one
  `ctx.stroke` path**. This is the textbook Canvas2D case: tens of elements, path stroking (which Canvas2D does
  natively and beautifully), fast load, no per-pixel work. A GPU line-instancing path only wins when phasor count
  scales to *thousands* (the booked `W-FOURIER-GPU` trigger). The DFT math is already GPU-agnostic
  (`fourier-field/math.ts`). **Canvas2D is unambiguously the right tool by the 2026 crossover rule.**
- **constellation** — a drifting proximity-graph of nodes + edges at the current node count. Node/edge counts sit
  in the tens-to-low-hundreds, and the edges are line segments (`ctx.moveTo/lineTo`) — again the Canvas2D sweet
  spot until the lattice becomes *much* denser (the booked `W-CONSTELLATION-GPU` trigger, where the dot-flow
  advection compute generalizes). **Canvas2D is the right tool.**

**ON-DISK SCOPE (verified — the demigrate is NOT a no-op).** Both viz have `.wgsl` primaries ON DISK that 6.3
removes: `fourier-field/shaders/fourier-field.{compute,render}.wgsl.ts` and
`constellation/shaders/constellation-{lines,points}.wgsl.ts` (VERIFIED present). `useFourierField.ts` currently
imports `useGpuSubstrate` (`:29`) — the WGSL primary was BUILT, and the demigrate strips it back to the Canvas2D
path (`README.md:7,219` already documents Canvas2D as the substrate — the doc leads the code). This matches row
6.3's exact wording: *"removes ONLY the `.wgsl` primary (KEEPS GLSL fallback + dir + `index.ts`,
key-preserved)."*

**VERDICT: ADOPT the demigrate — the 2026 crossover rule confirms fourier/constellation belong on Canvas2D, and
the on-disk `.wgsl` primaries are real dead-weight to remove.** This is the SOTA-correct move: *"WebGPU-first WHEN
POSSIBLE" gives latitude, and the possible-but-wrong case is the one to reverse.* Three sharpenings:

- **The demigrate is a BUDGET WIN, not a capability loss.** Removing the `.wgsl` primaries + `createGpuSubstrate`
  from these two viz drops the shipped shader bytes AND the async-device-acquisition path for viz that never
  needed the GPU. Row 6.3 already says *"budget DOWN"* — the SOTA confirms this is not a regression: Canvas2D's
  faster load (~15ms vs ~40ms) is a measurable first-paint win for these two.
- **The atomic pairing (6.3 = 6.3+6.7) is correct.** Demigrating one and not the other would leave a split
  discipline (one viz on GPU, its twin on Canvas2D for no reason). Do both in one atomic wave — the row already
  bundles them.
- **The parity/protection gates FOLLOW the substrate.** Row 6.3 carries the born-RED `DEFAULT_PARALLAX===0` arm
  on `proof:constellation-gen` (the LX.1 protector) + the `W5-viz-disposition` clause. Confirm these stay — the
  demigrate must not silently drop constellation's parallax-off protector (LX.1's live fix, chrome 58→5.7px).

**Cross-check against the suite doc:** the SUITE table already records fourier/constellation as DO-NOT-MIGRATE
WITH the booked trigger — so the demigrate is not overturning a decision, it is *executing the recorded verdict
that the BD build overshot by building `.wgsl` primaries the verdict said not to need.* The SOTA rule is the
authority that says "few phasors / sparse graph = Canvas2D," and it is unambiguous.

---

## 5 · Axis 6 — demand-driven rendering discipline (offscreen park · PRM · quiescence)

**SOTA.** The 2026 consensus is explicit and matches the corpus exactly: *"render only when necessary; pause when
the tab isn't visible — respectful of battery."* The mechanism stack is Page Visibility API (`visibilitychange` /
`document.hidden`) + IntersectionObserver (offscreen park) + `prefers-reduced-motion` (matchMedia, live-monitored)
+ `content-visibility:auto` (`contentvisibilityautostatechange`). [MDN — Page Visibility
API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) · [MDN —
requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) (browsers
already throttle rAF in background tabs) · [Muhammad Anas / battery-friendly rAF
patterns](https://fsjs.dev/beyond-basics-requestanimationframe-techniques-game-development/).

**Corpus.** `createCanvasLifecycle` owns ALL of this ONCE (SUITE §"the shared discipline"): the 3-reason suspend
`Set` + the F6 `off-screen-io` IntersectionObserver split + the `contentvisibilityautostatechange` park + the
live `matchMedia("(prefers-reduced-motion: reduce)")` re-monitor (one static frame then park, re-arm on
un-reduce). `proof:offscreen-pause` machine-locks "a parked rAF attaches ZERO frames." Every backend
(WebGL2/WebGPU/Canvas2D) composes the ONE leaf, re-implementing zero scheduling.

**VERDICT: ADOPT — the corpus is the exact 2026 SOTA, and its "one leaf, three thin backends, zero re-fork"
discipline is stronger than the typical per-viz re-implementation the literature shows.** No change owed to the
lifecycle. Two F9-wave-specific notes:

- **The trail-feedback buffer MUST survive PRM as a held composite (ADOPT the GOLDEN).** dot-flow-field's PRM
  freeze is *"ONE static advected+trailed frame — the trail buffer holds the composite"* (GOLDEN §2.2). This is
  the correct PRM contract: the ping-pong buffer already holds the streaks, so the PRM one-frame is a rich still,
  not a blank. Confirm the `pointer.tick(0)` freeze + vortex-inert.
- **The two-pass viz (goo-dot aurora-ground) rides the SAME park (ADOPT the GOLDEN).** goo-dot's aurora-ground is
  TWO GPU passes in ONE context (the one-GL-per-route budget holds); the `shouldContinue` gate already covers the
  aurora drift, and PRM freezes both passes to one composite (GOLDEN §7). This is budget-honest — confirm the
  WebGL2-tail degrades the aurora pass to the static `auroraFallbackGround` mesh (near-free) rather than dropping
  the ground.
- **The FPS-based quality ladder is the ONE real SOTA gap (booked, not a BG wave).** §1 flagged that award
  portfolios ship runtime FPS-driven quality scaling; the suite has fixed budget-DPR clamps + static-mesh
  fallback but no *runtime frame-time-driven* particle-count / tap-count ladder. This is a `createCanvasLifecycle`
  leaf enhancement (a frame-time EMA → a quality scalar the viz reads), a genuine ≥2-consumer primitive (every
  viz would consume it). **BOOK as a fold-candidate note for the orchestrator (SEED "no self-inserted row"
  fence): `W-VIZ-ADAPTIVE-QUALITY` — a substrate-leaf frame-time quality scalar. NOT a BG wave; the budget-DPR
  clamp + static-mesh fallback are the shipped floor.**

---

## 6 · First-principles synthesis — the F9 wave GOLDENs, self-challenged

The greenfield loop is already done per-viz. This section applies the SEED's "self-challenge (what breaks it,
what's contrived)" to the F9 GOLDENs as a set, so the KS spec inherits the reconciled answers.

**The GOLDEN choice per headline wave (with the strongest self-challenge answered):**

- **6.6 `W-DOTFLOW-REBUILD` → `mode:"flow"` (AURORA CURRENT) default + `mode:"field"` kept.**
  *Challenge:* two modes on one component is a fork risk. *Answer:* the dock `dim`-idiom discipline — ONE schema,
  orthogonal mode-scoped lever sets, no fork; the `field` evaluator is byte-untouched under `proof:viz-dotflow`,
  the `flow` integrator is the new math (carved out of the fence explicitly, GOLDEN §1.2). ADOPT.
  *Contrived-check:* the technicolor ramp is a DEMO preset (F5 warm-library fence holds); the cursor vortex is
  the SOTA differentiator, not a gimmick. Clean.
- **`W-AUR-METAL-FINISH` → `finish:{metal,metal-gradient}` at `uMedium 8/9`.**
  *Challenge:* a new metal could read as a tinted orientation-map (streak-only) or as plastic (crest-only).
  *Answer:* the two-term BRDF (streak × crest) with the coherence gate is exactly why BOTH terms are required —
  the spike proves it folds (25×). ADOPT. *Contrived-check:* the metal is built from the engine's OWN discarded
  gradient (zero new taps) — the opposite of contrived; it is the deftest possible move.
- **`W-AUR-IMAGE-SOURCE` → `source:"image"` on `<Aurora>` (not a `<BlurredImage>` fork).**
  *Challenge:* is a photo-source a different component? *Answer:* no — it is a color-stage swap on the existing
  drift/substrate/lifecycle; the blur zones drift like aurora nuclei (the deft union). ADOPT. *Contrived-check:*
  shares the ONE texture-upload primitive with dot-image (DRY, ≥2 consumers). Clean.
- **6.9 `W-BLOB-KINEMATICS-LEAF` + goo-blob mercury-colony.**
  *Challenge:* re-basing the orbit to 0.30 could blow the calm-lean ceiling (0.10) — the whole reason the
  never-leaves-reach clamp existed. *Answer:* the fission-topology CPU spike answers this headlessly (2→1→2 +
  centroid stays lean-safe); the split is a MOTION read (geometry-driven necking), not a band-width read, so it
  sidesteps the AZ.W-BLOB-STUDIO D2 lean-regression trap. ADOPT. *Contrived-check:* the kinematics carve (6.9)
  is a pure colocation drain (`useBlobSatellites.ts:533` → a leaf), zero behavioral change — clean.
- **6.8 `W-GOODOT-SETUP-SPLIT` + goo-dot liquid-field.**
  *Challenge:* the neck-ridge (weld = fattest dots) is an inversion of the SOTA gradient-thinning weld — is it
  right? *Answer:* yes, and it is a genuine first-principles advance: in a dot grid, thinning reads as vanishing,
  so the SOTA weld is perceptually wrong for a halftone; gating the swell on the shallow SDF gradient makes the
  bridge the visual climax. ADOPT. *Contrived-check:* rides the existing `sceneDistG` field (byte-untouched, the
  goo-blob splice) + existing dot lanes — surgical, no fork.

**The ONE cross-cutting first-principles risk (flagged for the KS spec):** all five headline viz assume the
substrate readback works. §2.1 flagged `preserveDrawingBuffer:false` is still live. The KS-PROCEDURAL spec's R0
across the whole family is: **fix the substrate readback FIRST (6.1's neighborhood or a 6.6 precond), or every
paired-engine π on the WebGL2/Safari-real path is born-unmeasurable.** This is the single most important
correction this report makes to the GOLDENs' assume-fixed premise.

---

## 7 · The perceptual + perf numbers the build needs (the calibration ledger)

Consolidated from SOTA + the GOLDEN spikes, flagged corpus-verified vs SOTA-guidance vs proposal-to-calibrate.

| lever | value | source | status |
|---|---|---|---|
| dot-flow-field particle count (default) | ~8–12k (ceiling `MAX_PARTICLES 16384`) | GOLDEN spike ran 16384@60fps; semisignal WebGL 10k band | corpus-verified |
| dot-flow-field trail decay | ~0.93/frame, **frame-rate-normalized** `decay^(dt/16.67)` | SOTA feedback-trail 0.90–0.96; GOLDEN §3.3 0.90–0.94 | proposal — the FR-normalize is a correctness req this report adds |
| dot-flow-field litFrac floor (technicolor-on-near-black) | > 0.06 (spike 0.231) | GOLDEN §6.1 R1 | corpus-verified |
| dot-flow-field meanChroma floor (demo lead) | > 18 (spike 20.2) | GOLDEN §6.1 R4 | corpus-verified; DEMO preset only (F5 fence) |
| kuwahara tap budget | 4 rings × 8 taps = 32 procedural samples, single-pass | CLAUDE.md W-AUR-KUWAHARA; Papari small-kernel 8-sector | corpus-verified |
| kuwahara soft-blend | `1/(1+variance^4)` (NOT hard argmin) | Papari fix; corpus | corpus-verified — do NOT hard-select |
| aurora metal local-contrast fold bar | ≥ 0.020 AND ≥ 1.5× smooth (spike 0.0267, 25×) | aurora GOLDEN §8 | corpus-verified |
| aurora vividness floor (default field) | mean OKLab chroma ≥ 0.045 (spike 0.031→0.057) | aurora GOLDEN §8 | corpus-verified; the ONE deliberate default identity move |
| aurora default palette lift | C:0.10 → C:0.16–0.20, warm hue 45–70 | aurora GOLDEN §2a | proposal — the authored identity, gated by clause 1 |
| image-source blur taps | 3 rings × 8 = 24, compile-time constant, per-fragment radius | aurora GOLDEN §3; kuwahara budget precedent | corpus-verified |
| image-source decode | `{premultiplyAlpha:"none", colorSpaceConversion:"none"}` both backends | NameOcean/Toji.dev SOTA; aurora GOLDEN §3 | corpus-verified — the ONE cross-engine hazard |
| goo-blob fission topology | orbit 0.17→0.30, body 0.22 held; 2→1→2; lean ≤ 0.10 | goo-blob GOLDEN §2A + CPU spike | corpus-verified |
| goo-blob lens IOR | 1.5 (Snell off ⁴√ squircle dome) | goo-blob GOLDEN §2B | corpus-verified |
| goo-dot presence floor | `1/φ²` ≈ 0.382 of rim opacity, default ≈ 0.12 | goo-dot GOLDEN Move 1 | corpus-verified (√φ) |
| goo-dot palette (technicolor re-grade) | C ≥ 0.13, ΔL ≥ 0.18 core/neck/rim | goo-dot GOLDEN Move 3; BA.W-NO-GRAY floor | proposal — library identity evolution (presets-in-consumers carve) |
| Canvas2D crossover (demigrate rule) | Canvas2D < ~few-hundred elements + fast load; WebGL > ~hundreds-thousands | semisignal / 2dgraphs / Demyanov | SOTA-guidance — the demigrate authority |
| WebGL context load penalty | ~40ms vs Canvas2D ~15ms | semisignal | SOTA-guidance — the demigrate first-paint win |
| paired-engine parity ΔE bar | mean ΔE ≤ 2.0, p99 ≤ 5.0 (JND ≈ 2.3) | SUITE §WebGPU-first; `gpu-parity-table.md` | corpus-verified |

---

## 8 · Booked successors (fold-candidate notes for the orchestrator — NOT self-inserted rows)

Per the SEED fence ("a keystone spec that wants a NEW wave records it as a fold-candidate note, never a
self-inserted row"), the SOTA surfaced these as genuine ≥2-consumer primitives the build does NOT need for BG but
that the orchestrator may fold:

1. **`W-VIZ-ADAPTIVE-QUALITY` (substrate leaf).** A runtime frame-time EMA → quality scalar (particle-count /
   tap-count ladder) the viz read. The ONE real SOTA gap vs award portfolios (§1, §5). Every viz consumes it (the
   ≥2-consumer bar is trivially met). The fixed budget-DPR clamp + static-mesh fallback are the shipped floor, so
   this is genuinely optional — but it is the SOTA "FPS-based quality scaling" the award circuit rewards.
2. **`finish:"iridescent"` (aurora thin-film successor).** True view-dependent thin-film over the metal (§2.3).
   REJECTED for BG (fights the warm-cream fence, needs a `V` the field lacks); the metal-gradient twinkle is the
   restrained substitute. Book with its own consumer + fence.
3. **`W-FOURIER-GPU` / `W-CONSTELLATION-GPU` (the demigrate REVERSE).** Already booked in the SUITE with explicit
   triggers (thousands of phasors / a much denser lattice). The SOTA crossover rule (§4) IS the trigger predicate
   — record that the demigrate's own reverse is trigger-gated, so a future dense build re-migrates by the same
   rule that demigrates now. Symmetric, principled.

---

## 9 · Verdict summary (ADOPT/REJECT ledger)

| # | Finding | Verdict | For wave |
|---|---|---|---|
| 1 | Curl-noise + GPGPU trail feedback is 2026 SOTA; corpus math is exact | **ADOPT** | 6.6 |
| 2 | `preserveDrawingBuffer:false` is STILL LIVE — readback born-unmeasurable | **FLAG — R0 precond** | 6.6 / 6.1 |
| 3 | Anisotropic Kuwahara: single-pass-because-procedural is correct + advances the multi-pass SOTA | **ADOPT** | aur-kuwahara (shipped) |
| 4 | Metal two-term BRDF from the discarded gradient + cursor-z light (crosses to WGSL) | **ADOPT** | W-AUR-METAL-FINISH |
| 5 | Achromatic-warm catch-light protects the no-gray fence | **ADOPT** | W-AUR-METAL-FINISH |
| 6 | True thin-film iridescence | **REJECT (book successor)**; metal-gradient twinkle is the lite | W-AUR-METAL-FINISH |
| 7 | Image-source: shared-decode `{premul:none, colorspace:none}` + capture-pair parity (not name-check) | **ADOPT** | W-AUR-IMAGE-SOURCE |
| 8 | Blur is bounded fixed-tap in-shader (24), `source` a build permutation not a runtime branch | **ADOPT** | W-AUR-IMAGE-SOURCE |
| 9 | Bayer8 halftone SOTA + the neck-ridge inversion (weld = fattest dots) advances it | **ADOPT** | 6.8 |
| 10 | Vogel golden-angle phyllotaxis is textbook-correct | **ADOPT (no change)** | dot-matrix (shipped) |
| 11 | Demigrate fourier/constellation → Canvas2D: 2026 crossover rule confirms; `.wgsl` primaries are real dead-weight | **ADOPT** | 6.3 (atomic) |
| 12 | Demand-driven park/PRM/quiescence: corpus's one-leaf discipline is stronger than the typical per-viz | **ADOPT (no change)** | all F9 |
| 13 | FPS-based runtime quality ladder | **BOOK (fold-candidate)** | W-VIZ-ADAPTIVE-QUALITY |
| 14 | Frame-rate-normalized trail decay is a correctness req, not just a tuning lever | **ADD to spec** | 6.6 |

---

## 10 · Source-verify ledger (grepped before citing)

All corpus file:line claims verified live on HEAD `fa6ed40a`:
- `flow.glsl.ts:1,12,17` — `CURL_FBM_GLSL` shared chunk present (basis-agnostic curl). ✓
- `dot-flow-field/composables/flowField.ts` + `shaders/flow-field.{compute.wgsl,render.wgsl,glsl}.ts` — the JS+WGSL+GLSL twins present. ✓
- `usePointerVelocityField.ts` (`src/composables/motion/`) — present (the vortex/burst feeder). ✓
- `useGpuSubstrate.ts:46,52` — `preserveDrawingBuffer:false` STILL LIVE (the GOLDEN's R0 assume-fixed gap — the load-bearing flag of this report). ✓
- `goo-blob/composables/useBlobSatellites.ts`, `metaball.{frag,wgsl}.ts`, `uniformBridgeWGPU.ts` — the kinematics + GL-twin surfaces present (6.9 carve target). ✓
- demigrate scope: `fourier-field/shaders/fourier-field.{compute,render}.wgsl.ts` + `constellation/shaders/constellation-{lines,points}.wgsl.ts` present on disk (6.3 removes these); `useFourierField.ts:29` imports `useGpuSubstrate`; `fourier-field/README.md:7,219` + `constellation/README.md:12` document Canvas2D (doc leads code). ✓
- SUITE doc per-viz verdicts (`PROCEDURAL-SUITE.md` §migration table) — fourier/constellation DO-NOT-MIGRATE with booked triggers; watercolor-dot PERMANENTLY-OUT. ✓

No invented levers; every numeric is flagged corpus-verified / SOTA-guidance / proposal-to-calibrate. The spike
readbacks (aurora 25×, dot-flow 0.231/20.2/10.30, goo-blob 2→1→2) are quoted from the on-disk GOLDENs, not
re-run.

---

## Sources

- [Emil Dziewanowski — Dissecting Curl Noise](https://emildziewanowski.com/curl-noise/)
- [Medium — Creating Chaotic Flow Fields with GPGPU in R3F](https://medium.com/@midnightdemise123/creating-chaotic-flow-fields-with-gpgpu-in-react-three-fiber-f9aad608c534)
- [ostefani.dev — Fluid Simulation in WebGL: the Advection Step](https://ostefani.dev/tech-notes/webgl-fluid-advection)
- [three.js forum — GPGPU Particles showcase](https://discourse.threejs.org/t/gpgpu-particles/90558)
- [Kyprianidis — Anisotropic Kuwahara Filtering on the GPU](https://www.kyprianidis.com/p/gpupro/)
- [Maxime Heckel — On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/)
- [Godot Shaders — Anisotropic Kuwahara Filter (Nov 2024)](https://godotshaders.com/shader/anisotropic-kuwahara-filter/)
- [Shadertoy — Anisotropic Kuwahara filtering](https://www.shadertoy.com/view/DtKczW)
- [Enterprise PBR Shading Model 2025x](https://dassaultsystemes-technology.github.io/EnterprisePBRShadingModel/spec-2025x.md.html)
- [OpenPBR: Layered Physical Shading Model](https://www.emergentmind.com/papers/2512.23696)
- [Belcour — Practical Extension to Microfacet Theory for Varying Iridescence (thin-film)](https://belcour.github.io/blog/slides/2017-brdf-thin-film/slides.html)
- [Real-time Image-based Lighting of Microfacet BRDFs with Varying Iridescence](https://www.researchgate.net/publication/334397646)
- [Wikipedia — Ordered dithering](https://en.wikipedia.org/wiki/Ordered_dithering)
- [Grokipedia — Ordered dithering](https://grokipedia.com/page/Ordered_dithering)
- [Godot — Bayer Dithering Shader (2025)](https://godotengine.org/asset-library/asset/4005)
- [Shadertoy — Ordered Dithering (Bayer)](https://www.shadertoy.com/view/7sfXDn)
- [NameOcean — The Hidden Complexity of Web Image Loading: WebGL and WebGPU](https://nameocean.net/article/the-hidden-complexity-of-web-image-loading-a-developers-guide-to-webgl-and-webgpu/)
- [Toji.dev — WebGPU img/canvas/video Textures](https://toji.dev/webgpu-best-practices/img-textures.html)
- [gpuweb #4356 — copyExternalImageToTexture blank-result hazard](https://github.com/gpuweb/gpuweb/discussions/4356)
- [semisignal — A look at 2D vs WebGL canvas performance](https://semisignal.com/a-look-at-2d-vs-webgl-canvas-performance/)
- [2dgraphs.netlify.app — WebGL vs 2D Canvas Comparison](https://2dgraphs.netlify.app/)
- [Demyanov — Past and future of HTML Canvas: 2D, WebGL, WebGPU](https://demyanov.dev/past-and-future-html-canvas-brief-overview-2d-webgl-and-webgpu)
- [MDN — Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- [MDN — Window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
- [fsjs.dev — Advanced requestAnimationFrame Techniques](https://fsjs.dev/beyond-basics-requestanimationframe-techniques-game-development/)
- [Index.dev — Web Design Trends 2026: AI, 3D, Ambient UI & Performance](https://www.index.dev/blog/web-design-trends)
- [Muzli — Web Design Trends 2026](https://muz.li/blog/web-design-trends-2026/)
- [School of Motion — 10 Websites with Great Animation in 2026](https://www.schoolofmotion.com/blog/10-websites-with-great-animation-in-2026)
- [MDX — WebGL Development 2026](https://mdx.so/blog/webgl-development-how-to-build-immersive-3d-web-experiences-in-2026)
- [Awwwards — Best WebGL Websites](https://www.awwwards.com/websites/webgl/)
- [Awwwards — 30 Experimental WebGL Websites](https://www.awwwards.com/30-experimental-webgl-websites.html)
