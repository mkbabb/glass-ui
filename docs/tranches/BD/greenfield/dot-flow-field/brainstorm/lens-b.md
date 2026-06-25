# DotFlowField — GREENFIELD lens-b (cross-engine / perf-first)

> Lens: design for FLAWLESS Chrome **and** Safari + performance. The simplest
> mechanism that hits the bar (KISS), GPU-only because it is a viz, offscreen-park.
> Greenfield from first principles; deft UNION with the extant engine + the
> `BD.W-DOTFLOW-REBUILD` wave (extend, never re-fork). Every cited lever
> source-verified by grep before writing.

---

## 0. LIVE DIAGNOSIS — why `/substrates/dot-flow-field` is worthless (Chrome, both presets)

Navigated `http://localhost:5173/substrates/dot-flow-field`, canvas
`data-testid="dot-flow-field-canvas"` (2066×920 backing, WebGPU ctx, NOT paused),
canvas-readback via `drawImage → getImageData`. The audit's `litFrac:0` *dead
render* has since been partially repaired — the canvas now paints — but it is
**still worthless**, for four compounding, independently-measured reasons:

| # | Measured | Mechanism |
|---|----------|-----------|
| **D1** | **`litFrac 0.0306`, `meanLum 4.18 / 255`** (warm default over the `tier="field"` near-black ground) | The lattice paints, but as **near-invisible warm-grey pinpricks** — `bright = base + waveBand(h)·contrast` with `base≈0`, `contrast 0.6`, a tiny `dotSize 2.0`. 3% of pixels lit, mean luminance ~1.6%. The dots are *technically* there and *practically* absent. |
| **D2** | **3×3 region litFrac uniform: 0.025–0.033 everywhere** (center == corners) | **NO density gradient, NO vignette.** The iOS-27 surpass-target (`IOS27-REFERENCE.md §3`, T17) is a *radial density-gradient halftone* — DENSE edges/corners → CLEAR center behind content. The current viz is a flat `gridPitch`-uniform lattice. This is the **single defining miss**: it cannot be the content-deferential vignette the reference is. |
| **D3** | **`meanFrameDelta 0` over 400 ms — completely STATIC** | The field does not move. No sweep, no advection, no twinkle. The blurb promises "a LARGE wave sweeps slowly through" + "drag the cursor, a ripple pushes through"; nothing moves. A *living* vector field that is frozen is the opposite of the spec. (`windSpeed 0.3` + the Gerstner ω is so slow over the normalized height that the band is sub-perceptible — and the `displaceAmp 0.18·pitch` sub-cell drift is invisible at `dotSize 2.0`.) |
| **D4** | **mono-reference preset → `litFrac 0`, `meanLum 0` — a DEAD BLACK frame**; warm preset over the page → warm-cream dots on cream = invisible | The preset the brief says should be the *contrast-rich lead* paints NOTHING (the `globeMask:true` Lissajous disc + near-black ground composite swallows the dim dots). And the library default — warm-cream over `background:"transparent"` — is **invisible-by-design** over the FLAT-CREAM page (the §3 SYSTEMIC finding: every substrate page is flat cream; a warm viz over flat cream reads dull). |

**Verdict mechanism, in one line:** the field is a *uniform, static, near-zero-contrast
dot grid over a contrast-dead ground* — it is neither **living** (D3), nor **vivid**
(D1/D4), nor **structured** as the reference vignette (D2). The BC retopology
("calm anchored dot-matrix") over-corrected the "mess of noise" into a *dead grid*
and then hid it. None of the four properties the user demands — living vector
field · vivid technicolor · dense advected population · cursor-reactive — is
present on screen. **WORTHLESS is accurate.**

