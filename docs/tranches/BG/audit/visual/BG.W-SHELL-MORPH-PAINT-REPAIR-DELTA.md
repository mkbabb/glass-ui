# BG.W-SHELL-MORPH-PAINT-REPAIR — dual-engine paint-judge DELTA

**Wave:** F3.R3 · BG.W-SHELL-MORPH-PAINT-REPAIR (re-opens 4.10's PAINT claim only; 4.10 stays VERBATIM-DONE)
**Judged:** 2026-07-05 · non-authoring paint judge (did NOT build it)
**Verdict:** **FAIL** — travel-frame repair LANDED, but the content re-margin criterion is not met and the settled-horizontal endpoint is visually BROKEN.
**Built at:** HEAD `ee382861` (contains `02eb5d6e` — the W-SHELL-MORPH-PAINT-REPAIR build). Demo served from BUILT bytes (`npm run demo:dist:build` + `demo:dist:serve` on `:5200`).

## Method (the proven C18 dual-engine pipeline)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).
- **Chrome leg (real Metal GPU):** real Chrome 149 (`--remote-debugging-port=9477`, in-repo profile `node_modules/.cache/chrome-capture-profile`), `connectOverCDP`, `?capture=<route>&mode=<m>`, polled `data-capture-ready`. **`GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`**, engine badge `ENGINE CHROME`. The binding motion π is a **CDP `Page.startScreencast` frame-series** (the D10 fence — a scalar probe may not stand in) with each painted frame TAGGED to its live `--dock-morph-t` + `--dock-bridge-opacity` via a shared `Date.now` rAF sampler. Both legs (V→H and H→V), routes `/foundations/colors` (content) + `/dock/overview` (dock).
- **Safari leg (system WebKit.framework / Metal, off-screen WKWebView):** `docs/tranches/BG/audit/.wkshot-bin` → 2880×1800 retina, engine badge `ENGINE WEBKIT / GPU Apple GPU`. Settled rest-state provenance (the WKWebView snapshots at `data-capture-ready` = the settled VERTICAL rest; it cannot fire the JS morph, so its role is rest-state + dual-engine provenance).

## Criteria scorecard (the four paint requirements + the NO-MASKING rider)

| # | Criterion | Measured (real Metal Chrome) | Verdict |
|---|---|---|---|
| 1 | **≥12 painted intermediate travel frames per leg** | leg1 V→H **20** distinct painted travel frames (t∈0.05..0.95, all distinct SHA); leg2 H→V **18** distinct | **PASS** |
| 2 | **`.dock-morph-bridge--inplace` teardrop legible 0.18<t<0.82** | 11 (leg1) / 12 (leg2) teardrop-window frames, EVERY one with `--dock-bridge-opacity > 0.01`; `bo` ramps `0.03 → 0.55 → 1.00 (plateau 0.32–0.72) → 0.06` per the `bridgeGate` smootherstep; teardrop bloom visibly present + reshaping in the painted frames | **PASS** (legible; subtle over warm-cream by identity) |
| 3 | **content re-margin hidden at the occluded midpoint** | re-margin (`main` left 91→0 / 0→91, a **91px full-column shift**) fires **AT SETTLE**: leg1 at `t=1, bo=0, morphing=false`; leg2 at `t=0, bo=0`. NAKED — the teardrop is fully GONE (bo=0) when the content jumps. NOT hidden at the 0.18–0.82 midpoint. | **FAIL** |
| 4 | **no in-gesture stall >100ms** (endpoints pre-warmed) | leg1 max inter-frame gap **29ms**; leg2 **33ms**. The 295ms measure-storm is gone (the `readCapToken` pre-warm landed). | **PASS** |
| π | **CDP `Page.startScreencast`, both routes, both directions, born-RED** | screencast frame-series captured on `/foundations/colors` (content) both legs; behaviour identical on `/dock/overview` (dock) | **satisfied** |
| M16 | **NO-MASKING rider — `--dock-bridge-opacity` dormant at rest** | 92 rest samples, **0** with a visible bridge; the bridge node is `v-if="morphing"` (ABSENT at rest) and `bo=0` at both endpoints. The showcase arms `1` on its own scope. | **PASS** |

**The wave's criteria are a conjunction; #3 fails → the wave FAILs.** The failure is exactly the class the D10 paint fence exists to catch: a scalar probe reports "the morph ran" while the PAINT lands a naked content jump into a broken endpoint.

## What genuinely LANDED (the born-RED repair works)

The IOS27-MOTION-TRUTH §2.3 born-RED was "**ZERO painted travel frames** — ~1.3s no change incl. a 295ms stall then a SINGLE-FRAME hard swap." That is FIXED:
- 20 / 18 **distinct painted** travel frames per leg (not a hard swap).
- The `.dock-morph-bridge--inplace` teardrop paints and reshapes across the occluded midpoint (bo→1.0).
- No in-gesture stall (max 29–33ms; the per-frame `getComputedStyle` measure-storm excision — `capTokenCached` pre-warm in `runTo`/`pin` — is real).
- Bridge dormant at rest (the M16 no-masking floor holds).

This is a real, meaningful improvement over HEAD. It is NOT enough to close the wave, because the endpoint the travel lands on is broken.

## Defect localization (the FAIL)

**Root cause — the "horizontal" settled dock never becomes horizontal; it stays a vertical rail that occludes the re-margined content.**

- `demo/layout/SidebarDock.vue:193` hardcodes `<GlassDock orientation="vertical">`, so the dock root permanently carries `.glass-dock.vertical` (its internal layer/section grid lays out as a COLUMN).
- On the shell morph the ONLY thing that flips is `[data-shell-dock-orientation="horizontal"]` on the aside + `<main>` (`AppShell.vue:357/401`); GlassDock's own `orientation` prop is never re-pointed.
- The compensating CSS `AppShell.vue:528` `…[data-shell-dock-orientation="horizontal"] :deep(.demo-sidebar-dock){ flex-direction: row }` reaches the glass-dock ROOT but CANNOT re-lay GlassDock's internal vertical structure. **Measured settled-horizontal dock: `.demo-sidebar-dock` computes `flex-direction:row` yet renders 67×654 — still a vertical rail** (aside box 91×686, `position:fixed`).
- `AppShell.vue:518` sets the aside `position:fixed` at `inset-inline-start:1rem` while `<main>` re-margins to `mainLeft:0` and reserves only a TOP gutter (`AppShell.vue:536` `padding-block-start`). So the fixed 67px-wide vertical rail overlaps the content column: the left ~50–90px of every line is OCCLUDED (screenshots: "Colors"→"ors", "FOUNDATIONS"→"TIONS", swatch 0 hidden; "Overview"→"erview", "GlassDock"→"ssDock").
- `AppShell.vue:86–92` — `settledOrientation` flips only on `morphing → false` (settle), which is what drives the `main` re-margin, so the reclaim fires at `t=1/t=0` (bo=0), NOT at the occluded midpoint. Even the code comment's intent ("re-materializing … as the neck fades") is not met — and a 91px full-column horizontal shift cannot be hidden by a 91px top-left teardrop regardless of timing.

Reproduces IDENTICALLY on `/foundations/colors` and `/dock/overview`, both light and dark (all four: aside 91×686 fixed-vertical, `main` left 0). It is an engine-independent CSS/layout defect (Chrome Metal shows it; Safari's settled-vertical rest reads correct — the defect is only in the morph endpoint the WKWebView snapshot can't reach).

## mustFix[]

1. **Make the settled "horizontal" dock actually horizontal** so the content re-margin to `mainLeft:0` no longer slides under a vertical rail. `flex-direction:row` on the glass-dock root is insufficient — GlassDock keeps `.glass-dock.vertical`'s column grid. Either re-point GlassDock's own `orientation` prop to `"horizontal"` at the settled endpoint (a true top-leading horizontal bar), or reshape the inner dock layout so the icons lay out in a row and the box becomes wide-and-short (top bar), not tall-and-narrow (rail). Then the `<main>` top-gutter reserve (`AppShell.vue:536`) correctly clears it and no content is occluded.
2. **Land the content re-margin INSIDE the occluded midpoint** (criterion #3): the discrete column reclaim must fire while the teardrop covers the flip (0.18<t<0.82), not at settle (bo=0). Drive it off `boundOrientation` (the 0.5-crossing `f(t)`) rather than `morphing → false`, so the reclaim is hidden under the neck — this only works once mustFix #1 removes the left-column occlusion, since a full-column horizontal shift cannot hide behind a left-edge teardrop.
3. Re-verify with the same screencast frame-series (both routes, both legs, both modes): the endpoint must read as a correct horizontal dock with NO content occlusion, and the re-margin must land under the teardrop.

## Evidence index (all paths resolve on disk under `docs/tranches/BG/audit/visual/shell-morph-paint-repair/`)

**Chrome — travel-frame repair (PASS proof), real Metal M5 Max, `/foundations/colors` light:**
- `chrome-travel/f003_t0.18_bo0.03_leg1.jpg` … `f005_t0.25_bo0.55` · `f009_t0.50_bo1.00` (teardrop full at mid) · `f013_t0.70_bo1.00` · `f015_t0.84_bo0.06` (leg1 V→H teardrop series)
- `chrome-travel/f157_t0.27_bo0.78_leg2.jpg` · `f159_t0.19_bo0.08_leg2.jpg` (leg2 H→V)
- `chrome-travel/screencast-report.json` (leg1: 20 distinct travel frames, 11 teardrop w/ bridge, maxBridgeOpacity 1.0, maxInGestureGap 29ms; leg2: 18 / 12 / 1.0 / 33ms; restBridgeVisibleCount 0/92)

**Chrome — the BROKEN endpoint (FAIL proof), real Metal M5 Max:**
- `chrome-endpoint/colors-light-A-rest-vertical.png` (correct vertical rest, for comparison)
- `chrome-endpoint/colors-light-B-settled-horizontal-BROKEN.png` (content "Col"ors occluded under the fixed vertical rail)
- `chrome-endpoint/colors-dark-B-settled-horizontal-BROKEN.png`
- `chrome-endpoint/overview-light-B-settled-horizontal-BROKEN.png`
- `chrome-endpoint/overview-dark-B-settled-horizontal-BROKEN.png` ("Overview"→"erview" occluded)

**Safari — settled-vertical rest provenance (WebKit / Apple GPU, 2880×1800):**
- `safari-rest/safari-colors-light.png` · `safari-colors-dark.png` · `safari-overview-light.png` · `safari-overview-dark.png` (rest state reads correct in both modes; badge decodes `ENGINE WEBKIT`)

## Sibling-safety

`node scripts/verify-siblings-intact.mjs --quiet` → exit 0 at start and at close. No `/tmp`, no sibling-tree touch. Only `docs/tranches/BG/execution/EXECUTION-PROGRESS.md` (cursor flip) + this DELTA tree written.
