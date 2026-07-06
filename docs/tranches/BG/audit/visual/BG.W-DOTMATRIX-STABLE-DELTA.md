# BG.W-DOTMATRIX-STABLE — dual-engine paint verdict

**Route:** `/substrates/dot-matrix` · **Wave:** F9.R5 BG.W-DOTMATRIX-STABLE (USER 07-05)
**Judge:** non-authoring paint judge (did NOT build the wave)
**Date:** 2026-07-06 · **Verdict: PASS**

The BUILT bytes were served on `:5200` (`npm run demo:dist:build` exit 0 → `demo:dist:serve`
vite preview). Siblings intact before AND after (`verify-siblings-intact --quiet` exit 0).

---

## Verdict summary

The binding bar — **"a 60s unattended frame-series … per-frame mean luminance with ZERO
spikes … the flick produces a LOCAL decaying glow near the cursor, never a whole-globe
flash … the sphere reads as the stable slowly-rotating fine-dot shell (PRM static frame
still reads as a sphere) … no banded rings, no single-frame blackouts on park/wake"** — is
**MET decisively on real Metal GPU in BOTH modes.** The globe reads as a clean depth-shaded
Fibonacci-phyllotaxis fine-dot sphere; the 60s series shows near-flat mean luminance with a
max consecutive Δ of **1.33/255 (dark) / 0.87/255 (light)** (≈0.3-0.5% of full scale), zero
blackout frames, and — critically — a scroll-off→scroll-back WAKE that produces **no spike
and no re-fired entrance bloom**.

---

## Engine × mode coverage

| Engine | GPU (badge / probe) | light | dark | note |
|---|---|---|---|---|
| **Chrome** (CDP, real Chrome.app) | ANGLE (Apple, ANGLE **Metal** Renderer: Apple M5 Max) | ✅ full | ✅ full | globe pixels + 60s series + PRM captured directly |
| **Safari / WebKit** (WebKit.framework = Safari 26 engine) | Apple GPU (WebGL2 + WebGPU adapter apple/apple) | ✅ engine+health | ✅ engine+health | route+badge render; GL/GPU stack healthy, ZERO errors; GL **pixels** uncapturable in this env (documented below) |

Engine provenance decoded from the in-pixel badge: Chrome badge = `ENGINE CHROME / GPU ANGLE
(Apple, ANGLE Metal Renderer: Apple M5 Max) / DARK`; Safari badge = `ENGINE WEBKIT / GPU
Apple GPU / 1440×900 @2x / {DARK,LIGHT}`.

---

## The binding 60s no-flash frame-series (Chrome, live route, both modes)

Method (`frame-series.mjs`): navigate the **LIVE** interactive route (globe animates + is
pointer-aware), scroll the globe into view, wait out the single sanctioned cold-first-visible
entrance bloom, then record ~60s of canvas-region screenshots decoded to whole-region mean
luminance (pngjs) while a scripted pointer program runs. A whole-globe flash spikes the
global mean; a LOCAL glow barely moves it.

| phase | samples | global-lum range | max consecutive Δ | reading |
|---|---|---|---|---|
| **dark** — park1 | 230 | 65.63–65.71 | **0.005** | dead-flat parked; only slow-rotation drift |
| dark — sweep | 168 | 65.53–66.82 | 0.214 | dimple/glow local, tiny |
| dark — flick | 87 | 64.82–66.04 | 0.716 | flick barely moves global mean → glow is LOCAL |
| dark — park2 | 158 | 65.68–65.85 | 0.160 | glow decays calmly to rest |
| dark — **wake** (scroll off→back) | 121 | 65.72–65.76 | **0.007** | NO clear-flash, NO re-fired entrance bloom |
| **dark OVERALL** | **764** | — | **1.328** @ sweep→flick seam | zero blackout frames |
| **light** — park1 | 246 | 217.01–217.11 | **0.005** | dead-flat parked |
| light — sweep | 194 | 215.28–217.09 | 0.804 | local |
| light — flick | 90 | 216.06–217.03 | 0.734 | local |
| light — park2 | 162 | 216.85–217.18 | 0.096 | decays |
| light — **wake** | 122 | 217.14–217.17 | **0.004** | NO flash, NO re-bloom |
| **light OVERALL** | **814** | — | **0.871** | zero blackout frames |

Full per-frame series on disk: `frame-series-dark.json`, `frame-series-light.json`.

Bar checklist:
- **ZERO spikes / bounded max |ΔmeanLum|** — ✅ max 1.33/255 (dark), 0.87/255 (light); the
  entrance bloom fired BEFORE sampling began (the single sanctioned bloom, excluded).
- **flick = LOCAL decaying glow, never whole-globe flash** — ✅ flick-phase global mean range
  is ~1.2 (dark) / ~0.9 (light); a whole-globe flash would spike the global mean by tens.
- **no single-frame blackouts on park/wake** — ✅ `blackoutFrameCount: 0` both modes; wake Δ
  ≤ 0.007.
- **entrance bloom fires ONCE, NEVER on scroll-back/wake** — ✅ wake phase is dead-flat.

## The stable rotating sphere + PRM static (Chrome, both modes)

