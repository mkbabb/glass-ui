# Capture-pipeline keystone — dual-engine validation (C-SAFARI)

> **Role:** fresh NON-AUTHORING capture-pipeline validator (did not build any BG wave).
> **Purpose:** PROVE the dual-engine `?capture=` capture pipeline works end-to-end BEFORE
> any fan-out — the C-SAFARI keystone (the chronic that missed four prior tranches).
> **Wave route:** `BG.W-ROUTE-ENTER-VISIBLE` (F1.R1) → the route-entrance surface, captured
> on the C-SAFARI keystone route `/dock/overview` (the harness-proven surface).
> **Date:** 2026-07-04. **Fence:** zero `src`/`demo`/`styles`/`scripts` edits — HARNESS +
> capture only; a defect is RECORDED, never patched here.

## Verdict: BOTH ENGINES PASS

| leg | engine (in-pixel badge) | GPU (in-pixel badge) | modes | dims | real content |
|---|---|---|---|---|---|
| **Chrome CDP** | `ENGINE CHROME` | `ANGLE Metal Renderer: Apple M5 Max` (real Metal, NOT SwiftShader) | light + dark | 2880×1626 | YES |
| **Safari off-screen WKWebView** | `ENGINE WEBKIT` | `Apple GPU` (system WebKit.framework / Metal) | light + dark | 2880×1800 | YES |

`chromeOk = true`, `safariOk = true`. The C-SAFARI blank-WebKit chronic does **NOT** reproduce
— the off-screen WKWebView captures FULL route content (hero, blurb, aurora DockStage field,
both nav docks, all dock sections) in both modes, with the decodable in-pixel engine badge.

## Evidence on disk (this dir)

| png | engine | mode | dims | bytes | badge (decoded from pixels) |
|---|---|---|---|---|---|
| `route-enter-chrome-light-desktop.png` | CHROME (CDP, real Metal) | light | 2880×1626 | 1.63 MB | `ENGINE CHROME · GPU ANGLE Metal Apple M5 Max · VIEW 1440×813 @2x (2880×1626px) · MODE LIGHT` |
| `route-enter-chrome-dark-desktop.png` | CHROME | dark | 2880×1626 | 1.68 MB | `… MODE DARK` |
| `route-enter-safari-light-desktop.png` | WEBKIT (off-screen WKWebView, Metal) | light | 2880×1800 | 1.68 MB | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT` |
| `route-enter-safari-dark-desktop.png` | WEBKIT | dark | 2880×1800 | 1.71 MB | `… MODE DARK` |

`validate.mjs` (this dir) re-runs the pixel checks against the repo's single decoder leaf
(`scripts/reflect-capture-verify.mjs` — `isRealPng`/`pngDimensions`/`pngRegionStats`, NOT pngjs):

| png | isRealPng | dims | badge magenta-fiducial px | badge ink px | body σ(lum) | body meanChroma |
|---|---|---|---|---|---|---|
| chrome light | true | 2880×1626 | 10424 | 274607 (light-panel) | 21.4 | 0.077 |
| chrome dark | true | 2880×1626 | 10424 | 455519 (dark-panel) | 28.1 | 0.081 |
| safari light | true | 2880×1800 | 6432 | 450648 | 21.7 | 0.054 |
| safari dark | true | 2880×1800 | 6432 | 515379 | 24.2 | 0.062 |

- **Not blank/shell.** Body luminance σ 21–28 (a uniform shell slab reads ~0); the prior
  blank-WebKit failure PNG was ~173 KB — these are 1.6–1.7 MB. Warm chroma 0.054–0.081 (the
  aurora field + warm-cream glass). Mode-differentiated body means (light bright, dark deep).
- **Badge present + engine-discriminated in-pixel.** Magenta `#ff00ff` fiducial border found
  in every capture; the badge text decodes to the correct ENGINE/GPU/VIEW/MODE — the gate reads
  provenance FROM the pixels, not the builder's word.
- **Dimension-correct.** Chrome full-page 2880×1626 (retina 2× of 1440×813 content-height),
  Safari viewport 2880×1800 (retina 2× of 1440×900). Both ≥ the MIN_CAPTURE floor.

## The WORKING method (exact commands — reproducible)

```bash
# 0 · siblings tripwire (before + after) — exit 0
node scripts/verify-siblings-intact.mjs --quiet

# 1 · build + serve the BUILT demo dist on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build                                    # → dist-demo/, ~2.5s
npm run demo:dist:serve                                    # vite preview :5200 (background)

# 2 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework, Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o <bin>
<bin> "http://localhost:5200/?capture=/dock/overview&mode=light" out-light.png light 15000
<bin> "http://localhost:5200/?capture=/dock/overview&mode=dark"  out-dark.png  dark  15000
#   → data-capture-ready polled at 4500–4800 ms; snapshot 2880×1800, FULL content + WEBKIT badge

# 3 · Chrome leg — real Chrome.app + CDP over the SAME ?capture= route (badge reads real GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 --user-data-dir=<profile> --no-first-run --window-size=1440,900 about:blank &
#   CDP: Page.navigate → poll document.documentElement[data-capture-ready] → record GL_RENDERER
#        off a throwaway WebGL2 ctx → Page.captureScreenshot(captureBeyondViewport:true)
#   data-capture-ready polled at ~3900 ms; GL_RENDERER = ANGLE Metal Apple M5 Max (real GPU)
```

- `data-capture-ready` is the deterministic readiness signal — POLLED, never a fixed sleep
  (an off-screen WKWebView throttles rAF; the boot's rAF-vs-setTimeout race lands the flag).
- The `?capture=` mode de-promotes the `.route-enter` entrance CA layer for the snapshot
  (settled pixels unchanged), so the off-screen WKWebView reads FULL content — the C18 fix.

## Fences honored

Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. No `/tmp` PNG/DELTA output (transient
CDP profile + compiled harness binary were cleaned from the audit dir). No sibling under
`~/Programming` touched/moved. `verify-siblings-intact.mjs --quiet` exit 0 before AND after.
`demo:dist:serve` + Chrome CDP killed on completion.
