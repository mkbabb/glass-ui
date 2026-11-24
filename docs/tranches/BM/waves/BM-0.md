# BM-0: the precepts

| field | value |
|---|---|
| release | none: docs, before every wave |
| status | complete: applied by the formation seat on 2026-11-24 to `docs/precepts/` (a submodule on `main` at `7582235`), uncommitted; the orchestrator commits it and bumps the submodule |
| DESIGN | §12 |
| starts from | `study/pass-10/precepts.md`, as amended by the final fold |
| rests on | the owner's ratification of 2026-11-23 (IN O-426), his order on the toggle (IN O-428), O-171 (the menu's grow), choice 24 C (the goo) |
| sites | every site: `restraint.md` binds value.js, keyframes.js, fourier, daraksha and glass |

## What it builds

Each amendment cites its ruling in the file's own style. Lines are the files' as amended.

**`motion-canon.md`**

- `:93-98`, P0a rule 6. A body that carries a speed turns round on the settle player, from the spring's own position and speed.
- `:109-114`, P0a's check gains the 30 fps line: a leg on the page's thread runs 167 ms or more; a shorter leg rides the compositor, whose rate in Low Power Mode is unread. It counts frames and bounds no share of travel.
- `:155-169`, P3 retitled and split: an entrance pairs opacity with scale or translate; an exit fades where it is, and a sheet leaves the way it came. The exit's curve and clock are the exit register's, set by 11.1.1 (IN O-434).
- `:184-203`, P5 rewritten around WebKit's compositor list: motion animates `translate`, `scale`, `rotate`, `transform` and `opacity`; page-thread properties carry an effect of 200 ms or less; the curve is one the compositor takes in every supported Safari. The layout list and the reclaim paragraph stay.
- `:224-239`, P5's two orders with their lengths (the menu's grow, 370 ms on `bloom`; the dock's fusion layer on the 12.0.0 register), and the toast's vanish left to the owner.
- `:249-253`, P6 gains lengths, dips and the mark's fade.
- `:262-266`, P6's `DarkModeToggle` line: the reduced crossfade of the rays and the night on the glyph's 200 ms clock, the colour still tweening.
- `:305-317`, P7: the tokens as single `cubic-bezier()` curves, the sampled settle, keyframes.js computing and the browser playing, and the `linear()` lists standing until BM-3 ships.

**`restraint.md`**

- `:129-134`, the frequent-actions check: a keyed choice moves nothing and its mark fades across; every other keyed action moves as it does for the pointer (choice 18 C; P0 by "How conflicts settle" rule 1).
- `:213-226`, under the ceiling: choice 19 B's three counting rules, the counts over two (the fold 3, an open with the seat's split 5, a dialog's open and leave 3 each, the toggle's tap 3, a knob-and-readout slider's press 3), and the fusion layer's two nodes as the one exception to the nodes rule.
- `:60` (one blur) and `:143` (transform and opacity only) are unchanged, as the draft says: the blur register is W-R.1's, and choice 27 A keeps `:143`. Its exceptions are the ones P5 names.

**`affordance-map.md`**

- `:60-62`, the plate and the glyph ship in the dock-redesign minor (the release rule).
- `:80-91`, the plate's two strengths (6.5 % in light and 5 % in dark; 10 %), the tone on the plate, the glyph's colour kept, no drawn shape, and the toggle's hover-and-focus-only plate.
- `:181`, `:182`, `:191`, the DarkModeToggle, the SegmentedTabs pill indicator and the Slider rows, in the table's own columns.
- `:198-201`, a note that the three rows are the design to build to until their waves land.

## Not applied, and why

- **The tabs-seam gate's arm (e)** (`tests/gates/tabs-seam.test.ts:222-234`). The draft adds an assertion that the indicator's transition list carries `translate` alone. That is a test, not a precept, and on master the list is `translate`, `width`, `height`, `opacity` (`src/components/tabs/styles/segmented.css:165-169`), which the arm asserts today. Added now, it fails the suite. It moves to BM-4, which makes it true in the same commit.
- **P0a's exit curve.** The final fold struck the draft (A10-3), and 11.1.1 has since set the exit curve itself. Nothing to apply.
- **P4's `linear()` sentence** is left as written: it describes the shipped tokens until BM-3, and P7's new paragraph says so.

## Proof

The two critics of BM part 3 read the diff (`git -C docs/precepts diff`). The added lines pass `rg -P -i -f docs/tranches/BL/driver/register-lint.pattern` with no hit.
