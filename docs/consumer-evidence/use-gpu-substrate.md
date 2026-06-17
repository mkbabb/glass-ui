# useGpuSubstrate / useWebGPUCanvas — the WebGPU backend (the third lifecycle wrapper)

## Artefact paths

- `src/composables/glass/webgpu/useWebGPUCanvas.ts` — `createWebGPUCanvas`, the WebGPU backend over the shared `createCanvasLifecycle` leaf.
- `src/composables/glass/webgpu/useGpuSubstrate.ts` — `createGpuSubstrate`, the transparent feature-detect picker (WebGPU primary / WebGL2 fallback).
- `src/composables/glass/webgpu/index.ts` — the INTERNAL subtree barrel (NOT on the public `src/composables/glass/index.ts` barrel — the WebGL2 substrate is likewise internal; a viz composes the picker via a direct relative import).

## Disposition: foundation-substrate shipped WITH the gate born-RED to the per-viz consumers

The WebGPU backend is a FOUNDATION sub-wave (`BB.W-VIZ-SUITE.a` W-GPU-SUBSTRATE) — the THIRD thin wrapper over `createCanvasLifecycle`, beside `useWebGLCanvas` (AU.W6) and `useCanvas2D` (AW.W17 / BB.W-CANVAS-UNIFY). It re-implements ZERO scheduling: the three-reason suspend Set, the rAF tick/wake demand gate, the document-visibility owner, the content-visibility offscreen-park, and the live `prefers-reduced-motion` re-monitor all live ONCE in the leaf; the wrapper threads only the WebGPU-specific concerns (the async device-acquisition prelude, the DPR-aware resize, the `device.lost` self-heal) through the existing `buildContext`/`resize`/`bindContextEvents` seam — NO leaf public-seam change (the scope-1 expected outcome confirmed).

The ≥2-binary-consumer bar (J invariant 10) is the **booked per-viz migrations + the new viz**, all later SERIAL sub-waves of the SAME wave (W-VIZ-SUITE) — the substrate ships WITH `proof:gpu-substrate-single` born-RED on the parity-table clause (clause F) until the migrations fill it. This is the same EARLY-publish path `usePointerVelocityField` (BB.W-VIZ-POINTER) takes: a foundation primitive minted before its binary consumers, with the booked consumers named here + the gate enforcing the contract.

## Current consumers

**Binary consumer #1 (the consumer-#2 usability test — the substrate-agnostic composition)**: `tests/composables/glass/webgpu/useWebGPUCanvas.test.ts` — a NON-aurora composition that drives the substrate generically (the degrade-to-WebGL2 path + the WebGPU-select path with the async prelude). This is the C6-must-fix-#4 consumer-#2 assert (`proof:gpu-substrate-single` clause G), proving the substrate bakes no viz choices.
**Proof**: `rg -n 'createGpuSubstrate|createWebGPUCanvas' tests/composables/glass/webgpu/useWebGPUCanvas.test.ts`

## Booked binary consumers (the ≥2-bar — the per-viz migrations + the new viz)

The substrate PROMOTES to ≥2 binary consumers as the serial sub-waves land (each is a real library `*.vue` mount composing the picker, NOT a demo story):

1. **`BB.W-VIZ-SUITE.b` W-AURORA-WGPU** — `src/components/custom/aurora/Aurora.vue` composes `useGpuSubstrate` (over the direct `createWebGLCanvas`), with a `setupWGPU` (the `aurora.wgsl` primary) + a `setupGL` (the byte-untouched `aurora.frag.ts` fallback). Binary consumer #1 of the substrate proper.
2. **`BB.W-VIZ-SUITE.c` W-GOOBLOB-WGPU** — `src/components/custom/goo-blob/GooBlob.vue` composes `useGpuSubstrate` with `metaball.wgsl` primary + `metaball.frag.ts` fallback. Binary consumer #2 — the ≥2-bar MET by the migrations alone.
3. **`BB.W-VIZ-SUITE.d` W-FLOWFIELD** — `<DotFlowField>` born WebGPU-first (compute + instanced render), the WebGL2 transform-feedback / Canvas2D fallback.
4. **`BB.W-VIZ-SUITE.e` W-CONCENTRIC** — `<Concentric>` born WebGPU-first (fullscreen fragment), the GLSL fallback.

## Re-audit proof

This document satisfies the no-overfitting bar for the WebGPU substrate WHILE the booked migrations are pending (the EARLY-publish path) AND once they land (the ≥2-binary bar MET). After W-GOOBLOB-WGPU, `rg -n 'useGpuSubstrate|createGpuSubstrate' src/components/custom/{aurora,goo-blob}/*.vue` must find BOTH binary consumers; until then `proof:gpu-substrate-single` clause F holds the parity-table rows `pending`, and the consumer-#2 test (clause G) is the live composition consumer. A WebGPU backend that ships with NO booked consumer named here + NO consumer-#2 test is the substrate-without-consumer trap (L invariant 8).