**What is salvageable (survival of the fittest):** the *plumbing* is fit and must
be kept — `createGpuSubstrate` picker (WGSL primary + GLSL twin, offscreen-park,
PRM-freeze, three-reason suspend), `usePointerVelocityField` (velocity + flick
burst + PRM-gate, fed by the renderer's own frame — no second rAF), the
`procedural-color.wgsl/.glsl` OKLab ramp, `flowGridGeometry`, the uniform bridge.
**What is broken and must be RE-INVENT:** the *gestalt* — the field math
(no advection/trails), the density model (uniform, no vignette), the contrast
(invisible), the palette (dim mono-grey, not vivid). The `flowField.ts` Gerstner
*height* evaluator stays available as a SECONDARY register but is no longer the
default mechanism.

---

## 1. FIRST PRINCIPLES — what a dot-flow-field SHOULD be

Strip the name to its physics. A flow field is a **vector field `V(p,t)`**; a
dot-flow-field is a **dense particle population advected along `V`**, leaving
**streamline trails**, with **lifetimes** so trails renew, the field
**cursor-reactive** (the pointer warps `V` locally), painted **vivid** so it reads
as a living current. Four irreducible properties:

1. **A divergence-free field** — particles must *flow*, not pool or explode. The
   canonical cheap divergence-free field is **curl-noise**: `V = ∇⊥ψ` of a scalar
   potential `ψ = fbm(noise)`. The codebase already ships `curlFBM` (WGSL + GLSL +
   JS twins) — this is the fit, kept core. The Gerstner sum-of-sines becomes a
   *minor additive term*, not the driver.
2. **A dense advected population with TRAILS** — N particles step `p += V·dt`,
   accumulate into a **trail/density buffer** that fades each frame (the classic
   *feedback-fade streamline* render: draw into a texture, decay it by `~0.94`,
   re-draw — the streaks ARE the visual). Particles **respawn** on a lifetime
   counter (and when they leave the domain) so the field never thins out.
3. **A density GRADIENT (the reference vignette) + content-mask** — respawn
   density and trail-opacity are weighted by `d(p) = edgeFalloff(p) · (1 − contentMask(p))`:
   dense at edges/corners, clear behind the content column. This is the iOS-27
   surpass-target's defining property (D2's miss) — and the streamline trails
   *flowing inward and dissolving at the clear center* is FAR richer than the
   reference's static halftone.
4. **Vivid + alive + weighty** — a real technicolor ramp (not dim grey), brightness
   driven by *local speed* (`|V|`) so fast streamlines glow and slow ones recede,
   the cursor a *vortex* that warps `V` with inertia (the pointer field's velocity
   + flick-burst), the whole thing breathing on a slow clock.

---

## 2. THE CORE IDEA — a curl-noise streamline-trail field, density-graded, cursor-vortex

**`mode="stream"` (new default): a GPU particle-advection + feedback-fade trail field.**

```
COMPUTE pass  (WGSL primary / GLSL ping-pong fallback):
  for each particle i:
    V = curl(p) · curlStrength            // divergence-free flow (curlFBM, kept)
      + gerstnerVelocity(p,t) · waveTerm  // a slow large undertow (the kept ∇⊥h)
      + pointerVortex(p) · pointerPush    // cursor warps the field (usePointerVelocityField)
    p += V · dt · speedScale
    life -= dt
    if (life <= 0 || outOfDomain(p))      // respawn weighted by density(p)
        p = respawnAt( importanceSample(densityField) ); life = randLife()
    store (p.xy, speed=|V|, life)

RENDER pass — TWO-TARGET feedback-fade (the trail mechanism):
  1. trailTex *= decay (~0.94)            // last frame's streaks fade
  2. draw instanced dot-quads ADDITIVELY into trailTex,
        brightness = base + speed·speedGlow,   // fast = bright (vivid, alive)
        color      = paletteRamp(speed or life), // technicolor by speed
        alpha     *= density(p)               // the vignette: dim at center
  3. blit trailTex → canvas over the ground
```

The **streaks are the streamlines** — a dot that moves leaves a fading tail, so the
field reads as a *living current*, not a grid of points. Dense at the edges,
dissolving into the clear center, flowing on curl-noise, glowing where it's fast.

**`mode="field"` (the kept calm register):** the BC anchored-lattice + sweeping
`waveBand` halftone survives as a SECOND mode (one component, two modes — the
dock-orientation `dim`-idiom discipline `BD.W-DOTFLOW-REBUILD §"ONE component, two
modes"`), for the *content-deferential calm backdrop* case. But `mode="stream"` is
the DEFAULT the `/substrates/dot-flow-field` page leads with — because the user's
verbatim is "living VECTOR FIELD advecting a dense particle population along smooth
streamlines." The two share the SAME `useGpuSubstrate` leaf, the SAME `curlFBM` +
`gerstnerVelocity` math source, the SAME density function, the SAME palette ramp,
the SAME pointer field — only the render target differs (trail-feedback vs
billboard-band). No fork; a `mode` switch over one engine.

---

## 3. THE BOLDEST MOVE — the cursor is a VORTEX that DRAGS the current, with inertia

The reference (a looping video) **cannot react**. lens-b's surpass-lever: the
pointer is not a "ripple about the cursor" (the current toothless `displaceBoost`)
— it is a **rotational vortex injected into the velocity field**, with the
pointer-field's own **velocity and flick-burst** giving it *weight*:

