# concentric — first-principles re-development research: IRREGULAR LEVEL-SET RINGS (BD generative-viz redevelopment)

Branch `prototype/liquid-dock`. PLANNING/RESEARCH only — zero `src/` paint. This doc proposes
the GPU architecture for the re-imagined `concentric`: a topographic level-set field whose
isolines warp/perturb on the SAME wave-math seam shared with paper-grid + dot-matrix.

---

## 0. What changed vs the shipped concentric — the overturned premise + what survives

The shipped `concentric` (BC.W-VIZ-CONCENTRIC) is a **radial-Fourier ring-interference** field:
the value at p is a sum of CLEAN radial sinusoids `Σ A·sin(k·‖p−c‖_e − ω·t + φ)` about ≤4
centers, and the render extracts each sinusoid CREST as an IQ gradient-normalized isoline. The
rings are mathematically PERFECT concentric ellipses about fixed centers — they beat into moiré
but each family is rigidly circular/elliptical. That is the OLD premise.

**The new user spec OVERTURNS the source field, KEEPS the extraction primitive:**
- OVERTURN: the field is no longer `Σ sin(radial)` (perfect rings). It is the **level sets of an
  arbitrary, randomly-generated scalar field `F(p,t)`** — a topological gradient map's contour
  lines, IRREGULAR by construction. The rings are the iso-contours of `F`, not crests of a
  radial sinusoid. Arbitrary ring COUNT = arbitrary contour LEVEL count.
- OVERTURN: "rings move generally together but with inner variation; stretch/shrink" — the
  contour set must drift/breathe AS A WHOLE (a low-frequency global flow) PLUS a per-level-set
  subtle independent perturbation (each iso-contour wobbles a touch on its own seed).
- OVERTURN: "warp/perturb with the SAME wave-based math as the grid lines" — the perturbation is
  the SHARED `curlFBM` curl-noise domain warp `flow.{glsl,wgsl}.ts` that paper-grid already
  consumes (the divergence-free Bridson flow) PLUS the SAME Tessendorf/Gerstner dispersion
  `ω=√(g·k)` the suite shares (`RING_GRAVITY`). ONE wave-math seam across the three field viz.
- KEEP (the settled floor, gate-green): the **IQ contour-line extraction primitive** is ALREADY
  in the shipped shader — `contourInk(envValue, levels)` extracts evenly-spaced iso-contours of
  an envelope via `|fract(f·N+0.5)−0.5| / fwidth(f·N)`. The shipped `mode: "static-contour"`
  literally already draws the level sets of its envelope. The re-development GENERALIZES the
  SOURCE field feeding `contourInk` from a radial-sinusoid envelope to an arbitrary
  curl-warped fbm/wave field, makes the contour render the DEFAULT (not an opt-in mode), and
  adds the per-level-set perturbation + global flow.
- KEEP: the full-screen-triangle fragment shape-class (no vertex/storage buffer — the lightest
  GPU path, aurora/paper-grid sibling); the single-math-source `field.ts` ↔ WGSL ↔ GLSL
  round-trip discipline; the shared `procedural-color` OKLCh ramp; the warm-cream identity +
  presets-in-consumers fence; the createCanvasLifecycle substrate (offscreen-pause/PRM/DPR).
- KILL (per the BD mandate): the Canvas2D anything — concentric is already born-WebGPU
  fragment-only, so there is NOTHING to delete here (it has no `getContext("2d")` path). It
  STAYS pure WebGPU-primary / WebGL2-fallback, both the same fragment pass.

The headline: **concentric stops being "perfect rings beating" and becomes "the contour map of a
living scalar field"** — the iso-contours of a randomly-generated, curl-warped, wave-perturbed
height field, drawn as thin bright topographic lines.

---

## 1. The math model — what is a level set, and why a fragment shader is the ideal GPU primitive

