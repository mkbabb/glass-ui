# Capture-pipeline keystone PROOF — dual-engine, end-to-end, BEFORE fan-out (C-SAFARI)

> **Role:** fresh NON-AUTHORING capture-pipeline validator (built no BG wave). Independently
> re-proves the dual-engine `?capture=` pipeline delivers full, dimension-correct, engine-
> provenanced captures — the C-SAFARI keystone (the chronic that missed four prior tranches),
> discharged BEFORE any fan-out per real-paint-protocol §3.
> **Wave route:** `BG.W-DARK-READABILITY-REPAIR` → `/foundations/typography` (the densest text
> route — muted-caption + body ink over the warm-cream / luminous-dark plate).
> **Date:** 2026-07-06. **Branch:** tranche/BG. **Instrument:** C18 harness (`?capture=` route +
> in-pixel engine badge), demo dist on `:5200`.
> **Fence:** zero `src`/`demo`/`styles`/`scripts` edits — HARNESS + capture only; a defect is
> RECORDED, never patched here. No `/tmp` output; no sibling touched.

## Verdict: BOTH ENGINES PASS — the pipeline is PROVEN

| leg | engine (in-pixel badge) | GPU (in-pixel badge) | modes | dims | real content |
|---|---|---|---|---|---|
| **Chrome CDP** (real Chrome.app 149, connectOverCDP :9333) | `ENGINE CHROME` | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` — real Metal, NOT SwiftShader | light + dark | 1440×900 @1x | YES |
| **Safari off-screen WKWebView** (system WebKit.framework / Metal) | `ENGINE WEBKIT` | `Apple GPU` | light + dark | 2880×1800 @2x | YES |

`chromeOk = true`, `safariOk = true`. The C-SAFARI blank-WebKit chronic does **NOT** reproduce —
the off-screen WKWebView captures the FULL typography route content (the "Typography" hero, the
"Plus Jakarta Sans + Fira Code — golden-ratio scale." blurb, the sidebar icon rail, the bottom
dock) in BOTH modes, with the decodable in-pixel engine badge. Live `GL_RENDERER` read on the
Chrome leg confirms real Metal (`ANGLE Metal Renderer: Apple M5 Max`), not headless SwiftShader.

## Evidence on disk (this dir)

| png | engine | mode | dims | bytes | badge (decoded from pixels, visually read) |
|---|---|---|---|---|---|
| `dark-readability-chrome-light-desktop-full.png` | CHROME (CDP, real Metal) | light | 1440×900 | 785 KB | `ENGINE CHROME · GPU ANGLE Metal Apple M5 Max · VIEW 1440×900 @1x · MODE LIGHT` |
| `dark-readability-chrome-dark-desktop-full.png` | CHROME | dark | 1440×900 | 1.34 MB | `… MODE DARK` |
| `dark-readability-safari-light-desktop-full.png` | WEBKIT (off-screen WKWebView, Metal) | light | 2880×1800 | 2.01 MB | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT` |
| `dark-readability-safari-dark-desktop-full.png` | WEBKIT | dark | 2880×1800 | 2.49 MB | `… MODE DARK` |

`validate.mjs` (this dir) re-runs the pixel checks against the repo's SINGLE decoder leaf
(`scripts/reflect-capture-verify.mjs` — `isRealPng`/`pngDimensions`/`pngRegionStats`, NOT pngjs):

| png | isRealPng | dims | badge magenta fiducial px | badge ink px | body σ(lum) | body meanLum | body meanChroma |
|---|---|---|---|---|---|---|---|
| chrome light | true | 1440×900 | 2604 | 54760 (dark ink) | 58.1 | 211.7 | 0.0273 |
| chrome dark  | true | 1440×900 | 2604 | 127549 (dark ink) | 58.8 | 43.5  | 0.0215 |
| safari light | true | 2880×1800 | 6432 | 424036 (light ink) | 59.9 | 223.3 | 0.0244 |
| safari dark  | true | 2880×1800 | 6432 | 526763 (dark field) | 59.4 | 35.3  | 0.0262 |

- **Not blank/shell.** Body luminance σ 58–60 (a uniform shell slab reads ~0; the prior blank-WebKit
  failure PNG was ~173 KB — these are 0.78–2.49 MB). Mode-differentiated body means (light ~212–223,
  dark ~35–44 — the W-DARK-MATERIAL luminous-dark register).
