# BM-0: the precepts

| field | value |
|---|---|
| release | none: docs, before every wave |
| status | complete: applied to `docs/precepts/` atop its `origin/main` (`51edb59`), uncommitted. The orchestrator commits it on precepts `main`, pushes that as a fast-forward, and bumps the submodule in glass |
| DESIGN | §12 |
| starts from | `study/pass-10/precepts.md`, as amended by the final fold |
| rests on | the owner's ratification of 2026-11-23 (IN O-426), his order on the toggle (IN O-428), O-171 (the menu's grow), choice 24 C (the goo) |
| sites | every site: `restraint.md` binds value.js, keyframes.js, fourier, daraksha and glass |

## How it was applied

The seat's earlier attempts applied the amendments on the morning of 2026-11-24, and when the owner's SCI-first order paused them the orchestrator kept them as commit `8e54c07` on precepts branch `bm/precepts-wip`, on the old base `7582235`. By the evening other sessions had pushed twelve commits to precepts `origin/main`, every one of them to `README.md`, so none touches the three files BM amends. The resumed seat fetched, fast-forwarded the checkout's `main` to `origin/main` (`51edb59`), took `8e54c07`'s edits onto it with `cherry-pick --no-commit`, left them unstaged, and amended two lines (below). `git -C docs/precepts diff` shows the amendments whole. The branch `bm/precepts-wip` is left as it was, on origin and locally; nothing was force-pushed.

## What it builds

Each amendment cites its ruling in the file's own style. Lines are the files' as amended.

**`motion-canon.md`**

- `:93-98`, P0a rule 6. A body that carries a speed turns round on the settle player, from the spring's own position and speed.
- `:109-113`, P0a's check gains the 30 fps line: a leg on the page's thread runs 167 ms or more; a shorter leg rides the compositor, whose rate in Low Power Mode is unread. It counts frames and bounds no share of travel.
- `:155-169`, P3 retitled and split: an entrance pairs opacity with scale or translate; an exit fades where it is, and a sheet leaves the way it came. The exit's curve and clock are the exit register's, set by 11.1.1 (IN O-434).
- `:184-205`, P5 rewritten around WebKit's compositor list: motion animates `translate`, `scale`, `rotate`, `transform` and `opacity`; WebKit's compositor also takes `filter` and `backdrop-filter`, and motion leaves both alone (`restraint.md`, "Transform and opacity only"); page-thread properties carry an effect of 200 ms or less; the curve is one the compositor takes in every supported Safari. The layout list and the reclaim paragraph stay.
- `:226-241`, P5's two orders with their lengths (the menu's grow, 370 ms on `bloom`; the dock's fusion layer on the 12.0.0 register), and the toast's vanish left to the owner.
- `:251-255`, P6 gains lengths, dips and the mark's fade.
- `:264-268`, P6's `DarkModeToggle` line: the reduced crossfade of the rays and the night on the glyph's 200 ms clock, the colour still tweening.
- `:307-318`, P7: the tokens as single `cubic-bezier()` curves, the sampled settle, keyframes.js computing and the browser playing, and the `linear()` lists standing until BM-3 ships.

**`restraint.md`**

- `:130-134`, the frequent-actions check: a keyed choice moves nothing and its mark fades across; every other keyed action moves as it does for the pointer (choice 18 C; P0 by "How conflicts settle" rule 1).
- `:213-226`, under the ceiling: choice 19 B's three counting rules, the counts over two (the fold 3, an open with the seat's split 5, a dialog's open and leave 3 each, the toggle's tap 3, a knob-and-readout slider's press 3), and the fusion layer's two nodes as the one exception to the nodes rule.
- `:60` (one blur) and `:146` (transform and opacity only; `:143` before the `:130` amendment) are unchanged, as the draft says: the blur register is W-R.1's, and choice 27 A keeps the line. Its exceptions are the ones P5 names.

**`affordance-map.md`**

- `:60-61`, the plate and the glyph ship in the dock-redesign minor (the release rule, IN O-429).
- `:80-90`, the plate's two strengths (6.5 % in light and 5 % in dark; 10 %), the tone on the plate, the glyph's colour kept, no drawn shape, and the toggle's hover-and-focus-only plate.
- `:181`, `:182`, `:191`, the DarkModeToggle, the SegmentedTabs pill indicator and the Slider rows, in the table's own columns. The Slider row carries 11.1.2's touch intent (LF-57) in its drag column.
- `:198-201`, a note that the three rows are the design to build to until their waves land.

## What the resumed seats changed in the first attempt's text

- **The base, re-read on 2026-11-25.** The seat fetched precepts `origin` again: `origin/main` is still `51edb59`, so the amendments stand on its head with nothing to merge. `8e54c07`'s three files differ from the working tree only in the two lines below and in line wrapping.
- **Line wrapping.** P5's first paragraph and the plate section's release sentence (`affordance-map.md:60-62`) are re-wrapped to the files' width; the words are unchanged.
- **P5's second sentence.** It read "These are the properties WebKit hands to its compositor", which leaves out `filter` and `backdrop-filter`, both of which WebKit's compositor takes (D§4.1; the final fold's B10-15). It now names them and says motion leaves them alone by `restraint.md`'s rule, so the precept states the same refusal D§6.6 does.
- **P7's last sentence.** "Until the tranche's springs wave ships" now names the wave, BM-3.

## Not applied, and why

- **The tabs-seam gate's arm (e)** (`tests/gates/tabs-seam.test.ts:222-234`). The draft adds an assertion that the indicator's transition list carries `translate` alone. That is a test, not a precept, and on master the list is `translate`, `width`, `height`, `opacity` (`src/components/tabs/styles/segmented.css:165-169`), which the arm asserts today (`:228`). Added now, it fails the suite. It moves to BM-4, which makes it true in the same commit.
- **P0a's exit curve.** The final fold struck the draft (A10-3), and 11.1.1 has since set the exit curve itself. Nothing to apply.
- **P4's `linear()` sentence** is left as written: it describes the shipped tokens until BM-3, and P7's new paragraph says so.

## Noted for BL, not BM's to amend

`README.md:275` and `:279` (atlas's dock rules, added by other sessions) name "glass 11.2.0" for the dock redesign. By the release rule that release is the dock-redesign minor. The lines are BL's and atlas's; BM-0 leaves them.

## Proof

The two critics of BM part 3 read the diff (`git -C docs/precepts diff`). The added lines pass `rg -P -i -f docs/tranches/BL/driver/register-lint.pattern` with no hit.
