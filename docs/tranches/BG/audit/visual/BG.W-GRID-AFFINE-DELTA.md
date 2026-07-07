# BG.W-GRID-AFFINE — dual-engine paint DELTA

**Verdict: PASS (dual-engine — Chrome/Metal WGSL + WebKit/WebGL2-GLSL-twin + real Safari/Metal WGSL-armed, BOTH modes).**

This re-judge SUPERSEDES the prior FAIL (the "MAJOR gridlines read as high-frequency CRACKLE/craquelure" verdict, 56–86 curvature sign-changes/line): with the LOCALLY-AFFINE FREQUENCY-FLOOR fix integrated at the shared `waveFlow` leaf (`warpFreq` param, liquid-grid feeds `0.03`), the grid now bows as ONE smooth continuous sheet.

Judge: non-authoring paint judge (did not build). HEAD `dd96620c`, branch `tranche/BG`.
Captured 2026-07-07 over BUILT bytes (`npm run demo:dist:build` → `vite preview :5200`), the proven C18 `?capture=<route>&mode=<m>` dual-engine pipeline (poll `data-capture-ready`, never a fixed sleep). Siblings intact (exit 0) before + after.

**The affine frequency-floor fix is painted-true: the grid breathes like a liquid sheet under a lens** — a single MAJOR gridline bows as ONE smooth continuous curve, cells deform as near-parallelogram patches. The prior "shimmers with noise" crackle is GONE.

## Provenance (in-pixel engine badge decoded)

| leg | engine badge | GPU | live channel | modes |
|-----|-------------|-----|--------------|-------|
| Chrome (CDP, on-screen Chrome 149.app) | `ENGINE CHROME` | `ANGLE Metal — Apple M5 Max` (real GPU, not SwiftShader) | WGSL / WebGPU | light + dark |
| Safari WKWebView (system WebKit.framework / Metal, off-screen) | `ENGINE WEBKIT` | `Apple GPU` (2880×1800 retina-2×) | WGSL / WebGPU — **live in-engine** | light + dark |
| WebKit engine (Playwright WebKit — no WebGPU) | — | `Apple GPU` | **WebGL2 (GLSL twin, same shared math)** | light + dark |

## The affine read — the binding criterion

**A1 — the ripple warps the GRID COORDINATE with a smooth low-order field, locally affine at the cell scale.** Source: liquid-grid feeds `LIQUID_GRID_WARP_FREQ = 0.03` into the shared `waveFlow` leaf (a CELL-scale coordinate span ~14–40 cells → base warp wavelength ≈ MANY cells, an order of magnitude below the grid frequency → the warp Jacobian is ~constant across any ONE cell). Painted truth:

- **Single-major-line trace (Chrome/Metal).** An upscaled 4× strip around a major vertical line (`grid-affine-cap/strip-light-x334.png`, `strip-dark-x340.png`) shows the line as ONE smooth continuous S-curve top-to-bottom — zero kinks, zero craquelure (the visible stair-steps are the nearest-neighbor upscale of AA pixels, not curve kinks). The bow wavelength ≈ the full frame height.
- **Full-frame gestalt.** `liquid-grid-chrome-{light,dark}-viz0.png` / `-viz3.png`: the two-tier grid (bold major every 5 cells + fine minor) bows + shears as ONE coherent sheet; neighboring intersections move near-rigidly (the affine read — near-parallelogram cells). Frame0→frame3 differ → a LIVE traveling wave (breathing).
- **AA crisp at every DPR.** Chrome 1× crisp; WebKit 2× retina (`liquid-grid-webkit-gl2-*-viz.png`) crisp — the Golus derivative-AA reads the FINAL warped coordinate, one device-pixel line at both DPRs.

**A2 — the shared `waveField`/`curlFBM` leaf is READ not forked; concentric re-verified.** The leaf `waveFlow` carries `warpFreq` as a param (JS `waveField.ts` + `waveField.glsl.ts` + `waveField.wgsl.ts` — one source, three transcriptions; `WAVE_FLOW_SECOND_RATIO = 1.833333`). Concentric keeps the unit-scale `0.6` at its OWN `waveFlow` calls (`concentric.glsl.ts:108`, `concentric.wgsl.ts:126` — byte-unchanged) and re-verifies painted: `concentric-chrome-light-reverify.png` reads as coherent nested topographic contours (lum sd 23.06, min 125.7→max 235) — NOT shattered by the leaf tune.

