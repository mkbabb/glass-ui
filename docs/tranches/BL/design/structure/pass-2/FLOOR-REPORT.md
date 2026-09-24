# D1 · pass 2 · FLOOR-REPORT: the shared floor, built once

| field | value |
|---|---|
| seat | D1 pass-2 floor. Builds the shared floor once, as durable tooling under `../floor/` (manual: `../floor/FLOOR.md`), and proves each tool on HEAD. Picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the checkout moved `0a2d8bd8` → `5dd68ca9` → `9e1c8f11` → `35d3061e` during the run, docs only. `git diff 7362b3bf 35d3061e -- . ':!docs'` is 0 lines, so every number below measures the code pass 1 measured |
| worktree | `…/scratchpad/D1/p2/floor/wt`, re-created from HEAD for each tree state (remove and add; no reset, checkout or restore), `node_modules` and `tests-visual/node_modules` linked, removed before return |
| inputs, read in full | `REGISTRY.md`, `RULINGS.md`, `CHARTER.md` (the edict, last four paragraphs) |
| instruments | the floor itself; `vite build`, `vue-tsc` on both programs, `vitest`, `npm run demo:dist:build`. Independent witnesses: `scripts/import-dag.mjs` for SCCs, and a `git ls-files -co` sha256 digest for trees |
| provenance | this seat's first run (`wf_5e169fa4`) died in a network outage after writing about 2,400 lines of floor code to scratch. This run read all of it, kept its design, found and fixed 19 defects by running it (§3), and re-measured everything. No number from the dead run is cited |
| writes | `../floor/` (30 files, copied from the scratch source with `rsync` and compared by a sha256 manifest, identical) and this report |

---

## 0 · In brief

- **Every floor item the task names is built and green on HEAD.** The graph reads 7,171 edges with 0 violations, catches 59 of 59 plants, and agrees with `import-dag` on every SCC. The entry record regenerates `exports` and `typesVersions` byte-equal, and re-derives byte-identical from HEAD's own policy. The surface pin reads 68 keys, 62 `typesVersions`, 603 runtime and 1,279 declaration names, and re-pins byte-identical. All four floor gates pass under `npm test`.
- **The move engine replays byte-identically, and a rerun is a no-op.** On the 20-move sample: 72 rewrites in 41 files, 0 residue, an edge image of 7,171 → 7,171, and the same tree digest from two fresh worktrees.
- **The cascade verifier reads RED on a planted reorder and GREEN on a pure move.** It also reproduces S-2 by running: on HEAD's code, moving `accessibility.css` leaves the build, both typecheck programs and all 239 test files green, and only the verifier sees that the a11y block is no longer terminal. With the F-4 row, the same move reads GREEN.
- **The harvested code was not fail-closed.** Nine of the 19 defects were reference forms it could not see, among them const-anchored templates, literal joins, nested read helpers, paths quoted inside strings, base-relative paths and a Tailwind `@import … source()`. One was a masking fallback that read a missing scan base as the repo root. One let a failed move run leave a written tree that a rerun then called "already applied". Each is closed, and each is planted (§3).
- **R-2 as written moves six published components into another component** (§4.2). That is a measured ruling tension for the driver, not a floor defect.

---

## 1 · What was built

