# BG dual-engine capture pipeline — PROVEN end-to-end (the C-SAFARI keystone)

> **Role:** capture-pipeline VALIDATOR (non-authoring). **Purpose:** PROVE the dual-engine
> `?capture=` harness (C18, commit d4ae4577) captures full real route content + the in-pixel
> engine badge on BOTH engines, BOTH modes, BEFORE any fan-out. **Surface:** the
> `BG.W-GLASS-CONSUMER-BAND` consumer route `/display/buttons` (Badge/SelectableChip/IconChip/
> glass-atom/glass-chip fold onto the shared `--glass-fill-tinted` plate/rim pair).
> **Date:** 2026-07-03. **Fence:** ZERO src/demo/styles/scripts edits — this records the
> pipeline works; a defect (if any) is the build-fix-agent's job.

## Verdict — chromeOk: TRUE · safariOk: TRUE

Both engines capture FULL real route content (the Buttons story: the "Launch the sequence"
liquid-glass CTA over the live field, the glass/glass-wash/Toggle register chips, the Raw
`.glass-btn` utility, the sidebar nav, the bottom dock), dimension-correct at retina 2×, with
the decodable in-pixel engine badge. NOT a blank/bare-shell — the C18 route-enter de-promotion
fix holds on the consumer route.

## Evidence on disk (this dir)

| png | engine | mode | dims | bytes | badge text (decoded from pixels) |
|---|---|---|---|---|---|
| `glass-consumer-band-chrome-light-desktop-full.png` | CHROME (CDP, real Metal) | light | 2880×1800 | 2.71 MB | `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version) · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT` |
| `glass-consumer-band-chrome-dark-desktop-full.png` | CHROME | dark | 2880×1800 | 3.90 MB | `… MODE DARK` |
| `glass-consumer-band-safari-light-desktop-full.png` | WEBKIT (off-screen WKWebView, system WebKit.framework/Metal, NO TCC) | light | 2880×1800 | 2.49 MB | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT` |
| `glass-consumer-band-safari-dark-desktop-full.png` | WEBKIT | dark | 2880×1800 | 2.91 MB | `… MODE DARK` |

- **Chrome GPU proof (real, NOT SwiftShader):** the badge + the CDP `GL_RENDERER` readback both
  report `ANGLE Metal Renderer: Apple M5 Max` — the real Metal GPU, not SwiftShader/llvmpipe/
  ANGLE-Software.
- **Safari path (NO on-screen `screencapture`/Screen-Recording-TCC needed):** the off-screen
  WKWebView (system `WebKit.framework`, Metal) captures the full settled frame after the boot
  polls `document.documentElement[data-capture-ready]`. Ready landed at 4500 ms (light) /
  4800 ms (dark).

## The WORKING method (exact commands — use it, do NOT re-derive)

```bash
# 0 · siblings tripwire (before + after) — exit 0
node scripts/verify-siblings-intact.mjs --quiet

# 1 · build + serve the BUILT demo dist on :5200 (NOT :5199 dev, which bare-shells WebKit)
npm run demo:dist:build                                    # → dist-demo/, ~2.5s
npm run demo:dist:serve                                    # vite preview :5200 (background)

# 2 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework, Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/display/buttons&mode=light" \
  docs/tranches/BG/audit/visual/pipeline-proof/glass-consumer-band-safari-light-desktop-full.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/display/buttons&mode=dark"  \
  docs/tranches/BG/audit/visual/pipeline-proof/glass-consumer-band-safari-dark-desktop-full.png  dark 15000
#   the harness POLLS document.documentElement[data-capture-ready] (≤ maxWaitMs) THEN snapshots

# 3 · Chrome leg — real Chrome.app + CDP over the SAME ?capture= route (badge reads real GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9477 --user-data-dir=<scratch>/chrome-prof \
  --no-first-run --no-default-browser-check about:blank &
#   then, per mode, over CDP :9477 (playwright.connectOverCDP):
#     newContext({ viewport:{1440,900}, deviceScaleFactor:2, colorScheme:<mode> })
#     goto http://localhost:5200/?capture=/display/buttons&mode=<mode>  (waitUntil:load)
#     waitForFunction document.documentElement.hasAttribute('data-capture-ready')
#     record GL_RENDERER off a throwaway WebGL2 context → screenshot
#   (the driver lives at docs/tranches/BG/audit/visual/pipeline-proof/chrome-capture.mjs —
#    change ROUTE + out-filename per surface)
```

## Content sanity (non-authoring pixel read — pipeline validity, NOT a gestalt verdict)

The route content reads TRUE on every PNG: the display masthead ("Buttons" / `DISPLAY · BUTTONS`),
the "Launch the sequence" hero CTA over the blue live field, the "Glass register" glass/glass-wash/
Toggle chips, "Raw .glass-btn utility", the left icon rail, and the bottom dock nav (Buttons · Card ·
Badge · Separator · Section · Metric Badge …). Light reads warm-cream page; dark reads warm-dark
luminous register — both faithful, both engines. This proof establishes PIPELINE VALIDITY (real
content + badge + dims), not the `proof:ba-gestalt` warm-glass roster verdict (that is the owning
wave's non-authoring close against its declared probe/expect band).
