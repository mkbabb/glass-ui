# 11.1.1 critique 9

Critic: claude-opus-5-5. Fable is out of quota until 2026-11-21, so this seat runs on Opus by
the orchestrator's ruling. It is a fresh seat and built nothing on the branch.

**Tip read:** `9bc9a7ccc` on `release/11.1.1`. Its source and specs last changed at `d61228a78`
and its CHANGELOG at `fa2ffa8f6`. I read every orchestrator note in this directory (thirteen,
the frost note among them), `fix-9.md`, `critique-8.md`, the scope file in the main checkout
and `git log v11.1.0..release/11.1.1`.

**How it ran.** One sitting, 2026-11-21, 18:31 to 21:15, at a 1-minute load of 5 to 22.
- Every run went through `guarded`, with WebKit under `--exclusive webkit`, on ports 5351 to
  5356. The guard refused nothing. It held the WebKit runs for the lock other sessions held.
- The v11.1.0 tree is this seat's own: a `git archive v11.1.0` at
  `.cache/critic9-v11.1.0/tree`, with HEAD's 11.1.1 specs, config and harnesses copied in
  (hashes equal, `critic-9/logs/redspecs-{red,head}.sha`).
  - Its `node_modules` is a clone of the earlier red tree's. That tree's lockfile equals
    v11.1.0's byte for byte.
  - Its dev server serves its own `src`: the `@glass` alias resolves from the tree's root.
- Scripts are in `critic-9/`. The logs are in `critic-9/logs/` and the readers in `critic-9/tools/`.

**Verdict: not ready to tag.** Three defects:
1. **The exits gate stopped by chance on the tip.** Row 9's reversal cell crashed once in the
   gate's Chromium 390 part B: `window.__film` was gone when `stopFilm` read it, a
   `TypeError`, not a failure by name. It then passed 33 times running. The cause is not found.
   `release.sh` stops on it.
2. **The frost cell does not bite on the fault its note was written for.** It drops the note's
   "it leaves at 0.02 or less", which the tip cannot meet: the plate's own last step is up to
   0.032. But the clause put in its place reads the gap only on frames where the frost layer is
   mounted. A planted frost layer that goes in one frame from half its light, while its plate
   is still fading, passes 12 of 12 films in Chromium 390 and WebKit 390.
3. **One CHANGELOG sentence is untrue for a detented Sheet.** "Sheet close on the same curve
   ... a sheet in 250 ms": a detented Sheet closes on its spring and takes about 400 ms to reach
   the foot.

Items 2 to 6 hold. Defects 1 and 2 do not implicate the source: each is a witness that can pass
or fail on something other than its claim. Defect 3 is prose.

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

Does not hold whole. Every row's witness is R/G, but row 9's reversal cell crashed once on the
tip (defect 1), and the frost cell does not bite on a frost layer that leaves before its plate
(defect 2).

**How it was read.**
- The exits gate's sixteen parts ran as `gate.sh` splits them, on the tip
  (`logs/tip-<project>-<part>`), carrying on past a failure.
- Then all sixteen ran on this seat's v11.1.0 tree, the standing part included
  (`logs/red-<project>-<part>`).
- `tools/matrix.py` tabulates each title on both trees (`logs/matrix.txt`, `matrix-why.txt`):
  146 titles in four projects. Of the readings, 379 are RED on v11.1.0 and GREEN on the tip, 112
  green on both, 92 skipped on both, and one red on both.

| project | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 38 + 3 skipped | 31 + 11 skipped + **1 failed** (defect 1) | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |
| WebKit 390 | 25 + 16 skipped | 32 + 11 skipped | 27 + 17 skipped | 16 + 2 skipped |
| WebKit 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |

