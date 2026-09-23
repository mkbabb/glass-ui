# D1 · pass 1 · D1-C: workspace packages (the resolver enforces privacy)

| field | value |
|---|---|
| seat | D1 pass-1 research seat for family D1-C |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | dispatched at `b7099ea6`; the worktrees came up at `6433284a`. `git diff --stat b7099ea6 HEAD -- src scripts package.json package-lock.json vite*.ts vitest.config.ts tests demo tests-visual tsconfig*.json` is empty, so every source, tooling and config number here is HEAD's |
| inputs | `PORTFOLIO.md` §0-3, §4 D1-C, §6 and the §7 D1-C row and questions; `pass-1/W.md`; `pass-1/X.md`; `audit/round-1/L12.md`, `L13.md`, `L14.md` |
| instruments | Two git worktrees: `wt` (overlay + kernel carve, then a tooling package) and `wt2` (all of `src` carved into 18 packages). Each has a `node_modules` symlink farm, so Vite and vitest caches land in the worktree and never in the main repo. A `pristine` copy of HEAD serves the back-to-back timings and dist comparisons. The graph source is `node scripts/import-dag.mjs --json` (typed edges: value, type, style, vue-block-src). Scripts are named per answer |
| scratch | `<S>` = `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/D1-C/`. Kept there: every script, every log, `patches/wt*/*.diff` (the machinery changes), `artefacts/` (generated `package.json`, `tsconfig.json`, `entries.json`, the tooling package) |
| load | load average 33-147 during the run (other agents). Timings are paired back-to-back runs; CPU seconds are given beside wall seconds |
| deliverable | the six D1-C questions answered with measurements, the family's strongest form, a prototype on this tree, a gate that fails at HEAD, the measured migration cost, the consumer impact, the backend treatment and named weaknesses. No comparison with other families |

## 0 · Result in brief

- The mechanism runs end to end on this tree. All of `src` carved into 18 private packages builds, typechecks under 18 TS project references, serves in dev, and publishes the same 68 keys with an identical public symbol surface.
- The substrate does less than the charter claims. TS references refuse only *declared* cycles: an undeclared `@glass-ui/*` import that closes a real package cycle compiles with 0 errors (probe P2), and a relative reach into a referenced package compiles (P3). The declared-dependency gate is load-bearing, not optional.
- Most breakage sits outside the resolver: path literals in the build, in Tailwind `@source`, and in 87 test and script files. One of them reorders the published cascade silently (Q3).
- Cost at 18 packages: 646 files moved, 140 test files re-homed, 1,327 specifiers rewritten, 237 doors, 58 dependency declarations, about 1,565 new config lines against about 320 deleted.

---

## 1 · The six research questions

### Q1 · Carve overlay as a private workspace package

