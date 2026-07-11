# CAPTURE-PIPELINE VALIDATION — BG.W-GLASS-DEPTH-TIER route (`/display/buttons`)

**Verdict: PIPELINE PROVEN end-to-end. Chrome OK ∧ Safari OK. Both engines, both modes, real Metal GPU,
full route content, in-pixel engine badge.** The C-SAFARI blank-WebKit chronic does NOT reproduce.

Non-authoring capture-pipeline validator run, 2026-07-05. This validates the DUAL-ENGINE `?capture=` harness
on the BG.W-GLASS-DEPTH-TIER paint route BEFORE fan-out — it is a PIPELINE proof, not a wave-paint verdict
(the deep-tier thickness verdict rides the wave's own non-authoring paint close).

## The working method (exact commands — the proven C18 harness)

Fresh-source build (`@glass` → `src/`, NOT a stale library `dist/`), served as BUILT bytes on `:5200`
(NOT `:5199` dev, which bare-shells WebKit):

```bash
npm run demo:dist:build          # vite build --config demo/vite.demo-dist.config.ts → dist-demo/
npm run demo:dist:serve          # vite preview --port 5200  (HTTP 200 confirmed)
```

**Chrome leg (real Chrome.app + CDP → real Metal GPU):**
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9477 --user-data-dir=<scratch>/chrome-profile \
  --no-first-run --no-default-browser-check --window-size=1500,1000 about:blank
# CDP :9477/json/version → Chrome/149.0.7827.201
# playwright.chromium.connectOverCDP("http://localhost:9477"); per mode:
#   newContext({viewport:1440×900, deviceScaleFactor:2, colorScheme:mode})
#   goto http://localhost:5200/?capture=%2Fdisplay%2Fbuttons&mode=<mode>
#   waitForFunction(document.documentElement.hasAttribute("data-capture-ready"))
#   +1200ms → GL_RENDERER probe → page.screenshot
```

**Safari/WebKit leg (off-screen WKWebView → system WebKit.framework/Metal, NO TCC):**
```bash
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o <scratch>/wkshot-live
<scratch>/wkshot-live "http://localhost:5200/?capture=/display/buttons&mode=light" out-light.png light 15000
<scratch>/wkshot-live "http://localhost:5200/?capture=/display/buttons&mode=dark"  out-dark.png  dark  15000
#   → data-capture-ready polled at 4500ms, then takeSnapshotWithConfiguration → 2880×1800 PNG.
```

## The 4-PNG capture set (all on disk, this dir)

| PNG | ENGINE badge | GPU badge | VIEW badge | MODE | dim | isRealPng | meanL | meanChroma |
|---|---|---|---|---|---|---|---|---|
| `glass-depth-tier-chrome-light-desktop-full.png` | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @2x | LIGHT | 2880×1800 | true | 0.846 | 0.0372 |
| `glass-depth-tier-chrome-dark-desktop-full.png`  | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @2x | DARK  | 2880×1800 | true | 0.294 | 0.0314 |
| `glass-depth-tier-safari-light-desktop-full.png` | WEBKIT | Apple GPU                         | 1440×900 @2x | LIGHT | 2880×1800 | true | 0.906 | 0.0303 |
| `glass-depth-tier-safari-dark-desktop-full.png`  | WEBKIT | Apple GPU                         | 1440×900 @2x | DARK  | 2880×1800 | true | 0.254 | 0.0321 |

Stats via `scripts/reflect-capture-verify.mjs` (`pngDimensions`/`isRealPng`/`pngRegionStats`) — the ONE
decoder leaf.

## What was confirmed (eye + badge decode)

- **Both engines render REAL route content, NOT a bare shell.** The `/display/buttons` route composits fully
  in all four: the "Buttons" display title, the "DISPLAY · BUTTONS" eyebrow, the "Launch the sequence" glass
  CTA (`Launch sequence` / `Next →`) staged over the live blue field, the "Glass register" glass/glass-wash/
  Toggle chips, the "Raw .glass-btn utility" section, the left icon-rail dock + the bottom nav dock. The
  Safari render is layout-identical to Chrome — the C-SAFARI blank-WebKit chronic does NOT reproduce.
- **The in-pixel engine badge decodes correctly per engine.** Chrome PNGs carry `ENGINE CHROME` +
  `GPU ANGLE Metal Renderer: Apple M5 Max` (real Metal, NOT SwiftShader/llvmpipe/ANGLE Software); Safari PNGs
  carry `ENGINE WEBKIT` + `GPU Apple GPU` (system WebKit/Metal). The magenta `#ff00ff` locator border is
  present on all four. Provenance is in-pixel, not in-prose.
- **Dimension-correct + mode-distinct.** All four are 2880×1800 (1440×900 @2× Retina, badge-confirmed). Light
  vs dark separate by luminance (light meanL ~0.85-0.91 / dark ~0.25-0.29); whole-frame meanChroma ≥ 0.03
  clears the warm-glass floor (0.02) — warm-cream identity, not a grey slab.
- **WebKit readiness is deterministic, not a fixed sleep.** `data-capture-ready` landed at 4500ms in both
  WebKit runs; the harness polls the attribute before `takeSnapshotWithConfiguration`.

## Fences honoured

Operated only under `/Users/mkbabb/Programming/glass-ui`; no `/tmp` artifacts committed (scratch build/harness
binaries only); zero sibling touched (`node scripts/verify-siblings-intact.mjs --quiet` exits 0 before + after).
No `src`/`demo`/`styles`/`scripts` edited — this is a capture proof, not a defect fix. The demo `:5200` server
and the CDP Chrome were killed on completion.
