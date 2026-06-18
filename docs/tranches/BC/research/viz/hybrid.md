# BC viz research — goo-dot-hybrid (the metaball-as-dot-matrix, a NEW viz)

> BC iteration 1d, per-viz SOTA research. RESEARCH ONLY — zero `src/` edits.
> Viz: **goo-dot-hybrid** (proposed `src/components/custom/goo-dot-matrix/`, subpath
> `@mkbabb/glass-ui/goo-dot-matrix`, OFF the root barrel — the procedural-viz subpath
> precedent). Route: `/substrates/goo-dot` (or a `variant` on `/substrates/blob`).
>
> The user mandate (USER-DEFECTS §E, verbatim): *"the blob is TOTALLY broken — does not
> meatball, does not render at all. A **dot-matrix goo-blob variant** is wanted"* + the
> framing prompt: *"create something like a **hybrid of the goo blob and the dot matrix
> animation**."* Plus the §E global directive: *"WebGPU is present EVERYWHERE (as long as it
> works on Safari) — ALL animations use it. NO FALLBACKS. EVER. No canvas anywhere."* Plus
> §E: *"REMOVE the teal-on-navy reference entirely."*
>
> This viz **COMPOSES** two BC waves: **BC.W-GOOBLOB-MEATBALL** (the SDF metaball FIELD,
> already SOTA in `metaball.wgsl.ts`) and **BC.W-VIZ-DOTMATRIX** (the dot-matrix RENDER).
> It is the third leg of the trio whose other two — `goo-blob` (the smooth lit creature)
> and `dot-flow-field` (the anchored-grid flow) — already have BC research docs. Every
> claim is grounded to a `file:line` or a cited URL.

---

## 0 — TL;DR (the verdict)

The goo-dot-hybrid is **a new viz that re-uses two SOTA primitives the codebase already
owns, joined by ONE new idea**: render the metaball SDF FIELD (`sceneDistG`,
`metaball.wgsl.ts:231-296`) **as a dot matrix** — a regular grid of small dots whose
**size + brightness are driven by the field value at each dot's cell**, so the dots are
DENSE + BIG + BRIGHT inside the merged metaball and SPARSE + SMALL + DIM outside. The
metaball reads as a **field of dots that flow + merge** — the literal "hybrid of the goo
blob and the dot matrix animation" the user asked for, and the literal answer to the
"dot-matrix goo-blob variant is wanted" defect (USER-DEFECTS §E).

