# BG.W-GRID-AFFINE — paint judge DELTA

**Verdict: FAIL** (dual-engine, both modes — the load-bearing FAIL is Chrome/Metal, both modes, visual + quantitative).

Route: `/substrates/liquid-grid` · Judge: non-authoring paint judge · Built bytes on `:5200` (`demo:dist:build` + `vite preview`).

## Method (the proven C18 dual-engine pipeline)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).
- `npm run demo:dist:build` (clean) → `npm run demo:dist:serve` (`vite preview --port 5200`).
- **Chrome leg** — real Chrome.app 149 `--use-angle=metal`, CDP `:9333`; `?capture=/substrates/liquid-grid&mode=<m>`; poll `data-capture-ready`; GL_RENDERER decoded = **ANGLE Apple M5 Max (real Metal GPU)**. The viz card sits BELOW the reported scrollHeight (the hero page is taller than the scroll box) so the full-page shot misses it — the canvas is captured by `scrollIntoViewIfNeeded()` (un-parks `content-visibility:auto`) then element-screenshot frame-series.
- **Safari leg** — system WebKit.framework (Safari 26, Apple GPU) off-screen `WKSnapshot`; badge decoded = **WEBKIT / Apple GPU**. Hero shot via `wkshot-live`; canvas shot via `wkshot-scroll` (this dir — scrolls the below-fold canvas into the 1440×900 viewport before snapshot).

## Captures on disk (all resolve)

| Engine | Mode | Hero (route-resolves provenance) | Viz canvas |
|---|---|---|---|
| Chrome/Metal | light | `BG.W-GRID-AFFINE-paint/gridaffine-chrome-light-desktop-full.png` | `frame-light-{0,350,700,1050,1400}.png` |
| Chrome/Metal | dark | `BG.W-GRID-AFFINE-paint/gridaffine-chrome-dark-desktop-full.png` | `frame-dark-{0,350,700,1050,1400}.png` |
| WebKit/Apple | light | `BG.W-GRID-AFFINE-paint/gridaffine-safari-light-desktop-full.png` | `gridaffine-safari-light-canvas.png` |
| WebKit/Apple | dark | `BG.W-GRID-AFFINE-paint/gridaffine-safari-dark-desktop-full.png` | `gridaffine-safari-dark-canvas.png` |
| PRM-static | reduce | — | `prm-frame-a.png` / `prm-frame-b.png` (byte-identical) |

## The load-bearing FAIL — the grid "shimmers with noise", it does NOT "breathe like a liquid sheet under a lens"

The criteria's binding verdict is failed. In Chrome/Metal, **both modes**, the MAJOR gridlines read as a **jagged crackle / craquelure** — many sharp kinks and breaks along every line — NOT "a single MAJOR gridline bowing as ONE smooth continuous curve across the full frame (centerline curvature varies smoothly, zero kinks/breaks)". Cells do NOT deform as coherent near-parallelogram patches; their boundaries are broken/jagged. The animation IS live (t=0 ≠ t=700, the wave moves — not parked), so this is the actual liquid-grid render, not a stale/blank frame.

### Quantitative centerline read (`analyze-centerline.mjs` — traces one MAJOR horizontal gridline's y(x) centerline; counts 2nd-difference sign-changes = kinks)

| Frame | mode | bow-band (px) | kink sign-changes | kinks / 100px | mean |Δ²y| |
|---|---|---|---|---|---|
| frame-light-0 | light | 29 | **86** | 12.9 | 2.12 |
| frame-light-700 | light | 28 | **70** | 10.5 | 1.95 |
| frame-light-1400 | light | 32 | **56** | 8.4 | 1.58 |
| frame-dark-350 | dark | 32 | **60** | 9.0 | 2.53 |
| frame-dark-1050 | dark | 32 | **83** | 12.5 | 2.62 |

A single smooth low-order affine bow would show ~1–4 curvature sign-changes across the full frame. Measured: **56–86** — roughly **one kink every 8–12 px**. Cell spans are ~130 px (major) / ~27 px (minor), so the line reverses curvature MULTIPLE times within a single minor cell → sub-cell high-frequency jitter. This is precisely the "per-pixel jitter / per-cell kink" the wave spec A1 forbids ("NEVER per-pixel high-frequency displacement … locally affine at the cell scale (warp Jacobian ~constant across any one cell)").

## What PASSES (recorded so the fix is scoped to the warp only)

- **Route + subpath resolve.** `?capture=/substrates/liquid-grid` boots; `h1 = "Liquid Grid"`; `[data-testid="liquid-grid-canvas"]` present; `./liquid-grid` export present in `package.json`.
- **Old key `/paper-grid` DEFINITION-ABSENT.** `src/components/custom/paper-grid/` gone; `dist/paper-grid.{js,d.ts}` gone; no `./paper-grid` export. (Minor doc nit, non-blocking: a stale prose comment in `src/styles/tokens/scale-paper.css:155` still says `<PaperGrid>` — rename to `<LiquidGrid>`.)
- **Static `.paper-grid` / `--paper-grid-texture` card register BYTE-UNTOUCHED** and present (`src/styles/cards.css`) — the homonym died on the viz side only, as intended.
- **PRM static.** Under `prefers-reduced-motion: reduce`, two frames 1.2 s apart are byte-identical (sha `291adf80…` == `291adf80…`) → the warp freezes mid-breath, the grid holds static. PASS.
- **AA edge-crispness.** Line EDGES are crisp 1–2 px (the Ben Golus derivative-AA works — no CSS blur). The failure is the line PATH (warp geometry), not the edge AA.
- **glContextCount = 2** (1 persistent shell aurora `fixed -z-10` + 1 viz) — matches every substrate route; the shell aurora reads recessive warm-cream, no conic/oversaturation (Safari hero). Not a defect.

