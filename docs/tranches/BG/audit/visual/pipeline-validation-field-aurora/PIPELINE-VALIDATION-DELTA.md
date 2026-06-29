# Dual-engine capture-pipeline validation — the C-SAFARI keystone

**Date:** 2026-06-29 · **Branch:** tranche/BG · **Validator:** capture-pipeline-validator subagent
**Wave under test:** BG.W-FIELD-AURORA (row 2.2) · **Route:** `/foundations/colors` (the shell-field
content route — the re-paint self-check route from commit b3d65eec)

## Verdict — PIPELINE PROVEN END-TO-END (chromeOk=true · safariOk=true)

Both engines capture FULL route content + the in-pixel engine badge, BOTH modes, dimension-correct.
The C-SAFARI keystone (the chronic that missed four prior tranches) is validated at the harness level
BEFORE fan-out.

| Capture | Engine badge | GPU badge | Mode | Dim | Bytes | Content |
|---|---|---|---|---|---|---|
| chrome-field-aurora-light.png | CHROME | ANGLE Metal Renderer: Apple M5 Max | LIGHT | 2880×1800 | 2.21 MB | real `/foundations/colors` |
| chrome-field-aurora-dark.png  | CHROME | ANGLE Metal Renderer: Apple M5 Max | DARK  | 2880×1800 | 3.50 MB | real `/foundations/colors` |
| safari-field-aurora-light.png | WEBKIT | Apple GPU | LIGHT | 2880×1800 | 1.76 MB | real `/foundations/colors` |
| safari-field-aurora-dark.png  | WEBKIT | Apple GPU | DARK  | 2880×1800 | 2.17 MB | real `/foundations/colors` |

### Proof points

- **Real content, not bare-shell/blank.** All four PNGs show the live `/foundations/colors` page — the
  "Colors" heading, the 13-stop `--section-color` ramp, the Viz-basis cards (Fourier/Chebyshev/Legendre/
  Amber/Green), the sidebar icon rail, the dock nav. Chrome probe: `bodyTextLen` 986–987,
  `canvases` 1 (the recessive warm shell-field aurora). The dark-shell WebKit blank-shell failure mode
  (Stage-0 chronic) does NOT reproduce — WebKit paints FULL in both modes.
- **Dimension-correct.** Every PNG is 2880×1800 = the retina-2× of the 1440×900 capture viewport
  (Chrome `deviceScaleFactor: 2`; WebKit off-screen `@2x`). The two engines agree exactly.
- **In-pixel engine badge = the SOLE provenance.** The magenta `#ff00ff`-bordered top-left panel proves
  WHICH engine rendered the bytes the eye saw: Chrome → `ENGINE CHROME`; WebKit → `ENGINE WEBKIT`. The
  badge engine field DISCRIMINATES the two engines (a forged-engine capture would mismatch its own
  `navigator.userAgent`-derived badge).
- **Real GPU, not SwiftShader.** Chrome badge GPU = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max,
  Unspecified Version)` — real Metal, off the live `GL_RENDERER`. WebKit badge GPU = `Apple GPU` — the
  system WebKit.framework/Metal path, NO `--use-gl=angle`, NO SwiftShader.
- **Mode is load-bearing.** LIGHT renders the warm-cream field; DARK renders the near-black
  W-DARK-MATERIAL luminous-dark register (the section pastels lift, the heading flips to white, the field
  glows warm-ember). The `&mode=` param genuinely drives the scheme in both engines.
- **Readiness was deterministic.** WebKit reported `data-capture-ready after 4500ms -> snapshotting`
  (the page genuinely signaled ready — NOT a fall-through to the `maxWaitMs` cap). Chrome polled
  `document.documentElement.hasAttribute('data-capture-ready')` before each screenshot.

## The WORKING METHOD (exact commands — the binding instructions)

### 0 · Build + serve the BUILT bytes (NOT :5199 dev — that bare-shells WebKit)
```bash
npm run demo:dist:build                 # → dist-demo/ (vite build, ~2s)
npm run demo:dist:serve                 # → vite preview on :5200 (BUILT bytes)
# wait for curl http://localhost:5200/ == 200
```

### 1 · Chrome leg — real Chrome.app + CDP (real Metal GPU)
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9456 --user-data-dir=/tmp/chrome-cdp-pipe-validate \
  --no-first-run --no-default-browser-check about:blank &
# then: playwright chromium.connectOverCDP("http://localhost:9456")
#   newContext({ viewport:{1440,900}, deviceScaleFactor:2, colorScheme:<mode> })
#   page.goto("http://localhost:5200/?capture=/foundations/colors&mode=<mode>")
#   page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"))
#   read GL_RENDERER (WEBGL_debug_renderer_info) → proves Metal not SwiftShader
#   page.screenshot({ clip:{0,0,1440,900} })  → 2880×1800 retina PNG + badge
```
The runnable script: `chrome-capture.mjs` (in this dir). Writes `chrome-results.json`.

### 2 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework/Metal, NO TCC)
```bash
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m \
  -o docs/tranches/BG/audit/visual/wkshot-live      # compile once (under glass-ui, NOT /tmp)
docs/tranches/BG/audit/visual/wkshot-live \
  "http://localhost:5200/?capture=/foundations/colors&mode=light" out-light.png light 15000
docs/tranches/BG/audit/visual/wkshot-live \
  "http://localhost:5200/?capture=/foundations/colors&mode=dark"  out-dark.png  dark  15000
# → 2880×1800 PNGs; the harness POLLS document.documentElement[data-capture-ready]
#   (up to maxWaitMs) BEFORE takeSnapshotWithConfiguration.
```

### 3 · Verify each PNG
- `sips -g pixelWidth -g pixelHeight <png>` → 2880×1800 (dimension-correct)
- visual read → real route content + the magenta-bordered in-pixel engine badge top-left

## Notes
- Chrome scratch profile lives in `/tmp/chrome-cdp-pipe-validate` (ephemeral browser user-data-dir only —
  NO deliverable bytes in /tmp; all PNGs/DELTAs are under `docs/tranches/BG/audit/visual/`).
- `node scripts/verify-siblings-intact.mjs --quiet` exits 0 before AND after.
- This validates the PIPELINE. The binding W-REFLECT3 re-paint gestalt verdict for BG.W-FIELD-AURORA
  is a separate concern (the field reads recessive-warm, AA-clear in both modes per the captures, but the
  full per-surface gestalt-roster verdict is owed at the wave's own paint-close).
