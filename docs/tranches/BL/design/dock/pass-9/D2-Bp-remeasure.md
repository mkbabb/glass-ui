# D2-B′ re-measure, pass 9: the same build, read again

| field | value |
|---|---|
| seat | D2 pass 9 (the confirmation pass), the RE-MEASURE seat for D2-B′ (REGISTRY §P8-7.3). Authored no D2 seat in any pass · model `claude-opus-5-5`, asserted from own system identity · one entry, 2026-10-29 12:15 → 22:41 |
| HEAD | `cff357cbd`. `git diff --name-only 38f68098f HEAD -- src demo tests package.json docs/design` is empty, so the tree under every pass-8 reading is today's |
| inputs read | REGISTRY's pass-7 and pass-8 parts in full (§P7-0..§P7-8, §P8-0..§P8-8); the passes 1-6 parts by heading only (searched for single facts, e.g. §P7-2's comment-edit precedent); `pass-8/H8.md`, `D2-Bp-proto.md`, `D2-Bp-critique.md` in full; the pass-8 critic's scripts; `audit/INBOUND.md` (tail, through O-112) and `FORMATION-PROGRESS.md` (head and the D2 cursor lines) |
| builds (seat worktree, every build guarded) | `bp8` = HEAD + `pass-6/floor-v5.patch` (`cba6bdc2…`) + **`pass-9/D2-Bp-p9.patch`** (this seat's, §1); `bp8ref` = floor v5 + `pass-8/D2-Bp-proto.patch` (`b1ea7d86…`, re-hashed equal), built only to prove step 1; `bp7` = floor v5 + `pass-7/D2-Bp-proto.patch` (`184a9715…`); `fv5` = floor v5; `fv3` = HEAD + `pass-4/floor-v3.patch` (`637d1625…`, L1's reference). Every patch applied clean (`records/apply.log`, `records/scripts/build.sh`). No floor v6, no merge into the base |
| harness | H8 as landed. The per-file sha256 list of `harness/` at this seat's start equals `pass-8/H8-records/harness.sha256` line for line (`records/harness-at-start.sha256`, 42 files), and hashes to **`9d12810bc24d91d2…`**, H8's hash. Every chain stage printed that hash at its start (`records/chain.log`). Adapter `pass-3/adapter-floor-v2.mjs` |
| owner rulings | O-103: Q-4 (c), Q-12 (b), Q-18 (a), Q-15 (a). O-87, O-88 bind. This seat scores no row; the ruled digest (the score of record under O-103) and the default digest are printed beside each other for the critic |
| engines | Chromium (Playwright's default headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| records | `pass-9/D2-Bp-remeasure-records/`: `apply.log`, `build-*.log`, `cmp/cmp.txt`, `bp8-p9-patch.diff`, `bp7-bp8p9-useDockScene.diff`, `F7-bp8/`, `PR-bp8/`, `PR.log`, `chain.log` (every stage, admission and load), `battery/` (the one battery: stage logs, re-runs, `json/`, `slots.log`, `fmlow-*/admit.json`), `battery-reread/` (the Chromium dark slot re-read, §2.1), `st-reread/` (§2.4), `digest/` (`p9rm`, `p9rm-reread`, each `[-ruled]`), `fm-reads.txt`, `filmstrips/` (all 108 bp8 strips), `si/` (display-frame probe), `cost/`, `scripts/`, `harness-at-start.sha256` |

Load is the 1-minute load average beside every timing. "C" is Chromium, "W" Playwright WebKit, "·l / ·d" light / dark.

---

## 0 · In brief

- **Step 1 held: the built bytes are equal.** The header clause is in (§1). `dist/` (841 files) and `dist-demo/` (346 files) built from the pass-9 tree are byte-identical to the `b1ea7d86` tree's own build: `cmp` over all 1,187 files, 0 differ. The harness's scene and demo builds are identical too. F7 13/13, PR 6/6. **The pass stays a confirmation pass.** New patch: `pass-9/D2-Bp-p9.patch`, sha256 **`dd5d9f5f59391b39957ebcc6d733dd3eb120067515bdb2c3f3d9e500a2038ec4`**, `git apply --check` clean on HEAD + floor v5.
- **The battery, one battery, all four columns under H8.** The digests (no row scored here; for the critic):

| digest | 38 rows | first 36 | first 24 | OWNER-BLOCKED rows | cells: PASS / FAIL / NR / OB / UM / RECORD |
|---|---:|---:|---:|---|---|
| ruled (O-103), the battery with the C·d slot re-read (`p9rm-reread-ruled`) | 38/38 | 36/36 | 24/24 | — | 635 / 0 / 2 / 0 / 22 / 12 |
| default, the same (`p9rm-reread`) | 36/38 | 34/36 | 22/24 | P1, P3 | 594 / 0 / 2 / 41 / 22 / 12 |
| ruled, the battery as first read (`p9rm-ruled`) | 38/38 | 36/36 | 24/24 | — | 635 / 0 / 2 / 0 / 22 / 12 |
| default, the battery as first read (`p9rm`) | 36/38 | 34/36 | 22/24 | P1, P3 | 593 / 0 / 2 / 42 / 22 / 12 |

- **B2's hole:** 108 FM reads of the six B2 cells over the four columns and both `fmlow` stages, **0 hole frames**; the C·d re-read adds 18 more, 0. **Stub: 0 reads in every column** (the `content-add` stub did not appear). The display-frame probe reads **0 empty frames in 72 of 72 bp8 runs**, against 24 of 72 bp7 runs in the same guarded runs.
- **Readings beside the rows:** R2 margins 0.118 (C·l), 0.122 / 0.104 (C·d battery / re-read), 0.100 (W·l), 0.102 (W·d). Cost over six rounds at load 4.6-10.5: the four 4× rows total bp8 11, bp7 9, fv5 0 frames over 25 ms; **4× expand at 20 seats: bp8 2 of 6 runs over 25 ms (25.4, 25.3 ms), bp7 1 of 6 (25.2 ms)**. Boot graph 503,629 B, margin 179 B.
- **Three things the critic should read** (none a row; §5): ST's five `stall·nb·*` cells read UNMEASURED by H7-2 in both WebKit themes (the cast's collapsed rest 107 px against the DOM's 102 px), where the pass-8 critic read them measured; the bp8 WebKit `warm-expand` probe run at `minInk` 0.199, the lowest any seat has read on bp8 (pass 8: 0.275); and a witness id in `src/` that PR's regex does not catch (`W3 \`ticking\`` in `useDockContent.ts`, carried since pass 7's B′).

---

## 1 · Step 1: the header clause, and the byte-identical proof

**The edit** (`records/scripts/edit-clause.py`, prose only; seven comment lines in, seven out). In `useDockScene.ts`'s header, "The handoff." paragraph:

```
- // show neither. So the leaving unit's two fronts close on the place's middle, each on half
- // the sweep: it keeps the ink at its middle to its last frame and is cut below its seam no
- // sooner than one front alone would cut it. On the frame it is cut, the unit coming in
- // takes at once the part it gave up, and eases on from there. Every frame of the exchange
- // shows one of the two on that place.
+ // show neither. So, when nothing comes in on the leaving unit's far side, its two fronts
+ // close on the place's middle, each on half the sweep: it keeps the ink at its middle to
+ // its last frame and is cut below its seam no sooner than one front alone would cut it. On
+ // the frame it is cut, the unit coming in takes at once the part it gave up, and eases on
+ // from there. Every frame of the exchange shows one of the two on that place.
```

The clause states `arm()`'s gate (`const h = de > 0 ? undefined : heir`), which the `arm()` comment already states ("and nothing on its far side").

**The proof** (`records/cmp/cmp.txt`, `records/scripts/build.sh`, `step1.sh`):

| check | result |
|---|---|
| `bp8ref` tree (b1ea7d86) `npx vite build` + `npm run demo:dist:build`, kept outside the tree | exit 0 (`build-bp8ref-dist.log`, load 10.5-11.5) |
| the clause applied; F7 on that tree rebuilds `dist/` and `dist-demo/` | lib exit 0, demo exit 0 |
| `diff -rq` + per-file `cmp`, `dist/` | **IDENTICAL, 841 files** |
| the same, `dist-demo/` | **IDENTICAL, 346 files** (1,187 files, 0 differ) |
| manifest sha256 (sorted per-file sha256 list) | `dist` `d31bc087…` both; `dist-demo` `ae3f61a8…` both |
| harness `build.mjs` outputs, `bp8` against `bp8ref` | `scene/` IDENTICAL (3 files), `demo/` IDENTICAL (346 files) |
| F7 (`F7-bp8/F7.json`, load 13.2-25.7) | **13/13**: typecheck, both builds, units 232 files / 2,241 tests / 0 failing (the menu file passes), ten gates; boot-graph 14/14 with its build arm |
| boot graph (`F7-bp8/boot-graph.txt`, from `dist-demo/index.html`) | 64 files, **503,629 B against 503,808 B, margin 179 B**; `useDockScene-hY1v177J.js` 21,325 B (equal to pass 8: the chunk name is content-hashed and unchanged) |
| PR (`PR-bp8/PR.json`, `--light`, load 13.2) | **6/6**: `prose·harness` 0, `prose·citations` 0, `prose·readers` 65 / 0 without a reader, `prose·count`, `prose·partials`, `prose·rows` |

**The patch.** `pass-9/D2-Bp-p9.patch` is `b1ea7d86` with that one hunk's five lines and the new file's blob id (`04d476a3…`, from `git hash-object` without `-w`) changed (`records/bp8-p9-patch.diff`, 12 lines). 61 files. **sha256 `dd5d9f5f59391b39957ebcc6d733dd3eb120067515bdb2c3f3d9e500a2038ec4`.** On a `git archive HEAD` tree of the 78 touched paths: floor v5 applied, `git apply --check` clean, applied, and every one of the 78 paths equals the seat worktree's (0 differ).

**The built bytes did not change, so the pass stays a confirmation pass** (§P8-7.3 step 1, the pass-7 precedent). Every reading below is of `bp8` built from this patch, whose built output is `b1ea7d86`'s.

---

## 2 · Step 2: the battery

`records/scripts/chain.sh`: one battery `theme` slot per engine and theme (H6-10; red cells re-run twice in the slot, FM's six B2 cells three runs each), then `fmlow` per WebKit theme (H8-2), then the probe and cost (§3). One heavy run at a time; every run under the guard, browser runs never `--light`, WebKit under `--exclusive webkit`, queued and never cancelled.

### 2.1 · Slots, admission and load

The driver starts each slot only at a 1-minute load ≤ 20 and logs the start (`chain.log`). The guard then queues it; the slot's own admission is its first witness log's `uptime` (`battery/slots.log`).

| slot | driver start (load, wait) | admitted (lock or guard wait) | cells' load, re-runs included | cells > 31 |
|---|---|---|---|---:|
| bp8 · C · light | 12:29:48 at 18.01 (30 s) | 12:38 at 18.77 (guard, 8 min) | 16.13-30.64 | 0 |
| bp8 · C · dark | 13:15:55 at 17.12 (27 min) | 13:15 | 15.17-**32.23** | **4** (W3 `D`, `retarget·40/80/120`, 31.58-32.23) |
| bp8 · W · light | 13:29:44 at 18.96 (4 min) | 14:20 at 9.57 (WebKit lock, 51 min) | 7.34-12.16 | 0 |
| bp8 · W · dark | 14:31:42 at 9.17 (0 s) | 15:48 at 21.26 (WebKit lock, 77 min) | 12.65-25.35 | 0 |
| `fmlow` light | queued 16:02 at 14.62 | **admitted at 9.54** (16:24, try 1) | 9.45-14.24 | 0 |
| `fmlow` dark | queued 16:25 at 10.48 | **admitted at 6.34** (16:41, try 1) | 6.00-7.92 | 0 |
| **bp8 · C · dark, re-read** (the slot ran cells above 31) | 20:47:57 at 9.57 (1 s) | 20:47 | 8.29-16.30 | 0 |

- **The re-read rule.** The Chromium dark slot ran four W3 cells at 31.58-32.23, above 31, so it was re-read whole before entering the digest (`battery-reread/`, `BATDIR=… STEPS=bat ENGS=chromium THEMES=dark chain.sh`). Both readings are kept: `digest/*-p9rm*` reads the first, `digest/*-p9rm-reread*` the re-read (a records view: Chromium dark and darkrest from `battery-reread/`, everything else from `battery/`). The four >31 cells PASS in both readings; the two digests give the same row verdicts.
- The WebKit dark slot's admission load (21.26) was above 20: the driver started it at 9.17 and the WebKit lock admitted it 77 min later, at a load the driver does not control. Its cells ran 12.65-25.35, none above 31, so the rule asks no re-read.
- No slot split. No WebKit page close: each FM, probe and witness run opens one browser and a fresh context per cell, far under the 60-load restart (H3-1). No zone refusal. `fmlow` was admitted on its first try in both themes; nothing was deferred.

### 2.2 · Red cells, each re-run twice in its slot

| cell | column | main | re-run 1 | re-run 2 | digest |
|---|---|---|---|---|---|
| W3 `retarget·40` [splice 1 frame: s1\|s4 at 7.31 px, one advance 10.86 px, +166.6 ms] | C·l | FAIL (19.98) | PASS (24.73) | PASS (24.27) | NOT-REPRODUCED (P3, R6) |
| W3 `retarget·80` [splice 1 frame: s1\|s4 at 10.14 px, +199.7 ms] | C·l | FAIL (20.22) | PASS (24.27) | PASS (23.93) | NOT-REPRODUCED (P3, R6) |

No other cell read red in any column, in the battery or the re-read. FM's six B2 cells re-ran twice on every FM run, as H7-3 places them, red or not. This is the `retarget` [splice] class the H8 baseline read on bp7 in WebKit and the B′ prototype read in both engines under load (§P8-8); here it is Chromium light at load about 20.

### 2.3 · The 38 rows, per column (no row scored here)

From `digest/rows-p9rm-reread-ruled.md` (the default digest reads the same but P1 and P3 OWNER-BLOCKED). Each cell is the witness count per column; NR = NOT-REPRODUCED, UM = UNMEASURED.

| row | C·l | C·d (re-read) | W·l | W·d | note |
|---|---|---|---|---|---|
| P1 | 42/42 | 42/42 | 42/42 | 42/42 | Q-12 (b) branch; default OB |
| P2, P4, P5 | 8, 13, 8 | 8, 13, 8 | 8, 13, 8 | 8, 13, 8 | all PASS |
| P3 | 42/42, NR 2 | 42/42 | 42/42 | 42/42 | Q-4 (c) branch; default OB. NR = §2.2 |
| F1-F5 | PASS | PASS | PASS | PASS | |
| F6 | 163/163 | 151/151 | 169/169, UM 5 | 157/157, UM 5 | 0 crashes. UM = ST `stall·nb·*` (§2.4); W8 `consumer·*` UM 12 over the four columns (value.js fence, headed real-GPU runs), as every pass |
| F7 | source 13/13 | | | | §1 |
| N1-N5 | PASS | PASS | PASS | PASS | N5 with PR 6/6 |
| R1 | 32/32 | 30/30 | 32/32 | 30/30 | |
| R2 | 33/33 | 33/33 | 33/33 | 33/33 | margins §3.2 |
| R3, R5 | PASS | PASS | PASS | PASS | |
| R4 | 5/5 | 5/5 | 5/5 | 5/5 | |
| R6 | 40/40, NR 2 | 40/40 | 46/46 | 46/46 | splice NR = §2.2; sliver 0; FM stub 0 |
| R7 | 35/35 | 33/33 | 35/35 | 33/33 | |
| R8 | 9/9 | 7/7 | 9/9, UM 5 | 7/7, UM 5 | UM = ST `stall·nb·*` (§2.4) |
| B1, B3 | PASS | PASS | PASS | PASS | PR 6/6 |
| B2 | 40/40 | 40/40 | 46/46 | 46/46 | `film·hole·column` PASS ×4 (§3.1) |
| C1-C9 | PASS | PASS | PASS | PASS | C8 10/10 and C9 52 px in every column (`battery/bp8-*-CF-*.log`) |
| L1 | 6/6 | | 6/6 | | against `fv3` |

### 2.4 · ST's neighbour cells in Playwright WebKit: UNMEASURED by H7-2

All ten WebKit `stall·nb·*` cells (five per theme) read UNMEASURED: residual scale 1.049-1.059 / 1.008 outside 1 ± 0.01. The cast reads the collapsed rest at 107.03-107.07 px and the expanded rest at 485.56-485.6 px, against the DOM's 102 / 481.72 px; the video scale reads 0.982-0.983. The pass-8 critic's cast read the same rests at 101.81-101.83 / 481.07-481.08 px, scale 1.002-1.003, all measured. Chromium's ST reads measured in both themes this pass (scale 1.003). Loads: W·l 8.50-9.99, W·d 20.49-22.88. H7-2 never turns UNMEASURED into PASS or FAIL, and each row's five other ST cells read measured and PASS, so R4 reads 5/5 per column and R8 holds with UM 5 in each WebKit column.

The build bytes equal pass 8's, so the 5 px is not the patch's. Re-read (`records/scripts/st-reread.sh`, one `--exclusive webkit` slot, both themes, two re-reads each): queued 20:57:29, admitted 22:37:43 after a **100-min WebKit lock wait** (waited out, not cancelled), cells at load 10.31-13.93. **It reproduces: 20 of 20 re-reads UNMEASURED**, the collapsed rest 106.75-108.10 px against 102, the expanded 485.25-485.78 against 481.72, video scale 0.982-0.983, in both themes (`st-reread/st-webkit-*.log`). So the 5 px is systematic in this session's WebKit casts and is not load. Its cause is unread: Playwright is 1.61.1 and the newest WebKit build on disk (`webkit-2370`) dates from 2026-10-18, before pass 8, and the build bytes equal pass 8's. Whether the plate paints 5 px wider than its DOM box in Playwright WebKit, or the cast is read differently, is the critic's to read; this seat records it.

---

## 3 · Step 3: the readings beside the rows (none is a row)

### 3.1 · B2: the FM reads and `stub`, per column

`fm-reads.txt` (`scripts/fmsum.mjs`, every FM read with its hole, worst run, stub slot, offset and edge, and load).

| column | reads (six B2 cells × main, re-run 1, re-run 2 [+ `fmlow` r1-r3]) | hole frames | runs over 1 | `stub` reads (slot, offset, edge) | load |
|---|---:|---:|---:|---|---|
| C·l | 18 | 0 | 0 | 0 | 17.27-23.61 |
| C·d (battery) | 18 | 0 | 0 | 0 | 16.84-21.86 |
| C·d (re-read) | 18 | 0 | 0 | 0 | 8.58-10.68 |
| W·l (battery + `fmlow`, admitted 9.54) | 36 | 0 | 0 | 0 | battery 8.36-9.85; `fmlow` 9.45-14.24 |
| W·d (battery + `fmlow`, admitted 6.34) | 36 | 0 | 0 | 0 | battery 17.84-22.06; `fmlow` 6.00-7.92 |

- **No hole frame in any read, and no `stub` read at any slot.** So no column carries two `stub` reads at one slot (§P8-7.1's condition), and there is no plate-edge position to report: the `content-add` stub pass 8 saw at 968-983 px did not occur in this seat's 126 FM reads, 21 of them `content-add` (3 per battery column, 3 per `fmlow` stage, 3 in the re-read).
- H8-1's column cell `film·hole·column` reads PASS in all four columns in both digests.
- **The strips** (`filmstrips/`, all 108 bp8 strips; the C·d strips are the re-read's, because the re-read wrote over the battery's outputs; the JSON and logs of both are kept). Two read here by eye, at the exchange slot: W·l `first-expand` main (`webkit_bp8_main_main_strip-webkit-first-expand.png`): "H P" → "H P 2(faint)" held two tiles → "H P 2 3" → "H P 2 3 | Play Sett" → "H 1 2 3 | Play Settings Squa" → rest. W·d `warm-collapse` main (`webkit_bp8_dark_main_…warm-collapse.png`): "H 1 2 3 | Pla" → "H P 2" held two tiles → "H P". The slot shows P or 1 on every tile, and the WebKit two-tile paint hold is present and holds tiles with ink. The B2 strip reading is the critic's to make; these two are recorded, not judged.

### 3.2 · R2's margin, per column (bound 0.5)

`scripts/r2sum.sh`: the worst one-frame leaving drop beyond the closing edge over every W3 cell, main and re-runs.

| column | worst | cell, seat, offset | load | margin | at the heir's cut (`first-expand`, seat 8) |
|---|---:|---|---|---:|---|
| C·l | 0.382 | `warm-collapse`, seat 2, +3741.7 ms | 18.21 | **0.118** | 0.371 (18.21) |
| C·d (battery) | 0.378 | `swap-short`, seat 3, +133 ms | 27.18 | **0.122** | — |
| C·d (re-read) | 0.396 | `swap-short`, seat 3, +132.8 ms | 13.71 | **0.104** | 0.370 (13.71) |
| W·l | 0.400 | `retarget·80`, seat 1, +204 ms | 8.79 | **0.100** | 0.300 (9.22) |
| W·d | 0.398 | `warm-collapse`, seat 2, +3736 ms | 22.19 | **0.102** | 0.397 (22.19) |

Pass 8's of record: 0.122 / 0.131 / 0.088 / **0.075** (W·d, the heir's cut, 0.425). This battery's thinnest is C·d's re-read at 0.104; the heir's cut read 0.300-0.397, inside every pass-8 value.

### 3.3 · The display-frame probe (`si/`, target 0 on bp8)

`scripts/slotink-crit.mjs`, the pass-8 critic's probe, copied unchanged. bp8 and bp7 alternate per run inside one guarded run per engine and theme, three runs each (`si/summary.txt`, `si/si-*.log`).

| column | admitted | bp8 longest empty run, 18 sequences | bp8 `minInk` at the exchange (first-/warm-expand) | bp7 longest empty run: first-expand · warm-expand · others | load |
|---|---|---|---|---|---|
| C·l | 16:42:51 | **0** (18/18) | 0.424-0.464 | 1,1,1 · 1,1,1 · 0 | 5.35-6.97 |
| C·d | 16:44:31 | **0** (18/18) | 0.457-0.469 | 1,1,1 · 1,1,1 · 0 | 6.83-9.19 |
| W·l | 17:36:12 (lock wait 50 min) | **0** (18/18) | **0.199**-0.474 | 1,2,2 · 1,1,2 · 0 | 7.43-11.42 |
| W·d | 19:19:34 (lock wait **102 min**, waited out) | **0** (18/18) | 0.276-0.475 | 2,2,1 · 1,2,1 · 0 | 5.34-9.09 |

**bp8: 0 empty display frames in 72 of 72 runs. bp7: 24 of 72**, every `first-expand` and `warm-expand` run, in the same guarded runs. The one reading below every pass-8 value is W·l `warm-expand` run 3 at `minInk` 0.199 (load 10.2): the exchange place's combined ink fell to 0.199 on one frame, above the 0.1 hole line and nowhere near an empty frame. Pass 8's bp8 range was 0.275-0.499.

### 3.4 · Cost: bp8, bp7, fv5 alternating, six rounds at load ≤ 15

`pass-2/D2-Bp-probes.mjs --arm pcost,plead`, Chromium traced, each run guarded with `--cpu-cores 0` and started only at a 1-minute load ≤ 15; 18 runs, 19:21 → 20:47, every cell at load 4.62-10.5 (`cost/summary.txt`, `cost/rows.txt`). The guard held two runs in its queue for 39 and 28 min (bp7 r3, bp8 r5); each cell logs its own load. Six rounds read every 4× row six times, the 4×20 expand among them (§P8-7.3 asks three for the other rows; the extra three are kept). Each entry: frames over 25 ms / worst frame ms (load).

| row | bp8 r1-r6 | bp7 r1-r6 | fv5 r1-r6 |
|---|---|---|---|
| **4× expand, 20 seats** | 0/18.6 (5.58) · 0/17.7 (5.59) · **1/25.4** (7.03) · 0/23.0 (6.46) · 0/15.7 (7.57) · **1/25.3** (8.09) | 0/17.5 (5.45) · 0/18.3 (6.09) · **1/25.2** (4.79) · 0/16.9 (5.93) · 0/24.5 (8.99) · 0/16.6 (6.35) | 0 in all six, worst 10.1-17.9 |
| 4× expand, 40 seats | 1 · 1 · 1 · 1 · 0 · 1 (24.0-34.1) | 0 · 1 · 0 · 1 · 1 · 1 (23.9-34.5) | 0 (15.5-17.8) |
| 4× lead, 20 seats | 0 in all six (16.6-24.1) | 0 · 0 · 0 · 0 · 0 · 1 (15.5-26.6) | 0 (10.3-10.4) |
| 4× lead, 40 seats | 1 · 1 · 1 · 0 · 1 · 0 (17.0-25.6) | 0 · 1 · 0 · 1 · 0 · 1 (18.2-33.3) | 0 (10.3-10.4) |
| **sum over the four rows, six rounds** | **11** | **9** | 0 |
| sum, rounds 1-3 only | 7 | 3 | 0 |
| main-thread ms per frame, 4×20 expand | 0.709-0.847 | 0.652-0.962 | 1.224-1.665 |

- **The 4×20 expand trigger frame:** bp8 over 25 ms in 2 of 6 runs (25.4, 25.3 ms), bp7 in 1 of 6 (25.2 ms). All three crossings sit within 0.4 ms of the threshold. The worst frames: bp8 15.7-25.4, bp7 16.6-25.2. With pass 8's two sessions (bp8 4 of 6, bp7 1 of 6) the three sessions read bp8 6 of 12, bp7 2 of 12 over the threshold on that row.
- Per-frame main-thread time is equal within the run spread on every row.
- 4×40 expand reads 5 against 4, 4×40 lead 4 against 3; every bp8 frame on those rows is 24.0-34.1 ms, bp7 23.9-34.5.

### 3.5 · Boot graph

**503,629 B against 503,808 B, margin 179 B** (§1), equal to pass 8: `dist-demo/` is byte-identical.

---

## 4 · Step 4: prose

- **PR 6/6** on the pass-9 tree (`PR-bp8/PR.json`): `prose·harness` 0, `prose·citations` 0.
- **No harness id in `src/`, read by grep as well as by PR.** Over the patch's added lines, one witness id remains that PR's `HARNESS_RE` does not match: `src/components/dock/composables/useDockContent.ts`, "before the frame's rAF reads the new layout (W3 \`ticking\`: without \`characterData\` …". `W3` is a harness witness and `ticking` its cell (`harness/w3-morph.mjs` line 381). It is in `pass-7/D2-Bp-proto.patch` and `b1ea7d86` alike (not in floor v5), so it is not this pass's; PR read 6/6 over it in passes 7 and 8 too. The added lines also carry seven "REGISTRY §…" design-record citations in `useDockBody.ts`, `useDockScene.ts`, `dock.css`, `scroll-rungs.css` and `shape.css` that `prose·citations` does not count. Recorded for the critic and the landing; this seat edits nothing but the clause.
- **The exact `useDockScene` diff against bp7, from the built trees:** `records/bp7-bp8p9-useDockScene.diff`, 133 lines. It is taken between the bp7 tree's file (HEAD + floor v5 + `184a9715`, the source of the `bp7` build) and the seat worktree's file (the source of `bp8`). Against the pass-8 critic's `bp7-bp8-useDockScene.diff` (133 lines), the only difference is the five clause lines in the header hunk; every code hunk is equal line for line.

---

## 5 · For the critic (recorded; no row minted, none scored)

| item | reading | where |
|---|---|---|
| WebKit ST `stall·nb·*` UNMEASURED ×10 (H7-2) | the cast's collapsed rest 107 px against the DOM's 102 px; pass 8 measured; the build bytes are equal; re-read: 20/20 UNMEASURED again at 10.3-13.9, 100-min lock wait | §2.4; `st-reread/` |
| bp8 W·l `warm-expand` probe `minInk` 0.199 | one frame, above the 0.1 hole line; FM reads 0 hole frames in that column | §3.3 |
| `W3 \`ticking\`` in `useDockContent.ts`, missed by PR's regex; seven REGISTRY citations missed by `prose·citations` | carried from pass 7's B′ | §4 |
| 4×20 expand trigger frame | bp8 2/6, bp7 1/6 this session, every crossing within 0.4 ms of 25 ms; three sessions bp8 6/12, bp7 2/12 | §3.4 |
| C·l W3 `retarget·40/80` [splice], load about 20 | NOT-REPRODUCED (both re-runs PASS) | §2.2 |
| the C·d slot ran four cells above 31 | re-read whole at 8.29-16.30; both readings kept, same row verdicts | §2.1 |
| the C·d strips in `filmstrips/` | the re-read's (it wrote over the battery's outputs); the battery's FM JSON and logs are kept | §3.1 |
| R2 | thinnest 0.104 (C·d re-read); the heir's cut 0.300-0.397 | §3.2 |
| `content-add` stub | 0 reads in this seat | §3.1 |
| the WebKit two-tile paint hold | present on the strips, holding tiles with ink | §3.1 |
| WebKit lock waits | 51, 77 (battery), 50, **102** (probe; waited out, not cancelled), and the ST re-read's 100 min (waited out) | §2.1, §3.3 |
| real Safari | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted | — |

---

## 6 · Fences, as kept

- **Worktree:** `.claude/worktrees/bl/D2/p9/Bp-remeasure/wt`, detached at HEAD; `node_modules` a directory of per-package symlinks into the checkout's, so vite and vitest caches stayed in the worktree; the checkout has no `tests-visual/node_modules`. Builds, F7's `dist/` and `dist-demo/`, harness outputs and the reference copies went under the worktree or `…/Bp-remeasure/out`. The patch check ran in `…/Bp-remeasure/chk`, a `git archive HEAD` extract of the 78 touched paths (a scratch `git init` there, inside the seat directory, for nothing but `git apply`).
- **Git writes in the repository:** `git worktree add` and `git worktree remove --force` only. `git hash-object` ran without `-w`.
- **Writes to the checkout:** `pass-9/D2-Bp-p9.patch`, this file, and `pass-9/D2-Bp-remeasure-records/`. No source edit in the checkout; the clause went into the worktree's copy.
- **Machine law:** every build, test and browser run through `~/.claude/guard/guarded`, one heavy run at a time; browser runs never `--light`; every Playwright WebKit run under `--exclusive webkit`, queued and never cancelled; the digest and PR (no browser) under `--light`. Cost runs `--cpu-cores 0`. No headed, GPU-arg or real-Safari run, no browser MCP, no zone refusal. Nothing under `~/.claude` was read. Sibling repos untouched; value.js not built or run.
- **Harness at the end:** the per-file list re-read at the end equals `pass-8/H8-records/harness.sha256` line for line, hash `9d12810b…`. The harness was not edited.
- **Cleanup:** `git worktree remove --force` on the seat worktree (`git worktree list` shows no `p9/Bp-remeasure` entry), then `rm -rf .claude/worktrees/bl/D2/p9/Bp-remeasure/`, which succeeded: the directory (worktree, `out/`, `chk/`) is gone, so there is no owner's chore for this seat. No process of this seat remains; every chain stage cited above ran to its end (`chain.log`: CHAIN-DONE 20:47:42, the re-read's CHAIN-DONE 20:57:23, `end st-reread` 22:40:05).
