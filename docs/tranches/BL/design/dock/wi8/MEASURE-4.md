# W-I.8: the fourth build, measured

2026-11-15. Seat: the fourth build and measure. Model: claude-opus-5-5. I wrote none of the wave, the rulings, the challenges or the folds.

Paths below are relative to `docs/tranches/BL/design/dock/wi8/measure/` in the worktree `.claude/worktrees/bl/dock/wi8` (branch `bl/dock/wi8`), where the harness, rows and logs live. Gate numbers and bounds are `waves/W-I.8.md`'s, read with RULINGS-3 (RU-21 to RU-24).

**Every gate reading below is on one build: `5883827f6`.** `logs/m4-build.sha` records it with `src` clean. The page was built once with `VITE_DOCK_HOLD=1` and the library once without it. The pass, every plant, G-14 in both engines and G-14's restated groups under their plants ran in one chain (`harness/m4/chain4.sh`, 14:07 to 15:55, load 5 to 14, memory 65 % free; the WebKit lock never waited long). Engines: headless Chromium (rows of about 8.3 ms) and Playwright WebKit 2287 (about 16.7 ms). After the chain, one correction to RU-23 was tried (`ee45c764b`), read on a second build, found worse, and reverted (`1966e12a9`), so the branch's source is again the measured build's. That second build's readings are marked as such and are not in the gate table.

## The gates

The judges: `harness/m4/judge5.mjs` is `m3/judge4.mjs` with RU-21 (below); `m4/read4.mjs` is `m3/read3.mjs` with RU-21 on a removed control and RU-23 read as "whole or absent"; `m4/gates4.mjs` groups p3- and p4- cells; `m4/g6.mjs` reads G-6's root and plate from the first hover or arrow; `m3/seat4.mjs`, `read2.mjs` and `g9b.mjs` as in MEASURE-3. Plants are in `m4/plants4.py` (run by `m4/plantrun4.sh`, logs `logs/m4-plant-*.txt`) and, for G-14's restated groups, `m4/g14plants.py` (`m4/g14plantrun.sh`, `logs/m4-g14plant-*.log`).

