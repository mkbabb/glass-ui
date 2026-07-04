# BG.W-DOCK-PANE-OVERLAP — dual-engine paint judge DELTA

> **Role:** fresh NON-AUTHORING paint judge (did not build this wave). Verifies the PAINTED
> truth of the DockLayerGroup pane-swap OVERLAPPED-crossfade against IOS27-MOTION-TRUTH
> §2.2/§4.5, never the builder's claim.
> **Wave:** `BG.W-DOCK-PANE-OVERLAP` (F3.R2) · **Route:** `/dock/layers`
> **Date:** 2026-07-04 · **Engines:** Chrome CDP (real Chrome 149 / ANGLE Metal, Apple M5
> Max) + Safari off-screen WKWebView (system WebKit.framework / Metal) · **Modes:** light + dark
> **Fence honored:** operated ONLY under `/Users/mkbabb/Programming/glass-ui`; zero
> `src`/`demo`/`styles`/`scripts` edits (defect RECORDED, not patched); no `/tmp` PNG/DELTA
> output; no sibling under `~/Programming` touched. `verify-siblings-intact.mjs --quiet` exit
> 0 before + after.

## VERDICT: **FAIL** — the OVERLAPPED CROSSFADE is fixed; the BOX FLIP is NOT (worse than HEAD)

