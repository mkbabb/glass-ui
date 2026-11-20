# glass-ui 11.1.0 · critique 7

A fresh adversarial critic (round 7), run by claude-fable-5-2 as the owner ordered, on
`release/11.1.0` at `a6b92fbc3` (fix 7, the merged tree). It built nothing on the branch. It
read every commit in `master..release/11.1.0`, the records in `docs/release-11.1.0/`, and the
orchestrator notes `-fable-review`, `-mark-press`, `-table-nested`, `-mark-box` and
`-merge-master` as binding. Two more notes landed while it ran (`-after-fix-7`,
`-ci-browser-free`); they are read and answered under "For the fix seat" and "Open gaps".

Every browser and heavy run went through `~/.claude/guard/guarded`, every WebKit run under
`--exclusive webkit`, one run at a time. WebKit is Playwright's build 2287.

**The guard refused at 04:09:05 on 2026-11-13** (`kernel zone data.kalloc.1024 at 8.05M …
reboot the Mac`), and the first sitting stopped there, committed as `6f3df31a7`. **This
record is that one, amended in place on 2026-11-14 after the reboot.** The resumed sitting
ran only what the refusal cut (`critic-7/chain7d.sh`, `chain.log` from the `RESUME` line):
the two reruns, the fix-3 witness in WebKit on both trees, v11.0.0 in WebKit for the fix-2,
fix-4 and fix-5 witnesses and lanes L1 to L5, the 11.0.1 release specs in WebKit, and the
e2e specs in WebKit on both trees. The guard admitted every one (one-minute load 13 to 40;
lock and headroom waits only). Every cell banked before the stop is kept with its log and
was not run again. **The round is now fully measured.** The resumed runs changed no finding:
they cleared the two unconfirmed readings and found nothing new.

