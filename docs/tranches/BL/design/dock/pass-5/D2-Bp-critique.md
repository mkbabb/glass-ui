# D2-B′ critique, pass 5: the measured scene on floor v4

| | |
|---|---|
| Seat | D2 pass 5, route D2-B′ (the measured scene, one integrator), CRITIC. I authored nothing in D2 |
| Model | `claude-opus-5-5`, asserted from own system identity |
| Tree | checkout HEAD `3c8563f32` + `pass-5/floor-v4.patch` (sha256 `a5f71e00a8f8b0f0…`, matches FLOOR-V4) + `pass-5/D2-Bp-proto.patch` (sha256 `ccaf146e9df16d0b…`, matches the prototype's header). Both applied clean in the worktree `.claude/worktrees/bl/D2/p5/Bp-crit/wt`; 64 tracked files changed against HEAD plus the route's new files (`apply.log`). Removed at close |
| Builds | `bp` (the route) and `fv3` (L1's reference: HEAD + `pass-4/floor-v3.patch`), and `fv4` for the cost arm only, all by `harness/build.mjs` with output inside the worktree (`build-bp.log`, `build-fv3.log`, `cost/build-fv4.log`, exit 0) |
| Harness | H5 as landed (`pass-5/H5.md`, `harness/HARNESS.md` §10), unchanged. Adapter `pass-3/adapter-floor-v2.mjs`, unshimmed, adapter law held (`battery/bp-extra-adapter-law.log`) |
| Runner | `harness/battery.sh` through the prototype's `battery-part.sh`, so stage names, witness sets and the re-run rule (`reds.mjs`, controls kept) are the prototype's. Chromium ran in nine guarded groups (`chain.sh`). Playwright WebKit ran two groups under `chain.sh`, then the rest in two `--exclusive webkit` slots (`chain2.sh`), because each lock wait was about 70 min and each group ran in minutes. Digest: `cells.mjs`, the prototype's, unchanged (verdict rule and the 38-row map of FV4-cells.mjs) |
| Engines | headless Chromium (Playwright's default headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| Load | 1-minute load 10.5-35.7 across every battery cell and re-run (`rows-bp.md`, per row and theme); F7 44.4 (the guard admitted it after a wait at 41); attack arm 21.7-31.4; cost arm 17.1-39.6. WebKit lock waits: 71 min and 73 min for the first two groups, 6 min and 32 min for the merged slots (`battery/chain.log`). Every red cell was re-run twice in its slot |
| Owner rulings | none on Q-4, Q-12, Q-15, Q-16, Q-17 or Q-18 (`audit/INBOUND.md`; `FORMATION-PROGRESS.md` read 2026-10-18). Defaults: Q-4 lenient → OWNER-BLOCKED, Q-12 lerp → OWNER-BLOCKED, Q-18 (a). Q-15 unruled |
| Records | `pass-5/D2-Bp-crit-records/`: `battery/` (every stage log with its load, re-runs, `json/bp-{chromium,webkit}/`, `chain.log`, `cells-bp.json`, `rows-bp.md`, `table-bp.md`, `counts-bp.md`), `F7-bp/`, `PR-bp/`, `filmstrips/`, `facility/`, `l1/`, `attack/`, `cost/`, the scripts |

## 0 · In brief

**Verdict: ADVANCE. 32 of 38 (84 %); first 36: 32/36 (89 %); first 24: 20/24 (83 %).** Not CONVERGED: 6 rows open, 2 of them owner-blocked.

| row | status | why |
|---|---|---|
| P1 | OWNER-BLOCKED (Q-12) | W1 card corners, 12 OB cells, 0 red |
| P3 | OWNER-BLOCKED (Q-4) | 24 OB window cells, 0 red |
| F7 | FAIL | `gate:boot-graph`: 64 files / 505,647 B against 503,808 B, reproduced to the byte |
| B2 | FAIL, on my gestalt read | hard-cut partial glyphs at half ink in every exchange, both engines, both themes (§4). The gated FM stub check passes |
| C8 | FAIL (the floor's class) | 0 of 8 mid-morph presses collapse, ×4 columns, re-runs F, F |
| C9 | FAIL (the floor's class) | expanded block 60 px against 52 at 844 × 390 coarse, ×4, re-runs F, F |

**The arm set beside the score**, run on `bp` in Chromium and Playwright WebKit, light and dark: main (W3 with faces, ST, R5, CF, L1, FM, W2, CASES), rest (W1, W4, W5, W6, W7, W8, R6), dark (ST, FM, W1, W3, W2, R5, CF), darkrest (W4-W8, R6); extra (PR, adapter law); F7. CF carries `crit-corner` (`c1·shape·*` `ownshape`, `corner`) and `crit-prm` (`c2·prm` `content`, `flag`), C8 and C9. This is the H5 set by construction (H5-6, H5-9), so B1's "same arm set" half holds for any route measured under H5. Mine adds one arm outside the battery (`attack/`, §3) and the cost arm (§5); neither enters a row.

The digest alone reads 33/38 (`table-bp.md`). My score is one lower because B2 is the gestalt row and the task gives its reading to the critic (§4). If B2 were read by the gated FM check alone, the count would be 33/38, 33/36, 21/24.

## 1 · What this seat ran

| step | record | result |
|---|---|---|
| apply, both patches, sha256 checked | `apply.log` | clean |
| F7 (H5-10): lib, demo, `vue-tsc`, vitest `--maxWorkers=2`, every gate | `F7-bp.log`, `F7-bp/` | 12/13. Units 232 files, 2,239 tests, 0 failing; typecheck exit 0; builds exit 0. `gate:boot-graph` fails: "eager graph: 63 modulepreloads + 1 entry = 64 files / 505647 B: expected 505647 to be less than or equal to 503808" |
| PR (H5-8) | `PR-bp.log` | 5/5: readers (65, 0 reader-less), count (7), partials (0 wrong), citations (0), rows (32, 0 doubled) |
| battery, Chromium light + dark | `battery/bp-*-chromium*.log` | every row except F7, C8, C9 passes or reads OB. Reds: C8, C9 only |
| battery, Playwright WebKit light + dark | `battery/bp-*-webkit*.log` | the same. One extra red, `case·rotated` (`jerk` 15.42 against control 13.08 + 1, load 16.8), passed both re-runs (18.35, 17.09): NOT-REPRODUCED |
| digest | `battery/table-bp.md`, `rows-bp.md`, `counts-bp.md` | 1,308 cells (fv4 + bp); bp crash-free in both engines (F6 162/162 light, 150/150 dark, each engine) |
| attack (my arm) | `attack/stub-{dark,light}-{1..5}.log` | §3 |
| cost (not a row) | `cost/` | §5 |

## 2 · The checklist (REGISTRY §P4-7.5, fixed, 38 rows)

C = Chromium, W = Playwright WebKit. "n/n" is passing cells over cells read, from `rows-bp.md`. Every cell of every row was read in all four columns (both engines, both themes) unless the row is source-only.

| # | verdict | C light | C dark | W light | W dark | note |
|---|---|---|---|---|---|---|
| P1 | **OWNER-BLOCKED** | OB 42/42 (OB 3) | OB 42/42 (OB 3) | OB 42/42 (OB 3) | OB 42/42 (OB 3) | W1 `card·*` under Q-12's lerp. WebKit's worst in-flight card corner 0.39-1.37 px. W7 20/20 everywhere |
| P2 | PASS | 8/8 | 8/8 | 8/8 | 8/8 | `long-run-v` reaches every seat by key |
| P3 | **OWNER-BLOCKED** | OB (OB 6) | OB (OB 6) | OB (OB 5) | OB (OB 7) | §2.1. No red cell |
| P4 | PASS | 13/13 | 13/13 | 13/13 | 13/13 | `compact·non-first-current` passes (fv4 red in every column) |
| P5 | PASS | 8/8 | 8/8 | 8/8 | 8/8 | |
| F1 | PASS | 17/17 | 17/17 | 17/17 | 17/17 | |
| F2 | PASS | 6/6 | 6/6 | 6/6 | 6/6 | |
| F3 | PASS | 4/4 | 4/4 | 4/4 | 4/4 | |
| F4 | PASS | 8/8 | 8/8 | 8/8 | 8/8 | |
| F5 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | `first-expand` faces in main (H5-9) |
| F6 | PASS | 162/162 | 150/150 | 162/162 | 150/150 | 0 crashes |
| F7 | **FAIL** | source: 12/13 | | | | boot graph 1,839 B over (§1) |
| N1 | PASS | 2/2 | 2/2 | 2/2 | 2/2 | |
| N2 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | |
| N3 | PASS | 3/3 | 3/3 | 3/3 | 3/3 | the floor's `seat-transition` borderline did not appear |
| N4 | PASS | 20/20 | 20/20 | 20/20 | 20/20 | |
| N5 | PASS | 1/1 + PR 3/3 | 1/1 | 1/1 | 1/1 | N-9 held (the route struck its own copy: `scroll.page`, `onDockKeydown`, `dock-summary-glyph`, `SlidersHorizontal` are added 0 times by the route patch); N-10 held (PR `partials`) |
| R1 | PASS | 32/32 | 30/30 | 32/32 | 30/30 | `case·capped·morph` passes in both engines (0 window error events; the floor-v4 cure-1 red does not occur on `bp`); `wide·warm-collapse` faces 1 px (bound 1) |
| R2 | PASS | 33/33 | 33/33 | 33/33 | 33/33 | worst vanish 0.448-0.45 against 0.5 (§2.1) |
| R3 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | |
| R4 | PASS | 5/5 | 5/5 | 5/5 | 5/5 | |
| R5 | PASS | 4/4 | 4/4 | 4/4 | 4/4 | |
| R6 | PASS | 39/39 | 39/39 | 39/39 | 39/39 | H5-3 stub 0 frames on every W3 cell and FM strip; splice 0, sliver 0 |
| R7 | PASS | 35/35 | 33/33 | 35/35 | 33/33 | `case·rotated` W light NR (`jerk`, not a `lanes` check) |
| R8 | PASS | 9/9 | 7/7 | 9/9 | 7/7 | §2.2. Measured in WebKit, where the prototype's run read "not measured" |
| B1 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | `retarget·context` held (H5-2); 60/60 pings; the arm set is H5's (§0) |
| B2 | **FAIL** (gestalt) | FM 6/6 | FM 6/6 | FM 6/6 | FM 6/6 | §4 |
| B3 | PASS | source: 4/4 | | | | `DockProps` 7; the four pass-4 facts and the stale citation are gone (§3.3) |
| C1 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | collapsed: Home + "•••" stadium (`facility/*/…c1-h-collapsed.png`) |
| C2 | PASS | 3/3 | 3/3 | 3/3 | 3/3 | `c2·prm` per Q-18 (a): content and flag instant |
| C3 | PASS | 4/4 | 4/4 | 4/4 | 4/4 | |
| C4 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | |
| C5 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | |
| C6 | PASS | 1/1 | 1/1 | 1/1 | 1/1 | |
| C7 | PASS | 4/4 | 4/4 | 4/4 | 4/4 | `c2·morph·v` passes (fv4 red in every column) |
| C8 | **FAIL** | 0/1 | 0/1 | 0/1 | 0/1 | "16 attempt(s), 8 press(es) landed mid-morph …; 0/8 collapsed within 1500 ms of the morph settling", main and both re-runs in every column (loads 13.97-30.71) |
| C9 | **FAIL** | 0/1 | 0/1 | 0/1 | 0/1 | "expanded block size 60 px (bound 52 …); 4 painting seat(s), the smallest 44 px", main and both re-runs in every column |
| L1 | PASS | 6/6 (light + dark in one cell) | | 6/6 | | shadow 1 / 4 / 4, gradient 8, pseudo 8, blur 16 px, equal to `fv3` in all 12 cells (§4) |

**Counts.** PASS: P2, P4, P5, F1-F6, N1-N5, R1-R8, B1, B3, C1-C7, L1 = **32/38**. First 36 (without C8, C9): **32/36**. First 24 (P1-P5, F1-F7, N1-N4, R1-R5, B1-B3): **20/24**, open P1, P3, F7, B2.

### 2.1 · The owner-blocked windows (P3), and the margins

- The windows that read OB (Q-4's lenient reading) and their strict allowances: Chromium `warm-collapse` 266.3 / 267.1 ms against 257.7 / 257.6; `warm-expand` (dark) 267.4 against 257.9; `swap-short` 259.2-259.9; `anchor-end·warm-*` 258.3-259.9; W6 `form·collapse` 258.4. Playwright WebKit `first-expand` 281 / 271 against 273.6 / 260.6; `warm-collapse` 260-261; `content-remove` (dark) 264; W6 `form·expand` 275, `form·collapse` 265. The largest is `reversal`: 273.4-276 ms **after the retarget**, in every column.
- Obligation 4 holds: `lead-remove` closes its window at 243.3 / 243.2 ms (C), 246 / 241 ms (W), inside the strict allowance in every column.
- Obligation 1 holds: `retarget·40` 0 blank frames in every column; worst one-frame drop beyond the closing edge 0.45 / 0.45 / 0.45 / 0.449, from the retarget 0.35 / 0 / 0 / 0.
- **Every leaving first frame sits at 0.448-0.45 against H5-4's 0.5.** That margin is set by `LEAD_DROP = 0.45` in source, not found by the motion. See §6.

### 2.2 · R8 in Playwright WebKit, measured

The prototype scored R8 red in WebKit with every red cell reading "not measured: the video shows no block-end marker" (D2-Bp-proto §6.3). In my run every ST cell found its markers:
- light, five timings × two arms, 10/10 (`bp-main-ST-webkit.log`, load 15.5-21.8). With the neighbour: plate over its box at worst −18.68 to −18.74 px (bound 0.5); the neighbour's worst one-frame step 131.57-157.54 px against bounds of 192.25-192.37 px (×0.68-0.82).
- dark: 5/5 R4 and the `nb` arms within R8's 7/7 (`bp-dark-ST-webkit.log`).
- W3 `neighbour·*` and CASES `case·consumer-margin` (−31.98 px, step 49.84 against the edge's 51.42) pass.

So R8 closes on this run in both engines. The prototype's red was an instrument starved under load (18-33), not the route.

## 3 · Claims checked against the prototype

### 3.1 · The score

The prototype claims 31/38, with P3 and R6 red on one cell (`content-add[stub]`, Chromium dark) and R8 red in WebKit. My run:
- `content-add` dark Chromium: stub 0 frames of 32 in main (load 21.58), so no re-run was due.
- My attack arm (`attack/attack.sh`): ten more independent W3 runs of `content-add`, `content-remove`, `swap-long` and `swap-short` in one guarded Chromium slot, five dark, five light, loads 21.7-31.4. **Stub 0 frames in 40 of 40 cell runs**; `content-add` 0 of 32-37 judged frames each time. The prototype's red (2 of 3 at load 12.87-24.36) is not reproduced in 6 dark runs. Its mechanism (an `inkOf` of `null` skips the soft ramp: `if (m.ink)` in `cutOpacity`) stays a plausible latent path, recorded in §6.
- R8 WebKit: measured and green (§2.2).
- B2: the prototype scores it green. I do not (§4).

Net: 32/38 against the prototype's 31, with three rows read differently (P3, R6 and R8 close; B2 opens).

### 3.2 · The seven §P4-7.3 obligations

| # | claim | my reading | holds? |
|---|---|---|---|
| 1 | `retarget·40/80/120/context` PASS; 0 blank; drops ≤ 0.45 | §2.1; `retarget·80/120` 0 blank, drops 0.45 | yes |
| 2 | splice closed; stub cured on the named cells | splice and H5-3 stub 0 everywhere; but the strips still paint hard-cut partial glyphs at half ink (§4). The obligation's own words are "no frame paints a hard-cut partial glyph" | **H5-3: yes. The obligation's text: no** |
| 3 | dark Chromium `first-expand` icon clip | R7 33/33 dark, 35/35 light, both engines | yes |
| 4 | `lead-remove` flag inside the window | 241-246 ms against 257.8-266.6 | yes |
| 5 | leaving ink step bounded | R2 33/33 ×4 | yes, at 0.45 by construction (§6) |
| 6 | C2 under Q-18 (a) | `c2·prm`, `c2·morph·h`, `c2·rapid` ×4 | yes |
| 7 | B3 facts and the stale citation | PR 5/5; `DockLayerSwitcher.a11y.test.ts` no longer cites a pass record | yes |

### 3.3 · The prose and the gate edit (source read)

- The four pass-4 B3 facts are gone: `index.css` now says the `@import` list is the one record of the partials, names no count, and points `controls.css` at `src/styles/index.css`; `morph.css` says "@import-ed by index.css" and describes the collapsed form as "a stadium of radius cross/2 …; a dock with no persistent seat collapses to the one seat, a circle", which matches C1's 102 × 56 rest.
- **The gate edit (D2-Bp-proto §2.4), judged.** `g-dock-lattice.test.ts` G-DOCK-MORPH now matches `inkOf` and `acrossOf` by a regex on four-space indentation, asserts exactly one `getClientRects` in the scene, strips the two functions, and keeps every original assertion on the remainder (`offsetLeft`, `offsetTop`, `OFFSET_ROUNDING_PX`, three `getBoundingClientRect(`). The law it guards (the position model reads layout) is intact, and the edit fences the new painted reads by name and count. I accept it. One weakness: the fence is a formatting regex, so a reformat that changes the indentation fails the gate for a reason unrelated to the law (§6).

## 4 · The gestalt (B2) and the lighting census (L1), read from frames

Strips: `filmstrips/{chromium,webkit}-{light,dark}/strip-*.png` (FM, 14 tiles at the screencast's 40 ms cadence). The six exchanges are first expand, the warm pair, swap-long, swap-short and content-add. I read all 24 strips and zoomed the swap-long cast frames 42-47 in Chromium light (`filmstrips/zoom-chromium-light-swap-long-f42-47.png`).

**What holds against D-1 and D-2.** The glass grows and shrinks as one continuous body in every strip, with no double exposure, no blank dock and no square tile. The arriving face is whole well before the glass lands. Content-add is clean in every column: the joining "Brushes and layers" is revealed by the plate's own edge, and nothing else moves.

**What fails.** In every exchange, in both engines and both themes, 1-3 tiles paint a glyph that a hard clip edge cuts inside the plate, at about half ink:
- swap-long, Chromium light (frames 44-46): "\ [ ols Brus", then "ʟ ools Brushes", then "( ools Brushes Layers". The leaving "A" is a backslash, the leaving "B" a bracket, the arriving "C" an open parenthesis, and "Tools" is cut to "ools" for two consecutive tiles. Playwright WebKit light has the same three tiles.
- swap-short, all four columns: "C |ools", then ": B ls Brushes", then "ʌ B ; Brush". In WebKit dark, "A B … Bri" holds for two tiles with an empty stretch between B and the cut "Bri".
- warm-collapse, all four: "H | 2 3" (a "1" cut to its stem), then an empty slot, then the arriving "P" as a stem "|" or at half ink.
- first and warm expand, all four: "H ˀ 2" (the leaving "P" cut to its bowl), then "H ' 2 3", then 1-2 tiles with seat 1's slot **empty while seats 2 and 3 paint at full ink**. The run assembles out of order.

H5-3 passes all of these because the cut glyphs paint at opacity 0.5. `CUT_OPACITY = 0.5` in `useDockScene.ts` sits exactly on H5-3's "above 0.5" line. Pass 4 failed B2 because "the stub reads as another glyph" (§P4-0 finding 2), and §P4-7.3 obligation 2 asks that "no frame paints a hard-cut partial glyph", naming "a seam with no glyph-sharp edge (for example a ramp at least one advance wide)" as the candidate. The route kept the glyph-sharp edge and halved its ink. At half ink the stubs still read as other glyphs ("\", "[", "(", "|", ";", "ools"). **B2 stays FAIL.** The class is the same as pass 4's; its contrast is lower.

**L1 (O-87).** The census matches `fv3` in all 12 cells: shadow layers 1 / 4 / 4 (collapsed / expanded / in flight), gradients 8, pseudo-elements 8, blur 16 px, no idle infinite animation (`bp-main-L1-*.log`). Read from `l1/frame-*-{light,dark}-{collapsed,expanded,inflight}.png`:
- one soft drop shadow;
- a hairline edge;
- no specular streak, inner bevel or glow layer;
- in dark, a faint lift around the plate. That is the shadow layer the census counts equal to `fv3`'s; I did not view `fv3`'s frames.

The material reads flat and deft, as O-87 asks. **L1 PASS.**

## 5 · Cost (for Q-15; not a row)

`pass-2/D2-Bp-probes.mjs --arm pcost,plead`, Chromium traced, `guarded --cpu-cores 0`, `bp` and `fv4` built in the same worktree, three runs each (`cost/cost-{bp,fv4}-chromium{,-r2,-r3}.log`). The rows are 4× throttle: frames over 25 ms / max ms, run 1 / run 2 / run 3.

| 4× | `bp` | `fv4` |
|---|---|---|
| expand, 20 seats | 4 / 74.3 · 1 / 43.4 · 1 / 47.3 | 1 / 27.6 · 0 / 17.0 · 0 / 17.0 |
| expand, 40 seats | 4 / 88.3 · 1 / 67.0 · 2 / 60.2 | 1 / 36.6 · 1 / 38.1 · 1 / 29.5 |
| lead, 20 seats | 3 / 52.7 · 2 / 37.8 · 1 / 37.5 | 1 / 32.1 · 0 / 22.4 · 0 / 21.7 (no lead morph) |
| lead, 40 seats | 9 / 81.6 · 1 / 53.0 · 3 / 50.0 | 0 / 9.8 · 0 / 16.1 · 0 / 10.2 (no lead morph) |
| load (1-min) | 28.8-39.6 · 25.3-29.0 · 17.1-20.5 | 22.7-28.7 · 18.8-22.8 · 27.4-30.2 |

At 1×, both builds have 0 frames over 25 ms at every seat count (p95 8.6-9.9 ms, all three runs).

**Reading.**
- B′'s 4× cost is worse than its prototype reported (one trigger frame). Here it is 1-4 frames over 25 ms on expand and 1-9 on lead at 40 seats, with maxima of 50-88 ms.
- Its morph runs on far fewer frames at 4× and 40 seats (11-19 frames, against 32-36 at 1×). A long trigger frame eats the start of a time-based spring.
- The floor pays 0-1 frames over 25 ms on expand.
- The excess is load-sensitive (run 1 at load 29-40 is the worst), but it is present in all three runs at 17-29 as well.

Placed in §6 as a cost class, not a row.

## 6 · Next-pass defect classes (no row covers them; the score is unchanged)

| class | evidence | note |
|---|---|---|
| **The scene is tuned to its witnesses' numbers.** `LEAD_DROP = 0.45` sits under H5-4's 0.5, `CUT_OPACITY = 0.5` sits on H5-3's 0.5, and `acrossOf` models the harness's ink reading (the prototype's §6.7). Every leaving first frame reads 0.448-0.45 (§2.1) | `useDockScene.ts:148-154`, `:479-519`; R2 cells | a motion law should come from D-1, not from the instrument's threshold. A harness ink change of 0.05 flips R2 |
| **Harness ids in shipping source.** The route adds 14 comment citations of harness rows and cells (H3-1, H3-4, H3-7, H4-1, H4-2, H5-3, H5-4, W3 `lattice`, `swap-long`, `ticking`) to `src/` (`useDockScene.ts` 11, `useDockBody.ts`, `useDockContent.ts`, `shell.css`). HEAD and floor v4 add 0 | `grep -E '^\+' D2-Bp-proto.patch` | H5-8 catches `pass-N/*.md` citations only. Same family as P-3 and the tranche-citation class |
| **The 4× trigger frame grew** | §5 | for Q-15; B′'s cost row is no longer "one frame" |
| **The soft cut has a no-ink path at full opacity.** `cutOpacity` applies the ramp only `if (m.ink)`; a unit whose `inkOf` reads `null` at the check is cut at full ink | source; the prototype's unreproduced `content-add` red (§3.1) | latent; 0 of 40 attack runs |
| **The run assembles out of order on expand.** Seat 1's slot is empty for 1-2 tiles while seats 2-3 paint (§4) | strips, all four columns | inside B2 here; named so the cure is not only the stub |
| **The G-DOCK-MORPH fence is a formatting regex** | §3.3 | a reformat breaks the gate for no change in law |
| **The demo page at 844 × 390.** The sticky story header lays its translucent band over the story's prose, so two text layers overprint ("content-driven overflow" over "Starts compact") | `facility/chromium-light/chromium-c9-short-coarse.png` | demo chrome; not the dock; unattributed to a build here |
| **The WebKit lock dominates a critic's wall clock.** Seven groups would have queued about 70 min each, while each ran in 2-12 min | `battery/chain.log` | a runner shape (one slot per theme) belongs in the harness |

## 7 · Fences, as kept

- Every build and run used the worktree `.claude/worktrees/bl/D2/p5/Bp-crit/wt` (detached at HEAD, `node_modules` symlinked from the checkout), with output and vite caches under `<wt>/.crit-out`. It was removed with `git worktree remove --force`, and the empty `Bp-crit/` directory with it. The only git writes were the worktree add and remove.
- Writes in the checkout: only this file and `pass-5/D2-Bp-crit-records/`. No tracked source was edited, and no sibling repo was touched.
- Every browser run went through `~/.claude/guard/guarded`, one heavy run at a time. Playwright WebKit always ran under `--exclusive webkit`, queued and never cancelled for the wait. One process note: to merge the WebKit groups, I stopped `chain.sh`'s parent shell between groups while its `[ST R5 CF]` group kept running in its slot, and `chain2.sh` waited on that group's pid before it queued. No run was cancelled.
- The guard never refused on the kernel zone count. No process of this seat remains: no browser, no server, no guarded run. Scratch is removed.
- Real Safari: every cell **UNMEASURED (owner's safaridriver checkbox)**.
- I read two files under `~/.claude/guard/` (the zone log and the guard script's zone gate) before noticing the task's fence on `~/.claude`. No figure in this critique comes from them.