| item | where | what it does |
|---|---|---|
| F-1 graph | `lib/{tree,resolve,evaluate,scan,graph}.mjs`, `graph.mjs` | One graph over `src`, `demo`, `tests`, `tests-visual`, `scripts`, the root configs and the floor records: TS by full AST, SFCs by `@vue/compiler-sfc`, CSS by postcss, JSON, shell and HTML by tokenizer. Verdicts are on the resolved file. It fails closed on every S-4 kind: self-name, globs, `new URL`, CSS `@import`/`@source`/`@reference`/`url()`, inline `<style>` and template `style` `url()`, `.json`/`.cjs`/`.sh` reads, `export * as`, non-literal `import()`/`require()`, alias specifiers (read from every tsconfig and vite config, conflicts flagged). Plus the forms found while building it (§3). Unresolvable-by-design references live in a 23-row ledger with reasons; a stale row fails |
| F-2 move engine | `lib/move.mjs`, `move.mjs` | Preflight writes nothing: a clean graph, a consistent plan, 0 residue, and every scan delta declared exactly or per scanner. Then write, then an image check: the new graph must equal the old under the move map, and a failure rolls back byte for byte. Idempotent. Refuses the main checkout |
| F-3 entry record | `records/entry-record.json`, `lib/entries.mjs`, `entries.mjs`, row `f3-entry-record` | `name → source` in published order, CSS keys, doors, `cascade.terminal`. `exports` and `typesVersions` are emitted from it. The build-time guard throws on an undeclared `index.ts` at any depth (HEAD: first-level dirs only), a missing or duplicated source, a stale door or a missing terminal. The row points 7 readers at the record and deletes `subpath-policy.mjs` and `regen-exports.mjs` |
| F-4 cascade contract | row `f4-terminal-role`, `cascade.mjs` | The declared terminal replaces `terminalImportIndex`'s path regex and its `@source` fallback (`vite.style-fold.ts:89-92`), resolved by file; a miss or a non-last terminal stops the build. `contract` is the source half. `snapshot` and `verify` form the move-only verifier over the four CSS entries, against a baseline named by SHA, and classify a divergence as `reorder` or `content` |
| F-7 placement | `lib/{symbols,placement}.mjs`, `placement.mjs` | The rule as a function of `(graph, units)`: readers are counted by symbol through barrels, forwarding is not reading, a door is not a reader (R-2), and only loads count (a Tailwind `@source` scan is not a read). One reader unit means that unit; several mean their nearest common ancestor, or the global zone at a zone root. Targets that two files claim or that already exist print as `NEEDS-NAME` and are never emitted |
| S-8 / F-8 | rows `m02-overlay-host`, `m03-roving-move.json` | M02 is inverted: `participation.ts` owns `OverlayHost`, `DockHoldKind` and a kernel context key, dock provides it, and `dockContext.ts` stays in dock. M03 moves `useTabRovingFocus.ts` to `motion/morph/` through the engine |
| anti-vacuity | `records/surface-pin.json`, `surface.mjs`, `plants/graph-plants.mjs`, `gates.mjs`, row `f9-wire` | The door/surface pin; 59 graph plants; the four gates, run under `npm test` by `tests/gates/floor.test.ts` |
| rows driver | `rows/apply.mjs`, `rows/lib.mjs` | Applies the five rows in order, fail-fast. Each row is all-or-nothing: an edit names its exact text, and one match is required |
| R-5 measure | `bounds.mjs` | Dirs over 12 direct files, sources over 500 lines. A measurement: HEAD is over both, so it is not wired |

Size: 30 files, 3,162 lines of `.mjs`.

---

## 2 · Proofs on HEAD

### 2.1 F-1: the graph

At HEAD it parses 1,315 files out of 12,350 in the tree and reads 7,171 edges, 4,815 of them to files, with **0 violations**, in 2.5 s. It finds one alias, `@glass` → `src`, from 4 planes.

| kind | edges | kind | edges | kind | edges |
|---|---:|---|---:|---|---:|
| import | 3,444 | path-helper | 216 | base-relative | 19 |
| path-literal | 582 | css-import | 124 | json-command | 18 |
| import-type | 553 | glob | 98 | sfc-style-src | 17 |
| css-source | 475 | reexport-star | 82 | vi-mock | 17 |
| reexport | 382 | dynamic | 69 | template-path | 16 |
| write | 336 | helper-base | 66 | new-url, embedded-path | 11 each |
| json-ref | 302 | import-type-node | 30 | css-url, absence | 8 each |
| glob-literal | 242 | scan | 26 | json-glob 6, require 5, import-side-effect 4, html-ref 2, specifier-literal 1, quoted-relative 1 | |

By resolution: relative 2,002, package 1,438, glob 814, alias 798, anchored 655, root-relative 508, builtin 471, write 184, file-relative 154, scan 39, ledger 24, root-absolute 23, based 19, embedded 12, new-url 11, absence 8, self-name 6, generated 5.

**Census, counted and not judged: 453.** It breaks down as fs reads with a computed argument 238, read-helper calls with a computed argument 167, unverified relative strings 16, package mentions 11, bare paths resolving nowhere 11, and quoted paths resolving nowhere 10.

