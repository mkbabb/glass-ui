# D4 · pass 9 · RE-MEASURE: D′ v8 under H8, re-run fresh

| field | value |
|---|---|
| seat | D4 pass 9, RE-MEASURE seat (REGISTRY §P8-6, seat 1). This seat authored no D4 seat in any pass. It re-runs pass 8 BUILD's whole battery (`../pass-8/BUILD.md`, its driver `../pass-8/run-b8.sh`) on the same build under the same harness, and reports every number beside pass 8's. It scores no row: the fixed 40-row checklist (§P2-6.3) is the critic's. No row is opened, added, struck or renamed |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `bd396ecfd` (the pass-9 driver). Pass 8 built on `78fc8f3b8`; the commits between them touch `docs/` only (`git diff --stat 78fc8f3b8 HEAD -- . ':!docs'` prints nothing) |
| build | HEAD + `../pass-7/floor-v6.patch` (sha1 **`09e74243`**) + `../pass-8/D4-Dp8.patch` (sha1 **`b5f4ae22`**), each `git apply --check` clean and applied in that order. **`git diff HEAD --binary \| shasum` = `5d08df87ebbe`**, the §P8-6 value, read before measuring (`logs/state.log`) and again before and after the patch check (`logs/patch-check.log`). The C1 declaration (`shape="cell"`, O-103c) rides `../pass-8/routes/D4-Dp8`, unchanged |
| harness | **H8 `4159e027cdcf`, 43 files, unedited** (`lib.mjs` `HARNESS`, printed on every run and in every run JSON) |
| owner | INBOUND O-102b, O-103, O-103c in force: Q-10 (i), C1 a cell in both states, no layout shift; Q-13 D′ (F struck); Q-10 (b)+(i); Q-5 (b) only; Q-15 (a); Q-2 (b); Q-3 (a); O-1 (a). **Q-11 (a) is a DEFAULT**, G stays BLOCK |
| engines | Chromium 149.0.7827.55, Playwright's default headless shell, no `channel`, no GPU arguments. **Playwright WebKit 26.5**, headless. Every WebKit number below is Playwright WebKit. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**; T-8's safaridriver probe printed "You must enable 'Allow remote automation'" (`logs/src-T-8-both.log`) |
| machine | Every build, unit run and browser run went through `~/.claude/guard/guarded --rss-gb 8`. `--light` was used for the engine-free reads, the units and this seat's compare tools only, never for a browser run. One heavy run at a time (`chain-r9.sh`). Both Playwright WebKit holds ran under `--exclusive webkit`, queued and never cancelled. **Hold A** queued 07:22:31 and was admitted 07:39:14 (16 min 43 s, load 11.55). **Hold B** queued 08:00:20 and was admitted 09:34:47: **94 min 27 s, past 90 min.** The wait was held, not cancelled, and the cells it carries were read once it ran. Loads across the run were 5.25-18.15 (the guard's gate is 36). Nothing is left running |
| records | driver `run-r9.sh` (= `../pass-8/run-b8.sh` with only its paths re-pointed: worktree `p9/remeasure9`, logs to `pass-9/logs`; route, probes and patch read from `../pass-8/`), chain `chain-r9.sh`, all 116 logs in `logs/` (the same 116 file names pass 8 wrote; `logs/chain.log` has the stage times and loads), the log compare `compare.mjs` → `compare.txt`, the per-cell digest `digest.mjs` → `digest/cells.txt` (all 84 run JSON, 3,701 lines), the cell-by-cell compare against pass 8's run JSON → `digest/compare-p8.txt`, and the T-6 sort `t6-classify.py` → `digest/t6-moved.txt` |
| fences | No tracked source in the checkout was edited. The only git writes were `worktree add` and `worktree remove`. The only checkout writes are under `docs/tranches/BL/design/tile/pass-9/`. Every plant was restored and checked (`logs/sheet-plants.log`, `logs/plant-builds.log`: `restored: before 5d08df87ebbe after 5d08df87ebbe (equal)`; the unit driver's own restore check passed on every plant run) |

---

## 0 · In brief

- **The same build, the same instrument.** sha1s `09e74243` · `b5f4ae22`, `git diff HEAD` `5d08df87ebbe`, H8 `4159e027cdcf`, 43 files. The patch-check stage reversed D4-Dp8 out, found `src`, `tests`, `demo` and `MIGRATION.md` equal to HEAD + floor v6, and re-applied it clean.
- **Every verdict line pass 8 wrote, pass 9 wrote the same.** `compare.mjs` pairs the 116 logs by name and compares their verdict lines after stripping loads, timestamps, durations, settle waits and paths. 115 are the same. The one difference is `state.log`'s HEAD line (`78fc8f3b8` → `bd396ecfd`, docs-only). No log is missing on either side (`compare.txt`).
- **Cell for cell: 0 verdicts flipped.** `digest.mjs` compares all 84 run JSON (3,617 cells) against pass 8's run JSON (read-only, `.claude/worktrees/bl/D4/p8/build8/out/runs`, the 42 MB directory pass 8's `rm` was refused on). 3,360 cells have identical lines, and 257 hold their verdict while a number in the line moved. 0 flipped, and there is no cell either side lacks. Every tally line is equal (`digest/compare-p8.txt`, first line).
- **The 257 moved lines:** 206 of T-6's 211 differ only by loads, ms timings and frame counts. The other 5 are scale readings ±0.01 on the library and unmigrated arms (HEAD's consumers), with their verdicts held (`digest/t6-moved.txt`). The rest: C1BOX settle waits (12), the kick and spring trace (5), and WebKit 1-LSB fill readings on library and unmigrated arms (T-3 10, T-8 2, W-B 1) and in L3BARE (16). **No moved number is on a cell that decides a row differently.**
- **O-103c's condition holds again:** C1 is 16px and a column in all 6 states. Every option and the group deviate by **0.00 px** across them, in both engines, light, dark and PRT, on `src` and `dist` (C1BOX 6/6 ×4).
- **T-3 C1 migrated, 43/43 in both engines**, with the C1 carrier areas equal to pass 8's to the hundredth of a px².
- **Units:** 67/67 clean. The whole suite ran 2,356 cases: 2,353 passed, 1 skipped, 3 failed, the same 3 HEAD `boot-graph` cases. vue-tsc 0 · 0. **Bundle 2,935,932 B**, byte-equal to pass 8.
- **No janky cell** under the load rule: no gating verdict moved, so no cell needed its two re-runs. The kick moved 0.14 → 0.15 px in Chromium and 0.14 → 0.13 px in Playwright WebKit (B-5, reported, FAIL in both passes, inside the 0.13-0.16 band §P8-4 records).
- **Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

