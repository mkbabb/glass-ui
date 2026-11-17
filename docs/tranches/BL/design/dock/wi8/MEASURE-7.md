# W-I.8: the seventh build, measured

2026-11-17. Seat: the seventh build and measure. Model: claude-opus-5-5.

**NOT READY.** By RULINGS-6's final ready list these fail:
- **G-2** (Chromium 104 of 110 segments, WebKit 109 of 110) and **G-4** (Chromium 41 of 43): a fade reads 73 or 74 ms against judge7's 75.
- **G-3** (Chromium 16 of 18): two reversal rows.
- **G-8**: the trigger clause on touch (the popover in both engines; WebKit's Select and Sheet), and the dialog's outside press (both).
- **G-11** (Chromium): 6 of 36 trigger frames read 4 layouts with no flag. RU-53 could not be built.
- **G-13**: the seat census line, both engines.
- **G-15**: both engines.
- **G-16**: the dock entry is 23,080 B gzipped against v11.0.2's 17,827.
- **The public names**: 82 against v11.1.0's 80.
- **RU-54's plant does not bite** on its gate's cells: fit7's cells and s2 (at 1440 and 390, in all three projects) pass with the memory removed.

Everything else on the list reads GREEN in both engines, each with a plant that bites: G-1, G-6, G-7, G-9, G-10, G-12, G-14 (no failure master does not also have, in all three projects), the capped persistent-width cell, and dock lines (10,614 against 10,880). RU-61 is reported as not built, which the list allows.

Three of the red readings come from where the instrument draws its line, not from a change in the build. Each is shown below with its numbers:
- G-2's and G-4's fades are the same fade MEASURE-6 read, sampled on the other side of 75 ms.
- G-3's two rows turn on one frame's phase at the turn.

They stay red because the gates say so. The cause is for the orchestrator to rule on.

**Build:** `943fe6e9d66a6387ac2e88f9b92a240ce7d26902` on `bl/dock/wi8`, src clean at the build (`logs/m7p-build.sha`). The pass's own commit (below) adds harness and logs only.

Paths below are relative to `docs/tranches/BL/design/dock/wi8/measure/` in the worktree `.claude/worktrees/bl/dock/wi8`.

## The power hold

From 19:04 on 2026-11-16 the glass-ui session paused this seat's runs with SIGSTOP under its 40/80 battery rule (`docs/tranches/BL/driver/power-hold.py`). The seat stopped fighting it (`m7/resume.py` was killed) and moved every remaining run into `m7/runq.py`, a queue of small guarded runs that reruns an item a pause killed, so a pause costs one item. The pass (step 8) ran from 00:19 to 04:58 on 2026-11-17, and its one follow-up (RU-54's plant on s2) from 05:06 to 05:26, with the charger connected. The battery rose from 88 % to 99 % and no pause hit it. The only waits were for the machine-wide WebKit lock: 8 minutes once during the probes, and 16 minutes before the follow-up's WebKit run. Neither passed 60 minutes.

## The commits

| step | commit | what |
|---|---|---|
| 1 | `0da3e3f41` | the instruments: `dock:rect`, `dock:ro-miss`, cost7, owner7's `openDock` and scheme read, ink7, words7, G-16, the name table and line counts read on `ddfa8a2ba` |
| 2 | `668e02a82` | the removals, after the grep of the eleven apps and glass |
| 3 | `f31213682` | the readings that decide a cure; the recount |
| 4 | `d5d3f09b0` | RU-54: the fit decided once per room and remembered |
| 4 | `c5c2b6d50` | RU-52: a run whose seats all show is not a scroll port |
| 4 | `fb637fd31` | RU-55 with RU-65: a glyph never sizes its seat |
| 4 | `ec71b3cd4` | RU-62: the trigger of an open surface |
| 5 | `dc36e7ec2` | RU-56: the fills from the dock's ink, 10 / 20 / 28 % |
| 5 | `c48cd7d59` | RU-57: the ladder read with full ink; level 0.4 stands |
| 5 | `6269ed6ad` | RU-58: glass's compositions carry no size class on a seat's glyph |
| 6 | `458e66e58` | RU-61 as a prototype, saved as a patch, not in the pass |
| 7 | `943fe6e9d` | the two small adds: the trigger's seat height, the group as a frame |
| 8 | `3a923d2ea` | the pass: harness, logs, rows (no source) |

## The gates

Every cell was read at a load of 36 or under. The 668 probe rows' loads run from 4.99 to 16.86 (`logs/m7p-void-*.txt`: none over 36). The queue's runs started at loads from 3.9 to 17.5 (`logs/m7-runq-step8.log`). The plants started at 5.2 to 14.2 (the first line of each `logs/m7-plant-*.txt`).

