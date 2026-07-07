# BG.W-CONCENTRIC-LEVELCURVES — dual-engine paint judge DELTA (re-judge after F9.R3 WebKit-paint-fix)

**Verdict: FAIL** (one blocking defect UNRESOLVED — paint owed; the wave routes to a build-FIX agent).
**Route:** `/substrates/concentric`
**Judged:** non-authoring paint judge, BUILT bytes (`demo:dist:build` → `vite preview :5200`), dual-engine (real Chrome.app ANGLE/Metal via CDP + system WebKit.framework off-screen WKWebView snapshot + playwright-webkit control), both modes, over the proven C18 `?capture=<route>&mode=<m>` + `data-capture-ready` method.
**Siblings-intact:** `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).
**Re-judge context:** this run re-judges the current BUILT bytes after commit `4d641786` (F9.R3 WebKit/Metal-WebGPU paint-fix — the derivative-free `contourInk(fN,hw,aaW)` single-`fwidth` hoist + static-index `paletteStop`/`paletteStopLin` unroll landed in BOTH `concentric.wgsl.ts` AND `concentric.glsl.ts`). **DEFECT 2 (Chrome dashing) stays FIXED. DEFECT 1 (WebKit blank) is STILL PRESENT — the fix resolved NEITHER WebKit path.**

## Provenance (engine badges decoded)
- **Chrome:** `glRenderer = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` — real Metal GPU, NOT headless SwiftShader. Badge in `conc-chrome-{light,dark}-full.png`.
- **Safari (system WebKit.framework off-screen WKWebView):** badge decoded `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×1900 @2x (2880×3800px) · MODE LIGHT/DARK · route SUBSTRATES · CONCENTRIC · @mkbabb/glass-ui/concentric` — system Safari 26 engine.
- **Safari environment probe (system WKWebView, this run):** `navigator.gpu = "object"` (present) + truthy → the system WebKit selects the **WebGPU-PRIMARY (WGSL) path** (`createGpuSubstrate` is WebGPU-first where `navigator.gpu` + a `setupWGPU` callback exist).
- **Safari (playwright-webkit control):** `navigator.gpu` undefined → exercises the **WebGL2 GLSL fallback path**.

## Summary
The criteria require, **dual-engine both modes**, that concentric read as smooth NESTED level curves of one procedural height field — continuous unbroken contour bands, index/minor hierarchy legible, zero jagged/torn arcs at 2880×1800; a bounded traveling-wave flow; a smooth pointer gesture; **and PASS only when every surface in BOTH engines + BOTH modes reads correct.** Concentric renders correct in Chrome but BLANK in WebKit (BOTH the WebGPU-primary AND the GL2-fallback paths) → **FAIL.** The load-bearing repair the wave row names ("the Safari-26 WebGPU-primary silent-blank fix") did NOT land in paint.

### DEFECT 1 (BLOCKING, UNRESOLVED) — concentric renders BLANK in WebKit/Safari, BOTH modes, BOTH substrate paths
The concentric hero canvas paints NOTHING in WebKit — a flat cream/dark rounded plate. THREE independent WebKit readbacks agree, and the aurora control on the SAME `createGpuSubstrate` paints in every one:

- **System WebKit.framework off-screen WKWebView snapshot** (`conc-safari-{light,dark}-tall.png`, 2880×3800, tall viewport so the hero is in-frame with no scroll; hero crop `conc-safari-{light,dark}-hero.png`, region x0=498 y0=1896 1346×1436): concentric hero `meanL 0.9483 · stdL 0.0073 · edge 0.00014` (light) / `meanL 0.9477 · stdL 0.022 · edge 0.00019` (dark) — **flat, zero contour structure** (visual: a solid cream rounded plate in BOTH modes; dark-mode meanL≈0.948 = the canvas clears to cream, it is NOT painting the dark field). This WKWebView has `navigator.gpu` → **the WebGPU-PRIMARY (WGSL) path is the one that blanks here.**
- **System WebKit AURORA control (same WKWebView, `/substrates/aurora`):** paints richly — the warm painterly gradient field renders behind the hero, the Aurora Studio field is vivid. **So the system WKWebView CAN render GPU content; the blank is concentric-specific, not a WKWebView/GPU-capture limitation.**
- **playwright-webkit element screenshot** (composited GL, DPR-2, GL2 fallback — `navigator.gpu` undefined):
  - CONCENTRIC light `meanL 0.9807 · stdL 0 · edge 0` — perfectly uniform (nothing drawn).
  - CONCENTRIC dark `meanL 0.0398 · stdL 0 · edge 0` — perfectly uniform.
  - AURORA (control, same substrate) light `meanL 0.8003 · stdL 0.2088 · edge 0.02413` / dark `meanL 0.2398 · stdL 0.1782 · edge 0.02469` — **paints, richly structured.** → **the GL2-fallback (GLSL) path ALSO blanks; the blank is not confined to the WebGPU primary.**
- **No error surface:** playwright-webkit reports ZERO `pageerror`, ZERO console error — only `info: [capture] ready · route=/substrates/concentric mode=… engine=SAFARI gpu=Apple GPU`. A SILENT non-paint. (The prior GL-state probe: `type webgl2 · glError 0 · isContextLost false` — the context is valid and error-free; the shader compiles/links but the fragment output is invisible.)

**The F9.R3 premise is EMPIRICALLY CONTRADICTED.** The fix narrative claimed (a) "the GLSL/GL2 fallback is EMPIRICALLY OPAQUE on real WebKit (renders a structured field)" and (b) "the silent blank is confined to the WebGPU PRIMARY." The composited element-screenshot readback shows (a) is FALSE — the GL2 fallback renders `stdL 0` blank in playwright-webkit — and (b) is FALSE — the WebGPU-primary path (system WebKit, `navigator.gpu` present) is ALSO blank. **BOTH shader paths are broken in WebKit**; the P1 derivative-free `contourInk` + P2 static-index palette changes did not restore paint on either. (A `readPixels` readback reads 0 for BOTH aurora and concentric — neither uses `preserveDrawingBuffer` — so it is NON-diagnostic; if the fix agent read structure off `readPixels` it read a false signal. The element-screenshot composite is the authoritative readback and it is `stdL 0`.)

### DEFECT 2 (Chrome dashed contours) — FIXED ✅ (holds)
In Chrome (ANGLE/Metal M5 Max) concentric paints smooth NESTED level curves of one procedural height field — every contour a **continuous unbroken band**, analytic hillshade relief (warm-amber ridges / cool-cream basins), the two-tier index/minor hierarchy legible, zero jagged/torn arcs. DPR-2 hero (`conc-chrome-{light,dark}-hero.png`, 1348×1402): light `meanL 0.8107 · stdL 0.0718 · edge 0.01001`, dark `meanL 0.8048 · stdL 0.0820 · edge 0.01175` — richly structured, ~50–65× the WebKit-blank edge energy. Visually confirmed continuous in both modes.

## What WORKS (Chrome — the field math / flow / AA / palette are healthy)
- **Smooth continuous nested level curves, both modes** (L1 single-field `contourInk` + L3 no-aliasing/no-seam/AA-held read correct in Chrome at 2880-class backing).
- **Palette (L4).** The demo uses the consumer preset (`CONCENTRIC_PRESET_WARM`), respected verbatim in both modes by design, so light≈dark warm-amber is EXPECTED (the per-mode ember flip only fires on the library-default token) — not a defect.
- **Page chrome intact, both engines.** Recessive grid/aurora background (no conic banding, no oversaturation), hero title fits its envelope, configurator + dock nav render correctly in both engines. The blank is isolated to the concentric viz canvas.

## Computed checks
| check | Chrome light | Chrome dark | WebKit(system,WGPU) light | WebKit(system,WGPU) dark | wk-pw(GL2) light | wk-pw(GL2) dark |
|---|---|---|---|---|---|---|
| data-capture-ready | yes | yes | yes (4500ms) | yes (4500ms) | yes | yes |
| navigator.gpu | — | — | **object (present)** | object (present) | undefined | undefined |
| canvasCount | 2 | 2 | 2 | 2 | 2 | 2 |
| concentric hero meanL | 0.811 | 0.805 | 0.948 (blank) | 0.948 (blank) | 0.981 (blank) | 0.040 (blank) |
| concentric hero stdL | 0.072 | 0.082 | 0.007 | 0.022 | **0** | **0** |
| concentric hero edge | 0.01001 | 0.01175 | 0.00014 | 0.00019 | **0** | **0** |
| aurora control (same substrate) | — | — | paints | paints | edge 0.02413 | edge 0.02469 |
| glRenderer / gpu | ANGLE Metal M5 Max | ANGLE Metal M5 Max | Apple GPU (WebGPU) | Apple GPU (WebGPU) | Apple GPU (webgl2, glError 0) | Apple GPU |

## Traveling-wave flow / PRM
Not separately certified this run — the verdict is already FAIL on DEFECT 1 (a blank canvas has no flow to measure and no PRM static-frame to certify). The Chrome flow/PRM arms are owed at re-judge once WebKit paints; a prior run measured a bounded Chrome flow (`maxΔmeanLum 0.00408` over a 5s 10-frame series).

## Evidence (all resolve on disk under `docs/tranches/BG/audit/visual/BG.W-CONCENTRIC-LEVELCURVES-paint/`)
- `conc-chrome-light-full.png` / `conc-chrome-dark-full.png` (2880×1800) — full-page context + engine badge, real ANGLE-Metal.
- `conc-chrome-light-hero.png` / `conc-chrome-dark-hero.png` (1348×1402) — the FIXED continuous-contour hero, both modes (Chrome).
- `conc-safari-light-tall.png` / `conc-safari-dark-tall.png` (2880×3800) — system WebKit tall capture (hero in-frame); WEBKIT badge decoded for provenance.
- `conc-safari-light-hero.png` / `conc-safari-dark-hero.png` (1346×1436) — WebKit BLANK concentric stage (flat cream plate, both modes).
- `wkpw-aurora-{light,dark}.png` (2880×1800) — playwright-webkit aurora control (paints, GL2 fallback).
- `wkpw-concentric-{light,dark}.png` (1346×1402) — playwright-webkit concentric target (blank, stdL 0, GL2 fallback).
- capture tooling: `chrome-conc.mjs`, `crop-stats.mjs`, `webkit-probe.mjs`, `wkgpu-probe.m` (system-WebKit `navigator.gpu` probe), `wkshot-concentric.m`.

## defectLocalization
- **Files:** BOTH shader paths — `src/components/custom/concentric/shaders/concentric.wgsl.ts` (WebGPU-primary, the path the system WebKit `navigator.gpu`-present engine selects) + `src/components/custom/concentric/shaders/concentric.glsl.ts` (WebGL2 fallback, the path playwright-webkit selects) + their setup (`concentricWGPUSetup.ts` / `concentricGLSetup.ts`) + `useConcentric.ts` / `useGpuSubstrate` selection.
- **Symptom:** error-free context (glError 0, not context-lost), NO console/page error, but the composited output is uniform (`stdL 0` in playwright-webkit GL2; flat cream in the system-WebKit WebGPU capture) in BOTH modes on BOTH paths. Aurora on the identical `createGpuSubstrate` paints in the SAME two WebKit engines → the divergence is concentric's shader/setup, not the substrate.
- **Prior-fix insufficiency:** the F9.R3 P1 (derivative-free `contourInk`, single `fwidth` hoist) + P2 (static-index palette unroll) landed in BOTH shaders but the blank persists on BOTH paths. The F9.R3 premise that the GL2 fallback "is empirically opaque" is FALSE (playwright-webkit GL2 concentric = `stdL 0`), so the WebKit-blank root cause is NOT the two hazards P1/P2 addressed. Chase a DIFFERENT WebKit-Metal divergence present in BOTH the WGSL and GLSL concentric paths but ABSENT from the working aurora paths.

## mustFix[]
1. **WebKit paint (BLOCKING) — BOTH paths.** Make concentric render in WebKit/Safari on (a) the WebGPU-PRIMARY WGSL path (system Safari 26 where `navigator.gpu` is present — the load-bearing repair the wave names) AND (b) the WebGL2 GLSL fallback (playwright-webkit / `navigator.gpu`-absent WebKit). The F9.R3 P1/P2 did NOT fix either. Diagnostic method: bisect each concentric path against the WORKING aurora path on the SAME engine — a solid-color debug frag FIRST to confirm the draw reaches the framebuffer (isolate draw-not-issued vs frag-collapses-to-transparent), then bound/repair the construct that collapses concentric's output on WebKit-Metal but not ANGLE-Metal. Note the readback trap: `readPixels` reads 0 without `preserveDrawingBuffer` (non-diagnostic) — verify via the composited element-screenshot (`stdL`/`edge`), NOT `readPixels`. Suspects surviving an error-free compile/link: a second unbounded fast-math NaN (`pow`/`log`/`1.0/x`/`normalize(0)`/`sqrt(neg)`/`inversesqrt`) in the contour/hillshade path; a `#version 300 es` / WGSL construct ANGLE tolerates and WebKit-Metal does not (non-constant index, integer `%`, uniform-block std140/WGSL alignment divergence vs the aurora setup); the fullscreen-triangle/quad vertex path not covering the viewport under WebKit; or a substrate-selection path that arms but never issues the draw.
2. **Re-judge dual-engine both-modes π after (1).** Re-confirm the Chrome continuous-contour arm survives at 2880×1800, then certify the WebKit paint (hero `edge > ~0.02`, `stdL > 0`, structured, parity with the working aurora), the bounded traveling-wave flow (per-frame ΔmeanLum bounded, both engines), the pointer enter→sweep→flick→leave smooth-at-every-frame series, and the PRM one deterministic static frame. Re-judge target for WebKit: `stdL`/`edge` in the Chrome range (`stdL > ~0.05`, `edge > ~0.008`), NOT `stdL 0` / cream-flat.
