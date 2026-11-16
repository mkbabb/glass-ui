# glass-ui 11.1.0 · critique 6

A fresh adversarial critic (round 6), run by claude-fable-5-2 as the owner ordered, on
`release/11.1.0` at `d98ba8a82` (fix 6). It built nothing on the branch. It read every commit
in `master..release/11.1.0`, the records in `docs/release-11.1.0/`, and the orchestrator
notes `-fable-review`, `-mark-press`, `-table-nested`, `-mark-box` and `-merge-master` as
binding.

**This round ran in two sittings.** The first ran on 2026-11-12 from 09:33 to 11:10 and was
ended by a machine reboot. It left its drivers, logs and captures under `critic-6/` and no
written judgment. The second (11:18 onward) kept every cell the first had banked with its
log, ran what it had not reached, and wrote this record. Every judgment below was made in
the second sitting from the logs and captures, then read a second time against the capture
or the source line it cites.

Every browser run went through `~/.claude/guard/guarded`, every WebKit run under
`--exclusive webkit`, one run at a time. **The guard refused nothing.** WebKit is
Playwright's build 2287. Trees: the branch; `git archive v11.0.0` at `.cache/c1-v1100`; the
fix seats' pre-fix trees (`.cache/f3-pre` to `f6-pre`) for their own witnesses.

Records, all under `critic-6/`: `chain.log` (every run and its exit, in order), `gates/`,
`api/`, `e2e/`, `fix{2,3,4,5,6}-witness/` and `rerun/lane-L{1..7}/` (the seats' witnesses,
copied unchanged), `probe9/` (this round's own harness and probe), `sheets/` (contact
sheets; PNGs are ignored by git, as before), and the drivers `run.sh`, `run6.sh`,
`follow.sh`, `gates.sh`, `e2e-chromium.sh`.

## Verdict

Not ready to tag, and this round does not count toward the two clean rounds.

1. **MERGE: master (v11.0.1) is not merged** (blocking). `git merge-base --is-ancestor
   v11.0.1 HEAD` fails. The next fix seat does the merge first, by
   `orchestrator-note-merge-master.md` and `orchestrator-note-mark-box.md` (the mark moves
   to its own element; 11.0.1's reserve boxes keep the run's `::before` and `::after`).
2. A dock control that carries its own `dir` (a language switch) gets the gliding plate on
   the wrong control. Fix 6 introduced it; the plate was on its control on the pre-fix tree
   and, for tab controls, on v11.0.0 (low).
3. A glyph control painted through the `--dock-active-*` variables with a border now shows
   a small disc inside a detached ring, where v11.0.0 filled the ring. The CHANGELOG does
   not say so (low).

Fix 6's four cures hold in both engines, and every lane and fix witness this round reached
reproduces on both trees. What WebKit did not reach is listed under "What ran"; findings 2
and 3 are Chromium readings.

## What ran

| run | branch Chromium | branch WebKit | v11.0.0 Chromium | v11.0.0 WebKit |
| --- | --- | --- | --- | --- |
| fix 6 witness | 16/16 | 16/16 | 4/16 | 4/16 |
| fix 6 witness on its pre-fix tree `9b339a599` | 0/16 | 0/16 | | |
| fix 5 witness | 40/40 | 40/40 | 0/40 | 0/40 |
| fix 5 witness on its pre-fix tree | 13/40 | 13/40 | | |
| fix 4 witness | 17/17 | 17/17 | 11/17 | 11/17 |
| fix 4 witness on its pre-fix tree | 11/17 | 11/17 | | |
| fix 3 witness | 26/26 | 26/26 | layout 5/5, gap 0/7, frames 2/2, Slider 3/3, tempo 1/1, tabs 4/8 | the same |
| fix 3 witness on its pre-fix tree | layout 1/5, gap 1/7, Slider 1/3, tempo 0/1, tabs 4/8 | the same | | |
| fix 2 witness | 60/60 | 60/60 | 36/60 | 36/60 |
| lane L1 | 27/27 | 27/27 | exit 1 | exit 1 |
| lane L2 | 33/33 | 28/29 + 4 unmeasurable | 3/29 + 4 unmeasurable | the same |
| lane L3 | 18/18 | 18/18 | 6/18 | 6/18 |
| lane L4 | exit 0 | exit 0 (fonts 8/8) | exit 1 | exit 1 (fonts 0/8) |
| lane L5 | 60/60 | 60/60 | 26/60 | 26/60 |
| lane L6 | 161/161 | 155/155 | exit 1 | not run |
| lane L7 | 80/80 | not run | 4/64 | not run |
| this round's `probe9` | 44 cells, 0 errors | not run | 44 cells, 0 errors | not run |

