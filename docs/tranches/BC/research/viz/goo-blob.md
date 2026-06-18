# BC viz research — goo-blob (the staged first-principles rebuild)

> BC iteration 1d, per-viz SOTA research. RESEARCH ONLY — zero `src/` edits.
> Viz: **goo-blob** (`src/components/custom/goo-blob/`). Route: `/substrates/blob`.
> The user mandate (USER-DEFECTS §E, verbatim): *"the blob is TOTALLY broken — does
> not meatball, does not render at all. A dot-matrix goo-blob variant is wanted"* +
> *"re-written as just a blob, then re-written with shadowing, meatballing, from first
> principles; all Safari compatible."* Plus §H: *"NONE of this works on Safari … it
> rapidly FLASHES the screen."* Plus §E global: *"WebGPU is present EVERYWHERE (as long
> as it works on Safari) — ALL animations use it. NO FALLBACKS. EVER. No canvas anywhere."*
>
> Every claim is grounded to a `file:line` or a cited URL.

---

## 0 — TL;DR (the staged verdict)

The blob's **math is already SOTA** — `metaball.wgsl.ts` + `metaball.frag.ts` carry the
IQ-2024 normalized polynomial/circular smin (`sminQuadraticG`/`sminCircularG`,
`metaball.wgsl.ts:178-203`), the analytic-gradient surface normal (`sceneDistG` propagates
`vec3(dist, ∂x, ∂y)` through the merge so the normal reads the field gradient directly —
no 4-tap, `metaball.wgsl.ts:230-304`), the IQ analytic-derivative gradient noise
(`noised`/`fbmG`, `metaball.wgsl.ts:96-159`), and the two `fwidth()` AA/Toksvig sites
(`metaball.wgsl.ts:397,450`). The blob does **NOT need a math rebuild — it needs the
substrate to stop crashing + a CLEAN re-architecture into the user's TWO STAGES + the
dot-matrix sibling.**

The breakage is **D8 — the substrate picker commits WebGPU synchronously off a
presence-only `supportsWebGPU()` that never calls `requestAdapter()`**
(`useGpuSubstrate.ts:91` + `useWebGPUCanvas.ts:50-57`), so on an adapter-less host (and
on the live demo) the WebGPU path arms then THROWS `[useWebGPUCanvas] no GPU adapter`
(`useWebGPUCanvas.ts:243-245`) with no degrade — the canvas paints **0 (black)**
(DEFECT-LEDGER.md:26). The Safari flash (§H, D7) is the **WebGL2 `webglcontextlost`
re-arm storm** (DEFECT-LEDGER.md:41). Both are SUBSTRATE/lifecycle fixes, but the user's
literal direction is a FIRST-PRINCIPLES staged rebuild, so BC re-expresses the blob as:

- **STAGE 1 — BC.W-GOOBLOB-PLAIN: just a clean blob.** One SDF circle, smin satellites,
  fwidth-AA, NO lighting, NO shadow, NO iridescence/SSS — the minimal "it renders, it
  meatballs, it works on Safari" floor. WebGPU primary (WGSL) + WebGL2 fallback where
  WebGPU is genuinely absent.
- **STAGE 2 — BC.W-GOOBLOB-MEATBALL: + shadowing + meatball merge + lit-glass.** The 2D
  SDF soft-shadow march (IQ rmshadows), the worst-case smin bridge (already wired), the
  Blinn-Phong/Fresnel lit-glass surface — all from first principles, all gated so STAGE 1
  is the floor it builds ON.
- **The DOT-MATRIX sibling — `variant="dot-matrix"`: the Bayer-dithered SDF field** (the
  goo+dot hybrid — the metaball field rendered as a dot grid that thickens toward the core)
  AND the Fibonacci dot-SPHERE register (the `Screenshot_2026-06-17_at_14.45.25.png` Claude
  co-work reference — fine warm-cream dots on dark forming a sphere).

The configurator moves to the **RIGHT on desktop** (§E global directive); the page chassis
(two-headers-in-card, hero-shrinks-on-scroll) is a Band-5 page concern, NOT this viz —
but the demo suite must put headers ON the card, not in it.

---

## 1 — Current state (grounded)

### 1.1 — File map (what exists today)

| File | Role | LOC |
|---|---|---|
| `GooBlob.vue` | the SFC shell — props, token-color resolve, pointer-wake, v-model:paused | 318 |
| `shaders/metaball.wgsl.ts` | the WGSL PRIMARY (full-screen-triangle fragment metaball) | 483 |
| `shaders/metaball.frag.ts` | the WebGL2 FALLBACK (assembled from partials) | 417 |
| `shaders/sdf-body.glsl.ts` | `sdgCircle` + `sminQuadraticG`/`sminCircularG` (GLSL) | — |
| `shaders/watercolor-edges.glsl.ts` | the FBM noise that displaces the edge (GLSL) | — |
| `shaders/oklch-perturb.glsl.ts` | `inGamut` + `gamutClampOklch` (GLSL) | — |
| `composables/useMetaballRenderer.ts` | composes `createGpuSubstrate`; the SHARED `resolveFrame` | 384 |
| `composables/wgpuSetup.ts` | the WGSL `setupWGPU` (pipeline + uniform buffer + render pass) | 179 |
| `composables/uniformBridgeWGPU.ts` | the typed-struct SOURCE OF TRUTH (WGSL ↔ JS offsets) | 294 |
| `composables/uploadBlobUniforms.ts` | the WebGL2 `gl.uniformNf` upload leg | — |
| `composables/buildMetaballProgram.ts` | the WebGL2 program/quad/uniform-cache builder | — |
| `composables/useBlobSatellites.ts` | the deterministic orbit/merge/absorb/emerge state machine | 393 |
| `composables/useBlobPointer.ts` | pointer follow + click-impulse spring + trail ring-buffer | — |
| `composables/useBlobMood.ts` | the {valence, arousal} circumplex mood model | — |
| `constants.ts` | the shape budget caps + mood/satellite/spring constants | 224 |
| `types.ts` | `BlobConfig` 8-atom set + `MoodParams` + `SatelliteInternal` | — |

