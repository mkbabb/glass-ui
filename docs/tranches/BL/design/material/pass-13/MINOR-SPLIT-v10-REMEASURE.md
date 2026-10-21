# D3 · pass 13 · the minor v10, re-measured: raw identity in one session on base (a) (P12-6.3 step 3)

| field | value |
|---|---|
| seat | D3 pass 13, MINOR-SPLIT v10 RE-MEASURE. It re-applies `pass-12/minor-split-v10.patch` (`2aa0e5c9`) at HEAD and proves the specimen dist and the dist-demo raw-identical to the pass-12 bank in one session (CSS `e11613c3eeb45cab`, the pass-12 dist-demo list). It then runs H7-3, DEL (H9-H11) at 0, the list under `pass-11/crit-ms9-rulings.json` with its plant, the carried static checks, the toolchain and G5's verifier. **No browser of its own on base (a).** The only browser was the headless shell that vitest's slider unit launches inside `toolchain` (heavy, never `--light`) |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | **(a), HEAD of master at launch: `558e84ba7`** (the floor v11 re-measure bank, docs only). `git diff --stat 1da7eb17b HEAD -- src demo tests package.json` prints nothing, and so does the wider list (adding `scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon`) (`MS10R-records/setup.log`). The tree is the published 10.1.0 source plus `minor-split-v10.patch`. **`release/10.1.1` and `release/10.1.2` are NOT merged** (P12-6.2 (a)). At close, HEAD is still `558e84ba7` and the base diff is still empty, so the base (b) battery does not apply |
| rulings read | `audit/INBOUND.md` at start and at close: 61 `O-` rows. The last D3 ruling is **O-103b**, and O-102b, O-103, O-103a and O-103b stand. There is no F-1′ decline and no override of R-37. `FORMATION-PROGRESS.md` at close: the newest line is the floor v11 re-measure bank (21:15: 43/43 floor rows, N-4 to this seat). None of these rulings changes this seat's task. R-32's dark arm is the floor's and W-H.2's, not the minor's (MS10 §5.2) |
| driver | `pass-13/MS10R-run.sh`, built on `pass-12/MS10-run.sh`. Its phases are `setup trees static same toolchain ratchet teardown` (`reds` is defined and was not needed), and each was launched as `~/.claude/guard/guarded [--light] --timeout N -- bash MS10R-run.sh <phase>`. Records are in `pass-13/MS10R-records/`, and `phases.log` carries each phase's time and load average |
| engines | No WebKit run, no screenshot and no WebKit lock taken. No specimen byte moved (§2), so a capture would measure nothing (R-31). **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox).** No guarded refusal fired, and no kernel-zone refusal |
| fences | No tracked source was edited and there was no git write in the checkout. Worktree: `.claude/worktrees/bl/D3/p13/minor10m/wt`, cut at HEAD with node_modules symlinked. Every patch apply was checked with `cmp` against the worktree's `git diff HEAD --binary`. `D3_OUT`, the vite cacheDirs (`.cache-m10r/*`) and the library `dist` were all inside the worktree. `.bundle-ratchet` was rebound in the worktree for one verifier run, then restored. The worktree was removed with `--force` and pruned, and `…/D3/p13/` is gone (`teardown.log`). The checkout's only writes are `MS10R-run.sh`, `MS10R-records/` and this file. Nothing ran in a sibling repo |

Short citations: `MS10` (`pass-12/MINOR-SPLIT-v10.md`), `FR13` (`pass-13/FLOOR-V11-REMEASURE.md`), `OWED` (`pass-12/OWED.md`).

---

## 0 · Verdicts

- **The patch applies at HEAD.** `git apply --check minor-split-v10.patch` exits 0. The patch is 61 files, +716/−539, 175,419 B, sha1 `2aa0e5c9`, the banked figure. `crit-ms9-rulings.json` `368b294e`, `crit-ms9s-reading.json` `537512be` and `deletes-minor.json` `61ca8bc9` are the banked files.
- **Raw identity holds in one session** (21:18:22-21:18:39, load 32.20-34.96). The minor v10 was built twice and HEAD once, under one label.
  - **Rebuild:** the minor v10 and its rebuild are identical: specimen dist (3 files) and dist-demo (346 files), `diff -rq` exit 0, 0 lines.
  - **Specimen CSS:** `index-Bd1ws62N.css` is **398,432 B, sha256 `e11613c3eeb45cab`** in both builds, the banked hash digit for digit.
  - **dist-demo:** the sha256 list equals pass-12's `same-minor10-demo.sha256` (`diff` exit 0, both builds).
  - **Specimen JS and `index.html`:** they differ from the bank only by the embedded worktree path. Substituting the pass-12 path back in reproduces pass-12's hashes exactly (§2.2).
