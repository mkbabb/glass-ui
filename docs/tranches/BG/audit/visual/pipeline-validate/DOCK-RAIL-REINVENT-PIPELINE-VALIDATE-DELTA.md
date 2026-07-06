# CAPTURE-PIPELINE VALIDATION — DOCK-RAIL-REINVENT route (`/dock/rail`)

**Role:** non-authoring CAPTURE-PIPELINE VALIDATOR (did not build any wave — proves the dual-engine
capture INSTRUMENT works end-to-end BEFORE fan-out; this is pipeline-validation evidence per
real-paint-protocol §3, NOT a wave gestalt-verdict flip).
**Date:** 2026-07-05
**Route:** `/dock/rail` (the `BG.W-DOCK-RAIL-REINVENT` wave route — resolves the "Vertical Dock" story).
**Verdict:** **PIPELINE PROVEN.** Both engines, both modes, real route content + in-pixel engine badge.
`chromeOk = true` · `safariOk = true`.

---

## The working method (exact commands — the C18 proven path)

1. `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before).
2. Build the BUILT demo bytes: `npm run demo:dist:build` → exit 0 (`dist-demo/`).
3. Serve on :5200: `npm run demo:dist:serve` (vite preview, `--port 5200`).
4. **Chrome leg (real Chrome.app + CDP, real Metal GPU):**
   - Launch: `Google Chrome --remote-debugging-port=9477 --user-data-dir=<scratchpad>/chrome-profile`
     (Chrome 149; CDP `/json/version` probed up).
   - `playwright.chromium.connectOverCDP("http://localhost:9477")`, new context per mode
     (`deviceScaleFactor: 2`, `colorScheme: <mode>`), navigate
     `http://localhost:5200/?capture=/dock/rail&mode=<light|dark>`, poll
     `document.documentElement.hasAttribute('data-capture-ready')`, `page.screenshot`.
5. **Safari/WebKit leg (off-screen WKWebView, system WebKit.framework/Metal, NO TCC):**
   - `clang -framework Cocoa -framework WebKit -fobjc-arc docs/tranches/BG/audit/wkshot-live.m -o <scratchpad>/wkshot-live`
   - `<scratchpad>/wkshot-live "http://localhost:5200/?capture=/dock/rail&mode=<light|dark>" out.png <mode> 15000`
     (polls `data-capture-ready` before `takeSnapshotWithConfiguration`).
6. `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (after). Kill `demo:dist:serve` + throwaway Chrome.

FENCES honored: all work under `/Users/mkbabb/Programming/glass-ui`; the throwaway wkshot binary +
Chrome profile live in the session scratchpad (never bare `/tmp`, never a sibling under `~/Programming`);
zero `src/`/`demo/`/`styles/`/`scripts/` edits.

---

## The 4-PNG evidence (all resolve on disk, `docs/tranches/BG/audit/visual/pipeline-validate/`)

| file | engine (badge) | GPU (badge) | mode | dims | bytes | content |
|---|---|---|---|---|---|---|
| `rail-chrome-light-desktop-full.png` | CHROME | ANGLE Metal Renderer: Apple M5 Max | LIGHT | 2880×1800 | 1.58 MB | FULL Vertical Dock route |
| `rail-chrome-dark-desktop-full.png` | CHROME | ANGLE Metal Renderer: Apple M5 Max | DARK | 2880×1800 | 1.59 MB | FULL Vertical Dock route |
| `rail-safari-light-desktop-full.png` | WEBKIT | Apple GPU | LIGHT | 2880×1800 | 1.80 MB | FULL Vertical Dock route |
| `rail-safari-dark-desktop-full.png` | WEBKIT | Apple GPU | DARK | 2880×1800 | 1.80 MB | FULL Vertical Dock route |

- **Real content, not blank/bare-shell.** Each PNG visually decodes to the full "Vertical Dock" story:
  the display heading + prose, the vertical `<GlassDock>` over the warm aurora field, the sidebar icon
  rail, the bottom nav dock (Liquid Morph / Dock Gallery / Overview / Dock Layers / Vertical Dock). Chrome
  `mainChildren:2`, `ready:true` both modes.
- **In-pixel engine badge PROVES the engine** (top-left panel, magenta `#ff00ff` fiducial): CHROME captures
  read `ENGINE CHROME · GPU ANGLE Metal Renderer: Apple M5 Max` (real Metal, NOT SwiftShader/llvmpipe/ANGLE
  Software); WebKit captures read `ENGINE WEBKIT · GPU Apple GPU` (system WebKit.framework/Metal). The two
  engines are pixel-distinguishable, and the WebKit font metrics differ from Chrome's (genuinely different
  engine, not a re-shot Chromium).
- **Dimension-correct.** All four 2880×1800 (retina 2× of the 1440×900 viewport).
- **The C-SAFARI blank-WebKit chronic does NOT reproduce** — WebKit `data-capture-ready` polled @4500ms both
  modes, then the full route content snapshotted (the C18 settled-frame `?capture=` boot neutralizes the
  route-enter transform-promoted layer so the off-screen snapshot captures the base layer, not a blank
  `<main>`).

The INSTRUMENT is certified end-to-end for fan-out. The wave's OWN gestalt roster row flips only at its
owning non-authoring paint close (real-paint-protocol §3) — this validator does not judge wave paint.
