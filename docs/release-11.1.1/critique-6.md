# 11.1.1 critique 6

Critic: claude-opus-5-5, by the orchestrator's ruling while Fable is out of quota; fresh,
built nothing on the branch. Tip read: `110da49fd` on `release/11.1.1`. While this seat's
runs were under way two orchestrator notes landed, `039023fed` (the ruling on fix 6) and
`b0609d2d8` (atlas's two sheet rows), each one file under `docs/release-11.1.1/`, with no
source, spec or CHANGELOG change, so every reading here stands for `b0609d2d8`; the gates
of item 5 ran on `039023fed`. Both notes bind fix seat 7 and critics 7 on; this seat reads
the tip against them where they touch a defect. Tracked tree clean before and after. Verdict: **not ready to tag.** Three defects.

1. The disclosure turn still stalls WebKit at 390: the exits gate's part B failed in two
   of this seat's four passes there, on the Accordion and Collapsible reopen cells, as
   unread films. The ruling after fix 6 removes the turn; that cure is not built at this
   tip.
2. The detented Sheet's standing cell fails by chance in Chromium at 390: 2 of 21
   readings carry 0.209 and 0.224 of what is seen in one frame, against a bound of 0.2,
   so `scripts/release.sh` stops there by chance too. The motion is within the bound;
   the cell's seen channel divides by the box's shrinking area and does not see the
   sheet shrink.
3. The CHANGELOG's reduced-motion paragraph says toasts vanished in a single frame on
   11.1.0, which the films contradict; it leaves out `ExpandableContainer`'s new
   reduced-motion fade and the `.interactive-item` utility's press.

Fix seat 6's cures hold: the frame share now reads a one-frame cut whole (the
ExpandableContainer cell is red on v11.1.0 in Chromium 390), the three press controls,
`gate.sh`, the comments, and the CHANGELOG's command palette rows.

Everything here was run by this seat. Tools, logs and readings are under `critic-6/`.

## How it was read

- **Trees.** The tip is the worktree. v11.1.0 is the `git archive` tree at
  `.cache/red-v11.1.0/tree`. Its `src`, `demo`, `scripts`, `tests`, `package.json`,
  `package-lock.json`, `index.html`, every `vite.*` and `tsconfig*` file and the two
  Playwright base configs were compared with a fresh `git archive v11.1.0` (`d19e12559`,
  unpacked at `.cache/critic6-v11.1.0/fresh`): no difference. The tip's 11.1.1 specs,
  config and harnesses are copied in before each red run (`run.sh`).
- **Witness.** The exits gate's four parts in its four projects on the tip, each process
  serving on its own port (5351 for the tip, 5352 for v11.1.0) with `GLASS_UI_DEMO_OWN`
  set, as `gate.sh` runs them (16 runs,
  `logs/tip{0,1,2,3}-*`), and the same four parts on v11.1.0 (16 runs, `logs/red*-*`), each
  with its own report. Then part B three more times in WebKit at 390
  (`logs/tip1-webkit-phone-{2,3,4}`). Verdicts per cell: `logs/matrix.txt`; why each
  v11.1.0 cell failed: `logs/matrix-why.txt`.
- **Reads.** Frame-table extremes (`sum.py`, `logs/sum-tip.txt`); every table's largest
  step between two consecutive samples, unscaled (`steps5.py`, `logs/steps-tip.txt`);
  reduced-motion legs (`legs.py`, `logs/legs-tip.txt`); the channels each film moves
  (`channels.py`, `logs/channels-tip.txt`); unread reverse films (`unread.py`); standing
  shares across every round's reports (`standing.py`).
- **Probes** (readings only). `probe/detent.probe.ts` films the standing cell's detented
  Sheet with every raw frame attached (box, effective opacity), four repeats in Chromium
  390 (`logs/detent-raw-chromium-phone`); the standing detented-Sheet cells were repeated
  ten times there (`logs/tip-detent10-chromium-phone`). Critic 5's stall probe, verbatim,
  ten repeats in WebKit 390 on the tip (`logs/stall-tip-webkit-phone`).