`probe9` also ran on fix 6's pre-fix tree in Chromium (44 cells, 0 errors).

**Lane L2, WebKit, 28/29.** The one failing cell is the menu's first strip at 1440 light:
its painted height read 42 px this run and 41 px in critique 5's run of the same tree, against
a 40 px trigger, on a threshold of pixels that includes the plate's soft edge. The other
four menu cells pass and the source has not changed since critique 5. An instrument edge,
not reopened.

**Not run in WebKit this round, and why.** Lane L6 on v11.0.0, lane L7 on either tree, and
`probe9` on any tree. From 12:26 to about 14:00 the WebKit lock was held by one run of
another session; lane L6 on the branch ran when it came free. From 14:05 the lock was held
again, and from 15:04 the machine sat at a load of 140 to 210 with the guard holding every
run for headroom. At 15:17 this critic stopped its own waiting runs by PID. The guard
refused nothing; these runs were never admitted. So **findings 2 and 3 are read in Chromium
only.** Both are in code and style that fix 6's witness reads the same in both engines
(16/16 each), and neither depends on an engine's paint; the fix seat's gate reads them in
WebKit.

## Defects (reproduced)

### 1. MERGE: master (v11.0.1) is not merged (blocking)

`git merge-base --is-ancestor v11.0.1 HEAD` exits 1 at `d98ba8a82`. Fix 6 started the merge,
read the conflicts and aborted it, with its reasons and its reading of both sides in
`fix-6.md`; the orchestrator's ruling on the mark's box followed. The tree that gets tagged
is not the tree this or any critic has read, so nothing below certifies it.

### 2. A control with its own `dir` gets the plate on the wrong control (low)

**What the branch does.** Fix 6 made the mark's inline offset logical: the stylesheet places
it at `inset-inline-start` on the run. The measure picks which edge to measure from by the
direction of the *control* (`useDockRunMark.ts:85` reads `getComputedStyle(seat)`, and
`:99` branches on its `direction`), while the run positions the mark by the *run's*
direction. When the two differ, the offset is measured from one edge and applied from the
other.

**Who has this.** A language switch: a row of controls each labelled in its own language,
with `dir="rtl"` (or `lang` plus `dir`) on the Arabic and Hebrew ones, on a left-to-right
page; or the reverse on a right-to-left page.

`probe9`, scene `seatdir`: four controls, the second and third with `dir="rtl"` on a
left-to-right page (and the first and fourth with `dir="ltr"` on a right-to-left page). The
plate is painted magenta and its box read from the screenshot.

