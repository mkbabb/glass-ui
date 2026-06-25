# dot-flow-field — GREENFIELD lens-a (PURE iOS-27 fidelity)

> Lens: the most faithful, audacious iOS-27 Liquid-Glass interpretation. Greenfield
> from FIRST PRINCIPLES — what SHOULD a dot-flow-field BE — then a DELTA-ASSAY that
> AUGMENTS/SUPERSEDES `BD.W-DOTFLOW-REBUILD`, reconciled against the 116 union waves and
> the dot-matrix / goo-dot-matrix siblings (no dup). Source-verified: every cited uniform,
> composable, and shader chunk below was grepped to exist before citing.

---

## 0. LIVE DIAGNOSIS — why `/substrates/dot-flow-field` is WORTHLESS (both modes, canvas readback)

Live, on `http://localhost:5173/substrates/dot-flow-field` (Chrome, WebGPU primary,
`navigator.gpu` present, NOT paused), the default lead config painting:

| measure | value | reading |
|---|---|---|
| canvas backing | 2066×920 (DPR 2, 1033×460 css) | real WebGPU ctx, sized |
| `litFrac` (lum>6/255) | **0.0289** | ~3% of pixels are non-black — a sparse pinprick lattice |
| `meanLum` | **3.95 / 255** | the canvas is ~98.5% BLACK |
| `maxLum` | 255 | a handful of dots hit full-bright (a few band-lit dots) |
| `litFrac` across 6 rAF-synced frames | 0.0289, 0.0289, 0.0289, 0.0289, 0.0289, 0.0289 | **functionally STATIC** — the lit fraction does not change frame-to-frame; the "sweeping band" is imperceptible |
| `meanChromaOfLit` | ~0 | **monochrome** — the lit dots carry no chroma; flat grey-white |

**The screenshot is the verdict** (`brainstorm/` capture): a perfectly uniform faint-grey
**pinprick halftone grid** on near-black, even pitch corner-to-corner, near-zero contrast,
no visible motion, no color, no density variation, no streamlines, no trails. It reads as a
dead static dot-screen — *the literal opposite of "a living vivid flow field."* The user's
verdict ("TOTALLY WORTHLESS AND BROKEN, does not function to spec") is CORRECT and precise.

### The precise mechanism (THREE compounding causes — read the source, pinned to lines)

**(1) It is NOT a flow field — the BC retopology DELETED the advection (the root).**
`flow-field.compute.wgsl.ts` `cs_main` does NOT advect. Each dot is nailed to a PERMANENT
lattice anchor `o = gridOrigin(idx)` and merely eases toward `o + disp·(displaceAmp·pitch)`
via a critically-damped pull (`mix(pos, anchorTarget, 1-exp(-springK·dt))`), with
`displaceAmp:0.18` capped sub-half-pitch. The header says it literally: *"NO wrap, NO
re-seed — the lattice is permanent... the dot only breathes a hair off its anchor."* There
are **no streamlines, no particle travel along the velocity field, no trails, no
lifetimes** — the `sampleVelocity` (Gerstner + curl) result is reduced to a `tanh`-clamped
sub-cell jiggle. A "flow field" whose particles cannot flow is dead by construction. This is
why all 6 frames read identical `litFrac` — the lattice does not move enough to register.

**(2) The brightness model is near-invisible — `litFrac 0.0289`, `meanLum 3.95`.** The
render (`flow-field.render.wgsl.ts`) lights each dot by `baseBright + waveBand(h)·contrast`
with `contrast:0.6` and an alpha floor `bright·0.8+0.12`. The dots are `dotSize:2.0`px at
~26px pitch — tiny, sparse, low-alpha. Over near-black with a mono-warm palette
(`MONO_WARM_PALETTE` L:0.95 C:0.012) the result is a faint, monochrome, flat halftone. No
trails to accumulate brightness, no chroma to read as "vivid."

