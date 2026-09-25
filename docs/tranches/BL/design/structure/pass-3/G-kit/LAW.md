# D1-G · the law, pass 3 (statement of record)

Route D1-G: eponymous closures under the declared layer, with B's authored names and B's privacy and direction clauses (REGISTRY §P2-4). This file is the law. The code in `eponym/` implements it, and every rule id below appears in that code, except six whose carrier is named here: L0.2 is `inGlobal` and L0.4 is `isTest` (`eponym/units.mjs`), L2.1 is `unitLayout`'s reader subgraph and L2.9 is `componentUnits`, which never yields a global-zone unit (`eponym/stage2.mjs`), L4.8 is row `rows/26-surface-pin.json` and L5.4 is row `rows/08-programs.json`. A rule the code runs that is not written here is a defect, and so is a rule written here that the code does not run (S-21). The gate (`eponym/eponym.mjs`, §E) reads the tree by these rules and nothing else, so a literal reading of this file gives the gate's verdict.

Binding inputs: `RULINGS.md` R-1..R-10 as amended, X-10 and P3-R1..P3-R9; the floor (`floor/FLOOR.md`, `pass-3/FLOOR-P3.md`); SPECS-v2 §1 and §4, which this file replaces where they differ (each difference is named). Authored data: `eponym/names.json` (names, bases, zones, the module pin, the generation inputs) and `authored/*.json` (the hunk specs of authored rows).

Every reader, edge, violation and unit below is the floor's: F-1's graph (`buildGraph`), F-7's placement (`placeAll`, `dirUnits`, `isSlot`, `proposedPath`, `publicationAnchor`), symbol origins (`makeOrigins`), F-2's engine (`runMoves`, `sccGrowth`). G builds no graph of its own.

---

## L0 · Units, zones and the unit function

- **L0.1 · Component unit.** A first-level dir of `src/components/` outside the global zone. `src/components/_shared/` is global.
- **L0.2 · Global zone.** The floor's `GLOBAL_ZONES` (`src/composables`, `src/styles`, `src/components/_shared`, `src/fonts`). A kernel entry is an entry (other than the root `index`) whose source lies in the global zone.
- **L0.3 · G's unit function (for FD-2).** R-2's dir units (`dirUnits().unitOf`, kind slots belong to the dir that holds them, FD-3), except that a door (an entry source, a CSS entry source or a declared door in `record.doors`) is a node of its own, and so is a test. A door publishes and reads nothing (R-2), so a door's re-export into its own subtree never makes its dir co-cyclic with a sub-dir; a test reads its subject and nothing reads it. FD-2's co-cyclic pairs are counted over this function everywhere G counts them: the engine (`apply-list.mjs` passes it to `runMoves`), rows (`fd2-pairs.mjs`) and the law (L1.6, L2.7).
- **L0.4 · A test** is a file under a `__tests__/` dir, or named `*.test`, `*.spec` or `*.test-d` with the extension `.ts`, `.tsx` or `.mts`, or `*.visual.ts`.

## L1 · Stage 1: between units

- **L1.1 · Placement.** F-7 over the `src` zone: `placeAll(g, dirUnits(), { zones: ["src"], anchor })`, readers counted by symbol through barrels, only loads. A test is no reader (a test follows its subject, R-3).
- **L1.2 · The anchor (P3-R1(a)).** The floor's publication anchor: an entry door anchors the files it publishes from inside its own dir, the global zone included, the innermost door winning; a slot barrel anchors nothing (X-10). G adds one reading, the kernel publication hold: a global-zone file that a kernel entry publishes (by symbol origin through barrels) is anchored in its own unit. An anchored file never moves.
- **L1.3 · Where a stage-1 move lands.** `proposedPath`, with three authored refinements from `names.json`:
  - in the global zone a shared file lands in its home dir itself, never in a `composables/` slot of a kernel module;
  - `stage1`: a file whose target would land loose in a container, or would close an FD-2 pair, takes the named module dir (`ModalOverlay.vue` → `_shared/overlay/`, `budget.ts` → `composables/glass/`, `createCanvasLifecycle.ts` → `composables/glass/lifecycle/`);
  - `groups`: the named files of the moved file's dir move with it (`backingSize.ts`, `visibility.ts` with the lifecycle), since the lifecycle reads both and would otherwise read back into `webgl/`;
  - `rename`: a file's authored name, keyed by its path (`flow.{glsl,wgsl}.ts` from the glass kernel become `curlNoise.*`, since aurora already holds a `flow.glsl.ts`).