- Live globe crops (`dotmatrix-chrome-{dark,light}-globe.png`): a fine warm-cream
  Fibonacci-phyllotaxis dot SPHERE, depth-shaded (near hemisphere denser/brighter, rim + far
  side fading to a whisper), **no pole-pinch, no banded rings**, calm.
- PRM (`prefers-reduced-motion: reduce`) static frames
  (`dotmatrix-chrome-{dark,light}-prm-globe.png`): two frames 1.5s apart are **byte-identical
  in mean** (`prmFrameToFrameMeanAbsDiff: 0`) — the substrate paints ONE static frame then
  parks. The frozen frame **STILL reads as a sphere from the depth-shading alone.** ✅

## Computed DOM checks

- `canvasCount = 2` — the demo-added globe context **+** the substrates-category page-stage
  aurora backdrop (BA.W-STAGE `CATEGORY_DEFAULT_BG[substrates]=aurora`, recessive + offscreen-
  paused by construction). The globe is the ONE demo-added GL context (the story's
  one-GL-per-route claim); the stage aurora is the shared recessive backdrop, **calm, no
  conic, no oversaturation** (verified in the full-page shots).
- `mainChildren = 2`, `getAnimations = 10–11` (page-chrome CSS animations; not excessive).
- WebKit + Chrome both: `webgl2: true`, `hasGpu: true`, WebGPU `adapter: true` (apple/apple),
  globe canvas present, **`errs: []`** (zero GL/console errors) in BOTH modes.

---

## WebKit GL-pixel capture limitation (environmental — NOT a wave defect)

The proven pipeline (`wkshot-live` off-screen `takeSnapshotWithConfiguration`) was validated on
a **DOM/CSS** route (the disclosure/accordion route). For a **WebGL/WebGPU** surface it cannot
composite the GL layer: `takeSnapshot` and `screencapture -l<windowID>` both capture only the
window's local layers and MISS WebKit's **out-of-process WebContent GPU layer** (the globe
region came back flat/black while the surrounding DOM rendered). Literal-display capture
(`screencapture` full/region) requires the WKWebView to be composited on-screen, which a
**non-bundled CLI process cannot do** (window activation is denied → the window never appears
on the captured display), and the alternatives are TCC-gated (Accessibility keystroke/CGEvent
scroll: **denied**; Safari `do JavaScript`: **Develop setting off**; a bundled `.app` gets a
**fresh Screen-Recording TCC identity** that is ungranted and cannot be granted non-
interactively). Six methods were attempted (`wkshot-scroll.m`, `wkshot-onscreen.m`,
`wkshot-screencap.m` with `-l`/`-R`/full-display/`.app`-bundle, Safari.app AppleScript).

**Why this is not masking a defect:** the WebKit engine is proven **healthy** for this exact
surface — real Apple-GPU WebGL2 **and** a live WebGPU adapter, the globe canvas present, and
**zero GL/console errors** in both modes (`wkprobe.m`). The born-GPU globe's context therefore
initializes and paints in WebKit (a WebGPU/GLSL init failure would fire `onInitError` +
`console.error`; none did — and the born-GPU design falls back to WebGL2, also available). The
**no-flash law is a shared-JS code property** (`useDotMatrix.ts onFrame` slew-limited
attack/decay bloom, nearness-gated local read) that runs **identically** on both backends and
both engines — and it is verified live on real Metal GPU in Chrome. WebKit provenance (engine
+ badge + full route render) is captured in `dotmatrix-safari-{dark,light}-desktop-full.png`.

---

## Capture artifacts (all resolve on disk under `BG.W-DOTMATRIX-STABLE-assets/`)

- `dotmatrix-chrome-dark-desktop-full.png`, `dotmatrix-chrome-light-desktop-full.png` — Chrome full-page + badge
- `dotmatrix-chrome-dark-globe.png`, `dotmatrix-chrome-light-globe.png` — Chrome live globe (the sphere)
- `dotmatrix-chrome-dark-prm-globe.png`, `dotmatrix-chrome-light-prm-globe.png` — PRM static sphere
- `dotmatrix-safari-dark-desktop-full.png`, `dotmatrix-safari-light-desktop-full.png` — WebKit route + badge (GL region blank = capture limitation)
- `chrome-dark-badge.png`, `safari-dark-badge.png`, `safari-light-badge.png` — decoded engine provenance
- `frame-series-dark.json`, `frame-series-light.json` — the full 60s per-frame luminance series
- harness: `frame-series.mjs`, `chrome-capture.mjs`, `prm-capture.mjs`, `crop.mjs`, `wkprobe.m`, `wkshot-scroll.m`, `wkshot-onscreen.m`, `wkshot-screencap.m`

**Verdict: PASS** — the binding 60s no-flash bar is met on real Metal GPU in both modes; the
sphere (live + PRM) reads correct with no bands/blackouts; the WebKit engine is proven healthy
running the identical shared no-flash code. The only uncaptured artifact is WebKit GL pixels, an
exhaustively-attempted **capture-environment limitation** (out-of-process WebContent + TCC), not
a source defect — no fix is owed.