**(3) Invisible-by-design even when it "works" — the §3 FLAT-PAGE + the readback race.**
The `/substrates/dot-flow-field` page above the canvas is all flat cream + giant black
display type (the §3 FLAT finding, captured). The warm-cream library DEFAULT
(`DEFAULT_FLOW_CONFIG`, `background:"transparent"`) over that cream wash is near-zero
contrast — a working field still reads as nothing. (Separately: a `drawImage(webgpuCanvas)`
read ~450ms later returned `litFrac:0` — the WebGPU present-race the gate must read
on-present; not a paint bug, a readback discipline. The rAF-synced read is the true sample.)

**The W-DOTFLOW-REBUILD wave already targets (1)/(3)'s STAGING half** (a contrasting
near-black ground + a `litFrac`/sweep/lattice gate), and correctly identifies the dead-flow
defect. But it scopes the rebuild as a **calm vignetted HALFTONE backdrop** (the v4 Cowork
reference — "density-gradient halftone, dots barely move, breathe in place, NOT advection").
**That is the right answer for a content-deferential BACKDROP, but it is NOT what the
user asked for HERE.** The user's verbatim for THIS route is: *"a living VECTOR/FLOW FIELD
... advecting a dense particle/dot population along smooth streamlines, with trails/lifetimes,
cursor-reactive deflection ... vivid technicolor ... FAR SURPASS the reference."* That is a
**kinetic streamline flow**, not a calm halftone. **The two registers are different vizzes.**

---

## 1. FIRST PRINCIPLES — what a dot-flow-field SHOULD be

A flow-field viz is the visible answer to one question: *"if I drop a thousand motes into a
living invisible current, where do they go?"* The current must be:

1. **A real divergence-free vector field** — particles ride streamlines, swirl without piling
   into sources/sinks (Bridson 2007 curl-noise). glass-ui ALREADY OWNS this operator
   (`CURL_FBM_GLSL` in `flow.glsl.ts` + the JS/WGSL twins in `flowField.ts` /
   `flow-field.compute.wgsl.ts`). The fit core survives; the lattice-nailing is what dies.
2. **Advection with re-seed** — a particle integrates `p += v·dt` along the field, fades over
   a LIFETIME, and respawns (the §6 wrap the BC retopology deleted). Density is held by the
   spawn rate, not a frozen lattice.
3. **TRAILS** — the soul of a flow field. A particle's recent path persists as a fading
   streak (a feedback/decay buffer), so the field reads as flowing *ribbons of light*, not
   discrete dots. This is the single largest gestalt lever and the current viz has ZERO of it.
4. **Cursor as a FORCE in the field** — the pointer doesn't "ripple a lattice"; it injects a
   **vortex + radial push** into the velocity field itself, so motes visibly bend around and
   spiral off the cursor (the surpass-the-reference move a video cannot do).
5. **VIVID, alive, weighty** — technicolor palette mapped to SPEED/curvature (fast streams
   hot, slow streams cool), real inertia (a mote carries momentum, eases into turns — arcs,
   follow-through, overlapping action — the §L4 cartoon-motion law applied to a particle).
6. **On a colorful, defined stage** — never a viz over flat cream (the §3 root); the field
   IS its own full-bleed ground with a deep warm-near-black floor + a colorful edge bloom.

The current viz expresses NONE of 1-aaa-as-flow, 2, 3, 4, 5. It is an anchored halftone. This
is a RE-INVENT of the field+advection+read, exactly as the brief predicted.

---

## 2. THE DESIGN — "AURORA CURRENT": a living technicolor curl-flow of light-ribbons

A dense population of motes advected along a **divergence-free curl-noise current**, each
trailing a **fading ribbon of light**, the ribbon HUE mapped to the mote's **speed** (a
technicolor velocity-map: slow eddies cool-teal → fast jets hot-amber/magenta), the whole
field breathing and drifting, the **cursor a live vortex** that motes bend around and spiral
off — over a deep warm-near-black full-bleed ground with a colorful corner-bloom. iOS-27
Liquid-Glass register: liquid weight (motes ease into arcs, never jitter), audacious
technicolor punch, cartoon flow & follow-through, golden-ratio proportion in the spawn
density + trail-length + bloom radius.

