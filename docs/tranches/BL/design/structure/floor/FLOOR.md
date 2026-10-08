# D1 floor

The shared floor every D1 route builds on (REGISTRY §3.2). It is design tooling: Node `.mjs` scripts, three records, the tree rows and a plant battery. Until landing it lives here, under `docs/`; row `fd11-land` moves its runtime to `scripts/structure/` (FD-11), and from then on the tree reads its own floor there. The pass-2 report is `../pass-2/FLOOR-REPORT.md`; the pass-3 build (P3-F1..F9, FD-1..FD-11) is `../pass-3/FLOOR-P3.md`; the pass-4 build (P4-F1..F7 and the 10.1.0 surface pin) is `../pass-4/FLOOR-P4.md`; the pass-5 build (P5-F1..F4) is `../pass-5/FLOOR-P5.md`; the pass-6 build (P6-F1..F3) is `../pass-6/FLOOR-P6.md`.

A route's worktree starts from the same cut:

```sh
git worktree add <wt> HEAD            # never the main checkout: move.mjs, fixpoint.mjs and rows refuse it
ln -s <repo>/node_modules <wt>/node_modules
ln -s <repo>/tests-visual/node_modules <wt>/tests-visual/node_modules
node <repo>/docs/tranches/BL/design/structure/floor/rows/apply.mjs --root <wt>
                                      # r1, f3, f4, m02, m03, f9, fd6, fd7, fd11, in order, fail-fast; prints the tree digest
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
| `browser.mjs` | F-10: the one browser seat for π and Playwright; bands selected by the graph, base-green counts |
| `lib/` | `tree` (file set, zones, the floor's own home), `resolve`, `evaluate` (path expressions), `scan/` (`script`, `css`, `text` for JSON/shell/HTML/YAML, `vue`, `playwright`: the program's edges, and `playwrightProgram`, the spec key the seat and FD-4 share, P6-F2), `graph`, `entries`, `symbols`, `placement`, `plan` (the move plan's vocabulary, `expandMoves` and `kindClass`, read by `move` and `classify`), `move`, `classify`, `syntax` (the parse check every engine write passes), `recipes` (class recipes and owners, read by F-10 and FD-4). The runtime has no file cycle (P5-F1) |
| `records/entry-record.json` | the one entry record |
| `records/opaque-ledger.json` | every reference the graph cannot resolve, with its reason |
| `records/surface-pin.json` | the published surface, recorded on 10.1.0 (the floor base follows HEAD; `ConfiguratorLayout` on `.` and `./configurator` is the one growth, release `9065d924`) |
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
| `program-glob` | a program pattern's head dir (tsconfig `include`, vite/vitest `include`, a Tailwind `@source not`, a Playwright `testDir` + `testMatch`) | the head dir; a missing head is `scan-base-missing` |
| `test-program` | a Playwright config's `testDir` and `testMatch`, top level and per project (P4-F5); a pattern with no `/` matches at any depth, and the default is every `*.spec.*` / `*.test.*` script | the head dir, plus one `glob` edge per collected spec; a non-literal `testDir` or a RegExp `testMatch` is `opaque` |
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
                 { "scanner": "scripts/y.mjs", "spec": "`src/${p}`", "all": true, "reason": "…" }],
  "globDeltas": [{ "scanner": "demo/demo.css", "glob": "../src/components/_shared/**/*.ts", "file": "src/components/_shared/overlay/x.ts", "reason": "…" }]
}
```

`node move.mjs <list.json> --root <linked worktree> [--dry] [--out report.json]`

