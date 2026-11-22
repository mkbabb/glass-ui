# 11.1.1 critique 11

Critic: claude-opus-5-5. Fable is out of quota until 2026-11-21, so this seat runs on Opus by
the orchestrator's ruling. It is a fresh seat and built nothing on the branch.

**Tip read:** `ce5f320b7` on `release/11.1.1`. Its source last changed at `d61228a78`, its
specs at `72e14afe8` (fix seat 11's one commit) and its CHANGELOG at `8d59c4175`; `ce5f320b7`
itself is fix seat 11's record. I read every orchestrator note in this directory (fourteen),
`critique-10.md`, `fix-11.md`, the scope file in the main checkout and
`git log v11.1.0..release/11.1.1`.

**How it ran.** One sitting, 2026-11-22 03:37 to 06:20, at a 1-minute load of 4 to 14.
- Every run went through `guarded`, WebKit under `--exclusive webkit`, on ports 5351 to 5356.
  The guard refused nothing. It printed its zone warning (armed, a warning only; the zone read
  8.05M at the start and 9.19M at the end) and held WebKit runs on the lock other sessions
  held, the longest wait about ten minutes (`tip-webkit-desktop-2`, 769 s for 2.4 min of
  tests).
- One heavy run at a time, in three chained scripts (`critic-11/chain.sh`, `chain2.sh`,
  `chain3.sh`); run lines in `critic-11/logs/runs.out`.
- **The v11.1.0 tree** (`critic-11/trees.sh`, built at 03:39 before any server of this seat):
  a `git archive v11.1.0` at `.cache/critic11-v11.1.0/tree`, with HEAD's 11.1.1 specs, config
  and harnesses copied in (hashes equal, `logs/redspecs-{red,head}.sha`). Its `src` and `demo`
  equal v11.1.0's, 863 blobs for 863 (`logs/red-src-demo.{v1110,tree}.blobs`). Its
  `node_modules` links each entry to the worktree's, with its own `@mkbabb` workspace link and
  its own Vite cache.
- The published 11.1.0 and 11.0.2 tarballs were fetched for this seat; their sha-1 equal
  `npm view`'s (`2180c51d…`, `b425a414…`).
- Scripts are in `critic-11/`, logs in `critic-11/logs/` (the earlier specs' own output in
  `logs/out/` stays uncommitted, as critic 10's did), readers in `critic-11/tools/` (critics 3
  to 10's, copied, and this seat's `rowa.py`, `exitclock.py` and `tooltip.py`). Probes:
  `critic-11/probe/` (fix 11's boundary probe, unchanged), `probe-rowb/` (critic 10's row B
  mouse probe, unchanged) and `probe-tip/` (a Tooltip's scale per frame, this seat's).

**Verdict: not ready to tag.** One finding, read twice in two engines on both trees, fails
two items of the list:
1. **A Tooltip now arrives with a squish that 11.1.0 never painted** (item 2). Row 6 keys the
   reveal's open state on a tooltip's `delayed-open` and `instant-open` (`dae6d8b3f`), so the
   hint now enters from the reveal's `@starting-style`: opacity 0 and scale `1.0282 0.91665`
   (the tooltip register's 0.97 × the squish 1.06 by 0.945, which `13573d28b` restated on that
   register when it took the squish off every other one). The hint narrows by 1.5 to 1.6 px
   while it grows 3.1 px taller as it fades in. On 11.1.0 it was whole from its first frame,
   scale `none`. This is the anisotropic scale the ruling after critique 1 took off the overlay
   register as ornament, now added to the one surface that never showed it on arrival, under
   a register comment that says "A hint is all fade".
2. **The CHANGELOG says a tooltip "still grows slightly as it arrives"** (item 7). On 11.1.0 it
   did not grow as it arrived; the entry's own Tooltip paragraph says it "appeared whole in
   one frame". What it does now is new, and it is a squish, not a grow.

Items 1, 3, 4, 5 and 6 hold. Critique 10's defect is cured: row A's cell passed in all ten of
this seat's runs on the tip, in both engines, and fix 11's boundary probe bites as fix 11
read it. The exits gate's sixteen parts are green on the tip with critique 10's counts, and
every row is RED on v11.1.0.

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

Holds.

**How it was read.**
- The exits gate's sixteen parts ran on the tip as `gate.sh` splits them
  (`logs/tip-<project>-<part>`), carrying on past a failure, from 03:42 to 04:22 at a 1-minute
  load of 6 to 12; then on this seat's v11.1.0 tree (`logs/red-<project>-<part>`) from 04:23
  to 04:59.
- **On the tip every part exits 0**, with critique 10's and fix 11's counts:

| project | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 38 + 3 skipped | 32 + 11 skipped | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |
| WebKit 390 | 25 + 16 skipped | 32 + 11 skipped | 27 + 17 skipped | 16 + 2 skipped |
| WebKit 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |

- `tools/matrix.py` tabulates each title on both trees (`logs/matrix.txt`, `matrix-why.txt`):
  146 titles in four projects. **377 readings are RED on v11.1.0 and GREEN on the tip, 115
  green on both and 92 skipped on both. None fails on the tip.** No reading on either tree is
  a timeout, an interruption or a missing report.
- **RED on v11.1.0.** Every part fails there in every project, 15 to 35 cells a part. I read
  every failure's first line, grouped:
  - Most fail on their claim: "no frame carries more than a fifth of what is seen" (89), "in:
    the fade spans at least two frames" (50), "one event" (40), "no frame after the turn moves
    more than a fifth" (28), "the exit follows the exit curve" (12), "the list is mounted while
    the plate is seen" (11), "it is open again" (11), "form on every exit frame" (8), "the
    plate blurs its backdrop" (8), "its block size reads one value on every frame of the rise"
    (2), and so on.
  - None is a crash, a timeout or a lost film.
  - Eight fail on a precondition that v11.1.0's own fault breaks. In the Tooltip turn cells
    ("the second input lands mid-motion") the hint has no tween, so it is already whole or
    already gone. In the ExpandableContainer reopen ("the reopen lands mid-exit") the overlay
    is gone at the first frame.
- **Green on both** are the no-regression reads the spec names:
  - the form cells at 1440 (no sheet form there), the compact strip, and solid under reduced
    transparency;
  - the disclosure guard, ExpandableContainer's entrance and first-frame Escape, and the
    Slider held still;
  - the "says nothing" halves of the leave event;
  - a DropdownMenu reopened while it closes (the CHANGELOG claims the reopen turn only for a
    Popover and a tooltip);
  - the standing cells of the Sheets, of the Dialog by close and Escape, and of the
    disclosures.

  The Dialog by an outside press reads RED on v11.1.0 at 1440 and green at 390 here, a
  timing-dependent reading critique 10 also saw. Row 3's Dialog has `exit · Dialog leaves on
  the exit curve` RED on v11.1.0 in all four projects.
- **Each row has R/G cells in every project it can run in** (`logs/families.txt`):
  - rows 1, 2, 12, A, the lift and row B run at 390 only, and row 6 at 1440 only (a Tooltip
    does not open on touch);
  - the press cell skips WebKit 390 (no held touch);
  - row 1's outside-press and trigger routes, and 14 standing routes, skip WebKit 390 (its
    touchscreen tap reaches no outside listener).

  All 92 skips on the tip carry one of the spec's stated reasons (`logs/skips-tip.txt`).
- **Row A** (`e45c97fe8`, its tap rule at `72e14afe8`, the one spec change since critique 10),
  read with `tools/rowa.py`:
  - **In the gate:** Chromium 390 passed, with height spread 0, share 0.105, and 20 of 20 aimed
    taps hitting and closing at each of 120, 190, 250 and 400 ms. Its two late taps, both at
    120 ms, landed 14 and 16 px out and were taken again. WebKit 390 passed, with spread 0,
    share 0.113, 80 taps and none late.
  - **Repeated on the tip** (`logs/rowa-tip-{cp,wp}`, 05:58 to 06:14, load 6 to 7): 5 of 5 in
    Chromium 390 and 3 of 3 in WebKit 390. Of 416 Chromium taps, 16 were late, every one at
    120 ms and 9 to 17 px out; none was an aimed miss. All 240 WebKit taps were on time. Height
    spread 0 every run; share 0.112 to 0.196 in Chromium, 0.110 to 0.112 in WebKit (the 0.196
    is open gap D).
  - **On v11.1.0** it is RED in both engines on its first clause, "its block size reads one
    value on every frame of the rise".
  - **The rule still bites.** A missed press now counts as late when its point lands outside
    the button's box by any distance. The cell stops after 20 late presses at a delay
    (`late < 20`) and then fails "twenty presses land where the frame draws the button". So a
    button that cannot be hit at its drawn centre still fails the cell. A press inside the box
    that misses still counts as aimed and fails "the tap hits the button".
  - **The boundary probe** (fix 11's, unchanged, on the tip in Chromium 390,
    `logs/boundary-cp`) reads as fix 11 read it. Under the old rule the presses 0.1 and 0.2 px
    below the button land on the head (`pointerdown:00:0px click:00:0px`), round to 0 and fail
    as aimed misses (RED). Under the branch's rule the same two presses count as late
    (GREEN). Every press from 0.3 px out has the button as its target, by Chromium's touch
    adjustment, and hits under both rules.
  - **Every recorded run** of the cell's current form in this directory, this seat's included
    (40 cells, 3,353 taps, `tools/rowa_scan.py`, `logs/rowa-scan.txt`), has six aimed misses.
    The two on tip trees are fix 10's and critique 10's, both recorded as 0 px under the old
    rounding: the half-pixel case `72e14afe8` cures. The other four are on v11.1.0 trees and
    are v11.1.0's fault.
- **Row B** has no WebKit cell in the gate, since Playwright WebKit's touchscreen cannot drag
  (open gap A). Critic 10's mouse probe, run unchanged on both trees in WebKit 390
  (`logs/rowb-{tip,red}-wp`), reads it R/G: shares of 0.164 at speed and 0.145 at rest on the
  tip. On v11.1.0 both read 1.036, with the sheet jumping from 242 back to 405 in one frame.
- **The frost row** (`d61228a78`), read with `tools/frost.py`:
  - On the tip, in all twelve films (three Sheets, four projects), the frost layer enters from
    0, reads its plate's opacity on every mounted frame (gap 0) and leaves at the plate's last
    painted value, 0.007 to 0.058.
  - On v11.1.0 each fails first on the plate's own fade ("in: the fade spans at least two
    frames").

### 2. The motion rows' frame tables

**Fails on the gestalt** (defect 1). The frame tables themselves hold. Read from the tip's
sixteen part reports with critic 3's and critic 5's readers (`tools/sum.py`, `steps5.py`),
then re-read against the frames they name:
- **No frame carries more than a fifth.** Leaving out the disclosure guard, the most any 16.7 ms
  window carries is 0.177 (row B's release, Chromium 390). The standing cells' largest share
  is 0.175 (an ExpandableContainer closed, WebKit 1440), and all 156 standing readings are
  green (`logs/standing-tip.txt`).
- **No cut at the start.** The largest first moving sample is 0.113 (a Select by an outside
  press, standing).
- **No last-frame step.** The largest last moving sample is 0.049 (a Tooltip by its trigger,
  WebKit 1440).
- **No hole.** The longest gap between two samples of a moving table is 25 ms (a Select's turn
  in WebKit), and no reverse film was set aside as unread.
- **No overshoot.** No sample runs against its leg's direction outside the turn cells and the
  disclosure guard. The turn films (`tools/turns.py`) turn with shares of 0.021 to 0.158.
- **The only consecutive steps over a fifth** are two:
  - the `weight` cell's item positions, which are a list of boxes, not motion;
  - the disclosure guard. On a reopen the region drops from 0.36 to 0.49 to 0 in one frame
    and opens again from 0. That is 11.1.0's behaviour, which the ruling after fix 6 keeps for
    11.1.1, and the guard's claim holds (the reopen finishes, with no hole and no failure).
- **The exit clocks** (`tools/exitclock.py`, at 1440, both engines):
  - On the tip, a Select and a DropdownMenu are lit to 213 to 224 ms, a Popover to 248 to 255,
    a Tooltip to 120, a Dialog to 192 (its first move at 21 to 29 ms), and the sliding Sheets
    to 256 to 264.
  - On v11.1.0 the Select and the menu held full light to about 115 ms and were gone by about
    125, with a first step of 0.61 to 0.73. The Popover was gone at 136. The Tooltip lost 0.295
    in its first frame and was gone at 70. The Sheet left on `cubic-bezier(0, 0, 0.2, 1)` with
    a share of 0.134, against the tip's 0.096.
- **A detented Sheet's close** (`tools/detent_close.py`): under 1 % of it shows 334 to 342 ms
  after the close, its top edge reaches the foot at 387 to 400 ms, and it unmounts about
  80 ms later, wholly past the edge. The film's one opacity step (1 to 0) is at that unmount,
  when nothing of it is on screen. Its fill alpha drifts from 0.200 to 0.183 on the way.
- **Under reduced motion** (`tools/legs.py`, `tools/frost.py`, part D):
  - no box steps in any leg;
  - the surfaces' fades span 166 to 211 ms over 17 to 26 frames, an ExpandableContainer's 110
    to 121 ms, a toast's fade out 152 to 155 ms and a tooltip's 112 ms;
  - a site's own 140 ms fade keeps its clock;
  - the dock's fold and the run mark cross-fade with no travel, and a Sheet's frost layer reads
    its plate's value on every frame.

**The gestalt** (`tools/channels.py` over the four parts A, and the frame objects behind it):
- a dock Select at 390 fades as it slides down past the edge (y 615 to 841). At 1440 it fades
  in place, with about 10 px of travel on a pick (booked for 11.1.2, A after critique 5);
- a dock DropdownMenu fades in place, its material held;
- a menu's clip draws in as it fades, and a Popover fades with 8 px of travel;
- a sliding Sheet slides on its curve. A detented Sheet's top edge goes down without a break:
  its box shrinks to the floor and the floor slides on;
- a CommandDialog fades with a few per cent of scale and an 11 px drop, the Dialog's three
  channels: on 11.1.0 already, and booked for 11.1.2 (C after critique 5);
- under reduced motion nothing travels: each surface fades in place;
- **a Tooltip enters with a squish** (`probe-tip/tooltip.probe.ts`, three films a tree,
  Chromium and WebKit at 1440, `logs/tt-{tip,red}-{cd,wd}`, read by `tools/tooltip.py` into
  `logs/tooltip-films.txt`). This is defect 1. None of the gate's cells reads it: the tooltip
  films record opacity alone.

| tree | engine | entrance, first mounted frame to rest | exit |
|---|---|---|---|
| tip | Chromium | scale `1.0282 0.91665` → `1`, box 57.4 × 33.6 → 55.8 × 36.7, under a fade 0 → 1 | scale `1`, opacity alone |
| tip | WebKit | scale `1.0282 0.91665` → `1`, box 56.7 × 33.6 → 55.2 × 36.7, under a fade 0 → 1 | scale `1`, opacity alone |
| v11.1.0 | Chromium | scale `none`, opacity 1, box 55.8 × 36.7 from its first frame | scale → about `1.027 0.918` as it fades |
| v11.1.0 | WebKit | scale `none`, opacity 1, box 55.2 × 36.7 from its first frame | scale → `1.028 0.917` as it fades |

  The scale settles over about 100 ms, while the light rises to about 0.4.

### 3. The earlier release specs

Holds. The specs ran on `ce5f320b7` in Chromium (headless-new) and WebKit 2287, using critic
10's step list (`critic-11/reg-inner.sh`, `logs/chain.txt`):
- one guarded call per engine, from 04:59 to 05:56, at a 1-minute load of 5 to 11;
- then the one failing step ran on v11.1.0.

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

- **The WebKit failure** is "a light-390c: the wide label seat's plate is a capsule in paint",
  a `TypeError` in the spec's `plateOf` (`release-11-0-1-critic-1.spec.ts:68`).
  - On v11.1.0 the same title fails the same way, with its light-1440f sibling
    (`logs/reg-red-c1-wk.log`, 22 passed and 2 failed). This is the witness fault booked for
    11.1.2 (I, after critique 5).
  - On the tip the 1440f title passed this time.
- **radius-scale** is the one 11.1.0 spec the branch restates (`9152d3bc4`), for row 12's
  coarse-pointer corner. No spec of the earlier releases changed since critique 10.

**No title fails on the tip that passes on v11.1.0.**

### 4. Nothing removed or renamed

Holds. I packed the build gate's fresh `dist` at `ce5f320b7` with `npm pack --ignore-scripts`
(`logs/pack-tip.json`): 904 files, 3,056,513 B unpacked, equal to `.bundle-ratchet`. I read it
against the 11.1.0 registry tarball:
- **`exports`:** 70 keys on both, none removed, added or changed. In `package.json` only
  `version` differs (`logs/pack-vs-11.1.0.txt`).
- **Files:** 899 to 904, none missing. Five are added: the `exit-press` and `leave-finished`
  chunks, their declarations and `exitClock.d.ts`.
- **Declarations** (`logs/dts-vs-11.1.0.txt`): 571 to 574 files, eleven changed.
  - Each change is one of these: an addition (the `leaveFinished` emit on seven contents,
    `useExitPress` and `useLeaveFinished` in the overlay barrel, the detent engine's `size` and
    `opacity`), a reworded doc comment, or a renumbered `__VLS` local. The `default` slot is
    still declared on `SheetContent` and `Toast`.
  - `Toast.vue.d.ts` also gains `open: boolean; defaultOpen: boolean` in its defaults type,
    from `withDefaults({ open: undefined, defaultOpen: undefined })`. Both stay optional in
    `ToastProps`.
- **Names in the built CSS and JS** (`logs/names-vs-11.1.0.txt`, `classes-vs-11.1.0.txt`):
  - custom property declarations go from 1,164 to 1,171, none removed;
  - `@property` rules stay at 94;
  - keyframes go from 97 to 100, none removed;
  - class selectors stay at 652;
  - layers go from 4 to 5 (`reduced-motion`);
  - `data-` attributes go from 121 to 123 (`data-leaving`, `data-plate`);
  - custom properties written from JS go from 185 to 186, none removed.

  In `src`, the custom properties declared go from 1,129 names to 1,136, none removed
  (`logs/src-props-{red,tip}.txt`).
- **Moved values** (`logs/moved-values-vs-11.1.0.txt`):
  - `--exit-curve`;
  - `--glass-reveal-blur` and `--glass-reveal-enter-scale` lose their `--enter-overlay-*` value
    on the overlay register, which is neutral now;
  - `--reveal-exit-clock` gains bloom's exit for the menu register;
  - `--glass-level` and `--glass-veil-rung` on the firm plate;
  - `--card-fill` on a pressed Card under reduced motion;
  - `--bouncy-slider-radius` under a coarse pointer.

  The `--spring-*-exit-duration` and `--spring-*-settle` tokens are unchanged. Only
  `--exit-curve` is a public token, and the CHANGELOG names it with both values.
- **Defaults moved:**
  - the exit clocks and curve (row 3);
  - the narrow form's material and attribute (row 2). On 11.1.0 that form forced
    `data-surface="opaque"`, so no consumer chose it;
  - the reduced-motion layer and the press under reduced motion (row 8, and the ruling after
    critique 2);
  - the overlay register's entrance (the ruling after critique 1);
  - a detented Sheet's rise at its rung's size (the note on atlas's rows; open gap F).

  The CHANGELOG states each. A consumer's own `disableOutsidePointerEvents` on a Dialog or
  Sheet is still read while the surface is open (`useExitPress`).

### 5. The gates on the committed tree

Holds. Each command ran once through `guarded` on `ce5f320b7`, with no tracked file dirty,
from 03:39 to 03:42 at a 1-minute load of 10 to 12 (`logs/gates.out`):
- typecheck: exit 0;
- build: exit 0, its `glass-ui:ready` line naming all eight outputs;
- `verify:package`: exit 0, terminal `CLEAN`, 197 claims;
- `demo:dist:build`: exit 0;
- vitest `--maxWorkers=2`: exit 0, 285 files, 2,600 passed, 10 expected to fail, 1 skipped.

`.github/` is unchanged from v11.1.0, and no workflow installs or runs a browser:
- `ci.yml` and `release.yml` run `npm ci`, typecheck, build, `verify:package`,
  `demo:dist:build` and `npm test`. `npm test` is `vitest run`, whose config leaves out the
  `*.browser.test.ts` files;
- `deploy-demo.yml` runs no browser.

`scripts/release.sh` gains one step, `npm -w tests-visual run gate:exits`.

### 6. Comments added in `src`

Holds. `git diff v11.1.0 HEAD -- src` adds 1,246 lines, 287 of them comment lines
(`logs/src-added.txt`, `src-added-comments.txt`).
- **The search.** I read the comment lines whole. I searched every added line for row and
  round ids, letter-and-number ids, dates and versions, and for: tranche, critique, critic,
  seat, orchestrator, witness, scope, ruling, owner, probe, film, plant, gate and the
  consumers' names.
- **What it finds** is the code's own vocabulary: a spring preset's "row"
  (`--spring-<row>-exit-duration`), a menu row, the dock's seats (`data-glass-dock-seat`), the
  `:scope` selector, a local named `probe`, and "round" meaning around.
- **Kept ids.** The branch edited three comment blocks that keep 11.1.0's internal ids in
  their unchanged lines:
  - `glass/dissolve.css:260-262`: the branch rewrote line 260, which runs on into 11.1.0's
    "AUTH-3 row of the §PRM-AUTHORIZED-SET … `docs/tranches/BJ/…`";
  - `DropdownMenuContent.vue:81-84`: "U/B7 D-6" and "BK #66";
  - `SelectContent.vue`: "U/B7 D-6".

  No added line carries one, so item 6 holds. The 54 such ids kept in the 44 `src` files the
  branch touched are 11.1.0's (`logs/src-changed-kept-ids.txt`, open gap G).

### 7. The CHANGELOG entry

**Fails on one sentence** (defect 2). The rest holds:
- **Prose:** outward. No internal id appears. Its one em dash is in the heading, counted per
  paragraph (`logs/changelog-11.1.1.md`).
- **Sizes:** each line is exact to the byte against this seat's pack and the two registry
  tarballs (`tools/sizes.py`, `logs/sizes.txt`):
  - the dock entry: 38,673 in 11.0.2, 40,541 in 11.1.0 and 40,533 on the tip;
  - the surfaces a dock opens: `dialog` 12,508 to 14,529, `select` 8,453 to 9,517, `popover`
    8,663 to 9,385, `tooltip` 5,897 to 6,607, `menu` 11,865 to 12,555;
  - the other entries that grew past 500 B: the root entry 104,776 to 108,672, `command`
    16,804 to 18,898, `sheet` 14,306 to 16,726, `tabs` 19,091 to 20,154, `easing` 36,889 to
    37,983, `motion` 12,599 to 13,544, `toast` 5,093 to 5,879.

  No other entry grew past 500 B (`configurator` +448, `expandable-container` +436).
- **Values:**
  - `--exit-curve` was `var(--ease-out)`, that is `cubic-bezier(0, 0, 0.2, 1)`, and is now
    `cubic-bezier(0.3, 0.2, 0.7, 0.8)`.
  - The floating clocks are `clamp(0.12s, settle × 0.6, 0.25s)`. For menus and selects (bloom,
    0.37 s) that is 222 ms, for popovers (panel, 0.45 s) 250 ms, and for tooltips (present,
    0.2 s) 120 ms against a 200 ms entrance. The Dialog takes present × 1.5, 180 ms. The
    sliding Sheet rides panel, 250 ms.
  - The films agree: the exit clocks in item 2.
- **What 11.1.0 did,** as the entry states it, matches this seat's v11.1.0 films (item 2):
  the menu's held light and its last-frame cut, the popover at about 135 ms, the tooltip's
  third, and the Sheet's front-loaded slide.
- **The detented Sheet's "about 400 ms"** matches its top edge reaching the foot at 387 to
  400 ms.
- **Reduced motion:** fades of 166 to 211 ms, an ExpandableContainer's 110 to 121 ms and a
  toast's 152 to 155 ms out agree with "at most 200 ms" and "over 120 ms" within a frame of
  sampling. The `.interactive-item` sentence sits inside the paragraph that opens "With reduced
  motion turned on", and the rule it describes is in `prefers-reduced-motion: reduce` only.
- **The tooltip sentence** ("A tooltip no longer shrinks as it leaves; it still grows slightly
  as it arrives") is half untrue: defect 2.

## Defects

### 1. A Tooltip arrives with a squish that 11.1.0 never painted (item 2)

**The reading** is in item 2's table, three films a tree in each engine at 1440.
- **On the tip**, a Tooltip's first mounted frame has computed `scale: 1.0282 0.91665` and
  opacity 0. It settles to `1` over about 100 ms, while its light rises to about 0.4. Its box
  goes from 57.4 × 33.6 to 55.8 × 36.7 in Chromium, and from 56.7 × 33.6 to 55.2 × 36.7 in
  WebKit: it narrows while it grows taller.
- **On v11.1.0** the hint is scale `none` and opacity 1 from its first mounted frame. Its
  squish was on the way out, which row 6 removed.

**The cause** is two commits, `src/styles/glass/reveal.css`:
- `dae6d8b3f` keys the open state and its `@starting-style` on `[data-state$="open"]`, so a
  tooltip's `delayed-open` and `instant-open` now enter from the from-state. On 11.1.0 those
  states matched no open rule, so the hint appeared whole. That change is row 6's own cure.
- The from-state is `scale: (enter-scale × --lq-stretch-x) (enter-scale × --lq-stretch-y)`.
  `13573d28b` set the base's and the overlay register's squish to `1 1` under the ruling
  after critique 1. It restated `--lq-stretch-x: 1.06; --lq-stretch-y: 0.945` on the tooltip
  register (`reveal.css:143-144`), beside `--glass-reveal-enter-scale: var(--enter-tooltip-scale)`
  (0.97).
- The same block's comment says "A hint is all fade".

**Why it is a defect.**
- Item 2 asks for one effect per change, with nothing added for ornament. The hint's arrival
  now runs two channels, opacity and a scale whose two axes move in opposite directions.
- The ruling after critique 1 names this anisotropic scale as ornament on the overlay register
  ("an anisotropic scale … the scale go from the exit AND the entrance of that register"),
  citing the owner's "NO overuse of shading, transition, or markup".
- Row 6 asks for a tween, and the CHANGELOG's own Tooltip paragraph says it "fades in". On
  11.1.0 the arrival had no scale at all. The branch took the squish off every register but
  the one surface that never showed it on arrival, and added it there.
- None of the gate's cells reads it, which is why no critic has seen it: the tooltip films
  record opacity alone.

**Cure, in the source.** The tooltip register's from-state takes no scale: in
`.glass-reveal[data-reveal="tooltip"]`, set `--glass-reveal-enter-scale: 1` and
`--lq-stretch-x: 1; --lq-stretch-y: 1`, as the overlay and menu registers do. The hint then
enters and leaves on its fade alone, which matches its register's comment, row 6 and
11.1.0's arrival.
- `--enter-tooltip-scale` and `--enter-tooltip-blur` stay defined. They no longer shape a
  Tooltip, on either leg, and the CHANGELOG says so as it does for `--enter-overlay-scale`.
- Only the Tooltip rides this register (`ROLE_REVEAL.hint`, `_shared/overlay/content.ts:31`).
- If the orchestrator wants a slight uniform grow kept, the squish still goes, and the
  CHANGELOG states the grow as new.
- The ratchet is rebound once after the source commit.

**Witness.** The `tooltip ·` entrance and hand-over cells film the hint's computed `scale` and
assert it reads `1` (or `none`) on every frame of the entrance and the exit.
- RED on the tip as it stands: `1.0282 0.91665` on the first frame.
- GREEN after the cure, in Chromium and WebKit at 1440.
- RED on v11.1.0, as now, on the tween clause.

### 2. The CHANGELOG's tooltip sentence is untrue of 11.1.0 (item 7)

The "popover moves by fading" paragraph ends: "A tooltip no longer shrinks as it leaves; it
still grows slightly as it arrives."
- The first half is true. On 11.1.0 the exit shrank and squashed the hint (item 2's table).
- The second half says the arrival is unchanged, and it is not:
  - on 11.1.0 a Tooltip was whole from its first frame, as the entry's own "Tooltips fade in"
    paragraph says ("A tooltip appeared whole in one frame");
  - on the tip it arrives with a new squish, narrower and taller at once, which "grows" does
    not describe.

**Cure.** With defect 1 cured, the sentence says a tooltip no longer changes size as it
leaves, and that it fades in and out with no change of size. It names `--enter-tooltip-scale`
as no longer shaping a tooltip. If a uniform grow is kept by ruling, the sentence states the
grow as new on 11.1.1. The "Tooltips fade in" paragraph then stands as written.

## Open gaps (for INBOUND)

A. **Row B has no WebKit cell in the gate** (carried). Playwright WebKit's touchscreen cannot
   drag. The mouse probe reads it R/G here (1.036 on v11.1.0; 0.164 and 0.145 on the tip).
   Real Safari, or a touch drag in WebKit, is the reading that settles it.

B. **WebKit raises a ResizeObserver loop on the exits harness at 1440** (carried). The tip's
   standing part logged "ResizeObserver loop completed with undelivered notifications" three
   times, every cell passing. If its writer is `useDockMorph`'s plate observer, this harness
   is the reproduction row 13 (b) asked for first.

C. **The frost note's "it leaves at 0.02 or less"** (carried). The cell reads it as "it leaves
   at the plate's last painted value". Here that value is 0.007 to 0.058, which is the exit
   curve's own last frame: the curve's end slope is 0.2 / 0.3, so about 0.056 over twelve
   frames. By the note's words most of the twelve films fail, and the plate fails with them.
   The ruling is the orchestrator's.

D. **Row A's rise share sits near its bound at ordinary load.**
   - One of this seat's five Chromium 390 repeats read 0.196 against 0.2, at a load of 6 to 7.
     In that run the head moves 42 px in 17 ms and then 158 px in the next 18 ms. That fits a
     late callback reading a position stamped with its frame's time.
   - Of the 48 recorded rises with spread 0 in this directory (`logs/rowa-shares.txt`), two
     exceeded 0.2 (fix 7's at 0.339 and critique 8's at 0.215), both at loads of 25 and more.
   - No run has failed on the share at ordinary load. If one does, it is critique 9's class: a
     witness failing on something other than its claim.

E. **A press exactly on the button's right or bottom edge** reads distance 0 under both rules,
   while hit testing puts it outside the button (fix 11's gap A). It was not met in 3,353 taps.

F. **Rows A and B and the frost row came in after the scope closed at thirteen rows**, by
   binding notes. Row A moves a default the scope file does not name. The CHANGELOG names it
   (carried).

G. **Comments the branch edited keep 11.1.0's internal ids** in their unchanged lines:
   `dissolve.css`'s AUTH-3 row and its tranche path, and "U/B7 D-6" and "BK #66" in the
   Select and DropdownMenu contents. In all, 54 such ids remain in the 44 `src` files the
   branch touched. This is 11.1.0's comment debt, for a sweep.

H. **"its smallest honest height"** in the detented Sheet sentence is the source's word for
   the floor, not a consumer's ("its smallest height" says it).

I. **Films other than `startFilm`'s still crash on a lost page**, and what sends the reload is
   unruled (critique 10's D and E, carried).

J. **Carried from critiques 8 to 10:**
   - a long frame lengthens a reduced-motion fade by design;
   - a vetoed drag-dismiss unmounts a detented Sheet under reduced motion;
   - hover scales under reduced motion;
   - the detented Sheet's tail, mounted off-screen about 80 ms after its edge reaches the foot;
   - the `release-10-1-5-critic-*` specs, never run;
   - WebKit 390's outside-press routes, not read;
   - the frost note's normal-motion half, K1 and K2, for 11.1.2;
   - the CHANGELOG heading's date at the close.

## Owed by the fix round

Defects 1 and 2, then:
- the tooltip cells' scale read, RED on the tip as it stands, GREEN after, in Chromium and
  WebKit at 1440, with v11.1.0's reds still red;
- the ratchet rebound once after the source commit, and the size lines re-measured if
  `tooltip` or the root entry moves;
- the five gates on the committed tree, and the exits gate whole once as `release.sh` runs it.
