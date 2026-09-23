# D1 · pass 1 · D1-C-proto: the workspace-package carve on the whole tree

| field | value |
|---|---|
| seat | D1 pass-1 prototype seat for family D1-C |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `2b188e72`; the worktrees came up at `7362b3bf`. `git diff --stat 2b188e72 7362b3bf -- src demo tests tests-visual scripts package.json package-lock.json 'vite*.ts' vitest.config.ts 'tsconfig*.json'` is empty |
| inputs | `SPECS.md` (§D1-C and the shared facts only), `D1-C.md`, `CHARTER.md` (the last four paragraphs), `X.md` §3.1 and §6.1 (the tooling split C.5 cites) |
| instruments | `$P` = `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-C-proto`. Two worktrees: `head` (clean HEAD) and `wt` (carved). Each has a `node_modules` symlink farm (`tools/farm.mjs`), so Vite, vitest and npm caches stay in the worktree. `tools/pipeline.sh` rebuilds `wt` from HEAD with no hand edits; `tools/final.sh` runs the whole battery and every comparison. Both worktrees were removed before return |
| load | load average 29-69 from other sessions. Build and typecheck timings are paired back-to-back runs |
| status | **RUNS.** Every build, typecheck, pack and verifier is green. The gate is RED at HEAD and **not GREEN** on the migrated tree (3 of 10 counters, all residue named in §5) |

## 0 · Result in brief

- The carve runs end to end on `src/`, `demo/`, `tests/`, `tests-visual/`, `scripts/` and the root build modules, by script. It produces 18 library packages, 6 tooling packages and 132 relocated tests. It rewrites 1,346 specifiers, 354 path literals and 9 location-derived repo roots.
- Typecheck (both programs), the library build, the demo build, `regen-exports`, `npm pack` and `verify:package` all pass. `verify:package` first needs the deliberate `.bundle-ratchet` rebind the spec predicts.
- The published surface is unchanged:
  - 68/68 export keys and 62 `typesVersions`, byte-identical;
  - 1,279 declaration symbols and 603 runtime names, 0 entries differ;
  - top-level dist identical;
  - the bundled `./styles` cascade matches rule for rule (1,773 rules).
- The accessibility reorder the research seat found (Q3) does not occur. The terminal anchor is now a declared role that resolves through `exports`, and a missing anchor throws instead of falling back.
- Gate at HEAD: RED. Migrated: C1, C1b, C3, C4, C5, C8 and `unresolved` are 0. Three counters stay red: C2 1, C6 1, C7 90. Every planted violation adds exactly its own clause.
- vitest: 29 test files fail above HEAD's baseline, against the research seat's 76 above its own (82 in all). 26 of the 29 are exactly the files C7 flags. The other 3 are couplings no import-graph gate sees.

---

## 1 · The placement law as run

