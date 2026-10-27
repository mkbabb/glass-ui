# D2-B′ prototype, pass 7: the run assembles in order

| field | value |
|---|---|
| seat | D2 pass 7, D2-B′ PROTOTYPE (the measured scene, one integrator) · model `claude-opus-5-5`, asserted from own system identity · third deployment of the seat (the first two died at the 2026-10-21 usage limit, §6); this entry 2026-10-27 13:15 → 19:25 |
| base | HEAD `c085f3b0b` (at the close `ca54e4bf8`; `git diff --name-only c085f3b0b ca54e4bf8 -- src demo tests package.json docs/design scripts` is empty) + `pass-6/floor-v5.patch` (sha256 `cba6bdc2…`, re-hashed). No floor v6. `git diff --name-only 067e8e6d1 c085f3b0b -- src demo tests package.json docs/design scripts` is empty, so the base is the one H7 and pass 6 read |
| patch | `pass-7/D2-Bp-proto.patch`, sha256 **`184a971541ed5192bc2162e2635814583bbf367b676431ffc0f8d8332aae9ad2`**, 61 files, +2,454 / −2,406 on HEAD + floor v5 (`git apply --numstat`). `git apply --check` clean on an archive of HEAD + floor v5; applied, the tree equals the seat worktree over `src demo tests docs/design` (`diff -rq` empty; `records/apply.log`, `records/patch-final.txt`). Against `pass-6/D2-Bp-proto.patch` it changes two files: `useDockScene.ts` (+51 / −47) and `useDockBody.ts` (+7) |
| owner rulings | O-103 (`audit/INBOUND.md`): Q-4 (c), Q-12 (b), Q-18 (a), Q-15 (a), Q-16 confirm, Q-17 (a); safaridriver not granted. Re-read: `INBOUND.md` (through O-107) and `FORMATION-PROGRESS.md` carry no newer D2 ruling. Rows that arrived during the seat (O-103e, a D4 scope ruling; O-108, value.js perf sub-rows; O-109, a plate text floor over mid-tone grounds) are not D2 rulings and are not on the 38 rows. **The ruled digest is the score of record**, the default beside it |
| harness | H7 as landed (`harness/HARNESS.md` §12, `lib.mjs` from the checkout), unchanged. Adapter `pass-3/adapter-floor-v2.mjs` |
| engines | Chromium (Playwright's default headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| records | `pass-7/D2-Bp-proto-records/`: `battery/` (every stage log with its load, re-runs, `json/`, `slots.log`, `chain.log`), `digest/` (`-p7bp` default, `-p7bp-ruled`), `F7-bp/` and `F7-final/`, `PR-bp/` and `PR-final/`, `si/` (display-frame slot probe), `fmlow/` (B2 re-read at load ≤ 15), `cost/`, `filmstrips/`, `facility/`, `l1/`, `iter-attempt1/` (the first deployment's development runs), `scripts/` |

## 0 · In brief

**Ruled digest (score of record): 38/38, first 36 36/36, first 24 24/24. Default digest: 36/38 (P1, P3 OWNER-BLOCKED with 0 red cells, both closed by O-103).** 655 cells over both engines and both themes; 2 NOT-REPRODUCED (Playwright WebKit dark FM `film·warm-expand` [hole] and W3 `warm-expand` [lanes]), each red on its main run only, at load 42.9 and 30.4. No row has a red cell. H7's baseline read pass 6's B′ at 35/38 ruled (open P3, R1, B2).

**B2 passes on the witness; on the strips it closes in Chromium and narrows in Playwright WebKit.** H7-1 reads 0 hole frames in 62 of 72 FM reads of the six B2 cells (four columns × main + two re-runs), 1 frame in 8 and 2 frames in 2 (both Playwright WebKit dark, at load 42.9 and 31.1, each on a cast with a stalled tile); H7's baseline read 2-4 frames on first-expand, warm-expand and warm-collapse in all 36 of those reads. At display-frame resolution (`si/`, a DOM probe that enters no row) the slot is empty for 1 frame in Chromium (8.3 ms) where pass 6's B′ reads 11-12; Playwright WebKit reads 1-2 frames (9-21 ms) at load 27-34 and 1-3 in the low-load slots, where pass 6's reads 9-10. The P3/R1 cell H7 found (Chromium dark W3 `swap-long` [faces]) reads 0 px here (§3.4). **One class stays open in Playwright WebKit, and this seat does not claim obligation 1 there.** The cure leaves one structural empty display frame where the leaving unit stops painting before the arriving unit's first uncovered edge (Chromium: 8.3 ms, never seen by the cast). When Playwright WebKit holds that frame on screen for 40 ms or more (a paint stall: two identical tiles), the cast reads a 2-frame hole. That happened in 3 of 72 Playwright WebKit B2 reads, one of them at load 13.55 (`fmlow/`, the low-load re-read), so it is not load-borne. The digest reads B2 PASS by H7-3's rule; the critic reads the strips (§1.1, §5).

