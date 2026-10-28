# D4 · pass 11 · RE-MEASURE: D′ v9 under H9, re-run and paired

| field | value |
|---|---|
| seat | D4 pass 11, RE-MEASURE seat (REGISTRY §P10-6 (1)). It authored no D4 seat in any pass. It re-runs pass-10 BUILD's order, pairs every log and run-JSON cell against BUILD's and the pass-10 critic's, and reports flips. It scores no row: the 40-row checklist is the critic's |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `7910eb836`. `git diff --stat fdea480e7 HEAD -- . ':!docs'` is empty, so this seat measured the library BUILD (at `fdea480e7`) and the critic (at `ecd4232b8`) measured |
| the build | `pass-7/floor-v6.patch` sha1 **`09e742439213dc15b4b05aba5de4508caba34427`** + `pass-10/D4-Dp10.patch` sha1 **`538b034c754bce9263019b2ac1f4fba1852bd11a`**, both `git apply --check` clean. Post-apply **`git diff HEAD --binary \| shasum` = `80ab066d67f89cca14b2eaeb901ac7871cb8f75d`**, `shape.ts` **`9455d073…`**, `_shared/guard.ts` **`53c233af…`**. All three equal §P10-6's. They were read before measuring (`logs/state.log`, `logs/patch-check.log`), before and after every plant (`logs/plant-builds.log`, `logs/sheet-lane-plants.log`, the unit-plant restores), and at the end (`STATE git diff HEAD 80ab066d67f8 · status 9a89e9747069`, `logs/unit-plant-clean-rerun2.log`) |
| harness | **H9 `932637d53662`, 45 files, unedited.** It is printed on every log line, and `git status` shows no change under `harness/` |
| engines | Chromium 149.0.7827.55, Playwright's default headless shell, no GPU arguments. Playwright WebKit, every run inside `guarded --exclusive webkit`. Playwright WebKit is not Safari. **Real Safari: UNMEASURED (owner's safaridriver checkbox)**. safaridriver answered "You must enable 'Allow remote automation'" (`logs/src-T-8-both.log`) |
| machine | Every build, unit run and browser run went through `guarded --rss-gb 8`. `--light` was used only for engine-free reads (SHEET, vue-tsc, bundle, XSCRIPT). Serial: one heavy run at a time. The load is printed beside every stage in `logs/chain.log` and on every log line |
| records (all here, `pass-11/`) | driver `run-r11.sh`, chain `chain-r11.sh`, re-run `rerun-r11.sh`, pairing tool `pair.mjs` with its output `pair.txt` and every differing line in `pair-dump.tsv`, `logs/` (172 logs), `frames/`, this seat's run JSONs `run-json.tgz`, BUILD's run JSONs `b10-run-json.tgz` (copied from its scratch, which BUILD did not archive) |

Short citations: `B10` is `../pass-10/BUILD.md`, `D′c10` is `../pass-10/D4-Dp10-critique.md`, `crit/` is `../pass-10/D4-Dp10-crit/`. "A · B" means Chromium · Playwright WebKit.

---

## 0 · In brief

