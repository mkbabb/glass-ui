# D2-B′ critique, pass 8: the handoff holds in both engines

| field | value |
|---|---|
| seat | D2 pass 8, fresh adversarial CRITIC of D2-B′. Authored nothing in D2 · model `claude-opus-5-5`, asserted from own system identity · one entry, 2026-10-29 09:45 → 12:20 |
| base | HEAD `8acb7e0b0`. `git diff --name-only 38f68098f HEAD -- src demo tests package.json docs/design` is empty, so this is the prototype's tree. Builds in the seat worktree: `bp8` = HEAD + `pass-6/floor-v5.patch` (`cba6bdc2…`) + `pass-8/D2-Bp-proto.patch` (**`b1ea7d86e23a83ea0770898ee1b0500a27baf5b6517d9003ce4d95653a8d4320`**, re-hashed, equal to the prototype's); `bp7` = floor v5 + `pass-7/D2-Bp-proto.patch` (`184a9715…`); `fv5` = floor v5; `fv3` = HEAD + `pass-4/floor-v3.patch` (`637d1625…`, L1's reference). Every patch applied clean (`records/apply.log`, `scripts/build.sh`). No floor v6, no merge into the base |
| harness | H8 as landed. The per-file sha256 list of `harness/` equals `pass-8/H8-records/harness.sha256` line for line, and that list hashes to **`9d12810b…`, H8's hash**. Adapter `pass-3/adapter-floor-v2.mjs` |
| owner rulings | O-103: Q-4 (c), Q-12 (b), Q-18 (a), Q-15 (a). **The ruled digest is the score of record**, with the default beside it. O-87 and O-88 bind |
| engines | Chromium (Playwright's default headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| records | `pass-8/D2-Bp-crit-records/`: `apply.log`, `build-*.log`, `chain.log` (every stage with its load), `battery/` (stage logs, re-runs, `json/` incl. `fmlow-*/admit.json`, `slots.log`), `fm-reads.txt` (every FM read), `digest/{cells,rows,table,counts}-p8crit[-ruled].*`, `filmstrips/` (all 108 bp8 strips), `si/` (display-frame probe, bp8 vs bp7), `si-variants/` (the probe on three other morph geometries), `ab-content-add/`, `heirlog-chromium.log`, `cost/`, `F7-bp8/`, `PR-bp8/`, `bp7-bp8-useDockScene.diff`, `scripts/` |

Short citations: `B′-proto` is `pass-8/D2-Bp-proto.md`; `H8` is `pass-8/H8.md`.

---

## 0 · Verdict

| digest | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| **ruled (O-103), B2 read on the strips too: the score of record** | **38/38** | **36/36** | **24/24** | — |
| default | 36/38 | 34/36 | 22/24 | P1 (OB, Q-12), P3 (OB, Q-4); 0 red cells under either |
| H8 baseline, bp7 (H8 §3.2) | 37/38 | 35/36 | 23/24 | B2 |

**CLEAN on the 38. The prototype's obligation 1 is upheld in both engines.** Over 108 FM reads of the six B2 cells (four battery columns × three runs, plus H8-2's low-load stage, both WebKit themes) no slot shows a hole frame at all: 0 hole frames, not merely no run over one. H8-1's four columns read PASS with 0 hole runs, so there is no tile difference to report. The display-frame probe reads 0 empty frames in 72 of 72 bp8 runs, against 25 of 72 bp7 runs with 1-5, in the same guarded runs. The strips assemble "H P 2 3" → "H P(fading) 2 3" → "H 1 2 3" with the slot never empty, and a WebKit paint hold now holds a frame with ink in it (§2).

The whole re-measure ran at load 5.9-17.4. That is the cleanest machine any B′ seat has had, and it removes the question the prototype's score of record raised: its battery ran at 30-52 and read 33/38, and it rebuilt the WebKit columns from a separate low-load slot. This seat ran every column in one battery at load ≤ 17.4. It reads 38/38 ruled with only two NOT-REPRODUCED cells inside the 38, both known borderlines (§1).

What the attack found, none of it a row:
- **The content-add [stub] is not the patch's.** The patch is inert in that sequence: an instrumented bp8 arms no heir and takes no gift on `content-add` (§3.2). The stub recurs at the opening plate's edge, 2 reads in this seat's 28 bp8 `content-add` reads and 0 in 10 bp7 reads. That difference is within chance (the chance both stubs land on bp8 under no difference is 0.54). This overturns B′-proto §6's "the patch owns it".
- **The handoff is gated on one side.** `arm()` takes the heir only when nothing arrives on the leaving unit's far side (`de > 0 ? undefined : heir`). In that geometry the pass-7 path, and its empty frame, returns. No harness geometry reaches it: three other morph geometries read 0 on bp8 (§3.3). The header's "The handoff." paragraph states the law without that condition (§4, obligation 4).
- **R2's WebKit margin is the thinnest yet:** 0.075 (W·d `first-expand`, the heir's cut, seat 8, 0.425). It is inside the bound.
- **Cost:** in this session bp8 and bp7 read 6 and 6 frames over 25 ms across the four 4× rows. The 4×20 expand row reads 1 against 0, as the prototype's read 3 against 1 (§5).