### 2.1 VISUAL spec
- **Ground**: a deep warm-near-black (oklch ~L:0.11 C:0.012 h:50 — the warm floor, NEVER
  gray, BA.W-NO-GRAY) full-bleed as the page background (W-PAGE-BACKGROUND), with a soft
  **colorful corner-bloom** (a faint amber→magenta radial at one corner, teal at the
  opposite — the §3 "colorful field + defined edge" so the glass chrome above reads).
- **Motes**: ~8–12k dense (well under `MAX_PARTICLES:16384`), each a small soft additive
  disc. Brightness rides speed; the population is dense enough to read as continuous flow.
- **Trails (THE headline)**: a ping-pong **feedback buffer** — each frame the previous frame
  is drawn back at ~0.90–0.94 decay (a fade), then the motes draw additively over it. The
  result: every mote leaves a glowing streak that fades behind it — **ribbons of light
  braiding along the streamlines.** This alone transforms the gestalt from dead-grid to
  living-current. (Additive over the warm floor → the bright braids bloom; the technicolor
  punch.)
- **Technicolor velocity-map**: `hue = ramp(speed)` over an audacious 1940s-technicolor
  ramp — slow→teal/cyan (oklch L:0.55 C:0.14 h:200), mid→warm-amber (L:0.80 C:0.10 h:70),
  fast/vortex→hot magenta (L:0.70 C:0.18 h:350). Sampled in OKLab via the existing
  `samplePaletteLin` ramp machinery (the ONE color source — no drift WGSL↔GLSL). This is a
  DEMO preset (presets-in-consumers); the LIBRARY default stays a warm-identity ramp
  (`proof:viz-dotflow` F5 holds — no teal/navy LIBRARY literal; the technicolor lives in
  `demo/stories/substrates/presets.ts`).
- **Cursor vortex**: a visible swirl — motes within a radius bend tangentially (a rotational
  push) + a gentle radial component, so the cursor reads as a drain/fountain of light. A
  flick fires a brightness BURST (overlapping-action follow-through).
- **Density gradient (the SURPASS reconcile)**: an OPTIONAL `--content-mask` seam — the spawn
  density can thin behind a declared content rect (the v4 content-deferential vignette),
  reconciling the two registers in ONE component (see §3 mode unification).

### 2.2 MOTION spec (liquid-weight universal + cartoon flow & punch)
- **Inertia**: each mote integrates with momentum — `v = lerp(v, field(p), turnRate)` then
  `p += v·dt`. A low `turnRate` gives WEIGHT (the mote eases into the field's turns — arcs,
  not instant snaps; the §L4 follow-through/overlapping-action law on a particle).
- **Lifetime + respawn**: a mote fades over `lifetimeSec` then respawns at a low-density
  region (or randomly), so the field never freezes and density stays even. The fade is the
  trail's tail.
- **Breathing**: the whole field's `windSpeed` and curl-phase drift on a slow clock (the
  `breathing` register) — the current itself living, not a fixed pattern.
- **Cursor**: velocity → steady vortex strength (the drag ripple); acceleration/flick →
  burst (the accel axis) — BOTH from the SHARED `usePointerVelocityField` (`.speed`,
  `.burst`, `.velocity`, `.active` — grep-confirmed exports), fed via the renderer's
  `onFrame` (NO second rAF — the existing discipline).
- **PRM**: one static frame — the field seats a single advected+trailed frame mid-flight then
  parks (the substrate PRM-freeze, inherited). The trail buffer holds the last composite.

### 2.3 INTERACTION
- Pointer present + `interactive` → the vortex/burst is live (wakes a parked loop on the same
  frame — the existing `onEnter`/`wake` path).
