# DotFlowField — GREENFIELD lens-c: AUDACIOUS CARTOON-TECHNICOLOR FLOW & PUNCH

> Lens: maximum 1940s-technicolor flow & punch — bold cartoon shadowing, exaggerated
> squash/stretch/morph, anticipation + follow-through + overlapping action + arcs, real
> weight & inertia; the BOLDEST, most alive variant (still idiomatic + cross-engine).
> Greenfield from first principles, anchored by a LIVE diagnosis of the current surface.

---

## 0. LIVE DIAGNOSIS — why `/substrates/dot-flow-field` is "TOTALLY WORTHLESS AND BROKEN"

Diagnosed live on `http://localhost:5173/substrates/dot-flow-field` (Chrome, real GPU,
both presets, canvas readback + screenshot). The mechanism is THREE compounding failures —
NOT one:

1. **The picker SILENTLY runs the WebGL2 FRAGMENT FALLBACK, not WebGPU.** `navigator.gpu`
   is present, but probing the live canvas: `canvas.getContext('webgl2')` SUCCEEDS (a WebGPU
   canvas would throw / return null on a `webgl2` request). So `createGpuSubstrate.armAsync()`
   ATTEMPTED WebGPU, the adapter/device init THREW on this host, and it fell to the
   `setupGL` fragment net (the documented "invisible fallback" — `useGpuSubstrate.ts:20`).
   **The headline-wave's §1 premise (a dead two-pass WebGPU compute/render) is NOT the live
   defect here** — the WebGPU pass never runs at all; the WebGL2 fragment field is the live
   path. The rebuild MUST stop assuming "the WebGPU render is dead" and instead own that the
   FRAGMENT path is the one users actually see on a large fraction of hosts.

2. **What the fragment path PAINTS is near-invisible + reads dead.** Default preset
   (warm-cream `WARM_IDENTITY_PALETTE` L:0.92 C:0.03 over `background:"transparent"`): the
   canvas sits over the page's light-cream `grid` wash → near-zero contrast, `litFrac` drops
   to **0** once scrolled into view (the earlier transient 0.028 was a first-warm frame). The
   reference preset (near-black ground): a screenshot shows a **faint static-looking
   monochrome pin-prick lattice** — dim, colorless, no perceptible flow, no streamlines, no
   motion that reads. It is the OPPOSITE of "a living vivid vector field." Even at its best it
   is a calm dim halftone, which is the v4-IOS27 register — but the USER condemned it as
   worthless and demanded a vivid LIVING FLOW that FAR SURPASSES the reference.

3. **The readback is structurally broken (the gate cannot even measure it).** Native-res
   `drawImage(canvas) → getImageData` returns `maxAlpha:0, maxRGBsum:0` — ALL ZERO — on the
   WebGL2 path. Cause: the WebGL2 context has no `preserveDrawingBuffer:true`, so the backing
   store is empty by the time a 2D scratch reads it (post-composite). **`proof:dotflow-rebuild`
   R1's `litFrac` sampling will FALSE-FAIL (read 0) on any WebGL2-fallback host even when the
   field paints on-screen** — the same readback trap the §5 audit hit. The gate is not just
   born-RED, it is born-UNMEASURABLE on the live backend.

**The gestalt verdict (visual, both modes, default-to-broken):** a dim, static, monochrome
dot-grid with no flow, no color, no life, mostly invisible over the cream page. Worthless,
as charged. The current viz is the WRONG GESTALT for the user's ask (a calm halftone, when
the user wants a vivid living flow) AND broken on the live backend AND unmeasurable.

---

## 1. FIRST PRINCIPLES — what a dot-flow-field SHOULD be (this lens)

A dot-flow-field is a **divergence-free VECTOR FIELD made VISIBLE by a dense population of
dots it advects** — streamlines you can SEE because thousands of bright dots ride them like
ink in water. The user's spec, verbatim: *a living vector/flow field advecting a dense
particle/dot population along smooth streamlines, with trails/lifetimes, cursor-reactive
deflection (the pointer warps the field), vivid technicolor palette, alive/weighty motion
(inertia, not jitter).* Through the cartoon-technicolor lens, the bar is higher still: the
field must read as a **1940s-Technicolor ink-in-water swirl** — bold, saturated, with WEIGHT
and FOLLOW-THROUGH, where the cursor doesn't just nudge dots but **punches a vortex into the
field** that swirls, overshoots, and settles with overlapping action.

