# D1 · pass 13 · B-proto: sealed modules, flat

| field | value |
|---|---|
| seat | D1-B prototype, pass 13. Copies `pass-12/B-kit` to `pass-13/B-kit` and does the route work §P12-6.3 lists: the frozen-kit proof, P12-G1 (the base-program premise, measured read-only) and the re-measurement of §P11-6.4's bar from this pass's own runs. No judge, `lib/`, `LAW.md`, `frozen/`, `authored/` or floor file changes (§P12-6.1: the second clean pass judges the bytes the first one judged) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `45513b57f` (the pass-12 registry commit) at seat start and at every worktree cut (`R/replay-worktrees.txt`: wt, wt2, base, g1 all at `45513b57`). `git diff 6154d6ec HEAD -- . ':!docs'` is empty: the chain runs over 10.1.0's code, as in passes 7-12 |
| kit | `pass-13/B-kit/` = `pass-12/B-kit` without `results/` and without pass 12's four run scripts, plus `results/p13/`. The committed inputs are copied from `pass-12/B-kit/results/p12/` into `results/p13/`: the browser dir (the full `/2` runs, the six P7-R2 reruns, the p10 and p11 touched-spec pairs with their own tally records, the selection), the cascade baseline and the probe's base report. New run scripts: `replays-p13.sh`, `heavy-p13.sh`, `batteries-p13.sh`, `browser-p13.sh`, `light-p13.sh`; one new measurement tool, `floor-premise.mjs` (P12-G1; no judge imports it) |
| fences | worktrees `.claude/worktrees/bl/D1/p13/B-proto/{wt,wt2,base,g1}` only, each removed with `git worktree remove --force` (0 `bl/D1` worktrees listed after). Checkout writes: `pass-13/` only. Three slips, disclosed: (1) at seat start one `ls ~/.claude/guard/` listing ran inside a compound command (a directory listing of the guard dir, against the "never read ~/.claude" fence; no file was read and no number rests on it); (2) the copy's `rsync` excluded every `tally.txt` under `browser/`, which dropped the two committed pair records `p10-steps/tally.txt` and `p11-steps/tally.txt`; both were copied back from `pass-12/` after the batteries (no battery reads them; `diff -rq` against pass 12's browser dir now lists only `base-rekeyed.json`, §8); (3) the final `rm -rf` of the seat's `scratch/` (22 MB: the batteries' scratch and the f7 shim's symlinks) was denied by the permission system, so `.claude/worktrees/bl/D1/p13/B-proto/scratch/` and its parent remain (G-3) |
| machine | every run went through `~/.claude/guard/guarded`. Heavy: the replays with the floor base and P12-G1 (`--timeout 60`; queued 14:27:02Z, admitted 14:42Z, a 15-minute wait; done 14:57:39Z), then the toolchain with the batteries (`--timeout 150`; queued 14:58:02Z, admitted 14:59:08Z; done 15:26:32Z). Light (`--rss-gb 8 --timeout 30`): the browser bar and `light-p13.sh` (W-D.1, chain-text, the frozen-kit proof), run after the batteries so no measurement reads a planted file. No queue wait passed 30 min; no 13M refusal. No browser was launched (§8). Nothing is left running |

Citations: `R/` is `pass-13/B-kit/results/p13/`, `K/` is `pass-13/B-kit/`. Loads are the 1/5/15-minute averages logged at each run.

---

## §0 · In brief