- **Earlier release specs**, one guarded call per engine (`reg-inner.sh`, `logs/chain.txt`;
  screenshots each spec writes stay out of the commit):
  - release-10-1-5, in two halves;
  - release-11-0-1: owner, daraksha, fix 2, critic 2, and critic 1 with 1b;
  - release-11-0-2 with slider-forced-colors, then on coarse touch (Chromium) and on
    WebKit 2311;
  - the specs 11.1.0 added or restated: ro-loop, release-10-1-3 and radius-scale
    (Chromium and coarse touch; no WebKit project matches radius-scale).

  A step that failed on the tip ran on v11.1.0 twice (`chain2.sh`).
- **Package.** The registry tarballs of 11.1.0 and 11.0.2 (`npm pack`, sha-256 equal to
  critic 5's, each unpacked into its own empty directory under `.cache/critic6-pub`), read
  against the tip's own pack of the gate's fresh `dist` (`pack.sh`: `cmp.py`, `dts.py`,
  `names.py`, `classes.py`, `sizes.py` with `closure.mjs`).
- **Guard.** Every run went through `guarded`, WebKit under `--exclusive webkit`. It
  refused nothing and printed its zone-leak ARMED warning, a warning only. Two WebKit
  runs waited on the lock about 13 minutes each (`logs/runs.out`: wall time less
  Playwright's own), the rest a minute or less; none came near the 60-minute mark. The 1-minute load was 5 to 16.

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

Cells are Chromium 390 touch, Chromium 1440, WebKit 2287 at 390 touch, WebKit 2287 at 1440.

| tree | Chromium 390 | Chromium 1440 | WebKit 390 | WebKit 1440 |
|---|---|---|---|---|
| tip, all four parts | 126 passed, 1 failed, 18 skipped | 134, 11 | 101, 44 | 134, 11 |
| tip, part B again ×3 (WebKit 390) | | | 33 + **2 failed**; 34 + **1 failed**; 35 | |
| v11.1.0, all four parts | 101 failed, 26 passed, 18 skipped | 102, 32, 11 | 81, 20, 44 | 103, 31, 11 |

In the witness parts (A, B and D) of the first pass: **292 red then green, 48 green on
both, none red on both, none failing on the tip.** Every v11.1.0 failure is an assertion
on its row's claim; none is a timeout, a navigation error or an unread film
(`logs/matrix-why.txt`). The standing part (C) is item 2's.

| row | witness | verdict |
|---|---|---|
| 1 phone sheet | `form` at 390: Select R/G on all five paths in Chromium, on pick, Escape and current in WebKit; menu R/G on four paths in Chromium, three in WebKit | holds |
| 2 phone popup is glass | `glass` at 390: R/G ×4 both engines; solid under reduced transparency G/G (no fault there on v11.1.0) | holds |
| 3 one exit curve | `exit`: R/G in every cell each surface opens in | holds |
| 4 every route | `routes`: R/G in every cell driven | holds |
| 5 reversal | `reverse`: R/G except `DropdownMenu reopened` (G/G in three cells, R/G at Chromium 1440: v11.1.0 mostly turned from where it was) | **the disclosure reopen cells fail as unread in WebKit 390, two passes in four** (defect 1) |
| 6 tooltips | `tooltip`: R/G ×2 at 1440 | holds |
| 7 CommandDialog | `routes · a CommandDialog keeps its list`: R/G in every cell driven | holds |
| 8 reduced motion | `site`, `fade`, `fold`, `mark`: R/G ×4; `press` R/G ×3 (WebKit 390 skipped); `still` G/G by design | holds |
| 9 ExpandableContainer | `expand`: exits, reopen and closed-while-entering R/G ×4 | holds (critique 5's defect 2 is cured: closed-while-entering is red on v11.1.0 at Chromium 390) |
| 10 small cures | `weight` R/G ×4, `lift` R/G ×2 at 390 | holds |
| 11 leave-finished | `leave`: says-once R/G in every cell; shadow root, unmount, ContextMenu, hover card R/G | holds |
| 12 round ends | `round · wide` R/G ×2 at 390, `compact` G/G | holds |
| 13 (a) run mark | `mark`: R/G ×4 | holds |
| 13 (b) observer loop | left for 11.1.2 as the scope allows | not read |

The 48 green-on-both witness cells: the `form` cells at 1440 (18; the claim is the
phone's), solid under reduced transparency (2), the compact strip (2), `DropdownMenu
reopened` (3), ExpandableContainer's two no-regression reads (8), the "says nothing" cells
where v11.1.0 has no event (11), `still` (4).

**Fix seat 6's press cell, read again.** The Card, the SortableList handle and the close
plate hold scale 1 on every held frame on the tip in Chromium 390, Chromium 1440 and
WebKit 1440, each with its fill stepping; on v11.1.0 the Card reads 0.97, the handle 0.96
and the plate 0.96 (from 1.08 under a hovering pointer) in all three (`logs/red3-*`).

### 2. The motion rows' frame tables

Every read film on the tip, in shares of the travel (Chromium samples near 120 Hz, WebKit
near 100 Hz). WebKit is read without the two stalled passes of defect 1.

| | Chromium | WebKit |
|---|---|---|
| most carried by any 16.7 ms window | **0.224** (the detented Sheet, defect 2); outside its cells 0.185 | 0.185 |
| largest first moving sample | 0.115 in 6 ms (the detented Sheet) | 0.127 in 13 ms |
| largest last sample before gone | 0.053 | 0.056 |
| longest hole in a moving table | 18 ms | 16 ms |
| largest step between two consecutive samples, unscaled | under 0.2 in every frame table | under 0.2 in every frame table |
| a sample against the leg's direction, outside the turn cells | none | none |

- **No last-frame step, no overshoot.** One film's opacity goes from 1 to 0 between two
  samples: the detented Sheet's, at its unmount, after about 100 ms wholly below the
  viewport's edge (item 2's probe: under 1 % on screen from 374 to 384 ms, unmounted at
  477 to 484 ms).
- **Exit clocks on the tip**, each under its entrance (the `exit` cells):

  | surface | exit | entrance |
  |---|---|---|
  | selects | 198 to 235 ms | 406 to 417 ms |
  | menus | 229 to 235 ms | 404 to 425 ms |
  | popovers | 250 to 257 ms | 482 to 487 ms |
  | tooltips | 122 to 125 ms | 227 to 244 ms |
  | a dialog | 193 to 199 ms | 244 to 258 ms |
  | a side or bottom sheet | 258 to 277 ms | 462 to 656 ms |

- **Reduced motion** (`logs/legs-tip.txt`): 120 legs fade over 110 to 206 ms across 11
  to 26 frames, monotone, with no box step. The leave event follows the last seen frame
  by 1 to 54 ms.
- **The standing cell fails once in the gate pass** (Chromium 390, `standing · detented
  Sheet by outside`, 0.224 of what is seen in one frame), on a channel that does not see
  the sheet shrink: defect 2. The other 155 standing cells of the pass are green; 94 of them
  are red on v11.1.0 and 61 green there too, the surfaces whose exits were already whole
  on 11.1.0 (the Dialog, the four edge Sheets, the Accordion and the Collapsible).
- **Gestalt.** Calm, read by the channels each film moves (`logs/channels-tip.txt`). A
  phone Select slides down past the foot of the screen and fades. A dock menu fades with
  its material held. A popover slides 8 px and fades. A tooltip fades. One effect per
  change, nothing added for ornament. Two films move more, both as on v11.1.0: the
  Dialog's scale and drop (booked for 11.1.2 as critique 5's gap C) and the detented
  Sheet's own spring with its fill following its rung. The stalled films of defect 1 are
  not calm: their frames come 34 to 51 ms apart while the region moves, and one painted
  frame carries up to 0.34 of the travel.

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

The two WebKit titles that fail on the tip are "a light-1440f: the wide label seat's plate
is a capsule in paint" and the same at light-390c. Each throws `TypeError: Cannot read
properties of null` in the spec's plate reader (`release-11-0-1-critic-1.spec.ts:68`), and
each fails the same way on v11.1.0 in both of two runs (`logs/reg-red-c1-wk-{1,2}`): the
witness fault the ruling after critique 5 booked for 11.1.2 (its gap I). No title fails
on the tip that passes on v11.1.0.

### 4. Nothing removed or renamed

Against the published 11.1.0 tarball (899 files, 3,035,791 B, `npm view`'s own figures):

- **`exports`**: 70 keys on both, none removed, added or changed. No other `package.json`
  field differs but `version` (`logs/package-vs-11.1.0.txt`).
- **Files**: the tip's pack holds 904 files, 3,055,440 B unpacked (1,121,589 B packed),
  equal to `.bundle-ratchet`. None of the published files is absent, chunk hashes
  normalised. Five are added: `exit-press` and `leave-finished` with their declarations,
  and `turn.d.ts`.
- **Declarations**: ten files differ, additions only (`logs/dts-vs-11.1.0.txt`): the
  `leaveFinished` emit and handler on the seven surface contents, the Toast's `open` and
  `defaultOpen` in its defaults (declared `undefined`), two exports on the private overlay
  index, renumbered locals, two reworded doc comments, and `align` moved within its type.
- **Names a consumer can reach** (`logs/names-vs-11.1.0.txt`, `logs/classes-vs-11.1.0.txt`):

  | names | v11.1.0 | tip |
  |---|---|---|
  | custom properties in the built CSS | 1,164 | 1,170, none removed |
  | JS-written properties | 36 | 36 |
  | `@property` | 94 | 94 |
  | keyframes | 97 | 100, none removed |
  | layers | 4 | 5 (`reduced-motion`) |
  | `data-` attributes | 177 | 180 (`data-leave-key`, `data-leaving`, `data-plate`) |
  | class selectors in the built CSS | 652 | 652, none removed |

  In `src`, custom property declarations go from 1,129 to 1,135, none removed.
- **Defaults moved.** Each rests on an order the scope or a binding note names:
  `--exit-curve`; the overlay register's scale, squish and blur; the exit clocks and the
  Dialog's own; `data-surface="opaque"` to `data-plate="firm"` on the narrow plate; the
  reduced-motion layer; the press under reduced motion (`useLiquidPress`, the dock's seats
  and triggers, the glass Button, the menu row register, the Card, the SortableList
  handle, the close plate); ToggleGroupItem's weight; `scale-on-hover`; the coarse
  SegmentedTabs corner. The CHANGELOG names each, with defect 3's three exceptions.

### 5. Gates on the committed tree

At `039023fed` (`gates.sh`, `logs/gates.out`), one guarded run each:

| command | exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `npm run verify:package` | 0: `CLEAN`, 1,121,589 B packed, unpacked size equal to `.bundle-ratchet` (3,055,440) |
| `npm run demo:dist:build` | 0 |
| `CI=true npx vitest run --maxWorkers=2` | 0: 285 files, 2,600 passed, 10 expected fail, 1 skipped |

No workflow file runs a browser: `.github/` is unchanged from v11.1.0; `ci.yml` and
`release.yml` run `npm ci`, typecheck, build, `verify:package`, `demo:dist:build` and
`npm test`, with no Playwright, browser or `tests-visual` step. `scripts/release.sh` runs
the exits gate under `set -e`, and that gate stops by chance at defects 1 and 2.

### 6. Comments added in `src`

All 1,141 added lines in `src` were searched for row, round, seat, wave and band words,
inbound and release ids, dates, tranche paths, site and consumer names, "witness",
"ruling", "owner", "scope", "critic", "fix seat" and "π", and the added comment lines were
read whole. None carries a stamp. The hits are the English "round", the CSS `round` and
`:scope`, and "seat" as the dock's own word for a control and the spring's "seated". The
stale phrases critique 5 listed are gone (`82e481984`).

### 7. The CHANGELOG entry

Outward prose, no internal ids, one em dash in the entry (the heading's).

- **The figures hold against the films**: about 220 ms for menus and selects, 250 for
  popovers, 120 for tooltips, 180 for a dialog (its film reads 193 to 199 ms to the last
  painted frame) and 250 for a side or bottom sheet.
- **The source matches**: `--exit-curve`'s two values, the layer order, the plate
  attribute, the eight `detail.kind` values and the keyframes it names.
- **The size lines are exact** on this seat's own measure of the tip's pack against the
  two registry tarballs (`logs/sizes.txt`): the dock entry 38,673, 40,541 and 40,533
  bytes; the five surface entries and the seven others as printed. Fix seat 6's source
  commits are stylesheet rules, so no JS entry moved after critique 5's measure.
- **The press sentence** now names the command palette's `CommandItem` and fix seat 6's
  three controls.

Not true or not complete: defect 3.

## Defects

1. **The disclosure turn still stalls WebKit at 390, and the gate stops there.**
   - **The gate.** In this seat's four passes of part B in WebKit 390, two failed
     (`logs/tip1-webkit-phone-2`, `-3`): `reverse · a Collapsible reopened` and
     `· a Accordion reopened` in the first, the Accordion's alone in the second, each as
     unread with both films holed (37 to 72 ms). 6 of 11 reopen films were holed; 0 of 8
     "closed while it opens" films. While the region moves the frames come 34 to 51 ms
     apart at the film's median, and 10 ms apart once it rests.
   - **The probe.** Critic 5's stall probe, verbatim, ten repeats of the four disclosure
     reversal cells interleaved, in WebKit 390 on the tip (`logs/stall-tip-webkit-phone`):
     4 of 20 reopen cells failed, all as unread; 8 of 24 reopen films were holed; 0 of 20
     "closed while it opens" films. The stall is where critique 5 and fix seat 6 left it.
   - **Ruled, not built.** The orchestrator's ruling after fix 6 (`039023fed`) removes
     `useDisclosureTurn` and its two call sites, takes the four disclosure reversal cells
     out of row 5's witness with one guard cell, and drops the Accordion and Collapsible
     from the CHANGELOG's reversal sentence. None of that is at this tip, so item 1 and the
     gate are not met. Witness, as the ruling states: part B green in WebKit 390 three
     times running, v11.1.0's reds on the remaining row 5 cells still red.

2. **The detented Sheet's standing cell fails by chance in Chromium at 390, on a read
   that does not see the sheet shrink.**
   - **The readings.** `standing · detented Sheet by outside` read 0.224 of what is seen
     in one frame in the gate pass (`logs/tip2-chromium-phone`) and 0.209 in one of ten
     repeats (`logs/tip-detent10-chromium-phone`); the other nineteen Chromium 390
     readings of the two detented cells sit between 0.159 and 0.198. Earlier rounds read
     the two cells at 0.171 to 0.198 there (critique 5's were 0.196 and 0.198;
     `standing.py` over every round's reports). Its travel share stays at 0.10
     to 0.13. Chromium 1440 and WebKit read 0.15 to 0.18. The `routes` cells for the same
     sheet use the same channel and read 0.179 and 0.181 at Chromium 390 in the gate pass.
   - **The cause** (`logs/detent-raw-chromium-phone`, four raw films a route). The plate
     shrinks from its 0.5 rung (422 px) to its floor (171 px) by 124 to 134 ms, wholly on
     screen, and then slides the 171 px box off the foot of the screen. The cells' "seen"
     channel (`seenIn`, `release-11-1-1.spec.ts:460`) divides the area on screen by the
     box's own area at that frame. So it reads the shrink, in which the plate loses 60 %
     of what was seen, as no change at all, and reads the slide of the short floor box as
     the whole of what is seen: 0.15 to 0.22 a frame as the spring crosses the floor.
     Read against the area on screen at rest, the same eight films carry at most 0.103
     to 0.117 in one frame, in line with their travel share. The motion is within the
     bound; the channel is not measuring it.
   - **What it means.** `release.sh` stops on this cell about one pass in ten in
     Chromium 390, by the witness, not by the machine or the motion.
   - **Cure, at the root.** The seen channel of the standing and `routes` cells reads the
     area on screen (times opacity and the clip's share) against the area on screen at
     rest, the start frame's, not against the box's area at each frame, so a surface that
     shrinks before it slides is read by what a person sees go. No source change. v11.1.0
     stays red: its detented Sheet was unmounted with its 171 px floor box, about 0.4 of
     the area at rest, on screen. Witness: the two standing and the two `routes`
     detented cells read twenty repeats each in Chromium 390 under 0.2 on the tip, red on
     v11.1.0; every other standing and `routes` cell keeps its verdict in all four
     projects. The note on atlas's sheet rows (`b0609d2d8`) changes the same sheet's
     entrance and its upward release, not its close; read these four cells after those
     rows land.

3. **The CHANGELOG's reduced-motion paragraph is not true of toasts and not complete.**
   - **Toasts did not vanish in a single frame on 11.1.0.** The paragraph opens: "With
     reduced motion turned on, popovers, menus, selects, tooltips, toasts, dialogs and
     sheets appeared and vanished in a single frame". A Toast's dismissal faded on
     11.1.0: its `fade` film reads 15 to 22 fading frames over 173 to 179 ms in all four
     cells (critic 5's `logs/redD-*`, and this seat's `logs/red3-*`); only its entrance
     was a single frame. The dissolve's reduced-motion carve held its clock at
     `--vap-clock` (250 ms); the tip holds it to `min(--vap-clock, --duration-fast)`, and
     the film reads 148 to 155 ms. Say that a toast appeared in a single frame and faded
     out, and that its fade out is now at most 200 ms.
   - **`ExpandableContainer` is not named.** On 11.1.0 under reduced motion it appeared
     and vanished in one frame (its `fade` cell: no fading frame either way, ×4); on the
     tip it fades in and out over 110 to 122 ms (`expandable-container/styles.css`, the
     reduced block, 0.12 s on `--exit-curve`). Neither its own paragraph nor the
     reduced-motion paragraph says so.
   - **The `.interactive-item` utility is not named.** The press rule moved on the
     utility class itself (`utilities/base.css`: `.interactive-item:active` now takes
     `scale: 1` under reduced motion, where it shrank to 0.97), and a site composes that
     class on its own rows (the demo's `infinite-scroll` and `virtual-section` stories
     do). The sentence names the component rows that wear it, not the class. Name it, as
     the paragraph names `useLiquidPress`.

## Open gaps (for INBOUND)

A. **Hover scales under reduced motion.** The close plate's hover scale now goes under
   reduced motion (the CHANGELOG says so); other hover scales still land at once there
   (`scale-on-hover`'s lift where the pointer hovers). The ruling after critique 2 covers
   the press only.
B. **The detented Sheet leaves on its own spring** (critique 4's gap E): under 1 % on
   screen at 374 to 384 ms and unmounted at 477 to 484 ms, a sub-pixel tail at the
   viewport's foot for about 100 ms, so its leave-finished event comes about 100 ms after
   its last visible frame. The CHANGELOG's "a sheet in 250 ms" is the plain Sheet's.
C. **An internal path in a carried sentence.** `glass/dissolve.css` still points at a
   tranche document by path ("the enumerated + hashed AUTH-3 row of the
   §PRM-AUTHORIZED-SET ... `docs/tranches/BJ/waves/BAND-FEEDBACK-MOTION.md`"), in lines
   11.1.0 shipped; the branch re-wraps the sentence before it. `tests/styles/dissolve.test.ts`
   now names that path itself.
D. **The release-10-1-5 critic specs.** No round has run the thirty
   `release-10-1-5-critic-*` and `-fix-*` specs; item 3 reads `release-10-1-5.spec.ts`,
   as every round did.
E. Carried from the ruling after critique 5: A (the 1440 Select's 10 px hop), C (the
   Dialog's three channels), D (the glass Button's fill step), I
   (`release-11-0-1-critic-1`'s two WebKit titles), J (routes not driven, a drag-dismissed
   Sheet under reduced motion, real Safari, row 13 (b), the CHANGELOG heading's date).