| obligation (§P6-7.3) | status | where |
|---|---|---|
| 1 · B2, the run assembles in order | **met in Chromium**: H7-1 ≤ 1 cast frame in all 36 B2 reads (three single frames, all Chromium dark), the probe 1 display frame (8.3 ms) where pass 6's B′ reads 11-12; **not met in Playwright WebKit**: shortened from 2-4 cast frames to ≤ 1 in 69 of 72 reads, but 2 cast frames in 3 (one at load 13.55), the probe 1-3 display frames. The digest reads B2 PASS (H7-3). `SEAM_AT` is gone; the leaving front sweeps on the exchange's own motion. R6 splice 0, sliver 0, stub 0 ×4. R2 worst 0.374-0.400, **margin 0.100-0.126** | §1, §3.3, §5 |
| 2 · keep every pass-6 row | **met**: mask ramp (narrowest 7.71-7.82 px), no opacity write, R8, C8 10/10 ×4, C9 52 px ×4, PR 6/6, L1 6/6 per engine | §3 |
| 3 · F7 and cost | F7 **13/13**; boot graph **503,389 B against 503,808 B, margin 419 B** (pass 6: 589 B; the change costs 170 B), no raise, no split. Cost: expand at 20 and 40 seats and lead at 20 seats read one trigger frame in each of the three runs at load ≤ 15, as in pass 6; **lead at 40 seats reads 1, 3, 3 frames (pass 6: 1, 1, 1): not met on that cell** | §2 |
| 4 · prose | **met**: PR `prose·harness` 0, 6/6; every new comment states its law | §1.3 |

**This seat's own reading: ADVANCE, not converged.** The digest of record reads 38/38, but two obligations are not met: obligation 1 in Playwright WebKit (the one held empty frame) and obligation 3 on 4× lead at 40 seats. Both are placed in §5 with their evidence; the critic rules.

---

## 1 · The patch

### 1.1 · Obligation 1: the pacing, from the exchange's motion

The hole had one cause (B′-crit §2, §P6-0 finding 4): `exitFronts` paced a leaving unit so that its painted length reached its seam only at `SEAM_AT = 0.8` of the exchange, and the arriving unit waits one seam short of that front. Its neighbours, with nothing in their way, were whole far earlier. Three changes replace the fixed fraction.

