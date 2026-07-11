# Capture-pipeline validation — BG.W-HANDMARK-PERFECT route (`/motion/handmark`)

**Role:** non-authoring CAPTURE-PIPELINE VALIDATOR. **Date:** 2026-07-10. **Verdict: PIPELINE PROVEN — dual-engine, both modes, on the HandMark route. `chromeOk:true` · `safariOk:true`.**

This is a pipeline-instrument proof per `real-paint-protocol.md` §3 — it certifies the dual-engine `?capture=` harness paints FULL route content + the in-pixel engine badge on BOTH real engines in BOTH modes. It does NOT flip the wave's own gestalt roster row (that is the owning non-authoring paint close).

## The WORKING method (exact commands — the proven C18 path)

1. `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before).
2. **Build BUILT bytes:** `npm run demo:dist:build` (vite build `demo/vite.demo-dist.config.ts` → `dist-demo/`, ~1s).
3. **Serve BUILT bytes on :5200:** `npm run demo:dist:serve` (`vite preview … --port 5200`). NOT :5199 dev (bare-shells WebKit).
4. **Chrome leg (real Metal GPU via CDP):**
   - Launch real Chrome.app: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9334 --user-data-dir=<throwaway> --no-first-run --new-window http://localhost:5200/`
   - `playwright chromium.connectOverCDP("http://localhost:9334")`, per mode navigate `http://localhost:5200/?capture=/motion/handmark&mode=<light|dark>`, poll `document.documentElement.hasAttribute('data-capture-ready')`, `page.screenshot({fullPage:true})`.
   - Script: `docs/tranches/BG/audit/visual/handmark-pipeline-validate/chrome-cap.mjs`.
5. **Safari/WebKit leg (system WebKit.framework/Metal, off-screen WKWebView, no TCC):**
   - `clang -framework Cocoa -framework WebKit -fobjc-arc docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live`
   - `/tmp/wkshot-live "http://localhost:5200/?capture=/motion/handmark&mode=<mode>" <out>.png <mode> 15000` (polls `data-capture-ready` before `takeSnapshotWithConfiguration`).
6. **Validate:** `node docs/tranches/BG/audit/visual/handmark-pipeline-validate/validate.mjs` (reuses the SINGLE decoder leaf `scripts/reflect-capture-verify.mjs` — `isRealPng`/`pngDimensions` + a body-variance non-blank probe + the magenta-fiducial/ink badge probe).
7. `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (after). Served `demo:dist:serve` + throwaway Chrome killed on completion.

## The 4-PNG evidence (all PASS)

| PNG | Engine | GPU (in-pixel badge) | Dims | Mode | isRealPng | body σ(lum) | body mean(lum) | magenta fiducial | verdict |
|---|---|---|---|---|---|---|---|---|---|
| `handmark-chrome-light-desktop-full.png` | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @1x | LIGHT | true | 40.4 | 217.2 | 2604 | PASS |
| `handmark-chrome-dark-desktop-full.png` | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @1x | DARK | true | 44.5 | 52.4 | 2604 | PASS |
| `handmark-safari-light-desktop-full.png` | WEBKIT | Apple GPU | 2880×1800 @2x | LIGHT | true | 50.9 | 221.2 | 6432 | PASS |
| `handmark-safari-dark-desktop-full.png` | WEBKIT | Apple GPU | 2880×1800 @2x | DARK | true | 51.3 | 54.0 | 6432 | PASS |

- **Real GPU, NOT SwiftShader.** Chrome `GL_RENDERER` probe = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`; WebKit badge = `Apple GPU`. The two engines are pixel-distinguishable (CHROME vs WEBKIT badge + different GPU strings + font metrics — a genuinely different engine, not a re-shot Chromium).
- **FULL route content, not a bare-shell.** Both engines/modes VISUALLY decode to the HandMark route gestalt: the "Hand Mark" display heading + the "HandMark — the platform's hand voice" blurb, the `PEN UNDERLINE · THE MASTHEAD DEFAULT` eyebrow + "The hand voice" heading, the "Who pays in gets connected" masthead card with the hand-drawn wobbled PEN underline under "pays in", the `BOIL BRUSH · THE NATURAL MORPHOLOGY` section + "The future is here" boil-underline masthead, over the paper-grain register (warm-cream light / luminous-dark). Sidebar icon rail + bottom nav dock ("Hand Mark" active). Body σ(lum) 40–51 (a flat shell reads ~0).
- **Mode-distinct.** Light means L≈217–221 (warm-cream); dark means L≈52–54 (luminous-dark register). The in-pixel `MODE LIGHT`/`MODE DARK` badge matches.
- **Readiness POLLED, never a fixed sleep.** Chrome `data-capture-ready` @~3.8–4.1s (`ready:true`); WebKit `data-capture-ready` @4500ms both modes; then snapshot.

## Fences honored

- Operated ONLY under `/Users/mkbabb/Programming/glass-ui`; wrote PNGs + this DELTA under `docs/tranches/BG/audit/visual/handmark-pipeline-validate/` + one cursor line in `EXECUTION-PROGRESS.md`. The `wkshot-live` binary is the documented `-o /tmp/wkshot-live` compile target (a throwaway binary, not a moved sibling / not a PNG/DELTA artifact).
- No `src/`/`demo/`/`styles/`/`scripts/` edited to "fix" a defect. No sibling under `~/Programming` touched. `verify-siblings-intact --quiet` exit 0 before AND after.

**The C-SAFARI blank-WebKit chronic does NOT reproduce on the HandMark route.** The instrument is certified end-to-end for fan-out.
