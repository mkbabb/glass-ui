# D1-G prototype, pass 2

Seat: D1 pass 2, route D1-G, PROTOTYPE. Model: `claude-opus-5-5`. Date: 2026-09-24.

HEAD history during the seat:

| run | HEAD |
|---|---|
| run 1 | `f57a3c1f` |
| runs 2 and 3 | `5b536c72` |
| RED-at-HEAD measure | `20c567d2` |

These commits differ only under `docs/`: `git diff --stat 7362b3bf 20c567d2 -- . ':!docs'` prints nothing.

All work ran in the linked worktree `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/G-proto/wt`, which has been removed (`git worktree remove --force`, exit 0; `git worktree list` has no G-proto row). This file is the only write in the checkout.

Scratch root, written `$R` below: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/G-proto/r2`. The worktree is written `$WT`.

## 1. Verdict

The prototype **RUNS** for the following steps:
- G-S0 through G-S4;
- G-S5, which the law does in-line: collapse, hysteresis and chain compression are inside stage 2;
- four relay-cure rows;
- G-S9's gate landing, wired into `npm test`;
- a bundle-ratchet rebind, which is a listed diff.

The following steps are **SPEC-ONLY**:

| step | where it stops |
|---|---|
| G-S6 | R-6 rows not run (E5 = 40); `./aurora-config` not ruled; R-5 extraction splits not run (57 files over 500 lines) |
| G-S7 | FD-6, FD-7 and FD-8 are not on the floor; R-3 test moves not run (E7 = 95) |
| G-S8 | R-10 demo reroute and stage 2 per route SFC not run (E6 = 90) |
| G-S9 | the `scripts/` law (§4.8) not run |

The bounds (E4) are not met: 71 violations on the migrated tree.

§6.4 bar, item by item:

| item | result |
|---|---|
| migration by script from a fresh HEAD worktree, on F-2 | MET. 117 engine moves plus 4 generated rows plus 1 rebind row; no hand moves |
| replay byte-identical | MET. Digest `1a4155a6…d1a9` over 12,376 files, reproduced in two fresh worktrees (§5) |
| rerun proposes 0 moves | MET with one ledgered hold. Stage 1 proposes 1 (the FD-8 hold); stage 2 components 0; global arm 0 |
| build, demo build, vue-tsc (both programs), regen (`entries.mjs check`), `npm pack`, `verify:package` exit 0 | MET. `verify:package` needs the rebind row (§6) |
| 68 export keys, 62 typesVersions byte-identical; 1,279 declaration, 603 runtime names | MET. `surface.mjs check`: 0 differences; `public-surface.spec.ts` 96/96 |
| cascade identical by the F-4 verifier | MET. Floor verifier GREEN and FD-4 verifier GREEN on all four CSS entries |
| every vitest failure in a named, ruled class; 0 uncollected; boot-graph within its ceiling | PARTLY. 5 failures, all layout-pinning scanners (FD-6 class, ruling owed). 0 files with 0 tests. `boot-graph.test.ts` 14/14 |
| gate RED at HEAD, GREEN on the migrated tree, wired into npm test | MET for E0 through E3. E4 through E7 are RED on both trees (their cures are the SPEC-ONLY steps) and are CLI-only |
| critic battery caught in full | NOT MET. 28 of 36 scored plants caught, 6 missed, 2 not run (§7) |
| no clause's zero from the migration's own function (F-9) | NOT MET for E1 and E2. Both run the law the migration ran. SPECS-v2 §4.5 accepts frozen lists plus plant bites instead; this is disclosed in §7.3 |
| no relays, door-less sealed dirs or placeholder names | MET. E1 relays 0; E3 0 (eponymy, dual home, placeholder regex) |
| no component file moved out without a named reason | MET. Every stage-1 move carries F-7's reader set (Appendix A) |
| bounds enforced or ruled | NOT MET. E4 = 71 |
| gestalt walk of dock, aurora, sheet and deck | §9 |
| π and Playwright | not run. There is no browser seat: the chrome-devtools and playwright MCP servers failed to connect. The cascade is identical, so π is not owed; no route moved, because the demo stage was not run |

## 2. Commands

`$T` = `docs/tranches/BL/design/structure/floor`. Every command ran in `$WT`.

```sh
# worktree
git worktree add --detach $WT HEAD
ln -s /Users/mkbabb/Programming/glass-ui/node_modules $WT/node_modules
ln -s /Users/mkbabb/Programming/glass-ui/tests-visual/node_modules $WT/tests-visual/node_modules

# G-S1: floor rows f3, f4, m02, m03, f9
node $T/rows/apply.mjs --root $WT

# G-S2 to G-S4 (run 1: propose, freeze, apply; each list frozen under $R/frozen)
node $R/tools/migrate.mjs --root $WT --stage 1 --tag S2-stage1-passN --frozen $R/frozen            # N = 1..4
node $R/tools/migrate.mjs --root $WT --proposer $R/tools/aggregators.mjs --tag S3-aggregators ...   # G-S3
node $R/tools/migrate.mjs --root $WT --stage 2 --arm components --tag S4-stage2-passN ...
node $R/tools/migrate.mjs --root $WT --stage 2 --arm global --tag S4-global-passN ...
node $R/tools/repoint.mjs ... --dissolve|--evict <door>    # relay rows, written as exact-text JSON
node $R/tools/apply-row.mjs <row.json> --root $WT

# replay (runs 2 and 3)
node $R/tools/replay.mjs --root $WT --frozen $R/frozen              # run 2: 1:45.85
node $R/tools/replay.mjs --root $WT --frozen $R/frozen --twice      # run 3: 6:40.35
node $R/tools/digest.mjs ; node $R/tools/digest-at.mjs ...