- **RED on v11.1.0.** Every part fails there in every project, 15 to 35 cells a part. I read
  every failure's first line. None is a crash. Each fails on its claim ("no frame carries more
  than a fifth", "the fade spans at least two frames", "the exit follows the exit curve", "it
  is open again", "one event") or on a mid-motion precondition that v11.1.0's own fault breaks.
  For example, a Tooltip appears whole, so its turn lands at 1, and an ExpandableContainer is
  gone before the reopen.
- **Cells green on both trees.** Each is a no-regression read that the spec or the record
  names:
  - `form` at 1440: the desktop form has no sheet;
  - the compact SegmentedTabs strip;
  - solid under reduced transparency;
  - `reverse · a DropdownMenu reopened`;
  - the disclosure guard;
  - ExpandableContainer's entrance and first-frame Escape;
  - the Slider held still;
  - the "says nothing" halves of the leave event;
  - the standing cells of the Sheets, the Dialog's close button and the disclosures.
- **Each row has R/G cells in every project it can run in.**
  - Rows 1, 2, 12 and A, the lift and row B run at 390 only.
  - Row 6 runs at 1440 only: a Tooltip does not open on touch.
  - The press cell skips WebKit 390, which has no held touch.
  - Row 1's outside-press and trigger routes skip WebKit 390. Its touchscreen tap reaches no
    outside listener (`TABLE.md`, "WK outside: harness").
- **Row B in WebKit 390.** The gate skips it, since Playwright WebKit's touchscreen cannot
  drag. Critic 8's mouse probe, unchanged (`probe/rowb.probe.ts`), passes on the tip with
  shares of 0.155 at speed and 0.198 at rest. It fails on v11.1.0 at 1.036 both ways
  (`logs/rowb-{tip,red}-wp`). The tip's 0.198 at rest sits at the bound. It comes from WebKit's
  uneven callbacks (at 67 and 72 ms) across one 39 px stretch. The largest change between two
  samples is 20 px of 158, or 0.127 (open gap A).
- **The frost note's row** (`d61228a78`) is R/G in all four projects (part D):
  - On the tip, the frost layer reads the plate's opacity on every mounted frame (gap 0 in 12
    of 12 films). It enters from 0 and fades over 19 to 26 frames in 189 to 205 ms.
  - On v11.1.0, the plate fails its own fade first, and the frost layer enters at 1 and is gone
    by the first frame after Escape (`tools/frost.py` over `logs/{tip,red}-*-3.json`).
  - The cell does not assert the note's "it leaves at 0.02 or less". The tip's frost layer
    leaves at 0.003 to 0.032, above 0.02 in 6 of 12 films, because the plate's own last
    painted step is that size. That is fix 9's reading, confirmed. But the clause the cell has
    in its place passes a frost layer that goes in one frame from half its light while the
    plate still fades. A planted tree shows it: 12 of 12 films green (defect 2).