- **Badge present + engine-discriminated in-pixel + visually decoded.** Magenta `#ff00ff` fiducial
  border found in every capture (2604 px Chrome @1x, 6432 px Safari @2x — scales with the retina
  backing). All four badge crops were VISUALLY READ: each decodes to the correct ENGINE/GPU/VIEW/MODE.
  Chrome vs WebKit are pixel-distinguishable (ANGLE-Metal-M5-Max vs Apple-GPU, @1x vs @2x, different
  font metrics) — a genuinely different engine, NOT a re-shot Chromium.
- **Dimension-correct.** Chrome CDP screenshot is CSS-resolution 1440×900 @1x; Safari WKWebView
  snapshots at the retina backing 2880×1800 @2x. Both ≥ MIN_CAPTURE floor, both full-frame content.

## The WORKING method (exact commands — reproducible)

```bash
# 0 · siblings tripwire (before + after) — exit 0
node scripts/verify-siblings-intact.mjs --quiet

# 1 · build + serve the BUILT demo dist on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build                                    # → dist-demo/, ~2s
npm run demo:dist:serve                                    # vite preview :5200 (background)

# 2 · compile the WKWebView harness to an IN-REPO bin (NEVER /tmp — this validator's fence)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o docs/tranches/BG/audit/.wkshot-bin

# 3 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework, Metal, NO TCC)
docs/tranches/BG/audit/.wkshot-bin \
  "http://localhost:5200/?capture=/foundations/typography&mode=light" \
  <dir>/dark-readability-safari-light-desktop-full.png light 15000
docs/tranches/BG/audit/.wkshot-bin \
  "http://localhost:5200/?capture=/foundations/typography&mode=dark"  \
  <dir>/dark-readability-safari-dark-desktop-full.png  dark  15000
#   → data-capture-ready polled @4500ms; snapshot 2880×1800, FULL content + WEBKIT badge

# 4 · Chrome leg — real Chrome.app + CDP over the SAME ?capture= route (badge reads real GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9333 --user-data-dir=<in-repo throwaway .chrome-profile> \
  --no-first-run --no-default-browser-check --window-size=1440,900 about:blank &
CDP_URL=http://localhost:9333 node <dir>/chrome-capture.mjs
#   playwright chromium.connectOverCDP → Page.goto ?capture= → poll data-capture-ready
#   → read GL_RENDERER off a throwaway WebGL2 ctx → page.screenshot({fullPage:true})
#   ready @~3.9s / 3.7s; GL_RENDERER = ANGLE Metal Apple M5 Max (real GPU)

# 5 · validate — single-decoder pixel checks
node <dir>/validate.mjs
```

- `data-capture-ready` is the deterministic readiness signal — POLLED, never a fixed sleep (an
  off-screen WKWebView throttles rAF; the boot's rAF-vs-setTimeout race lands the flag).
- The `?capture=` mode de-promotes the `.route-enter` entrance CA layer for the snapshot (settled
  pixels unchanged), so the off-screen WKWebView reads FULL content — the C18 fix.
- **NOT the running headless lighthouse Chrome** (SwiftShader) — a fresh real Chrome.app on :9333
  with an in-repo throwaway profile, removed on completion.

## Scope note (pipeline vs paint verdict)

This is PIPELINE-VALIDATION evidence per real-paint-protocol §3 — it PROVES the dual-engine
instrument delivers full, dimension-correct, engine-provenanced captures for fan-out. Whether the
dark-readability census reads 0 below-floor text nodes (the wave's own contrast criterion) is the
WAVE's OWN gestalt roster row (see `BG.W-DARK-READABILITY-REPAIR-DELTA.md` — that non-authoring
paint close recorded a FAIL on un-rostered swatch-label defects), flipped only at its owning
non-authoring paint close — NOT here. This validator does not flip the wave's verdict.

## Fences honored

Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. Zero `src`/`demo`/`styles`/`scripts`
edits. No `/tmp` output — the WKWebView binary compiled to the in-repo `docs/tranches/BG/audit/.wkshot-bin`,
the Chrome profile was an in-repo throwaway removed on completion. No sibling under `~/Programming`
touched/moved. `verify-siblings-intact.mjs --quiet` exit 0 before AND after. `demo:dist:serve` +
Chrome CDP killed on completion (ports 5200/9333 down).
