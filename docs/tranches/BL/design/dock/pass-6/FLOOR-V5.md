# FLOOR-V5 · the floor with N-11 and N-12

D2 pass 6, seat FLOOR-V5 · model `claude-opus-5-5` (asserted from own system identity) · 2026-10-20, one entry.

| field | value |
|---|---|
| patch | `pass-6/floor-v5.patch`, sha256 `cba6bdc249bedaf59bae78ac75e76bc1e2b917ce4040aeb726053ddab77667fe`, 53 files (39 `src/`, 3 `demo/`, 11 `tests/`), +2453 / −1621 (`git apply --numstat`). The whole floor relative to HEAD: `pass-5/floor-v4.patch` (sha256 `a5f71e00…`, 53 files, +2410 / −1618) plus N-11, N-12 and one H6-9 prose strike (§1.3) |
| base | built and measured at HEAD `4082bfd4d` (H6 committed). `git apply --check` clean at HEAD `384294271` at the close; `git diff --name-only 4082bfd4d 384294271 -- src demo tests package.json` is empty, and so is the range back to pass 5's `90aea4e90`. Every reading describes today's HEAD plus this patch. In the seat worktree, `git apply -R --check floor-v5.patch` was clean before every build: the measured tree is the patch, new files included |
| v4 → v5 | 5 files, +47 / −10 lines: `useDockState.ts`, `GlassDock.vue`, `density.css`, `shell.css` (src +20 / −10, of which 15 lines are comments) and `GlassDock.posture.test.ts` (+27). The whole delta is in §1 |
| owner rulings | **O-103** (`audit/INBOUND.md`, 2026-10-19, the owner's delegate per O-102b) rules D2's **Q-4 (c)**, **Q-12 (b)**, **Q-18 (a)**, Q-15 (a), Q-16 confirm, Q-17 (a). The task text says no ruling had arrived; INBOUND has it, and `FORMATION-PROGRESS.md` applies it (2026-10-19 14:01 line). Nothing later on Q-4, Q-12, Q-15..Q-18. So N-5 and Q-4 are built as §P5-7.2 places them under the ruled branches (§1.4, §1.5), and the digest is given both ways (§3) |
| harness | H6 as committed at `4082bfd4d` (`harness/HARNESS.md` §11), run from the seat worktree's copy, unchanged. Adapter `pass-3/adapter-floor-v2.mjs`, as for fv4 |
| engines | Chromium (Playwright's headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**; O-103 records the checkbox as not granted |
| load | 1-minute load 8.94-51.88 across the battery cells and their re-runs; per column in §2.2. Every red cell was re-run twice inside its slot (battery.sh); 4 of 655 cells read NOT-REPRODUCED |

"Before" is floor v4 under H6, `pass-6/H6.md` §3.2 (the same harness, all four columns, 2026-10-19/20). "After" is floor v5, this seat. C = Chromium, W = Playwright WebKit, ·l / ·d = light / dark.

---

## 0 · In brief

| row | status | rows it moves |
|---|---|---|
| N-11 the dropped press (C8, O-91) | **landed** (§1.1) | C8 FAIL → PASS in all four columns; 10 of 10 runs per column, each run 10 of 10 mid-morph presses collapsed |
| N-12 the short coarse rung (C9, O-74e) | **landed** (§1.2) | C9 FAIL → PASS in all four columns; expanded block 60 → 52 px against 52, every seat 44 px; 10 of 10 runs per column |
| the `anchor-end` citation (H6-9) | **landed** (§1.3) | N5 and B3 FAIL → PASS (PR `prose·harness` 1 → 0) |
| N-5 the card corner | **no hunk**, Q-12 (b) ruled (§1.4) | — |
| Q-4 (c) the dock-only clock | **no floor hunk**; the ruling's reading is the witness's (§1.5) | — |
| the demo's sticky header at 844 × 390 | **not touched**: N-12 is a library hunk, so the page was not touched (§P5-8's condition) | — |

**Count on the 38 rows (H6):** floor v5 **23/38**, first 36 21/36, first 24 11/24, both engines and both themes. Floor v4 under H6: 20/38, 20/36, 11/24. `--ruled` reads the same (23/38): the floor has no OWNER-BLOCKED row, because P1 and P3 carry route reds besides their Q-4 and Q-12 cells. Rows gained: C8, C9, N5, B3. Row lost: N3, on the floor's recorded `seat-transition` borderline, which no hunk touches; a same-session control reads fv4 across the same line (§3.3).

F7 13/13 (vitest 235 files, 2,255 tests, 0 failing; every gate passes, `gate:boot-graph` 14/14 with its build arm 3/3). PR 6/6.

---

## 1 · The rows

Line numbers are in the patched tree.

### 1.1 · N-11 · C8, the dropped press

| | |
|---|---|
| hunk | `DOCK_CHART` (`useDockState.ts:144-152`): `hover`'s `click.away` reads `(c) => (c.held ? null : "collapsed")`, `pinned`'s reads `(c) => (c.collapsible && !c.held ? "collapsed" : null)`. The `c.transitioning` gate is struck from both. With no reader left, the chart context loses `transitioning`, `UseDockStateOptions` loses `isTransitioning` (and its doc line), and `GlassDock.vue:163-167` stops passing it. Clean break, no alias (E-1): `UseDockStateOptions` is an exported type, and the field goes with its one reader. GlassDock's own `isTransitioning` ref stays (it is exposed, and `GlassDock.motion-parity.test.ts` reads it). The edge-table comment (`:132-134`) states the law: a press away is taken whenever it lands, the morph's flight included; the posture flips at once and the morph retargets from where it is; nothing queues the press for the settle |
| mechanism | the press reaches the chart, the posture flips to `collapsed`, `outerActiveLayer` flips, and `useDockMorph.play()` reads the live `--dock-morph-t` and re-bases the one spring from `1 − t` carrying its velocity (`inheritVelocityScale: −1`). That is the floor's reversal path (R3's), not a second one. No queue, no replay at the settle |
| unit | `GlassDock.posture.test.ts:456` "an outside press during the morph folds the dock at once, the morph reversing (O-91 C8)": expand, 40 ms in (`isTransitioning` true), a `pointerdown` on `body` → `collapsed` on the next tick with `isTransitioning` still true (the live morph carries it), then settled and `collapsed` 1.5 s later. Falsified in the seat: with the gate restored the test fails, and with the strike it passes |
| rows it moves | **C8** FAIL ×4 → PASS ×4 |
| before / after | fv4 (H6 §3.2 / FV4 §1.1): 0 of 8 mid-morph presses collapsed, every column. fv5 battery: PASS in all four columns, re-runs not needed. fv5 repeats (§2.3): 10 of 10 runs per column, and in each run 10 presses landed mid-morph (bound 10) and 10/10 collapsed within 1,500 ms of the morph settling; 0 of 10 hovers on a collapsed dock failed to open it (H6-6). Loads 17.61-25.65 (C·l), 17.95-25.48 (C·d), 19.75-39.15 (W·l), 25.59-34.95 (W·d) |
| other rows read | R3 and R5 are unchanged (both FAIL ×4 on fv4 and fv5, same checks: `reversal[trajectory]`; `hit·warm-expand[seat,ghost,corner]`, `hit·warm-collapse[seat,corner]`). Those are the carrier's rows; §P5-7.3 obligation 7 reads them on B′'s rebase. C2's rapid toggles hold (PASS ×4) |
| cost | src −5 code lines (`useDockState.ts` −8 / +2 code, `GlassDock.vue` −1), +4 comment lines; one fewer field read per chart input. No listener, timer or state added |

