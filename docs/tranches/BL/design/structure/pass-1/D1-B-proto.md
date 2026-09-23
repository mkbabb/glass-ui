# D1 · pass 1 · D1-B-proto: the door law on the whole tree

| field | value |
|---|---|
| seat | D1 pass-1 prototype seat for family D1-B (sealed modules) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `2b188e72`; the worktrees came up at `7362b3bf`. `git diff --stat 2b188e72 7362b3bf -- src demo tests tests-visual scripts package.json package-lock.json 'vite*.ts' vitest.config.ts 'tsconfig*.json'` is empty |
| inputs | `SPECS.md` §D1-B (lines 308-543) and the shared facts; `D1-B.md`. The other families' specs were not read |
| instruments | `$P` = `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-B-proto`. `$P/gate/` is the gate (`door-gate.mjs` 138 lines, `trace.mjs` 211, `mutate.mjs` 42). `$P/migrate/` is the migration (17 scripts, 1,245 lines), `$P/bin/` the runners, `$P/logs/` every measurement cited here. Two worktrees at HEAD: `head` (clean, built) and `wt` (migrated), `node_modules` and `tests-visual/node_modules` symlinked from the repo. A third, `stage`, replayed the migration for §1 and was removed. All were removed before return |
| load | load averages 28-46 during the close (`uptime`), from other sessions |
| status | **RUNS, not to GREEN.** On the migrated tree, `regen-exports` is EXACT, the library build, the demo build and `npm pack` exit 0, and vue-tsc reports 0 errors on both projects. The 68 export keys and `typesVersions` are byte-identical to HEAD. The gate goes from 805 (exit 1) at HEAD to 7 (exit 1): R0-R5 are 0, and R6 holds 7 files over 500 lines that need authored carves. vitest: 109 tests fail in 30 files and 2 suites fail to collect (HEAD: 3 timeouts). Two regressions the suite misses or only partly sees: a cascade reorder of the terminal accessibility block, and the demo's eager boot graph growing by 207,621 B |

## 0 · Result in brief

- **The placement law ran by script** on `src/`, `demo/`, `tests/`, `tests-visual/` and `scripts/`, with no hand moves:
  - the 9 corroborated families;
  - the four inversions;
  - the S3 sub-module doors;
  - S5 test colocation;
  - the scripts domains;
  - door growth and rerouting;
  - CSS doors;
  - a lexical file carve and a directory carve.

  Against HEAD, 541 tracked paths are gone and 593 new paths exist (`git status --porcelain` in `wt`). A further 282 files were edited in place.
- **The replay is byte-identical.** Running the pipeline again from a clean HEAD worktree (`bin/staged.sh`) gives a tree with no differences from `wt`: `diff -rq` reports 0 lines, excluding `node_modules`, `dist`, `.git` and build caches.
- **The gate is RED at HEAD, and every plant is caught.** HEAD fails with 805 violations. The migrated tree passes R0-R5, and R6 still fails on 7 files. I planted 13 violations, one or more per rule. The plants include:
  - a relative-path deep import;
  - the same reach through the `@glass` alias and through the `/src/` URL form;
  - a type-only reach;
  - an own-door import.

  All 13 were caught, each with exit 1, and the tree came back to the baseline afterwards.
- **What the gate cannot see.** The terminal accessibility block moved from cascade rung 1919 to 1243, because a regex anchor in `vite.style-fold.ts:90` stopped matching. No test caught this. The demo's eager graph also grew by 207,621 B, because leaf imports now resolve through family doors. `boot-graph.test.ts` does catch that one.

---

## 1 · The law as run

`bin/staged.sh` replays `bin/pipeline.sh` step by step in a fresh worktree and runs the gate after every stage (`logs/staged-gate.txt`). Stage counts come from each script's own JSON output (`logs/pipeline-full.log`, `$P/*.log`).