# toolchain
npm run build
npx vue-tsc --noEmit
npx vue-tsc --noEmit -p tsconfig.test.json
npm run demo:dist:build                 # vite build --config demo/vite.demo-dist.config.ts
node $T/entries.mjs check --root $WT    # regen: exports and typesVersions regenerate byte-equal
node $T/surface.mjs check --root $WT
node $T/cascade.mjs verify ...          # floor verifier against $R/out/cascade-HEAD (baseline f57a3c1f)
node $R/tools/cascade-fd4.mjs --root $WT --base-dist $R/out/dist-HEAD --dist $WT/dist
node $T/gates.mjs --root $WT
node $T/graph.mjs --root $WT
npm test -- --reporter=json --outputFile=$R/out/vitest-final.json   # 35.2 s
npm pack
npm run verify:package                  # node scripts/verify-export-types.mjs

# gate
node scripts/structure/eponym.mjs --root $WT --json <out>                 # all eight clauses
npx vitest run tests/gates/eponym.test.ts                                 # E0-E3, at HEAD
node $R/tools/plants.mjs --root $WT --out $R/out/plants.json              # battery, about 7 min
node $R/tools/plants.mjs --root $WT --only B-26 --out $R/out/plants-B26-fixed.json

# measures
node $R/tools/sccs.mjs $WT ; node $R/tools/sccs-readers.mjs $WT ; node $R/tools/door-reach.mjs $WT

