# AX.W56 — squircle design-language (G3, foundational) · live-capture DELTA

The owed-DELTA for the one honest `dev-landed · live-pending (DELTA owed)`
holdout. The squircle SHIPPED at source — `theme.css:81-108` mints the
`--corner-shape-*` token axis (`--corner-k-squircle: 2`, the `superellipse(2)`
n=4 superellipse); `glass/squircle.css:38-44` couples it onto the overlay-band
glass (`.glass-floating.rounded-dialog` + `.glass-floating.sheet-animate`) and
`dock/shell.css:309-311` onto the big-dock card shell
(`.glass-dock.variant-dock:not(.vertical).shape-card`), all under `@supports
(corner-shape: superellipse(2))`. No pixel was ever captured. This pays the debt.

Captured 2026-06-10 against the running demo (`localhost:5199`) on the
chromium-148 engine (Chrome 148-class, `corner-shape` supported) via the π-lane
Playwright (`tests-visual/_wdelta0-capture.spec.ts`, a one-shot generator — the
evidence is the `.png` + this DELTA + the readback).

## Surfaces × viewports × schemes (12 screenshots)

| Surface | route | desktop·light | desktop·dark | mobile·light | mobile·dark |
|---------|-------|:---:|:---:|:---:|:---:|
| Dialog modal (`--corner-shape-dialog`) | `/containers/dialog` | `W56-dialog-desktop-light.png` | `W56-dialog-desktop-dark.png` | `W56-dialog-mobile-light.png` | `W56-dialog-mobile-dark.png` |
| Sheet side-drawer (`--corner-shape-sheet`) | `/containers/sheet` | `W56-sheet-desktop-light.png` | `W56-sheet-desktop-dark.png` | `W56-sheet-mobile-light.png` | `W56-sheet-mobile-dark.png` |
| Big-dock card shell (`--corner-shape-bigdock`) | `/dock/overview` (shape="card") | `W56-bigdock-desktop-light.png` | `W56-bigdock-desktop-dark.png` | `W56-bigdock-mobile-light.png` | `W56-bigdock-mobile-dark.png` |

## The paired-π cornerShape readback (`W56-readback.json`) — the binding truth

A squircle is imperceptible at a small radius, so the SCREENSHOT alone is
insufficient; the resolved `corner-shape` is the binding proof. On the Chrome-148
engine (`CSS.supports('corner-shape','superellipse(2)') === true`):

| Surface | `getComputedStyle(el).cornerShape` | policy | verdict |
|---------|-----------------------------------|--------|---------|
| Dialog (`.glass-floating.rounded-dialog`) | `squircle` (= `superellipse(2)`) | squircle | SQUIRCLE ✓ |
| Sheet (`.glass-floating.sheet-animate`) | `squircle` | squircle | SQUIRCLE ✓ |
| Big-dock (`.glass-dock.shape-card`) | `squircle` | squircle | SQUIRCLE ✓ |
| Card (`.glass-card`) | `round` | round | leak-free ✓ |
| Pill (`.glass-dock.shape-pill`) | `round` | round | leak-free ✓ |
| Panel (`--corner-shape-panel`) | `round` (theme.css) | round | leak-free ✓ |

The CSS engine reports the `squircle` keyword (the canonical name for
`superellipse(2)`) in the computed style — the policy paints. The card/pill/panel
control surfaces resolve `round` on the same engine: the W56 "cards/pills/panels
stay round; dialog/sheet/big-dock → superellipse" policy is leak-free.

The cross-engine contract (BEFORE / a Safari-Firefox fallback engine): the same
surfaces resolve `round` (the `border-radius` round CONTRACT the `@supports` gate
sits over) — the squircle is the better TIER, not a degraded fallback.

## Visual verdict

**PASS.** The squircle corner-shape token axis is live on the dialog, sheet, and
big-dock card shell — each resolving `superellipse(2)` on a Chrome-148 engine, and
each falling back to `round` cleanly off the supporting engine. The card / pill /
panel surfaces stay `round` by policy (the re-home canary). The foundational G3
holdout is discharged: the readback is the binding proof the squircle paints, the
screenshots corroborate the modal/sheet/dock surfaces render their iOS-26 idiom in
both schemes at both viewports.
