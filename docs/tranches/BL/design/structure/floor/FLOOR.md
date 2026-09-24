# D1 floor

The shared floor every D1 route builds on (REGISTRY §3.2). It is design tooling: Node `.mjs` scripts, three records, the tree rows and a plant battery. Until landing it lives here, under `docs/`; row `fd11-land` moves its runtime to `scripts/structure/` (FD-11), and from then on the tree reads its own floor there. The pass-2 report is `../pass-2/FLOOR-REPORT.md`; the pass-3 build (P3-F1..F9, FD-1..FD-11) is `../pass-3/FLOOR-P3.md`.

A route's worktree starts from the same cut:

```sh
git worktree add <wt> HEAD            # never the main checkout: move.mjs, fixpoint.mjs and rows refuse it
ln -s <repo>/node_modules <wt>/node_modules
ln -s <repo>/tests-visual/node_modules <wt>/tests-visual/node_modules
node <repo>/docs/tranches/BL/design/structure/floor/rows/apply.mjs --root <wt>
                                      # f3, f4, m02, m03, f9, fd6, fd7, fd11, in order, fail-fast; prints the tree digest
cd <wt> && npx vite build
node scripts/structure/gates.mjs      # four PASS lines (also under `npm test`, tests/gates/floor.test.ts)
```

`apply.mjs` runs from the checkout's floor: after `fd11` the worktree's floor is at `scripts/structure/` and the docs copy is gone from it. A second run is a no-op with the same digest (every op reports `applied`).

## Layout

