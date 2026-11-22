# 11.1.1 critique 12

Critic: claude-opus-5-5. Fable is out of quota until 2026-11-21, so this seat runs on Opus by
the orchestrator's ruling. It is a fresh seat and built nothing on the branch.

**Tip read:** `97b6e324a` on `release/11.1.1`. Its source last changed at `10c8e23c9` (the
tooltip register), its specs at `10c8e23c9`, its CHANGELOG at `56af37693` and its ratchet at
`7b653a25d`; `97b6e324a` is fix seat 12's record. Since critique 11 (`ce5f320b7`'s source and
specs) the branch changed `src/styles/glass/reveal.css`, `release-11-1-1.spec.ts`,
`release-11-1-1/film.ts`, the CHANGELOG and `.bundle-ratchet`, and nothing else outside `docs/`.
I read every orchestrator note in this directory (fourteen), `critique-11.md`, `fix-12.md`, the
scope file in the main checkout and `git log v11.1.0..release/11.1.1`.

**How it ran.** One sitting, 2026-11-22 07:23 to 10:00, at a 1-minute load of 5 to 17.
- Every run went through `guarded`, WebKit under `--exclusive webkit`, on ports 5351 to 5356.
  The guard refused nothing. It printed its zone warning (armed, a warning only) on every call.
- One heavy run at a time, in three chained scripts (`critic-12/chain.sh`, `chain2.sh`,
  `chain3.sh`); run lines in `critic-12/logs/runs.out`, the earlier specs' lines in `logs/chain.txt`.
- **The v11.1.0 tree** (`critic-12/trees.sh`, built at 07:24 before any server of this seat):
  a `git archive v11.1.0` without `docs/` (17 MB; nothing the build or a spec reads lives
  there) at `.cache/critic12-v11.1.0/tree`, with HEAD's 11.1.1 specs, config and harnesses
  copied in (hashes equal, `logs/redspecs-{red,head}.sha`). Its `src` and `demo` equal
  v11.1.0's, 863 blobs for 863 (`logs/red-src-demo.{v1110,tree}.blobs`). Its `node_modules`
  links each entry to the worktree's, with its own `@mkbabb` workspace link and its own Vite
  cache.
- The published 11.1.0 and 11.0.2 tarballs were fetched for this seat; their sha-1 equal
  `npm view`'s (`2180c51d…`, `b425a414…`).
- Scripts in `critic-12/`, readers in `critic-12/tools/` (critics 3 to 11's, copied, and this
  seat's `channels2.py`), probes in `probe-tip/` (critic 11's tooltip scale probe) and
  `probe-rowb/` (critic 10's row B mouse probe), both unchanged, `probe-gestalt/` (this
  seat's: every surface's entrance and one exit, filmed with computed scale, transform and
  filter) and `r1015/` (this seat's runner for the release-10-1-5 critic and fix specs). The
  earlier specs' own output in `logs/out/` stays uncommitted, as critics 10 and 11 left theirs.
- Left in `.cache`: this seat's v11.1.0 tree (`critic12-v11.1.0`, 28 MB, HEAD's specs at
  `97b6e324a`) and the three unpacked packages (`critic12-pub`, 19 MB). Their readings are
  banked; the removal was refused by the shell's safety check, so they wait for the owner or
  the next seat. Nothing of this seat runs, and ports 5351 to 5356 are free.

**Verdict: ready to tag, from this list.** All seven items hold, each read twice, and no
defect stands. Critique 11's two defects are cured: the tooltip register's scale, squish and
blur are neutral (`10c8e23c9`), so a hint comes and goes by its fade alone, RED on v11.1.0 and
GREEN on the tip in all four projects; and the CHANGELOG's tooltip sentence now says so
(`56af37693`). The close still owes what it always owed: the CHANGELOG heading's date.

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

Holds.

**How it was read.**
- The exits gate's sixteen parts ran on the tip as `gate.sh` splits them
  (`logs/tip-<project>-<part>`), from 07:27 to 07:59 at a 1-minute load of 7 to 14; then on
  this seat's v11.1.0 tree (`logs/red-<project>-<part>`) from 07:59 to 08:38.
- **On the tip every part exits 0**, with fix seat 12's counts:

| project | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 38 + 3 skipped | 33 + 11 skipped | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 28 + 13 skipped | 43 + 1 skipped | 44 | 18 |
| WebKit 390 | 25 + 16 skipped | 33 + 11 skipped | 27 + 17 skipped | 16 + 2 skipped |
| WebKit 1440 | 28 + 13 skipped | 43 + 1 skipped | 44 | 18 |

