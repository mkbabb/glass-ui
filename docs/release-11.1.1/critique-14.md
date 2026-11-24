# 11.1.1 critique 14

Critic: claude-opus-5-5, read from the seat's own identity. A fresh seat; it built nothing on the
branch.

**Tip read:** `ca61ce5b6` on `release/11.1.1` (fix seat 14's record). Since critique 13
(`bc939bd24`, which read `4f1fa667e`) the branch took one commit outside `docs/`: `a50130e48`,
three files under `tests-visual/` (the controls harness's own stylesheet, its import of it, and
the lift cell). `git diff 4f1fa667e HEAD` outside `docs/` is those three files. `src/` last
changed at `4c30732a0`, the demo at `2cce4d8a9`, `scripts/release.sh` at `9c85560b0`, and the
CHANGELOG and the ratchet at `136ab6da8`. I read every orchestrator note in this directory
(fifteen), `critique-13.md`, `fix-14.md`, the scope file in the main checkout, the exits table,
value.js's popup marks, the last-ten findings and `git log v11.1.0..release/11.1.1`.

**Verdict: ready to tag, from the list.** All eight items hold and no defect stands. Critique
13's one defect is cured: row 10's lift cell is RED on v11.1.0's library and GREEN on the tip at
390 in both engines, and its new clause is RED where the page carries no rule. Five tip
readings failed in the gate run under machine load, each on its film's start or its lost
frames rather than its claim, and each cell reads GREEN on the tip again at a lower load. One
WebKit title of the 11.0.1 specs failed on the tip and fails the same way on v11.1.0 (item
3). Those, and two new readings of the scripted exits' clock (it slows below 60 Hz, and it
starts a frame later than v11.1.0's exits did), go to open gaps.

## How it ran

One sitting, 2026-11-23 21:04 to 2026-11-24 02:15.
- Every build, test and browser run went through `guarded`, WebKit under `--exclusive webkit`.
  **The guard refused nothing.** It printed its zone warning (armed, a warning only) on every
  call. The 1-minute load ran 11 to 140 (other sessions).
- One heavy run of this seat at a time. Each guarded call runs a list of jobs (`critic-14/job.sh`,
  copied from critic 13's with its tools), one Playwright process per part as `gate.sh` splits
  them; `batch.sh` holds the order. Run lines in `critic-14/logs/runs.out`, the earlier specs'
  lines in `logs/chain.txt`.
- **The WebKit lock.** The machine-wide WebKit lock is a `flock`, not a queue, and four to six
  sessions contended for it. The first WebKit call was stopped by its PIDs at 21:56, a minute
  into its wait, so the Chromium calls (the floor and the earlier specs) could run first;
  queued after them it waited 22:27 to 23:17 (50 minutes) and was stopped by its PIDs again
  without running a job. Its jobs, reordered so the cell new since critique 13 ran first, waited
  23:17 to 00:07 (50 minutes) and ran to 00:58. The WebKit specs' call waited 00:58 to 01:08 and
  ran 01:09 to 01:54. No wait passed 60 minutes.
- **A false stop.** `batch.sh`'s first refusal check matched the guard's zone warning (its text
  contains "only a REFUSED line"); no run had been refused. The check now reads lines that
  start `[guarded] REFUSED`, and the chain resumed at its next step (`runs.out` says so).
- **The trees** (`critic-14/trees.sh`, built at 21:05 before any server of this seat):
  - **red**: a `git archive` of HEAD without `docs/`, its `src/` replaced by `git archive
    v11.1.0 -- src`: `src` equals v11.1.0's, 678 blobs of 678, and everything outside `src` and
    `docs` equals HEAD's, 916 of 916 (`logs/red-src.cmp`, `logs/red-rest.cmp`). v11.1.0's
    library under the tip's demo, specs and harnesses.
  - **pre**: HEAD's archive with `CommandInput.vue` as `80287b971` has it (item (c)'s RED tree).
  - **norule**: HEAD's archive with the controls harness importing `demo/demo.css` as it did
    before `a50130e48` (`logs/norule-harness.txt`), read with the tip's lift cell: the merged
    tree's page, without the `scale-on-hover` rule.
- Ports 5351 to 5356, each Playwright process on its own server (`GLASS_UI_DEMO_OWN`).
- The published 11.1.0 and 11.0.2 tarballs fetched again into `.cache/critic14-reg`; their
  sha-1 equal the registry's (`2180c51d…`, `b425a414…`, `npm view … dist.shasum`).

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

**Holds.** Every witness reads RED on the red tree and GREEN on the tip in the engines its row
names, row 10's lift cell again among them. Five tip readings failed in the gate run under
machine load: three turn films on the hole precondition they state, and two exit films that
started late or lost frames, which the exit cell does not state as a precondition. Each reads
GREEN again at a lower load (below; open gaps A, B and J).

**How it was read.** The exits gate's sixteen parts on the tip and on the red tree, one process
per part as `gate.sh` splits them (`logs/tip-<project>-<part>`, `logs/red-<project>-<part>`):
Chromium 21:16 to 21:54 at a 1-minute load of 16 to 44, WebKit 00:13 to 00:57 at 28 to 140.

| tip | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 37 + 3 skipped + **1 failed** | 33 + 11 skipped | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 29 + 12 skipped | 43 + 1 skipped | 44 | 18 |
| WebKit 390 | 24 + 16 skipped + **1 failed** | 31 + 11 skipped + **2 failed** | 27 + 17 skipped | 16 + 2 skipped |
| WebKit 1440 | 29 + 12 skipped | 42 + 1 skipped + **1 failed** | 44 | 18 |

- `tools/matrix.py` (`logs/matrix.txt`, `matrix-why.txt`): 147 titles in four projects. **376
  readings are RED on v11.1.0 and GREEN on the tip, 117 green on both, 90 skipped on both and 5
  RED on both** (the five tip failures). No reading on either tree is a timeout, an
  interruption or a missing report; every red-tree failure is an assertion of its cell's claim.
  Each skip carries the spec's stated reason.
- **Against critique 13's matrix** six titles differ (`diff` of the two `matrix.txt`):
  - **the lift cell, G/G to R/G at 390 in both engines and G/G at 1440** (it now runs at 1440):
    critique 13's defect, cured (below);
  - the five tip failures: the Sheet right's exit cell in Chromium 390 and WebKit 390, the
    "Select closed while it opens" turn in WebKit 390 and 1440, the "DropdownMenu closed while
    it opens" turn in WebKit 390 (critique 13 had three of these turn and leave readings red
    under its own load);
  - the leave cell's "Dialog closed and reopened mid-exit" in WebKit 1440, R/R to R/G (critique
    13's gap B; green here);
  - "standing · DropdownMenu by escape" in WebKit 390, R/G to G/G: v11.1.0's film there steps
    0.225 to 0.022 across an 18 ms frame, 0.189 a frame, under the fifth by a hair; a
    no-regression read whose v11.1.0 reading is timing, as critique 13 listed four. Green on the
    tip in every project.
