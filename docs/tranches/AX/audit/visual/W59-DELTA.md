# AX.W59 — slider redesign · live-capture DELTA

The two-recipe slider redesign (the user's spec: a default integrated-cylinder
glass slider + a spectrum squircle-thumb gradient slider). Owed-DELTA backfill,
captured 2026-06-09 against `localhost:5173/primitives/slider` on chromium.

## Captures

| viewport | light | dark |
|----------|-------|------|
| desktop 1280 | `W59-slider-desktop-light.png` | `W59-slider-desktop-dark.png` |

## Verdict

**PASS — exactly the user spec.** The **STANDARD** variant is a continuous
integrated cylinder: the thumb is the filled track's leading CAP (a pill radius,
track-height, no floating disc, no visible demarcation between thumb and fill) —
"like pulling left or right a continuous rounded cylinder." The **SPECTRUM** variant
is the gradient (red→purple→blue) track with a **squircle thumb at track-height**
(the rounded-square, not a circle, the height of the track). Both render across the
SM/MD/LG size matrix + a two-thumb range. `proof:slider-two-only` (the two-only
cardinality + the cylinder-cap / squircle-spectrum design lock) green.
