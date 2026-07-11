# Capture-pipeline validation — dual-engine on the DARK-READABILITY-REPAIR route (C-SAFARI)

> **Role:** fresh NON-AUTHORING capture-pipeline validator (did not build any BG wave).
> **Purpose:** PROVE the dual-engine `?capture=` pipeline works end-to-end BEFORE any fan-out —
> the C-SAFARI keystone (the chronic that missed four prior tranches).
> **Wave route:** `BG.W-DARK-READABILITY-REPAIR` (F2.R1) → `/foundations/typography` (the densest
> text route — muted-caption + body ink over the warm-cream / luminous-dark plate, the wave's own
> on-glass-legibility register).
> **Date:** 2026-07-06. **Fence:** zero `src`/`demo`/`styles`/`scripts` edits — HARNESS + capture
> only; a defect is RECORDED, never patched here.
>
> **RE-CONFIRMED (2026-07-06, independent re-run — a second fresh non-authoring validator).**
> Rebuilt `demo:dist` (`vite build`, ~1s), served BUILT bytes on `:5200`, re-compiled
> `wkshot-live.m` from scratch (in-repo `docs/tranches/BG/audit/.wkshot-bin`, no `/tmp` output),
> launched a real Chrome.app 149 CDP leg (`connectOverCDP :9333`) + the off-screen WKWebView leg,
> and re-captured all four PNGs over `?capture=/foundations/typography`. Reproduced EXACTLY:
> Chrome `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max) · VIEW 1440×900 @1x`
> (real Metal, NOT SwiftShader; `data-capture-ready` @3.90s/@3.75s) + WebKit `ENGINE WEBKIT · GPU
> Apple GPU · VIEW 1440×900 @2x (2880×1800px)` (`data-capture-ready` @4500ms both modes) — all four
> `isRealPng` true, dims 1440×900 (Chrome) / 2880×1800 (WebKit), magenta `#ff00ff` fiducial present
> (2604/6432 px), body σ(lum) 57.4–59.9 (a flat shell reads ~0), mode-distinct means (light
> ≈208–223 / dark ≈35–42, the luminous-dark register). BADGES VISUALLY DECODED per engine
> (ImageMagick top-left crop): both Chrome badges read `MODE LIGHT/DARK` with the real-Metal GPU
> string, both WebKit badges read `MODE LIGHT/DARK · @2x` with `Apple GPU` — the two engines are
> pixel-distinguishable (ANGLE-Metal-M5-Max @1x vs system-WebKit Apple-GPU @2x, distinct font
> metrics), NOT a re-shot Chromium. FULL route content confirmed in both engines: the "Typography"
> hero + "FOUNDATIONS · TYPOGRAPHY" eyebrow + the "Aa" specimen + golden-ratio blurb + "Audacious
> peaks" + the "352" mega numeral + the sidebar icon rail + the bottom nav dock. `chromeOk = true`,
> `safariOk = true`; `verify-siblings-intact --quiet` exit 0 before AND after; served preview +
> throwaway Chrome killed + scratch removed on completion. The C-SAFARI blank-WebKit chronic does
> NOT reproduce — the instrument is certified end-to-end for fan-out.

## Verdict: BOTH ENGINES PASS

| leg | engine (in-pixel badge) | GPU (in-pixel badge) | modes | dims | real content |
|---|---|---|---|---|---|
| **Chrome CDP** (real Chrome.app 149, connectOverCDP :9333) | `ENGINE CHROME` | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` — real Metal, NOT SwiftShader | light + dark | 1440×900 @1x | YES |
| **Safari off-screen WKWebView** (system WebKit.framework / Metal) | `ENGINE WEBKIT` | `Apple GPU` | light + dark | 2880×1800 @2x | YES |

`chromeOk = true`, `safariOk = true`. The C-SAFARI blank-WebKit chronic does **NOT** reproduce —
the off-screen WKWebView captures the FULL typography route content (the "Typography" display hero,
the golden-ratio blurb, the "Aa" specimen, the "Audacious peaks" ladder, the 352 mega numeral, the
sidebar icon rail + bottom nav dock) in both modes, with the decodable in-pixel engine badge.

## Evidence on disk (this dir)

| png | engine | mode | dims | bytes | badge (decoded from pixels) |
|---|---|---|---|---|---|
| `dark-readability-chrome-light-desktop-full.png` | CHROME (CDP, real Metal) | light | 1440×900 | 811 KB | `ENGINE CHROME · GPU ANGLE Metal Apple M5 Max · VIEW 1440×900 @1x · MODE LIGHT` |
| `dark-readability-chrome-dark-desktop-full.png` | CHROME | dark | 1440×900 | 1.25 MB | `… MODE DARK` |
| `dark-readability-safari-light-desktop-full.png` | WEBKIT (off-screen WKWebView, Metal) | light | 2880×1800 | 2.01 MB | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x (2880×1800px) · MODE LIGHT` |
| `dark-readability-safari-dark-desktop-full.png` | WEBKIT | dark | 2880×1800 | 2.49 MB | `… MODE DARK` |

