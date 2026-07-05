# DotFlowField

**The streamline field** (BG.W-DOTFLOW-REBUILD). Discrete warm-cream dots strung along
**evenly-spaced smooth STREAMLINES** of a curl-warped stream function — undulating +
interweaving like the level curves of a procedural function, the dots drifting slowly **ALONG
their own line**, over a deep warm-near-black floor. The cursor **bends the streamlines** (a
smooth gaussian domain-push — no snap, no vortex chaos). The reference is IMG_1836.

`@mkbabb/glass-ui/dot-flow-field` · subpath leaf · WebGPU-first with a byte-identical WebGL2
fragment fallback.

## Quick start

```ts
import { DotFlowField, DEFAULT_FLOW_CONFIG } from "@mkbabb/glass-ui/dot-flow-field";
```

```vue
<DotFlowField :config="myConfig" v-model:paused="paused" />
```

The DEFAULT palette + floor are the warm-cream library identity. The IMG_1836 teal-on-navy
skin ships ONLY as a DEMO preset (`FLOW_PRESET_OCEAN` in `demo/stories/substrates/presets.ts`,
presets-in-consumers — it NEVER enters a library token).

## The math (cited, first-principles)

The streamlines of a divergence-free 2D flow `v = ∇⊥ψ` ARE the iso-contours (level curves) of
the stream function ψ (**Bridson, Houser, Nordenstam, *Curl-Noise for Procedural Fluid Flow*,
SIGGRAPH 2007**). So **evenly-spaced streamlines** (**Jobard & Lefer, *Creating Evenly-Spaced
Streamlines of Arbitrary Density*, 1997**) = evenly-spaced iso-contours of ψ at a constant
level step Δ — separated by construction, arc-length-beaded by a transverse phase.

`ψ(p,t)` is a monotone **ramp** (`flowSlope·wy` — the even-spacing + NON-crossing guarantee:
the ramp gradient dominates every undulation, so `∂ψ/∂y > 0` everywhere → the level curves
never fold or cross) plus two traveling undulations, sampled at a coordinate **domain-warped by
the shared `curlFBM` operator** (the Bridson curl-noise warp — the streamlines flow +
interweave over the curlFBM field) + a **gaussian cursor push** (the streamline bend). The
ONE math source is `composables/flowField.ts sampleStreamField` (pure, node-testable); the WGSL
fragment (`shaders/flow-field.wgsl.ts`) + the GLSL fragment (`shaders/flow-field.glsl.ts`)
transcribe it byte-for-byte, splicing the shared `procedural-color` OKLCh chunk (ONE color
source). `proof:viz-dotflow` clause S3 round-trips JS↔WGSL↔GLSL.

## The render (iso-contour beading)

Per fragment: `dContour` is the world distance to the nearest even-Δ iso-contour of ψ (the
streamline); `dBead` is the distance to the nearest **drifting transverse bead-line**
(`p.x·beadSlope − t·beadDrift`, so the beads march ALONG the flow as time advances); the **dot**
sits at the streamline∩bead crossing (`sqrt(dContour² + dBead²) < beadRadius`) and a faint
connecting **thread** traces the streamline. The output is opaque over the warm floor — bounded
`[0,1]`, so **no white-out is possible** (the whole additive-trail-flood architecture is gone).

## Substrate (born WebGPU-first; ONE fullscreen fragment)

DotFlowField renders through ONE fullscreen-fragment pass (the aurora.wgsl shape — the pipeline
that paints identically on WebKit-WebGPU + Chrome/Metal), picked by `useDotFlowField` via
`createGpuSubstrate` over the ONE `createCanvasLifecycle` leaf:

- **`shaders/flow-field.wgsl.ts` — the WebGPU-FIRST primary.** A single render pipeline over the
  full-screen triangle + one uniform buffer (the `uniformBridgeWGPU` typed-struct
  source-of-truth). NO compute pass, NO storage particles, NO trail ping-pong.
- **`shaders/flow-field.glsl.ts` — the WebGL2 fragment fallback.** The SAME streamline gestalt
  as one opaque fullscreen draw (the ~5-10% tail). NO state-texture GPGPU, NO trail FBO, NO
  point-sprites.

Both compose the SAME `createCanvasLifecycle` leaf (offscreen-pause + live-PRM one-static-frame
freeze + the demand loop), so the lifecycle wiring (`DockBackgroundToggle` pause/resume, pointer
`wake`) is substrate-agnostic.

## Interaction

When `config.interactive`, the cursor bends the streamlines: `useDotFlowField` composes the
SHARED `usePointerVelocityField` (NEVER a second rAF — fed `.tick(delta)` from inside the
renderer's frame callback) and reads BOTH the steady-drag VELOCITY and the flick BURST (the
accel axis) into the velocity-scaled bend strength. PRM freezes the field (`tick(0)`) and the
substrate paints ONE deterministic static frame then parks.

Machine-locked by `proof:viz-dotflow` (S1 mote/trail/compute retired · S2 streamline present ·
S3 JS↔WGSL↔GLSL round-trip + iso-contour beaded render · S4 fullscreen-fragment, no compute ·
S5 warm-cream identity + no teal/navy · S6 pointer bends the streamlines) + `proof:flow-field`
(colocation + composes-substrate + single-math-source + fallback + warm-identity + story) + the
binding dual-engine π (`tests-visual/flow-field.spec.ts` + the paint judge's re-judge — the
traceable evenly-spaced beaded streamlines, both engines both modes) + the `proof:ba-gestalt`
viz verdict.

## API

### `<DotFlowField>` props

| prop | type | default | note |
|---|---|---|---|
| `config` | `FlowFieldConfig` | `DEFAULT_FLOW_CONFIG` | the full author schema |
| `paused` | `boolean` | `false` | `v-model:paused` — the WCAG-2.2.2 pause seam |

### `FlowFieldConfig`

`lineCount`, `undulation`, `interweave`, `curlWarp`, `flowSpeed`, `lineWidth`, `lineStrength`,
`beadDensity`, `beadDrift`, `dotSize`, `contrast`, `palette`, `floor`, `pointerStrength`,
`pointerRadius`, `interactive`, `respectReducedMotion`. Published on `@mkbabb/glass-ui/api`.

**MIGRATION (clean break, no alias — the mote/trail schema retired):** `mode` /
`particleCount` / `trailHalfLife` / `trailScale` / `turnRate` / `speedScale` / `speedGlow` /
`lifetimeSec` / `edgeBias` / `contentMask` / `vortex*` / `dragGain` / `burstShove` /
`shadowOffset` / `stretchAmp` / `waveComponents` / `windSpeed` / `curlStrength` / `gridPitch` /
`displaceAmp` / `springK` / `waveBand*` / `coherence` / `globeMask` / `background` are GONE;
the config is the streamline register (`lineCount`/`undulation`/`beadDensity`/… + `floor`).

### `useDotFlowField(canvasRef, options)`

The public composable — composes the `createGpuSubstrate` picker (WebGPU primary OR WebGL2
fragment fallback), wires the shared pointer field + offscreen-pause, and returns the uniform
`DotFlowFieldHandle` (`backend`/`pause`/`resume`/`wake`/`renderAt`/`reducedMotion`/`dispose`).
