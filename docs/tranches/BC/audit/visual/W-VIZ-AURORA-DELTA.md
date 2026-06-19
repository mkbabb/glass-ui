# BC.W-VIZ-AURORA — DELTA (the aurora WGSL-primary painterly field)

**Status:** SOURCE landed + device-free gate GREEN. The LIVE-GPU paint arms (A4/A5) are
**pending orchestrator capture on real Metal** (the cardinal split — CI/this-agent proves the
SOURCE wiring, the local close proves the PAINT).

## What landed (SOURCE — gate `proof:viz-aurora` born-RED → GREEN)

- **T1 — the dead-static `"auto"` fall is RETIRED** (`renderMode.ts`). `resolveRenderMode("auto",…)`
  drops the `hardwareConcurrency <= 4` + `saveData` `"css"` heuristics — they demoted a 2026-capable
  base-M-series / throttled-VM tab (4 logical cores) to a FROZEN gradient that read as "renders SLOW".
  The software-raster guard + the PRM-to-substrate delegation stay; `"auto"` now arms the GPU on every
  Chrome-113/Safari-26/Firefox-141 device. The `AV_AURORA_DPR_MAX = 1.5` sub-2× cap is KEPT.
- **T2 — the capture path awaits the device** (`runtime.ts` + `usePresetThumbnails.ts`). The runtime
  exposes `armAsync()`; the thumbnail bake `await`s it BEFORE the first `renderAt` — on the WebGPU
  backend `renderAt` is a no-op until the async adapter→device→configure→setup prelude resolves, so the
  prior synchronous `renderAt` baked a BLANK webp (the dead dark card). Every preset thumbnail now bakes
  a real image.
- **T3 — configurator RIGHT + rounded** (`aurora.vue` + `AuroraStage.vue`). `<Configurator asideSide="right">`
  pinned explicitly (the inspector idiom — stage left, controls right on desktop; the Configurator default,
  recorded as a contract). The rounded clip lands on the CANVAS-bearing wrapper (`rounded-card overflow-hidden`
  on the AuroraStage tile) so the radius reaches the canvas PIXELS, not just the panel frame.
- **T4 — the painterly mediums port to WGSL (THE KEYSTONE)** (`aurora-mediums.wgsl.ts` NEW +
  `aurora.wgsl.ts` splice + `uniformBridgeWGPU.ts` lockstep). On Safari 26 (WebGPU) the painterly mediums
  render the FULL painterly register, never a silent smooth degrade (the user's "WebGPU EVERYWHERE … NO
  FALLBACKS" mandate). The ported bodies: `sampleBase`, `structureTensorField` (the AW.W4.1 color-field
  edge-tangent keystone), `flowField`, `brokenColorJitter`, `mediumPastel`/`mediumWatercolor`/`mediumCrayon`,
  and **`mediumKuwahara`** (the SOFT anisotropic generalized Kuwahara, Kyprianidis 2010 — aurora is a
  PROCEDURAL field so NO FBO; the operator runs over `sampleBase` over an elliptical kernel oriented along
  the structure tensor, 4 rings × 8 angular taps = 32 procedural samples, 8 OVERLAPPING sectors blended SOFT
  by `1/(1+var^q)` → no 8-spoke pinwheel by construction). `oil`/`vangogh`/`oil-pastel` render the
  anisotropic-Kuwahara PAINTERLY finish on the WGSL primary (a real oil-paint read; the full per-dab
  Starry-Night stroke cascade stays the byte-untouched WebGL2 `aurora.frag.ts` register — the GL-shader
  fence). The Kuwahara radius/sectors/q ride NEW `scalars4`/`scalars5`/`kuwahara` struct lanes (576-byte
  buffer), in lockstep with `packAuroraWGPUUniforms` (a one-sided add reds the parity). The smooth default
  is byte-identical (applyMedium is a no-op pass-through at uMedium 0).
- **A7 / §6b — `deriveAurora({ avoidHues })`** (`color.ts`). The additive DERIVE-path hue-EXCLUSION axis
  (the speedtest-AX cross-repo fold): a consumer excludes named OKLCh hue bands when deriving a palette
  FROM a seed (e.g. `avoidHues: [[170, 200]]` keeps teal-on-navy out BY CONSTRUCTION, in the derive path,
  not just the static default). The honor re-ROUTES the walked hue to the nearest band edge (L/C preserved
  — no chroma flatten). Additive + default-unset → byte-identical derive (`proof:aurora-atoms-roundtrip`
  stays GREEN). VERIFIED live: a `deriveAurora` over a teal seed across analogous/monochrome/complementary/
  triad with `avoidHues:[[170,200]]` lands EVERY stop outside the band (e.g. 157/169.5/169.5/200.5/213°).

## Fences held (verified GREEN)
- `aurora.frag.ts` byte-untouched (the GL-shader fence — `git diff` empty).
- `proof:gpu-substrate-single` · `proof:offscreen-pause` · `proof:no-layout-animation` ·
  `proof:webgl-substrate-single` · `proof:aurora-atoms-roundtrip` · `proof:aurora-curl-warp` ·
  `proof:aurora-space-gamma` · `proof:aurora-swraster` · `proof:aurora-preset-roster` — all GREEN.
- The WebGL2 fallback is KEPT (the ~5-10% tail insurance + the headless certify ground).
- Warm-cream is the library default; teal-on-navy is a DEMO preset only.

## PENDING — the orchestrator's LIVE-GPU paint arms (A4/A5; real Metal)

**Route:** `/substrates/aurora` (the demo dev server, `:5199`).
**Canvas selector:** `.aurora-root > canvas.aurora-canvas` (inside `AuroraStage`'s `rounded-card` tile,
left column of the `[data-slot="configurator"]` grid).

**What the eye must see (the gestalt bar — both modes, Chrome + WebKit + an adapter-less host):**
1. A **warm-cream LIVING aurora** breathing across the stage within ~500ms of settle — `meanLum > 0` AND
   `chroma > 0`, NOT a black void, NOT a frozen gradient, NOT teal/navy. (A4 — the BB gate-paint-blindness
   close: a REAL GPU capture, not the CPU-evaluator ΔE 0.0.)
2. The **`medium:"vangogh"`/`"kuwahara"` config reads as thick oil paint** (NOT smooth) on the WebGPU host
   (the WGSL port painted) — the painterly statistics floor (A5: radial power-spectrum slope, Hasler-Süsstrunk
   colorfulness, structure-tensor coherence in band; NO 8-spoke pinwheel — the soft-blend criterion).
3. The **configurator sits RIGHT** on a 1440px viewport (controls column x-centre > stage x-centre), stacked
   BELOW on a 390px viewport.
4. The **frame + canvas are visibly ROUNDED** (the `rounded-card` clip reaches the canvas pixels).
5. **Every preset thumbnail is a real baked image** (sampled mean luminance > 0 — no dead dark card).
6. The **backend readout reads `webgpu`** on a WebGPU host, `webgl2` on an adapter-less host (the picker fires).
7. **Safari/WebKit no-flash** across a 5s capture (gated on `BC.W-SAFARI-WEBGL`'s `webglcontextlost` breaker).

Capture lands as `W-VIZ-AURORA-painterly-{before,after}-{desktop,mobile}-{light,dark}.png` + the backend
readout + the thumbnail-roster sample (the painterly BEFORE/AFTER full-bleed both modes).