A LEVEL SET (iso-contour) of a scalar field `F: ℝ²→ℝ` at height `h` is the curve `{ p : F(p)=h }`.
A topographic map draws the level sets at evenly-spaced heights `h_n = n·Δ`. For a fragment
shader this is the IDEAL primitive because we never need to EXTRACT the curve geometrically — we
evaluate `F(p)` at the pixel and test "how close is `F(p)` to the nearest contour height". That
test is the IQ contour-line distance estimate, already shipped:

```
fN   = F(p) · N            // N = contour level count; integer crossings ARE the contours
band = | fract(fN + 0.5) − 0.5 |   // distance (in level units) to the nearest contour
aaW  = fwidth(fN)          // per-pixel change of fN → constant-pixel-width strokes at any DPR
ink  = 1 − smoothstep(halfW, halfW+aa, band / aaW)
```

This is the GPU-native marching-squares — but **gradient-free**. We do NOT run marching-squares
(per-cell edge interpolation + a vertex/line buffer); the per-pixel distance-to-contour does the
same job analytically with perfect AA and zero geometry. (Marching-squares-on-GPU via a compute
pass writing line segments is the OLD-school approach; it is heavier, needs a storage buffer, and
AAs worse. We reject it in §6.)

The ONLY design question is therefore: **what is `F(p,t)`?** — and the answer is the whole brief:
a randomly-generated scalar field that flows + breathes + perturbs on the shared wave-math.

---

## 2. The source field `F(p,t)` — composing a "random topographic gradient map"

`F` is built from THREE additive layers, each tunable, each riding the shared seam:

### 2.1 The base random field — a low-octave value-noise fbm (the "topology")
A 2-3 octave value-noise fbm `baseFBM(p)` is the random scalar terrain. CRITICAL: it must be
LOW-octave + LOW-frequency so its level sets read as a handful of clean nested closed loops (the
"topographic map" look — broad basins + ridges), NOT a busy high-frequency speckle (that contours
into noise hash). This is the SAME `potentialFBM`/`valueNoise`/`hash21` basis paper-grid and
dot-flow-field already carry — the suite's ONE noise basis. A `seed` rotates/offsets the input so
each instance gets a distinct terrain (the "randomly-generated curve" — its contours are the
random curves the brief asks for).

### 2.2 The global flow — the contours drift together (the "move generally together")
The whole field is sampled at a curl-warped coordinate `g(p,t) = p + flowAmp·curlWarp(p,t)` — the
SHARED `curlFBM` divergence-free curl-noise domain warp paper-grid uses (two counter-flowing terms
at different scales/speeds, Alex Harri counter-flow so it never visibly loops). Because the warp
is applied to the COORDINATE feeding `F` (the IQ domain-warp substitution `F(p)→F(g(p))`), the
ENTIRE contour set translates/shears/folds AS ONE FLUID SHEET — the contours move together. This
is byte-identical to paper-grid's `g = uv + curlWarp(g,t)` mechanism — ONE curl source, two
consumers' coordinate substitution.

### 2.3 The wave breathing — the contours stretch/shrink (the "stretch/shrink + inner variation")
ON TOP of the base terrain, add a small slow Tessendorf/Gerstner radial swell:
`F = baseFBM(g) + swellAmp·Σ sin(k_i·‖g−c‖ − ω_i·t + φ_i)` with `ω_i=√(g·k_i)` (the SHARED
`RING_GRAVITY` dispersion the shipped concentric + flow-field share). This low-amplitude additive
term raises/lowers the local height, which makes each contour INFLATE/DEFLATE (a contour at height
h expands when the field rises beneath it) — the "stretch/shrink" the user wants, and because
each `sin` term has its own `ω_i`, different regions breathe out of phase → the "inner variation".
The swell is OPTIONAL (a tunable amplitude); at swellAmp=0 the field is pure curl-warped terrain.

