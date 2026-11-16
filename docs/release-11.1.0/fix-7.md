# glass-ui 11.1.0 · fix 7

The fix seat before critic 7, run by claude-opus-5-5 on `release/11.1.0` in
`.claude/worktrees/release-11.1.0`, from `a3d963af2` (critique 6). It takes critique 6's
three findings in the order the round ruled: the merge of master first, then the two dock
lows, then the cells round 6 left unrun. Every browser run went through
`~/.claude/guard/guarded`, every WebKit run under `--exclusive webkit`, one run at a time.
**The guard refused nothing.** Runs waited for headroom (load to 100+ at 17:20-17:40) and for
the WebKit lock; no lock wait passed 60 minutes. WebKit is Playwright's build 2287.

Commits, read from `git log` (the merge's own are in `merge-master.md`): `cee4c03eb` (the
merge), `5d88be18e`, `0bd7ed13d`, `17dc90052`, `ecefe3260`, `6dc977fe2`, `e086a8767`, and
the records commit that carries this file.

Trees: the branch (`e086a8767` for every reading below unless a row says otherwise); the
pre-merge tree `.cache/f7-pre` (`git archive a3d963af2`); v11.0.0 at `.cache/c1-v1100`;
v11.0.1 at `.cache/f7-v1101` (`git archive v11.0.1`). Driver `fix-7/chain.sh` (critic 6's
`run.sh` and lane runners, copied unchanged except as listed under *Instruments*), every run
and exit in `fix-7/chain.log`. Round 1 of the battery ran at `17dc90052`/`ecefe3260` and is
kept under `*/round1`; round 2, at `e086a8767`, is the reading of record.

## 1. MERGE: master (v11.0.1) is merged (blocking)

`git merge-base --is-ancestor v11.0.1 HEAD` exits 0. The record is `merge-master.md`: every
conflict read on both sides, the mark moved to its own element as `orchestrator-note-mark-box.md`
rules, one corner mechanism (11.0.1's measured cross extent, bounded by the owner's
`--radius-dock` knob), the trailing gap folded into 11.0.1's layers-margin rule set.

Three defects surfaced only on the merged tree, and are cured at their root:

- **`useDockRunMark` threw without a ResizeObserver** (`ecefe3260`). `release-10-1-5`'s h4
  (a host with no ResizeObserver) timed out on the branch in round 1. The mark now observes
  seat resizes only where the host has one, as the dock's endpoints do. Unit cell
  `GlassDock.run-mark.test.ts` "mounts and marks without a ResizeObserver": RED on the
  source before `ecefe3260`, GREEN after; h4 passes in round 2 (below).
- **The owner's `--radius-dock` knob** (`6dc977fe2`). The first merge commit kept 11.0.1's
  corner alone, which ignores `--radius-dock` on the stadium; lane L6's 22 host-bar cells then
  read 28-32 px corners where the host asked for 16 px. O-199's ruling names that knob, so the one rest length is
  `min(var(--radius-dock), calc(var(--dock-cross) / 2))` with `--radius-dock` the stadium.
- **Reduced motion on 11.0.1's run clip** (`0bd7ed13d`). The branch holds the plate's cut cap
  still under reduced motion; 11.0.1 added a scroll-driven clip on the run that follows the
  plate's corner. Under reduced motion the clip now holds the plate's rest corner with no
  animation, so the plate and its clip keep one corner and lane L6's O-198 (nothing but opacity
  animates) holds: 3/3 in Chromium.

### The mark's own element (the ruling's witness), `fix-7/probe9` scene `box`

A marked horizontal run that fits, and its unmarked twin, at 390 and 1440, light and dark.
PASS when: both reserve boxes (`::before`, `::after`) read the same computed content, position,
inline size and margins marked as unmarked, in flow; the mark is one `.dock-run-mark` element,
`aria-hidden`, no tabindex attribute, `tabIndex` −1, `scroll-snap-align: none`,
`pointer-events: none`, `position: absolute`, and its box and its magenta paint lie on the
current seat's plate within 1.5 px; seat count, tab stops and the toolbar role equal the
twin's; both read `data-run-fits` and the mark adds no scroll.

