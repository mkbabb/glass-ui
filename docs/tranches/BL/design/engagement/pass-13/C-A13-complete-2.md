# D5 · pass 13 · C-A13-complete-2: C-A13c's held WebKit list and gates, run to their end

| field | value |
|---|---|
| seat | C-A13-complete-2, wave c3b of the pass-13 completion (REGISTRY §P13c-8.0). A fresh Opus seat: I authored no D5 seat in passes 2-13 and was no critic in passes 3-13 |
| model | `claude-opus-5-5`, asserted from own system identity |
| status | **COMPLETE.** Every stage of `C-A13c/held-wk2.txt` (29 WebKit stages) ran to its end, and so did `gates.sh`. No run was refused. One stage was killed by the guard's 90-minute timeout while still in its load gate, before it measured anything, and it ran in full in the contingency acquisition (§5). Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| base | HEAD `8b70ba0a9`, docs only past the parent's `81c0ec761` (`git diff --stat 81c0ec761 HEAD -- src tests demo` prints nothing). Patches by my `shasum`: P-E13 `ffa64fc4054b…`, P-E12 `028c180777ff…`, P-E11 `20721fc134cb…`, P-E8 `5dc4d9308191…`; `E13/plants.py` `1c0da6d3cd10…`; scene app `9e34ffa5714e` |
| builds | `C-A13c2/builds.sh` is the parent's `builds.sh` with only the record and worktree paths changed (`diff` in §5). All eleven builds were made in one guarded call, 19:15:18-19:15:36, every exit 0. **Every src tree reads back identical to `C-A13c/logs/builds.log`**: a `diff` of the 47 tree, exit and restore lines prints nothing. head `da39a3ee5e6b`, **cand13 `30f51077c3ec`**, cand12 `61f7b80ac552`, cand11 `6317ad295579`, cand8 `92f38f424df2`, plants level `c2695a446247`, child `78b8012b6d4f`, stale `4c718c3e2542`, noown `b53b2aece8d1`, typedom `2a88db2387df`, reachzero `cf805029101d`. Each plant restored to cand13 after its build, and the worktree ended at cand13 |
| harness | `f2cc94e3fa86` (H13-complete's and the parent's) in every stage log's header and footer. No harness byte was changed |
| engines | Playwright WebKit 26.5 (playwright 1.61.1), headless, no GPU arguments, one browser per stage with a fresh context per cell (the harness's), retired at 60 navigations (`NAV_CAP`, H3-1). No stage log prints an engine close. Playwright WebKit is not Safari |
| rulings | `audit/INBOUND.md` re-read at start (mtime 2026-11-04 11:33, last row **O-133**, unchanged since §P13c's header). `FORMATION-PROGRESS.md` read to its 19:1x "POST-REBOOT 2 RESUME" line. No ruling names a CK cell, and none arrived mid-seat. In force: O-103d (1)-(4), O-103f, Q-1 (c), Q-4 (b), O-118 (3), O-87 |
| read | REGISTRY.md in chunks: "D5 · pass 13 · completion" (3434-3657) in full and §P1-6 (283-330). In full: `pass-13/C-A13-complete.md`, and from its records `held-wk2.txt`, `builds.sh`, `run.sh`, `wk-run.sh`, `gates.sh`, `all.sh`, `c1.txt`, `logs/builds.log`, `logs/all.log`, `logs/wk-queue.log` and `logs/c.log`'s stage lines. From `P-E13-complete.md`: §2.2 and §6 (the builder's WebKit exit-side and plant readings), for reference only. **Left unread:** the pass-13 part (3223-3430) beyond what §P13c carries, and the pass-12 part. This seat scores only the held cells' rows, and §P13c states the rulings those rows rest on |
| records | `pass-13/C-A13c2/`: `builds.sh`, `run.sh`, `wk-run.sh`, `gates.sh` (the parent's, re-pathed), `held-wk2.txt` (byte-identical to the parent's, `shasum` `7d1ea6f3d4e4…` both), `wk2a.txt` and `wk2b.txt` (the split, §5), `all.sh` (the driver, the plan in its header); `logs/` (one log per stage, `builds.log`, `wk-queue.log`, `all.log`, `wk.done`, `gate-*.log`), `json/`, `frames/` (`cap/cand13/` the WebKit CAP sheets, `glance/`, `loupe/cand13/`, `ce9/`, `ce11/`) |

## 0 · In brief

1. **CK-16 closes on C-A13's side in WebKit.** At rest, cand8 reads rAF 0.0/s and RO 0.0/s; engaged and idle it reads 60.2 / 60.2 per s. cand13 reads 0.0 / 0.0 at rest and **59.9 / 59.9** engaged, in the same run, both at the display's 60 Hz (load 20.4-21.6). `cand13-loop` passes **2/0**: the keyboard loop reads 119.7/s engaged, the fine hold 179.9/s, and every window after release reads 0.0/s. With the parent's Chromium reading (119.9 / 119.9 against 120.4 / 120.3), C-A13 now reads CK-16 at the bar in both engines. C-E13c already did. **The row closes on both critics.**
2. **CK-27 closes on C-A13's side in WebKit.** All six plants are red on their own cells, and each count equals P-E13-complete's WebKit reading: `level` 45/13, `child` 6/12, `stale` 0/3, `noown` 1/1, `typedom` 57/56 (the census error "`--spring-panel-duration` is unreadable on the host" on 23 of 31 scenes), and `reachzero` 3/1 ("THE PAINT CONTRADICTS THE MESSAGE", held inline ×0.0000). `level`'s thirteenth fail is not a plant cell. It is a glide-speed read under load 22 and is NOT-REPRODUCED (§1). With the parent's six Chromium plants red, C-A13 reads CK-27 in both engines. C-E13's `reachzero` WebKit cell is its own seat's (c3b, C-E13-complete-2). **The row closes when that cell reads red too.**
3. **CK-20's WebKit exit-side: not decided by these reads, and the row stays OPEN.** No exit-side round got below load 8. Each of the six load gates waited its whole 900 s, and the rounds then ran at loads 12.4-24. Under that load, cand13 fails the cell in 4 of 5 rounds: steps of 23.7 and 98.3 px in ce11 round 1; 23.2 px (zoom125) in ca11 round 1; 79.0 and 24.2 px in ca11 round 2. It passes in ce11 round 2 (10.9 and 13.1 px against 15.1 and 18.6, load 12.4). It also fails in the `cand13-ca11` path stage (84.4 px, load 17.4). **The passing reference fails too.** `rr-cand11-ce11` round 1 reads zoom125 **91.8 px** against 18.6 (load 17.6-16.2), cand11's first fail on record after six clean rounds (H13c §5). So at this load the cell does not separate cand13 from cand11. These reads neither confirm nor refute §P13c-4's ruling, which rests on reads below load 8. The regression stands as ruled. The new fact is an instrument fact, recorded for S14 and H14 (§4 item 1).
4. **CK-25's WebKit frames are in.** CAP is **18/0** (`frames/cap/cand13/cand13-webkit-{fine,coarse}.png`). The sheet reads as the parent's Chromium sheet: flat and restrained, one edge, no glow and no added lighting layer (O-87). The ambient exemplar is static (D3), and the dark Button keeps its warm halo. The WebKit glance still `glance/cand13-webkit-rotate10-outside-act.png` shows **the loupe under `rotate: 10deg` as a broken object in WebKit's own frame**: a tall pill hung below the tilted track, with its readout cropped to a column, while the root itself holds at 0.00 px. The tip stills (`loupe/cand13/e8-webkit-*-tip.png`, 4/0) show the intact pill on an untransformed track. **CK-25 stays OPEN** on D3's clause and D5's lens clause.
5. **The pass-12 and pass-11 critics' WebKit paths hold on cand13, apart from the exit-side cells.** `ca12 xf,kind,anchor,errs` 57/0; `ce12` **28/0** (Chromium's one fail, `anchor · scroller · none`, does not occur in WebKit); `origin` 22/0; `ca11` 42/1 (the one fail is exit-side, item 3) and `loud` 14/0; `ce11` 70/0/1, 22/0 and 8/0/1 (the UNMEASURED cell is `side · zoom25 · carry`, NOT DRIVEN, as in Chromium); `e11v` 67/5 (the five stated non-counterexamples, `calc(infinity * 1s)` and `1e-3s`, as in Chromium); `vals` 57/0; `ce9` 1/0; `tip` 4/0. **No new WebKit counterexample on these paths.**
6. **The gates pass on cand13's tree `30f51077c3ec`.** build exit 0; typecheck exit 0; `demo:dist:build` exit 0; vitest (`--maxWorkers=2`) **247 files, 2454 passed, 10 expected fail, 1 skipped (2465)**, exit 0. Loads were 18.5-31.1. P-E13's gate figures are reproduced by a critic for the first time.