| gate | Chromium | WebKit 2287 | the plant | verdict |
|---|---|---|---|---|
| G-1 · the clock | every clause as MEASURE-6, leaf for leaf within 25 ms (`m7/sidediff.py`): (c) 6517, (d) 12006 and 6005, (e) 6636, (g) 6010, outside 2.9 and Escape 2.8, (i) 6532, (k) 6528; a held finger holds and folds 6017 ms after the lift; a seat tap 6016; RU-43's rail rests open | the same; (f) by the unit witness (342 tests pass, 1 expected fail) | g1-linger bites both (3605 / 3604 ms). g1-lift: the cells bite in both (after the lift and after a seat tap the dock does not fold in 8 s); **the unit witness passes under it** (it failed in MEASURE-6) | GREEN |
| G-2 · fold and unfold | **104 of 110 segments over 56 scenarios.** Six fail one clause, "a fade lasts at least 75 ms": `full`, `summary` or `seat#n` reads 73 or 74 ms (p3-fold-two-fine, -wide-fine, -wide-dark, -ctl6-c360, -rim-coarse, -ctl-te-parent-coarse) | **109 of 110**: p3-fold-ctl-te-parent-coarse, `full` and four seats at 74 ms | every G-2 plant bites both: the clock, the curve, the touch rule, the rim, the held face, the lane corners (on p3-region-rm only, 1.62 px, as in MEASURE-6), `fitWhole`, the whole-seat flag twice, the lane inset, the neighbour cut, the room on the spring | **RED by the letter.** See "The fade at 75 ms" |
| G-3 · a reversal | **16 of 18**: p3-rev-fold-25-press (seat#3 hidden in one row while it meets its lane by 0.5 px) and p3-rev-fold-25-ptr (seat#3 shows again after the turn, 32 rows) | 18 of 18 | g3-retarget bites both (30 / 24 rows) | **RED in Chromium.** See "The reversal at 25 %" |
| G-4 · layer swap, open seat, seat set | **41 of 43**: p3-swap-xf-coarse and -fine, `face#0` fade 74 ms. seat4: every open-seat cell moves 0 seats. Return-30 ×20: no late turn | 43 of 43; return-30 ×20: no late turn | the join, the snap, the scroll offset, the open seat's width and the group frame bite both. **g4-ghost bites in neither** (the removed control is never hidden: RU-52 left a fitting run unclipped, so holding the control inside it hides nothing) | **RED in Chromium**, the same fade clause |
| G-6 · hover, focus, press | hover at 1440 and 390 and the keyboard cell 0.00 px; the press 0.01 px (seat#1), by g6c's per-axis unscale | the same; the press 0.01 px (seat#2) | g6-flow bites both (24 px); g6-overflow bites both (the press 4 px; the keyboard cell 4 px in WebKit) | GREEN |
| G-7 · the outlet | every clause, identical to MEASURE-6 | the same | g7-provide bites both | GREEN |
| G-8 · overlays | **the trigger clause** (`m7/trig7.mjs`): menu, select, popover and sheet by mouse, and menu, select and sheet by touch, GREEN; **the popover by touch does not open from its seat and the dock folds**. **A press outside an open dialog** no longer folds the dock: the dialog closes, focus goes to its seat, and the dock stays open (in MEASURE-6 it folded at once). Every other clause as MEASURE-6 | **trigger clause:** the four by mouse and the menu by touch GREEN; **the popover by touch fails as in Chromium; the Select and the Sheet do not close on the second tap**. The dialog's outside press as in Chromium | g8-hold bites both (no outside press folds the dock); g8-trigger bites both (the sheet's scrim press folds the dock at 5.4 / 6 ms) | **RED.** The dialog: RU-62's stamp on the shared scrim, below |
| G-9 · the published progress | 3 of 3, lag 0 rows | 3 of 3 | g9-scope bites both (4 rows) | GREEN |
| G-10 · reduced motion | 44 of 44 over 18 scenarios | 44 of 44 | g10-rm bites both | GREEN |
| G-11 · cost, and rest | renderer `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`. Of 36 trigger frames, 11 read 2 layouts, 18 read 3 and 7 read 4. One of the seven is a named flag frame (w-flow 1x, RU-54's second read, bound 4). **Six are over**: pill 4x twice, flow 1x, flow 4x twice, seat 4x. Each holds `dock:rect`, an "after the carrier" layout with no stack, the backdrop luminance sampler in a ResizeObserver flush (`useGlassBackdropLuminance`), and a frame layout with no stack. At rest: 0 callbacks, 0 mutations, 0 animations in every cell. Median of the five longest layouts at 4x: pill 1.01, flow 1.83, seat 1.01 ms. The controls cell reads no trigger frame: it rests open, see "ControlsDock at 1440" | not run (no cost cell in WebKit) | g11-rest bites (about 500 callbacks at rest in each cell but the controls cell) | **RED** (RU-53 not built, below) |
| G-12 · static | every clause; `__dockHold`, `__dockPose` and every `dock:` mark (read, flags, reread, write, rect, ro-miss) absent from the built library (`logs/m7p-g12-dist.txt`) | engine-free | g12-scale bites | GREEN |
| G-13 · census, focus, hit, forced colours, safe area | every clause as MEASURE-6. At 390 coarse every seat's hit box is 44 by 44, with the glyph at 39.6 px (0.9 of 44). **The seat line** (`m7/census7.mjs`): 50 reads fail. The worded seats hold one block extent at every share, but not `--dock-control-size` (tab seats 38.59 px at 1440 and 38 at 390; the labelled icon seat 35.91 and 32.78). The glyph line is GREEN (four forms, icon and tab seats, shares 0.5 to 0.9), and so is the composition line (39 of 39) | the same three lines; the same 50 seat reads | g13-box bites both; g13-safe bites (16 px from the bottom with a 34 px inset); g13-tabsvg bites both (the tab pictures' glyph line); g13-trigseat bites both | **RED** on the seat line |
| G-14 · the shipped line | 280 tests: **no new failure**; failing on master too: none | coarse-touch, 280: no new failure; failing on master too: 2 (O-101 reversal 1440→390, horizontal and vertical). WebKit, 280: no new failure; failing on master too: 4 (O-101 reversal, both axes, both directions) | every restated group bites (corner 14, clock 8, lane 6, reserve 16, touch 5, press 2, cap 1, fits 7, zoom 3 failures under the plant) | GREEN; detail below |
| G-15 · ink over a busy field | 88 cells, 3 failing: nav's Reports at 4.35:1 in dark over the field (folded and open), and chrome's folded hexagon face at 2.89:1 (it carries its own `h-4 w-4`). **The mark** is below v11.0.2 on one cell: dials Lin 1.514 against 1.774. Hover against current: 16 reads, the least 1.253. **The loose `DockControl`** differs from v11.0.2 in 4 reads | 88 cells, 1 failing: canvas-tools's grid glyph reads 1:1, as in step 5. The marks are all at or above v11.0.2 (24 reads); hover's least is 1.264. **The loose cell** differs in 5 reads | g15-baked bites both: 14 marks below v11.0.2 and all 16 hover reads under 1.2. Under it the words all pass (least 6.88 / 7.43:1) | **RED.** The loose cell: see RU-56 |
| G-16 · the dock entry, gzipped | **23,080 B** (gzip −6) against v11.0.2's 17,827 (+5,253, +29.5 %); the closure is 35,761 B against 38,758 | engine-free | none (a size) | **RED** |
| capped persistent width (`w-pwords`) | the flag equals the lifted read across 6 crossings; the sweep's flag is the same both ways at 363; 0 writes at rest | the same | g14-fitsibs bites both (2 crossings read `fits` where the lifted read says no) | GREEN |

### The fade at 75 ms

judge7's clause measures from the last sample within 0.02 of one end to the first within 0.02 of the other, and asks for 75 ms or more.

The fade it reads is the same as MEASURE-6's. Interpolated between samples from 0.98 to 0.02 (`m7/fadelen.py`), the outgoing face takes:

| | this pass | MEASURE-6 |
|---|---|---|
| Chromium | 72.9 to 77.3 ms | 73.2 to 76.6 ms |
| WebKit | 73.1 to 78.5 ms | 74.5 to 82.4 ms |

MEASURE-6's worst sampled reading was 74.8 ms, which judge7 rounds to 75 and passes. The fade sits on the bound, so the phase of the samples decides which side a reading lands on. No source in this pass touches the faces' fade.

### The reversal at 25 %

The fold's travel against time matches MEASURE-6 within one frame's phase (the lane inset at 47.7 ms: −121.9 px then, −125.7 px now).

- **The ptr row.** The turn's mark fell on a frame where seat#3 still showed a 2.3 px sliver. The fold's momentum carried the lane three frames past the mark, which hid the seat, and then it came back. judge7 starts a new travel at the turn's mark, not at the lane's turn, so it counts the sliver as shown in the old travel and the return as "shows again". In MEASURE-6 the same frame read the seat already hidden.
- **The press row** is the 0.5 px edge. In one row seat#3 meets judge7's lane by 0.5x px while the clip, inside its own 0.5 px lane tolerance, hides it.

### ControlsDock at 1440

Step 2 deleted `ControlsDock`'s `collapse`. RULINGS-6's reason: no site passed it, and "the preset computes its own collapse". The preset folds only on a phone (`ControlsDock.vue:58-61`): with one control it never folds, and with more it folds under 40rem. The harness's controls cells (`w-ctl`, `w-ctlout`, `w-fourier`, `w-sci`, `w-kfcode`, `w-two-a`) passed `collapse="closed"`. That is now an attribute, and the preset's own binding overrides it. So at 1440 every controls dock rests open and never folds:
- 21 probe scenarios have no fold to judge: the 1440 fine, dark and reduced-motion rows of ctl-be, ctl-bs, ctl-te-parent, ctl-ts-parent, ctlout, fourier, sci and kfcode. That is why G-2 reads 110 segments over 56 scenarios where MEASURE-6 read 134 over 69, and G-10 44 over 18 where it read 59 over 26. The 390 coarse rows still fold and are judged.
- c2's C2-14 (a brush on one of two controls docks: when does it fold?) and C2-1's 1440 worded folded face read an open dock.
- The cost cell for the controls dock reads no trigger frame, and g11-rest reads 0 there.

The preset does what the ruling said it would. This is reported for two reasons:
- A site that wants its controls folded at 1440 can no longer ask the preset for it. The cells model three such sites: fourier's canvas tools, sci-report's filters and keyframes's code panel.
- The pass reads less than its cell list suggests.

### The dialog's outside press

RU-62 stamps a modal surface's scrim as part of the surface: `ModalOverlay` passes the stamp on, and Sheet and Dialog spread it. A press on the scrim is then the surface's own dismissal, not the dock's outside press. RU-62 says so for the Sheet ("releases the dock into its linger; it does not fold it"). The Dialog shares `ModalOverlay`, so its scrim now behaves the same way. G-8's clause from MEASURE-5 ("a press outside folds the dock at once") therefore reads RED on `dialog-outside` in both engines. Which of the two a dialog should do is a ruling the seat does not make.

## G-14 against master

Six release specs (10.1.1 to 11.0.1), three projects, `--workers=1`, against master's snapshot (`logs/m3-g14-base-*`), by `m6/g14cmp.py`; `m7/g14list.py` names each test (`logs/m7p-g14cmp.txt`).

- **New failures: none** in Chromium, coarse-touch or WebKit 2287.
- Failing on master too: coarse-touch 2 and WebKit 4. All are O-101's "reversal · the expanded endpoint follows the pane" (release-10-1-2).
- Passing here and failing on master: 8 in Chromium and 4 in WebKit, all O-101 rows, and 8 in coarse-touch (6 O-101 rows and two D-1 rows of release-10-1-3).
- Tests here that are not on master: RU-35's two outputs tests and k3's second cell (both projects); WebKit adds g2 and s1 as well.
- **o1** (two tests), **k3** (both cells, 320 pinned and 306 unsized) and **s2** (1440 and 390) pass in all three projects.
- The restated tests, with their reasons:
  - Under RU-52, the two ring helpers of `release-10-1-5.spec.ts` (c4 coarse 390 and desktop; e2 390 and 1440; e3's closing ring check; e4 390 and 1440). The reason: the end seat's ring paints whole at offset 0, inside every clipping box.
  - Under the removal, `blob-pause-seam.spec.ts`, which now presses a `DockControl` wired to `pause()`. The 11.0.2 hover harness drops the background seat. The reason: the component is deleted.
  - Under RU-55, k3's fixture pins its tab glyphs at 24 px. The reason: a test of the fit law should not also test an icon library's default.

## What each ruling did

**RU-52, held.** The first form only.
- Step 3 traced the 4 px to `reach` in both engines (with `reach` stubbed, the press moves nothing). It also found that WebKit's arrow key at the run's end scrolled the port by default. The first form cures both.
- G-6 is GREEN in both engines at the pass. The plant (the cure removed) bites in both.
- The reserve tests are restated as listed above.

**RU-53, could not be built.** Step 3 named the layouts:
- Every first layout is the carrier's own `rectOf` (`dock:rect`).
- The "after the carrier" layouts carry no stack in the trace.
- The second `frame` layout is the backdrop luminance sampler: `resolveBackdropRgba`, called from `sampleNow` in a `useResizeObserver` flush.
- No observer entry failed RU-38's guard (`dock:ro-miss` stayed empty).

Neither hypothesis's cure applies. There is no focus hand-off or resting read in a stack to move, and no guard miss to store a border box for. The engine-only exit is not the build seat's to take (C6-M10). G-11 stays RED: 6 of 36 trigger frames over the bound.

**RU-54, held for s2; its plant does not bite.**
- The fit key holds the seats' span, their count, the root's extent on the axis and its other regions' extents. The fit is decided in the trigger frame and remembered. A run that does not fit with the inset gets a second read without it (C6-M1).
- Step 3's reading: with the inset forced on, the client box is one under the span (Chromium 266: 249 for 250; WebKit 268: 251 for 252), so step 2 of the rule changed as the amendment says.
- s2 is GREEN at 1440 and 390 in the three projects, and k2 is GREEN in WebKit. The sweep's restated clause holds, with 0 writes at rest. `w-pwords` crosses the fit edge 6 times with the flag equal to the lifted read, in both engines.
- **The plant (the memory removed) does not bite.** fit7's sweep, rest and pwords cells pass under it in both engines (`logs/m7-plant-g14-fitmemory.txt`), and s2 passes under it at 1440 and 390 in Chromium's two projects and in WebKit 2287 (`logs/m7-plant-g14-fitmemory-s2.txt`, read after the pass queue, source clean after). The C6-M8 plant (the siblings dropped from the key) bites in both.
- So on this build the second read is what holds s2. The memory is what the siblings plant can make stale, and no gate cell needs the memory to pass.

**RU-55, held for o1 and k3; failed on the seat census line.**
- A labelled icon seat sizes its glyph from its word, and the icon glyph keeps its rule's size.
- o1's two tests and k3's two cells are GREEN in the three projects.
- The seat line ("every seat's block extent equals `--dock-control-size` at every share") is RED. The worded seats hold one block extent at every share, but it is 38.59 / 38 px for a tab seat and 35.91 / 32.78 px for a labelled icon seat, not 40 / 44.

**RU-56, built. It fails in Chromium, and the loose cell cannot read as v11.0.2.**
- Inside a dock the fills are the dock's ink, declared on `.glass-dock`: hover 10 %, current 20 %, press 28 %. The `:root` lines stay.
- Three candidates were read at level 0.4: 10/20/28, 12/26/34 and 14/32/40. In Chromium no single current step holds both the mark and the current seat's words. The mark on dials Lin needs 26 %, and the words on nav's Reports fail at every candidate (4.37, 3.72, 3.18). The build took the step with the fewest failing reads.
- At the pass, Chromium fails Lin's mark (1.514 < 1.774) and Reports (4.35). WebKit's marks hold.
- The plant at the level taken (the `:root`-baked plates restored) bites both. Under it the words pass in both engines, so the ink-derived current fill is what costs Reports its contrast.
- The loose `DockControl` differs from v11.0.2 in both engines, with or without the fills. v11.0.2's dark arm carries O-269's seat fills (`8124e3e53`), and this branch's base `99a1389e6` predates them. The light hover read lands on a glyph pixel (11.9), which is the instrument's fault.

**RU-57, held as written: level 0.4 stands.** No rung is GREEN on G-15 in both engines.
- At 1440, level 1 and the control row fail the words on the current seats in dark over the field (Chromium 13 and 11 reads, WebKit 9 and 7) and Chromium's marks (5Y 1.38, Lin 1.20).
- Levels 0.85, 0.7 and 0.55 fail 5, 6 and 2 reads in Chromium and 6, 3 and 2 in WebKit.
- Level 0.4 fails Chromium's Reports and Lin's mark, and WebKit's grid glyph.
- At 390, levels 0.55 and 0.4 are GREEN on ink in both engines.
- On dials, the plate against the field rises in dark as the level falls (1.01 at level 1 to 1.78 at 0.4) and falls in light (1.27 to 1.12).
- Not read: daraksha's ornamented ground (the harness has no such ground).
- *The control row is not v11.0.2's plate.* Its state was `--glass-veil-dock` one step under the base, the folded plate on the wash tier, and level 1. That changed the words' reads but not the plate: on dials its plate reads the same as level 1 to three places, in both engines and at both widths (Chromium 1440: 1.009 / 1.055 dark, 1.273 / 1.278 light, folded / open). On this build `--glass-veil-dock` is the ink rung and does not paint the plate. v11.0.2's own plate, read on its build (`logs/m7-ink-base1102.*`), is Chromium 1.045 / 1.044 dark and 1.199 / 1.195 light, WebKit 1.227 / 1.225 dark and 1.193 / 1.191 light. So the strip's control row shows level 1's plate under v11.0.2's label.
- *"Level 1 is one veil step firmer than v11.0.2", with its readings.* Against v11.0.2's plate, level 1 reads firmer in light in both engines (Chromium 1.273 / 1.278 against 1.199 / 1.195; WebKit 1.274 / 1.275 against 1.193 / 1.191) and in WebKit's dark (1.283 / 1.232 against 1.227 / 1.225). In Chromium's dark it reads 1.009 folded and 1.055 open against 1.045 and 1.044: softer folded, firmer open.

**RU-58, held.**
- The size utility comes off each seat's own glyph in nav, chrome and rail.
- G-13's composition line reads 39 of 39 in both engines at the pass (9 of 39 were RED before).
- Reported, not changed: `DockLayerGroup.vue:175`, where the switcher's icons carry `class="size-4"`.

**RU-59, held.** `openDock` leaves an open dock alone and opens a folded one by its folded face. Every owner frame records the page's scheme at the shot, and `m7/strips7.py` refuses a frame whose label names another. It refused 0 of this pass's frames.

**RU-60, not built; not the seat's.** Step 3's reading: in Chromium, a 909 ms touch on a seat raises no tooltip, because reka 2.10.1's `TooltipTrigger` returns on a touch `pointermove`. The press-and-hold name belongs to Tooltip's wave.

**RU-61, prototyped; RED; not built.** The margin is saved as `m7/ru61.patch`.
- It holds `w-inflow`'s neighbour still: 0 px (76 / 76 / 82 before). The open plate lies over 2,938 px² of the neighbour, with no focusable element under it.
- It does not hold:
  - atlas's head row: the Table moves 132 px (68 before) and the legend 28 px (36 before), with 1,872 px² of the legend and its link under the plate;
  - keyframes's transport as shipped: 97 px, unchanged;
  - daraksha's Motion page: 50 / 54 px.
- With `anchor="start"` and the margin, the transport moves 4 px.
- It costs a layout past RU-53's bound on `w-inflow` at 4x: 3 of 12 trigger frames read 4.

11.2.0's release note says an in-flow dock still moves its neighbour, and atlas keeps its own hold. The full shift gate over every composition was not run.

**RU-62, built; RED on touch.** The build stamps the scrim, and a quiet focus return now keeps the linger.
- Step 3: DropdownMenu, Select and Popover close once by mouse with no reopen. cells6's "reopened" counted mutation callbacks while the surface was still open; trig7 reads the transitions instead. The Sheet's second press landed on its scrim and folded the dock.
- After the cure, in both engines: the four by mouse are GREEN, and the sheet's scrim press leaves the dock open to fold after its linger.
- RED: the popover by touch at 390 does not open from its seat (both engines), and WebKit's Select and Sheet do not close on the second tap.
- The dialog's outside press is covered above.

**RU-63, built.** The removals (step 2) and the budget below.

**RU-64.** The order was followed. The ready list is read at the top.

**RU-65, held.**
- The tab seat's rule takes the four forms.
- G-13's glyph line reads a tab seat holding an `img`, a `picture` and a `[data-dock-glyph]` child at the rule's size within 0.5 px, in both engines.
- The plant (the rule cut back to `> svg`) bites both: Chromium's picture glyphs grow to 47.84 and 300 px, WebKit's sit at 24 px against 24.6 and 21, and the marked child collapses to 0.

**Step 7, the two small adds.**
- *The trigger's seat.* A `DockTrigger` in a run takes the run's seat height: 40 at 1440 and 44 at 390 (from 35.9 and 32), in both engines. Its padding could not be built as a default under the sites' tokens. `density.css` sets `--dock-trigger-padding-*` on every dock (`:146-153`, `:211-218`), so the trigger keeps 8 px against the tab seat's 12. The two padding lines were taken out after that reading. adds7 still prints the padding clause, which is why it reads `pass: false`.
- *The group as a frame.* Every rest of a capped run scrolled by 60 px steps is a seat's snap position or the end, in both engines at 1440 and 390. Before, rests were off-snap, and WebKit returned the run to 0.
- Both plants bite in both engines.

## The budget

By SURFACE.md's method (`m7/names.mjs`, `m7/lines.sh`, `m7/g16.sh`); names against v11.1.0, size against v11.0.2.

| | v11.0.2 | v11.1.0 | `ddfa8a2ba` (step 1) | HEAD `943fe6e9d` | bound | verdict |
|---|---|---|---|---|---|---|
| public names | | 80 | 102 | **82** (+19 −17, net +2) | fewer than 80 | **RED** |
| dock lines | 10,489 | 11,081 | 11,225 | **10,614** (125 over v11.0.2) | 10,880 | GREEN |
| `useDockBody.ts` | | | | 1,428 | reported | |
| lines outside the directory | | | | `participation.ts` +7 (163 against 156); Tooltip +0 | reported | |
| dock entry, gzipped | 17,827 B | | 25,372 B | **23,080 B** (22,742 after step 2) | 17,827 B or less | **RED** |

The +19:
- `ControlsDock`, with `label`, `corner`, `within` and four slots (default, `collapsed`, `persistent`, `persistent-end`);
- `DockOutlet`, with `to`, `region` and its default slot;
- on `GlassDock`: the `pinned` prop, `update:pinned`, the `#rim` slot, the `run` prop and the exposed `controlCount()`;
- the attributes `data-dock-glyph` and `data-dock-scope`.

The −17:
- `DockBackgroundToggle`, with its three props and its emit;
- `useDockSearch` and `#search`;
- `useDockCtaReceive` (from `/dock`);
- `useDockContext`, `provideDockContext` and `DOCK_CONTEXT_KEY`;
- `DockLayerGroup`'s `orientation`, `switcherPosition` and `motion`;
- `DockControl`'s `as` and `asChild`;
- `DockSeparator`'s `anchor`.

RULINGS-6's arithmetic counted `ControlsDock`'s `collapse`, `pinned` and `update:pinned`, which are now deleted. It did not count four names the prototype also added: `GlassDock`'s own `pinned`, `update:pinned` and `#rim`, and `data-dock-scope`. Those four turn the fold's "3 down" into this table's "2 up". `DockControl`'s `type` stays (value.js passes `type="submit"`). No site line was found for `GlassDock`'s `run`.

## The REMOVES, with the grep

Each line is `git grep -n -F <name> HEAD -- src` on `943fe6e9d`, which anyone can rerun in the worktree.

- `DockBackgroundToggle`: 2 lines, both prose saying it is deleted (`dock/README.md:28`, `dock/index.ts:36`). The file is gone.
- `useDockSearch`: no code. The file is gone. Stale comments remain: `_shared/overlay/participation.ts:22` and `:30`; `useDockShellProps.ts:15` ("`useDockSearch` stays exported", now false); `index.ts:70` (the deletion note).
- `#search` and `search.css`: the stylesheet is gone, and `styles/index.css` no longer imports it. Mentions remain at `dockContext.ts:100` and `useDockShellProps.ts:14` (stale comments) and `index.ts:71` (the deletion note).
- `useDockCtaReceive`: no longer exported from `/dock` (`index.ts:69` notes it). It is still exported from `src/composables/motion/index.ts:55`, as ruled.
- `useDockContext`, `provideDockContext`, `DOCK_CONTEXT_KEY`: gone from the barrel (`index.ts:55` notes it). They are still internal in `composables/` (`GlassDock.vue:34`, `DockOutlet.vue:5`).
- `DockLayerGroup`'s `orientation`, `switcherPosition`, `motion` and the drag arm: gone (`DockLayerGroup.vue:36`, the note).
- `DockControl`'s `as` and `asChild`: gone (`DockControl.vue:65`, the note). A comment at `:99` still names "the `as`/`as-child` Primitive host". `type` stays.
- `DockSeparator`'s `anchor`: gone (`DockSeparator.vue:29`, the note).
- `ControlsDock`'s `collapse`, `pinned` and `update:pinned`: gone (`ControlsDock.vue:25`, the note).
- `capOn` (the carrier's region memory, RU-54): 0 lines. RU-50's attempt was never applied.
- The `:root`-baked seat fills inside a dock (RU-56): overridden on `.glass-dock` (the "W-I.8 RU-56" block in `dock.css`). The `:root` lines stay for a loose `DockControl`, as ruled.
- Already removed by the redesign:
  - `dockMorphMeasure.ts`, `useDockMorph.ts` and `useDockRunMark.ts` are not in `git ls-files`.
  - `useDockRunMark` and `capExtra` have 0 lines.
  - `dockMorphMeasure` and `useDockMorph` survive only in comments: `GlassDock.vue:7`, `:242`, `:245`; `run.css:399`, `:751`; `shape.css:122`; `morph.css:324`; `useDockCtaReceive.ts:13`; `composables/motion/index.ts:52`.

## The strips (in `fold/`, not staged)

Every frame is labelled in plain words with its engine, width, scheme and build. The builder's scheme check refused 0 frames (`logs/m7p-strips.txt`). Each strip comes in a Chromium and a WebKit file unless noted. The source frames stay in the worktree's `measure/owner-m7/` and `measure/crops-m7p/`; the crops are committed, and the owner frames are not, as with earlier passes.

- **Q10, a firmer dock:** `strip-ladder-7.*`. Five levels plus the control row, folded and open, dark and light, at 1440 and 390, with the plate against the field under it beside each frame. The control row is level 1's plate under v11.0.2's label (RU-57 above). Daraksha's ground is not in it.
- **Q12, delete what no site uses:** `strip-names-7.png`, the name table as text.
- **Q13, a page name on a phone:** `strip-phone-7.*`. Pages pressed and held 700 ms at 390; no name shows.
- **Q14, a dock in a row:** `strip-legend-7.*` and `strip-inflow-7.*`.
  - On this build (no RU-61) the open dock pushes atlas's legend aside and covers 0 px of it.
  - The prototype's strip shows the plate over the legend, with the cover in each label.
- **Q15, a dock with a button that always shows:** `strip-transport-7.*`. On this build Play moves from 700 to 603 px with or without `anchor="start"`, because `anchor` does nothing without RU-61's margin. The prototype's strip has the 4 px row.
- **Q16, more icons than fit on a phone:** `strip-cue-7.*`. The run is cut at a whole seat, with no cue.
- **Q17, big icons beside words:** `strip-glyph3-7.*`. Three rows: share 0.5, 0.9 (36 px) and 1.5 em (27.9 px). The tab row reads a glyph of 24.6 px beside a 16.4 px word, not "21 against 24": 21 px holds at a 14 px word (k3's 320 cell), which this frame does not show.
- **Q18, hover against current:** `strip-hover3-7.*`. Hover fills at 20 %, 14 % and 7 %, read from their pixels: 1.0, 1.19 / 1.20 and 1.39 / 1.45 (light / dark, Chromium). So the "near" frame shows two current pages. The build's own 10 % hover reads 1.25 or more (ink7).
- **The six earlier strips:**
  - `strip-fold-7.png` and `strip-swap-7.png`, held at seven points, each engine in its own block;
  - `strip-seatset-7.*`;
  - `strip-hover-7.*`;
  - `crop-many-7.png`;
  - `strip-glyph-7.*` (shares 0.5, 0.75 and 0.9, no size class).

## What was not run

- daraksha's ornamented ground for the ladder (RU-57, step 9). The harness has no such ground; daraksha's `HerGround` is an Aurora with its own config.
- RU-61's full gate (`tools/shift-gate.mjs` over every composition). RU-61 stopped at its prototype.
- RU-60's `touchname` gate and its real-Safari clause. Neither is the build seat's.
- Real Safari for any gate. It is required before the tag, not of this seat.
- A cost cell in WebKit. None exists; G-11 is read in Chromium by trace.
- The 1440 fold of every controls dock. It no longer folds (above).
- The ink at the pass with its v11.0.2 base. The queue passed a base path that does not exist (`m7-ink-base1102.E.json`), so ink7 printed no mark or loose clause. `m7/inkbase.py` applied both clauses afterwards from the marks the run recorded, exactly as ink7 writes them.
- G-12's library build into its own folder. The build writes `dist/` whatever `--outDir` says, so the queued G-12 item read no bundle. The bundle clauses were read on that `dist/` instead (built at 01:10 from `943fe6e9d`; `logs/m7p-g12-dist.txt`).

## Messages (step 10, list only)

At booking and again before the tag:

- **atlas:**
  - The share reaches only an unsized glyph (0.9 of the seat); a site's own size outranks it.
  - RU-61 is not built, so an in-flow dock still moves its row when it opens, and `anchor` still does nothing (the pass's transport strip: Play moves 97 px with or without `anchor="start"`). `PlateDock`'s Table seat slides as it does today, and atlas keeps its own hold.
  - The scroll fold goes to 11.3.0.
  - The plate stays at level 0.4.
- **fourier:**
  - The scroll fold goes to 11.3.0.
  - Its `--dock-trigger-min-height` token can now be deleted: a trigger in a run takes the run's seat height by default.
  - A `ControlsDock` folds only on a phone. At 1440 the canvas tools rest open unless the site keeps `GlassDock collapse="closed"`.
- **hassio and speedtest:**
  - The base size moves in 12.0.0.
  - Home Assistant's worded tab glyph (`ha-icon` with `data-dock-glyph`) is now sized by the tab seat's rule.
  - A trigger beside icon seats takes the seat's height (40 / 44); its padding stays the density's 8 px.
- **gregg:**
  - The yielding seat is not built.
  - The fills follow its ink, since gregg rebinds `--dock-fg-on-aurora` on `.glass-dock`: hover 10 %, current 20 %, press 28 %. They replace its `--dock-control-active-bg` override.
  - The plate level is 0.4, under 1, so the wash tier on its pair docks is flattened toward `--card`.
  - PageDock's `role="group"` child is now a frame: its seats are the snap targets.
- **value.js and speedtest:** inside a dock the fills follow their ink (both rebind `--dock-fg-on-aurora`). A loose `DockControl` keeps the `:root` fills.
- **daraksha (through value.js):** the tab seat now also sizes an `img`, a `picture` or a `[data-dock-glyph]` child (RU-65), so its tab pictures need no size rule of their own.
- **slides:** the plate level is 0.4, under 1, which flattens the tier `parkway-lab/theme.css` sets.
- **keyframes:**
  - `graspHeld` stays in 11.2.0 and goes in 12.0.0.
  - The transport's Play seat still slides 97 px on unfold, with or without `anchor="start"` (RU-61 is not built; with the prototype's margin, `anchor="start"` held it to 4 px).
- **sci-report (with fourier above):** the controls preset no longer takes `collapse`, so at 1440 it rests open.
- **bl/demo:** `m6/comp/nav.stage.vue` carries a duplicated `<style scoped>` block inside its template, which a dev server refuses. The composition source on `bl/demo` should lose it, along with the seat glyphs' size classes (RU-58's touch list).
