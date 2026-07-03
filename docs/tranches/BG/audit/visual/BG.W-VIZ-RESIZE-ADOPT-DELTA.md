# BG.W-VIZ-RESIZE-ADOPT — paint DELTA (dual-engine, both modes)

**Verdict: PASS.** The viz-resize hard-adopt (`backing == round(getBoundingClientRect × effectiveDpr)`,
no stretch/blur) reads correct on the PAINTED truth across all 9 substrate vizzes, in BOTH engines
(real Chrome / ANGLE-Metal + real Safari / system-WebKit + WebKit-engine DOM probe), in BOTH modes,
on the FRESH mount AND after real in-app SPA navigation. Non-authoring judge — I did not build this;
I verified the pixels + the computed DOM.

## Method (proven C18 dual-engine `?capture=` harness over BUILT `:5200`)

- `npm run demo:dist:build` (exit 0) → `vite preview :5200` (BUILT bytes, not `:5199` dev).
- **Chrome leg:** real `/Applications/Google Chrome.app` `--remote-debugging-port=9466`,
  `connectOverCDP`, `newContext({ colorScheme, deviceScaleFactor: 2 })`,
  `goto ?capture=<route>&mode=<m>`, poll `data-capture-ready`, GL_RENDERER + computed-DOM canvas probe,
  `page.screenshot` 1440×900@2x. GL_RENDERER = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` — real Metal GPU.
- **Safari leg:** `clang … wkshot-live.m -o /tmp/wkshot-live`, then
  `/tmp/wkshot-live "http://localhost:5200/?capture=<route>&mode=<m>" out.png <m> 15000`
  (polls `data-capture-ready` before the off-screen WKWebView snapshot — system WebKit.framework, no TCC).
  Each snapshot 2880×1800 (2× of 1440×900).
- **Provenance = in-pixel engine badge decoded from pixels** (`demo/capture/engine-badge.ts` — black panel,
  magenta `#ff00ff` border locator, green `#00ff66` mono text). Every one of the 36 captures carries the badge
  (magenta-border pixel count Chrome ≈7952 / Safari ≈6432; green-text present in all 36).
- **Second-engine computational confirmation:** the SAME `backing == round(gBCR × effDpr)` DOM probe run under
  Playwright-WebKit (the WebKit engine family) for a numeric dual-engine backing assertion; the real-Safari
  system-WebKit snapshots are the binding PIXEL truth.

## Gate + type preconditions

| check | result |
|---|---|
| `npm run proof:viz` | **GREEN** (V1 one-sizer-gBCR · V2 no-self-measure · V3 no-self-size · V4 dprPolicy×9 · V5 leaf-routes · P1 registry≥11 · P2 pairwise-distinct · P3 card-dispatch · P4 device-free-memoized) |
| `npm run proof:viz:selftest` | **GREEN** — every planted defect RED ✓ |
| `npm run typecheck` (vue-tsc `--noEmit` + test project) | **exit 0, clean** |

## The backing-store computational truth — `backing == round(gBCR × effectiveDpr)`, uniform, crisp

The wave's `dpr` is each viz's EFFECTIVE dpr POLICY (V4 dprPolicy×9), NOT `window.devicePixelRatio==2`.
The paint assertion per canvas: (a) uniform scale on both axes `|w/cssW − h/cssH| < 0.02` → **no stretch**;
(b) `effDpr ∈ [1, window.dpr]` → **crisp, not upscaled-blurry, respects the policy cap**;
(c) `|w − round(cssW·effDpr)| ≤ 0.5` and same on H → **integer render target, no fractional blur**.

The split is by-design and consistent across engines: the full-bleed **background** wash caps at **d≈1.5**
(the aurora sub-2×-DPR cap — the recessive backdrop), the **focal** demo canvases render at **d≈2** (full DPR).

| engine | fresh-boot (9×2) | SPA-nav `$router.push` (9×2) |
|---|---|---|
| **Chrome (ANGLE Metal, M5 Max)** | **0/18 FAIL** | **0/18 FAIL** |
| **WebKit engine (Playwright)** | **0/18 FAIL** | **0/18 FAIL** |
| **Safari (system WebKit, Apple GPU)** | crisp non-stretched pixel render, all 9 both modes | — (single-load snapshot tool) |

