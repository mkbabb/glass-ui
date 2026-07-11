# Dual-engine capture pipeline — RE-PROVEN over BG.W-GOO-BARBELL-CSS (C-SAFARI keystone)

> **Role:** CAPTURE-PIPELINE VALIDATOR (non-authoring). **Purpose:** PROVE the dual-engine `?capture=`
> pipeline end-to-end BEFORE fan-out. **Surface:** `BG.W-GOO-BARBELL-CSS` → `/navigation/carousel` (the
> carousel/pager goo-morph worm — emitted pager-dot morph + glass chrome). **Date:** 2026-07-10.
> **Fence:** validation-only — ZERO src/demo/style/script edits; PNGs + this DELTA under
> `docs/tranches/BG/audit/visual/pipeline-validation/`. Complements the 2026-07-02 run over
> `/foundations/shadows` (`PIPELINE-VALIDATION-DELTA.md`) — a SECOND route, same GREEN.

## Verdict — PIPELINE GREEN, both engines, both modes

| leg | result |
|---|---|
| **Chrome (CDP, real Metal GPU)** | PASS — full route content + in-pixel badge, both modes |
| **Safari/WebKit (off-screen WKWebView, system WebKit.framework/Metal, no-TCC)** | PASS — full route content + in-pixel badge, both modes |
| **Engine discrimination (in-pixel)** | decodable FROM the pixels — `ENGINE CHROME / GPU ANGLE Metal Apple M5 Max` vs `ENGINE WEBKIT / GPU Apple GPU` |
| **Real content (not blank/bare-shell)** | all 4 render the Carousel story — "NAVIGATION · CAROUSEL" eyebrow, the pager+dots substrate card, the `2 / 5` glass-pager-ring with chevrons, the goo-morph elongated active-dot pip, the glass dock rail, the bottom carousel nav strip |
| **Dimension-correct** | all 4 are 2880×1800 (retina 2× of the 1440×900 viewport) |
| **Dark register (not a void)** | both dark captures paint the warm luminous-dark transmissive material + the warm-cream card, not a flat near-black void |

**The binding C-SAFARI answer: YES.** The off-screen WKWebView captures FULL content + the badge on this
route; the blank-WebKit chronic does NOT reproduce. No on-screen `screencapture`/Screen-Recording-TCC path
needed. **No blocker.**

## Evidence on disk (this dir)

| png | engine | mode | dims | badge (decoded from pixels) |
|---|---|---|---|---|
| `chrome_navigation_carousel_light.png` | CHROME (CDP, real Metal) | light | 2880×1800 | `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version) · VIEW 1440×900 @2x · MODE LIGHT` |
| `chrome_navigation_carousel_dark.png` | CHROME | dark | 2880×1800 | `… MODE DARK` |
| `webkit_navigation_carousel_light.png` | WEBKIT (off-screen WKWebView, Metal) | light | 2880×1800 | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x · MODE LIGHT` |
| `webkit_navigation_carousel_dark.png` | WEBKIT | dark | 2880×1800 | `… MODE DARK` |

Chrome GL_RENDERER probe (throwaway webgl2 `UNMASKED_RENDERER_WEBGL`):
`ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` — REAL Metal, not
SwiftShader/llvmpipe/ANGLE-Software. `data-capture-ready` landed in both modes (WebKit: `after 4500ms`).

## The WORKING method (exact commands — used verbatim, not re-derived)

```bash
# 0 · siblings tripwire (before + after)  →  exit 0 both times
node scripts/verify-siblings-intact.mjs --quiet

# 1 · build + serve the BUILT demo dist on :5200 (built bytes — NOT :5199 dev, which bare-shells WebKit)
npm run demo:dist:build            # → dist-demo/, ~1s
npm run demo:dist:serve            # vite preview :5200 (background); poll curl :5200 → 200

# 2 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework, Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o <bindir>/wkshot-live
<bindir>/wkshot-live "http://localhost:5200/?capture=/navigation/carousel&mode=light" \
  docs/tranches/BG/audit/visual/pipeline-validation/webkit_navigation_carousel_light.png light 15000
<bindir>/wkshot-live "http://localhost:5200/?capture=/navigation/carousel&mode=dark"  \
  docs/tranches/BG/audit/visual/pipeline-validation/webkit_navigation_carousel_dark.png  dark  15000
#   → 2880×1800; polls document.documentElement[data-capture-ready] THEN snapshots

# 3 · Chrome leg — real Chrome.app CDP over the SAME ?capture= route
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9467 --user-data-dir=<profile> \
  --no-first-run --no-default-browser-check --window-size=1500,1000 about:blank &
#   then: playwright chromium.connectOverCDP("http://localhost:9467"),
#         newContext({viewport 1440×900, deviceScaleFactor 2, colorScheme <mode>}),
#         goto ?capture=/navigation/carousel&mode=<m>, waitForFunction data-capture-ready,
#         evaluate GL_RENDERER (UNMASKED_RENDERER_WEBGL), page.screenshot → 2880×1800 + CHROME badge.
#   reference driver: docs/tranches/BG/audit/visual/BG.W-VIZ-PREVIEW-LIVE-chrome-recapture.mjs

# 4 · teardown — kill the vite preview + the throwaway Chrome; verify siblings intact again
```

`?capture=<route>&mode=<light|dark>` boots `demo/main.ts` into settled-frame mode (`<html data-capture
data-capture-mode>` set BEFORE mount → `.route-enter` @keyframes never promotes a CA layer the off-screen
snapshot would drop); readiness is the `<html data-capture-ready>` attribute — poll it, never a fixed sleep.
The badge (`demo/capture/engine-badge.ts`) is the SOLE provenance channel (in-pixel, no JSON sidecar). The
non-capture demo path is byte-untouched.

## Scope / fence notes

- PIPELINE proof only — does NOT judge/flip the BG.W-GOO-BARBELL-CSS gestalt roster row (a non-authoring
  gestalt verdict at that wave's own paint close is a separate act). The captures happen to read
  warm-cream/warm-brown with the goo pager pip present; the roster flip is out of this task's scope.
- Build/runtime artifacts (the compiled `wkshot-live`, the throwaway Chrome profile) live in the session
  scratchpad — NO repo path under `/tmp`, NO sibling under `~/Programming` touched.
  `verify-siblings-intact --quiet` exits 0 before AND after.
