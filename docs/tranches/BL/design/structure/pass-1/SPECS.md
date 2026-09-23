# D1 · pass 1 · SPECS: one spec per family

| field | value |
|---|---|
| seat | D1 pass-1 synthesis. Six specs, one per family. The routes are still incompatible, so none is merged into another and none is ranked |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `2b188e72`; written at `7362b3bf`. `git diff --stat 6433284a HEAD -- src demo tests tests-visual scripts package.json package-lock.json 'vite*.ts' vitest.config.ts 'tsconfig*.json'` is empty, so every measurement the research seats took at `6433284a` holds at HEAD |
| inputs, read in full | `CHARTER.md` (the last four paragraphs, the edict N-1), `PORTFOLIO.md`, `pass-1/W.md`, `pass-1/X.md`, `pass-1/D1-A.md` … `D1-F.md` |
| instruments | read-only reads of the six scratch gate scripts under `$D1 = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/`, to pin how each gate resolves specifiers. No gate was re-run: the code under them has not changed since the research seats measured |
| fences | no source edit, no git write; this file is the only write |

**Evidence labels.**

| label | meaning |
|---|---|
| measured | a research seat's command printed the number (cited as seat and section, e.g. D1-C Q3) |
| specified | this document states the contract, and no pass-1 command exercised it |
| delta | a difference between the contract and the pass-1 scratch script, found by reading the script here (cited `file:line`) |

## 0 · Shape of every spec, and the parts they share

Each family has six parts:

1. **Placement law:** inputs, rule, tie-breaks, the meaning of "global", recursion, the size bound, and how a long dir becomes an encapsulated module.
2. **Public-surface guarantee:** the exports map and dist layout, with the research seat's evidence.
3. **Gate contract:** the executable, its input graph, which edges count, how it defeats the relative-path bypass, its RED list at HEAD, and the mutation it must catch.
4. **Migration plan:** ordered steps with measured cost.
5. **Backend:** `scripts/` and the root build modules, and how the treatment carries to a sibling backend (per X.md).
6. **Open gaps:** spliced verbatim from the research report.

**Terms used in every spec.**

- **Zones:** `src`, `demo`, `tests`, `tests-visual`, `scripts`, and the root build files (`vite*.ts`, `vitest.config.ts`).
- **Edge kinds:**
  - value import
  - type-only import (`import type`; `verbatimModuleSyntax` is on, so the marker is syntactic, D1-D header)
  - value or type re-export
  - dynamic `import()`
  - `import.meta.glob`
  - CSS `@import`
  - SFC `<style src>`
  - `new URL(…, import.meta.url)`
  - literal repo-path string
- **Specifier forms:** relative (`./`, `../`), the `@glass/` alias, the `/src/` URL form, the package self-name `@mkbabb/glass-ui[/sub]`, and bare package names.

**The common floor runs first in every family** and is costed once, in PORTFOLIO §2.2 rows 1-7:

- one door per symbol;
- the two dead doors deleted;
- `useScrollScene` moved to demo;
- the `./tokens` preset retired;
- a decision on `./sidebar`;
- the entry map re-keyed to `name → path`;
- `design-idioms.md` §7 rewritten.

A spec states it only where the family cannot build without a row.

---

## D1-A · Graph-derived home (the LCA placement law)

### A.1 Placement law

**Inputs.**

- **G**, the typed import graph over every tracked or untracked-not-ignored file in `src demo scripts tests tests-visual` plus the 9 root build files. Measured: 1,267 files and 3,419 edges, from TypeScript's parser (D1-A §1).
- **E**, the authored entry map: `libraryEntryMap()`, 63 entries, plus 3 CSS entries.
- **P**, the pin set:
  - the 63 entry doors, plus the 6 implicit root sub-doors that `src/index.ts` re-exports (accordion, alert, avatar, skeleton, table, `composables/glass`);
  - the route SFCs `demo/stories/*/*.vue` and `demo/main.ts`;
  - the root configs `vite.config.ts`, `vitest.config.ts`, `vite.iter.config.ts` and `demo/vite.demo-dist.config.ts`;
  - every CLI file that carries a CLI signal: an npm script, a shebang or a main guard.

**Definitions.**

- `unit(d)` is `d` with the kind slots `composables styles constants utils shaders` folded into their parent.
- `zone(f)` is `src`, `demo`, or backend (`scripts` plus the root files).
- **Placing edges** (rule 1): value import, dynamic `import()`, `import.meta.glob`, `<style src>`, CSS `@import` and `new URL(…, import.meta.url)`.
  - A type-only edge places a file only when that file has no value reader.
  - Edges through pure barrels are attributed per imported name to the declaring file.
- **Door reading** (rule 2):
  - A published SFC is pinned beside its door.
  - Any other file a door re-exports counts that door as one importer, located at `dir(door)`.

**Rule.**

```
home(f) = LCA( { unit(dir(u)) : u ∈ importers(f), zone(u) = zone(f) }  ∪  { dir(d) : d ∈ doors(f) } )
```

`demo` and `tests` importers never place a `src` file. The file then goes into the slot for its kind (rule 5):

- a hook inside a component unit goes to `<home>/composables/`;
- a stylesheet goes to `<home>/styles/` or `<home>/styles.css`;
- an SFC goes to the unit root.

**Global** (rule 4). When `home(f)` is a zone root, the file goes to that zone's shared slot. The zone roots are `src`, `src/components`, `src/composables`, `src/styles`, `demo`, `demo/stories` and the repo root.

| zone | shared slot |
|---|---|
| `src` | a hook (a file exporting `use*` or `v*`) goes to `src/composables/`; anything else to `src/components/_shared/` |
| `demo` | `demo/composables/` or `demo/chassis/` |
| backend | `scripts/lib/`, or `scripts/` when the LCA is the repo root |

**Fixpoint and ordering** (rules 6 and 14).

- Placement iterates until it is stable. At HEAD this took 4-5 rounds, with moves per round running 49 → 7 → 2 → 0 (D1-A §2).
- Non-door pure barrels are dissolved *before* placement is realized. Placing without dissolving left 2 SCCs through the surviving barrels (D1-A §4).
- The order is: floor → barrel dissolution → placement to fixpoint → depth → bounds carve → CSS → test mirror.

**Tie-breaks and exceptions.**

- **Cross-zone files** (rule 8):
  - A file whose importers all sit in one other zone moves to that zone's LCA, e.g. `paint-arm.mjs` → `tests-visual/`.
  - A file with no reader anywhere is deleted under E-7.
  - A file read from several zones and by no in-zone file is left to a ruling (`springProjection.ts`).
- **Basename collisions in a shared slot** get dir-qualified names, such as `input-types.ts` or `shaders-flow.glsl.ts`. The names are authored (D1-A §14.5).
- **Depth** (rule 7). A file may sit below its home only in two places:
  - a kind slot;
  - a *lexical feature dir*, meaning a dir whose name is a stem token that every member shares.

  47 files fail this at HEAD. The alternative is a declared feature dir, which was not measured.
- **CSS** (rule 12):
  - A block's home is the LCA of the homes of its subject classes' emitters.
  - A single-home file moves to that home; a MIXED file splits.
  - Context co-selectors (4) and list co-registrations (29 blocks in 12 files) are the one declared fact: they are marked global and stay in `src/styles/`.
  - Runtime-built classes are registered by the recipe file that builds them.
- **Tokens** (rule 13): a custom property whose consumer set is one component moves to that component's `tokens.css`. At HEAD that is 96 properties.
- **Tests** (rule 9):
  - A test lives at `mirror(LCA(home(subjects)))`. Its subjects are the src/demo/scripts/root files it imports or reads by literal path.
  - Cross-cutting tests go to a `tests/invariants/` slot. At HEAD, 35 tests map to the `tests/` root, 12 to `tests/components/` and 28 to `tests/build/`.

**Recursion.** The rule needs no recursion clause, because the LCA is taken over directories at any depth. A helper read only by `dock/morph/` lands in `dock/morph/`.

**Size bound and long dirs** (rule 10).

- The bound is ≤ 12 direct files per dir and ≤ 500 lines per file, applied to `src`, `demo`, `scripts`, `tests` and `tests-visual`.
- A dir over the bound is carved in two passes: lexical groups (shared file-stem tokens) first, then dominator clusters. **Every cluster is named by a person.**
- Measured (D1-A Q5):
  - The connected-components carve returns one giant component per unit: dock 40, aurora 35, sortable-list 11.
  - The lexical carve recovers 5 of dock's 7 L12-06 features and 2 of menu's 3.
  - Dominator clusters find the sortable-list drag engine (unnamed) and the backdrop trio.
  - Aurora's two renderer backends are found by no carve.
- A file over 500 lines is carved by hand along the same seams.

### A.2 Public-surface guarantee

**Guarantee.** Under the door reading no door moves, so no entry-map source path changes and the exports map is unchanged.

**Evidence** (prototype worktree: 55 moves, 12 barrels dissolved, 2 fixpoint corrections; D1-A §9, §12):

| check | result |
|---|---|
| `regen-exports` | EXACT REPRODUCTION: 68/68 keys, 0 drops, adds or mismatches; `typesVersions` unchanged |
| doors × exported names | 63 × 1,277, 0 differing (`proto/doornames.mjs`) |
| `glass-ui.css` | 42,374 bytes on both sides. 3 rules differ, all `.fourier-field*`, whose production `data-v` id rehashed after the codemod edited the SFC's import lines |
| `dist` | 829 files (837 − 8 barrel `.d.ts`). 42 `.d.ts` files relocate and 28 chunks are renamed; none of them is export-reachable |
| sibling code | 1,356 bindings, all through `@mkbabb/glass-ui/*` subpaths, so 0 break |

**What the guarantee does not cover:**

- The floor's re-export drops change `./motion` and `./aurora`. That is shared with every family.
- Colocating one of the 18 published single-consumer composables that sit under `src/composables` doors means moving its door. That is a surface choice made by a person, not an output of the law (D1-A §2).

### A.3 Gate contract

**Executable.** `node $D1/D1-A/gate/home-gate.mjs [root] [--json]` (84 lines, over `lib/graph.mjs` 180 lines and `lib/home.mjs`). It lands as `scripts/structure/home.mjs` and exits 1 on any violation. Runtime 2.9 s.

**Input graph.** `lib/graph.mjs`, parsing with the TypeScript parser over the zones in A.1. It resolves four specifier forms to files:

- `@glass/`
- `/src/`
- relative
- `@mkbabb/glass-ui[/sub]`, through the entry map

**Edges counted, by clause:**

