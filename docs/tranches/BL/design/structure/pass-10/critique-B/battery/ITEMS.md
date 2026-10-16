# critique-B pass 10 · battery map

Seat: fresh critic, model `claude-opus-5-5`, authored nothing in passes 2-10 (the pass-6..9 critiques included).
Written and hashed BEFORE reading `pass-10/B-kit/` or `pass-10/B-proto.md`. Checklist: REGISTRY §P3-9 text (frozen),
status §P9-7, 27 items (26 closed, S-14 open entering pass 10); bar and battery list §P9-6.4; criterion §P2-6.5 and
§P9-6.5. Rulings: R-1..R-10 as amended, X-10, P3-R1..P3-R9 (P3-R9 as P4-R3), P4-R1..P4-R5, P5-R1..P5-R5, P6-R1..P6-R3,
P7-R1..P7-R2, P8-R1..P8-R3, P9-R1..P9-R2.

Entry points, in order, each under `~/.claude/guard/guarded`:
`phase1.sh <fresh HEAD worktree> <results>` (floor base, its build, cascade snapshot and peer report, then the replay and
its no-op rerun), `toolchain10.sh <KIT> <tree> <results>` (the bar's toolchain), `run10.sh <KIT> <tree> <scratch>
<results>` (the four families below, then every earlier battery). Earlier critics' files run by path from committed
bytes, never copied.

## §P9-6.4's battery list, plant by plant

| plant (§P9-6.4 text) | file · ids | expect | item |
|---|---|---|---|
| every input argument of every kit judge: missing | judges10.sh `*-missing`, `*-novalue`, `R-no-out` | 2 | S-14 |
| … non-JSON | `*-notjson` (tally ×4 args, rekey base, select SEQUENCE and a step file, probe base and overlay) | 2 | S-14 |
| … wrong-schema `{}`, `[]`, another report kind | `*-obj`, `*-arr`, `*-null`, `*-num`, `*-dir`, `*-peer-report`, `*-browser-*`, `*-schema1`, `*-noresults`, `*-notestdir`; `P-table-*` | 2 (`P-overlay-obj` INFO: `{}` is the declared empty overlay) | S-14 |
| … right schema, wrong kind (a non-floor report as `--base`) | `P-base-own-clean-report`, `P-base-floorBase-{false,absent,string}`, `P-base-entries-{obj,arr,absent}`, `P-base-entry-{dropped,hollow}`; `T-base-is-{route,raw}`, `T-route-is-{rekeyed-base,raw}`, `T-*-rerun-is-*`; `R-base-is-{rekeyed,route}` | 2 | S-14 |
| a leak in `./motion-core` with each degenerate `--base`: never 0 | judges10.sh `L-base-*` (every `P-base-*` form, plus the leaking tree's own report), `LEAK-NEVER-0`; control `L-ctl-floor-base` | 2 each; never 0; control 1 | S-14 |
| a peer-less declaration row, a whitespace-only Peer cell, a row naming no subpath | plants10.mjs `PR-free-{nopeer,ws,nosub}`, `PR-heavy-{nopeer,ws,nosub}`; control `PR-ctl` | THROWS (seal exit 2); control CLEAN | B-10, S-14 |
| P9-R1 (a): a parent↔child value cycle in another unit read B4 RED | plants10.mjs `PC-val-1..3`, `PCG-val` (grandparent↔grandchild), `PCX-val-*` (an existing parent→child edge closed); `SIB-val` (sibling regression) | B4 CAUGHT | S-03 |
| … a type-only reverse edge read clean | `PC-type-1..3`, `PCX-type-*` | B4 gains no line | S-03 |
| P9-R2 (a): a tranche id in the chain's MIGRATION text read RED by C2-G1 | migration10.sh `MGP-row-ref`, `MGP-wave-id`, `MGP-wave-id2`, `MGP-dated`; `MGP-heading` (C2-G4); clean reads MG0-MG4 | PASS | S-03 |
| regressions: the pass-9 critic's battery (`748826fb…`), the 402 rows, crash8, passes 4-9 | run10.sh `p9-battery` = `pass-9/critique-B/battery/run-battery.sh` by path | as each file states; differences adjudicated in critique-B.md | all |

## The bar (§P9-6.4), measurement by measurement

| bar | file | item |
|---|---|---|
| the chain replays to one new digest from committed bytes, rerun a no-op | phase1.sh; run10.sh `digest-after.txt` | S-09 |
| 19 clauses at 0 (B4 widened) | toolchain10.sh `seal (tree's gate)` | S-04..S-08, B-01 |
| verify:package CLEAN at the datum rebound once at S70 | toolchain10.sh `verify:package`; `.bundle-ratchet` | S-03 |
| cascade GREEN against the floor base | phase1.sh snapshot + toolchain10.sh verify (listed 0, empty RED) | S-10 |
| 428/428 base-green held, every key accounted | browser10.sh BW1-BW7 (tally10.mjs, an independent reader) | S-12 |
| `./motion-core` keyframes-free on all three arms | toolchain10.sh peer probe (both bases) | B-10 |
| `seal.test.ts` with the new RED cases | toolchain10.sh `seal.test.ts`; vitest full | S-11, S-14, S-03 |

## One probe per item

| item | probe |
|---|---|
| S-01 | `git log`/`git ls-files pass-10/`: kit and results committed before this seat's hash |
| S-02 | gate B8 0, B9 0 |
| S-03 | P9-R1 (plants10 PC*), P9-R2 (migration10), P8-R2 (judges10), P8-R3 (plants10 PR*); S70 the one rebind |
| S-04..S-08, S-11, S-13 | gate 19/19 on the replay; vitest; regressions |
| S-09 | phase1 MATCH + rerun no-op; digest after every family |
| S-10 | toolchain10 cascade, pass-7 SFC2 inside the regressions |
| S-12 | browser10; pass 9's select-capture, flake9, plants9 CAP-* by path |
| S-14 | judges10 (every argument, every form, the leak); plants10 PR*; crash8 and pass 9's judge-throws by path |
| B-01..B-09, B-11..B-13 | gate 19/19; regressions 0 differ (any difference adjudicated against the widened B4) |
| B-10 | plants10 PR*; pass 9's XR family; the probe's three arms |