| bar (§P12-6.4, = §P11-6.4) | result |
|---|---|
| frozen kit (S-01, S-13) | `diff -r pass-12/B-kit pass-13/B-kit` (results and run scripts excluded): **only the results-path re-pointing**, `results/p12` → `results/p13` in six regression tools (`R/frozen-kit.txt`, = `K/tools/repointed/RESULTS-PATHS-p13.txt`). sha256 of every file of `lib/`, `gate/`, `frozen/`, `authored/`, `derive/`, `LAW.md`, the kit's root scripts and the four judges: **355 files, 0 differ**. `floor/` and `pass-12/` against HEAD: 0 status lines, 0 diff lines |
| P12-G1 | the nine floor rows applied one by one to a fresh HEAD worktree touch **100 paths, 0 under `tests-visual`**; the per-row cut's code digest equals the floor base's (`6773b4ec…` both); `baseProgram()` at `baseSha` holds **153** specs, the floor base's own `tests-visual/**/*.spec.ts` minus captures **153**, differences 0 / 0. Verdict HELD (`R/floor-premise.txt`, `.json`) |
| replay | **`6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf`** over 1,587 files, MATCH from two fresh HEAD worktrees: r1 `--twice` 476.2 s, all 126 steps idempotent on their second apply, rerun a no-op in 0.3 s; r2 284.6 s |
| floor base | **`6773b4ec1217ab416eea2e5ec1b79d39587c4201a70871d347e919d532f2cadb`** over 1,354 files, cut fresh by `floor/rows/apply.mjs` (tree digest `55568333…`) |
| gate | **19/19 at 0** (B0-B18), exit 0; files 1,585, edges 8,350, modules 142/142, pin 142 / 122 / 1,320 / 2 reviewed, B10 anchored 39, peer held 23 |
| toolchain | build 0; `vue-tsc` ×2 0; demo build 0; `seal.test.ts` **26/26**; vitest **2,335 passed**, 10 expected-fail, 1 skipped, **0 failed** (275 files), `--maxWorkers=2` |
| package | verify:package **CLEAN at 2,920,386**, ratchet PRESENT, `equal: true`, `increase: false`; pack floor 2,913,546 → route 2,920,386 (+6,840; files 838 → 921) |
| cascade | **GREEN** against the floor base, twice: the committed baseline and the floor base's fresh snapshot (identical to the committed one on all four sequences); listed reorder, risks 0; SCOPE Timeline → TimelineMarks 40 |
| `./motion-core` | keyframes-free on all three arms (names 55 → peers none; dist 5 files → none; files 38 → none); probe GREEN; base probe 1 (P7-G5), unbuilt probe 2 |
| browser | selection re-derived: 155 specs, 14 captures excluded and printed, `specs.txt`, `captures.txt`, `changed.txt`, `moved.json` **byte-identical** to the committed selection; re-key 153 specs, 866 results, `unmapped` 0, results identical to the committed re-keyed base. Tally **428 base-green, 428 held, 0 failed, 0 absent, 0 unbased**, GREEN; p10 pair 33/33, p11 pair 3/3. `tally.txt` and both pair tallies byte-identical to pass 12's below the first line. No browser run (§8) |
| regressions | plants-p12 **148/148**; plants-p11 115/116, p10 105/105, p9 43/43, p8 27/27, p7 17/17, p6 20/20, each identical to pass 12's; F7 **10/10 at 2**, "never-0 rows reading 0: 0"; the **pass-12 critic's hashed battery** (`run12.sh`, `c6fdf555…`, by path): judges12 **233/0**, browser12 **7/0**, its own run's numbers; through it pass 11's (`317fd849…`) judges11 161/4, judges10 145/0, regress 402 rows 0 differ, crash8 39/39, judge-throws 55/0 |
| floor plant | KEPT on the landed engine; **LOST** with line 168 of `scripts/structure/lib/move.mjs` put back to the pre-cure text (refused at the image check, lost 2; the tree restored to pass 10's `5b14c6c7…` by the plant); engine restored by sha256, floor base digest `6773b4ec…` after |
| W-D.1 §0 | 0 / 1 / 5 / cured / 3, byte-identical to pass 12's below the load line (the trailing rc label aside) |
| 27 items | route claims 27/27 closed (§9) |

---

## §1 · The frozen kit (§P12-6.2 step 2)

`tools/light-p13.sh` → `R/frozen-kit.txt` (light, 15:27:35Z, load 10.38 / 17.01 / 17.64):

- `diff -r -x results -x replays-p1[23].sh -x heavy-p1[23].sh -x batteries-p1[23].sh -x browser-p1[23].sh -x light-p13.sh -x floor-premise.mjs -x RESULTS-PATHS-p13.txt pass-12/B-kit pass-13/B-kit` prints exactly six files, each a `results/p12` → `results/p13` path: `tools/critic9-extra.sh` (3 lines), `tools/plants-p10.mjs`, `tools/plants-p7.mjs`, `tools/plants-p8.mjs`, `tools/plants-p9.mjs`, `tools/repointed/pass-10-fix10.sh` (1 line each). The same set as pass 12's `RESULTS-PATHS-p12.txt`; printed again in `K/tools/repointed/RESULTS-PATHS-p13.txt`.
- **355 files** of the frozen parts (`lib/`, `gate/`, `frozen/`, `authored/`, `derive/`, `LAW.md`, `replay.mjs`, `apply-row.mjs`, `rebase.mjs`, `record-step.mjs`, `truncate-seq.mjs`, `tools/browser-tally.mjs`, `tools/rekey.mjs`, `tools/browser-select.mjs`, `tools/peer-closure.mjs`) hashed on both kits: **0 differ**. This ran after the batteries, so no battery left a byte in the kit.
- `structure/floor/` and `structure/pass-12/` against HEAD: no status line, no diff line.

**What is new in the kit, all outside the frozen parts.** `tools/{replays,heavy,batteries,browser}-p13.sh` replace pass 12's four scripts. `batteries-p13.sh` keeps pass 12's four-argument signature (built tree, unbuilt tree, floor base, scratch; cB12 I-3); its families are pass 12's, with two changes: the pass-11 critic's battery is now reached through the pass-12 critic's `run12.sh` (which runs `run11.sh` by path), and a `floor-lost` family puts line 168 back to its pre-cure text (§6). `light-p13.sh` and `floor-premise.mjs` are new (§1, §2, §7).

---

## §2 · The floor and P12-G1

No floor row is owed (§P12-6.1). `replays-p13.sh` cut the floor base on `45513b57` with `floor/rows/apply.mjs`: the nine rows, tree digest `555683338e76…`, code digest **`6773b4ec…`** over 1,354 files (`R/base-floor.txt`), pass 11's and pass 12's.

**P12-G1** (`K/tools/floor-premise.mjs` on a fourth fresh HEAD worktree `g1`, inside the replays' heavy run, 14:56:22-14:57:34Z, load 16.32 → 17.26; `R/floor-premise.txt` lists every touched path, `R/floor-premise.json` the same as data). The tool applies the rows one at a time with `apply.mjs`'s commands and order and takes a content walk of the tree before and after each (node_modules, dist and .git excluded):

| row | paths touched | under `tests-visual` |
|---|---:|---:|
| r1-register-retire | 2 | 0 |
| f3-entry-record | 9 | 0 |
| f4-terminal-role | 2 | 0 |
| m02-overlay-host | 3 | 0 |
| m03-roving-move | 5 | 0 |
| f9-wire | 1 | 0 |
| fd6-harness | 3 | 0 |
| fd7-programs | 4 | 0 |
| fd11-land | 71 | 0 |
| **total** | **100** | **0** |

- The per-row cut reads code digest `6773b4ec…` over 1,354 files, equal to `apply.mjs`'s floor base: the listing describes the floor base the chain and every judge read.
- `baseProgram()` (the kit's `lib/follow.mjs`, git at `baseSha` `16e907cb`): **153** specs. The floor base's own program (every `tests-visual/**/*.spec.ts` on the base worktree, a `_` basename excluded): **153**. In `baseProgram` only: 0. On the floor base only: 0.
- Verdict **HELD**, exit 0. S-14's extent premise ("no floor row touches `tests-visual`", LAW §14) is now a measured fact in a committed result.

---

## §3 · The chain

Unchanged: `frozen/` and `authored/` byte-identical to pass 12's (§1); 126 steps; S69 the last gate step, S70 the one rebind of the datum (2,920,386).

---

## §4 · Replay and digest

`tools/replays-p13.sh`, one heavy guard run (`R/replays-run.txt`):

| run | worktree | wall | digest | rerun | load start → end |
|---|---|---:|---|---|---|
| **r1 `--twice`** | `wt`, fresh HEAD (`45513b57`) | **476.2 s** | **`6fdd4ec7…` MATCH**; every one of 126 steps applied a second time writes nothing (each "again:" reads `row 0 written`, `moves 0 pending` or the floor rows' applied state) | **0.3 s no-op** ("the chain is applied") | 16.08 → 8.91 |
| **r2** | `wt2`, fresh HEAD (`45513b57`) | **284.6 s** | **`6fdd4ec7…` MATCH** | — | 10.41 → 11.50 |

Digest `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files (`R/replay-r1.txt`, `R/replay-r1-rerun.txt`, `R/replay-r2.txt`). The r1 tree reads the same digest before and after every battery family (`R/digest-after-batteries.txt`, 15 lines; `R/critic12/digest-after.txt` and the nested `digest-after.txt` files). Timings are not verdicts.

---

## §5 · Gate, toolchain, package, cascade, peer

`tools/toolchain.sh` on r1 with the floor base, the first half of the second heavy run (14:59:08-15:03:14Z; `R/toolchain-r1.txt`):

| check | exit | time | load start → end |
|---|---:|---:|---|
| seal (unbuilt): **B0-B18 0**, files 1,585, edges 8,350, modules 142/142, pin 142/122/1,320/2, B10 anchored 39, peer held 23 | 0 | 5 s | 19.73 |
| peer probe on the unbuilt tree (expect 2) | **2** | 3 s | 19.73 → 19.59 |
| base `vite build` | 0 | 8 s | 19.59 → 19.42 |
| base cascade snapshot: all four sequences identical to the committed baseline | 0 | 1 s | 19.42 |
| base peer probe (expect 1, P7-G5) | 1 | 3 s | 19.42 |
| `vite build` | 0 | 9 s | 20.67 → 21.49 |
| verify:package: **CLEAN**, claims 196, declarations 502, css 162; ratchet PRESENT, datum **2,920,386**, `equal: true`, `increase: false` | 0 | 32 s | 21.49 → 25.85 |
| `vue-tsc` / `-p tsconfig.test.json` | 0 / 0 | 10 / 9 s | 25.85 → 23.95 |
| `demo:dist:build` | 0 | 2 s | 23.95 |
| cascade verify against the floor base, the committed baseline: **GREEN** (listed reorder, risks 0; SCOPE Timeline → TimelineMarks 40) | 0 | 1 s | 23.95 |
| the same against the floor base's own fresh snapshot: **GREEN** | 0 | 1 s | 23.95 |
| peer probe (built): `.` and `./motion-core` kept; `./motion-core` names 55, dist 5 files, files 38, peers none; **GREEN** | 0 | 2 s | 23.95 |
| `seal.test.ts` (`--maxWorkers=2`): **26/26** | 0 | 35 s | 23.95 → 23.31 |
| vitest full (`--maxWorkers=2`): 275 files, **2,335 passed**, 10 expected-fail, 1 skipped, **0 failed** | 0 | 118 s | 23.31 → 20.14 |

**The gate's nineteen clauses** (LAW "The gate"), each read 0 on r1 (`R/seal-r1.txt`, `.json`):

| clause | reads | count |
|---|---|---:|
| B0 | F-1 violations; listings and computed-path reads into a sealed zone | 0 |
| B1 | door crossings, own-door imports | 0 |
| B2 | a consumer-zone reference that misses an entry source | 0 |
| B3 | a CSS crossing that misses the CSS door | 0 |
| B4 | sibling cycles, value and type, every depth; every module-grain value SCC nesting one node in another (P9-R1) | 0 |
| B5 | a door or sub-directory in a kind slot | 0 |
| B6 | over 12 direct files, over 500 lines | 0 |
| B7 | a sealed code dir with no door; script code behind a CSS-only door; a src door missing from `record.doors` | 0 |
| B8 | the kernel reads a unit; the library reads another zone | 0 |
| B9 | a door re-exports outside its module; a name on two entries | 0 |
| B10 | placement | 0 |
| B11 | unread internal-door names, empty doors, the pin | 0 |
| B12 | relays and declaration mirrors | 0 |
| B13 | a bin imported by anything but the harness | 0 |
| B14 | door purity | 0 |
| B15 | placeholder, provenance and repeated names; slot-named modules; a file named for another unit | 0 |
| B16 | a test outside its home's slot; a slot helper read from outside; a Playwright test the program does not collect | 0 |
| B17 | a masking fallback | 0 |
| B18 | a declared-free entry's names or files arm reaching a heavy peer, unless held exactly by the pin's `peerHolds`; a stale hold | 0 |

**Toolchain:** Node v26.0.0, vite 8.1.5, vue-tsc 6.0.3, vitest 4.1.10, TypeScript 6.0.3, Playwright 1.61.1, macOS 26.4.1. **Pack** (`R/pack/pack-diff-r1.json`): floor 2,913,546 → route 2,920,386 (+6,840; classes sum 6,840; files 838 → 921).

---

## §6 · Plants (regressions; the kit adds no battery)

`tools/batteries-p13.sh`, the second half of the second heavy run (15:03:14-15:26:28Z, load 20.14 → 14.86; peak 28.12 at critic12's end). One run; no defect found, so no re-run.

| battery | result | against | file |
|---|---|---|---|
| plants-p12 (SLOT, F6, PAIR, DEL, ORIGIN) | **148/148**: SLOT 90/90, F6 40/40, PAIR 5/5, DEL 5/5, ORIGIN 8/8; `--base` rows reading 0 against the full route: 1 (the full re-keyed base) | pass 12: identical | `R/plants-p12.txt`, `.json`, `R/plants/` |
| f7 (the pass-11 critic's `f7.sh`, by path, through the shim kit) | the ten rows rc **2**; "never-0 rows reading 0: **0**" | pass 12: identical | `R/f7.txt` |
| plants-p11 | 115/116 (KIND 45/46: the row the extent cure changed in pass 12) | pass 12: identical | `R/plants-p11.txt` |
| plants-p10 · p9 · p8 · p7 · p6 | 105/105 · 43/43 · 27/27 · 17/17 · 20/20 | pass 12: identical | `R/plants-p{10,9,8,7,6}.txt` |
| **the pass-12 critic's hashed battery** (`pass-12/critique-B/battery/run12.sh`, by path; hashes printed by it: this `c6fdf555…`, p11 `317fd849…`, p10 `7b7b5303…`, p9 `748826fb…`) | judges12 **233/0**; browser12 **7/0**; p11-post F7 10/10 at 2, "never-0 rows reading 0: 0"; route-batt-INFO: "no tools/batteries.sh in the kit" (its runner is `batteries-p13.sh`) | the critic's own run (`pass-12/critique-B/results/`): every verdict and summary identical; the differing lines are absolute paths, output width and the reports' new directory | `R/critic12.txt`, `R/critic12/` |
| through it, pass 11's (`run11.sh`) | judges11 161/4 (the 4 its own disclosed controls); browser11 6/0; floor-landed 8/0 | the critic's p11-regress: identical but BW6's printed path | `R/critic12/p11-regress/` |
| through that, pass 10's and pass 9's | judges10 **145/0**; migration10 5 pass / 5 fail, browser10 5 / 1, b18-inputs 5 / 1, each as in the critic's run (0 differing lines); **regress 402 rows, 0 differ**; p8-plants 11 same; judge-throws **55/0**; crash8 **39/39** | identical | `R/critic12/p11-regress/p10-regress/` |
| fix10 (re-pointed) | identical to pass 12's but for the kit path in one stack line; F6 rows 2 | pass 12 | `R/fix10.txt` |
| critic9x (re-pointed `extra9.sh`) | identical to pass 12's (normalized: 0 differing lines); the leak reads B18 27 | pass 12 | `R/critic9x.txt` |
| fd4 (pass 6's probe, re-pointed) | A, G, G2, U, RESTORE PASS; 0 differing lines | pass 12 | `R/fd4.txt` |
| floor (P11-F1's plant on the floor base) | **KEPT**, tree restored `6773b4ec…` | pass 12: 0 differing lines | `R/floor.txt` |
| floor-lost (new family) | line 168 put back to `bare.match(/^(\.\.\/)*/)`: **LOST**, rc 1 (the engine refused the move at the image check, lost 2); the engine restored by bytes, sha256 equal; the floor base reads `6773b4ec…` after | the critic's FP0 pre-cure row | `R/floor-lost.txt` |

---

## §7 · W-D.1 §0 on the pass-13 tree

`tools/light-p13.sh` on r1, built, after the batteries (light, load 10.38): `R/wd1-measure.txt` and `R/chain-text.txt` are **byte-identical to pass 12's** below their load line, but for the trailing rc line's label (`rc=0` → `wd1 rc=0`, `chain-text rc=0`).

| # | item | pass 12 | pass 13 | disposition |
|---|---|---:|---:|---|
| 1 | VALUE-SCC (`d1-probe`, `src` only) | 0 | **0** | P9-R1 (a) |
| 2 | `Surface` names two symbols | 1 | 1 | W-D.1 §3 step 5 |
| 3 | bare type aliases | 5 | 5 | W-D.1 §3 step 5 |
| 4 | the chain's MIGRATION heading | cured | **cured**: `## 11.0.0`, 0 lines naming BL or "tranche" | P9-R2 (a) |
| 5 | the consumer preset in `./tokens` | 3 | 3 | W-D.1 §3 step 7 |

W-C.2 over the chain's text: 129 lines added, one heading `## 11.0.0`; C2-G1 0 META added; C2-G4 base 33 · 26, route 34 · 26, 0 added; GREEN.

---

## §8 · The browser bar (S-12)

`tools/browser-p13.sh` (light, 15:27:24-15:27:26Z, load 8.77; `R/browser/browser-p13.log`):

- **Selection**, re-derived by `browser-select.mjs` on r1 at the final digest into `R/browser/select-p13/`: 604 moves, 723 changed paths, **155 specs** (program 155), 14 captures excluded and each printed with its steps; `specs.txt`, `captures.txt`, `changed.txt`, `moved.json` **byte-identical** to the committed selection (pass 8's, carried through pass 12).
- **The re-keyed base**, re-derived by `rekey` from the committed `base.json`: 153 specs, 866 results, `unmapped` 0, results identical to the committed `base-rekeyed.json`, which it replaces; the one field that differs is `rekeyedFrom.report`, now this kit's `base.json`.
- **No spec is touched, so no browser runs.** Pass 13 changes no file of either tree: the kit is frozen and only its results dir is new. The graph's selection of pass 13's changed paths is empty, and §P12-6.2 step 2 binds: "the committed reports stand and the tally re-runs, as pass 12". The task text for this seat also asks for a full graph-selected run against the floor base; the registry's plan, which the task names as the route work, says no run is owed, and this seat follows the registry (G-1).
- **The full `/2` reports**, committed under `R/browser/`: `base.json` and `route.json` are byte-identical to pass 12's (and pass 8's); the six reruns and both touched-spec pairs are the committed files. `diff -rq` against `pass-12/B-kit/results/p12/browser/` lists only `base-rekeyed.json` (the `rekeyedFrom.report` path) and the two run-named files (`browser-p1{2,3}.log`, `select-p1{2,3}/`).
- **The tally** (`R/browser/tally.txt`, exit 0), over the committed full pair, the six P7-R2 reruns and the p10 and p11 pairs as reruns (6 runs per tree): base keys 866, route keys 867; extent: `--base` covers the route's 153 base-origin specs, 0 unbased, 2 route specs with no base origin (`src/components/chip/__tests__/chip-accent-band.visual.ts`, `tests-visual/redress/w1-radius-redress-inputs.spec.ts`, rows S48 and S43d create them).

**Every base-green key accounted for:**

| count | value |
|---|---:|
| base-green keys | **428** |
| held | **428** |
| failed | 0 |
| absent | 0 |
| unbased | 0 |
| held + failed + absent | 428 = base-green |
| flaky, out of the bar (blob D2: base expected, then unexpected ×3 in its reruns) | 1 |
| base-red route-green | 1 |
| verdict | **GREEN** |

Each pair on its own (`R/browser/tally-p10-pair.txt`, `tally-p11-pair.txt`): GREEN 33/33, GREEN 3/3. All three tally files are byte-identical to pass 12's below the first line.

---

## §9 · The 27 items

| item | entering pass 13 | route's status | what holds it (this pass's measurement) |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | the kit, every result, the selection and both `/2` reports under `pass-13/` for the driver's commit before the critic; `K13` code byte-identical to `K12` (§1: 355 files, 0 differ; diff only the results paths) |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P6-R1..P11-R1 on their arms as landed; the datum rebound once, at S70 (2,920,386, `equal: true`) |
| S-04..S-08 | CLOSED | CLOSED | gate 19/19 at 0; the floor plant KEPT on the landed engine, LOST with line 168 reverted |
| S-09 | CLOSED | CLOSED | `6fdd4ec7…` from two fresh worktrees, r1 `--twice` with 126/126 steps idempotent, rerun a 0.3 s no-op |
| S-10 | CLOSED | CLOSED | cascade GREEN against `6773b4ec…`, the committed baseline and a fresh snapshot |
| S-11 | CLOSED | CLOSED | vitest 2,335 passed, 0 failed |
| S-12 | CLOSED | CLOSED | 428 held + 0 failed + 0 absent, 0 unbased; capture exclusion stated (LAW §13), printed (14), listed in `captures.txt`; a capture spec in `--route` a throw (plants-p12 ORIGIN) |
| S-13 | CLOSED | CLOSED | every earlier battery runnable on the pass-13 tree and identical in verdict, the pass-12 critic's hashed battery by path included (§6) |
| S-14 | CLOSED | CLOSED | B17 0; plants-p12 148/148 (every committed report in every slot; F6 never 0 in 40 rows; DEL a partial base 2); F7 10/10 at 2; judges12 233/0 (KIND × EXTENT, F6 through 86 rows, a degenerate `SEQUENCE.json`); judge-throws 55/0; the extent's premise measured (P12-G1, §2) |
| B-01 | CLOSED | CLOSED | every clause 0, B2 0; I7 caught (plants-p7 17/17) |
| B-02..B-06 | CLOSED | CLOSED | p6-p12 batteries identical; regress 402 rows, 0 differ |
| B-07 | CLOSED | CLOSED | B15 0 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | B18 0; its reader throws on a peer-less, whitespace-only and subpath-less row (plants-p10 ROW 13/13; critic9x BI3-fixed 2); `./motion-core` keyframes-free on all three arms |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count:** 27 items, route claims 27 closed. The two-clean-passes count enters pass 13 at 1; the pass-13 critique decides whether it reaches 2.

---

## §10 · Open gaps

| id | gap | proposed disposition |
|---|---|---|
| G-1 | No browser ran in pass 13. The seat's task text asked for a full graph-selected run against the floor base with both `/2` reports committed; §P12-6.2 step 2 says the committed reports stand, since pass 13 changes no file of either tree (its graph selection is empty). The committed `/2` reports are pass 8's, byte-identical, carried by a route tree byte-identical to the one they judged | none owed under §P12-6.2 step 2; a full repeat is about 3.3 h (base) + 1.6 h (route) of one heavy slot at pass 8's timings, if the agglomeration wants one |
| G-2 | The route's battery runner is `tools/batteries-p13.sh` (pass 12's four-argument signature), not `batteries-p12.sh` as §P12-6.4 names it; `run12.sh`'s route-batt family looks for `tools/batteries.sh` and prints INFO | the pass-13 critic runs `batteries-p13.sh` with the same four arguments |
| G-3 | `.claude/worktrees/bl/D1/p13/B-proto/scratch/` (22 MB, battery scratch and the f7 shim's symlinks) and its parent `B-proto/` remain: the seat's `rm -rf` was denied by the permission system. All four worktrees are removed (`git worktree list` shows no `bl/D1` entry) | the driver removes `.claude/worktrees/bl/D1/p13/B-proto/` |
| G-4 | The fence slips in the header: one `ls ~/.claude/guard/`; the two pair tally records restored after an over-broad `rsync` exclude | disclosed; no number rests on either |
| G-5 | W-D.1 §0 items 2, 3, 5 (1 / 5 / 3) | W-D.1 §3 steps 5 and 7 |
| G-6 | Outside D1, unchanged: P7-G5, P5-G3, P5-G5, P5-G8, P9-G6, P10-G5, P11-G3 (FLOOR.md's stale `tests-visual/node_modules` recipe line; this seat linked only the root `node_modules`, as pass 12) | tranche cursor / convergence record |

Declared limits unchanged (§P12-5): FP6-1..FP6-3, FP6-7, FP5-3, FP5-4, FP5-7; Bp11 G-4 with cB12 I-1 and I-2; Bp12 G-2. Bp12 G-3 (the base-program premise) is now measured: HELD (§2).