- `tools/matrix.py` tabulates each title on both trees (`logs/matrix.txt`, `matrix-why.txt`):
  147 titles in four projects. **384 readings are RED on v11.1.0 and GREEN on the tip, 112
  green on both and 92 skipped on both. None fails on the tip**, and no reading on either
  tree is a timeout, an interruption or a missing report.
- **Against critique 11's matrix** four lines differ:
  - the new title, `tooltip · a hint keeps its size as it comes and goes`, R/G in all four
    projects;
  - three no-regression reads that fell RED on v11.1.0 here by timing and were green there:
    a DropdownMenu reopened while it closes (Chromium 1440, share 0.22), the Dialog's
    standing cell by close (Chromium 1440, 0.204) and by an outside press (Chromium 390,
    0.211). Each is green on the tip in every project, as before.
- **RED on v11.1.0.** Every part fails there in every project, 15 to 37 cells a part. I read
  every failure's first line, grouped: "no frame carries (or takes) more than a fifth" (127),
  "in: the fade spans at least two frames" (50 and 4 on the unfold), "one event" (40), "no
  frame after the turn moves more than a fifth" (29), "the exit follows the exit curve" (12),
  "more than two frames between whole and gone" (12), "the list is mounted while the plate is
  seen" (11), "it is open again" (11), "form on every exit frame" (8), "the plate blurs its
  backdrop" (8), "it turns short of the end it was heading for" (8), and smaller groups. None
  is a crash, a timeout or a lost film. The eight precondition failures critique 11 named
  (the Tooltip turn cells' "the second input lands mid-motion", ExpandableContainer's "the
  reopen lands mid-exit") fail the same way here.
- **Each row has R/G cells in every project it can run in** (`logs/families.txt`), with the
  skips critique 11 listed (rows 1, 2, 12, A, the lift and row B at 390 only; the press cell
  not in WebKit 390; row 1's outside and trigger routes and 14 standing routes not in WebKit
  390). All 92 skips on the tip carry one of the spec's stated reasons.
- **The tooltip cure** (`10c8e23c9`), read twice:
  - the new cell passes in all four projects on the tip. Its `size` attachments read, on
    every mounted frame of both legs, scale deviation 0, box deviation 0 and no filter; the
    entrance's first frame is opacity 0 at scale `1` (55.8 × 36.7 in Chromium 1440, 55.2 ×
    36.7 in WebKit 1440, 50 × 33.8 and 49.5 × 33.8 at 390), with 18 to 25 frames between
    gone and whole; the hint is gone at the film's end;
  - on v11.1.0 the new cell fails in all four projects on "it arrives from gone": its first
    frame is opacity 1 at scale `none`. That is row 6's fault, and the cell's own scale clause
    is not reached there; fix seat 12 read it RED on clause 3 at `ce5f320b7` (the squish), so
    the clause bites on the tree that had the fault;
  - re-read against the films: critic 11's tooltip probe, unchanged, three films a tree in
    each engine at 1440 (`logs/tt-{tip,red}-{cd,wd}`, `tools/tooltip.py` →
    `logs/tooltip-films.txt`). On the tip every entrance frame is scale `1` at the resting
    box, opacity 0 to 1, and every exit frame scale `1` at the resting box, opacity 1 to 0. On
    v11.1.0 the entrance is opacity 1 at scale `none` from its first frame, and the exit
    squashes to about `1.016 0.952` (Chromium) and `1.020 0.942` (WebKit) as it loses a
    third or more of its light in its first frame.
- **Row A** in the gate: Chromium 390 passed (spread 0, share 0.118, 80 aimed taps hit and
  closed, 6 late at 120 ms re-taken, no aimed miss); WebKit 390 passed (spread 0, share 0.115,
  80 taps, none late). Three more runs on the tip in Chromium 390 (`logs/rowa-tip-cp`, 09:37
  to 09:43, load 7): 3 of 3, shares 0.110 to 0.121, 11 late taps all at 120 ms and 10 to 25 px
  out, no aimed miss.
