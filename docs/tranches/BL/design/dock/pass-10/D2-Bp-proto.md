# D2-B′ build, pass 10: one seam law for every facing pair

| field | value |
|---|---|
| seat | D2 pass 10, the BUILDER of D2-B′ (REGISTRY §P9-7.3) · model `claude-opus-5-5`, asserted from own system identity · one entry, 2026-10-30 18:35 → 22:20 |
| HEAD | `387c11285` at start, `7a24abade` at return. `git diff --name-only 387c11285 HEAD -- src demo tests package.json docs/design` is empty, so every reading describes today's tree |
| base | `bp8` = HEAD + `pass-6/floor-v5.patch` (`cba6bdc2…`) + `pass-9/D2-Bp-p9.patch` (`dd5d9f5f…`), both re-hashed. Reference arms `bp8`, `fv5`, `fv3` (L1). No floor v6, no merge into the base |
| patch | **`pass-10/D2-Bp-proto.patch`, sha256 `09aa6b3bf44eb041078308517c9ef3fa603527cff8815a38fac743c7136da331`**. 62 files, +2,503 / −2,411 on HEAD + floor v5. `git apply --check` clean on a `git archive` of HEAD `7a24abade` + floor v5; applied, its `src/` equals the build tree. Against `pass-9/D2-Bp-p9.patch`: `useDockScene.ts` (the cure, the heir test, prose), and comment-only edits in `useDockBody.ts`, `useDockContent.ts`, `dock.css`, `scroll-rungs.css`, `shape.css` and `src/styles/tokens/glass.css` (the new 62nd file) |
| harness | H8 as landed. The per-file list equals `pass-8/H8-records/harness.sha256` (42 files OK) at start and at return; hash `9d12810bc24d91d2…`, printed by every chain stage (`records/chain.log`). The landed harness was not edited: the sweep, heir probe and summaries are this seat's own scripts in `records/scripts/` |
| owner rulings | O-103 (Q-4 (c), Q-12 (b), Q-18 (a), Q-15 (a)) and its Q rulings; O-87, O-88 bind. `audit/INBOUND.md` re-read through O-116 and `FORMATION-PROGRESS.md` to its last line at start: no ruling touches D2's 38 rows; none arrived mid-pass. W-0.8 §10's held cells are outside the 38 and were not read |
| engines | Chromium (Playwright's default headless shell, no GPU args) and **Playwright WebKit**, unshimmed. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| records | `pass-10/D2-Bp-proto-records/` (31 MB; strips and JSON, no video): `sweep/` (bp8 phase map, `trace/` the instrumented reads), `sweep-bp10/`, `sweep-c2/`, `sweep-c3/`, `ab/`, `si/`, `vl/`, `heir/`, `cost/`, `battery/` (every slot log, re-runs, `json/`, `slots.log`, `loads.txt`), `digest/`, `filmstrips/` (108, kept per reading), `strips-read/`, `fm-reads.txt`, `r2-margins.txt`, `F7-bp10/` (with `first-read/`), `PR-bp10/`, `diff/`, `superseded/`, `try/`, `chain.log`, `scripts/` |

Load is the 1-minute load average. "C" is Chromium, "W" Playwright WebKit, "·l / ·d" light / dark. This seat scores no row.

---

## 0 · In brief

- **The cause, read.** The splice is the retarget of a swap whose leaving unit is on the handoff path. The handoff's second front has already cut a little off the leaving unit's far end. The retarget then re-arms that unit with a front only on the side something arrives from, so the cut far end is held by nothing. The next face's first unit arrives beside it on that side and is held only at the leaving unit's painted edge, with no seam, while its own reveal eases back. For a frame, the two cut edges face each other inside one advance. The registry's second lead is the mechanism (§1.3): no final law spans a leaving-arriving pair. The first lead (`room` and `k`) is not: the splice side has no lead to cut.
- **The cure, as a law:** *any two cut edges that face each other keep the seam, whatever cut them and whichever way each unit goes; the unit coming in gives way, and a unit going out is never held by it.* It replaces the arriving-only pass (`cutLive`). It also makes the sliver law exact at the plate's edge: only the plate's own edge exempts a cut, with no half-pixel allowance (§2). No constant was added or tuned, no bound or read moved, and the held edge eases on through the reveal limiter.
- **Readings on bp10.**
  - Retarget A/B: **0 of 96** splice reads on bp10 and 1 of 96 on bp8, at load 6.78-13.55.
  - Phase sweep, 40-200 ms in 4 ms steps, 4 runs, both engines and themes: **0 of 656** on bp10 and 32 of 656 on bp8.
  - Display-frame probe: 0 empty frames in 72 of 72 runs on each build.
  - One battery under H8, all four columns, at cell loads 6.74-17.29: ruled digest **38/38, 36/36, 24/24**; default 36/38 (P1, P3 OWNER-BLOCKED). 646 PASS, 0 FAIL, 1 NOT-REPRODUCED, 12 UNMEASURED (W8 `consumer·*`), 12 RECORD.
  - F7 13/13. PR 6/6. Boot graph margin **71 B**, down from 179 B; no raise and no split.
- **The heir:** `arm()` now takes as heir only a unit that is coming in (`o.enter`). That is evidence-based (§4): the hidden collapsed face on `vmorph` `lead-remove` was the only hidden heir in 16 sequences, and the test costs no row. The header's "Where a unit comes in on the very place a unit leaves" is now what the code tests.

---

## 1 · Step 1: the cause, read before building

### 1.1 · The phase map on bp8

`scripts/sweep.mjs` is W3's `retarget·N` cell verbatim (`harness/w3-morph.mjs` H4-5: scene `swap&three=1`, `setFace("long")`, then `setFace("mid")` N ms later by `setTimeout` in the page; the same `startLog`, `waitRest`, `spliceRow`, `blankRow`, `stubRow` from the landed `lib.mjs`). N runs 40-200 ms in **4 ms steps** (half a 120 Hz frame, a quarter of a 60 Hz frame), 41 phases, 4 runs per phase, per engine and theme, one guarded slot per engine (`sweep-run.sh`). bp8, 656 reads (`sweep/summary-bp8.txt`):

| column | reads | splice reads | where (retarget offset: reads with a splice / 4, retarget frame) | gap px | load |
|---|---:|---:|---|---|---|
| C·l | 164 | 5 | +48: 2 (fr 7-8) · +52: 1 (7) · +60: 1 (8) · +64: 1 (9) | 8.47-9.85 | 12.93-22.23 |
| C·d | 164 | 12 | +48: 2 (8) · +52: 2 (8) · +56: 2 (8-9) · +60: 2 (8-9) · +64: 1 (10) · +68: 2 (9-10) · **+112: 1 (14), s3\|s4** | 8.5-9.68 | 10.72-19.88 |
| W·l | 164 | 8 | +48, +52, +56: 1 each (6) · +64: 1 (8) · +68: 2 (8) · +72: 1 (8) · +84: 1 (10) | 8.8-10.36 | 4.48-11.11 |
| W·d | 164 | 7 | +52: 1 (6) · +60: 1 (7) · +64, +68: 1 each (8) · +76: 2 (9) · +80: 1 (9) | 8.84-10.27 | 4.9-8.45 |
| **all** | **656** | **32 (4.9 %)** | 31 of 32 on `s1|s4` at retarget offsets 48-84 ms; none at 88-200 ms except one `s3|s4` at +112 | 8.47-10.36 | 4.48-22.23 |

- Every splice frame falls 163-206 ms after the first `setFace`, one display frame long. Blank 0, sliver 0; one `stub` read (C·d +152 r2, the plate-edge class).
- **The window is the first 48-84 ms of the swap**: the retarget lands on frames 6-10. The critic's red (retarget on frame 10, `retarget·80` at Chromium's ≈ 8 ms frames) sits at its edge. Re-run 2's frame 11 lies just past it.
- In the window, a read splices about 1 time in 2-4, not 1 in 40. The window is narrow against the battery's three fixed offsets, so the battery's rate is about 2.6 %.
- Chromium reads more splices in the window at Chromium load 10-22 than WebKit at 4-11. Within a column the split by phase is clear: no splice past +84 ms in 492 reads at +88..+200 except the one `s3|s4` read.

