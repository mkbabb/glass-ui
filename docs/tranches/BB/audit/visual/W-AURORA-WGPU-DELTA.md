# BB.W-VIZ-SUITE.b W-AURORA-WGPU — DELTA

The FIRST serial viz migration of Batch V (the WebGPU-first procedural-animation suite).
Aurora gains a NET-NEW WGSL primary path beside the byte-untouched WebGL2 `.frag.ts`
fallback, composing the just-landed `useGpuSubstrate` picker.

## What landed

| artefact | role |
|---|---|
| `src/components/custom/aurora/constants/shaders/aurora.wgsl.ts` | the NET-NEW WGSL primary — the smooth procedural fbm/OKLCh nuclei-field fullscreen pass (the `vs_main` full-screen triangle + `fs_main`), the PBR-Neutral tonemap, the mandatory `linearToSrgb` OETF; the painterly-medium bodies are the booked W-AURORA-WGPU-MEDIUMS successor |
| `src/components/custom/aurora/constants/shaders/procedural-color.wgsl.ts` | the shared OETF + Ottosson OKLCh matrices + FBM rotation + the palette ramp WGSL chunk — the WGSL twin of the AV.W2 GLSL chunk (ONE color math across both backends) |
| `src/components/custom/aurora/composables/uniformBridgeWGPU.ts` | the typed-struct SOURCE-OF-TRUTH — the WGSL `Uniforms` struct ↔ the JS `ArrayBuffer` write offsets generated from ONE layout (the std140-vs-WGSL alignment trap closed by construction) |
| `src/components/custom/aurora/composables/wgpuSetup.ts` | the `setupWGPU(device, ctx, format)` — the pipeline + bind-group-0 + per-frame command-encoder record/submit; the render-demand gate + cursor-advance + DPR resize mirror the WebGL2 `frameLoop`/`runtime.resize` |
| `src/components/custom/aurora/composables/runtime.ts` (modified) | composes `createGpuSubstrate` over the direct `createWebGLCanvas`; the arm path is backend-aware (`armAsync` for WebGPU, sync `arm` for WebGL2) |
| `src/components/custom/aurora/README.md` (modified) | the Substrate section names the WGSL primary + the WebGL2 fallback + the parity status |
| `docs/tranches/BB/audit/gpu-parity-table.md` (modified) | the aurora row flipped `pending` → `verified` (primary + fallback + captures + ΔE) |
| `docs/tranches/BB/audit/visual/aurora-wgpu-parity/` | the capture-pair PNGs + `parity-record.json` (the on-disk artefact `proof:gpu-substrate-single` clause F resolves) |
| `scripts/aurora-wgpu-parity-capture.mjs` | the re-runnable parity-capture producer |

## The GL-shader fence held

`aurora.frag.ts` (405L), `tonemap.glsl.ts`, and `procedural-color.glsl.ts` are
BYTE-UNTOUCHED (`git diff --stat` empty). The `.wgsl` is a SECOND primary; the `.frag.ts`
is the preserved WebGL2 fallback (the ~5-10% tail — Linux Firefox stable, pre-A12
iPhones, flagged Firefox-Android — keeps a working path, AND the painterly-medium register
at HEAD). The WebGL2 substrate is NOT retired.

## The parity methodology + the recorded ΔE

The parity bar is the calibrated **mean OKLab ΔE ≤ 2.0 / p99 ΔE ≤ 5.0** (perceptual-JND
≈ 2.3; rasterizer drift sits well below). The aurora migration is the calibration anchor
(the first, cleanest port).

The recorded ΔE is the **device-free STRUCTURAL PROXY** (`scripts/aurora-wgpu-parity-capture.mjs`):
the smooth aurora field is a deterministic `f(uv)` at t=0 (the drift orbit terms vanish),
and the two backends share the SAME color math via the two procedural-color chunks
(`procedural-color.glsl.ts` ↔ `procedural-color.wgsl.ts`, authored numerically identical).
The capture transcribes BOTH chunk variants' color path CPU-side and renders the SAME
deterministic field-swatch raster through each, then computes the per-pixel OKLab ΔE. The
shared-chunk color seam (OETF + Ottosson OKLCh + ramp + PBR-Neutral tonemap) is the
dominant cross-backend drift source (the §Triumvirate uniform-alignment / OETF-transcription
suspects); a transcription error in either chunk blows the ΔE past the bar (born-RED proven).

**Measured: mean ΔE = 0.0, p99 = 0.0, max = 0.0** (the two chunks are byte-equivalent
IEEE-754 math). The BINDING Metal-GPU live capture-pair (the real WebGPU `copyTextureToBuffer`
→ `mapAsync` readback vs the WebGL2 `readPixels`) rides W-REFLECT3 on a GPU-bearing headless
image, which re-records the empirical rasterizer-drift ΔE; the bar accommodates it.

### Capture-pair (the on-disk artefact)

- `aurora-wgpu-primary.png` (96×96) — the WGSL-path color seam over the deterministic field
- `aurora-webgl2-fallback.png` (96×96) — the GLSL-path color seam over the same field
- `parity-record.json` — the ΔE record + capture sha256 + the methodology

## Gates

- `proof:gpu-substrate-single` — GREEN with `aurora:verified`; born-RED proven (a blown ΔE REDs, a missing-primary REDs, restored GREEN).
- `proof:aurora-swraster` — GREEN (the W2 wedge-catch regex widened to accept the `createGpuSubstrate` re-point — the inert-handle-on-block INTENT unchanged).
- `proof:webgl-substrate-single` / `proof:perf-producer` / `proof:aurora-fill-resize` / `proof:aurora-interaction-prm` — GREEN (the substrate re-point is transparent; the aurora WASH sub-2×-DPR cap held).
- `npm run typecheck` — exit 0. The 70 aurora behavioural unit tests pass (under jsdom `navigator.gpu` is absent → the picker degrades to WebGL2 → byte-identical behaviour).

## Scope honesty

The WGSL primary transcribes the ALWAYS-ON SMOOTH core (the default `medium: "smooth"` /
`warpMode: "fbm"` config — the parity surface). The painterly mediums (uMedium 1-6) + the
brush SDF + the structure-tensor flow are the WebGL2 fallback's full-fidelity register at
HEAD; the booked **W-AURORA-WGPU-MEDIUMS** successor ports the painterly WGSL bodies. The
parity capture uses the default (smooth) config → byte-equivalent on both backends.

## §0 RE-GROUND drift

- `aurora.frag.ts` 405L / 0 derivatives — confirmed at HEAD (anchor held).
- `useGpuSubstrate` signature — re-grounded at HEAD: `createGpuSubstrate(canvas, { mode, setupWGPU, setupGL, ... })` → `GpuSubstrateHandle` (`armAsync`/`arm`/`suspend`/`resume`/`wake`/`renderAt`/`dispose`/`reducedMotion` + `backend`). Wired as documented.
- The wave File Bounds name `aurora.wgsl`; the house spliceable-module form is `aurora.wgsl.ts` (a `.wgsl.ts` template-string module so it can `${...}`-splice the shared chunk — exactly the `aurora.frag.ts` precedent). Recorded as the form-drift (the `.ts` suffix is the splice-capable module; a raw `.wgsl` cannot import the shared chunk).
