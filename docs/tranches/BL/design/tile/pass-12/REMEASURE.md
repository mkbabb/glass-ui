# D4 · pass 12 · RE-MEASURE: D′ v9 under H9, re-run and paired against three references

| field | value |
|---|---|
| seat | D4 pass 12, RE-MEASURE seat (REGISTRY §P11-5 (1)). It authored no D4 seat in any pass. It re-runs pass-10 BUILD's order as `pass-11/run-r11.sh` did, pairs every run-JSON cell and log against pass-10 BUILD, the pass-10 critic and the pass-11 re-measure, and reports flips. It scores no row: the 40-row checklist is the critic's |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree at HEAD `9f57537a4`. `git diff --stat fdea480e7 HEAD -- . ':!docs'` is empty, both at the start and at the end (by then the checkout's HEAD was `8acb7e0b0`, other seats' docs commits; `logs/final-state.log`). So this seat measured the library that BUILD (`fdea480e7`), the pass-10 critic and both pass-11 seats measured |
| the build | `pass-7/floor-v6.patch` sha1 **`09e742439213dc15b4b05aba5de4508caba34427`** + `pass-10/D4-Dp10.patch` sha1 **`538b034c754bce9263019b2ac1f4fba1852bd11a`**, both `git apply --check` clean. Post-apply **`git diff HEAD --binary \| shasum` = `80ab066d67f89cca14b2eaeb901ac7871cb8f75d`**, `shape.ts` **`9455d073…`**, `_shared/guard.ts` **`53c233af…`**, the same as §P11-5. Each was checked before measuring (`logs/state.log`, `logs/patch-check.log`: D4-Dp10 reversed, `src`, `tests`, `demo` and `MIGRATION.md` equal to HEAD + floor v6, re-applied, state equal before and after). It was checked again before and after every plant (`logs/plant-builds.log`, `logs/sheet-lane-plants.log`, each `restore: equal`) and at the end: `STATE git diff HEAD 80ab066d67f8 · status 9a89e9747069 · new files guard.ts 53c233af, shape.ts 9455d073 · harness H9 932637d53662` (`logs/final-state.log`). That status hash is also pass 11's |
| harness | **H9 `932637d53662`, 45 files, unedited.** It is printed on every log line, and `git status -- …/tile/harness` was empty at the end |
| engines | Chromium (Playwright's default headless shell, no GPU arguments) and **Playwright WebKit**. Every WebKit run was inside `guarded --exclusive webkit`. Playwright WebKit is not Safari. **Real Safari: UNMEASURED (owner's safaridriver checkbox)**. T-8's real-Safari cell is unmeasured, as in every pass (`logs/src-T-8-both.log`) |
| machine | Every build, unit run and browser run went through `guarded --rss-gb 8`. `--light` was used only for engine-free reads (SHEET, vue-tsc, bundle, XSCRIPT, the pairing). Serial: one heavy run at a time. The load is printed beside every stage in `logs/chain.log` and on every log line |
| records (all here, `pass-12/`) | driver `run-r12.sh`, chain `chain-r12.sh`, pairing output `pair.txt` (tool: `../pass-11/pair.mjs`, unedited) and every differing line in `pair-dump.tsv`, `logs/` (170 logs), `frames/` (16 frames + `pair.json`), this seat's run JSONs `run-json.tgz` (238 files) |

Short citations: `RM11` is `../pass-11/REMEASURE.md`, `B10` is `../pass-10/BUILD.md`. The references are `b10` (`../pass-11/b10-run-json.tgz`, logs `../pass-10/logs`), `c10` (`../pass-10/D4-Dp10-crit/run-json.tgz`, logs `../pass-10/D4-Dp10-crit/logs`) and `r11` (`../pass-11/run-json.tgz`, logs `../pass-11/logs`). "A · B" means Chromium · Playwright WebKit.

---

## 0 · In brief

