# Dual-engine capture pipeline — END-TO-END PROVEN (the C-SAFARI keystone)

**Validated: 2026-07-03. Both engines, both modes, real Metal GPU, full route content, in-pixel provenance badge.**
This is the pre-fan-out proof that the C18 `?capture=` harness works end-to-end on the BG.W-GLASS-DYNAMICS
route (`/substrates/glass-material` — the lensing/specular/flare glass surface). The chronic that missed
four prior tranches (BE·BF·BG-spec Safari-capture) is unblocked at the pipeline level.

## The working method (exact commands — do NOT re-derive)

1. **Build the BUILT bytes** (NOT :5199 dev, which bare-shells WebKit):
   ```
   npm run demo:dist:build
   npm run demo:dist:serve            # vite preview → http://localhost:5200
   ```
2. **Safari / WebKit leg** — off-screen WKWebView (system WebKit.framework / Metal, NO Screen-Recording TCC):
   ```
   clang -framework Cocoa -framework WebKit -fobjc-arc \
     docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
   /tmp/wkshot-live "http://localhost:5200/?capture=/substrates/glass-material&mode=light" out-light.png light 15000
   /tmp/wkshot-live "http://localhost:5200/?capture=/substrates/glass-material&mode=dark"  out-dark.png  dark  15000
   ```
   The harness polls `document.documentElement[data-capture-ready]` (data-capture-ready landed at 4500ms)
   BEFORE `takeSnapshotWithConfiguration` → 2880×1800 retina-2× PNG.
3. **Chrome leg** — real Chrome.app + CDP (real Metal GPU) over the SAME `?capture=` route:
   ```
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
     --remote-debugging-port=9477 --user-data-dir=<in-repo udd> --no-first-run --no-default-browser-check &
   CDP_URL=http://localhost:9477 node chrome-capture.mjs   # connectOverCDP → poll data-capture-ready → page.screenshot
   ```
   (`chrome-capture.mjs` sits beside this DELTA; deviceScaleFactor 2, colorScheme per mode.)

## The evidence (resolves on disk — the anti-evasion floor)

| PNG | Engine badge (in-pixel) | GPU (GL_RENDERER) | Dim | Content |
|---|---|---|---|---|
| glass-dynamics-chrome-light-desktop-full.png | CHROME | ANGLE Metal Renderer: Apple M5 Max | 2880×1800 | full "Glass Material" route |
| glass-dynamics-chrome-dark-desktop-full.png  | CHROME | ANGLE Metal Renderer: Apple M5 Max | 2880×1800 | full "Glass Material" route |
| glass-dynamics-safari-light-desktop-full.png | WEBKIT | Apple GPU | 2880×1800 | full "Glass Material" route |
| glass-dynamics-safari-dark-desktop-full.png  | WEBKIT | Apple GPU | 2880×1800 | full "Glass Material" route |

- **Real GPU, NOT SwiftShader.** Chrome GL_RENDERER = `ANGLE Metal Renderer: Apple M5 Max`; Safari = `Apple GPU`
  (system WebKit.framework/Metal). No `SwiftShader`/`llvmpipe`/`ANGLE Software` on either leg.
- **Real route content, NOT bare-shell/blank.** Each PNG shows the display "Glass Material" heading, the
  substrates nav rail, the 5-rung glass ladder plates (wash/quiet/resting/floating/overlay), and the dock nav
  — the `?capture=` `.route-enter` neutralization landed the FULL content into the base layer (the off-screen
  blank-`<main>` failure is closed).
- **In-pixel engine badge = the SOLE provenance.** Top-left `#ff00ff`-fiducial panel decodes ENGINE / GPU /
  VIEW (1440×900 @2x → 2880×1800px) / MODE straight from the captured pixels — the judge does not take the
  builder's word for which engine produced which bytes.
- **Both modes.** LIGHT (warm-cream field) + DARK (luminous warm-brown transmissive field) both captured on
  both engines.

## Verdict

`chromeOk: true` · `safariOk: true`. The dual-engine capture pipeline works end-to-end. Fan-out of the
per-wave dual-engine capture set (§2 four-PNG floor) is UNBLOCKED at the instrument level.
