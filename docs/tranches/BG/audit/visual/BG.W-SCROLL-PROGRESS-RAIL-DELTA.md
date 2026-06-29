# BG.W-SCROLL-PROGRESS-RAIL — NON-AUTHORING dual-engine paint verdict

> **Role:** NON-AUTHORING PAINT JUDGE (built no wave). **Wave:** `BG.W-SCROLL-PROGRESS-RAIL` (WS1 —
> the `.scroll-progress` recipe re-point: `transform-origin:0 50%` + `scaleX(0)` HOISTED UNCONDITIONAL
> as the invisible rest on ANY unsupported/invalid/PRM path, a FULL-value `--scroll-progress-timeline`
> var replacing the retired invalid `scroll(var(--scroll-progress-scroller) block)` fragment that
> computed `animation-timeline → auto → scaleX(1)` full-width at HEAD).
> **Method:** BUILT dist on `:5200` (NOT `:5199` dev) — `npm run demo:dist:build` → `demo:dist:serve`
> (vite preview). Dual-engine: Chrome via CDP (real Metal) + WebKit via the system WebKit.framework
> (Safari 26 / Metal). **Date:** 2026-06-29. **Branch:** tranche/BG.
> **Criteria:** "COMPUTED `animationTimeline !== 'auto'` + `scaleX(0)` at scroll-top every route + GROWS
> via `getAnimations()[0].currentTime` + bbox-width delta de-confounded; Chrome+Safari."

## Verdict: **PASS** — the scroll-progress rail reads correct in BOTH engines, BOTH modes, every route + the named-timeline demo.

The four computational criteria PASS on the GLOBAL rail (`.demo-scroll-progress`, which rides every
StoryPage) AND on the genuine NAMED cross-element timeline-scope demo bar (`/motion/scroll-vt`), in
**Chrome (ANGLE Metal · Apple M5 Max)** and **WebKit (system WebKit.framework · Apple GPU, no `Version/`
token → C-SAFARI Tier-1)**, in BOTH modes. The HEAD D5 defect is structurally absent: the served BUILT
CSS carries ZERO `scroll(var(` fragment (clean break confirmed in the bytes), `animation-timeline`
resolves to a real scroll-timeline (NOT `auto`), and the bar rests at `scaleX(0)` — invisible — rather
than the HEAD `auto → scaleX(1)` permanent full-width rule. **All 30 capture PNGs RESOLVE ON DISK**
(10 Chrome capture + 10 Chrome grown-bar + 10 WebKit capture; `MISSING=0`, none < 1 KB).

## Methodology note — why the computed reads run on the LIVE (non-capture) route

The C18 `?capture=` harness loads `capture.css`, whose rule 1 is `html[data-capture] * { animation: none
!important }` — it FREEZES every animation to its settled base so the off-screen WebKit snapshot is
deterministic. The `.scroll-progress` bar's settled base IS `scaleX(0)` (the wave's hoisted invisible
rest), so the capture screenshots correctly show the bar **at rest, invisible** — but capture mode cannot
exhibit GROWTH (the scroll-grow animation is killed). The four COMPUTATIONAL criteria (`animationTimeline`,
`getAnimations().currentTime`, the bbox-width delta) are therefore read on the **LIVE non-capture route**
(same `:5200` BUILT bytes, animations intact), navigated via the in-app vue-router `$router.push` — the
DOM/style/layout is fully real in both engines. The PIXEL evidence (route paints, badge provenance,
bar-at-rest, bar-grown) uses the capture screenshots + a Chrome live grown-bar crop. Off-screen WebKit does
not fire `requestAnimationFrame` (no display link), so the probe's settle waits use `setTimeout` + a forced
reflow that re-samples the scroll-driven timeline.

## The criteria, read against COMPUTED truth (GLOBAL rail · both engines · both modes · every route)

| criterion | Chrome (Metal) | WebKit (Safari 26 / Metal) | verdict |
|---|---|---|---|
| **`animationTimeline !== 'auto'`** | computed `scroll()` on every route, both modes (the D5 `auto` defect ABSENT) | computed `scroll()` on every route, both modes | **PASS** |
| **a real ScrollTimeline drives it** | `getAnimations()` → `gl-scroll-grow` on a `ScrollTimeline`, `playState:running` at scroll-top | `getAnimations()` → `ScrollTimeline`, `running` | **PASS** |
| **`scaleX(0)` at scroll-top** | `transform: matrix(0,0,0,1,0,0)`, bbox width **0 px** every route/mode | `matrix(0,0,0,1,0,0)`, bbox **0 px** | **PASS** |
| **GROWS via `currentTime`** | `currentTime` **0% → 44.98% → 100%** as the scroller goes top→45%→bottom | **0% → 44.97% → 100%** | **PASS** |
| **bbox-width delta de-confounded** | bbox **0 → ~578 px** at 45% scroll while `offsetWidth` stays **1285 px** (unchanged) → the delta is PURE `scaleX`, not a reflow | bbox **0 → ~578 px**, `offsetWidth` **1285** constant | **PASS** |
| **holds full at the exact page bottom** | bbox **1285 px** (`matrix(1,…)`) at `ct=100%` — the bar is full at the bottom, no blink-empty | bbox **1285 px** (`matrix(1,…)`) at `ct=100%` | **PASS** |

The `~578 px` at 45% is exactly `0.45 × 1285` — the rendered width tracks the scroll fraction linearly,
de-confounded against the constant `offsetWidth`. ZERO route/mode/engine deviates.

## The genuine NAMED cross-element case (`/motion/scroll-vt`, the `timeline-scope: --sp` demo)

