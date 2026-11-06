# 10.1.5 — implement record (INBOUND O-129 rows 1, 2, 5, 6 and 7)

Branch `release/10.1.5` from tag `v10.1.4`, worktree `.claude/worktrees/release-10.1.5`.
Implementer: claude-opus-5-5. Not pushed, not tagged.

## The report

value.js reviewed glass 10.1.3 as served on color.babb.dev, keyframes.babb.dev and
fourier.babb.dev (relay `~/Programming/value.js/docs/tranches/X/coordination/O-129-glass-relay-2026-11-04.md`,
evidence `docs/tranches/X/evidence/0hm/`, `evidence/owner-2026-11-03/od1-od5-repro/`).
v10.1.4 has the same bytes in every file below. Rows 1 and 2 are O-123 OD-5 and OD-1
(and O-124 OD-5b); rows 5, 6 and 7 are new. Rows 3, 4 and 8 to 10 are out of this patch
(W-0.8 and W-I.1).

## Reproduction on v10.1.4

Harness `tests-visual/release-10-1-5/harness.ts` (scenes `dock`, `layers`, `slider`,
`type`, `menu`, imported relative to `src/` under the demo cascade), spec
`tests-visual/release-10-1-5.spec.ts`. The RED arm checks the nine cured `src/` files out
from `v10.1.4` inside the worktree and restores them on exit
(`docs/release-10.1.5/scripts/witness.sh`). Reads on v10.1.4, Chromium (WebKit 2287 the
same unless noted below):

- r1: a fit-content dock (a menu trigger and three seats) at rest reads `9999px` on all
  four plate corners and run 263/263 (coarse 390). With the pointer on the trailing
  seat (`scale: 1.1`) the run reads 265/263 (268/266 at 844, 259/257 at 1280) and the
  plate `50% | calc(48.08% + 0.62px) | calc(48.08% + 0.62px) | 50%`: the timeline is
  active and the rest keyframe is a per-axis percentage, an ellipse. A run that really
  overflows (12 seats at 390) rests its leading corners at `50%`.
- r2: collapsed, the plate is 56x56 and reads `50% | calc(0% + 16px) | calc(0% + 16px) |
  50%`; its hidden full pane scrolls 257/56.
- r5: at 50 of 50..800 the thumb box is 0x20, opacity 0, transparent, and the fill 0 px;
  at 6 of 1..6 the fill is the whole track and the thumb again 0 px wide.
- r6: at 390 coarse the `.input-bar` field and `--dropdown-text` are 21 px in a 54 px
  bar, against a CardDescription subtitle of 14.19 px (1.48x).
- r7: a DropdownMenuItem holding a lucide `Compass` and a span: icon right to label
  left is 0 px (`column-gap: normal`).

## Root causes (v10.1.4 lines)

- r1, the corner: `dock/styles/run.css` `.glass-dock { --dock-cap-rest: 50% }` and its
  docblock ("`50%` resolves to the stadium's own corner"). A percentage radius resolves
  against each axis.