- The WCAG-2.2.2 pause seam (`v-model:paused` → substrate `manual` suspend) is unchanged.
- `aria-hidden` decorative canvas (unchanged) — it's a backdrop, not content.

---

## 3. THE MECHANISM — deft UNION on the EXISTING substrate (KISS/DRY, no fork)

ONE component (`DotFlowField`), ONE `useGpuSubstrate` leaf, ONE WebGPU context — extended,
not re-forked. The retopology's anchored-lattice mode is RETIRED (no-legacy clean break —
the user said WORTHLESS; an anchored halftone backdrop is the v4 register, which is the
`dot-matrix`/calm-halftone neighbor, not THIS route's "flowing streamlines" ask).

### 3.1 Mode unification (reconcile vs W-DOTFLOW-REBUILD's halftone)
`DotFlowField` carries `mode: "flow" | "field"` (the dock-`dim`-idiom discipline — ONE
component, two registers, no fork):
- **`mode:"flow"` (NEW default for THIS route)** — the AURORA CURRENT: advected motes +
  trails + technicolor velocity-map + cursor vortex. The user's literal ask.
- **`mode:"field"`** — the W-DOTFLOW-REBUILD calm vignetted halftone (density-gradient,
  in-place twinkle, content-mask) — KEPT as the content-deferential backdrop register the
  rebuild wave specced. SUPERSEDE-not-discard: the rebuild's `field` register lands as this
  mode; this lens ADDS the `flow` register the rebuild deferred.

The two share: the `useGpuSubstrate` leaf, the `gridPitch`/density math, the
`usePointerVelocityField`, the `samplePaletteLin` color source, the suite discipline
(pause/PRM/park/content-visibility). They differ only in the compute kernel (advect+trail vs
anchor+twinkle) and the brightness model — a `mode` branch in the setup, not a second file.

### 3.2 The compute/render rebuild (the `flow` kernel)
- **`flow-field.compute.wgsl`** — REWRITE `cs_main` to ADVECT: read `v = sampleVelocity(p,t)`
  (the EXISTING Gerstner+curl evaluator — `sampleVelocity` is grep-confirmed, the
  `curlFBM` divergence-free basis SURVIVES), add the cursor vortex force, integrate
  `v = mix(v, target, turnRate); p += v·dt`, decrement lifetime, respawn on death/out-of-
  bounds. Write `(pos, speed, life)` to the storage buffer. **This is a real shader-math
  change** — so it CANNOT live under the `proof:viz-dotflow` math-frozen fence; it is a NEW
  kernel for the NEW `flow` mode (the fence guards the `field`-mode anchored evaluator, which
  is untouched). The wave amendment must carve this explicitly (see §5 fence note).
- **The trail feedback buffer** — add a ping-pong render-target pair (two textures): each
  frame, (a) draw the previous trail texture into the current at decay α (a fullscreen blit
  with `mix` toward the warm floor), (b) draw the instanced motes additively over it, (c)
  present the current to the swap-chain. This is the standard flow-trail technique; it
  reuses the substrate's frame loop (no new rAF) and stays compositor-cheap (two RGBA8
  targets at budget-DPR). The WebGL2 fallback does the same with two FBOs (the existing
  `setupGL` grows a trail-FBO pair — same math, the ONE field source).
- **The render pass** — the mote shader maps `speed → hue` via `samplePaletteLin(speedNorm)`
  (the existing OKLab ramp), `brightness → speed + life-fade`, additive blend (already
  `srcFactor:"one"`). The trail blit is a second pipeline (a fullscreen quad with decay).

### 3.3 What SURVIVES (survival of the fittest)
- `useGpuSubstrate` picker + the WebGPU/WebGL2 twin discipline — KEEP.
- `usePointerVelocityField` (speed/burst/velocity/active) + the `onFrame` no-own-rAF wiring —
  KEEP (re-aimed: feeds the vortex force, not a lattice ripple).