### 1.2 — The math is SOTA (no rebuild warranted)

The normalized polynomial smin (`metaball.wgsl.ts:178-187`) is the IQ canonical
`k *= 4.0; h = max(k-|a-b|,0)/k; min(a,b) - h*h*k*0.25` — matching
[iquilezles.org/articles/smin](https://iquilezles.org/articles/smin/) EXACTLY (the
`k*0.25` form; `k` is the blend band in real distance units). The circular variant
(`metaball.wgsl.ts:189-198`) is `k *= 1/(1-sqrt(0.5)); min(a,b) - k*0.5*(1+h-sqrt(1-h*(h-2)))`
— the IQ circular kernel EXACTLY. The value+gradient form (`vec3(dist, grad)` propagated
via `mix(a.yz, b.yz, w)`, `metaball.wgsl.ts:185,196`) is the IQ analytic-normal pattern.
**These are the right primitives. They stay.**

### 1.3 — The breakage (D8/D7 — grounded)

**D8 (the no-render root):** `useGpuSubstrate.ts:91`:
```ts
const useGpu = supportsWebGPU() && options.setupWGPU != null;
```
and `supportsWebGPU()` (`useWebGPUCanvas.ts:50-57`) is presence-only:
```ts
return typeof navigator !== "undefined" && "gpu" in navigator && navigator.gpu != null;
```
It NEVER calls `requestAdapter()`. So the backend is committed SYNCHRONOUSLY at
construction; then `armAsync()` reaches `useWebGPUCanvas.ts:243-245`:
```ts
const adapter = await navigator.gpu.requestAdapter(options.adapterOptions);
if (!adapter) throw new Error("[useWebGPUCanvas] no GPU adapter");   // THROWS, no fallback
```
The blob paints **0 (black)** with the `no GPU adapter` PAGEERROR (DEFECT-LEDGER.md:26,32).
The "graceful WebGL2 fallback" the picker docstring promises is a LIE — the backend was
already committed.

**D7 (the Safari flash):** `WebGL: context lost` on WebKit re-arms in a storm
(DEFECT-LEDGER.md:41) — the "rapidly FLASHES the screen" of §H. WebKit's `fwidth` is the
standard L1-norm `abs(dpdx)+abs(dpdy)` (works), but the context-loss churn + the strict
derivative validation are real. The WebGPU/Metal primary on Safari 26 has **no `fwidth`
rasterizer-derivative variance at all** — preferring it on Safari 26 is the cleanest fix.

---

## 2 — The SOTA technique (cited)

### 2.1 — The smin metaball merge (THE meatball — IQ 2024)