The defining reconciliation: the IOS27-REFERENCE v4 names a CALM VIGNETTED HALFTONE, but the
user explicitly says *"APPROACH but FAR SURPASS"* — surpass means we MATCH the reference's
content-deferential restraint as ONE register and then BLOW PAST it with a living, vivid,
pointer-warped advecting flow the reference (a static looping video) cannot touch. So the
rebuild is **two registers on ONE engine**, with the LIVING FLOW as the lead for this lens:

- **`mode="flow"` (the lead, this lens)** — a dense advected dot population riding the
  divergence-free curl streamlines, technicolor, trailed, cursor-warped, weighty. The
  "surpass."
- **`mode="halftone"` (the reference-match)** — the calm vignetted density-gradient halftone
  (dense edges → clear center, in-place twinkle, content-mask). The "approach." This is the
  headline-wave's named rebuild register; we KEEP it, don't fork it.

The single component carries both via a `mode` discriminant (the dock `dim`-idiom precedent),
ONE substrate, ONE math source, ONE color seam.

---

## 2. THE VISUAL SPEC — the Technicolor ink-in-water flow

### 2.1 The field (the math gestalt — REUSE, don't re-derive)

The EXISTING `flowField.ts` already ships the right math: a divergence-free `∇⊥h` Gerstner
sum-of-sines potential + a `curlStrength`-weighted `curlFBM` braiding break (Tessendorf 2001
/ Bridson 2007, round-trip-locked JS↔WGSL↔GLSL). **This is fit — we KEEP it** (survival of
the fittest). The current sin is not the field math; it is the RETOPOLOGY that froze the
field into an anchored lattice with a `tanh`-capped sub-cell drift (`displaceAmp<0.5 pitch`)
and replaced advection with a pull-to-anchor spring. For `mode="flow"` we **restore true
advection** off the SAME `sampleVelocity()`:

- particles INTEGRATE `p += sampleVelocity(p,t)·dt·speed` (Euler/RK2 in the compute pass),
  riding the streamlines as ink does — NOT eased to a lattice anchor;
- a per-particle **lifetime** (re-seed on age-out or on leaving the domain) keeps density
  even and prevents pile-up (the curl is divergence-free so pile-up is bounded, but lifetimes
  give the trail-renewal the reference video fakes);
- re-seed positions are **stratified** (jittered grid spawn) so density stays uniform-dense
  without clumping — the `gridOrigin` lattice becomes the SPAWN distribution, not the rest
  state. Nothing in `flowField.ts` is deleted; the lattice helper is repurposed as the
  spawner.

### 2.2 Technicolor palette — vivid, not warm-cream-dim (presets-in-consumers)

The library `DEFAULT_FLOW_CONFIG.palette` stays the warm-cream identity (the F5 fence — byte
untouched). The DEMO leads with a **Technicolor preset** (`FLOW_PRESET_TECHNICOLOR`, lives in
`demo/stories/substrates/presets.ts`, NEVER a library token):

- a **velocity-keyed hue ramp** — a dot's color is its SPEED mapped through a bold 4-stop
  OKLCh ramp: slow trough = deep magenta-violet (L:0.45 C:0.20 h:330), mid = electric
  cyan (L:0.72 C:0.16 h:200), fast crest = hot chartreuse-amber (L:0.88 C:0.19 h:110), peak
  = near-white bloom (L:0.96 C:0.06 h:90). This is the ink-in-water read: streamlines glow by
  how fast the water moves through them. The ramp samples through the EXISTING
  `samplePaletteLin` OKLCh seam (no new color path) — we just feed it `speed`, not `height`.
- a near-black warm ground (`oklch(0.12 0.01 60)`) so the saturated dots POP (the §3
  colorful-field-behind-glass + the contrast fence — never gray, warm floor).
- **MAX_FLOW_STOPS is already 4** — the 4-stop ramp fits the existing uniform array. No
  shape-budget change. (Verified: `constants.ts:31` `MAX_FLOW_STOPS = 4`.)

### 2.3 CARTOON SHADOWING + trails (the 1940s-Technicolor PUNCH)

The cartoon register made into a FIELD property:

- **Trails = overlapping action + follow-through.** Each frame the render does NOT hard-clear;
  it draws over a **feedback-faded prior frame** (a `loadOp:"load"` + a per-frame `α≈0.88`
  black-multiply darken pass, or a ping-pong trail texture). The dots leave comet-tails along
  the streamlines — the field reads as flowing ink, the trails ARE the visible streamlines.
  This is the single most important visual lever: streamlines you can SEE.
