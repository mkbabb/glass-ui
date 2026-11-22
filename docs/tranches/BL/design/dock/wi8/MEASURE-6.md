# W-I.8: the sixth build, measured

2026-11-16. Seat: the sixth build and measure. Model: claude-opus-5-5.

**NOT READY.** Red by RU-49's list: **G-6** (both engines), **G-11** (Chromium, by the letter of the 3-layout bound) and **G-14** (new failures in all three projects, two of this design's making). G-1, G-2, G-3, G-4, G-7, G-8, G-9, G-10, G-12, G-13 and G-15 are GREEN in both engines. Three cells failed once in the pass and passed when read again (below).

Paths below are relative to `docs/tranches/BL/design/dock/wi8/measure/` in the worktree `.claude/worktrees/bl/dock/wi8` (branch `bl/dock/wi8`). The strips are in this folder's `fold/`.

**The build: `ddfa8a2ba`** (`logs/m6-build.sha`; `src` clean). The page was built once with `VITE_DOCK_HOLD=1` (`m6/build6.sh`: dock-wi8 and the ten compositions). The library was built once without that flag. The whole pass ran in one chain (`m6/chain6.sh`, 01:08 to 03:54), covering:

- every probe cell in Chromium and WebKit 2287
- the side cells
- return-30 twenty times per engine
- the units
- the owner's frames
- G-14 in three projects
- every plant
- G-14's restated groups under their plants

The 1-minute load stayed at 7.6 to 19.2 through the pass. No cell was read above 36 (`logs/m6-void-*.txt`: none). After the chain:

- The two WebKit cells that failed once were read three more times on a rebuild of the same commit.
- G-12 was read again on a real library build, because the pass's read had no library to read.
- The seat-set frames were shot again, because the first set showed a fold (below).

## The commits (RU-49's order)

