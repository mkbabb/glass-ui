# DotFlowField

A calm regular lattice of small soft warm-cream dots that a single LARGE wave sweeps
slowly through — an **anchored dot-matrix** (NOT a free particle cloud) where each dot only
breathes a hair off its anchor while a broad bright iso-band crosses the field like a tide,
lighting the dots it passes. The "Claude co-work" dot-matrix aesthetic: subtle fine-dot
spheres on near-dark that big calm shapes drift through (a demo preset); the library default
is warm-cream identity. The grid is the stable canvas; the field is the slow brush.

`@mkbabb/glass-ui/dot-flow-field` · subpath leaf · WebGPU-first (RETOPOLOGIZED at
BC.W-VIZ-DOTFLOW off the BB free-advection cloud).

## Quick start

```ts
import { DotFlowField, DEFAULT_FLOW_CONFIG } from "@mkbabb/glass-ui/dot-flow-field";
```

```vue
<DotFlowField :config="myConfig" v-model:paused="paused" />
```

The DEFAULT palette is the warm-cream library identity. The mono-dim-on-near-black reference
+ the globe mask are DEMO presets (presets-in-consumers — see
`demo/stories/substrates/presets.ts`); they NEVER enter a library token. The teal-on-navy
"reference" was a FABRICATED prior reference and is GONE entirely (clean break, no alias).

## The retopology (BC.W-VIZ-DOTFLOW)

The BB field was a free-advecting particle cloud — the textbook "mess of noise". This wave
inverts BOTH the topology AND the coherence regime, keeping the cited Bridson/Tessendorf/
Gerstner math:

1. **Anchored dot-matrix + restoring spring (the topology fix).** Each dot stores its
   ORIGIN `o` (a deterministic lattice cell center via `gridOrigin`) and its live position
   `p`. Per frame it eases toward `o + sampleDisplacement(o,t)·displaceAmp` with a
   framerate-independent critically-damped pull `p ← mix(p, target, 1 - exp(-springK·dt))`.
   NO wrap, NO re-seed — the lattice is permanent.
2. **The sweeping band (the gestalt).** Each dot's brightness + radius read a scalar field
   sampled AT THE ANCHOR — the low-frequency Gerstner height `sampleHeight(o,t)`: a
   `smoothstep` band (`waveBand`) centered `waveBandCenter` width `waveBandWidth` is the
   moving bright stripe that sweeps the lattice. `|disp|` modulates a subtle size pulse.
3. **The coherent regime (the noise→sweeping fix).** `buildWaveLadder` is re-authored to the
   LOW-frequency band: 3 octaves (was 6), λ₀ at 2.5× the view extent (one dominant wave),
   amplitude persistence ×0.38, the λ falloff floored so the finest λ ≥ ⅓ view. The defaults
   drop `windSpeed` 1.0→0.3 (slow sweep) and `curlStrength` 0.6→0.12 (a faint organic break
   at a coarse ×0.55 domain scale). ONE or TWO low-frequency waves slowly translate across
   the view.

## The cited-SOTA math

The single math source is `composables/flowField.ts` (pure + testable; the WGSL compute
kernel + the WebGL2 fragment shader transcribe it line-for-line). New pure exports the
retopology owns:

- **`gridOrigin(index, cols, pitch)`** — the deterministic lattice (the WGSL/GLSL
  `instance_index → origin` mapping matches JS exactly).
- **`sampleHeight(o, t, waves, windSpeed)`** — the scalar Gerstner height (the brightness
  driver), normalized to ≈[-1,1] by the total amplitude.
- **`sampleDisplacement(o, t, waves, windSpeed, curlStrength)`** — the divergence-free ∇⊥h +
  a faint coarse curl break, tanh soft-clamped so the magnitude rides into [0,1) (the
  sub-cell cap is never blown).
- **`waveBand(h, center, width)`** — the sweeping bright-stripe `smoothstep` band.

