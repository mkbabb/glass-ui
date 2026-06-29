# BG.W-HERO-FIT — NON-AUTHORING dual-engine paint DELTA

> **Role:** NON-AUTHORING PAINT JUDGE (built no wave). **Wave:** BG.W-HERO-FIT (cursor 2.6, WS1).
> **Method:** the C18 `?capture=` harness on the BUILT dist `:5200` (NOT `:5199` dev), both engines
> (Chrome via CDP on real Metal · WebKit via off-screen WKWebView on system WebKit.framework/Metal),
> both modes, all four viewports. **Date:** 2026-06-29.
> **Verdict: PASS** — every criterion holds in BOTH engines × BOTH modes × all 4 widths; all 32 capture
> PNGs resolve on disk; the in-pixel engine badge decodes distinct provenance per leg.

## Matrix: 2 routes × 2 modes × 4 widths × 2 engines = 32 captures (all on disk)

Routes: `/foundations/intro` · `/compositions/hero`. Widths: 375×812 · 768×1024 · **1440×820 (the fold
criterion)** · 1920×1080. PNGs: `hero-fit-pipeline/hf-<engine>-<route>-<mode>-<w>.png` (@2x).

## The criteria — COMPUTED DOM checks (where computational) + pixel reads (where visual)

The wave's acceptance bar verbatim: *rendered hero `<h1>` block ≤0.62×svh · font-size ≥ computed(display-4)
@≥768 · no hyphenation@375 · ≥1 preview card above the fold @1440×820; Chrome+Safari.* The hero `<h1>` is
the ONE chassis title path `h1.story-hero-title[data-hero-scale]` rendering `displayTitle ?? title` (the
MANDATORY short wordmark `glass-ui` / `Real scenes` through the height-aware `min()` fit-cap). All four pass:

| criterion | check | result (all 32 configs) |
|---|---|---|
| **C1** hero `<h1>` block ≤ 0.62×svh | `h1.getBoundingClientRect().height / innerHeight` | **PASS** — max **0.519** (hero@1440, 2 lines); intro 0.07–0.29, hero 0.07–0.52, every width both engines ≤0.62 |
| **C2** font-size ≥ computed(display-4) @≥768 | h1 computed `font-size` vs a probe `text-display-4` element measured at the live viewport | **PASS** — h1 100.6–177.4px vs display-4 70.7–86.1px at 768/1440/1920 (375 not gated) |
| **C3** no hyphenation @375 | h1 at 375: `lineCount`, `U+00AD` presence, horizontal overflow | **PASS** — every 375 config renders the wordmark on **1 line** (`ℱ glass-ui` / `ℱ Real scenes`), no soft hyphen, `scrollWidth==clientWidth` (no overflow). The width fit-cap shrinks the rung to 44.4px so the short title fits — the load-bearing short-`displayTitle` fix |
| **C4** ≥1 preview card above the fold @1440×820 | count `.section-preview-card` with `top < 820 && bottom > 0` | **PASS** — intro **3** cards (tops 597.5, fully visible); hero **2** cards (tops 783.8 — a genuine 36px peek above the 820 fold, not a 1px technicality) |

Full per-config table: `hero-fit-pipeline/hf-chrome-results.json` + `hf-safari-results.ndjson`.
Probe source: `hero-fit-pipeline/hf-probe.js`. Harnesses: `wkshot-hf.m` (WebKit) + `chrome-hf.mjs` (CDP).

### Per-config computed readout (representative — the binding 1440×820 fold + the 375 hyphenation rows)

```
id                       scale  h1-fs  d4-fs lines overflowX hyph-comp ratio cardsAF  text
chrome/intro/light/375   mega   44.4   55.0  1     false     auto      0.074 2        ℱ glass-ui
chrome/intro/light/1440  mega   177.4  86.1  1     false     auto      0.292 3        ℱ glass-ui
chrome/hero/light/375    mega   44.4   55.0  1     false     auto      0.074 2        ℱ Real scenes
chrome/hero/light/1440   mega   177.4  86.1  2     false     auto      0.519 2        ℱ Real scenes
safari/intro/light/1440  mega   177.4  86.1  1     false     auto      0.292 3        ℱ glass-ui
safari/hero/light/1440   mega   177.4  86.1  2     false     auto      0.518 2        ℱ Real scenes
```

