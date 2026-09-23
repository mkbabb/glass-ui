# D1 · pass 1 · D1-D-proto: declared strata, built on the whole tree

| field | value |
|---|---|
| seat | D1 pass-1 prototype seat for family D1-D (declared strata, direction first) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `2b188e72`; the worktree was cut at `7362b3bf`. `git diff 2b188e72 HEAD -- src demo tests tests-visual scripts package.json package-lock.json 'vite*.ts' vitest.config.ts 'tsconfig*.json'` prints 0 lines, so the measured source is the named one |
| inputs | `SPECS.md` (§0, `## D1-D`, Shared facts), `D1-D.md`, and PORTFOLIO §2.1-2.2 for the floor rows the spec cites |
| verdict | **RUNS.** One script applies the placement law to `src/`, `demo/`, `tests/`, `tests-visual/`, `scripts/` and the root build modules, and 20 authored hunks in 9 files cover what no rule derives. vue-tsc, the library build, the demo build, `regen-exports`, `npm pack` and vitest all ran on the result. The gate is a Node executable inside the tree: RED at HEAD (301), GREEN on the migrated tree (0), and it caught 22 of 22 planted violations. The parts that did not run are listed in §9 |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p1/D1-D-proto/`, called `Q/` below |
| fences kept | No source edit in the repo; this file is the only repo write. All moves, builds and tests ran in the worktree `Q/wt` (made with `git worktree add … HEAD`, with `node_modules` symlinked; the repo has no `tests-visual/node_modules`, so there was nothing to link there). The worktree was removed and re-added three times to rerun the codemod from a clean HEAD, and removed with `git worktree remove --force` at the end: `git worktree list` shows no `D1-D-proto` entry. No other git write. The worktree index was never updated, so `git status` there read 552 D, 327 M and 64 ??. No sibling repo was read or run. Other families' specs and reports were not read |
| load | load averages were 41 to 160 during the runs (other sessions), so the timings below are loose |

---

## 0 · Result

| check | HEAD (`Q/out/head-*`) | migrated (`Q/out/mig4-*`) |
|---|---|---|
| `npx vite build` | exit 0 | exit 0 |
| `npx vite build --config demo/vite.demo-dist.config.ts` | exit 0, 4 woff2 emitted | exit 0, 4 woff2 emitted (0 before the `url()` fix, §8 B2) |
| `npx vue-tsc --noEmit` | 0 errors | 0 errors |
| `npx vue-tsc --noEmit -p tsconfig.test.json` | 0 errors | 0 errors |
| `node <regen-exports> --json` | `EXACT_REPRODUCTION: true`, 68/68 keys, fidelity 63/63 | `EXACT_REPRODUCTION: true`, 68/68 keys, fidelity 63/63; soft drift `stale: components/_shared, composables/glass, composables/motion, composables/search` |
| `npx vitest run` | 2,309 passed, 4 failed (all `Test timed out in 5000ms`), 2,324 collected | 2,302 passed, 11 failed: 10 in `gate-register.test.ts` (§8 B1) and 1 flake in `menu/contract.test.ts` (12/12 passed on 3 reruns), 2,324 collected |
| `npm pack --dry-run --json --ignore-scripts` | 841 entries, 1,023,942 B, 2,916,129 B unpacked | 837 entries, 1,022,436 B, 2,912,302 B unpacked |
| `package.json` `exports` / `typesVersions` | 68 keys / 62 | identical (JSON equality) |
| export surface (`Q/surface.mjs`) | 63 entries, 603 runtime, 1,279 type names | identical (`cmp` of the two JSON reports) |
| four CSS export entries, flattened (`scripts/bin/cascade-identity.mjs`) | — | `./styles/fonts`, `./styles/theme` byte-identical; `./styles`, `./styles.css` identical modulo Vue scope ids |
| `node scripts/bin/gate-strata.mjs` | **FAIL: 301**, exit 1 | **PASS: 0**, exit 0 |
| planted violations (`Q/plant.mjs`) | — | 22 planted, 22 caught; tree hash `0dfef072b9194675` before and after |
| `node scripts/bin/import-dag.mjs` (the repo's own tool) | value module SCCs 3 (M01, M02 with 7 members, M03 dialog/sheet) | value module SCCs 2: M01 (demo, unchanged) and `compositions/dock ↔ compositions/dock/composables` (intra-unit). No motion knot. Run on the run-3 tree, which differs from the final one only in `demo/demo.css` (4 `url()` rewrites) and the gate's own files |

In brief:

1. **The whole tree moves by script.** 550 files move and 2 are deleted. 940 specifiers, 480 literal paths and 107 other path forms are rewritten, and 590 files change text. 20 authored hunks in 9 files follow (§3).
2. **The residue the research seat left (54 tests in 13 files) falls to 10 tests in 1 file.** Five mechanical rules clear it (§2 rows 7-11), plus two authored hunks that route two gate tests through the one dist↔src map. The 10 that stay red read a roster that lives in a closed tranche record (§8 B1).
3. **One break passed every check, and nothing in the suite would have caught it.** `demo/demo.css` loads the fonts through a relative `url()`. After the move the demo build still exits 0, prints 4 "didn't resolve" warnings and ships no woff2. The spec's edge list has no `url()` kind (§10 S1). The graph now has one, and the gate fails closed on it (mutation M22).
4. **The public surface is placement-independent,** as the spec states. The 68 export keys and every runtime and type name are unchanged. `dist/` loses 5 declaration files and re-roots 245 files under `compositions/`, `patterns/`, `primitives/`, `substrate/` and `foundation/` (§5).
5. **Gap 4 is closed.** The two aggregate doors live at `src/motion.ts` and `src/motion-core.ts`, and the rule "every file directly under `src/` is an anchor" carries the rank. `import-dag` no longer reports a motion knot.

---

## 1 · The tree after

```
src/
  index.ts  motion.ts  motion-core.ts  html-attributes.d.ts  strata.ts      anchors (rank 9)
  foundation/      88 files   rank 0  (was styles/ 81 + fonts/ 7)
  primitives/      71 files   rank 1  context dom color dark keyboard reactive motion specular sidebar
  substrate/       21 files   rank 2  gpu/{webgl,webgpu,canvas2d,procedural} pointer-field
  patterns/        41 files   rank 3  overlay selection pager field disclosure feedback menu surface + root atoms
  components/     311 files   rank 4  45 dirs
  compositions/   119 files   rank 5  card carousel command configurator data-table dock easing labeled-field number-field tabs