1. **Every pass-10 number reproduced, in both engines. 0 cell flips.** On the run JSONs, `pair.mjs` paired 195 files and 8,437 cells against BUILD and against the critic, and found 0 pass flips and 0 signature mismatches. On the logs it paired 134 against each and found 0 verdict flips. Every difference is numeric drift in non-gating text: timings, settle waits, frame counts, a 1-unit hex channel, and a few hundredths of a px or px² (§3).
2. **One file-level difference, NOT-REPRODUCED.** The first unit-plant run, `clean`, read **67/68** in the chain. The miss was one case, radius-role-canon's «the tile corner is one declaration on the field rung; the pill keeps the stadium». It ran at load 34.25 → 35.19, in the first minute of a hold that had queued 11 minutes for headroom. The same case passed in `unit-all` 11 minutes earlier, and the other 36 plants each match BUILD's count. Re-run twice with the chain's exact command, it read **68/68 and 68/68** (load 17.63 and 15.61; `logs/unit-plant-clean-rerun{1,2}.log`). Under the task's rule, a defect seen only under load is **NOT-REPRODUCED** (§2.1).
3. **L-5 holds in both engines, on `src` and `dist`.** T-4 migrated reads **42/42 · 42/42** on each build. The `weight-step` plant reads **30/42 · 30/42**. Its 12 failing cells are exactly the 390×844 cells in light, dark and PRT, by click and by keys, each at **max 21.00 px**: group 192.00×1129.00 → 192.00×1150.00, and «Awaiting a reply from the» goes 1 → 2 lines. So the falsifier keeps its edge.
4. **O-103c's condition holds.** T-3 migrated reads **43/43 · 43/43**. C1 reads 933.50 / 946.50 / 937.75 px² in Chromium and 932.00 / 942.25 / 934.50 px² in Playwright WebKit (light / dark / PRT), against the bar 251. C1BOX reads 6/6 on `src` and `dist` in both engines, with rest vs selected 0.00 px. CRIT-C1 reads 24/24 · 18/18 + 6 UNMEASURED (WebKit has no Layout Instability API).
5. **Re-read (b) is byte-equal to BUILD's.** PILL-WIDTH's info lines hash equal to BUILD's in all four logs. D′ v9 reads 0.00 px in every scene. The planted 600 reads +1.20 / +1.00 / +1.27 px in Chromium and +1.20 / +1.00 / +1.28 px in Playwright WebKit (`single` / `pill-icon` / `pill-badge`), and 0.00 for `vertical`.
6. **Nothing this seat found opens, adds, strikes or renames a row.** No new coverage item was found. Real Safari: UNMEASURED (owner's safaridriver checkbox).

---

## 1 · The run

`chain-r11.sh` ran pass 10's order, `chain-b10.sh`'s stages in order: state, patch, sheet, libbuild, tsc, build, sheet-clean, plant-builds, then BUILD's resume-added `sheet-lane-plants`, then unit, unit-plants, bundle, xscript, the Chromium battery, reads and film, and Playwright WebKit holds `a`, `b` and `c`. `run-r11.sh` is `run-b10.sh` with a header and three lines changed: `W` (this seat's scratch), `L` (`pass-11/logs`) and the film's `--dest` (`pass-11/frames`). `diff ../pass-10/run-b10.sh run-r11.sh` shows nothing else. Every plant text, probe and route (`../pass-10/routes/D4-Dp10`) is pass 10's. The resume-only stage `rebuild-verify` is omitted, because it compares a build against an earlier copy of itself and this seat has none. Neither driver was edited while it ran.

| stage | window | load at start → end (1-min) |
|---|---|---|
| state · patch · SHEET self-test | 09:44:25-09:44:40 | 14.91 → 15.74 |
| libbuild · vue-tsc · builds (7) · SHEET on clean builds | 09:44:40-09:51:44 | 15.74 → 15.66 |
| plant builds (10, each queued for a heavy slot) | 09:51:44-11:58:07 | 15.66 → 22.54 (the machine reached 58.96 at 10:58; `guarded` held each build until it had headroom) |
| sheet-lane-plants | 11:58:07-12:14:57 | 22.54 → 30.34 |
| unit (whole suite) | 12:14:57-12:23:07 | 30.34 → 18.80 |
| unit-plants (37), hold admitted 12:34:00 | 12:23:07-12:38:38 | 34.25 at admission → 20.79 |
| bundle · XSCRIPT | 12:38:38-12:39:02 | 20.79 → 21.31 |
| Chromium battery | 12:39:02-13:06:57 | 21.31 → 34.90 (witness starts 21.31-42.68) |
| Chromium reads (H, probes) | 13:06:59-13:42:48 | 34.90 → 42.85 |
| Chromium film | 13:42:48-13:44:30 | 42.85 → 36.00 |
| **webkit-a** | queued 13:44:30, admitted 13:44:32 (**2 s**), done 14:20:24 | 36.00 → 34.34 |
| **webkit-b** | queued 14:20:24, admitted 15:12:09 (**51 min 45 s**: lock, then headroom at load 36), done 15:46:17 | 29.68 → 20.37 |
| **webkit-c** | queued 15:46:17, admitted 16:12:30 (**26 min 13 s**), done 16:21:18 | 8.35 → 17.42 |
| `CHAIN-DONE` | 16:21:18 | 17.42 |
| re-runs of `clean` (`rerun-r11.sh`) | 16:21:39-16:22:05 | 17.63, 15.61 |

