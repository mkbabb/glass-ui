# 11.1.1 critique 3

Critic: claude-fable-5-2, fresh; built nothing on the branch. Tip read: `3e306311f` on
`release/11.1.1`. Verdict: **not ready to tag.** Four defects. One witness fails about one
reading in six on the tip, so the exits gate and `scripts/release.sh` fail by chance. The
ruling after critique 2 (a pressed control does not change size under reduced motion) is
built for the dock's triggers only: a `Button` and a dock seat still shrink in one frame,
and the cell the ruling names does not exist. Row 1's witness drives three of the five
close paths the same note orders. The CHANGELOG's size lines leave out seven entries that
grew past the stated bar. Critique 2's four defects are cured; everything else on the
list holds.

Everything here was run by this seat. Tools, logs and readings are under `critic-3/`.

## How it was read

- **Trees.** The tip is the worktree at `3e306311f`, tracked tree clean before and after.
  v11.1.0 is the `git archive` at `.cache/red-v11.1.0/tree`; the tree before fix seat 3 is
  `.cache/tip-235b80e/tree`. Each one's `src`, `demo` and `package.json` were compared
  with a fresh archive of its commit before use: no difference.
- **Witness.** The gate's four parts in its four projects on the tip (16 runs), the three
  witness parts on v11.1.0 (12 runs), and the three cells fix seat 3 added or cured on the
  tree before it (4 runs): `logs/tip{A,B,C,D}-*`, `logs/red{A,B,D}-*`, `logs/preN-*`.
  Verdicts per cell are in `matrix.txt`; why each v11.1.0 cell failed is in
  `logs/matrix-why.txt`; the frame tables' extremes are in `logs/sum-tip.txt` (`sum.py`)
  and the reduced-motion legs in `logs/legs-tip.txt` (`legs.py`).
- **Repeat reads.** `still` twelve times in Chromium and in WebKit at 1440
  (`logs/still-*`).
- **Probes** (`probe/paths.probe.ts`, readings only, both trees, four projects,
  `logs/probe-readings.txt`): the dock `Select` and `DropdownMenu` closed by five paths;
  a held press on a dock trigger, a dock seat and a `Button` with and without reduced
  motion.
- **Earlier release specs.** Critique 2's list, one guarded call per engine: release-10-1-5
  in two halves, release-11-0-1 (owner, fix 2, critic 2), release-11-0-2 with
  slider-forced-colors, release-11-0-2 on coarse touch and on WebKit 2311, and ro-loop,
  11.1.0's resize witness (no file is named release-11-1-0).
- **Package.** The registry tarballs of 11.1.0 and 11.0.2 (`npm pack`) against the tip's
  fresh `dist` (`tools/cmp.py`, `tools/dts.py`, `critic-1/closure.mjs`).
- **Guard.** Every run went through `guarded`, WebKit under `--exclusive webkit`. It
  refused nothing and no lock wait passed a minute. The session's power hold stopped this
  seat's first run from 19:47 to 20:18 (31 minutes, battery under its rule); it resumed
  where it stood and nothing was lost. Load was 5 to 18 through the readings.
- **One fault in my own tooling, corrected.** A blanket rename in my copy of
  `reg-inner.sh` pointed one step at a spec that does not exist, so
  release-11-0-1-critic-2 in Chromium first read "no tests found". It was corrected and
  the step run again: 9 passed.

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

Cells are Chromium 390 touch, Chromium 1440, WebKit 2287 at 390 touch, WebKit 2287 at 1440.

| tree | Chromium 390 | Chromium 1440 | WebKit 390 | WebKit 1440 |
|---|---|---|---|---|
| tip, all four parts | 123 passed, 17 skipped | 129, 10, **1 failed** | 99, 41 | 130, 10 |
| v11.1.0, three witness parts | 73 failed, 9 passed | 72, 14 | 64, 8 | 74, 12 |

Across the witness cells: **283 red then green, 42 green on both, 1 green then red.** No
v11.1.0 failure is a timeout or a navigation error; each is an assertion on its row's
claim (`logs/matrix-why.txt`).