This is conceptually **tixy.land applied to an SDF**: tixy's `(t,i,x,y) ⇒ v ∈ [-1,1]`
drives a 16×16 dot grid's size+color
([maettig.com / The Joy of Tixy](https://matthias.dittgen.name/blog/the-joy-of-tixy)); the
hybrid's `f = thickness(sceneDistG(cellCenter))` is exactly that per-cell scalar, but the
function IS the gooey metaball field instead of a hand-written formula. The grid is the
stable canvas; the merging metaball is the slow brush — the SAME gestalt the
dot-flow-field BC doc derives for its anchored-grid retopology
(`dot-flow-field.md:154-186`), but here the field is an SDF metaball, not a Gerstner wave.

**Two render registers, ONE field, ONE substrate:**

- **Register A — the FRAGMENT dot-stamp (the fullscreen-triangle path; the DEFAULT).** A
  pure fragment swap of the metaball pass: quantize `fragCoord` to a dot grid, evaluate the
  SDF field at the cell center, stamp an antialiased dot whose radius/brightness reads the
  field `thickness`. Zero compute, zero geometry, zero new buffer — it is the
  metaball-pass `fs_main` with a dot-grid output stage. This is the literal
  metaball-rendered-as-dots; it inherits the WGSL primary / WebGL2-fallback parity for free.
- **Register B — the INSTANCED dot-billboard (the explicit-grid path; the depth/3D look).**
  A fixed lattice of instanced billboard quads (the dot-flow-field render-pass shape,
  `flow-field.render.wgsl.ts:98-153`), each dot reading the field at its anchor for
  size+brightness, with an OPT-IN sub-cell displacement toward the field gradient so the
  dots *flow* toward the merging core. WebGPU point-list is 1px-only (no size control), so
  instanced billboards are the SOTA shape (cited §3.4); this register also hosts the
  Fibonacci dot-SPHERE the user's `Screenshot_2026-06-17_at_14.45.25.png` reference shows.

The field MATH is the byte-untouched `metaball.wgsl.ts` SDF (`sceneDistG` + the IQ
normalized smin + the satellites + the trail pseudopod) — **no math rebuild**; the new code
is the dot-grid OUTPUT stage + the dot-grid uniform lane + the instanced-lattice render
pass. The configurator moves to the **RIGHT on desktop** (§E global directive), headers ON
the card (§E blob: *"TWO headers IN the card → all headers ON TOP of the card"*).

---

## 1 — The two primitives this composes (grounded — both already SOTA in the repo)

### 1.1 — The SDF metaball FIELD (the goo half) — `metaball.wgsl.ts`

The field + analytic gradient is `sceneDistG(uv) -> vec3(dist, ∂x, ∂y)`
(`metaball.wgsl.ts:231-296`): the domain-warped FBM membrane body
(`fbmWarpedG`, `:162-167`) smin-merged (`sminG`, `:200-203`) with up to four orbiting
satellites (`:280-286`) and the pointer-trail pseudopod (`:289-294`). The **`thickness`
signal** the dot-grid will read is already computed in the metaball `fs_main`:

```wgsl
let thickness = clamp(-d / max(bodyR, 1e-4), 0.0, 1.0);   // metaball.wgsl.ts:414
```

`thickness = 0` at the silhouette, → 1 deep in the core. That is the **per-cell scalar the
dot-matrix output stage reads** — the goo↔dot bridge is a one-line re-use of an
already-computed value. The smin (`sminQuadraticG`/`sminCircularG`, `:178-198`) is the IQ
2024 normalized polynomial/circular kernel
([Inigo Quilez — smin, 2024 rewrite](https://iquilezles.org/articles/smin/)), confirmed
SOTA in `goo-blob.md:120-138`. The Codrops droplet-metaball reference uses the exponential
smin `-log(exp(-k·d1)+exp(-k·d2))/k` at k=7 with a decreasing-radius pointer-trail of
spheres ([Codrops — droplet metaballs, 2025-06-09](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/));
the repo's trail-pseudopod (`metaball.wgsl.ts:289-294`) is exactly that pattern, and the
repo's IQ-normalized smin is a cleaner (distance-band-normalized) kernel than the Codrops
exponential one — **KEEP the repo's**.

### 1.2 — The dot-matrix RENDER (the dot half) — two cited idioms

**(a) The tixy paradigm — a dot grid is a per-cell function.** tixy.land is "a 16×16 matrix
of white and red dots whose color and size is calculated from a short pure function
`(t,i,x,y) ⇒ v`" returning `[-1,1]`; "the magnitude determines the size of the dot, the
sign the color" ([The Joy of Tixy](https://matthias.dittgen.name/blog/the-joy-of-tixy);
[maettig HD renderer](http://maettig.com/code/canvas/tixy.land-hd.html)). The hybrid's
function is `v = thickness(sceneDistG(cellCenter, t))` — the gooey metaball field is the
per-cell scalar. This is the conceptual root of the whole viz: **the dot matrix is a
sampler of an animated field, and the field is a metaball.**

**(b) The cursor-driven dotted-field — the Apple/Metal idiom.** The 2026 Apple-aesthetic
"Dotted background effect in Metal" derives the exact grid + per-dot-radius-from-field +
cursor-interaction shape
([Victor Baro — Dotted background in Metal, 2026](https://medium.com/@victorbaro/dotted-background-effect-in-metal-8214673edc9d)):

```glsl
float2 cellUV    = fract(uv * float2(cols, rows));        // per-cell 0..1 coords
float2 cellIndex = floor(uv * float2(cols, rows));        // logical dot position
float2 dotWorld  = (cellIndex + 0.5) / grid;              // dot center in field space
float  influence = 1.0 - smoothstep(0.0, influenceRadius, length(dotWorld - touchUV));
// influence (0..1) drives BOTH radius and brightness via mix(); and the dot center shifts:
dotCenter -= dir * (influence * maxDisplacement);          // "manipulate perceived center, render in place"
```

This is the literal template for the hybrid's FRAGMENT register: the metaball `thickness`
plays the role of `influence` (the field drives radius + brightness + a sub-cell shift), and
the cursor adds an additional influence term (§8). The antialiased dot is the canonical
`fwidth`-feathered circle ([Ruben de Vries — antialiased circles with fwidth](https://rubendv.be/posts/fwidth/);
[The Book of Shaders — Shapes](https://thebookofshaders.com/07/)).

---

## 2 — The SOTA technique (cited) — the goo↔dot bridge

### 2.1 — Field-sampled dot stamp (Register A, the fullscreen-triangle default)

The metaball pass already evaluates the SDF per pixel. Register A keeps that per-pixel
field eval and replaces the *fill* with a *dot stamp*. Per fragment:

```wgsl
// 1. the field at THIS pixel (the goo half — byte-identical to metaball.wgsl)
let scene     = sceneDistG(uv);
let d         = scene.x;
let bodyR     = uBodyRadius + breath(uPulsePhase) * uPulseAmp;
let thickness = clamp(-d / max(bodyR, 1e-4), 0.0, 1.0);     // metaball.wgsl.ts:414

// 2. quantize fragCoord to a dot grid (cell = uDotPixelSize device px)
let cell      = floor(fragCoord / uDotPixelSize);
let cellCtr   = (cell + 0.5) * uDotPixelSize;
let cellCtrUv = (cellCtr / uResolution - 0.5);              // back to uv space

// 3. the field AT THE CELL CENTER (so every fragment in a cell agrees on the dot)
let fCell     = clamp(-sceneDistG(cellCtrUv).x / max(bodyR,1e-4), 0.0, 1.0);

// 4. dot radius = field-driven (dense+big inside, small outside); 0 outside the field
let dotR      = uDotMin + (uDotMax - uDotMin) * smoothstep(uFieldFloor, 1.0, fCell);

// 5. antialiased circle at the cell center (the fwidth-feathered Book-of-Shaders dot)
let pd        = length(fragCoord - cellCtr);
let aa        = fwidth(pd);                                  // resolution-independent edge
let dot       = 1.0 - smoothstep(dotR - aa, dotR + aa, pd);

// 6. brightness/color also reads fCell (dim outside, bright inside) — the SAME OKLCh ramp
let bright    = uDotBrightFloor + (1.0 - uDotBrightFloor) * fCell;
let alpha     = dot * bright * step(uFieldFloor, fCell);    // no dot where field < floor
```

Why CELL-CENTER sampling (step 3, the second `sceneDistG`)? Because a per-FRAGMENT field
value would make the dot's radius vary continuously WITHIN the cell — the dot would smear,
not read as a discrete dot. Sampling the field at the cell center gives every fragment in
the cell ONE agreed dot radius — the discrete tixy/Metal dot. The cost is a SECOND
`sceneDistG` eval per pixel (the field is cheap — a handful of smins + one FBM octave run;
the metaball pass already runs it once per pixel today). An optimization: at
`uDotPixelSize ≥ ~6px` the field is smooth over a cell, so the cell-center eval can be a
once-per-cell value if a compute pre-pass writes a coarse field texture — BOOKED as a
successor, not needed for the default (the §2.1 two-eval path is the clean floor).

This is a **pure fragment-shader swap of the metaball output** — the SAME `vs_main`
full-screen triangle (`metaball.wgsl.ts:330-340`), the SAME uniform struct + ONE new lane
(§4.2), the SAME `procedural-color.wgsl.ts` OKLCh ramp (§4.3). The WGSL primary and the
GLSL fallback get the SAME dot-stamp output stage — clean parity, no compute, no buffer.

### 2.2 — The Bayer-dither dot register (the organic-density alternative within Register A)

Register A has a SECOND mode the user's "dot-matrix" word also covers: instead of a smooth
radius ramp per cell, ORDERED-DITHER the field thickness into on/off dots — denser dots
toward the core, sparser at the rim, the classic halftone read. The exact Bayer matrices
([Codrops — Bayer Dithering, 2025-07-30](https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/),
verbatim):

```glsl
float Bayer2(vec2 a){ a = floor(a); return fract(a.x/2.0 + a.y*a.y*0.75); }
#define Bayer4(a)  (Bayer2(0.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a)  (Bayer4(0.5*(a))*0.25 + Bayer2(a))
```

The dot-from-field: `mask = step(0.5, thickness + Bayer8(cell) - 0.5)` makes dots appear
DENSER at the core, thinner at the rim. The Codrops guidance: **Bayer8** ("beyond 8×8 the
perceptual gain is minimal"), `const float PIXEL_SIZE = 10.0; const float CELL_PIXEL_SIZE =
5.0 * PIXEL_SIZE;`, and combine with **fbm** for "more organic" — and the metaball field
ALREADY has the warped-FBM membrane (`fbmWarpedG`), so the dither inherits the organic
edge for free. This mode is `uDotMode == 1` (a uniform flag); `uDotMode == 0` is the smooth
radius-ramp dot of §2.1. Both are Register A (fullscreen fragment, parity-clean).

### 2.3 — The instanced dot-lattice (Register B, the depth/flow look)

Register B is a FIXED lattice of instanced billboard quads — the dot-flow-field render-pass
shape (`flow-field.render.wgsl.ts:98-153`) re-used for the metaball field. Each dot:

```wgsl
// per-instance: the dot's anchor o = gridOrigin(ii, cols, pitch) (deterministic lattice)
let o      = gridOrigin(ii, uCols, uPitch);
let scene  = sceneDistG(o);                              // the field + analytic gradient AT the anchor
let fCell  = clamp(-scene.x / bodyR, 0.0, 1.0);
let grad   = scene.yz;                                   // the SDF gradient (toward the surface)
// the dot FLOWS toward the core: a sub-cell displacement along -grad, capped < 0.5 pitch
let disp   = -normalize(grad + 1e-6) * uFlowAmt * fCell * uPitch;
let pos    = o + disp;                                   // never advect; offset from anchor (the anchored-grid discipline, dot-flow-field.md:154)
let size   = uDotBaseSize * (uDotMin + (1.0 - uDotMin) * fCell);
let bright = uDotBrightFloor + (1.0 - uDotBrightFloor) * fCell;
// instanced billboard quad at pos, size, brightness → soft circle in fs_main
```

The dots flow TOWARD the merging metaball core (the gradient points outward from the
surface, so `-grad` points inward) — so a satellite metaballing in pulls the surrounding
dots toward the merge, then they relax back to their anchors when it absorbs. This is the
"dots whose size/brightness is driven by the blob field value, so the metaball reads as a
field of dots that flow + merge" the assignment names. The displacement is **capped LOW**
(< 0.5 pitch) so the lattice stays coherent (the dot-flow-field anchored-grid discipline,
`dot-flow-field.md:166-171`) — the dots breathe toward the core, never scatter.

Register B is where the **Fibonacci dot-SPHERE** lives too (the
`Screenshot_2026-06-17_at_14.45.25.png` reference, `procedural-refs.md:42-52`): the same
instanced-billboard pipeline, but the per-instance position is the phyllotaxis lattice on a
sphere instead of a screen grid — `variant="dot-sphere"`. See §6 / the goo-blob doc
(`goo-blob.md:205-231`) which owns the dot-sphere design in full; the hybrid REUSES it as a
Register-B variant (one instanced pipeline, two position sources: screen grid OR sphere
lattice).

### 2.4 — Which register is the default (the SOTA decision)

**Register A (`uDotMode==0`, the smooth field-driven dot) is the DEFAULT.** It is the
literal "metaball rendered as a dot matrix," it inherits the metaball pass's WGSL/GLSL
parity for free (a fragment swap, not a new pipeline), it has no per-frame buffer cost, and
it is the cheapest path that reads as the hybrid. Register A's dither mode (`uDotMode==1`)
is the halftone alternative. Register B (instanced lattice) is the OPT-IN depth/flow look +
the dot-sphere host — a second pipeline (the `flow-field.render.wgsl` shape), gated behind
`variant="dot-lattice"` / `variant="dot-sphere"`. This mirrors the goo-blob doc's
register split (`goo-blob.md:289-294`): the dot-matrix is a `uRenderMode` branch in the
metaball `fs_main`; the dot-sphere is a SEPARATE WGSL module — a different pipeline, NOT a
branch.

---

## 3 — Safari 26+ / WebGPU support status (Baseline-cited)

**WebGPU is Baseline (January 2026)** — Chrome/Edge 113+, **Safari 26+** (macOS Tahoe 26,
iOS 26, iPadOS 26, visionOS 26), Firefox 141+/145+ ship it stable, on by default, no flags
([web.dev — WebGPU supported in major browsers](https://web.dev/blog/webgpu-supported-major-browsers);
[caniuse — WebGPU](https://caniuse.com/webgpu) ≈82%;
[WebKit — WWDC25 / Safari 26 beta](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/);
[WebGPU in iOS 26 — App Developer Magazine](https://appdevelopermagazine.com/webgpu-in-ios-26/)).
Safari 26's WebGPU is built on **Metal** and "supersedes WebGL." This validates the user's
mandate: WebGPU works on Safari now, so it is the primary for the hybrid.

**WGSL fragment derivatives (the `fwidth` the dot AA needs).** WGSL ships `dpdx`/`dpdy`/
`fwidth` (+ `*Coarse`; `fwidthFine` is excluded ONLY in WebGPU Compatibility Mode — the
hybrid uses plain `fwidth`), fragment-stage only, `fwidth(e) == abs(dpdx(e))+abs(dpdy(e))`
([W3C WGSL spec](https://www.w3.org/TR/WGSL/);
[webgpu.rocks — derivative fns](https://webgpu.rocks/wgsl/functions/derivative/);
[webgpufundamentals — Compatibility Mode](https://webgpufundamentals.org/webgpu/lessons/webgpu-compatibility-mode.html)).
On Metal/Safari they run native (no software-raster variance). The dual-module derivative
trap (a `fwidth` helper reachable from `vs_main` fails WGSL validation on the WebGL-backed
path, [gpuweb #1795](https://github.com/gpuweb/gpuweb/issues/1795)) is avoided exactly as
`metaball.wgsl.ts` avoids it: the `fwidth` calls live inside `fs_main`, never a shared
helper `vs_main` reaches (`goo-blob.md:250-256`).

**The instanced-billboard SOTA (Register B).** WebGPU's point-list topology "always draws
1px points with no size control," so the SOTA is **instanced billboard quads** — one
1×1 quad per dot, billboarded, per-instance size in the vertex stage
([VR.org — WebGPU Baseline 2026](https://vr.org/articles/webgpu-baseline-2026-three-js-webxr-default);
the `flow-field.render.wgsl.ts:1-14` header already records this). Register B follows it.

**WebGL2 fallback — where + when.** WebGPU is the path on every Baseline host (Safari
included); the WebGL2 fallback (`metaball.frag.ts` shape for Register A, a `gl.drawArrays
Instanced` shape for Register B) fires ONLY where `requestAdapter()` returns null — the
~5-10% tail (Linux Firefox flagged, pre-A12 iOS < 26, headless/software-raster CI). The §E
"NO FALLBACKS EVER" is reconciled exactly as every sibling doc reconciles it
(`goo-blob.md:258-266`, `concentric.md:289-317`): WebGPU is the visible surface everywhere
it works; the WebGL2 net is invisible don't-crash-to-black insurance, gated from premature
retirement by `proof:gpu-substrate-single` clause B. **The picker bug D8 (§5) is what makes
the net visible as a crash — fix it and the net is silent.**

---

## 4 — The WGSL-first kernel design

### 4.1 — Register A: a FRAGMENT pass over the SAME full-screen triangle

Register A is the metaball pass's `vs_main` (full-screen triangle `(-1,-1)(3,-1)(-1,3)`,
no vertex buffer — `metaball.wgsl.ts:330-340`) with the dot-stamp `fs_main` (§2.1/§2.2). It
composes `createGpuSubstrate` (`useGpuSubstrate.ts:87`) over the ONE `createCanvasLifecycle`
leaf EXACTLY as the metaball pass does — **do NOT fork the lifecycle**. No compute, no
storage buffer, no particle state. The dot-stamp is a pure `f(uv, fragCoord, uniforms)`,
parity-clean against the GLSL twin.

### 4.2 — Register B: an instanced-billboard render pass (no compute needed)

Register B is the dot-flow-field RENDER pass (`flow-field.render.wgsl.ts`) re-targeted: the
per-instance position is `gridOrigin(ii, cols, pitch)` (a deterministic screen lattice) or
the Fibonacci sphere lattice — both pure functions of `instance_index`, computed in the
vertex stage (no storage buffer of evolving state needed for the screen-grid + sphere
cases; the field is sampled per-instance from the SAME `sceneDistG` evaluated in WGSL). It
needs NO compute kernel — the dot positions are deterministic, the field eval is per-dot in
the vertex stage. (The dot-flow-field NEEDS a compute kernel because its particles evolve;
the hybrid's dots are anchored, so the lattice is recomputed each frame from `f(ii, t)`,
storage-buffer-free — strictly simpler.) The instanced draw is `draw(6, N)` (6 verts ×
N instances), the `flow-field.render.wgsl.ts:98-153` shape.

### 4.3 — The uniform struct (typed-struct source-of-truth — KEEP + extend)

`uniformBridgeWGPU.ts` (the goo-blob one) is the std140-safe typed-struct SoT; the WGSL
`Uniforms` struct (`metaball.wgsl.ts:51-83`) mirrors it from the SAME offset table. Register
A adds ONE new vec4 lane:

```wgsl
// s8: (uDotMode, uDotPixelSize, uFieldFloor, uDotBrightFloor)  — Register A dot-grid
// s9: (uDotMin, uDotMax, uFlowAmt, _pad)                       — dot radius span + Register-B flow
```

— extend `BLOB_WGPU_UNIFORM_BYTES` (`uniformBridgeWGPU.ts:46`) + add the WGSL fields. The
parity-ΔE blowout catches a std140-vs-WGSL misalignment (the typed-struct discipline). The
shared color chunk (`procedural-color.wgsl.ts` `OETF`/`OKLCH_MATRICES` — `metaball.wgsl.ts:30-34`)
is the ONE color source the dot brightness/color reads — no second color path.

### 4.4 — ONE math source (the field IS the metaball SDF)

The hybrid's field is the SHADER-only `sceneDistG` evaluation (the metaball field has no JS
evaluator parity twin — the parity discipline applies to dot-flow-field/concentric's pure JS
evaluators, `dot-flow-field.md:188-194`). The dot-grid OUTPUT stage is a pure
`f(fragCoord, fieldValue, uniforms)` — also shader-only, transcribed line-for-line WGSL↔GLSL.
The ONE pure-JS computation Register B needs is `gridOrigin(index, cols, pitch)` (the screen
lattice) + `fibonacciSphere(N)` (the dot-sphere phyllotaxis, `goo-blob.md:316-325`) — pure
deterministic JS the WGSL vertex stage transcribes; `proof:goo-dot` clause 3 round-trips the
lattice (the dot-flow-field `gridOrigin` round-trip precedent, `dot-flow-field.md:294-297`).

---

## 5 — The substrate (the shared BC.W-WGSL-FALLBACK prereq the hybrid CONSUMES)

The hybrid is **born-broken at HEAD for the same D8 reason the goo-blob is** — the picker
commits WebGPU synchronously off the presence-only `supportsWebGPU()`
(`useGpuSubstrate.ts:91` + `useWebGPUCanvas.ts:50-57`) which never calls `requestAdapter()`,
so on an adapter-less host it arms then throws `no GPU adapter` with no degrade
(`procedural-refs.md:8-30`, `goo-blob.md:90-115`). The fix is the SHARED
**BC.W-WGSL-FALLBACK** substrate wave (NOT hybrid-local — the `createCanvasLifecycle`
one-leaf discipline forbids a per-viz fork): either (1) an async adapter-real probe
(`supportsWebGPUReal()` = `navigator.gpu != null && (await requestAdapter()) != null`,
cached once per page) or (2) try-WebGPU-then-rebuild-WebGL2 (the picker attempts
`armAsync()` on the WebGPU leaf in a `try`; on ANY init failure it disposes + rebuilds on
the WebGL2 leaf — the robust shape that also catches the Safari device-lost-at-birth flash,
`goo-blob.md:343-351`). The hybrid consumes the fixed picker unchanged. The Safari flash
(§H / D7) is closed by the SHARED **BC.W-VIZ-LIVE** wave (the `webglcontextlost`/`restored`
preventDefault + re-arm-ONCE on the WebGL fallback leaf). Both are substrate-shared; the
hybrid books neither.

The WebGL2 fallback shaders the hybrid needs: a `goo-dot.frag.ts` (the Register-A GLSL twin
— the `metaball.frag.ts` dot-stamp transcription) + a `goo-dot.render.glsl.ts`
(`gl.drawArraysInstanced`, Baseline-universal in WebGL2) for Register B. Both transcribe the
WGSL line-for-line; the round-trip gate keeps them in lockstep.

---

## 6 — The full configurator (controls on the RIGHT, rounded)

The configurator is `useConfiguratorState<GooDotConfig>` (`cloneMode="commit-on-write"` — a
single surface; a preset switch is a clean reset, the goo-blob discipline) seated in a
`<Configurator>`/`<ConfiguratorLayer>`/`<ConfiguratorRow>` shell, **on the RIGHT on
desktop** (§E global), **rounded** (§E). It REUSES the goo-blob `BlobConfig` atoms
(`types.ts:185-202`) for the field + adds the dot-render atoms. The base color picker is
`<ColorSwatch>` (BA.W-CONFIG-CHASSIS), not a raw `<input type=color>` slab.

| Section | Axis | Config field | Range | Default |
|---|---|---|---|---|
| **Render** | variant | `variant: "dot-field" \| "dot-dither" \| "dot-lattice" \| "dot-sphere"` | enum | `dot-field` |
| | dot pixel size (Register A) | `dotGrid.pixelSize` | 6–16px | 10 |
| | dot grid cols×rows (Register B) | `dotGrid.cols` | 24–96 | 48 |
| | field floor (dot appears) | `dotGrid.fieldFloor` | 0–0.5 | 0.08 |
| | dot min/max radius | `dotGrid.dotMin`/`dotMax` | 0–1 / px | — |
| | brightness floor | `dotGrid.brightFloor` | 0–0.6 | 0.12 |
| | flow toward core (Register B) | `dotGrid.flowAmt` | 0–0.5 pitch | 0.18 |
| | dot count (dot-sphere) | `dotGrid.dotCount` | 800–4000 | 2000 |
| **Geometry (field)** | satellite count | `geometry.satelliteCount` | 0–4 | 3 |
| | body radius | `geometry.bodyRadius` | 0.12–0.30 | 0.22 |
| | orbit radius / eccentricity | `geometry.orbitRadius`/`eccentricity` | — | — |
| **Membrane (field)** | smin-k (merge band) | `membrane.smoothK` | 0.02–0.16 | 0.05 |
| | merge variant | `membrane.merge: "quadratic" \| "circular"` | enum | circular |
| | noise amp/freq/speed, warp, pulse | `membrane.*` | — | — |
| **Color** | base / palette stops | `color` via `<ColorSwatch>` ×N | CSS | warm-cream |
| | hue range / sat / bright shift | `color.*` | — | — |
| **Interaction** | pointer attraction / strength | `interaction.pointer*` | — | + / 0.18 |
| | flick burst (accel) | `interaction.burst` (NEW, §8) | 0–1 | 0.4 |
| **Mood** | mood pills | `setMood(m)` | idle/happy/curious/sleepy/excited | idle |
| **Performance** | quality | `quality: "full" \| "half"` | enum | full |
| | paused (WCAG 2.2.2) | `v-model:paused` via `<DockBackgroundToggle>` | bool | false |

**Fences:** warm-cream identity default (the dot color is `oklch(0.92 0.03 78)` library
identity for the dot-sphere-on-dark register, the `color.paletteStops` cream ramp
`types.ts:302` for the field registers); teal-on-navy is a DEMO preset ONLY, never a library
token (§E removal fence; presets-in-consumers).

---

## 7 — The comprehensive demo suite (stories / states)

The demo lives at `demo/stories/substrates/goo-dot.vue` (route `/substrates/goo-dot`), or
the hybrid is a `variant` register on `/substrates/blob` (the user asked for it AS a
"dot-matrix goo-blob variant" — a sibling register on the blob page, headers ON the card per
§E). The stories:

1. **Hero — the dot-field metaball (Register A default).** The merging metaball rendered as
   a smooth field-driven dot grid — dense+bright dots in the core, sparse+dim at the rim,
   satellites orbiting/merging visibly pulling the dot density toward the merge. Warm-cream.
   The hero header ON TOP, subpath `@mkbabb/glass-ui/goo-dot-matrix` in a Fira-Code code
   block (§E "every page title standardized … with its subpath explicitly defined").
2. **The dither halftone.** `variant="dot-dither"` — the Bayer8 ordered-dither register
   (§2.2), denser dots at the core, the halftone read; the `pixelSize` slider live.
3. **The flowing dot-lattice.** `variant="dot-lattice"` (Register B) — the instanced lattice
   where dots FLOW toward the merging core (the `flowAmt` slider live, the gradient-driven
   sub-cell displacement visible as a satellite necks in).
4. **The dot-SPHERE.** `variant="dot-sphere"` — the Fibonacci phyllotaxis dot-sphere on dark
   (the `Screenshot_2026-06-17_at_14.45.25.png` reference, `procedural-refs.md:42-52`), slow
   rotation, depth-fade, warm-cream dots; the `dotCount` slider live. The literal Claude
   co-work reference the user named.
5. **The goo↔dot teaching contrast.** The SAME field rendered three ways side-by-side: the
   smooth lit blob (`<GooBlob>`), the dot-field (Register A), the dot-lattice (Register B) —
   proves the dot-matrix is a RENDER of the same metaball, the "hybrid" made explicit.
6. **The merge cycle in dots.** A controlled 2-satellite orbit→merge→absorb→emerge cycle
   rendered as dots — the gooey bridge stretching as a thickening band of dots, snapping back.
7. **Mood states.** The five-mood pill strip driving the field's energy (the goo-blob mood
   circumplex, `constants.ts:48-104`) — the dots get busier/calmer with arousal.
8. **Pointer interaction.** The hover-lean + flick-burst + velocity-squash demonstrated — the
   dots near the cursor brighten/swell + the field leans (§8).
9. **The configurator playground.** The full configurator on the RIGHT, every axis live,
   variant cycle (dot-field → dither → lattice → sphere).
10. **Reduced-motion / paused.** The PRM one-static-frame + `<DockBackgroundToggle>`
    pause/resume (WCAG-2.2.2) — the dot field freezes mid-merge, the shape held + legible.
11. **As a subtle dot-background.** A very-low-contrast, large-pixel-size instance behind
    content (the §E "suffuse it throughout the site as a subtle background element" — the
    metaball dot-field as a calm ambient backdrop, done simply + large).

Every story over a real backdrop in BOTH modes (the `proof:ba-gestalt` roster discipline);
the dot-sphere-on-dark story carries its dark backdrop as a demo concern.

---

## 8 — The cursor/touch interaction model (velocity + acceleration)

The hybrid inherits the goo-blob's rich pointer model AND adds the dot-field-specific
cursor reaction. The field-deform half is byte-identical to the metaball pass:

- **Hover-lean (the field).** The body + satellites + trail lean toward the cursor as ONE
  (`metaball.wgsl.ts:381-386` — the `smoothstep(0.5,0.0,dist) * attraction * strength` UV
  shift; the 0.5 falloff keeps the lean COHERENT not a lunge, the AX.W46 D5 calm-lean fix).
  The dots follow the field, so the lean reads as the whole dot-cloud tilting toward the
  cursor.
- **The dot-cursor influence (NEW — the Metal dotted-bg idiom, §1.2b).** On TOP of the
  field-lean, the cursor adds a LOCAL dot influence: `influence = 1 - smoothstep(0,
  pointerRadius, length(cellCtr - cursor))`; dots near the cursor brighten + swell
  (`mix(dotR, dotR*1.5, influence)`) and shift toward (attract) or away (repel) — the iOS
  "the dots notice the cursor" reading. This is the cursor-driven dotted-field
  ([Victor Baro — Dotted background in Metal](https://medium.com/@victorbaro/dotted-background-effect-in-metal-8214673edc9d))
  layered onto the metaball field.
- **Velocity-squash (the velocity term).** The volume-preserving tanh-saturated squash
  along the motion axis (`metaball.wgsl.ts:248-260` — `sa = 1 + tanh(speed*1.6)*uStretch`,
  capped LOW) deforms the field; the dots inherit it.
- **Acceleration → flick BURST (the BC opportunity — the accel term).** Consume the shipped
  **`usePointerVelocityField`** (`@mkbabb/glass-ui/motion-core` + root barrel, BB.B4) for the
  derived ACCELERATION + flick BURST — a sharp acceleration spike fires a one-shot brightness
  pulse + dot-swell at the cursor that decays on the restoring spring (the second derivative
  made visible, distinct from steady velocity-squash). `usePointerVelocityField` owns NO rAF
  — the renderer FEEDS it `tick(deltaMs)` from inside the `createCanvasLifecycle` frame
  callback (the one-loop / `proof:offscreen-pause` discipline). The hybrid is the
  ≥2-consumer evidence for that field alongside dot-flow-field
  (`docs/consumer-evidence/use-pointer-velocity-field.md`).
- **Pointer-trail pseudopod (the field).** The trail ring-buffer smin-merges a decaying-radius
  limb toward the cursor (`metaball.wgsl.ts:289-294`); in dot mode the pseudopod reads as a
  reaching arm of dots that snaps back.
- **PRM:** `tick(0)` freeze — the deterministic rest pose, zero live velocity
  (`usePointerVelocityField`'s PRM contract + the substrate's one-static-frame park).

The BC direction: CONSUME `usePointerVelocityField` for the acceleration/flick-burst term,
keep the existing `useBlobPointer` follow/spring/trail (the CLAUDE.md "cursorModel.ts/
useBlobPointer.ts are NOT re-pointed" fence; a fold onto the shared field is a booked
successor IFF byte-faithful).

---

## 9 — The choreography clock (ONE clock via keyframes.js)

The start/transition/end/restart choreography rides **ONE keyframes.js clock** (the
published **4.3.0** dist ships `SpringProgress`, `springTimingFunction`, `stagger`,
`decay`/`decayRest` as LIGHT value.js-free exports — `kf-vjs-facilities.md:1-60`):

- **Page-enter reveal:** the viz arms + the dot grid fades/builds in on a `SpringProgress`
  (the one-clock primitive) with a per-dot `stagger` (the dots appear core-out, the cleanest
  metaball-build read) — NOT an ad-hoc setTimeout. The substrate already PRM-parks.
- **Variant transition:** dot-field → dither → lattice cross-fades on a `springTimingFunction`
  register so the variant morph reads as a coherent spring glide.
- **Route-leave fade:** the dot grid fades + parks on the same kf clock (no flash, no cut).
- **The satellite merge cycle** stays the deterministic state machine (`useBlobSatellites`)
  — it is the simulation, NOT the choreography; the kf clock owns the ENTER/LEAVE/restart,
  the state machine owns the steady-state merge sweep.

The kf **`Oscillator`** (a continuous waveform clock) is **LOCAL-ONLY in keyframes.js — NOT
in the published 4.3.0 dist** (`kf-vjs-facilities.md:15-34`: `grep Oscillator
node_modules/.../keyframes.d.ts → 0`); it is the BOOKED loop-clock successor for the
pulse/breathe + dot-sphere rotation IF/when kf republishes (a by-name cross-repo ask, NO
peer-spine widen needed — the spine is `^4.0.0`). Until then the breathe is the
de-synced-sine `breath()` (`metaball.wgsl.ts:226-228`, KEEP) and the dot-sphere rotation is
a plain `uTime`-keyed angle. **The republish-gated Oscillator note is binding** — do NOT
import the local-only export.

---

## 10 — The staged build plan (BC waves)

| Stage | Wave | Scope |
|---|---|---|
| 0 (prereq, shared) | **BC.W-WGSL-FALLBACK** | fix `useGpuSubstrate` async-adapter-real probe + try-then-rebuild-WebGL2 degrade; closes D8. The hybrid CONSUMES it. |
| 0 (prereq, shared) | **BC.W-VIZ-LIVE** | Safari `webglcontextlost`/`restored` preventDefault + re-arm ONCE; closes D7/§H flash. |
| field (prereq) | **BC.W-GOOBLOB-MEATBALL** | the SDF field + smin + satellites + soft-shadow + lit-glass (the goo-blob doc owns this); the hybrid READS `sceneDistG`/`thickness`. |
| dots | **BC.W-VIZ-DOTMATRIX** | the dot-render PRIMITIVE — the Register-A fragment dot-stamp (smooth + Bayer-dither) + the Register-B instanced lattice + the dot-sphere. The reusable dot-render leaf. |
| HYBRID | **BC.W-GOODOT-HYBRID** | the new `goo-dot-matrix` viz: compose W-GOOBLOB-MEATBALL's field with W-VIZ-DOTMATRIX's dot-render; the `variant` axis (dot-field/dither/lattice/sphere); the `s8`/`s9` uniform lanes; the WGSL primary + GLSL fallback; born-RED a real on-host dot-field paint. |
| demo | **BC.W-GOODOT-DEMO** | the 11-story suite (§7) + the RIGHT-side rounded configurator (§6) + headers ON the card + `usePointerVelocityField` flick-burst (§8). |

**The fences (binding):** reuse `createCanvasLifecycle` + `useGpuSubstrate` (do NOT fork the
lifecycle); the typed-struct `uniformBridgeWGPU` SoT (extend with `s8`/`s9`, don't re-fork);
the shared `procedural-color.wgsl.ts` color chunk (ONE color source); the field MATH is the
byte-untouched `metaball.wgsl.ts` SDF (no math rebuild — the dot-render is the new code);
warm-cream identity default (teal-on-navy DEMO-only); presets-in-consumers; ONE keyframes.js
4.3.0 choreography clock (Oscillator republish-gated). The dot-render leaf is SHARED with the
dot-flow-field's render pass shape (`flow-field.render.wgsl.ts`) — the instanced-billboard
SOTA, not a fork.

---

## 11 — Discipline checklist (the binding fences)

- **ONE lifecycle leaf** — `createGpuSubstrate` over `createCanvasLifecycle`; ZERO scheduling
  re-fork (offscreen-pause, live-PRM-freeze, demand-loop all inherited). ✓
- **ONE math source** — the field IS `metaball.wgsl.ts`'s `sceneDistG` (shader-only, no JS
  twin); the dot-grid output is a pure shader `f(fragCoord, fieldValue, uniforms)` transcribed
  WGSL↔GLSL line-for-line; `gridOrigin`/`fibonacciSphere` (Register B) are pure-JS,
  round-tripped (`proof:goo-dot` clause 3). ✓
- **Warm-cream identity default;** teal-on-navy is a DEMO preset ONLY (§E removal fence);
  `proof:goo-dot` reds a teal/navy literal in `constants.ts`. ✓
- **keyframes.js 4.3.0 for the start/transition/end/restart choreography (ONE clock);**
  Oscillator is local-only / republish-gated — do NOT import it. ✓ (§9)
- **Real cited math** — IQ 2024 normalized smin, tixy dot-from-field paradigm, Codrops Bayer
  dithering, the Metal cursor-dotted-field, the Fibonacci phyllotaxis dot-sphere, the
  instanced-billboard SOTA — all cited. ✓
- **Compositor/GPU-only;** the interaction perturbs uniforms only (the field-lean UV shift +
  the dot influence), never a layout property. ✓
- **WebGPU primary on Safari 26+ (Baseline);** the WebGL2 fallback (`goo-dot.frag.ts` +
  `goo-dot.render.glsl.ts`) for the genuinely-absent tail only, gated by
  `proof:gpu-substrate-single` clause B; the picker D8 fix (BC.W-WGSL-FALLBACK) makes the net
  silent. ✓
- **Configurator on the RIGHT on desktop (§E), rounded;** body in ONE card; headers ON the
  card; hero shrinks on scroll. ✓
- **`proof:gpu-substrate-single` clause F** — the goo-dot parity row resolves on disk (the
  field-fragment + the instanced-lattice both byte-parity-able). ✓
- **No CLAUDE.md / src edit here** — research only. ✓

---

## Sources (cited)

- [Inigo Quilez — Smooth Minimum (smin), 2024 rewrite (normalization + circular + value/gradient)](https://iquilezles.org/articles/smin/)
- [Codrops — How to Create Interactive, Droplet-like Metaballs with Three.js and GLSL (2025-06-09) — the exponential smin k=7 + pointer-trail spheres](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)
- [The Joy of Tixy — Matthias Dittgen (the `(t,i,x,y)⇒v` dot-matrix-from-function paradigm)](https://matthias.dittgen.name/blog/the-joy-of-tixy)
- [maettig — tixy.land high-resolution renderer (the dot size/sign-from-value mapping)](http://maettig.com/code/canvas/tixy.land-hd.html)
- [Codrops — Interactive WebGL Backgrounds: Bayer Dithering (2025-07-30) — the Bayer2/4/8 macros, PIXEL_SIZE/CELL_PIXEL_SIZE, fbm-organic guidance](https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/)
- [Victor Baro — Dotted background effect in Metal (2026) — the cursor-driven dotted-field: fract cell grid, per-dot radius/brightness from field influence, attract/repel/glow](https://medium.com/@victorbaro/dotted-background-effect-in-metal-8214673edc9d)
- [The Book of Shaders — Shapes (the fract-cell dot grid + smoothstep circle)](https://thebookofshaders.com/07/)
- [Ruben de Vries — Drawing antialiased circles with fwidth (the resolution-independent dot edge)](https://rubendv.be/posts/fwidth/)
- [Extreme Learning — Distribute points on a sphere (Fibonacci phyllotaxis, the dot-sphere lattice)](https://extremelearning.com.au/how-to-evenly-distribute-points-on-a-sphere-more-effectively-than-the-canonical-fibonacci-lattice/)
- [web.dev — WebGPU now supported in major browsers (Baseline Jan 2026)](https://web.dev/blog/webgpu-supported-major-browsers)
- [WebKit — News from WWDC25: Safari 26 beta (WebGPU on Metal, enabled by default)](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/)
- [WebGPU in iOS 26 — App Developer Magazine](https://appdevelopermagazine.com/webgpu-in-ios-26/)
- [caniuse — WebGPU](https://caniuse.com/webgpu)
- [W3C — WebGPU Shading Language (WGSL) spec (derivative builtins)](https://www.w3.org/TR/WGSL/)
- [webgpu.rocks — WGSL derivative functions (dpdx/dpdy/fwidth)](https://webgpu.rocks/wgsl/functions/derivative/)
- [webgpufundamentals — Compatibility Mode (fwidthFine excluded; fwidth/fwidthCoarse OK)](https://webgpufundamentals.org/webgpu/lessons/webgpu-compatibility-mode.html)
- [gpuweb/gpuweb #1795 — derivative functions usable only in fragment stage](https://github.com/gpuweb/gpuweb/issues/1795)
- [VR.org — WebGPU Just Hit Baseline 2026 (instanced billboards over 1px point-list)](https://vr.org/articles/webgpu-baseline-2026-three-js-webxr-default)
- Codebase: `src/components/custom/goo-blob/shaders/metaball.wgsl.ts` (`sceneDistG` :231-296, `thickness` :414, smin :178-203, the full-screen triangle :330-340, the fwidth sites :397,450, the pointer lean :381-386, the velocity-squash :248-260), `metaball.frag.ts` (the WebGL2 fallback shape), `constants.ts` (the field + mood + satellite constants), `types.ts:185-202` (the `BlobConfig` atoms); `src/components/custom/dot-flow-field/shaders/flow-field.render.wgsl.ts:98-153` (the instanced-billboard render pass shape Register B reuses), `flow-field.compute.wgsl.ts` (the storage-buffer pattern the hybrid does NOT need); `src/composables/glass/webgpu/useGpuSubstrate.ts:87-143` (the picker + the D8 bug), `useWebGPUCanvas.ts:50-57` (`supportsWebGPU` presence-only); `src/composables/motion/usePointerVelocityField.ts` (the shared pointer-physics field to consume)
- Tranche docs: `docs/tranches/BC/audit/USER-DEFECTS.md §E/§H`; `docs/tranches/BC/research/procedural-refs.md §0` (D8 picker bug), `§1` (the dot-sphere phyllotaxis + depth-fade), `§2` (the dot-flow-field sweeping-waves regime); `docs/tranches/BC/research/kf-vjs-facilities.md` (the 4.3.0 published surface + Oscillator republish-gate); `docs/tranches/BC/research/viz/goo-blob.md` (the field rebuild + dot-matrix/dot-sphere registers), `viz/dot-flow-field.md` (the anchored-grid + brightness-modulation paradigm), `viz/concentric.md` (the WebGL2-fallback reconciliation); `src/components/custom/PROCEDURAL-SUITE.md` (the suite discipline + the WebGPU-first dual-substrate)
