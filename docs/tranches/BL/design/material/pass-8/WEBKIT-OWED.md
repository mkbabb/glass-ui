# D3 · pass 8 · WEBKIT-OWED: the Playwright WebKit cells pass 7 owed, read on floor v7 and the minor v6

| field | value |
|---|---|
| seat | D3 pass 8, the owed-WebKit seat (`REGISTRY.md` P7-6.2 step 4; P7-5's owed row; `pass-7/D3-critique.md` §8). It reads the three cell groups the pass-7 critic queued and never ran: (a) the planted faults (wk-B), (b) the Close rings under H7-1 on fresh pixels with the checker red's two re-runs (wk-C), and (c) the dark M-2m drift window twice (wk-D). It scores no row and builds no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `7016c2e24` (the minor v6 bank, docs only). `git diff --stat f12349dfa HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing (`WK-run.sh setup` runs it and printed an empty diff at 13:57; its terminal output was not saved to a file, and the command is in the script to re-run), and FV7 and MS6 tie `f12349dfa` back to the critic's `1da7eb17b`. So the base is the published 10.1.0 source |
| trees | `floor-v7.patch` (sha1 `4a1e09c8`) and `minor-split-v6.patch` (sha1 `4ea01c0e`), both `git apply --check` clean at HEAD. Specimen builds by `harness/build.mjs` in the worktree: **floor v7 CSS 391,121 B, sha256 `347288745da7cf97`; minor v6 398,432 B, `e11613c3eeb45cab`; HEAD 394,891 B, `b09b9e73a61b75b1`**. Each equals the banked figure (FV7 §3, MS6 §3), so these are floor v6's and the minor v5's paint bytes, and the cells pass 7 owed on those trees are read here |
| owner rulings | none. `audit/INBOUND.md` still ends at O-98, and `FORMATION-PROGRESS.md` records no ruling on Q-1, Q-3, Q-11, Q-12, Q-13 or Q-14. Nothing here depends on one |
| engines | **Playwright WebKit 26.5** for every capture (`cells.json` `meta.versions.webkit`), each WebKit cell `+shim` (H-14). No Chromium capture ran: `pass-8/wk-plants.mjs` narrows the plant scripts' default engines to WebKit, and every other capture names `--engines webkit`. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `WK-run.sh` (phases `setup`, `builds`, `wk-plants-fv3`, `wk-plants-fv2`, `plants-read`, `wk-rings`, `rings-read`, `wk-drift`, `drift-read`, `teardown`); `WK-run2.sh` (phases written while `wk-drift` ran: `ringplant-read`, `wk-rerun-minor-dark`, `rerun-minor-dark-read`); `wk-plants.mjs`; `WK-records/` (`admissions.log` queue and end times, `phases.log` each phase's start and end with the load, `adm-*.out` each admission's output, `plants/`, `verbose/`, `ringpx-*.log`, `cap-*.log`) |
| fences | No tracked source edited in the checkout. No git write in it beyond `git worktree add` / `remove` for `.claude/worktrees/bl/D3/p8/wk/wt`. Patch swaps happened only in that worktree, each checked by `cmp` against the patch or a clean `git status` at HEAD. Builds and captures lived in `$W/.d3out`. The only writes in the checkout are under `docs/tranches/BL/design/material/pass-8/`. Nothing ran in a sibling repo. **Torn down** 15:42:14-15:42:24: the worktree removed and pruned, `.claude/worktrees/bl/D3/p8/wk/` and the empty `p8/` removed (`ls .claude/worktrees/bl/D3/` prints `p3 p5 p6`), `git worktree list` has no `/p8/wk/` entry, `git status --porcelain -- src demo tests` prints nothing, and no process of this seat is left |
| machine law | Every phase through `~/.claude/guard/guarded` as the literal command word. `setup`, the witness reads and `teardown` under `--light` (no browser); `builds` as a heavy run (vite, no browser). **Each WebKit capture group was its own `guarded --exclusive webkit --timeout 60` admission, queued only after the previous one ended**, and every witness ran `--light` outside the lock. One browser per capture run, which `capture.mjs` closes in its `finally`, with a fresh context per cell. No WebKit process launched more than 46 page loads, below the 60-load relaunch (H3-1), so `navRetired` reads 0 everywhere. `navStalled` 0, crashed cells 0. No GPU launch argument. The kernel-zone refusal never fired. Loads 12.8 to 53.5, mostly from runs outside this seat |

Short citations: `Reg` (`REGISTRY.md`, the Pass 7 part), `Crit` (`pass-7/D3-critique.md`), `FV6` (`pass-7/FLOOR-V6.md`), `MS5` (`pass-7/MINOR-SPLIT-v5.md`), `FV7` (`pass-8/FLOOR-V7.md`), `MS6` (`pass-8/MINOR-SPLIT-v6.md`).

---

## 0 · In brief

- **All three owed groups were read, none owed again.** Each got the WebKit lock inside 90 minutes. The longest wait was 40 min 10 s, for the extra re-run admission (§4).
- **(a) Plants:** all 16 owed WebKit plant readings on floor v7 **equal FV6 §5.4's floor v6 WebKit verdicts line for line**. Every R plant and floor plant that reds in WebKit reds here. `plant-carrierveil` passes in WebKit, as it always has, because WebKit paints no carrier filter.
- **(b) Close rings under H7-1, fresh WebKit pixels:** floor v7 light **3.07** on all 7 grounds and dark **4.30** on all 7, M-3 **PASS 42**, the FV6 battery's values to the digit. The minor v6 light **3.25** on all 7. Its dark rings repeat MS5 §4.1's values to the digit: 4.40 · 2.96 · 3.78 · 4.44 · 2.23 · 1.70 · 2.55, in three captures. HEAD's light rings read 1.01-1.86, and R-14's two real-paint plants red under M-3, at **2.25** (α 0.40) and **2.90** (1 px).
- **The checker red's two re-runs:** floor v7 `floating·ring:well` **2.83** and `overlay·ring:well` **2.96**, identical in both runs and equal to FV6 §5.5. The minor v6 `floating·ring:well` **2.99** twice, equal to MS5. Reproduced at loads 17.7-20.7, against FV6's 7.6-8.1, so **not load-borne**.
- **(c) Dark M-2m drift, twice:** **51 frames over 100.0 s** each time, **43/43 inks ≥ 4.5 in every frame**, worst `popover·muted` **5.41**, the same as FV6's and FV5's WebKit dark window. So the pass-7 critic's one WebKit cell, FAIL 1/173 (17 frames over 32 s), was its guard kill, not paint.
- **No row moves.** WebKit is informational for M-3 and M-2m (gate Chromium), and every reading equals its banked one. Floor v7 stays at FV7's 39/44 pending the critic. **One instrument finding (F-1, §5):** M-3 reads only variant `base`, so on R-14's ring plants, captured under variant labels, it prints 14 of 14 `MISSING` and FAIL. Pass 7's "live M-3" plant column (Crit §2) was that vacuous FAIL. Read under M-3 itself, the plants red in WebKit here.

---

## 1 · Admissions

| group | queued | admitted | waited | ended | load at admission → end |
|---|---|---|---|---|---|
| `wk-plants-fv3` (a) | 13:59:21 | 14:20:37 | 21 min 16 s (three other repos' WebKit runs, then the guard's load gate: "waiting for headroom (load 50 > 36)") | 14:33:35 | 32.5 → 25.9 |
| `wk-plants-fv2` (a) | 14:33:52 | 14:35:21 | 1 min 29 s | 14:40:12 | 34.5 → 24.7 (53.5 at 14:37) |
| `wk-rings` (b) | 14:40:40 | 14:44:07 | 3 min 27 s | 14:51:29 | 19.6 → 19.1 |
| `wk-drift` (c) | 14:51:42 | 14:55:16 | 3 min 34 s | 14:59:19 | 24.2 → 32.2 |
| `wk-rerun-minor-dark` (b, §4) | 15:00:02 | 15:40:12 | **40 min 10 s** (another repo's `all webkit` run held the lock for over 33 min) | 15:41:54 | 17.0 → 24.1 |

Every admission exited 0 inside its 60-min bound (`admissions.log`). The witness reads ran `--light` at 14:40:42 (plants), 14:51:44 (rings), 14:52:37 (ring plants as `base`), 14:59:35 (drift) and 15:42:05 (re-runs), each in under 11 s.

---

## 2 · (a) The planted faults, Playwright WebKit, over floor v7 (`plants/readings.log`)

The pass-7 critic's wk-B list: the R plants and owner variants of `pass-4/FV3-plants.mjs` (`plant-R1..R4`, `var-q1c`, `var-q11b`, `plant-q1c-noroom`) and the floor plants of `pass-3/FV2-plants.mjs` (`plant-bound`, `plant-heldfloor`, `plant-carrierveil`, `plant-darkperim`, `plant-noisolation`), each injected over the one floor v7 specimen build. `wk-plants.mjs` sets `lib.mjs`'s shared `ENGINES` array to `["webkit"]` before the plant script loads, so no variant table is copied (P-3) and no Chromium half re-ran inside the lock. Every capture directory records `engines webkit`, 0 crashed, 0 stalled and 0 relaunches (`plants/capture-meta.txt`; the largest, `var-q1c` with its three retunes, is 46 cells in one process).

| plant | witness, gate Playwright WebKit | floor v7 (here) | floor v6 WebKit (FV6 §5.4) |
|---|---|---|---|
| R-1 `plant-R1` | M-4 dark | FAIL 7/84 | FAIL 7/84 |
| R-2 `plant-R2` | M-9 dark | FAIL 1/10 | FAIL 1/10 |
| R-3 `plant-R3` | O-66 | FAIL 5/6 | FAIL 5/6 |
| R-4 `plant-R4` | O-66 | FAIL 3/3 | FAIL 3/3 |
| `plant-q1c-noroom` | M-6 `--q1 c` dark | FAIL 2/24 | FAIL 2/24 |
| `var-q1c` | M-6 `--q1 c` · `--q1 a` | FAIL 2/96 · PASS 88 | the same |
| `var-q11b` | M-1x `--q11 b` · W-A `--q11 b` · M-1 | PASS 21 · FAIL 13/117 · PASS 11 | the same |
| the bound, `plant-bound` | M-2 ladder, dialog | FAIL 110/298 | FAIL 110/298 |
| FL-7 `plant-heldfloor` | M-2 held | FAIL 20/72 | FAIL 20/72 |
| FL-14 `plant-carrierveil` | M-2 held | PASS 72 (WebKit paints no carrier filter) | PASS 72 |
| FL-15 `plant-darkperim` | M-3 dark | FAIL 47/87 | FAIL 47/87 |
| FL-14 `plant-noisolation` | M-2 held · STACK | FAIL 14/28 · FAIL 8/12 | the same |

`diff` of the WebKit lines of `pass-7/FV6-records/plants/readings.log` against this seat's (`plants/diff-fv6-fv7-webkit.txt`) prints only three deletions: `probe-R2-35`, `var-q11b | W-A-a` and `risk-opaque-ancestor`. These are reads FV6 took that the owed list does not name, so they were not re-read. **Every common line is identical.** The plant reds are expected reds, not red cells to re-run: each now matches a second, independent capture (FV6's at load 11-23, this one at 24.2-53.5). Row 19's WebKit half is read on floor v7, and it agrees with the byte-identical-dist argument Crit §3.4 scored it on.

---

## 3 · (b) The Close rings under H7-1 on fresh Playwright WebKit pixels, and the checker red's re-runs

Dialog scene, both themes, 8 grounds per theme (M-3 gates 7; `deep` is read by the independent reader only), one capture per tree (`cap-*-dlg-webkit.log`, 101 s each). Columns: M-3 under H7-1 (`verbose/m3-*-webkit.txt`), and the pass-7 critic's independent reader `pass-7/crit-ringpx.mjs` (`ringpx-*-webkit.log`: its own reading, the ring's solid composite predicted from paint, and the darkest ring pixel).

| capture (Playwright WebKit) | M-3 Close ring | reader: MINE · SOLID · DARKEST | verdict | banked |
|---|---|---|---|---|
| **floor v7, light**, 7 grounds | **3.07** every ground, worst of three (no full-coverage column), M-3 **PASS 42** | 3.07 · 3.51 (`#888480` over `#fef7f1`) · 3.52 at column 849 | PASS | FV6 battery `verbose/m3-fv6.txt`: 3.07, worst of three, every light ground |
| floor v7, dark, 7 grounds | **4.30** every ground | 4.30 · 5.06 · 5.08 | PASS | FV6: 4.30 |
| **minor v6, light**, 7 grounds | **3.25** every ground, worst of three | 3.25 · 3.73 (α 0.54) · 3.73 | PASS | MS5 §4.1: 3.25 |
| minor v6, dark | 4.40 · **2.96** aurora · 3.78 · 4.44 · **2.23** white · **1.70** checker · **2.55** stripes | the same | dark arm, W-H.2's (below) | MS5 §4.1: the same, to the digit |
| **HEAD, light** (α 0.48 over HEAD's plate) | 1.84 · 1.47 · 1.65 · 1.01 · 1.86 · 1.37 · 1.66; six at a full-coverage column (852, black 854) | 1.84 / 1.89 / 1.88 on paper; each ground within 0.05 of its solid | **FAIL**, as R-14 requires | MS5 §4.1: the same values |
| HEAD, dark | 3.76 · 2.71 · 3.31 · 3.79 · 2.08 · 1.53 · 2.36 | the same | HEAD-FAIL dark arm | MS5: the same |
| **plant: α 0.40 ring** over floor v7 (`crit-variants/ring040.css`), light | **2.25** every ground (read as `base`, §5) | 2.25 · 2.49 · 2.50 | **FAIL** | Chromium (Crit §2): 2.50 at full coverage |
| **plant: 1 px outline** over floor v7 (`ring1px.css`), light | **2.90** every ground (read as `base`, §5) | 2.90 · 3.51 · 3.38 | **FAIL** | Chromium (Crit §2): 2.43 |

**What the WebKit rows show.** In Playwright WebKit the floor's Close ring has no column inside the probe's 852-854 where two band rows agree, so H7-1 falls back to the worst of three. That gives 3.07, below the ring's solid composite (3.51), while the darkest ring pixel at column 849 reads 3.52. Crit §2's note (i) found the same offset in Chromium, where the band does reach 852. So in WebKit, H7-1 reads the ring's anti-aliased edge, never above the solid, and floor v7 still clears 3.0 with 0.07 to spare on every light ground. That margin is H7-1's fallback. The paint itself sits at the solid. Both plants red at the same fallback: R-14's rule ("never loosened where no full-coverage column exists") bites in WebKit as it does in Chromium. HEAD's ring reds at a true full-coverage column on six grounds. No WebKit ring moved against its banked value.

**The minor's dark rings under 3.0** are 10.1.0's dark arm. The minor does not change it, and HEAD reads each lower (2.71, 2.08, 1.53, 2.36 against the minor's 2.96, 2.23, 1.70, 2.55). They are W-H.2's, neither a gate nor a row, and G7 does not count them (MS5 §4.1, Reg P7-3.1). The reader's checker row (MINE 1.70, SOLID 5.08) predicts over the wrong ground pixel for a patterned ground. That is a limit of the reader's prediction, recorded and not a ring reading.

### 3.1 · The checker red, re-run twice (`verbose/m3-rerun-*-webkit{1,2}.txt`)

Light ladder over the checker, one cell per capture (8.5-8.7 s each).

| tree | run 1 (14:51:02, load 20.7) | run 2 (14:51:11, load 18.9) | `diff` of every ring and perimeter row, run 1 vs run 2 | banked |
|---|---|---|---|---|
| floor v7 | `floating·ring:well` **2.83**, `overlay·ring:well` **2.96** (cols 74), 2/16 under 3.0 | the same | exit 0 | FV6 §5.5: 2.83, 2.96, at load 7.6-8.1 |
| minor v6 | `floating·ring:well` **2.99**, 1/16 under 3.0 (run 1 14:51:20, load 17.7) | the same (14:51:29, load 19.1) | exit 0 | MS5 / Reg P7-3.1: 2.99 |

Each M-3 total reads FAIL 39 of 53 (floor) or 38 of 53 (minor). Of those, 37 are `MISSING … not captured` rows for cells a one-cell re-run leaves out, and the rest are the well rings above. **Reproduced at two loads more than twice apart, so not load-borne.** These are straight-run rings (74 columns), which H7-1 does not change. WebKit is informational for M-3. Chromium reads these rows at or above 3.0 (Reg P7-3.1).

---

## 4 · The minor's dark Close-ring reds, re-run twice (`wk-rerun-minor-dark`)

`wk-rings` saw the minor v6's four dark reds once, so they were re-captured twice in their own admission (dialog, dark; 15:41:03 load 12.8 and 15:41:54 load 24.1). **Both runs read 4.40 · 2.96 · 3.78 · 4.44 · 2.23 · 1.70 · 2.55**, the same perimeter values (2.71, 1.95, 2.49), and `diff` against the `wk-rings` dark rows exits 0 for both. Three captures and MS5's two all agree, at loads 12.8 to 25.2. Not load-borne, and W-H.2's (§3).

---

## 5 · F-1: M-3 reads nothing on a variant-labelled capture, and reports it as a FAIL

`capture.mjs --variant ring040` labels every cell `ring040`, and `m3-non-text.mjs` reads only variant `base`. So M-3 on R-14's ring plants prints **`MISSING webkit light paper dialog: not captured` × 14** and `FAIL (14 of 14 gated rows)` (`verbose/m3-fv7-ring040-webkit.txt`, `-ring1px-`). This read nothing, yet it looks like the plant reddening. **The pass-7 critic's own Chromium files are the same:** `crit-records/verbose/m3-fv6-ring040-chromium.txt` and `-ring1px-` each hold 18 lines, 14 `MISSING`, 0 Close-ring rows. So Crit §2's "live M-3 under H7-1" column for the two plants (2.50, 2.43) was not an M-3 reading. Those figures are the critic's independent reader, which did read the pixels (`ringpx-fv6-ring040-chromium.log`).

**Read under M-3 itself here** (`WK-run2.sh ringplant-read`): a copy of each capture with `cells.json` relabelled `base` (FV2/FV3-plants.mjs's own relabel; PNG paths unchanged). M-3 then reads all 7 light grounds: `dialog·ring:close` **2.25** (α 0.40) and **2.90** (1 px), worst of three, 1/3 under 3.0 per ground. The perimeter (3.14) and the well ring (3.31) pass. That is FAIL 14 of 28: the 7 Close rings plus 7 `MISSING` dark cells the light-only plant does not take (`verbose/m3-fv7-*-webkit-asbase.txt`).

**What it changes.** No row. Row 6 closed on R-14 with HEAD's ring reddening in real paint, and HEAD's capture is variant `base`, so M-3 read it (Chromium 1.91, Crit §2; WebKit 1.84, §3). The two plants red under M-3 in WebKit here, and under the critic's reader in Chromium. What it changes is the record: Crit §2's table and Reg P7-1.1's R-14 row ("α 0.40 2.50, 1 px outline 2.43 … all FAIL in real paint") cite M-3 readings that do not exist. The values are the independent reader's.

**Class, for the pass-9 instrument list:** a witness that matches no cell in a capture reports MISSING rows as a gated FAIL, so a plant capture under a variant label reads as a red. By E-2 (no masking), a witness should exit loud when a capture holds no cell of the variant it reads (for example "0 cells of variant base: nothing read", exit 2), not count the absence as a fail. The plant convention already exists (relabel to `base`, as FV2 and FV3 do). `crit-ringpx.mjs`'s plant captures need it too, or the witness needs a `--variant` flag. Fixture: `fv7-ring040-webkit-asbase` reads 7 Close rings. Plant: the unrelabelled capture must exit loud, not FAIL 14/14.

---

## 6 · (c) The dark M-2m drift window, twice (`verbose/m2m-drift-fv7-webkit{1,2}.txt`)

`capture.mjs --engines webkit --themes dark --grounds aurora --scenes ladder --drift` on floor v7: one frame every 2 s for 100 s over the moving c1 field (H3-12), plus the frozen dark aurora ladder cell, whose masks the witness takes. 121.2 s per capture.

| run | captured | frames | M-2m drift, gate Playwright WebKit | load at end |
|---|---|---|---|---|
| 1 | 14:55:16 → 14:57:17 | **51 over 100.0 s** | **43/43 inks ≥ 4.5 in every frame**, worst `popover·muted` **5.41** at 0.0 s | 25.1 24.5 26.9 |
| 2 | 14:57:17 → 14:59:19 | **51 over 100.0 s** | **43/43**, worst `popover·muted` **5.41** at 0.0 s | 32.2 26.4 27.3 |
| banked, floor v6 (FV6 `fv6-witnesses`) and floor v5 | — | 51 over 100.0 s | 43/43, worst `popover·muted` 5.41 | 21.2 / 13.5 |
| the pass-7 critic's cell (Crit §3.2) | wk-A, killed at 90 min | 17 over 32.0 s | FAIL 1/173: "need ≥ 45 over ≥ 95 s" | — |

Each witness run reads FAIL 5 of 48 in total. The 5 are `MISSING (capture with --motion)` for the four motion windows and `MISSING (capture with --drift)` for the light drift window, all outside this group's scope (the light WebKit drift window read 43/43 in the critic's own wk-A, Crit `m2m-webkit.txt:715`). **The critic's WebKit dark M-2m cell was the guard kill.** Read whole, twice, it equals the banked value. M-2m gates on Chromium (PASS 215 dark), and row 18 stands as scored.

---

## 7 · The rows (no change; for the record)

| row | what this seat read | effect |
|---|---|---|
| 6 · M-3 | WebKit Close ring on floor v7: light 3.07, dark 4.30, PASS 42; HEAD's ring and R-14's two plants red in WebKit paint (§3, §5) | none: PASS stands (gate Chromium); WebKit agrees |
| 18 · M-2m | WebKit dark drift window whole, twice, 43/43 (§6) | none: the one WebKit cell Crit §3.2 left was the guard kill |
| 19 · plants | every owed WebKit plant on floor v7 equals FV6's floor v6 verdict (§2) | none: PASS stands, now read on floor v7's own build |
| N-4 · the minor's W-0.1 reading | minor v6 WebKit light Close ring 3.25; checker well 2.99 twice; dark arm reproduced three times (§3, §4) | none: W-0.1 G7's WebKit M-3 half (MS5 §4.1) holds on fresh pixels |

Floor v7 stays at the seat's **39/44** (FV7 §5), pending the pass-8 critic. Open: 3, 9, 23, N-1, N-2, all owner-only. **Nothing owed in Playwright WebKit remains from pass 7.** Every real-Safari cell stays **UNMEASURED (owner's safaridriver checkbox)**.

---

## 8 · Handed on

| to | what |
|---|---|
| the pass-8 critic (step 5) | (1) F-1: Crit §2's and Reg P7-1.1's "M-3" figures for the ring plants are the independent reader's; M-3 itself read them only here, relabelled. (2) Every WebKit reading above equals its banked value, so the thin-build argument (FV7 §3, MS6 §3) holds in WebKit on fresh pixels. (3) `wk-plants.mjs` narrows the plant scripts' engines by mutating `lib.mjs`'s exported `ENGINES` array in-process: check it is an acceptable seam or rule a `--engines` flag on the plant scripts |
| the pass-9 instrument list | F-1's class: a witness reading no cell of its variant should exit loud, not FAIL on MISSING rows (E-2). And a note: in Playwright WebKit the Close ring's full-coverage band sits outside the probe's 852-854, so H7-1 reads WebKit's ring by its worst-of-three fallback (3.07 against a 3.51 solid). This is conservative and not a defect, but the WebKit margin is the fallback's |
| the agglomerate | P7-5's owed WebKit row is **closed**: (a), (b) and (c) read, none owed again. The minor's dark Close rings under 3.0 stay W-H.2's |
| the owner | nothing new. Reg P7-4's sheet is unchanged |

---

## 9 · Reproduce

```sh
P8=docs/tranches/BL/design/material/pass-8
~/.claude/guard/guarded --light --timeout 10 -- bash $P8/WK-run.sh setup
~/.claude/guard/guarded --timeout 30 -- bash $P8/WK-run.sh builds
~/.claude/guard/guarded --exclusive webkit --timeout 60 -- bash $P8/WK-run.sh wk-plants-fv3
~/.claude/guard/guarded --exclusive webkit --timeout 60 -- bash $P8/WK-run.sh wk-plants-fv2
~/.claude/guard/guarded --light --timeout 60 -- bash $P8/WK-run.sh plants-read
~/.claude/guard/guarded --exclusive webkit --timeout 60 -- bash $P8/WK-run.sh wk-rings
~/.claude/guard/guarded --light --timeout 60 -- bash $P8/WK-run.sh rings-read
~/.claude/guard/guarded --light --timeout 10 -- bash $P8/WK-run2.sh ringplant-read
~/.claude/guard/guarded --exclusive webkit --timeout 60 -- bash $P8/WK-run.sh wk-drift
~/.claude/guard/guarded --light --timeout 15 -- bash $P8/WK-run.sh drift-read
~/.claude/guard/guarded --exclusive webkit --timeout 60 -- bash $P8/WK-run2.sh wk-rerun-minor-dark
~/.claude/guard/guarded --light --timeout 10 -- bash $P8/WK-run2.sh rerun-minor-dark-read
~/.claude/guard/guarded --light --timeout 10 -- bash $P8/WK-run.sh teardown
```
