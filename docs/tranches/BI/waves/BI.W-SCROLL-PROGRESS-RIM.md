# BI.W-SCROLL-PROGRESS-RIM — the dock-rim scroll progress: rainbow, thinner, rounded (UF-D1)

## Mandate
UF-D1 (verbatim): "The scrolling progressbar needs a great deal of refinement, should be rainbow,
thinner, and rounded." ss-02: the current read is a chunky flat gray band on the vertical dock rim.

## Design
The dock-rim scroll progress re-expresses on the BorderProgress masked-band mechanism (the ONE
radius-following band register — never border-image, per geometry Law 3): `coverage` follows the dock
edge, the band width drops to the thin rung (~3-4px, ≤ the 10-14px card envelope's floor — a RIM
indicator, not a card chrome), the fill walks the brand spectrum OKLCH/shorter (the spectrum walk PROMOTED to the shared /color home per the round-4 BI-AUD5-03 reconcile — the dock rim consumes /color directly, keeping border-progress at 0 binary consumers so its retire wave stands — "rainbow" = the section-color ramp, staying in the warm identity), and the band inherits the
dock plate's radius (rounded by construction on the masked band). The demo passes the spectrum config
(presets-in-consumers). Coordinates with B3 (the greenfield dock's plate is the host; this wave binds
AFTER W-DOCK-SPINE lands the plate) and B1 Law 3.

## Acceptance — `proof:dock-progress-rim` (born-RED)
(a) the band is the masked-band mechanism (no border-image, no floating bar); (b) width within the
thin rung; (c) the fill resolves ≥4 distinct ramp hues across 0→100% (the rainbow walk); (d) radius-
following at the dock corners (the Law-3 corner probe); + self-test bites.

## π/DELTA
The scrolled-route capture pair (0%/50%/100%) on the vertical + horizontal dock, both modes, both
engines — the thin rounded rainbow rim reads against ss-02's gray band as the ground.

Band: B3-adjacent (authored under B1 Law-3; LANDS after BI.W-DOCK-SPINE provides the plate host —
the round-4 BI-DAG-05 sequencing edge made explicit).


## Work addendum (R5-C-03 — the /color promotion is OWNED here)
Move `composables/spectrum-walk.ts` (the value.js-bearing OKLCH/shorter walk) from border-progress
to the shared `/color` leaf (its natural home beside `cssToOklch`), preserving the dynamic-import
boundary; re-point border-progress's internal import to /color (it remains a consumer of the shared
leaf, still 0 binary consumers of the border-progress PACKAGE — the retire wave stands); the dock rim
consumes /color directly. This wave OWNS that move; GLASS-TOKEN-PRUNE and BORDER-PROGRESS-RETIRE cite it.

## §Inbound acceptance constraints (the 2026-07-12 marking pass — value.js U-F30 mixColors coupling)

The spectrum-walk this wave PROMOTES to `/color` is the constellation's ONE direct raw-channel
reader of value.js `mixColors`/`sampleColorRamp` (u-formation §1: `spectrum-walk.ts:22,58,90` reads
RAW OKLCH channels, tuned to the CURRENT normalized-in/hue-in-turns convention — a value.js
convention change would silently shift the spectrum with zero born-RED). Constraints:
- The promoted `/color` home KEEPS the raw-read site SINGULAR + carries the coupling marker comment
  (the `:30` convention attestation moves with the code) so the U-F77 co-land re-enumeration finds it.
- HOLD posture: value.js PREFERS the invariant-preserving toString-only fix (raw convention held —
  no action lands here); IF a convention change ships instead, the spectrum-walk co-migrates in the
  SAME window (U-F77 ordering) — the roster row (asks-and-consumes §U-F30 watch) is the trigger.
- Oracle at the value.js cut: the border-progress/scroll-rim spectrum renders byte-identical
  before/after, OR the co-migration lands in-window.
