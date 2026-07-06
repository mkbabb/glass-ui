# BG.W-CONCENTRIC-LEVELCURVES — dual-engine paint judge DELTA

**Verdict: FAIL** (paint owed — the wave routes to a build-FIX agent).
**Route:** `/substrates/concentric`
**Judged:** non-authoring paint judge, BUILT bytes (`demo:dist:build` → `vite preview :5200`), dual-engine (real Chrome.app ANGLE/Metal via CDP + system WebKit.framework off-screen snapshot), both modes, over the proven C18 `?capture=<route>&mode=<m>` + `data-capture-ready` method.
**Siblings-intact:** `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).

## Provenance (engine badges decoded)
- Chrome: `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max) · VIEW 1440×900 · MODE LIGHT/DARK` — real Metal GPU, not headless SwiftShader.
- Safari: `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×1200/1900 @2x (2880×2400 / 2880×3800px) · MODE LIGHT/DARK` — system WebKit.framework (Safari 26 engine).

## Summary
The wave criteria require, **dual-engine both modes**, that the frame read as smooth NESTED level curves of one procedural height field — every contour a continuous unbroken band, index/minor hierarchy legible, zero jagged/torn arcs at 2880×1800; a traveling-wave flow with bounded per-frame ΔmeanLum; a pointer gesture that deforms the topography smoothly with no residual stuck heave.

Two blocking defects:

### DEFECT 1 (BLOCKING) — the concentric viz renders BLANK in WebKit/Safari, BOTH modes
The concentric hero canvas paints NOTHING in WebKit — it is a flat cream/white rounded plate in both modes.
- System WebKit.framework off-screen snapshot (`wkshot-concentric`, tall viewport, NO scroll): concentric hero crop `mean 0.948 · edge 0.00004` (light) / `mean 0.948 · edge 0.00007` (dark) — flat, zero contour structure. (Chrome hero on the same page: `mean 0.77 · edge 0.026–0.040`, richly structured.)
- playwright-webkit element screenshot (composited GL, DPR-2), same engine class, side-by-side control: **CONCENTRIC `mean 0.981 · edge 0`** (blank) vs **AURORA `mean 0.616 · edge 0.0038`** (paints). Aurora rides the SAME `createGpuSubstrate` WebGPU-first / WebGL2-fallback substrate and renders correctly in WebKit → the failure is **concentric-specific**, not a substrate-wide or a WKSnapshot GPU-capture limitation (the prior `route-transition-pipeline/substrates-aurora-*-safari.png` proves WKSnapshot captures GPU-canvas content).
- WebKit environment probe: `navigator.gpu` **undefined** (WebGPU unavailable → the WebGL2 fallback path is the one exercised), `webgl2: true` (a GL2 context is obtainable). **NO console error, NO pageerror** was surfaced — a SILENT non-paint.

**Localization (for the fix agent):** the WebGL2 fallback path — `src/components/custom/concentric/composables/concentricGLSetup.ts` + `src/components/custom/concentric/shaders/concentric.glsl.ts` — produces no visible output in WebKit's GLSL-ES-3.0 (Safari) while the aurora GL2 fallback (`concentricGLSetup`'s sibling in aurora) works. Suspect a WebKit-GLSL divergence the ANGLE/Metal path tolerates: a `#version 300 es` precision/derivative (`fwidth`) usage, an unsupported built-in, a uniform-block/std140 layout mismatch, or a substrate-selection path that arms WebGPU-less and never engages the GL2 draw. Because there is no shader-compile error logged, favor a silently-degenerate output (e.g., a NaN/clamp collapsing the frag to the transparent/background) over a hard compile failure. Compare the concentric GL2 setup + frag against the working aurora GL2 setup + frag on WebKit.

### DEFECT 2 — Chrome: the contours render DASHED / BROKEN, not continuous unbroken bands
In Chrome (ANGLE/Metal) the concentric DOES paint a legible topographic contour map — nested loops, analytic hillshade relief, warm-amber ridges / cool-cream basins, the field IS alive and the flow is smooth (see "what works"). BUT nearly every contour line is rendered as a sequence of short DASH segments with regular gaps rather than a continuous unbroken band. This **persists at 2× backing** (`concentric-chrome-light-hero-2x.png`, backing 1346×1400) — it is NOT a DPR-1 sub-pixel undersampling that would resolve on retina. It fails the criteria's "every contour a continuous unbroken band … zero jagged/torn arcs at 2880×1800", and because virtually all contours are dashed the two-tier index/minor hierarchy does not read as "index=solid, minor=finer" — the hierarchy is not clearly legible.

