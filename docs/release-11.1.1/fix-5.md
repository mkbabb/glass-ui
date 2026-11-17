# 11.1.1 fix seat 5 (before critic 5)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`31845914a` (critique 4). Every orchestrator note in this directory was read. Two bind this seat's
work beyond the defect list: the note after critique 2 (the press ruling: under reduced motion a
pressed control shows its press as the fill step alone, for every control that scales on press)
and the dock-size note (no change may grow the dock entry; a CHANGELOG line for an entry past
0.5 KB gzipped). Nothing outside the four defects was built. No tolerance was widened.

Runs: `fix-5/run.sh <branch|red> <project> <log> <grep> [playwright args]` (and `run.sh <tree>
radius <log>` for radius-scale), the probes by `fix-5/probe/run.sh`. Two trees: the branch on port
5351 and v11.1.0 at `.cache/red-v11.1.0/tree` on 5352; a red run copies the 11.1.1 specs, config,
harnesses and `radius-scale.spec.ts` into that tree first. Every run went through `guarded`, WebKit
under `--exclusive webkit`. **The guard refused nothing** and logged no lock wait; through the gate
it printed its zone-leak ARMED warning, which is a warning only. The 1-minute load was 5 to 9
through the readings. Every run is listed in `logs/runs.out`; the reads are `att.py`, `turns2.py`
and `holes.py` beside it.

Cells: chromium-phone (390 × 844, touch), chromium-desktop (1440 × 900, mouse), webkit-phone and
webkit-desktop (Playwright WebKit 2287). R = red, G = green.

## Commits

| defect | commit | what |
|---|---|---|
| 2 | 9152d3bc4 | radius-scale reads a wide SegmentedTabs strip's coarse-pointer corner as 22 px, a capsule |
| 3 | 8e72e127c | under reduced motion a glass Button's plate takes one rung more of its veil ink while pressed; a menu or select row keeps its size and takes the plate one rung above its highlight; the `press` cell reads a menu row, the fill and the paint |
| 1 | 353ee2cc8 | a turn is read on the frame clock; a film with a hole is unread and filmed once more |
| — | 91ffa8fb7 | `.bundle-ratchet` 3054566 to 3054903 (+337 B), once, after the last source commit |
| 3, 4 | 006aa351e | CHANGELOG: the seven keyframes, the Dialog's page press, the Button's and the row's fill |

## 1. The reopen cells fail by chance in WebKit at 390

