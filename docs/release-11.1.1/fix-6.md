# 11.1.1 fix seat 6 (before critic 6)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`3d5026c92` (the orchestrator's line on critique 5). Every orchestrator note in this directory was
read. The note after critique 5 binds this seat's list: critique 5's three defects, plus its open
gaps B, E, F and G. Nothing else was built. No tolerance was widened.

Runs, all through `guarded`, WebKit under `--exclusive webkit`:
- `fix-6/run.sh <branch|red> <project> <log> <grep> [args]`: the branch on 5351, v11.1.0 (the
  `git archive` tree at `.cache/red-v11.1.0/tree`, with the 11.1.1 specs, config and harnesses
  copied in) on 5352.
- `fix-6/bisect.sh` and `bisect2.sh`: critic 5's stall probe on `.cache/fix6-bisect/tree`. That tree
  is the v11.1.0 tree with its `src` replaced by `git archive <commit> src`, optionally patched
  (`fix-6/patches/`), and served on 5355.
- Reads: `stalls.py` (holed films per cell kind), `taps.py` (the cadence after every tap of a
  cell), `idle.py`, `unread.py`, `procs.py` with `sample.sh` (Playwright's WebKit processes
  sampled once a second).

Every run is listed in `fix-6/logs/runs.out`. **The guard refused nothing.** It printed its zone-leak
ARMED warning, a warning only; the 1-minute load was 5 to 10.

Cells: chromium-phone (390 × 844, touch), chromium-desktop (1440 × 900, mouse), webkit-phone and
webkit-desktop (Playwright WebKit 2287).

## Commits

| item | commit | what |
|---|---|---|
| F, G | 82e481984 | the stale comments on the reveal's exit (`animations.css`, above `glass-reveal-out-reduced`), the menu's grow (`reveal.css`) and the toast's register (`Toast.vue`) say what the code does; `a11y-overrides.css` loses its tranche path and `sheet/styles.css` its "this round" and "next π"; `dissolve.test.ts` names the authorized-set register itself |
| 2 | 1d40d5377 | `worstFrameShare` reads a change between two consecutive samples no more than a frame apart whole |
| B | 1bb2fd444 | under reduced motion a pressable `Card`, a `SortableList` handle and the Dialog close button's plate keep scale 1 and show the press by fill; the press cell holds them |
| E | c60ba735d | `gate.sh` says four parts, serves each process on a free port, and never measures a server it did not start |
| 3, B | a7320be87 | CHANGELOG: the reduced-motion press names a command palette's `CommandItem`, a pressable `Card`, a `SortableList` handle and the close plate |
| ratchet | e4740e892 | the bundle ratchet rebound once after the last source commit, 3054903 to 3055440 (+537 B) |

**Defect 1 is not cured.** The bisect names the commit and the change, but every cure that keeps
row 5's claim stalls in the same way. The orchestrator's note says such a trade is a ruling for the
orchestrator, not for this seat. Both readings are below, and `src` keeps the turn as it was.

## 1. The WebKit 390 stall: bisected, not cured

### The bisect names the disclosure turn

Critic 5's probe (`stall5.probe.ts`, verbatim) ran the four disclosure reversal cells, six repeats
interleaved, in WebKit 390. That is 12 reopen and 12 "closed while it opens" cells per run. `src` was
taken at each commit, on the v11.1.0 tree:

| `src` | reopen films holed | reopen cells failed | closed films holed |
|---|---|---|---|
| tip `3d5026c92` | 18 of 21 | 9 of 12 | 0 of 12 |
| tip again (sampled, below) | 8 of 16 | 4 of 12 | 0 of 12 |
| `2d663038d` (commit 14 of 28) | 8 of 16 | 4 of 12 | 0 of 12 |
| `500df67da` (7) | 4 of 14 | 2 of 12 | 0 of 12 |
| `001a726e8` (5, "a surface turned back mid-way turns from where it is") | 12 of 18 | 6 of 12 | 0 of 12 |
| `22e65f1ba` (4) | **0 of 12** | 12 of 12, all on the claim | 0 of 12 |
| commit 4 plus only the turn (`turn.ts` and its two call sites) | 4 of 14 | 2 of 12 | 0 of 12 |
| tip with the turn's two call sites removed | **0 of 12** | 12 of 12, all on the claim | 0 of 12 |

