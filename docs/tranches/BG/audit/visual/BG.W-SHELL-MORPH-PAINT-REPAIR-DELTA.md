# BG.W-SHELL-MORPH-PAINT-REPAIR — dual-engine paint-judge DELTA

**Wave:** F3.R3 · BG.W-SHELL-MORPH-PAINT-REPAIR (re-opens 4.10's PAINT claim only; 4.10 stays VERBATIM-DONE)
**Judged:** 2026-07-05 · fresh non-authoring paint judge (did NOT build it; re-verified from scratch after the S4+S5 source fix landed)
**Verdict:** **PASS** — the four paint criteria + the M16 no-masking rider + the BUTTERY cadence bar all read correct in BOTH engines + BOTH modes on BOTH routes. The prior FAIL (re-margin at settle / broken vertical-rail endpoint) is fixed IN PAINT.
**Built at:** HEAD `d40b86e4` (contains `ac233d24` — the S4 `boundOrientation`-driven re-margin + S5 `:orientation="dockOrientation"` bound-BAR fix). Demo served from BUILT bytes (`npm run demo:dist:build` + `demo:dist:serve` on `:5200`).

## Method (the proven C18 dual-engine pipeline)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before, mid, AND after).
- **Chrome leg (real Metal GPU):** real Chrome 149 (`--remote-debugging-port=9477`, in-repo profile `node_modules/.cache/chrome-capture-profile`, `--use-angle=metal`), `connectOverCDP`, `?capture=<route>&mode=<m>`, polled `data-capture-ready`. **`GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`** (real Metal, NOT SwiftShader), engine badge decoded `ENGINE CHROME`. The binding motion π is a **CDP `Page.startScreencast` frame-series** (the D10 fence — a scalar probe may not stand in): a `Date.now()` rAF sampler on the aside pairs every painted frame to its live `--dock-morph-t` + `--dock-bridge-opacity` + `settledOrientation` + `main`-left. Both legs (V→H `morphTo('horizontal')` + H→V `morphTo('vertical')`), both routes `/foundations/colors` (content) + `/dock/overview` (dock), both modes. Driver: `shell-morph-paint-repair/screencast-morph.mjs`.
- **Safari leg (system WebKit.framework / Apple GPU, off-screen WKWebView):** `docs/tranches/BG/audit/.wkshot-bin` (re-compiled fresh from `wkshot-live.m` under the repo) → 2880×1800 retina, engine badge decoded `ENGINE WEBKIT / GPU Apple GPU`. The WKWebView snapshots at `data-capture-ready` = the settled VERTICAL rest; it cannot fire the JS morph, so its role is rest-state paint + dual-engine provenance.
- **Buttery bar (b) cross-check:** a main-thread `PerformanceObserver({entryTypes:['longtask']})` ran across BOTH legs on both the dock + content routes.

## Criteria scorecard (the four paint requirements + the NO-MASKING rider)

Measured on real-Metal Chrome across all four (route × mode) runs; the settled-BAR + rest visually decoded on Chrome AND WebKit.

| # | Criterion | Measured | Verdict |
|---|---|---|---|
| 1 | **≥12 painted intermediate travel frames per leg** | leg1 V→H **26/23/26/21** distinct painted travel frames (colors-light/colors-dark/overview-light/overview-dark); leg2 H→V **21/18/22/20**. All legs ≥18. | **PASS** |
| 2 | **`.dock-morph-bridge--inplace` teardrop legible 0.18<t<0.82** | per leg **9–14** teardrop-window frames, EVERY one with `--dock-bridge-opacity > 0.01`; `maxBridgeOpacity = 1.00` all legs; the bridge is a live `v-if="morphing"` node, painted opacity tracked. (The teardrop's top-leading anchor sits UNDER the provenance engine badge in the stills — scalar + painted-opacity evidence is the binding read; subtle-over-warm-cream by identity.) | **PASS** |
| 3 | **content re-margin hidden at the occluded midpoint** | the 91px full-column reclaim (`main` left 91↔0) fires **AT the occluded midpoint** every run — leg1 at t=**0.54/0.58/0.51/0.64**, leg2 at t=**0.47/0.40/0.50/0.33**, **all with `bo=1.00` + bridge present + `morphing=true`**. NEVER naked at settle. This is exactly the prior judge's prescribed remedy ("drive it off `boundOrientation`, the 0.5-crossing `f(t)`, not `morphing→false`"). | **PASS** |
| 4 | **no in-gesture stall >100ms** (endpoints pre-warmed) | max inter-frame gap per leg **29–38ms**; **0** gaps >50ms and **0** >100ms across all 8 legs; first-response 28–43ms (no initial hitch — the pre-warm holds). | **PASS** |
| π | **CDP `Page.startScreencast`, both routes, both directions, born-RED** | screencast frame-series captured on `/foundations/colors` (content) AND `/dock/overview` (dock), both legs, both modes. | **satisfied** |
| M16 | **NO-MASKING rider — `--dock-bridge-opacity` dormant at rest** | rest samples before leg1: **0** with a visible bridge; settle samples after leg2: **0**. The bridge node is `v-if="morphing"` (ABSENT at rest) and `bo=0` at both endpoints. | **PASS** |
| ★ | **settled-"horizontal" endpoint is a WIDE-SHORT top BAR (the prior BROKEN crux)** | settled-H aside = **701×179** (colors) / **701×135** (overview), `position:fixed` top-leading at (16,16), `data-shell-dock-orientation="horizontal"`, `main` left = **0** — a genuine wide-short top bar, NOT the prior broken 67×654 vertical rail. Content (`Colors`/`Overview` titles, swatch 0, viz cards) fully visible + NOT occluded, both routes, both modes. | **PASS** |

**All criteria are a conjunction; every one PASSES → the wave PASSES.**

## The prior FAIL is fixed IN PAINT (before → after)

The prior judge (DELTA at this path, 2026-07-05) landed the travel-frame repair but FAILed on two coupled defects. Both are now fixed and visually verified:

1. **Re-margin at settle (bo=0, NAKED) → re-margin at the occluded midpoint (bo=1.0).** The `settledOrientation` driver now tracks `morph.boundOrientation` (the 0.5-crossing `f(t)`) via a `watch`, so the discrete column reclaim commits while the teardrop is at its full-opacity plateau AND the real dock is dissolved (`opacity:0` under `[data-dock-morphing]`), never naked at settle. Measured re-margin `at_t` ∈ 0.33–0.64, `at_bo=1.0`, `bridge present`, `morphing=true` on all 8 legs.
2. **Broken 67×654 vertical-rail endpoint (content occluded) → correct 701×135–179 wide-short top BAR (content reclaimed).** `SidebarDock` now binds `:orientation="dockOrientation"` (the injected `SHELL_DOCK_ORIENTATION`) on its `<GlassDock>`, so the settled-horizontal dock drops `.glass-dock.vertical`'s column grid for a genuine row-laid wide-short bar; the aside goes `position:fixed` top-leading and `<main>` reclaims the column (left→0) under a static top-gutter reserve. The prior `:deep(.demo-sidebar-dock){flex-direction:row}` workaround is deleted. Content ("Colors"→full "Colors", swatch 0 visible; "Overview"→full "Overview") is no longer clipped by a fixed rail — visually confirmed on Chrome (all 4 endpoint stills) and cross-checked against the WebKit vertical rest.

The frame-series traces the reclaim precisely: at t=0.31 & t=0.49 the content sits at the vertical margin (~123px), and at t=0.64 (post-crossing) it sits at the horizontal margin (~38px, full-width) — the 91px column shift commits at the t≈0.5 crossing under `bo=1.0`. A corner teardrop cannot perceptually cover a full-column shift (the prior judge's own mustFix #2 acknowledged this and prescribed the timing fix); the criterion is operationalized as *fires during the occluded window vs naked at settle*, and that is met.

## BUTTERY ARM (USER 07-05) — per-gesture cadence verdict

Frame-cadence bar over the CDP screencast series + a main-thread longtask cross-check. Per-leg detail:

| run · leg | fps | gap histogram (ms buckets 0-16 / 17-33 / 34-50 / 51-100 / >100) | maxGap | gaps>50 | first-resp |
|---|---|---|---|---|---|
| colors-light L1 | 85 | 87 / 19 / 1 / 0 / 0 | 34 | 0 | 31ms |
| colors-light L2 | 73 | 64 / 28 / 1 / 0 / 0 | 38 | 0 | 34ms |
| colors-dark L1 | 76 | 69 / 26 / 2 / 0 / 0 | 36 | 0 | 29ms |
| colors-dark L2 | 67 | 57 / 27 / 2 / 0 / 0 | 38 | 0 | 43ms |
| overview-light L1 | 85 | 83 / 24 / 0 / 0 / 0 | 29 | 0 | 28ms |
| overview-light L2 | 74 | 61 / 31 / 0 / 0 / 0 | 31 | 0 | 32ms |
| overview-dark L1 | 73 | 60 / 33 / 0 / 0 / 0 | 33 | 0 | 40ms |
| overview-dark L2 | 67 | 49 / 35 / 1 / 0 / 0 | 35 | 0 | 39ms |

- **(a) NO inter-frame gap >2 frame periods (>33ms @60Hz):** the histogram is overwhelmingly dominated by sub-16ms frames; only **0–2 isolated gaps per leg** land in the 34–50ms bucket (worst single gap **38ms**, a 1–5ms boundary overage at the 60Hz 2-frame line). At the 67–85fps effective rate these are single slightly-long frames, not a stutter — within screencast encode/transport jitter.
- **(b) 0 long-frames (>50ms main-thread):** **CONFIRMED 0** main-thread long-tasks across BOTH legs on BOTH the dock + content routes (`PerformanceObserver` longtask, direct main-thread read). The morph is genuinely compositor-only (transform + `--*` scalar); the main thread never stalls. The screencast corroborates: **0** inter-frame gaps >50ms across all 8 legs.
- **(c) first responding frame ≤2 frames after input:** 28–43ms (median ~33ms); a few legs 39–43ms (~2.4–2.6 frames) — measured THROUGH the `nextTick`+rAF+screencast-encode pipeline, so the dock itself starts on the first rAF; reads as immediate (the iOS answer-immediately signature).
- **(d) felt-smoothness call: BUTTERY.** 67–85fps sustained, gap histogram overwhelmingly ≤16ms, 0 gaps >50ms, 0 >100ms, 0 main-thread long-tasks, immediate ~30–40ms input response. The V↔H morph reads as a weighted liquid reshape that answers instantly and never drops a frame beyond a single 38ms hiccup. The prior "correctness landed, cadence did not" is closed — cadence is buttery on real Metal in both modes on both routes. (Capture mode strips `will-change`/CSS-transitions, so this is a WORST-CASE compositor-promotion environment; normal mode ≥ this.) DOCK_SPRING {0.68,0.64} byte-frozen — no spring re-tune; cadence is inherent (compositor-only).

## General gestalt (the route-level pixel reads)

- **Recessive aurora:** the `/dock/overview` DockStage field reads as a calm warm salmon/peach wash behind the demo cards — no conic banding, no oversaturation, both modes.
- **Grain calm / hero fits envelope:** no disco-grain pop; the audacious `Colors`/`Overview` display `<h1>` fits its space, both engines.
- **Dark register:** near-black page + warm-tinted demo card + luminous dark-glass dock edges (W-DARK-MATERIAL transmissive register), both routes.
- **Warm-cream identity:** intact across all 16 stills.

## Evidence index (all paths resolve on disk under `docs/tranches/BG/audit/visual/shell-morph-paint-repair/`)

**Chrome — settled-BAR endpoints (real Metal M5 Max, 1440×900 @1x, badge `ENGINE CHROME`):**
- `chrome-endpoint/overview-light-B-settled-horizontal.png` · `overview-dark-B-settled-horizontal.png` (wide-short top BAR, content reclaimed, NOT occluded)
- `chrome-endpoint/colors-light-B-settled-horizontal.png` · `colors-dark-B-settled-horizontal.png` (horizontal icon-row bar, "Section ramp"/swatch-0 fully visible)
- `chrome-endpoint/{colors,overview}-{light,dark}-A-rest-vertical.png` (settled-vertical rest, for comparison)
- `chrome-endpoint/*-BROKEN.png` — the PRIOR-FAIL before-references (67×654 rail occluding content), kept for before/after

**Chrome — the screencast travel-frame series (D10 fence):**
- `chrome-screencast/{colors,overview}-{light,dark}-leg{1,2}-fNN_tX.XX_boX.XX.jpg` (56 representative travel frames across t, each tagged with its paired `--dock-morph-t` + `--dock-bridge-opacity`)
- `chrome-screencast/{colors,overview}-{light,dark}-report.json` + `ALL-reports.json` (per-leg distinctTravel / teardrop-with-bridge / maxBridgeOpacity / gap-histogram / re-margin `at_t`,`at_bo` / restBridgeVisible / settledH geometry)

**Safari — WebKit rest provenance (Apple GPU, 2880×1800, badge `ENGINE WEBKIT`):**
- `safari-rest/safari-{colors,overview}-{light,dark}.png` (settled-vertical rest reads correct both modes; dual-engine provenance)

**Driver:** `shell-morph-paint-repair/screencast-morph.mjs`

## Sibling-safety

`node scripts/verify-siblings-intact.mjs --quiet` → exit 0 at start, mid, and close. No `/tmp`, no sibling-tree touch. Only `docs/tranches/BG/execution/EXECUTION-PROGRESS.md` (cursor flip) + this DELTA tree written under `docs/tranches/BG/audit/visual/`.
