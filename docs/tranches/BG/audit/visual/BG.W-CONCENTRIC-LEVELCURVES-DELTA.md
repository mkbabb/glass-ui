# BG.W-CONCENTRIC-LEVELCURVES — dual-engine paint judge DELTA (re-judge)

**Verdict: FAIL** (one blocking defect remains — paint owed; the wave routes to a build-FIX agent).
**Route:** `/substrates/concentric`
**Judged:** non-authoring paint judge, BUILT bytes (`demo:dist:build` → `vite preview :5200`), dual-engine (real Chrome.app ANGLE/Metal via CDP + system WebKit.framework off-screen snapshot + playwright-webkit control), both modes, over the proven C18 `?capture=<route>&mode=<m>` + `data-capture-ready` method.
**Siblings-intact:** `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).
**Re-judge context:** this run re-judges the current BUILT bytes after the LC4 density-fade + LC5 exp-clamp fixes (commit `2ea7f9f5`, PAINT-PENDING). **DEFECT 2 (Chrome dashing) is now FIXED. DEFECT 1 (WebKit blank) is STILL PRESENT** — the LC5 exp-clamp fix did NOT resolve the WebKit silent non-paint.

## Provenance (engine badges decoded)
- Chrome: `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version) · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT/DARK` — real Metal GPU, not headless SwiftShader.
- Safari: `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×1900 @2x (2880×3800px) · MODE LIGHT/DARK · route SUBSTRATES · CONCENTRIC · @mkbabb/glass-ui/concentric` — system WebKit.framework (Safari 26 engine).

## Summary
The wave criteria require, **dual-engine both modes**, that the frame read as smooth NESTED level curves of one procedural height field — every contour a continuous unbroken band, index/minor hierarchy legible, zero jagged/torn arcs at 2880×1800; a traveling-wave flow with bounded per-frame ΔmeanLum; a pointer gesture that deforms the topography smoothly with no residual stuck heave; **and PASS only when every surface in BOTH engines + BOTH modes reads correct.** Concentric renders correct in Chrome but BLANK in WebKit → FAIL.

### DEFECT 1 (BLOCKING, UNRESOLVED) — the concentric viz renders BLANK in WebKit/Safari, BOTH modes
The concentric hero canvas paints NOTHING in WebKit — it is a flat cream/dark rounded plate in both modes. The LC5 exp-clamp fix (claimed to bound the WebKit/Metal fast-math `exp` NaN → the silent blank) did NOT fix it. Two INDEPENDENT WebKit capture methods agree, and the aurora control on the SAME substrate paints:

- **System WebKit.framework off-screen snapshot** (`conc-safari-{light,dark}-tall.png`, 2880×3800, tall viewport so the hero is in-frame, NO scroll): concentric hero crop `meanL 0.9483 · stdL 0.0073 · edge 0.00014` (light) / `meanL 0.9477 · stdL 0.022 · edge 0.00019` (dark) — flat, zero contour structure.
- **playwright-webkit element screenshot** (composited GL, DPR-2, same engine class, side-by-side control):
  - CONCENTRIC light `meanL 0.9807 · stdL 0 · edge 0` — perfectly uniform (a solid clear, nothing drawn).
  - CONCENTRIC dark `meanL 0.0398 · stdL 0 · edge 0` — perfectly uniform.
  - AURORA (control) light `meanL 0.8003 · stdL 0.2088 · edge 0.02413` / dark `meanL 0.2398 · stdL 0.1782 · edge 0.02469` — **paints, richly structured.** Aurora rides the SAME `createGpuSubstrate` WebGPU-first / WebGL2-fallback substrate → the failure is **concentric-specific**, NOT a substrate-wide or WKSnapshot GPU-capture limit.
- **WebKit environment probe:** `navigator.gpu` **undefined** (WebGPU unavailable → the WebGL2 fallback path is the one exercised), `webgl2: true`. Capture console = only `info: [capture] ready · route=/substrates/concentric mode=… engine=SAFARI gpu=Apple GPU`. **NO console error, NO pageerror** — a SILENT non-paint.
- **GL-state probe (concentric context, WebKit):** `type webgl2 · glError 0 · isContextLost false`. The context is valid and error-free — the shader compiles and links but the fragment output is invisible (transparent/degenerate). (`readPixels` reads 0 for BOTH aurora and concentric — neither uses `preserveDrawingBuffer` — so it is not diagnostic; the element-screenshot composite is the authoritative readback.)

**Localization (for the fix agent — the exp-clamp was insufficient):** the WebGL2 GLSL fallback path — `src/components/custom/concentric/composables/concentricGLSetup.ts` + `src/components/custom/concentric/shaders/concentric.glsl.ts` — produces no visible output in WebKit's GLSL-ES-3.0 while the aurora GL2 fallback works on the SAME substrate. The LC5 `exp(-min(d2/σ,60.0))` clamp + the `CURSOR_PARKED 1e6→1e3` sentinel did NOT resolve it → the root cause is deeper than that single `exp`. Suspects that survive an error-free compile/link yet collapse the frag to transparent on WebKit-Metal but NOT on ANGLE-Metal: (a) ANOTHER unbounded fast-math NaN source (a `pow`/`log`/`1.0/x`/`normalize(0)`/`sqrt(neg)` in the contour or hillshade path that Metal's fast-math turns to NaN → the final `mix`/alpha collapses); (b) a `#version 300 es` construct ANGLE tolerates and WebKit does not (an integer `%`, a non-constant array index, a `texelFetch`/uniform-block std140 layout divergence vs the aurora setup); (c) the fullscreen-triangle/quad vertex path not covering the viewport under WebKit; (d) a substrate-selection path that arms but never issues the GL2 draw. **Direct compare** the concentric GL2 setup+frag against the WORKING aurora GL2 setup+frag on WebKit — the difference between them IS the bug. Consider a WebKit-only diagnostic (a solid-color debug frag) to confirm whether the draw reaches the framebuffer at all before chasing a NaN.