scripts/
  lib/                                 rank 0  (empty: its three files left, §2)
  domain/exports/                      rank 1  subpath-policy regen-exports verify-export-types flatten-subpath-types cascade
  domain/styles/                       rank 1  gen-component-styles
  domain/spring/                       rank 1  springProjection.ts
  domain/strata/                       rank 1  graph origins gate
  bin/                                 rank 3  comment-census gate-register gate-strata cascade-identity import-dag profile-bundle
                                               reflect-capture-verify regen-spring-tokens release.sh safari-probe
build/                                 rank 2  vite.{style-fold,style-assets,utility-emit,dark-stamp,library,targets}.ts minify-css.{mjs,d.mts}
tests/<stratum>/<unit>/…               180 test files moved to their mirror path
tests-visual/_support/paint-arm.mjs    the one tests-visual placement
demo/stories/motion/useScrollScene.ts  floor #3
```

The src moves reproduce the research seat's full-D map: 346 src files move, the same count D1-D §4 measured. Five additions sit on top of it:

| file | goes to | why |
|---|---|---|
| `src/composables/motion/index.ts` | `src/motion.ts` | `./motion` door: an anchor apart from leaf dirs (D.6 gap 4) |
| `src/composables/motion/core/index.ts` | `src/motion-core.ts` | `./motion-core` door, the same |
| `src/components/index.ts` | deleted | floor #2. It has 0 importers, and under D it would be a components-stratum file importing 10 compositions |
| `src/composables/motion/scroll/useScrollScene.ts` | `demo/stories/motion/useScrollScene.ts` | floor #3; beside its one consumer, `scroll.vue` |
| `src/composables/motion/spring/springProjection.ts` | `scripts/domain/spring/springProjection.ts` | the D.4 step-4 ruling (tooling-only source). The demo lab and one test now import a `.ts` under `scripts/` |

---

## 2 · The codemod (`Q/migrate.mjs`, one run, `Q/out/migrate-report-4.json`)

Every rewrite is an edit on an exact character range of the original file. The graph records the literal's offsets, and the edits are applied together, so no rule rewrites another rule's output.

| # | rule | count |
|---:|---|---:|
| 1 | placement (`Q/placement.mjs`) over 1,307 files in the zones plus the root build modules | 550 moved, 2 deleted |
| 2 | specifier rewrite on every resolved edge whose file or target moved, keeping its form (relative, `@glass/`, `/src/`) | 940 (value 748, type 154, css 17, cssurl 4, mock 7, dynamic 7, url 3; src 547, tests 216, demo 145, scripts 10, tests-visual 8, root build 14) |
| 3 | door re-point: a component's import of another component's door, where every imported name originates in one promoted file | 1 (`PagerDots.vue:5` `../deck` → `patterns/pager/window.ts`) |
| 4 | a lower barrel drops its re-export of a file that returned to an owner | 1 (`patterns/overlay/index.ts`: `isTeleportedTarget`) |
| 5 | literal repo paths (`src/…`, `@glass/…`, `tests/…`, `scripts/…`, root build module names), with 86 directory identities (a dir maps to where more than half its files went) | 480 (tests 258, src 83, scripts 58, root 56, demo 14, tests-visual 8, `.github` 3) |
| 6 | Tailwind `@source` globs fanned out over the strata the matched files moved to | 3 lines → 8 |
| 7 | segment runs: `join(SRC, "components", "_shared", "field", …)` | 15 |
| 8 | src-relative literals read from a SRC base (`"styles/glass/ladder.css"`), only when the `src/` twin exists at HEAD and no dist-named base precedes it | 72 |
| 9 | location-derived roots in moved files (`resolve(dirname(fileURLToPath(import.meta.url)), "..")`) | 12 |
| 10 | tests that pin a rewritten statement's text (`'@import "../components/_shared/feedback/dot-ring.css";'`, an `@source` line) | 3 |
| 11 | a string array that was sorted before the rewrite is re-sorted after it | 2 |
| 12 | the test mirror: a test moves to `tests/<stratum>/<unit>/` when one unit carries at least half its subject weight (imports by origin, 1 each; literal src paths, 0.5 each) | 180 test files and 2 fixtures moved; 16 already at their mirror path; 8 have no src subject; 13 have no majority subject; 30 sit in non-src categories (`demo`, `gates`, `docs`, `scripts`, `utils`, `setup.ts`, `shims.d.ts`); 2 would collide at `tests/primitives/dom/useTokenColor.test.ts` and stay |

The files that moved, by zone:

| from | to | files |
|---|---|---:|
| `src/components` | `compositions` 112 · `patterns` 36 · `substrate` 1 · deleted 1 | 150 |
| `src/composables` | `primitives` 71 · `substrate` 20 · `compositions` 7 · `patterns` 5 · `components` 2 · `src/` root 2 · `demo` 1 · `scripts/domain` 1 | 109 |
| `src/styles`, `src/fonts` | `foundation` | 88 |
| `tests` | `components` 78 · `compositions` 37 · `primitives` 37 · `foundation` 15 · `patterns` 8 · `substrate` 7 | 182 |
| `scripts` | `bin` 8 · `domain` 5 · `build` 2 · `tests-visual/_support` 1 · deleted 1 (`canon-doc.mjs`) | 17 |
| root `vite.*.ts` | `build/` | 6 |

Three runs came before this one. Each exposed a class of break, and each class got a rule, not a hand edit:

- run 1: 36 failed tests in 12 files, 2 suites failed to load, and 1 TS7006;
- run 2: 13 failed;
- run 3: 10 failed, and the demo fonts broke silently.

---

## 3 · Authored hunks (`Q/patches.mjs`: 20 hunks in 9 files, each asserted to match exactly once)

| id | file | what no rule derives |
|---|---|---|
| P1a, P1b | `compositions/dock/constants.ts`, `patterns/overlay/dockContext.ts` | the promotion closure: `DOCK_CONTEXT_LABEL` leaves dock with `dockContext.ts` |
| P2a-P2d | `scripts/domain/exports/subpath-policy.mjs` | floor #6. `TIERS` names `components/`, `compositions/` and `primitives/`, and `readTree` returns `home` (dir → the stratum dir it sits in). `buildEntrySet` and `symbolFidelity` read `${tree.home[d]}/${d}/index.ts`. A dir found in two strata throws |
| P2e | the same | `SRC_OF_DIST` (`fonts/ ↔ foundation/fonts/`, `styles/ ↔ foundation/`), `STYLE_STRATA`, `srcOfDist`, `distOfSrc`: the one dist↔src map |
| P3a-P3d | `build/vite.style-fold.ts` | sites 1-2 of the map: the fold's root derivation, and a copy over every stratum root with fonts excluded from `styles/` |
| P4 | `build/vite.style-assets.ts` | the post-processors take every dist stratum root |
| P5a, P5b | `scripts/domain/styles/gen-component-styles.mjs` | site 3: `outputMember` goes through `distOfSrc` |
| P6 | `tsconfig.build.json` | `src/strata.ts` is excluded from declaration emit (it is the gate's input, not a published module) |
| P7 | `tests/gates/orphan-css-partial.test.ts` | floor #3's fixture re-seat: the dead referrer becomes `src/strata.ts`, a present src module no entry imports |
| P8a, P8b, P9a, P9b | `tests/public-surface.spec.ts`, `tests/gates/orphan-css-partial.test.ts` | two tests that restated the dist↔src coupling now read the one map |

---

## 4 · How each check ran

`Q/checks.sh <root> <tag>` runs, in order:

1. `npx vite build`
2. the demo build
3. both `vue-tsc` configs
4. `regen-exports --json` (at `scripts/domain/exports/` after the move)
5. `npx vitest run`
6. `npm pack --dry-run --json --ignore-scripts`

Each step writes `Q/out/<tag>-<check>.txt` and a status line. HEAD ran on the fresh worktree before any move, and `mig4` is the final tree. The demo build runs before vitest, so the `boot-graph` trio (Shared fact 19) passed in both runs.

---

## 5 · Public surface

- **`exports`, `typesVersions`, `files`.** Unchanged (JSON equality). The `package.json` diff is three `scripts` paths: `profile:bundle`, `release` and `verify:package`.
- **Names.** `Q/surface.mjs` runs `Object.keys(await import(js))` and TS `getExportsOfModule` for each entry. Both dists give 63 entries, 603 runtime names and 1,279 type names, and the reports are byte-equal.
- **Export targets.** Of the 131 export and typesVersions targets, 49 are byte-identical, 81 differ and 0 are missing (`Q/distdiff.mjs`). The 81 differ in chunk import paths. `dist/motion.d.ts` and `dist/motion-core.d.ts` are now the emitted barrels (14 and 21 lines) where HEAD shipped a one-line relay into `composables/motion/`.
- **The dist file list, 837 → 833:**

  | change | files |
  |---|---:|
  | same path | 500 |
  | hashed root chunks renamed (JS 153 → 154) | 87 → 88 |
  | re-rooted into `compositions` 112, `patterns` 38, `primitives` 70, `substrate` 21, `foundation` 2, `components` 2 | 245 |
  | declarations removed | 5 |

  The 5 removed declarations:
  - `components/index.d.ts` (its source is deleted);
  - `composables/motion/scroll/useScrollScene.d.ts` and `composables/motion/spring/springProjection.d.ts` (their sources left `src`);
  - `composables/motion/index.d.ts` and `composables/motion/core/index.d.ts` (the doors emit to the root names).

  `styles/tokens.d.ts` and `styles/tokens/manifest.d.ts` move to `dist/foundation/`. Neither is an export key.
- **pack.** 841 → 837 entries. 504 paths are common, 337 exist only at HEAD and 333 only in the migrated pack. Outside `dist/`, the pack holds `LICENSE`, `MIGRATION.md`, `README.md` and `package.json` in both.
- **CSS.** The four export entries flatten to the same cascade (§7). All 16 scope ids in `dist/glass-ui.css` rehash (16 of 16; the research seat saw 15 of 16), because production ids hash each SFC's source and the codemod rewrote their import lines.

---

## 6 · The gate

**Executable.** `node scripts/bin/gate-strata.mjs [root] [--strict] [--json]`, a 20-line CLI over three modules:

| module | lines | job |
|---|---:|---|
| `scripts/domain/strata/graph.mjs` | 152 | the TypeScript-AST graph over the zones and the root build modules |
| `origins.mjs` | 30 | origin resolution through re-export chains |
| `gate.mjs` | 182 | the rules |

- The charter is `src/strata.ts`, with 20 rows of `{ path, reason }` only.
- The public doors are never listed. The gate imports `libraryEntryMap()` from `scripts/domain/exports/subpath-policy.mjs` and takes every entry file outside components and compositions (11 on the migrated tree).
- Runtime is 0.73-1.97 s wall on 1,272 files and 2,905 edges.
- The bytes run RED at HEAD and the bytes installed in the tree are the same (`Q/out/gate-sha.txt`).

**Placement it reads.**

- A stratum is the first directory under `src/`.
- Every file directly under `src/` is an anchor (rank 9), and so is every `@import`-only stylesheet: 7 at HEAD and 7 after.
- Anything outside `src/` ranks 10 for a `src` importer.
- Units:
  - foundation is one unit;
  - in strata 1-3, a unit is a charter row (longest prefix);
  - in strata 4-5, a unit is the top dir.

**Rules.**

| rule | what it judges |
|---|---|
| `unresolved` | a value, type, dynamic, css, cssurl or mock edge in any zone that names a repo path and resolves to nothing |
| `unzoned` | a src file outside every stratum dir |
| `upward` | a cross-unit src edge to a higher rank |
| `sideways(component)` | a cross-unit edge inside components |
| `stratum-cycle` | a cycle in the unit graph of strata 1, 2, 3, 5, or of `scripts/domain` families |
| `charter-row-missing` | a lower-strata file under no row |
| `charter-row-dangling` | a row whose path names nothing |
| `charter-row-shape` | a row that is not exactly `{ path, reason }` |
| `charter-owned(1 unit)` | a file one unit consumes, unpublished |
| `charter-0-unpublished` | a file no unit consumes, unpublished |
| `charter-unreadable` | `src/strata.ts` fails to load |
| `entry-map-unreadable` | the entry-map module fails to load |
| `scripts-unzoned` | a script outside the backend tiers |
| backend `upward` | a tier edge pointing up (lib 0, domain 1, build 2, bin 3) |
| `lib-<2-units` | a lib file fewer than two domain, build or bin units import |

**Every rule judges the resolved file.** So a relative reach and an `@glass/` reach report identically (M01 and M02 below).

**RED at HEAD.** `node Q/gate/scripts/bin/gate-strata.mjs Q/wt` on the clean worktree, before any move: `FAIL: 301 violation(s)`, exit 1 (`Q/out/gate-head.txt`).

| rule | count | what it is |
|---|---:|---|
| `unzoned` | 183 | the 108 `composables/` and 75 `styles/` code files (no stratum dir holds them) |
| `sideways(component)` | 101 | the 25 component→component pairs of the portfolio; 45 component→`_shared` (`_shared` sits under `components/` at HEAD); 30 from the dead `components/index.ts`; 1 `_shared → dock` (the M02 edge) |
| `scripts-unzoned` | 11 | every `scripts/*.mjs` |
| `lib-<2-units` | 4 | `canon-doc`, `minify-css`, `paint-arm`, `subpath-policy` |
| `charter-unreadable`, `entry-map-unreadable` | 1 + 1 | no `src/strata.ts`, no `scripts/domain/exports/` |

`--strict` gives the same 301, because HEAD has no lower-strata dirs to charter.

**GREEN on the migrated tree.** `PASS: 0 violations`, exit 0 (`Q/out/gate-migrated.txt`). With `--strict` (the open owner ruling, D.6 gap 1), 11 files are owned by one unit, and all 11 are published:

| file | owner |
|---|---|
| `color/accent-tone-solve.ts`, `color/useAccentTone.ts` | chip |
| `dom/useClipboard.ts` | easing |
| `dom/useDragVelocity.ts` | slider |
| `motion/core/useRAFLoop.ts`, `motion/core/useYieldToMain.ts`, `motion/morph/useDockCtaReceive.ts`, `motion/scroll/useScrollChrome.ts` | dock |
| `motion/scroll/useScrollProgress.ts` | aurora |
| `gpu/canvas2d/useCanvas2D.ts`, `pointer-field/useRoutePointer.ts` | constellation |

**Planted violations** (`node Q/plant.mjs Q/wt`, `Q/out/plant-final.txt`). Each is applied alone, the gate runs, and the files are restored. The tree hash is `0dfef072b9194675` before and after, and the final run passes.

| id | planted | rule reported (exit 1 each) |
|---|---|---|
| M01 | `primitives/reactive/useTimer.ts` → `import type … from "../../components/slider/types"` (relative deep import) | `upward`, `src/primitives/reactive/ -> src/components/slider/ [type]` |
| M02 | the same edge as `@glass/components/slider/types` | `upward`, the same pair |
| M03 | `components/button/index.ts` → `import "../slider/types"` (relative deep import) | `sideways(component)` |
| M04 | a component imports `../../motion` (the `./motion` door) | `upward` to `anchor:src/motion.ts` |
| M05 | a component imports `../../../demo/stories/motion/useScrollScene` | `upward` to `outside:` |
| M06 | `patterns/surface/resolve.ts` → `../overlay/content` | `stratum-cycle`, `patterns: overlay <-> surface` |
| M07 | a new `src/substrate/stray/probe.ts`, published through `src/index.ts` | `charter-row-missing` |
| M08 | a row `src/primitives/ghost/` | `charter-row-dangling` |
| M09 | a row carrying `consumers: ["dock"]` | `charter-row-shape` |
| M10 | a new primitive only `button` imports | `charter-owned(1 unit)` |
| M11 | a new primitive nothing imports | `charter-0-unpublished` |
| M12 | a new `src/misc/stray.ts` | `unzoned` |
| M13 | `import "./does-not-exist"` in a component | `unresolved` |
| M14 | `import "./nowhere"` in `tests/setup.ts` | `unresolved` (every zone is fail-closed) |
| M15 | `src/strata.ts` made unparseable | `charter-unreadable`. With no rows, units collapse to files, so 131 `charter-row-missing` and 3 `stratum-cycle` also report |
| M16 | the entry-map module throws on load | `entry-map-unreadable`. With no doors, 11 owned and 30 dead also report |
| M17 | a new `scripts/stray.mjs` | `scripts-unzoned` |
| M18 | `domain/styles/gen-component-styles.mjs` → `../../bin/profile-bundle.mjs` | backend `upward`, `domain -> bin` |
| M19 | a `scripts/lib/helper.mjs` one bin imports | `lib-<2-units` |
| M20 | `domain/exports/subpath-policy.mjs` → `../styles/gen-component-styles.mjs` | `stratum-cycle`, `domain: exports <-> styles` |
| M21 | M-D1: a rule appended to `foundation/glass.css`, so it stops being a cascade root | `upward`, `foundation -> src/components/chip/ … glass.css:68 [css]` |
| M22 | a `url("../src/fonts/…woff2")` in `demo/demo.css` (the pre-move path) | `unresolved`, `demo/demo.css:166` |

---

## 7 · The cascade-identity arm

**Executable.** `node scripts/bin/cascade-identity.mjs <baseline-dist> [dist]` (22 lines), over `scripts/domain/exports/cascade.mjs` (46 lines).

- It takes every `exports` target that is a single `.css` file and inlines each relative `@import`; a `layer()` import wraps its body.
- It renames each scope hash in order of first appearance. The first version renamed only `data-v-*` and falsely failed on scoped `@keyframes` names (`skeleton-breathe-0d5ebb1f` against `-5f5865d6`), which carry the same hash.
- It exits 1 when any cascade differs.

**HEAD dist against the migrated dist:**

| entry | files | bytes | verdict |
|---|---:|---:|---|
| `./styles` | 122 | 322,680 | identical modulo scope ids |
| `./styles/fonts` | 1 | 132,840 | identical |
| `./styles/theme` | 5 | 11,165 | identical |
| `./styles.css` | 5 | 45,115 | identical modulo scope ids |

`PASS: 4 cascades identical`.

**M-D2 on the final tree.** The `@import "../components/chip/accent-tone.css"` moves from `foundation/glass.css:68` to `foundation/index.css`, right after `@import "./glass.css"`. Then:

| check | result |
|---|---|
| rank gate | `PASS: 0 violations` (both sheets are cascade roots, so both are anchors) |
| `npx vite build` | exit 0 |
| `npx vitest run` | 2,303 passed, 10 failed, the same 10 as unmutated (`gate-register`) |
| cascade-identity arm | `FAIL: 1 cascade(s) differ`: `./styles` at offset 74,264, where the baseline holds `.accent-tone{--accent-band-strength: 18%;…` and the mutated build `:root{--glass-material-rim: …` |

After restore and a rebuild, the arm passes again and the tree hash is unchanged. As in D1-D weakness 5, only the flattened cascade sees this mutation. It was not paint-verified.

---

## 8 · Breaks (every one)

| # | break | caught by | state |
|---|---|---|---|
| B1 | `tests/gates/gate-register.test.ts`, 10 tests. The roster it binds lives in `docs/tranches/BK/execution/2026-08-03-row9-register/SEAT-BINDING.json`, which holds 12 test and script paths (for example `tests/styles/token-graph.test.ts`, `scripts/release.sh#gate:pixel-floor`). A closed tranche record read as live data (Shared fact 7) | vitest | **open.** Not edited: the file is a sealed record, and whether this gate survives E-8's budget is not this seat's call |
| B2 | `demo/demo.css` `@font-face` `url("../src/fonts/…woff2")` ×4. After the move the demo build exits 0 with 4 "didn't resolve at build time" warnings and ships 0 woff2; vitest stays green | nothing in the suite; found by grepping old paths | **fixed by rule.** The graph now has a `cssurl` edge kind (relative `url()` with comments blanked: 4 edges at HEAD, 0 unresolved), and the gate fails closed on it (M22) |
| B3 | TS7006 in the P3d hunk: `STYLE_STRATA` imported from an untyped `.mjs` | vue-tsc | fixed in the hunk (`(stratum: string)`) |
| B4 | run 1's test residue: 36 failed tests in 12 files, plus 2 suites that did not load, from src-relative literals, `src("…")` helpers, pinned statement text, an expected array whose sort order changed, and two tests that restated the dist↔src coupling | vitest | fixed by rules 7-11 and hunks P8-P9 |
| B5 | `regen-exports` soft drift: 4 stale classification rows (`components/_shared`, `composables/glass`, `composables/motion`, `composables/search`) | regen (reported, exit 0) | open. Removing them is a data hunk in `COMPONENT_CLASS`/`COMPOSABLE_CLASS` |
| B6 | the `@source` fan-out covers supersets. `src/patterns/**/*.ts` matches 33 files for 19 moved hits, and `src/compositions/**/index.ts` 12 for 11. The demo's Tailwind scan widens, and the demo CSS was not compared | the codemod's residue list | open |
| B7 | test-mirror artifacts: 4 of 6 `tests/components/sheet/*` tests land in `tests/components/dialog/` (their dominant subject is dialog); 13 tests have no majority subject and stay; one colliding pair stays | the codemod report | open. The mirror rule is a heuristic over subject weight |
| B8 | old-path mentions left: 28 lines in 16 files, nearly all comments. Two are code. (1) `scripts/bin/comment-census.mjs:690-692` groups its report by `${root}/components/dock/` and `${root}/styles/`, so those rows now read empty. (2) `tests/components/ui/surface/Surface.test.ts:281` asserts `src("components/_shared/resolveSurfaceClass.ts")` throws, which is now true for any path under the gone `_shared` dir: a vacuous negative | grep | open |
| B9 | `import-dag.mjs`'s `OWNER_MANIFEST` and `leafModule()` key on HEAD dir names. The literal pass rewrote some entries, and the SCC labels now read stale owners (`compositions/data-table … #21 — library root`) | reading its output | open (tool semantics) |
| B10 | the size bound fails. 15 dirs hold more than 12 code files, against 17 at HEAD. 58 files exceed 500 lines, against 57 at HEAD without the root build modules; `build/vite.style-fold.ts` is now counted at 590 | `Q/bounds.mjs` | open. Nothing was carved (§9) |
| B11 | the scope-id churn in §5 (16 of 16): any DOM-keyed visual baseline moves | the dist diff | expected |
| B12 | `resorted` rule 11 also reordered `INTERFACE_SOURCES` in `picker-lane.test.ts` (sorted by accident, order not load-bearing) | reading the report | accepted |
| B13 | the codemod is one-shot: a dry run over the already-migrated tree proposes 5 moves and 3 hunks | an accidental rerun | noted. It is not idempotent |
| B14 | one timing flake in `tests/components/menu/contract.test.ts` on the final run | vitest | not a break: 12/12 passed on 3 reruns, and HEAD had 4 timeouts of its own |

---

## 9 · What stopped short (SPEC-ONLY)

- **The size bound (D.1 clause 9) is measured, not enforced.** Carving a long unit into sub-dirs needs authored names (Shared fact 11). The gate claims no bound rule, so no mutation was planted for it.
- **The `scripts/` cure is only partly built:**
  - Built: the tiers, `paint-arm` → `tests-visual/_support/`, `canon-doc` deleted, `minify-css` → `build/`, and `subpath-policy` → `domain/exports/` with regen and verify beside it.
  - Not built: thin `bin/` CLIs (`regen-exports.mjs` and `verify-export-types.mjs` are CLIs inside `domain/exports/`, and `package.json` `verify:package` points there), and the shared helpers in `lib/` (6 walkers, 8 repo roots, 4 sha256). `scripts/lib/` is empty.
- **`tests-visual/`:** 174 files stay flat, because the mirror law places a test by its import subject and these specs drive routes. The only placement is `_support/paint-arm.mjs`.
- **`demo/`:** 145 specifiers were rewritten mechanically, and the demo still reaches into strata below the public doors (gap 9 is undecided). The gate ranks no demo edge; it only resolves them.
- **The gate's M02 cure is the research seat's promotion.** The DIP neutral key (gap 3) was not built.
- **Not run:** Playwright (`tests-visual`), paint verification, Safari, and any sibling consumer build (fence).

---

## 10 · Deltas against the spec

| # | spec text | prototype finding |
|---|---|---|
| S1 | D.3 "Edges counted: value, type, dynamic `import()`, CSS `@import` and `<style src>`" | CSS `url()` is an edge the move breaks silently (B2). The graph needs a `cssurl` kind, and fail-closed resolution has to cover it |
| S2 | D.2 "`SRC_OF_DIST` … applied at three sites" | two tests restate the same coupling (`public-surface.spec.ts:985`, `orphan-css-partial.test.ts:83`): 5 sites. Through the one map, `public-surface`'s dist-list test passes, so D.2's "goes red under D" holds only while the test keeps its own copy |
| S3 | D.1 anchors "live apart from any leaf dir"; gap 4 "not built" | built as "every file directly under `src/` is an anchor". `import-dag` shows no motion knot, and M04 shows a stratum file cannot import an anchor |
| S4 | §0 "a spec states [a floor row] only where the family cannot build without" it | D needed floor #2 (`components/index.ts`), #3 (`useScrollScene`, for the dead rule) and #6 (the re-key), plus the `springProjection` ruling |
| S5 | floor #6 "re-key to `name → path`" | done as a stratum home per dir, not an explicit table. A component↔composition flip then costs 0 entry-map edits: the directory move carries the path. The specifier cost of a flip (D.4) remains |
| S6 | D.1 "`published(f)`" | computed from `libraryEntryMap()`, so the charter lists no door (P-3). If that module fails to load, the gate reports it and shrinks the published set to empty, which fails more files, never fewer (M16) |
| S7 | D.4 step 7 "54 tests in 13 files … diagnosed, not fixed" | 10 tests in 1 file after 5 mechanical rules and 2 authored test hunks. The 10 are B1 |
| S8 | D.1 clause 10 "Of 248 test files, 206 would move" | with a majority threshold, 180 of 249 move, and 13 have no majority subject. The rule needs that threshold, or `public-surface.spec.ts` lands in `tests/primitives/motion/` (run 1) |
| S9 | D.2 "a release arm … modulo Vue scope ids" | scoped `@keyframes` names carry the same hash and must be normalised too |
| S10 | D.1 "Promotion … takes its in-owner dependency closure" | the closure (`DOCK_CONTEXT_LABEL`) stays an authored hunk (P1a-P1b). The door re-point (`PagerDots`) and the re-export drop (`isTeleportedTarget`) are mechanical |

---

## 11 · Reproduction

All scripts are in `Q/`.

**Migration:**

```
git worktree add Q/wt HEAD && ln -s <repo>/node_modules Q/wt/node_modules
node Q/gate/scripts/bin/gate-strata.mjs Q/wt            # RED at HEAD (301)
node Q/migrate.mjs Q/wt --apply                         # the migration; report in Q/out/migrate-report.json
REGEN=scripts/domain/exports/regen-exports.mjs Q/checks.sh Q/wt mig4
node Q/wt/scripts/bin/gate-strata.mjs                   # GREEN (0)
node Q/plant.mjs Q/wt                                   # 22 planted violations
node Q/wt/scripts/bin/cascade-identity.mjs Q/dist-head  # the release arm
```

**Comparisons:**

- `node Q/distdiff.mjs Q/dist-head Q/dist-mig4 Q/wt/package.json`
- `node Q/surface.mjs <dist> <package.json> <out>`
- `node Q/bounds.mjs <root>`

**Saved state:**

- the full change set as `Q/out/D1-D-proto.diff` (203,252 lines, 1,425 file diffs);
- the migrated zones as `Q/mig-tree/` and the HEAD zones as `Q/head-tree/`;
- both dists as `Q/dist-head/` and `Q/dist-mig4/`.

Placement is in `Q/placement.mjs` (it imports the research seat's `mapD` from `Q/placement-d-research.mjs`) and the hunks in `Q/patches.mjs`. The gate's sources are in `Q/gate/`.