| # | commit | what |
|---|---|---|
| 1 | `7edb44f8f` | instruments: RU-37's in-page cause and the whole-row turn (`m6/judge7.mjs`), the load per cell, `read6.mjs`, the `dock:read` reason (RU-38), `cost5.mjs` |
| 2 | `0a5897d43` | one commit of deletions (RU-39 `capExtra` and the capped port, RU-40's resting offset on a fitting run, RU-42's plant and cell, RU-41's `it.fails` restated) |
| 3 | `187ecc9b6` | RU-39: the lifted read |
| 3 | `cc2ce3a4e` | RU-36: a room change is seated |
| 3 | `55013d570` | RU-38: an observer delivery in a frame already synced returns when every entry's border box equals the held box |
| 4 | `5eccb8554` | RU-44: one tier at the base rung, the dock's level 0.4, every word in a dock at full ink |
| 4 | `ddfa8a2ba` | RU-45: glyph share 0.9, the seat sizes a site's own picture and `[data-dock-glyph]`, a tab seat's glyph 1.5 em |

**Lines removed and added** (`src` and tests, from `2a9e1aba4`):

- `useDockBody.ts` +71/−27 over five commits. The deletions commit alone is +6/−15.
- `g-dock-lattice.test.ts` +37/−16.
- `GlassDock.posture.test.ts` +34.
- `critic-12-r11.spec.ts` +4/−1.
- The RU-44 tokens and CSS +24/−7, of which one line (the chevron's `opacity: 0.5`) is deleted outright.
- The RU-45 CSS +13/−4.

## The gates

The judges are:

- `m6/judge7.mjs` (from the cause, turns in whole rows)
- `m4/gates4.mjs`
- `m6/read6.mjs`
- `m3/seat4.mjs`
- `g9b.mjs`
- `m6/g6b.mjs` (RU-47's widened G-6)
- `m6/words.mjs`
- `m6/r30.mjs`
- `g12.mjs`

The plants are `m6/plants6.py` (run by `m6/plantrun6.sh`, logs `logs/m6-plant-*.txt`) and, for G-14, `m4/g14plants.py` (`logs/m5-g14plant-*.log`). The plants were read on the worktree's dev server with the hold flag. That server reads `src/` live, so each plant was applied, read in both engines and reverted, and there was no build per plant. Each plant is a check of the logic; each gate's reading is from the built page.

| gate | Chromium | WebKit 2287 | plant bites | verdict |
|---|---|---|---|---|
| G-1 · the clock | every clause as MEASURE-5 (within 25 ms); (c) 6519, (d) 12006 and 6005, (e) 6636, (f) a held finger holds, 6015 ms after the lift; the 390 clock 6007, a seat tap 6016, outside 2.2; RU-43's rail (`w-railp`, vertical, persistent seats, no `#collapsed`) rests open at 390 and does not fold in 8 s | the same within 25 ms; (f) by the unit witness (RU-42) | yes: the linger token ignored (3606 / 3604 ms, both); the lift before the tap's focus (the unit witness fails under it) | GREEN |
| G-2 · fold and unfold | 134 of 134 segments over 69 scenarios, including RU-36's lifted-cap cell (`p5-many-lift-fine`) | 133 of 134 in the pass: `p3-fold-vert-fine`'s last step 0.33 px (8.3 %) on a 4 px edge. Read three more times: every segment passes | yes, both, every G-2 plant (the clock at the trigger, the curve inset, the leaving face, the rim, the touch rule, the lane plants, `fitWhole`, the whole-seat flag twice, RU-36's room change on the spring) | GREEN |
| G-3 · a reversal | 18 of 18 | 18 of 18 | yes, both: RU-42's retarget held four rows (2 cells of 5 in Chromium, 1 of 5 in WebKit) | GREEN |
| G-4 · layer swap, open seat, seat set | 42 of 43. The one is return-30 (below), an artefact by RU-37; seat4: every open-seat cell moves 0 seats | 43 of 43 | yes, both: the records ignored, the ghost, the snap, the scroll offset, RU-28's open-seat width | GREEN |
| G-6 · hover, focus, press (RU-47 widened) | hover at 1440, hover at 390, the keyboard cell: 0.00 px. **The press cell fails: 4.00 px**, every seat of the run moves 4 px when the end seat (Settings) is pressed | hover cells 0.00 px; **the keyboard cell and the press cell fail, 4.00 px**, the same 4 px when the end seat takes focus | yes, both: a name in flow | **RED, by the letter.** The cause is MEASURE-5's reserve note: a fitting run keeps 4 px of scroll (the reserve yields down to the ring's reach), and a focused end seat's reach takes it. No seat or plate changes size. No ruling covers it |
| G-7 · the outlet | every clause (identical to MEASURE-5) | the same | yes, both: the provide removed (`contextIsThisDock` false) | GREEN |
| G-8 · overlays | every clause | the same | yes, both: the hold consulted on a press outside (the menu and the sheet hold the dock open) | GREEN |
| G-9 · the published progress | 3 of 3, lag 0 rows | 3 of 3 | yes, both: the scope write removed | GREEN |
| G-10 · reduced motion | 59 of 59 | 58 of 59 in the pass: `p3-swap-layers-rm`, one face fading over 726 ms. Read three more times: every segment passes | yes, both (8 and 12 failing segments) | GREEN |
| G-11 · cost, and rest | Renderer `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`. Layouts per trigger frame: 2 in 21 frames, 3 in 15, **4 in 12** (of 48). Of the twelve 4-layout frames, eleven are the carrier's 3 (`after the carrier` plus two `frame`) and one read (`flags` or `reread`); one is 2 and 2. After RU-38 no trigger frame carries a second `ro` read (before: 26 of 48). At rest 0 callbacks, 0 mutations, 0 animations in every cell. Median of the five longest layouts at 4x: pill 0.94, flow 1.26, controls 0.91, seat 1.03 ms | not run (the WebKit side has no cost cell) | yes (Chromium): a loop left at rest, 480 callbacks | **RED by the letter of RU-51's bound of 3**: 12 of 48 trigger frames read 4, and the carrier's share is 3 of the 4 in eleven of them. Not cured, per RU-51 |
| G-12 · static | every clause; `__dockHold`, `__dockPose` and the `dock:` marks absent from the built library (`logs/m6-g12.txt`) | (engine-free) | yes: a scale on `.glass-dock` | GREEN |
| G-13 · census, focus, hit, forced colours, safe area | every clause as MEASURE-5. **RU-45's line: at 390 coarse every seat's hit box is 44 by 44** (site dock 6 seats, controls dock 4), and each glyph is 35.2 px (0.9 of the 39.1 px layer height, 0.8 of the 44 px seat). Safe area 50 px with a 34 px inset, 16 without | the same, forced colours and safe area aside | yes: the hidden face keeps its box (both); the inset not read (Chromium) | GREEN |
| G-14 · the shipped line | below | below | every restated group bites (corner 14, clock 8, lane 6, reserve 16, touch 5, press 2, cap 1, fits 6, zoom 3 failures under the plant) | **RED** |
| G-15 · ink over a busy field (RU-44) | 88 of 88 cells; lowest word 6.84:1, lowest glyph 5.62:1 | 88 of 88; lowest word 7.39:1, lowest glyph 6.07:1 | yes, both: today's plate fails 14 cells (Chromium) and 13 (WebKit); words at 3.29:1 and glyphs at 2.12:1 | GREEN |

### G-14 against master

The master snapshot is MEASURE-3's base logs, compared by `m6/g14cmp.py` (`logs/m6-g14cmp.txt`, logs `m5-g14-m6-*`). Each project ran 278 tests on the build.

| project | new failures | failing on both | passing only on the build |
|---|---|---|---|
| chromium-headless-new | 5 | 3 | 5 |
| coarse-touch | 4 | 4 | 6 |
| webkit | 5 | 5 | 4 |

The new failures, by cause:

- **s2 (O-201) at 1440 and at 390, all three projects.** The cause is the fit flag reading its own yield (RU-50 below, not cured). At cap 266 the flag is false while the spec reads port 250 and span 250.
- **o1, the wide label seat (11.0.1), both tests, all three projects. Of this design's making (RU-45).** A labelled icon seat now carries a 0.9 glyph: 36 px of glyph plus 8 px of padding makes the seat 44 px tall where it was 40. Its plate keeps the 20 px radius, so it is no longer a capsule (`{"radii":["20px",…],"w":96,"h":44}`; the active seat 103 by 48 at 22 px).
- **k3 at 320 (10.1.5), headless-new and WebKit. Of this design's making (RU-45).** The tab seats' unsized glyphs are now 1.5 em (21 px), not their own 24 px. The dock is 310 px wide, so the test's premise, "the dock is capped by the viewport" (≥ 316), no longer holds.

The O-101 reversal tests (10.1.2:446) fail on master and on the build.

## What each ruling did

- **RU-36, a room change seated.** Read on the lifted-cap cell in both engines (rows/m6-ru36): after the lift every seat shows 0 rows after the change (was 6 and 5). After the cap returns, the plate is at layout 0 rows after it (was 28 and 23), and no seat that meets the plate is hidden. In the pass it is GREEN in both engines.
- **RU-37, cause and whole rows.** The instruments read each mark's cause in its own capture listener. Re-judged on MEASURE-5's rows, the three G-2 first-row cells and G-10's swap cell pass from the cause.
- **RU-38, the second sync.** Before the cure, 26 of 48 trigger frames ran a second read whose reason was `ro`. After it, none do (`logs/cost2.m6-ru38b.json`). The fold and swap cells pass in both engines at load 9 to 12.
- **RU-39, the lifted read.** The sweep (`m6/sweep.mjs`) passes in both engines, flip at 363. 10.1.5 e4, k3 and p2 passed on that commit in all three projects. k3 later fails from RU-45, as above.
- **RU-40, the resting offset.** Deleted on a run that fits. read6's rest-offset clause is 0 everywhere.
- **RU-41, the mark.** The `it.fails` is restated as a passing witness.
- **RU-42, the plants and the WebKit finger cell.** The finger cell is retired, and G-1 (f) is now a unit witness that bites under its plant. G-3's new plant bites in both engines.
- **RU-43, the trigger of an open surface, and the rail on touch.** Readings only. The rail rests open and does not fold. The trigger cell (`trig` in `logs/m4-cells.m6.*.json`) reads a second press on the trigger of an open surface:
  - Only Select under the mouse passes in both engines (it closes and stays closed, and the dock stays open).
  - The DropdownMenu reopens twice and the Popover once, mouse and touch, both engines.
  - The Sheet closes, but the dock folds with it.
  - Select on touch reopens once in Chromium. Popover on touch fails without reopening (Chromium), and the dock folds (WebKit).
- **RU-44, the plate.** Read by G-15 on the ten compositions, both engines, in the ruled order:

  | state | failing cells (Chromium / WebKit) | lowest word / glyph contrast |
  |---|---|---|
  | today's plate | 14 / 13 | 3.29 / 2.12 |
  | one tier at the base rung | 20 / 13 | — |
  | level 0.7 | 11 / 11 | — |
  | level 0.6 | 11 / 11 | — |
  | level 0.5 | 11 / 9 | — |
  | level 0.4 | 9 / 8 | — |
  | level 0.4 + the chevron and the tab's muted ink deleted | 2 / 2 | — |
  | **level 0.4 + full ink, as built** | **0 / 0** | 6.84 / 5.62 (Chromium), 7.39 / 6.07 (WebKit) |

  At level 0.4 the remaining fails were the chevron (2.73:1) and the dials' unselected segments. With the chevron and tab ink deleted, only the dials' unselected segments (1Y, All, Log at 4.32 to 4.38:1, light, over the field) still failed. The orchestrator's clarification of RU-44 (INPUT-secondary-ink: every word full ink, hierarchy by weight and size) removed the segmented control's warm mix inside a dock. That state passes, as stylesheet and as build.

  **The plate that passes: one tier at the base rung (0.14 light, 0.18 dark), `--glass-level: 0.4` on the dock, every word and glyph at the dock's full ink.** The a11y brackets still lower the level (0 and 0.3).

  Read in the plate strip: at level 0.4 in light the **selected segment's mark (5Y, Lin) is very faint**. The current choice is carried almost by nothing. Not gated; it bears on RU-41.
- **RU-45, the glyph.** The share is 0.9, and the seat sizes a site's own `svg`, `img`, `picture` and `[data-dock-glyph]`. A tab seat's glyph is 1.5 em. At 390 coarse every seat is 44 by 44 with a 35.2 px glyph. Two G-14 failures come from it (o1, k3; above).
  - In the nav composition the site's search glyph keeps its own size, because a utility class wins over the component rule. Only the theme glyph shows the share there.
  - **Hover fill and selected mark at 0.9** (point 2 of INPUT-daraksha-2x's 23:15 section): in the hover strip (the site dock at 1440, fine) the hover fill and the pressed fill are both visible as a disc around the Search glyph. In the glyph strip at 0.9 the theme glyph fills its seat nearly to the edge, and no fill is visible around it in those frames because none is hovered. The fill is the seat's whole box (RU-46, row 6), so at 0.9 there is about 2 px of fill outside the glyph on each side at 40 px. I did not read a hovered seat at 0.9 coarse.
- **RU-46.** Rows 1, 2 and 4 are built (RU-45, RU-44). The rest are deferred as ruled.
- **RU-47, names off the run.** Not built (later in 11.2.0). G-6 is widened and fails as above. **Names on touch** (INPUT-daraksha-2x, point 1), read in `touchname`:
  - Chromium, a press and hold on a seat at 390: no tooltip, no name, so a phone shows no name.
  - At 1440 a hover shows no name either, since RU-47 is not built.
  - WebKit: the touch half errored (the seat had no box at that moment), so not read.
- **RU-48.** No public name added beyond `data-dock-glyph`.
- **RU-50 (orchestrator, 2026-11-15), s2's fit flag: stopped on a second cause.**
  - I built the flag as ruled: the room is the region's content box less the run's margins and border, in layout integers, never the run's own client box.
  - At cap 266, s2's page now writes 3 flags in 600 ms (was 144) and settles at `fits=false`.
  - It settles there because RU-38's guard suppresses the delivery, not because the law says so: at rest the room reads 250 and the span 250, which by the rule fits.
  - Reading the boxes from the run up to the root (`m6/s2chain.mjs`): forcing the flag on or off changes no box in the same frame. The one input that moves with the flag is **the stadium inset (R-1)**: `fitCurve` writes the curve padding only when the run fits (`useDockBody.ts`, `fitCurve(…, plan.fits)`). The root's padding is 12.5 px at 267 and 12 px at 266, and that padding feeds the region the room is read from.
  - So the flag has a second consequence that is also its input. As ruled, I recorded it and stopped. The attempt is not committed (`harness/m6/ru50-attempt.patch`).
  - s2 fails in all three projects as before. The sweep under the room law passes in both engines (`logs/m6-sweep-ru50-room.*.json`).
- **RU-51 (orchestrator, 2026-11-15), layouts per trigger frame.** Recorded above under G-11: 12 of 48 trigger frames read 4 layouts, eleven of them with the carrier's 3. The carrier is not cured.

## Return-30 (RU-37)

Each engine ran the cell twenty times (`logs/m6-r30.txt`, rows `rows/m6-r30/`):

- **Chromium: no run past the bound.** Every run turned 2 rows after its cause (bound 3 or 4), with a largest row gap of 1.01 to 1.24 rows, at load 13 to 15.
- **WebKit: no run past the bound.** Every run turned 1 row after its cause (bound 2 or 3), largest gap 0.94 to 1.19.

The pass's own return-30 cell (Chromium, load 14) read 174 ms against a 23.6 ms bound. In whole rows it turned 1 row after its cause (bound 3), after a 21-row gap. **Verdict: an artefact.** The only late turn has a gap that accounts for it, and none of the forty runs turns late at cadence.

## Cells that are readings only

- **Worded Select triggers** (`w-words`, a value changed to a longer word and back):
  - The changed seat keeps its own width (176 to 275 px Chromium, 179 to 285 WebKit).
  - Its neighbours are carried on the clock: 32 to 35 rows, largest step 8.1 % in Chromium; 16 to 23 rows, largest step 14.8 % in WebKit.
  - `words.mjs`'s fixed 12 % flags WebKit. The same 14.8 % passes every WebKit G-2 cell under judge7's per-row bound (WebKit's rows are 16.7 ms).
- **The in-flow dock** (INPUT-hover-shift, `w-inflow`: a collapsible horizontal dock in a flex row beside a neighbour, a block below):
  - On hover at 1440 the dock grows 152 px and the neighbour beside it moves 76 px, in both engines.
  - On a tap at 390 the dock grows 164 px and the neighbour moves 82 px.
  - The block below does not move.
  - The focus clause did not read cleanly: the dock had not folded before the focus, so its deltas are against an open dock (0 px).
- **G-3's new plant** bites (above). **G-6 on every seat's box** is red (above).

## The strips (in `fold/`)

| file | what |
|---|---|
| `strip-fold-6.png` | the fold, v11.0.1 above, this build below, held at seven points, both engines |
| `strip-swap-6.png` | a layer change (two rows to four), the same |
| `strip-seatset-6.{chromium,webkit}.png` | a seat added, frames 45 to 400 ms after, the pointer resting on the dock (the first set showed the dock folding, because the add button was clicked from outside it, and was shot again) |
| `strip-hover-6.{chromium,webkit}.png` | a seat at rest, hovered and pressed |
| `crop-many-6.png` | the seven-seat dock open at rest at 360 and 390, both engines, the run at its start and end (6 whole and 1 absent at the start; scrolled 52 px at the end) |
| `strip-glyph-6.{chromium,webkit}.png` | the glyph share at 0.5, 0.75 and 0.9, at 1440 and 390, dark and light |
| `strip-plate-6.{chromium,webkit}.png` | the plate at three firmnesses: today's (two tiers, dimmed ink), one tier at level 1, this build (one tier, level 0.4, full ink), dark and light, folded and open |

## What was not run

- WebKit's cost cell (G-11): the WebKit side has none.
- WebKit's forced colours and safe area (G-13): not settable from a WebKit 2287 page.
- WebKit's finger cell: retired by RU-42.
- WebKit's half of the touch-name reading: it errored.
- The plants on a build per plant: they were read on the dev server.
- The demo site itself for G-15: the ten compositions were copies from `bl/demo` mounted on this library (`m6/comp/`), not the site.
- A hovered seat at 0.9 on a coarse pointer.
- RU-50's cure: stopped on the second cause.
