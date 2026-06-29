# BG dual-engine capture pipeline — END-TO-END PROVEN (C-SAFARI keystone)

> **Role:** non-authoring CAPTURE-PIPELINE VALIDATOR (built no wave). **Purpose:** PROVE the dual-engine
> `?capture=` harness works end-to-end on the BUILT dist `:5200` BEFORE fan-out — the C-SAFARI chronic that
> missed four prior tranches. **Surface:** `BG.W-ROUTE-TRANSITION` keystone route `/dock/overview` (the
> `.route-enter` atomic-swap + on-mount entrance — the exact surface class that bare-shelled in WebKit on the
> dev server at Stage-0). **Date:** 2026-06-29 (re-run @ 12:09 over the C18 harness `d4ae4577`).
>
> **SUPERSEDES the 11:45 pre-C18 conclusion below.** That run predated the C18 `?capture=` harness — it found
> `safariOk=false` because the off-screen WKWebView snapshotted a BLANK `<main>` (the `.route-enter`
> transform-promoted CA layer dropped off-screen) and the badge was ABSENT. The C18 harness (`?capture=` mode +
> `demo/capture/capture.css` de-promotion + `engine-badge.ts`) CLOSED both gaps. This re-run proves it.

## Verdict: BOTH legs PASS — `chromeOk = true · safariOk = true`

| leg | engine badge (decoded from the pixels) | GPU | dims | content | mode axis |
|---|---|---|---|---|---|
| **Chrome (CDP)** | `ENGINE CHROME` | `ANGLE Metal Renderer: Apple M5 Max` (real Metal, NOT SwiftShader) | 1440×900 @1x | FULL route — `main.children=3`, `canvases=2`, `bodyChars=4959` | light + dark both render; `MODE` field correct |
| **WebKit (off-screen WKWebView)** | `ENGINE WEBKIT` (no `Version/` token → the load-bearing C-SAFARI Tier-1 path) | `Apple GPU` (system WebKit.framework, Metal) | 2880×1800 @2x | FULL route content, both modes | light + dark both render; `MODE` field correct |

The in-pixel engine badge (`demo/capture/engine-badge.ts`, the SOLE provenance source) decodes correctly in
all 4 PNGs — `ENGINE · GPU · VIEW · MODE` from the magenta-bordered top-left panel. The gate (and this judge)
do not take the capturer's word for which engine produced which PNG; the bytes carry it. Light↔dark differ in
luminance (chrome center meanL 0.750→0.563, safari 0.789→0.434) — the mode axis is real, not a re-stamp.
Center meanChroma 0.06–0.08 = warm route content, not a flat/blank shell.

## On-disk evidence (this dir, the 4-PNG floor + read crops)

| png | engine | mode | dims | bytes | center meanL / meanChroma |
|---|---|---|---|---|---|
| `route-transition-chrome-light-desktop-full.png` | CHROME (CDP, Metal M5 Max) | light | 1440×900 | 630 KB | 0.750 / 0.077 |
| `route-transition-chrome-dark-desktop-full.png` | CHROME | dark | 1440×900 | 631 KB | 0.563 / 0.080 |
| `route-transition-safari-light-desktop-full.png` | WEBKIT (WKWebView, Metal) | light | 2880×1800 | 2374 KB | 0.789 / 0.062 |
| `route-transition-safari-dark-desktop-full.png` | WEBKIT | dark | 2880×1800 | 2383 KB | 0.434 / 0.067 |

Visual confirm (badge crops + downscaled fulls, all read by the judge): `DOCK · OVERVIEW` eyebrow · `Overview`
hero `<h1>` · blurb · the GlassDock walkthrough cards over the live DockStage aurora field · SidebarDock rail
+ BottomDock nav strip · inline `--spring-dock`/`prefers-reduced-motion` code chips. Dark = near-black
W-DARK-MATERIAL page, luminous-dark glass cards, white ink. Both engines render the same route faithfully.

## The WORKING method (exact commands — proven, do NOT re-derive)

