# Concentric

A radial Fourier ring-interference field — concentric ellipsoid rings whose interference
is a sum of radial harmonics about one-or-more centers. The "3D-rendered-to-2D"
concentric-wave aesthetic: tilted ring families (an ellipsoidal norm reads a disc as
ellipses) crossing into moiré beats, traveling outward on the deep-water dispersion. The
default is the warm-cream library identity; the demo themes the rings through a preset.

`@mkbabb/glass-ui/concentric` · subpath leaf · WebGPU-first (born BB.W-VIZ-SUITE /
W-CONCENTRIC).

## Quick start

```ts
import { Concentric, DEFAULT_CONCENTRIC_CONFIG } from "@mkbabb/glass-ui/concentric";
```

```vue
<Concentric :config="myConfig" v-model:paused="paused" />
```

The DEFAULT palette is the warm-cream library identity. The demo themes the rings through
a PRESET (presets-in-consumers — see `demo/stories/substrates/presets.ts`); it NEVER
enters a library token.

## The cited-SOTA math

Concentric is the RADIAL analogue of the dot-flow-field's Gerstner wave potential — a
**Fourier ring expansion** (the same Fourier-series vocabulary, so the suite carries ONE
math language). The single math source is `composables/ringField.ts` (pure + testable;
the WGSL fragment shader + the GLSL fallback transcribe `sampleRingField()` line-for-line).

```
f(p,t) = Σ_j Σ_i  A_i · sin( k_i·‖p − c_j‖_e − ω_i·t + φ_i )
```

- **`‖·‖_e` is the ELLIPSOIDAL norm** `sqrt((dx/a)² + (dy/b)²)` with axis ratios (a,b), so
  the rings are concentric ELLIPSES — a tilted disc reads as ellipses (the "3D-rendered-to-2D"
  depth implication).
- **The multi-center sum produces ring INTERFERENCE** — moiré-like beats where two ring
  families cross (the elegant concentric-wave look).
- **`k_i = 2π/λ_i` is the radial wavenumber, `ω_i = √(g·k_i)` the deep-water dispersion**
  (the SAME dispersion law the flow field's Gerstner sum uses — Tessendorf, *Simulating
  Ocean Water*, SIGGRAPH 2001; the suite's ONE dispersion law). The amplitudes follow the
  SAME Phillips-spectrum falloff `A_i ∝ exp(−1/(k_i·L)²)/k_i²` so the field is
  energy-realistic, not flat-banded.

## Substrate (BB.W-VIZ-SUITE / W-CONCENTRIC — born WebGPU-first)

Concentric is BORN on the WebGPU-first dual-substrate. It renders through ONE of two
backends, picked ONCE at mount by `useConcentric` (`navigator.gpu` feature-detect):

- **`shaders/concentric.wgsl.ts` — the WebGPU-FIRST primary** (net-new). A pure fullscreen
  fragment pass (the full-screen-triangle `vs_main`, no vertex buffer — the aurora
  shape-class): `fs_main` evaluates `f(p,t)` per pixel (transcribing `ringField.ts`) and
  maps the value through the shared `procedural-color.wgsl.ts` OKLCh ramp (ONE color
  source). No compute pass, no particles.
- **`shaders/concentric.glsl.ts` — the WebGL2 GLSL fallback** (the ~5-10% tail). The
  aurora-class clean twin — the SAME fragment field evaluated by the SAME OKLCh ramp
  (splicing the shared `procedural-color.glsl.ts` chunk, so the color math can NEVER drift
  between the two backends). Because concentric is a pure fragment field (no compute), the
  fallback is the SAME math — the parity status is **`verified`** (only the rasterizer
  sub-pixel drift the OKLab-ΔE bar accommodates), NOT `degraded` like the dot-flow-field's
  CPU-stepped point cloud.

Both backends compose the SAME `createCanvasLifecycle` leaf (the offscreen-pause +
live-PRM-freeze + demand-loop discipline is byte-identical), so the lifecycle wiring
(`DockBackgroundToggle` pause/resume, pointer `wake`) is substrate-agnostic. Machine-locked
by `proof:concentric` (the WebGPU-first-with-fallback + the colocation/publication + the
radial-Fourier π readback + the JS↔WGSL round-trip + a self-test bite) +
`proof:gpu-substrate-single` clause F (the concentric row resolves on disk). The binding
live-π / own-surface DELTA capture rides W-REFLECT3.

## API

### `<Concentric>` props

| prop | type | default | note |
|---|---|---|---|
| `config` | `ConcentricConfig` | `DEFAULT_CONCENTRIC_CONFIG` | the full author schema |
| `paused` | `boolean` | `false` | `v-model:paused` — the WCAG-2.2.2 pause seam |

### `ConcentricConfig`

`centers`, `ringComponents`, `axisRatio`, `speed`, `palette`, `background`, `interactive`,
`respectReducedMotion`. Published on `@mkbabb/glass-ui/api`.

### `useConcentric(canvasRef, options)`

The public composable — composes the `createGpuSubstrate` picker (WebGPU primary OR the
WebGL2 GLSL fallback), wires offscreen-pause, and returns the uniform `ConcentricHandle`
(`pause` / `resume` / `wake` / `renderAt` / `reducedMotion` / `dispose`).
