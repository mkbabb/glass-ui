# D1-B pass 3: prototype (sealed modules, flat)

Model: claude-opus-5-5, asserted from the seat's own identity. This is the second pass-3 B
seat. It continued the first seat's chain (S1..S16) and added S17..S32. The migration was
built in a linked worktree at HEAD. The chain base is `99839631`, whose code digest is
`5080bcadf20ebee0…`; HEAD has moved since on docs only, and the code digest is unchanged.

Every step comes from the route's law and runs through the floor move engine or as a frozen
exact-text row. Every law, gate, move list, authored override, row and result is under
`docs/tranches/BL/design/structure/pass-3/B-kit/`:

- `B-kit/LAW.md` states the law;
- `B-kit/lib/law.mjs` and `B-kit/gate/seal.mjs` hold its code;
- `B-kit/results/verification.md` records the output of every command cited below.

## Summary

- **Replay.** The whole chain replays from committed artifacts on a fresh HEAD worktree:
  - `--twice` passes, with each second application a no-op;
  - a rerun at the end reports `the chain is applied`;
  - the migrated tree's **code digest is
    `62878b7f2591c37e9cd2151faef9b2d4cd9b21475517e6c227fb2f404651e1cc`** over 1,434 files.
- **Toolchain.** GREEN on the replayed tree:
  - `vite build`;
  - both `vue-tsc` programs;
  - `demo:dist:build`;
  - `entries.mjs check`, `surface.mjs check` (0 differences) and `gates.mjs` (F-1, F-3,
    F-4, F-9);
  - P3-R1(a): 10 kernel entries, 285 names, 0 outside.
- **Cascade.** The cascade verifier is the listed `./styles` reorder: 1,964 = 1,964 rules,
  0 only-base, 0 only-now (the authored S4b rungs). The other three CSS entries are identical.
- **Gate: 14 of 17 clauses GREEN** under `npm test`. The pass-2 seat had 11.
  - Three are RED: **B0 450**, **B2 71** and **B6 61**.
  - `npm test`: 2,323 tests, **3 failed**, and those three are exactly the RED clauses.
    239 of 240 files pass.
  - So the §P2-6.4 bar is **not met** on "every clause GREEN". §5 says what each RED clause
    waits on.
- **Browser (F-10).** 65 specs (332 tests) ran on the floor base and on the migrated tree.
  Both give 134 passed, 190 failed and 8 skipped. The diff has **0 new failures** and
  0 cured.
- **S-13 merge test: run.** B's seal ran on G's tree and G's gate ran on B's (§4, S-13).
- **B-13: reconciled.** The 14 lines are the pass-2 gate's own file and its door, measured in
  the prototype's tree.
- **Package ratchet.** `verify:package` is RED: 2,923,674 > 2,916,129. The floor base is
  2,910,618, so the migration adds **13,056 B**. Under P3-R9 a ceiling change is its own
  ruled row.

## 1 · Replay

The command a non-author runs. Make a linked worktree at HEAD and symlink `node_modules` and
`tests-visual/node_modules` from the checkout:

```
git -C <checkout> worktree add --detach <wt> HEAD
ln -s <checkout>/node_modules <wt>/node_modules
ln -s <checkout>/tests-visual/node_modules <wt>/tests-visual/node_modules
node <checkout>/docs/tranches/BL/design/structure/pass-3/B-kit/replay.mjs --root <wt> --twice
```

The replay:

- reads `B-kit/frozen/SEQUENCE.json`;
- resumes at the step whose recorded code digest the tree holds, and refuses any other
  digest and the main checkout;
- with `--twice`, applies every step a second time and requires the digest unchanged.

The code digest is sha256 over `git ls-files -co --exclude-standard` minus `docs/`
(`B-kit/lib/digest.mjs`).

Measured on a fresh worktree:

- `--twice` took 165.9 s, with every step MATCH, ending `chain final MATCH`, `62878b7f…51e1cc`,
  1,434 files;
- the rerun reported `the chain is applied` in 0.3 s.

S1..S16 are unchanged from the first seat (floor rows, placement, carve, CSS carve and
doors, JS doors, one-door, relays, minify, surface pin, gate, first colocation). This seat
added the following steps:

