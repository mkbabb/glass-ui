# VERDICT — #39 π-cure round I (driver adjudication, 2026-08-07)

**Adjudicator:** the driver (Fable). The dispatched Fable adjudicator seat failed on a
Fable usage limit before writing; the driver read both challenger reports in full from the
workflow journal and verified the disputed claims against the cited sites and figures.
**Ruling: CURE-MORE.** The cure is not landable as written.

## What stands (need not be redone)

- The two-row root diagnosis and the region-as-remainder grammar: the 923 → 879 delta is
  genuine at every measured rung, `elementFromPoint` identity restored on the measured
  cells, overflow-past-content-box 0. Both challengers confirm the direction.
- CURE-P7's size-freeze (constant 1438-px-class extent) is paint-identical (RMSE 0.00422
  vs 0.00357 noise floor) and adds no compositor surface (paint challenger item 9).
- P2 plate lerp exact on both arms (light 0.190→0.220 = 0.18+0.04t; dark 0.230→0.260).
  Grip lerp exact (32+20t / 0.45+0.2t). ✕ gutter reservation intact. The
  `:not([data-detents])` fence on the side-region rule is load-bearing and correct.
- The verify battery, the three new mutations (Y1/Y2/Y3, all bite), G-SHEET-REACH 9→11.
- RT-39D (foreign `package.json`/lock mismatch blocking `npm run build` at closeBundle —
  #40 W-CAROUSEL's uncommitted peer removal) — correctly named foreign, stands routed.

## Confirmed defects → CURE ROUND II (all outcome-changing)

**R2-1 · THE CLAMP IS A MASK; the region must FIT, not clip** (geometry findings 1/2/4/5,
paint finding 10). `overflow: hidden` + `align-content: end` makes P1's measured bar pass
unconditionally — including with the footer 0% visible — so the bar no longer
discriminates. At the shipped 0.12 peek the primary action is 45% clipped (22 of 40px,
hard cut through "Done" in the seat's own artefact); identity survives by 2.0px on the
emulated 900 viewport and fails on real desktop `innerHeight ≈ 780` (19% paints); below
t ≈ 0.072 the original 923 returns digit-for-digit. Cure by ruling: **a resting rung can
never be smaller than the smallest honest sheet.** Floor the detented root's block-size at
the chrome minimum (handle + footer natural block + gaps + padding + borders, in tokens,
no magic numbers) so every RESTING rung paints the action whole and hit-testable on REAL
viewports; `0` stays legal as the dismissal endpoint — transit below the floor rides the
EXIT arm (the slide unmount), never a shrinking clipped box. The born-RED case must
measure a real-viewport cell (innerHeight 780-class), not only the 900 emulation.

**R2-2 · The yield order is backwards against its own comment** (geometry finding 3).
"A short rung loses the CROWN, never the action" — but the `1fr` body yields first and
wholly: at the demo's own t=0.25 rung the body is 0px and none of the content rows render
(pre-cure it had 21.58px). The grammar must make the header yield before the body loses
its minimum, or the design statement must change to the truth; either way t=0.25 must
paint body content, gated by a case asserting body > 0 at 0.25 and header → 0 before
body → 0.

**R2-3 · The `scroll` prop is silently dead on the detented arm** (geometry finding 6).
The cure's `overflow: hidden` (same 0,0,0 specificity, later in source) beats
`[data-scroll] > region { overflow-y: auto }`. Restore the scroll arm; no unreachable
block-start overflow may exist on it.

**R2-4 · Specificity and physicality doctrine breaches, cure-caused** (geometry findings
7/9, paint finding 6). The four new halo child rules compute (0,1,0) and ship layout —
the file's own header promises (0,0,0) everywhere so consumer utilities win. And the cure
releases LOGICAL insets on a box whose side names, ramp directions, and placements are all
PHYSICAL: under `direction: rtl` the ramp anchors ±865px off its edge and the crown
flattens to full-depth across the visible sheet. Wrap the child compounds fully in
`:where()`; use physical `top/right/bottom/left` per side, per the file's lines 24–26.

**R2-5 · THE MATERIAL IS DEAD IN PAINT — the headline** (paint finding 5; pre-existing,
corroborated by π-39's own artefact). The halo's `backdrop-filter: blur(34px)
saturate(1.5)` lands NOTHING: stripe-amplitude stays 85–93 flat across the 120px depth on
all measured edges where the identical recipe in a plain container ramps 105 → 3.4. What
paints is a masked gradient tint. Computed style is honest; paint is not — the exact
defect class this tranche exists to kill, and P3 as worded cannot see it. ISOLATE the
killer (the recipe works in isolation, so it is contextual: candidate interactions are the
mask × backdrop-filter × the root's `contain: paint` stacking scope; `z-index: 0`,
`contain: none`, `isolation: auto` were each tried and failed — start past those) and make
the graded crown→frost REAL in paint, measured by the stripe-amplitude method (ramp must
descend monotonically to the full-depth figure). If isolation proves the engine cannot
composite it in this context, the honest close is to remove the dead filter and re-state
the material as gradient-tint-only in RECORD + P3 re-worded to measure PAINT (stripe
method), never computed style — no fallback that fakes frost. The lab evidence says try
the cure first.

**R2-6 · The P7 evidentiary standard was wrong and its record claim is false** (paint
finding 2, geometry finding 8). The "no headroom" claim is refuted: the knee sits at ~11
halo-equivalents (N=10 → 98.04, N=12 → 32.79) — the probe was GPU-blind below that, and
the blur(200px) control supports the opposite conclusion. Strike the claim. P7's verdict
method for this cell: bias the session with ~10 halo-equivalents, then A/B cured vs
pre-cure vs no-halo arms — or a session that reproduces the 60Hz-class differential
(RT-39C stands). Also strike the "geometry is invariant" comment: the box translates
810px across the rung range (top 811 → 1); only the SIZE is constant, and if the material
returns (R2-5), a translating sample is re-derived per frame — the sampler must hold
constant SCREEN-space geometry (e.g. viewport-band sampler with the moving reveal on the
cheap mask channel), or the record must carry the honest cost.

**R2-7 · Record and PI honesty** (both challengers). Strike RECORD §10.5 "the action and
the ✕ both whole and hit-testable" (the ✕ is; the action is not, pre-R2). Strike/qualify
PI-39.md §0's "identity true at every rung of both ladders and both viewports" — the
390×844 live-behind ladder was never measured; measure it this round. Divergence notes:
brief's 0.18→0.22 is the light arm (holds exactly); dark arm 0.22→0.26.

## Watch items routed, not this round's

- Inline axis on side sheets: earlier footer actions can clip unreachably inline-start
  (geometry finding 13 caveat) — rides with the sheet family's next π.
- Browser-seat singleton breach observed live: a foreign tab (`:5400/data/sortable-list`)
  seized the MCP selection twice mid-measurement — reaffirmed: ONE browser-owning seat,
  guard every figure by `location.port`.
- RT-39C (P7 differential cell) and RT-39D (foreign build blocker) stand as routed.