**Ledger: 23 rows** (15 fixture, 5 empty-glob, 2 opaque, 1 stale), all matched: a row that matches nothing is a violation. Of the empty globs, 3 are `tsconfig.build.json` excludes for tests colocated under `src/`, which go live once R-3 colocates tests, and 2 are `vitest.config.ts` includes that match no file.

**Plants: 59 of 59 caught**, from a baseline of 0 violations, in 163 s wall on a fresh `35d3061e` worktree.
- **35 transcribed from the pass-1 critiques whose builders missed them.** Self-name (C01, C01b); globs (C02, C03); `new URL` (C04, X6, C-9a); `@source` (C06); alias (X2a, X2b, F-1.g); non-literal `import()`/`require()` (X5, K-9, C-8, F-1.a, F-1.b); `@reference` (X7); `.cjs` (X15, K-16); path literals (K-10, C-9b, F-1.e, F-1.f); inline `<style>@import` (K-11a, K-11b, E-C-2); `.json` (K-14); `.sh` (K-15); `export * as` (C-14); `vi.mock` (F-1.c); `url()` (F-1.d); read helpers (F-1.i, F-1.j); absence (F-1.k); ledger (F-1.h).
- **24 written by this seat** for the forms in §3 (P-01..P-22, P-12b, P-15b). They are not an independent battery (F-9).

**SCCs, against `import-dag.mjs`.** At HEAD both read three value module SCCs: the demo 15, M02's 7 (`_shared`, `dock`, `menu`, `select`, `tabs`, `glass`, `motion`) and `dialog ↔ sheet`. On the floor-rows tree both read two: the 7 is gone, while the demo 15 and `dialog ↔ sheet` (import-dag's label M03) remain. The file-level value SCCs in `src` are 2 at both (`Alert.vue ↔ alert/index.ts`, `Badge.vue ↔ badge/index.ts`).

### 2.2 F-2: the move engine on the 20-move sample

The sample (`samples/move-sample-20.json`) is 18 colocations that F-7 proposes at HEAD (each matched by a fresh `placement.mjs` run) plus 2 stylesheet moves: the S-2 terminal `accessibility.css` → `styles/modes/`, and `card/scroll.css`, which the `./styles` aggregator imports.

| run | result |
|---|---|
| A, fresh HEAD | ok. 72 rewrites in 41 files, 1 dir moved. By kind: import 37, reexport 12, reexport-star 6, css-import 5, path-helper 5, import-type 2, path-literal 2, json-ref 1, sfc-style-src 1, vi-mock 1. Residue 0. 115 scan deltas, all covered by 9 scanner declarations. Image 7,171 → 7,171, 0 lost, 0 gained, 0 violations. 8.5 s |
| A, rerun | pending 0, already applied 20, 0 rewrites, same digest `d85ea2bb8b76…` |
| B, a second fresh HEAD | the same report and the same floor digest `d85ea2bb8b76…`. Independent digest `14194d7bfb41…` over 12,349 files, identical to A's; `git status` identical (73 lines) |
| A's tree, HEAD code | build exit 0; `vue-tsc` on both programs exit 0; demo build exit 0; vitest 239/239 files, 2,313 passed, 10 expected-fail, 1 skipped. **Cascade RED** (§2.3) |
| C, floor rows then the same 20 | ok. 72 rewrites in 41 files, 102 scan deltas all declared. (The `subpath-policy` declaration is dropped because row F-3 deletes that scanner, and a stale declaration refuses the run.) Build 0; **cascade GREEN**; entries exact; surface 0 differences; `vue-tsc` ×2 exit 0; demo build 0; vitest 240/240 files, 2,317 passed, 10 expected-fail, 1 skipped. The engine also rewrote the record's `cascade.terminal` to `src/styles/modes/accessibility.css` |

Refusal and rollback:
- **A relocation inside a scanned base is refused before any write.** The set with `dock/styles/controls.css` → `dock/styles/controls/controls.css` reports 22 undeclared scan deltas and writes 0 files. The harvested engine had applied that same move. It then broke `g-dock-lattice` (its `/controls/` count assertion) and `feedback-motion` (an `@import` path quoted in a string), silently.
- **A move that changes a glob's match set is rolled back.** `demo/chassis/code/Code.vue` → `demo/stories/zzplant/Code.vue` passes preflight, then fails the image check with 1 gained edge: the story manifest's `./*/*.vue` glob picks up a new member. The tree is rolled back, and the independent digest and `git status` are identical before and after.

