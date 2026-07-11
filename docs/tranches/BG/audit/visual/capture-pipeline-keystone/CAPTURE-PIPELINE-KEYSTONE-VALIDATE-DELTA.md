# Capture-pipeline keystone — dual-engine VALIDATE DELTA (C-SAFARI proof, 2026-07-07)

> **Role:** CAPTURE-PIPELINE VALIDATOR (non-authoring). Task: PROVE the dual-engine `?capture=`
> harness works end-to-end BEFORE fan-out — the C-SAFARI keystone (the chronic that missed four
> prior tranches). NOT a wave gestalt verdict; this certifies the INSTRUMENT.
> **Date:** 2026-07-07. **Branch:** tranche/BG. **macOS:** 26.4.1 (Tahoe) / Apple M5 Max.
> **Route under test:** `/foundations/typography` (the `BG.W-DARK-READABILITY-REPAIR` readability surface).

## Verdict: **PASS** — both engines, both modes, real content, dimension-correct, in-pixel engine badge.

The dual-engine pipeline is certified end-to-end. All four PNGs are real route content (not a
blank/bare-shell), dimension-correct, and carry the in-pixel engine badge proving which engine
rendered which bytes. The C-SAFARI blank-WebKit chronic does NOT reproduce.

## The working method (exact commands — the PROVEN path, not re-derived)

```bash
# 0. safety
node scripts/verify-siblings-intact.mjs --quiet          # exit 0 (before AND after)

# 1. BUILT bytes on :5200 (NOT :5199 dev — which bare-shells WebKit)
npm run demo:dist:build
npm run demo:dist:serve                                   # vite preview --port 5200  (PID tracked, killed at end)

# 2a. Chrome leg — real on-screen Chrome.app + CDP (real Metal GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9333 --user-data-dir=<scratch>/chrome-profile \
  --no-first-run --no-default-browser-check --window-size=1500,1000 about:blank &
#   playwright chromium.connectOverCDP("http://localhost:9333"); per mode:
#   navigate http://localhost:5200/?capture=/foundations/typography&mode=<light|dark>
#   poll document.documentElement.hasAttribute('data-capture-ready') (≤15s, never a fixed sleep)
#   probe GL_RENDERER off a throwaway webgl2 ctx; page.screenshot({ fullPage:true })
#   → chrome-cap-proof.mjs (this dir)

# 2b. Safari/WebKit leg — off-screen WKWebView (system WebKit.framework/Metal, NO Screen-Recording TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o <bin>/.wkshot-live-bin
<bin>/.wkshot-live-bin "http://localhost:5200/?capture=/foundations/typography&mode=light" out-light.png light 15000
<bin>/.wkshot-live-bin "http://localhost:5200/?capture=/foundations/typography&mode=dark"  out-dark.png  dark  15000
#   the harness POLLS document.documentElement[data-capture-ready] (up to maxWaitMs) BEFORE
#   takeSnapshotWithConfiguration → 2880×1800 retina-2× PNGs, full content + WEBKIT badge.

# 3. teardown
pkill -f "remote-debugging-port=9333"; kill <serve-pid>
node scripts/verify-siblings-intact.mjs --quiet          # exit 0
```

Fences honored: all work under `/Users/mkbabb/Programming/glass-ui`; the WKWebView binary compiled
UNDER the repo (`.wkshot-live-bin`), NOT `/tmp`; zero sibling touched; ephemeral Chrome profile in the
session scratchpad; served preview + throwaway Chrome killed on completion.

## The four captured PNGs (this dir)

| PNG | Engine | GPU (decoded in-pixel) | Dims | Mode | isRealPng | body σ(lum) | body mean lum |
|---|---|---|---|---|---|---|---|
| `dark-readability-chrome-light-desktop-full.png` | CHROME | ANGLE Metal · Apple M5 Max | 1440×900 @1x | LIGHT | true | 58.5 | 205.9 |
| `dark-readability-chrome-dark-desktop-full.png`  | CHROME | ANGLE Metal · Apple M5 Max | 1440×900 @1x | DARK  | true | 59.1 | 44.7 |
| `dark-readability-safari-light-desktop-full.png` | WEBKIT | Apple GPU (system Metal)   | 2880×1800 @2x | LIGHT | true | 59.3 | 222.8 |
| `dark-readability-safari-dark-desktop-full.png`  | WEBKIT | Apple GPU (system Metal)   | 2880×1800 @2x | DARK  | true | 59.1 | 36.7 |

## Why each acceptance criterion holds

- **Real route content, not a bare shell.** Body σ(lum) 58.5–59.3 across all four (a flat/blank shell
  reads σ≈0). VISUALLY decoded to the Typography route gestalt — the "Typography" display hero, the
  "FOUNDATIONS · TYPOGRAPHY" eyebrow, the "Aa" specimen, the golden-ratio blurb, "Audacious peaks", the
  "352" mega numeral, the sidebar icon rail + bottom nav dock — in both engines.
- **Dimension-correct.** Chrome @1x 1440×900; WebKit @2x 2880×1800 (the badge's `VIEW … @2x (2880×1800px)`
  confirms the Retina double-scale, matching the WKWebView snapshot log `snapshot 2880x1800`).
- **In-pixel engine badge (the SOLE provenance).** Decoded from the pixels (magenta `#ff00ff` fiducial
  locator, 2604 px @1x / 6432 px @2x): Chrome → `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer:
  Apple M5 Max, Unspecified Version) · VIEW 1440×900 @1x · MODE LIGHT`; WebKit → `ENGINE WEBKIT · GPU
  Apple GPU · VIEW 1440×900 @2x (2880×1800px) · MODE DARK`. The two engines are pixel-distinguishable
  (CHROME vs WEBKIT, different GPU strings + font metrics) — a genuinely different engine, not a re-shot
  Chromium.
- **Real GPU, not headless SwiftShader.** Chrome GL_RENDERER probe = `ANGLE Metal Renderer: Apple M5 Max`
  (real Metal). WebKit renders on the system WebKit.framework / Apple GPU. No `SwiftShader`/`llvmpipe`.
- **Both modes.** Mode-distinct luminance: light L≈206–223 (warm-cream), dark L≈37–45 (luminous-dark
  register) — the dark register is genuinely dark, proving the pre-mount `data-capture-mode` injection works.
- **Deterministic readiness.** Chrome `data-capture-ready` @~3.8s; WebKit polled the attr @4500ms both
  modes (never a fixed sleep).

## Scope note

This is INSTRUMENT certification per real-paint-protocol §3 — it proves the harness captures faithful
dual-engine dual-mode paint for fan-out. It is NOT the `BG.W-DARK-READABILITY-REPAIR` gestalt verdict:
that wave's own dark-readability census verdict flips only at its owning non-authoring paint close, over
its own criterion. No `src/`/`demo/`/`styles/`/`scripts/` was edited (defects, if any, are a build-fix
agent's job — recorded, never patched here).