- **A bold offset glow-shadow per dot (the cartoon cast).** Each dot draws TWO billboards: a
  larger, darker, OFFSET shadow-disc (offset opposite the velocity vector — the cel light
  stays fixed while the dot moves, §design.md cartoon-cast travel) UNDER a bright core disc.
  This is the 1940s layered-offset shadow as a per-particle property — bold, popping, alive.
  The offset SCALES with `--motion-weight` × local speed (faster dots throw a longer cast =
  exaggeration + arcs).
- **Squash & stretch on the dot itself.** The billboard quad is anisotropically scaled along
  the velocity direction (stretch ∝ speed, squash perpendicular, volume-preserving) — fast
  dots elongate into streaks (motion smear, the cartoon speed-line), slow dots are round.
  This is squash/stretch with real weight, derived from `sampleVelocity` magnitude.

### 2.4 The cursor PUNCH (anticipation → impact → follow-through → settle)

The reference CANNOT react to the pointer; this is our headline SURPASS. The existing
`usePointerVelocityField` (verified: exposes `active`, `speed`, `burst`, `tick`) feeds a
**vortex injection** into the field, not a weak local `displaceBoost`:

- the cursor adds a **transient curl vortex** to `sampleVelocity` about the pointer — a
  divergence-free swirl term `v += vortexStrength · ∇⊥(gaussian falloff about cursor)` — so
  dragging the cursor SWIRLS the ink into a visible whirlpool that trails behind the pointer
  (overlapping action: the swirl lags the cursor, follows through past it, then unwinds).
- a **flick BURST** (`pointer.burst`) fires an EXAGGERATED radial shock — a brief outward
  push + a brightness/saturation bloom that ripples through the local dots and decays with a
  bouncy settle (anticipation is the wind-up of the drag, impact is the burst, follow-through
  is the lagging swirl, settle is the bounce-back to the calm flow). Weighty, never springy-
  tight: the vortex unwinds with inertia (`--motion-weight`-scaled decay), not a snap.

### 2.5 Aristotelian proportion

The spawn lattice pitch, trail-fade α, vortex radius, and shadow-offset all ride √φ-derived
ratios: shadow-offset = dot-radius/√φ; vortex radius = spawn-pitch·φ; trail half-life =
base-frame·√φ. The density gradient (halftone mode) is a φ-spaced radial falloff.

---

## 3. THE MECHANISM — precise, source-verified, deft union

**This AUGMENTS `BD.W-DOTFLOW-REBUILD` — it does NOT re-fork.** The headline wave owns
"the field PAINTS on a contrasting stage + the halftone register." This lens AMENDS it to add
the LIVING-FLOW register the user's verbatim demands, and CORRECTS its §1 diagnosis premise
(the live defect is the WebGL2-fallback path + dim palette + unmeasurable readback, NOT a dead
WebGPU two-pass). The reconciliation (see §5).

### 3.1 What we REUSE verbatim (survival of the fittest — verified to exist)

- `src/composables/glass/webgpu/useGpuSubstrate.ts` — `createGpuSubstrate` picker
  (`setupWGPU`/`setupGL`, `armAsync` WebGPU→WebGL2 fall, `renderAt`/`pause`/`resume`/`wake`,
  `GpuBackend`). VERIFIED present. The substrate lifecycle (offscreen-park via
  `content-visibility` + the intersection-pause, PRM-freeze) is inherited unchanged.
- `src/composables/motion/usePointerVelocityField.ts` — `active`/`speed`/`burst`/`tick`.
  VERIFIED present. Fed `tick(delta)` from inside the renderer frame (no second rAF) — the
  existing `onFrame` wiring in `useDotFlowField.ts:113` is KEPT.
- `src/components/custom/dot-flow-field/composables/flowField.ts` — `sampleVelocity`,
  `gerstnerVelocity`, `curlFBM`, `buildWaveLadder`, `gridOrigin`. VERIFIED present. The field
  MATH is byte-untouched (the `proof:viz-dotflow` round-trip fence holds); we change the
  CONSUMPTION (advect vs anchor), not the evaluator.
- The OKLCh color seam (`samplePaletteLin` in render.wgsl + `procedural-color` chunk) and
  `MAX_FLOW_STOPS=4` / `MAX_PARTICLES=16384` shape budget. VERIFIED. The technicolor ramp
  fits the existing 4-stop uniform.

### 3.2 What we RE-INVENT (only the broken parts)