### 2.4 The per-level-set perturbation — each contour wobbles on its OWN seed
The brief: "random subtle per-level-set perturbation". The trick is that the contour-level test
`fN = F·N` lets us perturb the EFFECTIVE HEIGHT per-contour. Instead of a global `Δ` spacing,
offset each contour's height by a tiny per-level random jitter:
`fN = F·N + perturbAmp·noise1D(round(F·N), t)` — sample a 1D noise keyed on the contour INDEX
`round(F·N)` so each iso-contour (each integer level) gets its own small slowly-varying height
offset, so contour #3 wobbles independently of #4. This is the cheap GPU way to give each ring
its own life without sampling a different field per ring (we keep ONE `F` eval). A subtler richer
variant warps the per-contour coordinate by a level-keyed curl phase (see §7 idea 4).

**The composite:**
```
g  = p + flowAmp·curlWarp(p, t)                      // §2.2 global flow (shared curlFBM)
F  = baseFBM(g, seed)                                 // §2.1 random terrain
   + swellAmp·waveSwell(g, t, centers, rings)         // §2.3 dispersion breathing (shared ω=√gk)
fN = F·N + perturbAmp·levelJitter(round(F·N), t)      // §2.4 per-level-set wobble
ink = contourInk(fN)                                  // IQ contour extraction (KEPT primitive)
```

ONE field eval per pixel, ONE fbm, ONE curl, the SAME `contourInk` already shipped. Cheap.

---

## 3. The GPU architecture — fragment-only, the aurora/paper-grid shape-class

### 3.1 The pipeline (KEEP the shipped shape, swap the field source)
- **Full-screen-triangle vertex** (`vs_main`, NDC corners (-1,-1),(3,-1),(-1,3)) — no vertex
  buffer. UNCHANGED.
- **Fragment** (`fs_main`): aspect-correct → compute `g` (curl-warped coord) → eval `F` (terrain +
  swell) → `fN = F·N + levelJitter` → `contourInk` → tint via the OKLCh ramp keyed on `F` (the
  height drives the hue: low basins cool/cream, high ridges warm/amber — the topographic-map
  color register) → premultiplied over transparent (the page reads through between contours).
- NO compute, NO storage buffer, NO ping-pong FBO — the lightest viz path. This is a DROP-IN
  replacement of the shipped fragment's BODY; the substrate wiring, uniform-bridge pattern, and
  GL/WGPU setup composables are structurally reused.

### 3.2 The uniform table (re-shaped from rings → field params)
The shipped `ConcentricUniforms` carries `rings[8]`/`centers[4]`/palette. The re-development
re-purposes the lanes (the typed-struct `uniformBridgeWGPU.ts` source-of-truth pattern stays):
- `u0`: (uTime, uSpeed, uAspect, uFieldScale)
- field: (uLevels N, uLineHalfW, uAA, uSeed)
- flow: (uFlowAmp, uWarpScale, uWarpSpeed, uWarpScale2) — the curl warp params (shared shape)
- swell: (uSwellAmp, uPerturbAmp, uPerturbSpeed, _pad)
- centers[≤4]: the optional swell origins (re-use the existing lanes) — OR drop centers entirely
  if the swell rides the fbm-domain (a design choice, §7 idea 7)
- palette[≤4]: the OKLCh stops (UNCHANGED — the height→hue ramp)
- bg + hasBackground (UNCHANGED — opaque-themed vs transparent-page ground)

### 3.3 The single-math-source round-trip (KEEP the discipline)
`composables/field.ts` (rename/replace `ringField.ts`) is the ONE math source: `baseFBM`,
`waveSwell`, `levelJitter`, `contourDistance`, all pure TS, transcribed line-for-line by the WGSL
+ GLSL shaders. `proof:concentric` clause 3 round-trips the JS↔WGSL↔GLSL at a fixed sample set
(the transcription-drift trap closed structurally). The shared `curlFBM` is the `flow.{glsl,wgsl}`
chunk — concentric becomes its 4TH consumer (aurora-curl, paper-grid, dot-flow-field, +concentric)
— ONE curl operator per backend, no re-fork.