**Localization (for the fix agent):** the IQ gradient-free contour extraction — `contourInk` in `src/components/custom/concentric/shaders/concentric.glsl.ts` (+ `.wgsl.ts`). The line-alpha / `fwidth`-AA band, or a per-contour perturbation (`perturbAmp`) / phase term, is periodically dipping the stroke intensity below visibility ALONG the arc, breaking the band into dashes. The wave-flow warp of the sampling coordinate is fine (the loops are coherent) — the tear is in the STROKE composition, not the field. Verify the contour DE writes a continuous alpha along the level set at every DPR (the L3 "no un-AA'd band / no contour-band aliasing" arm).

## What WORKS (Chrome, so the field math / flow is largely right)
- **Alive + bounded traveling-wave flow.** 10s unattended frame-series on the concentric hero (18 frames): light `maxΔmeanLum 0.00354 · totalVar 0.024 · 18/18 distinct frames`; dark `maxΔmeanLum 0.00511 · totalVar 0.027 · 18/18 distinct`. All frames distinct (not frozen) AND every consecutive Δ small/bounded (no discontinuous jumps). Edge energy oscillates 0.026↔0.040 = the contours bunch/relax as the wave crosses.
- **Smooth pointer deform, no stuck heave.** enter→sweep→flick→leave gesture series: the mean tracks the pointer (light 0.763→0.774→0.761→0.766; dark 0.744→0.750→0.740→0.737), and the post-leave settle residual is tiny (light 0.00511, dark 0.00646) → no residual stuck heave.
- **Page chrome intact.** Recessive grid/aurora background (no conic banding, no oversaturation), configurator controls, dock nav all render correctly in both engines; the concentric hero fits its stage envelope (`fitsEnvelope: true`, 673×700 in its 673×700 stage). The blank-in-WebKit is isolated to the viz canvas.
- **Palette.** The demo uses a consumer preset (`CONCENTRIC_PRESET_WARM`), respected verbatim in both modes by design (the per-mode ember flip only fires on the library-default token), so light≈dark warm palette is EXPECTED, not a defect.

## Computed checks
| check | Chrome light | Chrome dark | note |
|---|---|---|---|
| data-capture-ready | yes (3.8s) | yes (3.8s) | deterministic readiness |
| canvasCount | 2 | 2 | recessive `.aurora-canvas` (opacity 0.5) + `.concentric-canvas` hero |
| docAnimations | 0 | 0 | field motion is rAF/GL, not WAAPI |
| concentric fitsEnvelope | true | true | 673×700 in 673×700 stage |
| glRenderer | ANGLE Metal Apple M5 Max | ANGLE Metal Apple M5 Max | real GPU |

## PRM
Not separately certified — the verdict is already FAIL on the two blocking defects above; a PRM one-static-frame check is owed at re-judge once the viz paints in both engines.

## Evidence (all resolve on disk under `docs/tranches/BG/audit/visual/BG.W-CONCENTRIC-LEVELCURVES-paint/`)
- `concentric-chrome-light-full.png` (1440×900) · `concentric-chrome-dark-full.png` (1440×900) — full-page context + engine badge.
- `concentric-chrome-light-hero.png` / `concentric-chrome-dark-hero.png` (673×701) — the DASHED-contour hero.
- `concentric-chrome-light-hero-2x.png` (2× backing) — dashing persists at retina backing.
- `concentric-safari-light-viewport.png` (2880×2400) — WebKit context + badge, BLANK stage.
- `concentric-safari-light-tall.png` / `concentric-safari-dark-tall.png` (2880×3800) — WebKit no-scroll tall capture.
- `concentric-safari-light-hero.png` / `concentric-safari-dark-hero.png` (1346×1436) — WebKit blank concentric crop, both modes.
- capture tooling: `chrome-concentric.mjs`, `chrome-retina.mjs`, `wkshot-concentric.m`, `webkit-console.mjs`, `webkit-screenshot.mjs`, `probe-canvases.mjs`, `crop.mjs`.

## mustFix[]
1. **WebKit paint (BLOCKING).** Make the concentric viz render in WebKit/Safari (WebGPU-absent → WebGL2 fallback). Fix `concentricGLSetup.ts` / `concentric.glsl.ts` so the GL2 fallback paints the topographic field in WebKit (parity with the working aurora GL2 fallback). Re-judge: WebKit concentric hero `edge > ~0.02`, structured (not `mean≈0.95 edge≈0`).
2. **Continuous contours.** Fix `contourInk` (concentric.glsl.ts/.wgsl.ts) so every contour is a continuous unbroken band at every DPR (no dashing), with the index/minor two-tier hierarchy legible (index solid+heavier, minor finer+continuous). Re-judge at 2880×1800 both engines.
3. Re-run the full dual-engine both-modes π incl. the PRM one-static-frame check after (1)+(2) land.
