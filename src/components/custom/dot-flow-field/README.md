# DotFlowField

Small dots seeded along undulating streamlines, rippling in waves — a curl-noise flow
field traced by advected particles, where the scalar potential undulates as a
Gerstner/Tessendorf sum-of-sines water-wave field. The "Claude co-work" dot-wave
aesthetic: teal dots over dark navy (a demo preset), the streamlines folding + braiding
like a river delta, the dots clustering denser where the field is calm and thinning where
it accelerates.

`@mkbabb/glass-ui/dot-flow-field` · subpath leaf · WebGPU-first (born BB.W-VIZ-SUITE /
W-FLOWFIELD).

## Quick start

```ts
import { DotFlowField, DEFAULT_FLOW_CONFIG } from "@mkbabb/glass-ui/dot-flow-field";
```

```vue
<DotFlowField :config="myConfig" v-model:paused="paused" />
```

The DEFAULT palette is the warm-cream library identity. The reference teal-on-navy is a
DEMO preset (presets-in-consumers — see `demo/stories/substrates/presets.ts`); it NEVER
enters a library token.

## The cited-SOTA math

The dot-flow-field is a **curl-noise flow field traced by advected particles, where the
scalar potential undulates as a Gerstner/Tessendorf sum-of-sines water-wave field**. The
single math source is `composables/flowField.ts` (pure + testable; the WGSL compute kernel
transcribes `sampleVelocity()` line-for-line).

1. **The wave potential (Tessendorf / Gerstner sum-of-sines).** Ocean-surface height as a
   sum of sinusoids — `h(p,t) = Σ_i A_i·sin(k_i·(D_i·p) − ω_i·t + φ_i)`, where `ω_i =
   √(g·k_i)` is the deep-water dispersion (long waves travel faster — "real ocean math, not
   arbitrary noise"; Tessendorf, *Simulating Ocean Water*, SIGGRAPH 2001). Amplitudes
   follow a Phillips-spectrum falloff so the field is energy-realistic.
2. **The flow field (divergence-free curl — Bridson).** The velocity is the perpendicular
   gradient of the potential, `v = ∇⊥ψ = (∂ψ/∂y, −∂ψ/∂x)`, divergence-free BY CONSTRUCTION
   (Bridson, Houser, Nordenstam, *Curl-Noise for Procedural Fluid Flow*, SIGGRAPH 2007), so
   the dots swirl + braid without piling up. The gradient is ANALYTIC (each sinusoid's
   partial is a cosine — no finite difference). A `curlStrength`-weighted fbm curl-noise
   term (the shared `curlFBM` operator, BB.B1) adds the fine braiding.
3. **The particle advection (the compute pass).** Each particle integrates `p ← p + v·dt`
   (forward Euler), wrapping / re-seeding at the domain edge so coverage stays steady.
   Per-particle size + alpha modulate with `|v|` (denser-where-calm) — `size = base·(1 −
   clamp(|v|/v_max)·sizeVel)` — drawn as instanced billboard quads (the SOTA recommends
   instanced quads over a GL point-list for the per-particle size control point-size cannot
   give).

## Substrate (BB.W-VIZ-SUITE / W-FLOWFIELD — born WebGPU-first)

DotFlowField is BORN on the WebGPU-first dual-substrate. It renders through ONE of two
backends, picked ONCE at mount by `useDotFlowField` (`navigator.gpu` feature-detect):

- **`shaders/flow-field.compute.wgsl.ts` + `flow-field.render.wgsl.ts` — the WebGPU-FIRST
  primary** (net-new). The compute pass (`@compute @workgroup_size(64)`) advects the
  particle storage buffer through the analytic ∇⊥ψ velocity (transcribing `flowField.ts`);
  the render pass draws instanced billboard quads, tinting the soft dots through the shared
  `procedural-color.wgsl.ts` OKLCh ramp (ONE color source). This is the FIRST suite viz
  whose WebGPU path is materially better than its fallback (the compute-particle path gives
  per-particle size/density the reference needs).
- **`shaders/flow-field.glsl.ts` — the Canvas2D fallback** (the ~5-10% tail). Per the §3a
  Triumvirate, the WebGL2 transform-feedback equivalent is materially more code for the
  SAME visual; the parity-honest path is a CPU-stepped Canvas2D point cloud (the
  fourier-field / constellation precedent over the SAME lifecycle leaf). It steps the SAME
  `flowField.ts` `sampleVelocity()` evaluator (the ONE math source — no second advection
  law); only the GPU instancing is traded for `ctx.arc` dots. Parity status: **`degraded`**
  (the same flow, a coarser per-particle density at the CPU step count) — recorded honestly
  in `docs/tranches/BB/audit/gpu-parity-table.md`, never a silent mismatch.

Both backends compose the SAME `createCanvasLifecycle` leaf (the offscreen-pause +
live-PRM-freeze + demand-loop discipline is byte-identical), so the lifecycle wiring
(`DockBackgroundToggle` pause/resume, pointer `wake`) is substrate-agnostic. Machine-locked
by `proof:flow-field` (the WebGPU-first-with-fallback + the `curlFBM`/pointer-velocity
consume + the colocation/publication + the reference-aesthetic π readback + the JS↔WGSL
round-trip + a self-test bite) + `proof:gpu-substrate-single` clause F (the flow-field row
resolves on disk). The binding live-π / own-surface DELTA capture rides W-REFLECT3.

## API

### `<DotFlowField>` props

| prop | type | default | note |
|---|---|---|---|
| `config` | `FlowFieldConfig` | `DEFAULT_FLOW_CONFIG` | the full author schema |
| `paused` | `boolean` | `false` | `v-model:paused` — the WCAG-2.2.2 pause seam |

### `FlowFieldConfig`

`particleCount`, `waveComponents`, `windDirection`, `windSpeed`, `curlStrength`,
`dotSize`, `dotSizeVelocity`, `palette`, `background`, `interactive`,
`respectReducedMotion`. Published on `@mkbabb/glass-ui/api`.

### `useDotFlowField(canvasRef, options)`

The public composable — composes the `createGpuSubstrate` picker (WebGPU primary) OR
`useCanvas2D` (Canvas2D fallback), wires offscreen-pause, and returns the uniform
`DotFlowFieldHandle` (`pause` / `resume` / `wake` / `renderAt` / `reducedMotion` /
`dispose`).