### 1.2 · The two units' spans, frame by frame

`sweep/trace/bp8i-chromium-light.json`: an instrumented bp8 (`scripts/instrument.py`, a `window.__dockTrace` push in `write()` and `arm()`, built only as `bp8i` and never landed) swept over the window (+48-68 ms, 4 runs, load 9.88-13.03). It read 4 splices, the same `s1|s4` class (8.71-10.34 px). Read 48 r2 (`scripts/tracedump.py`), in the scene's own root-local px:

| t (ms) | what happens |
|---|---|
| 0 → 45 | the swap `short → long`. A ("A", leaving) and C ("C", arriving) are tied on one place, and **A is on the handoff path**: `heir C`, `lead [0,0]`, `to [20,20]`, both fronts closing on its middle, each on half the sweep. By 45 ms A's end front has taken 0.63 px |
| 47.8 | **the retarget** (`setFace("mid")`). `arm()` re-arms A as a unit already moving (`mv true`), `s0e0 0.63, 39.37`. E ("E", `mid`'s first icon) stands on A's place but is still hidden, so its painted centre is not A's: it counts as arriving **from the start side**. A gets `cut [true, false]`, `lead [23.72, 0]`, `to [63.72, 39.37]`. **A's end edge stays cut at 39.37 of 40, and no front of A is on that side** |
| 48 → 163 | A's start front sweeps right. Its end edge holds at `own[1]`, cut 0.6 px inside its box. "Mid" (the `mid` tab, arriving to A's right) is held at A's **painted** end (`ov[1]`, the "elsewhere, what it paints" branch), with no seam. Its reveal limiter carries the cut from the old exchange, 25.44 px at its start, and eases it back: 25.4 → 24.6 → 22.9 → 19.7 → 13.6 → **2.09** → 0 |
| **163.0** | A `v [19.75, 34.77]`, cut at both ends. Mid `v [43.49, 93.14]` on box `[41.4, 93.14]`, its start cut 2.09 px. The two cut edges face each other **8.72 px apart, against one advance 10.86 px + 1 px slack**. The harness reads `s1|s4` at **8.71 px, 168.3 ms**: the splice |
| 170.5 | Mid's reveal reaches its box start (cut 0): no longer a cut edge. Read passes |
| 178 → | A reaches its sliver cut and paints nothing; E takes the place |

