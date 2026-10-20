# D3 · pass 12 · the owed cells (R-35, P11-6.3 step 1)

| field | value |
|---|---|
| seat | D3 pass-12 OWED-CELLS. It runs the pass-11 critic's owed cells (D3-critique §1.3, §5), as REGISTRY R-35 places them: floor v11a and the minor v9c built, their byte proofs, DEL, the list and its plants, and the toolchain |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | **HEAD of master at launch, `2ecb11d89`** (docs only over 10.1.0: `git diff --stat 1da7eb17b HEAD -- src demo tests …` prints nothing, `setup.log`). **`release/10.1.1` is NOT merged during pass 12** (P11-5: the merge waits until this pass's floor seat banks). Every number below is the published 10.1.0 source plus the named patch |
| rulings read | INBOUND O-102b, O-103 and O-103a (owner and delegate), re-checked at start and at close: the last row is still O-103a. FORMATION-PROGRESS was re-checked at close, and its last line (19:55) is the kernel-zone climb note (data.kalloc.1024 at 4.44M at 19:48; hold at 12M). That note gives no ruling and stops nothing in this seat. No guarded refusal fired |
| driver | `OWED-run.sh` (this directory), phases `setup compose trees static same toolchain teardown`, each launched as `~/.claude/guard/guarded [--light] --timeout N -- bash OWED-run.sh <phase>`. Static phases ran `--light`. `same` and `toolchain` ran heavy, and `toolchain` is a browser run because vitest's slider test launches its own headless shell. Records are in `OWED-records/` |
| engines | No browser of this seat's own. The only browser was the headless shell that vitest's unit suite launches inside `toolchain`, run heavy. No WebKit lock was taken, because no specimen byte moved (R-31). **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| fences | No source edit and no git write in the checkout. Builds ran only in `.claude/worktrees/bl/D3/p12/owed/wt` (node_modules symlinked; `D3_OUT`, the vite cacheDirs and the library `dist` all inside it). The worktree was removed with `--force` and pruned, and `…/D3/p12/` is gone (`teardown.log`: 0 worktrees naming D3/p12/owed). The checkout's only writes are this directory's files |

## 0 · Verdict

**Every owed cell is green on its first run. No red, nothing re-run, and row 11 does not reopen.** Each expected number reproduces exactly:

| cell | expected (R-35, P11-6.3) | read | record |
|---|---|---|---|
| floor v11a `git apply --check` at HEAD | clean | **exit 0** | `compose.log` |
| floor v11a raw-identical to floor v10, one session | CSS `347288745da7cf97` | **391,121 B `347288745da7cf97`; dist and demo `diff -rq` exit 0/0; 346 demo files** | `same.log` |
| DEL floor v11a | PASS 101 | **PASS (101 gated rows)** | `del-fv11a.log` |
| the list, floor v11a under `crit-fv10-rulings.json` | PASS 207: 197 true, 10 reported | **PASS (207 lines: 197 ruled true, 10 reported)** | `sweep-fv11a-crit.log` |
| plant: fv10s under `crit-fv10s-reading.json` | FAIL 1 at `grasp.css:131` | **FAIL (1 unread, 0 stale of 207 lines)**: `✗ unread src/styles/glass/grasp.css:131 [word "tint"]` | `sweep-fv10s-plant.log` |
| toolchain on floor v11a | green | **vue-tsc exit 0 (app), library build exit 0, vue-tsc exit 0 (tests), dist-demo exit 0, then vitest `--maxWorkers=2` exit 0: 237/237 files, 2318 passed, 10 expected fail, 1 skipped (2329)** | `toolchain.log`, `units.log` |
| minor v9c `git apply --check` at HEAD | clean | **exit 0** | `compose.log` |
| minor v9c raw-identical to the minor v9 | CSS `e11613c3eeb45cab` | **398,432 B `e11613c3eeb45cab`; `diff -rq` 0/0; 346 demo files** | `same.log` |
| the list, minor v9c under `crit-ms9-rulings.json` | PASS 368 (347 true, 21 reported) | **PASS (368 lines: 347 ruled true, 21 reported)** | `sweep-minor9c-crit.log` |
| plant: minor v9c under `crit-ms9s-reading.json` | FAIL 1 at `grasp.css:135` | **FAIL (1 unread, 0 stale of 368 lines)**: `✗ unread src/styles/glass/grasp.css:135 [word "tint"]` | `sweep-minor9c-plant.log` |

