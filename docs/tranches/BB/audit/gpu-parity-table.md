# GPU substrate parity table (BB.W-VIZ-SUITE)

The machine-read source of truth for `proof:gpu-substrate-single` clause F. Every
canvas-bearing member of the procedural-animation suite carries a row: a migrated viz
declares its `.wgsl` primary + its `.frag`/`.glsl` WebGL2 fallback + a `parity` status
(+ the on-disk capture-pair + the recorded OKLab ΔE once `verified`); a non-migrating
viz carries a `no-migrate` row with a non-empty reason (so the family table cannot
silently omit an extant member — the user's "cover the extant items too").

## The calibrated OKLab ΔE bar (the gate fact)

The parity threshold is **mean ΔE ≤ 2.0, p99 ΔE ≤ 5.0** — perceptual-just-noticeable is
≈ 2.3, and SwiftShader-vs-GPU rasterizer drift sits well below; the bar accommodates
sub-pixel rasterizer drift (visually-equivalent, NOT bit-identical) while a uniform-
alignment garbage-read / an OETF transcription error blows past it. The value is
calibrated against the aurora migration (the first, cleanest port) at W-AURORA-WGPU and
re-recorded there if the empirical capture demands a re-tune.

## Status legend

- `verified` — the `.wgsl` primary + the fallback both render within the ΔE bar (a paired pixel-parity capture artefact on disk + a recorded ΔE).
- `pending` — the migration is booked but the `.wgsl` primary has not landed yet (the substrate ships first; the migration fills the row at its sub-wave).
- `webgl2-only` / `degraded` — the WebGL2 fallback is materially divergent from the WebGPU path (a no-compute limit); recorded honestly, never a silent mismatch.
- `no-migrate` — the viz is recorded as a first-class family member with a reason it does NOT migrate now (+ a booked successor trigger).

## The machine-read block

```json
{
  "deltaThreshold": { "mean": 2.0, "p99": 5.0 },
  "viz": [
    {
      "viz": "aurora",
      "subpath": "/aurora",
      "status": "pending",
      "primary": null,
      "fallback": "src/components/custom/aurora/constants/shaders/aurora.frag.ts",
      "rank": 1,
      "subWave": "BB.W-VIZ-SUITE.b W-AURORA-WGPU",
      "note": "the cleanest port (405L, 0 textures / 0 derivatives, pure fbm/OKLCh fullscreen); the WGSL primary lands at W-AURORA-WGPU + calibrates the ΔE bar. The .frag stays the byte-untouched WebGL2 fallback."
    },
    {
      "viz": "goo-blob",
      "subpath": "/goo-blob",
      "status": "pending",
      "primary": null,
      "fallback": "src/components/custom/goo-blob/shaders/metaball.frag.ts",
      "rank": 2,
      "subWave": "BB.W-VIZ-SUITE.c W-GOOBLOB-WGPU",
      "note": "clean SDF smin port (417L); the two live fwidth() sites (line 266 AA-edge + line 364 Toksvig spec-clamp) transcribe to WGSL fragment-stage fwidth() — the ΔE drift suspects. The .frag stays byte-untouched."
    },
    {
      "viz": "dot-flow-field",
      "subpath": "/dot-flow-field",
      "status": "pending",
      "primary": null,
      "fallback": null,
      "rank": 3,
      "subWave": "BB.W-VIZ-SUITE.d W-FLOWFIELD",
      "note": "BORN WebGPU-first — the compute-particle path (curl-noise advection over a Gerstner/Tessendorf wave potential). WebGL2 transform-feedback / Canvas2D fallback declared at its sub-wave."
    },
    {
      "viz": "concentric",
      "subpath": "/concentric",
      "status": "pending",
      "primary": null,
      "fallback": null,
      "rank": 4,
      "subWave": "BB.W-VIZ-SUITE.e W-CONCENTRIC",
      "note": "BORN WebGPU-first — a fullscreen radial-Fourier ring-interference fragment field (the aurora shape-class). GLSL fallback declared at its sub-wave."
    },
    {
      "viz": "fourier-field",
      "subpath": "/fourier-field",
      "status": "no-migrate",
      "primary": null,
      "fallback": "src/components/custom/fourier-field/composables/useFourierField.ts",
      "reason": "Canvas2D (useCanvas2D; math.ts DFT epicycle math). A few-to-dozens of phasors is the RIGHT tool for ctx.stroke; the DFT math is already GPU-agnostic. Booked W-FOURIER-GPU — trigger: harmonic density scales to thousands of phasors → GPU line-instancing wins."
    },
    {
      "viz": "constellation",
      "subpath": "/constellation",
      "status": "no-migrate",
      "primary": null,
      "fallback": "src/components/custom/constellation/composables/useConstellation.ts",
      "reason": "Canvas2D (useCanvas2D; node/edge proximity-graph lattice). Canvas2D handles the current node count fine; proof:constellation-substrate-single is substrate-agnostic. Booked W-CONSTELLATION-GPU — trigger: a much denser lattice → the dot-flow-field advection compute pass generalizes to constellation's nodes."
    },
    {
      "viz": "watercolor-dot",
      "subpath": "/watercolor-dot",
      "status": "no-migrate",
      "primary": null,
      "fallback": "src/components/custom/watercolor-dot/WatercolorDot.vue",
      "reason": "SVG/CSS only — mounts ZERO drawing context (a namespaced feDisplacementMap + seeded prng; useWatercolorBlob.ts is pure geometry). PERMANENTLY OUT — a GPU context for one decorative dot is a regression against the ~8-context-per-page cap. The canonical mark-NOT-to-migrate-with-the-reason case."
    }
  ]
}
```

## The substrate (W-GPU-SUBSTRATE — this sub-wave)

The THREE thin backends over the ONE lifecycle leaf (`createCanvasLifecycle`):

| backend | file | acquisition | self-heal |
|---|---|---|---|
| WebGL2 | `src/composables/glass/webgl/useWebGLCanvas.ts` | sync `getContext("webgl2")` | `webglcontextlost`/`restored` |
| Canvas2D | `src/composables/glass/canvas2d/useCanvas2D.ts` | sync `getContext("2d")` | none (a 2D context cannot be lost) |
| WebGPU | `src/composables/glass/webgpu/useWebGPUCanvas.ts` | async `requestAdapter` → `requestDevice` → `context.configure` | `device.lost` (re-acquire unless `reason: "destroyed"`) |

The picker `useGpuSubstrate` (`src/composables/glass/webgpu/useGpuSubstrate.ts`) feature-detects `navigator.gpu` ONCE and selects the backend; the uniform handle (`armAsync`/`suspend`/`resume`/`wake`/`renderAt`/`dispose`/`reducedMotion`) is byte-identical across backends. The WebGL2 fallback is NOT retired — it is the graceful path for the ~5-10% tail (Linux Firefox stable, pre-A12 iPhones, flagged Firefox-Android). Clause B of the gate machine-blocks a premature retirement.