## 1 · Per row the held cells bear on

Loads are the 1-minute load at a stage's start and end. Logs are `C-A13c2/logs/<stage>-webkit[-<hash>].log`.

| row | WebKit, this seat (load) | Chromium, C-A13c | state on C-A13 |
|---|---|---|---|
| **CK-16** | `cand8-ca9idle`: rest 0.0 / 0.0, engaged idle **60.2 / 60.2** rAF / RO per s (20.4-19.5). `cand13-ca9idle`: rest 0.0 / 0.0, engaged idle **59.9 / 59.9** (19.5-21.6). `cand13-loop` **2/0**: engaged 119.7/s (keyboard) and 179.9/s (fine), then 0.0/s on every window after release (+0..150 ms, +150..450 ms, +1.5..4.5 s), and `[data-engage-stage]` 1→0 in the first window (21.6-23.4). WebKit has no layout counter (stated in the log) | 119.9 / 119.9 against 120.4 / 120.3; 0 layouts/s, 0 recalcs/s; loop 2/0 | **CLOSED on C-A13** (both engines at the bar). With C-E13c's reading, **CLOSED on both critics** |
| **CK-27** | the six plants, each red on its own cells: `level` **45/13** (the 12 rotate and matrix cells; the 13th is below); `child` **6/12** (style, class, hidden, text × none, scale 0.8, rotate 10deg); `stale` **0/3** (css-transition scale, WAAPI translate, WAAPI rotate); `noown` **1/1** (10 foreign records in 9 deliveries against bound 0); `typedom` **57/56** (census 23 of 31 scenes red on the false `--spring-panel-duration` error); `reachzero` **3/1**. Loads 27.8-19.3 | six red (`level` 46/12, `child` 6/12, `stale` 0/3, `noown` 1/1, `typedom` 100/13, `reachzero` 3/1) | **CLOSED on C-A13.** The row closes on both critics when C-E13-complete-2 reads its `reachzero` WebKit cell red |
| CK-20 (exit-side, WebKit) | see §2: cand13 fails 4 of 5 held rounds and the `ca11` path stage, all at load ≥ 12; **cand11 fails 1 of 2 cells in its one round at load 17** | — (the parent's held re-reads were WebKit only) | **OPEN.** Not decided at this load (§2) |
| CK-20 (the other WebKit paths) | `ca12` 57/0, `ce12` 28/0, `origin` 22/0, `ca11` loud 14/0, `ce11` 70/0/1 + 22/0 + 8/0/1, `ce9` 1/0, `ce9c` REPORT, glance 0.00 px on all three acts | as the parent's §3 | **OPEN** on its counterexamples of record (§P13c-2); **no new WebKit counterexample** |
| CK-21 (the WebKit value paths) | `e11v` **67/5** (`calc(infinity * 1s)` × side / rerender / carry, `1e-3s` × side / rerender: NOT TAKEN, §P12-2's stated non-counterexamples); `vals` **57/0** | 67/5; 57/0 | **OPEN** on §P13c-2's counterexamples (`calc()` fragments, `transition: all`, `--motion-tempo` ≤ 0, the context gutter); nothing new |
| **CK-25** | CAP **18/0**; the WebKit fine and coarse sheets; tip **4/0**; glance; `ce9` stills | CAP 18/0 (fine, coarse); the lens stills | **OPEN ◇** D3 (the ambient exemplar is static) and **D5's lens clause**, now also in WebKit's glance frame (§3) |

**`level`'s thirteenth fail.** The cell is `xf · outside · perspective rotateX 25deg`. It reads 0.19 px on the act's frame, inside its bound of ≤ 0.5. The failing read is the largest move over any 16.7 ms: **9.0 px** at +131 ms, against a bound of 6.5. The path `0.0, 0.2, 2.4, 5.2, 11.2` shows a skipped frame, at load 22.2. The same cell passes on the same plant in Chromium (5.4 px, load 15.5, `C-A13c/logs/plant-level-E-10-chromium-285697.log`) and in WebKit at P-E13-complete (5.4 px, load 13.9, `E13c/logs/plant-level-E-10-webkit-285697.log`). It is not one of the plant's own cells. It was seen only under load, so it is **NOT-REPRODUCED**, it was not re-run, and it is not scored.

## 2 · The WebKit exit-side cells, cand13 beside cand11 (CK-20)

Each `rr-*` stage holds itself until the 1-minute load drops below 8, for at most 900 s (`run.sh`, unchanged). **Each of the six gates timed out at 900 s**, so every round ran above load 8. Bounds: `none` 15.1 px; `zoom125` 18.6 px; ca11 adds the 4 px drive to each.

| stage (held order) | build | load at the read | `none` | `zoom125` |
|---|---|---|---:|---:|
| `rr-cand13-ce11` round 1 (`-0fae8f`) | cand13 | 19.8 → 23.8 | **23.7 ✗** | **98.3 ✗** (centre 109.5) |
| `rr-cand11-ce11` round 1 (`-0fae8f`) | **cand11** | 17.6 → 16.2 | 11.0 ✓ | **91.8 ✗** (centre 102.6) |
| `rr-cand13-ca11` r 1 (`-095c20`) | cand13 | 16.7 → 15.8 | 18.0 ✓ | **23.2 ✗** |
| `rr-cand13-ce11` round 2 (`-453e55`) | cand13 | 12.4 → 11.7 | 10.9 ✓ | 13.1 ✓ |
| `rr-cand13-ca11` r 2 (`-acdffa-004718`, WK-2c) | cand13 | 16.2 → 19.2 | **79.0 ✗** | **24.2 ✗** |
| `cand13-ca11` path stage, `exit-side` inside it (`-7c5f7b`) | cand13 | 17.4 | **84.4 ✗** | ✓ |

**Reading.** At loads of 12-24, cand11 fails the zoom125 cell by a step as large as cand13's (91.8 against 98.3 px). A cell whose passing reference fails it at this load cannot carry the regression either way. Every cand13 failure here was seen only under load, and the rule makes each one NOT-REPRODUCED. The regression rests on reads below load 8: H13c 3/3, E13c 2/2 and cand11 6/6 clean. Nothing here refutes those reads on their path, so **§P13c-4's ruling stands**, and CK-20 stays OPEN. The 79.0-98.3 px class matches the large steps read before only under load (cand12 104.7 px at load 11.1, C-A12; cand13 `ca11` 100.5 px, E13c). That class is a load-sensitive behaviour of the exit-side cell in WebKit, shared by cand11. It is not a cand13 property. I record it under §4 as an input for S14 and H14, not as a cand13 counterexample.

## 3 · CK-25's WebKit frames

- **CAP, fine** (`frames/cap/cand13/cand13-webkit-fine.png`, 18/0, load 20.3-16.2). Button ×1.030 pressed, ×1.033 held, ×1.054 committed (light) and ×1.060 (dark); Switch ×1.059 at the commit; slider ×1.045 pressed and ×1.060 held and engaged; accordion ×1.039; Dialog ×1.060; field and static ×1.000. The engaged state draws a single ring with no glow. No blur or lighting layer is added beyond the existing material (O-87). The ambient card is static in every column (D3's clause). The dark Button carries a warm halo at rest and when pressed, as in Chromium. In the slider's pressed and held cells the loupe sits above the track, clipped by the cell's top edge. That clip is the sheet's crop, not the page's: the tip stills show the whole pill.
- **Glance** (`frames/glance/`): `rotate10-outside`, `anchor-page-insert` and `dialog-insert` each read 0.00 px off on the frame after the act, with glides paused. On the `rotate10-outside` act frame the loupe is a pill about four times its height, **hung below the tilted track with its readout in a narrow column**. That is CA13c §2.4's broken object, now in WebKit's own still. D5's lens clause stays open.
- **Tip** (`frames/loupe/cand13/e8-webkit-{fine,coarse}-{light,dark}-tip.png`, 4/0): the intact pill on an untransformed track.
- **The gestalt, from these frames:** at rest and on untransformed tracks, the WebKit set reads as iOS 27 grade under O-87, flat and deft. The lens under a rotated card does not. **CK-25 is not graded as passing.**

## 4 · Inputs for S14 and H14 (no CK row added)

| # | finding | source | for |
|---|---|---|---|
| 1 | **The WebKit exit-side cell does not separate builds above load 8.** cand11, the passing reference, fails zoom125 by 91.8 px at load 17. The `rr` load gate gives up after 900 s and measures anyway, so on a busy machine a "below load 8" re-read silently becomes an under-load read. H14's exit-side cell needs a gate that does not proceed: it keeps the cell open and says so, or it waits again. It also needs cand11's reading at the same load printed beside cand13's in the same run, as the parent's list did | §2 | H14 (instrument); S14 (c)'s exit-side member: its range is stated by load as well as by zoom |
| 2 | **No held cell refutes a §P13c reading.** Every member of §P13c-8.1 (c) stands as listed. No new WebKit counterexample was found on the pass-12 and pass-11 critics' paths | §1, §0 item 5 | c4b |
| 3 | `ce9 anc blend` (REPORT, not gating): the ratio of ratios is **1.102**, OUTSIDE 0.90..1.10, at load 20.6 (×1.117 against ×1.014). Chromium read 1.041, inside. The reading is under load and the cell is a REPORT, so it is recorded only | `cand13-ce9-webkit-eb6306.log` | H14, if it adopts the cell |
| 4 | **`promoted` differs on the idle cell**: cand8 `promoted true`, cand13 `promoted false` (REPORT). It is not a CK-16 term. It is recorded because the top-layer promotion is a consumer-visible path (CK-22's MIGRATION scope) | `cand8-ca9idle`, `cand13-ca9idle` logs | P-E14 (CK-22) |

## 5 · Process

- **The plan, fixed before any stage started** (`all.sh` header). The held list did not fit one 90-minute acquisition. WK-1's pace and the parent's Chromium times put its 29 stages at about 85 min plus load gates, and `wk-run.sh` starts no stage after 80 min. It was split into named acquisitions as exact sub-lists. `diff` of the held list's body against `wk2a.txt` + `wk2b.txt` prints nothing.
  - **WK-2a**: stages 1-14 (the plants, the idle bar, the loop, the five exit-side rounds).
  - **WK-2b**: stages 15-29.
  - **WK-2c**: a contingency, the held list itself with the done file skipping every stage already run.
  - Then the gates.
- **Builds**: one guarded call, `--timeout 30`, 19:15:18-19:15:40, guard exit 0, load 11.2-10.0.
- **WK-2a**: queued 19:15:40, **admitted 20:40:04 (a lock wait of 84.4 min)**. It ran 13 stages. Its fourteenth (`rr-cand13-ca11 --r 2`) started at 76 min, 21:56:47. Its load gate was still waiting when the guard's 90-minute timeout **KILLED** the acquisition at 22:10:07 (exit 124). The stage's log `rr-cand13-ca11-webkit-acdffa.log` holds only its header line: it measured nothing. It was not marked done.
  - Lesson: wk-run.sh's 80-minute start rule does not cover a stage whose load gate can take 15 min. A start cutoff of 75 min, or the gate's length subtracted from it, would have avoided the kill. Recorded for the next runner.
- **WK-2b**: queued 22:10:07, **admitted 23:45:33 (a lock wait of 95.4 min, over 90; I kept waiting, as the task says)**. It ran all 15 stages to 00:16:30, guard exit 0.
- **WK-2c**: queued 00:16:34, admitted 00:47:17 (30.7 min). It ran the killed stage in full (`-acdffa-004718.log`) to 01:02:38, guard exit 0.
- **Gates**: one guarded call, `--timeout 75`, 01:02:43-01:06:51, guard exit 0, on src tree `30f51077c3ec`, read back by `gates.sh`.
- **Load.** Other seats ran browsers throughout. Lock contenders seen in `ps`: C-E13c2's held list, a `u-build` probe-step, release-10.1.5 probe-fix-3, a `facts14.mjs`, a `csc411` run, and others. The 1-minute load was 11-36 during the seat, and the load sits beside every reading above.
- **The zone.** No `guarded` call refused or warned of a refusal. Every heavy run was admitted.
- **Machine law.** Every build, browser run and gate went through `~/.claude/guard/guarded`, never `--light`. Every WebKit stage ran inside `--exclusive webkit --timeout 90`, one heavy run at a time. vitest ran with `--maxWorkers=2`. No browser MCP was used. `pgrep -f C-A13c2` prints nothing at close.
- **Fences.**
  - The worktree `.claude/worktrees/bl/D5/p14/C-A13c2/wt` (detached at HEAD, `node_modules` symlinked; the checkout has no `tests-visual/node_modules`) was removed by `git worktree remove --force`. Its parent `p14/C-A13c2` and the then-empty `p14/` were removed by `rmdir`. `git worktree list` names no C-A13c2 entry.
  - `git status --short src tests demo` prints nothing.
  - My only checkout writes are this file and `pass-13/C-A13c2/`.
  - Nothing under `~/.claude` was read: the guard was only executed, and its outputs are quoted from my own logs. Sibling repos were not touched.
- **The re-pathed runners** differ from the parent's only in `R=` and `WT=` (`diff`, one or two lines each). The stage commands, cells, bounds and gates are the parent's.

## 6 · For c4b

1. **CK-16: CLOSED on both critics** (C-A13 now reads WebKit at the bar; C-E13c read it before).
2. **CK-27: CLOSED on C-A13** in both engines. On both critics once C-E13-complete-2's `reachzero` WebKit cell reads red.
3. **CK-20: OPEN.** The WebKit exit-side re-reads ran but could not be read below load 8. At load 12-24, cand11 fails the cell as cand13 does, so §P13c-4's ruling stands unrefuted. The instrument fact is §4 item 1.
4. **CK-25: OPEN** (D3's clause, and D5's lens, now in a WebKit frame).
5. **No new counterexample** on the critics' WebKit paths. **The gates pass** on cand13.
6. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.