| # | step (script) | measured |
|---|---|---|
| 1 | **src → packages** (`carve.mjs`): the charter sketch, the 5 atom placements and the 3 file re-homes from SPECS C.1 | 646 files moved, 1 deleted (the dead `components/index.ts`). The aggregate keeps `src/index.ts`, `src/styles/{index,fonts,theme}.css` and `src/fonts/`. Placement inside a package keeps the source path below `components/`, `composables/` or `styles/` (C.6: the family defines none) |
| 2 | **tests → `<pkg>/test/`**: the subject set of a test is its imports plus its static literal reads (an extension of the research rule). A test moves when that set names exactly one package and it imports no helper | 132 moved (130 into `packages/*/test`, 2 into `tooling/styles/test`); 117 stay in `tests/`. The research rule gave 140 and 107 |
| 3 | **scripts + root build modules → `tooling/<t>/src`** (X §6.1) | `exports` 5 (policy, regen, flatten, verify, `vite.library.ts`); `styles` 10 (gen-component-styles, minify-css + `.d.mts`, regen-spring-tokens, the five `vite.*` modules); `graph` 2; `release` 1; `capture` 2; `workspace` (new, 72 + 7 lines). `paint-arm` → `tests-visual/lib/`; `gate-register` and `comment-census` → `tests/gates/`; `canon-doc` deleted. `scripts/` is gone; the root keeps `vite.config.ts`, `vite.iter.config.ts`, `vitest.config.ts` |
| 4 | **specifiers**: the TypeScript lexer (`preProcessFile` spans, verified against the text) plus a regex for CSS | 1,346 rewritten: src 496, demo 370, tests 449, tests-visual 10, scripts 7, root build 14. After: 1,198 workspace specifiers, 0 holes. `@glass/…` becomes a door, or `#glass/index` for the aggregate barrel. `@mkbabb/glass-ui/fourier-math` becomes a relative import inside `procedural` |
| 5 | **path literals** (the AST; new here) | 354 rewritten (tests 321, scripts 25, tests-visual 3, build modules 5). A static literal naming a moved file or single-package dir becomes `sourcePath("<package>", "<path in package>")`, a workspace-relative path resolved by package name. `resolve(__dirname, "…")` and `fileURLToPath(new URL("…", import.meta.url))` become `resolve(workspaceRoot(), sourcePath(…))`. 9 location-derived roots become `workspaceRoot()`. 97 literals are left for hand repair (§5) |
| 6 | **manifests** (`manifest.mjs`), all derived | 24 `package.json`: `exports` = doors reached; `dependencies` = edges used; `peerDependencies` = externals used, at the aggregate's range; `directories.lib`; `bin` on tooling. 18 `tsconfig.json` with references derived from dependencies. 24 README. `tsconfig.packages.json`. `entries.json`. **70 files, 1,790 lines** |
| 7 | **entry map** (`entries.mjs`) | `entries.json` is `name → specifier` (`#glass/index`, `@glass-ui/<p>/<key>`), 63 entries. 2 doors were added for entries nothing else imports (`tokens/tokens`, `procedural/blob/config`). A missing door fails the resolution; no classifier |
| 8 | **lockfile** | `npm install --package-lock-only --offline` in 0.5 s: +48 entries (24 packages × 2), and 120 existing entries lose `dev: true` |
| 9 | **machinery** (`machinery.mjs`; every anchor must match, or the script stops) | net −422 lines over 18 files (4,688 → 4,266): `subpath-policy` 390 → 97, `regen-exports` 211 → 49, `vite.style-fold` +32, `vite.style-assets` +14, `flatten-subpath-types` +15, configs −30. Details in §4 |

**Door policy.** The prototype runs the per-file form, the only one a codemod can produce. Of the 253 library doors:

| reached by | doors |
|---|---:|
| library code (package src, the aggregate, entries) | 172 (67 index barrels, 41 CSS, 62 modules, 2 `.vue`) |
| the demo only | 22 |
| tests outside the package only | 56 |
| tooling (`vite.dark-stamp` → `darkModeSyncScript`) | 1 |
| nothing (`./html-attributes` via `types`; 1 unreached module) | 2 |