| # | stage (script) | what it did | gate after (R0 R1 R2 R3 R4 R5 R6) |
|---|---|---|---|
| 0 | HEAD | | 0 382 371 16 2 2 32 = 805 |
| 1 | placement (`plan.mjs` → `apply.mjs`) | 500 moves, 2 deletes (`src/components/index.ts`, dead `scripts/lib/canon-doc.mjs`), 16 creates (family doors). Tests: 170 colocated, 51 stay in `tests/` (they span modules), 27 stay (no `src` target), 6 placed by subject. Specifiers rewritten on the AST, keeping their style | exit 2: `subpath-policy: 9 unclassified dir(s)` |
| 2 | inversions (`patch-inversions.mjs`) | `participation.ts` owns `DockHoldKind`, `OverlayHost` and `provideOverlayHost`; `dockContext` provides and `useDockState` imports from it | exit 2 (same) |
| 3 | config (`patch-config.mjs`) | vitest includes `src/**/*.{test,spec}.ts`; the tsconfigs exclude or include test suffixes; `subpath-policy` classifies the families, drops `search` and gains `NESTED_COMPONENTS` (33) | 0 375 165 36 1 2 32 |
| 4 | kernel doors (`doorify.mjs kernel`) | S7: 7 importers split to the origin; 19 family-owned re-exports stripped from kernel doors | 0 367 165 36 0 2 32 |
| 5 | kind slots (`doorify.mjs kindslot`) | `dock/composables/index.ts` and `infinite-scroll/composables/index.ts` deleted; 6 importers split | 0 366 165 36 0 0 31 |
| 6 | own door (`doorify.mjs owndoor`) | code held in the `alert` and `badge` doors moved to `variants.ts` | 0 364 165 36 0 0 31 |
| 7 | CSS doors (`css-doors.mjs`) | 12 `styles.css` doors, 36 importer edits, 1 rename (`card/styles.css` → `card/card.css`) | 0 364 165 0 0 0 31 |
| 8 | door reroute (`doorify.mjs doors`) | 529 edges rerouted to legal doors; 26 doors grew 226 names; 0 collisions; pass 2 found 0 | 0 0 0 0 0 0 31 |
| 9 | file carve (`carve-files.mjs`) | 5 CSS splits; 13 TS/MJS prefix splits across 12 files, one of them the root door (`src/index.ts` → `index.part1.ts`); 7 files left over | 0 0 0 0 0 0 14 |
| 10 | dir carve (`carve-dirs.mjs`) | 57 moves into 21 sub-dirs, 2 sub-doors (`overlay/menu/sub`, `overlay/menu/radio`), 121 specifier rewrites, 68 path strings in 30 files | 0 5 0 0 0 0 7 |
| 11 | CSS doors again | no change | 0 5 0 0 0 0 7 |
| 12 | door reroute again | 5 rerouted, 2 doors grew 14 names | **0 0 0 0 0 0 7** |

Notes on the stages:

- **Stages 1-2.** The gate exits 2 until the policy classifies the new family dirs. The entry map comes from `subpath-policy`, and it refuses unclassified dirs. That is correct: it fails loudly rather than guessing.
- **Stage 3.** R4 goes 2 → 1 once the inversions land; the remaining cycle is the kernel↔family one that stage 4 removes. R2 falls 371 → 165 from placement alone, because colocated tests stop being consumers.
- **Stage 10.** The dir-carve names are placeholders taken from the leading token of the file names: `dock/styles/{shell,run}`, `aurora/composables/{uniform,atoms}`, `aurora/constants/shaders/aurora`, `src/styles/{scroll,glass-group,part-1}`, `src/styles/glass/{control,glass,ladder,liquid,surfaces,part-1}`, `src/styles/tokens/{glass,dark,property,scheme,sizing}`. `part-1` means no shared token was found. Every one of these names needs an authored replacement.

## 2 · The gate as built

`node $P/gate/door-gate.mjs <root> [--scope <dir>] [--max-files 12] [--max-lines 500] [--verbose] [--json <out>]`. It takes 1.2-1.4 s on either tree (`/usr/bin/time -p`). Exit codes: 0 PASS, 1 violations, 2 when the entry map cannot be built.

**Tracer (`trace.mjs`).**
- **Zones:** `src`, `demo`, `tests`, `tests-visual`, `scripts` and the root `vite*.ts` files.
- **Edge kinds:**
  - `import`, `reexport`, `side`;
  - dynamic `import()`;
  - `import.meta.glob` and each file it matches;
  - CSS `@import`, `@source` and `url()`;
  - SFC `<style src>`;
  - `vi.mock`, `vi.doMock` and `importActual`;
  - the TS type `import("x").T`.
- **Resolution:**
  - relative paths, `@glass/*`, the `/src/...` URL form, and the package's own name through the library entry map;
  - a bare package name is external;
  - anything local-looking that lands on no file is marked `UNRESOLVED`.