| edge | P1 placement | P4 test mirror | P5 acyclic (module grain) | P6 CSS home |
|---|---|---|---|---|
| value import / value re-export | yes | yes | yes | — |
| type-only import / re-export | only for a file with no value reader | yes | no | — |
| dynamic `import()`, `import.meta.glob` | yes | yes | yes | — |
| CSS `@import`, `<style src>` | yes | yes | — | yes |
| `new URL(…, import.meta.url)` | yes | yes | — | — |
| literal repo-path string | no | yes (a test's subjects) | — | — |
| class emission (template, `cn()`/recipe literals, `data-slot`) | — | — | — | yes |

Every row counts relative, `@glass/` and `/src/` specifiers alike, because the verdict depends on the resolved file.

**Clauses:**

| clause | fails on |
|---|---|
| P1 | a file off its home: *law half*, a file outside its LCA subtree, an orphan, or a non-door barrel; *depth half*, a file below its home that is in neither a kind slot nor a lexical dir |
| P2 | a dir over 12 direct files |
| P3 | a file over 500 lines |
| P4 | a test off its mirror |
| P5 | a value SCC at module grain |
| P6 | a stylesheet off its CSS home, or a MIXED stylesheet |

**The relative-path bypass does not arise.** The gate never asks a resolver whether a reach is allowed. Every specifier resolves to a file, and the verdict depends only on where that file sits relative to `home(f)`. A relative reach is one more importer: it moves an LCA, which P1 reports, or it closes a cycle, which P5 reports. `src` holds 0 `@glass/` specifiers (PORTFOLIO §1), so every `src` edge the gate judged at HEAD was a relative or `/src/` specifier.

**RED at HEAD** (measured, D1-A §10): `G-HOME RED — 428 violation(s)`, exit 1.

| clause | count | detail |
|---|---:|---|
| P1 | 113 | law half 66, depth half 47 |
| P2 | 18 | e.g. `aurora/composables/` 16, `dock/styles/` 15, `menu/` 16, `tests-visual/` 177 |
| P3 | 57 | |
| P4 | 198 | |
| P5 | 2 | M02: `…/overlay/participation.ts → …/dock/composables/dockContext.ts`. M03: `DialogContent.vue → sheet/motion.ts` and `SheetContent.vue → dialog/ModalOverlay.vue` |
| P6 | 40 | |

The prototype tree reads 365: P1 51 (law half 6, depth half 45), P2 20, P3 57, P4 201, **P5 0**, P6 36.

**Mutations the gate must catch:**

| id | mutation | status |
|---|---|---|
| M-A1 | HEAD measured against the placed tree. P5 reports M02 and M03 on HEAD and 0 on the prototype | measured |
| M-A2 | the importer delta of any of the 18 churn commits, applied without its move (D1-A Q2). Example: `40d7b08f` gives `motion/core/constants.ts` an importer outside motion, so its home moves from `motion` to global, and P1 must name the file | the home change is measured; the gate run on that tree is specified |
| M-A3 | on the placed tree, a dock file adds a value import of `slider/composables/useDockHold.ts`. Its LCA becomes `src/components`, and P1 must report the file as outside | specified |

**Deltas between the contract and the pass-1 script:**

- `lib/graph.mjs:174` counts unresolved specifiers and drops them (`unresolved++; continue`), and the gate reports no clause for them. `lib/graph.mjs:164` turns a parse failure into an empty edge list. The contract adds **P0: an unresolved `src` specifier or an unparseable file is a violation** (W §9 row 5).
- The graph cannot see couplings that do not go through import edges (D1-A §14.8):
  - hand-built `import.meta.glob` keys (`lazy.ts:20`, and `manifest.ts:162`, which fails silently);
  - `vi.mock` strings (13 in the tree, 2 of which broke);
  - Tailwind `@source` scopes (`picker-lane` G1);
  - Vue scope ids.

  The contract does not cover them (A.6).

### A.4 Migration plan (ordered; measured on the prototype unless marked)

| # | step | measured cost |
|---|---|---|
| 1 | floor rows (shared) | simulated on the graph, not applied (A.6) |
| 2 | dissolve non-door barrels | 10 after the floor (12 without); 37 declarations → 51, in 30 files; 0 unresolved names |
| 3 | placement to fixpoint (edict slot / door reading / value edges) | 56 moves (src 43, demo 12, scripts 1). About 275 specifier rewrites (213 + 51 + 10) plus 8 type-import normalizations. Hand fixes: 2 glob-key sites and 2 `vi.mock` strings. Left open: the `story-lazy` fixture and `picker-lane` G1 (a `shaders/` slot versus `@source`) |
| 4 | orphan rulings | 5: `Code.vue`, `canon-doc.mjs`, `safari-probe.mjs`, `paint-arm.mjs` (cross-zone), `springProjection.ts` |
| 5 | depth decisions (flatten, rename to a shared stem, or declare) | 45-47 files in about 20 dirs (counted) |
| 6 | bounds | 18 → 20 dirs to carve, with authored names; 57 files over 500 lines carved by hand (counted, not prototyped) |
| 7 | CSS and tokens | 5 whole-file moves, 35 MIXED splits, 3 global registers out of component dirs, 29 co-registration blocks and 4 co-selectors declared global, 96 tokens moved with their dark arms (counted, not prototyped) |
| 8 | test mirror | 188 of 239 tests are off the mirror, plus 3 for moved subjects. Rewrites: 46 relative specifiers and 17 `../` literals; 350 alias specifiers survive. Plus the `tests/invariants/` slot |

**Prototype outcome after steps 2-3:**

| check | result |
|---|---|
| `vue-tsc`, src and tests | 0 · 0 errors |
| build | green |
| `vitest` | 2,316 / 2,324 pass. The 8 others: 3 environmental, 2 load timeouts, 1 skipped, and 2 caused by the moves |

The measured rewrite total for placement, barrels and tests is about 340. PORTFOLIO had estimated 600-700.

### A.5 Backend

**glass-ui `scripts/`** (D1-A §13). The law is the same. The backend zone is `scripts` plus the root build files, and its shared slot is `scripts/lib/` (or `scripts/` for a repo-root LCA).

| file(s) | outcome under the law |
|---|---|
| `reflect-capture-verify.mjs` | moves to `scripts/lib/`: its only importer is `lib/paint-arm.mjs`, and it carries no CLI signal |
| `gen-component-styles`, `flatten-subpath-types`, `lib/minify-css` | stay: their LCA is the repo root, so their slot is `scripts/` |
| `paint-arm.mjs` | moves to `tests-visual/` (rule 8) |
| `canon-doc.mjs`, `safari-probe.mjs` | deleted |
| `gate-register`, `comment-census` | stay pinned as CLIs by their main guard. X §3.1 would move them to `tests/gates/`, so which pin set applies is a ruling |
| 7 files over 500 lines | carved |

X §3.1 found three helpers written more than once (6 walkers, 8 repo-root resolutions, 4 sha256). One shared copy of each lands at the LCA of its importers, `scripts/lib/` when they cross families (X §6.1(b)).

**Carrying the law to a sibling backend** (measured read-only, D1-A §13):

| backend | files | outside · orphan, wiring counted | outside · orphan, wiring excluded |
|---|---|---|---|
| value.js `api/src` | 115 `.ts` | 28 · 1 | 12 · 17 |
| speedtest `server/src` | 73 | 28 · 6 | 19 · 21 |

- **What carries:**
  - Doors: `index.ts`, `__init__.py` and `mod.rs`.
  - The shared slot: `platform/` for Hono, the lowest covering package for Python, the crate root for Rust.
  - Tests follow the language (X §6.3, §6.5).
  - Cloudflare `functions/` is a fixed-path leaf layer. The router pins the route files, and only their helpers are placed (X §6.4).
- **What the carry needs:**
  - A second anchor class, **wiring files**, whose edges neither place nor pin. Examples: value.js `app.ts`, `platform/http/inject-services.ts`, `platform/db/collections.ts`; speedtest `index.ts`, `middleware/index.ts`, `middleware/wire-services.ts`.
  - The wired files then need a declared home.
- **Where it breaks:** the law is kind-blind. It moves `palette/model.ts`, `session/model.ts`, `palette/schema.ts` and `types.ts` into `platform/`, and `platform/http/rate-limit.ts` into `session/`. It says nothing about speedtest's kind layers if those fold as slots.

### A.6 Open gaps (verbatim, D1-A §15)

- The CSS arm (P6: 36-40 files, 96 tokens) and the bounds carve (P2 20 dirs, P3 57 files) were counted, not prototyped. The cluster names they need were not proposed.
- The floor was simulated on the graph, not applied in the worktree. `useDockCtaReceive`'s move into `dock/composables/` depends on it (1 of the 56).
- Not run: `demo:dist:build` (so the `boot-graph` arm stays environmental), `tests-visual` / Playwright, and a paint check. The prototype shows the library and unit suite survive, not that the demo renders.
- Churn used HEAD's entry names per commit plus dir-named `index.ts` files, which approximates the fail-closed derivation of each era.
- The sibling reader count is a lower bound (231 unmatched bindings; chicago is not a git repo and was not scanned).
- Owner rulings the law cannot make:
  - the 5 orphans;
  - the cross-zone rule for `springProjection.ts`;
  - whether a CLI with a test importer is a pin;
  - the `shaders/` slot versus Tailwind `@source`.
- The depth rule is a sketch. The alternatives (declared feature dirs, or "a dir whose eponymous file is its root") were not measured.
- The backend probes use a hand-named aggregator list. A structural definition (for example, a file importing ≥ k siblings' modules and exporting a composition) was not tested.
- The gate is a scratch script. It has no E-8 registry row, and its P4/P6 arms reuse the Q4 heuristics.

---

## D1-B · Sealed family modules (vertical slices, one door each)

### B.1 Placement law

**Inputs.**

- The directory tree.
- `libraryEntryMap()`.
- The co-assignment consensus over the component graph, from Louvain on edge set **DO**: direct imports plus `_shared` plus L13's 34 OWNED units. It ran 18 times at γ 1-3 in steps of 0.25 (`$D1/D1-B/consensus2.mjs`, `cohesion.mjs`).

**Definitions** (S1).

- A **module** is a directory that holds an `index.ts`, its **door**.
- The containers `src`, `src/components`, `src/composables` and `src/styles` are not modules.
- A **kind slot** (`composables|styles|constants|shaders|utils`) is a plain folder inside a module and never carries a door.

**Rule.**

1. **First-level modules** (S8).
   - A family module exists only if its measured cohesion under DO is ≥ 0.5, where cohesion is the mean pairwise co-assignment.
   - Every other component is its own first-level module.
   - The measured CORROBORATED partition puts 33 components into 9 families. Dock and 21 other components remain singletons:

     | family | members |
     |---|---|
     | overlay (7) | dialog, sheet, popover, menu, tooltip, command, select |
     | fields (5) | input, textarea, number-field, label, labeled-field |
     | binary (3) | checkbox, radio-group, switch |
     | track (4) | progress, slider, timeline, scroll-progress-rim |
     | pager (3) | carousel, pager-dots, deck |
     | procedural (4) | aurora, blob, fourier-field, constellation |
     | disclosure pair | accordion, collapsible |
     | surfaces pair | card, surface |
     | data trio | table, data-table, skeleton |

2. **Contents.**
   - Every file of a component lives inside its module, and sub-components are sub-modules with their own doors.
   - A composable owned by one family lives in that family's `composables/`, with the family's CSS beside it. No kernel door re-exports family-owned code (S7).
3. **Visibility (V2, recursive; S2).**
   - Let M be the outermost module that holds the target of an edge but not its importer. The target must be `M/index.ts` or a published entry.
   - A nested module is private to its parent unless it is published.
   - There is one door per symbol inside the repo: no door re-exports a sibling's door, and `src/index.ts` is the single aggregate door.
   - No file imports its own module's door. At HEAD, `Alert.vue` and `Badge.vue` do.
4. **Published entries are doors** (S3).
   - Every source in `libraryEntryMap()` is an `index.ts`. `blob/config.ts`, `fourier-field/math.ts`, `_shared/axes.ts` and `styles/tokens.ts` become sub-module doors.
   - Subpaths are keyed by an explicit `NESTED_COMPONENTS` name → path map.
5. **CSS door** (S4). `M/styles.css` is the only CSS file importable from outside M. It aggregates partials of the same cascade layer, in their original order.
6. **Tests** (S5).
   - A unit test sits beside its source inside its module. It is a sink: excluded from acyclicity and from the size bound, but still bound by the door rule.
   - A test spanning two or more first-level modules stays in `tests/` and imports published doors only.
   - Scanners that walk `src` exclude `*.test.ts` and `*.test-d.ts`.

**Global** (S7). The **kernel** is:

- the `composables/*` domains;
- `styles/`;
- a sealed component-vocabulary `_shared` (class names, axes, selection, rows).

The kernel imports no family. Admission is by ruling, not by measurement. A helper used by two families goes to the kernel. 20 of `_shared`'s 26 units stay there, because two or more families import them (D1-B weakness 9).

**Tie-breaks.**

- A component with no stable partner (co-assignment ≥ 0.5 with nobody) is a singleton. At HEAD that is `metric dark-mode-toggle handmark music-staff typewriter alert avatar separator`.
- The ≥ 0.5 bar cannot choose between two forms that both pass: `forms` (0.72) against `fields` (0.70) plus `binary` (0.78). That choice is open.

**Recursion.** The same rule applies at every depth: a sub-module is private to its parent. Door-level acyclicity (R4) holds between sibling modules at every depth.

**Prerequisite inversions** (measured, D1-B Q4). Four cuts take value SCCs to 0 at both levels:

1. `kernelDoors`: kernel `index.ts` files stop re-exporting 17 family-owned files (62 names).
2. `participation`: overlay owns an `OverlayHost` key, and dock provides it.
3. `roving`: `useTabRovingFocus` moves to `composables/motion/morph`.
4. `modal`: `ModalOverlay` becomes `overlay/modal/` behind its own door.

One type-only 2-cycle survives every cut. `_shared/useMotionAxis.ts` makes a value import of `core/useReducedMotion.ts`, and `useSelectionGroup` makes a type import of `_shared/selection.ts`.

**Size bound and long dirs** (R6).

- A module dir holds ≤ 12 direct source files, and a file holds ≤ 500 lines. Test files and `@generated` files are excluded.
- A module past the bound splits into sub-modules, each with its own door. Measured carves:
  - `menu/sub/` and `menu/items/`: menu would otherwise go from 16 to 19 direct files.
  - `sheet/styles.css` (583 lines) becomes a door over `styles-a.css` (316) and `styles-b.css` (267).
- The root aggregate `src/index.ts` (585 lines) needs a ruling.

### B.2 Public-surface guarantee

**Guarantee.** The exports map stays byte-identical, provided the nested doors are keyed through `NESTED_COMPONENTS`.

**Evidence** (overlay seal prototype, D1-B Q3, "Consumer surface"):

| check | result |
|---|---|
| `package.json` `exports` | all 68 keys byte-identical |
| entry filenames | every `dist/<name>.js` and `.d.ts` keeps its filename |
| public entries | 63 in both builds; 15 changed; entry gzip −108 B |
| internal `dist` | 30 or more `.d.ts` and CSS files relocate under `dist/components/overlay/`; 2 shared chunk names disappear. None is export-reachable |

**Measured changes the guarantee does not cover:**

- **Behaviour.** Participation reads the overlay-owned `OverlayHost`, which only `provideDockContext` provides. A consumer that provides the public `DOCK_CONTEXT_KEY` directly loses overlay participation. No sibling repo provides it directly.
- **S7 break, if it is taken.** 44 name-slots leave four published subpaths: `./motion` 13, `./motion-core` 25, `./color` 3, `./dom` 3. Examples are `useScrollChrome`, the pointer-field mappings, `useAccentTone` and `useDragVelocity`. The alternative is to leave those files in the kernel, with the seal incomplete.
- **Additive growth.** Fixing R1 against the kernel puts 50 names on published doors: `./motion` 46, `./motion-core` 2, `./dom` 1, `./color` 1.
- **Bytes.** Measured with a one-symbol consumer, minified and gzip -9:

  | import | Δ |
  |---|---:|
  | `GlassDock` | +641 B |
  | menu | −681 B |
  | popover | −715 B |
  | select | −692 B |
  | tooltip | −698 B |
  | command | −123 B |

  The static closure of `./dock` grows by 5,057 B. Summed over all 63 subpaths the closure grows by 6,190 B.
- **CSS.** The flattened `dist/styles/index.css` holds 1,935 rules in both builds; gzip goes from 56,693 to 56,681. **76 rules reorder**: the sheet and dialog blocks move to the overlay door's rung. This was not paint-verified.

Variant B′ (one subpath per family) would break about 45 keys (PORTFOLIO §4). It was not prototyped.

### B.3 Gate contract

**Executable.** `node $D1/D1-B/door-gate.mjs <repoRoot> [--scope dir] [--max-files 12] [--max-lines 500] [--verbose]`. The gate is 64 lines and uses `trace.mjs` (110 lines). It reads the published doors from `scripts/lib/subpath-policy.mjs` `libraryEntryMap()` and exits 1 on any violation.

**Input graph.** `trace.mjs` reads the TS AST, SFC `<script>` blocks, `<style src>` and CSS `@import`. At HEAD it produced 1,263 files, 2,790 edges and 0 unresolved.

- It resolves `@glass`, `@glass/…`, relative and `/src/` specifiers.
- It returns null for bare packages.
- It marks anything else `UNRESOLVED:`.

**Edges counted.**

| rule | edges | invariant |
|---|---|---|
| R1 door | every `src → src` edge, value and type-only | the target is `M/index.ts` or a published door. Of 445 door-passing edges at HEAD, 91 are type-only |
| R2 consumer | `demo`, `tests`, `tests-visual` and `scripts` → `src`, alias and relative alike | the target is a published door |
| R3 CSS door | CSS (`@import`, `<style src>`) that crosses a module | the target is `M/styles.css` or `M/index.css` |
| R4 acyclic | value edges only, between sibling modules at every depth | no cycle. Tests are sinks; type-only edges are listed separately |
| R5 kind slot | — | no `index.ts` in a kind slot |
| R6 bound | — | the directory and line bounds of B.1 |

**The relative-path bypass does not arise.** The rule is judged on the module of the resolved target, never on the specifier form, and no resolver privacy is involved. `src` holds 0 `@glass/` specifiers (PORTFOLIO §1), so all 379 R1 hits at HEAD are relative reaches, for example `_shared/overlay/participation.ts -> dock/composables/dockContext.ts`. The hole W §2.3 measured is a resolver's hole, and this gate does not rely on a resolver.

**RED at HEAD** (measured): `door-gate scope=src modules=69 published-doors=66: FAIL (788 violations)`, exit 1.

| rule | count | examples |
|---|---:|---|
| R1 | 379 | |
| R2 | 353 | |
| R3 | 26 | |
| R4 | 2 | M02 (7 members); M03 via `SheetContent.vue -> dialog/ModalOverlay.vue ; DialogContent.vue -> sheet/motion.ts` |
| R5 | 2 | `dock/composables/index.ts`, `infinite-scroll/composables/index.ts` |
| R6 | 26 | `src/index.ts` 585 lines; `aurora/composables` 16 files; `aurora/composables/runtime.ts` 528 lines |

On the prototype, the overlay scope passes all six rules. The full tree reads 667: R1 363, R2 263, R3 15, **R4 0**, R5 2, R6 24.

**Mutations the gate must catch:**

| id | mutation | status |
|---|---|---|
| M-B1 | HEAD measured against the sealed overlay. `--scope src/components/overlay` fails at HEAD and passes on the prototype; R4 goes from 2 to 0 | measured |
| M-B2 | a new directory that no class covers. The classifier failed closed with `unclassified dir components/overlay` | measured |
| M-B3 | in the sealed tree, a relative import from dock into `overlay/modal/ModalOverlay.vue`, past `overlay/index.ts`. R1 must fire | specified |

**Deltas between the contract and the pass-1 script:**

- D1-B reports that "the gate fails loud on an unresolved `src` specifier". It does not. `door-gate.mjs:33` skips every edge whose target does not start with `src/`, and `trace.mjs` marks unresolved targets `UNRESOLVED:…`, so an unresolved edge is skipped. HEAD has 0 unresolved edges, which is why the omission was invisible. The contract adds **R0: an `UNRESOLVED:` edge from any zone is a violation**.
- The contract has no exception for deliberate leaf imports, such as `demo/shell/AppShell.vue → Aurora.vue`, which exists for the async chunk. A per-site exception, or accepting the boot-graph cost, is left open (B.6).

### B.4 Migration plan (ordered)

| # | step | measured cost |
|---|---|---|
| 0 | floor + the `NESTED_COMPONENTS` re-key | — |
| 1 | four inversions (B.1) | value SCC 2 → 0 at both levels (D1-B Q4) |
| 2 | move components into their families | CORROBORATED: 300 `src` files (`_shared` 6, components 259, OWNED composables 35). AMENDED 13-family draft: 409 |
| 3 | rewrite specifiers, by AST (the regex rewriter mangled 3 demo files) | CORROBORATED: 836 in 353 files (src 405, demo 187, tests 226, tests-visual 18), plus 187 path strings in 52 files. AMENDED: 1,118 in 463 files, plus 241 path strings in 64 files |
| 4 | door growth | 140 symbols added to doors, or re-homed. A decision on the 44 kernel-subpath name-slots |
| 5 | demo | 72 reroutes. The 16 private symbols (18 specifiers in 11 files) are published or moved. The leaf-import exception |
| 6 | tests | 165 files colocate into one module; 56 stay (they span two or more modules); 27 have no `src` target. Re-seat the 4 self-scanning tests, the 2 `src`-walking gates and the 17 CSS-text tests in 3 files. A ruling on the closed-record `gate-register` rosters (4 red) |
| 7 | CSS doors | the 21 cross-module `@import`s in `src/styles/index.css` become module `styles.css` doors |
| 8 | kind-slot doors and bounds | remove 2 kind-slot doors; about 24-26 R6 carves; a ruling on the root aggregate door |

The overlay prototype alone:

- moved 102 files and changed 261;
- rewrote 134 demo files and took 11 hand edits;
- left `vue-tsc` at 0 errors;
- ran `vitest` at 2,306 pass / 7 fail (4 of them the `gate-register` roster).

### B.5 Backend

**glass-ui `scripts/`** (D1-B "Backend analogue"). Each domain gets a door at `scripts/<domain>/index.mjs`:

| domain | files |
|---|---|
| `policy` | subpath-policy, regen-exports, flatten-subpath-types, verify-export-types |
| `styles` | gen-component-styles, minify-css |
| `paint` | paint-arm, reflect-capture-verify, safari-probe |
| `census` | comment-census, gate-register, import-dag, profile-bundle |
| `tokens` | regen-spring-tokens |

- A CLI stays a leaf that `node` runs. The door is only its import surface.
- 26 specifiers touch `scripts/`:
  - 21 come from tests, tests-visual and `vite.*.ts`;
  - 3 are internal;
  - 2 go from scripts into `src` privates: `regen-spring-tokens.mjs` → `springPresets.ts` and `springProjection.ts`.
- Once doored, 23 of the 26 cross a domain and are born RED.
- The root `vite.*.ts` files become a `build/` module with a door, or stay a consumer zone under R2.
- The scripts → `src` reach goes through `./motion`.

X §6.1 places the test-only helpers with their consumers instead: `paint-arm` → `tests-visual`, `gate-register` and `comment-census` → `tests/gates`. D1-B keeps them as `scripts` domains. That disagreement stands as measured.

**Carrying the seal to a sibling backend** (value.js `api/src`, measured read-only):

- The shape is already family-over-kernel: `modules/{admin,color,meta,palette,session}` over `platform/{cache,db,http,migrations,text}`. But it has **0 module doors**.
- Born RED: 12 cross-module deep specifiers (admin→palette 7, admin→session 3, admin→color 2) plus 69 module → platform reaches (http 65, text 2, db 1, cache 1). That is 81.
- R1 needs a `modules/<m>/index.ts` and one door per platform service.
- S7 becomes "platform imports no module".
- R2's published set becomes the HTTP route table.
- Node `imports` (`#platform/*`) would add resolver privacy for bare specifiers only. Relative paths bypass it (W §2.3), so the gate stays.
- **Python:** import-linter's `protected` and `acyclic_siblings` contracts (W §8.1, measured).
- **Rust:** `pub(super)` / `pub(in path)` (W §2.2).

### B.6 Open gaps (verbatim, D1-B "Open gaps")

- The demo-side Vite alias (the runtime mirror of the tsconfig paths) and the boot-graph weight of door-only imports were not measured.
- The 76 reordered CSS rules were not paint-verified (live π per band).
- The fix for the `gate-register` roster touches closed-tranche records, and needs a ruling.
- The full-tree seal was not run. The prototype sealed overlay only; the other 8 families and the kernel moves are dry-run numbers.
- The kernel vocabulary module (`_shared`) needs a name and a door surface.
- The 13 OWNED composable modules (17 files, 62 names) need per-symbol surface decisions: move them and break 44 name-slots, or keep them in the kernel.
- Type-only kernel cycles (`_shared` ↔ `composables/motion`) need a policy.
- The bound values (12 files, 500 lines) are not justified by measurement. The root aggregate door (585 lines) needs a ruling.
- Cross-module tests need a placement rule by subject, e.g. `DropdownMenuTrigger.action` importing dock privates.

---

## D1-C · Workspace packages (the resolver enforces privacy)

### C.1 Placement law

**Inputs.**

- The atom graph (`$D1/D1-C/atoms.mjs`): 94 atoms, namely each component dir, each `_shared` entry, each composable subtree, `motion` whole, the `glass` subdirs, `styles` and `fonts`.
- Value and type edges: 494 between atoms, 1,306 between `src` files.
- The charter sketch, mapped atom by atom (`sketch.mjs`) to 18 packages plus the aggregate.

**Rule** (strongest form, clauses 1-4, 8).

1. **Package of an atom.** Every atom belongs to one of the sketch's 18 packages:

   > kernel, platform, motion, gpu, surfaces, overlay, dock, feedback, controls, binary, track, fields, pager, disclosure, data, procedural, expressive, tokens

   Eight prerequisite re-homes come first:
   - 3 file re-homes: `dockContext.ts` with its label goes to overlay; `useTabRovingFocus.ts` goes to motion; the ambient `html-attributes.d.ts` augmentation goes to kernel, behind the door `./html-attributes`.
   - 5 atom placements: `sidebar` → motion; `useSpecularTracking` and `vSpecular` → gpu; `tabs` → fields; `_shared/field` → kernel.
2. **Layout.**
   - Each package is `packages/<name>/{package.json, tsconfig.json, README.md, src/, test/}`.
   - The aggregate stays at the repo root. Moving it to `packages/glass-ui/` would point every `file:../glass-ui` link at a private workspace root (D1-C Q5).
   - The aggregate owns only:
     - `src/index.ts`;
     - `src/styles/{index,fonts,theme}.css` and `src/fonts/`;
     - the entry map `entries.json` (`name → path`, 65 lines).
   - Tooling lives at `tooling/<name>/` with a `bin`.
   - The demo and `tests-visual` stay in the root package.
3. **Dependencies.**
   - Workspace dependencies use `"*"`, because npm 11.12.1 rejects `workspace:*`.
   - External runtime imports are `peerDependencies` only, with ranges equal to the aggregate's.
   - Tests may use `devDependencies`.
   - TS `references` are derived from `dependencies`. The declared graph must be acyclic.
4. **Doors.** A door is an `exports` key. At the sketch's granularity the measured door set is 237: 73 `index.ts` and 164 `.vue` files or internals reached from outside. The spec must pick one of:
   - per-file doors, in which case those 164 are the privacy given up;
   - one barrel per sub-module, which was not measured.
5. **One resolution path per specifier.**
   - Private `exports` are unconditional string targets into `src`.
   - The aggregate's `exports` point only into `dist`, and the aggregate reaches its own sources through `imports` (`#glass/*`).
   - The `@glass` alias and the `development` condition are deleted.
   - No repo code imports `@mkbabb/glass-ui`.

**Global.** "Global" means a package that other packages declare as a dependency (kernel, platform, motion, tokens). It is set by the `dependencies` manifests, not measured.

**Recursion and placement inside a package.** Out of this family's scope (strongest form, clause 10). The full carve produced `packages/dock/src/dock/…` and `packages/motion/src/motion/…`. A placement rule from D1-A, D1-B or D1-F has to be named here by reference. The family defines none of its own (C.6: "placement inside a package").

**Size bound and long dirs.** The family has no bound of its own. The encapsulation unit for a long-running dir is a new package. Measured granularity (D1-C Q4, §8.8):

- Package sizes range from 383 lines (binary) to 19,539 (procedural) and 14,631 (tokens, all CSS). The two largest are still the long modules the edict wants broken up.
- The balanced minimum-cut partitions leave 212, 249 and 277 cross-package edges at k = 8, 12 and 16, after the re-homes.
- The cut optimum is not a design: at k = 16 it puts `button card carousel dock easing labeled-field number-field slider toggle-group search` in one package.

The intra-package bound therefore comes with the borrowed placement rule.

**Tests** (clause 7).

- A single-package test lives in `packages/<p>/test/`: 140 at the sketch. The rest (107) stay in `tests/`.
- A test reads a file through the resolver (`import.meta.resolve("@glass-ui/tokens/glass.css")`) or relative to its own package, never through a `src/…` string.

### C.2 Public-surface guarantee

**Guarantee.**

- The aggregate keeps all 68 keys with identical targets, and 62 identical `typesVersions`.
- Package output lands at `dist/<pkg>/…`, which no key can address.
- No file in `dist` names `@glass-ui/`.

**Evidence** (D1-C Q2, Q3, §6):

| check | result |
|---|---|
| regeneration | `EXACT REPRODUCTION: YES` for both carves: exportKeys 68/68, jsSubpaths 62, 0 drops/adds/target mismatches, 0 `typesVersions` drift. The full carve re-keys 62 of 63 entries through the 65-line map |
| symbols | 63 declaration entries with 1,279 exported symbols; 63 JS entries with 603 export names. 0 entries differ, and 0 declaration diagnostics |
| file set | 2-package carve: 837 files in both, identical top level, 77 nested files relocated. Full carve: 836 against 837 (the dead `components/index.ts` barrel's declaration is gone), 610 of 611 nested files relocated |
| bytes | +467 (2-package) and +1,513 (full), i.e. 0.02-0.06%. Scoped `data-v` ids hash the file path. `.bundle-ratchet` rebinds on every carve |
| leak | C5 counts 0 `@glass-ui/` specifiers in `dist` for both carves. A leaked one resolves under a `file:` link but fails from a registry-shaped install with `ERR_MODULE_NOT_FOUND` |

**Cascade.**

- In the 2-package carve the order is identical: dev keeps its 1,971 common rules, and the bundled build has 1,773 rules.
- **The full carve reorders `./styles`.** `terminalImportIndex` (`vite.style-fold.ts:89-92`) finds the terminal import by the literal `./accessibility.css`. Once that file lives in `tokens`, the SFC bundle and component utilities fold in after the accessibility rules. That is a consumer-visible a11y change until the anchor becomes a declared role, and `verify-export-types` and the gate both passed it.

Variant C′ (publishing the sub-packages) rewrites 579 sibling import statements. It was not prototyped.

### C.3 Gate contract

**Executable.** `node $D1/D1-C/gate-packages.mjs <repoRoot> [--json]` (114 lines).

- It lexes modules with `ts.preProcessFile`, and each SFC `<script>` block.
- It reads CSS `@import` and `<style src>` with comment-stripped regexes.
- **An unresolved relative specifier is a failure** (`gate-packages.mjs:72`).

**Input graph.** Every file under `packages/*`. As prototyped it does not read `tooling/*`, and the contract requires it to.

Edges counted:

- every module specifier `ts.preProcessFile` reports: value and type imports, re-exports, dynamic `import()`;
- CSS `@import` and `<style src>`;
- both relative specifiers and package specifiers of the form `@glass-ui/<p>/<key>`.

**Clauses.**

| clause | invariant | status |
|---|---|---|
| C1 | `src/` holds only the aggregate: `index.ts`, `entries/*.ts`, `styles/{index,fonts,theme}.css`, `fonts/**` | built |
| C2 | no relative specifier (module, `<style src>`, CSS `@import`) leaves its own package root | built |
| C3 | every `@glass-ui/<p>/<key>` names a declared dependency and a key in `<p>`'s `exports`, and every declared workspace dependency is used | built |
| C4 | the declared dependency graph is acyclic and equals the `tsconfig` references | built |
| C5 | no file under `dist/` carries `@glass-ui/` | built |
| C6 | peer ranges equal the aggregate's; no external `dependencies` | required, not built |
| C7 | no `src/…` or `packages/…/src/…` literal in tests, scripts or build modules | required, not built |
| C8 | no self-reference to `@mkbabb/glass-ui` | required, not built |

**How it defeats the relative-path bypass.** This is the one family whose privacy comes from the resolver, so the hole is real here. The gate closes it with two clauses the substrate cannot supply:

- **C2** refuses a relative specifier that leaves the package root.
- **C3** refuses an undeclared package import.

What the TS project references do alone, measured with `vue-tsc -b` on planted edges (D1-C §4):

| probe | planted edge | result |
|---|---|---|
| P1 | kernel references overlay (a declared cycle) | `TS6202` |
| P2 | kernel imports `@glass-ui/overlay/dialog`, undeclared, closing a real cycle | **0 errors** |
| P3 | overlay imports `../../../kernel/src/class-names` | **0 errors** |
| P4 | overlay imports the aggregate's `src/…` by relative path | TS6059 + TS6307 |
| P5 | bare `@glass-ui/kernel/src/class-names` (not a door) | TS2307 |

**RED at HEAD** (measured):

```
gate-packages: 0 package(s) [], 1068 files scanned, 0 package specifiers
  C1: 647   (src/components 459 · src/composables 109 · src/styles 78 · src/html-attributes.d.ts 1)
  C2: 0  C3: 0  C4: 0  C5: 0  unresolved: 0
FAIL
```

At HEAD only C1 can fire, and it says "the carve has not happened". The born-RED that shows C2-C4 work is the planted pair below.

Once green: the 18-package tree `wt2` passes C1-C5 at 0, over 1,067 files and 1,041 package specifiers.

**Mutations the gate must catch** (measured, planted in `wt`):

| clause | planted mutation | gate output |
|---|---|---|
| C2 | a relative reach from `packages/overlay/src/dialog/index.ts` to `../../../kernel/src/class-names` | `… (overlay) -> packages/kernel/src/class-names.ts (kernel)` |
| C3 | `packages/kernel/src/class-names.ts` imports `@glass-ui/overlay` without declaring it | `… imports @glass-ui/overlay without declaring it` |

Each adds 1 over the `wt` baseline. C4 stays 0 on the second plant, because an undeclared cycle is visible only to C3.

A third case, also measured: a stale declaration (the codemod recorded `overlay → dock` for an import a later fix-up removed) produced `dependency cycle: @glass-ui/dock -> @glass-ui/overlay -> @glass-ui/dock` under C4. That case is why C3 checks that used equals declared.

**Delta between the contract and the pass-1 script.** The gate reads only `packages/*`. After the tooling carve it reported the 2 tests that import `@glass-ui/tooling-exports` as an unknown package (C3 2).

### C.4 Migration plan (ordered; measured on the 18-package tree `wt2`)

| # | step | measured cost |
|---|---|---|
| 1 | prerequisite inversions | 3 file re-homes and 5 atom placements. M02's exact minimum cut is 2 value edges. M03 needs nothing, because dialog and sheet share overlay |
| 2 | carve, rewriting with the `ts.preProcessFile` lexer (the regex missed `dock/index.ts:58-67`) | 646 `src` files moved, 1 deleted. 1,327 specifiers rewritten: src 526, demo 366, tests 430, tests-visual 2, scripts 2, `vite.dark-stamp.ts` 1. 1,041 package specifiers after |
| 3 | config | 40 files, 1,565 lines: 18 `package.json` (743), 18 `tsconfig.json` (585), `tsconfig.packages.json` (59), `tsconfig.refs.json` (75), `entries.json` (65), `workspace-packages.mjs` (38). Lockfile: +2 entries per package via `npm install --package-lock-only --offline` (0.4 s) |
| 4 | entry re-key | 62 of 63 entries |
| 5 | build lifecycle | one `vue-tsc -b` over a packages-only solution file, with `tsBuildInfoFile` inside `outDir` (a cold `-b` otherwise failed with `ENOENT … .tsbuild`). A relinker for dist declarations and CSS. The style closure resolves through `exports`. Every post-copy pass takes its roots from the workspace package list. The accessibility anchor becomes a declared role (not yet fixed). Machinery: +85/−24 lines |
| 6 | Tailwind sources | the demo harness scans `packages/*/src` (5 globs measured; one glob plus `@source not` for shaders is smaller) |
| 7 | tests | 140 into `packages/*/test/`. 430 literal `src/…` strings in 87 files, 23 of them directory scanners, repaired by hand (no codemod). 82 test files fail after the carve, 76 more than HEAD's 6 |
| 8 | tooling | `tooling/<name>/` with a `bin`; `workspaceRoot()` replaces 8 location-derived repo roots |
| 9 | deletions | the `@glass` alias ×4; about 290 of the 388 lines of `subpath-policy.mjs`; the phantom layer of `regen-exports.mjs`. Net: about +1,565 config lines against about −320 |
| 10 | CI | `ci.yml` and `release.yml` under workspaces; not run |

**Build time** (paired runs under load):

| build | wall | note |
|---|---|---|
| HEAD | 11.5 s | |
| per-package emit | 41.4 s | 64.6 s CPU |
| `vue-tsc -b`, cold | 23.0 s | |
| `vue-tsc -b`, warm | 9.4 s | |
| `vue-tsc -b`, after a kernel edit | 23.9 s | cascades to all 17 dependents |

### C.5 Backend

**glass-ui tooling** (prototyped in `wt`, D1-C §7):

- `subpath-policy`, `regen-exports`, `flatten-subpath-types` and `workspace-packages` became `tooling/exports`:
  - package `@glass-ui/tooling-exports`, with 3 exported modules;
  - `bin: { "glass-regen-exports": "./src/regen-exports.mjs" }`.
- 7 importers were rewired to bare specifiers. The build is green, and the dist generation hash (`056be4d0…`) is unchanged.
- The first run failed, because the tool derived its repo root from its own file location. The fix is `workspaceRoot()`, which walks up from `cwd` to the `package.json` that declares `workspaces`.

The rest follows X §3.1:

| package | members |
|---|---|
| `exports` | the modules above, plus `verify-export-types` |
| `styles` | `gen-component-styles`, `minify-css` and the `vite.*` build modules |
| `graph` | `import-dag`, `profile-bundle` |
| `release` | |
| `capture` | |

The build modules need a TS program of their own. Composite mode reports 3 × TS6307 and 4 × TS7016, because no program includes them at HEAD.

The test-only helpers go to their consumers, not into a package: `paint-arm` → `tests-visual`; `gate-register` and `comment-census` → `tests/gates`.

**Carrying it to a sibling backend** (not prototyped; facts from X.md):

- **TS on Hono.** value.js `api/src/modules/*` and `platform/` become private workspace packages, and the server entry is the aggregate app. speedtest already runs `server`, `workers/speedtest-edge` and a lighthouse plugin as workspaces (X H8).
- **Python.** A uv workspace with one distribution per domain. Python has no resolver privacy, so import-linter's `acyclic_siblings` and `protected` carry C2-C4 (W §8.1, measured).
- **Rust.** bbnf's 14-crate Cargo workspace is this family as it stands: `pub` gives crate privacy, and cargo refuses a cyclic crate graph.

### C.6 Open gaps (verbatim, D1-C §9)

- the door policy (per-file doors or barrels) and its rewrite cost;
- a resolver-based replacement for the 430 literal paths and the 23 scanners, with no mechanical codemod yet;
- a complete inventory of path anchors in `vite.*.ts` and `scripts/` (found so far: the accessibility anchor, the 3 pass roots, the `copyStyleAssets` roots, `@source`, the 8 repo roots);
- granularity: the sketch at 18 packages against coherent, balanced splits of `procedural` and `tokens`;
- placement inside a package;
- CI: `ci.yml` and `release.yml` install and build under workspaces, not run;
- the demo and `tests-visual` as `apps/*`, not moved;
- the 76 test files the full carve broke, not repaired;
- C′ publishing, not prototyped;
- the sibling-backend carry, not prototyped;
- the E-8 budget: whether gate-packages replaces the SCC check in `import-dag.mjs` and the structure arms of G-OVERFIT.

---

## D1-D · Declared strata (direction first)

### D.1 Placement law

**Inputs.**

- The typed graph from `$D1/D1-D/graph-ast.mjs`: 1,266 files and 2,795 edges (value 2,173, type 440, css 139, dynamic 43), with **0 unresolved**.
- `origins.mjs`, which follows every imported name through re-export chains to the file that declares it.
- The charter `src/strata.ts`, whose rows are `{ path, reason }` only.
- The rank carrier: either the directory names (variant D) or a table over today's dirs (variant D′).

**Strata and ranks** (strongest form, clause 1):

| rank | stratum |
|---:|---|
| 0 | foundation |
| 1 | primitives |
| 2 | substrate |
| 3 | patterns |
| 4 | components |
| 5 | compositions |
| 9 | entry anchors |

**Units** (clause 2).

- foundation is one unit.
- In strata 1-3, each charter row is a unit (a directory), and each stratum also has one root row.
- In strata 4-5, a unit is the top directory.
- Inside a unit, colocation is full and recursive: sub-components, `composables/`, constants, skeleton, styles. Edges and cycles inside a unit are free.

**Anchors, rank 9** (clause 3).

- `src/index.ts`.
- The published doors that aggregate more than one unit (`./motion`, `./motion-core`). These live apart from any leaf dir.
- `html-attributes.d.ts`.
- **Every cascade root**, meaning a stylesheet that holds only `@import`s. At HEAD: `styles/{index,glass,tokens,theme,typography,utilities}.css` and `deck/styles/index.css`.

**Rule** (clause 5).

```
edge e = (from → to), with unit(from) ≠ unit(to):
  legal(e) ⇔  rank(from) > rank(to)
           ∨  (stratum(from) = stratum(to) ∈ {1, 2, 3, 5}  ∧  that stratum's unit graph stays acyclic)
  a cross-unit edge inside stratum 4 is illegal
```

The measured need for intra-stratum edges is 11 edges in strata 1-3 (`motion → dom → reactive`, `overlay → surface → (root)`, …) and `easing → tabs` in stratum 5.

**What "global" means** (clause 6, D1-D Q3). A file is global if it lies in strata 1-3 under a charter row, and it keeps that place only while it passes the consumer rule:

- **consumer units(f)**: the component and composition units (ranks 4 and 5) that reach `f`, symbol by symbol through lower-strata chains. A component door that re-exports `f` counts as consumption. Lower-strata barrels are transparent.
- **published(f)**: `f` is reachable from a public door without passing through a component door.

| consumer units | published | verdict |
|---|---|---|
| ≥ 2 | either | pass |
| 1 | yes | pass |
| 0 | yes | pass |
| 1 | no | fail: **owned**, the file returns to that unit |
| 0 | no | fail: **dead** |

Whether a public door counts as a unit is an owner ruling. Counting it gives 9 owner returns; not counting it (`STRICT=1`) gives 20.

**Placement and tie-breaks** (clauses 7 and 5; D1-D §1).

- **Owned files.** A file that one unit consumes, unpublished, lives inside that unit.
- **Promotion.** A file that closes a sideways or upward edge is promoted to a lower stratum. It takes its in-owner dependency closure with it: `dockContext.ts` had to take `DOCK_CONTEXT_LABEL`. Any symbol that was reached through the former owner's door is re-pointed at the pattern.
- **Components and compositions.** A unit that imports another component unit is a composition, rank 5. Otherwise it is a component, rank 4.
- **Promotion vs reclassification.** Where both would cure an edge, the cheaper one is taken:
  - `pager-dots` is declared a composition rather than promoting deck's five-file core;
  - `tabs` genuinely composes `Select`, so it is a composition.
- **The minimal promotion set is 9 files** (measured):

  | file | goes to |
  |---|---|
  | `aurora/constants/budget.ts` | `glass/webgl/budget.ts` |
  | `dialog/ModalOverlay.vue` | `_shared/overlay/` |
  | `sheet/motion.ts` | `_shared/overlay/` |
  | `dock/composables/dockContext.ts` | `_shared/overlay/` |
  | `dock/composables/useDockHold.ts` | `_shared/overlay/` |
  | `composables/glass/index.ts` | `glass/webgpu/index.ts` |
  | `useTabRovingFocus.ts` | `motion/morph/` |
  | `_shared/selection.ts` | `motion/morph/` |
  | `_shared/interaction.ts` | `motion/morph/` |

  Full D uses an 8-file variant that builds a `patterns/selection/`.

**Recursion.** Inside every component or composition unit, colocation recurses. Strata 1-3 are internal DAGs and are not flat layers. Across strata, direction is the only rule.

**Size bound and long dirs** (clause 9).

- A per-unit directory and file bound applies inside every unit and at every stratum root. The shared proposal is 12 direct files and 500 lines (PORTFOLIO §6 Q6).
- A long unit carves into sub-dirs inside itself, where intra-unit edges are free. A long lower-strata row splits into rows.
- The bound was not measured on the D tree (D.6, gap 8).

**Tests** (clause 10). Tests mirror the strata: `tests/<stratum>/<unit>/…`. Of 248 test files, 206 would move, 16 already sit at their mirror path, and 26 have no `src` subject.

**Variant D′.** The same rules, but ranks come from a table over today's dirs. `_shared` and `composables` keep their names, and the table supplies what they mean.

### D.2 Public-surface guarantee

**Guarantee.**

- The entry map is `name → path`.
- A single `SRC_OF_DIST` map is the only coupling between dist and src. It is applied at three sites:
  - the fold's root derivation;
  - the fold's copy and post-process roots;
  - `gen-component-styles` `outputMember`.
- A release arm compares the flattened cascades of the four CSS export entries with the previous build, modulo Vue scope ids.

**Evidence** (D1-D §5, §8, §11):

- **Exports** (D tree): `regen-exports` reports `EXACT_REPRODUCTION: true`, 68 keys, 62 `typesVersions`, symbol fidelity 63/63. D′ and D both keep 603 runtime and 1,279 type names identical.
- **CSS:**

  | tree | result |
  |---|---|
  | D′ | all four flattened CSS export entries byte-identical |
  | D | `theme.css`, `fonts.css` and `component-styles.css` byte-identical. `styles/index.css` differs in exactly the 14 `@import` lines; its flattened cascade (122 files, 322,680 bytes) is identical modulo scope ids. `glass-ui.css` is identical modulo scope ids (15 of 16 rehash) |

- **dist internals** (D). Declarations and copied CSS split across `components`, `compositions`, `patterns`, `primitives`, `substrate` and `foundation`. `styles/tokens.d.ts` and `tokens/manifest.d.ts` move to `dist/foundation/`; neither is an export key.
- **Adjacent checks.** `tests/public-surface.spec.ts` pins the dist file list, so it goes red under D. So does any visual baseline keyed on `data-v-*`.

### D.3 Gate contract

**Executable.**

```
node $D1/D1-D/graph-ast.mjs <root> g.json
node $D1/D1-D/gate.mjs g.json <charter.mjs>
```

- The gate is 91 lines and runs in under 1 s including the graph build.
- The charter is `charter-dprime.mjs` (D′: 22 rows plus 11 composition rows) or `charter-d.mjs` (D: 20 rows).
- Variants: `STRICT=1` (a public door is not a unit) and `ROWS=1`.
- The backend arm is `scripts-gate.mjs`.

**Edges counted.** Value, type, dynamic `import()`, CSS `@import` and `<style src>`, each resolved fail-closed. **An unresolved specifier is a violation** (`gate.mjs:29`). Relative and `@glass/` specifiers count alike.

**Clauses.**

- `upward`: rank rises along an edge.
- `sideways(component)`: a cross-unit edge inside stratum 4.
- intra-stratum cycle.
- `charter-owned(1 unit)`.
- `charter-0-unpublished`.
- a lower-strata file under no row.
- a row whose path does not exist.

The cascade-identity release arm (D.2) is separate and required.

**The relative-path bypass does not arise.** Rank is judged on the stratum of the resolved file, and no resolver privacy is involved. At HEAD, every sideways and upward violation in `src` is a relative specifier, for example `slider/Slider.vue:20 → dock/composables/useDockHold.ts`.

**RED at HEAD** (measured, D′ charter): `SUMMARY {"upward":6,"sideways(component)":5,"charter-owned(1 unit)":9,"charter-0-unpublished":2}`, `FAIL: 22 violation(s)`, exit 1.

| kind | edges or files |
|---|---|
| upward (6) | `_shared/overlay → dock`; `slider → dock`; `composables/glass → glass/webgpu` (type); `composables/glass → glass/canvas2d`; `composables/motion → _shared` (type); `composables/motion → tabs` |
| sideways (5) | blob → aurora; dialog → sheet; sheet → dialog; pager-dots → deck; tabs → select |
| owned (9) | `isTeleportedTarget`, the backdrop trio and the search trio → dock; `flow.{glsl,wgsl}.ts` → aurora |
| dead (2) | `useScrollScene`, `springProjection` |

The same gate with `STRICT=1` reads 33, and with no compositions declared it reads 41 (the portfolio's 25 sideways pairs).

**Mutations the gate must catch** (measured):

| id | mutation | outcome |
|---|---|---|
| M-D1 | the CSS edge `src/styles/glass.css:68 → chip/accent-tone.css` | reported as `upward foundation -> src/components/chip/ [css]` until cascade roots became anchors. The gate sees CSS edges |
| M-D2 | the first D′ carve moved the accent-tone `@import` after `glass.css` to satisfy the rank rule | by the cascade, `--accent-band-strength` on every chip drops from 22% to 18% (not paint-verified). `vitest` stayed green at 2,310 passed; only the flattened-cascade hash caught it. **The cascade-identity arm must catch this mutation**; the rank gate cannot |
| M-D3 | the D′ carve, then the full D tree | the gate goes 22 → 2 (the two dead files), then to 0 rank violations |

**Delta between the contract and the pass-1 script.** `import-dag.mjs` reads the D tree's motion strata as an 8-dir SCC while the `./motion-core` door file sits inside `motion/core/`. Moving the door out is the anchor rule of D.1, and it was not built (D.6, gap 4).

### D.4 Migration plan (ordered)

**D′** (measured, D1-D §8.1):

1. **9 promotions**, plus inlining `DOCK_CONTEXT_LABEL` into `dockContext.ts`.
2. **Reclassify** `tabs` and `pager-dots` as compositions (table rows).
3. **10 owner returns.** Drop the `isTeleportedTarget` re-export from the overlay door.
4. **Floor #3:** `useScrollScene` → demo. Rule on `springProjection` (move it to `scripts/`, or find a charter reason, which the rule does not allow today).

| cost of steps 1-4 | measured |
|---|---|
| files moved | 19 |
| specifiers rewritten | 107 (src 83, demo 5, tests 19; value 58, type 49) |
| literal paths rewritten | 13 |
| files touched | 85 |
| hand code hunks | 3 |
| build-config hunks | 0 |
| gate | 22 → 2 |
| `vue-tsc`, src and tests | 0 · 0 errors |
| `vitest` | 2,310 passed, 3 failed (the `boot-graph` trio) |
| four CSS export entries | byte-identical |

**D** adds four steps to steps 1-4 (measured, D1-D §8.2):

5. **Re-key the entry map** (floor #6). D cannot build without it.
6. **Rename the zones.** The codemod moves 346 of 658 `src` files:

   | from | to | files |
   |---|---|---:|
   | components | compositions | 112 |
   | components | patterns | 36 |
   | components | substrate | 1 |
   | composables | primitives | 75 |
   | composables | substrate | 20 |
   | composables | compositions | 7 |
   | composables | patterns | 5 |
   | composables | components | 2 |
   | styles | foundation | 81 |
   | fonts | foundation | 7 |

   It rewrites 853 specifiers (value 677, type 153, css 17, dynamic 6) and 271 literals, across 506 files. Hand work: 4 code edits and 15 build-config hunks in 4 files (`subpath-policy.mjs` ×6, `vite.style-fold.ts` ×5, `vite.style-assets.ts` ×3, `gen-component-styles.mjs` ×1), plus the `SRC_OF_DIST` map.
7. **Residue.** 54 tests in 13 files fail on segment-built paths and on assertions about the old shape. Up to 266 unprefixed path mentions remain in 89 files.
8. **Result.** 0 rank violations; `EXACT_REPRODUCTION: true`; `vitest` 2,196 passed, 57 failed.

**Both variants, then:**

9. **Test mirror:** 206 files, not executed.
10. **The cascade-identity release arm.**

**Recurring cost** after the migration: D1-D §2 counts 37 component ↔ composition flips over 703 commits.

| variant | cost per flip | over that history |
|---|---|---|
| D′ | one table row | 37 rows |
| D | one directory move plus about 15 specifiers | about 570 rewrites |

### D.5 Backend

**glass-ui `scripts/`** (D1-D §12). A rank table over today's files:

| rank | tier | members |
|---:|---|---|
| 0 | lib | `scripts/lib/{minify-css,canon-doc,paint-arm}` |
| 1 | domain | `lib/subpath-policy`, `gen-component-styles`, `flatten-subpath-types`, `verify-export-types` |
| 2 | build | the six `vite.*` plugin modules |
| 3 | bin | every other `scripts/*.mjs\|sh`, plus `vite.config.ts`, `vite.iter.config.ts`, `vitest.config.ts` |

`node $D1/D1-D/scripts-gate.mjs g.json` reports `FAIL: 6 violation(s)`:

- **upward** `lib → bin`: `scripts/lib/paint-arm.mjs:26 -> scripts/reflect-capture-verify.mjs` (also at `:28` and `:37`);
- **lib with fewer than 2 units**: `canon-doc` (0 units), `minify-css` (1 unit), `paint-arm` (0 units; tests-visual only).

The cure:

- `paint-arm` → `tests-visual/_support/`;
- `canon-doc` is deleted;
- `minify-css` → `build/`;
- the shared helpers enter `lib/`: one walker (6 copies today), one repo root (8), one sha256 (4);
- `subpath-policy` becomes `domain/exports/`, with regen and verify beside it;
- the CLIs become thin `bin/` files.

Full D also renames `scripts/{lib,domain,bin}` and adds a root `build/`.

**Carrying it to a sibling backend.** The mechanism is language-neutral: fixed ranks, units, a charter of reasons, and a rank-plus-acyclicity gate.

- **value.js `api/`:**
  - `platform/` is rank 0.
  - `modules/<domain>/` are rank 1 and may not import each other, like D's components.
  - The app/router assembly is the entry anchor.
  - Route, service, repository and schema colocate inside a module.
  - speedtest's `routes/ services/ validation/` kind layers dissolve into modules rather than being ranked.
- **Python:** import-linter `layers` (`api.main | api.<domains> | api.lib`, with `|` meaning independence). A stale ignore fails the run.
- **Rust:** crate dependency order is already a rank the compiler enforces.

### D.6 Open gaps (verbatim, D1-D §14)

1. **Does a public door count as a consumer unit?** (§3, weakness 6.) The answer changes the owner returns from 9 to 20 and decides whether published barrels must split into door and module. Owner ruling.
2. **Compositions of compositions:** allow as an acyclic stratum (as prototyped), ban, or sub-rank by computed height.
3. **Promotion or inversion for M02.** The prototype promoted `dockContext.ts`. The DIP neutral key keeps dock colocated and costs one extra provide. Not built here.
4. **Where aggregate doors live** (`./motion`, `./motion-core`): an `entries/` location or `src/` root. Not built. Required before `import-dag` stops seeing a motion knot.
5. **Tests.** Mirror per stratum (206 moves, measured, not executed), or colocate. The 54-test residue of §8.2 was diagnosed, not fixed.
6. **The cascade-identity arm** belongs in the release path. Where it sits against E-8's 40-60 gate budget is undecided.
7. **Rulings for the 2 dead modules** (`useScrollScene` is common floor #3; `springProjection` has no decision).
8. **The size bound** per unit and per stratum root was not measured on the D tree.
9. **`demo/`** was rewritten mechanically (138 specifiers). Whether it may reach into strata below the public doors is PORTFOLIO §6 Q7 and was not decided here.

---

## D1-E · Unit manifests, generated wiring (declaration is the source of record)

### E.1 Placement law

D1-E does not compute where files go. It declares the few facts code cannot state and derives the rest. Position carries visibility, location in `src/composables/` carries the claim to be global, and the gate checks both against measured consumers.

**Inputs.**

- The directory tree.
- One `unit.ts` per unit root. It is a literal, `export default { … }`, with no imports and no expressions, read synchronously by one loader.
- The TS-AST symbol tracer, which follows re-export chains and dynamic `import()`.

**Units** (strongest form, 2.1).

- The unit roots are:
  - each child of `src/components`, `src/components/_shared` and `src/composables`;
  - `src`, `src/styles` and `src/fonts`.

  That is 75 roots at HEAD.
- Every file belongs to its nearest unit directory.
- A nested directory under a component root is a unit by position and needs no manifest.

**Manifest** (2.2). Four keys; an unknown key is an error.

| key | holds | occupants at HEAD |
|---|---|---:|
| `entries` | public name → file in the unit | 57 units, 63 names |
| `assets` | non-JS export key → dist target, verbatim | 2 units, 5 keys |
| `styles` | ordered cascade roots, only when a unit has 2+ roots with a dependency between them | 1 (dock) |
| `visibility` | `"library"`, only to widen a nested component dir | 0 in the target state |

**Derived, never declared** (2.3).

- **Wiring:** the vite entry map, `exports` and `typesVersions`, with sorted keys.
- **The cascade slot.** A generated region in `src/styles/index.css`, between `/* units:cascade … */` and `/* units:end */`.
  - It is one slot, after `utilities.css` and before `accessibility.css`.
  - Units are ordered by path, then by the unit's `styles` list or file path.
  - A unit's cascade roots are its CSS files that no other CSS file imports.
- **Visibility:**
  - an entry makes a unit public;
  - roots and the composables zone are library-wide;
  - a nested component dir is private to its root;
  - tests are exempt; demo is held to the rule.

**Placement rule the gate implies:**

```
f under a nested dir of component root r  ⇒  every importer of f from src or demo sits under r
f under src/composables/                  ⇒  consumer_units(f) ≥ 2  ∨  f is on an entry     (else f moves to its consumer)
every stylesheet reaches the cascade only through the generated region  (one CSS channel)
```

The counting unit in the second rule is open. It measures 11 by unit, 34 by declared family and 51 publicity-blind (D1-E Q1).

**What "global" means.** A file in `src/composables/` passes the counting rule above. The zone is library-wide as a whole. Its nested dirs cannot be private, because `motion/{core,spring,morph,…}` are reached by 16, 12 and 7 component files, so all 44 files of `motion/` form one flat visibility scope (D1-E weakness 11).

**Recursion.** Privacy by position applies at any depth under a component root.

**Long dirs.** A long dir is carved into a nested dir, which becomes private to its unit by position. The measured probe moved `src/composables/search/*` to `src/components/dock/composables/search/` and dropped its `unit.ts`. The family's pass-1 spec states no numeric bound and `units check` has no size rule. PORTFOLIO's shared proposal (12 files / 500 lines) is not part of this gate.

**CSS** (D1-E Q1, Q3).

- There is one channel: no SFC `<style src>`, no component `@import` outside the region, and no `src/styles` file importing from `src/components`.
- The single slot is derived from a static analysis of 1,336 rules, which found 60 order-dependent file pairs. The generated order keeps 58 of them. The 2 it inverts are weak pairs whose selectors cannot match one element.
- The only cross-zone conflict, `accent-tone.css → glass-chip.css`, becomes intra-unit once `glass-chip.css` moves into `chip/`.
- The one residual declared order is dock's `styles/index.css → styles/controls.css`, which is one manifest line.

**Demo routes are not generated.** The owner ruling `BI.W-P057` stands and its reasons still hold. Of the 80 rows (553 lines), only `cat` and `id` are derivable (D1-E Q3, Q4).

### E.2 Public-surface guarantee

**Guarantee.** The exports and `typesVersions` content regenerates exactly from the manifests. Key order becomes sorted.

**Evidence** (D1-E Q2, §3, §6):

| check | result |
|---|---|
| export keys | 68/68, 0 per-key target diffs |
| `typesVersions` | 62/62, 0 diffs |
| key order | HEAD's CURATED insertion order becomes sorted: a one-time 99-line reorder of `package.json`. Plain subpath keys carry no order semantics in Node |
| JS | 153 JS files in both builds; bytes 916,289 → 916,096 (−193, the dropped SFC CSS side-effect imports) |
| `glass-ui.css` | 42,374 → 22,424 bytes |
| `./styles` | the same rule set. The 12 former `<style src>` stylesheets now arrive through the slot, and 13 component CSS files are newly copied under `dist/components/**` |

**Measured changes the guarantee does not cover:**

- **`./styles.css` loses 19,950 bytes** of rules: checkbox, switch, radio-group, toggle-group, field control, disclosure, avatar, command, data-table, expandable-container, number-field and sortable-list.
  - A read-only sibling census found value.js importing both `./styles` and `./styles.css`; every other sibling imports `./styles`.
  - Keeping the payload would need `gen-component-styles.mjs:48` to take the former SFC set, which cannot be derived.
- **A fix.** The collapse removes the dev/dist divergence of the forced-colors `.field-control` focus restore.
- **The one-door rule hits 29 deliberate multi-door symbols:** `blob+blob-config` 20, `fourier-field+fourier-math` 8, `axes+surface` 1. Curing them is a content break, since value.js imports `BLOB_CONFIG_KEY` through both `./blob` and `./blob-config`.

### E.3 Gate contract

**Executable.** `node scripts/units.mjs check`. The prototype is 390 lines (323 code) and is kept as `$D1/D1-E/units.mjs.snapshot`. Its `write` subcommand regenerates the wiring. The check runs in 0.50 s and exits 1 on any violation.

**Input graph.**

| graph | built by | resolves | covers | used by |
|---|---|---|---|---|
| file-level edges over `src` and `demo` | the `SPEC` regex (`units.mjs.snapshot:161`) | `@glass/` and relative specifiers | value, type, CSS `@import`, `<style src>`, dynamic `import()` | visibility |
| symbol level | the TS-AST tracer, through re-export chains | — | — | multi-door, global-zone |

**Rules** (2.4).

| # | rule | fails on |
|---|---|---|
| 1 | unclaimed | a unit root without `unit.ts` |
| 2 | drift | `exports`, `typesVersions` or the `index.css` region differ from the generated copy |
| 3 | dual-channel | any SFC `<style src>`; any component `@import` outside the region; any `src/styles` file importing from `src/components` |
| 4 | visibility | an edge into a private nested dir from outside its unit root (`src` and `demo`) |
| 5 | multi-door | an origin declaration exposed by 2+ non-root entries |
| 6 | global-zone | a `src/composables` file with fewer than 2 consumer units, counted by symbol through barrels, and on no entry |

**The relative-path bypass does not arise.** Visibility is judged on the position of the resolved file.

- The 4 `src` breaches at HEAD are relative specifiers:
  - `participation.ts → dock/composables/dockContext.ts`
  - `useMetaballRenderer.ts → aurora/constants/budget.ts`
  - `Slider.vue → dock/composables/useDockHold.ts`
  - `useSelectionGroup.ts → tabs/composables/useTabRovingFocus.ts`
- The 7 `demo` breaches are `@glass/` alias specifiers.

**RED at HEAD** (measured, D1-E §4):

| run | result |
|---|---|
| no manifests | `units check: FAIL — unclaimed 75 · drift 3 · dual-channel 18 · visibility 11 · global-zone 51` (0.50 s). The unclaimed and drift rows are vacuous. Dual-channel and visibility bite without manifests, because they read position |
| manifests seeded, nothing moved | `FAIL — drift 3 · dual-channel 18 · visibility 11 · multi-door 40 · global-zone 11`. Drift is key order only. Visibility is 4 `src` + 7 `demo`. Multi-door equals L13's `dup.mjs` re-run, 40 |

**Mutations the gate must catch:**

| id | mutation | outcome | status |
|---|---|---|---|
| M-E1 | the search carve made the engine dock-private | visibility 11 → 14 (the 3 demo edges into it now breach), global-zone 11 → 8, exports drift 0 | measured |
| M-E2 | the prototype removed `<style src>` from 17 SFCs | exactly the 2 tests that pin that channel failed. Reintroducing any `<style src>` must fire rule 3 | the removal is measured; the reintroduction is specified |
| M-E3 | adding a second non-root entry that re-exports an existing origin | rule 5 | specified |

**Deltas between the contract and the pass-1 script:**

- `units.mjs.snapshot:170-172` skips any specifier that is neither `@glass/` nor relative, and keeps an edge only if it resolves (`if (to) edges.push`). An unresolved edge passes silently. The contract adds **rule 0: an unresolved `src` or `demo` specifier is a violation** (W §9 row 5).
- The `SPEC` regex (`:161`) has the `(?:import|export)\s[^'";]*?from` shape. That shape misses `dock/index.ts:58-67`, where a comment inside the export clause holds a `;` (D1-C Q1). The contract builds the visibility graph with the TS lexer the tracer already uses.

### E.4 Migration plan (ordered; measured on the prototype)

| # | step | measured cost |
|---|---|---|
| 1 | seed manifests (`seed.mjs`) | 75 files, 332 lines; 61 carry a field, 14 are `{}` |
| 2 | rewire and delete | 10 lines edited in 8 files: `vite.library.ts:1`; `vite.style-fold.ts:15,214,357`; `vite.style-assets.ts:65`; `flatten-subpath-types.mjs:13,112`; the import line of 2 gate tests; `tsconfig.build.json` excludes `src/**/unit.ts`. Delete `subpath-policy.mjs` (388) and `regen-exports.mjs` (210) |
| 3 | `units.mjs write` | `exports` and `typesVersions` reordered once (99 lines) |
| 4 | cascade collapse | cut 20 component `@import`s from `index.css` and 2 from `glass.css`; move `glass-chip.css` (143 lines) into `chip/`; remove `<style src>` from 17 SFCs; a 36-line region (34 imports + 2 markers). About 115 narration lines move into stylesheet headers. Re-seat 2 tests: `sortable-list/battery.test.ts:736` and the `orphan-css-partial` channel-2 self-test |
| 5 | floor rows | one door each for `useDockCtaReceive`, the aurora colour primitives and the three motion constants (clears 11 multi-door); `useScrollScene` → demo (clears 1 global-zone) |
| 6 | moves | the dock backdrop trio, the search engine (probed: 4 files, 11 specifiers), the flow shaders → aurora, `accent-tone-solve` with `useAccentTone` → chip. These clear 9 global-zone. The four L12-03 contracts clear 4 `src` visibility |
| 7 | decisions | `springProjection`; the 7 demo edges; the 29 deliberate multi-door symbols; the contents of `./styles.css` |
| 8 | gate wiring | a vitest or CI step; not built |

**Totals.**

| measure | value |
|---|---|
| lines, net | +121 overall; +466 counting code lines only |
| prototype typecheck | `vue-tsc` passes both projects |
| prototype build | exit 0, 63 declaration entries |
| prototype tests | 236 of 239 files pass (2,308 tests passed, 5 failed). The 3 failing files are `boot-graph` (environmental, as at baseline) and the 2 channel-pinning tests of step 4 |
| runtime | gate 0.5 s; build 25 s; typecheck 96 s; `vitest` 65-68 s, unchanged |
| colocation floor | about 100 files and 500 specifiers (PORTFOLIO §4), not re-measured |

### E.5 Backend

**glass-ui `scripts/`** (D1-E §7). A manifest field has nothing to hold here:

- a CLI's `bin` intent is already a shebang, on 6 files;
- npm names already live in `package.json` `scripts` (3 of 18 point into `scripts/`);
- tools publish no entries.

A tool manifest would restate the shebang, which P-3 forbids. So the backend treatment is the gate without manifests:

| rule | backend form | measured flags |
|---|---|---|
| unclaimed | a file with no importer, no shebang and no npm script | `lib/canon-doc.mjs`, `safari-probe.mjs` |
| visibility | by position, over X §6.1's `scripts/<family>/` dirs with a shared `lib/` | — |
| global-zone | a `scripts/lib/` helper with fewer than 2 consumer families | `paint-arm.mjs`, `gate-register.mjs`, `comment-census.mjs` |

**Carrying it to a sibling backend.** The published surface of a server is its HTTP routes, which the router already declares in code. Python's in-code manifest is `__init__.py` plus `__all__`. What carries over:

- **Bazel's private default by position:** a module may import `platform/`, not another module's repository layer.
- **Declared exceptions** as import-linter `protected` / `layers` contracts. Their default error on a stale ignore is the guard against the exception list rotting (W §8.1).

The manifest adds nothing a router or `__all__` does not already say.

### E.6 Open gaps (verbatim, D1-E §9)

1. The consumer-counting unit for the global-zone rule: units (11) or declared families (34). If families, where the family tag lives.
2. The 29 deliberate multi-door symbols: a `leaf-of` field, or cut one door with a value.js addendum.
3. What `./styles.css` contains after the channel collapse. Either it keeps the ex-SFC set (not derivable) or it is redefined.
4. Whether demo is held to visibility. There are 7 edges at HEAD and 3 more after the search carve.
5. Where the entry table lives: per-unit manifests or one central map. This is the family's only remaining difference from the §2.2 re-key.
6. A paint check (π) for the single cascade slot, covering the four moved early bands and the two weak inversions.
7. How the gate is wired (vitest or CI) and how it counts against E-8.
8. The tests slot (L13-11). The prototype exempts tests from visibility; a colocated `tests/` per unit would need its own rule.

---

## D1-F · Lifecycle capsules (the zone split dissolves)

### F.1 Placement law

**Inputs** (D1-F §1.1).

- **The capsule set.** 75 at HEAD:
  - 57 `src/components/<x>`, including `_shared`;
  - 10 `src/composables/<x>`;
  - the 5 `src/styles/<sub>` dirs, plus `src/styles` for its loose files;
  - the pseudo-roots `src/(root)`, `src/components/(root)` and `src/fonts`.
- **The capsule dependency closure** (`$D1/D1-F/srcgraph.mjs`). 478 capsule edges, built from:
  - 1,452 file import edges (TS, SFC, CSS `@import`, `<style src>`);
  - 2,776 **data edges**: CSS custom-property consumer → producer, and utility-class user → the `src/styles` file that defines the class.
- **C(a), the capsules an artifact references.**
  - Its import specifiers (`@glass/`, relative, `/src/` URLs) and root-relative path literals.
  - For a visual spec, the subjects of the stories behind its routes, taken from `goto` literals, `resolveScene(cat, id)` and `PI_TARGETS.x`, plus its own direct `src` references.

**Capsule** (strongest form, 7.1).

- A capsule is a directory with a door: `index.ts`; `index.css` for a styles capsule; the tool's own `.mjs` for a script.
- A sub-directory with its own door is a nested capsule.
- `src/` is the root capsule, with door `src/index.ts`.

**Closed suffix set** (7.2). Each suffix has one runner and one environment. No other lifecycle file shape may appear in `src`.

| suffix | runner and environment |
|---|---|
| `.test.ts` | vitest, happy-dom, white-box within its capsule |
| `.test-d.ts` | type tests |
| `.story.vue` | demo route. Basename = route id, globally unique (90 of 90 at HEAD) |
| `.tile.vue` | landing tile of the same-basename story |
| `.visual.ts` | Playwright, real browser |
| `.webkit.visual.ts` / `.touch.visual.ts` | Playwright project routed by suffix |
| `README.md` | the capsule's readme |

The two vitest files that launch Chromium become `.visual.ts`.

**Rule** (7.3, subject law):

```
subject(a) = the unique c ∈ C(a) with closure(c) ⊇ C(a)
  tie inside a dependency cycle (M02, M03) → the artifact's own path tokens
  no cover                                 → cross-cutting → harness
within subject(a): the deepest sub-capsule that holds all of a's in-capsule references
```

- **Stories are declared by location and checked by use.**
  - A story's subject is resolved in order: the capsule the story id names (exactly or as a plural); else an id token that the story also imports; else the category token, when that capsule is imported; else the closure cover.
  - A story must import its capsule's door. A `src/styles` story must reference that capsule's tokens.
- **An artifact with no subject is harness.** It goes to `tests/invariants/`, `tests-visual/invariants/` or `demo/compositions/`.

**Harness access** (7.5; §3 R1-R6).

- Artifacts reach the harness only through `#stage/*`, `#demo/*`, `#visual/*` and `#test/*`, declared once in `package.json` `imports`.
- The library's entry closure never contains a `#` specifier or a suffixed file.
- A relative path that escapes `src/` is banned.
- The shell wraps each routed story in StoryPage, which removes the story → StoryPage → manifest → story cycle.
- Family pages become data: a `"family"` metadata key, with FamilyTabs composing members by glob.
- Story-private helpers go to the LCA of their importers' new homes. In the carve, 14 of 23 landed in capsules and 9 in the stage.

**Global.**

- A composable that one capsule uses lives in that capsule.
- A composable that two or more capsules use gets its own capsule at their nearest common ancestor, with its own tests and story. That capsule is the edict's `composables/`.
- The C2 floor requires `_shared` to split into nearest-common-ancestor capsules, each with a door.

**Recursion.** Capsules nest through their doors. The subject law places each artifact in the deepest sub-capsule that covers its in-capsule references.

**Size bound and long dirs** (7.4).

- A capsule root holds at most N direct files. N is owner-ruled, like C5 in X.md §8.
- Past N, the capsule carves sub-capsules.
- A test that imports only the door carries no sub-capsule signal. It is named `<sub>.<name>.test.ts` and placed by that prefix.
- Measured pressure after the full carve:

  | measure | before | after |
  |---|---:|---:|
  | dirs with ≥ 10 direct files | 15 | 38 |
  | dirs with ≥ 20 direct files | 2 | 7 |
  | `dock` (16 visual, 15 test, 9 story/tile added) | 11 | 51 |
  | `aurora` | 4 | 36 |
  | `blob` | 7 | 31 |
  | `composables/motion` | 2 | 19 |

**Source predicate** (7.7). One shared `isSource(path)` (a path that is not a lifecycle suffix) lives in `tests/_support/`. Every tree scanner over `src` calls it.

**Router** (7.8). Metadata lives in `<story lang="json">` blocks (category, title, blurb, opts, family), globbed eagerly by block query. The same parser serves `resolveScene`. The category rows live in one harness file.

### F.2 Public-surface guarantee

**Guarantee.**

- JS is built from the entry map, as at HEAD.
- Declarations are built from the entry map plus the ambient `src/*.d.ts`: the build writes a temporary project with `files` = `Object.values(libraryEntryMap(root))` + `src/html-attributes.d.ts` and `include: []`.
- `tsconfig.build.json` loses both `include` and `exclude`. Nothing is excluded by name.

**Evidence** (D1-F Q2, §8, §11):

| check | result |
|---|---|
| export map | 68 → 68 keys, values identical (`JSON.stringify` equal); `typesVersions` unchanged |
| `npm pack` | 841 → **837** entries; **0** files matching `.story.vue\|.tile.vue\|.test.\|.test-d.\|.visual.\|demo/` |
| bytes | every JS, CSS and font file byte-identical |
| declarations dropped | 4 unreachable ones: `dist/components/_shared/index.d.ts`, `dist/components/index.d.ts`, `…/useScrollScene.d.ts`, `…/springProjection.d.ts` |
| declarations reprinted | 2. `Textarea.vue.d.ts` stops importing through the dead `components/index.d.ts` door; `MusicStaff.vue.d.ts` changes member order |

**The negative control.** HEAD's declaration config fails the build once a story lives in `src` (15 × TS6059). With that error cleared, it emits `button-glass.visual.d.ts`, `buttons.story.vue.d.ts` and `buttons.tile.vue.d.ts`.

`package.json` gains an `imports` field. It is published, but Node scopes `#` specifiers to the package's own files, and the targets do not ship. The alternative is harness aliases declared at 4 tool sites.

### F.3 Gate contract

**Executable.** `node $D1/D1-F/capsule-gate.mjs <root> [--scope <capsule>] [--pack <npm pack --json>]` (129 lines). Runs in 0.46 s.

**Input graph.**

- A regex scanner (`IMPORT`, `capsule-gate.mjs:39`) over `src`, `demo`, `tests`, `tests-visual` and `scripts`.
- `resolveSpec` (`:33-38`) resolves `@glass`, `@glass/…`, relative and `/src/` specifiers.
- Route literals (`goto`, `resolveScene`, `PI_TARGETS`) and path literals.
- The capsule closure with its data edges.

**Edges counted:**

- value and type imports (the regex does not tell them apart);
- dynamic `import()`;
- CSS `@import` (including `url()`) and `<style src>`;
- route edges, which map a visual spec to its subject;
- data edges, for the subject law.

**Clauses.**

| clause | invariant | status |
|---|---|---|
| C1 placement | every lifecycle artifact sits in its subject's capsule, with its suffix; an artifact with no subject sits in an `invariants/` harness dir or `demo/compositions/` | built |
| C2 door | no file imports another top-level capsule's non-door file | built |
| C3 purity | the pack holds no lifecycle artifact, and every packed `dist/**.d.ts` maps to a source in the entry map's import closure | built |
| R2 | no `#` specifier and no suffixed file in the entry closure; belongs on C3's entry-closure walk | required, not built |

**The relative-path bypass does not arise.** C2 judges the capsule of the resolved target file. At HEAD, the `src → _shared` (268) and `src → other` (202) reaches are relative specifiers. The harness rule also bans outright any relative path that escapes `src/`.

**RED at HEAD** (measured): `capsule-gate: RED (1352 violations)`.

| clause | count |
|---|---:|
| `C1_misplaced` | 402 |
| `C1_unsuffixed` | 260 (167 visual specs + 90 story pages + 3 `tests/*.spec.ts`) |
| `C1_crossNotInvariant` | 107 |
| `C2_privateReach` | 579 |
| `C3_pack` | 4 |

C2 by zone:

| from → to | reaches |
|---|---:|
| demo → `_shared` | 27 |
| demo → other | 41 |
| src → other | 202 |
| src → `_shared` | 268 |
| tests → `_shared` | 10 |
| tests → other | 29 |
| tests-visual → other | 2 |

**The gate on the probes:**

| tree | result |
|---|---|
| button capsule (`--scope src/components/button`) | HEAD 20 → probe 6. All 6 are C2: `Button.vue → _shared/{axes,class-names,primitive,feedback/DotRing.vue}` and `→ composables/motion/{core/asElement,spring/useLiquidPress}.ts` |
| full carve | 790: `C1_misplaced` 33, `C1_unsuffixed` 68, `C1_crossNotInvariant` 106, C2 583, **C3 0**. The re-derived law disagrees with 12 of the 408 moves |

**Mutations the gate must catch:**

| id | mutation | outcome | status |
|---|---|---|---|
| M-F1 | a story, tile and visual spec placed inside `src/components/button/`, built with HEAD's `src/**` declaration config | emits `button-glass.visual.d.ts`, `buttons.story.vue.d.ts` and `buttons.tile.vue.d.ts`. C3 must report every artifact declaration in the pack | the emission is measured |
| M-F2 | moving `aurora-swraster.spec.ts` to `src/components/aurora/aurora-swraster.visual.ts` | `[webkit]` instances fall from 13 to 10 with no error. **The gate as written does not catch this.** The contract removes the class instead: Playwright projects route by suffix (`*.webkit.visual.ts`), so no move can change a spec's project without renaming the file | measured |
| M-F3 | a library file importing `#stage/…` | R2 must fire | specified |

**Deltas between the contract and the pass-1 script:**

- `capsule-gate.mjs:38` returns `null` for an unresolved specifier, and `:41` `.filter(Boolean)` drops it. An unresolved edge passes silently, and `#` specifiers are not resolved at all (D1-F §9 says so). The contract adds **C0: an unresolved specifier is a violation**.
- The `IMPORT` regex (`:39`) has the `[^'";]*?` shape that misses `dock/index.ts:58-67` (D1-C Q1). D1-F's own production note is to reuse `scripts/import-dag.mjs`'s resolver.

### F.4 Migration plan (ordered)

| # | step | measured cost |
|---|---|---|
| 1 | entry-rooted declarations | about +15 lines in `vite.style-assets.ts`; `tsconfig.build.json` −2 keys. C3 goes to 0 |
| 2 | harness imports | `package.json` `imports` gets 4 keys; `allowImportingTsExtensions: true` (an extensionless `#visual/pi-manifest` failed in TS and Playwright) |
| 3 | source predicate | `isSource` in `tests/_support/`; cures the 15 scanner files |
| 4 | frame inversion (R3) | the shell wraps each story; `useStoryNavigation` reads route meta instead of the manifest. Not built |
| 5 | carve (`migrate.mjs`, `wire.py`) | 408 moved: tests 189, visual 112, stories 82, story helpers 23 (14 to capsules, 9 to the stage), fixtures 2. 316 specifier rewrites (276 to `#`, 40 relative) and 68 `import.meta.url` re-roots. 40 files that compute paths from `__dirname`/`cwd` and 16 literal paths were flagged |
| 6 | literal-path cures | 11 files, resolved through the story-id index or `import.meta.url` |
| 7 | re-home the rest | 106 cross-cutting artifacts into `invariants/` or `demo/compositions/` with suffixes; 21 non-`src` singles beside demo or their tool; declared subjects for 10 stories (token pages, family pages); 5 family pages become metadata |
| 8 | runner configs | vitest `include` +1; Playwright `testDir`/`testMatch` 2 lines; projects routed by suffix; the 2 Chromium vitest files become `.visual.ts`, which frees the CI `verify` job from `playwright install` (−23 s of 246 s) |
| 9 | router | `<story lang="json">` blocks: proven on 2 of 79 stories (276 chunks, boot-graph 14/14). The eager `export const story` form broke boot-graph (801,989 B against a 503,808 B ceiling) |
| 10 | one strict typecheck program | 85 errors in 39 files; one `@types/pngjs` devDependency clears 29 of them |
| 11 | sub-capsule design | for the 7 capsules left with ≥ 20 root files; not costed |
| 12 | C2 floor | 583 private reaches: split `_shared` into nearest-common-ancestor capsules with doors, and add composable subtree doors |

**Totals.**

- 535 path changes.
- Measured after step 5:

  | check | result |
  |---|---|
  | library build | green (6.9 s) |
  | demo build | green, 276 chunks |
  | routes | 80/80 resolve |
  | `playwright --list` | 1,986 / 167 files |
  | `vitest` | 2,164 pass, 50 fail in 27 files. 26 of those files were broken by the carve (11 path cases, 15 scanner cases) and 1 is environmental |

### F.5 Backend

**glass-ui `scripts/`** (D1-F §12).

- **Layout.** One capsule per tool: `scripts/<tool>/{<tool>.mjs, <tool>.test.ts, README.md}`. The build modules become `build/<plugin>/`.
- **Tool tests land beside their tool:**

  | tool | tests |
  |---|---|
  | `comment-census` | `gates/comment-ratio.test.ts` |
  | `profile-bundle` | `scripts/profile-bundle-value-js.test.ts` |
  | `regen-spring-tokens` | `springTokenMirror.test.ts` (straddles tool and tokens) |
  | `minify-css` + `vite.style-fold` | `minify-css.test.ts`, `backdrop-prefix-normalization.test.ts` |
  | `vite.utility-emit` | `emitted-utility-vars.test.ts` |
  | `gen-component-styles` | `typed-track-seam.test.ts` |
  | `import-dag` | `router-field-ownership.test.ts` |

- **Test support leaves `scripts/`:**
  - `gate-register.mjs` (739 lines; 8 importing tests in 4 zones) → `tests/_support/`;
  - `lib/paint-arm.mjs` (586 lines; 8 importing visual specs) → `tests-visual/_support/`.
- **`scripts/lib/`** keeps only helpers that two or more tools share: one walker (6 copies today), one repo root (8), one sha256 (4).
- **Deleted:** `canon-doc.mjs` and `safari-probe.mjs`. A capsule with no entry and no test has no subject.

**Carrying it to a sibling backend** (value.js `api/`, read-only).

- It is already capsule-shaped: `src/modules/<domain>/{routes.ts, service/, repository/, schema.ts, model.ts, __tests__/}`, with 30 capsule tests against 10 harness tests in `test/` and `test/conformance/`.
- The carry:
  - `__tests__/x.test.ts` flattens to `x.test.ts` beside its subject;
  - `test/conformance/` becomes the invariants harness;
  - the `tsconfig.json` exclude `src/**/__tests__/**` becomes an entry-rooted `"files": ["src/main.ts", "src/cron.ts"]`, and the exclusion disappears.
- **Python:** `test_*.py` beside the module in each domain package. A published package would need a `find` exclude.
- **Rust:** has the split natively, in-file `#[cfg(test)]` plus `tests/`.

### F.6 Open gaps (verbatim, D1-F §14)

- **Sub-capsule placement** for door-only artifacts, and the long-dir bound N, which is an owner ruling.
- **The subject clause for harness-primary artifacts**, and declared subjects for token pages. Includes a ruling on which `src/styles` capsule receives each foundations page.
- **Not built or run in the probe:** the `isSource` predicate module and the 26 file cures; the StoryPage inversion; the `family` metadata and FamilyTabs glob; converting `resolveScene`/`pi-manifest` to `<story>` blocks. Custom-block metadata was proven on 2 of 79 stories only.
- **The visual suite was only discovered, not executed** (no server started). The 1,024 moved instances are unproven at runtime.
- **The two Chromium-launching vitest files** were not converted to `.visual.ts`.
- **C2 floor:** the `_shared` split and composable subtree doors are shared with the portfolio floor. Not costed here beyond the count.
- **Owner rulings:** `package.json` `imports` vs 4 alias sites; tests and visual specs under full `src` strictness vs a split program.
- **Gate scanner:** a production form should reuse `scripts/import-dag.mjs`'s resolver and resolve `#` specifiers. R2 (no `#` specifier or suffixed file in the entry closure) is not yet a clause; it belongs on the C3 entry-closure walk.

---

## Shared facts (every family inherits these)

1. **Resolver privacy covers bare specifiers only.** A relative reach into another package's internals passes all three tools, measured on `W/ws-probe` (W §2.3) and reproduced as D1-C P3:

   | tool | result |
   |---|---|
   | Node 26.0.0 | runs |
   | tsc 6.0.3 (`moduleResolution: bundler`) | typechecks |
   | Vite 8.1.5 | builds |

   TS project references also give a referencing project access to every file of the referenced one (W §2.3). An undeclared workspace import that closes a package cycle compiles with 0 errors (D1-C P2). So every gate judges the resolved file, never the specifier form. D1-C is the one family that needs a clause naming the relative form (C2).
2. **Unresolved edges pass silently unless the gate fails on them.** dependency-cruiser left 399 specifiers `couldNotResolve` at HEAD until `.vue` was added to its extensions, and its rules passed over them (W §1.3; W §9 row 5).

   | fail on an unresolved edge | cite |
   |---|---|
   | D1-C | `gate-packages.mjs:72` |
   | D1-D | `gate.mjs:29` |

   | drop an unresolved edge silently (this seat's reading) | cite |
   |---|---|
   | D1-A | `lib/graph.mjs:174` |
   | D1-B | `door-gate.mjs:33` |
   | D1-E | `units.mjs.snapshot:170-172` |
   | D1-F | `capsule-gate.mjs:38,41` |
3. **SFC resolution and import lexing have to be configured.** Extensionless `.vue` imports need an extension list (W §1.3). A regex lexer of the shape `(?:import|export)\s[^'";]*?from` misses `dock/index.ts:58-67`, where a comment inside the export clause holds a `;`. `ts.preProcessFile` does not (D1-C Q1).

   | lexer | used by |
   |---|---|
   | the regex shape above | PORTFOLIO's `graph.mjs`, D1-E's visibility graph, D1-F's scanner |
   | the TypeScript parser | D1-A, D1-B, D1-D |

   A regex rewriter also mangled imports next to comments in 3 demo files (D1-B Q5).
4. **The CSS channel duality.**
   - `src/styles/index.css` has 36 `@import` lines and none uses `layer()`. 17 SFCs load CSS through `<style src>`. 0 files use `@reference` (W §7).
   - The two channels diverge between dev and dist on the forced-colors `.field-control:focus-visible` outline restore (`a11y-overrides.css:133`): it wins in dist and loses in the demo's dev server (D1-E Q3).
   - Vite's injection order for JS-imported CSS is an open upstream issue (vitejs/vite#3924, #21903; W §7).
5. **Cascade-order changes pass the unit suite.** Four moves reordered the published cascade:

   | seat | move | effect | caught by |
   |---|---|---|---|
   | D1-D weakness 5 | the accent-tone `@import` move | chip band strength 22% → 18% | only the flattened-cascade hash; `vitest` 2,310 green |
   | D1-C Q3 | the full carve | the literal `./accessibility.css` anchor in `vite.style-fold.ts:89-92` stops matching, so the a11y rules move earlier | nothing; the gates passed |
   | D1-B Q3 | the overlay CSS door | 76 rules reordered | — |
   | D1-E Q3 | the single slot | 58 of 60 order-dependent pairs kept; 2 weak pairs inverted | — |

   None of the four was paint-verified.
6. **Placement is decoupled from the public surface.** Every prototype reproduced the 68 export keys:

   | seat | result |
   |---|---|
   | D1-A | `regen` EXACT; 63 doors × 1,277 names |
   | D1-B | byte-identical `exports` (overlay) |
   | D1-C | 68/68; 1,279 declaration and 603 runtime symbols |
   | D1-D | `EXACT_REPRODUCTION: true` |
   | D1-E | 68/68 content, sorted order |
   | D1-F | 68 → 68; pack 841 → 837 |

   The precondition is an entry map keyed `name → path` (PORTFOLIO §2.1). D1-D could not build its zone rename without that re-key, and atlas already runs one (X §2.6).
7. **Moves break couplings the import graph cannot see:**

   | coupling | measured |
   |---|---|
   | hand-built `import.meta.glob` keys | 2 sites, 1 failing silently (D1-A §9) |
   | `vi.mock` strings | 2 broke (D1-A); 1 hoisting error (D1-C) |
   | Tailwind `@source` scopes | `picker-lane` G1 (D1-A); 48 utilities silently absent (D1-C Q1) |
   | `new URL(…, import.meta.url)` | D1-A; 68 re-roots (D1-F) |
   | literal `src/…` strings | 218 (PORTFOLIO §1); 430 in 87 files (D1-C); 271 plus residue (D1-D) |
   | location-derived repo roots | 8 (X §3.1); they broke in D1-C §7 |
   | scanners walking `src` | 6 (D1-B); 23 (D1-C); 15 (D1-F) |
   | runner projects listed by filename | WebKit 13 → 10, silently (D1-F Q5) |
   | closed-record rosters | `gate-register` 4 red (D1-B) |
   | production Vue scope ids, which hash path and source | D1-A, D1-C, D1-D |

8. **M02 and M03 have small exact cuts** (D1-C Q4). The minimum feedback arc set:

   | knot | value edges to cut |
   |---|---|
   | M02 | `_shared/overlay/participation.ts → dock/composables/dockContext.ts`; `motion/morph/useSelectionGroup.ts → tabs/composables/useTabRovingFocus.ts` |
   | M03 | `sheet/SheetContent.vue → dialog/ModalOverlay.vue` |

   - A module-scope cycle tool misses both knots; a folder-scope tool finds them (W §1.3).
   - Type-only 2-cycles survive every family's cuts: `_shared/interaction ↔ _shared/selection` (D1-C Q4) and `_shared/useMotionAxis ↔ composables/motion` (D1-B Q4).
   - At file grain, `Alert.vue:4` and `Badge.vue:3` import their own doors (W §1.3).
9. **Counts depend on the counting unit, and one definition is still owed** (W §11 Q1).

   | quantity | counts |
   |---|---|
   | deep reaches | 255 module edges (dependency-cruiser, W §1.3); 268 edges (PORTFOLIO §1); 379 R1 specifiers (D1-B) |
   | single-owner composables | 31 (dependency-cruiser modules); 32 (L13 OWNED); 12 (D1-A moves under the door reading); 9 (D1-D owned files); 11 / 34 / 51 (D1-E by unit / declared family / publicity-blind) |

10. **No off-the-shelf JavaScript tool fits, and glass-ui has no ESLint host.** None implements a recursive seal or subtree acyclicity over SFC and CSS edges (W §1, §11 Q3-Q4; D1-B Q6). Every gate is custom:

    | family | size (scratch line counts) | runtime |
    |---|---|---|
    | A | 84 + 180 lines | 2.9 s |
    | B | 64 + 110 | — |
    | C | 114 | — |
    | D | 91 | < 1 s |
    | E | 390 | 0.5 s |
    | F | 129 | 0.46 s |

11. **The import graph does not name features.** The connected-components carve returns one component per unit. File-stem names recover 5 of dock's 7 features. Aurora's two renderer backends and sortable-list's drag engine share no stem token (D1-A Q5). Every long-dir carve needs authored names.
12. **Churn is measured.**
    - Over the last 200 `src` commits, 18 (9%) change a home under D1-A's law. It oscillates: `motion/core/constants.ts` flips 3 times (D1-A Q2).
    - Over 703 commits there are 37 component ↔ composition flips across 27 dirs (D1-D Q2).
13. **npm and the siblings.**
    - npm 11.12.1 rejects `workspace:*` with `EUNSUPPORTEDPROTOCOL`, while `"*"` resolves to the symlinked workspace (W §5).
    - No live sibling links glass-ui by `file:` (D1-C Q5).
    - All 1,356 sibling bindings go through `@mkbabb/glass-ui/*` subpaths (D1-A §7).
14. **Dist purity is entry reachability plus the scope of declaration emit.**
    - `files` is `["dist", "MIGRATION.md"]` (W §6).
    - Declaration emit over `src/**` fails with TS6059 once a story imports the demo, and otherwise emits `.d.ts` files for the artifacts.
    - Rooting declarations at the entry map removes `include`/`exclude` and drops 4 unreachable `.d.ts` files (D1-F Q2).
15. **Kind-named dirs.**
    - The edict prescribes `composables/`.
    - Steiger's `segments-by-purpose` bans `composables` and `constants` (W §3.1).
    - keyframes.js's R5 bans them, and would red 13 glass-ui dirs (X §3.4, C1).
    - 55 nested `composables/` dirs exist across 7 repos (X H1).
16. **The bounds have no measured basis.**
    - Mature libraries keep flat dirs of 59-124 files; Steiger's 20 is "set to 20 arbitrarily" (W §9 row 14).
    - The house floor is 500 lines, gated in keyframes.js; value.js uses 400 (X H6, C5).
    - Files over 500 lines at HEAD: src 17, tests 19, demo 8, scripts 7, tests-visual 6 (PORTFOLIO §1).
17. **Tests.**
    - The two prior runs of the edict ruled in opposite directions: "Tests stay in their own dir" (keyframes OD-U7) against colocated `__tests__/` (value.js Q17) (X C2).
    - `tests/components/` holds two namespaces that no longer exist in `src`: `custom/` (50 files) and `ui/` (13) (X §3.2).
    - `tests-visual` has 167 flat specs that drive routes and have no import subject (X §3.3; D1-A weakness 12).
18. **The backend analogue.** glass-ui's `scripts/` plays three roles (build library, test helper, CLI) and holds one dead module. It repeats three helpers (6 walkers, 8 repo roots, 4 sha256), and 7 of its files exceed 500 lines (X §3.1).

    | fact | families that reach it |
    |---|---|
    | `canon-doc.mjs` is dead | D1-A, D1-D, D1-E, D1-F |
    | `paint-arm.mjs` belongs with `tests-visual` | D1-A, D1-C, D1-D, D1-F (D1-B keeps it as a `scripts` domain) |

    A composition root (value.js `app.ts`, speedtest `wire-services.ts`) defeats importer-driven placement (D1-A §13).
19. **Every prototype had the same baseline noise.**
    - The `boot-graph` trio fails in any fresh worktree without `dist-demo`.
    - Timeouts appeared under load averages of 33-147 from other sessions (D1-A §9; D1-C header; D1-D §8; D1-E §3).