```wgsl
fn pointerVortex(p: vec2<f32>, cursor: vec2<f32>, vel: vec2<f32>, burst: f32) -> vec2<f32> {
  let r = p - cursor;
  let d = length(r);
  let falloff = exp(-d*d / (vortexRadius*vortexRadius));   // local
  let swirl = vec2<f32>(-r.y, r.x) / max(d, 1e-3);         // tangential ∇⊥ — a true vortex
  let drag  = vel;                                          // the cursor DRAGS the current along
  return (swirl * vortexSpin + drag * dragGain + r/d * burst * burstShove) * falloff;
}
```

So a slow drag **drags the streamlines** along the motion (inertia — the field
keeps spinning a beat after the cursor stops, via `usePointerVelocityField`'s eased
velocity + ~1 s burst decay; LIQUID-WEIGHT UNIVERSAL — *morph MORE on move, never
tight/springy*), a fast flick **shoves a shockwave** outward (the accel/burst axis,
already exposed as `pointer.burst`), and the streaks **bend around the cursor** like
a finger through water. A video literally cannot do this. It is the single boldest,
most legible "FAR SURPASS the reference" lever, and it reuses the *exact* extant
pointer composable (no new input plumbing). PRM → `tick(0)` freezes the field, the
vortex is inert, one static streak frame seats.

---

## 4. THE MECHANISM — tokens / shaders / composables (deft union, all source-verified)

### 4.1 Reuse (kept — grep-verified to exist)
- **`createGpuSubstrate(canvas, { setupWGPU, setupGL, mode, respectReducedMotion })`**
  (`src/composables/glass/webgpu/useGpuSubstrate.ts`) — the picker, the
  `armAsync`/`suspend`/`resume`/`wake`/`renderAt`/`dispose` handle surface, the
  offscreen-park + live-PRM re-monitor + three-reason suspend Set. **Unchanged.**
- **`usePointerVelocityField({ respectReducedMotion })`**
  (`src/composables/motion/usePointerVelocityField.ts`) → reads `.velocity`,
  `.speed`, `.burst`, `.position`, `.active`; driven by `.tick(deltaMs)` *inside the
  renderer's existing frame* (no second rAF — the kept discipline in
  `useDotFlowField.ts onFrame`). Feeds §3's vortex. **Unchanged.**
- **`curlFBM`, `gerstnerVelocity`, `sampleVelocity`, `gridOrigin`, `buildWaveLadder`,
  `FLOW_DOMAIN_HALF`** (`composables/flowField.ts` + the WGSL/GLSL twins) — the
  divergence-free basis + the undertow. `curlFBM` becomes the *driver*;
  `gerstnerVelocity` the minor `waveTerm`. **Math byte-reused, re-weighted by config.**
- **`OETF_WGSL`, `OKLCH_MATRICES_WGSL`, `PALETTE_RAMP_WGSL` / `…_GLSL`**
  (`aurora/constants/shaders/procedural-color.wgsl.ts` + the GLSL twin) — the ONE
  OKLab color seam. The vivid palette samples this. **Unchanged.**
- **`flowGridGeometry`, `packFlowComputeUniforms`, `packFlowRenderUniforms`,
  the uniform scratch** (`uniformBridgeWGPU.ts`) — extended (not replaced) with the
  trail-decay + density + vortex uniform rows.

### 4.2 New config (extends `FlowFieldConfig`, no legacy alias — clean break)
```ts
mode: "stream" | "field";        // default "stream" (the living field) — NEW
// stream-mode levers (curl-noise advection + trail-feedback):
particleCount: number;           // RE-INTRODUCED — stream mode is a population, not a lattice
                                 //   (the BC `particleCount → gridPitch` break is mode-scoped:
                                 //    "field" keeps gridPitch; "stream" uses particleCount.
                                 //    NO dual path — they are two modes of ONE schema.)
trailDecay: number;              // 0.90–0.97 — streak persistence (the feedback-fade)
speedScale: number;              // advection step gain (alive but weighty, not frantic)
speedGlow: number;               // brightness from |V| (fast streamlines glow — vivid)
edgeBias: number;                // density vignette strength (dense edges → clear center)
contentMask: { cx, cy, rx, ry } | null;  // the clear region (radial/rect) — content-deferential
vortexRadius, vortexSpin, dragGain, burstShove: number;  // the §3 cursor-vortex
```
The kept `mode:"field"` reads the existing `gridPitch / waveBand* / displaceAmp /
springK / globeMask` levers verbatim. A config carries only the levers its mode
reads (the `dim`-idiom: orthogonal lever sets, one schema).