- **CSS comments** are blanked with string awareness, so `@source "../*.js"` is not taken as a comment opener.

**Rules.** Each rule is judged on the resolved target file, so a relative path, an alias and a URL form are the same case.

| rule | contract as implemented |
|---|---|
| R0 unresolved | any local-looking specifier that resolves to nothing fails. D1-B's text says the gate "fails loud on unresolved"; its draft had no clause for it, and the shared facts say unresolved edges otherwise pass silently |
| R1 door | src→src, and any zone → `scripts/`. `M` is the outermost module that holds the target but not the importer. The target must be `M`'s door or a published door. Also S2: no non-test file imports the door of its own innermost module |
| R2 consumer | `demo`, `tests`, `tests-visual`, `scripts` and the root configs → `src`: the target must be a published door (the entry-map values plus the three CSS entry sources) |
| R3 CSS door | a CSS edge inside `src` that crosses into module `M` must target `M/styles.css` |
| R4 acyclic | value edges are lifted to sibling modules under their lowest common module, at every depth, and must form no cycle. Tests are sinks. Type-only cycles and cycles through loose (door-less) files print as info |
| R5 kind slot | no door inside `composables`, `styles`, `constants`, `shaders` or `utils` |
| R6 bound | every dir under `src/` and `scripts/` holds ≤ 12 direct source files, and every source file is ≤ 500 lines. Tests and `@generated` files are excluded |

**Info lines on the migrated tree:**
- One value cycle through loose files inside `src/composables/motion`. The cycle spans `morph/`, `scroll/`, `route/` and `reveal/`, which are kind-grouped dirs with no doors.
- One type-only cycle between `src/composables/motion` and `src/components/_shared`, through `useSelectionGroup.ts → _shared/index.ts` and `_shared/useMotionAxis.ts → motion/core/index.ts`.

Neither is an R4 violation as specified. Both are listed in §9.

## 3 · Gate proofs

**RED at HEAD.** Command: `node gate/door-gate.mjs head` on a clean worktree (`git status` shows only the `node_modules` symlink). Result: `files=1265 edges=3032 modules=69 published-doors=66: FAIL (805 violations)`, exit 1.

| R0 | R1 | R2 | R3 | R4 | R5 | R6 |
|---:|---:|---:|---:|---:|---:|---:|
| 0 | 382 | 371 | 16 | 2 (the 7-node M02 cycle; sheet↔dialog) | 2 | 32 |

**Migrated tree.** Command: `node gate/door-gate.mjs wt`. Result: `files=1316 edges=3284 modules=91 published-doors=66: FAIL (7 violations)`, exit 1. R0-R5 PASS 0. R6 FAIL 7:

| file | lines | why no script carved it |
|---|---:|---|
| `src/components/track/timeline/Timeline.vue` | 724 | SFC (§8) |
| `src/components/sortable-list/drag.ts` | 632 | one statement is 523 lines long |
| `src/components/easing/EasingPicker.vue` | 627 | SFC |
| `src/components/pager/pager-dots/PagerDots.vue` | 607 | SFC |
| `src/components/dock/GlassDock.vue` | 546 | SFC |
| `src/components/procedural/blob/shaders/metaball.frag.ts` | 531 | one template literal holds the shader |
| `src/components/procedural/blob/shaders/metaball.wgsl.ts` | 529 | one template literal holds the shader |

With `--max-lines 725` the migrated tree passes with exit 0. HEAD at the same bound still fails with 785.

**Mutations.** `node gate/mutate.mjs` plants each violation in `wt`, runs the gate with `--verbose`, and restores from a backup (`logs/mutations.txt`, `mutations.json`). The baseline is R6=7, exit 1. Every plant raises its own rule, and each evidence line names the planted edge.

