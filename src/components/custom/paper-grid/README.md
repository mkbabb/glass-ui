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

## The three cited techniques (the composition)

The viz is the composition of THREE cited techniques on the proven substrate
(research/viz/paper-grid.md §3):

1. **The crisp line — Ben Golus derivative-AA grid distance** (`gridCoverage`). The line
   coverage is computed from the screen-space DERIVATIVE of the (warped) UV, so a line is
   exactly N device-pixels wide at ANY DPR/zoom — never the CSS sub-pixel blur. Ben Golus,
   *The Best Darn Grid Shader (Yet)*; Evan Wallace, *Anti-Aliased Grid Shader*. This is the
   "blurry mess" fix.
2. **The "liquid" — Iñigo Quílez domain warp** (`curlWarp`). The grid is computed not at `uv`
   but at a WARPED coordinate `g(uv) = uv + warp(uv,t)` — the IQ substitution f(p)→f(g(p)),
   g(p) = p + h(p) (iquilezles.org/articles/warp/). Because `h` is a smooth LOW-frequency
   field, adjacent cells warp TOGETHER — the whole sheet bows and flows, never a per-line
   jitter (the inverse-coherence law: LARGE structures come from LOW spatial frequency).
3. **WHY liquid not noise — the Bridson divergence-free curl flow**. The warp field IS the
   2D curl of an fbm potential (Bridson 2007: `∇×ψ = (∂ψ/∂y, −∂ψ/∂x)`, divergence-free BY
   CONSTRUCTION — the SHARED `curlFBM` chunk). The curl preserves the sheet's local area, so
   the grid folds and stretches like real fluid advection rather than the source-y bulge a
   raw fbm gradient produces. A SECOND counter-flowing curl term at a different scale/speed
   prevents a visible loop (Alex Harri counter-flow).

The pointer adds a LOCAL Gaussian bulge on top (`cursorBulge`) — a finger pressed into the
liquid (repel away / attract toward), coherent everywhere else. Velocity drags a directional
wake; a flick fires a transient ripple impulse (`usePointerVelocityField`).

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
- **ONE math source** — `composables/paperGrid.ts` (pure, node-testable); the WGSL
  `fs_main` + the GLSL fragment transcribe `potentialFBM`/`curlWarp`/`cursorBulge`/
  `gridCoverage` line-for-line. `proof:viz-papergrid` clause P3 round-trips JS↔WGSL↔GLSL.
- **ONE curl source per backend** — the shared `curlFBM` chunk (`flow.glsl.ts` for WebGL2;
  `flow.wgsl.ts` for WebGPU — paper-grid is the FIRST WGSL curl consumer, the booked
  procedural-tail chunk discharged).
- **Parity** — `verified` (a PURE fragment field, no compute/particles — both backends
  evaluate ONE analytic field; the structural-proxy ΔE is 0.0). See `gpu-parity-table.md`.
- **No Canvas2D path** — the `<canvas>` ELEMENT is the GPU surface; there is NO Canvas2D
  context (a CPU grid-warp is hopeless AND forbidden — "no canvas anywhere", §E).
