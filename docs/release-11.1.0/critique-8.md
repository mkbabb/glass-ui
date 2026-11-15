# glass-ui 11.1.0 · critique 8

A fresh adversarial critic (round 8), run by claude-fable-5-2 as the owner ordered, on
`release/11.1.0` at `acd8db1eb` (fix 8, amended). It built nothing on the branch. It read
every commit in `master..release/11.1.0`, the records in `docs/release-11.1.0/`, and the
orchestrator notes `-fable-review`, `-mark-press`, `-table-nested`, `-after-fix-7`,
`-mark-box`, `-merge-master` and `-ci-browser-free` as binding.

Every browser and heavy run went through `~/.claude/guard/guarded`, every WebKit run under
`--exclusive webkit`, one run at a time. WebKit is Playwright's build 2287. **The guard
refused nothing this round.** The WebKit lock was shared with other sessions and each wait
was a wait, not a refusal. Disk read 74 to 97 GB free throughout.

Records, all under `critic-8/`: `chain.log` (every run and its exit, in order), the drivers
`chain8.sh`, `run.sh`, `gates.sh`, `release.sh`, `rerun8.sh`, the seats' witnesses copied
unchanged (`fix{2..6}-witness/`, `rerun/lane-L{1..7}/`, `probe9/`, `probe10/`; lane L7's
probe is fix 8's restated one), this round's own harness and probe (`probe11/`),
`gates/head/`, `release/`, `release-rerun/`, `e2e/`, `api/`, and contact sheets under
`sheets/` (PNGs are ignored by git, as before). Trees: the branch; `git archive v11.0.0` at
`.cache/c1-v1100`; `v11.0.1` at `.cache/f7-v1101`; the pre-fix-8 tree at `.cache/f8-pre`.

## Verdict

Not ready to tag. Two defects, both on the dock items this release ships, both reproduced
in Chromium and WebKit and both green on v11.0.0 and v11.0.1.

1. The gliding selected plate is the wrong size and in the wrong place whenever the dock
   sits under a transform or a CSS `zoom`: permanently under an ancestor `zoom` or a scaled
   wrapper, and until the next navigation when the dock mounts inside anything that is
   still scaling in, the library's own `Dialog` included (medium).
2. A dock with an always-visible control whose `#collapsed` content appears after the dock
   has mounted shows that content in a summary that is no button: no role, no tab stop, no
   name. On 11.0.0 and 11.0.1 it is the "Expand dock" button (low).

Fix 8's cures hold in both engines. Every lane and fix witness reproduces on both trees in
both engines: green on the branch, red on v11.0.0.

## What ran

| run | branch Chromium | branch WebKit | v11.0.0 Chromium | v11.0.0 WebKit |
| --- | --- | --- | --- | --- |
| probe10 (fix 8's gate: the plate on its control, 40 cells) | 40/40 | 40/40 | | |
| probe10 `tick` on the pre-fix-8 tree | 4/8 | 4/8 | | |
| probe9 (fix 7's gates) | 24/24 | 24/24 | 12/24 | 12/24 |
| fix 6 witness | 16/16 | 16/16 | 4/16 | 4/16 |
| fix 5 witness | 40/40 | 40/40 | 0/40 | 0/40 |
| fix 4 witness | 17/17 | 17/17 | 11/17 | 11/17 |
| fix 3 witness | 26/26 | 26/26 | gap 0/7, tabs 4/8, the rest green | the same |
| fix 2 witness | 60/60 | 60/60 | 36/60 | 36/60 |
| lane L1 | 27/27 | 27/27 | exit 1 | exit 1 |
| lane L2 | 33/33 | 28/29, then 29/29 on the rerun (below); O-173 paint unmeasurable (4) | 3/29 + 4 unmeasurable | 3/29 + 4 unmeasurable |
| lane L3 | 18/18 | 18/18 | 6/18 | 6/18 |
| lane L4 | exit 0 | exit 0 | exit 1 | exit 1 |
| lane L5 | 60/60 | 60/60 | 26/60 | 26/60 |
| lane L6 | 161/161 | 155/155 | exit 1 | exit 1 |
| lane L7 | 80/80 | 64/80 on both passes: the sixteen "drawn" cells, the screencast (below) | 4/64 | 16/64 |
| this round's probe11 (60 cells) | 12/60 | 12/60 | 24/60 | 24/60 |
| probe11 on v11.0.1 | 24/60 | 24/60 | | |

probe11's 48 branch misses are findings 1 and 2. Its 36 misses on v11.0.0 and v11.0.1 are
not defects of those trees: 24 are the glyph cells (those trees draw no plate on a glyph
control with `aria-current`), 4 are the table cells (no rounded container there), and 8
are the slot cells, whose pass line asks for the persistent face those trees do not have.
Every one of their 24 tab cells is on its control.

**Lane L2 in WebKit: 28/29 on the first pass, 29/29 on the rerun. Cleared.** The miss was
O-171 at 1440 light: the menu's first painted strip read 42 px tall against a 38.4 px
anchor (the cell allows 2). The dark twin read 40 in the same run, and the capture
(`rerun/lane-L2/out/png/green-webkit-o171-first-1440-light.png`) shows the strip the
trigger's height with its shadow under it; the row count takes the shadow's first rows in
light. Read twice: the same source green in critic 7 and fix 7, the dark twin green, the
rerun green (`out-first/` keeps the first pass).

**Lane L7 in WebKit: 64/80 on the first pass and 64/80 on the rerun. Not a defect of the
page; not cleared by a green run either.** All 16 misses, in both passes, are the "drawn:
once, after the last stroke frame" cells, and in all 32 readings the page's own record is
right (`count: 1, running: 0, finalAtDrawn: true`): the cell fails because the screencast
held no frame after the event (`firstFrameAfterDrawn: -1`). This is the condition critique
7 met on its first pass and cleared on a rerun; fix 8 read 80/80 on this source four hours
earlier (`fix-8/rerun/lane-L7/out/green-webkit.log`), and Chromium reads 80/80 this round.
Read twice: the source is unchanged since fix 8's green run, the page record is correct in
every cell, and the missing datum is the instrument's frame. The WebKit lock was shared all
evening (each run of this critic waited 15 to 55 minutes), so a third pass was not taken.
The stall cells read "unmeasurable" (fewer than two compositor frames in the task),
recorded and not gated, as ruled. Both passes are kept (`rerun/lane-L7/out-first/`,
`out/`).

The 11.0.1 release specs on the branch (`critic-8/release/runs.txt`), both engines:

| spec | Chromium | WebKit |
| --- | --- | --- |
| `release-10-1-5` part A | 84/84 | 84/84 |
| `release-10-1-5` part B | 23/23 | 23/23 |
| `release-10-1-4` | 23/23 | 15 passed, 8 skipped |
| `release-10-1-3` | 59 passed, 1 failed; 60/60 on the rerun (below) | 58 passed, 2 skipped |
| `release-10-1-2` | 44 passed, 8 failed: the eight O-101 titles, as fix 7 | 44 passed, 8 failed: the same eight |
| `release-11-0-1` (owner cells) | 9/9 | 9/9 |
| `release-11-0-1-fix-2` | 14/14 | 14/14 |
| `release-11-0-1-critic-2` | 9/9 | 8/9, then 8/9, 9/9, 7/9 on three reruns (below) |

**`release-10-1-3` in Chromium: one failure under load, 60/60 on the rerun. Cleared.** "390
· right-anchored · ancestor zoom 1.25 › the summary glyph holds its box" read a largest
frame step of 2.099 px against a bound of 2, in a run at a one-minute load of 36. The rerun
at a load of 10 passes 60/60 (`release-rerun/g6-3-ch.log`); fix 8 read 60/60 on this
source. The restated D-1 cells pass in both engines, so `orchestrator-note-after-fix-7.md`
is done.

**`release-11-0-1-critic-2` in WebKit: the reader, not the dock. Cleared by arithmetic.**
"a vertical dock's end in paint through the expand" fails when the screenshot catches the
morph's very first frame (22 to 25 ms, scale `1 0.282407`), and passes when the first
capture lands later (42 ms in the passing rerun; 28 to 49 ms in fix 7's and critic 7's
runs, which is why they read 9/9). On that frame the vertical dock's box is 68 wide by
60.7 tall at 390 coarse, and 64 by 58 at 1440: shorter than its cross extent. The reader
asks for a circle of half the cross extent (34 px), which cannot fit in a 60.7 px box. The
dock paints a stadium of half the shorter side: the read inset is 16.3 px, and a 30.3 px
radius gives 16.38; at 1440 the read is 15.3 and a 29 px radius gives 15.38. So the paint
is the capsule the release promises, and the cell's expectation is wrong for a box shorter
than it is wide. Its source is in lane L6's open gaps (a collapsed vertical dock is 58 px
against an open 64). The queued comparison on the pre-fix and v11.0.1 trees was stopped
before it started: the arithmetic settles it. Booked under "For INBOUND".

**Gates, committed tree `acd8db1eb`** (`gates/head/chain.log`, one guarded run): build 0,
typecheck 0, demo:dist:build 0, vitest 0 (279 files; 2580 passed, 10 expected fail,
1 skipped), verify:package 0, CLEAN, the bundle ratchet equal at 3030858 as committed.

**e2e**, the seventeen specs, one worker. Chromium: the branch 65 passed, 37 failed,
2 skipped; v11.0.0 the same. WebKit 2287: the same counts on both trees. In each engine the
37 failing titles are identical on the two trees and identical to fix 8's set
(`e2e/*-fails.txt`). So the e2e specs show no regression and no cure in either engine.

## Defects (reproduced)

### 1. The selected plate is off its control under a transform or a zoom (medium)

**What the branch does.** `useDockRunMark.ts:94-95` measures the run and the current
control with `getBoundingClientRect()`, which returns boxes after every ancestor
transform and zoom, and `paint` (`:142-148`) writes those numbers as `px` lengths on the
run, where they are laid out in the run's own untransformed coordinates and then
transformed again. So the plate's offset and size carry the scale twice.

`orchestrator-note-mark-press.md` named this door for a pressed control and named the
cure ("the mark reads layout boxes ... which a transform does not change"). Fix 5 found the
press no longer scales a dock control, so it left the measure alone. The door is still
open for every transform that is not the control's own.

`probe11`: a five-tab navigation dock with one control current, the plate painted magenta
and its box read from the screenshot against the current control's own plate box (viewport
px, within 2). Read at rest, then after the current control changes. Numbers below are
1440 light; 390, dark and WebKit read the same way (`probe11/out/*.log`).

| where the dock sits | control's plate | plate painted | v11.0.0 and v11.0.1 |
| --- | --- | --- | --- |
| on the page | 131.7, 136 × 38 | 132, 136 × 38 | on |
| an ancestor with `zoom: 1.25` | x 160.7, 170 × 47.5 | **x 194, 213 × 52** | on |
| the same, after a navigation | x 395 | **x 487** (92 px past) | on |
| an ancestor with `zoom: 0.8` | x 108.6, 108.8 × 30.4 | **x 91, 87 × 25** | on |
| an ancestor with `transform: scale(0.8)` | x 108.6, 108.8 × 30.4 | **x 91, 87 × 24** | on |
| a wrapper that grows in from `scale(0.8)` as the dock mounts, at rest | x 131.7, 136 × 38 | **x 110, 109 × 30** | on |
| the same, after a navigation | x 319.1, 136 × 38 | 319, 136 × 38 | on |
| inside the library's `Dialog`, once it has opened | x 600.7, 136 × 38 | **x 596, 130 × 36** | on |
| the same, after a navigation | x 788.1 | 788, 136 × 38 | on |

48 of the 48 moved-dock cells are off on the branch in each engine (tab and glyph, 390 and
1440, light and dark); the 8 plain cells are on. Paint:
`sheets/p11-chromium-1440-light-rest.png` (left the branch, right v11.0.0: the plate lies
across "Methods" and "Results" under zoom 1.25, and sits short and left of "Methods" in
the other four) and `sheets/p11-webkit-dark.png`.

**Who has this.** Two groups.

- *Permanently off:* a dock under a CSS `zoom` (11.0.1 supports and witnesses the dock
  under `zoom: 1.25`, `release-10-1-3.spec.ts`), or inside a scaled stage: a preview pane,
  a device frame, a slide that scales to fit. The plate never lands on its tab, before or
  after a navigation.
- *Off until the next navigation:* a dock that mounts while something around it is still
  scaling in. The first measure runs one frame after mount, mid-entrance, and nothing
  measures again because no box resizes. The library's own `Dialog` is such a place (its
  plate blooms from 0.94), and so is any consumer panel, card or route that enters on a
  scale. In the `Dialog` the plate rests 6 px narrow and 4.7 px left of its tab; under a
  `scale(0.8)` entrance, 27 px narrow and 21 px left.

