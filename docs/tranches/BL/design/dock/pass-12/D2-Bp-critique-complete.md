# D2 · pass 12 · D2-B′ completion critique (`bp12`): 35/38 on the ruled digest; rule (b) fires on a Chromium reversal stub the base build carries

| field | value |
|---|---|
| seat | D2 pass-12 COMPLETION CRITIC of D2-B′, the critic of record for pass 12 (REGISTRY §P12-7.2). Authored nothing in D2 and was no earlier D2 critic. Two entries of one seat: the first (2026-11-03 21:34 → about 2026-11-04 03:00) built the arms, started the chain and died at a login expiry with no report; this entry (05:28 →) waited on the orphaned chain (PID 54942) to its end, ran no second battery, ran two attribution A/Bs, and wrote this report |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree detached at `85c9adbf3`, the checkout's HEAD at the first entry's start. The checkout is at `7da9a0285` at this entry's end; `git diff --name-only 85c9adbf3 HEAD -- src demo tests package.json docs/design` is empty, so every reading describes today's tree |
| patches | re-hashed at this entry's start and end: `pass-12/D2-Bp-p12.patch` **`5318a3dcefdb9ca86337b780ff35784a82291f9108953098b950905e8696cff7`**, `pass-11/D2-Bp-p11.patch` `b5d5c9db…`, `pass-6/floor-v5.patch` `cba6bdc2…`, `pass-4/floor-v3.patch` `637d1625…`. Staged with `git apply` only, no commit (`apply.log`; `git log -1` in the worktree is `85c9adbf3`, and `git status` there shows the 77 applied paths uncommitted). p12 numstat: 62 paths |
| builds | `fv3`, `fv5`, `bp10` (+ `bp10fs`, `bp10t`), `bp12` (+ `bp12fs`, `bp12t`, `bp12i`, `bp12fsi`), each exit 0 (`build-*.log`). The instrumented trees were patched for their build only and restored `equal`. bp12's demo scene chunk is `useDockScene-3klTy4RY.js`, 21,483 B, the builder's size |
| harness | H8 as landed. 42 files OK against `pass-8/H8-records/harness.sha256`, list hash `9d12810bc24d91d2`, at the first entry's start (`harness-check-start.txt`), at the chain's start (`chain.log`), and at this entry's end (`harness-check-end.txt`) |
| rulings | `audit/INBOUND.md` re-read to O-129 and `FORMATION-PROGRESS.md` to its last line (05:3x, the resume). O-123 and O-124 are placed at W-0.8 §11 and open no row. O-129 places its r9 (a seat-tooltip ruling) at D2 pass 13, so it opens no pass-12 row. O-87, O-88, O-103 and O-118 bind as they stand |
| engines | Chromium (Playwright's default headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| zone | the owner's 2026-11-03 order (resume all held work, no deferral) meets §P12-7.1's precondition. `guarded` printed its ZONE-ARMED warning (inuse about 30k) on every WebKit queue and refused no run |
| records | `pass-12/D2-Bp-critc-records/`: `battery/`, `digest/`, `filmstrips/` (108 battery strips), `fm-reads.txt`, `r2-margins.txt`, `F7/`, `PR/`, `rerun/`, `q/` (the four read queues, their `.done` lists and slot logs), `ab/`, `cr/`, `fmab/`, `si/`, `r2/`, `r2x/`, `lanes/`, `revst/`, `swrev/`, `rtrev/`, `edge/`, `fs/`, `heir/`, `frz/`, `cases/`, `cost/`, `followup/`, `sum/` (every summary below), `scripts/`, `chain.log`. No video |

Load is the 1-minute load average. "C" is Chromium, "W" Playwright WebKit, "·l / ·d" light / dark. `R` is `pass-12/D2-Bp-critc-records/`.

---

## 0 · Verdict

| digest | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| **ruled (O-103), B2 read on the strips too: the score of record** | **35/38** | **33/36** | **22/24** | **P3, R6, B2** |
| default | 34/38 | 32/36 | 21/24 | P1 (OWNER-BLOCKED, Q-12), P3, R6, B2 |

**One cell opens three rows.** C·l W3 `reversal` reads [stub] in the battery's main run (load 11.81) and again in re-run 1 (9.79): the same glyph, "n" of a tab button, painted 30 % at opacity 1 by a hard edge (10→90 % alpha in 0.24 px) at **886.9 px**, at **+116.7 ms**, in both reads. Re-run 2 (10.47) reads 0 stub. Under H6-7 re-run 1 reproduces the check, so the cell is FAIL on both digests. The cell's `stub` check feeds P3 (every W3 check), R6 (W3 stub) and B2 (W3 stub, H6-1), and each of those rows reads FAIL 39/40 or 41/42 in C·l only (`digest/rows-p12critc-ruled.md`). Every other row is PASS in all four columns. 671 cells: 0 NOT-REPRODUCED, 12 UNMEASURED (W8 `consumer·*`), 12 RECORD (W7 2 and R6 1 per column), and no FAIL outside CASES and that cell.

**The §P11-7.1 rules:**

| rule | reading | fired? |
|---|---|---|
| (a) two `splice` reads at one `retarget` cell, one column, one A/B | bp12 **0 of 96** (C 0/48, W 0/48), sliver 0 of 96; bp10 0 of 96 (`sum/absum.txt`) | **no** |
| (b) two `stub` reads at one slot, one column, one battery | **C·l W3 `reversal`: main and re-run 1 both stub "n" at 886.9 px, +116.7 ms** | **yes** |
| (c) any bp12 `content-remove` A/B read whose flag closes over 2F + 0.5 after landing | bp12 **0 late in 32**, and every gap is 0 ms in all four columns (`sum/crsum.txt`) | **no** |

**So pass 12 is NOT CLEAN** on this seat's reading: three rows open on the ruled digest, and rule (b) fires. By §P12-7.2 the count stays at 0 and pass 13 is a build pass with the list held fixed. That is the agglomeration's to rule.

**What the red is (§2): the base's.** The A/B this seat added (`followup/rev/`, 8 rounds per Chromium theme, bp12 and bp10 alternating, every read started at ≤ 11) reads the identical stub, "n" at 886.9 px, on **bp10 3 of 16** and **bp12 0 of 16**, at loads 4.91-6.46. The builder's own battery read it on bp12 too: C·l main, at 13.1. The earlier seats' bp10 and bp8 records read 0 in 22 C·l and C·d reads of this cell. It is the shared reversal-stub class pass 11 placed (C11 §3.2: "n" 37 % at 887.1 px on bp10, 2 of 96 against bp8 5 of 96), now drawn twice in one battery slot. §P9-0 finding 2 governs: an attribution to the base does not close a row, and this seat turns none.

**What bp12's cures did, read here:**
- **The window.** Rule (c) does not fire. In Playwright WebKit bp12's `content-remove` gaps are 0 in all 16 A/B reads, while bp10 reads its second window at 31-34 ms in 8 of 16 (OWNER-BLOCKED on the allowance). On the `lanes` attack (§3.1) bp12t reads no late window in 72 and bp10t reads 2 late. Neither build paints motion after any close.
- **B2.** The FM A/B reads 0 hole reads in 32 on bp12 and 0 in 32 on bp10. By eye every WebKit `warm-expand` and `first-expand` strip in the battery has ink in slot 2 on every tile (§4).
- **The retarget splice** reads 0 of 96 on the A/B. But a **new phase point reads a splice twice on bp12** in W·d: the swap reversed at 40 ms, then retargeted 32 or 64 ms later, `s7|s8`, gaps 7.46 and 7.56 px (§3.3). It is a probe reading, not a row and not rule (a). Its attribution read (F2) finds it on the base too: **bp10 3 of 32, bp12 2 of 32** at that point (§3.3).

---

## 1 · How this seat ran

| step | start → end | load (start / cells) |
|---|---|---|
| builds (first entry) | 2026-11-03 21:35 → 22:26 | each exit 0 |
| PR (`--light`, no browser), F7 | 22:26 → 22:32 | 11.34 / 13.78 |
| the owed re-runs (W·l, one `--exclusive webkit` slot) | queued 22:33:19 at 8.99, admitted 22:35:59 at 11.89 → 22:38:16 | 10.73, 10.92 |
| battery C·l / C·d / W·l / W·d, one `theme` slot each | 22:38:20 (10.16) → 23:02 · 23:02 (10.78) → 23:24 · 23:24 (11.15) → 23:35 · 23:35 (12.21) → 23:46 | cells to 14.00, 15.48, 13.65, 13.33 |
| `fmlow` W·l / W·d | queued 23:46:37, admitted 01:10:58 at 9.45 (84 min) · queued 01:10:59, admitted 02:35:00 at 9.37 (84 min) | 9.49-13.77 / 9.59-11.48 |
| digest (two `--light` runs, no browser) | about 02:35 | — |
| read queues C·l / C·d | 02:35 → 03:16 · 03:20 → 04:03 (exit 75: gate unmet 10 min) and 04:32 → 05:12 | ab, cr, si 7.41-12.14 |
| **the first entry dies** (about 03:00, login expiry); the chain runs on, orphaned, under `guarded` | — | — |
| this entry: wait on PID 54942 | 05:28 → 10:42:38 (`CHAIN-DONE`) | — |
| read queue W·l, slot 1 | queued 05:12:08, **admitted 06:32:06 at 13.67 (80 min)** → 07:51:26 (exit 75, its own 80-min budget) | — |
| W·l slot 2 | queued 07:51:26, admitted 08:21 (30 min) → 08:26:36 | — |
| W·d slot 1 / slot 2 | queued 08:27:11, admitted 08:36:56 at 9.48 → 09:55:46 (exit 75, budget) · queued 09:55:46, admitted 10:11:35 at 6.12 → 10:33:31 | — |
| cost (Chromium, `--cpu-cores 0`) | 10:33:36 → 10:42:38 | starts 7.5-11.84 |
| **follow-up F1** (`scripts/followup.sh`, after 54942 exited) | 10:42:42 → 10:52:15 | 4.91-6.46 |
| **follow-up F2** (W·d, `--exclusive webkit`) | queued 10:52:15, admitted 11:45:19 at 13.83 (53 min) → 12:12:29 | 9.39-20.26 (cells; every start ≤ 11) |

- **One heavy run at a time.** The first entry's chain held the seat lock for its whole run. This entry ran nothing heavy until PID 54942 had exited, and `followup.sh` waited on that PID before its first step. The A/B read queues ran one guarded slot at a time: every read started at load ≤ 11 with no timeout into a higher start, every attack read at ≤ 15, and `r2x` at 10-15 (after a 10-min wait it runs at the load it finds, and its log records that load).
- **No admitted slot was ended by stopping its parent.** Every slot ended by finishing its queue or by its own exit 75 (budget or gate) and was requeued. **No WebKit lock wait passed 90 min**: the longest were 84 min (`fmlow` ×2) and 80 min (W·l queue slot 1). None was cancelled.
- **No battery slot read a cell above 31, so no slot was re-read.** The highest cell load is 15.48 (C·d). The W·l reading replaces the builder's slot that ran to 33.37, and the builder's slot stays in its records.
- No WebKit page close, no headed run, no GPU args, no browser MCP. Every witness and probe opens one browser and a fresh context per cell, under the landed `launch()`'s 60-load restart (H3-1).

**The owed re-runs (§P12-7.2 item 3; `R/rerun/`).** `w3-morph.mjs` on bp12, Playwright WebKit light, cells `retarget·40`, `retarget·120` and `content-remove`, two runs at 10.73 and 10.92. **3/3 PASS in both runs.** The builder's `content-remove` [trajectory] and the `retarget·40` / `·120` [stub] pair are NOT-REPRODUCED. The re-run slot was admitted at 11.89, and each run's own start was at ≤ 11. **Rule (b) on that pair:** it was one W3 run of an A/B, not a battery, and this seat's W·l battery reads 0 stub at those slots. So the pair does not fire (b). The (b) that does fire is §0's.

**The builder's C·l `reversal` read, re-read.** `D2-Bp-build-records/battery/bp12-main-W3-chromium.log` reads the same [stub] ("n" 30 % at 886.9 px, +116.7 ms, load 13.1) beside its [window]. BU §5 reports that cell as [window] only. Its two re-runs read 0 stub, so the builder's digest reads it NOT-REPRODUCED, and nothing of record changes. It is recorded because it is the third bp12 read of this stub.

---

## 2 · The open rows: C·l W3 `reversal` [stub]

| read | load | stub | where | window (Q-4 (c)) | cell |
|---|---:|---|---|---|---|
| battery main | 11.81 | **1 frame** | "n" 30 %, edge 886.9 px, +116.7 ms | 274.9 ms after the retarget; holds ≤ 313.6 | **FAIL** (stub) |
| re-run 1 | 9.79 | **1 frame** | the same | 275.4; holds | **FAIL** (stub) |
| re-run 2 | 10.47 | 0 | — | 275.1; holds | OWNER-BLOCKED → PASS ruled |
| C·d battery main | 9.14 | 0 | — | holds | OWNER-BLOCKED |
| C·l / C·d `r2/` whole W3, bp12 ×2 each | 7.2-12.27 | 0 | — | holds | OWNER-BLOCKED |

The checks that fail are H6-1's stub law: a glyph painted 10-90 %, at any opacity, by an edge whose alpha goes 10→90 % inside 2 px, inside the plate. The window reds on these reads are Q-4 (a)'s; the ruled branch turns them to PASS, so the stub alone carries the cell.

**Is it the build's?** The follow-up A/B F1 (`R/followup/rev/`):

| column | bp12 stub reads | bp10 stub reads | signature | load |
|---|---:|---:|---|---|
| C·l | 0 of 8 | **1 of 8** (r1) | "n" 30 % at 886.9 px | 4.91-6.46 |
| C·d | 0 of 8 | **2 of 8** (r3, r8) | the same | 5.14-5.82 |
| total | **0 of 16** | **3 of 16** | | |

Over this seat's reads of the cell, bp12 reads it 2 in 24 and bp10 3 in 20. With the builder's battery, bp12 reads it 3 in 27. **The class is the base's**, at one place: the reversal's `retarget` frame at +116.7 ms, where an edge sits 0.24 px wide at 886.9 px across the "n" of a tab button. That is the shared reversal-stub class of C11 §3.2 (bp10 "n" at 887.1 px, "g" at 891.3 px). Playwright WebKit reads 0 here on either build, in the battery and in `revst`.

**Ruling, as this seat reads the cell:** the digest's FAIL stands, and rule (b) fires on its wording. Pass 11 placed this class as "the shared single-frame class of the base; rule (b) per column", and this battery drew it at one slot twice. The attribution to the base changes nothing (§P9-0 finding 2). It is a lead for pass 13's builder, not a cause: the edge's 0.24 px ramp says it is not a seam ramp (those rise over one seam, `1ch`), so it is either the plate's own edge or a clip edge that met no ramp on the retarget frame. This seat did not trace which. Real Safari is UNMEASURED.

---

## 3 · The attacks (§P11-7.4 and §P12-7.2 item 6)

### 3.1 · The window, late and early, in Playwright WebKit at load ≤ 11

`lanes.mjs` (the builder's) on bp12t and bp10t alternating, morph and swap scenes, 4 rounds per WebKit theme, 9 cells each (`R/lanes/`, `sum/lanes.txt`, `sum/early.txt`):

| column | build | late (close − land > 2F + 0.5) | non-zero gaps | windows with motion after the close | load |
|---|---|---:|---|---:|---|
| W·l | bp12t | **0 of 36** | `lead-*` 15-18 ms ×8; `swap-*` 17-19 ×6; `content-add` 16, `content-remove` 15, `warm-*` 17-18 ×2 | **0** | 8.67-10.98 |
| W·l | bp10t | 1 of 36 (`content-remove` 48 ms) | `content-remove` 33, 34, 48 | 0 | 8.73-10.82 |
| W·d | bp12t | **0 of 36** | `lead-*` 13-17 ×8; `swap-*` 16-19 ×7; `warm-expand` 16, 18 | **0** | 3.56-5.18 |
| W·d | bp10t | 1 of 36 (`content-remove` 35 ms) | `content-remove` 32, 33, 35 | 0 | 3.45-5.24 |

Every bp12t non-zero gap is one frame: the extent's in-band step before its seat, a frame that paints motion inside the window (BU §1). No bp12t read opens a second window. No window on either build closes while a lane still paints (`early.py`: a frame after the close with a painted lane step, an extent step or a lane still moving). With the `content-remove` A/B (§0: bp12 gaps 0 ×16 in WebKit, bp10 31-34 ms in 8 of 16), **the second-window class reads cured on bp12, and no window is closed early.**

### 3.2 · B2 at its slot and offset

FM A/B (`R/fmab/`, `film·warm-expand` / `first-expand`, 8 rounds per WebKit theme): **bp12 0 hole reads in 32, bp10 0 in 32**, 0 stub (loads 7.85-12.92). The battery's FM (`fm-reads.txt`): C·l 0 in 18, C·d 0 in 18, W·l 1 hole frame in 36, W·d 1 in 36. The two are both `fmlow` r2 `warm-collapse`, **slot 5**, one frame at +0 ms (ink 0.08 at 12.91 and 0.071 at 9.59). H8-1 reads each as one read in its column, so B2 is PASS ×4 on FM. The display-frame probe (`R/si/`, 3 rounds, all four columns) reads **0 of 72 runs with an empty frame on both builds**. bp12's lowest minInk is 0.422 (`swap-long` "Tools", every column), and bp10's is 0.191 (W·d `first-expand` "1").

**The strips, by eye** (cropped montages of the top tiles):
- every WebKit `warm-expand` strip (W·l main ×3 + `fmlow` ×3, W·d the same): "H P 2 3" → "H 1 2 3", with P whole or fading and then "1", and **ink in slot 2 on every tile**. No "H ' 2 3" tile;
- every WebKit `first-expand` strip (12): the same, P faded, then "1";
- W·d and W·l `fmlow` r2 `warm-collapse`: the slot-5 frame is the far seat ("Square") taken by the closing plate's own edge on the first collapse tile. That is the class pass 11's re-measure and the builder read at this cell (0.085, 0.071), the plate's edge rather than a seam;
- Chromium `warm-expand`, `first-expand` and the swaps, both themes: no empty tile. The swaps' one tile of soft partials ("C ɔols Brushes") is the §P6-2 class.

**B2 is PASS on the strips in all four columns.** On the digest its C·l cell is FAIL through H6-1's W3 stub only (§2), not through FM or the strips.

### 3.3 · The retarget class at `edge`, `swrev`, `rtrev`, `revst`

All on bp12 unless marked, with the landed `spliceRow`, `blankRow` and `stubRow` (`sum/summ.txt`):

| reading | reads per column (C·l, C·d, W·l, W·d) | splice | sliver / blank | stub | load |
|---|---|---|---|---|---|
| `edge` (`sweep.mjs`, N 0-40 by 4 and 200-320 by 10, 2 runs) | 48 ×4 | 0 | 0 / 0 | 0 | 6.88-14.27 |
| `revst` (rev-c at 0.2-0.9, bp12 / bp10 alternating, 2 rounds) | 24 / 24 per build ×4 | 0 | 0 / 0 | 0 | 7.47-14.97 |
| `rtrev` (a retarget during the morph reversal, D 16/32/64) | 48 ×4 | 0 | 0 / 0 | **1** (C·l rev-c-rt+32 at 0.5 r1, 8.81) | 7.53-16.4 |
| `swrev` (the swap reversed, then retargeted; bp12 2 runs, bp10 control D 16/32 1 run) | bp12 40 ×4, bp10 10 ×4 | **bp12 W·d 2** | 0 / 0 | 0 | 7.01-16.32 |

**The `swrev` splice.** bp12 W·d reads `s7|s8` at the same phase point in two runs: the swap reversed at 40 ms, then the retarget 32 ms later (r1, gap 7.46 px at +117 ms, 9.09) or 64 ms later (r2, gap 7.56 px at +152 ms, 12.1). Both are on frame 4, with sliver 0 and stub OK. Every other bp12 `swrev` read in four columns, 158, is 0, and so is bp10's control (40, including `40 then 16/32` in W·d at 13.03-14.24). Pass 11 read bp10 0 in 160 `swrev` reads. This is the splice class the pass-10 cure was built against, at a phase point the retarget A/B does not drive. The probe turns no row, rule (a) is the retarget A/B's and reads 0 of 96, and critics mint no row. It is placed for pass 13's build with its attribution read:

**F2** (`R/followup/swrev/`; `swrev.mjs --at 40 --then 0,16,32,64 --runs 2`, Playwright WebKit dark, bp12 and bp10 alternating, 4 rounds, one `--exclusive webkit` slot queued 10:52:15 and admitted 11:45:19 at 13.83, a 53-min wait; each invocation started at ≤ 11):

| build | reads | splice `s7\|s8` | where | sliver / stub | load (cells) |
|---|---:|---:|---|---|---|
| bp12 | 32 | **2** | `40 then 16` r1-2 (8.1 px, +102 ms, 10.88); `40 then 64` r2-2 (7.43 px, +150 ms, 11.36) | 0 / 0 | 10.11-11.48 |
| bp10 | 32 | **3** | `40 then 32` r2 ×2 (7.24 px +115 ms at 10.74; 7.43 px +116 ms at 13.17); `40 then 16` r4-2 (7.6 px, +102 ms, 9.39) | 0 / 0 | 9.39-20.26 |

**The splice at this phase point is the base's.** bp10 reads it 3 of 32, bp12 2 of 32, always on frame 4 at seats 7|8 with a 7.2-8.1 px gap. Pass 10's cure (0 of 456 A/B reads since) holds at the `retarget·N` cells it was built for. At "the swap reversed, then retargeted 16-64 ms later" both builds still splice about one read in ten in Playwright WebKit dark. Pass 11 swept `swrev` at 2 runs and read bp10 0 of 160. This seat's 40 bp12 reads plus F2's 64 are the first to find the point. The C·l, C·d and W·l `swrev` reads are 0 on both builds. Placed for pass 13's build, as a class of the base at a phase no rule reads; it turns no row.

### 3.4 · R2 at load 10-15, above all W·l seat 8 `warm-expand`

The worst one-frame leaving drop per W3 run (bound 0.5; `sum/csum.txt`, `r2-margins.txt`):

| reading | C·l | C·d | W·l | W·d |
|---|---:|---:|---:|---:|
| battery (of record) | 0.128 (`swap-long`, seat 1, 11.27) | 0.125 (`first-expand`, seat 8, 9.14) | 0.038 (`swap-short`, seat 3, 11.24) | 0.040 (`warm-collapse`, seat 2, 10.93) |
| `r2/` bp12, worst of 2 | 0.128 | 0.128 | 0.042 | 0.050 |
| `r2/` bp10, worst of 2 | 0.116 | 0.117 | 0.031 | 0.037 |
| `r2x/` (WebKit, 10-15), bp12 worst of 3 | — | — | **0.006** (`swap-long`, seat 2, +133 ms, 12.03) | 0.035 (`retarget·80`, seat 1, 7.75) |
| `r2x/` bp10, worst of 3 | — | — | 0.044 | 0.017 (`swap-long`, seat 1, 9.27) |

- **Seat 8 `warm-expand` does not separate the builds.** Its drop reads bp12 0.431, 0.444, 0.447, 0.456, 0.458 (W·l) and 0.415, 0.43, 0.432, 0.443, 0.444 (W·d), against bp10 0.427, 0.431, 0.442, 0.449, 0.469 (W·l) and 0.423, 0.432, 0.438, 0.451, 0.454 (W·d). The builder's 0.024 at seat 8 is not reproduced as a seat-8 tail. bp10's worst seat-8 read (0.469) is above bp12's (0.458). The heir's held middle does not raise the leaving unit's last drop at this sample.
- **One W·l read is the thinnest B′ has read: 0.494 on `swap-long` seat 2** (r2x bp12 r3, 12.03), a margin of **0.006**. The other ten W·l `swap-long` reads on both builds (battery, `r2/`, `r2x/`) sit at 0.349-0.458. R2 reads PASS (under 0.5), so it is no row. It is one read on a seat neither earlier seat named, and it is placed for pass 13 beside the margin class (§P12-7.3 item 2: the R2 margin is no row).

### 3.5 · The heir, the frozen frame, CASES

- **The heir** (`R/heir/`; `heirprobe.mjs` on bp12i, `fsheir.mjs` on bp12fsi, both engines, identical): every tied unit takes `enter` (`first-expand`, `warm-*`, `swap-*`, `vfirst-expand`, `end-first-expand`, `three-*`). The constructed `fs-to-three` gates its arriving heir at `de 40`, and `fs-to-one` takes it at `de 0`. In paint (`R/fs/`, bp12fs / bp10fs, 3 rounds per column) `fs-to-one` shows no hole in 24 runs. `fs-to-three` flags one frame at C, −1.5 to +15 ms, in every run of both builds: the probe's `wide` attribution limit (C11 §3.3). **`o.enter` holds.**
- **`vmorph` collapse on the frozen frame** (`frz.mjs`, T 42-62 by 4, 2 runs, 48 reads): it froze on a `s2|s3` splice frame in C·l 3, C·d 3, W·l 0 and W·d 1. `facingCut` is 0 on all 48, and the freeze held on all 48. **No ink is cut at the leaving pair**, in both engines.
- **CASES `case·rotated`** (outside the 38, for the record; `R/cases/`, C·l and W·l, bp12 / bp10 alternating, 3 rounds). C·l reads [jerk] FAIL on `case·rotated` bp12 1 of 3 (5.99 against control 4.28 + 1) and bp10 1 of 3 (5.27 against 4.23 + 1). W·l reads FAIL on bp12 4 of 6 cells ([snap] 0.59-0.63 px ×3, one [jerk]) and bp10 4 of 6 ([snap] 0.54-0.69 px). The battery's W·l reads FAIL in the main run and re-run 2, and PASS in re-run 1. **It does not separate the builds.** §P12-2's ruling (the landing step on the closing frame meets W-8 as written) stands as placed.

### 3.6 · The header and the facing-pair comment against the code; the centre law's boundary

Read statically on the patched `useDockScene.ts` (1,523 lines):
- "The model" (centres, a box's own centred scale moving the model not at all) is `fine()`: `((a.left + a.right) / 2 − f.left) / sx − s.w / 2 − wrote − clientLeft − at`, accepted within `OFFSET_ROUNDING_PX` (0.501);
- "The handoff" (the leaving unit's ramps rise to full by its middle; the arriving unit takes the given part at full ink, with its ramp beyond) is `k = (m.exit?.heir && q) || m.seam` and the limiter's `g0 − m.seam − box.lo` / `box.hi − g1 − m.seam`;
- "The window" ("an episode lands once") is `land()` (`if (anyMoving()) return; … setWindow(false)`) and the guard `!morphing && reach > LAND_PX && anyMoving()`;
- the facing-pair comment's "unless both units are going out" is `(u.m.exit && w.m.exit) … continue`, and "a unit going out is never held" is `const g = w.m.exit ? u : w`.

Each says what the code does. This seat agrees with C12 §2 and finds nothing it missed. **The boundary:** `sx` / `sy` are the root's ratio, so a frame (a cell) carrying a scale of its own would toggle the fraction (C12 §2.1). No dock CSS scales a container that frames units. It is a boundary to check at the landing (§P12-5), and no cell is added.

---

## 4 · The A/Bs (§P12-7.2 item 5), bp12 against bp10 alternating, 8 rounds, both themes and engines

| A/B | C·l | C·d | W·l | W·d | source |
|---|---|---|---|---|---|
| `retarget·40/80/120`: splice / sliver | 0/24, 0/24 · bp10 0/24, 0/24 | the same | the same | the same | `sum/absum.txt` |
| other retarget reds | none | none | none | bp10 `retarget·120` r2 [leaving] at 9.94 | |
| `content-remove`: bp12 gaps | 0 ×8 | 0 ×8 | 0 ×8 | 0 ×8 | `sum/crsum.txt` |
| `content-remove`: bp10 gaps | 0 ×8 | 8.4, 0 ×7 | 34, 0, 34, 34, 31, 0, 0, 0 | 34, 0, 33, 33, 33, 0, 0, 15 | |
| `content-remove`: late | bp12 0 · bp10 0 | 0 · 0 | 0 · 0 | 0 · 0 | |
| FM holes (WebKit) | — | — | bp12 0/16 · bp10 0/16 | bp12 0/16 · bp10 0/16 | `sum/csum.txt` |
| display-frame, runs with an empty frame | 0/18 · 0/18 | 0/18 · 0/18 | 0/18 · 0/18 | 0/18 · 0/18 | |
| load (A/B reads) | 5.84-12.14 | | 7.62-12.95 | | each log |

Every A/B read started at load ≤ 11. The loads above are the cells' own, read inside the run.

**Cost** (Chromium, `D2-Bp-probes.mjs pcost,plead`, 3 rounds, `--cpu-cores 0`, each started at ≤ 15; `sum/costtab.txt`): frames over 25 ms on the four 4× rows are **bp12 6, bp10 4, fv5 0** (loads 6.49-13.33). Main-thread ms per frame on 4×40 lead is bp12 1.658-1.793, bp10 1.536-1.606, fv5 0.103-0.264. bp12 and bp10 do not separate. Floor v5's lead rows run at about a tenth of B′'s main-thread time, which is the lead Q-15 (a) prices.

**The boot graph** (`F7/boot-graph.txt`): 64 files, **503,787 B against 503,808, margin 21 B**, as the builder read. Scene chunk 21,483 B. F7 13/13 at 13.78, PR 6/6 at 11.34, L1 6/6 per engine against `fv3`.

---

## 5 · The 38 rows (ruled; default beside it)

From `R/digest/{rows,counts,table}-p12critc[-ruled].md` (`harness/cells.mjs`, 671 cells). P = PASS.

| row | C·l | C·d | W·l | W·d | ruled | default | note |
|---|---|---|---|---|---|---|---|
| P1 | 42/42 | 42/42 | 42/42 | 42/42 | PASS | OWNER-BLOCKED (Q-12) | |
| P2, P4, P5 | P | P | P | P | PASS ×3 | PASS ×3 | |
| **P3** | **41/42** | 42/42 | 42/42 | 42/42 | **FAIL** | **FAIL** | C·l W3 `reversal` [stub] (default also [window]), §2 |
| F1-F5 | P | P | P | P | PASS ×5 | PASS ×5 | |
| F6 | 163/163 | 151/151 | 169/169, UM 5 | 157/157, UM 5 | PASS | PASS | 0 crashes; UM = ST's `stall·nb·*` markers |
| F7 | source 13/13 | | | | PASS | PASS | at 13.78 |
| N1-N5 | P | P | P | P | PASS ×5 | PASS ×5 | N5 with PR 4/4 |
| R1 | 32/32 | 30/30 | 32/32 | 30/30 | PASS | PASS | no [terminal] borderline this battery |
| R2 | 33/33 | 33/33 | 33/33 | 33/33 | PASS | PASS | margins §3.4 |
| R3, R4, R5 | P | P | P | P | PASS ×3 | PASS ×3 | |
| **R6** | **39/40** | 40/40 | 46/46 | 46/46 | **FAIL** | **FAIL** | the same cell; FM stub 0 ×4 |
| R7 | 35/35 | 33/33 | 35/35 | 33/33 | PASS | PASS | |
| R8 | 9/9 | 7/7 | 9/9, UM 5 | 7/7, UM 5 | PASS | PASS | |
| B1, B3 | P | P | P | P | PASS ×2 | PASS ×2 | PR 5/5 |
| **B2** | **39/40** | 40/40 | 46/46 | 46/46 | **FAIL** | **FAIL** | the same cell (W3 stub, H6-1); FM and the strips clean, §3.2 |
| C1-C9 | P | P | P | P | PASS ×9 | PASS ×9 | |
| L1 | 6/6 | | 6/6 | | PASS | PASS | against `fv3` |

**Counts: ruled 35/38, 33/36, 22/24. Default 34/38, 32/36, 21/24.** Every verdict is the H8 digest's. This seat's instruments turned no row either way: the F1 attribution and the `swrev` splice are readings beside the rows.

**§P11-7.5's clean test, on this reading:** 3 open rows of 38 on the ruled digest, and rule (b) fires, so **pass 12 is not clean**. B2 is read on the strips (clean), and (a) and (c) hold.

---

## 6 · Defect classes seen, for placing (no row minted)

| class | where | note |
|---|---|---|
| **C·l W3 `reversal` [stub]: "n" 30 % at 886.9 px, +116.7 ms, a 0.24 px edge, at one slot twice in one battery** | §2 | **P3, R6, B2 FAIL; rule (b) fires.** The base's: F1 bp10 3/16, bp12 0/16 (4.91-6.46); the builder's battery read it once on bp12 (13.1). C11 §3.2's shared reversal-stub class. Playwright WebKit 0. Real Safari UNMEASURED |
| **`swrev` W·d splice `s7\|s8`: the swap reversed at 40 ms, retargeted 32 / 64 ms later, 7.46-7.56 px, bp12 2 of 40** | §3.3 | a probe reading at a phase the retarget A/B does not drive; rule (a) reads 0/96. **The base's**: F2 bp10 3/32, bp12 2/32 (9.39-11.48 at the splice reads); C·l, C·d, W·l 0. For pass 13's build |
| **R2 W·l 0.494 (`swap-long`, seat 2, 12.03): margin 0.006** | §3.4 | the thinnest B′ read, one read; R2 PASS; the margin class (no row) |
| R2 seat 8 `warm-expand` (the builder's 0.024) | §3.4 | does not separate the builds (bp12 ≤ 0.458, bp10 ≤ 0.469); the heir's held middle does not spend it at this sample |
| W·l and W·d `fmlow` r2 `warm-collapse`, slot 5, one hole frame at +0 ms (0.08, 0.071) | §3.2 | the far seat cut by the closing plate's own edge; NR under H8-1 in each column; the class pass 11 and BU placed |
| the second window (`content-remove`, WebKit) | §0, §3.1 | **read cured on bp12**: gaps 0 ×16 against bp10 31-34 ms in 8/16; `lanes` bp12t 0/72 late against bp10t 2/72; no window closed early on either build |
| the B2 gift frame | §3.2 | read cured in paint: FM 0/32, strips clean ×4 columns, display-frame minInk ≥ 0.422 |
| `rtrev` C·l one stub (rev-c-rt+32 at 0.5, 8.81) | §3.3 | one read; the reversal-stub family |
| bp10 W·d `retarget·120` r2 [leaving] (9.94) | §4 | the control's; one read |
| CASES `case·rotated` C·l [jerk], W·l [snap] | §3.5 | outside the 38; bp12 and bp10 equal (4/6 each in W·l); §P12-2's placement stands |
| cost bp12 6, bp10 4, fv5 0 | §4 | noise at the threshold; Q-15 (a) |
| boot graph 21 B | §4 | as BU; the landing's first step re-reads the ceiling (§P12-5) |
| the builder's BU §5 C·l `reversal` [window]-only report | §1 | its main read also carried this stub; its digest NR; recorded |
| the builder's owed re-runs | §1 | NOT-REPRODUCED (3/3 PASS ×2 at 10.73, 10.92) |
| the first entry's death at the login expiry | header | the chain ran on, orphaned, under `guarded` to `CHAIN-DONE`; this entry waited on its PID and ran no second battery |
| WebKit lock waits 84, 84, 80, 53, 30, 16 and 9 min | §1 | waited out, none over 90 |
| real Safari | every cell | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted |

---

## 7 · Fences, as kept

- **Worktree:** `.claude/worktrees/bl/D2/p12c/Bp-crit/wt`, detached at `85c9adbf3`, with `node_modules` linked from the checkout. Builds, caches and outputs went under `Bp-crit/out/`, and the scratch harness copy under `Bp-crit/hfs/`. **Git writes:** `git worktree add` and `git worktree remove --force` only. `git apply` ran only in the worktree, with no commit.
- **Writes to the checkout:** this file and `pass-12/D2-Bp-critc-records/`. That includes this entry's `scripts/csum.py`, `scripts/early.py`, `scripts/followup.sh`, `sum/`, `followup/`, `followup.out` and `harness-check-end.txt`. No tracked source was edited. Nothing under `~/.claude` was read: the zone state is known only from `guarded`'s own messages, and `ps` was used to see the WebKit queue. Sibling repos were neither read nor run.
- **Machine law:** every build, browser run and digest went through `guarded`. Browser runs were never `--light`, and Playwright WebKit ran under `--exclusive webkit`, queued and never cancelled. One heavy run at a time. Processes were stopped by PID only, and none had to be stopped. Strip montages for the eye read were made in the session scratchpad and removed.
- **At the end:** the harness equals `pass-8/H8-records/harness.sha256`, and the patches re-hash as in the header (`harness-check-end.txt`). `git worktree remove --force` was run, and `git worktree list` shows no `p12c` entry. **The deletion of `.claude/worktrees/bl/D2/p12c/Bp-crit/` was refused by the permission check**, as the builder's was (BU §7). It holds about 1.3 GB (the builds under `out/`, the run outputs and the scratch harness copy `hfs/`) and nothing of record, since every record is under `D2-Bp-critc-records/`. It is left to the owner beside `p12/Bp-build/`. No process of this seat remains: the chain (54942) ended at `CHAIN-DONE` 10:42:38, and `followup.sh` (49563) at `FOLLOWUP-DONE` 12:12:34.