- `curlFBM` / `sampleVelocity` (the divergence-free Gerstner+curl basis) — KEEP (this is the
  field; it was always fit — the BC retopology's sin was NAILING dots to a lattice instead of
  letting them RIDE this field).
- `samplePaletteLin` OKLab ramp, the `OETF_WGSL`/`OKLCH_MATRICES_WGSL` chunks, the
  uniform-bridge pattern — KEEP.
- The suite lifecycle (pause/PRM/park/content-visibility/contain) — KEEP.

### 3.4 What is RE-INVENTED (broken → rebuilt)
- The `cs_main` advection (anchor-pull → integrate-with-lifetime-and-respawn).
- The brightness/color model (mono band-lit → technicolor velocity-map + trails).
- The trail feedback buffer (ABSENT → the headline gestalt lever).
- The cursor model (lattice ripple → field vortex force).
- The demo stage (flat-cream/near-black-halftone → deep warm floor + colorful corner-bloom,
  full-bleed; the `flow` technicolor preset leads).

---

## 4. CROSS-ENGINE (Chrome + Safari) + a11y/PRM

- **WGSL ↔ GLSL parity**: the `flow` kernel ships BOTH — WGSL compute+trail (WebGPU primary)
  and a WebGL2 transform-feedback (or texture-encoded particle state) + dual-FBO trail
  fallback. The field math (`sampleVelocity`/`curlFBM`) is the ONE source spliced into both
  (the existing round-trip discipline). NO Metal artifacts: trails use plain additive blend +
  RGBA8 targets (no float-blend reliance); the color ramp resolves in OKLab→linear-sRGB then
  to sRGB (the existing OETF) — sRGB color-interp, NO `backdrop-filter:url`, compositor-only.
- **Safari WebGPU** is gated/partial → the WebGL2 fallback is the Safari path; it must paint
  the SAME flowing-trail gestalt (verified live in WebKit, default-to-broken).
- **PRM**: `respectReducedMotion` → one advected+trailed static frame then park (the trail
  buffer holds the composite; no motion). The substrate PRM-freeze is inherited.
- **Performance**: ~10k motes + two RGBA8 trail targets at budget-DPR is GPU-cheap; the
  offscreen-park (`content-visibility:auto` + the substrate's visibility listener) parks the
  loop when scrolled away. The reference is a looping VIDEO that cannot interact; this is a
  parked-when-hidden interactive field — the SURPASS.

---

## 5. DELTA-ASSAY → wave amendment (AUGMENT/SUPERSEDE `BD.W-DOTFLOW-REBUILD`)

**Disposition: AUGMENT + partially SUPERSEDE `BD.W-DOTFLOW-REBUILD`.** The rebuild wave is
CORRECT on the diagnosis (dead render path + invisible-by-design + contrasting stage) and on
the `field` (halftone backdrop) register — KEEP all of that as `mode:"field"`. It is
INCOMPLETE for THIS route's user ask: the user wants a LIVING FLOW (streamlines, trails,
vortex, technicolor), not a calm halftone. Amend the wave to:

