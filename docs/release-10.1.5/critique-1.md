# 10.1.5 — critique, round 1 (adversarial)

Critic: claude-opus-5-5, fresh context. Branch `release/10.1.5` at `81f21ccb9` (nine
commits over `v10.1.4`), read in full with `docs/release-10.1.5/implement.md`, the
witness script and logs, and value.js's relay `O-129-glass-relay-2026-11-04.md`.

Probes: `tests-visual/release-10-1-5/critic-1.{html,ts}` (scenes `dock`, `slider`,
`marks`, `type`, `menu`; real `src/` components under the demo cascade) and
`tests-visual/release-10-1-5-critic-1{,b,c}.spec.ts`, with WebKit through
`tests-visual/release-10-1-5-critic-1.config.ts` (Playwright WebKit 2287). Each probe
reads layout and computed style and banks its rows to
`docs/release-10.1.5/critic-1/<project>/*.json`. Chromium runs went through `guarded`;
WebKit runs went through `guarded --exclusive webkit`.

## Verdict

The five cures hold for what each row reported. I tried to break r1, r2 and r7 in every
posture listed below and could not. Four defects remain, all on the slider and type
cures or on the reach law around them. Two are regressions the patch introduces (D1,
D2), one is new paint that skips a register (D3), and one is the OD-13 ring clip that
the r1 reserve narrows but does not close (D4).

## What held (refutation attempts that failed)

**r1, r2 — dock cap.** These postures were read in both engines at 320, 390, 430, 844 and
1440, fine and coarse: rest, hover on each seat (menu trigger, Seat 1 to 3), press-and-hold
on the trailing seat, Tab through every seat (focus-visible), and a non-fit-content
(`flex: 1`) dock. Each one gives four equal corners of `h/2` as a length (28 px fine, 30 px
coarse). The run reads `scrollWidth = clientWidth` and `scrollHeight = clientHeight` in
each (`dock-postures-*.json`).
- A run that really overflows (14 seats at 320, 390 and coarse 844) shows the cut in
  both directions. In LTR it reads `28 | 16 | 16 | 28` at the start, `16` on all four
  mid-scroll and `16 | 28 | 28 | 16` flush at the end. Back at the start the rest returns.
  RTL mirrors it on the physical corners (`dock-overflow-*.json`). Vertical (20 seats)
  does the same on the block corners with `w/2` (57.87 px in Chromium, 57.60 px in
  WebKit, the label width).
- Collapsed is a circle (56x56 / 28 px; 60x60 / 30 px coarse). The hidden full pane still
  scrolls (259/64), but `scroll-timeline-name: none`.
- Collapse and expand were sampled per frame (140 frames, three widths, both pointers).
  Zero frames had a lopsided corner.
- The rounded and card shapes keep their literal rests (16 and 24) and cut to their
  rungs (4 and 10).

**r7 — menu gap.** In both engines, icon to label is 4 px (= `--icon-label-gap`) on
`DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem` and
`DropdownMenuSubTrigger`. The absolute indicator does not take part in the gap, and the
sub chevron stays pushed to the end by `margin-inline-start: auto`. Consumer `gap-2.5`
utilities (keyframes `MbabbMenu.vue`) still win, because `.menu__item` is in
`@layer components`.

**r5 — thumb at the extremes.** In both engines the thumb is visible and one size
(8, 16 and 24 px on sm, md and lg) at min, mid and max. That holds on step edges, while
disabled, in RTL (via the prop), vertical, vertical inverted, held at both ends of a drag,
and after Home. It sits inside the track and the fill, and the fill is never narrower than
the thumb (`slider.json`).

**g6 and g7.** Rerun on the branch in Chromium, `release-10-1-5`, `release-10-1-4` and
`release-10-1-3` gave 92/92 passed (`run-g6-chromium.log`). `npm run typecheck` exited 0
(`typecheck.log`). The WebKit rerun of the release specs did not run (see the addendum).

## Defects (reproduced)

### D1 — Slider value marks no longer meet the value (r5 regression) — medium

The lane offsets the fill and thumb by one thumb diameter `d`, but `.glass-value-marks`
still spans the whole track at `p·track`. When the value equals a mark, the thumb centre
is `d(½ − p)` off the mark and the fill end is `d(1 − p)` past it. Chromium
(`chromium-headless-new/slider-marks.json`, md, 272 px track, marks 25/50/75):

| value | mark line | thumb centre | fill end |
|---|---|---|---|
| 25 | 92 | 96 | 104 |
| 50 | 160 | 160 | 168 |
| 75 | 228 | 224 | 232 |
| 0, mark at 5 | 37.59 | 32 | 40 |

At value 0 the fill already covers the 5 mark. At v10.1.4 the range was `p·track` of the
track, so its end sat on the mark line at every value.

Cure: the marks register reads the same lane, `d/2 + p·(track − d)` (the thumb centre),
on both axes, inverted and RTL.

### D2 — the coarse type floor flattens the secondary rung (r6 regression) — medium