- **Row 9's reversal cell** (`expand · an ExpandableContainer reopened while it leaves turns
  from where it is`) crashed on the tip in the gate's Chromium 390 part B (defect 1). It then
  passed 30 of 30 alone and in three more whole passes of part B, at a load of 9. On v11.1.0 it
  fails on its claim, 11 of 11.

### 2. The motion rows' frame tables

Holds. Read from the tip's sixteen part reports with critic 3's and critic 5's readers
(`logs/sum-tip-{chromium,webkit}.txt`, `steps5-tip-chromium.txt`):
- **No frame carries more than a fifth.** Leaving out the disclosure guard, the most any
  16.7 ms window carries is 0.176 in Chromium and 0.173 in WebKit, both in standing cells.
- **No last-frame step.** The largest last moving sample is 0.051, in Chromium 390 and 1440.
- **No cut at the start.** The largest first moving sample is 0.112, outside the turn cells.
  The largest of all is 0.162, the first sample after an `ExpandableContainer`'s reopen.
- **No unscaled step over a fifth** between two consecutive samples of any motion table, except
  the disclosure guard's. The "weight" cell's box tables also trip the reader, but they list
  item positions, not motion.
- **No sample against its leg's direction** outside the turn cells, and **no overshoot** in an
  exit table.
- **The frost layer under reduced motion** reads the plate's value on every mounted frame in
  all twelve tip films (gap 0). It leaves at the plate's last painted value, 0.003 to 0.032.

**The gestalt** is one effect per change, each surface's own (`tools/channels.py` over parts A
in Chromium 390 and WebKit 1440):
- a dock Select at 390 fades as it slides down past the edge (y 615 to 841). At 1440 it fades,
  with 11 px of travel on a pick (A, booked for 11.1.2);
- a dock DropdownMenu fades in place, its material held;
- a menu's clip draws in as it fades;
- a Popover fades with 8 px of travel;
- a sliding Sheet slides on its curve;
- a detented Sheet's top edge goes down without a break, from its rung to past the edge. Its
  box shrinks to the floor and the floor then slides, which reads as one motion. Its fill alpha
  drifts from 0.200 to 0.184 on the way, which cannot be seen.
- A CommandDialog fades with a few per cent of scale and an 11 px drop. These are the Dialog's
  three channels, already on 11.1.0 and booked for 11.1.2 (C, after critique 5).
- Under reduced motion nothing travels. Each surface fades in place, and a Sheet's frost layer
  fades with its plate.

The disclosure guard's film cuts: on a reopen the region drops from about 0.3 to 0.4 to 0 in
one frame, then opens again from 0. That is 11.1.0's behaviour, which the ruling after fix 6
keeps for 11.1.1.

### 3. The earlier release specs

Holds. The specs ran on `9bc9a7ccc` in Chromium (headless-new) and WebKit 2287, with critic 6's
step list (`reg-inner.sh`, `logs/chain.txt`), one guarded call per engine:

| spec | Chromium | WebKit |
|---|---|---|
| release-10-1-5, part A / part B | 84, 23 | 84, 23 |
| release-11-0-1: owner, daraksha, fix 2, critic 2 | 9, 2, 14, 9 | 9, 2, 14, 9 |
| release-11-0-1 critic 1 and 1b | 24 | 22 + **2 failed** |
| release-11-0-2 with slider-forced-colors | 57 | 54 + 3 skipped |
| release-11-0-2 on coarse touch / on WebKit 2311 | 37 + 17 skipped | 51 + 3 skipped |
| ro-loop (11.1.0) | 4 | 4 |
| release-10-1-3 (restated in 11.1.0) | 60 | 58 + 2 skipped |
| radius-scale (restated on the branch), Chromium and coarse touch | 64 | not matched |

- **The two WebKit failures** are "a light-1440f: the wide label seat's plate is a capsule in
  paint" and the same at light-390c. Both throw `TypeError: Cannot read properties of null` in
  the spec's `plateOf` (`release-11-0-1-critic-1.spec.ts:68`). The same two titles fail the same
  way on v11.1.0 in this sitting (`logs/reg-red-c1-wk.log`). They are the witness fault booked
  for 11.1.2 (I, after critique 5).
- **radius-scale is the one 11.1.0 spec the branch restates** (`9152d3bc4`). I read it both ways
  (`radius.sh`):
  - 11.1.0's own radius-scale spec, run on the tip, fails only "a SegmentedTabs strip wider
    than 20rem is a bar" at coarse touch, light and dark (expects 12 px, reads 22 px). That is
    row 12's cure. The other 62 titles pass.
  - The branch's restated spec, run on v11.1.0, fails the same two titles (expects 22 px,
    reads 12 px). So the restatement bites.

**No title fails on the tip that passes on v11.1.0.**

### 4. Nothing removed or renamed

Holds.

**What was read.** The build gate's fresh `dist` at `9bc9a7ccc`, packed by `npm pack
--ignore-scripts` (`logs/pack-tip.json`): 904 files, 3,056,513 B unpacked, equal to
`.bundle-ratchet`. It was read against the 11.1.0 registry tarball, fetched for this seat (sha-1
`2180c51d…`, equal to `npm view`'s), with critic 8's readers copied to `tools/`.
- **`exports`:** 70 keys on both, none removed, added or changed. In `package.json` only
  `version` differs (`logs/pack-vs-11.1.0.txt`).
- **Files:** none missing. Five added: the `exit-press` and `leave-finished` chunks, their
  declarations, and `exitClock.d.ts`.
- **Declarations:** 571 to 574 files, eleven changed (`logs/dts-vs-11.1.0-plus.txt`). Every
  change is an addition, a reworded doc comment (`ModalScrim`, the detent engine,
  `useLiquidPress`) or a renumbered `__VLS` local.
  - The additions are the `leaveFinished` emit on seven contents, `useExitPress` and
    `useLeaveFinished` from the overlay barrel, and the detent engine's `size` and `opacity`.
  - `Toast.vue.d.ts` also gains `open: boolean; defaultOpen: boolean` in its defaults type,
    from `withDefaults({ open: undefined, defaultOpen: undefined })`. Both props stay
    optional. At run time an absent `open` is now `undefined` where Vue's boolean cast made it
    `false`. reka's `useForwardProps` forwards a prop only when it was passed or has a defined
    default, so `ToastRoot` receives what it received on 11.1.0.
- **Names in the built CSS and JS** (`logs/names-vs-11.1.0.txt`, `classes-vs-11.1.0.txt`):
  - custom property declarations 1,164 to 1,171, none removed;
  - `@property` 94 to 94;
  - keyframes 97 to 100, none removed;
  - class selectors 652 to 652;
  - layers 4 to 5 (`reduced-motion`);
  - `data-` attributes 121 to 123 (`data-leaving`, `data-plate`);
  - custom properties written from JS 185 to 186, none removed.

  In `src`, custom properties declared go from 1,114 to 1,118, none removed.
- **Moved values** (`logs/moved-values-vs-11.1.0.txt`):
  - `--exit-curve`;
  - `--glass-reveal-blur` and `--glass-reveal-enter-scale`, neutral on the overlay register;
  - `--reveal-exit-clock`;
  - `--glass-level` and `--glass-veil-rung` on the firm plate;
  - `--card-fill` on a pressed Card under reduced motion;
  - `--bouncy-slider-radius` under a coarse pointer.

  Each is described in the CHANGELOG. Only `--exit-curve` is a public token, and it is named
  with both values.
- **Defaults moved:**
  - the exit clocks and curve (row 3);
  - the narrow form's material and attribute (row 2);
  - the reduced-motion layer and the press under reduced motion (row 8 and the ruling after
    critique 2);
  - the overlay register's entrance (the ruling after critique 1);
  - a detented Sheet's rise at its rung's size (the orchestrator's note on atlas's rows,
    outside the scope file; open gap D).

  The CHANGELOG states each.

### 5. The gates on the committed tree

Holds. Each command ran once through `guarded` on `9bc9a7ccc`, with no tracked file dirty, at a
1-minute load of 10 to 14 (`logs/gates.out`):
- typecheck: exit 0;
- build: exit 0;
- `verify:package`: exit 0, terminal `CLEAN`, 197 claims;
- `demo:dist:build`: exit 0;
- vitest `--maxWorkers=2`: exit 0, 285 files, 2,600 passed, 10 expected to fail, 1 skipped.

`.github/` is unchanged from v11.1.0. `ci.yml` and `release.yml` run `npm ci`, typecheck, build,
`verify:package`, `demo:dist:build` and `npm test`, and install no browser. `deploy-demo.yml`
runs no browser. `scripts/release.sh` gains one step, `npm -w tests-visual run gate:exits`.

### 6. Comments added in `src`

Holds. `git diff v11.1.0 HEAD -- src` adds 1,246 lines, 287 of them comment lines
(`logs/src-added.txt`, `src-added-comments.txt`). Read whole, and searched for row and round
ids, letters-and-number ids, `K4b`-style ids, dates, versions, tranche, critique, critic, fix
seat, orchestrator, witness, scope, ruling, owner, probe, film and the consumers' names. The
search finds nothing but CSS keyframe names.
- The two comments `d61228a78` adds describe the code: one opacity "which the plate and its
  frost sampler both take", and "The frost sampler takes the plate's fade."
- `glass/dissolve.css` keeps an internal pointer: `docs/tranches/BJ/...` and the "AUTH-3 row".
  Both are context lines from 11.1.0. The branch's added sentence leads into them but adds no
  id of its own. The branch removed the dated "BK register wave" bracket beside them (open
  gap F).

### 7. The CHANGELOG entry

Holds except for one sentence (defect 3).

- **Prose.** It is outward prose. No internal id appears, and its one em dash is in the heading
  (`logs/changelog-11.1.1.md`, counted per paragraph). "Seat" appears only as the dock's own
  word.
- **Sizes.** Each line is exact to the byte against this seat's pack and the two registry
  tarballs (`logs/sizes.txt`). The 11.0.2 tarball's sha-1 equals `npm view`'s.
  - The dock entry: 38,673, then 40,541, then 40,533.
  - `dialog` 12,508 to 14,529, `select` 8,453 to 9,517, `popover` 8,663 to 9,385, `tooltip`
    5,897 to 6,607 and `menu` 11,865 to 12,555.
  - The root entry 104,776 to 108,672, `command` 16,804 to 18,898, `sheet` 14,306 to 16,726,
    `tabs` 19,091 to 20,154, `easing` 36,889 to 37,983, `motion` 12,599 to 13,544 and `toast`
    5,093 to 5,879.
  - No other entry grew past 500 B: `configurator` +448 and `expandable-container` +436.
- **Values against the built CSS.**
  - `--exit-curve` was `var(--ease-out)`, that is `cubic-bezier(0, 0, 0.2, 1)`. It is now
    `cubic-bezier(0.3, 0.2, 0.7, 0.8)`.
  - The floating clocks are `clamp(0.12s, settle × 0.6, 0.25s)`:
    - menus and selects (bloom, 0.37 s) 222 ms;
    - popovers (panel, 0.45 s) 250 ms;
    - tooltips (present, 0.2 s) 120 ms.

    The Dialog takes 1.5 times the present row's exit, 180 ms. Each is shorter than its
    entrance. The films agree: a Dialog's exit read 187 to 200 ms and a sliding Sheet's 260 to
    274 ms in the four projects.
  - `glass-reveal-out` lost its 60 % stop. The two recede keyframes lost their 90 % hold.
    `glass-reveal-hold` paints nothing.
  - Under reduced motion, the toast's dissolve takes `min(var(--vap-clock),
    var(--duration-fast))`. An `ExpandableContainer` fades over 0.12 s. The press rules for
    `.interactive-item` and the menu row sit inside `prefers-reduced-motion`.
- **One sentence is untrue for a detented `Sheet`** (defect 3): "`Dialog` and `Sheet` close on
  the same curve, faster than they open (a dialog in about 180 ms, a sheet in 250 ms)".

## Defects

### 1. Row 9's reversal cell crashed on the tip, and the gate stopped by chance

**The reading.** The exits gate's Chromium 390 part B on `9bc9a7ccc`, at a load of 14 to 15
(`logs/tip-chromium-phone-1.log`), failed one cell:

```
expand · an ExpandableContainer reopened while it leaves turns from where it is (4.6s)
Error: page.evaluate: TypeError: Cannot set properties of undefined (setting 'stop')
    at stopFilm (tests-visual/release-11-1-1/film.ts:130:17)