## Safari canvas — ambiguous, NOT the load-bearing failure

The off-screen `WKSnapshot` of the liquid-grid canvas reads as a **flat gray plate (no visible grid)** at BOTH 1.6 s and 4.5 s post-scroll arm waits (byte-identical output → not a timing race). This is EITHER (a) a genuine Safari-26 WebGPU non-paint of the viz OR (b) an off-screen-WKWebView limitation (WebGPU contexts not compositing into `takeSnapshotWithConfiguration` for a webview never added to a window — the proven C18 pipeline was validated on the non-GL `/containers/accordion` route, so its GL-capture capability was never proven). The paint-judge cannot disambiguate with the off-screen harness; recorded as a fix-agent investigation rider. The verdict does NOT rest on it — the Chrome/Metal crackle (a real engine on a real GPU, both modes, quantified) is the load-bearing FAIL.

## defectLocalization

- **Root cause — the shared `waveFlow` leaf samples the curl potential at a wavelength of ~1 CELL** (`src/composables/glass/wave/waveField.glsl.ts`, `waveFlow`, lines ~107–114):
  ```glsl
  vec2 f  = curlFBM(vec2(g.x * 0.6 + t*0.05, g.y * 0.6 - t*0.04));
  vec2 f2 = curlFBM(vec2(g.x * 1.1 - t*0.03, g.y * 1.1 + t*0.035));
  float k = twistMax * env;              // twistMax=0.62 (constants.ts)
  return g + (f + f2 * 0.5) * k;
  ```
  `g` is in GRID UNITS (`g0 = uv * uGridScale`), so sampling the curl potential at `g*0.6` / `g*1.1` gives a warp-displacement wavelength of ~0.9–1.7 cells — i.e. the warp spatial frequency ≈ the grid frequency (and 3–5× the MAJOR-line frequency `g/majorEvery`). The displacement Jacobian therefore varies strongly WITHIN each cell → `fract(g)` jitters sub-cell → the major lines crackle (56–86 curvature reversals) instead of bowing smoothly. Compounded by the multi-octave `potentialFBM` fractal (highest octaves ≪ cell wavelength) and the `f2` 1.1× term.
- **The WGSL primary twin must match** — `src/components/custom/liquid-grid/shaders/liquid-grid.wgsl.ts` (and the WGSL `waveFlow`/`waveField` source it transcribes) carries the same sampling; the JS↔WGSL↔GLSL round-trip fence (gate P3) means the fix lands in all transcriptions identically.
- **Shared-leaf caution (A2):** `waveFlow` is READ by Concentric too (the DRY coupling). A frequency drop here moves both — the fix MUST re-verify Concentric's level-curves still read (do not shatter/over-flatten) in the same close.

## mustFix[]

1. **Make the warp locally affine at the cell scale.** Sample the curl-flow potential at a spatial frequency an order of magnitude BELOW the grid frequency (e.g. `curlFBM(g * ~0.03–0.08)` — wavelength of MANY cells) and/or drop the high fbm octaves on the warp path, so across any one cell the displacement gradient is ~constant. Target: a traced MAJOR gridline shows ≤ ~4–6 curvature sign-changes across the full frame (a single smooth continuous bow), not 56–86. Keep the bow AMPLITUDE (twistMax≈0.62 reads as a clear liquid bow — the amplitude is fine; only the FREQUENCY is wrong).
2. **Apply the same frequency correction in the WGSL primary + GLSL fallback identically** (the round-trip fence, gate P3) so Chrome-WGPU / Chrome-WebGL2 / Safari all paint the same smooth sheet.
3. **Re-verify Concentric** (shares `waveFlow`) still reads correctly after the leaf tune (A2 — a leaf tune re-verifies concentric in the same close).
4. **Investigate the Safari viz paint** — confirm on a real on-screen Safari 26 whether the WebGPU liquid-grid actually paints (rule out a genuine WebKit non-paint vs the off-screen-snapshot limitation). If it is a real non-paint, that is a second, independent FAIL to fix.
5. (Minor) rename the stale `<PaperGrid>` prose comment in `src/styles/tokens/scale-paper.css:155` → `<LiquidGrid>`.

## Re-judge criteria (unchanged)

A ripple-crossing frame-series traces a single MAJOR gridline bowing as ONE smooth continuous curve across the full frame (zero kinks/breaks); cells deform as coherent near-parallelogram patches; AA crisp at every DPR; PRM static; renamed route+subpath resolve, old key DEFINITION-ABSENT. Verdict must read "the grid breathes like a liquid sheet under a lens", not "the lines shimmer with noise". Dual-engine, both modes.