### 3.4 Safari/WebKit (ABSOLUTE per BD mandate)
- The fragment-only pass is the MOST WebKit-safe shape (no compute, no storage buffer — those are
  the WebGPU-on-Safari rough edges). WebGPU is Safari 26+ baseline; the WebGL2 fallback is the
  graceful tail. Both run the SAME fragment math (parity `verified`).
- `fwidth`/`dpdx`/`dpdy` (NOT `fwidthFine`) — Compatibility-Mode safe on Metal/WebKit (the
  shipped concentric already obeys this; KEEP).
- No `backdrop-filter: url()` (the WebKit lens GAP) is involved — concentric paints its own
  pixels, not a backdrop displacement. Safe.

---

## 4. The shared wave-math seam — concentric ⋈ paper-grid ⋈ dot-matrix

This is the load-bearing architectural ask: the THREE field viz must perturb on the SAME wave
math. The seam is TWO shared chunks (already half-built) + ONE new shared swell helper:

| seam | chunk | aurora | paper-grid | dot-matrix(new) | concentric(new) |
|---|---|---|---|---|---|
| **curl-noise flow warp** | `flow.{glsl,wgsl}.ts` `curlFBM` (Bridson, shipped) | ✅ curl-warp mode | ✅ `curlWarp` | ⬚ image-tessellation warp (§ dot-matrix research) | ✅ §2.2 global flow |
| **noise basis** | `potentialFBM`/`valueNoise`/`hash21` (shipped, paper-grid) | ✅ | ✅ | ✅ | ✅ §2.1 terrain |
| **dispersion swell** | `ω=√(g·k)` `RING_GRAVITY` (shipped, ringField + flow) | — | ⬚ breathe term | ⬚ wave-wash | ✅ §2.3 breathing |

**The proposal: promote the noise basis + the dispersion swell into the SHARED `flow.{glsl,wgsl}`
chunk family** so all three field viz splice ONE `wave-math.{glsl,wgsl}.ts` (curl + fbm basis +
dispersion swell), the way they already splice `procedural-color` for ONE color source. Then:
- paper-grid: `g = uv + curlWarp; lines = grid(g)` — warp + (NEW) a shared swell term on the grid
  amplitude for the "deepen the warp/perturbation" ask.
- dot-matrix: the dot fade/grow + the image-tessellation wash rides the SAME `curlWarp` +
  `waveSwell` so a "wave washing over" reads as the SAME flow direction as concentric's contours.
- concentric: §2 above.

This makes the three viz visibly KIN — a wave that washes the dot-matrix flows in the SAME
direction the concentric contours drift and the paper-grid bows. ONE wave-math, three renders.
(The `flow.{glsl,wgsl}` chunk's `potentialFBM` forward-declaration contract already supports a
host-supplied basis; the promotion is a tidy of the duplicated fbm bodies into the shared chunk.)

---

## 5. Interactivity + configurator (per BD mandate — robust, mouse/keyboard, birthdaycolor-like)