1. **Add `mode:"flow"` as THIS route's default** — the advected-mote + light-ribbon-trail +
   technicolor-velocity-map + cursor-vortex AURORA CURRENT (§2). The `field` halftone stays
   the content-deferential backdrop register (the rebuild's original scope) under `mode:"field"`.
2. **Re-aim the gate** `proof:dotflow-rebuild`: the existing R1 (litFrac>floor on contrasting
   stage), R3 (the pattern MOVES two-frame), R4 (contrasting stage wired) hold AS-IS and now
   BITE harder (the current `litFrac:0.0289`/static-`litFrac` tree is born-RED on R1's
   contrast floor AND R3's motion — my readback shows identical `litFrac` across 6 frames →
   R3 RED). REPLACE R2 (anchored-lattice periodicity) with **R2' — the field FLOWS**: a
   two-frame optical-flow proxy shows net COHERENT advection along streamlines (not a
   frozen/jittering set), and the lit set forms TRAILS (a luminance-gradient tail behind
   bright heads, not isolated discs). Add **R5 — technicolor**: `meanChromaOfLit > floor`
   (the current `meanChromaOfLit≈0` is born-RED). Add **R6 — cursor vortex reads**: a
   pointer-injected frame shows a measurable local swirl/brightness-burst delta.
3. **Read on-present** (the WebGPU race I hit): the gate samples rAF-synced on-present, never
   a delayed `drawImage` (my 450ms-later read returned `litFrac:0` — a readback race, not a
   paint bug). Document this in the gate's capture discipline.

**Reconcile vs the 116 union waves + siblings (no dup):**
- vs `dot-matrix` — that is a SPHERE/globe of dots (Fibonacci phyllotaxis, depth-shaded,
  spinning); shape=sphere. DISTINCT. No overlap.
- vs `goo-dot-matrix` — that is a metaball SDF field sampled as dots; shape=blob-merge.
  DISTINCT. No overlap.
- vs `paper-grid` / `concentric` — grid-cell / iso-ring fields. DISTINCT.
- This (`dot-flow-field`) is the ONLY streamline/vector-flow register — the AURORA CURRENT
  fills it. The `field`-mode halftone overlaps the v4 backdrop ask but is the SAME component's
  second mode (the rebuild's scope), not a new viz.

**Fence carve (load-bearing):** the `flow` kernel is a REAL shader-math change, so it CANNOT
sit under the `proof:viz-dotflow` math-frozen fence (which guards the `field`-mode anchored
Gerstner evaluator). The amendment must explicitly scope: `proof:viz-dotflow` F5 (warm
LIBRARY palette, no teal/navy literal) HOLDS — the technicolor ramp is a DEMO preset; but the
math-freeze clause applies ONLY to the `field`-mode evaluator, NOT the new `flow` kernel.
This is the one place the wave amendment must amend a fence, not just add scope.

---

## 6. SOURCE-VERIFY ledger (grepped before citing — no invented levers)

| cited | exists? | location |
|---|---|---|
| `createGpuSubstrate` / `GpuBackend` | ✓ | `src/composables/glass/webgpu/useGpuSubstrate.ts` |
| `usePointerVelocityField` (`.speed`/`.burst`/`.velocity`/`.active`) | ✓ | `src/composables/motion/usePointerVelocityField.ts` |
| `CURL_FBM_GLSL` (divergence-free curl) | ✓ | `src/composables/glass/webgl/shaders/flow.glsl.ts` |
| `sampleVelocity` / `curlFBM` / `gerstnerVelocity` (JS twins) | ✓ | `dot-flow-field/composables/flowField.ts` |
| `curlFBM` / `sampleVelocity` (WGSL twins) | ✓ | `dot-flow-field/shaders/flow-field.compute.wgsl.ts` |
| `samplePaletteLin` + `OETF_WGSL`/`OKLCH_MATRICES_WGSL` | ✓ | `flow-field.render.wgsl.ts` + `aurora/.../procedural-color.wgsl` |
| `MAX_PARTICLES` (16384) | ✓ | `dot-flow-field/constants.ts` |
| `FlowFieldConfig.interactive` / `respectReducedMotion` | ✓ | `dot-flow-field/constants.ts` |
| `FLOW_PRESET_MONO_REFERENCE` / presets-in-consumers home | ✓ | `demo/stories/substrates/presets.ts` |
| `proof:viz-dotflow` F5 (warm-library fence) | ✓ (cited in `constants.ts` header) | — |
| `cs_main` anchored-pull (the dead-flow root) | ✓ confirmed | `flow-field.compute.wgsl.ts` |

NOT found / NOT cited as existing: a WGSL `curlFBM` twin under
`src/composables/glass/webgpu/shaders/` (the dot-flow carries its OWN WGSL curl inline — that
is the one I reuse). No magic constant smuggled — all numerics above are PROPOSALS for the
amendment to calibrate, flagged as such.