| Step | Kind | Frozen artifact | What (derived from) |
|---|---|---|---|
| S17 | row | `S17-b9-homes.json` | B9: Combobox types → `command/types.ts`, `ControlSize` → `input/types.ts`; `_shared/index.ts` leaves (`authored/b9-homes.mjs`) |
| S18 | row | `S18-r8-canon-doc.json` | R-8/E-7: dead `scripts/lib/canon-doc.mjs` and its ledger row |
| S19 | moves | `S19-scripts-moves.json` | B-S15: paint helpers → `tests-visual/paint/`; `scripts/minify/`; the F-1 graph and the scanners it alone reads → `lib/graph/` (dominance); gate → `seal/` |
| S20 | row | `S20-scripts-doors.json` | B7/B1 in `scripts`: a door for every scripts module (`lib/index.mjs`, `lib/graph/index.mjs`, `seal/index.mjs`, `structure/index.mjs`, `minify/index.ts`); every crossing through it; `runGates` and the seal test in process |
| S21 | row | `S21-r1-register.json` | R-1's precondition: `gate-register` and its test retire |
| S22 | row | `S22-test-home-imports.json` | FD-2: eight motion tests read their subject from its own module |
| S23 | row | `S23-test-programs-scripts.json` | R-3 for `scripts/**/__tests__` (vitest and the test program) |
| S24 | moves | `S24-colocate.json` | R-3: 58 tests + 1 helper colocate, 0 stay (`derive/colocate-rest.mjs`, the gate's B16 reading) |
| S25 | row | `S25-gate.json` | gate re-land: scripts TS door, B2 on module references, B8's test arm, B16 kernel-as-dependency and slot helpers; the `resolve.mjs` hold |
| S26 | moves | `S26-colocate.json` | R-3: the 23 tests the amended B16 homes; 0 stay |
| S27 | row | `S27-gate.json` | gate re-land: the test seam (LAW §5) |
| S28 | row | `S28-test-doors.json` | B1: 10 colocated-test imports through the entered module's door (`derive/test-doors.mjs`) |
| S29 | row | `S29-consumer-entries.json` | R-10/B2: 103 consumer imports re-pointed at their publishing entry; 52 lines frozen as residue (`derive/consumer-entries.mjs`, `authored/consumer-holds.json`) |
| S30 | row | `S30-door-readers.json` | hashbangs leave the 11 runtime CLIs (the door loads them into DOM-environment tests); B11: the minify door keeps `minifyCss` |
| S31 | row | `S31-gate.json` | gate re-land: no hashbang; the pin after S29-S30 |
| S32 | row | `S32-test-slots.json` | two more source walkers skip `__tests__/` (route-motion, dialog-dismiss) |

Move lists go through the tree's own `scripts/structure/move.mjs`. Rows are exact-text hunks,
all or nothing (`lib/row.mjs`). No file was moved or edited by hand.

## 2 · The bar (REGISTRY §P2-6.4)

| Bar item | State | Evidence |
|---|---|---|
| idempotent whole-chain replay by a non-author | **met** | §1 |
| build | **met** | `npx vite build` → 0 |
| both vue-tsc programs | **met** | `npx vue-tsc --noEmit` → 0; `-p tsconfig.test.json` → 0 (after the build) |
| demo build | **met** | `npm run demo:dist:build` → 0 |
| surface pin | **met** | `node scripts/structure/surface.mjs check --root .` → 0 differences (68 keys, 583 runtime, 1,239 type names) |
| entries check | **met** | `node scripts/structure/entries.mjs check --root .` → exports and typesVersions byte-equal |
| every clause wired into `npm test`, no CLI-only clause | **met** | `tests/gates/seal.test.ts` imports `seal` from `scripts/structure/index.mjs` and runs it in process: one `it` per clause B0..B16, plus one requiring all seventeen |
| every clause GREEN | **not met** | 14/17 (§3) |
| FD-2 as a stop | **met** | `sccGrowth` is never overridden. Placement binds 10 files (seal meta `b10.bound`). Colocation dry-runs every move and would stay one the floor refuses; S24 and S26 needed none |
| P3-R1(a) | **met** | `node B-kit/tools/p3r1a.mjs <wt>` → `{"kernelEntries":10,"names":285,"outside":0}` |
| π and Playwright through F-10 | **met** | §6: 0 new failures |

## 3 · The gate on the migrated tree

```
node <wt>/scripts/structure/seal/seal.mjs --json out.json
```

| Clause | pass-3 first seat | Now | |
|---|---:|---:|---|
| B0 | 483 | 450 | RED: 84 walks, 366 computed reads, 0 F-1. By zone: tests 362, scripts 59, tests-visual 27, demo 1, src 1 |
| B1 | 0 | 0 | GREEN |
| B2 | 656 | 71 | RED: tests 32, demo 22, tests-visual 16, scripts 1 |
| B3–B5 | 0 | 0 | GREEN |
| B6 | 65 | 61 | RED: 55 files over 500 lines; 6 dirs over 12 |
| B7 | 4 | 0 | GREEN (S20) |
| B8 | 0 | 0 | GREEN |
| B9 | 2 | 0 | GREEN (S17) |
| B10 | 0 | 0 | GREEN: 10 FD-2-bound files, 2 holds |
| B11 | 0 | 0 | GREEN against the pin |
| B12–B15 | 0 | 0 | GREEN |
| B16 | 55 | 0 | GREEN (S21–S26) |
| **total** | **1,265** | **582** | |

The first seat's column comes from its own law. This seat amended B2 and B16 (§7), so the two
columns differ in rule as well as in tree. The pin holds:

- 135 modules;
- 116 JS doors carrying 1,286 names;
- 2 reviewed names;
- 2 holds: `isTeleportedTarget.ts` (FD-8) and `scripts/structure/lib/resolve.mjs` (F-2
  defect, §8).

## 4 · Checklist items (REGISTRY §P2-7)

Each item names the command that closes it. Every output is in `B-kit/results/verification.md`.

### S-02, S-03 · rulings

R-1..R-10, X-10 and P3-R1..P3-R9 govern the law (LAW.md). Three are applied only in part and
are named in §8:

- P3-R5 (`./aurora-config` not landed; the two boot-graph-protected files are held);
- P3-R6 (the `isTeleportedTarget.ts` hold);
- P3-R9 (the ratchet is RED as ruled).

P3-R1(a): `node B-kit/tools/p3r1a.mjs <wt>` → 0 outside.

### S-05 · FD-2 as a stop

- The law never overrides `sccGrowth`.
- `derive/colocate-rest.mjs` dry-runs each move through `runMoves({dry:true})` and stays the
  move if `scc.grown` is non-empty.
- `frozen/S24-colocate.json` and `S26-colocate.json` record `stays: []`.

### S-06 · the src self-name is an F-1 violation

`node B-kit/tools/battery.mjs <wt> out.json` → I6 `{"B0":1}`. The F-1 violation is carried by
B0.

### S-07 · the census covers computed reads

The seal counts 366 computed-path reads under B0, and the battery's I32 is caught
(`{"B0":1}`).

### S-09 · rows and the whole-chain replay idempotent

§1: `replay.mjs --root <fresh wt> --twice` → MATCH at every step; the rerun is a no-op.

### S-11 · the FD-6-class failures at 0

`npm test` on the replayed tree fails only the three RED seal clauses. S32 cured two source
walkers that colocation exposed, which is S16's class.

### S-12 · π and Playwright executed

§6.

### S-13 · the merge test run and recorded

Command: `node B-kit/tools/merge-test.mjs --b <B tree> --g <G tree> --out r.json`. G's tree is
`G-kit/tools/replay.sh <wt>` → `b26243ef…eb7c6`, MATCH.

The harness check: G's gate on G's tree gives E1 1, E4 64, E6 18, which is G-proto's
reported state.

**G's gate on B's tree:**

| Clause | Lines | Mechanism difference it names |
|---|---:|---|
| E2 | 42 | G flattens where B carves (`aurora/config/*` → `aurora/*`) |
| E7 | 44 | G homes a test by a single subject and sends a multi-unit reader to the harness. B homes it by unit with the kernel as a dependency |
| E3N | 10 | B's carve modules (`dock/controls`, `fourier-field/constants`, `menu/context`, …) are not in G's pin |
| E4 | 61 | the same bounds as B6 |
| E6 | 22 | the same R-10 residue as B2 |
| S1 | 2 | G's cross-zone scripts law: `comment-census.mjs` and `regen-spring-tokens.mjs` → tests |
| S2 | 1 | `scripts/safari-probe.mjs` has no reader |
| B12 | 1 | G reads B's scripts TS door `scripts/minify/index.ts` as a relay |
| E1 | 1 | the same FD-8 hold |

**B's seal on G's tree:**

| Clause | Lines | What it names |
|---|---:|---|
| B7 | 63 | G has no door in every dir |
| B1 | 143 | crossings into doorless dirs and kernel internals |
| B16 | 62 | G's harness-homed tests |
| B11 | 48 | structural arms only |
| B3 | 17 | `styles/index.css` imports unit sheets past their CSS door |
| B5 | 3 | doors inside `styles/` kind slots |
| B8 | 12 | a colocated test importing demo files |
| B10 | 7 | the scanners in G's `lib/scan/` |
| B4 | 2 | two cycles G carries |
| B9 | 2 | the Combobox and ControlSize republishing that B's S17 cured |
| B2 | 138 | consumer reads |
| B6 | 64 | bounds |
| B0 | 438 | walks and computed reads |

Neither tree passes the other's gate, so the two routes do not merge as they stand. The
clauses above say where they differ:

- the unit declaration (a door per dir against an eponymous root);
- where a multi-unit test lives;
- how scripts are placed across zones.

### B-02 · kernel shims 0

B8 0 and B9 0 (§3). The last two B9 lines were cured by S17, which moved each type to the unit
that publishes it, so no ruling is needed.

### B-03 · the self-name import (I6) caught

Battery: I6 → B0 1 (the F-1 violation).

### B-04 · R-3 catches I11 and I12

Battery: I11 `{"B16":1}` and I12 `{"B16":1}`.

### B-05 · B10 judges `src` and `scripts`

The seal's B10 meta lists 10 bound files. Seven are in `scripts/structure/lib/` and the
`resolve.mjs` hold is in `scripts/`; the rest are in src. Command:
`node <wt>/scripts/structure/seal/seal.mjs` (meta `b10`).

### B-06 · B13 reads the FD-10 YAML tokens

B13's bin set is every `json-command` and `yaml-command` edge into `scripts/` (gate `B13`).
Battery I29 (a bin imports a bin) → B13 1.

### B-07 · names

- Battery: `part-1` (I15), `utils` (I15b), `v2` (I15c) and `menu/menu` (I16) are caught by
  B15.
- `node B-kit/tools/probe.mjs <wt>`: `misc` is caught by B15, and `detents/use.ts` by B15 as
  a "placeholder file name".
- `slider/useDockHold.ts` passes as a reviewed name in the pin (`authored/seal-review.json`).

### B-08 · `accent-tone.css` placed per P3-R2

- `S4b-rungs.json` places it.
- `cascade.mjs verify --baseline <floor-base snapshot> --dist dist` → `./styles` reorder,
  1,964 = 1,964, onlyBase 0, onlyNow 0, first divergence `.accent-tone`.

### B-09 · the style kernel carved, `glass/` and `theme/` behind doors

`S4a-css-carve.json` and `S4c-css-doors-{1,2}.json` do the carve. Seal: B3 0, B5 0, B14 0.

### B-11 · `npm test` refuses `--no-pin`

- The landed gate has no `--no-pin` option (`grep no-pin` in `scripts/structure/seal/seal.mjs`
  and `tests/gates/seal.test.ts` finds nothing).
- `readPin` throws `the gate has no off switch` when the pin is missing.
- The test passes no option.

### B-13 · the HEAD count reconciled

Command: `node B-kit/tools/b13.mjs --wt <fresh HEAD wt> --checkout <checkout>`. It runs the
pass-2 gate, unchanged, in both pass-2 layouts:

- **the prototype's** (the gate and its door landed in the measured tree): 1,901;
- **the critic's** (the checkout judged read-only): 1,887.

The gap is 14 lines:

- **B0 +13**: the gate's own file (11 directory walks, 1 computed read, and 1 unresolved read
  of the absent `seal-pin.json`);
