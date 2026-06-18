# BC viz research — constellation

> Per-viz SOTA re-modernization research. RESEARCH ONLY — zero `src/` edits.
> Viz: `constellation` (`@mkbabb/glass-ui/constellation`).
> User defect (USER-DEFECTS.md §E, verbatim): "`/substrates/constellation`: broken;
> **not in a card** → every page reuses the giant-hero-text-shrinks-on-scroll +
> body-in-a-card idiom. The **circles are supremely LOW-RES**. Totally redesign to
> **WebGPU — NO canvas anywhere**." Plus the §E global mandate: "**WebGPU is present
> EVERYWHERE (as long as it works on Safari) — ALL animations use it. NO FALLBACKS.
> EVER.** No canvas anywhere." Plus §E: "**REMOVE the teal-on-navy reference entirely.**"

---

## 0. Verdict in one line

The constellation MATH is sound and cited (a drifting **distance-threshold ε-proximity
graph** — `seedField`/`stepField`/`drawEdges` in `constellationField.ts` +
`constellationDraw.ts`), and the interaction layer (warp spring, gravity well, wander,
pinned-drift) is rich and correct. The DEFECT is **purely substrate-side**: the lattice
renders on **Canvas2D** (`useCanvas2D`, the README §"Substrate: DO NOT MIGRATE now" row)
with `ctx.arc()` filled circles. Canvas2D `arc` rasterizes at the *backing-store*
resolution the substrate sets, and the substrate clamps DPR low for wash-class surfaces —
so on a HiDPI display the circles are **drawn at ~1× and CSS-upscaled**, the literal
"supremely LOW-RES" the user reads. The fix is the **W-CONSTELLATION-GPU successor the
PROCEDURAL-SUITE.md already booked** (line 95): re-home the lattice onto
`createGpuSubstrate` (WebGPU instanced-points + instanced-lines primary, DPR-aware, crisp
SDF circles in the fragment), kill the Canvas2D draw passes, keep the JS math evaluator as
the ONE source the WGSL transcribes. The proximity-graph step + the interaction springs
stay; only the RASTERIZER changes. And the page reuses the giant-hero-shrinks-on-scroll +
body-in-ONE-card idiom (§C/§E).

---

## 1. The defect, read precisely (the binding acceptance target)

Two concrete, grounded failures:

1. **"Supremely LOW-RES circles."** `drawNodes` (`constellationDraw.ts:146-167`) paints
   each node with `ctx.arc(p.x, p.y, p.r·kVis, 0, 2π); ctx.fill()`. Canvas2D anti-aliases
   `arc` against the *backing store*, whose size is `clientWidth · dpr` where `dpr` is the
   substrate's clamped value. The README "Substrate" section (line 549-558) confirms the
   Canvas2D substrate is wash-class. At a clamped DPR (≤1.5) on a 2×/3× Retina panel a
   `r≈2px` node is rasterized into ~2-3 device pixels then CSS-scaled up to ~4-6 — a soft,
   jaggy, "low-res" disc. **A WebGPU fragment SDF circle (§5.3) is sampled at the REAL
   backing-store resolution and edge-AA'd by `fwidth`, so it is crisp at any DPR/zoom** —
   the resolution-independent fix.
2. **"Not in a card."** The story (`demo/stories/substrates/constellation.vue`) mounts the
   lattice as a bare full-bleed background rather than inside the canonical
   giant-hero-shrinks-on-scroll + body-in-ONE-card page chassis (§C: "every page reuses the
   giant-hero-text-shrinks-on-scroll + body-in-a-card idiom"; §E names constellation
   verbatim). This is a PAGE-CHASSIS defect (the substrate-page redesign, shared across the
   band), not a viz-internal one — but the constellation viz must render correctly INSIDE a
   bounded, rounded, in-card host (the `:where(.constellation)` consumer-overridable sizing
   already supports a placed parent — `Constellation.vue:92-96`).

The gestalt target: **a crisp, hi-res, drifting node/edge lattice inside a rounded glass
card under a large hero header that shrinks on scroll** — the iOS-27/Awwwards "living
network" register, WebGPU-rendered, warm-cream by default.

---

## 2. Current state — what exists (the inventory + the math that stays)

### 2.1 Files (the colocation, all present — `src/components/custom/constellation/`)
- `Constellation.vue` — the SFC (host `<div>` + `<canvas>` + `useConstellation`).
- `constellationField.ts` — the **ONE math source**: `seedField`, `refitField`,
  `stepField` (the proximity-graph step) + the `Constellation*` type re-export seam.
- `constellationDraw.ts` — the FOUR neutral Canvas2D passes (`drawEdges`/`drawNodes`/
  `drawPointerWeb`/`drawRipples`) + `readPalette` + `kVisOf`. **This module is what the
  WebGPU migration replaces** (the draw passes become WGSL render passes).
- `constellationInteraction.ts` — `stepWell` (gravity well), `warpStep` (focal-node
  critically-damped spring), `nearestNode`/`warpTo`/`setWarpTarget`, `pickWanderTarget`,
  `stepPinnedDrift`, `readInteractionConfig`. **Pure physics; substrate-agnostic; KEEP.**