| # | rule | plant | evidence |
|---|---|---|---|
| 1 | R0 0→1 | `./no-such-module` in `chip/chipVariants.ts` | `chipVariants.ts -> UNRESOLVED:./no-such-module` |
| 2 | R1 0→1 | **relative deep import** `dock/constants.ts` → `../overlay/modal/ModalOverlay.vue` | `(door: src/components/overlay/index.ts)` |
| 3 | R1 0→1 | the same reach via `@glass/components/overlay/modal/ModalOverlay.vue` | same line |
| 4 | R1 0→1 | the same reach via `/src/components/overlay/modal/ModalOverlay.vue` | same line |
| 5 | R1 0→1 | `import type` from `track/slider/composables/dom/useDragVelocity.ts` | `[type] (door: src/components/track/index.ts)` |
| 6 | R1 0→1 | `chip/chipVariants.ts` imports `chip/index.ts` | `(own door, S2)` |
| 7 | R1 0→1 | `tests/styles/minify-css.test.ts` → `scripts/css/minify-css.mjs` | `(door: scripts/css/index.mjs)` |
| 8 | R2 0→1 | `demo/stories/dock/controls.vue` → `src/components/dock/composables/useDockState.ts` (relative) | `[import]` |
| 9 | R3 0→1 | `src/styles/index.css` `@import`s `overlay/sheet/styles.part1.css` | `(css door: src/components/overlay/styles.css)` |
| 10 | R4 0→1 | `_shared` gains a value import of the dock door | `cycle @src [overlay dock _shared]` |
| 11 | R5 0→1 | a `dock/composables/index.ts` door is recreated | also R6 7→8 (the dir now has 13 files) |
| 12 | R6 7→8 | a 501-line `chip/plant.ts` | `501 lines > 500` |
| 13 | R6 7→8 | a 13th file in `sortable-list/` | `13 direct files > 12` |

`restored exit=1 {"R0":0,…,"R6":7}`, and the tail of `index.css` was checked after the restore.

The first mutation run missed plant 9. The tracer had read `@source "../*.js"` as the start of a comment, which hid every later `@import` in that file. Fixing the comment blanking (§2) also exposed 2 `@source` edges that had been hidden. Both are legal, and HEAD still reads 805.

## 4 · Battery

Logs are `logs/head-*.log` and `logs/carved-*.log`, run through `bin/checks.sh`: regen, then build, typecheck, demo build, vitest and pack.

| check | HEAD | migrated |
|---|---|---|
| `regen-exports --check` | EXACT | EXACT |
| library build | exit 0 | exit 0 |
| vue-tsc (main + `tsconfig.test.json`) | 0 errors after a build. In a fresh worktree it exits 2 first, because `@mkbabb/glass-ui/fourier-math` resolves through `dist` | 0 errors, exit 0 |
| demo build | exit 0 | exit 0 |
| vitest | 3 failed, 2310 passed, 10 expected-fail, 1 skipped (of 2324); all 3 are timeouts (`atoms`, `comment-ratio`, `glass-subtlety`) | 109 failed in 30 files, 2165 passed, 10 expected-fail, 1 skipped (of 2285); 2 suites fail to collect (39 tests) |
| `npm pack` | 841 files, 1,023,942 B | 852 files, 1,028,807 B |

Before the carves (stages 0-8, `logs/doored2-*.log`), vitest had 54 failures in 20 files. The file and dir carves account for the other 55.

## 5 · Surface

- **Exports.** The 68 `exports` keys and targets are byte-identical, and so is `typesVersions`. `package.json` differs only in 2 script paths (`profile:bundle`, `verify:package`), which now point at `scripts/census/` and `scripts/publish/`. Every export target exists in `dist`.
- **dist file list** (`logs/dist-head.txt`, `logs/dist-wt.txt`): 837 → 848 files. 413 paths exist only at HEAD and 424 only in the migrated tree.
  - Top-level files: 218 → 191.
  - Hashed chunks: 90 → 62.
  - `dist/components/**`: 425 → 496; `dist/composables/**`: 108 → 74.
  - New: `dist/index.part1.d.ts`, which the root `index.d.ts` needs.
