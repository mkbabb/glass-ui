# 11.1.1 critique 5

Critic: claude-opus-5-5, by the orchestrator's ruling while Fable is out of quota; fresh,
built nothing on the branch. Tip read: `fa26a442f` on `release/11.1.1`, tracked tree clean
before and after. Verdict: **not ready to tag.** Three defects.

1. The exits gate stopped in one of this seat's four passes of its WebKit 390 reversal
   part, on both disclosure reopen cells, now as unread films. Fix seat 5 recorded the
   stall behind it as one the machine makes and could not find. The record says
   otherwise. On the branch the stall starts at the close of a rested Accordion or
   Collapsible and lasts exactly as long as that region moves. It never touches the
   "closed while it opens" cells in the same runs. On v11.1.0, under the same probe and
   the same interleaving, no film stalls.
2. The frame-share read still passes a one-frame cut. Two witness cells read green on
   v11.1.0 with the cut in their own film: ExpandableContainer closed while it enters
   (Chromium 390, the gate pass), and Collapsible reopened (WebKit 390, 2 of 10 probe
   readings). The note after critique 1 rules that a witness which does not bite is
   restated.
3. The CHANGELOG names the menu and select rows whose press changed under reduced motion
   and leaves out the command palette's rows, which take the same two rules.

Fix seat 5's three cures hold: the restated radius cell, the Button's and the menu row's
press fill, and the turn read on the frame clock.

Everything here was run by this seat. Tools, logs and readings are under `critic-5/`
(the earlier specs' screenshots under `critic-5/logs/out/` are left uncommitted).

## How it was read

- **Trees.** The tip is the worktree. v11.1.0 is the `git archive` tree at
  `.cache/red-v11.1.0/tree`. Its `src`, `demo`, `tests`, `scripts`, `package.json`,
  `package-lock.json`, every `vite.*` and `tsconfig*` file, `index.html` and the
  Playwright base configs were compared with a fresh `git archive v11.1.0` (`d19e12559`,
  unpacked at `.cache/critic5-v11.1.0/fresh`): no difference. Its `radius-scale.spec.ts` is
  the tip's restated one, copied in for the red read of that cell.
- **Witness.** The exits gate's four parts with the gate's own greps, in its four projects
  on the tip (16 runs, `logs/tip{A,B,C,D}-*`), and the three witness parts on v11.1.0 (12
  runs, `logs/red{A,B,D}-*`), each with its own report. Then part B three more times in
  WebKit at 390 as the gate runs it (`logs/tipB{2,3,4}-webkit-phone`). Verdicts per cell are
  in `logs/matrix.txt` (`matrix.py`), why each v11.1.0 cell failed in `logs/matrix-why.txt`.
  The reads: frame tables' extremes from `sum.py`; every table's largest step between two
  consecutive samples, unscaled, from `steps5.py`; reduced-motion legs in
  `logs/legs-tip-*.txt`; the channels each film moves in `logs/channels-tip-*.txt`; every
  turn film's cadence while it moves and at rest from `turns.py`.
- **Probe** (`probe/stall5.probe.ts`, readings only). The release spec's cells, copied
  verbatim, with a second recorder on every page. Per frame it takes the scroll offset, the
  document height and the boxes of both disclosure triggers and regions, plus every write
  to an animation's `currentTime` and every tap, attached after each cell (`aside.py`
  reads it). It ran the four disclosure reversal cells, ten repeats interleaved, in WebKit
  at 390, on the tip (`logs/stall5-webkit-phone`) and on v11.1.0
  (`logs/stall5-red-webkit-phone`).
- **Earlier release specs**, one guarded call per engine (`reg-inner.sh`, `logs/chain.txt`):
  - release-10-1-5, in two halves;
  - release-11-0-1: owner, daraksha, fix 2, critic 2, and critic 1 with 1b, which earlier
    rounds did not run;
  - release-11-0-2 with slider-forced-colors;
  - release-11-0-2 on coarse touch and on WebKit 2311;
  - the specs 11.1.0 added or restated: ro-loop, release-10-1-3 and radius-scale
    (Chromium and coarse touch; no WebKit project matches radius-scale).

  A title that failed on the tip was run on v11.1.0 twice and on the tip again
  (`chain5.sh`).