| path | what it is |
|---|---|
| `graph.mjs` | F-1 CLI: edge counts by kind and by resolution, every violation, exit 1 on any |
| `move.mjs` | F-2 CLI: apply a move list in a linked worktree, or refuse (FD-2 included) |
| `fixpoint.mjs` | F-7 to a fixpoint: placement, then the move engine, until a pass proposes nothing; FD-2 is its stop |
| `classify.mjs` | FD-5: every file a structure step changed is move-only, re-point, vi-mock or authored, or the step fails |
| `entries.mjs` | F-3 CLI: `check` (exports regenerate byte-equal, guard clean), `write` (re-pin `package.json`) |
| `cascade.mjs` | F-4 CLI: `contract`, `snapshot` (a named baseline), `verify` (move-only check) |
| `placement.mjs` | F-7 CLI: every `src` file's home, the move list it proposes, the R-8 readers; `--anchor publication\|none` |
| `surface.mjs` | the door/surface pin: `check`, `pin` |
| `gates.mjs` | the four floor gates in one run (F-1, F-3, F-4, surface pin) |
| `bounds.mjs` | R-5's measure (12 direct files, 500 lines), every dir bounded (P3-R3); a measurement, not a gate |
| `browser.mjs` | F-10: the one browser seat for π and Playwright |
| `lib/` | `tree` (file set, zones, the floor's own home), `resolve`, `evaluate` (path expressions), `scan/` (`script`, `css`, `text` for JSON/shell/HTML/YAML, `vue`), `graph`, `entries`, `symbols`, `placement`, `move`, `classify` |
| `records/entry-record.json` | the one entry record |
| `records/opaque-ledger.json` | every reference the graph cannot resolve, with its reason |
| `records/surface-pin.json` | the published surface |
| `rows/` | the tree rows (below) and `lib.mjs`, their idempotent all-or-nothing transaction. Not landed |
| `plants/graph-plants.mjs` | F-1's plant battery (59). Not landed |
| `samples/move-sample-20.json` | F-2's 20-move sample. Not landed |

The floor finds its tree by walking up to the `package.json` named `@mkbabb/glass-ui`, and its records by its own location relative to that root (`floorHome()`), so the same code reads a tree whether it sits in `docs/…/floor/` or in `scripts/structure/`.

## F-1 · the graph

`lib/graph.mjs` parses every file in the six zones (`src`, `demo`, `tests`, `tests-visual`, `scripts`, and `ci`: `.github/workflows/*.yml`), the root configs and the floor's own runtime (not `rows/`, `plants/` or `samples/`): TypeScript by the full AST, SFCs by `@vue/compiler-sfc`, CSS by postcss, JSON, shell, HTML and YAML by tokenizer. Each reference resolves to a file, a directory, a declared external, a generated output or a write target. Anything else is a violation, and the graph exits 1.

| edge kind | from | resolves as |
|---|---|---|
| `import`, `import-type`, `import-side-effect`, `import-type-node`, `reexport`, `reexport-star`, `reexport-ns`, `require`, `vi-mock`, `dynamic` | module syntax | module specifier: relative, root-absolute, alias, the package's own name through the entry record, package, builtin |
| `dynamic-template`, `dynamic` with no static head | `import()` / `require()` of a non-literal | a glob over the static head, or a violation (`opaque`) |
| `glob`, `glob-literal`, `json-glob` | `import.meta.glob`, config globs | matched files; an empty match is a violation, except a program pattern (below) |
| `program-glob` | a program pattern's head dir (tsconfig `include`, vite/vitest `include`, a Tailwind `@source not`) | the head dir; a missing head is `scan-base-missing` |
| `new-url` | `new URL(x, import.meta.url)` | file-relative file |
| `css-import`, `css-url`, `css-reference`, `css-source`, `css-plugin`, `css-config`, `sfc-inline-css-*` | CSS, SFC `<style>`, Tailwind `@import … source()` | module specifier or glob; a file's `@source not` subtracts from its positive `@source` matches, a dir-named negation every file under it |
| `sfc-style-src`, `sfc-script-src`, `sfc-template-src`, `template-asset` | SFC block `src`, template `src`/`href`/`url()` | module specifier |
| `path-literal`, `path-helper`, `ts-reference`, `json-ref`, `json-command`, `sh-ref`, `html-ref`, `yaml-command` | a string that names a repo location, a read helper called with a literal, `/// <reference>`, a JSON value, a `package.json` script token, a shell token, a CI `run:` token | exact file or dir |
| `yaml-npm-script` | `npm run X` / `npm --workspace W run X` in CI | the script in that `package.json`, or `unresolved` |
| `template-path`, `scan` | a path assembled from a static head and a dynamic tail | the head's dir (a scanner) |
| `helper-base` | a read helper's prefix | its dir; a helper over a missing dir is a violation |
| `base-relative`, `embedded-path`, `quoted-relative` | a bare path relative to a dir or file the source reads; a path quoted inside read text | that file, anchored |
| `specifier-literal` | an alias- or self-name-shaped string | module specifier |
| `write`, `absence` | an fs write target; `expect(existsSync(p)).toBe(false)` | an output; a path that must not exist |

Rules the graph applies everywhere: a verdict is on the resolved file, never the spelling; a `declare module` name is not an edge; an alias whose planes disagree is a violation (`alias-conflict`); a ledger row that matches nothing is a violation (`ledger-stale`).

**Self-name in `src` (P3-F3).** A `src` module or CSS `@import` that names the package itself (`@mkbabb/glass-ui/…`) is the violation `self-name-in-src` and never an edge. The demo, tests and scripts reach doors by self-name legally (R-10). A `url()` to the published fonts is exempt.

**The census (P3-F4).** Counted, not judged: fs reads and helper calls whose argument is computed at run time, and path-shaped strings that resolve against nothing the file reads. A computed read with a static prefix is the census row `computed-read` and carries its `base`, in all three forms: `join(process.cwd(), "src/components/" + n)`, `` `src/components/${n}/index.ts` `` and `resolve(import.meta.dirname, "../../src/components", n, …)`. `process.cwd()` evaluates as the root (`rooted`). A path prefix is its dir; a string prefix's dir is its head up to the last `/`.

**A parameter base is not a helper.** A function whose parameter heads a zone-rooted literal tail (`resolve(root, "src/styles/theme.css")`) is not a read helper: the tail is a `path-literal` edge to the file, rewritten by a move. Only a parameter that is the leaf (`resolve(ROOT, "src", rel)`) makes a helper.

## F-2 · the move engine

```json
{
  "moves": [{ "from": "src/a.ts", "to": "src/b/a.ts" }, { "from": "dir/", "to": "dir2/" }],
  "scanDeltas": [{ "scanner": "tests/x.test.ts", "spec": "join(DIR, name)", "file": "src/a.ts", "reason": "…" },
                 { "scanner": "scripts/y.mjs", "spec": "`src/${p}`", "all": true, "reason": "…" }]
}
```

`node move.mjs <list.json> --root <linked worktree> [--dry] [--out report.json]`

1. **Preflight, nothing written.** The tree's graph is clean; the plan is consistent; every edge into or out of a moved file has a rewrite (residue 0); every scan delta is declared; and the image graph adds no co-cyclic module pair (FD-2, below).
2. **Write.** Edited contents land at their new paths; emptied dirs are pruned deepest first, and a parent emptied by the pruning is pruned in turn.
3. **Image check.** The new graph must equal the old one under the move map, edge for edge, with no violation, and no co-cyclic pair may have grown. A failure rolls the tree back byte for byte.

Rewrites keep the author's spelling (extension or none, `.js` for `.ts`, dir index, alias, `./`, root-absolute, const anchors, join segments, helper arguments, glob heads, embedded and base-relative paths). A one-segment base-relative rewrite is spelled `./name`. A `process.cwd()`-rooted join is rewritten in place; a cwd-rooted edge with no span to rewrite is judged by the image check. A run whose moves are already applied proposes nothing and reports the same tree digest.

**FD-2 · co-cyclic pairs.** Modules are R-2 units (`dirUnits().unitOf`). `sccGrowth` counts the unordered module pairs that share a strongly connected component, before and after (old names mapped through the move map), and a move that adds one is refused, naming the first added pair (`FD-2 CO-CYCLIC a ↔ b`). It is a stop, never a warning.

## F-3 · the entry record

`records/entry-record.json` holds `js` (`[name, source]` in published order), `css` (export key → `{ source, dist }` | `generated` | `assets`), `types`, `cascade.terminal` and `doors`. `package.json`'s `exports` and `typesVersions` are emitted from it byte-equal (`entries.mjs check`), and `entries.mjs write` re-pins them.

The guard (`validateRecord`) throws in the build: a duplicate name, one source serving two names, a missing or empty source, a stale door, an undeclared `index.ts` under `src/`, a missing terminal, a CSS source entry with no `dist` (`css-dist-undeclared`) and two keys on one `dist` (`css-dist-twice`).

**CSS dist names (P3-F5).** A CSS export's published file is its declared `dist`, not a mirror of its source path. When the two differ (a sheet moved into its unit, `theme.css` → `theme/index.css`), the build writes the declared name as a one-line `@import` of the mirror (`emitDeclaredCssEntries`), so the published key and file survive the move and no rule is duplicated.

**The declaration program (FD-7).** `declarationProgram(root, outDir)` writes a throwaway tsconfig that extends `tsconfig.json` with `files` = the entry sources plus the ambient `.d.ts` in `src/`: declarations are emitted for what an entry reaches, and nothing under `__tests__/` enters `dist`. It replaces `tsconfig.build.json`.

## F-4 · the cascade contract

- **The role.** The build reads the record's `cascade.terminal`; a terminal that is not imported, or not the last `@import`, stops it.
- **The source half.** `cascade.mjs contract`: the terminal exists, is the last `@import` of the `./styles` source and has exactly one importer. A floor gate.
- **The move-only verifier.** `cascade.mjs snapshot --dist D --out DIR --sha S` flattens each published CSS entry into its ordered leaf rules, with Vue scope ids and hashed `v-bind` vars numbered by first appearance, and, since FD-4, scoped `@keyframes` names (`name-<8 hex>`) renamed `name-#N` with every use. `cascade.mjs verify --baseline DIR --dist D` is GREEN only when every sequence is identical, else it names the first divergence (`reorder` or `content`). A move re-hashes a scoped SFC; renaming or changing a keyframe is still `content`.

## F-7 · placement

`placeAll(graph, units, { zones, anchor })` counts a file's readers by symbol through barrels inside its zone, and reads only loads. One reader unit means the file lives there; more means their nearest common ancestor, or the global zone at a zone root.

- **Units and slots (FD-3).** `dirUnits()` is R-2's reading. `isSlot(dir)` is the one slot predicate: a dir named for a kind (`composables`, `__tests__`, `styles`, …) whose parent is not a container (`src`, a zone root, `src/components`, `src/composables`). `src/styles/` is a unit; `dock/composables/` is dock's slot. `bounds.mjs` imports the same predicate.
- **The publication anchor (FD-1, P3-R1).** `publicationAnchor(graph)`: the doors are the entry sources plus the declared doors an entry reaches through re-export edges. A door anchors the files it exports by origin inside its own dir (the innermost door wins); an entry CSS source anchors its `@import` closure inside its dir. A door in a container or a slot anchors nothing (X-10). An anchored file is class `anchored` and stays. `--anchor none` gives the unanchored reading.

Classes: `ok`, `anchored`, `move`, `global`, `published`, `unread`. `NEEDS-NAME` lines name targets two files claim or that exist (S-7); they are never emitted as moves.

`fixpoint.mjs --root <wt> [--scan-deltas decl.json] [--out dir] [--max 6] [--dry]` repeats placement and the engine to a fixpoint. Each pass gets the declarations that cover its deltas; a declaration no pass used fails the run as stale. A pass FD-2 refuses stops the run and names it.

## FD-5 · the step classifier

`classify.mjs --base <before> --root <after> [--moves list.json]… [--manifest m.json]`: each changed file is `move-only` (its text equals the base's once every reference span, in both, is replaced by the file it resolves to), `re-point` (the same with named imports replaced by their symbol origins), `vi-mock` (a mock re-aimed at a moved module) or `authored` (named, with a reason, in the manifest). Anything else is `UNCLASSIFIED` and exits 1, as does a manifest row naming an unchanged file. A span's token is its resolved target and its kind class (`kindClass` in `lib/move.mjs`, the image check's reading: `base-relative`, `quoted-relative` and `embedded-path` are one class), so a rewrite that changes which of those spellings F-1 reads is still move-only.

## F-10 · the browser seat

`browser.mjs --root <tree> [--specs a,b] [--moved list.json]… [--project P] [--pi-plant X --floors a,b] [--out r.json] [--wait S]`

- **Serialized.** A machine lock (`glass-ui-browser-seat.lock` under the OS temp dir, holding pid, tree, start) admits one run; a second waits up to `--wait`, then refuses; a dead owner's lock is taken over and logged.
- **Its own server.** It spawns `vite` in the tree on a free port it chose and passes that origin to Playwright, so `reuseExistingServer` never attaches to another session's demo.
- **Bands.** `--moved` selects the specs whose file name carries a moved file's top unit; the π pixel floor (`substrate-paints-color.spec.ts`) runs on every call.
- **Verdict** from the machine report: GREEN when every selected test ran and passed. The planted arm is judged by the tree's `pi-gate-verify.mjs --expect=planted-red` over the named floors.

## Tree rows

Each row is an all-or-nothing, idempotent transaction (`rows/lib.mjs`): an op whose result is already in place reports `applied`; a row whose ops are all applied is a no-op; a partly applied row throws. Rows run only in a linked worktree.

| row | change |
|---|---|
| `f3-entry-record` | the record is the one entry source; style roots come from the record, not a masked `existsSync`; the declared CSS dist names are emitted (F-3) |
| `f4-terminal-role` | the declared terminal replaces the masked anchor fallback (F-4) |
| `m02-overlay-host` | S-8: `participation.ts` owns `OverlayHost` and `DockHoldKind` and a kernel context key |
| `m03-roving-move.json` | `useTabRovingFocus.ts` moves to `src/composables/motion/morph/`, by the tree's own move engine |
| `f9-wire` | `tests/gates/floor.test.ts` runs `gates.mjs` under `npm test` |
| `fd6-harness` | `tests/harness/source.ts` (`files`, `read`, `edges`): the source walkers skip `__tests__/` and read files only; `easing.contract` and the two sortable-list battery walkers use it |
| `fd7-programs` | the declaration program replaces `tsconfig.build.json` (deleted); vitest collects `src/**/__tests__/*.test.ts`; `demo.css` gets `@source not "../src/**/__tests__"`; the style watch entry goes |
| `fd11-land` | the floor runtime moves to `scripts/structure/`, its eight readers re-point, `scripts/import-dag.mjs` and its two ledger rows are deleted |

## Anti-vacuity

- **The plant batteries.** `plants/graph-plants.mjs` (59: the pass-1 critics' 35 and the floor's 24), and `../pass-3/plants/p3-graph-plants.mjs` (17) with `../pass-3/plants/p3-tree-plants.sh` (the tree half), each run against HEAD's floor and this one. The floor's plants are not an independent battery: each route's critic still writes its own.
- **The surface pin** makes any growth or loss of a door or a name a reviewed diff.
- **The gates** run under `npm test` through row `f9-wire`.

## Declared limits

- A read computed at run time is census; it is covered where the values it iterates are spelled as repo paths.
- A scanner's sensitivity is not known to the engine: every scan delta is declared, and the test run judges the declaration.
- An embedded or base-relative path that resolves against nothing the file reads is census.
- F-1 does not read Playwright's `testDir`; a spec moved out of `tests-visual/` is not caught by the graph.
- `browser.mjs` selects bands by file-name tokens; a spec whose name does not carry its unit runs only when named.
- A colocated test imports `vitest` explicitly (the lib program has no vitest globals).
