# Capture-pipeline validation — dual-engine on the DOTFLOW-REBUILD viz route (C-SAFARI)

> **Role:** fresh NON-AUTHORING capture-pipeline validator (did not build any BG wave).
> **Purpose:** PROVE the dual-engine `?capture=` pipeline works end-to-end BEFORE any fan-out —
> the C-SAFARI keystone (the chronic that missed four prior tranches).
> **Wave route:** `BG.W-DOTFLOW-REBUILD` (F9) → `/substrates/dot-flow-field` (the WebGPU-first
> streamline flow-field viz — the FIRST pipeline proof on the actual viz route, not `/dock/overview`).
> **Date:** 2026-07-05. **Fence:** zero `src`/`demo`/`styles`/`scripts` edits — HARNESS + capture
> only; a defect is RECORDED, never patched here.

## Verdict: BOTH ENGINES PASS

| leg | engine (in-pixel badge) | GPU (in-pixel badge) | modes | dims | real content |
|---|---|---|---|---|---|
| **Chrome CDP** (real Chrome.app 149, connectOverCDP :9333) | `ENGINE CHROME` | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` — real Metal, NOT SwiftShader | light + dark | 1440×900 @1x | YES |
| **Safari off-screen WKWebView** (system WebKit.framework / Metal) | `ENGINE WEBKIT` | `Apple GPU` | light + dark | 2880×1800 @2x | YES |

`chromeOk = true`, `safariOk = true`. The C-SAFARI blank-WebKit chronic does **NOT** reproduce —
the off-screen WKWebView captures the FULL dot-flow-field route content (audacious "Dot Flow Field"
display hero, the `@mkbabb/glass-ui/dot-flow-field` subpath chip, the curl-noise blurb, the sidebar
icon rail + bottom nav dock) in both modes, with the decodable in-pixel engine badge.

## Evidence on disk (this dir)

| png | engine | mode | dims | bytes | badge (decoded from pixels) |
|---|---|---|---|---|---|
| `dotflow-chrome-light-desktop-full.png` | CHROME (CDP, real Metal) | light | 1440×900 | 412 KB | `ENGINE CHROME · GPU ANGLE Metal Apple M5 Max · VIEW 1440×900 @1x · MODE LIGHT` |
| `dotflow-chrome-dark-desktop-full.png` | CHROME | dark | 1440×900 | 519 KB | `… MODE DARK` |
| `dotflow-safari-light-desktop-full.png` | WEBKIT (off-screen WKWebView, Metal) | light | 2880×1800 | 1.61 MB | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT` |
| `dotflow-safari-dark-desktop-full.png` | WEBKIT | dark | 2880×1800 | 1.65 MB | `… MODE DARK` |

`validate-dotflow.mjs` (this dir) re-runs the pixel checks against the repo's single decoder leaf
(`scripts/reflect-capture-verify.mjs` — `isRealPng`/`pngDimensions`/`pngRegionStats`, NOT pngjs):

| png | isRealPng | dims | badge magenta-fiducial px | badge ink px | body σ(lum) | body meanLum | body meanChroma |
|---|---|---|---|---|---|---|---|
| chrome light | true | 1440×900 | 2604 | 60740 (dark ink) | 48.5 | 203.1 | 0.0208 |
| chrome dark  | true | 1440×900 | 2604 | 70342 (dark ink) | 46.1 | 60.4  | 0.0179 |
| safari light | true | 2880×1800 | 6432 | 133406 / 119775 | 46.6 | 213.7 | 0.0160 |
| safari dark  | true | 2880×1800 | 6432 | 221501 / 30693  | 44.1 | 62.4  | 0.0220 |

- **Not blank/shell.** Body luminance σ 44–48 (a uniform shell slab reads ~0); the prior blank-WebKit
  failure PNG was ~173 KB — these are 0.4–1.65 MB. Mode-differentiated body means (light ~203–213,
  dark ~60–62 — the W-DARK-MATERIAL luminous-dark register).
- **Badge present + engine-discriminated in-pixel.** Magenta `#ff00ff` fiducial border found in every
  capture; the badge text decodes to the correct ENGINE/GPU/VIEW/MODE — the gate reads provenance
  FROM the pixels, not the builder's word. Chrome vs WebKit are pixel-distinguishable (different GPU
  strings, different font metrics — a genuinely different engine, not a re-shot Chromium).
- **Dimension-correct.** Chrome playwright-CDP screenshot is CSS-resolution 1440×900 @1x (honest —
  the badge VIEW field reports @1x); Safari WKWebView snapshots at the retina backing scale 2880×1800
  @2x. Both ≥ the MIN_CAPTURE floor, both full-frame route content.

## The WORKING method (exact commands — reproducible)

```bash
# 0 · siblings tripwire (before + after) — exit 0
node scripts/verify-siblings-intact.mjs --quiet

# 1 · build + serve the BUILT demo dist on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build                                    # → dist-demo/, ~1s
npm run demo:dist:serve                                    # vite preview :5200 (background)

# 2 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework, Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/substrates/dot-flow-field&mode=light" \
  <dir>/dotflow-safari-light-desktop-full.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/substrates/dot-flow-field&mode=dark"  \
  <dir>/dotflow-safari-dark-desktop-full.png  dark  15000
#   → data-capture-ready polled @4500ms; snapshot 2880×1800, FULL content + WEBKIT badge

# 3 · Chrome leg — real Chrome.app + CDP over the SAME ?capture= route (badge reads real GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9333 --user-data-dir=<in-repo .chrome-profile> \
  --no-first-run --no-default-browser-check --window-size=1440,900 about:blank &
CDP_URL=http://localhost:9333 node <dir>/chrome-capture.mjs
#   playwright chromium.connectOverCDP → Page.goto ?capture= → poll data-capture-ready
#   → read GL_RENDERER off a throwaway WebGL2 ctx → page.screenshot({fullPage:true})
#   data-capture-ready polled @~3.8s; GL_RENDERER = ANGLE Metal Apple M5 Max (real GPU)
```

- `data-capture-ready` is the deterministic readiness signal — POLLED, never a fixed sleep (an
  off-screen WKWebView throttles rAF; the boot's rAF-vs-setTimeout race lands the flag). Chrome
  ready @~3.8s, WebKit @4500ms.
- The `?capture=` mode de-promotes the `.route-enter` entrance CA layer for the snapshot (settled
  pixels unchanged), so the off-screen WKWebView reads FULL content — the C18 fix.
- **NOT the running headless lighthouse Chrome** (:54437, `--headless=new --disable-gpu-compositing`,
  SwiftShader) — a fresh real Chrome.app on :9333 with an in-repo throwaway profile.

## Scope note (pipeline vs paint verdict)

This is PIPELINE-VALIDATION evidence per real-paint-protocol §3 — it PROVES the dual-engine instrument
delivers full, dimension-correct, engine-provenanced captures for fan-out. Whether the dot-flow-field
itself reads as coherent sweeping streamlines (the wave's `complete_with_misses` gestalt criterion) is
the WAVE's OWN gestalt roster row, flipped only at its owning non-authoring paint close — NOT here.

## Fences honored

Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. No `/tmp` PNG/DELTA output (the compiled
`wkshot-live` binary is the protocol §6.1-sanctioned `-o /tmp/wkshot-live`; the Chrome profile was an
in-repo dot-dir, removed on completion). No sibling under `~/Programming` touched/moved.
`verify-siblings-intact.mjs --quiet` exit 0 before AND after. `demo:dist:serve` + Chrome CDP killed
on completion.