- **Package.** The registry tarballs of 11.1.0 and 11.0.2 (`npm pack`, each unpacked into
  its own empty directory under `.cache/critic5-pub`) were read against the tip's fresh
  `dist` and `npm pack --dry-run` (`cmp.py`, `dts.py`, `names.py`, `sizes.py` with
  `closure.mjs`).
- **Guard.** Every run went through `guarded`, WebKit under `--exclusive webkit`. It
  refused nothing and printed its zone-leak ARMED warning, a warning only. No WebKit lock
  wait passed a few minutes. The 1-minute load was 5 to 14.

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

Cells are Chromium 390 touch, Chromium 1440, WebKit 2287 at 390 touch, WebKit 2287 at 1440.

| tree | Chromium 390 | Chromium 1440 | WebKit 390 | WebKit 1440 |
|---|---|---|---|---|
| tip, all four parts | 127 passed, 18 skipped | 134, 11 | 101, 44 | 134, 11 |
| tip, part B again ×3 (WebKit 390) | | | 33 + **2 failed**; 35; 35 | |
| v11.1.0, three witness parts | 76 failed, 10 passed | 74, 16 | 66, 8 | 74, 16 |

Across the witness cells of the first pass: **290 red then green, 50 green on both, none
red on both, none failing on the tip.** Every v11.1.0 failure is an assertion on its
row's claim; none is a timeout, a navigation error or an unread film
(`logs/matrix-why.txt`).

| row | witness | verdict |
|---|---|---|
| 1 phone sheet | `form` at 390: Select R/G on all five paths in Chromium, on pick, Escape and current in WebKit; menu R/G on four paths in Chromium, three in WebKit | holds; fill and backdrop read on every exit frame |
| 2 phone popup is glass | `glass` at 390: R/G ×4 both engines | holds |
| 3 one exit curve | `exit`: R/G in every cell each surface opens in | holds |
| 4 every route | `routes`: R/G in every cell driven | holds |
| 5 reversal | `reverse`: R/G except `DropdownMenu reopened` (G/G ×4; v11.1.0 already turned from where it was) | **the disclosure reopen cells fail as unread in WebKit 390, one gate pass in four** (defect 1); **Collapsible reopened reads green on v11.1.0 in 2 of 10 probe readings** (defect 2) |
| 6 tooltips | `tooltip`: R/G ×2 at 1440 | holds |
| 7 CommandDialog | `routes · a CommandDialog keeps its list`: R/G in every cell driven | holds |
| 8 reduced motion | `site`, `fade`, `fold`, `mark`: R/G ×4; `press` R/G ×3 (WebKit 390 skipped); `still` G/G by design | holds |
| 9 ExpandableContainer | `expand`: exits and reopen R/G ×4; closed-while-entering R/G ×3 | **closed-while-entering reads green on v11.1.0 at Chromium 390** (defect 2) |
| 10 small cures | `weight` R/G ×4, `lift` R/G ×2 at 390 | holds |
| 11 leave-finished | `leave`: says-once R/G in every cell; shadow root, unmount, ContextMenu, hover card R/G | holds |
| 12 round ends | `round · wide` R/G ×2 at 390, `compact` G/G; radius-scale's restated coarse arm green on the tip (64 of 64) | holds |
| 13 (a) run mark | `mark`: R/G ×4 | holds |
| 13 (b) observer loop | left for 11.1.2 as the scope allows | not read |

The 50 green-on-both cells:

