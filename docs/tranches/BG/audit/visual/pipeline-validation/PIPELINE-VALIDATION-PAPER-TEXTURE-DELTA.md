# C-SAFARI keystone — dual-engine capture pipeline PROVEN end-to-end (paper-texture)

**Date:** 2026-07-03 · **Validator:** CAPTURE-PIPELINE VALIDATOR (non-authoring) ·
**Route:** `/foundations/paper-texture` (wave `BG.W-PAPER-TEXTURE-UNIFY`) ·
**Result:** `chromeOk=true` `safariOk=true` — the dual-engine pipeline captures full
route content + the in-pixel engine badge, both engines, both modes, on REAL Metal.

This is the keystone gate BEFORE any fan-out (the chronic that missed four prior
tranches). It proves the C18 `?capture=` harness (commit d4ae4577) works end-to-end
on a live wave route.

## The working method (exact commands — use as-is, do NOT re-derive)

Built bytes on `:5200` (NOT `:5199` dev — dev bare-shells WebKit):

```bash
npm run demo:dist:build
npm run demo:dist:serve            # vite preview on :5200
```

Per route+mode `?capture=<route>&mode=<light|dark>`:

**Safari / WebKit (off-screen WKWebView — system WebKit.framework/Metal, NO TCC):**
```bash
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/foundations/paper-texture&mode=light" \
  <out>/paper-texture-safari-light-desktop-full.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/foundations/paper-texture&mode=dark" \
  <out>/paper-texture-safari-dark-desktop-full.png  dark  15000
#   → polls document.documentElement[data-capture-ready] (4500ms here) BEFORE snapshot
#   → 2880×1800 retina-2× PNG, FULL content + WEBKIT engine badge
```

**Chrome (real Chrome.app + CDP — real Metal GPU):**
```bash
# launch: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
#   --remote-debugging-port=9477 --user-data-dir=<tmp-udd> \
#   --no-first-run --no-default-browser-check http://localhost:5200/
# then (playwright): chromium.connectOverCDP("http://localhost:9477")
#   newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:<mode> })
#   page.goto http://localhost:5200/?capture=/foundations/paper-texture&mode=<mode>
#   page.waitForFunction(() => documentElement.hasAttribute('data-capture-ready'))
#   page.screenshot({ fullPage:false })   → 2880×1800
```
(Full script: `scratchpad/chrome-cdp-capture.mjs` — launch-connect-poll-shoot; the
`GL_RENDERER` off a throwaway WebGL2 context proves real Metal, not SwiftShader.)

## The evidence (4 PNGs, all resolve on disk, all 2880×1800 @2x)

| PNG | dim | bytes | badge ENGINE / GPU / MODE | field L / chroma |
|---|---|---|---|---|
| `paper-texture-chrome-light-desktop-full.png` | 2880×1800 | 2.27 MB | CHROME / ANGLE Metal **Apple M5 Max** / LIGHT | 0.894 / 0.0212 |
| `paper-texture-chrome-dark-desktop-full.png`  | 2880×1800 | 2.87 MB | CHROME / ANGLE Metal **Apple M5 Max** / DARK  | 0.390 / 0.0185 |
| `paper-texture-safari-light-desktop-full.png` | 2880×1800 | 2.43 MB | **WEBKIT** / Apple GPU / LIGHT | 0.908 / 0.0208 |
| `paper-texture-safari-dark-desktop-full.png`  | 2880×1800 | 2.28 MB | **WEBKIT** / Apple GPU / DARK  | 0.414 / 0.0221 |

**Content check (visual, all 4):** real route content — the "Paper Texture" display
heading, the frequency register blurb, the `FREQUENCY="CLEAN"` (0.65 base / 4 octaves)
and `FREQUENCY="AGED"` (0.5 base / 5 octaves) turbulence cards, the `--PAPER-*` cascade
retint WARM/COOL/BONE cards, the sidebar icon rail, and the bottom nav dock. Safari does
NOT bare-shell (the `:5200` built-bytes path renders full content where `:5199` dev does
not). Chrome `document.body.innerText` len ≈ 1952 (route content, not blank).

**Provenance (in-pixel badge, decoded from the PNG pixels — the SOLE channel):**
Chrome → `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max…)` —
real Metal, NOT SwiftShader/llvmpipe/ANGLE-Software. Safari → `ENGINE WEBKIT · GPU
Apple GPU` — real system WebKit.framework/Metal on the M5 Max (a bare WKWebView has no
`Version/` UA token → WEBKIT). The magenta `#ff00ff` 2px border locates the badge; the
engine+mode axes are distinct across all four captures.

**Anti-evasion floor:** every declared path resolves on disk, `isRealPng` (2.2–2.9 MB,
not zero-byte), dimension-correct (2880×1800 ≥ floor). Field regions non-blank with warm
chroma ≥ 0.018 (NOT a grey slab); mode axis proven distinct by L (light ≈0.90 vs dark
≈0.40). Engine axis close (Chrome light L=0.894 vs Safari L=0.908) — the expected small
engine-fidelity divergence, not a mislabel.

## Verdict

The dual-engine capture pipeline is PROVEN end-to-end on a live wave route. `chromeOk`
and `safariOk` both true. C-SAFARI is UNBLOCKED at the pipeline level — fan-out may
proceed. (This is the PIPELINE proof, not a `proof:ba-gestalt` verdict-flip for the
`BG.W-PAPER-TEXTURE-UNIFY` roster row — that flip is the owning wave's own non-authoring
close.)