### 2.3 F-4: the cascade

- **The baseline**, from HEAD's own build and named by SHA: `./styles` 1,964 leaf rules, `./styles/fonts` 4, `./styles/theme` 4, `./styles.css` 365. The contract holds: 36 `@import`s, the last is `accessibility.css`, and it has one importer.
- **RED on a planted reorder.** Swapping the `button/styles.css` and `configurator/styles.css` imports gives build exit 0 and contract PASS, but `verify` RED with class `reorder`: 1,964 = 1,964 rules, nothing unique to either side, first divergence at rule 878. On that tree vitest fails once, on boot-graph's `dist-demo` staleness check; nothing in the suite sees the reorder.
- **GREEN on a pure move.** `card/scroll.css`, `_shared/feedback/dot-ring.css` and `_shared/feedback/feedback-tone.css` each move into their unit's `styles/`: 8 rewrites in 3 files, 21 scan deltas declared. Build 0, `verify` GREEN with 4/4 entries identical. With the demo built, vitest reads 239/239 files and 2,313 passed. By kind the 8 rewrites are css-import 3, path-literal 2, base-relative 2 and embedded-path 1. The harvested engine could see neither the base-relative nor the embedded kind. A rerun proposes 0 moves.
- **S-2 reproduced, then cured.** On HEAD's code (tree A), `terminalImportIndex`'s regex misses `./modes/accessibility.css`, the fallback anchors at `@source`, and `../glass-ui.css` and `./components.css` fold in after the a11y block. `verify` reads RED at rule 1,272: an `.aurora-root` SFC rule against a11y's reduced-transparency rule. Every other check is green. With row F-4 (tree C), the fold resolves the declared terminal by file and the same move reads GREEN, with the a11y import last in dist.

### 2.4 F-3: the entry record

- **Exact.** 63 JS entries give 68 export keys and 62 `typesVersions`, both byte-equal to `package.json`; 14 declared doors.
- **Re-derives from HEAD's policy.** `entries.mjs derive` over HEAD's `subpath-policy.mjs` writes a record byte-identical to `records/entry-record.json`.
- **Gate plants on the floor-rows tree**, each applied, judged and reverted by content:

| plant | result |
|---|---|
| undeclared `src/components/zz-plant/index.ts` | `entries check` FAIL (`undeclared-door`); `vite build` exit 1 |
| `./badge` removed from `package.json` exports | FAIL, exports not byte-equal |
| an `@import` after the terminal | contract FAIL; `vite build` exit 1 (style-fold throws) |
| the terminal import removed | contract FAIL; `vite build` exit 1 |
| `zzPlantedName` added to the `./badge` door | surface pin FAIL, 2 differences (runtime +1, types +1); gate F-9 FAIL |
| all restored | 4/4 gates PASS |

### 2.5 The surface pin and `npm test`

- **The pin re-derives.** `surface.mjs pin` from this seat's HEAD build is byte-identical to the record (sha256 `1ff15a3d58b4…`): 68 keys, 62 `typesVersions`, 63 JS entries, 603 runtime and 1,279 declaration names.
- **A dist that cannot import now throws.** The harvested reader recorded `<import failed>` as a name. Run against a dist copied outside the repo, it reported 632 phantom differences and 89 runtime names.
- **The floor-rows tree at the final code.** Graph 7,138 edges, 0 violations; build 0; `gates.mjs` 4/4 PASS; cascade GREEN.
- **The earlier floor-rows build.** `vue-tsc` ×2 exit 0; vitest 240 files, where the only failures were boot-graph's three build-arm tests with no `dist-demo` (S-17), and with the demo built boot-graph reads 14/14 and the floor gates 4/4. Dist differs from HEAD's in 42 entries, which is the M02/M03 code, including a new `dockContext` chunk.
- **The baseline it compares to.** At HEAD with `dist` built, vitest reads 239 files and 2,324 tests: 2,310 passed, the same 3 boot-graph failures, 10 expected-fail, 1 skipped. With the demo built, boot-graph reads 14/14. The rows add 1 file, 4 tests and 0 failures.

---

## 3 · Defects found in the harvested code, each closed and planted

