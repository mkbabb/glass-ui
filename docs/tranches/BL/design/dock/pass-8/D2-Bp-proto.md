# D2-B′ prototype, pass 8: the handoff

Seat: D2 pass-8 B′ prototype. Model: claude-opus-5-5 (Opus). Base: HEAD `38f68098f` + `pass-6/floor-v5.patch` (`cba6bdc2…`); no floor v6, no merge into the base. Built from `pass-7/D2-Bp-proto.patch` (`184a9715…`). Harness: H8 as landed (`lib a7b99121`, `cells e125c750`, `battery 85b4a8af`, `selftest 9a68cc40`; `records/harness-at-start.sha256`).

| | |
|---|---|
| patch | `pass-8/D2-Bp-proto.patch`, sha256 **`b1ea7d86e23a83ea0770898ee1b0500a27baf5b6517d9003ce4d95653a8d4320`**, 61 files, +2,487 / −2,406. `git apply --check` clean on a `git archive HEAD` tree + floor v5; applied, the tree equals the build tree (`src`, `demo`, `tests`, `docs/design`). Re-checked clean at return on HEAD `e5c8ef036`; the commits since `38f68098f` change nothing under `src`, `demo`, `tests` or `docs/design` |
| against pass 7 | one file: `src/components/dock/composables/useDockScene.ts` (`records/vs-p7-useDockScene.diff`, 168 lines) |
| records | `pass-8/D2-Bp-proto-records/`: `battery/` (every stage log with its load, re-runs, `json/`, `slots.log`), `chain.log` (every stage, stop and note), `battery-low/` (the Playwright WebKit columns re-read at load 6.6-19.7), `digest/` (`-p8bp-low[-ruled]`, the score of record; `-p8bp[-ruled]`, the battery under load), `F7-bp/` (with `menu-ab/`), `F7-low/`, `PR-bp/`, `ab-w3/` (Playwright WebKit W3 A/B against `bp7`), `si/` (the display-frame slot probe), `cost/`, `filmstrips/`, `diag/` (the per-frame traces behind §1), `scripts/`, and three `superseded-*/` folders (§1.4) |

---

## 0 · In brief

- **B2's hole is gone, in both engines, at display-frame resolution.** The registry placed the cause at `REVEAL_GAIN`'s first step. The trace places it more exactly: at a same-place exchange the leaving "P" and the arriving "1" share one 40 px box, and the splice law's one-advance clip gap plus the two mask ramps leave about 10 px of front travel where neither glyph has ink (§1.1). The cure closes the leaving unit's two fronts on the place's middle and gives the arriving unit, on the frame of the cut, the part the leaving unit gave up. It is keyed to the leaving unit's fronts, with no constant tuned to the cast.
  - FM: 0 hole frames in all 72 reads (six B2 cells × main and two re-runs × four columns).
  - The slot probe, per display frame: bp8 reads 0 empty frames in 72 of 72 runs, both engines and both themes. bp7 reads 1-3 on every first-expand and warm-expand run in the same guarded run (§3.3).
- **The 38 rows: 38/38 ruled, 36/38 default (P1 and P3 OWNER-BLOCKED).** This is the score of record, and pass 7's record reads the same. It is read with Playwright WebKit both themes at load 6.6-19.7, F7 at 15.3, and Chromium from the battery (§2.3). The H8 baseline for bp7 ran at load 13-31 and read 37/38, with B2 open.
  - The battery itself ran at load 30-52 and read 33/38 ruled. P3, R1, R2 and R7 were red in WebKit on `first-expand`/`swap-long` [lanes], `retarget·80` [vanish] and `wide·collapsed-rest` [faces]. F7 was red on `menu/contract.test.ts`.
  - None of those reds appears in the low-load re-read. In a paired A/B at the battery's load, bp7 shows every one of those classes, 12 red cells per build over six W3 reads (§4). They are load-borne.
- **Obligation 3:**
  - Boot graph 503,629 B against 503,808 B, **margin 179 B** (pass 7: 419 B). The handoff costs 240 B in the scene chunk.
  - Cost, bp8 / bp7 / fv5 alternating in one session, three runs each at load 8.5-14.0: bp8 reads 9 frames over 25 ms across the four 4× rows, bp7 8. The difference is all on 4× expand at 20 seats: bp8 1 in each run (worst 28.6-31.8 ms), bp7 1 in one run (22.4-25.2 ms). Read literally, the obligation is short there by 2 frames; every other row is equal or lower (§3.4).