- r1, the trigger: `run.css` `.glass-dock .dock-run` reserves the ring on the block axis
  only (`padding-block`), and a scroll container counts a transformed descendant's box
  as scrollable overflow. The hovered seat (`controls/icon-button.css` `scale:
  var(--scale-hover-dock)`, 1.1) overhangs its 44 px cell by 2.2 px at the trailing
  edge. At rest with the pointer off, the harness run reads no overflow, so the 2 px
  value.js read at rest is this hover (or value's own 1.07 press, r8) on its trailing
  seat, the class O-123 OD-5 named. Seat padding is not involved; the ring reserve was
  missing on the inline axis.
- r2: `run.css` names `scroll-timeline: --dock-run` on every `.dock-run`. The collapsed
  dock's full pane stays laid out (absolute, inset 0, `layers.css`), its run still
  scrolls, the trailing arm (reverse) holds the cut.
- r5: `slider/styles.css` `.slider-thumb { width: 0; opacity: 0 }` (the scrubber's
  invisible thumb) and a fill of `p x track` (reka's percentages on the track).
- r6: `tokens/light-dark.css` `@media (pointer: coarse) { --ui-scale: 1.5 }` multiplies
  into `--control-text: calc(var(--type-small) * var(--ui-scale))` (`tokens/sizing.css`),
  which `.input-bar-field`, `.input-pill`, `--dropdown-text` and `--search-result-text`
  read: 14 x 1.5 = 21 px.
- r7: `glass/overlay-plate.css` `.menu__item, .menu__sub-trigger` are flex rows with no
  `gap`.

## The cures

- **r1.** `--dock-cap-rest: calc(var(--dock-plate-cross-px) / 2)` on the pill, the form
  W-0.8 §3.3 states, so W-0.8 keeps it. `useDockExpandedSize` (`dockMorphMeasure.ts`)
  publishes `--dock-plate-cross-px` on the dock root from a ResizeObserver on the plate:
  the border box's block size (inline size on a vertical dock). It is layout, not paint
  (the morph's `scale` never reaches it), fractional, and delivered before the first
  paint. `.glass-dock.shape-pill .dock-plate { border-radius: var(--dock-cap-rest) }`, so
  a stadium that scrolls nothing paints the same length the keyframes rest at, not the
  box's 9999 px through the clamp. The false docblock is struck and now records why a
  length larger than the half extent is no cure (the clamp pins `9999px` until t≈1 and
  scales all four corners by one factor). The reach: the run's content-box reserve is
  `padding: var(--dock-run-reserve)` handed back by `margin: calc(-1 * …)` on both axes,
  with `--dock-run-reserve: max(var(--dock-ring-reserve), calc(var(--dock-seat) *
  (var(--scale-hover-dock) - 1) / 2))` (4 px at the house geometry), and
  `scroll-padding-inline`/`-block` add the reserve back, so every snap rest and the
  `useDockRun` anchor `i·P − P/2` keep their scroll offsets. The vertical rule's
  zeroed-block/inline-only rotation is deleted: one rule, both axes.
- **r2.** `scroll-timeline: --dock-run` is named on `.dock-run.is-active` only (the pane's
  DOM posture, the one the morph and the measure read). A collapsed dock names no
  timeline, the cap animations are inactive, and the plate paints its rest length: a
  circle.
- **r5.** The scrubber's thumb is a `--slider-thumb-size` disc, `--card` over
  `--shadow-sm` (the switch thumb's paint), centred by the root's `align-items`. The
  inscription law is unchanged: every rung still takes `min(thumb, track)`. The range is
  wrapped in `.slider-lane`, the track less one thumb diameter anchored at the edge the
  fill grows from, and the range reaches one diameter past it with a negative margin on
  its leading edge, so the fill is `d + p·(track − d)` and its leading end is the
  `contain`-aligned thumb's trailing edge at every value (inverted, RTL and vertical by
  logical properties). The spectrum variant keeps a full-track lane. The UA focus
  outline on the scrubber thumb is suppressed beside the track ring that already
  carries keyboard focus; forced colours paint the disc Canvas with a CanvasText edge.
- **r6.** The coarse arm also sets `--control-text: max(var(--type-small), 1rem)` and
  `--control-text-sm: max(var(--type-caption), 1rem)`. The box heights keep the 1.5x.
  `-sm` no longer outgrows the default rung on touch (18 against 16).
- **r7.** `--icon-label-gap: 0.25rem` at `:root` (`tokens/sizing.css`), read by
  `.menu__item`/`.menu__sub-trigger` (`gap`) and as the dock trigger family's fallback
  (`triggers.css`, `var(--dock-trigger-gap, var(--icon-label-gap))`, the same 4 px it
  painted).

### Tokens and API

No public API is removed or renamed. Token values that move, each the cure itself:
`--dock-cap-rest` on the pill (`50%` to a length), and under `(pointer: coarse)` only,
`--control-text` and `--control-text-sm`. New: `--icon-label-gap` (r7), the measured
`--dock-plate-cross-px` (r1, the carrier W-0.8 §3.3 names) and the run-local
`--dock-run-reserve`. DOM: the Slider's range now sits in a `.slider-lane` span inside
the track.

### Units moved with the law

- `tests/components/custom/dock/g-dock-lattice.test.ts`: the scroll-padding regex adds
  the reserve; the cap-rest assertion reads the length and forbids a percentage; the
  ring-reserve arm reads `padding`/`margin: var(--dock-run-reserve)` and the `max()`.
- `tests/components/a11y/coarse-target.test.ts`: "the invisible standard thumb" premise
  is re-derived as "the thumb is inscribed in the track" (its size reads
  `--slider-thumb-size`, every rung `min()`ed against the track), so the operable target
  is still the track.
- `tests/components/ui/slider/Slider.marks.test.ts`: the track's second child is the
  lane, holding the range.

## Witnesses

`release-10-1-5.spec.ts`, 9 cells. Chromium project `chromium-headless-new`; WebKit
project on Playwright WebKit 2287 (`webkit-2287.config.ts`, `guarded --exclusive
webkit`). The coarse cells set `hasTouch`/`isMobile` and assert `(pointer: coarse)`
matches first.

| cell | Chromium v10.1.4 | Chromium 10.1.5 | WebKit v10.1.4 | WebKit 10.1.5 |
|---|---|---|---|---|
| g1 rest dock, coarse 390: one corner = h/2, no reach, pointer off and on the trailing seat | RED (hover: run 265/263) | GREEN | RED (265/263) | GREEN |
| g1 the same, coarse 844 | RED (268/266) | GREEN | RED (267/265) | GREEN |
| g1 the same, desktop 1280 | RED (259/257) | GREEN | RED (258/256) | GREEN |
| g1 an overflowing run (12 seats, 390) at scroll 0: leading corners = h/2 as a length, trailing cut | RED (`50%`) | GREEN | RED (`50%`) | GREEN |
| g2 collapsed: a circle, half its extent on both axes | RED (`50% / calc(0% + 16px)`) | GREEN | RED (same) | GREEN |
| g2 expanded (collapsible), action layer, input layer, input focused: g1 holds | RED (`9999px` ≠ 28) | GREEN | RED (same) | GREEN |
| g3 Slider thumb visible, one size at min/mid/max (and inverted), inside the track and the fill, fill ≥ one thumb | RED (thumb 0x20, opacity 0) | GREEN | RED (same) | GREEN |
| g4 coarse 390: `.input-bar`, `<Input>`, `--dropdown-text` ≤ 16 px and ≤ 1.25x the CardDescription subtitle; bar and picker ≥ 16 px; bar ≥ 44 px tall | RED (bar 21, picker 21, subtitle 14.19) | GREEN | RED (same) | GREEN |
| g5 DropdownMenuItem icon→label gap = `--icon-label-gap` = the dock trigger's gap | RED (token unresolved, gap 0) | GREEN | RED (same) | GREEN |

Totals: Chromium 9/9 GREEN, 9/9 RED on v10.1.4; WebKit 2287 9/9 GREEN, 9/9 RED on
v10.1.4. Logs `docs/release-10.1.5/logs/g1-g5-{branch,v1014}-{chromium,webkit}.{log,json}`,
summaries `witness-{chromium,webkit}.txt`. The v10.1.4 g1 cells fail first on the reach
(asserted before the corner, since the reach is the trigger); the same reads also carry
the `9999px` rest and the `50%` hovered corner.

## Gates

| gate | result |
|---|---|
| g6 `release-10-1-4.spec.ts`, Chromium | 23/23 GREEN |
| g6 the same, WebKit 2287 | 15 passed, 8 skipped (page.pdf is Chromium's) |
| g6 `release-10-1-3.spec.ts`, Chromium | 60/60 GREEN |
| g6 the same, WebKit 2287 | 58 passed, 2 skipped (the CDP swipe cells) |
| `npm run typecheck` (guarded `--light`) | exit 0 |
| `npm run build` (guarded) | exit 0, and again on the committed tree before the rebind |
| `npx vitest run --maxWorkers=2` (guarded) | 247 files; 2394 passed, 10 expected fail, 1 skipped; 3 failed, all `tests/gates/boot-graph.test.ts`'s build arm, which needs `dist-demo` |
| `npm run demo:dist:build` (guarded), then `boot-graph.test.ts` | exit 0; 14/14 |
| `npm run verify:package` (guarded) | the ratchet refused +1929 B (2942600 > 2940671). Rebound on the committed tree, then terminal CLEAN, version 10.1.5 |

The three unit files moved with the law (above) failed on the first run for the stated
reasons and pass on the cured tree; no other unit changed.

## Open

- Value.js measured the 2 px reach "at rest" (its inventory reads no pointer field).
  The harness reproduces it only under the trailing seat's hover scale, the class O-123
  OD-5 names; value's own 1.07 press (r8) is the same class and is covered by the same
  reserve (1.5 px < 4 px). If value still reads reach at rest on 10.1.5, the source is
  outside glass's seats and gets its own row.
- The reserve covers the hover ink by `max()`, not the ring alone. A consumer seat
  larger than `--dock-seat` with its own larger scale is not covered; that is W-0.8's
  OD-13 law (the reserve equals the largest ring or ink any seat paints).
- `<Input>` (`.field-control`, `_shared/field/control.css`) reads `--type-small`
  directly and paints 14 px on coarse, under the iOS no-zoom 16 px. It was 14 px at
  10.1.4 too (it is not the 21 px row) and its comment routes the shared type cure to
  the PROPORTION wave; g4 holds it at ≤ 16 and ≤ 1.25x. Not changed here.
- The dock's shape-card plate keeps inheriting the box's morphing radius; only the pill
  rests at the measured length.
- WebKit 2311 (the repo's resolved Playwright WebKit) was not run; the dock-bearing
  release specs run on 2287 (O-99).
- r3, r4 and r8 to r10 are untouched (W-0.8, D2, W-I.1).

## Fix round 1 (critique-1.md D1 to D4)

Fixer: claude-opus-5-5. Records `docs/release-10.1.5/fix-1/`, script
`docs/release-10.1.5/scripts/witness-fix-1.sh` (the branch arm, the g6 specs, then the
RED arm: the `src` files this round changed checked out from the round-0 tip `0162d71cf`,
restored to HEAD after).

- **D1, marks off the lane.** `slider/styles.css`: on the scrubber the marks register is
  inset by half a thumb diameter at both ends of the main axis (`inset-inline` on a
  horizontal slider, `inset-block` on a vertical one), so `p·box` lands on the thumb's
  centre `d/2 + p·(track − d)`; symmetric, so inverted and RTL hold. The same law moved
  the loupe (`Slider.vue` `writeLoupeValue`): it also read `p·track`. Its value point is
  now the thumb's centre and its fill ends at the thumb's trailing edge, from the thumb's
  layout diameter (`offsetWidth`) measured once per grasp. The spectrum's marks are
  unchanged (its lane is the whole track; not part of this patch).
- **D2, the flattened `-sm` rung.** `tokens/light-dark.css` coarse arm:
  `--control-text-sm: max(var(--type-caption), calc(1rem * 6 / 7))`, the 16 px floor
  times the base pair's own floor ratio (0.75rem / 0.875rem), so the rung stays 0.86 to
  0.88 of the default on touch as on desktop. The no-zoom floor moves to the fields: new
  token `--field-text-floor` (`0px` at `:root` in `tokens/sizing.css`, `1rem` under
  `(pointer: coarse)`), read by `.input-pill` and `.input-bar-field` as
  `max(<rung>, var(--field-text-floor))`. Token values moved, each the cure: coarse
  `--control-text-sm` (16 to 13.71 px at 390). New: `--field-text-floor`.
- **D3, the undimmed disabled thumb.** `.glass-slider[data-disabled]:not([data-variant="spectrum"]) .slider-thumb`
  joins the range's `opacity: var(--opacity-disabled)` rule. The spectrum's disabled
  handle is as it was at 10.1.4.
- **D4, the clipped focus ring under the pointer.** `dock/styles/run.css`:
  `--dock-run-reserve: calc(seat·(s − 1)/2 + ring·s)`, the composed ink, 6.6 px at the
  house geometry (was `max()`, 4 px). The padding and the handed-back margin read it as
  before, as do both `scroll-padding` arms, so seat positions and snap offsets do not
  move. `g-dock-lattice.test.ts` moved with the law.

### Witnesses (release-10-1-5.spec.ts, cells c1 to c4)

| cell | Chromium round 0 | Chromium fix 1 | WebKit 2287 round 0 | WebKit 2287 fix 1 |
|---|---|---|---|---|
| c1 a mark = the thumb's centre at its value (horizontal, inverted, vertical); a mark at 5 lies past the fill at min; the loupe's value point and fill end = the thumb's centre and trailing edge | RED (on-25: mark 92, thumb centre 96) | GREEN | RED (same reads) | GREEN |
| c2 coarse 390: menu label, shortcut and sm Button ÷ their default rung in 0.82 to 0.92; the sm field and the default field 16 px | RED (all 16, ratio 1) | GREEN | RED (same) | GREEN |
| c3 disabled scrubber: thumb opacity = fill opacity < 1 | RED (thumb 1, fill 0.5) | GREEN | RED (same) | GREEN |
| c4 coarse 390 and desktop 1280: a keyboard-focused, hovered seat's ring (outline + offset, × scale) inside every clipping box to the dock root; the run still hides nothing | RED (ring top 17.4 against the run's 20) | GREEN | RED (ring top 17.4 against 20) | GREEN |

### Gates

| gate | result |
|---|---|
| release-10-1-5 (g1 to g5, c1 to c4), Chromium | 14/14 |
| g6 release-10-1-4, Chromium | 23/23 |
| g6 release-10-1-3, Chromium | 60/60 |
| WebKit 2287 (the same three) | release-10-1-5 14/14; 10-1-4 15 passed, 8 skipped (page.pdf); 10-1-3 58 passed, 2 skipped (CDP swipe) |
| `npm run typecheck` | exit 0 |
| `npx vitest run --maxWorkers=2` | 246/247 files; 2396 passed, 10 expected fail, 1 skipped; 1 failed, the boot-graph build arm (stale `dist-demo`) |
| `npm run build`, `npm run demo:dist:build`, then `boot-graph.test.ts` | exit 0, exit 0, 14/14 |
| `npm run verify:package` | ratchet refused +493 B (2943093 > 2942600); rebound on the committed tree, then terminal CLEAN, version 10.1.5 |

The c1 RED arm fails on its mark read before it reaches the loupe read; the loupe half is
shown GREEN only, by the lane law it asserts.

## Fix round 4 (critique-4.md: O-133, O-150 R-t-1, H1 to H6)

Seat: claude-opus-5-5. Every browser run was admitted by `guarded` (WebKit 2287 under
`--exclusive webkit`, which queued once for the lock and then ran).

### Cures

- **O-133.** `tabs/styles/segmented.css`: `.segmented-tabs { isolation: isolate }`, so the
  strip is its own stacking context in every variant, and `.segmented-tab` takes
  `z-index: 1`, one rung over the indicator's `0`. The drag lift (`tabs/styles/drag.css`)
  goes to `2`, still over the labels, now inside the strip.
- **O-150 R-t-1.** `TableRow.vue` `border-b border-border`, `TableHeader.vue`
  `[&_tr]:border-b [&_tr]:border-border`. No token moved.
- **H1.** `dock/styles/run.css`, THE RUN'S CLIP: the active run animates its own corners on
  the cap's timeline (`gl-dock-clip-{inline,block}-{start,end}`). On a scroll-axis edge
  that is the plate's edge (`--dock-run-edge-*`, 0 beside a persistent region) the corner
  is the plate's corner less the run's inset from the plate (`--dock-run-inset`) on the
  scroll axis, and `50%` of the run on the cross axis. With nothing to scroll the
  timeline is inactive and the run clips to its padding box, so rest geometry and every
  rest witness are unchanged. Hit testing does not follow a scroller's rounded clip in
  Chromium, so h1 reads paint: two 2x frames with the seats shown and hidden must agree
  on every device pixel more than 0.75 px past a plate corner's arc.
- **H2.** `dockMorphMeasure.ts` measures `[data-glass-dock-seat]:not(.dock-trigger)`: a
  `<DockTrigger>` never hover-scales, so it reserves only its ring, which the reserve
  holds for every seat. The labelled-trigger dock's reserve is now the icon dock's
  (Chromium and WebKit: 8 px; it was 19). **Ruled, not cured: the open seat's 5 px.** The
  open seat does hover-scale, so its ink is real and the reserve must hold it. A run
  whose room did not change on open would have to reserve the open seat's `m·P − gap`
  in every dock, open or not: at the house geometry that widens every dock at rest by
  2 × (12 − 8) px and moves every end seat 4 px off the plate's edge, against v10.1.4.
  The 5 px follows the open seat's own width transition (one spring, the same clock), and
  it moves the run only beside a persistent region. The patch accepts it; W-0.8 owns the
  run's room when it re-derives the lattice.
- **H3.** The seat ResizeObserver is made once per attach, when the first seat joins, and
  a pane mutation diffs `querySelectorAll` against the observed set (unobserve the gone,
  observe the new). A ticking label constructs nothing (both engines: 4 → 4 over 20
  ticks; it was 4 → 24).
- **H4.** `observeCross` publishes `--dock-plate-cross-px` from the plate's layout box
  (`offset*`) when the dock attaches, then from the ResizeObserver; the seats likewise
  from `offset*` as they join. With no ResizeObserver the plate rests at half its block
  extent (28 px on a 56 px plate; it was 0px).
- **H5.** `--dock-run-step-*` and their prose are deleted; the reserve is the bare ink,
  rounded up. e1 to e4 hold in both engines on the spacer alone.
- **H6.** Every comment line the patch added in `src/` now states what the code does: no
  process ids, no struck history (`git diff -U0 v10.1.4 -- src` additions carry none of
  `10.1.5`, `O-1xx`, `OD-`, `critique`, `fix round`, `W-0.8`, `~~` or a dated tag).

Tokens: no existing token value moved. New, each internal to the dock's run clip:
`--dock-run-edge-start`, `--dock-run-edge-end`, `--dock-run-inset`,
`--dock-run-corner-rest`, `--dock-run-corner-cut`. Deleted (added earlier in this patch,
never shipped): `--dock-run-step-inline`, `--dock-run-step-block`.

### Witnesses (release-10-1-5.spec.ts f1, f2, h1 to h4)

RED arm: the round-4 tip `463b0e42a`'s `src/` under the new spec and harness
(`scripts/witness-fix-4.sh`); f1 and f2 read the same on v10.1.4, whose files they touch
are unchanged at that tip.

| cell | Chromium 463b0e42a | Chromium fix 4 | WebKit 2287 463b0e42a | WebKit 2287 fix 4 |
|---|---|---|---|---|
| f1 underline under a z:1 fixed header; labels over the indicator at rest and mid-glide | RED (top hit `segmented-tab`, tab z 10) | GREEN | RED | GREEN |
| f2 Table rules = `--border`, light and dark | RED (`rgb(28, 25, 23)`) | GREEN | RED | GREEN |
| h1 house, seat ink past the cut arc | RED (4 px², Δ 25 to 31) | GREEN | RED (4) | GREEN |
| h1 cockpit | RED (26) | GREEN | RED (20) | GREEN |
| h2 labelled trigger's reserve = icon dock's | RED (19 vs 8) | GREEN | RED (19 vs 8) | GREEN |
| h3 ResizeObserver constructions over 20 ticks | RED (4 → 24) | GREEN | RED (4 → 24) | GREEN |
| h4 no ResizeObserver: rest corner = h/2 | RED (0px) | GREEN | RED (0px) | GREEN |

### Gates

| gate | result |
|---|---|
| release-10-1-5 (g1 to g5, c1 to c4, e1 to e4, f1, f2, h1 to h4), Chromium | 32/32 |
| release-10-1-5, WebKit 2287 | 32/32 |
| g6 release-10-1-4 | Chromium 23/23; WebKit 15 passed, 8 skipped (page.pdf) |
| g6 release-10-1-3 | Chromium 60/60; WebKit 58 passed, 2 skipped (CDP swipe) |
| `npm run typecheck` | exit 0 |
| `npm run build`, `npm run demo:dist:build` | exit 0, exit 0 |
| `npx vitest run --maxWorkers=2` | 247/247 files; 2397 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | ratchet refused +2851 B (2948633 > 2945782); rebound on the committed tree, then terminal CLEAN, version 10.1.5 |

`g-dock-lattice.test.ts` moved with the law (no step in the reserve; the run's clip
keyframes join the cap's as the band's animated radii, on the cap's endpoints and
timeline).

## Fix round 5 (critique-5.md: K1, K2, K3 under the round-5 ruling)

Seat: claude-opus-5-5. Every browser run was admitted by `guarded` (WebKit 2287 under
`--exclusive webkit`; Chromium queued about 20 minutes once for a browser slot, then
ran). Records `docs/release-10.1.5/fix-5/`, scripts `scripts/witness-fix-5.sh` (the
branch, g6, then the RED arm: the `src` files this round changed checked out from the
round-5 tip `5836adb5f`, restored to HEAD after) and `scripts/gates-fix-5.sh`.

### Cures

- **K1.** `useDockRun.ts`: the anchor is the seat's start from its layout box
  (`offsetLeft`/`offsetTop`; the run is positioned, so it is the seats' offset parent)
  less the run's computed `scroll-padding` start, clamped to `[0, scrollMax]`. That is
  the snap position the platform itself uses, so a wide leading or trailing tab no
  longer leaves the end seat's anchor short of `scrollMax`. `occluded()` reads the same
  layout box against the scroll position and `clientWidth`/`clientHeight` less the
  reserve, so a hovered seat that rests in view is not reach. The `i·P + (m−1)·P − P/2`
  arithmetic and `readScalar` are deleted. `g-dock-lattice.test.ts` G-DOCK-REACH moved
  with the law: the open seat's width is still authored from the pitch, and the anchor
  and the occlusion read layout boxes, never `getBoundingClientRect`.
- **K2.** `run.css`: the run's clip keyframes (`gl-dock-clip-*`) start square (`0`) and
  reach the plate's rest corner at `1%` of the pitch, then the cut at `100%`. A run
  flush at an edge clips that edge square, as a run with nothing to scroll does, and
  from under one pixel of travel the clip follows the plate's corner as fix 4 made it
  (h1 holds in both engines). The square is a keyframe rather than a range gap: WebKit
  2287 holds a scroll-driven animation's end value past its range end whatever its
  fill (measured: the trailing arm at `scrollTop = max` read progress 0 with
  `fill: backwards` and a range ending `calc(100% − 1px)`).
- **K3, r1 at every width.** `run.css`: the horizontal run's reserves are two boxes,
  `::before` (which takes back the leading padding by its own margin, so at full size it
  moves nothing) and the existing `::after`, both `inline-size: --dock-run-reserve-inline`,
  `min-inline-size: 0` and `flex-shrink: --dock-run-yield`. `dockMorphMeasure.ts`
  publishes `--dock-run-yield` (1 when the seats' layout span fits the run's
  `clientWidth`, else 0) from the same capture its observers already drive. With the
  seats fitting, the two boxes shrink equally to half the room left, so the run's
  scroll extent is its port. With the seats overflowing, both hold the full reserve and
  scroll it. Neither the span nor the port depends on the yield, and the boxes' declared
  size is the full reserve either way, so a content-sized dock's width never reads the
  yield. No viewport-capped plate widens and no spacer sits on top of a clamp. The
  vertical run keeps its padding reserve and does not yield (no K3 reading names it).

Tokens: no existing token value moved. New, internal to the run: `--dock-run-yield`
(registered `0` on `.glass-dock`, written on the root). No export removed or renamed.

**Bound under the yield, measured (`fix-5/probe/k3-*.json`).** At 320 coarse the room per
side is 7.86 px in Chromium and 5.53 px in WebKit, whose labels lay out wider. A
keyboard-focused end seat's ring (4 px) is whole in both engines: 3.86 and 1.53 px to
spare. Focus plus hover on a label tab adds the tab's 5 px hover overhang, so that ink
passes the room. It is cut 0.9 to 1.6 px in Chromium and 3.3 to 4.1 px in WebKit at 320
coarse, and 1.5 to 1.7 px on the e4 capped docks. The ruling admits no other room: the
run cannot scroll and the plate cannot widen.

### Witnesses (release-10-1-5.spec.ts k1 to k3, e4 restated)

| cell | Chromium 5836adb5f | Chromium fix 5 | WebKit 2287 5836adb5f | WebKit 2287 fix 5 |
|---|---|---|---|---|
| k1 fine 320 house run with persistent regions: End, Home, focus(), hover then focus land flush, ring whole | RED (End 503 / 516) | GREEN | RED (505 / 521) | GREEN |
| k1 coarse 320 | RED (537 / 564) | GREEN | RED (539 / 569) | GREEN |
| k2 vertical tab run, flush at start and end: square edge, ring whole; mid-run rounds | RED (`50% 61.34px` at the flush start) | GREEN | RED (`50% 63.09px`) | GREEN |
| k3 fine 320: no reach, rest corners, focused end seats ringed | GREEN (316/316 already) | GREEN | RED (317/316) | GREEN |
| k3 coarse 320 | RED (320/316) | GREEN | RED (325/316) | GREEN |
| e4 390 coarse, capped 4 px under content: no reach, rest corners, focused end seat ringed | RED (225/221) | GREEN | RED (228/224) | GREEN |
| e4 1440 | RED (226/222) | GREEN | RED (232/227) | GREEN |

`expectHonestReach` (e3) now reads the r1 law: no reach when the seats' span fits the
port, else the span's overrun plus both reserves.

### Gates

| gate | result |
|---|---|
| release-10-1-5, Chromium | 37/37 |
| release-10-1-5, WebKit 2287 | 37/37 |
| g6 release-10-1-4 | Chromium 23/23; WebKit 14 passed, 1 failed, 8 skipped, then on re-run 15 passed, 8 skipped (page.pdf). The one failure was critique-3 F-4, a DataTable flex host's projection settle (`swaps` 2 against ≤ 1), a file this round does not touch |
| g6 release-10-1-3 | Chromium 60/60; WebKit 58 passed, 2 skipped (CDP swipe) |
| `npm run typecheck` | exit 0 |
| `npm run build`, `npm run demo:dist:build` | exit 0, exit 0 |
| `npx vitest run --maxWorkers=2` | 247/247 files; 2397 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | ratchet refused +840 B (2949473 > 2948633); rebound on the committed tree, then terminal CLEAN, version 10.1.5 |

`dockMorphMeasure.test.ts` "a capture keeps the run's scroll position" failed 1 of 5
isolated runs during the round (`fix-5/dock-vitest.log`): the flake fix round 3
recorded in that file. The full g7 run passed it.

### Not cured here

- The RTL reach direction (critique-5's not-defects list) is unchanged: `scrollPos`
  and `writeScroll` carry no RTL sign.
- O-157 (inbound during this round) is not in this round's scope.

## Fix round 6 (critique-6.md: L1)

Seat: claude-opus-5-5. Every browser run was admitted by `guarded` (WebKit 2287 under
`--exclusive webkit`). The Chromium try run queued about 70 minutes for a browser slot,
and each WebKit run waited for the machine-wide WebKit lock. Those were waits, not
refusals. Records `docs/release-10.1.5/fix-6/`; scripts `scripts/witness-fix-6.sh` (the
branch, g6, then the RED arm: the `src` files this round changed checked out from the
round-6 tip `4c9c15008` and restored to HEAD after), `scripts/gates-fix-6.sh` and
`scripts/d1-ab-fix-6.sh`.

### Cure

- **L1, the cap after the overflow vanishes.** An inactive scroll timeline does not
  release what it last resolved: Chromium keeps the leading arm at progress 1, and WebKit
  keeps whichever arm last resolved. So a run whose overflow vanished while it was
  scrolled rested cut with nothing to scroll. `dockMorphMeasure.ts` `publishYield` now
  writes `data-run-fits` on the dock root, on both axes: present when the seats' span
  along the scroll axis, read from their layout boxes, is no longer than the port. It is
  the one reading of "the seats fit", and `run.css` consumes it twice:
  - `.glass-dock[data-run-fits]` sets `--dock-run-yield: 1` (the K3 reserve yield,
    horizontal only, as before), and
  - `.glass-dock[data-run-fits] .dock-plate` and `… .dock-run.is-active` take
    `animation: none`, so the plate paints its rest corner and the run clips square.

  When the seats overflow again, the animations re-apply and bind to the timeline
  afresh. The root no longer carries `--dock-run-yield` as an inline style. The
  attribute is its input, so there is one flag, not two. Two `run.css` comments that
  said an inactive timeline restores the base corner are corrected.

Tokens: no token value moved and no token added. `--dock-run-yield` (fix 5, internal)
is now derived from the attribute. No export was removed or renamed.

### Witness (release-10-1-5.spec.ts l1, fine and coarse)

| cell | Chromium 4c9c15008 | Chromium fix 6 | WebKit 2287 4c9c15008 | WebKit 2287 fix 6 |
|---|---|---|---|---|
| 390, cap 200 → 1000, run at end / mid, house tabs and 6 icons: four corners of `h/2`, `sw = cw`, every seat shows, at 300 ms and 1.5 s | RED 8/8 (`16 30 30 16`, `16 28 28 16` coarse/fine) | GREEN | RED 8/8 (e.g. `25.98 20.02 20.02 25.98`, `24.31 30 30 24.31`) | GREEN |
| 390 → 844 resize, cap `100vw − 30px`, run at end | RED (`16 30 30 16` at 539/539) | GREEN | RED | GREEN |
| vertical, stage 240 → 860, run at end: four corners of `w/2`, every seat shows | RED (`16 16 34 34`) | GREEN | RED | GREEN |

### Gates

| gate | result |
|---|---|
| release-10-1-5, Chromium | 49/49 |
| release-10-1-5, WebKit 2287 | 49/49 |
| g6 release-10-1-4 | Chromium 23/23; WebKit 15 passed, 8 skipped (`page.pdf`) |
| g6 release-10-1-3 | Chromium 60/60; WebKit 57 passed, 2 skipped (CDP swipe), 1 failed: D-1 (critique-7), bottom-anchored under zoom 1.25, the leaving summary's largest frame step 2.23 px against `< 2`. It is not this round's. `d1-ab-fix-6.sh` repeated the cell 6 times on each tree under the same load (about 26 to 38): the round-6 tip's `src` fails 6/6 (2.23 to 2.44 px), the branch 5/6 (2.37 to 2.45 px), with the same step values. A one-frame step under a loaded machine. Critique 6 had it GREEN at lower load |
| `npm run typecheck` | exit 0 |
| `npm run build`, `npm run demo:dist:build` | exit 0, exit 0 |
| `npx vitest run --maxWorkers=2` | 247/247 files; 2397 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | ratchet refused +214 B (2949687 > 2949473); rebound on the committed tree, then terminal CLEAN, version 10.1.5 |

### Not cured here

- A vertical run whose seats fit still keeps its padding reserve (the orchestrator's
  round-6 ruling 1, the vertical yield). It was not in this round's defect list. Under
  `data-run-fits`, such a run now paints its rest corner on both axes. l1's vertical cell
  read `sh = ch` (718/718), so its stage leaves room for the reserve.
- The RTL reach sign, as recorded.

## Fix round 7 (critique-7.md: M1 to M4)

Seat: claude-opus-5-5. Every browser run went through `guarded` (WebKit 2287 under
`--exclusive webkit`). Records `docs/release-10.1.5/fix-7/`; scripts
`scripts/witness-fix-7.sh` (the branch, g6, then the RED arm: the `src` files this round
changed, checked out from the round-7 tip `fd1c2443a` and restored to HEAD after),
`scripts/gates-fix-7.sh` and `scripts/chain-fix-7.sh`. The probe
`release-10-1-5-fix-7-probe.spec.ts` located M4 and O-167 (2) before the cure
(`fix-7/probe-chromium*.log`).

### Cures

- **M1, a collapse from a scrolled run.** `run.css`: the cap's animations come off the
  plate and the run under `.collapsed` as well as under `data-run-fits` (one rule,
  `:is([data-run-fits], .collapsed)`). A collapsed dock's run is not the visible run and
  hides nothing, and an inactive timeline holds what it last resolved (Chromium kept
  `gl-dock-cap-inline-*` at the cut). The comment that said a collapsed dock's
  animations are inactive and paint the rest corner is corrected. Expanding again
  re-binds the animations to the timeline, so the honest cut returns.
- **M2, the vertical yield.** The vertical reserve stays padding (the rotated spacer box
  moved D-1's leaving summary in WebKit) and yields as padding: `publishYield`
  (dockMorphMeasure.ts) writes `--dock-run-room-block`, half the room the seats leave in
  the port, from the same reading that sets `data-run-fits`, and `run.css` sets the run's
  `padding-block` to `min(reserve, room)` under `.vertical.expanded[data-run-fits]`
  outside a morph. The run's border box is fixed by its margins, so the port does not
  move, and the flag and `sh = ch` are one fact. Held off through a morph: the first
  form, ungated, moved the bottom-anchored reversal's summary glyph 4.5 px at settle
  (10.1.3 D-1, Chromium).
- **M4, the layered mount snap.** `run.css`: a `.dock-layer-group` child of the run is
  `scroll-snap-align: none`, and its active face's seats are the snap targets. As one
  snap area wider than the port the group let Chromium rest the run at `scrollLeft 8`;
  the seats rest it at 0 (`fix-7/probe-chromium-2.log`).
- **M3, the round-7 inbound rows:**
  - **O-157.** `adaptive-legibility.css`: the static plate is the live plate's veil over
    a card ground, `linear-gradient(var(--glass-veil) …), var(--card)` at the plate's own
    `--glass-level: 1`, so the consumer's `--glass-veil-ink` reaches it and it stays
    opaque. The root's `--glass-level: 0` still holds every other surface in the dock.
  - **O-159.** `dock/README.md` names the six `DockProps` members (`collapse` with its
    three values), the five slots, and the idle window `DOCK_COLLAPSE_DELAY_MS`
    (3600 ms). The struck props are gone.
  - **O-160.** The clip keyframes carry no percentage: the cross radius is
    `--dock-run-cross-half`, the plate's half cross extent plus the run's hand-back past
    the dock's padding, the length `50%` resolved to. A circle (the first form) let
    a cut seat's ink past the plate's arc on cockpit (h1).
  - **O-161.** The dock seats' hover paint (icon, tab and its secondary tier, the trigger
    family, the layer switcher's tabs), `.glass-capsule-hover`'s lift and the
    DarkModeToggle's hover are gated on `@media (hover: hover)`. A touch `:hover` sticks
    to the tapped element, and nothing in the dock was gated before.
  - **O-162.** `morph.css`: the summary's corner is `--dock-cap-rest` and its
    `:focus-visible` ring is the seats' ring (`--dock-ring-*`), so the ring follows the
    pill.
  - **O-176.** `useDockState.ts`: a dock that mounts open arms the idle window at mount.
  - **O-177, Tab.** `GlassDock.vue`: keyboard focus on the folded summary
    (`:focus-visible`) expands the dock and hands focus to the first seat, as Enter does.
    The collapse's own hand-off focus and a pointer press on the summary do not expand.
  - **O-177, a press mid-expand.** `useDockClickIntegrity.ts`, THE RE-AIM ARM: a press
    that begins mid-morph is the swap race only when the pointer is where it stood at the
    flip, after a flip the hover dwell caused. After a flip a click caused, or a press
    more than 6 px from the flip position, the press activates its seat once.
  - **O-167 (1).** `slider/styles.css`: `--slider-fill-ink`, the fill's default under
    `--slider-range-bg`, is the warm capsule floor in light and the foreground at 22 % in
    dark (read by the fill and the loupe). Parkway sets nothing; a consumer that wants a
    hue sets `--slider-range-bg`.
  - **O-167 (2).** `Slider.vue`: reka 2.10.1 takes the thumb's grab offset on the first
    `pointermove` of a thumb drag, so the thumb trailed by that move (4 px per 4 px step).
    After reka's own `pointerdown` the Slider hands reka one `pointermove` at the press
    point, so the offset is the true grab and the drag tracks 1:1 (residual under 0.5 px,
    the step's rounding).

Tokens: no existing token value moved. New, internal to the dock: `--dock-run-room-block`
(written on the root under a fitting vertical run) and `--dock-run-cross-half`; internal to
the slider: `--slider-fill-ink`. No export removed or renamed. The posture unit
"focuses the summary without expanding" is restated under O-177 (Tab expands and lands on
the first seat). The coarse cells that hovered a seat to read the worst case (g1, c4, e1,
e2) now read the seat at rest on a touch pointer, which O-161 makes the rest.

### Witnesses (release-10-1-5.spec.ts m1 to m4 and m3, fine and coarse)

| cell | Chromium fd1c2443a | Chromium fix 7 | WebKit 2287 fd1c2443a | WebKit 2287 fix 7 |
|---|---|---|---|---|
| m1 a collapse from a run scrolled mid or to its end (390, 1440): uniform `h/2` on the last 20 % of frames and at +1.2 s; the cut returns on re-expand | RED | GREEN | GREEN (WebKit drops the effect, as critique 7 found) | GREEN |
| m2 a vertical stage swept 300 to 372 px: no row with seats that fit, or the flag, scrolls | RED | GREEN | RED | GREEN |
| m4 a layered overflowing run (390, 1440) rests at 0 with its leading corner round | RED | GREEN | GREEN (as critique 7 found) | GREEN |
| m3 O-157 a static plate under no, green and red ink paints three opaque plates, the green one greener | RED | GREEN | RED | GREEN |
| m3 O-159 the README names exactly the `DockProps` members, and the constant's idle window | RED | GREEN | RED | GREEN |
| m3 O-160 no cut-cap or clip keyframe radius carries a `%` | RED | GREEN | RED | GREEN |
| m3 O-161 (coarse) a tap leaves the toggle and a DockControl painting as at rest | RED | GREEN | RED | GREEN |
| m3 O-162 after Escape the summary's ring is solid on the plate's corner | RED | GREEN | RED | GREEN |
| m3 O-177 Tab onto the folded face expands and lands on a seat | RED | GREEN | RED | GREEN |
| m3 O-176 a `collapse="open"` dock idles shut, and after a remount | RED | GREEN | RED | GREEN |
| m3 O-177 a press at 0, 100, 240, 480 ms into the expand activates once | RED | GREEN | RED | GREEN |
| m3 O-167 the dark fill is neutral and quiet; the thumb stays within 1 px of the dragged pointer | RED | GREEN | RED | GREEN |

The RED arm: Chromium 27 failed of 27; WebKit 17 failed, 10 passed, the ten being m1 and m4
(three and two cells, fine and coarse), the two rows critique 7 measured Chromium-only.

### Gates

| gate | result |
|---|---|
| release-10-1-5, Chromium | 76/76 |
| release-10-1-5, WebKit 2287 | 76/76 |
| g6 release-10-1-4 | Chromium 23/23; WebKit 15 passed, 8 skipped (`page.pdf`) |
| g6 release-10-1-3 | Chromium 60/60; WebKit 58 passed, 2 skipped (CDP swipe). The first form of the M2 yield (ungated through the morph) failed the bottom-anchored D-1 reversal in Chromium (summary glyph 4.5 px at settle); gated to an expanded dock at rest, D-1 31/31 |
| `npm run typecheck` | exit 0 |
| `npm run build`, `npm run demo:dist:build` | exit 0, exit 0 |
| `npx vitest run --maxWorkers=2` | 247/247 files; 2397 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | ratchet refused +2938 B (2952625 > 2949687); rebound on the committed tree, then terminal CLEAN, version 10.1.5 (`fix-7/verify-package-2.log`; the heavy run waited 35 min at load 39 to 78 behind the zone sampler and was re-run under `--light`, which `guarded` admitted) |

### Not cured here

- O-182 (the owner's dock halo in dark, inbound before critique 7) was not in this round's
  defect list.
- `guarded` warned the kernel zone leak ARMED (inuse 43342) on the WebKit and gates runs;
  by the owner's 2026-11-03 order it does not hold runs, and none was refused.