### 4.3 The trail-feedback render (the heart, both engines)
- **Chrome (WGSL):** a `rgba16float` storage/render `trailTex` ping-ponged: a
  decay pass (`textureLoad·decay`) then an additive instanced-quad pass, then a
  fullscreen blit to the swap-chain over the ground. Premultiplied additive.
- **Safari (WebGL2 — the perf-first cross-engine arm):** the SAME feedback-fade as
  a **two-FBO ping-pong** (`framebufferTexture2D`, `RGBA16F` via `EXT_color_buffer_float`,
  `gl.blendFunc(ONE, ONE)` additive, the decay as a full-screen `gl.blend` multiply or
  a fade-quad at `alpha=1-decay`). WebGL2 ping-pong feedback is **textbook,
  compositor-cheap, and identical-looking** — this is exactly why the perf-first
  lens picks trail-feedback over a CPU trail or an SVG goo (which cannot do dense
  particles). **No `backdrop-filter:url`, no naive ellipsoids, sRGB-correct
  (the OKLab seam linearizes; the blit OETF-encodes), compositor-only.**
- **Particle count budget:** `stream` defaults `particleCount ≈ 6000–12000`
  (well under `MAX_PARTICLES 16384`); the trail buffer is one screen-res texture.
  Dense, 60 fps, offscreen-parked. A video "cannot interact at all" (the surpass
  lever d in `IOS27-REFERENCE.md §3`).

### 4.4 The vivid technicolor + the colorful ground (kills D1/D4)
- **Palette:** `mode:"stream"` default is a **vivid speed-ramp** (cool slow →
  hot fast: a deep-violet→teal→amber→warm-white OKLab ladder) — a real technicolor
  current, not dim mono-grey. This is a **DEMO preset** (presets-in-consumers): the
  library `DEFAULT_FLOW_CONFIG.palette` stays the WARM_IDENTITY two-stop (the
  `proof:viz-dotflow F5` warm-identity fence HOLDS — the vivid ramp lives in
  `demo/stories/substrates/presets.ts`, never a library token).
- **The ground (the §3 colorful-field fold):** the page leads on the **stream field
  over a deep near-black ground that the field's OWN warm/violet streaks light**
  — the field IS the colorful ground (full-bleed, `BD.W-DOTFLOW-REBUILD` Stage A /
  W-PAGE-BACKGROUND). NEVER warm-cream-over-flat-cream (D4). The `ShowcaseFrame
  tier="field"` near-black already exists; the stream palette makes it *vivid*.

---

## 5. CROSS-ENGINE (Chrome + Safari) — the lens-b binding arm (design.md §L7)

| Channel | Chrome | Safari/WebKit |
|---------|--------|---------------|
| Field compute | WGSL compute, storage particle buffer | GLSL transform via a position-texture ping-pong (particle state in an `RGBA32F` tex, advected in a fragment pass) — the standard WebGL2 GPGPU, no compute needed |
| Trail | `rgba16float` render-target ping-pong, additive | two-FBO `RGBA16F` ping-pong (`EXT_color_buffer_float`), additive `blendFunc(ONE,ONE)`, fade-quad decay |
| Color | OKLab seam, sRGB OETF at blit | identical GLSL twin (sRGB color-interp — NO oklab-in-css that WebKit mis-resolves; the math is in-shader) |
| Pointer | `usePointerVelocityField.tick` in-frame | identical (DOM pointer events, no engine seam) |
| PRM | `respectReducedMotion` → `tick(0)` + one static streak frame, park | identical |
| Park | substrate offscreen-park + `content-visibility:auto` (kept on the wrapper) | identical |

The perf-first reason trail-feedback is the RIGHT mechanism for **both** engines:
it is a single screen-res texture + N point-sprites, **no per-frame `backdrop-filter`
re-blur** (the fragile WebKit leg design.md §L7 keeps flagging), no SVG goo url
filter, compositor-only. The §L7 arm is named: **channel = GPU trail-feedback
ping-pong; fallback = WebGL2 two-FBO; fence = paired-engine π (Chromium + WebKit)
of the streaks + the vortex + the vignette**, never a single-engine green.

## 6. A11Y / PRM carve
- `aria-hidden="true"` decorative canvas, `pointer-events:none` (kept).
- WCAG-2.2.2 pause via the `paused` prop → substrate `manual` suspend (kept;
  `DockBackgroundToggle` wires it).
- PRM → ONE static streak frame then park (the `usePointerVelocityField` `tick(0)`
  freeze + the substrate PRM-seat); the vortex is inert under PRM.