**A3 — the RENAME (clean break, no alias).** Route `/substrates/liquid-grid` resolves + paints; old `/substrates/paper-grid` → **404 "Lost in the lattice"** (DEFINITION-ABSENT). `src/components/custom/liquid-grid/` present (`LiquidGrid.vue`); `paper-grid/` dir absent; the `PaperGrid` viz identifier is absent (only wave-ID comments + static-register doc mentions survive). Subpath `src/subpaths/liquid-grid.ts` + `package.json` `./liquid-grid` export present; `dist-demo/assets/liquid-grid-*.js` emitted; old `./paper-grid` export + chunk absent. The STATIC `.paper-grid`/`--paper-grid-texture` paper register in `cards.css` is BYTE-UNTOUCHED (last commit `3ea6b051`, an unrelated wave) — the homonym dies on the viz side only.

**A4 — warm-foreground ink over transparent.** Light: warm-cream plate, warm-ink lines, page reads through. Dark: warm-**brown** plate (NOT gray) + lighter warm-ink lines. Both modes both engines — warm identity held; the shell aurora reads recessive (faint warm grid/paper wash in the page margins, no conic banding, no oversaturation).

**PRM static.** Under `prefers-reduced-motion: reduce`, two Chrome frames 750ms apart are **byte-identical** (`changedFrac = 0`; `liquid-grid-chrome-prm-frame1.png` / `-frame2.png`) — the warp freezes mid-breath, the grid holds crisp.

## The WKWebView WebGPU-snapshot limit (NOT a render failure) — resolved per precedent

The off-screen WKWebView `takeSnapshotWithConfiguration` renders the viz canvas FLAT GRAY in both modes (`liquid-grid-safari-{light,dark}-viz.png`) — the route chrome, engine badge, and the whole configurator panel composite correctly, but the WebGPU-backed canvas layer does not flatten. This is the ESTABLISHED `takeSnapshotWithConfiguration`-cannot-flatten-a-WebGPU-layer tooling limit (BG.W-DOTFLOW-REBUILD / W-FOURIER-BEAUTY precedent), NOT a liquid-grid render failure. Independently reproduced + resolved two ways by this judge:

1. **In-engine WebGPU-armed readback (real Safari 26 / Metal).** After `data-capture-ready`: `navigator.gpu` present, viz canvas sized `1346×1400` (2× backing of the 673×700 CSS box), and **`getContext('webgl2') === null` AND `getContext('webgl') === null`** → the `useGpuSubstrate` picker committed the WGSL/WebGPU pipeline with NO fallback (a shader-validation failure would fall to WebGL2 → non-null). The full WGSL pipeline armed live in-engine.
2. **WebKit-engine WebGL2 GLSL twin (Playwright WebKit, no WebGPU).** `navigator.gpu` absent → the picker falls to the byte-identical WebGL2 (GLSL) channel — the exact path a non-WebGPU WebKit user hits, AND the channel `locator.screenshot()` CAN flatten. It paints the SAME affine liquid grid in BOTH modes (`liquid-grid-webkit-gl2-{light,dark}-viz.png`; light lum min 57.4→max 222.7, dark min 55→max 199.9 — the warm-ink grid present) — the shared math is correct on WebKit's rendering engine.

## Captures on disk (all resolve)

Full route (engine badge + recessive shell + hero): `liquid-grid-{chrome,safari}-{light,dark}-desktop-full.png`
Chrome/Metal viz frame-series: `liquid-grid-chrome-{light,dark}-viz0.png`, `-viz3.png`
WKWebView viz (WebGPU snapshot-limit blank): `liquid-grid-safari-{light,dark}-viz.png`
WebKit-engine GLSL-twin viz (painted): `liquid-grid-webkit-gl2-{light,dark}-viz.png`
Single-major-line upscaled strips: `grid-affine-cap/strip-light-x334.png`, `strip-dark-x340.png`
PRM-static pair: `liquid-grid-chrome-prm-frame1.png`, `-frame2.png`
Concentric leaf-tune re-verify: `concentric-chrome-light-reverify.png`
Capture/probe harnesses: `grid-affine-cap/{grid-affine-chrome.mjs,grid-affine-viz.mjs,webkit-gl2.mjs,prm-and-concentric.mjs,trace-gridline.mjs,crop-strip.mjs,wkshot-scroll.m,wkshot-probe.m}`

## Verdict

Every surface reads correct in BOTH engines + BOTH modes, and every capture PNG resolves on disk. The affine frequency-floor fix is painted-true: MAJOR gridlines bow as ONE smooth continuous curve, cells deform as coherent near-parallelogram patches, AA crisp at every DPR, warm identity over transparent, PRM-static, renamed route+subpath resolve with the old key DEFINITION-ABSENT. **PASS → DONE.**