`light-dark.css` sets `--control-text-sm: max(var(--type-caption), 1rem)` under
`(pointer: coarse)`, which equals the default rung's 16 px. Measured at coarse 390 and
coarse 1280 in both engines (`type-coarse.json`): the item, the menu label and the
`DropdownMenuShortcut` are all 16 px, and `Button size="md"` and `size="sm"` are both
16 px. On fine (`type-fine.json`) the ratio is 12.18/14 = 0.87, and coarse v10.1.4 had
18.27/21 = 0.87. All `--control-text-sm` / `--dropdown-text-secondary` readers lose their
rung on touch: menu labels and shortcuts, command group headings, xs/sm buttons and the
toggle-group sm.

The no-zoom law binds focusable text fields only. Cure: the 16 px floor goes on the field
recipes (the `.input-pill` sm arm and the `.input-bar` field). The token keeps its
ratio. For example, `--control-text-sm` stays a fixed fraction of `--control-text` on
coarse.

### D3 — the disabled scrubber's new thumb ignores the disabled register — low

The new thumb paints at opacity 1 with `--card` while the fill dims to
`--opacity-disabled`. Rows `dis-min` and `dis-max`, both engines (`slider.json`):
`thumb opacity 1, range opacity 0.5, root 1`. A disabled slider shows a full-strength
knob on a half-strength fill. At v10.1.4 there was no visible thumb, so this paint is new
in this patch. Cure: `.glass-slider[data-disabled] .slider-thumb` takes the same
`--opacity-disabled`.

### D4 — a keyboard-focused seat under the pointer clips its ring (OD-13, narrowed not closed) — medium

`--dock-run-reserve: max(ring, seat·(hover − 1)/2)` = `max(4, 2.2)` = 4 px. The two inks
add up; they do not take the larger. The focus outline is `2px` at offset `2px`, and it
scales with the seat. A `:focus-visible` seat that is also hovered (`scale: 1.1`)
therefore paints `2.2 + 4·1.1 = 6.6 px` past its layout box against a 4 px reserve.

`critic-1b` (Chromium, `ring-focus-hover.json`) reads `:focus-visible` true, `:hover`
true and `scale 1.1`. The seat's transformed box clears the run by 2 px top, bottom and
trailing, so the 4.4 px outline is clipped by 2.4 px on those edges at 390 and 1280.
Pointer off, the same seat clears by 4 px, so the ring fits exactly.

The block-axis share of this clip predates the patch: 10.1.4 reserved the ring alone on
block, and inline had no reserve, so 6.6 px was clipped there. Cure: the reserve is the
composed ink, `seat·(s − 1)/2 + ring·s`. `implement.md` "Open" names the `max()` as a
choice. The task's OD-13 clause ("the ring not clipped") is not met in this posture.

## Open gaps (not defects of this patch, or not reproduced)

- `<Input>` (`.field-control`) paints 14 px at coarse 390 in both engines, under the
  16 px iOS no-zoom floor that r6 states. It was 14 px at 10.1.4 too, and `implement.md`
  records it.
- value.js's 2 px rest reach (166/164) was not reproduced at rest with glass's own seats,
  in either engine, at any width or posture. Only hover produces it, and the reserve now
  absorbs that. value's `inv0` row is its first read, and its main layer is consumer
  components (`DockViewSelect`, `ActionBarToggle`, `MobileMenuDropdown`,
  `ProfileSection`). If 10.1.5 still reads reach there, the source is a consumer seat.
- Select options and Command rows (`_shared/menu/rowClass.ts`) carry no icon-slot gap.
  They are outside r7's DropdownMenuItem row and were not measured.
- In light mode the thumb (`--card`, rgb(253,245,236)) on the warm fill is about 1.3:1
  before `--shadow-sm`. It is visible, but on contrast it is the weakest part of the r5
  cure. Not filed.
- WebKit 2311 not run (O-99).

## Addendum — the WebKit cells that did not run

`guarded --exclusive webkit` waited about 60 minutes for the machine-wide WebKit lock,
which the live BL design loops held (`run-b-webkit.log` ends at "waiting for the 'webkit'
lock"). I stopped my queued runs before they launched a browser. As a result, these
cells are **Chromium-only**:
- the D4 ring probe (`critic-1b`);
- the D1 marks probe (`critic-1c`);
- the WebKit rerun of the 10.1.5, 10.1.4 and 10.1.3 release specs (the implementer's
  WebKit 2287 logs stand for g6).

What WebKit did bank (`webkit/slider.json`, `webkit/dock-postures-*.json`) gives the same
thumb, fill and seat geometry as Chromium to the pixel. The mark line is the same CSS
`p·track` in both engines. So D1 and D4 are expected in WebKit, but neither is witnessed
there. D2 and D3 are witnessed in both engines. Re-run in WebKit 2287:
`npx playwright test -c tests-visual/release-10-1-5-critic-1.config.ts --project=webkit release-10-1-5-critic-1b.spec.ts release-10-1-5-critic-1c.spec.ts --workers=1`.

The first Chromium posture run timed out on a body click that a probe step made
(`run-chromium.log`, 2 of 7). That step was replaced with a blur, and the rerun passed
3/3 (`run-chromium-2.log`). The banked posture rows are from the rerun.
