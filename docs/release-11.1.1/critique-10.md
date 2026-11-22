# 11.1.1 critique 10

Critic: claude-opus-5-5. Fable is out of quota until 2026-11-21, so this seat runs on Opus by
the orchestrator's ruling. It is a fresh seat and built nothing on the branch.

**Tip read:** `2d4150e68` on `release/11.1.1`. Its source last changed at `d61228a78`, its
specs at `f68bf74a8` and its CHANGELOG at `8d59c4175`; `2d4150e68` itself is fix seat 10's
record. I read every orchestrator note in this directory (fourteen), `fix-10.md`,
`critique-9.md`, the scope file in the main checkout and `git log v11.1.0..release/11.1.1`.

**How it ran.** One sitting, 2026-11-21 23:20 to 2026-11-22 02:20, at a 1-minute load of 4 to 13.
- Every run went through `guarded`, WebKit under `--exclusive webkit`, on ports 5351 to 5356.
  The guard refused nothing; it printed its zone warning (armed, a warning only) and held the
  WebKit runs for the lock other sessions held, never longer than about six minutes.
- Both trees this seat measures besides the tip were built before any server of this seat
  started (`critic-10/trees.sh`), so no `tsconfig.json` landed under a watched root while a
  part ran (fix 10's cause of critique 9's lost film).
  - **v11.1.0:** a `git archive v11.1.0` at `.cache/critic10-v11.1.0/tree`, with HEAD's 11.1.1
    specs, config and harnesses copied in (hashes equal, `logs/redspecs-{red,head}.sha`). Its
    `src` and `demo` equal v11.1.0's blob for blob (`logs/red-src-demo.{v1110,tree}.blobs`).
    Its `node_modules` links each entry to the worktree's (the lockfiles differ only in the
    version field), with its own `@mkbabb` workspace link and its own Vite cache.
  - **The plant:** a `git archive HEAD` at `.cache/critic10-plant/tree`, with critique 9's
    one-line frost plant made again (`logs/plant.diff`).
- The published 11.1.0 and 11.0.2 tarballs were fetched for this seat; their sha-1 equal
  `npm view`'s (`2180c51d…`, `b425a414…`).
- Scripts are in `critic-10/`, the logs in `critic-10/logs/`, the readers in `critic-10/tools/`
  (critics 3 to 9's, copied, and this seat's `detent_close.py`, `families.py` and
  `rowa_scan.py`).

**Verdict: not ready to tag.** One defect:
1. **Row A's tap cell can fail by chance on the tip.** It rounds a press's distance from the
   close button before it asks whether the press met a later frame than it was aimed at. A late
   press that lands within half a pixel outside the button then counts as aimed, and as a miss.
   That stopped fix seat 10's first whole run of the exits gate, on the source and specs the
   tip carries (`fix-10/logs/gate-1-chromium-phone-0.json`), and it failed this seat's cell
   once in five runs on the tip (`logs/rowa-tip-cp`). `release.sh` stops on it. Fix seat 10
   found the cause and left it as an open gap; it is critique 9's defect 1 again in another
   cell: a witness that can fail on something other than its claim.

Items 2 to 7 hold. Item 1 holds in every other respect: in the gate's sixteen parts no cell
failed on the tip (492 ran green, 92 skip by design), and every row is RED on v11.1.0.
Critique 9's three defects are cured: the frost cell bites on the plant, 12 of 12, the lost
film fails by name, and the CHANGELOG's detented Sheet sentence matches the films.

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

Holds except for row A's cell (defect 1).

**How it was read.**
- The exits gate's sixteen parts ran on the tip as `gate.sh` splits them
  (`logs/tip-<project>-<part>`), carrying on past a failure, then on this seat's v11.1.0 tree
  (`logs/red-<project>-<part>`).
- `tools/matrix.py` tabulates each title on both trees (`logs/matrix.txt`, `matrix-why.txt`):
  146 titles in four projects. Of the readings, 377 are RED on v11.1.0 and GREEN on the tip,
  115 green on both and 92 skipped on both. None fails on the tip.

| project | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 38 + 3 skipped | 32 + 11 skipped | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |
| WebKit 390 | 25 + 16 skipped | 32 + 11 skipped | 27 + 17 skipped | 16 + 2 skipped |
| WebKit 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |

These equal fix 10's whole run and critique 9's counts, with critique 9's one crash now a pass.
The parts ran from 23:28 to 00:11 at a 1-minute load of 4 to 13.