- **The five tip failures, read again:**
  - **"exit · Sheet right leaves on the exit curve"**, Chromium 390 and WebKit 390, both on "the
    exit follows the exit curve" (stray 0.212 and 0.066 against 0.06). The cell fits the curve
    from the press, allowing up to 40 ms for the input's latency (`release-11-1-1.spec.ts:288-300`
    and `:365-366`). The two films break it differently:
    - Chromium (load 35 to 44): the Sheet first moves 22 ms after the press, then the film holds
      three paint holes of 75, 76 and 83 ms. A Sheet's exit runs on `runExitClock`, which by
      design advances at most one 60 Hz frame per painted frame (`exitClock.ts:59-61`: "a long
      frame … slows the run rather than skipping a stretch of it"), so the holes stretch the
      motion to 425 ms.
    - WebKit (load 52 to 98): the Sheet moves for 248 ms with no hole, but first moves 81 ms
      after the press, past the 40 ms allowance.

    Read again on the tip, five times a run:
    - Chromium 390 at a load of 17: 5 of 5 (first move 19 to 25 ms, exit 262 to 267, stray
      0.008 to 0.012; `logs/exitR-tip-cp`).
    - WebKit 390 at 33 to 37: 5 of 5 (first move 43 to 51 ms, exit 291 to 310, stray 0.014 to
      0.033; `exitR-tip-wp`).
    - WebKit 390 again at 01:53, the load rising from 58 to 164: 1 of 5 (`exitR-tip-wp2`). The
      four failures first move 59 to 202 ms after the press and move for 263 to 319 ms, one with
      a 46 ms hole.

    On the red tree in WebKit 390 it fails 3 of 3 on the claim (first move 29 to 37 ms, stray
    0.080 to 0.105; `exitR-red-wp`). The cell is RED on v11.1.0 and GREEN on the tip at the
    loads it was read again at. Above them the tip fails it on a late start or a stretched
    clock, neither of which the cell states as a precondition (open gaps A and J).
  - **The turn cells** ("a Select / a DropdownMenu closed while it opens turns from where it
    is"), each on "the film is read: no hole of more than two frames … in either of two films"
    (holes 57, 46 and 43 ms). Critique 13's gap D, now in WebKit 1440 as well. Their claims in
    the failing films hold (shares 0.036 to 0.109, turned where the press found them). Read
    again three times a cell at 01:52 (`logs/rev-*-wp2`, `rev-tip-wd2`, load 35 to 58): the tip
    3 of 6 in WebKit 390 and 3 of 6 in WebKit 1440, every failure the hole precondition, every
    read film's share 0.032 to 0.109; v11.1.0 in WebKit 390 0 of 6, all six on the claim (it
    jumps to fully open: shares 0.375 to 0.617). Re-read against the films: in the tip's Select
    films the long gap is the frame the surface is removed, 227 to 269 ms after the second input,
    its opacity already 0 (`rev-tip-*`, `tip-webkit-*-1`); v11.1.0's films hole at their removal
    too (149 to 215 ms, `red-webkit-*-1`). The cell is RED on v11.1.0 and GREEN on the tip
    whenever its film is readable (open gap B).
- **Row 10's lift cell** (`lift · a scale-on-hover element lifts under a hovering mouse and
  returns to rest after a tap`), read twice: in the gate's part A on each tree, and alone in
  every project on the tip, red and norule trees (`logs/lift-<tree>-<project>`, WebKit at 00:07):

| lift cell | Chromium 390 | Chromium 1440 | WebKit 390 | WebKit 1440 |
|---|---|---|---|---|
| tip | GREEN | GREEN | GREEN | GREEN |
| red (v11.1.0's library) | RED: "scale after the tap: 1.08" | GREEN | RED: "scale after the tap: 1.08" | GREEN |
| norule (no rule on the page) | RED: rests at `none` | RED: rests at `none` | RED: rests at `none` | RED: rests at `none` |

  - Re-read against the source: the tip's `btn.css:15-31` lifts under `@media (hover: hover)`
    only; v11.1.0's lifts on a bare `:hover`, which a touch tap leaves set. The phone projects
    report `(hover: none)`, so at 390 the tip's tile stays at its base `scale: 1` and
    v11.1.0's takes 1.08 after the tap. The 1440 clause is a no-regression read (the lift stays
    where a mouse hovers) and is GREEN on both trees, as it should be.
  - The new clause bites where the rule is absent: on the norule tree the tile rests at `none`
    with `--scale-hover` at 1.08, in all four projects. The built demo's 105 stylesheets still
    hold `scale-on-hover` 0 times (`dist-demo/assets/*.css`, built at 21:09 by this seat's
    gates), so the harness's own stylesheet (`controls-harness.css`: the demo's, plus an
    `@source` naming the harness) is what carries the rule. The round and weight cells read as
    critique 13's matrix has them on the same runs.
- **The CommandDialog cells** (items (b) and (c), below) bite as the note writes them.

### 2. The motion rows' frame tables

**Holds.** Read from the tip's sixteen part reports with the earlier critics' readers
(`tools/sum.py` → `logs/sum-tip.txt`, `steps5.py` → `steps5-tip.txt`, `standing.py` →
`standing-tip.txt`, `turns.py`, `unread.py`, `exitclock.py`, `legs.py` →
`legs-tip-reduce.txt`, `frost.py`, `detent_close.py`, `cmdexit.py`), then re-read against the
frames they name. Load was higher than critique 13's in WebKit (28 to 140 against 26 to 66), and
the WebKit films show it in longer gaps between samples.
- **No frame carries more than a fifth.** Leaving out the disclosure guard, the most any
  16.7 ms window carries is 0.175 (an ExpandableContainer leaving, WebKit). All 156 standing
  readings pass, the largest at 0.173.
- **Two consecutive steps over a fifth, both across lost frames**, in WebKit: an Accordion's
  standing film by its trigger, 0.217 across 21 ms (1440), and a detented Sheet leaving by
  Escape, 0.202 across 22 ms (390). Scaled to one frame, as the gate reads them, 0.173 and
  0.153.
- **No cut at the start.** The largest first moving sample is 0.171, an Accordion's standing
  film across a 26 ms gap (WebKit 1440), 0.11 a frame.
- **No last-frame step a row forbids.** The largest last moving sample is 0.135 across an 18 ms
  frame: a leaving Select's trigger pressed again, its reopen from 0.645 to 1 in WebKit 390
  (load 37 to 68). Re-read against the film: that reopen runs 0.645, 0.660, 0.726, 0.865, 1 at
  0, 25, 34, 49 and 67 ms; it covers the rest of the entrance in about 60 ms on every tree and
  project (Chromium 390: 0.584 to 1 in 58 ms, last step 0.020; critique 13's WebKit 390 film:
  last step 0.033 over 10 ms), so the 0.135 is the reopen's own pace caught by one long frame
  (0.125 a frame, the cell's share 0.143). The next largest is 0.073 (a Dialog's exit, WebKit
  1440).
- **Holes.** In Chromium the longest gap in a moving table is 17 ms, except the loaded Sheet
  right film above (83 ms). In WebKit it reaches 41 ms at 1440 and 44 ms at 390.
- **No overshoot.** No sample runs against its leg's direction outside the turn cells and the
  disclosure guard. The read turn films turn where the second input found them, shares 0.029
  to 0.157 (`turns-tip.txt`).
- **The disclosure guard's reopen** steps 0.27 to 0.37 between two frames (the region drops to
  0 and opens again), 11.1.0's behaviour, kept by the ruling after fix 6. The `weight` cell's
  steps are a list of item boxes, not motion.
- **The exit clocks** (`exitclock-tip.txt`): a Select lit to 213 to 231 ms, a DropdownMenu 222
  to 233, a Popover 244 to 253, a Tooltip 125 to 133, a Dialog 186 to 215, the sliding Sheets
  253 to 289 (the two holed films aside); first steps 0.006 to 0.115.
- **The CommandDialog's exit** (`cmdexit-tip.txt`, eleven films: pick, Escape and an outside
  press in each project, the outside press skipped by the spec in WebKit 390): opacity falls
  monotonically to 0.009 to 0.024 over 13 to 28 frames, the largest step between frames 0.056
  to 0.061 in Chromium and 0.104 to 0.106 in WebKit (a 17 ms frame); scale 0.950 to 1; the
  layout box 512 × 435 (350 × 435 at 390) on every frame; no filter; a 10.6 to 10.8 px drop;
  the list mounted on every frame.
- **The palette's search field through the exit** (`probe-cmd/text.probe.ts`, this seat's, a
  copy of critic 13's typed probe that also records the field's text per frame; Chromium, "se"
  typed, then a tap, Enter or Escape; `logs/text-<tree>-<project>`): on the tip the field reads
  "se" and the plate holds its four rows until it unmounts (1440 and 390, 3 of 3 each); on the
  pre tree a tap or Enter turns the field to "search" and the rows to one 13 to 53 ms into the
  exit, and Escape empties it and shows all nine rows 22 ms in; on the red tree the list is gone
  8 to 39 ms in.
- **Under reduced motion** (`legs-tip-reduce.txt`): no box steps in any leg; the surfaces'
  fades span 112 to 218 ms, the long ones in WebKit, where a Sheet's fade runs on the frame
  clock (twelve frames of about 18 ms; open gap H) and the reduce cell allows 200 ms and a frame; an ExpandableContainer's 115 to 130 ms; a
  site's own fade keeps its 134 to 147 ms; the dock's fold and the run mark cross-fade with no
  travel. The frost layer reads its plate's opacity on every mounted frame in all twelve Sheet
  films (`frost-tip.txt`).

**The gestalt.** No motion source changed since critique 13 (`src` last changed at
`4c30732a0`, which moves nothing on screen itself). The strips read as critique 12's and 13's:
each popup leaves by its fade and its few pixels of slide, a Sheet by its slide, the
ExpandableContainer by its shrink and fade, one effect per change, with the two exceptions
those critiques name, both 11.1.0's: the Dialog's (and so the palette's) three channels (a 5 %
scale, an 11 px drop and the fade) and the Toast's release. Nothing on the list was added for
ornament.

### 3. The earlier release specs

**Holds.** The specs ran on `ca61ce5b6` in Chromium (headless-new) and WebKit 2287 with critic
12's and 13's step list (`critic-14/reg-inner.sh`, `logs/chain.txt`): one guarded call per
engine, Chromium 21:59 to 22:27 at a load of 11 to 35, WebKit 01:09 to 01:48 at 15 to 49; then
the one failing step on the red tree.

| spec | Chromium | WebKit |
|---|---|---|
| release-10-1-5, part A / part B | 84, 23 | 84, 23 |
| release-11-0-1: owner, daraksha, fix 2, critic 2 | 9, 2, 14, 9 | 9, 2, 14, 9 |
| release-11-0-1 critic 1 and 1b | 24 | 23 + **1 failed** |
| release-11-0-2 with slider-forced-colors | 57 | 54 + 3 skipped |
| release-11-0-2 on coarse touch / on WebKit 2311 | 37 + 17 skipped | 51 + 3 skipped |
| ro-loop (11.1.0) | 4 | 4 |
| release-10-1-3 (restated in 11.1.0) | 60 | 58 + 2 skipped |
| radius-scale (restated on the branch), Chromium and coarse touch | 64 | no WebKit project |

- **The one failure** is critic 1's "a light-390c: the wide label seat's plate is a capsule in
  paint", a `TypeError` in `plateOf` (`release-11-0-1-critic-1.spec.ts:68`, a row under the
  plate's top edge with no differing pixel), the witness fault the note after critique 5 booked
  as I for 11.1.2's spec sweep. On the red tree the same step failed both light titles with the
  same `TypeError` (22 + 2 failed). Read again, the two light titles three times a run, tip and
  red interleaved twice (`logs/c1-{tip,red}-{a,b}`, 01:49 to 01:51, load 15 to 38): light-390c
  passes 1 of 6 on the tip and 3 of 6 on v11.1.0, light-1440f 4 of 6 on the tip and 1 of 6 on
  v11.1.0, every failure that `TypeError`. It fails by chance on both trees.
- Critique 13's one failure, release-10-1-3's "390 · right-anchored · ancestor zoom 1.25 · D-1"
  in WebKit, passed here (the whole spec 58 + 2 skipped).
- No earlier spec changed since v11.1.0 except radius-scale (`git diff --stat v11.1.0 HEAD` over
  those specs: radius-scale's arm for row 12's coarse-pointer corner, RED on v11.1.0 as its
  biting plant), and none since critique 13.
- The runs left no tracked file changed (`logs/reg-status-after.txt`).

**No title fails on the tip that passes on v11.1.0.** release-10-1-5's 32 critic and fix specs
(critique 12's gap K) are still not run.

### 4. Nothing removed or renamed

**Holds.** I packed the gates' fresh `dist` at `ca61ce5b6` with `npm pack --ignore-scripts`
(`logs/pack-tip.json`): 904 files, 3,055,590 B unpacked, equal to `.bundle-ratchet`. Against the
11.1.0 registry tarball:
- **`exports`:** 70 keys on both, none removed, added or changed; in `package.json` only
  `version` differs (`logs/pack-vs-11.1.0.txt`).
- **Files:** 899 to 904, none missing; the five added are the `exit-press` and `leave-finished`
  chunks, their declarations and `exitClock.d.ts`.
- **Declarations** (`logs/dts-vs-11.1.0.txt`): 571 to 574 files, thirteen changed, byte for byte
  critique 13's reading (its two of master's, `FOURIER_STROKE_RUNGS` and
  `SHELL_FIELD_CANVAS_SELECTOR`, reach no `exports` or `typesVersions` key and are not in
  11.1.0's built JS). `verify:package`'s roster is `PRESENT`, 292 of 292.
- **Names in the built CSS and JS** (`logs/names-vs-11.1.0.txt`), **moved values**
  (`moved-values-vs-11.1.0.txt`) and **class selectors** (`classes-vs-11.1.0.txt`): identical
  to critique 13's files. Custom properties 1,164 to 1,171, none removed; keyframes 97 to 100,
  none removed; class selectors 652 to 652; layers 4 to 5; `data-` attributes 121 to 123; custom
  properties written from JS 185 to 186, none removed.
- **Defaults moved:** critique 13's list, unchanged; nothing since `136ab6da8` touches `src`.

### 5. The gates on the committed tree

**Holds.** Each command ran once through `guarded` on `ca61ce5b6`, no tracked file dirty, 21:05
to 21:16 (`logs/gates.out`, `logs/gate-*.log`):
- typecheck: exit 0;
- build: exit 0, its `glass-ui:ready` line written;
- `verify:package`: exit 0, terminal `CLEAN`, 197 claims, the roster `PRESENT` (292 of 292);
- `demo:dist:build`: exit 0;
- vitest `--maxWorkers=2`: exit 0, 282 files, 2,524 passed, 5 expected to fail, 1 skipped
  (critique 13's counts).

No workflow runs a browser: `ci.yml` and `release.yml` run `npm ci`, typecheck, build,
`verify:package`, `demo:dist:build` and `npm test` (`vitest run`, whose config excludes
`*.browser.test.ts`; `tests/gates/ci-browser-free.test.ts` holds that); `deploy-demo.yml` builds
the demo, deploys it with wrangler and runs `check-served.mjs`, which is HTTP only.
`scripts/release.sh` runs the browser gates (`test:browser`, the pixel floor, the exits gate).

### 6. Comments added in `src`

**Holds.** `git diff v11.1.0 HEAD -- src` adds 1,273 lines (`logs/src-added.txt`), none since
critique 13. I searched every added line for this release's ids (`O-nnn`, `LT-n`, `K1` to
`K4b`, `RU-n`, "row n", "round n", "fix n", "11.1.n"), letter-and-number ids, dates, tranche
names and π, and for tranche, critique, critic, seat, orchestrator, witness, scope, ruling,
owner, probe, film, plant, gate, atlas, hassio, gregg, value.js and fourier. It finds the code's
own words: the dock's seats (`data-glass-dock-seat`, "a press darkens the seat"), CSS's
`:scope`, a local named `probe` in `exitClock.ts`, and "fallback" for the reduced-motion rule
(the one "defensive fallback" phrase is 11.1.0's line, rewrapped).

### 7. The CHANGELOG entry

**Holds.** The entry is unchanged since `136ab6da8` (`logs/changelog-11.1.1.md`, identical to
critique 13's copy), and nothing it describes moved since.
- **Prose:** outward; no internal id or seat word; its one em dash is in the heading.
- **Moved values** (item 4's list): `--exit-curve` (old and new value stated), the exit clocks
  (menus and selects about 220 ms, popovers 250, tooltips 120, a dialog about 180, a sheet 250,
  a detented Sheet about 400), `--enter-overlay-scale` / `-blur` and `--enter-tooltip-scale` /
  `-blur` no longer shaping their registers, the narrow plate's `data-plate="firm"` in place of
  `data-surface="opaque"`, the `reduced-motion` layer, the press under reduced motion, a wide
  SegmentedTabs strip's coarse-pointer corner, `scale-on-hover`'s guard and the palette's held
  query. The clocks measured in item 2 agree.
- **Sizes:** every figure exact to the byte against this seat's pack and the two registry
  tarballs (`tools/sizes.py`, `logs/sizes.txt`, identical to critique 13's): the dock entry
  38,673, 40,541 and 40,533; `dialog` 12,508 to 14,529, `select` 8,453 to 9,517, `popover`
  8,663 to 9,385, `tooltip` 5,897 to 6,607, `menu` 11,865 to 12,555; the root entry 104,776 to
  108,751, `command` 16,804 to 18,978, `sheet` 14,306 to 16,726, `tabs` 19,091 to 20,154,
  `easing` 36,889 to 37,983, `motion` 12,599 to 13,544, `toast` 5,093 to 5,879. No other entry
  grew past 500 B (`configurator` +448, `expandable-container` +436).
- **The lift line** ("`scale-on-hover` no longer sticks after a tap … only where the pointer
  can hover") is true of the source and of the lift cell's readings in item 1. Fix 14 changed a
  harness, not the library, so it needs no line.

### 8. The note after the close, items (a) to (e)

**Holds,** each item with its witness, on the merged tree.

**(a) The pixel floor reads the renderer from the page.** `2cce4d8a9` binds `data-renderer` and
`data-state` on the aurora and blob stages' substrate elements from the component's own
`renderer-status` event, with no visible text; `substrate-paints-color.spec.ts:436` and `:681`
read `[data-aurora-substrate][data-renderer]` and `.goo-blob-wrapper[data-renderer]` and wait
for `data-state="ready"`. The three legs as `release.sh` runs them, each its own guarded call
(`critic-14/floor.sh`, `logs/floor-{green,planted,flood}`, 21:56 to 21:59):
- green, 3 passed: the aurora's mean channel 238.7 on DEFAULT and 104.0 (`vangogh`) to 242.0 on
  the ten presets against a floor of 8; the blob's coverage 0.178 twice, between 0.1 and 0.7;
- planted: both floors fail their plant on their own assertions (the aurora black, 0.0 on
  DEFAULT and 2.0 on every preset; the blob's coverage 0.000); the gate prints GREEN for its
  self-test;
- flood: the blob's ceiling fails its plant at a coverage of 1.000 against 0.7.

**(b) The CommandDialog cells drive the rebuilt Command page.** `80287b971`'s changed lines equal
the close's `commanddialog-restate.patch` line for line. Escape and outside on the red tree fail
in all four projects on "the list is mounted while the plate is seen"; on the tip both pass in
all four. The outside press is skipped in WebKit 390 by the spec's stated reason, on both trees.

**(c) A palette closed by a pick keeps its rows through its exit.** `4c30732a0`: `CommandInput`
withholds the query's update while the dialog it sits in is closed and still mounted, and emits
an empty query on unmount if it withheld one. The pick cell (the plate's layout box within 1 px
from the pick to the exit's last frame, then the next open's query empty with every row):
- **RED on the pre tree** in all four projects: the plate drops from 435 to 119 px 38 to 115 ms
  into the exit (`logs/pre-<project>`), and the standing cell by pick fails with it (shares
  0.378 to 0.726);
- **RED on v11.1.0** in all four (the list unmounts);
- **GREEN on the tip** in all four, the next open's query empty and every row back;
- **Escape and outside unchanged**: green on the pre tree and on the tip in every project that
  runs them;
- the field's own text holds too (item 2, the text probe), which the cell does not read.

**(d) `scripts/release.sh` builds the demo before `npm test`.** `9c85560b0` runs `npm run
demo:dist:build` before `npm run prepublishOnly`, as `release.yml` does. Witness
(`logs/gate-d-*`, 21:14 to 21:16): after the gates' demo build I touched `demo/main.ts`; the
boot-graph test then failed one arm ("the dist-demo it measures is NEWER than every source it
is built from"; 1 failed, 13 passed); after `npm run demo:dist:build` it passed 14 of 14.

**(e) The WebKit title** "fix 12, coarse phone › t1" (`release-10-1-5.spec.ts:2371`), alone and
repeated three times on each tree in WebKit 2287 (`logs/e-{tip,red}`, 00:08 to 00:14, load 30
to 98): 3 of 3 on the tip, 3 of 3 on the red tree. It passed again inside release-10-1-5 part B in
WebKit on the tip (23 of 23, item 3). Its spec is unchanged since v11.1.0. A load flake, as fix
13 and critique 13 read it.

## Defects

None. No item of the finite list fails.

## Open gaps (for INBOUND)

For INBOUND; outside the finite list.

- **A. The exit cell fits its curve on the wall clock from the press.** `exit · <surface>
  leaves on the exit curve` fits a Dialog's or a Sheet's exit to the curve from the press,
  allowing up to 40 ms for the input's latency, and holds it within 0.06
  (`release-11-1-1.spec.ts:288-300`, `:397-401`). Under load the tip's Sheet exit fails it two
  ways, and the cell states neither as a precondition. It can first move more than 40 ms after
  the press: 81 ms in the gate's WebKit film, and 59 to 202 ms in four of five films at a load
  of 58 to 164. And `runExitClock`, which advances at most one 60 Hz frame per painted frame
  (`exitClock.ts:71`), stretches the motion over lost frames: 425 ms over three holes in
  Chromium, 263 to 319 ms at the higher WebKit load. Read at loads of 17 and 33 to 37 it is
  GREEN 10 of 10 (item 1). Fitting from the first moving frame on the frames' own count would
  make the cell read its claim on a busy machine, and so would a stated whole film and prompt
  start with one refilm, as the turn cells have. `release.sh`'s exits gate meets this there.
- **B. The turn cells under load**, critique 13's gap D: "a Select / a DropdownMenu closed while
  it opens" can hole in both films above a load of about 40, now in WebKit 1440 as well as 390
  (three tip readings here, and 3 of 6 in each engine when read again). In the Select films
  the long gap is the frame of removal, after the surface has reached 0, on both trees (item
  1). A hole precondition that ends at the last frame with any light, or a third film, would
  let the cell read its claim on a busy machine; as it stands `release.sh`'s exits gate fails
  there.
- **C. Two other harnesses ask for widths the demo's stylesheet no longer generates** (fix 14's
  gap A, confirmed): `w-52` (`exits-harness.ts:98`, `leave-harness.ts:46`) and
  `min-w-[12rem]` (`exits-harness.ts:91`) appear 0 times in the 105 stylesheets this seat's
  `demo:dist:build` wrote. Those surfaces open at their content's width. No cell reads that
  width as its claim; the cure would be the one fix 14 built (each harness scanned).
- **D. A detented Sheet's unmount in WebKit 390.** In this seat's one film of "a detented Sheet
  leaves whole by Escape" (WebKit 390, load about 50) the sheet's top edge reached the foot at
  409 ms and the content unmounted at 731 ms; in the other three projects 475 to 485 ms, and
  critique 13's WebKit 390 film 481 ms. Nothing shows in between (the sheet is past the edge).
  One reading, not chased; if it holds, a host waiting on the leave event would wait that long.
- **E. Critique 13's gaps** stand as written: A (a palette with `unmountOnHide: false` never
  clears its held query), C (the Dialog's three channels, the palette's with it, booked for
  11.1.2), E (release-10-1-3's D-1 summary-glyph cell under load; it passed here), F (critique 12's gaps
  A to N; release-10-1-5's 32 critic and fix specs, 582 tests, still not run), G (the note's
  instructions to the next close: the visual suite on a full git-archive tree of the tip, every
  coarse-touch chunk read; not run here) and H. Its gap B (the leave cell's press landing after
  the exit) read GREEN here in all four projects.
- **F. The machine.** The 1-minute load ran 11 to 140 (other sessions); the WebKit lock was
  contended by four to six sessions and this seat waited 50 minutes for it twice. The guard
  refused nothing.
- **G. Side effects in the worktree.** The gates rebuilt `dist/` and `dist-demo/` (both
  ignored), and item (d)'s witness touched `demo/main.ts`'s modification time and rebuilt
  `dist-demo/` after; no tracked file changed (`logs/reg-status-after.txt`). This seat's trees
  under `.cache/` (`critic14-red`, `critic14-pre`, `critic14-norule`, `critic14-pub`,
  `critic14-reg`, 100 MB) were removed at the seat's end; `trees.sh` rebuilds them. No process or
  server of this seat is left running.
- **H. The scripted exits slow down whenever frames come slower than 60 Hz.** `runExitClock`
  adds at most 16.7 ms of progress per painted frame (`exitClock.ts:71`), so the clock is a
  frame count, not a time, below 60 Hz: where animation frames arrive at 30 Hz (a power-saving
  throttle, a 30 Hz display mode, a busy page) a Dialog's 180 ms exit runs about 360 ms, a
  Sheet's 250 ms about 500 ms, and their reduced-motion fade, which the CHANGELOG bounds at
  200 ms, about 400 ms; the CSS-driven exits (menus, selects, popovers, tooltips) keep their
  clock. The detented Sheet's reduced-motion fade runs on the same clock (`detents/use.ts:145-151`).
  Read here: the reduced-motion Sheet fades in WebKit span 196 to 218 ms over twelve or
  thirteen frames (the reduce cell allows 200 ms plus a frame), and the Chromium Sheet exit's
  motion ran 425 ms over three holes (item 1). The clamp's purpose, one long frame slowing the run rather than
  skipping it, holds with a looser bound (say 50 ms a frame), which would keep the clock at a
  steady 30 Hz. The CHANGELOG's figures hold at 60 Hz and above; nothing in this release's
  witnesses reads below it.
- **I. Critic 1's light WebKit titles** (`release-11-0-1-critic-1.spec.ts`, light-390c and
  light-1440f) fail by chance on both trees with a `TypeError` in `plateOf` (item 3), booked
  for 11.1.2's spec sweep after critique 5; critique 13 read them 24 of 24, this seat 2 to 5
  failures in 6 per title and tree.
- **J. The scripted exits start a frame or two later than v11.1.0's.** `runExitClock`'s first
  frame paints progress 0 (`exitClock.ts:69-73`: `elapsed` starts at 0, and the first frame
  only records its time), and the curve starts slowly, so a Dialog's or a Sheet's exit first
  moves later after the press than v11.1.0's did. In the gate's part A films, both trees on the
  same runs:

  | first move after the press | Dialog | Sheet right | Sheet bottom |
  |---|---|---|---|
  | WebKit 390, tip / v11.1.0 | 49 / 23 ms | 81 / 40 | 49 / 27 |
  | WebKit 1440 | 48 / 18 | 48 / 26 | 49 / 35 |
  | Chromium 390 | 20 / 17 | 22 / 13 | 27 / 12 |
  | Chromium 1440 | 25 / 14 | 19 / 17 | 22 / 18 |

  The CSS exits start no later: a Popover moves 10 to 35 ms after the press on the tip, 14 to
  38 on v11.1.0. In WebKit this adds about 25 ms to an Escape's response. A clock that
  painted its first step on its first frame would remove the empty frame. Under load the delay
  grows (item 1, gap A).
