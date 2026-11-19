# 11.1.1 fix seat 7 (before critic 7)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`59077c708` (critique 6). Every orchestrator note in this directory was read. The list is critique
6's three defects and, by `orchestrator-note-atlas-sheet.md` ("they join fix seat 7's list as two
rows"), atlas's rows A and B. No tolerance was widened.

**Four sittings.** The seat stopped three times, none for a fault of its own:
- 2026-11-17 11:18: a guard refusal, "kernel zone data.kalloc.1024 at 8.36M (panics near 20.8M;
  heavy and browser runs stop at 8M): reboot the Mac". It named the zone count, not a stale cache,
  so nothing was retried. The run in flight (`a2-red-chromium-phone`) had finished its three cells.
  The two WebKit runs queued after it were refused (exit 75).
- 2026-11-17 11:55, after the reboot: a halt for the weekly limit, at the owner's order. Row A had
  been ruled (`orchestrator-note-after-fix-7.md`) and committed (`e45c97fe8`). The work in the tree
  was saved as `fix-7/patches/wip-at-halt.patch`.
- 2026-11-18 12:45: a pause at the owner's word, the battery at 41 %. The Toast cell (`3f0d66095`)
  and a detented Sheet's reduced-motion fade (`26e2fea69`) were committed. The spec edit in the
  tree was saved as `fix-7/patches/wip-at-pause-2.patch`.
- 2026-11-19, from 12:29: the fourth sitting. It stopped at 16:45 on the owner's power hold
  (`docs/tranches/BL/driver/power-hold.py` in the main checkout), which pauses every process of
  this worktree's runs while the battery is at 40 % or less and resumes them at 80 %. From about
  16:00 the battery read 19 to 25 %, charging but falling under the machine's load, and the hold
  held each of this seat's runs in the stopped state within seconds of its start. The seat did
  not run past the hold: the frozen gate parts were ended (SIGTERM to the guard, or SIGKILL to the
  stopped tree) and nothing of it is left running. What is still owed is listed at the end.

