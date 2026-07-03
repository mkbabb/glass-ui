# Capture-pipeline validation DELTA — the C-SAFARI keystone re-proof

**Role:** CAPTURE-PIPELINE VALIDATOR (independent, non-authoring). Proves the dual-engine `?capture=`
harness works end-to-end BEFORE fan-out — NOT a wave-paint verdict.
**Date:** 2026-07-03
**Route exercised:** `/display/buttons` (BG.W-GLASS-DEFAULT-DEFINITION primary cohort `.btn-glass`, 25 elements).
**Verdict: BOTH ENGINES PROVEN — chromeOk=true, safariOk=true.** The C-SAFARI blank-WebKit chronic does
NOT reproduce. All four PNGs render full route content + the in-pixel engine badge at 2880×1800.

---

## The proven working method (exact commands)

```bash
# 0 — tripwire (before AND after)
node scripts/verify-siblings-intact.mjs --quiet   # exit 0

# 1 — BUILT bytes on :5200 (NOT :5199 dev, which bare-shells WebKit)
npm run demo:dist:build                            # vite build → dist-demo (5.12s)
npm run demo:dist:serve                            # vite preview :5200 (background)
curl -s -o /dev/null -w "%{http_code}" "http://localhost:5200/?capture=/display/buttons&mode=light"  # 200

# 2 — Chrome leg (real Chrome.app + CDP, real Metal GPU)
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9466 --user-data-dir=/tmp/chrome-capture-validator-profile \
  --no-first-run --no-default-browser-check about:blank &
curl -s http://localhost:9466/json/version                 # Chrome/149.0.7827.201
node docs/tranches/BG/audit/visual/capture-pipeline-validation/chrome-validate.mjs
#   → connectOverCDP :9466 → newContext(colorScheme, deviceScaleFactor:2) →
#     goto ?capture=/display/buttons&mode=<m> → waitForFunction data-capture-ready →
#     GL_RENDERER probe + computed-DOM probe → page.screenshot 1440×900@2x

# 3 — Safari/WebKit leg (off-screen system WebKit.framework/Metal WKWebView, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/display/buttons&mode=light" \
  docs/tranches/BG/audit/visual/capture-pipeline-validation/validate-buttons-safari-light.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/display/buttons&mode=dark" \
  docs/tranches/BG/audit/visual/capture-pipeline-validation/validate-buttons-safari-dark.png  dark  15000
#   → polls document.documentElement[data-capture-ready] (landed @4500ms) BEFORE snapshot
```

---

## The evidence (4 PNGs on disk, 2880×1800, in-pixel badge decoded)

| PNG | dim | badge ENGINE | badge GPU | badge MODE | content |
|---|---|---|---|---|---|
| `validate-buttons-chrome-light.png` | 2880×1800 | CHROME | ANGLE Metal Renderer: **Apple M5 Max** | LIGHT | Buttons page, 25 `.btn-glass`, live field, dock rails |
| `validate-buttons-chrome-dark.png`  | 2880×1800 | CHROME | ANGLE Metal Renderer: **Apple M5 Max** | DARK  | same, W-DARK-MATERIAL near-black warm bg |
| `validate-buttons-safari-light.png` | 2880×1800 | **WEBKIT** | **Apple GPU** | LIGHT | same route content, real system WebKit |
| `validate-buttons-safari-dark.png`  | 2880×1800 | **WEBKIT** | **Apple GPU** | DARK  | same, dark register |

- **Chrome GPU** = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` — real Metal,
  NOT SwiftShader/llvmpipe/ANGLE-Software.
- **Safari GPU** = `Apple GPU` on an off-screen WKWebView (system WebKit.framework) — a DISTINCT engine from
  Chrome (proven by the WEBKIT badge + the visibly different gradient render on the live field), NOT the
  Playwright-bundled webkit.
- **Content** is FULL route paint, not bare-shell: Chrome computed-DOM probe read `bodyTextLen 1681/1680`,
  `btnGlass=25`, `canvasCount>0`; the badge DOM `data-capture-badge` present in every context.
- **Readiness** is polled (`data-capture-ready`), never a fixed sleep — WebKit landed the flag @4500ms both
  modes; Chrome via `page.waitForFunction`.
- **Provenance** is the in-pixel badge (top-left black panel, green text, `#ff00ff` magenta locator border),
  decoded visually from all four downscaled frames (`_inspect/*-full.png`) — the badge, not prose, proves
  which engine produced which bytes.

The device-free proof reads SOURCE; this validation reads PAINT. The pipeline that carries the paint signal
is proven functional; per-wave paint verdicts remain the non-authoring judge's job at each wave close.