The opacity crossfade re-author LANDED and is correct. But the criteria's box-FLIP clause
("box FLIP interpolates MONOTONICALLY between PRE-measured endpoints … `min(A,B)−ε ≤ box(t)
≤ max(A,B)+overshoot` — HEAD dips below both endpoints") is **NOT met**: a pure LAYER SWAP
on an already-expanded dock makes the VISIBLE plate box **collapse to the 53.68px pill (≈20%
of the ~269px rest) then re-expand** — a dip FAR BELOW both pane endpoints, the SAME §2.2
defect class HEAD had, made MORE extreme (a full collapse-to-pill, not a partial
shrink-wrap). Reproduced in BOTH engines' shared spring/CSS logic and confirmed on real
Metal in Chrome, both modes, on a fresh page with a single trusted click — AND in
NON-capture mode (not a `?capture` artifact).

| criterion (§2.2/§4.5) | light standalone-rail | light nested | dark standalone-rail | dark nested | verdict |
|---|---|---|---|---|---|
| **P1** entering engages by t≈0.15, ramps UP | PASS | PASS | PASS | PASS | ✅ |
| **P2** leaving persists to t≈0.6, ramps DOWN | PASS | PASS | PASS | PASS | ✅ |
| **CO** co-presence (both >0.3 alpha) | PASS (3 frames) | PASS | PASS | PASS | ✅ |
| **DZ** no neither-<0.3 dead-zone | PASS (0 dead frames) | PASS | PASS | PASS | ✅ |
| **SWAP** overlapped handoff (enter 0.5 while leave >0.05) | PASS | PASS | PASS | PASS | ✅ |
| **P3** box FLIP no dip below endpoints | **FAIL** | **FAIL** | **FAIL** | **FAIL** | ❌ |
| **EXPANDT** no spurious collapse on swap | **FAIL** | **FAIL** | **FAIL** | **FAIL** | ❌ |

**P3 numbers (identical across cases/modes):** rest plate 269.12px → **min 53.68px** during
swap (**dipRatioOfRest 0.199**, 31 dip frames) → back to 269.12px. **EXPANDT:**
`preExpanded=true` (`--dock-expand-t`=1 at rest) yet `--dock-expand-t` cycles to **0** during
the swap → the `--dock-live` convex blend collapses to the 44px collapsed endpoint.

## The crossfade truth (the part that PASSES)

The overlapped-opacity re-author is genuinely correct. Measured per-frame off `--dock-morph-t`
(Chrome, on-screen Metal, 60fps), the entering `.is-active` and leaving `.is-leaving` panes
are co-present through the swap (light standalone-rail):

| t | entering opacity | leaving opacity |
|---|---|---|
| 0.14 | 0.00 | 0.76 |
| 0.23 | 0.16–0.25 | 0.55–0.62 |
| 0.31 | 0.32 | 0.47–0.48 |
| 0.36 | 0.42 | 0.40 |
| 0.41 | 0.51 | 0.32 |
| 0.50 | 0.70 | 0.17 |
| 0.58 | 0.87 | 0.03 |

Entering engages by t≈0.15, leaving persists to t≈0.6, three frames with BOTH >0.3 alpha,
NO window where neither reads ≥0.3 — the sequential-out→blank→in dead-zone and the
double-exposure ghost §2.2 named are CLOSED on the OPACITY axis. The three source CSS rules
are present in both modes (`hasOverlapRule`, `hasEnterRule`, `hasReserveRule` all true).

## The box-FLIP defect (the part that FAILS)

The visible dock PLATE box trajectory on a single LAYER SWAP (tab 0 → tab 1, dock already
expanded, `--dock-expand-t`=1 at rest), Chrome on-screen Metal:

| t | plateW (px) | --dock-expand-t | note |
|---|---|---|---|
| 0.00 | **53.68** | 0.00 | collapsed to the PILL — the dip |
| 0.07 | 74.1 | 0.07 | re-growing |
| 0.23 | 116.5 | 0.23 | |
| 0.41 | 165.5 | 0.41 | |
| 0.58 | 175.7 | 0.58 | |
| 0.74 | 210.3 | 0.74 | |
| 0.91 | 249.8 | 0.91 | |
| 1.00 | 269.1 | 1.00 | back to rest |

The plate does NOT glide monotonically between the two pane endpoints (both ≈212–269px). It
**collapses to the 53.68px collapsed-pill footprint at swap onset, then re-expands** — the
§2.2 "box dips below both endpoints" defect, more severe (a full collapse rather than a
shrink-wrap through a near-empty pane). Even the `always-expanded` rail-group dock does it.

## defectLocalization

**Root cause — the layer swap shares the COLLAPSE/EXPAND box driver.** On `/dock/layers` EVERY
DockLayerGroup is NESTED inside a `<GlassDock>` (structure probe: `standaloneGroupCount: 0`
in both modes), so the box is owned by the ORCHESTRATOR `dockMorphContext`, NOT by
`useLayerTransition`'s standalone reserve/clip-reveal (which is correctly absent here — the
builder's P3 claim about `--dock-stack-morph-reserve` applies only to a standalone group,
which this route never exercises).

`src/components/custom/dock/composables/dockMorphContext.ts` — `onSwap()` (≈line 222) delegates
the box to `ensureSpringRunning()` (≈line 184), which:
1. `r.style.setProperty("--dock-morph-t", "0")` — seats the scalar at 0 SYNCHRONOUSLY (the
   comment: *"reads 0 (the collapsed footprint), eliminating a 1-frame endpoint-flash"*), then
2. springs `--dock-morph-t` 0→1.

`--dock-morph-t: 0` is the **collapsed** endpoint of the COLLAPSE/EXPAND axis, not a
layer-swap endpoint. `src/styles/dock/morph.css` derives `--dock-expand-t: var(--dock-morph-t)`
on the `.expanded[data-morphing]` arm, and `src/styles/dock/layers.css` `.glass-dock[data-morphing]`
reads `--dock-live = collapsed + (expanded − collapsed)·clamp(0, --dock-expand-t, 1)`. So on a
LAYER SWAP the box plays the full 44px→269px collapse→expand animation — a spurious box
collapse the pane crossfade never asked for. `onSwap` (a pane A→B crossfade) and the
collapse/expand box morph must NOT share the same `--dock-morph-t: 0` seat.

The `?capture` mode is NOT implicated — the defect reproduces identically in NORMAL demo mode
(`/dock/layers` plain route, single trusted click).

## mustFix[]

1. **A LAYER SWAP on an already-expanded nested dock must NOT collapse the plate box.** On
   `onSwap` (pane crossfade), the box must hold its current expanded footprint (or FLIP
   monotonically between the from-pane box and the to-pane box) — it must NOT seat
   `--dock-morph-t`/`--dock-expand-t` at the collapsed 0 endpoint. Decouple the layer-swap
   crossfade scalar from the collapse/expand box scalar, OR gate the `--dock-morph-t: 0` seat
   to genuine collapse/expand transitions only (never a same-expand-state layer swap).
2. **Per-frame box invariant on the layer-swap path:** `min(A,B) − ε ≤ plateW(t) ≤ max(A,B) +
   overshoot`, where A = from-pane box, B = to-pane box (both ≈212–269px on this route). The
   plate must never dip toward the 44px/53px collapsed-pill footprint during a pane swap. The
   binding re-judge is the π frame-series here (born-RED on the current dip to 53.68px).
3. **Preserve the PASSING opacity crossfade** — P1/P2/CO/DZ/SWAP are correct and must stay
   green; the fix is on the BOX axis only.
4. **Re-verify BOTH nested cases** (`dock-layer-rail-group` always-expanded +
   `dock-nested-collapsible-group` collapsible) in BOTH engines + BOTH modes. (Both fail
   identically at HEAD.)

## Method (reproducible)

```
# 0 · siblings tripwire (before + after) — exit 0
node scripts/verify-siblings-intact.mjs --quiet
# 1 · BUILT demo dist on :5200
npm run demo:dist:build && npm run demo:dist:serve
# 2 · Chrome CDP frame-series (real on-screen Metal, 60fps trusted clicks) — the BINDING measure
"/Applications/Google Chrome.app/…/Google Chrome" --remote-debugging-port=9466 --user-data-dir=<profile> about:blank &
node docs/tranches/BG/audit/visual/BG.W-DOCK-PANE-OVERLAP-chrome-capture.mjs   # → chrome-frameseries.json + PNGs
node docs/tranches/BG/audit/visual/BG.W-DOCK-PANE-OVERLAP-verdict.mjs          # → verdict.json (P1..P3/CO/DZ/SWAP/EXPANDT)
# 3 · Safari off-screen WKWebView settled captures (both modes) — provenance + settled paint
clang -framework Cocoa -framework WebKit -fobjc-arc docs/tranches/BG/audit/wkshot-live.m -o <bin>
<bin> "http://localhost:5200/?capture=%2Fdock%2Flayers&mode=light" paneloverlap-layers-safari-light.png light 15000
<bin> "http://localhost:5200/?capture=%2Fdock%2Flayers&mode=dark"  paneloverlap-layers-safari-dark.png  dark  15000
```

**On the WebKit frame-series limit:** an off-screen WKWebView throttles/suspends `rAF`, so the
`SpringProgress`-driven `--dock-morph-t` glide freezes at 0 in off-screen WebKit — the
interactive frame-series is NOT measurable there (confirmed: `wkclick` staged reads show
`morphing:true` but `--dock-morph-t` stuck at 0). The BINDING computational box-FLIP truth is
therefore the Chrome CDP measurement (on-screen, real rAF/Metal, both modes); the WebKit leg
supplies the settled-paint provenance + the engine badge. The defect is engine-agnostic (the
same `dockMorphContext` spring + `morph.css`/`layers.css` CSS cascade), so the Chrome measure
is authoritative for the box behavior.

## Evidence on disk (`BG.W-DOCK-PANE-OVERLAP-paint/`)

| png | engine | mode | dims | real | body meanL / meanChroma |
|---|---|---|---|---|---|
| `paneloverlap-layers-chrome-light.png` | CHROME (CDP, ANGLE Metal M5 Max) | light | 2880×1800 | true | 0.798 / 0.078 |
| `paneloverlap-layers-chrome-dark.png` | CHROME | dark | 2880×1800 | true | 0.622 / 0.083 |
| `paneloverlap-layers-safari-light.png` | WEBKIT (off-screen WKWebView, Metal) | light | 2880×1800 | true | 0.882 / 0.055 |
| `paneloverlap-layers-safari-dark.png` | WEBKIT | dark | 2880×1800 | true | 0.546 / 0.063 |
| `paneloverlap-midswap-chrome-light.png` | CHROME (mid-swap) | light | 2880×1800 | true | 0.798 / 0.078 |
| `paneloverlap-midswap-chrome-dark.png` | CHROME (mid-swap) | dark | 2880×1800 | true | 0.622 / 0.082 |

Plus `chrome-frameseries.json` (raw per-frame series, both modes × both cases) and
`verdict.json` (the computed P1–P3/CO/DZ/SWAP/EXPANDT verdicts). All PNGs `isRealPng: true`,
2880×1800, mode-differentiated luminance, warm-cream/aurora chroma — decoded engine badge
(`ENGINE CHROME · GPU ANGLE Metal Renderer Apple M5 Max` / WEBKIT badge) reads provenance
FROM the pixels. The settled route renders correctly in BOTH engines (hero + blurb + aurora
DockStage field + both nav docks + all 5 DockLayerGroups); the box-FLIP defect is a swap-time
transient the settled captures do not show — the frame-series measures it.

## Fences honored

Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. No `/tmp` PNG/DELTA output. No
sibling under `~/Programming` touched/moved. Zero `src`/`demo`/`styles`/`scripts` edits (the
defect is RECORDED for a build-fix agent, not patched). `demo:dist:serve` + Chrome CDP killed
on completion. `verify-siblings-intact.mjs --quiet` exit 0 before AND after.