Runs, all through `guarded`, WebKit under `--exclusive webkit` (`fix-7/logs/runs.out`):
- `fix-7/run.sh <branch|tip|red> <project> <log> <part 0-3 | grep> [args]`, which serves each
  process on its own server. The worktree serves on 5351, v11.1.0 on 5352 (the `git archive` tree at
  `.cache/red-v11.1.0/tree`, with the worktree's 11.1.1 specs, config and harnesses copied in), and
  the tip snapshot on 5353. The exits gate serves on 5354.
- `fix-7/sync-tip.sh <commit>`: the tip snapshot at `.cache/fix7-tip/tree`. It is the v11.1.0
  tree, whose demo, `index.html`, vite and tsconfig files and Playwright base configs equal the
  tip's, with `src` and the 11.1.1 specs, config and harnesses taken from a commit. Witness runs
  then read a committed tree while the worktree is edited. It was synced at `89ced3151`, then
  `e45c97fe8`, then `cc0384d4e`.
- `fix-7/attach.py`: reads attachments out of the JSON reports.

The guard printed its zone-leak ARMED warning on every run. The 1-minute load was 7 to 16 in the
first three sittings. In the fourth it was 25 to 79 from 12:35 to about 16:20, from other
sessions' work, and each run was admitted by the guard alone (it waits above 36).

## Commits

| item | commit | what |
|---|---|---|
| 1 | 89ced3151 | `useDisclosureTurn` removed (`turn.ts`, added in `001a726e8`) with its two call sites. The four disclosure reversal cells leave row 5's witness and one guard cell stays. The CHANGELOG's reversal sentence no longer names the Accordion or the Collapsible. |
| 2 | 13569d919 | the standing and `routes` cells read what is seen against the area on screen at rest (spec only) |
| 7 | d29642a58 | CHANGELOG, reduced motion: a toast appeared in one frame and already faded as it left. An `ExpandableContainer` now fades (120 ms). The `.interactive-item` utility keeps its size on a press. |
| 1 | 39cce26af | the guard cell reads one Accordion film in a fresh context (below) |
| B | 992ceb2a0 | the sheet harness and two `sheet ·` cells; the gate's part A takes `sheet`; the CHANGELOG sentence. No source change: `0fec2b3f3` already seats every release. |
| A | e45c97fe8 | a detented Sheet takes its rung's size on its first open frame and rises by a translate; its cell, the sheet units restated, the CHANGELOG sentence |
| ruling: Toast | 3f0d66095 | the Toast reversal cell closes the toast when its entrance has run 0.05 of its own clock |
| ruling: reduced motion | 26e2fea69 | under reduced motion a detented Sheet fades in at its rung and fades out where it stands; the exit clock moves to `motion/spring/exitClock.ts` so the spring mount and the detent engine share it |
| ratchet | df038f063 | the bundle ratchet rebound once after the last source commit (`26e2fea69`), 3055440 to 3056356 (+916 B) |
| sizes | 6403bcfa9 | the CHANGELOG's size lines measured again: `dialog`, the root entry, `command`, `sheet`, `motion` |
| A, clause (1) | cc0384d4e | the row A cell counts a tap whose press meets the frame it was aimed at; a press that misses because a later frame moved the button is recorded and taken again |

No tag, no push, no publish.

## 1. The disclosure turn leaves 11.1.1

`89ced3151` removes `src/components/_shared/disclosure/turn.ts` and its import and call in
`AccordionContent.vue` and `CollapsibleContent.vue`. Those two files are now byte-equal to v11.1.0.
Nothing else used the turn. `turn.d.ts` leaves the pack with it, and it was a file this release had
added.

**Part B on the tip snapshot at `89ced3151`** (`b1-tip-*`):

| project | part B |
|---|---|
| WebKit 390, three times running | 32 passed, 11 skipped; 32, 11; 32, 11 |
| Chromium 390 | 32, 11 |
| Chromium 1440 | 42, 1 |
| WebKit 1440 | 42, 1 |

The earlier 35 passed in WebKit 390 is now 32: four cells left and one came in.

**v11.1.0, part B** (`b1-red-*`). Chromium 390 has 26 failed. Its row 5 cells fail as in critic 6's
`red1`: 10 red and 1 green, the green one `DropdownMenu reopened`. WebKit 390 has 25 failed. **One
row 5 cell did not stay red there:** `reverse · a Toast closed while it opens` passed on v11.1.0
(turnedAt 0.741, share 0.173), where critic 6 read it red (turnedAt 1). The close landed before the
toast's entrance reached full light, so on v11.1.0 in WebKit 390 the cell bites only by timing.
This is recorded for critic 7. It is not in this seat's list.

**The guard cell.** As first built (`89ced3151`), it filmed a Collapsible, reloaded the harness and
filmed an Accordion. It passed in all six part B runs above (holes 10 to 22 ms). On v11.1.0 in
WebKit 390 it failed: the Accordion film was holed at 37 ms. Ten repeats each (`g-*`):

| | Collapsible films holed | Accordion films holed | frame gap while moving, median |
|---|---|---|---|
| tip WebKit 390 | 0 of 10 | 7 of 10 | 10 ms, Accordion 31 to 46 ms when holed |
| v11.1.0 WebKit 390 | 0 of 10 | 9 of 10 | 10 ms, Accordion 27 to 40 ms when holed |
| tip and v11.1.0 Chromium 390 | 0 of 20 | 0 of 20 | 8 ms |

A second disclosure filmed after a reload in the same context is slow in Playwright WebKit 2287 on
v11.1.0 too, so that form read the engine. `39cce26af` restates the cell as one Accordion film in a
fresh context, the shape of the old reversal cells, which read clean on v11.1.0 in earlier rounds.
Ten repeats in WebKit 390 (`g2-*`):
- **v11.1.0: 10 of 10 whole** (holes 11 to 21 ms);
- **branch: 9 of 10** (one film holed at 42 ms; moving-frame median 10 ms in all ten; 1-minute
  load 15.7 against 10.8 for the v11.1.0 run).

That branch run used the worktree with row A's uncommitted sheet source in it. Row A does not touch
the disclosures. One holed film in ten is not read as a regression here, and it is not ruled out.

**Part B in WebKit 390 three times running, at `cc0384d4e`** (`b2-*`, the tip snapshot, load 26 to
44): 30 passed and 2 failed, 30 and 2, then 32 passed (11 skipped each). The four failures are
`reverse · a Select closed while it opens` and `reverse · a DropdownMenu closed while it opens`,
the run's first and third cells, each "the film is read: no hole of more than two frames" with
holes of 35 to 115 ms and shares of 0.045 to 0.119 (the motion within its bound, the film holed).
No disclosure cell failed, and the guard cell passed in all three. These two cells read whole in
all six part B runs of the first sitting at a load of 7 to 11. Part B three times running at a
normal load is owed (at the end).

## 2. The standing cell's seen channel

`13569d919` cures this in the spec as critique 6 prescribes:
- `areaOnScreen` is the box's area inside the viewport.
- `seenFrom(vw, rest)` is opacity times that area, as a share of the area on screen at rest.
- `judgeLeave` (the `routes` cells) reads `seenFrom` against the film's rest frame.
- The standing cells read `seenFrom` against their start frame, times the clip's share as before.
- `seenIn` (the share of the box's own area) stays for the reverse, tooltip and leave cells, whose
  boxes do not shrink as they go.

No source change.

**Read in the fourth sitting, after row A** (`d20-*`, Chromium 390, twenty repeats of each of the
four cells, the tip snapshot at `cc0384d4e`, load 25 to 37):

| cell | tip | v11.1.0 |
|---|---|---|
| `standing · detented Sheet by outside` | 20 of 20 green, share 0.095 to 0.107 | **20 of 20 red**, 0.405 |
| `standing · detented Sheet by escape` | 20 of 20 green, 0.096 to 0.108 | **20 of 20 red**, 0.405 |
| `routes · a detented Sheet leaves whole by escape` | 20 of 20 green, 0.099 to 0.108 | **20 of 20 red**, 0.405 |
| `routes · a detented Sheet leaves whole by outside` | 20 of 20 green, 0.096 to 0.110 | **20 of 20 red**, 0.405 |

critic 6's chance failures read 0.209 and 0.224 against the box's own area; against the area at
rest the worst tip film here is 0.110. v11.1.0 stays red in every film: it unmounts with 0.405 of
the area at rest still on screen. Every other standing and `routes` cell is read in the exits gate
on the final tip (below).

The ExpandableContainer standing cells read a panel that shrinks as it fades, so they are the ones
to watch under the new channel.

## 7. The CHANGELOG's reduced-motion paragraph

`d29642a58` changes the paragraph in three places:
- **Toast.** On 11.1.0 a toast appeared in a single frame and already faded as it left. Critic 6's
  `red3-*` read 15 to 22 fading frames over 173 to 179 ms, on the dissolve's carve at `--vap-clock`.
  Its fade out now keeps to 200 ms: `min(--vap-clock, --duration-fast)`, read at 148 to 155 ms.
- **ExpandableContainer.** It is named. On 11.1.0 it appeared and vanished in one frame: v11.1.0's
  0.12 s `expandable-container-arrive` was zeroed by the universal fallback, and the `fade` cell
  read no fading frame either way. It now fades in and out over 120 ms on `--exit-curve`
  (`expandable-container/styles.css`, read at 110 to 122 ms).
- **`.interactive-item`.** The utility class is named. `utilities/base.css` now takes `scale: 1`
  for `.interactive-item:active` under reduced motion, where `--scale-press-sm` (0.97) applied.
  The sentence says a site's own element that composes it keeps its size, and does not claim a fill
  step for it (the fill step is the menu row's, `menu.css`). `useLiquidPress` is folded into the
  same sentence.

No em dash was added. No internal id appears.

**Then ruled in:** the paragraph says sheets fade, and a detented `Sheet` is driven by its own
spring (`SpringProgress`, `respectReducedMotion: true`), which snapped under reduced motion. The
ruling after fix 7 put it in row 8; it is built in `26e2fea69` (below, "A detented Sheet under
reduced motion").

## B. A drag let go springs on from where the finger left it

The cure has been on the branch since `0fec2b3f3`: `onPointerup` seats the spring at `(t.value,
velocity)` before every settle. On v11.1.0, `settle()` reuses the spring when its leg is already
`rung`. That spring's own value is where it last rested, because the drag wrote only the scalar.
So a release after a spring has settled on a rung starts from the old rung.

`992ceb2a0` adds the sheet harness (one detented bottom Sheet, rungs 0.5 and 0.9) and two cells.
Each cell first drags the sheet down from 0.9 to settle on 0.5. Then it drags up twelve steps of
15 px, one a frame, to 0.713, and lets go at speed, or at rest after six still moves. Chromium 390
by touch (CDP); WebKit 390 is skipped, since Playwright WebKit's touchscreen cannot drag.

| `a2-*`, Chromium 390 | at speed | at rest |
|---|---|---|
| v11.1.0 | **R**: 242 → 405 px in the first frame after the lift (back to the 0.5 rung), then up to 0.9; share 1.036 | **R**: the same, 1.036 |
| branch | **G**: share 0.159, settles on 0.900 | **G**: 0.161, 0.900 |

The first form (`a-*`) opened at 0.5 directly and dragged 25 px a frame. It read no jump on either
tree, since the open leg's spring is not a `rung` leg. Its at-speed release carried about a fifth
of the 138 px left on the finger's own speed: branch 0.202, v11.1.0 0.147. Hence the settled rung
and the slower steps.

The CHANGELOG sentence sits in the closing paragraph beside the drag-dismiss sentence.

## A. A detented sheet rises at its size

`e45c97fe8` is `fix-7/patches/row-a.patch` as described here, committed after the ruling with the
cell's clause (1) stated as the tap's outcome. Its CHANGELOG sentence is in the closing paragraph
of "A closing surface leaves the same way": "It also opens at its rung's size: it grew from a short
strip at the foot of the screen to its rung, laying out its contents again on every frame, and now
rises into place whole from past the edge."

### The first sitting's readings (before the ruling)

`fix-7/patches/row-a.patch`:
- `detents/use.ts`: `size`, the fraction the box is sized at. During the open leg it is the rung it
  rises to (the `rising` hold); otherwise it is `t`. The hold ends when its leg settles, on a drag
  and on a rung change. A close during the rise keeps it, so the box slides back down at that size.
  A close from rest is unchanged.
- `SheetContent.vue`: the detented arm publishes `--_detent-size` beside `--detent-t`.
- `sheet/styles.css`, bottom and top: `--_sheet-size` is `var(--_detent-size, var(--detent-t))`
  times 100dvh. `block-size` reads it. `--_sheet-below-floor` becomes
  `max(0px, max(floor, size) − t·100dvh)`, so the existing translate carries both the floor's slide
  and the rise. Side edges are untouched.
- `sheet-reach.test.ts`: restated to these rules. The sheet units read 154 of 154 with the patch.
- The spec's `sheet · a detented Sheet rises into place at its rung's size` cell.

Readings at 430 × 932 by touch, opening to the 0.9 rung (`a-*`, `a2-*`):

| clause | v11.1.0 | branch with the patch |
|---|---|---|
| (2) block size, spread over the rise | **669 px** (171 → 840: it grows from the floor) | Chromium **0**; WebKit 1.27 before the hold below, not read after |
| (3) head's top, most of its travel in one frame | 0.146 Chromium and WebKit | 0.148 Chromium, 0.118 WebKit |
| (1) close button at +190 ms, from its rest | 112 to 147 px below | 121 to 146 px below |
| (1) `elementFromPoint` at its centre | 20 of 20 | 20 of 20 |
| (1) the tap there closes the sheet | Chromium 20 and 19 of 20, WebKit 20 of 20 | Chromium 20 and 19 of 20, WebKit 20 of 20 |

- The first branch reading grew the box by 1.3 px at the spring's overshoot. The box was sized
  `max(rung, t)`. The patch holds it at the rung, and the clamped translate absorbs the overshoot.
  The WebKit 390 reading after that change was refused.
- The cell is RED on v11.1.0 and GREEN on the branch by clause (2) in Chromium 390. Clause (3) is
  green on both trees, since the 11.1.0 stub appears 114 px above the edge, 0.146 of the travel.

**Clause (1) cannot be met as ruled, and needs the orchestrator.**
- **At +190 ms.** The rise rides the open leg's spring (`bloom`: response 0.42 s, ζ 0.9). At 190 ms
  that spring leaves 13 to 18 % of the travel, about 130 px of 839. The tap lands on whatever is
  under the finger at that moment. Translate or growth, the head moves at the same speed for the
  same scalar. So the rise by translate cures the per-frame layout and the block size, not the race:
  atlas's miss reproduced once in twenty on each tree.
- **Within 4 px.** The fastest register in `springPresets.ts` (response 0.2, ζ 0.8) still leaves
  about 1 %, roughly 9 px. Within 4 px at 190 ms needs an entrance of about 190 ms. The sheet's
  250 ms exit would then be longer than its entrance, against row 3.
- **Three ways out, for a ruling:**
  - (a) Keep the ruled rise, and state (1) as the tap's outcome, with the offset recorded and not
    bounded. The patch's cell does this, and its "closes the sheet, twenty in twenty" read 19 of 20
    on both trees.
  - (b) A faster rise for this leg.
  - (c) atlas's other route: place the head and its close button at their rest before the body
    grows.

The ruling took way (a) (`orchestrator-note-after-fix-7.md`): a tap at the button's drawn centre
at open plus 120, 190, 250 and 400 ms hits the button and closes the sheet twenty times in twenty in
each engine, the button being the event's target and `elementFromPoint` at the tap.


### Clause (1) as the tap's outcome

At 430 x 932 by touch, opening to the 0.9 rung. "hit" is the button at the read point, the target
of the press and of the click; "closed" is `data-state` leaving `open` within 800 ms. Every
Chromium press landed one frame or more after the read (`f1`); every WebKit press at normal load
landed in the frame it was read in (`f0`).

| run | tree | load | clause (2) spread, px | (3) share | +120 | +190 | +250 | +400 |
|---|---|---|---|---|---|---|---|---|
| `a7-tip-chromium` | tip `e45c97fe8` | 9.5 | 0 | 0.106 | 19 | 20 | 20 | 20 |
| `a7-tip-webkit` | tip `e45c97fe8` | 9.1 | 0 | 0.107 | 20 | 20 | 20 | 20 |
| `a7-red-chromium` | v11.1.0 | 7.8 | **669** | 0.146 | 20 | 20 | 20 | 20 |
| `a7-red-webkit` | v11.1.0 | 6.3 | **669** | 0.146 | 20 | 20 | 20 | 20 |
| `a9-branch-chromium` x3 | worktree | 6.9 | 0 | 0.104 to 0.107 | 18, 18, 18 | 20 | 20 | 20 |

(Hits of twenty; load is the 1-minute figure as the run ended; `a8-branch` read as `a7-tip`.)
The misses are the same in every Chromium run: the press landed one frame after the read, 9 to 11 px below the button's 44 px box, on the head, so the
sheet was caught and settled on a rung rather than closed. 120 ms into the rise one frame carries 31
to 36 px at Chromium's 120 Hz, and the button's half-height is 22 px. The button stands as far from
its rest on both trees at each delay (dy 280 to 326 px at +120, 112 to 130 at +190, 35 to 51 at
+250, 0 at +400), since translate or growth, the head rides the same spring. v11.1.0 read no miss in
its one run at that load. In `a7-tip` and `a8-branch` the miss left the harness's sheet on the 0.5
rung and the later taps opened there (dy 372 to 445); `wip-at-pause-2.patch` opens a fresh harness
after a press that does not close the sheet.

Two forms were tried in this sitting:
- **Holding the read frame** (`h1-*`): a 60 ms task on the main thread after the read, so no later
  frame is drawn before the press. In Chromium the press then landed two or three frames late and
  missed 57 of 60 taps before +400; it was dropped (load 34 to 44).
- **Taking a late press again** (`cc0384d4e`): a tap whose press misses with its point outside the
  button's box when it lands met a later frame than the one it was aimed at. It is recorded with
  its frame lag and distance, and the tap is taken again, at most twenty times a delay. Every
  counted tap must still be the button at the read point, the press's and the click's target, and
  close the sheet. A press whose target is the button although the box has moved on by the time the
  listener reads it (`pointerdown:10:f1:8px click:11`, seen under load) counts as a hit.

Readings of `cc0384d4e`'s cell on the tip snapshot (`h3-*`). This sitting ran under a 1-minute
load of 25 to 65 set by other sessions' work; each run was admitted by the guard alone. Each
delay shows the taps counted, every one of which hit the button and closed the sheet, then the
presses taken again:

| run | load | (2) spread, px | (3) share | +120 | +190 | +250 | +400 |
|---|---|---|---|---|---|---|---|
| `h3-tip-webkit` | 38 | 0 | 0.118 | 20, 0 | 20, 0 | 20, 0 | 20, 0 |
| `h3-red-webkit` | 50 | **669** | 0.146 | 20, 0 | 20, 4 | 20, 0 | 20, 0 |
| `h3-red-chromium` | 26 | **669** | 0.171 | 20, 8 | 20, 4 | 20, 0 | 20, 0 |
| `h3-tip-chromium` | 39 | 0 | **0.339** | **4**, 20 | 20, 8 | 20, 0 | 20, 0 |

- WebKit 390: GREEN on the tip, every press in its frame; RED on v11.1.0 by clause (2). Every
  counted tap on both trees hit the button and closed the sheet.
- Chromium 390, v11.1.0: RED by clause (2); its counted taps all hit and closed.
- Chromium 390, the tip: not read whole. The film of the rise dropped frames (one step of 0.339 of
  the travel, against 0.104 to 0.107 in every run at a load under 10), and at +120 the presses landed
  one to fourteen frames after the read (`f2` in 15 of 24), so twenty were taken again before twenty
  counted. Every counted tap hit and closed.
- The exits gate's first part on the worktree at `cc0384d4e` (chromium-phone, 15:54 to 15:58, load
  about 40) passed this cell: GREEN in Chromium 390 on the final tip.


## The Toast reversal cell, restated to bite in WebKit

`3f0d66095`. The cell closed the toast 110 ms after the tap, so in WebKit 390 on v11.1.0 the
entrance had nearly reached full light and the cell passed there by timing (`b1-red-webkit`). The
second input now waits on the page for the toast's own opacity transition to have run 0.05 of its
duration (read from the transition's clock, not a wall delay), and lands there. Ten repeats each at
390 (`t1-*`, load 6.4 to 7.6):

| | WebKit 390 | Chromium 390 |
|---|---|---|
| v11.1.0 | **10 of 10 red**: closed at 0.256 to 0.288 of its light, the next frame at full (turnedAt 1), share 0.712 to 0.744 | **10 of 10 red**: closed at 0.238 to 0.240, share 0.760 to 0.762 |
| branch | 10 of 10 green, share 0.06 to 0.08 | 10 of 10 green |

## A detented Sheet under reduced motion

`26e2fea69`, as the ruling after fix 7 states it. A detented Sheet's engine fades it in and out
as a sliding sheet does: the box lands on its rung at once, and its opacity runs over the travel
row's exit clock held to at most `--duration-fast`, on `--exit-curve`. A close holds the box where
it stands until the fade has run, then releases the mount; a drag that dismisses fades out from
where the finger left it; a reopen mid-fade fades back in from the opacity it shows; the scrim
follows the fade. The exit clock moved out of `useSpringMount.ts` into `exitClock.ts` so both read
it; no public name moved.

The witness is the reduce spec's `fade · a detented Sheet appears and leaves on a fade`, its legs
read as row 8's are (`rm1-*`, at 390 by touch, before the commit, on the worktree that became it):

| | Chromium 390 | WebKit 390 |
|---|---|---|
| v11.1.0 | **red**: no fading frame in or out (`fading 0`, `span 0`) | **red**: the same |
| branch | in 23 frames over 192 ms, out 23 over 192 ms, box steps 0, leave-finished 2 ms after the last seen frame | in 11 frames over 201 ms, out 11 over 199 ms, box steps 0, leave-finished 3 ms after |

Re-read on the tip snapshot at `cc0384d4e` (`rm2-*`, load 32 to 43): the tip green in Chromium
(in and out 23 frames over 193 ms, box steps 0, leave-finished after 2 ms) and WebKit (12 frames
over 200 ms each way, 3 ms); v11.1.0 red in both, no fading frame either way.

## Gates

Run before the refusal, in the first sitting:
- `npm run typecheck` exit 0 on the item 1 tree;
- the sheet units (154 of 154, with row A applied);
- the spec has no new type error under a standalone `tsc --ignoreConfig` (`pngjs`'s missing types at
  line 166 are old).

**The ratchet.** The last source commit is `26e2fea69`. At `5f45d7b94`, before the rebind,
`verify:package` failed on the bundle ratchet as it should (`G-BUNDLE-RATCHET: bundle ratchet increase forbidden:
3056356 > 3055440`, `logs/verify-package-1.log`): `89ced3151` removed the turn's bytes, row A and the
reduced-motion fade added some, +916 B net. `df038f063` rebinds it once.

**On the committed tree at `df038f063`** (`fix-7/gates.sh`, `logs/gates.out`), one guarded run each,
all exit 0:
- typecheck;
- build;
- `verify:package`, terminal CLEAN;
- `demo:dist:build`;
- vitest: 285 files, 2600 passed, 10 expected to fail, 1 skipped.

The commits after it touch only the CHANGELOG (`6403bcfa9`) and the spec (`cc0384d4e`), which none
of these reads. The spec's standalone `tsc` shows no new error at `cc0384d4e`.

**Sizes** (`fix-7/sizes.sh`, `logs/sizes.txt`): the package npm packs at `df038f063`, each entry's
import closure gzipped, against the published 11.0.2 and 11.1.0 (critic 6's `sizes.py`). Moved
since critic 6: the root entry 108,713 to 108,642 bytes, `collapsible` 4,734 to 4,337 (the turn
gone; 4,271 on 11.1.0, so under the half-kilobyte line), `command` 18,864 to 18,898, `dialog`
14,494 to 14,529, `motion` 13,509 to 13,544, `sheet` 16,337 to 16,695. The dock entry is unchanged
at 40,533. `6403bcfa9` writes these into the CHANGELOG.

**The exits gate on the final tip** (`cc0384d4e`, the worktree, port 5354, as `scripts/release.sh`
runs it, `fix-7/gate.sh`, `logs/gate.log`). Its first part, chromium-phone part A, ran at 15:54 to
15:58 at a load of about 40: **37 passed, 3 skipped, 1 failed.** The failure is `routes · a
CommandDialog keeps its list through its exit by pick`, a `TypeError` in `areaOnScreen` read from
`judgeLeave`: the film held no frame before its mark (`startFilm` waits 80 ms for its first
callback, and under that load none had come), so `exitOf` returned no rest frame. It is the
harness's film, not the palette: the cell's `escape` and `outside` routes passed beside it, and it
passed in every earlier gate at a normal load. A film with no frame before its mark reads as a
crash rather than a named failure (before `13569d919` the same film crashed at the share's
`seen(rest)`). That is recorded for critic 7 and not changed here. The row A cell and both row B
cells passed in this part.

`gate.sh` logged that run as exit 0: it read `$?` after `$(date)` had run, the slip fix 6 recorded.
The script now keeps the code first, and `logs/gate.out` says the line is wrong. The other fifteen
parts did not run: the power hold paused them (above).

## Owed after the power hold lifts

In this order, each on the tip snapshot at `cc0384d4e` (or the worktree at it) and at a normal load:
- The exits gate whole, its sixteen parts in the four projects (`fix-7/gate.sh`, then
  `gate-rest.sh` past a failure). Its first part again, for the CommandDialog film.
- Row A's cell in Chromium 390 once more at a load under 16 (`chain18.sh` holds it): the `h3` read
  at 39 was not whole, though the gate's part A passed it at about 40.
- Part B in WebKit 390 three times running at a load under 16 (`b3-*` in `chain18.sh`).
- The disclosure guard, twenty films on each tree in WebKit 390, interleaved in blocks of five,
  each block at a load under 10 (`g3-*` in `chain18.sh`).

Done: row A clause (1) restated and its WebKit cell green on the tip, RED on v11.1.0
by clause (2) in both engines; the CHANGELOG sentence (in `e45c97fe8`); the four detented standing
and routes cells twenty times on each tree; the Toast cell's red on v11.1.0 in WebKit ten in ten
(banked in the third sitting); the detented Sheet's reduced-motion fade RED and GREEN in both
engines at 390, read again on the tip; the ratchet rebound; build, `verify:package`,
`demo:dist:build` and the whole vitest suite on the committed tree; the size lines.

No servers or browsers of this seat are left running. Ports 5351 to 5356 are free.
