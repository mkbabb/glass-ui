# 11.1.1 fix seat 7 (before critic 7)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`59077c708` (critique 6). Every orchestrator note in this directory was read. The list is critique
6's three defects and, by `orchestrator-note-atlas-sheet.md` ("they join fix seat 7's list as two
rows"), atlas's rows A and B. No tolerance was widened.

**The run stopped on a guard refusal.** At 11:18:05 `guarded` refused this seat's next browser runs:
"kernel zone data.kalloc.1024 at 8.36M (panics near 20.8M; heavy and browser runs stop at 8M):
reboot the Mac". The refusal names the zone count, not a stale cache, so nothing was retried. The
run in flight (`a2-red-chromium-phone`) had finished its three cells and its report is whole. The
two WebKit runs queued after it were refused (exit 75). Every reading below was taken before
11:18:05. Row A is held as a patch, and the witnesses marked "owed" need a reboot first.

Runs, all through `guarded`, WebKit under `--exclusive webkit` (`fix-7/logs/runs.out`):
- `fix-7/run.sh <branch|tip|red> <project> <log> <part 0-3 | grep> [args]`, which serves each
  process on its own server. The worktree serves on 5351, v11.1.0 on 5352 (the `git archive` tree at
  `.cache/red-v11.1.0/tree`, with the tip's 11.1.1 specs, config and harnesses copied in), and the
  tip snapshot on 5353.
- `fix-7/sync-tip.sh <commit>`: the tip snapshot at `.cache/fix7-tip/tree`. It is the v11.1.0
  tree, whose demo, `index.html`, vite and tsconfig files and Playwright base configs equal the
  tip's, with `src` and the 11.1.1 specs, config and harnesses taken from a commit. Witness runs
  then read a committed tree while the worktree is edited. It was synced at `89ced3151`.
- `fix-7/attach.py`: reads attachments out of the JSON reports.

The guard printed its zone-leak ARMED warning on every run. The 1-minute load was 7 to 16.

## Commits

| item | commit | what |
|---|---|---|
| 1 | 89ced3151 | `useDisclosureTurn` removed (`turn.ts`, added in `001a726e8`) with its two call sites. The four disclosure reversal cells leave row 5's witness and one guard cell stays. The CHANGELOG's reversal sentence no longer names the Accordion or the Collapsible. |
| 2 | 13569d919 | the standing and `routes` cells read what is seen against the area on screen at rest (spec only) |
| 7 | d29642a58 | CHANGELOG, reduced motion: a toast appeared in one frame and already faded as it left. An `ExpandableContainer` now fades (120 ms). The `.interactive-item` utility keeps its size on a press. |
| 1 | 39cce26af | the guard cell reads one Accordion film in a fresh context (below) |
| B | 992ceb2a0 | the sheet harness and two `sheet ·` cells; the gate's part A takes `sheet`; the CHANGELOG sentence. No source change: `0fec2b3f3` already seats every release. |
| A | **not committed** | `fix-7/patches/row-a.patch` (`git apply` clean on `992ceb2a0`). See row A below. |

The tracked tree is clean at `992ceb2a0`. No tag, no push, no publish.

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

**Owed:** part B in WebKit 390 three times running with the restated cell, the second part of the
ruling's witness.

## 2. The standing cell's seen channel

`13569d919` cures this in the spec as critique 6 prescribes:
- `areaOnScreen` is the box's area inside the viewport.
- `seenFrom(vw, rest)` is opacity times that area, as a share of the area on screen at rest.
- `judgeLeave` (the `routes` cells) reads `seenFrom` against the film's rest frame.
- The standing cells read `seenFrom` against their start frame, times the clip's share as before.
- `seenIn` (the share of the box's own area) stays for the reverse, tooltip and leave cells, whose
  boxes do not shrink as they go.

No source change.

**Owed, not run (refused):**
- the two standing and the two `routes` detented cells, twenty repeats each in Chromium 390 on the
  tip and on v11.1.0;
- every other standing and `routes` cell's verdict in the four projects, against critic 6's
  `tip{0,2}` and `red{0,2}`.

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

**Open, not in this seat's list:** the paragraph says sheets fade. A detented `Sheet` is driven by
its own spring (`SpringProgress`, `respectReducedMotion: true`), which snaps under reduced motion. A
detented sheet very likely appears and leaves in one frame there. The reduce spec reads only the
plain sheets. `fix-7/probe/rm.probe.ts` is the reading, written and not run (refused). atlas's
O-400 books the detented drawer's reduced-motion cut for 11.1.2.

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

## A. A detented sheet rises at its size: built, read in part, not committed

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

The patch is not committed, because clause (1) needs the ruling and the WebKit 390 reading after
the hold, the exits gate and the ratchet could not be run. Reduced motion was not read: the spring
snaps, so the sheet appears at its rung's size in one frame, as before; see item 7's open note.

## Gates and what is owed after the reboot

Run before the refusal:
- `npm run typecheck` exit 0 on the item 1 tree;
- the sheet units (154 of 154, with row A applied);
- the spec has no new type error under a standalone `tsc --ignoreConfig` (`pngjs`'s missing types at
  line 166 are old).

Owed:
- The ruling on row A clause (1). Then the patch, its WebKit 390 cell, its CHANGELOG sentence, and
  the standing and `routes` detented cells after it, as critique 6 asks.
- Item 2's witness (above).
- Part B in WebKit 390 three times running with the restated guard cell.
- The exits gate on the final tip, all four parts in the four projects.
- `npm run build`, `verify:package`, `demo:dist:build` and the whole vitest suite on the committed
  tree.
- The bundle ratchet, rebound once after the last source commit. `89ced3151` removed source bytes,
  and row A will add some.
- The CHANGELOG's size lines, measured again (`critic-6/pack.sh`, `sizes.py`). The collapsible
  entry carried the turn: 4,734 bytes at critique 6 against 4,271 on 11.1.0. Accordion code
  sits in the root entry, so its line moves too.

No servers or browsers of this seat are left running. Ports 5351 to 5356 are free.
