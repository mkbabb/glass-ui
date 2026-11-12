# D2 · pass 14 · D2-B′ re-measure (`bp13`): same build; battery 38/38 ruled; none of rules (a)-(d) fires; the C·d re-read and the cost A/B complete

| field | value |
|---|---|
| seat | D2 pass-14 RE-MEASURE seat of D2-B′ (REGISTRY §P13-7.3 items 1-4), in two entries: the first (2026-11-08 23:41 → 11-09 09:16, stopped by the guard's zone refusal) and the completion (11-09 11:41 → 15:35, after the reboot). Neither entry authored anything in D2's passes 12 and 13 or was a pass-13 critic |
| model | `claude-opus-5-5`, asserted from own system identity (both entries) |
| base | worktree detached at **`392ff1e3c`** (§P13-7.2), whatever master holds. The completion entry recreated it at `392ff1e3c` (the orchestrator had removed the first one to reclaim disk). Arms staged with `git apply --check` then `git apply`, no commit (`apply.log`, `resume/apply.log`) |
| patches | re-hashed at the first entry's start and end and at the completion's start (`resume/apply.log`) and end (`resume/harness-check-end.txt`), all equal: `pass-13/D2-Bp-p13.patch` **`bb7cb08da92677aa6e4e2c753ce9f901b17f4ddb2051d2f4162ef43e97648121`**, `pass-12/D2-Bp-p12.patch` `5318a3dc…`, `pass-6/floor-v5.patch` `cba6bdc2…`, `pass-4/floor-v3.patch` `637d1625…` |
| harness | H8 as landed: 42 files OK against `pass-8/H8-records/harness.sha256` (list hash `9d12810b…`) at the first entry's start (2026-11-08 23:41:37), every chain step's start, its end (09:16:25), the completion's start (11-09 11:41:45, `resume/harness-check-start.txt`) and the completion's end (15:02:23, `resume/harness-check-end.txt`). No bound re-read |
| rulings read | `audit/INBOUND.md` to O-191 (O-185 open, "awaits BL disposition"; O-186-O-191 placed in 10.1.5 and 11.1.0; none touches the 38) and `FORMATION-PROGRESS.md` to its last line (2026-11-09 10:35, 11.0.0 live; master merged). Nothing arrived mid-pass |
| engines | Chromium (Playwright's default headless shell, no GPU args) and **Playwright WebKit**, unshimmed. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| zone | First entry: `guarded` printed ZONE-ARMED and admitted runs until **09:16:15, when it REFUSED** the cost step (8.16M; `R/cost/refused-0916/`). After the reboot: **no refusal**. The guard printed ZONE-ARMED (inuse 29,715, 43.3/s, kext=nfs) on the last three fv5 cost runs (`cost-fv5-chromium-r3/r4/r5.log`) and admitted each. Under the owner's 2026-11-03 order that is a warning, and those readings are of record |
| records | `pass-14/D2-Bp-remeasure-records/` (54 MB; no video). First entry: `battery/`, `digest/`, `filmstrips/`, `F7/`, `PR/`, `q/`, `rev/`, `ab/`, `cr/`, `nb/`, `fe/`, `fmab/`, `swp/`, `si/`, `r2/`, `r2y/`, `sum/`, `scripts/`, `chain.log`, `same.txt`. Completion: `resume/` (apply, builds, F7, boot graph, same, harness), `reread/` (C·d battery, its digests), `filmstrips/chromium-dark-reread/` (18 strips), `cost/` (9 + 2 runs; the refusals in `cost/refused-0916/`), `sum/costtab.txt`, `scripts/complete.sh`, `costfv5.sh`, `costtab.py`; `chain.log` lines tagged `resume:` |

Load is the 1-minute load average. `R` is `pass-14/D2-Bp-remeasure-records/`. `CR` is `pass-13/D2-Bp-critique.md`; `BU` is `pass-13/D2-Bp-build.md`.

---

## 0 · In brief

| item (§P13-7.3) | result |
|---|---|
| 1 · same build, proved | **SAME, twice.** First entry (`R/same.txt`): hashes equal; apply clean; four builds exit 0; scene chunk **bp13 21,473 B**, bp12 21,483 B; boot graph **503,777 B** of 503,808 (margin 31 B, 64 files); **F7 13/13**; **PR 6/6**. Completion (`R/resume/same.txt`), on the recreated worktree: hashes equal; `fv5`, `bp12`, `bp13` exit 0; p13 over the base 64 paths; chunks **21,473 / 21,483 B**; boot graph **503,777 B** (64 files, margin 31 B); **F7 13/13** at 13.7-15.88. No build pass |
| 2 · battery, four columns, H8 | ran in full. **Ruled 38/38, 36/36, 24/24; default 36/38, 34/36, 22/24** (P1 OB on Q-12, P3 OB on Q-4). 671 cells: 0 FAIL, **1 NOT-REPRODUCED** (W·d W3 `first-expand` [lanes]), 22 UNMEASURED, 12 RECORD. **C·d re-read done** (§2.1): cells 10.84-21.52; 137 PASS / 11 OB / 3 RECORD default, 148 PASS ruled, the same as the first reading; with it in place of the first reading, the four-column digest is unchanged in both forms |
| 3 · A/Bs bp13 vs bp12 | every A/B ran. 440 queue lines, every gate-11 read started at ≤ 11.00. **Rules (a), (b), (c), (d) do not fire.** **Cost done** (§3.6): frames over 25 ms on the 4× 20/40 rows **bp13 10, bp12 9, fv5 1** (the fv5 one under load, NOT-REPRODUCED in 2 re-reads); main-thread ms per frame on 4×40 lead **bp13 1.742-2.055, bp12 1.71-2.011, fv5 0.145-0.214**. The builds do not separate. Boot graph 503,777 B |
| 4 · every red check | §5 |

**This seat is complete: items 1-4 have all run.** It scores no pass, because the fresh critic's digest is of record (§P13-7.4).

---

## 1 · How this seat ran

### 1.1 · First entry, in order (all from `R/chain.log`)

| step | start → end | load |
|---|---|---|
| builds `fv3`, `fv5`, `bp12`, `bp13` (`build.sh`) | 2026-11-08 23:42:57 → 23:54:13 | the guard held these to ≤ 36 (load 44-52 at start); each exit 0 |
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

### 1.2 · Completion entry, in order (`R/chain.log`, lines tagged `resume:` and `resume-fv5:`)

| step | start → end | load |
|---|---|---|
| harness start, patch hashes, `git worktree add --detach … 392ff1e3c` | 11:41:45 | 42 OK; four hashes equal |
| builds `fv5`, `bp12`, `bp13` (`complete.sh`, `fv3` not rebuilt: L1 is of record) | 11:41:45 → 11:44:26 | load 34-21 (the guard admitted them); each exit 0 |
| a first boot-graph read on the wrong instrument: STOP, then corrected (§1.3) | 11:44:26 | — |
| F7 (the boot graph's instrument of record) and `same` | gate 11:46:04 (18.90, waited 60 s), admitted later → 12:04:04 | F7 steps 13.7-15.88; **SAME** |
| **C·d battery slot re-read** (`theme` slot, dark + darkrest) | gate 12:04:04 (14.43, bound 20), **admitted about 12:31 (27 min in the guard's queue)** → 12:40:43 | cells + re-runs **10.84-21.52**, under 31: no further re-read |
| **cost** (Chromium, bp13 → bp12 → fv5, 3 rounds, `--cpu-cores 0`, each gate ≤ 11) | 12:40:43 → 15:02:06 | gates 8.25-10.90 (waits up to 1,701 s); bp12 r3 sat 68 min in the guard's queue after its gate; fv5 r3 sat about 8 min and ran at 24.85-34.83 (§3.6) |
| digests (the re-read alone; the four columns with C·d's re-read), harness end | 15:02:06 → 15:02:23 | 42 OK |
| **fv5 cost re-reads ×2** (`costfv5.sh`: the ≤ 11 gate read inside the admitted slot) | 15:02 → 15:34:46 | in-slot starts **10.76** (r4) and **9.85** (r5) |
| worktree removed, scratch dir deleted | 15:36 | — |

- **One heavy run at a time** (`seat.lock` held by each chain). Every build, browser run and digest went through `guarded`; no browser run was `--light` (PR and the digests are `--light` with no browser). Playwright WebKit ran under `--exclusive webkit`, queued and never cancelled. No admitted slot was ended by stopping its parent. Disk was read before every build and battery step: 169-198 GB free in the first entry, 176-183 GB in the completion.
- **Start loads.** First entry: 409 gate-11 reads, highest start 11.00. The R2 band (10-15) started 3.51-14.93; six reads ran on the band's 10-minute soft rule below 10 (the machine was quiet), and each is logged. Completion: every cost gate ≤ 11 at its check (9.80, 9.89, 10.50, 10.90, 10.60, 10.29, 8.25, 10.25, 10.14). The guard's admission came later than the gate on three runs, and its load is the cell load in each JSON. Only fv5 r3 ran above 15 (§3.6).
- **WebKit page closes:** none. F6 reads 0 crashes. Every witness and probe opens one browser and a fresh context per cell under the landed `launch()`'s 60-load restart (H3-1). The completion ran no WebKit.
- **Processes stopped by this seat, all by PID:** `run.sh` pid 87215 at 23:45:36 (first entry, a word-split bug in its step helper, before any step ran). In the completion, `complete.sh` pid 25034 at about 11:41:30: its lock's parent directory did not exist yet, so it spun on the lock before running anything. It was fixed (`mkdir -p` first) and relaunched as 26590.

### 1.3 · Changes made during the seat (recorded, none touching a witness)

- **`swpaint.mjs`** (first entry, §3.5): after its first read (W·l bp13 r1), the copied edge recorder was changed to keep every painting glyph, not only glyphs with an edge across them, so a glyph lying wholly between two facing edges reads its share too. That read was kept as `swp/v0-*` and re-queued. Every counted `swp` read uses the final form.
- **`fe` lines added** (first entry, 03:50) to both WebKit queues: W3 `first-expand` bp13/bp12 alternating, 8 rounds per theme, gate 11, after the W·d battery's main read of that cell read [lanes] (§5). Logged in `mkq.sh`.
- **The completion's boot-graph proof, corrected.** The first try at 11:44:26 read the boot graph from `build.mjs`'s demo output with `bootsize.py`'s rule. That gave **525,445 B**, the chain logged DIFFERS, and it stopped (`resume/same-try1-builddemo.txt`, `resume/boot-graph-builddemo.txt`). That output is not the instrument of record: pass 13 and the first entry read `bootsize.py` on the `dist-demo` that F7 builds in the tree. The step was changed to that instrument (`bootproof` in `complete.sh`), with nothing rebuilt and nothing else changed, and it reads **503,777 B, SAME**. The scene chunks, the instrument the two readings share, were equal on both tries.
- **fv5 cost re-reads** (`costfv5.sh`): added after fv5 r3 ran under load (§3.6). The load gate is read inside the admitted slot, because the guard's admission wait had decoupled the gate from the run.

### 1.4 · The zone stop and the resumption

At 09:16:15 every cost run was refused: `[guarded] REFUSED: kernel zone data.kalloc.1024 at 8.16M … reboot the Mac`. Those nine logs are kept in `R/cost/refused-0916/`. The Mac was rebooted (uptime 1:06 at the completion's start). The completion ran only what was owed: the C·d re-read and the cost A/B. It ran no second battery and redid no recorded A/B. It re-proved the same build first, as the resume clause asked.

---

## 2 · Item 1: same build, proved; Item 2: the battery

**Same build** (`R/same.txt`, `R/apply.log`, `R/F7/boot-graph.txt`; again in `R/resume/same.txt`, `R/resume/apply.log`, `R/resume/boot-graph.txt`, `R/resume/F7/F7.json`): scene chunk bp13 **21,473 B** (`useDockScene-BLkqyS-c.js`, the pass-13 file name, both entries), bp12 21,483 B (`useDockScene-3klTy4RY.js`); boot graph **503,777 B, margin 31 B**; F7 **13/13** in both entries (lib, demo, typecheck, units, every gate); PR **6/6** (first entry). The pass stays a confirmation.

**The battery** (H8, `R/digest/`, 671 cells):

| column | cells, default (PASS / OB / UM / RECORD) | ruled | highest cell load | re-read |
|---|---|---|---:|---|
| C·l | 149 / 11 / 0 / 3 | 160 PASS | 24.25 | no |
| C·d | 137 / 11 / 0 / 3 | 148 PASS | **31.83** | **done (§2.1): 137 / 11 / 0 / 3; 148 PASS ruled; cells to 21.52** |
| W·l (Playwright WebKit) | 154 / 7 / 5 / 3 | 161 PASS | 20.01 | no |
| W·d (Playwright WebKit) | 141 / 8 / 5 / 3 | 148 PASS, **1 NR** | 7.45 | no |
| source (F7, PR) | 19 PASS | 19 | 26.1 | — |
| W8 `consumer·*` | 12 UM | 12 UM | | as every pass |

### 2.1 · The C·d slot re-read (`R/reread/`)

The first C·d reading's cells ran to 31.83 (FM's re-run 1 at 31.29, 31.82 and 31.83, `battery/bp13-dark-FM-chromium-rerun1.log`; the chain's own check had read 30.38). Under §P13-7.3 item 2 the slot is read again and both readings are kept. **The first reading stands in `R/battery/` and `R/digest/`; the second is in `R/reread/battery/` and `R/reread/digest/`.**

| | first reading | re-read |
|---|---|---|
| start | 00:13:14, gate 14.41 | gate 12:04:04 at 14.43; admitted about 12:31 |
| cell loads (cells + re-runs) | to 31.83 | **10.84-21.52** (FM 14.84-21.52; W3 10.84-14.06) |
| default | 137 PASS / 11 OB / 0 UM / 3 RECORD | **137 / 11 / 0 / 3** |
| ruled | 148 PASS | **148 PASS** ("11 OWNER-BLOCKED cell(s) read on Q-4 (c) / Q-12 (b): 11 PASS, 0 not") |
| W3 stub | 0 | **0 stub frames in 16 reads judged; splice 0 in 32** |
| FM | 7/7 PASS, stub 0, hole column PASS | **7/7 PASS** main and both re-runs, stub 0; `film·hole·column` PASS ("18 read(s); 0 hole run(s) over 1 frame") |
| OB cells | W3 `warm-collapse`, `warm-expand`, `reversal`, `swap-short`, `anchor-end·warm-expand`, `anchor-end·warm-collapse`; W6 `form·expand`, `form·collapse` on [window]; W1 `card·*` ×3 on [card] | **the same eleven, each on the same one check** (§5) |

**With the re-read in place of C·d's first reading** (the first reading's C·l, W·l and W·d with the re-read's C·d; `reread/digest/*-p14rm-4col-cdre*`): **ruled 38/38, 36/36, 24/24; default 36/38, 34/36, 22/24 (P1, P3 OB)**. The ruled table is byte-identical to the first entry's (`cmp`), and the default table is too (`diff` empty). The re-read changes no verdict.

- **Rule (b): 0 stub frames in every battery W3 read** (Chromium 66 reads, Playwright WebKit 68 with the re-runs; the C·d re-read 16 more), 0 splice. FM: stub 0, hole 0 in 36 Chromium and 72 WebKit FM reads, main and both re-runs, and 18 more in the re-read. `fmlow` was READ in both WebKit themes, 6/6 ×3 each.
- **L1** 6/6 per engine against `fv3` (C 13.04-15.37, Playwright WebKit 16.97-18.15). **CASES** 6/6 in both engines, `case·rotated` included.

**Rows** (`digest/table-p14rm-ruled-ruled.md`; default `table-p14rm.md`; and the same with the C·d re-read, `reread/digest/table-p14rm-4col-cdre*.md`):

| | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| ruled (O-103) | **38/38** | **36/36** | **24/24** | none |
| default | 36/38 | 34/36 | 22/24 | P1 (OB, Q-12), P3 (OB, Q-4) |

NR: P3 (W·d `first-expand`) and R7 (its [lanes] check), each PASS (§5). R8 and F6 carry the usual UM (`stall·nb·*` in WebKit, W8 `consumer·*`). The ruled log reads "37 OWNER-BLOCKED cell(s) read on Q-4 (c) / Q-12 (b): 36 PASS, 1 not". The one is the W·d `first-expand` main read, whose [lanes] the digest counts as NR. **This seat scores no row. The fresh critic's digest is of record.**

---

## 3 · Item 3: the A/Bs, bp13 against bp12 alternating (each read started at ≤ 11)

Summaries: `R/sum/absum.txt` (pass-13 builder's `absum.py`), `R/sum/sum14.txt` (`scripts/sum14.py`), `R/sum/costtab.txt` (`scripts/costtab.py`, which reproduces CR's `sum/costtab.txt` exactly when run on CR's records). Loads at the cells are in each JSON.

### 3.1 · The rules

| rule | reading | fired? |
|---|---|---|
| (a) two `splice` reads at one `retarget` cell, one column, one A/B | `retarget·40/80/120`, 8 rounds: **bp13 0 of 96** splice, 0 sliver, 0 stub; bp12 0 of 96 | **no** |
| (b) two `stub` reads at one slot, one column, one battery | 0 stub frames in every battery W3 read, main and re-runs, four columns, and in the C·d re-read; FM stub 0 | **no** |
| (c) any bp13 `content-remove` read whose flag closes over 2F + 0.5 after the landing | **bp13 gaps 0 in all 32** (8 per column); bp12 0 in 32; every read PASS | **no** |
| (d) any bp13 `stub` read on the `reversal` A/B | **bp13 0 of 48** (16 C·l, 16 C·d, 8 W·l, 8 W·d); bp12 **2 of 48**, both C·d: r2 (load 5.26) and r5 (4.74), each **"n" of a tab button (`button.dock-tab-button.glass-specular-track`) painted 0.30, hard edge at 886.9 px, +116.7 ms, ramp width 0.24 px** | **no** |

bp12's two stubs are the pass-12 stub to the pixel and the millisecond (BU §1, CR §2). Every `reversal` read on both builds is OWNER-BLOCKED on [window] alone, and Q-4 (c) PASS.

### 3.2 · FM and the display frame

- **FM A/B** (`fmab`, 8 rounds per WebKit theme, `film·warm-expand` + `film·first-expand`): **0 hole, 0 stub, 0 red in 32 bp13 reads and in 32 bp12 reads**. Strips are in `R/fmab/`.
- **Display-frame probe** (`si`, 3 rounds): **0 of 72 runs with an empty frame on either build.** bp13's least ink is 0.422 in all four columns (`swap-long` "Tools" at +67-77 ms). bp12's is 0.422, and 0.414 in W·d (+154 ms, 5.38). BU's 0.375 is not reproduced.

### 3.3 · The base's near-bound classes at A/B rate (`nb`, 8 rounds per theme per build)

| class (where pass 13 read it) | bp13 red / reads | bp12 red / reads | reading |
|---|---|---|---|
| `lead-add` / `lead-remove` [terminal] (Chromium) | **0 / 32** | 0 / 32 | not drawn this pass (C·l and C·d, loads 4.1-11) |
| `swap-long` [faces] (Chromium) | **0 / 16** | 0 / 16 | not drawn |
| `swap-long` [leaving] (W·l) and its fade span | **0 / 16** | 0 / 16 | no fade short of its bound. Seat 1's shortest fade: bp13 **71 ms** (W·l, 10.61), 69 ms (W·d); bp12 **65 ms** (W·l `r2y` r3, 10.5), 68 ms (W·d). The bound is ≥ 3 frames and ≥ 64.3-65 ms. bp12's 65 ms is at its bound and not red (`R/sum/fade-blank.txt`, 20 reads per build and theme over `nb`/`r2`/`r2y`) |
| `swap-short` [blank] (Playwright WebKit) | **1 / 16** (W·d r4 at 4.44: 2 blank of 27 moving frames, run 2, at +20 ms) | 1 / 16 in `nb` (W·l r5 at 10.14, +20 ms); plus `r2` W·l r2 (10.41, +18 ms) | the base's. **Every `swap-short` read on both builds reads 1 blank frame at +8-21 ms, the bound.** A red is the second frame. bp13 1 of 20 swap-short reads over `nb` + `r2`; bp12 2 of 20 |

Margins: [terminal], [faces] and [leaving] drew no red, so they have no red margin. [blank]'s red reads 2 frames against a bound of 1, and its rate per build is in the table.

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

**Cost** (Chromium, `pass-2/D2-Bp-probes.mjs pcost,plead`, `--cpu-cores 0`, bp13 → bp12 → fv5 alternating, 3 rounds, each gate ≤ 11; `R/cost/`, `R/sum/costtab.txt`):

| measure | bp13 | bp12 | fv5 |
|---|---:|---:|---:|
| frames over 25 ms, sum over the four 4× 20/40 rows, 3 rounds (per round) | **10** (3, 5, 2) | **9** (3, 4, 2) | **1** (0, 0, 1: r3, under load); **0** in r4, r5 |
| main-thread ms per frame, 4×40 lead | **1.742-2.055** (cells 9.62, 12.63, 11.58) | **1.71-2.011** (12.72, 10.75, 10.42) | **0.145-0.214** (r1-r5) |
| largest frame, 4×40 lead (ms) | 34.6, 50.2, 31.8 | 32.5, 43.5, 36.0 | 10.1-12.5 |
| cell loads | 9.0-13.74 (r1 9.0-9.92, r2 10.75-12.63, r3 11.58-13.74) | 8.02-12.72 (r1 9.82-12.72, r2 9.81-11.0, r3 8.02-10.42) | r1-r2 7.66-12.04; **r3 24.85-34.83**; r4 10.94-15.96; r5 6.37-9.3 |
| gate at start | 9.80 · 10.90 · 8.25 | 9.89 · 10.60 · 10.25 | 10.50 · 10.29 · 10.14; in-slot 10.76 · 9.85 |

- **bp13 and bp12 do not separate.** Every over-25 frame on both builds sits on the 4× rows at 20 and 40 seats, and each build's per-round counts overlap the other's. Floor v5's lead stays about a tenth of B′'s main-thread time (0.145-0.214 against 1.71-2.055), which is the lead Q-15 (a) prices.
- **Against pass 13** (CR: bp13 4, bp12 4, fv5 0; 4×40 lead 1.359-1.499 / 1.407-1.521 / 0.101-0.128): both B′ builds read higher here by the same amount, about 0.35-0.5 ms per frame and 5-6 more over-25 frames each, and fv5 reads higher too. The rise is common to all three arms, so it is the machine's state, not a build's. It is no row and no rule.
- **fv5 r3.** Its gate read 10.14 at 14:53:34, but the guard admitted it about 8 minutes later, and its cells ran at 24.85-34.83. Its one frame over 25 ms (4×40 expand, 28.4 ms, cell at 28.66) was re-read twice with the ≤ 11 gate read inside the admitted slot: **r4 (in-slot start 10.76, cells 10.94-15.96) 0, r5 (9.85, cells 6.37-9.3) 0. NOT-REPRODUCED.** bp12 r3's 68-minute admission wait did not lift its cells (8.02-10.42).
- **Boot graph:** 503,777 B of 503,808, margin 31 B (`R/F7/boot-graph.txt`, again in `R/resume/boot-graph.txt`).

---

## 4 · The added reading: W3 `first-expand` [lanes] in Playwright WebKit (`fe`, 8 rounds per theme)

| | bp13 [lanes] / reads | bp12 [lanes] / reads |
|---|---|---|
| W·l | 1 / 8 (r5, load 5.11) | 0 / 8 |
| W·d | 0 / 8 | 0 / 8 |
| W·d battery (main + 2 re-runs) | 1 / 3 (main, 6.21) | — |

Both bp13 reds read the same: "1 lane(s) cancelled to identity, the largest `button.dock-icon-button.glass-specular-track.glass-capsule-hover` clip from 40 px in one frame (previous step 1.64 px) at 46 ms". BU §6 read this class on **bp12** W·d `warm-collapse` ("clip from 40 px in one frame (previous step 0 px) at 135 ms"), and CR's re-runs did not reproduce it. It is an icon-button lane, not the tab-button clip that p13 changes, and both bp13 reads are at low load (5.11, 6.21). It draws 2 in 11 bp13 reads; bp12 draws 0 in 16 here and 1 in BU. **Two reads do not separate the builds, and each was NOT-REPRODUCED on its re-reads.** It is placed for the critic's attack on the edge law's range (§P13-7.4: "a cut whose depth crosses the touch … read for a clip step in `lanes`"). The critic should read `first-expand` and `warm-collapse` [lanes] on both builds at the A/B rate.

---

## 5 · Item 4: every red check of every red cell

**bp13, battery** (`R/sum/battery-nonpass.txt`, `R/battery/`):
- **W·d W3 `first-expand`, main read (6.21): [window, lanes].** [window] 270 ms > 259.6 (Q-4 (c) 315.4, PASS). [lanes] reads as in §4. Re-run 1 (5.59) and re-run 2 (5.64) read OWNER-BLOCKED on [window] alone (268 and 271 ms; Q-4 (c) PASS). **NOT-REPRODUCED** (H6-7). It feeds P3 and R7 as NR.
- OWNER-BLOCKED cells red on **[window]** alone, each with Q-4 (c) PASS: W3 `warm-collapse`, `warm-expand`, `reversal`, `swap-short`, `anchor-end·warm-expand`, `anchor-end·warm-collapse` and W6 `form·expand`, `form·collapse` (C·l, C·d); W3 `reversal`, `anchor-end·warm-expand`, `anchor-end·warm-collapse` and W6 `form·collapse` (W·l); W3 `warm-collapse`, `reversal`, `anchor-end·warm-expand` and W6 `form·collapse` (W·d). W1 `card·first-expand`, `card·warm-collapse`, `card·warm-expand` (×4) are red only on **[card]**, Q-12 (b).
- No other check is red. CASES 6/6 in both engines.

**bp13, the C·d re-read** (`R/reread/digest/cells-p14rm-cdre.json`; 0 FAIL, 0 NR): the same eleven cells, each red on one check, each PASS on its ruled branch:
- **[window]** alone (`failed: ['window']`), Q-4 (c) PASS: W3 `warm-collapse` 258.3 ms > 257.6; `warm-expand` 258.6 > 257.8; `reversal` 333.2 > 257.7; `swap-short` 258.2 > 257.9; `anchor-end·warm-expand` 258.2 > 258.0; `anchor-end·warm-collapse` 274.3 > 257.7; W6 `form·expand` 258.2 > 257.8; `form·collapse` 258.7 > 258.0 (cells 12.39-14.06).
- **[card]** alone, Q-12 (b): W1 `card·first-expand`, `card·warm-collapse`, `card·warm-expand` (15.26).

**A/Bs and readings (single reads; none is a battery cell, and none turns a row):**

| red | build, column, read (load) | checks |
|---|---|---|
| `reversal` | **bp12** C·d `rev` r2 (5.26), r5 (4.74) | [window] 275 ms > 257.9 / 257.7; **[stub]** "n" 30 % at 886.9 px, +116.7 ms, 0.24 px |
| `swap-short` | **bp13** W·d `nb` r4 (4.44) | [window] 266 ms > 259.6; **[blank]** 2 blank of 27 moving frames, longest run 2 (bound 1), at +20 ms |
| `swap-short` | bp12 W·l `nb` r5 (10.14); bp12 W·l `r2` r2 (10.41) | [window] 264 ms > 259.6; [blank] 2 of 27, run 2, at +20 / +18 ms |
| `first-expand` | **bp13** W·l `fe` r5 (5.11) | [window] 271 ms > 259.6; **[lanes]** as §4 |
| cost, 4×40 expand | **fv5** r3 (cell 28.66) | 1 frame over 25 ms (28.4 ms); r4, r5 at ≤ 11 read 0: NOT-REPRODUCED (§3.6) |

Every other A/B red is OWNER-BLOCKED on [window] alone with Q-4 (c) PASS. Counts per queue are in `R/sum/sum14.txt` (`reds`), and every `rev` read on both builds is one of them. The over-25 frames of bp13 and bp12 in cost are measurements, not checks. **No bp13 red is a stub, a splice, [terminal], [faces] or [leaving].**

---

## 6 · Placed for the fresh critic (no row minted)

| class | reading | for |
|---|---|---|
| C·d battery slot (first reading's cells to 31.83) | **re-read at 10.84-21.52: identical verdicts and counts**; both readings kept | closed |
| cost A/B | bp13 10, bp12 9, fv5 1 (NR) over 25 ms; 4×40 lead 1.742-2.055 / 1.71-2.011 / 0.145-0.214; higher than pass 13 on all three arms alike | Q-15 (a); the builds do not separate |
| `first-expand` [lanes], icon-button clip from 40 px in one frame, Playwright WebKit | bp13 2 of 11 (battery W·d main NR; `fe` W·l r5); bp12 0 of 16 here, 1 in BU (`warm-collapse`) | the critic's edge-law-range attack and the window attack in Playwright WebKit (§P13-7.4) |
| `swap-short` [blank] at +18-21 ms | bp13 1 of 20, bp12 2 of 20; every read sits at 1 blank frame | the base's near-bound class (§P13-8) |
| `swrev` splice `s7\|s8` | bp13 3/128, bp12 7/128; 0 ink between the edges, and the glyph across reads 0 | beside the rows; no ink cut |
| the reversal stub on bp12 | 2 of 48 (C·d), "n" at 886.9 px | rule (d)'s reference |
| R2 | thinnest bp13 0.075 (W·d `first-expand` 8); W·l `swap-long` seat 1 0.088 | the critic's R2 attack at 10-15 (this seat's band ran at 3.51-14.93 with the machine quiet) |
| [terminal], [faces], [leaving] | 0 red on either build at 8 rounds per theme | the base's; none drew this pass |
| the guard's admission wait decoupling a start gate from the run (fv5 r3: gate 10.14, cells 24.85-34.83; waits of 27 and 68 min) | a seat that gates outside `guarded` can run above its gate | **critics read the gate inside the admitted slot** (`costfv5.sh`) or check each cell's load |
| ZONE: refusal at 8.16M (09:16:15, before the reboot); ZONE-ARMED warning (inuse 29,715) admitting the last three fv5 runs after it | the guard's stop, then a warning; readings it admitted are of record | the owner's 2026-11-03 order |
| real Safari | **UNMEASURED (owner's safaridriver checkbox)** | O-103 |

---

## 7 · Fences, as kept

- **Worktree:** `.claude/worktrees/bl/D2/p14/Bp-remeasure/wt`, detached at `392ff1e3c` in both entries. In the completion, `node_modules` and `tests-visual/node_modules` were symlinked from the checkout. Builds, caches and outputs went under `Bp-remeasure/out/`. **Git writes:** `git worktree add` and `git worktree remove --force` only; `git apply` ran only in the worktree, with no commit. At the end of the completion the worktree entry was removed (`git worktree list` shows no `Bp-remeasure`) and **`.claude/worktrees/bl/D2/p14/Bp-remeasure/` was deleted**, along with the first entry's leftover outputs.
- **Writes to the checkout:** this file and `pass-14/D2-Bp-remeasure-records/` only. The completion moved the nine 09:16 refusal logs into `cost/refused-0916/`, and the new cost logs took their paths. No tracked source was edited. Nothing under `~/.claude` was read: the guard was invoked, never read, and its warning and refusal texts are quoted from this seat's own logs. Sibling repos were neither read nor run.
- **Processes:** the first entry's chain ended `RUN-DONE` at 09:16:25. The completion's chains ended `COMPLETE-DONE` at 15:02:23 and `FV5-DONE` at 15:34:46. No process of this seat remains.