- `constellationTypes.ts` — the shared interfaces (`ConstellationField`/`Node`/`Pointer`/
  `WarpConfig`/`WellConfig`/`PinnedDrift`/`Palette`/`Props`).
- `constants.ts` — `BASE_WIDTH=1280`, `DEFAULT_PALETTE`, warp/well/wander/pinned-drift
  defaults, `DEFAULT_K_FLOOR=0.72`.
- `composables/useConstellation.ts` — the render-loop + lifecycle wiring (binds
  `useCanvas2D`; this is where the substrate swap lands).
- `index.ts` — the package barrel.

### 2.2 The math is correct + cited (KEEP — it is the ONE source)
The lattice is a textbook **distance-threshold ε-proximity graph** (the
NumberAnalytics/proximity-graph taxonomy: an ε-graph connects pairs within ε of each other
[NumberAnalytics proximity graphs]). `drawEdges` (`constellationDraw.ts:117-141`) is the
O(N²) all-pairs scan joining nodes within `reach = link·k` with a distance-falloff alpha
`t = 1 − d²/reach²`. `stepField` (`constellationField.ts:118-220`) drifts each node on a
constant velocity, wall-bounces, and (optionally) leans toward the pointer WITHOUT changing
speed (the cool-down invariant). This is real geometry, not arbitrary noise — and it is
already framework-free + node-testable. **The migration transcribes this evaluator into
WGSL; it does not rebuild it.**

### 2.3 The interaction layer is rich + correct (KEEP, substrate-agnostic)
- **Warp spring** (`warpStep`, `constellationInteraction.ts:277-298`) — a per-axis 2nd-order
  critically-damped integrator (`ω=2π/response`, ζ) chasing a target node's LIVE position,
  the keyframes.js `(response, dampingFraction)` model reused but NOT `useSpring`'s rAF
  (the parked-substrate discipline). This is the design thesis "drift and warp are the SAME
  mechanic" (`:202-211`).
- **Gravity well** (`stepWell`, `:134-200`) — a held-pointer inverse-square pull with a
  no-singularity floor (`cfg.soften`), a no-slingshot cap (`cfg.maxSpeed`), and an asymmetric
  `|v|→speed` ease-back (gentle held / brisk released — the field-heats-then-cools invariant).
- **Wander / pinned-drift** — autonomous re-targeting cadences.

All of this is pure JS advancing the field per-frame inside the substrate's ONE rAF. It is
substrate-AGNOSTIC: it perturbs `node.{x,y,vx,vy}` and `warp.{x,y}` — the WebGPU path reads
the SAME stepped field. **The ONLY question is whether the step runs on CPU (JS, the
current shape — fine at N≤256) or moves to a compute kernel (needed only at much higher N —
§5.4).**

### 2.4 Why it reads broken (the substrate, not the math)
- **Canvas2D + clamped DPR = low-res** (§1.1). The root cause.
- **The §E mandate "no canvas anywhere"** condemns the Canvas2D substrate as a visible
  surface, independent of the resolution defect.
- **Not in a card** (§1.2) — page-chassis, addressed by the shared substrate-page redesign.

---

## 3. The SOTA technique (cited) — WebGPU instanced points + instanced lines

### 3.1 The proximity-graph math (KEEP — cited)
- **Distance-threshold ε-proximity graph.** Vertices in a geometric space; an edge iff the
  Euclidean distance is below a threshold (`link·k`). [NumberAnalytics, *Mastering Proximity
  Graphs in Algorithmic Graph Theory* — the ε-graph / distance-threshold-based-graph
  taxonomy; Orange3 *Network From Distances* — the distance-matrix-below-threshold
  construction]. Already `drawEdges`. KEEP.
- **The drift+bounce kinematics** (constant-velocity advection + wall reflection) are the
  classic "particles.js / VANTA.NET network background" lineage — a calm, continually
  re-triangulating web. KEEP.
- **Optional richer edge set (booked, NOT this wave):** a Gabriel graph (edge iff the
  diameter-circle is empty) or a Delaunay/Urquhart triangulation gives a cleaner,
  non-crossing lattice [NumberAnalytics; the Urquhart = Delaunay-minus-longest-edge note].
  The distance-threshold ε-graph is the RIGHT default (it gives the dense-then-sparse
  re-triangulating shimmer the reference wants); a Delaunay register is a future config axis,
  not a defect fix.

### 3.2 WebGPU instanced points — the crisp-circle fix (the headline)
The canonical WebGPU points lesson [webgpufundamentals — WebGPU Points]: **WebGPU's
`point-list` primitive is hardwired to 1×1px** (the underlying Metal/Vulkan/DX/GL APIs do
not agree on point size), so a points-as-point-list path is USELESS for sized dots. The SOTA
shape is **instanced billboard quads**: draw `6 vertices × N` instances, one quad per node,
the quad corners selected by `vertex_index`, the per-node center/size/dim read from a
storage buffer by `instance_index`:

```wgsl
// vertex stage — 6 verts × N instances (the webgpufundamentals quad-per-point pattern)
const QUAD = array<vec2f, 6>(
  vec2f(-1,-1), vec2f(1,-1), vec2f(-1,1),
  vec2f(-1, 1), vec2f(1,-1), vec2f( 1,1),
);
let corner = QUAD[vIdx];
let node   = nodes[iIdx];                       // {pos, radius, dim} from storage
let center = node.pos / uResolution * 2 - 1;    // clip space (y-flip as needed)
let half   = (node.radius * uKVis * uDpr) / uResolution;  // DPR-aware → crisp
out.pos    = vec4f(center + corner * half, 0, 1);
out.uv     = corner;                            // [-1,1] → fragment SDF coord
```

The **crispness** comes from sizing `half` in REAL backing-store units (`· uDpr`) AND from
the fragment SDF edge (§5.3), so a node is sampled at full device resolution and AA'd by
the pixel-footprint derivative — never the CSS-upscaled soft blob Canvas2D paints.
[webgpufundamentals — WebGPU Points; ndesmic *Basic WebGPU Rendering* (instanced
billboard quads with size attribute)].

### 3.3 WebGPU instanced lines — the edges (the second render pass)
WebGPU's `line-list` is, like points, 1px-only and join-less — useless for a styled lattice.
The SOTA is **instanced line-segment quads**: for an edge set of E edges, draw `6 verts × E`
instances; the vertex shader loads the segment's two endpoints, projects to screen space, and
**offsets the quad corners by the ORTHOGONAL of the screen-space line direction × half the
pixel width** (the thick-line canon) [rreusser/webgpu-instanced-lines — "N-1 instances, each
renders one segment"; m-schuetz/webgpu_wireframe_thicklines — "the orthogonal of the
screen-space line direction shifts the quad vertices to obtain a thick line"; shone.dev/WebGL
thick lines]:

```wgsl
// vertex stage — expand a segment {a, b} to a screen-space quad of pixel width w
let a = edges[iIdx].a; let b = edges[iIdx].b;       // node positions (px)
let dir = normalize(b - a);
let ortho = vec2f(-dir.y, dir.x);                    // screen-space normal
let alongQuad = QUAD[vIdx];                          // [-1,1]² corner
let p = mix(a, b, alongQuad.x * 0.5 + 0.5)           // lerp along the segment
        + ortho * (alongQuad.y * 0.5) * w * uDpr;    // offset by half-width (DPR-aware)
out.pos = vec4f(p / uResolution * 2 - 1, 0, 1);
out.alpha = edges[iIdx].alpha;                       // distance-falloff weight
```

For the constellation's hairlines a butt cap with no join is correct (the lattice is a
field of independent thin segments, not a continuous polyline) — so the simplest 1-quad-
per-segment expansion suffices; the rreusser join/cap machinery is overkill (booked if a
heavier "glowing tether" register is later wanted).

### 3.4 The edge SET — where it is built
The O(N²) all-pairs edge scan (`drawEdges`) produces the edge list `{a, b, alpha}`. Two
dispositions by node count:
- **N ≤ ~256 (the default register, count=64): build on the CPU** in the JS step (the
  existing `stepField`-adjacent scan), write the edge instance buffer each frame. 64²/2 ≈
  2k pairs — trivial. This is the simplest, lowest-risk shape and keeps the ONE-math-source
  in JS verbatim.
- **N ≫ 256 (a future dense register): build on the GPU** via a spatial-hash compute pass
  (§5.4) — bin nodes into a uniform grid (cell ≈ `link`), each node scans its bin + 8
  neighbors, `atomicAdd` into an edge buffer. This is the cited O(N)-not-O(N²) neighbor
  search [lisyarus *Particle Life in WebGPU* — "make a square grid of bins, sort particles
  into bins, compute interactions only between neighboring bins"; threejsroadmap *Intro to
  WebGPU Compute*]. **Booked, NOT this wave** — the default count does not need it; building
  it now is overfit substrate against the J-inv-10 ≥2-consumer bar.

---

## 4. Substrate, Safari, and the WebGPU-everywhere mandate

### 4.1 WebGPU is Baseline — Safari 26+ ships it ON by default (the mandate is satisfiable)
- **WebGPU reached Baseline "Newly available" in January 2026** — Chrome/Edge 113+,
  Firefox 141+ (macOS Tahoe ARM64 145+), and **Safari 26+ (macOS Tahoe 26, iOS 26, iPadOS
  26, visionOS 26) — enabled by default, no flags** (all iOS browsers ride WebKit).
  [web.dev/blog/webgpu-supported-major-browsers; webkit.org *News from WWDC25: Safari 26
  beta*; Apple *Safari 26.0 Release Notes*; gpuweb Implementation-Status]. Apple's impl is
  on Metal (high perf, low battery). Safari 26.2 even ships WebGPU canvas HDR + WebGPU
  rendering for WebXR on Vision Pro [webkit.org Safari 26.2 features].
- **`canvas.getContext("webgpu")` → `GPUCanvasContext` is supported in Safari 26**, configured
  via `context.configure({device, format, alphaMode})` — exactly what `useWebGPUCanvas.ts`
  (`buildContext`, `:174-209`) does. [MDN GPUCanvasContext].
- **WGSL** ships wherever WebGPU does (W3C CR Draft) — no separate gate.

