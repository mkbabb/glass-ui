# BG.W-BLOB-SATELLITE-SHADE — dual-engine paint DELTA

**Wave** F9.R1 · BG.W-BLOB-SATELLITE-SHADE (VALUEJS-R GAP-1 — the per-satellite derived-shade GL color-seam widen)
**Route** `/substrates/blob` (Blob Studio), both modes
**Verdict** **PASS** — dual-engine (Chrome + WebKit), both modes. Byte-identical default paint verified + the satellite-shade-over-a-keyed-body-hue derivation reads coherent across cream/red/teal.
**Judged** 2026-07-05 (non-authoring paint judge)

---

## Method (the proven dual-engine pipeline)

- Built bytes served on `:5200` (`npm run demo:dist:build` → `demo:dist:serve` — NOT the `:5199` dev shell).
- `?capture=/substrates/blob&mode=<light|dark>` (the C18 capture-boot: poll `data-capture-ready`).
- **Chrome leg** — real Chrome 149 over CDP `:9477`, real Metal GPU. `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`. The GL bead sits below the masthead fold, so the leg scrolls `canvas.goo-blob-canvas` (the studio hero; idx 0 is the page aurora) into view before the viewport screenshot.
- **WebKit leg** — TWO provenances:
  - **System Safari 26** via the off-screen `wkshot-live` WKWebView (WebKit.framework + Metal, no Screen-Recording TCC). Snapshots the viewport at scroll-0 = the masthead — stands as the **route-boots-in-system-WebKit + Apple-GPU + correct-mode provenance** (badge `ENGINE WEBKIT · GPU Apple GPU`). 2880×1800 retina.
  - **Real WebKit blob paint** via `playwright.webkit` (real WebKit content process + Metal-ANGLE on Apple Silicon; `GL_RENDERER = Apple GPU`, badge decodes `ENGINE SAFARI`), scrolling the bead into view — the WebKit **blob paint** the judge reads. 2880×1800 @2×.
- **Keyed-body-hue leg** — real Chrome/Metal, interactive route, drives the studio preset chips to two DISTINCTLY-keyed body hues so the satellite-shade derivation is read as HUE-FOLLOWING (not a fixed color): Excited (warm-red seed `oklch(0.62 0.19 25)`), Shy (cool seed `oklch(0.6 0.2 250)` → complementary-harmony teal).
- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).

## Captures (all resolve on disk, `docs/tranches/BG/audit/visual/blob-satellite-shade/`)

| # | file | engine / GPU | mode | subject |
|---|------|--------------|------|---------|
| 1 | `blob-chrome-light.png` | Chrome 149 / Metal M5 Max | light | studio hero bead |
| 2 | `blob-chrome-dark.png` | Chrome 149 / Metal M5 Max | dark | studio hero bead |
| 3 | `blob-webkit-light.png` | WebKit / Apple GPU | light | studio hero bead |
| 4 | `blob-webkit-dark.png` | WebKit / Apple GPU | dark | studio hero bead |
| 5 | `blob-safari-light.png` | system Safari 26 / Apple GPU | light | route-boot provenance (masthead) |
| 6 | `blob-safari-dark.png` | system Safari 26 / Apple GPU | dark | route-boot provenance (masthead) |
| 7 | `blob-keyed-excited-chrome-light.png` | Chrome / Metal | light | keyed warm-red body hue |
| 8 | `blob-keyed-excited-chrome-dark.png` | Chrome / Metal | dark | keyed warm-red body hue |
| 9 | `blob-keyed-shy-chrome-light.png` | Chrome / Metal | light | keyed cool-teal body hue |
| 10 | `blob-keyed-shy-chrome-dark.png` | Chrome / Metal | dark | keyed cool-teal body hue |

Capture scripts (co-located, the established `*-capture.mjs` pattern): `chrome-capture.mjs`, `webkit-capture.mjs`, `keyed-hue-capture.mjs`.

---

## Criteria → verdict

### 1 · `proof:blob-color-equivalence` GREEN — **PASS**
`npm run proof:blob-color-equivalence` → **19/19** (incl. the born-RED (12) `blendSatColor` arm 12a-12e + the (13) `deriveBlobPalette` `bodyLightness`/`lightnessFloor` companion 13a-13c).

### 2 · The GL color-seam IS widened (`uSatColor[]`) — **PASS**
`grep uSatColor dist/` (0 through BB/BG, re-verified 2026-07-04) now resolves:
- `dist/goo-blob.js` + `dist/goo-dot-matrix.js` — the `uSatColor[${t}]`/`uSatColorAmt[${t}]` uniform-location cache loop (the plumb + the goo-dot-matrix **mirror**).
- `dist/uniformBridgeWGPU-*.js` (the shared shader-source chunk) — the `blendSatColor()` frag body + `uSatColorActive` (7 refs) + the `uSatColor`/`uSatColorAmt` uniform-name registry.

### 3 · BYTE-IDENTICAL default paint (an unset `uSatColor[]` resolves the current derived shade) — **PASS**
The demo never sets `uSatColor` (`uSatColorActive == 0` → the frag early-returns the current derived shade). The rendered default (calm cream preset) is the canonical warm-cream lit metaball bead — satellites metaballed into ONE coherent gooey silhouette (pseudopod necks), lit-glass glint + soft contact shadow, warm-cream identity — in Chrome light/dark AND WebKit light/dark. No black slab, no oversaturation, no floating unrelated discs. The 12a born-RED gate bite ("OFF byte-identical no-round-trip") locks the source fact; the paint confirms the render.

### 4 · Satellite-shade π over a keyed body hue — **PASS**
The satellites derive their shade FROM the keyed body hue — one coherent family that TRACKS the hue, both modes:
- **Calm** cream (`oklch(0.78 0.05 78)`) → warm-cream bead, cream-family satellites.
- **Excited** warm-red (`oklch(0.62 0.19 25)`, mood "excited") → coral/red bead, red-family satellites metaballed in (captures 7/8).
- **Shy** (blue seed + complementary harmony) → cool teal bead, teal-family satellites (captures 9/10).

In every case the satellites are a coherent shade of the body hue — never a clashing unrelated color. The derivation is demonstrably hue-following (cream → red → teal distinct), not a fixed color. The dark register renders each keyed bead luminously over the warm-dark canvas (the W-DARK-MATERIAL transmissive read holds).

### 5 · Budget / substrate hygiene — **PASS**
Capture-mode diag: `totalCanvas 3` = the page aurora + the studio hero blob + the STAGE-1 plain blob (`gooCanvas 2`), `mainChildren 2`. One live GL bead is the studio stage (the one-GL-context-per-route budget honored; the WatercolorDot registers are zero-GL).

---

## Notes
- The wave's headline (`uSatColor[]` seam) is BYTE-IDENTICAL by default, so `/substrates/blob` paints the pre-existing `deriveBlobPalette → paletteStops` derived shading (unchanged). The NEW per-satellite override path is asserted by the gate (12a-12e/13a-13c) + present in dist; the demo does not toggle `uSatColorActive` on (correct — it is the consumer/value.js `App.vue:115` seam). The paint judged here is the byte-identical default render + the (pre-existing, unchanged) satellite-shade-from-body-hue coherence, which reads correct in all four engine×mode captures.
- Per-engine warmth: the WebKit bead reads a hair warmer/more saturated gold than Chrome (expected fwidth()/color-pipeline derivative drift) — within the warm-cream identity band, not oversaturated. No defect.
