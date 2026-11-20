# W-I.8, the second fold

2026-11-15. Seat: fold. Model: claude-fable-5-2.

This folds `challenge-2.md` (C2-1 to C2-19) and the open findings of `MEASURE.md` into `docs/tranches/BL/waves/W-I.8.md`, which is rewritten in place, and updates `OWNER-READ.md`. Where a finding needed a reading, the prototype was amended on the worktree `.claude/worktrees/bl/dock/wi8` (branch `bl/dock/wi8`), one commit per amendment, and read in Chromium and in Playwright WebKit 2287. No gate is loosened. Four bounds are added and three gates read something they did not read before.

## What was read and run

Read in full: `challenge-2.md`, `W-I.8.md`, `MEASURE.md`, `fold.md`, `challenge.md`, `OWNER-READ.md`, the two inputs of 2026-11-15, and the precepts on motion, restraint and the affordance map.

Builds, named as the wave names them: **P3** is `1138eb94f`, the build `MEASURE.md` read. **F2** is `62da68e53`, the build this fold leaves. Its harness, logs and gzipped rows are at `51c42f017` under `measure/harness/` and `measure/rows/` on the worktree (`rows/f3` is F2; `rows/f2` and `rows/w062` are the two content windows that were tried and refused).

Runs, every one through `guarded`, WebKit under `--exclusive webkit`, headless shell, one browser per run and a context per cell:

- The side cells the challenge names (`c2.mjs`), first on P3 in Chromium so each fault was seen failing, then on F2 in both engines.
- Thirty cells of the P3 gate set on F2 in both engines, judged by `judge3.mjs` unchanged.
- Crops of a fold and of a layer change held at seven points (`crop.mjs`, which gates `requestAnimationFrame` in the page and uses no test hook), each shot with the dock and with the dock hidden, and the outline fitted in pixels (`analyse.py`).
- The unit suite: 226 pass and 1 fails of 227. The failure is the expected one, a test that asserts the `keepDockOpen` reading C2-10 removes.

No run was refused. One WebKit lock wait of a few minutes, far under the hour.

## The challenge's findings

| Row | Evidence | Disposition | Commit | Read on F2 |
| --- | --- | --- | --- | --- |
| C2-1 | True. On P3 the worded face overflows its circle by 43.7 px (33.2 px at 390). | Built. The folded face is as wide as its content with a floor of its own height. R-12 and G-2 say so. | `fbdecde4d`, `6dba45dbe`, `e9fba1d12` | 105.4 by 52 in Chromium, 100.4 by 52 in WebKit, words 12 px inside each cap. A one-glyph face is 52 by 52. |
| C2-2 | True. 48 by 52 on P3. | Built. The controls preset sets its seat size. | `0dc454c9f` | 52 by 52 in both, the end seat 4 px from the plate on every side. |
| C2-3 | True. A jump of up to 9 px, then a stall. | Built. A return to a face still on screen inverts the exchange where it is. New bound "A return" in G-4. | `48578394d` | The face moves 0 px (Chromium) and 0.36 px (WebKit) on the return frame; the leaving face is under way in 33 to 35 ms. |
| C2-4 | True. 117 and 118 ms under 0.3 on P3. | Built in part. The entering face rises at once when nothing else is above half strength. | `48578394d` | 51 to 58 ms in Chromium, 34 to 51 ms in WebKit. Halved, and still over the two-frame bound in three cells. Left failing. |
| C2-5 | True. The gate counted a face at 0.12 as showing. | Gate tightened: new bound "The strongest face" (the strongest face is never under 0.3 for more than two frames). The cure was built at a window of 0.7 and of 0.62, read, and reverted. Both close the dip and both print two faces over each other for about three frames, which is the overlap the owner named. The default stays out, then in. OQ-9 puts the choice to the owner with the crop. | `6005b02dd`, then `62da68e53` | At 0.55: a plain fold is under 0.3 for 25 to 35 ms and passes; a reversal at the middle is 85 and 98 ms and a late return 60 and 83 ms, and those fail. |
| C2-6 | True on both counts. | Gate: new bound "The outline", read in pixels from held crops, not from the number the loop writes. Rule for content in a tall stadium written as a default (pad the ends so the content box lies inside the curve) and put to the owner as OQ-7. The padding is not built. | harness only | Chromium: the outline is within 0.56 to 0.73 px of a stadium through the fold and within 1.03 px through the layer change, bar one point at 3.41 px. WebKit: unread, since its headless glass has no backdrop blur and cannot be told from its ground. `fold/crop-tall.png` shows the content past the curve. |
| C2-7 | True. | The text now says what is painted: one shadow of four layers, the same rim every glass surface has. `--dock-halo` is `--dock-shadow-color` in the wave. G-12 reads the painted layers. Whether the white line and the undirected shadow stay is OQ-8. | text only | The rename is not in the prototype. |
| C2-8 | True. On P3 the run's lane is 8 to 54 px of 349 px for 59 rows. | Built. | `c6387932e` | The lane opens to 372 px in both. Read on a harness cell with `dir=rtl`; no mounted right-to-left page is read. |
| C2-9 | True. | Cured in the harness: coarse cells in WebKit tap by touch. That turned up a fault of its own, below. New rule in R-2: a dock with no folded face to tap stays open under `(hover: none)`. The rule is not built. | `51c42f017` | keyframes's transport dock does not open by a touch tap in WebKit. |
| C2-10 | True. The dock folds under its own open menu. | Built. Select, DropdownMenu and Popover hold the dock they were opened from. `keepDockOpen` is no longer read and is listed for deletion. | `86e8f47b3` | All three hold in both engines. Escape closes the menu first and the dock second. |
| C2-11 | True. | Built. The count comes from the run's own state and, before mount, from the authored slot. | `d4211a9db` | A dock whose one control is its own element stays open; a button and a slider fold; no folded glyph is painted first. |
| C2-12 | True by reading. | Built. Only a dock fixed to the window adds the safe area, on the side its corner is on, in either direction. | `0dc454c9f` | Read from source. A headless engine reports no safe area, so no row can show it. |
| C2-13 | True. Escape, then 3 px of movement, reopens on P3. | Built. New clause in G-1. | `eecf1bc59` | Stays closed through movement inside; reopens after a leave and return, a press, or focus. |
| C2-14 | True as argued. | The controls preset lingers 3 s, growing to 6 s. Written as a default; OQ-2 now asks it too. | `0dc454c9f` | Two controls docks fold 3.17 and 3.18 s after the pointer leaves. |
| C2-15 | True. | Ruled in the wave as a default: a compact run first, and a cap of six controls in a controls dock. Neither is built. | text only | Unread. |
| C2-16 | True. | The pose hook is behind a build constant under one name, which G-12 scans the built script for. The modules still to delete and the crossfade outside the dock are listed in the build order. Not deleted here. | `48b64d760` | By source. The built script was not scanned for the name in this fold. |
| C2-17 | True. 50.8 px in one row, 77 % of the travel. | Built. A resize during a travel retargets it. G-7 reads it. | `89f30a3c3` | The largest row is 10.1 px in Chromium and 20.5 px in WebKit. |
| C2-18 | True. 192 to 202 ms. | Built. The loop parks at the 0.25 px floor. New bound "The window's close". | `e62ee7f9e`, `c6f148b86` | 100 to 150 ms. The second commit cures a 1.41 px step at the landing that the tighter park exposed in WebKit. |
| C2-19 | True. | `OWNER-READ.md` is rewritten on F2 with new strips, and the wave's records section names every file. | this fold | `fold/strip-fold-2.png`, `fold/strip-swap-2.png`, `fold/crop-tall.png`, `fold/crop-window.png`. |