The stall comes with `useDisclosureTurn` (`src/components/_shared/disclosure/turn.ts`, added in
`001a726e8`). It needs the turn, and the turn is enough.

### What in the turn: any reversal that keeps the region continuous

Each variant was applied to the tip's `src` and read by the same probe (patches in `fix-6/patches/`):

| variant | reopen films holed |
|---|---|
| the turn reads the running animation and the height, then stops: the new keyframe restarts from its far end (`v1-no-seek`) | **0 of 12** (red on the claim) |
| the new keyframe starts at the matching moment by a negative inline `animation-delay`, set before it exists; the moment is read from the region's easing on a `KeyframeEffect` with no target and an `Animation` with no timeline (`cure-delay`) | 4 of 14 |
| the same delay, with the easing read from its `linear()` stops by arithmetic, so no Animation object is made or written at all (`v3-delay-arith`) | 10 of 17 |
| two turn keyframes whose first stop is the height and padding the region stands at, named inline after reka's measure, so the new motion starts at its own beginning, with no seek and no delay (`v4-turn-keyframes`) | 6 of 15 |

The shipped turn seeks the new CSS animation by writing `currentTime` 15 times. That route stalls,
and so do the CSS delay and a fresh keyframe from the current height. The common factor is the
claim itself: the region carries on from the height it stands at, instead of jumping to its far end
first.

### Where the stall lives: WebKit's GPU process, set off only on the full exits page

