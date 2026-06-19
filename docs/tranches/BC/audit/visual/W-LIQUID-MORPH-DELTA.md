# BC.W-LIQUID-MORPH — DELTA (the arbitrary-shape dock morph: NEVER white, NEVER invisible)

**Status:** SOURCE arm GREEN (`proof:liquid-morph` M1-M4 born-RED→GREEN; M5 the ship-decision DELTA
asserts its required fields). The PAINT arm + the **re-measured compositor-teardrop perf number** are
**pending-orchestrator-capture** — see §M5 below.

## What this wave landed (SOURCE) — three coordinated moves
The morph-WHITE root is a degenerate `scaleX(0)` / a zero-width reserved box (glass-dock-codebase.md
§2.2). This wave makes the white box impossible:

### 1. The defensive scale floor (the white box can never paint) — dock/layers.css
- **Reserve floor (M1):** `inline-size`/`block-size: max(var(--dock-morph-to), var(--dock-morph-min))`
  on BOTH axes (horizontal + vertical + the nested vertical group). A `to:0` mis-measure reserves the
  collapsed-pill minimum (~44px, the WCAG touch floor), never zero.
- **Scale floor (M2):** `--dock-morph-scale: max(<the calc>, 0.06)`. A degenerate ratio bottoms at a
  thin-but-VISIBLE glass sliver, never the zero-width white void. A real measurement is always well
  above 6%, so the floor is a SAFETY NET — inert on the healthy path, the gestalt of a healthy morph
  byte-unchanged.

### 2. The measure-failure guard (M3) — dockMorphContext.ts + dockMorphMeasure.ts
The synchronous rAF measurement now seats a `measuredTo === 0` (a mis-measure: a mid-morph re-grab, a
nested collapsible still pinned, a race the BA-VJS-1 ordering missed) at the resolved floor span
(`morphMinFloorPx` reads the element's `--dock-morph-min`, falling back to 44px) so the morph
interpolates toward a VISIBLE footprint, never 0 — "visible at the floor," NEVER "white." Inert on a
healthy measurement (`measuredTo > 0` keeps the real span). The BA-VJS-1 nested-`max-content` ordering
+ `DOCK_SPRING` are byte-untouched.

### 3. The teardrop bridge re-expressed COMPOSITOR-ONLY (M4) — dock/morph-bridge.css
The HEAD bridge animated `width`/`height` PER FRAME (the layout-jank perf-miss root, AZ arm-a). The
rewrite RESERVES each plate's MAX footprint (a one-time layout solve) and necks the silhouette via a
`clip-path: inset()` interpolated on `--dock-morph-t` + the `--stretch` squish — NEVER `width`/`height`.
The reflow storm is GONE; the CDP Layout track stays FLAT. The SVG-goo `feGaussianBlur`/`feColorMatrix`
merge (the deterministic M5 path) + the `--stretch` volume-preserving squish are KEPT.

| axis | HEAD | TARGET |
|---|---|---|
| reserve floor | `inline-size: var(--dock-morph-to)` (can be 0) | `max(..., --dock-morph-min)` (~44px WCAG floor) |
| scale floor | none (`scaleX(0)` possible) | `max(<calc>, 0.06)` |
| measure on `to:0` | reserves 0 → white | seats at floor → visible sliver |
| teardrop bridge | per-frame `width`/`height` (layout jank) | `clip-path` + `scale` (compositor) |

## §M5 — the ship decision (the AZ booking RESOLVED on a NUMBER) — pending-orchestrator-capture
The AZ verdict shipped the VT crossfade as default + booked the always-on teardrop because the
per-frame-`width` bridge missed the 4×-throttle budget (arm-a p50 ~13.7–15.1ms, NEVER 0% over 16.7ms).
BC's resolution: re-expressing the teardrop on the COMPOSITOR (clip-path/scale, M4 — zero per-frame
layout) is expected to drop the sustained p50 well under 12ms.

**The orchestrator MUST capture + record here, under the BINDING protocol:**
- **GPU:** _(pending — the Metal/ANGLE dev box, NOT headless SwiftShader)_
- **throttle factor:** _(pending — 4× CPU throttle)_
- **re-measured p50:** _(pending — the compositor-teardrop V↔H + collapse↔expand)_
- **over-16.7ms sustained frame count:** _(pending — the ship bar is p50 ≤ 12ms AND 0% sustained over
  16.7ms, the AZ carve allowing only the one-shot gesture-start layer-promotion/VT-snapshot frame)_
- **resulting default:** _(pending — if the compositor-teardrop clears the bar, the always-on teardrop
  SHIPS as the default arbitrary-shape morph, the AZ booking RESOLVED; if it still misses, the VT
  crossfade (p50 ≤ 8.1ms, the proven floor) stays the default + the compositor-teardrop is the
  perf-gated preview)_
- **the AZ born-RED ground:** arm-a (per-frame-`width` metaball-teardrop) p50 ~13.7–15.1ms, 2–3
  sustained frames over 16.7ms/run under the same 4×-throttle Metal protocol → it FELL to arm-c (VT
  crossfade, p50 v2h 7.7ms / h2v 8.1ms).

## PAINT arm — pending-orchestrator-capture
- **The per-frame composited-pixel assert (gif_creator):** across the V↔H morph + collapse↔expand on
  `/dock/morph-showcase` + `/dock/overview`, BOTH modes, INCLUDING a synthetic `to:0` worst-case (force
  the nested-group mis-measure). Every frame's plate region reads meanLum > 0 AND the glass silhouette
  is present — NEVER white, NEVER a zero-width void, NEVER a clipped blank.
- **The synthetic `to:0` worst-case:** the plate seats at the floor (a visible glass sliver), never white.
- **The four-cycle nested measurement:** `to ≥ a real span` every cycle, never 0.
- **The CDP Layout-track trace:** FLAT across the morph (the compositor-teardrop triggers zero per-frame
  layout — the MECHANISM proof of the M5 perf win).
- **WebKit:** the morph TRANSFORM (scale/clip-path/translate) is cross-engine — a continuous glass plate
  on WebKit, no white box (the WebGL-context flash is BC.W-SAFARI-WEBGL's scope).
- Live gates: `proof:liquid-morph` (live paint) · `proof:no-layout-animation` · `proof:dock-arbitrary`.

## Gates (SOURCE)
`proof:liquid-morph` GREEN (M1 reserve floor · M2 scale floor · M3 measure-failure guard · M4
compositor-teardrop · M5 the DELTA fields asserted) · `proof:no-layout-animation` LOCKED ·
`proof:dock-arbitrary` GREEN (A2 reserve floor shared) · `proof:dock-engine` GREEN (E4 reserve-floor
tolerated) · `proof:spring-tokens-synced` GREEN (`DOCK_SPRING` byte-frozen).
