# D1 floor

The shared floor every D1 pass-2 route builds on (REGISTRY §3.2). It is design tooling kept under `docs/`, not library source: Node `.mjs` scripts, three records, five tree rows and a plant battery. The report that proves each tool on HEAD is `../pass-2/FLOOR-REPORT.md`.

A route's worktree starts from the same cut:

```sh
git worktree add <wt> HEAD            # never the main checkout: move.mjs and rows refuse it
ln -s <repo>/node_modules <wt>/node_modules
ln -s <repo>/tests-visual/node_modules <wt>/tests-visual/node_modules
F=docs/tranches/BL/design/structure/floor
node $F/rows/apply.mjs --root <wt>     # F-3, F-4, M02, M03, F-9, in order, fail-fast
node $F/gates.mjs --root <wt>          # after `npx vite build`: four PASS lines
```

## Layout

| path | what it is |
|---|---|
| `graph.mjs` | F-1 CLI: edge counts by kind and by resolution, every violation, exit 1 on any |
| `move.mjs` | F-2 CLI: apply a move list in a linked worktree, or refuse |
| `entries.mjs` | F-3 CLI: `check` (exports regenerate byte-equal, guard clean), `write` (re-pin `package.json`) |
| `cascade.mjs` | F-4 CLI: `contract`, `snapshot` (a named baseline), `verify` (move-only check) |
| `placement.mjs` | F-7 CLI: every `src` file's home under R-2's unit set, the move list it proposes, the R-8 readers |
| `surface.mjs` | the door/surface pin: `check`, `pin` |
| `gates.mjs` | the four floor gates in one run (F-1, F-3, F-4, surface pin) |
| `bounds.mjs` | R-5's measure (12 direct files, 500 lines). A measurement; HEAD is over it, so it is not a gate |
| `lib/` | `tree` (file set, zones), `resolve`, `evaluate` (path expressions), `scan` (per-language references), `graph`, `entries`, `symbols` (reads by symbol through barrels), `placement`, `move` |
| `records/entry-record.json` | the one entry record |
| `records/opaque-ledger.json` | every reference the graph cannot resolve at HEAD, with its reason |
| `records/surface-pin.json` | the published surface: 68 keys, 62 `typesVersions`, 603 runtime and 1,279 declaration names |
| `rows/` | the tree rows (below) and `lib.mjs`, their all-or-nothing edit transaction |
| `plants/graph-plants.mjs` | F-1's plant battery |
| `samples/move-sample-20.json` | F-2's 20-move sample, with its scan-delta declarations |

## F-1 · the graph

`lib/graph.mjs` parses every file in the five zones (`src`, `demo`, `tests`, `tests-visual`, `scripts`), the root configs and the floor records: TypeScript by the full AST, SFCs by `@vue/compiler-sfc` (script, script setup, every `<style>`, template assets), CSS by postcss, JSON, shell and HTML by tokenizer. Each reference resolves to a file, a directory, a declared external (a package or builtin), a generated output or a write target. Anything else is a violation, and the graph exits 1.

| edge kind | from | resolves as |
|---|---|---|
| `import`, `import-type`, `import-side-effect`, `import-type-node`, `reexport`, `reexport-star`, `reexport-ns` (`export * as`), `require`, `vi-mock`, `dynamic` | module syntax | module specifier: relative, root-absolute, alias (read from every tsconfig `paths` and vite/vitest `alias`), the package's own name through the entry record, package, builtin |
| `dynamic-template`, `dynamic` with no static head | `import()` / `require()` of a non-literal | a glob over the static head, or a violation (`opaque`) |
| `glob`, `glob-literal`, `json-glob` | `import.meta.glob`, config globs | matched files; an empty match is a violation. Alias patterns resolve |
| `new-url` | `new URL(x, import.meta.url)` | file-relative file |
| `css-import`, `css-url`, `css-reference`, `css-source`, `css-plugin`, `css-config`, `sfc-inline-css-*` | CSS, SFC `<style>`, Tailwind `@import … source()` | module specifier or glob |
| `sfc-style-src`, `sfc-script-src`, `sfc-template-src`, `template-asset` | SFC block `src`, template `src`/`href`/inline `style` `url()` | module specifier |
| `path-literal`, `path-helper`, `ts-reference`, `json-ref`, `json-command`, `sh-ref`, `html-ref` | a string that names a repo location, a local read helper called with a literal, `/// <reference>`, a JSON value, a `package.json` script token, a shell token | exact file or dir |
| `template-path`, `scan` | a path assembled from a static head and a dynamic tail | the head's dir (a scanner) |
| `helper-base` | a read helper's prefix | its dir; a helper over a missing dir is a violation |
| `base-relative` | a bare `a/b/c.ext` relative to a dir the file names or scans, or to a file it reads | that file, anchored at the dir or file |
| `embedded-path`, `quoted-relative` | a path quoted inside a string (`'@import "./glass/x.css";'`), a relative expectation | the read file whose own text carries it (the anchor) |
| `specifier-literal` | an alias- or self-name-shaped string (`"@glass/components/x/X.vue"`) | module specifier |
| `write`, `absence` | an fs write target; `expect(existsSync(p)).toBe(false)` | an output; a path that must not exist (a violation if it does) |