"Adds no scroll" is read against the twin, not against zero: a content-sized run that fits
keeps 11.0.1's yield remainder (its reserve boxes stop at the ring's reach), so it reads
`scrollWidth = clientWidth + 4` marked and unmarked, on this branch and on v11.0.1 alike
(`probe9/out/v1101-chromium.log`, `box-*`). The ruling's "scrollWidth equals clientWidth" is
11.0.1's own invariant only on a run with room past the ring.

| tree | Chromium | WebKit 2287 |
| --- | --- | --- |
| branch | **4/4** | **4/4** |
| pre-merge `a3d963af2` (the mark is the run's `::before`: reserves absolute, no element) | 0/4 | 0/4 |
| v11.0.1 (reserves, no mark) | 0/4 | 0/4 |
| v11.0.0 (no reserves, no mark) | 0/4 | 0/4 |

The unit half: `GlassDock.run-mark.test.ts` "is no seat" (the mark is not in `isRunSeat`'s
list, the run keeps `role="toolbar"`, no tabindex) and the CSS detectors (no `data-run-mark`
anywhere in `run.css`, the reserve gate reads `:has(> :not(.dock-run-mark))`, no
`:has(> *)`); `g-dock-lattice.test.ts` reads the seat rule as `> :not(.dock-run-mark)`.

## 2. A control with its own `dir` got the plate on the wrong control (low)

**Root.** `useDockRunMark.plateOf` chose the measuring edge from the seat's computed
`direction`, while the stylesheet places the mark at `inset-inline-start` on the run. **Cure.**
The edge is the run's inline start, read from the run's own direction, the element the offset
is applied on (`plate(run, seat)` in `useDockRunMark.ts`, in the merge commit).

**Witness**, `probe9` scene `seatdir` (critique 6's, judged): four controls, the second and
third with `dir="rtl"` on a left-to-right page (the first and fourth `dir="ltr"` on a
right-to-left page), glyph and tab, the current control stepped 1, 0, 2, 3; PASS when the
magenta plate lies on that control's plate box within 1.5 px at every step. The instrument
compares what lies inside the run's port, as critique 6's `long-*` cells already did: at 390
the tab run scrolls and its last tab is cut by the port (critique 6's own green log reads that
cut tab as off by its hidden 14 px on every tree).

| tree | Chromium | WebKit 2287 |
| --- | --- | --- |
| branch | **16/16** | **16/16** |
| pre-merge `a3d963af2` (critique 6's RED) | 0/16 | 0/16 |
| v11.0.0 and v11.0.1 (each control paints its own plate; the glyph cells miss) | 8/16 | 8/16 |

Paint: `probe9/out/png/green-{chromium,webkit}-seatdir-*.png` and the same under `pre-`.

## 3. A bordered `--dock-active-*` treatment: a disc inside a detached ring (low)

The CHANGELOG now says it, in one sentence with the remedy, in the glyph-control paragraph:
a border or shadow set through the `--dock-active-*` variables stays at the control's edge
while the fill sits inset inside them, and `--dock-icon-padding: 0` on the control or a
parent brings the fill out to the border as before. The face's inset stays one box for rest,
hover, press, selected and the mark, which is what fix 6 built and the CHANGELOG headline
promises; a consumer's border is theirs to bring in.

**Witness.** `fix-7/changelog-check.sh` (the 11.1.0 entry: the sentence, its remedy, the
`dir` sentence, the `--radius-dock` entry, no internal vocabulary): PASS on the branch, FAIL on
the pre-merge tree, v11.0.0 and v11.0.1 (`changelog-check.out`). `probe9` scene `pad0`, the
critic's bordered cohort with the remedy: the fill meets the border with no more than 1 px on
each side (38 × 38 in 40 × 40): branch 4/4 in Chromium and WebKit; without the remedy the
branch reads critique 6's 30 × 30 (`cohort-*`, gap 5). It passes on v11.0.0 and the pre-merge
tree too, since there the fill already reached the border: the remedy restores that look.

## The battery the merge note lists, and the cells round 6 left unrun

Round 2, at `e086a8767`, one guarded run per cell.

| witness | branch Chromium | branch WebKit | v11.0.0 Chromium | v11.0.0 WebKit |
| --- | --- | --- | --- | --- |
| probe9 (fix 7's gates: box, seatdir, pad0) | 24/24 | 24/24 | 12/24 | 12/24 |
| fix 6 witness | 16/16 | 16/16 | 4/16 | 4/16 |
| fix 5 witness | 40/40 | 40/40 | 0/40 | 0/40 † |
| fix 4 witness | 17/17 | 17/17 | 11/17 | 11/17 † |
| fix 3 witness | 26/26 | 26/26 | layout 5/5, gap 0/7, frames 2/2, Slider 3/3, tempo 1/1, tabs 4/8 | the same † |
| fix 2 witness | 60/60 | 60/60 | 36/60 | 36/60 † |
| lane L1 | 27/27 | 27/27 | 0/27 | 0/27 † |
| lane L2 | 33/33 | 29/29, O-173 paint unmeasurable (4) as since lane L2 | 3/29 + 4 unmeasurable | 3/29 + 4 unmeasurable † |
| lane L3 | 18/18 | 18/18 | 6/18 | 6/18 † |
| lane L4 | exit 0 (fonts 10/10) | exit 0 (fonts 8/8) | exit 1 | exit 1 (fonts 0/8) † |
| lane L5 | 60/60 | 60/60 | 26/60 | 26/60 † |
| lane L6 (O-194, O-197, O-198, O-199) | 161/161 | 155/155 | 31/161 | 37/155 |
| lane L7 | 80/80 | 79/80 (below) | 4/64 | 16/64 |

† v11.0.0 has not changed since critique 6 and neither have these instruments, so its
WebKit readings for the fix 2-5 witnesses and lanes L1-L5 are critique 6's
(`critic-6/chain.log`, 11:35-12:25); this round reran v11.0.0 in WebKit where round 6 had
not (probe9, fix 6, lanes L6 and L7). Lane L6's WebKit count is six short of Chromium's: its
O-194 coarse-touch cells are Chromium's.

**Lane L7 in WebKit, 79/80**, the class critique 5 recorded: eleven of twelve stall cells saw
no compositor frame inside the 50 ms task (unmeasurable, recorded since lane L7) and one saw
a single frame there (1440 light underline: the control square moved, the stroke read 0.365
before and inside the task, 0.91 after it). Critique 3 said such a cell should ask for two
frames; Playwright WebKit on this machine is not a steady instrument for that cell. Chromium
reads 12/12.

The 11.0.1 release specs on the branch (`fix-7/release.sh`, 11.0.1's carry chain):

| spec | Chromium | WebKit 2287 |
| --- | --- | --- |
| `release-10-1-5`, parts A and B | 84 + 23 = **107/107** | 84 + 23 = **107/107** |
| `release-10-1-4` | 23/23 | 15/15 (8 Chromium-only skipped) |
| `release-10-1-3` | 53 passed, **7 failed** (below) | 53 passed, **5 failed** (the two touch-swipe cells are Chromium's), 2 skipped |
| `release-10-1-2` | 44 passed, 8 failed: the same eight O-101 titles 11.0.1 and v11.0.0 fail (`release/r2-ch-failed-titles.txt` against 11.0.1's `critic-carry/runs/r2-ch-failed-titles.txt`) | 44 passed, 8 failed: the same eight, identical to 11.0.1's `r2-wk-failed-titles.txt` |
| `release-11-0-1` (owner cells) | 9/9 | 9/9 |
| `release-11-0-1-fix-2` (the script-free cell) | 14/14 | 14/14 |
| `release-11-0-1-critic-2` (the pixel reader of morph frames) | 9/9 | 9/9 |

**`release-10-1-3`'s seven: the owner's O-194 amendment reverses them.** Every failing cell
presses (clicks, taps or right-clicks) a persistent seat of a collapsed dock and then expects
`.expanded`: four "D-1 · a click on the open-side persistent seat of a collapsed dock reaches
it" (390/1440, right, left, bottom), whose last line asserts "the press still expands the
dock"; the two critique-2 touch cells, whose setup taps the seat to expand; and the critique-6
right-click dwell. The owner's amendment to O-194 rules "A press on a persistent seat never
expands the dock", and lane L6 built it, flipping the unit cells that said otherwise. Every
other assertion in those cells (the seat's own pointerdown, pointerup and click, its handler
once) holds. Not a merge defect: the spec states the 10.1.3 behaviour the ruling retired.
Rewriting a published release's spec is the orchestrator's call; it is in open gaps.

The e2e specs critique 6 ran (seventeen, one worker, `run.sh` e2e stage):

| tree | Chromium | WebKit 2287 |
| --- | --- | --- |
| branch | 65 passed, 37 failed, 2 skipped | 65 passed, 37 failed, 2 skipped |
| v11.0.0 | 65 passed, 37 failed, 2 skipped (critique 6's run, `critic-6/e2e/chromium-v1100.json`) | 64 passed, 38 failed, 2 skipped |

The 37 are one set on every cell: the branch's in both engines, critique 6's branch and
v11.0.0 Chromium runs (title for title, `fails.py` over each JSON). They are suites that read
the demo's pages as they stood before the restructure (the configurator rows, the aurora
thumbs, the rail register, the nav-dock gestalt, plate clearance, the morph family's
transform reading), red on v11.0.0 as on the branch; none names a part this release changed.
v11.0.0's one more in WebKit is "the indicator can be dragged to the next tab, and stays under
the label it commits", which the branch passes. The chain's v11.0.0 Chromium run died with
its caller at 23:41 (`e2e/chromium-v1100.log`, `KILLED: caller died`); critique 6's reading of
the same tree with the same specs stands for that cell.

## Instruments, corrected (each a reading of a contract the merge changed)

- **The mark's reads** (lane L1's runner, fix 5's witness, fix 6's harness sampler): they read
  the run's `::before` and `data-run-mark`, which the mark-box ruling retires. Each now reads
  the `.dock-run-mark` element when present and the old pair otherwise, so one runner serves
  every tree.
- **Lane L2's O-196** read the thumb at `p · track`, but 11.0.1's Slider lane paints the thumb
  at `d/2 + p · (track − d)`; round 1 read a linear ±4 px drift and 0/4. The runner now reads
  the thumb's painted centre: 4/4 in Chromium, the thumb a constant offset from the pointer.
- **probe9 `seatdir`** compares the part of the plate inside the port (above); its `box`
  scene compares the mark's scroll to the unmarked twin's (above).
- **fix 6's witness** serves its own harness copy (`fix-7/fix6-witness/harness`) so no run
  writes into `fix-6/`.

## Readings, not defects

- With a host's `--radius-dock: 1rem`, the cut cap drops to `--radius-card`, 16 px, which is
  the rest: a bar dock that hides seats shows no cut. 11.0.1 states the cut as `--radius-card`
  for the stadium; a bar consumer's cue is a design question, not a defect of this merge.
- `critic-6/e2e/chromium-v1100.{log,json}`: critique 6's v11.0.0 Chromium e2e finished at
  15:51, after its record was committed (65 passed). The log kept growing after that from
  another session's run; this seat leaves both files as they are.

## Gates (committed tree)

`fix-7/gates.sh`, one guarded heavy run each, `fix-7/gates/<name>/chain.log`:

- `merge3` at `0bd7ed13d`: build 0, typecheck 0, demo:dist:build 0, vitest 0 (279 files; 2576
  passed, 10 expected fail, 1 skipped), verify:package 1 on the ratchet (3030550 > 3015106),
  rebound in `17dc90052`, then CLEAN.
- `knob` at `6dc977fe2`: build 0, typecheck 0, demo:dist:build 0, vitest 0 (279 files;
  2579 passed, 10 expected fail, 1 skipped), verify:package 1
  on the ratchet (3030691 > 3030550), rebound in `e086a8767`, then CLEAN
  (`gates/knob/verify-package-rebound.log`).
- No source has changed since `6dc977fe2` (`e086a8767` is the ratchet file alone), so the
  `knob` run is the gate reading of the committed tree.
