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
