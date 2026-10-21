# D2-B′ prototype, pass 6: the measured scene on floor v5

| field | value |
|---|---|
| seat | D2 pass 6, D2-B′ PROTOTYPE (the measured scene, one integrator) · model `claude-opus-5-5`, asserted from own system identity · 2026-10-20, one entry |
| base | HEAD `75df1f166` (floor v5 committed) + `pass-6/floor-v5.patch` (sha256 `cba6bdc2…`). At the close HEAD is `76b08cc7f`; `git diff --name-only 75df1f166 76b08cc7f -- src demo tests docs/design package.json` is empty, so every reading describes today's HEAD + floor v5 + this patch |
| patch | `pass-6/D2-Bp-proto.patch`, sha256 **`460452f3f91a319552c239c9023b28a89396e4579b76e0175e921bb9d66931c6`**, 61 files, +2,443 / −2,406 (`git apply --numstat` on HEAD + floor v5). `git apply --check` clean on an archive of HEAD + floor v5; applied, the tree equals the measured worktree over `src demo tests docs/design` (`diff -rq`: empty). Made by `scripts/mkpatch.sh` |
| owner rulings | **O-103** (`audit/INBOUND.md`, 2026-10-19, the owner's delegate per O-102b) rules D2's **Q-4 (c)**, **Q-12 (b)**, **Q-18 (a)**, Q-15 (a), Q-16 confirm, Q-17 (a). The task text says none had arrived; INBOUND has it, and H6 and FLOOR-V5 read it the same way. So the battery's witnesses keep their OWNER-BLOCKED verdicts and `cells.mjs --ruled` reads the ruled branch; both digests are given (§3). **O-104** (2026-10-20, value.js SS-8, 19 glass asks) arrived during this seat; none is a D2 ruling and none is on the 38 rows. Not placed here |
| harness | H6 as committed (`harness/HARNESS.md` §11), unchanged. Adapter `pass-3/adapter-floor-v2.mjs`; adapter law L-1..L-5 hold (`PR-bp/PR.log`) |
| engines | Chromium (Playwright's default headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**; O-103 records the checkbox as not granted |
| records | `pass-6/D2-Bp-proto-records/`: `battery/` (every stage log with its load, re-runs, `json/bp-{chromium,webkit}/`, `slots.log`, `chain.log`), `digest/` (`cells`, `rows`, `table`, `counts`, default `-p6bp` and ruled `-p6bp-ruled-ruled`), `F7-bp/`, `PR-bp/`, `filmstrips/`, `facility/`, `l1/`, `cost/`, `iter/`, `scripts/` |

## 0 · In brief

**Default digest: 36/38, first 36 34/36, first 24 22/24; open rows P1 and P3, both OWNER-BLOCKED with 0 red cells. Under O-103's rulings (`--ruled`): 38/38, 36/36, 24/24.** 655 cells over both engines and both themes; 1 NOT-REPRODUCED (W1 `morph·warm-collapse` `agree`, Playwright WebKit light, passed both re-runs). No row has an UNMEASURED cell. The H6 baseline read pass 5's B′ at 28/38 (29/38 ruled), and floor v5 reads 23/38.

| obligation (§P5-7.3) | status | where |
|---|---|---|
| 1 · B2, the edge not the opacity | **met**: every seam edge inside the plate is a mask ramp one seam wide; `CUT_OPACITY`, `cutOpacity` and every opacity write are gone. 0 stub frames in every W3 cell and FM strip in four columns; the narrowest edge read 7.63-7.72 px (bound > 2 px). H6-2: no hole longer than one frame anywhere | §1.1, §3 |
| 2 · F7 under the ceiling | **met**: eager graph 64 files / **503,219 B** against 503,808 B, **margin 589 B**. The scene chunk is 20,942 B (pass 5: 23,324 B, −2,382 B). No ceiling raise, no split | §1.2 |
| 3 · constants from the motion law | **met**: `LEAD_DROP` is gone. The lead moves at the rung's natural speed, ω = 2π / response, across the unit's box, one 60 Hz frame of it per painted frame: 0.349 of a unit's ink per frame. `acrossOf` is struck, with `inkOf`. R2's worst read 0.357-0.361 in three columns and 0.468 in one (bound 0.5) | §1.3, §3.3 |
| 4 · harness ids out of `src/` | **met**: PR `prose·harness` 0 (pass 5: 14) | §1.4 |
| 5 · the G-DOCK-MORPH fence | **met by striking it**: the scene has no painted read beyond the original three (`getClientRects` 0, `getBoundingClientRect` 3), so the gate is back to its pass-4 law, plus one new arm (a cut is a mask, never an opacity) | §1.5 |
| 6 · cost at 4×, 20 and 40 seats | **measured**, three runs at load 8.57-14.51: one trigger frame over 25 ms at 40 seats (max 30.6-61.0 ms) on expand and lead in every run; the floor 0. Pass 5's 1-9 extra frames do not recur | §2 |
| 7 · rebase on floor v5; C8, C9, R3, R5 under N-11 | **met**: C8 10/10 presses mid-morph collapse, C9 52 px, R3 and R5 PASS, in four columns | §3.4 |

---

## 1 · The patch

### 1.1 · The rebase, and obligation 1: the seam edge is a ramp

`pass-5/D2-Bp-proto.patch` (sha256 `ccaf146e…`) applied clean on HEAD + floor v5 with no conflict. Floor v5's three source hunks do not overlap it (N-11 in `useDockState.ts`, which B′ does not touch; N-12 in `density.css`; the `shell.css:128` comment strike, which sits outside B′'s hunks). The route's copy of anything floor v5 carries: none.

**The cut.** In `writeClip` (`useDockScene.ts`), a unit's clip is written as before (the plate's silhouette, a hard edge at the plate's own main edges). Then, for every edge the exchange puts inside the plate (`v0 > box.lo + TOUCH_PX && v0 > P.lo + TOUCH_PX`, and the same at the end), the unit gets a `mask-image: linear-gradient(to right | to bottom, …)` in its own px whose alpha is `min(1, distance to the seam edge / seam)`. That is a ramp exactly one seam (`--dock-seam`, `1ch`) wide, from 0 at the edge to 1 one seam in, and a segment shorter than two seams peaks below 1 rather than folding into a step. The mask is cleared with the clip. Four stops in all cases. A clone of a seat that leaves the DOM is created with `translate`, `clip-path` and `mask-image` set to none.

**What went.** `CUT_OPACITY`, `cutOpacity` (its no-ink path at full opacity included), `setOpacity`, the `op`/`base` fields, `inkShare`, `inkAt`, the `drawn` field, `inkOf` and `acrossOf`. The scene writes no opacity on any unit. The "fades out over its last quarter seam" opacity also went: the ramp does that work at the edge.

**What stayed.** The seam gap (one seam plus 1 px between a leaving front and an arriving edge: H4-1's splice), the rule that a unit cut inside the plate to less than its own seam paints nothing (H4-1's sliver), the reveal limiter (`REVEAL_GAIN`), and `SEAM_AT`'s pacing.

**Why a mask and not a feathered clip.** A clip edge is hard by construction; only a mask has an alpha slope. `mask-image` unprefixed is shipped on both target engines (E-2), and H6-1 reads exactly this form (`hp.maskOf`).

### 1.2 · Obligation 2: the boot graph

Measured on `dist-demo/` as `gate:boot-graph` measures it (`scripts/bg.mjs`, the gate's own parser), every figure from a fresh `npm run demo:dist:build` (`iter/demo-build-*.log`):

| tree | eager graph | margin | scene chunk |
|---|---:|---:|---:|
| HEAD + floor v5 + pass-5 B′ (the rebase, before any change) | 505,548 B | −1,740 B | 23,324 B |
| + obligation 1 and 3 (the ink reads, the opacity and `takeLead` gone; the mask added) | 503,598 B | 210 B | 21,374 B |
| + the rung-speed lead (`omega`, `FRAME_MS`) | 503,796 B | 12 B | 21,519 B |
| + compactions (below) | **503,219 B** | **589 B** | **20,942 B** |

F7's own `gate:boot-graph` run on the final tree: 14/14, build arm 3/3 (`F7-bp/F7.log`). Floor v5 alone reads 484,853 B (FV4, FLOOR-V5 unchanged), so the route's eager cost is 18,366 B.

The compactions, each behaviour-neutral, borrowing the technique of G's banked ones (table- and helper-driven code; no G code moved):
- the compact rung's two `querySelectorAll` walks become one `hidden` list shared by both branches;
- `check()` places every mover (region, face, cell, crossfade unit) through one `take()` helper;
- `retire()` writes the clone's out-of-flow style in one `cssText` append, and strips its three attributes in one loop;
- the unread `morphing` ref is a local boolean (`GlassDock` reads the window through `onWindow`; nothing read `scene.morphing`), so `UseDockSceneReturn` loses that member (E-1: no alias).

### 1.3 · Obligation 3: the lead from the motion law

`LEAD_DROP = 0.45` sat under H5-4's 0.5 by construction. The lead is now taken at the rung's own speed. `DockBody` exposes `omega`, the dock rung's angular frequency `2π / (response × tempo)` per ms (`DOCK_SPRING`, `springPreset("dock")`; at response 0.30 s, ω = 20.9 / s). A lane released over a length L never moves faster than ω·L, and on each body frame a leaving unit's lead fraction advances by `ω × FRAME_MS × unit length / (lead_start + lead_end)`, so its edges cross its box at ω, one 60 Hz frame of it per painted frame (FRAME_MS = 1000 / 60). A late frame therefore delays the lead and never leaps it, which is Q-15 (a)'s law (O-103) applied to the content. Per frame that is ωF = 0.349 of the unit's ink, a property of the rung, not of a witness's bound.

Two intermediate forms were measured and rejected (`iter/`):
- **the lead on the exchange's own progress** (`r = p`): the wipe starts from rest with the glass, and the arriving face is blank for 6-7 frames on every swap and retarget (W3 `blank`, bound 1; `iter/w3-bp1-chromium.log`);
- **the step response's peak speed** (0.40 ω) over the unit, then over the exchange's widest unit: blanks of 2-5 frames remain on `swap-short` and `retarget·*` (`iter/w3-bp2-chromium.log`, `w3-bp3-chromium.log`), and a 0.736 vanish on `lead-remove`.

**R2's margin against its bound** (H5-4 under H6-3's bounded ink, bound 0.5; the worst leaving one-frame drop per column, main runs): Chromium light 0.361 (`swap-short`), Chromium dark 0.357 (`swap-short`), Playwright WebKit light 0.361 (`warm-collapse`), Playwright WebKit dark **0.468** (`retarget·120`, seat 2 1 → 0.532 at +36 ms, load 17.13). Margins 0.139-0.143, and 0.032 on the WebKit retarget. That one cell's step is the re-armed unit's paced path and lead taken together across a 36 ms WebKit frame; it is recorded, not cured (§5).

`acrossOf` is struck. Under H6-3 the harness bounds a unit's ink by its own box, and the scene no longer models any ink: no read of the instrument remains in the scene.

### 1.4 · Obligation 4: prose

Every harness row id and witness cell name is struck from `src/`: `useDockScene.ts` (H3-1, `swap-long`, H4-1, H5-3, H4-2, H3-7, W3 `lattice`, H5-4's mention, two inline `(H4-1 …)` / `(H4-2)`), `useDockBody.ts` (H3-4 `stall`), `shell.css` (`[D2-B′ · H3-7]`), and the scene's own `[D2-B′]` route label. Each sentence keeps its law. PR (H6-9) on the final tree: `prose·harness` 0; the other five PR cells pass (readers 65, count 7, partials 0 wrong, citations 0, rows 32).

### 1.5 · Obligation 5: G-DOCK-MORPH

With `inkOf` and `acrossOf` gone, there is no successor to fence: the scene has 0 `getClientRects` and exactly the three `getBoundingClientRect(` of the position model (the root, its parent, `rectOf`). `g-dock-lattice.test.ts`'s first arm is back to its pass-4 assertions on the whole scene, with no regex on any function body. One arm is added beside it: "a cut is a mask ramp, never an opacity" (the scene writes `style.maskImage`, builds the `linear-gradient(${vert ? "to bottom" : "to right"}` form, and contains no `style.opacity` or `"opacity"`). Falsified in the seat: an opacity write planted in `setMask` turns that arm red, and the restore turns it green (`iter/falsify.log`).

### 1.6 · The floor's C8 unit test on the carrier

Floor v5's `GlassDock.posture.test.ts:456` asserted the floor carrier's `isTransitioning` 40 ms into an expand. Under B′ that flag is the scene's window (`onWindow`), and jsdom lays nothing out, so the scene opens no window there: the test fails on the carrier for a reason outside its law. It now holds the chart's half of O-91 C8 (a press away right after an expand folds the dock at once, nothing queued), says in its comment that the mid-flight press is witnessed in paint, and keeps `isTransitioning` false at the settle. Falsified: with `hover`'s `click.away` returning null the test fails; restored, it passes, and `useDockState.ts` equals floor v5's byte for byte (`iter/falsify.log`).

### 1.7 · Q-4 (c): no token

FLOOR-V5 §5 left the dock-only clock to the carrier "if B′'s scene closes its flag on a clock". It does not: the window closes on the frame the last lane lands (`land()`), with no clock read. A 0.27 s token would have no reader (PR `prose·readers`) and would state the landing time a second time beside the spring that produces it (P-3). So none is added; the ruling's content stays the witness's reading (`Q4_DOCK_CLOCK_MS` = 270), which every window cell holds (§3.3).

---

## 2 · Cost (obligation 6, for the record)

`pass-2/D2-Bp-probes.mjs --arm pcost,plead`, Chromium traced, `bp` (this seat) against `fv5` (FLOOR-V5's build), three runs each, alternating builds, each under `guarded --cpu-cores 0` and started only at a 1-minute load ≤ 15 (`scripts/cost.sh`; records `cost/`). Every cell read at load **8.57-14.51** (2026-10-21 00:0x-00:14). Rows: frames over 25 ms / max frame ms, run 1 · run 2 · run 3.

| Chromium | `bp` | `fv5` |
|---|---|---|
| 4×, 20 seats, expand | 1 / 45.7 · 1 / 25.9 · 0 / 23.5 | 0 / 15.2 · 0 / 10.5 · 0 / 17.0 |
| 4×, 40 seats, expand | 1 / 61.0 · 1 / 37.8 · 1 / 30.6 | 0 / 25.0 · 0 / 14.9 · 0 / 15.8 |
| 4×, 20 seats, lead | 0 / 21.8 · 0 / 22.8 · 0 / 22.5 | 0 / 16.0 · 0 / 9.6 · 0 / 23.7 (no lead morph) |
| 4×, 40 seats, lead | 1 / 30.3 · 1 / 31.6 · 1 / 33.3 | 0 / 10.3 · 0 / 10.0 · 0 / 9.7 (no lead morph) |
| 1×, 40 seats, expand / lead | 0 > 25 in all six (max ≤ 11.9) | 0 > 25 in all six (max ≤ 11.1) |
| main-thread ms per frame, 4×, 40 seats, expand / lead | 1.36-2.35 / 1.63-1.98 | 1.94-2.19 / 0.18-0.23 |

**Reading.**
- At 4× B′ pays **one trigger frame** over 25 ms at 40 seats in every run, on expand and on lead, and at 20 seats on expand in two runs of three; never more than one. Its worst is 61.0 ms (run 1, load 13.88). Pass 5's critic read 1-4 (expand) and 1-9 (lead) frames at 40 seats, max 50-88.3 ms, at load 17-40 (B′-crit §5); at load ≤ 15 the excess beyond the trigger frame is gone. The trigger frame is the check (the layout read, `arm`, the first write); this seat's patch removed per-unit glyph reads (`inkOf`, a Range walk per unit) and the bisection from it.
- The floor pays 0 frames over 25 ms at every seat count, as in pass 5.
- At 1× neither build has a long frame.
- Per frame, B′'s expand costs less main-thread time than the floor's (1.36-2.35 against 1.94-2.19 ms at 40 seats, two of three runs below the floor's lowest); its lead morph costs 1.6-2.0 ms where the floor animates no lead.
- B′'s morph runs on 24-39 frames at 4× and 40 seats, against the floor's 69-72 (`morphFrames`); at 1× B′ reads 35-36 and the floor 72-74. The probe counts each build's own window, so this is recorded, not compared.
- Playwright WebKit was not re-read for cost in this seat (pass 5: 0 frames over 25 ms on both builds at 40 seats).

Against "frames over 25 ms at 40 seats ≤ the floor's expand", B′ is over by one, the trigger frame, in every run. That is Q-15's record (O-103 ruled Q-15 (a): a stall delays, never leaps; B′ meets it, R4 and R8 ×4).

---

## 3 · The 38 rows under H6

### 3.1 · Build, typecheck, units, gates, PR

| check | result | load |
|---|---|---|
| harness build `bp` (`build.mjs`, out inside the seat dir) | exit 0 (`build-bp.log`) | 31.32 |
| F7 lib build, demo dist build | exit 0 (10 s), exit 0 (3 s) | 30.56-30.83 |
| F7 `vue-tsc` (after the builds) | exit 0 (24 s) | 30.56-35.11 |
| F7 vitest `--maxWorkers=2`, the whole suite | 232 files outside `tests/gates/`, 2,241 tests, 0 files failing | 35.11-36.81 |
| F7 gates | boot-graph 14/14 (build arm 3/3), comment-ratio 15/15, feedback-tint-seam 3/3, gate-register 21/21, orphan-css-partial 9/9, overfit-structure 15/15, tabs-seam 26/26, token-hygiene 4/4, trap-gates 6/6, type-hygiene 7/7. **F7 13/13** | 36.81 |
| PR (H5-8, H6-9) | 6/6, `prose·harness` 0 | 31.15 |

### 3.2 · Battery slots (H6-10)

`scripts/chain.sh`: one `battery.sh theme` slot per engine and theme, Chromium first, Playwright WebKit under `--exclusive webkit`. Every red cell was re-run twice inside its slot. At both WebKit queues the guard logged a wait for the lock, and the slot's first witness started within the same minute (`chain-bp-webkit.log`; first lines of `bp-main-W3-webkit.log`, `bp-dark-ST-webkit.log`).

| slot | start → end | load at start / end | cells' load (min-max) |
|---|---|---|---|
| bp · Chromium · light | 22:37:53 → 22:48:38 | 31.77 / 25.38 | 20.16-37.97 |
| bp · Chromium · dark | 22:48:38 → 22:59:22 | 25.38 / 15.84 | 16.53-36.03 |
| bp · Playwright WebKit · light | 22:59:22 → 23:11:11 | 15.84 / 20.51 | 11.38-28.05 |
| bp · Playwright WebKit · dark | 23:11:11 → 23:22:36 | 20.51 / 32.76 | 12.95-38.45 |

Red cells, all four slots: two. W1 `morph·warm-collapse` (Playwright WebKit light, `agree`: the video's static head read "untrusted", silhouette 0.52 px outside the adapter's extent, load 12.1) passed both re-runs (load 12.11-12.44): **NOT-REPRODUCED**. CASES `case·rotated` (Playwright WebKit light, `jerk` 7.34 against control 6.13 + 1, load 13.47) failed main and re-run 2 and passed re-run 1; it is outside the 38 (pass 5 recorded the same cell NR), and no row reads its `jerk`. ST in Playwright WebKit read its markers at a video scale of 1.0019-1.0033 in every cell, inside H6-4's 1 ± 0.01, so no ST cell is UNMEASURED.

### 3.3 · Per row, per engine and theme

From `digest/rows-p6bp.md` (default) and `digest/table-p6bp-ruled-ruled.md` (`--ruled`). C = Chromium, W = Playwright WebKit. "n/n" is passing cells over cells read.

| row | C·l | C·d | W·l | W·d | note |
|---|---|---|---|---|---|
| P1 | OB 42/42 (OB 3) | OB 42/42 (OB 3) | OB 42/42 (OB 3, NR 1) | OB 42/42 (OB 3) | W1 `card·*`: OWNER-BLOCKED under the witness, the band holding in every card cell; **PASS under `--ruled`** (Q-12 (b)) |
| P2 | 8/8 | 8/8 | 8/8 | 8/8 | |
| P3 | OB 42/42 (OB 6) | OB 42/42 (OB 5) | OB 42/42 (OB 6) | OB 42/42 (OB 7) | every OB cell is `window` alone with Q-4 (c) holding; **PASS under `--ruled`**. `reversal`, the cell to watch: 275.4 ms ≤ 318.3 (C·l), 278.8 ≤ 312.8 (C·d), 275 ≤ 315.4 (W·l), 277 ≤ 315.4 (W·d), each after the retarget. No W3 cell co-fails `stub` any more, so H6's FAIL [window, stub] class is gone |
| P4 | 13/13 | 13/13 | 13/13 | 13/13 | |
| P5 | 8/8 | 8/8 | 8/8 | 8/8 | |
| F1 | 17/17 | 17/17 | 17/17 | 17/17 | |
| F2 | 6/6 | 6/6 | 6/6 | 6/6 | |
| F3 | 4/4 | 4/4 | 4/4 | 4/4 | |
| F4 | 8/8 | 8/8 | 8/8 | 8/8 | |
| F5 | 1/1 | 1/1 | 1/1 | 1/1 | |
| F6 | 162/162 | 150/150 | 162/162 | 150/150 | 0 crashes |
| F7 | source 13/13 | | | | §1.2 |
| N1 | 2/2 | 2/2 | 2/2 | 2/2 | |
| N2 | 1/1 | 1/1 | 1/1 | 1/1 | |
| N3 | 3/3 | 3/3 | 3/3 | 3/3 | §5 (the `seat-transition` `terminal` borderline) |
| N4 | 20/20 | 20/20 | 20/20 | 20/20 | |
| N5 | 1/1 + PR 4/4 | 1/1 | 1/1 | 1/1 | floor v5 N-11 and N-12 held (C8, C9 below); N-9's markers not re-added; `prose·harness` 0 |
| R1 | 32/32 | 30/30 | 32/32 | 30/30 | 0 blank frames past one in any cell |
| R2 | 33/33 | 33/33 | 33/33 | 33/33 | vanish worst 0.361 / 0.357 / 0.361 / 0.468 (§1.3); largest unit ink read 1 (H6-3) |
| R3 | 1/1 | 1/1 | 1/1 | 1/1 | `reversal` under N-11: trajectory after the retarget 1.48 px against 7.77 (C·l) |
| R4 | 5/5 | 5/5 | 5/5 | 5/5 | ST, scale in tolerance in WebKit |
| R5 | 4/4 | 4/4 | 4/4 | 4/4 | under N-11: `hit·warm-expand`, `hit·warm-collapse` pass |
| R6 | 39/39 | 39/39 | 39/39 | 39/39 | W3 splice 0, sliver 0, stub 0 (H6-1); FM stub 0 |
| R7 | 35/35 | 33/33 | 35/35 | 33/33 | |
| R8 | 9/9 | 7/7 | 9/9 | 7/7 | ST `nb` in WebKit light: the neighbour's worst one-frame step 173.51 px against 192.34 (×0.9) at `2raf`, plate at worst −18.72 px from it (bound 0.5) |
| B1 | 1/1 | 1/1 | 1/1 | 1/1 | |
| B2 | 39/39 | 39/39 | 39/39 | 39/39 | W3 `stub` 0 and `hole` ≤ 1 frame; FM 6/6 strips, stub 0; the strips' gestalt in §4 |
| B3 | source 5/5 | | | | |
| C1 | 1/1 | 1/1 | 1/1 | 1/1 | collapsed 102 × 56 stadium, Home + "•••" |
| C2 | 3/3 | 3/3 | 3/3 | 3/3 | `c2·prm` under Q-18 (a): extent, seats and flag in 0 frames |
| C3 | 4/4 | 4/4 | 4/4 | 4/4 | |
| C4 | 1/1 | 1/1 | 1/1 | 1/1 | |
| C5 | 1/1 | 1/1 | 1/1 | 1/1 | |
| C6 | 1/1 | 1/1 | 1/1 | 1/1 | |
| C7 | 4/4 | 4/4 | 4/4 | 4/4 | `c2·morph·v` passes (the floor's red) |
| C8 | 1/1 | 1/1 | 1/1 | 1/1 | §3.4 |
| C9 | 1/1 | 1/1 | 1/1 | 1/1 | §3.4 |
| L1 | 6/6 (light + dark) | | 6/6 | | shadow 1 / 4 / 4, gradients 8, pseudos 8, blur 16 px, equal to `fv3` in all 12 cells; 0 idle infinite animations |

**Counts.**

| digest | 38 rows | first 36 | first 24 | OWNER-BLOCKED rows |
|---|---:|---:|---:|---|
| default | **36/38** | 34/36 | 22/24 | P1, P3 |
| `--ruled` (O-103: Q-4 (c), Q-12 (b)) | **38/38** | 36/36 | 24/24 | — |
| H6 baseline, pass-5 B′ (for reference) | 28/38 (29/38 ruled) | 28/36 | 18/24 | P1 |

The arm set (identical by construction, H5-6, H5-9, H6-10): light = main (W3 with faces, ST, R5, CF, L1, FM, W2, CASES) + rest (W1, W4, W5, W6, W7, W8, R6); dark = dark (ST, FM, W1, W3, W2, R5, CF) + darkrest (W4-W8, R6); each in both engines. CF carries `crit-corner` and `crit-prm` (C1, C2), `c8·outside-press` and `c9·short-coarse`. Source: F7 and PR. L1's reference is `fv3` (H6's build of HEAD + `pass-4/floor-v3.patch`).

### 3.4 · Obligation 7: C8, C9, and R3, R5 under N-11

| column | C8 (CF, H5-11, H6-6) | C9 | R3 `reversal` | R5 | load (CF) |
|---|---|---|---|---|---|
| C·l | 10 presses landed mid-morph (bound 10 of 10), **10/10 collapsed** within 1,500 ms of the settle; 0 of 10 hovers on a collapsed dock failed to open it | expanded block **52 px** (bound 52: 44 + 2 × 4), 4 seats, smallest 44 px | PASS | 4/4 | 29.08-33.78 |
| C·d | 10, **10/10** | **52 px** | PASS | 4/4 | 18.8-21.52 |
| W·l | 10, **10/10** | **52 px** | PASS | 4/4 | 13.38-17.66 |
| W·d | 10, **10/10** | **52 px** | PASS | 4/4 | 26.83-38.45 |

The press now reaches the chart mid-morph (N-11), the posture flips, and the scene re-expresses every lane against the new layout from where it painted, carrying its velocity: that is B′'s reversal path, which R3 reads. C8's frames: `facility/*/frames/*c8_outside-press*`. C9's: `facility/*/{chromium,webkit}-c9-short-coarse.png`. The route does not re-gate the press and does not touch the short coarse pad.

---

## 4 · The strips (B2's gestalt), read from frames

`filmstrips/{chromium,webkit}-{light,dark}/strip-*.png` (FM, 14 tiles at 40 ms). I read the Chromium light strips of `first-expand`, `warm-collapse` and `swap-long`.

- **No hard-cut glyph.** Where a seam crosses a glyph, the glyph fades across its width: the leaving "P" of `first-expand` is a faint bowl for two tiles, the leaving "1" of `warm-collapse` a faint stem for one; the arriving "Tools" of `swap-long` comes in as "ools" with a soft, low-ink "T" for three tiles. Pass 5's half-ink stubs at a hard edge ("\", "[", "(", "ʌ B ; Brush") do not appear. The plate's own edge still cuts hard ("Layer", "Settin", "Squ"): that is the glass taking what it passes, H6-1's allowed case.
- **The slot stays empty while its neighbours paint.** In `first-expand`, seat 1's slot is empty for tiles 3-5 while seats 2, 3 and Play paint; in `warm-collapse`, the slot between H and 2 is empty for tiles 3-4 before the arriving "P" fades in; in `swap-long`, "C" arrives last, after Tools, Brushes and Layers. H6-2 does not count these as holes: seat 1 is the run's edge slot or its neighbour's FLIP covers it (W3 `hole` reads 0 frames in Chromium and ≤ 1 in WebKit, bound 1). This is the order class B′-crit §4 recorded. It is the critic's to read against D-1 and D-2. Its cause, as far as this seat read the code, is that the unit leaving that slot is paced to reach its seam only at `SEAM_AT` (0.8 of the exchange), so the unit arriving behind it waits. Not cured here (§5).
- The material is flat and deft (L1 census equal to `fv3`): one soft shadow, a hairline edge, no glow.

---

## 5 · Open, placed

| item | evidence | note |
|---|---|---|
| P1, P3 are OWNER-BLOCKED on the witnesses' own verdicts; both pass under O-103's rulings | §3.3 | the rulings exist (O-103); the default digest reads the witnesses as written, per §P5-7's placement |
| R2's thin cell: Playwright WebKit dark `retarget·120`, 0.468 against 0.5 | `battery/bp-dark-W3-webkit.log` | a re-armed unit's paced path and lead in one 36 ms frame; every other column's worst is 0.357-0.361 (ωF = 0.349) |
| the empty slot on expand, collapse and swap (B2's gestalt) | §4 | H6-2 passes; the critic reads the strips |
| W3 `seat-transition` `terminal` borderline: last step 0.84-0.94 px against a dt-scaled bound of 0.81-1.21 | `iter/stctl.log`: a same-session control, three runs each, read pass-5's B′ build (H6's `bp`) red once (0.84 > 0.81) and this build green three times; the battery read N3 green in every column | inherited from the carrier's landing step, not this patch; recorded |
| the 4× trigger frame: one frame over 25 ms at 40 seats in every run (the floor 0) | §2 | for Q-15's record; Q-15 (a) ruled (O-103) |
| CASES `case·rotated` in Playwright WebKit (`jerk`) | §3.2 | outside the 38, as pass 5 |
| every real-Safari cell | — | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted |
| O-104's dock asks (select overlap, entry focus, `backgroundCanvas`, DockLayerGroup `reserve`, coarse rung on tab controls) | `audit/INBOUND.md` O-104 | outside D2's fixed list; triage was dispatched by the driver |

## 6 · Fences, as kept

- Every build and run used the seat worktree `.claude/worktrees/bl/D2/p6/Bp-proto/wt` (detached at `75df1f166`), with `node_modules` a directory of per-entry symlinks into the checkout's (the checkout has no `tests-visual/node_modules` to link), so vite's caches and F7's `dist/` and `dist-demo/` stayed in the worktree. The reference tree (`ref/`: an archive of HEAD + floor v5) was patched with repository discovery fenced off (`GIT_CEILING_DIRECTORIES`). Git writes: `worktree add` and `worktree remove` only.
- Writes to the checkout: this file, `pass-6/D2-Bp-proto.patch` (placed by `cp` so its sha256 is the measured patch's) and `pass-6/D2-Bp-proto-records/` (copied from the seat's out dir). No tracked file was edited; `git status` in the checkout shows no modified tracked file.
- Every build, test and browser run went through `~/.claude/guard/guarded`, one heavy run at a time; browser runs never `--light`; Playwright WebKit under `--exclusive webkit`. Playwright's default headless shell, no GPU args, no browser MCP. The witnesses retire a WebKit browser every 60 page loads (H3-1). No page close was seen. No zone refusal from the guard.
- Real Safari and headed runs: none (owner-run).
- At the close the worktree was removed (`git worktree remove --force`) and the whole seat directory `.claude/worktrees/bl/D2/p6/Bp-proto/` deleted with it (builds, witness output, `ref/`). Every record above is under `pass-6/`. No process of this seat remains.