It is a regression from 11.0.0 and 11.0.1 for tab controls, where each control paints its
own plate and so cannot part from it. For glyph controls the plate is new in this release
and is wrong the same way. It is medium, not low: the first group is a published,
witnessed posture of the dock, and the second needs nothing unusual, only a dock inside a
dialog.

**Gate.** The settled plate's painted box is the current control's plate box within 2 px,
tab and glyph, 390 and 1440, light and dark, both engines, at rest and after a navigation,
for a dock (a) under an ancestor `zoom` of 1.25 and of 0.8, (b) under an ancestor
`transform: scale(0.8)`, (c) mounted in a wrapper that is scaling in, and (d) inside the
library's `Dialog`. RED on the branch (`probe11`, 48/48 off in each engine); green on
v11.0.0 and v11.0.1 for tabs. The measure is the cure's place, as the mark-press note says:
layout boxes against the run, with no second measure and no timer. Not built here.

### 2. A `#collapsed` slot that arrives after mount is no button (low)

**What the branch does.** `GlassDock.vue:256-258` decides whether the collapsed dock is
"just its always-visible controls" in a `computed` over `useSlots()`. The slots object is
not reactive, so the computed runs once, at mount, and never again. The template around
it does re-render when a slot comes or goes, so the two disagree from then on.