| cells | count |
|---|---|
| the `form` cells at 1440 (the claim is the phone's) | 18 |
| solid under reduced transparency | 2 |
| the compact strip | 2 |
| `DropdownMenu reopened` | 4 |
| ExpandableContainer's two no-regression reads | 8 |
| ExpandableContainer closed-while-entering at Chromium 390 | 1 |
| the "says nothing" cells, where v11.1.0 has no event | 11 |
| `still` | 4 |

Fix seat 5's cells, read again:
- **`press`.** It reads scale `1`, transform `none` and the rest width on every held frame
  for all four controls, and a fill step on each. The share of each crop that changes
  colour (Chromium 390, Chromium 1440, WebKit 1440):

  | control | share changed |
  |---|---|
  | Button | 0.77 / 0.71 / 0.71 |
  | icon seat | 0.45 / 0.41 / 0.41 |
  | tab seat | 0.69 / 0.68 / 0.68 |
  | menu row | 0.87 / 0.43 / 0.58 |

  The Button's fill moves from `oklab(0.673 … / 0.244)` to `oklab(0.626 … / 0.278)`. The
  row's moves from α 0.10 (0 under a finger) to 0.14. On v11.1.0, in every cell, the
  Button reads `1.0328 0.911` and the row `0.97`, each with its fill unchanged.
- **radius-scale** on the tip: 64 of 64 in Chromium and coarse touch.
- **The turn read** takes every reverse film from the last frame before the second input.
  The 15 `currentTime` writes land 2 to 4 ms after the reopening tap, within a
  millisecond. Its unread rule does what it says; defect 1 is about what it now reads as
  unread.

### 2. The motion rows' frame tables

Every read film on the tip, in shares of the travel (Chromium samples near 120 Hz, WebKit
near 100 Hz):

| | Chromium | WebKit |
|---|---|---|
| most carried by any 16.7 ms window | 0.195 | 0.183 |
| largest first moving sample | 0.106 in 17 ms | 0.121 in 12 ms |
| largest last sample before gone | 0.052 | 0.049 |
| longest hole in a moving table | 17 ms | 15 ms |
| largest step between two consecutive samples, unscaled | under 0.2 in every table | under 0.2 in every table |
| a sample against the leg's direction, outside the turn cells | none | none |

- **No cut at either end, no last-frame step, no overshoot.** One film's opacity falls
  from 1 to 0 between two samples: the detented Sheet's. For the eight frames before it
  unmounts it is wholly below the viewport's edge (top at 844 of 844, 900 of 900).
- **Exit clocks on the tip**, each under its entrance:

  | surface | exit | entrance |
  |---|---|---|
  | selects | 204 to 229 ms | 401 to 424 ms |
  | menus | 227 to 229 ms | 401 to 424 ms |
  | popovers | 256 to 262 ms | 480 to 485 ms |
  | tooltips | 126 to 132 ms | 223 to 238 ms |
  | a dialog | 192 to 198 ms | 250 to 260 ms |
  | a sheet | 259 to 278 ms | 463 to 653 ms |
- **Reduced motion** (`logs/legs-tip-*.txt`): 120 legs fade over 110 to 205 ms across 11
  to 26 frames, monotone, with no box step. The run mark travels 0 px. The leave event
  follows the last seen frame by 1 to 62 ms.
- **Gestalt.** Calm, read by the channels each film moves. A phone Select slides down
  past the foot of the screen and fades (y and opacity). A dock menu fades with its
  material held. A popover slides 8 px and fades. A tooltip fades. One effect per change,
  nothing added for ornament. Two films move more, and both do so as on v11.1.0 (open
  gaps A and C). The stalled films of defect 1 are not calm: there a reversed disclosure
  paints at 11 to 36 frames a second, and one painted frame carries 0.21 to 0.70 of the
  travel.

### 3. Earlier release specs on the tip

| | Chromium (headless-new) | WebKit 2287 |
|---|---|---|
| release-10-1-5, part A / part B | 84/84, 23/23 | 84/84, 23/23 |
| release-11-0-1 owner / daraksha / fix 2 / critic 2 | 9, 2, 14, 9 | 9, 2, 14, 9 |
| release-11-0-1 critic 1 and 1b | 24/24 | 22 + **2 failed** (red on v11.1.0 too, below) |
| release-11-0-2 with slider-forced-colors | 57/57 | 54 + 3 skipped |
| release-11-0-2 on coarse touch / on WebKit 2311 | 37 + 17 skipped | 51 + 3 skipped |
| ro-loop | 4/4 | 4/4 |
| release-10-1-3 (restated in 11.1.0) | 60/60 | 58 + 2 skipped |
| radius-scale (restated in 11.1.0 and here), Chromium and coarse touch | 64/64 | not matched |

Two titles fail on the tip, both in WebKit: "a light-1440f: the wide label seat's plate is
a capsule in paint" and the same at light-390c. Both throw a `TypeError` in the spec's
plate reader (`plateOf`, `release-11-0-1-critic-1.spec.ts:68`) on the pressed Focus seat.
They fail the same way on v11.1.0 in both of two runs (`logs/reg-red-c1-wk-{1,2}`) and on
the tip in both runs (`logs/reg-branch-c1-wk-{1,2}`). No title fails on the tip that
passes on v11.1.0. Earlier rounds did not run this spec (open gap I).

### 4. Nothing removed or renamed

Against the published 11.1.0 tarball (899 files, 3,035,791 B, `npm view`'s own figures):

- **`exports`**: 70 keys on both, none removed, added or changed. No other `package.json`
  field differs but `version` (`logs/package-vs-11.1.0.txt`).
- **Files**: the tip's pack holds 904 files, 3,054,903 B. None of the published files is
  absent, chunk hashes normalised. Five are added: `exit-press` and `leave-finished` with
  their declarations, and `turn.d.ts`.
- **Declarations**: ten files differ, additions only (`logs/dts-vs-11.1.0.txt`):
  - the `leaveFinished` emit and handler on the seven surface contents;
  - the Toast's `open` and `defaultOpen` defaults, declared `undefined`, so reka still
    sees no prop the caller did not pass;
  - two exports on the private overlay index;
  - renumbered locals and two reworded doc comments.
- **Names a consumer can reach** in the built CSS and JS (`logs/names-vs-11.1.0.txt`):

  | names | v11.1.0 | tip |
  |---|---|---|
  | custom properties | 1,164 | 1,170, none removed |
  | JS-written properties | 36 | 36 |
  | `@property` | 94 | 94 |
  | keyframes | | three added, none removed |
  | layers | | `reduced-motion` added |
  | `data-` attributes | | `data-leave-key`, `data-leaving` and `data-plate` added, none removed |

  In `src`, custom property declarations go from 1,114 to 1,118, none removed.
- **Defaults moved.** Each rests on an order the scope or a binding note names, and the
  CHANGELOG has each one:
  - `--exit-curve`;
  - the overlay register's scale, squish and blur;
  - the exit clocks, and the Dialog's own clock;
  - the narrow plate's attribute, `data-surface="opaque"` to `data-plate="firm"` (row 2's
    order);
  - the reduced-motion layer;
  - the press under reduced motion for `useLiquidPress`, the dock's seats and triggers,
    the glass Button and the menu row register;
  - ToggleGroupItem's weight;
  - `scale-on-hover`;
  - the coarse SegmentedTabs corner.

  The command palette's row moved with the menu row register and is not named
  (defect 3).

### 5. Gates on the committed tree

| command | exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `npm run verify:package` | 0: `CLEAN`, 3,054,903 B, equal to `.bundle-ratchet` |
| `npm run demo:dist:build` | 0 |
| `CI=true npx vitest run --maxWorkers=2` | 0: 285 files, 2,600 passed, 10 expected fail, 1 skipped |

No workflow file runs a browser. `.github/` is unchanged from v11.1.0, and `ci.yml` is
browser-free by its header, with no Playwright, browser or `tests-visual` step.
`scripts/release.sh` runs the exits gate under `set -e`. That gate failed in one of this
seat's four passes of its WebKit 390 part B: defect 1.

### 6. Comments added in `src`

All 1,082 added lines were searched, and the 219 added comment lines were read whole. The
search covered row, round and seat words, inbound and release ids, dates, site and
consumer names, "witness", "ruling", "owner" and "scope". None carries a stamp. "Seat"
appears only as the dock's own word for a control. Two internal phrases ride in
re-wrapped v11.1.0 sentences, not new ones (open gap G):
- the tranche path in `a11y-overrides.css`;
- "this round … the sheet family's next π" in `sheet/styles.css:538`.

### 7. The CHANGELOG entry

Outward prose, no internal ids, one em dash in the entry (the heading's).

- **The figures hold against the films** (item 2): about 220 ms for menus and selects,
  250 for popovers, 120 for tooltips, 180 for a dialog and 250 for a sheet. The dialog's
  180 is its clock; the film reads 192 to 198 ms to the last painted frame.
- **The source matches**: `--exit-curve`'s two values (`--motion-ease-out` is
  `cubic-bezier(0, 0, 0.2, 1)`), the layer order, the plate attribute, the eight
  `detail.kind` values and the seven keyframes.
- **The press sentence holds against the probe reads.** The glass Button's plate darkens,
  since the veil ink is dark in both schemes. The row takes a deeper fill.
- **The size lines are exact** on this seat's own measure (`logs/sizes.txt`). The dock
  entry is 38,673, 40,541 and 40,533 bytes; the five surface entries and the seven others
  are as printed. The next largest growths are under the bar (`collapsible` +463,
  `configurator` +448, `expandable-container` +436).

Not complete: defect 3.

## Defects

1. **The exits gate still stops by chance in WebKit at 390, and the stall is the
   branch's, not the machine's.**
   - **The gate stops.** Part B failed in one of this seat's four passes
     (`logs/tipB2-webkit-phone`). `reverse · a Collapsible reopened` and
     `· a Accordion reopened` both failed as unread, each with both films holed (85 and
     39 ms). `scripts/release.sh` stops there.
   - **The shape of the stall.** In every stalled film the frames come 28 to 80 ms apart at
     the film's median, up to 90 ms, for exactly as long as the region moves. They return to 10 ms
     the frame it comes to rest. This holds in fix seat 5's two twenty-repeat reads, this
     seat's gate passes and its probe.
   - **Where it starts.** The probe's second recorder places the onset in each of the 12
     stalled probe cells. The first frame after the closing tap is on time; the second is
     35 to 91 ms late. So the stall starts with the close of a rested region, before the
     reopen. The scroll offset is 0 throughout. The turn's seek is not it: its 15
     `currentTime` writes land 2 to 4 ms after the reopening tap and finish within a
     millisecond, in stalled and clean cells alike.
   - **Which cells.** It touches only the reopen cells, whose first input closes a rested
     region:

     | films | stalled |
     |---|---|
     | reopen, this seat (four gate passes, probe) | 28 of 42 |
     | reopen, with fix seat 5's two reads | 76 of 146 |
     | "closed while it opens" (the close lands mid-open), same runs | 0 of 108 |
     | v11.1.0, same probe and interleaving (`logs/stall5-red-webkit-phone`) | 0 of 40 |

     On v11.1.0 every film runs at 10 ms through every close and reopen, and every failure
     there is on the row's claim (24 "turns short", 14 "a frame over a fifth").
   - **What it means.** The record does not support "a stall the machine makes", and the
     unread rule now sets aside the films that show the fault. In them a reversed
     disclosure paints at 11 to 36 frames a second, and one painted frame carries up to
     0.70 of the travel. The frame share scales that down to 0.14 to 0.17, so a read film
     would pass.
   - **Cure, at the root.** Find what the branch does, at the close of a rested Accordion
     or Collapsible in WebKit at 390, that v11.1.0 does not. The probe is the
     reproduction: it stalls 12 of 20 reopen cells in ten repeats. Bisect the branch's
     `src` against v11.1.0 under it. If the page is slow, it is a paint fault of row 5,
     cured in the source; if the cell's own film loads the page, restate the film. Then
     the four cells read twenty interleaved repeats in WebKit 390 with no unread film and
     no failure, and the gate passes there three times running.

2. **The frame share passes a one-frame cut, so two witness cells read green on v11.1.0
   with the cut in their own film.** `worstFrameShare` (`release-11-1-1/film.ts:137`) pairs
   each sample with the first one at least 16.7 ms later and scales the change to one
   frame. A step that lands between two samples 8 to 12 ms apart is therefore read across
   about 25 ms and shrunk by a third.
   - `expand · an ExpandableContainer closed while it enters`, Chromium 390 on v11.1.0
     (`logs/redB-chromium-phone`): the panel falls from 0.28 to 0 between samples 8 ms
     apart, and the cell reads 0.191 and passes.
   - `reverse · a Collapsible reopened while it closes`, WebKit 390 on v11.1.0, 2 of 10
     probe readings (`logs/stall5-red-webkit-phone`): the region falls from 0.341 to 0.047
     (and 0.328 to 0.035) in one 10 to 12 ms frame before it regrows. The cell reads 0.172
     and 0.179 and passes; `turnedAt` clears its 0.02 bound by the restart's few pixels.

   Critiques 2, 3 and 4 carried this as an open gap. The note after critique 1 (item 4)
   rules that a witness which does not bite is restated so it is RED on v11.1.0 where the
   fault exists, and here the fault is in the cell's own film. Cure: read a step between
   two consecutive samples less than a frame apart whole, and keep the scaling only for a
   change that spans more than a frame. Then the two cells read red on v11.1.0 in twenty
   repeats each. The tip stays green under that read: this seat's unscaled read of every
   tip table finds no consecutive step over a fifth (`steps5.py`).

3. **The CHANGELOG leaves out the command palette's rows.** The reduced-motion paragraph
   says "a menu or select row" keeps its size and, when pressed, takes a fill a step
   deeper than its highlight. Both rules sit on the shared row register:
   `.interactive-item` (`utilities/base.css:337`) and `.glass-menu-row`
   (`_shared/menu/menu.css:107`). `CommandItem` takes both through `rowClass()`
   (`command/CommandItem.vue:46`), so a `CommandDialog` row moved the same way and is not
   named. Name it in that sentence.

## Open gaps (for INBOUND)

A. **A dock Select picked at 1440 hops 10 px sideways on its first exit frame** (679 to
   669), as the trigger's new label re-places the anchored plate. v11.1.0 does the same.
B. **Other press scales under reduced motion.** Three still land at their press scale at
   once:
   - a pressable `Card` (`.card[role="option"]`, `card/styles.css:197`);
   - a `SortableList` handle (`sortable-list/styles.css:186`);
   - the Dialog close button's plate (`dialog/styles.css:136-139`).

   The ruling after critique 2 names "every control that scales on press". The
   CHANGELOG's list does not claim these three.
C. **The Dialog leaves on three channels**: opacity, a scale of about 5 % and an 11 px
   drop. The CommandDialog box goes from 350 to 333 px wide at 390, and from 512 to 487
   at 1440. Only its clock changed here.
D. **A pressed glass Button's fill step is small**: about 2 to 3 L* over a light ground
   (α 0.244 to 0.278 of the veil ink). The paint read passes at 0.7 of the crop changing
   by more than 12 of 765. For comparison, the dock seats step to α 0.20 and
   `brightness(0.96)`.
E. **`gate.sh`**: its header says three parts, and it runs four. With
   `GLASS_UI_DEMO_PORT` unset it serves on 5199 with `reuseExistingServer`, so a server
   another tree left there would be the one measured.
F. **Stale comments** (not stamps): `Toast.vue:124`, `animations.css:146`, the comment
   above `glass-reveal-out-reduced`, and `reveal.css:120` (critique 4's gap G).
G. **Internal phrases carried in re-wrapped sentences.** `a11y-overrides.css` points at a
   tranche document by path. `sheet/styles.css:538` says "this round" and "the sheet
   family's next π".
H. **Internal tokens moved without a CHANGELOG line**: the overlay register sets
   `--lq-stretch-x` and `-y` to `1` and `--glass-reveal-enter-scale` and
   `--glass-reveal-blur` to `1` and `0px`. They are undocumented. The entry names the
   public `--enter-overlay-*` knobs they used to read.
I. **release-11-0-1-critic-1** in WebKit: the two light "capsule in paint" titles throw in
   `plateOf` on both trees. The spec was not in earlier rounds' list.
J. Carried:
   - routes not driven (critique 3's gap C);
   - a drag-dismissed Sheet under reduced motion still snaps (gap D);
   - WebKit at 390 holds no press in Playwright, and real Safari is unmeasured for the
     press, the drag and the firm plate's paint;
   - row 13 (b) for 11.1.2;
   - the CHANGELOG heading still reads "unreleased".