| gate | Chromium | WebKit 2287 | plant bites | verdict |
|---|---|---|---|---|
| G-1 · the clock | (a) 73.2 ms; (b) no open under a still pointer, 65 ms after the move; (c) 6519; (d) 12005, 6005 with the max at 6 s; (e) no fold, 6635; (f) a Popover, focus inside and a held finger hold (a real touch by CDP, 9 s), then 6018 ms after the lift; (g) 6010; (h) press outside 4 ms, Escape 2.4 ms, `collapse()` 2.2 ms at 1440 and 3.9 ms at 390; (i) 6539, one fold; (j) no fold; (k) 6534; (l) pinned, no fold in 15 s; (m) no fold under the pointer; (n) as MEASURE-3; the 390 clock: tap 6007, tap on a seat 6015, tap outside 2.6 ms | (a) 68; (b) 67; (c) 6522; (d) 12006 and 6010; (e) 6643; (f) holds, the finger by dispatched touch pointer events, 6006 after; (g) 6019; (h) 9, 4, `collapse()` 3 and 3 ms; (i) 6539; (j) holds; (k) 6535; (l) pinned, no fold; (m) no fold; the 390 clock: 6013, 6006, 6 ms | yes, both: the linger token ignored folds at 3606 ms; the touch-lift cure undone, a tap on a seat never folds (both engines) and the held finger never folds (Chromium) | GREEN, with one caveat: WebKit has no held-touch input, so its finger is dispatched pointer events, which its plant does not bite |
| G-2 · the fold and the unfold | 121 of 134 segments over 69 scenarios. Fails: the outlet's seat 3 and fourier's seat 2 hidden by their lane 41 to 301 ms before the plate covers them, in every fold of those cells (RU-21 allows 20 ms); the rail at 390, first row 35 ms after the tap (bound 34). read4: content inside the curve within 0.02 px everywhere but keyframes's transport under reduced motion, 4.39 px in travel; the rim within 0.5 px and 40 %; the seven-seat dock whole or absent at 360 and 390 (6 whole, 1 absent, no sliver); the six-seat controls dock at 360 loses a seat (5 whole, 1 absent; 6 of 6 on MEASURE-3's build); the mounted right-to-left page folds and unfolds inside the bounds | 122 of 134. Fails: the same seats, 40 to 307 ms; read4 as Chromium | yes, both: the clock started at the trigger (16 %); the curve inset never written; the touch rule removed; never compact; the rim on the root; the leaving face sized by its border box. **No bite:** every lane corner rounded (the region cell reads 0 px past the curve under it; MEASURE-3 read 1.62) | fails |
| G-3 · a reversal | 20 of 20 | 20 of 20 | yes, both: the intent wait applied to a return | GREEN |
| G-4 · a layer swap, the open seat, the seat set | 36 of 43. Fails: the region cell's seat 3 hidden 42 to 225 ms before covered; the seat set at 390, seat 2 hidden and shown again, and a seat that moves 104 px in the window's first row; the mounted right-to-left layer change, the leaving face moving 9.9 to 11.5 px in the first row while the plate moves 0. seat4: every open-seat cell passes. read4: at 1440 the open seat's name changes two seats' widths by 96 px in one row (and in the right-to-left page) | 36 of 43, the same cells (10.8 to 12.2 px); seat4 passes but for two seats that move on two rows in one cell | yes, both: the inline-size leg; the records ignored; the offset left to the run's reach; **the snap rest's plant, rewritten (the rest 9 px off its snap position), bites in both engines** (the last row steps 8.7 px). **No bite:** the removed control held inside the run's scroll port (as on MEASURE-3: under the plant the read sees no removed control at all) | fails |
| G-5 | retired | | | retired with R-6 |
| G-6 · the hover guard | 1440 hover and sweep, 390 hover, keyboard through the run: root and plate move 0.00 px, no fold | the same | yes, both: a name in flow moves the plate | GREEN |
| G-7 · the outlet | as MEASURE-3, every clause | the same | yes, both: the provide removed | GREEN |
| G-8 · overlays | as MEASURE-3, every clause; plus the two unread cells, each action fixed: a hover popover opened on a dock focused by Tab: the first Escape closes it with the dock still (0 px), the second folds it with focus on the folded face; a press on the sheet's scrim folds the dock in 5.5 ms and closes the sheet. The overlay folds fail RU-21 on the outlet's seat 2 and 3, as G-2 | the same (the sheet fold in 8 ms) | yes, both: the hold consulted on a press outside (the sheet cell never folds) | fails, on G-2's hidden seat only |
| G-9 · the published progress | as MEASURE-3 | the same | yes, both: the scope write removed | GREEN |
| G-10 · reduced motion | 57 of 59. Fails: the two swap cells, unsplit, as MEASURE-3 | 57 of 59, the same | yes, both | fails as judged, for the same reason as MEASURE-3 |
| G-11 · cost, and rest | Renderer: `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`. A median of 1 layout a frame; **5 on the trigger frame** in every cell (bound 3; MEASURE-3 read 4); the loop's script 0.08 ms at the median; at rest 0 callbacks, 0 mutations, 0 animations; in block flow at 4x the longest layout 1.53 ms against 0.94 | read by frame pacing; not rerun for this report beyond the pass (WebKit's side ran no cost cell) | yes (Chromium): a loop left running at rest, 480 to 482 callbacks | fails, on hardware (Metal), not software-only |
| G-12 · static | every clause passes over `src`, the rename (`--dock-shadow-color`, no `--dock-halo`) included; `useDockMorph.ts` and `dockMorphMeasure.ts` are deleted (`817f555c3`); `__dockHold` and `__dockPose` absent from the built library | (engine-free) | yes: a `scale` on `.glass-dock` | GREEN |
| G-13 · census, focus, hit, forced colours, safe area | as MEASURE-3, every clause; the safe-area cell (Chromium `Emulation.setSafeAreaInsetsOverride`, 34 px): a `within="viewport"` controls dock sits 50 px from the bottom with the inset and 16 without, a `within="parent"` one 16 px from its parent either way | the same, forced colours and the safe area aside (no inset override in WebKit 2287) | yes, both: the hidden face keeps its box; the inset not read (the viewport dock at 16 px with the inset) | fails, on the six-seat controls dock at 360 (a seat absent; G-2 above) |
| G-14 · the shipped line | below | below | below | fails |