`probe11`, scene `dynslot`: a `collapse="closed"` dock with a `#persistent` control, whose
`#collapsed` slot is rendered conditionally.

| | summary's content | `role` | `tabindex` | `aria-label` |
| --- | --- | --- | --- | --- |
| branch, mounted without the slot | none (0 px) | none | none | none |
| branch, the slot then appears | glyph and "Now", 55.6 to 61.1 px | **none** | **none** | **none** |
| v11.0.0 and v11.0.1, the slot then appears | glyph, 40 px | `button` | `0` | "Expand dock" |
| branch, mounted with the slot | glyph and "Now" | `button` | `0` | "Expand dock" |
| branch, the slot then goes | none (0 px) | `button` | `0` | "Expand dock" |

8 of 8 cells in each engine (390 and 1440, light and dark, both directions). Paint:
`sheets/p11-webkit-dark.png`, bottom left (the summary shows its glyph and "Now" beside
the persistent control, and is nothing to a screen reader or to Tab).

**Who has this.** A dock that shows its collapsed reading only sometimes: a count that
exists once data loads, a "Now" reading on some routes
(`<template v-if="reading" #collapsed>`), beside a theme toggle in `#persistent`. A click on
the summary still opens the dock, and the persistent control still opens it from the
keyboard, so nothing is unreachable; what is lost is the summary's name, role and tab
stop, which 11.0.0 and 11.0.1 give it. The other direction (the slot goes) leaves an empty
0 px "Expand dock" button in the tab order, which is what 11.0.0 always had there, so it
is no regression; one cure covers both.