| row | witness | verdict |
|---|---|---|
| 1 phone sheet | `form` at 390: R/G in both engines by pick and Escape, by outside in Chromium | behaviour holds on five paths (probe); **the gate drives three** (defect 3) |
| 2 phone popup is glass | `glass` at 390: R/G ×4 in both engines; contrast from Chromium's paint | holds |
| 3 one exit curve | `exit`: every surface R/G in every cell it opens in | holds |
| 4 every route | `routes`: R/G, the dragged detented Sheet included (R/G ×3, no WebKit touch drag) | holds |
| 5 reversal | `reverse`: R/G but `DropdownMenu reopened` (G/G ×3, R/G in WebKit 1440) | holds |
| 6 tooltips | `tooltip`: R/G ×2 engines at 1440 | holds |
| 7 CommandDialog | `routes · a CommandDialog keeps its list`: R/G in every cell driven | holds |
| 8 reduced motion | `site`, `fade`, `fold`: R/G ×4; the dock Select in WebKit 1440 now green | holds for what it reads; **the press ruling is built in part** (defect 2) |
| 8 the Slider | `still`: green on v11.1.0 by design, red on the tree before fix 3 ×4 | **fails 2 of 13 readings in Chromium 1440** (defect 1) |
| 9 ExpandableContainer | `expand`: exits and reopen R/G ×4, closed-while-entering R/G ×3 | holds |
| 10 small cures | `weight` R/G ×4, `lift` R/G ×2 at 390 | holds |
| 11 leave-finished | `leave`: says-once R/G in every cell; shadow root, unmount, ContextMenu, hover card R/G | holds |
| 12 round ends | `round · wide` R/G ×2 at 390; `compact` G/G (no change) | holds |
| 13 (a) run mark | `mark`: R/G ×4 | holds |
| 13 (b) observer loop | left for 11.1.2 as the scope allows | not read here |

Critique 2's defects, read again:

- **The dock Select's first frame** (WebKit 1440, reduced motion): green in the gate, no
  frame holds a box between its ends; red on the tree before fix 3. A held dock trigger
  reads scale `1` on every frame on the tip and `0.96` from the first frame on v11.1.0, in
  both engines.
- **The Slider**: every clock `0s` on the tip in all four projects, red on the tree before.
- **The dragged detented Sheet**: 0.147 at release, then 0.105, 0.089 down to gone on the
  tip; 0.973 on the frame after release on v11.1.0 and on the tree before.
- **The CHANGELOG's six points**: all present (item 7).

### 2. The motion rows' frame tables

Every table on the tip, in shares of the travel (`logs/sum-tip.txt`; Chromium samples near
120 Hz, WebKit near 100 Hz):

| | Chromium | WebKit |
|---|---|---|
| most carried by any 16.7 ms window | 0.190 | 0.182 |
| largest first moving sample | 0.109 in 7 ms | 0.121 in 12 ms |
| largest last sample before gone | 0.051 | 0.050 |
| longest hole in a moving table | 11 ms | 17 ms |
| a sample against the leg's direction, outside the turn cells | none | none |

- **No cut at either end, no last-frame step, no overshoot** in any of the 298 tables. The
  steepest are the cells the earlier critiques named: ExpandableContainer reversed
  (0.177 to 0.190), the detented Sheet (0.163 to 0.188), the two disclosures (0.17).
- **Reduced motion** (`logs/legs-tip.txt`): every leg fades over 111 to 205 ms across 11 to
  23 frames, monotone, with no box step in any cell of any project. The leave event
  follows the last seen frame by 1 to 61 ms.
- **No hole.** With the machine at a load of 5 to 13 the films are whole, so open gap A of
  critique 2 did not arise in these readings.
- **Gestalt.** Calm. A menu's edge draws in as it fades; a popover and a hover card fade
  and slide a few pixels with `scale: 1` and no blur on every frame; the phone sheet
  slides down as it fades and is at 0.005 before it reaches the edge; a Dialog and a Sheet
  leave on one curve. One effect per change, nothing added for ornament. The Toast keeps
  its three-channel dissolve and the tooltip still grows slightly on the way in; the
  CHANGELOG says both.

### 3. Earlier release specs on the tip

