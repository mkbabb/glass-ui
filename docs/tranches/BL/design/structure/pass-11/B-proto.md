# D1 · pass 11 · B-proto: sealed modules, flat

| field | value |
|---|---|
| seat | D1-B prototype, pass 11. Copies `pass-10/B-kit` to `pass-11/B-kit` and does the route work §P10-6.3 lists: P10-G1 (report kinds in `browser-tally` and `rekey`), P10-G2 (a flag with no value), the sweep over argument parsing and report kinds, P10-R1 (a) (the floor row, the floor base re-cut, S74c out, the chain carried onto the new floor), P10-G4 (the batteries that name a path S74d moved) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `16e907cb`. `git diff 6154d6ec HEAD -- . ':!docs'` is empty: the chain runs over 10.1.0's code, as in passes 7-10 |
| kit | `pass-11/B-kit/` (the pass-10 kit without its `results/`, plus `results/p11/`). Pass 10's committed inputs (the full `/2` runs, the P7-R2 reruns, pass 10's touched-spec pair, the cascade baseline, the base probe report) are copied into `results/p11/`. The seat makes no git write; the driver commits the kit, the floor row and this report before the critic launches (S-01) |
| floor row | `floor/lib/move.mjs:168` (one line) and `floor/FLOOR.md` (P11-F1, under F-2), with `pass-11/floor-row/P11-F1.patch` and `pass-11/plants/p11-floor-plant.mjs`. P10-G6 and P10-G7 were done by the driver before this seat (`.claude/worktrees/bl/D1/` held nothing at start) |
| fences | worktrees `.claude/worktrees/bl/D1/p11/B-proto/{wt,wt2,wt3,base,old,pre}` only, all removed (`git worktree remove --force`), then the `scratch/` dir and the `B-proto/` and `p11/` dirs. Checkout writes: `pass-11/` and the floor row's two files. One slip, self-reported: while re-pointing the regression tools' results path, one command copied five kit tools to `/tmp/.p11-orig-*` and deleted them in the same command (no file was read from them) |
| machine | every run went through `~/.claude/guard/guarded`: the rebase, the replays, the toolchain, the batteries and the browser run heavy (queue waits 8 min, 4 min, 12 min, 9 min, 10 min; none past 30 min); the rest `--light`. No 13M refusal. Chromium only (`chromium-headless-new`, `--workers=1` by the program's config); no WebKit run. Nothing is left running |

Citations: `R/` is `pass-11/B-kit/results/p11/`, `K/` is `pass-11/B-kit/`. Loads are the 1/5/15-minute averages logged at each run.

---

## §0 · In brief

| bar (§P10-6.4) | result |
|---|---|
| floor row (P10-R1 (a)) | `floor/lib/move.mjs:168` keeps a root-relative `./` lead; the plant moves a holder of `"./dist/index.d.ts"`: **LOST** (refused at the image check, 2 edges lost) on HEAD's floor, **KEPT** on the cured one, on the docs home's engine and on the landed one (`R/floor-plant-pre.txt`, `R/floor-plant.txt`) |
| floor base | re-cut by S1's own script: **`6773b4ec1217ab416eea2e5ec1b79d39587c4201a70871d347e919d532f2cadb`** over 1,354 files (pass 10: `5b14c6c7…`). The two cuts differ in one file, one line (`R/base-floor.txt`, `R/base-floor-vs-old.txt`) |
| chain | 127 → **126 steps**: S74c left the chain; every other frozen file unchanged. S1→S74b re-recorded at new digests; S74b now lands at `1da6d092…`, pass 10's post-S74c digest, so S74d→S70 replay to pass 10's digests exactly (`R/rebase.txt`). S69 is still the last gate step, S70 the one rebind |
| replay | digest **`6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf`** over 1,587 files, MATCH from two fresh HEAD worktrees: r1 `--twice` 547.4 s (load 23.9 → 19.7), rerun no-op 0.4 s; r2 417.8 s (load 21.0 → 22.7). The derive tree (a third fresh worktree) recorded the same final digest |
| gate | **19/19 at 0**, exit 0; files 1,585, edges 8,350, modules 142/142, pin 142 / 122 / 1,320 / 2 reviewed, B10 anchored 39, peer held 23 |
| toolchain | build 0; `vue-tsc` ×2 0; demo build 0; `seal.test.ts` **26/26**; vitest **2,335 passed**, 10 expected-fail, 1 skipped, 0 failed (275 files) |
| package | verify:package **CLEAN at 2,920,386**, `equal: true`; S70's row and digest are pass 10's, so the datum is unchanged (P10-R1 (a): the engine does not ship) |
| cascade | **GREEN** against the floor base, twice: the committed baseline, and the re-cut base's own snapshot (identical to the committed one on all four sequences) |
| `./motion-core` | keyframes-free on all three arms (names 55, dist 5 files, files 38); the base probe's broken arms equal the committed base report's |
| S-14 | the two judges refuse every wrong kind in every slot (KIND 46/46); F6 never 0 (13/13); every value-taking flag of every judge present with no value, followed by another flag or empty exits 2 (FLAG 50/50); trees are checked (TREE 6/6). **plants-p11 116/116** |
| regressions | p10 105/105, p9 43/43, p8 27/27, p7 17/17, p6 20/20; the pass-10 critic's hashed battery: judges10 **145/0** (its own run: 138/7, the seven O-1/O-2 rows), plants10, migration10 and browser10 verdict lines identical to its own run; the pass-9 critic's: judge-throws 52/0 (the new kit modules add 7 rows), regress **402 rows, 0 differ**, p8-plants 11 rows 0 differ, tree-probes identical (P6:FD4 still FAILs by its unpatched path; the re-pointed copy reads A, G, G2, U, RESTORE PASS); fix10 F6 never 0 |
| browser | selection re-derived: 155 specs, 14 captures excluded, `specs.txt`, `captures.txt`, `changed.txt`, `moved.json` byte-identical to pass 10's. Pass 11's change selects **1 spec** (the π floor). Run on both trees: 3 tests each, 3 pass, 0 new failures. Tally through the cured judges: **428 base-green, 428 held, 0 failed, 0 absent**, GREEN |
| W-D.1 §0 | 0 / 1 / 5 / cured / 3, as pass 10 |
| 27 items | route claims 27/27 closed (§9) |

---

## §1 · Kit work (no digest change): S-14

### P10-G1: report kinds

LAW §14 (pass 11) names the three kinds and the field that tells them apart in every committed report (census of all 39 `browser-seat/2` reports under `results/p10/` and `browser-p9/`):

| kind | `testDir` | `rekeyedFrom` |
|---|---|---|
| base run, full or rerun | `tests-visual` | absent |
| re-keyed base, full or rerun | `.` | `{ report, testDir: "tests-visual" }` |
| route run, full or rerun | `.` | absent (`baseReport` set on the full run, `null` on a rerun) |

- `tools/browser-tally.mjs`: `--route` and every `--route-rerun` must carry no `rekeyedFrom` key (`ROUTE_SLOT`); `--base` and every `--base-rerun` must carry `rekeyedFrom` as an object whose `testDir` is a string other than the route's (`BASE_SLOT`), and be keyed from the route's `testDir` (as before). The route is read first, so every base slot is judged against it. `baseReport` is not read.
- `tools/rekey.mjs`: its base must carry no `rekeyedFrom` key and a `testDir` other than `.` (a route run or rerun is refused). Its tree must be at the chain's final code digest. A base spec the chain carries to no file of the tree is now a throw (pass 10 listed it as `unmapped` and dropped its keys, so a wrong tree, or a chain that deletes a spec, removed base-green keys from the bar silently; on the committed reports `unmapped` is 0 in every case).
- A full run and a rerun of one kind carry the same fields; the slot names which is which. A forged `rekeyedFrom` on a route report reads as its fields say: the kind is the field (§10 G-4).

### P10-G2: a flag with no value

`lib/argv.mjs` (new) reads each judge's whole command line from the grammar the judge names: an option it does not take, a value-taking option with no value (last), with an empty value or followed by another option, a single-valued option twice, a switch twice, an empty argument and a surplus positional are throws. The four judges use it. `arg` in `lib/floor.mjs` (the derive tools' reader) applies the same value rule. LAW §14's table lists every option with its absent and present-empty reading.