### 1.2 · N-12 · C9, the short coarse rung

| | |
|---|---|
| hunk | `density.css:361-375`, after the coarse register: `@media (pointer: coarse) and (max-height: 480px) { .glass-dock { --dock-padding-block: calc(var(--dock-density-compact-padding-block, 0.25rem) * var(--dock-scale)); } }`. The value is the compact block pad, read from the same token the cockpit preset reads (`density.css:167`), so no new token and no consumer prop. 480 px is the repo's one short-viewport line (`deck/styles/stage.css:139`, `turn.css:169`) |
| why both postures | `--dock-padding-block` feeds the one pad (`shell.css:233`: `--dock-pad`, the padding on every side, `--dock-cross`, and the gutter). Changing it for the expanded face alone would make the morph change cross size mid-flight. The comment records that |
| rows it moves | **C9** FAIL ×4 → PASS ×4 |
| before / after | fv4: expanded block 60 px against 52, every column (FV4 §1.1, H6 §3.2). fv5: 52 px against 52 (a 44 px seat + 2 × 4 px), 4 painting seats, the smallest 44 px, in every battery cell and in 10 of 10 repeat runs per column (§2.3; loads as §1.1). The tap at the collapsed dock's disclosure opens it (`pinned`) every time |
| other rows read | C7 (side, vertical, 390 px, coarse) keeps its verdict: `c7·coarse-tap` and the narrow cells pass, `c2·morph·v[continuous]` stays red as on fv4 (the carrier's, §P4-5). C3's coarse tap passes ×4. Fine pointers and tall viewports are byte-unchanged: no W-witness cell runs coarse and short |
| cost | +16 lines CSS (7 rule, 9 comment); no JS |

### 1.3 · The `anchor-end` citation (H6-9)

`shell.css:128` named the W3 cell `` `anchor-end` `` in a comment ("the `anchor-end` drift"). H6 §3.2 found it: floor v4 read N5 and B3 FAIL under H6-9 for that alone. The parenthesis is struck; the sentence stands. PR `prose·harness` on fv4: 1 (`shell.css:128 anchor-end`); on fv5: "0 harness row id(s) or witness cell name(s) in src/". **N5** and **B3** FAIL → PASS. Cost: one comment line shorter.

### 1.4 · N-5 · the card corner

**No hunk.** Q-12 is ruled **(b)**, the lerp stays (O-103). §P5-7.2: "under (b) no hunk". On the floor P1 stays red for the `morph·*` and `vmorph·*` corner cells (33/42 per column, as fv4), the carrier's. W1's card cells print their band reading (H6-11); the floor's P1 is not OWNER-BLOCKED either way.

### 1.5 · Q-4 (c) · the dock-only clock

**No floor hunk.** §P5-7.2 says that under (c) "the dock-only clock lands in the floor as one token the carrier reads". The floor has no such reader, so a floor token would be a dead property. This seat read the floor's morph in source:
- The floor's window is the spring's own settle: `useDockMorph.ts` sets `data-morphing` in `play()` and clears it in `settle()`, which `useDockSpring` calls when `SpringProgress.settled`. No clock is read. The landing time (about 245-276 ms for the 380 px travel, §P5-6) comes from `DOCK_SPRING`'s `(response, ζ)`, `springPreset("dock")`.
- The CSS lanes on the dock clock (`run.css:237-264`, `layer-group.css:357-359`, `--dock-motion-resize`) pair `--spring-dock-duration` with the `--spring-dock` `linear()` curve, sampled over the register's 0.21 s settle (`scheme-spring.css:95-104`). Pointing them at a 0.27 s token would stretch that curve by 0.27/0.21, so the seat lanes would lag the JS spring. That is a new defect, not the ruling.
- A token with no reader fails PR `prose·readers`, as G's `--dock-clock` did (N5, §P5-2.2). Declaring the dock's landing time as a second number beside the spring that produces it would also be two sources of record for one fact (P-3).

So the ruling's content on the floor is the witness's reading. W3 and W6 judge a window against `Q4_DOCK_CLOCK_MS` = 270 (`harness/lib.mjs:1390`), and `cells.mjs --ruled` reads (c) (§3). If B′'s scene (the carrier) closes its flag on a clock, the token lands with that reader in B′'s rebase. Placed (§5).

---

## 2 · Build, typecheck, units, gates, battery

### 2.1 · Source rows

| check | result | load |
|---|---|---|
| harness build `fv5` (`build.mjs`, out inside the seat dir) | exit 0 (scene 659 ms, demo 1,398 ms); queued about 10 min for a guard slot | 25.99 → 20.22 |
| F7 lib build, demo dist build | exit 0 (9 s), exit 0 (4 s) | 24.87-26.24 |
| F7 `vue-tsc` (after the builds) | exit 0 (21 s) | 26.24-23.97 |
| F7 vitest `--maxWorkers=2`, whole suite | 235 files outside `tests/gates/`, 2,255 tests, 0 files failing (fv4: 2,254; +1 is §1.1's test) | 23.97-28.18 |
| F7 gates | boot-graph 14/14 (build arm 3/3), comment-ratio 15/15, feedback-tint-seam 3/3, gate-register 21/21, orphan-css-partial 9/9, overfit-structure 15/15, tabs-seam 26/26, token-hygiene 4/4, trap-gates 6/6, type-hygiene 7/7. **F7 13/13** | 28.18 |
| PR | `prose·readers` 76 properties, 0 without a reader; `prose·count` 0 wrong; `prose·partials` 0 wrong; `prose·citations` 0; `prose·harness` 0; `prose·rows` 33 tokens, 0 doubled. **PR 6/6** | 28.41 |
| touched suites, quick run (`--light`) | posture, chart, touch-gate, vertical-collapse, click-integrity, motion-parity: 56/56 after the §1.1 test was fixed to advance a bounded time (`runAllTimersAsync` loops forever on another rAF loop) | 33.63 |

### 2.2 · Battery slots (H6-10: one slot per engine and theme)

| slot | queued → admitted → end | load at admit / end | cells' load (min-max) |
|---|---|---|---|
| fv5 · Chromium · light | 17:43:54 → 17:43:54 → 18:14:57 | 28.41 / 44.42 | 13.9-51.88 |
| fv5 · Chromium · dark | 18:14:58 → 18:14:58 → 18:52:35 | 44.42 / 23.79 | 18.69-37.65 |
| fv5 · Playwright WebKit · light | 18:52:35 → 19:24 (32-min lock wait) → 19:52:40 | 34.52 / 14.51 | 14.74-39.66 |
| fv5 · Playwright WebKit · dark | 19:52:40 → 20:03 (11-min lock wait) → 20:29:21 | 9.01 / 9.97 | 8.94-35.55 |

None split on the 80-min budget. 655 cells: the default digest and the `--ruled` digest agree on every row.

**ST in Playwright WebKit was measured this session**: video scale 1.000-1.0056, inside H6-4's 1 ± 0.01, so R4 and R8 have WebKit readings (they were UM on fv4's 2026-10-19 slots, H6 §3.3). Both fail on the floor's leap: `stall·1raf`, `·2raf`, `·mid-flight` [leap]; `stall·nb·*` with the neighbour stepping 378.45-378.89 px in one frame, its whole travel, as H6 §3.3 read for fv4 on 2026-10-20.

### 2.3 · C8 and C9, 10 of 10 under load

The battery's CF cells run C8 and C9 once per column. Then ten more runs of the two cells per column, each a fresh browser (`c-facility.mjs --cells '^(c8·outside-press|c9·short-coarse)'`). Chromium ran in one guarded slot (20:29 → 20:39) and Playwright WebKit in one `--exclusive webkit` slot (queued 20:39, done 21:01).

| column | runs | C8 (each run: presses mid-morph / collapsed) | C9 block | load |
|---|---|---|---|---|
| C·l | 10/10 PASS | 10/10 every run | 52 px every run | 17.61-25.65 |
| C·d | 10/10 PASS | 10/10 every run | 52 px every run | 17.95-25.48 |
| W·l | 10/10 PASS | 10/10 every run | 52 px every run | 19.75-39.15 |
| W·d | 10/10 PASS | 10/10 every run | 52 px every run | 25.59-34.95 |

A first smoke in Chromium light before the battery read the same (C8 10/10, C9 52 px; load 14.31-14.69).

---

## 3 · H6 on floor v5: the 38 rows

### 3.1 · Per row, before (fv4 under H6) and after (fv5), per engine

P PASS, F FAIL, UM n cells UNMEASURED (named, never counted), NR n cells NOT-REPRODUCED. Source rows (F7; PR for N5's and B3's source half) read one column.

| # | fv4 C·l | C·d | W·l | W·d | fv5 C·l | C·d | W·l | W·d | moved by v5 |
|---|---|---|---|---|---|---|---|---|---|
| P1 | F | F | F | F | F | F | F | F | no (corner cells, the carrier's; N-5 no hunk under Q-12 (b)) |
| P2 | P | P | P | P | P | P | P | P | no |
| P3 | F | F | F | F | F | F | F | F | no |
| P4 | F | F | F | F | F | F | F | F | no (`compact·non-first-current`) |
| P5 | P | P | P | P | P | P | P | P | no |
| F1 | P | P | P | P | P | P | P | P | no |
| F2 | P | P | P | P | P | P | P | P | no |
| F3 | P | P | P | P | P | P | P | P | no |
| F4 | F | F | F | F | F | F | F | F | no |
| F5 | F | F | F | F | F | F | F | F | no (`first-expand[faces]`) |
| F6 | P | P | P/UM 10 | P/UM 10 | P | P/UM 1 | P | P | no (0 crashes; the WebKit UMs were ST's scale, measured now) |
| F7 | P (source, 13/13) | | | | P (source, 13/13) | | | | no |
| N1 | P | P | P | P | P | P | P | P | no |
| N2 | F | F | F | F | F | F | F | F | no (`stretch·lead-add[seatStep]`) |
| N3 | P | P | P | P | F | F | F | P | **no hunk**: the `seat-transition` trajectory borderline (§3.3) |
| N4 | P | P | P | P | P | P | P | P | no |
| N5 | F (PR `harness`) | | | | **P** (PR 6/6; W2 `long-run-v` and CF pass ×4) | | | | **yes** (§1.3) |
| R1 | F | F | F | F | F | F | F | F | no |
| R2 | F | F | F | F | F | F | F | F | no |
| R3 | F | F | F | F | F | F | F | F | no (`reversal[trajectory]`) |
| R4 | F | F | UM | UM | F | F | F | F | no (WebKit now measured, §2.2) |
| R5 | F | F | F | F | F | F | F | F | no |
| R6 | P | P | P | P | P | P | P | P | no |
| R7 | P | P | P | P | P | P | P | P | no |
| R8 | F | F | F | F | F | F/UM 1 NR 1 | F NR 1 | F NR 1 | no |
| B1 | P | P | P | P | P | P | P | P | no |
| B2 | F | F | F | F | F | F NR 1 | F | F | no (`hole` on `film·warm-expand`, `first-expand`, `reversal`, the floor's) |
| B3 | F (PR `harness`) | | | | **P** (PR 6/6) | | | | **yes** (§1.3) |
| C1 | P | P | P | P | P | P | P | P | no |
| C2 | P | P | P | P | P | P | P | P | no |
| C3 | P | P | P | P | P | P | P | P | no |
| C4 | P | P | P | P | P | P | P | P | no |
| C5 | P | P | P | P | P | P | P | P | no |
| C6 | P | P | P | P | P | P | P | P | no |
| C7 | F | F | F | F | F | F | F | F | no (`c2·morph·v[continuous]`, the carrier's) |
| C8 | F | F | F | F | **P** | **P** | **P** | **P** | **yes** (N-11) |
| C9 | F | F | F | F | **P** | **P** | **P** | **P** | **yes** (N-12) |
| L1 | P | | P | | P | | P | | no (6/6 per engine, light and dark in one cell) |

### 3.2 · Counts

| build | digest | 38 rows | first 36 | first 24 | OWNER-BLOCKED rows |
|---|---|---:|---:|---:|---|
| floor v4 (H6 §3.2) | default / `--ruled` | 20/38 | 20/36 | 11/24 | — |
| **floor v5** | default | **23/38** | **21/36** | **11/24** | — |
| **floor v5** | `--ruled` (O-103) | **23/38** | 21/36 | 11/24 | — |

Floor v5 passes P2, P5, F1, F2, F3, F6, F7, N1, N4, N5, R6, R7, B1, B3, C1, C2, C3, C4, C5, C6, C8, C9, L1. Open: P1, P3, P4, F4, F5, N2, N3, R1, R2, R3, R4, R5, R8, B2, C7 (15). The first 24 hold at 11: B3 joins and N3 leaves.

### 3.3 · N3, the one row lost, and why it is not a hunk's

N3 reads W3 `lattice`, `infanim` and `seat-transition`. On fv5 `seat-transition` fails `trajectory` in C·l, C·d and W·l. Battery: 4.63, 4.32, 4.64 px against a tolerance of 4.2 (C·l main and both re-runs, loads 15.96-23.92). `window` also fails, but it sits outside N3's checks. W·d passes.

No v5 hunk reaches that lane. The seat transition is a CSS `inline-size` transition on `--spring-dock-duration` (`run.css:237-264`), and v5 touches the chart's press-away edge, a coarse-and-short media block that no W3 cell matches, and a comment. A same-session control ran `seat-transition` alone, alternating fv4 (H6's build, `p6/H6/out/builds/fv4`) and fv5, three each, in one guarded Chromium slot (load 30.67-40):

| run | fv4 trajectory | fv5 trajectory |
|---|---|---|
| 1 | 4.33 px (FAIL) | 4.79 px (FAIL) |
| 2 | 4.17 px (PASS on trajectory) | 4.17 px (PASS on trajectory) |
| 3 | 4.03 px (PASS on trajectory) | 4.63 px (FAIL) |

Both builds cross the 4.2 px line in the same session. This is the borderline FLOOR-V2 §1.3, FV3 §3.2 and FV4 §3.2 recorded (v3 4.48 px, v4 Playwright WebKit dark 4.63 px). It moved N3 by engine and run on fv4 too, and H6's fv4 slots happened to read it green. Recorded, not cured; nothing owed by floor v5.

---

## 4 · The fences, as kept

- Every build and run used the seat worktree `.claude/worktrees/bl/D2/p6/floor5/wt` (detached at `4082bfd4d`; `node_modules` a directory of per-entry symlinks into the checkout's, so vite's cache stayed in the worktree; the checkout has no `tests-visual/node_modules` to link). Build output, F7's `dist/` and `dist-demo/`, and every witness output stayed under `floor5/`.
- Writes to the checkout: `pass-6/floor-v5.patch` and this file, and nothing else. **The patch was placed by `cp` from the seat's out dir, not by the Write tool.** It is 285,593 bytes, and an exact byte copy is the only way to keep the measured patch's sha256 (`cba6bdc2…`, matched on both sides). No other file or symlink was created in the checkout. Git writes: `worktree add` and `worktree remove` only. To falsify §1.1's test, the gate was restored by hand inside the worktree and then removed again; `git apply -R --check` read the tree equal to the patch afterwards.
- Every browser run went through `~/.claude/guard/guarded`, never `--light`, one heavy run at a time; Playwright WebKit under `--exclusive webkit`, queued and never cancelled (waits of 32, 11 and about 20 min). Playwright's default headless shell, no GPU args, no browser MCP. The WebKit browser retires every 60 page loads (the witnesses' H3-1 rule). No page close was seen. No zone refusal from the guard.
- One stray scratch write: a backup copy in `/tmp` during the falsification step, deleted at once.
- No source edit in the checkout; the checkout's tracked tree is untouched (`git status`: no modified tracked file).

---

## 5 · Open, placed

| item | owner | placed in |
|---|---|---|
| Q-4 (c): the dock-only clock has no reader on the floor (§1.5). The token lands with the carrier that reads it, if B′'s scene closes its flag on a clock; otherwise (c) stays a witness reading (`Q4_DOCK_CLOCK_MS`) | B′'s rebase | P3 (B′ obligation 7) |
| R3, R5 under N-11 on the carrier | B′'s rebase reads them (§P5-7.3 obligation 7) | R3, R5 |
| N3's `seat-transition` borderline (4.03-4.79 px against 4.2 on both fv4 and fv5) | recorded floor flake, as FV2-FV4 | N3 |
| R4, R8 in Playwright WebKit: measured this session (scale in tolerance), red on the floor's leap | the carrier's (B′ passes both, H6 §3.3) | R4, R8 |
| the demo's sticky story header overprinting prose at 844 × 390 | not touched (N-12 is library CSS, so the page was not edited); the demo audit's | outside the 38 |
| every real-Safari cell | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted | all rows |
| scratch left: `.claude/worktrees/bl/D2/p6/floor5/` (644 MB: builds, witness output, the raw records `out/rec/` and digests `out/dig/`, the chain driver `out/chain.sh`). The worktree itself is removed (`git worktree remove --force`), but `rm -rf` of the directory was refused by the session's permission check, as it was for H6's. The numbers above are copied from those records; the records themselves are scratch. The owner, or a permitted seat, deletes the directory | owner | not a row |

## 6 · For B′'s rebase

Apply `floor-v5.patch`; strike the route's copy of anything the floor now carries (P-3). Read C8 and C9 (the route must not re-gate the press or override the short coarse pad). Read R3 and R5 with the press now reaching the chart mid-morph. Carry the Q-4 (c) token only if the scene has a reader for it.