| | Chromium (headless-new) | WebKit 2287 |
|---|---|---|
| release-10-1-5, part A / part B | 84/84, 23/23 | 84/84, 23/23 |
| release-11-0-1 owner / fix 2 / critic 2 | 9, 14, 9 | 9, 14, 9 |
| release-11-0-2 with slider-forced-colors | 57/57 | 54 + 3 skipped |
| release-11-0-2 on coarse touch / on WebKit 2311 | 37 + 17 skipped | 51 + 3 skipped |
| ro-loop (11.1.0's resize-mid-morph witness) | 4/4 | 4/4 |

**No title fails on the tip** in either engine, so no v11.1.0 pass was needed
(`logs/chain.txt`). The counts and skips equal critique 2's.

### 4. Nothing removed or renamed

Against the published 11.1.0 tarball (899 files, 3,035,791 B, the registry's own figures)
and the tip's fresh `dist` (`logs/package-vs-11.1.0.txt`):

- `exports`: 70 keys on both, none removed, added or changed. No other `package.json`
  field differs but `version`.
- Files, chunk hashes normalised: no name absent from the tip; five added (`exit-press`,
  `leave-finished` and their declarations, `turn.d.ts`). The tip packs 904 files.
- Declarations: nine files differ, additions only (the `leaveFinished` emit and its
  handler prop; renumbered locals; one comment).
- In `src`: no file deleted or renamed, three added. No custom property removed (1,131
  names to 1,137), no keyframes removed (three added), no `@property` or `@utility` name
  changed. The layer order gains `reduced-motion` at its end.
- Defaults moved since critique 2: the dock trigger's press under reduced motion (the
  ruling after critique 2, in the CHANGELOG), the Slider's reduced-motion clocks (back to
  11.1.0's), the detented Sheet's release (row 4, in the CHANGELOG). None beyond the scope.

### 5. Gates on the committed tree

| command | exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `npm run verify:package` | 0: `CLEAN`, 3,054,556 B, equal to `.bundle-ratchet` |
| `npm run demo:dist:build` | 0 |
| `CI=true npx vitest run --maxWorkers=2` | 0: 285 files, 2,600 passed, 10 expected fail, 1 skipped |

No workflow file runs a browser; `.github/` is unchanged from v11.1.0. The exits gate,
which `scripts/release.sh` runs under `set -e`, passed in fix 3's reading and failed in
this one: defect 1.

### 6. Comments added in `src`

All 1,018 added lines were searched for row, round and seat words, inbound ids, site names
and dates: none added. The two hits are the v11.1.0 sentences critique 2 named
(`sheet/styles.css`, `a11y-overrides.css`), moved by a re-wrap. Fix 3's three comments
(the dock trigger, the slider, the detent engine) say what the code does.

### 7. The CHANGELOG entry

Outward prose, no internal ids, one em dash (the heading's). Critique 2's six points are
all in and each is true of the films: the reduced-motion paragraph, the half about a
site's own unlayered motion, the `Toast` and `.glass-reveal` entrance with the two tokens
that no longer apply, ExpandableContainer's two keyframes, the reversal sentence, the
dragged sheet. The clocks hold: menus and selects leave in 205 to 234 ms, popovers 255 to
258, tooltips 128 to 130, a dialog 194 to 200, a sheet 258 to 274, each shorter than its
entrance; v11.1.0 read 126 to 136, 136 to 142, 75 to 82, 228 to 242 and 200 to 216. The
six size figures it prints are exact. Not complete: defect 4.

## Defects

1. **The Slider's witness fails by chance on the tip, so the exits gate does too.**
   `still · a Slider holds still under reduced motion`, Chromium at 1440: red in this
   seat's gate run and in 1 of 12 repeats, 2 of 13 in all (`logs/tipD-chromium-desktop`,
   `logs/still-chromium-desktop`); 13 of 13 green in WebKit. The Slider is not at fault:
   in both red readings every clock is `0s` and the fill holds two values only. The cell
   stamps each sample with its frame's start time and each mark with the clock at the
   moment of the call, so a frame that began before a mark and ran after the input is
   filed on the wrong side of it: once the first release frame (`none`) was read as the
   press's last, once the first pressed frame as the rest before it. `gate.sh` runs under
   `set -e` from `scripts/release.sh`, so about one release run in six stops here. Cure
   the cell (mark on the frame clock, or judge the run of values in order: rest, pressed,
   rest, nothing else), and read it twenty times green in Chromium at 1440.

2. **The ruling after critique 2 is built for one control.** The note rules that under
   reduced motion no pressed control changes size ("Button, the dock's seats, segmented
   options"), and names a new cell: a pressed `Button` and a pressed dock seat keep scale
   1. Fix 3 holds `.dock-trigger:active` at `scale: 1` and stops there; no such cell is in
   the gate. Held presses read on the tip under reduced motion, both engines at 1440 and
   Chromium at 390 (`logs/probe-readings.txt`):

   | control | at rest | first held frame, tip | v11.1.0 |
   |---|---|---|---|
   | dock trigger (Select, menu) | `1` | `1` | `0.96` |
   | dock seat (`DockControl`) | `1`, 40 px wide | `1.0066 0.9156`, 40.26 px | the same |
   | `Button` | `1`, 156.6 px wide | `1.0328 0.911`, 161.7 px | the same |

   A `Button` grows 3 % wide and loses 9 % of its height in one frame, with nothing
   between. The scripted press (`useLiquidPress`) snaps to its end under reduced motion;
   only the unarmed CSS floor of `.tap-squish` holds 1, which is the case fix 3 read.
   Build the ruling where the press is set (the scripted press and the dock seats' CSS),
   keep the darken, add the cell (red on v11.1.0), and say it in the CHANGELOG in the
   note's words: a pressed control shows its press by colour, not by size.

3. **Row 1's witness drives three of the five close paths.** The same note orders five for
   the dock Select at 390 (a tap outside, Escape, a tap on the trigger, on the current
   item, on another item) and a read of fill and backdrop on every exit frame. The `form`
   cells drive a pick of another item, a tap outside and Escape, and the Select's cell
   reads the backdrop but not the fill. The behaviour is right: this seat's probe reads
   all five on the tip with the form, the material attribute, the backdrop, the fill, the
   place and the width unchanged on every exit frame (22 to 31 frames, 219 to 254 ms),
   and all five on v11.1.0 turning into the anchored plate at +9 to +50 ms and jumping
   544 px. Add the two paths and the fill to the `form` cell so the gate holds them.

4. **The CHANGELOG's size lines stop short of the stated bar.** The dock-size note asks
   for a line for any entry that grew more than 0.5 KB gzipped. The entry lists five.
   Seven more grew past it from 11.1.0, measured the same way (`logs/sizes.txt`): the
   root entry 104,776 to 108,681 bytes (+3,905), `command` 16,804 to 18,864 (+2,060),
   `sheet` 14,306 to 16,337 (+2,031), `tabs` 19,091 to 20,154 (+1,063), `easing` 36,889
   to 37,951 (+1,062), `motion` 12,599 to 13,477 (+878) and `toast` 5,093 to 5,879
   (+786). A site with a first-load budget imports the root or `sheet` as readily as
   `dialog`. Add the lines; the close may write them.

## Open gaps (for INBOUND)

A. **A correction to critique 2's gap D.** The published 11.1.0 tarball holds 899 files
   and 3,035,791 B unpacked, by `npm view` and by unpacking it into an empty directory:
   the tree `verify:package` measured. The 923 files critique 2 counted were not the
   registry's. Nothing is wrong with the publish path on that account.
B. **Under reduced motion a mounted grasp may not unmount.** `Slider.vue` clears its grasp
   carriers on the release fade's `transitionend`, and a zero clock fires none. It was so
   on 11.1.0 too (the clocks are the same), so it is not this release's; worth one read.
C. **Routes still not driven**, from critique 2's gap B: the DropdownMenu submenu,
   ContextMenu and the hover card in the standing cell, a Popover in a dock, the detented
   Sheet's close button, the Toast's swipe, the dock's fold outside reduced motion. Under
   reduced motion: ContextMenu, the hover card, the detented Sheet, `DockCrossfade`.
D. **Under reduced motion a drag-dismissed Sheet still snaps on release**, as on 11.1.0
   (fix 3 recorded it). Row 8's fade does not reach that route.
E. **The dragged sheet is not read in WebKit at 390** (Playwright's WebKit touch cannot
   drag), nor a held press there. Real Safari is unmeasured for both, and for the firm
   plate's paint.
F. **A sample stamped with its frame's start and a mark stamped at the call** is how every
   film in `film.ts` is cut. The other cells carry tolerance and read green in three gate
   runs; the same race is why defect 1's cell, which has none, fails.
G. **Stale comments** (not stamps), from critique 2's gap E: `reveal.css` on
   "`glass-menu-grow` below", and `Toast.vue`'s class comment on its entrance and exit.
H. Row 13 (b), the WebKit ResizeObserver loop, stands as fix 2 left it, for 11.1.2.
I. The CHANGELOG heading still reads "unreleased"; the close dates it.