So 78 doors (31%) exist only for the demo and for multi-subject tests. The barrel form is still unmeasured. There are 58 library dependency declarations (the research seat's 58), 7 tooling ones, and 50 peer declarations.

---

## 2 · The battery against HEAD

| check | HEAD `7362b3bf` | carved tree |
|---|---|---|
| `vue-tsc --noEmit` | 0 errors; 17.7 s (`logs/tc-head.log`) | 0 errors; 7.1 s (`logs/tc-wt.log`); 9 s inside `final.sh` |
| `vue-tsc -p tsconfig.test.json` | 2 × TS2307 before a build (`FourierField.smoke.test.ts:18,19`, the `@mkbabb/glass-ui/fourier-math` self-reference resolves to `dist`); 0 after, 8.4 s | 0 with no build needed, 7.4 s |
| typecheck coverage of library `.ts`/`.vue` | 495/495 under `src/` | 494/494, after `packages/*/src/` joined `tsconfig.json` and `tsconfig.src.json` (break 7) |
| `npm run build` | green; 7.4 / 7.6 / 8.2 s | green; 9.0 / 9.6 s warm; **36.1 s cold** (`.tsbuild` removed) |
| `vue-tsc -b tsconfig.packages.json` | — | no-op 0.59 s; a kernel edit 5.5 s; its revert 6.6 s |
| `npm run demo:dist:build` | green | green |
| `regen-exports` | EXACT, 68/68, 62 JS subpaths | EXACT, 68/68, 62; `--break-fidelity` exits 1 |
| vitest | 239 files, 1 failed (`menu/contract`, focus restore, flaky under load); 2,324 tests | 239 files, 30 failed = 29 structural + the same `menu/contract` flake; 2,192 collected (7 files fail at load, 132 tests uncollected); 90 failed tests |
| `npm pack --dry-run` | 841 entries; 1,023,942 B packed; 2,916,129 unpacked | 840 entries; 1,025,325 B; 2,918,478 |
| `npm run verify:package` | CLEAN (193 claims, 454 declarations, 124 CSS, roster 289/289) | `G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2918478 > 2916129`. After the rebind: CLEAN (193, 453, 124, 289/289) |
| gate | RED | RED (§3, §5) |

**Public surface.**

| check | result |
|---|---|
| exports and `typesVersions` | 68 keys: same order, same targets, byte-identical. 62 `typesVersions`, identical |
| published manifest fields | `files`, `sideEffects`, `peerDependencies`, `types`, `dependencies` are unchanged. Changed: `workspaces` +2 globs; +22 `@glass-ui/*` devDependencies; `imports: {"#glass/*": "./src/*.ts"}`, which points outside `files`; three scripts now call bins |
| dist file list (`distdiff.mjs`) | 837 → 836. Top level: 218 = 218 once chunk hashes are normalised. Of 619 nested files at HEAD, 610 move to `dist/<pkg>/…`, 1 is gone (`dist/components/index.d.ts`, the dead barrel), and 0 are new |
| bytes | dist +1,513 B, the research seat's full-carve figure. Scoped `data-v` and keyframe suffixes hash the path |
| symbols (`surface.mjs`) | 63 declaration entries, 1,279 symbols; 63 JS entries, 603 names. 0 entries differ; 0 dist diagnostics |
| cascade (`cascade.mjs`, lightningcss bundle, scoped hashes normalised) | `styles/index.css` 1,773 = 1,773 rules; `component-styles.css` 364 = 364; `theme.css` and `fonts.css` identical. The last imports of `dist/styles/index.css`: `../glass-ui.css`, `./components.css layer(components)`, `../tokens/accessibility.css` |
| demo CSS (`democss.mjs`) | 2,242 → 2,243 selectors, 0 lost. One new selector, `.\[glass-ui\:dock\]`: `dockContext.ts` moved under a scanned `_shared/**` glob |
| C5 | 0 files in `dist` carry `@glass-ui/` |

---

## 3 · The gate

`node $P/tools/gate-packages.mjs <repoRoot> [--json]`: 219 lines, 1.1-1.6 s.

- **Input.** It reads the root manifest's `workspaces` (`packages/*`, `tooling/*`, `tests-visual`) and scans `src`, `demo`, `tests`, `scripts`, every workspace package and the root code files: 1,267 files.
- **Lexer.** The TypeScript AST covers import/export, `import()`, `require()`, `import type`, `vi.mock` and `import.meta.glob`. `declare module` augmentations are not edges. String literals feed C7. A comment-stripped regex reads CSS `@import` and `<style src>`.
- **Unresolved edges.** A relative, `#` or workspace specifier that resolves to nothing is a failure.

| clause | invariant | against the spec |
|---|---|---|
| C1 | `src/` holds only the aggregate | as specified |
| C1b | no `scripts/`; the only root code files are the three configs | added: the tooling layout |
| C2 | no relative edge (module, `<style src>`, CSS `@import`, glob base) leaves its package root | glob base added |
| C3 | every `@glass-ui/<p>[/<key>]` is declared and is a door of `<p>`; every declared workspace dependency is used by non-test source | now also reads `tooling/*` (the spec's delta) |
| C4 | the declared graph is acyclic, and each `packages/*` tsconfig's references equal its dependencies | as specified |
| C5 | no `dist/` file carries `@glass-ui/` | as specified |
| C6 | `packages/*`, `tooling/*`: every external import is a peer (tests: peer or dev) at the aggregate's range; no external `dependencies`; no unused peer | built (the spec listed it as unbuilt) |
| C7 | no string literal naming `src/`, `packages/<p>/src` or `tooling/<t>/src` outside library source, unless it is relative and stays in its own package. Type positions and strings with whitespace are skipped | built |
| C8 | no self-reference by package name, no `@glass` alias specifier or declaration, no `development` condition | built, widened to clause 5 of the rule |

**RED at HEAD** (the `head` worktree, exit 1; condensed from `logs/gate-head-final.json`; the executable prints the first four failures of each clause):

```
gate-packages: 1 workspace package(s), 1267 files scanned, 0 workspace specifiers
  C1: 647   C1b: 23 (scripts 17, root build modules 6)   C2: 11 (tests-visual: 8 → scripts/lib/paint-arm, 3 → src and demo)
  C3: 0   C4: 0   C5: 0   C6: 0
  C7: 443 in 95 files (tests 374, scripts 56, vite.style-fold 7, tests-visual 3, demo config 1, vite.config 1, utility-emit 1)
  C8: 804 (797 @glass specifiers, 2 self-references, 4 alias declarations, 1 development condition)
  unresolved: 0
FAIL
```

**Migrated tree** (exit 1; `logs/final/gate.log`, failure lines omitted; they are the three §5 rows):

```
gate-packages: 25 workspace package(s), 1267 files scanned, 1198 workspace specifiers
  C1: 0  C1b: 0  C2: 1  C3: 0  C4: 0  C5: 0  C6: 1  C7: 90  C8: 0  unresolved: 0
FAIL
```

**Plants** (`plant.mjs`). One violation per clause on the migrated tree, gate re-run each time, then restored. The counts returned to baseline.

| clause | planted | gate delta | line added |
|---|---|---|---|
| C1 | `src/stray.ts` | C1 +1 | `src/stray.ts` |
| C1b | `scripts/stray.mjs` | C1b +1 | `scripts/stray.mjs` |
| C2 | **relative deep import**: `packages/overlay/src/dialog/index.ts` re-exports `../../../kernel/src/_shared/class-names` | C2 +1 | `… (packages/overlay) -> packages/kernel/src/_shared/class-names.ts (packages/kernel) via module "../../../kernel/src/_shared/class-names"` |
| C3 | kernel imports `@glass-ui/overlay/dialog` undeclared (closes a real cycle) | C3 +1 | `packages/kernel/src/_shared/class-names.ts (packages/kernel): imports @glass-ui/overlay without declaring it` |
| C4 | the same import, declared in kernel's `dependencies` and `references` | C4 +3 | `dependency cycle: @glass-ui/kernel -> @glass-ui/overlay -> @glass-ui/kernel` (and the two via motion and surfaces) |
| C5 | `dist/leak.js` re-exports `@glass-ui/kernel/_shared/axes` | C5 +1 | `dist/leak.js` |
| C6 | dock imports `@floating-ui/core` (a real phantom: reka-ui's dependency) | C6 +1 | `@glass-ui/dock: src imports @floating-ui/core without declaring it` |
| C7 | a test holds `"packages/overlay/src/dialog/styles.css"` | C7 +1 | `tests/public-surface.spec.ts:1033 "packages/overlay/src/dialog/styles.css"` |
| C8 | a test imports `@mkbabb/glass-ui/dialog` | C8 +1 | `self-reference "@mkbabb/glass-ui/dialog"` |
| unresolved | overlay re-exports `./does-not-exist` | unresolved +1 | `packages/overlay/src/dialog/index.ts: module "./does-not-exist"` |

On the same tree, `vue-tsc -b tsconfig.packages.json` compiles the C2 and C3 plants with **0 errors**. This re-measures D1-C P3 and P2: the gate is what stops them.

---

## 4 · Every break, in the order hit

| # | break | symptom | fix in the pipeline |
|---|---|---|---|
| 1 | Vite's config bundle externalizes a bare workspace import, so Node loads tooling `.ts` by type stripping | `ERR_MODULE_NOT_FOUND … tooling/styles/src/vite.style-fold`, imported from `vite.style-assets.ts` | explicit `.ts` extensions on the 3 relative imports inside tooling TS (Node-native TS) |
| 2 | a source root inferred from the common prefix of `exports` targets | all of gpu's doors sit under `src/glass/`, so the relinker wrote `./gpu/index.js`: `dangling declaration reference` | each manifest declares `directories.lib`; the aggregate's root comes from its `imports` map. Undeclared throws |
| 3 | a location-derived path to a root data file | `verify-export-types` read `new URL("../package-lock.json", import.meta.url)`, giving `ENOENT tooling/exports/package-lock.json` | root data files became literal targets; the literal is re-relativised |
| 4 | bins without a shebang | `glass-profile-bundle` ran under the shell, which called ImageMagick's `import` (`delegate library support not built-in (X11)`); `glass-safari-probe` likewise | shebangs added; `reflect-capture-verify` (a library, not a CLI) has no bin |
| 5 | main-module guards compare `argv[1]` (the `.bin` symlink) with the real path | `npm run verify:package` and `glass-regen-spring-tokens` **exit 0 and do nothing** | guards compare `realpathSync(argv[1])` |
| 6 | `.bundle-ratchet` binds exact unpacked bytes | `G-BUNDLE-RATCHET … 2918478 > 2916129` | a deliberate rebind to 2,918,478 (`final.sh`, logged). Every carve owes one |
| 7 | the root program no longer globs library files | 9 files, among them the `./motion`, `./tokens` and `./blob-config` entry sources, were typechecked only by the build's `-b` | `packages/*/src/` added to the `include` of `tsconfig.json` and `tsconfig.src.json`: 494/494 |
| 8 | `ts.preProcessFile` over-reports | it reports `declare module "@vue/runtime-core"` and `@import "${themePath}"` inside a template string (`vite.utility-emit.ts:128`) as imports; 2 files at HEAD differ from the AST (`cmp-lexers.mjs`) | the gate and the manifest generator use the AST. The carve's rewrite was unaffected (both hits are bare specifiers) |
| 9 | scanners rooted in `src` | 26 test files fail (ENOENT, or assertions over a thinned set); `import-dag` drops from 842 nodes / 2,294 edges to 195 / 487 **with exit 0** | none mechanical (§5) |
| 10 | a sha-pinned roster in `docs/` names moved test paths | `gate-register`: `sourcePath missing — tests/components/chip.contract.test.ts`; 5 of its 8 type rows are now outside `tests/` | none. The roster is a closed record |
| 11 | a test asserts specifier text in demo source | `code-block.test.ts` expects `@glass/components/card` in the raw SFC | none |
| 12 | a test reads a dist-internal path | `font-serif-math-dist`: `ENOENT dist/styles/typography/utilities.css` (now `dist/tokens/typography/…`) | none |
| 13 | a test matches demo `@source` text by regex | `picker-lane.test.ts:131` expects `@source "../src/components/**/*.ts"` | none (it also holds C7 scanner roots) |
| 14 | the M02 cut moves `DOCK_CONTEXT_LABEL` | inside the carve, an anchored fix-up that stops if its anchor misses | applied |
| 15 | the lockfile's dev flag | 120 entries lose `dev: true`, because the private packages' peers count as production dependencies of workspace packages | recorded, not changed |
| 16 | the published manifest | it gains `imports` to `./src/*.ts`, outside `files`; inert in dist, but visible | recorded |

The research seat's patches carried over:

- style closure through `exports`;
- package CSS copied to `dist/<pkg>/` and relinked;
- declaration relinker;
- `vue-tsc -b` with `tsBuildInfoFile` inside `outDir`;
- the post-copy passes rooted in the package list;
- `@source` globs.

They were rewritten against `@glass-ui/tooling-workspace`. There are no literal package roots, and the accessibility anchor is `STYLE_ROLES.terminal`.

---

## 5 · The residue: why the migrated tree is not GREEN

| counter | count | what it is | carried from HEAD? |
|---|---:|---|---|
| C2 | 1 | `tests-visual/_aur-vangogh-harness.ts` imports `../demo/stories/substrates/aurora/presets`: a workspace package reaching into the root app | yes (it is one of HEAD's 11) |
| C6 | 1 | `packages/kernel/src/html-attributes.d.ts` has `import "@vue/runtime-dom"`, which neither kernel nor the aggregate declares | yes (a phantom at HEAD, visible once C6 exists) |
| C7 | 90 | literals the codemod cannot map to one package, in 35 files (below) | yes (the HEAD literals that do not reduce to one package) |

The 90 C7 literals, by kind:

| kind | literals | files |
|---|---:|---:|
| scan roots in tests: `"src"`, `"src/styles"`, `"src/components/dock"` (split by the dockContext re-home), `["src","demo"]`, `join("src","styles",…)` | 57 | 32 |
| fixtures (paths that exist nowhere: `"src/z.ts"`, `"src/styles/planted-orphan.css"`, a deleted-file assertion) | 9 | 4 |
| prefix comparisons (`startsWith("src/components/")`) | 3 | 2 |
| tooling scan roots, templates and fixtures (`import-dag.mjs` 20, `profile-bundle.mjs` 1) | 21 | 2 |

- 26 of the 29 failing test files are C7 files.
- 9 C7 files still pass while reading only the aggregate's `src`. Among them:
  - `comment-ratio` and `comment-census`;
  - `trap-gates` and `token-bridges`;
  - `easing.contract`;
  - `import-dag`, which still exits 0 at 195 nodes.

  The gate is the only signal that they have gone blind.
- Rewriting `"src"` to the aggregate's source path would turn C7 green and leave every scanner reading index.ts and three CSS files. That would be a masking fix, so the codemod does not do it.
- The right target is a `libraryPackages()`-rooted scan. The helper already exports that list, but each scanner's filters (`startsWith("src/components/")`, relative-path keys) have to be re-authored.

---

## 6 · Against SPECS C.4 and the research seat

| item | research (`wt2`) | this prototype |
|---|---|---|
| specifiers rewritten | 1,327 | 1,346 (+ 354 literals, + 9 roots) |
| tests moved / staying | 140 / 107 | 132 / 117 (subject set includes literal reads) |
| doors | 237 | 253 library + 12 tooling |
| library dependency declarations | 58 | 58 |
| failing test files | 82 (76 above HEAD's 6) | 30 (29 above HEAD's 1; the `menu/contract` flake fails in both) |
| published `./styles` order | reordered (a11y rules earlier) | identical |
| gate clauses built | C1-C5 | C1-C8, C1b, `unresolved`, over `tooling/*` |
| new config | 40 files, 1,565 lines | 70 files, 1,790 lines (READMEs, 6 tooling manifests, `directories`) |
| machinery | +85 / −24 | net −422 (the classifier and regen's classification layer deleted) |
| build | per-package emit 14.9 / 17.4 s against HEAD 9.9 / 9.2 s; with `-b` cold 23.0 s, a kernel edit 23.9 s | `-b`: cold 36.1 s; warm 9.0 / 9.6 s against HEAD 7.4 / 7.6 / 8.2 s; a kernel edit 5.5 s |

**SPECS C.6 gaps this prototype moves:**

- Door policy: measured (§1). The barrel form is not.
- A resolver-based replacement for the literal paths: 354 literals and 9 roots are mechanical. What remains is the 90-literal scanner and fixture set.
- The anchor inventory: C7 at HEAD lists every string anchor (69 outside tests). `regex-anchors.mjs` adds the 3 regex anchors C7 cannot see:
  - `flatten-subpath-types.mjs:117` `/^src\//`;
  - the accessibility regex in `vite.style-fold.ts:90`;
  - `picker-lane.test.ts:131`.
- Broken tests: from 76 above baseline down to 29, each one classified (§4 rows 9-13, §5).

**Still open:**

- granularity (`procedural` and `tokens`);
- placement inside a package;
- CI under workspaces (`npm ci` was not run);
- demo and tests-visual as `apps/*`, which is what C2's residue needs;
- C′ publishing;
- the sibling-backend carry;
- the E-8 budget;
- the `vue` versus `@vue/runtime-dom` augmentation target, which is C6's residue.

---

## 7 · Artefacts (scratch, `$P`)

| path | content |
|---|---|
| `tools/pipeline.sh`, `tools/final.sh` | fresh worktree → carve → manifests → links and lock → machinery → entry map; then the battery and the comparisons |
| `tools/carve.mjs` (332), `tools/manifest.mjs` (109), `tools/machinery.mjs` (217), `tools/entries.mjs` (18) | the migration |
| `tools/helper/workspace.mjs` (72) + `.d.mts` | `@glass-ui/tooling-workspace`: `workspaceRoot`, `workspacePackages`, `libraryPackages`, `sourcePath`, `resolvePackageSpecifier`, `distMember` |
| `tools/gate-packages.mjs` (219), `tools/plant.mjs` | the gate and the plant battery |
| `tools/{distdiff,surface,cascade,democss,cmp-lexers,regex-anchors}.mjs` | the comparisons |
| `logs/head/`, `logs/final/`, `logs/carve-report.json`, `logs/manifest.json`, `logs/machinery.json` | every run cited above |
| `artefacts/carved-config.tgz` | the generated manifests, tooling and patched configs |
