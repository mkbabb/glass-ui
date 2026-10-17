# D2-G critique, pass 4: the sliding aperture on floor v3

| | |
|---|---|
| Seat | D2 pass 4, route D2-G (the sliding aperture), CRITIC. I authored nothing in D2 |
| Model | `claude-opus-5-5`, asserted from own system identity |
| Tree | checkout HEAD `fc4ce33f3` + `pass-4/floor-v3.patch` (sha256 `637d1625d7b39b5d…`, matches FLOOR-V3) + `pass-4/D2-G-proto.patch` (sha256 `394260f88b0fcc3f…`, matches the prototype's header). Both applied clean in the worktree `.claude/worktrees/bl/D2/p4/G-crit/wt` (`apply-g.log`), removed after the runs |
| Builds | `fv3` (the G patch reversed) and `g` (re-applied), both by `harness/build.mjs` with output inside the worktree (`build.log`: both exit 0). Lib build and `demo:dist:build` inside the worktree for the gates (`build-lib.log`, `build-demo-dist.log`) |
| Adapter | `pass-3/adapter-G-p3.mjs`, unchanged; `adapter-law.mjs` L-1..L-6 hold (`extra-adapter-law.log`). No shim: every Playwright WebKit cell is unshimmed |
| Engines | headless Chromium and **Playwright WebKit**. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| Runner | `D2-G-crit-records/run.sh` (the prototype's `run.sh`, line 2 only changed) and `chain.sh` (fv3 + g builds; one guarded slot per engine, the WebKit slot under `--exclusive webkit`; stages main, rest, dark, darkrest, extra, faces, darkfaces). Every red cell re-run twice by exact name inside its slot. Digest: `g-cells.mjs` (the prototype's digest, writing here) → `cells-g.json`, `rows-g.md`, `counts-g.md`. The critic's own arms: `probes/crit-prm.mjs`, `probes/crit-corner.mjs`, the prototype's `ctx/ctx-diag.mjs` and B′'s `cases.mjs`, via `attacks/run-attacks.sh` |
| Records | `pass-4/D2-G-crit-records/` (stage logs, each opening and closing with `uptime`, each cell carrying its own 1-minute load; `json/`; `filmstrips/`, `facility/`, `l1/`; `attacks/`; `cost-*.json`; `typecheck.log`, `vitest-dock-gates.log`, `boot-graph.log`) |
| Load | 1-minute load per cell: Chromium light 14.9-22.2, Chromium dark 12.6-21.9, Playwright WebKit light 8.0-13.8, Playwright WebKit dark 9.5-21.3 (`cells-g.json`). Faces stages 8.4-20.9. Attacks 16.4-25.9 |
| Owner rulings | none since pass 3 on Q-4, Q-12, Q-15, Q-16 or Q-17 (`audit/INBOUND.md`, `FORMATION-PROGRESS.md`, read 2026-10-16). Built and scored on the defaults |

## 0 · In brief

**Verdict: ADVANCE. 22 of 36 = 61 %; the first-24 subset is 15 of 24 = 62.5 %.** Not CONVERGED: 14 rows open.

**Arm set beside the score.** The H4 set on `g`, both engines, light and dark, the same set as B′'s critic: W1-W8 and R6; W3 with every H4 check (splice and sliver H4-1, lanes H4-2, neighbour H4-3, `retarget·40/80/120` and `retarget·context` H4-5, paint floor, leaving, vanish), in its `--no-faces` main stage and in its pixel (faces) stage in both themes; ST (five timings plus `stall·nb·*`), FM, R5 (H4-4), CF (H4-10), L1 (H4-11); PR and adapter law; CASES (light); cost (`pcost`, `plead`, `g` and `fv3`). Plus three arms of this seat's, not yet run on B′: `crit-prm` (C2 under reduced motion, past the extent), `crit-corner` (what paints in the collapsed root's box corner), and the forced-GC `ctx-diag` replay. G's four pass-3 arms are inside H4 (swaplag = H4-2, flowblock = H4-3, retarget2 = H4-5, lunec = R5).

**What I reproduced from the prototype:** R8 in Chromium 7/7 ×2 themes and its failure in Playwright WebKit (5/7 ×2, both `stall·nb·2raf` and `stall·nb·mid-flight`, 3/3 runs each); R2's fades (112-234 ms, ≥ 0.42 × the morph); R5 4/4 ×4; R4 10/10 ×2; R1 and R7 green; CF 14/14 ×4 as instrumented; L1's census 6/6; the Chromium `retarget·context` red and its diagnosis (a V8 inspector "Promise was collected", reproduced on floor v3 by a forced GC); the boot graph at 508,427 B against 503,808 B, to the byte; W7 `side·light·dpr1` red in Chromium.

**What I found that the prototype did not report:**
1. **C1: the collapsed form paints as a square tile in Chromium.** At rest the plate is a 102 × 56 box with `border-radius: 0`, no `clip-path`, and the dock's `backdrop-filter` (`crit-corner`, both engines). Chromium paints that backdrop to the square box. In the demo, the corner of the root's box outside the stadium reads (172, 92, 77) on a page of (137, 83, 73) in dark and (252, 187, 175) on (245, 191, 181) in light. Floor v3 and B′ read the page colour there. CF's `c1·shape·h` stays green because it takes the radius as the maximum over the plate, the hit pair and the edge, and the hit pair is rounded. The prototype's own frame (`D2-G-proto-records/facility/chromium-dark/chromium-c1-h-collapsed.png`) shows the same square. Playwright WebKit clips it and does not show it.
2. **R6 is red in Playwright WebKit light.** `swap-short` paints a sliver in the first run and in re-run 2 (8.86 px and 4.98 px of a 40 px unit; one advance 10.86 px; load 18.6-20.3). The prototype read it as NOT-REPRODUCED. Here it reproduced.
3. **C2 under reduced motion is not instant past the extent.** The extent lands in 0 frames, as CF reads it. But every seat reaches its final opacity only after 86-96 ms (9-13 frames with a seat between 0.05 and 0.95), and `data-morphing` stays up 198-207 ms, in both engines, 3/3 runs each. Floor v3 is instant on all three measures (0 ms, 0 partial frames, the flag never raised). The demo's own prose says so: "the extent lands at once and the content exchange keeps its curve" (`demo/stories/dock/overview.vue`).
4. **B3: four false facts in route-written prose** (§2, B3).
5. **P4/F4 are red in Playwright WebKit light.** `compact·non-first-current`: seat step ×1.07, then ×1.04 (0.58 px against 0.54-0.56), in 2 of 3 runs. This is borderline, and floor v3 is red on the same cell.

## 1 · What this seat ran

| Run | Logs (`D2-G-crit-records/`) | Load (1-min) | Result |
|---|---|---|---|
| builds `fv3`, `g` | `build.log` | 17.6 | both exit 0 |
| Chromium: main, rest, dark, darkrest, extra, faces, darkfaces | `*-chromium*.log`, `stage-*-chromium.txt` | 12.6-22.2 | §2; 22:47-23:11 |
| Playwright WebKit: the same stages | `*-webkit*.log` | 8.0-21.3 | §2; 23:11-23:38 |
| digest | `cells-g.json`, `rows-g.md`, `counts-g.md` | — | 631 cells from main/rest/dark (the faces stages read from their logs, §2); 2 NOT-REPRODUCED |
| `vue-tsc --noEmit -p tsconfig.json` | `typecheck.log` | 16.6-19.5 | exit 0 |
| vitest `--maxWorkers=2`: `tests/components/custom/dock`, `tests/styles`, `tests/gates`, `tests/design` | `vitest-dock-gates.log` | 14.6-17.4 | 58 files; 742 pass, 7 expected fail, 3 fail, all in `gate:boot-graph` (two need the dist-demo build) |
| `gate:boot-graph` after `demo:dist:build` | `boot-graph.log` | 17.4 | 13/14; **62 modulepreloads + 1 entry = 63 files / 508,427 B, ceiling 503,808 B** |
| PR, adapter law | `extra-PR.log` (exit 1), `extra-adapter-law.log` (exit 0) | 13.5 | `count` PASS (7, 0 wrong), `rows` PASS (32, 0 duplicated), `readers` FAIL on `--dock-clock` (72 properties) |
| cost, `g` and `fv3`, both engines | `extra-cost-*.log`, `cost-*.json` | 10.6-19.3 | §5 |
| attacks, Chromium (one guarded slot) | `attacks/{corner,prm}-{g,fv3}-chromium.*`, `attacks/ctx-{g,fv3}-gc.*` | 16.4-22.6 | §3 |
| attacks, Playwright WebKit (`--exclusive webkit`; queued 23:41-00:20 for the lock) | `attacks/{corner,prm}-{g,fv3}-webkit.*`, `attacks/cases-rotated-with-control-webkit-{1,2}.log` | 19.3-25.9 | §3 |

## 2 · The checklist (REGISTRY §P3-7.5, fixed, 36 rows)

C = Chromium, W = Playwright WebKit, ×4 = both engines × both themes. A row passes only when every engine and theme it was read in passes on my runs. A red seen in a first run that passed both re-runs is NOT-REPRODUCED. OB is OWNER-BLOCKED and stays open.

| # | Row | Verdict | Evidence (this seat's records) | Counterexample when open |
|---|---|---|---|---|
| **P1** | the five problems: W1 corner, W7 | **FAIL** (route) + OB (Q-12) | W1 19/22 + 3 OB ×4 (`card·first-expand`, `card·warm-expand`, `card·warm-collapse`). W7 W 20/20 ×2 | W7 `side·light·dpr1[whole]`, C light and C dark, 3/3 runs each: "edge median 6/255, weakest bin 1/255 at 45° (bound ≥ max(0.25 × median, 2/255))", load 13.0-20.3. Floor v3 reads 20/20 under the same witness in the same engine (`rows-g.md`, the fv3 rows); so does B′ (B′-crit N4). The prototype calls it the instrument's step size. The instrument passes the floor and B′, and G's door clip and cap border halve the stroke at the 45° bins (G-proto §7), so it is G's paint |
| **P2** | W2 | **FAIL (shared)** | 7/8 ×4 | `route1·long-run-v[keyboard]` 10/11, Seat 1 missing, 3/3 runs ×4: FLOOR-V3 §1.3's witness defect, unamended in H4 |
| **P3** | W3 every check, W6, W8 | **FAIL** | W6 4/4 ×4; W8 6/6 ×4 (3 consumer cells UM); W3 main (`--no-faces`) 18/33 + 2 OB + 12 UM ×4, plus `retarget·context` (B1); W3 faces C light and dark: every red other than OB `window` is `retarget·context` | **Route, reproduced:** W light faces `swap-short[splice]`: a sliver frame in run 1 (8.86 px of a 40 px unit at 51 ms, load 18.55) and re-run 2 (4.98 px at 53 ms, load 20.34); re-run 1 clean. W light `reversal[splice]` once (5.45 px of a 95 px box, load 19.85), and both re-runs OB on window only: NOT-REPRODUCED. **OB, Q-4:** `reversal`, `stretch·lead-add`, `anchor-end·warm-*`, C dark `warm-collapse`: every one is `window` only and holds the lenient reading (e.g. `warm-collapse` 257.7 against 257.5, lenient 313.3) |
| **P4** | W4 | **FAIL** | C 13/13 ×2; W dark 13/13 (one NOT-REPRODUCED) | W light `compact·non-first-current`: "worst seat step ×1.07 (0.58 px vs 0.54)", re-run 1 PASS ×0.57, re-run 2 FAIL ×1.04 (0.58 vs 0.56); load 9.4-10.4. A sub-pixel borderline; floor v3 is red on the same cell (`rows-g.md`) |
| **P5** | W5, R6 probe | PASS | W5 6/6 ×4; R6 probe 2/2 ×4 | — |
| **F1** | W1 rests, W2 | PASS | 17/17 ×4 | — |
| **F2** | W5 | PASS | 6/6 ×4 | — |
| **F3** | W4 coarse, hover gate | PASS | 4/4 ×4 | — |
| **F4** | W4 compact | **FAIL** | C 8/8 ×2, W dark 8/8 | as P4 |
| **F5** | W3 `first-expand` | PASS | faces stages 1/1 ×4 (step ×0.65-0.78) | — |
| **F6** | crash-free | PASS | 0 crashed cells: C 160/160 light, 148/148 dark; W 160/160, 148/148 | — |
| **F7** | `g-dock-lattice` invariants (units, `vue-tsc`) | PASS | `vue-tsc` exit 0; dock, styles, design suites green (the only red file is `gate:boot-graph`, §5) | — |
| **N1** | W3 `anchor-end` | PASS | 2/2 ×4, anchored-edge drift in bound; faces `anchor-end·*` OB on window only | — |
| **N2** | W3 `stretch·lead-add` | PASS | 1/1 ×4 (window OB, P3) | — |
| **N3** | lattice, infanim, seat-transition | PASS | 3/3 ×4 | — |
| **N4** | W7 | **FAIL** | W 20/20 ×2 | as P1: C `side·light·dpr1`, 6/6 runs red |
| **R1** | continuity, seats, paint floor | PASS | 30/30 ×4; blank 0 in every cell | — |
| **R2** | leaving (compaction, removal, swap, retarget) | PASS | 8/8 ×4. Faces C dark: `retarget·40` fade 112.6 ms, `·80` 178.6 ms (bound ≥ 87.1), `·120` 233.7 ms (≥ 96.6); worst one-frame vanish 0.14-0.32 (bound 0.5) | — |
| **R3** | reversal hands its velocity on | PASS | trajectory green ×4; window OB (P3) | — |
| **R4** | ST five timings, no leap | PASS | 5/5 ×4 | — |
| **R5** | hit sampler, every rAF | PASS | 4/4 ×4 | — |
| **B1** | every cell under H4, reviewed adapter, same arm set | **FAIL** (cure is the harness's) | adapter law L-1..L-6; arm set = B′-crit's plus three (§0); W `retarget·context` 1/1 ×2 | C `retarget·context`: "evaluate REJECTED (Execution context was destroyed); liveness pings 60/60; main-frame navigations 0", every run: main, faces, darkfaces, dark, each with its two re-runs (12/12). Diagnosis replayed (§3.3): it is V8's inspector collecting the evaluate's promise, not the page. The row still reads red until H4-5's witness holds its promise |
| **B2** | filmstrip gestalt, both engines, against D-1, D-2 | **FAIL** | FM 6/6 ×4 as an instrument; gestalt §4 | false glyphs in exchanges in both engines (§4) |
| **B3** | DockProps count, prose sweep by fact | **FAIL** | PR `count` 7/0, `rows` 32/0 | (1) `src/components/dock/styles/index.css:93` (route-written): "It is the dock's only registered motion scalar." The same file registers `--dock-flow-lo` and `--dock-flow-hi` at `:105-114`, and the carrier animates both (`useDockAperture.ts:1444-1449`). (2) `index.css:91-92`: "under a main-thread stall the ink and the card corner hold while the geometry keeps moving". On the flow clock (every in-flow dock with a neighbour) the geometry holds with them. (3) `useDockAperture.ts:1259-1262` and `:61-62`: "WebKit [composites] none with a `steps()` keyframe, so the whole effect runs on the main thread … A block then stops glass and flow together". The route's own ST reading contradicts it, and so does mine: in Playwright WebKit `stall·nb·mid-flight` the glass travels 89.4-116.8 px during the block (`main-ST-webkit*.log`). (4) `index.css:36` "The six partials", in the file whose partial list the route rewrote; it `@import`s 14. This is the standard B′-crit B3(2) applied |
| **N5** | floor v3 N-6..N-8 under the route | **FAIL** | PR `count` PASS | PR `readers`: `--dock-clock` written, never read (N-7's "nothing published without a reader"); W2 `long-run-v` 0/1 ×4 (shared witness defect) |
| **R6** | no splice, no sliver | **FAIL** | splice 0 everywhere; sliver 0 in C ×2 and W dark | W light faces `swap-short`, 2 of 3 runs (P3) |
| **R7** | window flag covers every lane | PASS | `lanes` 33/33 ×4, and in every faces cell | — (a related residue sits outside H4-2, §6.3) |
| **R8** | glass and flow on one clock | **FAIL** | C 7/7 ×2 (plate inside its box, neighbour steps ×0.58-0.80) | W `stall·nb·2raf`, 3/3 runs ×2 themes: the neighbour steps 379.26-379.29 px in one frame against 192.5 (×1.97), and the plate leaves its rest at the block-end marker and lands in that same frame (it travels 0.18-0.3 px before the block ends, load 11.4-13.8). W `stall·nb·mid-flight`, 3/3 ×2: the neighbour steps 257.5-273.5 px (×1.34-1.42) while the glass travels 89.4-116.8 px inside the block. Plate over the neighbour at worst −18.8 px (no overlap) |
| **C1** | collapsed form content-sized, one edge, anchored legible summary; never a bare square tile | **FAIL** | CF `c1·shape·h` 1/1 ×4 as instrumented (102 × 56, R 9999 read off the hit pair) | Chromium, light and dark, 3 readings (CF main frame, CF dark frame, `crit-corner` frame): the plate's backdrop paints the root's 102 × 56 square. Pixel 2 px inside the box corner: dark (172, 92, 77) against a page of (137, 83, 73); light (252, 187, 175) against (245, 191, 181). `crit-corner` reads `div.dock-plate` 102 × 56, `border-radius: 0px`, `clip-path: none`, with the backdrop filter, in both engines. Floor v3 reads r 9999 px with `clip-path: inset(0px)`, and its corner pixel is the page's. Frames: `facility/chromium-dark/chromium-c1-h-collapsed.png`, `attacks/corner-g-chromium-h.png`. The witness is vacuous here: its radius takes the maximum over plate, hit pair and edge (`c-facility.mjs` READ) |
| **C2** | one continuous morph; reduced motion an instant, correct state; rapid toggles | **FAIL** | CF 3/3 ×4 (the extent-only PRM cell green) | Reduced motion, demo `/dock/overview`, 3/3 runs per engine (`attacks/prm-g-*.log`): extent 0 frames; every seat at its final opacity after 88.4-95.6 ms (C) and 86-93 ms (W), with 8-12 frames carrying a seat between 0.05 and 0.95 opacity; `data-morphing` up 198.6-205.3 ms (C) and 200-207 ms (W). Floor v3: 0 ms, 0 partial frames, the flag never raised (`attacks/prm-fv3-*.log`). If the owner reads O-88's "instant" as the extent only, the CF cell decides and C2 closes |
| **C3** | triggers | PASS | 4/4 ×4 | — |
| **C4** | `#persistent` both postures | PASS | 1/1 ×4 | — |
| **C5** | keyboard, focus kept, name and state | PASS | 1/1 ×4 | — |
| **C6** | menus from a collapsed or expanding dock | PASS | 1/1 ×4 | — |
| **C7** | side, vertical, 390 px, coarse | PASS | 4/4 ×4 | — (the vertical plate also rests at r 0 px, `crit-corner`, but no frame of mine shows it: the vertical stage sits on near-black, where the backdrop does not read) |
| **L1** | O-87: no lighting layer added | PASS | 6/6 per engine; shadow, gradient, pseudo counts and blur equal or below floor v3's; frames in `l1/` read by eye (§4) | — (the square backdrop of C1 is material outside its shape, not an added lighting layer; it is scored under C1) |

**Count.** Passing: P5, F1, F2, F3, F5, F6, F7, N1, N2, N3, R1, R2, R3, R4, R5, R7, C3, C4, C5, C6, C7, L1 = **22/36 (61.1 %)**.
- First 24: P5, F1-F3, F5-F7, N1-N3, R1-R5 = **15/24 (62.5 %)**.
- Open (14):
  - P1: route (W7) and OB (Q-12).
  - P2, N5: the shared W2 witness defect; N5 also carries `--dock-clock`.
  - P3: route splice, plus OB windows.
  - P4, F4: the WebKit W4 borderline, shared with floor v3.
  - N4: W7.
  - B1: the harness's H4-5.
  - B2, B3, R6, R8, C1, C2: route.

## 3 · Claims checked against the prototype, and the critic's arms

### 3.1 The prototype's claims

| Prototype claim (D2-G-proto.md) | This seat | Reading |
|---|---|---|
| R8 C 7/7 ×2; W 5/7 ×2, `2raf` and `mid-flight` | the same, 3/3 runs each | holds |
| "WebKit keeps the glass, or part of its lanes, on its own clock" (§3.1) | in `mid-flight` the glass travels 89-117 px inside the block; in `2raf` it travels 0.2-0.3 px, then the plate and the neighbour land in one frame together | holds, and it falsifies the source comment that claims the opposite (B3 (3)) |
| B2: splice 0, slivers NOT-REPRODUCED | W light `swap-short` sliver reproduced (2 of 3) | **not reproduced as green** |
| R2 fades 105-235 ms | 112.6-233.7 ms | holds |
| C1-C7 14/14 ×4 "collapsed 102 × 56, R 9999 (stadium)" | the cells pass; the plate is r 0 and its backdrop paints the square in Chromium | **the stadium is the hit pair's, not the paint's** (C1) |
| C2: "Reduced motion lands in 0 frames" | the extent, yes; the content 86-96 ms and the flag ~200 ms | partial (C2) |
| L1 6/6, no layer added | 6/6 | holds |
| `retarget·context` is a V8 promise GC; floor v3 fails it under a forced GC | replayed: §3.3 | holds |
| W7 `side·light·dpr1` "both readings sit at the floor" | floor v3 and B′ pass the same witness 20/20 | the defect is G's paint, not the instrument's |
| boot graph 508,427 B, ceiling 503,808 B | 508,427 B, 63 files | holds to the byte |
| 4× / 40-seat expand 87.8 ms, 8 frames over 25 ms | 88.9 ms, 6 frames; p95 42.9 ms | holds within run noise |
| P4 13/13 ×2 | W light 12/13, reproduced | not reproduced as green |
| CASES 6/6 | C 6/6 (control `snap` NOT-REPRODUCED); W `case·rotated` red in main, both stage re-runs and my first with-control re-run; green in my second | open; outside the 36 rows (§6.3) |

### 3.2 `crit-corner` and `crit-prm` (both engines, `g` and `fv3`)

`crit-corner` (`attacks/corner-*`): at rest and collapsed, the one backdrop painter in the root is `div.dock-plate`.
- On `g`, in both engines and both variants, it is `r=0px clip=none`, 102 × 56 (h) and 64 × 116 (v).
- On `fv3` it is `r=9999px clip=inset(0px)`.
- The Chromium screenshots paint the square; the Playwright WebKit ones do not.

`crit-prm` (`attacks/prm-*`): the numbers are in C2 above. With motion on, the content exchange on `g` takes 64-103 ms inside a 233-565 ms extent, so reduced motion keeps that exchange's full duration.

### 3.3 The H4-5 diagnosis, replayed (`attacks/ctx-{g,fv3}-gc.log`, Chromium, `--expose-gc`)
- On `g`, the `cell` variant's Playwright-wrapper calls fail with "Protocol error (Runtime.callFunctionOn): Promise was collected". The same call with its promises held by `window` passes.
- On `fv3`, `cell` passes in every form.
- On both builds, `gc-slot` (a forced GC two microtasks after the function returns) fails, and `gc-slot3` and `gc-micro` pass.

The page is intact, and the prototype's reading holds. G's flip allocates into that slot; the floor does not. The cure is H4-5 holding its promise in the page (the prototype's §7), not a route hunk.

## 4 · The gestalt (B2) and the lighting census (L1), read from frames

All frames are this seat's: `filmstrips/{chromium,webkit}-{main,dark}/`, `facility/…`, `l1/`.

**B2: FAIL.** The aperture's extent motion is smooth and weighted (D-1; no visible overshoot, Q-5 default). The content is not. In 1-4 tiles of the exchanges:
- `swap-long`, Chromium light, tiles 2-6:
  - "A" is cut to a "\" stub.
  - "B" is cut to a "3".
  - "C" arrives as a "(".
  - "Tools" reads "Too" for one tile.
- `swap-long`, Playwright WebKit light: "B" is cut to "3", and "Tools" reads "Too" across two tiles.
- `swap-short`, Chromium light:
  - "C" is cut to a ";".
  - "Tools" loses its T.
  - Tile 5 reads "A Ɛ B": the arriving face over a cut leaving B.
- In glass's own demo, at CF `c2_morph_h-expand` step 02, the arriving search glyph and the leaving "•••" paint at one place at the same time (a double exposure), and the square backdrop sits behind the stadium (Chromium).
- `warm-collapse` and `warm-expand` read clean in both engines.

Against D-2, every face swap shows marks that are not the dock's content for about 50-70 ms. These are the B′ critique's "cut glyphs read as false glyphs". G narrows them; it does not remove them.

**L1: PASS.**
- Light frames show a flat material with one edge and one soft drop shadow. Dark frames show the shadow as a faint halo.
- The census equals or undercuts floor v3: shadow 1 / 3 / 4 (collapsed, expanded, in flight) against 1 / 4 / 4; gradient 8, pseudo 8, blur 16 px; no idle animation.
- No gleam, specular band, inner bevel or shimmer appears in any frame.
- The C1 square is the material escaping its shape. It is not a lighting layer, and O-87's "keep the material, its single edge" is read under C1.

## 5 · Cost (for Q-15)

`cost-{g,fv3}-{chromium,webkit}.json`; dtMax ms (frames over 25 ms).

| Case | G | Floor v3 | Load |
|---|---|---|---|
| Chromium 1×, 40 seats, expand | 22.1 (0), p95 15.9 | 9.8 (0) | 10.6-15.5 |
| Chromium 4×, 40, expand | **88.9 (6)**, p95 42.9, 31 morph frames | 16.2 (0), 72 morph frames | 13.5-15.5 |
| Chromium 4×, 20, expand | 38.4 (1) | 22.5 (0) | as above |
| Chromium 4×, 20, lead | 53.3 (3) | 14.8 (0, no lead morph) | as above |
| Chromium 4×, 40, lead | 36.9 (1) | 9.9 (0) | as above |
| Playwright WebKit 1×, 40, expand | 33 (2), p95 21 | 13 (0) | 16.6-19.3 |
| boot graph (dist-demo, `gate:boot-graph`) | 508,427 B / 63 files, **4,619 B over the ceiling** | — (the prototype reads 483,926 B) | 17.4 |

The gate is red on this tree. A route that lands as built turns the repo's suite red.

## 6 · Next-pass defect classes (no row covers them; the score is unchanged)

1. **A shape read that takes the maximum over elements.**
   - CF's `c1·shape·*` takes the radius as the maximum over the plate, the hit pair and the edge, so a square painted plate passes on a round hit pair (C1).
   - L1's census counts values, not where they paint.
   - The class: a paint-bearing element's own shape (radius or clip) and its painted pixels are not gated where its silhouette is judged.
2. **The PRM cell reads the extent only** (`c2·prm`). Content opacity and the window flag under reduced motion have no gate (C2).
3. **A residue after the flag on the unrotated control.** B′'s CASES `case·rotated·control` (host `rotate(0deg)`) reads a one-frame seat move after the window closed of 0.58 px (Chromium main, load 17.0) and 0.51 and 0.57 px (Playwright WebKit, both with-control re-runs, load 20.0-20.8), against 0.5. H4-2 `lanes` stays green on W3. The CASES snap bound sees a sub-pixel residue that the lanes rule does not see.
4. **The faces re-run skips a merged red.** `run.sh reds()` re-runs only lines tagged with an engine. The merged faces line (`W3 (faces merged) … FAIL`, for example `darkfaces-W3F-chromium.log:33`) is never re-run, so its verdict rests on the engine cell. It was OB-window here.
5. **H4-5's witness measures V8's GC slot** (§3.3), not the page. Until it holds its promise, B1 cannot close on any route whose flip allocates.
6. **The boot graph over its ceiling** (§5). It is not a 36-row witness, and it is red in the repo's own gate.
7. **Arm-set asymmetry.** `crit-prm` and `crit-corner` have not run on B′. B′'s critic passed C1 and C2 without them. The agglomerator should run both on B′ before it compares C1 and C2.

## 7 · Fences, as kept

- Writes in the checkout: this file and `D2-G-crit-records/` only. No other file or symlink.
- Git writes: `worktree add` and `worktree remove --force` only. The worktree and the empty `G-crit/` directory are removed.
- Every browser run went through `~/.claude/guard/guarded`, one heavy run at a time. The Playwright WebKit slots took `--exclusive webkit`. Probes close their contexts and browsers in `finally`.
- No sibling repository was read or run. No browser MCP was used.
- Real Safari: **UNMEASURED (owner's safaridriver checkbox)**.