- **The compute kernel: advection, not anchor-spring.** `flow-field.compute.wgsl` gains a
  `mode` uniform: `mode=flow` integrates `p += sampleVelocity(p,t)·dt·speed + vortex(pointer)`
  with a lifetime/re-seed; `mode=halftone` keeps the anchored-lattice + density-mask + twinkle
  (the headline wave's register). The velocity term is the EXISTING `sampleVelocity` — no math
  edit, a consumption change (the `proof:viz-dotflow` math fence is about the evaluator, not
  the integrator; confirm the round-trip still anchors on `sampleVelocity` at fixed samples).
- **The render pass: trails + cartoon-cast + squash-stretch.** `flow-field.render.wgsl` gains
  the trail-feedback (load+darken or ping-pong), the offset shadow-disc instance, and the
  velocity-anisotropic billboard scale. The OKLCh ramp now keys on `speed` (uniform-fed),
  feeding the SAME `samplePaletteLin`.
- **The WebGL2 fragment fallback: real, measurable, equal-quality.** Two corrections: (a) the
  fragment path must also express advection visually — a fragment field cannot hold per-
  particle state across frames, so the WebGL2 register uses a **flow-line LIC-style fragment**
  (line-integral-convolution of a noise texture along `sampleVelocity` streamlines + the
  velocity-keyed technicolor ramp + a trail-fade feedback texture) — same gestalt (visible
  streamlines), fragment-friendly. (b) the WebGL2 context MUST be created with
  `preserveDrawingBuffer:true` (or the gate samples via a dedicated readback FBO) so
  `litFrac`/contrast sampling reads real pixels — the unmeasurable-readback defect (§0.3) is
  closed at the substrate, benefiting EVERY viz on the fallback path.

### 3.3 The config schema (clean break, no legacy)

`FlowFieldConfig` gains `mode: "flow" | "halftone"` and `trailFade`, `vortexStrength`,
`shadowOffset`, `stretchAmp`. The retopology-only fields that only make sense for the anchored
lattice (`springK`, `displaceAmp`, `waveBandCenter/Width`) are scoped to `mode="halftone"`;
`mode="flow"` reads `speed`, `lifetime`, `trailFade`. No aliases, no migration shim (the
no-backwards-compat law) — the demo + presets move to the new schema in the same change.

### 3.4 Cross-engine (§L7) — the hard gate

- **Steady-state = GPU-composited canvas only.** The whole field is one offscreen-paused
  canvas (WebGPU primary / WebGL2 LIC fallback); no `backdrop-filter`, no per-frame CSS
  filter. §L7's "a viz owns its own canvas, GPU-only, offscreen-paused, PRM-freeze" floor.
- **Trail feedback parity.** WebGPU ping-pong texture ↔ WebGL2 feedback FBO — the same
  exponential trail-fade math, paired-engine π capture (Chromium + WebKit) proves identical
  trail length + technicolor hue at fixed `t`.
- **Color-interp.** OKLCh ramp resolved in-shader (linear-sRGB math), so Chrome/WebKit agree
  (no SVG-filter sRGB trap — there is no goo filter here; this is a pure canvas viz).
- **PRM carve.** `prefers-reduced-motion: reduce` → the substrate seats ONE static frame
  (`pointer.tick(0)` freeze + no advection step) — the flow freezes mid-stream as a still
  ink-streak composition, the trails held. The cursor-vortex is inert under PRM. Verified
  against the substrate's existing PRM-freeze seam.
- **`prefers-reduced-transparency` / `prefers-contrast: more`** → the technicolor ramp floors
  its chroma UP and the ground darkens (legibility), the trail-fade shortens (less smear).

---

## 4. THE GATE — `proof:dotflow-rebuild` (amended, born-RED + now MEASURABLE)

The headline wave's gate is amended so it is measurable on the live WebGL2 backend and bites
the living-flow register:

- **R0 (NEW) — the readback is real.** The substrate samples through a `preserveDrawingBuffer`
  /readback-FBO path; a born-RED bite that the CURRENT WebGL2 readback returns all-zero (the
  §0.3 unmeasurable defect). Without R0, R1 false-fails on every fallback host.
- **R1 — the field PAINTS + READS (contrast-against-ground).** `litFrac > LIT_FLOOR` on the
  technicolor-on-near-black stage, both modes. Born-RED on the current dim warm-cream-on-cream.
- **R2 (amended) — STREAMLINE STRUCTURE (flow mode) / LATTICE (halftone mode).** Flow mode:
  the lit set forms ELONGATED coherent streaks (an anisotropy/orientation-coherence proxy over
  the lit pixels — trails align to a smooth vector field), NOT a uniform wash and NOT a
  frozen dot-grid. Halftone mode keeps the headline wave's periodic-lattice autocorrelation.
- **R3 — MOTION (two-frame).** Flow mode: the dots ADVECT (net positional flow along the
  field over N frames, not just a sweeping band) — a frozen frame REDs. Halftone: the band
  sweeps / twinkle shifts.
- **R4 — the technicolor stage + the contrast fence** (demo lead is the vivid-on-near-black
  register, library default untouched).
- **R5 (NEW) — the cursor PUNCH reads.** Inject a synthetic pointer drag; the local field
  shows a measurable vortex deflection + brightness bloom that decays — born-RED on a field
  that ignores the pointer.
- **R6 — paired-engine (Chromium + WebKit) parity** on trail length + technicolor hue at
  fixed `t` (§L7).

---

## 5. RECONCILIATION — vs `BD.W-DOTFLOW-REBUILD` + the 116 union waves (no dup)

- **AUGMENTS `BD.W-DOTFLOW-REBUILD`** (does not supersede its scope, EXTENDS it). The headline
  wave's "halftone vignette" register is KEPT as `mode="halftone"` (the IOS27 v4 approach);
  this lens ADDS `mode="flow"` (the living technicolor flow — the user's "FAR SURPASS"
  verbatim) as the demo LEAD, and CORRECTS the wave's §1 diagnosis (the live defect is the
  WebGL2-fallback dim-palette + unmeasurable readback, NOT a dead WebGPU two-pass — see §0).
  The wave's born-RED `litFrac`/lattice/sweep gates are amended (§4: R0 measurability, R2
  streamline-mode, R5 cursor-punch) — same gate file, extended clauses.