1. **Preflight, nothing written.** The tree's graph is clean; the plan is consistent; every edge into or out of a moved file has a rewrite (residue 0); every scan delta and every css-source glob delta is declared, and no declaration is stale; and the image graph adds no co-cyclic module pair (FD-2, below).
2. **Parse, nothing written (P5-F4).** Every file the step would write, moved or edited, is parsed by `lib/syntax.mjs`: scripts by the TypeScript parser, an SFC by `@vue/compiler-sfc` with its script blocks by TypeScript and its plain-CSS style blocks by postcss, a sheet by postcss, JSON by `JSON.parse` (tsconfig and `.jsonc` by TypeScript's reader). A file that does not parse refuses the step at phase `parse`, and the CLI prints `PARSE refused` with the file and the parser's first message.
3. **Write.** Edited contents land at their new paths; emptied dirs are pruned deepest first, and a parent emptied by the pruning is pruned in turn.
4. **Image check.** The new graph must equal the old one under the move map, edge for edge (a declared glob delta is the one expected change), with no violation, and no co-cyclic pair may have grown.
5. **FD-5 on the step (P4-F6).** Every file the engine wrote, moved or edited, must classify `move-only` against its original under the move map (`classifyImage`). The report carries `classified`; an `UNCLASSIFIED` file refuses the step.

A failure in 4 or 5 rolls the tree back byte for byte.

Rewrites keep the author's spelling (extension or none, `.js` for `.ts`, dir index, alias, `./`, root-absolute, const anchors, join segments, helper arguments, glob heads, embedded and base-relative paths). A one-segment base-relative rewrite is spelled `./name`. A `process.cwd()`-rooted join is rewritten in place; a cwd-rooted edge with no span to rewrite is judged by the image check. A run whose moves are already applied proposes nothing and reports the same tree digest.

**Generated targets (P4-F3).** A reference to a generated output (`dist`, `tests-visual/.cache`, any `GENERATED_ROOTS` path) has no tree file behind it and never moves: when its holder moves, a root-relative spelling is kept verbatim and a holder-relative one is respelled to the same output. An edge with no target at all is residue, never the text `null`.

**FD-8 · css-source glob deltas (P4-F2, P3-R6).** A Tailwind `@source` glob is a collection pattern. A move that takes a file out of its match set, or brings one in, changes what Tailwind scans, and no rewrite can express that. The engine names every such delta (`globDeltasOf`, with the sheet's own `@source not` subtracted); each must be declared in `globDeltas` (`file` is the path before the move), and a declaration that matches nothing is stale. Only source-plane globs whose sheet stays put are judged; a moved sheet's glob is respelled and keeps its match set. A Playwright or vitest program losing a member is not a glob delta: it stays an image-check refusal, and the route edits the program first.

**FD-2 · co-cyclic pairs.** Modules are R-2 units (`dirUnits().unitOf`). `sccGrowth` counts the unordered module pairs that share a strongly connected component, before and after (old names mapped through the move map), and a move that adds one is refused, naming the first added pair (`FD-2 CO-CYCLIC a ↔ b`). It is a stop, never a warning.

## F-3 · the entry record

`records/entry-record.json` holds `js` (`[name, source]` in published order), `css` (export key → `{ source, dist }` | `generated` | `assets`), `types`, `cascade.terminal` and `doors`. `package.json`'s `exports` and `typesVersions` are emitted from it byte-equal (`entries.mjs check`), and `entries.mjs write` re-pins them.

The guard (`validateRecord`) throws in the build: a duplicate name, one source serving two names, a missing or empty source, a stale door, an undeclared `index.ts` under `src/`, a missing terminal, a CSS target that declares a `dist` name (`css-dist-declared`) and two CSS keys on one source (`css-source-twice`).

**CSS dist paths (P5-F2, P4-R4 arm (a)).** A CSS entry ships at its source's mirror path, `dist/<path under src/>`, like every other file, and its export key targets that real file: `./styles/theme` → `./dist/styles/theme/index.css` once `theme.css` moves to `theme/index.css`. The build writes no file at an old name, so no published file only forwards to another. The key never changes; the value follows the source, so a move of a CSS entry source is followed by `entries.mjs write` (F-3 is RED until then, naming the drift), and a consumer that imports the dist path directly gets a MIGRATION row.

**The declaration program (FD-7).** `declarationProgram(root, outDir)` writes a throwaway tsconfig that extends `tsconfig.json` with `files` = the entry sources plus the ambient `.d.ts` in `src/`: declarations are emitted for what an entry reaches, and nothing under `__tests__/` enters `dist`. It replaces `tsconfig.build.json`.

## F-4 · the cascade contract

- **The role.** The build reads the record's `cascade.terminal`; a terminal that is not imported, or not the last `@import`, stops it.
- **The source half.** `cascade.mjs contract`: the terminal exists, is the last `@import` of the `./styles` source and has exactly one importer. A floor gate.
- **The move-only verifier.** `cascade.mjs snapshot --root R --dist D --out DIR --sha S` flattens each published CSS entry into its ordered leaf rules. `cascade.mjs verify --baseline DIR --root R --dist D` is GREEN only when every sequence is identical, else it names the first divergence (`reorder` or `content`). The baseline is `cascade-baseline/2`; a `/1` baseline is refused, never compared.
- **Scopes by component (P6-F1).** A production build gives a scoped SFC the id `sha256(<its path from the root> + <its source>)`, first 8 hex (`@vitejs/plugin-vue` 6.0.8's default), so the id changes with every byte of the file and with every move. `scopeNames(tree)` hashes every SFC of the tree that built the dist and reads each `data-v-<id>` as `data-v-(<Component>)`, the SFC's basename, and each scoped `@keyframes x-<id>` as `x-(<Component>)` with every use. A pure move keeps the name and reads identical. A dist id no SFC of the tree hashes to throws (the verifier was handed the wrong tree, or a dev build), and so do two same-named SFCs that both scope rules. A value changed under a scope is `content`.
- **A declared SFC split (P6-F1).** A listing's `scopes` (`[{ "from": "Timeline", "to": "TimelineMarks", "reason": "…" }]`) states that the now-tree's component `to` holds rules re-homed from the base's `from`: `to`'s labels read as `from`'s, and the entry is then compared as usual. A split usually also reorders (the new SFC's block is emitted before its parent's), and that reorder is listed by its `moved` rules like any other. A declaration is refused, RED, when it lacks `from`, `to` or `reason`, when `to` scopes nothing now (stale), when `to` already scoped rules at base (a merge of two live components), or when `from` scoped nothing at base. `verify` prints `SCOPE from → to: n rule line(s) re-homed`, or `SCOPE-REFUSED` with the reason.
- **The listed-reorder judge (P4-F7, S-28).** `verify … --reorders listed.json [--browser seat.json]…`, with `listed.json` = `{ "reorders": [{ "entry": "./styles", "moved": ["<leaf rule>", …], "reason": "…" }] }`. An unlisted reorder and any content change stay RED; a listing that matches no reordered entry is stale and RED.
- **The listed rung (P5-F3).** A listing names the moved rule set it reviewed: `moved` holds the leaf rules (the snapshot's `ctx :: selector {decls}` lines) that the reorder moves, read as the rules outside the longest kept subsequence. The set the reorder moves must equal the listed set as a multiset: a moved rule the listing does not name is `UNLISTED` (the reorder reaches past the reviewed rung) and a listed rule that did not move is `STALE-RULE`; either is RED, and a listing with no `moved` is RED. `verify` prints every moved rule of a reordered entry as an `UNLISTED` line, so a route writes its listing from the verifier's own output after it has reviewed the rung. Only a listing that matches is then judged pair by pair (`reorderRisks`): the pairs whose relative order changed (base order against the longest kept subsequence) are each a **risk** when the two rules share a declared property, sit in one `@layer` path, and hold complex selectors of equal specificity whose classes co-occur in a source class recipe (`lib/recipes.mjs`) or are one class (classless: one selector). A risk is **covered** only by a browser-seat report run with `--base-report` in which a spec that reads it (its text names one of the shared properties AND a class of either rule, or a class whose every wearer wears one) has a base-green band, passed, and has no new failure; a reading spec with a new failure **refutes** the reorder. A spec that names only the class is not evidence: the P4 battery measured the accent-tone rung (22%/25% → 18%) pass all 18 base-green tests of the five chip-paint specs. GREEN needs every risk covered; each risk prints as `RISK` or `COVERED` with its pair, property and recipe.
- **The coverage arm's spec key (P6-F2).** A browser report is `browser-seat/2`: its results, its bands and its selection key a spec by its path from the Playwright config's `testDir` (Playwright's `rootDir`), and the report records that dir as `testDir`. `coverRisks` reads each result's spec at `testDir/<key>` in the tree under judgment. A report of another schema throws, and so does a result whose spec the tree does not hold (`FD-4: … names spec …, at …, which … does not hold`); `verify` reads either as `RED` with that message. A spec carved into a unit's `__tests__/` slot is read where it is, so it counts as evidence.

## F-7 · placement

`placeAll(graph, units, { zones, anchor })` counts a file's readers by symbol through barrels inside its zone, and reads only loads. One reader unit means the file lives there; more means their nearest common ancestor, or the global zone at a zone root.

- **Units and slots (FD-3).** `dirUnits()` is R-2's reading. `isSlot(dir)` is the one slot predicate: a dir named for a kind (`composables`, `__tests__`, `styles`, …) whose parent is not a container (`src`, a zone root, `src/components`, `src/composables`). `src/styles/` is a unit; `dock/composables/` is dock's slot. `bounds.mjs` imports the same predicate.
- **The publication anchor (FD-1, P3-R1).** `publicationAnchor(graph)`: the doors are the entry sources plus the declared doors an entry reaches through re-export edges. A door anchors the files it exports by origin inside its own dir (the innermost door wins); an entry CSS source anchors its `@import` closure inside its dir. A door in a container or a slot anchors nothing (X-10). An anchored file is class `anchored` and stays. `--anchor none` gives the unanchored reading.

Classes: `ok`, `anchored`, `move`, `global`, `published`, `unread`. `NEEDS-NAME` lines name targets two files claim or that exist (S-7); they are never emitted as moves.

`fixpoint.mjs --root <wt> [--scan-deltas decl.json] [--out dir] [--max 6] [--dry]` repeats placement and the engine to a fixpoint. Each pass gets the declarations that cover its deltas; a declaration no pass used fails the run as stale. A pass FD-2 refuses stops the run and names it.

## FD-5 · the step classifier

`classify.mjs --base <before> --root <after> [--moves list.json]… [--manifest m.json]`: each changed file is `move-only` (its text equals the base's once every reference span, in both, is replaced by the file it resolves to), `re-point` (the same with named imports replaced by their symbol origins), `vi-mock` (a mock re-aimed at a moved module) or `authored` (named, with a reason, in the manifest). Anything else is `UNCLASSIFIED` and exits 1, as does a manifest row naming an unchanged file. A span's token is its resolved target and its kind class (`kindClass` in `lib/move.mjs`, the image check's reading: `base-relative`, `quoted-relative` and `embedded-path` are one class), so a rewrite that changes which of those spellings F-1 reads is still move-only.

**Reference sites (P4-F6).** A path spelled over several literal segments with only separators between them (`join("src", "styles", "tokens.css")`) is one site from its first segment to its last, so the engine's one-segment respelling (`join("src/styles/tokens/index.css")`) reads move-only. A site several edges share (a glob literal, one edge per match) carries the sorted set of their targets. The same normalizer runs inside the engine on every step (F-2, step 5), so every engine step of a chain is classified; a chain's authored rows are classified with this CLI and a manifest.

## F-10 · the browser seat

`browser.mjs --root <tree> [--specs a,b] [--moved list.json]… [--project P] [--pi-plant X --floors a,b] [--out r.json] [--wait S]`

- **Serialized.** A machine lock (`glass-ui-browser-seat.lock` under the OS temp dir, holding pid, tree, start) admits one run; a second waits up to `--wait`, then refuses; a dead owner's lock is taken over and logged.
- **Its own server.** It spawns `vite` in the tree on a free port it chose and passes that origin to Playwright, so `reuseExistingServer` never attaches to another session's demo.
- **Bands by the graph (P4-F4).** The changed files are both paths of every move in `--moved` lists and every `--changed` file a row edited; a file's band is its top unit. A spec of the Playwright program (the `test-program` edges, `_`-prefixed capture specs excluded) joins a band when it, or a `tests-visual` helper it reads, `reads` the file (an F-1 edge), names one of its `classes` (the file's selector or recipe classes, plus every owned class whose every wearer wears one of them: `glass-chip` for `chip/accent-tone.css`), names its `paths` (the path, its basename, its `components/<unit>/` dir), or carries the unit in its file `name`. Each selection lists its reasons. The π pixel floor (`substrate-paints-color.spec.ts`, the one program spec of that name, wherever the program holds it; none or two refuse the run) runs on every call. `--select-only` reports the selection without a browser.
- **One spec key (P6-F2).** Every spec is named by its path from the config's `testDir` (`playwrightProgram` in `lib/scan/playwright.mjs`: the one config carrying a program, its top-level `testDir` resolved against the config's dir, which is Playwright 1.61's `rootDir`). `--specs`, the selection, the bands and the results all use it; Playwright's JSON report writes `file` as the same path, and the seat reads it as written. A reported file that is no selected key refuses the report (the seat and the runner disagree on the root). Playwright is handed each spec's absolute path, since a CLI filter is a RegExp over the absolute path and a bare name matches every file that contains it. The report is `browser-seat/2` and records `testDir`; a `--base-report` of another schema or root is refused.
- **Base-green.** `--base-report` takes this seat's report of the same specs on the base tree. Each band reports its base-green count and its new failures; a band with no base-green test reports **no browser signal**, and its 0-new-failure delta is not evidence.
- **Verdict** from the machine report: without a base report, GREEN when every selected test ran and passed; with one, GREEN when no base-green test failed. The report keeps every test's status (`results`) so it can serve as the next run's base. The planted arm is judged by the tree's `pi-gate-verify.mjs --expect=planted-red` over the named floors.

## No swallowed reads (P6-F3)

The floor's instruments are held to the edict's no-masking law (REGISTRY S-40). No floor reader turns an input it cannot read into an empty one:

- **Records.** The entry record and the opaque ledger are required. Absent, each throws naming its path; malformed, each throws naming its path and the parser's message. Neither has an "absent = empty" reading, and no caller asks for one.
- **Tree files.** A file the tree lists is read without a guard (`graph`, `recipes`, the seat's spec reach, `resolveEmbedded`'s anchors), so an unreadable one throws with its own error (`EACCES …`). The one absence the tree admits is git's index naming a file deleted from the worktree, tested by `existsSync` before `statSync`; any other stat failure throws.
- **Parsed inputs.** A tsconfig that does not parse stops alias discovery, naming the file. A stylesheet `selectorClasses` cannot parse throws: its classes are unknown, never none.
- **Explicit absence.** Where absence is a caller's reading it is the caller's test, not a reader's catch: the seat gives a moved-away file no classes by `isFile` before it calls `classesOf`, which throws on a file the tree does not hold; an npm script's package is tested by `isFile`, and a missing one is the graph's `unresolved` violation.
- **What still catches** (none swallows a read): the seat's lock (a racing `owner.json`, a dead pid, a lock that is not ours), its server poll and teardown, the Playwright run whose verdict is the report's, the π verifier's exit; `surface.mjs`'s import (re-thrown with the key); the parse checks that return the parser's message as a refusal (`lib/syntax.mjs`, `scan/css.mjs`'s `css-parse-error` violation, `graph.mjs`'s `parse-error`); the record and ledger reads (re-thrown with the path); `cascade verify`'s coverage arm (read as `RED` with its message); and `scan/text.mjs`'s JSON-string decode of a token, which keeps the raw token when its escapes are not JSON's.

## Tree rows

Each row is an all-or-nothing, idempotent transaction (`rows/lib.mjs`): an op whose result is already in place reports `applied`; a row whose ops are all applied is a no-op; a partly applied row throws; a row whose staged text does not parse throws before its first write (P5-F4, `lib/syntax.mjs`). Rows run only in a linked worktree.

| row | change |
|---|---|
| `r1-register-retire` | R-1 (P4-F1): `scripts/gate-register.mjs` and `tests/gates/gate-register.test.ts` retire with the register, first, before any structure row or move (W-REGISTER-COLLAPSE's retire; the fresh roster is that wave's). No route chain carries it |
| `f3-entry-record` | the record is the one entry source; style roots come from the record, not a masked `existsSync` (F-3); CSS entries ship at their mirror paths, so the row writes no dist-name step (P5-F2) |
| `f4-terminal-role` | the declared terminal replaces the masked anchor fallback (F-4) |
| `m02-overlay-host` | S-8: `participation.ts` owns `OverlayHost` and `DockHoldKind` and a kernel context key |
| `m03-roving-move.json` | `useTabRovingFocus.ts` moves to `src/composables/motion/morph/`, by the tree's own move engine |
| `f9-wire` | `tests/gates/floor.test.ts` runs `gates.mjs` under `npm test` |
| `fd6-harness` | `tests/harness/source.ts` (`files`, `read`, `edges`): the source walkers skip `__tests__/` and read files only; `easing.contract` and the two sortable-list battery walkers use it |
| `fd7-programs` | the declaration program replaces `tsconfig.build.json` (deleted); vitest collects `src/**/__tests__/*.test.ts`; `demo.css` gets `@source not "../src/**/__tests__"`; the style watch entry goes |
| `fd11-land` | the floor runtime moves to `scripts/structure/`, its eight readers re-point, `scripts/import-dag.mjs` and its two ledger rows are deleted |

## Anti-vacuity

- **The plant batteries.** `plants/graph-plants.mjs` (59: the pass-1 critics' 35 and the floor's 24), `../pass-3/plants/p3-graph-plants.mjs` (18) with `../pass-3/plants/p3-tree-plants.sh` (the tree half), and `../pass-4/plants/p4-tree-plants.sh` (11 tree plants: F0 the 10.1.0 pin, F1..F7 one per item, F2u the undeclared glob delta, F47 the chip band's base-green count and F48 the property readback that refutes the accent-tone rung), and `../pass-5/plants/p5-tree-plants.sh` (6 tree plants, one or two per P5 item: F1 the floor's own cycles, F2 the theme move at its real dist path, F2d a declared dist name refused, F3 a reorder outside the listed rung, F4r a row and F4m an engine move that write an unparsable file; plus R7 and R48, pass 4's F7 and F48 re-issued with rule-set listings), and `../pass-6/plants/p6-tree-plants.sh` (9 readings, one or more per P6 item: F1 the route's Timeline → TimelineMarks split listed GREEN and unlisted RED, F1v the split with a value changed RED, F1m a pure scoped-SFC move identical; F2 the carved chip readback spec counted as evidence from two real seat runs, F2g the spec moved out from under the report failing loud; F3a, F3l an absent and a malformed ledger stopping the graph, F3r an unreadable style file stopping the graph, `classesOf` and the selection), each run against the previous floor and this one. The floor's plants are not an independent battery: each route's critic still writes its own.
- **The surface pin** makes any growth or loss of a door or a name a reviewed diff.
- **The gates** run under `npm test` through row `f9-wire`.

## Declared limits

- A read computed at run time is census; it is covered where the values it iterates are spelled as repo paths.
- A scanner's sensitivity is not known to the engine: every scan delta is declared, and the test run judges the declaration.
- An embedded or base-relative path that resolves against nothing the file reads is census.
- A colocated test imports `vitest` explicitly (the lib program has no vitest globals).
- F-1 reads a Playwright program from string-literal `testDir` / `testMatch` only; `testIgnore` is not modelled (the tree's only ignore is `node_modules`, which the tree walk skips).
- A class recipe is a string literal in `src` with two or more class-shaped tokens; a class assembled at run time is not a recipe. F-10's `classes` arm and FD-4's co-occurrence read only these recipes.
- FD-4's specificity counts a functional pseudo-class's argument as written (`:is()`, `:not()`, `:has()` do not resolve to their most specific branch); `:where()` counts 0.
- P5-F4 parses scripts, SFCs, CSS and JSON. Markdown, shell, HTML and YAML writes are not parsed. The check is syntax only: a write that parses and does not type-check is the typecheck's to find.
- A route's own writers (a kit's exact-text edits engine, as B's S34) are outside the floor. They call `lib/syntax.mjs`'s `unparsed` on their staged texts to get the same refusal; the floor's row transaction and move engine already do.
- P5-F3's moved set is the complement of one longest kept subsequence. When two subsequences are equally long the verifier's choice is deterministic, and a listing is written from the verifier's own `UNLISTED` output, so the two agree.
- P6-F1 labels a scope by its SFC's basename. Two SFCs of one name that both scope rules make the verifier throw; HEAD has 16 scoped SFCs, all distinct. A move that also renames an SFC reads as `content` until a `scopes` declaration names the rename.
- P6-F1 reads the scope id `@vitejs/plugin-vue` gives by default in a production build. A dist built with `componentIdGenerator` set, or in dev mode, carries ids no SFC hashes to, and the snapshot throws.
- Vue's `v-bind()` CSS vars are not modelled: no SFC in `src` or `demo` uses one, and the dist carries none. In a production build such a var is named `hash(id + expression)`, so it would change with a move and read as `content` (RED, the safe direction).
- FD-4 accepts a risky listed reorder on the evidence that a spec reading it ran green against a green base. That is the registry's rule (§P3-8.3); it is not a proof of value identity, which only a computed-style readback of the property on a wearer gives.