**Hard-adopt demonstrated across engines:** the per-engine page height differs and the canvas backing tracks
each engine's OWN `gBCR` exactly — e.g. the full-page constellation background is `2304×12407 ← 1152×6203.63`
(d2) on Chrome but `2304×11901 ← 1152×5950.41` (d2) on WebKit; aurora full-bg `1728×2481 ← 1152×1654` (Chrome)
vs `1728×2412 ← 1152×1608` (WebKit). Backing follows the live layout size — precisely the upload-only fix.

Representative per-viz backing (Chrome, both modes identical):
- aurora `1728×2481←1152×1654 (d1.5)` · `1055×1050←703.6×700.3 (d1.5)`
- blob `2160×1350←1440×900 (d1.5)` · `1536×1536←768×768 (d2)` · `1126×1126←563.2×563.2 (d2)`
- concentric `2160×1350←1440×900 (d1.5)` · `1346×1400←672.8×700 (d2)`
- constellation `2304×12407←1152×6203.6 (d2)` + 9 focal `2127×840←1063.6×420 (d2)` / `1050×600←524.8×300 (d2)`
- dot-flow-field `2160×1350←1440×900 (d1.5)` · `2066×920←1032.8×460 (d2)`
- dot-matrix `2160×1350←1440×900 (d1.5)` · `2066×920←1032.8×460 (d2)`
- fourier-field `2160×1350←1440×900 (d1.5)` · `1246×1082←622.8×541 (d2)`
- goo-dot `2160×1350←1440×900 (d1.5)` · `2066×920←1032.8×460 (d2)`
- paper-grid `2160×1350←1440×900 (d1.5)` · `1346×1400←672.8×700 (d2)`

## The visual (pixel-read) checks

- **Recessive aurora — no conic / no oversaturation.** Aurora paints a soft warm painterly wash (peach→gold light,
  warm-brown dark). satFrac (high-chroma-pixel fraction) = **0** on every one of the 36 captures — no conic banding,
  no oversaturation anywhere. Crisp display type over it.
- **Grain calm.** paper-grid reads as a calm device-pixel-crisp faint engineering-graph grid ("one device-pixel crisp
  at any DPR — the blurry-mess fix") over warm-cream; no harsh noise.
- **Hero fits its envelope.** Every hero (`Aurora`, `GooBlob`, `Dot Flow Field`, `Dot Matrix`, `Paper Grid`,
  `Constella-tion` with hyphenation, …) is crisp and contained within its tile; no overflow, no stretch/blur.
- **Provenance decoded from pixels:** Chrome badge → `ENGINE CHROME · GPU ANGLE Metal Renderer: Apple M5 Max ·
  1440×900@2x`; Safari badge → `ENGINE WEBKIT · GPU Apple GPU · 1440×900@2x`. Dual-engine confirmed.

## Non-blocking observation (OUT of the resize scope — recorded, not a defect for this wave)

- **dot-flow-field, static capture of the idle `interactive (cursor vortex)` default:** the additive trail buffer
  accumulates to a near-white bloom on Chrome-dark (meanL 137 / whiteFrac 0.39) with the vortex core visible; Safari's
  snapshot sits at scroll-top (hero) so it reads dark. This is (1) additive-trail luminance accumulation, satFrac=**0**
  (NOT chroma-oversaturation), (2) the dots are crisp (NOT resize-blur), (3) the viz's OWN copy names a "near-white bloom",
  and (4) the canvas backing is correct (d2 uniform, both engines). It is a static-capture-of-an-interactive-vortex-idle
  characteristic, NOT a `VIZ-RESIZE-ADOPT` (backing/stretch/blur) defect. Filed for a future viz-motion pass if desired.

## Captures on disk (all 36 resolve; badge crops beside)

`docs/tranches/BG/audit/visual/BG.W-VIZ-RESIZE-ADOPT-paint/`
- `vrz-<viz>-chrome-{light,dark}.png` × 9 vizzes (18, real Chrome/Metal)
- `vrz-<viz>-safari-{light,dark}.png` × 9 vizzes (18, real system-WebKit)
- `badge-vrz-*.png` × 36 (top-left engine-badge crops for provenance decode)
- `chrome-results-vrz.json` · `webkit-results-vrz.json` (per-canvas backing verdicts, fresh + SPA-nav)
- `pixel-stats-vrz.json` (badge-locator + recessive/grain stats)

Harness scripts: `BG.W-VIZ-RESIZE-ADOPT-chrome-capture.mjs` · `BG.W-VIZ-RESIZE-ADOPT-webkit-probe.mjs` ·
`BG.W-VIZ-RESIZE-ADOPT-pixel-analysis.mjs` (beside this DELTA).
