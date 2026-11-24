# 11.1.1 critique 13

Critic: claude-opus-5-5, read from the seat's own identity. A fresh seat; it built nothing on the
branch.

**Tip read:** `4f1fa667e` on `release/11.1.1` (fix seat 13's record). Its source last changed at
`4c30732a0` (the palette's held query), its specs at `4c30732a0`, the demo at `2cce4d8a9` (the
substrate stages' renderer attributes), `scripts/release.sh` at `9c85560b0`, and the CHANGELOG
and the ratchet at `136ab6da8`. Since critique 12 (`97b6e324a`) the branch took master at
`d464304d7` (master's `48bebb122`: the rebuilt demo, the deploy's asset-miss check, two
unreachable exports made module-local), two ratchet rebinds, the close's record and fix seat
13's commits. I read every orchestrator note in this directory (fifteen), `critique-12.md`,
`close/close.md`, `fix-13.md`, the scope file in the main checkout and
`git log v11.1.0..release/11.1.1`.

**Verdict: not ready to tag.** Seven of the eight items hold. Item 1 fails on one witness: row
10's lift cell reads GREEN on v11.1.0's library as on the tip, because since the merge the demo
stylesheet it runs on no longer generates the `scale-on-hover` rule it tests (defect 1). The
library's cure is sound; the gate no longer shows it. Everything else on the list holds,
including the note's items (a) to (e) on the merged tree. Three tip readings in WebKit failed in
the gate run on their own preconditions under load and read GREEN when run again (item 1, open
gaps B and D).

## How it ran

One sitting, 2026-11-23 13:01 to 19:55.
- Every build, test and browser run went through `guarded`, WebKit under `--exclusive webkit`.
  **The guard refused nothing.** It printed its zone warning (armed, a warning only) from 17:20
  on. It held runs for headroom often: the 1-minute load ran 11 to 279 (other sessions; 279 at
  14:44), the planted floor leg waited 53 minutes for a browser slot, and the WebKit batch
  waited 23 minutes for the machine-wide WebKit lock (another session's 85-minute run held it).
  I stopped that batch by its PID before any job of it ran, ran the Chromium-only batches in the
  wait, and queued the WebKit batch after them (`batch2.sh`), which waited again from 18:24 to
  18:56 for the lock and headroom and ran to 19:50. `logs/runs.out` records it: its "batch 2
  done" line at 16:33 is false and the next line says so, and the line for
  `tip-webkit-phone-2` is written by hand from its log, because I edited `job.sh` while that
  job ran and its closing line was lost (the log is whole; later edits went in by an atomic
  rename).
- One heavy run of this seat at a time. After the gates and the floor, each guarded call runs a
  list of jobs (`critic-13/job.sh`, `batch.sh`, `batch2.sh`), one Playwright process per part
  as `gate.sh` splits them, so a list waits for admission once. Run lines in `logs/runs.out`,
  the earlier specs' lines in `logs/chain.txt`.
- **The trees** (`critic-13/trees.sh`, built at 13:04 before any server of this seat):
  - **red**: a `git archive` of HEAD without `docs/`, its `src/` replaced by `git archive
    v11.1.0 -- src`. Its `src` equals v11.1.0's, 678 blobs of 678, and everything outside `src`
    and `docs` equals HEAD's, 915 of 915 (`logs/red-src.cmp`, `logs/red-rest.cmp`). It is
    v11.1.0's library under the tip's demo, specs and harnesses, so it differs from the tip in
    the library alone. A plain v11.1.0 archive cannot read the CommandDialog cells: they drive
    the rebuilt Command page, which v11.1.0's own demo does not have.
  - **pre**: HEAD's archive with `src/components/command/CommandInput.vue` as `80287b971` has
    it, the merged tip before item (c)'s cure (`logs/pre-commandinput.txt`).
  - Each tree's `node_modules` links the worktree's entries, with its own Vite cache.
- Ports 5351 to 5356, each Playwright process on its own server (`GLASS_UI_DEMO_OWN`).
- The published 11.1.0 and 11.0.2 tarballs are critique 12's (`.cache/critic12-pub`); their
  sha-1 equal the registry's (`2180c51d…`, `b425a414…`, read again with `npm view`).
- Probes (readings only), each copied into a tree's `tests-visual/` for its run and removed
  after: `probe-cmd/cmd.probe.ts` (a CommandDialog on its defaults and one with
  `unmountOnHide: false`, through a close and the next open), `probe-cmd/typed.probe.ts` (the
  demo's palette with a query typed, then a tap, Enter or Escape, filmed per frame),
  `probe-lift/lift.probe.ts` (whether the controls harness's `scale-on-hover` tile carries the
  utility's rule) and `probe-leave/leave.probe.ts` (the leave cell's Dialog, every moment
  stamped on the page's clock).

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

**Fails, on one witness:** row 10's lift cell (`lift · a scale-on-hover element returns to rest
after a tap`) reads GREEN on both trees, because on the merged tree the page it runs on carries
no `.scale-on-hover` rule at all (defect 1). Every other witness holds.

**How it was read.**
- The exits gate's sixteen parts ran on the tip and on the red tree, one process per part as
  `gate.sh` splits them (`logs/tip-<project>-<part>`, `logs/red-<project>-<part>`): Chromium
  15:35 to 16:09 at a load of 11 to 67, WebKit 19:02 to 19:48 (the tip first) at a load of 26
  to 66.
- **On the tip** every Chromium part exits 0 with critique 12's counts, the CommandDialog cells
  green again. In WebKit three readings failed, each on a precondition the cell sets for its
  own film, and each reads GREEN when run again (below):

| project | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 38 + 3 skipped | 33 + 11 skipped | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 28 + 13 skipped | 43 + 1 skipped | 44 | 18 |
| WebKit 390 | 25 + 16 skipped | 31 + 11 skipped + **2 failed** | 27 + 17 skipped | 16 + 2 skipped |
| WebKit 1440 | 28 + 13 skipped | 42 + 1 skipped + **1 failed** | 44 | 18 |

- `tools/matrix.py` (`logs/matrix.txt`, `matrix-why.txt`): 147 titles in four projects. **377
  readings are RED on v11.1.0 and GREEN on the tip, 116 green on both, 92 skipped on both and 3
  RED on both.** No reading on either tree is a timeout, an interruption or a missing report.
  All 92 skips carry the spec's stated reasons, as critique 12 listed them.
- **The three tip failures**, read again:
  - **WebKit 390, "reverse · a Select / a DropdownMenu closed while it opens turns from where
    it is"**, both on "the film is read: no hole of more than two frames" (holes of 60 and
    56 ms in the second film, in a run at a load of 36 to 57). The cell films once more when the first film
    holes, so under load both films can hole. I ran the two cells three times a run, tip and
    v11.1.0 interleaved (`logs/rev-{tip,red}-wp*`, 19:10 to 19:36, load 29 to 66): across the
    gate and four runs the tip passed 17 of 26 readings, and every one of its 9 failures is the
    hole precondition; v11.1.0 passed none of 14, 12 on "no frame after the turn moves more
    than a fifth" (the claim) and 2 on the hole. The tip's passing films in `rev-tip-wp2` turn
    at shares of 0.038 to 0.085. The cell is RED on v11.1.0 and GREEN on the tip whenever its
    film is readable (open gap D).
  - **WebKit 1440, "leave · a Dialog closed and reopened mid-exit says nothing"**: "no
    leave-finished event". A copy of the cell with every moment stamped on the page's clock,
    ten times on the tip at a load of 37 to 41 (`probe-leave/`, `logs/leave-tip-wd`, 19:20): in
    nine, the reopening press reached the page 91 to 167 ms after Escape, mid-exit, the dialog
    opened again and no event fired. In one, the press was sent at 69 ms and reached the page at
    266 ms; the dialog had finished its exit at 203 ms (the event) and was gone at 214 ms. That
    is the gate's failure: a whole exit, correctly reported, which the cell reads as a reversed
    close that spoke. The cell has no clause that its press lands mid-exit (open gap B).
- **Against critique 12's matrix** seven titles differ (`diff` of the two `matrix.txt`):
  - the lift cell, R/G to **G/G** in Chromium 390 and WebKit 390 (defect 1, below);
  - the three tip failures above (WebKit 390 twice, WebKit 1440 once), R/G to R/R;
  - four no-regression reads whose v11.1.0 reading is timing: a DropdownMenu reopened while it
    closes (Chromium 1440 R/G to G/G; WebKit 390 G/G to R/G on "the second input lands
    mid-motion", the cell's own precondition, on v11.1.0), the Dialog's standing cell by close
    (Chromium 1440 R/G to G/G; WebKit 390 G/G to R/G, share 0.242 on v11.1.0) and by an
    outside press (Chromium 390 and 1440, R/G to G/G). Each is green on the tip in every
    project, as before.
- **The lift cell.** Critique 12 read it RED on v11.1.0 in Chromium 390 and WebKit 390 ("scale
  after the tap: 1.08") and GREEN on the tip. Here it is GREEN on both, in both. Read twice:
  - the probe, on both trees in Chromium at 1440 (a mouse hover) and at 390 (a tap): the page
    holds no stylesheet rule whose selector names `.scale-on-hover`, and the tile's computed
    `scale` is `none` at rest, under the hover and after the tap (`logs/lift-{tip,red}-{cd,cp}`);
  - the source: `scale-on-hover` is a Tailwind `@utility` (`src/styles/utilities/btn.css:15`),
    generated only where a scanned file uses the class. `demo/demo.css:63` scopes detection to
    `source("../demo")` and adds four `src/components` globs. On v11.1.0 the demo's CSS
    Utilities page (`demo/stories/foundations/css-utilities.vue`) used it; master's
    `931e2409f` ("CSS Utilities cut") deleted that page, and the controls harness under
    `tests-visual/` is not scanned. The built demo's 105 stylesheets hold the word 0 times
    (`.interactive-item`, by contrast, is there).
  - So the cell compares `none` with `none` on any tree built with the merged demo, the tip
    included. The library's cure
    (`b202364c9`, the lift under `@media (hover: hover)`) is unchanged and its CHANGELOG line
    still describes the source, but the release no longer witnesses it.
- **The CommandDialog cells** (items (b) and (c) below) bite as the note writes it.
- **The pick, with a query typed first**, which the pick cell does not drive: the demo's
  palette in a dialog, "se" typed (four rows, 512 × 251), then a tap on the first row, Enter,
  or Escape, filmed per frame (`typed.probe.ts`, Chromium 1440, and 390 by touch on the tip):
  - the tip: the plate's layout box is 512 × 251 on every mounted frame of all three exits,
    and the four rows stay until it unmounts (at 390, 3 of 3 the same);
  - the pre tree (before the cure): a tap and Enter drop the plate from 251 to 119 px (the
    picked row alone) and Escape grows it from 251 to 435 px (every row back) while it fades;
  - the red tree: the list unmounts in the exit's first frame and the plate falls to 51 px.
  The cure holds what the note asks on paths its witness does not drive.

### 2. The motion rows' frame tables

Holds. Read from the tip's sixteen part reports with the earlier critics' readers (`tools/sum.py`
→ `logs/sum-tip.txt`, `steps5.py` → `steps5-tip.txt`, `standing.py` → `standing-tip.txt`,
`turns.py`, `unread.py`, `exitclock.py`, `legs.py` → `legs-tip-reduce.txt`, `frost.py`,
`detent_close.py` → `detent-tip.txt`) and this seat's `cmdexit.py` (`cmdexit-tip.txt`), then
re-read against the frames they name. The WebKit parts ran at a 1-minute load of 26 to 66, the
Chromium parts at 11 to 67, against critique 12's 7 to 14, and the films show it: the gaps
between samples run longer. Every reading is inside the gate's bounds.
- **No frame carries more than a fifth.** Leaving out the disclosure guard, the most any
  16.7 ms window carries is 0.179 (a detented Sheet's standing cell by an outside press, WebKit
  1440). All 156 standing readings pass, the largest at 0.179.
- **Three consecutive steps over a fifth, all across lost frames.** In WebKit 390's standing
  films a Select by pick moves 0.357 across a 49 ms gap, a Collapsible 0.295 across 29 ms and an
  Accordion 0.304 across 30 ms (`steps5-tip.txt`). Scaled to one frame, as the gate reads them,
  each is under a fifth, and each film's other steps are small. Critique 12 read none, at its
  lower load.
- **No cut at the start.** The largest first moving sample is 0.155, a hint handed to its
  neighbour fading in (WebKit 1440, across a 20 ms gap); critique 12's was 0.120.
- **No last-frame step.** The largest last moving sample is 0.072 (a Select reopened while it
  closes, WebKit 390, a 12 ms frame); critique 12's was 0.063.
- **Holes.** In Chromium the longest gap in a moving table is 17 ms. In WebKit it reaches 42 ms
  at 1440 and 51 ms at 390 (standing and routes films, whose cells read them per frame and
  pass). Five reverse films were set aside as unread and filmed again (`unread-tip.txt`); three
  of the second films read and passed, and the two at WebKit 390 holed again (60 and 56 ms) and
  failed on that precondition (item 1 and open gap D).
- **No overshoot.** No sample runs against its leg's direction outside the turn cells and the
  disclosure guard. The read turn films (`turns-tip.txt`) turn where the second input found
  them, shares 0.031 to 0.161.
- **The disclosure guard's reopen** steps 0.29 to 0.37 between two frames in every project
  (0.30 to 0.43 in one window: the region drops to 0 and opens again), 11.1.0's behaviour, kept by the ruling after fix 6.
  The `weight` cell's steps are a list of item boxes, not motion. The one opacity step from 1
  to 0 in a film is a detented Sheet's unmount, 467 to 483 ms after its close, its top edge at
  the foot since 391 to 401 ms.
- **The exit clocks** (`exitclock-tip.txt`): a Select lit to 207 to 223 ms, a DropdownMenu to
  219 to 226, a Popover to 243 to 254, a Tooltip to 115 to 119, a Dialog to 186 to 204, the
  sliding Sheets to 252 to 280; first steps 0.023 to 0.059.
- **The CommandDialog's exit** (`cmdexit-tip.txt`, eleven films: by pick, Escape and an outside
  press in each project, the outside press skipped by the spec in WebKit 390): opacity falls
  monotonically from 1 to 0.011 to 0.032 over 18 to 27 frames, the largest step between frames
  0.053 to 0.085; scale 0.951 to 1; the layout box stays 512 × 435 (350 × 435 at 390) on every
  frame; no filter; a 10.5 to 10.8 px drop; the list mounted on every frame.
- **Under reduced motion** (`legs-tip-reduce.txt`): no box steps in any leg of the 69 cells
  read; the surfaces' fades span 150 to 206 ms, an ExpandableContainer's 112 to 125 ms and a
  tooltip's leave 112 to 117 ms; a site's own fade keeps its 142 to 144 ms; the dock's fold and
  the run mark cross-fade with no travel. The frost layer reads its plate's opacity on every
  mounted frame in all twelve Sheet films (`frost-tip.txt`).

**The gestalt.** Since critique 12 the library changed in three files (`git diff 97b6e324a
4f1fa667e -- src`): master's two (an unused constant deleted, a selector made module-local) move
nothing, and `CommandInput.vue` moves nothing on screen itself: it withholds the query's update
while the dialog leaves. The palette's
exit above is critique 12's Dialog row (scale 0.95 to 1, a short drop, a fade), now with its
plate and rows still, where the pre tree's plate drops to its picked row or grows to every row
while it fades (item 1). The other surfaces' films match critique 12's gestalt table and its
two exceptions (the Dialog's three channels, the Toast's release), which are 11.1.0's. I did not
film every surface again on both trees, since no motion source changed since critique 12 filmed
them.

### 3. The earlier release specs

Holds. The specs ran on `4f1fa667e` in Chromium (headless-new) and WebKit 2287 with critic 12's
step list (`critic-13/reg-inner.sh`, `logs/chain.txt`): one guarded call per engine, Chromium
16:56 to 17:24 and WebKit 17:38 to 18:14, at a 1-minute load of 17 to 58; then the one failing
step on the red tree.

| spec | Chromium | WebKit |
|---|---|---|
| release-10-1-5, part A / part B | 84, 23 | 84, 23 |
| release-11-0-1: owner, daraksha, fix 2, critic 2 | 9, 2, 14, 9 | 9, 2, 14, 9 |
| release-11-0-1 critic 1 and 1b | 24 | 24 |
| release-11-0-2 with slider-forced-colors | 57 | 54 + 3 skipped |
| release-11-0-2 on coarse touch / on WebKit 2311 | 37 + 17 skipped | 51 + 3 skipped |
| ro-loop (11.1.0) | 4 | 4 |
| release-10-1-3 (restated in 11.1.0) | 60 | 57 + 2 skipped + **1 failed** |
| radius-scale (restated on the branch), Chromium and coarse touch | 64 | no WebKit project |

- **Critique 12's two WebKit failures** (the `plateOf` `TypeError` in critic 1's "a light-1440f"
  and "a light-390c") pass here, 24 of 24. The spec did not change; I did not trace why.
- **The one failure** is release-10-1-3's "390 · right-anchored · ancestor zoom 1.25 · D-1"
  (the summary glyph's jump: 2.35 px against "under 2"). On the red tree the whole spec passed
  once (58 + 2 skipped, 18:23). So I ran the three D-1 anchors five times a run, tip and red
  interleaved twice, at a load of 34 to 56 (`logs/d1-{tip,red}-{a,b}`, 18:56 to 19:02):

| D-1 at 390 | tip | v11.1.0 |
|---|---|---|
| right-anchored | 8 of 10 fail | 8 of 10 fail |
| left-anchored | 1 of 10 | 1 of 10 |
| bottom-anchored | 3 of 10 | 2 of 10 |
| largest jump | 4.09 px | 5.17 px |

  The cell fails the same way on both trees under load. It is not this release's fault (open
  gap E).
- No earlier spec changed since v11.1.0 except radius-scale (`git diff --stat v11.1.0 HEAD`
  over `release-10-1-5*`, `release-11-0-*`, `ro-loop*`, `release-10-1-3*` and
  `radius-scale*`: one file, radius-scale's arm for row 12's coarse-pointer corner, which was
  RED on v11.1.0 as its biting plant).
- **Item (e) of the note after the close**, the WebKit title "fix 12, coarse phone › t1", is
  read in item 8.

**No title fails on the tip that passes on v11.1.0.** Critique 12's gap K (release-10-1-5's 32
critic and fix specs, 582 tests) is still not run.

### 4. Nothing removed or renamed

Holds. I packed the gate's fresh `dist` at `4f1fa667e` with `npm pack --ignore-scripts`
(`logs/pack-tip.json`): 904 files, 3,055,590 B unpacked, equal to `.bundle-ratchet`. Against the
11.1.0 registry tarball:
- **`exports`:** 70 keys on both, none removed, added or changed; in `package.json` only
  `version` differs (`logs/pack-vs-11.1.0.txt`).
- **Files:** 899 to 904, none missing; the five added are critique 12's (the `exit-press` and
  `leave-finished` chunks, their declarations, `exitClock.d.ts`).
- **Declarations** (`logs/dts-vs-11.1.0.txt`): 571 to 574 files, thirteen changed. Eleven are
  critique 12's, byte for byte. The two new ones are master's: `export declare const
  FOURIER_STROKE_RUNGS` leaves `components/fourier-field/constants.d.ts`, and `export declare
  const SHELL_FIELD_CANVAS_SELECTOR` leaves `composables/glass/backdropLuminanceSample.d.ts`.
  Neither is a public name: no `exports` key and no `typesVersions` key (63 named entries, no
  wildcard; `exports` has one wildcard, `./fonts/*`) reaches either file, the
  `fourier-field` barrel re-exports three named items from `constants` and not this one, and
  neither name is in 11.1.0's built JS at all, so no consumer could have imported either at
  run time. `verify:package`'s published-name roster is `PRESENT`, 292 of 292.
  `CommandInput.vue.d.ts` is unchanged: the cure adds no prop, emit or export.
- **Names in the built CSS and JS** (`logs/names-vs-11.1.0.txt`) and **moved values**
  (`logs/moved-values-vs-11.1.0.txt`): identical to critique 12's files. Custom properties
  1,164 to 1,171, none removed; keyframes 97 to 100, none removed; class selectors 651 to 651
  (`classes.py`: 652 to 652, none removed or added); layers 4 to 5.
- **Defaults moved:** critique 12's list, unchanged; the palette's cure moves no default (with
  `resetSearchTermOnSelect` and `resetSearchTermOnBlur` at reka's defaults the query was
  already empty at the next open).

### 5. The gates on the committed tree

Holds. Each command ran once through `guarded` on `4f1fa667e`, no tracked file dirty, from 13:15
to 13:54 (`logs/gates.out`, `logs/gate-*.log`):
- typecheck: exit 0;
- build: exit 0, its `glass-ui:ready` line written;
- `verify:package`: exit 0, terminal `CLEAN`, 197 claims, the roster `PRESENT` (292 of 292);
- `demo:dist:build`: exit 0;
- vitest `--maxWorkers=2`: exit 0, 282 files, 2,524 passed, 5 expected to fail, 1 skipped
  (critique 12's 285 and 2,600 less master's deleted demo tests, as the close read).

No workflow runs a browser: `ci.yml` and `release.yml` run `npm ci`, typecheck, build,
`verify:package`, `demo:dist:build` and `npm test`; `deploy-demo.yml` (master's edit: the
asset-miss check) builds the demo, deploys it with wrangler and runs `check-served.mjs`, which
is HTTP only. `scripts/release.sh` runs the browser gates (`test:browser`, the pixel floor, the
exits gate).

### 6. Comments added in `src`

Holds. `git diff v11.1.0 HEAD -- src` adds 1,273 lines (`logs/src-added.txt`). I searched every
added line for this release's ids (`O-nnn`, `LT-n`, `K1` to `K4b`, `RU-n`, "row n", "round n",
"fix n", "11.1.n"), letter-and-number ids, dates and tranche names, and for tranche, critique,
critic, seat, orchestrator, witness, scope, ruling, owner, probe, film, plant, gate and the
consumers' names (`logs/src-id-grep.txt`). It finds the code's own words: the dock's seats
(`data-glass-dock-seat`), `--spring-${row}-exit-duration` (a spring row), a local named `probe`,
CSS keyframes. The two comments new since critique 12 say what the code does: `CommandInput`'s
("A palette inside a dialog keeps its query through the dialog's exit…") and the merge's,
which only removes one.

### 7. The CHANGELOG entry

Holds.
- **Prose:** outward; no internal id or seat word (`logs/changelog-11.1.1.md`); its one em dash
  is in the heading, counted per paragraph.
- **The palette sentence** (`4c30732a0`): "A pick no longer rewrites its query as the dialog
  closes, so rows that follow the query stay as they were while the plate fades, and the query
  clears once the dialog is gone." True of the films: the pick cell's plate keeps its layout box
  and its rows to its last mounted frame on the tip and drops to 119 px on the pre tree, the
  typed palette likewise, and the query is empty at the next open. On a palette with
  `unmountOnHide: false` the dialog's content is never removed, so "gone" does not arrive and the
  query is not cleared; after a pick its next open is what 11.1.0's is (open gap A).
- **Sizes:** every figure exact to the byte against this seat's pack and the two registry
  tarballs (`tools/sizes.py`, `logs/sizes.txt`, identical to fix 13's): the dock entry 38,673,
  40,541 and 40,533; `dialog` 12,508 to 14,529, `select` 8,453 to 9,517, `popover` 8,663 to
  9,385, `tooltip` 5,897 to 6,607, `menu` 11,865 to 12,555; the root entry 104,776 to 108,751,
  `command` 16,804 to 18,978, `sheet` 14,306 to 16,726, `tabs` 19,091 to 20,154, `easing` 36,889
  to 37,983, `motion` 12,599 to 13,544, `toast` 5,093 to 5,879. No other entry grew past 500 B
  (`configurator` +448, `expandable-container` +436).
- **Values:** `--exit-curve` from `var(--ease-out)` to `cubic-bezier(0.3, 0.2, 0.7, 0.8)`;
  menus and selects about 220 ms, popovers 250, tooltips 120, a dialog about 180, a sheet 250:
  the exit cells' clocks here (item 2) agree. Every moved value is critique 12's list, which the
  entry names; no value moved since.

### 8. The note after the close, items (a) to (e)

Holds, each item with its witness, on the merged tree.

**(a) The pixel floor reads the renderer from the page.** `2cce4d8a9` binds `data-renderer` and
`data-state` on the aurora and blob stages' substrate elements, from the substrate's own
`renderer-status` event, with no visible text; `substrate-paints-color.spec.ts` reads
`[data-aurora-substrate][data-renderer]` and `.goo-blob-wrapper[data-renderer]`. The three legs
as `release.sh` runs them, each in its own guarded call on the worktree (`critic-13/floor.sh`,
Chromium headless-new, `logs/floor-{green,planted,flood}`):
- green, 3 passed (13:53 to 14:02): the aurora's mean channel on DEFAULT 238.7 and on the ten
  presets 103.9 (`vangogh`) to 242.2 against a floor of 8; the blob's coverage 0.177 and 0.178,
  between its floor of 0.1 and its ceiling of 0.7;
- planted (14:02 to 14:55, 53 minutes of it waiting for a browser slot): both floors fail their
  plant, each on its own assertion: the aurora black on DEFAULT (0.0) and every preset (2.0),
  the blob's coverage 0.000; the gate prints GREEN for its self-test;
- flood (to 15:08): the blob's ceiling fails its plant at a coverage of 1.000 against 0.7.

**(b) The CommandDialog cells drive the rebuilt Command page.** `80287b971` is the close's
`commanddialog-restate.patch`, line for line (its fifteen changed lines equal the patch's).
Escape and outside on the red tree fail in all four projects on "the list is mounted while the
plate is seen" (the plate falls from 435 to 51 px in the exit's first frame); on the tip both
pass in all four. The outside press is skipped in WebKit 390 by the spec's stated reason
(Playwright WebKit's touch tap reaches no outside-press listener), on both trees.

**(c) A palette closed by a pick keeps its rows through its exit.** `4c30732a0`:
`CommandInput` withholds the query's update while the enclosing dialog is closed and still
mounted, and emits an empty query on unmount if it withheld one. Its witness, the pick cell's
plate box within 1 px of its rest from the pick to the exit's last frame:
- **RED on the merged tip before the cure** (the pre tree) in all four projects: the plate drops
  from 435 to 119 px 29 to 57 ms into the exit (`logs/pre-<project>`), and the standing cell by
  pick fails with it (shares 0.346 to 0.726);
- **RED on v11.1.0** in all four (the list unmounts; 435 to 51 px);
- **GREEN on the tip** in all four, the CommandDialog's exit as item 2 reads it;
- **Escape and outside unchanged**: green on the pre tree and on the tip in every project that
  runs them;
- **The next open's query is empty** on the tip (`probe-cmd/cmd.probe.ts`, palette a on its
  defaults, Chromium 1440 and WebKit 1440, `logs/cmd-tip-{cd,wd}`): after "se" and a pick or
  Escape, the next open shows an empty query and all nine rows. The empty query is written when
  the content unmounts, 188 to 241 ms after the close; on v11.1.0 the picked label stays in the
  query after the exit and the next open clears it;
- **The paths the cell does not drive**, with a query typed first (item 1): the tip holds the
  plate at 512 × 251 and its four rows through a tap, Enter and Escape; the pre tree drops or
  grows it.
- No new prop, emit, export or token (`CommandInput.vue.d.ts` unchanged; item 4). One CHANGELOG
  clause (item 7).

**(d) `scripts/release.sh` builds the demo before `npm test`.** `9c85560b0` runs `npm run
demo:dist:build` before `npm run prepublishOnly` (typecheck, build, `npm test`), as `release.yml`
does. Witness (`logs/gate-d-*`, 13:47 to 13:54): after the gates' demo build I touched
`demo/main.ts`; the boot-graph test then failed one arm ("the dist-demo it measures is NEWER than
every source it is built from"; 1 failed, 13 passed); after `npm run demo:dist:build` it passed
14 of 14. The library build writes nothing under `src/` or `demo/`, so the order holds through
`prepublishOnly`.

**(e) The WebKit title** "fix 12, coarse phone › t1" (`release-10-1-5.spec.ts`), alone and
repeated three times on each tree in WebKit 2287 (`logs/e-{tip,red}`, 18:15 to 18:20, load 34 to
56): 3 of 3 on the tip, 3 of 3 on the red tree. It passed again inside release-10-1-5 part B on
the tip (23 of 23, item 3). Its spec is unchanged since v11.1.0. A load flake, as fix 13 read
it.

## Defects

**1. Row 10's lift witness passes without its rule (item 1).** `lift · a scale-on-hover element
returns to rest after a tap` (`tests-visual/release-11-1-1-controls.spec.ts:69`) reads GREEN on
v11.1.0's library and on the tip in both projects it runs in, Chromium 390 and WebKit 390.
- **Why.** The controls harness imports `demo/demo.css`, whose Tailwind build generates a utility
  only where a scanned file uses it: `@import "tailwindcss" source("../demo")` (`demo.css:63`)
  and four `src/components` globs (`:85` to `:100`). `scale-on-hover` is defined in
  `src/styles/utilities/btn.css` and used only by the harness and the spec under
  `tests-visual/`, which are not scanned. Its one scanned user,
  `demo/stories/foundations/css-utilities.vue` (on ten lines at v11.1.0), was deleted by master's
  `931e2409f` and came in with the merge `d464304d7`.
- **Evidence.** The lift probe (`probe-lift/`, `logs/lift-{tip,red}-{cd,cp}`): on both trees, in
  Chromium at 1440 and at 390, no stylesheet rule on the page names `.scale-on-hover`, and the tile's
  computed `scale` is `none` at rest and under the hover or after the tap. The built demo's
  stylesheets hold the class 0 times. The rule's absence is the build's, not an engine's, and
  the gate reads the cell GREEN on the red tree in WebKit 390 as in Chromium 390. Critique 12,
  before the merge, read the same cell RED on v11.1.0 in both ("scale after the tap: 1.08") and
  GREEN on the tip.
- **What it costs.** The library's cure (`b202364c9`, the lift under `@media (hover: hover)`) is
  unchanged, and its CHANGELOG line still describes the source, but on the tree to be tagged
  the gate no longer shows it: a regression of that cure would pass.
- **A cure**, for the fix seat: generate the utility for the harness (an `@source` naming the
  controls harness in the stylesheet it builds from, or `@source inline("scale-on-hover")`),
  and give the cell a clause that the tile carries the rule, for example that a mouse hover
  at 1440 lifts it or that the page holds a rule naming the class, so the cell cannot pass on
  an absent rule again. Witness: RED on a v11.1.0 library tree and GREEN on the tip in
  Chromium 390 and WebKit 390, and the new clause RED on a tree without the rule.

No other item of the finite list fails.

## Open gaps (for INBOUND)

For INBOUND; outside the finite list.

- **A. The palette's query with `unmountOnHide: false`.** The cure clears the held query when the
  content unmounts; a palette whose content stays mounted never clears it
  (`probe-cmd/cmd.probe.ts`, palette b, `logs/cmd-{tip,pre,red}-{cd,wd}`). After a pick, the next
  open shows the picked label and its one row on every tree, so the query's change moves from
  the exit's first frame (v11.1.0) to the next open's first frame (the tip). After Escape, the
  next open keeps "se" and four rows on v11.1.0 in both engines and on the tip in WebKit, and
  opens empty on the tip and on the pre tree in Chromium; that engine split predates item (c).
  The CHANGELOG's "the query clears once the dialog is gone" is true where gone means removed.
  Fix 13's gap A (a reka-filtered palette) is carried.
- **B. The leave cell has no clause that its press lands mid-exit.** Under load the press can
  reach the page after the exit has finished, and the cell then reads a correct whole exit as a
  reversed close that spoke (item 1). A clause like the turn cells' "the second input lands
  mid-motion", the content still mounted when the press arrives, would make that a stated
  precondition.
- **C. The Dialog's three channels** (scale, drop and fade), 11.1.0's, booked for 11.1.2;
  carried. The CommandDialog's exit is the same three.
- **D. The WebKit 390 turn cells under load.** "A Select / a DropdownMenu closed while it opens"
  film once more when the first film holes; above a load of about 45 both films can hole and
  the cell fails on that precondition (9 of 26 tip readings here; critique 12, at a load under
  15, read none). The release gate in `release.sh` will meet the same unless the machine is
  quiet or the cell films more than twice.
- **E. release-10-1-3's D-1 summary-glyph cell at 390, ancestor zoom 1.25, in WebKit.** Its
  bound of 2 px fails under load on both trees alike (tip 12 of 30, v11.1.0 11 of 30, jumps to
  4.09 and 5.17 px; item 3). A witness that reads the machine as well as the glyph.
- **F. Critique 12's gaps A to N** stay as written, with two notes: gap K (release-10-1-5's 32
  critic and fix specs, 582 tests) is still not run, and the two WebKit `plateOf` failures
  critique 12 recorded (its item 3, booked as I) passed here, 24 of 24, untraced.
- **G. The note's instructions to the next close** (the visual suite on a full git-archive tree
  of the tip, every coarse-touch chunk read) are for that close and were not run here.
- **H. The machine.** The 1-minute load ran 11 to 279 (other sessions); the guard's zone warning
  was armed from 17:20 (a warning only); waits for admission ran up to 53 minutes. The guard
  refused nothing. Every WebKit reading here was taken at a load of 26 to 66, four to five times
  critique 12's.
- **I. Side effects in the worktree.** The gates rebuilt `dist/` and `dist-demo/` (both
  ignored), and item (d)'s witness touched `demo/main.ts`'s modification time and rebuilt
  `dist-demo/` after; no tracked file changed (`git status` shows only this seat's two new
  paths). This seat's trees under `.cache/` (`critic13-red`, `critic13-pre`, `critic13-pub`,
  60 MB, ignored) are left in place: their deletion was refused by the session's permissions.
  They are regenerable from `critic-13/trees.sh`. No process or server of this seat is left
  running.