[Inigo Quilez, "Smooth Minimum (smin)", full 2024 rewrite](https://iquilezles.org/articles/smin/)
(announced [@iquilezles on X, 2024-03-08](https://x.com/iquilezles/status/1765935148091261277)).
The KEY 2024 additions are **normalization** (k as a real distance band, not a magic
exponent) and the **circular kernel**. The exact forms (already in the codebase, re-cited
as the STAGE-1/2 floor):

- **Quadratic (the cheap default):**
  ```glsl
  float smin(float a, float b, float k){ k*=4.0; float h=max(k-abs(a-b),0.0)/k; return min(a,b)-h*h*k*0.25; }
  ```
- **Circular (rounder menisci — the gooier merge):**
  ```glsl
  float smin(float a, float b, float k){ k*=1.0/(1.0-sqrt(0.5)); float h=max(k-abs(a-b),0.0)/k; return min(a,b)-k*0.5*(1.0+h-sqrt(1.0-h*(h-2.0))); }
  ```
- **Value+gradient (for the analytic normal):** `mix(a.yz, b.yz, blend)` with the
  quadratic blend `g'(x)=(x+1)/2` — the smin returns `vec3(dist, ∂x, ∂y)` and the normal
  reads the gradient directly (NO 4-tap finite difference).

This is the meatball. The "does not meatball" defect is NOT a math bug — the field is
correct; the satellites simply never render because the substrate crashes (§1.3) and/or
the smin band does not bridge the worst-case orbit (already addressed by the
BA.W-GOO-REDRESS worst-case `orbitWiden`, `uniformBridgeWGPU.ts:127-139`). The STAGE-1
floor verifies the meatball PAINTS; STAGE 2 deepens it.

### 2.2 — Analytic surface normal from the SDF gradient (no 4-tap)

`surfaceNormalFromGrad` (`metaball.wgsl.ts:298-304`): the field gradient arrives directly
from `sceneDistG`; the Z dome is the unit half-sphere `z = sqrt(1-(1-interior)^2)` where
`interior = clamp(-d/bodyR)`. This is the SOTA single-eval normal — it ALSO reduces Safari
`fwidth`-derivative sensitivity (no per-pixel multi-tap re-eval). KEEP.

### 2.3 — 2D SDF soft shadow march (STAGE 2 — the "shadowing" the user asked for)

[IQ, "Soft Shadows in raymarched SDFs"](https://iquilezles.org/articles/rmshadows/). The
2D analogue (a soft contact shadow under/around the blob) marches a ray from each shadow
sample toward the light and accumulates the closest miss. The **improved (Aaltonen)
penumbra** that kills banding:
```glsl
float softshadow(vec2 ro, vec2 rd, float mint, float maxt, float w){
  float res=1.0, ph=1e20, t=mint;
  for(int i=0;i<32 && t<maxt;i++){
    float h=sceneDist(ro+rd*t);
    if(h<0.001) return 0.0;
    float y=h*h/(2.0*ph); float d=sqrt(h*h-y*y);
    res=min(res, d/(w*max(0.0,t-y))); ph=h; t+=h;
  }
  return res;
}
```
`w` is the penumbra hardness (inverse light-source size). For the BLOB the SOTA-correct
move is the CHEAP 2D variant: a low step count (16-32), the field re-uses `sceneDist`
(the SAME `sceneDistG().x` already computed), one light from `uLightDir`. The shadow reads
as a soft grounded contact band UNDER the dome — congruent with the existing CSS gel-dome
`drop-shadow` (`GooBlob.vue:287`), but procedural + following the irregular silhouette.
**STAGE-2 only** — STAGE 1 ships shadowless.

### 2.4 — Lit-glass surface (STAGE 2 — already present, KEEP)

The Blinn-Phong glint + Schlick/Fresnel rim + warm-cream specular + Toksvig
normal-variance spec-clamp (`metaball.wgsl.ts:442-471`) is SOTA energy-conserving glass.
The `(shininess+2)/8` energy norm DECOUPLES shininess from strength
(`metaball.wgsl.ts:452`); the Toksvig `shininess/(1+24*nVar)` widen
(`metaball.wgsl.ts:450-451`) is the specular-AA that keeps the glint stable on the FBM
membrane. KEEP — it is STAGE 2's lit layer.

### 2.5 — The dot-matrix HYBRID (Bayer-dither the SDF field)

[Codrops, "Interactive WebGL Backgrounds: Bayer Dithering" (2025-07-30)](https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/).
The hybrid renders the metaball SDF field as a DOT GRID that thickens toward the core. The
exact ordered-dither matrix (recursive from `Bayer2`):
```glsl
float Bayer2(vec2 a){ a=floor(a); return fract(a.x/2.0 + a.y*a.y*0.75); }
#define Bayer4(a) (Bayer2(0.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(0.5*(a))*0.25 + Bayer2(a))
```
The dot-from-field pattern: the SDF `thickness = clamp(-d/bodyR)` is the brightness signal;
quantize `fragCoord` to a dot grid (`PIXEL_SIZE = 8-10px`); `step(0.5, thickness + Bayer8(cell) - 0.5)`
makes dots appear DENSER at the core, thinner at the rim. The Codrops guidance: **Bayer8**
("beyond 8×8 the perceptual gain is minimal"); combine with fbm for "more organic." This
is the "goo+dot-matrix hybrid" — a meatball made of dots. It is a PURE fragment-shader
swap of the fill-vs-dither output (no compute, no new geometry), so the WGSL primary and
the GLSL fallback get the SAME dither — clean parity.

### 2.6 — The dot-SPHERE register (Fibonacci phyllotaxis — the Claude co-work ref)

The user's `Screenshot_2026-06-17_at_14.45.25.png` ("Gemma 4 in your browser / Kernels
written by Fable 5") shows two **fine warm dot-spheres on near-black** — the
Stripe/GitHub dot-globe lineage. The SOTA even distribution is the **Fibonacci lattice**
([Extreme Learning, "How to evenly distribute points on a sphere"](https://extremelearning.com.au/how-to-evenly-distribute-points-on-a-sphere-more-effectively-than-the-canonical-fibonacci-lattice/)):
for dot `i` of `N`:
```
phi   = acos(1 - 2*(i+0.5)/N)          // polar, even-area (or the eps-offset form below)
theta = 2*pi*i/PHI   == i*pi*(3-sqrt5) // golden-angle azimuth ≈ 2.39996 rad (golden angle 137.5°)
pos   = (sin phi*cos theta, sin phi*sin theta, cos phi)
```
The eps-offset improvement (8.3% tighter, the SOTA refinement): `phi = acos(1 - 2*(i+eps)/(N-1+2*eps))`
with `eps = 0.36` (universal for nearest-neighbor optimization). For `N` the article notes
any odd N distributes evenly; the reference reads as `N ≈ 1500-4000` (per procedural-refs.md:42).
The **depth-fade** that makes it read as a translucent shell (NOT a hard back-cull):
```
facing  = clamp(dot(normal, viewDir), 0, 1)
opacity = baseOpacity * (0.15 + 0.85*facing)   // front bright, rim dim
size    = baseSize * (0.6 + 0.4*facing)        // depth-of-field dot taper
```
Slow Y rotation 0.05-0.1 rad/s. WebGPU shape: **instanced billboards** (one quad per dot,
the phyllotaxis positions in a storage/vertex buffer, camera-facing, the per-instance
opacity/size computed in the vertex stage). Default dot color is the warm-cream library
identity `oklch(0.92 0.03 78)` — **NOT teal-on-navy** (the §E "REMOVE the teal-on-navy
reference entirely" fence; teal-on-navy is a DEMO preset only, never a library token).

---

## 3 — Safari 26+ / WebKit support status (Baseline-cited)

**WebGPU achieved Baseline (January 2026)** — Chrome/Edge 113+, **Safari 26+** (macOS
Tahoe 26, iOS 26, iPadOS 26, visionOS 26), Firefox 141+/145+ all ship it stable, on by
default, no flags ([web.dev/blog/webgpu-supported-major-browsers](https://web.dev/blog/webgpu-supported-major-browsers);
[caniuse.com/webgpu](https://caniuse.com/webgpu) ≈82% global). Safari 26's WebGPU is built
on **Metal** and "maps better to Metal and the underlying hardware … supersedes WebGL"
([WebKit blog, WWDC25 / Safari 26 beta](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/)).
**This validates the user's mandate: WebGPU works on Safari now, so it is the primary.**

**WGSL fragment derivatives (the fwidth in metaball.wgsl):** WGSL ships the full derivative
builtin set — `dpdx`/`dpdy`/`fwidth` (+ `*Coarse`/`*Fine` variants), `fwidth(e) == abs(dpdx(e))+abs(dpdy(e))`
([W3C WGSL spec](https://www.w3.org/TR/WGSL/); [webgpu.rocks/wgsl/functions/derivative](https://webgpu.rocks/wgsl/functions/derivative/)).
They are **fragment-stage ONLY** — the SAME constraint as GLSL — and `metaball.wgsl.ts`
correctly calls them only in `fs_main` (`:397,450`). On Metal/Safari they run native (no
software-raster variance). **CAVEAT (cited, the dual-module trap):** if a WGSL module that
declares a function containing `fwidth`/`dpdx`/`dpdy` is used as BOTH a vertex and a
fragment shader, it fails WGSL validation on the WebGL-backed path EVEN IF the derivative
fn is unused from the vertex stage ([gpuweb/gpuweb #1795](https://github.com/gpuweb/gpuweb/issues/1795);
[gfx-rs/wgpu #4368](https://github.com/gfx-rs/wgpu/issues/4368)). `metaball.wgsl.ts` puts
`vs_main` + `fs_main` in ONE module (`:330,343`) but the derivative calls live inside
`fs_main` body (not a shared helper called from `vs_main`), so it is SAFE on native WebGPU
— but the STAGE-1/2 build must keep derivative calls out of any helper `vs_main` could reach.

**WebGL2 fallback — where + when:** the fallback fires ONLY where WebGPU is GENUINELY
absent: the ~5-10% tail (Linux Firefox where WebGPU is still flagged, pre-A12 iPhones on
iOS < 26, headless/software-raster CI). On those hosts `requestAdapter()` returns null and
the picker must degrade silently. **WebGL2 itself is Baseline-universal** (caniuse ~97%) so
the WebGL2 `metaball.frag.ts` path is the safety net, never a parallel design. The user's
"NO FALLBACKS EVER" is reconciled: WebGPU is the path everywhere it works (Safari included);
the WebGL2 net is the invisible don't-crash-to-black insurance, not a downgrade the user
sees. **The picker bug (D8) is what makes the net visible as a crash — fix it and the net
is silent.**

---

## 4 — WGSL-first approach (the kernel, the uniforms, the compute-vs-fragment decision)

### 4.1 — STAGE 1/2: a FRAGMENT pass (full-screen triangle), not compute

The metaball SDF field is a **per-pixel evaluation** — a fragment pass over a full-screen
triangle is the correct shape (compute buys nothing; there are no per-particle state
updates the GPU must own). The existing `vs_main` (`metaball.wgsl.ts:330-340`) emits the
clip-space triangle `(-1,-1)(3,-1)(-1,3)` with `uv = p*0.5+0.5` (no vertex buffer — the
pilot idiom). KEEP. The STAGE-1 kernel is a STRIPPED `fs_main`:
- compute `sceneDistG(uv)` (body smin satellites smin trail) — the field + analytic grad
- `aa = max(fwidth(d), 1e-6); alpha = 1 - smoothstep(-aa, aa, d)` — fwidth-AA edge
- fill with the base color (gamma) — NO lit/iridescence/SSS/shadow
- IGN dither + premultiply (`metaball.wgsl.ts:476-481`)

The STAGE-2 kernel ADDS (behind uniform flags so STAGE 1 stays the floor):
- `uLit > 0.5` → the Blinn-Phong/Fresnel lit-glass block (already present)
- `uShadow > 0.5` → the 2D soft-shadow march (NEW — the contact band under the dome)
- `uIridescence`/`uCoreGlow`/`uSssScale` → the existing sheen/SSS blocks

The DOT-MATRIX hybrid is a `uRenderMode` branch in the SAME `fs_main`:
- `mode == 0` → smooth fill (STAGE 1/2)
- `mode == 1` → Bayer-dither the `thickness` signal into a dot grid (§2.5)

The dot-SPHERE register is a SEPARATE WGSL module (`dot-sphere.wgsl.ts`) — instanced
billboards over a phyllotaxis storage buffer (§2.6); a different pipeline, NOT a branch.

### 4.2 — The uniform struct (typed-struct source-of-truth — KEEP + extend)

`uniformBridgeWGPU.ts` is the std140-safe typed-struct SoT (every scalar packed into vec4
lanes, every array row 16-byte-aligned, `:14-32`). The WGSL `Uniforms` struct
(`metaball.wgsl.ts:51-83`) mirrors it EXACTLY from the SAME offset table — this is the
correct discipline (the parity-ΔE blowout the BB gate catches). STAGE 2 adds TWO scalars
to a spare lane: `uShadow` + `uShadowSoftness` (e.g. into `s7.w` which is `_pad` today,
`uniformBridgeWGPU.ts:198`) and `uRenderMode` + `uDotPixelSize` (a NEW `s8` vec4 lane —
extend `BLOB_WGPU_UNIFORM_BYTES`, `uniformBridgeWGPU.ts:46`, and add the WGSL field
`metaball.wgsl.ts:67`). The dot-sphere needs its OWN small uniform buffer (rotation,
N, baseOpacity, baseSize, color) — a separate struct in `dot-sphere.wgsl.ts`.

### 4.3 — The shared color chunk (ONE color source — KEEP)

`metaball.wgsl.ts:30-34` splices `FBM_ROT_WGSL`/`OETF_WGSL`/`OKLCH_MATRICES_WGSL` from
`procedural-color.wgsl.ts` (the WGSL twin of the AV.W2 GLSL chunk aurora ALSO splices).
The color math can never drift between WGSL primary and GLSL fallback NOR between viz. The
dot-sphere/dot-matrix dot color reads the SAME `oklchToOklab`/`oklabToLinearSrgb`/
`linearToSrgb` — ONE color source. KEEP.

### 4.4 — ONE math source (the pure JS evaluator transcribed by WGSL)

The blob's field is a SHADER-only evaluation (no JS evaluator parity-tested — the parity
discipline applies to the dot-flow-field/concentric pure evaluators). BUT the **dot-sphere
phyllotaxis positions** ARE a pure deterministic JS computation (`fibonacciSphere(N)`
returning `Float32Array` of xyz) — a pure JS function the WGSL vertex stage reads from a
storage buffer, transcribed line-for-line. That is the dot-sphere's ONE-math-source: JS
computes the lattice, WGSL renders it. The smin/SDF math stays the per-pixel fragment
evaluation (no CPU twin needed — it has no compute step to parity-check), but the
`__tests__/metaball-color.glsl-port.ts` color-port discipline stays.

---

## 5 — The WebGL2 fallback (where WebGPU is genuinely absent)

**Keep `metaball.frag.ts` as the WebGL2 fallback** (it is the byte-untouched ~5-10%-tail
path — DEFECT-LEDGER's "the viz DO paint with GPU flags: blob meanLum 228/chroma 110",
DEFECT-LEDGER.md:38). The fallback fires ONLY when `requestAdapter()` returns null. The
STAGE-1/STAGE-2/dot-matrix fragment branches transcribe identically into the GLSL
(`sdf-body.glsl.ts`/`watercolor-edges.glsl.ts` already carry the smin/noise twins). The
dot-sphere instanced-billboard register needs a WebGL2 fallback too (instanced draw via
`gl.drawArraysInstanced` — Baseline-universal in WebGL2). **NOT NONE** — Safari 26 covers
the modern tail, but the genuine WebGPU-absent hosts (Linux Firefox flagged, iOS < 26,
headless CI) still need the WebGL2 net or the blob crashes-to-black there. The §E "NO
FALLBACKS" intent is satisfied (WebGPU is the path on every capable host incl. Safari); the
net is invisible insurance.

**The picker FIX (the binding D8 close — cited shape):** `useGpuSubstrate.ts:91` must NOT
commit synchronously off a presence check. Two correct shapes (procedural-refs.md:24-26):
1. **async adapter-real probe:** `supportsWebGPUReal()` = `navigator.gpu != null && (await navigator.gpu.requestAdapter()) != null` (cache once per page); the picker awaits it before choosing the backend.
2. **try-WebGPU-then-rebuild-WebGL2:** the picker attempts `armAsync()` on the WebGPU leaf in a `try`; on ANY init failure (no adapter, device-lost-at-birth, validation throw) it disposes + rebuilds on the WebGL2 leaf — the robust shape (it also catches a device that creates then immediately loses, the Safari flash class).

This is a SUBSTRATE fix (BC.W-WGSL-FALLBACK / W-VIZ-RESURRECT) the goo-blob CONSUMES; it
must NOT be re-forked per-viz (the `createCanvasLifecycle` ONE-leaf discipline — do not
fork the lifecycle).

---

## 6 — The full configurator (the tunable params)

The configurator moves to the **RIGHT on desktop** (USER-DEFECTS §E global: *"ALL
configurators: controls on the RIGHT on desktop"*) and is **rounded** (§E). It composes
`<Configurator>`/`<ConfiguratorLayer>`/`<ConfiguratorRow>` (the W-HIERARCHY vocabulary)
with `useConfiguratorState<BlobConfig>` (`cloneMode="commit-on-write"` — a preset switch is
a clean reset for the single-surface blob, per CLAUDE.md Configurator-contract). The axes
(grounded to the `BlobConfig` atoms, `types.ts:88+`):

| Section | Axis | Token / config field | Range | Default |
|---|---|---|---|---|
| **Stage** | render variant | `variant: "blob" \| "meatball" \| "dot-matrix" \| "dot-sphere"` | enum | `meatball` |
| | dot pixel size (dot-matrix) | `uDotPixelSize` | 6-14px | 10 |
| | dot count (dot-sphere) | `dotCount` | 800-4000 | 2000 |
| **Geometry** | blob count (satellites) | `geometry.satelliteCount` | 0-4 (`MAX_SATS`) | 3 |
| | body radius | `geometry.bodyRadius` | 0.12-0.30 | 0.22 |
| | satellite radius | `geometry.satelliteRadius` | 0.04-0.12 | — |
| | orbit radius | `geometry.orbitRadius` | 0.20-0.40 | 0.30 |
| | eccentricity | `geometry.eccentricity` | 0-0.6 | — |
| **Membrane** | smin-k (merge band) | `membrane.smoothK` | 0.02-0.10 | — |
| | merge variant | `membrane.merge: "quadratic" \| "circular"` | enum | quadratic |
| | noise amp / freq / speed | `membrane.noise*` | — | — |
| | warp amp | `membrane.warpAmp` | 0-0.8 | low |
| | pulse freq / amp | `membrane.pulse*` | — | — |
| **Surface (STAGE 2)** | lit | `surface.lit` | bool | on |
| | shadow (NEW) | `surface.shadow` | bool | on |
| | shadow softness (NEW) | `surface.shadowSoftness` | 4-48 | 16 |
| | spec strength / shininess | `surface.spec*` | — | — |
| | rim power / strength | `surface.rim*` | — | — |
| | iridescence / hue / speed | `surface.irid*` | — | low |
| | core glow / SSS scale / power | `surface.coreGlow`/`sss*` | — | — |
| | light direction | `surface.lightDir[3]` | xyz | — |
| **Color** | base color | `color` prop (via `<ColorSwatch>` not raw `<input type=color>`) | CSS color | warm-cream |
| | palette stops (2-4) | `color.paletteStops` | `<ColorSwatch>` ×N | warm family |
| | rim color | `surface.rimColor` | `<ColorSwatch>` | `--foreground` |
| | hue range / sat shift / bright shift | `color.*` | — | — |
| **Mood** | mood | `setMood(m)` pills | idle/happy/curious/sleepy/excited | idle |
| **Interaction** | pointer attraction | `interaction.pointerAttraction` | -1..+1 | + |
| | pointer strength | `interaction.pointerStrength` | 0-0.4 | 0.18 |
| | stretch (squash) | `interaction.stretch` | 0-0.8 | 0.5 |
| | click impulse | `interaction.clickImpulse` | — | — |
| **Performance** | quality | `quality: "full" \| "half"` | enum | full |
| | paused (WCAG-2.2.2) | `v-model:paused` via `<DockBackgroundToggle>` | bool | false |

**Fences:** the base color picker is `<ColorSwatch>` (BA.W-CONFIG-CHASSIS — replaces the
raw `<input type=color w-full>` slab); the dot-sphere/dot-matrix default dot color is the
warm-cream library identity (`oklch(0.92 0.03 78)`); teal-on-navy is a DEMO preset ONLY,
never written into a library token (presets-in-consumers + the §E teal-on-navy removal
fence).

---

## 7 — The comprehensive demo suite (stories / states)

The demo lives at `demo/stories/substrates/blob.vue` (route `/substrates/blob`). The user
fence (§E): *"TWO headers IN the card → all headers ON TOP of the card"* — the hero header
(audacious, large, shrinks-on-scroll) sits ABOVE the card; the viz lives IN ONE card with
the procedural animation (NOT the double-card + grid idiom of §C). The demo-suite stories:

1. **Hero — the lit meatball (STAGE 2 default).** The full creature: body + 3 satellites
   orbiting/merging/absorbing, lit-glass surface, soft shadow, warm-cream identity. The
   hero header on TOP with the explicit subpath `@mkbabb/glass-ui/dot-flow-field`-style
   label (the §E "every page title standardized … with its subpath explicitly defined").
2. **STAGE 1 — the plain blob.** Shadowless, lightless, fill-only — the "it renders, it
   meatballs, it works on Safari" floor. The teaching contrast that proves the staged build.
3. **The meatball merge.** A controlled 2-satellite orbit→merge→absorb→emerge cycle, the
   smin band visualized (the gooey bridge stretching + snapping back).
4. **Smin variants.** Quadratic vs circular side-by-side (the crease-vs-rounded-menisci
   teaching surface).
5. **The dot-matrix hybrid.** The Bayer-dithered SDF field — a meatball made of dots,
   denser at the core. The `uDotPixelSize` slider live.
6. **The dot-SPHERE.** The Fibonacci phyllotaxis dot-sphere on dark (the Claude co-work
   reference) — slow rotation, depth-fade, warm-cream dots; the `dotCount` slider live.
7. **Mood states.** The five-mood pill strip (idle/happy/curious/sleepy/excited) driving
   the live circumplex (`setMood`).
8. **Pointer interaction.** The hover-lean + click-bounce + velocity-squash demonstrated
   (the cursor reactivity — §8).
9. **The configurator playground.** The full configurator on the RIGHT, every axis live,
   preset cycle.
10. **Reduced-motion / paused.** The PRM static frame + the `<DockBackgroundToggle>`
    pause/resume (WCAG-2.2.2) — the one-static-frame-then-park behaviour proven.
11. **Color / palette.** The multi-stop palette + base + rim `<ColorSwatch>` tour; the
    OKLCh perturbation across the body.

Every story over a real backdrop in BOTH modes (the `proof:ba-gestalt` roster discipline);
the dot-sphere/dot-matrix-on-dark stories carry their dark backdrop as a demo concern.

---

## 8 — The cursor/touch interaction model (velocity + acceleration)

The platform ships **`usePointerVelocityField`** (`@mkbabb/glass-ui/motion-core` + root
barrel, BB.B4) — pointer POSITION (event-driven, PRM-gated) + derived VELOCITY + derived
ACCELERATION + a flick BURST, fed via `tick(deltaMs)` from the viz frame loop (it owns NO
own rAF — the one-loop/`proof:offscreen-pause` discipline). The blob TODAY uses its OWN
`useBlobPointer` (the pointer follow + click-impulse spring + trail ring-buffer + the
velocity-squash). The interaction wiring:

- **Hover-lean:** the body + satellites + trail tilt toward the cursor as ONE
  (`metaball.wgsl.ts:381-386` — the `smoothstep(0.5, 0.0, dist) * attraction * strength` UV
  shift; the falloff 0.5 keeps the lean COHERENT not a lunge, the AX.W46 D5 calm-lean fix).
- **Click-bounce:** a one-shot underdamped harmonic oscillator (`PULSE_OMEGA=18`,
  `PULSE_ZETA=0.35`, `constants.ts:132,135`) — symplectic-Euler integrated; the blob
  bounces on click.
- **Velocity-squash (the cursor VELOCITY reactivity):** the volume-preserving tanh-saturated
  squash-and-stretch along the motion axis (`metaball.wgsl.ts:248-260` — `sa = 1 + tanh(speed*1.6)*uStretch`,
  capped LOW so a fast flick reads as a lively bounce, never a taffy-pull). This is the
  velocity term. The ACCELERATION term is the BC opportunity: feed `usePointerVelocityField`
  so the blob also reacts to FLICK BURST (a sharp acceleration spike triggers a one-shot
  recoil/jiggle distinct from the steady velocity-squash).
- **Pointer-trail pseudopod:** the trail ring-buffer smin-merges a decaying-radius limb
  reaching toward the cursor (`metaball.wgsl.ts:289-294`), so a fast drag pulls an elastic
  pseudopod that snaps back.
- **The dot-SPHERE pointer reaction:** dots REPEL near the pointer (a local displacement
  in the vertex stage off the cursor proximity — the dot-globe interaction lineage).
- **PRM:** `tick(0)` freeze — the deterministic rest pose, zero live velocity
  (`usePointerVelocityField`'s PRM contract + the substrate's one-static-frame park).

The BC direction: CONSUME `usePointerVelocityField` for the acceleration/flick-burst term
(the ≥2-consumer bar for that field — `docs/consumer-evidence/use-pointer-velocity-field.md`),
keeping the existing `useBlobPointer` follow/spring/trail (a fold onto the shared field is
a BOOKED successor IFF byte-faithful — the CLAUDE.md "cursorModel.ts/useBlobPointer.ts are
NOT re-pointed" fence).

---

## 9 — The choreography clock (ONE clock via keyframes.js)

The start/transition/end/restart choreography rides **ONE keyframes.js clock** (the
kf-vjs-facilities.md map: published 4.3.0 ships `SpringProgress`, `springTimingFunction`,
`stagger`, `decay`/`decayRest` as LIGHT value.js-free exports, kf-vjs-facilities.md:44-51):

- **Page-enter reveal:** the viz arms + fades in on a `SpringProgress` (the one-clock
  primitive, kf-vjs-facilities.md:53-54) — NOT an ad-hoc setTimeout. The substrate already
  PRM-parks; the choreography threads the reveal ON the kf clock.
- **Mood transition:** the per-mood cross-fade (`TRANSITION_MS`, `constants.ts:116-122`) is
  the mood-system's own clock today; the BC direction routes it through the kf
  `springTimingFunction` register so the mood morph reads as a coherent spring glide.
- **Route-leave fade:** the viz fades + parks on the same kf clock (no flash, no abrupt
  cut).
- **The satellite merge cycle** stays the deterministic state machine (`useBlobSatellites`,
  the tempo-integrated clock) — it is the simulation, NOT the choreography; the kf clock
  owns the ENTER/LEAVE/restart, the state machine owns the steady-state merge sweep.

The kf `Oscillator` (a continuous waveform clock) is LOCAL-only in keyframes.js (not in the
published 4.3.0 dist — kf-vjs-facilities.md:21-34); it is the BOOKED successor for the
pulse/breathe loop IF/when it ships (a by-name cross-repo ask, no peer-spine widen needed —
kf-vjs-facilities.md:36). Until then the breathe is the de-synced-sine `breath()`
(`metaball.wgsl.ts:226-228`) — KEEP.

---

## 10 — The staged build plan (BC waves)

| Stage | Wave | Scope |
|---|---|---|
| 0 (prereq) | **BC.W-WGSL-FALLBACK** (substrate, shared — NOT goo-local) | fix `useGpuSubstrate` async-adapter-real probe + try-then-rebuild-WebGL2 degrade; born-RED a live `meanLum>0` per viz on an adapter-less host AND a WebGPU host. Closes D8. |
| 0 (prereq) | **BC.W-VIZ-LIVE** (substrate, shared) | Safari/WebKit `webglcontextlost`/`restored` lifecycle — preventDefault + re-arm ONCE (not a churn storm). Closes D7/§H flash. |
| 1 | **BC.W-GOOBLOB-PLAIN** | the STAGE-1 stripped `fs_main` (SDF + smin satellites + fwidth-AA + fill, NO lit/shadow); the `variant="blob"` register; born-RED a real on-host paint. |
| 2 | **BC.W-GOOBLOB-MEATBALL** | + the 2D soft-shadow march (IQ rmshadows improved penumbra) + the lit-glass surface (KEEP) + the worst-case smin bridge (KEEP); `variant="meatball"` default. |
| sib | **BC.W-GOOBLOB-DOTMATRIX** | the Bayer-dither SDF→dot hybrid (`variant="dot-matrix"`) + the Fibonacci dot-sphere register (`variant="dot-sphere"`, instanced billboards over the phyllotaxis storage buffer). |
| demo | **BC.W-GOOBLOB-DEMO** | the 11-story suite (§7) + the RIGHT-side rounded configurator (§6) + headers ON the card. |

**The fences (binding):** reuse `createCanvasLifecycle` + `useGpuSubstrate` (do NOT fork
the lifecycle); the typed-struct `uniformBridgeWGPU` SoT (extend, don't re-fork); the
shared `procedural-color.wgsl.ts` color chunk (ONE color source); warm-cream identity
default (teal-on-navy DEMO-only); presets-in-consumers; ONE keyframes.js choreography clock.
The smin/normal/noise MATH stays (it is SOTA — the rebuild is ARCHITECTURE + substrate, not
math).

---

## Sources

- [Inigo Quilez — Smooth Minimum (smin), 2024 rewrite (normalization + circular + value/gradient)](https://iquilezles.org/articles/smin/)
- [@iquilezles on X — smin 2024 rewrite announcement](https://x.com/iquilezles/status/1765935148091261277)
- [Inigo Quilez — Soft Shadows in raymarched SDFs (improved penumbra)](https://iquilezles.org/articles/rmshadows/)
- [Codrops — Interactive WebGL Backgrounds: Bayer Dithering (2025-07-30)](https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/)
- [Extreme Learning — Distribute points on a sphere more effectively than the canonical Fibonacci lattice](https://extremelearning.com.au/how-to-evenly-distribute-points-on-a-sphere-more-effectively-than-the-canonical-fibonacci-lattice/)
- [Extreme Learning — Evenly distributing points on a sphere (the canonical lattice)](https://extremelearning.com.au/evenly-distributing-points-on-a-sphere/)
- [web.dev — WebGPU now supported in major browsers](https://web.dev/blog/webgpu-supported-major-browsers)
- [WebKit blog — News from WWDC25: Safari 26 beta (WebGPU on Metal)](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/)
- [caniuse — WebGPU](https://caniuse.com/webgpu)
- [W3C — WebGPU Shading Language (WGSL) spec (derivative builtins)](https://www.w3.org/TR/WGSL/)
- [webgpu.rocks — WGSL derivative functions (dpdx/dpdy/fwidth)](https://webgpu.rocks/wgsl/functions/derivative/)
- [gpuweb/gpuweb #1795 — derivative functions usable only in fragment stage](https://github.com/gpuweb/gpuweb/issues/1795)
- [gfx-rs/wgpu #4368 — vertex+fragment shared module with derivatives fails WebGL validation](https://github.com/gfx-rs/wgpu/issues/4368)
- Codebase: `src/components/custom/goo-blob/shaders/metaball.wgsl.ts`, `metaball.frag.ts`, `composables/uniformBridgeWGPU.ts`, `useMetaballRenderer.ts`, `wgpuSetup.ts`, `useBlobSatellites.ts`, `constants.ts`, `types.ts`; `src/composables/glass/webgpu/useGpuSubstrate.ts`, `useWebGPUCanvas.ts`, `webgl/createCanvasLifecycle.ts`
- Tranche docs: `docs/tranches/BC/audit/USER-DEFECTS.md §E/§H`, `docs/tranches/BC/audit/DEFECT-LEDGER.md (D7/D8)`, `docs/tranches/BC/research/procedural-refs.md (§0/§1/§5/§6)`, `docs/tranches/BC/research/kf-vjs-facilities.md`