```

`window.__film` was gone when `stopFilm` read it, 1.2 s after the turn. The window had lost the
film that `startFilm` set, and `markFilm` and `markTurn` had both found it. No other cell
failed. The cell's 4.6 s is its usual length, and the dev server logged no reload. The harness,
and nothing it mounts, call a `location` navigation or a `history` method.

**Re-read.**
- 30 of 30 green alone, with traces kept for failures (`logs/diag-expand-tip-cp`).
- Three more whole passes of part B green (`logs/partB-tip-cp-{1,2,3}`).
- On v11.1.0 it fails on its claim, "the reopen lands mid-exit", 10 of 10 (`logs/diag-expand-red-cp`).

So it is 1 failure in 34 runs, and no trace of the failing run exists. No earlier record in
this directory holds the error. This seat does not name its cause.

**Why it is a defect.** `release.sh` runs `gate.sh` under `set -e`, so this one crash stops the
release. It is the class critique 8's defect 2 was: a witness that fails by chance, and here
fails by a crash rather than by name.

**Cure, in the spec.**
- `stopFilm` fails by name when the page no longer holds its film ("the page lost its film:
  it navigated or reloaded").
- The film records the page's main-frame navigations (`page.on("framenavigated")`) and the
  page's console, so the next occurrence names its cause.
- If the cause is a reload, find and cure what sends it. A retry does not cure it.

**Witness.** The cell green whole in part B three times running in each project, and the
gate whole once as `release.sh` runs it. v11.1.0's reds stay red on their claim.

### 2. The frost cell does not bite on a frost layer that leaves before its plate

**What the note binds.** The frost note's witness: on every frame the frost layer is present,
its opacity is within 0.02 of the plate's; "It leaves at 0.02 or less and enters from 0.02 or
less."

**What the cell asserts** (`release-11-1-1-reduce.spec.ts`, `judgeFrost` and the `frost`
block):
- the frost layer is filmed;
- the gap to the plate, read only on frames where the frost layer is mounted, is at most 0.02;
- its own leg passes the fade judge;
- it enters from 0.02 or less.

`frost.out.last` is kept in the attachment but not asserted. A frost layer that unmounts while
its plate is still at half its light gives no gap reading after it goes. Its own leg is then a
monotone fall with enough fading frames inside 200 ms. So the cell passes it.

**The plant.** I made a tree of HEAD (`.cache/critic9-plant/tree`) with one change, so that a
closing Sheet's frost span unmounts once the fade falls below 0.5:
`v-if="haloPresent && !(fade !== null && !dialogRoot.open.value && fade < 0.5)"`. I ran the three
frost cells there twice each (`plant.sh`, `logs/plant-frost-{cp,wp}`).
- Chromium 390: 6 of 6 green. The frost layer leaves at 0.503 to 0.532, and the plate fades on
  to 0.003 to 0.032 for about 100 ms more.
- WebKit 390: 6 of 6 green. The frost layer leaves at 0.506 to 0.557.

This is the fault the note was written for: a frost slab that goes in one frame while its
plate is visible. Read as written, the note's clause fails all twelve planted films.

**Fix 9's reading, confirmed.** The clause as written cannot hold on the tip either. The frost
layer's last value equals the plate's last painted value, 0.003 to 0.032, above 0.02 in 6 of 12
of this seat's tip films:
- WebKit 390: 3 of 3;
- WebKit 1440: 2 of 3;
- Chromium 390: 1 of 3;
- Chromium 1440: 0 of 3.

So the bound reads the plate's frame phase, and fix 9 was right to drop the absolute number.
What it put in its place does not keep the clause's purpose, and no ruling was asked for.

**Cure, in the spec.** The out leg also asserts that on every frame the plate is mounted, the
frost layer is too: the frost layer's last mounted frame is not before the plate's. With the
existing gap, the frost layer then leaves at the plate's last painted value. The orchestrator
states that reading in place of "0.02 or less". No bound moves and no source changes.

**Witness.** The plant RED in Chromium 390 and WebKit 390. The tip GREEN in four projects, three
times each. v11.1.0 RED.

### 3. The CHANGELOG's Sheet clock is untrue for a detented Sheet

"`Dialog` and `Sheet` close on the same curve, faster than they open (a dialog in about 180 ms,
a sheet in 250 ms)" names every Sheet. A detented Sheet does not close on the exit curve. Under
normal motion its engine settles the scalar to 0 on the travel leg's spring
(`sheet/detents/use.ts:213-231`; `LEG_PRESET.travel` is `bloom`).
- In this seat's films (`routes · a detented Sheet leaves whole by escape`, four projects), a
  detented Sheet shows under 1 % of itself 343 to 355 ms after Escape. Its top edge reaches the
  foot at 398 to 409 ms.
- A sliding Sheet's exit runs 260 to 274 ms. A detented Sheet's rise settles at about 410 ms.

"Faster than they open" barely holds, at about 400 ms against about 410 ms. "On the same curve"
and "in 250 ms" do not hold.

**Cure, in the prose.** Say that the 250 ms is a Sheet without detents, and that a detented
Sheet slides off on its own spring in about 400 ms. No code changes: atlas's row A keeps the
close as it is.

## Open gaps (for INBOUND)

A. **Row B has no WebKit cell in the gate.** Playwright WebKit's touchscreen cannot drag, so
   the spec skips WebKit 390. The note names both engines at 390 by touch. Critic 8's mouse
   probe reads R/G here, but the tip's at-rest share is 0.198 against 0.2. Real Safari, or a
   touch-drag path in WebKit, is the reading that settles it.

B. **WebKit raises a ResizeObserver loop on the exits harness at 1440, on both trees.** The plain
   Select's standing cells (pick, outside, Escape) log "ResizeObserver loop completed with
   undelivered notifications" three times on the tip and three times on v11.1.0
   (`logs/tip-webkit-desktop-2.log`, `red-webkit-desktop-2.log`). The cells pass and do not read
   page errors.
   - Row 13 (b) was left for 11.1.2 on fix 2's reading that the loop does not reproduce on
     glass's demo (`/` and `/dock/overview`).
   - This harness seats a GlassDock and raises one in WebKit 2287. This seat does not name its
     writer. If the writer is useDockMorph's plate observer, this is the reproduction row 13 (b)
     asked for first.

C. **A detented Sheet's close is a spring, not the exit curve.** It takes about 400 ms to reach
   the foot, against its rise's 410 ms. Scope row 3 asks for "Dialog and Sheet exits on the
   same family, shorter than their entrances". Whether a detented Sheet's close joins the exit curve is a scope
   question. atlas's row A keeps the close as it is. Defect 3 asks only that the CHANGELOG say
   so.

D. **Rows A and B and the frost row came in after the scope closed at thirteen rows**, by
   binding notes (carried from critiques 7 and 8). Row A moves a default the scope file does
   not name. The CHANGELOG names it.

E. **Carried from critique 8:**
   - a long frame lengthens a reduced-motion fade by design (its A). Every fade in this seat's
     runs was over within 205 ms;
   - the two vitest cells that race load (its B). This seat's one full run was green;
   - a vetoed drag-dismiss unmounts a detented Sheet under reduced motion;
   - hover scales under reduced motion;
   - the detented Sheet's tail: its last 1 % takes about 50 ms to reach the foot, and it stays
     mounted off-screen for about 70 ms more;
   - the `release-10-1-5-critic-*` specs, never run;
   - the 11.1.2 bookings, and the CHANGELOG heading's date at the close.

F. **`glass/dissolve.css` keeps 11.1.0's pointer to a tranche document** and its "AUTH-3 row".
   These are context lines, not added ones.

G. **The frost note's normal-motion half, K1 and K2** are 11.1.2 by the note.

## Owed by the fix round

Defects 1 to 3, then:
- the exits gate whole as `release.sh` runs it;
- the frost cells with the plant, RED, and the tip, GREEN, in four projects;
- the five gates on the committed tree if a spec or source file moves;
- no ratchet change unless source bytes move.
