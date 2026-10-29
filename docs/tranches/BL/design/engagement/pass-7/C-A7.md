# D5 · pass 7 · C-A7: critic of the candidate A+E (HEAD + P-E7.patch), completed

| field | value |
|---|---|
| seat | C-A7, completed by a critic-completion seat (C-A7b). Neither the first seat nor this one authored a D5 seat in passes 2-7 or was a critic in passes 3-6 |
| model | `claude-opus-5-5`, asserted from own system identity |
| verdict | **ADVANCE, not converged, not clean. 21 of 27 rows closed (78 %).** Open: CK-01, 17, 19 (held by D2/D3) and **CK-20, 22, 25 (D5 can build)**. CK-25 carries a **new counterexample**: the CK-20 clip cuts the touch loupe. So this is not the fixed point |
| candidate | HEAD `9450ef7e5` (docs-only past P-E7's base: `git diff --stat 2db234357 HEAD -- src tests` empty) + `pass-7/P-E7.patch`. sha1s checked: `P-E7.patch` `a6c82db1…`, `P-A7.patch` `e6e42ba3…`, `F5ppp.patch` `24cec509…`, `P-A6.patch` `2464bf18…`, `P-E6-noveil-coarse.patch` `8f952538…`. `git apply --check` clean; 179 tracked + 19 new files |
| rulings | INBOUND re-read at start (mtime 2026-10-28 20:13). The new row is O-111, the floater text floor: W-0.1, not D5's. The last D5 row is still O-103d. FORMATION-PROGRESS read to "C-E7 banked … resuming with the C-A7 completion seat". Nothing arrived mid-pass |
| engines | Chromium 149 headless shell and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright`, no GPU arguments. **Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox)** on every row; Safari cells are read against this seat's guarded WebKit run |
| harness | H7's harness (`harness/`, unedited), the harness's own scene app `9e68012e9522`, build `c7` from worktree `.claude/worktrees/bl/D5/p7/C-A7b/wt` |
| WebKit | **One** `guarded --exclusive webkit --timeout 90` acquisition. Queued 00:14:32, admitted 01:28:04 (a 73.5-min wait, under 90). Released 02:10:06, guarded exit 0. 30 stages plus 4 E-4 re-reads, none skipped (`C-A7/logs/all-webkit.log`). No page closed outside the harness's NAV_CAP relaunch |
| load | Chromium phase 22:33-00:14 at loads 13-50 (other seats); WebKit at 6-16; Chromium re-reads at 9-21. Every stage log opens and closes with the 1/5/15-min load |
| records | `C-A7/`: runners (`run.sh`, `stages.sh`, `builds.sh`, `plants.py`, `chain-chromium.sh`, `chain-webkit.sh`, `all-webkit.sh`, `rereads.sh`, `units.sh`, `master.sh`, `ck22-greps.sh`), probe `probe/c7-probe.mjs`, `logs/`, `json/`, `glance/` (CAP sheets, frames, `loupe/`, `probe/`, `c7-chromium-coarse-switch-press-pairs.png`), `plants/` (plant frames). The first seat's partial records are in `logs/first-seat/` and `json/first-seat/` |

**The first seat's partial state (kept as a note).** C-A7 first ran at HEAD `71a668bbf`. It ran only Chromium E-1 (93/1/2) and confirmed every sha1, CK-23 and the plant anchors. It never took the WebKit lock, stopped by hand inside E-7, and scored nothing. Its static findings (CK-22 stale rows; M-20's census population) are re-checked in §3 and kept. Its probe had never run. This seat ran it, and fixed one defect first (§6 item 1).

## 0 · In brief, A's part first

1. **CK-12 closes.** Each crest is a register row with a design reason. `--scale-commit-pop: calc(2 - var(--scale-press))` = 1.04 is the press mirrored. `--rung-crest: var(--scale-engage)` = 1.06 covers a command and the 20 px bit (`scale-paper.css:46`, `engage.css:234,243`). The bit clause leans on the 0.8 px legible floor, which is the library's own statement in `control-bit.css:289-290`. It predates D5: last touched in `155aa2f11`, 2026-08-08. Reading the crest:
   - **`crest` plant:** fails in both engines (button committed ×1.0196-1.0208, 8/8 FAIL). The unit cell is red on the plant and green on the candidate.
   - **The crest's two inputs, planted `nonsense`:** a planted input either leaves the pop intact or kills it with one `console.error` naming `--rung-crest`. That holds on switch, checkbox, chip and button in both engines, 8/8 per engine. No input degrades silently (CK-21).
2. **CK-25, A's items, read in both engines.**
   - **The committed Button** reads ×1.0597-1.0603 in all 8 cells, above its pressed ×1.032.
   - **The dark coarse Switch press** reads |ΔL| 0.0873 (Chromium) and 0.0862 (WebKit), against the pass-6 light references 0.0782 and 0.0773.
   - **Plants:** `crest` and `thumb` fail (thumb dark 0.0774 and 0.0763).
   - **In the frames:** the dark thumb and track both lift on press, faint but visible (`glance/c7-chromium-coarse-switch-press-pairs.png`).
3. **CK-27 closes, with a gate class recorded.** The preset chip answers hover and press in paint in both engines.
   - **Hover:** mean |Δluma| 3.78-5.23 levels, about 50 % of its pixels moving ≥ 4 levels. That is 30-45× the library Button's hover (0.11-0.42 levels).
   - **Press:** 46.5-50.7 % of pixels ≥ 16 levels.
   - **`chipmute`** fails H7's cell in both engines.
   - **The gate class:** with my `chipfaint` plant (hover ink 0.001; the chip's hover reads 0.00-0.12 levels), **H7's `capsule preset chip answers` still PASSES in both engines.** Its hover clause counts a changed computed `background-image` as an answer, so a hover no eye sees passes. The candidate's chip is not that case, so the row closes on my pixel read. The gate's blind spot goes to H8 (§5 item 1).
4. **The reduce legs.**
   - **P-1, one mechanism:** `prmY` fails 28 cells per engine; E-9 is 85/0 per engine.
   - **The PRM plant:** H7's reaches all 14 stateful faces, tabs included, in both engines. C-A6's older plant still cannot reach tabs (`ca6` 6/1 per engine); H7 supersedes it.
   - **The ambient reduce leg (CK-01/CK-19) is not built.** WebKit reads 0.00 levels under reduce, and 1.72 against 1.25 at rest otherwise. It is gated on D3's lane (P-A7 gap 1).
5. **CK-22 stays open, on E's side.** E's earlier MIGRATION rows still describe deleted bytes:
   - P-E2 §4 row 1: "This covers the hand … It escapes ancestor clipping, stacking and `overflow`."
   - Row 2: "**`veil` arm:** the world frosts."
   - Row 4: "on the stage's one veil (a `<body>` child popover)."
   - E-M7's `"every"` clause and E-M8's `true` arm.

   No pass-6 or pass-7 E report retires them (P-E7 §7 gap 6). M-24's promise is also false on the paths C-E7 found. A's side is complete: M-12..M-22, `usePressMark` public, one cursor writer, P-A5 row 4 and P-A4 M-9 retired. The writer plant is red; the consumer greps were re-run at this HEAD.
6. **New, CK-25: the CK-20 clip cuts the touch loupe.** A touch hold promotes the slider, and the loupe rises 80.6 px above it. The clip now cuts that loupe at its scroller's edge:
   - 93 % of the loupe is cut when the control sits 4 px below the scroller's top edge;
   - 40 % even mid-box in the 120 px `clipstale` scroller;
   - this holds in both engines, with the same geometry.

   The pass-6 construction (`clip6`) paints the whole lens over the card edge (`plants/probe/c7-chromium-cliploupe-edge.png` against `glance/probe/c7-chromium-cliploupe-edge.png`). The loupe is the one part of a promoted slider meant to leave its place, and in a card's top row it is now a sliver. CK-20's cure has cost CK-25.

## 1 · Gates and builds

| what | result | log |
|---|---|---|
| candidate harness build `c7` | exit 0 · 55 directories · scene app `9e68012e9522` | `logs/build-c7.log` |
| 8 plant builds (`chipmute prmY crest thumb clip6 loupe6 fling6 chipfaint`) | exit 0 each; after every revert the tree hash read back as the candidate's (`f4ac7add8398`) | `logs/builds.log`, `logs/build-plant-*.log` |
| unit plants (vitest `--maxWorkers=2`, single files, `--light`) | control: 2 files, 29 passed + 1 expected fail. `writer` plant: `Aurora.cursor-writer` FAIL 1/2. `crest` plant: `engage-ladder` "the crest carries a reason" FAIL | `logs/unit-*.log`, `logs/units.log` |
| CK-23 (`git apply --numstat` outside the repo) | **198 files +5180/−1598; src 153 +3243/−1318**, P-E7's figure to the line | — |
| the deletion | `STAGE_VEIL`, `POINTER_STAGE`, `flingStage`, `stageVeil`, `setVeil`, `"every"` in the worktree's `src`: 0 hits each | — |

I did not re-run typecheck, the full vitest or `demo:dist:build`. P-A7 and P-E7 both ran them green, and C-E7 did not re-run them either; this is stated, not scored.

## 2 · Battery of record, both engines

Chromium ran stage by stage, one `guarded` call each (`logs/chain-chromium.log`). WebKit ran in the one acquisition (`logs/all-webkit.log`). Loads are the 1-minute load at stage start.

| witness | Chromium P/F/U · load | WebKit P/F/U · load | every fail, whose |
|---|---|---|---|
| E-1 | 93/1/2 · 35.3 | 93/3/0 · 15.9 | `dock` latch 54/55 (D2). Ambient: Chromium UNMEASURED (SwiftShader `css` substrate); WebKit 1.72 vs 1.25 at rest (D3's amplitude) and PRM 0.00 (the reduce leg, gated on D3's lane) |
| E-2 `--commit-arms i,ii` | **164/0/0** · 34.4 | **164/0/0** · 13.4 | — |
| E-3 | **22/0/0** · 35.7 | **22/0/0** · 11.9 | — |
| E-4 | 16/2/0 · 35.6 | 15/0/4 · 12.9 | Chromium: the slider, one read of five at 0.00 px; the sortable, 0.00 fling and still (load 38.9). **Re-reads 2/2 each PASS** at 9-21: NOT-REPRODUCED. WebKit's 4 UNMEASURED: the Carousel engine fact (O-103d (4)) |
| E-4 `sheet` (repeat 8) | 3/1 · 32.6 | **4/0** · 5.7 | Chromium's fling cell failed with the drive at 0 px/s on 6 of 8 runs. **Re-reads 2/2 PASS** at 12-15: 16/16 runs at 931-1100 px/s land −35 px. WebKit: 8/8 at 1194-1333 px/s land −35 px |
| E-4 `tabsdrag` ×2 (C-E7's unread WebKit cell) | **4/0, 4/0** · 30.7, 25.7 | **4/0, 4/0** · 9.8, 8.3 | — (fling − still 35.97-41.38 px; E-4's own tabs cells pass too) |
| E-5 | **56/0/0** · 35.2 | **56/0/0** · 9.2 | — |
| E-6 | 4/2/8 | 2/2/8 | `s6 present`: S6 RETIRED (O-103d (2)) |
| E-7 | 6/1/0 | 6/1/0 | `data-held`: `GlassDock.vue` (D2's named clause) beside the engage door |
| E-8 | **19/0/0** | **19/0/0** | — |
| E-9 | **85/0/0** · 34.2 | **85/0/0** · 10.3 | — |
| E-9 `--prm-plant` | 40/32; `PLANT reach` 14 stateful faces, tabs included | 40/32, the same 14 | H7's plant, red as it must be |
| E-10 | **45/0/0** · 35.0 | **45/0/0** · 9.9 | — (hand-off drop 0.0071/0.0068 against 0.0083 + 0.002 in Chromium) |
| E-11 | 7/0/1 | 7/0/1 | UNMEASURED: `--scale-commit-pop=1` is not read on the Switch path (the bit takes `--scale-engage`) |
| E-12 | **102/0/0** · 35.5 | **101/0/1** · 8.7 | WebKit `rest layouts`: the engine fact |
| CAP | 18/0 | 18/0 | sheets `glance/c7-{chromium,webkit}-{fine,coarse}.png` |
| `a7-glance` on CAP frames (against C-E6's pass-6 frames) | 6/0 | 6/0 | `logs/glance-c7.txt` |
| `e7-probe` (carry ×10, loupe ×4, cliptouch) | **6/0** | **6/0** | — |
| `ca6-probe` | 6/1 | 6/1 | its PRM plant reads 0.0000 on tabs: C-A6's plant, superseded by H7's (above). Idle: engaged 124.3/s (Chromium, 0.0 layouts and recalcs/s), 98.3/s (WebKit), on- and off-screen; 0 at rest and after Escape |
| `c7-probe` (mine; §4) | **9/0** + 10 reports | **9/0** + 10 reports | — |

### Plants, each read in both engines

| plant | row | witness | Chromium | WebKit |
|---|---|---|---|---|
| `crest` (pass-6 1.02/1.05) | CK-12, CK-25 | `a7-glance` button committed | **FAIL 4/4** ×1.0196-1.0208 | **FAIL 4/4** ×1.0199-1.0207 |
| `crest` | CK-12 | unit cell | **FAIL** | — |
| `thumb` | CK-25 | `a7-glance` coarse dark press | **FAIL** 0.0774 < 0.0782 | **FAIL** 0.0763 < 0.0773 |
| `prmY` (the one reduce mechanism removed) | P-1, CK-02, CK-10 | E-9 | **28 FAIL** | **28 FAIL** |
| `chipmute` | CK-27, CK-25 | E-12 `preset chip answers` | **FAIL** light and dark | **FAIL** light and dark |
| `chipfaint` (mine: hover ink 0.001) | CK-27 | E-12 `preset chip answers` · `c7-probe chipfine` | **PASS** (the gate class, §5 item 1) · hover 0.00 levels | **PASS** · hover 0.10-0.12 levels |
| `writer` | CK-22 | unit `Aurora.cursor-writer` | **FAIL** 1/2 | — |
| `clip6` | CK-20 | E-10 clip-vanish · `e7-probe cliptouch` · `c7-probe clipwheel` | **FAIL** · **FAIL** · **FAIL** 728…3976 px² | **FAIL** · **FAIL** · **FAIL** 365…3589 px² |
| `loupe6` | CK-25 | `e7-probe loupe` | **FAIL 4/4** (seam 26.4-45.2, line 46.7-52.0) | **FAIL 4/4** |
| `fling6` | CK-05 | `e7-probe carry` | **FAIL** (min 3.79 px at 431 px/s; median 5.06) | PASS the 4 px bound (7.30-7.57 px at 1231-1404 px/s). The halving is read by ratio: candidate 12.75-13.64 px at 1127-1356 px/s, ratio about 0.55 |

## 3 · Per row, A's part first

### CK-12 · CLOSED

- **Source.** `--scale-commit-pop: calc(2 - var(--scale-press))` (`tokens/scale-paper.css:46`) is the crest of a face whose committed state shows the commit. The engaged rung `--scale-engage` (1.06, `:33`) is the crest of a stateless command and of the 20 px bit (`utilities/engage.css:243`). `--scale-commit-pop-bit` is gone, and no crest literal remains.
- **The bit clause.** `control-bit.css:289-290` reads "4% of a 20px painted face is 0.8px, so a bit is below the scale channel's legible floor". That is a design statement of the register, and it predates D5. The witness adopted it from there. I read the clause as admissible, as C-E7 did. The owner may still say otherwise (§P6-6 optional item).
- **Measured, both engines.** Pops on E-2 164/0; the Button's committed still ×1.06; the crest plant red in paint and in the unit cell; both crest inputs loud when planted (`c7-probe crestinput`, 8/8 per engine).

### CK-25 · OPEN

**A's items: built and reproduced.**
- **The committed Button** reads in a still: ×1.0597-1.0603 in 8/8 cells across engines, pointers and themes, against pressed ×1.032 and rest ×1.000. In the sheet the committed Probe is visibly the larger (`glance/c7-chromium-fine.png`, row 1).
- **The coarse dark Switch press** shows: 0.0873 and 0.0862 against 0.0782 and 0.0773 (`logs/glance-c7.txt`). In `glance/c7-chromium-coarse-switch-press-pairs.png` (top: dark rest | pressed; bottom: light), the dark thumb lifts from umber to a lighter taupe and the track lightens with it: faint, but readable.
- **The accordion's pop** spans its full row at ×1.040, a larger answer than pass 6. It reads as a commit, not a jolt (`…fine.png`, the disclosed rows).

**What keeps the row open (frames read by me).**
1. **New: the touch loupe is cut by the promoted control's clip.** `c7-probe cliploupe`, both engines:
   - control 4 px below the scroller's top edge: loupe 96.6…177.1 px, edge at 171.7 px, **93 % of the loupe outside the clip**;
   - mid-box: 40 %.

   The frames compare the candidate (`glance/probe/c7-chromium-cliploupe-{edge,mid}.png`) with the pass-6 construction (`plants/probe/c7-chromium-cliploupe-{edge,mid}.png`). The candidate's edge frame shows only a sliver of the lens under the card line, and its mid frame shows the lens sliced flat. The plant shows the whole lens over the card. iOS's loupe is never cut by the card it sits in. M-24 promises the control "stays inside the scroller or card it sits in, as it does at rest", but at rest there is no loupe to keep. This is a cost of CK-20's cure that P-E7 did not read (its loupe cells are mid-page).
2. **The loupe at k max** passes E's cells 4/4 per engine (band ×1.600, seam ≤ 0.1, line 0.0, runs on 0.11-0.13), and the plant fails 4/4. In the frame (`glance/loupe/c7-chromium-coarse-light-loupe-sustained.png`) the magnified fill still ends in its own round pill cap at the window's centre, and the housing has no lens edge. It reads as a pill seen through a pill, not yet a lens. Same as C-E7.
3. **The promoted control over a feathered or rounded card** (C-E7's counterexamples): not re-driven by me. They stand under the §P6-4 rule.
4. **The ambient exemplar is static** across all six columns (D3's amplitude).

The dark Button's warm halo is HEAD's (the 10.2.0 token wave), not D5's.

### CK-27 · CLOSED

- **The chip answers.** `c7-probe chipfine`, both engines and themes:
  - hover: mean |Δluma| 3.78-5.23 levels, 50.8-51.5 % of pixels ≥ 4 levels, 0.6-47.0 % ≥ 8;
  - press over hover: 9.70-12.65 levels, 46.5-48.3 % ≥ 16;
  - the library Button's hover, read beside it: 0.11-0.42 levels.

  The chip is `engage-chosen` with the door's mark (`data-press true`), and `chipmute` turns H7's cell red. No elegant reduction remains.
- **Every A7 and E7 plant is red in both engines.** The exceptions are read by comparison: `fling6` in WebKit, and C-E7's `clipOnly`/`pvOnly`.
- **H7's PRM plant reaches the tabs face** (14 faces per engine).
- **Not counted against the row, recorded as a class:** `chipfaint` passes H7's chip cell in both engines (§5 item 1). My own pixel read is what closes the chip item.

### CK-22 · OPEN

- **E's stale rows (the first seat's static finding, re-checked).**
  - `pass-2/P-E2.md` §4 row 1 says a promoted control "escapes ancestor clipping, stacking and `overflow`". M-24 now says the opposite. The row also says "This covers the hand, Tab, and an acting key", but a fine pointer no longer promotes.
  - Row 2: "**`veil` arm:** the world frosts."
  - Row 4: "`data-engaged` is written … on the control and on the stage's one veil (a `<body>` child popover)."
  - `pass-4/P-E4.md` E-M7: `On "every": E-M1 as written, for every pointer`.
  - `pass-5/P-E5.md` E-M8's `On true` arm.

  P-E5 carries them as "stand under the composition". P-E6 and P-E7 do not name them (grep of both reports). P-E7 §7 gap 6 says so. §P6-2 item 7 counted A's stale rows as a counterexample, and the same applies here.
- **M-24 claims more than the bytes hold** (C-E7's (b)): the feathered, rounded and scaled cases.
- **A's side holds.** The greps were re-run at this HEAD (`logs/ck22-greps.txt`; sibling HEADs printed). Material classes in `:class` bindings: 0. `:active` on a material class in consumer source: 0 (sci-report's 1 is build output, as P-A7 noted). `.glass-card`/`.glass-specular-track`: the one live site, speedtest `CompleteBadge.vue:16`, is `role="img"`, not pressable. `usePressMark` is public, and the writer plant is red.
- **Note, not a counterexample: M-20's census lists the wrong population.** It counts `setCursor` callers: keyframes.js `HeroAurora.vue:223`, value.js `useAtmosphere.ts:315`. value.js calls `useAurora` directly, with a window `pointermove` listener, so it has no `<Aurora>` root leg at all. The `<Aurora>` mounts are atlas (`Atmosphere.vue:137`, through its wrapper's `GlassAurora`), speedtest (`App.vue:48`) and keyframes.js (`HeroAurora.vue:25`). Each is `pointer-events: none` (atlas `.atmosphere`/`.atmosphere__field`; speedtest `pointer-events-none`; keyframes.js `pointer-events-none`), so the root leg never fires in any consumer. "Nothing changes for them" holds, but for this reason, not the one M-20 gives. The row should say so.

### The reduce legs

- **P-1 (§P6-7 item 5): built.** `engage.css` states no reduce arm for the pop (`:48`). The one mechanism is `a11y-overrides.css`'s `transition-duration: 0s` under reduce. Removing it (`prmY`) fails 28 cells per engine, and the candidate is 85/0.
- **CK-01/CK-19's ambient reduce leg: not built** (WebKit 0.00 levels under reduce). One uniform drives the swirl and the lean (P-A7 gap 1), so it waits on D3's lane. The row stays open, held by D3.

### The other rows

| CK | Chromium | WebKit | reading |
|---|---|---|---|
| 01 | latch 54/55; ambient UNMEASURED (engine limit) | latch 54/55; ambient 1.72 vs 1.25, PRM 0.00 | **OPEN** ◇ D2 (`dock` latch), ◇ D3 (amplitude; the lean's own lane before A's reduce write). Closes on D2's adoption or a dock scene with D2's leave, and on D3's lane and amplitude |
| 02 | E-2 164/0; E-9 21 commit-instant; `prmY` 28 FAIL | same | **CLOSED** |
| 03 | E-2's mount and arrival cells | same | **CLOSED** |
| 04 | E-3 22/0 | 22/0 | **CLOSED** |
| 05 | E-4 fails NOT-REPRODUCED 2/2 (sortable, slider, Sheet). `e7-probe carry` min 6.19 · median 10.60 · max 11.29 px at 428-893 px/s. Sheet 16/16 runs land −35 at 931-1100 px/s; the record run's split is ordered by velocity (0 px/s → −285, 472-531 → −160). Tabs 3/3 | E-4 15/0/4 (Carousel the engine fact). Carry 12.75-13.64 px at 1127-1356 px/s. Sheet 8/8 at −35. **Tabs 3/3** (C-E7's unread cell: fling − still 10.23-41.38 px) | **CLOSED.** Every slider read whose release the rule measured above 0 carries ≥ 6.19 px in both engines. No equal-velocity split. The halving's cause reproduces: `fling6` 0.55 of the candidate at matched velocity in WebKit; FAIL at 3.79 px in Chromium |
| 06 | E-5 56/0 | 56/0 | **CLOSED** |
| 07 | S6 RETIRED (O-103d (2)) | same | **CLOSED** |
| 08 | E-7: only `GlassDock.vue`'s `data-held` (D2's named clause) | same | **CLOSED** |
| 09 | E-8 19/0 | 19/0 | **CLOSED** |
| 10 | E-9 85/0 | 85/0 | **CLOSED** |
| 11 | E-12 102/0 | 101/0/1 | **CLOSED** |
| 13 | E-12 forced-colours and slop cells | same; PRT the engine's limit | **CLOSED** |
| 14 | E-3, E-12 coarse cells | same | **CLOSED** |
| 15 | E-10 singleton through every hand-off | same | **CLOSED** |
| 16 | E-12 rest 0 layouts/s; idle 124/s engaged, 0 layouts | engine fact; 98/s | **CLOSED** by its letter (§P6-7 item 11's cost stated) |
| 17 | — | — | **OPEN** ◇ D2: the dock's `:active` presses name no `touchstart` listener |
| 18 | `RELEASE_RULE` read by the four owners; Sheet landings ordered by velocity | same | **CLOSED** |
| 19 | ambient UNMEASURED | 1.72 vs 1.25 | **OPEN** ◇ D3 (amplitude; the reduce leg's lane) |
| 20 | E-10 45/0 (clip-vanish 0 px² every step); cliptouch 0; my `clipwheel` (14 real 3 px wheel events) **0 px² every step**; `clip6` red on all three | same; `clipwheel` 0; `clip6` red | **OPEN.** Every path this seat drove holds, and every plant is red. C-E7's four counterexamples (feather, radius, scale, the Chromium film) stand: a counterexample one critic reproduced stands (§P6-4). My wheel cell is not a film, so it does not read C-E7's one-frame Chromium lag either way |
| 21 | E-11 7/0/1; crest inputs loud | same | **CLOSED** |
| 23 | 198 +5180/−1598 | — | **CLOSED** |
| 24 | E-1 `static` cells | same | **CLOSED** |
| 26 | no lighting layer; the loupe's change is a mask and a deletion; no veil element; no blur token touched | same | **CLOSED** |

Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.

## 4 · Score

| | rows |
|---|---|
| **closed (21)** | CK-02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 18, 21, 23, 24, 26, 27 |
| **open, D5 can build (3)** | **CK-20** (C-E7's four paths); **CK-22** (E's stale rows; M-24's claim); **CK-25** (the loupe cut by the clip, new; the loupe's knob cap; the promoted control over a feathered or rounded card) |
| **open, held elsewhere (3)** | CK-01 (D2 latch; D3 lane before A's reduce write), CK-17 (D2), CK-19 (D3) |

**21/27 = 78 %. Not a clean pass; the clean-pass count stays 0.** It differs from C-E7 (20/27) only on CK-05, which my both-engine replay closes; C-E7 held it open on one WebKit tabs cell it could not re-read. Not the fixed point: CK-20, 22 and 25 hold counterexamples that building can remove.

**What would close the buildable rows** (for the agglomeration, not a spec):
- **CK-25 with CK-20.** The clip should bound the control's body, not the loupe. The loupe is the one part meant to leave the place, as iOS's does. Then the body clip takes the world's paint rules (radius, mask, transform: C-E7 §5) and the loupe paints whole above the card.
- **CK-22.** Retire P-E2 rows 1, 2 and 4, E-M7's `"every"` clause and E-M8's `true` arm by name. State M-24 as the bytes hold. Rewrite M-20's census on the `<Aurora>` mounts.

## 5 · Next-pass defect classes (recorded; no row added; the score does not change)

1. **A hover clause that reads a property, not paint.** H7's `capsule preset chip answers` passes with the chip's hover ink at 0.001 (0.00-0.12 levels) in both engines, because a changed computed `background-image` counts as an answer. `chipmute` fails it only because the press goes too. → H8: the hover clause reads pixels (`c7-probe chipfine`'s shape, e.g. ≥ 25 % of pixels ≥ 4 levels or the Button's hover as the floor), with `chipfaint` as its plant.
2. **A cure measured where its cost cannot show.** The CK-20 clip was proven on the control body. Its cost to the loupe shows only near a scroller's edge, and every loupe cell runs mid-page. → E's part, and H8: a loupe cell in `clipstale` at the top edge (`c7-probe cliploupe`'s shape, gated on the lens painted whole).
3. **A census that lists the wrong population** (M-20: `setCursor` callers, not `<Aurora>` mounts). → A's part; MIGRATION rows name the surface they migrate.
4. **A probe cell that passes undriven.** This seat's first smoke run read the Button's crest cells "intact" at ×1.0000, because `__e.commit()` does not drive a stateless control. It was fixed before the battery (§6). → any probe: a control cell that did not move is UNMEASURED, never PASS.
5. **Load-only E-4 fails.** Chromium's sortable 0.00/0.00, slider 0.00 and Sheet 0 px/s at loads 33-39 all re-read PASS 2/2 at 9-21. E-4's sortable and slider cells still print no velocity, so the drive's failure reads as the rule's. → H8 (as C-E7 §6 item 6 and P-E7 §3).

## 6 · Process

- **Slips, mine.**
  1. The first seat's `c7-probe crestinput` drove a stateless control with `__e.commit()`, which the scene app wires around the component. The Button read ×1.0000 unplanted, and its planted cells read "intact" as PASS. My smoke run (`logs/smoke-c7probe-chromium.log`) showed it. I fixed it before the battery: a stateless control is now driven by `element.click()`, as E-2 drives it, and an unplanted control that does not pop is UNMEASURED. The battery's runs read ×1.0600 (Chromium) and ×1.0599 (WebKit).
  2. The Chromium chain's Sheet stage failed at load 33. Its re-reads ran after the WebKit acquisition, through `rereads.sh`, which I wrote as a separate file so no script was edited while a chain read it. One re-read waited about 40 min in `guarded` for a heavy slot.
- **Machine law.**
  - Every build, test and browser run went through `~/.claude/guard/guarded`, never `--light` for a browser. `--light` was used only for the single-file vitest runs and the `a7-glance` image reads.
  - WebKit ran only under `--exclusive webkit`, in one acquisition (73.5-min queue, 42 min held, exit 0). One heavy run at a time, serially. vitest ran at `--maxWorkers=2`.
  - One browser per run with a context per cell (the harness's Engine). No GPU arguments. The kernel zone never gated a run.
- **Fences.**
  - No edit to tracked source in the checkout. No git write in the checkout beyond `git worktree add` and `git worktree remove`. All plant applies and builds ran in `.claude/worktrees/bl/D5/p7/C-A7b/wt`, with `node_modules` symlinked (there is no `tests-visual/node_modules` in the checkout to link).
  - Checkout writes are only `pass-7/C-A7.md` and `pass-7/C-A7/` (the first seat's runner path re-pointed to `C-A7b/wt`; new runners; logs; frames). Siblings were read by grep and `sed` only. Nothing under `~/.claude` was read beyond executing `guarded`.
- **Cleanup.** The worktree was removed with `git worktree remove --force`, and `.claude/worktrees/bl/D5/p7/C-A7b/` was deleted. No process is left running.