**Conclusion:** the constellation's WebGPU instanced-points+lines primary IS the surface on
Safari 26+. The "WebGPU everywhere, works on Safari" mandate is correct as of June 2026.

### 4.2 The critical substrate bug to fix FIRST (procedural-refs §0, GROUNDED)
The picker `createGpuSubstrate` (`useGpuSubstrate.ts:91`) commits the backend SYNCHRONOUSLY
via `useGpu = supportsWebGPU() && options.setupWGPU != null`, and `supportsWebGPU()`
(`useWebGPUCanvas.ts:50-57`) is a **presence check only** (`"gpu" in navigator`) — it NEVER
calls `requestAdapter()`. On a host where `navigator.gpu` exists but `requestAdapter()`
returns null (headless, SwiftShader, locked-down VM), the picker picks WebGPU, then
`armAsync` THROWS `"no GPU adapter"` (`:243-245`) with no fallback (the backend was already
committed). This is the `no GPU adapter` PAGEERROR the BC audit observed. **The constellation
migration MUST ride the fixed picker** — an async adapter-real probe (`supportsWebGPUReal()` =
`(await requestAdapter()) != null`, cached one-per-page) OR a try-WebGPU-then-rebuild-WebGL2
shape. This is a SHARED substrate fix (every viz needs it); the constellation wave consumes
it, it does not re-author it.

### 4.3 The "no canvas anywhere" reconciliation (the fallback disposition)
The mandate "NO FALLBACKS. EVER. No canvas anywhere" is a DESIGN-INTENT statement (do not
*design to* a Canvas2D context; do not ship a degraded 2D-context as the visible surface).
The literal engineering reconciliation, given Baseline:
- **The WebGPU WGSL path is THE surface on every Baseline browser (incl. Safari 26+).** A
  `<canvas>` ELEMENT is unavoidable (WebGPU renders into a canvas via `getContext("webgpu")`)
  — "no canvas" means no **Canvas2D drawing context**, which the migration honors.
- **RETIRE the Canvas2D substrate path for constellation** (`useCanvas2D`, the four
  `constellationDraw.ts` passes). It is the "canvas anywhere" the user condemns AND the
  source of the low-res defect.
- **Keep a single WebGL2 instanced-points+lines fallback ONLY for the genuinely-absent
  ~5-10% tail** (Linux Firefox pre-141, pre-A12 iPhones). WebGL2 supports instanced arrays +
  the SAME SDF-circle fragment + the SAME thick-line expansion (the gl_VertexID/instanceID
  shape), so the fallback is byte-parity-able against the WGSL primary (the SAME math source,
  the aurora/goo-blob `.frag`/`.wgsl` precedent). It is GPU, not Canvas2D — it respects the
  "no canvas" intent. Gate-blocked from premature retirement by `proof:gpu-substrate-single`
  clause B until the tail closes.

### 4.4 Substrate reuse (the discipline — NO fork)
- Compose `createGpuSubstrate` (`useGpuSubstrate.ts`) → `useWebGPUCanvas` over the ONE
  `createCanvasLifecycle` leaf. ZERO scheduling re-fork — the offscreen-park, the live-PRM
  one-static-frame freeze, the demand-loop, the `device.lost` self-heal are all INHERITED
  (`useWebGPUCanvas.ts:216-273`). `useConstellation` keeps the same handle shape
  (`pause`/`resume`/`wake`/`renderAt`/`reducedMotion`/`dispose`).
- The JS step (`stepField` + the interaction springs) runs INSIDE the leaf's frame callback
  (the one-loop discipline; `warpStep`/`stepWell` already advance off the per-frame `dt` —
  `constellationField.ts:118-220`). It writes the node + edge instance buffers via
  `device.queue.writeBuffer`; the WGSL render passes draw them. NO second rAF.
- **DPR:** the lattice is wash-class but the CRISPNESS demands the real backing store —
  size the canvas `clientWidth · dpr` (un-clamped or clamped only at the high end, ≤2×, the
  budget cap) so the SDF circles sample at device resolution. This is the literal fix for
  "supremely low-res."
- **Color:** keep the `--constellation-*` token read (`readPalette`,
  `constellationDraw.ts:41-73`) — the node/node-dim/line/accent colors + edge-alpha
  multipliers resolve off the canvas, so a dark-mode flip + a consumer override re-tint the
  lattice. The WGSL reads these as uniforms (resolved JS-side, written to the uniform buffer).
  **Warm-cream identity default; teal-on-navy GONE (§9).**

---

## 5. The WGSL-first kernel design (the new shape)

Two render passes (points + lines) over a CPU-stepped field. NO compute pass at the default
count (§3.4); the compute neighbor-bin is the booked dense-register successor (§5.4).

### 5.1 Data model (the storage buffers — typed-struct SoT)
Mirror the goo-blob/dot-flow-field `uniformBridgeWGPU.ts` typed-struct discipline (the
std140/WGSL-alignment SoT closing the garbage-read trap):
- **`nodes` storage buffer** (`array<Node>`, N rows): `Node { pos: vec2f, radius: f32, dim:
  f32 }` (16-byte aligned). Written each frame from the stepped field.