1. **0 cell flips and 0 log verdict flips against all three references, in both engines.** `pair.mjs` paired **195 run-JSON files and 8,437 cells** against each of `b10`, `c10` and `r11`. Against each it found **0 pass flips and 0 signature mismatches**. It also paired **134 logs** against each on their verdict lines and found **0 verdict flips**. Every other difference is numeric drift in non-gating text: the load printed inside a line, timings, settle waits, frame counts, 1-unit hex channels and hundredths of a px (§3).
2. **One file-level difference, and it is against `r11` only.** Unit `clean` read **68/68** here, at load 9.63 (`logs/unit-plant-clean.log`). That equals BUILD and the pass-10 critic. It differs from the pass-11 chain's **67/68** at load 34.25, which REGISTRY §P11-1 already ruled NOT-REPRODUCED and §P11-3 traced to L-8 (the canon case's 5,000 ms timeout under load). This run closes that reading on the side of the build. Every unit stage ran below load 20 (§2).
3. **L-5 holds in both engines, on `src` and `dist`.** T-4 migrated reads **42/42 · 42/42** on each build. The `weight-step` plant reads **30/42 · 30/42**: its 12 failing cells are exactly the 390×844 cells in light, dark and PRT, by click and by keys. The log reads `max 21.00 px`, group `192.00×1129.00 → 192.00×1150.00`, and «Awaiting a reply from the» goes 1 → 2 lines. The Playwright WebKit plant log equals pass 11's line for line, load masked.
4. **O-103c's condition holds.** T-3 migrated reads **43/43 · 43/43**. C1 reads 932.00 / 942.25 / 934.50 px² in Playwright WebKit (light / dark / PRT) against the bar 251, and Chromium's C1 cells are byte-identical to all three references. C1BOX reads **6/6** on `src` and `dist` in both engines, with rest vs selected **0.00 px** in all 12 states. CRIT-C1 reads **24/24 · 18/18 + 6 UNMEASURED** (WebKit has no Layout Instability API).
5. **Re-read (b) is hash-equal to pass 11's.** In PILL-WIDTH's four logs the info lines hash equal to pass 11's (which hashed equal to BUILD's). D′ v9 reads 0.00 px in every scene. The planted 600 reads +1.20 / +1.00 / +1.27 px in Chromium and +1.20 / +1.00 / +1.28 px in Playwright WebKit (`single` / `pill-icon` / `pill-badge`), and 0.00 for `vertical`.
6. **Nothing this seat found opens, adds, strikes or renames a row.** No new coverage or record item was found. Real Safari: UNMEASURED (owner's safaridriver checkbox).

---

## 1 · The run

`chain-r12.sh` is `../pass-11/chain-r11.sh` re-pointed at `run-r12.sh`. `run-r12.sh` is `../pass-11/run-r11.sh` with its first header line replaced and three lines changed: `W` (this seat's scratch, `.claude/worktrees/bl/D4/p12/remeasure12`), `L` (`pass-12/logs`) and the film's `--dest` (`pass-12/frames`). `diff ../pass-11/run-r11.sh run-r12.sh` shows nothing else. Every plant text, probe and route (`../pass-10/routes/D4-Dp10`) is pass 10's.

The chain ran pass 11's stage order in two calls, so the unit stages would start below load 20 (§P11-5). Call 1: `state` through `sheet-lane-plants`. Call 2: `unit` through `webkit-c`. The resume-only `rebuild-verify` is omitted, as in pass 11. Neither driver was edited while it ran. Nothing was re-run, because no reading differed from pass 11's except the one §0.2 explains, and that one came out on the reference side at low load.

| stage | window (10-29) | load at start → end (1-min) |
|---|---|---|
| state · patch · SHEET self-test | 07:34:45-07:34:57 | 15.43 → 16.47 |
| libbuild · vue-tsc · builds (7) · SHEET on clean builds | 07:34:57-07:35:52 | 16.47 → 22.03 |
| plant builds (10) | 07:35:52-07:37:37 | 22.03 → 11.81 |
| sheet-lane-plants | 07:37:37-07:37:50 | 11.81 → 14.64 |
| unit (whole suite) | 07:38:11-07:39:10 | **12.03** → 9.63 |
| unit-plants (37) | 07:39:10-07:41:10 | **9.63** → 14.22 |
| bundle · XSCRIPT | 07:41:10-07:41:31 | 14.22 → 17.07 |
| Chromium battery | 07:41:31-08:05:34 | 17.07 → 5.88 (witness starts 8.50-17.17) |
| Chromium reads (H, probes) | 08:05:34-08:34:34 | 5.88 → 11.48 |
| Chromium film | 08:34:34-08:34:59 | 11.48 → 11.86 |
| **webkit-a** | queued 08:34:59, admitted 08:44:10 (**9 min 11 s** on the lock), done 09:11:06 | 7.14 → 3.84 |
| **webkit-b** | queued 09:11:06, admitted 09:18:47 (**7 min 41 s**), done 09:43:23 | 4.82 → 6.42 |
| **webkit-c** | queued 09:43:23, admitted 09:46:00 (**2 min 37 s**), done 09:54:00 | 7.54 → 8.83 |
| `CHAIN-DONE` · end-state check · pairing | 09:54:00-09:56 | 8.83 → 8.59 |

The machine was lighter than in pass 11 (whose stages ran at load 15-59). That is why the builds took seconds, not hours: pass 11's build windows were mostly queueing for headroom. No WebKit hold was cancelled, and none waited past 90 min. H3-1's routine browser recycle at the 60-navigation cap printed in the same six WebKit logs as in pass 11 (`src-T-1`, `src-T-3`, `src-T-4`, `src-T-6`, `dist-t4-ring-whole`, `t4-weight-step`). There was no disconnect, no stall and no harness error.

## 2 · Engine-free and build stages

| stage | pass 12 | pass 11 (`RM11` §2) | BUILD / critic |
|---|---|---|---|
| vue-tsc | app 0 · test 0 | the same | the same |
| SHEET self-test | 14/14 OK; the one textual difference is the worktree path in `sh-stale`'s message | the same | the same |
| SHEET on `dp10-src`, `dp10-atk-src` | PASS 2/2 each; log equal to pass 11's | the same | the same |
| SHEET on the 10 plant builds and the 3 lane plants | every verdict, `writers` line and `restore: equal` line equal to pass 11's (`plant-builds.log`, `sheet-lane-plants.log`) | the same | the same |
| plant-build CSS | `esc` and `foreign` both `index-BPE_KCL5.css`, as `B10` §3 | the same | the same |
| units, whole suite (load 12.03) | 2,357 ran: 2,354 passed, 3 failed (HEAD's `gate:boot-graph` build-arm cases), 1 skipped | the same | the same |
| unit plants (37, hold at load 9.63-14.22) | 36 equal to pass 11 verdict for verdict; **`clean` 68/68** | 36 the same; `clean` 67/68 in the chain (load 34.25), 68/68 · 68/68 on re-run | `clean` 68/68 |
| bundle (unpacked) | **2,935,947 B**, 844 files; dist 2,542,341 B in 840 files; js-gz9 329,772 B | the same | the same |
| XSCRIPT self · pair p8 · pair p7 | 19/19 · 19/19 · 19/19 | the same | the same |

## 3 · The pairing

`../pass-11/pair.mjs`, unedited, ran over this seat's run JSONs and logs with the three references in one call (`pair.txt`; every differing line in `pair-dump.tsv`):

```
node ../pass-11/pair.mjs --runs mine=<out>,b10=<b10>,c10=<c10>,r11=<r11> \
  --logs mine=logs,b10=../pass-10/logs,c10=../pass-10/D4-Dp10-crit/logs,r11=../pass-11/logs --dump pair-dump.tsv
```

| | vs `b10` (BUILD) | vs `c10` (critic, pass 10) | vs `r11` (re-measure, pass 11) |
|---|---|---|---|
| run-JSON files paired · missing | 195 · 0 | 195 · 0 | 195 · 0 |
| cells paired | 8,437 | 8,437 | 8,437 |
| **cell pass flips** | **0** | **0** | **0** |
| signature mismatches | 0 | 0 | 0 |
| cell lines byte-identical | 8,171 | 8,168 | 8,162 |
| cell lines differing (numeric drift) | 266 | 269 | 275 |
| top-level differences | 0 | 0 | 1: `runs/unit/plant-clean.json`, mine 68/68 PASS, `r11` 67/68 FAIL (§0.2) |
| logs paired on verdict lines | 134: 119 identical, 15 drift | 134: 119 identical, 15 drift | 134: 118 identical, 16 drift |
| **log verdict flips** | **0** | **0** | **0** |
| unpaired log lines | 2 (T-6 WebKit) | 0 | 2 (`unit-plant-clean`) |

`runs/sheet/SHEET-wt_*.json` is skipped, as in pass 11: every SHEET read of a route writes that one file name. SHEET pairs on its logs, and those are identical.

**The unpaired lines.**
- **vs `b10`:** two library-arm T-6 WebKit lines, `card hover scale` and `card press`. They FAIL in both seats. They stay unpaired only because the masking leaves part of the printed load in the skeleton (mine `/ 14.82 / 12.27`, BUILD's `/ 24.94 / 22.46`). They are library-arm and not gating, so they are no flip.
- **vs `r11`:** the two `UNIT` lines of `unit-plant-clean.log`, whose skeletons differ because one names a failing case (§0.2).

**Where the drift lives** (largest |Δ| over the numbers in a differing cell line; the numbers include the load the harness prints in each line):

| file | lines differing (b10 · c10 · r11) | largest Δ (b10 · c10 · r11) | what moves |
|---|---|---|---|
| T-6 Chromium | 106 · 106 · 106 | 20.00 · 55.00 · 35.99 | the pop's peak time and paint-moved windows in ms, frame counts, and the printed load. Migrated T-6 reads 33/33 in both engines, as in every reference. The WebKit T-6 run started at load 19.36 |
| T-6 Playwright WebKit | 106 · 105 · 106 | 22.89 · 17.83 · 45.22 | the same |
| C1BOX (4 files) | 3 each | 47-64 | the settle waits in ms. Every box is 0.00 px in all 12 states |
| REPORT | 2 · 3 · 3 (A); 1 · 2 · 3 (B) | ≤ 12.30 (A); ≤ 2.00 (B) | the kick's frame count (79 · 104 here) and its push: **0.16 px · 0.13 px** (BUILD 0.17 · 0.13; the pass-10 critic 0.16 · 0.14; pass 11 0.15 · 0.15). B-5 is reported and floor-owned, and its want ≤ 0.05 fails in every pass |
| T-3 Playwright WebKit | 10 · 10 · 14 | 1.00 | p95 contrast and 1-unit hex channels on `preset-*` cells. C1's three cells hold 932.00 / 942.25 / 934.50 px² |
| FACT Playwright WebKit (10 files) | 1-5 each | ≤ 0.01 | 1-unit hex channels on fill readings; every ratio equal to the hundredth |
| T-8, W-B Playwright WebKit | 2 · 2 | 0.01 | the same |

Every other run JSON, Chromium and Playwright WebKit alike, is byte-identical line for line to every reference. That covers T-1, T-2, T-4 (including all 18 L-5 cells on `src` and `dist`, and the `weight-step` plant), T-5, T-7, W-A, W-C..W-E, CANON, ATTACK, CORNER, CRIT-C1, the self-test and XSCRIPT. The carried tone probe (12/12 · 12/12) and the carried ink probe hash equal to pass 11's with load and timing masked. The ink probe reads `preset` 2.66:1 light and **1.56:1 dark** (R-5, reported), and `strip` 3.23:1 · 2.06:1.

## 4 · The battery, both engines

| witness | pass 12, A · B | all three references |
|---|---|---|
| T-1 migrated | 15/15 · 18/18 (whole 20/42 · 23/45) | the same |
| T-2 `src` · `dist` · `dist-dev` | 52/52 each, both engines | the same |
| T-3 migrated | **43/43 · 43/43** (whole 45/85 · 45/85) | the same |
| **T-4** migrated `src` · `dist` | **42/42 · 42/42**, both engines (whole 54/72) | the same |
| T-5 migrated `src` · `dist` | 38/38 · 38/38, both engines (whole 87/116 · `dist` 88/117) | the same |
| T-6 migrated | 33/33 · 33/33 (whole 64/88) | the same |
| T-7 migrated | 24/24 · 24/24 (unmigrated 4/33) | the same |
| T-8 (one run) | migrated **27/27**; 27/39, 13 unmeasured: 12 library pill T-1 cells, and the real-Safari cell **UNMEASURED (owner's safaridriver checkbox)** | the same |
| W-A · W-B · W-C · W-D · W-E | 5/9 · 9/25 · 0/8 · 8/8 · 1/3, both engines; W-E `dist`, `dist-dev` 1/6 | the same |
| FACT `src` · `src-dev` · `dist` | **92/92** each, both engines | the same |
| FACT plants `foreign` `var` `esc` `apply` `concat` · `unpinned` · `--l3 on-item` | 88/92 each · 90/92 · 88/92, both engines | the same |
| CANON clean · `a` `s` `h` `layer` `foreign` `unlayered` `cq` `lowlayer` `cqoff` | 4/4 · 3, 3, 3, 2, 3, 3, 3, 4, 4 of 4, both engines | the same |
| ATTACK `src-dev` · `dist` | 5/5 · 3/3, both engines | the same |
| CORNER `src` · `dist` | 5/5 · 5/5, both engines | the same |
| REPORT | 3/4, 1 unmeasured (the V2 mark, Q-3), both engines; kick 0.16 · 0.13 px | 3/4; kick within 0.13-0.17 |
| C1BOX `src` · `dist` | 6/6 · 6/6, both engines; options at rest 184.00×40.94, 184.00×67.88 ×4, group 192.00×352.44; rest vs selected 0.00 px | the same |
| CRIT-C1 `src` · `dist` | 24/24 · 18/18 + 6 UNMEASURED (no Layout Instability API in Playwright WebKit) | the same |
| T-4 / FACT fixture self-test | 20 OK per engine | the same |

**L-5, read cell by cell** (`logs/t4-weight-step-{chromium,webkit}.log`). On D′ v9 the 18 L-5 cells PASS in both engines on `src` and on `dist`. On the `weight-step` plant, migrated reads 30/42 in both engines. The 12 FAIL lines are `c1-ladder-migrated` and the falsifier at 390×844, 4 each in light, dark and PRT, by click and by keys. They read `max 21.00 px (group 192.00×1129.00 → 192.00×1150.00, option 11 selected) · RE-WRAP 1: option 11 «Awaiting a reply from the» 1 → 2 lines`. The 1440 cells PASS on the plant, as in every reference.

**Re-read (b), PILL-WIDTH** (info only. Each run prints "FAIL · 0/0" because the probe has no gating cell; that banner is not a reading):

| scene (light = dark) | D′ v9 A · B | planted 600 A · B |
|---|---|---|
| `single` | 0.00 · 0.00 px | +1.20 («Elastic» 60.03 → 61.23) · +1.20 (60.05 → 61.25) |
| `pill-icon` | 0.00 · 0.00 | +1.00 (92.27 → 93.27) · +1.00 (92.28 → 93.28) |
| `pill-badge` | 0.00 · 0.00 | +1.27 (100.80 → 102.06) · +1.28 (100.91 → 102.19) |
| `vertical` | 0.00 · 0.00 | 0.00 · 0.00 (fixed 56.00) |

**Re-read (a), frames.** These are `frames/single-{light,dark}-{fine,coarse}-{chromium,webkit}-pair.jpg` (rows `d9` and `w600`), and `c1` and `preset`, light and dark, fine, in both engines: 16 frames and `pair.json`. This seat records them and makes no ruling: G on a pill row is the critic's to read.

## 5 · What this seat leaves the critic and agglomeration

- **No flip on any H9 cell or log verdict, in either engine, against BUILD, the pass-10 critic or the pass-11 re-measure.** The one file-level difference, against `r11` only, is pass 11's own NOT-REPRODUCED `clean` 67/68. Here, at load 9.63, it reads 68/68, BUILD's reading.
- **No row** opened, added, struck or renamed. L-5 stays a cell in T-4's fold. No new coverage or record item was found, so nothing is routed to the landing list. L-8 was not exercised: every unit stage ran below load 15.
- Real Safari: **UNMEASURED (owner's safaridriver checkbox)**. E-4 is read against the Playwright WebKit run of record (O-103).

## 6 · Machine, fences and scratch

- Every stage ran through `guarded --rss-gb 8`, serially. `--light` was used only for engine-free reads, and every Playwright WebKit run sat inside `--exclusive webkit`. The three WebKit holds queued 9 min 11 s, 7 min 41 s and 2 min 37 s, and none was cancelled. Browsers were Playwright's default headless shell with no GPU arguments, one browser per run, closed by the harness.
- The writes in the checkout are `docs/tranches/BL/design/tile/pass-12/` only. The harness is unedited, and no tracked source was edited. The only git writes were `git worktree add` and `git worktree remove`. Nothing under `~/.claude` was read; `guarded` was only invoked.
- The worktree and the scratch directory `.claude/worktrees/bl/D4/p12/remeasure12/` were removed before return (§7).
- Nothing this seat started is still running. The chain ended `CHAIN-DONE` at 09:54:00.
- To reproduce the pairing, extract `run-json.tgz`, `../pass-11/b10-run-json.tgz`, `../pass-10/D4-Dp10-crit/run-json.tgz` and `../pass-11/run-json.tgz` into four empty directories, then run the command in §3.

## 7 · Teardown

`git worktree remove --force …/p12/remeasure12/wt` exited 0, and `git worktree list` no longer shows it. `rm -rf .claude/worktrees/bl/D4/p12/remeasure12` (5.8 GB: builds, run outputs, the extracted references and `base-fv6`) exited 0, and the directory is gone. The then-empty `p12/` was removed with `rmdir`. This seat leaves no housekeeping. Every number above rests on a file under `docs/tranches/BL/design/tile/pass-12/` or on the reference files it names.
