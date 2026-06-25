# Constellation — BD research + brainstorm (the GPU-only lattice + the configurator/interactivity expansion)

**Lane** BD viz-research / constellation · **Status** AUTHORED 2026-06-22 · **Branch** prototype/liquid-dock ·
**Substrate-grounded** against `src/components/custom/constellation/**` at HEAD + the BD viz-audit pool ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits.

> Read alongside: `constellation/README.md` (the shipped substrate/parity section), the BD viz-audit
> (`viz/audit/{configurator-interactivity-state,gpu-only-conflict,substrate-consolidation}.md`),
> `BD.W-VIZ-COMPUTE-DENSITY.md` (the GATED neighbor-bin successor), the dock-constellation union waves
> (`union/waves/BD.W-DOCK-CONSTELLATION.md`), and the aurora research (`research/aurora.md`) as the
> sibling format.

---

## 0. TL;DR

Constellation is a drifting proximity-graph lattice: `count` nodes drift on constant velocities + wall-bounce,
any two within `link·k` px are joined by a distance-faded hairline, the pointer leans the web + drops ripples,
a focal node warps among targets on a critically-damped spring. **The render is ALREADY GPU-only** — the
prompt's Canvas2D premise is STALE. BC.W-VIZ-CONSTELLATION retired the four Canvas2D draw passes and re-homed
the rasterizer onto `createGpuSubstrate` (WebGPU instanced-points + instanced-lines primary, the WebGL2
instanced-arrays twin "fallback"). There is **zero `getContext("2d")` in the tree** (confirmed —
`constellationRender.ts:2` names the retirement; `useCanvas2D` is NOT imported by constellation).

So the BD work is NOT "migrate off Canvas2D." It is three different things:
1. **The residual GPU-only gap** is the *field STEP + edge SCAN* — these still run on the CPU each frame
   (`stepField` + `buildEdges` O(N²)/2 inside the leaf callback), then the GPU only rasterizes. The "full
   GPU" idiomatic transposition is the compute-particle lattice + spatial-hash neighbor-bin
   (`BD.W-VIZ-COMPUTE-DENSITY`, currently GATED-on-a-dense-consumer). This is the genuine "kill the CPU
   loop" headline — but it is overfit substrate at count=64 unless a dense consumer fires.
2. **The configurator is WHOLLY ABSENT** (the audit: constellation is the ONE viz with `NONE` — a 9-panel
   static gallery of flat props, most `:pointer-reactive="false"`, ONE `<Switch>`). It needs a real
   `ConstellationConfig` + a `VizStudio` studio, same as the robust five.
3. **Interactivity is thin + keyboard-dead** (lead panel only; zero keyboard suite-wide). The mandate's
   "mouse/keyboard INTERACTIVITY + birthdaycolor-like play" needs pointer-attract/repel, click-to-add-node,
   and a `useVizKeyboard` seam.