Under R-35 the owed cells hold no row. They are now **paid**. Floor v11a is the base pass 12's floor seat builds R-32 on (P11-6.2), and nothing here changes the 43/44 count.

## 1 · The builds

### 1.1 · Composition (`compose.log`, 19:11:34, load 28.9)

| file | made of | sha1 | files | +/− |
|---|---|---|---:|---|
| `floor-v11a.patch` | `pass-11/floor-v10.patch` (`62f0e71f`) + `FV10-seat-proposed.diff` (`df5ce784`) + `crit-floor-proposed.diff` (`800fd1bd`), applied in that order in the worktree and cut as `git diff HEAD --binary` | **`08c13d4e`** | 88 | +979/−2220 |
| `minor-split-v9c.patch` | `pass-11/minor-split-v9.patch` (`8cf39ccb`) + `MS9-seat-proposed.diff` (`4ebf3884`) | **`7c771428`** | 61 | +714/−537 |

- `git apply --check` at HEAD: both exit 0 after the cut. The trees phase then re-applied each one whole and `cmp`'d it against the worktree diff (`worktree = floor-v11a.patch`, `worktree = minor-split-v9c.patch`, `trees.log`).
- The path lists equal their bases: floor v10 = floor v11a (exit 0), minor v9 = minor v9c (exit 0).
- **Comment-only, read off the patch-of-patches** (`diff floor-v10.patch floor-v11a.patch`, `compose.log`). The only added lines that differ are the three comment sentences: `feedback-tone.css` "at or above the", `property-regs.css` "held at or above the bound … Level scales the rung's 1 − α", and `grasp.css` "the fill sheds 40% of its strength in paint; the dock, a plate at the bound, keeps its α when held." The minor's only change is the `glass-subtlety.test.ts` comment (`// … Dark: the ink stays near-black (L 0.17 < 0.5, asserted below), never the cream foreground.`).
- Lines that differ across the tree copies: fv10 vs fv10s 6, fv10 vs fv11a 10, minor v9 vs minor v9c 4 (`trees.log`).
- `git apply` warns of one trailing-whitespace added line (`floor-v10.patch:1266`, "white app surface (the canonical G2 case …)"). It is inherited byte for byte from floor v10, so it is not this build's, and it goes to the landing docs pass.

### 1.2 · Identity under R-22 and R-27 (`same.log`, 19:53:44-19:54:12, load 28.8 → 32.8)

Each build ran through `harness/build.mjs --demo` under one label in one worktree, and each output was moved aside before the next. HEAD was built last as the bite.

| set | specimen CSS | dist / demo `diff -rq` | R-27 tie |
|---|---|---|---|
| floor v10, **floor v11a** | both **391,121 B `347288745da7cf97`**, 346 demo files | 0 / 0 | equals the pass-11 critic's banked `347288745da7cf97d5dd…`; the banked fv10 dist-demo sha256 list vs floor v11a: **`diff` exit 0** |
| the minor v9, **the minor v9c** | both **398,432 B `e11613c3eeb45cab`**, 346 demo files | 0 / 0 | equals the banked `e11613c3eeb45cab2ebe…`; the banked minor9 demo list vs the minor v9c: **exit 0** |
| **bite**: HEAD | 394,891 B `b09b9e73a61b75b1` | HEAD vs fv11a exit 1 (dist 5 lines, demo 261); HEAD vs minor9c exit 1 (5, 229) | equals pass 11's bite figures |

**A non-finding, explained so no later reader trips on it.** The pass-11 bank's specimen **dist** list differs from this session's in `assets/index-*.js` and `index.html` (`diff` exit 1 on both routes). The specimen JS embeds the absolute worktree path: 129 occurrences of `worktrees/bl/D3/p12/owed` in the fv11a JS. So it differs between any two seats' worktrees by construction. That is why R-27 ties only the specimen CSS hash and the dist-demo list to the bank, and both tie. Inside this session, fv10 and fv11a dist are equal (`diff` exit 0).

**Every floor v10 (and through it floor v7) and minor v9 paint verdict carries to floor v11a and the minor v9c.**

## 2 · The static reads (`static.log`, 19:11:55-19:12:13, load 26.4 → 22.4, all `--light`)