**Cause** (critique 4's reading, confirmed here). `judgeTurn` read the turn's start from the last
sample stamped before `markTurn`, a call-time mark taken before the test sent the input. Across a
stall that sample was 40 to 100 ms old, so "the second input lands mid-motion" read 0.965 or 0.977
while the region turned near 0.1, and a stalled film could equally hide a one-frame cut, since
`worstFrameShare` scales a change across a hole down to one frame.

**Cure** (353ee2cc8), as the defect states it.
- *The start on the frame clock.* `markTurn` arms a capture listener (pointerdown, pointermove,
  mousedown, mousemove, touchstart, keydown, click); the first input event the page takes stamps
  `turnFrame`, the number of frames filmed before it. The turn is read from `frames[turnFrame - 1]`,
  the last frame painted before the page took the input, and the read's frames are ms from it. A
  film that saw no second input throws, by name. `film.turn` (the call-time mark) is unchanged for
  the ExpandableContainer cells, which this defect does not name.
- *A film with a hole is unread.* `hole` is the longest gap between two samples from the last frame
  before the first input (`film.mark`) to the frame where the surface reaches the end the second
  input sent it to (above 0.95 open, below 0.02 gone; past that the tail holds at most 0.05 of the
  travel, which cannot carry a fifth). Above two frames at 60 Hz (33.3 ms) the film is attached as
  `unread` and the cell films once more from a freshly loaded page; a second holed film fails the
  cell with "the film is read: no hole of more than two frames…", not with a verdict on the row.
- `judgeTurn` became `readTurn` (the read), `filmAndReadTurn` (film, re-film, attach) and
  `expectTurn` (the same five assertions as before, unchanged bounds). The three reverse cell
  families pass their whole setup as the film, so the second film starts from `openHarness`.

**Readings.**

| run | tree | result |
|---|---|---|
| every reverse cell once, four projects (`rev-branch-*`, `revF-branch-chromium-*` on the final file) | branch | **G**: 15 + 2 skipped at 390, 17 at 1440, both engines. Two Chromium 1440 Select films (`closed while it opens`) read unread at a 38 and 39 ms hole and read green on the second film |
| the four disclosure cells, `--repeat-each=20`, WebKit 390 (`rev20-branch-webkit-phone`) | branch | 69 passed, **11 failed, every one as unread**: a reopen cell whose first and second films both held a 38 to 90 ms hole. Every film that was read is green (all 40 "closed while it opens", 29 of 40 reopen) |
| the same, `--repeat-each=10` (`rev10-red-webkit-phone`) | v11.1.0 | **R 40 of 40**, every one on the row's claim (turns at 0 or touches 1, or a frame over a fifth), no film unread, no hole over 22 ms |
| the reopen cells, Chromium 390 (`revF-red-chromium-phone`) | v11.1.0 | **R 2 of 2** (turnedAt 0, share 0.25 to 0.26) |

So the cell no longer gives a verdict on a stalled film either way: what it reads is green on the
branch and red on v11.1.0, and a film it cannot read is named as such. The atTurn read is now
exact: in most clean films it equals turnedAt, the extreme the surface turned at.

**What is not cured: the stall itself, and so the gate can still stop on it.** In the interleaved
run the stall came in pairs: in all 11 of 11 cells whose first film was unread, the second film was
unread too. In the stalled films the hole sits after the turn: the frames after the input arrive 20
to 90 ms apart (the first of them often 40 to 80 ms late, with the region where it stood) where a
clean film paints every 10 ms. The reopen lands late (0.03 to 0.26 of the height, against 0.35 to
0.45 clean). A second 20-repeat read that filmed the second film in a new browser context with the
project's form (`rev20b-branch-webkit-phone`) stalled the same way, 13 cells unread in both films,
so that variant was reverted for the same-page reload. The stall did **not** reproduce in any probe
(`fix-5/probe/`, readings only, all films with no hole over 22 ms):

| probe | branch | v11.1.0 |
|---|---|---|
| the reopen sequence on a Collapsible (open, rest 900 ms, close, 50 ms, reopen), interleaved with a close from rest and an open from closed, 12 repeats (`stall-*`) | 36 clean | 36 clean |
| the same with the reopen landing near the closed end (130 ms, turn at 0.06 to 0.08), 10 repeats (`stall2-*`) | 20 clean | 20 clean |
| the reopen filmed by the release film itself (`startFilm`), with the cell's own setup (`gotoReady`, the open height read, the wait on the open state) and without it, 10 repeats (`heavy-*`) | 20 clean | — |
| a close 60 ms into an open (the turn the other way) followed by a reopen, interleaved, 12 repeats (`stall3-*`) | 24 clean | 24 clean |

The stall shows only when the release spec's disclosure cells run in repeat, on the branch; v11.1.0
did not stall in the same interleaving, but its reopen restarts from the closed end and paints a
different motion. Its cause is still not found. Until it is, a gate pass that meets a stall at a
WebKit 390 reopen cell fails that cell as unread, and `scripts/release.sh` stops there, by name.

## 2. 11.1.0's restated radius-scale cell

**Cause.** 11.1.0's close restated `radius-scale.spec.ts` for the touch floor (`a92a113d7`), and
its wide-strip arm asserted the bar's 12 px in every project. Row 12 (`2d663038d`) moved that corner
on a coarse pointer to half the touch floor on purpose.

**Cure** (9152d3bc4). Under `coarse-touch` the wide strip's tab reads `22px` and its corner is at
least half its height less 1 px (the stadium bound the short arm already carries); the fine-pointer
arm still reads `12px`. The title is unchanged.

| tree | chromium-headless-new + coarse-touch |
|---|---|
| v11.1.0 (`radius-red`) | **R**: the coarse arm, light and dark, `12px` for `22px`; 62 other titles pass |
| branch (`radius-branch`) | **G** 64 of 64 |

## 3. Under reduced motion a pressed Button showed no press, and a menu row still shrank

**Cause.** Critique 4's reading holds. The default Button's glass arms (primary, secondary) answered
a press with their scale and the press gleam; the gleam steps 0.10 to 0.16 of a thin edge light,
which changed no pixel past the probe's threshold, and the ruling took the scale away under reduced
motion with no colour in its place. `.interactive-item:active` (`utilities/base.css`) scaled to
0.97 with no reduced-motion carve, where `.tap-squish` beside it already had one, and a menu row
carried no press fill: its highlight is the pointer's, and reka highlights a row on mouse movement
only, so under a finger a pressed row showed nothing but the scale.

**Cure** (8e72e127c), under `prefers-reduced-motion: reduce` only; without it nothing changes.
- `button/styles.css`: a pressed Button of the primary or secondary emphasis sets
  `--glass-veil-rung: calc(var(--glass-veil-rest) + var(--glass-veil-step))`: its plate takes one
  rung more of the veil's ink, the ladder's own step, through the destructive tone's mix too (it
  mixes the same veil). The quiet and text arms already step their fill on `:active`.