- **The bite reproduces.** HEAD's CSS is `b09b9e73a61b75b1` (394,891 B) against the minor's: dist `diff -rq` exit 1 (5 lines), demo exit 1 (229 lines). Those are MS10's bite figures, and pass-12's HEAD CSS and dist-demo list are equal (`diff` exit 0), so the base bytes are pass-12's.
- **H7-3 PASS 42. DEL at 0 hits, PASS 54. An absent root exits 2.**
- **The list under `crit-ms9-rulings.json`: PASS 368** (347 true, 21 reported), 0 unread, 0 stale. **The plant bites:** `crit-ms9s-reading.json` reads FAIL 1 at `grasp.css:135`. All five static logs equal pass-12's line for line once the tree path is stripped (`diff` exit 0, 0 lines each).
- **Carried static checks, read again:**
  - LAW PASS 101 (root-dependent, OWED §2.1; FR13 read 100 before this seat's driver was written);
  - census `0/0/0/0`;
  - HOV PASS 58;
  - the ladder `diff` to pass-12 prints nothing;
  - FL-14 has 1 `isolation` line.
- **Toolchain green** (21:19:17-21:21:44, load 32.4-37.5):
  - `vue-tsc` exits 0 on both projects;
  - the library build and the dist-demo exit 0;
  - vitest: **239/239 files, 2321 passed**, 10 expected fail, 1 skipped (2332), MS10's count exactly. No red, so nothing was re-run.
- **G5:** roster PRESENT 289 = 289 and `terminal CLEAN` with the datum rebound. The ratchet still owes **+2,333 B** (2,921,390 > 2,919,057), MS10's figure to the byte.
- **Row N-4 (the minor's W-0.1 reading): PASS** on pass 13's own measurement. With FR13's 43, floor v11 stands at **44/44** on pass 13's own battery. **No cell is owed.** Whether pass 13 is the second clean pass is the critic's (step 4) and the agglomeration's (step 5) call.

---

## 1 · Setup (`setup.log`, 21:16:29-21:17:08, load 31.06 → 38.55)

| check | result |
|---|---|
| worktree HEAD | `558e84ba7` (master at launch) |
| `1da7eb17b..HEAD -- src demo tests package.json` | empty: **base (a)** |
| the wider list | empty |
| `git apply --check minor-split-v10.patch` at HEAD | exit 0 |
| `minor-split-v10.patch` | sha1 `2aa0e5c9`, 61 files, +716/−539, 175,419 B |
| `crit-ms9-rulings.json` / `crit-ms9s-reading.json` / `deletes-minor.json` | `368b294e` / `537512be` / `61ca8bc9` |

`trees` (21:17:14-21:17:16): the patch was applied, `cmp`-checked (`worktree = minor-split-v10.patch`), copied out to `trees/minor10` and `h7trees/minor10`, and reversed (`back to HEAD`) each time.

---

## 2 · Byte identity (R-22's raw branch, R-27's tie; `same.log`)

### 2.1 · One session

Each output was built through `harness/build.mjs --demo` under the label `same` in the one worktree. Each was moved aside before the next build. The order was the minor v10, the minor v10 again, then HEAD as the bite.

| output | minor v10 vs its rebuild | tie to the pass-12 bank (`pass-12/MS10-records/`) | bite: HEAD vs minor v10 |
|---|---|---|---|
| **specimen CSS** | `index-Bd1ws62N.css` **398,432 B, sha256 `e11613c3eeb45cab`** in both | the sha256 + name line equals `same-minor10-dist.sha256`'s, `diff` exit 0, both builds | HEAD `index-BzMSs5Ab.css` 394,891 B `b09b9e73a61b75b1`, which equals pass-12's HEAD line (`diff` exit 0) |
| **specimen dist** (3 files) | `diff -rq` exit 0, 0 lines | CSS equal; JS and `index.html` equal after the path substitution (§2.2) | `diff -rq` exit 1, 5 lines |
| **dist-demo** (346 files) | `diff -rq` exit 0, 0 lines | **the sha256 list equals `same-minor10-demo.sha256`, `diff` exit 0, both builds** | `diff -rq` exit 1, 229 lines; HEAD's list equals pass-12's HEAD list (`diff` exit 0) |

Build stamps (from `same.log`; the 1-minute load is the first figure):

| build | time | load (1 / 5 / 15 min) |
|---|---|---|
| minor10 | 21:18:26 | 32.20 / 32.31 / 29.43 |
| minor10b | 21:18:32 | 34.60 / 32.81 / 29.65 |
| head | 21:18:38 | 34.96 / 32.91 / 29.70 |

### 2.2 · The specimen JS: the worktree path, and nothing else (`js-path-witness.log`)

The pass-12 and pass-13 specimen dist lists differ in 2 entries (`vs-p12-dist-list.diff`, 4 lines): `assets/index-*.js` and `index.html`. The specimen JS embeds the worktree path (OWED §1.2), and this seat's worktree is `p13/minor10m`, not `p12/minor10`. The witness:
- **JS:** substituting `bl/D3/p13/minor10m/` → `bl/D3/p12/minor10/` in the pass-13 JS gives sha256 **`2077111d…7e7ca7`**, which is pass-12's `index-CKemLP3A.js` hash exactly.
- **`index.html`:** the same substitution plus the JS file name (`index-yKlmMWE4` → `index-CKemLP3A`) gives **`57c4af78f1f1fcaa1776c2119917f235f70b1f1475ed833c86810a657edb1565`**, pass-12's hash exactly.

So the whole specimen dist is pass-12's bytes up to the worktree path. **Every paint verdict of the minor v10 carries** under P12-6.2 (a) and P8-2.2's thin-build rule. No WebKit or Chromium cell is owed.

---

## 3 · H7-3, DEL, the list (`static.log`, 21:17:21-21:17:25, load 35.08 → 33.47)

| check | result | equals pass-12 (`vs-p12-*.diff`, paths stripped) | record |
|---|---|---|---|
| **H7-3**, `deletes-minor.json` (42 names, 3 sites), H7's scope (`src/`, `demo/`), no patch | **PASS (42 gated rows)** | `diff` exit 0, 0 lines | `del-H7-minor10.log` |
| **DEL with H9-H11**, `--patch minor-split-v10.patch` | **PASS (54 gated rows)**: 1,095 text files, `names=42 hits=0 files=0 changed=8 families=1 sites=3 arm-true=1 rung=4 reported=4` | `diff` exit 0, 0 lines | `del-minor10.log` |
| DEL, absent root | exit 2, `FAIL (nothing read: no text file in scope)` | — | `del-absent.log` |
| the list, no rulings | `LIST (368 lines to read)` | `diff` exit 0, 0 lines | `sweep-minor10-list.log` |
| **the list under `crit-ms9-rulings.json`** (`368b294e`) | **PASS (368 lines: 347 ruled true, 21 reported)**, `unread=0 stale=0` | `diff` exit 0, 0 lines | `sweep-minor10-crit.log` |
| **plant**: `crit-ms9s-reading.json` (`537512be`) | **FAIL (1 unread, 0 stale of 368)**: `✗ unread src/styles/glass/grasp.css:135 [word "tint"]` | `diff` exit 0, 0 lines | `sweep-minor10-plant.log` |
| SWEEP, absent root | exit 2 | — | `sweep-absent.log` |

The minor v10's bytes and the rulings file are unchanged, so MS10 §3.3's reading of the two rewritten sentences (`grasp.css:132-137`, `glass-subtlety.test.ts:192-194`) is a reading of these same bytes. It stands. **No entry of `crit-ms9-rulings.json` needs updating, and no rulings file is written** (P-3).

### 3.1 · Carried static checks, read again

| check | result | record |
|---|---|---|
| LAW | PASS (101 gated rows). The count is root-dependent (OWED §2.1) and grows with the driver files in the material tree: FR13 read 100 before `MS10R-run.sh` existed, and MS10 read 94. The added row was not traced to its line | `law.log` |
| census | `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0 | `census-minor10.log` |
| HOV | PASS (58) | `HOV-minor10.log` |
| ladder | `diff radii-minor10.txt pass-12/MS10-records/radii-minor10.txt` exit 0, prints nothing | `radii-minor10.txt` |
| FL-14 static | 1 `isolation: isolate` line in `@utility glass-plate` | `static.log` |

---

## 4 · Toolchain and G5 (`toolchain.log`, `ratchet.log`)

Queued 21:19:06 (load 33.52), admitted 21:19:17: an 11 s wait.

| check | result | when, load (1 min) | record |
|---|---|---|---|
| apply + `cmp` | `worktree = minor-split-v10.patch` | 21:19:17, 32.36 | `toolchain.log` |
| `vue-tsc --noEmit` (app) | **exit 0** | 21:19:29, 32.58 | `tsc-app.log` |
| `vite build` (library, cacheDir in the worktree) | **exit 0** | 21:19:45, 35.66 | `libbuild.log` |
| `vue-tsc --noEmit -p tsconfig.test.json` | **exit 0** | 21:20:01, 37.51 | `tsc-test.log` |
| dist-demo (`demo/vite.demo-dist.config`), before the units | **exit 0** | 21:20:04, 37.07 | `demobuild.log` |
| `vitest run --maxWorkers=2` | **exit 0: Test Files 239 passed (239); Tests 2321 passed, 10 expected fail, 1 skipped (2332)**, MS10's count exactly | 21:21:44, 37.35 | `units.log` |
| verifier, datum unrebound | exit 1, `G-BUNDLE-RATCHET … 2921390 > 2919057`: **+2,333 B**, MS10's figure | 21:21:58+, 36.70 | `verifier.log` |
| verifier, datum rebound in the worktree only | exit 0, `terminal CLEAN`, roster PRESENT **289 = 289**, claims 193, declarations 454; `.bundle-ratchet` restored to HEAD | 21:22:45, 34.08 | `verifier-rebound.log` |

**No red cell, so the two-re-run rule had nothing to act on** (`reds` was not invoked).

---

## 5 · Gates

Paint rows carry on outputs proved raw-identical to the pass-12 minor v10's (§2), whose verdicts MS10 §5.1 records.

| gate | verdict | basis |
|---|---|---|
| **W-0.1 G1** M-1 | **PASS** over paper; off paper accepted and reported (O-103) | carried on raw identity |
| **G2, G3** O-66 field and row | **PASS** | carried; HOV 58 read here |
| **G4** W-A light | **PASS** (108/108) | carried on raw identity |
| **G5** scope | **PASS**: roster 289 = 289, `terminal CLEAN` with the datum rebound; the ratchet owes **+2,333 B** | read here |
| **G6** per R-9 | **PASS** | carried on raw identity |
| **G7** M-2 and M-3 halves | **PASS** | carried on raw identity |
| **W-0.11 G1-G4** | **PASS**: census 0 | read here |
| **W-0.11 G5, G6** | **PASS** | as G5; carried |
| STACK (FL-14) | 24/24 | carried; `isolation` read here |
| units | 239 files, **2321 passed**, 0 failed | read here |
| light-law prose (R-21 (b), R-26, R-30, R-36) | DEL **at 0** (PASS 54); the list **PASS 368** under `crit-ms9-rulings.json`; the plant bites at `grasp.css:135` | read here |
| **row N-4** (the minor's W-0.1 reading) | **PASS** | this table |

**On base (a), raw identity is the measurement** (P12-6.2 (a), P12-6.3 step 3). Pass 13 reproduces every byte the pass-12 verdicts rest on, so a re-run of those cells would read the same bytes. Base (b) did not occur: HEAD did not move off 10.1.0 source, so the minor owes no two-engine battery of its own this pass.

**10.2.0 remains as MS10 §5.3 states:**
- the entry gate (two consecutive clean passes), which the critic and the agglomeration decide;
- D2 converging;
- the `release/10.1.1` / `10.1.2` merge, then the minor's rebase, with its own battery on that base;
- the landing items: the R-9 reading, G1's text, binding each gate to a probe, the `.bundle-ratchet` rebind (+2,333 B), and the landing docs pass.

---

## 6 · Teardown and reproduce

**Torn down** (`teardown.log`, 21:22:51-21:23:15, load 34.55 → 34.34):
- `git worktree remove --force` of `.claude/worktrees/bl/D3/p13/minor10m/wt`, then `git worktree prune`;
- `rm -rf` of `…/D3/p13/minor10m/`, then `rmdir` of the empty `p13/`.

Afterwards `git worktree list` holds 0 `minor10m` entries, `.claude/worktrees/bl/D3/` holds `p3 p5 p6`, and `git status --porcelain -- src demo tests DESIGN.md` in the checkout prints nothing. No process of this seat is left running.

**Machine law, kept:**
- Every phase ran through `guarded`.
- `setup trees static ratchet teardown` ran `--light`: no browser, no build. `ratchet`'s verifier packs and installs into a temp consumer but launches no browser.
- `same` (`--timeout 45`) and `toolchain` (`--timeout 60`) ran heavy, one at a time.
- vitest used `--maxWorkers=2`.
- No WebKit run, no screenshot, no kernel-zone refusal.
- The `js-path-witness.log` check (`sed` + `shasum` over a built file, no build or browser) ran outside `guarded`.

```sh
P13=docs/tranches/BL/design/material/pass-13
G="$HOME/.claude/guard/guarded"
$G --light --timeout 15 -- bash $P13/MS10R-run.sh setup
$G --light --timeout 15 -- bash $P13/MS10R-run.sh trees
$G --light --timeout 20 -- bash $P13/MS10R-run.sh static
$G --timeout 45 -- bash $P13/MS10R-run.sh same
$G --timeout 60 -- bash $P13/MS10R-run.sh toolchain     # leaves the worktree at the minor v10 for ratchet
$G --light --timeout 15 -- bash $P13/MS10R-run.sh ratchet
$G --light --timeout 10 -- bash $P13/MS10R-run.sh teardown
```