- **Obligation 4:** PR 6/6, `prose·harness` 0. The header drops "keeps pace with its neighbours". The new "The handoff." paragraph states what the cure makes true: every frame of the exchange shows one of the two on that place.
- **Open for the critic:**
  - Cost on 4× expand at 20 seats (above).
  - FM `content-add` [stub], one frame in 2 of 15 reads on this tree, one per engine: C·l re-run 1 at 34.06 and W·d low re-run 2 at 7.19. Both are NOT-REPRODUCED by H7-3. The H8 baseline on bp7 read none, so this may be the patch's.
- **Seat verdict: ADVANCE, clean on the 38 at the baseline's load.** B2 is cured, with 0 empty display frames in 72 of 72 runs. Obligation 3's cost row and the `content-add` stub are the two things the critic must read.

---

## 1 · The cure

### 1.1 · The cause, from the trace

`diag/trace-bp7-chromium.log` reads every rAF frame of the first expand on `bp7`: each seat's clip, mask ramp and glyph extent.

The "P" (leaving) and the "1" (arriving) sit in one 40 px box, with glyph ink at about 13.5-26.5 and 14.6-25.4 box-local, and a seam of 10.86 px. Pass 7's sweep moves P's start front f across the box. The splice law holds "1"'s edge one advance behind it (b = f − (seam + 1 px)). Each cut edge carries a one-advance mask ramp, and "1" paints nothing until b ≥ seam.

So P's ink falls below 0.1 at f ≈ 21, and "1"'s reaches 0.1 only at f ≈ 31. That is about 10 px of front travel with the slot showing neither: 1-2 display frames at the sweep's speed (≈ 4 px per 8 ms frame). Chromium shows it for a frame. WebKit holds or repeats it into the cast.