---

## 1 · O-103c's condition: C1 a cell in both states, no layout shift (`../pass-8/probes/c1-box.mjs`)

| build · engine | pass 9: light · dark · PRT | pass 8 | log · load |
|---|---|---|---|
| `dp8-src` · Chromium | cell-both-states PASS · no-shift PASS, max **0.00 px**, each mode | the same | `c1box-dp8-src-chromium.log` · 6.88-10.21 (reads hold) |
| `dp8-dist` · Chromium | PASS · PASS, 0.00 px, each mode | the same | `c1box-dp8-dist-chromium.log` |
| `dp8-src` · Playwright WebKit | PASS · PASS, 0.00 px, each mode (PRT: forced level-0 path) | the same | `c1box-dp8-src-webkit.log` · 7.97-14.15 (hold B) |
| `dp8-dist` · Playwright WebKit | PASS · PASS, 0.00 px, each mode | the same | `c1box-dp8-dist-webkit.log` |

- Options at rest: 184.00×40.94 and 184.00×67.88 ×4; group 192.00×352.44. Pass 8 read the same.
- Each option against its own selected box: 0.00 px for all 5. The options on per state are 0,1,1,1,1,1. Every option is 16px and a column in all 6 states.
- Settle waits were 309-631 ms (pass 8: 308-635), which covers the 450 ms kick. These are the 12 C1BOX "moved" lines, and the boxes in them are identical.

## 2 · The battery (`dp8-src`, route `../pass-8/routes/D4-Dp8`)

Cells read Chromium · Playwright WebKit. Chromium: `battery-src-chromium.log` (one `run.mjs`), at load **7.53-11.83** (pass 8: 9.97-20.93). Playwright WebKit hold A: `src-*-webkit.log`, `src-T-8-both.log`, `dist-*-webkit.log`, `distdev-*-webkit.log`, at load **5.25-12.88** (pass 8: 8.22-15.75).

