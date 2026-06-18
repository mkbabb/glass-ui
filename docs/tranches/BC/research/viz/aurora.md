# BC viz research — AURORA (the painterly procedural gradient, WebGPU-first, Safari-OK)

> **Iteration** BC 1d · **Status** AUTHORED 2026-06-18 · **Mandate** re-modernize aurora from
> first principles — WebGPU-first, Safari 26+ OK, full configurator + comprehensive demo suite,
> ZERO `src/` edits (research only). **Substrate-grounded** against
> `src/components/custom/aurora/**` + `src/composables/glass/**` at HEAD, web SOTA refreshed
> June 2026. Every claim carries a `file:line` or a URL.

---

## 0 — TL;DR (the verdict + the headline fix)

Aurora is the SUITE's most-migrated viz (rank 1, `PROCEDURAL-SUITE.md`) — the WGSL primary
`aurora.wgsl.ts` + the byte-untouched WebGL2 fallback `aurora.frag.ts` both ship, the shared
`procedural-color.wgsl.ts` color chunk closes cross-backend drift, the math is real-cited
(fbm domain-warp + anisotropic-Gaussian softmax nuclei + OKLCh palette + PBR-Neutral tonemap +
single-pass anisotropic-Kuwahara). **The substrate axis is SOTA-shaped. The DEFECTS the user
walked (§E) are NOT shader defects — they are FOUR wiring/placement/perf bugs, each grounded:**

1. **"renders SLOW / TOTALLY broken"** — TWO root causes. (a) The **substrate-picker presence-bug**
   (`useGpuSubstrate.ts:91` commits WebGPU on `navigator.gpu != null` alone, never
   `requestAdapter()`; on an adapter-less host it throws `no GPU adapter` with NO fallback —
   `useWebGPUCanvas.ts:243-245`). (b) the `"auto"` render-mode falls to a **dead static `"css"`**
   on `hardwareConcurrency <= 4` OR `prefers-reduced-motion` OR `saveData` (`renderMode.ts:145-160`)
   — a low-core laptop or a PRM user gets a frozen gradient that reads as "broken."
2. **"previews NEVER render (dark dead cards)"** — the thumbnail bake calls `aurora.renderAt(1.0)`
   SYNCHRONOUSLY right after `createAurora(…, {mode:"capture"})` (`usePresetThumbnails.ts:84-87`),
   but on the WebGPU backend `renderAt` is a **no-op until `armAsync()` resolves the device**
   (`useWebGPUCanvas.ts:175,302`) — and the capture path never awaits `armAsync`. Blank webp → dead card.
3. **"configurator MISPLACED — must be on the RIGHT on desktop"** — the studio's
   `<Configurator>` `stage`/`controls` slot order + CSS does not pin controls right
   (`demo/stories/substrates/aurora.vue:146-167`); this is a demo-layout fix, library `<Configurator>`
   already exposes the two slots.
4. **"NOT rounded"** — the studio frame composes `<Configurator>` but the `.aurora-root` WebGL
   surface clips to its own box (`Aurora.vue:218` `contain:content` + `overflow-hidden`), and the
   stage tile has no `border-radius` reaching the canvas; the rounded clip must land on the
   canvas-bearing wrapper.

The shader is good; **the plumbing is the work.** This doc designs the WGSL-first kernel (already
landed, with the medium port booked), the perf fix, the picker fix, the full configurator axes,
the comprehensive demo suite, and the velocity+acceleration interaction model — each cited.

---

## 1 — The current state (grounded inventory)

### 1.1 — The render path (substrate-AGNOSTIC, WebGPU-first)

`createAurora` (`composables/runtime.ts:147`) composes `createGpuSubstrate`
(`runtime.ts:222`) — the picker over the ONE `createCanvasLifecycle` leaf
(`src/composables/glass/webgl/createCanvasLifecycle.ts`). The picker
(`useGpuSubstrate.ts:87`) selects WebGPU when `supportsWebGPU() && setupWGPU != null`,
else WebGL2. Both backends expose the identical handle
(`arm/armAsync/suspend/resume/wake/renderAt/dispose/reducedMotion`,
`useGpuSubstrate.ts:67-80`), so the loop wiring is byte-identical across backends. The
WGSL setup is `createAuroraWGPUSetup` (`wgpuSetup.ts:55`); the GLSL setup is the inline
`setupGL` (`runtime.ts:247`).

- **The WGSL primary** `constants/shaders/aurora.wgsl.ts` (12.9 KB) — the full-screen-triangle
  `vs_main` (no vertex buffer, `aurora.wgsl.ts:283-294`), the `fs_main` transcription
  (`aurora.wgsl.ts:297-344`): `domainWarp` (Quilez double-warp + 3 warp modes + cursor swirl,
  `:146-189`), `nucleiField` (anisotropic-Gaussian softmax + drift + palette drift, `:205-245`),
  `samplePalette` (the shared OKLCh ramp LUT, `:192-200`), the breath wobble, `saturate3`
  (OKLCh chroma trim, `:253-257`), the PBR-Neutral `aces` (`:260-275`), the film grain, the
  `linearToSrgb` OETF, the IGN display-space dither. The Uniforms struct (`:52-71`) is the
  typed-struct source-of-truth mirrored by `uniformBridgeWGPU.ts`.