The Tessendorf/Gerstner sum-of-sines (`h(p,t) = Σ_i A_i·sin(k_i·(D_i·p) − ω_i·t + φ_i)`,
`ω_i = √(g·k_i)` the deep-water dispersion) + the Bridson divergence-free curl (`v = ∇⊥ψ`)
are the cited SOTA; `proof:viz-dotflow` clause F3 round-trips JS↔WGSL↔GLSL at a fixed sample
set.

## Substrate (born WebGPU-first; "no canvas anywhere")

DotFlowField renders through ONE of two GPU backends, picked ONCE at mount by
`useDotFlowField` via `createGpuSubstrate` (the WebGPU-first dual-substrate picker over the
ONE `createCanvasLifecycle` leaf):

- **`shaders/flow-field.compute.wgsl.ts` + `flow-field.render.wgsl.ts` — the WebGPU-FIRST
  primary.** The compute pass (`@compute @workgroup_size(64)`) pulls the anchored lattice to
  its sub-cell displacement target with the restoring spring; the render pass draws instanced
  billboard quads lit by the sweeping band, tinting the soft dots through the shared
  `procedural-color.wgsl.ts` OKLCh ramp (ONE color source).
- **`shaders/flow-field.glsl.ts` — the WebGL2 FRAGMENT fallback** (the genuinely-absent
  ~5-10% tail). The Canvas2D point-cloud is GONE — the retopology made the dot-lattice +
  brightness model fragment-friendly, so the fallback is a pure WebGL2 fullscreen-fragment
  pass evaluating the SAME `flowField.ts` field (splicing the GLSL color twin). Parity flips
  **`degraded → verified`** — the same field, no compute particles.

Both backends compose the SAME `createCanvasLifecycle` leaf (offscreen-pause + live-PRM-
freeze + the demand loop), so the lifecycle wiring (`DockBackgroundToggle` pause/resume,
pointer `wake`) is substrate-agnostic.

## Interaction (BC.W-VIZ-INTERACTION)

When `config.interactive`, the lattice ripples toward the cursor: `useDotFlowField` composes
the SHARED `usePointerVelocityField` (NEVER a second rAF — fed `.tick(delta)` from inside the
renderer's frame callback) and reads BOTH the steady-drag VELOCITY (a local displacement
ripple through the lattice) AND the flick BURST (the accel axis — a brief brightness bloom).
PRM freezes the field (`tick(0)`).

Machine-locked by `proof:viz-dotflow` (F1 anchored topology + no reseed · F2 coherent regime
· F3 JS↔WGSL↔GLSL round-trip · F4 no Canvas2D viz · F5 warm-cream identity + no teal/navy ·
F6 pointer wired) + the binding π readback (`tests-visual/flow-field.spec.ts` — the coherent
sweeping lattice, lattice stability, the sweeping band, PRM freeze, on-host paint, both
modes) + `proof:viz-interaction` (the pointer-field wiring) + `proof:webgpu-everywhere`
(WGSL-primary, no Canvas2D) + the `proof:ba-gestalt` viz verdict.

## API

### `<DotFlowField>` props

| prop | type | default | note |
|---|---|---|---|
| `config` | `FlowFieldConfig` | `DEFAULT_FLOW_CONFIG` | the full author schema |
| `paused` | `boolean` | `false` | `v-model:paused` — the WCAG-2.2.2 pause seam |

### `FlowFieldConfig`

`waveComponents`, `windSpeed`, `curlStrength`, `gridPitch`, `dotSize`, `displaceAmp`,
`springK`, `waveBandCenter`, `waveBandWidth`, `contrast`, `coherence`, `globeMask`,
`palette`, `background`, `interactive`, `respectReducedMotion`. (MIGRATION: `particleCount →
gridPitch` — the lattice density is now DETERMINISTIC off the pitch; `windDirection` /
`dotSizeVelocity` dropped — free-advection-only. Clean break, no alias.) Published on
`@mkbabb/glass-ui/api`.

### `useDotFlowField(canvasRef, options)`

The public composable — composes the `createGpuSubstrate` picker (WebGPU primary OR WebGL2
fragment fallback), wires the shared pointer field + offscreen-pause, and returns the uniform
`DotFlowFieldHandle` (`pause` / `resume` / `wake` / `renderAt` / `reducedMotion` / `dispose`).