| witness | pass 9, migrated arm | pass 8 | pass 9, whole witness | pass 8, whole |
|---|---|---|---|---|
| T-1 | **15/15 · 18/18** | 15/15 · 18/18 | 20/42 · 23/45 | the same |
| T-2 `src` · `dist` · `dist-dev` | 52/52 each, both engines | the same | — | — |
| **T-3** | **43/43 · 43/43** | 43/43 · 43/43 | 45/85 · 45/85 | the same |
| T-4 | **24/24 · 24/24** | the same | 36/54 · 36/54 | the same |
| T-5 `src` · `dist` | **38/38 · 38/38** each | the same | 87/116, 88/117 (`dist`), both engines | the same |
| T-6 | **33/33 · 33/33** | the same | 64/88 · 64/88 | the same |
| T-7 | **24/24 · 24/24** | the same | PASS 24/24 both | the same |
| T-8 (one run, both engines) | 27/27 | 27/27 | 27/39 (library 0/12), 13 unmeasured | the same |
| W-D | 8/8 · 8/8 | the same | — | — |
| W-A · W-B · W-C · W-E | library arms 5/9 · 9/25 · 0/8 · 1/3, both engines | the same | — | — |
| W-E `dist` · `dist-dev` | 1/6 · 1/6, both engines | the same | — | — |

**T-3, C1 selected** (carrier ≥ 3:1 against the 251 px² bar, the option 184×67; from `digest/cells.txt`, `dp8-src/T-3-*.json`):

| mode | pass 9 Chromium | pass 8 Chromium | pass 9 Playwright WebKit | pass 8 Playwright WebKit |
|---|---|---|---|---|
| light | **933.50 px²** (band 873.75) · fill 1.28:1 | 933.50 (873.75) · 1.28:1 | **932.00 px²** (871.00) · 1.28:1 | 932.00 (871.00) |
| dark | **946.50 px²** (883.50) · fill 1.30:1 | 946.50 (883.50) · 1.30:1 | **942.25 px²** (879.75) · 1.30:1 | 942.25 (879.75) |
| PRT | **937.75 px²** (877.25) · fill 1.28:1 | 937.75 (877.25) · 1.28:1 | **934.50 px²** (873.50), forced level-0 path | 934.50 (873.50) |
| forced (info) | 11,821.75 px² | 11,821.75 | 376.00 px² | 376.00 |

The fill-alone lines are reported, not gating. **T-4 C1:** the ring is whole at 2.00 px on every side, `sel=none` and `sel=1`, light, dark and forced, in both engines. **T-5 C1:** `radiogroup`/`radio`, 1 tab stop, and ArrowRight, ArrowLeft, ArrowDown and ArrowUp each move and check. All of these lines are identical to pass 8's.

## 3 · FACT, SHEET, CANON, ATTACK, CORNER, REPORT, XSCRIPT

Chromium: reads hold, admitted 07:18:12, load **6.88-10.21** (pass 8: 15.75-19.34). Playwright WebKit: hold B, admitted 09:34:47, load **7.97-14.15**, exit 09:39:49 (pass 8: 8.05-9.51).

