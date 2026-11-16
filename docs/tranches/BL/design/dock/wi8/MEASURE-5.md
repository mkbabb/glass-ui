# W-I.8: the fifth build, measured

2026-11-15. Seat: the fifth build and measure. Model: claude-opus-5-5. I wrote none of the wave, the rulings, the challenges or the folds.

Paths below are relative to `docs/tranches/BL/design/dock/wi8/measure/` in the worktree `.claude/worktrees/bl/dock/wi8` (branch `bl/dock/wi8`). Gate numbers and bounds are `waves/W-I.8.md`'s, read with RULINGS-3 and RULINGS-4 (RU-25 to RU-35).

**Every gate reading in the table is on one build: `7b2b792a6`** (`logs/m5-build.sha`, `src` clean; its source is `d2b1f2636`'s). The page was built once with `VITE_DOCK_HOLD=1`, the library once without it. The pass, every plant, G-14 in both engines and G-14's restated groups under their plants ran in one chain (`harness/m5/chain5.sh`, 17:09 to 20:57). Engines: headless Chromium (rows of about 8.3 ms) and Playwright WebKit 2287 (about 16.7 ms). The WebKit lock never waited long. The load was not calm: it rose to 217 at 17:22, near the end of the Chromium probes, from something outside this seat (the guard held the next step until it fell), and sat at 7 to 45 for the rest. Three Chromium timing cells failed under it and were read again at load 12 (below).

After the chain, one cure (`d50460b34`, the fit law's port, G-14 below) was read on 10.1.5's fit-law sites and on six smoke cells. Those readings are marked as after the pass and are not in the gate table.

## The gates

Judges: `m5/judge6.mjs` (RU-25's lane, RU-34's split reduced-motion segments, RU-32's start-edge reading), `m5/read5.mjs` (RU-26 and RU-27 at open rest, RU-27's lift, RU-28's open seat), `m4/gates4.mjs`, `m4/g6.mjs`, `m3/seat4.mjs`, `read2.mjs`, `g9b.mjs`, `g12.mjs`. Plants: `m5/plants5.py` (`m5/plantrun5.sh`, `logs/m5-plant-*.txt`) and, for G-14's restated groups, `m4/g14plants.py` (`m5/g14plantrun.sh`, `logs/m5-g14plant-*.log`).

| gate | Chromium | WebKit 2287 | plant bites | verdict |
|---|---|---|---|---|
| G-1 · the clock | (a) 76.8 ms; (b) no open under a still pointer, 67 ms after the move; (c) 6522; (d) 12005, 6006 with the max at 6 s; (e) no fold, 6634; (f) a held finger holds, 6012 ms after the lift; (g) 6012; (h) outside 3.1 ms, Escape 4.7, `collapse()` 1.7 at 1440 and at 390; (i) 6541, one fold; (j) no fold; (k) 6540; (l) pinned, no fold in 15 s; (m) no fold under the pointer; the 390 clock: tap 6007, a seat tap 6017, outside 3.1 | as MEASURE-4, within 10 ms on every clause (`logs/clock2.m5.webkit.json`, `m4-cells.m5.webkit.json`) | yes, both: the linger token ignored (3605 ms); the lift scheduled before the tap's focus (a seat tap never folds, both; the held finger never folds, Chromium) | GREEN, with MEASURE-4's caveat: WebKit's finger is dispatched pointer events and its plant does not bite there |
| G-2 · the fold and the unfold | In the pass: 131 of 134 segments over 69 scenarios. Fails: the first row 75 ms after the tap at 360 (two cells) and 41 ms after the press outside (one), bound 34, all three while the load climbed to 217. Read again at load 12 (`logs/m5-rerun-judge-chromium.txt`): all six segments pass. read5: every fitting run shows every seat whole (the pill 4 of 4 at 1440, the six-seat controls dock 6 of 6 at 360, fourier 3 of 3, the outlet 4 of 4); the seven-seat dock at 360 and 390 rests at the room's width (344, 374) with 6 whole, 1 absent, no partial; content inside the curve within 0.02 px everywhere, keyframes's transport under reduced motion 0 (4.39 on MEASURE-4's build). **The lifted-cap cell (`p5-many-lift-fine`) fails**: after the host lifts its cap every seat shows 6 rows after the change (bound 2), and when the cap returns seat 6 is hidden in one row while its lane still covers it for 28 rows (the run's cap is CSS and instant, the plate's travel is not) | 134 of 134. The lifted-cap cell fails as Chromium (5 rows; seat 6 hidden 22 rows) | yes, both: the clock started at the trigger; the curve inset never written; the leaving face by its border box (4 px); the rim on the root (76 px); the touch rule removed; RU-25's lane 12 px inside the edge and the cut removed; **the rewritten lane plant (every corner rounded) bites, 1.62 px on the region cell**; RU-26's `fitWhole` restored (the controls dock at 360 loses a seat); RU-27 a length in place of the percentage, and the flag never set (a partial 8 px seat at 360) | fails, on the lifted-cap cell in both engines; Chromium's three timing cells fail in the pass and pass at calm load |
| G-3 · a reversal | 18 of 18 | 18 of 18 | WebKit only: the intent wait applied to a return (72 ms against 29). **No bite in Chromium** (MEASURE-4 read a bite in both) | GREEN, with the plant biting in one engine |
| G-4 · a layer swap, the open seat, the seat set | 41 of 44. Fails: `p3-swap-return-30`, the plate turning 289 ms after the return (bound 28); `p3-swap-layers-coarse`, the turn 25 ms against 24. Read again: swap-layers-coarse passes; return-30 read five times reads 289, 98, 24 (bound 23), pass, pass (`logs/m5-r30-chromium.txt`). seat4: every open-seat cell moves 0 seats; RU-28's clause reads 0 px (96 on rows/m4). The right-to-left layer change passes every segment (RU-32 below) | 43 of 43 | yes, both: the records ignored; the offset left to the run's reach (25 % in one row); the rest 9 px off its snap position; RU-28's open-seat width restored (96 px in one row); **the rewritten ghost plant (the removed control held anywhere in the run) bites, 8 and 6 rows hidden before covered**. **No bite:** the inline-size leg, which RU-28 left nothing to animate | fails, Chromium: return-30 turns late in 3 of 5 readings |
| G-5 | retired | | | retired with R-6 |
| G-6 · the hover guard | 1440 hover and sweep, 390 hover, keyboard: root and plate move 0.00 px, no fold | the same | yes, both: a name in flow (24 px) | GREEN. read5's own hover clause reads 225.66 px on the keyboard cell because that cell has no hover mark and the clause counts its keyboard unfold; G-6 is `g6.mjs`'s reading |
| G-7 · the outlet | every clause | every clause | yes, both: the provide removed | GREEN |
| G-8 · overlays | every clause, the sheet's press 5.8 ms | every clause | yes, both: the hold consulted on a press outside | GREEN (see the reserve note below) |
| G-9 · the published progress | 3 of 3, follower lag 0 rows | 3 of 3 | yes, both: the scope write removed (4 rows, 100 px) | GREEN |
| G-10 · reduced motion | In the pass 58 of 59: `p3-swap-xf-rm`, face 0 still fading 200 ms after the third change. Read again at load 12: 3 of 3 segments pass | 59 of 59 | yes, both: the reduced-motion seat removed, geometry on the spring (fold-pill, swap-layers and swap-xf cells) | GREEN in WebKit; Chromium fails in the pass and passes at calm load |
| G-11 · cost, and rest | Renderer `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`. The trigger frame, named by the hold build's marks: the unfold 2 or 3 layouts (read; reread when a flag changed; the write), the fold 2 to 4; **3 of 24 fold trigger frames read 4** (the pill at 4x twice, the controls dock at 4x once: the carrier's two plus two of the frame's own), bound 3. At rest 0 callbacks, 0 mutations, 0 animations in every cell. Median of five longest layouts at 4x: pill 0.955, flow 1.711, controls 0.977, seat 1.254 ms. Median layout after the trigger at 4x: flow 0.089 against pill 0.043 | not run (WebKit's side has no cost cell) | yes (Chromium): a loop left running at rest, 486 to 494 callbacks | fails by the letter of the 3-layout bound, on 3 of 24 trigger frames |
| G-12 · static | every clause over `src`, including no rule reading `--dock-expanded-px`, `--dock-collapsed-px` or `--dock-plate-cross-px`; `__dockHold`, `__dockPose` and the five `dock:` marks absent from the built library (read on `dist/`, which the library build writes whatever `--outDir` says) | (engine-free) | yes: a scale on `.glass-dock` | GREEN |
| G-13 · census, focus, hit, forced colours, safe area | every clause; the six-seat controls dock at 360 keeps every seat (0 clipped); the safe-area cell 50 px with a 34 px inset, 16 without | the same, forced colours and the safe area aside | yes: the hidden face keeps its box (both); the inset not read (Chromium) | GREEN |
| G-14 · the shipped line | below | below | every restated group bites | fails |

G-1, G-3, G-6, G-7, G-8, G-9, G-12 and G-13 are GREEN. G-2 and G-4 fail. G-10 is green in WebKit and fails in Chromium's pass reading. G-11 fails by the letter.

**The reserve note.** read5 also reads "content outside its region" at open rest, a clause stricter than RU-26's letter. It fires at 4 px on three overlay cells and on the keyboard cell in WebKit: every seat is whole, but the run has scrolled 4 px. The cause is master's design (`run.css`, THE RESERVE YIELDS): a fitting run's reserve yields down to the ring's reach and no further, so the run keeps 4 px of scroll, and a focus or the carrier's resting offset takes it. On rows/m4 the same cells read 44 px, because a seat was missing. I record it as a reading, not a gate fail. If the owner wants a fitting run never to scroll, that is a ruling.

### RU-25 and RU-34 in the judges

judge6's lane clause corrects two misreads seen on the smoke cells before the pass (`8a473c9e6`). A turn starts a new travel, so a seat the fold hid and the return shows again is not one shown again inside one travel. A seat scrolled out of the run's port is the port's to hide only in a run that does not fit. On rows/m4 the clause still reads the lost seat RED, in 130 segments.

### RU-32

The hypothesis was wrong. On rows/m4 the leaving face holds 0.00 px in the first row of the right-to-left layer change in both engines. The 9.9 to 12.2 px was the run box's left edge, which moves by the growth when a right-to-left run keeps its right edge. judge6 reads a face by its start edge, and the cell passes in both engines. No source change (`69a6655a5`).

### RU-30

On k2's page (a vertical house run, stage 360 px tall), with a temporary instrument, fitCurve wrote a cycle of five insets in WebKit (19, 30.75, 22.75, 33.5, 24.5 px), with 398 syncs from the root's observer in 2 s at rest. Chromium cycled two (22.5, 32), with 480 syncs; the ruling had assumed Chromium settled. After `79edb3b24`: 0 frame callbacks in 2 s at rest in both engines, and no inset. k2 passes in G-14 in all three projects.

### RU-29

The trigger frame reads once (`7f25448f1`). Reading the hold build's marks showed a second read on every fold and every unfold. The fit law flipped on the fold, because the leaving run's region is already laid out at the folded size, and flipped back on the unfold. `95a2612e9` makes the fit the open run's. After it, the unfold reads twice only on the first unfold of a page, and the fold reads once in the carrier (`m5/reread.mjs`). `4dd266c8c` marks the end of the change branch, so the cost cell can tell the carrier's layouts from the frame's own.

### RU-27, the lift

A host lifting its cap removes the flag, and the dock grows on the spring. No seat moves in the first row: the run box jumps 24 px, but seats are placed in their region (`a4a2682e6`), so the centring glides. The seats the growing plate reveals are shown as the plate reaches them, over 5 to 8 rows. That is the lifted-cap clause's FAIL ("every seat shows within two rows"). I think the clause's two rows cannot hold while the plate travels on the spring, and that is the ruling's to settle. The return of the cap is a real cut: the far seat goes in one row while the plate still covers it for 22 to 30 rows. Not cured.

`d2b1f2636` scoped the cap to the open run. A run leaving on a fold had kept its flag, and the percentage of the folded region collapsed it to its 4 px padding in the fold's first row (found on the seven-seat dock at 390 in the smoke cells).

## G-14, triaged (RU-22)

The build is compared with MEASURE-3's base logs on master's snapshot (`99a1389e6`, unchanged; `harness/m5/g14cmp.py`, `logs/m5-g14-cmp.txt`). 278 tests a project.

| project | new failures | failing on both | passing only on the build |
|---|---|---|---|
| chromium-headless-new | 7 | 2 | 6 |
| coarse-touch | 8 | 2 | 8 |
| webkit | 7 | 4 | 4 |
| **total** | **22** | 8 | 18 |

The 304 of MEASURE-4 are gone: its pile (a) restates and pile (b) cures hold. The new set is one family, all pile (b), fault: 10.1.5's fit law, e4 (723), k3 (1189), p2 (1936) and s2 O-201 (2343), at 1440 and 390, in every project. The fault is `a4a2682e6`. It read the fit law's port as the layers region, which is 4 to 8 px short of the run's client box, so a run whose seats fit by the ring's yield read as not fitting (`"fits":false,"span":205,"port":209`). Bisected: the four sites pass on `21dcafb37` and fail from `a4a2682e6`.

After the pass, `d50460b34` reads the shipped port again: the run's client box, read uncapped. A capped run is a run that did not fit, so its port is the region plus what the run's box added to the region when last read uncapped and not fitting. In Chromium, e4, k3 and p2 pass (`logs/m5-post-fitlaw-chromium.log`), and the six smoke cells read as in the pass (`logs/m5-post-read5-chromium.txt`). **s2 still fails**: from cap 266 to 273, the flag says fits with the span 1 px over the port (`"fits":true,"span":250,"port":249`). The capped reading overshoots by a pixel and the flag holds against its own cap. WebKit and coarse-touch were not rerun on the cure.

The 8 failing on both are O-101's reversal at 446 (2 of 4 in Chromium and coarse-touch, 4 of 4 in WebKit), which fails on master's snapshot too.

No pile (a) or (c) is new. RU-35's names are outputs again, and the new witness (`cadb23cac`, 10.1.2:490) passes in all three projects and fails under a planted fault (the outputs never written). 10.1.5 r1 Q2 (2121), the open-seat site I had expected to fail, passes: it reads the flag against the layout, not the open seat's width.

**Behaviour changes for the owner (pile (c), RU-28):** every seat of a run is one seat wide, the current one included. The unit witnesses that asserted the open seat's width (`tests/components/custom/dock/g-dock-lattice.test.ts`, G-DOCK-REACH and G-DOCK-STATE) are restated in `bd904841f`. The geometric carrier of selection ("the geometric carrier is real on both orientations") is kept as `it.fails`, so the promise is not dropped silently. `tests-visual/release-10-1-5-critic-11/12-r11.spec.ts:399` reads the open seat; it is outside G-14's suite and did not run. `--dock-open-pitches` and `--dock-open-seat` stay declared and unread.

Restated groups under their plants (`logs/m5-g14plant-*.log`): corner 14 fail, clock 8, lane 6, reserve 16, touch 5, press 2, cap 1, fits 6 (the plant rewritten for RU-29's source), zoom 3. Every group bites.

Dock unit specs: 248 passed, 2 expected failures, 250 (`logs/m5-units.log`).

## What each commit changed

From `git log` on `bl/dock/wi8`, oldest first:

- `fd85ea40f` judges first, read on rows/m4: judge6, read5, analyse6. read5 is RED in 83 cells there, and read4's whole-or-absent is undone.
- `21dcafb37` RU-26 and RU-28, deletions only: `fitWhole` and its lifts, the open seat's width rules and their vertical pair, `data-compact`.
- `a4a2682e6` RU-27: the `data-run-whole` flag and the `round(down, …)` cap in `run.css`, centred, with scroll padding at the reserve; a seat's place is read in its region. The port it read is the G-14 fault above.
- `185b756eb` RU-31: a lane that shares a plate end and is narrower than its radius is written `inset(50%)`.
- `69a6655a5` harness for RU-27 and RU-32; RU-32 read and found wrong.
- `79edb3b24` RU-30: no curve inset on a run whose fit law fails.
- `d2edd63c5` RU-30's reader.
- `7f25448f1` RU-29: one read on the trigger frame; `exchange()` before `data-morphing`; the hold build's marks.
- `44903a00a` RU-35: the three outputs written on trigger frames, read by no rule; `--dock-cap-rest` stays a declared length, as on master.
- `3b0d84767` `a112ec8c8` removed. The rewritten snap plant bites without it, and no cell reads RED without it, so it stays removed.
- `95a2612e9` RU-29: the fit is the open run's.
- `4dd266c8c` RU-29: the `dock:end` mark.
- `bd904841f` the unit witnesses the rulings changed, restated.
- `c032d85fd` the pass harness.
- `d2b1f2636` RU-27's cap on the open run only.
- `8a473c9e6` judge6's lane clause corrected.
- `cadb23cac` RU-35's witness.
- `7b2b792a6` the chain; **the measured build**.
- `d50460b34` after the pass: the fit law's port (above).
- `12d492046` after-pass harness; the after-pass logs follow it.

## Strips

- `fold/strip-fold-5.png`: v11.0.1 above (the rows of the first strips, kept as shot) and this build below, the fold held at seven points, Chromium and WebKit 2287.
- `fold/strip-swap-5.png`: the same for a layer change (two rows to four).
- `fold/crop-many-5.png`: the seven-seat dock (five tabs, two avatar seats) open at rest at 360 and 390, at the start and the end of its run, both engines. It is shot on `d50460b34`'s source. Every frame reads 6 whole seats and 1 absent, the run 312 px, the dock 344 and 374.

The fold strip shows what G-2 reads. The swap strip is G-4's layer change, which passes. G-4 fails on a timing cell the strip does not show.

## What did not run, and why

- WebKit's cost cell (G-11): the side has none, as in MEASURE-4.
- The cure `d50460b34` was read in Chromium only, on the four fit-law sites and six smoke cells. The whole pass, G-14 in WebKit and coarse-touch, and the plants were not rerun on it.
- `release-10-1-5-critic-11/12-r11.spec.ts`: outside G-14's suite.
- Forced colours and the safe area in WebKit 2287: no emulation there.

## Is this ready for an 11.2.0 build seat?

No, not yet. Most of the fifth pass's work held. The judges read the rulings, the deletions left nothing behind, RU-31, RU-30 and RU-35 hold in both engines, and RU-32 is a reading, not a fault. G-13's six-seat dock keeps every seat, and the seven-seat dock rests whole or absent in both engines. G-14's 304 are down to one family. Three things remain. First, the fit law: `d50460b34` restores three of its four sites, but s2's one-pixel overshoot means the capped port still needs a reading that cannot hold against its own cap. Second, RU-27's lift: the return of the cap cuts a seat in one row, and the lift's two-row clause needs a ruling against a plate on the spring. Third, Chromium's return-30 turns late in 3 of 5 readings, and three fold timings failed under a load spike (both deserve a calm rerun). I would put the build seat after one more short pass: s2 cured, the cap's return cured, and the whole set read once on one build at calm load.
