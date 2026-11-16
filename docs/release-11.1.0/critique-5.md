# glass-ui 11.1.0 · critique 5

A fresh adversarial critic (round 5), run by claude-fable-5-2 as the owner ordered, on
`release/11.1.0` at `5a27994f3` (fix 5). It built nothing on the branch. It read every commit
in `master..release/11.1.0`, the records in `docs/release-11.1.0/`, and the three
orchestrator notes (`-fable-review`, `-mark-press`, `-table-nested`) as binding.

**This round ran in two sittings.** The first seat ran for about three hours on 2026-11-11
(12:59 to 16:10) and was stopped to free the machine for 11.0.1. It left its drivers, logs
and captures under `critic-5/` and no written judgment. The second sitting (2026-11-12,
06:45 to 08:01) kept every cell the first had banked with its log, ran what it had not
reached, and wrote this record. Every judgment below was made in the second sitting from the
logs and captures, then read a second time against the capture or the source line it cites.

Every browser run went through `~/.claude/guard/guarded`, every WebKit run under
`--exclusive webkit`, one run at a time. **The guard refused nothing.** WebKit is Playwright's
build 2287 throughout. Trees: the branch; `git archive v11.0.0` at `.cache/c1-v1100`; and the
fix seats' pre-fix trees (`.cache/f3-pre`, `f4-pre`, `f5-pre`) for their own witnesses.

Three runs were stopped by this critic, none by the guard, and each is in `chain.log`:
a first-sitting harness that imported the library one directory too high (fixed and rerun);
a second-sitting e2e driver whose wait matched an old log line and started early (it was
waiting on the WebKit lock when stopped; its one finished Chromium run had run alone); and
the WebKit tail, cut short when three other sessions were queued on the lock (what was
dropped is listed under "What ran").

Records, all under `critic-5/`: `chain.log` (every run and its exit, in order),
`summary.txt` (the verdict line of every witness), `gates/`, `api/`, `e2e/`,
`fix{2,3,4,5}-witness/`, `c2-probe/`, `probe/`, `probe4/` to `probe7/` and
`rerun/lane-L{1..7}/` (earlier witnesses and probes, copied unchanged), `probe8/` (this
round's own harness and probe), `sheets/` (contact sheets; PNGs are ignored by git, as
before), and the drivers `run.sh`, `run-a.sh` to `run-h.sh`.

## Verdict

Not ready to tag. Fix 5 cured critique 4's three findings, and every lane's claim reproduced
again on both trees in both engines. This round's own probe went to the places fix 5 said it
left alone, and found four things on the dock's run mark and glyph controls:

1. A glyph control that carries both `active` and `aria-current` gets a larger plate than
   one with `aria-current` alone, and in Chromium a second shape inside it (medium, both
   engines). That pair is how an 11.0.0 consumer showed a plate on a glyph nav link.
2. A page that flips direction at runtime strands the mark off its control (low, both
   engines; tab controls followed the flip on v11.0.0).
3. After fix 5 a hovered glyph control's plate is smaller than an `active` one's, and the
   CHANGELOG sentence about it is true only of `aria-current` controls (low).
4. An image value in `--dock-icon-hover-bg` painted on v11.0.0 and paints nothing now, and
   the CHANGELOG does not say so (low).