## The findings `MEASURE.md` left open

| Finding | Disposition |
| --- | --- |
| A seat is held visible until covered, and the lane hides it a row or two early (seat 3 of the outlet and region cells). | The two clauses conflict and one must give. This seat was told to loosen nothing, so both stand and the cells fail: two rows in Chromium on the outlet, one row in both on the region. The wave carries the proposal for the next ruling seat. |
| A small retarget turns late. | Partly the harness: a tap lifts 15 ms after the mark, so the turn was timed from the wrong instant. The wave counts from the cause. The reversal of a fold at a quarter is 35 ms against 34 in Chromium, one row over, and is left failing. |
| A menu does not hold the dock. | Cured, C2-10. |
| A control joining or leaving an open dock lands in one frame. | Ruled in R-5, not built. |
| G-11's fourth layout is unnamed. | Still unnamed. The wave says so and the build order has a step for it. |
| O-358. | Ruled, C2-15. |

## What the judge says of F2

Thirty cells in each engine. Chromium: 71 travels, 12 failing lines. WebKit: 69 travels, 9 failing lines. Six of each are one judge artifact (the open-seat cell's first row is read before the mark) and are named as such in the wave, not waived. The rest are the failures already listed: the outlet and region seat, the fold reversed at a quarter, the third switch, the tap latency on the coarse layer cell, the reduced-motion layer cell the judge does not split, and the current seat moved twice at 390, which fails in both.

## Not done

- The whole gate set on F2. Thirty cells were read, not the 114 travels of P3's pass.
- The counter-test for each new bound. Each fault was seen failing on P3 first, in Chromium, but no planted fault was run against the new bounds on F2.
- Content padded inside a tall stadium; a control joining or leaving; the dock with no folded face under touch; the compact run and the cap of six; the token rename; the deletions of C2-16.
- The outline in WebKit, and anything in real Safari.
- The release specs of the shipped versions against F2 (G-14).

## Is this ready for an 11.2.0 build seat?

No, not as a build that can close. The carrier, the clock, the hold, the controls preset and the folded face are built, read in both engines, and specified closely enough that a build seat can start from `62da68e53` and follow the wave's build order. What is unproven is this, exactly. No gate has passed in both engines with its counter-test read on one build, and F2 itself has been read on thirty cells, not the whole set. Five behaviours are ruled and never built: content inside the curve of a tall stadium (and the owner may yet choose a rounded rectangle, OQ-7), a control joining or leaving an open dock, a dock with no folded face staying open under touch (without it keyframes's transport cannot be opened on a phone in Safari's engine), the compact run with the cap of six, and the reading-progress rim. Four readings still fail on F2: the dip when a travel is turned at its middle or a layer change is returned late or switched a third time (its only known cure is the overlap the owner refused, so it waits on OQ-9), the current seat moved twice at 390, the seat that the lane hides before it is covered (which waits on a ruling between two clauses), and the fold reversed at a quarter by one row. The outline is proven in pixels in Chromium only; right-to-left is proven on a harness cell and on no mounted page; the safe-area rule is proven by source only; G-11's fourth layout has no name; and G-14 is unrun. A build seat should take the whole pass on `62da68e53` as its first step and treat OQ-7 and OQ-9 as the two answers that can change what it builds.