### 2.1 · Floor

| read | result |
|---|---|
| DEL floor v11a (floor v10 declaration `FV10-records/declare-floor-v10.json` + `floor-v10.patch`) | **PASS (101 gated rows)** |
| DEL floor v11a (the same declaration + its own `floor-v11a.patch`) | PASS (101) |
| DEL fv10s, fv10 (control) | PASS (101), PASS (101) |
| DEL absent root | exit 2, `FAIL (nothing read: no text file in scope)` |
| the list, floor v11a, no rulings | `LIST (207 lines to read)` |
| **floor v11a under `crit-fv10-rulings.json`** | **PASS (207: 197 true, 10 reported)**, with `--patch floor-v10.patch` and with `--patch floor-v11a.patch` alike |
| **plant: fv10s under `crit-fv10s-reading.json`** | **FAIL (1 unread, 0 stale of 207)**, at `src/styles/glass/grasp.css:131 [word "tint"]`; `SWEEP … ruled=206 true=196 reported=10 unread=1` |
| floor v11a under the same plant | FAIL (1 unread), same line |
| fv10s under `crit-fv10-rulings.json` | PASS (207: 197 true, 10 reported); see the caveat below |
| floor v10 under `crit-fv10-rulings.json` | FAIL (2 unread, 2 stale): the two FV10-seat lines, which is the seat delta's own plant reproducing |
| H11-2 print | floor v11a `PRINT (1593 lines in 73 files)`, the same size as fv10s (1593), so the print is unchanged in size. It carries the rewritten sentence at `grasp.css:130-133` against `--glass-veil-rung` at `:135` |
| LAW | PASS (88 gated rows). This is root-dependent: 85 (FV10 seat), 87 (pass-11 critic), 88 here, because `launch-law.mjs` reads the harness and driver files present, and `OWED-run.sh` is one more |
| HOV floor v11a | PASS (58) |
| census floor v11a | `stacked=0 halo=0 blur=0 open=0` |

**Caveat, carried from D3-critique §3.5 and not new.** The list keys on the line and its `says` text. `crit-floor-proposed.diff` rewrites `grasp.css:132-133`, the sentence's tail, and the printed `:131` line ("tinted MIX and no veil …") is byte-identical on fv10s and floor v11a. So `crit-fv10-rulings.json` passes **both** trees, and the plant fails both. The sweep proves that every line has a ruling. It cannot prove which sentence the ruling read. What is true on floor v11a and false on fv10s is the sentence, and the critic's reading settles that, not the tool (MS9 §4.1's line-versus-sentence gap; it is the reader's to close). I checked it by eye on the print: floor v11a's `:132-133` reads "the fill sheds 40% of its strength in paint; the dock, a plate at the bound, keeps its α when held". That is R-33's paint (a held plate at the bound keeps the bound), so the ruling `true` reads true on floor v11a.

### 2.2 · The minor

| read | result |
|---|---|
| DEL minor v9c (`deletes-minor.json` + `minor-split-v9.patch`) | **PASS (54)**; the minor v9 control PASS (54) |
| H7-3 minor v9c (src+demo copy, `deletes-minor.json`, no patch) | **PASS (42)** |
| the list, minor v9c, no rulings | `LIST (368 lines to read)` |
| **minor v9c under `crit-ms9-rulings.json`** | **PASS (368: 347 true, 21 reported)**, with either patch |
| **plant: minor v9c under `crit-ms9s-reading.json`** | **FAIL (1 unread, 0 stale of 368)** at `src/styles/glass/grasp.css:135 [word "tint"]` |
| the minor v9 under `crit-ms9-rulings.json` | FAIL (1 unread of 369): `glass-subtlety.test.ts:193`, the MS9 seat delta's own plant |
| H11-2 print, minor v9c | `PRINT (1363 lines in 59 files)` |
| HOV / census minor v9c | PASS (58) / `stacked=0 halo=0 blur=0 open=0` |

