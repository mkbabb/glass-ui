# W-I.8: the eighth pass, measured

The top line and part M are the measuring seat's; part S is the source seat's.

**Top line (part M, 2026-11-22): NOT READY for an 11.2.0 build seat.** By RULINGS-7's final ready list, read whole on one build of the tip `575084358` in both engines, every run at a 1-minute load of 28.7 or less, these items stand in the way:

1. **G-1** is RED on (k) in both engines. After a press on a `#persistent` seat, a leave folds the dock at once (9 ms in Chromium, 4 ms in WebKit), by master's v11.1.0 rule the merge carried (`useDockState.ts:647-656`), where (k) reads the linger. Its (f) holds, by the finger cell and the unit witness, with both plants biting.
2. **G-6** is RED on its press cell in both engines (225.66 px: the dock folds 299 ms after a press on Home and a drag off it), by the same rule.
3. **G-3** is GREEN by judge8 in both engines, but its plant (g3-retarget) bites in Chromium only.
4. **G-9**: every clause on the root passes in both engines, but its plant (the root's progress write removed) fails no clause of the judge in either. The rows show the fault (the progress steps from 0 to 1 with no row between), and no clause reads it. The w-scope follower reads `[data-dock-scope]`, which RU-78 deleted.
5. **G-11** is RED in Chromium on the GPU lane: 9 of 48 trigger frames are over the bound, and the two frames after the triggers hold 34 forced layouts, every one under `useGlassBackdropLuminance` (the batched sample is not cured). The rest clause is GREEN in both engines.
6. **G-13**'s seat line is RED in both engines: 30 reads, every one a tab seat of w-glyphs (38.59 against 40 px, 38 against 44). S5 found RU-75's tab half cannot be built as ruled. The folded-face line and the census over `svg`, `img` and `picture` pass with their plants biting. The hidden-face box plant (g13-box) bites in neither engine.
7. **G-14** is RED in all three projects against master's snapshot: 63 new failures in chromium-headless-new, 64 in coarse-touch and 8 in WebKit 2287.
   - 110 of Chromium's 127 new failures read the pill's corner as Chromium writes the stadium's infinite length (`run.css:763-765` after the merge). The painted corner is the same as master's.
   - The rest are in the 11.0.2 spec (the fills, the fold's content box, the idle fold's layouts, the start-anchored rail, a slotted control's transition), plus one WebKit D-1 frame.
   - Of the nine restated groups, touch bites only in coarse-touch, where `(hover: none)` matches, and fits bites only in WebKit, since its sites already fail in Chromium's two projects.
   - The run-mark unit test passes under its plant.
8. **G-15** is RED in both engines at the source's level 1, current 10 % and hover 8 %:
   - nav's current Reports in dark reads 3.27 to 3.32 (Chromium) and 4.01 to 4.08 (WebKit) against 4.5, and dials's labels in dark fail in Chromium;
   - 10 to 11 marks per engine are under their floor;
   - the hover is under its ground's bound on 6 light and 2 dark reads;
   - the loose control's current fill in dark is under v11.0.2's.
   
   It is also not at RU-67's level: the rule on this measure returns 0.85 for dark, where the source writes 1. G-15 still fails at 0.85, so question 21's default applies. The one-step plant does not bite in Chromium.
9. **G-16** is RED: the consumer fixture is 105,249 B gzip against v11.0.2's 102,631 (+2,618).
10. **Code lines** are 5,246 against 4,741, 505 over (`wc -l` 10,389 against 11,081). M4 lists the code that could go, by file and line count, `useDockBody.ts` first. No list reaches 505 without removing a behaviour, and nothing was removed.
11. **G-2's lane-corner clause** is unwitnessed: g2-lane bites in neither engine. Every other G-2 plant bites in both.

Ready on the list: G-2's other clauses and G-4 with the fade clause (the ghost plant bites in both), G-7, G-8 (four surfaces by mouse and touch, and the scrim press), G-10, G-12 on the archive build, the names (78 against 80), `w-pwords` with its plant (g14-fitsibs bites in both), O-386 (equal folded and open), and RU-61 (reported not built).

## Part H: the harness

Seat harness-8, claude-opus-5-5, 2026-11-17 to 2026-11-19. Items H1 to H12 of RULINGS-7's final eighth-pass order, in order, and the atlas session's cell. No commit of this seat touches `src/`.

**Build read:** the source at `943fe6e9d`. The preview build `dist-wi8` was built from `3a923d2ea`, which adds only docs to `943fe6e9d` (`logs/m8-build.sha`). The plants were read on the worktree's dev server (5402, which reads `src/` live), each applied, read in Chromium and then in WebKit 2287 under `--exclusive webkit`, reverted, and the source checked clean.

Paths below are relative to `docs/tranches/BL/design/dock/wi8/measure/` in the worktree `.claude/worktrees/bl/dock/wi8`. The harness is `harness/m8/`; its queues are `harness/m8/q/`.

### How the runs went

- **2026-11-17.** Queue A (`q/ha.q`, the build's cells) ran whole from 08:16 to 10:53. Queue B (`q/hb.q`, the reruns and the plants) started at 10:53. At 11:18 guarded refused every browser run (kernel zone `data.kalloc.1024` at 8.36M; each plant log of that time holds the refusal, rc 75), so B's plants and all of queue C (G-16's fixture, G-12 on an archive tree, the canceller-stack reread) did not run. H1 to H12 were committed with what had run, each commit naming what had not.
- Then a halt for the weekly limit and a reboot.
- **2026-11-18.** Queue R (`q/hr.q`) ran from 12:14: g13-tabsvg, g2-facehalf, g4-ghost, g8-exempt, g8-trigger, g11-rest and g15-baked were read. At 12:45 the owner paused every run (battery at 41 %) while g15-onestep was running. Its plant was left applied in `src/components/dock/styles/dock.css`, with its saved original in `m8/.plant-orig/g15-onestep`.
- **2026-11-19.** The saved original matched `HEAD`'s file byte for byte, so `src/` was restored from git and the saved copy removed. Queue R2 (`q/hr2.q`) then ran what R had not: g15-onestep (12:29 to 12:48), H9 (12:48 to 13:03) and G-16's v11.0.2 fixture (13:03 to 13:04) were read; from 13:04 the session's power hold paused the queue (SIGSTOP; the battery fell from 82 % to 66 % under other repos' load while charging) in G-16's candidate tree. R2 had not read G-16 on the candidate with its two plants, G-12 on that archive tree, the canceller-stack reread, Q14's prototype, or G-14's plants in WebKit 2287.
- **2026-11-19, evening.** After the battery stop at 17:03 and a reboot, the candidate tree R2 left half extracted (5.0 GB, mostly `docs/`) was removed, and `g16fix8.sh` now archives the ref without `docs/` (`2273211b1`; `logs/m8-disk.log`). Queue R3 (`q/hr3.q`) ran R2's remaining items in R2's order from 19:52 to 20:06, at loads 11 to 25, each read on its first run (`logs/m8-q-hr3.log`). Queue R's and R2's logs are in `826c94bed`, R3's in `7d8125a7e`.

Loads at every run are in `logs/m8-q-*.log` and at the head of each plant log; none was over 36.

### The plants, per engine

A plant bites in an engine when a clause its gate reads passes on the build and fails under the plant there. `m8/bite8.py` compares the trigger, cost, census and ink plants with the build's reading on the same instrument (`logs/m8-bite.txt`). The fade and seat-set plants are judged where they run (`plantrun8.sh`'s judge), against the build's rows of the same cells (`rows/m7p`).

| plant | gate | the fault planted | Chromium | WebKit 2287 | log |
|---|---|---|---|---|---|
| g2-facehalf | G-2, G-4 (RU-70) | the content window halved, 0.55 to 0.275 | bites: all 6 segments of 3 cells fail (op60 0.46 to 0.47; the fade 45 to 46 ms against 66.7; no face for 66 to 67 ms) | bites: all 6 fail (op60 0.41 to 0.46; the fade 47 to 54 ms) | `logs/m8-plant-g2-facehalf.txt` |
| g4-ghost (rewritten, RU-81) | G-4 seat set | a removed seat keeps painting at its own opacity through its exit and is cut at the landing | bites: read6's join fails on both cells (a step of 1.00 in one frame, a cut in 1 row, the fade out 8 ms against 75) | bites: the same (fade out 17 to 18 ms) | `logs/m8-plant-g4-ghost.txt` |
| g8-exempt | G-8 (RU-72) | a press on the trigger of an open surface folds the dock | bites: 6 cells (menu, select and popover by mouse and by touch) | bites: 5 cells (menu, select and popover by mouse; menu and popover by touch) | `logs/m8-plant-g8-exempt.txt` |
| g8-trigger | G-8 (RU-72, RU-62) | the scrim's stamp removed and a quiet focus return cancelling the linger | bites: 3 cells (sheet by mouse, by touch, and its scrim) | bites: 1 cell (sheet by mouse; WebKit's two touch Sheet cells are red on the build) | `logs/m8-plant-g8-trigger.txt` |
| g11-rest | G-11 rest clause (RU-74) | a loop left running at rest | bites: 480 rAF callbacks at rest on w-pill, w-flow and w-seat at 1x and 4x; the build's 24 cells are quiet | bites: 240 at rest on the same three; the build's 4 cells are quiet | `logs/m8-plant-g11-rest.txt` |
| g13-tabsvg | G-13 glyph line (RU-65, RU-87) | the tab seat's glyph rule cut back to a direct `svg` | bites: 20 glyph reads fail (an `img` or `picture` beside a word laid out 300, 40.8 or 47.8 px against 21 or 24.6), 0 on the build | bites: 20 fail (24 px against 21 or 24.6), 0 on the build | `logs/m8-plant-g13-tabsvg.txt` |
| g15-baked | G-15 (RU-56) | the `:root` plates restored inside the dock | bites: 9 marks fail (0 on the build), hover against its ground 4 against 2 | bites: 10 marks (0 on the build), hover 5 against 4 | `logs/m8-plant-g15-baked.txt` |
| g15-onestep | G-15 (RU-68) | the current step set equal to hover (20 % to 10 %) | bites: 9 marks fail (0 on the build), each under its v11.0.2 floor (nav's Reports 1.25 against 1.37 in light; dials's Lin 1.19 against 1.2 in dark) | bites: 9 marks fail (0 on the build; nav's Reports 1.25 against 1.36 in light, action-row's Format 1.25 against 1.34) | `logs/m8-plant-g15-onestep.txt` |
| g1-presshold | G-1 (f) unit (RU-73) | the press hold removed | bites: both forms of the unit witness fail (with the tap's FocusEvent, and with `onFocusIn` bare) | (unit, engine-free) | `logs/m8-h3-unit.txt` |
| g1-frompress | G-1 (f) unit (RU-73) | the linger timed from the touch press | bites: both forms fail | (unit) | `logs/m8-h3-unit.txt` |
| g1-lift (MEASURE-7's) | G-1 (f) unit | the linger scheduled in the touch pointerup | does not bite: both forms pass, as in MEASURE-7; the witness cannot see it | (unit) | `logs/m8-h3-unit.txt` |
| g3-retarget (MEASURE-7's rows) | G-3 (RU-71) | the retarget planted | does not bite under judge8: every row passes | does not bite | `logs/m8-h1-plants-rejudge.txt` |
| g2-laneinset (MEASURE-7's rows) | G-2 lane | a clip 12 px inside its lane | bites: a clip off its lane by 12 px in 48 region-rows | bites: in 37 region-rows | `logs/m8-h1-plants-rejudge.txt` |
| g2-lane (MEASURE-7's rows) | G-2 lane | the lane plant | passes judge8; bites through read6, as in MEASURE-7 | the same | `logs/m8-h1-plants-rejudge.txt` |
| g14-fitmemory (H9) | RU-54's memory (RU-80) | the fit's memory removed | bites: on w-pill and w-seat the layout count leaves the build's spread (w-pill 73 to 78 against 40 to 45; w-seat 92 to 96 against 49 to 54), trigger-frame layouts 5 to 6 against 3, and G-11's trigger clause reads 4 frames over against 2 | not claimed (cost is Chromium's, RU-85) | `logs/m8-h9.txt` |
| G-16 `used` | G-16 fixture (ORCH-LINES-7 line 1) | a module of known size GlassDock imports and uses | moves the fixture by its size: 106,246 B gzipped against the build's 103,644 (2,602 B; the literal alone gzips to 2,144). The clause cannot turn red under it: the build is already 1,013 B over v11.0.2's | (a build reading, engine-free) | `logs/m8-g16-used.json` |
| G-16 `unused` | G-16 fixture | the same bytes as an export the fixture never imports | does not move the fixture (103,644 B to the byte), as line 1 asks; the entry rises 2,590 B | (a build reading) | `logs/m8-g16-unused.json` |
| G-14's restated groups in WebKit (RU-81) | G-14 | `m4/g14plants.py`'s nine groups | (MEASURE-7: each bit in Chromium and coarse touch) | 8 of 9 bite, each failing test passing on the build: corner 14 of 14 tests fail, clock 8 of 14, lane 6 of 6, reserve 12 of 16 (the other 4 red on the build too), press 2 of 2, cap 1 of 7, fits 5 of 8, zoom 3 of 3. touch does not bite: its 5 tests pass, because its fault sits under `(hover: none)`, which the WebKit project never matches | `logs/m8-g14plant-<group>.log`, `logs/m8-g14bite.txt` |

### H1. judge8 (RU-70, RU-71) — `a149ed7b6`

**Built.** `m8/judge8.mjs`: RU-70's fade in frames (no 60 Hz window moves a face's or a seat's opacity by more than two fifths, and a fade lasts at least 66.7 ms between its last value within 0.02 of one end and its first within 0.02 of the other, read interpolated), RU-71's travel that ends where the lane turns, and "shown" at the visibility threshold plus the lane's half pixel. `m8/rejudge8.sh` re-reads MEASURE-7's plant rows under it. The fade plant g2-facehalf is in `m8/plants8.py`.

**Reading** on `rows/m7p` (the build's rows from MEASURE-7, same source): G-2 110 of 110 segments, G-3 18 of 18, G-4 43 of 43, G-10 44 of 44, in both engines (`logs/m8-h1-m7p-gates8-<engine>.txt`).

**Plants.** g2-facehalf bites in both engines (table). g2-laneinset bites in both. g2-lane passes judge8 and bites through read6. **g3-retarget no longer bites in either engine under judge8**: RU-71 asks that it still bite, so G-3's retarget clause has no biting plant on this judge. Recorded; the plant was not rewritten (no ruling names a new form).

### H2. trig8 (RU-72, C7-M13, C7-8) — `3709a7678`, `ec6f55767`

**Built.** `m8/trig8.mjs`: at every press, the element under the point, the seat's, the plate's and the port's boxes, the events and whether a handler cancelled them, the surface's and the dock's open state, and `activeElement`. One 390 touch cell on fourier's AppDock composition at `67a0c57` (`w-fourier-app`, in the harness root).

**Reading** on the build (`logs/m8-trig-build.<engine>.json`). Chromium passes every cell. WebKit 2287 passes the mouse cells, menu-touch, popover-touch and select-touch-item, and fails select-touch, sheet-touch and sheet-touch-scrim: the second tap's `pointerdown` is cancelled (`pointerdown:prevented`, on the Select's trigger and on the Sheet's scrim `div.fixed.inset-0`), and WebKit then sends no `mousedown` or `click`, where Chromium still sends `click`. fourier's AppDock at 390 touch (O-380): the face, the theme, the Sections menu and About each open and fold within 9 s, none pinned, in both engines. A seat tap reads pointerdown, touchstart, pointerup, touchend, mousedown, focusin on the seat, mouseup, click, with `activeElement` the seat, in both engines.

**Plants.** g8-exempt and g8-trigger bite in both engines (table).

**The canceller's stack** (`build-who`, which handler cancels the `pointerdown`; `logs/m8-trig-build-who.<engine>.json`). The same handlers cancel in both engines:
- on the Select's trigger, reka-ui 2.10.1's `SelectTrigger`: `onTriggerPointerDown` returns `event.preventDefault()` for a touch pointer (`node_modules/reka-ui/dist/Select/SelectTrigger.js:62`), and its `pointerup` carries `.prevent` (`:99`);
- on the Sheet's scrim, reka-ui's `DialogOverlayImpl`: `onPointerdown` with the `left`, `self` and `prevent` modifiers (`Dialog/DialogOverlayImpl.js:37`).

reka-ui's outside dismissal waits for a `click` on touch (`DismissableLayer/utils.js:51-54`). After the cancelled `pointerdown`, Chromium sends `click` and both surfaces close; WebKit 2287 sends none and neither closes. In WebKit the stack lacks the frame that calls `preventDefault` (a tail call); the frames under it match Chromium's. Chromium passes all four cells, and WebKit fails select-touch, sheet-touch and sheet-touch-scrim, as on 2026-11-17.

**Not built.** The cure H2 names is not the harness's: a tap that reaches WebKit's Select trigger or Sheet scrim and is cancelled is a build fault, for S6 (RU-72).

### H3. G-1 (f)'s unit witness (RU-73, C7-M12) — `a4f9f7ff9`

**Built.** `m8/h3unit.sh`: the witness in two forms, with the tap's `FocusEvent` dispatched on the seat at the lift, and with `onFocusIn` called bare, each GREEN on the build and run under each plant.

**Reading.** Both forms pass on the build. g1-presshold and g1-frompress fail both forms. g1-lift passes both, as in MEASURE-7: the witness cannot see it. WebKit's seat-tap order and `activeElement` are H2's (the same order as Chromium's, the seat focused).

### H4. g4-ghost, G-14 in WebKit, G-11 (RU-81, RU-74, C7-M6) — `6a15fc588`, `cb7edd2aa`

**Built.** g4-ghost rewritten to the fault RU-81 names (`m8/plants8.py`). `m8/g14plantrun8.sh`: each restated G-14 group's plant run in WebKit 2287. `m8/cost8.mjs` on the GPU lane (ANGLE Metal on the M5 Max): phase marks by `console.timeStamp`, the two frames after each trigger with their forced layouts, a deciding frame's reread with no flag change, and WebKit's rest-only mode.

**Reading** on the build (`logs/m8-cost.build.<engine>.json`). G-11's rest clause is clean in both engines (no rAF, mutation or running animation at rest on w-pill, w-flow, w-ctl, w-seat). Of 36 trigger frames, 3 read over the bound (4 against 3, w-pill and w-seat at 4x), and 16 have a forced layout in the two frames after: 11 from `useGlassBackdropLuminance`'s sampler under a ResizeObserver, 5 from DockLayer. The reread with phase marks (`logs/m8-cost.build2.chromium.json`) ended at w-ctl when its browser closed: 24 frames, 1 over, 11 with a layout after.

**Plants.** g4-ghost bites in both engines on read6's join clause: on the build the joining seat steps 0.28 to 0.31 per frame with no cut and fades out in 82 to 89 ms; under the plant it steps 1.00 in one frame, is cut in one row, and fades out in 8 to 18 ms. judge8's G-4 fade rows pass under the plant in both engines, so the seat-set clause is witnessed by read6 and not by judge8. g11-rest bites in both engines (table).

**G-14's groups in WebKit 2287** (`m8/g14plantrun8.sh`; `m8/g14bite8.py` compares each group's tests under its plant with the build's own WebKit run of the same specs on `943fe6e9d`, 280 tests with 4 red; `logs/m8-g14bite.txt`). Eight of the nine bite. Every test counted here fails under the plant and passes on the build:

| group | tests | fail under the plant | of those, red on the build too |
|---|---|---|---|
| corner | 14 | 14 | 0 |
| clock | 14 | 8 | 0 |
| lane | 6 | 6 | 0 |
| reserve | 16 | 16 | 4 (`release-10-1-2.spec.ts:446`, the four reversal cases) |
| touch | 5 | 0 | 0 |
| press | 2 | 2 | 0 |
| cap | 7 | 1 | 0 |
| fits | 8 | 5 | 0 |
| zoom | 3 | 3 | 0 |

The touch group does not bite in WebKit. Its plant opens every dock under `(hover: none)`, and its sites pick the folded face only in a mobile project. The WebKit project is a desktop one, and `m8/hovernone8.mjs` reads WebKit 2287 matching `(hover: none)` and `(pointer: coarse)` only in a touch context (`hasTouch`), as Chromium does (`logs/m8-hovernone.json`). So the planted branch never runs there. The source checked clean after each group.

### H5. ink8 (RU-82, RU-68, C7-M3 to M5, C7-M9, C7-M14, R7-6) — `72df37820`

**Built.** `m8/ink8.mjs` and its list: a settled dock, opened cells only, a base that fails loud, hover at fine pointers only, the folded posture on a folding composition, `[aria-pressed]` in the mark selector, each item's background from a ring outside its box with its opacity product recorded, an item unsettled on its second read failing, plate and field by median colour over three reads with the spread printed, the hover-against-ground clause, whether the segmented control's hover takes the dock's token, one held-press read. Run on v11.0.2's page (base) and the build, both engines, 88 cells each.

**Reading** on the build (`logs/m8-ink-build.<engine>.json`). Text: 2 failures in Chromium (nav's Reports, the current tab, 4.35 and 4.38 against 4.5 on the warm field in dark), none in WebKit. Icons all over 3. The unsettled rule fails 22 icon reads in Chromium and 26 in WebKit, every one the DarkModeToggle at its designed opacity 0.8 (its steady opacity recorded), plus 3 of chrome's words in WebKit. Marks: 6 failures in Chromium (figure-tools' Table view 1.56 to 1.70 against v11.0.2's 2.01 to 2.26, light), none in WebKit. Hover against its ground: 3 under v11.0.2 in Chromium, 6 in WebKit. The loose `DockControl` on the flat dark ground: current fill 1.005 against 1.36 and hover 1.001 against 1.15 in both engines.

**Plants.** g15-baked bites in both engines on the marks (table). g15-onestep: bites in both engines on the marks: with the current step equal to hover, 9 marks fall under their floors in each engine against 0 on the build (in Chromium nav's Reports 1.25 and 1.26 against v11.0.2's 1.37 and 1.39 in light, dials's Lin 1.19 against 1.2 on the dark field, action-row's Format in three cells; in WebKit nav's Reports in three cells, dials's 5Y and Lin on the flat light ground, action-row's Format in four). The plant raises the current seat's words: Chromium's two Reports failures pass under it (`logs/m8-plant-g15-onestep.txt`, `logs/m8-bite.txt`).

### H6. The grid ground and RU-67's rule (RU-67 as amended, C7-M8) — `914374d72`

**Built.** `m8/plate8.mjs` (plate and field median colours; show-through as the grid's amplitude in the plate against beside it, and under the plate with the docks hidden; each the median of three reads) and `m8/rule67.py`. Today's dock (v11.0.2's page) and levels 1 to 0.4, both schemes, both engines, WebKit's whole 0.7 rung at 1440.

**Reading** (`logs/m8-h6-rule67.txt`). Light default (level 1) on the light grid: Chromium 0.106, WebKit 0.728. Clause 1 (dark show-through no more than the light default's): today's dark fails it in both engines (Chromium 0.119, WebKit 0.781); level 1 meets it (Chromium 0.103; WebKit 0.541, its range 0.541 to 0.728). Clause 2 (every dark plate against the warm field under 1.70): met at 1, 0.85 and 0.7 in both engines; not at 0.55 or 0.4. **RU-67's rule returns level 1 for dark**, the first rung from the glass end meeting both clauses in both engines. That is the dark default S4 writes. WebKit's show-through reads about 0.73 at level 1 on almost every dock in both schemes, where Chromium reads 0.10 to 0.20: the two engines' grids differ in amplitude under the same plate, so the rule compares like with like inside each engine.

**Plant.** None ruled for this reading.

### H7. The owner's frames and strips (RU-83, RU-69) — `20d122261`, `69584c293`

**Built.** `m8/owner9.mjs` and `m8/strips8.py` (the crop to the stage, the posture check, today's row from v11.0.2's tree). Strips written to the main checkout's `fold/`, not staged: `strip-q10-{grid,field,daraksha}-8`, `wash`, `fission`, `q13`, `q14`, `q17`, `q18`, `seatset`, per engine. 0 frames refused by the scheme and posture checks.

**Reading.** Q10: nav and the pill, today's dock then levels 1 to 0.4, both schemes, three grounds, the dark default marked at level 1 (H6). Q13: an icon seat held 700 ms at 390 touch on a dock of many seats shows no name. Q14: atlas's head row at 1440, open and in the linger, moves the legend 36 px and covers none of it. Q17: share 0.5 (20 px glyphs), 0.9 (36 px), 1.5 em of the words (27.9 px, the theme seat included); glyph and word 4 px apart; at 14 px words Home 24 px and the others 21 px. Q18: hover at 5, 6.5 and 8 % against the current fill, light 1.43, 1.37, 1.34 and dark 1.53, 1.46, 1.42 (the build's 10 %: 1.27 and 1.32). `--glass-veil-dock` reads .14 light and .18 dark in both postures at level 0.4. The harness root's picture glyph is a landscape picture.

**Q14's prototype** (`m8/proto14.sh`: RU-61's patch from `m7/ru61.patch` on the dev server, frames cropped to the row, the patch reverted and the source checked clean; `logs/m8-owner/owner9.proto.<engine>.json`). Open and in the linger, both schemes:
- atlas's head row at 1440: the legend moves 28 px in Chromium and 27 px in WebKit, and 1,872 px² of it lies under the plate;
- the in-flow dock beside a legend: the legend moves 0 px, and 2,938 px² of it lies under the plate (2,937 in WebKit).

The build's row (36 px, 0 px²) is beside them. `strip-q14-8.<engine>.png` in the main checkout's `fold/` now carries the prototype's rows (not staged). The prototype's frames show the dev page's gradient ground. The open in-flow dock reaches past the row's left edge, so the row crop cuts it.

### H8. Daraksha's ground, G-12 on an archive tree, G-16's fixture (RU-85, C7-4, RU-77, C7-M2, C7-5) — `89466c11f`, `ba9be1360`

**Built.** The `daraksha` ground and the fission stage; `m8/g16fix8.sh` (the ref archived with `git archive` without `docs/`, the library built under the guard; G-16's entry, static closure and union closure of dock, dock-trigger, menu, select, popover and tooltip; the consumer fixture `m8/g16fix/` built against that dist; G-12 over the archive's `dist/`; the two plants applied to the archive tree only).

**Reading, the neck.** Daraksha's fission held at t 0.62 over its Colour ground, the neck read by its own painted pixels (inside its box, outside both plates' stadia, where the shot with the docks differs from the shot without). As built, the neck keeps its own level: in dark it reads 1.00 to 1.03 against the field in Chromium and 1.007 at every rung in WebKit, while the plates go 1.01 to 1.18; in light 1.14 to 1.16 against the plates' 1.07 to 1.31. With the README's recipe (the neck at the dock's level) it follows the plates: dark 1.00 to 1.13 (Chromium) and 1.007 to 1.115 (WebKit).

**Reading, G-16** (`logs/m8-g16-{base,cand,unused,used}.json`). Gzipped at level 6, file by file:

| | v11.0.2 | the build `943fe6e9d` | with the unused export | with the used module |
|---|---|---|---|---|
| **the fixture's total JS** | 102,631 B | **103,644 B** | 103,644 B | 106,246 B |
| the fixture, raw | 307,467 B | 308,518 B | 308,518 B | 316,765 B |
| the entry (`dock.js`) | 17,827 B | 23,080 B | 25,670 B | 25,579 B |
| the static closure | 38,758 B, 27 files | 35,761 B, 19 files | 38,351 B | 38,260 B |
| the union closure (dock, dock-trigger, menu, select, popover, tooltip) | 54,405 B, 45 files | 51,238 B, 37 files | 53,828 B | 53,737 B |

By ORCH-LINES-7 line 1, the build's fixture is 1,013 B gzipped over v11.0.2's: G-16 reads RED on this build. This is the build before the merge; the merged build is part M's. The unused export moves the entry and the closures by about 2,590 B and the fixture by none. The used module moves the fixture by 2,602 B. So only the used module moves the fixture, as line 1 asks.

**Reading, G-12 on the archive tree** (`logs/m8-g12-archive.txt`). Over `943fe6e9d`'s archive `dist/` and the source: 15 pass, 0 fail, `__dockHold`, `__dockPose` and the dock marks included. G-12 is static; its plant g12-scale bit in MEASURE-7 (`logs/m7-plant-g12-scale.txt`), and none is ruled for the bundle clauses.

### H9. RU-54's memory against g14-fitmemory (RU-80) — `fc3d66fcc`

**Built.** `m8/h9.sh` (cost8 on the dev server, GPU lane, five 4x runs without and with the plant) and `m8/h9read.py` (within the spread when the plant's median differs from the build's by no more than the build's own range over five runs, for both the layout count and the summed layout time).

**Reading.** Run on 2026-11-19 from 12:48 to 13:03 (`logs/m8-h9.txt`, `logs/m8-cost.h9-{build,fitmemory}.chromium.json`). The 1-minute load was 34 at the start and 15 at the end; other sessions' runs held the 5-minute load near 38 during the build's five runs. Per cell, five 4x runs each:

| cell | Layout count, build | with the plant | summed layout ms, build | with the plant | trigger-frame layouts, build | with the plant | verdict |
|---|---|---|---|---|---|---|---|
| w-pill | 40 to 45 (spread 5) | 73 to 78 | 18.5 to 20.5 (spread 2.0) | 11.5 to 16.3 | 3 in each run | 5 to 6 | count and time outside the spread |
| w-seat | 49 to 54 (spread 5) | 92 to 96 | 19.8 to 25.5 (spread 5.7) | 17.4 to 21.6 | 2 to 3 | 4 to 5 | count outside, time within |
| w-flow | 47 to 68 (spread 21) | 72 to 74 | 27.8 to 35.9 (spread 8.1) | 21.7 to 27.9 | 3 to 4 | 5 to 6 | within |
| w-ctl | 0 | 0 | 0 | 0 | 0 | 0 | within (ControlsDock rests open at 1440 until S3; no trigger) |

G-11's trigger clause over the 36 trigger frames: build 2 over the bound (4 layouts), the plant 4 over (three at 4, one at 5).

**Result:** the memory saves layouts on w-pill and w-seat, so by RU-80 it stays, and S2 does not remove it. The plant adds layouts while lowering the summed layout time on w-pill and w-seat; the time is reported as read.

### H10. O-386's cross extent (C7-7) — `c531ba783`

**Built.** `m8/cross8.mjs`: the plate's block size folded and open, w-valuejs (value.js's top dock, collapse open at 1024 px and over) and w-inflow, 1440 fine and 390 coarse, both engines.

**Reading** (`logs/m8-cross-build.<engine>.json`). The folded and open block sizes are equal in every cell in both engines: 56 px at 1440, 60 px at 390. w-valuejs at 390 has one posture (collapse false under 1024 px, value.js's own rule). Only the inline size changes: w-valuejs 224 to 56 px at 1440; w-inflow 56 to 208 at 1440 and 60 to 224 at 390. There is no difference to cure, so S6's O-386 item has nothing to do and no plant.

### H11. The controls cells (RU-79, C7-6) — `822fcf428`

**Built.** The harness root's ControlsDock cells drop `collapse="closed"`: w-ctl, w-ctlout, w-fourier, w-sci, w-ctl6, w-kfcode; w-two-a and w-two-b drop their `?closed` form. w-kfcode is relabelled a ControlsDock cell of three controls, not keyframes's dock (its RibbonBar is a GlassDock `:collapse="false"` that never folds). w-sci's note says sci-report mounts no dock.

**Reading.** None: these cells fold once S3 lands, and the measure reads them then.

### H12. The names and G-13's census (RU-86, RU-87) — `c72961e3f`

**Built.** `m8/appgrep8.mjs` prints RU-86's fifteen rows at their refs (daraksha `919090cc4`, fourier `67a0c57ec`, atlas-rc `88bde3b35`, lt-integ `834c98b24`, glass at its HEAD), read-only. `m8/census8.mjs` and `m8/g13.mjs` read the glyph in three forms (a lucide `svg`, an `img`, a `picture`; `:scope > :is(svg, img, picture)`). The `[data-dock-glyph]` mark cells are gone from the harness root (RU-87); the tab seats' words carry `dock-word`.

**Reading.** 0 cited lines off their ref (`logs/m8-appgrep.txt`). G-13's census at shares 0.5 to 0.9, 1440 fine and 390 coarse: the glyph line passes everywhere in both engines; the seat line fails 40 reads in each, every one a w-glyphs cell (the labelled icon seat Focus 35.9 against 40 px and 32.8 against 44; the tab seats 38.6 against 40 and 38 against 44): RU-75's seat extent, for S5. g13 (hit areas 44 by 44 at 390, roving focus, the face box, two docks, the controls dock at 360, the fold's focus) passes as before in both.

**Plant.** g13-tabsvg bites the glyph line in both engines (table); the seat line reads 40 failures with and without it.

### The atlas session's cell: w-atlas-preset — `1039d2d18`

**Built.** `m8/atlas8.mjs` and the `w-atlas-preset` cell: one of atlas's figure plates at 375 px wide, both schemes, its legend, the legend's link and its title, composed from atlas's `PlateDock.vue` and its figure frame (read-only), with PlateDock moved onto ControlsDock (`corner="top-end"`, `within="parent"`, `expand-on` passed through, the Table and Filters seats). Two placements: in PlateDock's seat, and in the plate's head row (the tools slot out of the head row). Fine and coarse, both engines (`logs/m8-atlas-build.<engine>.json`).

**Reading**, the same in both schemes, both pointer kinds and both engines unless named:

| | folded | open at rest | open in the linger | max shift while opening |
|---|---|---|---|---|
| in PlateDock's seat: legend | 303.8 px² | 0 | 0 | 0 px |
| the legend's link | 303.8 px² | 0 | 0 | 0 px |
| the title's box | 0 | 0 | 0 | 0 px |
| in the head row: title's box | 1,500 px² | 2,400 px² | 2,400 px² | 0 px |
| the title's text | 475 px² (Chromium), 487 (WebKit) | 1,303 (Chromium), 1,334 (WebKit) | the same as at rest | 0 px |
| legend and link | 0 | 0 | 0 | 0 px |

In PlateDock's seat the open dock's two seats sit past the plate's or the figure's edge (seats to x 406 on a 375 px plate); in the head row none does. No neighbour moves while the dock opens in any cell (160 frames read).

### What could not be built, or was not read

- **H1.** g3-retarget does not bite under judge8 in either engine. RU-71 asks that it still bite; no ruling names a new form, so G-3's retarget clause has no biting plant on this judge.
- **H2.** The WebKit touch failures (select-touch, sheet-touch, sheet-touch-scrim: the second tap's `pointerdown` cancelled, then no `click`) are a fault of the build, not the harness: S6's (RU-72). The cancellers are reka-ui's `SelectTrigger` and `DialogOverlayImpl`. The close that never comes is reka-ui's dismissal, which waits for a touch `click`.
- **H3.** g1-lift is not seen by the unit witness in either form, as in MEASURE-7.
- **H4.** cost8's reread with phase marks (`build2`) ended at w-ctl when its browser closed: 24 of the 36 trigger frames read. The 5 DockLayer layouts and 11 sampler layouts in the two frames after a trigger are named, not cured (RU-74: the sampler's leaves with the merge, S1). G-14's touch group does not bite in WebKit: the WebKit project is a desktop one, and WebKit 2287 matches `(hover: none)` only in a touch context. Seeing it there needs a WebKit touch project, which no ruling names, so the item stops at the reading.
- **H5.** The DarkModeToggle paints at its designed opacity 0.8, so RU-82's unsettled rule fails 22 icon reads in Chromium and 26 in WebKit on it; recorded with its steady opacity, not excused.
- **H7.** In Q14's prototype strip the open in-flow dock reaches past the row, and the crop to the row (RU-83) cuts it.
- **H8.** G-16 reads RED by the fixture on this build: 103,644 B against 102,631. The used plant cannot turn a red clause red, so its bite is the fixture moving by its size (2,602 B) while the unused one leaves it unchanged.
- **H10.** No difference to cure, so no plant.
- **H11.** No reading until S3 lands.
- **The atlas cell.** In PlateDock's seat the open dock's seats lie past the plate's edge; read and reported, not cured (no ruling covers it).
- The unstaged deletions under `rows/plant-g4-snap/` that the resume note names were not present at either resume on 2026-11-19: `git status` shows none, so nothing was restored or committed there.
- Nothing of queue R2 is pending: queue R3 read all of it (`7d8125a7e`).


## Part S: the source

Seat source-8, claude-opus-5-5, 2026-11-19 to 2026-11-21. Items S1 to S7 of RULINGS-7's final eighth-pass order, in order, one commit each, and ORCH-LINES-7 line 4 (the card and rounded corner). The seat was stopped three times (the battery at 22:22 on 11-19 and 01:59 on 11-20, then the weekly limit from 13:00 on 11-20 to 15:07 on 11-21); each stop's uncommitted work was saved as a patch in `harness/s8/` and taken up again, and no commit or banked cell was redone.

**How the seat reads an item.** Each item is laid out as a tree before it is committed: `harness/s8/cand8.sh` archives `HEAD` without `docs/` into `.s8-cand`, lays the worktree's uncommitted `src/` and `tests/` files over it and links `node_modules`. Every plant and candidate value is applied to that tree, never to the worktree. `s8/devtree.sh` copies MEASURE-8's pages into it and serves it with vite on 5433 (it reads the tree's source live), and the readers run against that server. A built cell (G-11, G-16) builds the tree (`m8/build8.sh`) and serves the build with `s8/prevtree.sh`, which deletes the build when its cells are read. Every run is under `guarded` (WebKit under `--exclusive webkit`, the cost cell on the GPU lane with `--cpu-cores 0`), one heavy run at a time. Paths below are relative to the worktree's `docs/tranches/BL/design/dock/wi8/measure/`.

After each item: the typecheck (`vue-tsc` on the src and test configs, run in the item's tree, since the worktree's untracked `demo/__anim` copy carries another seat's stale harness page) and the 43 vitest files that read the dock (`--maxWorkers=2`).

### S1. The merge of master (RU-66, C7-1) — `18f543021`

**Did.** Merged `master` at `aeb6f3ee7` (its source equals v11.1.0 plus `e7c0be688`; the commits after add docs only) into `bl/dock/wi8`, whose base `99a1389e6` predates both releases. The commit message lists every 11.0.2 and 11.1.0 dock commit since the base as carried or superseded, with the witness for each superseded one, and every conflict with the ruling that resolved it. In short:
- Carried: `useDockRunMark.ts` (1263cd5cf and its seven fixes) onto the redesign's run. `GlassDock` renders the mark; run.css's seat rules, `useDockRun`'s seat list and the carrier's three run loops and mutation records skip it (`isRunSeat`), so it is never carried, faded or held as a ghost. It paints `--dock-control-active-bg`, the dock's current step, and the seat under it paints none. Also carried: the border-edge progress rim, the persistent face, the owner's `--radius-dock` knob, the plate edge's one mix, O-232, O-263, O-270, the six-second idle window, the gradient grain, O-269's dark seat fills for a loose `DockControl`, and `useGlassBackdropLuminance.ts` as v11.1.0 wrote it (the resize path's `requestBatchSample()`).
- Superseded: `dockMorphMeasure.ts` and its 11.1.0 changes (the carrier replaces the measure; witnesses `release-11-0-2.spec.ts`, `ro-loop.spec.ts`, and RU-76's G-13 line for the face); 1263cd5cf's face rule (C2-1's face covers it); the widened open seat and its exchange (RU-28, R-5); the per-control stagger's edits (R-3).
- Tests: master's idle-window, persistent-face and press-posture tests take the first real move (R-2 ended the enter-alone open); `g-dock-lattice`, `dock-hover-corner`, `release-10-1-2.spec.ts` and `release-11-0-2`'s hover harness restated as the message lists.

**Reading** (on the merged tree, `.s8-cand` at `18f543021`):
- *Names* (`logs/s8-s1-names.txt`): 82 against v11.1.0's 80 (+19 −17, net +2), the same as the tip before the merge: the merge adds no name, as the budget predicted.
- *Dock lines* (`logs/s8-s1-lines.txt`, code by ORCH-LINES-7 item 2): **5,250 code** against v11.1.0's 4,741 (509 over), `wc -l` 11,224. `useDockBody.ts` 1,100 code (1,433 `wc -l`); `useDockRunMark.ts` 181 (281).
- *G-16* (`logs/m8-g16-s1.json`, `m8/g16fix8.sh` on the archive): the fixture's total JS **105,259 B** gzipped against v11.0.2's 102,631 (2,628 over: RED by ORCH-LINES-7 line 1); the entry 24,749 B (17,827 on v11.0.2), the closure 37,680 B in 19 files (38,758 in 27), the union closure 53,355 B in 37 files (54,405 in 45).
- *G-11's batched sample by stack* (C7-M6; `logs/m8-cost.s1.chromium.json`, `m8/cost8.mjs` on the GPU lane, ANGLE Metal on the M5 Max, on the merged build): of 36 trigger frames 4 are over the bound (w-pill 1x 5 against 4, w-pill 4x 4 against 3, w-flow 1x 7 against 4, w-seat 1x 4 against 3). The sampler's layout in the trigger frame fell from 16 frames (the build before the merge, H4) to 4; in the two frames after a trigger it rose from 11 to 28 (w-pill 10, w-flow 10, w-seat 8), each forced inside a rAF callback with `useGlassBackdropLuminance` on the stack. So the batched sample moved its forced layout one frame later, as C7-M6 said it might: it is not cured. DockLayer's `useResizeObserver` layout after a trigger stays at 5.
- *The run mark* (`logs/s8-s1-mark.log`, `s8/mark8.mjs`: w-std at 1440, light, opened by hover, then a press on Library and then on Bookmarks): the second change of page glides (48 px over 26 frames between its ends, the largest step 3.74 px, 0.078 of the travel), the mark ends on the seat, and the seat under it paints no fill. The first change did not glide: the dock mounts folded, its hidden face has no box (RU-17), so no mark existed before the first press and it appeared at its destination. Cured in S4. The plant (`s8/markplant.py`: the move removed) jumps the second change 48 px in one frame (step share 1). master's `GlassDock.run-mark.test.ts` passes under the plant (9 of 9; `logs/s8-s1-markplant-unit.log`): the unit test reads no glide, so the engine cell is the plant's witness.
- *ORCH-LINES-7 line 4* is reported on its own below.
- *Units*: see S2 (the S1 units ran with S2's).

**Not read by this seat.** G-14 with `release-11-0-2*`, `ro-loop*` and master's snapshot re-taken (`q/spool/60-*` and `70-*`): queued on 11-19 and cut by the 22:22 stop, and not run again; it is part M's whole measure (G-14 in three projects with the 11.0.2 and 11.1.0 specs and the run-mark test). G-14's run-mark plant in the browser is mark8's (above).

### S2. The removals (RU-78, RU-87, RU-80, RU-68, RU-85) — `87176ff17`

**Did.** `pinned` and `update:pinned` leave `GlassDock` with `useDockState`'s `setPinned`; `data-dock-scope` goes with the carrier's per-frame write of `--dock-expand-t` onto that ancestor; `data-dock-glyph` leaves the icon seat's two selectors and the tab seat's one (a glyph is a direct `svg`, `img` or `picture`). A trigger inside a dock takes the full ink. The 28 % press step leaves `.glass-dock`: inside a dock a press is the seat's press scale over its own fill and one 2 % layer of the ink; the seats' `:active` fills are written `:where(:not(.glass-dock *))`, so a loose `DockControl` keeps the `:root` press. Struck-history comments and the stale lines RU-85 names go; no rule, value or selector changes with them. The fit memory stays: H9 read that it saves layouts (w-pill 40 to 45 with it, 73 to 78 without), so RU-80's condition is not met. `controlCount` and `#rim` stay.

**Reading.**
- *Names* (`logs/s8-s2-names.txt`): **78** against 80 (+15 −17, net −2), as RU-87's arithmetic says.
- *Dock lines* (`logs/s8-s2-lines.txt`): **5,221 code** (480 over 4,741), `wc -l` 10,347 (the comment cut takes 877 lines by `wc -l` and 29 of code).
- *Units* (`logs/s8-s2-units.log`): 389 pass, 2 fail, both `tests/gates/overfit-structure.test.ts` (export reach and the `void`-kept arrays), which fail on the tip before the merge too.

### S3. ControlsDock folds at every width (RU-79, C7-6) — `969137aac`

**Did.** `collapseFor` returns `false` for one control and `"closed"` for two or more, at every width; `useMediaQuery` and the phone rule go (reverts `95004b894`'s phone-only fold). No prop returns. The README says a row of controls that must never fold stays a `GlassDock` with `:collapse="false"`.

**Reading.**
- *Units* (`logs/s8-s3-units.log`, 44 files): the two overfit lines as in S2, and three lines of `tests/public-surface.spec.ts` that read the worktree's `dist/`, built before the merge (the roster and the shipped sheets); no dock test fails.
- *Fold* (RU-79's witness, read after the stops on S4's and S5's trees, where `ControlsDock.vue` is as S3 left it). `s8/fold8.mjs` reads each of the ten controls cells at 1440 and 390, 1.5 s after load with the pointer away (`logs/s8-fold-s3.<engine>.json`): 16 of 20 rest as RU-79 says in both engines; w-ctlout and w-daraksha, whose second and later controls arrive through `DockOutlet` after mount, read open. They mount as one-control docks, and when the count grows the dock lingers like any open dock before it folds (RU-18, `useDockState`'s `alwaysExpanded` watch), so 1.5 s is inside that linger. `s8/fold8b.mjs` reads every cell again 9 s after load, past the one idle window (`logs/s8-fold-s3b.<engine>.json`): 20 of 20 in both engines; w-ctlout and w-daraksha read open at 1.5 s and folded at 9 s. RU-79's plant (`foldplant.py`, the phone rule restored) leaves all eight cells of two or more controls open at 1440 in both engines (12 of 20; at 390 they still fold).

### ORCH-LINES-7 line 4: the card and rounded corner — read on the merged tree, no cure

**Reading** (`logs/s8-s1-corner.log`, `logs/s8-corner-s1.chromium.light.json`; `s8/corner8.mjs` on the merged tree `18f543021`, Chromium, 1440, light, one run). w-card and w-rounded (with w-pill beside them) were folded at rest, opened by hover and folded by a press outside. Every animation frame of both travels and half a second at each rest read the root and the plate: the four computed corners, the used corner after CSS's overlap rule, and the scale every transform, `scale` and `zoom` from the element up puts on each axis. A frame whose x and y corner differ by more than 0.5 px is unequal.

| cell | frames (morphing) | frames under a scale | unequal frames, plate / root | folded rest | open rest |
|---|---|---|---|---|---|
| w-card | 587 (92) | 0 | 0 / 0 | 56 by 56, `50%`, a disc | 208 by 56, 24 px |
| w-rounded | 586 (92) | 0 | 0 / 0 | 56 by 56, `50%`, a disc | 160 by 56, 16 px |
| w-pill | 586 (92) | 0 | 0 / 0 | 56 by 56, the stadium | 208 by 56, the stadium |

The fault atlas's G1 names (x and y radii differing in up to 50 of 370 frames on v11.1.0, because the counter-scale did not reach these shapes) needs a scale in travel, and on the merged tree nothing in the dock is scaled on any frame (RU-13: the carrier moves the plate's inset and corner, never a scale). The redesign has removed the morph that shows the fault, so by line 4 the item is recorded and stopped: no counter-scale is extended, and no witness is built. Not read by this seat: v11.1.0's tree (the harness root's cells need the redesign's components), WebKit and dark (the measuring seat's cells by line 4).

**For the next ruling round.** A collapsed `card` or `rounded` dock rests as a disc on the merged tree (its corner computes `50%` on a 56 px square), where atlas's G1 reads v11.1.0's collapsed disc of either shape as a square with 16 px corners. Whether it should be a disc or keep its corner is not ruled; recorded here and left.

### S4. The plate and the fills (RU-67, RU-68, C7-3, C7-4) — `a72a4775e`

**Did.**
- *The plate:* `.glass-dock { --glass-level: 1 }`, one rule for both schemes. H6 recorded RU-67's rule returning level 1 for dark (today's dark dock shows more of the grid than the light dock does at level 1, in both engines; level 1 shows no more, and its plate stands off the warm field under 1.70). The dark arm the ruling names would write the same number, so it is not written. Reverts `5eccb8554`'s level line (0.4).
- `shell.css`'s dark blur arm takes `.dark .glass-dock, .glass-dock.dark`, so a dock that carries `.dark` in a light document (slides) takes the dark blur (C7-3).
- The README's recipe for a plate outside a dock that should read as the dock's (daraksha's neck, a bare plate): the `glass-plate` utility with `--glass-veil-tier: var(--glass-veil-dock)`. It sets no level: the level is 1 outside a dock, and 1 is the dock's level in both schemes (C7-4).
- *The fills:* current 10 %, hover 8 % of the dock's ink, one pair for both schemes (RU-68 as amended for R7-5, R7-3, C7-M3, C7-M4). The press stays S2's 2 % over the seat's own fill.
- *The carried run mark* (S1's reading): on a dock that mounts folded the first change of page now glides from the seat it leaves. The mark's observer records the old `aria-current` value; when no mark exists yet, it takes the plate of the seat that lost the destination (one that has a box) as the start, and `sync()` glides from it as it does for every later change.

**How the step was taken** (RU-68's order). The union, current at 10, 12, 14 and 16 % with hover at 8 %, was read on the six pages that carry marks at level 1 (Chromium on 11-20, `logs/m8-ink-s8-s4-c{10,12,14,16}h8.chromium.json`; c16 ended at dials when Chromium's GPU process failed, 36 of 56 cells), and the step taken was then read in both engines on the item (`logs/m8-ink-s8-s4-final.<engine>.json`):
- No step holds every current and pressed seat's words at 4.5 and every mark at its floor in either scheme. In light, action-row's pressed Format reads 4.4 at 12 % and 4.25 at 14 %, while the marks fall under v11.0.2's at 10 % (and at 12 and 14 %). In dark, nav's current Reports reads 3.32 at 10 %, 3.2 at 12 %, 3.08 at 14 % and 2.97 at 16 % in Chromium, and dials's 5Y and Lin fall under 4.5 from 12 %.
- So the words win (RU-68): in light the strongest step the words allow is 10 %; in dark no step holds them, and question 21's default (the selected patch fainter) takes the weakest, 10 %. One step holds both schemes, so no dark arm is written.
- The hover: no step in P0a's 5 to 8 % reads against its own ground as v11.0.2's hover does on nav's Home, action-row's Copy and canvas-tools's Layers (at 8 %, Chromium 1.178, 1.165 and 1.002 against 1.263, 1.227 and 1.272 on the field), and a weaker hover reads weaker, so 8 % is taken and those cells go to question 18.

**Reading** on the item, both engines:
- *The level token* (`logs/s8-level-s4f.<engine>.json`, `s8/level8.mjs`): computed `--glass-level` 1 light, 1 dark, 0.3 under `prefers-contrast: more`, 0 on `data-backdrop-mode="static"`, and 1 with the dark blur on a `.glass-dock.dark` in a light document: 7 of 7 in Chromium (0 under `prefers-reduced-transparency` in both schemes, by CDP), 5 of 5 in WebKit (no switch for reduced transparency there). C7-3's plant (the blur arm back to `.dark .glass-dock` alone) fails the `.glass-dock.dark` cell in both engines (its blur reads light's `saturate(1.2)`). The dark arm's plant RU-67 names cannot be planted: there is no dark arm.
- *G-15 at the step taken* (`ink8`, the six mark pages, 56 cells, against v11.0.2's base):

  | | Chromium light | Chromium dark | WebKit light | WebKit dark |
  |---|---|---|---|---|
  | current and pressed words under 4.5 | 0 | nav's Reports 3.27 and 3.32 | 0 | nav's Reports 4.01 and 4.08 |
  | other words under 4.5 | 0 | dials's Range, Scale and 2024, 4.23 to 4.44 | 0 | 0 |
  | marks under their floor | 10 | 10 | 10 | 10 |
  | hover against its ground under v11.0.2's | 6 (nav, canvas-tools, action-row) | 2 (canvas-tools's Layers) | 6 | 2 |
  | hover against current, least | 1.005 | 1.003 | 1.003 | 1.0 |

  The marks under their floor in light, Chromium: nav's Reports 1.238 and 1.247 (v11.0.2 1.369, 1.394), dials's 5Y and Lin on the flat ground 1.466 and 1.461 (1.512, 1.817), canvas-tools's Grid and Draw, action-row's Format 1.2 and 1.227 (1.28, 1.333); in dark nav's Reports, dials's 5Y and Lin on the field (1.065 and 1.06 against 1.2 and 1.756), canvas-tools's Grid and Draw, action-row's Format. WebKit's lists are the same seats. Every hover reads under 1.2 against current (question 18).
  Level 1 fails G-15 in dark on words no fill step reaches: nav's current Reports reads 2.97 to 3.32 in Chromium at every step of the union and 3.19 to 3.24 under RU-56's plant (4.01 to 4.08 in WebKit), and dials's labels read 4.18 to 4.44 in Chromium. By ORCH-LINES-7 line 3 that is reported and question 21's default applies; the level stays RU-67's.
  Some marks read as no fill painted (the seat's fill equals its ground within 0.01): in WebKit rail's Regions and canvas-tools's Grid and Draw on both grounds and in both schemes, in Chromium canvas-tools's Grid and Draw on some grounds. The 11-20 probe (`logs/s8-fillprobe-*.json`) read those seats' computed fill as the capsule step in Chromium, with the dock's ink resolving through the bright bucket's `contrast-color(var(--card))` (`glass/ladder.css:254-279`). Not traced further: whether WebKit 2287 paints a `color-mix()` of `contrast-color()` is a reading for part M.
- *RU-56's plant read again at these levels* (`bakedplant.py`, the `:root` plates restored inside the dock; `logs/m8-ink-s8-s4-final-baked.<engine>.json`): it no longer bites on the marks. In Chromium the marks under their floor fall from 20 to 10 and the hover failures from 8 to 4: at 10 % the dock's own fills are weaker than the `:root` plates, so G-15's mark clause has no biting plant at the step RU-68 takes. WebKit reads the same way (marks under their floor 20 to 10, hover failures 8 to 6).
- *The run mark* (`logs/s8-mark-s4f.<engine>.json`): the first change of page on w-std glides (91 px over 26 frames between its ends in Chromium, 22 in WebKit; the largest step 0.12 and 0.14 of the travel) and so does the second (48 px over 26 and 42 frames, largest step 0.07 and 0.08); the mark ends on the seat, and the seat paints no fill. Under RU-66's plant (`markplant.py`, the move removed) the first change appears at its destination with no frame between and the second jumps 48 px in one frame, in both engines.
- *Units* (`logs/s8-s4-units.log`): 389 pass, the same 2 overfit lines fail. *Typecheck* (`logs/s8-s4-typecheck.log`): the src config is clean; the test config fails on three lines that fail on `HEAD` before the item (`DockOutlet.test.ts:64`, `FourierField.smoke.test.ts:18-19`), none in a file the item touches.

### S5. The seat extent and the folded face's glyph (RU-75, RU-76 as amended for R7-8, RU-87) — `37e37086e`

**Did.**
- The labelled icon seat (an icon seat that also holds a word) takes `min-block-size: var(--dock-control-size)` (`controls/icon-button.css`), RU-75's second selector.
- The folded face's direct glyph, an `svg`, `img` or `picture`, takes `--dock-control-glyph-size`, the icon share of the seat, as a seat's glyph does (`morph.css`). The 1 rem floor stays, and a glyph the site sized with a class keeps its size.
- The harness's compositions drop `h-4 w-4` from each folded face's direct glyph: `m6/comp` corner-controls, chrome and figure-tools (its glyph sits in a `<Transition>`, which renders it as the face's direct child), `m7/comp` chrome, `m8/comp` pill. canvas-tools's composed face keeps its class (R7-8).

**Not built.**
- *The tab seat's half of RU-75.* The ruling read the tab seat's `min-height` as falling to `auto` (`tab-button.css:26`). Inside a dock it does not: `density.css` sets `--dock-tab-h` on every dock (`calc(38px * var(--dock-scale))` on `.glass-dock`, `:116`; `32px` on the cockpit preset, `:179`), so a tab seat's `min-height` is 38 px, its content (38.59 px at 1440) wins, and the default the ruling changes is never read inside a dock. Read on the item with the default changed: the tab seats still read 38.59 against 40 at 1440 and 38 against 44 at 390, and the ruling's plant (the default back to `auto`) changes nothing (30 seat reads fail with it and without it, `logs/m8-census-s8-s5-tabauto.<engine>.json`). The hypothesis does not hold, so the change was taken back out before the commit and the half stops here. A cure would move `density.css`'s `--dock-tab-h` rungs, which no ruling names; that is the next round's. The drafts that say gaggle's, gregg's and keyframes's tab seats grow (C7-12) do not hold on this build.
- *bl/demo's compositions,* and its `nav.stage.vue`'s duplicated `<style scoped>` block: another worktree, which this seat does not touch; for bl/demo's seat.

**Reading** on the item (`.s8-item`, served on 5434; its tree carried the tab default too, which no dock reads):
- *G-13's seat line* (`m8/census8.mjs`, shares 0.5 to 0.9, 1440 fine and 390 coarse; `logs/m8-census-s8-s5.<engine>.json`): Chromium 30 reads fail, every one a tab seat of w-glyphs (Home, Image, Picture: 38.59 against 40 and 38 against 44); the labelled icon seat (Focus) now holds 40 and 44, where it failed 10 reads before (35.91 and 32.78). WebKit reads the same 30, on the same seats. RU-75's plant on the icon seat (`iconword`: its seat height removed) brings Focus's 10 failures back (40 in all). The glyph line passes everywhere.
- *The folded-face line* (`s8/face8.mjs`, G-13's composition line extended to folded faces; `logs/s8-face-s5.<engine>.json`): 8 faces are judged, figure-tools's three and the pill at 1440 and 390, and each direct glyph equals the share within 0.5 px (36 px at 1440, 39.59 at 390). WebKit the same, 8 of 8. RU-76's plant (`facerule`: the face rule removed) fails all 8 in both engines, each glyph at lucide's own 24 px, since the size class is off. Not judged, and listed: the faces of docks that rest open (nav, chrome, pager, corner-controls, action-row at both widths, rail at 390), composed faces (canvas-tools, transport) and rail's empty face at 1440.
- *G-15 on chrome* (`logs/m8-ink-s8-s5-chrome.<engine>.json`): chrome's dock rests open in ink8 (no folded posture at the shot), so its folded hexagon is not read and RU-76's fallback (its opacity in the open dock) has nothing to read. In Chromium the page fails one word, File at 3.85 in dark over the field (level 1, as on nav in S4); in both engines the DarkModeToggle fails at its designed 0.8 opacity (the unsettled rule, as in H5).
- *Units* (`logs/s8-s5-units.log`): 389 pass, the same 2 overfit lines fail. *Typecheck* (`logs/s8-s5-typecheck.log`, on the item's tree): the src config is clean; the test config's three lines as in S4.

### S6. G-8's touch cures, the reread mark, O-386 (RU-72, RU-74, C7-7) — `88ff3ff7e`

**Did.**
- The Select's dock trigger closes an open list on a touch press (`DockTrigger.vue`). It notes at `pointerdown` that the list was open, and on that press's `pointerup` closes it in a microtask, after reka's own `pointerup` handler, which asks to open. H2's reading: reka's trigger cancels a touch `pointerdown`, and its outside dismissal waits for the `click` the press ends in, which WebKit 2287 does not send.
- The shared scrim (`dialog/ModalScrim.vue`, 10 lines outside the dock directory) sends that `click` itself on a touch press's `pointerup`. reka's dismissal listens for one click, so Chromium's own click after it closes nothing more, and a `locked` dialog still refuses the press through reka's `pointer-down-outside`.
- `useDockBody.ts`'s `dock:reread` mark is emitted only for a frame whose flag moved or that read the run again: `fitRun` returns `reread` when the inset moved or RU-54's second read ran. A deciding frame that changed nothing is a plain trigger frame. The detail tells `fit` (a flag moved) and `reread` apart.
- O-386: nothing to cure. H10 read the plate's block size equal folded and open on value.js's composition and w-inflow, both engines, both widths.

**The first cure tried** (`s8/s6-g8-tried.patch`, `logs/*s8-s6a*`): the scrim's cancel taken off for touch, and the close on a touch `pointerup` written in `select/SelectTrigger.vue`. It cured nothing in WebKit. `SelectTrigger.vue` is the plain Select's trigger; `DockTrigger` mounts reka's `SelectTrigger` directly, so that half never ran in a dock. On the scrim the tap's `pointerdown` was no longer cancelled, and WebKit still sent no `mousedown` or `click` (pointerdown, touchstart, pointerup, touchend). So the cancel does not explain the scrim, and the cure that needs no click from the engine replaced it.

**Not cured.** The plain Select's trigger (`select/SelectTrigger.vue`) carries reka's same cancel. No G-8 cell reads it, so it is left for the next round.

**Reading** on the item (`m8/trig8.mjs` through `s8/s6run.sh`; `logs/m8-trig-s8-s6*.<engine>.json`):
- *G-8* passes every cell in both engines: menu, select, popover and sheet by mouse and by touch, select-touch-item, sheet-touch-scrim, tapseat and fourier's AppDock. In WebKit select-touch, sheet-touch and sheet-touch-scrim now close once on the second tap, the dock stays open, and focus returns to the seat. WebKit's events on the scrim tap: pointerdown (cancelled), touchstart, pointerup, the scrim's click, focus into the sheet and back to its seat.
- *Plants:* g8-exempt (the open-surface exemption removed) fails 6 cells in both engines (menu, select and popover, by mouse and by touch); g8-trigger (the scrim stamp off and the quiet return's timer cleared) fails the 3 sheet cells in both. The touch cures' own plant is the build (H2: the three WebKit cells fail without them) and the first cure (s6a).
- *G-11* (`logs/m8-cost.s6.chromium.json`; the item built with the dock's marks, `m8/cost8.mjs` on the GPU lane, ANGLE Metal on the M5 Max): of 48 trigger frames 6 are over the bound. Four are first-open frames at 1x that carry RU-54's reads, at 5, 5, 6 and 8 layouts against 4 (w-ctl, w-seat, w-pill, w-flow); two are frames of four layouts the mark does not name, against 3 (w-pill 1x, w-ctl 4x). In the two frames after each trigger the luminance sampler still forces a layout under `useGlassBackdropLuminance`'s stack (38 entries, with DockLayer's `useResizeObserver` in w-flow's), as S1 read: the batched sample is not cured. The rest clause reads no rAF call, mutation or running animation in any cell in Chromium; in WebKit it was not run by this seat (item 4 of the order, part M's).
- *Units* (`logs/s8-s6-units.log`, the 43 dock files and the scrim's and Select's four): 430 pass, the same 2 overfit lines fail. *Typecheck* (`logs/s8-s6-typecheck.log`): the src config is clean; the test config's three lines.

### S7. RU-61's second round, a prototype that does not join (RU-84, R7-4) — `bcb561056`

**Did.** The prototype is applied to the item's tree only (`s8/ru61b.py`), in two forms, and nothing joins the source: question 14's default is no overlay in 11.2.0, and the covered legend link (R7-4) is the owner's.
- *m7:* MEASURE-7's margin ported onto the merged carrier. On the open trigger an in-flow root takes a negative inline margin on the side away from its anchor, what the open posture adds, and reads its box again.
- *arith:* the second round's form. The same margin, written from the extents RU-35 holds, and the kept box moved by the margin's arithmetic, with no read of the root after it moves.
Both take the margin off on the fold's trigger before the folded layout is read, and write it after the fit key's extents are read.

**Reading** at 1440, light, fine pointer, the dock opened by hover (`s8/ru61read.mjs`, `logs/s8-ru61-s7-{base,m7,arith}.<engine>.json`). The two engines read the same to the pixel.

| fault | build (no margin) | m7 | arith |
|---|---|---|---|
| w-inflow's neighbour | 76 px | 0 | 0 |
| atlas's legend, its link | 36, 36 | 27, 26 | 27, 26 |
| atlas's end edge (`anchor="end"`, should hold) | +36 | −27 | −27 |
| keyframes's Play, `anchor="start"` | 97 | 4 | 4 |
| keyframes's Play, centre | 97 | 97 | 97 |
| G-11 trigger frames over the bound, w-inflow (Chromium) | 1 of 12 | 2 of 12 | 1 of 12 |

- *The legend's 27 px against the anchored edge's arithmetic.* With `anchor="end"` the end edge should hold and the start edge move by the 108 px the open posture adds. The end edge moves 27 px. In that row the root's inline margins are `auto`, 53 px used on each side at the folded rest. The written start margin replaces one auto margin, and the row's free space is split again over the auto margins left, the dock's end and the legend's start, so the end edge and the legend move together. The arithmetic holds only for definite margins. A cure needs the folded used margins held with RU-35's extents, which the carrier does not hold today; not built this round.
- *The 4 px.* With `anchor="start"` the start edge holds; the Play seat moves 4 px because the open run's first seat sits 4 px from where the folded face's glyph sat. That is inside the dock, where the margin does not reach. The centre anchor grows both ways and the Play moves 97 px, as designed (not a named fault).
- *The extra layout.* m7 adds a 4x trigger frame at 4 layouts against 3 (MEASURE-7's fault) and its first open reads 5 against 4; arith keeps every 4x trigger frame within the bound, and its one over is the first open (5 against 4, where the build reads 6). The cost cell ran on the item's dev server with the marks on (one server for the three, so the counts compare with each other, not with S6's build).
- *The cover* is the owner's (question 14) and was not read this round.

**Not run.** `tools/shift-gate.mjs` over every composition at 1440 and 390, and the cover reading: they gate a join that question 14's default does not allow.

### After the items

- *Dock lines* (`logs/s8-lines-s3-s6.log`, code by ORCH-LINES-7 item 2): 5,219 at S3, 5,225 at S4, 5,234 at S5, 5,246 at S6 (`wc -l` 10,346 to 10,389), each over v11.1.0's 4,741. Names were not counted again after S2.
- *Still RED or not run at the tip:* G-16's fixture (S1, 105,259 B against 102,631); the dock's code lines; G-15 in dark at level 1 on words no fill step reaches (nav's current Reports, dials's labels), and its mark clause with no biting plant at 10 % (question 21's and 18's defaults); G-13's tab seats (S5); G-11's trigger clause (S6) and the batched sample (S1, S6). Not run by this seat: G-14 with the 11.0.2 and 11.1.0 specs and the run-mark test, G-11's rest clause in WebKit, the corner on v11.1.0's tree and in WebKit and dark, bl/demo's half of S5, and RU-61's shift gate.
- The branch `bl/dock/wi8` is pushed at `575084358` (a docs commit after S7 with S1's readings the 11-19 stop left uncommitted, the corner reading, the spool and the line count). The candidate trees are removed (`logs/s8-disk.log`).

## Part M: one whole measure

Seat measure-8, claude-opus-5-5, 2026-11-21 to 2026-11-22. Item M of RULINGS-7's final eighth-pass order, on the tip `575084358` of `bl/dock/wi8`. Paths below are relative to the worktree's `docs/tranches/BL/design/dock/wi8/measure/`; part M's harness is `harness/pm/`, its queue `harness/pm/q/spool/` (one item file per run, run in name order by `pm/runq.py`, every run, retry and skip logged with the 1-minute load in `logs/pm-q.log`).

**The one build.** `git archive` of `575084358` without `docs/` in `.pm-tip` (the worktree's `src/` is never read), built once (`logs/pm-build.log`, `logs/pm-build.sha`) and served by `vite preview` on 5401 for every cell. The plants are applied to the same tree and read on its dev server (5404, `VITE_DOCK_HOLD=1`, which reads the tree's source live); after each revert `pm/clean.py` checks every `src/` file against `HEAD`'s blob (677 files, clean after every plant). G-14 runs in that tree and in `.pm-master`, the archive of master's re-taken snapshot (`aeb6f3ee7`); v11.0.2's page is `.v11.0.2/dist-base` on 5403. The pack is of the same tree. One tree per version, as the disk rule asks.

**How the runs went.** One queue (`harness/pm/q/spool`, `pm/runq.py`) ran every item from 17:54 on 11-21 to 04:56 on 11-22: 510 runs, each read on its first attempt (no retry, no item with a non-zero exit), and the guard refused none. The runner restarted the preview server (5401) every 30 minutes. WebKit runs waited for the machine-wide lock behind other sessions' exclusive runs (release-11.1.1's critics, P17's cure, owner-1112's bisect); the longest single wait was 34 minutes (level8, 20:19:54 to 20:53:54), none over 60. Two of the owner's frames were taken twice (M5). `pm/rule67.py`'s first run wrote over part H's `logs/m8-h6-rule67.*`; both were restored from git, and the script now writes `logs/pm-rule67.*`. The kernel zone warning stood armed throughout, a warning only.

**Loads.** The 1-minute load at the start of every run is in `logs/pm-q.log`: 4.4 to 28.7 over the 510 runs. It is at most 21.6 at the head of a plant or G-14 group log. None is over 36. The void lists (`logs/pm-void-<engine>.txt`) name no cell.

### M1. Every cell, both engines

The probes: the 147 scenarios of `pm/scenarios.txt` in each engine (`rows/pm`), and RU-71's return run twenty times (`rows/pm-r30`). The side cells: `clock2`, `m6/cells6`, `g13`, `g7`, `g8`, `c2`, `m8/census8`, `m7/comp58`, `s8/face8`, `m7/fit7`, `m8/trig8`, `m7/adds7`, `m8/ink8` (against v11.0.2's base), `s8/level8`, `s8/mark8`, `m8/cross8`, `m8/atlas8`, `s8/fold8b`, `s8/corner8` in both schemes, `m8/cost8` (Chromium on the GPU lane, WebKit for the rest clause). Judged by `pm/analyse.sh` (judge8, gates4, seat4, g9b, read6, g6c; `logs/pm-gates8-<engine>.txt` and beside it) and, for the side cells, against MEASURE-7's build leaf for leaf (`m7/sidediff.py ../logs m7p pm <engine>`).

| gate | Chromium | WebKit 2287 | plants (M3) | verdict |
|---|---|---|---|---|
| G-1 · the clock | every clause as MEASURE-7 leaf for leaf within 25 ms but one: **(k) folds 9 ms after the leave** (6,528 in MEASURE-7). (f): a held finger holds and the dock folds 6,015 ms after the lift; a seat tap 6,012; at 390 a tap 6,008 and a tap outside 4 ms; RU-43's rail rests open. The unit witness passes with the tap's FocusEvent and with `onFocusIn` bare (`logs/pm-h3-unit.txt`) | the same but one: **(k) 4 ms** (6,529). Tap on a seat 6,007; (f) by the unit witness | g1-linger and g1-lift bite in both (g1-lift by the cells; the unit passes under it); g1-presshold and g1-frompress bite the unit | **RED** on (k), both engines |
| G-2 · the fold (RU-70's fade clause) | 136 of 136 segments over 71 scenarios, the controls docks' 1440 folds included (`p3-fold-ctl-*-fine`, `-dark`) | 136 of 136 | 13 of 14 bite in both; **g2-lane bites in neither** | GREEN; **the lane-corner clause unwitnessed** |
| G-3 · reversals (judge8) | 18 of 18 over 12 scenarios; RU-71's return run twenty times: 20 runs, none late (each turn 2 rows against a bound of 3) | 18 of 18; 20 runs, none late | g3-retarget bites in Chromium only | GREEN; **the plant does not bite in WebKit** |
| G-4 · content and seat set (RU-70) | 43 of 43 over 16 scenarios; every seat move carried with no violation (`logs/pm-seat-chromium.txt`; the long run's far seat moves 10 seats 208.5 px) | 43 of 43; seat moves the same | g4-join, g4-ghost, g4-snap2, g4-scroll, g4-openseat, g4-groupframe and g2-facehalf bite in both | GREEN |
| G-6 · hover and press change no box | hover cells 0.00 px (1,155, 1,184 and 321 rows); **the press cell 225.66 px**: the dock folds 299 ms after a press on Home and a drag off the dock (0.01 px in MEASURE-7) | the same: hover 0.00 px, **press 225.66 px** | g6-flow bites in both; g6-overflow in WebKit only (Chromium's one failure under it is the press cell, red on the tip) | **RED** on the press cell, both engines |
| G-7 · provide | every leaf as MEASURE-7 | every leaf as MEASURE-7 | g7-provide bites in both | GREEN |
| G-8 · surfaces | every `trig8` cell: menu, select, popover and sheet by mouse and by touch, select-touch-item, sheet-touch-scrim, tapseat, fourier's AppDock; `g8` every leaf as MEASURE-7; a press on a dialog's scrim closes the dialog and the dock folds 6.6 s later (question 19's frames) | every `trig8` cell, select-touch and sheet-touch included (they failed in MEASURE-7: `cells6`'s trig now closes on the second tap); the scrim press closes the dialog, the dock folds 6.8 s later | g8-hold, g8-exempt and g8-trigger bite in both; touchcure in WebKit only | GREEN |
| G-9 · the progress | every clause on the root passes (rests 0 and 1, no absent row, no class change outside `data-morphing`); the w-scope follower lags 4 rows (it reads `[data-dock-scope]`, deleted) | the same | **g9-scope fails no clause of the judge in either** (M3) | GREEN on the root; **its plant fails no clause of the judge** |
| G-10 · reduced motion | 60 of 60 over 27 scenarios, the controls docks' folds included | 60 of 60 | g10-rm bites in both | GREEN |
| G-11 · cost (by trace, GPU lane, `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`) | **9 of 48 trigger frames over the bound**: four first-open frames at 1x that carry the fit read (w-pill 5 against 4, w-flow 6, w-ctl 6, w-seat 5) and five frames of 4 layouts against 3 (w-pill 1x and 4x, w-flow 1x, w-ctl 1x and 4x). **In the two frames after, 34 forced layouts in 21 of 24 runs, every one under `useGlassBackdropLuminance`'s stack** (the batched sample is not cured). Rest: 24 runs, no rAF call, mutation or running animation | rest clause: 4 cells, none | g11-rest bites the rest clause in both | **RED** (trigger clause and the frames after), Chromium; rest GREEN in both |
| G-12 · the bundle | (engine-free) `git archive` build of the tip: 15 pass, 0 fail (`logs/pm-g12-archive.txt`) | | g12-scale bites | GREEN |
| G-13 · census, focus, hit, forced colours, safe area | `g13` every leaf as MEASURE-7. **The seat line: 30 reads fail**, every one a tab seat of w-glyphs (38.59 against 40 at 1440, 38 against 44 at 390; S5's tab half not built). The labelled icon seat holds 40 and 44. The glyph line over a direct `svg`, `img` or `picture` passes; the composition line 39 of 39; the folded-face line 8 of 8 judged (24 read). A trigger in a run is the seat's height (40 and 44), its inline padding 8 px against the tabs' 12 | the same: 30 tab-seat reads, 39 of 39, 8 of 8; the safe-area cell is not readable in WebKit 2287 | iconword, facerule, g13-tabsvg and g13-trigseat bite in both; g13-safe in Chromium (unreadable in WebKit); **g13-box in neither** | **RED** on the seat line, both engines |
| G-14 · regressions | **63 new failures** in chromium-headless-new and **64** in coarse-touch (M2) | **8 new failures** (M2) | groups: 7 of 9 bite in chromium-headless-new, 8 in coarse-touch, 8 in WebKit (M3); g14-rmclock bites; **the run-mark unit passes under its plant** | **RED** in all three projects |
| G-15 · ink (level 1, current 10 %, hover 8 %; `logs/pm-ink-read.txt`) | light: words 0 fail; **marks under their floor 11** (nav's Reports 1.238 and 1.247 against 1.369 and 1.394; dials's Lin and 5Y; canvas-tools's Grid and Draw; action-row's Format); **hover against its ground 6** (nav's Home 1.178 against 1.263). Dark: **nav's current Reports 3.32 and 3.27**, chrome's File 3.85, dials's Range, Scale and 2024 4.18 to 4.42; marks 10; hover 2. **The loose `DockControl`'s current fill on the dark field 1.269 against v11.0.2's 1.316.** Hover against current at least 1.0 to 1.05 (question 18) | light: words 0; marks 10; hover 6. Dark: **nav's current Reports 4.08 and 4.01**; marks 10; hover 2; **loose current fill 1.243 against 1.274**. Six seats read as no fill painted (rail's Regions, canvas-tools's Grid and Draw) | g15-baked bites in both, narrowly; **g15-onestep in WebKit only** | **RED**: dark words, marks, hover, the loose control; and the source's dark level is not RU-67's (0.85 on this measure) |
| G-16 · the consumer fixture | (engine-free) **105,249 B gzip against v11.0.2's 102,631 (+2,618, 2.6 %)**; raw 313,544 against 307,467 | | the unused plant leaves the fixture at 105,249 (its entry +2,600); the used plant takes it to 107,823 (+2,574) | **RED** |
| names | (engine-free) 78 against 80 | | | GREEN |
| code lines | (engine-free) 5,246 against 4,741; `wc -l` 10,389 against 11,081 | | | **over: NOT READY** |
| `w-pwords` | the words seat flips at 363 px both ways with no bad step; at rest no write; the persistent words cross 6 px at 350 px natural, fit read again (`fit7`) | the same | g14-fitsibs bites in both | GREEN |
| O-386 · cross extent | the plate's block size equal folded and open: value.js's composition 56 and 56 at 1440 (one posture at 390), w-inflow 56 and 56 at 1440, 60 and 60 at 390 | the same | none ruled | GREEN |
| RU-61 | not built: S7's prototype does not join (question 14's default); its frames are in question 14's strip | | | reported not built |

Beside the gates, read in both engines and both schemes:
- *The card and rounded corner* (ORCH-LINES-7 line 4, `s8/corner8.mjs`, `logs/s8-corner-pm.<engine>.<scheme>.json`): w-card folded 50 % and open 24 px, the plate's corner from 28 to 24 px through the travel; w-rounded 50 % and 16 px, 28 to 16; w-pill a stadium every frame (27.91 to 28). No frame scaled, the plate and the root equal in every frame (worst 0 px), about 650 frames per cell in Chromium and 480 in WebKit, light and dark alike.
- *The controls preset at every width* (RU-79, `s8/fold8b.mjs`): 20 of 20 cells in each engine.
- *The level token* (`s8/level8.mjs`): 7 of 7 in Chromium, 5 of 5 in WebKit (1 light, 1 dark, 0 under reduced transparency, 0.3 under more contrast, 0 on a static backdrop, 1 with the dark blur on a `.glass-dock.dark` in a light document).
- *The run mark* (RU-66, `s8/mark8.mjs`): the first change of page glides 91.23 px over 28 frames between its ends in Chromium and 22 in WebKit (largest step 0.085 and 0.105 of the travel), the second 48 px over 54 and 21 (0.087 and 0.099); the mark ends on the seat and the seat paints no fill.
- *w-atlas-preset* (`m8/atlas8.mjs`, both schemes, fine and coarse): as H read it, to the pixel. In PlateDock's seat the folded dock covers 303.8 px² of the legend and of its link, the open dock none, and its two seats reach 31 px past the 375 px plate (to x 406); in the head row it covers 1,500 px² of the title's box folded and 2,400 open (the text 475 and 1,303 px² in Chromium, 487 and 1,334 in WebKit), the legend none. Nothing moves while it opens (151 to 163 frames read in Chromium, 118 to 119 in WebKit).
- *Units and types* (`logs/pm-units.log`, `logs/pm-typecheck.log`, on the tree): 93 files, 879 tests pass. Six fail, and none is a source fault: the two overfit lines that fail before the merge, and four that read what the archive tree leaves out or adds (`docs/` for drive-tokens and dissolve, a built `dist/` for the backdrop-prefix arm, and the measure's page copied into `demo/__anim` for two layout-canon kills). The run-mark test passes. `vue-tsc`: the src config is clean; the test config fails on the three lines that fail before the merge.

**Two readings the merge brought.**
- *A press on a persistent seat, then a leave, folds the dock at once.* G-1 (k) (hover w-seat, click its Home, leave) reads the fold 9 ms after the leave in Chromium and 4 ms in WebKit, where MEASURE-7 read 6,528 and 6,529 (the linger). G-6's press cell (press Home, drag 60 px off the dock, release) reads the dock folded 299 ms after the press in both engines, a 225.66 px box change, where MEASURE-7 read 0.01 px. Home sits in `#persistent` (`dock-wi8.vue:419-422`). The cause is master's rule, carried by the merge (RU-66): `useDockState.ts:647-656`, `if (afterSeat) collapse(); else scheduleCollapse();`, from `72f2d5ec5` (v11.1.0: "a hover-opened dock the pointer leaves after a seat press collapses at once"). G-1 (k) and G-6's press cell were written for the redesign's linger; master's rule and those clauses cannot both hold. Recorded and not cured: which one stands is the ruling seat's.
- *G-9's follower reads a deleted name.* The w-scope cell's follower (`dock-wi8.vue:505-512`, `:1087`) reads `--dock-expand-t` through `[data-dock-scope]`, which RU-78 deleted with its per-frame write (S2). It now lags the root by 4 rows (100 px) in both engines, where MEASURE-7 read 0. Every clause read on the root passes (rest 0 and 1, no absent row, every class change inside `data-morphing`). G-9 is read GREEN on the root. The follower clause reads a name RU-78 removed; whether it retires with the name is the ruling seat's. G-9's plant is in M3: it fails no clause of the judge.

**RU-67's rule on this measure** (`pm/rule67.py`, `logs/pm-rule67.txt`; `m8/plate8.mjs`, today's dock and levels 1 to 0.4, both schemes, both engines, the grid, the warm field and daraksha's ground):

| rung | dark show-through, Chromium / WebKit | plate against the warm field (largest), Chromium / WebKit | clause 1 (no more than light's 0.106 / 0.729) | clause 2 (under 1.70) |
|---|---|---|---|---|
| today (v11.0.2) | 0.130 / 0.781 | 1.419 / 1.222 | no | yes |
| 1 | 0.131 / 0.726 | 1.550 / 1.318 | no (Chromium) | yes |
| 0.85 | 0.124 / 0.674 | 1.639 / 1.484 | no (Chromium) | yes |
| 0.7 | 0.090 / 0.580 | 1.755 / 1.684 | yes | no (Chromium) |
| 0.55 | 0.036 / 0.477 | 1.881 / 1.910 | yes | no |
| 0.4 | 0.036 / 0.389 | 1.956 / 2.138 | yes | no |

No rung meets both clauses, so by RU-67 as amended the dark default is the firmest rung under 1.70 in both engines: **0.85**, and question 10 says so. H6 returned level 1 on `943fe6e9d` (dark show-through 0.103 in Chromium at level 1). The difference is in the docks read, not the plate: S3 folds the controls docks at 1440, so corner-controls is read folded where H6 read it open (1.056 there), and the pill's folded plate reads 0.242 where H6 read 0.143; the medians over ten docks move with them. The source writes level 1 in dark (S4), so the tip does not carry RU-67's level. G-15 was read at both: at the source's level 1 (the table above) and at 0.85, injected into the same build (`pm/dark085.css`, `logs/m8-ink-pm-dark085.<engine>.json`): nav's current Reports reads 3.75 in Chromium and 4.45 in WebKit at 0.85 (3.32 and 4.08 at 1), dials's labels pass at 0.85 in both, and nine marks per engine stay under their floors. The rung fails G-15, so by ORCH-LINES-7 line 3 question 21's default applies.

### M2. G-14 against master's re-taken snapshot

Eight specs in each tree (the six release specs 10.1.1 to 11.0.1, `release-11-0-2.spec.ts` and `ro-loop.spec.ts`), each tree's own copy, in the three projects, `--workers=1`, the tip in `.pm-tip` on 5431 and master's snapshot `aeb6f3ee7` in `.pm-master` on 5432 (`logs/pm-g14-{tip,master}-<engine>-<spec>.log`). Compared by `pm/g14cmp.py` (a test passes when any attempt passed; `logs/pm-g14cmp.txt`) and sorted by cause by `pm/g14why.py`. The run-mark test: master's passes 9 of 9 in its tree (`logs/pm-g14-master-runmark.log`), and the tip's passes in the unit run (`logs/pm-units.log`).

| project | tests, tip / master | new failures | failing on both | passing only on the tip |
|---|---|---|---|---|
| chromium-headless-new | 338 / 334 | **63** | 0 | 0 |
| coarse-touch | 338 / 334 | **64** | 0 | 2 |
| webkit (2287) | 338 / 334 | **8** | 0 | 0 |

The four tests not on master are RU-35's two outputs tests and k3's second cell in both forms. **G-14 is RED in all three projects.**

**The stadium's corner** (Chromium only: 56 tests in chromium-headless-new and 55 in coarse-touch, every one in `release-10-1-5.spec.ts` (52 and 51) or `release-11-0-1.spec.ts` (4); one of the 56 is k3's 306 cell, which master's spec lacks, so 110 of the 127 new failures). Each reads the pill's computed corner and gets `3.35544e+07px` (or 33554400 in a JSON of radii), where the spec reads one length of half the cross extent; the fit-law, ring and paint-past-the-arc failures in the same specs carry the same radii and fail on them. The cause is the merge (S1, `18f543021`), which took master's `6dc977fe2` (`--radius-dock` is the stadium again, `calc(infinity * 1px)`, `theme/radius.css:131`, `:192`) together with the branch's RU-13 rule and wrote it as `.glass-dock.shape-pill { border-radius: var(--radius-dock) }` (`run.css:763-765`; before the merge it was `9999px`, which the specs' length pattern accepts). Master paints the same corner from `--dock-cap-rest: min(var(--radius-dock), calc(var(--dock-cross) / 2))` (its `run.css:701`, `:827`), a finite length. The painted corner is the same on both: the corner cell reads w-pill a stadium in every frame (M1), and WebKit, which serializes the length differently, passes every one of these tests. Not cured: a measuring seat changes no source.

**The 11.0.2 spec** (8 in chromium-headless-new, 9 in coarse-touch, 7 in WebKit):
- *fill · the light scheme's seat fills are the plate rungs* (both Chromium projects' fine pointer and WebKit): the hover fill reads `oklab(0 0 0 / 0.08)`, RU-68's 8 % of the dock's ink, where the spec reads the plate rung. A ruled change the spec was not restated for.
- *fill · in dark a hovered, pressed or selected seat lifts the plate* (coarse-touch, static and live): the press lifts 0.0036 and 0.0048 against 0.006, RU-68's 2 % press.
- *fold · content stays inside the plate and fades by steps through the fold and unfold* (4 cells in each project): the seats' boxes lie outside the plate's box at opacities to 0.94 (`Volume 90.0 px outside at opacity 0.09` in the expand's frame 12, and so on through frame 27). The probes' G-2, which judges the content against the painted plate under its clip, passes 136 of 136 segments; the spec reads the seat's box against the plate's box. Not traced further.
- *fold · an idle fold lays out once per morph frame on a scrolling page* (both Chromium projects): 271 layouts against 50 (fine), the clause false (coarse). G-11's trigger and frames-after readings (M1) are the same fault seen by trace.
- *rail · a start-anchored rail's open holds the crest from its first frame* (all three; coarse-touch's close too): the foot never leaves the plate (−72 against 18.5); on coarse touch the open and the close are not morphs (0 frames against 6).
- *transition · a control slotted into a dock's run keeps its own transition* (all three): the slotted control's transition reads `background-color, color, scale, opacity, box-shadow`, where the spec reads `inline-size` or `width`.

**WebKit's eighth new failure** is `release-10-1-3.spec.ts:390`, D-1, a collapse mid-expand at 390 bottom-anchored: one frame whose summary glyph paints outside the plate. One run, not repeated.

**Restated:** none in this pass; the source seat restated no test of these specs after the merge.

### M3. Every plant, in every engine its gate claims

Each plant is applied to `.pm-tip` by `pm/plant.py`, its gate's cells read on the tree's dev server (5404) in Chromium and in WebKit 2287, then reverted; every revert leaves the 677 `src/` files equal to `HEAD`'s (`pm/clean.py`, in each log). A plant bites in an engine when a clause its gate reads passes on the tip and fails under the plant there. The probe plants are judged where they run (`pm/plantrun.sh`'s judge, summed by `pm/bitem.py`); the side-cell plants are read against the tip's reading on the same instrument by `pm/bitesides.py` (`logs/pm-bite.txt`); G-14's groups against the tip's own G-14 run by `pm/g14bitem.py` (`logs/pm-g14bite.txt`). Logs: `logs/pm-plant-<plant>.txt` (the load at the head of each), rows in `rows/pm-plant-<plant>/`.

| plant | gate | the fault planted | Chromium | WebKit 2287 |
|---|---|---|---|---|
| g1-linger | G-1 | the linger token ignored (3.6 s) | bites: the fold after a visit 3,605 ms against 6,522 | bites: 3,605 against 6,520 |
| g1-lift | G-1 (f) | the linger scheduled in the touch pointerup, before the tap's focus | bites: after a held finger and after a seat tap the dock never folds (6,015 and 6,012 on the tip). The unit witness passes under it | bites: after a seat tap it never folds (6,007) |
| g1-presshold, g1-frompress | G-1 (f), unit witness | the press hold removed; the linger timed from the press | bite: both forms of the unit fail ("a held finger holds", "not before one linger from the lift") | (the unit, engine-free) |
| g2-clock | G-2 | the loop's clock started at the trigger | bites: 2 of 2 segments (the first row moves 15.6 % against 1.4 %) | bites: 2 of 2 (16 % against 2.2 %) |
| g2-curve | G-2 inside the curve | the curve inset never written | bites: content 8.29 px outside the curve | bites: 8.29 px |
| g2-touch | G-2 under touch | no folded face under touch | bites: keyframes's transport folds under touch | bites |
| g2-rim | G-2 the rim | the rim drawn on the root | bites: the rim 76 px off the plate's edge | bites: 76 px |
| g2-held | G-2 from rest | a leaving face sized by its border box | bites: a unit moves 4 px in the window's first row | bites: 4 px |
| g2-lane | G-2 inside the plate | every lane corner rounded | **does not bite**: read6 passes all 4 cells | **does not bite** |
| g2-laneinset | G-2 (RU-25) | a lane 12 px inside the plate's edge | bites: 45 region-rows off their lane, to 12.02 px | bites: 37 rows |
| g2-nocut | G-2 (RU-25) | the neighbour cut removed | bites: 6 of 8 lines (clips off their lane to 256 px, regions overlapping) | bites: 6 of 8 |
| g2-fitwhole | G-2/G-13 (RU-26) | fitWhole restored | bites: 3 of 3 (a fitting run shows 5 of 6 seats; content 32 px outside the curve) | bites: 3 of 3 |
| g2-whole-never | G-2 (RU-27) | the whole-seat flag never set | bites: 2 of 2 (a partial seat at rest) | bites: 2 of 2 |
| g2-whole-length | G-2 (RU-27) | a length for the percentage | bites: every seat never shows after the host's cap lifts | bites |
| g2-room | G-2 (RU-36) | a room change on the spring | bites: 3 of 4 lines (every seat shows 6 rows after the change, bound 2) | bites: 3 of 4 (5 rows) |
| g2-facehalf | G-2, G-4 (RU-70) | the content window halved | bites: 6 of 6 segments (no face for 72 to 75 ms against 17) | bites: 6 of 6 |
| g3-retarget | G-3 (RU-42, RU-71) | a retarget held four rows | bites: 1 of 5 segments (a seat that meets its lane hidden in 34 unit-rows) | **does not bite**: 5 of 5 pass |
| g4-join | G-4 | the join records ignored | bites: the joining seat steps 1.00 in one frame | bites |
| g4-ghost | G-4 seat set (RU-81) | a removed seat keeps painting, cut at the landing | bites: 2 of 9 lines (fine and coarse: a step of 1.00, a cut in 1 row) | bites: 2 of 9 |
| g4-snap2 | G-4 | the open seat's rest 9 px off its snap | bites: seat4 and read6 on both cells | bites |
| g4-scroll | G-4 | the offset left to the run's reach | bites: a run that does not fit rests 326 px wide in 374 | bites |
| g4-openseat | G-4 (RU-28) | the three-pitch open seat restored | bites: a change of open seat moves a box 96 px in a row | bites |
| g4-groupframe | step 7 | a group child a snap area again | bites: every rest of the capped run off a seat's snap | bites |
| g6-flow | G-6 | a name put in flow on hover (24 px) | bites: 2 hover cells, 24 px | bites: 24 px |
| g6-overflow | G-6 (RU-52) | a fitting run a scroll port again | **does not bite**: the hover cells pass; its one failure is the press cell, red on the tip too | bites: the keyboard cell, 4 px |
| g7-provide | G-7 | the outlet's provide removed | bites: 8 leaves (the context is not this dock) | bites: 8 leaves |
| g8-hold | G-8 | the hold count consulted on a press outside | bites: after a press outside a menu and after a hover leave the dock stays open | bites |
| g8-exempt | G-8 (RU-72) | a press on an open surface's trigger folds the dock | bites: 6 cells (menu, select, popover; mouse and touch) | bites: 6 cells |
| g8-trigger | G-8 (RU-62, RU-72) | the scrim's stamp removed, the quiet focus return cancelling the linger | bites: 3 cells (sheet by mouse, by touch, its scrim) | bites: 3 cells |
| touchcure | G-8 (RU-72, S6) | S6's two touch cures removed | **does not bite** (Chromium's touch cells pass without them, as before S6) | bites: select-touch, sheet-touch, sheet-touch-scrim |
| g9-scope | G-9 | the root's progress write removed | **does not bite under the judge**: every clause g9b reads passes as on the tip; the rows show the fault (the progress steps 0 to 1 with no row between, against 59 rows between on the tip), and no clause reads it | **does not bite under the judge** (0 rows between against 44) |
| g10-rm | G-10 | reduced motion's seat removed | bites: 8 of 16 lines (each fade 28 values over 210 ms) | bites: 8 of 16 |
| g11-rest | G-11 rest | a loop left running at rest | bites: 8 of 8 rest cells loud (506 to 536 rAF calls); the tip's 24 quiet | bites: 4 of 4 (392); the tip's 4 quiet |
| g12-scale | G-12 | a scale on `.glass-dock` | bites: "no scale on .glass-dock" fails (engine-free) | |
| g13-box | G-13 | the hidden face keeps its box at rest | **does not bite**: `g13` reads every leaf as on the tip | **does not bite** |
| g13-safe | G-13 safe area | a viewport dock ignores the bottom inset | bites: 5 leaves (with a 34 px inset the dock sits 16 px off the viewport's bottom, not 50) | not readable (no safe-area override in WebKit 2287) |
| g13-tabsvg | G-13 glyph line (RU-65, RU-87) | the tab glyph rule cut back to a direct `svg` | bites: 40 reads the tip lacks (an `img` laid out 49.4 px against 24.6, a seat 314 px) | bites: 30 reads |
| iconword | G-13 seat line (RU-75) | the labelled icon seat's height removed | bites: 10 reads (Focus 35.91 against 40) | bites: 10 reads |
| facerule | G-13 folded-face line (RU-76) | the folded face's glyph rule removed | bites: 8 of 8 faces (24 px against 36 and 39.59) | bites: 8 of 8 |
| g13-trigseat | step 7 | the trigger's seat height removed | bites: the trigger 35.91 against 40, 32 against 44 | bites |
| g14-fitmemory | RU-54's memory | the fit's memory removed | **does not bite** on fit7's cells (H9's cost reading is what keeps the memory) | **does not bite** |
| g14-fitsibs | `w-pwords` (RU-54, C6-M8) | the root's other regions dropped from the key | bites: 2 crossings read `fits` where the lifted read says no (364 and 362 px) | bites: the same 2 |
| g14-rmclock | G-14, unit witness | reduced motion's clocks 300 ms | bites: "settles an active morph immediately when reduced motion becomes preferred" fails | (the unit, engine-free) |
| g15-baked | G-15 (RU-56) | the `:root` plates restored inside the dock | bites, narrowly: action-row's pressed Format reads 4.39 against 4.5 (4.5 or more on the tip), dials's 5Y on the field 1.346 against its floor 1.372 (`logs/pm-inkbite.txt`). At the 10 % step the baked plates are no stronger than the dock's own fills, so most marks read no worse | bites, narrowly: dials's Lin on the field 1.413 against 1.44 |
| g15-onestep | G-15 (RU-68) | current set equal to hover (10 % to 8 %) | **does not bite**: every mark it fails already fails on the tip at 10 % | bites: dials's 5Y and Lin on the field (1.188 against 1.211, 1.391 against 1.44) |
| dark | level token (C7-3) | the dark blur arm back to `.dark .glass-dock` | bites: the `.glass-dock.dark` cell in a light document takes light's blur | bites: the same cell |
| fold | RU-79 | the phone rule restored | bites: 8 of 20 cells (the eight controls docks rest open at 1440) | bites: the same 8 |
| mark | RU-66 run mark | the mark's move removed | bites by `mark8`: the first change of page appears at its destination with no frame between, and so does the second. **The run-mark unit test passes under it** (9 of 9) | bites: the first change appears at its destination; the second jumps 48 px in one frame |

RU-67's own plant (the dark arm removed) has nothing to plant: the source writes no dark arm (S4).

**G-14's nine restated groups** (`pm/g14plantrun.sh`, each group's sites at the tip's line numbers, Chromium's two projects in one run and WebKit 2287 under `--exclusive webkit`):

| group | the fault planted | chromium-headless-new | coarse-touch | webkit |
|---|---|---|---|---|
| corner | the pill's rest corner a fixed 16 px | bites: 3 of 14 tests fail that pass on the tip (11 more fail on the tip too) | bites: 3 of 14 tests fail that pass on the tip (11 more fail on the tip too) | bites: 14 of 14 tests fail that pass on the tip |
| clock | the plate jumps to the new layout on the trigger frame | bites: 8 of 14 tests fail that pass on the tip | bites: 8 of 14 tests fail that pass on the tip | bites: 8 of 14 tests fail that pass on the tip |
| lane | no region clipped to its lane during a travel | bites: 6 of 6 tests fail that pass on the tip | bites: 6 of 6 tests fail that pass on the tip | bites: 6 of 6 tests fail that pass on the tip |
| reserve | the root held at its size when the travel began | bites: 16 of 16 tests fail that pass on the tip | bites: 16 of 16 tests fail that pass on the tip | bites: 16 of 16 tests fail that pass on the tip |
| touch | every dock rests open under `(hover: none)` | **does not bite**: 0 of 5 tests fail that pass on the tip | bites: 5 of 5 tests fail that pass on the tip | **does not bite**: 0 of 5 tests fail that pass on the tip |
| press | the run takes no pointer events while morphing | bites: 2 of 2 tests fail that pass on the tip | bites: 2 of 2 tests fail that pass on the tip | bites: 2 of 2 tests fail that pass on the tip |
| cap | a cut-cap keyframe restored on the plate | bites: 1 of 7 tests fail that pass on the tip (6 more fail on the tip too) | bites: 1 of 7 tests fail that pass on the tip (6 more fail on the tip too) | bites: 1 of 7 tests fail that pass on the tip |
| fits | `data-run-fits` never written | **does not bite**: 0 of 8 tests fail that pass on the tip (7 more fail on the tip too) | **does not bite**: 0 of 8 tests fail that pass on the tip (6 more fail on the tip too) | bites: 5 of 8 tests fail that pass on the tip |
| zoom | the carrier's reads not divided by the ancestor zoom | bites: 3 of 3 tests fail that pass on the tip | bites: 3 of 3 tests fail that pass on the tip | bites: 3 of 3 tests fail that pass on the tip |

touch's fault sits under `(hover: none)`, which only coarse-touch matches, as in part H. fits's sites fail on the tip in Chromium's two projects (the stadium's corner, M2), so its plant has nothing to turn red there. corner bites in Chromium on the three `--radius-dock` tests the tip passes; its other 11 sites fail on the tip too.

### M4. The budget

**Names** (SURFACE.md's method, `m7/names.mjs` on the tip; `logs/pm-names.txt`): **78** against v11.1.0's 80, +15 −17, net 2 down. Under the bound, so GREEN. The 15 kept additions are `DockOutlet` with `to`, `region` and its default slot, `ControlsDock` with `label`, `corner`, `within` and its four slots, `GlassDock`'s `run` prop, `#rim` slot and exposed `controlCount()`. The 17 removals are `DockBackgroundToggle` and its four names, `useDockSearch` and `#search`, the four dock-context functions, `DockLayerGroup`'s `orientation`, `switcherPosition` and `motion`, `DockControl`'s `as` and `asChild`, and `DockSeparator`'s `anchor`. RU-86's table, each kept addition at its site line, as `pm/appgrep.mjs` (H12's reader) prints it at each consumer's ref: `logs/pm-appgrep.txt`. At each consumer's ref today (daraksha `24a6dbdc4`, fourier `266bd6728`, atlas-rc `88bde3b35`, lt-integ `3421be357`, glass `575084358`), 17 of the table's 52 cited lines carry their name on the cited line and 35 have moved. The consumers moved on since H12's refs; for each moved line the reader prints the nearest lines in the same file that carry the name. Three cited files no longer carry their name at all: `label` in daraksha's `NamePage.vue`, and `#collapsed` and `#persistent` in fourier's `EditorControlsDock.vue`. Every kept addition still has a site in the table. `controlCount` is cited at glass's own `ControlsDock.vue:53` and `:59`, now at its lines 33 to 58.

**Dock code lines** (ORCH-LINES-7 item 2, `s8/codelines.mjs`: every `.ts`, `.vue` and `.css` under `src/components/dock`; `logs/pm-lines.txt`):

| tree | `wc -l` | code | comment | blank | files |
|---|---|---|---|---|---|
| v11.1.0 | 11,081 | 4,741 | 5,665 | 675 | 44 |
| the tip `575084358` | 10,389 | **5,246** | 4,514 | 629 | 43 |

5,246 is 505 over 4,741, so the budget is **over its bound: NOT READY**. `useDockBody.ts` alone is 1,094 code lines (1,428 by `wc -l`), a file v11.1.0 does not have. Outside the directory: `participation.ts` 161 lines against v11.0.2's 156, the tooltip 201 against 201.

Where the 505 comes from, by file against v11.1.0 (code lines): `useDockBody.ts` +1,094, `useDockState.ts` +115, `useDockRun.ts` +60, `ControlsDock.vue` +57, `density.css` +48, `GlassDock.vue` +48, `DockOutlet.vue` +36, `DockCrossfade.vue` +25, `dock.css` +22, `dockRegistry.ts` +18, `DockTrigger.vue` +12, six more files +1 to +8; against `dockMorphMeasure.ts` −441, `useDockSearch.ts` −144, `useDockMorph.ts` −92, `DockLayerGroup.vue` −72, `layers.css` −68, `run.css` −65, `DockBackgroundToggle.vue` −34, and fourteen files −1 to −27.

**The code that could go** (nothing removed; counted by `pm/rangecode.py`, the same rule, on the tip's tree). Each block is what the source holds for one ruled behaviour; removing it removes that behaviour, which ORCH-LINES-7 item 2 forbids a seat to do, except the first two rows, which change nothing a page sees.

*`useDockBody.ts` (1,094):*

| block | lines | code | what it does | what reads it |
|---|---|---|---|---|
| the hold build's pose and trace marks (`POSE`, `__dockPose`, the `dock:*` marks, the observer-miss naming) | 24-26, 701, 711, 726, 729, 828, 893, 1265-1273, 1296-1306, 1425 | 27 | test-only; the published bundle already drops it | G-11's trace (`dock:reread`), the pose tests; would move to a test module, not go |
| RU-35's outputs (`--dock-expanded-px`, `--dock-collapsed-px`, `--dock-plate-cross-px`) | 668-687, 772, 889 | 16 | names master shipped, read by no rule of glass | kept through 11.2.0 by RU-35; named in files of six consumer repos at their `HEAD` (`git grep`), so 12.0.0's |
| the removed control held where it painted (R-3, C-5) | 1358-1417, 376-380 | 54 | a control the host removes fades out in place | G-4's seat-set clause, g4-ghost |
| the run's scroll offset as a quantity of the loop (R-5, RU-17, RU-40) | 210-216, 776-790, 816-826, 845-860, 1133-1142, 1238-1241 | 51 | the open seat glides into a scrolling run; the offset survives a fold | G-4's seat clause, g4-scroll and g4-snap2 |
| the curve inset (R-1, C2-6) | 605-666 | 45 | a tall pill's run padded in from its round ends | G-2's curve clause, g2-curve |
| the return mid-exchange (R-3) | 298-332 | 30 | a face returned to reverses where it is | G-3, g3-retarget |
| the in-flow dock's margin (followers track the painted edge) | 967-975, 1210-1220, 1250-1253 | 21 | content below an in-flow dock moves with it | G-6, g6-flow |
| RU-54's fit memory and its key | 509-519, 545-547, 570-572, 731-737 | 21 | the fit decided once per room | H9: it saves layouts, so RU-80 keeps it; g14-fitmemory |
| the observer guard (RU-38) | 1275-1291, 1293-1295 | 16 | no layout read for a resize already synced | G-11's trigger clause |
| the edge-anchored dock (O-110) | 232-235, 417-425, 738-745 | 14 | a dock pinned by `right` or `bottom` keeps that edge | G-14's 10.1.3 specs |
| the window resize seat (R-1) | 1309-1325 | 14 | a resize lands with no travel | G-2 |
| the host's change of room (RU-36) | 689-691, 712-718, 865-869 | 9 | a room change followed at layout | g2-room |
| the closed narrow lane (RU-31) | 1090-1102 | 8 | a lane narrower than its corner is closed | g2-laneinset |
| zoom (10.1.3) | 157-164, 695 | 7 | boxes read under an ancestor's `zoom` | G-14's zoom group |
| right-to-left | 228-231, 357-358, 414-415, 749, 1123-1124 | 6 | lanes and entering side flipped | G-14's 10.1.x specs |
| `--dock-morph-t` (R-10) | 1074-1076, 1227-1230 | 5 | master's posture progress | kept through 11.2.0 |

These rows hold 344 of the file's 1,094 code lines. The two rows that change nothing a page sees hold 43 (the first moved, the second kept until 12.0.0 by ruling), so no list of code that can go without a behaviour reaches 505.

*The other files' growth against v11.1.0:*

| file | code, v11.1.0 → tip | what the growth holds |
|---|---|---|
| `useDockState.ts` | 472 → 587 (+115) | the page-wide pointer tracker that tells a scroll's synthetic move from a real one (lines 102-118, 565-573: 18), the dwell-lengthened linger (470-475, 480-491: 16), the move that opens a collapsed dock and the return mid-fold (574-603: 25), the touch lift's linger (734-758: 21), the dismissal held under the pointer (479: 1), and the rest in `scheduleCollapse`, `onFocusIn` and the touch path |
| `useDockRun.ts` | 257 → 317 (+60) | the control count, the resting scroll the carrier reads (`restingScroll`, 15), the roving row inside a layer group (`faceRows`, `syncRow`: 21) |
| `ControlsDock.vue` | 0 → 57 | the controls preset (RU-79) |
| `density.css` | 120 → 168 (+48) | the seat heights and the tab and trigger rungs |
| `GlassDock.vue` | 271 → 319 (+48) | the carrier's wiring, `#rim`, `controlCount` |
| `DockOutlet.vue`, `dockRegistry.ts` | 0 → 36, 0 → 18 | the outlet that carries teleported docks |
| `DockCrossfade.vue` | 157 → 182 (+25) | the exchange through the carrier |
| `dock.css` | 111 → 133 (+22) | the level line, the fills, the RU-56 block |

**G-16** (ORCH-LINES-7 item 1: the consumer fixture against v11.0.2's; `pm/g16fix.sh`, `logs/pm-g16-*.json`): the fixture (the page that imports the dock parts value.js uses and the menus they hold, built by the measure's tree) is **105,249 B gzip against v11.0.2's 102,631, 2,618 B (2.6 %) over: RED**. Raw it is 313,544 against 307,467. Its entry chunk is 24,619 B against 17,827, the closure 37,550 against 38,758 (19 files against 27), the union 53,350 against 54,405. The two plants: 8 KiB of unused code in a dock module leaves the fixture at 105,249 (it is shaken out; the entry chunk grows 2,600 B), and the same code used takes it to 107,823 (+2,574). S1 read 105,259 at the merge.

### M5. The strips and the owner's page

The strips are under `fold/`, one per engine (`.chromium.png`, `.webkit.png`) unless named otherwise. `pm/stripsm.py` builds them from `pm/ownerm.mjs`'s frames (`logs/pm-owner/`, one browser per run, a context per question) and from the plate ladder's frames (`logs/pm-q10-shots/`). Every frame is checked against the scheme and posture its label names before it is used; none was refused. Each strip's title and labels are in a visitor's words.

| question | strip | what it shows |
|---|---|---|
| 10, a firmer dock | `strip-q10-grid-8m`, `strip-q10-field-8m`, `strip-q10-daraksha-8m` | today's dock and the five firmnesses, dark then light, a page dock open and a round dock folded and open, on the dark grid page, the warm figure page and daraksha's ground, each frame with how far it stands off the page and how much of the grid shows through; the default marked (the second step in dark, the first in light) |
| 12, delete what no site uses | `strip-q12-names-8m.png` (one) | the names a site can use, 78 on this build against 11.1.0's 80, the 15 added and the 17 deleted |
| 14, a dock in a row | `strip-q14-8m` | atlas's figure dock on this build (the legend moves 36 px, none covered), and the overlay that is not built (the legend moves 27 px and 1,872 px² of it is covered, its link included; beside a legend in a plain row nothing moves and 2,938 px² is covered) |
| 18, hover against current | `strip-q18-8m` | the pointer on Home while Reports is the current page, at 5, 6.5 and 8 % and the previous build's 10 %, in light and dark, with each hover's contrast against the current highlight and against the dock |
| 19, a dialog from the dock | `strip-q19-8m` | the dialog closed by a press on its dimmed page with the dock still open, the dock folding 6.6 s later (6.8 in WebKit), and a press outside a menu closing both |
| 20, the controls dock on a desktop | `strip-q20-8m` | four controls folded at rest at 1440, open under the pointer, folded again 3.8 s after the pointer leaves, folded on a phone, and one control as that control |
| 21, the selected tab in dark | `strip-q21-8m` | the selected Reports on the warm figure page and the dark grid page, and dials's 5Y, on this build and today's, with each word's contrast on its highlight |

Two of the owner frames were taken twice. Question 19's first frames labelled the dialog open during its exit fade, so the dialog and menu are now read by their state, not their visibility. Question 20's controls dock sits at the window's corner, outside the stage the crop was held to, so the crop was freed, and the folded frame is now taken after the fold lands. The page scroll check finds no overflow at 390 px.

`OWNER-READ.md` (main checkout, not staged) gains the section "Added 2026-11-22, after the eighth build was measured": what stands in the way of 11.2.0 in a visitor's words, and questions 10, 12, 14, 18, 19, 20 and 21, each with its strip, this build's reading and its default.

### M6. The pack

`npm pack` of the measure's tree of the tip, built once (`logs/pm-pack.log`):

- `/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.cache/glass-ui-11.2.0-dock8.tgz`
- 1,116,401 B, 896 files
- sha256 `90b7dfb4575cf2cefd23edf00bf9ad8e9d2254ca2e93ba13e404b0834683cc6b`

npm names it `mkbabb-glass-ui-11.1.0.tgz`, since the tip's `package.json` still says 11.1.0; it was renamed to the path asked for. The tarball is what the value.js line in M7 offers.

### M7. The step-10 messages, with the final numbers

RULINGS-7's folded drafts ("The step-10 messages, folded") written again from this measure. Listed, not sent. The numbers they carry:
- *The dark level.* RU-67's rule on this measure returns **0.85** for dark (M1: no rung meets both clauses, so the firmest rung under 1.70), and level 1 stays light's. The folded drafts' "in dark the plate is firmer" holds again, and the messages give it: in dark the plate takes about 30 % of the card's cover where level 1 takes 18 % (`glass/veil.css`'s mix at the dark base rung 0.18), it stands off a warm page up to 1.64 to 1 in Chromium and 1.48 in WebKit (today 1.42 and 1.22), and the dark grid shows through it a little less (0.124 against today's 0.130 in Chromium, 0.674 against 0.781 in WebKit). The tip writes level 1 in dark (S4); the drafts describe the default the rule returns, which the build seat writes as RU-67's dark arm. If the owner picks another rung from question 10's strip, the plate lines change with it.
- *The fills.* The current seat's fill is 10 % of the dock's text colour and the hover 8 %, one pair in both schemes; the press 2 % over the seat's own fill (S4, RU-68).
- *The fixture* (value.js): 105,249 B gzip against v11.0.2's 102,631, 2,618 B (2.6 %) more (M4). G-16 is RED, so the line says the figure should come down and the final one follows.
- *w-atlas-preset* as M1 read it: in PlateDock's seat the folded dock covers 303.8 px² of the legend and its link, the open dock reaches 31 px past the 375 px plate; in the head row it covers 1,500 px² of the title's box folded and 2,400 open; nothing moves.
- *Daraksha's ground* (`logs/m8-plate-pm-q10dar.<engine>.json`, `-q10today-more`): in dark the plate at 0.85 stands 1.03 to 1.04 to 1 off it (today 1.01 to 1.03); in light level 1 stands 1.31 (today 1.21).

Five statements of the folded drafts do not hold on the tip and are written as the tip reads:
- Tab seats keep their height (about 38.6 px on desktop, 38 on touch). S5 found RU-75's tab half cannot be built as ruled (`density.css`'s `--dock-tab-h` sets every dock's tab height, and no ruling names it), so gaggle's, gregg's, keyframes's and atlas's tab lines say so. G-13's seat line stays RED on them.
- speedtest's "new tab default" does not exist.
- daraksha's neck needs no line of its own for the level, since the README's recipe sets no level. Inside a dark dock the plate is at 0.85 and a `glass-plate` outside it at 1, so the neck reads a step clearer than the two plates it joins unless it takes the dark level too. The line says so and asks.
- The hover-off-the-persistent-seat fold (M1): a hover-opened dock folds at once when the pointer leaves after a press on a `#persistent` seat, as 11.1.0 shipped. No draft promised otherwise, so no line changes; if the ruling seat takes G-1 (k) over master's rule, fourier's and atlas's overlay lines gain one.
- The figure for value.js is the measured one, not a promise of no growth.

Lint: `rg -P -i -f docs/tranches/BL/driver/register-lint.pattern` over this section's draft: no hit.

#### atlas

Hi,

I'm writing ahead of glass-ui 11.2.0 so nothing in it surprises you in the docks atlas mounts. Here's what changes, and the one placement I'd like your view on.

- **The plate.** A dock still rests as a fully rounded capsule. Your docks are static, so each plate stays an opaque card in both themes, and the firmer dark plate the other sites get doesn't reach them.
- **Button fills.** A hovered button and the current one are now light steps of the dock's own text colour: 8 % for hover and 10 % for the current button, and a press shrinks the button with 2 % more of that colour over its own fill. If you set `--dock-control-hover-bg` or `--dock-control-active-bg` on a dock, could you check it still lands? Inside a dock those defaults now sit on `.glass-dock`, so an override set higher up the page won't reach it.
- **Icons.** An icon you haven't sized fills nine tenths of its button, and so does a folded face's icon when it's the face's own child. Anything you sized with a class keeps your size, which means PlateDock's folded sliders icon stays small beside the Table icon until its size class comes off.
- **Button heights and ink.** Icon buttons and the triggers beside them are the control's height, 40 px on desktop and 44 on touch, and a trigger's label and chevron are drawn at full strength instead of dimmed. Tab buttons keep the height they have today, about 38.6 px on desktop and 38 on touch.
- **The controls preset** folds at every width once it holds two or more controls, about 3.8 s after the pointer leaves; with one control it's just that control. We tried PlateDock on it inside one of your figure plates, 375 px wide, in both themes and with mouse and touch. Where PlateDock sits today, the folded button covers about 300 px² of the legend, its link included, and when it opens its two buttons reach 31 px past the plate's right edge. In the head row instead, it covers part of the title: 1,500 px² of the title's box folded and 2,400 px² open. Nothing beside it moves in either place. The preset always sits at a corner, fixed to the window or absolute in its parent, so a PlateDock on it would leave the head row it stands in today. Which placement would you want before we suggest the move? That would also cover the figure docks sci-report shows.
- **Overlays.** Menus, popovers, dialogs and sheets opened from a dock button hold the dock open with nothing to wire. A press on a dialog's or a sheet's dimmed backdrop closes it, and the dock then stays open for its usual pause.
- **In-flow docks.** The overlay that would let an in-flow dock open without pushing its row covers part of a figure's legend, its link included, while the dock lingers, so it's waiting on a decision. Until then an in-flow dock still pushes its row (36 px in your figure header) and `anchor` still does nothing, so please keep your own layout hold. I'll tell you before the release if that changes.
- **Progress rims.** The dock's new `#rim` slot takes a progress rim and follows the plate's outline in every frame, so the `DockProgressRim` in the rail's and the phone bar's `#persistent` could move into it.
- **Unchanged for you.** `run="plain"` stays as you use it. The `:hover-intent` that PlateDock passes isn't a dock prop and does nothing; the pause before a hover opens the dock is the `--dock-intent` token. The scroll fold moved to 11.3.0, so your own scroll rule stays for now.

Thanks,
Mike

#### fourier

Hi,

Here's a short list of what 11.2.0 lets fourier delete, and what to keep.

- The scroll fold moved to 11.3.0, so please keep folding the app dock on scroll in your own code for this release.
- `--dock-trigger-min-height: var(--dock-control-size)` in `AppDock.vue` can go, since a trigger in a dock's row now takes the button height by itself (40 px on desktop, 44 on touch).
- The `keepOpen()` and `release()` calls around your menus can go too. A menu, popover, dialog or sheet opened from a dock button holds the dock on its own, and a press on a dialog's dimmed backdrop closes the dialog while the dock stays open for its pause.
- `StageDock.vue` can give way to the controls preset, as its header says it will. One `ControlsDock` with `corner="top-end"` and `within="parent"`, passing `expand-on="press"` through, replaces its two `GlassDock`s; the folded icon stays in `#collapsed` and Edit contour in `#persistent-end`. Its `fold` prop goes, since the preset is the one control when it holds one and folds at every width once it holds two or more. The counted hold (a `keepOpen()` for each open menu) and the collapse after an outside press within 600 ms (lines 45 to 76) go as well, because the dock now holds for an open menu and folds on an outside press by itself. The phone column stays yours, as an `orientation` you pass. The preset takes no `collapse` prop.
- `EditorControlsDock` can move to the preset as well, with the point count and Save in `#persistent`.
- The `ScrollProgressRim` you teleport into the app dock can sit in the dock's new `#rim` slot and follow the plate's outline in every frame.
- Of the eighteen reds booked for this release, the 4 to 8 px row overflow is the one 11.2.0's fit rule is measured to cure. On a phone, a tap on the dock no longer pins it open: it folds 6 s after the tap, and 6 s after a tap on one of its buttons.
- In dark the plate is a step firmer than in light, so it hides a little more of the page behind it than today's does. Light takes one more step of ink. Button fills are steps of the dock's own text colour (8 % on hover, 10 % for the current button), and an unsized icon fills nine tenths of its button.

Thanks,
Mike

#### Home Assistant

Hi,

Three changes in 11.2.0 touch the Home Assistant tabs directly, and one has moved to a later release.

- **The worded tab's icon.** A tab button now sizes the `svg` that's its direct child at one and a half times the word, and your tab icons are svgs (`tabIcon` in `frontend/src/tiles/tabs.ts`), so there's nothing to mark. Your kit's icon base in `tiles/css/marks.css` is unlayered and still wins over the library's layered rule, as your note in `tiles/css/tabs.css` says of the icon buttons, so a worded tab's icon stays at the kit's size unless `.shell-dock .dock-tab-button > .glyph` takes `1.5em` beside that line. The floor icons in the floor menu sit in menu rows, which the dock doesn't size.
- **The trigger beside icon buttons** now matches their height, 40 px on desktop and 44 on touch, so the short wide trigger is gone. Its inline padding stays at 8 px; set `--dock-trigger-padding-inline` if you'd like it to match the tabs' 12 px. Your own tab height still wins for the tabs.
- **The active fill.** The current button's fill is now 10 % of the dock's own text colour, so your `--dock-control-active-bg` override can be deleted.
- **One base size set in px** moved to 12.0.0, so please keep your own scaling until then.

In dark the plate is a step firmer than in light, so it hides a little more of the page behind it than today. In light it takes one more step of ink and stays glass.

Thanks,
Mike

#### speedtest

Hi,

Not much changes for speedtest in 11.2.0, but two things are worth a look in both themes.

- You set `--dock-fg-on-aurora` on `.glass-dock`, and the hovered, current and pressed fills inside a dock now follow that colour (8 %, 10 % and 2 % of it).
- Your plate keeps `--material-bg-dock` in both themes. `design/register.css` sets the plate's veil itself, so the firmer dark plate the other sites get doesn't reach it.

`--dock-scale` keeps working; one base size set in px moved to 12.0.0. `DockBackgroundToggle` is deleted in 11.2.0, which you'd already dropped (only comments still name it). Your `--dock-trigger-padding-*` values still win over the new trigger default.

Thanks,
Mike

#### gregg

Hi,

A few deletions open up in gregg with 11.2.0, plus one thing that didn't make it.

- **The gliding mark stays.** The mark under PageDock's and HeroPlate's current control keeps gliding between buttons as 11.1.0 shipped it, now painted in the dock's new current fill.
- **The fills.** You set `--dock-fg-on-aurora` on `.glass-dock`, so hovered, current and pressed fills now follow your ink. The current fill is 10 % of the ink in both themes, against the 24 % your `style.css` sets; whether to keep your override is your call.
- **PageDock's row.** A `role="group"` child of the dock's row is now a frame whose buttons are the snap targets, so your `scroll-snap-align` rules can go. The `--dock-open-seat: max-content` line no longer does anything, since 11.2.0 has no widened current tab.
- **Tab heights.** The tab buttons in PageDock and HeroPlate keep their height, about 38.6 px on desktop and 38 on touch.
- **The plate.** Your docks are static, so their plates stay an opaque card in both themes, and your pair docks' wash tier is untouched.
- **The progress rim** already rides the plate's border, so nothing there changes; the dock's new `#rim` slot is there if you ever want the rim inside the dock.
- **Not built.** Trailing persistent buttons that give way on a narrow screen: persistent buttons never yield, and the row takes the room that's left. `dockFold.ts`'s pin stays as it is.

Thanks,
Mike

#### value.js

Hi,

Three notes for value.js: colour, the plate, and bytes.

- Inside a dock, the hovered, current and pressed fills now follow your `--dock-fg-on-aurora` (8 %, 10 % and 2 % of it). A `DockControl` outside any dock keeps today's fills, including 11.0.2's dark-mode lift. `type="submit"` on `DockControl` stays.
- **The plate in dark.** Your docks take the firmer dark plate, so the band your colour session measures off `.dock-plate` will read differently in dark; light takes one more step of ink. We're also checking that `--glass-veil-dock` still reaches the plate in 11.2.0, and if it doesn't, I'll tell you which token does before the release.
- **First-load size.** We built a small page that imports the dock parts you use and the menus they hold, on 11.0.2 and on 11.2.0. On the current build it's 105,249 bytes compressed against 102,631 on 11.0.2, 2,618 bytes (2.6 %) more. Our aim is no growth, so that should come down before the release, and I'll send you the final figure with it. If you'd rather run your own budget, I can send you a tarball of 11.2.0 first. There's no separate chunk for the morph.

Thanks,
Mike

#### daraksha (through value.js)

Hi,

Could you pass these along to daraksha?

- Tab buttons now size a direct `img` or `picture` at one and a half times the word, as they already did an `svg`, so daraksha's own size rules for tab pictures can go. Icon buttons already size pictures at nine tenths of the button. An icon inside a wrapper, such as Motion's Again inside `.kf-turn`, is reached only as the tab's direct child.
- The two `--glass-veil-dock: var(--glass-veil-base)` lines, in `SiteDock.vue` and `ControlsSeat.vue`, now equal the default and can go.
- In dark the dock's plate is a step firmer than in light. The neck between the site dock and the theme dock is a `glass-plate` outside both docks, so in dark it would keep the clearer level and read a little thinner than the two plates it joins. The README's recipe for a plate that matches the dock (`--glass-veil-tier: var(--glass-veil-dock)`) gives it the dock's veil; I'll send the line that gives it the dark level too before the release. The same lines suit `Star.vue` and `Clasp.vue`.
- The controls seat can become the controls preset. It folds at every width once it holds two or more controls, `dockHold.ts` can go, and `DockOutlet` carries the teleported docks.
- `dockTip.ts` should stay for now, since page names on a press and hold come with the tooltip work after this release.
- We put a copy of daraksha's ornamented ground into our test page and read the dock on it in both themes. In dark the firmer plate still stands only about 1.04 to 1 off that ground (today's about 1.02), so it stays close to the ground there; in light it stands about 1.31 to 1 (today's 1.21). If that doesn't match what you see, a frame of the dock on the real page would help.

Thanks,
Mike

#### slides

Hi,

There's one visual change for slides in 11.2.0. In dark the dock's plate is a step firmer than in light and hides a little more of the slide behind it, and that includes the deck dock on a dark slide in a light deck, since it carries `.dark` itself and now takes the dark blur too. The firmer level also mixes the tier `decks/parkway-lab/theme.css` sets on the dock toward the card colour. Light takes one more step of ink. Button fills are now steps of the dock's own text colour (8 % on hover, 10 % for the current button), unsized icons fill nine tenths of their button, and menus or dialogs opened from a dock button hold the dock with nothing to wire. Would you mind opening a deck in dark mode once 11.2.0 is out? A quick look would settle it.

Thanks,
Mike

#### keyframes

Hi,

Four things for keyframes in 11.2.0.

- `graspHeld` stays exposed through 11.2.0 and is removed in 12.0.0, so the dock-context test can keep reading it for now.
- The transport's Play button still slides when the dock opens, because the in-flow overlay is waiting on a decision. If it lands, setting `anchor="start"` keeps Play within 4 px of the pointer, and I'll say so before the release.
- The `keepOpen()` and `release()` calls around your menus can go. The code pane's RibbonBar stays a `GlassDock` with `:collapse="false"`, since the controls preset always folds once it holds two or more controls and that row shouldn't.
- In dark the ChromeDock, TransportDock and RibbonBar plates are a step firmer than in light and hide a little more of the aurora behind them; light takes one more step of ink. The Apply CSS tab keeps its height.

Thanks,
Mike

#### gaggle

Hi,

Three small changes reach gaggle's docks in 11.2.0. An unsized icon beside a word in a tab is now one and a half times the word: 21 px at a 14 px word, where lucide's default made it 24. If the tabs should stay at 24, a size class on those icons keeps them there. The view tabs keep their height. In dark the site dock's and KitDock's plates are a step firmer than in light; the report dock is static and keeps its opaque card. The `keepOpen()` and `release()` calls around your menus can go, since a menu opened from a dock button now holds the dock on its own. The dock's search slot is gone, which changes nothing for you since your search lives in its own slot.

Thanks,
Mike

### What was not read

- Real Safari. Every WebKit reading here is Playwright's WebKit 2287.
- WebKit's safe-area cell: WebKit 2287 has no safe-area override, and g13-safe has nothing to read there.
- G-11's trigger clause in WebKit. Cost is read by Chromium's trace (RU-85). WebKit reads the rest clause only.
- WebKit's D-1 failure (`release-10-1-3.spec.ts:390`), run once and not repeated.
- The 11.0.2 spec's fold-box failure, traced no further than the spec's own reading.
- RU-61's shift gate and its cover: question 14's default allows no join (S7).
- bl/demo's half of S5: another worktree.
- The tip's run-mark test in its own tree outside the unit run: it was read in `logs/pm-units.log`, and master's in `logs/pm-g14-master-runmark.log`.

**The commits** on `bl/dock/wi8`, one per item, pushed at `fa89416d6`: M1 `cdf1c71a7`, M2 `69c4af763`, M3 `cbb055356`, M4 `15b76128b`, M5 `79abf746a`, M6 `d301d306a`, M7 `fa89416d6`. The frames under `logs/pm-owner/` and `logs/pm-q10-shots/` stay in the worktree uncommitted, since the repo ignores `*.png`; `logs/pm-strip-frames.txt` names them. The strips and this file are in the main checkout, not staged. `demo/main.ts` stays uncommitted, as a build wrapper.