- **B11 +1**: `scripts/structure/index.mjs exports seal`, which has no outside reader.

Both sides read 1 line fewer than in pass 2. That line is in B0 on both sides and comes from
the floor library, which has changed since. The pass-3 gate excludes `scripts/structure`
from B0, so this class cannot recur.

## 5 · Items partly closed or open

- **B-01 · every clause GREEN: not met.** 14/17 are GREEN.
  - **B0 450**: harness directory walks and computed reads, mostly in `tests/`. It waits on
    FD-6's harness conversion (B-S12), which was not run.
  - **B2 71**:
    - 44 lines read names no entry publishes. Examples: `SectionHierarchy`,
      `useFuzzySearch`, `useGlassBackdropLuminance`, `springProjection`, `pendingRenderer`,
      `mulberry32`, the wgsl constants, `eyeglass`, easing constants. Publishing them is a
      reviewed surface growth that this seat did not make.
    - 3 are held for `./aurora-config` (P3-R5).
    - 3 are namespace imports.
    - 2 are `typeof import(…)` type reads.
    - 19 are dynamic imports (16 in `tests-visual`, run in page context).
    - Every static line is frozen with its reason in `S29-consumer-entries.json` `residue`.
  - **B6 61**: 55 files over 500 lines (src 22, tests 17, demo 10, tests-visual 9,
    scripts 3) and 6 dirs over 12: `tests-visual` 177, `tests/styles` 23, `tests/demo` 17,
    `src/components/dock/__tests__` 16, and `demo/stories/{containers,foundations}` 13 each.
    The B-S11 splits and B-S16 were not run.
