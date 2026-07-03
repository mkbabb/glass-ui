# C18 dual-engine capture-pipeline validation (the C-SAFARI keystone precondition)

**Status: PROVEN end-to-end (both engines, both modes) BEFORE any paint fan-out.** This is the
pipeline-readiness proof the real-paint protocol §6.1 requires — NOT a wave-verdict flip. No
`bg-gestalt-roster.md` row is touched; the surfaces here validate that the C18 harness produces
real, dimension-correct, engine-provenanced captures on this M5 Max box.

- **Date:** 2026-07-03
- **Wave route exercised:** `BG.W-GLASS-DYNAMICS` → `/display/buttons` (a glass read-carrier route
  named verbatim in `KS-GLASS.md §6`; the CTA glass over the live blue field + the glass-register
  pills are a deterministic glass surface).
- **Serve path:** BUILT bytes (`npm run demo:dist:build` → `npm run demo:dist:serve`, `:5200`) — NOT
  the `:5199` dev server (WebKit bare-shells the dev transform pipeline).

## The WORKING method (exact commands — do not re-derive)

```bash
# 0. build + serve the BUILT demo dist (NOT :5199 dev)
npm run demo:dist:build
npm run demo:dist:serve            # vite preview on :5200

# 1. Safari/WebKit leg — off-screen WKWebView (system WebKit.framework / Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o <scratch>/wkshot-live
<scratch>/wkshot-live "http://localhost:5200/?capture=/display/buttons&mode=light" \
  glass-dynamics-safari-light-desktop-full.png light 15000
<scratch>/wkshot-live "http://localhost:5200/?capture=/display/buttons&mode=dark" \
  glass-dynamics-safari-dark-desktop-full.png  dark  15000
#   → the harness POLLS document.documentElement[data-capture-ready] before takeSnapshot.

# 2. Chrome leg — real on-screen Chrome.app + CDP connectOverCDP (real Metal GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9333 --user-data-dir=<scratch>/chrome-profile \
  --no-first-run --no-default-browser-check --window-size=1440,900 "about:blank" &
# playwright-core chromium.connectOverCDP("http://localhost:9333")
#   → page.goto(...?capture=/display/buttons&mode=<m>)
#   → waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"))
#   → read GL_RENDERER (WEBGL_debug_renderer_info) → page.screenshot()
```

## Evidence — 4 PNGs on disk, all real route content + in-pixel engine badge

| PNG | engine badge (decoded from pixels) | GPU (real, NOT SwiftShader) | mode | dims | content |
|---|---|---|---|---|---|
| `glass-dynamics-chrome-light-desktop-full.png` | `CHROME` | `ANGLE Metal Renderer: Apple M5 Max` | LIGHT | 2880×1626 | full Buttons route |
| `glass-dynamics-chrome-dark-desktop-full.png`  | `CHROME` | `ANGLE Metal Renderer: Apple M5 Max` | DARK  | 2880×1626 | full Buttons route |
| `glass-dynamics-safari-light-desktop-full.png` | `WEBKIT` | `Apple GPU`                        | LIGHT | 2880×1800 | full Buttons route |
| `glass-dynamics-safari-dark-desktop-full.png`  | `WEBKIT` | `Apple GPU`                        | DARK  | 2880×1800 | full Buttons route |

- **Real route content, not bare-shell / blank.** Every capture shows the `/display/buttons` route:
  the "Buttons" title, the "DISPLAY · BUTTONS" eyebrow, "Launch the sequence" headline, the CTA glass
  buttons composited over the live blue field, the "Glass register" glass/glass-wash/Toggle pills,
  the sidebar rail, and the bottom dock nav strip.
- **Dimension-correct + retina 2× — deterministic.** WebKit 2880×1800 (1440×900 @2×); Chrome
  2880×1626 (1440×813 @2× — the 813 is the headed-window content height after Chrome's own toolbar).
  Both are the expected retina double-scale.
- **Engine provenance is IN-PIXEL.** The top-left `#ff00ff`-bordered badge encodes ENGINE / GPU /
  VIEW / MODE. The two engines produce DISTINCT badges (`CHROME` vs `WEBKIT`) and DISTINCT GPU strings
  — the pipeline discriminates engines by the pixels, not a forgeable sidecar.
- **Real Metal both legs — NOT SwiftShader/llvmpipe/ANGLE-Software.** Chrome reads
  `ANGLE Metal Renderer: Apple M5 Max`; WebKit reads `Apple GPU` (system WebKit.framework Metal path).

## Verdict

- `chromeOk = true` — real Chrome.app + CDP over BUILT `:5200`, real Metal M5 Max, both modes, badge decoded.
- `safariOk = true` — off-screen WKWebView (system WebKit/Metal, no TCC), both modes, badge decoded WEBKIT/Apple GPU.

The dual-engine capture pipeline is PROVEN. The C18 harness is ready for the per-wave paint fan-out.
No Safari blocker: the off-screen WKWebView path needs NO Screen-Recording TCC permission and the
harness builds + polls `data-capture-ready` cleanly.