- **RED on v11.1.0.** Every part fails there in every project, 15 to 36 cells a part. I read
  every failure's first line (`matrix-why.txt`). None is a crash, a timeout or a lost film.
  Each fails on its claim ("no frame carries more than a fifth", "the fade spans at least two
  frames", "one event", "form on every exit frame", "the plate blurs its backdrop", "the list
  is mounted while the plate is seen", "it is open again") or on a mid-motion precondition
  that v11.1.0's own fault breaks ("the reopen lands mid-exit", "the second input lands
  mid-motion").
- **Cells green on both trees** are the no-regression reads the spec and critique 9 name: the
  form cells at 1440 (no sheet form there), the compact strip, solid under reduced
  transparency, the disclosure guard, ExpandableContainer's entrance and first-frame Escape,
  the Slider held still, the "says nothing" halves of the leave event and the standing cells
  of the Sheets, the Dialog and the disclosures.
  - Three readings moved between critique 9's matrix and this one, each a cell whose v11.1.0
    reading depends on timing: `reverse · a DropdownMenu reopened while it closes` (now RED on
    v11.1.0 at Chromium 1440, green on both elsewhere), and the Dialog's standing cells by
    Escape and by outside press (green on both here, RED on v11.1.0 in some projects for
    critique 9). None is a row's only witness: row 5's DropdownMenu and row 3's Dialog each
    have a cell RED on v11.1.0 in all four projects.
- **Each row has R/G cells in every project it can run in** (`logs/families.txt`):
  rows 1, 2, 12, A, the lift and row B run at 390 only; row 6 at 1440 only (a Tooltip does not
  open on touch); the press cell skips WebKit 390 (no held touch); row 1's outside-press and
  trigger routes skip WebKit 390 (its touchscreen tap reaches no outside listener, `TABLE.md`).
  Row B's WebKit 390 cell is skipped by the gate (open gap A); critic 8's mouse probe, as
  critique 9 ran it (`critic-10/probe/`), reads it R/G there: shares 0.174 at speed and 0.144 at
  rest on the tip, 1.036 both ways on v11.1.0 (`logs/rowb-{tip,red}-wp`).
- **The frost row** (`d61228a78`, its cell restated at `f68bf74a8`):
  - On the tip, in all twelve films (three Sheets, four projects), the frost layer enters from
    0, reads the plate's opacity on every mounted frame (gap 0) and is mounted on every frame
    its plate is (`bare` 0). It leaves at the plate's last painted value, 0.018 to 0.040.
  - On v11.1.0 the cell fails first on the plate's own fade ("in: the fade spans at least two
    frames") in all twelve; its frost layer enters at 1.
  - **The plant**, critique 9's line made again on a HEAD tree (`logs/plant.diff`), twice in
    each of three cells: Chromium 390 6 of 6 failed, WebKit 390 6 of 6 failed, each on the new
    clause alone ("the frost layer is mounted on every frame its plate is"). The frost layer
    leaves at 0.502 to 0.563 while its plate fades on to 0.002 to 0.036, with 9 to 14 bare
    frames, gap 0 on every mounted frame (`logs/plant-frost-{cp,wp}`). So the cell now bites
    on the fault its note was written for.
- **The lost film** (`cd48787a5`): fix 10's probe, unchanged (`fix-10/probe`, run by
  `critic-10/lost.sh` on port 5355 once no other server of this seat ran), five reloads each.
  With the film module before the fix (`15ca90647`): 5 of 5 `TypeError: Cannot set properties
  of undefined (setting 'stop')`, critique 9's crash. With the branch's: 5 of 5 "the page lost
  its film: it navigated or reloaded", naming the harness URL's reload at +35 to +154 ms
  (`logs/lost-{before,branch}-cp`). Part B, where critique 9's crash fell, ran green once more
  in each project above.
- **Row A** (`e45c97fe8`, its tap cell at `cc0384d4e`): RED on v11.1.0 and GREEN on the tip in
  Chromium 390 and WebKit 390 here. In this seat's Chromium 390 run, 23 taps at open plus
  120 ms: 20 aimed, all hit and closed; 3 late (10 to 12 px out), taken again. The rise read
  height spread 0 and share 0.113. But the cell fails by chance (defect 1): run four times more
  on the tip in Chromium 390 (`logs/rowa-tip-cp`), it failed once, on a tap it counted as aimed
  that was late.