**Gate.** With a `#persistent` control, the summary is `role="button"`, `tabindex="0"` and
named exactly while `#collapsed` has content, whether the slot was there at mount, came
later or went, 390 and 1440, both engines. RED on the branch (`probe11`, `dynslot-*`, 8/8
in each engine); the "comes" state is green on v11.0.0 and v11.0.1. Not built here.

## Read and not called defects

- **Fix 8's cure.** probe10 reads 40/40 on the branch and 4/8 on the pre-fix tree in both
  engines, as fix 8 recorded. The observer now watches every seat; a resize while the glide
  is live is still ignored, and the settle re-reads.
- **The dock in every posture** (`sheets/l6-chromium-postures-390.png`,
  `-postures-1440.png`, `l6-chromium-face.png`): open, open with a persistent control,
  collapsed square, two-cell, wide ("Now 12"), the persistent face leading, trailing and
  both, vertical open and collapsed, fine and coarse, light and dark. Every one is a clean
  capsule or circle with no flat end and no second shape. Lane L6 reads 161/161 and
  155/155, with the coarse long-press cells and the fine hover cells in both.
- **The nested table, in a `Dialog` too.** The fix-2 witness reads a `Card`; probe11 adds
  the library's `Dialog` (`.glass-floating`): the container is transparent with no shadow
  and a 16 px corner, 4/4 in each engine, and a table on the page keeps the quiet plate
  (`sheets/l3-chromium-390.png`, `sheets/p11-webkit-dark.png`). As ruled.
- **The lateral swap** (`sheets/l2-chromium-swap.png`): the arriving card whole with round
  leading corners over the receded one, Chromium; unmeasurable in WebKit, as recorded since
  lane L2.
- **The collapsed seat, the border rim and the mark at rest** (`sheets/l1-chromium.png`):
  "Now 12" in a capsule, the rim on the border at half and full, the plate on its tab.

## What the rulings asked this critic to check