**Clean-pass count after this pass: 1 of 2**, if the agglomeration agrees.

---

## 1 · How this seat ran

| step | start → end | load (start / cells) |
|---|---|---|
| builds `fv3`, `fv5`, `bp7`, `bp8` (guarded) | 09:46 → 09:47 | 10.5-15.8 |
| cost, `bp8` → `bp7` → `fv5` × 3, `--cpu-cores 0`, each started at ≤ 15 | 09:48 → 09:57 | cells 5.55-12.24 |
| PR (`--light`, source), F7 | 09:57 → 09:59 | 8.97 / 10.46 |
| battery · Chromium · light | 09:59 → 10:09 | 9.94 / FM 10.51-12.73 |
| battery · Chromium · dark | 10:09 → 10:20 | 6.52 / FM 5.89-8.17 |
| battery · Playwright WebKit · light (`--exclusive webkit`) | 10:20 → 10:31 | 8.56 / FM 7.98-12.56 |
| battery · Playwright WebKit · dark | 10:31 → 10:42 | 6.70 / FM 7.24-11.73 |
| `fmlow` light (H8-2) | queued 10:42 at 7.88 → **admitted at 7.51**, read | cells 7.79-10.27 |
| `fmlow` dark | queued 10:44 at 10.28 → **admitted at 10.28**, read | cells 10.12-11.73 |
| slot probe, Chromium light / dark; WebKit light / dark (a 48-min lock wait for dark) | 10:45 → 11:41 | 7.5-15.9 |
| slot probe on morph variants; content-add A/B (both engines) | 11:41 → 12:02 | 7.4-17.4 |
| instrumented heir log (Chromium) | 12:05 | — |

Every run went through `~/.claude/guard/guarded`, one heavy run at a time. Browser runs were never `--light`. Every Playwright WebKit run used `--exclusive webkit`, queued and never cancelled. No slot split. No WebKit page close: each FM, probe or A/B run opens one browser and a fresh context per cell or sequence, far under the 60-load restart. No zone refusal.

**Red cells** (each re-run twice in its slot):

| cell | column | main | re-run 1 | re-run 2 | digest |
|---|---|---|---|---|---|
| W3 `lead-remove` [terminal 0.97 px after 0.44, bound 0.79] | C·d | FAIL (16.6) | PASS 0.66 (10.28) | PASS 0.88 (11.04) | NOT-REPRODUCED (P3, R1). The class recorded in pass 7 (C·d 0.95 px) |
| CASES `case·rotated` [jerk] | C·l, W·l | FAIL (13.65; 7.36) | PASS | PASS | NOT-REPRODUCED, outside the 38 |
| FM `film·content-add` [stub 1] | W·d | PASS (main) | PASS | FAIL (9.01) | PASS by H7-3 (§3.2) |

