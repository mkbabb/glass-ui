# dot-flow-field — GOLDEN reference: "AURORA CURRENT"

> The single canonical synthesis of lens-a (pure iOS-27 fidelity), lens-b (cross-engine /
> perf-first), lens-c (audacious cartoon-technicolor). ONE coherent design, deftly integrable
> as a UNION with the extant `DotFlowField` engine — no parallel fork, no legacy. PERFECT in
> Chrome AND Safari. The boldest mechanism is **de-risked by a live spike** (`golden/spike.html`,
> green on the WebGL2 / Safari-real path: `litFrac 0.23`, `meanChroma 20`, `frameDelta 10.3`,
> cursor-vortex reads — see §8).

---

## 0. THE VERDICT THE THREE LENSES AGREE ON

The current `/substrates/dot-flow-field` is **worthless as charged**, for the SAME measured
reasons all three lenses independently hit (live, both modes, canvas readback):

| measure | value | reading |
|---|---|---|
| `litFrac` | ~0.029 | a sparse pinprick lattice, ~97% black |
| `meanLum` | ~3.95/255 | near-invisible |
| `meanChromaOfLit` | ~0 | **monochrome** — not vivid |
| `litFrac` across 6 frames | identical | **functionally STATIC** — no flow reads |

**The three compounding root causes (union of the lenses):**
1. **It is NOT a flow field.** The BC retopology DELETED advection — dots are nailed to a
   permanent lattice anchor and "breathe a hair" via a critically-damped pull (`cs_main`:
   `pos = mix(pos, anchorTarget, 1-exp(-springK·dt))`, `displaceAmp 0.18` sub-half-pitch).
   A flow field whose particles cannot flow is dead by construction.
2. **The brightness/color model is near-invisible + monochrome** — `dotSize 2.0` over ~26px
   pitch, low-alpha band-lit, mono-warm palette → a faint flat halftone. ZERO trails.
3. **(lens-c's unique catch — load-bearing)** on a large fraction of hosts the picker SILENTLY
   runs the **WebGL2 fragment fallback**, not WebGPU; and the WebGL2 ctx has no
   `preserveDrawingBuffer`, so a 2D `drawImage` readback returns **all-zero** — the gate is not
   merely born-RED, it is born-**UNMEASURABLE** on the live backend. Any rebuild that gates only
   WebGPU false-greens on the path users actually see.

The user's verbatim for THIS route is a **living VECTOR/FLOW field** — dense particles advected
along smooth streamlines, trails/lifetimes, cursor-reactive deflection, vivid technicolor, alive
& weighty — that **FAR SURPASSES** the reference. That is a kinetic streamline flow, NOT the v4
calm halftone backdrop. The two registers are different vizzes; the GOLDEN carries **both on one
engine** with the living flow as the lead.

---

## 1. THE GOLDEN DESIGN — "AURORA CURRENT"

A dense population of motes **advected along a divergence-free curl-noise current**, each
trailing a **fading ribbon of light** (a feedback-fade trail buffer — the headline gestalt
lever), the ribbon HUE mapped to the mote's **speed** (a 1940s-technicolor velocity-map: slow
eddies cool → fast jets hot), the whole field breathing on a slow clock, the **cursor a live
VORTEX** that motes bend around and spiral off — over a **deep warm-near-black full-bleed
ground** with a **colorful corner-bloom + defined edge** (the §3 colorful-field-behind-glass
law). iOS-27 Liquid-Glass register: liquid WEIGHT (motes ease into arcs, never jitter — low
turn-rate inertia), audacious technicolor PUNCH, cartoon flow & follow-through (the trails ARE
overlapping-action + follow-through; the cursor is anticipation→impact→follow-through→settle),
Aristotelian √φ proportion in spawn density / trail half-life / vortex radius / bloom radius.

**The two registers, ONE component (the dock `dim`-idiom discipline — one schema, orthogonal
lever sets, no fork):**

- **`mode:"flow"` — the NEW default for this route** (the AURORA CURRENT). The user's literal
  ask, the "FAR SURPASS."
- **`mode:"field"` — the calm vignetted halftone** (density-gradient, in-place twinkle,
  content-mask) — the `W-DOTFLOW-REBUILD` content-deferential backdrop register, KEPT
  (supersede-not-discard). The iOS-27 v4 "approach."

