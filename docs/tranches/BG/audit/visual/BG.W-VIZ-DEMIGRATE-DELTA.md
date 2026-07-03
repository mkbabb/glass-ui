# BG.W-VIZ-DEMIGRATE — dual-engine paint DELTA

**Wave:** 6.3 BG.W-VIZ-DEMIGRATE (6.3+6.7 ATOMIC), band F9
**Judge:** non-authoring paint judge (did NOT build it)
**Date:** 2026-07-03
**Routes:** `/substrates/fourier-field`, `/substrates/constellation`
**Method:** C18 dual-engine `?capture=` over BUILT `:5200` (`demo:dist:build` → `vite preview`, asset hash `index-DH5WvP_n.js`), `data-capture-ready` polled, in-pixel engine badge decoded for provenance.

## VERDICT: **PASS**

Both viz (fourier-field epicycle field + constellation proximity-graph lattice) render **correctly, no regression, BOTH modes, on BOTH engines**. Both named gates GREEN. All 23 capture PNGs resolve on disk. The de-migrate wave introduces no paint regression (the SOURCE de-migration + `.wgsl` delete are deliberately scoped to wave-7/G7; the current viz render correctly on their existing substrate path).

---

## Gate state (verified live)

| Gate | Result | Key facts |
|------|--------|-----------|
| `proof:constellation-gen` | **GREEN** | G1-G6 + UNIT all ✓; `DEFAULT_PARALLAX===0` LX.1 protector holds (`constants.ts:146`) |
| `proof:gpu-substrate-single` | **GREEN** | parity statuses incl. `fourier-field:no-migrate`, `constellation:no-migrate`; every WebGL2/Canvas2D clause GREEN |

Source de-migration fence verified: the `.wgsl` primaries + `useFourierField`/`useConstellation` `createGpuSubstrate` path are STILL present at this commit (the delete rides G7); the viz `dir` + `index.ts` keys + the GLSL/Canvas2D fallback are preserved. This wave's job was the parity-table decision record + gate-NOTE prose flips + **the live paint verification** — that is what this DELTA judges.

---

## Evidence matrix (per surface × engine × mode)

### Chrome — real Chrome.app / Metal GPU (CDP → :9466), the proven C18 leg
Provenance badge decoded in every PNG: `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max) · 1440×900 @2x`.

| Surface | light | dark | Read |
|---------|-------|------|------|
| fourier-field viz | ✓ | ✓ | epicycle chain (rotating circles) + pink/orange reconstruction curve + radial arms + "N 4/16 playing" + full configurator studio |
| constellation viz | ✓ | ✓ | proximity-graph lattice tiles (opacityCeiling 1.0 full + 0.4 recessed) — nodes joined by distance-falloff hairlines; recessive background field |
| hero / chrome | ✓ | ✓ | hero title fits its envelope; recessive background calm (no conic, no oversaturation); grain calm |

### Safari — off-screen WKWebView (`wkshot-live.m`), the proven C18 Safari leg
Provenance badge decoded in every PNG: `ENGINE WEBKIT · GPU Apple GPU · 1440×900 @2x`.

- Page + chassis + configurator + dock + glass surfaces + hero: **render correctly, both modes.**
- Viz canvases **MOUNT with LIVE `webgl2` contexts** (probe `ctx:["webgl2-live",...]`) — no GL-init failure on WebKit.
- Viz **animation pixels blank** — **PROVEN off-screen-WKWebView `document.hidden` / no-rAF harness limitation, NOT a regression** (see below).

### WebKit-engine viz cross-check — Playwright headless WebKit (drives rAF)
Provenance badge decoded: `ENGINE SAFARI · GPU Apple GPU`.

| Surface | light | dark | Read |
|---------|-------|------|------|
| fourier-field viz | ✓ | ✓ | epicycle chain + reconstruction curve render correctly on the WebKit engine |
| constellation viz | ✓ | ✓ | proximity-graph lattice tiles render correctly on the WebKit engine |

This POSITIVELY confirms the WebKit-engine viz animation is correct — the off-screen-WKWebView blank is purely the no-rAF harness limitation.

---

## The off-screen-WKWebView blank is a HARNESS limitation, not a WebKit regression (proven)

The off-screen WKWebView renders pure-rAF WebGL viz blank. Root-caused, not hand-waved:

1. **Probe:** the off-screen WKWebView reports `{"hidden":true,"vis":"hidden"}`. `createCanvasLifecycle` (`src/composables/glass/webgl/createCanvasLifecycle.ts:373-377`) parks the rAF loop on `document.hidden` → pure-rAF viz never advance a frame → blank.
2. **Forced-visible test:** injecting a `documentStart` WKUserScript overriding `document.visibilityState → "visible"` / `document.hidden → false` (probe confirms `{"hidden":false,"vis":"visible"}`) **still blanks** — an off-screen WKWebView has no display link, so rAF is not driven regardless of visibility. The `webgl2-live` context proves the WebKit GL path initializes cleanly; only the frame pump is absent.
3. **Aurora precedent:** the aurora GL background rendered vividly in a prior off-screen-WKWebView Safari capture (`BG.W-FIELD-AURORA-paint/safari-substrates_aurora-dark.png`) ONLY because aurora paints a one-shot CSS/2D fallback ground synchronously at arm; fourier-field + constellation are pure rAF with no one-shot ground, so they stay blank in the same harness.
4. **Resolution:** the rAF-driving Playwright headless WebKit renders both viz correctly (above) — the WebKit engine paints these viz identically to Chrome (parity numbers below).

---

## Quantitative pixel analysis (screenshot PNGs)

### Fourier viz region (epicycle canvas + configurator) — distinct 4-bit color buckets
| capture | stdev | distinctBuckets | note |
|---------|-------|-----------------|------|
| fourier-chrome-light | 21.49 | **174** | epicycle multi-hue curve |
| fourier-chrome-dark | 27.12 | **162** | |
| fourier-pwwebkit-light | 21.87 | **206** | WebKit engine |
| fourier-pwwebkit-dark | 26.84 | **190** | WebKit engine |
| fourier-safari-offscreen (BLANK ref) | 26.89 | **62** | configurator-only structure; no epicycle |

Rendered captures carry ~100-140 extra color buckets (the reconstruction curve's pink/orange gradient) vs the blank off-screen reference.

### Constellation "full" demo-tile interior (pure lattice, no text)
| capture | stdev | buckets | edgeJumps (nodes+hairlines) |
|---------|-------|---------|------------------------------|
| const-chrome-light (RENDERED) | 6.45 | 25 | **4040** |
| const-pwwebkit-light (RENDERED) | 6.14 | 27 | **3940** |
| const-safari-offscreen-light (BLANK) | **0.00** | **1** | **0** |

Definitive: the rendered tiles show ~4000 edge jumps (the drawn lattice); the off-screen-WKWebView tile is a **perfectly flat plate (stdev 0, 1 bucket, 0 edges)** — the blank harness artifact. Chrome and WebKit render statistically identical lattices (stdev 6.45 vs 6.14; edges 4040 vs 3940) — cross-engine parity.

---

## Criteria checks

- animationTimeline / `getAnimations()`: `runningAnims:0` — expected (canvas rAF viz do not register as Web Animations).
- `main.children.length`: 3 on both routes — consistent structure.
- canvas mount / glContextCount: fourier = 2 canvases (aurora bg + viz); constellation = 10 canvases (full-page bg field + demo instances) — all mounted, `webgl2-live`; one live GL/route budget respected.
- Visual: recessive aurora/constellation backgrounds calm (no conic, no oversaturation); grain calm; hero fits its envelope. ✓
- Every capture PNG resolves on disk (23 PNGs). ✓

## Observation (not a defect, not this wave's scope)
The constellation story prose reads "Canvas2D substrate / useCanvas2D substrate" while the current SOURCE still composes `createGpuSubstrate` (WebGPU-first + WebGL2 fallback). This prose↔source reconciliation is the G7 source-de-migration's job (explicitly deferred per the cursor row); it does not affect the paint truth — the viz render correctly regardless of substrate. Recorded for G7.

---

## Capture manifest (all under `docs/tranches/BG/audit/visual/BG.W-VIZ-DEMIGRATE-paint/`)

Chrome (top): `demigrate-substrates_{fourier-field,constellation}-chrome-{light,dark}.png`
Chrome (viz-scroll): `demigrate-viz-substrates_{fourier-field,constellation}-chrome-{light,dark}.png`
Safari off-screen WKWebView (top): `demigrate-substrates_{fourier-field,constellation}-safari-{light,dark}.png`
Safari off-screen WKWebView (viz-scroll + longsettle + vis-forced): `demigrate-viz-substrates_*-safari-*.png`
Playwright WebKit (viz): `demigrate-viz-substrates_{fourier-field,constellation}-pwwebkit-{light,dark}.png`
JSON: `chrome-results.json`, `chrome-vizscroll-results.json`, `pw-webkit-results.json`, `pixel-analysis.json`
Harnesses: `BG.W-VIZ-DEMIGRATE-chrome-capture.mjs`, `-chrome-vizscroll.mjs`, `-pw-webkit-viz.mjs`, `-pixel-analysis.mjs`, `BG.W-VIZ-DEMIGRATE-wkshot-scroll.m`