**The residue sets the phase** (`sweep/trace/residue-bp8i.txt`): the 4 splices fell where A's far end had been cut 0.63-1.23 px at the retarget. Of the 15 reads with a residue at or above 1.25 px, none spliced. A residue under the harness's 0.5 px `CUT_PX` would not read as a cut edge at all. The retarget lands in the window only while the handoff's half-speed end front has taken a little of A's far end but not yet much.

### 1.3 · The mechanism, against the two leads

- **Lead 2 (§P9-7.3): read, and it is the mechanism.** The frame step holds an arriving unit a seam off a leaving unit's front only on a side in `path.cut`. Elsewhere it holds the unit against what the leaving unit paints, with no seam. The last seam pass (`cutLive`) spans arriving units only. A retarget leaves a leaving unit with a cut edge on a side not in `path.cut`: the handoff's far-side front had taken a little of it. So no law spans that leaving-arriving pair, and the arriving unit's easing reveal walks its cut edge into the gap.
- **Lead 1 (`room` 1.25 and `k`): not the mechanism.** The splice side carries no lead (`lead [23.72, 0]`: the end side's lead is 0 by `de = 0`), so `k` cuts nothing there. `room` touches only A's start-side lead, which sweeps away from Mid.
- **The one `s3|s4` read (C·d +112)** is the same mechanism one unit along: a different leaving-arriving pair whose leaving edge was cut by the first exchange's front on a side the retarget no longer holds.

---

## 2 · Step 2: the cure

### 2.1 · The law

In `useDockScene.ts` `write()`, after the reveal limiter and before the sliver rule, one pass replaces `cutLive`:

> **Two cut edges that face each other keep the seam, whatever cut them and whichever way each unit goes.** The fronts hold the side a unit arrives from. This pass holds the rest: an edge still easing back, or an edge a retarget left on a side nothing arrives from. The unit coming in gives way, the later of two; a unit going out is never held by it.

- Every painting unit that is not a sliver, sorted by its start. For each pair whose cross spans overlap, the first cut at its end and the second at its start, closer than `max(seam) + SEAM_SLACK_PX`: the arriving one of the two is set back to one seam off the other. Two leaving units are left as they are: their fronts are the exchange's.
- The unit set back keeps the cut in its reveal memory (`reveal.s`/`.e` raised to it). On the next frame the limiter releases that edge at most `REVEAL_GAIN` times as far as the frame before, so the arriving edge **keeps easing** and never steps, the same law the limiter already states.
- `sliver()`: a cut is inside the plate when it is inside the plate's edge, `v > P.lo` / `v < P.hi`, no longer `P ± TOUCH_PX`. "The plate's own edge is not such a cut" now means exactly the plate's edge. Why (§2.3): the new pass sets units back near the opening plate, and a unit cut to less than its seam within half a pixel of the plate's edge was exempted from the sliver law there. The same `s8` sliver read is in the record on bp8 and on bp7: the lost pass-9 critic seat's C·l `retarget·80` "1 sliver frame … unit s8 paints 3.55 px" (load 11.38) and the H8 baseline's W·l `retarget·80` 5.45 px (23.92).
- No constant is added, tuned or moved; `SEAM_SLACK_PX`, `TOUCH_PX` and `REVEAL_GAIN` are unchanged; no harness read or bound moved. The leaving unit's wipe is untouched (R2 below), and the handoff is untouched (B2 below).

The exact diff against bp8: `records/diff/bp8-bp10-useDockScene.src.diff` (106 lines, from the bp8 tree's file and the bp10 build tree). From the built trees: `records/diff/bp8-bp10-useDockScene.built.diff` (351 lines, the demo chunks `useDockScene-hY1v177J.js` 21,325 B → `useDockScene-CA6dYrPn.js` 21,433 B, +108 B, split on `;`).

### 2.2 · No splice on any retarget phase: the readings

| reading | bp10 | bp8 | load |
|---|---|---|---|
| **phase sweep**, 40-200 ms / 4 ms, 4 runs, ×4 columns (`sweep-bp10/summary.txt`; bp8 §1.1) | **0 splice, 0 sliver, 0 blank, 0 stub in 656** | 32 splice, 1 stub in 656 | bp10 C·l 4.65-8.32, C·d 6.61-12.12, W·l 6.11-9.36, W·d 8.11-15.13 |
| **retarget·40/80/120 A/B**, bp10 and bp8 alternating, 8 rounds, both themes and engines, the critic's W3 cell form (`ab/summary.txt`; `scripts/absum.py` after the critic's `xsum.py`) | **0 of 96** (C 0/48, W 0/48), 0 sliver | **1 of 96** (W·l `retarget·80` r1, frame 9, 9.97 px at 8.29), 0 sliver | C 6.78-11.13, W 7.05-13.55. Each read started at load ≤ 11 after a wait of at most 180 s (Chromium) or 60 s (WebKit) |
| splice reads at one `retarget` cell in one column (§P9-7.1's pass-level read) | **0 at every cell** | 1 (W·l `retarget·80`) | — |
| battery W3 `retarget·*`, main reads, ×4 columns | 12/12 PASS, none re-run | — | 7.32-12.15 |

The A/B's bp8 count (1/96) reads lower than the pass-9 critic's (3/96). Both are inside what a 2-5 % class gives over 96 reads; the sweep is the reading that separates the builds.

### 2.3 · Builds made and set aside

| tree | change against bp8 | what it read | record |
|---|---|---|---|
| `c1` | the facing-pair pass (first form) | boot graph **503,847 B, −39 B over the ceiling** (F7 12/13 on `gate:boot-graph`). Restructured into `c2`, −106 B | `superseded/c1-vs-bp8-useDockScene.diff`, `F7-try/` |
| `c2` | the pass, compact form | Chromium light sweep: 0 splice, **2 sliver reads in 164** (`s8` at the opening plate's edge, 2.05 and 4.77 px, +25-27 ms, load 14.7-16.4); Chromium dark 0 in 16 (the slot was stopped while **queued** for the WebKit lock, before any WebKit read: the build was superseded; not a cancel for the wait, `chain.log`). W3 whole ×4 against bp8 ×4 in Chromium light alternating (`try/`): `lead-add`/`lead-remove` [terminal] read red once each on **both** builds (bp8 t2 `lead-add` 0.95 vs bound 0.88 at 8.69; bp8 t4 `lead-remove` 0.84 vs 0.83 at 9.49; c2 one `lead-remove` at 9.7, one `seat-transition`), a borderline class the critic read as NOT-REPRODUCED in pass 8, not this change's. The sliver law made exact → `c3` | `superseded/c2-vs-bp8-…`, `c2-vs-bp10-…`, `sweep-c2/`, `try/` |
| **`c3` = bp10** | `c2` + the exact plate-edge sliver test, then prose and the heir test | Chromium light sweep 0/164 at 3.45-9.7 (`sweep-c3/`), then everything below. `bp10`'s and `c3`'s scene and demo builds are byte-identical, and the final tree's harness build `bp10f` is identical to `bp10` (`cmp-bp10-final.txt`: scene 3 files, demo 346) | |

`c5`/`c6` (pass 8's lane floor) were not rebuilt: the sweep read no lane-borne class (no `lanes`, no `vanish` in 656 bp8 reads).

---

## 3 · Step 3: every pass-9 row and the handoff kept

### 3.1 · The battery (H8, all four columns), and the digest

`scripts/chain.sh` `bat` + `fmlow`. One `theme` slot per engine and theme (H6-10), started at load ≤ 20. Red cells re-run twice in the slot; FM's six B2 cells three runs each; `fmlow` per WebKit theme (H8-2); F7, PR, L1 against `fv3`.

| slot | started (load) | admitted | cells' load, re-runs included | cells > 31 |
|---|---|---|---|---:|
| C·l | 21:10:59 (11.84) | at once | 7.05-11.92 | 0 |
| C·d | 21:21:11 (8.30) | at once | 6.81-14.17 | 0 |
| W·l | 21:31:43 (9.63) | WebKit lock at once | 6.87-12.71 | 0 |
| W·d | 21:43:05 (11.20) | WebKit lock at once | 6.74-17.29 | 0 |
| `fmlow` light | queued 21:53:43 at 9.50 | **admitted at 6.18**, try 1 | 6.23-13.34 (column, FM) | 0 |
| `fmlow` dark | queued 22:01:07 at 10.81 | try 1 **DEFERRED at 15.37**; try 2 **admitted at 9.00** | 8.05-16.35 (column, FM) | 0 |

No slot split, no slot re-read (no cell above 31), no WebKit page close (each witness opens one browser and a fresh context per cell, under the 60-load restart), no zone refusal.

**Red cells:**

| cell | column | main | re-run 1 | re-run 2 | digest |
|---|---|---|---|---|---|
| W3 `content-add` [stub: "B" painted 37 % by a hard edge at 968.2 px, +24.2 ms, the opening plate's edge] | C·d | FAIL (10.58) | PASS (12.15) | PASS (11.3) | NOT-REPRODUCED (P3, R6, B2) |

That is the arriving label's first glyph at the opening plate's edge, the class §P8-2 finding 4 places as pre-existing (968-983 px, 24-45 ms). No other cell read red in any column.

**The digest** (`digest/`, `node harness/cells.mjs --build bp10=<records> --tag p10bp [--ruled]`), 671 cells:

| digest | 38 rows | first 36 | first 24 | open | cells PASS / FAIL / NR / OB / UM / RECORD |
|---|---:|---:|---:|---|---|
| **ruled (O-103)** | **38/38** | **36/36** | **24/24** | — | 646 / 0 / 1 / 0 / 12 / 12 (38 OB cells read PASS on Q-4 (c) / Q-12 (b)) |
| default | 36/38 | 34/36 | 22/24 | P1, P3 (OWNER-BLOCKED) | 608 / 0 / 1 / 38 / 12 / 12 |

Per row, from `rows-p10bp-ruled.md` (C·l, C·d / W·l, W·d):

| row | Chromium | Playwright WebKit | load (cells) |
|---|---|---|---|
| P1 | 42/42, 42/42 | 42/42, 42/42 | 7.23-14.06 |
| P3 | 42/42, 42/42 NR 1 | 42/42, 42/42 | 6.74-12.15 |
| F6 | 163/163, 151/151 | 169/169, 157/157 | 6.23-17.29 |
| F7 | source 13/13 | | 12.64 |
| R1 | 32/32, 30/30 | 32/32, 30/30 | 7.43-12.15 |
| R2 | 33/33, 33/33 | 33/33, 33/33 | 7.32-12.15 |
| R4 | 5/5, 5/5 | 5/5, 5/5 | 6.87-17.11 |
| R6 | 40/40, 40/40 NR 1 | 46/46, 46/46 | 6.23-16.35 |
| R7 | 35/35, 33/33 | 35/35, 33/33 | 7.32-12.15 |
| R8 | 9/9, 7/7 | 9/9, 7/7 | 6.88-17.29 |
| B2 | 40/40, 40/40 NR 1 | 46/46, 46/46 | 6.23-16.35 |
| B1; B3 | 1/1 ×2 | 1/1 ×2; PR 5/5 | 7.32-9.24 |
| C1-C9 | each PASS ×2 | each PASS ×2 | 7.73-11.34 |
| L1 | 6/6 | 6/6 | 7.65-10.78 |
| P2, P4, P5, F1-F5, N1-N5, R3, R5 | all PASS ×4 | | |

### 3.2 · The handoff (B2)

| reading | C·l | C·d | W·l | W·d |
|---|---|---|---|---|
| H8-1 `film·hole·column` | 18 reads, 0 runs over 1 frame | 18, 0 | 36, 0 (with `fmlow`) | 36, 0 (with `fmlow`) |
| hole frames (`fm-reads.txt`, `fmsum.mjs`) | 0 | 0 | 0 | 0 |
| FM `stub` reads | 0 | 0 | 0 | 0 |
| W3 `stub` reads | 0 | 1 (`content-add`, NR, above) | 0 | 0 |
| FM load | 7.53-10.4 | 11.26-14.17 | 6.23-13.34 | 8.05-16.35 |

- **The display-frame probe** (`si/summary.txt`; the pass-8 critic's `slotink-crit.mjs` unchanged, bp10 and bp8 alternating, 3 runs per engine and theme, in the readings slots at load 6.34-16.97): **bp10 0 of 72 runs with an empty frame, bp8 0 of 72.** Lowest `minInk` at the exchange: bp10 0.263 (C·l `first-expand`, 9.27), bp8 0.238 (W·d `warm-expand`, 14.11). Largest one-frame rise on first/warm expand: bp10 0.792-1, bp8 0.708-1.
- **The strips** (`filmstrips/`, 108, kept per reading: 18 per Chromium column, 36 per WebKit column with `fmlow`; montages in `strips-read/`), by eye:

| strip | reading |
|---|---|
| W·d `first-expand` main, re-run 1, re-run 2 | "H P 2 3" with P fading for one 40 ms tile → "H 1 2 3". The slot holds P until 1 has ink. No tile without ink at the slot |
| W·d `first-expand` `fmlow` r1 | "H P 2" → "H 1(faint) 2 3" for one tile → "H 1 2 3". Faint, not empty: the pass-9 weakest tile, unchanged in kind |
| W·l `first-expand` main, `fmlow` r1; `warm-expand` main | "H P 2 3" → "H P(fading) 2 3" → "H 1 2 3"; the first-expand main holds the fading P for two tiles (the WebKit paint hold, with ink) |
| W·l `warm-collapse` main | "H 1 2 3 \| P…" → "H 1" → "H P(at the plate's edge)" → "H" |
| W·d `swap-short`, C·d `swap-short` | "C Tools…" → "C ɔols Brushes…" → "C ɔols Brus" → "A B ɜ B" → "A B". The soft partials under the one-advance ramp (§P6-2's class) |
| W·l `swap-long` | "A B" → "A Ɛ ɔls Brus" → "A Ɛ ɔls Brushes La" → "C Tools Brushes Layers" |
| C·l `first-expand` | "H P" → "H P 2" → "H P 2 3 \| Play" → "H P(fading) 2 3 \| Play Settings" → "H 1 2 3 …" |

No strip read here shows the slot empty, and no glyph is cut hard inside the plate. B2's strip read is the critic's to rule; nothing here differs in kind from pass 9.

### 3.3 · R2's margin per column (bound 0.5)

`r2-margins.txt` (the critic's `r2sum.sh`, every W3 cell, main and re-runs):

| column | worst drop | margin | load |
|---|---:|---:|---|
| C·l | 0.378 | **0.122** | 11.08 |
| C·d | 0.371 | **0.129** | 10.58 |
| W·l | 0.388 | **0.112** | 7.43 |
| W·d | 0.398 | **0.102** | 9.76 |
| pass 9 critic (bp8) | 0.381 / 0.372 / 0.443 / 0.447 | 0.119 / 0.128 / 0.057 / 0.053 | 9.73 / 6.28 / 12.2 / 13 |

The cure never sets back a leaving unit, so it spends nothing of this margin by construction. The WebKit columns read wider than the critic's reads, but at lower load (7.4-9.8 against 12-13); this seat's battery had no WebKit W3 cell above 11.26. The critic's attack at load 10-15 is the comparable read.

### 3.4 · `stub` per column (§P8-7.1's rule)

0 FM stub reads in every column (battery and `fmlow`, `fm-reads.txt`). The one W3 stub read (C·d `content-add`) is a single read at one cell, not two at one slot. The rule does not fire.

---

## 4 · Step 4: the heir test, decided on evidence

**What it read before.** `heir/c1i-chromium.log`: an instrumented `c1` with bp8's heir test, where the trace logs every tied unit. In 16 sequences, including `vmorph` `lead-remove` and its `wide` variant, `morph` `lead-remove`, `first-expand` on `vmorph`, `wide=1` and `anchor=end`, and both `three` swaps, the only hidden tied unit is the collapsed face on `vmorph lead-remove` ("0 → P HIDDEN, gated (de 16)") and its `wide` form ("0 → Now play HIDDEN, gated"). Both were gated off by a far-side unit. Every other tied unit was coming in (`P→1`, `1→P`, `A→C`, `C→E`).

**The decision: the test lands.** `if (Math.abs(end) <= TOUCH_PX && o.enter) heir = o;`, the same line with `o.enter` added.
- A hidden unit that is not arriving takes no gift.
- The unit that can still be an heir is an arriving one, which is what "Where a unit comes in on the very place a unit leaves" says. The header now states what `arm()` tests and needs no correction.
- It costs no row: 38/38 ruled, B2 ×4.
- It costs no bytes worth naming: the boot graph moved by the cure, not by this line.

**What it reads after** (`heir/bp10-{chromium,webkit}.log`, instrumented `bp10i`, load 10.41-19.93):
- `vlead-remove` and `vlead-remove-wide`: armed 1, tied **0**, in both engines.
- Every arriving heir is unchanged: `first-expand`, `warm-collapse`, `warm-expand`, `vfirst-expand`, `end-first-expand`, `swap-long`, `three-long` and `three-mid` each "enter, taken".

**One reading for the critic, not a row.** `swap-short` tied 0 on `c1i` (old test) and 1 on `bp10i` (`C→A enter taken`, both engines). The new test is stricter, so the difference is not the test's. It is whether A had painted before `arm()` read its centre, which varies by run. The probe reads 0 empty frames on `swap-short` in all 12 runs per build either way.

**The scope of `o.enter`.** A unit that joined the DOM (`joined`) is arriving but not `enter`, so it cannot be an heir. No harness or demo sequence ties a joined unit on a leaving unit's place: `content-add` and `lead-add` arm 0 heirs on both trees. If one ever did, it would take the pre-handoff path, a seam-held wipe with no gift. That geometry is unmeasured.

**`vmorph lead-remove` driven in the probe** (`vl/summary.txt`; the critic's `slotink-axis.mjs`, bp10 and bp8 alternating, 3 runs per engine and theme, load 7.28-15.07): `vlead-remove` and `lead-remove` read longest empty run 0, `minInk` 1, in all 48 runs on both builds.

---

## 5 · Step 5: prose

- `useDockContent.ts`: "(W3 `ticking`: without `characterData` the plate steps 9.6 px in one frame, Chromium)" becomes "(without `characterData` the plate steps by the text's growth in one frame)". The `[D2 floor v2 · N-2; REGISTRY PF-5, P2-3]` header tag and "(PF-5)" go.
- The seven REGISTRY citations in added lines go, and each comment states its law alone:
  - `useDockBody.ts` §P4-6 Q-18 (a) and §5 Q-5 (b);
  - `useDockScene.ts` P2-4 §4.3 (with `[F-9;`);
  - `dock.css` §5 Q-7 (a) ×2;
  - `scroll-rungs.css` §7.3 B′ item 7;
  - `shape.css` §5 Q-6 (a), with "canon P5 amended for it".
- **Also by grep:** "(the harness's S-2 / PF-3)" in `src/styles/tokens/glass.css` and "(PF-3)" in `dock.css` go. Both are harness row ids that PR's regexes do not catch.
- The header's "The seam." paragraph states the new law ("any two cut edges that face each other keep it too, the unit coming in giving way"). The new pass's comment states it in full.
- **Grep at return:** `grep -rnE 'H[0-9]+-[0-9]+|retarget·|W3 \`|ticking|harness.s|\b(PF|S)-[0-9]' src/components/dock src/styles/tokens/glass.css` reads two floor lines this seat left. Both are floor v5's and outside the seven:
  - `layers.css:151` "[D2 floor row 5 · F-5, S-19]";
  - `run.css:17` "S-8".

  They are REGISTRY family and finding ids from earlier passes, not harness rows. They and the other floor-v2 REGISTRY tags ("REGISTRY F-2", "REGISTRY §5 Q-1/Q-2/Q-3/Q-8", "REGISTRY F-4, M-2", "REGISTRY P2-2", in `GlassDock.vue`, `run.css`, `useDockShellProps.ts`, `constants.ts`, `useDockScrollSource.ts`, `useDockState.ts`, `dockSizeHandoff.ts`, `scroll-rungs.css:43`, `shell.css:71`) are in floor v5's lines, not B′'s. They stay for the landing to strike with the floor.
- **PR 6/6** on the final tree (`PR.log`, load 7.69): `prose·harness` 0, `prose·citations` 0, `prose·readers` 65 / 0 without a reader.

---

## 6 · Step 6: F7

**F7 13/13 on the final tree** (`F7-bp10/F7.json`, load 7.55-12.64): typecheck, lib and demo builds, units 232 files / 2,241 tests / 0 failing, all ten gates.

**Boot graph: 64 files, 503,737 B against 503,808 B, margin 71 B** (`F7-bp10/boot-graph.txt`, `scripts/bootsize.py` from `dist-demo/index.html`). That is 108 B less than bp8's 179 B: the scene chunk went from 21,325 B to 21,433 B. No raise, no split, and no change to what loads before the first morph. The cure found its bytes by replacing `cutLive` (`c1` was 39 B over; `c2`/`c3` are the restructure). The landing's F7 now starts from 71 B.

The first F7 and PR reads (`F7-bp10/first-read/`, `PR-bp10/PR-first-read.*`) straddled the last comment edits (20:12:40). Both were re-run on the final tree, and the final tree's harness build is byte-identical to the build every reading used.

---

## 7 · Step 7: the readings beside the rows (none a row)

| reading | result | load |
|---|---|---|
| retarget A/B, 8 rounds × 3 cells × 2 themes × 2 engines (§2.2) | bp10 **0/96**; bp8 1/96 | 6.78-13.55 |
| phase sweep on bp10, 40-200 / 4 ms, 4 runs (§2.2) | **0/656** splice, sliver, blank, stub | 4.65-15.13 |
| phase sweep on bp8 (§1.1) | 32/656 splice, in a 48-84 ms window, plus one at +112 | 4.48-22.23 |
| display-frame probe, 3 runs per engine and theme (§3.2) | bp10 0/72, bp8 0/72; `minInk` 0.263 / 0.238 | 6.34-16.97 |
| `vmorph` / `morph` `lead-remove` probe (§4) | 0 empty, `minInk` 1, 48/48 per build | 7.28-15.07 |
| R2 margin per column (§3.3) | 0.122 / 0.129 / 0.112 / 0.102 | 7.43-11.08 |
| `stub` per column (§3.4) | FM 0 ×4; W3 1 (C·d, NR) | — |
| boot-graph margin (§6) | 71 B | — |
| `useDockScene` diff against bp8 from the built trees (§2.1) | `diff/bp8-bp10-useDockScene.{src,built}.diff` | — |
| **cost**, bp10 → bp8 → fv5 alternating, 3 rounds, Chromium traced, `--cpu-cores 0`, each run started at load ≤ 15 (`cost/summary.txt`) | frames over 25 ms over the four 4× rows: **bp10 8, bp8 7, fv5 0** | 8.56-14.04 |

Cost per row (frames over 25 ms / worst ms, per round):

| row | bp10 | bp8 | fv5 |
|---|---|---|---|
| 4× expand, 20 | 0/23.5 · 1/28.2 · 0/24.2 | 0/15.1 · 0/22.8 · 1/29.2 | 0 ×3 (11.2-17.9) |
| 4× expand, 40 | 1/30.2 · 1/30.0 · 1/34.1 | 1/42.3 · 1/35.5 · 1/37.4 | 0 ×3 |
| 4× lead, 20 | 1/29.9 · 0/19.0 · 0/16.9 | 0 ×3 | 0 ×3 |
| 4× lead, 40 | 1/30.6 · 1/32.0 · 1/31.4 | 2/35.2 · 0/24.5 · 1/36.5 | 0 ×3 |
| main-thread ms/frame, 4×20 expand | 0.907-0.994 | 0.88-1.087 | 1.625-1.799 |

The builds do not separate. The trigger frames sit at the 25 ms threshold in both, as §P9-3 read. Floor v5 stays cheaper on these rows, which Q-15 (a) prices.

---

## 8 · Open, for the critic (nothing here scores a row)

| item | reading | where |
|---|---|---|
| the cure against the class | 0/656 sweep and 0/96 A/B on bp10, against 32/656 and 1/96 on bp8 in the same sessions | §2.2. The critic's own A/B and sweep (§P9-7.4), with a retarget of a retarget: `sweep.mjs --twice <ms>` is in `scripts/` but **this seat did not run it** |
| boot-graph margin 71 B | down 108 B | the landing's F7 starts here |
| `swap-short` heir arming varies by run | 0 on `c1i`, 1 on `bp10i`; probe 0 empty either way | §4 |
| a joined unit cannot be an heir | no geometry reaches it | §4 |
| W·d `first-expand` `fmlow` faint "1" for one tile | as pass 9's weakest tile | §3.2; the owner's glance |
| R2 WebKit at load 10-15 | this battery's WebKit W3 ran at ≤ 11.26 | §3.3 |
| `lead-add`/`lead-remove` [terminal] borderline | red once each on bp8 and on c2 in Chromium light trials at 8.7-9.7, not in the battery | §2.3, `try/` |
| floor-v5 REGISTRY tags in `src/` | not B′'s lines | §5; the landing |
| real Safari | **UNMEASURED (owner's safaridriver checkbox)** | owner |

---

## 9 · Fences, as kept

- **Worktree:** `.claude/worktrees/bl/D2/p10/Bp-build/wt`, detached at `387c11285`; `node_modules` a directory of per-package symlinks to the checkout's. No `tests-visual/node_modules` exists in the checkout to link. Every build, vite cache and output under `Bp-build/out/`, plus `npm run demo:dist:build` inside the worktree for the boot graph. The instrumented trees (`bp8i`, `c1i`, `c2i`, `bp10i`) were patched in the worktree copy for the build only and restored, `cmp`-checked equal each time.
- **Git writes:** `worktree add` and `worktree remove --force` only. The patch is made with `git diff --no-index` between two plain trees (no object written).
- **Writes to the checkout:** this file, `pass-10/D2-Bp-proto.patch`, and `pass-10/D2-Bp-proto-records/`. No source edit in the checkout (`git diff HEAD -- src` empty at return). Nothing under `~/.claude` was read; the guard was invoked, never read. No sibling repo read beyond what earlier records cite, none built or run.
- **Machine law:**
  - Every build, test and browser run went through `guarded`, never `--light` for a browser run. `--light` was used only for PR, which launches no browser.
  - Playwright WebKit always ran under `--exclusive webkit`. The lock admitted every WebKit slot at once, with no wait, except the `c2` sweep's.
  - One heavy run at a time, held by a seat lock (`scripts/seatlock.sh`) across the WebKit queue.
  - One browser per run and a fresh context per cell, every page, context and browser closed in `finally`. No headed, GPU-arg or real-Safari run, and no browser MCP. No zone refusal.
- **Stops:** the `c2` WebKit sweep slot was stopped while **queued** for the lock, before any WebKit cell ran, because its build was superseded (`chain.log`, 20:11). That was not a cancel for the wait.
- **At return:** the harness is equal to `pass-8/H8-records/harness.sha256` (42 OK, `9d12810b…`). The worktree is removed and `.claude/worktrees/bl/D2/p10/Bp-build/` deleted.