1. **The sweep.** A leaving unit's fronts are now each the further of two distances, capped at the path's end: the lead (unchanged: taken at the rung's natural speed, ω across the unit's box, one 60 Hz frame of it per painted frame) and a new **sweep** `d`. On every body frame `d` grows by `ω · L · min(dt, FRAME_MS) · p²`, where L is the unit's box, `dt` the frame's own step and `p` the exchange lane's progress. So the front moves at the rung's natural speed scaled by the square of where the exchange is: it holds while the glass sets off and goes with gathering speed as the exchange lands, and a late frame delays it (the step is held to one 60 Hz frame) and never leaps it (Q-15 (a)). `SEAM_AT`, the piecewise pacing (`qh`, `v`, the tail polynomial) and the exchange-progress interpolation are deleted (E-1). `useDockBody` exposes `dt`, the step the last frame took (the frame's own time, capped as the body caps it).
2. **A lead that frees nothing is not taken.** A front's lead on a side was what the units arriving there need to paint. When the lead (after the room cut) is shorter than the least any one arriving unit needs (`useS`/`useE`, the smallest of the per-unit needs), it would only take the leaving unit's ink before anything can stand in its place: that side's lead is 0 and the sweep alone carries it. This is the "P" that went blank two tiles before "1" could paint.
3. **A front holds the units coming in only while its unit paints.** Once a leaving unit's fronts have met, or what is left inside the plate is less than its own seam (the sliver rule, now one `sliver()` helper shared with the paint pass), its front is no longer registered against arriving units, so the unit behind it is not held a seam short of ink that no longer exists.

Readings of the order (both from the battery's FM, `filmstrips/`): Chromium light `first-expand` now reads "H P 2 3", then "H ↄ 2 3" (the leaving "P" at the end of its ramp), then "H 1 2 3": the slot holds ink on every tile. Pass 6 read "H _ 2 3" for three tiles. Warm-collapse fades "1" (tile 4) into the arriving "P" (tile 5) with no empty tile. On Playwright WebKit dark `warm-expand` (load 42.9) one painted frame shows "H _ 2 3", captured on two tiles because the page painted no new frame between them (tiles 4 and 5 are identical to the pixel, "Sc" cut at the same place); both re-runs read 0.

The display-frame probe (`scripts/slotink.mjs`, every rAF frame, the slot's ink modelled from each seat's clip and mask over its glyph extent; three runs per build, engine and theme; `si/`):

| column | B′ pass 7: longest empty run, frames (first-expand · warm-expand · swap-long), runs 1/2/3 | B′ pass 6 (`bp6`) | load |
|---|---|---|---|
| Chromium light | 1/1/1 · 1/1/1 · 0/0/0 (8.3 ms) | 11/11/11 · 11/11/12 · 0 | 22.9-25.8 (bp6 20.3-26.5) |
| Chromium dark | 1/1/1 · 1/1/1 · 0/0/0 | 11/11/11 · 11/11/11 · 0 | 18.9-23.0 (20.4-30.0) |
| Playwright WebKit light | 1/1/2 · 1/1/1 · 0/2/0 (10 ms frames; 2 = 19-20 ms) | 10/10/10 · 9/10/9 · 0 | 28.6-33.7 (30.1-33.0) |
| Playwright WebKit dark | 1/1/2 · 2/1/1 · 0/0/0 | 9/10/9 · 9/10/9 · 0 | 26.8-30.7 (26.1-32.7) |

`warm-collapse`, `swap-short` and `content-add` read 0 in all runs of both builds. 
**The low-load re-read** (`scripts/fmlow.sh`, `fmlow/`): FM's six B2 cells three times per theme in Playwright WebKit, each theme in one `--exclusive webkit` slot started at load ≤ 15 (admitted 18:50:23 and 18:53:25 with no lock wait), then the probe three times in the same slot. H7-1 hole frames per cast, runs 1 · 2 · 3:

| column | first-expand | warm-expand | warm-collapse | swap-long, swap-short, content-add | load |
|---|---|---|---|---|---|
| W·l | 1 · 1 · 0 | 0 · 0 · 0 | 1 · **2** · 0 | 0 ×9 | 13.2-18.8 (the 2-frame read at **13.55**) |
| W·d | 0 · 0 · 0 | 0 · 0 · 1 | 1 · 1 · 1 | 0 ×9 | 14.3-22.6 |

The probe in the same slots (load 16.2-23.6, it rose under the run): longest empty run first-expand 3/1/2 (light), 2/2/3 (dark); warm-expand 1/2/2, 2/1/2; 0 elsewhere. The 2-frame cast at load 13.55 (`fmlow/fmlow-light-r2/strip-webkit-warm-collapse.png`) is the same picture as the battery's red: tiles 4 and 5 identical, "H _ 2 3", then "H P 2".

**What the first deployment tried** (`iter-attempt1/`, 2026-10-21, Chromium light unless named; the candidates' sources were not kept, only their runs): eight candidates `c1`-`c8` against `bp0` (pass 6's B′, FM hole 3/3/3 on the three hole cells). `c1`-`c3` cleared most of the hole but opened W3 `blank` and `leaving` on swaps and retargets (a front released too early leaves the arriving face blank, or drops the leaving ink faster than R2 allows); `c4`-`c7` traded a remaining 1-frame hole against `blank` (`c4`), `lanes` (`c6`, `c7`) or `vanish` (`c6`); `c8` read FM 6/6 with 0 hole frames in Chromium light and dark and W3 clean but for a `terminal` borderline on `lead-remove` that the battery does not reproduce. This patch is `c8` with one behaviour-neutral edit (§1.2) and one comment edit (§1.3). The second deployment (2026-10-21 14:01) tried a `c9` and reverted it (probe: 3 display frames where `c8` reads 1).

### 1.2 · The one behaviour-neutral edit since `c8`

`c8` divided by `lead[0] + lead[1] || 1` to guard a path whose leads were both dropped. That is a masking default (E-2), so the lead step now says what it means: a path with no lead on either side has none to take (`r = 1`). Behaviour is the same (with both leads 0 the lead term is 0 whatever `r` is).

### 1.3 · Obligation 4: prose

PR on the final tree: 6/6, `prose·harness` 0, readers 65, count 7 (0 wrong), partials 0, citations 0, rows 32 (`PR-final/`). The new comments state laws: the sweep's speed and why a late frame cannot leap it; why a lead that frees nothing is not taken; why a front stops holding units once its unit no longer paints. One comment was corrected after the battery: the header said the slot "is never empty while its neighbours paint", which the WebKit probe does not support at display resolution; it now says the slot "keeps pace with its neighbours". The edit is comment-only, the emitted scene chunk is byte-identical (`useDockScene-CWH9c6i2.js`, 21,085 B, the same file name and size in both F7 builds), and F7 and PR were re-run on the final tree (§2).

---

## 2 · F7 and cost (obligation 3)

| check | result | load |
|---|---|---|
| harness builds `bp`, `fv3`, `fv5`, `bp6` (`build.mjs`, out inside the seat dir) | exit 0 ×4 (`build-*.log`) | 26.0-33.0 |
| F7 on the battery's tree (`F7-bp/`) | lib exit 0 (9 s), demo exit 0 (2 s), `vue-tsc` exit 0 (18 s), vitest `--maxWorkers=2` the whole suite: 232 files outside `tests/gates/`, 2,241 tests, 0 failing; every gate passes, `gate:boot-graph` 14/14 with its build arm 3/3. **F7 13/13** | 14.7-25.3 |
| F7 on the final tree (`F7-final/`) | **13/13**: the same four steps exit 0 (lib 13 s, demo 3 s, `vue-tsc` 26 s, units 91 s), 232 files, 2,241 tests, 0 failing, every gate passes (`gate:boot-graph` 14/14, build arm 3/3, comment-ratio 15/15). PR 6/6 (`PR-final/`) | 28.4-29.5 |
| boot graph (`scripts/bg.mjs`, the gate's parser, on the F7 build's `dist-demo/`) | **64 files / 503,389 B; ceiling 503,808 B; margin 419 B**. Scene chunk `useDockScene` 21,085 B (pass 6: 20,942 B, +143 B). No ceiling raise, no split | — |

**Cost** (`pass-2/D2-Bp-probes.mjs --arm pcost,plead`, Chromium traced; `bp` against `fv5`, alternating, each `guarded --cpu-cores 0`, each started at a 1-minute load ≤ 15; records `cost/`). Rows: frames over 25 ms / max frame ms / main-thread ms per frame, with each cell's load.

Runs r1 and r2 started at load ≤ 15 but their cells read 16.7-20.3 (r1) and 13.6-18.3 (r2) as the machine's load rose under them, so two more pairs were run (r4, r5). **The reading of record is the three runs whose every cell read at load ≤ 15: r3, r4, r5.**

| Chromium, `bp` (B′ pass 7) | r3 | r4 | r5 | r1 (load 16.7-20.3) | r2 (13.6-18.3) |
|---|---|---|---|---|---|
| 4×, 20 seats, expand | 1 / 51.7 / 1.41 (12.86) | 1 / 53.5 / 1.46 (12.1) | 1 / 37.3 / 1.20 (13.48) | 1 / 43.5 | 1 / 45.0 (13.9) |
| 4×, 40 seats, expand | 1 / 44.9 / 1.56 (12.71) | 1 / 46.0 / 1.78 (12.09) | 1 / 36.0 / 1.33 (13.48) | 3 / 69.6 | 1 / 52.1 (13.66) |
| 4×, 20 seats, lead | 1 / 38.5 / 1.80 (14.58) | 1 / 38.4 / 1.71 (12.75) | 1 / 46.1 / 1.89 (13.87) | 1 / 37.6 | 2 / 36.7 (18.19) |
| **4×, 40 seats, lead** | 1 / 43.1 / 2.08 (14.45) | **3** / 52.3 / 2.19 (13.01) | **3** / 52.4 / 2.27 (13.87) | 1 / 43.2 | 3 / 51.7 (18.26) |
| 1×, 40 seats, expand / lead | 0 / 0 (max ≤ 10.8) | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |

| Chromium, `fv5` (floor v5) | r3 (15.4-16.9) | r4 (13.9-15.8) | r5 (14.1-15.4) | r1 (16.7-18.1) | r2 (15.4-19.4) |
|---|---|---|---|---|---|
| 4×, 20 seats, expand | 1 / 26.6 | 0 / 16.3 | 0 / 24.0 | 0 / 21.4 | 0 / 21.8 |
| 4×, 40 seats, expand | 1 / 28.9 | 0 / 24.1 | 0 / 22.1 | 1 / 37.2 | 1 / 30.1 |
| 4×, 20 / 40 seats, lead (no lead morph) | 1 / 0 | 1 / 0 | 0 / 0 | 0 / 0 | 1 / 0 |

The floor's cells drifted just over 15 in r3-r5 (it ran second in each pair); at load ≤ 15.1 it reads 0 on expand, as in pass 6.

**Reading.**
- **Expand, 20 and 40 seats, and lead at 20 seats: one trigger frame in every run at load ≤ 15.** Obligation 3 holds there, as in pass 6. The floor reads 0 on expand at its lowest-load runs (1 at 15.4-18.1).
- **Lead at 40 seats: 1, 3, 3 frames over 25 ms** (max 43.1-52.4 ms) in the three runs at load ≤ 15. Pass 6's B′ read 1, 1, 1 (30.3-33.3 ms, load 8.6-14.5). **Obligation 3 is not met on this cell.** Main-thread time per frame there is 2.08-2.27 ms (pass 6: 1.63-1.98), and the morph runs on 12-14 frames (pass 6: 24-39 at 4×). Not diagnosed in this seat; the candidates are the per-frame work this patch adds for every leaving unit (the sweep step, the `sliver` test before a front is registered), which the lead morph at 40 seats runs on the most units at once (§5).

---

## 3 · The 38 rows under H7

### 3.1 · Battery slots

`scripts/chain.sh`: one `battery.sh theme` slot per engine and theme (H6-10), Playwright WebKit under `--exclusive webkit`. Every red cell re-run twice inside its slot; FM's six B2 cells re-run twice on every run (H7-3).

| slot | start → end | load at start / end | cells' load (min-max, with re-runs) |
|---|---|---|---|
| bp · Chromium · light | 13:48:18 → 14:01:42 | 26.03 / 34.34 | 22.98-42.37 |
| bp · Chromium · dark | 14:01:42 → 14:20:53 | 34.34 / 33.47 | 17.19-40.05 |
| bp · Playwright WebKit · light | 14:20:54 (first witness 14:22) → 14:34:58 | 33.47 / 35.67 | 27.89-69.15 |
| bp · Playwright WebKit · dark | 14:34:58 (first witness 14:35) → 14:48:59 | 35.67 / 16.13 | 16.54-42.91 |

The machine ran other seats' browsers throughout: these loads are 2-5× the H7 baseline's (4.4-21.2). No slot split, no WebKit page close, no zone refusal.

**Red cells, all four slots: three.**

| cell | column | main | re-run 1 | re-run 2 | reading |
|---|---|---|---|---|---|
| FM `film·warm-expand` | W·d | FAIL `hole`, 2 consecutive frames, seat 2 at 0 at +120 ms (load 42.91; the cast's motion ran 1,640 ms where the clean casts run 280-320 ms) | PASS, 0 (38.32) | PASS, 0 (29.57) | **NOT-REPRODUCED** |
| FM `film·warm-collapse` | W·d | PASS, 1 frame (36.81) | PASS, 0 (39.65) | FAIL `hole`, 2 frames at +120 ms (31.06; motion 2,400 ms) | PASS by H7-3 (a PASS main reads FAIL only when both re-runs fail); recorded |
| W3 `warm-expand` | W·d | FAIL `lanes`: one lane cancelled to identity, a button's clip from 40 px in one frame (load 30.4) | OWNER-BLOCKED, `window` alone, (c) holds | OWNER-BLOCKED, the same | **NOT-REPRODUCED** on `lanes` (H6-7); P3 PASS under Q-4 (c) |

### 3.2 · Per row, per engine and theme

From `digest/table-p7bp-ruled.md`, `rows-p7bp.md`, `counts-p7bp*.md`. C = Chromium, W = Playwright WebKit, ·l / ·d light / dark. P = PASS.

| row | C·l | C·d | W·l | W·d | ruled | default | note |
|---|---|---|---|---|---|---|---|
| P1 | P | P | P | P | **PASS** | OWNER-BLOCKED (Q-12) | every W1 `card·*` cell OB with the band holding (3 per column); Q-12 (b) |
| P2 | P | P | P | P | PASS | PASS | |
| P3 | P | P | P | P (NR 1) | **PASS** | OWNER-BLOCKED (Q-4) | every OB cell is `window` alone with (c) holding: W3 6/7/5/5 OB, W6 2/2/1/2 OB per column. `reversal`: 275.1 ≤ 313.6 (C·l), 274.9 ≤ 312.6 (C·d), 274 ≤ 315.4 ms (W·l, W·d), after the retarget |
| P4, P5 | P | P | P | P | PASS ×2 | PASS ×2 | |
| F1-F5 | P | P | P | P | PASS ×5 | PASS ×5 | |
| F6 | P | P | P | P | PASS | PASS | 0 crashes; W8 `consumer·*` UNMEASURED 12, as every pass (value.js fence) |
| F7 | source | | | | PASS | PASS | 13/13, margin 419 B (§2) |
| N1-N5 | P | P | P | P | PASS ×5 | PASS ×5 | N3 `seat-transition` borderline did not appear; N5 with PR 6/6 |
| R1 | P | P | P | P | PASS | PASS | H7's C·d `swap-long` [faces] reads 0 px over 11 samples (bound 1); every faces cell 0 |
| R2 | P | P | P | P | PASS | PASS | worst first leaving drop: 0.384 (C·l `warm-collapse`), 0.374 (C·d `first-expand`), 0.400 (W·l `retarget·40`, load 64.83), 0.400 (W·d `warm-expand`, 30.4); bound 0.5, **margins 0.116 / 0.126 / 0.100 / 0.100** (pass 6: 0.133-0.142). Largest unit ink 1 (H6-3) |
| R3 | P | P | P | P | PASS | PASS | after the retarget 0.59-0.61 px against 7.98-8.35 |
| R4 | P | P | P | P | PASS | PASS | ST 5/5 ×4 per theme; video scale 1.002-1.003, every cell measured (H7-2) |
| R5 | P | P | P | P | PASS | PASS | 4/4 ×4 |
| R6 | P | P | P | P | PASS | PASS | W3 splice 0, sliver 0, stub 0; FM stub 0 |
| R7 | P | P | P | P (NR 1) | PASS | PASS | the W·d `lanes` cell, NOT-REPRODUCED |
| R8 | P | P | P | P | PASS | PASS | ST nb ×5 per column; Playwright WebKit light: the neighbour's worst one-frame step ×0.63-0.76 of its bound, plate at worst −18.72 px from it (bound 0.5) |
| B1 | P | P | P | P | PASS | PASS | |
| **B2** | P | P | P | P (NR 1) | **PASS** | PASS | H7-1 hole ≤ 1 cast frame on every reproduced read; stub 0; the strips (§1.1, §4) |
| B3 | source | | | | PASS | PASS | PR 6/6 |
| C1-C7 | P | P | P | P | PASS ×7 | PASS ×7 | C1 the 102 × 56 stadium; C2 `c2·prm` under Q-18 (a) |
| C8 | P | P | P | P | PASS | PASS | 10 presses mid-morph, 10/10 collapsed within 1,500 ms, 0 of 10 hovers failed to open, every column |
| C9 | P | P | P | P | PASS | PASS | expanded block 52 px (bound 52), 4 seats, smallest 44 px, every column |
| L1 | P | | P | | PASS | PASS | 6/6 per engine: shadow 1 / 4 / 4, gradients 8, pseudos 8, blur 16 px, equal to `fv3`; 0 idle infinite animations |

**Counts**

| digest | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| **ruled (O-103), the score of record** | **38/38** | **36/36** | **24/24** | — |
| default | 36/38 | 34/36 | 22/24 | P1 (OB, Q-12), P3 (OB, Q-4) |
| H7 baseline, pass 6's B′ (reference) | 35/38 ruled, 34/38 default | 33/36 | 21/24 | P3, R1, B2 |

**The arm set** (identical by construction, H5-6, H5-9, H6-10, H7-3): light = main (W3 with faces, ST, R5, CF, L1, FM, W2, CASES) + rest (W1, W4, W5, W6, W7, W8, R6); dark = dark (ST, FM, W1, W3, W2, R5, CF) + darkrest (W4-W8, R6); each in both engines, FM's six B2 cells ×3 per run. CF carries `crit-corner`, `crit-prm`, `c8·outside-press`, `c9·short-coarse`. Source: F7 and PR. L1's reference is `fv3` (HEAD + `pass-4/floor-v3.patch`, `637d1625…`).

### 3.3 · B2: H7-1 hole frames per cast, main · re-run 1 · re-run 2

| column | first-expand | warm-expand | warm-collapse | content-add, swap-long, swap-short | load |
|---|---|---|---|---|---|
| C·l | 0 · 0 · 0 | 0 · 0 · 0 | 0 · 0 · 0 | 0 ×9 | 36.5-40.7 |
| C·d | 0 · 0 · 0 | 0 · 1 · 1 | 0 · 1 · 0 | 0 ×9 | 25.0-33.1 |
| W·l | 0 · 1 · 0 | 0 · 1 · 0 | 1 · 0 · 0 | 0 ×9 | 31.9-41.1 |
| W·d | 0 · 0 · 1 | **2** · 0 · 0 | 1 · 0 · **2** | 0 ×9 | 28.5-42.9 |

The H7 baseline, for the same nine hole cells: 2-4 frames in every one of 36 reads. Where a frame remains it is seat 2's slot (the "1", where the summary's "P" leaves) at +80 or +120 ms.

### 3.4 · What H7 found open on pass 6's B′, re-read

| H7 placement | here |
|---|---|
| Chromium dark W3 `swap-long` [faces] 1.5 px (P3, R1) | 0 px, 11 samples (6 in flight). R1 and P3 PASS |
| B′'s hole, 2-4 cast frames ×36 | §3.3 |
| B′ W·l `retarget·120` [splice] NR | splice 0 in every cell |

---

## 4 · The strips and the facility frames

`filmstrips/<engine>-<theme>/strip-*.png` (main run) and `rerun{1,2}-strip-*.png`; `FM.json` beside them. Read: Chromium light `first-expand`, `warm-collapse`, `swap-long`; Playwright WebKit dark `warm-expand` (the red main).

- **In order.** First expand: "H P", "H P 2", "H P 2 3 | Play", "H ↄ 2 3 | Play Settings", "H 1 2 3 …": every slot between full-ink neighbours holds ink on every tile. Warm collapse: "1" fades on tile 4 and the arriving "P" is in on tile 5. Swap-long: "A" fades to a stroke as "C" comes in; "B" fades under "ɔls" as "Tools" arrives; no slot empty on any tile.
- **No hard-cut glyph.** Every seam edge inside the plate is a ramp (stub 0 ×4; narrowest 7.71-7.82 px against 2). The plate's own edge still cuts ("Squa", "Se", "Sc"), as H6-1 allows.
- **Soft partials** remain as pass 6 recorded them ("ↄ", "ɔls", a faint "\" of "A"): §P6-2 ruled them not B2 in pass 7; the owner's glance (§P6-6) stands.
- **Playwright WebKit dark `warm-expand`, main (load 42.9):** tiles 4-5 read "H _ 2 3 | Play Settings Sc", the same frame twice (the page painted nothing new for 40 ms); tile 6 is "H 1 2 3". Both re-runs read 0.
- Material: L1 frames (`l1/`) read as pass 6's, flat and deft, one soft shadow, a hairline edge, no rim or glow (O-87).

Facility frames: `facility/<engine>-<theme>/frames/` (C1 shapes and corners, C2 morph steps h and v, C7 narrow, C8 outside-press, C9 short-coarse).

---

## 5 · Open, placed

| item | evidence | note |
|---|---|---|
| Playwright WebKit, display resolution: the slot behind a leaving unit is empty for 2 frames (19-21 ms) in 4 of 36 probe runs at load 27-34; 1 frame in the rest | §1.1, `si/` | the probe is a DOM model and enters no row; H7-1 passes. The low-load re-read reproduces it: a 2-frame cast hole at load 13.55 and probe runs of 2-3 frames (§1.1). So in Playwright WebKit the hole is shortened (2-4 cast frames ×36 reads → ≤ 1 in 69 of 72, 2 in 3), not closed. The remaining frame is structural in both engines: the one frame between a leaving unit reaching its sliver cut and the arriving unit's first uncovered edge (`REVEAL_GAIN`'s first step) |
| W·d FM `warm-collapse` re-run 2: 2 cast frames (load 31.1) with a PASS main and re-run 1 | §3.1 | PASS by H7-3; recorded |
| R2 margin narrowed from 0.133-0.142 to 0.100-0.126 | §3.2 | the sweep finishes faster at the end of the exchange, so a leaving unit's last one-frame drop is larger; inside the bound in every cell |
| boot graph margin 419 B (pass 6: 589 B) | §2 | the sweep, the lead rule and `dt` cost 170 B |
| 4× lead at 40 seats: 3 frames over 25 ms in two of three runs at load ≤ 15 (pass 6: 1 in each) | §2, `cost/` | obligation 3, not met on this cell; not diagnosed. Re-read beside a `bp6` cost run in one session before laying it on the sweep |
| CASES `case·rotated` (outside the 38) | battery | 6/6 in both engines (light; CASES runs in the light slot) this run |
| real Safari | — | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted |

## 6 · Fences, as kept

- **Three deployments.** The first (2026-10-21 07:4x-10:15) built `c1`-`c8` and started the battery on `c8`, and died at the usage limit inside Chromium dark; the second (14:01-14:15) tried `c9`, reverted to `c8`, and died. Both left `.claude/worktrees/bl/D2/p7/Bp-proto/` (a worktree at `067e8e6d1` and archive trees). This entry reconstructed `c8` from the first deployment's `c8-vs-p6.diff` (byte-equal to the worktree's files), removed the old worktree (`git worktree remove --force`), added a new one at HEAD `c085f3b0b`, applied floor v5 and pass 6's patch, and placed `c8`'s two files. Every reading above is from this entry's builds.
- Every build and run used that worktree, with `node_modules` a directory of per-entry symlinks into the checkout's (the checkout has no `tests-visual/node_modules`), so vite's caches and F7's `dist/` and `dist-demo/` stayed in the worktree; the reference trees (`ref`, `ref3`, `ref5`, `ref6`, `chk`) are archives patched with repository discovery fenced (`GIT_CEILING_DIRECTORIES`). Git writes: `worktree remove` and `worktree add` only.
- Writes to the checkout: this file, `pass-7/D2-Bp-proto.patch` (copied, so its sha256 is the measured patch's) and `pass-7/D2-Bp-proto-records/`. No tracked file was edited.
- Every build, test and browser run went through `~/.claude/guard/guarded`, one heavy run at a time; browser runs never `--light` (PR, source-only, `--light`); Playwright WebKit under `--exclusive webkit`, queued, never cancelled (lock waits: the battery slots under 2 min each; the probe slots 35 and 27 min; the low-load slots 0 min). Playwright's default headless shell, no GPU args, no browser MCP, one browser per run, a fresh context per cell, everything closed in `finally`. No WebKit page close; no zone refusal. Nothing under `~/.claude` was read.
- Real Safari and headed runs: none (owner-run).
- At the close the worktree was removed (`git worktree remove --force`) and the whole seat directory `.claude/worktrees/bl/D2/p7/Bp-proto/` deleted (builds, witness output, reference trees, the first deployments' leftovers). Every record above is under `pass-7/`. No process of this seat remains; `git status` shows no tracked file modified by this seat (the modified `design/tile/harness/` files are another seat's).
