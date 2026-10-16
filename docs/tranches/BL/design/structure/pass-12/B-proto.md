# D1 · pass 12 · B-proto: sealed modules, flat

| field | value |
|---|---|
| seat | D1-B prototype, pass 12. Copies `pass-11/B-kit` to `pass-12/B-kit` and does the route work §P11-6.3 lists: the coverage cure in `browser-tally` (P11-G1, P11-R1 (a)), the extent sweep over every judge that compares two inputs (P11-G2), F6 through every committed report in every slot and F7's ten rows. Kit only: no chain step, no frozen file and no floor file changes |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `82f2d271` at seat start. The driver committed three docs-only commits during the seat (`bed64fc7`, `d24aa8c8`, `f6abfaab`); r1's worktree is at `d24aa8c8`, r2's and the floor base's at `f6abfaab`. `git diff 6154d6ec HEAD -- . ':!docs'` is empty, and so is the code diff between the two worktree commits: the chain runs over 10.1.0's code, as in passes 7-11 |
| kit | `pass-12/B-kit/` = `pass-11/B-kit` without `results/`, plus `results/p12/`. The committed inputs (the full `/2` runs, the six P7-R2 reruns, the p10 and p11 touched-spec pairs, the selection, the cascade baseline, the probe's base report) are copied from `pass-11/B-kit/results/p11/` into `results/p12/`. Pass 11's run scripts (`batteries.sh`, `batteries-run2.sh`, `replays-p11.sh`, `browser-touched-p11.sh`) are dropped from the copy and replaced by `replays-p12.sh`, `heavy-p12.sh`, `batteries-p12.sh` and `browser-p12.sh` |
| fences | worktrees `.claude/worktrees/bl/D1/p12/B-proto/{wt,wt2,base}` only, all removed with `git worktree remove --force`, then `scratch/`, `B-proto/` and `p12/`. Checkout writes: `pass-12/` only. One transient file outside the seat: a 167-line `git ls-tree` listing written to `/tmp/x.<pid>` and deleted in the same command (no number rests on it; `lib/follow.mjs` `baseProgram` re-reads the same listing). The seat found `.claude/worktrees/bl/D1/p11/` present and empty at start (pass 11's seat dir, not this seat's; left as found) |
| machine | every run went through `~/.claude/guard/guarded`. Heavy: the replays (queued 10:36:55Z, admitted 10:42Z), the toolchain with battery run 1 (queued 11:00:18Z, admitted 11:13Z), battery runs 2, 3 and 4. A first heavy launch with `--timeout 45` was stopped by this seat while still queued (10:59:59Z) and relaunched with `--timeout 120`, since toolchain plus batteries can pass 45 min. Light (`--rss-gb 8`): the browser step, the plant trials, W-D.1 and chain-text. No queue wait passed 30 min; no 13M refusal. No browser was launched: pass 12 changes no code (§8). Nothing is left running |

Citations: `R/` is `pass-12/B-kit/results/p12/`, `K/` is `pass-12/B-kit/`. Loads are the 1/5/15-minute averages logged at each run.

---

## §0 · In brief

| bar (§P11-6.4) | result |
|---|---|
| S-14, the extent (P11-G1) | `browser-tally --base` must cover the route: every route spec the chain carries from a base-program spec has results in `--base`, or the tally throws (exit 2). A key of a covered spec that the base lacks is `UNBASED`, not held: RED. The map is the chain's own (`lib/follow.mjs` `chainOrigin`, `baseProgram`). **plants-p12 148/148**: no report other than the full re-keyed base reads 0 in `--base` against the full route (1 of 18); F6 reads 0 in **0 of 40 rows**; F7's ten rows exit **2** (the critic's own `f7.sh`, run by path: 10/10 rc 2, "never-0 rows reading 0: 0") |
| the extent sweep (P11-G2) | §1: every judge that compares two inputs, what each must cover of the other, and its reading when it does not |
| chain | unchanged: 126 steps, no frozen file touched. S69 is still the last gate step and S70 the one rebind (2,920,386, unchanged) |
| replay | **`6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf`** over 1,587 files, MATCH from two fresh HEAD worktrees: r1 `--twice` 649.7 s (load 32.8 → 13.8), every one of 126 steps idempotent, rerun a no-op in 0.4 s; r2 311.1 s (load 15.4 → 19.4). No patch: the floor row is committed |
| floor base | `6773b4ec1217ab416eea2e5ec1b79d39587c4201a70871d347e919d532f2cadb` over 1,354 files, cut by `floor/rows/apply.mjs` in a fresh worktree (`R/base-floor.txt`) |
| gate | **19/19 at 0**, exit 0; files 1,585, edges 8,350, modules 142/142, pin 142 / 122 / 1,320 / 2 reviewed, B10 anchored 39, peer held 23 |
| toolchain | build 0; `vue-tsc` ×2 0; demo build 0; `seal.test.ts` **26/26**; vitest **2,335 passed**, 10 expected-fail, 1 skipped, **0 failed** (275 files), `--maxWorkers=2` |
| package | verify:package **CLEAN at 2,920,386**, `equal: true`, `increase: false` |
| cascade | **GREEN** against the floor base, twice: the committed baseline and the floor base's own fresh snapshot (identical to the committed one on all four sequences); listed reorder `./styles`, risks 0; SCOPE Timeline → TimelineMarks 40 |
| `./motion-core` | keyframes-free on all three arms (names 55, dist 5 files, files 38, peers none); probe GREEN |
| browser | selection re-derived: 155 specs, 14 captures excluded, `specs.txt`, `captures.txt`, `changed.txt`, `moved.json` **byte-identical** to the committed selection. Pass 12 changes no code, so no spec is touched and no browser runs (§8). Tally through the cured judge: **428 base-green, 428 held, 0 failed, 0 absent, 0 unbased**, GREEN; the p10 and p11 pairs on their own GREEN (33/33, 3/3) |
| regressions | §6: pass 11's route battery 115/116, its one change the cure itself (a re-keyed base rerun in `--base` now exits 2); p10 105/105, p9 43/43, p8 27/27, p7 17/17, p6 20/20; the pass-11 critic's hashed battery (`317fd849…`, by path) with its pass-10 and pass-9 batteries inside it; fix10, extra9, fd4, the floor plant |
| W-D.1 §0 | 0 / 1 / 5 / cured / 3, byte-identical to pass 11's measurement |
| 27 items | route claims 27/27 closed (§9) |

---

## §1 · Kit work (no digest change): S-14's extent

### The coverage cure (P11-G1, P11-R1 (a))

`tools/browser-tally.mjs` now reads the chain's base↔route map before it tallies:

- **The map** (`lib/follow.mjs`). `chainSteps()` reads every frozen step with what each row creates; `chainOrigin()` walks a final-tree path backward through the same journey `follow()` walks forward (move pairs inverted, row-move pairs inverted, a path a row creates with no row-move pair has no origin) and throws when `follow(origin(p)) !== p`. `baseProgram()` reads the floor base's Playwright program from committed bytes: every `tests-visual/**/*.spec.ts` at the chain's `baseSha` (`16e907cb`), read with `git ls-tree`, capture specs excluded (the base config's `testDir` is `.` and its `testMatch` `*.spec.ts`; no floor row touches `tests-visual`). On the committed reports: the program holds **153** specs; the full route's 155 specs have **153** base origins, all in the program, and **2** with none (`chip-accent-band.visual.ts`, `w1-radius-redress-inputs.spec.ts`, both created by rows S48 and S43d); `chainOrigin` inverts `follow` on all 153 base specs.
- **Spec grain, a throw.** Every `--route` spec with a base origin must have results in `--base`; otherwise "a partial base judged against a fuller route is no verdict" (exit 2). This is the ruled rule (P11-R1 (a)).
- **Key grain, a verdict.** Inside a covered spec, a route key the base lacks is **UNBASED**: printed and counted against the bar (RED). It is a verdict, not a throw, because the two reports alone cannot say which side is short: a base with one result deleted and a route that carries a test the base does not have read the same. The chain adds no test to a base-origin spec (unbased 0 on every committed pairing).
- **No base origin.** A route spec the chain creates, or one no base-program spec reaches, holds no base-green test: printed `UNKEYED` and judged for nothing (as before). A capture spec in `--route` is a throw (LAW §13: no run selects one).
- **Unchanged.** The rerun slots stay partial (P7-R2). The summary line keeps its pass-8 shape, and the extent lines follow it, because earlier batteries parse the first "held … N" of the output (§6, runs 2-3).
- `lib/sequence.mjs`: `readSeq` read an absent `SEQUENCE.json` as `null`; it now throws with the platform's ENOENT (no caller had a reading for absence; the plant is ORIGIN's last row).
- LAW §14 drops "the caller names which is which by the slot" and states the extent (pass 12).

### The extent sweep (P11-G2): what each compared input must cover of the other

| judge | input A | input B | A must cover of B | B must cover of A | reading when it does not |
|---|---|---|---|---|---|
| `browser-tally` | `--base` (a re-keyed base) | `--route` (a route run) | every route spec with a base origin (spec grain) | — (the bar: every base-green key) | A short at spec grain: **throw** (2). A short at key grain inside a covered spec: **UNBASED**, RED (1). B short: the key is **absent**, RED (1) (a route rerun or a touched-spec route as `--route` against the full base reads RED, never 0) |
| `browser-tally` | `--base-rerun` (re-keyed) | `--base` | nothing: partial by design (P7-R2) | — | a rerun key `--base` does not hold is read for nothing; a rerun can make a base-green key flaky, never make a key base-green |
| `browser-tally` | `--route-rerun` (route kind) | `--route` | nothing: partial by design | — | a rerun can make a held key failed (RED), never clear one: "held" needs every route run that ran the key to pass it |
| `browser-tally` | each slot | the route | `testDir` equal to the route's | — | throw (2), as pass 10 |
| `browser-tally` | the route's bands | the route's results | nothing (printed per band) | — | a printed label |
| `rekey` | `<base>` (a base run) | `<tree>` (the chain's final tree) | — | every base spec the chain carries lands on a file of the tree | throw (2), as pass 11 (`unmapped` 0 on every committed base) |
| `rekey` | `<tree>` | the chain | code digest = the chain's final | — | throw (2), as pass 11 |
| `rekey` | `<base>` | the tree's program | nothing: a base rerun or a touched-spec base is a legitimate input | — | coverage is judged where the reports meet, in the tally |
| `browser-select` | `--root` | `frozen/SEQUENCE.json` | code digest = the chain's final (byte-level coverage) | every step's frozen file holds a move list or a row (floor rows excepted) | throw (2), as passes 10-11 |
| `browser-select` | a row path | the tree | — | — | held by the tree: `changed`; not held and not removed: moved by a later step, whose list carries it (pass 11 §1, stated) |
| `peer-closure` | `--base` (the probe's floor-base report) | the tree's declared-free entries | every declared-free entry, with three `broken` lists | — | throw (2), as pass 10 (`baseArms`) |
| `peer-closure` | the tree | `--base` | nothing: a base entry the tree does not declare free is read for nothing (it cannot be broken on the tree) | — | stated |
| `peer-closure --floor-base` | the tree | the chain | code digest = S1's | — | throw (2), as pass 11 |
| `browser-tally`, `rekey`, `browser-select`, `peer-closure` | `frozen/SEQUENCE.json` | — | present | — | throw (ENOENT) (pass 12; was `null`) |
| `browser-tally` | `baseSha` | git | the commit is readable, the program non-empty | — | throw (2) |

Every `??` and `||` left in the four judges is unchanged from pass 11's sweep (pass-11 B-proto §1): printed labels, a counter, the guard's label. The new code adds none.

---

## §2 · The floor

No floor row is owed (§P11-6.2). The floor base was cut fresh by `floor/rows/apply.mjs` on `f6abfaab`: tree digest `6f66e39f…`, code digest **`6773b4ec…`**, pass 11's. The floor plant (P11-F1) on its landed engine reads **KEPT** (`R/floor.txt`).

---

## §3 · The chain

Unchanged: `frozen/` and `authored/` are byte-identical to pass 11's; 126 steps; S74b lands at `1da6d092…`; S69 the last gate step, S70 the one rebind of the datum. `lib/follow.mjs` and `lib/sequence.mjs` are kit modules the replay reads but no step lands, so the digest cannot move, and does not (§4).

---

## §4 · Replay and digest

`tools/replays-p12.sh`, one heavy guard run (queued 10:36:55Z, admitted 10:42:23Z):

| run | worktree | wall | digest | rerun | load start → end |
|---|---|---:|---|---|---|
| **r1 `--twice`** | `wt`, fresh HEAD (`d24aa8c8`) | **649.7 s** | **`6fdd4ec7…` MATCH**, every one of 126 steps idempotent | **0.4 s no-op** ("the chain is applied") | 32.8 → 13.8 |
| **r2** | `wt2`, fresh HEAD (`f6abfaab`) | **311.1 s** | **`6fdd4ec7…` MATCH** | — | 15.4 → 19.4 |

Digest `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files (`R/replay-r1.txt`, `R/replay-r1-rerun.txt`, `R/replay-r2.txt`, `R/replay-worktrees.txt`). The r1 tree reads the same digest after every battery family of every run (`R/digest-after-batteries.txt`, `R/critic11/digest-after.txt`, and the same files under `R/batteries-run{1,2,3}/`). Timings are not verdicts.

---

## §5 · Gate, toolchain, package, cascade, peer

`tools/toolchain.sh` on r1 with the floor base, inside the heavy run that also carried battery run 1 (admitted 11:13:19Z, toolchain done 11:17:53Z; `R/toolchain-r1.txt`):

| check | exit | time | load start → end |
|---|---:|---:|---|
| seal (unbuilt): **B0-B18 0**, files 1,585, edges 8,350, modules 142/142, pin 142/122/1,320/2, B10 anchored 39, peer held 23 | 0 | 5 s | 18.1 → 18.7 |
| peer probe on the unbuilt tree (expect 2) | **2** | 3 s | 18.7 → 18.4 |
| base `vite build` | 0 | 9 s | 18.4 |
| base cascade snapshot: all four sequences identical to the committed baseline | 0 | 1 s | 18.4 → 18.1 |
| base peer probe (expect 1, P7-G5) | 1 | 3 s | 18.1 |
| `vite build` | 0 | 9 s | 19.0 → 19.8 |
| verify:package: **CLEAN**, ratchet PRESENT, datum **2,920,386**, `equal: true`, `increase: false` | 0 | 36 s | 19.8 → 22.5 |
| `vue-tsc` / `-p tsconfig.test.json` | 0 / 0 | 10 / 11 s | 22.5 → 25.7 |
| `demo:dist:build` | 0 | 2 s | 25.7 |
| cascade verify against the floor base, the committed baseline: **GREEN** (`./styles` listed reorder, risks 0; SCOPE Timeline → TimelineMarks 40) | 0 | 1 s | 25.7 |
| the same against the floor base's own fresh snapshot: **GREEN** | 0 | 1 s | 25.7 → 25.9 |
| peer probe (built): `./motion-core` kept, names 55, dist 5 files, files 38, peers none; **GREEN** | 0 | 3 s | 25.9 |
| `seal.test.ts` (`--maxWorkers=2`): **26/26** | 0 | 41 s | 24.8 → 21.6 |
| vitest full (`--maxWorkers=2`): 275 files, **2,335 passed**, 10 expected-fail, 1 skipped, **0 failed** | 0 | 132 s | 21.6 → 23.9 |

**Toolchain:** Node v26.0.0, vite 8.1.5, vue-tsc 6.0.3, vitest 4.1.10, TypeScript 6.0.3, Playwright 1.61.1, macOS 26.4.1. **Pack** (`R/pack/pack-diff-r1.json`): floor 2,913,546 → route 2,920,386 (+6,840; files 838 → 921), classes as pass 11's.

---

## §6 · Plants

The batteries ran four times (`tools/batteries-p12.sh`, one heavy guard run each). Runs 1-3 each found a defect in this seat's own cure through an earlier battery; each run's full output is kept (`R/batteries-run1/`, `-run2/`, `-run3/`), and run 4 is the result.

| run | what an earlier battery read | the cure |
|---|---|---|
| 1 (11:18-11:43Z) | the pass-8 critic's `browser-plants` T3 (a base-green key removed, its title added under an invented spec; expected RED with the key ABSENT) read **2**: run 1's tally threw on any route key of a covered spec that the base lacked | key grain became a verdict: **UNBASED**, RED (§1) |
| 2 (11:46-12:12Z) | T3 still **2**: the origin rule took an untouched path as its own origin, so the invented spec read as a base spec the base lacked; and T0/T1 read `held 0`, because a third count inside the summary line moved the number the plants parse | the base program read at `baseSha` (§1); the summary line restored to its pass-8 shape |
| 3 (12:16-12:43Z) | T3 PASS; T0/T1 still `held 0`: the `extent:` line printed before the summary carried "not held) 0", the first "held … N" of the output | the extent lines follow the summary and drop the word |
| 4 (12:45-13:16Z, load 24.4 → 20.8) | every earlier battery as its author's run, but for the rows named below; `browser-plants` T0 held 428, T1-T4 PASS (identical to the critic's run) | — |

### Pass-12 battery: plants-p12 148/148 (run 4)

`tools/plants-p12.mjs` (`R/plants-p12.txt`, `.json`; planted reports under `R/plants/`):

| group | n | what it showed |
|---|---:|---|
| SLOT | 90 | the 18 committed `browser-seat/2` reports (full base raw and re-keyed; three base reruns raw and re-keyed; the p10 and p11 bases raw and re-keyed; the full route; three route reruns; the p10 and p11 routes) in each of the tally's four slots against the full pair, and as `rekey`'s base. In `--base` against the full route (every rerun in its slot): **only the full re-keyed base reads 0**; the other 17 exit 2. In `--base-rerun` every re-keyed kind reads a verdict, the rest 2; in `--route` and `--route-rerun` every route kind reads a verdict (the partial routes RED: their missing keys absent), the rest 2; `rekey` takes the six raw base runs (0) and refuses the other twelve (2) |
| F6 | 40 | one base-green key of the full route failing (`expandable-container.visual.ts :: (a) inline renders real canvas…`): through all 18 reports in `--base`, alone and with every rerun and both pairs in their slots: **the full re-keyed base reads 1, the other 34 rows 2, none 0**. The ten F7 rows (each base rerun and each pair's base, alone and with reruns) are among them, each 2. The failing route as a route rerun: 1; as a base rerun: 2; through `rekey`: 2 |
| PAIR | 5 | each touched-spec pair on its own: 0 (p10 33/33, p11 3/3); each pair with one base-green key of its route failing: 1; the full pair with every rerun and both pairs as reruns: 0 |
| DEL | 5 | the full re-keyed base without one base-origin spec's results: **2** ("holds no results for 1 of the route's 153"); without one base-green key: **1** (UNBASED); without the failing key, against the failing route (the masking shape): **1**, never 0. Controls: the full route without the 2 created specs: 0; without one base-origin spec: 1 (absent) |
| ORIGIN | 8 | a route spec no base spec reaches (a `tests-visual` path, a `.visual.ts` path): 0, judged for nothing; a capture spec in `--route`: 2; pass 8's T3 shape: 1, the key ABSENT; in process: 2 created + 153 base-origin of 155, the base program 153 with every origin in it, `chainOrigin` inverts `follow` on all 153 base specs, a kit with no `SEQUENCE.json` throws ENOENT |

**F7 by the critic's own probe** (`pass-11/critique-B/tools/f7.sh`, by path, over this kit through a scratch shim whose `results/p11/browser` is `R/browser`; `R/f7.txt`): F7-ctl 1 and F7-ctl-with-reruns 1 (RED); the ten rows **rc 2**; "never-0 rows reading 0: **0**" (pass 11: 10).

### Regressions on the pass-12 tree (run 4)

| battery | result | file |
|---|---|---|
| pass 11's route battery | **115/116**. The one changed row is `KIND tally --base <- a base rerun, re-keyed (the kind it takes)`: pass 11 read a verdict, it now exits 2 ("holds no results for 151 of the route's 153 base-origin spec(s)"). That is the cure (cB11 O-1), not a regression | `R/plants-p11.txt` |
| pass 10's / 9's / 8's / 7's / 6's | 105/105 · 43/43 · 27/27 · 17/17 · 20/20 | `R/plants-p{10,9,8,7,6}.txt` |
| the pass-11 critic's hashed battery (`317fd849…`, `run11.sh` by path, unmodified) | judges11 **161 pass / 4 fail**, identical to its own run except the two INFO rows that took a partial re-keyed base in `--base` (`KM-tally-base-rekeyed-base-rerun`, `KM-tally-base-steps-rekeyed-base`): rc 0 → **2**. The 4 FAIL rows are its own disclosed controls run without the base reruns (cB11 §7), as in its run. browser11 6/0 (BW6 differs only in the path it prints). floor-landed identical. route-batt INFO: the kit has no `tools/batteries.sh` (its runner is `batteries-p12.sh`) | `R/critic11/` |
| through it, pass 10's hashed battery (`7b7b5303…`) | judges10 **145/0**, plants10, migration10 identical to the critic's run; browser10 and pass 9's browser-plants: see the run-4 rows below | `R/critic11/p10-regress/` |
| through that, pass 9's (`748826fb…`) | **regress 402 rows, 0 differ**; p8-plants identical; judge-throws **55/0** (52 in the critic's run: the tally now loads `lib/follow.mjs`, `lib/sequence.mjs` and `lib/digest.mjs`, each planted to throw, each 2; plus an INFO row for `plants-p12` with no arguments, 2); b18-inputs, flake9, plants9 identical; select-capture prints two more SC4 lines (LAW §14's new capture sentences, read as text); tree-probes FAIL lines identical (paths aside) | `R/critic11/p10-regress/p9-regress/` |
| plants10b, fix10b, fd4 (the critic's p10-post) | identical to the critic's run (output width aside) | `R/critic11/p10-post.txt` |
| the pass-10 critic's `fix10.sh` (re-pointed copy) | F1 ROWS 6/0; F3 0 / 0; F5 kit 0, tally10 0; **F6: the failing route as `--base` 2, `rekey` on it 2, the tally on its absent output 2** | `R/fix10.txt` |
| the pass-9 critic's `extra9.sh` (re-pointed copy) | BI3-fixed 2, BI5 2, PEERU U0-U5 as before, PX every degenerate `--base` 2, the leak 1, the gate on the leak B18 27 | `R/critic9x.txt` |
| pass 6's fd4-probe, re-pointed | A, G, G2, U, RESTORE **PASS** | `R/fd4.txt` |
| P11-F1's floor plant on the floor base | KEPT | `R/floor.txt` |

The results-path re-pointing of six regression tools (`results/p11/` → `results/p12/`, the same committed files) is printed by `diff` in `K/tools/repointed/RESULTS-PATHS-p12.txt`.

---

## §7 · W-D.1 §0 on the pass-12 tree

`R/wd1-measure.txt` (r1, built, light, load 15.8) and `R/chain-text.txt`: both **byte-identical to pass 11's** below their load line. One earlier attempt, run while battery run 1 was planting into the same tree, read a planted file and was discarded (not committed).

| # | item | pass 11 | pass 12 | disposition |
|---|---|---:|---:|---|
| 1 | VALUE-SCC (`d1-probe`, `src` only) | 0 | **0** | P9-R1 (a) |
| 2 | `Surface` names two symbols | 1 | 1 | W-D.1 §3 step 5 |
| 3 | bare type aliases | 5 | 5 | W-D.1 §3 step 5 |
| 4 | the chain's MIGRATION heading | cured | **cured**: `## 11.0.0`, 0 tranche lines | P9-R2 (a) |
| 5 | the consumer preset in `./tokens` | 3 | 3 | W-D.1 §3 step 7 |

W-C.2 over the chain's text: 129 lines added, one heading `## 11.0.0`; C2-G1 0 META added; C2-G4 base 33 · 26, route 34 · 26, 0 added; GREEN.

---

## §8 · The browser bar (S-12)

`tools/browser-p12.sh` (light; `R/browser/browser-p12.log`):

- **Selection**, re-derived by `browser-select.mjs` on r1 at the final digest into `R/browser/select-p12/`: 604 moves, 723 changed paths, **155 specs**, 14 captures excluded and printed; `specs.txt`, `captures.txt`, `changed.txt` and `moved.json` **byte-identical** to the committed selection (pass 8's, carried).
- **The re-keyed base**, re-derived by `rekey` from the committed `base.json`: 153 specs, 866 results, `unmapped` 0, results identical to the committed `base-rekeyed.json`, which it replaces (its `rekeyedFrom.report` now names this kit's `base.json`).
- **No spec is touched.** Pass 12 changes no `src` file and no code line on either tree (the kit only), so the graph's selection of its changes is empty and no browser runs: §P11-6.2 step 2 ("the committed reports stand and the tally is re-run through the cured judge"). The full graph-selected runs are pass 8's, carried by a route tree byte-identical to the one they judged (`6fdd4ec7…`) and a byte-identical selection, with the p10 and p11 touched-spec pairs (G-1).
- **The tally** (`R/browser/tally.txt`, exit 0) through the cured judge: the committed full runs, the six P7-R2 reruns, and the p10 and p11 pairs as reruns (6 runs per tree): base keys 866, route keys 867; extent: 153 base-origin specs covered, 0 unbased, 2 specs with no base origin; **base-green 428; held 428; not held 0 (failed 0, absent 0); unbased 0**; flaky 1 out of the bar (blob D2: base expected, then unexpected ×3 in its reruns); base-red route-green 1; **verdict GREEN: every base-green key is accounted for, 428 held + 0 failed + 0 absent**.
- **Each pair on its own** (`R/browser/tally-p10-pair.txt`, `tally-p11-pair.txt`): GREEN, 33 held of 33; GREEN, 3 held of 3.
- **Committed under `pass-12/B-kit/results/p12/browser/`:** the selection (`specs.txt`, `captures.txt`, `changed.txt`, `moved.json`, `selection.json`, `select-p12/`), both full `/2` reports (`base.json`, `route.json`) with `base-rekeyed.json`, the reruns, both touched-spec pairs, and the tallies.

---

## §9 · The 27 items

| item | entering pass 12 | route's status | what holds it |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | the kit, every result, the selection and both `/2` report sets are under `pass-12/` for the driver's commit before the critic |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P6-R1..P10-R1 landed and measured as in pass 11; P11-R1 (a) landed in the kit (§1); the datum rebound once, at S70 (unchanged, 2,920,386) |
| S-04..S-08 | CLOSED | CLOSED | gate 19/19 at 0; the floor plant KEPT |
| S-09 | CLOSED | CLOSED | `6fdd4ec7…` from two fresh worktrees, r1 `--twice`, rerun a no-op |
| S-10 | CLOSED | CLOSED | cascade GREEN against the floor base `6773b4ec…`, the committed baseline and a fresh snapshot |
| S-11 | CLOSED | CLOSED | vitest 2,335 / 0 failed |
| S-12 | CLOSED | CLOSED | 428 held + 0 failed + 0 absent (0 unbased) through the cured tally; capture exclusion stated, printed (14), listed, and a capture spec in `--route` a throw |
| S-13 | CLOSED | CLOSED | regressions identical (§6) but for the rows the cure changes by design, each named; every earlier battery runnable on the pass-12 tree |
| S-14 | **OPEN** | **CLOSED (route's claim)** | B17 0; every gate throw exits 2; every kit judge exits 2 on a throw or a degenerate input on every input argument: every committed report kind in every slot (SLOT 90/90, KIND 45 + the cured row), a flag with no value (FLAG 50/50), **a partial report where a full one is required** (SLOT, DEL: a partial base in `--base` against a fuller route exits 2 in every committed case); no judge reads a malformed input as an all-clear: **F6 never 0 through every committed report in every slot** (0 of 40), F7 10/10 at 2 by the critic's own probe, a deleted base key reads RED, never GREEN; the extent sweep (§1) states every compared input's coverage |
| B-01 | CLOSED | CLOSED | every clause 0, B2 0; I7 caught (p7 battery) |
| B-02..B-06 | CLOSED | CLOSED | p6-p10 batteries identical in verdict; regress 402 rows 0 differ |
| B-07 | CLOSED | CLOSED | B15 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | B18 owns the class; its reader throws on a peer-less, whitespace-only and subpath-less row (p10 ROW 13/13, BI3-fixed 2); `./motion-core` keyframes-free on all three arms |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count:** 27 items, route claims 27 closed. The two-clean-passes count is 0 entering pass 12; the pass-12 critique decides whether it reaches 1.

---

## §10 · Open gaps

| id | gap | proposed disposition |
|---|---|---|
| G-1 | No browser ran in pass 12. The full graph-selected runs are pass 8's, carried with the p10 and p11 pairs; pass 12 changes no code, so its own selection is empty | none owed under §P11-6.2 step 2; a full repeat costs about 3.3 h (base) + 1.6 h (route) of one heavy slot at pass 8's timings |
| G-2 | Key grain is a verdict, not a throw: a base missing one key of a covered spec reads RED (UNBASED), never GREEN, but cannot be told from a route test the base lacks. The chain adds none (unbased 0 on every committed pairing) | a declared reading (LAW §14); a throw would turn pass 8's T3 plant from RED into no verdict (run 1) |
| G-3 | `baseProgram` reads the base program from git at `baseSha` and assumes no floor row touches `tests-visual` (true of all nine rows today; LAW states it). A floor row that adds or moves a spec would need the program read from the floor base instead | stated; the next floor row that touches `tests-visual` re-reads it |
| G-4 | Pass 11's G-4 (a forged `rekeyedFrom`) stands as a declared limit; the extent narrows it: a forged base must also cover the route's 153 base-origin specs | declared limit, as ruled |
| G-5 | Three battery runs found defects in this seat's own cure before the fourth was clean (§6). Each found it through an earlier battery, and each run's output is kept | none; disclosed |
| G-6 | W-D.1 §0 items 2, 3, 5 (1 / 5 / 3) | W-D.1 §3 steps 5 and 7 |
| G-7 | `.claude/worktrees/bl/D1/p11/` existed (empty) at the start of this seat | the driver's (§P11-6.2 step 1 expected it empty, and it is) |
| G-8 | Outside D1, unchanged: P7-G5, P5-G3, P5-G5, P5-G8, P9-G6, P10-G5, P11-G3 (FLOOR.md's stale symlink line) | tranche cursor / convergence record |
