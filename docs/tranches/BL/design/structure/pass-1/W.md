# D1 · pass 1 · seat W: prior art and the state of the art

| field | value |
|---|---|
| seat | W (state of the art and prior art) for design loop D1: structure, the colocation edict N-1 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `79c3601b`. `git diff --stat 9a435606 HEAD -- src package.json vite.library.ts` is empty, so every baseline number in `PORTFOLIO.md` still holds |
| inputs | `PORTFOLIO.md` (all 694 lines): the six families D1-A..F and their pass-1 prior-art questions |
| instruments | WebFetch/WebSearch over primary docs. `gh api` recursive git trees of 15 repos pinned at SHAs (§4), with `W/stats.mjs` computing layout counts. Source tarballs of reka-ui and element-plus, grepped for door vs deep imports. Scratch probes, run on this machine: npm 11.12.1, Node 26.0.0, Vite 8.1.5 and tsc 6.0.3 (glass-ui's own binaries, run from scratch); cargo 1.98.0-nightly; import-linter 2.15; dependency-cruiser 18.4.0, run read-only over glass-ui `src` |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/W/`, called `W/` below |
| deliverable | For each surveyed system: the mechanism, how enforcement fails loudly, and the failure modes and migration costs reported in the wild. A comparison table keyed to D1-A..F (§10). No ranking |

Citations are URLs, `file:line` for glass-ui at HEAD, pinned-SHA GitHub paths for other repos, or a scratch probe with its output. "Measured" means a command in this session produced the number.

---

## 1 · Graph-rule linters: enforcement over a free tree

These tools leave the tree alone and check the import graph against declared rules.

### 1.1 Nx `@nx/enforce-module-boundaries`

**Mechanism.** An ESLint rule evaluated against the Nx project graph. The unit is an Nx *project*, not a directory. Tags are declared per project in `project.json`, and `depConstraints` (`sourceTag` or `allSourceTags` → `onlyDependOnLibsWithTags` / `notDependOnLibsWithTags`, plus `allowedExternalImports` / `bannedExternalImports`) combine with AND logic. Other options: `allow`, `banTransitiveDependencies` (default false), `enforceBuildableLibDependency`, `allowCircularSelfDependency` (default false), `ignoredCircularDependencies`, `checkDynamicDependenciesExceptions` ([nx.dev/docs/kb/enforce-module-boundaries](https://nx.dev/docs/kb/enforce-module-boundaries)). Tags usually run on two axes, `type:*` (feature, ui, util) and `scope:*` (domain) ([Nx blog](https://nx.dev/blog/mastering-the-project-boundaries-in-nx)).

**Loud failure.** The rule's own messages ([`enforce-module-boundaries.ts:180-198` @8591a65](https://github.com/nrwl/nx/blob/8591a65b8a1c5e819e3adbead52e1d0174ad572b/packages/eslint-plugin/src/rules/enforce-module-boundaries.ts#L180-L198)):

- "Projects cannot be imported by a relative or absolute path, and must begin with a npm scope"
- "Circular dependency between "{{sourceProjectName}}" and "{{targetProjectName}}" detected"
- "A project tagged with "{{sourceTag}}" can only depend on libs tagged with {{tags}}"
- "A project without tags matching at least one constraint cannot depend on any libraries"

**Failure modes in the wild.**

- The rule only fires in ESLint runs. `allow` and `ignoredCircularDependencies` are built-in exemptions.
- Graph cost: [nrwl/nx#36611](https://github.com/nrwl/nx/issues/36611) (opened 2026-08-09, closed), "reloads the entire project graph for every linted file outside recognized terminal runs (IDE, eslint_d, oxlint)".
- False positives: [#15957](https://github.com/nrwl/nx/issues/15957) flags plain npm imports as self-circular.
- Pressure to switch the check off: [#13842](https://github.com/nrwl/nx/issues/13842), "Disable Circular Dependency Check".
- The language-agnostic variant (Conformance `enforce-project-boundaries`) needs "an active Nx Enterprise license" ([nx.dev/docs/reference/conformance/overview](https://nx.dev/docs/reference/conformance/overview)).

**Bearing on glass-ui.** Nx boundaries presuppose projects, so in family terms they are D1-C plus tag-strata (D1-D) and tag-domains (D1-B). glass-ui has neither Nx nor ESLint. Its devDependencies are `@lucide/vue highlight.js @mkbabb/keyframes.js @mkbabb/value.js @tailwindcss/postcss @tailwindcss/vite @types/node @vitejs/plugin-vue @vue/compiler-sfc @vue/test-utils @vueuse/core happy-dom lightningcss postcss playwright reka-ui tailwindcss tw-animate-css typescript vite vitest vue vue-router vue-tsc` (measured from `package.json`).

### 1.2 eslint-plugin-boundaries (JS Boundaries, v7.1.0)

**Mechanism.**

- Element types are declared by path patterns.
- One rule, `boundaries/dependencies`, carries all policy. "When omitted, dependencies that match no policy are disallowed" ([rules/dependencies](https://www.jsboundaries.dev/docs/rules/dependencies/)).
- Selectors cover `dependency.kind` (`value`, `type`, `typeof`), file categories (public/private), and `internalPath` for entry points.
- A `relationship` selector with values `internal`, `child`, `descendant`, `sibling`, `parent`, `uncle` and `ancestor` expresses privacy. The migration example allows `["child", "sibling", "uncle"]` ([v5→v6 guide](https://www.jsboundaries.dev/docs/releases/migration-guides/v5-to-v6/)).
- Privacy is defined recursively: "When element B is a child of element A, B becomes a 'private' element of A, and only A is allowed to use it" ([rules overview](https://www.jsboundaries.dev/docs/rules/)).

**Loud failure.** "There is no rule allowing dependencies …" or "Denied by rule at index <n>" ([rules/dependencies](https://www.jsboundaries.dev/docs/rules/dependencies/)).

**Failure modes and cost.** The API churns:

- `element-types` → `dependencies`, `no-unknown` → `no-unknown-dependencies`, and `no-private` and `entry-point` are deprecated in v7 ([rules overview](https://www.jsboundaries.dev/docs/rules/)).
- v6 widened the default dependency nodes, so rules "also apply to other types of dependencies such as `export * from`, `require()`, and `import()`". A tree that was green turns red on upgrade ([v5→v6 guide](https://www.jsboundaries.dev/docs/releases/migration-guides/v5-to-v6/)).
- It is ESLint-hosted, so glass-ui would take on ESLint first.

**Family fit.** The relationship grammar maps one-to-one onto the recursive seal of D1-B and D1-F. "Uncle" (a sibling of an ancestor) is, by its name, the shape of D1-A's shared slot at the LCA. That reading is an inference from the selector name and was not probed.

### 1.3 dependency-cruiser (18.4.0)

**Mechanism.** A standalone CLI with no ESLint dependency ([rules-reference](https://github.com/sverweij/dependency-cruiser/blob/main/doc/rules-reference.md)). Rules come in three sets:

- `forbidden` (severity per rule)
- `allowed` (violations become `not-in-allowed`)
- `required`

The conditions available on a rule:

- `path` / `pathNot` regexes, with group matching (`$1` in `to` reuses a capture from `from`; the documented example forbids cross-component imports)
- `reachable`, `orphan`
- `circular` with `via` / `viaOnly`
- `dependencyTypes`, including `type-only`
- `moreUnstable`
- `numberOfDependentsLessThan`, with the documented example `no-unshared-in-shared`: `module: {path: "^shared/", numberOfDependentsLessThan: 2}`
- `scope: "folder"`, which "enable[s] rules to apply on folders instead of modules". It currently supports only `moreUnstable`, `circular` and `path`; "_via_ … still ha[s] to be implemented" ([rules-reference @918d919, lines 299-322](https://github.com/sverweij/dependency-cruiser/blob/918d9193edfae3fe1fb76cfe3d06cc0624539b91/doc/rules-reference.md#L299-L322))

**Measured at HEAD.** Configs are `W/dc-probe/probe.cjs` and `W/dc-probe/folder.cjs`, run from the glass-ui root as `depcruise src --config … --output-type json`, with outputs in `W/dc-probe/out{,2,3}.json`:

| run | result |
|---|---|
| default resolution | 259 modules cruised, **399 specifiers `couldNotResolve`** (extensionless SFC imports such as `accordion/Accordion.vue -> ../_shared/class-names`), 8 violations. Rules over the unresolved edges passed silently |
| with `enhancedResolveOptions.extensions: [.ts, .js, .vue, .json, .mjs]` | 414 modules, 1,213 dependencies, 9.74 s wall. 16 unresolved, all `@mkbabb/value.js/*` subpaths |
| `no-deep-into-sibling-component`: from `^src/components/([^/]+)/` to another component dir, door = `index.ts` | **255** module edges: `_shared` 245, dialog 4, dock 2, aurora 1, surface 1, sheet 1, menu 1. PORTFOLIO §1 counts 268 edges (257 + 11) |
| `unshared-in-composables`: `numberOfDependentsLessThan: 2` on `src/composables` | **31** modules. PORTFOLIO L13 counts 32 OWNED. The tool counts importing *modules*, not owning *units*, so a composable imported by three dock files counts as shared |
| `no-circular`, module scope, value edges only | **12** cycles, every one inside a single directory. Two are SFC ↔ own-door cycles: `src/components/alert/Alert.vue:4` imports `from "./"`, and `src/components/badge/Badge.vue:3` does the same. **Neither M02 nor M03 appears** |
| `no-circular`, `scope: "folder"`, value edges (`tsPreCompilationDeps: false`) | **28** violations over **14 leaf folders**: `components/_shared`, `_shared/overlay`, `_shared/surface`, `dock`, `dock/composables`, `menu`, `select`, `tabs`, `tabs/composables`, `composables/motion/morph` (the M02 knot), `dialog ↔ sheet` (M03), and one intra-component pair `aurora/composables ↔ aurora/constants` |

**Failure modes.**

1. **Silent under-resolution.** 399 specifiers went unresolved on this very repo before extensions were configured.
2. **File-level cycle rules cannot see directory knots.** M02 and M03 surface only at folder scope.
3. **Folder scope is per leaf directory, not per subtree.** A component's own sub-dirs register as a cycle (the aurora pair), and `viaOnly` cannot be used there.
4. **`numberOfDependentsLessThan` has limits.** It works only in `forbidden` rules and supports no group matching ([rules-reference](https://github.com/sverweij/dependency-cruiser/blob/main/doc/rules-reference.md)).

### 1.4 Sheriff and eslint-plugin-import (brief)

- **Sheriff** treats a folder with `index.ts` as a module: "The files that are not exported are encapsulated". In barrel-less mode, "All files in that subdirectory `internal` are encapsulated" ([sheriff.softarc.io/docs/module_boundaries](http://sheriff.softarc.io/docs/module_boundaries)). That is D1-B's door rule as an off-the-shelf ESLint plugin.
- **eslint-plugin-import** has `no-restricted-paths`, with `zones` of `target`/`from`/`except`/`message` ([docs](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md)), and `no-internal-modules`, with `allow`/`forbid` globs ([docs](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-internal-modules.md)). Zones are static lists with no capture groups, so N components need N zones.

---

## 2 · Language- and resolver-level privacy

### 2.1 Go `internal/`

**Mechanism.** A package under `.../a/b/c/internal/` "can be imported only by code in the directory tree rooted at `.../a/b/c`". The `go` command "verifies that the package doing the import is within the tree rooted at the parent of the `internal` directory". It has been enforced for every repository since Go 1.5 ([go1.4 release notes](https://go.dev/doc/go1.4#internalpackages)). The official layout guide keeps server logic in `internal/` and commands in `cmd/` ([go.dev/doc/modules/layout](https://go.dev/doc/modules/layout)). Test files `*_test.go` sit beside source and are ignored by `go build`, and a `_test` package suffix compiles them as an external black-box package ([cmd/go](https://pkg.go.dev/cmd/go#hdr-Test_packages)).

**Structure it forces.** Visibility is granted to the parent's subtree, so private code shared by two subtrees must sit at or above their LCA. This is D1-A's placement law enforced as a visibility rule (an inference from the rule text). Measured in golang/go @`a2052b8` (`W/tree_golang_go.json`): 42 `internal` directories. The largest is the zone root, `src/internal`, with 63 direct package dirs, followed by `src/cmd/compile/internal` (51) and `src/cmd/go/internal` (45). The root shared slot is the biggest bucket, which is D1-A risk 3 at scale.

**Failure modes.** Conventions get over-applied. Russ Cox wrote on `golang-standards/project-layout`: "the _vast_ majority of packages in the Go ecosystem do _not_ put the importable packages in a `pkg` subdirectory … what is described here is just very complex" ([project-layout#117](https://github.com/golang-standards/project-layout/issues/117)). Go is not installed here, so the compiler error text was not reproduced.

### 2.2 Rust modules and crates

**Mechanism.** Items are private by default: "If an item is private, it may be accessed by the current module and its descendants". `pub(crate)`, `pub(super)` and `pub(in path)` widen visibility, and the path must be an ancestor ([reference](https://doc.rust-lang.org/reference/visibility-and-privacy.html)). Unit tests live in the same file under `#[cfg(test)] mod tests` and can reach private items. Integration tests in `tests/` "can only call functions from the library's public API" ([book ch11-03](https://doc.rust-lang.org/book/ch11-03-test-organization.html)).

**Measured** (`W/rs-probe`, `cargo build`):

- A sibling module calling a `pub(super)` function fails with `error[E0603]: function 'measure' is private`.
- An undeclared file `src/orphan.rs` containing invalid syntax builds with exit 0. The module tree is declared with `mod`, so an unclaimed file rots silently. That is the failure mode of any declared-tree system with no unclaimed-file check (relevant to D1-E).

**Workspaces at scale.** matklad recommends a flat `crates/` layout "for projects in between ten thousand and one million lines of code". He argues that "even comparatively large lists are easier to understand at a glance than even small trees" and that trees deteriorate over time. rust-analyzer runs about 32 crates for about 200k lines, and internal crates use `version = "0.0.0"` ([Large Rust Workspaces](https://matklad.github.io/2021/08/22/large-rust-workspaces.html)).

### 2.3 Node `exports` / `imports` and TypeScript project references

**Mechanism.** Adding `"exports"` "will prevent consumers of the package from using any entry points that are not defined", which throws `ERR_PACKAGE_PATH_NOT_EXPORTED`. `"imports"` entries "must always start with `#`" and are "private mappings that only apply to import specifiers from within the package itself" ([nodejs.org/api/packages](https://nodejs.org/api/packages.html)).

**Measured** (`W/ws-probe`: package `@probe/a` with `exports: {".": "./src/index.js"}`, `imports: {"#internal/*": …}` and a `bin`, imported from package `b`):

| specifier from `b` | Node 26.0.0 | tsc 6.0.3 (`moduleResolution: bundler`) | Vite 8.1.5 build |
|---|---|---|---|
| `@probe/a` (the door) | runs | passes | builds |
| `@probe/a/src/internal/secret.js` | `ERR_PACKAGE_PATH_NOT_EXPORTED` | `TS2307: Cannot find module` | fails: `"./src/internal/secret.js" is not exported under the conditions ["module", "browser", "production", "import"]` |
| `#internal/secret` (a's private map) | `ERR_PACKAGE_IMPORT_NOT_DEFINED` | n/a | n/a |
| `../a/src/internal/secret.js` (relative) | **runs** | **passes** | **builds** |

With TS project references (`tsc -b`, both projects `composite`):

- `b` referencing `a`: the relative reach into `a/src/internal` **compiles (exit 0)**, because a reference grants access to all of the referenced project's files.
- `b` not referencing `a`: `TS6059` ("not under 'rootDir'") and `TS6307` ("not listed within the file list of project").

References may not be circular ([TypeScript PR #22420](https://github.com/microsoft/TypeScript/pull/22420): "project references may not be circular"). `composite` requires every file to be matched by `include`, and consumers read the referenced project's `.d.ts` ([handbook](https://www.typescriptlang.org/docs/handbook/project-references.html)).

**Consequence.** Resolver privacy covers bare specifiers only. The relative-path hole is why Nx's first message (§1.1) exists.

### 2.4 Bazel `visibility`

**Mechanism.** Targets declare `//visibility:private`, `//visibility:public`, `__pkg__`, `__subpackages__` or a `package_group`. "Allowing a package does not necessarily mean that its subpackages are also allowed". Violations are analysis-phase errors. The docs advise against a public `default_visibility` in growing codebases ([bazel.build/concepts/visibility](https://bazel.build/concepts/visibility)).

**In the wild.** Angular Material @`0c41bc7` has 376 `BUILD.bazel` files. `src/material/button/BUILD.bazel` is 207 lines and opens with `package(default_visibility = ["//visibility:public"])` ([line 11](https://github.com/angular/components/blob/0c41bc7ed86768a87d330c8a456b5f6917b21128/src/material/button/BUILD.bazel#L11)). It then restates each target's `deps`, which the Sass `@use` and TS imports already say. The manifest system is in place and its visibility lever is left open.

---

## 3 · Methodologies with declared strata and slices

### 3.1 Feature-Sliced Design, and Steiger (its linter)

The site returned HTTP 522, so these sources are pinned at the docs repo's @`6691676`.

**Layers.** `app`, `processes` (deprecated), `pages`, `widgets`, `features`, `entities`, `shared`. Import rule: "A module (file) in a slice can only import other slices when they are located on layers strictly below". App and Shared are exceptions and are "made up of segments, and segments can import each other freely" ([layers.mdx:35-43](https://github.com/feature-sliced/documentation/blob/6691676119fc998b6d58a2b32582c0074a072f2d/src/content/docs/docs/reference/layers.mdx#L35-L43)).

**Public API rule.** "Every slice … must contain a public API definition. Modules outside of this slice/segment can only reference the public API". Slice groups are allowed, but with "**no code sharing** in that folder". Segment names such as "`components`, `hooks`, and `types` are bad … because they aren't that helpful when you're looking for code" ([slices-segments.mdx:34-66](https://github.com/feature-sliced/documentation/blob/6691676119fc998b6d58a2b32582c0074a072f2d/src/content/docs/docs/reference/slices-segments.mdx#L34-L66)).

**Index-file failure modes, documented by FSD itself** ([public-api.mdx:71-163](https://github.com/feature-sliced/documentation/blob/6691676119fc998b6d58a2b32582c0074a072f2d/src/content/docs/docs/reference/public-api.mdx#L71-L163)):

- Circular imports through a slice's own index. The fix is relative imports within a slice and absolute imports across slices. glass-ui's `Alert.vue:4` and `Badge.vue:3` are this case (§1.3).
- `shared/ui` barrels break tree-shaking, so FSD recommends a separate index per component.
- "No real protection against side-stepping the public API", because an index forbids nothing. Steiger is the fix.
- Dev-server cost of many index files.

**Cross-imports.** `@x` is "a **last resort**" that "tends to lock entity boundaries together". The strategies are:

- A: merge the slices
- B: push the shared flow down
- C: compose from an upper layer (its Vue example uses slots)
- D: reuse only via the public API

Strictness is "a team/project decision" ([cross-imports.mdx:41-44, 52-197, 240-258](https://github.com/feature-sliced/documentation/blob/6691676119fc998b6d58a2b32582c0074a072f2d/src/content/docs/docs/guides/issues/cross-imports.mdx)). Strategy C is the shape of the M02 inversion (PORTFOLIO §6 Q8).

**Steiger @`04e0ae2`** ships 22 rules in `packages/steiger-plugin-fsd/src`. The relevant ones:

- `no-public-api-sidestep`
- `import-locality`: same-slice imports relative, cross-slice imports absolute
- `insignificant-slice`: "slices that have just one reference, to suggest merging it into the layer above". This is a graph-derived placement check, the D1-A idea as a lint rule
- `excessive-slicing`: threshold 20, "set to 20 arbitrarily"
- `segments-by-purpose`: its banned list includes `composables`, `composable`, `constants`, `hooks`, `components` and `utils` ([segments-by-purpose/index.ts:5-75](https://github.com/feature-sliced/steiger/blob/04e0ae2089d475ca41116c9a694ce32b27f6d1ae/packages/steiger-plugin-fsd/src/segments-by-purpose/index.ts#L5-L75); the Vue names are at lines 53-54)

**Tension with the edict.** The edict prescribes a `composables/` dir for module-level hooks and colocated `constants`. Steiger flags both names, and the Angular style guide says the same thing in general form (§3.2).

### 3.2 Angular: style guide, Package Format, ng-packagr

**Style guide** ([angular.dev/style-guide](https://angular.dev/style-guide)):

- "Avoid creating subdirectories based on the type of code … avoid creating directories like `components`, `directives`, and `services`".
- Group a component's TS, template and styles "together in the same directory".
- "Unit tests should live in the same directory as the code-under-test. Avoid collecting unrelated tests into a single `tests` directory".

**APF.** Entry points "define the granularity at which code can be lazily loaded". "Use entrypoints for the smallest sets of logically connected code possible", with `"sideEffects": false` ([APF](https://angular.dev/tools/libraries/angular-package-format)).

**ng-packagr.** A secondary entry point is any subdirectory with an `ng-package.json` (it can be `{}`), and entry points import each other by package name (`@my/library/testing`), not by relative path ([secondary-entrypoints.md](https://github.com/ng-packagr/ng-packagr/blob/main/docs/secondary-entrypoints.md)). A relative reach across entry points trips the same `rootDir` check measured in §2.3 (TS6059).

**In the wild, Angular Material @`0c41bc7`:**

- 36 `public-api.ts` entry points under `src/material`.
- `button/` holds 26 files: 8 `.ts` (including `button.spec.ts`, `index.ts` and `public-api.ts`), 2 `.html`, 14 `.scss` (10 of them partials), `button.md` and `BUILD.bazel`. `button/testing/` is a nested secondary entry point with its own `BUILD.bazel` (6 files).
- 140 specs sit beside source and 4 live in test dirs (`W/stats.mjs`).

That makes one tree simultaneously a capsule (D1-F), one door per component (D1-B) and a manifest system (D1-E).

### 3.3 Nuxt layers and path-derived component names

**Layers.** A layer extends `app/components/*`, `app/composables/*`, `app/utils/*`, `app/pages/*` and more, plus `server/*` ([authoring layers](https://nuxt.com/docs/4.x/guide/going-further/layers)).

- Priority runs: project > auto-scanned `~~/layers` (Z beats A) > `extends` (first entry wins). "Layers with higher priority override layers with lower priority when they define the same files or components" ([layers](https://nuxt.com/docs/4.x/getting-started/layers)).
- Global aliases `~/` and `@/` inside a layer "are resolved relative to the user's project paths".
- The docs describe no privacy between layers.

**Components.** Names derive from paths: `components/base/foo/Button.vue` → `<BaseFooButton />`, unless `pathPrefix: false`. Types are generated into `.nuxt/components.d.ts` ([components](https://nuxt.com/docs/4.x/directory-structure/app/components)).

**Against the standing law.**

- Override-by-name is two sources for one name, where the loser is silently shadowed. That is a masking fallback by design.
- Path-derived names make every move a rename.

### 3.4 Next.js App Router

"A route is **not publicly accessible** until a `page.js` or `route.js` file is added". So "project files can be **safely colocated** inside route segments", and `_folder` "opt[s] the folder and all its subfolders out of routing". Next.js is "**unopinionated** about how you organize and colocate your project files" ([project-structure](https://nextjs.org/docs/app/getting-started/project-structure)). The mechanism is filename-driven discovery, the same shape as D1-F's suffix discovery.

---

## 4 · Vue and React component-library source trees (measured)

Trees are fetched with `gh api repos/<r>/git/trees/<sha>?recursive=1` (none truncated) and counted with `W/stats.mjs`. "Beside" means in the same directory as the source file.

| library @ SHA | unit example | tests | stories / demos | styles | largest flat dir |
|---|---|---|---|---|---|
| reka-ui @`22ec2bc` | `packages/core/src/Dialog/`: 12 SFCs, `index.ts`, `utils.ts`, `Dialog.test.ts`, `story/` (6) | 101, all beside | 176 in per-component `story/` | none (unstyled) | `src/shared` 59 |
| Vuetify @`b6c9f5c` | `components/VBtn/`: `VBtn.tsx`, `VBtn.sass`, `_variables.scss`, `_mixins.scss`, `index.ts`, `__tests__/VBtn.spec.browser.tsx` | 85, all in `__tests__` | none | 264 files, colocated. `VBtn.tsx:2` runs `import './VBtn.sass'` | `src/composables` 64 |
| PrimeVue @`c51a51a` | `src/button/`: `Button.vue`, `BaseButton.vue`, `Button.d.ts`, `Button.spec.js`, `package.json`, `style/ButtonStyle.js` | 78, beside | none | JS style objects in `style/`, presets in a separate `packages/themes` | `src/datatable` 17 |
| Element Plus @`99160bf` | `packages/components/button/`: `index.ts`, `src/{button.vue, button.ts, use-button.ts, constants.ts, …}`, `style/{index,css}.ts`, `__tests__/button.test.tsx` | 162, all in `__tests__` | none | central: `packages/theme-chalk/src/button.scss` | `theme-chalk/src` 121 |
| Nuxt UI @`21c5a7f` | `src/runtime/components/Button.vue` + `src/theme/button.ts` | 149, mirrored in top-level `test/components/Button.spec.ts` | none | theme objects in `src/theme` | `src/runtime/components` 124, `test/components/__snapshots__` 228 |
| shadcn-vue @`67c9a39` | `registry/new-york-v4/ui/button/{Button.vue, index.ts}` (67 ui dirs) | 0 in registry | n/a | Tailwind classes inline | `ui/sidebar` 26 |
| VueUse @`efdd69a` | `packages/core/useMouse/{index.ts, index.md, demo.vue, component.ts, demo.browser.test.ts}` (149 function capsules) | 127, beside (89 `.browser.test.ts`) | 131 `demo.vue`, beside | none | `packages/core` 10 |
| Vue core @`4ab865a` | `packages/<pkg>/src` + `__tests__` | 196, all in `__tests__` | n/a | n/a | `runtime-core/src` 34 |
| Radix Primitives @`f7ecd5a` | `packages/react/dialog/src/{dialog.tsx, dialog.test.tsx, index.ts}` | 45, beside | none | unstyled | `react/radix-ui/src` 35 |
| Chakra UI @`55aee43` | `packages/react/src/components/button/*.tsx`, recipe in `theme/recipes/button.ts` | 34, all in `__tests__` | 124 in one flat `packages/react/__stories__` | central recipes | `__stories__` 124 |
| MUI @`1de627f` | `mui-material/src/Button/{Button.js, Button.d.ts, Button.test.js, Button.spec.tsx, buttonClasses.ts, index.js, accessibility.md}` | 253, beside | none | JS | `src/styles` 90 |
| Angular Material @`0c41bc7` | `src/material/button/` (26 files, §3.2) | 140, beside | none | `.scss` colocated | `datepicker` 55 |

**Door discipline, measured by grepping source tarballs.**

- **reka-ui** (`W/reka-src`, 660 non-test, non-story source files): 875 cross-component imports go through a door (`@/Combobox`) and **45 go deep** (4.9%), for example `Autocomplete/AutocompleteRoot.vue -> @/Combobox/ComboboxRoot.vue`. Another 447 go into `@/shared`, and 193 component pairs import each other sideways. Its `eslint.config.mjs` is the `@antfu/eslint-config` preset with no boundary rule. Doors kept by convention alone drift at about 5%.
- **Element Plus** (`W/ep-src`, 1,113 files): 1,587 door imports and 678 deep. 416 of the deep imports go to the per-component `style` / `style/css` entry, a second door grade by convention. 19 reach into another component's `src/`, from 9 component dirs.

**Patterns.**

- Every library keeps a global hook or utility slot: Vuetify `composables/` (64 direct files), Element Plus `packages/hooks` (59), reka-ui `shared/` (59), Nuxt UI `runtime/composables` (24).
- Long flat directories are common and unbroken: 124, 121, 124 and 90 files.
- Styles split between colocated (Vuetify, Angular Material) and a central theme package (Element Plus, PrimeVue, Chakra, Nuxt UI).

---

## 5 · Workspaces that publish one aggregate

| project | internal units | privacy of internals | aggregate mechanism | reported cost or failure |
|---|---|---|---|---|
| Element Plus | pnpm workspace `packages/*`, `internal/*`. `@element-plus/components`, `hooks`, `theme-chalk` and `utils` (private) have **no `exports` field** (measured from each `package.json`) | none from the resolver: deep imports resolve (678 measured) | rolldown over the glob `**/*.{js,ts,vue}` with `preserveModules` ([`modules.ts:21-49`](https://github.com/element-plus/element-plus/blob/99160bfef76fb29ea8e7abe576a23b0afd3778c7/internal/build/src/tasks/modules.ts#L21-L49)), filtered by `excludeFiles` ([`pkg.ts:31-38`](https://github.com/element-plus/element-plus/blob/99160bfef76fb29ea8e7abe576a23b0afd3778c7/internal/build-utils/src/pkg.ts#L31-L38)) | the exclusion is a **path-substring list** `['node_modules','test','mock','buildfile','dist']`: any source path containing "test" after the project root drops out of the build |
| Radix Primitives | `packages/react` holds 58 `@radix-ui/react-*` packages plus the `radix-ui` aggregate, none marked `private`; 3 more under `packages/core` | per-package `exports` | the `radix-ui` package depends on 55 of them. `src/index.ts` is `export * as Dialog from '@radix-ui/react-dialog'` …, and `exports` is `"."` and `"./*"` | added 2025-01-22 "without worrying about conflicting or duplicate dependencies" ([releases](https://www.radix-ui.com/primitives/docs/overview/releases)): split packages had caused version skew for consumers |
| Chakra UI | v2.8.0 tag: 55 packages under `packages/components` (90 `package.json` under `packages/`). v3: 5 packages | n/a | v3 consolidates into `@chakra-ui/react` | consolidation shipped with a codemod, and removed packages (`@chakra-ui/hooks`, `icons`, `next-js`) need consumer rewrites ([migration](https://chakra-ui.com/docs/get-started/migration)) |
| Vue core | 12 packages in `packages/`, 11 of them published (`runtime-test` is `private`). Unpublished tooling lives in `packages-private/` (dts-test, sfc-playground, template-explorer, vite-debug) | `@vue/reactivity`, `runtime-core` and `shared` export `"./*"` | `vue` re-exports its `@vue/*` dependencies | none cited |
| PrimeVue | one package. 148 per-component `package.json` files under `src/` (e.g. `main: ./Button.vue`) | in-repo `exports` has 273 keys pointing at source (`./button` → `./src/button/Button.vue`) | on publish, `publishConfig.exports` (2 wildcard keys to `dist`, `directory: "dist"`) replaces the map | **two export maps for one package**: a dual path by construction |
| VueUse | several packages (`core`, `shared`, `math`, `integrations`, `rxjs`, `router`, `firebase`, `electron`, `components`, `nuxt`). `packages/core` holds 149 function capsules | `@vueuse/core` 14.3.0 exports `"./*"` (measured in glass-ui's node_modules) | `packages/core/index.ts` is generated by `updateImport` ([`scripts/utils.ts:52-97`](https://github.com/vueuse/vueuse/blob/efdd69a1481205051e85d9c815eaa5840237f2d1/scripts/utils.ts#L52-L97)) | none cited |

**Package managers.**

- **pnpm:** `workspace:` means "pnpm will refuse to resolve to anything other than a local workspace package", and `workspace:*` is rewritten to the concrete version on publish ([pnpm workspaces](https://pnpm.io/workspaces)). Peer dependencies across workspace packages need `dependenciesMeta.*.injected`, because "Symlinking does not provide a way for the `react` peer dependency to be satisfied differently by different consumers". The hard-linked copies then have to be kept in sync ([pnpm package_json](https://pnpm.io/package_json)).
- **npm, glass-ui's manager:**
  - **`workspace:*` fails with `EUNSUPPORTEDPROTOCOL` on npm 11.12.1** (measured, `W/ws-probe`; [npm/cli#8845](https://github.com/npm/cli/issues/8845), open since 2025-12-09). A plain `"*"` range resolves to the symlinked workspace (`node_modules/@probe/a -> ../../packages/a`).
  - Workspaces are "auto-symlinked during `npm install`" ([npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces)).
  - glass-ui already declares `"workspaces": ["tests-visual"]` (`package.json`).

---

## 6 · Tests beside source vs mirrored

| system | default discovery | beside source? | source |
|---|---|---|---|
| Vitest | `include: ['**/*.{test,spec}.?(c\|m)[jt]s?(x)']`, relative to `root` | the default finds tests anywhere | [config/include](https://vitest.dev/config/include) |
| Vitest projects | `test.projects` (the old `workspace` is "deprecated since 3.2"); per-project `include` plus `environment` (docs example: `*.unit.test.ts` vs `*.browser.test.ts`) | suffix-split beside source | [guide/projects](https://vitest.dev/guide/projects) |
| Vitest in-source | `if (import.meta.vitest)` + `includeSource`; build `define: {'import.meta.vitest': 'undefined'}` | in the file itself. The docs: "use separate test files instead for more complex tests like components or E2E testing" | [guide/in-source](https://vitest.dev/guide/in-source) |
| Playwright | `testMatch: "**/*.@(spec\|test).?(c\|m)[jt]s?(x)"`, `testDir` = the config's directory | the default overlaps Vitest's | [TestConfig](https://playwright.dev/docs/api/class-testconfig) |
| Storybook | `stories: ['../src/**/*.stories.@(js\|jsx\|mjs\|ts\|tsx)']`: "the intention is for you to colocate a story file along with the component it documents" | yes | [configure](https://storybook.js.org/docs/configure#configure-story-loading) |
| Go | `*_test.go` beside, ignored by `go build` | yes | [cmd/go](https://pkg.go.dev/cmd/go#hdr-Test_packages) |
| Rust | unit tests in-file; `tests/` sees public API only | yes and mirrored, by kind | [book ch11-03](https://doc.rust-lang.org/book/ch11-03-test-organization.html) |
| Angular | `.spec.ts` beside source | yes | [style-guide](https://angular.dev/style-guide) |
| Kent C. Dodds | "Place code as close to where it's relevant as possible"; tests beside, e2e at the root as the exception | yes | [colocation](https://kentcdodds.com/blog/colocation) |

**Dist purity in the wild.**

- reka-ui publishes `src` and keeps stories and tests out with six negation globs in `files`: `!src/**/*.story.vue`, `!src/**/*.test.*`, `!src/**/_*.vue`, `!src/**/__snapshots__`, `!src/**/stories`, `!src/**/story` (`packages/core/package.json` @`22ec2bc`). The installed reka-ui 2.10.1 tarball holds 654 `src` files, **0** story files and **0** test files (measured with `find` in glass-ui's `node_modules/reka-ui`). Its JS build is entry-driven (5 entries in `tsdown.config.ts:35-42`), so `dist` stays clean by reachability. The exclusion list is needed only because `src` ships.
- Element Plus uses the substring exclude described in §5.

**glass-ui today.**

- `package.json` `files` is `["dist", "MIGRATION.md"]`, so no `src` ships and purity reduces to entry reachability plus the scope of declaration emit.
- Playwright uses `testDir: "."` and `testMatch: "*.spec.ts"` (`tests-visual/playwright.config.ts:48-49`), and Vitest's `include` is at `vitest.config.ts:31`.
- A capsule layout that puts both kinds in `src/` needs suffixes the two runners do not share (for example the portfolio's `*.visual.ts`).

---

## 7 · CSS colocation and cascade order

**The cascade primitive.** Layer order is set "by the order in which layer names first appear". Rules added to a layer later are appended "and the layer order will not be changed". "Styles that are not defined in a layer always override styles declared in named and anonymous layers". `@import "x.css" layer(name)` places a file in a layer ([MDN @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)).

With one order statement first, which is glass-ui's `src/styles/index.css:1` (`@layer theme, base, components, utilities;`), cross-module order becomes a function of layer names for layered rules. Order sensitivity remains only for ties inside one layer and for every unlayered rule.

**Where JS-driven colocation breaks order.**

- [vitejs/vite#3924](https://github.com/vitejs/vite/issues/3924): open since 2021-06-23, 82 comments, "Vite injects css assets in wrong order with dynamic import and css modules".
- [vitejs/vite#21903](https://github.com/vitejs/vite/issues/21903): open, 2026-03-17, 35 comments. With Vuetify's auto-imported component CSS, dev injects component CSS *after* the static imports and production places it *before* them, reversing the cascade ("icons that appear bigger and bolder in production").
- Vuetify colocates `VBtn.sass` through a JS import (`VBtn.tsx:2`) and wraps it in `tools.layer('components')` (`VBtn.sass:9`).
- Related open issues: [#4890](https://github.com/vitejs/vite/issues/4890), [#6375](https://github.com/vitejs/vite/issues/6375), [#22301](https://github.com/vitejs/vite/issues/22301).

**Tailwind v4.**

- SFC `<style>` blocks "are each processed by your build tooling totally separately". Tailwind recommends "avoiding `<style>` blocks in your components". If they are used, `@reference "../app.css"` brings in theme and utilities without duplicating output ([compatibility](https://tailwindcss.com/docs/compatibility), [directives](https://tailwindcss.com/docs/functions-and-directives)).
- Class detection skips CSS files, `.gitignore`d paths and `node_modules`. It can be rooted with `source("../src")`, disabled with `source(none)` and narrowed with `@source not` ([detecting classes](https://tailwindcss.com/docs/detecting-classes-in-source-files)). A move that stays inside the scanned root changes nothing.

**glass-ui facts (measured at HEAD).**

- `src/styles/index.css` has 36 `@import` lines and 0 use `layer()`.
- 17 SFCs load CSS through `<style src>`.
- 0 files use `@reference`.

Two channels (PORTFOLIO §6 Q4) is the configuration in which Vite's injection order matters.

---

## 8 · Backend analogues

### 8.1 Python

- **src layout.** It "helps prevent accidental usage of the in-development copy of the code" and "helps enforce that an editable installation is only able to import files that were meant to be importable" ([PyPA](https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/)).
- **PEP 8.** Use `__all__`, and prefix with an underscore anyway. "An interface is also considered internal if any containing namespace (package, module or class) is considered internal" ([PEP 8](https://peps.python.org/pep-0008/#public-and-internal-interfaces)). That is recursive privacy by convention. Ruff `PLC2701` (preview) lints underscore imports from other modules ([ruff](https://docs.astral.sh/ruff/rules/import-private-name/)).
- **import-linter.** Contract types ([docs @31927f1](https://github.com/seddonym/import-linter/tree/31927f1457e3df673912cb5efb0afa6dbc37585f/docs/contract_types)):
  - `forbidden`
  - `independence`
  - `layers`: `containers`, siblings independent via `a | b | c`, `exhaustive` with `exhaustive_ignores`, and indirect import chains counted
  - `protected`: only an allow-list may import
  - `acyclic_siblings`: "repeats down the generations, drilling into each subpackage", depth default 10

  `unmatched_ignore_imports_alerting` defaults to `error`, so a stale exemption fails the run.
- **Measured** (`W/py-probe`, import-linter 2.15, `lint-imports` exit 1):
  - `protected`: `Illegal imports of protected package lib.dock.morph: - lib.slider.reach -> lib.dock.morph (l.1)`
  - `acyclic_siblings`: `No cycles are allowed in lib. It could be made acyclic by removing 1 dependency: - .overlay -> .dock (1 import)`. It names the minimal cut, which is what M02 needs.
  - A stale `ignore_imports` line: `No matches for ignored import lib.slider.gone -> lib.dock.` stops the run.
- **Kraken in the wild.** 27,637 modules, about 400 developers, "over 40 contracts" checked on every PR, three top layers (clients > territories > core), and ignored imports burned down to 15. Their lessons: layering needs "inversion of control" workarounds that add local complexity, and it pushes code toward "client and territory-specific rather than … globally useful code into the core" ([EuroPython blog](https://blog.europython.eu/kraken-technologies-how-we-organize-our-very-large-pythonmonolith/)).
- **Tach.** A Rust-implemented Python boundary and interface checker (`tach.toml`). The repository is active: not archived, last push 2026-09-15 ([gauge-sh/tach](https://github.com/gauge-sh/tach)).

### 8.2 Node tooling as packages with `bin`

- `bin` maps a command to a file with a `#!/usr/bin/env node` shebang, and `"private": true` blocks publishing ([npm package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)).
- Measured (`W/ws-probe`): the workspace's `bin` links into the root `node_modules/.bin/probe-a -> ../@probe/a/src/cli.js`, and `npx --no-install probe-a` runs it, importing its own package by name (self-reference, [Node docs](https://nodejs.org/api/packages.html)).
- Package-private aliases through `imports` (`#…`) are Node's per-package analogue of Go's `internal/`, and they fail with `ERR_PACKAGE_IMPORT_NOT_DEFINED` from outside (§2.3). Go's own layout for tools is `cmd/<tool>/main.go` over `internal/` (§2.1).
- glass-ui's `package.json` has no `bin` and no `imports` field (measured). Its tooling is `scripts/` (17 files, 6,855 lines) plus 9 root build modules (PORTFOLIO §0).

### 8.3 Ruby: Packwerk

- **Privacy checks, removed in 3.0.** They "had transformed Packwerk into something it was never intended to be: an API design tool". They also "required a separate `app/public` directory … denot[ing] privacy level instead of architecture concepts" ([Packwerk retrospective](https://railsatscale.com/2024-01-26-a-packwerk-retrospective/)).
- **The field report behind the removal**, from a Shopify maintainer: "we didn't see much value in the privacy checks. Most of our packages have this option disabled and when we do have them enabled, people mostly fix this kind of violations mostly by moving files around, without improving the APIs, or, even worse, people just record the deprecations and forget about them" ([Shopify/packwerk discussion #219](https://github.com/Shopify/packwerk/discussions/219), 2022-08-11). Removal landed in [PR #247](https://github.com/Shopify/packwerk/pull/247), merged 2022-11-14.
- **Todo files.** Packwerk "generated monstrously large todo files for every component. With every new feature added, these todo files grew larger".
- **Checks vs running code.** Per the retrospective, clearing every violation in a base package did not make it boot in isolation. Its conclusion: "running code, more than any metric, will always be the best indicator of real progress".

---

## 9 · Recurring failure modes across systems

| # | failure mode | seen in | signal glass-ui already shows |
|---|---|---|---|
| 1 | Lint-level checks have escape hatches and fire only in lint runs | Nx `allow`/`ignoredCircularDependencies`; FSD "no real protection" without Steiger | none: no lint tool is installed |
| 2 | Resolver privacy covers bare specifiers only; relative paths bypass it | measured in Node, tsc and Vite (§2.3); TS references grant full internal access | n/a today (no packages) |
| 3 | Privacy enforcement turns into file shuffling and parked exemptions | Packwerk #219, #247 | PORTFOLIO D1-B risk 2 (door bloat) |
| 4 | Exemption lists grow without an expiry | Packwerk todo files; Kraken's long burn-down to 15 | import-linter's default `error` on an unmatched ignore is the counter-mechanism (measured) |
| 5 | Unresolved edges pass silently | dependency-cruiser: 399 unresolved at HEAD by default | the gate must fail on any unresolved `src` specifier |
| 6 | File-level cycle rules miss directory knots | dependency-cruiser module scope: 12 cycles, none M02 | folder scope finds M02 + M03 (28 violations, 14 folders) |
| 7 | Doors create self-import cycles | FSD public-api.mdx:92-109 | `Alert.vue:4`, `Badge.vue:3` |
| 8 | Barrel weight | TkDodo: modules 11k → 3.5k after removing internal barrels ([post](https://tkdodo.eu/blog/please-stop-using-barrel-files)); Atlassian: "75% reduction in build minutes", unit tests per build 1,600 → 200, "over 90,000 files within a few days" via a fixable ESLint rule ([Atlassian](https://www.atlassian.com/blog/atlassian-engineering/faster-builds-when-removing-barrel-files)) | PORTFOLIO D1-B risk 3 (`profile-bundle` already RED) |
| 9 | Dual export maps | PrimeVue in-repo `exports` vs `publishConfig.exports` | PORTFOLIO D1-C risk 1 |
| 10 | Exclusion lists for dist purity | reka-ui's 6 `files` negations; Element Plus substring `excludeFiles` | glass-ui ships `dist` only |
| 11 | Name shadowing across layers | Nuxt layers override by name | conflicts with E-1 and the no-masking rule |
| 12 | Declared trees orphan silently | rustc ignores an undeclared `orphan.rs` (measured) | D1-E needs its "unclaimed file" clause |
| 13 | Essence-named dirs are discouraged | Steiger `segments-by-purpose` (bans `composables`, `constants`); Angular style guide | the edict prescribes `composables/` |
| 14 | Flat long lists tolerated at scale | matklad (flat `crates/`); flat dirs of 59-124 files in reka-ui, Vuetify, Element Plus, Nuxt UI, Chakra, MUI; `src/internal` with 63 packages in Go | the edict requires breaking long dirs; Steiger's 20 is "arbitrary" |
| 15 | Unenforced doors drift | reka-ui 45/920 deep (4.9%) with no rule | 255 deep module edges at HEAD (§1.3) |

---

## 10 · Comparison table keyed to the six families (not ranked)

| family | prior art implementing it | mechanism in the prior art | how it fails loudly | failure modes reported in the wild | migration cost reported in the wild | glass-ui facts that bear on it (measured) |
|---|---|---|---|---|---|---|
| **Graph-derived placement** (D1-A) | React "locate the closest common parent" ([react.dev](https://react.dev/learn/sharing-state-between-components)); Dodds colocation; Go `internal/` (visibility = parent subtree, which forces LCA placement); Steiger `insignificant-slice`; dependency-cruiser `numberOfDependentsLessThan`; Knip's entry-reachability ([knip.dev](https://knip.dev/)) | tools **check** placement (a module with one consumer is flagged); none surveyed **computes** a target directory | lint diagnostic (Steiger), rule violation (dependency-cruiser), build refusal (Go, for visibility rather than placement) | the zone-root slot becomes the largest bucket (Go `src/internal` 63 packages); consumer counts are per module, not per unit (31 vs 32); unresolved edges hide misplacement | no automated LCA migration found in the wild. Mass specifier rewrites are proven feasible by a fixable ESLint rule (Atlassian, 90k files) | dependency-cruiser runs in 9.74 s over 414 modules; 31 composables with fewer than 2 dependents |
| **Sealed family modules, one door** (D1-B) | FSD public-API rule + Steiger `no-public-api-sidestep`; Sheriff (`index.ts` = module); eslint-plugin-boundaries `relationship`; Rust `pub(super)`/`pub(in path)`; Angular secondary entry points; Python `protected` contracts | a directory's door is the only legal target from outside; nesting is recursive (boundaries `child`/`descendant`, Rust ancestors, PEP 8 containing namespace) | Rust E0603; import-linter "Illegal imports of protected package"; boundaries "no rule allowing"; dependency-cruiser `$1` rule | privacy fixes become file moves, and checks get disabled (Packwerk #219, removed in 3.0); door self-import cycles; barrel cost; `@x` escape hatches lock slices together; without a rule, doors drift at about 5% (reka-ui) | Packwerk's "monstrously large todo files"; Atlassian's barrel removal as the reverse migration | 255 deep module edges (245 into `_shared`); 12 file cycles including 2 self-door; no lint host installed |
| **Workspace packages** (D1-C) | Element Plus internal packages + aggregate; Radix 58 packages + `radix-ui`; Vue core 11 published + `packages-private`; Chakra v2 (55) → v3; rust-analyzer's flat `crates/`; Nx projects | `package.json` `exports` enforced by the resolver; TS project references acyclic; declared dependencies | Node `ERR_PACKAGE_PATH_NOT_EXPORTED`; Vite "is not exported under the conditions"; tsc TS2307; TS6059/TS6307 for unreferenced reaches | relative paths bypass all three (measured); references expose all internals (measured); `"./*"` wildcards erase privacy (Vue core, `radix-ui`, `@vueuse/core`); dual export maps (PrimeVue); peer duplication (pnpm `injected`); version skew across split packages (Radix's reason for the aggregate) | Chakra folded 55 component packages into one, with a codemod plus manual review; Element Plus builds the aggregate by glob plus a substring exclusion list | npm 11.12.1 rejects `workspace:*` (measured); `workspaces: ["tests-visual"]` already exists; 68 explicit export keys, one wildcard (`./fonts/*`) |
| **Declared layered strata** (D1-D) | FSD layers; import-linter `layers` (`containers`, `\|` independence, `exhaustive`); Nx `type:*` tags; Kraken's clients > territories > core | a fixed rank; imports go down only; same-rank siblings independent | import-linter `BROKEN` with the minimal cut; Nx `onlyTagsConstraintViolation`; Steiger `forbidden-imports` | inversion-of-control workarounds and pressure toward leaf-specific code (Kraken); taxonomy churn (FSD deprecated `processes`); cross-import escape hatches (`@x`) | Kraken burned ignored imports down to 15 over time in 27,637 modules | the folder-cycle set (M02 + M03) must break before any rank check can pass (28 violations, 14 folders) |
| **Manifest-generated wiring** (D1-E) | Bazel BUILD `visibility`; shadcn-vue `_registry.ts` → generated `__index__.ts`; VueUse `index.md` frontmatter → generated `index.ts`; Nuxt `.nuxt/components.d.ts`; PrimeVue's 148 per-dir `package.json` | per-unit declarations; wiring generated from them | Bazel analysis-phase visibility error; generator-vs-committed drift checks | manifests restate import facts (Bazel `deps`; shadcn-vue lists every file path); visibility left at `public` by default (Angular Material `BUILD.bazel:11`); undeclared files rot silently (rustc, measured) | Angular Material: 376 BUILD files, 207 lines for `button`; shadcn-vue: 2,462 manifest lines for 66 entries (about 37 per entry) | PORTFOLIO: `subpath-policy.mjs` (388 lines) is hand-kept today; BI DP-D rejected manifest machinery |
| **Lifecycle capsules** (D1-F) | VueUse (149 capsules: source, docs, demo, tests); Angular Material (ts, html, scss, spec, md, BUILD); reka-ui (SFCs, tests, `story/`); MUI; Go `_test.go`; Rust in-file tests; Storybook's colocation intent; Next.js colocation + `_private` | discovery by suffix or filename; build scope by entry reachability or compile-time exclusion (`go build`, `#[cfg(test)]`) | runner discovery; `npm pack` content check; Go and Rust exclude tests at compile time | publishing `src` requires exclusion lists (reka-ui, Element Plus); Vitest and Playwright default globs overlap; Vitest in-source testing is discouraged for components; segregated alternatives also exist (Chakra's 124-file flat `__stories__`, Nuxt UI's 228 snapshots in one dir) | no quantified migration report found | `files: ["dist", "MIGRATION.md"]` ships no `src`; Playwright uses `testDir: "."`, `testMatch: "*.spec.ts"` (`tests-visual/playwright.config.ts:48-49`) |

---

## 11 · Open questions for pass 1

1. **Which edge set is the gate's source of record?** dependency-cruiser counts 255 deep module edges where PORTFOLIO counts 268, and 31 unshared composables where L13 counts 32 OWNED. Its folder cycles do not include `composables/glass`, which PORTFOLIO lists in M02. The differences come down to value vs type edges, CSS edges, specifier vs module dedupe, and module vs unit counting. One definition has to be chosen (P-3).
2. **Is `composables/` a purpose slot or a kind bucket?** Steiger's `segments-by-purpose` and the Angular style guide both reject kind-named dirs (`composables`, `constants`, `components`). The edict prescribes `composables/` for module-level hooks. This needs an owner ruling on naming, not a mechanism.
3. **What hosts enforcement?** glass-ui has no ESLint. Nx, eslint-plugin-boundaries and Sheriff are ESLint-hosted. dependency-cruiser is standalone (9.74 s at HEAD). A custom `scripts/` gate counts against E-8's 40-60 budget. Which host does D1 adopt?
4. **What granularity for acyclicity?** dependency-cruiser's folder scope works per leaf directory (it flags `aurora/composables ↔ aurora/constants`). import-linter's `acyclic_siblings` recurses by generation over sibling subtrees and names the minimal cut, but only for Python. D1-B and D1-D need subtree-level acyclicity. Is there a JS tool, or does the gate implement it?
5. **Under D1-C, what closes the relative-path hole?** Node, tsc and Vite all accept `../a/src/internal/x` (measured), and TS references expose a referenced project's internals. Is the extra rule a lint, a dependency-cruiser `$1` rule, or a resolver plugin?
6. **Can capsule dist purity hold with no exclusion list** once `.story.vue` and `*.visual.ts` live under `src/`? This concerns declaration emit over `src/**` (PORTFOLIO D1-F risk 3). reka-ui needed six negations only because it publishes `src`.
7. **Does Packwerk's lesson transfer?** Privacy checks there produced file shuffling and disabled checks at team scale. No evidence was found at a single-owner scale of about 650 files.
8. **The long-dir bound.** Prior art mostly keeps long flat lists: matklad argues for them, the mature libraries hold 59-124-file dirs, and Steiger's 20 is "arbitrary". The edict requires breaking long dirs. What bound, and on what evidence (PORTFOLIO §6 Q6)?
9. **CSS order.** Should every component `@import` take the `layer()` form and unlayered rules be banned, so that colocated CSS order depends only on layer names (MDN) and Vite's injection-order issues (#3924, #21903) stop mattering? The deliberately UNLAYERED rules in `index.css` (PORTFOLIO D1-E risk 5) are the exception to cost.