Separately, and not a defect of any item: **`master` has moved to 11.0.1 and the branch no
longer merges cleanly** (nine source and test files conflict, eight of them the dock's). The
tree that gets tagged will not be the tree any critic has read. That is under "For INBOUND"
and it bounds what this record can certify.

## What ran

| run | branch Chromium | branch WebKit | v11.0.0 Chromium | v11.0.0 WebKit |
| --- | --- | --- | --- | --- |
| fix 5 witness | 40/40 | 40/40 | 0/40 | 0/40 |
| fix 5 witness on its pre-fix tree `f5db152c9` | 13/40 | 13/40 | | |
| fix 4 witness | 17/17 | 17/17 | 11/17 | 11/17 |
| fix 4 witness on its pre-fix tree | 11/17 | 11/17 | | |
| fix 3 witness | 26/26 | 26/26 | layout 5/5, gap 0/7, frames 2/2, Slider 3/3, tempo 1/1, tabs 4/8 | the same |
| fix 3 witness on its pre-fix tree | layout 1/5, gap 1/7, Slider 1/3, tempo 0/1, tabs 4/8 | the same | | |
| fix 2 witness | 60/60 | 60/60 | 36/60 | 36/60 |
| critic 2's probe | 23 cells, 0 errors | 23 cells, 0 errors | same | same |
| critic 3's probe | 36 cells, 0 errors | 36 cells, 0 errors | same | not rerun |
| lane L1 | 27/27 | 27/27 | exit 1 | exit 1 |
| lane L2 | 33/33 | 29/29 + 4 unmeasurable | 3/29 + 4 unmeasurable | the same |
| lane L3 | 18/18 | 18/18 | 6/18 | 6/18 |
| lane L4 | 28 pass, 0 fail | 26 pass, 0 fail | 6 pass, 22 fail | 4 pass, 22 fail |
| lane L5 | 60/60 | 60/60 | 26/60 | 26/60 |
| lane L6 | 161/161 | 155/155 | exit 1 | exit 1 |
| lane L7 | 80/80 | 79/80 | 4/64 | 14/64 |
| critic 4's `probe4` | 22 cells, 0 errors | 22 cells, 0 errors | same | not rerun |
| critic 4's `probe5`, `probe6`, `probe7` | as critique 4 read, with fix 5's cures | not rerun | as critique 4 read | not rerun |
| this round's `probe8` (a full pass, then the mount, active, both and direction cells again) | 0 errors | 0 errors | 0 errors | 0 errors |

**Not rerun in WebKit this round** (the lock was contended; each wait ran past ten minutes):
critic 3's probe and `probe4` on v11.0.0, and `probe5` to `probe7` on either tree. Their
subject on the branch, the run mark, is read in WebKit here by the fix-5 witness and by
`probe8`; their v11.0.0 halves were read in WebKit by critics 3 and 4 and v11.0.0 has not
changed.

**Lane L7, WebKit, 79/80.** The one failing cell is a stall cell that the instrument classed
as measurable this run on one frame inside the task (critique 3 saw the same class and said
the cell should ask for two frames); the other eleven stall cells were unmeasurable, as
recorded since lane L7. Its `drawn` cells read 16/16 in WebKit this run, where the five runs
before read 0/16. Neither is reopened; both say that Playwright WebKit on this machine is not
a steady instrument for this lane.

`probe5` reads 20/40 on the branch by its original rule (mark equals the control's layout
box); the 20 that miss are the glyph cells, whose plate sits inside the cell by design.
Critique 4 amended that rule, and the fix-5 witness is the amended one.

## Defects (reproduced)

`probe8` paints the selected plate magenta and reads its box from the screenshot, or leaves
the library's colours and reads pixels. All cells at 390 and 1440, light and dark.

### 1. `active` with `aria-current` on a glyph control: a larger plate, and two shapes in Chromium (medium)

**Why this is the common case.** On 11.0.0 a glyph `DockControl` showed a selected plate only
with `active`. A `RouterLink` sets `aria-current` by itself. So a consumer with a row of glyph
nav links that shows where you are has both on the current control today. The CHANGELOG tells
that consumer the control "now shows the selected plate, where before it showed one only with
`active`", and says nothing about keeping `active`.

**What the branch paints.** The run draws its mark, and the control's own `active` rung still
composes the capsule (`.glass-capsule`, its backdrop and its 50 % corner). The seat rule
under a marked run clears only `background-color` (`run.css:412-414`), and the `active` rung
sets its fill with the `background` shorthand (`icon-button.css:208-222`), which resets the
clip to `border-box`, so the mark measures the whole cell.

| current glyph control | plate box, fine pointer | 14 px in | 7 px in, 7 px down | 2 px in | a third along |
| --- | --- | --- | --- | --- | --- |
| branch, `aria-current` alone, both engines | 128 × 32 | 216,208,197 | 253,245,236 (dock) | 253,245,236 (dock) | 216,208,197 |
| branch, `active` + `aria-current`, Chromium | **136 × 40** | **225,213,196** | 216,208,197 | 226,214,197 | 220,208,191 |
| branch, `active` + `aria-current`, WebKit | **136 × 40** | 216,208,197 | 216,208,197 | 216,208,197 | 216,208,197 |
| v11.0.0, `active` + `aria-current`, both engines | 136 × 40 (the control's own oval) | 218,207,193 | 253,245,236 (dock) | 218,207,193 | 218,207,193 |

Light at 1440; 390 reads the same, and dark reads the same pattern (46,36,27 for the mark,
51,36,23 and 50,35,22 inside it in Chromium, 53,42,34 for the dock). In Chromium the pixels
inside the plate differ from each other and from the mark's colour: a stadium with an oval
inside it. In WebKit the plate is one colour, and 8 px larger on each axis than the same
control without `active`. So the dock's selected plate has two sizes again, by which props the
consumer happened to set, which is the class fix 5 closed for hover.

Paint: `critic-5/sheets/active-current-both-engines.png` (top two rows: branch Chromium,
branch WebKit, branch with `aria-current` alone, v11.0.0) and
`critic-5/sheets/active-current-chromium.png` (enlarged).

**A cure, half read.** With one rule laid over the branch, so that a control the run marks
paints nothing of its own (`background: none; box-shadow: none; backdrop-filter: none` on
`.dock-run[data-run-mark] [aria-current][data-active]`), every point reads the mark's colour
in both engines: one shape (`probe8`, cells named `cure-both-`). The box is still the whole
cell, because that rule's shorthand resets the clip too. This critic's attempt to read both
halves together (`both2-` cells) carried the same shorthand and so read the same thing; it
proves nothing more. The source cure is the two halves stated without the shorthand: under a
marked run the current control paints no fill, shadow or backdrop of its own, and its clip
stays the face's.

**Gate.** With `active` and `aria-current` both set on a glyph control, the five points above
and the plate's box equal those of the same control with `aria-current` alone, in both
engines, 390 and 1440, light and dark. RED on the branch today in every cell.

### 2. A runtime change of direction strands the mark (low)

The mark is written in physical pixels from the run's left edge, and it measures again only
when the destination changes or a control or the run resizes. Setting `dir="rtl"` on the
document of a live page mirrors the run and resizes nothing.

| after `document.documentElement.dir = "rtl"`, 1.5 s later | current control | plate painted at |
| --- | --- | --- |
| branch, glyph controls, 390, both engines | x 182 | **x 134** |
| branch, glyph controls, 1440, both engines | x 1232 | **x 1184** |
| branch, tab controls, 390 | x 131.8 (Chromium), 179.7 (WebKit) | **x 120**, **x 168** |
| branch, tab controls, 1440, both engines | x 1172 | **x 1110** |
| v11.0.0, tab controls, both engines, both widths | x 131.8 / 179.7 / 1172 | on the control (each control paints its own plate) |

At 1440 the plate lies across two tabs and covers neither
(`critic-5/sheets/active-current-both-engines.png`, bottom row, first tile, beside the same
cell on v11.0.0). It stays there until the next change of tab. A page loaded right-to-left
is fine (critic 4's `probe4`, and this round again), as is a change of orientation on a live
dock (`orient-` cells, both engines). So this reaches only a page with a language switch
that flips direction without a reload, which is why it is low; for tab controls it is a
regression from 11.0.0.

**Gate.** After a runtime flip of `dir`, the plate's box is the current control's plate box
within 1.5 px, glyph and tab controls, both engines. A cure at the root is to write the
mark's inline offset from the run's inline-start edge so it mirrors with the run; this was
not built or read.

### 3. A hovered glyph control's plate is now smaller than an `active` one's (low)

Fix 5 moved the hover and press fills inside the face's inset and left the `active` rung on
the shorthand, on purpose ("changing it would change what an `active` glyph seat paints").
The result, in one dock, both engines, light and dark, 390 and 1440:

| | `active` control | hovered control | `active` control hovered |
| --- | --- | --- | --- |
| v11.0.0 | 40 × 40 | 40 × 40 | 40 × 40 |
| branch | 40 × 40 | **32 × 32** | 40 × 40 |
| branch with `.dock-icon-button[data-active] { background-clip: content-box }` | 32 × 32 | 32 × 32 | 32 × 32 |

Paint: `critic-5/sheets/active-hover-chromium.png`, top row. The pressed theme toggle in the
CHANGELOG's own `#persistent-end` example is an `active` control, so it sits beside hovers
that are 8 px smaller. The CHANGELOG's headline and entry say the hover and press fills "sit
inside the same rounded plate as its selected fill"; that is true where the selected fill is
the run's mark and false where it is `active`.

The one declaration in the table's last row was read in both engines (`cure-active-hover-`
cells) and makes the three boxes one. Whether an `active` control insets in this release or
the sentence is narrowed to `aria-current` is the fix seat's call; today the paint and the
sentence disagree. Finding 1's cure needs the same declaration.

### 4. An image in `--dock-icon-hover-bg` no longer paints (low)

The rule's own comment says a consumer retunes the hover fill with `--dock-icon-hover-bg`.
Set to a gradient, a hovered glyph control painted it on v11.0.0 (0,200,0 at the probe point,
light and dark, both engines) and paints nothing on the branch (the dock's own 253,245,236
and 53,42,34), because `background-color` drops a value that is not a colour. Fix 5 recorded
this in its own record and not in the CHANGELOG. None of the five sibling consumers this
critic could read sets the token, and it is not in the README, so the reach is small; a
minor still should not drop a working value in silence. One CHANGELOG sentence cures it
(the token takes a colour), or the hover rule keeps `background` and restates the clip.

## Read and not called defects

- **The mark's first frame.** Fix 5 says the mark "is on its seat in the first frame
  painted". That holds when the dock mounts from a task (`mount-*-task`, both engines). When
  it mounts inside an animation-frame callback or a resize-observer step, the frame that
  first paints the dock has no mark and the next one does (`mount-*-raf`, `mount-*-ro`). A
  tab control paints its own plate in that frame, so nothing is missing; a glyph control
  shows no plate for one frame. One frame at mount is under what anyone sees, so this is a
  correction to the claim, not a finding.
- **A collapsible dock.** The mark is on its control after the dock opens, closes, opens
  again and changes tab, by script and by pointer, fine and coarse, glyph and tab controls
  (`cnav-` cells). The four that print FAIL are a fourth tab cut by the run's edge at 390;
  the control's own plate is cut the same way on v11.0.0.
- **The viewport narrowed to 320.** The mark stays on its control; where it prints FAIL the
  control itself is past the run's edge until scrolled, as on v11.0.0.

## What the ruling asked this critic to check

Source outside the dock has not changed since critique 4 (`git diff f5db152c9..HEAD` touches
`useDockRunMark.ts`, `icon-button.css`, one unit test, the CHANGELOG and the ratchet).

- **Item 1, the Collapsible.** `CollapsibleContent.vue` has no diff against `v11.0.0`. No
  phase engine, no observer. The change is in `disclosure.css` alone.
- **Item 2, the lateral swap.** The recede keyframe is `scale` alone and the group is
  `overflow: visible`; lane L2's paint cells are 4/4 in Chromium (the arriving card whole,
  `critic-5/sheets/items-webkit.png`, second row) and unmeasurable in WebKit, as recorded.
- **Item 3, one commit per row.** `617d62f73` and `b6393d385` hold source and tests only.
- **K12 and O-211 reverted whole** (no `SliderThumb.vue`, no `DockLayerSwitcher.vue`; the
  CHANGELOG claims neither). **G13 and G14 gated in both engines:** 4/4 each on the branch,
  2/4 each on v11.0.0.
- **Items 4 to 8 and the nested-table ruling:** as critique 4 read them; the fix-2 witness
  reproduces them cell for cell.
- **Item 9.** Not reopened. No reading here contradicts a lane's on any item in that list.
- **The mark-press note.** Fix 5 did what it asks; findings 1 to 3 are new measurements on
  ground fix 5 named as left alone.

## The dock, every posture

Lane L6's witness holds every posture at 390 and 1440, fine and coarse, light and dark:
161/161 in Chromium, 155/155 in WebKit. Read in paint
(`critic-5/sheets/dock-postures-chromium.png`): open horizontal and vertical, collapsed to
one control, to two, to a glyph with a reading, the persistent face at rest and opened by
hover and by long press, the trailing gap, the morph's mid-frame, and the
`--radius-dock: 1rem` bar. Capsules and circles throughout, no flattened or cut corner. The
regressions found on the dock are findings 1 to 3.

## A consumer of 11.0.0

`critic-5/api/compare.json` is byte-identical to critic 4's: no export, entry or `.d.ts`
file gone; the custom properties gone are `--hm-h` and the two route variables the CHANGELOG
headline names; the one class gone is Tailwind's `overflow-auto` on the table container.
Behaviour that changes for an unchanged consumer and is not in the CHANGELOG: findings 1 and
4.

## The CHANGELOG entry

Read in full against the tree. A scan for row and wave ids, lane, seat, critic, witness,
tranche, "build" and record paths finds none. It is accurate except for the sentence in
finding 3, the silence in finding 4, and the advice finding 1 makes necessary: a consumer who
set `active` on a glyph nav link to show where they are should be told what to do with it.

## Gates (committed tree, `5a27994f3`, first sitting)

`critic-5/gates.sh`, one guarded run: build 0, typecheck 0, demo:dist:build 0, vitest 0 (279
files; 2575 passed, 10 expected fail, 1 skipped), verify:package 0 and CLEAN with the bundle
ratchet equal at 3014881 as committed.

**e2e** (second sitting), seventeen specs, one worker, reports in `critic-5/e2e/`: 65 passed,
37 failed, 2 skipped of 104 on each tree in each engine; the failed title sets are identical
between the branch and v11.0.0 in Chromium and in WebKit (`e2e-compare.py`).
`handmark.spec.ts` is 10/10 on each. The runs rewrote five tracked files and dropped nine
untracked captures under `docs/tranches/`; this critic restored the five and deleted its
nine.

## For INBOUND (not defects of this release's items)

- **The branch no longer merges cleanly with `master`.** `master` holds 11.0.1
  (merge `f7705c0df`); `git merge-tree master release/11.1.0` conflicts in `.bundle-ratchet`,
  `CHANGELOG.md`, `GlassDock.vue`, the dock's `README.md`, `icon-button.css`, `morph.css`,
  `run.css`, `shell-regions.css`, `Slider.vue` and two dock unit tests. The close has to
  resolve those by hand, and the dock and Slider witnesses (lanes L1, L2 and L6, fixes 3 and
  5, `probe8`) have to run again on the merged tree before a tag. No critic has read that
  tree.
- **Selecting a control past the run's visible edge does not bring it into view**, on either
  tree; the mark is then cut by the edge just as the old plate was.
- **In WebKit, after the viewport narrows to 320**, one cell read the mark 23 px from its
  tab control for a moment and on it after a scroll (`narrow-tab`, WebKit only, once). Not
  reproduced a second time and not understood.
- **Thirty-seven e2e cases fail on both trees** and so cannot go red on a regression; five
  specs write captures into the tranche records as they run.
- **Lane L7's stall and `drawn` cells are unsteady in Playwright WebKit** (above); real
  Safari is unmeasured for both.
- **`package.json` still reads 11.0.0** and the CHANGELOG heading reads "unreleased"; the
  close bumps both.
- **`docs/tranches/BI/audit/visual/W-SHEET-RADIUS-readback.json`** still sits untracked in
  this worktree from an earlier seat.
- **A driver's wait should match a whole line.** This round's e2e driver waited on a word
  that an older log line already held and started early. The later drivers anchor the match.
- **The WebKit lock was held or queued by three other sessions for most of the second
  sitting.** A full WebKit pass of this release's witnesses takes about an hour of lock time.

## For the fix seat

1. Under a marked run, a current glyph control with `active` paints nothing of its own and
   keeps the face's clip. Gate: finding 1's.
2. The mark follows a runtime change of direction. Gate: finding 2's.
3. One plate box for hover, press, `active` and the mark on a glyph control, or the CHANGELOG
   sentence narrowed to what is true.
4. The CHANGELOG says `--dock-icon-hover-bg` takes a colour (or the rule keeps an image), and
   tells a consumer who set `active` on a glyph nav link what changes for them.
5. Fix 5's record: "in the first frame painted" holds for a mount from a task.