The retopology's **anchored-lattice-with-spring becomes the `field`-mode evaluator** (it was
always the *backdrop* answer); `flow` mode restores real advection off the SAME `sampleVelocity`.

### 1.1 The strongest move taken from EACH lens (the synthesis)

- **lens-a** → the AURORA-CURRENT gestalt framing + the colorful-corner-bloom ground + the
  clean two-register reconcile vs the 116 union waves (no dup vs `dot-matrix`/`goo-dot`).
- **lens-b** → the perf-first cross-engine arm: trail-feedback is the RIGHT mechanism for BOTH
  engines (one screen-res texture + N point-sprites, no per-frame `backdrop-filter`, no SVG goo,
  compositor-only); the WebGL2 two-FBO ping-pong as the named Safari channel; the
  density-graded respawn (the content-mask vignette) folded into `flow` spawn.
- **lens-c** → the **WebGL2-fallback-is-the-real-path** correction + the
  **`preserveDrawingBuffer` measurability fix at the substrate** (the gate's R0); the
  velocity-keyed 4-stop technicolor ramp (fits the existing `MAX_FLOW_STOPS=4`); the
  cartoon-cast offset-shadow + velocity-anisotropic squash-stretch per mote (the 1940s PUNCH as
  a field property); the cursor-vortex as anticipation→impact→follow-through→settle.

### 1.2 The tensions, RECONCILED

- **audacity (c) vs perf/cross-engine (b):** the cartoon-cast offset-shadow + squash-stretch are
  kept but **scoped to `mode:"flow"` and degraded gracefully** — they are a per-instance billboard
  scale/offset (compositor-cheap, no extra pass) and DROP to plain soft-disc motes under
  `prefers-reduced-transparency`/`prefers-contrast:more` and on the WebGL2 point path where
  per-point dual-billboard is costly (a point-sprite carries the speed-anisotropy in its
  `gl_PointSize` + a directional soft-disc in-frag; the dual-disc shadow is a WebGPU-instanced-
  quad-only enrichment). The gestalt (vivid flowing ribbons) is identical on both engines; the
  shadow-cast is the WebGPU "more." This keeps the spike's measured cross-engine parity.
- **correctness (b) vs fidelity (a/c):** lens-c's "the live defect is WebGL2-fallback, not a dead
  WebGPU two-pass" CORRECTS lens-a's premise. The GOLDEN owns BOTH: the WebGPU compute kernel is
  rebuilt (advection) AND the WebGL2 fallback gets a real, measurable, equal-gestalt path
  (state-texture GPGPU ping-pong, NOT a fragment-LIC compromise — the spike proves a true
  particle ping-pong works in WebGL2, so both engines run the SAME advected-population gestalt,
  not two different ones). `preserveDrawingBuffer` lands at the substrate (benefits every viz).
- **math fence:** `flow` is a real shader-math change (integrator + vortex) → it CANNOT sit under
  the `proof:viz-dotflow` math-frozen fence, which guards the `field`-mode anchored evaluator
  (untouched). The amendment carves this explicitly (§6). F5 (warm LIBRARY palette, no teal/navy
  literal) HOLDS — the technicolor ramp is a DEMO preset.

---

## 2. VISUAL + MOTION + INTERACTION SPEC

### 2.1 Visual
- **Ground:** deep warm-near-black `oklch(~0.11 0.012 50)` full-bleed (NEVER gray — BA.W-NO-GRAY
  warm floor; W-PAGE-BACKGROUND), with a **colorful corner-bloom** (faint amber→magenta radial
  one corner, teal opposite) — the §3 colorful-field + defined edge so glass chrome above reads.
- **Motes:** ~8–12k dense (well under `MAX_PARTICLES 16384`; spike ran the full 16384 at 60fps),
  each a soft additive disc; brightness rides speed; dense enough to read as continuous flow.
- **Trails (THE headline):** a ping-pong feedback buffer — each frame the previous frame draws
  back at decay ~0.93 (toward the warm floor), then motes draw additively over it. Result:
  glowing streaks that fade behind each mote — **ribbons of light braiding along streamlines.**
- **Technicolor velocity-map:** `hue = ramp(speedNorm)` over a bold 4-stop OKLCh ladder — slow
  magenta-violet → electric cyan → hot amber → near-white bloom — sampled through the EXISTING
  `samplePaletteLin` OKLab seam (the ONE color source, no WGSL↔GLSL drift). A DEMO preset.
- **Cartoon cast (WebGPU "more"):** a larger, darker, OFFSET shadow-disc under each bright core
  (offset opposite velocity, scaled by `--motion-weight`·speed — √φ ratio) + velocity-anisotropic
  squash-stretch (fast motes elongate into speed-lines). Drops to plain discs on WebGL2/PRM/PRT.
- **Density gradient (the SURPASS reconcile):** an OPTIONAL `--content-mask` seam — spawn density
  thins behind a declared content rect (the v4 content-deferential vignette), the lever shared
  with `mode:"field"`.

### 2.2 Motion (liquid-weight universal + cartoon flow)
- **Inertia:** each mote integrates with momentum — `v = lerp(v, field(p), turnRate); p += v·dt`.
  Low `turnRate` → WEIGHT (eases into the field's turns — arcs, not snaps; follow-through /
  overlapping-action on a particle).
- **Lifetime + respawn:** fades over `lifetimeSec` then respawns (density-weighted / stratified)
  so the field never freezes and density stays even. The fade is the trail's tail.
- **Breathing:** `windSpeed` + curl-phase drift on a slow clock — the current itself living.
- **PRM:** ONE static advected+trailed frame then park (the trail buffer holds the composite; the
  substrate PRM-freeze + `pointer.tick(0)` inherited). The cursor-vortex is inert under PRM.

### 2.3 Interaction (the boldest, most legible SURPASS)
The cursor is a **rotational VORTEX injected into the velocity field**, fed by the EXISTING
`usePointerVelocityField` (`.velocity`/`.speed`/`.burst`/`.active`, `tick(delta)` inside the
renderer frame — NO second rAF):
```
fn pointerVortex(p, cursor, vel, burst):
  r = p - cursor;  d = |r|;  fall = exp(-d²/vortexRadius²)
  swirl = normalize(vec2(-r.y, r.x))          // tangential ∇⊥ — a TRUE vortex
  return (swirl·vortexSpin + vel·dragGain + (r/d)·burst·burstShove) · fall
```
A slow drag DRAGS the streamlines along the gesture (keeps spinning a beat after you stop — the
eased velocity + ~1s burst decay = LIQUID-WEIGHT, morph-more-on-move, never tight/springy); a
fast flick SHOVES a radial shockwave (the accel/burst axis) with a bouncy unwind. The streaks
bend around your pointer like a finger through water — a behaviour the reference VIDEO physically
cannot do. Anticipation (drag wind-up) → impact (burst) → follow-through (lagging swirl) → settle
(inertial unwind). WCAG-2.2.2 pause via `v-model:paused`→substrate `manual`; `aria-hidden`
decorative canvas, `pointer-events:none`.

---

## 3. THE MECHANISM — deft UNION on the extant substrate (KISS/DRY, no fork)

ONE component (`DotFlowField`), ONE `useGpuSubstrate` leaf, ONE WebGPU/WebGL2 picker — extended,
not re-forked.

### 3.1 SURVIVES verbatim (survival of the fittest — all grep-verified to exist)
| primitive | file |
|---|---|
| `createGpuSubstrate` picker (WGPU→WebGL2 fall, `armAsync`/`suspend`/`resume`/`wake`/`renderAt`, offscreen-park, PRM-freeze, three-reason suspend) | `src/composables/glass/webgpu/useGpuSubstrate.ts` |
| `usePointerVelocityField` (`.velocity`/`.speed`/`.burst`/`.active`, `tick`, PRM `tick(0)`) | `src/composables/motion/usePointerVelocityField.ts` |
| `CURL_FBM_GLSL` (divergence-free ∇⊥ψ curl) | `src/composables/glass/webgl/shaders/flow.glsl.ts` |
| `sampleVelocity`/`curlFBM`/`gerstnerVelocity` (JS + WGSL + GLSL twins) | `dot-flow-field/composables/flowField.ts` + `shaders/flow-field.{compute.wgsl,glsl}.ts` |
| `samplePaletteLin` + `OETF_WGSL`/`OKLCH_MATRICES_WGSL` (OKLab ramp, ONE color seam) + GLSL twin | `flow-field.render.wgsl.ts` + `procedural-color.{wgsl,glsl}.ts` |
| `MAX_PARTICLES 16384`, `MAX_FLOW_STOPS 4` (the 4-stop technicolor ramp FITS — no budget change) | `dot-flow-field/constants.ts` |
| the suite lifecycle (pause/PRM/park/`content-visibility`/contain) | the substrate |
| presets-in-consumers home (`FLOW_PRESET_*`) | `demo/stories/substrates/presets.ts` |

### 3.2 RE-INVENTED (only the broken parts — no-legacy clean break)
- **`flow-field.compute.wgsl` `cs_main`** gains a `mode` uniform: `flow` ADVECTS —
  `v = sampleVelocity(p,t) + pointerVortex(...); v = mix(v_prev, v, turnRate); p += v·dt`,
  decrement lifetime, respawn (density-weighted) on death/out-of-domain, write `(pos, speed,
  life)`. `field` keeps the anchored-lattice + twinkle + density-mask (untouched evaluator).
- **The trail feedback buffer (ABSENT → headline lever):** a ping-pong RGBA16F render-target pair
  — (a) decay-blit prev→cur at α, (b) instanced motes additive over it, (c) present. The render
  loop is the substrate's (no new rAF).
- **The render pass:** `speed→hue` via `samplePaletteLin(speedNorm)`, `brightness→speed·life`,
  additive (`srcFactor:"one"` already present); the cartoon-cast/squash-stretch billboard on the
  WebGPU instanced-quad path.
- **The WebGL2 fallback (made real + measurable + equal-gestalt):** a state-texture GPGPU
  ping-pong (particle state in `RGBA32F`, advected in a fragment pass) + a two-FBO `RGBA16F`
  trail ping-pong (`EXT_color_buffer_float`, `blendFunc(ONE,ONE)` additive, decay-quad) —
  **the SAME advected-population gestalt** as WebGPU (the spike proves it). The WebGL2 ctx is
  created with **`preserveDrawingBuffer:true`** at the substrate so readback is real (closes the
  unmeasurable-zero defect for EVERY viz on the fallback path).
- **The demo stage:** flat-cream/near-black-halftone → deep warm floor + colorful corner-bloom,
  full-bleed; the `flow` technicolor preset leads.

### 3.3 Config (extends `FlowFieldConfig`, no alias — clean break; lever sets are mode-orthogonal)
```ts
mode: "flow" | "field";          // default "flow" — NEW
// flow-mode levers (advection + trail + vortex):
particleCount: number;           // RE-INTRODUCED, mode-scoped (field keeps gridPitch)
trailDecay: number;              // 0.90–0.94 streak persistence
turnRate: number;                // inertia (low = weighty arcs)
speedScale, speedGlow: number;   // advection gain · brightness-from-|V|
lifetimeSec: number;             // respawn cadence (√φ-laddered half-life)
edgeBias: number;                // density vignette strength (shared with field)
contentMask: {cx,cy,rx,ry}|null; // the clear region (shared with field)
vortexRadius, vortexSpin, dragGain, burstShove: number;  // the cursor vortex
shadowOffset, stretchAmp: number;// WebGPU cartoon-cast (drop on WebGL2/PRM)
```
`field` mode reads the existing `gridPitch/displaceAmp/springK/waveBand*/globeMask` verbatim.

---

## 4. CROSS-ENGINE (Chrome + Safari) — the §L7 binding arm

| channel | Chrome | Safari/WebKit |
|---|---|---|
| field compute | WGSL compute, storage particle buffer | GLSL state-texture ping-pong (`RGBA32F`), advect in a fragment pass — textbook WebGL2 GPGPU (spike-proven) |
| trail | `rgba16float` RT ping-pong, additive | two-FBO `RGBA16F` (`EXT_color_buffer_float`), `blendFunc(ONE,ONE)`, decay-quad |
| color | OKLab seam, sRGB OETF at blit | identical GLSL twin — **sRGB color-interp, math in-shader** (NO `oklab()`-in-CSS WebKit mis-resolves) |
| pointer | `usePointerVelocityField.tick` in-frame | identical (DOM pointer, no engine seam) |
| PRM | `respectReducedMotion`→`tick(0)` + one static streak frame, park | identical |
| park | substrate offscreen-park + `content-visibility:auto` | identical |
| readback | (preserve not needed for WebGPU present) | **`preserveDrawingBuffer:true`** — the gate reads real pixels |

**NO `backdrop-filter:url`, NO SVG goo filter, NO naive ellipsoids, compositor-only** — trail-
feedback is one screen-res texture + N point-sprites, the fragile WebKit `backdrop-filter`-re-blur
leg is never touched. The reference is a looping video that cannot interact; this is a
parked-when-hidden interactive field — the SURPASS. **Gate = paired-engine π (Chromium + WebKit)**
of streaks + vortex + vignette, never a single-engine green.

---

## 5. A11Y / PRM CARVE
- `aria-hidden="true"` decorative canvas, `pointer-events:none` (kept).
- WCAG-2.2.2 pause via `v-model:paused`→substrate `manual` suspend (kept; `DockBackgroundToggle`).
- `prefers-reduced-motion: reduce` → ONE static advected+trailed frame (the trail buffer holds the
  composite), `pointer.tick(0)` freeze, vortex inert, then park.
- `prefers-reduced-transparency` / `prefers-contrast: more` → brightness floors UP (legible
  streaks), trail-decay shortens (less smear), cartoon-cast drops to plain discs; never a
  transmissive layer to drop.

---

## 6. ACCEPTANCE BAR + DELTA-ASSAY → amend `BD.W-DOTFLOW-REBUILD`

**Disposition: AUGMENT + partially SUPERSEDE.** Keep the wave's diagnosis + the `field` halftone
register (as `mode:"field"`); ADD `mode:"flow"` as THIS route's default; CORRECT the diagnosis
(the live defect includes the WebGL2-fallback path + the unmeasurable readback, not only a dead
WebGPU pass). Carve the fence: `proof:viz-dotflow` math-freeze applies ONLY to the `field`
evaluator; the `flow` kernel is a NEW integrator (F5 warm-library palette still HOLDS — technicolor
is a demo preset).

**No-dup reconcile vs the 116 union waves:** `dot-matrix` = sphere/phyllotaxis (shape=sphere);
`goo-dot[-matrix]` = metaball SDF dots (shape=blob-merge); `paper-grid`/`concentric` = grid/ring.
`dot-flow-field` is the ONLY streamline/vector-flow register — the AURORA CURRENT fills it; the
`field` halftone is the SAME component's second mode (the rebuild's scope), not a new viz.