- **NO DUP vs `goo-dot-matrix` / `dot-matrix` / `goo-dot`.** Those are GOO-MERGE dot fields
  (metaball-fused dots, static SVG goo filter — a different gestalt: dots that MELT together).
  This is an ADVECTED FLOW (dots that RIDE a vector field with trails). Structurally distinct:
  no metaball goo filter here (a pure canvas viz, §3.4), no anchored merge — the only overlap
  is "dots," and the union law (≥2 sites or distinct gestalt) is satisfied by the
  flow-vs-merge distinction. The sibling-WebGPU-blank class the headline wave flags for
  dot-matrix/goo-dot is closed by the SAME R0 readback fix (shared substrate benefit).
- **Math fence intact** — `proof:viz-dotflow` round-trips `sampleVelocity` unchanged; we
  change the integrator/renderer, not the evaluator.
- **Presets-in-consumers intact** — the technicolor ramp + near-black ground are DEMO presets;
  `DEFAULT_FLOW_CONFIG` warm-cream identity is byte-untouched (F5 holds).

---

## CORE IDEA (1 paragraph) + the single BOLDEST move

**Core idea:** Re-invent DotFlowField as a living Technicolor ink-in-water flow — a dense
population of dots that truly ADVECT along the existing divergence-free curl streamlines
(restoring real advection off the byte-untouched `sampleVelocity`, replacing the frozen
anchor-lattice retopology), made vivid by a SPEED-keyed bold 4-stop OKLCh technicolor ramp
(slow=magenta → fast=chartreuse → peak=white-bloom) over a warm near-black ground, with
comet-trails that ARE the visible streamlines, per-dot cartoon offset-shadow casts and
velocity-anisotropic squash-stretch (the 1940s layered-offset PUNCH as a field property), and
a cursor that injects a real divergence-free VORTEX that swirls the ink with weight, lag, and
a bouncy unwind (anticipation→impact→follow-through→settle). It AUGMENTS `BD.W-DOTFLOW-REBUILD`
(keeping its calm halftone as `mode="halftone"`, adding this as the lead `mode="flow"`),
corrects its diagnosis (the live defect is the silent WebGL2 fallback + a dim palette + an
unmeasurable zero-readback, not a dead WebGPU two-pass), and reuses the entire extant
ecosystem (substrate picker, pointer field, flow math, OKLCh seam) — a union, never a fork.
**The single boldest move:** make the **trails BE the streamlines and the cursor a vortex
PUNCH** — instead of a calm dot-grid, the field is flowing Technicolor ink whose comet-tails
render the vector field directly visible, and a drag doesn't nudge dots, it carves a swirling
whirlpool that follows through past the cursor and unwinds with inertia — the one thing a
static reference video can never do, and the literal embodiment of "approach but FAR SURPASS."