### The sweep (argument parsing and report kinds, the four judges)

Every `??` and `||` left, and every other place a judge reads an input's presence or kind:

| judge:line | expression or read | reading |
|---|---|---|
| all four (tally:37, rekey:26, peer:42, select:34) | `e?.stack ?? e` | the guard's printed label |
| tally:46, rekey:42 | `r?.$schema ?? "unversioned"` | a label inside the schema throw |
| tally:49, 53, 65; rekey:43, 50; peer:61, 69, 76; select:43, 58 | `!… \|\| …` | the throws themselves |
| tally:58, select:43, peer `--root` | `A.value(k) === null` | a required option absent: a throw |
| peer `--table` | `A.value("--table") !== null ? … : PEER_TABLE` | absent: the one table (P8-R3), stated |
| peer `--base` | `baseFile !== null ? readBase(…) : null` | absent: every break is the chain's (planted LEAK "no --base" exit 1) |
| peer `--overlay`, `--json` | absent: no overlay, no record | stated |
| peer `--floor-base` | the tree must be at S1's digest; a `--base` beside it is a throw | new (TREE) |
| peer:117 | `entry in P.declared.free ? … : []` | an entry the table does not declare free may bear any peer (stated) |
| peer:150, 156-157 | `… ?? "may bear a peer"`, `… \|\| "kept"`, `… \|\| "none"` | printed labels |
| tally:72 | `n.get(k) ?? 0` | a counter |
| tally:101, 119 | `… \|\| "absent"`, `… \|\| "none (a new test)"` | printed labels |
| tally, every slot | `ROUTE_SLOT`, `BASE_SLOT`, testDir equality | the kind (above) |
| rekey:54 | `map.has \|\| unmapped.has` | a set test; any unmapped spec then throws |
| rekey `<tree>` | `package.json` held, code digest = the chain's final | throws |
| select:54 | `s.kind === "floor-rows"` → continue | the one step with no frozen file (stated) |
| select:61-62 | a row path the tree holds is `changed`; one it does not hold and the row does not remove is skipped | the path was moved by a later step, whose move list carries it (both paths are touched) |
| select `--root` | code digest = the chain's final | a throw (new) |
| select:77 | `changed.has(p) ? ["row"] : []` | a set test |