No WebKit hold was cancelled, and none waited past 90 min. T-1, T-3, T-4 and T-6 in Playwright WebKit each printed H3-1's routine browser recycle once at the 60-navigation cap. No disconnect, no stall, and no harness error.

## 2 · Engine-free and build stages

| stage | pass 11 | BUILD (`B10` §3) | critic (`D′c10` §1) |
|---|---|---|---|
| vue-tsc | app 0 · test 0 | the same | the same |
| SHEET self-test | 14/14 OK | 14/14 | 14/14 |
| SHEET on `dp10-src`, `dp10-atk-src` | PASS 2/2 each (one write, the route's rule) | the same | the same |
| SHEET on plants `foreign` `var` `esc` `apply` `static` `ts` `const` | FAIL 1/2 each | the same | the same |
| SHEET on `concat`, `unpinned` | PASS 2/2 (by design) | the same | the same |
| SHEET on lane plants `crit-lg-plated`, `crit-strip-flush`, `fv6-second-lane-writer` | FAIL 1/2 each; restores equal | the same | the same |
| units, whole suite | 2,357 ran: 2,354 passed, 3 failed (HEAD's `gate:boot-graph` build-arm cases), 1 skipped | the same | the same |
| unit plants | 37 runs; 36 at BUILD's counts, verdict for verdict; `clean` 67/68 in the chain, **68/68 · 68/68 on re-run** (§2.1) | `clean` 68/68 | `clean` 68/68 |
| bundle (unpacked) | **2,935,947 B**, 844 files; dist 2,542,341 B in 840 files; js-gz9 329,772 B | the same | the same |
| XSCRIPT self · pair p8 · pair p7 | 19/19 · 19/19 · 19/19 | the same | the same |

The plant builds' CSS content hashes match BUILD's where BUILD names them. `esc` and `foreign` both build `index-BPE_KCL5.css`, as `B10` §3 records, and `fv6-second-lane-writer` builds `index-CMSEhDNs.css`.

### 2.1 · The one flip: `unit-plant-clean`, NOT-REPRODUCED

| run | when | load (1/5/15, start) | result |
|---|---|---|---|
| `unit-all` (whole suite, includes the case) | 12:14:57-12:23:07 | 30.34 / 26.26 / 25.38 | the case PASSes (only the 3 `boot-graph` cases fail) |
| chain `P clean` (first run in the unit-plants hold) | 12:34:00-12:34:22 | **34.25 / 31.32 / 28.32 → 35.19** | **67/68**: «7. this wave's role bindings the tile corner is one declaration on the field rung; the pill keeps the stadium» |
| the other 36 plants, same hold | 12:34-12:38 | 20.79-35.19 | each at BUILD's count and verdict; the `canon-*` plants FAIL this case by design, as in BUILD |
| `rerun-r11.sh` run 1 | 16:21:39 | 17.63 / 13.36 / 14.33 | **68/68** |
| `rerun-r11.sh` run 2 | 16:21:52 | 15.61 / 13.12 / 14.23 | **68/68** |

The case builds 144 happy-dom twins and resolves selectors element by element (`radius-role-canon.test.ts:583`). It is the heaviest case in either file. The worktree state was equal before and after every run. `unit.mjs` deletes vitest's report, so the assertion text of the miss is not recorded. It most likely hit vitest's per-case timeout under load, but nothing on file shows that, and this seat does not claim it. It does not recur in two re-runs of the identical command, so it is **NOT-REPRODUCED**. The plants it pairs with are unaffected: every plant that wants this case to FAIL still FAILs it.

## 3 · The pairing

`pair.mjs` (`pair.txt`; every differing line in `pair-dump.tsv`) compares this seat's run JSONs with BUILD's (`b10-run-json.tgz`) and with the critic's (`../pass-10/D4-Dp10-crit/run-json.tgz`). It pairs each file by relative path, and within a file pairs each cell by index after checking that the cell's string fields (scene, arm, mode, selection) agree. It also compares the verdict lines of every log present in both seats, with load, timestamps, paths, timings and asset hashes masked. When two lines differ, it matches them on their skeleton (numbers and hex colours masked) and reports a verdict FLIP or numeric drift. Before this seat's run, the tool paired BUILD against the critic: 0 flips, 0 signature mismatches.

| | vs BUILD | vs critic |
|---|---|---|
| run-JSON files paired | 195 (+2 this seat's re-runs, which have no counterpart) | 195 (+2) |
| cells paired | 8,437 | 8,437 |
| **cell pass flips** | **0** | **0** |
| signature mismatches | 0 | 0 |
| cell lines byte-identical | 8,173 | 8,190 |
| cell lines differing (numeric drift) | 264 | 247 |
| top-level differences | 1: `runs/unit/plant-clean.json` (§2.1) | the same 1 |
| logs paired on verdict lines | 134: 118 identical, 16 drift | 134: 121 identical, 13 drift |
| **log verdict flips** | **0** | **0** |

`runs/sheet/SHEET-wt_*.json` is skipped. Every SHEET read of a route writes that one file name, so the last writer wins. SHEET pairs on its logs instead, which are identical.

**Where the drift lives** (largest |Δ| over the numbers in a line, mine vs BUILD; none touches a verdict):

| file | lines | largest Δ | what moves |
|---|---:|---:|---|
| T-6 (both engines) | 106 · 106 | 28.20 · 46.85 | the pop's peak time in ms (for example 95 vs 86 ms) and paint-moved windows. Amplitude, bounce, travel and overshoot are unchanged. T-6 migrated 33/33 both engines; the WebKit run started at load 59.20 against BUILD's 18.54 |
| C1BOX (4 files) | 3 each | 49-60 | the settle waits in ms; every box is 0.00 px in both |
| REPORT (Chromium · WebKit) | 3 · 3 | 11.20 · 1.00 | the kick's frame count (99 vs 101) and its push: **0.15 px · 0.15 px** (BUILD 0.17 · 0.13; the critic 0.16 · 0.14). B-5 is reported and floor-owned, and its want ≤ 0.05 fails in every pass |
| T-3 (WebKit) | 8 | 0.02 | p95 contrast and 1-unit hex channels on `preset-*` cells (for example `#d7d4ce` vs `#d7d4cd`). C1's three cells hold 932.00-942.25 px² |
| FACT (WebKit, 9 files) | 1-4 each | 0.01 | 1-unit hex channels on fill readings; every ratio is equal to the hundredth |
| T-8, W-B (WebKit) | 2 · 2 | 0.01 | the same |

Every other run JSON, Chromium and Playwright WebKit alike, is byte-identical to BUILD's line for line. That covers T-1, T-2, T-4 (including all 18 L-5 cells), T-5, T-7, W-A..W-E, CANON, ATTACK, CORNER, CRIT-C1, the self-test and XSCRIPT. PILL-WIDTH, the carried tone probe (12/12 · 12/12) and the carried ink probe have equal info lines with load masked. That ink probe reads `preset` 2.66:1 light and **1.56:1 dark** (R-5, reported), and `strip` 3.23:1 · 2.06:1.

## 4 · The battery, both engines

| witness | pass 11, A · B | BUILD / critic |
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
| REPORT | 3/4, 1 unmeasured (the V2 mark, Q-3), both engines; `name-ink` PASS light and dark; kick 0.15 · 0.15 px | 3/4; kick 0.17 · 0.13 (BUILD), 0.16 · 0.14 (critic) |
| C1BOX `src` · `dist` | 6/6 · 6/6, both engines; options at rest 184.00×40.94, 184.00×67.88 ×4, group 192.00×352.44; rest vs selected 0.00 px | the same |
| CRIT-C1 `src` · `dist` | 24/24 · 18/18 + 6 UNMEASURED (no Layout Instability API in Playwright WebKit) | the same |
| T-4 / FACT fixture self-test | 20 runs OK, both engines | the same |

**L-5, read cell by cell** (`logs/t4-weight-step-{chromium,webkit}.log`). On D′ v9 the 18 L-5 cells PASS in both engines on `src` and on `dist`. On the `weight-step` plant, migrated reads 30/42 in both engines. The 12 FAIL lines are `c1-ladder-migrated` and the falsifier at 390×844, in light, dark and PRT, by click and by keys. Each reads `max 21.00 px (group 192.00×1129.00 → 192.00×1150.00, option 11 selected) · RE-WRAP 1: option 11 «Awaiting a reply from the» 1 → 2 lines`. The 1440 cells PASS on the plant, as in BUILD.

**Re-read (b), PILL-WIDTH** (info only. Each run prints "FAIL · 0/0" because the probe has no gating cell; that banner is not a reading):

| scene (light = dark) | D′ v9 A · B | planted 600 A · B |
|---|---|---|
| `single` | 0.00 · 0.00 px | +1.20 («Elastic» 60.03 → 61.23) · +1.20 (60.05 → 61.25) |
| `pill-icon` | 0.00 · 0.00 | +1.00 (92.27 → 93.27) · +1.00 (92.28 → 93.28) |
| `pill-badge` | 0.00 · 0.00 | +1.27 (100.80 → 102.06) · +1.28 (100.91 → 102.19) |
| `vertical` | 0.00 · 0.00 | 0.00 · 0.00 (fixed 56.00) |

**Re-read (a), frames.** `frames/single-{light,dark}-{fine,coarse}-{chromium,webkit}-pair.jpg` (rows `d9` and `w600`), plus `c1` and `preset`, light and dark, fine, in both engines (16 frames and `pair.json`). This seat records them and makes no ruling: G on a pill row is the critic's to read.

## 5 · What this seat leaves the critic and agglomeration

- **No flip on any H9 cell, in either engine, against BUILD or the critic.** The one file-level difference, `unit-plant-clean` 67/68 under load, did not reproduce in two re-runs (§2.1). It is recorded here and scores nothing.
- **No row** opened, added, struck or renamed. L-5 stays a cell in T-4's fold. No new coverage or record item was found, so nothing is routed to the landing list.
- **One record note for the landing**, which gates nothing: `unit.mjs` deletes vitest's JSON report, so a unit miss keeps its case title but loses its assertion text and duration. That is why §2.1 cannot say whether the miss was a timeout. If the landing touches `unit.mjs`, it could keep the failure messages in the run JSON. The harness is H9 and unedited here.
- Real Safari: **UNMEASURED (owner's safaridriver checkbox)**. E-4 is read against the Playwright WebKit run of record (O-103).

## 6 · Machine, fences and scratch

- Every stage ran through `guarded --rss-gb 8`, serially. `--light` was used only for engine-free reads, and every Playwright WebKit run sat inside `--exclusive webkit`. The browsers were Playwright's default headless shell with no GPU arguments, one browser per run, closed by the harness.
- **Fence slip, self-reported:** while queued for a heavy slot, this seat ran `ls ~/.claude/guard/runs/`, a directory listing under `~/.claude`. Nothing rests on it. It also used `/tmp/x` for one transient diff, deleted in the same command.
- The writes in the checkout are `docs/tranches/BL/design/tile/pass-11/` only. The harness is unedited, and no tracked source was edited. The only git writes were `git worktree add` and `git worktree remove`.
- **The worktree is removed** (`git worktree remove --force …/p11/remeasure11/wt`; `git worktree list` no longer shows it).
- **The scratch directory `.claude/worktrees/bl/D4/p11/remeasure11/` (52 MB) remains.** The permission system refused this seat's `rm -rf`, as it refused BUILD's for `p10/build10/` and the pass-9 critic's for `p9/crit9/`. It holds `base-fv6`, the builds and run outputs (archived in `run-json.tgz`), the extracted reference JSONs and two scratch dumps. Nothing durable is in it, and every number above rests on a file under `docs/tranches/BL/design/tile/`. **Housekeeping for the owner:** delete it together with REGISTRY §P10-5's list.
- Nothing this seat started is still running. The chain ended `CHAIN-DONE` at 16:21:18, and the re-runs ended at 16:22:05.
- To reproduce the pairing, extract `run-json.tgz`, `b10-run-json.tgz` and `../pass-10/D4-Dp10-crit/run-json.tgz` into three empty directories, then run `node pair.mjs --runs mine=<a>,b10=<b>,c10=<c> --logs mine=logs,b10=../pass-10/logs,c10=../pass-10/D4-Dp10-crit/logs`.