- **Pack.** 841 → 852 files. The tarball goes 1,023,942 → 1,028,807 B, and the unpacked size 2,916,129 → 2,930,605 B.
- **Published names** (`migrate/surface.mjs`, `surface2.mjs`; `logs/surface-diff.txt`):
  - All 63 subpaths are still present. Name slots go 1277 → 1339: +106 (80 of them runtime), −44 (17 runtime). 12 subpaths changed.
  - The −44 is exactly S7's figure: `./motion` −13, `./motion-core` −25, `./color` −3, `./dom` −3.
  - 19 names are now on no published subpath: `useSpringMount` and its 3 types, 5 `DockCtaReceive*` names, `useScrollProgress`, `BLOB_LEAD_K`, `BLOB_STRETCH_GAIN`, `BLOB_STRETCH_MAX`, `AURORA_CURSOR_RADIUS`, 2 `UseScrollChrome*` types, and `useAccentTone` with its 2 types.
  - 25 names lost a subpath but are still published elsewhere: `useDragVelocity` ×3 goes `./dom` → `./index`, `./slider`; the pointer-field set goes `./motion-core` → `./index`.
  - 97 names are newly public. `./blob` +37 comes from `tests-visual` dynamic imports being routed to the door, and includes `useMetaballRenderer` and the shader constants. Also `./aurora` +15, `./motion` +20, `./index` +13, `./dock` +8 and `./slider` +3.

  The rerouting phase grows a door for every consumer reach, so it widens the published API whenever a test or visual spec reaches a private file. Under D1-B, that growth has to be a reviewed decision, not a side effect of the rerouting.

## 6 · Couplings the graph does not carry

- **CSS output** (`migrate/cssdiff.mjs --norm-scope`):
  - `component-styles.css` and `glass-ui.css` are identical once scope-id and keyframe hashes are normalized. Without normalization, 166 blocks differ, because production scope ids hash the file path.
  - In `styles/index.css`, both builds have 1935 blocks. 3 changed (the `@layer` wrapper boundaries of the splits) and 50 fall outside the LCS. gzip: 56,693 → 56,633 B.
- **Reorders** (`migrate/cssmoves.mjs`):

  | block | rung, HEAD → migrated |
  |---|---|
  | `card/scroll.css` (18 blocks) | 683 → 584 |
  | `_shared/menu.css` (5) | 844 → 621 |
  | `scroll-progress-rim` (9) | 1165 → 1069 |
  | the terminal accessibility block | 1919 → 1243 |

  The last reorder is a silent regression. `vite.style-fold.ts:90` anchors on `/^[ \t]*@import\s+["']\.\/accessibility\.css["'];/m`. The dir carve moved the file to `src/styles/part-1/accessibility.css`, so the anchor stopped matching and component CSS no longer comes after it. No unit test caught this. The fix belongs in the anchor, which should be a declared cascade layer or a named import, not a path regex. Until then, any move of that file must go through the style-fold.
- **Demo eager boot graph:** 477,733 → 685,354 B raw (gzip 172,980 → 241,397). The whole `aurora` chunk (214,170 B) became eager. `AppShell` imports the Aurora leaf and `auroraFallbackGround`, and both now resolve through the `procedural` family door, which pulls in the family. `boot-graph.test.ts` catches this (`65 files / 685354 B … ≤ 503808`). The cure is lazy doors or leaf doors per family member. Door-only routing and chunk-level laziness conflict whenever a family door is a barrel.

## 7 · Every break

Of the 109 failing tests, none shows a behavior change in a component. The use-accent-tone timing case below is the closest call.

| class | tests | files |
|---|---:|---|
| CSS text readers broken by the carves and moves: the asserted text now sits in a part, or in a file under a new path | 56 | `g-dock-lattice` 12, `sheet-reach` 11, `coarse-target` 9, `sheet-graded-edge` 5, `orphan-css-partial` 5, `slider.size-tokens` 3, `slider-cursor-affordance` 3, `focus-veil` 2, `focus-visible` 2, `forms-seam` 1, `typed-track-seam` 1, `glass-subtlety` 1, `feedback-motion` 1 (`index.css` no longer names the dot-ring import; it goes through a CSS door) |
| uncollected suites: ENOENT on a moved stylesheet (`tokens/scheme-spring.css` → `tokens/scheme/`) | 2 suites, 39 tests | `route-motion`, `dissolve` |
| colocation: tests now in `src/` trip scans of `src/` that assumed tests live in `tests/` | 20 | `easing.contract` 7, `overfit-structure` 5, `spring-authority` 2, `sortable-list/battery` 2, `type-hygiene` 1 (hits `_shared/cn.test.ts`), `dock-name-canon` 1, `gl-excise` 1, `FourierField.smoke` 1 |
| closed rosters naming moved paths | 11 | `gate-register` 10, `profile-bundle-value-js` 1 (script path) |
| surface pins | 6 | `public-surface` 5 (growth, S7 loss, Blob privates now public), `slider.contract` 1 (`useDragVelocity` joins `./slider`) |
| code moved out of the `alert` and `badge` doors to `variants.ts` | 5 | `radius-role-canon` 3, `mark-register` 2 |
| timing: `useAccentTone` loses the value.js preload the old barrel import triggered | 7 | `use-accent-tone` |
| eager boot-graph ceiling | 3 | `boot-graph` |
| demo raw-source fidelity: the `?raw` text keeps the old specifier while the runtime import was rewritten | 1 | `code-block` |