The wave's specific claim — a consumer needing a named cross-element timeline writes the WHOLE value
(`--scroll-progress-timeline: --sp` + `timeline-scope` on a common ancestor), NEVER a `scroll(var(...))`
fragment — is verified on the second bar:

| dimension | Chrome | WebKit | verdict |
|---|---|---|---|
| `animation-timeline` computed | `--sp` (NOT `auto`) | `--sp` | **PASS** |
| ScrollTimeline drives it | yes, `gl-scroll-grow` | yes | **PASS** |
| `scaleX(0)` at top | bbox **0 px** | bbox **0 px** | **PASS** |
| grows at mid | bbox **0 → 574.66 px** (45%) | **0 → 579.02 px** | **PASS** |
| `currentTime` advances | **0% → 44.79% → 100%** | **0% → 45.13% → 100%** | **PASS** |
| `offsetWidth` constant | 1283 px constant | 1283 px constant | **PASS** |

## Observation (non-blocking, NOT a defect) — the named DEMO bar at the mathematically-exact 100% in Chrome

At `ct` **exactly** 100% (`playState:finished`), the shared recipe's `animation: gl-scroll-grow auto
linear` carries `animation-fill-mode: none`, so the after-phase value is not held → the bar reverts to its
`scaleX(0)` base. On the **GLOBAL rail this does NOT happen — it holds `scaleX(1)` at the bottom in BOTH
engines** (the scroller lands a hair under the boundary in the active phase). The NAMED demo bar reverts
**only in Chrome, only at the pixel-exact 100%** (WebKit holds `scaleX(1)`, bbox 1283). This is a known
engine-specific scroll-driven fill-mode edge on the inner 256 px demo panel, sub-perceptual (the bar is
full through ~99.x% of travel), and it does NOT touch the global rail the wave's criteria are about.
Optional future hardening for the orchestrator (NOT required to ship this wave): `animation-fill-mode:
forwards` (or `both`) on the `.scroll-progress` recipe would pin the bar full at the exact boundary on both
engines. Recorded transparently; this judge does NOT block on it.

## Per-route paint read (capture mode — route paints + bar at rest; both engines, both modes)

| route | bars | Chrome | WebKit | read |
|---|---|---|---|---|
| `/foundations/intro` | 1 GLOBAL | ✓ L+D | ✓ L+D | `ℱ glass-ui` hero fits; recessive pastel/near-black aurora; bar invisible at rest (scaleX0) |
| `/forms` | 1 GLOBAL | ✓ L+D | ✓ L+D | forms specimen cards; grain calm; bar at rest |
| `/dock/overview` | 1 GLOBAL | ✓ L+D | ✓ L+D | glass dock walkthrough over DockStage aurora; bar at rest |
| `/substrates/aurora` | 1 GLOBAL | ✓ L+D | ✓ L+D | **keystone** — `Aurora` hero fits; recessive painterly field (NO conic/oversat); Aurora Studio violet masthead; configurator + PRESETS; bar at rest |
| `/motion/scroll-vt` | 2 (GLOBAL + NAMED) | ✓ L+D | ✓ L+D | named-timeline demo route; `scroll()`/`view()` capability LIVE; both bars at rest |

The Chrome live grown-bar crop (`sp-chrome-grown-forms-light.png`) shows the rail painted as a thin
warm-ink hairline filling the left ~45% of the content column (ends at x≈700 = 120 + 0.45×1285) — the
pixel matches the computed bbox 578.

## Provenance + on-disk evidence (`scroll-progress-pipeline/`)

30 PNGs, all resolve, badge-decoded:
- **Chrome capture** `@1x` 1440×900: `sp-chrome-{foundations-intro,forms,dock-overview,substrates-aurora,motion-scroll-vt}-{light,dark}.png` (badge `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`).
- **Chrome grown-bar** `@1x` 1440×90: `sp-chrome-grown-{…}-{light,dark}.png` (the rail painted at ~45%).
- **WebKit capture** `@2x` 2880×1800: `sp-safari-{…}-{light,dark}.png` (badge `ENGINE WEBKIT · GPU Apple GPU`, NO `Version/` token → system WebKit.framework / Metal).
- **Computed probes:** `sp-chrome-live-results.json` + `sp-webkit-live-results.json` (the full live matrix — every bar's top/mid/bottom measure, `animationTimeline`, `currentTime` series, `offsetWidth`, the de-confound), `sp-chrome-results.json` (capture-mode rest-state confirmation).

Engine badges read at full resolution: Chrome `ENGINE CHROME / GPU ANGLE Metal Renderer: Apple M5 Max /
VIEW 1440×900 @1x / MODE LIGHT|DARK`; WebKit `ENGINE WEBKIT / GPU Apple GPU / VIEW 1440×900 @2x
(2880×1800px) / MODE LIGHT|DARK`. The bytes carry which engine produced which capture — the judge does not
take the capturer's word.

## Pipeline / fences

BUILT bytes: `npm run demo:dist:build` (fresh, 1.18 s) → `demo:dist:serve` vite preview `:5200`. Freshness
proven in the served CSS (the wave's recipe present — `scroll-progress-timeline` + `gl-scroll-grow`
keyframe; the retired `scroll(var(` fragment ABSENT, 0 occurrences). Siblings-intact `--quiet` exit 0
confirmed BEFORE and AFTER. The WKWebView + CDP probe binaries compiled to session scratchpad (not bare
`/tmp`). Operated only under `/Users/mkbabb/Programming/glass-ui`; edited only this DELTA + the PNGs/JSONs
under `…/audit/visual/scroll-progress-pipeline/` + the `EXECUTION-PROGRESS.md` cursor flip. My Chrome +
serve killed on done.
