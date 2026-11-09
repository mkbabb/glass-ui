# D2 · pass 14 · D2-B′ re-measure (`bp13`): same build; battery 38/38 ruled; none of rules (a)-(d) fires; cost and one C·d re-read UNRUN (guard refused on the zone count)

| field | value |
|---|---|
| seat | D2 pass-14 RE-MEASURE seat of D2-B′ (REGISTRY §P13-7.3 items 1-4). Authored nothing in D2's passes 12 and 13; no pass-13 critic |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree detached at **`392ff1e3c`** (§P13-7.2), whatever master holds. Arms staged with `git apply --check` then `git apply`, no commit (`apply.log`) |
| patches | re-hashed at start (`patches-sha256-start.txt`) and end (`harness-check-end.txt`), equal: `pass-13/D2-Bp-p13.patch` **`bb7cb08da92677aa6e4e2c753ce9f901b17f4ddb2051d2f4162ef43e97648121`**, `pass-12/D2-Bp-p12.patch` `5318a3dc…`, `pass-6/floor-v5.patch` `cba6bdc2…`, `pass-4/floor-v3.patch` `637d1625…` |
| harness | H8 as landed: 42 files OK against `pass-8/H8-records/harness.sha256` (list hash `9d12810b…`) at the start (2026-11-08 23:41:37), at every chain step's start (`chain.log`) and at the end (2026-11-09 09:16:25, `harness-check-end.txt`). No bound re-read |
| rulings read | `audit/INBOUND.md` to O-185 (open: the dock grain's `url()` as an LCP candidate, "awaits BL disposition"; it touches none of the 38) and `FORMATION-PROGRESS.md` to its last line. Nothing arrived mid-pass |
| engines | Chromium (Playwright's default headless shell, no GPU args) and **Playwright WebKit**, unshimmed. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| zone | `guarded` printed ZONE-ARMED (inuse about 2.68M, 28.1/s, kext=nfs) on WebKit queues and admitted every run until **09:16:15, when it REFUSED** the cost step's nine runs: "kernel zone data.kalloc.1024 at 8.16M (panics near 20.8M; heavy and browser runs stop at 8M): reboot the Mac". Per the task, this seat's runs stopped there (§1.3) |
| records | `pass-14/D2-Bp-remeasure-records/` (48 MB; no video): `battery/`, `digest/`, `filmstrips/` (133 strips), `F7/`, `PR/`, `q/`, `rev/`, `ab/`, `cr/`, `nb/`, `fe/`, `fmab/`, `swp/`, `si/`, `r2/`, `r2y/`, `cost/` (the refusals), `sum/`, `scripts/`, `chain.log`, `same.txt` |

Load is the 1-minute load average. `R` is `pass-14/D2-Bp-remeasure-records/`. `CR` is `pass-13/D2-Bp-critique.md`; `BU` is `pass-13/D2-Bp-build.md`.

---

## 0 · In brief

| item (§P13-7.3) | result |
|---|---|
| 1 · same build, proved | **SAME** (`R/same.txt`): hashes equal; apply clean; four builds exit 0; scene chunk **bp13 21,473 B**, bp12 21,483 B; boot graph **503,777 B** of 503,808 (margin 31 B, 64 files); **F7 13/13**; **PR 6/6**. No build pass |
| 2 · battery, four columns, H8 | ran in full. **Ruled 38/38, 36/36, 24/24; default 36/38, 34/36, 22/24** (P1 OB on Q-12, P3 OB on Q-4). 671 cells: 0 FAIL, **1 NOT-REPRODUCED** (W·d W3 `first-expand` [lanes]), 22 UNMEASURED, 12 RECORD. **One owed C·d slot re-read was not run** (cells to 31.83, §2; the guard refused after the queues) |
| 3 · A/Bs bp13 vs bp12 | every A/B ran but cost: 440 queue lines, every gate-11 read started at ≤ 11.00. **Rules (a), (c), (d) do not fire; (b) does not fire on the battery.** Cost: **UNRUN** (9 of 9 refused on the zone count). Boot graph read from F7 |
| 4 · every red check | §5 |

**This seat is not complete.** Owed to a completion seat: the cost A/B (§P13-7.3 item 3, 3 rounds × bp13/bp12/fv5, each started at ≤ 15) and the C·d battery slot re-read (§P13-7.3 item 2). The seat scores no pass: the critic's digest is of record (§P13-7.4).

---

## 1 · How this seat ran

### 1.1 · Order (all from `R/chain.log`)

| step | start → end | load |
|---|---|---|
| builds `fv3`, `fv5`, `bp12`, `bp13` (`build.sh`) | 2026-11-08 23:42:57 → 23:54:13 | guard held to ≤ 36 (load 44-52 at start); each exit 0 |
| PR (`--light`, no browser), F7 | 23:54:19 → 23:56:40 | F7 start-gate 19.85; F7 cells 26.1, PR 25.66 |
| `same.py` | 23:56:40 | SAME |
| battery C·l | 00:02:40 (gate 19.00, waited 360 s) → 00:13:13 | cells to 24.25 |
| battery C·d | 00:13:14 (14.41) → 00:23:58 | cells to **31.83** (§2) |
| WebKit slot W·l (`--exclusive webkit`): battery, `fmlow`, read queue | queued 00:23:59, admitted 00:30:31 (7 min) → budget stop 01:47:43 | battery cells to 20.01; `fmlow` admitted at **13.21** (bound 15), READ |
| WebKit slot W·d: battery, `fmlow`, read queue | queued 01:47:49, **admitted 03:32:53 (105 min; kept queued past 90 min, logged 03:17:39)** → 04:49:59 (gate 10-15 unmet 30 min, exit 75) | battery cells to 7.45; `fmlow` admitted at **6.14**, READ |
| first digest | 04:50 | — |
| read queues C·l, C·d, W·l (rest), W·d (rest) | 04:50:12 → 09:16:10 | every gate-11 read ≤ 11.00 at its start |
| cost | 09:16:15-16 | **REFUSED ×9 (zone 8.16M)** |
| digest, harness end | 09:16:16 → 09:16:25 | 42 OK |

- **One heavy run at a time** (`seat.lock` held by each chain step). Every build, browser run and digest went through `guarded`; no browser run was `--light` (PR and the digest are `--light` with no browser). Playwright WebKit ran under `--exclusive webkit`, queued and never cancelled. No admitted slot was ended by stopping its parent. Disk was read before every build and battery step: 169-198 GB free throughout.
- **Start loads.** 409 gate-11 reads, highest start 11.00. The R2 band (10-15) started 3.51-14.93; six reads ran on the band's 10-minute soft rule below 10 (the machine was quiet), each logged.
- **WebKit page closes:** none. F6 reads 0 crashes. Every witness and probe opens one browser and a fresh context per cell under the landed `launch()`'s 60-load restart (H3-1).
- **One process stopped by this seat:** `run.sh` pid 87215 at 23:45:36, before any step ran (a word-split bug in its step helper), by PID; restarted as 87680 (`chain.log`).

### 1.2 · Changes made during the seat (recorded, none touching a witness)

- **`swpaint.mjs`** (the `swrev`-in-paint probe, §3.5): after its first read (W·l bp13 r1), the copied edge recorder was changed to keep every painting glyph, not only glyphs with an edge across them, so a glyph lying wholly between two facing edges reads its share too. That read was kept as `swp/v0-*` and re-queued. Every counted `swp` read uses the final form.
- **`fe` lines added** (03:50) to both WebKit queues: W3 `first-expand` bp13/bp12 alternating, 8 rounds per theme, gate 11, after the W·d battery's main read of that cell read [lanes] (§5). Logged in `mkq.sh`.

### 1.3 · The zone stop

At 09:16:15 every cost run was refused: `[guarded] REFUSED: kernel zone data.kalloc.1024 at 8.16M … reboot the Mac` (`R/cost/cost-*-chromium-r*.log`, exit 75). The light digest and the harness check were admitted after it. **No run was started after the refusal**, so the owed C·d re-read was not attempted. **What ran:** items 1, 2 and 4 in full, and every A/B of item 3 except cost. **What did not run:** cost (9 runs) and the C·d battery slot re-read. **The owner should reboot the Mac before a completion seat runs these.**

---

## 2 · Item 1: same build, proved; Item 2: the battery

**Same build** (`R/same.txt`, `R/apply.log`, `R/F7/boot-graph.txt`): scene chunk bp13 **21,473 B** (`useDockScene-BLkqyS-c.js`, the pass-13 file name), bp12 21,483 B; boot graph **503,777 B, margin 31 B**; F7 **13/13** (typecheck, lib and demo builds, units, every gate); PR **6/6**. The pass stays a confirmation.

**The battery** (H8, `R/digest/`, 671 cells):

| column | cells, default (PASS / OB / UM / RECORD) | ruled | highest cell load | re-read |
|---|---|---|---:|---|
| C·l | 149 / 11 / 0 / 3 | 160 PASS | 24.25 | no |
| C·d | 137 / 11 / 0 / 3 | 148 PASS | **31.83** | **owed, not run** |
| W·l (Playwright WebKit) | 154 / 7 / 5 / 3 | 161 PASS | 20.01 | no |
| W·d (Playwright WebKit) | 141 / 8 / 5 / 3 | 148 PASS, **1 NR** | 7.45 | no |
| source (F7, PR) | 19 PASS | 19 | 26.1 | — |
| W8 `consumer·*` | 12 UM | 12 UM | | as every pass |

- **C·d's re-read is owed.** The chain's own check read the slot's highest `uptime` as 30.38. But FM's re-run 1 logged its cells at **31.29, 31.82 and 31.83** (`battery/bp13-dark-FM-chromium-rerun1.log`), and the digest reads 31.83. Every one of those cells is PASS. Under §P13-7.3 item 2 the slot is re-read and both readings are kept. The zone refusal stopped that re-read. **This reading is the first one, and it is kept.**
- **Rule (b): 0 stub frames in every battery W3 read** (Chromium 66 reads, Playwright WebKit 68 with the re-runs), 0 splice. FM: stub 0, hole 0 in 36 Chromium and 72 WebKit FM reads, main and both re-runs. `fmlow` was READ in both WebKit themes, 6/6 ×3 each.
- **L1** 6/6 per engine against `fv3` (C 13.04-15.37, Playwright WebKit 16.97-18.15). **CASES** 6/6 in both engines, `case·rotated` included.

**Rows** (`digest/table-p14rm-ruled-ruled.md`; default `table-p14rm.md`):

| | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| ruled (O-103) | **38/38** | **36/36** | **24/24** | none |
| default | 36/38 | 34/36 | 22/24 | P1 (OB, Q-12), P3 (OB, Q-4) |

NR: P3 (W·d `first-expand`) and R7 (its [lanes] check), each PASS (§5). R8 and F6 carry the usual UM (`stall·nb·*` in WebKit, W8 `consumer·*`). The ruled log reads "37 OWNER-BLOCKED cell(s) read on Q-4 (c) / Q-12 (b): 36 PASS, 1 not". The one is the W·d `first-expand` main read, whose [lanes] the digest counts as NR. **This seat scores no row. The fresh critic's digest is of record.**

---

## 3 · Item 3: the A/Bs, bp13 against bp12 alternating (each read started at ≤ 11)

Summaries: `R/sum/absum.txt` (pass-13 builder's `absum.py`) and `R/sum/sum14.txt` (`scripts/sum14.py`). Loads at the cells are in each JSON.

### 3.1 · The rules

| rule | reading | fired? |
|---|---|---|
| (a) two `splice` reads at one `retarget` cell, one column, one A/B | `retarget·40/80/120`, 8 rounds: **bp13 0 of 96** splice, 0 sliver, 0 stub; bp12 0 of 96 | **no** |
| (b) two `stub` reads at one slot, one column, one battery | 0 stub frames in every battery W3 read, main and re-runs, four columns; FM stub 0 | **no** |
| (c) any bp13 `content-remove` read whose flag closes over 2F + 0.5 after the landing | **bp13 gaps 0 in all 32** (8 per column); bp12 0 in 32; every read PASS | **no** |
| (d) any bp13 `stub` read on the `reversal` A/B | **bp13 0 of 48** (16 C·l, 16 C·d, 8 W·l, 8 W·d); bp12 **2 of 48**, both C·d: r2 (load 5.26) and r5 (4.74), each **"n" of a tab button (`button.dock-tab-button.glass-specular-track`) painted 0.30, hard edge at 886.9 px, +116.7 ms, ramp width 0.24 px** | **no** |

bp12's two stubs are the pass-12 stub to the pixel and the millisecond (BU §1, CR §2). Every `reversal` read on both builds is OWNER-BLOCKED on [window] alone, and Q-4 (c) PASS.

### 3.2 · FM and the display frame

- **FM A/B** (`fmab`, 8 rounds per WebKit theme, `film·warm-expand` + `film·first-expand`): **0 hole, 0 stub, 0 red in 32 bp13 reads and in 32 bp12 reads**. Strips are in `R/fmab/`.
- **Display-frame probe** (`si`, 3 rounds): **0 of 72 runs with an empty frame on either build.** bp13 least ink is 0.422 in all four columns (`swap-long` "Tools" at +67-77 ms). bp12 is 0.422, and 0.414 in W·d (+154 ms, 5.38). BU's 0.375 is not reproduced.

### 3.3 · The base's near-bound classes at A/B rate (`nb`, 8 rounds per theme per build)

| class (where pass 13 read it) | bp13 red / reads | bp12 red / reads | reading |
|---|---|---|---|
| `lead-add` / `lead-remove` [terminal] (Chromium) | **0 / 32** | 0 / 32 | not drawn this pass (C·l and C·d, loads 4.1-11) |
| `swap-long` [faces] (Chromium) | **0 / 16** | 0 / 16 | not drawn |
| `swap-long` [leaving] (W·l) and its fade span | **0 / 16** | 0 / 16 | no fade short of its bound. Seat 1's shortest fade: bp13 **71 ms** (W·l, 10.61), 69 ms (W·d); bp12 **65 ms** (W·l r2y r3, 10.5), 68 ms (W·d). The bound is ≥ 3 frames and ≥ 64.3-65 ms. bp12's 65 ms is at its bound and not red (`R/sum/fade-blank.txt`, 20 reads per build and theme over `nb`/`r2`/`r2y`) |
| `swap-short` [blank] (Playwright WebKit) | **1 / 16** (W·d r4 at 4.44: 2 blank of 27 moving frames, run 2, at +20 ms) | 1 / 16 in `nb` (W·l r5 at 10.14, +20 ms); plus `r2` W·l r2 (10.41, +18 ms) | the base's. **Every `swap-short` read on both builds reads 1 blank frame at +8-21 ms, the bound.** A red is the second frame. bp13 1 of 20 swap-short reads over `nb` + `r2`, bp12 2 of 20 |

Margins: [terminal], [faces] and [leaving] drew no red, so they have no red margin. [blank]'s red reads 2 frames against a bound of 1. Its rate per build is in the table.

### 3.4 · R2 per column with the seat (`r2` whole W3 ×2, `r2y` WebKit ×4, plus every `nb`, `ab`, `fe` read; vanish bound 0.5)

| column | `swap-long` seat 1, bp13 / bp12 | seat 2, bp13 / bp12 | `retarget·80` seat 1, bp13 / bp12 | worst of the column, bp13 / bp12 |
|---|---|---|---|---|
| C·l | 0.391 (6.32) / 0.388 | 0.391 / 0.388 | 0.349 (11.94) / 0.349 | 0.391 / 0.394 (`swap-short` 3) |
| C·d | 0.389 (7.00) / 0.372 | 0.389 / 0.372 | 0.349 / 0.349 | 0.389 / 0.387 (`first-expand` 8) |
| W·l | **0.412** (`r2y` r3, 10.00) / **0.436** (`r2y` r3, 10.50) | 0.412 / 0.436 | 0.369 (9.40) / 0.395 | 0.414 (`fe` `first-expand` 8, 5.42) / 0.436 |
| W·d | 0.384 (12.49) / 0.400 | 0.384 / 0.399 | 0.383 (10.55) / 0.398 | **0.425** (`fe` `first-expand` 8, 5.04) / 0.438 (`first-expand` 8, 6.37) |

**The thinnest bp13 margin this seat read is 0.075** (W·d `first-expand` seat 8). On W·l `swap-long` seat 1 it is 0.088 (n = 14 per build, loads 8.84-11.96). bp12 reads thinner on every WebKit cell above. CR's 0.451 and BU's 0.497 on bp13 are not reproduced. **R2 PASS ×4 on the battery.**

### 3.5 · `swrev` in paint (`swp`, F2's arguments `--at 40 --then 0,16,32,64 --runs 2`, 8 rounds per WebKit theme)

| column | bp13 splice frames / reads | bp12 splice frames / reads | stub, sliver |
|---|---|---|---|
| W·l | 3 / 64 (`then 64` +144 ms; `then 32` +112 ms ×2) | 2 / 64 (`then 16` +102-103 ms) | 0, 0 both builds |
| W·d | 0 / 64 | 5 / 64 (`then 16` ×2, `then 32` ×2, `then 64`) | 0, 0 |

Every splice is `s7|s8`, gap 8.05-8.66 px, advance 9.58 px. **At every splice frame (10 frames, the edge recorder on the same rAF, Δt 0 ms), no glyph lies between the two facing edges, and the one glyph across an edge ("F", in 5 of the 10 frames) is painted 0** (opacity 1). That is BU §2's reading ("F" share 0). **No ink is cut at the splice in paint**, so §P13-7.5's build trigger does not apply. The rates do not separate the builds (bp13 3 of 128, bp12 7 of 128).

### 3.6 · Cost and the boot graph

- **Cost: UNRUN.** All nine runs (bp13, bp12, fv5 × 3, `--cpu-cores 0`) were refused by the guard on the zone count at 09:16:15-16, at load 8.59-8.73 (`R/cost/`). Owed to a completion seat.
- **Boot graph:** 503,777 B of 503,808, margin 31 B (`R/F7/boot-graph.txt`).

---

## 4 · The added reading: W3 `first-expand` [lanes] in Playwright WebKit (`fe`, 8 rounds per theme)

| | bp13 [lanes] / reads | bp12 [lanes] / reads |
|---|---|---|
| W·l | 1 / 8 (r5, load 5.11) | 0 / 8 |
| W·d | 0 / 8 | 0 / 8 |
| W·d battery (main + 2 re-runs) | 1 / 3 (main, 6.21) | — |

Both bp13 reds read the same: "1 lane(s) cancelled to identity, the largest `button.dock-icon-button.glass-specular-track.glass-capsule-hover` clip from 40 px in one frame (previous step 1.64 px) at 46 ms". That is the class BU §6 read on **bp12** W·d `warm-collapse` ("clip from 40 px in one frame (previous step 0 px) at 135 ms"), which CR's re-runs did not reproduce. It is an icon-button lane, not the tab-button clip that p13 changes, and both bp13 reads are at low load (5.11, 6.21). Over 11 bp13 reads it draws 2. bp12 draws 0 in 16 here and 1 in BU. **Two reads do not separate the builds, and each was NOT-REPRODUCED on its re-reads.** It is placed for the critic's attack on the edge law's range (§P13-7.4: "a cut whose depth crosses the touch … read for a clip step in `lanes`"). The critic should read `first-expand` and `warm-collapse` [lanes] on both builds at the A/B rate.

---

## 5 · Item 4: every red check of every red cell

**bp13, battery** (`R/sum/battery-nonpass.txt`, `R/battery/`):
- **W·d W3 `first-expand`, main read (6.21): [window, lanes].** [window] 270 ms > 259.6 (Q-4 (c) 315.4, PASS). [lanes] reads as in §4. Re-run 1 (5.59) and re-run 2 (5.64) read OWNER-BLOCKED on [window] alone (268 and 271 ms; Q-4 (c) PASS). **NOT-REPRODUCED** (H6-7). It feeds P3 and R7 as NR.
- OWNER-BLOCKED cells red on **[window]** alone, each with Q-4 (c) PASS: W3 `warm-collapse`, `warm-expand`, `reversal`, `swap-short`, `anchor-end·warm-expand`, `anchor-end·warm-collapse` and W6 `form·expand`, `form·collapse` (C·l, C·d); W3 `reversal`, `anchor-end·warm-expand`, `anchor-end·warm-collapse` and W6 `form·collapse` (W·l); W3 `warm-collapse`, `reversal`, `anchor-end·warm-expand` and W6 `form·collapse` (W·d). W1 `card·first-expand`, `card·warm-collapse`, `card·warm-expand` (×4) are red only on **[card]**, Q-12 (b).
- No other check is red. CASES 6/6 in both engines.

**A/Bs and readings (single reads; none is a battery cell, and none turns a row):**

| red | build, column, read (load) | checks |
|---|---|---|
| `reversal` | **bp12** C·d `rev` r2 (5.26), r5 (4.74) | [window] 275 ms > 257.9 / 257.7; **[stub]** "n" 30 % at 886.9 px, +116.7 ms, 0.24 px |
| `swap-short` | **bp13** W·d `nb` r4 (4.44) | [window] 266 ms > 259.6; **[blank]** 2 blank of 27 moving frames, longest run 2 (bound 1), at +20 ms |
| `swap-short` | bp12 W·l `nb` r5 (10.14); bp12 W·l `r2` r2 (10.41) | [window] 264 ms > 259.6; [blank] 2 of 27, run 2, at +20 / +18 ms |
| `first-expand` | **bp13** W·l `fe` r5 (5.11) | [window] 271 ms > 259.6; **[lanes]** as §4 |

Every other A/B red is OWNER-BLOCKED on [window] alone with Q-4 (c) PASS. Counts per queue are in `R/sum/sum14.txt` (`reds`), and every `rev` read on both builds is one of them. **No bp13 red is a stub, a splice, [terminal], [faces] or [leaving].**

---

## 6 · Placed for the fresh critic (no row minted)

| class | reading | for |
|---|---|---|
| **C·d battery slot re-read (cells to 31.83)** | owed under §P13-7.3 item 2; first reading PASS, kept | a completion seat, after the reboot |
| **cost A/B** | unrun (zone refusal) | a completion seat |
| `first-expand` [lanes], icon-button clip from 40 px in one frame, Playwright WebKit | bp13 2 of 11 (battery W·d main NR; `fe` W·l r5); bp12 0 of 16 here, 1 in BU (`warm-collapse`) | the critic's edge-law-range attack and the window attack in Playwright WebKit (§P13-7.4) |
| `swap-short` [blank] at +18-21 ms | bp13 1 of 20, bp12 2 of 20; every read sits at 1 blank frame | the base's near-bound class (§P13-8) |
| `swrev` splice `s7\|s8` | bp13 3/128, bp12 7/128; 0 ink between the edges, the glyph across reads 0 | beside the rows; no ink cut |
| the reversal stub on bp12 | 2 of 48 (C·d), "n" at 886.9 px | rule (d)'s reference |
| R2 | thinnest bp13 0.075 (W·d `first-expand` 8); W·l `swap-long` seat 1 0.088 | the critic's R2 attack at 10-15 (this seat's band ran at 3.51-14.93 with the machine quiet) |
| [terminal], [faces], [leaving] | 0 red on either build at 8 rounds per theme | the base's; none drew this pass |
| ZONE: refusal at 8.16M (09:16:15) | the guard's stop; earlier ZONE-ARMED warnings admitted runs, of record | **the owner decides on the reboot** |
| real Safari | **UNMEASURED (owner's safaridriver checkbox)** | O-103 |

---

## 7 · Fences, as kept

- **Worktree:** `.claude/worktrees/bl/D2/p14/Bp-remeasure/wt`, detached at `392ff1e3c`. `node_modules` is a directory of per-package links to the checkout's, and `tests-visual/node_modules` is linked. Builds, caches and outputs went under `Bp-remeasure/out/`. **Git writes:** `git worktree add` and `git worktree remove --force` only. The worktree entry is removed (`git worktree list` shows no `Bp-remeasure`). **The permission check refused deleting `.claude/worktrees/bl/D2/p14/Bp-remeasure/`** (about 2.2 GB of `out/` build and run outputs, none of record), as it refused BU's. That is the owner's chore.
- **Writes to the checkout:** this file and `pass-14/D2-Bp-remeasure-records/` only. No tracked source was edited. Nothing under `~/.claude` was read: the guard was invoked, never read, and its refusal text is quoted from this seat's own logs. Sibling repos were neither read nor run.
- **Processes:** the chain ended `RUN-DONE` at 09:16:25. No process of this seat remains.