Rules the graph applies everywhere: a verdict is on the resolved file, never the spelling; the specifier node's line is recorded; a `declare module` name is not an edge; an alias whose planes disagree is a violation (`alias-conflict`); a ledger row that matches nothing is a violation (`ledger-stale`).

Two classes are counted, not judged (the census, 453 at HEAD): fs reads and helper calls whose argument is computed at run time, and path-shaped strings that resolve against nothing the file reads (synthetic fixture text, dist-relative text, package mentions). A computed read is covered when the literals it iterates are themselves edges, which they are wherever they are spelled as repo paths, base-relative paths or read-helper arguments.

## F-2 · the move engine

```json
{
  "moves": [{ "from": "src/a.ts", "to": "src/b/a.ts" }, { "from": "dir/", "to": "dir2/" }],
  "scanDeltas": [{ "scanner": "tests/x.test.ts", "spec": "join(DIR, name)", "file": "src/a.ts", "reason": "…" },
                 { "scanner": "scripts/y.mjs", "spec": "`src/${p}`", "all": true, "reason": "…" }]
}
```

`node move.mjs <list.json> --root <linked worktree> [--dry] [--out report.json]`

1. **Preflight, nothing written.** The tree's graph is clean; the plan is consistent (no source-and-target clash, no two moves on one target); every edge into or out of a moved file has a rewrite (residue 0); every scan delta is declared. A scan delta is a file whose path relative to a scanner's base changes: it leaves the base, or relocates inside it. A declaration names one delta, or one scanner with `all: true`; an undeclared delta and a declaration that matches nothing both refuse the run.
2. **Write.** Edited contents land at their new paths; emptied dirs are pruned.
3. **Image check.** The new graph must equal the old one under the move map, edge for edge, with no violation. A failure rolls the tree back byte for byte.

Rewrites keep the author's spelling: extension or none, `.js` for `.ts`, a dir index, the alias when the target stays under it, `./` or not, a root-absolute `/src/…`, a const anchor and its literal tail (`${DOCK}/composables/x.ts`), literal join segments (`join("src", "styles", "x.css")`), a helper argument, a glob's static head, an embedded path relative to its anchor file, a base-relative path relative to its base. A run whose moves are already applied proposes nothing and reports the same tree digest.

## F-3 · the entry record

`records/entry-record.json` holds `js` (`[name, source]` in published order), `css` (export key → `source` | `generated` | `assets`), `types`, `cascade.terminal` and `doors` (every `index.ts` under `src/` that is not an entry). `package.json`'s `exports` (68) and `typesVersions` (62) are emitted from it byte-equal (`entries.mjs check`), and `entries.mjs write` re-pins them.

The guard (`validateRecord`) throws in the build: a duplicate name, one source serving two names, a missing or empty source, a stale door, an `index.ts` anywhere under `src/` that is neither an entry nor a declared door, a missing terminal. HEAD checked first-level dirs only; placement is free, so the record names the door and the guard covers every depth.