- **Not in the page that stalls.** With the refilm turned off (`stall6.probe.ts`, `FIX6_HOLE=1e9`, so
  the attached aside is the first page's), a stalled Collapsible reopen cell slows at its first
  close from rest (`openHeight`). That page has not turned yet. The two Accordion cells after a
  stalled one are slow from their first tap, in fresh contexts (`taps.py` on
  `s6-tip-firstload`). Idle frames stay at 10 ms; only frames that repaint are slow (`idle.py`).
- **In the GPU process.** `sample.sh` sampled Playwright's WebKit processes once a second through a
  tip run (`logs/sample-tip.txt`, `procs.py`). The `com.apple.WebKit.GPU.Development` process
  peaked at 66 to 82 % CPU in each of the four stalled tests, against 5 to 29 % in the twenty clean
  ones. That process
  belongs to the browser, which Playwright relaunches after a failed test, and all of that
  browser's contexts share it. So the slow state crosses tests until a failure restarts the
  browser.
- **Only with the whole page.** A stall harness (`probe/stall-harness.ts`) holds the same
  Collapsible and Accordion, in the same container on the same ground, with the exits harness's
  other parts added back by name (`stall7.probe.ts`):

  | parts added back | reopen films holed |
  |---|---|
  | none | 0 of 12 |
  | ExpandableContainer | 0 of 12 |
  | dock | 0 of 12 |
  | the two rows of triggers | 0 of 12 |
  | dock and rows | 0 of 12 |
  | dock and ExpandableContainer | 0 of 12 |
  | rows, ExpandableContainer and Toaster | 0 of 12 |
  | dock, rows and ExpandableContainer | 8 of 16 |
  | all four (the exits harness) | 10 of 17 |

### Both readings, for the orchestrator's ruling

- **With the turn** (the tip, in any of its four forms): row 5's claim holds wherever a film is read
  (every read reopen and closed film turns from where it is, in every run above). On the exits
  page in Playwright WebKit 2287 at 390, 4 to 18 of 12 to 21 reopen films per run are holed. Every
  failure in those eleven runs is "the film is read" (`grep` of each log); the one run with the
  refilm off (`s6`) read holed films and failed two of them on "the second input lands
  mid-motion". The gate's part B can stop there, as critique 5 found.
- **Without the turn** (or with it reading only): no film is holed in any run (0 of 48 reopen films
  across `b-04`, `b-tip-noturn` and `v1-no-seek`). Every disclosure reversal cell fails on the
  claim: the region restarts from its far end.

No cure in `src` was found that keeps the claim. The ones tried each keep the claim and stall. This
seat cannot tell whether real Safari stalls, since it does not run there. The orchestrator note's
witness (twenty interleaved repeats with no unread film, part B green three times running) is
therefore not met. `src` is unchanged for row 5.

## 2. The frame share read a one-frame cut as a third smaller

**Cause.** `worstFrameShare` (`tests-visual/release-11-1-1/film.ts`) paired each sample with the
first one at least 16.7 ms later and scaled the change to one frame. A step that landed between two
samples 8 to 12 ms apart was therefore read across about 25 ms.

**Cure** (1d40d5377). A change between two consecutive samples no more than a frame apart is read
whole. A change across more than a frame is still scaled to one frame: between two consecutive
samples across a late callback, and from each sample to the first one a frame later, where several
small steps inside one frame add up.

| cell | v11.1.0, 20 repeats | branch, 20 repeats |
|---|---|---|
| `expand · an ExpandableContainer closed while it enters`, Chromium 390 | **R 20 of 20**, all on "no frame carries more than a fifth" (0.23 to 0.29) | **G 20 of 20** |
| `reverse · a Collapsible reopened while it closes`, WebKit 390 | **R 20 of 20**, all on "no frame after the turn moves more than a fifth" | (the stall of item 1) |

## 3. The CHANGELOG's command palette rows

a7320be87: the reduced-motion sentence now names a command palette's `CommandItem`, which takes
`.interactive-item` and `.glass-menu-row` through `rowClass()`. It also names gap B's three
controls. No internal ids, no em dash added.

## B. Three controls still scaled on press under reduced motion

**Cure** (1bb2fd444), under `prefers-reduced-motion: reduce` only:
- `card/styles.css`: `.card[role="option"]:active` takes scale 1 and a fill one hover rung past its
  hovered fill: `--fill-hover × 2`, and `--fill-hover × 2 + --fill-selected` on a selected card.
- `sortable-list/styles.css`: `.sortable-handle:active` takes scale 1 and a fill behind its glyph at
  `--fill-selected`.
- `dialog/styles.css`: the close button's `::before` plate keeps scale 1 on hover and on press, in
  the file's one reduced-motion block (`dialog-dismiss.test.ts` reads the first such block as the
  rebuff's). The plate already steps its fill from 5 % to 12 % ink. Its hover scale also goes,
  because a press from a hovered plate would otherwise shrink it from 1.08 to 1.

**Witness**: the press cell (reduce spec) gains the three controls. Its holder reads a `::before`
plate when asked, and the fill it compares is the background colour and image. The Card and the
handle sit on the reduce harness. So does a Dialog, because on the exits harness the close button
sits over the busy ground seen through the dialog's glass. There 5 % and 12 % ink differ by at most
12 of 765 per pixel on both trees (`probe/plate.probe.ts`, `logs/plate-*`), which the cell's paint
read cannot see.

| tree | ch-phone | ch-desktop | wk-desktop |
|---|---|---|---|
| v11.1.0 (`b2-red-press-*`) | **R**: Card `1, 0.97` (paint 0.17), handle `0.96` (0.01), plate `0.96` | **R**: Card `0.97` (0.20), handle `0.96` (0.08), plate `1.08, 0.96` | **R**: Card `0.97` (0.19), handle `0.96` (0.07), plate `1.08, 0.96` |
| branch (`b2-tip-press-*`) | **G**: scale 1 on every held frame; paint 0.85, 0.75, 0.65 | **G**: 0.85, 0.61, 0.63 | **G**: 0.84, 0.61, 0.64 |

WebKit 390 stays skipped, since Playwright's WebKit touchscreen cannot hold a press.

## E. `gate.sh`

c60ba735d. The header says four parts. With `GLASS_UI_DEMO_PORT` unset, each Playwright process
serves on a port chosen free for it, where it used 5199; a port the caller names is used as it is.
The gate exports `GLASS_UI_DEMO_OWN`, and `release-11-1-1.config.ts` then sets
`reuseExistingServer: false`.

Reading (`logs/e-*`), with a foreign server answering on 5356:
- without the knob, a run reused it and timed out on a page that was not the harness;
- with it, the run stopped at start with "http://localhost:5356 is already used".

The free-port path chose 50225, 50226 and 50227 on three calls (`free_port` as the gate writes
it). This seat's runs keep to ports 5351 to 5356, so the full gate run below names 5353, and each
of its sixteen processes started and stopped its own server there.

## F, G. Comments

82e481984. No behaviour changes. Each stale phrase is present at `3d5026c92` and absent after
(`logs/comments-grep.txt`). The unit suites that read these sheets pass (`tests/styles`, toast,
sheet: 549 passed).

## Gates on the committed tree

At e4740e892 (`fix-6/gates.sh`, `logs/gates.out`), one guarded run each, all exit 0:
- typecheck;
- build;
- `verify:package`, terminal CLEAN;
- `demo:dist:build`;
- vitest: 285 files, 2600 passed, 10 expected to fail, 1 skipped.

At a7320be87, `verify:package` failed on the bundle ratchet (3055440 > 3054903), and e4740e892
rebinds it. The script's first pass logged `exit 0` for that failure, because it read `$?` after
`$(date)` had already run. That file is kept as `logs/gates-a7320be87-misread.out`, and the script
now captures the code before it runs anything else.

The exits gate ran as `scripts/release.sh` runs it (`GLASS_UI_DEMO_PORT=5353 npm -w tests-visual run
gate:exits`, `logs/gate.log`). It stopped at webkit-phone part B. The six parts after that ran one
by one in the same form (`fix-6/gate-rest.sh 10`, `logs/gate-<project>-<n>.log`):

| project | A (form … lift) | B (reverse … leave) | C (standing) | D (site … still) |
|---|---|---|---|---|
| chromium-phone | 35 passed, 3 skipped | 35, 11 | 41, 3 | 16, 1 |
| chromium-desktop | 28, 10 | 45, 1 | 44, 0 | 17, 0 |
| webkit-phone | 24, 14 | **1 failed**, 34, 11 | 27, 17 | 15, 2 |
| webkit-desktop | 28, 10 | 45, 1 | 44, 0 | 17, 0 |

The stricter frame share (item 2) and the three new press controls (gap B) pass in every cell they
run in. The one failure is item 1's stall:
`reverse · a Accordion closed while it opens turns from where it is` failed as unread, with both
films holed (a 41 ms hole). While the region moves its frames come 24 to 40 ms apart, and they are
10 ms apart once it rests. Critique 5's record had no holed "closed while it opens" film (0 of
108), so the stall reaches the close that lands mid-open too. The Collapsible and the Accordion
reopen cells passed in this pass.

## Open, for critic 6 and the orchestrator

- **Defect 1, for a ruling**: the turn that keeps row 5's claim sets off a stall in Playwright
  WebKit 2287's GPU process on the full exits page at 390, and no form of it tried here avoids the
  stall. Until the orchestrator rules, a gate pass can stop at a WebKit 390 disclosure reversal
  cell, by name, as unread. This seat's gate pass stopped there once, on the Accordion's "closed
  while it opens" cell.
- The bisect wrapper for commit 5 was stopped by this seat (PID 46789) after its script file was
  edited mid-run; `guarded` killed the run ("caller died") and it was run again. The foreign
  server for gap E's reading was stopped with `pkill -f "http.server 5356"`, which matched only
  that one process of this seat's.

No tag, no push, no publish.