- **L1.4 · FD-8 hold.** A move that changes the match set of a Tailwind `@source` glob (the glob matches the file at one path and not the other) is held: F-2's image check refuses any change to a glob's membership and the floor declares no glob delta. **A held move is a violation** (E1): P3-R6 places the file by its readers, and the floor cannot yet carry the move.
- **L1.5 · The fixpoint.** Stage 1 is re-read on the image of the moves proposed so far (readers and homes mapped through the move map) until no new move appears; the union is one list.
- **L1.6 · FD-2 is a stop.** While the list adds a co-cyclic pair (L0.3) on its image graph, the move whose removal lowers the added count most leaves the list (ties: the move that adds most alone, then list order). A removed move is `fd2-held`: the file stays, and the gate reports the pair it would add. A held move is not a violation: FD-2 outranks F-7 (REGISTRY §P2-6.4). A set whose pairs no single removal lowers throws.

## L2 · Stage 2: within a component unit

- **L2.1 · The reader subgraph** of unit U: U's code files (`.ts`, `.mts`, `.js`, `.mjs`, `.vue`; no `.d.ts`, no test, not U's root door `U/index.ts`), with an edge r → f for every file f of U that r reads by symbol (`readsOf`: value, type, CSS-in-SFC, glob, dynamic and `new URL` loads, through barrels). A wiring file's reads are weak (L2.4).
- **L2.2 · ⊤.** A virtual start node ⊤ enters U at: a file read from outside U (a door is no reader; a test is no reader), a file no file of U reads, an entry source or declared door, U's eponymous SFC (the pin: an SFC at U's root whose `rootName` equals U's name), and a wiring file.
- **L2.3 · Roots.** Immediate dominators from ⊤ (Cooper, Harvey and Kennedy; `dominance.mjs`). A root is ⊤, every SFC, every entry source and declared door, every file that is the immediate dominator of 2 or more files, and every bound root (L7.1). A file's owner is its nearest root ancestor.
- **L2.4 · Wiring files.** A `.ts` file with 3 or more registration edges: an imported SFC binding used only as an array element or an object-literal value. Its reads are weak and it is entered from ⊤. There are 0 at HEAD; the rule is exercised by a plant (G-08).
- **L2.5 · Heads.** A root heads a dir `home(owner(R))/<L3 name>` when its private closure has 2 or more files, or when it already sits in that eponymous dir and its closure has 1 or more (hysteresis: a dir forms at 2 and dissolves at 0). ⊤, U's pinned SFC, entry sources and declared doors head U itself. A root heads nothing when: it is collapsed by an authored decision (L3.2), it is chained (L3.4b), it is flattened (L2.7), or its name equals the dir it would nest in (L3.4).
- **L2.6 · Where a file goes.** A root that heads a dir lives in it; any other file lives in its owner's dir. Within the target dir T a file keeps its place when it already sits in T or in a kind slot of T (slot tolerance); otherwise a `use*` hook goes to `T/composables/` when that slot exists, and any other file to T. A path-keyed `rename` applies.
- **L2.7 · FD-2 flattening is reported.** A dir the layout would create that sits in a static module SCC after the moves (L0.3) is not created: its root is flattened, and the gate lists every flattened root under E2. So a flattening is a stop, never a silent fallback.
- **L2.8 · Base modules.** A parent dir P reads the modules nested in it, so a file at P's level that a nested module value-imports closes a parent ↔ child cycle, which FD-2 counts (this answers G-12: the nesting cycle is a module cycle). Every such file, with every P-level file it value-imports in turn, moves into one sibling module `P/<name>`, its name authored in `names.json` `bases`. A door, an entry source and U's pinned SFC never move. Levels are judged on the dominance targets, never on where a file sits, so the rule reads the same on the base tree and on the migrated tree. A needed base with no authored name is a NEEDS-NAME stop (E2).
- **L2.9 · The global zone** runs no stage 2: its module dirs are authored and kept, and their names are judged by E3P only (SPECS-v2 §4.9(c)).

## L3 · Names