- **Fable review item 1, the Collapsible.** `git diff v11.0.0 HEAD -- src/components/collapsible
  src/components/accordion` is empty. No phase engine and no observer; the change is in
  `disclosure.css` (no opacity lines; the gap as the content's top padding, with fix 4's
  `revert-layer`).
- **Item 2, the lateral swap.** `overflow: visible` on the window group under `lateral`; no
  sink, no dim; lane L2's paint cells 4/4 in Chromium.
- **Item 3, one commit per row.** `617d62f73` and `b6393d385` are on the branch. K12 and
  O-211 are reverted whole (no `SliderThumb.vue`, no `DockLayerSwitcher.vue`). G13 and G14
  are gated: 4/4 each on the branch and 2/4 each on v11.0.0, in both engines.
- **Items 4 to 6 and 8, and the nested-table ruling.** The fix-2 witness reproduces them in
  both engines ("Table one surface" 4/4 against 0/4); `.viz-bar` and `.viz-ripple` animate
  `backwards`; the grain clause is in the CHANGELOG.
- **Item 9.** Not reopened. No reading here contradicts a lane's on any item in that list.
- **The mark-press note.** The fix-5 witness holds, 40/40 in both engines. Finding 1 is the
  same measure through an ancestor's transform, with a new measurement.
- **The mark-box note.** One inert `.dock-run-mark` element; probe9's `box-*` cells 4/4 in
  both engines.
- **The after-fix-7 note.** The seven D-1 cells are restated and pass; lane L7's stall
  cell asks for two frames.

## A consumer of 11.0.0 and of 11.0.1

`critic-8/api/compare.json` (the built package against the 11.0.0 tarball): no export,
entry or `.d.ts` file gone; exports added on four entries only; the custom properties gone
are `--hm-h` and the two route variables the headline names; the one class gone is
Tailwind's `overflow-auto` on the table container. Behaviour that breaks for an unchanged
consumer: findings 1 and 2.

## The CHANGELOG entry

Read in full against the tree. No row or wave ids, no lane, seat, critic, witness or
tranche vocabulary, no record paths (`changelog-check.out`: PASS on every line, the
headline's `--radius-dock` line included). Accurate. The heading reads "unreleased" and
`package.json` reads 11.0.1; the close sets both.

## For INBOUND (not defects of this release's items)

- **`release-11-0-1-critic-2`'s vertical cell asks for a circle of half the cross extent
  on a frame whose box is shorter than its cross.** It fails whenever WebKit's first
  screenshot lands inside the morph's first 25 ms (three of four runs this round) and
  passes otherwise. The cell should take half the shorter side, or skip a frame whose main
  extent is under its cross.
- **Lane L7's "drawn" cells in WebKit still depend on the screencast holding a frame after
  the event** (critique 7's note, not yet acted on). This round they missed 16 of 16 on two
  passes with the page's own record correct every time. The cell should read the page's
  record first and say "unmeasurable" when the screencast is empty, as its stall cells do.
- **Lane L2's O-171 first-strip cell counts the plate's shadow rows in light**, so it sits
  1.6 px from its bound and missed once this round.
- **`release-10-1-3`'s zoom cell bounds a frame step at 2 px and read 2.099 at a load of
  36**; a frame-indexed read would not depend on the machine.
- **Thirty-seven e2e cases fail on both trees** and so cannot go red on a regression; five
  specs write captures into the tranche records as they run. The five tracked captures
  under `docs/tranches/BA/audit/visual/` were already modified when this round began and
  are left as found.
- **A dock wider than a 390 px `Dialog` is cut at the dialog's edge** (the probe's own
  harness; as on v11.0.0).

## Open gaps

- **Lane L7's stall cells in WebKit are unmeasurable** (fewer than two compositor frames
  inside the task), recorded and not gated, as ruled.
- **Lane L7's sixteen "drawn" cells in WebKit had no green run this round** (64/80 twice,
  the page record correct in all of them; fix 8's 80/80 on the same source stands as the
  last green reading). A close seat with a quiet WebKit lock should take one more pass.
- **master has moved past the merge** (`git merge-base --is-ancestor master HEAD` exits 1):
  the browser-free Actions and the sparse checkout. `orchestrator-note-ci-browser-free.md`
  gives it to the close seat, with a ratchet rebind.
- The version and the CHANGELOG date are the close's.
- Real Safari, real iOS and Android touch are not measured; WebKit is Playwright's 2287.

## For the fix seat

1. The run's mark measures layout boxes against the run. Gate: finding 1's.
2. The persistent face follows the slots as they are on each render. Gate: finding 2's.
