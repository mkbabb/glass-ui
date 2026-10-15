# critique-B pass 8 · battery map

Seat: fresh critic, model `claude-opus-5-5`, authored nothing in passes 2-8 (the pass-6 and pass-7 critiques included).
Written and hashed BEFORE reading `pass-8/B-kit/` or `pass-8/B-proto.md`. Checklist: REGISTRY §P3-9 text (frozen),
status §P7-7, 27 items; bar §P2-6.4 … §P7-6.4. Rulings: RULINGS.md R-1..R-10, X-10, P3-R1..P3-R9 (P3-R9 as P4-R3),
P4-R1..P4-R5, P5-R1..P5-R5, P6-R1..P6-R3, P7-R1..P7-R2.

Runner: `run-plants.mjs --root <tree> --adapter adapter.mjs --set <plants.mjs|regress.mjs> [--group]` (pass 7's
runner plus an absence-control mode `expect: "-B18"` and `anyLine`). The adapter runs the tree's gate; exit 2 throws.

## §P7-6.4 plants

| family | file | plants | expect | item |
|---|---|---|---|---|
| module evaluation | crash8.sh M1-M6 | package.json not JSON, missing, empty; a module-scope throw in EVERY module the gate loads (`gate-modules.mjs` closure; the CLI file itself INFO); an unhandled rejection and a deferred throw at module scope of a floor module | 2 each | S-14 (P6-R3, P7-G1) |
| main() | crash8.sh R1-R4 | ledger missing; ledger not JSON; `--root` absent; an unparsable source (INFO) | 2 | S-14 |
| record write | crash8.sh W1-W2 | `--json` under a regular file; `--json` in a read-only dir | 2 | S-14 |
| controls | crash8.sh C0, C1, C9 | GREEN 0, RED 1, GREEN again 0 | as stated | S-14 |
| peer class through the gate | plants.mjs KF-new, KF-leaf, KF-deep, KF-existing, KF-side, KF-reexport, VU-leaf | keyframes (or vueuse) reaching `./motion-core` by a new name, an existing leaf, a transitive sibling, a re-export, a side-effect import, `export *` | B18 | B-10, S-14 (P7-R1) |
| peer class, recorded | plants.mjs KF-dyn | a literal dynamic `import()` of keyframes in a motion-core leaf | record | P7-R1 (arm scope) |
| keyframes-free controls | plants.mjs CTL-free, CTL-type, CTL-other | a keyframes-free new leaf; an erased `import type`; a keyframes import inside an entry that may bear it | B18 silent | control |
| unbuilt probe | peer-unbuilt.sh U0-U5 | dist absent, empty, the motion-core entry removed; an emptied entry (INFO); built controls | 2 (U1-U3), 0 (U0, U5) | S-14 (P7-G4) |
| tally | browser-plants.mjs RD, T0-T5 | independent re-derivation; a base-green key removed; a spec's keys removed; a removal masked by a same-title key elsewhere; a flip; a duplicate row removed (record) | named not held | S-12 (P7-G2) |
| selection | browser-plants.mjs S1, S2 | every spec the chain moves or creates is selected (committed bytes); a planted self-move of an unselected spec | selected | S-12 (P7-G3) |
| flake | flake-cases.mjs F1-F8 | the P7-R2 protocol: regression, flaky by one base fail, flaky by three, base-red, held, route-only fail (record), no reruns, absent | EXPECT.json | S-12 (P7-R2) |

## Regressions

`regress.mjs`: pass 7's hashed plants (I7 7, KF 4 re-expected as B18 under P7-R1, DT 6), pass 7's extra plants (XDT
4), pass 7's regress set (the pass-6 critic's 371, which carries passes 4-6). `tree-probes.sh` runs pass 7's
`tree-probes.sh` (crash.sh, peer-closure.mjs, sfc2.sh, pass 6's and pass 5's probes) from committed bytes. Batteries of
passes 3-4 are reached through those chains (pass 5's regress carries pass 4's battery; pass 3's plants are carried by
pass 4's). Every earlier critic battery under `pass-*/critique-B/battery/` is thereby imported by path, not copied.

## One probe per item

| item | probe |
|---|---|
| S-01 | `git ls-files` / `git log` of `pass-8/`: kit, results, browser selection and reports committed before this seat |
| S-02 | gate B8 0, B9 0; regressions |
| S-03 | P7-R1 (B18 in the gate and `seal.test.ts`, LAW §5), P7-R2 (LAW protocol, rerun results committed); datum rebound once; earlier rulings held |
| S-04..S-08, S-11, S-13 | gate GREEN on the replay; vitest; regressions |
| S-09 | replay MATCH from committed bytes in a fresh HEAD worktree; rerun a no-op; digest unchanged after every battery |
| S-10 | cascade verify GREEN against the floor base with the route's listing; pass 7's SFC2 via tree-probes |
| S-12 | browser-plants.mjs (RD, T1-T5, S1-S2) and flake-cases.mjs on the committed reports |
| S-14 | crash8.sh, peer-unbuilt.sh, B17 regressions |
| B-01 | 19/19 clauses GREEN, B2 0; I7 via regress |
| B-10 | KF-*/VU-* through B18; DT/XDT regressions |
| others | regressions |
