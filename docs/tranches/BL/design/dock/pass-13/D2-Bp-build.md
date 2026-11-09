# D2 · pass 13 · D2-B′ build (`bp13`)

| field | value |
|---|---|
| seat | D2 pass-13 BUILDER of D2-B′ (REGISTRY §P12c-7.3). Authored nothing in D2 passes 11 or 12, and was no pass-12 critic |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree built on `8b70ba0a9`. HEAD moved to `317b67217` during the seat (20 commits, docs only: no path outside `docs/` changed, so none is in the patch or in floor v5) |
| spec | REGISTRY §P12c-7.3 items 1-6 |
| patch | `pass-13/D2-Bp-p13.patch`, sha256 **`bb7cb08da92677aa6e4e2c753ce9f901b17f4ddb2051d2f4162ef43e97648121`**, 62 files, +2,528 / −2,411, over HEAD + floor v5 (`cba6bdc2…`). It differs from `pass-12/D2-Bp-p12.patch` (`5318a3dc…`) only in `src/components/dock/composables/useDockScene.ts` (`v2/scene-p12-to-p13.diff`). `mkpatch.sh` applied it to a plain HEAD + fv5 copy and found that tree equal to the worktree's (`v2/mkpatch.log`) |
| harness | H8 as landed, unchanged. 42 files OK against `pass-8/H8-records/harness.sha256` at the start (`harness-check-start.txt`) and at the end (`v2/harness-check-end.txt`) |
| engines | every WebKit number is **Playwright WebKit**, unshimmed. Real Safari is **UNMEASURED (owner's safaridriver checkbox)** |
| rows | **this seat scores no row.** The digest's tables are kept in `v2/digest/` for the critic |

Records: `pass-13/D2-Bp-build-records/`. The item-1/2 trace is `trace/` (and `v2/trace/` for the final build). Everything item 5 reads on the final bp13 is under `v2/`. The first bp13 draft (`bp13v1`, superseded, §3.2) left `battery/`, `F7/`, `PR/`, `filmstrips/`, `mkpatch-v1.log` and `scene-p12-to-p13-v1.diff` at the top level; its queues never ran (`q-v1-unrun/`). Scripts: `scripts/`. Short names: `bp12` = HEAD + fv5 + p12 (`5318a3dc…`); `bp10` = HEAD + fv5 + p11 (`b5d5c9db…`), the trace's carrier only; `fv5` = HEAD + floor v5; `fv3` = HEAD + floor v3; `bp13` = HEAD + fv5 + p13. Suffix `x` marks a diagnosis build that never lands: `lanetrace.py --units` plus `edgetrace.py` (the scene's per-frame writes with each mover's place, box, clip, mask, seam and radius). `bp13i` is bp13 with the pass-10 `instrument.py` (heir probe).

---

## 0 · In brief

- **Cause (items 1-2).** The reversal stub at 886.9 px and its sibling at 794 px are one class: a clip edge within a touch (0.5 px) of the plate's or the box's own edge, written at its exact place but given no ramp. The `swrev` splice is two leaving remnants facing each other. Pass 10's retarget law is not bypassed, and the splice is not cured here (§2).
- **Cure (items 3-4).** One law in `writeClip`, no constant moved: an edge less than a touch deep ramps from 1 − depth / touch, so on every frame the only hard edge across a glyph is the plate's. It costs −10 B; the boot graph's margin is 31 B, with no raise. The header states the law once.
- **Item 5, bp13 against bp12.** Rule (d): bp13 reads **0 stub in 48 `reversal` reads** (bp12 1, the 886.9 px "n"). Rule (a): bp13 0 splice in 96. Rule (c): bp13 0 late in 32. The 794 px sibling is read in paint on bp12 `swrev` (2 of 64) and on bp13 in 0 of 64. The B2 gift frame, the heir and `vmorph` `facingCut` hold. The battery (four columns, no slot above 31) reads no FAIL inside the 38. The builder's digest, which is not of record, is 38/38 ruled and 36/38 default.
- **Thin.** R2's W·l `swap-long` seat 1 read 0.497 once on bp13 (margin 0.003). The display-frame least ink in WebKit is 0.375-0.399. Both are placed for the critic (§9).
- **Item 6.** Every red check is named in §6. bp13's only FAIL is CASES `case·rotated` [snap], outside the 38.

---

## 1 · The cause of the reversal stub (item 1)

**Instrument.** `edgetrace.py` extends the pass-12 lane trace (`lanetrace.py --units`, the `instrument.py` lineage) to edges. On every frame the scene writes, it records the rAF timestamp, the plate's painted span (`Pr`), and for each mover its place, box, visible span, clip inset, mask stops, seam and radius. `revtrace.mjs` drives W3's own `reversal` sequence (and `swap-long`, `retarget·N`, `swrev:AT:THEN` for the sibling) and, beside the scene trace, runs a DOM edge reader on the same frames: for each glyph inside the plate, its painted share and the edges across it with their alpha ramps. It judges a stub with H6-1's law (a glyph painted 10-90 % by an edge whose alpha goes 10→90 % inside 2 px, inside the plate). `edgesum.py` counts the model's hard edges inside the plate (an edge more than 0.05 px in from the plate's or the box's own edge whose ink at the edge is 0.9 or more) and the painted ones by depth band.

Runs, all trace builds alternating per round:
- **Chromium** C·l and C·d W3 `reversal`, bp12x / bp10x / bp13x(v1), 4 rounds per theme, loads 12.6-18.3 at the read (gate 15 at the start); rounds 5-8 were withdrawn before they ran (they are placeholders in `trace/`). On the final build, bp13x 4 rounds per theme (`v2/trace/`, loads 14.1-15.0).
- **Playwright WebKit** W·l and W·d `swap-long`, `retarget·40`, `retarget·120`, `swrev` at 40 then 16, 32, 64: 3 rounds per cell per theme per build, 36 runs per build, loads 11.4-15.2.

**What the trace reads.**

| build | Chromium `reversal`: model hard edges inside the plate (runs with one) | stub in paint | Playwright WebKit siblings: model hard edges (runs with one) | stub in paint |
|---|---:|---:|---:|---:|
| bp10x | 205 (8 of 8) | 1 of 8 | 369 (27 of 36; none on `retarget·120`) | 0 of 36 |
| bp12x | 207 (8 of 8) | 1 of 8, plus the smoke run | 386 (30 of 36) | 0 of 36 |
| bp13x (v1, touch snap) | 0 | 0 of 8 | 0 | 0 of 36 |
| bp13x (final) | 0 | 0 of 8 | not re-traced (read through the A/B, §5) | |

The painted stubs, each a glyph cut by a 0.24-0.25 px edge on a frame where the model had a hard edge across it:
- bp12x smoke run (C·l, load 14.32): **"n" of `Settings` 30 % at 886.9 px, +116.7 ms, edge 0.24 px**. This is the registry's stub to the pixel and the millisecond.
- bp12x C·d r3 (load 13.46): "g" 59 % at 892.6 px, +125.2 ms, 0.25 px.
- bp10x C·d r1 (load 13.49): "e" 18 % at 874.8 px, +100 ms, 0.25 px.

**The edge at 886.9 px.** On the +116.7 ms frame of the smoke run, the plate's painted span is 73.59-408.19 (local px), and `Settings` (coming in) has the span 358.08-407.79. Its end is 0.40 px inside the plate's opening edge. The scene writes the clip `inset(-9px 36.47px -9px 0px)` there, and **no mask**. That is the edge across "n". Why no ramp: `writeClip` called an edge "cut" only when it lay more than `TOUCH_PX` (0.5) inside both the plate's and the unit's own edge. An edge within a touch was treated as uncut, so it got no ramp, but the clip was still written at its exact place. The result is a hard edge up to 0.5 px inside the plate. Two things put an edge there on a reversal: the reveal limiter, whose coming-in edge trails the reopening plate by a fraction of a pixel on the frames after the retarget (+100-130 ms), and a front that has only just started moving off the plate's edge. The other two stubs are the same: `Settings`' end within a touch of the plate's edge, no mask, on the frames after the retarget.

**The sibling at 794 px** (the opening plate's edge across "r", W·l `swap-long` and `retarget·*`). No run of the 36 per build drew it in paint, so the trace cannot show its frame. Every model hard edge the trace finds on those cells has the same form: an edge 0.05-0.5 px inside the opening plate's edge or the unit's own box, written as a clip with no ramp (bp12x 386, bp10x 369). A glyph across the plate's edge is cut by the plate, which the header allows. What the stub law reads is the second, hard edge a fraction of a pixel inside it. **One class:** a hard clip edge within a touch of the plate's (or the box's) own edge crossing a glyph on one frame. One law covers both (§3).

---

## 2 · The `swrev` splice (item 2)

**Reading.** Playwright WebKit, `swrev` at 40 then 16, 32, 64, 3 rounds per theme per build (the trace's harness splice reader reads clip rects only, as `spliceRow` does). Splice frames: bp10x 2 of 18, bp12x 2 of 18, bp13x(v1) 3 of 18, all `s7|s8`, gap 7.23-7.62 px, at +99-150 ms (`trace/edgesum-webkit.txt`). The final build is read by the A/B (§5).

**The splice frame** (W·d, bp12x, run 1, then 64; the retarget lands at +121 ms):

| ms | seat 7 `Tools` (going out, reversed) | seat 8 `Brushes` (going out) | coming in |
|---|---|---|---|
| +118, before the retarget's write | 78.3-90.2 local, its end ramp 0 → 0.625 | 96.2-108.2, ramp 1 → 0 | — |
| +118, after it | the scene rebases on the moved plate in the same frame (`Pr` −28.0-129.8 → 1.0-158.8): 107.3-119.2; new exit path, both ends cut | 125.2-137.2 | E, Mid, F take their places with zero span |
| +150 (splice) | 752.44-763.15 page px, mask 0.568 → 0 at its end | 770.44-781.52, mask 0 at its start → 0.587 | Mid 84.8-101.6 local, past B's front and short of `Tools`' |
| +167 | collapses to nothing | collapses to nothing | |

**Answer: pass 10's retarget law is not bypassed.** The law governs where units coming in may paint against units still painting. Here it holds: E, Mid and F enter only where nothing else paints, and their fronts start from the leaving units' fronts. The splice is between **two leaving units**: on a swap already reversed, a retarget leaves two remnants going out that face each other. The facing-pair seam law exempts a pair that are both going out (their fronts are the exchange's), so no seam is kept between them. The sliver rule then cuts both on the same frame (+167 ms), so the clip-rect reader sees two edges 7.3 px apart that close by one 9.58 px advance. In paint, the two facing edges are ramps to 0 (the glyph between them, "F", reads share 0), so no glyph is cut sharp at that frame. The splice is a reading of clip rects at a phase where the gap is empty ink.

**No cure in bp13.** Lifting the both-out exemption would keep a seam between leaving units. It would then put a cut edge between the facing leaving units of `vmorph`'s collapse, where every unit goes out and the frozen frame must read `facingCut` 0 (held, §5). The other lever is when the sliver rule cuts a remnant, which is a constant's timing, a mask under E-2. So the class stays the base's. It is placed for the next build with the A/B beside the rows (§5).

---

## 3 · The cure (item 3)

### 3.1 · The law

**On every frame, every edge a unit's clip puts inside the plate is a ramp, and an edge less than a touch deep starts its ramp at 1 − depth / touch.** Depth is the edge's distance in from the plate's edge or the unit's own box, whichever is nearer. So an edge at depth 0 is no edge (alpha 1). An edge a touch deep or more rises from 0, as every seam ramp already did, and between them the ink at the edge falls linearly with depth. The alpha at the edge is continuous in the edge's place. No frame has a step, whether a cut starts, deepens or ends. On every frame the only hard edge that can cross a glyph is the plate's own.

`writeClip` (`v2/scene-p12-to-p13.diff`):
- The two flags `cs` and `ce` (an edge more than `TOUCH_PX` in) become two depths, `ds` and `de`. The mask is dropped only when both are under 0.01 px, which is the old `whole` test's own tolerance.
- Each ramp is `f + (1 − f)·x / k` with `f = clamp01(1 − d / TOUCH_PX)`. `k` is the seam (or the heir's half span, as before). A cut at depth ≥ touch gives `f = 0`, the old ramp exactly.
- The comment above the ramps says this once and points to the header. The header's "The seam edge is a ramp" paragraph states the law (§4).
- `write()` gets one helper, `inPlate(a, b)`, for the four copies of `[max(a, P.lo), min(b, P.hi)]`. Behaviour is unchanged; it pays for the cure's bytes.

**No constant moved:** `TOUCH_PX` is the existing one. `LAND_PX`, `SEAM_SLACK_PX`, `REVEAL_GAIN`, `OFFSET_ROUNDING_PX` and H6-1's bounds are untouched. The cure does not move any edge's place or time; it only gives the edge the scene already wrote a ramp. So it does not miss a glyph by timing (E-2).

### 3.2 · The draft it replaces (`bp13v1`, superseded)

The first draft snapped an edge within a touch onto the edge it touched (`v0 = lo` / `v1 = hi`). The trace read 0 model hard edges and 0 stubs on it (§1), and F7 and PR passed. But its C·l battery read W3 `reversal` **FAIL [window, lanes]** in the main run and both re-runs: "1 lane(s) cancelled to identity, the largest `Settings` clip from 0.57 px in one frame (previous step 0.06 px) at 134.8 ms". When the depth crossed the touch, the snap jumped the clip by up to half a pixel in one frame. That is a step in the clip's own motion. The draft was stopped after that slot (its C·d slot was withdrawn in its pre-queue gate) and replaced by the continuous form above. Its records stay at the top level of the records dir (`battery/`, `F7/`, `PR/`, `filmstrips/`); its patch had sha256 `3d035c59…`.

### 3.3 · What it costs

| build | scene chunk (raw B) | boot graph (raw B) | margin to 503,808 |
|---|---:|---:|---:|
| bp12 | 21,483 | 503,787 | 21 |
| bp13v1 | 21,456 | 503,760 | 48 |
| **bp13** | **21,473** | **503,777** | **31** |

The cure is byte-negative: −10 B on the scene chunk and on the boot graph. The ceiling is not raised (F7: `v2/F7/boot-graph.txt`, 64 files).

---

## 4 · Prose (item 4)

- The header's "The seam edge is a ramp" paragraph now ends: "The plate's own edge stays hard. An edge less than a touch inside the plate's edge (or the unit's own box) is a ramp too, from 1 − depth / touch at the edge: a cut grows into its ramp with no step, and on every frame the only hard edge across a glyph is the plate's." That is the one statement of the new edge law (P-3).
- `writeClip`'s ramp comment says the same in one sentence and names the header paragraph. The facing-pair comment, "The model", "The handoff" and "The window" are untouched, and the code they describe is unchanged.
- **Id sweep:** no added line in `v2/scene-p12-to-p13.diff` carries a REGISTRY or harness id (`REGISTRY`, `§`, `H<n>-`, `O-<n>`, `Q-<n>`, `P<n>`: none).
- PR (prose rows) PASS 6/6 on the worktree (`v2/PR/PR.log`).

---

## 5 · One battery under H8, and the A/Bs (item 5)

The chain (`scripts/run13.sh` → `run13b.sh` → `chain.sh`, log `v2/chain.log`) ran every step on the final bp13, one heavy run at a time, every browser run under `guarded` (never `--light`) and every Playwright WebKit run under `--exclusive webkit`. It ended `RUN13-DONE` at 2026-11-06 19:03:40 (load 10.06), with the harness checked at its end: 42 OK (`v2/harness-check-end.txt`). The seat ran in three entries; the third adopted the live chain at 18:01:47 and waited on its PID (§7). No battery ran twice.

### 5.1 · The battery (H8, four columns)

| column | slot started | cells PASS / FAIL / NR / OB / UM / RECORD | highest cell load | re-read |
|---|---|---|---:|---|
| C·l | 2026-11-05 01:40:23 at 18.60 (gate ≤ 20) | 160 / 0 / 0 / 0 / 0 / 3 | 28.04 | no (≤ 31) |
| C·d | 2026-11-05 01:51:50 at 19.66 | 148 / 0 / 0 / 0 / 0 / 3 | 20.94 | no |
| W·l (Playwright WebKit) | queued 18:14:17, run inside the `wk` slot | 165 / **1** / 0 / 0 / 0 / 3 | 20.27 | no |
| W·d (Playwright WebKit) | queued 20:45:46 (lock wait past 90 min, kept queued) | 149 / 0 / 0 / 0 / 5 / 3 | 25.16 | no |

Counts are the ruled digest's per-column sums (`v2/digest/counts-p13bu-ruled-ruled.md`); OWNER-BLOCKED cells are counted there under the branch they are ruled on. The W·d UM are ST's `stall·nb·*` markers, as every pass; the 12 W8 `consumer·*` cells are UNMEASURED, as every pass. RECORD is R6's `r6·arms` and W7's two record cells per column.

- **The one FAIL is CASES `case·rotated`, W·l**, outside the 38: main (12.5), re-run 1 (12.35) and re-run 2 (11.6) each read **[snap]**, and its control `case·rotated·control` reads **[snap]** on re-run 1 (12.3). §6.
- **W3 `reversal`** reads 0 stub frames in all four columns (C·l main 14.35, C·d 16.76, W·l 14.16, W·d 17.42). Each is OWNER-BLOCKED on **[window]** alone under the default digest (Q-4 (a)) and PASS under Q-4 (c) on the ruled one. `swap-long` and `retarget·40/80/120` PASS ×4 (W·l and W·d `swap-long` OWNER-BLOCKED on [window] alone, Q-4).
- **FM's six B2 cells**: main and two re-runs per column, every cell PASS, 0 hole frames, 0 stub frames (`battery/bp13-*-FM-*.log`). **`fmlow`** per WebKit theme: 3 runs × 6 cells, 36 of 36 PASS (`bp13-fmlow-*-FM-webkit-r{1,2,3}.log`).
- **F7** 13/13 PASS (typecheck, lib and demo builds, 2,241 unit tests in 232 files, 0 failing, every gate) at 25.65; **PR** 6/6 at 17.91; **L1** 6/6 per engine against `fv3` (C 11.45-13.84, Playwright WebKit 10.7-12.8).
- **The digest** (`v2/digest/`): default **36/38, 34/36, 22/24** (P1 and P3 OWNER-BLOCKED on Q-12 and Q-4); ruled **38/38, 36/36, 24/24**, "36 OWNER-BLOCKED cell(s) read on Q-4 (c) / Q-12 (b): 36 PASS, 0 not". 671 cells, 0 NOT-REPRODUCED, 0 with a check NOT-REPRODUCED. **This is the builder's digest and is not of record; the fresh critic's battery scores the pass.**
- B2's strips (`v2/filmstrips/`, four columns, main and both re-runs): by eye, each frame of `warm-expand`, `first-expand`, `swap-long` and `swap-short` shows every seat with ink, and the swap's coming-in label fades up while the going-out one fades down, with no empty slot. Sampled by eye: W·l `warm-expand`, C·l `swap-long`. The critic reads all four columns.

### 5.2 · The A/Bs, bp13 against bp12 alternating

Every A/B read is a queue line with gate ≤ 11 that waits (`scripts/mkq.sh`; logs `v2/q/slot-*.log`). Start loads per column (min-max over the lines `ab`, `cr`, `rev`, `swrev`, `fmab`, `si`): C·l 8.22-11.00, C·d 8.27-12.57, W·l 7.42-11.00, W·d 8.92-11.00. **One read started above 11:** C·d `rev-bp12-r12`, 12.57 at its start line (13:06:14). The gate read ≤ 11 the instant before and the load rose between the check and the log line. It is a bp12 read, it reads 0 stub, and it is kept as read. `r2` read at 8.15-10.97; `r2x` at 10.52-14.46 (gate 10-15). Summaries: `v2/sum/absum.txt` (this seat's `absum.py`) and `v2/sum/csum.txt` (the pass-12 completion critic's `csum.py`, reading only).

| A/B | C·l bp13 / bp12 | C·d bp13 / bp12 | W·l bp13 / bp12 | W·d bp13 / bp12 | rule |
|---|---|---|---|---|---|
| `retarget·40/80/120`, 8 rounds: splice / sliver / stub | 0 / 0 / 0 of 24 · 0 / 0 / 0 of 24 | 0 / 0 / 0 · 0 / 0 / 0 | 0 / 0 / 0 · 0 / 0 / 0 | 0 / 0 / 0 · 0 / 0 / 0 | (a), (b): **do not fire** (bp13 0 splice of 96) |
| `content-remove`, 8 rounds: gaps (ms) | 0 ×8 · 0 ×7, 8.6 | 0 ×7, 8.4 · 0 ×8 | 0 ×7, 15 · 0 ×7, 15 | 0 ×8 · 0 ×8 | (c): **does not fire** (late = gap > 2F + 0.5 = 33.9-34.5; bp13 none late in 32) |
| **`reversal`**: stub reads | **0 of 16** · 1 of 16 | **0 of 16** · 0 of 16 | **0 of 8** · 0 of 8 | **0 of 8** · 0 of 8 | **(d): does not fire** (bp13 0 of 48) |
| `swrev --at 40 --then 0,16,32,64`, 8 rounds: splice / stub | — | — | 2 / 0 of 32 · 3 / **2** of 32 | 2 / 0 of 32 · 4 / 0 of 32 | beside the rows |
| FM `warm-expand` + `first-expand`, 8 rounds: reads with a hole | — | — | 0 of 16 · 0 of 16 | 0 of 16 · 0 of 16 | held (B2) |
| display-frame probe, 3 rounds: runs with an empty frame (least ink) | 0/18 (0.422) · 0/18 (0.422) | 0/18 (0.422) · 0/18 (0.422) | 0/18 (**0.375**) · 0/18 (0.422) | 0/18 (0.399) · 0/18 (0.422) | held |

**Every stub read in the `reversal` A/B** (rule (d)'s reading): one, on bp12, C·l r12 (started 9.26, cell 10.01, `rev/w3rev-chromium-light-bp12-r12.json`): **"n" of a tab button (`button.dock-tab-button.glass-specular-track`), painted 0.30, edge at 886.9 px, +116.7 ms, ramp width 0.24 px.** That is pass 12's stub to the pixel and the millisecond. bp13 reads none in 48.

**The 794 px sibling, read in paint.** bp12's two `swrev` stub reads are W·l, `--then 0` (r1 at 8.65 and r4 at 7.42): **"r" of a tab button, painted 0.21, edge at 793.8 px, ramp width 0.25 px, at +50 and +48 ms**. That is §P11-8's opening-plate-edge sibling, the class §1 traced to the same unramped clip within a touch of the plate's edge. bp13 reads it 0 of 64 across both WebKit themes. §1 could not draw this sibling in 36 trace runs per build; the A/B drew it on the reference arm and not on bp13.

**The `swrev` splice stays the base's, as §2 read it:** bp13 4 of 64 (W·l r3 then 16, r5 then 32; W·d r3 then 32 and then 64), bp12 7 of 64. Every one is `s7|s8`, gap 7.31-8.70 px, advance 9.58 px, at +99-143 ms. It is the two leaving remnants facing each other with ramps to 0 between them, which no rule reads (§2). Placed for the next build (§9).

**Display-frame least ink.** bp13's W·l least ink is 0.375 (`swap-long`, `Tools` at +160 ms, 9.56) and W·d 0.399 (+154 ms, 10.23), against bp12's 0.422 at +74-87 ms. No run has an empty frame (bound 0.1 of rest ink), so it is held. The lower reading falls at a later instant in the coming-in fade (+154-160 ms against +70-87 ms). It is not where the cure acts (the cure changes only alpha within a touch of an edge), but it is a reading the critic should look at in the strips. Placed, §9.

### 5.3 · What is held (§P12c-7.3 item 3)

| hold | reading on bp13 | record |
|---|---|---|
| the window, rule (c) | 0 late in 32; gaps 0 except one in-band step (C·d 8.4, W·l 15) | `cr/`, `sum/absum.txt` |
| the retarget splice, rule (a) | 0 of 96 | `ab/` |
| the B2 gift frame | FM A/B 0 holes in 32; battery FM 0 holes ×4 columns ×3; `fmlow` 36/36; strips clean by eye | `fmab/`, `battery/`, `filmstrips/` |
| the heir (`o.enter`) | `heirprobe.mjs` on `bp13i`, both engines: every tied pair takes `enter` (first-, warm-, end-, vfirst-expand, warm-collapse, swap-long, swap-short, three-long, three-mid) | `heir/` (C at 14.70, W·l at 14.47) |
| `vmorph` collapse, frozen frame | `facingCut` false in 12 of 12 per column (C·l, C·d, W·l, W·d; T 42-62 by 4, 2 runs) | `frz/` (starts C·l 10.98, C·d 13.40, W·l 12.66, W·d 12.40) |
| R2's margin, per column with the seat | below | `r2/`, `r2x/` |
| the boot graph | 503,777 B of 503,808: **31 B margin** (bp12 21 B); no raise | `F7/boot-graph.txt` |

**R2, worst leaving drop per run (bound 0.5), bp13 against bp12 alternating:**

| column | bp13 worst (cell, seat, load) | bp12 worst (cell, seat, load) | thinnest bp13 margin |
|---|---|---|---|
| C·l (`r2`, 2 rounds) | 0.389 (`first-expand`, 8, 10.27) | 0.385 (`swap-long`, 1, 9.39) | 0.111 |
| C·d (`r2`) | 0.372 (`swap-long`, 1, 9.56) | 0.393 (`swap-short`, 3, 8.05) | 0.128 |
| W·l (`r2` + `r2x`, 5 rounds) | **0.497 (`swap-long`, seat 1, `r2x` r3, 11.46)** | 0.488 (`swap-short`, 3, 10.75) | **0.003** |
| W·d (`r2` + `r2x`) | 0.457 (`retarget·120`, 2, `r2x` r2, 16.77 in the cell; start 12.92) | 0.488 (`lead-remove`, 20, 12.76) | 0.043 |

**R2's W·l margin is thinner on bp13 than pass 12's thinnest read: 0.003 against 0.006.** It is one read of five, on `swap-long` seat 1 (pass 12's was seat 2); the other four bp13 W·l reads are 0.438-0.466, and bp12 over its five reads tops at 0.488. The cure acts only on an edge within a touch of the plate's or the box's edge, which is where a leaving seat's last frames sit, so it can move a leaving drop by the alpha it adds there. Five reads do not separate the builds (bp13 0.438-0.497, bp12 0.446-0.488). The row stays PASS and the margin is no row (§P12c-7.5), but §P12c-7.3 item 3 asked the cure not to spend it, and this read cannot show that it did not. Placed for the critic's R2 attack at 10-15 (§9).

**Cost** (Chromium, `--cpu-cores 0`, each start ≤ 15, 3 rounds, `sum/costtab.txt`): frames over 25 ms on the 4× 20/40 rows, bp13 5, bp12 7, fv5 0. Main-thread ms per frame, 4×40 lead: bp13 1.592-1.79, bp12 1.54-1.97, fv5 0.138-0.188. bp13 and bp12 do not separate; floor v5's lead stays about a tenth of B′'s, Q-15 (a)'s price.

---

## 6 · Every red check of every red cell (item 6)

**bp13, battery:**
- CASES `case·rotated`, W·l: **[snap]** in the main run (12.5), re-run 1 (12.35) and re-run 2 (11.6); `case·rotated·control`: **[snap]** in re-run 1 (12.3). No other check is red. Outside the 38; §P12-2's ruling (the landing step on the closing frame meets W-8 as written) and §P12c-2 (bp12 = bp10) stand. This pass ran no bp12 CASES.
- OWNER-BLOCKED cells, each red on **[window]** only (Q-4 (a)) and PASS on Q-4 (c): W3 `warm-collapse`, `warm-expand`, `reversal`, `swap-short`, `anchor-end·warm-expand`, `anchor-end·warm-collapse` (C·l, C·d); W3 `first-expand`, `warm-collapse`, `warm-expand`, `reversal`, `swap-long`, `anchor-end·warm-expand` (W·l) and `reversal`, `swap-long`, `seat-transition` (W·d); W6 `form·expand`, `form·collapse` (C·d), `form·collapse` (C·l). W1 `card·first-expand`, `card·warm-collapse`, `card·warm-expand` (×4) red only on **[card]**, Q-12 (b). Full list: `v2/sum/battery-nonpass.txt`.

**bp13, A/Bs:** none. Every bp13 A/B cell is PASS, or OWNER-BLOCKED on [window] alone with Q-4 (c) PASS: `ab` 96 PASS; `cr` 32 PASS; `rev` 48 OB-window; `r2` 226 PASS + 38 OB-window; `r2x` 177 PASS + 21 OB-window.

**bp12 (the reference arm), A/Bs:**
- C·l `rev` r12, W3 `reversal`: **[window, stub]**, the stub as §5.2.
- W·d `r2` r1 (13.84), W3 `warm-collapse`: **[lanes]**, "1 lane(s) cancelled to identity, the largest `button.dock-icon-button…` clip from 40 px in one frame (previous step 0 px) at 135 ms".
- W·d `r2` r2 (10.56), W3 `swap-short`: **[window, blank]**; window 264 ms > 259.6 (Q-4 (c) 315.4 PASS), blank "2 blank of 27 moving frame(s), longest run 2 (bound 1)" at +22 ms.
- `swrev` W·l r1 and r4, then 0: **[stub]**, the 794 px sibling (§5.2).

The three bp12 W3 reds are single reads of the reference arm in an A/B, not a battery; none is a bp13 reading and none turns a row.

---

## 7 · Fences, incidents, lock waits

- **Entries.** First entry: trace, cure, the v1 draft, F7/PR, the Chromium battery (2026-11-04 19:13 → 2026-11-05). Second entry: resumed 2026-11-06 11:55 after `guarded` crashed at a WebKit slot's start (OSError 28, disk full, 11:50:59); the orphaned `bash -c qslot` (pid 6538) was still in its load gate with no read started and was stopped by process group. **No read ran outside the guard.** That entry hit the usage limit at 14:27 (`FORMATION-PROGRESS.md`, 15:40). Third entry (this one, post-reset, 18:01:47): found the chain (`run13b.sh` 82460 → `chain.sh` 66447 → `guarded --exclusive webkit` 84996, W·d q slot 6) live and admitted, adopted it, ended nothing, and waited on its PID to `RUN13-DONE`. No second battery.
- **WebKit lock waits.** Two passed 90 min and were kept queued, not cancelled: the W·d `wk` slot (queued 20:45:46, admitted after 22:17:38) and W·l q slot 3 (queued 03:26:09, still waiting at 04:56:56). Queue slots ended with exit 75 at their own budget or gate (QHOLD), each re-queued; no admitted slot was ended by stopping its parent.
- **Zone.** No `guarded` refusal on the zone count appears in any slot log of this pass. Nothing under `~/.claude` was read.
- **Git.** The only git writes were `git worktree add` and `git worktree remove`. Arms were staged with `git apply` only, no commit. The checkout's only writes are under `docs/tranches/BL/design/dock/pass-13/`.
- **HEAD.** `git diff --name-only 8b70ba0a9 HEAD -- src demo tests tests-visual package.json docs/design` is empty at `392ff1e3c`, so the patch and every reading describe today's tree.
- **Harness.** 42 OK at the first entry's start, at this entry's start (18:01) and at the chain's end (19:03:40); this seat's own end check is in §8.

---

## 8 · The patch, re-hashed

`pass-13/D2-Bp-p13.patch` **`bb7cb08da92677aa6e4e2c753ce9f901b17f4ddb2051d2f4162ef43e97648121`** (62 files, +2,528 / −2,411), over HEAD + `pass-6/floor-v5.patch` (`cba6bdc2…`). `pass-12/D2-Bp-p12.patch` re-hashed `5318a3dc…`, equal. The worktree entry is removed (`git worktree remove --force`; `git worktree list` no longer shows it). The permission check refused removing its directory, as it did for the p12 and p12c seats. `.claude/worktrees/bl/D2/p13/Bp-build/` remains: about 1.3 GB of build outputs (`out/`, `out2/`), chain stdout files and two scratch `hold-*.ts` files, none of record. It is the owner's chore, beside §P12c-6's.

**Harness at this seat's end:** 42 OK against `pass-8/H8-records/harness.sha256` (2026-11-06 19:07:11, load 13.12). No process of this seat remains.

---

## 9 · Open for the critic (placed, none a row)

| class | reading | for |
|---|---|---|
| R2 W·l `swap-long` seat 1: **0.497, margin 0.003** (one bp13 `r2x` read at 11.46) | thinner than pass 12's 0.006; five reads per build do not separate bp13 (0.438-0.497) from bp12 (0.446-0.488) | the critic's R2 attack at 10-15, alternating, above all W·l `swap-long` seats 1 and 2 |
| display-frame least ink W·l 0.375, W·d 0.399 at +154-160 ms (bp12 0.422) | 0/18 empty frames per column; a later instant of the coming-in fade | the B2 strips by eye; the display-frame probe |
| `swrev` splice `s7\|s8` | bp13 4/64, bp12 7/64; the leaving pair's facing remnants (§2) | the next build; the critic's `swrev` attack in all four columns |
| CASES `case·rotated` W·l [snap] | outside the 38 | as §P12-2 |
| the reversal stub and its 794 px sibling | bp13 0 of 48 `reversal`, 0 of 64 `swrev` stub, 0 of 96 `retarget·*`; bp12 1, 2 and 0 | rule (d) on the critic's A/B; the critic's attacks on `reversal`, `rtrev`, `revst` and every plate-edge cell |
| real Safari | **UNMEASURED (owner's safaridriver checkbox)** | O-103 |