- **L3.1 · `rootName(file, unit)`.** The kebab-case stem with `.vue`, `.ts`, `.mts`, `.mjs`, `.js`, `.css` stripped and remaining dots as hyphens; a leading `use` dropped; `index` read as its dir's name; a leading token equal to the unit's name dropped, unless only a shader-stage token (`frag`, `vert`, `wgsl`, `glsl`, `comp`) would remain. Comparison is case-, hyphen-, dot- and underscore-insensitive (`norm`).
- **L3.2 · Authored decisions** (`names.json` `names`, keyed by unit name and root file name): a string is the dir's name; `{ collapse }` makes the root head no dir. Every decision carries a reason, and each is taken from B's pass-3 names unless it says otherwise. These are the ones that keep authored concepts (G-03): `SheetContent.vue` → `detents`, `wgpu.ts` → `renderer` (fourier-field), `useMetaballRenderer.ts` → `renderer` (blob), `aurora.frag.ts` → `palette`, `glSetup.ts`/`buildMetaballProgram.ts` → `webgl`, `wgpuSetup.ts` → `webgpu`, `useGlassBackdropLuminance.ts` → `legibility`; the aurora shader dirs are named by concept (`webgl/palette/`, `webgpu/`), and the file-derived levels (`mediums`, `wgsl`, `glsl`) collapse.
- **L3.3 · Eponymy.** See E3.
- **L3.4 · Collapse.** A root whose name equals the dir it would nest in heads nothing.
- **L3.4b · Chain compression.** A root whose dir would hold every code file of U, leaving U's root with only its door (and Markdown), heads nothing: the unit is the module (`typewriter/text/`, `easing/picker/`).
- **L3.5 · Renames** are keyed by the file's path when proposed (`detents/use.ts` → `useSheetDetents.ts`, B-07).
- **L3.6 · CSS doors.** A sheet beside a dir of its own name, below a component unit, that imports only files of that dir moves in as the dir's `index.css` door (`dock/styles/controls.css` → `controls/index.css`).

## L4 · Privacy and direction (B's clauses, earned transfer)

- **L4.1 · The seal (B1).** From outside a component unit U, a src module or read edge lands on `U/index.ts`, `U/index.css` or a published entry source. Aggregates (`src/index.ts`, `src/components/index.ts`, `src/styles/index.css`) are exempt. The cure (generation) re-points the import at U's door by the name the door publishes for the same origin; a door never grows to take an import.
- **L4.2 · Direction (B8).** The kernel (global zone) reads no component unit, type-only and re-exports included, aggregates excepted; `src` reads no consumer zone (`demo`, `tests`, `tests-visual`, `scripts`).
- **L4.3 · No relays (B12).** Only a G door re-exports: an entry source, a CSS entry source, a declared door whose dir is not a kind slot (X-10), or, in `scripts/`, a module's `index.mjs` (SPECS-v2 §2.1). No declaration mirror (`x.d.ts` or `x.d.mts` beside `x.ts`/`x.mjs`/`x.js`/`x.vue`) in `src` or `scripts`. The cure cuts the relay statement and re-points each importer at the relay's target; a file left empty is deleted and leaves `record.doors`. A door statement re-exporting a file that stage 1 moves out of the door's dir is cut the same way (departures).
- **L4.4 · Door purity (B14).** A JS door holds only `export … from`; a CSS door (an `index.css` in `src` whose dir is not a kind slot, L3.6: the JS door's reading, since X-10 makes a slot barrel wiring; the `src/styles/index.css` aggregate excepted; a published leaf sheet such as `theme.css` is a source, not a door) only `@import`, bodiless `@layer` and `@source` for its own subtree (P3-R8). The cure moves every other statement, verbatim, into a module named in `names.json` `purity`: a JS door re-exports it (`tools/extract-door.mjs`); a CSS door imports it after its last `@import` (`tools/extract-css-door.mjs`), which keeps the flattened cascade, since CSS puts every `@import` before every rule.
- **L4.5 · Demo doors (R-10, P3-R5, E6).** A demo import that resolves to a `src` file no entry publishes as its source is re-pointed at a published entry, keeping the author's alias (`@glass/…`; the root entry is spelled `@glass/index`, since tsconfig maps `@glass/*`). For each name, the entries that publish its origin are ranked: the entry whose source dir holds the file most deeply first, the root `index` entry last, then by name. One entry serves the whole statement when one can; otherwise each name goes to its best entry and the statement splits. A dynamic `import()` of a published file (the shell's async boundary, `AppShell.vue → Aurora.vue`) imports the entry dynamically and takes the published name: `import("@glass/components/aurora").then((m) => m.Aurora)`, which is R-10's construction. The eager first-paint ground reads P3-R5's leaf entry `./aurora-config` (`src/components/aurora/config.ts`, at the unit root beside `./aurora`'s door as `blob/config.ts` sits beside `blob/index.ts`, so L2.5 keeps it at U). A name no entry publishes is a surface question, never a reroute: that edge stays and E6 names it (X-5, owed to the owner: publish the name on the entry L4.7's rule would pick, or change the story). The cure (`tools/demo-doors.mjs`) is sequenced (§M, G-S12).
- **L4.6 · Aliases (A1).** A door publishes one origin under one name.
- **L4.7 · One symbol, one door (R-6, P3-R4, E5).** A symbol origin published on two or more non-root entries is owned by the entry whose source's dir most deeply holds the origin file; among equals, by the entry that publishes the fewest names (the lighter door: P3-R4's config-door reading); a tie both rules leave is thrown, since the law names no owner there. Every other entry drops the name. The cure (`tools/one-door.mjs`): the dropping entry's statement loses the specifier (a statement left empty, or an `export *` whose every name is dropped, is cut with the comment paragraph directly above it, never a file header); every module that imports or re-exports a dropped name through the dropping entry is re-pointed at the owner in its own spelling (the package self-name, the alias, a relative path); MIGRATION.md gets a row per name (E-6). The root `index` entry is outside R-6 (it is the union).
- **L4.8 · The surface pin (F-9).** After the ruled rows, the pin is re-pinned by `surface.mjs pin`, frozen as a row. Its diff against the floor pin is the review: it must hold only the ruled rows (the added key, the dropped names).