### DEFECT 2 (Chrome dashed contours) — FIXED ✅
In the prior judgment every Chrome contour rendered as a sequence of short DASH segments with regular gaps (persisting at 2× backing). **This is resolved.** In Chrome (ANGLE/Metal) the concentric now paints smooth NESTED level curves of one procedural height field — every contour a **continuous unbroken band**, analytic hillshade relief (warm-amber ridges / cool-cream basins), the two-tier index/minor hierarchy legible, zero jagged/torn arcs. Verified on the DPR-2 hero (`conc-chrome-{light,dark}-hero.png`, backing 1346×1400): `meanL 0.816/0.814 · stdL 0.070/0.075 · edge 0.00904/0.00939` — richly structured, ~50–65× the WebKit-blank edge energy. The LC4 density-fade (`hwAA` → `dfade` smoothstep multiply on `contourInk`) reads as intended: over-dense relief fades to smooth, resolvable contours stay continuous.

## What WORKS (Chrome — the field math / flow / AA is healthy)
- **Smooth continuous nested level curves, both modes.** See hero crops — the L1 (single-field contourInk) + L3 (no aliasing shimmer / no seam / AA held) arms read correct in Chrome at 2880-class backing.
- **Alive + bounded traveling-wave flow.** Chrome hero 10-frame series over 5s (light): `10/10 distinct · maxΔmeanLum 0.00408` (means glide 0.807→0.798, monotone-bounded) → the L2/traveling-wave flow is alive with NO discontinuous jumps.
- **Page chrome intact, both engines.** Recessive grid/aurora background (no conic banding, no oversaturation), hero title fits its envelope, configurator + dock nav all render correctly in both engines. The blank-in-WebKit is isolated to the concentric viz canvas.
- **Palette.** The demo uses the consumer preset (`CONCENTRIC_PRESET_WARM`), respected verbatim in both modes by design (the per-mode ember flip only fires on the library-default token), so light≈dark warm-amber is EXPECTED, not a defect (L4 warm-divergent default held; theme via preset).