### 2. The motion rows' frame tables

Holds. Read from the tip's sixteen part reports with critic 3's and critic 5's readers
(`logs/sum-tip.txt`, `steps5-tip.txt`):
- **No frame carries more than a fifth.** Leaving out the disclosure guard, the most any
  16.7 ms window carries is 0.179 (an ExpandableContainer closed, a standing cell).
- **No last-frame step.** The largest last moving sample is 0.056 (a Tooltip by Escape at
  1440).
- **No cut at the start.** The largest first moving sample is 0.108, row B's release; the
  largest in an exit is 0.094.
- **No unscaled step over a fifth** between two consecutive samples of any motion table except
  the disclosure guard's. The `weight` cell's box tables also trip the reader; they list item
  positions, not motion.
- **No sample against its leg's direction** outside the turn cells and the disclosure guard,
  and so **no overshoot** in an exit table.
- **Under reduced motion** no box steps in any leg. The surfaces' fade legs span 171 to 206 ms
  over 16 to 27 frames; an ExpandableContainer's 112 to 124 ms, a toast's fade out 151 to
  157 ms and a tooltip's 111 to 119 ms (its own shorter clock), and a site's own 144 ms fade
  keeps its clock (`tools/legs.py` over part D, `logs/legs-tip-partD.txt`). A Sheet's frost
  layer reads its plate's value on every frame.
- **A detented Sheet's close** (`tools/detent_close.py`, `logs/detent-close-tip.txt`): under
  1 % of it shows 335 to 347 ms after the close and its top edge reaches the foot at 389 to
  400 ms, in four projects; it unmounts, wholly past the edge, about 70 ms later.