- `prefers-reduced-transparency` / `prefers-contrast: more`: the stream palette
  floors brightness UP (legible streaks), never a transmissive layer to drop.

---

## 7. THE DELTA-ASSAY → wave amendment (AUGMENT `BD.W-DOTFLOW-REBUILD`)

**AUGMENT, do not supersede.** `BD.W-DOTFLOW-REBUILD` already owns (a) the dead-render
diagnosis + the `litFrac` born-RED gate, (b) the contrasting-stage fix, (c) the
`mode="field"`/`mode="flow"` two-mode framing. lens-b extends it on three axes the
current wave under-specs against the user's *living-vector-field* verbatim:

1. **The DEFAULT mode is `stream` (curl-noise advection + trail-feedback), not the
   calm halftone.** The wave's "field is a calm vignette" reading is the iOS-27
   *backdrop* case (kept as `mode="field"`); the user's verbatim for THIS viz is a
   *living vector field advecting dense particles along streamlines* → `mode="stream"`
   leads. Reconcile: ONE component, TWO modes, shared math/substrate/pointer/color.
2. **The gate gains a MOTION + STREAK arm.** Born-RED on `meanFrameDelta:0` (D3 — the
   field is static) and on a uniform-density frame (D2 — `litFrac` edge ≈ center).
   New π: (R5) `meanFrameDelta > floor` over N frames (the current STATIC defect);
   (R6) the trail buffer shows DIRECTIONAL streaks (autocorrelation anisotropy — a
   point-grid REDs); (R7) the cursor-vortex bends the streaks (a pointer-driven
   delta about the cursor). Extends the wave's R1–R4 (`litFrac`/lattice/sweep/contrast).
3. **The cross-engine arm is named (§5).** The wave's WGSL/GLSL twin gains the
   trail-feedback ping-pong on BOTH engines; the §L7 paired-engine fence is the gate.

**Reconcile vs the 116 union waves — NO duplication:**
- **vs `goo-dot-matrix` / `dot-matrix`:** those are *anchored dot-grids* (a static
  matrix that goo-morphs / a halftone image lattice) — point-PRESENCE registers. The
  stream field is *advected trails on a vector field* — a MOTION register. Distinct
  gestalt, distinct mechanism (trail-feedback vs billboard-grid). The kept
  `mode="field"` is where dot-flow *touches* dot-matrix territory, and it stays the
  SECONDARY mode (no overlap with the stream default). No dup.
- **vs `W-VIZ-COMPUTE-DENSITY`** (`IOS27-REFERENCE.md §3` surpass-lever d): lens-b's
  density-graded respawn + edge-bias IS that lever, folded into the stream respawn.
- **vs `BC.W-VIZ-DOTFLOW`** (the Gerstner retopology, `proof:viz-dotflow` fenced):
  the Gerstner *height/velocity* math is byte-reused as the `mode="field"` driver +
  the stream `waveTerm` undertow; the warm-identity F5 fence HOLDS (vivid ramp is a
  demo preset). No shader-math edit to the fenced evaluators — the trail-feedback is
  NEW render plumbing, the curl/Gerstner evaluators unchanged.

---

## 8. SUMMARY

**Core idea:** re-invent DotFlowField as a **curl-noise streamline-trail field** —
a dense GPU particle population advected along a divergence-free `V = ∇⊥(fbm)` +
a slow Gerstner undertow, rendered via a **feedback-fade trail buffer** (decay +
additive re-draw) so the dots leave living streaks, with respawn-density **graded by
a radial/content-mask vignette** (dense edges → clear center — the iOS-27
surpass-target's defining miss, now present), **vivid speed-driven technicolor**
(fast streamlines glow), over the field's own deep ground — killing all four
diagnosed defects (D1 invisible, D2 no-vignette, D3 static, D4 dead-preset/cream).
It is a deft UNION: the SAME `useGpuSubstrate` leaf, `curlFBM`/`gerstnerVelocity`
math, `usePointerVelocityField`, and OKLab color seam are reused verbatim; only the
render target (trail-feedback) and the density/respawn model are new, and the calm
BC halftone survives as `mode="field"`. **Boldest move:** the **cursor is a true
rotational VORTEX with inertia** — `usePointerVelocityField`'s eased velocity drags
the streamlines along the gesture (keeps spinning after you stop — LIQUID-WEIGHT
UNIVERSAL) and the flick-burst shoves a shockwave through the current; the streaks
bend around your pointer like a finger through water — a living, interactive
behaviour the reference video physically cannot do, the literal "FAR SURPASS"
lever, built on the exact pointer composable already in the tree.
