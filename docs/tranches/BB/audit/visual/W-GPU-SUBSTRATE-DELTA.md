<!-- surface-paths: src/composables/glass/webgpu/useWebGPUCanvas.ts,src/composables/glass/webgpu/useGpuSubstrate.ts,src/composables/glass/webgpu/index.ts,scripts/proof-gpu-substrate-single.mjs,docs/tranches/BB/audit/gpu-parity-table.md -->
<!-- surface-hash: pending — computed at the W-VIZ-SUITE-DELTA finalize (W-CONCENTRIC close); the substrate sub-wave paints NO own surface (its visual truth rides the per-viz migration/new-viz captures) -->

# W-GPU-SUBSTRATE — DELTA (BB.W-VIZ-SUITE.a)

## What this sub-wave is

The FOUNDATION sub-wave: the THIRD thin backend (`useWebGPUCanvas`) over the ONE
lifecycle leaf (`createCanvasLifecycle`), the transparent feature-detect picker
(`useGpuSubstrate`), the consumer-#2 usability test, and the born-RED parity gate
(`proof:gpu-substrate-single`). It paints NO own surface — a substrate is a lifecycle
machine; its visual truth rides the per-viz sub-waves (aurora/goo-blob migrations + the
two new viz), whose own-surface light+dark PNGs + parity capture-pairs are finalized at
`W-VIZ-SUITE-DELTA.md` (W-CONCENTRIC close). This DELTA records the SUBSTRATE evidence:
the gate born-RED→GREEN, the leaf-seam-unchanged proof, and the device-acquisition shape.

## The leaf seam was NOT widened (the scope-1 expected outcome)

The named risk: the leaf's `arm()`/`buildContext()` is SYNCHRONOUS; the WebGPU device
request is a Promise. The clean resolution — the wrapper owns the async prelude
(`armAsync()`): it acquires `navigator.gpu.requestAdapter()` → `adapter.requestDevice()`
ONCE, stores the resolved device, THEN calls the leaf's synchronous `arm()`. The leaf's
`buildContext()` runs SYNCHRONOUSLY off the already-resolved device (closed over). This
mirrors how `useCanvas2D` owns its `toValue`/deferred-arm prelude without a leaf change.

**Proof**: `git diff --stat src/composables/glass/webgl/createCanvasLifecycle.ts` is
EMPTY — the leaf is byte-untouched. No Triumvirate fired; the wrapper-owned async prelude
served the WebGPU backend with the existing `buildContext`/`resize`/`bindContextEvents`
seam exactly. The same is true of `useWebGLCanvas.ts` + `useCanvas2D.ts` (the existing
two backends, read for the seam shape, never edited — empty diff stat).

## The device-loss self-heal (the WebGPU twin of webglcontextlost/restored)

WebGPU has no DOM event pair; `device.lost` is a Promise resolving with `{ reason, message }`.
The self-heal distinguishes:
- `reason: "destroyed"` → intentional dispose, do NOT re-acquire.
- anything else (a driver TDR timeout) → mark the surface blank (the leaf parks the rAF
  via `markContextLost`), re-acquire a fresh adapter+device, then call the leaf's
  `rebuild` (re-runs `buildContext` on the fresh context + re-arms).

A `pushErrorScope("validation")`/`popErrorScope()` bracket + an `uncapturederror`
listener around the consumer `setup` surface validation errors deterministically (the
`onInitError` contract preserved — not silent garbage).

## The gate born-RED → GREEN

`proof:gpu-substrate-single` is a SUPERSET of `proof:webgl-substrate-single`: every
WebGL2/Canvas2D clause stays GREEN (the existing gate's exported `detectCanvas2DSingleSource`
detector is IMPORTED + re-run — no second copy, no edit to the existing gate); the WebGPU
clauses A-G are born-RED until the substrate + parity table land.

| state | exit | failing clause |
|---|---|---|
| bare tree (no substrate, no parity table) | 1 (RED) | A (no WebGPU bootstrap), F (no parity table), G (no consumer-#2) |
| substrate present, parity table absent | 1 (RED) | F (parity table absent) |
| substrate + parity table present (close) | 0 (GREEN) | — all A-G pass; both self-test bites fire |

**Self-test bites (proven every run):**
1. The WebGPU single-source detector flags a composition-PLUS-fork synthetic (imports the
   leaf AND re-inlines a `new Set<>` + rAF `tick` loop → forkedMachinery true).
2. A parity row with `verified` pointing at a nonexistent `.wgsl` REDs (the anti-evasion
   floor — a verified-row-missing-file lie is forbidden, mirroring `proof:ba-gestalt`).

The calibrated OKLab ΔE bar (the gate fact): **mean ΔE ≤ 2.0, p99 ≤ 5.0** — recorded in
the parity table's `deltaThreshold`; calibrated against the aurora migration at
W-AURORA-WGPU.

## The consumer-#2 usability assert

`tests/composables/glass/webgpu/useWebGPUCanvas.test.ts` (5 tests, all green): the degrade
path (no `navigator.gpu` → the picker deterministically selects the WebGL2 backend, the
uniform handle drives a non-aurora consumer generically), the uniform-handle-shape assert,
the WebGPU-select path (a stub `navigator.gpu` → the async prelude acquires + configures +
runs setup), `armAsync` idempotency, and the device-unavailable `onInitError` surface.

## Fence verification

- `git diff --stat` on `aurora.frag.ts` + `metaball.frag.ts` — EMPTY (the GL-shader fence; the `.wgsl` are net-new, the `.frag.ts` are the WebGL2 fallbacks — neither touched this sub-wave; the `.wgsl` land at the migration sub-waves).
- `git diff --stat` on `createCanvasLifecycle.ts` / `useWebGLCanvas.ts` / `useCanvas2D.ts` — EMPTY (the leaf + the two existing backends untouched).
- No `navigator.gpu` outside `useWebGPUCanvas.ts` (clause A); no `getContext("webgpu")` baked viz choice (clause D); the WebGL2 fallback PRESERVED (clause B).
- `npm run typecheck` exit 0 (both `tsconfig.json` + `tsconfig.test.json` arms).
- No new dependency: TypeScript's bundled `lib.dom.d.ts` ships the full WebGPU type set (`Navigator.gpu`, `GPU.requestAdapter`, `GPUDevice`, `GPUCanvasContext`, `device.lost`, `onuncapturederror`, `pushErrorScope`), so `@webgpu/types` is NOT needed.