**Why two packages.** A package cannot depend on the aggregate (that closes a cycle through the aggregate's own entries), so overlay's downward closure has to be a package first. `closure.mjs`: overlay is 61 files on disk plus the re-homed `dockContext.ts`, and once `dockContext.ts` moves its closure outside itself is 16 files: `_shared/{axes,class-names,interaction,primitive,selection,useMotionAxis,surface/resolve}`, `composables/{context,keyboard}/*`, `motion/core/{motionTempo,useReducedMotion}`, `motion/spring/{springPresets,useSpring,useSpringMount}`. Nothing in the closure reaches back into overlay. The carve is `@glass-ui/kernel` (16 files) and `@glass-ui/overlay` (62); the rest of `src` stays in the aggregate.

**What ran.** `carve.mjs` in `wt`: 78 files moved, 26 test files moved into `packages/*/test/`, 440 specifiers rewritten (src 301, demo 65, tests 73, scripts 1). `exports` were generated from the doors actually reached: kernel 14 (+1 later), overlay 20. `dockContext.ts` moved to `overlay/src/_shared/overlay/` with its label constant `DOCK_CONTEXT_LABEL` (its only user).

| tool | first result | cause | change made | final |
|---|---|---|---|---|
| `regen-exports` | EXACT after 8 entries re-keyed to package paths | — | 8 CURATED rows | 68/68, 62 JS, 62 `typesVersions` |
| `vue-tsc --noEmit` (root) | 1 × TS2307 in `dock/index.ts` | the codemod's regex missed `export {…} from "./composables/dockContext"` (`dock/index.ts:58-67`): a comment inside the clause holds a `;`. The PORTFOLIO `graph.mjs` uses the same regex | `ts.preProcessFile` as the lexer (`carve-full.mjs`) | 0 errors; 17.5 s CPU vs 15.8 s at HEAD |
| `vue-tsc` per package | 29 × TS2353 (`dataSlot`, `data-slot`, `dataSurface`) | `src/html-attributes.d.ts` (L13-12) sits in the aggregate, outside the package's program | augmentation moved into kernel as door `./html-attributes`, loaded through `compilerOptions.types` | 0 errors |
| `vite` dev | 200 for every probed module; `@glass-ui/overlay/dialog` → `/packages/overlay/src/dialog/index.ts`, not pre-bundled; 0 log errors | yet 48 utility selectors silently absent from the compiled `demo.css` (`.z-modal`, `.z-overlay`, `.z-tooltip`, `.sheet-animate[…]`, `.bg-overlay-scrim`, 14 `rounded-*` …) | `demo.css:105-120` `@source` globs name `../src/components/**` | package globs: 3 left (the old `_shared/**/*.ts` glob had covered `rowClass.ts`); full carve with 5 globs: 0 |
| library build | fails at `buildStart`: `src/styles/index.css: dangling CSS reference @glass-ui/overlay/_shared/menu/menu.css` | `resolveSourceReference` returns null for any non-relative reference (`vite.style-fold.ts:118`, thrown at `:307`) | resolve `@glass-ui/*` through `exports`; follow it in the closure; copy package CSS to `dist/<pkg>/`; relink dist `@import`s | builds |
| declaration emit | exit 0, but 73 declarations absent and 48 `.d.ts` hold bare `@glass-ui/*` specifiers | TS treats a symlinked workspace package as an external library: it checks it, emits nothing for it and keeps the specifier | per-package emit into `dist/<pkg>/` plus a relinker in `flatten-subpath-types` | 0 bare specifiers in dist |
| in-build `verify-export-types` | `package.json/package-lock.json root metadata mismatch: workspaces, devDependencies` | lockfile not regenerated | `npm install --package-lock-only --offline` (0.4 s) | passes |
| post-copy passes | build green, yet `dist/overlay/sheet/styles.css` ships 29,921 B unminified with 0 of its 2 `-webkit-backdrop-filter` | `inlineFonts`, `normalizeShippedBackdropPairs`, `minifyStyleAssets` take literal roots (`vite.style-assets.ts:168-174`) | pass the package dist roots | the three relocated stylesheets byte-identical to HEAD |
| `vitest run` | 24 failed files / 79 tests, vs 6 / 12 at HEAD (HEAD's 6: timeouts under load, `dist-demo` absent, the comment-ratio revision check) | 14 read `src/components/…` by literal fs path (ENOENT); 4 tree-scanning gates (`overfit-structure` finds 0 portal writers, `orphan-css-partial` 478 vs < 421, `gate-register`, `public-surface`); 1 the style closure | not repaired | — |

Machinery added to reach green: `workspace-packages.mjs` (38 lines, new) and +85/−24 lines across `vite.style-fold.ts` (+32/−5), `vite.style-assets.ts` (+12/−2, then the pass roots), `flatten-subpath-types.mjs` (+18/−3) and `gen-component-styles.mjs` (+3). The diffs are in `<S>/patches/wt/`.

**Build-time delta.** Paired runs: HEAD 9.89 s / 9.24 s wall (12.5 / 11.5 s user); carve 14.93 s / 17.35 s wall (17.4 / 18.8 s user). That is +5 to +8 s (+55-85%), all of it the two extra `vue-tsc` processes. At 18 packages the same design costs 41.4 s wall / 64.6 s CPU. One incremental `vue-tsc -b` over a packages-only solution file brings the full carve to 23.0 s cold and 9.4 s warm, against 11.5 s at HEAD under the same load (§3). `vue-tsc -b` over 2 packages plus the root: 9.9 s cold, 6.1 s warm.

### Q2 · Does the aggregate reproduce regen-exports and the dist exactly?

- **Keys: yes.** Both carves report `EXACT REPRODUCTION: YES`: exportKeys 68/68, jsSubpaths 62, drops 0, adds 0, targetMismatch 0, tvDrops 0, tvAdds 0. The full carve re-keys all 62 moved entries through a 65-line `name → path` map (`artefacts/entries.json`).
- **Public surface: identical.** `surface.mjs` runs the TS compiler API over every `dist/<name>.d.ts` and parses the export statement of every entry `.js`: 63 declaration entries with 1,279 exported symbols, 0 entries differ; 63 JS entries with 603 export names, 0 differ; 0 declaration diagnostics inside either dist.
- **Dist file set: no.**
  - 2-package carve: 837 files in both; the top level (entries, relays, CSS roots, chunks after hash normalisation) is identical; 77 nested files relocate from `dist/components/…` and `dist/composables/…` to `dist/overlay/…` and `dist/kernel/…`.
  - Full carve: 836 against 837 (the dead `components/index.ts` barrel's declaration is gone); 610 of 611 nested files relocate.
- **Bytes: +467 (2 packages), +1,513 (full), 0.02-0.06%.** Scoped `data-v-*` ids hash the file path and relative import paths change length. `.bundle-ratchet` binds exact bytes, so every carve rebinds it.
- Keeping the old internal layout would take a dist placement map. No consumer can address those files, since `exports` admits only the 68 keys.

### Q3 · CSS `@import` across package specifiers

- **Dev (Tailwind v4 through `@tailwindcss/vite`).** `@import "@glass-ui/overlay/sheet/styles.css"` resolves through `exports`. The `@layer theme, base, components, utilities;` statement survives, and `cssorder.mjs` (postcss walk of layer path and selector) finds the 1,971 common rules in identical relative order in the 2-package carve and 2,019 in the full carve. The only dev loss is the `@source` utilities (Q1).
- **Build: the copy closure does not follow package specifiers.** It throws (loud), as above. After the patch, both published cascades were bundled with lightningcss (`bundlecss.mjs`):
  - 2-package carve: identical order, 1,773 rules; `component-styles.css` identical.
  - **Full carve: reordered.** `dist/styles/index.css` now ends `…carousel/styles.css; ../tokens/accessibility.css; ../glass-ui.css; ./components.css layer(components);`. HEAD ends `…carousel/styles.css; ../glass-ui.css; ./components.css layer(components); ./accessibility.css;`. `terminalImportIndex` (`vite.style-fold.ts:89-92`) finds the terminal import by the literal `./accessibility.css`. Once that file lives in `tokens`, the SFC bundle and the component utilities fold in after the accessibility mode, so the reduced-motion, contrast and coarse-pointer rules can lose ties to component rules. `verify-export-types` passed and the package gate passed.
- **Rung ladder.** It holds wherever no path anchor moved (the whole 2-package carve). The `./styles.css` manifest follows the closure (its 3 members re-point to `./tokens/…`).

### Q4 · Minimum-cut partitions at 8, 12 and 16 packages

Instruments:
- `atoms.mjs`: 94 atoms (each component dir, each `_shared` entry, each composable subtree, `motion` whole, the `glass` subdirs, `styles`, `fonts`).
- `scc.mjs` and `fas.mjs`: SCCs and the exact minimum feedback arc set, by DP over subsets.
- `partition.mjs`: balanced acyclic k-way min cut. It takes 6,000 random-affinity topological orders, splits each into k intervals by DP, then applies single-atom moves that keep the quotient acyclic. Balance is 0.25-2.0 × the mean code lines, relaxed to the largest indivisible unit.

Edges are value plus type, the edges references see: 494 between atoms, 1,306 between `src` files.

**The knot.** With motion whole, M02 is 14 atoms and 18,785 code lines (23,936 with CSS). Its exact minimum cut is 2 value edges:
- `_shared/overlay/participation.ts → dock/composables/dockContext.ts`
- `motion/morph/useSelectionGroup.ts → tabs/composables/useTabRovingFocus.ts`

M03 is 1 edge (`sheet/SheetContent.vue → dialog/ModalOverlay.vue`). `_shared/interaction ↔ _shared/selection` is a type-only 2-cycle (1 edge). Both M02 targets are leaf moves: `dockContext.ts` imports only `composables/context` and a label constant, and `useTabRovingFocus.ts` imports only vue and a type.

| k | at HEAD (M02 forced into one package) | after the 3 re-homes |
|---:|---|---|
| 8 | 279 cross-package edges, 16 package dependencies | 212 edges (42.9% of inter-atom), 20 dependencies |
| 12 | 286, 24 | 249 (50.4%), 34 |
| 16 | 290, 35 | 277 (56.1%), 38 |

- Every partition is acyclic (topological intervals plus acyclicity-checked moves). At HEAD they are acyclic only because one 18,785-line package absorbs M02, 3.3 × the k = 16 mean.
- The optimum is not a design. At k = 16 it puts `button card carousel dock easing labeled-field number-field slider toggle-group search` in one package. These numbers are a floor on edges, nothing more.
- **The charter's tree sketch**, mapped atom by atom in `sketch.mjs` (18 packages plus the aggregate):
  - at HEAD, one 10-package SCC (overlay dock track fields gpu surfaces feedback controls motion platform), minimum cut 7 file edges;
  - after the 3 re-homes, 2 SCCs remain (motion ↔ platform; dock/track/fields/controls/gpu), 5 edges;
  - five atom placements make it acyclic: `sidebar → motion`; `useSpecularTracking`, `vSpecular → gpu`; `tabs → fields`; `_shared/field → kernel`.
  - Result: 405 cross-package TS edges plus 71 from the aggregate, 72 package edges at type level, 58 runtime dependency declarations after the carve. That is 46% more edges than the k = 16 floor.

### Q5 · Peers, hoisting and the sibling `file:` links

- npm 11.12.1 with `"*"` ranges (it rejects `workspace:*`, W.md §5): `--package-lock-only --offline` adds `link: true` entries (4 lock entries for 2 packages; 18 links for 18). With `vue`, `reka-ui` and `@vueuse/core` declared as `peerDependencies`, the lock holds one copy of each.
- **Duplication probe.** Give kernel `dependencies: { vue: "~3.4.0" }` and the lock gains `packages/kernel/node_modules/vue 3.4.38` beside `node_modules/vue 3.5.40`. Dev and tests would load two Vue runtimes (two reactivity systems, separate injection keys). The library build hides it because `vue` is external.
- **Siblings (read-only).** None of the 7 live consumers links by `file:`: atlas `^6.0.0`, chicago `^10.0.1`, keyframes.js `7.0.0`, slides `3.13.0`, speedtest `^4.0.1`, value.js `^7.0.0`, bbnf-buddy `^3.9.0` are all registry dirs. One stale worktree (`keyframes-wt-H-W2-verify`) declares `file:../glass-ui`.
- **Leak simulation.** A dist module importing `@glass-ui/kernel/axes` resolves under a `file:` link (to `wt/packages/kernel/src/axes.ts`, through glass-ui's own `node_modules`). From a registry-shaped install it fails with `ERR_MODULE_NOT_FOUND: Cannot find package '@glass-ui/kernel'`. That is the monorepo-layout cascade class: green in the sibling layout, red from the registry. Gate clause C5 checks it; both carves ship 0.
- The aggregate must stay at the repo root. The sketch's `packages/glass-ui/` would point every `file:../glass-ui` link at a private workspace root.

### Q6 · Config added against machinery deleted; the dual-path check

**Added at 18 packages (`wt2`):**

| file | count | lines |
|---|---:|---:|
| `package.json` | 18 | 743 |
| `tsconfig.json` (composite + references) | 18 | 585 |
| `tsconfig.packages.json` | 1 | 59 |
| `tsconfig.refs.json` | 1 | 75 |
| `entries.json` | 1 | 65 |
| `workspace-packages.mjs` | 1 | 38 |
| total | 40 | 1,565 |

- 18 `tsconfig.build.json` (305 lines) exist only for per-package emit and drop out under `-b`.
- 18 READMEs were not written.
- Machinery patches: +85/−24 lines.

**Deleted, measured:**
- **The `@glass` alias, declared 4 times** (`tsconfig.json:17-18`, `vite.config.ts:22-26`, `vitest.config.ts:21-23`, `demo/vite.demo-dist.config.ts:55-57`): 15 code lines plus their comment blocks. One package-private map replaces it: `"imports": { "#glass/*": "./src/*.ts" }`. Measured in `wt2`: root typecheck 0 errors, vitest and dev resolve it, and 3 importers remain (all reach the aggregate root barrel). TS, Vite, vitest and Node read `imports` natively.
- **The classifier in `subpath-policy.mjs`**: about 290 of its 388 lines (the class maps at 48-164, the curated maps at 165-208, the disk walk and classification at 246-305, the entry glob at 306-323, file fidelity at 368-388). The 65-line entry map replaces them, and the resolver fail-closes a missing door. `CSS_FONT_EXPORTS`, `emitExports` and `libraryEntryMap` stay (about 70 lines).
- `regen-exports.mjs` loses its fail-closed and phantom layer: 10 flag lines and the classification pass, out of 210.
- Net: about +1,565 config lines against about −320 deleted.

**Dual path: none in the new exports.** Private `exports` are single string targets (35 keys in `wt`, 237 in `wt2`): 0 conditional objects and 0 `development` conditions. The aggregate has 63 `types`/`import` pairs and 0 keys with two runtime targets. Source-pointing internal exports are one path per specifier.

Two residues sit in HEAD itself:
- `vitest.config.ts:20` still lists the inert `"development"` condition (L13-16).
- One test takes the dist door by self-reference: `tests/components/fourier-field/FourierField.smoke.test.ts:18-19` imports `@mkbabb/glass-ui/fourier-math`, which resolves to `dist`. In `wt2` it fails typecheck (2 × TS2307) until a dist exists.

---

## 2 · The strongest form

What D1-C has to state precisely to work. Each clause carries the measurement that forced it.

1. **Layout.**
   - `packages/<name>/{package.json, tsconfig.json, README.md, src/, test/}`.
   - The aggregate stays at the repo root (Q5). It owns only `src/index.ts`, `src/styles/{index,fonts,theme}.css` (the three CSS exports), `src/fonts/` and the entry map.
   - Tooling lives at `tooling/<name>/` with `bin`.
   - The demo and `tests-visual` stay in the root package.
2. **One resolution path per specifier.**
   - Private `exports` are string targets into `src`, with no conditions.
   - The aggregate's `exports` point only into `dist`, and the aggregate reaches its own sources through `imports` (`#glass/*`).
   - The `@glass` alias and the `development` condition are deleted.
   - No code in the repo imports `@mkbabb/glass-ui`: self-reference reaches `dist`, a second door onto the same module.
3. **Dependencies.** Workspace dependencies use `"*"`. External runtime imports are only `peerDependencies`, with ranges equal to the aggregate's (the Q5 duplication probe). Tests may use `devDependencies`. TS `references` are derived from `dependencies` and never authored separately.
4. **Doors.** A door is an `exports` key. At the sketch granularity the measured door set is 237, of which 73 are `index.ts`; the other 164 are `.vue` files and internals reached from another package, the demo or a test. The spec must pick one:
   - accept per-file doors, in which case that count is the privacy given up;
   - or consolidate to one barrel door per sub-module and rewrite the importers (not measured).
5. **Build lifecycle.**
   - Declarations come from one `vue-tsc -b` over a packages-only solution file, with `tsBuildInfoFile` inside `outDir`. Without that, deleted outputs are never rebuilt (measured cold failure: `ENOENT … packages/binary/.tsbuild`).
   - A relinker rewrites `@glass-ui/<pkg>/<key>` in dist declarations and CSS to relative paths through each package's `exports`.
   - The style closure resolves package specifiers through `exports`.
   - Every post-copy pass and every positional anchor takes its roots from the workspace package list or from a declared role, never from a literal path (the accessibility anchor, the three passes).
   - Package output lands at `dist/<pkg>/…`.
6. **Tailwind sources.** The demo harness scans `packages/*/src` (5 globs measured). A single glob plus `@source not` for shader templates is the smaller form.
7. **Tests.** Single-package tests live in `packages/<p>/test/` (140 files at the sketch); the rest stay in `tests/`. A test reads a stylesheet or source file through the resolver (`import.meta.resolve("@glass-ui/tokens/glass.css")`) or relative to its own package, never through a `src/…` string.
8. **Prerequisite inversions.**
   - Three file re-homes: `dockContext.ts` with its label → overlay; `useTabRovingFocus.ts` → motion; the ambient augmentation → kernel.
   - Five atom placements for the sketch (Q4).
   - M03 needs nothing: dialog and sheet share overlay.
9. **The gate** (§4) is one executable. It is the only thing that stops an undeclared cycle (P2) or a relative reach (P3).
10. **Placement inside a package** is out of this family's scope. The full carve produced `packages/dock/src/dock/…` and `packages/motion/src/motion/…`; a placement rule from A, B or F decides it.

---

## 3 · Prototype on this tree

Four trees, all in scratch.

| probe | tree | gate | root typecheck | `vue-tsc -b` | test typecheck | vitest (failed files) | build | public surface |
|---|---|---|---|---|---|---|---|---|
| HEAD | `pristine` | RED (C1 647) | 0 errors | — | 0 | 6 | green | reference |
| kernel + overlay | `wt` | C1 570, C2 0, C4 0, C5 0; C3 2 (after the tooling carve: the gate reads only `packages/*`, so 2 tests importing `@glass-ui/tooling-exports` are an unknown package) | 0 | 0 (2 packages + root) | 0 | 24 | green after the patches | identical |
| + `tooling/exports` with `bin` | `wt` | as above | 0 | — | — | no new failures | green, dist generation hash unchanged (`056be4d0…`) | identical |
| 18 packages | `wt2` | **PASS**, C1-C5 all 0 | 0 | 0 over 18 references | 2 errors (the self-reference test; no dist yet) | 82: 66 literal-path ENOENT, 14 assertions, 1 `vi.mock` hoisting error, 1 timeout also at HEAD | green | identical (1,279 / 603 symbols) |

Also measured in `wt2`:
- Dev: every probed module returns 200, `demo.css` is missing 0 selectors, and the 2,019 common rules keep their order.
- Incremental `vue-tsc -b`: no-op 0.28 s; a leaf edit in `binary` 4.2 s; a `kernel` edit 23.9 s (it cascades to all 17 dependents). Cold `-b`: 35.1 s wall, 22.1 s CPU.
- The published `./styles` cascade reordered (Q3).
- A stale declaration: the codemod recorded `overlay → dock` from an import that the dock-label fix-up then removed. Gate C4 reported `dependency cycle: @glass-ui/dock -> @glass-ui/overlay -> @glass-ui/dock`. That produced the used-equals-declared clause in C3.

---

## 4 · The gate

`<S>/gate-packages.mjs <repoRoot> [--json]`. It lexes modules with `ts.preProcessFile` (and each SFC `<script>`), and CSS `@import` and `<style src>` with comment-stripped regexes. An unresolved relative specifier is a failure.

| clause | invariant |
|---|---|
| C1 | `src/` holds only the aggregate: `index.ts`, `entries/*.ts`, `styles/{index,fonts,theme}.css`, `fonts/**` |
| C2 | no relative specifier (module, `<style src>`, CSS `@import`) leaves its own package root |
| C3 | every `@glass-ui/<p>/<key>` names a declared dependency (`devDependencies` also count for tests and the aggregate) and a key in `<p>`'s `exports`; every declared workspace dependency is used by the package's `src` |
| C4 | the declared dependency graph is acyclic and equals the `tsconfig` references |
| C5 | no file under `dist/` carries `@glass-ui/` |

Clauses §2 still requires: C6, peer ranges equal the aggregate's and no external `dependencies`; C7, no `src/…` or `packages/…/src/…` path literal in tests, scripts or build modules; C8, no self-reference to `@mkbabb/glass-ui`.

**RED at HEAD** (`node gate-packages.mjs /Users/mkbabb/Programming/glass-ui`, read-only):

```
gate-packages: 0 package(s) [], 1068 files scanned, 0 package specifiers
  C1: 647      (src/components 459 · src/composables 109 · src/styles 78 · src/html-attributes.d.ts 1)
     src/components/PROCEDURAL-SUITE.md
     src/components/_shared/axes.ts
     … 645 more
  C2: 0  C3: 0  C4: 0  C5: 0  unresolved: 0
FAIL
```

**How it passes** (`wt2`, 18 packages): C1-C5 all 0, `PASS`, 1,067 files scanned, 1,041 package specifiers.

**It bites where TS does not.** Planted in `wt`:

```
C2: packages/overlay/src/dialog/index.ts (overlay) -> packages/kernel/src/class-names.ts (kernel) via module "../../../kernel/src/class-names"
C3: packages/kernel/src/class-names.ts (kernel): imports @glass-ui/overlay without declaring it
```

The planted run adds C2 1 and C3 1 on top of `wt`'s baseline. C4 stays 0: the cycle is undeclared, so only C3 sees it. The gate has to read `tooling/*` too; as prototyped it reads only `packages/*`.

TS project references alone, on the same kind of plants (`vue-tsc -b`):

| probe | result |
|---|---|
| P1: kernel references overlay (a declared cycle) | `TS6202: Project references may not form a circular graph` |
| P2: kernel imports `@glass-ui/overlay/dialog`, undeclared | 0 errors |
| P3: overlay imports `../../../kernel/src/class-names` | 0 errors |
| P4: overlay imports the aggregate's `src/…` by relative path | TS6059 + TS6307 |
| P5: bare `@glass-ui/kernel/src/class-names` (not a door) | TS2307 |

---

## 5 · Migration cost, measured on `wt2`

| item | measured |
|---|---|
| `src` files moved / deleted | 646 / 1 (the dead `components/index.ts`) |
| test files moved into `packages/*/test/` | 140 (239 vitest files in total; 107 remain in `tests/`) |
| specifiers rewritten | 1,327: src 526, demo 366, tests 430, tests-visual 2, scripts 2, `vite.dark-stamp.ts` 1 |
| package specifiers after the carve | 1,041 |
| doors | 237: kernel 13, platform 15, motion 40, gpu 12, surfaces 8, overlay 21, dock 14, feedback 8, controls 5, binary 3, track 5, fields 15, pager 5, disclosure 4, data 7, procedural 28, expressive 15, tokens 19 |
| workspace dependency declarations | 58 |
| new config | 40 files, 1,565 lines (Q6) |
| machinery changes | +85/−24 lines plus the `-b` switch; the accessibility anchor not yet fixed |
| entry re-keys | 62 of 63 |
| prerequisite inversions | 3 file re-homes, 5 atom placements |
| literal `src/…` strings left for hand repair | 430 in 87 files of tests, tests-visual and scripts; 23 of those files are directory scanners rooted in `src` |
| failing test files after the carve | 82 (76 above HEAD's 6) |
| deleted | the `@glass` alias ×4; about 290 lines of `subpath-policy.mjs`; the phantom layer of `regen-exports.mjs` |
| lockfile | +2 entries per package, one `link` each |

The charter estimated about 700 cross-package specifiers in `src` and 790 `@glass` specifiers; measured, 526 in `src` and 796 in demo and tests.

---

## 6 · Consumer surface

- `exports`: 68 keys, identical targets. `typesVersions`: 62, identical. Keys added or removed: zero.
- Symbols: 1,279 declaration symbols and 603 runtime exports, identical.
- Behaviour: identical in the 2-package carve. In the full carve the published `./styles` cascade reorders until the accessibility anchor becomes a declared role (Q3); shipped as it stands, that is a consumer-visible a11y change.
- Internal dist paths change (610 files). No key reaches them.
- Variant C′ (publish the sub-packages) rewrites every sibling import: 579 statements (atlas 70, chicago 29, keyframes.js 111, slides 18, speedtest 168, value.js 131, bbnf-buddy 52), plus an npm scope. Not prototyped.

---

## 7 · `scripts/` as the backend analogue, and a sibling's backend

**Prototype (`wt`).**
- `scripts/lib/subpath-policy.mjs`, `scripts/regen-exports.mjs`, `scripts/flatten-subpath-types.mjs` and `workspace-packages.mjs` became `tooling/exports`: `@glass-ui/tooling-exports`, with `exports` for 3 modules and `bin: { "glass-regen-exports": "./src/regen-exports.mjs" }`.
- 7 importers were rewired to bare specifiers: `vite.library.ts`, `vite.style-fold.ts`, `vite.style-assets.ts`, `gen-component-styles.mjs` and 3 tests. The lock records the `bin` and `link: true`.
- First run: `ENOENT … wt/tooling/src/components`. `REPO_ROOT` was `resolve(dirname(fileURLToPath(import.meta.url)), "../..")`.
- Eight tools derive the repo root from their own file location, and every move breaks them: `regen-spring-tokens.mjs:33`, `flatten-subpath-types.mjs:16`, `gen-component-styles.mjs:10`, `reflect-capture-verify.mjs:19`, `subpath-policy.mjs:40`, `profile-bundle.mjs:16`, `import-dag.mjs:55`, `canon-doc.mjs:25`.
- Fix: `workspaceRoot()` walks up from `cwd` to the `package.json` that declares `workspaces`. With it:
  - the bin exits 0 from the root and from `packages/overlay`;
  - the Vite config loads the tooling by bare specifier;
  - the build is green with an unchanged dist generation hash;
  - the 3 tests importing the policy fail only where the overlay carve had already failed them.

**The rest of `scripts/`** follows X.md §3.1:
- `exports`: the modules above plus `verify-export-types`.
- `styles`: `gen-component-styles`, `minify-css` and the `vite.*` build modules. Composite mode shows they need a project: 3 × TS6307 where the demo config reaches `vite.dark-stamp.ts`, `vite.targets.ts` and `vite.style-fold.ts`, and 4 × TS7016 in `vite.library.ts` and `vite.style-assets.ts`, which no tsconfig program includes at HEAD.
- `graph` (`import-dag`, `profile-bundle`), `release`, `capture`.
- Test-only helpers go to their consumers, not into a package: `paint-arm` → `tests-visual`; `gate-register` and `comment-census` → `tests/gates`.

**Carrying it to a sibling backend** (not prototyped; facts from X.md):
- TS on Hono: value.js `api/src/modules/{admin,color,meta,palette,session}` and `platform/` would each be a private workspace package with `exports`, and the server entry is the aggregate app. speedtest already runs `server`, `workers/speedtest-edge` and a lighthouse plugin as workspaces (X.md H8).
- Python: the analogue is a uv workspace with one distribution per domain. Python has no resolver privacy, so import-linter's `acyclic_siblings` and `protected` contracts carry C2-C4 (W.md measured both).
- Rust: bbnf's 14-crate Cargo workspace is this family as-is. Crate privacy works through `pub`, and cargo refuses a cyclic crate graph.

---

## 8 · Weaknesses (named counterexamples on this tree)

1. **The substrate does not enforce dependencies.** In P2 an undeclared `@glass-ui/overlay` import from kernel closes a real package cycle with 0 TS errors, because resolution through the `node_modules` symlink bypasses references. npm does not check it either (hoisted phantom). The "enforcement with no custom gate" optimisation does not hold.
2. **Relative reaches pass.** In P3, overlay importing `../../../kernel/src/class-names` compiles, bundles and runs. Resolver privacy covers bare specifiers only (W.md §2.3, reproduced here).
3. **Path anchors outside the resolver fail silently.**
   - `terminalImportIndex` reorders the published a11y cascade (Q3).
   - The `demo.css` `@source` globs drop 48 utilities (Q1).
   - The three post-copy passes shipped unminified, unprefixed sheet CSS (Q1).
   - Declaration emit drops 73 declarations and leaves 48 bare specifiers with exit 0 (Q1).
   - `verify-export-types` counts `devDependencies` as ownership for CSS imports (`verify-export-types.mjs:285`), so a private package listed there passes the CSS check while consumers fail.
4. **Path anchors outside the resolver fail loud.** 430 literal `src/…` strings in 87 files; 66 test files hit ENOENT after the full carve. Eight location-derived repo roots in the tooling. Mid-migration the 23 `src`-rooted scanners thin out instead of failing: `overfit-structure`'s single-writer check failed loud only because it asserts exactly one.
5. **Door bloat.** 237 doors at 18 packages against 73 barrels. Every `.vue` a neighbour imports becomes public inside the repo. Packwerk's retrospective reports where that ends: file shuffling and parked exemptions (W.md §8.3).
6. **Build time.** Per-package emit costs ×4.3 (41.4 s). With `-b`, cold is ×2.0 (23.0 s), and a kernel edit still takes 23.9 s incrementally. The `tsbuildinfo`-outside-`outDir` footgun failed a cold build.
7. **Churn on every move.** Scoped `data-v` ids hash paths, so each carve changes dist bytes (+467, +1,513) and forces a bundle-ratchet rebind.
8. **Granularity.** Package sizes run from 383 lines (binary) to 19,539 (procedural) and 14,631 (tokens, all CSS). The two largest are still the long-running modules the edict wants broken up. Balanced min-cut packages are incoherent (Q4).
9. **The sketch hides layering inversions.** `tokens` depends on `controls` because `styles/glass.css` imports `chip/accent-tone.css`. `track` depends on `dock` (`Slider.vue → useDockHold`, the G-NO-INWARD-DOCK violator).
10. **KISS (P-1).** About 1,565 new config lines in 40 files against about 320 deleted.
11. **Placement inside a package is unspecified.** The mechanism is agnostic, so it has to borrow a rule.

---

## 9 · Convergence and open gaps

Estimate: 62 of 100. The mechanism, the build lifecycle changes, the gate and the prerequisite inversions are measured end to end on the whole tree. Still missing: the door policy, the literal-path migration, the path-anchor inventory, the granularity decision and CI.

Open gaps:
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