# teardown
git worktree remove --force $WT
```

The log for each command is in `$R/logs/` and its JSON output is in `$R/out/`.

## 3. HEAD and base

"Base" means HEAD with the floor rows applied (G-S1).

| measure | HEAD | base |
|---|---:|---:|
| F-1 edges / violations | 7,171 / 0 | 7,138 / 0 |
| build | exit 0 | exit 0 |
| surface (keys / typesVersions / runtime / declaration) | 68 / 62 / 603 / 1,279, 0 diffs | same |
| cascade baseline (rules) | `./styles` 1,964 · fonts 4 · theme 4 · `./styles.css` 365 · 6 scoped keyframes | GREEN against HEAD |
| vitest files / tests / passed / failed / skipped | — | 240 / 2,328 / 2,327 / 0 / 1 |
| `verify:package` | CLEAN, ratchet equal at 2,916,129 | **RED**: `G-BUNDLE-RATCHET … increase forbidden: 2916240 > 2916129` (+111 B, from the floor rows) |
| unit-grain static SCCs | 16, 3, 2, 2 | 7, 3, 2, 2 |
| reader-grain SCCs | 6 (M02: overlay, dock, menu, select, tabs, motion/morph), 3, 2, 2 | 3, 2, 2 |
| leaf-grain SCCs | 7, 2 | 2 |
| src file-level value SCCs | 2, 2 | 2, 2 |
| `src` files / dirs / max depth | 658 / 120 / 5 | — |
| component dirs | 83 | — |

## 4. Migration, step by step

Every step passed the floor engine with residue 0, image 7,138 → 7,138 edges, 0 lost, 0 gained, and 0 undeclared scan deltas.

| step | moves | files edited | rewrites | scan deltas | dirs moved | pruned |
|---|---:|---:|---:|---:|---:|---:|
| S2 stage 1, pass 1 | 21 | 65 | 96 | 80 | 1 | 2 |
| S2 stage 1, pass 2 | 4 | 10 | 17 | 12 | 0 | 0 |
| S2 stage 1, pass 3 | 3 | 10 | 10 | 9 | 0 | 0 |
| S2 stage 1, pass 4 | 0 (1 held, see below) | — | — | — | — | — |
| S3 aggregators | 4 (1 held) | 6 | 38 | 19 | 0 | 0 |
| S4 stage 2 components, pass 1 | 82 | 126 | 286 | 507 | 3 | 7 |
| S4 stage 2 components, pass 2 | 0 (fixpoint) | | | | | |
| S4 stage 1 recheck | 0 (1 held) | | | | | |
| S4 global arm, pass 1 | 3 | 15 | 26 | 9 | 0 | 0 |
| S4 global arm, pass 2 | 0 (fixpoint) | | | | | |
| S4 stage 2 recheck, stage 1 recheck | 0, 0 (1 held) | | | | | |
| **total engine** | **117** | | **473** | **636** | | |

Rewrites in S4 pass 1 by kind: import 160, import-type 49, reexport 28, path-literal 19, path-helper 9, reexport-star 7, dynamic 7, vi-mock 6, import-type-node 1.

**Holds.**
1. **FD-8.** `_shared/overlay/isTeleportedTarget.ts` → `dock/` (F-7: dock is its one reader). The engine rolled it back three times, each with image 7,138 → 7,137. The lost edge is `demo/demo.css|css-source|…/isTeleportedTarget.ts`: `demo/demo.css:106 @source ../src/components/_shared/**/*.ts` loses the match. The move is ledgered in the landed `scripts/structure/holds.json` with the ruling FD-8.
2. **Floor F-2 limit.** `src/styles/glass.css` → `glass/index.css`. `tests/styles/glass-subtlety.test.ts:798-799` quotes the base-relative `glass/grasp.css` and `glass/rim.css`. After the move they rewrite to one segment, which F-1 does not read as a path, so the image loses the edge. This is held in the S3 proposer's list only; the gate has no aggregator clause.

**Relay rows.** Generated by `repoint.mjs` and applied by `apply-row.mjs`, all-or-nothing:

| row | door | written | removed |
|---|---|---:|---:|
| 1 | dissolve `src/composables/search/index.ts` (a pure relay once stage 1 moved search into dock); 3 importers re-pointed; the door dropped from `record.doors` | 4 | 1 |
| 2 | dissolve the kind-slot barrel `dock/composables/index.ts` | 2 | 1 |
| 3 | evict `useCanvas2D` from the canvas2d door; `vi.mock` re-aimed in `Constellation.palette-lifecycle.test.ts` | 4 | 0 |
| 4 | evict it from `src/composables/glass/index.ts`; `src/index.ts` points at `constellation/composables/useCanvas2D` | 2 | 0 |

**Rebind row.** `.bundle-ratchet` goes from `2916129` to `2915235`. See §6.

## 5. Replay and idempotence

- **Run 1** (worktree at `f57a3c1f`, generation). The floor digest and an independent sha256 over `git ls-files -co --exclude-standard` agree: `1a4155a6ddcc5e635c5e8a7bed781bcc17ef03b993cfb62dd45e4f4579d0d1a9`, 12,376 files.
- **Run 2** (fresh worktree at `5b536c72`, `replay.mjs`). The raw digest is `5517729a…a8fd`. The only difference is the 3 docs files changed between the two HEADs (`FORMATION-PROGRESS.md`, `audit/INBOUND-MAP.md`, `audit/REGISTRY.md`). With those taken at `f57a3c1f` (`digest-at.mjs`), the digest is `1a4155a6…d1a9`.
- **Run 3** (fresh worktree at `5b536c72`, `replay.mjs --twice`). Each of the 17 steps was applied a second time at once. Every second application had pending 0, written 0, removed 0 and an unchanged digest. The adjusted final digest is `1a4155a6…d1a9`.
- A full replay from step 1 on the final tree is not idempotent in the literal sense: the multi-pass lists fail with "source and target both absent". The per-step `--twice` run is the idempotence evidence instead.

## 6. The migrated tree

"Migrated" (M1) is the run-1 tree. "Final" is the run-3 tree with the gate landed.

| measure | migrated (M1) | final |
|---|---:|---:|
| F-1 edges / violations | 7,119 / 0 | 7,166 / 0 (the landed gate adds edges) |
| build / 4 floor gates / entries check | exit 0 / pass / PASS | same |
| surface | 68 / 62 / 603 / 1,279, 0 diffs | same |
| cascade, floor verifier | GREEN, all 4 entries identical | GREEN |
| cascade, FD-4 verifier | GREEN; scoped keyframes 6 = 6 in `./styles` and `./styles.css` | GREEN |
| vue-tsc (src program, test program) | exit 0, exit 0 | exit 0, exit 0 |
| demo build | exit 0 | exit 0 |
| vitest files / tests / passed / failed / skipped | 240 / 2,328 / 2,322 / 5 / 1 | 241 / 2,332 / 2,326 / 5 / 1 |
| `public-surface.spec.ts`, `boot-graph.test.ts`, `floor.test.ts` | green | 96/96, 14/14, 4/4 |
| `npm pack` | exit 0 | exit 0; 1,024,460 B, 840 files |
| `verify:package` | RED: `bundle ratchet shrink — rebind down deliberately: 2915235 < 2916129` | CLEAN after the rebind row; unpacked 2,915,235, equal |
| `src` files / dirs / max depth | | 656 / 131 / 7 |
| component dirs | | 95 |

`src` files go from 658 to 656 because rows 1 and 2 delete 2 doors. The package `files` field is `dist` and `MIGRATION.md`, so the gate does not ship.

**The ratchet.** The floor rows raise the bundle by 111 B, so the base is already RED. The migration lowers it by 1,005 B against the base (894 B against the HEAD datum). The rebind row makes the check CLEAN. An owner-worded rebind is owed.

**The 5 vitest failures** are all layout-pinning scanners, the FD-6 class, whose ruling is owed:
- `tests/components/sortable-list/battery.test.ts`, 4 failures.
  - G-5 and G-12 read `readdirSync(src/components/sortable-list)` and then `readFileSync` each entry. The new `sortable/` dir raises EISDIR.
  - A third test pins `drag.ts` at the unit root and fails with "drag.ts missing".
  - A fourth opens `src/components/sortable-list/drag.ts` and fails with ENOENT.
  - Stage 2 nested these files in `sortable/` and `sortable/drag/`.
- `tests/components/custom/dock/g-dock-lattice.test.ts:647`: `expected 5 to be 4`. It counts files matching `/controls/`, and S3 added `styles/controls/index.css`.

**SCCs on M1.**
- Unit-grain static: 30, plus blob 3, sheet↔content 2, fourier-field↔wgpu 2, toast↔toaster 2, sortable↔drag 2, and demo aurora 2.
- Reader-grain: aurora 4, blob 3, glass↔webgl 2, fourier-field↔wgpu 2, sortable↔drag 2, demo 2.
- Leaf grain: 13.
- src file-level value SCCs: 2, 2, unchanged.

M02 (reader grain) is cut at the base by row m02. M03 (dialog↔sheet) is cut by the stage-1 move of `ModalOverlay.vue` into `_shared/`. **FD-2's no-growth rule is violated**, in two ways:
1. The unit-grain SCC grows from 7 to 30. The kernel doors (`./dom`, `./motion-core`, `./reactive`) now publish files that stage 1 moved into component interiors (§9.5). Each such door dir and the component dir read each other.
2. Nesting creates parent↔child cycles. A nested root's dir reads a ⊤-owned file at its parent, and the parent's root reads the child. For example, `sheet/content/` reads `sheet/motion.ts`.

At G's grain the second kind is intra-unit. Whether FD-2 counts it is a question for the spec.

## 7. The gate

The gate is `scripts/structure/eponym.mjs`, 179 lines, sha256 `b87fdfe4…b306`. It imports:
- `scripts/structure/g-law.mjs`: 309 lines, `6ea80994…eeb`;
- `scripts/structure/dominance.mjs`: 107 lines, `ef3be174…df3c`;
- `scripts/structure/holds.json`: 1 row, `695b65c9…0c63`;
- the floor libs under `docs/tranches/BL/design/structure/floor/lib/`.

The npm test wiring is `tests/gates/eponym.test.ts` (34 lines, `c31a0780…2da3`). It runs `--clauses E0,E1,E2,E3` in a child process, with one `it` per clause.

Clauses:
- **E0**: F-1 violations, plus a src file importing the package by its own name (module edges only).
- **E1**:
  - stage 1 (F-7 with the FD-1 anchor and FD-3 slots) proposes 0 moves beyond the ledger;
  - no stale ledger rows;
  - no relays: a non-entry door publishes only from inside its dir; a component root door publishes no other component's file; no non-door file consists only of re-exports.
- **E2**: stage 2 (components arm plus global arm) proposes 0 moves.
- **E3**:
  - every non-slot code dir holds an eponymous root or an `index.*` door;
  - a root dir's root has a closure;
  - no two sibling dirs normalise to one name;
  - no placeholder or provenance names.
- **E4**: at most 12 direct files per dir (slots included) and at most 500 lines per file.
- **E5**: no symbol origin on two non-root entries, keyed by file plus origin name.
- **E6**: the demo reads src only through entry sources.
- **E7**: a single-subject test lives in `<unit>/__tests__/`.

### 7.1 RED at HEAD, GREEN on the migrated tree

The last row is a fresh worktree at `20c567d2` with the landed gate files copied in.

| tree | E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| HEAD (final gate code) | 0 | **23** (22 moves + 1 relay; 1 held) | **74** | **8** | 75 | 40 | 90 | 86 |
| base (final gate code) | 0 | **22** (21 moves + 1 relay; 1 held) | **74** | **8** | 75 | 40 | 90 | 86 |
| migrated M1 (before the holds ledger existed) | 0 | 1 | 0 | 0 | 71 | 40 | 90 | 95 |
| final (landed) | 0 | **0** | **0** | **0** | 71 | 40 | 90 | 95 |

- **The E1 relay at HEAD** is `dock/composables/index.ts` publishing `isTeleportedTarget` from `_shared/overlay`.
- **The E3 dirs at HEAD** are `aurora/constants`, `aurora/constants/shaders`, `blob/shaders`, `dock/styles/controls`, `fourier-field/renderer`, `fourier-field/shaders`, `sheet/detents` and `typewriter/utils`.
- **E4 at HEAD** is 18 dirs and 57 files. On the final tree it is 14 dirs and 57 files:
  - `tests-visual` 177;
  - `tests/components` 43;
  - `src/styles/glass` 28;
  - `tests/styles` 28;
  - `src/styles/tokens` 21;
  - `tests/demo` 17;
  - `src/components/menu` 16, the only stage-2 peer set;
  - `src/styles` 16;
  - `tests/components/custom/dock` 16;
  - `dock/styles` 14 (a slot);
  - `tests/components/custom/aurora` 14;
  - `tests/composables` 14;
  - `demo/stories/containers` 13;
  - `demo/stories/foundations` 13.
- **E7 rises** from 86 to 95 because stage 2 nests subjects while their tests stay in `tests/`.
- **The npm-test wiring at HEAD:** `npx vitest run tests/gates/eponym.test.ts` exits 1, with E1, E2 and E3 failed and E0 passed. In `npm test` on the final tree the same four tests pass.

### 7.2 The critic's battery

The battery is `scratchpad/D1/p2/G-crit/battery.md`, stamped 2026-09-23T19:08:13 and written before any G gate existed. It has 36 scored plants and 2 probes, transcribed onto migrated paths.
- **Overlay plants** are judged in memory.
- **Move plants** run through the floor engine, are judged, and are moved back. The tree digest before and after the whole battery is `825800e2…871c` = `825800e2…871c`.
- **CAUGHT** means a clause count rose above the unplanted baseline (E0 0, E1 0, E2 0, E3 0, E4 71, E5 40, E6 90, E7 95).

| id | class | planted | verdict | clauses that rose |
|---|---|---|---|---|
| B-01 | module composable → global | engine, 4 rewrites | CAUGHT | E1 0→1 |
| B-02 | global composable → component | engine, 6 | CAUGHT | E1 0→1 |
| B-03 | nested root's file left in parent (`useDockRun`) | engine, 5 | CAUGHT | E1, E2 0→1 |
| B-04 | root with a private closure, no dir | overlay | CAUGHT | E1 0→1, E2 0→3 |
| B-05 | dir without an eponymous root | engine, 4 | CAUGHT | E1, E2, E3 0→1 |
| B-06 | placeholder, self-eponymous (`part-1/part-1.ts`) | engine, 5 moves, 16 | CAUGHT | E3 0→1 |
| B-07 | two dirs normalising to one root | overlay | CAUGHT | E1 0→1, E2 0→1, E3 0→2 |
| B-08 | relative deep import past a unit | overlay | CAUGHT | E1 0→1 |
| B-09 | package self-name import in src | overlay | CAUGHT | E0 0→1 |
| B-10 | CSS `@import` of a private sheet | overlay | **MISSED** | — |
| B-11 | inline `<style>@import` in an SFC | overlay | CAUGHT | E1 0→1 |
| B-12 | non-literal dynamic import | overlay | CAUGHT | E1 0→2 |
| B-13 | `new URL(…, import.meta.url)` | overlay | CAUGHT | E1 0→1 |
| B-14 | `import.meta.glob` across units | overlay | **MISSED** | — |
| B-15 | demo past a door | overlay | CAUGHT | E6 90→91 |
| B-16 | dual door, renamed alias | overlay | CAUGHT | E1 0→1, E5 40→41 |
| B-17 | re-export shim after a move | overlay | CAUGHT | E1 0→1 |
| B-18 | path alias as a second route | overlay | CAUGHT | E1 0→1 |
| B-19 | 13 peers under one root | overlay | CAUGHT | E2 0→15, E3 0→1, E4 71→72 |
| B-20 | file over 500 lines | overlay | CAUGHT | E4 71→72 |
| B-21 | fake `@generated` exemption | overlay | CAUGHT (not exempted) | still listed by E4 |
| B-22 | SFC carve by `<style src>` | overlay | **MISSED** | — |
| B-23 | test outside its subject | overlay | CAUGHT | E7 95→96 |
| B-24 | test in the wrong unit's slot | overlay | CAUGHT | E0 0→2, E2 0→3, E3 0→1, E7 95→96 |
| B-25 | whole-library suite pulled into a unit | engine | **NOT RUN**: the engine refused (image lost 2 `path-literal` edges to `dist` and a `tsconfig.build.json` json-glob edge) | — |
| B-26 | skeleton away from its component | overlay | CAUGHT (second run) | E1 0→1 |
| B-27 | SFC in a `composables/` slot | overlay | CAUGHT | E1 0→1, E2 0→1 |
| B-28 | component sheet → global aggregator | engine, 18 | **MISSED** | — |
| B-29 | constant misplaced globally (transcribed: `aurora/presets.ts`) | engine, 36 | CAUGHT | E1 0→1 |
| B-30 | symbol-grain misplacement | overlay | **MISSED** | — |
| B-31 | comment opt-out | overlay | CAUGHT | E1 0→1 |
| B-32 | unresolved edge, fail-closed | overlay | CAUGHT | E0 0→1 |
| B-33 | masked runtime fallback | overlay | CAUGHT | E1 0→1, E2 0→25, E3 0→1 |
| B-34 | backend long dir (transcribed: 2 files, `scripts/` holds 12) | overlay | CAUGHT | E4 71→72 |
| B-35 | backend helper outside its module | — | **NOT RUN**: its premise is a `scripts/` migration, which was not run | — |
| B-38 | backend composable-equivalent misplaced | engine, 2 | **MISSED** | — |

**Score: 28 of 36 caught.** 6 were missed (B-10, B-14, B-22, B-28, B-30, B-38) and 2 were not run (B-25, B-35).

- **B-10 and B-28:** CSS whose loaders are all CSS aggregators is held in stage 1, which is counterexample 6's concession.
- **B-14:** F-7 reads no edge out of a door, and `deck/index.ts` is a door.
- **B-22:** there is no carve clause.
- **B-30:** placement is at file grain.
- **B-38:** there is no `scripts/` placement clause.

Probes, reported and not scored:
- **B-36, composition root** (`dock/wire.ts` importing 5 dock composables, read by GlassDock.vue). E1 and E2 each demand 1 move: `wire.ts → dock/glass-dock/wire.ts`. No move of the composables under `dock/wire/` is demanded.
- **B-37, legitimate reuse** (`sheet/content/projection.ts` importing dock's `dockMorphMeasure`). E1 demands `dockMorphMeasure → src/composables/` and E2 demands it at the dock root. One new importer costs one move, and the two clauses name different homes. E1 runs first and is the operative one.

### 7.3 Disclosures (F-9)

- **Clauses added after reading the battery.** These gate clauses were added or refined after the battery was read:
  - E0 self-name imports (B-09);
  - E1 relays and shims (B-16, B-17);
  - E3 placeholder names and dual homes (B-06, B-07);
  - E5 keyed by origin (B-16).

  B-06, B-09, B-16 and B-17 are caught only by those clauses. Without them the score is 24 of 36. B-07 is caught by E1 and E2 as well.
- **B-26.** B-26 first ran MISSED because of a plant defect. Its regex `/(<script setup lang="ts"[^>]*>\n)/` does not match `DataTable.vue`'s `<script setup lang="ts" generic="T extends Record<string, any>">`, so no edge was planted. The regex was fixed to allow quoted attributes and to throw on no match (`plants.mjs`; the old file is kept as `plants.v1.mjs`). The re-run is CAUGHT. The gate did not change between the two runs.
- **E1 and E2 zeros.** The migrated tree's E1 and E2 zeros come from the same `g-law.mjs` functions the migration ran. SPECS-v2 §4.5 answers this with frozen lists plus plant bites:
  - E1 rose in 18 scored plants: B-01 to B-05, B-07, B-08, B-11 to B-13, B-16 to B-18, B-26, B-27, B-29, B-31 and B-33;
  - E2 rose in 8: B-03 to B-05, B-07, B-19, B-24, B-27 and B-33.

  E3 is computed by `eponymy()`, not by the placement law.
- **Transcriptions.**
  - B-03 is transcribed onto `useDockRun`, because stage 2 has no `dock-crossfade/` dir.
  - B-29 is transcribed onto `aurora/presets.ts`. `aurora/constants/budget.ts` is read by `blob/composables/useMetaballRenderer.ts`, so the law itself moved it to `src/composables/` at stage 1.
  - B-34 plants 2 files, because row f3 deleted `regen-exports.mjs`.

## 8. Law choices beyond the spec

| choice | effect |
|---|---|
| CSS hold: a stylesheet whose every loader is a CSS aggregator is held (§1.4) | keeps `chip/accent-tone.css` out of `src/styles`; costs B-10 and B-28 |
| global-zone landing: in `src/composables` the home dir is the slot itself | no `composables/glass/composables/` stutter |
| sibling-stem rename on a collision: a file takes its sole export's name, and a same-stem sibling moving to the same dir follows | `webgl/shaders/flow.glsl.ts` and `flow.wgsl.ts` → `curl-fbm.*` |
| `STAGES` naming: a remainder that is only a shader-stage suffix keeps the full stem | `aurora.frag.ts` → `aurora-frag/`, not `frag/` |
| slot tolerance: a file already in a `composables/` or `styles/` slot of its computed dir is home | stops flattening slots into owner roots (aurora 14, deck 14, constellation 13 before) |
| eponymy pin: the unit's eponymous root stays at the unit root | `Toast.vue`, `Aurora.vue` and others are not nested |
| hook-only `composables/`: a ⊤-owned file goes to `U/composables/` only when it is a `use*` hook read by 2 or more sub-roots | contexts such as `dockContext` stay where they are |
| relay-cure rows (FD-5 class) generated by `repoint.mjs` | 4 rows, §4 |
| auto-hold: an image failure on a glob or `css-source` edge holds the move as FD-8 and retries | 1 hold |

## 9. Gestalt walk

File lists come from the migrated tree (`$R/out/gestalt-M1.txt`).

**9.1 dock** (50 files):
- Root: `DockBackgroundToggle.vue`, `DockControl.vue`, `DockCrossfade.vue`, `DockLayer.vue`, `DockLayerGroup.vue`, `DockSeparator.vue`, `DockTrigger.vue`, `README.md`, `constants.ts`, `index.ts`.
- `composables/`: `dockContext`, `dockCrossfadeContext`, `dockSwitcherContext`, `useDockSpring`, `useDockState`.
- `glass-dock/`: `GlassDock.vue`, `dockMorphMeasure`, `useDockClickIntegrity`, `useDockMorph`, `useDockRun`, `useDockShellProps`.
  - `glass-dock/glass-backdrop-luminance/`: `useGlassBackdropLuminance`, `backdropLuminanceSample`, `backdropSampleMath`, `useRAFLoop`, `useYieldToMain`.
- `search/`: `useDockSearch`, `useFuzzySearch`, `useScrollChrome`, `match`, `types`.
- `styles/`: 14 sheets plus `controls/` (`index.css`, `icon-button`, `tab-button`, `touch-floor`, `triggers`).

Assessment:
- Search and GlassDock's morph and run closure form real modules.
- The predicted `morph/` does not appear, because `useDockMorph` is dominated by GlassDock.vue.
- The predicted `dock-crossfade/` does not appear, because `dockCrossfadeContext` has 2 or more readers, so it stays in `composables/`.
- **Defect:** `useRAFLoop` and `useYieldToMain` are general motion primitives. The `./motion-core` entry still publishes them, from 3 levels inside dock (§9.5).

**9.2 aurora** (39 files):
- Root: `Aurora.vue`, `DESIGN.md`, `README.md`, `index.ts`, `presets.ts`, `renderMode.ts`. The `constants/` dir is dissolved, and `budget.ts` went to `src/composables/`.
- `composables/`: `useAurora`, `useCursorInteraction`, `useScrollProgress`, `atoms`, `atoms-fields`, `auroraFallbackGround`, `color`, `configSource`. The last 5 are not hooks; slot tolerance keeps them.
- `runtime/` (25 files):
  - direct: `runtime`, `frameLoop`, `uniformBridge`, `textureUpload`, `auroraImageSource`;
  - `gl-setup/`: `glSetup`, `aurora.vert`, `aurora-image.frag`;
    - `gl-setup/aurora-frag/`: `aurora.frag`, `brush`, `composition`, `curl-fbm`, `flow`, `tonemap`;
    - `gl-setup/aurora-frag/mediums-glsl/`: `mediums`, `metal-medium`, `oil-modes`, `vangogh-medium`;
  - `wgpu-setup/`: `wgpuSetup`, `uniformBridgeWGPU`, `uniformBridgeWGPUImage`, `aurora-image.wgsl`;
    - `wgpu-setup/aurora-wgsl/`: `aurora.wgsl`, `aurora-mediums.wgsl`, `curl-fbm.wgsl`.

Assessment:
- **Counterexample 1 is answered:** the two backends separate, 13 files under GL and 7 under WGPU, and share the 5-file `runtime/` root.
- The names `aurora-frag`, `mediums-glsl` and `aurora-wgsl` are file-derived rather than authored.
- `src/components/aurora/runtime/gl-setup/aurora-frag/mediums-glsl/` is the new maximum depth of 7.

**9.3 sheet** (6 files):
- `content/`: `SheetContent.vue`, `projection.ts`, `use.ts`.
- Root: `index.ts`, `motion.ts`, `styles.css`.

The authored name `detents` is lost to `content`, and `use.ts` (which holds `useSheetDetents`) no longer says what it holds. This is counterexample 3, unanswered.

**9.4 deck** (20 files), unchanged:
- Root: `DeckSlide.vue`, `DeckStage.vue`, `README.md`, `constants.ts`, `index.ts`, `slideContext.ts`, `types.ts`, `window.ts`.
- `composables/`: 6 `useDeck*` hooks and `useEdgeZones`.
- `styles/`: 5 sheets.

The law finds nothing to move.

**9.5 Kernel doors publishing component interiors.** Measured by `door-reach.mjs` on the final tree. Amended R-2 allows this, since a kernel door anchors nothing. The cost is general hooks placed inside components and the unit SCC of 30.

| entry | publishes | from |
|---|---|---|
| `./dom` | `useClipboard` | `components/easing/` |
| `./dom` | `useDragVelocity` | `components/slider/` |
| `./motion-core` | `useScrollProgress` | `components/aurora/composables/` |
| `./motion-core` | `useRAFLoop`, `yieldToMain` | `components/dock/glass-dock/glass-backdrop-luminance/` |
| `./motion-core` | `useRoutePointer` | `components/constellation/composables/` |
| `./motion-core` | `useScrollChrome` | `components/dock/search/` |

The demo chassis `CodeBlock.vue` reads `components/easing/useClipboard.ts`, which is an E6 row.

**9.6 Other naming results.**
- `dock/composables/useDockHold.ts` → `slider/useDockHold.ts`: the name says dock, but the file now lives in slider.
- `fourier-field/renderer/` → `wgpu/`: the authored name is lost.
- `typewriter/utils/` dissolves into the unit root.
- `toast/toaster/` holds `Toaster.vue`, `use-toast.ts` and 3 sub-SFCs.
- `tabs/segmented-tabs/` and `sortable-list/sortable/drag/` nest.

**9.7 The six counterexamples, re-measured on the result.**
1. **Backends:** separated (9.2). Blob does the same: `wgpu-setup/` against `build-metaball-program/`.
2. **Peer sets:** not answered. There are 14 dirs over 12, including `menu` (16, the one peer set stage 2 reports), `styles/glass` 28, `styles/tokens` 21 and `tests-visual` 177.
3. **Roots without the dir's name:** `sheet/detents` and `fourier-field/renderer` lose their names. `styles/tokens` keeps its name through S3 (`tokens/index.css`).
4. **Composition roots:** B-36 demands 1 move, not 13. The value.js and speedtest wiring test was not run in this seat.
5. **Churn:** one edge can re-root many files. B-33's single fallback import demands 25 stage-2 moves, B-19 demands 15, B-24 (a test file in a slot) 3, and B-37 1. This is per plant, not a rate.
6. **CSS:** conceded. Stage 1 holds aggregator-only sheets (B-10 and B-28 missed), and the cascade stays identical.

## 10. Open gaps

1. **E4 unmet (71).** 14 dirs over 12 and 57 files over 500 lines. R-5 extraction splits (G-S6) were not run, and the peer sets need modules G cannot name.
2. **E5 = 40.** R-6 rows were not run. The ruling's 29 against the measured 40 is not reconciled.
3. **E6 = 90.** The R-10 demo reroute (G-S8) was not run.
4. **E7 = 95.** R-3 test moves (G-S7) were not run. FD-6, FD-7 and FD-8 are not on the floor.
5. **The 5 vitest failures** are layout-pinning scanners (FD-6), with the ruling owed.
6. **Two holds:**
   - FD-8 `isTeleportedTarget.ts`, where a ruling is owed on how a Tailwind `@source` glob treats a file that leaves its match;
   - the F-2 limit on `glass.css`, since base-relative single-segment literals are not read by F-1.
7. **The bundle ratchet:** the owner-worded rebind is owed. The floor rows alone make the base RED (+111 B).
8. **FD-2 no-growth is violated:** the unit SCC grows from 7 to 30 through kernel doors publishing component-interior files, and nesting adds parent↔child cycles.
9. **F-9:** the E1 and E2 zeros come from the migration's own law. 4 catches depend on clauses added after the battery was read.
10. **Missed plants:** B-10, B-14, B-22, B-28, B-30 and B-38. B-25 and B-35 were not run.
11. **The `scripts/` law (§4.8)** was not run, so the gate has no scripts-placement clause.
12. **The gate's runtime imports the floor libs from `docs/`.** Landing it for real needs the floor libs moved under `scripts/` first.
13. **π and Playwright were not run** (no browser seat). The cascade is identical, and no route moved.

## Appendix A. Move lists (frozen, applied in this order)

**Stage 1**, with F-7's reader set as the named reason:

Pass 1:
- `aurora/constants/budget.ts` → `src/composables/budget.ts` (aurora, blob)
- `dialog/ModalOverlay.vue` → `_shared/ModalOverlay.vue` (dialog, sheet)
- `dock/composables/useDockHold.ts` → `slider/useDockHold.ts` (slider)
- `fourier-field/shaders/{compute,render}.wgsl.ts` → `fourier-field/renderer/`
- `composables/dom/useClipboard.ts` → `components/easing/`
- `composables/dom/useDocumentVisibility.ts` → `composables/motion/core/`
- `composables/dom/useDragVelocity.ts` → `components/slider/`
- `composables/glass/canvas2d/useCanvas2D.ts` → `components/constellation/composables/`
- `composables/glass/useGlassBackdropLuminance.ts` → `components/dock/composables/`
- `composables/glass/webgl/createCanvasLifecycle.ts` → `composables/glass/`
- `composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts` → `components/aurora/constants/shaders/curl-fbm.{glsl,wgsl}.ts`
- `composables/motion/core/useRAFLoop.ts` → `composables/glass/`
- `composables/motion/core/useViewTransition.ts` → `composables/motion/route/`
- `composables/motion/morph/useElementMorph.ts` → `composables/motion/`
- `composables/motion/pointer/useRoutePointer.ts` → `components/constellation/composables/`
- `composables/motion/scroll/useScrollChrome.ts` → `components/dock/composables/`
- `composables/motion/scroll/useScrollProgress.ts` → `components/aurora/composables/`
- `composables/reactive/useTimer.ts` → `composables/dom/`
- `composables/search/useFuzzySearch.ts` → `components/dock/composables/`

Pass 2:
- `composables/glass/backdropLuminanceSample.ts` → `components/dock/`
- `composables/glass/useRAFLoop.ts` → `components/dock/composables/`
- `composables/motion/core/useYieldToMain.ts` → `composables/glass/`
- `composables/search/match.ts` → `components/dock/`

Pass 3:
- `composables/glass/backdropSampleMath.ts` → `components/dock/`
- `composables/glass/useYieldToMain.ts` → `components/dock/composables/`
- `composables/search/types.ts` → `components/dock/`

**S3:** `dock/styles/controls.css`, `styles/tokens.css`, `styles/typography.css` and `styles/utilities.css` → `<dir>/index.css`.

**Stage 2**, components (82), with paths relative to each unit:

- **aurora (27):**
  - `composables/{runtime,frameLoop,uniformBridge,auroraImageSource,textureUpload}.ts` → `runtime/`
  - `composables/{wgpuSetup,uniformBridgeWGPU,uniformBridgeWGPUImage}.ts` and `constants/shaders/aurora-image.wgsl.ts` → `runtime/wgpu-setup/`
  - `constants/shaders/{aurora,aurora-mediums,curl-fbm}.wgsl.ts` → `runtime/wgpu-setup/aurora-wgsl/`
  - `composables/glSetup.ts` and `constants/shaders/{aurora-image.frag,aurora.vert}.ts` → `runtime/gl-setup/`
  - `constants/shaders/{aurora.frag,brush.glsl,tonemap.glsl,flow.glsl,composition.glsl,curl-fbm.glsl}.ts` → `runtime/gl-setup/aurora-frag/`
  - `constants/shaders/{mediums,metal-medium,oil-modes,vangogh-medium}.glsl.ts` → `runtime/gl-setup/aurora-frag/mediums-glsl/`
  - `constants/{renderMode,presets}.ts` → the unit root
- **blob (12):**
  - `composables/{wgpuSetup,uniformBridgeWGPU}.ts` → `wgpu-setup/`
  - `shaders/{metaball,metaball-palette,metaball-noise}.wgsl.ts` → `wgpu-setup/metaball-wgsl/`
  - `composables/buildMetaballProgram.ts` and `shaders/metaball.vert.ts` → `build-metaball-program/`
  - `shaders/{metaball.frag,metaball-uniforms.glsl,oklch-perturb.glsl,watercolor-edges.glsl,sdf-body.glsl}.ts` → `build-metaball-program/metaball-frag/`
- **carousel (1):** `useCarousel.ts` → `composables/`
- **dock (16):**
  - `composables/{useDockSearch,useScrollChrome,useFuzzySearch}.ts`, `match.ts` and `types.ts` → `search/`
  - `GlassDock.vue` and `composables/{useDockRun,useDockClickIntegrity,useDockShellProps,dockMorphMeasure,useDockMorph}.ts` → `glass-dock/`
  - `composables/{useGlassBackdropLuminance,useRAFLoop,useYieldToMain}.ts` and `{backdropLuminanceSample,backdropSampleMath}.ts` → `glass-dock/glass-backdrop-luminance/`
- **fourier-field (5):**
  - `renderer/{wgpu,uniforms,render.wgsl,compute.wgsl}.ts` → `wgpu/`
  - `renderer/mint.ts` → the unit root
- **sheet (3):** `SheetContent.vue` and `detents/{use,projection}.ts` → `content/`
- **sortable-list (5):**
  - `{useSortable,resolve}.ts` → `sortable/`
  - `{drag,ghost,motion}.ts` → `sortable/drag/`
- **tabs (3):** `SegmentedTabs.vue` and `composables/{useTabResponsive,useTabDragMorph}.ts` → `segmented-tabs/`
- **toast (5):** `Toaster.vue`, `use-toast.ts` and `Toast{Description,Title,Close}.vue` → `toaster/`
- **typewriter (5):** `utils/{typoStateMachine,timing,pausePatterns,graphemes,keyboard}.ts` → the unit root

**Stage 2, global arm (3):** `composables/glass/webgpu/{useGpuSubstrate,useWebGPUCanvas,webgpuDevice}.ts` → `composables/glass/webgpu/gpu-substrate/`.

## Appendix B. Scratch artefacts

- **Tools** (`$R/tools/`): `migrate.mjs`, `aggregators.mjs`, `repoint.mjs`, `apply-row.mjs`, `replay.mjs`, `cascade-fd4.mjs`, `digest.mjs`, `digest-at.mjs`, `sccs.mjs`, `sccs-readers.mjs`, `scc-detail.mjs`, `door-reach.mjs`, `show-s2.mjs`, `plants.mjs`, and `scripts/structure/{g-law,dominance,eponym}.mjs` with `holds.json`.
- **Landed copies:** `$R/landed/`.
- **Frozen lists:** `$R/frozen/` (`SEQUENCE.json` and 17 steps).
- **Outputs:** `$R/out/`:
  - `gate-{HEAD,base,M1,M3,final,HEAD-final,base-final}.json`;
  - `plants.json` and `plants-B26-fixed.json`;
  - `vitest-{S1,M1,final}.json`;
  - `sccs-*.json`, `digest-run{1,2}.json`, `cascade-M1-{floor,fd4}.json`;
  - `gestalt-M1.txt`;
  - `dist-HEAD/`, `dist-M1/`, `cascade-HEAD/`.