- **The WebGL2 fallback** `constants/shaders/aurora.frag.ts` (20 KB) — the byte-untouched
  full-fidelity path that ALSO carries the painterly mediums (uMedium 1-7:
  pastel/watercolor/oil/crayon/vangogh/oil-pastel/kuwahara, spliced from `mediums.glsl.ts` +
  `oil-modes.glsl.ts` + `vangogh-medium.glsl.ts` + `brush.glsl.ts`).

### 1.2 — The KNOWN scope gap (recorded honestly)

The WGSL primary renders the **smooth core only** — the painterly mediums (uMedium 1-7) are NOT
in `aurora.wgsl.ts` (`aurora.wgsl.ts:320-322`: "a painterly medium renders the smooth core").
The booked successor is **W-AURORA-WGPU-MEDIUMS** (`PROCEDURAL-SUITE.md` Named successors). So on
a WebGPU device a `medium:"kuwahara"`/`"vangogh"` config degrades to smooth; the full painterly
register today rides the WebGL2 fallback. **This is the single biggest first-principles gap to
close in BC** (the user's "WebGPU EVERYWHERE … NO FALLBACKS" mandate makes the medium-less WGSL
primary insufficient — the painterly mediums must port to WGSL, see §4.4).

### 1.3 — The configurator surface (the ≤7-atom door)

The consumer-facing control surface is `resolveAtoms` (`composables/atoms.ts:102` `AuroraAtoms`):
COLOR (`seed` + `harmony` + `colorEnergy`), ZONES (`count` + `arrangement`), NOISE (one knob),
MEDIUM (+ texture amount), MOTION (`still`/`breathing`/`drifting`), INTERACTIVITY (`light`/
`scroll`). The full `AuroraConfig` (`constants/presets.ts`) is the internal author schema. The
demo studio binds `useConfiguratorState<AuroraConfig>` with `cloneMode:"per-preset"`
(`demo/stories/substrates/aurora.vue:55-59`) so slider edits survive a preset round-trip.

### 1.4 — The interaction model (cursor velocity + flick burst — NO acceleration yet)