Breaks outside vitest:

- the accessibility cascade reorder (§6), which no test catches;
- the 19 names that left the published surface and the 97 that joined it (§5);
- the dist chunk topology (90 → 62 hashed chunks);
- `playwright` and the `tests-visual` specs were not run: the browser seats are serialized, and this seat held none;
- the demo's eager graph (§6).

## 8 · Where it stopped and why

The 7 R6 residues cannot be cut without authoring. I tried two mechanical routes, and both were withdrawn:

- **SFC `<style scoped src="./X.css">` extraction.** The build fails: `closure target(s) absent from output — Timeline.css`. The style-fold's closure does not follow `<style src>`. The script is still in `carve-files.mjs` behind `--sfc`.
- **SFC `<template src>`.** It builds, but vue-tsc stops type-checking the template. A planted undefined identifier still gave 0 errors. That hides a dead check, so I rejected it as a masking path.

The other residues:

- **`drag.ts`:** a single 523-line closure, which no prefix cut can split.
- **The two metaball shader modules:** each is one template literal, so only an authored split of the shader (or `#include`-style composition) can bring them under 500.
- **Placeholder names:** every dir the carve produced (§1, stage 10) has a placeholder name, and 45 path strings in tests were left unmapped (`apply-unmapped.txt`: glob roots such as `src/**/*.vue`, dir roots such as `src/styles/glass`).

Not attempted:

- the `value.js` backend: the repo is fenced, so D1-B's own measured numbers for it stand;
- `tests-visual` runs.

## 9 · Deviations from the D1-B spec

1. **R0 added.** D1-B asserts that the gate fails loudly on unresolved edges, but its draft has no clause for it. Without R0, a typo in a relative path passes every rule.
2. **`_shared/overlay` stays in the kernel.** `OverlayHost` is owned by `participation.ts` in the kernel, and `dockContext` provides it. This is the S7 direction: the kernel imports no family. Placing it under the `overlay` family would have made the kernel import it.
3. **Unroutable tests are placed by subject.** A test that only mocks, reads `?raw` or imports a namespace has no routable target, so it goes to the deepest legal dir of its subject (6 tests).
4. **The scripts domains are renamed.** B.5's `styles` domain fails R5 (a kind-slot name), so it became `css`. `verify-export-types.mjs` and `flatten-subpath-types.mjs` moved to a `publish` domain: evaluating the `policy` door ran `verify-export-types.mjs`, whose top-level `new URL` throws under happy-dom. Script doors get `index.d.mts` mirrors, so `vite.style-fold.ts` type-checks.
5. **R4 counts modules only.** Kind-grouped dirs without doors (the `src/composables/motion/{morph,scroll,route,reveal}` sub-dirs) are loose. The one value cycle among them, and the one type-only kernel cycle, are info lines. Whether a door-less sub-dir counts as a node is a ruling D1-B has to make.
6. **R1 covers `scripts/` from every zone, and the S2 own-door check is part of R1.**
7. **A dir that keeps its door keeps its name through the dir carve.** Otherwise the majority-prefix rename renamed `overlay/menu` to `dropdown`.

## 10 · Commands

```sh
P=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-B-proto
$P/bin/pipeline.sh "node carve-files.mjs $P/wt" "node carve-dirs.mjs $P/wt" "node css-doors.mjs $P/wt" "node doorify.mjs $P/wt doors"
$P/bin/staged.sh            # the same, gate after every stage → logs/staged-gate.txt
$P/bin/checks.sh carved     # regen, build, typecheck, demo, vitest, pack → logs/carved-*.log
node $P/gate/door-gate.mjs $P/head      # 805, exit 1
node $P/gate/door-gate.mjs $P/wt        # 7 (R6), exit 1
node $P/gate/mutate.mjs $P/wt           # 13/13 caught → logs/mutations.txt
node $P/migrate/surface.mjs $P/head $P/wt; node $P/migrate/surface2.mjs $P/head $P/wt
```