## Computed checks
| check | Chrome light | Chrome dark | WebKit light | WebKit dark |
|---|---|---|---|---|
| data-capture-ready | yes | yes | yes (4500ms) | yes (4500ms) |
| canvasCount | 2 | 2 | 2 | 2 |
| concentric hero meanL | 0.816 | 0.814 | 0.981 (blank) | 0.040 (blank) |
| concentric hero stdL | 0.070 | 0.075 | **0** | **0** |
| concentric hero edge | 0.00904 | 0.00939 | **0** | **0** |
| aurora control edge (same substrate) | — | — | 0.02413 (paints) | 0.02469 (paints) |
| glRenderer / gpu | ANGLE Metal M5 Max | ANGLE Metal M5 Max | Apple GPU (webgl2, glError 0) | Apple GPU |

## PRM
Not separately certified — the verdict is already FAIL on DEFECT 1; a PRM one-static-frame check is owed at re-judge once the viz paints in both engines.

## Evidence (all resolve on disk under `docs/tranches/BG/audit/visual/BG.W-CONCENTRIC-LEVELCURVES-paint/`)
- `conc-chrome-light-full.png` / `conc-chrome-dark-full.png` (1440×900 @2x) — full-page context + engine badge.
- `conc-chrome-light-hero.png` / `conc-chrome-dark-hero.png` (1346×1400) — the FIXED continuous-contour hero, both modes.
- `conc-safari-light-tall.png` / `conc-safari-dark-tall.png` (2880×3800) — system WebKit tall capture (hero in-frame, no scroll).
- `conc-safari-light-badge.png` — decoded WEBKIT engine badge (provenance).
- `conc-safari-light-hero.png` / `conc-safari-dark-hero.png` (1346×1436 crop) — WebKit BLANK concentric stage.
- `wkpw-aurora-{light,dark}.png` (2880×1800) — playwright-webkit aurora control (paints).
- `wkpw-concentric-{light,dark}.png` (1346×1402) — playwright-webkit concentric target (blank, stdL 0).
- capture tooling: `chrome-conc.mjs`, `chrome-motion.mjs`, `webkit-probe.mjs`, `webkit-glstate.mjs`, `crop-stats.mjs`, `wkshot-concentric.m` (+ compiled `../../.wkshot-conc-bin`).

## defectLocalization
- **File:** `src/components/custom/concentric/shaders/concentric.glsl.ts` (WebGL2 GLSL-ES-3.0 fragment) + `src/components/custom/concentric/composables/concentricGLSetup.ts` (GL2 program/uniform/attribute setup).
- **Symptom:** error-free `webgl2` context (glError 0, not context-lost), no console/page error, but the composited output is perfectly uniform (stdL 0) in WebKit both modes; the WebGPU-primary path is not exercised (`navigator.gpu` undefined) so this is the GL2 fallback only.
- **Isolation:** aurora on the identical `createGpuSubstrate` WebGL2 fallback paints correctly in the SAME WebKit context → the divergence is concentric's GL2 setup+frag, not the substrate.
- **Prior fix insufficiency:** LC5 exp-clamp (`exp(-min(d2/σ,60.0))`) + `CURSOR_PARKED 1e6→1e3` landed but the blank persists → chase a DIFFERENT WebKit-Metal divergence (a second fast-math NaN, a `#version 300 es` construct, or the draw not reaching the framebuffer).

## mustFix[]
1. **WebKit paint (BLOCKING).** Make the concentric viz render in WebKit/Safari (WebGPU-absent → WebGL2 fallback). The LC5 exp-clamp did NOT fix it — diagnose deeper: bisect `concentric.glsl.ts` against the working aurora GL2 frag (a solid-color debug frag first to confirm the draw reaches the framebuffer), then bound/repair the construct that collapses the output to transparent on WebKit-Metal but not ANGLE-Metal. Re-judge: WebKit concentric hero `edge > ~0.02`, `stdL > 0`, structured (not `stdL 0 / edge 0`), parity with the working aurora GL2 fallback.
2. Re-run the full dual-engine both-modes π incl. the PRM one-static-frame check after (1) lands. (DEFECT 2 continuous-contour arm already passes in Chrome — re-confirm it survives the WebKit fix at 2880×1800 both engines.)
