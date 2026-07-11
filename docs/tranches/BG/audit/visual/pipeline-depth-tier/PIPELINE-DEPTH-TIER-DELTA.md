# Capture-pipeline keystone — RE-PROVEN on BG.W-GLASS-DEPTH-TIER (`/display/buttons`)

**Non-authoring validator, 2026-07-05.** The dual-engine `?capture=` harness is proven end-to-end on the
F2.5 `BG.W-GLASS-DEPTH-TIER` route (`/display/buttons` — the "button" leg of the wave's *menu vs popover vs
button* material-thickness readback, a content-rich glass surface directly governed by the depth-tier map).
Both engines capture FULL route content + the in-pixel engine badge, BOTH modes, at 2880×1800. The
C-SAFARI blank-WebKit chronic does NOT reproduce. This validates the pipeline BEFORE fan-out; it does NOT
judge the depth-tier gestalt (that is F2.5's own non-authoring paint close).

## Method (the exact, proven commands)

```bash
# 0. siblings tripwire (before + after) — both exit 0
node scripts/verify-siblings-intact.mjs --quiet

# 1. build BUILT bytes + serve on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build            # exit 0
npm run demo:dist:serve            # vite preview --port 5200 (backgrounded)

# 2. Chrome leg — real Chrome.app + CDP (real Metal GPU, NOT SwiftShader)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9477 --user-data-dir=<throwaway-profile> \
  --no-first-run --no-default-browser-check about:blank
node chrome-cap.mjs               # connectOverCDP :9477, navigate ?capture=/display/buttons&mode=<m>,
                                  # poll document.documentElement[data-capture-ready], record GL_RENDERER,
                                  # page.screenshot → depth-tier-chrome-<mode>-desktop-full.png

# 3. Safari/WebKit leg — off-screen WKWebView (system WebKit.framework/Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o <bin>/wkshot-live
<bin>/wkshot-live "http://localhost:5200/?capture=/display/buttons&mode=<m>" \
  depth-tier-safari-<mode>-desktop-full.png <mode> 20000
                                  # polls data-capture-ready (landed 4500ms both modes) → snapshot 2880×1800

# 4. validate all 4 PNGs through the single decoder leaf
node validate-depth.mjs           # reflect-capture-verify.mjs: isRealPng + dims + badge fiducial/ink + body variance
```

## Result — all 4 PNGs on disk, real content, dimension-correct, badge-verified

| PNG | engine badge (in-pixel) | GPU (in-pixel) | mode | dims | isRealPng | badge magenta px | body σ(L) | body chroma |
|---|---|---|---|---|---|---|---|---|
| `depth-tier-chrome-light-desktop-full.png` | CHROME | ANGLE Metal Renderer Apple M5 Max | LIGHT | 2880×1800 | ✓ | 10424 | 30.7 | 0.0418 |
| `depth-tier-chrome-dark-desktop-full.png`  | CHROME | ANGLE Metal Renderer Apple M5 Max | DARK  | 2880×1800 | ✓ | 10424 | 57.3 | 0.0372 |
| `depth-tier-safari-light-desktop-full.png` | WEBKIT | Apple GPU | LIGHT | 2880×1800 | ✓ | 6432 | 33.2 | 0.0333 |
| `depth-tier-safari-dark-desktop-full.png`  | WEBKIT | Apple GPU | DARK  | 2880×1800 | ✓ | 6432 | 49.1 | 0.0354 |

- **Chrome — real Metal GPU.** `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified
  Version)` — NOT SwiftShader/llvmpipe/ANGLE-Software. `data-capture-ready` polled true both modes.
- **Safari — system WebKit/Apple GPU, off-screen WKWebView, no Screen-Recording TCC.** `data-capture-ready`
  landed at 4500ms both modes; snapshot 2880×1800. The blank-WebKit bare-shell chronic does NOT reproduce.
- **In-pixel engine badge is the sole provenance.** The magenta `#ff00ff` fiducial + high-contrast ink panel
  decode distinctly per engine (Chrome 10424 vs WebKit 6432 magenta px — genuine per-engine bytes, not a
  re-stamped JSON). Eye-verified: Chrome badge reads `ENGINE CHROME`, WebKit badge reads `ENGINE WEBKIT`.
- **Real route content, not a shell.** Body luminance σ 30.7–57.3 across all four (a blank slab is near-zero);
  warm-glass chroma 0.033–0.042 (not grey). Light pages mean L ~214–225, dark pages ~45–58 — mode honored.
  Eye-verified: the `/display/buttons` "Launch the sequence" CTA over the blue live field, the glass/glass-wash
  register chips, and the dock all render in both engines, light + dark.

**Verdict: chromeOk=true, safariOk=true.** Pipeline proven; fan-out unblocked.