**The gestalt** is one effect per change, each surface's own (`tools/channels.py` over the four
parts A, `logs/channels-tip-partA.txt`):
- a dock Select at 390 fades as it slides down past the edge (y 615 to 841); at 1440 it fades,
  with about 10 px of travel on a pick (critique 5's A, booked for 11.1.2);
- a dock DropdownMenu fades in place, its material held;
- a menu's clip draws in as it fades; a Popover fades with 8 px of travel;
- a sliding Sheet slides on its curve;
- a detented Sheet's top edge goes down without a break: its box shrinks to the floor and the
  floor then slides on, which reads as one motion. Its fill alpha drifts from 0.200 to 0.183
  on the way, which cannot be seen;
- a CommandDialog fades with a few per cent of scale and an 11 px drop: the Dialog's three
  channels, on 11.1.0 already and booked for 11.1.2 (C, after critique 5);
- under reduced motion nothing travels: each surface fades in place, and a Sheet's frost layer
  fades with its plate.

The disclosure guard's film cuts: on a reopen the region drops from about 0.36 to 0.46 to 0 in
one frame, then opens again from 0. That is 11.1.0's behaviour, which the ruling after fix 6
keeps for 11.1.1.

### 3. The earlier release specs

Holds. The specs ran on `2d4150e68` in Chromium (headless-new) and WebKit 2287 with critic 6's
step list (`critic-10/reg-inner.sh`, `logs/chain.txt`), one guarded call per engine, from 00:56
to 01:53 at a 1-minute load of 6 to 13; then the one failing step ran on v11.1.0:

| spec | Chromium | WebKit |
|---|---|---|
| release-10-1-5, part A / part B | 84, 23 | 84, 23 |
| release-11-0-1: owner, daraksha, fix 2, critic 2 | 9, 2, 14, 9 | 9, 2, 14, 9 |
| release-11-0-1 critic 1 and 1b | 24 | 22 + **2 failed** |
| release-11-0-2 with slider-forced-colors | 57 | 54 + 3 skipped |
| release-11-0-2 on coarse touch / on WebKit 2311 | 37 + 17 skipped | 51 + 3 skipped |
| ro-loop (11.1.0) | 4 | 4 |
| release-10-1-3 (restated in 11.1.0) | 60 | 58 + 2 skipped |
| radius-scale (restated on the branch), Chromium and coarse touch | 64 | no WebKit project |

- **The two WebKit failures** are "a light-1440f: the wide label seat's plate is a capsule in
  paint" and the same at light-390c, each a `TypeError` in the spec's `plateOf`
  (`release-11-0-1-critic-1.spec.ts:68`). The same two titles fail the same way on v11.1.0
  (`logs/reg-red-c1-wk.log`): the witness fault booked for 11.1.2 (I, after critique 5).
- **radius-scale** is the one 11.1.0 spec the branch restates (`9152d3bc4`). The branch's
  version passes on the tip; critique 9 read it both ways (11.1.0's version fails on the tip
  only on row 12's cure, the branch's fails on v11.1.0 on the same two titles). No spec file
  changed since.

**No title fails on the tip that passes on v11.1.0.**

### 4. Nothing removed or renamed

Holds.

**What was read.** The build gate's fresh `dist` at `2d4150e68`, packed by `npm pack
--ignore-scripts` (`logs/pack-tip.json`): 904 files, 3,056,513 B unpacked, equal to
`.bundle-ratchet`. It was read against the 11.1.0 registry tarball with critics 6 to 9's
readers (`tools/`).
- **`exports`:** 70 keys on both, none removed, added or changed. In `package.json` only
  `version` differs (`logs/pack-vs-11.1.0.txt`).
- **Files:** none missing; five added (the `exit-press` and `leave-finished` chunks, their
  declarations and `exitClock.d.ts`).
- **Declarations:** 571 to 574 files, eleven changed (`logs/dts-vs-11.1.0-plus.txt`). Every
  change is an addition (the `leaveFinished` emit on seven contents, `useExitPress` and
  `useLeaveFinished` from the overlay barrel, the detent engine's `size` and `opacity`), a
  reworded doc comment or a renumbered `__VLS` local. `Toast.vue.d.ts` also gains
  `open: boolean; defaultOpen: boolean` in its defaults type, from
  `withDefaults({ open: undefined, defaultOpen: undefined })`; both stay optional in the props
  a consumer passes, and `ToastRoot` receives what it received on 11.1.0 (critique 9's read).
- **Names in the built CSS and JS** (`logs/names-vs-11.1.0.txt`, `classes-vs-11.1.0.txt`):
  custom property declarations 1,164 to 1,171, none removed; `@property` 94 to 94; keyframes
  97 to 100, none removed; class selectors 652 to 652; layers 4 to 5 (`reduced-motion`);
  `data-` attributes 121 to 123 (`data-leaving`, `data-plate`); custom properties written from
  JS 185 to 186, none removed. In `src`, custom properties declared go from 1,129 to 1,136
  names, none removed (`logs/src-props-{red,tip}.txt`).
- **Moved values** (`logs/moved-values-vs-11.1.0.txt`): `--exit-curve`; `--glass-reveal-blur`
  and `--glass-reveal-enter-scale`, neutral on the overlay register; `--reveal-exit-clock`;
  `--glass-level` and `--glass-veil-rung` on the firm plate; `--card-fill` on a pressed Card
  under reduced motion; `--bouncy-slider-radius` under a coarse pointer. The
  `--spring-*-exit-duration` tokens are unchanged. Each move is described in the CHANGELOG;
  only `--exit-curve` is a public token, and it is named with both values.
- **Defaults moved:** the exit clocks and curve (row 3); the narrow form's material and
  attribute (row 2); the reduced-motion layer and the press under reduced motion (row 8 and the
  ruling after critique 2); the overlay register's entrance (the ruling after critique 1); a
  detented Sheet's rise at its rung's size (the note on atlas's rows, outside the scope file;
  open gap F). The CHANGELOG states each.

### 5. The gates on the committed tree

Holds. Each command ran once through `guarded` on `2d4150e68`, with no tracked file dirty, from
23:25 to 23:28 at a 1-minute load of 8 to 11 (`logs/gates.out`):
- typecheck: exit 0;
- build: exit 0;
- `verify:package`: exit 0, terminal `CLEAN`, 197 claims;
- `demo:dist:build`: exit 0;
- vitest `--maxWorkers=2`: exit 0, 285 files, 2,600 passed, 10 expected to fail, 1 skipped.

`.github/` is unchanged from v11.1.0. `ci.yml` and `release.yml` run `npm ci`, typecheck,
build, `verify:package`, `demo:dist:build` and `npm test` (`vitest run`), and install no
browser; `deploy-demo.yml` runs no browser. `scripts/release.sh` gains one step,
`npm -w tests-visual run gate:exits`.

### 6. Comments added in `src`

Holds. `git diff v11.1.0 HEAD -- src` adds 1,246 lines, 287 of them comment lines
(`logs/src-added.txt`, `src-added-comments.txt`). I read them whole and searched them for row
and round ids, letter-and-number ids, dates, versions, tranche, critique, critic, seat,
orchestrator, witness, scope, ruling, owner, probe, film and the consumers' names. What the
search finds is the code's own vocabulary: a spring preset's "row" (`--spring-<row>-exit-
duration`), a menu row, a dock's seats, a local named `probe`, CSS `round`, and "PRM" for
prefers-reduced-motion. No source file moved since critique 9.

### 7. The CHANGELOG entry

Holds.
- **Prose.** Outward. No internal id appears; its one em dash is in the heading
  (`logs/changelog-11.1.1.md`, counted per paragraph).
- **Sizes.** Each line is exact to the byte against this seat's pack and the two registry
  tarballs (`logs/sizes.txt`): the dock entry 38,673, 40,541 and 40,533 (no dynamic import in
  its closure); `dialog` 12,508 to 14,529, `select` 8,453 to 9,517, `popover` 8,663 to 9,385,
  `tooltip` 5,897 to 6,607, `menu` 11,865 to 12,555; the root entry 104,776 to 108,672,
  `command` 16,804 to 18,898, `sheet` 14,306 to 16,726, `tabs` 19,091 to 20,154, `easing`
  36,889 to 37,983, `motion` 12,599 to 13,544, `toast` 5,093 to 5,879. No other entry grew
  past 500 B (`configurator` +448, `expandable-container` +436).
- **Values.** `--exit-curve` was `var(--ease-out)`, `cubic-bezier(0, 0, 0.2, 1)`, and is now
  `cubic-bezier(0.3, 0.2, 0.7, 0.8)`. The floating clocks are `clamp(0.12s, settle × 0.6,
  0.25s)`: menus and selects (bloom, 0.37 s) 222 ms, popovers (panel, 0.45 s) 250 ms,
  tooltips (present) 120 ms against a 200 ms entrance; the Dialog 180 ms.
- **The detented Sheet sentence** (`8d59c4175`): "A `Sheet` with detents slides off on its own
  spring, in about 400 ms." The films put its top edge at the foot at 389 to 400 ms, under
  1 % shown from 335 ms (item 2). True. The sliding Sheet keeps "250 ms".
- **Reduced motion.** Fades of 171 to 206 ms, an ExpandableContainer's 112 to 124 ms and a
  toast's 151 to 157 ms out agree with "at most 200 ms" and "over 120 ms" within a frame of
  sampling.

## Defects

### 1. Row A's tap cell can fail by chance at a rounding boundary

**The cell** (`release-11-1-1.spec.ts`, `sheet · a detented Sheet rises into place at its
rung's size`). For each delay it taps the close button's drawn centre until 20 taps count as
aimed. A press "that misses the button with its point outside the button's box when it lands
met a later frame than the one it was aimed at; it counts as aimed late, and the tap is taken
again" (the cell's own comment). The code:

```ts
off: Math.round(off),                                   // :801, recorded per event
const onTime = hit || !down || down.off === 0;          // :846
```

The distance is rounded before the test, so a press whose point lands outside the box by less
than half a pixel reads `off` 0, counts as aimed, and, its target not being the button, as a
miss. The cell then fails "the tap hits the button, twenty in twenty".

**The reading.** Fix seat 10's first run of the gate as `release.sh` runs it, on `8d59c4175`
(the tip's source and specs), stopped in Chromium 390 part A on this cell. Its record of that
tap: `pointerdown:00:f1:0px click:11:f1:0px`, at open plus 126 ms. The press's target and the
element at its point were both not the button; its recorded distance is 0; its click reached
the button and the sheet closed. The other late taps that run took at 120 ms were 10 to 19 px
out and were taken again, as the cell intends.
- Across every recorded run of this cell's current form in this directory, this seat's
  included (28 cells, 2,357 taps, `tools/rowa_scan.py`, `logs/rowa-scan.txt`), the aimed taps
  that missed on a tip tree are that one and this seat's below. The three on v11.1.0 trees are
  v11.1.0's fault.
- **This seat's reading.** The cell ran five times on the tip in Chromium 390: once in part A
  and four times alone (`--repeat-each=4`, `logs/rowa-tip-cp`, 02:07 to 02:15, load 8 to 10).
  The second of the four failed on the same clause, the same way: at open plus 129 ms,
  `pointerdown:00:f1:0px click:00:f1:0px`, counted as aimed. Its press and its click both
  landed on the rising head (point and target off the button), so the sheet did not close; by
  the cell's own rule it was late and should have been taken again. The other three runs and
  part A's run passed, with 2 to 6 late taps each at 120 ms, every one 10 px or more out.
  Of the eleven recorded runs of this form on a tip tree in Chromium 390, two failed this way
  (fix 10's and this seat's). Two others failed on the rise's share at loads of 25 and more
  (fix 7's `h3` and critique 8's first pass), which is a different matter. At ordinary load,
  then, the gate stops on this cell in about one run in four or five.

**Why it is a defect.** `release.sh` runs `gate.sh` under `set -e`, so one such tap stops the
release. It is the class of critique 9's defect 1: a witness that can fail on something other
than its claim. Fix seat 10 found the cause and left it for a ruling (its open gap B); nothing
in this directory rules on it, and the list's item 1 needs every landed row's witness GREEN on
the tip.

**Cure, in the spec.** Test the unrounded distance (`off > 0` before rounding, as fix 10
proposes) and keep the rounded value for the record. A press aimed on time at the drawn centre
lands inside the box (distance exactly 0), so the test loses nothing. No bound moves and no
source changes.

**Witness.** The cell green in Chromium 390 and WebKit 390 on the tip, several runs each, and
its v11.1.0 reds still red on their claims.

## Open gaps (for INBOUND)

A. **Row B has no WebKit cell in the gate** (carried from critique 9). Playwright WebKit's
   touchscreen cannot drag, so the spec skips WebKit 390. The mouse probe reads it R/G
   (item 1); real Safari, or a touch drag in WebKit, is the reading that settles it.

B. **WebKit raises a ResizeObserver loop on the exits harness at 1440, on both trees**
   (carried). The plain Select's standing cells log "ResizeObserver loop completed with
   undelivered notifications" three times on the tip and three times on v11.1.0
   (`logs/{tip,red}-webkit-desktop-2.log`). If its writer is `useDockMorph`'s plate observer,
   this harness is the reproduction row 13 (b) asked for first.

C. **The frost note's "it leaves at 0.02 or less"** is read by the cell as "it leaves at the
   plate's last painted value" (`f68bf74a8`), which critique 9 asked the orchestrator to state.
   No note states it yet. The tip's frost layer leaves at 0.018 to 0.040 here, the plate's own
   last step; by the note's words, 11 of this seat's 12 films would fail (all but the one at
   0.018). The ruling is the orchestrator's.

D. **Films other than `startFilm`'s still crash on a lost page.** `__sheet`, `__fold`, `__run`,
   `__tap`, `__fill` and the others read their window object with no lost-film check, so a
   reload mid-film fails them by a `TypeError`, not by name. Only a write into the watched
   checkout during a part sends one (fix 10's cause); `release.sh` in a quiet checkout does
   not.

E. **What sends the reload** (fix 10's open gap A): a seat that builds a tree under the
   worktree while a gate part runs reloads that part's pages once per `tsconfig.json`. This
   seat built its trees before any part ran. Fix 10's two ways out await a ruling.

F. **Rows A and B and the frost row came in after the scope closed at thirteen rows**, by
   binding notes; row A moves a default the scope file does not name. The CHANGELOG names it
   (carried).

G. **Carried from critiques 8 and 9:** a long frame lengthens a reduced-motion fade by design;
   a vetoed drag-dismiss unmounts a detented Sheet under reduced motion; hover scales under
   reduced motion; the detented Sheet's tail (its last 1 % takes about 50 ms and it stays
   mounted off-screen about 70 ms more); the `release-10-1-5-critic-*` specs, never run;
   `glass/dissolve.css`'s 11.1.0 pointer to a tranche document; the frost note's normal-motion
   half, K1 and K2 for 11.1.2; the CHANGELOG heading's date at the close.

H. **This seat's `plant.sh` logs "exit 0"** in `runs.out` for the two plant runs: its `$?` is
   read after a `$(date)` in the same line, the slip fix 10 found in its own `chain.sh`. The
   logs hold the counts (6 failed each).

## Owed by the fix round

Defect 1, then:
- row A's cell green on the tip in Chromium 390 and WebKit 390, and RED on v11.1.0;
- the exits gate whole once as `release.sh` runs it;
- no ratchet change: no source byte moves.
