# D2-B′ critique, pass 11: 37/38 on the ruled digest; P3 opens on a Playwright WebKit window red the base build shares

| field | value |
|---|---|
| seat | D2 pass 11, the fresh adversarial CRITIC of D2-B′ (REGISTRY §P10-7.4). Authored nothing in D2 and was no earlier D2 critic · model `claude-opus-5-5`, asserted from own system identity · one entry, 2026-11-02 04:25 → 13:05 |
| base | Seat worktree detached at `d00eaa3b3`. The checkout moved to `f8e445849` during the seat (other seats' doc commits); `git diff --name-only 387c11285 f8e445849 -- src demo tests package.json docs/design` is empty, as it is for `d00eaa3b3`. Builds (`scripts/build.sh`, `apply.log`, each guarded, every patch `git apply --check` first): `bp10` = HEAD + `pass-6/floor-v5.patch` (`cba6bdc2…`) + **`pass-11/D2-Bp-p11.patch`, re-hashed `b5d5c9db632f4e97baed2f3e3d906568e122f6a9c0d3f141d5f4ff067ea97aa5` at start and end**; `bp8` = HEAD + floor v5 + `pass-9/D2-Bp-p9.patch` (`dd5d9f5f…`), the control; `fv3` = HEAD + `pass-4/floor-v3.patch` (`637d1625…`, L1). Attack builds, never landed: `bp10i` (the pass-10 builder's `instrument.py` trace), and `bp10fs`, `bp8fs`, `bp10fsi` through a scratch harness copy (the pass-9 critic's `fs-scene.py`) |
| built bytes | the demo's scene chunk `useDockScene-CA6dYrPn.js` 21,433 B on bp10 and `useDockScene-hY1v177J.js` on bp8, the names and size pass 10 and the re-measure record. Boot graph **503,737 B against 503,808 B, margin 71 B** (`F7/boot-graph.txt`) |
| harness | H8 as landed. The per-file list equals `pass-8/H8-records/harness.sha256` line for line at the start (`harness-check-start.txt`, `harness-at-start.sha256`) and at the end (`harness-check-end.txt`, `harness-at-end.sha256`); 42 files, list hash **`9d12810bc24d91d2`**, printed by both chains (`chain.log`) |
| owner rulings | `audit/INBOUND.md` re-read to its last row (O-117) and `FORMATION-PROGRESS.md` to its last line (2026-11-02, "Critic running") at the start: no ruling touches D2's 38 rows, none arrived during the seat. O-103 (Q-4 (c), Q-12 (b), Q-18 (a), Q-15 (a)): the ruled digest is the score of record, the default beside it. O-87, O-88 bind. W-0.8 §10's held cells are outside the 38 and were not read |
| engines | Chromium (Playwright's default headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| records | `pass-11/D2-Bp-crit-records/`: `battery/` (every slot log, re-runs, `json/`, `slots.log`, `loads.txt`), `digest/`, `filmstrips/` (all 108 battery strips), `fm-reads.txt`, `r2-margins.txt`, `F7/`, `PR/`, `ab/` + `ab-stub-summary.txt`, `cr/` (+ `crsum.txt`), `fmx/` (+ `fmxsum.txt`, strips pruned per `STRIPS-KEPT.txt`), `frz/` (+ `png/` zooms), `revst/`, `swrev/`, `rtrev/`, `edge/`, `e240/`, `si/` (+ `sisum.txt`), `fs/`, `heir/`, `r2/`, `smoke/`, `summary.txt`, `chain.log`, `slot-*.log`, `scripts/`. No video. `prior-attempt/` holds the start file of an earlier critic seat (2026-10-31 06:06) that stopped at the kernel zone gate before any run; its `zone-probe-1.log` stays where it was |

Load is the 1-minute load average. "C" is Chromium, "W" Playwright WebKit, "·l / ·d" light / dark. `R` below is `pass-11/D2-Bp-crit-records/`.

---

## 0 · Verdict

| digest | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| **ruled (O-103), B2 read on the strips too: the score of record** | **37/38** | **35/36** | **23/24** | **P3** |
| default | 36/38 | 34/36 | 22/24 | P1 (OWNER-BLOCKED, Q-12), P3 |

**On this seat's battery, P3 is open, so pass 11 is not clean (§P10-7.4).** The red is one cell. W·d W3 `content-remove` fails `window` in the main run at 11.35, and again in re-run 2 at 8.51. The checks that fail are Q-4 (c)'s W-8 clause: the `[data-morphing]` flag closes **44 ms** and then **45 ms** after the extent lands, against a bound of 2F + 0.5 = 33.9 ms. Re-run 1 reads OWNER-BLOCKED at 9.68, which turns to PASS on the ruled branch, with the flag closing 30 ms after landing. Under H6-7 re-run 2 reproduces the check, so the cell stays FAIL in both digests.
- 671 cells on the ruled digest: 643 PASS, **1 FAIL** (that cell), 3 NOT-REPRODUCED, 12 UNMEASURED (W8 `consumer·*`, as in every pass), 12 RECORD, and no FAIL outside the 38.
- Default digest: 611 PASS, 32 OWNER-BLOCKED, the same FAIL, 3 NR, 12 UM and 12 RECORD.

What the red is (§2): **a Playwright WebKit timing class that the base build carries at the same rate.** It is not the cure's.
- Chromium closes the flag on the landing frame in every read: 32 of 32 in this seat's `content-remove` A/B, both builds.
- In Playwright WebKit the flag closes 0 to 50 ms after landing on both builds. Over 2F + 0.5 it reads **bp10 2 of 16, bp8 2 of 16** in the same slots.
- Earlier passes read gaps of 19 to 34 ms there, every one under the bound by up to a frame.

§P9-0 finding 2 is the precedent: an attribution to the base does not close a row. The row reads what the digest reads.

**Neither §P10-7.1 rule fires.**
- (a) The retarget A/B reads splice on **bp10 0 of 96** and bp8 1 of 96 (C·d `retarget·80` r1, frame 11, 9.18 px, 10.37).
- (b) The battery has 0 `stub` reads in every column, FM and W3 alike.

The attack (§3 to §5) found no retarget splice at any phase this seat swept: 640 bp10 phase reads, including the reversal and a retarget during the reversal. `vmorph` collapse was read in paint on the leaving pair's frame itself, in both engines: no ink is cut. Three classes for the agglomeration, none a row:
1. **B2 on the strips: one hole read by eye.** W·l `fmlow` r2 `warm-expand` shows "H ' 2 3" for two tiles: slot 2 holds only a stray tick, ink 0.03, at load 9.29. H8-1 reads one read as NOT-REPRODUCED, so B2 is PASS on the digest. The same hole, at the same slot and offset, reads on bp8. The display-frame probe never sees it in the DOM (§4).
2. **R2's WebKit margin is the thinnest bp10 has read.**
   - Battery: W·l 0.037 at 14.99, W·d 0.047.
   - Extra W3 runs at load 10-15: down to 0.028.
   - The worst read is always seat 1 at `retarget·80` or `swap-long`.
   - On this seat's A/B, the retarget cells' worst drop is bp10 0.457-0.458 against bp8 0.404-0.405. Over three seats' A/Bs, though, the >0.44 tail reads bp10 7 of 64 and bp8 4 of 64, which does not separate (§5.1).
3. **Prose.**
   - The facing-pair pass's own comment still overstates the law.
   - B′'s added test lines carry a harness reference ("the dock harness's swap and retarget cells") and a REGISTRY row id in a test title ("N-1 ·"). §P10-5 does not list either (§5.5).

---

## 1 · How this seat ran

| step | start → end | load (admission / cells) |
|---|---|---|
| builds `fv3`, `bp8`, `bp8fs`, `bp10`, `bp10fs`, `bp10i`, `bp10fsi` | 04:28 → 04:29 | 8.64 at start; every build exit 0 |
| smoke reads (`frz.mjs` ×2, `phase3.mjs` + `swrev.mjs`) | 04:31 → 05:05 | 7.34-13.41 (`R/smoke/`; the second waited about 25 min for a heavy-run slot) |
| PR (`--light`, no browser), F7 | 05:05 → 05:07 | 12.47 / 12.02 |
| battery C·l | 05:07 → 05:18 | started 11.70; cells 7.38-14.32 |
| battery C·d | 05:18 → 05:29 | started 7.67; cells 7.26-12.11 |
| battery W·l | queued 05:28:55 at 11.78; **WebKit lock admitted 05:52 at 13.68** (23 min) → 06:04 | cells 8.26-15.23 |
| battery W·d | queued 06:04:26 at 9.58; admitted 06:12 at 13.47 (8 min) → 06:24 | cells 7.52-13.55 |
| `fmlow` light | queued 06:24:18 at 9.39; **admitted 07:31:39 at 9.35** (67 min; bound 15) | FM 8.26-10.79 (column) |
| `fmlow` dark | queued 07:33:08 at 8.86; **admitted 08:38:45 at 12.00** (65 min) | FM 8.09-14.07 (column) |
| readings `att`, one slot per column | C·l 08:40 (13.27) → 08:56 · C·d 08:56 (11.60) → 09:16 · W·l queued 09:16 (10.18), **lock 10:18:58 at 12.01** (63 min) → 10:40 · W·d queued 10:40 (14.51), **lock 10:47:53 at 21.32** (7 min) → 11:16 | 6.97-19.05 |
| readings `x` (added after the digest, §2, §4) | Chromium 11:17 (10.88) → 12:09 · W·l queued 12:09 (10.45), lock 12:12 at 8.84 → 12:33 · W·d queued 12:33 (8.65), lock 12:36 at 7.75 → 12:59 | 7.66-18.25 |

- Every run went through `guarded`. Browser runs were never `--light`; `--light` was used only for PR and the digest, which launch no browser. Playwright WebKit ran under `--exclusive webkit`, queued and never cancelled; the longest lock wait was 67 min, none over 90. One heavy run at a time: both chains are serial, and `chain-x.sh` waited on `chain.sh`'s pid before its first step. There was no zone refusal and no WebKit page close: each witness and probe opens one browser and a fresh context per cell, under the landed `launch()`'s 60-load restart (H3-1).
- **No slot read a cell above 31, so no slot was re-read.** The highest battery cell read 15.23 (`battery/loads.txt`). Each slot was started at ≤ 20 and read again at lock admission. The W·d `att` slot passed the start gate at 14.51 and was admitted at 21.32; its reads ran 8.93-19.05, and none is a row.
- Two edits to a chain, both recorded:
  - At 06:30 this seat added a `cr` sub-step to `chain.sh` on disk. The running bash kept the launched file, a different inode (`lsof`), so `cr` never ran from it. The step ran instead in `chain-x.sh`; the version on disk carries an edit that never executed.
  - At 10:45 `chain-x.sh` was stopped and relaunched, with `e240` added, while it was still in its own wait loop, before any guard queue.
- Instrument fixes made before any reading of record:
  - `frz.mjs`'s first smoke read clipped the frozen frame at the rest boxes, but the collapsing plate carries the pair. Each state is now clipped at its own boxes.
  - `swrev.mjs` and `phase3.mjs` read the blank floor from the first command's frame. The entering face of a re-retarget is not asked for until the second command, so that read is blank by construction (smoke: 5-frame blank on bp10 and 2 on bp8 at `rev 60 then 32`, `R/smoke/`). Both now read it from the last command's frame.

**Red cells, each re-run twice in its slot by the battery:**

| cell | column | main | re-run 1 | re-run 2 | digest |
|---|---|---|---|---|---|
| W3 `content-remove` [window: Q-4 (c) "closed 44 ms after landing"] | W·d | FAIL (11.35) | OWNER-BLOCKED (9.68; closes 30 ms after) | **FAIL (8.51; 45 ms after)** | **FAIL** in both digests (H6-7: re-run 2 reproduces `window`) → **P3** |
| W3 `lead-remove` [terminal 0.92 after 0.34, bound 0.81] | C·l | FAIL (11.15) | PASS (10.63) | PASS (11.76) | NOT-REPRODUCED (P3, R1); the pass-7/8 borderline |
| W3 `lead-add` [terminal] | C·d | FAIL (7.73) | PASS (8.83) | PASS (8.42) | NOT-REPRODUCED (P3, R1); the same class |
| FM `film·warm-expand` [hole, 2 cast frames] | W·l (`fmlow` r2) | FAIL (9.29) | — | — | the only hole read in its column: NOT-REPRODUCED by H8-1 (B2); §4 |

CASES `case·rotated` read PASS in both engines. Pass 10's out-of-list FAIL did not recur.

---

## 2 · The open row: P3, W·d `content-remove` [window]

**The read.** The witness logs the flag's `open`, the extent's `land` and the flag's `close` (`battery/json/bp10-webkit/dark/…/W3.json`):

| read | load | open | land | close | close − land | Q-4 (c) | cell |
|---|---:|---:|---:|---:|---:|---|---|
| W·d main | 11.35 | 29 | 267 | 311 | **44** | fails: "closed 44 ms after landing" | FAIL |
| W·d re-run 1 | 9.68 | 16 | 266 | 296 | 30 | holds (280 ≤ 320.4) | OWNER-BLOCKED |
| W·d re-run 2 | 8.51 | 15 | 255 | 300 | **45** | fails: "closed 45 ms after landing" | FAIL |
| W·l main | 14.73 | 13 | 267 | 299 | 32 | holds | OWNER-BLOCKED |
| C·l, C·d main | 11.15, 7.73 | 5.5, 8.2 | 249.6, 249.7 | the same | **0** | — | PASS |

The extent itself lands in time: 238-250 ms of travel against the 214 ms clock plus its stall, with the trajectory 0.53 px from the rung. What is late is the window: the flag stays up two or three Playwright WebKit frames past the landing frame. W-8, as Q-4 (c) reads it, allows 2F.

**Is it the build's?** `content-remove` alone, bp10 and bp8 alternating, 8 rounds per column, each read started at load ≤ 11 after a wait of at most 180 s (Chromium) or 60 s (WebKit) (`R/cr/`, `crsum.txt`):

| column | bp10: flag closes after landing (ms) | late | bp8 | late | load |
|---|---|---:|---|---:|---|
| C·l | 0 ×8 | 0 | 0 ×8 | 0 | 8.78-16.72 |
| C·d | 0 ×8 | 0 | 0 ×8 | 0 | 8.19-18.25 |
| W·l | 0, 0, 0, **35**, 0, 0, 34, **50** | **2** | 0, 0, 33, 0, 0, 31, 0, 0 | 0 | 7.72-13.84 |
| W·d | 32, 0, 0, 31, 0, 0, 32, 33 | 0 | 33, 33, **35**, 34, 0, 34, 34, **35** | **2** | 7.66-15.43 |
| all WebKit | | **2/16** | | **2/16** | |

The earlier batteries' W·d and W·l reads of this cell are in every seat's JSON: gaps of 0, 10, 19-22 and 30-34 ms on bp8 (passes 8 and 9) and on bp10 (pass 10 and the re-measure). None was over the bound, and some sat at it: the pass-9 critic's bp8 W·l main read 34 ms.

**Reading.** Playwright WebKit closes the window a frame or three after the landing on both builds, and the bound sits where those reads fall. This battery drew the tail twice in one column. Chromium never does it, so this is Playwright WebKit only; real Safari is **UNMEASURED (owner's safaridriver checkbox)**.
- The cure did not make it: bp8 reads it at the same rate, and the built chunk is pass 10's to the byte.
- It is also not load: the reproducing read ran at 8.51.

By §P10-7.4 the row opens and the pass is not clean. Whether the class is a defect of the scene's window (the flag held past the landing frame), or a bound to re-read against Playwright WebKit's frame cadence, is the agglomeration's to place. This seat reads the cell as the digest does. It turns no row on its own instrument either way: the A/B is a reading, and it says only that bp8 shares the class.

---

## 3 · The class the cure is for: the retarget splice, at phases no seat swept

### 3.1 · The A/B (§P10-7.1 rule (a))

W3 `retarget·40/80/120` (with controls), bp10 and bp8 alternating, 8 rounds per column. Each read started at load ≤ 11 after a wait of at most 180 s (Chromium) or 60 s (WebKit). Source: `R/ab/`, summed by the pass-10 builder's `absum.py` (`R/summary.txt`).

| engine | bp10 | bp8 | bp8 splice | load (bp10 / bp8) |
|---|---:|---:|---|---|
| Chromium | **0/48** | 1/48 | C·d `retarget·80` r1, frame 11, 9.18 px (10.37) | 8.96-13.52 / 8.73-11.22 |
| Playwright WebKit | **0/48** | 0/48 | — | 9.2-18.79 / 9.31-18.52 |
| total | **0/96** | 1/96 | | |

Sliver 0 and stub 0 on every A/B read of both builds (`R/ab-stub-summary.txt`). **Rule (a) does not fire.** Over pass 10's two seats, the re-measure's two A/Bs and this one, bp10 reads 0 splice in 456.

### 3.2 · The phases no seat swept

All on bp10, every read with the landed `spliceRow`, `blankRow` and `stubRow` (`R/summary.txt`):

| reading | what it drives | bp10 reads | splice / sliver / blank / stub | control |
|---|---|---:|---|---|
| `edge` (`sweep.mjs`) | `retarget·N` at N 0-40 by 4 and 200-320 by 10, 2 runs | 192 | **0 / 0 / 0 / 2** | — |
| `swrev` (this seat's `swrev.mjs`) | the swap **reversed**: `setFace("long")`, at N `setFace("short")`, then at N + D `setFace("mid")`. N 40-120 by 20, D 0 (the bare reversal), 16, 32, 64; 2 runs | 160 | **0 / 0 / 0 / 1** | bp8, D 16/32: 40 reads, **1 sliver** (C·d N 80 D 32, 9.72) |
| `rtrev` (`phase3.mjs`, the pass-10 critic's `phase2.mjs` + two modes) | **a retarget during the morph reversal**: collapse, expand at 0.2/0.35/0.5/0.8 of the travel, collapse again D = 16/32/64 ms later; and the same from collapsed; 2 runs | 192 | **0 / 0 / 0 / 1** | — |
| `revst` (`phase2.mjs`) | the reversal at 0.2/0.25/0.3/0.8/0.85/0.9, bp10 and bp8 alternating, 2 runs × 2 rounds | 96 | **0 / 0 / 0 / 2** | bp8 96: 0 / 0 / 0 / **5** |

**No splice, no sliver and no blank on bp10 in 640 reads**, at loads 6.97-19.05. At the same phases, bp8's control reads a sliver once, on a retarget during a reversal.

The stub reads, each one frame, never two at one point on bp10:
- **The reversal stub (`revst`).**
  - bp10's two reads are both C·d `rev-c` at 0.3 r2: "n" 37 % with an edge at 887.1 px (14.41), and "g" 25 % at 891.3 px (11.76).
  - bp8 reads five: C·l 0.3 "n" at 887.3 px, 0.2 "u" at 928.7 px and 0.85 "P" at 838.6 px; C·d 0.9 and 0.85 "P" at 838.5-839 px.
  - Both builds put the edge at the same x, and Playwright WebKit reads 0 on either. This is the shared class pass 10 read (bp10 1 of 48, bp8 2 of 48 there); here it is bp10 2 of 96 and bp8 5 of 96.
- **The `rtrev` stub:** C·l `rev-c-rt` + 32 at 0.35 r1, "S" 35 % with an edge at 869.9 px, +119.6 ms (10.21). One read.
- **The `edge` and `swrev` stubs: the opening plate's edge, not a retarget phase.**
  - `edge` read W·l `retarget·240` stubbed in both runs (10.47, 9.55). `sweep.mjs` keeps no glyph, so `e240` (`sweep2.mjs`, the same reads with the glyph and plate kept) re-read N 230-250 by 2 in both WebKit themes: bp10 1 of 44, bp8 0 of 22.
  - The one stub is **"r" painted 21 % by an edge at 794.3 px, +50 ms, with the plate's right edge at 794.813 px**: 0.51 px inside the plate, at the stub law's 0.5 px allowance. It falls at +50 ms of `swap-long`'s opening, long before the retarget at 251 ms. `swrev`'s W·l stub is the same frame: "r" 21 % at 794.3 px, +50 ms.
  - So these are the §P8-2 finding-4 plate-edge class (the `content-add` stub class), one hundredth of a pixel inside the allowance, on `swap-long`'s opening in Playwright WebKit light.
  - In this seat's W·l reads it shows 4 times in 110 on bp10 and 0 in 21 on bp8. That sample does not separate the builds, and the battery's W3 `swap-long` read 0 stub in all four columns.

### 3.3 · The heir on the constructed far side

`R/heir/`: the pass-10 builder's `heirprobe.mjs` on `bp10i`, and the pass-10 critic's `fsheir.mjs` on `bp10fsi`, both engines.

| sequence | Chromium | Playwright WebKit |
|---|---|---|
| constructed `fs-to-three` (132 px tab → three 40 px icons) | armed 1: `WideTabF→D`, enter, **gated (de 40)** | the same |
| constructed `fs-to-one` (three icons → the tab) | armed 3: `D→WideTabF`, enter, **taken** | the same |
| `vmorph` `lead-remove`, and its `wide` form | armed 1, **tied 0** | the same |
| the 16 harness sequences | every tied unit enter-taken; `content-add`, `lead-*`, `vlead-*`, `wide-first-expand` tied 0 | the same |

In paint (`R/fs/`; the pass-9 critic's `slotink-axis.mjs`, bp10fs and bp8fs alternating, 3 runs per column, 9.56-13.7):
- `fs-to-one` shows no hole in any run.
- `fs-to-three` flags one frame in every run, on both builds: slot C at the trigger, −0.4 to +16 ms, before C begins its reveal. This is the probe's `wide` attribution limit, which passes 9 and 10 read the same way.

**`o.enter` holds as the header states it.**

---

## 4 · B2: read on the strips and through H8-1

| column | FM reads | hole frames | runs over 1 | stub reads | H8-1 | load |
|---|---:|---:|---:|---:|---|---|
| C·l | 18 | 0 | 0 | 0 | PASS | 7.7-10.21 |
| C·d | 18 | 0 | 0 | 0 | PASS | 8.32-10.26 |
| W·l (battery + `fmlow`) | 36 | **2 (1 read)** | **1** | 0 | **PASS** (NR 1: one read in the column) | 8.26-10.79 |
| W·d (battery + `fmlow`) | 36 | 0 | 0 | 0 | PASS | 8.09-14.07 |

Source: `R/fm-reads.txt`, from the pass-9 critic's `fmsum.mjs`.

**The hole, read directly** (`filmstrips/webkit-light/fmlow-light_rerun1_strip-webkit-warm-expand.png`; FM JSON `hole.frames`).
- Tile by tile, the strip reads "H P" → "H P 2 3" → "H P 2 3 | Play Setting" → **"H ' 2 3 | Play Settings Squa" ×2** → "H 1 2 3 | Play Settings Square".
- Slot 2 reads ink 0.03 on two consecutive cast frames (+80 and +120 ms), with its neighbours at 0.99 and 0.98.
- The second tile differs from the first by 0.13, against 8.2 for the step into it: one painted frame, held for two tiles by Playwright WebKit's paint hold.
- By eye, the slot between "H" and "2" holds nothing but a small tick for those two tiles.
- §P8-8 placed the WebKit paint hold as harmless "because the held frame has ink". Here the held frame has none.

**How often, and on which build** (`R/fmx/`; FM `warm-expand` and `first-expand`, bp10 and bp8 alternating, 10 rounds per WebKit theme, 8.07-13.94):

| | bp10 | bp8 |
|---|---|---|
| reads with any hole frame | 0 of 40 | **2 of 40** (W·d `warm-expand` r7: run of 2, seat 2 ink 0.077 at +120 ms, 9.31; r10: one frame, 0.04 at +120 ms, 13.26) |

bp8's r7 strip (`fmx/webkit-dark-bp8-r7_strip-webkit-warm-expand.png`) shows the same "H ' 2 3" for two tiles. So the hole is the base's, at the same slot and offset, in both WebKit themes. Over this seat's WebKit reads of those two cells, bp10 shows it once in 64 and bp8 twice in 40.

**The DOM does not see it.** The display-frame probe (`R/si/sisum.txt`; the pass-8 critic's `slotink-crit.mjs`, bp10 and bp8 alternating, 3 runs per column) reads **bp10 0 of 72 runs with an empty frame, and bp8 0 of 72**. The lowest `minInk` is bp10 0.176 (W·d `first-expand`, 10.43) and bp8 0.142 (W·l `first-expand`, 8.94). The cast's hole is a paint-side frame the per-rAF DOM read never sees, the "paint and DOM differ" class §P9-8 recorded in W·d.

**The other strips, by eye:**

| strip | reading |
|---|---|
| W·d `first-expand` main | "H P" ×3 (marker + hold) → "H P 2 3 \|" → "H P(faded) 2 3 \| Play Settings" → "H 1 2 3 \| Play Settings Square". No empty tile |
| W·d `first-expand` re-run 1 | "H P 2 3" → "H P(faded) 2 3 \| Play Settings" ×2 (the hold, inked) → "H 1 2 3". No faint-"1" tile this time |
| W·d `first-expand` re-run 2 | "H P 2 3" ×2 → "H P(faded) 2 3 \| Play Settings" → "H 1 2 3". Clean |
| W·l `warm-expand` main | "H P 2 3 \| Play" → **"H 1(faint) 2 3 \| Play Settings Squ" ×2** (hold) → "H 1 2 3". Faint, not empty: the owner's glance tile |
| W·l `fmlow` r2 `first-expand` | "H P 2" → "H P 2 3 \| Play" ×2 → "H P(faded) 2 3 …" → "H 1 2 3". Clean |
| W·d `swap-short` main | "C Tools Brushes Layers D" → "C ɔols Brushes Layers" → "C ɔols Brushes" → "A B Ɛ" (one tile of soft partials) → "A B". The §P6-2 class |
| C·l `first-expand` main | "H P" → "H P 2 3" → "H P 2 3 \| Play Se" → "H P(faded) 2 3 \| Play Settings" → "H 1 2 3 …". No faint tile |

**B2, scored on the digest: PASS ×4** (W·l 46/46 with NR 1). On the strips this seat read one hole, which pass 10's critic did not: one strip in 108, two tiles, a stray tick in the slot. H8-1 forgives a single read in a column by design, and the same frame reads on bp8 (which was clean in passes 8 and 10). So this seat does not turn the row against the digest. It places the hole as a class for the agglomeration:
- the B2 hole is not closed in Playwright WebKit;
- it is rarer than H8-1's column rule can catch;
- it is visible to the eye for one painted frame held across two tiles.

The faint "1" tile that pass 10 placed as the owner's glance has a worse sibling: a read where nothing paints there at all.

---

## 5 · The rest of the attack

### 5.1 · R2's WebKit margin at load 10-15

Bound 0.5. Sources: the pass-9 critic's `r2sum.sh` over every W3 cell, main and re-runs (`R/r2-margins.txt`); the extra W3 runs (`R/r2/`); and `abstub.py` over the A/B (`R/ab-stub-summary.txt`).

| read | C·l | C·d | W·l | W·d |
|---|---:|---:|---:|---:|
| this battery (worst; cell, seat; load) | 0.144 (`warm-collapse`, 2; 11.15) | 0.126 (`warm-collapse`, 2; 7.73) | **0.037** (`swap-long`, seat 1, +149 ms; **14.99**) | **0.047** (`retarget·80`, seat 1, +208 ms; 10.14) |
| W3 whole, Playwright WebKit, started at load 10-15 | — | — | 0.068 (`warm-expand`, 8; started 12.79), 0.057 (started 13.23) | **0.028** (`retarget·80`, seat 1, +201 ms; started 10.27), 0.041 (started 10.38) |
| the A/B's retarget cells, bp10 / bp8 alternating | 0.141 / 0.137 | 0.121 / 0.118 | **0.043 / 0.096** | **0.042 / 0.095** |
| re-measure battery (bp10) | 0.127 | 0.127 | 0.101 | 0.062 |
| pass-10 critic (bp10) | 0.121 | 0.112 | 0.088 | 0.102 |
| pass-9 critic (bp8) | 0.119 | 0.128 | 0.057 | 0.053 |

- **R2 PASS ×4**, and no extra run read red. The WebKit margin is the thinnest bp10 has read: 0.028-0.047. The thin seat is seat 1, the leaving unit of the retarget and of `swap-long`, not pass 10's seat 8 at the heir's cut.
- §P10-2 says the cure "cannot spend that margin" because it never sets a leaving unit back. On this seat's A/B, bp10's worst retarget drop sits 0.05 above bp8's, in alternating slots, in both themes: `retarget·80` seat 1, +200 ms, 0.457 at 9.2 and 0.458 at 10.09.
- Counted over three seats' A/Bs (this one, the re-measure's two, pass 10's critic), the tail of `retarget·80` drops above 0.44 reads **bp10 7 of 64 and bp8 4 of 64**. That is no separation at this sample. The registry's "by construction" is not refuted, and it is not confirmed by the reads either.

### 5.2 · `vmorph` collapse in paint, on the leaving pair's frame

The re-measure's strips are 40 ms tiles, and the `s2|s3` frame (45-52 ms in) falls between two of them. This seat read that frame itself. `scripts/frz.mjs` wraps `requestAnimationFrame` before the trigger, and holds every callback whose frame timestamp is at or past trigger + T. B′'s scene is stepped by one rAF (`useDockBody.ts`), so a whole frame either runs or is held. Every Web Animation is paused at the same moment. The DOM is then the state the scene wrote on its last frame before T, and the screenshot paints exactly that frame, in WebKit too (`deviceScaleFactor` 2).

Each read records:
- whether the freeze held: a second screenshot 150 ms later is byte-equal;
- the seats' boxes, painted rects and opacity on the frozen DOM;
- the landed `spliceRow` on the log up to the freeze;
- per glyph, the rows of ink against the same glyph's rows at rest, relative to its own box.

T ran 42-62 ms by 4, 2 runs per column (`R/frz/`, zooms in `frz/png/`, rest beside frozen at 4×).

| column | reads | froze on a `s2\|s3` splice frame | gap there | the pair's paint inside its boxes | ink short of rest, either glyph | freeze held | load |
|---|---:|---:|---|---|---|---:|---|
| C·l | 12 | 3 | 9.97-10.17 px | 0.66-0.72 / 1.31-1.45 px | **0 px** | 12/12 | 8.6-9.06 |
| C·d | 12 | 2 | 9.93-10.28 px | 0.64-0.76 / 1.29-1.52 px | **0 px** | 12/12 | 10.63-14.84 |
| W·l | 12 | 0 | — (the frames read: gap 8.55-14.19 px, pair inside 0.18-2.19 px) | — | **0 px** | 12/12 | 9.89-12.12 |
| W·d | 12 | 1 | 10.27 px | 0.76 / 1.51 px | **0 px** | 12/12 | 8.93-9.61 |

**No ink is cut at the leaving pair, read on the frame itself, in both engines.**
- On each of the six splice frames, "1" and "2" paint their whole rest extent (rows 12.5/13 to 27/27.5 px in a 40 px box), at opacity 1. The cut edges sit 0.6-1.5 px inside the box, outside the glyph.
- The zooms show the two glyphs whole beside their rest images (for example `frz/png/zoom-bp10-webkit-dark-T58-r1.png`, and the smoke read's `smoke/zoom-smoke-T50-r1.png`).
- This answers §P10-2's "unread" with the frame, not the tiles around it: the header's leaving-pair exemption costs no glyph.

### 5.3 · The display-frame probe

bp10 0 of 72 and bp8 0 of 72 (§4).

### 5.4 · F7, PR, L1

- **F7 13/13** at 12.02 (`R/F7/F7.json`): typecheck, both builds, units 232 files / 2,241 tests / 0 failing, all ten gates. **Boot-graph margin 71 B**, equal to pass 10 and the re-measure.
- **PR 6/6** at 12.47 (`R/PR/PR.json`).
- **L1 6/6** per engine against `fv3`, in the battery.

### 5.5 · The header and the prose against the code (`useDockScene.ts` on the bp10 tree)

- **The header's "The seam." paragraph now states the exemption.** "Two units going out keep no seam between them: their fronts are the exchange's" is what the code makes true: `(u.m.exit && w.m.exit) || … continue`. With §5.2, the exemption is now read in paint.
- **The facing-pair pass's own comment still overstates** (lines 740-743): "Two cut edges that face each other keep the seam, whatever cut them and **whichever way each unit goes**." The code skips two leaving units. Its last sentence ("a unit going out is never held by it") is true, but the first claims more. The re-measure recorded this (§4 there), and §P10-7.3 allowed it only two edits. Prose, no row.
- **The heir clause** is what `arm()` tests: `Math.abs(end) <= TOUCH_PX && o.enter`, gated by `de > 0`. Obligation 4 holds (§3.3).
- **`(Q-18 (a))`** is gone from `src/`.
- **Not in §P10-2's or §P10-5's lists**, all of them in B′'s added lines (`grep -nE` over `pass-11/D2-Bp-p11.patch`):
  - `tests/components/custom/dock/DockLayerSwitcher.a11y.test.ts`: "The in-flight contract is witnessed in paint, **by the dock harness's swap and retarget cells**" (patch line 5373). H6-9's "no harness id in `src/`" does not reach `tests/`, but it is a harness reference in a comment.
  - `tests/components/custom/dock/g-dock-lattice.test.ts`: the test title "**N-1 ·** the scene splits the flow margins…" and its comment "N-1: …" (lines 6120, 6123). This is a floor-v2 REGISTRY row id in a title, beside the "O-91 C8" and "Q-18 (a)" titles §P10-5 already lists.
  - The re-measure's `N-2` ×4 and `N-3` ×3 in `src/` are confirmed.

  For the landing's one grep sweep. PR's regexes miss all of them, as they missed the seven; B3 and N5 stand on the witness.

---

## 6 · The 38 rows (ruled; default beside it)

From `R/digest/{table,rows,counts}-p11crit[-ruled].md` (`node harness/cells.mjs --build bp10=R --f7 bp10=R/F7/F7.json --pr bp10=R/PR/PR.json --tag p11crit [--ruled]`). P = PASS.

| row | C·l | C·d | W·l | W·d | ruled | default | note |
|---|---|---|---|---|---|---|---|
| P1 | 42/42 | 42/42 | 42/42 | 42/42 | PASS | OWNER-BLOCKED (Q-12) | |
| P2, P4, P5 | P | P | P | P | PASS ×3 | PASS ×3 | |
| **P3** | 42/42, NR 1 | 42/42, NR 1 | 42/42 | **41/42** | **FAIL** | **FAIL** | W·d `content-remove` [window], §2; NR = the C·l, C·d [terminal] cells |
| F1-F5 | P | P | P | P | PASS ×5 | PASS ×5 | |
| F6 | 163/163 | 151/151 | 169/169 | 157/157 | PASS | PASS | 0 crashes |
| F7 | source 13/13 | | | | PASS | PASS | 232 files, 2,241 tests (12.02) |
| N1-N5 | P | P | P | P | PASS ×5 | PASS ×5 | N5 with PR |
| R1 | 32/32, NR 1 | 30/30, NR 1 | 32/32 | 30/30 | PASS | PASS | the [terminal] borderline |
| R2 | 33/33 | 33/33 | 33/33 | 33/33 | PASS | PASS | margins §5.1 (W·l 0.037, W·d 0.047) |
| R3, R4, R5 | P | P | P | P | PASS ×3 | PASS ×3 | |
| R6 | 40/40 | 40/40 | 46/46 | 46/46 | PASS | PASS | FM stub 0 ×4, W3 stub 0 ×4 |
| R7 | 35/35 | 33/33 | 35/35 | 33/33 | PASS | PASS | |
| R8 | 9/9 | 7/7 | 9/9 | 7/7 | PASS | PASS | none UNMEASURED |
| B1, B3 | P | P | P | P | PASS ×2 | PASS ×2 | PR 6/6 |
| B2 | 40/40 | 40/40 | 46/46, NR 1 | 46/46 | PASS | PASS | H8-1 and the strips: one hole by eye, §4 |
| C1-C9 | P | P | P | P | PASS ×9 | PASS ×9 | |
| L1 | 6/6 | | 6/6 | | PASS | PASS | against `fv3` |

**Counts: ruled 37/38, 35/36, 23/24. Default 36/38, 34/36, 22/24.** Every row verdict is the H8 digest's; this seat's instruments turned no row either way. The arm set is §P10-7.3 item 2's: a `theme` slot per engine and theme, FM's six B2 cells × 3, `fmlow` per WebKit theme, F7, PR, and L1 against `fv3`.

**§P10-7.5's clean test, on this seat's reading:** 1 open row of 38 on the ruled digest (P3), so **pass 11 is not clean**. Neither §P10-7.1 rule fires. B2 is PASS on the digest, with the strip hole of §4 placed beside it. Whether the count returns to 0, and what pass 12 builds, is the agglomeration's to rule. By §P10-7.4 a pass-11 critic that opens a row makes pass 12 a build pass with the list held fixed.

---

## 7 · Defect classes seen, for placing (no row minted)

| class | where | note |
|---|---|---|
| **W3 `content-remove` [window]: the flag closes 2-3 Playwright WebKit frames after landing (Q-4 (c)'s W-8 clause)** | §2 | **P3 FAIL** (W·d main 44 ms at 11.35, re-run 2 45 ms at 8.51). Shared: late reads bp10 2/16, bp8 2/16 in alternating slots; Chromium 0/32 (gap 0). Real Safari UNMEASURED |
| **B2 hole in Playwright WebKit: slot 2 empty (a stray tick) for one painted frame held two tiles** | §4 | W·l `fmlow` r2 `warm-expand` (9.29), NR by H8-1. Shared: bp8 2/40 in `fmx` (same slot, +120 ms), bp10 0/40 there. The DOM probe reads 0/72 on both, so it is paint-side. The paint-hold's "harmless" premise fails on this frame |
| R2 WebKit margin 0.028-0.047 on bp10, seat 1 at `retarget·80` / `swap-long` | §5.1 | PASS ×4. This seat's A/B worst bp10 0.457 against bp8 0.404; over three seats' A/Bs the >0.44 tail reads 7/64 against 4/64, no separation |
| the opening plate's edge cutting "r" at 794.3 px against a plate edge at 794.813 (0.51 px inside, on the 0.5 px allowance), `swap-long` +50 ms, Playwright WebKit light | §3.2 | 4 single reads in 110 bp10 W·l swap reads, 0 in 21 on bp8; the §P8-2 finding-4 class; battery W3 stub 0 |
| the reversal stub at 887-891 px and 838 px, Chromium | §3.2 | bp10 2/96, bp8 5/96; the shared class pass 10 placed |
| a sliver on bp8 at a retarget during the swap's reversal | §3.2 | the control seeing a class at a phase where bp10 reads 0 in 160 |
| the facing-pair comment "whichever way each unit goes" | §5.5 | prose; carried from the re-measure |
| a harness reference and "N-1 ·" in B′'s added test lines | §5.5 | the landing's grep sweep; not in §P10-5's list |
| W3 `lead-remove` / `lead-add` [terminal] C·l, C·d | §1 | NOT-REPRODUCED; the pass-7/8 borderline |
| `fs-to-three`'s flagged trigger frame | §3.3 | the probe's attribution limit, both builds, as passes 9-10 |
| WebKit lock waits 63-67 min; a `att` admission at 21.32 after a start gate at 14.51 | §1 | waited out; no reading of record depends on it |
| real Safari | every cell | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted |

---

## 8 · Fences, as kept

- **Worktree:** `.claude/worktrees/bl/D2/p11/Bp-crit/wt`, detached at `d00eaa3b3`.
  - `node_modules` was a directory of per-package symlinks to the checkout's, with `.vite`, `.vite-temp` and `.cache` not linked, so vite's caches stayed in the worktree. The checkout has no `tests-visual/node_modules` to link.
  - Builds, caches and outputs went under `Bp-crit/out/`. The instrumented tree was patched in the worktree copy for its build only and restored, `cmp`-checked equal (`apply.log`: "restored scene: equal").
  - The scratch harness copy `Bp-crit/hfs/` had its `REPO` and its webkit-lock import made absolute in the copy only; the landed harness was not edited.
- **Git writes:** `git worktree add` and `git worktree remove --force` only. `git apply` ran only in the seat worktree.
- **Writes to the checkout:** this file and `pass-11/D2-Bp-crit-records/`.
  - The earlier critic seat's tracked `harness-check-start.txt` (2026-10-31, a 42-file OK list) was overwritten by this seat's start check; its content is kept at `prior-attempt/harness-check-start-2026-10-31.txt`. Its `zone-probe-1.log` is unchanged.
  - No source edit, and nothing under `~/.claude` was read: the guard was invoked, never read. Sibling repos were not read, built or run.
  - One stray scratch write landed under `/tmp/claude-504/` (a harness hash list) and was removed at once. The seat's scratch is in its session scratchpad, which keeps no record.
- **Machine law:** as in §1. There was no headed, GPU-arg or real-Safari run and no browser MCP. One browser per run, a fresh context per cell, and every page, context and browser closed in `finally`.
- **At the end:** the harness equals `pass-8/H8-records/harness.sha256`, and the patch re-hashes `b5d5c9db…` (`harness-check-end.txt`).
  - `git worktree remove --force` was run, then `rm -rf .claude/worktrees/bl/D2/p11/Bp-crit/`. `git worktree list` shows no `p11` entry, and the empty parent `p11/` remains.
  - Two of this seat's own polling loops were stopped. No process of this seat remains; the chains still listed by `ps` are D5's `engagement/pass-12` seats.