`cursorModel.ts` carries eased position (`CURSOR_POS_LERP 0.22`), strength ramp/decay, smoothed
**velocity** (`velX`/`velY`, `cursorModel.ts:45-49`), and a transient flick **burst**
(`cursorModel.ts:51-56`, `injectCursorVelocity` spikes `burst` by `speed*4`, decays `0.96/frame`).
`domainWarp` reads the cursor as a swirl with radial falloff (`aurora.wgsl.ts:174-187`). **There
is NO acceleration (2nd-derivative) term** — the BC mandate explicitly asks for velocity+accel.
The shared `usePointerVelocityField` primitive (BB.B4, `src/composables/motion/`) ALREADY carries
position+velocity+**acceleration**+flick-burst with a `tick(deltaMs)` push-API, PRM tick(0) freeze
— but aurora is NOT re-pointed onto it (CLAUDE.md: "the aurora/blob pointer models … are NOT
re-pointed — a fold … is a booked successor IFF byte-faithful"). §8 designs the fold.

---

## 2 — THE HEADLINE: WebGPU is Baseline (Jan 2026); Safari 26+ ships it ON. The mandate is VALID; the blocker is the picker.

**Fact (web.dev / Apple / GPUWeb Implementation-Status, June 2026):** WebGPU reached **Baseline
"newly available" in January 2026**. Safari 26 (macOS Tahoe 26, iOS 26, iPadOS 26, visionOS 26)
ships WebGPU **enabled by default**, with `navigator.gpu.requestAdapter()` available — Apple's
impl builds on Metal (high perf, low battery) [S1][S2][S3]. This DIRECTLY validates the user's
directive: *"WebGPU is present EVERYWHERE (as long as it works on Safari) — ALL animations use it.
NO FALLBACKS."* — **it works on Safari now.**

**The two real holes (the WebGL2-fallback's ONLY remaining job)** [S4][S5]:
- **Linux Firefox / Linux Chromium** — WebGPU is behind `chrome://flags/#enable-unsafe-webgpu`;
  Mozilla expects Linux WebGPU "in 2026, not yet stable."
- **Pre-A12 iPhones + older Apple OS** — devices on macOS/iOS BEFORE 26 install Safari but ship
  WebGPU off; "anyone on a previous OS gets no GPU at all."

The cited SOTA pattern reconciles the user mandate with reality: web.dev verbatim —
*"adopt WebGPU as a progressive enhancement, detect support at runtime, and provide WebGL …
fallbacks … Always feature-detect `navigator.gpu` and **ship a WebGL 2 fallback inside the same
render path**"* [S3]. So **KEEP the WebGL2 fallback** — but for the holes the user explicitly
doesn't care about (Linux-Firefox / pre-2026-Apple), NOT as a Safari-26-gets-the-broken-path
escape. On Safari 26+ the user gets WebGPU, full stop. The fallback is invisible to the mandate.

### 2.1 — THE PICKER BUG (D8 root, GROUNDED — the #1 "totally broken" cause)

`supportsWebGPU()` (`useWebGPUCanvas.ts:50-56`) is a **synchronous presence check only**:
```ts
return typeof navigator !== "undefined" && "gpu" in navigator && navigator.gpu != null;
```
It NEVER calls `requestAdapter()`. The picker commits the backend at construction
(`useGpuSubstrate.ts:91` `useGpu = supportsWebGPU() && options.setupWGPU != null`). On a host
where `navigator.gpu` exists but `requestAdapter()` returns null (headless, software/SwiftShader,
locked-down, some VMs, the demo CI), the picker selects WebGPU, then `armAsync()` hits
`useWebGPUCanvas.ts:243-245`:
```ts
const adapter = await navigator.gpu.requestAdapter(options.adapterOptions);
if (!adapter) throw new Error("[useWebGPUCanvas] no GPU adapter");
```
and **THROWS with NO fallback** — the backend was already committed synchronously. This is the
literal `no GPU adapter` PAGEERROR the BC audit observed on blob/dot-flow/concentric. **"present"
≠ "adapter available."**

**The FIX (the SOTA pattern, cited [S3], the try-then-rebuild shape):** the picker must do an
ASYNC adapter-real probe before commit, OR a try-WebGPU-then-rebuild-WebGL2:
1. **Async probe:** `supportsWebGPUReal()` = `navigator.gpu != null && (await
   navigator.gpu.requestAdapter()) != null` — cached, one probe per page; the picker awaits it
   before choosing.
2. **Try-then-rebuild (the more robust shape):** the picker attempts `armAsync()` on the WebGPU
   leaf inside a `try`; on ANY init failure (no adapter, device-lost-at-birth, validation throw,
   `onInitError` fire) it disposes the WebGPU leaf + rebuilds on the WebGL2 leaf — the documented-
   but-undelivered graceful degrade. This ALSO catches a device that creates then immediately
   loses (the imgui Safari/WASM device-lost class [S5]).

This is a `src/composables/glass/webgpu/` fix that benefits ALL viz, not aurora-local — aurora's
research names it because aurora is the worst-hit (full-viewport hero). The BC gate must measure
**a real on-host `meanLum > 0` on an adapter-less host (the fallback fires) AND on a WebGPU host
(the primary paints)** — the BB "structural-proxy ΔE 0.0" only proved the CPU evaluator matches
itself; it never proved the WGSL path paints on a real device or that the fallback fires.

### 2.2 — THE DEAD-STATIC `"css"` FALL (the #2 "renders slow/broken" cause)

`resolveRenderMode("auto", …)` (`renderMode.ts:121-161`) falls to a **static, dead CSS gradient**
when `hardwareConcurrency <= 4` OR `prefers-reduced-motion` OR `saveData`
(`renderMode.ts:145-160`). The intent was a low-power reprieve, but:
- `hardwareConcurrency <= 4` is FALSE-POSITIVE-prone in 2026 (many capable laptops report 4
  logical cores; a base-M-series MacBook reports 8 but a throttled/VM tab can read 4). A capable
  Safari-26 user gets a frozen gradient that reads as "the aurora is broken."
- The PRM fall is double-handled — the substrate ALREADY freezes to ONE static frame under PRM
  (`createCanvasLifecycle` live-monitors `matchMedia`, `PROCEDURAL-SUITE.md` discipline). The
  render-mode `"css"` fall is redundant AND worse (it never arms WebGPU at all, so an un-reduce
  mid-session cannot wake it; the substrate's PRM freeze re-arms on un-reduce).

**The FIX:** retire the `hardwareConcurrency`/`saveData` heuristics from `"auto"` (they predate
the offscreen-park + DPR-cap + demand-gate that make a full-viewport aurora cheap). PRM is handled
by the substrate's live freeze, NOT a render-mode fall. The ONLY `"css"` signal that stays is the
genuine software-raster guard (`isSoftwareWebGLRenderer`, the headless-hang fix
`renderMode.ts:37-62`) — and even that is subsumed by the §2.1 try-then-rebuild (a software
WebGL2 raster is the headless-hang the guard catches; the picker's adapter-real probe + fallback
covers the WebGPU-software case). Aurora should arm WebGPU on every Safari-26/Chrome-113 device.

---

## 3 — The cited SOTA technique set (the math, each referenced)

The shader pipeline is GENUINELY SOTA. This section records each technique WITH its canonical
source so the BC impl wave DEEPENS rather than re-discovers (the technique set is FIXED here).

### 3.1 — Domain warping (Quilez) — the organic-boundary carrier

`domainWarp` (`aurora.wgsl.ts:146-189`) is Quilez's double domain-warp: `f(p + g(p))` where
`g(p) = fbm(p + fbm(p))` — two nested fbm calls per axis (`:155-158`). The technique is Quilez's
canonical "Domain Warping" [S6]: `q = fbm(p)`, `r = fbm(p + 4q)`, `warped = p + amount*r`.
Turbulence (sharp valleys via `abs(noise)`) is the variant Quilez names for ridged structure [S6].
**The three warp modes** (`aurora.wgsl.ts:160-171`): `fbm` (default, smooth), `cellular`
(Worley f1, chunky territories), `hybrid` (averaged). The OPT-IN `warpMode:"curl"` (the
divergence-free 2D curl of an fbm potential, Bridson 2007 [S7]) is the `.frag`-only 4th mode
(CLAUDE.md BB.B1) via the shared `flow.glsl.ts` `CURL_FBM_GLSL` chunk — `curl = (∂ψ/∂y, −∂ψ/∂x)`,
the `(g.y, -g.x)` cross-pairing of central-difference partials. The WGSL curl is BOOKED (the WGSL
warp dispatch falls through to fbm for `warpMode==3`, byte-equivalent default).

### 3.2 — fbm / fractional Brownian motion — the noise basis

`fbm` (`aurora.wgsl.ts:106-118`) is the canonical sum-of-octaves: `v += a*vnoise(p); p =
ROT*p*2.02; a *= 0.5` — 2.02 lacunarity, 0.5 gain, the `FBM_ROT` rotation matrix decorrelates
octaves (Quilez fbm [S8], Book of Shaders Ch.13 [S9]). The octave count is uniform-driven
(`u.ints0.w`, 1-5).

### 3.3 — Anisotropic-Gaussian softmax nuclei field — the color-zone placement

`nucleiField` (`aurora.wgsl.ts:205-245`) is a softmax-weighted anisotropic-Gaussian blend: each
nucleus contributes `w = exp(-β·d²/r²)` where `d²` is computed in the nucleus's LOCAL frame
(rotated by `angle`, elongated by `elong`, `:226-231`) — an ELLIPTICAL Gaussian. The
softmax-β (`u.scalars0.y`) controls how sharply the dominant nucleus wins. Drift orbits each
nucleus on `(cos, sin)` of `t·nucleiDrift` (`:221-224`). This is the mesh-gradient register —
the "Apple-style"/OpenAI mesh gradient is exactly a smooth multi-nuclei field [S14]. The
DC-suppression discipline (no figure-sized stationary disc) is honored by construction.

### 3.4 — OKLCh palette interpolation — the perceptual color ramp

`samplePalette` (`aurora.wgsl.ts:192-200`) does per-stop linear interpolation through
`samplePaletteRamp` (the shared `PALETTE_RAMP_WGSL` chunk), with a `huePath` axis
(`u.ints1.y` — shorter/longer arc). This is the OKLCh "better gradients" canon [S10][S11]: sRGB
interpolation greys the midpoint (a warm→cool lerp passes through dead grey); OKLCh stays
saturated and lets the hue ARC be chosen (`shorter`/`longer`/`increasing`/`decreasing`) [S11].
**The value.js 0.13.0 `sampleColorRamp(from, to, n, {space:"oklab", hueMethod})` is the NOW-
consumable single-source baker** (`kf-vjs-facilities.md §2.1`, machine-verified callable) — the
aurora nuclei LUT + the demo palette tables should consume it, not hand-roll the ramp (ONE color
source, `proof:single-color-core`). The shared `procedural-color.wgsl.ts` / `.glsl.ts` chunks
keep the WGSL primary ↔ GLSL fallback color math byte-identical (`PROCEDURAL-SUITE.md`).

### 3.5 — Anisotropic-Kuwahara painterly finish (Kyprianidis 2010) — the "reads as oil paint" finish

The SOTA painterly finish is the SOFT polynomial-weighted anisotropic-Kuwahara (Kyprianidis,
Kang, Döllner 2009/2010 [S12][S13][S17]). The current `medium:"kuwahara"` (uMedium 7, `.frag`
only, default-OFF, CLAUDE.md BB.W-AUR-KUWAHARA) is single-pass procedural: `mediumKuwahara()`
re-samples the base field over an ELLIPTICAL kernel (4 rings × 8 angular taps = 32 procedural
samples) oriented along the EXISTING single-pass `structureTensorField`, 8 overlapping sectors,
blended by `1/(1+variance⁴)` (the SOFT criterion → no 8-spoke pinwheel by construction).

**The cited recipe (Maxime Heckel's 2025 WebGL impl [S18], citing Papari/Kyprianidis):**
- **Structure tensor** from Sobel gradients: `J = [[dot(Sx,Sx), dot(Sx,Sy)], [dot(Sx,Sy),
  dot(Sy,Sy)]]`, Gaussian-smoothed [S18].
- **Eigendecomposition** → orientation (eigenvector) + anisotropy `A = (λ₁−λ₂)/(λ₁+λ₂)` → the
  kernel is an ELLIPSE squeezed+rotated to the local feature (isotropic where A≈0) [S13][S18].
- **8 sectors** (Papari) over the (elliptical) disk; per-sector weighted mean + variance.
- **Polynomial weighting** `f(x,y) = [(x+η) − λy²]²`, η=0.1, λ=0.5 — the cheap replacement for the
  "quite expensive" Gaussian sector weights [S18].
- **The SOFT blend** `Σ(mean_i · 1/(1+var_i^q)) / Σ(1/(1+var_i^q))`, q≈8 (the in-repo finish uses
  q=4) — replaces the pre-2010 HARD `argmin(variance)` that BANDS flat gradients into the 8-spoke
  pinwheel [S13][S17]. **This is the keystone WGSL port** (§4.4): aurora is a PROCEDURAL field, so
  the operator needs NO FBO (it re-samples `sampleBase` procedurally) — it ports to WGSL fragment-
  stage cleanly, no multi-pass ping-pong, no new rAF, `proof:offscreen-pause` untouched.

### 3.6 — PBR-Neutral tonemap (Khronos) — the designed-backdrop tonemap

`aces` (`aurora.wgsl.ts:260-275`, named for the slot, body is Khronos) is the Khronos PBR-Neutral
tonemap [S16] — hue+saturation preserving over the [0,1] designed-backdrop range, the right
choice vs Narkowicz ACES (which skews saturated blue→magenta). 13 lines, texture-free.

### 3.7 — Turbulence-cascade eddy-size prior (Ma et al. 2024) — the falsifiable "arresting" metric

The in-repo `RESEARCH.md` operationalizes "arresting" against the −5/3 Kolmogorov luminance power
spectrum measured in van Gogh's Starry Night (Ma et al., Physics of Fluids 2024 [S15]): the
painterly mediums target a radial power-spectrum slope ∈ [−1.85, −1.45] + Hasler-Süsstrunk
colorfulness ∈ the reference band + structure-tensor coherence A ∈ band
(`scripts/aurora-arresting-metric.mjs`). BC INHERITS this falsifiable bar for the painterly
medium WGSL port (the smooth default keeps the calmer mesh-gradient pole).

---

## 4 — The WGSL-first kernel design (the compute/fragment + the kernel + the uniforms)

### 4.1 — Stage shape: FRAGMENT, full-screen triangle (NOT compute)

Aurora is a fullscreen procedural FIELD — every pixel is `f(uv, t, uniforms)` with no
inter-pixel dependency, no particle state, no FBO. The right WGSL shape is a **fragment pass over
the full-screen triangle** (`vs_main` emits the covering triangle `(-1,-1),(3,-1),(-1,3)` with no
vertex buffer, `aurora.wgsl.ts:283-294`). This is ALREADY the landed shape. **No compute pass is
warranted** — a compute kernel buys nothing for a per-pixel field with no shared state (compute
is the right tool for dot-flow-field's particle advection, NOT aurora's field). The
single-fragment-pass keeps the one-draw/one-shader loop the offscreen-park + demand-gate own.

### 4.2 — The kernel (the `fs_main` pipeline, in order)

`uv → domainWarp(uv, t) → nucleiField(p_warp, t) → samplePalette(id) → value/breath mod →
[MEDIUM operator] → saturate3 → aces (PBR-Neutral) → film grain → linearToSrgb (OETF) → IGN
dither → premultiply` (`aurora.wgsl.ts:298-344`). Everything before the OETF runs in LINEAR
light (the single-OETF-close discipline). The MEDIUM operator slot is the only gap (§4.4).

### 4.3 — The uniforms (the typed-struct source-of-truth — the std140/WGSL alignment trap closed)

The `Uniforms` struct (`aurora.wgsl.ts:52-71`) packs scalars into vec4 lanes (16-byte stride, no
std140 stride trap), with per-nucleus rows (`nuc0/nuc1/nuc2`, MAX_NUCLEI=6) and palette stops
(`palette`, MAX_STOPS=8) each a vec4 lane. The JS ArrayBuffer write offsets are generated from
the SAME table (`uniformBridgeWGPU.ts` `packAuroraWGPUUniforms`), so a misalignment is caught by
a parity-ΔE blowout, never read as garbage (`aurora.wgsl.ts:26-29`). **BC keeps this contract** —
any new medium uniform (the Kuwahara radius/sectors, a new warp param) extends BOTH the WGSL
struct AND the JS pack table in lockstep (the typed-struct discipline).

### 4.4 — THE KEYSTONE PORT: the painterly mediums to WGSL (close the "smooth-only" gap)

The user mandate ("WebGPU EVERYWHERE … NO FALLBACKS") makes the medium-less WGSL primary
insufficient — a `medium:"vangogh"`/`"kuwahara"` config on Safari 26 must NOT silently degrade to
smooth. **BC ports the painterly medium bodies to WGSL** (the booked W-AURORA-WGPU-MEDIUMS,
fired). The port is mechanical (the GLSL bodies in `mediums.glsl.ts`/`oil-modes.glsl.ts`/
`vangogh-medium.glsl.ts`/`brush.glsl.ts` transcribe to WGSL — same math, WGSL syntax), and the
two `fwidth()` sites (the AA-edge + the structure-tensor variance clamp) become WGSL fragment-
stage `fwidth()` (the goo-blob WGSL precedent already did exactly this, `PROCEDURAL-SUITE.md`
goo-blob row). The single-pass anisotropic-Kuwahara (§3.5) is the highest-value port — it is the
"reads as oil paint" finish and needs no FBO on a procedural field. **The parity bar:** the
WGSL-medium render and the GLSL-medium render measure within the calibrated OKLab ΔE band
(mean ≤ 2.0, p99 ≤ 5.0, `PROCEDURAL-SUITE.md`) on a real GPU, AND the painterly statistics floors
(slope/colorfulness/coherence, `RESEARCH.md §4`) hold on the WGSL path.

---

## 5 — The WebGL2 fallback (where WebGPU is genuinely absent)

**KEEP the WebGL2 fallback `aurora.frag.ts`** — but its job is narrowed to the two genuine holes
(§2): **Linux Firefox/Chromium (WebGPU flagged) + pre-A12 iPhones / pre-26 Apple OS** [S4][S5].
On Safari 26+ / Chrome 113+ / Firefox 141+ the user gets WebGPU; the fallback is invisible to the
mandate. The fallback fires via the §2.1 try-then-rebuild picker fix (an adapter-less or
device-lost-at-birth host rebuilds on the GLSL leaf), NOT the current presence-bug throw. The
shared `procedural-color.glsl.ts` ↔ `procedural-color.wgsl.ts` chunks keep the two paths' color
math byte-identical. **Do NOT retire the fallback** (`proof:gpu-substrate-single` clause B blocks
a premature retire while the ~5-10% tail is open — Linux Firefox + pre-A12). The fallback ALSO
remains the certify-grade headless ground (the `auroraFallbackGround` luminance-faithful raster,
`auroraFallbackGround.ts`, for the headless contrast capture). **NONE** is NOT the answer: Safari
26 IS covered by WebGPU, but the fallback is still load-bearing for the holes the user excluded
("as long as it works on Safari") + the headless certify path.

---

## 6 — The full configurator axes (the tunable params the configurator exposes)

The configurator is the ≤7-atom door (`atoms.ts`) PLUS the per-preset clone. The full tunable
surface, grouped (each maps to a co-varying config cluster — moving one knob moves the entangled
axes so no single change reads as a defect):

- **PALETTE** — `seed` (a `<ColorSwatch>` color input; BA.W-CONFIG-CHASSIS retired the raw
  `<input type=color w-full>` slab), `harmony` (analogous/complementary/triadic/split/mono),
  `huePath` (shorter/longer/increasing/decreasing OKLCh arc), `colorEnergy` (0..1 — co-varies
  saturation + valueVariance + breath + warm/cool temperature), per-stop OklchStop editing (L/C/H
  + position, the `OklchStopRow`).
- **ZONES (nuclei)** — `count` (1..6), `arrangement` (scattered/composed-rule-of-thirds/centred),
  per-nucleus position/radius/elong/angle/paletteBias/valueBias (the `NucleiOverlay` drag-edit:
  alt-click spawns, shift/right-click removes, drag moves — `aurora.vue:99-102`).
- **NOISE / WARP** — `noise` (0..1 — fans warpAmount + warpScale + warpMode-climb + noiseOctaves),
  `warpMode` (fbm/cellular/hybrid/**curl**), `warpScale`, `warpAmount`, `warpDrift`, `noiseOctaves`
  (1..5).
- **MEDIUM** — `medium` (smooth/pastel/watercolor/oil/crayon/vangogh/oil-pastel/**kuwahara**) +
  the textured-medium `amount` (structurally absent for `smooth`, `atoms.ts:74-82`), the
  Kuwahara radius/sector/q knobs (new, §4.4), the stroke orient/mode for the oil family.
- **MOTION** — `motion` (still/breathing/drifting), `nucleiDrift`, `paletteDrift`, `warpDrift`,
  `breathDepth`, `breathPeriod` — ALL bounded to the `AV_LOOP_DURATION` 8-15s drift window
  (`budget.ts:60-61`).
- **INTERACTIVITY** — `light` (cursor-as-light + idle orbit), `scroll` (palette/breath couples to
  scroll), `cursorStrength`, `cursorRadius` (§8).
- **COMPOSITING** — `alpha` (per-pixel pigment opacity), `opacityCeiling` (outer envelope, 1.0
  hero / ~0.5 quiet-content, `Aurora.vue:69-84`), `paperGrain`, `saturation`.
- **SUBSTRATE (debug)** — a backend readout (webgpu/webgl2, from the picker) + a
  `DockBackgroundToggle` pause/play (WCAG 2.2.2, the substrate's pause/resume).

**The placement fix (§E "configurator on the RIGHT on desktop"):** the studio's two-slot
`<Configurator>` (`stage`/`controls`) must lay the `controls` column to the RIGHT of the `stage`
on desktop (a `md:flex-row` with `stage` flex-1 + `controls` fixed-width on the right;
`controls` stacks BELOW on mobile). This is a `demo/stories/substrates/aurora.vue` +
`Configurator.vue` layout fix — the library already exposes both slots
(`aurora.vue:155-166`). **The rounding fix (§E "not rounded"):** the rounded clip
(`rounded-card`/`rounded-panel` + `overflow-hidden`) must land on the canvas-bearing wrapper —
today `.aurora-root` clips to its own box (`Aurora.vue:218` `contain:content`) but the studio
tile around it has no radius reaching the canvas; the stage tile + the Configurator root both
take the rounded clip.

---

## 7 — The comprehensive demo-suite scope (the stories/states)

The user mandate: "each medium + each warp + the painterly hero" + the standardized page idiom
(audacious shrink-on-scroll header with the subpath defined; ONE card with the procedural anim,
not the double-card-with-grid). The demo suite:

- **The painterly HERO** — a full-bleed `medium:"vangogh"`/`"kuwahara"` aurora at the
  `text-display` masthead, the one-color `--motion-accent` violet text-event, the audacious title
  that shrinks-on-scroll (the BC standardized `StoryHeader` cluster + `.scroll-build` /
  shrink-on-scroll, CLAUDE.md W-HIERARCHY2 / W-SCROLL-MOTION). The subpath `Substrates · Aurora`
  is rendered explicitly (the user's "subpath explicitly defined").
- **Medium gallery** — one tile per medium (smooth · pastel · watercolor · oil · crayon · vangogh
  · oil-pastel · kuwahara), each a baked thumbnail (the FIXED `usePresetThumbnails` capture) + a
  live-on-hover full render, BOTH light + dark. The painterly-medium DELTA discipline
  (`RESEARCH.md §4.4`: every medium captured BEFORE/AFTER full-bleed both modes) is the binding
  close.
- **Warp gallery** — one tile per warp mode (fbm · cellular · hybrid · curl), showing the
  organic-boundary character of each.
- **The configurator studio** — the live `<Configurator>` with controls-on-the-RIGHT, all §6 axes,
  the per-preset clone, the rounded frame, the `<ColorSwatch>` seed inputs, the `NucleiOverlay`
  drag-edit, the preset picker row with REAL thumbnails (not dead cards).
- **The interaction demo** — drag-to-swirl + flick-burst, with the velocity+acceleration field
  visualized (§8), PRM-frozen state shown.
- **The motion register demo** — still / breathing / drifting side-by-side (the BA-VJS-2 fix made
  `breathing` perceptible, CLAUDE.md W-STAGE; verify the WGSL path carries it).
- **The compositing demo** — `opacityCeiling` 1.0 (hero) vs 0.5 (quiet-content-over-aurora), the
  alpha pigment-opacity axis.
- **The substrate-honesty demo** — the backend readout (webgpu on Safari-26 / webgl2 on the
  holes) proving the picker fires correctly, the headless certify ground.

Every story rides ONE card with the procedural anim (NOT the double-card-with-grid the user
condemned), the standardized shrink-on-scroll header, ONE GL/GPU context per route (the
one-context budget; `DockStage` precedent).

---

## 8 — The cursor/touch + velocity/acceleration interaction model

The mandate asks for velocity AND acceleration. Aurora's `cursorModel.ts` carries velocity + a
flick burst but **no acceleration term**. The design: **fold aurora onto the shared
`usePointerVelocityField` (BB.B4)** — the suite's ONE pointer-dynamics reader (position +
velocity + **acceleration (the 2nd derivative)** + flick burst, `tick(deltaMs)` push-API, PRM
tick(0) freeze, vue-only/root-barrel-safe, CLAUDE.md §B4). The fold (booked, IFF byte-faithful):

- **The PUSH-API wiring** — aurora already owns its frame loop via `createCanvasLifecycle`; it
  FEEDS the field `tick(deltaMs)` from inside its existing frame callback (the one-loop /
  `proof:offscreen-pause` discipline — NO new rAF, the inverse rule for viz, `kf-vjs §1.6`). The
  raw POSITION is the only event-driven write (PRM-gated, the `createSpecularWriter` precedent);
  velocity + acceleration are DERIVED in `tick` (per-second, so 60/120Hz read the same physical
  velocity).
- **The shader mapping** — the cursor swirl (`domainWarp`, `aurora.wgsl.ts:174-187`) reads
  POSITION (the swirl centre) + VELOCITY (the swirl strength/direction) as today; ACCELERATION
  adds the iOS "liquid" snap-back — a fast flick that DECELERATES (negative accel) gets a transient
  over-warp that springs back, the gel-elastic read the user wants (Apple Liquid Glass "fluidity
  / gel-like flexibility" [S19][S20]). The flick BURST (the transient swirl) is the
  velocity-magnitude spike that decays over ~1s.
- **PRM** — the field FREEZES via a deterministic `tick(0)` snap-to-rest (no live velocity); the
  substrate's frame loop is already PRM-frozen, so the interaction stack converges on the ONE
  suppression seam.
- **Touch** — `pointermove`/`pointerdown` cover touch + mouse uniformly (the field is
  pointer-event driven); `getCoalescedEvents()` smooths high-rate trackpad/pencil moves into the
  velocity estimate (the in-repo `RESEARCH.md` T8 names it).
- **The choreography (ONE clock, keyframes.js)** — the start/transition/end/restart of a preset
  switch or a focus-bloom rides ONE kf clock: a `SpringProgress` (the iOS interruptible re-press
  velocity-continuity, `kf-vjs §1.1`) driving the config-interpolation, OR a `Sequence` (the
  GSAP-Timeline temporal orchestrator, `kf-vjs §1.5`) for a multi-beat reveal, fed `tick(dt)`
  from the SAME canvas loop (NO kf rAF — the one-loop rule). When kf republishes the **Oscillator**
  (the LIGHT looping-phase clock, `kf-vjs §3.1`, currently LOCAL-only past v4.3.0) the
  breath/drift loop re-points onto `osc.tick(dtSec).phase` → a uniform — replacing the raw
  `performance.now()` modulo. This is a by-name cross-repo ask (peer spine `^4.0.0` admits it).

---

## 9 — The acceptance bar (what "fixed" concretely means for aurora)

1. **The picker fires correctly** — WebGPU on Safari 26+/Chrome 113+/Firefox 141+ (real
   `meanLum > 0` on a WebGPU host), WebGL2 on the holes (Linux Firefox / pre-2026 Apple — the
   fallback fires, real `meanLum > 0` on an adapter-less host). NO `no GPU adapter` page-error.
2. **Previews render** — every preset thumbnail is a real baked image (the capture path awaits
   `armAsync` on the WebGPU backend), no dead dark cards.
3. **Configurator on the RIGHT on desktop**, stacked below on mobile; the frame + canvas ROUNDED.
4. **Painterly mediums on WGSL** — `medium:"vangogh"`/`"kuwahara"`/oil-family render fully on
   Safari 26 (no silent smooth-degrade), within the OKLab ΔE parity band + the §4 painterly floors.
5. **The standardized page** — ONE card with the procedural anim, the audacious shrink-on-scroll
   header with the subpath defined, the suffused hierarchy.
6. **Velocity+acceleration interaction** — drag-swirl + flick-burst + the accel snap-back, PRM-
   frozen, on the shared `usePointerVelocityField` + ONE kf clock.
7. **The smooth/wispy DEFAULT unchanged + warm-cream identity** (presets-in-consumers; teal-on-navy
   stays a demo preset, the library default is warm-cream — `proof:aurora-atoms-roundtrip`
   default-preserving). The captured paired DELTA of each medium full-bleed light+dark.

---

## Sources

- **[S1]** [WebGPU now supported in major browsers — web.dev](https://web.dev/blog/webgpu-supported-major-browsers) — Baseline Jan 2026; Safari 26 ships it on by default; "ship a WebGL 2 fallback inside the same render path"
- **[S2]** [News from WWDC25: WebKit in Safari 26 beta — WebKit](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/) — WebGPU shipping in Safari 26 (macOS Tahoe 26 / iOS 26 / iPadOS 26 / visionOS 26), `requestAdapter` available
- **[S3]** [WebGPU API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) — `navigator.gpu.requestAdapter()` is the standard adapter request; progressive-enhancement + feature-detect + WebGL fallback guidance
- **[S4]** [WebGPU Browser Support in 2026 — webo360](https://webo360solutions.com/blog/webgpu-browser-support/) — the two holes (Linux Firefox flagged; pre-A12 iPhones / pre-26 Apple OS ship WebGPU off)
- **[S5]** [WebGPU device-lost on Safari 26 (imgui #9103) — GitHub](https://github.com/ocornut/imgui/issues/9103) — the device-lost-at-birth class the try-then-rebuild picker must catch
- **[S6]** [Inigo Quilez — Domain Warping](https://iquilezles.org/articles/warp/) — `f(p + fbm(p + fbm(p)))` double-warp; turbulence via `abs(noise)`
- **[S7]** [Bridson — Curl-Noise for Procedural Fluid Flow (SIGGRAPH 2007)](https://history.siggraph.org/learning/curl-noise-for-procedural-fluid-flow-by-bridson-houriham-and-nordenstam/) — the divergence-free `v = ∇⊥ψ` curl warp
- **[S8]** [Inigo Quilez — fBM](https://iquilezles.org/articles/fbm/) — sum-of-octaves, lacunarity/gain, rotation decorrelation
- **[S9]** [The Book of Shaders — Fractal Brownian Motion](https://thebookofshaders.com/13/) — fbm/domain-warp foundations
- **[S10]** [Why CSS gradients look grayish: OKLCH — Toolbox365](https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/) — sRGB midpoint-greying vs OKLCh saturation preservation
- **[S11]** [What You Need to Know About CSS Color Interpolation — CSS-Tricks](https://css-tricks.com/what-you-need-to-know-about-css-color-interpolation/) — OKLCh hue-arc (shorter/longer/increasing/decreasing)
- **[S12]** [Image and Video Abstraction by Anisotropic Kuwahara Filtering — Kyprianidis et al.](https://www.kyprianidis.com/p/pg2009/) — the structure-tensor anisotropic Kuwahara, real-time GPU
- **[S13]** [Anisotropic Kuwahara Filtering on the GPU — Kyprianidis (GPU Pro)](https://www.kyprianidis.com/p/gpupro/) — the 8-sector elliptical kernel, anisotropy `A=(λ₁−λ₂)/(λ₁+λ₂)`, the soft blend
- **[S14]** [The 'Apple Style' Explained: Mesh Gradients — Nine Hub](https://nineproo.com/blog/mesh-gradients-backgrounds) — the multi-nuclei mesh-gradient register
- **[S15]** [Ma et al. — Hidden Turbulence in van Gogh's Starry Night (arXiv 2310.03415)](https://arxiv.org/abs/2310.03415) — the −5/3 Kolmogorov luminance cascade (β=1.67±0.13)
- **[S16]** [Khronos — PBR Neutral tone mapper](https://github.com/KhronosGroup/ToneMapping) — the hue+saturation-preserving designed-backdrop tonemap
- **[S17]** [Kyprianidis — Anisotropic Kuwahara with Polynomial Weighting Functions (2010)](https://www.researchgate.net/publication/314039497_Anisotropic_Kuwahara_Filtering_with_Polynomial_Weighting_Functions) — the polynomial sector weights replacing the expensive Gaussian
- **[S18]** [On Crafting Painterly Shaders — Maxime Heckel](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) — the concrete WebGL recipe: Sobel structure tensor, 8 sectors, polynomial weight `[(x+η)−λy²]²` (η=0.1, λ=0.5), multi-pass
- **[S19]** [Apple's Liquid Glass UI: What's New in iOS 26 — TO THE NEW](https://www.tothenew.com/blog/apples-liquid-glass-ui-whats-new-in-ios-26/) — lensing / materialization / fluidity / morphing / adaptivity principles
- **[S20]** [Mastering iOS 26's Liquid Glass — Medium](https://medium.com/@jaikrishnavj/mastering-ios-26s-liquid-glass-a-comprehensive-developer-s-handbook-2bba9965b024) — real-time touch/pointer reactivity, gel-like flexibility
- **glass-ui internal (read at HEAD):** `src/components/custom/aurora/{Aurora.vue, composables/{runtime.ts,wgpuSetup.ts,cursorModel.ts,atoms.ts,auroraFallbackGround.ts}, constants/{renderMode.ts,budget.ts,shaders/{aurora.wgsl.ts,aurora.frag.ts,oil-modes.glsl.ts}}, index.ts, RESEARCH.md, PROCEDURAL-SUITE.md}`, `src/composables/glass/webgpu/{useGpuSubstrate.ts,useWebGPUCanvas.ts}`, `demo/stories/substrates/aurora.vue`, `demo/stories/aurora/usePresetThumbnails.ts`, `docs/tranches/BC/audit/USER-DEFECTS.md §E`, `docs/tranches/BC/research/{procedural-refs.md, kf-vjs-facilities.md}`
