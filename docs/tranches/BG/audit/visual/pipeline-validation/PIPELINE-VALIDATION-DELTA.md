# BG capture-pipeline re-validation — the dual-engine `?capture=` harness over BG.W-CARTOON-INK-GAMUT

> **Role:** CAPTURE-PIPELINE VALIDATOR (non-authoring). **Purpose:** PROVE the dual-engine capture
> pipeline works end-to-end BEFORE fan-out — the C-SAFARI keystone (the chronic that missed four prior
> tranches). **Surface:** the BG.W-CARTOON-INK-GAMUT route `/foundations/shadows` (the cartoon-offset
> `box-shadow` token tour). **Date:** 2026-07-02. **Fence:** validation-only — ZERO `src`/demo/style/script
> edits (a validator RECORDS a defect, never fixes it); PNGs + this DELTA under `docs/tranches/BG/audit/visual/`.

## Verdict — PIPELINE GREEN, both engines, both modes

| leg | result |
|---|---|
| **Chrome (CDP, real Metal GPU)** | ✅ PASS — full route content + in-pixel badge, both modes |
| **Safari/WebKit (off-screen WKWebView, system WebKit.framework/Metal, no-TCC)** | ✅ PASS — full route content + in-pixel badge, both modes |
| **Engine discrimination (in-pixel)** | ✅ decodable FROM the pixels — `ENGINE CHROME / GPU ANGLE Metal Apple M5 Max` vs `ENGINE WEBKIT / GPU Apple GPU` |
| **Real-content (not blank/bare-shell)** | ✅ all 4 render the Shadows page — the XS→2XL + CARTOON/CARTOON-HOVER/MODAL/SOFT/ELEVATED elevation grid, the "Cartoon lift · hover the card" HOVER ME specimen, both nav docks |
| **Dimension-correct** | ✅ all 4 are 2880×1800 (retina 2× of the 1440×900 viewport) |
| **Dark register (not a void)** | ✅ both dark captures paint the warm luminous-dark transmissive material + the glass container plate, not a flat near-black void |

**The binding C-SAFARI answer: YES (re-confirmed).** The off-screen WKWebView captures FULL content + the
badge on a SECOND wave route; the blank-WebKit chronic does NOT reproduce. No on-screen
`screencapture`/Screen-Recording-TCC path was needed.

## Evidence on disk (this dir)

| png | engine | mode | dims | bytes | badge (decoded from pixels) |
|---|---|---|---|---|---|
| `cartoon-ink-gamut-chrome-light-desktop-full.png` | CHROME (CDP, real Metal) | light | 2880×1800 | 2.20 MB | `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version) · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT` |
| `cartoon-ink-gamut-chrome-dark-desktop-full.png` | CHROME | dark | 2880×1800 | 2.73 MB | `… MODE DARK` |
| `cartoon-ink-gamut-safari-light-desktop-full.png` | WEBKIT (off-screen WKWebView, Metal) | light | 2880×1800 | 1.91 MB | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT` |
| `cartoon-ink-gamut-safari-dark-desktop-full.png` | WEBKIT | dark | 2880×1800 | 1.76 MB | `… MODE DARK` |

Chrome CDP probe (`chrome-results.json`): `glRenderer = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max…)`
(REAL Metal — not SwiftShader/llvmpipe/ANGLE-Software), `cartoonSpecimenCount = 3`, `bodyTextLen ≈ 684`,
`data-capture-ready` landed within the poll cap in both modes.

## The WORKING method (exact commands — used, not re-derived; from protocol §6.1 + C18-HARNESS-DELTA)

```bash
# 0 · siblings tripwire (before + after)  →  exit 0 both times
node scripts/verify-siblings-intact.mjs --quiet

# 1 · build + serve the BUILT demo dist on :5200 (built bytes — NOT :5199 dev, which bare-shells WebKit)
npm run demo:dist:build                                    # → dist-demo/, ~1.2s
npm run demo:dist:serve                                    # vite preview :5200 (background)

# 2 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework, Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/foundations/shadows&mode=light" \
  docs/tranches/BG/audit/visual/pipeline-validation/cartoon-ink-gamut-safari-light-desktop-full.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/foundations/shadows&mode=dark"  \
  docs/tranches/BG/audit/visual/pipeline-validation/cartoon-ink-gamut-safari-dark-desktop-full.png  dark  15000
#   → polls document.documentElement[data-capture-ready] (data-capture-ready after 4500ms) THEN snapshots

# 3 · Chrome leg — real Chrome.app CDP over the SAME ?capture= route (badge reads real GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9456 --user-data-dir=/tmp/chrome-pipe-validate \
  --no-first-run --no-default-browser-check --window-size=1500,1000 about:blank &
#   then: playwright chromium.connectOverCDP("http://localhost:9456"),
#         newContext({viewport 1440×900, deviceScaleFactor 2, colorScheme mode}),
#         goto ?capture=/foundations/shadows&mode=<m>, waitForFunction data-capture-ready,
#         evaluate GL_RENDERER, page.screenshot.  (script: chrome-capture.mjs in this dir)

# 4 · teardown — kill the vite preview + the throwaway Chrome; verify siblings intact again
```

`?capture=<route>&mode=<light|dark>` boots `demo/main.ts` into the settled-frame mode (`<html data-capture
data-capture-mode>` set BEFORE mount → the `.route-enter` @keyframes entrance never promotes a CA layer the
off-screen snapshot would drop); readiness is the `<html data-capture-ready>` attribute — poll it, never a
fixed sleep. The badge (`demo/capture/engine-badge.ts`) is the SOLE provenance channel (in-pixel, no JSON
sidecar). The non-capture demo path is byte-untouched.

## Scope / fence notes

- This is a PIPELINE proof — it does NOT judge or flip the BG.W-CARTOON-INK-GAMUT gestalt roster row (a
  non-authoring gestalt verdict at THAT wave's own paint close is a separate act). The captures happen to
  read warm-cream/warm-brown at the field with no maroon cast, but the roster flip is out of this task's scope.
- `/tmp/wkshot-live` + `/tmp/chrome-pipe-validate` are build/runtime artifacts (the protocol §6.1 build target);
  NO repo path under `/tmp`, NO sibling under `~/Programming` touched. `verify-siblings-intact --quiet` exits 0
  before AND after.