- **B-10 · B-S7..B-S16.**
  - Run: S7 (B4), S8, S9, S13 (all tests colocate), S15 (scripts modules and doors, B7 0).
  - Partly run: S14 (103 of the reroutes).
  - Not run: S10 (`./aurora-config`), S11 (splits), S12 (FD-6 harness), S16 (tests-visual).
- **B-12 · door cost against the alternative: measured on one tree, battery catches not.**
  - Command: `node B-kit/tools/door-cost.mjs <wt>`.
  - B's tree has 135 modules and 157 door files. 58 of them are entry sources that are a
    module index, which the package needs anyway.
  - The remaining 99 are internal doors: 58 JS and 41 CSS, 70,462 B of source,
    351 statements. 36 of them hold one statement.
  - Under G's reading (an eponymous root by G's L3.1 `rootName` stands in for the door), at
    most 38 doors (11,028 B) could go. This is an upper bound, because the root must also
    carry every crossing name.
  - Battery catches under the alternative were not measured.
- **S-01**: the commit is the driver's.
- **S-04, S-08, S-10**: floor items. The route runs on them (FD-1 through the engine;
  `glass.css` and `theme.css` moved in S4a; FD-3 `isSlot`, FD-4 normalisation in
  `cascade.mjs`) and adds no evidence beyond §1 to §3.