```bash
# 0 · siblings tripwire (before + after)
node scripts/verify-siblings-intact.mjs --quiet                       # exit 0

# 1 · BUILT bytes on :5200 (NOT :5199 dev, which bare-shells WebKit)
npm run demo:dist:build                                               # → dist-demo/, ~1.3s
npm run demo:dist:serve                                               # vite preview :5200 (background)
#   poll: curl -s -o /dev/null -w '%{http_code}' 'http://localhost:5200/?capture=/dock/overview&mode=light' == 200

# 2 · WebKit/Safari leg — off-screen WKWebView (system WebKit.framework, Metal, NO Screen-Recording TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o <SCRATCH>/wkshot-live       # 57 KB binary, clean compile
<SCRATCH>/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=light" out-light.png light 15000
<SCRATCH>/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=dark"  out-dark.png  dark  15000
#   the harness POLLS document.documentElement[data-capture-ready] (landed ~4500-4800ms) THEN snapshots → 2880×1800

# 3 · Chrome leg — real Chrome.app + CDP (real Metal GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9456 --user-data-dir=<SCRATCH>/chrome-udd \
  --no-first-run --no-default-browser-check --disable-extensions about:blank &
#   playwright connectOverCDP (resolve repo node_modules via createRequire pointed at the repo package.json):
#     const { chromium } = require('playwright');
#     const browser = await chromium.connectOverCDP('http://localhost:9456');
#     page.goto('http://localhost:5200/?capture=/dock/overview&mode=<mode>')
#     await page.waitForFunction(() => document.documentElement.hasAttribute('data-capture-ready'))
#     GL_RENDERER via WEBGL_debug_renderer_info → 'ANGLE Metal Renderer: Apple M5 Max' (proves real GPU)
#     page.screenshot({ clip:{x:0,y:0,width:1440,height:900} })
```

- `?capture=<route>&mode=<light|dark>` boots `demo/main.ts` into the settled-frame mode (the `.route-enter`
  transform-promotion neutralized via `demo/capture/capture.css`, settled pixels unchanged) so the off-screen
  WKWebView snapshots the FULL base layer, not a blank `<main>`. Readiness = the `data-capture-ready`
  attribute — POLL it, never a fixed sleep.
- `<SCRATCH>` = a session-isolated throwaway dir (NOT bare `/tmp`, NOT a sibling). All PNGs land under
  `docs/tranches/BG/audit/visual/`. The Chrome leg captured at the page's own window dpr (`@1x`); a
  retina-parity Chrome leg sets `deviceScaleFactor: 2` on a playwright-launched context — the badge records the
  actual dpr either way, so the per-pixel-ΔE `safari-fidelity-delta` work pins it explicitly.

## Scope note

This validates the INSTRUMENT (the capture pipeline is real, dual-engine, both-mode, badge-provenanced,
real-content, dimension-correct). It does NOT discharge `BG.W-ROUTE-TRANSITION`'s full paint-acceptance
(5-nav burst · `main.children===2` per-route · monotonic `glContextCount===1` · the gestalt verdict-flip) —
those are the non-authoring judge's separate read against captures like these. The pipeline being proven is the
precondition every fan-out wave now builds on: the C18 harness works on both engines, both modes, end-to-end.

---

## (SUPERSEDED) 11:45 pre-C18 run — retained for the harness-fix lineage

The original validation run (before `d4ae4577`) found `safariOk=false`: the off-screen `WKWebView
takeSnapshot` rendered the `<main>` BLANK because `BG.W-ROUTE-TRANSITION`'s `.route-enter`
`@keyframes`-on-mount entrance animates `transform`, promoting the keyed route wrapper to a Core Animation
layer the off-screen snapshot drops; the protocol §6 on-screen `screencapture -o -l <windowID>` path was
TCC-Screen-Recording-blocked. Three probes proved WebKit DID render the real content (`wkprobe` DOM:
`mainTextLen:4705 · canvasCount:2 · 0 errors`; `wkstrip` layer-strip → full content appeared; the byte-size
delta 173KB-blank vs 3.2MB-stripproof). The recommended fix path (A) — build the C18 `?capture=` harness with
the de-promotion stylesheet + the in-pixel engine badge — is exactly what landed in `d4ae4577` and is proven
above. The `*-stripproof.png` files in this dir are the original diagnostic evidence (layer-stripped, full
content) and are retained for that lineage; the binding clean captures are the `*-full.png` set re-shot above.
