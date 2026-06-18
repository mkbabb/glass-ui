# BC viz research — dot-matrix (the fine-dot sphere)

> Per-viz SOTA re-modernization research. RESEARCH ONLY — zero `src/` edits.
> Viz: `dot-matrix` — a **NEW** viz (no `src/components/custom/dot-matrix/` dir at HEAD;
> a sibling of goo-blob per `/substrates/blob` "a dot-matrix goo-blob variant is wanted").
> Reference (the user names it): `Downloads/Screenshot … 14.45.16` / `14.45.25`, re-saved
> into the audit set as `docs/tranches/BC/audit/screenshots/Screenshot_2026-06-17_at_14.45.25.png`
> + `user-Screenshot_2026-06-17_at_14.45.25.png` (the Claude co-work "Gemma 4 in your
> browser / Kernels written by Fable 5" hero — subtle fine-dot SPHERES on near-black).
> Binding §E mandate: "**WebGPU is present EVERYWHERE (as long as it works on Safari) —
> ALL animations use it. NO FALLBACKS. EVER.** No canvas anywhere." + "**REMOVE the
> teal-on-navy reference entirely.**"

---

## 0. Verdict in one line

dot-matrix is a NEW first-class procedural-suite member — a **3D point-cloud SPHERE**: N
fine dots distributed on a sphere SURFACE via the **Fibonacci phyllotaxis spiral** (even,
no pole-clustering), slowly rotating, where **per-dot depth-fade** (opacity + size keyed to
each dot's camera-facing-ness) makes the globe read as a translucent dot-shell on dark. It
is the **Stripe/GitHub/COBE dot-globe lineage** the reference comes from, rendered WebGPU-
first as **instanced billboard quads** (the only correct shape — WebGPU `point-list` is
hardwired to 1px). It is distinct from dot-flow-field (a FLAT anchored lattice swept by a
2D wave) and from goo-blob (an SDF metaball): dot-matrix is a genuine **3D sphere** of dots.
It **composes toward the goo+dot-matrix HYBRID** (procedural-refs §6) — the dot-sphere is
register (a) (the pure phyllotaxis globe), the hybrid is register (b) (a metaball SDF field
Bayer-dithered into dots) — so the dot-MATRIX rasterizer (instanced billboards + depth-fade
+ the warm-cream dot palette) is the shared primitive the hybrid reuses. It reuses the ONE
`createCanvasLifecycle` leaf via `createGpuSubstrate`/`useWebGPUCanvas`, owns ONE pure-JS
math evaluator the WGSL transcribes, defaults to the warm-cream identity (the reference's
mono-white-on-black is a DEMO preset, never a token), and choreographs enter/transition/
restart on the keyframes.js `SpringProgress` clock.

---

## 1. The reference, read precisely (the binding acceptance target)

`Screenshot_2026-06-17_at_14.45.25.png`, pixel-read:

- **TWO fine-dot SPHERES on near-black** — a large globe upper-left, a smaller one upper-
  right. Each is unmistakably a **3D sphere built of dots on its SURFACE** (not a flat disc,
  not a flat grid): the dots crowd toward the silhouette rim and the latitudinal banding
  curves around the sphere, so the eye reads volume + curvature.
- **The dots are SMALL, soft, and even** — a fine uniform spacing across the sphere surface
  with no visible pole-pinching (the Fibonacci-lattice signature; a lat-long grid would pack
  the poles and read as banded rings, which it does NOT).
- **The shape is painted by BRIGHTNESS/DEPTH, not by motion** — dots facing the viewer (the
  near hemisphere) are brighter + slightly larger; dots near the rim + on the far hemisphere
  fade toward near-invisible. This soft front-to-rim falloff (NOT a hard back-face cull) is
  what makes a flat instanced-quad field read as a translucent dot-SHELL.
- **The motion is slow + dignified** — a hero animation; the globe rotates gently (a slow
  Y-axis spin, the banding drifting around the surface). Nothing darts; nothing streaks.
- **Palette: monochrome warm-white-ish dots on near-black.** Exactly the warm-cream-identity
  register the library default already wants (`oklch(0.92 0.03 78)` — the soft warm cream;
  the teal-on-navy the prior dot-flow README invented is NOT in this reference — §9 fence).
- **Contrast is SUBTLE** — the brightest dots are maybe 60-80% white, most are 10-30%; the
  field never blows out. "Subtle" is the dominant quality, exactly as the user wants the
  whole substrate band to read.

The gestalt the user wants: **a calm, fine-dot globe of subtle warm dots, slowly rotating,
that reads as a translucent 3D sphere from the depth-shading alone.** This is the
Stripe/GitHub dot-globe + the COBE 5kB-globe lineage (the dot-sphere homepage register).
[procedural-refs.md:34; Will Howard *Stunning WebGL Dot Spheres*; Shu Ding *COBE*].

---

## 2. Why this is a NEW viz (and how it relates to its siblings)

There is **no `dot-matrix` dir at HEAD** (`ls src/components/custom/` has no `dot-matrix/`).
It is a NEW first-class procedural-suite member, born onto the proven WebGPU substrate. Its
relationships to the three nearest siblings are load-bearing fences:

| sibling | what it is | dot-matrix is DISTINCT because… |
|---|---|---|
| **dot-flow-field** | a FLAT anchored dot lattice swept by a 2D Gerstner/curl wave (the BC retopology) | dot-matrix is a **3D SPHERE** of dots; the dots live on a sphere surface, depth-shaded; there is NO flow field, no advection, no anchored grid. The shared vocabulary is "fine dots, subtle, warm-cream, instanced billboards" — NOT the math. |
| **goo-blob** | an SDF metaball droplet + orbiting satellites | dot-matrix is a point CLOUD, not an SDF field. But it **composes toward the goo+dot HYBRID** (§6 / procedural-refs §6) — the hybrid Bayer-dithers the goo SDF into dots, reusing the dot-MATRIX rasterizer (the instanced-billboard + depth-fade + warm-cream dot register). dot-matrix is the dot-rasterizer the hybrid will reuse. |
| **constellation** | a flat drifting node/edge proximity graph | both are point clouds with instanced billboards + the crisp SDF-circle fragment, but constellation is a FLAT 2D graph with edges; dot-matrix is a 3D sphere with NO edges + depth-fade. They share the §5.3 crisp-circle fragment + the DPR-aware billboard, NOT the topology. |

The user's phrasing — "a dot-matrix goo-blob VARIANT is wanted" + "the goo+dot-matrix
hybrid" — places dot-matrix as a **goo-blob sibling**: it lives BESIDE goo-blob in the
suite, shares the dot-rasterizer with the hybrid, but is its own viz with its own subpath
(`/dot-matrix`), its own configurator, and its own demo suite. The procedural-refs §1 + §6
already book it (the dot-sphere math + the hybrid technique, cited); this doc designs it.

---

## 3. The SOTA technique (cited) — Fibonacci phyllotaxis + depth-fade

### 3.1 The distribution math — the Fibonacci sphere (THE SOTA, cited with concrete formulas)

The canonical even-distribution method is the **spherical Fibonacci lattice / phyllotaxis
spiral** [Martin Roberts, *Evenly Distributing Points on a Sphere*, extremelearning.com.au].
For dot `i` of `N` (the `i + 0.5` half-offset is the area-centered variant used in
computing — it admits ANY `N`, not just Fibonacci-sequence terms):

```
// the golden ratio + golden angle
phi_golden   = (1 + sqrt(5)) / 2                     // ≈ 1.6180339887
goldenAngle  = 2*PI / phi_golden  =  PI*(3 - sqrt5)  // ≈ 2.39996 rad ≈ 137.508°

// per-dot spherical coords (area-preserving — the equal-area latitude)
y      = 1 - 2*(i + 0.5) / N            // y ∈ (-1, 1), the cos(polar) — even by AREA
r      = sqrt(1 - y*y)                  // ring radius at that latitude
theta  = i * goldenAngle                // the golden-angle azimuth spiral
pos    = vec3(cos(theta)*r,  y,  sin(theta)*r) * R   // on the sphere of radius R
```

This is exactly the procedural-refs §1 pin (`phi = acos(1 - 2·(i+0.5)/N)`, `theta = i·π·(3
- √5)`, `pos = (sin φ·cos θ, sin φ·sin θ, cos φ)·R`) — the `y = 1 - 2(i+0.5)/N` form is the
algebraically-identical no-`acos`-needed shape (it computes `cos(polar)` directly, cheaper
in WGSL). **Why it beats lat-long:** a latitude-longitude grid clusters points at the poles
(equal angular latitude increments make progressively smaller circles → dense rings at the
poles), reading as banded rings, NOT an even field; the Fibonacci lattice distributes points
by the irrational golden ratio so each point covers nearly equal AREA, with no resonance gaps
[extremelearning.com.au — "area-preserving projection … prevents resonance patterns"; arXiv
0912.4540 *Measurement of areas on a sphere using Fibonacci and latitude–longitude lattices*
— the Fibonacci lattice's near-equal-area property]. `N ≈ 1500–4000` reads as the
reference's fine field (procedural-refs §1, §9 param table).

### 3.2 The depth-fade — the part that makes it read as a SPHERE on dark (cited + SOTA)

After projecting each dot to screen, modulate per-dot opacity + size by the dot's
**camera-facing-ness** (its surface-normal · the view direction) — a SOFT falloff, NOT a
binary back-face cull (the soft fade is what reads as a translucent shell vs a flat disc).
For a sphere centered at the origin, the surface normal at a dot IS the normalized dot
position, so after rotation the facing term is the rotated-normal's z (toward the camera):

```
n        = rotate(pos_unit, spin)          // the rotated surface normal (unit)
facing   = clamp(n.z * 0.5 + 0.5, 0, 1)    // 1 = dead-front, 0 = dead-back (z ∈ [-1,1])
opacity  = baseOpacity * (0.15 + 0.85*facing)   // front bright, rim/back dim — NOT a cull
size     = baseSize    * (0.6  + 0.4*facing)    // depth-of-field dot-size taper
```

The `0.15 + 0.85·facing` opacity ramp + the `0.6 + 0.4·facing` size taper are the
procedural-refs §1 pinned values (the article omits the depth-fade; this is the SOTA
addition that makes the sphere read). On dark, `baseOpacity ≈ 0.35–0.6`, dots a soft
warm-cream. A slow Y-axis rotation `≈ 0.05–0.1 rad/s` gives life without distraction.
[procedural-refs.md:44-50; Will Howard *Stunning WebGL Dot Spheres* — the phyllotaxis
positioning + facing-mask register the Stripe/GitHub homepages use].

### 3.3 The optional second sphere + the breathing (the reference's TWO globes)

The reference shows TWO spheres (a large + a small). The viz is ONE instanced draw of N
dots; a SECOND globe is a config axis (`spheres: 1 | 2`) that lays a second phyllotaxis
sphere at a config-set offset/scale (its dots concatenated into the SAME instance buffer with
a per-dot sphere-index so the depth-fade + spin resolve per-sphere). A gentle **breathing**
(a sub-perceptual `R` pulse, `R·(1 + breathDepth·sin(t·breathRate))`, `breathDepth ≈ 0.02`)
adds the slow life the hero has — the calmest non-dead register, far below the dot-flow
sweep. Both are OFF by default (the calm warm default is ONE slowly-rotating sphere);
the reference reproduction preset turns the second sphere ON.

### 3.4 The ONE-math-source discipline (the new evaluator)

A pure, node-testable JS evaluator `dotMatrixField.ts` (the `flowField.ts` / `constellationField.ts`
precedent) owns the math the WGSL transcribes LINE-FOR-LINE:
- `fibonacciDot(i, N) → vec3` — the §3.1 phyllotaxis position (deterministic; the WGSL
  `instance_index → unit position` mapping must match the JS EXACTLY).
- `facingFade(normal, spin) → { opacity, size }` — the §3.2 depth-fade (the rotated-normal
  z → opacity/size ramps).
- `spinMatrix(t, axis, rate) → mat3` (or the equivalent quaternion) — the slow rotation; a
  fixed `renderAt(t)` drives it deterministically for the π-capture path.
- `breathRadius(t, depth, rate) → f32` — the §3.3 breathing scalar.
`proof:dot-matrix` clause 3 round-trips JS↔WGSL at a fixed `(i, t)` sample set (the std140-
alignment / transcription-drift trap closed by round-trip, not per-line review — the
goo-blob/dot-flow `uniformBridgeWGPU.ts` precedent).

---

## 4. Substrate, Safari, and the WebGPU-everywhere mandate

### 4.1 WebGPU is Baseline — Safari 26+ ships it ON by default (the mandate is satisfiable)

- **WebGPU reached Baseline "Newly available" in January 2026** — Chrome/Edge 113+,
  Firefox 141+ (macOS Tahoe ARM64 145+), and **Safari 26.0 (macOS Tahoe 26, iOS 26, iPadOS
  26, visionOS 26) — enabled by default, no flags, no opt-in** (all iOS browsers ride WebKit;
  Apple's impl is on Metal — high perf, low battery). Safari 26.2 even ships WebGPU canvas
  HDR + WebGPU rendering for WebXR on Vision Pro. [web.dev/blog/webgpu-supported-major-browsers;
  webkit.org *News from WWDC25: Safari 26 beta*; Apple *Safari 26 Release Notes*;
  appdevelopermagazine *WebGPU in iOS 26*; gpuweb Implementation-Status].
- **`canvas.getContext("webgpu")` → `GPUCanvasContext` is supported in Safari 26**, configured
  via `context.configure({device, format, alphaMode})` — exactly what `useWebGPUCanvas.ts`
  (`buildContext`, `:174-209`) does. WGSL ships wherever WebGPU does (no separate gate).

**Conclusion:** the dot-matrix WGSL instanced-billboard primary IS the surface on every
Baseline browser, Safari 26+ included. The "WebGPU everywhere, works on Safari" mandate is
correct as of June 2026; the only caveats are the async-device discipline the leaf already
owns (`armAsync()` + the `device.lost` self-heal) AND the picker bug (§4.2) the dot-matrix
wave RIDES THE FIX OF.

### 4.2 The substrate picker bug to ride the fix of (procedural-refs §0, GROUNDED)

The picker `createGpuSubstrate` (`useGpuSubstrate.ts:91`) commits the backend SYNCHRONOUSLY
via `const useGpu = supportsWebGPU() && options.setupWGPU != null`, and `supportsWebGPU()`
(`useWebGPUCanvas.ts:50-56`) is a **presence check only** (`"gpu" in navigator && navigator.gpu
!= null`) — it NEVER calls `requestAdapter()`. On a host where `navigator.gpu` exists but
`requestAdapter()` returns null (headless, SwiftShader, locked-down VM), the picker picks
WebGPU, then `armAsync` THROWS `"no GPU adapter"` (`useWebGPUCanvas.ts:243-245`) with NO
fallback (the backend was committed). This is the `no GPU adapter` PAGEERROR the BC audit
observed. **The dot-matrix viz MUST ride the FIXED picker** — an async adapter-real probe
(`supportsWebGPUReal()` = `navigator.gpu != null && (await navigator.gpu.requestAdapter()) !=
null`, cached one-per-page) OR a try-WebGPU-then-rebuild-WebGL2 shape (the more robust shape;
it also catches a device that creates then immediately loses). This is a SHARED substrate fix
every viz needs; the dot-matrix wave CONSUMES it, it does not re-author it. [procedural-refs.md:7-28].

### 4.3 The "no canvas anywhere" reconciliation (the fallback disposition)

The mandate "NO FALLBACKS. EVER. No canvas anywhere" is a DESIGN-INTENT statement (do not
*design to* a Canvas2D context; do not ship a degraded 2D-context as the visible surface).
The literal engineering reconciliation, given Baseline:
- **The WebGPU WGSL path is THE surface on every Baseline browser (incl. Safari 26+).** A
  `<canvas>` ELEMENT is unavoidable (WebGPU renders into a canvas via `getContext("webgpu")`)
  — "no canvas" means no **Canvas2D drawing context**, which dot-matrix honors by construction
  (it is born WebGPU-first; it never had a Canvas2D path to retire).
- **A single WebGL2 instanced-billboard fallback ONLY for the genuinely-absent ~5-10% tail**
  (Linux Firefox pre-141, pre-A12 iPhones). The dot-matrix render is **byte-parity-able** — it
  is a pure instanced-billboard + fragment-SDF-circle + a phyllotaxis vertex computation, the
  SAME shape WebGL2 supports via instanced arrays (`gl_VertexID`/`gl_InstanceID`, the
  aurora/goo-blob `.frag`/`.wgsl` precedent). The fallback is GPU, not Canvas2D — it respects
  the "no canvas" intent. Gate-blocked from premature retirement by
  `proof:gpu-substrate-single` clause B until the tail closes; parity status **`verified`**
  (the render math is byte-parity-able — the same `dotMatrixField.ts` evaluator + the same
  fragment SDF).
- **The NO-FALLBACK reconciliation (procedural-refs §8):** WebGPU is the PRIMARY everywhere
  (Safari included); the WebGL2 fallback is the INVISIBLE don't-crash-to-black insurance that
  fires ONLY when `requestAdapter()` genuinely returns null — it never shows as a "downgrade."
  The gate measures real paint (`meanLum > 0`) on BOTH host types. [procedural-refs.md:168-172].

### 4.4 Substrate reuse (the discipline — NO fork)

- Compose `createGpuSubstrate` (`useGpuSubstrate.ts`) → `useWebGPUCanvas` over the ONE
  `createCanvasLifecycle` leaf. ZERO scheduling re-fork — the offscreen-park, the live-PRM
  one-static-frame freeze, the demand-loop, the `device.lost` self-heal are all INHERITED
  (`useWebGPUCanvas.ts:216-273`). `useDotMatrix` keeps the same handle shape
  (`pause`/`resume`/`wake`/`renderAt`/`reducedMotion`/`dispose`).
- The JS step (the spin advance + the optional breathing + the pointer-velocity tick) runs
  INSIDE the leaf's frame callback (the one-loop discipline). The per-dot positions are
  computed STATICALLY ONCE (the phyllotaxis layout is time-INVARIANT — only the spin matrix
  + the depth-fade are per-frame), so each frame writes only a small uniform block (spin
  matrix, time, breath radius, pointer state) via `device.queue.writeBuffer`; the WGSL vertex
  stage computes the per-dot rotation + projection + depth-fade. NO per-frame N-element buffer
  rewrite (the dots are fixed; only the camera/spin uniform changes). NO second rAF.
- **DPR:** the dot-sphere is wash-class, but the CRISPNESS of fine dots demands the real
  backing store — size the canvas `clientWidth · dpr` clamped at the high end (`resolveBudgetDpr()`,
  `aurora/constants/budget.ts:36`, the AV_AURORA_DPR_MAX=1.5/≤2× cap) so the SDF circles
  sample at device resolution (the antidote to the constellation "supremely low-res" Canvas2D
  blur — never a concern here since dot-matrix is born GPU, but the DPR-aware billboard is the
  binding floor).
- **Color:** the shared `procedural-color.wgsl.ts` OKLCh ramp (ONE color source) resolves the
  warm-cream dot color; the depth-fade multiplies the resolved stop's luminance. The dark-mode
  arm + a consumer override re-tint via the `--dot-matrix-*` token cascade (JS-resolved to the
  uniform buffer). **Warm-cream identity default; teal-on-navy GONE (§9).**

---

## 5. The WGSL-first kernel design (the new shape)

NO compute pass at the default count (the phyllotaxis layout is a closed-form function of
the instance index — there is nothing to integrate; the dots never move relative to each
other). ONE render pass over a static per-dot buffer + a small per-frame uniform block. (A
compute pass is the BOOKED dense-register successor only if N scales to the 10⁵+ range where
even the per-instance vertex math wants pre-staging — not this wave.)

### 5.1 Data model (the buffers — typed-struct SoT)

Mirror the goo-blob/dot-flow-field `uniformBridgeWGPU.ts` typed-struct discipline (the
std140/WGSL-alignment SoT closing the garbage-read trap):
- **`dots` storage/vertex buffer** (`array<Dot>`, N rows): `Dot { unitPos: vec3f, sphereIdx:
  f32 }` (16-byte aligned). Written ONCE at setup (the phyllotaxis layout is time-invariant);
  re-written only on an `N`/`spheres` config change.
- **`uniforms` buffer**: `resolution: vec2f`, `dpr: f32`, `time: f32`; `spin: mat3x3f` (the
  rotated-normal basis), `radius: f32` (the breathing-pulsed R), `baseOpacity: f32`,
  `baseSize: f32`, `facingLo: f32` (0.15), `facingHi: f32` (0.85); the palette block
  (`dotColor` as vec4f premultiplied, ≤MAX_DOT_STOPS); the two-sphere block (`sphere0Offset:
  vec2f`, `sphere0Scale: f32`, `sphere1Offset: vec2f`, `sphere1Scale: f32`); the pointer block
  (`pointer: vec2f`, `pointerActive: f32`, `pointerRepel: f32`, `pointerRadius: f32`); the
  parallax block (`pointerParallax: f32`). All resolved JS-side per frame.

### 5.2 The vertex stage — instanced billboard quads (the only correct shape, cited)

WebGPU's `point-list` is hardwired to **1×1 px** (the underlying Metal/Vulkan/DX/GL APIs do
not agree on point size), so a points-as-point-list path is USELESS for sized dots
[webgpufundamentals — *WebGPU Points*: "1 pixel size points is all WebGPU supports"]. The SOTA
shape is **instanced billboard quads**: draw `6 vertices × N instances`, the quad corners
selected by `vertex_index`, the per-dot data read from the storage buffer by `instance_index`:

```wgsl
const QUAD = array<vec2f, 6>(
  vec2f(-1,-1), vec2f(1,-1), vec2f(-1,1),
  vec2f(-1, 1), vec2f(1,-1), vec2f( 1,1),
);

@vertex fn vs(@builtin(vertex_index) vIdx: u32,
              @builtin(instance_index) iIdx: u32) -> VSOut {
  let dot     = dots[iIdx];
  let n       = uni.spin * dot.unitPos;                 // rotated surface normal (= rotated pos)
  let facing  = clamp(n.z * 0.5 + 0.5, 0.0, 1.0);       // 1 front → 0 back (the depth-fade key)
  let opacity = uni.baseOpacity * (uni.facingLo + uni.facingHi * facing);
  let size    = uni.baseSize    * (0.6 + 0.4 * facing) * uni.dpr;   // DPR-aware → crisp

  // orthographic-ish projection (a hero globe needs no perspective divide; a faint
  // perspective is a config axis). center the sphere, apply per-sphere offset/scale + parallax.
  let center2 = (n.xy * uni.radius * sphereScale(dot.sphereIdx) + sphereOffset(dot.sphereIdx)
                 + parallax(facing)) / uni.resolution;  // → NDC center
  let corner  = QUAD[vIdx];
  var out: VSOut;
  out.pos     = vec4f(center2 + corner * size / uni.resolution, depthFromZ(n.z), 1.0);
  out.uv      = corner;                                  // [-1,1] → fragment SDF coord
  out.opacity = opacity;
  return out;
}
```

- The billboard is camera-facing by construction (the quad is built in NDC, never rotated
  with the sphere — only the dot's CENTER rotates; the quad always faces the screen, the
  webgpufundamentals quad-per-point pattern).
- `depthFromZ(n.z)` writes a depth so the near hemisphere's dots draw over the far ones (an
  alpha-blend with depth-test, OR a back-to-front sort — for a translucent dot-shell the
  cheapest correct shape is additive/premultiplied blend with NO depth-test, where the
  depth-fade opacity does the occlusion implicitly: far dots are already dim, so they read as
  behind; this is the COBE/Stripe register and avoids the per-frame sort).
- `pointerParallax` (§8) offsets the screen center by the pointer (a cheap depth illusion);
  the pointer-repel (§8) lifts near-cursor dots radially.

### 5.3 The fragment stage — the crisp anti-aliased dot (cited)

The fragment receives `uv ∈ [-1,1]²` (the quad corner). The circle SDF is `d = length(uv) −
1` (negative inside). The AA coverage is the **fwidth-smoothstep** — the resolution-
independent canon [Red Blob Games *SDF antialiasing*; numb3r23 *fwidth distance-based AA* —
`w = clamp(d/fwidth(d)+0.5, 0, 1)`; the same fragment-AA the goo-blob `fwidth` sites + the
constellation crisp-circle + the concentric ring extraction use — ONE AA canon across the
suite]:

```wgsl
@fragment fn fs(in: VSOut) -> @location(0) vec4f {
  let d        = length(in.uv) - 1.0;                 // SDF: 0 at the dot edge
  let aa       = fwidth(d);                            // screen-space pixel footprint
  let coverage = 1.0 - smoothstep(-aa, aa, d);        // 1 inside → 0 outside, ~1px AA band
  if (coverage <= 0.0) { discard; }
  // optional soft core glow (a faint center-to-rim falloff for the "lit dot" register)
  let core = mix(1.0, 0.85, smoothstep(-1.0, 0.0, d));
  return vec4f(uDotColor.rgb * core, uDotColor.a * coverage * in.opacity);  // premultiplied
}
```

`fwidth(d) = abs(dpdx(d)) + abs(dpdy(d))` (WebKit's L1-norm form). The `smoothstep(-aa, aa, d)`
band is ALWAYS ~1px wide regardless of DPR, zoom, or dot size — a crisp edge at every
resolution. Fine dots stay crisp even when sub-2px (the reference's tiny dots).

### 5.4 The WGSL/JS round-trip (the parity floor)

`fibonacciDot`, `facingFade`, the spin matrix, `breathRadius`, the dot SDF, the quad
expansion are simple enough to be byte-parity-able. `proof:gpu-substrate-single` clause F
asserts the dot-matrix row resolves on disk with the calibrated OKLab ΔE bar (mean ≤ 2.0, p99
≤ 5.0) — the WGSL primary vs the WebGL2 fallback, measured against the ONE field evaluator +
the ONE palette read. Parity status **`verified`** (a born-GPU viz with a pure-fragment +
closed-form-vertex render is byte-parity-able by construction — the cleaner-than-flow-field
case the §4.3 grid-friendliness unlocks).

---

## 6. The goo+dot-matrix HYBRID (the composed register — procedural-refs §6)

The user wants BOTH "a dot-matrix goo-blob variant" AND "the goo+dot-matrix hybrid." dot-matrix
is register (a) — the pure phyllotaxis dot-sphere (this doc). The HYBRID is register (b) — the
metaball SDF field **Bayer-dithered** into dots so a meatball reads as a dotted droplet:

```glsl
// Codrops Bayer-dithering canon (PIXEL_SIZE 8-10px, 8x8 Bayer for smooth tonal transitions)
float Bayer2(vec2 a){ a=floor(a); return fract(a.x/2.0 + a.y*a.y*0.75); }
// (recursive Bayer8 from Bayer2)
float bright = smoothstep(0.0, -blendBand, sdfDistance);  // inside the blob = bright
vec2  cell   = floor(gl_FragCoord.xy / PIXEL_SIZE);
float dither = Bayer8(cell);
float dot    = step(0.5, bright + dither - 0.5);          // dots thicken toward the core
```

So the blob interior is a field of dots that thicken toward the metaball core and thin at the
rim. **The dot-matrix wave ships register (a); the hybrid (register b) is a SEPARATE booked
wave** (a goo-blob mode / a third viz), reusing (1) the dot-matrix warm-cream dot palette +
the §5.3 crisp fragment, (2) the §3.2 depth-fade (front dots bright, rim dim — so the dotted
blob has volume), and (3) the goo-blob SDF field (`sdf-body.glsl.ts:1-91`, the IQ-2024
normalized smin, KEEP). The fence: dot-matrix does NOT edit the goo-blob SDF; the hybrid is
where they compose. [procedural-refs.md:134-150; Codrops *Bayer Dithering*]. **This composes
toward the hybrid** (the user's "this composes toward the hybrid") — the dot-matrix rasterizer
is the shared primitive.

---

## 7. The full configurator (the tunable axes — controls-on-the-RIGHT per §E/§D)

The studio is a `useConfiguratorState<DotMatrixConfig>` (commit-on-write — a single surface,
the suite discipline) seated in a `<ConfiguratorLayer>`/`<ConfiguratorRow>` shell, **on the
RIGHT on desktop** (the §E configurator-placement mandate — ALL configurators move to a right
rail; the panel rounded per §E "the aurora configurator is not rounded"), inheriting the
AZ.W-HIERARCHY configurator hierarchy vocabulary (`--configurator-section-*`). The axes (the
defaults bias SUBTLE + CALM):

| axis | type / range | default | what it does |
|---|---|---|---|
| **Dot count** | slider 500–4000 (cap `MAX_DOTS`) | **2400** | the phyllotaxis dot count — the field density (the reference's fine field) |
| **Sphere radius** | slider, fraction of view min-dim, 0.2–0.9 | **0.42** | the globe size in the card |
| **Dot size** | slider px @1× | **1.8** | the base billboard radius (DPR-aware → crisp) |
| **Base opacity** | slider 0–1 | **0.5** | the resting dot opacity (subtle ↔ bold) |
| **Depth-fade** | slider 0–1 (maps `facingLo`/`facingHi`) | **0.85** | front-to-rim falloff depth — high = strong shell read |
| **Rotation speed** | slider rad/s 0–0.3 | **0.07** | the slow Y-axis spin — low = dignified |
| **Rotation axis** | tilt slider (axis incline) | **~23° tilt** | the spin-axis tilt (a tilted globe reads more alive) |
| **Spheres** | toggle 1 ↔ 2 (+ offset/scale for #2) | **1** (demo ref preset: **2**) | the reference's two-globe composition |
| **Breathing** | slider 0–0.05 (`breathDepth`) | **0.0** (demo: 0.02) | the sub-perceptual radius pulse — calm life |
| **Core glow** | toggle | **off** | the §5.3 faint center-to-rim lit-dot falloff |
| **Perspective** | slider 0–0.3 | **0** (ortho) | a faint perspective divide (off = the flat hero look) |
| **Palette** | OKLCh ramp (`<ColorSwatch>`) | **warm-cream identity** | the dot color; demo preset = mono-warm-white-on-near-black |
| **Background** | `<ColorSwatch>` / transparent | **transparent** | the card ground (demo: near-black) |
| **Interactive** | toggle (`pointerReactive`) | **off** | pointer parallax + repel (§8) |
| **Pointer mode** | repel ↔ attract + radius | **repel** | the §8 cursor influence direction |
| **Parallax** | slider 0–0.3 | **0.08** | pointer-parallax depth (§8) |
| **Reduced-motion** | (inherited) | **respect** | one static frame then park |
| **Paused** | toggle (WCAG 2.2.2) | **off** | `<DockBackgroundToggle>` seam |

`DotMatrixConfig` is a NEW schema (no prior `dot-matrix` exists — no MIGRATION row). Caps
mirror the WGSL `#define`s (`MAX_DOTS`, `MAX_DOT_STOPS`). The `--dot-matrix-*` token overrides
are the consumer-facing retune axis (the studio writes them; a consumer `:root` override wins).

---

## 8. The cursor/touch + velocity/acceleration interaction model

Compose the shipped `usePointerVelocityField` (`@mkbabb/glass-ui/motion-core` — BB.B4):
pointer position (event-driven, PRM-gated) + derived **velocity** + derived **acceleration**
+ a flick **burst**. It owns no rAF — the renderer FEEDS it `tick(deltaMs)` from inside the
canvas-lifecycle frame callback (the one-loop discipline; `proof:offscreen-pause` intact —
`usePointerVelocityField.ts:6-17`). The procedural-refs §8 names the dot-sphere's interaction
explicitly: "the dot-sphere repels dots near the pointer."

The interaction (a LOCAL perturbation of a calm rotating globe — the sphere stays coherent):
- **Pointer-parallax (the depth illusion).** The pointer position offsets the screen-space
  sphere center by `pointerParallax · (pointer − center)` and tilts the spin axis slightly
  toward the cursor — a cheap pointer-parallax that gives the flat-projected globe apparent
  depth (the Awwwards "living globe" register; the reference is a hero where the sphere
  subtly tracks the cursor). Velocity-damped so it does not jitter. Compositor/GPU-only (it
  perturbs the uniform write, never a layout property).
- **Pointer-repel (velocity-aware).** Dots within `pointerRadius` of the cursor lift radially
  off the sphere surface by a soft Gaussian/quadratic falloff push (the standard repel
  falloff), then the spin carries them back — the cursor pushes a local dimple/bulge through
  the dot-shell. **Velocity scales the push:** a fast sweep drags a stronger, directional
  displacement wake; a slow hover is a gentle local lift. A `repel ↔ attract` axis flips the
  sign (attract gathers the near dots toward the cursor).
- **Acceleration (the second derivative) → a brightness/scale BURST.** A flick (high accel)
  fires a transient brightness + size pulse at the cursor (the `usePointerVelocityField`
  `burst` term made visible — `usePointerVelocityField.ts:24-25,72-76`): the near dots
  momentarily brighten + swell, then decay. This is the acceleration term the user mandate
  names ("the interaction reads velocity AND acceleration").
- **Choreography on ONE clock (keyframes.js).** The enter/transition/restart is one
  `SpringProgress`-backed clock: the page-enter REVEAL is a "settle from scatter" — the dots
  spring from a seeded scatter (or from `R=0`, a collapsed point) out to their phyllotaxis
  positions while the opacity fades in, on a `SpringProgress` (the canonical iOS liquid build-
  in); a preset-switch / restart re-seats it velocity-continuously (`reseatToSpring` —
  `keyframes.d.ts:2526-2550`); the cursor burst + the repel-dimple decay on the same spring
  family (`decayRest` projects the rest point — `keyframes.d.ts:1366`). The slow base rotation
  is a steady advance (not a spring); the optional LOOPED sweep/pulse is the booked
  keyframes.js LIGHT `Oscillator` slot (kf-republish-gated — the booked loop-clock). keyframes.js
  is the single choreography source — NO hand-rolled rAF spring, NO `useSpring` (the parked-
  substrate discipline). [keyframes.d.ts: `SpringProgress`/`springTimingFunction`/`reseatToSpring`/
  `decayRest`/`Oscillator`].
- **PRM:** `usePointerVelocityField`'s deterministic `tick(0)` freeze
  (`usePointerVelocityField.ts:30-36`) — under reduce the pointer interaction is inert (no
  live velocity), and the substrate's live-PRM re-monitor paints ONE static frame then parks
  (the globe freezes mid-rotation, crisp, held). The interaction is compositor-/GPU-only.

---

## 9. The comprehensive demo-suite scope

Stories/states the demo must exercise (the substrate page reuses the giant-hero-text-shrinks-
on-scroll + body-in-ONE-card idiom per §C/§E; ONE rounded glass card with the live globe, NOT
the double-card-grid idiom the user condemns; the title shows its subpath `@mkbabb/glass-ui/dot-matrix`):

1. **Hero — the reference reproduction.** Mono-warm-white dots on near-black, **TWO spheres**
   (the large + small composition), a slow tilted rotation, subtle breathing — the captured
   reference, byte-faithful. The page leads with it (a calm subtle globe filling the hero card
   under a large `text-display-*` "Dot Matrix" header that SHRINKS on scroll).
2. **Warm-cream identity default.** ONE sphere, the library default warm-cream palette over a
   transparent ground (the glass card shows through) — the neutral register (proves the
   default is warm-cream, NOT the demo mono-on-black preset).
3. **Depth-fade sweep.** Three side-by-side stills (low / medium / high depth-fade) — the
   front-to-rim falloff that makes the field read as a 3D shell vs a flat disc (the binding
   "it reads as a sphere" proof).
4. **Dot count / density.** Coarse (≈800) → fine (≈4000) — the phyllotaxis even-distribution
   made visible (the no-pole-clustering proof, contrasted with a deliberate lat-long counter-
   example still that shows the pole-banding the Fibonacci lattice avoids).
5. **Rotation + tilt.** The slow spin on a tilted axis; a stopped-vs-rotating pair.
6. **Two spheres + breathing.** The reference's two-globe composition with the sub-perceptual
   breathing pulse.
7. **Interactive.** Pointer parallax + repel (§8) — hover/drag pushes a local dimple through
   the dot-shell, the globe tracks the cursor with depth, a flick fires the brightness burst.
   Velocity/acceleration shown.
8. **Core glow + perspective.** The faint lit-dot core falloff + a touch of perspective (the
   "rich" register vs the flat hero default).
9. **As a subtle page background.** The §E "suffuse it as a subtle background element" — a
   very-low-opacity, large, slowly-rotating globe behind content (a calm page backdrop, done
   right — subtle, not busy).
10. **Reduced-motion.** One static frame then park (the WCAG/PRM proof — the globe freezes
    mid-rotation, crisp, held).
11. **Paused (WCAG 2.2.2).** `<DockBackgroundToggle>` pause/resume.

Each story is a configurator preset (presets-in-consumers); the reference mono-on-black + the
two-sphere presets live in `demo/stories/substrates/presets.ts`, NEVER a library token (§10
fence).

---

## 10. Discipline checklist (the binding fences)

- **ONE lifecycle leaf:** `createCanvasLifecycle` via `createGpuSubstrate`/`useWebGPUCanvas`.
  Do NOT fork. dot-matrix is born WebGPU-first; it never had a Canvas2D path. ✓
- **ONE math source:** a NEW `dotMatrixField.ts` (`fibonacciDot`/`facingFade`/`spinMatrix`/
  `breathRadius`); the WGSL transcribes it line-for-line; `proof:dot-matrix` clause 3
  round-trips JS↔WGSL at a fixed `(i, t)` sample set. The dot SDF + quad expansion are
  byte-parity-able (parity `verified`).
- **Warm-cream identity default; teal-on-navy is GONE** (§E: "REMOVE the teal-on-navy
  reference entirely"). The dot-matrix default palette is the warm-cream `oklch(0.92 0.03 78)`
  family (the library identity); the reference's mono-warm-white-on-near-black is a DEMO
  preset (`presets.ts`); `proof:dot-matrix` clause 5 reds a teal/navy literal in `constants.ts`.
- **keyframes.js for the start/transition/end/restart choreography (ONE clock).** The page-
  enter "settle-from-scatter" build-in + the restart re-seat + the cursor burst decay ride
  `SpringProgress`/`reseatToSpring`/`decayRest`; the optional looped pulse is the booked
  `Oscillator` (kf-republish-gated). NO hand-rolled rAF spring, NO `useSpring`. ✓ (§8)
- **Real cited math, no arbitrary noise:** the Fibonacci phyllotaxis sphere lattice (Martin
  Roberts / extremelearning + arXiv 0912.4540 area-equality), the golden-angle 2.39996 rad,
  the camera-facing depth-fade (Will Howard dot-spheres / COBE / Stripe lineage). All cited. ✓
- **Crisp dots (the resolution floor):** WebGPU instanced billboard quads (the 1px-point-list
  workaround) + fragment SDF + `fwidth`-smoothstep AA, sized in REAL backing-store (DPR-aware)
  units — resolution-independent fine dots, the suite's ONE AA canon. ✓
- **Compositor/GPU-only;** `proof:no-layout-animation` n/a (canvas element) but the interaction
  perturbs uniforms/buffers only, never a layout property. ✓
- **WebGPU primary on Safari 26+ (Baseline);** a WebGL2 instanced-billboard fallback (NOT a
  Canvas2D context) for the genuinely-absent ~5-10% tail, parity `verified`. Rides the FIXED
  async-adapter-real picker (§4.2). The gate measures real paint (`meanLum > 0`) on BOTH host
  types.
- **Configurator on the RIGHT on desktop, rounded (§E);** body in ONE card; hero shrinks on
  scroll; the title shows its subpath. ✓
- **One GL/compute context per route** — the dot-sphere self-stages ONE WebGPU context (the
  `rail.vue`/`DockStage` precedent). ✓
- **It composes toward the HYBRID (§6):** the dot-matrix rasterizer (instanced billboards +
  depth-fade + warm-cream dot palette + the §5.3 crisp fragment) is the shared primitive the
  booked goo+dot-matrix hybrid reuses; dot-matrix does NOT edit the goo-blob SDF. ✓
- **`proof:gpu-substrate-single` clause F** — the dot-matrix parity row resolves on disk
  (`verified`); `proof:dot-matrix` owns the colocation + useGpuSubstrate-compose + the JS↔WGSL
  round-trip + the Fibonacci-distribution + warm-identity-default + the story-covers-export +
  a self-test bite.

---

## 11. Sources (cited)

- Martin Roberts, *Evenly Distributing Points on a Sphere* (the Fibonacci sphere / phyllotaxis
  lattice, golden angle 2.39996 rad ≈ 137.508°, area-preserving, beats lat-long pole-clustering) —
  https://extremelearning.com.au/evenly-distributing-points-on-a-sphere/
- Martin Roberts, *How to evenly distribute points on a sphere more effectively than the
  canonical Fibonacci Lattice* (the improved offset variant) —
  https://extremelearning.com.au/how-to-evenly-distribute-points-on-a-sphere-more-effectively-than-the-canonical-fibonacci-lattice/
- González (arXiv 0912.4540), *Measurement of areas on a sphere using Fibonacci and
  latitude–longitude lattices* (the Fibonacci lattice's near-equal-area property) —
  https://arxiv.org/pdf/0912.4540 ; https://ar5iv.labs.arxiv.org/html/0912.4540
- Will Howard, *Stunning WebGL Dot Spheres* (the Stripe/GitHub dot-globe lineage —
  phyllotaxis positioning + facing-mask, the reference's exact register) —
  https://medium.com/@whwrd/stunning-dot-spheres-with-webgl-4b3b06592017
- Shu Ding, *COBE: WebGL Globe in 5kB* (the minimal dot-globe lineage — phyllotaxis + depth
  shading, the homepage dot-sphere register) — https://shud.in/thoughts/cobe
- WebGPU Points (the 1px-point-list limit + the instanced billboard quad workaround, the
  vertex shader shape, `pass.draw(6, N)`) —
  https://webgpufundamentals.org/webgpu/lessons/webgpu-points.html
- WebGPU compute-shader basics (workgroup_size 64, storage buffers — for the booked dense
  successor) — https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html
- SDF antialiasing (the screenPxRange / fwidth-driven resolution-independent AA) —
  https://www.redblobgames.com/blog/2024-09-22-sdf-antialiasing/
- fwidth distance-based AA (`w = clamp(d/fwidth(d)+0.5, 0, 1)`, the L1-norm derivative) —
  http://www.numb3r23.net/2015/08/17/using-fwidth-for-distance-based-anti-aliasing/
- Codrops, *Bayer Dithering WebGL backgrounds* (the goo+dot-matrix HYBRID — SDF field
  dithered into dots, PIXEL_SIZE 8-10px, 8×8 Bayer) —
  https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/
- WebGPU Baseline + Safari 26 status (Baseline Jan 2026; Safari 26.0 on macOS Tahoe 26 / iOS
  26 / iPadOS 26 / visionOS 26, enabled by default; Metal-backed; HDR + WebXR on Vision Pro) —
  https://web.dev/blog/webgpu-supported-major-browsers ;
  https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/ ;
  https://developer.apple.com/documentation/safari-release-notes/safari-26-release-notes ;
  https://appdevelopermagazine.com/webgpu-in-ios-26/ ;
  https://github.com/gpuweb/gpuweb/wiki/Implementation-Status
- GPUCanvasContext / getContext("webgpu") (the Safari 26 canvas-config surface) —
  https://developer.mozilla.org/en-US/docs/Web/API/GPUCanvasContext
- In-repo: `docs/tranches/BC/research/procedural-refs.md:32-52` (§1 the dot-sphere math
  already pinned), `:134-150` (§6 the goo+dot hybrid), `:7-28` (§0 the picker bug), `:168-172`
  (§8 the no-fallback decision + the dot-sphere repel), `:180,185` (§9 the param table);
  `src/composables/glass/webgpu/useGpuSubstrate.ts:87-143` (the picker to compose + the bug to
  ride the fix of), `useWebGPUCanvas.ts:50-56,148-324` (the WebGPU backend + the
  `supportsWebGPU` presence-only probe + the `armAsync`/`device.lost` self-heal);
  `src/composables/motion/usePointerVelocityField.ts:1-90` (the velocity/acceleration/burst
  reader + the `tick(0)` PRM freeze); `src/components/custom/dot-flow-field/constants.ts:61-66`
  (the `WARM_IDENTITY_PALETTE` `oklch(0.92 0.03 78)` warm-cream default the dot-matrix default
  mirrors); `aurora/constants/budget.ts:36` (`resolveBudgetDpr`/AV_AURORA_DPR_MAX); the
  keyframes.js d.ts (`SpringProgress`/`reseatToSpring`@2550/`decayRest`@1366/`Oscillator`);
  `src/components/custom/PROCEDURAL-SUITE.md` (the suite discipline + the per-viz migration
  table dot-matrix joins as the 8th member, a goo-blob sibling).
