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
      "note": "MIGRATED + STAGE-2 DRESSED (BC.W-GOOBLOB-MEATBALL). metaball.wgsl.ts is the WebGPU-first primary; metaball.frag.ts is the WebGL2 fallback. BC.W-GOOBLOB-MEATBALL (1) fixes the WGSL uniformity residual — the Toksvig normal fwidth(N) sat INSIDE the if(uLit>0.5) branch AFTER the per-fragment alpha early-return (non-uniform flow WGSL rejects, so the WGSL primary never armed and GooBlob fell to the WebGL2 net forever); the fix HOISTS the normal-derivative (Nh + nVar=length(fwidth(Nh))) to UNIFORM control flow at the top of fs_main (the SAME level the working fwidth(d) AA site sits at), so the WGSL primary COMPILES + paints the full lit creature — and (2) adds the symmetric softShadow2D 2D SDF march + the uShadow/uShadowSoftness lanes to BOTH backends (a PURELY additive block in each, the lit-glass/smin/normal/OKLCh math byte-faithful — the parity bar). The two live fwidth() sites (AA-edge half-width + the hoisted Toksvig spec-clamp) transcribe to WGSL fragment-stage fwidth() — the most rasterizer-drift-prone lines, called out by name in the capture record. The renderer's simulation advance (resolveFrame) is SHARED across both backends; only the upload+draw leg differs. The recorded ΔE is the DEVICE-FREE STRUCTURAL PROXY (the parity-critical color seam — shared OETF + Ottosson OKLCh + the per-pixel OKLCh perturb round-trip + the gamut clamp + the warm-cream lit-glass specular/rim + the IGN dither — evaluated through both chunk variants over the same deterministic field; the two fwidth() sites use an analytic stand-in identical for both paths; mean/p99 = 0.0, both chunks numerically identical). The BINDING Metal-GPU live capture-pair (the real WebGPU swap-chain readback vs WebGL2 readPixels, including the REAL per-GPU fwidth() derivative drift) rides W-REFLECT3 + re-records the empirical ΔE."
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
      "note": "BC.W-VIZ-DOTFLOW RETOPOLOGY — the field is now a CALM ANCHORED DOT-MATRIX a slow LARGE wave sweeps through (NOT the free-advecting particle cloud the user condemned as a 'mess of noise'). WebGPU-first compute+render: the @compute @workgroup_size(64) kernel pulls the anchored lattice toward its sub-cell displacement target with a restoring spring (NO advection, NO re-seed); the instanced-billboard render pass lights each dot by the sweeping Gerstner-height band (flow-field.compute.wgsl.ts + flow-field.render.wgsl.ts). The Canvas2D point-cloud is GONE (the §E 'no canvas anywhere' mandate); the fallback is now a PURE WebGL2 fullscreen FRAGMENT dot-lattice + brightness shader (flow-field.glsl.ts) — the retopology made the grid+brightness model fragment-friendly, so the fallback flips degraded→verified (the SAME analytic field, no compute particles). The recorded ΔE is the DEVICE-FREE STRUCTURAL PROXY: BOTH the WGSL compute/render AND the WebGL2 fragment transcribe ONE analytic field evaluator (composables/flowField.ts gridOrigin/sampleHeight/sampleDisplacement/waveBand) through ONE shared color seam (procedural-color.{wgsl,glsl}.ts), so the height/displacement/brightness field is numerically identical at every (index, t) (proof:viz-dotflow clause F3 round-trips JS↔WGSL↔GLSL → mean/p99 = 0.0). The BINDING Metal-GPU live capture-pair (the real WebGPU swap-chain readback vs WebGL2 readPixels) rides BC.W-VIZ-DOTFLOW's own close (the per-wave fresh-capture discipline, BC.W-GESTALT-FIRST) + re-records the empirical rasterizer-drift ΔE."
    },
    {
      "viz": "concentric",
      "subpath": "/concentric",
      "status": "verified",
      "primary": "src/components/custom/concentric/shaders/concentric.wgsl.ts",
      "fallback": "src/components/custom/concentric/shaders/concentric.glsl.ts",
      "rank": 4,
      "subWave": "BB.W-VIZ-SUITE.e W-CONCENTRIC",
      "captures": [
        "docs/tranches/BB/audit/visual/concentric-parity/concentric-wgpu-primary.png",
        "docs/tranches/BB/audit/visual/concentric-parity/concentric-webgl2-fallback.png",
        "docs/tranches/BB/audit/visual/concentric-parity/parity-record.json"
      ],
      "deltaE": { "mean": 0.0, "p99": 0.0 },
      "note": "BORN WebGPU-first — a fullscreen radial-Fourier ring-interference fragment field (the aurora shape-class, the LAST new viz of Batch V): f(p,t) = Σ_j Σ_i A_i·sin(k_i·‖p−c_j‖_e − ω_i·t + φ_i), an ellipsoidal-norm radial sum over multi-centers → moiré interference, ω = √(g·k) the SAME deep-water dispersion the dot-flow-field uses (the suite's ONE Fourier vocabulary). concentric.wgsl.ts is the WebGPU-first primary (splicing the WGSL twin procedural-color.wgsl.ts); concentric.glsl.ts is the clean aurora-class WebGL2 fallback (splicing the GLSL twin procedural-color.glsl.ts). The recorded ΔE is the DEVICE-FREE STRUCTURAL PROXY: concentric is a PURE fragment field (no compute/particles), so BOTH backends evaluate ONE analytic ring-field evaluator (composables/ringField.ts sampleRingField) through ONE shared color seam — the field raster + the OKLab palette mapping are numerically identical at every (p,t) (proof:concentric clause 3 round-trips JS↔WGSL↔GLSL → mean/p99 = 0.0). UNLIKE the dot-flow-field's `degraded` density delta, concentric's fallback is the SAME pure fragment field — parity `verified`. The BINDING Metal-GPU live capture-pair (the real WebGPU swap-chain readback vs WebGL2 readPixels) rides W-REFLECT3 + re-records the empirical rasterizer-drift ΔE."
    },
    {
      "viz": "paper-grid",
      "subpath": "/paper-grid",
      "status": "verified",
      "primary": "src/components/custom/paper-grid/shaders/paper-grid.wgsl.ts",
      "fallback": "src/components/custom/paper-grid/shaders/paper-grid.glsl.ts",
      "subWave": "BC.W-VIZ-PAPERGRID",
      "captures": [
        "docs/tranches/BC/audit/visual/paper-grid-parity/paper-grid-wgpu-primary.png",
        "docs/tranches/BC/audit/visual/paper-grid-parity/paper-grid-webgl2-fallback.png",
        "docs/tranches/BC/audit/visual/paper-grid-parity/parity-record.json"
      ],
      "deltaE": { "mean": 0.0, "p99": 0.0 },
      "note": "BORN WebGPU-first — a fullscreen liquid AA-grid fragment field (the aurora/concentric shape-class, the LIGHTEST viz in the suite — no compute, no particles, no storage buffer). The grid is computed at a curl-warped coordinate g(uv) = uv + curlWarp(uv,t) + cursorBulge(uv) (the IQ domain-warp substitution driven by the Bridson divergence-free curl — the whole sheet bows together, never a per-line jitter) and each line is extracted as a constant-pixel-width stroke via the Ben Golus screen-space derivative AA (the blurry-mess kill). paper-grid.wgsl.ts is the WebGPU-first primary (splicing flow.wgsl.ts — the FIRST WGSL curl consumer, the booked procedural-tail chunk minted here); paper-grid.glsl.ts is the clean WebGL2 fallback (splicing the GLSL twin flow.glsl.ts). The recorded ΔE is the DEVICE-FREE STRUCTURAL PROXY: paper-grid is a PURE fragment field (no compute/particles), so BOTH backends evaluate ONE analytic liquid-grid evaluator (composables/paperGrid.ts samplePaperGrid) through ONE shared curl chunk (flow.{wgsl,glsl}.ts) + ONE OETF — the line coverage + the premultiplied ink are numerically identical at every (uv,t) (proof:viz-papergrid clause P3 round-trips JS↔WGSL↔GLSL → mean/p99 = 0.0). UNLIKE the dot-flow-field's `degraded` density delta, paper-grid's fallback is the SAME pure fragment field — parity `verified`. The BINDING Metal-GPU live capture-pair (the real WebGPU swap-chain readback vs WebGL2 readPixels) rides this wave's close (the per-wave fresh-capture discipline, BC.W-GESTALT-FIRST) + re-records the empirical rasterizer-drift ΔE."
    },
    {
      "viz": "fourier-field",
      "subpath": "/fourier-field",
      "status": "no-migrate",
      "primary": null,
      "reason": "BG.W-VIZ-DEMIGRATE — DE-migrated OFF the over-built WebGPU compute+fullscreen-fragment substrate BACK onto useCanvas2D (its own PROCEDURAL-SUITE / README no-migrate verdict, honoured; RC2/F4). A few-dozen phasors drawn as a ctx.stroke epicycle chain (math.ts DFT + fourierFieldDraw.ts) is the RIGHT tool — the WGSL compute + the fullscreen-fragment SDF + the typed uniformBridgeWGPU were the excluded over-build. The 6 shader/setup/bridge files (fourier-field.{compute.wgsl,glsl,render.wgsl}.ts + fourierFieldWGPUSetup/GLSetup + uniformBridgeWGPU.ts) are DELETED; the /fourier-field subpath KEY is PRESERVED — an internal WGSL→Canvas2D swap is a VISUAL re-baseline, NOT an import re-point, so no by-name cross-repo ask is owed (owner BG-WS5; consumers slides×4 + atlas). The 'thousands of phasors' GPU trigger stays BOOKED — a ≥256-phasor consumer would flip it back, never the default count=6."
    },
    {
      "viz": "constellation",
      "subpath": "/constellation",
      "status": "no-migrate",
      "primary": null,
      "reason": "BG.W-VIZ-DEMIGRATE — DE-migrated OFF the over-built WebGPU instanced-points+lines substrate BACK onto useCanvas2D (its own PROCEDURAL-SUITE / README no-migrate verdict, honoured; RC2/F4). The four neutral ctx.arc/ctx.stroke draw passes (constellationRender.ts) over the ONE JS field evaluator (constellationField.ts seedField/stepField/buildEdges) are the RIGHT tool — the GPU instanced-quads + the WGSL/GLSL SDF shaders + the typed uniformBridgeWGPU were the excluded over-build. The 7 shader/setup/bridge files (constellation-{points,lines}.{wgsl,glsl}.ts + constellationWGPUSetup/GLSetup + uniformBridgeWGPU.ts) are DELETED; the /constellation subpath KEY is PRESERVED — an internal WGSL→Canvas2D swap is a VISUAL re-baseline, NOT an import re-point, so no by-name cross-repo ask is owed (owner BG-WS5; consumers slides×2 + atlas). The compute neighbor-bin stays BOOKED at N ≫ 256 — overfit at the default count=64."
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
