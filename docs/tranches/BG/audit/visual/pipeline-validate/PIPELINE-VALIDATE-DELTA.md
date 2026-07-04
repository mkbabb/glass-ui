# Dual-engine capture pipeline — VALIDATION (C-SAFARI keystone, pre-fanout)

**Verdict: PASS on BOTH engines, BOTH modes.** The C18 `?capture=` harness (commit
d4ae4577) drives real Chrome.app (CDP, Metal M5 Max) AND real system WebKit.framework
(off-screen WKWebView, Metal, NO Screen-Recording TCC) end-to-end on a real route.

Target: BG.W-CORNER-ALIAS-KILL → route `/forms` (the category landing over the warm-pink
field). HEAD 5d962a90. Served: `npm run demo:dist:build` → `npm run demo:dist:serve` (BUILT
bytes on :5200 — NOT :5199 dev, which bare-shells WebKit).

## The 4-PNG floor (all real content, dimension-correct, engine-badged)

| PNG | Engine badge | GPU badge | View | Mode | Dims | Real content |
|---|---|---|---|---|---|---|
| forms-chrome-light-desktop-full.png | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @1x | LIGHT | 1440×900 | ✓ Forms route, glass cards, docks |
| forms-chrome-dark-desktop-full.png | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @1x | DARK | 1440×900 | ✓ luminous-dark register |
| forms-webkit-light-desktop-full.png | WEBKIT | Apple GPU | 1440×900 @2x | LIGHT | 2880×1800 | ✓ Forms route, retina 2× |
| forms-webkit-dark-desktop-full.png | WEBKIT | Apple GPU | 1440×900 @2x | DARK | 2880×1800 | ✓ luminous-dark register |

- **Real GPU proven** — Chrome `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5
  Max)`, NOT SwiftShader/llvmpipe/ANGLE Software. WebKit runs system Metal (`Apple GPU`).
- **Engine provenance is in-pixel** — the magenta `#ff00ff`-bordered top-left badge encodes
  ENGINE/GPU/VIEW/MODE; the two engines are pixel-distinguishable (CHROME vs WEBKIT).
- **Deterministic readiness** — both legs POLL `document.documentElement[data-capture-ready]`
  (Chrome `waitForFunction`; wkshot `data-capture-ready after 4800ms`), never a fixed sleep.
- **Decoder confirms non-blank** — repo-style PNG decode: 107-125 distinct color buckets,
  warm-cream light means (R>G>B ~208/191/181), near-black dark means (~75/60/52) — not a
  flat bare-shell. The CORNER-ALIAS-KILL fix is visible (grid texture over the shell field,
  warm field through the card corners, no white wedges).

## The WORKING method (exact commands — do NOT re-derive)

```bash
# 1. build + serve BUILT bytes on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build
npm run demo:dist:serve            # vite preview :5200

# 2. Safari/WebKit leg — off-screen WKWebView (system WebKit.framework/Metal, no TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/forms&mode=light" out-light.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/forms&mode=dark"  out-dark.png  dark  15000
#   → 2880×1800 retina PNGs, FULL content + WEBKIT badge; polls data-capture-ready first

# 3. Chrome leg — real Chrome.app over CDP (real Metal GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9456 --user-data-dir=<throwaway-profile> \
  --no-first-run --no-default-browser-check about:blank
#   then playwright-core connectOverCDP("http://localhost:9456"), goto
#   http://localhost:5200/?capture=/forms&mode=<m>, waitForFunction data-capture-ready,
#   record GL_RENDERER off a throwaway webgl2 ctx, page.screenshot.
```

Per real-paint-protocol §3: this is the build-side/pipeline-validation evidence; a
non-authoring judge flips the gestalt roster row against a fresh capture.
