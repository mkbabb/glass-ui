# D1 · pass 1 · D1-C-critique: workspace packages

| field | value |
|---|---|
| seat | adversarial critic for family D1-C, D1 pass 1. Did not author the research, the spec or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `7362b3bf` (the prototype's HEAD; later commits touch only `docs/`) |
| inputs, read in full | `CHARTER.md` (last four paragraphs), `SPECS.md` §0, §D1-C, "Shared facts"; `D1-C.md`; `D1-C-proto.md`; the prototype's `gate-packages.mjs` (219 lines), `manifest.mjs`, `plant.mjs`, `pipeline.sh`, `final.sh`, `helper/workspace.mjs` |
| instruments | the prototype's tools copied unchanged to `$K = …/scratchpad/D1/p1/D1-C-crit/tools/` and re-run there; my scripts `$K/crit/crit-plant.mjs` (18 plants) and `$K/crit/sourcepath-audit.mjs`; logs in `$K/logs/` |
| fences kept | one worktree `$K/wt` at HEAD, carved by the prototype's `pipeline.sh`, removed with `git worktree remove --force` before return. `node_modules` is the prototype's symlink farm (`farm.mjs`), so nothing is written into the main repo's `node_modules`. No `tests-visual/node_modules` exists. A read-only `git archive HEAD src scripts package.json package-lock.json tsconfig.json` extract in `$K/head` feeds `manifest.mjs`'s entry-set import and the lockfile comparison. No repo edit besides this file; no sibling touched; no browser seat |
| load | load average 22-45 from other sessions |

**Verdict: BANK. Convergence 40%.**

What stands, re-run here:
- The carve rebuilds from HEAD by script with no hand moves.
- The public surface is exact.
- Both typechecks and the build are green.
- The published `./styles` import sequence is unchanged, accessibility last.
- The gate's C2 and C3 have teeth that TS project references lack.

The family's defining claim does not stand: "the resolver enforces privacy".

- **The resolver does not enforce it; the gate does.** A real kernel → overlay → kernel runtime cycle passes the gate, the root typecheck, `vue-tsc -b` and the library build, and ships in `dist` (§2, X14).
- **17 of 18 new plants pass the gate.**
- **C7's drop from 443 to 90 is mostly relabelling.** 342 path literals became `sourcePath(pkg, path)` calls. 178 of them read another package's private files or scan its dirs, which SPECS C.1 clause 7 forbids, and the gate cannot see them.
- **The edict's subject is out of scope by the family's own spec.** Recursive colocation, colocated styles and placement inside a package are all left undefined.
- **What remains is a custom gate plus 1,589 lines of manifests and READMEs in 66 files.** The cost comes with a heavier build and a changed lockfile.

---

## 1 · The key claims, re-run

Every row ran in `$K/wt` with the prototype's scripts unchanged.

| claim | command | result | matches the prototype |
|---|---|---|---|
| RED at HEAD | `node gate-packages.mjs $K/wt` before carving | exit 1 · `C1 647 · C1b 23 · C2 11 · C7 443 · C8 804`, 1,267 files, 1.06 s | yes |
| carve, no hand moves | `pipeline.sh` | 16.0 s · src 646 moved, 22 tooling files, 132 tests, 1,346 specifiers, 354 literals, 9 roots, 0 holes. `carve.out` also reports `unresolved 2` (`Alert.vue` and `Badge.vue` import `"./"`, their own door), which the report does not mention | yes |
| migrated gate | `node gate-packages.mjs $K/wt` | exit 1 · `C2 1 · C6 1 · C7 90`, all else 0; 25 packages, 1,198 workspace specifiers | yes |
| typecheck | `vue-tsc --noEmit`; `-p tsconfig.test.json` | 0 errors (11.4 s); 0 errors (10.4 s) | yes |
| build | `npm run build`, cold | exit 0, 17.2 s wall (the prototype: 36.1 s at higher load; HEAD 7.4-8.2 s per the prototype) | yes |
| incremental | `vue-tsc -b tsconfig.packages.json` | no-op 0.91 s; a kernel export added 7.15 s; reverted 8.02 s | yes |
| surface | `glass-regen-exports --json` | `EXACT_REPRODUCTION: true`, 68/68, 62 JS subpaths, 0 drift; `--break-fidelity` exit 1 | yes |
| cascade order | the `@import` sequence of `dist/styles/index.css`, carved against the main repo's existing `dist` (read only) | same 36 imports in the same order, re-rooted (`./tokens.css` → `../tokens/tokens.css`); `accessibility.css` last in both | yes |
| pack | `npm pack --dry-run --json` | 840 entries, 2,918,478 B unpacked, 1,025,307 packed | yes (±18 B packed) |
| vitest | `npx vitest run` | 239 files, 29 failed; 2,192 tests collected, 92 failed, 2,099 passed | yes (29 structural; the `menu/contract` flake did not fire) |
| the prototype's plants | `plant.mjs` | each of the 10 adds exactly its own clause; restored | yes |
| import-dag | `glass-import-dag --json` | exit 0 · `nodes 195 · internalEdges 487 · productRoots ["src","demo"]` (842 / 2,294 at HEAD per the prototype) | yes: blind and green |

---

## 2 · Planted violations the gate should catch

The prototype planted one violation per clause, each shaped to that clause. These 18 are shaped to the edge kinds and resolution paths that SPECS §0 lists, which the gate does not model. `crit-plant.mjs` plants each one, re-runs the gate, restores and reports the delta. Baseline: `C2 1 · C6 1 · C7 90`. After the battery, `restored: true`.

The toolchain column comes from separate runs with the plants in place: `vue-tsc --noEmit` (root program, which includes `demo/` and `packages/*/src/`), `vue-tsc -b`, `npm run build`.

| # | plant | gate | toolchain | a real bypass? |
|---|---|---|---|---|
| X1 | demo imports `/packages/overlay/src/_shared/overlay/participation` (Vite root-URL form) | missed | TS2307 | no, typecheck catches it |
| X2 | `tsconfig.json` `paths: {"@int/*": ["./packages/*"]}`, and demo imports `@int/overlay/src/_shared/overlay/participation` | missed | **0 errors** | **yes**: a renamed alias. C8 knows only the `@glass` name, and a bare specifier from the aggregate zone that names no workspace package is dropped (`gate-packages.mjs:156-157`) |
| X3 | demo imports `#glass/does-not-exist` | missed | TS2307 | no, but it refutes the prototype's §3 claim that "a relative, `#` or workspace specifier that resolves to nothing is a failure": lines 134-137 check only that the key matches |
| X4 | demo imports `#glass/../packages/overlay/src/…` | missed | TS2307 | no |
| X5 | `packages/overlay/src/dialog/index.ts`: ``import(`../../../kernel/src/_shared/${n}.ts`)`` | missed | **0 errors** | **yes**: a template-expression dynamic import is not an edge (line 87 takes only literals), and C7 skips library source (line 159) |
| X6 | same file: `new URL("../../../kernel/src/_shared/class-names.ts", import.meta.url)` | missed | **0 errors** | **yes**: an edge kind in SPECS §0 that the gate does not read |
| X7 | `packages/overlay/src/dialog/styles.css`: `@reference "../../../tokens/src/tokens.css"` | missed | not run | the CSS regex reads only `@import` |
| X8 | a new SFC with `<script lang="ts" src="../../../kernel/src/_shared/class-names.ts">` | missed | tsc 0 errors; **build exit 1** (`dangling declaration reference`) | no, the build's relinker catches it loudly |
| X9 | a test holds `sourcePath("@glass-ui/overlay", "dialog/DialogContent.vue")`, a non-door file of a foreign package | missed | runs | **yes**: the prototype's own helper (§3.1) |
| X10 | a test holds `["packages","overlay","src","dialog","styles.css"].join("/")` | C7 +1 | — | caught, but only because a bare `"src"` element matches `PATH_RE` |
| X11 | overlay's `./dialog` door becomes `{development: …, default: …}` | missed | not run | **yes by construction**: Vite's default client conditions include `development\|production`, so dev and build would split. SPECS C.1 rule 5 requires unconditional private targets, and the gate only checks existence for string targets (line 149) |
| X12 | `packages/overlay/tsconfig.json` gains `paths: {"@glass/*": …}` | missed | — | the declaration arm reads only root `tsconfig*.json` (line 206); a use of the specifier would still hit C8 |
| X13 | overlay door `./leak` → `./src/../../kernel/src/_shared/class-names.ts`, and demo imports it | missed | TS2307 | no, TS rejects the target |
| X14 | `packages/kernel/src/test/leak.ts` re-exports `@glass-ui/overlay/dialog`; kernel's `class-names.ts` re-exports `../test/leak`; overlay goes into kernel's `devDependencies` | **missed** (counts unchanged) | root tc **0**, `-b` **0**, build **exit 0**; `dist/kernel/_shared/class-names.d.ts:38 export * as __x14 from "../test/leak.js"` | **yes: a real package cycle ships.** `isTestFile` classifies by path regex (line 52), so a `test/` dir inside library source takes devDependencies, and C4 reads only `dependencies` (line 168) |
| X15 | `packages/overlay/src/dialog/leak.cjs` requires a kernel internal | missed | not run | `CODE` (line 33) excludes `.cjs`, `.cts`, `.tsx`, `.jsx`, `.html` |
| X16 | `dist/leak-rel.js` re-exports `../packages/kernel/src/_shared/axes.ts` | missed | — | C5 checks only `@glass-ui/`. Not a live risk: every `packages/…/src` string in the 119 dist files that carry one sits in a rolldown `//#region` comment (0 hits outside them), and HEAD has 120 files of the same with `src/components` |
| X17 | demo imports an undeclared external | missed | TS2307 if absent; a hoisted phantom would pass | C6 covers only `packages/*` and `tooling/*` |
| X18 | dock opens a door on `dock/composables/useDockHold`; fields declares dock (with the reference) and imports it | passes | green | legal under the family's own per-file door rule: privacy costs one `exports` line |

**Tally:**
- 17 of 18 pass the gate.
- 5 are toolchain-accepted bypasses: X2, X5, X6, X9, X14.
- X11 is one by the resolver's defaults, not exercised here.
- 5 are caught downstream: X1, X3, X4 and X13 by TS2307, and X8 by the build.
- 3 have no downstream check verified: X7, X15, X17.

---

## 3 · The checklist

### 3.1 Vacuous convergence. Yes, on C7, and on C3/C4/C6 for the migrated tree.

**C7 is green through relabelling, not repair.** The carve rewrote 321 test literals and 25 script literals into `sourcePath("<package>", "<path in package>")`.

- `sourcePath` (`tooling/workspace/src/workspace.mjs:47-55`) joins the manifest's `directories.lib` with the path. It never consults `exports`.
- Its output is the same `packages/<p>/src/…` string C7 bans, computed at runtime. `PATH_RE` sees only the arguments.
- Example: `tests/components/a11y/coarse-target.test.ts` went from `"src/components/sortable-list/styles.css"` to `sourcePath("@glass-ui/data", "sortable-list/styles.css")`. The coupling to the internal layout is the same.

`sourcepath-audit.mjs` classifies all 342 static calls in 76 files by caller package against target package, and by whether the target is an `exports` target:

| class | calls | SPECS C.1 clause 7 |
|---|---:|---|
| foreign package, **non-door** file | **161** | forbidden |
| foreign package, dir scan | **17** | forbidden |
| foreign tooling package's source | 15 | forbidden (tests reading tooling internals) |
| foreign package, door target | 71 | allowed in intent; should be `import.meta.resolve` of the door |
| aggregate's own `src` | 15 | allowed |
| own package (door 32, non-door 25, dir 5) | 62 | allowed ("relative to its own package") |
| own tooling | 1 | allowed |

So 193 of 342 calls do what clause 7 forbids, and none is visible to C7. The prototype's §5 argues that rewriting `"src"` to the aggregate path "would be a masking fix". `sourcePath` is that masking fix, applied to a larger set.

**C3, C4 and C6 are 0 on the migrated tree by construction.** `manifest.mjs` writes:
- `dependencies` as the edges used;
- `references` from `dependencies`;
- `peerDependencies` as the externals used, at the aggregate's range.

The gate then checks the same three equalities, and at HEAD there are no packages. So the migrated tree's zeros show that the generator matches the lexer, not that the rule holds. The rule's only evidence is plants, and the plants were all author-shaped (§3.3).

### 3.2 Spec-cites-itself circularity. Yes, in three places.

- SPECS C.3 says the gate "closes" the relative-path bypass with C2 and C3. Its evidence is the prototype's plants, one per clause, each built to fire that clause. The shape of the plant set is what makes every row pass.
- SPECS C.1 rule 3 says "TS `references` are derived from `dependencies`". In the tree they are 58 committed records beside 58 committed dependency declarations, and C4 gates their equality. The derivation exists only in the scratch `manifest.mjs`.
- SPECS C.1 "Global" defines global as "a package that other packages declare as a dependency … set by the `dependencies` manifests, not measured". Those manifests are generated from the edges, so "global" means "imported by another package" after an 18-way grouping chosen by the charter sketch. The definition is the carve restated.

### 3.3 Gates that cannot fail. Several, not only the 17 misses in §2.

- **C5 before a build.** `final.sh` runs `gate-prebuild` before `npm run build`, and C5 walks only an existing `dist/` (line 179). Placed before the build in CI, C5 is 0 by absence.
- **C4 for test-classified edges.** Any edge from a path matching `/(^|\/)(tests?|tests-visual)\//` is outside the cycle graph, wherever the file sits. X14 is the proof.
- **The `#` arm.** It checks the key and never the target. X3 is the proof.
- **C8's alias arm.** It reads a property named `@glass` in 4 named config files and `paths` keys starting `@glass` in root `tsconfig*.json` (lines 196-209). Any other alias name, and any package-level tsconfig, is invisible (X2, X12).
- **C6 in the aggregate zone.** Externals are recorded only when `carved(owner)` (line 157), so the demo, `src/`, `tests/` and `tests-visual` can import phantoms (X17).

### 3.4 The elegant-reduction trap. Yes, on four load-bearing steps.

1. **Scanners** (prototype §5): "The right target is a `libraryPackages()`-rooted scan … each scanner's filters … have to be re-authored."
   - That is 57 scan roots in 32 test files plus 21 in 2 tooling files (the prototype's count). `libraryPackages` has 2 importers today.
   - 29 test files fail. `import-dag` exits 0 at 195 of 842 nodes. The 9 blind-but-green scanners are named in the prototype and not repaired.
   - This is the part of the migration that is not mechanical, and it is left as prose.
2. **Placement inside a package** (SPECS C.1): "Out of this family's scope … has to be named here by reference." This is the edict itself (§4).
3. **Granularity** (SPECS C.6): `procedural` (89 files, 20,849 lines on disk) and `tokens` (78 files) are carried whole. The cut optimum is "not a design", and nothing replaces it.
4. **CI under workspaces**: `npm ci` under `workspaces` with generated `bin` links was not run. `pipeline.sh` creates the `.bin` links by hand (a `node -e` loop), so the installer's own linking is untested.

### 3.5 Legacy aliases or dual paths smuggled in. Four.

1. **`sourcePath` beside `exports`.** `tooling-workspace` exports both `sourcePath` (a manifest-directory join) and `resolvePackageSpecifier` (through `exports`). These are two resolution paths onto the same files; the first has 77 importing files and the second has 3.
2. **`#glass/*` in the published manifest.** `imports: {"#glass/*": "./src/*.ts"}` points outside `files: ["dist", "MIGRATION.md"]`; the prototype notes it as "inert but visible".
   - It is the deleted `@glass/*` → `src/*` alias, renamed and narrowed. 3 files import `#glass/index`: `demo/stories/substrates/glass-material.vue`, `tests/public-surface.spec.ts` and `tests/components/deck/contract.test.ts`.
   - `#glass/index` also opens the whole barrel in the repo, beside each package door.
3. **Two TS programs over the same files.** The root `tsconfig.json` includes `packages/*/src/`, and `npm run typecheck` runs only that program. So the editor and CI typecheck see every package as one program, where undeclared cross-package imports resolve through the symlink (X14: 0 errors).
   - The `-b` project graph, the only place TS6202 (P1) can fire, runs only inside the build plugin.
4. **The `development` condition inside private exports** is not policed (X11). C8's "no dual path" covers only the root configs.

No re-export shim and no `@glass` alias survive (C8 0, verified).

### 3.6 Masked fallbacks. Three.

1. **Stale declarations ship from warm builds.** `vite.style-assets.ts:112` copies each package's `.tsbuild` directory into the staged dist, and `tsc -b` never deletes the output of a removed source. Measured sequence:
   1. build with X14: `dist/kernel/test/leak.d.ts` emitted;
   2. delete `packages/kernel/src/test/` and restore the edits;
   3. warm build: **exit 0**, and `dist/kernel/test/leak.d.ts` is still there, holding `export * from "../../overlay/dialog/index.js"`;
   4. `npm pack`: **841 entries**, the extra one being the stale file;
   5. `verify:package` fails only on `G-BUNDLE-RATCHET … 2918525 > 2916129`, which is the +47 B of the stale file. After a rebind (every carve owes one, per the prototype) it reports `"terminal":"CLEAN"` with 453 declarations.

   So the prototype's warm figure (9.0 s) is not a release-safe build. In X8's cleanup the same staleness failed loudly, because the stale `PlantedX8.vue.d.ts` dangled.
2. **Blind scanners pass.** For example, `import-dag` exits 0 at 195 nodes. C7 flags their literals, but when C7 is waived or its literals are relabelled (§3.1), the scanners go quiet at exit 0.
3. **`sourceRootOf` infers the aggregate's source root.** For the aggregate it reads the common prefix of the `imports` map (`workspace.mjs:21-22`), under a doc comment that says "Undeclared is an error, never a guess". It is a guess from a different field.

The accessibility anchor is not one of these. `STYLE_ROLES.terminal` resolves `@glass-ui/tokens/accessibility.css` through `exports` and throws when it does not resolve (`vite.style-fold.ts:95-102`), and the order is verified in §1. It is still a tooling constant naming one file, not a role declared in the stylesheet.

### 3.7 Unverified gestalt. Walked on the migrated tree: dock, slider, dialog.

**Dock.** `packages/dock/src/` holds `dock/`, `glass/` and `search/`.

- `glass/` is 3 of the 6 files of `src/composables/glass`: `backdropLuminanceSample`, `backdropSampleMath`, `useGlassBackdropLuminance`. The other 3 (`index.ts`, `useSpecularTracking`, `vSpecular`) went to `packages/gpu/src/glass/`. One HEAD module is split across two packages under the same dir name.
- `search/` (`useFuzzySearch`) sits as a sibling of `dock/`, not inside it.
- The dock context lives in `packages/overlay/src/_shared/overlay/dockContext.ts`, moved there to cut M02.
- 15 doors, among them `./dock/GlassDock.vue`, `./dock/DockTrigger.vue`, `./dock/DockSeparator.vue` and `./dock/composables/useDockHold`. Track's `Slider` imports the last one, so track depends on dock (the G-NO-INWARD-DOCK violator) and the manifest declares that dependency.

**Slider.** `packages/track/src/slider/{Slider.vue, index.ts, styles.css, types.ts}` is colocated, as it was at HEAD.

- Its track and value-mark styles live elsewhere: `packages/tokens/src/track-well.css` (users: track ×3 plus `data/timeline`) and `packages/tokens/src/glass/value-marks.css` (users: `track/{progress, scroll-progress-rim, slider}` only).
- Its tests sit in a mirror tree under stale namespaces, `packages/track/test/components/ui/progress/Progress.test.ts` and `…/custom/scroll-progress-rim/…`. That holds for 40 of the 132 moved tests.

**Dialog.** `packages/overlay/src/dialog/` reads cleanly. `sheet/SheetContent.vue → dialog/ModalOverlay.vue` stays in-package (M03 needs no cut).

**Also seen:**
- Three stutters: `packages/dock/src/dock`, `packages/motion/src/motion`, `packages/tokens/src/tokens`. The entry map inherits them: `motion-core → @glass-ui/motion/motion/core`, `axes → @glass-ui/kernel/_shared/axes`.
- `useTabRovingFocus.ts` sits in `packages/motion/src/motion/morph/`, while `tabs` lives in `fields`.
- `sidebar` (a scroll and tree composable) lives in `motion`.
- 6 `_shared` dirs across packages.
- A newcomer who asks "where does X live?" gets a package from the charter sketch, then HEAD's old path below it.

### 3.8 Consumer-less substrate

- `directories.test: "test"` in 24 manifests: nothing reads it. Only `directories.lib` is read, by `workspace.mjs:20`.
- `workspacePackages()` is exported with 0 importers outside the helper.
- The 24 READMEs each carry a derived "Members:" list, with no generator in the tree and no gate, so they go stale on the first move.
- `tsconfig.packages.json` hand-lists the 18 packages that `workspaces: ["packages/*"]` already globs.
- The 22 root `devDependencies` on `@glass-ui/*: "*"` repeat the workspace list.
- Peer declarations duplicate the aggregate's ranges 50 times (`vue` ×17, `reka-ui` ×9, `@lucide/vue` ×8, keyframes ×5, value.js ×3, `@vueuse/core` ×2, `typescript` ×2, and `vite`, `postcss`, `lightningcss`, `@tailwindcss/postcss` ×1 each on tooling). C6 exists to keep the copies equal.
- As a side effect, 120 lockfile entries lose `dev: true` (226 → 106), among them the whole `@rolldown/binding-*` set, because tooling declares `vite` as a peer.

---

## 4 · Edict fidelity

| edict clause | D1-C on this tree | counterexamples |
|---|---|---|
| components colocated with sub-components, composables, skeletons, constants, recursively | **not addressed.** The family defines no placement inside a package, and the carve keeps HEAD's layout below each package root. Where the package DAG forces a cut, it moves files **away** from their component | `dockContext.ts` → `overlay/src/_shared/overlay/`; `useTabRovingFocus.ts` → `motion/src/motion/morph/`; `composables/glass` split 3 + 3 across gpu and dock; `search` placed beside `dock/` rather than in it |
| styles colocated | **not addressed.** All 78 files of `src/styles` go to `tokens` whole, component-bound sheets included; `tokens` depends on `controls` | `glass/surfaces-pager.css` (`.glass-pager-ring`: pager/carousel and pager/pager-dots only); `glass/value-marks.css` (track only); `track-well.css` (track ×3 + data/timeline); `tokens/src/glass.css:68 @import "@glass-ui/controls/chip/accent-tone.css"` |
| `composables/` only for the truly module-level or global | partial. `src/composables/` is dissolved into packages, and the kind-named dirs inside components remain (`dock/composables`, `data-table/composables`, `deck/composables`, 10 in all). "Global" is whatever other packages import, per §3.2 | `sidebar` inside `motion`; half of `glass` inside `dock` |
| long-running dirs broken into encapsulated modules | partial. `src/components` (59 dirs) becomes 18 packages. The two longest stay whole, and `motion` gains 44 doors | `procedural` 89 files / 20,849 lines; `tokens` 78 files; `motion` 56 files, 44 doors |
| backend, befitting its language | partial. `scripts/` becomes 6 tooling packages with bins, and 9 location-derived roots become `workspaceRoot()`. The long files stay whole, the repeated helpers stay repeated, and no sibling backend was prototyped | `verify-export-types.mjs` 1,080 lines, `profile-bundle.mjs` 940, `import-dag.mjs` 629, `vite.style-fold.ts` 619, `reflect-capture-verify.mjs` 584; `sha256` in 5 tooling and test-helper files; `readdirSync` in 9 tooling files |

D1-C is an encapsulation substrate. On the edict's central demand it has nothing to say until it borrows a placement law from another family, and its own cuts pull files away from their components.

---

## 5 · What a second pass would have to carry

These are hardenings, each tied to a finding above. They do not rescue the verdict, because none of them supplies a placement law.

1. **Resolve everything through one resolver and judge the resolved file.**
   - Use `ts.resolveModuleName` with the root compiler options, for every specifier form: bare, `#`, `/`-rooted, and any `paths` alias.
   - A specifier from any zone that resolves to no workspace, external or builtin module is `unresolved`.
   - This closes X2, X3, X4, X13 and X17 in the gate, not only in TS.
2. **Model every edge kind SPECS §0 lists:**
   - `new URL(lit, import.meta.url)` (X6);
   - template dynamic imports, taking their head as a glob base (X5);
   - SFC `<script src>` and `<template src>` (X8);
   - CSS `@reference`, `@source`, `@plugin`, `@config` and `url()` (X7);
   - `.cjs`, `.cts`, `.tsx`, `.jsx` and `.html` files (X15).
3. **Classify by manifest, not by path.** Library source is the `directories.lib` subtree, and tests are whatever sits outside it. That closes X14.
4. **Private exports** must be strings under `./src/` with no `..` segment (X11, X13).
5. **Strike `sourcePath` for foreign packages.** A foreign read goes through `import.meta.resolve` of a door, or the door is added and counted against privacy. That makes C7's 193 hidden violations visible.
6. **Prune stale outputs.** Copy declarations rooted at the entry map (SPECS shared fact 14), not a wholesale `cpSync` of `.tsbuild`.
7. **Strike the duplicated records rather than gating their equality** (the convergence-gates law):
   - private packages declare no externals, and the gate checks that every external a package imports is an aggregate peer, which is one record;
   - tsconfig references are generated at build time and ignored in git;
   - the READMEs lose their member lists.

   This also restores the 120 `dev` flags.

---

## 6 · Open gaps (exact list)

1. Placement inside a package is undefined; the tree keeps HEAD's layout under 18 sketch packages (§4 row 1).
2. The DAG forces anti-colocation re-homes: `dockContext.ts`, `useTabRovingFocus.ts`, `composables/glass` split across 2 packages, `search`, `sidebar` (§3.7).
3. Styles are not colocated: 78 CSS files in `tokens`, including single-owner `surfaces-pager.css` and `value-marks.css`; `tokens` → `controls` (§4 row 2).
4. The long modules are not broken: `procedural` 89 files / 20,849 lines, `tokens` 78 files, `motion` 56 files with 44 doors.
5. C7 converges by relabelling: 193 of 342 `sourcePath` calls read foreign privates, scan foreign dirs or read tooling internals (§3.1).
6. Toolchain-accepted gate bypasses: X2 (renamed alias), X5 (template dynamic import), X6 (`new URL`), X9 (`sourcePath`), X14 (a real cycle that ships); X11 by the resolver's defaults (§2).
7. Gate claims that do not hold: `#` specifiers "resolved or fail" (X3); edge kinds X7 and X15 are unread; C5 is vacuous before a build; the C8 alias arm is name-bound (§3.3).
8. Warm builds ship stale declarations of deleted sources, and `verify:package` reports CLEAN after the owed ratchet rebind (§3.6).
9. Duplicated records are kept equal by gates:
   - 58 references against 58 dependencies;
   - 50 peer ranges against the aggregate's;
   - 24 README member lists;
   - `tsconfig.packages.json`;
   - 22 root devDependencies.
10. Residue:
    - 29 failing test files and 92 failing tests;
    - 57 + 21 scanner literals not re-authored;
    - `import-dag` blind at exit 0;
    - C2 1 (`tests-visual` → demo);
    - C6 1 (`@vue/runtime-dom` phantom);
    - C7 90.
11. The lockfile loses 120 `dev: true` flags.
12. The published manifest carries `imports` pointing outside `files`, plus `workspaces` and 22 private devDependencies.
13. The door policy is per-file: 253 library doors (27 `.vue`, 116 non-index modules, 21 into `_shared`, 8 into `composables/`). The barrel form is unmeasured, and privacy costs one `exports` line (X18).
14. Build cost: cold 17.2 s here and 36.1 s in the prototype, against HEAD's 7.4-8.2 s. Because of gap 8, a release must build cold.
15. CI under workspaces (`npm ci`, `release.yml`) was not run; the `.bin` links were made by hand.
16. The demo and `tests-visual` are not moved to `apps/*`, which is what the C2 residue needs.
17. Backend: the 5 tooling files over 500 lines are kept whole, the helpers (`sha256` in 5 files, `readdirSync` in 9) are not consolidated, and the sibling-backend carry is not prototyped.
18. The E-8 question (does gate-packages replace `import-dag`'s SCC check) is open. `import-dag` is currently blind.

---

## 7 · Convergence and verdict

**Convergence: 40%.**

The mechanism is real and reproducible. The public surface is exact, the builds and typechecks are green, the cascade order holds, and C2 and C3 catch what TS project references miss. Against that:

- The family's distinguishing claim, resolver-enforced privacy, is refuted by P2, P3 and X14: enforcement comes from a custom gate, as in every other family (SPECS shared fact 10).
- That gate misses 17 of 18 new plants, 5 of them accepted by the whole toolchain.
- C7's green is mostly relabelling.
- The edict's core (recursive colocation, colocated styles, placement inside a package) is outside the family's scope by its own spec.

**Verdict: BANK.** It is sound as a mechanism but dominated as an answer to the edict. It must borrow any family's placement law. Its marginal gain over that family's own gate is:
- bare-specifier door checking (P5 TS2307);
- a per-package dist layout;
- tooling bins.

Against that it pays 1,589 lines in 66 manifest and README files, a heavier and unsound-when-warm build, and a changed lockfile.

**Re-triggers:**
- The owner wants C′: publishing or versioning sub-packages, the one outcome only packages deliver.
- The install moves to a strict isolated linker (for example pnpm `node-linker=isolated`), where an undeclared workspace import stops resolving. That would make C3 a resolver fact, to be measured against P2 and X14 first.
- The chosen placement family's gate cannot hold `procedural` and `tokens` encapsulated without hard boundaries.