Note: `hyphens: auto` is the computed property on the `<h1>`, but it NEVER FIRES — the short `displayTitle`
fits one line at every width (1 line @375, 1–2 lines @≥768), so no hyphen is inserted (`hasSoftHyphen:false`,
no overflow). Criterion C3 is met by the ACTUAL render, not by suppressing the property. Chrome↔Safari agree
within rounding (ratio 0.0739 vs 0.0727; identical font sizes, line counts, scale `mega`) — the fit-cap
resolves identically across engines.

## Dual-engine provenance — decoded from the pixels (the SOLE provenance source)

| leg | badge ENGINE | badge GPU | VIEW |
|---|---|---|---|
| Chrome (CDP) | `CHROME` | `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader) | `1440×820 @2x (2880×1640px)` |
| WebKit (off-screen WKWebView) | `WEBKIT` (no `Version/` token → the Tier-1 system-WebKit path) | `Apple GPU` (WebKit.framework, Metal) | `1440×820 @2x (2880×1640px)` |

Badge crops: `hero-fit-pipeline/badge-chrome-intro-light-1440.png` · `badge-safari-intro-light-1440.png`.
The two legs carry genuinely distinct provenance (ENGINE + GPU differ); the judge does not take the
capturer's word — the bytes carry it.

## Visual criteria — pixel reads (recessive aurora · grain calm · hero fits envelope)

- **`/foundations/intro` (aurora bg).** A soft pink→lavender pastel wash; background-region mean HSL-S
  **0.30** (recessive — oversaturation would read >0.7); no conic banding, no neon. The `ℱ glass-ui`
  wordmark sits on one line, large but bounded, with the eyebrow `/foundations/intro` + blurb + the
  `CATEGORIES` grid (3 cards) above the fold @1440. Dark mode = near-black W-DARK-MATERIAL page, cream ink,
  muted-mauve recessive aurora.
- **`/compositions/hero` (constellation bg).** A faint dot/line field, recessive; the `ℱ Real scenes`
  wordmark wraps to 2 lines @≥768 (ratio 0.236–0.519, within the 0.62 envelope) with the blurb + the
  `THE SCENES` bento card-tops peeking above the bottom dock. Grain on the preview-card thumbnails reads
  calm. Both modes faithful; Safari render matches Chrome layout 1:1.
- **Hero fits its envelope** at every width both engines both modes — the title never overruns the viewport,
  never hyphenates, never collides with the dock chrome; the `min()` fit-cap (rung ∧ width-fit ∧
  `0.62·100svh/est-lines` svh-fit) bounds it on all axes.

## Capture method (proven, this run)

1. `npm run demo:dist:build` (4.2.0 dist, ~1.3s) → `npm run demo:dist:serve` (vite preview `:5200`); polled
   `?capture=/foundations/intro&mode=light` == 200.
2. Chrome leg: `Google Chrome.app --remote-debugging-port=9456`, playwright `connectOverCDP`, per-config
   `newContext({viewport, deviceScaleFactor:2, colorScheme})`, `goto ?capture=<route>&mode=<mode>`,
   `waitForFunction(data-capture-ready)`, GL_RENDERER via `WEBGL_debug_renderer_info`, `page.evaluate`
   the shared probe, `page.screenshot`.
3. WebKit leg: `wkshot-hf` (width-parameterized off-screen WKWebView — a copy of `wkshot-live.m` extended
   with viewport `<width> <height>` args + the `wk-sp-probe.m` `callAsyncJavaScript(window.__spProbe)` probe
   leg, compiled to the session scratchpad; the committed `wkshot-live.m` left pristine), polls
   `data-capture-ready` then probes + snapshots → 2× PNGs.
4. siblings tripwire `node scripts/verify-siblings-intact.mjs --quiet` exit 0 before AND after.

## Scope / fences

NON-AUTHORING: zero `src/`/`demo/`/`styles/`/`scripts/` edits — only this DELTA + the capture PNGs under
`docs/tranches/BG/audit/visual/` + the cursor flip. Operated only under `/Users/mkbabb/Programming/glass-ui`;
no sibling touched; the Chrome + `:5200` serve killed on done.