## L5 · Tests (R-3)

- **L5.1 · Subjects.** The src files a test and its private test-zone helpers (test-zone files only this test reaches) load by module edge or read by a path.
- **L5.2 · Home.** The nearest common R-2 unit of the subjects. Inside a component unit, the dir of the nearest root that dominates every subject (L2). A container or zone root (`src`, `src/components`, `src/composables`, `src/styles`, `src/fonts`) is no home: the test stays in the harness. A test that scans (a `scan` edge: a walk, a template path, a computed read) reads the tree, not a subject, and stays in the harness. The test lives at `<home>/__tests__/<its name>`, or the name `testNames` authors.
- **L5.3 · Whole-library suites** stay in `tests/` and read source through the FD-6 harness (`tests/harness/source.ts`), never a directory walk (R-3). A suite that walks a source dir is re-pointed at the harness by an authored row (`authored/walkers.json`), at its HEAD path and before the tests list, so L5.2 judges it by the scan F-1 reads. A directory walk is no edge F-1 reads, so a walking suite judged first would be colocated by its imports alone and then read as a scan (measured: `feedback-tint-seam`, `gl-excise` → E7 2).
- **L5.4 · Programs.** The app program (`tsconfig.json`) checks library and demo code; the test program (`tsconfig.test.json`) checks every test, the `__tests__/` slots included.

## L6 · `scripts/`, the backend analogue