**Naming, recorded so the next seat does not conflate them.** The driver task defines **the minor v9c = the minor v9 + `MS9-seat-proposed.diff`**, which is the critic's "minor v9s". D3-critique §3.5 and §5 used "minor v9c" for v9 + MS9-seat + `crit-minor-proposed.diff`, which P11-6.2 now calls **the minor v10** and gives to the pass-12 minor seat. So this seat built the task's v9c (`minor-split-v9c.patch`) and also read the critic's tree statically, as `minor9cc` (the minor v9c + `crit-minor-proposed.diff`): DEL PASS (54) and **PASS (368: 347 true, 21 reported)** under `crit-ms9-rulings.json` (`sweep-minor9cc-crit.log`). By the same line-versus-sentence caveat as §2.1, the list cannot separate v9c from v9cc at `:135`. That one sentence is the minor v10 seat's to read. No byte proof or toolchain ran on `minor9cc`: it is the minor v10 seat's build (P11-6.3 step 4), and its delta is a CSS comment.

## 3 · Toolchain (`toolchain.log`; queued about 19:55, admitted 20:02:17, done 20:04:01; load 18.2 → 21.6)

Floor v11a in the worktree (`worktree = floor v11a`), with local configs whose cacheDirs sit in the worktree (`.cache-owed/*`). The order follows P11-6.3: the dist-demo is built before vitest.

| step | exit | at |
|---|---|---|
| `vue-tsc --noEmit` (app) | **0** | 20:02:25, load 19.1 |
| `vite build` (library) | **0** | 20:02:32, load 20.7 |
| `vue-tsc --noEmit -p tsconfig.test.json` | **0** | 20:02:41, load 20.1 |
| dist-demo (`demo/vite.demo-dist.config`) | **0** | 20:02:43, load 20.7 |
| `vitest run --maxWorkers=2` | **0**: **Test Files 237 passed (237); Tests 2318 passed, 10 expected fail, 1 skipped (2329)** | 20:03:55, load 22.5 |
| the minor v9c: `vitest run --maxWorkers=2 tests/styles/glass-subtlety.test.ts` | **0**: 1/1 file, 38/38 | 20:04:01, load 21.6 |

**No red, so no re-run was owed** (the `reds` phase exists in `OWED-run.sh` and was never needed). Pass 11's FV10 §5.1 reds (2317/1 at load 126-145, NOT-REPRODUCED at load about 34) do not recur at load about 22. The 2318 + 10 + 1 = 2329 tests here against FV10's 2317 + 1 red agree with the count once the expected-fail tests are counted apart. **Row 11 stays PASS, and nothing reopens.**

## 4 · Machine law, kept

- Every phase ran through `~/.claude/guard/guarded` as the literal command word. Static phases ran `--light`. `same` (`--timeout 30`) and `toolchain` (`--timeout 60`) ran heavy, never `--light`, one at a time.
- The `same` waiter queued at 19:12 and was admitted at 19:53:44 (41 min, about 112 guarded waiters machine-wide at 19:42, load 32). `toolchain` was admitted after about 7 min. No waiter passed 90 min, so no cell is owed.
- No WebKit run and no screenshot. vitest used `--maxWorkers=2`, and its own headless shell ran inside a heavy guarded run and closed with it.
- Nothing is left running: the worktree is removed and pruned, `…/D3/p12/` is gone, and no background process of this seat remains.
- The kernel-zone climb (FORMATION-PROGRESS 19:55: 4.44M at 19:48) caused no refusal. This seat added no browser churn beyond the one vitest suite.

## 5 · For the next seats

- **The floor seat (P11-6.3 step 3)** builds R-32 on **`pass-12/floor-v11a.patch` (`08c13d4e`)**, proved here: raw-identical to floor v10, DEL 101, the list 207 under `crit-fv10-rulings.json`, toolchain green. Its R-34 scope is its own hunks plus H11-2's print of the tokens it re-values. The 207 lines are not read again.
- **The minor seat (step 4)** builds the minor v10 = `pass-12/minor-split-v9c.patch` (`7c771428`) + `crit-minor-proposed.diff`, or equally `minor-split-v9.patch` + both deltas. Its expected readings are already met on the static half (`minor9cc`: DEL 54, the list PASS 368, the plant FAIL 1 at `:135`). It still owes the byte proof to `e11613c3eeb45cab`, H7-3 on its own tree and the toolchain.
- **Landing docs pass, one new item:** the inherited trailing whitespace at `floor-v10.patch:1266` ("white app surface (the canonical G2 case the user reported). "), carried into floor v11a.
- **No new defect class.** The line-versus-sentence gap (§2.1, §2.2) is D3-critique §3.5's, already placed under R-36 as a reading duty.