## 6 · π and Playwright (F-10)

The spec list is `B-kit/results/browser-specs.txt` (65 specs, 332 tests). It covers every band
the chain moved (aurora, glass, dialog, dock, slider, blob, motion, menu, sheet,
sortable-list, tabs, deck, styles, card and chip rungs, search), plus the π floor
`substrate-paints-color.spec.ts`. S17–S32 moved tests and scripts only, and no library band
beyond the first seat's.

```
node <base wt>/scripts/structure/browser.mjs --root <base wt> --specs "$(cat B-kit/results/browser-specs.txt)" --out base.json
node <wt>/scripts/structure/browser.mjs --root <wt> --specs "$(cat B-kit/results/browser-specs.txt)" --out final.json
node B-kit/tools/browser-diff.mjs base.json final.json
```

| Tree | Ran | Passed | Failed | Skipped |
|---|---:|---:|---:|---:|
| Floor base (HEAD + S1) | 324 | 134 | 190 | 8 |
| Migrated | 324 | 134 | 190 | 8 |

`browser-diff`: `sameSpecs true`, **newFailures 0, cured 0**. The 190 failures are the base's
own; the base run took 2,095 s. The migration changes no browser outcome.

## 7 · What this seat added to the law

LAW.md has the full text.

- **Scripts doors befit their language** (§1). A TypeScript scripts module's door is
  `index.ts` (`scripts/minify/`).