Records, all under `critic-7/`: `chain.log` (every run and its exit, in order, the refusal
included), the drivers `chain7.sh`, `chain7b.sh`, `chain7c.sh`, `run.sh`, `gates.sh`,
`release.sh` (fix 7's, retargeted to this folder), the seats' witnesses copied unchanged
(`fix{2..6}-witness/`, `rerun/lane-L{1..7}/`, `probe9/`), this round's own harness and probe
(`probe10/`), `gates/head/`, `release/`, `e2e/`, `api/`, and contact sheets under `sheets/`
(PNGs are ignored by git, as before). Trees: the branch; `git archive v11.0.0` at
`.cache/c1-v1100`; `v11.0.1` at `.cache/f7-v1101`; the pre-merge tree at `.cache/f7-pre`.

## Verdict

Not ready to tag.

1. The gliding selected plate comes off its tab when a control before it changes width in
   a dock that is already as wide as it can be (a phone-width nav). On 11.0.0 and 11.0.1
   the plate stays on its tab (low; both engines).
2. The CHANGELOG headline's list of defaults that change the look leaves out the one the
   merge put back: `--radius-dock` (and `rounded-dock`) is a stadium, where 11.0.0 and
   11.0.1 ship 16 px (low).

Fix 7's cures hold in both engines, the merge is in (`git merge-base --is-ancestor v11.0.1
HEAD` exits 0), and every lane and fix witness reproduces on both trees in both engines:
green on the branch, red on v11.0.0.

## What ran

| run | branch Chromium | branch WebKit | v11.0.0 Chromium | v11.0.0 WebKit |
| --- | --- | --- | --- | --- |
| probe9 (fix 7's gates: box, seatdir, pad0) | 24/24 | 24/24 | 12/24 | 12/24 |
| probe9 on the pre-merge tree `a3d963af2` | 4/24 | not run | | |
| this round's probe10 (plate on its control, 40 judged cells) | 36/40 | 36/40 | 24/40 | 24/40 |
| probe10 on v11.0.1 | 24/40 (Chromium) | | | |
| fix 6 witness | 16/16 | 16/16 | 4/16 | 4/16 |
| fix 5 witness | 40/40 | 40/40 | 0/40 | 0/40 |
| fix 4 witness | 17/17 | 17/17 | 11/17 | 11/17 |
| fix 3 witness | 26/26 | 26/26 | layout 5/5, gap 0/7, frames 2/2, Slider 3/3, tempo 1/1, tabs 4/8 | the same six readings, 15/26 |
| fix 2 witness | 60/60 | 60/60 | 36/60 | 36/60 |
| lane L1 | 27/27 | 27/27 | exit 1 | 0/27 |
| lane L2 | 33/33 | 29/29, O-173 paint unmeasurable (4) | 3/29 + 4 unmeasurable | 3/29 + 4 unmeasurable |
| lane L3 | 18/18 | 18/18 | 6/18 | 6/18 |
| lane L4 | exit 0 | exit 0 | exit 1 | exit 1 (fonts 0 of 8) |
| lane L5 | 60/60 | 60/60 | 26/60 | 26/60 |
| lane L6 | 161/161 | 155/155 | exit 1 | exit 1 |
| lane L7 | 80/80 | 62/80, then 80/80 on the rerun (below) | 4/64 | 16/64 |

probe10's four branch misses are finding 1. Its sixteen misses on v11.0.0 and v11.0.1 are the
glyph cells: those trees draw no plate on a glyph control with `aria-current`, which is what
this release adds.

The v11.0.0 column in WebKit is the resumed sitting's. Every item is red there as it is in
Chromium: lane L1's 27 cells all fail (no unclipped collapsed seat, no run mark, the rim off
the border, the rim writing on a tick), and the fix-2 witness reads the nested table 0/4,
the Collapsible gap 0/4, G13 and G14 2/4 each.

**Lane L7 in WebKit: 62/80 on the first pass, 80/80 on the rerun. Cleared.** The first
pass's 18 misses were the sixteen "drawn: once, after the last stroke frame" cells and two
stall cells. In all sixteen the page's own record was right (`count: 1, running: 0,
finalAtDrawn: true`); the cell failed because the screencast held no frame after the event
(`firstFrameAfterDrawn: -1`). The rerun on a calm machine (`rerun/lane-L7/out/
green-webkit.log`; the first pass kept in `out-first/`) reads the sixteen 16/16. Read twice:
the same source, the same page record, and the cells pass when the screencast holds frames,
so the first reading was the instrument. The rerun's stall cells read "unmeasurable" (no
compositor frame inside the task; recorded, not gated), so the two stall misses are neither
reproduced nor a pass: `orchestrator-note-after-fix-7.md` restates that cell to two frames.

The 11.0.1 release specs on the branch (`critic-7/release/runs.txt`), both engines:

| spec | Chromium | WebKit |
| --- | --- | --- |
| `release-10-1-5` part A | 84/84 | 84/84 |
| `release-10-1-5` part B | 22 passed, 1 failed; 23/23 on the rerun (below) | 23/23 |
| `release-10-1-4` | 23/23 | 15 passed, 8 skipped (as fix 7) |
| `release-10-1-3` | 53 passed, 7 failed: fix 7's seven titles exactly (`release/g6-3-ch-failed.txt`) | 53 passed, 5 failed, 2 skipped: fix 7's five (four open-side seat clicks, the dwell after a right-click) |
| `release-10-1-2` | 44 passed, 8 failed: fix 7's eight titles exactly | 44 passed, 8 failed: the same eight |
| `release-11-0-1` (owner cells) | 9/9 | 9/9 |
| `release-11-0-1-fix-2` | 14/14 | 14/14 |
| `release-11-0-1-critic-2` | 9/9 | 9/9 |

**`release-10-1-5` part B: one failure under load, 23/23 on the rerun. Cleared.** "critique
10, coarse phone › p2 a 1-2 px host change across the fit edge mid-expand holds every seat
at the settle" failed once (`release/partB-ch.log`: a seat read 30.6 px mid-morph against
20.5 px at rest) in a run that started at a one-minute load of 246. The rerun of all of
part B in Chromium at a load of 37 passes 23/23 (`release-rerun/runs.txt`), and WebKit reads
23/23 too. Read twice: fix 7 green on this source, this rerun green, WebKit green, one miss
at a load of 246. The cell samples a morph at fixed delays; the miss was the machine.

The two failing sets that remain (`release-10-1-3`'s D-1 cells, `release-10-1-2`'s eight
O-101 cells) are not new: the first is the owner's later rule and
`orchestrator-note-after-fix-7.md` orders those cells restated; the second fails the same
way on v11.0.0 and 11.0.1.

**Gates, committed tree `a6b92fbc3`** (`gates/head/chain.log`, one guarded run): build 0,
typecheck 0, demo:dist:build 0, vitest 0 (279 files; 2579 passed, 10 expected fail,
1 skipped), verify:package 0, CLEAN, the bundle ratchet equal at 3030691 as committed.

**e2e**, the seventeen specs, one worker, Chromium: the branch 65 passed, 37 failed,
2 skipped; v11.0.0 the same; the failed title sets are identical to each other and to fix 7's
(`e2e/chromium-*-fails.txt`). WebKit 2287: the branch 65 passed, 37 failed, 2 skipped;
v11.0.0 the same; the 37 titles are the same on both trees and the same as fix 7's WebKit
set (`e2e/webkit-*-fails.txt`). So the e2e specs show no regression and no cure in either
engine. Each run rewrote five tracked captures under `docs/tranches/BA/audit/visual/`; this
critic restored them both times.

## Defects (reproduced)

### 1. The selected plate comes off its tab when an earlier control changes width (low)

**What the branch does.** The run's plate is placed from one measure of the current control,
taken when the destination changes, when a direct child of the run is added or removed, or
when the run or the *current* control resizes (`useDockRunMark.ts:176-178` observes the run
and the current control only; `:207-209` drops every mutation inside a control). A control
*before* the current one that changes width moves the current control without resizing it.
If the run's own box does not change either, nothing measures again and the plate stays
where the control used to be until the next navigation.

**Who has this.** A navigation dock that is as wide as it can be (any dock on a phone whose
tabs scroll, or a dock with a set width) with a label that changes: a count in a tab
("Inbox 3" to "Inbox 12"), a label that loads late, a locale switch where the current tab's
word keeps its width. On a dock that sizes to its content the run itself resizes and the
plate follows; that case is green.

`probe10`, scene `tick`: tab controls with one marked current, the plate painted magenta and
its box read from the screenshot against the current control's plate box. The first
control's label is rewritten ("Overview" to "Overview (128)", then to "O"), then a control
is added at the front.

| cell (390, light and dark alike) | step | control's plate at x | plate painted at x |
| --- | --- | --- | --- |
| branch, eight tabs, Chromium and WebKit | label longer | 132.9 | **95** (38 px short) |
| branch, eight tabs, Chromium and WebKit | label shorter | 132.8 | **183** (50 px past) |
| branch, four tabs, Chromium and WebKit | label longer | 119 | **81** |
| branch, four tabs, Chromium and WebKit | label shorter | 118.8 | **169** |
| branch, either | a control added at the front | on the control | on the control |
| v11.0.0 and v11.0.1, Chromium; v11.0.0, WebKit | every step | | on the control |
| branch at 1440 (the dock sizes to its content), both engines | every step | | on the control |

Paint: `critic-7/sheets/p10-tick-390.png` (row 1 the branch in Chromium, row 2 the branch in
WebKit dark, rows 3 and 4 v11.0.0 and v11.0.1: the plate lies across "Results" and
"Discussion", then across "Discussion" and "Appendix", on the branch only). Logs
`probe10/out/{green,red,v1101}-{chromium,webkit}.log`, cells `tick-*`.

It is a regression from 11.0.0 and 11.0.1 for tab controls, where each control paints its own
plate and so cannot part from it. It is low because it needs a width change ahead of the
current tab in a run that does not resize. The Fable review's item 5 asked for the observer
to ignore what happens inside a control, and that stands: the missing read is a sibling's
*resize*, which costs nothing while nothing resizes.

**Gate.** In a marked run that does not resize, after a control before the current one
changes width (longer and shorter), the plate's painted box is the current control's plate
box within 1.5 px, tab and glyph, 390 and 1440, light and dark, both engines. RED on the
branch at 390 (`probe10`, `tick-*`); green on v11.0.0 for tabs. Not built here.

### 2. The CHANGELOG headline leaves out `--radius-dock` (low)

The headline says "these defaults change how a page looks without you doing anything, and
each has its own entry below". Before the merge its first line was "the dock rests as a
capsule (`--radius-dock: 1rem` brings back the rounded bar)". The merge dropped that line,
rightly for the dock itself, which 11.0.1 already rounds. Two changes it also covered remain
and are now in no line of the list:

- **The token's value.** `--radius-dock` is `1rem` on 11.0.0 and on 11.0.1 and a stadium on
  the branch, so a consumer's own box with `rounded-dock` or `var(--radius-dock)` goes from a
  16 px corner to fully round ends. `probe10`, scene `radius` (a 240 × 96 box of each kind),
  computed `border-top-left-radius`: `16px` on v11.0.0 and v11.0.1; `3.35544e+07px` on the
  branch in Chromium and `3.4e+38px` in WebKit, at 390 and 1440, light and dark. The
  library's own demo does this (`demo/stories/feedback/progress.vue:233`, a wrapper matched
  to the dock's corner).
- **A value the consumer already sets.** On 11.0.1 a host's `--radius-dock` no longer set the
  stadium dock's corner (its CHANGELOG says so); on the branch it does again, so a theme
  that still carries `--radius-dock: 0.75rem` from 11.0.0 gets a bar back on upgrading from
  11.0.1 (fix 7's own round-1 reading: 28 to 32 px where the host asked for 16 px, before
  `6dc977fe2`; lane L6's host-bar cells green after it).

The entry "`--radius-dock` sets the dock's corner again" says both in its body. The defect is
the headline: it promises to be the whole list, and a reader who stops there misses this one.

**Gate.** The headline list names the `--radius-dock` change in one line (the token and
`rounded-dock` are a stadium, and a `--radius-dock` you set shapes the dock again), or the
entry is otherwise reachable from it; `fix-7/changelog-check.sh` gains that line.

## Read and not called defects

- **The mark after a closed dock opens.** `probe10`, scene `cnav`: a dock mounted closed, with
  a `#collapsed` glyph and as a persistent face, tab and glyph controls; opened, the current
  control changed while closed, opened again, changed while open, and changed in the same
  task as the open. The plate is on its control at every step, 16/16 cells in each engine.
  On the merged tree, where the collapsed run is no scroll container, this had not been read.
- **Separators and both persistent regions beside a marked run**, under the default corner
  and under a host's `--radius-dock: 1rem` (`sep-*`): on its control in 16/16 cells in each
  engine. The host bar reads a 16 px dock and plate corner, the default 28 px on a 56 px
  dock at 1440. At 390 the default dock's plate reads 16 px because that run hides controls
  at both ends and 11.0.1's cue cuts both; as published.
- **The dock in paint.** `sheets/l6-chromium-390.png` and `l6-chromium-vert.png`: open, open
  with a persistent seat, collapsed square, two-cell, wide ("Now 12"), persistent face,
  both regions, vertical open and collapsed, light and dark: every one a clean capsule or
  circle, no flat end, no second shape.
- **The nested table** (`sheets/table-webkit.png`): on the page the quiet plate with round
  corners; inside a Card one surface, corners kept. As ruled.
- **The lateral swap** (`sheets/l2-390.png`): the arriving card whole with round leading
  corners over the receded one, Chromium; unmeasurable in WebKit, as recorded since lane L2.

## What the rulings asked this critic to check

- **Fable review item 1, the Collapsible.** `git diff v11.0.0 HEAD -- src/components/collapsible
  src/components/accordion` is empty. No phase engine, no observer; the change is in
  `disclosure.css` (no opacity lines; the gap as the content's top padding, as fix 3 and
  fix 4 left it).
- **Item 2, the lateral swap.** `overflow: visible` on the window group under `lateral`; no
  `--route-card-sink`, no `--route-card-dim`, no brightness on the card
  (`view-transition.css`); lane L2's paint cells 4/4 in Chromium.
- **Item 3, one commit per row.** `617d62f73` and `b6393d385` are on the branch, source and
  tests only. K12 and O-211 reverted whole (no `SliderThumb.vue`, no
  `DockLayerSwitcher.vue`; the CHANGELOG claims neither). G13 and G14 gated: 4/4 each on the
  branch in both engines, 2/4 each on v11.0.0 (Chromium this round).
- **Items 4 to 6 and 8, and the nested-table ruling.** The fix-2 witness reproduces them in
  both engines on the branch ("Table one surface" 4/4, against 0/4 on v11.0.0 in Chromium);
  `.viz-bar` and `.viz-ripple` animate `backwards`; the grain clause is in the CHANGELOG.
- **Item 9.** Not reopened. No reading here contradicts a lane's on any item in that list.
- **The mark-press note.** The fix-5 witness holds, 40/40 in both engines.
- **The mark-box note.** One `.dock-run-mark` element, inert; the reserve boxes keep
  `::before` and `::after`; `:not(.dock-run-mark)` in the seat rules and `isRunSeat` in
  script (`probe9` `box-*` 4/4 in both engines, and no rule in `src/` selects every run child
  without the exclusion).
- **The merge-master note.** v11.0.1 is an ancestor of HEAD; `release.yml` and
  `scripts/dist-tag.mjs` are master's as of that merge. master has moved since (open gaps).

## A consumer of 11.0.0 and of 11.0.1

`critic-7/api/compare.json` (the built package against the 11.0.0 tarball): no export, entry
or `.d.ts` file gone; the custom properties gone are `--hm-h` and the two route variables the
headline names; the one class gone is Tailwind's `overflow-auto` on the table container.
Against v11.0.1 by source (`git diff v11.0.1 HEAD` over every `index.ts` and
`package.json`, and the declared custom properties of both trees): additions only, and the
same three properties gone. Behaviour that changes for an unchanged consumer and is not in
the headline: finding 2. Behaviour that breaks: finding 1.

## The CHANGELOG entry

Read in full against the tree. No row or wave ids, no lane, seat, critic, witness or tranche
vocabulary, no record paths. Accurate except for finding 2. The heading reads "unreleased"
and `package.json` reads 11.0.1; the close sets both.

## For INBOUND (not defects of this release's items)

- **A collapsed vertical dock's glyph sits 9 px left of centre.** With a bare glyph in
  `#collapsed` on a vertical dock, the summary pane is centred but stretches its child, and
  the glyph sits at the pane's start: 9 px off the plate's centre on the branch, v11.0.0 and
  v11.0.1 alike, both engines (`probe10`, `centre-vertical-*`; the horizontal twin reads 0).
  Paint: `sheets/colv-compare.png`. As published; not this release's.
- **Thirty-seven e2e cases fail on both trees** and so cannot go red on a regression; five
  specs write captures into the tranche records as they run.
- **Lane L7's "drawn" cells in WebKit depend on the screencast holding a frame after the
  event.** When it holds none, sixteen cells fail on a correct page. The cell should read the
  page's own record first and say "unmeasurable" when the screencast is empty, as its stall
  cells do.
- **`release-10-1-5` p2 (coarse phone) failed once at a load of 246** and passed in fix 7's
  run and in this round's rerun; a cell that samples a morph at fixed delays needs a calm
  machine or a frame-indexed read.
- **A second pass of a witness over the same output folder overwrites the first pass's
  log.** This round's refused pass replaced the green WebKit logs of lanes L1 to L5 and the
  fix-2 witness with the guard's refusal line; their verdicts stand in `chain.log` and in the
  `green-webkit.json` beside each. Drivers should write a refused run to its own file.
- **The kernel zone reached 8.05M at 04:09 on 2026-11-13** and the guard refused until the
  reboot; after it the zone reads under 0.1M.

## Open gaps

- Nothing is left unmeasured: the cells the refusal cut ran on 2026-11-14 and are in the
  tables above.
- **Lane L7's stall cells in WebKit were unmeasurable on the rerun** (no compositor frame
  inside the task), so the first pass's two one-frame readings stand as the only ones this
  round; the cell is to ask for two frames (next item).
- **`orchestrator-note-after-fix-7.md` is not yet acted on:** the seven D-1 cells of
  `release-10-1-3.spec.ts` still assert that a press on a persistent seat expands the dock
  (7 failed in Chromium, 5 in WebKit), and lane L7's WebKit stall cell still asks for one frame.
- **master has moved past the merge** (`git merge-base --is-ancestor master HEAD` exits 1:
  the browser-free Actions and the sparse checkout, `4db0b22dd` and `ee1dc2935`).
  `orchestrator-note-ci-browser-free.md` gives it to the close seat, with a ratchet rebind.
- The version and the CHANGELOG date are the close's.

## For the fix seat

1. The plate follows its control when a sibling resizes. Gate: finding 1's.
2. One headline line for `--radius-dock`. Gate: finding 2's.
3. The two instructions of `orchestrator-note-after-fix-7.md` (the seven D-1 cells restated
   to the owner's rule; lane L7's stall cell asking for two frames).
4. Nothing is owed from the stop: the WebKit cells and the two reruns ran after the reboot
   and are green where the branch should be and red where v11.0.0 should be.