The "fallback" prose must also reconcile to "co-equal WebGL2 backend" per the gpu-only-conflict Reading 2
(the WebGPU↔WebGL2 pair is two GPU backends, not a degrade — keep the picker, purge the "~5-10% tail /
don't-crash-to-black" language).

---

## 1. The shipped SOTA (the substrate we build ON — recorded, not re-researched)

| Axis | What ships at HEAD | Source-of-truth |
|---|---|---|
| **Render** | TWO instanced passes (lines under points) over the SAME stepped field; segment-quad expansion + crisp `fwidth` SDF disc/AA; `6×edgeCount` + `6×nodeCount` instances; `one / one-minus-src-alpha` premultiplied blend | `composables/constellationWGPUSetup.ts`, `constellationGLSetup.ts`, `shaders/constellation-{points,lines}.{wgsl,glsl}` |
| **Substrate** | `createGpuSubstrate` (WebGPU primary, WebGL2 instanced-arrays twin); `createCanvasLifecycle` leaf → offscreen-park + live-PRM one-frame freeze + demand `wake()` | `useGpuSubstrate`, `useConstellation.ts` |
| **Field engine** | pure framework-free `seedField`/`refitField`/`stepField`; constant-velocity drift + wall-bounce; per-node seeded `z∈[0,1]` parallax depth; `k = w/BASE_WIDTH(1280)` scale invariant; `kVis` visual-size floor | `constellationField.ts`, `constellationRender.ts` `kVisOf` |
| **Edge scan** | pure CPU all-pairs `buildEdges` (`α = 1 − d²/reach²` falloff) + `appendPointerWeb` (cursor virtual-node tethers) + accent-incident flagging; `eMax = MAX_NODES·MAX_DEGREE` budget cap (drop weakest) | `constellationField.ts:277` |
| **Pointer** | `usePointerVelocityField` fed `tick(deltaMs)` from the ONE leaf callback (no second rAF); §6 velocity-aware lean (sweep-momentum bias, anti-slingshot cap) + acceleration→flick `fireBurst` (warp focal + drop ripple); pointer-parallax node-screen offset | `useConstellation.ts:127`, `constellationInteraction.ts:387` |
| **Interaction modes** | `warpOnClick` · `wander` (auto-drift cadence re-targets focal) · `gravityWell` (held-pointer inverse-square pull, perturb-then-cool) · `pinned`/`pinnedDrift` (anchored breathing node) · `warpAutoRelease`; each token-tunable via `--constellation-*` | `constellationInteraction.ts`, `constellationWell.ts`, `constants.ts` |
| **Warp spring** | dt-stepped 2nd-order critically-damped integrator (`ω₀=2π/response`, ζ); NO `useSpring` (would spawn a 2nd rAF defeating the parked-substrate freeze); chases a LIVE drifting target (identity-ride) | `constellationInteraction.ts:158` `warpStep` |
| **Color** | JS-side `readPalette` resolves the full `--constellation-*` legibility set off the canvas; written into the uniform buffer (one color path, dark-flip re-tints); warm-cream default `DEFAULT_PALETTE`, no teal/navy | `constellationRender.ts:38` |
| **Determinism** | seeded `mulberry32`/`hashString` (shared PRNG, no re-roll); `isFrozen` capture predicate (`?export/?print/?freeze`) → static frame | `useConstellation.ts:91` |

**Budget caps:** `MAX_NODES=256` (slider cap), `MAX_DEGREE=12`, `E_MAX=3072` pre-sized instances; 2× DPR cap
(focal-class, sharp discs). The buffers pre-size so the per-frame `writeBuffer` never re-allocates.

---

## 2. The GPU-ONLY picture — where the CPU still owns the loop, and the idiomatic transposition

The render is GPU; the SIMULATION is not. Per frame, inside the ONE leaf callback, the CPU runs:

- `stepField` — O(N) drift + wall-bounce + pointer-lean + well-force + warp-step (N≤256, trivial).
- `buildEdges` — **O(N²)/2** all-pairs distance scan (≈2k pairs at N=64; ≈32k at N=256 — still trivial).
- `nearestNode` — O(N) per click/burst.
- pack the node/edge/uniform `Float32Array`s → `writeBuffer`.

**This is the honest reading of "every facility renders via WebGPU/WebGL2."** The render DOES. The simulation
is JS-on-the-main-thread by deliberate design (`BD.W-VIZ-COMPUTE-DENSITY`): the all-pairs scan is *overfit
substrate to GPU-ify at count=64* (J-inv-10 ≥2-consumer bar). The neighbor-bin compute kernel is BOOKED,
GATED on a real ≥256-node consumer. The brainstorm below proposes the consumers that would FIRE that gate
(a dense dock-constellation, a "field of stars" hero) — turning the GATED book into a shipped build, idiomatic
not overfit.

**The shared edge-predicate fence (binding):** any GPU compute path MUST transcribe the SAME `buildEdges`
`α = 1 − d²/reach²` predicate (the ONE math source — `proof:single-color-core`/single-math-source bar). A
re-forked edge math reds the gate. So the JS `buildEdges` stays the reference; the WGSL `@compute` kernel is
a transcription, never a second algorithm.

---

## 3. The birthdaycolor.com / SOTA "better-it" axes (the references to beat, Safari-first)

birthdaycolor.com is a date→palette generative GRADIENT field — not a node graph. Constellation's "best-it"
references are the **living-network / particle-graph** lineage: Awwwards "constellation hero" sites
(particles.js, tsParticles, three.js point-graphs), the Apple/Vercel ambient node-mesh backdrops, and the
*generative-from-input* class (a click SEEDS structure, the cursor SCULPTS the field). The proof-axes:

1. **GPU-resident at density** — the references cap at a few hundred CPU particles before jank; a compute
   neighbor-bin lattice runs thousands of nodes at 120fps. The "better-it" is *density without degrade*.
2. **Velocity+accel pointer physics** — most particle-graphs read pointer POSITION only. Constellation already
   reads velocity (sweep-momentum lean) AND acceleration (flick burst) via the shared field. The better-it is
   *the field has momentum*, not a position-snap.
3. **Generative play (the gap)** — birthdaycolor SEEDS a field from input. Constellation has NO click-to-add /
   drag-to-paint. The better-it is *you build the constellation*, then it lives.
4. **Token-first warm identity** — the references hardcode neon-on-black. Constellation re-tints via ONE
   `--constellation-*` path on a dark-flip, warm-cream default. The better-it is *it belongs to the design
   system*, themeable in one override.

**Safari fence:** the render is pure instanced GPU (no `backdrop-filter: url()`, no SVG goo) — WebKit-safe by
construction. The WebGPU path needs Safari 26+; the WebGL2 twin covers older WebKit. Every brainstorm idea
below must hold on the WebGL2 backend (no WebGPU-only mechanic without a WebGL2 expression or a recorded fall).

---

## 4. Configurator + interactivity — the current state + the target

**Configurator: NONE (the audit's only `none` among canvas viz).** Constellation ships 13 flat props
(`count`/`link`/`speed`/`parallax`/`warpOnClick`/`wander`/`gravityWell`/`pinned`/`pinnedDrift`/
`warpAutoRelease`/`pointerReactive`/`opacityCeiling`/`accentEdges`/`seed`) across a ~9-panel STATIC gallery,
most `:pointer-reactive="false"`, with ONE `<Switch>` toggling the lead. **The props ARE a config-shaped
surface** — the lift is mechanical: a `ConstellationConfig` interface + `useConfiguratorState<ConstellationConfig>`
+ a `VizStudio` + `<Configurator asideSide="right">` with per-axis `ConfiguratorRow`s (compose `VizStudio`,
do NOT re-fork — the concentric hand-rolled-`reactive` anti-pattern is the thing to avoid).

**Interactivity: thin + keyboard-dead.** The pointer is richly wired (velocity+accel+parallax) but only on the
LEAD panel; the gallery is static. **Keyboard is ZERO suite-wide.** No click-to-add-node, no drag-to-move,
no generative seeding.

**The target (mandate):** a robust configurator + mouse/keyboard interactivity + birthdaycolor-like generative
play, on every viz. For constellation specifically: pointer attract/repel, click-to-add-node, keyboard nudge.

---

## 5. The brainstorm — 10 ideas, each with a SOTA anchor, a Safari fence, and a falsifiable bar

### IDEA 1 — `ConstellationStudio` + the `ConstellationConfig` door (the table-stakes lift)
**What:** a real `ConstellationConfig` (the 13 flat props → one reactive door) + a `VizStudio` studio:
**Field** (count slider 8–256, link reach, drift speed, node-size band, seed re-roll button), **Depth**
(parallax 0–0.3), **Interaction** (warp-on-click · wander cadence · gravity-well gain/reach · pin · auto-release
toggles), **Legibility** (alpha ceiling, edge floor, accent-edges). Compose `useConfiguratorState` (per-preset
clone — each preset a named editable baseline) + `VizStudio`, inheriting the AZ.W-HIERARCHY configurator
vocabulary. Warm-cream default preset; a "dense field" + "calm hero" preset (presets-in-consumers caveat —
named themed presets live demo-local, the WARM default is library identity).
**SOTA anchor:** the robust-five studio pattern (aurora/blob/fourier/concentric/paper-grid).
**Safari fence:** pure prop-threading, no render change — backend-agnostic.
**Bar:** ≥18 `ConfiguratorRow`s exposed; every flat prop reachable from the studio; `useConfiguratorState`
(NOT hand-rolled `reactive`); the seed re-roll re-lays the field deterministically. The audit's `NONE` flips
to `robust`.

### IDEA 2 — Click-to-add-node + drag-to-move + alt-click-to-remove (the generative play, the headline)
**What:** the birthdaycolor "you SEED it" register. A click in a `:editable` constellation ADDS a node at the
cursor (with a seeded velocity), a drag MOVES the nearest node (pin it while dragging — reuse the `pinNode`
seam), an alt/right-click REMOVES the nearest. The lattice re-triangulates live (the edge scan already
handles a changing node set). The added node enters with a `useLiquidFlex`-style scale-in pop + a ripple.
**SOTA anchor:** generative node editors (tsParticles "click: push", obsidian-graph drag); birthdaycolor's
seed-from-input. The `field.nodes` array is already mutable; `seedField` is the only add-path today.
**Safira fence:** pure field-array mutation + the existing instanced render redraws — WebKit-safe, no new
GPU mechanic. The node cap (`MAX_NODES`) clamps the add.
**Bar:** click adds a node that drifts + links; drag moves a held node smoothly (the warp/pin spring chases
it); remove drops it + its incident edges; the field stays ≤`MAX_NODES`; PRM → instant add/remove, no pop
animation. A new `:editable` prop default-OFF (additive).

### IDEA 3 — Pointer ATTRACT / REPEL mode toggle (the bidirectional field force)
**What:** the gravity-well today is attract-ONLY (inverse-square pull). Add a `pointerForce: "attract" |
"repel" | "lean" | "off"` axis. **Repel** pushes nodes away from a held cursor (the "part the sea" gesture —
a Vercel/Linear ambient-mesh signature: the cursor clears a bubble in the lattice). **Lean** is the existing
gentle sweep-gather. The force reuses the `stepWell` inverse-square machinery with a sign flip + the same
no-singularity floor + |v|→speed cool-back (the field re-settles on release).
**SOTA anchor:** particles.js `mode: "repulse"`/"grab"/"bubble"; the ambient-mesh "cursor parts the field".
**Safari fence:** pure JS force on the field; backend-agnostic.
**Bar:** repel held clears a visible bubble (mean node-density near cursor drops ≥30%); release re-settles to
±5% rest within the cool window; the §6 perturb-then-cool egg-live π holds for both signs; PRM → no force.

### IDEA 4 — `useVizKeyboard` — the suite-wide keyboard seam (constellation as consumer #1)
**What:** the audit's #1 gap — keyboard is absent on all 10 viz. Mint a shared `useVizKeyboard` reading
arrow keys / ±  / space onto the SAME push-API `usePointerVelocityField` feeds (a synthetic "cursor" driven
by keys — parity with the pointer, PRM-safe). For constellation: arrows nudge the focal/warp target,
`+`/`-` adjust link reach or count, `space` drops a ripple / fires a burst, `r` re-rolls the seed, `Tab`
cycles the focal node. The seam is the deliverable (≥2 consumers required — constellation + one more viz
fire the J-inv-10 bar at birth).
**SOTA anchor:** accessible-canvas keyboard nav (the keyboard-parity-with-pointer pattern); the existing
`usePointerVelocityField` tick(0)-freeze under PRM is the model.
**Safari fence:** plain `keydown` listeners on the focusable host; no GPU. The host gains `tabindex` +
an `aria-label` describing the keyboard map.
**Bar:** every documented key maps to a field effect; the seam is consumed by ≥2 viz; focus-visible ring on
the host; PRM → keys still function but the motion is the deterministic snap (no live velocity); a screen
reader announces the focal change.

### IDEA 5 — The GPU compute neighbor-bin lattice (fire the GATED `BD.W-VIZ-COMPUTE-DENSITY`)
**What:** the genuine "full GPU" headline — move the O(N²) edge scan to a `@compute` spatial-hash neighbor-bin
kernel (bin nodes into a uniform grid, scan only the ≤9 neighbor bins per node → O(N)). Ships the BOOKED
successor — but ONLY if a real dense consumer fires it (idea 6 below provides one). The kernel transcribes
the SAME `buildEdges` predicate (the ONE math source); the CPU all-pairs scan stays the WebGL2-backend +
low-count path (co-equal, not a degrade). The field STEP can also move to a compute pass (per-node drift +
wall-bounce parallelized), making the simulation GPU-resident end-to-end.
**SOTA anchor:** the dot-flow-field compute-particle advection (the proven pattern); GPU spatial-hash
broad-phase (Bridson/real-time-collision).
**Safari fence:** WebGPU compute needs Safari 26+; the WebGL2 backend keeps the CPU all-pairs scan (the
co-equal twin). NO WebGPU-only mechanic without the WebGL2 expression.
**Bar:** at N=2048 the neighbor-bin reads byte-identically to the all-pairs reference (same edge set, faster);
the frame budget clears where O(N²) would not; `proof:viz-compute-density` C1–C4 GREEN with a REAL ≥256
consumer (NOT a synthetic — the overfit self-test bite reds a build with no consumer).

### IDEA 6 — The dock-constellation tether facility (the dense consumer that fires idea 5)
**What:** the dock is the HALLMARK; `BD.W-DOCK-CONSTELLATION` already books a dock-resident constellation.
Generalize it: dock CONTROLS become constellation NODES — a live tether-mesh links adjacent dock controls
with constellation hairlines, the focal node tracks the hovered/active control, a fission/now-playing split
(the goo-split sub-dock) drags its tether with it. A nav dock with 12–40 controls + a dense ambient field
behind = the ≥256-node consumer that fires the compute path (idea 5). This is the architectural payoff: the
constellation engine SERVES the hallmark dock, not just a demo gallery.
**SOTA anchor:** the union dock-fission/now-playing waves; obsidian-graph as live UI.
**Safari fence:** the tether render is the existing instanced GPU pass (WebKit-safe); the dock box stays
INVIOLATE (the tether paints in the dock's non-clipping `.glass-dock-frame` escape, like `DockStack`).
**Bar:** dock-control nodes link with live hairlines; the focal tracks the active control; the dock box
`deltaW=deltaH=0` across the tether (box-inviolate); a 256+ ambient-node mode fires idea 5's gate; both
modes, both orientations.

### IDEA 7 — Constellation-from-image (the dot-matrix cross-pollination — tessellate an arbitrary shape)
**What:** the dot-matrix mandate ("dots tessellate to display arbitrary images") generalizes to constellation:
seed the nodes on the LUMINANCE field of an arbitrary image/SVG/text glyph (a logo, a word, a heart),
weighting node density by brightness (the stippling / weighted-Voronoi-relaxation classic). The lattice then
holds the SHAPE while drifting — a "ℱ" wordmark, a logo, that breathes as a node-graph. A wave "washes over"
it (idea 8). Reuses the aurora field-sample logic the mandate cites ("leverage similar AURORA logic").
**SOTA anchor:** weighted stippling (Secord 2002), the dot-matrix tessellation mandate, particle-text effects.
**Safari fence:** the image SAMPLE is a one-shot 32×32 `getImageData` COLOR-READ (the documented aurora
album-extractor exemption — a sampler, NOT a viz drawing context); the render stays instanced GPU.
**Bar:** a seeded image produces a recognizable node-graph silhouette (node-density correlates with luminance,
ρ≥0.6); the shape persists while nodes drift (re-stipple on a slow cadence); a screen-reader gets the
`aria-label` shape name; warm-cream default, presets-in-consumers for the source image.

### IDEA 8 — The shared wave-perturbation field (concentric/paper-grid/dot-matrix unity)
**What:** the mandate wants concentric + paper-grid + dot-matrix to share ONE wave-based perturbation math.
Constellation joins it: a Gerstner/Tessendorf sum-of-sines wave (the `flowField.ts`/`curlFBM` lineage)
perturbs the node DRIFT velocities (a wave "washes over" the lattice — nodes ripple along the wavefront,
the edges stretch + relax with it). The SAME `sampleVelocity` evaluator the dot-flow-field + concentric +
paper-grid read becomes the constellation drift-bias term (off by default; opt-in `waveField` axis). ONE
wave math, four+ consumers — the architectural-transposition the mandate asks for.
**SOTA anchor:** Tessendorf 2001 deep-water dispersion; the shared `curlFBM`/`flowField` already documented
as the ≥3-consumer chunk.
**Safari fence:** the wave is a JS field evaluation (or a shared WGSL/GLSL chunk both backends splice) —
backend-agnostic, WebKit-safe.
**Bar:** the wave reads as a coherent wash over the lattice (a directional ripple, not noise); the SAME
`sampleVelocity` source feeds constellation + ≥2 siblings (single-math-source); off-by-default byte-identical;
the cool-down invariant holds (the field re-settles).

### IDEA 9 — Cartoon-shadow / depth-shaded node register (the blob-mandate parallel + readability)
**What:** the blob mandate adds a cartoon-shadow toggle; the parallel for constellation is a node DEPTH
register — the seeded `z∈[0,1]` already drives parallax but not SIZE/SHADE. Add `depthShade: boolean`: deeper
nodes (low z) render smaller + dimmer + with a soft drop-shadow disc behind, nearer nodes bigger + brighter
(the dot-matrix depth-shell model: `opacity = 0.15 + 0.85·z`, `size = 0.6 + 0.4·z`). The lattice reads as a
3D point-cloud, not a flat mesh — and the warm cartoon-shadow disc is an opt-in identity skin matching the
`--shadow-cartoon-*` register.
**SOTA anchor:** the dot-matrix depth-shaded sphere (Will-Howard/COBE/Stripe); the cartoon-shadow token family.
**Safari fence:** the shadow disc is a second instanced pass (a larger dim offset disc under each node) —
pure GPU, WebKit-safe; the `--shadow-cartoon-*` token cascade re-tints it.
**Bar:** depth reads (near nodes visibly bigger+brighter than far); the cartoon-shadow toggle adds the offset
disc reading the `--shadow-cartoon-*` token; default-off byte-identical; both modes.

### IDEA 10 — Edge-as-flow / signal-pulse register (the living-network "data flowing" read)
**What:** the references' "neural-network" register — pulses of light travel ALONG the edges (a bright dab
animates from node A to node B at intervals), making the lattice read as a live communication graph, not a
static mesh. A pulse rides the edge as a `t∈[0,1]` parameter on the instanced segment fragment (a moving
bright band on the hairline), fired periodically or on a flick-burst (the accel term spawns a pulse-cascade
from the focal). Compositor-cheap (a per-edge `uPulseT` uniform driving a fragment band).
**SOTA anchor:** neural-net viz, the "data packet on the wire" idiom; the existing focus/accent edge-skin.
**Safari fence:** the pulse is a fragment-shader band on the EXISTING instanced line — pure GPU, no new pass,
WebKit-safe. The pulse cadence is a JS clock (the leaf's parked rAF).
**Bar:** pulses travel A→B legibly along edges; a flick fires a pulse-cascade from the focal; off-by-default
byte-identical; PRM → pulses freeze (static frame); warm-cream pulse default.

---

## 6. Recommended sequencing (the dependency reading)

1. **IDEA 1 (`ConstellationStudio`)** — table-stakes, unblocks every interactive demo; lowest-effort.
2. **IDEA 4 (`useVizKeyboard`)** — the suite-wide seam; constellation is consumer #1 (a 2nd viz co-births it).
3. **IDEA 2 (click-to-add) + IDEA 3 (attract/repel)** — the mandate's generative-play headline; both pure
   field-mutation, backend-agnostic.
4. **IDEA 9 (depth-shade/cartoon) + IDEA 10 (edge-pulse)** — the visual identity skins; opt-in, byte-identical
   default.
5. **IDEA 6 (dock-constellation) → IDEA 5 (compute neighbor-bin)** — the architectural payoff: the dock
   consumer fires the GATED compute path, turning the overfit book into a shipped build.
6. **IDEA 7 (from-image) + IDEA 8 (shared wave)** — the cross-viz unity (the dot-matrix/concentric/paper-grid
   shared-wave-math mandate); higher effort, deferrable.

## 7. The fences (binding, carried into every wave)

- **ONE edge-math source** — `buildEdges` `α=1−d²/reach²` is the reference; any GPU compute kernel TRANSCRIBES
  it (single-math-source bar). No second algorithm.
- **NO second rAF** — every motion rides the leaf's ONE parked rAF (the offscreen-park + PRM-freeze depends
  on it). No `useSpring`, no private loop (the `warpStep` integrator precedent).
- **Co-equal backends, NO Canvas2D** — WebGPU↔WebGL2 are two GPU backends (reconcile the "fallback / ~5-10%
  tail" prose); zero `getContext("2d")` (already true — keep it true).
- **Box-inviolate (dock idea 6)** — the dock-constellation tether paints in the non-clipping frame escape;
  `deltaW=deltaH=0`.
- **Warm-cream identity, presets-in-consumers** — `DEFAULT_PALETTE` stays the library default; themed palettes
  + source images + named field presets live demo-local.
- **PRM-safe** — every register collapses to a deterministic static frame / instant snap under reduce.
- **Safari-first** — pure instanced GPU render; WebGPU needs Safari 26+, the WebGL2 twin covers older WebKit;
  no WebGPU-only mechanic without a WebGL2 expression.
- **J-inv-10 ≥2-consumer bar** — the compute neighbor-bin (idea 5) ships ONLY on a real dense consumer
  (idea 6); the keyboard seam (idea 4) needs ≥2 viz at birth. No overfit substrate.