- **B2 judges module references only; the test seam** (§5):
  - a test's text read and its `vi.mock` target are neither B1 nor B2;
  - a read is a scan, which B0 and B16 govern;
  - a mock must name the file its subject loads.
- **B8's test arm** (§9). A colocated test may read the tests zone and the root, never a
  consumer zone.
- **B16's kernel-as-dependency homing and slot helpers** (§9):
  - a unit test's subject excludes the kernel unless it reads nothing else;
  - a non-test file in a slot is read only by that slot's tests;
  - "test" means `*.test.ts`, `*.test-d.ts` or `*.spec.ts`.
- **An entry source inside a module is its door for a colocated test** (§5): `./motion-core`
  for motion's pointer and spring leaves.
- **R-1's retire** (S21) removes the "rostered" stay reason.
- **The `resolve.mjs` hold** (§4), with the F-2 defect as its reason.

## 8 · Open gaps

1. **B0 450, B2 71, B6 61 RED** (§5). The bar's "every clause GREEN" is not met.
2. **P3-R5 `./aurora-config` not landed.** Two things are needed:
   - The new entry, with every config name leaving `./aurora` under B9 and a MIGRATION row
     for each.
   - `tests/gates/boot-graph.test.ts` re-pointed. It pins the leaf specifier.

   `demo/shell/AppShell.vue` and `demo/chassis/hero/aurora-hero.ts` are held in
   `authored/consumer-holds.json`. Rerouting them to `./aurora` would put the runtime barrel
   into the boot graph, and the boot-graph source arm catches that.
3. **44 B2 lines read private names.** Publishing them is a reviewed pin growth. Each needs
   a MIGRATION "added" row and a surface-pin row.
4. **An F-2 engine defect (a floor gap).** Moving `scripts/structure/lib/resolve.mjs` makes
   `computeEdits` rewrite the generated root literal `"tests-visual/.cache"` in
   `GENERATED_ROOTS` to `"null"`, because `e.to` is null for a generated target. The image
   check then refuses the move. The file is held in the pin.
5. **G-BUNDLE-RATCHET +13,056 B over the floor base** (2,910,618 → 2,923,674; datum
   2,916,129). Under P3-R9 this is its own ruled row.
6. **The `isTeleportedTarget.ts` hold** (FD-8, against P3-R6), carried from the first seat.
7. **B-12's battery-catch comparison** was not measured.
8. **Stale comments.** Six test files still mention the retired `gate-register` in prose.
   No code reads it.
9. **Author-side undo is not a floor tool.** Undoing a row by reversing its hunks is ambiguous
   when a hunk's text recurs, and this seat's scratch undo hit that case. The chain was
   verified against a fresh replay before every redo. The replay itself only applies rows
   forward, so it is unaffected.

## 9 · Artifacts

Everything is under `docs/tranches/BL/design/structure/pass-3/`:

- `B-kit/LAW.md`;
- `lib/law.mjs`;
- `gate/seal.mjs` and `gate/seal.test.ts`;
- the derive tools, including this seat's `colocate-rest.mjs`, `test-doors.mjs`,
  `consumer-entries.mjs` and the re-land form of `land-gate.mjs`;
- the authored inputs, including `b9-homes.mjs`, `r8-canon-doc.mjs`, `scripts-moves.json`,
  `scripts-doors.mjs`, `r1-register.mjs`, `test-home-imports.mjs`,
  `test-programs-scripts.mjs`, `test-targets.json`, `consumer-holds.json`, `door-readers.mjs`,
  `test-slots-2.mjs` and `seal-review.json`;
- the frozen chain (`frozen/SEQUENCE.json`, S1..S32);
- `replay.mjs`;
- the tools: `p3r1a.mjs`, `probe.mjs`, `battery.mjs`, `b13.mjs`, `door-cost.mjs`,
  `merge-test.mjs`, `browser-diff.mjs` and `seqdiff.mjs`;
- `results/verification.md` and `results/browser-specs.txt`;
- this report.
