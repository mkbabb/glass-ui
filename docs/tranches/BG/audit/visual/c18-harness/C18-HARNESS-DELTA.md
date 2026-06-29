# BG C18 capture harness — the C-SAFARI unblock (`?capture=` static-frame mode + engine badge)

> **Role:** standalone HARNESS build (no parallel agents). **Purpose:** make the OFF-SCREEN
> WKWebView snapshot capture REAL route content cleanly (it captured a BLANK `<main>` before)
> and mint the protocol §6 in-pixel engine badge. **Surface:** the C-SAFARI keystone route
> `/dock/overview`. **Date:** 2026-06-29. **Fence:** HARNESS + demo only — ZERO `src/`
> component edits, the route-enter mechanism is byte-untouched (the wave's paint must verify the
> REAL settled surface).

## Verdict

| leg | before C18 | after C18 |
|---|---|---|
| **Off-screen WKWebView `<main>`** | BLANK (173 KB shell-only PNG — the `.route-enter` transform-promoted CA layer is dropped off-screen) | **FULL CONTENT** (2.43 MB — hero, blurb, aurora DockStage field, all dock sections, both nav docks), BOTH modes |
| **In-pixel engine badge** | ABSENT (`demo/capture/engine-badge.ts` did not exist) | **PRESENT** in all 4 PNGs — deterministic ENGINE · GPU · VIEW · MODE provenance |
| **Engine discrimination (in-pixel)** | by capture-METHOD only | `ENGINE WEBKIT / GPU Apple GPU` (off-screen WKWebView, system WebKit.framework/Metal) vs `ENGINE CHROME / GPU ANGLE Metal Apple M5 Max` (Chrome CDP, real GPU) — decodable FROM the pixels |
| **Chrome CDP `?capture=` route** | n/a | badge + full content, real Metal GPU, both modes |

**The binding C-SAFARI answer: YES** — the off-screen WKWebView now captures full content + the
badge. There is **no deeper WebKit off-screen-snapshot limitation** after the capture-mode
flat-render; the on-screen `screencapture`/Screen-Recording-TCC path is NOT needed for this
surface. WebKit RENDERS correctly — the fix was purely the harness (de-promote the entrance
layer for the snapshot).

## Evidence on disk (this dir)

| png | engine | mode | dims | bytes | badge text |
|---|---|---|---|---|---|
| `c18-safari-light-desktop.png` | WEBKIT (off-screen WKWebView, Metal) | light | 2880×1800 | 2.43 MB | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x · MODE LIGHT` |
| `c18-safari-dark-desktop.png` | WEBKIT | dark | 2880×1800 | 2.44 MB | `… MODE DARK` |
| `c18-chrome-light-desktop.png` | CHROME (CDP, real Metal) | light | 2880×1612 | — | `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max …) · MODE LIGHT` |
| `c18-chrome-dark-desktop.png` | CHROME | dark | 2880×1612 | — | `… MODE DARK` |

## Root cause → fix (two harness bugs, both closed)

1. **The off-screen-blank (the diagnosed C-SAFARI blocker).** `BG.W-ROUTE-TRANSITION`'s
   `.route-enter` `@keyframes`-on-mount ANIMATES `transform`, promoting the keyed route wrapper
   (`<component class="route-enter">`, the direct `<main>` child) to a Core Animation layer an
   off-screen WKWebView drops from `takeSnapshotWithConfiguration`. **Fix:** a `?capture=` MODE
   that sets `<html data-capture>` BEFORE mount, activating `demo/capture/capture.css` —
   `animation: none !important` + `transition: none !important` (no animation = no
   animation-driven promotion; CSS entrances jump to their settled end-state), `will-change:
   auto !important` (drop the layer hints), the entrance-recipe children forced to settled
   `opacity:1/transform:none` (the `[data-scroll-reveal-once] > * { opacity: 0 }` baked-hidden
   base un-hidden), and `.route-enter`/`.aurora-root` `contain: none` + the aurora
   `content-visibility: visible`. The SETTLED pixels are unchanged — only the promotions the
   off-screen snapshot cannot read are removed.

2. **The off-screen rAF stall (found live).** An off-screen WKWebView (no attached window)
   THROTTLES/SUSPENDS `requestAnimationFrame`, so the boot's `nextPaint()` double-rAF HUNG
   forever — `data-capture-ready` never landed and the badge never mounted (the first capture
   rendered content but no badge + no ready flag). **Fix:** `nextPaint()` now races the rAF
   against a `setTimeout(250)` fallback (setTimeout fires off-screen), so the settle resolves
   within the cap even when rAF is suspended. After the fix, `data-capture-ready` landed at
   4500 ms in both modes and the badge mounted.

## The working capture commands

```bash
# 0 · siblings tripwire (before + after)
node scripts/verify-siblings-intact.mjs --quiet            # exit 0

# 1 · build + serve the BUILT demo dist on :5200
npm run demo:dist:build                                    # → dist-demo/, ~0.9s
npm run demo:dist:serve                                    # vite preview :5200 (background)

# 2 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework, Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=light" out-light.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=dark"  out-dark.png  dark  15000
#   the harness POLLS document.documentElement[data-capture-ready] (≤ maxWaitMs) THEN snapshots

# 3 · Chrome leg — real Chrome CDP over the SAME ?capture= route (badge reads real GPU)
#   navigate http://localhost:5200/?capture=/dock/overview&mode=<mode>
#   poll document.documentElement.hasAttribute('data-capture-ready') THEN screenshot
```

The `?capture=<route>&mode=<light|dark>` URL boots `demo/main.ts` into the settled-frame mode;
readiness is the `<html data-capture-ready>` attribute (+ `window.__captureReady`) — poll it,
never a fixed sleep. The non-capture (normal demo) path is byte-untouched.