| witness | pass 9 | pass 8 |
|---|---|---|
| FACT `src` · `src-dev` · `dist` | **80/80 each, both engines** | 80/80 each, both engines |
| FACT on the B-1 plants `foreign`, `var` | 76/80 · 76/80, both engines | the same |
| SHEET self-test | 10/10 OK | 10/10 OK |
| SHEET `writers` · `wrap` | PASS (the route's rule 1×) · PASS `MIGRATION.md:94-116` | the same |
| SHEET on the plants `foreign`, `var`, `static`, `ts` | FAIL ×4 (1/2 each); restore equal | the same |
| CANON clean · plants | 4/4 · `a` 3, `s` 3, `h` 3, `layer` 2, `foreign` 3, `unlayered` 3, `cq` 3; controls `lowlayer` 4, `cqoff` 4, both engines | the same |
| ATTACK `src-dev` · `dist` | 5/5 · 3/3, both engines | the same |
| CORNER `src` · `dist` | 5/5 · 5/5, both engines | the same |
| REPORT `name-ink` · `kick-spring` | PASS light and dark · PASS, ζ ≈ 0.50, both engines | the same |
| REPORT kick (B-5, reported) | FAIL **0.15 px** (Chromium, 104 frames, peak 1.0277) · **0.13 px** (Playwright WebKit, 79 frames, peak 1.0275); want ≤ 0.05 | 0.14 · 0.14 |
| REPORT `mark` | UNMEASURED (Q-3 (a): no mark) | the same |
| R-5 dark selected ink (reported) | 1.56:1 against unselected, the perimeter carrying the state | 1.56:1 |
| H7's B-3 probe (info) | the same lines as pass 8, light and dark, both engines (`probe-b3-*.log`) | — |
| XSCRIPT self · pair with pass 7's D′ | 19/19 · 19/19 | 19/19 · 19/19 |

## 4 · L-3's witnesses

**Units** (`logs/unit-plant-*.log`, through `unit.mjs`, load 9.66-11.02):

| run | want | pass 9 | pass 8 |
|---|---|---|---|
| clean (the two route test files) | PASS | **PASS 67/67** | 67/67 |
| `crit-var-writer`, `crit-static-style`, `crit-ts-ternary`, `crit-foreign-writer` (L-1) | FAIL | FAIL, 1/2 each (the floor v6 sheet-wide case) | the same |
| `ctl-reads` (L-1 control) | PASS | PASS 2/2 | the same |
| `l3-pin-gone` · `l3-reset-gone` | FAIL | FAIL 0/2 · 0/2 | the same |
| `l3-tint-loose` · `l3-library-writer` | FAIL | FAIL 1/2 · 1/2 | the same |

**Paint** (`../pass-8/probes/l3-bare.mjs`):

| build | pass 9 Chromium | pass 9 Playwright WebKit | pass 8 |
|---|---|---|---|
| `l3-src` (fixture) | **12/12** | **12/12** | 12/12 · 12/12 |
| `l3-dist` (the installed library) | 12/12 | 12/12 | 12/12 · 12/12 |
| `l3-plant-on-item-src` | 8/12 (bare-pill, bare-tile FAIL, light and dark) | 8/12, the same cells | 8/12 · 8/12 |
| `l3-unpinned-src` | 10/12 (item-write FAILs, light and dark) | 10/12, the same cells | 10/12 · 10/12 |

The fills read as pass 8's: bare-pill 1.00:1 at corner 0px, bare-tile 1.01:1 at 16px, and the ref control 1.20-1.31:1. The 16 L3BARE moved lines are Playwright WebKit sampled colours a single 8-bit step apart (for example `#e7e4df` → `#e7e4e0`), with every ratio within 0.01 and every verdict held.

## 5 · Units, types, bundle, builds

| read | pass 9 | pass 8 | log · load |
|---|---|---|---|
| vue-tsc (app · test) | **0 · 0** | 0 · 0 | `tsc.log` · 15.06 → 12.83 |
| units, whole suite (2 workers via `unit.mjs`) | 2,356 ran: 2,353 passed, 1 skipped, 3 failed (HEAD's `gate:boot-graph` build-arm cases, no `dist-demo` in a worktree) | the same, the same 3 | `unit-all.log` · 10.03 → 9.90 |
| bundle (unpacked, `npm pack --dry-run`) | **2,935,932 B**, 844 files; `dist` 2,542,357 B in 840 files; JS gzip-9 329,772 B; datum 2,919,057 | the same, byte for byte | `bundle.log` · 11.02 |
| builds (`dp8` src, src-dev, dist, dist-dev; attack src, src-dev, dist; L-3 src, dist, plant-on-item; plants foreign, var, unpinned) | all exit 0 | the same | `build-*.log`, `plant-builds.log` · 12.83 → 10.03 |
| lib build | exit 0 | exit 0 | `libbuild.log` · 15.68 → 15.06 |

Q-14 (the datum rebind) is unchanged and stays the owner's at release.

---

## 6 · For the critic and the agglomerator

- **The re-measure reproduces pass 8.** It used the same patch bytes, the same diff hash, the same H8 and the same 116 stages, and it read 0 verdict flips over 3,617 cells, with every tally equal. It ran at lower Chromium load than pass 8 (7.53-11.83 against 9.97-20.93) and at a similar WebKit load. No defect was seen only under load, and none needed the NOT-REPRODUCED label.
- **New coverage or record items: none from this seat.** Pass 9 measures the build and does not attack it. §P8-4's landing list (L-1a, L-4, the `l3-bare` fold into FACT) is unchanged, and nothing here touches it.
- **Reported, unchanged:** B-5's kick at 0.13-0.15 px; R-5's dark ink at 1.56:1 on K2.
- **Hold B's queue passed 90 min** (94 min 27 s) behind other sessions' WebKit runs. It was waited out, not cancelled, so every WebKit read cell is measured.
- **Scratch:** the worktree `.claude/worktrees/bl/D4/p9/remeasure9/wt` and its `out/` and `base-fv6/` are removed with this seat's return. Pass 8's `build8/` directory was read only for the cell compare and is left as it was, the orchestrator's or the owner's to delete (§P8-5).

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell. E-4 is read against the Playwright WebKit run of record (O-103).
