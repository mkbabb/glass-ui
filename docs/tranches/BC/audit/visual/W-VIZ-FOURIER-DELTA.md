# W-VIZ-FOURIER — the fourier-field collapse + WGSL migration DELTA

**Wave:** BC.W-VIZ-FOURIER · **Status:** SOURCE GREEN (`proof:fourier-field` U1-U5 born-RED→GREEN); the binding live Metal-GPU paint rides the orchestrator capture.

## Before → After (the headline)

| | HEAD (before) | BC.W-VIZ-FOURIER (after) |
|---|---|---|
| views | THREE (ambient page `fourier-field.vue` + the re-embedded ambient companion in `fourier-studio.vue:392-413` + the separate Canvas2D `FourierStudioStage.vue`) | ONE (`demo/stories/substrates/fourier-field.vue` — the field IS both the ambient register and the interactive teaching surface) |
| renderer | Canvas2D (`useCanvas2D`; `ctx.stroke` + `shadowBlur` + the `lighter` additive blend the path fought) | WGSL-primary GPU substrate (`createGpuSubstrate`: compute writes the partial-sum curve + chain tips, fullscreen-fragment SDF composites; premultiplied-alpha kills the `lighter` blowout) — **no Canvas2D anywhere** |
| variant | `variant: "hero"\|"final"` prop enum | RETIRED — folded into config presets (`Ambient ellipse`/`Dense reconstruction`/`Brand mark ℱ`/`Summing harmonics`) |
| color | a demo-local Teal `oklch(0.68 0.12 195)` preset | RETIRED — warm-cream library identity default (`--viz-fourier` warm-amber) + the cool/violet `--viz-*` reads (presets-in-consumers) |
| interaction | none on the ambient field | pointer SCRUBS `head_t` (left rewinds / right fast-forwards), a flick injects clock momentum (`usePointerVelocityField` — the shared field, FED `tick()` from the substrate frame, no second rAF) |

## The eye should see (the gestalt criterion — orchestrator live capture)

Route `/substrates/fourier-field`, canvas selector `[data-testid="fourier-field-canvas"] canvas` (the `.fourier-field-canvas` inside the `<FourierField>` mount), BOTH modes:

1. **ONE clean Fourier view** — a chain of rotating circles stacked tip-to-tail drawing an assembling curve, a glowing comet head leading a fading trail. NOT three duplicate views, NOT a Canvas2D blur.
2. **WARM-CREAM identity** — the curve + chain read warm amber/cream (hue ~30-70) at the default `Ambient ellipse` preset, NOT teal/navy/blue. (The cool Chebyshev / violet Legendre options are explicit `--viz-*` library tokens, not a demo-local teal.)
3. **Assembling sum** — dragging the harmonics (N) slider from 1 (a single ellipse) to max visibly sums the curve term by term.
4. **Epicycle chain** — toggling `Show chain` draws the orbit rings + arms + joint dots (the rainbow warm-hue sweep); toggling it off leaves the bare curve.
5. **Shape trace** — `Brand mark ℱ` / heart / star render as their own forward-DFT reconstructions.
6. **Scrub** — dragging the cursor across the field rewinds/forwards the reconstruction; the chain assembles/disassembles under the finger.
7. **Backend** — the resolved backend is `webgpu` on the Metal GPU (the `DotFlowFieldHandle.backend` precedent; the WebGL2 SDF twin is the genuinely-absent-tail fallback).

## Parity (device-free structural proxy)

`proof:fourier-field` U3 round-trips the WGSL `partialSumAt` transcription against `math.ts:78-95` — the compute kernel sums the SAME phasor table the JS mints (`makeEllipticSpectrum`/`dftFromPoints` run ONCE in JS; no WGSL-side spectrum mint). Both backends composite ONE analytic SDF field over the SAME CPU-minted curve/chain tables through ONE shared color seam (`procedural-color.{wgsl,glsl}.ts`) → ΔE mean/p99 = 0.0. The binding Metal-GPU live capture-pair (the real WebGPU swap-chain readback vs the WebGL2 `readPixels`) rides this wave's close / W-REFLECT3 and re-records the empirical rasterizer-drift ΔE.

## Gate

`proof:fourier-field` (born-RED on the pre-migration HEAD → GREEN): U1 ONE view (the stage + studio RETIRED, ONE manifest row, no ambient-companion re-embed); U2 WGSL primary (no `useCanvas2D`/`getContext("2d")`, composes `createGpuSubstrate` with `setupWGPU`+`setupGL`); U3 the ONE math source round-trips (the WGSL transcribes `partialSumAt`/`positionsAt`, the spectrum CPU-minted); U4 no `variant` enum; U5 no teal demo default + warm-cream identity. + a self-test bite per clause.
