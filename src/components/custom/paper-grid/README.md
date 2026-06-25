# PaperGrid

A calm engineering-graph-paper grid — evenly-spaced, **LARGE** cells, a crisp fine rule with
a bolder major rule every 5 cells — drawn on a slowly breathing **liquid** sheet. The whole
field undulates: adjacent lines bow and flow TOGETHER as if the grid is ruled on a gently
rippling pond, never a per-line jitter (that reads as the noise the user condemns). The wave
is felt, not loud — at the calm default the lines are clearly still a grid, the breath a slow
brush over them. The ink is warm `--foreground` over transparent — the page reads through the
cells. **Teal-on-navy is gone.**

`@mkbabb/glass-ui/paper-grid` · subpath leaf (OFF the root barrel — a heavy GL leaf) ·
WebGPU-first (BORN at BC.W-VIZ-PAPERGRID — a fullscreen fragment, the aurora/concentric
shape-class; the LIGHTEST viz in the suite — no compute, no particles, no storage buffer).

## Quick start

```ts
import { PaperGrid, DEFAULT_PAPER_GRID_CONFIG } from "@mkbabb/glass-ui/paper-grid";
```

```vue
<PaperGrid :config="myConfig" v-model:paused="paused" />
```

The DEFAULT line ink is the warm-cream library identity (resolved live off `--foreground` at
mount). The suffusion preset (`fieldAlpha ≈ 0.12`, large pitch, slow warp, `interactive:false`)
and any themed colors are DEMO presets (presets-in-consumers — see
`demo/stories/substrates/presets.ts`); they NEVER enter a library token.

## The cited techniques (the composition)

The viz composes cited techniques on the proven substrate (research/viz/paper-grid.md §3):

1. **The crisp line — Ben Golus derivative-AA grid distance** (`gridCoverage`). The line
   coverage is computed from the screen-space DERIVATIVE of the (twisted) UV, so a line is
   exactly N device-pixels wide at ANY DPR/zoom — never the CSS sub-pixel blur. Ben Golus,
   *The Best Darn Grid Shader (Yet)*; Evan Wallace, *Anti-Aliased Grid Shader*. This is the
   "blurry mess" fix.
2. **The "liquid" — the per-cell TWIST** (`cellTwist`, the shared `waveField` leaf). Each cell
   ROTATES + shears about its OWN center (a windmill of warped boxes where a traveling Gaussian
   crest passes, calm square cells elsewhere) — the deformation-gradient model (the C3 cure:
   the box twists, the lines stay locally straight, never the retired uniform LINE-warp). The
   crest sweeps along `waveDir`; FOLD C crest-gates the twist floor by the envelope so off-crest
   cells relax to flat calm paper (a TRAVELING read, not static foil).
3. **WHY liquid not noise — the Bridson divergence-free curl director**. The per-cell twist
   direction IS the 2D curl of an fbm potential (Bridson 2007: `∇×ψ = (∂ψ/∂y, −∂ψ/∂x)`,
   divergence-free BY CONSTRUCTION — the SHARED `curlFBM` chunk), so adjacent cells lean
   TOGETHER (a flowing read, never per-cell noise).
4. **The LIT FACE — the height-lit filled cell interior** (BD.W-PAPERGRID-FACE;
   `cellHeight`/`faceRelief`/`facePlateau`, the shared `waveField` leaf). Each cell paints a
   filled warm-paper FACE, lit by the SLOPE (`∇H`, central-difference — derivative-free, Safari-
   safe) of the SAME traveling-wave height the twist rides, against a fixed upper-right cel
   key-light. A volume-preserving SQUASH retreats the inset at the crest so the face physically
   INFLATES. A 3-stop warm-DIVERGENT ramp (rose-umber trough → ember-amber → warm-wheat crest,
   hue ∈ [20,90], keyed on `mix(shade,h)`) carries the technicolor punch. The face composites
   UNDER the kept creases, premultiplied over transparent. **OPT-IN — `faceAlpha:0` default →
   the face evaporates → byte-identical line render**; the vivid `PAPER_GRID_PRESET_RIPPLE` lifts
   it (presets-in-consumers).

The pointer adds a LOCAL Gaussian SWIRL on top (`cursorSwirl`) — a finger twists the cells around
it (the re-aimed bulge), coherent everywhere else. Velocity drags a directional wake; a flick
fires a transient ripple impulse (`usePointerVelocityField`).

## The pinned defaults (SUBTLE + LARGE + evenly-spaced)

| axis | default | what it does |
|---|---|---|
| Cell size | **64px** | the grid cell pitch; LARGER = bigger cells |
| Major every | **5** | minor cells per major rule (the kf 5rem/1rem ratio) |
| Minor weight | **0.04** | the calm hairline (≈ kf 3%) |
| Major weight | **0.11** | the bolder rule (kf 11%, above the 10% floor) |
| Line width | **1.0px** | one crisp device-pixel via Golus AA |
| Wave amplitude | **0.10 cell** | how far the lines bow (subtle — "felt, not loud") |
| Wave scale | **0.5** | LOW freq → the whole sheet bows together |
| Wave speed | **0.15** | the slow breath |
| Field alpha | **1.0** (demo) / **~0.12** (suffusion) | the GLOBAL subtlety knob |
| Bulge strength / radius / mode | **0.12 / 3 cells / repel** | the cursor push |
| Line color | **warm `--foreground` identity** | the ink (NEVER teal-on-navy) |
| Background | **transparent** | the ground (so it suffuses over the page) |

## Substrate

- **ONE lifecycle leaf** — composes `createGpuSubstrate` over `createCanvasLifecycle` via
  `useGpuSubstrate`/`useWebGPUCanvas`; ZERO scheduling re-fork (offscreen-pause, live-PRM
  freeze, the demand loop all inherited).
- **ONE math source** — `composables/paperGrid.ts` (pure, node-testable) + the shared
  `waveField` leaf; the WGSL `fs_main` + the GLSL fragment transcribe `potentialFBM`/
  `gridCoverage` + the shared `cellTwist`/`cellHeight`/`faceRelief`/`facePlateau`/`cursorSwirl`
  line-for-line. `proof:viz-papergrid` clause P3 round-trips JS↔WGSL↔GLSL.
- **ONE curl source per backend** — the shared `curlFBM` chunk (`flow.glsl.ts` for WebGL2;
  `flow.wgsl.ts` for WebGPU — paper-grid is the FIRST WGSL curl consumer, the booked
  procedural-tail chunk discharged).
- **Parity** — `verified` (a PURE fragment field, no compute/particles — both backends
  evaluate ONE analytic field; the structural-proxy ΔE is 0.0). See `gpu-parity-table.md`.
- **No Canvas2D path** — the `<canvas>` ELEMENT is the GPU surface; there is NO Canvas2D
  context (a CPU grid-warp is hopeless AND forbidden — "no canvas anywhere", §E).
