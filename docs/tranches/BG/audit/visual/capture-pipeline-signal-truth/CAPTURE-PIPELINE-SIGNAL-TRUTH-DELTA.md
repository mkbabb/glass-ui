# Capture-pipeline validation — BG.W-GLASS-SIGNAL-TRUTH route (`/dock/overview`)

> **Role:** CAPTURE-PIPELINE VALIDATOR (non-authoring; did NOT build the wave). **Purpose:** PROVE the
> dual-engine `?capture=` harness works END-TO-END on the BG.W-GLASS-SIGNAL-TRUTH route BEFORE any fan-out —
> the C-SAFARI keystone (the chronic that missed four prior tranches). This DELTA certifies the INSTRUMENT,
> not the wave's paint verdict (the ST3 dead-observer defect is the prior judge's `BG.W-GLASS-SIGNAL-TRUTH-DELTA.md`
> + a build-fix agent's job — NOT re-adjudicated here). **Date:** 2026-07-04. **Fence honored:** ZERO
> `src/demo/styles/scripts` edits; PNGs+DELTA under `docs/tranches/BG/audit/visual/` only; `/tmp` used only
> for the throwaway Chrome profile + the compiled harness binary (never a sibling move).

## Verdict — PIPELINE PROVEN (both engines, both modes)

| leg | result |
|---|---|
| **Chrome (CDP, real `Chrome.app` 149.0.7827.201)** | **PASS** — full `/dock/overview` content, real `ANGLE Metal Renderer Apple M5 Max` GPU (NOT SwiftShader), in-pixel `ENGINE CHROME` badge, BOTH modes, 2880×1800 |
| **Safari/WebKit (off-screen WKWebView, system WebKit.framework/Metal, no TCC)** | **PASS** — full `/dock/overview` content, `Apple GPU`, in-pixel `ENGINE WEBKIT` badge, BOTH modes, 2880×1800; `data-capture-ready` landed at 4800ms both modes |

The blank-WebKit chronic does **NOT** reproduce on this route. Both engines capture the FULL settled route
(Overview hero + GlassDock walkthrough blurb + the DockStage aurora field + collapsible dock pill +
always-expanded media transport + the left sidebar dock rail + the bottom nav dock). The two engines are
discriminable FROM the pixels (the badge), not from the capture method.

## Evidence on disk (this dir)

| png | engine badge | GPU badge | mode | dims | bytes |
|---|---|---|---|---|---|
| `BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-light.png` | `CHROME` | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` | LIGHT | 2880×1800 | 1,919,151 |
| `BG.W-GLASS-SIGNAL-TRUTH-chrome-dock-overview-dark.png`  | `CHROME` | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` | DARK  | 2880×1800 | 1,895,714 |
| `BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-light.png` | `WEBKIT` | `Apple GPU` | LIGHT | 2880×1800 | 1,680,531 |
| `BG.W-GLASS-SIGNAL-TRUTH-safari-dock-overview-dark.png`  | `WEBKIT` | `Apple GPU` | DARK  | 2880×1800 | 1,706,984 |

All four ≥1.68 MB (far above the ~173 KB blank-shell floor the C18 delta flagged), all `2880×1800`
(retina 2× of the 1440×900 viewport), the magenta `#ff00ff` fiducial frame + the deterministic
ENGINE·GPU·VIEW·MODE badge present in every PNG.

**Chrome DOM sanity (both modes):** `mainChildren:2`, `glCanvases:2` (the live DockStage aurora canvas is
present + nonzero), `runningAnims:0` (the `capture.css` settled-frame neutralization holds — no
transform-promoted CA layer for an off-screen snapshot to drop). `rootBackdropHue:(empty/absent)` (the dead
`--glass-backdrop-hue` channel is absent — ST2 stays clean). NOTE: `sampledCount:0` re-confirms the wave's
own ST3 dead-dock-observer defect — that is the WAVE's paint verdict (see the prior judge's DELTA), NOT a
pipeline defect; the capture instrument faithfully recorded it.

## The WORKING method (exact commands — the proven C18 path, re-run verbatim)

```bash
# 0 · siblings tripwire (before + after) — exit 0
node scripts/verify-siblings-intact.mjs --quiet

# 1 · build + serve the BUILT demo dist on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build                              # → dist-demo/, ~2.4s
npm run demo:dist:serve                              # vite preview :5200 (background)

# 2 · Chrome leg — launch real Chrome.app with CDP, capture via connectOverCDP
#     NOTE zsh globs `*` — QUOTE --remote-allow-origins:
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9477 --user-data-dir=/tmp/chrome-cap-profile \
  --no-first-run --no-default-browser-check "--remote-allow-origins=*" about:blank &
#   then (proven script, connects CDP :9477, both modes, GL_RENDERER off a throwaway WebGL2 ctx):
node docs/tranches/BG/audit/visual/BG.W-GLASS-SIGNAL-TRUTH-chrome-capture.mjs \
  docs/tranches/BG/audit/visual/capture-pipeline-signal-truth /dock/overview dock-overview
#   → navigate http://localhost:5200/?capture=/dock/overview&mode=<m>
#     waitUntil:load → waitForFunction(data-capture-ready) → page.screenshot (2880×1800)

# 3 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework, Metal, NO Screen-Recording TCC)
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

## One gotcha (recorded for the fan-out agents)

The Chrome launch line must **quote** `"--remote-allow-origins=*"` — an unquoted `*` is glob-expanded by zsh
(`no matches found`) and the launch silently fails (exit 1, no CDP port). Every other step ran first-try.
