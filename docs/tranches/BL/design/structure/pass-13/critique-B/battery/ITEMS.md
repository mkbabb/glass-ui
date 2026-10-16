# critique-B pass 13 · battery map

Seat: fresh critic, model `claude-opus-5-5` (asserted from own system identity), authored nothing in passes 2-13 (the
pass-6..12 critiques included). Written and hashed BEFORE reading `pass-13/B-kit/` or `pass-13/B-proto.md`. Read before
the hash: REGISTRY §P2-6.4, §P2-6.5, §P2-7, §P3-9 (the 27 items, text frozen), the pass-12 part §P12-0..§P12-7 (status,
plan, battery floor §P12-6.4, criterion §P12-6.5, hold column §P12-7); RULINGS.md through P11-R1; the earlier critics'
batteries (pass-12's in full); pass-12/B-proto.md §1 (the extent sweep the plan cites as "Bp12 §1's stated reading");
the CLI headers of pass-12/B-kit's rekey, browser-select, peer-closure and batteries-p12.sh.

Entry points, in order, each under `~/.claude/guard/guarded`, one heavy run at a time, in one fresh HEAD worktree at
`.claude/worktrees/bl/D1/p13/crit-B/wt` with two APFS clones beside it (`fb`, the built floor base; `ub`, the unbuilt
replayed tree):
1. `phase1-13.sh <wt> <results> <fb> <ub>`
2. pass 10's `toolchain10.sh <KIT> <wt> <results>` by path (build, verify:package + datum, vue-tsc x2, demo build, cascade
   vs this seat's floor-base snapshot listed / empty, peer vs the kit's base and this seat's, gate, seal.test.ts, vitest
   at 2 workers)
3. `run13.sh <KIT> <wt> <ub> <fb> <scratch> <results>`

`<KIT>` is the worktree's committed copy of `pass-13/B-kit`; plants that edit kit files write only there and restore by
sha256.

## §P12-6.4's battery floor, plant by plant

| plant (§P12-6.4 text) | file · ids | expect | item |
|---|---|---|---|
| every committed `browser-seat/2` report, discovered, in every tally slot and in `rekey`'s base | `judges13.sh` `KM-{base,route,baserr,routerr,rekey}-*`; again by pass 12's `judges12.sh` (regression) | refused 2; only `base-rekeyed.json` reads 0 in `--base` (`ZERO`) | S-14 |
| F6 through every row, never 0 | `judges13.sh` `F6-*` with the LAST eligible key (judges12 flips the first) | never 0; base-rekeyed and the seat's re-key of `base.json` 1 | S-14 |
| F7's ten rows, 2 | `judges13.sh` `F7-*` (with and without reruns) | 2 | S-14 |
| each touched-spec pair on its own a verdict, its F6 analogue RED | `judges13.sh` `PAIR-*`, `PAIR-F6-*` (last key) | 0\|1; 1 | S-14, S-12 |
| a base missing one base-origin spec, 2 | `judges13.sh` `DELALL` (every spec of the full re-keyed base, one at a time) | 2 each | S-14 |
| `rekey` against a tree whose code digest is not the chain's final | `extent13.sh` `RK-OFF-floorbase`, `RK-OFF-byte` (one comment line on the unbuilt replayed tree); control `RK-CTL-U` 0 | 2 | S-14 |
| `rekey`: a base spec the chain does not land | `RK-UNLANDED-added` (a result on a spec the base never had), `RK-UNLANDED-renamed` (one real spec renamed) | 2 | S-14 |
| `browser-select --root` off the final digest | `BS-OFF-floorbase`, `BS-OFF-byte`; controls `BS-CTL`, `BS-CTL-U` 0 | 2 | S-14 |
| `browser-select`: a frozen step with neither move list nor row | `BS-STEP-<file>-{obj,arr,nulls,missing}` on the first and last moves step and the first and last row step; `BS-SEQ-nofile`, `BS-SEQ-unknownkind`; `BS-CTL-after` and the selection byte-identical after | 2; control 0 | S-14 |
| `peer-closure --base` missing a declared-free entry or one of its `broken` lists | `PC-DEL-entry-*`, `PC-DEL-broken-*-{names,dist,files}`, `PC-STR-broken-*` (a string for a list), `PC-NULL-broken-*`, `PC-EMPTY-entries`; control `PC-CTL` 0 | 2 | S-14, B-10 |
| `peer-closure --floor-base` off S1's digest | `PC-FB-OFF-final`, `PC-FB-OFF-byte`; `PC-FB-with-base`; control `PC-FB-CTL` a verdict | 2 | S-14 |
| (this seat) `SEQUENCE.json` absent for every judge that reads it | `SEQ-missing-{rekey,select,peer,peer-fb,tally}` | 2 | S-14 |
| P12-G1's premise against the route's listing | `phase1-13.sh` `PREMISE`: the floor rows' touched paths (0 under `tests-visual/`); the base program by `git ls-tree` at `baseSha`, on the floor base, and the kit's `baseProgram()`, equal, 153; compared in critique-B.md with the route's committed listing | 0; equal; 153 | S-12, S-14 |
| regressions: pass 12 (`c6fdf555…`, `run12.sh`), pass 11 (`317fd849…`) with `f7.sh`, pass 10 (`7b7b5303…`), pass 9 (`748826fb…`), the 402 rows, crash8, P9-R1 PC/PCG/PCX/PD, P9-R2 MIGRATION, P10-R1 floor plants | `run13.sh p12-battery` (run12.sh by path, four-argument tree signature; through it run11 → run10 → run-battery, p10-post, f7); `phase1-13.sh` FP0/FP (floor11.mjs) | as each file states | S-13, S-03, S-08, B-01..B-13 |
| the route's batteries (`tools/batteries*.sh`, four arguments) | `run13.sh route-batt-INFO` | INFO | S-13 |

## The bar (§P12-6.4)

| bar | file | item |
|---|---|---|
| `6fdd4ec7…` replayed from committed bytes, rerun a no-op | `phase1-13.sh` FIN, FIN2; `digest-after.txt` | S-09 |
| 19 clauses at 0 | `toolchain10.sh` seal | S-04..S-08, B-01 |
| verify:package CLEAN at 2,920,386 | `toolchain10.sh` | S-03 |
| cascade GREEN against the floor base `6773b4ec…` | `phase1-13.sh` FB2 + snapshot; `toolchain10.sh` listed 0, empty RED | S-10 |
| 428/428 base-green through the tally, every key accounted | `browser12.sh` BW1-BW8 through `run12.sh` | S-12 |
| `./motion-core` keyframes-free on all three arms | `toolchain10.sh` peer; `phase1-13.sh` peer-base | B-10 |
| `seal.test.ts` 26/26 or more; vitest 0 failed | `toolchain10.sh` | S-11, S-14 |
| floor plant KEPT on the landed engine, LOST with line 168 reverted | `phase1-13.sh` FP0, FB5, FP | S-08 |