- **`edges` storage buffer** (`array<Edge>`, ≤E_MAX rows): `Edge { a: vec2f, b: vec2f,
  alpha: f32, accent: f32 }` (32-byte). Written each frame from the CPU edge scan; the draw
  call uses `edgeCount` instances (a uniform). E_MAX caps at `N·MAX_DEGREE` (≈N·12, a
  budget) so the buffer is pre-sized.
- **`uniforms` buffer**: `resolution: vec2f`, `dpr: f32`, `kVis: f32`, `time: f32`; the
  palette block (`node`, `nodeDim`, `line`, `accent` as vec4f premultiplied), `edgeAlpha`,
  `edgeFocusAlpha`, `alpha`, `edgeFloor`, `edgeAccentAlpha`, `opacityCeiling`; the pointer
  block (`pointer: vec2f`, `pointerActive: f32`); the warp/focal block (`warp: vec2f`,
  `focalRadius: f32`). All resolved JS-side.

### 5.2 The points render pass (`constellation-points.wgsl`)
Instanced billboard quads (6 verts × N), the §3.2 vertex shape. Fragment: the crisp SDF
circle (§5.3). The dim/full color from `node.dim` (a `mix(uNode, uNodeDim, dim)`).

### 5.3 The crisp anti-aliased circle fragment (THE low-res fix — cited)
The fragment receives `uv ∈ [-1,1]²` (the quad corner). The circle SDF is `d = length(uv) −
1` (negative inside). The AA coverage is the **fwidth-smoothstep** — the resolution-
independent canon [Red Blob Games *SDF antialiasing* — "divide the AA blur width by
screenPxRange to get the signed-distance range"; numb3r23 *fwidth distance-based AA* — `w =
clamp(d/fwidth(d)+0.5, 0, 1)`; the msdfgen `screenPxRange` lineage]:

```wgsl
@fragment fn fs(in: VSOut) -> @location(0) vec4f {
  let d  = length(in.uv) - 1.0;                 // SDF: 0 at the circle edge
  let aa = fwidth(d);                            // screen-space pixel footprint of d
  let coverage = 1.0 - smoothstep(-aa, aa, d);  // 1 inside → 0 outside, ~1px AA band
  if (coverage <= 0.0) { discard; }
  let col = mix(uNode, uNodeDim, in.dim);
  return vec4f(col.rgb, col.a * coverage * uOpacityCeiling);  // premultiplied
}
```

`fwidth(d)` = `abs(dpdx(d)) + abs(dpdy(d))` (the L1 screen-space derivative — WebKit's exact
form). It measures how many device pixels one SDF unit spans, so the `smoothstep(-aa, aa, d)`
band is ALWAYS ~1px wide regardless of DPR, zoom, or node size — **a crisp edge at every
resolution, the exact antidote to the Canvas2D upscaled blur.** This is the SAME fragment-AA
discipline goo-blob's two `fwidth` sites use (`metaball.frag.ts`/`metaball.wgsl.ts`) and the
concentric ring-line extraction (`abs(fract)+fwidth`). ONE AA canon across the suite.

A soft inner glow (the node "star" register) is an optional second `smoothstep` band on `d`
(a faint core-to-rim falloff), warm-cream, off by default.

### 5.4 The lines render pass (`constellation-lines.wgsl`)
Instanced segment quads (6 verts × edgeCount), the §3.3 expansion. Fragment: the
distance-falloff alpha from the instance (`edge.alpha`) × the cross-line AA (a `smoothstep`
on the orthogonal `lineCoord` so the hairline is itself crisp-edged, the rreusser
`length(lineCoord)` radial-distance trick). The accent edge (`edge.accent > 0`) strokes the
`uAccent` hue at `uEdgeAccentAlpha` (the flagged-node tether — `drawEdges`' G2 path
preserved). The pointer-web (pass 3 today) folds into the SAME line pass: the cursor is an
extra "virtual node" whose incident edges carry `uEdgeFocusAlpha`.

### 5.5 The compute neighbor-bin (BOOKED — the dense register)
For a much-denser lattice (N ≫ 256), the O(N²) CPU scan becomes the bottleneck. The booked
successor moves edge-building to a compute pass: a spatial-hash uniform grid (cell ≈ `link`),
a count→prefix-sum→scatter bin build, each node scanning its bin + 8 neighbors and
`atomicAdd`-ing edges into the buffer — the cited O(N) neighbor search [lisyarus *Particle
Life in WebGPU*; threejsroadmap *WebGPU Compute*; the spatial-binning-on-GPU patent lineage].
This is the W-CONSTELLATION-GPU "dense lattice" trigger PROCEDURAL-SUITE.md names (line 95:
"the dot-flow-field advection compute pass generalizes to constellation's nodes"). **NOT this
wave** — the default count=64 does not warrant it; it is overfit substrate until a ≥256-node
consumer lands. Recorded WITH the trigger so the next agent does not re-derive it.

### 5.6 The WGSL/JS round-trip (the parity floor)
The crisp-circle SDF + the line-expansion + the edge-alpha falloff are simple enough to be
byte-parity-able. `proof:gpu-substrate-single` clause F asserts the constellation row resolves
on disk with the calibrated OKLab ΔE bar (mean ≤ 2.0, p99 ≤ 5.0) — the WGSL primary vs the
WebGL2 fallback, measured against the ONE field evaluator + the ONE palette read. The
field-step math stays in JS (it is NOT transcribed to WGSL at the default count — the compute
pass is booked); the parity is on the RENDER (points/lines fragment + vertex expansion),
which the WGSL and GLSL twins share.

---

## 6. The full configurator (the tunable axes — controls-on-the-RIGHT per §E/§D)

The studio is a `useConfiguratorState<ConstellationConfig>` (commit-on-write — a single
surface, the README discipline) seated in a `<ConfiguratorLayer>`/`<ConfiguratorRow>` shell,
**on the RIGHT on desktop** (the §E configurator-placement mandate — all configurators move
to a right rail; the panel rounded per §E "the aurora configurator is not rounded"). The axes
(the existing props become live config rows):

| axis | type / range | default | what it does |
|---|---|---|---|
| **Node count** | slider 16–256 (cap the default register; ≫256 books the compute path) | **64** | density of the lattice (drives the points buffer) |
| **Link distance** | slider, px (`link`) | **132** | the ε threshold — larger = denser web (more edges) |
| **Drift speed** | slider, px/frame (`speed`) | **0.16** | how fast nodes wander (slow = calm) |
| **Node size** | slider, px (base `r`) | **1.6–3.2** range | the dot radius (DPR-aware → crisp at any size) |
| **Edge weight** | slider 0–1 (`edgeAlpha`) | **0.22** | hairline opacity (the lattice presence) |
| **Pointer reactive** | toggle (`pointerReactive`) | **on** | the cursor leans/links to the web (§8) |
| **Gravity well** | toggle + gain/reach (`gravityWell`, `--well-*`) | **off** | held-pointer inverse-square pull |
| **Warp on click** | toggle (`warpOnClick`) | **off** | a click warps the focal node to the nearest (§8) |
| **Wander** | toggle + idle/jitter (`wander`) | **off** | autonomous focal re-targeting cadence |
| **Parallax** | slider 0–0.3 (NEW) | **0.08** | pointer-parallax depth on the lattice (§8) |
| **Accent edges** | toggle + `<ColorSwatch>` (`accentEdges`, `--accent`) | **off** | the flagged-node tether tint |
| **Recession** | slider 0–1 (`opacityCeiling`) | **1** | the per-instance loudness envelope (recede behind content) |
| **Palette** | OKLCh ramp (`<ColorSwatch>` × node/dim/line) | **warm-cream identity** | the lattice color; demo presets in `presets.ts` |
| **Background** | `<ColorSwatch>` / transparent | transparent | the card ground (the glass card shows through) |
| **Reduced-motion** | (inherited) | respect | one static frame then park |
| **Paused** | toggle (WCAG 2.2.2) | off | `<DockBackgroundToggle>` seam |

Config-shape compatibility: the existing `ConstellationProps` (`count`, `link`, `speed`,
`pointerReactive`, `warpOnClick`, `wander`, `gravityWell`, `opacityCeiling`, `accentEdges`,
`pinned`, `pinnedDrift`, `warpAutoRelease`) become live config rows with ZERO API break — the
migration is a substrate swap, not a prop-surface change. NEW: `parallax` (the pointer-
parallax depth, §8) + per-channel `<ColorSwatch>` palette rows. The `--constellation-*` token
overrides remain the consumer-facing retune axis (the studio writes them; a consumer `:root`
override wins).

---

## 7. The comprehensive demo-suite scope

Stories/states the demo must exercise (the substrate page reuses the giant-hero-shrinks-on-
scroll + body-in-ONE-card idiom per §C/§E; ONE rounded glass card with the live lattice, NOT
the double-card-grid idiom the user condemns):

1. **Hero — the crisp default.** The warm-cream drifting lattice, hi-res, inside the hero
   card under a large `text-display-*` "Constellation" header with the subpath
   (`@mkbabb/glass-ui/constellation`) explicitly shown (§E "every page title standardized …
   with its subpath explicitly defined"); the header SHRINKS on scroll. This proves the
   low-res defect is fixed (the binding before/after).
2. **Warm-cream identity default.** The library default palette, pointer-reactive on — the
   neutral register (proves the default is warm-cream, not a demo preset).
3. **Pointer attraction + parallax.** Hover/drag: nodes lean toward the cursor, the lattice
   parallax-shifts with depth, the cursor joins the web (§8). Velocity/acceleration shown.
4. **Gravity well.** Hold the pointer: the inverse-square pull gathers nodes, release: the
   field cools back (the heat-then-cool invariant, the binding π readback).
5. **Warp + wander.** Click to warp the focal node to the nearest; the autonomous wander
   cadence re-targets it. The focal mark (a `drawOverlay`-equivalent WGSL accent ring).
6. **Density sweep.** Three side-by-side stills (sparse / medium / dense `link` + count) —
   the ε-threshold proximity-graph re-triangulation made visible.
7. **Accent edges.** The flagged-node tether in a consumer hue (the slides red preset —
   presets-in-consumers).
8. **Recession.** A low `opacityCeiling` instance behind body content (the "suffuse it as a
   subtle background element" register — the lattice as a calm page backdrop, done right).
9. **Reduced-motion.** One static frame then park (the WCAG/PRM proof — the lattice freezes
   mid-drift, crisp, held).
10. **Paused (WCAG 2.2.2).** `<DockBackgroundToggle>` pause/resume.

Each story is a configurator preset (presets-in-consumers); the accent + dark presets live in
`demo/stories/substrates/presets.ts`, NEVER a library token (§9 fence).

---

## 8. The cursor/touch + velocity/acceleration interaction model

The constellation has the RICHEST existing interaction layer of the suite (warp spring,
gravity well, wander, pinned-drift, pointer-lean). The migration KEEPS all of it (it is
substrate-agnostic JS) and adds the shared velocity-field reader + a parallax depth:

- **Compose `usePointerVelocityField`** (`@mkbabb/glass-ui/motion-core` — BB.B4): pointer
  position (event-driven, PRM-gated) + derived **velocity** + derived **acceleration** + a
  flick **burst**. It owns no rAF — the renderer FEEDS it `tick(deltaMs)` from inside the
  canvas-lifecycle frame callback (the one-loop discipline; `proof:offscreen-pause` intact).
  The CURRENT pointer-lean (`stepField`'s pointer steer, `constellationField.ts:153-171`)
  reads only position; the velocity field adds the dynamics.
- **Pointer attraction (velocity-aware).** The existing pointer-lean (`pull = (1 −
  d/infl)·0.08`) gains a velocity term: a FAST sweep drags a stronger directional lean (the
  nodes follow the cursor's momentum), a slow hover is a gentle local gather. `velocity`
  scales the lean magnitude + biases its direction along the sweep. The gravity well
  (`stepWell`) is the held-pointer escalation of the same.
- **Acceleration (the second derivative) → a focal BURST.** A flick (high accel) fires a
  transient focal-node warp + a ripple (the `flick burst` term made visible) — the lattice
  momentarily snaps the focal toward the cursor and drops an expanding ring (the existing
  `drawRipples` becomes a WGSL ripple instance), then settles on the warp spring. This is the
  acceleration term the user mandate names ("the interaction reads velocity AND acceleration").
- **Parallax (NEW depth axis).** Each node carries a depth `z ∈ [0,1]` (seeded); the
  pointer position offsets node screen positions by `parallax · z · (pointer − center)` — a
  cheap pointer-parallax that gives the flat lattice apparent depth (the Awwwards "living
  network" register). Velocity-damped so it does not jitter. Compositor/GPU-only (it perturbs
  the node-position uniform write, never a layout property).
- **Choreography on ONE clock (keyframes.js).** The enter/transition/restart is one
  `SpringProgress`-backed clock: the page-enter lattice build-in (a fade + a "settle from
  scatter" where nodes spring from a seeded scatter to their drift positions) rides a
  `SpringProgress`; a preset-switch / restart re-seats it velocity-continuously
  (`reseatToSpring`); the focal warp + the cursor burst decay on the same spring family
  (`decayRest` projects the rest point). The warp spring ALREADY uses the keyframes.js
  `(response, dampingFraction)` model (`warpStep`); keyframes.js is the single choreography
  source — NO hand-rolled rAF spring, NO `useSpring` (the parked-substrate discipline).
- **PRM:** `usePointerVelocityField`'s deterministic `tick(0)` freeze — under reduce the
  pointer interaction is inert (no live velocity), the lattice paints one static frame
  (crisp, held). The substrate's live-PRM re-monitor handles the freeze.

---

## 9. Discipline checklist (the binding fences)

- **ONE lifecycle leaf:** `createCanvasLifecycle` via `useGpuSubstrate`/`useWebGPUCanvas`.
  Do NOT fork. The `useCanvas2D` substrate is RETIRED for constellation. ✓
- **ONE math source:** `constellationField.ts` (`seedField`/`stepField`) +
  `constellationInteraction.ts` (the springs) stay the SINGLE JS evaluator; the WGSL
  transcribes only the RENDER (points/lines fragment + vertex expansion), not the field step
  (the compute step is booked — §5.4). `proof:gpu-substrate-single` clause F parity-checks
  the render against the ONE field + ONE palette.
- **Warm-cream identity default;** teal-on-navy is GONE (§E: "REMOVE the teal-on-navy
  reference entirely"). The constellation default is ALREADY the warm-cream `DEFAULT_PALETTE`
  (`constants.ts:31-41`, `#b4afa3`/`#cdc8bd` warm nodes); the gate reds a teal/navy literal
  in `constants.ts` / `presets.ts`. The dark-mode arm re-tints via the `--constellation-*`
  token cascade (the `:root`/`.dark` plain-hsl pair — Canvas2D's `light-dark()` rejection is
  MOOT now the substrate is WebGPU/uniform-resolved, but keep the plain-hsl per-arm token
  authoring for the consumer-override seam).
- **keyframes.js for the start/transition/end/restart choreography (ONE clock).** The warp
  spring already uses the model; the build-in/restart adds `SpringProgress`/`reseatToSpring`.
  ✓ (§8)
- **Real cited math, no arbitrary noise:** distance-threshold ε-proximity graph
  (NumberAnalytics/Orange3), constant-velocity drift+bounce kinematics, critically-damped
  warp spring (keyframes.js model), inverse-square gravity well. All cited. ✓
- **Crisp circles (the headline fix):** WebGPU instanced billboard quads + fragment SDF +
  `fwidth`-smoothstep AA, sized in REAL backing-store (DPR-aware) units — resolution-
  independent, the antidote to the Canvas2D upscaled-blur low-res defect. ✓
- **Compositor/GPU-only;** `proof:no-layout-animation` n/a (canvas element) but the
  interaction perturbs uniforms/buffers only, never a layout property. ✓
- **WebGPU primary on Safari 26+ (Baseline);** Canvas2D RETIRED; a WebGL2 instanced-points
  +lines fallback (NOT a 2D-context) for the genuinely-absent tail, parity `verified` (the
  render math is byte-parity-able). Rides the FIXED async-adapter-real picker (§4.2).
- **Configurator on the RIGHT on desktop, rounded (§E);** body in ONE card; hero shrinks on
  scroll; the title shows its subpath. ✓
- **`proof:constellation-substrate-single`** is substrate-agnostic at HEAD; it re-points its
  SUBSTRATE-EXISTS asserts to follow the composition into the WebGPU leaf (the
  `proof:webgl-substrate-single` clause-e "asserts follow the composition into the carved
  leaf" precedent). The ANOMALY-IS-SKIN clause (no deck-domain literal in library source)
  stays — the focal mark is still a consumer `drawOverlay`-equivalent.

---

## 10. Sources (cited)

- WebGPU Points (the 1px-point-list limit + instanced billboard quads) —
  https://webgpufundamentals.org/webgpu/lessons/webgpu-points.html
- Basic WebGPU Rendering (instanced billboard quads with a size attribute) —
  https://dev.to/ndesmic/basic-webgpu-rendering-2kob
- WebGPU instanced lines (N-1 instances per N points, screen-space quad expansion, joins/caps) —
  https://github.com/rreusser/webgpu-instanced-lines
- WebGPU wireframe thick lines (orthogonal-of-screen-direction quad expansion, vertex pulling) —
  https://github.com/m-schuetz/webgpu_wireframe_thicklines
- WebGL thick lines (the screen-space orthogonal-offset quad paradigm) — https://shone.dev/thicklines/
- SDF antialiasing (the screenPxRange / fwidth-driven resolution-independent AA) —
  https://www.redblobgames.com/blog/2024-09-22-sdf-antialiasing/
- fwidth distance-based AA (`w = clamp(d/fwidth(d)+0.5, 0, 1)`, the L1-norm derivative) —
  http://www.numb3r23.net/2015/08/17/using-fwidth-for-distance-based-anti-aliasing/
- Proximity graphs / ε-graph / distance-threshold-based graph taxonomy (Gabriel, Urquhart,
  Delaunay) — https://www.numberanalytics.com/blog/mastering-proximity-graphs-algorithmic-graph-theory
- Network from a distance matrix (edge iff distance below threshold) —
  https://orange3-network.readthedocs.io/en/latest/widgets/networkfromdistances.html
- Particle Life in WebGPU (spatial-hash binning, O(N)-not-O(N²) neighbor search) —
  https://lisyarus.github.io/blog/posts/particle-life-simulation-in-browser-using-webgpu.html
- Intro to WebGPU Compute Shaders (workgroup_size, storage buffers, spatial partitioning) —
  https://threejsroadmap.com/blog/introduction-to-webgpu-compute-shaders
- WebGPU Baseline + Safari 26 status (enabled by default, macOS Tahoe 26 / iOS 26) —
  https://web.dev/blog/webgpu-supported-major-browsers ;
  https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/ ;
  https://developer.apple.com/documentation/safari-release-notes/safari-26-release-notes ;
  https://github.com/gpuweb/gpuweb/wiki/Implementation-Status
- GPUCanvasContext / getContext("webgpu") Safari 26 —
  https://developer.mozilla.org/en-US/docs/Web/API/GPUCanvasContext ;
  https://webkit.org/blog/17640/webkit-features-for-safari-26-2/
- In-repo: `constellationField.ts:51-220` (seed/step proximity-graph), `constellationDraw.ts:94-239`
  (the four Canvas2D passes — the migration target), `constellationInteraction.ts:134-298`
  (warp spring / gravity well — KEEP), `constants.ts:17-94` (BASE_WIDTH/palette/warp/well/
  pinned-drift defaults), `Constellation.vue:38-105` (props + consumer-overridable sizing),
  `useGpuSubstrate.ts:87-143` + `useWebGPUCanvas.ts:50-273` (the substrate to compose +
  the picker bug to ride the fix of), `composables/useConstellation.ts:15` (the `useCanvas2D`
  bind to swap), PROCEDURAL-SUITE.md:95 (the booked W-CONSTELLATION-GPU successor — now fired),
  `docs/tranches/BC/research/procedural-refs.md:154-188` (§7 the constellation→WebGPU GAP +
  §0 the picker bug), `docs/tranches/BC/research/viz/dot-flow-field.md` (the sibling BC viz
  research pattern + the shared substrate/Safari/keyframes discipline).
```