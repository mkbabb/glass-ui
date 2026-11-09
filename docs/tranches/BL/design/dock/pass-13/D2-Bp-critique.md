# D2 · pass 13 · D2-B′ fresh critique (`bp13`): 38/38 on the ruled digest; none of rules (a)-(d) fires

| field | value |
|---|---|
| seat | D2 pass-13 FRESH CRITIC of D2-B′ (REGISTRY §P12c-7.4). Authored nothing in D2 and was no earlier D2 critic |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree detached at `392ff1e3c`, the checkout's HEAD at this seat's start. No path outside `docs/` moved during the seat |
| patches | re-hashed at the start (`patches-sha256-start.txt`) and the end (`patches-sha256-end.txt`), equal: `pass-13/D2-Bp-p13.patch` **`bb7cb08da92677aa6e4e2c753ce9f901b17f4ddb2051d2f4162ef43e97648121`**, `pass-12/D2-Bp-p12.patch` `5318a3dc…`, `pass-6/floor-v5.patch` `cba6bdc2…`, `pass-4/floor-v3.patch` `637d1625…`. Staged with `git apply` only (`--check` first), no commit (`apply.log`). p13 over fv5: 64 paths |
| builds | `fv3`, `fv5`, `bp12` (+ `bp12fs`, `bp12t`), `bp13` (+ `bp13fs`, `bp13t`, `bp13i`, `bp13fsi`), each exit 0 (`build-*.log`). Instrumented trees were patched for their build only and restored `equal`. Scene chunks: bp12 21,483 B, bp13 21,473 B, the builder's sizes |
| harness | H8 as landed: 42 files OK against `pass-8/H8-records/harness.sha256` at the start (`harness-check-start.txt`), at every chain step's start (`chain.log`) and at the end (`harness-check-end.txt`). No H9; no bound re-read |
| rulings read | `audit/INBOUND.md` to O-184 and `FORMATION-PROGRESS.md` to its last line (2026-11-06 15:40). Nothing arriving touches the 38. O-166's "morph smoothing" is placed at W-0.8 and the D2 bar by INBOUND, outside the 38. O-129 r9 is the agglomeration's (§P12c-7.5) |
| engines | Chromium (Playwright's default headless shell, no GPU args) and **Playwright WebKit**, unshimmed. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| zone | `guarded` printed its ZONE-ARMED warning (inuse about 43k, 25/s) on WebKit queues and **refused no run**. Under the owner's 2026-11-03 order the readings it admitted are of record |
| records | `pass-13/D2-Bp-crit-records/`: `battery/`, `digest/`, `filmstrips/` (126 battery and `fmlow` strips), `F7/`, `PR/`, `rerun/`, `q/` (queues, `.done` lists, slot logs), `rev/`, `ab/`, `cr/`, `swrev/`, `fmab/`, `si/`, `r2/`, `r2x/`, `r2y/`, `pe/`, `revst/`, `rtrev/`, `lanes/`, `edge/`, `fs/`, `heir/`, `frz/`, `cases/`, `cost/`, `fu/`, `sum/`, `scripts/`, `chain.log`. No video |

Load is the 1-minute load average. `R` is `pass-13/D2-Bp-crit-records/`. `BU` is `pass-13/D2-Bp-build.md`; `CC` is `pass-12/D2-Bp-critique-complete.md`.

---

## 0 · Verdict

| digest | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| **ruled (O-103), B2 read on the strips too: this seat's reading** | **38/38** | **36/36** | **24/24** | none |
| default | 36/38 | 34/36 | 22/24 | P1 (OWNER-BLOCKED, Q-12), P3 (OWNER-BLOCKED, Q-4) |

671 cells (`R/digest/counts-p13crit-ruled-ruled.md`): 0 FAIL, 2 NOT-REPRODUCED, 12 UNMEASURED (W8 `consumer·*`, as every pass), 12 RECORD; 39 OWNER-BLOCKED cells read on Q-4 (c) / Q-12 (b), 39 PASS. CASES reads 6/6 in both engines this battery.

**The rules (§P12c-7.1):**

| rule | reading | fired? |
|---|---|---|
| (a) two `splice` reads at one `retarget` cell, one column, one A/B | bp13 **0 of 96** (24 per column), sliver 0, stub 0; bp12 0 of 96 (`R/sum/absum.txt`) | **no** |
| (b) two `stub` reads at one slot, one column, one battery | **0 stub frames in every battery W3 read** (main and re-runs, four columns) and FM stub 0 ×4 | **no** |
| (c) any bp13 `content-remove` A/B read whose flag closes over 2F + 0.5 after the landing | bp13 **0 late in 32**; gaps 0 except C·l 9.2 and C·d 8.2 ms (one in-band step each); bp12 0 late, one 8.9 | **no** |
| (d) any bp13 `stub` read on the `reversal` A/B | bp13 **0 of 48** (16 C·l, 16 C·d, 8 W·l, 8 W·d); bp12 **1 of 48**: C·d r14, "t" of a tab button painted 0.22, edge at 879.1 px, +104.2 ms, ramp width 0.24 px (10.34) | **no** |

**On this seat's reading no row of the 38 is open and none of (a)-(d) fires.** Whether pass 13 is clean is the agglomeration's to rule (§P12c-7.5 item 2). Every verdict above is the H8 digest's; no probe of this seat turned a row.

**What the cure did, read here.** The reversal-stub family reads 0 on bp13 across 336 reads of its cells and attacks, against bp12's 6, every one a 0.24-0.25 px hard edge across a tab-button glyph in the reversal's after-retarget frames (§2). That is BU §1's class and signature. The 794 px opening-plate sibling did not draw on either build this seat (0 `swrev` stub reads on 128 per build).

---

## 1 · How this seat ran

| step | start → end | load (start / cells) |
|---|---|---|
| builds | 2026-11-06 19:09:14 → 19:10:17 | each exit 0 |
| PR (`--light`, no browser), F7 | 19:12:38 → 19:13:57 | 14.68 / 15.32. **F7 13/13** (typecheck, lib and demo builds, 2,241 unit tests in 232 files, 0 failing, every gate); **boot graph 503,777 B of 503,808, margin 31 B**, as BU. **PR 6/6** |
| battery C·l, C·d (`theme` slots) | 19:13:57 (14.58) → 19:24:14 · 19:24 → 19:34:46 | cells to 19.14 · 14.13 |
| WebKit slot 1 (`--exclusive webkit`): the owed re-runs, the W·l battery, W·l `fmlow` | queued 19:34:47, **admitted 20:46:13 (71 min)** → 21:07:49 | re-runs 9.10-10.96 at their starts; cells to 16.36; `fmlow` admitted 12.42 (bound 15), READ |
| WebKit slot 2: the W·d battery, W·d `fmlow`, then the W·d queue to the slot's budget | queued 21:07:55, **admitted 21:48:43 (41 min)** → 23:07:50 (exit 75, gate held 30 min) | cells to 12.88; `fmlow` admitted 12.32, READ |
| first digest | 23:08 | — |
| read queues C·l, C·d, W·l, W·d (rest) | 23:08 → 2026-11-07 04:47:35 | every gate-11 read started at ≤ 11 but one (below) |
| cost (Chromium, `--cpu-cores 0`) | 04:47 → 04:56 | each start ≤ 15 |
| digest, harness end | 04:56:51 | 42 OK |
| follow-up `fu` (every red cell of the A/Bs and attacks re-read, §3.7) | 04:57:18 → 06:04:28 (WebKit admitted at once) | gate 11 |

- **One heavy run at a time** (`seat.lock` held by each chain step). Every build, browser run and digest went through `guarded`; browser runs never `--light`; Playwright WebKit under `--exclusive webkit`, queued and never cancelled. **No lock wait passed 90 min** (71 and 41 min). No admitted slot was ended by stopping its parent: slots ended at their queue's end or their own exit 75 (budget, or a gate held 30 min), and the chain re-queued the rest.
- **No battery slot read a cell above 31**, so none was re-read.
- **Start loads.** 528 gate-11 reads: every one checked ≤ 11 before it started, and one logged 11.17 on its start line (`lanes-morph-bp13t-r3`, 03:32:29, W·l): the load rose between the check and the line, and the read is kept as read. `r2x` / `r2y` (gate 10-15) started at 10.09-14.53.
- No WebKit page close, no headed run, no GPU args, no browser MCP. Every witness and probe opens one browser and a fresh context per cell, under the landed `launch()`'s 60-load restart (H3-1).

**The owed re-runs (`R/rerun/`, inside WebKit slot 1).** BU §6 names three single reds of the reference arm in its A/Bs and one thin read of bp13: bp12 W·d `warm-collapse` [lanes], bp12 W·d `swap-short` [window, blank], and the R2 0.497 read on W·l `swap-long`. Each was re-run twice on bp13 and bp12 alternating, at 9.10-10.96: **all 12 reads ruled PASS** (`warm-collapse` OWNER-BLOCKED on [window] alone, Q-4 (c) PASS). The bp12 [lanes] and [window, blank] are NOT-REPRODUCED. W·l `swap-long` reads its worst leaving drop 0.37 on both builds (`python3 scripts/w3sum.py rerun/*.json`).

---

## 2 · The reversal and its siblings (rule (d) and the attacks)

All bp13 against bp12 alternating, Chromium at ≤ 11 and Playwright WebKit at ≤ 11 (`R/sum/absum.txt`, `R/sum/summ.txt`):

| reading | bp13 stub reads | bp12 stub reads | load |
|---|---:|---:|---|
| W3 `reversal` A/B (rule (d)), 16 + 16 + 8 + 8 rounds | **0 of 48** | 1 of 48 (C·d r14 "t" 0.22 at 879.1 px, +104.2 ms, 0.24 px) | 7.98-12.84 at the cells |
| `revst` (rev-c at 0.2-0.9, 2 rounds × 2 runs), per column 24 | **0 of 96** | 2 of 96: C·l "g" 78 % at 893.3 px, +92.7 ms, 0.25 px (10.09); **W·l** "i" 69 % at 884.2 px, +104 ms, 0.24 px | 8.38-15.16 |
| `rtrev` (retarget during the morph reversal, D 16/32/64, 2 runs), per column 48 | **0 of 192** | 4 of 192: C·l "3" 78 % at 806.1 px (+154.9 ms), "e" 88 % at 877.6 px (+95.6), "y" 85 % at 851.3 px (+119.5), all 0.25 px; C·d one | 7.18-17.69 |
| `swrev` (F2's arguments, `--at 40 --then 0,16,32,64 --runs 2`, 4 rounds), per column 32 | **0 of 128** | 0 of 128 | 8.43-15.58 |
| W3 plate-edge cells (`pe`: `swap-*`, `lead-*`, `content-add`, `warm-*`, 4 rounds) | 0 | 0 | ≤ 11 starts |
| `retarget·40/80/120` A/B | 0 of 96 | 0 of 96 | |
| `edge` (`retarget·N`, N 0-40 by 4 and 200-320 by 10, 2 runs, bp13) | 0 of 192 | — | 10.14-16.45 |
| battery W3, every read, four columns | 0 | — | |

Every bp12 stub is the class BU §1 traced: a hard edge 0.24-0.25 px wide across a tab-button glyph in the frames after the reversal's retarget. **bp13 draws none in 336 reads of the reversal family (48 + 96 + 192); bp12 draws 7 in as many.** One bp12 stub is in Playwright WebKit (W·l `revst`), where pass 12 read none. The class is not Chromium-only on the base, and bp13 reads it 0 there too. The 794 px sibling ("r" at 793.8 px on `swrev --then 0`, BU §5.2) did not draw on either build in this seat's 128 + 128 `swrev` reads, so this seat can say only that bp13 reads 0 of it.

**Static read of the cure** (`BU` `v2/scene-p12-to-p13.diff`, on the patched `useDockScene.ts`). `ramp(d, x) = d > 0.01 ? f + (1 − f)·x / k : 1` with `f = clamp01(1 − d / TOUCH_PX)`. At depth ≥ `TOUCH_PX` it is the old ramp exactly; the clip's place is unchanged, so no edge moves in place or time (no timing mask, E-2). No constant moved. One nit, not a defect: alpha at the edge is 1 for d ≤ 0.01 and 0.98 just above, so "no step" holds to the `whole` test's own 0.01 px tolerance, a 2 % step at most. The ramp's 10 → 90 % run is ≥ 2 px whenever `k` ≥ 2.5 px; a heir's `k = q` (half a closing unit's span) can be smaller, but that is bp12's seam-ramp case unchanged, and no stub read shows it.

---

## 3 · The other attacks

### 3.1 · The `swrev` phase, all four columns (beside the rows)

Splice `s7|s8` reads (`R/sum/absum.txt`): **bp13 4 of 128** (W·l 3: `40 then 32` ×2 at +113 and +121 ms, `40 then 64` at +151 ms; W·d 1: `40 then 32` at +112 ms; gaps 8.03-8.43 px, advance 9.58 px), **bp12 1 of 128** (W·l `40 then 32`, 8.26 px). Chromium 0 on both. Sliver 0, stub 0 on every read. This is BU §2's class (two leaving remnants facing each other, ramps to 0 between them), which BU left the base's and did not cure. Here bp13 reads it 4 and bp12 1. Taken with BU's 4/64 against 7/64 and F2's bp12 2/32 against bp10 3/32, the rates do not separate the builds (bp13 8 of 192, bp12 8 of 192 over BU and this seat). It is no rule and no row; placed for the next build (§6).

### 3.2 · The window, late and early, Playwright WebKit at ≤ 11

`lanes.mjs` on bp13t / bp12t alternating, morph and swap scenes, 4 rounds (`R/sum/lanes.txt`, `R/sum/early.txt`): **0 late in 72 on each build**; every non-zero gap is one frame (5-21 ms); **0 windows with motion after the close** on either build. The `content-remove` A/B reads WebKit gaps 0 ×32 on both builds. The `pe` A/B (the window cells at ≤ 11) reads every bp13 window OWNER-BLOCKED at most and PASS on Q-4 (c).

### 3.3 · B2: the strips and the slot-5 frame

- **FM A/B** (`fmab`, 8 rounds per WebKit theme): **0 hole reads in 32 on bp13 and 0 in 32 on bp12**, 0 stub. Battery FM and `fmlow` (admitted 12.42 and 12.32): FM PASS 7/7 Chromium and 13/13 Playwright WebKit per theme, the hole column clean ×4 (`R/digest/counts-p13crit-ruled-ruled.md`).
- **By eye, all four columns** (montages of `filmstrips/<col>/{main,dark}_strip-*-{warm-expand,warm-collapse,swap-long,swap-short,content-add}.png`): `warm-expand` "H P" → "H P 2 3" → "H 1 2 3", ink in slot 2 on every tile; `warm-collapse` the reverse with slot 2 inked throughout; the swaps' soft partials ("A ɛols", "C ɔols") are the §P6-2 class; no empty tile. The `fmlow` `warm-collapse` strips (3 per WebKit theme): the far seat ("Square", then "Settings") is taken by the closing plate's own edge tile by tile, with no empty slot. That is the plate-edge class pass 11 and CC placed, not a seam.
- **Display-frame probe** (`si`, 3 rounds): **0 of 72 runs with an empty frame on both builds**. Lowest minInk bp13 0.41 (W·d `swap-long` "Tools" at +151 ms, 8.37), 0.422 in the other three columns; bp12 0.377 (C·d, +139.8 ms, 10.99), 0.422 elsewhere. BU's 0.375 / 0.399 on bp13 in WebKit is not reproduced as a bp13 tail: bp12 reads the lower value here. It does not separate the builds.

**B2 is PASS on the strips in all four columns.**

### 3.4 · R2 at 10-15, above all W·l `swap-long` seats 1 and 2 and seat 1 at `retarget·80`

The worst one-frame leaving drop (vanish, bound 0.5), every read of the A/Bs and attacks (`R/sum/r2seats.txt`):

| cell, seat | W·l bp13 / bp12 (n per build) | W·d bp13 / bp12 | C·l bp13 / bp12 | C·d bp13 / bp12 |
|---|---|---|---|---|
| `swap-long`, 1 | **0.399** / 0.451 (15) | 0.397 / 0.398 (15) | 0.374 / 0.359 (6) | 0.372 / 0.339 (6) |
| `swap-long`, 2 | 0.399 / 0.451 | 0.397 / 0.399 | 0.374 / 0.359 | 0.372 / 0.349 |
| `retarget·80`, 1 | 0.392 / 0.401 (19) | 0.391 / 0.389 (19) | 0.366 / 0.382 (10) | 0.330 / 0.367 (10) |
| worst of the column, any cell | 0.412 (`warm-expand` 8) / 0.451 (`swap-long` 1) | **0.425** (`first-expand` 8, 13.09) / 0.412 | 0.388 / 0.389 | 0.378 / 0.378 |

**The battery's own reads** (of record): C·l 0.394 (`warm-collapse` 2), C·d 0.376, W·l **0.451** (`swap-long` seat 1, main run, 10.73), W·d 0.437 (`first-expand` 8). The W·l main read's `swap-long` cell is red, see §3.7.

So **the thinnest bp13 margin this seat read is 0.049** (W·l `swap-long` seat 1, the battery's main run, one read), and over the 15 alternating reads of that seat bp13 tops at 0.399 while bp12 reads 0.451 once. BU's 0.497 (margin 0.003) is not reproduced in 18 bp13 reads of the cell at 9.21-14.53. **R2 is PASS ×4** on the digest; the margin is no row.

### 3.5 · The heir and the frozen frame

- **Heir** (`heirprobe.mjs` on bp13i, `fsheir.mjs` on bp13fsi, both engines, identical): every tied pair takes `enter` (`first-expand`, `warm-*`, `swap-*`, `vfirst-expand`, `end-first-expand`, `three-*`); `fs-to-three` gates its heir at `de 40`, `fs-to-one` takes it at `de 0`. In paint (`fs`, 3 rounds per column per build): `fs-to-one` 0 hole frames in 24 reads per build; `fs-to-three` one frame at C, −1.7 to +10 ms, in every read of **both** builds, the probe's `wide` limit (C11 §3.3, CC §3.5). **`o.enter` holds.**
- **`vmorph` collapse frozen** (`frz.mjs`, T 42-62 by 4, 2 runs, bp13 and bp12): frozen on a splice frame bp13 2/3/5/5 and bp12 6/4/3/3 of 12 per column; **`facingCut` 0 on all 96**, freeze held on all 96.

### 3.6 · The header and the comments against the code; the centre law's boundary (static)

- The header's "The seam edge is a ramp" paragraph states the new edge law once and says what `writeClip` does (§2). `writeClip`'s ramp comment says the same and names the paragraph. "The model", "The handoff", "The window" and the facing-pair comment are untouched, and the code they describe is unchanged by p13 (the diff touches `writeClip` and adds `inPlate`, which is behaviour-neutral: four copies of `[max(a, P.lo), min(b, P.hi)]`). No added line carries a REGISTRY or harness id. PR 6/6.
- **The boundary** (`sx`, `sy` are the root's ratio, line 1151-1152). On bp13, `grep` over `src/components/dock` for `scale`/`rotate`/`transform` declarations finds only seat-level scales (`tab-button`, `icon-button`, `triggers` identity bases and `--dock-active-scale`), the rim pseudo-element's `scale: var(--dock-rim-t) 1` (frames no unit), and a centring `translate` in `touch-floor.css`. **No box framing dock units carries a scale or rotate of its own.** The landing's grep stands as placed (§P12c-5).

### 3.7 · Every red check of every red cell, and its re-reads

**Battery (bp13), two reds, each NOT-REPRODUCED by H6-7:**
- C·d W3 `lead-add` [terminal] in the main read (11.82): last step 0.95 px after 0.34 px, bound 0.88. Re-runs 1 and 2 PASS (9.96, 8.58).
- W·l W3 `swap-long` [leaving] in the main read (10.73): seat 1 fades over 64 ms, 0.3 ms short of the 64.3 ms fade bound (6 frames: 0.906 → 0.851 → 0.778 → 0.69 → 0.573 → 0.451 → 0); its vanish drop 0.451 is under 0.5. Re-runs 1 and 2 PASS (10.94, 10.24: 80 and 72 ms, drops 0.349 and 0.384). It feeds R2 and R1, and both digests carry it as NR.

**A/Bs and attacks (single reads; none a battery cell, none turns a row). Every one was re-read twice or more in `fu`** (8 rounds per theme, bp13 and bp12 alternating, gate 11):

| red | where (load) | `fu` re-reads, bp13 / bp12 | whole seat, bp13 / bp12 | reading |
|---|---|---|---|---|
| `lead-add` / `lead-remove` [terminal] (last step over its bound by ≤ 0.1 px) | bp13: C·l `r2` lead-remove (8.52), C·d `pe` lead-add (11.85); bp12: five (`pe` ×4, `r2`) | 3 of 32 / 2 of 32 | 5 (plus the battery NR) / 7 | the base's; it does not separate the builds |
| `swap-long` [faces] (1.5 px of face ink beyond the plate, bound 1, Chromium) | bp13: C·l `r2` (8.52); bp12: C·d `pe` (9.31) | 1 of 16 / 0 of 16 | 2 of 28 / 1 of 28 (faces 0-1.5 px, mostly 0.5, on both) | the base's: p13 does not move the clip or the plate, so it cannot move ink beyond the plate; one 0.5 px screenshot step apart |
| `swap-short` [window, blank] (2 blank of 27 moving frames, longest run 2, at +19-21 ms, Playwright WebKit) | bp13: W·l `r2` (9.98), W·d `pe` (11.08) | 0 of 16 / 1 of 16 (W·l r7, 12.14) | 2 / 1 here, 0 / 1 in BU | the base's: BU read it on bp12 W·d at +22 ms; it does not separate the builds |
| `reversal` [window, stub] | bp12 only, C·d `rev` r14 (10.34) | — | 0 / 1 | rule (d)'s reading (§2) |

The [window] reds above are Q-4 (a)'s; Q-4 (c) holds on every one.

---

## 4 · The A/Bs (§P12c-7.3 item 5), bp13 against bp12 alternating, all four columns

| A/B | C·l | C·d | W·l | W·d | rule |
|---|---|---|---|---|---|
| `retarget·40/80/120`, 8 rounds: splice / sliver / stub | 0/0/0 of 24 · 0/0/0 | the same | the same | the same | (a), (b): no |
| `content-remove`, 8 rounds: bp13 gaps (ms) | 0 ×7, 9.2 | 0 ×7, 8.2 | 0 ×8 | 0 ×8 | (c): no |
| `content-remove`: bp12 gaps | 0 ×8 | 0 ×7, 8.9 | 0 ×8 | 0 ×8 | |
| `reversal`: stub reads bp13 / bp12 | 0/16 · 0/16 | 0/16 · **1/16** | 0/8 · 0/8 | 0/8 · 0/8 | (d): no |
| `swrev` (F2's args): splice bp13 / bp12 | 0/32 · 0/32 | 0/32 · 0/32 | 3/32 · 1/32 | 1/32 · 0/32 | beside the rows |
| FM `warm-expand` + `first-expand`: hole reads | — | — | 0/16 · 0/16 | 0/16 · 0/16 | held |
| display-frame: runs with an empty frame | 0/18 · 0/18 | 0/18 · 0/18 | 0/18 · 0/18 | 0/18 · 0/18 | held |

**Cost** (Chromium, `pass-2/D2-Bp-probes.mjs pcost,plead`, 3 rounds, `--cpu-cores 0`, each started at ≤ 15; `R/sum/costtab.txt`): frames over 25 ms on the 4× 20/40 rows **bp13 4, bp12 4, fv5 0** (loads 6.62-16.17). Main-thread ms per frame on 4×40 lead: bp13 1.359-1.499, bp12 1.407-1.521, fv5 0.101-0.128. bp13 and bp12 do not separate; floor v5's lead stays about a tenth of B′'s, Q-15 (a)'s price.

**The boot graph** (`R/F7/boot-graph.txt`): 64 files, **503,777 B against 503,808, margin 31 B**, no raise. **L1** 6/6 per engine against `fv3` (C 13.7-16.78, Playwright WebKit 9.98-11.81).

**CASES `case·rotated`** (outside the 38, for the record; C·l and W·l, 3 rounds alternating): C·l FAIL bp13 1 of 3 (snap 0.32), bp12 2 of 3 (0.29, 0.26); W·l **bp13 0 of 3, bp12 3 of 3**; the battery's CASES reads 6/6 on bp13 in both engines. On these reads bp13 is no worse than bp12. §P12-2's placement stands.

---

## 5 · The 38 rows (ruled; default beside it)

From `R/digest/{rows,counts,table}-p13crit[-ruled-ruled].md` (`harness/cells.mjs`, 671 cells). P = PASS.

| row | C·l | C·d | W·l | W·d | ruled | default | note |
|---|---|---|---|---|---|---|---|
| P1 | P | P | P | P | PASS | OWNER-BLOCKED (Q-12) | W1 `card·*` on [card] only |
| P2, P4, P5 | P | P | P | P | PASS ×3 | PASS ×3 | |
| P3 | 42/42 | 42/42; NR 1 | 42/42; NR 1 | 42/42 | PASS | OWNER-BLOCKED (Q-4) | NR: C·d `lead-add` [terminal], W·l `swap-long` [leaving] (§3.7) |
| F1-F5 | P | P | P | P | PASS ×5 | PASS ×5 | |
| F6 | P | P | P, UM | P, UM | PASS | PASS | 0 crashes; UM = W8 `consumer·*` |
| F7 | source 13/13 | | | | PASS | PASS | at 15.32 |
| N1-N5 | P | P | P | P | PASS ×5 | PASS ×5 | N5 with PR 6/6 |
| R1 | P | 30/30; NR 1 | P | P | PASS | PASS | |
| R2 | P | P | 33/33; NR 1 | P | PASS | PASS | margins §3.4 |
| R3-R5, R7, R8 | P | P | P | P | PASS | PASS | |
| R6 | P | P | P | P | PASS | PASS | W3 stub 0 ×4; FM stub 0 ×4 |
| B1, B3 | P | P | P | P | PASS ×2 | PASS ×2 | PR |
| B2 | P | P | P | P | PASS | PASS | FM, `fmlow`, the strips (§3.3) and W3 stub all clean |
| C1-C9 | P | P | P | P | PASS ×9 | PASS ×9 | the facility, both engines and themes |
| L1 | 6/6 | | 6/6 | | PASS | PASS | against `fv3` |

**Counts: ruled 38/38, 36/36, 24/24. Default 36/38, 34/36, 22/24** (P1 and P3 OWNER-BLOCKED, each PASS on its ruled branch). This seat's instruments turned no row either way.

**§P11-7.5's clean test with rule (d) (§P12c-7.5 item 2), on this reading:** 0 open rows of 38 on the ruled digest, B2 read on the strips and clean, and none of (a)-(d) fired. That is the agglomeration's to rule.

---

## 6 · Defect classes seen, for placing (no row minted)

| class | where | note |
|---|---|---|
| the reversal stub family on bp12 (0.24-0.25 px hard edge across a tab-button glyph after the retarget) | §2 | **bp13 0 of 336, bp12 7 of 336** (one in Playwright WebKit, `revst` W·l); BU §1's class, read cured on bp13 |
| the 794 px opening-plate sibling | §2 | not drawn on either build in 128 + 128 `swrev` reads; bp13 0 |
| **`swrev` W·d / W·l splice `s7\|s8`** (two leaving remnants, ramps to 0 between them) | §3.1 | bp13 4/128, bp12 1/128 here; over BU and this seat 8/192 each; the base's, uncured (BU §2); beside the rows; for the next build |
| R2 W·l `swap-long` seat 1: battery main 0.451 with a fade span 0.3 ms short of the bound | §3.4, §3.7 | NR (re-runs 0.349, 0.384); BU's 0.497 not reproduced in 18 reads; margin 0.049 at its thinnest here; no row |
| `lead-add` / `lead-remove` [terminal], Chromium | §3.7 | bp13 5 outside the battery (and the battery NR), bp12 7; the base's |
| `swap-long` [faces] 1.5 px, Chromium | §3.7 | bp13 2/28, bp12 1/28; the base's (p13 moves no clip or plate edge) |
| `swap-short` [blank] at +19-21 ms, Playwright WebKit | §3.7 | bp13 2 attack reads, 0 of 16 re-reads; bp12 1 + BU's 1; the base's |
| display-frame least ink | §3.3 | bp13 0.41-0.422, bp12 0.377-0.422; BU's 0.375 not a bp13 tail |
| `fs-to-three` one frame at C | §3.5 | both builds every read; the probe's `wide` limit |
| CASES `case·rotated` | §4 | bp13 C·l 1/3, W·l 0/3; bp12 2/3, 3/3; outside the 38 |
| the cure's 2 % edge step at d = 0.01 | §2 | the `whole` test's own tolerance; prose nit, no defect |
| cost bp13 4, bp12 4, fv5 0 | §4 | Q-15 (a) |
| boot graph 31 B | §4 | no raise; the ceiling re-read is the landing's first step |
| `lanes-morph-bp13t-r3` logged 11.17 at its start | §1 | load rose between the gate check and the line; kept as read |
| WebKit lock waits 71 and 41 min | §1 | waited out, none over 90 |
| ZONE-ARMED warnings (inuse about 43k), no refusal | header | the owner's 2026-11-03 order; readings of record |
| real Safari | every cell | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted |

---

## 7 · Fences, as kept

- **Worktree:** `.claude/worktrees/bl/D2/p13/Bp-crit/wt`, detached at `392ff1e3c`, `node_modules` (and `tests-visual/node_modules`) linked from the checkout. Builds, caches and outputs under `Bp-crit/out/`, the scratch harness copy under `Bp-crit/hfs/`. **Git writes:** `git worktree add` and `git worktree remove --force` only; `git apply` ran only in the worktree, with no commit.
- **Writes to the checkout:** this file and `pass-13/D2-Bp-crit-records/` only. No tracked source was edited. Nothing under `~/.claude` was read (the guard was invoked, never read). Sibling repos were neither read nor run.
- **Machine law:** as §1. Processes were stopped by PID only, and none had to be stopped; the chains (`run.sh`, `fu.sh`) ended at `RUN-DONE` 04:56:51 and `FU-DONE` 06:04:28. Strip montages for the eye read were made in the session scratchpad and removed.
- **At the end:** harness 42 OK; patches re-hash as in the header. The worktree entry is removed (`git worktree list` shows no `Bp-crit`) and `.claude/worktrees/bl/D2/p13/Bp-crit/` is deleted. No process of this seat remains.