- **Row B** has no WebKit cell in the gate (Playwright WebKit's touchscreen cannot drag).
  Critic 10's mouse probe, unchanged, on both trees in WebKit 390 (`logs/rowb-{tip,red}-wp`):
  shares 0.160 at speed and 0.139 at rest on the tip; 1.036 for both on v11.1.0, the sheet
  jumping from 242 to its rung in one frame.
- **The frost row** (`tools/frost.py`, part D): in all twelve films (three Sheets, four
  projects) the frost layer enters from 0, reads its plate's opacity on every mounted frame
  (gap 0) and leaves at the plate's last painted value, 0.003 to 0.029.

### 2. The motion rows' frame tables

Holds. Read from the tip's sixteen part reports with critics 3 and 5's readers (`tools/sum.py`
→ `logs/sum-tip.txt`, `steps5.py` → `steps5-tip.txt`, `standing.py` → `standing-tip.txt`,
`turns.py`, `unread.py`, `exitclock.py`, `legs.py`, `frost.py`, `detent_close.py`), then re-read
against the frames they name:
- **No frame carries more than a fifth.** Leaving out the disclosure guard, the most any
  16.7 ms window carries is 0.180 (a Collapsible closed by its trigger, standing, Chromium
  390; 11.1.0's own disclosure motion). All 156 standing readings pass, the largest at 0.177.
- **No cut at the start.** The largest first moving sample is 0.120 (an ExpandableContainer's
  entrance, WebKit 1440).
- **No last-frame step.** The largest last moving sample is 0.063 (a Tooltip leaving, WebKit
  1440: the exit curve's end slope over a 12 ms frame).
- **No hole.** The longest gap between two samples of a moving table is 18 ms, and no reverse
  film was set aside as unread (`logs/unread-tip.txt`).
- **No overshoot.** No sample runs against its leg's direction outside the turn cells and the
  disclosure guard. The turn films (`logs/turns-tip.txt`) turn where the second input found
  them, with shares of 0.030 to 0.158.
- **The only consecutive steps over a fifth** are the `weight` cell's item positions (a list
  of boxes, not motion) and the disclosure guard's reopen (0.33 to 0.40 in one window: the
  region drops to 0 and opens again, 11.1.0's behaviour, which the ruling after fix 6 keeps).
  The one opacity step from 1 to 0 in a film is a detented Sheet's unmount, about 470 ms
  after its close, its top edge already at the foot for some 70 ms.
- **The exit clocks** at 1440 (`logs/exitclock-tip.txt`): a Select and a DropdownMenu lit to
  219 to 226 ms, a Popover to 249 to 253, a Tooltip to 119, a Dialog to 185 to 191, the
  sliding Sheets to 253 to 265; first steps 0.019 to 0.063.
- **A detented Sheet's close** (`tools/detent_close.py`): under 1 % shows at 336 to 347 ms, its
  top edge at the foot at 387 to 400 ms, unmounted at 469 to 482 ms.
- **Under reduced motion** (`logs/legs-tip.txt`): no box steps in any leg; the surfaces' fades
  span 170 to 205 ms over 17 to 26 frames, an ExpandableContainer's 111 to 123 ms, a toast's
  fade out 146 to 153 ms and a tooltip's 114 to 118 ms; a site's own fade keeps its 132 to
  143 ms; the dock's fold and the run mark cross-fade with no travel.

**The gestalt.** The films now carry each frame's computed `scale`, `transform` and `filter`.
The gate's standing, turn and exit cells attach only their `[ms, value]` tables, and of the
films the parts attach whole only the routes films carry the new fields (27 of 60;
`logs/channels2-tip.txt`). So this seat filmed every surface itself: `probe-gestalt/`, one
entrance and one exit for each of the eighteen surfaces (the exits harness's, the
CommandDialog, and the leave harness's hover card and ContextMenu at 1440), on both trees in
all four projects, 09:47 to 09:56, every run green (`logs/gestalt-{tip,red}-<project>`). This
seat's `tools/channels2.py` (critic 4's table with scale and filter added) reads them into
`logs/gestalt-channels.txt`. On the tip, the same in all four projects:

| surface | in | out |
|---|---|---|
| Select, DropdownMenu, plain Select, ContextMenu | its clip grows from the trigger's strip, at full light | its clip draws in as it fades; at 390 a Select's sheet form slides past the foot as it fades |
| Popover, hover card | 8 px of slide and a fade | the same, reversed |
| Tooltip | a fade | a fade |
| Toast | a fade | the dismissal's own release: its ink blurs to 12 px (390) or 14 px (1440) as it fades |
| Sheet (four sides) | its slide | its slide |
| detented Sheet | a translate from past the foot, at its rung's size | its box shrinks to the floor and the floor slides on |
| Collapsible, Accordion | its height, at full light | its height, at full light |
| ExpandableContainer | scale 0.78 to 1 with a fade | scale to 0.78 with a fade |
| Dialog, CommandDialog | scale 0.95 to 1, a 3 to 11 px drop, a fade | the same, reversed |

- **Against v11.1.0** (the same probe): the Popover and the hover card entered and left with
  a squish (`0.996 0.888`) and a 1 to 2 px blur, the Tooltip arrived whole and left with its
  squish, the Toast's box grew from 44 to 50 px tall and moved 4 px as it arrived, a
  detented Sheet grew its box on the way in and stopped half on screen on the way out, and
  an ExpandableContainer left in one frame. The Dialog's three channels and the Toast's
  blurred release are the same on both trees.
- **Nothing the branch added is there for ornament.** Every surface it touched moves on one
  effect plus its fade, or on its fade alone. The two exceptions are 11.1.0's, unchanged: the
  Dialog's three channels (booked for 11.1.2, C after critique 5) and the Toast's release
  (11.1.0's dismissal recipe; open gap I).
- A detented Sheet's fill alpha drifts between 0.18 and 0.20 through both legs on both trees;
  no reader can see it.
- Under reduced motion nothing travels and each surface fades in place (part D, above).

### 3. The earlier release specs

Holds. The specs ran on `97b6e324a` in Chromium (headless-new) and WebKit 2287, using critic
11's step list unchanged (`critic-12/reg-inner.sh`, `logs/chain.txt`): one guarded call per
engine, Chromium from 08:38 to 09:04 and WebKit from 09:04 to 09:35, at a 1-minute load of 6
to 17; then the one failing step on v11.1.0.

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

- **The WebKit failures** are "a light-1440f" and "a light-390c: the wide label seat's plate
  is a capsule in paint", each a `TypeError` in the spec's `plateOf`
  (`release-11-0-1-critic-1.spec.ts`). On v11.1.0 the same two titles fail the same way
  (`logs/reg-red-c1-wk.log`, 22 passed and 2 failed, 09:36). This is the witness fault booked
  for 11.1.2 (I, after critique 5).
- **radius-scale** is the one earlier spec the branch restates (`9152d3bc4`, row 12's
  coarse-pointer corner, 12 px to 22 px under a coarse pointer); it was RED on v11.1.0 on that
  arm, its biting plant. No other earlier spec changed since v11.1.0 (`git diff` of
  `release-10-1-5*`, `release-11-0-*`, `ro-loop*` and `release-10-1-3*` is empty).

**No title fails on the tip that passes on v11.1.0.**

The release-10-1-5 critic and fix specs (32 files, never run by critics 8 to 11) were begun in
WebKit 2287 on the tip (`r1015/`, `logs/r1015-tip-wk.log`). The set is 582 tests; the first
seven (critic 1's dock postures, overflow, type and menu, fine and coarse, and the slider
rungs) passed, at about 35 s for each dock posture title. At that pace the set would hold the
machine-wide WebKit lock for hours and pass the guard's 85-minute cap, so I stopped my run by
its PID at 176 s (exit 143) and leave the set to a run split by file (open gap K).

### 4. Nothing removed or renamed

Holds. I packed the build gate's fresh `dist` at `97b6e324a` with `npm pack --ignore-scripts`
(`logs/pack-tip.json`): 904 files, 3,056,459 B unpacked, equal to `.bundle-ratchet`. Against
the 11.1.0 registry tarball:
- **`exports`:** 70 keys on both, none removed, added or changed. In `package.json` only
  `version` differs (`logs/pack-vs-11.1.0.txt`).
- **Files:** 899 to 904, none missing; the five added are the `exit-press` and
  `leave-finished` chunks, their declarations and `exitClock.d.ts`.
- **Declarations** (`logs/dts-vs-11.1.0.txt`): 571 to 574 files, eleven changed, byte for byte
  the reading critique 11 made (additions, reworded doc comments, renumbered `__VLS` locals).
- **Names in the built CSS and JS** (`logs/names-vs-11.1.0.txt`): custom property
  declarations 1,164 to 1,171, none removed; `@property` 94 to 94; keyframes 97 to 100, none
  removed; class selectors 651 to 651; layers 4 to 5 (`reduced-motion`); `data-` attributes
  121 to 123; custom properties written from JS 185 to 186, none removed. In `src`, 1,129
  declared names to 1,136, none removed (`logs/src-props-{red,tip}.txt`).
- **Moved values** (`logs/moved-values-vs-11.1.0.txt`): critique 11's list, and now the tooltip
  register's two: `--glass-reveal-enter-scale` and `--glass-reveal-blur` no longer read
  `--enter-tooltip-scale` and `--enter-tooltip-blur`. The register's squish (`1.06 0.945`)
  leaves the reveal; it stays in `.liquid-enter`, which no exit surface wears.
- **Defaults moved:** critique 11's list (the exit clocks and curve; the narrow form's
  material and attribute; the reduced-motion layer and the press under reduced motion; the
  overlay register's entrance; a detented Sheet's rise at its rung's size), and the tooltip
  register's entrance and exit, now a fade with no scale. That last is row 6's tween under
  the owner's "NO overuse of shading, transition, or markup", the ruling after critique 1
  carried to the tooltip register by the orchestrator's line to fix seat 12 (recorded in
  `fix-12.md`, not in a note here). The CHANGELOG states each.

### 5. The gates on the committed tree

Holds. Each command ran once through `guarded` on `97b6e324a`, with no tracked file dirty,
from 07:24 to 07:27 at a 1-minute load of 8 to 14 (`logs/gates.out`):
- typecheck: exit 0;
- build: exit 0, its `glass-ui:ready` line naming all eight outputs;
- `verify:package`: exit 0, terminal `CLEAN`, 197 claims, the roster `PRESENT` (292 of 292);
- `demo:dist:build`: exit 0;
- vitest `--maxWorkers=2`: exit 0, 285 files, 2,600 passed, 10 expected to fail, 1 skipped.

`.github/` is unchanged from v11.1.0. `ci.yml` and `release.yml` run `npm ci`, typecheck,
build, `verify:package`, `demo:dist:build` and `npm test` (`vitest run`, whose config leaves
out `*.browser.test.ts`); `deploy-demo.yml` runs no browser. `scripts/release.sh` gains one
step, `npm -w tests-visual run gate:exits`.

### 6. Comments added in `src`

Holds. `git diff v11.1.0 HEAD -- src` adds 1,249 lines (`logs/src-added.txt`). I searched every
added line for row and round ids, letter-and-number ids, dates and versions, and for:
tranche, critique, critic, seat, orchestrator, witness, scope, ruling, owner, probe, film,
plant, gate and the consumers' names. What it finds is the code's own vocabulary: the dock's
seats (`data-glass-dock-seat`), `seatSpring`, the `:scope` selector, a local named `probe`.
`10c8e23c9`'s three comment edits in `reveal.css` say what the code does ("Every register
holds it at `1 1`"; "A hint is all fade: it keeps its size and its focus both ways").

### 7. The CHANGELOG entry

Holds.
- **Prose:** outward. No internal id. Its one em dash is in the heading
  (`logs/changelog-11.1.1.md`, counted per paragraph).
- **The tooltip sentence** (`56af37693`): "A tooltip now fades in and out with no change of
  size; it used to shrink and squash as it left. `--enter-tooltip-scale` and
  `--enter-tooltip-blur` are still defined, but they no longer shape a tooltip." True of
  both trees' films (item 1), and the two tokens are the two moved values (item 4). The
  "Tooltips fade in" paragraph ("A tooltip appeared whole in one frame") agrees with
  v11.1.0's first frame.
- **Sizes:** each line is exact to the byte against this seat's pack and the two registry
  tarballs (`tools/sizes.py`, `logs/sizes.txt`, identical to critique 11's): the dock entry
  38,673, 40,541 and 40,533; `dialog` 12,508 to 14,529, `select` 8,453 to 9,517, `popover`
  8,663 to 9,385, `tooltip` 5,897 to 6,607, `menu` 11,865 to 12,555; the root entry 104,776 to
  108,672, `command` 16,804 to 18,898, `sheet` 14,306 to 16,726, `tabs` 19,091 to 20,154,
  `easing` 36,889 to 37,983, `motion` 12,599 to 13,544, `toast` 5,093 to 5,879. No other entry
  grew past 500 B (`configurator` +448, `expandable-container` +436). The tooltip cure moved
  CSS only, and no JS closure.
- **Values:** `--exit-curve` from `var(--ease-out)` (`cubic-bezier(0, 0, 0.2, 1)`) to
  `cubic-bezier(0.3, 0.2, 0.7, 0.8)`; menus and selects about 220 ms, popovers 250, tooltips
  120, a dialog about 180, a sheet 250, a detented Sheet about 400; each matches item 2's
  clocks.
- **Reduced motion:** "at most 200 ms", "an ExpandableContainer over 120 ms" and "a toast's
  fade out keeps to 200 ms" agree with item 2's spans within a frame of sampling.

## Defects

None.

## Open gaps (for INBOUND)

A. **Row B has no WebKit cell in the gate** (carried). Playwright WebKit's touchscreen cannot
   drag. The mouse probe reads it R/G here (1.036 on v11.1.0; 0.160 and 0.139 on the tip).
   Real Safari, or a touch drag in WebKit, is the reading that settles it.

B. **WebKit raises a ResizeObserver loop on the exits harness at 1440** (carried). On both
   trees, three "ResizeObserver loop completed with undelivered notifications" lines in the
   standing part, around the DropdownMenu's and the plain Select's cells, every cell passing;
   the gestalt probe met one between its DropdownMenu and plain Select films on both trees.
   No dock is on screen in those cells, so the writer may not be `useDockMorph`'s observer.

C. **The frost note's "it leaves at 0.02 or less"** (carried). The cell reads "it leaves at
   the plate's last painted value": here 0.003 to 0.029, 4 of 12 films above 0.02, the plate's
   own last frame on the exit curve. By the note's words the plate fails with its frost layer.
   The ruling is the orchestrator's.

D. **A Tooltip on the phone form opens only by keyboard focus** (fix seat 12's gap A). The new
   size cell drives focus and Escape at 390; a touch has no Tooltip route to read.

E. **The ruling that took the tooltip register's scale and blur** is recorded in `fix-12.md`
   as the orchestrator's line to fix seat 12, not in an orchestrator note here, as the
   overlay register's is (the note after critique 1).

F. **Rows A and B and the frost row came in after the scope closed at thirteen rows**, by
   binding notes; row A moves a default the scope file does not name. The CHANGELOG names it
   (carried).

G. **Comments the branch edited keep 11.1.0's internal ids** in their unchanged lines
   (carried): `dissolve.css`'s AUTH-3 row and its tranche path, "U/B7 D-6" and "BK #66" in the
   Select and DropdownMenu contents, and "U/B7 G1-7" in `tabs/styles/segmented.css:74`, whose
   block row 12 extended.

H. **A stale comment table in `tokens/motion-registers.css:21-25`.** It still calls blur "the
   dominant overlay channel" and lists the tooltip register for "tooltip/hover-card" with a
   0.97 scale-from, while the reveal now reads no scale or blur on any register and the hover
   card rides the overlay register. Not added by the branch, so outside item 6.

I. **The Toast's dismissal blurs its ink to 12 px at 390 and 14 px at 1440** as it fades
   (11.1.0's vaporize recipe, unchanged; `glass/dissolve.css`). It is the one exit left with
   a filter channel. Whether it stands under "an exit is short and plain" is the owner's call.

J. **README's "A surface reopened during its exit turns back from where it is"** names a
   toast among the surfaces, while the spec skips a Toast reopened mid-exit ("a dismissed
   toast is not reopened") and its exit is the dismissal's keyframes. The cells witness the
   reopen turn for a Popover, a tooltip and a DropdownMenu, and by a trigger press for a
   Dialog, a Sheet and a Select. The leave cell also leaves out the Toast's Vue emit (the
   harness keys emits by a test id the toast lacks); `useLeaveFinished` fires the emit and
   the DOM event from one `finish()`, and the DOM event is witnessed once.

K. **The release-10-1-5 critic and fix specs** (582 WebKit tests in 32 files): this seat ran
   the first seven, all green, and stopped (item 3). They want a run split by file, each in
   its own guarded call, on both trees. They write their readings into tracked files: the
   seven tests rewrote `docs/release-10.1.5/critic-1/webkit/*.json` (seven files), which I
   restored from HEAD after this record's first commit, so a run of them on a tree under
   review must restore those files after it.

L. **"its smallest honest height"** in the detented Sheet sentence is the source's word for
   the floor (carried).

M. **Films other than `startFilm`'s still crash on a lost page**, and what sends the reload is
   unruled (carried).

N. **Carried from critiques 8 to 11:** a long frame lengthens a reduced-motion fade by
   design; a vetoed drag-dismiss unmounts a detented Sheet under reduced motion; hover scales
   under reduced motion; the detented Sheet's tail, mounted off-screen about 70 to 80 ms after
   its edge reaches the foot; WebKit 390's outside-press routes (row 1's outside and trigger
   routes, 14 standing routes), not read; a press exactly on the close button's right or
   bottom edge; the frost note's normal-motion half, K1 and K2, for 11.1.2; the CHANGELOG
   heading's date at the close.