### 6.1 The gate `proof:dotflow-rebuild` (born-RED + now MEASURABLE)
- **R0 (NEW) — readback is real.** Substrate samples through `preserveDrawingBuffer`/readback-FBO
  on-present (rAF-synced, never a delayed `drawImage` — the WebGPU present-race + the WebGL2
  zero-buffer). Born-RED: the current WebGL2 readback returns all-zero.
- **R1 — paints + reads.** `litFrac > 0.06` on the technicolor-on-near-black stage, both modes.
  Born-RED on the current `litFrac 0.029` warm-cream-on-cream.
- **R2 — STRUCTURE.** `flow`: the lit set forms ELONGATED coherent streaks (orientation-coherence
  /anisotropy proxy aligned to a smooth field — a point-grid REDs). `field`: the periodic-lattice
  autocorrelation (the rebuild's R2).
- **R3 — MOTION.** `flow`: net COHERENT advection along streamlines over N frames (two-frame
  optical-flow proxy; a frozen/jittering set REDs). Born-RED: the current identical-`litFrac`
  across 6 frames. `field`: the band sweeps / twinkle shifts.
- **R4 — technicolor + contrast fence.** `meanChromaOfLit > 18` (born-RED on the current
  `meanChroma≈0`); the demo lead is the vivid-on-near-black register, library default untouched.
- **R5 — cursor vortex reads.** A synthetic pointer drag yields a measurable local swirl +
  brightness-burst delta about the cursor (a field that ignores the pointer REDs).
- **R6 — paired-engine (Chromium + WebKit) parity** on trail length + technicolor hue at fixed `t`.

### 6.2 The born-RED π sketch (the readback that proves it — the spike's `measure()` is the seed)
```js
// on-present, rAF-synced; WebGL2 path needs preserveDrawingBuffer (R0)
const d = sample(canvas, 64, 36);              // 2D scratch grid
litFrac    = lit / px;                          // R1  > 0.06
meanChroma = sum(max(r,g,b)-min(r,g,b)) / nLit; // R4  > 18
frameDelta = sum(|d[i]-prev[i]|) / px;          // R3  > 1.5   (alive)
anisotropy = orientationCoherence(litMask);     // R2  > floor (streaks, not a grid)
vortexΔ    = localDelta(afterDrag) - baseline;  // R5  > floor
// CURRENT viz: litFrac 0.029 (R1 RED) · meanChroma ~0 (R4 RED) ·
//              frameDelta ~0 (R3 RED) · WebGL2 readback all-zero (R0 RED)  → born-RED on 4/6.
```

---

## 7. INTEGRATION CHECKLIST (the union, file by file)
- `dot-flow-field/constants.ts` — extend `FlowFieldConfig` with the §3.3 mode-scoped levers;
  `DEFAULT_FLOW_CONFIG.mode = "flow"`; warm-library palette UNCHANGED (F5).
- `shaders/flow-field.compute.wgsl.ts` — `mode` branch: `flow` advect+vortex+lifetime+respawn;
  `field` = the current anchored evaluator (byte-untouched under its fence).
- `shaders/flow-field.render.wgsl.ts` — `speed→samplePaletteLin` hue, `speed·life` brightness,
  additive; the cartoon-cast/squash-stretch on the instanced-quad path.
- `shaders/flow-field.glsl.ts` — the WebGL2 twin: state-texture GPGPU ping-pong + two-FBO trail.
- `composables/useDotFlowField.ts` — wire the trail ping-pong into the existing `onFrame`; feed
  `usePointerVelocityField` → vortex uniforms (no second rAF).
- `composables/uniformBridgeWGPU.ts` — add trail-decay/vortex/density uniform rows.
- `src/composables/glass/webgpu/useGpuSubstrate.ts` — WebGL2 ctx `preserveDrawingBuffer:true`
  (the R0 substrate fix — benefits every viz).
- `demo/stories/substrates/presets.ts` — add `FLOW_PRESET_AURORA_CURRENT` (technicolor speed-ramp
  + warm near-black ground + corner-bloom); presets-in-consumers, never a library token.
- `demo/stories/substrates/dot-flow-field.vue` — lead with the AURORA CURRENT preset on a
  full-bleed `ShowcaseFrame tier="field"`; `mode:"field"` halftone as the toggle.

---

## 8. THE DE-RISKING SPIKE (`golden/spike.html`) — VERIFIED LIVE

A throwaway standalone WebGL2 spike (the path Safari actually runs) transcribing the SAME math the
library ships — `curlFBM` ∇⊥ψ divergence-free advection on a 16384-particle state-texture
ping-pong + a two-FBO `RGBA16F` feedback-fade trail + a 4-stop technicolor speed-ramp + the cursor
VORTEX + the `preserveDrawingBuffer` on-present readback (the §6.2 gate seed). Verified live in
Chrome (DevTools MCP), no console errors:

| measure | idle | cursor-active | floor | verdict |
|---|---|---|---|---|
| `litFrac` | 0.231 | 0.244 | 0.06 | **PASS** (vs current 0.029) |
| `meanChroma` | 20.2 | 18.7 | 18 | **PASS** — vivid (vs current ~0) |
| `frameDelta` | 10.30 | 10.38 | 1.5 | **PASS** — alive (vs current ~0) |
| cursor vortex | idle | **live, burst 0.88** | reads | **PASS** |

The capture (`golden/spike-capture.png`) shows the gestalt: dense braided **ribbons of light**
flowing along curl streamlines over a warm-near-black floor, technicolor (amber/cyan/magenta in
the streaks), genuinely flowing. **Calibration note (not a mechanism risk):** chroma sits at the
floor (18–20) because the spike's curl field is slow-dominated (most motes read the cool low-speed
ramp end); the real build pushes `speedScale`/ramp saturation + the corner-bloom to comfortably
clear 18 — a tuning lever, not an architecture change. **The boldest mechanism (advection + trails
+ vortex on the Safari-real WebGL2 path) is de-risked.**

---

## 9. SOURCE-VERIFY LEDGER (grepped before citing)
All §3.1 primitives confirmed present. `cs_main` anchored-pull (the dead-flow root),
`MAX_PARTICLES 16384`, `MAX_FLOW_STOPS 4`, `DEFAULT_FLOW_CONFIG{background:"transparent",
interactive:false, displaceAmp:0.18, springK:6.0}`, `proof:viz-dotflow` F5 warm-fence, the GLSL
`procedural-color.glsl.ts` twin, and `usePointerVelocityField` surface — all verified live. No
invented levers; all numerics (decay 0.93, floors, √φ ratios) are PROPOSALS for the amendment to
calibrate, flagged as such.