Row `f3-entry-record` points the seven readers (vite entry map, style-fold roots and entry walk, declaration projector, two gate suites, the watch list) at the record and deletes `scripts/lib/subpath-policy.mjs` and `scripts/regen-exports.mjs`.

## F-4 · the cascade contract

- **The role.** Row `f4-terminal-role` replaces `terminalImportIndex`'s `./accessibility.css` regex and its fallback to the trailing `@source` (`vite.style-fold.ts:89-92`) with a lookup of the record's `cascade.terminal`, resolved by file. A terminal that is not imported, or not the last `@import`, stops the build.
- **The source half.** `cascade.mjs contract`: the terminal exists, is the last `@import` of the `./styles` source and has exactly one importer. It is one of the floor gates.
- **The move-only verifier.** `cascade.mjs snapshot --dist D --out DIR --sha S` flattens each published CSS entry (relative `@import`s inlined depth-first, `layer()`/`supports()`/media kept as wrappers) into its ordered leaf rules, with Vue scope ids and hashed `v-bind` vars numbered by first appearance. `cascade.mjs verify --baseline DIR --dist D` is GREEN only when every entry's sequence is identical; otherwise it names the first divergence and its class (`reorder`: the same rules in another order; `content`: rules added, removed or changed). The baseline is named by the SHA it was built from.

## F-7 · placement

`placeAll(graph, units)` counts a file's readers by symbol through barrels (a re-export forwards and never reads; a door is never a reader, R-2), inside the file's zone, and reads only loads (module edges, CSS imports, SFC block `src`, `url()`, `new URL`, globs); a Tailwind `@source` scan, a path string and a write are not reads. One reader unit means the file lives in that unit; more means their nearest common ancestor, or the global zone when that ancestor is a zone root. The unit set is a parameter; `dirUnits()` is R-2's reading (every dir a unit, `composables/`, `__tests__/` and `styles/` belong to the unit that holds them).

Classes: `ok`, `move`, `global`, `published` (read by no unit; an entry publishes it), `unread` (neither). `placement.mjs` prints the proposal and a `NEEDS-NAME` line for every target two files claim or that already exists: those need an authored name (S-7) and are never emitted as moves.

## Tree rows

Each row is an all-or-nothing transaction (`rows/lib.mjs`): an edit names the exact text it replaces (one match or the row throws), and nothing is written until every assertion holds. Rows run only in a linked worktree.

| row | change |
|---|---|
| `f3-entry-record` | the record is the one entry source (F-3) |
| `f4-terminal-role` | the declared terminal replaces the masked anchor fallback (F-4) |
| `m02-overlay-host` | S-8: `participation.ts` owns `OverlayHost` and `DockHoldKind` and a kernel context key; `provideDockContext` provides it beside its own key; `dockContext.ts` stays in dock |
| `m03-roving-move.json` | F-8's second half: `useTabRovingFocus.ts` moves to `src/composables/motion/morph/`, by the move engine, with its scan deltas declared |
| `f9-wire` | `tests/gates/floor.test.ts` runs `gates.mjs` under `npm test` (CI builds first) |

## Anti-vacuity

- **The plant battery** (`plants/graph-plants.mjs`) runs each plant as an in-memory overlay and passes when the graph shows the planted reference as an edge of the stated kind or as the stated violation. 35 plants are the pass-1 critics' own, transcribed from the critiques whose builders missed them; 24 are this floor's, written for the edge forms found while building it. The floor's plants are not an independent battery (F-9): each route's critic still writes its own before reading the route's gate.
- **The surface pin** makes any growth or loss of a door or a name a reviewed diff. `surface.mjs check` reads a built `dist` inside the repo (its dependencies must resolve) and fails loud when an entry does not import.
- **The gates** run under `npm test` through row `f9-wire`.

## Declared limits

- A read whose path is computed at run time is census. It is covered where the values it iterates are spelled as repo paths; a path assembled from pieces none of which names a location is not seen.
- A scanner's sensitivity is not known to the engine: every scan delta must be declared, and the test run judges the declaration.
- An embedded or base-relative path that resolves against nothing the file reads is census, not a violation (synthetic fixture text is common in the gate self-tests).
- The records and the readers the rows install live under this directory. At landing they move to `scripts/`; that is a route decision, not a floor one.