| # | defect | measured at HEAD | cure | plant |
|---|---|---|---|---|
| 1 | template literals with a static repo head were no edge at all | 16 `template-path` edges | `template-path`: a scanner over the head's dir, which must exist | P-12b, P-15b |
| 2 | const-anchored templates (`${DOCK}/composables/x.ts`) and literal joins (`join("src", …, "x.ts")`) resolved only to their first segment | 22 sites in `g-dock-lattice`; `spring-authority`, `token-hygiene` | a composite edge anchored at the root, rewritable segment by segment | P-09, P-10, P-22 |
| 3 | the scan resolver fell back to `dirname`, so a dead dir read as its parent | `boot-graph.test.ts:584` resolved to the repo root | a segment-boundary prefix must exist exactly | P-21 |
| 4 | a helper that calls a helper (`readStyle` → `read`) was invisible | +46 `path-helper` edges | composed prefixes | P-16 |
| 5 | string-prefix helpers (`${DIR}/${rel}`) were not helpers | — | recognised when the prefix is zone-rooted | P-12, P-15 |
| 6 | a helper's own body registered as a scanner of its prefix | `scan` edges 67 → 26, with #3 | a `helper-base` marker; a helper over a missing dir is a violation | P-11, P-12 |
| 7 | paths quoted inside strings (`'@import "./glass/x.css";'`) | 11 edges | `embedded-path`, anchored at the read file whose text carries it | P-17, P-20 |
| 8 | bare paths relative to a scanned dir or a read file | 19 edges | `base-relative`, anchored at that dir or file | P-18 |
| 9 | alias-shaped expected specifiers and quoted relative expectations in tests | 2 edges | `specifier-literal`, `quoted-relative` | P-19 |
| 10 | Tailwind `@import "tailwindcss" source("../demo")` | +184 `css-source` edges | a source edge | P-13 |
| 11 | alias patterns in `import.meta.glob`; `sep` from `node:path` | — | resolved | P-08, P-22 |
| 12 | placement counted a Tailwind `@source` scan as a read | — | a whitelist of load kinds | — |
| 13 | placement emitted 4 files onto one target and silently dropped a proposal whose target exists | 5 at HEAD | `NEEDS-NAME`, never emitted | — |
| 14 | the surface reader recorded an import failure as a name | 632 phantom differences | throws | — |
| 15 | a refused move run had already written; a rerun then passed as "already applied" | — | preflight before any write; rollback on image failure | rollback plant |
| 16 | a scan delta counted only files that left a base | 2 tests broken silently | any change of base-relative path is a delta; exact or per-scanner declarations; a stale declaration refuses | refusal case |
| 17 | row F-3 added an `@ts-ignore` that nothing needs (root vite configs are in no typecheck program) | — | dropped | — |
| 18 | `gates.mjs` built the graph twice | — | the contract reuses it | — |
| 19 | rows had no driver, so each route would reorder them by hand | — | `rows/apply.mjs` | — |

Net at HEAD: edges went from 6,880 (harvested) to 7,171 and the census from 382 to 453, with 0 violations both before and after.

---

## 4 · Measurements the routes inherit

### 4.1 F-7 at HEAD and on the floor-rows tree

| tree | src files | ok | published | move | global | unread | proposed moves | NEEDS-NAME |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| HEAD | 545 | 309 | 181 | 39 | 14 | 2 | 48 | 5 |
| floor rows | 545 | 311 | 181 | 39 | 12 | 2 | 46 | 5 |

The two cells that change are M02 and M03. `dockContext.ts` is `global` at HEAD (read by `_shared/overlay` and `dock`) and `ok` after the inversion (read by dock alone), so it stays in dock, as S-8 requires. `useTabRovingFocus.ts` is `ok` at `motion/morph/`.

NEEDS-NAME (S-7): `deck/types.ts`, `input/types.ts`, `slider/types.ts` and `tabs/types.ts` all claim `src/composables/types.ts`, and `glass/webgl/shaders/flow.glsl.ts` claims a path that already exists in aurora.

### 4.2 A ruling tension: R-2 moves six published components into another

Under R-2 a door is not a reader. F-7 therefore gives six published component roots to their one in-library reader:

| file | its own entry | proposed home |
|---|---|---|
| `dialog/Dialog.vue` | `./dialog` | `command/` |
| `expandable-container/ExpandableContainer.vue` | `./expandable-container` | `configurator/` |
| `fading-scroll/FadingScroll.vue` | `./fading-scroll` | `configurator/` |
| `input/Input.vue` | `./input` | `labeled-field/` |
| `surface/Surface.vue` | `./surface` | `card/` |
| `switch/Switch.vue` | `./switch` | `labeled-field/` |

Each is its unit's eponymous root. The move would leave its door re-exporting from another component's dir. That reads the edict backwards: a published component is not another component's sub-component. The internal cases (the `table/` primitives → `data-table/`, `skeleton` → `data-table/`) do read as the edict intends. A candidate for the driver, not built: a unit's root, the file its door exports its component from, is never placed by readers but defines the unit. That is D1-G's naming law, and F-7 can take the root set as a parameter beside the unit set. Per RULINGS, this is reported with measurements rather than worked around.

### 4.3 R-8 readers at HEAD

| file | readers | reading |
|---|---|---|
| `src/composables/motion/spring/springProjection.ts` | 4, none in `src`: `demo/stories/motion/springs.vue:14`, `scripts/regen-spring-tokens.mjs:27`, `tests/composables/motion/springProjection.test.ts:5`, `tests/demo/springs-story.test.ts:6` | not on any entry, so placement class `unread` in `src`. The demo edge is also past a door (R-10) |
| `scripts/safari-probe.mjs` | 0 in the tree (named only in docs records) | E-7 delete |
| `tests-visual/pi-runner-manifest.mjs` | 0 in the tree | E-7 delete |
| `demo/chassis/code/Code.vue` | 0 importers. Its one edge is `demo/demo.css`'s Tailwind `@source`, a scan and not a read | E-7 delete |

### 4.4 Bounds (R-5) at HEAD

- **18 dirs over 12 direct files:** `src` 9, `demo` 2, `tests` 6, `tests-visual` 1. The largest is `tests-visual/` with 177; the kind slots over the bound are `aurora/composables` 16, `dock/styles` 15 and `dock/composables` 13.
- **57 sources over 500 lines:** `src` 17, `demo` 8, `tests` 19, `tests-visual` 6, `scripts` 7. The longest is `tests/styles/contrast-computed.test.ts` at 1,260.
- **0 carry a generated header.**

---

## 5 · Open gaps

1. **`import-dag.mjs` still has its own graph.** F-1 agrees with it on every SCC at both trees, but rebasing it onto `lib/graph.mjs` is a row not built. It is 628 lines itself, and its path-derived module labels are what produce most of the declared scan deltas.
2. **Computed reads are census, not verdicts:** 238 fs reads and 167 helper calls. They are covered where the values they iterate are spelled as repo paths. A path assembled from pieces none of which names a location stays unseen, and single-segment names in a literal list (`["clock.ts", …]` over a scanned dir) are not yet resolved against the scanner's base.
3. **A scanner's sensitivity is declared, not derived.** The engine lists every file whose base-relative path changes, and the test run judges each declaration. At route scale this is one declaration per scanner.
4. **The plant battery is this seat's own** for 24 of 59 plants. Each route's critic writes its battery before reading the route's gate (F-9).
5. **Not built here:** F-5 (entry-rooted declarations), F-6 beyond the scan-delta bridge (tests reading through the resolver; suffix routing), F-10 (π and Playwright per band). No browser seat ran, so no reorder was paint-checked. The cascade proofs are structural (leaf-rule sequences), which S-16 says is where pass 1 stopped too.
6. **The records and the readers the rows install live under `docs/…/floor/`.** At landing they move to `scripts/`; that is a route decision. Until the floor is committed, a route copies it into its worktree, since the graph parses the records as part of the tree it judges.
7. **R-2's six published roots (§4.2) and `springProjection.ts` (§4.3)** need a ruling before a route acts on them.
8. **`dialog ↔ sheet`, import-dag's value SCC M03, survives the floor rows.** B's fourth inversion (`ModalOverlay` behind `overlay/modal/`) is not a floor row.
9. **The two dead `vitest.config.ts` includes in the ledger** (`scripts/**/*.{test,spec}.{ts,tsx}`, `tests/**/*.{test,spec}.vue`) are cure candidates for whichever route touches that config. The three `tsconfig.build.json` excludes wait on R-3.