### 5.1 Pointer (the `usePointerVelocityField` consumer)
- **Cursor bulge** (paper-grid's `cursorBulge` idiom, shared): a local Gaussian warp of `g` near
  the pointer pushes the contours outward (repel) or inward (attract) — the contours bunch/spread
  under the cursor like pushing on a rubber topography. `useGlassBackdropLuminance`-free; reads
  `usePointerVelocityField` position.
- **Velocity wake**: the pointer VELOCITY (the B4 derived term) feeds the swell phase so a fast
  drag sends a transient wave-ripple through the contours along the drag direction (the
  birthdaycolor.com "the field reacts to motion" feel). A flick BURST spawns a decaying radial
  swell at the release point (re-using the field's own `waveSwell` with a transient amplitude).
- **Click**: drop a new swell center (a transient "pebble in the pond" — the contours ripple
  outward from the click, decaying). Caps at MAX_CENTERS; LRU-evicts.

### 5.2 Keyboard
- Arrow keys nudge the global flow direction bias; `+`/`−` change the contour level count N
  (more/fewer rings) live; `[`/`]` change the line width; `space` pause/resume (the
  WCAG-2.2.2 `v-model:paused` floor); `r` re-seed the terrain (a fresh random map).

### 5.3 Configurator (the AZ.W-HIERARCHY studio)
A `useConfiguratorState<ConcentricConfig>` studio with sections: **Field** (seed/re-seed, terrain
scale, octaves), **Contours** (level count N, line width, AA, line-vs-fill mode), **Flow** (flow
amplitude, warp scale/speed ×2), **Swell** (swell amplitude, dispersion speed, per-level perturb
amplitude/speed), **Palette** (the OKLCh height ramp stops + a `<ColorSwatch>` per stop),
**Interaction** (cursor bulge strength/radius/mode, velocity-wake on/off). Presets-in-consumers
(warm-cream default in the library; themed topographic palettes — sea-chart blues, terrain
greens — live in the demo).

---

## 6. Rejected approaches (recorded so a future agent does not re-open)

- **Marching-squares on GPU (compute → line segments → vertex draw).** Heavier (a compute pass + a
  storage buffer + a line-list draw), AAs worse than the analytic per-pixel distance, and needs a
  geometry buffer the fragment-only path avoids. The IQ per-pixel contour distance IS GPU
  marching-squares done analytically. REJECT.
- **Raymarched 3D iso-surface → project to 2D.** Massive overkill for a 2D contour map; a 3D SDF
  raymarch is the wrong primitive for drawing 2D level sets. REJECT.
- **Per-ring separate geometry (N explicit ring meshes deformed by springs).** The "arbitrary ring
  count" + "stretch/shrink" tempts an N-mesh approach (each ring a deformable closed curve). This
  is the OLD non-GPU-native way — N draws, N vertex buffers, CPU spring sims, and it CANNOT
  produce the topological-merge (two basins' contours merging into a figure-8) that falls OUT of
  a scalar field for free. The scalar-field-+-contour-extraction is strictly more expressive AND
  cheaper. REJECT.
- **Canvas2D contour (d3-contour marching-squares on a 2D context).** The BD mandate forbids
  Canvas2D outright. REJECT (and there is no such path in the shipped concentric to delete).
- **Analytic-only rings (the shipped radial-sinusoid field).** This is the thing being replaced —
  perfect ellipses are too rigid for the "irregular topographic" brief. The radial-sinusoid term
  SURVIVES as the OPTIONAL swell (§2.3), not the base field.

---

## 7. BRAINSTORM — 8+ ideas (ranked by SOTA-impact × feasibility, fragment-only unless noted)

1. **The living topographic map (the headline / DEFAULT).** Curl-warped low-octave fbm terrain,
   IQ contour extraction at N levels, height→hue OKLCh ramp (basins cream, ridges amber), global
   curl flow + per-level jitter. This IS §2 — the irreducible core. Cheap, gestalt, exactly the
   brief. **Build this first.**

2. **The dispersion-breathing swell overlay.** Add the shared `ω=√(g·k)` Tessendorf swell on top
   of the terrain so contours INFLATE/DEFLATE rhythmically — the "stretch/shrink". Tunable
   amplitude; off → pure terrain. Shares the suite dispersion law. **High value, near-free.**

3. **Topology-merge reveal (the figure-8).** Because contours are level sets of ONE field, when
   the curl flow brings two basins together their contours MERGE into a figure-8 then a single
   loop — a topological event a per-ring mesh can never do. Lean into it: tune the terrain so two
   slowly-drifting basins periodically kiss + merge. The signature "this is a real field" moment.

4. **Per-level curl phase (richer inner variation).** Instead of a scalar height jitter (§2.4),
   warp each contour's coordinate by a level-keyed curl phase: `g_n = g + ε·curlWarp(g, t +
   levelOffset(round(fN)))` so contour #3 flows on a slightly different curl phase than #4 — each
   ring has independent inner life while the SET drifts together. One extra curl eval; gate the
   per-level coord behind a cheap branch. **The "inner variation" done right.**

5. **The dual-tier contour (major/minor rules — the paper-grid sibling).** Draw bold contours
   every M levels + faint contours between (the index-contour idiom on a real survey map), via two
   `contourInk` evals brightest-wins — DIRECTLY the paper-grid two-tier Golus pattern transposed
   to contours. Visually ties concentric to paper-grid (shared register). Cheap (one extra eval).

6. **Gradient-hachure shading (the slope cue).** Tint the BETWEEN-contour fill by the field
   GRADIENT MAGNITUDE `|∇F|` (steep = darker, flat = lighter) — the topographic relief-shading
   register. `|∇F|` is a central-difference or (for the fbm) a closed-ish form; a subtle fill
   between the line contours gives depth without busying. Opt-in `fill` mode (the line-vs-fill
   axis). Medium cost (a few extra field taps for the gradient).

7. **Pure-fbm vs sum-of-Gaussians terrain (the seed-shape axis).** Two ways to generate `F`: (a)
   the curl-warped fbm (organic, infinite, §2.1), (b) a sum of a few random Gaussian bumps
   `Σ w_i·exp(−‖p−c_i‖²/2σ²)` (controlled, distinct peaks → cleaner nested rings, the literal
   "draw the level sets of a randomly-generated curve"). Offer BOTH as a `fieldKind` axis — (b) is
   the cleaner "designed" topography, (a) the wilder organic one. Both feed the SAME contourInk.

8. **The image/SDF level-set (the dot-matrix kinship + the Maps-card tie).** Feed `F` a SIGNED
   DISTANCE FIELD of an arbitrary shape (a blob silhouette, a glyph, a logo) instead of fbm — the
   level sets become offset CONTOURS of that shape (concentric rings hugging a blob's outline,
   like a depth sonar). This is the EXACT mechanism the new dot-matrix "tessellate arbitrary
   images" ask needs (an SDF/luminance field sampled into dots) — so concentric + dot-matrix share
   not just the wave-math but the SHAPE-FIELD source. A `sdfTexture` uniform path; the contours of
   a sampled image. **The cross-viz unifier.**

9. **Velocity-reactive ripple wake (interactivity headline).** A pointer flick injects a transient
   decaying radial swell (a dropped pebble) whose ripple propagates outward through the contours
   on the dispersion `ω=√(g·k)` — the contours visibly ripple away from the cursor. Re-uses the
   swell math with a transient amplitude envelope; the birthdaycolor-like "the field is alive to
   you" moment. Cheap (one more transient center).

10. **The cartoon-shadow / depth-offset register (the blob-kinship + the BD cartoon ask).** Draw
    each contour TWICE — once in ink, once offset by a few px in a darker tone (a Memphis-sticker
    drop-stamp on the contour lines) — for a flat-illustrated topographic look, OR a soft
    `filter: drop-shadow` on the whole contour layer for depth. Composes the `--shadow-cartoon-*`
    identity. An opt-in `cartoonShadow` axis mirroring the blob's same option. Decoration-only,
    PRM-safe.

11. **Static-contour print mode (the survey-map still).** The shipped `static-contour` mode (time
    frozen) is a beautiful still topographic print — keep it as a `motion: "static"` axis (a
    paused field reads as a finished map). Free (set speed=0).

---

## 8. The proposed first-principles architecture (one-screen)

```
concentric/
  Concentric.vue              # thin props + refs + useConcentric() (the SFC ~100L, the carve idiom)
  composables/
    field.ts                  # THE single math source (replaces ringField.ts):
                              #   baseFBM(p,seed) · waveSwell(g,t,centers) · levelJitter(idx,t)
                              #   contourDistance(F,N) · fieldGradMag(p) — pure TS, round-trip anchor
    useConcentric.ts          # the renderer: useGpuSubstrate picker + uniform pack + lifecycle
    concentricGLSetup.ts      # WebGL2 fragment pipeline (KEEP shape)
    concentricWGPUSetup.ts    # WebGPU fragment pipeline (KEEP shape)
    uniformBridgeWGPU.ts      # typed-struct ↔ ArrayBuffer (re-shaped lanes, §3.2)
  shaders/
    concentric.wgsl.ts        # WebGPU primary — splices flow.wgsl(curlFBM) + procedural-color.wgsl
    concentric.glsl.ts        # WebGL2 fallback — same field math, splices flow.glsl
  constants.ts                # DEFAULT_CONCENTRIC_CONFIG (warm-cream identity; presets in demo)
  index.ts · README.md

SHARED (promote into the flow chunk family):
  composables/glass/webgl/shaders/wave-math.{glsl,wgsl}.ts
    = curlFBM (shipped) + potentialFBM/valueNoise/hash21 (from paper-grid) + waveSwell(ω=√gk)
    → ONE wave-math seam spliced by aurora · paper-grid · dot-matrix · concentric
```

**Substrate**: WebGPU-first / WebGL2-fallback (born-WebGPU, both the same fragment → parity
`verified`). NO Canvas2D (none to delete). `createCanvasLifecycle` offscreen-pause / live-PRM /
consumer-DPR inherited for free. ONE GL context per route (the field self-stages).

**Render budget**: ONE fbm + ONE curl + ONE swell + ONE contourInk per pixel — lighter than the
shipped multi-center × multi-ring double loop. Comfortably clears the suite perf floor.

---

## 9. Fences + non-goals (recorded)

- The base field is LOW-octave / LOW-frequency — high-octave fbm contours into noise. The "clean
  nested loops" topographic read is the bar; a busy speckle fails it (the shipped concentric's own
  "the line is the point, NOT a turbulence blur" lesson, re-applied to the field source).
- ONE field eval per pixel — do NOT sample a separate field per contour (that is the per-ring-mesh
  anti-pattern's GPU twin). The per-level variation rides a per-INDEX jitter/phase on the SINGLE
  field (§2.4 / §7-4), never N field evals.
- Warm-cream library identity default; themed topographic palettes (sea-chart, terrain) are demo
  presets. `proof:concentric` clause 5 reds a themed literal in `constants.ts`.
- `fwidth`/`dpdx`/`dpdy` only (NOT `fwidthFine`) — Compatibility-Mode safe on Metal/WebKit.
- The shared wave-math seam is the binding architectural commitment: concentric, paper-grid, and
  dot-matrix MUST splice ONE `wave-math.{glsl,wgsl}` chunk (curl + basis + swell), not re-fork the
  fbm/dispersion — the `procedural-color` one-source precedent, extended to flow.
- Safari-first: fragment-only, no compute/storage-buffer, no backdrop-filter:url(). The most
  WebKit-safe GPU shape; WebGL2 the graceful tail.

---

## Sources / prior art

- Inigo Quilez, *Distance to a contour / domain warping* (iquilezles.org/articles/distance,
  /articles/warp) — the per-pixel contour distance + the `f(p)→f(g(p))` warp substitution.
- Robert Bridson, *Curl-Noise for Procedural Fluid Flow*, SIGGRAPH 2007 — the divergence-free
  flow warp (`flow.{glsl,wgsl}.ts curlFBM`, the shared chunk).
- Jerry Tessendorf, *Simulating Ocean Water*, SIGGRAPH 2001 — the deep-water dispersion `ω=√(g·k)`
  (the suite's ONE dispersion law, `RING_GRAVITY`).
- Ben Golus, *The Best Darn Grid Shader (Yet)* — the screen-space-derivative crisp-line AA
  (paper-grid `gridCoverage`, the dual-tier contour sibling in §7-5).
- d3-contour / marching squares — the classical level-set extraction (rejected §6 as the
  non-GPU-native heavier path; the analytic per-pixel distance is its fragment-shader equivalent).
- Shipped: `concentric/composables/ringField.ts` (the IQ isoline + the shipped
  `contourInk` static-contour mode — the KEPT extraction primitive), `paper-grid` (the curl-warp +
  Golus AA + cursorBulge idioms to transpose), `flow.{glsl,wgsl}.ts` (the shared curl chunk).
