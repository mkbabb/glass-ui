# Capture-pipeline validation (independent re-run) — BG.W-GLASS-SIGNAL-TRUTH route (`/dock/overview`)

> **Role:** CAPTURE-PIPELINE VALIDATOR (fresh agent; did NOT build the wave). **Purpose:** independently
> PROVE the dual-engine `?capture=` harness works END-TO-END on the C-SAFARI keystone route BEFORE any
> fan-out — the chronic that missed four prior tranches. This DELTA certifies the INSTRUMENT (both engines
> capture full route content + the in-pixel engine badge), NOT the wave's paint verdict. **Date:** 2026-07-04.
> **Fence honored:** ZERO `src/demo/styles/scripts` edits; PNGs+DELTA under `docs/tranches/BG/audit/visual/`
> only; `/tmp` used solely for the throwaway Chrome profile + the compiled harness binary (never a sibling
> move). `verify-siblings-intact.mjs` exit 0 before AND after.

## Verdict — PIPELINE PROVEN (both engines, both modes)

| leg | result |
|---|---|
| **Chrome (CDP, real `Chrome.app` 149.0.7827.201)** | **PASS** — full `/dock/overview` content, real `ANGLE Metal Renderer: Apple M5 Max` GPU (NOT SwiftShader), in-pixel `ENGINE CHROME` badge, BOTH modes, 2880×1800 |
| **Safari/WebKit (off-screen WKWebView, system WebKit.framework/Metal, no TCC)** | **PASS** — full `/dock/overview` content, `Apple GPU`, in-pixel `ENGINE WEBKIT` badge, BOTH modes, 2880×1800; `data-capture-ready` landed at 4500ms both modes |

The blank-WebKit chronic does **NOT** reproduce. Both engines capture the FULL settled Overview route (hero
"Overview" + GlassDock walkthrough blurb + the warm DockStage aurora field + the collapsible dock pill +
the always-expanded media transport + the left sidebar dock rail + the bottom nav dock). The two engines are
discriminable FROM the pixels (the badge decodes `CHROME`/`ANGLE Metal Apple M5 Max` vs `WEBKIT`/`Apple GPU`),
not from the capture method.

## Evidence on disk (this dir)

| png | engine badge | GPU badge | mode | dims | bytes |
|---|---|---|---|---|---|
| `BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-light.png` | `CHROME` | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` | LIGHT | 2880×1800 | 1,929,940 |
| `BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-dark.png`  | `CHROME` | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` | DARK  | 2880×1800 | 1,905,985 |
| `BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-light.png` | `WEBKIT` | `Apple GPU` | LIGHT | 2880×1800 | 1,680,466 |
| `BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-dark.png`  | `WEBKIT` | `Apple GPU` | DARK  | 2880×1800 | 1,707,040 |

All four ≥1.68 MB (far above the ~173 KB blank-shell floor the C18 delta flagged), all `2880×1800` (retina
2× of the 1440×900 viewport), the magenta `#ff00ff` fiducial frame + the deterministic ENGINE·GPU·VIEW·MODE
badge present + visually decoded in every PNG. All four visually confirmed to carry the real Overview route
gestalt (hero + blurb + aurora field + all dock zones), in both light and dark registers.

**Chrome DOM sanity (both modes):** `mainChildren:2`, `glCanvases:2` (the live DockStage aurora canvas is
present + nonzero), `runningAnims:0` (the `capture.css` settled-frame neutralization holds — no
transform-promoted CA layer for an off-screen snapshot to drop), `rootBackdropHue:(empty/absent)`. NOTE:
`sampledCount:0` re-confirms the wave's own dead-dock-observer defect — that is the WAVE's paint verdict
(a build-fix agent's job), NOT a pipeline defect; the instrument faithfully recorded it.

## The WORKING method (exact commands — re-run verbatim, all first-try except the one gotcha)

```bash
# 0 · siblings tripwire (before + after) — exit 0
node scripts/verify-siblings-intact.mjs --quiet

# 1 · build + serve the BUILT demo dist on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build                              # → dist-demo/, ~1.0s
npm run demo:dist:serve                              # vite preview :5200 (background)

# 2 · Chrome leg — launch real Chrome.app with CDP, capture via connectOverCDP
#     GOTCHA: zsh globs `*` — QUOTE --remote-allow-origins:
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9477 --user-data-dir=/tmp/chrome-cap-verify-profile \
  --no-first-run --no-default-browser-check "--remote-allow-origins=*" about:blank &
node docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-chrome-capture.mjs \
  <OUT_DIR> /dock/overview dock-overview
#   → navigate http://localhost:5200/?capture=/dock/overview&mode=<m>
#     waitUntil:load → waitForFunction(data-capture-ready) → page.screenshot (2880×1800)
#     GL_RENDERER read off a throwaway WebGL2 ctx proves real Metal, not SwiftShader

# 3 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework/Metal, NO Screen-Recording TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=light" out-light.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=dark"  out-dark.png  dark  15000
#   the harness POLLS document.documentElement[data-capture-ready] (≤ maxWaitMs) BEFORE takeSnapshot

# 4 · kill the serve + Chrome when done
```

Readiness is the `<html data-capture-ready>` attribute (+ `window.__captureReady`) — POLL it, never a fixed
sleep. The `?capture=<route>&mode=<light|dark>` URL boots `demo/main.ts` into the settled-frame mode; the
non-capture demo path is byte-untouched.

## The one gotcha (recorded for the fan-out agents)

The Chrome launch line must **quote** `"--remote-allow-origins=*"` — an unquoted `*` is glob-expanded by zsh
(`no matches found`) and the launch silently fails (exit 1, no CDP port). Every other step ran first-try.
