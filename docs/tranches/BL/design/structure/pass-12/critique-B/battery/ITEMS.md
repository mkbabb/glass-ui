# critique-B pass 12 · battery map

Seat: fresh critic, model `claude-opus-5-5`, authored nothing in passes 2-12 (the pass-6..11 critiques included).
Written and hashed BEFORE reading `pass-12/B-kit/` or `pass-12/B-proto.md`. Checklist: REGISTRY §P3-9 text (frozen),
status §P11-7: 27 items, 26 closed, S-14 open entering pass 12. Bar and battery list §P11-6.4; route work §P11-6.3;
criterion §P2-6.5 and §P11-6.5. Rulings: R-1..R-10 as amended, X-10, P3-R1..P3-R9 (P3-R9 as P4-R3), P4-R1..P4-R5,
P5-R1..P5-R5, P6-R1..P6-R3, P7-R1..P7-R2, P8-R1..P8-R3, P9-R1..P9-R2, P10-R1 (a), P11-R1 (a).

Entry points, in order, each under `~/.claude/guard/guarded`, one heavy run at a time:
1. `phase1-12.sh <fresh HEAD worktree> <results> <floor-base clone> <unbuilt clone>`: pre-S1 floor plant, floor base
   (S1's script), FB1-FB5, landed-engine plant, build, cascade snapshot, peer report, replay, rerun, FIN/FIN2, clones.
2. pass 10's `toolchain10.sh <KIT> <tree> <results>` by path (the bar's toolchain; reads `<results>/cascade/base-snap`).
3. `run12.sh <KIT> <built tree> <unbuilt tree> <floor-base tree> <scratch> <results>`.

`<KIT>` is always the worktree's committed copy of `pass-12/B-kit` (the plants that swap `frozen/SEQUENCE.json` write
only there, restored by sha256).

## §P11-6.4's battery list, plant by plant

| plant (§P11-6.4 text) | file · ids | expect | item |
|---|---|---|---|
| tally's four slots and rekey's base × every committed `browser-seat/2` report, full and partial (full base raw and re-keyed, each base rerun raw and re-keyed, each touched-spec base raw and re-keyed p10/p11, full route, each route rerun, each touched-spec route) | `judges12.sh` `KM-{base,route,baserr,routerr,rekey}-<report>`; the report set discovered from the kit's committed browser dir and printed | refused → 2; `--base`: only `base-rekeyed.json` reads 0 (with the reruns); `ZERO` row: count of other reports reading 0 in `--base` = 0 | S-14 |
| F6 through every row above, never 0 | `judges12.sh` `F6-{base,baserr,routerr}-<report>`, `F6-rekeyed-<report>-as-{base,baserr}`; control `F6-ctl` 1 | never 0 | S-14 |
| F7's ten rows, each 2 | `judges12.sh` `F7-<report>[-RB]` (3 base reruns + 2 touched-spec bases, with and without reruns) | 2 | S-14 |
| touched-spec pairs on their own: a verdict, F6's analogue RED | `judges12.sh` `PAIR-pN-steps` (0\|1), `PAIR-F6-pN-steps` (1) | as stated | S-14, S-12 |
| a re-keyed base with one base-origin spec's results deleted, against the full route | `judges12.sh` `DEL-del-{f6,moved,rerun,p10-steps,p11-steps}[-RB]` (2), `-F6` (never 0) | 2 | S-14 |
| (this seat) the coverage map is an input: degenerate map | `judges12.sh` `MAP-{obj,arr,missing,notjson}-*` | never 0 over F6 | S-14 |
| (this seat) adversarial extents the plan does not name | `judges12.sh` `X-KEY`, `X-SKIP`, `X-NEW`, `X-DUPR`, `X-ORIG` | INFO, judged in the critique | outside_checklist or S-14 by its text |
| regressions: pass 11's battery (`317fd849…`) with its post-hash tools | `run12.sh p11-battery` (run11.sh by path), `p11-post` (f7.sh, re-pointed by diff if the kit's browser dir moved) | as each file states | S-13, S-14 |
| … pass 10's (`7b7b5303…`), pass 9's (`748826fb…`), the 402 rows, crash8, P9-R1 PC/PCG/PCX/PD, P9-R2 MIGRATION, P10-R1 floor plants | through run11.sh: run10.sh → run-battery.sh (pass 9) → pass 8 / 402 rows / crash8 / tree-probes; p10-post (plants10b, fix10b, fd4); floor-landed; `phase1-12.sh` FP0 and FP (pass 11's `floor11.mjs`, docs engine pre-S1 KEPT, pre-cure LOST, landed KEPT) | as each file states | S-13, S-03, S-08, B-01..B-13 |
| … §P9-6.4's list (named again by this seat's task): every kit judge's every input missing, non-JSON, `{}`, `[]`, another report kind, right-schema-wrong-kind → 2; a `./motion-core` leak with each degenerate `--base` never 0; peer-less row, whitespace-only Peer cell, row naming no subpath → 2; parent-child value cycle B4 RED and type-only reverse edge clean; a tranche id in the chain's MIGRATION text RED by C2-G1 | pass 10's `judges10.sh` and `plants10.mjs` (PR-*, PC-*), `plants10b.mjs` (PD-*), `fix10b.sh` (MIGRATION), all through `run11.sh` | as each file states | S-14, B-10, S-03 |
| passes 4-11's route batteries (the pass-11 route's `tools/batteries.sh`: built, unbuilt, floor base, scratch) | `run12.sh route-batt-INFO` (the kit's own `batteries.sh`, four arguments) | INFO | S-13 |

## The bar (§P11-6.4), measurement by measurement

| bar | file | item |
|---|---|---|
| `6fdd4ec7…` replayed from committed bytes, rerun a no-op | `phase1-12.sh` FIN, FIN2; `run12.sh` digest-after.txt | S-09 |
| 19 clauses at 0 | `toolchain10.sh` (by path) seal | S-04..S-08, B-01 |
| verify:package CLEAN at 2,920,386 | `toolchain10.sh` | S-03 |
| cascade GREEN against the floor base `6773b4ec…` | `phase1-12.sh` FB2 + snapshot; `toolchain10.sh` (listed 0, empty RED) | S-10 |
| 428/428 base-green through the cured tally, every key accounted | `browser12.sh` BW1-BW7 | S-12 |
| `./motion-core` keyframes-free on all three arms | `toolchain10.sh` peer probe | B-10 |
| `seal.test.ts` 26/26 or more | `toolchain10.sh` | S-11, S-14 |