`validate-dark-readability.mjs` (this dir) re-runs the pixel checks against the repo's single decoder
leaf (`scripts/reflect-capture-verify.mjs` — `isRealPng`/`pngDimensions`/`pngRegionStats`, NOT pngjs):

| png | isRealPng | dims | badge magenta-fiducial px | badge ink px | body σ(lum) | body meanLum | body meanChroma |
|---|---|---|---|---|---|---|---|
| chrome light | true | 1440×900 | 2604 | 54796 (dark ink) | 57.4 | 208.0 | 0.0326 |
| chrome dark  | true | 1440×900 | 2604 | 127671 (dark ink) | 57.6 | 42.5  | 0.0185 |
| safari light | true | 2880×1800 | 6432 | 424036 (light ink) | 59.9 | 223.3 | 0.0244 |
| safari dark  | true | 2880×1800 | 6432 | 526763 (dark field) | 59.4 | 35.3  | 0.0262 |

- **Not blank/shell.** Body luminance σ 57–60 (a uniform shell slab reads ~0); the prior blank-WebKit
  failure PNG was ~173 KB — these are 0.8–2.49 MB. Mode-differentiated body means (light ~208–223,
  dark ~35–42 — the W-DARK-MATERIAL luminous-dark register: the deep near-black page with legible
  warm-cream body/muted text, the wave's dark-readability surface).
- **Badge present + engine-discriminated in-pixel.** Magenta `#ff00ff` fiducial border found in every
  capture (2604 px Chrome @1x, 6432 px Safari @2x — scales with the retina backing); the badge text
  decodes to the correct ENGINE/GPU/VIEW/MODE. Chrome vs WebKit are pixel-distinguishable (different
  GPU strings — ANGLE-Metal-M5-Max vs Apple-GPU — different font metrics, @1x vs @2x — a genuinely
  different engine, not a re-shot Chromium).
- **Dimension-correct.** Chrome playwright-CDP screenshot is CSS-resolution 1440×900 @1x (honest —
  the badge VIEW field reports @1x); Safari WKWebView snapshots at the retina backing 2880×1800 @2x.
  Both ≥ the MIN_CAPTURE floor, both full-frame route content.
- **Visually confirmed.** `chrome-light` + `safari-dark` opened and read: full route content + the
  correct in-pixel badge in each; the dark blurb + "Audacious peaks" label read legibly in dark mode.

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
/tmp/wkshot-live "http://localhost:5200/?capture=/foundations/typography&mode=light" \
  <dir>/dark-readability-safari-light-desktop-full.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/foundations/typography&mode=dark"  \
  <dir>/dark-readability-safari-dark-desktop-full.png  dark  15000
#   → data-capture-ready polled @4500ms; snapshot 2880×1800, FULL content + WEBKIT badge

# 3 · Chrome leg — real Chrome.app + CDP over the SAME ?capture= route (badge reads real GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9333 --user-data-dir=<in-repo .chrome-profile-pipeline> \
  --no-first-run --no-default-browser-check --window-size=1440,900 about:blank &
CDP_URL=http://localhost:9333 node <dir>/chrome-capture-dark-readability.mjs
#   playwright chromium.connectOverCDP → Page.goto ?capture= → poll data-capture-ready
#   → read GL_RENDERER off a throwaway WebGL2 ctx → page.screenshot({fullPage:true})
#   data-capture-ready polled @~3.76s; GL_RENDERER = ANGLE Metal Apple M5 Max (real GPU)
```

- `data-capture-ready` is the deterministic readiness signal — POLLED, never a fixed sleep (an
  off-screen WKWebView throttles rAF; the boot's rAF-vs-setTimeout race lands the flag). Chrome
  ready @~3.76s, WebKit @4500ms.
- The `?capture=` mode de-promotes the `.route-enter` entrance CA layer for the snapshot (settled
  pixels unchanged), so the off-screen WKWebView reads FULL content — the C18 fix.
- **NOT the running headless lighthouse Chrome** (SwiftShader) — a fresh real Chrome.app on :9333
  with an in-repo throwaway profile, removed on completion.

## Scope note (pipeline vs paint verdict)

This is PIPELINE-VALIDATION evidence per real-paint-protocol §3 — it PROVES the dual-engine instrument
delivers full, dimension-correct, engine-provenanced captures for fan-out. Whether the dark-readability
census reads 0 below-floor text nodes (the wave's own contrast criterion) is the WAVE's OWN gestalt
roster row, flipped only at its owning non-authoring paint close — NOT here. This validator did not
build the wave and does not flip its verdict.

## Fences honored

Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. No `/tmp` PNG/DELTA output (the compiled
`wkshot-live` binary is the protocol §6.1-sanctioned `-o /tmp/wkshot-live`; the Chrome profile was an
in-repo dot-dir, removed on completion). No sibling under `~/Programming` touched/moved.
`verify-siblings-intact.mjs --quiet` exit 0 before AND after. `demo:dist:serve` + Chrome CDP killed
on completion.