`REVEAL_GAIN`'s step is where the gap ends, not its cause. R2's vanish bound (≤ 0.5 of a unit's clip area in one frame) rules out cutting P while one front still crosses its ink.

### 1.2 · What the patch does (`useDockScene.ts`)

- **`arm()`**: an arriving unit centred on the leaving unit's place (the existing tie test, |end| ≤ `TOUCH_PX` after both tie-breaks) is its **heir**. When nothing arrives on the far side (de = 0), the leaving unit's path becomes `lead [0,0]`, `to [c,c]` (c = w/2 clamped to [s0,e0]): its two fronts close on the place's middle. The heir rides on the existing path object.
- **`exitFronts()`**: on an heir path each front takes half the sweep (`d = x.d / 2`). The unit keeps the ink at its middle to its last frame, and is cut below its seam no sooner than one front alone would cut it, so R2's per-frame drop is unchanged in kind.
- **The leaving loop in `write()`**: on the frame a heir path reaches its sliver cut, the unit paints nothing and records the span it gave up (`gift`). Units without an heir behave exactly as in pass 7.
- **The reveal limiter**: the heir's reveal is at least the part given up that frame (`cs = max(cs, min(eased_s, g0 − box.lo))`, the same at the end), so it takes the place on the same frame and eases on from there. The gift is confined to the heir: a unit arriving at a different place never takes another unit's span (the `c1` lesson, §1.4).

**Prose**:
- The header's "keeps pace with its neighbours" is removed.
- A new paragraph, "The handoff.", states the law. Its last sentence is "Every frame of the exchange shows one of the two on that place."
- The comments at the leaving loop and the reveal limiter state their own laws.
- No harness id or cell name appears (PR `prose·harness` 0). Against the pass-7 tree, `src/` carries no new id of any form (§5).

### 1.3 · R6 and R2 under the cure

- **R6** (splice, sliver, stub): 0 in every reproduced read of every column.
  - Three single `splice` reads, none reproduced: C·l `retarget·80` main (load 48.59, both re-runs PASS), W·d `retarget·80` re-run 1 (52.01, the cell is red on `vanish`, §2.2), and W·l `retarget·80` A/B read 1 (38.67).
  - The H8 baseline read the same `retarget` [splice] class on bp7: W·l `retarget·80` at 23.92 and W·d `retarget·120` at 17.93, both NOT-REPRODUCED.
- **R2** (the leaving vanish bound, 0.5), worst first-leaving drop outside the retarget cells:

| column | worst | cell, load | margin |
|---|---:|---|---:|
| C·l | 0.371 | `swap-long`, 35.43 | **0.129** |
| C·d | 0.371 | `swap-long`, 35.47 | **0.129** |
| W·l | 0.425 on every read but one; 0.765 | `warm-expand` re-run 1, 38.81; `swap-long` re-run 2 at 45.88, with `lanes` (§2.2) | 0.075; over |
| W·d | 0.411 on re-runs; 0.524 | `warm-collapse` main at 38.89 [vanish, lanes], re-runs PASS (NOT-REPRODUCED) | 0.089; over (NR) |

- Pass 7's margins were 0.116 / 0.126 (Chromium) and 0.100 / 0.100 (WebKit). Chromium is 0.003-0.013 wider. WebKit is narrower, and over the bound on two reads, both with `lanes` (the long-frame class, §2.2).
- `retarget·80` [vanish] (0.54-0.58 on the main reads) is red in WebKit on both builds (§4).

### 1.4 · The builds this seat made and set aside

| tree | patch | what it showed | records |
|---|---|---|---|
| `c1` | — | gift taken by any unit arriving: W3 `swap-long` [lanes] in Chromium (a different-place unit went to identity). Gift confined to the heir | `diag/pre-c1.log` |
| `96111a38…` (pace and gift, before the heir restructure) | `superseded-96111a38/` | full battery at load 12-23, every FM read 0 hole frames, slot probe bp8 0 in all 36 runs vs bp7 1-4. **F7 boot graph 503,961 B, −153 B over the ceiling.** Restructured into the heir path (`c4`, this patch), −332 B | `superseded-96111a38/` |
| `c5`, `11dbf301…` | the lane floor: each heir front at least lane² of its way, so the handoff lands before the lane under long frames | Chromium `retarget·40` [splice] s1\|s4 at 7.8-8.4 px in 3 of 4 reads (and in 2 of 3 battery reads, C·d). Built after the A/B tied the WebKit `lanes` reds to the lane's 33.3 ms `dt` cap against the sweep's 16.7 ms step. Reverted | `superseded-11dbf301/` |
| `c6`, `b2316583…` | `c5` + both heir edges cut | `retarget·40` [splice] 3 of 5 reads, and new `first-expand`/`warm-expand` [splice] s8\|s3 at 10.0-10.4 px. Reverted | `superseded-b2316583/` (with `rt40-c6-chromium.log`, the per-frame trace) |

The tree of record is `c4`. Its patch, remade after the reverts, is byte-equal to the `c4` patch the battery ran (`b1ea7d86…`).

---

## 2 · The 38 rows under H8

### 2.1 · Slots

| slot | start → end | cells' load (with re-runs) |
|---|---|---|
| PR, F7 | 18:34 → 18:43 | 38.43; F7 45.28 |
| bp8 · Chromium · light | 18:43 → 19:01 | 32.29-50.15 |
| bp8 · Chromium · dark | 19:01 → 19:23 | 30.88-48.41 |
| bp8 · Playwright WebKit · light | 19:23 → 19:50 | 32.03-50.15 |
| bp8 · Playwright WebKit · dark | 19:50 → 20:21 | 33.09-52.01 |
| `fmlow` light | try 1 admitted at **6.46** (04:01:17), after a 107-min WebKit lock wait (queued 02:13:40) | 5.57-9.2 |
| `fmlow` dark | try 1 admitted at **9.37** (05:13:32), after a 70-min lock wait | 8.85-12.78 |

No slot split, no WebKit page close (each FM run opens one browser, a fresh context per cell), no zone refusal. The 1-minute load stayed between 30 and 50 for the whole battery; the H8 baseline for bp7 ran at 13-31.

### 2.2 · Per row, the battery under load (ruled; default beside it)

From `digest/table-p8bp-ruled.md`, `rows-p8bp-ruled.md`, `counts-p8bp*.md`. C = Chromium, W = Playwright WebKit, ·l / ·d = light / dark. P = PASS, NR = NOT-REPRODUCED.

| row | C·l | C·d | W·l | W·d | ruled | default | note |
|---|---|---|---|---|---|---|---|
| P1 | P | P | P (NR 1) | P | **PASS** | FAIL | W1 `card·warm-expand` [card] W·l NR on the ruled read; Q-12 (b). C·d UM 3: W1 `morph`/`vmorph` screenshot samples starved under load (`moves` < 3) |
| P2, P4, P5 | P | P | P | P | PASS ×3 | PASS ×3 | |
| **P3** | P (NR 1, UM 2) | P | **F** | **F** | **FAIL** | FAIL | W·l `first-expand`, `swap-long` [lanes], `retarget·80` [vanish], `wide·collapsed-rest` [faces]; W·d `retarget·80` [vanish], `wide·collapsed-rest` [faces] |
| F1-F5 | P | P | P | P | PASS ×5 | PASS ×5 | |
| F6 | P | P | P | P | PASS | PASS | 0 crashes; UM 17 (W8 `consumer·*` 12, the value.js fence, plus the 5 starved samples) |
| **F7** | source | | | | **FAIL** | FAIL | 12/13: f7·units, `tests/components/menu/contract.test.ts` (focus restore). Boot graph and every gate PASS (§3.1) |
| N1-N5 | P | P | P | P | PASS ×5 | PASS ×5 | N5 with PR 6/6 |
| **R1** | P (UM 1) | P | **F** | **F** | **FAIL** | FAIL | `wide·collapsed-rest` [faces] "no plate painted", main and both re-runs W·l (34.86, 43.49, 40.63); W·d main and re-run 2 (37.94, 33.37) |
| **R2** | P | P | **F** | **F** (NR 1) | **FAIL** | FAIL | `retarget·80` [vanish] W·l main 0.565 (36.83), re-run 2 0.544 (45.09); W·d main 0.576 (35.85) |
| R3-R5 | P | P | P | P | PASS ×3 | PASS ×3 | |
| R6 | P (NR 1) | P | P | P | PASS | PASS | §1.3 |
| **R7** | P | P | **F** (NR 2) | P (NR 1) | **FAIL** | FAIL | `first-expand` [lanes] W·l main and re-run 2 (35.65, 46.48); `swap-long` [lanes] main and re-run 2 (35.76, 45.88); `warm-expand`, `reversal` NR |
| R8 | P | P | P | P | PASS | PASS | |
| B1, B3 | P | P | P | P | PASS ×2 | PASS ×2 | PR 6/6 |
| **B2** | P | P | P | P | **PASS** | PASS | hole 0 in every read (§3.2); stub 0; strips (§3.5) |
| C1-C9 | P | P | P | P | PASS ×9 | PASS ×9 | C6 W·l `c6·menu` [escape] NR |
| L1 | P | | P | | PASS | PASS | |

**Counts**

| digest | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| **ruled (O-103)** | **33/38** | **31/36** | **20/24** | P3, F7, R1, R2, R7 |
| default | 32/38 | 30/36 | 19/24 | P1, P3, F7, R1, R2, R7 |
| H8 baseline, pass 7's B′ (load 13-31) | 37/38 | 35/36 | 23/24 | B2 |

Outside the 38: CASES `case·rotated` [jerk] W·l, as in earlier passes.

**The `lanes` + `vanish` pair (W·l `swap-long` re-run 2, W·d `warm-collapse` main).** An icon button's clip goes from a 40 px residue to identity with a previous step of 0. Under long WebKit frames, the body's lane advances on a `dt` capped at 33.3 ms while the sweep steps at most 16.7 ms. The lane can land before the handoff, and the episode's end shows the heir whole. `c5` was the cure for this, and it cost a Chromium splice (§1.4). bp7 shows the same `lanes` class at this load (§4).

### 2.3 · The score of record: Playwright WebKit and F7 re-read at the baseline's load

`scripts/chain6.sh` started each step only at a 1-minute load ≤ 31, the top of the H8 baseline's range:
- F7 on the tree.
- The battery's Playwright WebKit `theme` slots, light and dark, every witness, red cells re-run twice and FM's B2 cells three runs each, into `battery-low/`.

`scripts/digest-low.sh` assembles a records view of symlinks under `out/`: Chromium from `battery/`, WebKit main/rest/dark/darkrest from `battery-low/`, WebKit `fmlow` from `battery/`, and F7 from `F7-low/`. It runs `cells.mjs` over that view with tag `p8bp-low`. Chromium is not re-read, because every Chromium cell of the 38 already read PASS or NOT-REPRODUCED under load (§2.2).

| slot | start → end (lock wait inside) | cells' load |
|---|---|---|
| F7 | 05:24 → 05:25 | 15.31 |
| bp8 · Playwright WebKit · light | queued 05:25, admitted about 06:44 (a 78-min lock wait) → 06:55 | 8.37-13.14 |
| bp8 · Playwright WebKit · dark | queued 06:55, admitted about 08:30 (95 min) → 08:41 | 6.58-19.73 |

| reading | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| **ruled (O-103), the score of record** (`table-p8bp-low-ruled.md`) | **38/38** | **36/36** | **24/24** | — |
| default (`table-p8bp-low.md`) | 36/38 | 34/36 | 22/24 | P1 (OB, Q-12), P3 (OB, Q-4) |
| the battery under load, ruled (§2.2) | 33/38 | 31/36 | 20/24 | P3, F7, R1, R2, R7 |
| pass 7's record (ruled / default) | 38/38 / 36/38 | | | |
| H8 baseline, bp7, ruled | 37/38 | 35/36 | 23/24 | B2 |

**WebKit at low load:**
- W3 29/33 PASS with 4 OB (light) and 27/33 with 6 OB (dark), every OB `window` alone, so (c) holds. 0 FAIL, and no re-run was needed.
- `retarget·80` vanish 0.349. `wide·collapsed-rest` faces PASS. `first-expand` and `swap-long` lanes PASS.
- W1 19/22 + 3 OB, W6 3/4 + 1 OB, W8 6/9 + 3 UNMEASURED (`consumer·*`, the value.js fence). CF 16/16, ST 10/10, R5 4/4, W2 8/8, W4 13/13, W5 6/6, W7 20/20, L1 6/6, CASES 6/6, R6 2/2.
- FM 6/6 in each theme, 0 hole frames in all 36 B2 reads. The one red is FM `content-add` [stub] on W·d re-run 2 (load 7.19), NOT-REPRODUCED: main and re-run 1 PASS.

**F7 at low load:** 13/13. f7·units 232 files, 2,241 tests, 0 failing; the menu file passes.

**R2 at low load** (worst one-frame leaving drop over every W3 cell, the retarget cells included; bound 0.5): W·l 0.402 (`retarget·40`, 9.34), margin **0.098**; W·d 0.411 (`first-expand`, 13.21), margin **0.089**. Chromium 0.371, margin **0.129** (§1.3). Pass 7's margins were 0.116 / 0.126 (Chromium) and 0.100 / 0.100 (WebKit). Chromium is wider by 0.003-0.013; WebKit is narrower by 0.002 and 0.011.

---

## 3 · B2, F7, PR and cost

### 3.1 · F7 and PR

- F7 `wt` 12/13 (load 45.28): typecheck, both builds and all ten gates PASS. f7·units 232 files, 2,241 tests, one failing: `menu/contract.test.ts` (DropdownMenu click branch restores focus on execute).
  - Re-runs of the file: 1 PASS, 1 FAIL (`F7-bp/units-menu-contract-rerun{1,2}.log`).
  - Same-session A/B at load 32-44 (`F7-bp/menu-ab/`): bp7 fails it 1/4, bp8 1/4. It is load-borne and not this patch's; the patch does not touch the menu.
  - **At load 15.31 (`F7-low/`): 13/13, 0 files failing.** This is the F7 of record (§2.3).
- Boot graph: 64 files, **503,629 B, ceiling 503,808 B, margin 179 B**. Scene chunk 21,325 B against bp7's 21,085 B (+240 B).
- PR 6/6: `prose·harness` 0, `prose·citations` 0, `prose·readers` 65 / 0 without a reader.

### 3.2 · FM: H7-1 hole frames per cast (H8-1 class read)

| column | the six B2 cells × main · re-run 1 · re-run 2 | load |
|---|---|---|
| C·l | 0 in all 18 | 32.29-40.02 |
| C·d | 0 in all 18 | 33.88-44.23 |
| W·l | 0 in all 18 | 41.28-48.87 |
| W·d | 0 in all 18 | 34.29-39.10 |
| `fmlow` W·l (admitted 6.46) | 0 in 17 of 18; `warm-collapse` re-run 1: one frame at slot 5 (not the exchange's slot 2), +0 ms, ink 0.097 against 0.1, inside the one-frame bound | 5.57-9.2 |
| `fmlow` W·d (admitted 9.37) | 0 in all 18 | 8.85-12.78 |

**108 reads over all six columns: no run over one frame, and no hole at seat 2's slot.** B2 PASS in every column (W·l 46/46, W·d 46/46 with `fmlow`). The H8 baseline on bp7: B2 FAIL in W·l and W·d (two or more reads over one frame at seat 2's slot, per column).

### 3.3 · The display-frame slot probe (`si/`)

`scripts/slotink.mjs` reads every rAF frame of the six sequences. A frame is empty for a slot when the slot reads < 0.1 and its final neighbours read ≥ 0.9 (H7-1's rule per display frame). bp8 and bp7 run in one guarded run per engine and theme, three runs each.

| column | bp8: longest empty run, every sequence and run | bp7: first-expand · warm-expand · the other four | load |
|---|---|---|---|
| C·l | **0** (18 of 18) | 2,2,2 · 2,1,2 · 0 | bp8 31.94-35.75, bp7 33.67-39.5 |
| C·d | **0** (18 of 18) | 1,1,1 · 2,2,2 · 0 | bp8 31.9-37.74, bp7 35.38-50.42 |
| W·l | **0** (18 of 18) | 1,2,3 · 1,1,2 · 0 | bp8 20.7-25.19, bp7 17.16-20.73 |
| W·d | **0** (18 of 18) | 1,1,1 · 1,1,2 · `swap-long` 0,0,2 (slot C at +169 ms), others 0 | bp8 15.67-19.57, bp7 15.48-18.45 |

**Target 0, met: 72 of 72 bp8 runs read 0 empty display frames.** Every bp7 run of `first-expand` and `warm-expand` reads 1-3, in both engines and both themes, at seat 2's slot at +122 to +141 ms (the "P" → "1" exchange). The two engines were read at different loads, but within each engine bp8 and bp7 ran in one guarded run, alternating by build. The WebKit lock wait for the dark run was 110 min (queued 00:21:55, admitted 02:11:53), waited out.

### 3.4 · Cost (`cost/`, obligation 3)

`scripts/cost.sh`: `pass-2/D2-Bp-probes.mjs --arm pcost,plead`, Chromium traced, bp8 → bp7 → fv5 × 3. Each run is guarded with the CPU renice off (`--cpu-cores 0`) and starts only at a 1-minute load ≤ 15. The session ran 05:15-05:24, every cell at load 8.46-14.02 (`cost/summary.txt`). Each cell reads frames over 25 ms / worst frame ms / main-thread ms per frame.

| row | bp8 r1 · r2 · r3 | bp7 r1 · r2 · r3 | fv5 r1 · r2 · r3 |
|---|---|---|---|
| 4× expand, 20 seats | 1/31.8 · 1/28.6 · 1/30.1 (0.95-1.03 ms) | 1/25.2 · 0/23.1 · 0/22.4 (0.88-0.94) | 0/11.0 · 0/10.9 · 0/23.0 |
| 4× expand, 40 seats | 1/33.6 · 1/43.2 · 1/30.8 (1.25-1.43) | 1/41.8 · 1/29.9 · 1/30.7 (1.29-1.38) | 0/15.8 · 0/21.5 · 1/29.4 |
| 4× lead, 20 seats | 0/21.8 · 0/23.0 · 0/22.9 (1.38-1.45) | 0/22.8 · 0/19.5 · 1/29.0 (1.40-1.43) | 0/11.5 · 0/16.0 · 0/10.7 |
| 4× lead, 40 seats | 1/37.0 · 1/43.3 · 1/29.9 (1.49-1.71) | 1/36.0 · 1/28.4 · 1/30.1 (1.62-1.73) | 0/10.2 · 0/15.4 · 0/16.6 |
| frames over 25 ms, the four rows | **9** | **8** | 1 |

- The expand rows hold one frame each, the trigger frame, as in pass 7.
- bp8's 4×/20 expand trigger frame runs 28.6-31.8 ms against bp7's 22.4-25.2, so it crosses 25 ms where bp7's mostly does not. At 40 seats the two read alike (30.8-43.2 against 29.9-41.8). Per-frame main-thread time is equal within 0.1 ms on every row.
- The obligation's test (no more frames over 25 ms than bp7 at matched load) fails on 4×/20 expand, 3 against 1. With three runs and frames at the threshold it may be noise or a real 5-6 ms trigger cost. The critic's repeat is the place to read it (§6).
- fv5 r3's two lead rows come from its log (`costsum.mjs` did not print them).

### 3.5 · The strips (`filmstrips/`)

`scripts/strips.sh`: one FM run per engine and theme on bp8 (c4), 24 strips (`<theme>-strip-<engine>-<cell>.png`), every FM cell PASS, load 6.5-11.7. Read by eye, the slot where "P" and "1" exchange:

| strip | reading |
|---|---|
| first-expand, Chromium light | "H P" → "H P 2" → "H P 2 3 \| Play" → "H P 2 3 \| Play Settings" → "H 1 2 3 \| Play Settings Squar…" (the plate's edge) → rest. P stands whole until the frame "1" stands whole |
| first-expand, Playwright WebKit light | "H P 2 3 \| Play" → "H P(fading) 2 3 …" held for two cast frames → "H 1 2 3 …". The held frames show the leaving P; pass 7's held frame was empty |
| warm-expand, Playwright WebKit light | "H P 2 3 \| Play S" → "H P(fading) 2 3 …" → "H 1 2 3 …" |
| warm-collapse, Chromium dark | "H 1 2 3 \| Pla" → "H P(arriving, its ramp mid-glyph) 2 3" → "H P 2" → "H P" |
| warm-collapse, Playwright WebKit dark | "H 1 2 3" → "H 1(fading) 2 3" → "H P 2" → "H P" |

No strip shows the slot empty, and no glyph is cut hard inside the plate. The partial glyphs are at the plate's own edge or under the one-advance ramp, which D-1 and D-2 allow.

---

## 4 · The Playwright WebKit W3 A/B (`ab-w3/`)

`scripts/ab-w3.sh`: in one `--exclusive webkit` slot per theme, bp8 and bp7 alternate × 3, the whole W3 witness each time. Light 21:15-21:24 (load 32.17-45.33), dark 21:31-21:40 (34.14-48.18).

| class (cell) | bp8 light | bp7 light | bp8 dark | bp7 dark |
|---|---|---|---|---|
| `retarget·80` [vanish] | 2/3 | **3/3** | 1/3 | 2/3 |
| `wide·collapsed-rest` [faces] | 3/3 | 2/3 | 2/3 | 1/3 |
| [lanes] | `first-expand` 1/3, `swap-long` 1/3 | `reversal` 1/3 | `swap-long` 1/3 | `first-expand` 1/3, `warm-expand` 1/3 |
| other | `warm-expand` [vanish] 1/3; `retarget·80` [splice] 1/3 | `swap-long` [leaving] 1/3 | — | `first-expand` [stub] 1/3 |
| red cells in all | 8 | 7 | 4 | 5 |

Each build reads 12 red cells over six W3 runs. Every class the battery shows red on bp8 is red on bp7 in the same slot at the same load. The H8 baseline read none of them on bp7 at load 13-31. They are load-borne, not the patch's. bp8's one `splice` (W·l, 38.67) has no counterpart on bp7 here; the H8 baseline read that class on bp7 too (§1.3).

---

## 5 · Obligations (REGISTRY §P7-7.3)

| # | obligation | status | evidence |
|---|---|---|---|
| 1 | B2: no empty display frame at the exchange; keyed to the leaving front; R6 and R2 held, R2's margin reported; the probe at 0 | **MET** in both engines | FM no run over one frame and no seat-2 hole in 144 reads (§3.2, §2.3). Probe bp8 0 in 72 of 72 runs; bp7 1-3 on every first-expand and warm-expand run (§3.3). R6 0 reproduced. R2 margins 0.129 (Chromium), 0.098 / 0.089 (WebKit at low load), §1.3, §2.3 |
| 2 | Keep every pass-7 row | **MET at the baseline's load** | 38/38 ruled, 36/38 default, as pass 7's record (§2.3): Chromium B2, the mask ramp, no opacity write (the patch adds none), R8, C1-C9, PR 6/6, L1 6/6 per engine. Under load 30-52 the battery read 33/38, with every red class shared with bp7 in the A/B (§2.2, §4) |
| 3 | Boot graph under its ceiling with a margin; cost in one session at load ≤ 15 | boot graph **MET**, margin 179 B. Cost **NOT MET on one row**: 4× expand at 20 seats, 3 frames over 25 ms against bp7's 1; the other three rows equal or lower; 9 against 8 in all | §3.1, §3.4 |
| 4 | No harness id in `src/`; the header states only what the cure makes true | **MET** | PR 6/6; no new id against the pass-7 tree; §1.2 |

---

## 6 · Open, placed

| item | reading | place |
|---|---|---|
| FM `content-add` [stub] | one stub frame in 2 of 15 `content-add` reads on this tree: C·l re-run 1 (34.06), W·d low re-run 2 (7.19). NOT-REPRODUCED each time by H7-3. The H8 baseline on bp7 read none. Seen once on `c5` too | the critic reads `content-add` across columns, as H8-1 reads the hole. If it holds, the patch owns it: the arriving extra item and the heir's gift are the first suspects |
| the long-frame handoff (`lanes` + `vanish` on one read each, load 38-46) | the lane's 33.3 ms `dt` cap against the sweep's 16.7 ms step; absent at low load; bp7 reads the same `lanes` class under load (§4); the lane-floor cure (`c5`) cost a Chromium splice | recorded; under load only |
| the battery under load, 33/38 | every red class shared with bp7 at the same load; none at the baseline's load | recorded |
| F7 units `menu/contract.test.ts` | 1/4 on both builds at 32-44; PASS at 15.31 | recorded |
| boot-graph margin 179 B | pass 7: 419 B | stated |
| cost, 4× expand at 20 seats | bp8's trigger frame 28.6-31.8 ms against bp7's 22.4-25.2, at load 8.5-14 | the critic's matched-load repeat; if it holds, the next build pass finds the trigger frame's extra work |
| real Safari | UNMEASURED (owner's safaridriver checkbox) | owner |

---

## 7 · Fences, as kept

- Writes in the checkout: only `pass-8/D2-Bp-proto.patch`, `pass-8/D2-Bp-proto.md` and `pass-8/D2-Bp-proto-records/`. No git write but the worktree add and remove. The worktree is removed (`git worktree remove --force`). **The rest of `.claude/worktrees/bl/D2/p8/Bp-proto/` (459 MB: `out/`, `ref3/`, `ref5/`, `ref7/`, `chk/`; build outputs and plain reference trees, no git metadata) is still on disk.** The permission system refused the seat's `rm -rf`, and it is the owner's to remove.
- Every build, test and browser run went through the guard, browser runs never `--light`, WebKit always `--exclusive webkit`. One heavy run at a time, with these exceptions:
  - One `c3` build overlapped the chain's Chromium probe.
  - A brief typecheck (`npx tsc`) ran unguarded during development.
- The first menu A/B attempt ran its vitest in the checkout's cwd: zsh did not split `set -- $t`. Nothing was written to the checkout (checked), and the A/B of record ran in the worktrees.
- Chain stops, each logged in `chain.log`, none during a run or while holding a lock:
  - chain (96111a38) after the boot-graph FAIL.
  - chain (c4) in `fmlow`'s pre-lock wait, for the A/B.
  - chain2 in `fmlow`'s pre-lock wait, for `c5`.
  - chain3 while its WebKit light slot was **queued** for the lock: the build was superseded, so no witness had run. This was not a cancel for the wait.
  - chain4 stopped itself on the splice gate.
  - Chain5 (probe, `fmlow`, cost) and chain6 (F7, the WebKit low-load slots, strips) ran to the end. Lock waits: 110 min (probe, dark), 107 min (`fmlow` light), 70 min (`fmlow` dark), 78 and 95 min for the low-load slots. All were waited out, none cancelled.
- Chain3's `out/` cleanup removed the c4 battery's strip PNGs. The JSON and logs are the record; the strips were re-made on the same build (§3.5).
- After the reverts, `bp8` was rebuilt from the `c4` tree, whose patch is byte-equal to the one the battery ran. The probe, `fmlow`, cost, the low-load slots, F7-low and the strips read that build.
- No real-Safari cell; every WebKit number is Playwright WebKit. No zone refusal. No sibling repo written or run; value.js untouched.