G-1, G-3, G-6, G-7, G-9 and G-12 are GREEN. Every other gate fails or has a cell unread.

### RU-21 in the judge

judge5 replaces judge4's "a unit inside the plate with an empty visible box" (any one row) by runs: a unit's run of hidden-inside rows starts at its first such row and ends when the plate covers it (its box leaves the plate's) or it falls under 0.1. A run of 20 ms or less passes; a longer one, or a unit that shows again, fails. read4 applies the same 20 ms to a removed control. Under it the "one row" MEASURE-3 read is not one row: the lane hides those seats for 41 to 307 ms, and they fall under 0.1 before the plate reaches them. The lane clips the seat while the plate still covers its whole box, which is the clause RU-21 says the lane wins against only for 20 ms. Not cured.

### The right-to-left page

`&dir=rtl` sets the page's direction before anything mounts (`p4-*-rtl-*`). The site dock folds and unfolds inside every bound, at 1440 and at 390 by touch. The layer change fails as above (the leaving face moves 10 to 12 px in its first row), and the open seat's change moves a seat 96 px in its first row, as the left-to-right one does (RU-24, not built).

## G-14, triaged (RU-22)

The 304 are MEASURE-3's: release tests of 10.1.1 to 10.1.5 and 11.0.1 that passed on master's snapshot (`99a1389e6`, `.base-master`) and failed on `516f591b0` (101 in chromium-headless-new, 105 in coarse-touch, 98 in WebKit). The extraction is `logs/m4-g14-m3-new.tsv` (`harness/m4/g14errs.py`).

**Pile (a), restate: 193.** The promise is kept and lives elsewhere; the test now reads it there (`464fd3e75`, helpers in `tests-visual/dock-paint.ts`).
**Pile (b), fault: 75.** The build broke the promise; each is cured in the build.
**Pile (c), public name: 36.** The test's failure is a removed published name.

| spec | (a) | (b) | (c) | sites and reasons |
|---|---|---|---|---|
| release-10-1-1 | 5 | 0 | 0 | O-102(3) coarse collapse, focus and persistent (131, 150, 180): under R-2 a dock with no folded face rests open by touch; restated to a dock with a folded face (`face=1`) |
| release-10-1-2 | 0 | 6 | 36 | O-101 (441, 24 tests) and O-101a collapsed and mid-expand (490, 12): read `--dock-expanded-px`, removed (c); restated to the root's layout extent in the expanded posture. O-101a reversal (490, 6): a fault, the curve read ignored the run's own carry (b) |
| release-10-1-3 | 42 | 16 | 0 | O-110 first frame (159, 24) and critique-4 spill (603, 639; 18): read the root or its overflow box; restated to the plate and to the lane's inset clip (a). critique-3 (377, 8) and critique-7 under zoom (933, 8): faults (b) |
| release-10-1-5 | 125 | 53 | 0 | the used corner read as `9999px` (218, 295, 317, 335, 637, 988, 1430, 1505, 2028; 51), the cut cap restated to RU-13's stadium (839 h1, 1276/1293/1309 l1, 1381 m1, 2550 O-160; 66), the press aimed at paint (1573 O-177; 6) are (a). The fit law (722 e4, 1187 k3, 1409 m2, 1878 p1, 1924 p2, 2109 r1, 2222 s1, 2331 s2, 2371 t1, 2444 s4; 53) is (b) |
| release-11-0-1 | 21 | 0 | 0 | o2 and o3 (102, 112, 123, 139): the used corner (a) |
| **total** | **193** | **75** | **36** | 304 |

Every title in pile (b), all three projects unless marked:
- 10.1.2 O-101a · a host change during the morph · reversal (1440->390), (390->1440). Cured `f1b477c2a`.
- 10.1.3 · 390 · bottom-anchored reversal › D-1 (critique-3) · a collapse() mid-expand keeps the summary glyph inside the plate, and its 1440 and right-anchored variants (8). Cured `aefd682cd`.
- 10.1.3 · 390 · bottom-anchored · ancestor zoom 1.25 › D-1 (critique-7) · the summary glyph holds its box through the expand and the collapse, and its left- and right-anchored variants (8). Cured `3ccaf064c` (the expand) and `223925e09` (the collapse).
- 10.1.5 e4 at 390: a run whose seats all show, capped under its reserve, holds the fit law; k3 at 320: a capped dock whose seats all show holds the fit law and rests round; m2 a vertical run whose seats fit scrolls at most the ring floor's shortfall; p1 a dock its host resizes mid-expand holds every seat at the settle; p2 a 1-2 px host change across the fit edge mid-expand; r1 Q2 at 390: a nested group holding the current seat; s1 O-205 at 390: no collapsed dock has a scrolling run; s2 O-201 at 390: at every cap through the fit edge the end seats keep their whole ring; t1 O-201 vertical; s4 a host padding change across the fit edge mid-expand (53). Cured `9e4d772e2`.

Pile (c), the written list. **Kept:** `data-anchor` (the one name the master README documents), `data-run-fits` (written again by `9e4d772e2`), `data-morphing`, `--dock-expand-t`, `--dock-morph-t`, the `expanded`, `collapsed`, `pinned` and shape classes, the `./dock` and `./dock-trigger` exports. **Removed:** `--dock-expanded-px` and `--dock-collapsed-px` (the reservation, with `dockMorphMeasure.ts`), `--dock-plate-cross-px` and `--dock-cap-rest` as written lengths (the corner is the stadium's used value), `useDockMorphOrchestrator` (internal barrel only; not exported by `./dock`). **Renamed before publishing:** `--dock-halo` to `--dock-shadow-color` (never on master). The 36 tests that read `--dock-expanded-px` are restated to the root's layout extent, and their group bites (below).

The restated groups, each under a planted fault, read in headless Chromium against the dev server (the touch group in coarse-touch). Each bites:

| group | plant | sites failing under it |
|---|---|---|
| the used corner | the pill rests at 16 px | 14 |
| the painted box (10.1.3 O-110, critique-3, critique-7) | the plate jumps to the new layout on the trigger frame | 8 of 14 (the first version, the loop's clock started early, bit nothing and was rewritten) |
| the lane's clip | no lane clip in travel | 6 |
| the reservation | the root held at its starting size | 22 |
| R-2 by touch | every dock rests open under `(hover: none)` | 5 |
| the press at paint | the run takes no press while morphing | 2 |
| the cut cap (O-160, m1) | a cap keyframe restored | 1 |
| the fit law | `data-run-fits` never written | 6 |
| the zoom | reads not divided by the zoom | 3 |

**G-14 on the build `5883827f6`:** Chromium 536 of 552 pass (MEASURE-3's build: 328; master: 534); WebKit 72 of 77 and 183 of 199 (10 skipped). Against master's snapshot, 20 tests now fail on the build and pass on master, so pile (b) is not empty:
- 10.1.5 l1 · a cap lifted under a run scrolled to its end, and to its mid, rests round (8 Chromium, 4 WebKit), and k1 at 320: End, focus() and hover+focus land the end seat flush (coarse-touch, 1): RU-23's cap (`ab39f81b5`) is a `max-inline-size` on the run, which holds the run's preferred size down, so a dock whose room grows never grows to read it again. New with RU-23.
- 10.1.2 O-101a · a host change during the morph · mid-expand (1440->390) and (390->1440) (4 Chromium, 2 WebKit): one frame after the host change reserves 1019 px against a settled 976 (or 356 against 390): the root's layout is one frame stale after the change.
- 10.1.5 k2 vertical: a wide tab at a flush edge keeps its whole ring (WebKit, 1): the seat is never stable for `hover()`. Not RU-23's vertical cut: with it held off the test still fails. Cause unread.

The build passes 21 tests master fails: 13 O-101 cells in Chromium and 5 in WebKit, 10.1.3 critique-3 and critique-7 in coarse-touch, and 10.1.5 s1 at 1440 in WebKit. Dock unit specs: 249 pass and 1 expected failure of 250 (`logs/m4-units.log`). MEASURE-3 read 275: `dockMorphMeasure.test.ts`, 25 tests of the deleted module, is deleted with it (`817f555c3`, as C2-16 deletes the module); its laws are read in-engine by release-10-1-2 O-101 and O-101a and 10.1.3 O-110, and G-DOCK-MORPH's two cells are restated to the carrier's one post-flush read. No test of a module that remains was removed.

## Built, and not built

- **The token rename and the deletions** (`ea4d458a8`, `817f555c3`): built. G-12 reads them.
- **RU-23, the seven-seat rule** (`ab39f81b5`): built. After the compact run, a run that still does not fit is cut to a whole number of pitches and snaps a seat's start to its reserve. At 360 and 390, O-358's dock rests with six whole seats and one absent, no sliver, the current seat in view; the ten-seat run's 1.11 px sliver at the cap is gone (0 px). Its faults: the 13 G-14 tests above, and the six-seat controls dock at 360, which fits with its reserve yielded and now loses a seat. The cure tried after the chain (`ee45c764b`: the cut as end padding, and only a run that overflows its port) fixed l1, k1 and the six-seat dock, but read on its own build it left a 35.5 px partial seat at 360, content 7.43 px past the curve at rest and the ten-seat run 26 to 30 px past it in travel (`rows/m4r`). Reverted (`1966e12a9`).
- **RU-24, the names on the dock's one clock**: not built. The open seat's name still changes two seats' widths by 96 px in one row (G-4 at 1440 and right to left), and the compact switch moves a seat 104 px in one row (the seat set at 390).
- **The mark behind the open seat as a small plate**: not built.
- **G-11's trigger frame**: now 5 layouts. The trace carries no stack for them (the timeline category records no forced-layout stacks here), so the names are read from the source, not traced: the open run read without `data-compact` (`fitRun`), the span read after the compact decision (added by `9e4d772e2`), the curve inset written and the width read (`fitCurve`, C2-6's named second read), the new layout read (`rectOf`, `readSeats`), and the face that `display: none` gives back to layout when `[data-morphing]` opens the window (RU-17). The span read is avoidable when the compact decision does not change; not removed.

## G-2 and G-4's other readings

- **The sliver at the cap:** cured by RU-23 (0 px past the curve on the ten-seat run in both engines).
- **The outline past 1 px** (`logs/m4-outline-chromium.txt`, `harness/analyse.py`): the fold within 0.5 to 0.73 px of a stadium at seven held points; the layer change within 0.69 to 0.91 px at five held points and 1.16 and 1.49 px at two; the tall dock 1.03 px. Explained, not cured: the tall dock is a rest, whose corner is `9999px`, which CSS paints as an exact stadium, and the layer change's held points carry a radius of half their cross extent (54.58 px on 109.2 px). Each excess is the mask's floor (pixels changed by more than 40 of 255 over a faint glass edge), not the paint. WebKit's crops still have no mask.
- **The snap rest:** the plant is rewritten and bites. The earlier plant (the rest left at the painted offset) still reads GREEN, so `a112ec8c8`'s own fault is not shown: no cell reaches a rest off its snap position with the cure removed. `a112ec8c8` stays unproven as a cure; the gate is shown to read an off-snap rest.
- **New on this build:** keyframes's transport under reduced motion, 4.39 px past the curve in travel (MEASURE-3 read 0), in both engines. Its cause is not read; it is newer than `516f591b0`.

## What each commit changed

On `bl/dock/wi8`, after MEASURE-3's evidence commit `0f7e39d72`:

- `9e4d772e2`: the carrier writes the fit law (`data-run-fits`, `--dock-run-room-block`) on the trigger frame; its one writer died with `dockMorphMeasure.ts`.
- `f1b477c2a`: the curve read subtracts the run's own carry, so a one-row dock no longer reads a 200 px inset mid-fold.
- `aefd682cd`: a face that turns from leaving to entering gives back its hold translate (`collapse()` mid-unfold).
- `3ccaf064c`: the carrier divides every box it reads by the dock's effective CSS zoom.
- `223925e09`: an edge-anchored dock carries its regions by the root edge the layout keeps.
- `464fd3e75`: G-14 pile (a) and (c), the shipped witnesses restated; no test removed.
- `ea4d458a8`: `--dock-halo` renamed `--dock-shadow-color`.
- `817f555c3`: `useDockMorph.ts`, `dockMorphMeasure.ts`, the barrel's orchestrator and the module's unit spec deleted; G-DOCK-MORPH's two cells restated.
- `ab39f81b5`: RU-23.
- `494e21da6`: a touch lift starts the linger when its task ends. Found by the held-finger cell: the focus a tap on a seat gives cancelled the linger with no leave to restart it, so a touch-opened dock never folded after a tap on a seat.
- `5883827f6`: MEASURE-4's harness, and the harness page exposes the pill's `collapse()`. **The measured build.**
- `ee45c764b`, `1966e12a9`: the RU-23 correction, tried and reverted.
- `ebd546e7f`: read4 judges RU-23 as whole or absent; g6 reads the keyboard cell from its first arrow; G-14's clock plant rewritten. Each judge change came after the pass and is applied to the pass's rows.
- `05ef4c61c`, `1026093e6`: the evidence, gzipped, and the outline fits.

## Strips

None. The strips illustrate the fold (G-2) and the layer change (G-4), and neither gate passes.

## What did not run, and why

- **WebKit, a held finger:** Playwright has no held-touch input for WebKit; its cell dispatches touch pointer events, which do not focus the seat, so its plant does not bite there.
- **WebKit, the safe area and forced colours:** no override in WebKit 2287.
- **WebKit, the outline in pixels:** its headless glass cannot be masked.
- **G-11 in WebKit:** read by frame pacing in MEASURE-3; no WebKit cost cell ran here.
- **The atlas phone sheet:** not run, as in MEASURE-3.
- **The cause of 10.1.5 k2 in WebKit, the transport's 4.39 px under reduced motion, and the right-to-left layer change's first row:** found, not read to a cause.
- **Real Safari** and any headed browser: not run, by the machine's rules.

## Is this ready for an 11.2.0 build seat?

No. What is proven on `5883827f6`, in both engines with a biting plant: G-1, G-3, G-6, G-7, G-9 and G-12. G-14's 304 are sorted: 193 restated with biting plants, 75 faults cured in the build, 36 written as removed names with their promise restated. What is unproven, exactly:
1. G-14 is not green. 20 tests pass on master and fail on the build: 13 from RU-23's cap (l1, k1), 6 from a one-frame stale root layout after a host change mid-expand (O-101a), and k2 in WebKit, cause unread.
2. G-2, G-4 and G-8 fail RU-21: a lane hides the outlet's and fourier's seats 40 to 307 ms before the plate covers them.
3. RU-24 and the mark as a small plate are not built, so a change of open seat and the compact switch change seats' widths in one row (G-4).
4. RU-23 is built and paints whole seats, but it locks the run's size (l1, k1) and costs the six-seat controls dock a seat at 360 (G-13); the one correction tried painted worse and was reverted.
5. The right-to-left layer change moves the leaving face 10 to 12 px in its first row; keyframes's transport under reduced motion reads 4.39 px past the curve; neither cause is read.
6. G-11: 5 layouts on the trigger frame on Metal, against 3, and the block-flow layout at 4x 1.53 ms against 0.94. The span read is avoidable.
7. G-10's two swap cells still need the judge to split them.
8. `a112ec8c8` is unproven as a cure; the outline's excess over 1 px is explained as the mask's floor, not measured below it; nothing ran in real Safari.

The owner's open questions keep their stated defaults, and the mid-travel dip is as it was.