| current control (its own direction differs from the run's) | its plate box | plate painted at |
| --- | --- | --- |
| branch, glyph, 390 and 1440, second control | x 80 | **x 128** (on the third control) |
| branch, glyph, third control | x 128 | **x 80** (on the second) |
| branch, tab, 1440, second control | x 116.5 | **x 201** |
| branch, tab, 1440, third control | x 185.6 | **x 126** |
| branch, glyph, right-to-left page, first control | x 1280 | **x 1136** (on the fourth) |
| pre-fix tree `9b339a599`, every cell above | | on the control |
| v11.0.0, tab controls | | on the control (each paints its own plate) |

Light and dark read the same. Controls whose direction matches the run's are on their box
in every cell. Paint: `critic-6/sheets/p9-seatdir-chromium.png` (the Arabic tab is current
and the plate is correct on v11.0.0 and the pre-fix tree; on the branch it lies across the
Arabic and Hebrew tabs). Not read in WebKit (above).

It is low because it needs a `dir` on the control itself. For tab controls it is a
regression from 11.0.0, and for both shapes from the tree before fix 6.

**Gate.** With `dir` set on a control against its run's direction, the plate's box is that
control's plate box within 1.5 px, glyph and tab, page loaded left-to-right and
right-to-left, both engines. RED on the branch. The root is one read: the branch on
direction belongs to the run (the element the offset is applied on), not to the control.
Not built or read here.

### 3. An `--dock-active-*` control with a border: a disc inside a detached ring (low)

Fix 6 gave the icon control's face clip a second selector so that every state fill sits
inside the inset. The fill moved; the border and the shadow of the same state did not.
The library's own comment (`controls/icon-button.css:177-181`) points consumers at the
`--dock-active-{bg,color,scale,border,shadow}` variables for an active treatment, with a
sibling consumer named, and that consumer sets a border and a ring shadow.

`probe9`, scene `cohort`: a glyph control with class `is-active` and
`--dock-active-bg` magenta, `--dock-active-border: 1px solid` green.

| | fill box | border box | dock colour showing between them |
| --- | --- | --- | --- |
| v11.0.0, and the pre-fix tree | 38 × 38 | 40 × 40 | none (the fill meets the border) |
| branch | **30 × 30** | 40 × 40 | **a 4 px ring** |

The same reading for `aria-expanded="true"`, at 390 and 1440, light and dark. In the sibling
consumer's own values (`cohort-real`), `critic-6/sheets/p9-cohort2x-chromium.png`: on
v11.0.0 a tinted disc with a rim and a glow; on the branch a smaller disc, a band of the
dock's own colour, then the rim and the glow as a separate ring. Not read in WebKit
(above).

The CHANGELOG says a glyph control's `active` fill now sits inside the plate. It does not
say that a border or a shadow set through these variables stays at the control's edge, so
the two part. An `active` control with the library's defaults has no border and reads as
one smaller disc (`critic-6/sheets/p9-act2x-chromium.png`), which is what the entry
describes.

**Gate.** With `--dock-active-border` set, the fill meets the border on every side
(no pixel of the dock's colour between them), both engines, light and dark; or the
CHANGELOG entry says in one sentence that the border and shadow of an active treatment
stay at the control's edge while the fill is inset, and how to bring them together.
Which of the two is the fix seat's call.

## Read and not called defects

- **An `active` control at the library's defaults.** The fill is 32 × 32 in a 40 × 40 cell
  and the capsule's rim and lift still draw at the cell's edge: the 4 px between them
  differs from the dock by 5 of 255 per channel, light and dark (`act-` cells). Below what
  the eye separates in `p9-act2x-chromium.png`; a reading, not a finding.
- **A run that scrolls, a runtime flip, a vertical dock.** The mark is on its control after
  a far control is selected and scrolled to, after `dir` flips at runtime, and after the
  next change of tab, on a page loaded either way (`long-` cells); a vertical dock keeps it
  through a flip and back (`vert-` cells). On the pre-fix tree the flipped cells miss, as
  critique 5 found.
- **Vitest under load.** The first sitting's committed-tree chain read vitest exit 1: two
  cases timed out and one worker failed to start, in a run whose import phase took 1,534 s
  on a machine at load 100 and over. The three files pass alone, 31/31
  (`gates/vitest-rerun-3files.log`). A load reading, not a defect of the tree.

## What the rulings asked this critic to check

Source outside the dock has not changed since critique 5.

- **Fable review item 1, the Collapsible.** `git diff v11.0.0 HEAD -- src/components/collapsible`
  is empty. No phase engine, no observer; the change is in `disclosure.css` alone.
- **Item 2, the lateral swap.** The group is `overflow: visible` under `lateral` and the
  recede keyframe is `scale` alone (`view-transition.css`). Lane L2's paint cells are 4/4
  in Chromium, the arriving card whole with four round corners
  (`critic-6/sheets/l2-390-chromium.png`, first two tiles), and unmeasurable in WebKit, as
  recorded.
- **Item 3, one commit per row.** `617d62f73` and `b6393d385` are on the branch, source and
  tests only. **K12 and O-211 reverted whole** (no `SliderThumb.vue`, no
  `DockLayerSwitcher.vue`; the CHANGELOG claims neither). **G13 and G14 gated in both
  engines:** 4/4 each on the branch, 2/4 each on v11.0.0 (fix-2 witness).
- **Items 4 to 6 and 8, and the nested-table ruling.** The fix-2 witness reproduces them
  cell for cell in both engines ("Table one surface" 4/4 against 0/4).
- **Item 9.** Not reopened. No reading here contradicts a lane's on any item in that list.
- **The mark-press note.** The fix-5 witness holds, 40/40 in both engines.
- **The mark-box and merge-master notes.** Not yet acted on; finding 1.

## The dock, every posture

Lane L6's witness holds every posture at 390 and 1440, fine and coarse, light and dark, in
Chromium (161/161) and in WebKit on the branch (155/155). The regressions found on the dock are findings 2 and 3.

## A consumer of 11.0.0

`critic-6/api/compare.json` (the built package against the 11.0.0 tarball) is identical to
critic 5's: no export, entry or `.d.ts` file gone; the custom properties gone are `--hm-h`
and the two route variables the CHANGELOG headline names; the one class gone is Tailwind's
`overflow-auto` on the table container. Behaviour that changes for an unchanged consumer and
is not in the CHANGELOG: finding 3. Behaviour that breaks: finding 2.

## The CHANGELOG entry

Read in full against the tree. A scan for row and wave ids, lane, seat, critic, witness,
tranche, "build" and record paths finds none. It is accurate except for the silence in
finding 3. The heading still reads "unreleased".

## Gates (committed tree, `d98ba8a82`, first sitting)

`critic-6/gates.sh`, one guarded run: build 0, typecheck 0, demo:dist:build 0, vitest 1
(under load, above; the three files pass alone), verify:package 0 with the bundle ratchet
equal at 3015106 as committed.

**e2e**, seventeen specs, one worker, Chromium, the branch: 65 passed, 37 failed, 2 skipped
of 104 (`critic-6/e2e/chromium-branch.json`). The failed title set is identical to critic
5's branch run, which was identical to v11.0.0 in both engines. Chromium on v11.0.0 and
WebKit on either tree were not run this round (above). The run rewrote five tracked files
and dropped ten untracked captures under `docs/tranches/`; this critic restored the five
and deleted its ten.

## For INBOUND (not defects of this release's items)

- **`package.json` still reads 11.0.0** and the CHANGELOG heading reads "unreleased"; the
  close bumps both.
- **Thirty-seven e2e cases fail on both trees** and so cannot go red on a regression; five
  specs write captures into the tranche records as they run.
- **Lane L2's menu cell reads its first strip to one pixel of a soft edge** and flipped
  this round on an unchanged tree; the cell should allow the plate's edge.
- **Lane L1's own runner under `lane-L1/` still reads the mark's offset from `translate`**,
  which fix 6 retired; the copies under `fix-6/l1/` and `critic-6/rerun/lane-L1/` read
  `left`. After the mark moves to its element, one runner should remain.
- **`docs/tranches/BI/audit/visual/W-SHEET-RADIUS-readback.json`** still sits untracked in
  this worktree from an earlier seat.
- **The WebKit lock was held by one run from another session for about ninety minutes** of
  this sitting and again after, and the browser pool had sixteen runs queued. A full WebKit pass of this
  release's witnesses takes about an hour of lock time.
- **A driver launched from zsh does not split a spec list held in a variable.** This
  round's first Chromium e2e launch found no tests for that reason; the drivers are bash.

## For the fix seat

1. Merge `master` first, with the mark moved to its own element, then the battery
   `orchestrator-note-merge-master.md` lists.
2. The mark's direction is the run's. Gate: finding 2's.
3. An active treatment with a border is one shape, or the CHANGELOG says what parts.
   Gate: finding 3's.
