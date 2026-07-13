# W-DRAW-IN — the sheet-header divider draws in NO-OVERSHOOT (DELTA)

**Discharges UF-G6** ("refined drawing animations … codify this to not be ad-hoc …
the divider draw-in is a bit too bouncy. Needs smoothing.") + SUFFUSION-MAP R21.

## Before → after

| | HEAD (born-RED) | BI.W-DRAW-IN (GREEN) |
|-|-----------------|----------------------|
| law | ad-hoc, per-surface | ONE codified register — `.draw-rule` / `[data-draw-in]` (`src/styles/draw-in.css`) |
| masthead divider ease | `--ease-cartoon-punch` (+22% overshoot — a spring) | `--ease-out-expo` (no-overshoot arrival — NOT a spring) |
| masthead divider keyframe | demo-local `@keyframes chrome-rule-strike` | the shared `@keyframes draw-rule-in` (retired the fork, clean break) |
| clock | hardcoded `520ms` | `--draw-in-duration = calc(0.52s * var(--motion-tempo))` (tempo co-scaled) |
| gate proxy | `@supports (animation-timeline: scroll())` stood in for "the ease token has landed" | dropped — the ease token ships; the strike fires under no-preference on all engines |

At tempo 1.0 the strike CLOCK is byte-identical to the retired `520ms` — only the
ARRIVAL curve changes (cartoon-punch → expo). The +22% overshoot is gone: a rule
drawing ITSELF never overshoots past full width; the expo deceleration lands `scaleX`
exactly on 1 and holds.

## The visual truth (the π the frame-series binds)

- **The masthead divider draws in NO-OVERSHOOT** — the `scaleX` 0→1 sweeps left→right
  on the expo deceleration and arrives at full width with no bounce-past-and-back (the
  "too bouncy" jitter dead). Chrome + Safari, both modes.
- **PRM / gap engine** — the base `::after` rule paints `scaleX(1)` at rest; the strike
  engages only under `prefers-reduced-motion: no-preference`, so under reduce (and on a
  timeline-gap engine) the rule reads full-width statically, zero motion frames.

The binding frame-series (`scaleX` 0→1 arriving without overshoot, both engines, both
modes) rides the tranche `--run pi` close ceremony (W-PI-IN-CLOSE); this device-free
DELTA + `proof:draw-in` (D1–D6 + a 5-bite self-test) are the source-level truth.

## Register members (the ≥2-consumer evidence)

Roster: `docs/tranches/BI/audit/W-DRAW-IN-REGISTER.md` — the masthead divider (the
re-pointed ad-hoc rule) + CompletionSeal (`--seal-draw` stroke-dashoffset wipe) +
HandMark (`draw-on`). The register NAMES the shared no-overshoot arrival law; the two
hero-scale members keep their OWN recipes (not re-authored).
