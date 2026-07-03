# Capture-pipeline validation — the C-SAFARI keystone (fresh non-authoring re-confirmation)

**Date:** 2026-07-02. **Validator:** capture-pipeline validator (non-authoring — did NOT build any BG slice).
**Route exercised:** `/dock/overview` (the dock-band surface, for `BG.W-DOCK-FISSION-WIRE`).
**Verdict:** dual-engine pipeline PROVEN end-to-end — Chrome (real Metal) AND Safari/WebKit (system WebKit.framework), BOTH modes.

The C-SAFARI blank-WebKit chronic (the 3-tranche miss) does NOT reproduce.

## The WORKING method (exact commands — the protocol §6.1 path, not re-derived)

1. **Build the BUILT demo bytes** (NOT the `:5199` dev shell — dev bare-shells WebKit):
   ```
   npm run demo:dist:build          # vite build demo/vite.demo-dist.config.ts → dist-demo/ (built in ~925ms)
   npm run demo:dist:serve          # vite preview on :5200 (background); wait for http 200
   ```

2. **Safari / WebKit leg — off-screen WKWebView (system WebKit.framework/Metal, NO Screen-Recording TCC):**
   ```
   clang -framework Cocoa -framework WebKit -fobjc-arc \
     docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
   /tmp/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=light" \
     <out>/dock-fission-wire-safari-light-desktop-full.png light 15000
   /tmp/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=dark"  \
     <out>/dock-fission-wire-safari-dark-desktop-full.png  dark  15000
   # → the harness polls document.documentElement[data-capture-ready] (fired @4500ms) BEFORE snapshot.
   ```

3. **Chrome leg — real Chrome.app + CDP (real Metal GPU, headed → not SwiftShader):**
   ```
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
     --remote-debugging-port=9456 --user-data-dir=<scratch> --no-first-run --no-default-browser-check about:blank &
   # then a playwright chromium.connectOverCDP("http://localhost:9456") script:
   #   newContext({ viewport:1440x900, deviceScaleFactor:2, colorScheme:<mode> })
   #   goto ?capture=/dock/overview&mode=<mode> ; waitForFunction data-capture-ready ; +800ms
   #   read GL_RENDERER off a throwaway webgl2 ctx ; page.screenshot clip 1440x900 → 2880x1800 PNG
   ```

## The 4-PNG result (all on disk, dimension-correct, real content, engine-badged)

| PNG | dims | badge ENGINE | badge GPU | mode | content |
|---|---|---|---|---|---|
| dock-fission-wire-chrome-light-desktop-full.png | 2880×1800 | CHROME | ANGLE Metal Renderer: Apple M5 Max | LIGHT | full /dock/overview (Overview title, GlassDock walkthrough, Collapsible dock pill, media-transport dock, nav rail + bottom nav dock) |
| dock-fission-wire-chrome-dark-desktop-full.png | 2880×1800 | CHROME | ANGLE Metal Renderer: Apple M5 Max | DARK | full /dock/overview, dark register |
| dock-fission-wire-safari-light-desktop-full.png | 2880×1800 | WEBKIT | Apple GPU | LIGHT | full /dock/overview |
| dock-fission-wire-safari-dark-desktop-full.png | 2880×1800 | WEBKIT | Apple GPU | DARK | full /dock/overview, dark register |

- **Chrome GL_RENDERER (both modes):** `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` — REAL Metal GPU, NOT SwiftShader/llvmpipe/ANGLE-Software. Proven in-pixel by the badge AND by the live `GL_RENDERER` probe.
- **Safari engine:** WKWebView over system WebKit.framework → `Apple GPU` badge; `data-capture-ready` fired @4500ms in both modes; snapshots 2880×1800. Off-screen path, no TCC.
- **Body text length** (Chrome probe): light 4918 / dark 4917 chars — real rendered content, not a blank/bare-shell `<main>`. File sizes 1.64–1.88 MB (a blank page would be a few KB).
- **Cross-engine parity (harness-level):** both engines render the SAME route faithfully (identical layout, warm terracotta card, dock pills, nav) — the dual-engine harness produces comparable real content across engines. (This is a harness-fidelity observation, NOT a gestalt verdict — a gestalt PASS/FAIL is `proof:ba-gestalt`'s per-surface decode by the owning wave's non-authoring judge.)

## Fences honored

- Operated only under `/Users/mkbabb/Programming/glass-ui`. All PNGs + this DELTA under `docs/tranches/BG/audit/visual/c-safari-pipeline-validation/`. The `wkshot-live` binary compiled to `/tmp` per the protocol's documented command; the Chrome throwaway profile in the session scratchpad. No sibling under `~/Programming` touched.
- `node scripts/verify-siblings-intact.mjs --quiet` exits 0 before AND after.
- No `src/`/`demo/`/`styles/`/`scripts/` edit — defects (if any) are a build-fix-agent's job; this validator only proves the instrument.