- `utilities/base.css`: `.interactive-item:active` joins `.tap-squish`'s reduced-motion arm,
  `scale: 1`. It shares the one block on purpose: `engage-ladder.test.ts` reads the file's first
  reduced-motion block as the shared press rung's arm.
- `_shared/menu/menu.css`: in its reduced-motion block, `.glass-menu-row:active:not([data-disabled])`
  takes `var(--glass-plate-resting)`, the plate one rung above its highlight (`--glass-plate-quiet`),
  under a finger as under a pointer.
- `Button.test.ts`'s "the surface cross-fade survives reduced motion" asserted that the Button's
  sheet holds no `prefers-reduced-motion` at all. Its claim is that no reduced-motion rule there
  touches the transition list; it now reads exactly that, and that the one block re-points the
  veil rung (red on v11.1.0, which has no block).

**Witness**: `press · a pressed control shows its press by colour, not by size, under reduced
motion` (reduce spec, gate part four), fix seat 4's cell extended. A Button, a dock icon seat, a
dock tab seat and a row of the dock's DropdownMenu are each held pressed. Besides scale 1, no
transform and the rest width on every held frame (with at least one `:active` frame), it reads the
computed fill at rest and held, which must differ, and a screenshot crop of the control at rest and
held: at least a quarter of the crop's pixels must move by more than 12 (summed over the three
channels, out of 765). With the mouse the pointer rests on the control 300 ms before the rest crop,
so the held crop differs from a hovered one by the press alone. WebKit at 390 stays skipped
(Playwright's WebKit touchscreen cannot hold).

| tree | ch-phone | ch-desktop | wk-desktop |
|---|---|---|---|
| v11.1.0 | **R**: Button `1.0328 0.911`, fill unchanged; seats scale; row `0.97`, fill unchanged | **R**: the same; row `0.97` 182 to 176.54 px | **R**: the same |
| branch (`pressF-*`) | **G**: scale `1` on every frame for all four; painted 0.77 Button, 0.45 icon, 0.69 tab, 0.87 row | **G**: 0.71, 0.41, 0.68, 0.43 | **G**: 0.71, 0.41, 0.68, 0.58 |

The fills on the branch: the Button from α 0.244 to 0.278 (`oklab(0.673…/0.244)` to
`oklab(0.626…/0.2776)`), the row from α 0.10 to 0.14, the seats to their press fill as before. On
the tree before this commit critique 4's probe read the Button at 0 % changed at 1440 and 2.5 % at
390. Unit files that read these sheets (`engage-ladder`, `glass-subtlety`, `radius-role-canon`,
`drive-tokens`, `contrast-computed`, `Button`, `rowClass`, `picker-lane`, `focus-visible` and all of
`tests/styles`): 39 files, 546 passed.

Left, as before: a pressable `Card` (`card/styles.css`) and a lifted sortable row
(`sortable-list/styles.css`) still scale under reduced motion (critique 4's gap C); this defect
names the Button and the menu or select row.

## 4. The CHANGELOG's keyframes and the Dialog's page press

Read on both trees before writing (`git archive` v11.1.0 against the tip): v11.1.0 ran
`glass-menu-grow-up` and `glass-menu-recede`/`-up` (`reveal.css:284-290`) and
`glass-reveal-out-reduced` (`reveal.css:337, 368, 379`); the tip runs none of them, nor
`glass-reveal-out` or `glass-menu-grow`, and still defines all six. `glass-reveal-out` lost its
60 % opacity stop and both recede keyframes lost their 90 % hold; `glass-menu-grow`,
`glass-menu-grow-up` and `glass-reveal-out-reduced` kept their shape. `ModalScrim.vue` takes
pointer events only while open and `ModalOverlay` mounts it in `DialogContent.vue:229` and
`SheetContent.vue:341`.

006aa351e: the routes paragraph names the four menu keyframes and the recede keyframes' new shape;
the reversal paragraph names `glass-reveal-out` and its new shape and `glass-reveal-out-reduced`
(under reduced motion or `data-motion="off"`), and the page press behind "a leaving `Dialog` or
`Sheet`"; the reduced-motion paragraph names the menu or select row and the two fills. No internal
ids; no em dash added.

## Sizes

Every entry's static import closure, gzipped, measured with `critic-1/closure.mjs` on the fresh
`dist` (`logs/sizes-all-branch.txt`) against fix seat 4's listing: **all 70 entries equal**,
the dock entry 40,533 bytes. The three rules are CSS; the package grew 337 bytes unpacked, which
the ratchet records. No CHANGELOG size line changes.

## Gates on the committed tree

| command | exit |
|---|---|
| `npm run typecheck` | 0 (`logs/typecheck.log`) |
| `npm run build` | 0 (`logs/build.log`) |
| `npm run verify:package` | 1 before the rebind (`3054903 > 3054566`), 0 after 91ffa8fb7: `CLEAN` |
| `npm run demo:dist:build` | 0 |
| `CI=true npx vitest run --maxWorkers=2` | 0: 285 files, 2,600 passed, 10 expected fail, 1 skipped |
| `npm -w tests-visual run gate:exits` (as `scripts/release.sh` runs it, `GLASS_UI_DEMO_PORT=5351`) | **0**, all sixteen parts (`logs/gate.log`): chromium-phone 127 passed, 18 skipped; chromium-desktop 134, 11; webkit-phone 101, 44; webkit-desktop 134, 11, the same counts as fix seat 4's pass. No reverse cell failed, unread or otherwise (the gate's line reporter does not say whether a film was taken twice). WebKit 1440's standing part logs the three ResizeObserver loop errors that fix seat 4's and critique 4's gate logs also hold (row 13 (b), for 11.1.2) |

## Open, for critic 5 and the close

- **The WebKit 390 stall** (critique 4's gap H) is now visible as unread films rather than as red
  readings, and is narrowed to the release spec's repeated disclosure cells on the branch; five
  probe sequences on both trees do not reproduce it. Its cause is not found, and the gate stops on a
  reopen cell that meets it twice, as unread.
- Carried unchanged: critique 4's gaps A, B, C (Card and sortable row), D, E, F (`gate.sh`'s header
  says three parts and runs four; with `GLASS_UI_DEMO_PORT` unset it serves on 5199 with
  `reuseExistingServer`), G and I.

No tag, no push, no publish.
