# BG capture-pipeline proof — dual-engine, both modes (PASS)

> **Role:** CAPTURE-PIPELINE VALIDATOR (non-authoring). **Purpose:** prove the dual-engine
> `?capture=` harness works end-to-end BEFORE any fan-out — the C-SAFARI keystone (the chronic
> that missed four prior tranches). **Surface:** `BG.W-COMPOSITED-GESTALT-GATE` route
> `/dock/overview` (the C-SAFARI keystone route — GL-heavy DockStage aurora field + real glass
> docks). **Date:** 2026-07-10. **Fence:** verification-only — ZERO src/demo/style/script edits;
> PNGs + this DELTA under `docs/tranches/BG/audit/visual/`.

## Verdict — PASS — both engines, both modes capture FULL route content + in-pixel badge

| axis | result |
|---|---|
| **Chrome (real Metal GPU)** | `ENGINE CHROME / GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max) / MODE LIGHT+DARK` — real Metal, NOT SwiftShader |
| **Safari/WebKit (system Metal)** | `ENGINE WEBKIT / GPU Apple GPU / MODE LIGHT+DARK` — off-screen WKWebView, system WebKit.framework, no TCC |
| **Real content (not blank shell)** | Chrome `bodyTextLen` 4969/4968, `mainChildren` 2, `glCtx` 1, `animations` 0 (settled frame); Safari full DockStage render — "Overview" hero + blurb, Collapsible/Media-transport/Select-dropdown dock sections, sidebar icon rail + bottom nav dock |
| **Dimension-correct** | ALL 4 = 2880×1800 (1440×900 @2×), 1.68–1.88 MB (blank shell is ~173 KB) |
| **In-pixel engine badge** | decoded from pixels on all 4 (magenta `#ff00ff` fiducial + ENGINE/GPU/VIEW/MODE panel) |
| **captureReady** | Chrome `data-capture-ready` true both modes; WebKit `data-capture-ready` @4500ms both modes |
| **siblings tripwire** | `verify-siblings-intact --quiet` exit 0 before AND after |

## Evidence on disk (this dir)

| png | engine | mode | dims | bytes | badge |
|---|---|---|---|---|---|
| `chrome_dock-overview_light.png` | CHROME (CDP, real Metal M5 Max) | light | 2880×1800 | 1.87 MB | `ENGINE CHROME · GPU ANGLE Metal Apple M5 Max · VIEW 1440×900 @2x · MODE LIGHT` |
| `chrome_dock-overview_dark.png` | CHROME | dark | 2880×1800 | 1.88 MB | `… MODE DARK` |
| `safari_dock-overview_light.png` | WEBKIT (off-screen WKWebView, Metal) | light | 2880×1800 | 1.68 MB | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x · MODE LIGHT` |
| `safari_dock-overview_dark.png` | WEBKIT | dark | 2880×1800 | 1.71 MB | `… MODE DARK` |

Chrome light shows warm peach-cream DockStage aurora field behind the "Overview" hero; Chrome/Safari
dark show the luminous warm-amber dark register (NOT a flat near-black void). The C-SAFARI
blank-WebKit chronic does NOT reproduce.

## The WORKING METHOD (exact commands — use, do NOT re-derive)

```bash
# 0 · siblings tripwire (before + after)
node scripts/verify-siblings-intact.mjs --quiet            # exit 0

# 1 · build + serve the BUILT demo dist on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build                                    # → dist-demo/
npm run demo:dist:serve                                    # vite preview :5200 (background)

# 2 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework, Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=light" safari_..._light.png light 20000
/tmp/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=dark"  safari_..._dark.png  dark  20000
#   the harness POLLS document.documentElement[data-capture-ready] (≤ maxWaitMs) THEN snapshots

# 3 · Chrome leg — real Chrome.app + CDP over the SAME ?capture= route (badge reads real GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9466 --user-data-dir=<throwaway> \
  --no-first-run --no-default-browser-check --window-size=1440,900 about:blank &
#   node + playwright chromium.connectOverCDP("http://localhost:9466"):
#     newContext({ viewport:1440×900, deviceScaleFactor:2, colorScheme:<mode> })
#     goto ?capture=/dock/overview&mode=<mode>, waitUntil load
#     waitForFunction document.documentElement.hasAttribute('data-capture-ready')
#     GL_RENDERER probe (WEBGL_debug_renderer_info) proves real Metal M5 Max, not SwiftShader
#     page.screenshot  → 2880×1800

# 4 · cleanup — kill Chrome + demo:dist:serve; re-run the siblings tripwire (exit 0)
```

The in-pixel engine badge (`demo/capture/engine-badge.ts`) is the SOLE provenance source: the gate
decodes ENGINE/GPU/VIEW/MODE from the pixels; no JSON sidecar. `chrome-probe.json` in this dir
records the per-mode GL_RENDERER + DOM sanity readback.