---

## §2 · The floor row (P10-R1 (a))

- **The cure.** `floor/lib/move.mjs:168`: `bare.match(/^(\.\.\/)*/)` → `bare.match(/^(?:\.\/|(?:\.\.\/)*)/)`, the exact line pass 10's S74c wrote into the landed copy (`floor-row/P11-F1.patch`). `FLOOR.md` F-2 gains "The root-relative lead (P11-F1, P10-R1 (a))".
- **The plant** (`pass-11/plants/p11-floor-plant.mjs`; exit 0 KEPT, 1 LOST, 2 no verdict; the tree's code digest checked restored after each run):

| engine | before the cure | after |
|---|---|---|
| the docs home's (`floor/move.mjs`, a fresh HEAD worktree, pre-S1) | LOST: refused at phase `image`, residue 0, lost 2 (rc 1) | KEPT (rc 0) |
| the landed one (`scripts/structure/move.mjs`, after S1) | LOST, the same refusal (rc 1) | KEPT (rc 0) |

  Loads 22-26 (`R/floor-plant-pre.txt`, `R/floor-plant.txt`); the battery's FLOOR row re-reads KEPT on the floor base.
- **The floor base, re-cut** by `floor/rows/apply.mjs` on HEAD + the patch: tree digest `be13a8c6…`, code digest `6773b4ec…` over 1,354 files (`R/base-floor.txt`). The old floor cut by the same script reads `5b14c6c7…`, pass 10's; `diff -rq` between the two cuts names one file, `scripts/structure/lib/move.mjs`, and `diff` one line, 168 (`R/base-floor-vs-old.txt`). `src`, `dist`, the cascade baseline and the base probe report are unchanged (§5).
- **Until the driver commits the row**, HEAD's docs floor lacks it, and `fd11-land` lands the floor from the worktree's own docs copy. Every worktree of this seat (derive, replays, base) therefore took `P11-F1.patch` first. `docs/` is outside the code digest, so the chain's base digest is unchanged (`35f7b831…`). After the commit a fresh HEAD worktree needs nothing.

---

## §3 · The chain

`rebase.mjs` (rewritten for pass 11) starts the chain at the tree's base, lands S1 from the checkout's floor, and applies each pass-10 step's frozen file through the replay's writers, with `--drop S74c`; a step that writes nothing would throw (`recordStep`). `frozen/S74c-engine-dot-lead.json` and `authored/p10-engine-dot-lead.mjs` are deleted; `derive/chain.sh` drops S74c from its order and its case list (`R/rebase.txt`, 07:48-07:53Z, load 22 → 10).

| steps | digest | against pass 10 |
|---|---|---|
| base | `35f7b831…` | equal |
| S1 | `6773b4ec…` | differs (the floor row) |
| S1b … S74 (101 steps) | each new | differs: every tree from S1 on carries the cured line |
| S74b | `1da6d092…` | equals pass 10's **S74c** digest: the tree after S74b now holds both changes |
| S74d, S74e, S75, S69, S69s, S70 | `93f14a86…`, `7aecdc58…`, `b662372a…`, `377dc106…`, `37b96827…`, **`6fdd4ec7…`** | equal |

So P10-R1's expected "new digest" is the old one: the final tree is byte-identical to pass 10's. S69 (the gate re-land) is re-recorded unchanged in text and stays the last gate step; S69s re-records; S70 writes the same `.bundle-ratchet` (2,919,057 → 2,920,386), so the datum rebinds once and does not move.

---

## §4 · Replay and digest

`tools/replays-p11.sh`, one heavy guard run (queued 07:53:42Z, admitted 07:57Z):

| run | worktree | wall | digest | rerun | load start → end |
|---|---|---:|---|---|---|
| **r1 `--twice`** | `wt2`, fresh HEAD + P11-F1 | **547.4 s** | **`6fdd4ec7…` MATCH**, every one of 126 steps idempotent | **0.4 s no-op** ("the chain is applied") | 23.9 → 19.7 |
| **r2** | `wt3`, fresh HEAD + P11-F1 | **417.8 s** | **`6fdd4ec7…` MATCH** | — | 21.0 → 22.7 |

Digest `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files (`R/replay-r1.txt`, `R/replay-r1-rerun.txt`, `R/replay-r2.txt`, `R/replay-worktrees.txt`). The r1 tree reads the same digest after every battery family (`R/digest-after-batteries.txt`, 17 lines). Timings are not verdicts.

---

## §5 · Gate, toolchain, package, cascade, peer

`tools/toolchain.sh` on r1 with the re-cut floor base, one heavy run (queued 08:15Z, admitted 08:27Z, done 08:31Z; `R/toolchain-r1.txt`):

| check | exit | time | load start → end |
|---|---:|---:|---|
| seal (unbuilt): **B0-B18 0**, files 1,585, edges 8,350, modules 142/142, pin 142/122/1,320/2, B10 anchored 39, peer held 23 | 0 | 5 s | 21.3 → 21.9 |
| peer probe on the unbuilt tree (expect 2) | **2** | 3 s | 21.9 |
| base `vite build` | 0 | 9 s | 21.9 → 22.2 |
| base cascade snapshot: all four sequences identical to the committed baseline | 0 | 1 s | 22.2 |
| base peer probe (expect 1, P7-G5); its broken arms equal the committed base report's | 1 | 3 s | 22.2 → 22.7 |
| `vite build` | 0 | 9 s | 22.7 |
| verify:package: **CLEAN**, ratchet PRESENT, datum **2,920,386**, `equal: true`, `increase: false` | 0 | 32 s | 22.7 |
| `vue-tsc` / `-p tsconfig.test.json` | 0 / 0 | 9 / 13 s | 22.7 → 22.0 |
| `demo:dist:build` | 0 | 2 s | 22.0 → 22.2 |
| cascade verify against the floor base, the committed baseline: **GREEN** (`./styles` listed reorder, risks 0; SCOPE Timeline → TimelineMarks 40) | 0 | 1 s | 22.2 |
| the same against the re-cut base's own snapshot: **GREEN**, the same lines | 0 | 2 s | 22.2 → 23.6 |
| peer probe (built): `./motion-core` kept, names 55, dist 5 files, files 38, peers none; `.` kept against the base; every S64 name keeps its class; **GREEN** | 0 | 2 s | 23.6 |
| `seal.test.ts` (`--maxWorkers=2`): **26/26** | 0 | 41 s | 23.6 → 23.4 |
| vitest full (`--maxWorkers=2`): 275 files, **2,335 passed**, 10 expected-fail, 1 skipped, **0 failed** | 0 | 118 s | 23.4 → 13.3 |

**Toolchain:** Node v26.0.0, vite 8.1.5, vue-tsc 6.0.3, vitest 4.1.10, TypeScript 6.0.3, Playwright 1.61.1, macOS 26.4.1. **Pack** (`R/pack/pack-diff-r1.json`): floor 2,913,546 → route 2,920,386 (+6,840; files 838 → 921), classes as pass 10's.

---

## §6 · Plants

### Pass-11 battery: plants-p11 116/116

`tools/plants-p11.mjs`, r1 built, the re-cut floor base built (`R/plants-p11.txt`, `.json`; run 2, 09:13Z, load 23.0; run 1 at 08:40Z, load 21.6, read the same 116/116, `R/plants-p11-run1.txt`).

| group | n | what it showed |
|---|---:|---|
| KIND | 46 | 9 committed kinds (the base run, a re-keyed base, the route run, a base rerun raw and re-keyed, a route rerun with `baseReport: null`, the probe's floor-base report, the probe's own route report, a selection) in each of `browser-tally`'s four slots and `rekey`'s base. Each kind a slot does not take: **exit 2**. Each kind it takes reads a verdict: `rekey` 0 on both base kinds; the tally 0 or 1 by the comparison (RED rows are the blob D2 flaky key, base-green without the base reruns, and the 420 keys a lone route rerun does not report: absent). Control: the committed full runs with every rerun in its slot, **GREEN 428** |
| F6 | 13 | a route with one base-green key failing (`expandable-container.visual.ts :: (a) inline renders real canvas…`): read right, **RED** (1); through every wrong-kind path, **2, never 0**: the route as `--base` (with the re-keyed base, itself, or the passing route as `--route`), the re-keyed base as `--route` and as `--route-rerun`, a re-keyed base rerun as `--route-rerun`, the failing route as `--base-rerun`, a failing route rerun and the committed route rerun as `--base-rerun`, `rekey` on the failing route, and the report pass 10's `rekey` would have written from it (`rekeyedFrom.testDir` "."), as `--base` |
| FLAG | 50 | every value-taking option of every judge (tally 4, select 2, probe 5) last on the line, followed by another option, and empty: **2** each with the reader's message; an option a judge does not take, a single-valued option twice (each judge), `--plan` and `--floor-base` twice; `rekey` with 2, 4, an empty and an option-shaped positional: **2**; `arg` throws in process on the three shapes, returns its default when absent and the value when present (controls) |
| TREE | 6 | `rekey` and `browser-select` on the floor base: **2** (not the chain's final digest); `peer-closure --floor-base` on the migrated tree and with a `--base` beside it: **2**; controls: the probe's floor-base run on the floor base 1 (P7-G5), `browser-select` on r1 0 |
| FLOOR | 1 | P11-F1 on the re-cut floor base's landed engine: KEPT |

### Regressions on the pass-11 tree

| battery | result | file | load |
|---|---|---|---|
| pass 10's route battery | **105/105** (run 1: 104/105, one row matching pass 10's message by substring while exiting 2 as expected; the cured message now carries the old phrase too) | `R/plants-p10.txt`, `-run1.txt` | 21-24 |
| pass 9's | **43/43** (run 1: 42/43, the same cause: `rekey`'s "carries none") | `R/plants-p9.txt`, `-run1.txt` | 19-24 |
| pass 8's / 7's / 6's | 27/27 · 17/17 · 20/20 | `R/plants-p{8,7,6}.txt` | 24-25 |
| the pass-10 critic's hashed battery (`7b7b5303…`, `run10.sh` by path, unmodified) | judges10 **145 pass / 0 fail** (its own run: 138/7; the seven were O-1/O-2: `T-base-is-route`, `T-route-is-rekeyed-base`, `R-base-is-route` and the value-less flags); plants10 (ROWS 14/5), migration10 (5/5, its O-3/O-4 detector rows) and browser10 (5/1, its S1 fixture row) verdict lines **identical** to its own run; browser10's three BW7 INFO lines read "DIFFERS from pass 9's" because this seat re-keyed the three base reruns (the files' `rekeyedFrom.report` path; their results are identical, `R/browser/rekey-reruns.log`) | `R/critic10/*.txt` | 24.5 → 27.6 |
| its p9 regression (pass 9's hashed battery by path) | judge-throws **52/0** (45 in the critic's run; the 7 added rows are the new kit modules each judge loads, `lib/argv.mjs`, `digest.mjs`, `sequence.mjs`, each throwing → 2); **regress 402 rows, 0 differ**; p8-plants 11 rows 0 differ; plants9 17 PASS; select-capture 3 PASS; b18-inputs 5/1 and browser-plants 5/2 as in the critic's run; flake9 `tally rc=2` as in the critic's run (its fixture records no `testDir`, cB9 §7); tree-probes FAIL lines identical to the critic's | `R/critic10/p9-regress/` | 24-27 |
| the pass-10 critic's post-hash `fix10.sh` (re-pointed: its results path and its HERE, `tools/repointed/DIFF.txt`) | F1 ROWS 6/0; F3 0 new / 0 left; F5 kit 0 and tally10 0 (both 428/428); **F6: the failing route as `--base` 2, `rekey` on it 2, the tally on its (absent) output 2**: never 0 (pass 10: GREEN, 2-written, GREEN). Run 1 had HERE one level short and is kept as `R/fix10-run1.txt` | `R/fix10.txt` | 23-24 |
| `fix10b.sh` (by path) | MG1 0, MG4 delta 0, the four META plants 1 each, `(BL)` and "tranche" 0 (its O-3, W-C.2's grammar) | `R/fix10b.txt` | 27 |
| the pass-9 critic's `extra9.sh` (`tools/critic9-extra.sh`) | XR 3/3; BI3-fixed rc 2; BI5 rc 2; PEERU U0-U5 PASS; PX: every degenerate `--base` 2, the leak against the floor base 1, the gate on the leak B18 27 | `R/critic9x.txt` | 32 |
| pass 6's fd4-probe, re-pointed (P10-G4) | A, G, G2, U, RESTORE **PASS** | `R/fd4.txt` | 32.6 |

### P10-G4: the earlier battery files naming a path S74d moved

`grep` over every `pass-*/critique-B/battery/`, `pass-*/plants/` and `pass-*/B-kit/tools/` for `tree|entries|resolve|placement|symbols.mjs`:

| file | reads | disposition |
|---|---|---|
| `pass-6/critique-B/battery/fd4-probe.mjs:21` (`lib/tree.mjs`) | the migrated tree (run by pass 7's and pass 8's tree probes) | re-pointed: `tools/repointed/pass-6-fd4-probe.mjs`, one line (`DIFF.txt`), all arms PASS. The hashed chain that calls the original still prints P6:FD4 FAIL, as in pass 10 |
| `pass-3/critique-B/battery/probes.mjs:28,77,119` (`symbols.mjs`, `lib/placement.mjs` ×2) | the migrated tree | re-pointed: `tools/repointed/pass-3-probes.mjs`, three lines; its two re-pointed probes (S-04, S-10) PASS. S-02 and S-05 still throw on `lib/graph.mjs`, which S19 moved in pass 4 (not an S74d path); the pass-3 battery is in no regression list since then (`R/pass3-probes-repointed.txt`) |
| `pass-3/plants/*`, `pass-4/plants/*` (`f3-generated-root.json`, `p4-tree-plants.sh`), `pass-6/plants/{fd4-cover,f3-probe}.mjs` | floor trees (the floor base), where S74d has not run | none: floor plants |
| `pass-{3..9}/B-kit/tools/merge-test.mjs` | G's banked tree | none: kit tools of G's merge test, not batteries |
| `pass-8/B-kit/tools/plants-p8.mjs:67` | — | cured in pass 10's copy (`lib/tree/tree.mjs`) |

---

## §7 · W-D.1 §0 on the pass-11 tree

`R/wd1-measure.txt` (r1, built, load 10.8). Measurements, not checklist items.

| # | item | pass 10 | pass 11 | disposition |
|---|---|---:|---:|---|
| 1 | VALUE-SCC (`d1-probe`, `src` only) | 0 | **0** | P9-R1 (a); B4 reads both sealed zones at 0 |
| 2 | `Surface` names two symbols | 1 | 1 | W-D.1 §3 step 5 (`_shared/axes.ts:23`, `src/index.ts:486`) |
| 3 | bare type aliases | 5 | 5 | W-D.1 §3 step 5 |
| 4 | the chain's MIGRATION heading | cured | **cured**: `## 11.0.0`, 0 tranche lines | P9-R2 (a), S75 |
| 5 | the consumer preset in `./tokens` | 3 | 3 | W-D.1 §3 step 7 |

W-C.2 over the chain's text (`R/chain-text.txt`, load 11): 129 lines added, one heading `## 11.0.0`; C2-G1 0 META added; C2-G4 base 33 · 26, route 34 · 26, 0 added; GREEN.

---

## §8 · The browser bar (S-12)

**Selection** (`tools/browser-select.mjs` on the derive tree at the final digest, light, load 12; `R/browser/select.log`): 604 moves, 723 changed paths, **155 specs**, 14 excluded captures printed and listed. `specs.txt`, `captures.txt`, `changed.txt` and `moved.json` are **byte-identical** to pass 10's.

**The re-keyed base, re-derived** by the cured `rekey` from the committed `base.json` (`R/browser/rekey.log`): 153 specs, 866 results, `unmapped` 0, results identical to pass 10's `base-rekeyed.json`. The three committed base reruns and pass 10's touched-spec base run, re-keyed the same way: results identical to their committed copies (`R/browser/rekey-reruns.log`).

**The specs pass 11 touches** (`R/browser/p11-steps/`): pass 11 moves no `src` file; its one code change is line 168 of `scripts/structure/lib/move.mjs`, on both trees. The graph's `--select-only` over that path selects **1 spec**, the π floor (`substrate-paints-color.spec.ts`), no band. No story or route renders the floor engine, so no spec is added by route. Base key: 1 of the base program's 153.

**The runs** (`tools/browser-touched-p11.sh`, in the heavy guard run that followed the battery re-run; `R/browser/p11-steps/runs.txt`):

| run | tree | wall | tests | passed | new failures | load start → end |
|---|---|---:|---:|---:|---|---|
| base | re-cut floor base (`6773b4ec…`) | 41 s | 3 | 3 | — | 14.6 → 13.0 |
| route | r1 (`6fdd4ec7…`), `--base-report` the re-keyed base | 43 s | 3 | 3 | **0** | 13.0 → 15.9 |

**The tally** (`R/browser/p11-steps/tally.txt`, exit 0), through the cured `browser-tally`: the committed full runs (`base-rekeyed.json` re-derived, `route.json`), the six P7-R2 reruns, pass 10's touched-spec pair and pass 11's pair, each pair one more rerun per tree (6 runs per tree):
- base keys 866, route keys 867;
- **base-green 428; held 428; not held 0 (failed 0, absent 0)**; flaky 1, out of the bar (blob D2: base expected, unexpected ×3 in its reruns); base-red route-green 1;
- **verdict: GREEN. Every base-green key is accounted for: 428 held + 0 failed + 0 absent.** The pass-10 critic's independent reader (`tally10.mjs`, run inside fix10 F5 and directly) reads the same 428 = 428 + 0 + 0.

**The full graph-selected run was not repeated.** The task text asks for it; §P10-6.2 step 4, the registry's plan for this pass, reads "no `src` file moves in either arm; the committed reports stand and the tally is re-run through the cured judges", and this seat did that plus the π floor on both trees. What the committed reports stand on, measured here: the route tree is byte-identical to pass 10's (`6fdd4ec7…`), the floor base differs from pass 10's in one line of the floor engine that no spec reads (the graph selects none), and the selection is byte-identical. At pass 8's timings a full repeat costs about 3.3 h (base) plus 1.6 h (route) of a heavy slot (§10 G-1).

---

## §9 · The 27 items

| item | entering pass 11 | route's status | what holds it |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | the kit, the floor row, every result, the selection and both `/2` report sets (the committed full runs and the p10/p11 touched pairs) are under `pass-11/` and `floor/` for the driver's commit before the critic |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P6-R1..P9-R2 landed and measured as in pass 10; **P10-R1 (a) landed**: the floor row and its plant, the floor base re-cut by S1's script, S74c out, S1→S70 re-derived and replayed; the datum rebound once, at S70 (unchanged, 2,920,386) |
| S-04..S-08 | CLOSED | CLOSED | gate 19/19 at 0; the floor row planted (LOST → KEPT on both engines) |
| S-09 | CLOSED | CLOSED | `6fdd4ec7…` from two fresh worktrees, r1 `--twice`, rerun a no-op |
| S-10 | CLOSED | CLOSED | cascade GREEN against the floor base (the committed baseline and the re-cut base's snapshot), every moved rule listed |
| S-11 | CLOSED | CLOSED | vitest 2,335 / 0 failed |
| S-12 | CLOSED | CLOSED | 428 held + 0 failed + 0 absent through the cured tally; capture exclusion stated (LAW §13), printed (14), listed; a moved capture spec read by B0 (p9 CAPTURE rows) |
| S-13 | CLOSED | CLOSED | regressions identical (§6); every earlier battery runnable on the pass-11 tree, the two that name a path S74d moved re-pointed by `diff` (P10-G4) |
| S-14 | **OPEN** | **CLOSED (route's claim)** | B17 0; every gate throw exits 2 (crash8 via tree-probes, GATE 3/3 in p10); every kit judge exits 2 on a throw or a degenerate input on every input argument: **every committed report kind in every slot** (KIND 46/46), **a flag with no value, followed by another flag, or empty, on every value-taking option** (FLAG 50/50), trees of the wrong kind (TREE 6/6); no judge reads a malformed input as an all-clear: F6 never 0 (13/13, and fix10 F6), the leak under every degenerate `--base` 2 (p10 LEAK 12/12, extra9 PX); the sweep (§1) lists every remaining reading |
| B-01 | CLOSED | CLOSED | every clause 0, B2 0; I7 caught (p7 battery) |
| B-02..B-06 | CLOSED | CLOSED | p6-p10 batteries identical in verdict; regress 402 rows 0 differ |
| B-07 | CLOSED | CLOSED | B15 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | B18 owns the class; the reader throws on a peer-less, whitespace-only and subpath-less row (p10 ROW 13/13, BI3-fixed rc 2); `./motion-core` keyframes-free on all three arms |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count:** 27 items, route claims 27 closed. The two-clean-passes count is 0 entering pass 11; the pass-11 critique decides whether it reaches 1.

---

## §10 · Open gaps

| id | gap | proposed disposition |
|---|---|---|
| G-1 | The full 155-spec graph-selected browser run was not repeated (§8); the committed full runs are pass 8's, carried with each later pass's touched-spec pair | none owed under §P10-6.2 step 4; if the driver reads the task sentence as binding, ~3.3 h base + 1.6 h route of one heavy slot |
| G-2 | P10-R1 predicted a new digest; the chain ends at pass 10's `6fdd4ec7…` because S74b now lands on the tree pass 10 reached after S74c. Only the floor base digest (`6773b4ec…`) and S1→S74b's digests are new | none; the convergence record carries `6fdd4ec7…` and the re-cut floor base |
| G-3 | Until the driver commits `floor/lib/move.mjs`, a fresh HEAD worktree lands the old floor and the replay stops at S1 (digest `5b14c6c7…`). This seat applied `P11-F1.patch` in each worktree | the driver commits the floor row with the kit; the patch file then documents the row only |
| G-4 | The kind is the field: a route report with a forged `rekeyedFrom` (an object naming `tests-visual`) reads as a re-keyed base. Not planted; it needs a hand-written field, not a committed report | a declared limit; if a critic wants provenance, the tally could re-derive the re-keyed base from `rekeyedFrom.report` (every committed one names a file under `results/`) |
| G-5 | The pass-3 critic's probes S-02 and S-05 still throw on `lib/graph.mjs` (moved by S19 in pass 4) | none; that battery left the regression lists at pass 4 |
| G-6 | W-D.1 §0 items 2, 3, 5 (1 / 5 / 3) | W-D.1 §3 steps 5 and 7 (§P9-4) |
| G-7 | The 6 tree-probe FAIL lines, b18-inputs 1, browser-plants 2, flake9 `rc=2`, migration10's 5 and plants10's 5 FAIL rows are the hashed batteries' own fixture or detector rows, identical to their authors' runs | none; a fresh critic writes its own battery |
| G-8 | Outside D1, unchanged: P7-G5, P5-G3, P5-G5, P5-G8, P9-G6 (W-D.1 and `waves/INDEX.md:47` re-pointed at convergence), P10-G5 (W-C.2 appendix A) | tranche cursor |
| G-9 | `FLOOR.md`'s worktree recipe still names the `tests-visual/node_modules` symlink P10-G7 dropped from the task text | the floor's next row, or the driver |
