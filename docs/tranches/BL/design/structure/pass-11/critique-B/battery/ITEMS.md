# critique-B pass 11 · battery map

Seat: fresh critic, model `claude-opus-5-5`, authored nothing in passes 2-11 (the pass-6..10 critiques included).
Written and hashed BEFORE reading `pass-11/B-kit/`, `pass-11/B-proto.md` or `pass-11/plants/`. Checklist: REGISTRY §P3-9
text (frozen), status §P10-7, 27 items (26 closed, S-14 open entering pass 11); bar and battery list §P10-6.4 (which
carries §P9-6.4's list forward); criterion §P2-6.5 and §P10-6.5. Rulings: R-1..R-10 as amended, X-10, P3-R1..P3-R9
(P3-R9 as P4-R3), P4-R1..P4-R5, P5-R1..P5-R5, P6-R1..P6-R3, P7-R1..P7-R2, P8-R1..P8-R3, P9-R1..P9-R2, P10-R1 (a).

Entry points, in order, each under `~/.claude/guard/guarded`:
`phase1-11.sh <fresh HEAD worktree> <results>` (floor base, the P10-R1 checks and floor plant, build, cascade snapshot,
peer report, replay, rerun), pass 10's `toolchain10.sh <KIT> <tree> <results>` by path (the bar's toolchain), then
`run11.sh <KIT> <tree> <scratch> <results>` (this battery's families, then every earlier battery by path).

## §P10-6.4's battery list, plant by plant

| plant (§P10-6.4 text) | file · ids | expect | item |
|---|---|---|---|
| every input argument of every kit judge: missing, non-JSON, wrong-schema | pass 10's `judges10.sh` by path (`*-missing`, `*-notjson`, `*-obj`, `*-arr`, `*-null`, `*-num`, `*-dir`, `*-schema1`, `*-noresults`, `*-notestdir`, `*-empty`), run inside `run11.sh p10-battery` | 2 | S-14 |
| … every committed report kind in every slot (base run, re-keyed base, route run, base rerun raw and re-keyed, route rerun with `baseReport: null`, probe report) | `judges11.sh` `KM-<slot>-<kind>`: 4 tally slots, rekey's base, peer `--base`, peer `--overlay`, select's SEQUENCE.json, each × 16 kinds (the six browser kinds, the touched-spec pair's three, the probe's floor-base and clean reports, selection, moved, plan, a seal report, SEQUENCE.json) | 2 for each wrong kind; 0 for the right kind; INFO for a right-kind alternate (a rerun of the same kind, the touched-spec pair) | S-14 |
| F6 as a hashed row: a route with one base-green test failing, through every wrong-kind `--base`, `--base-rerun` and `rekey` path, never 0 | `judges11.sh` `F6-*` (control `F6-ctl` 1); `F6-rekey-*` 2 and, if rekey writes, its output read never 0; duplicated single-valued flags `F6-dup-*` never 0 | never 0 | S-14 |
| every value-taking flag of every judge present with no value, and followed by another flag | `judges11.sh` `FL-*` (tally `--base --route --base-rerun --route-rerun`; select `--root --out`; peer `--root --base --overlay --table --json`, each last on the line and followed by a flag); `FLX-*` INFO for every other flag the sources name | 2 | S-14 |
| under P10-R1 (a): the floor plant (a holder of `"./dist/x"` moved, the spelling kept) and the floor base re-cut by S1's script | `floor11.mjs` (7 shapes; cured docs engine and landed engine KEPT, the pre-cure engine from `16e907cb3` LOST, else VACUOUS), `phase1-11.sh` FB1-FB5 (S1 digest, differs from pass 10's `5b14c6c7…`, one engine, the cure diff one line, the old line restores pass 10's floor base exactly) and FP; `run11.sh floor-landed` on the replayed tree | KEPT / LOST / PASS | S-08, S-09, S-03 |
| regressions: pass 10's battery (`7b7b5303…`) with its post-hash corrections, pass 9's (`748826fb…`), the 402 rows, crash8, passes 4-10, P9-R1's PC/PCG/PCX/PD plants, P9-R2's MIGRATION plants | `run11.sh p10-battery` (run10.sh by path → pass 9's run-battery.sh → pass 8, the 402 rows, crash8, tree-probes 5-7); `p10-post` (plants10b PD-*, fix10b MIGRATION, fd4 re-pointed, the S74d-moved-path census) ; `route-batt-INFO` | as each file states | S-13, S-03, B-01..B-13 |

## The bar (§P10-6.4), measurement by measurement

| bar | file | item |
|---|---|---|
| the chain replays to one digest from committed bytes, rerun a no-op | `phase1-11.sh` FIN; `run11.sh` digest-after.txt | S-09 |
| 19 clauses at 0 | `toolchain10.sh` (pass 10's, by path) `seal (tree's gate)` | S-04..S-08, B-01 |
| verify:package CLEAN at the one datum (2,920,386 expected) | `toolchain10.sh` | S-03 |
| cascade GREEN against the floor base | `phase1-11.sh` snapshot + `toolchain10.sh` (listed 0, empty RED) | S-10 |
| 428/428 base-green through the cured tally, every key accounted | `browser11.sh` BW1-BW6 | S-12 |
| `./motion-core` keyframes-free on all three arms | `toolchain10.sh` peer probe | B-10 |
| `seal.test.ts` 26/26 or more | `toolchain10.sh` | S-11, S-14 |