- **L6.0 · Cross-zone placement** (SPECS-v2 §1.4, the S-15 consensus). A file of `scripts/`, `tests/` or `tests-visual/` whose every module loader sits in one other of those zones, and that no command token (package.json, CI YAML, shell) and no root config names, moves into that zone: to its loaders' nearest common dir, or, when that is the zone root, into the module `names.json` `zones` authors (`tests-visual/paint/`). Judged on the image of the moves already proposed.
- **L6.1 · Bins and closures.** A bin is a scripts file entered from outside the zone (a command token, a root config, any edge from another zone) or loaded by no scripts file. Ownership is immediate dominance over the zone's load edges from ⊤ through the bins. A file one bin B alone owns lives in B's module dir: `dirname(B)` when B sits in a module below `scripts/`, else `scripts/<rootName(B)>/`, with B in it.
- **L6.2 · R-8 / E-7.** A scripts file that nothing reaches (no edge of any kind from any file; the opaque ledger's data rows are no reader) is deleted.

## L7 · Bounds (R-5, P3-R3 strict)

- **L7.0 · The bound.** More than 12 direct files in any dir of the five zones (a kind slot is bounded itself and does not count toward its parent), or a hand-written `.ts`, `.mts`, `.cts`, `.js`, `.mjs`, `.cjs`, `.vue` or `.css` file over 500 lines.
- **L7.1 · The dominance split.** Inside a component unit, a non-slot dir over 12 direct files splits along its dominator children: the non-root file whose private subtree (files it dominates with no root between, all targeted at that dir) holds 2 or more files becomes a root and heads its own dir, named by L3. Repeated until the dir is within the bound or no such file is left. A dir of peers (no dominator child) is what G cannot split; it stays a violation, and R-5 asks the route to report it.
- **L7.2 · The authored carve (G-10, P2-4's earned transfer).** A peer dir over 12 splits under module names a person wrote: `names.json` `carve` (dir → module → the file names it holds), every name taken from B's pass-3 carve (`B-kit/frozen/S3-carve.json`, `S4a-css-carve.json`). In a component unit, stage 2 honours it: a file whose L2 target is the carved dir lives in its module, before L2.8's bases (so a nesting cycle the carve closes is still cured). A carve of a kind slot names modules of the slot's unit (`dock/styles` → `dock/search/`). The carve entries stage 2 does not place (the global zone, CSS in a unit) are proposed as stage 6. A carve module is accepted by E3 as an authored module, and E3N pins every carve entry. This is H's reading (REGISTRY §P2-4): a dominator boundary where an owner root exists, an authored boundary where none does.

---

## E · The gate

`eponym/eponym.mjs`, landed at `scripts/structure/eponym/eponym.mjs`, run under `npm test` by `tests/gates/eponym.test.ts`: one `it` per clause, and the clause list is read from the gate itself, so no clause is CLI-only. A clause passes at 0.

| clause | reads | fails when |
|---|---|---|
| E0 | F-1 | any violation (fail-closed over every S-4 edge kind; a self-name import in `src` is a violation, P3-F3) |
| E1 | L1 | stage 1 proposes a move, names a NEEDS-NAME target, or holds a move by FD-8 (L1.4). FD-2 holds are reported (info), not counted (L1.6) |
| E1K | P3-R1(a) | a kernel entry publishes (by symbol origin) a `src` file outside the global zone |
| E2 | L2 | stage 2 proposes a move, names a NEEDS-NAME target, needs an unnamed base (L2.8), or flattens a root (L2.7) |
| E3 | L3 | a non-slot dir below a component unit that holds code holds no root whose L3 name is the dir's name, no `index.ts`/`index.css` door, and is neither an authored base (L2.8) nor a carve module (L7.2) |
| E3N | `names.json` | a nested dir of a component unit is not in the `modules` pin, a pinned module is gone, an authored name, base or zone names nothing (stale), or a carve entry is not in its module (L7.2) |
| E3P | names | a dir in `src` or `scripts` named as a placeholder (`util(s)`, `helper(s)`, `misc`, `common`, `stuff`, `tmp`, `temp`, `old`, `new`, `legacy`, `compat`, `shim(s)`, `wip`, `v<n>`, `part<n>`, `…-<n>`, a wave or pass id), or repeating its parent's name (a slot excepted); a code file whose stem is such a name. `scripts/lib` is the zone's shared slot |
| E4 | L7.0 | any dir or file over the bound |
| E5 | R-6, L4.7 | one symbol origin (file and name) published on two non-root entries (the line names L4.7's owner) |
| E6 | R-10, L4.5 | a demo module or read edge to a `src` file that is not an entry source (a file under an entry's `assets` dir is published) |
| E7 | L5 | a test not at its L5.2 home: a single-subject test outside `<home>/__tests__/`, or a test inside a `__tests__/` slot with no single-unit subject. It judges `*.test.*` and `*.test-d.*` files in `tests/` and in `__tests__/` slots; the Playwright specs of `tests-visual/` are not judged, since F-1 does not read Playwright's `testDir` (FLOOR.md, declared limits) |
| B1 | L4.1 | an edge into a component unit from outside it, past the door |
| B8 | L4.2 | the kernel reads a unit, or `src` reads a consumer zone |
| B12 | L4.3 | a re-export outside a G door, or a declaration mirror |
| B14 | L4.4 | a JS door that holds anything but `export … from`, or a CSS door that holds anything but its imports, bodiless layers and own-subtree `@source` |
| A1 | L4.6 | a door publishing one origin under two names |
| S1 | L6.0, L6.1 | a scripts file outside its bin's module, or a cross-zone file outside its loaders' zone |
| S2 | L6.2 | a scripts file nothing reaches |

**Fail-closed edges.** E0 covers every edge kind. The privacy and direction clauses read module kinds (`import`, `import-type`, `import-type-node`, `import-side-effect`, the three re-export kinds, `dynamic`, `dynamic-template`, `require`, `vi-mock`, the SFC block kinds, `css-import`, `sfc-inline-css-import`, `css-url`, `css-reference`, `template-asset`, `glob`, `new-url`) and read kinds (`path-literal`, `path-helper`, `ts-reference`).

**Vacuity (F-9).** E1, E2 and E3 run the law the migration ran, so their zeros on the migrated tree count only once a critic's plant bites them. Every list and row is frozen before the gate judges the tree (§M).

**Differences from SPECS-v2 §4 (each is a pass-3 decision).** E1K, E3N, E3P, B1, B8, B12, B14, A1, S1, S2 are new (B's clauses and G-crit gaps 9, 10, 12, 13). L1.2's kernel hold, L1.3's authored refinements, L1.4 counting FD-8 holds, L1.6, L2.7 reporting flattenings, L2.8, L3.2 decisions, L3.4b, L4.5, L4.7, L4.8, L6.0, L7.1 and L7.2 are written here for the first time. SPECS-v2 §4.2's "CSS follows §1.4" stands: no CSS is placed by stage 2, and the R-7 channel collapse is not built (P3-R2 sequences CSS after it).

## M · The migration

`SEQUENCE.json` lists the steps in order; `tools/replay.mjs` applies them from the frozen files only; `tools/generate.sh` is what computed them, in one run from a fresh HEAD worktree. The preamble is the floor chain (`floor/rows/apply.mjs`).

| step | frozen artifact | law |
|---|---|---|
| G-S0b | `eponym/*`, `wire/eponym.test.ts` (landed by `tools/land.mjs`) | §E |
| G-S1a | `rows/01-relay.json` | L4.3 (src), departures of `lists/00-stage1-raw.json` |
| G-S2 | `lists/02-stage1.json` | L1 |
| G-S4 | `lists/03-stage2.json` | L2, L3, L7.1, L7.2 (menu) |
| G-S3 | `lists/04-css-doors.json` | L3.6 |
| G-S4b | `rows/05-seal.json` | L4.1 |
| G-S4c..e | `rows/06-purity-{alert,badge,color}.json` | L4.4 (JS) |
| G-S6 | `rows/06-walkers.json` (`authored/walkers.json`) | L5.3 |
| G-S7a | `lists/07-tests.json` | L5.2 |
| G-S7b | `rows/08-programs.json` (`authored/programs.json`) | L5.4 |
| G-S9a | `rows/09-relay-scripts.json` | L4.3 (scripts) |
| G-S9b | `lists/10-cross-zone.json` | L6.0 |
| G-S9c | `rows/11-r8-delete.json` (`authored/r8-delete.json`) | L6.2 |
| G-S9d, e | `lists/12-mirror.json`, `rows/13-mirror.json` (`authored/mirror.json`) | L4.3 (mirrors) |
| G-S7c | `rows/14-subject-paths.json` (`authored/14-subject-paths.json`) | L5 (paths read by tests) |
| G-S10a | `rows/15-purity-controls.json` | L4.4 (CSS) |
| G-S10b, c | `rows/16-aurora-config.json` (`authored/aurora-config.json`), `rows/17-entries.json` | P3-R5, L4.5 |
| G-S11a, b | `rows/18-one-door.json`, `rows/19-one-door-prose.json` (`authored/one-door-prose.json`, `authored/migration-added.md`) | L4.7 |
| G-S12 | `rows/20-demo-doors.json` | L4.5 |
| G-S13b | `lists/23-carve.json` | L7.2 (global zone, dock's styles slot) |
| G-S13c | `lists/24-tests-carve.json` | L5.2 |
| G-S14 | `rows/25-test-pins.json` (`authored/test-pins.json`) | FD-6 class, R-6, R-10 |
| G-S15 | `rows/26-surface-pin.json` | L4.8 |

The chain is digest-anchored: `SEQUENCE.json` carries `base` (the code digest of HEAD with the floor rows; code = every file outside `docs/`) and each step's code digest after it. A replay reads the tree's digest first: the base starts at step 0, a step's digest resumes after that step, the final digest means there is nothing to write, and any other digest is refused before a write. Every step must reach its recorded digest. `--twice` applies each step a second time and requires the digest unchanged. Rows are exact text at their point in the chain; a later list moves the files they wrote, so a row is idempotent at its step and the chain is idempotent as a whole, never a row out of order.