---

## 2 · B2: obligation 1 under attack

### 2.1 · H7-1 read as a class (H8-1), per column

`fm-reads.txt`, from every FM log; `digest/cells-p8crit-ruled.json`, cell `film·hole·column`.

| column | reads (six B2 cells × main, re-run 1, re-run 2 [+ low r1-r3]) | hole frames | runs over 1 | H8-1 | load |
|---|---|---:|---:|---|---|
| C·l | 18 | 0 | 0 | **PASS** | 10.51-12.73 |
| C·d | 18 | 0 | 0 | **PASS** | 5.89-8.17 |
| W·l (battery + `fmlow`, admitted at 7.51) | 36 | 0 | 0 | **PASS** | 7.79-12.56 |
| W·d (battery + `fmlow`, admitted at 10.28) | 36 | 0 | 0 | **PASS** | 7.24-11.73 |

**No hole run exists, so there is no tile difference to report** (H8-1 reports one per run). The H8 baseline on bp7 read 2 held runs per WebKit column at 14.15-17.71, plus single-frame holes in 8 of its 18 low-load reads. bp8 reads none of either. The pass-7 class (seat 2's slot, +80-160 ms) is gone at cast resolution in both engines and both themes, including both low-load slots. Stub: 0 in every read but the one `content-add` W·d re-run 2 (§3.2).

### 2.2 · The strips, read by eye

All 108 strips are under `filmstrips/`. These were read at the exchange slot:

| strip | reading |
|---|---|
| W·l `first-expand`, main (11.85) | "H P 2 3 \| Play S" → "H 1(faint) 2 3 \| Play Settings Sq" → "H 1 2 3 …". The slot holds P until 1 has ink |
| W·d `warm-expand`, re-run 1 | "H P 2 3" → "H P(fading) 2 3 \| Play Settings" → "H 1 2 3 \| … Squar". No empty tile |
| W·d `first-expand`, `fmlow` r2 | "H P 2" → "H P 2 3 \| Play" → "H P(fading) 2 3 …" → "H 1 2 3". No empty tile |
| W·l `warm-collapse`, re-run 2 | "H 1 2 3 \| Play :" held for **two** tiles (a WebKit paint hold) → "H 1(fading) 2 3" → "H P 2" → "H P". The hold shows a full run: the WebKit hold is still there, and it now has nothing empty to hold |
| C·l `first-expand`, main | "H P 2 3" → "H P(fading) 2 3 \| Play Settings" → "H 1 2 3 \| … Squar" → rest |
| W·d `content-add`, re-run 2 (the stub read) | "… Square ˅ Brush" cut hard at the opening plate's edge for two tiles, then "Brushes and l…" → whole. Not the exchange slot (§3.2) |

**B2 on the strips: PASS in all four columns.** Partial glyphs remain only at the plate's own moving edge or under the one-advance ramp, as passes 6-7 ruled. This seat's strip read and H8-1 give one answer (P-3).

### 2.3 · The display-frame probe (`si/`, target 0)

This is `scripts/slotink-crit.mjs`, the prototype's `slotink.mjs` with its HOLE rule unchanged, plus three readings:
- `minInk`: the least ink any interior slot reads while both neighbours read ≥ 0.9.
- frames below 0.3 / 0.5.
- the largest one-frame rise.

bp8 and bp7 alternate per run inside one guarded run per engine and theme, three runs each (`si/summary.txt`).

| column | bp8 longest empty run, every sequence × 3 | bp8 `minInk` at the exchange (first-/warm-expand) | bp7 longest empty run: first-expand · warm-expand · others | load |
|---|---|---|---|---|
| C·l | **0** (18/18) | 0.323-0.458 | 1,2,1 · 2,5,2 · 0 | 8.3-11.1 |
| C·d | **0** (18/18) | 0.288-0.472 | 2,2,1 · 4,3,2 · `swap-long` 2,0,0 | 7.5-9.1 |
| W·l | **0** (18/18) | 0.302-0.471 | 3,1,1 · 1,1,1 · 0 | 12.9-15.9 |
| W·d | **0** (18/18) | 0.275-0.499 | 1,2,2 · 1,1,1 · 0 | 7.8-10.9 |

**Target met: 0 empty display frames in 72 of 72 bp8 runs.** bp7 reads at least one in 25 of 72, on every `first-expand` and `warm-expand` run. At the exchange the combined ink of the place never falls below 0.275 on bp8 (bp7: 0.000-0.053).

The handoff is not a hard step. The largest one-frame rise of the exchange slot's ink is 0.50-0.72 on bp8 against 0.50-0.85 on bp7 (`si/rise-slot1.txt`).

### 2.4 · Keyed to the motion, no constant tuned to the cast

Read from `bp7-bp8-useDockScene.diff`, the exact diff between the two built trees. It is 133 lines, and it is not the prototype's `vs-p7-useDockScene.diff`, which is an earlier stage of the work: it uses `pace` and `place`, where the tree of record uses `heir` and `w / 2`.
- **The cut is the leaving unit's own `sliver()` test.** It fires on the frame its fronts leave less than a seam.
- **The gift is that frame's visible span.** The heir's reveal edge is clamped to it on the same frame (`min(eased, g0 − box.lo)`). Nothing is timed.
- **The halving (`x.d / 2`) is geometric.** Two fronts close on one middle, each covering half the width that one front would.
- **The only numerals the patch adds are 0, 1, 2 and the half.** `0.05` and `REVEAL_GAIN` were already there. No harness id or cell name appears in the added lines (grep over the `+` lines: no hit).

**No constant is tuned to the cast. The pass-5 `LEAD_DROP` lesson is respected.**

### 2.5 · R6 and R2 under the cure

- **R6:** splice 0, sliver 0 and stub 0 in every W3 cell ×4 columns (the digest R6 row: 40/40 per theme, 46/46 default with FM stub). The FM stub is 0 except the one `content-add` read (§3.2).
- **R2**, the worst one-frame leaving drop beyond the closing edge (bound 0.5), per column, main and re-runs (from `battery/*-W3-*.log`):

| column | worst | cell (load) | margin |
|---|---:|---|---:|
| C·l | 0.378 | `swap-short` (8.52) | **0.122** |
| C·d | 0.369 | `retarget·80` (9.84) | **0.131** |
| W·l | 0.412 | `warm-collapse` (8.40) | **0.088** |
| W·d | 0.425 | `first-expand`, seat 8 (the leaving "P", the heir's cut) at +215 ms (8.54) | **0.075** |

**R2 holds in every column.** The WebKit margin 0.075 is the thinnest any seat has recorded on B′ (pass-7 critic 0.115; B′-proto 0.075-0.089, so the two seats agree). It is the heir path's own cut: P keeps its middle ink to its last frame, so the drop at the cut is larger than pass 7's. It is inside the bound at low load. Under the prototype's load 38-46, two WebKit reads went over it, with `lanes` (B′-proto §1.3). This seat did not reproduce that at ≤ 17.4. It is recorded for pass 9's re-measure, not a row.

---

## 3 · The attack, by finding

### 3.1 · Every pass-7 row is kept (obligation 2)

Chromium B2: 0 runs over 1, in fact 0 hole frames. Also kept: the mask ramp (narrowest ramp across a glyph 7.71-9.14 px against 2 px), no opacity write (the diff adds none), R8 9/9 and 7/7, C1-C9 ×4, PR 6/6, L1 6/6 (`fv3` reference). See §4.

### 3.2 · The `content-add` [stub] is not the patch's

The prototype placed it on the patch (B′-proto §6: "If it holds, the patch owns it"). Three tests disagree:
- **Code.** In `content-add` nothing leaves, and the heir path needs a leaving unit with a centred arrival. This seat built `bp8i`, the bp8 tree with two console lines, one at `x.heir = h` when an heir is armed and one at `gift.set` (built then restored, `cmp`-equal to the bp8 tree). It logged each of the six sequences (`heirlog-chromium.log`):
  - `content-add`: **heir armed 0, gift taken 0**.
  - `first-expand`: 1 / 3. `warm-collapse`: 1 / 3. `warm-expand`: 1 / 2. `swap-long`: 1 / 2. `swap-short`: 1 / 3.

  With no heir, every changed line reduces to bp7's (`min(x, ∞) = x`; `d = x.d`).
- **A/B.** `content-add` alone, bp8 and bp7 alternating, five runs each, dark (`ab-content-add/`):
  - Chromium (load 7.86-10.05): bp8 0/5, bp7 0/5.
  - Playwright WebKit (14.27-17.41): bp8 1/5 (r5, "B" 70 %, 0.24 px edge at 970.8 px), bp7 0/5.
- **The class.** Every stub read across both seats is the first glyph of the arriving "Brushes and layers" seat, at 968-983 px, 24-45 ms after the trigger, cut by the opening plate's edge: B′-proto C·l (34.06) and W·d low (7.19); this seat's W·d battery re-run 2 (9.01) and the WebKit A/B r5 (14.64). On bp8 this seat reads 2 of 28 `content-add` reads (battery 12, `fmlow` 6, A/B 10), against 0 of 10 bp7 A/B reads. Under no difference, the chance that both stubs land on the bp8 side is C(28,2)/C(38,2) = 0.54.

**Reading:** a pre-existing, intermittent hard cut of the arriving label at the opening plate's edge in the first 1-2 cast frames, mostly Playwright WebKit. It is not the handoff's. By the rule of record (H7-3 per cell for `stub`) it reads PASS here and NOT-REPRODUCED in the prototype, so B2 and R6 stand. **Placed (no row):** the agglomeration should weigh whether `stub`, like `hole` under H8-1, is read as a class per column in the next harness revision. The same P-3 argument applies: one slot, one offset and one picture across seats.

### 3.3 · The handoff's reach: one-sided, and the header says more

- **Gated on one side.** `arm()` sets `h = de > 0 ? undefined : heir`. The heir always counts on the start side (its offset is within `TOUCH_PX`), so the gate reads "no unit arrives on the leaving unit's far side". When one does, the leaving unit takes pass 7's path, with its lead and its structural empty frame. **No harness geometry reaches that case.** The probe on three existing morph variants, first-expand and warm-expand × 3 per build, alternating (`si-variants/`, Chromium 13.7-15.8, WebKit 7.4-9.2):

| variant | bp8 longest empty run | bp8 `minInk` | bp7 longest empty run |
|---|---|---|---|
| `anchor=end` (right-anchored) | **0** ×12 | 0.275-0.499 | 1-4 |
| `neighbour=1` (in flow beside a neighbour) | **0** ×12 | 0.306-0.475 | 1-4 |
| `wide=1` (a wide collapsed face) | 9-14 | 0 | 9-14, equal |

  `wide=1` is the probe's own limit, not a hole. The wide leaving face's glyph spans slots 1 and 2, and the probe credits its ink to the slot holding the glyph's centre (slot 2 reads 1.50, clamped, while slot 1 reads 0). bp8 and bp7 read alike. The paint witness for that geometry, W3 `wide·collapsed-rest` [faces], passes in all four columns.

  **Reading:** the cure generalizes beyond the cast's one geometry (right-anchored, in flow). The far-side case is unmeasured, and it is excluded by code. It is not a row.
- **Prose.** The header's "The handoff." paragraph says "Where a unit comes in on the very place a unit leaves (centred on it) … Every frame of the exchange shows one of the two on that place". It does not carry the far-side condition, which the `arm()` comment does carry ("and nothing on its far side"). That claims a little more than the code makes true (obligation 4: "says what the cure makes true, no more"). The fix is one clause. PR 6/6 and B3 are not affected; recorded for the landing or the next build.

---

## 4 · The 38 rows (ruled; default beside it)

From `digest/table-p8crit[-ruled].md`, `rows-p8crit[-ruled].md`, `counts-p8crit[-ruled].md`: **671 cells**. Ruled: 644 PASS, 0 FAIL, 3 NOT-REPRODUCED (one inside the 38), 12 UNMEASURED (W8 `consumer·*`: the value.js fence and headed real-GPU runs, as every pass), 12 RECORD. 41 OWNER-BLOCKED cells read PASS on the ruled branches. P = PASS, NR = NOT-REPRODUCED.

| row | C·l | C·d | W·l | W·d | ruled | default | note |
|---|---|---|---|---|---|---|---|
| P1 | P | P | P | P | **PASS** | OWNER-BLOCKED (Q-12) | 42/42 per theme; Q-12 (b) |
| P2, P4, P5 | P | P | P | P | PASS ×3 | PASS ×3 | |
| P3 | P | P (NR 1) | P | P | **PASS** | OWNER-BLOCKED (Q-4) | every OB cell `window` alone, (c) holds; NR = C·d `lead-remove` [terminal] |
| F1-F6 | P | P | P | P | PASS ×6 | PASS ×6 | F6 0 crashes (163 + 151 browser cells) |
| F7 | source | | | | PASS | PASS | **13/13** (load 10.46): typecheck, lib + demo builds, 232 files / 2,241 tests / 0 failing (the menu file passes), ten gates. Boot graph **503,629 B against 503,808 B, margin 179 B**, measured by this seat from `dist-demo/index.html` (`F7-bp8/boot-graph.txt`), scene chunk 21,325 B |
| N1-N5 | P | P | P | P | PASS ×5 | PASS ×5 | N3's `seat-transition` borderline did not appear |
| R1 | P | P (NR 1) | P | P | PASS | PASS | |
| R2 | P | P | P | P | PASS | PASS | margins 0.122 / 0.131 / 0.088 / 0.075 (§2.5) |
| R3-R5, R7, R8 | P | P | P | P | PASS ×5 | PASS ×5 | ST 5/5 per column, no UNMEASURED |
| R6 | P | P | P | P | PASS | PASS | splice 0, sliver 0 |
| B1, B3 | P | P | P | P | PASS ×2 | PASS ×2 | PR 6/6, `prose·harness` 0 |
| **B2** | **P** | **P** | **P** | **P** | **PASS** | PASS | H8-1 0 hole runs ×4 (0 hole frames in 108 reads); the strips (§2.2); stub per H7-3 |
| C1-C9 | P | P | P | P | PASS ×9 | PASS ×9 | C8 10/10, C9 52 px |
| L1 | P | | P | | PASS | PASS | 6/6, against `fv3` |

**Counts:** ruled **38/38, 36/36, 24/24**; default **36/38, 34/36, 22/24** (P1, P3 OWNER-BLOCKED, both closed by O-103).

**The arm set** is identical by construction (H6-10, H7-3, H8-2):
- Light: main (W3 with faces, ST, R5, CF, L1, FM, W2, CASES) + rest (W1, W4-W8, R6).
- Dark: dark (ST, FM, W1, W3, W2, R5, CF) + darkrest (W4-W8, R6).
- Each runs in both engines, with FM's six B2 cells × 3 per run.
- `fmlow` per WebKit theme, three runs of the six B2 cells.
- Source: F7, PR.
- L1's reference: `fv3`.

**This seat reads no row PASS against its own instrument.** Every row verdict is the H8 digest's. The strip read agrees with it. The probe, A/B and heir log are readings that enter no row.

---

## 5 · Cost (obligation 3, the §P7-7.3 method; not a row under Q-15 (a))

The run: `pass-2/D2-Bp-probes.mjs --arm pcost,plead`, Chromium traced, `bp8` → `bp7` → `fv5` × 3 in one session. Each run was guarded with `--cpu-cores 0` and started at a 1-minute load ≤ 15; the cells read 5.55-12.24 (`cost/summary.txt`). Each entry is frames over 25 ms / worst frame ms (load).

| row | bp8 r1 · r2 · r3 | bp7 r1 · r2 · r3 | fv5 r1 · r2 · r3 |
|---|---|---|---|
| 4× expand, 20 seats | 0/23.3 (11.16) · 0/18.0 (6.18) · **1/29.2** (9.22) | 0/22.3 (8.16) · 0/18.1 (9.61) · 0/22.1 (9.5) | 0/10.2 · 0/13.3 · 0/14.3 |
| 4× expand, 40 seats | 1/48.4 (11.16) · 1/29.5 (6.18) · 1/29.2 (9.85) | 1/28.3 · 1/31.5 · 1/30.1 | 0/16.9 · 0/16.3 · 0/15.8 |
| 4× lead, 20 seats | 0/24.0 · 0/16.2 · 0/21.7 | 0/23.3 · 0/22.0 · 0/19.7 | 0/16.6 · 0/11.4 · 0/15.4 |
| 4× lead, 40 seats | 1/27.4 · 1/30.0 · 0/24.1 | 1/33.0 · 1/31.3 · 1/29.9 | 0/14.6 · 0/11.8 · 0/9.8 |
| **sum over the four rows** | **6** | **6** | 0 |
| main-thread ms per frame, 4×20 expand | 0.873-1.064 | 0.874-1.138 | 1.55-1.73 |

**Reading.**
- The two B′ builds read alike at matched load: 6 against 6, and per-frame main-thread time is equal within 0.1 ms on every row.
- Read row by row, the obligation is met on three rows (4×40 lead 2 against 3) and short by one frame on 4×20 expand: one bp8 run at 29.2 ms, against bp7's worst of 22.3.
- The prototype's session read that same row 3 against 1. Two independent sessions lean the same way on that one row (bp8 4 of 6 runs over 25 ms, bp7 1 of 6). The trigger frame's worst sits at the threshold in both builds (bp8 18.0-31.8, bp7 18.1-25.2).
- **Recorded:** not a row (Q-15 (a): a stall delays and never leaps; R4 and R8 pass ×4). If pass 9 re-reads cost, the 4×20 expand trigger frame is the cell to read.
- **Boot graph: under its ceiling, margin 179 B** (pass 7: 419 B; the handoff costs 240 B in the scene chunk). No raise, no split. Obligation 3's boot-graph clause is MET with a thin margin, stated.

---

## 6 · Obligations (REGISTRY §P7-7.3)

| # | obligation | status | evidence |
|---|---|---|---|
| 1 | No empty display frame at the exchange; keyed to the leaving front; R6 and R2 held, R2's margin reported; probe target 0 | **MET**, both engines, both themes, low-load stage included | H8-1 0 runs ×4 and 0 hole frames in 108 reads (§2.1); the strips (§2.2); probe 0 in 72/72 (§2.3); no tuned constant (§2.4); R6 0, R2 margins 0.075-0.131 (§2.5) |
| 2 | Keep every pass-7 row | **MET** | 38/38 ruled (§4) |
| 3 | Boot graph under its ceiling with a margin; cost at matched load | boot graph **MET** (179 B). Cost: 6 vs 6 overall; **short by one frame on 4×20 expand** in this session, as in the prototype's. Not a row | §5 |
| 4 | No harness id in `src/`; the header states only what the cure makes true | harness ids **MET** (PR 6/6, `prose·harness` 0; grep clean). The header **overstates by one clause**: the handoff is gated on "nothing arrives on the far side", and the header does not say so | §3.3 |

**Seat verdict: ADVANCE, clean on the 38 (38/38 ruled). The pass counts as clean pass 1 of 2 if the agglomeration agrees.** The open items are records for pass 9 and the landing, none of them rows:
- the one-clause header correction;
- the far-side case, unmeasured;
- R2's 0.075 WebKit margin;
- the 4×20 expand trigger frame;
- the `content-add` opening-edge stub as a pre-existing class.

---

## 7 · Defect classes seen, for placing (no row minted)

| class | where | note |
|---|---|---|
| `content-add` [stub]: "B"/"s" of the arriving label hard-cut at the opening plate's edge, 24-45 ms | §3.2; B′-proto §6 | not the patch's (the heir log: 0 heirs, 0 gifts; A/B within chance). Pre-existing, mostly Playwright WebKit. Per H7-3: PASS. Candidate for a class read like H8-1's |
| the handoff gated off when a unit also arrives on the far side | §3.3; `arm()` | unmeasured; no harness geometry reaches it; the old empty frame returns there by construction |
| header "The handoff." omits that gate | §3.3 | obligation 4, one clause |
| the prototype's `vs-p7-useDockScene.diff` is an earlier stage, not the tree of record | §2.4 | records drift; `bp7-bp8-useDockScene.diff` here is the exact diff |
| R2 WebKit margin 0.075 (the heir's own cut) | §2.5 | inside the bound at low load; over it in two B′-proto reads at load 38-46 with `lanes` |
| 4×20 expand trigger frame, bp8 over 25 ms more often than bp7 (two sessions) | §5 | not a row; totals equal |
| boot-graph margin 179 B | §5 | stated |
| C·d W3 `lead-remove` [terminal] 0.97 px at 16.6 | §1 | NOT-REPRODUCED (both re-runs PASS), the pass-7 class |
| CASES `case·rotated` [jerk] | §1 | NOT-REPRODUCED, outside the 38 |
| the slot probe misattributes a wide leaving face's ink (`wide=1`) | §3.3 | instrument limit, equal on bp7 and bp8; the paint witness passes |
| a WebKit paint hold of two cast tiles (W·l `warm-collapse` re-run 2) | §2.2 | still present in WebKit; harmless now, because the held frame has ink |
| real Safari | everywhere | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted. Safari cells read against this guarded Playwright WebKit run |

**Fences, as kept.**
- **Builds and browser runs** used the seat worktree `.claude/worktrees/bl/D2/p8/Bp-crit/wt` (detached at HEAD, `node_modules` symlinked; the checkout has no `tests-visual/node_modules`). Outputs went to `…/Bp-crit/out`.
- **The instrumentation** went into the worktree's copy of `useDockScene.ts` only. That copy was restored and `cmp`-checked equal to the bp8 tree before the worktree was used again.
- **Git writes:** `worktree add` and `worktree remove --force` only.
- **Writes to the checkout:** this file and `D2-Bp-crit-records/`.
- **Nothing under `~/.claude` was read.** No browser MCP; no headed, GPU-arg or real-Safari run. Sibling repos were not touched.
- **No process of this seat remains.** The two chains running at return are other seats'.
- **The worktree is removed** (`git worktree remove --force`; `git worktree list` shows no `Bp-crit` entry).
- **Owner's chore:** the permission system refused `rm -rf` on the seat directory, as it did for earlier seats. Delete `.claude/worktrees/bl/D2/p8/Bp-crit/` (469 MB: `out/` build outputs, `diffwork/` two reference copies of one file, `useDockScene.bp8.ts`). No record reads it; every artifact cited above is under `pass-8/`.
