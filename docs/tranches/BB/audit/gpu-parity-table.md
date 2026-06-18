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
      "status": "verified",
      "primary": "src/components/custom/aurora/constants/shaders/aurora.wgsl.ts",
      "fallback": "src/components/custom/aurora/constants/shaders/aurora.frag.ts",
      "rank": 1,
      "subWave": "BB.W-VIZ-SUITE.b W-AURORA-WGPU",
      "captures": [
        "docs/tranches/BB/audit/visual/aurora-wgpu-parity/aurora-wgpu-primary.png",
        "docs/tranches/BB/audit/visual/aurora-wgpu-parity/aurora-webgl2-fallback.png",
        "docs/tranches/BB/audit/visual/aurora-wgpu-parity/parity-record.json"
      ],
      "deltaE": { "mean": 0.0, "p99": 0.0 },
      "note": "MIGRATED — the cleanest port (405L, 0 textures / 0 derivatives, pure fbm/OKLCh fullscreen). aurora.wgsl.ts is the WebGPU-first primary (the house spliceable-module form, splicing the WGSL twin procedural-color.wgsl.ts); aurora.frag.ts stays the byte-untouched WebGL2 fallback (git diff --stat empty). The recorded ΔE is the DEVICE-FREE STRUCTURAL PROXY (the parity-critical shared color seam — OETF + Ottosson OKLCh + ramp + PBR-Neutral tonemap — evaluated through both chunk variants over the same deterministic field; mean/p99 = 0.0, both chunks numerically identical). The BINDING Metal-GPU live capture-pair (the real WebGPU swap-chain readback vs WebGL2 readPixels) rides W-REFLECT3 + re-records the empirical rasterizer-drift ΔE. This anchors the ΔE bar (mean ≤ 2.0 / p99 ≤ 5.0)."
    },
    {
      "viz": "goo-blob",
      "subpath": "/goo-blob",
      "status": "verified",
      "primary": "src/components/custom/goo-blob/shaders/metaball.wgsl.ts",
      "fallback": "src/components/custom/goo-blob/shaders/metaball.frag.ts",
      "rank": 2,
      "subWave": "BB.W-VIZ-SUITE.c W-GOOBLOB-WGPU",
      "captures": [
        "docs/tranches/BB/audit/visual/goo-blob-wgpu-parity/goo-blob-wgpu-primary.png",
        "docs/tranches/BB/audit/visual/goo-blob-wgpu-parity/goo-blob-webgl2-fallback.png",
        "docs/tranches/BB/audit/visual/goo-blob-wgpu-parity/parity-record.json"
      ],
      "deltaE": { "mean": 0.0, "p99": 0.0 },
      "note": "MIGRATED — clean SDF smin port (417L). metaball.wgsl.ts is the WebGPU-first primary (the house spliceable-module form, splicing the SAME procedural-color.wgsl.ts twin aurora splices — ONE color source); metaball.frag.ts stays the byte-untouched WebGL2 fallback (git diff --stat empty). The two live fwidth() sites (line 266 AA-edge half-width + line 364 Toksvig normal-variance spec-clamp) transcribe to WGSL fragment-stage fwidth() — the most rasterizer-drift-prone lines, called out by name in the capture record. The renderer's simulation advance (resolveFrame) is SHARED across both backends; only the upload+draw leg differs. The recorded ΔE is the DEVICE-FREE STRUCTURAL PROXY (the parity-critical color seam — shared OETF + Ottosson OKLCh + the per-pixel OKLCh perturb round-trip + the gamut clamp + the warm-cream lit-glass specular/rim + the IGN dither — evaluated through both chunk variants over the same deterministic field; the two fwidth() sites use an analytic stand-in identical for both paths; mean/p99 = 0.0, both chunks numerically identical). The BINDING Metal-GPU live capture-pair (the real WebGPU swap-chain readback vs WebGL2 readPixels, including the REAL per-GPU fwidth() derivative drift) rides W-REFLECT3 + re-records the empirical ΔE."
    },
    {
      "viz": "dot-flow-field",
      "subpath": "/dot-flow-field",
      "status": "verified",
      "primary": "src/components/custom/dot-flow-field/shaders/flow-field.compute.wgsl.ts",
      "fallback": "src/components/custom/dot-flow-field/shaders/flow-field.glsl.ts",
      "rank": 3,
      "subWave": "BB.W-VIZ-SUITE.d W-FLOWFIELD",
      "captures": [
        "docs/tranches/BB/audit/visual/flow-field-parity/flow-field-wgpu-primary.png",
        "docs/tranches/BB/audit/visual/flow-field-parity/flow-field-fallback.png",
        "docs/tranches/BB/audit/visual/flow-field-parity/parity-record.json"
      ],
      "deltaE": { "mean": 0.0, "p99": 0.0 },
      "note": "BORN WebGPU-first — the compute-particle path: a @compute @workgroup_size(64) curl-noise advection over a Gerstner/Tessendorf sum-of-sines wave potential, drawn as instanced billboard quads (flow-field.compute.wgsl.ts + flow-field.render.wgsl.ts). The fallback is the §3a-recorded Canvas2D point-cloud (flow-field.glsl.ts) — the WebGL2 transform-feedback equivalent is materially more code for the SAME visual, so the parity-honest path is a CPU-stepped point cloud (the fourier/constellation precedent) stepping the SAME flowField.ts sampleVelocity() evaluator (the ONE math source). The recorded ΔE is the DEVICE-FREE STRUCTURAL PROXY: BOTH the WGSL compute kernel and the Canvas2D fallback transcribe ONE analytic velocity evaluator (composables/flowField.ts), so the velocity field is numerically identical at every sample (proof:flow-field clause 3 round-trips the JS evaluator against the WGSL transcription → mean/p99 = 0.0). The fallback density is coarser at the CPU step count (the same flow, fewer dots) — recorded honestly, never a silent mismatch. The BINDING Metal-GPU live capture-pair (the real WebGPU swap-chain readback vs the Canvas2D readback) rides W-REFLECT3 + re-records the empirical rasterizer-drift ΔE."
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
