# D1 · pass 1 · family D1-F: lifecycle capsules

| field | value |
|---|---|
| seat | D1-F pass-1 research seat (lifecycle capsules; the zone split dissolves), design loop D1, colocation edict N-1 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `6433284a`. The brief named `b7099ea6`; `git diff --stat b7099ea6 HEAD -- src package.json vite.* vitest.config.ts tsconfig*.json tests tests-visual demo scripts` is empty |
| inputs | `PORTFOLIO.md` §0-3 and §4 "D1-F" only (no other family's section or pass-1 file read), `pass-1/W.md`, `pass-1/X.md`, `audit/round-1/L14.md` (L12/L13 only through the portfolio's baseline) |
| instruments | scratch scripts (below `F/` = the scratch dir): `scan.mjs` (reference scanner), `srcgraph.mjs` (capsule dependency closure), `assign2.mjs` + `tally.mjs` (Q1), `chassis.mjs` (Q3), `cost.mjs`, `migrate.mjs` + `wire.py` (the full carve), `capsule-gate.mjs` (enforcement). Worktree `F/wt` at HEAD with `node_modules` symlinked, a pristine `git archive HEAD` copy `F/headtree` for baselines; both removed before return. No build or run in the main checkout or in any sibling; value.js `api/` read with `find`/`grep` only |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/D1-F/` |
| deliverable | the six pass-1 answers with measurements, the family's strongest form, a full mechanical carve of the tree with its measured outcome, an executable gate RED at HEAD, the measured migration cost, the consumer-surface diff, the backend reading, and named weaknesses. No comparison with other families |

"Measured" means a command in this session printed the number; the log file is named beside it.

---

## 0 · Answers in brief

1. **Assignment (Q1).** Of 510 artifacts at HEAD (249 tests, 167 visual specs, 94 story SFCs), a computed subject law places **383 in a single `src` capsule** (189 tests, 112 visual specs, 82 stories) across 70 capsules, **21 in a single non-`src` capsule** (11 demo-harness tests, 8 tool tests, 2 landing specs), and leaves **106 cross-cutting or unassignable** (41 tests, 53 visual specs, 12 stories). A hand audit finds 10 of the 82 story placements wrong (family pages and foundations token pages), and 10 visual specs inherit those errors.
2. **Button capsule (Q2).** With the story, tile, unit test and three visual specs inside `src/components/button/`, HEAD's declaration emit **fails the build** (15 × TS6059, exit 1), and even with that error cleared it emits `button-glass.visual.d.ts`, `buttons.story.vue.d.ts` and `buttons.tile.vue.d.ts`. Rooting the declaration program at the entry map instead of `src/**` builds green, **deletes** the existing exclude list, and packs **0** artifacts. The pack also loses 4 unreachable declaration files. No export key changes.
3. **Story → stage (Q3).** 94 of the 110 `.vue` files under `demo/stories` import `demo/chassis`: 218 edges (StoryPage 88, StorySection 74, ShowcaseFrame 27, then 9 smaller targets). StoryPage's closure is 15 demo files and reaches `demo/stories/manifest.ts`, which globs every story, so it forms a cycle. Rule: artifacts reach the harness only through `#`-specifiers declared once in `package.json` `imports` (Vite, vitest, vue-tsc and Playwright all resolve them, measured). The library's entry closure must never contain one. The gate's entry-closure walk (C3) is where that check belongs; the sketch does not run it yet. The shell wraps each story in StoryPage (82 of 88 uses are a bare `<StoryPage>`).
4. **Router (Q4).** All 80 routes are kept: story basenames are globally unique (90 of 90), so `basename = route id`. After the carve 80/80 rows resolve (70 from capsules, 10 from `demo/`) and the demo still splits into 276 chunks. Metadata in a `<story lang="json">` custom block, globbed eagerly by its block query, keeps splitting (276 chunks, boot-graph 14/14). An eager `export const story` from `<script>` breaks it: 195 chunks and an eager graph of 801,989 B against a 503,808 B ceiling (boot-graph RED).
5. **Discovery and CI (Q5).** Suffix globs cost nothing measurable. `vitest list` takes 0.53 s at HEAD and 0.49 s with the glob. `playwright --list` takes 2.39 s at HEAD, 2.25 s for the button capsule and 1.70 s after the full carve. Typecheck is 11.0 s as two programs at HEAD and 8.4 s as one program that also covers `tests-visual`. The two Chromium-launching vitest files take 1.0 s locally, and they are the only reason the CI `verify` job spends 23 s of its 246 s on `playwright install`. Moving them to `*.visual.ts` removes that step. The full carve silently dropped 3 WebKit instances (13 → 10) because the WebKit project matches by filename.
6. **Prior art (Q6).** Go (`_test.go` ignored by `go build`, same-package vs `_test` package) and Rust (in-file unit tests see privates, top-level `tests/` sees the public API only) both give exactly the capsule/harness split this family needs. Angular colocates `.spec.ts` beside source but excludes it with one suffix glob in `tsconfig.app.json`/`tsconfig.lib.json`. Storybook colocates `.stories.*` and relies on the app never importing them. glass-ui can do better than Angular here, because its declarations can be rooted at the entry map (Q2).

---

## 1 · Q1: every artifact assigned to a capsule

### 1.1 The subject law used

- **Capsules at HEAD.** There are 75 in all: 57 `src/components/<x>` (including `_shared`), 10 `src/composables/<x>`, the 5 `src/styles/<sub>` dirs plus `src/styles` for its loose files, and the pseudo-roots `src/(root)`, `src/components/(root)` and `src/fonts`. Instrument: `F/srcgraph.mjs`.
- **Dependency closure** per capsule. The inputs are 1,452 file import edges (TS, SFC, CSS `@import`, `<style src>`) plus 2,776 **data edges**: CSS custom-property consumer → producer, and utility-class user → the `src/styles` file that defines the class. Together they give 478 capsule edges.
  - Import edges alone give 48 test "cross" verdicts that are really a component plus the token file it reads, e.g. `Button.test.ts` touching `button` and `src/styles/tokens`. With the data edges, 24 remain.
- **C(a)**, the capsules an artifact references: its import specifiers (`@glass/`, relative, `/src/` URLs) plus root-relative path literals (`"src/components/button/styles.css"`). For a visual spec, C(a) holds the **subjects of the stories behind its routes**, taken from `goto` literals, `resolveScene(cat, id)` and `PI_TARGETS.x`, plus its own direct `src` references.
- **subject(a)** = the unique c ∈ C(a) whose closure covers C(a). Within a dependency cycle (M02, M03) a tie is broken by the artifact's own path tokens (`tests/components/sheet/*` → sheet). No cover means cross-cutting.
- **Story subject:** the capsule named by the story id (exact or plural), else an id token that is also imported (`dropdown-menu` → menu), else the category token when that capsule is imported (`dock/*`, `motion/*`), else the closure cover.

Command: `node F/scan.mjs && node F/srcgraph.mjs && node F/assign.mjs && node F/assign2.mjs && node F/tally.mjs`.

### 1.2 Counts

| kind | total | single `src` capsule | single non-`src` capsule | cross-cutting | library root | no subject |
|---|---:|---:|---:|---:|---:|---:|
| tests (`tests/**`) | 249 | **189** | 19 (11 demo harness, 8 tool) | 34 | 4 | 3 |
| visual specs | 167 | **112** | 2 (landing routes) | 37 | 8 | 8 |
| story SFCs (90 pages + 4 tiles) | 94 | **82** | 0 | 6 | 1 | 5 |
| **total** | 510 | **383** (75%) | 21 | 77 | 13 | 16 |

The 383 land in **70 distinct capsules**. The heaviest receivers are dock 43, aurora 48 (including story helpers), composables/motion 34 and blob 24 (`F/migrate-plan.json`). The 16 story-private helper SFCs and 7 helper `.ts` files follow their importers (§8).

Where the law is weak (hand audit of the 82 story placements):

- **Mechanical and correct: 72.** That is 53 by name, 3 by id token, 13 by category, and 3 by cover: `toaster → toast`, `toggle → toggle-group`, `toc-tracking → sidebar`.
- **Mechanical and wrong: 10.**
  - `motion/text-motion → composables/motion`: a family page for typewriter and countup.
  - `compositions/chassis → badge` and `compositions/empty-states → blob`: compositions.
  - `forms/checks → radio-group`: a family page for checkbox, radio-group and switch.
  - `foundations/{icons → chip, intro → dark, paper-glass → _shared, radii → _shared, shadows → _shared}`: token pages.
  - `substrates/glass-panel → aurora`.
- **10 visual specs** route to those stories and inherit the wrong subject: `_egg-capture`, `_sb1-capture`, `a11y-splitchars`, `aurora-entrance`, `dock-morph-insitu`, `ghost-dashed`, `no-shadcn-default`, `perf-producer`, `shell-config`, `shell-identity`.
- **The 12 stories the law leaves unassigned:**
  - 6 cross: the compositions `auth-shell`, `form-validation` and `settings`, and the multi-component pages `hover-card`, `virtual-section` and `atoms`.
  - 1 library root: `glass-material`.
  - 5 token pages with no `src` import: `chart-palette`, `css-utilities`, `overlays-scrims`, `paper-texture`, `surface-tints`.
- **Corrected by hand, the 22 non-single stories are:**
  - 5 compositions (the 3 above plus `chassis` and `empty-states`) → harness.
  - 5 family pages (`atoms`, `checks`, `text-motion`, `hover-card`, `virtual-section`) → metadata (§3 R5).
  - 12 styles token pages (the 5 above plus `icons`, `intro`, `paper-glass`, `radii`, `shadows`, `glass-panel`, `glass-material`) → a `src/styles` capsule by declaration. A token page imports no module it demonstrates.
- **The 8 visual specs with no subject:**
  - 4 dead routes, the L14-04 class: `dock-with-slider-live` (`/compositions/dock-with-slider`), `eyebrow-union` (`/display/metric-badge`), `goo-dot` (`/substrates/goo-dot`), and `glass-depth` (`PI_TARGETS.substrate`, which is undefined).
  - 2 route tables built from strings: `_sb-stage-capture`, `coherence-congruence`.
  - 2 WebKit static readers: `w1-radius-redress.webkit`, `w2-blur-redress.webkit`.
- **Harness tests the law misfiles.** 17 of the moved tests also read demo, dist or tool files. Three are clearly harness invariants that the law sends to a capsule because their only `src` references name one:
  - `tests/gates/boot-graph.test.ts` → aurora
  - `tests/demo/dock-stage-field-layout.test.ts` → aurora
  - `tests/demo/feedback-motion-tune.test.ts` → `src/styles/tokens`

---

## 2 · Q2: the button capsule, and dist purity with no exclusion list

Probe in `F/wt` (saved as `F/proto-button/`):

```
src/components/button/
  Button.vue index.ts styles.css
  Button.test.ts                         ← tests/components/button/Button.test.ts
  buttons.story.vue buttons.tile.vue     ← demo/stories/display/buttons{,.tile}.vue   (basename = route id)
  button-glass.visual.ts                 ← tests-visual/button-glass.spec.ts
  press-unify.visual.ts                  ← tests-visual/press-unify.spec.ts
  affordance-contrast-gold.visual.ts     ← tests-visual/affordance-contrast-gold.spec.ts
```

Story and tile import `"."`; the story imports the stage as `#stage/page/StoryPage.vue`; the visual spec imports `#visual/pi-manifest.ts`; `new URL("..", import.meta.url)` became `"../../.."`.

| step | command | outcome |
|---|---|---|
| typecheck | `vue-tsc --noEmit` | exit 0 (`tc-proto-main.log`). `--listFilesOnly` shows all six artifacts in the program. The visual spec is type-checked for the first time (L14-03) |
| unit test | `vitest run src/components/button` | 1 file, 25 passed |
| library build, HEAD declaration config | `vite build` | **exit 1**: 15 × `TS6059 File '…/demo/chassis/page/StoryPage.vue' is not under 'rootDir' '…/src'` (`build-proto1.log`). `tsconfig.build.json` includes `src/` and excludes only `*.test.ts`/`*.spec.ts`/`__tests__` |
| same config, rootDir error aside | `vue-tsc -p <HEAD build config> --listEmittedFiles` | emits `components/button/button-glass.visual.d.ts`, `buttons.story.vue.d.ts`, `buttons.tile.vue.d.ts`. HEAD's scheme would need **3 new exclusion globs** |
| library build, entry-rooted declarations | `vite build` | **exit 0** (`build-proto3.log`). `verifyExportTypes` passes inside the publish step |
| pack | `npm pack --dry-run --json --ignore-scripts` | 841 → **837** entries; **0** files matching `.story.vue|.tile.vue|.test.|.test-d.|.visual.|demo/` |

**The change** (`vite.style-assets.ts` `stageTypesAndRelays`, about 15 lines). The build writes a temporary project with `extends: tsconfig.build.json`, `files: [...Object.values(libraryEntryMap(root)), "src/html-attributes.d.ts"]` and `include: []`, runs `vue-tsc -p` on it, and removes it in a `finally`. `tsconfig.build.json` loses both `include` and `exclude`. The declaration program is then the entry map's import closure: the same reachability that already governs the JS build (`vite.library.ts` → `libraryEntryMap`). Nothing is excluded by name. The one extra root is the ambient `data-*` augmentation, which nothing imports.

**Dist diff against HEAD.** Every JS, CSS and font file is byte-identical (`shasum` join over `dist/`).

- **Four declaration files leave the pack.** None of them sits under any export key; the map's only wildcard is `./fonts/*`:

  ```
  - dist/components/_shared/index.d.ts                    (dead door, portfolio floor row 2)
  - dist/components/index.d.ts                            (dead door, floor row 2)
  - dist/composables/motion/scroll/useScrollScene.d.ts    (demo-only, floor row 3)
  - dist/composables/motion/spring/springProjection.d.ts  (only demo/stories/motion/springs.vue + tests import it)
  ```

- **Two declaration files are reprinted.**
  - `Textarea.vue.d.ts`: `import("..").ControlSize` becomes `import("../input/index.js").ControlSize`. At HEAD this published declaration reaches a type through the dead `components/index.d.ts` door.
  - `MusicStaff.vue.d.ts`: member order changes.

---

## 3 · Q3: story → `demo/chassis` edges, and the rule that keeps `src` off `demo`

`node F/chassis.mjs` scans the 117 files under `demo/stories` other than the manifest:

```
files importing demo/chassis: 94 (all .vue)   edges: 218
  88 page/StoryPage.vue        74 section/StorySection.vue    27 showcase/ShowcaseFrame.vue
   7 field/LabeledSelect.vue    5 family/FamilyTabs.vue         4 hero/aurora-hero.ts (types)
   3 code/CodeBlock.vue         3 body/story-body.ts (types)    2 showcase/TokenLadder.vue
   1 index.ts   1 landing/SectionPreviewCard.vue   1 landing/storyTile.ts   1 landing/vizPreviewStill.ts   1 play/StoryPlayButton.vue
other demo imports: demo/composables/virtual/index.ts 2, demo/examples/{Configurator,Card,Toaster}Example.vue 1 each
```

(The portfolio counted 96, StoryPage 87 and StorySection 73. This scanner resolves type-only and multi-line imports, and the differences are within 2.)

**Structure of the edges:**

- **StoryPage is not a leaf.** Its demo closure is 15 files, including `useStoryNavigation.ts`, `routeTransition.ts` and `demo/stories/manifest.ts`. The manifest's `import.meta.glob` reaches every story, so story → StoryPage → manifest → story is a cycle.
- **StorySection and ShowcaseFrame are leaves** (closure 1).
- **82 of 88 StoryPage uses are a bare `<StoryPage>`.** Six pass props: `:body` 3, `:style` 2, `:hero-title` 1.
- **Family pages import member stories.** Five family pages (`atoms`, `toast`, `inputs`, `paper-glass`, `text-motion`) do so with `defineAsyncComponent(() => import("./x.vue"))`: 11 story → story edges that become cross-capsule once members move.

**The rule (measured in the carve, §8):**

- **R1 · one declaration of the harness.** `package.json` gets `"imports": {"#stage/*": "./demo/chassis/*", "#demo/*": "./demo/*", "#visual/*": "./tests-visual/*", "#test/*": "./tests/*"}`. Vite (demo dev and `vite.demo-dist.config.ts`), vitest, vue-tsc (`moduleResolution: bundler`) and Playwright all resolved these with no per-tool alias.
  - This replaces the 4 per-tool `@glass` alias copies pattern (L14-12) for the harness side.
  - Targets map literally (no extension probing). With `allowImportingTsExtensions: true`, a specifier names the real file (`#visual/pi-manifest.ts`). An extensionless `#visual/pi-manifest` failed in both TS (TS2307) and Playwright.
- **R2 · direction.** A lifecycle artifact may import `#`-harness specifiers. A file in the library's entry closure may not, and may not import a suffixed artifact either. Enforcement walks the entry closure (the same walk C3 does) and fails on any `#` specifier or suffixed file. The sketch does not implement this yet. A relative path that escapes `src/` is banned outright.
- **R3 · invert the frame.** The shell wraps each routed story in StoryPage and feeds it the story's metadata (§4). That removes the 82 bare-frame edges and the manifest cycle. `useStoryNavigation` reads route meta instead of importing the manifest. The 6 prop-passing uses keep `#stage/page/StoryPage.vue` or move their props into the metadata block.
- **R4 · the stage kit** (StorySection, ShowcaseFrame, LabeledSelect, CodeBlock, TokenLadder, StoryPlayButton, story-body types) is harness, reached only through `#stage`.
- **R5 · families become data.** A member declares `"family": "<page>"` in its metadata and FamilyTabs composes members by glob. No story imports another capsule's story.
- **R6 · story-private helpers** go to the LCA of their importers' new homes. In the carve 14 of 23 landed in capsules and 9 went to the stage, because a second importer (another capsule's story, or a test) sits elsewhere. Example: `loop-driver.ts` is imported by the progress story and by `tests/demo/feedback-motion-tune.test.ts`.

---

## 4 · Q4: the router from `src/**/*.story.vue`

- **The 80 routes are kept.** 80 manifest rows plus 10 unrouted family members give 90 story basenames, with 0 duplicates, so a story file is `<route-id>.story.vue` and the category comes from metadata. `pi-manifest.ts`'s `resolveScene` and every route literal in the visual specs stay valid.
- **Variant A, carve-proven.** The manifest rows stay. `manifest.ts` adds `byId(import.meta.glob("/src/**/*.story.vue"))` and `byId(import.meta.glob("/src/**/*.tile.vue"))`, and `makeLazy(modules, capsuleStories)` falls back to the id (+6 lines).
  - After the full carve: 80/80 rows resolve (70 capsule, 10 still in `demo/`), 0 missing.
  - `vite build --config demo/vite.demo-dist.config.ts` → 276 JS chunks, the same as HEAD. 79 per-story lazy chunks.
  - `boot-graph.test.ts` passes 14/14 against the fresh demo build.
  - Deleting a capsule leaves a manifest row that `makeLazy` rejects at boot (loud, not total).
- **Variant B, metadata in the capsule.** Tried on two stories.

  | form | demo chunks | per-story chunks | boot-graph |
  |---|---:|---:|---|
  | eager `import: "story"` of `<script>export const story = {…}</script>` | 195 | 76 | **RED**: `eager graph: 18 modulepreloads + 1 entry = 19 files / 801989 B: expected ≤ 503808` |
  | eager glob with `query: "?vue&type=story&index=0&lang.json"` over a `<story lang="json">{…}</story>` block | 276 | 78 | **14/14 green**; vue-tsc unchanged (85 = same as the carve without blocks) |

  The custom-block form lets the router be generated from the story files alone, and deleting a capsule deletes its routes. Category metadata (11 rows: title, icon, landing background) stays in one harness file, because categories are not capsules. `resolveScene` switches from the `s("cat","id")` regex to parsing the same blocks. `pi-manifest.ts` also reads `demo/stories/substrates/aurora/presets.ts` by literal path, and the carve moved that file (§8).

---

## 5 · Q5: discovery and CI time

| measure | HEAD | suffix globs | log |
|---|---|---|---|
| `vitest list --filesOnly` | 239 files, 0.53 s | 239 files, 0.49 s (`src/**/*.test.ts` added) | `vt-list-*.log` |
| `vitest run` (full) | 239 files, 2,324 tests, 18.9 s wall | button capsule: 19.1 s. The full carve collects 2,215 tests in 26.5 s with 26 files failing (§8), so its time is not comparable | `h-vt.json`, `vt-run-proto.json`, `c-vt.json` |
| `playwright test --list` | 1,989 tests / 167 files, 2.39 s | `testDir: ".."`, `testMatch: ["tests-visual/*.spec.ts","src/**/*.visual.ts"]`: button capsule 1,989, 2.25 s; full carve **1,986**, 1.70 s | `pw-list-*.log` |
| typecheck | `vue-tsc` 5.76 s + `-p tsconfig.test.json` 5.23 s = 11.0 s, `tests-visual` unchecked | one program over `src demo tests tests-visual`: 8.43 s, 48 errors, all in 17 `tests-visual` files; after the carve, main 6.49 s + test 7.33 s | `tc-union.log`, `c-tc-*.log` |
| the two Chromium-launching vitest files | `slider.size-tokens` + `GlassDock.stagger`: 1.02-1.07 s (two trivial files: 0.30 s) | unchanged | local |
| CI `verify` job (run 35810620398) | 246 s: checkout 71, `npm ci` 17, **`playwright install --with-deps chromium` 23**, typecheck 26, demo build 3, build 11, `npm test` 89 | if the two files become `*.visual.ts`, `verify` needs no browser: −23 s. The `pixel-floor` job already installs Chromium (25 s) | `gh run view --json jobs` |

- **Suffix globs** do not change discovery time.
- **Suffix routing is required.** The WebKit project's `testMatch: ["safari-webgl.spec.ts", "aurora-swraster.spec.ts"]` lists filenames. After the carve moved `aurora-swraster` to `src/components/aurora/aurora-swraster.visual.ts`, `[webkit]` instances fell from 13 to 10 with no error. This is the L14-02 class. Projects must route by suffix: `*.webkit.visual.ts`, `*.touch.visual.ts`.
- **One strict program.** A single typecheck program over capsules means tests and visual specs meet `src` strictness (§8).

---

## 6 · Q6: prior art

| system | colocation | how artifacts stay out of the build | the unit/integration split | source |
|---|---|---|---|---|
| Go | `*_test.go` beside source | "When compiling packages, build ignores files that end in '_test.go'": the toolchain, by suffix, with no list. `testdata/` and `_`/`.`-prefixed names are ignored too | same-package test files (white-box) vs "Test files that declare a package with the suffix "_test" will be compiled as a separate package" (black-box) | pkg.go.dev/cmd/go |
| Rust | unit tests "in the src directory in each file with the code they're testing", `#[cfg(test)] mod tests` | `#[cfg(test)]`: "compile and run the test code only when you run cargo test, not when you run cargo build" | unit tests "can test private functions"; integration tests in top-level `tests/` "can only call functions that are part of your library's public API"; shared helpers in `tests/common/mod.rs` | doc.rust-lang.org/book/ch11-03 |
| Angular | "Unit tests should live in the same directory as the code-under-test. Avoid collecting unrelated tests into a single `tests` directory." Suffix `.spec.ts`. "avoid creating directories like `components`, `directives`, and `services`" | one suffix exclusion: application `tsconfig.app.json` `"include": ["src/**/*.ts"], "exclude": ["src/**/*.spec.ts"]`; library `tsconfig.lib.json` `"exclude": ["**/*.spec.ts"]` (angular-cli `main` schematics) | none prescribed in the style guide | angular.dev/style-guide; angular-cli templates |
| Storybook | "The intention is for you to colocate a story file along with the component it documents", default glob over `.stories.*` | by reachability: the app never imports a story. The docs page states no exclusion | stories are one kind; no split | storybook.js.org/docs/configure |
| VueUse, Angular Material, reka-ui, MUI | capsules in the wild (W.md §4, §10) | reka-ui needs six negation globs in `files` only because it ships `src`; its JS `dist` is clean by entry reachability | | W.md §6 |

What this family takes:

1. **Go and Rust split along the same line D1-F draws** between capsule and harness. A capsule test is white-box and may import capsule privates relatively. A harness invariant is black-box or whole-tree and belongs in top-level `tests/`. value.js `api/` already practises it: 30 tests in `src/modules/<domain>/__tests__/` and 10 in top-level `test/` + `test/conformance/` (`find`, read-only).
2. **Go and Rust exclude artifacts in the toolchain.** Angular, the nearest TypeScript precedent, uses one suffix glob per tsconfig. glass-ui's declaration emit can go further, rooted at the entry map so that nothing is named at all (Q2). This matters under E-2 (no masking lists).
3. **Angular and Steiger share this family's naming tension** (W.md §3.1): the edict's `composables/` dir is a kind-named dir, which their guidance discourages.

---

## 7 · The strongest form (what D1-F must specify to work)

1. **Capsule.** A directory with a door (`index.ts`; `index.css` for a styles capsule; the tool's own `.mjs` for a script). A sub-directory with its own door is a nested capsule. `src/` is the root capsule (door `src/index.ts`).
2. **Closed suffix set, one runner and one environment per suffix:**

   | suffix | runner and environment |
   |---|---|
   | `.test.ts` | vitest, happy-dom, white-box within its capsule |
   | `.test-d.ts` | type tests |
   | `.story.vue` | demo route; basename = route id, globally unique |
   | `.tile.vue` | landing tile of the same-basename story |
   | `.visual.ts` | Playwright, real browser |
   | `.webkit.visual.ts` / `.touch.visual.ts` | project routing by suffix |
   | `README.md` | the capsule's readme |

   No other lifecycle file shape is allowed in `src`. The two Chromium-launching vitest files become `.visual.ts`.
3. **Subject law**, the §1.1 closure cover over import and CSS data edges. Stories are declared by location and checked by use: a story imports its capsule's door, and a `src/styles` story references the capsule's tokens. Within a capsule, an artifact sits in the deepest sub-capsule holding all of its in-capsule references. An artifact with no subject is harness: `tests/invariants/`, `tests-visual/invariants/`, or `demo/compositions/`.
4. **Long-dir bound.** A capsule root holds at most N direct files (N owner-ruled, like C5 in X.md §8). Past N the capsule must carve sub-capsules. A test that imports only the door carries no sub-capsule signal, so it is named `<sub>.<name>.test.ts` and placed by that prefix.
5. **Harness access** only through `#stage`, `#demo`, `#visual` and `#test` (§3 R1-R6). The library's entry closure never contains a `#` specifier or a suffixed file.
6. **Dist purity by reachability.** JS comes from the entry map (as at HEAD). Declarations come from the entry map plus the ambient `src/*.d.ts` (§2). `tsconfig.build.json` has no `include` or `exclude`.
7. **Source predicate.** One shared `isSource(path)` (not a lifecycle suffix) in `tests/_support/`. Every tree scanner over `src` calls it (§8: 15 scanners broke without it).
8. **Router** from `<story lang="json">` blocks: `category`, `title`, `blurb`, `opts`, `family`. The same parser serves `resolveScene`. Category rows live in one harness file.
9. **Runner configs:**
   - vitest `include: ["src/**/*.test.ts", "tests/invariants/**/*.test.ts", "scripts/**/*.test.ts"]`
   - Playwright `testDir: <repo root>`, `testMatch: ["src/**/*.visual.ts", "tests-visual/invariants/**/*.visual.ts"]`, projects by suffix
   - one typecheck program
10. **Scripts** (§12): one capsule per tool. A helper shared by two or more tools goes to `scripts/lib/`. A test-support module used across capsules is harness `_support`.
11. **Gate** (§9): three clauses, fail-closed, in one executable.

---

## 8 · Prototype probe: the full mechanical carve

Commands:

```
git worktree add F/wt HEAD
node F/migrate.mjs F/wt
python3 F/wire.py F/wt
```

`migrate.mjs` does four things:

- moves every artifact whose subject is a real `src` capsule, adding its suffix;
- moves story-private helpers and test fixtures to the LCA of their importers' new homes;
- rewrites every import specifier that crosses a moved file (harness targets become `#` specifiers, the rest are re-pathed relatively);
- re-roots `new URL(<rel>, import.meta.url)`.

`wire.py` applies the config floor: the manifest glob, `lazy.ts`, `package.json` `imports`, Playwright `testDir`/`testMatch`, the vitest include, `allowImportingTsExtensions`, and entry-rooted declarations.

```
moved 408: tests 189 · visual 112 · stories 82 · story helpers 23 (14 → capsules, 9 → stage) · test fixtures 2
specifier rewrites 316 (276 → #stage/#demo/#visual/#test, 40 re-pathed) · import.meta.url re-roots 68
flagged: 40 files computing paths from __dirname / cwd · 16 literal paths into moved files · 21 "unresolved" = specifiers inside test fixture strings
git status: 408 D · 391 ?? · 10 M  (419 files changed)
```

| check | HEAD | after the carve | log |
|---|---|---|---|
| library `vite build` | pass | **pass** (6.9 s) | `c-build.log` |
| `npm pack` | 841 entries | **837**; 0 lifecycle artifacts; identical to the button-probe pack | `c-pack.txt` |
| `dist` bytes | | JS, CSS and fonts byte-identical; 2 `.d.ts` reprinted, 4 unreachable `.d.ts` gone (§2) | `c-dist.sha` |
| demo build | pass | **pass**; 276 chunks; boot-graph 14/14 once `dist-demo` is fresh | `c-demo.log` |
| routes | 80 | 80/80 resolve (70 capsule, 10 demo) | inline check |
| `playwright --list` | 1,989 / 167 files | 1,986 / 167 files (1,024 instances from `src/**/*.visual.ts`); the 3 lost are WebKit (§5) | `pw-list-full.log` |
| `vue-tsc` (strict, src + demo) | 0 errors | **85 errors in 39 files**. 36 visual specs: 31 TS7016 (untyped `pngjs` and `.mjs` imports), 19 TS2307 (browser-side `import("/src/…")` inside `page.evaluate`), and 21 others including L14-03's `PI_TARGETS.substrate`. 29 of all the TS7016 errors are `pngjs`. 2 tests: `CommandDialog.test.ts` uses vitest globals; `springTokenMirror.test.ts` imports an `.mjs` without the test-config shim. 1 harness helper | `c-tc-main.log` |
| `vue-tsc -p tsconfig.test.json` | 0 | 40 (the visual-spec defects only) | `c-tc-test.log` |
| `vitest run` | 2,317/2,324 pass; 2 env-only fails (`boot-graph`: no `dist-demo`; `comment-ratio`: the archive copy has no git) | 2,164 pass, 50 fail in 27 files. 4 files fail at collection (−109 tests). 1 is env (`boot-graph`); **26 files are broken by the carve** | `h-vt.json`, `c-vt.json` |

The 26 broken files fall into two classes. No other failure appeared.

**A · literal paths into moved artifacts (11 files).** A test reads a story, story helper or another test by its old root-relative path:

- `tests/demo/story-preview-card.test.ts` (reads every row's SFC at `demo/stories/<cat>/<id>.vue`)
- `skip-link.a11y`, `radius-role-canon`, `typed-track-seam`
- `gate-register.test.ts` (its register rows cite `sourcePath: tests/styles/token-graph.test.ts` and 3 others)
- the now-colocated `aurora/harness`, `aurora/dock-stage-field-layout`, `handmark/g-hm-mark`, `tokens/feedback-motion-tune`
- `handmark/g-hm-layer`, which reads **itself** at `tests/components/custom/handmark/g-hm-layer.test.ts`
- `easing.contract`, which rebuilds a dir path from its own location and gets `src/src/components/easing`

The cure is resolving through the story-id index or `import.meta.url`, not a path string.

**B · `src` tree scanners that now see artifacts (15 files).** An invariant that walks `src/**` or a capsule dir assumed the tree holds only source:

- `trap-gates`: `:global()` in stories now under `src`
- `type-hygiene`: flags `src/components/_shared/cn.test.ts:28`
- `glass-subtlety`, `dock-name-canon`, `route-motion`, `layout-canon`
- `overfit-structure`: 8 exports of `boot-graph.test.ts` count as "referenced nowhere outside their own module", because the test now lives inside the module
- `dialog-dismiss`: finds "stage" in `dialog.story.vue`
- `feedback-tint-seam`: finds itself
- `gl-excise` and `FourierField.smoke`: 7 findings each from the visual/test files in the capsule
- `sortable-list/battery`: the string is in the story
- `wgsl-splice-contract`: `blob-painted-component.visual.ts` carries a shader
- `picker-lane`
- `spring-authority`: a literal in `surface.story.vue`

Every one of the 15 is cured by the §7.7 source predicate.

The long-dir effect is measured with `find src -type d` and a direct-file count:

- directories with ≥ 10 direct files: **15 → 38**
- directories with ≥ 20 direct files: **2 → 7**
- `src/components/dock`: 11 → 51 (16 visual, 15 test, 9 story/tile)
- aurora: 4 → 36; blob: 7 → 31; composables/motion: 2 → 19

The LCA-of-references placement leaves most artifacts at the capsule root because they import the door (§7.4).

---

## 9 · The enforcement gate

`F/capsule-gate.mjs <root> [--scope <capsule>] [--pack <npm pack --json>]` is one file (about 150 lines) with three clauses.

- **C1 · placement.**
  - Every lifecycle artifact sits inside its subject's capsule (§1.1 law, recomputed from the tree at run time) and carries its suffix.
  - An artifact with no subject sits in an `invariants/` harness dir or `demo/compositions/`.
  - It recognises the HEAD-era shapes (`tests/**/*.test.ts`, `tests-visual/*.spec.ts`, `demo/stories/<cat>/<id>.vue`) as unsuffixed artifacts.
- **C2 · door.** No file imports another top-level capsule's non-door file.
- **C3 · purity.** The pack holds no lifecycle artifact, and every packed `dist/**.d.ts` maps to a source in the entry map's import closure.

**RED at HEAD.** Runtime 0.46 s; log `gate-head.log`:

```
C2 by zone: {"demo -> _shared":27,"demo -> other":41,"src -> other":202,"src -> _shared":268,"tests -> _shared":10,"tests -> other":29,"tests-visual -> other":2}
C1_misplaced: 402
    demo/stories/containers/accordion.vue  ->  src/components/accordion/
    demo/stories/containers/command.vue  ->  src/components/command/   … 400 more
C1_unsuffixed: 260            (167 visual specs + 90 story pages + 3 tests/*.spec.ts)
C1_crossNotInvariant: 107
C2_privateReach: 579
C3_pack: 4
    declaration outside the entry closure dist/components/_shared/index.d.ts
    declaration outside the entry closure dist/components/index.d.ts
    declaration outside the entry closure dist/composables/motion/scroll/useScrollScene.d.ts
    declaration outside the entry closure dist/composables/motion/spring/springProjection.d.ts
capsule-gate: RED (1352 violations)
```

**Scoped to the button capsule** (`--scope src/components/button`):

- HEAD: RED with 20 violations (`C1_misplaced` 6, `C1_unsuffixed` 4, C2 6, C3 4).
- After the probe: RED with **6**, all C2: `Button.vue → _shared/{axes,class-names,primitive,feedback/DotRing.vue}` and `→ composables/motion/{core/asElement,spring/useLiquidPress}.ts`.
- C1 and C3 are 0.

**After the full carve** (`gate-carve.log`): RED with 790.

- `C1_misplaced` 33: the compositions and the visual specs routed to them.
- `C1_unsuffixed` 68: the cross-cutting artifacts not yet re-homed.
- `C1_crossNotInvariant` 106.
- C2 583; C3 **0**.
- Of the 408 moved artifacts, the re-derived law disagrees with **12** (3 stories, 3 tests, 6 visual specs); 0 are misplaced. The placement is a fixed point for 97%.

**How it passes:**

1. C3 is green once declarations are entry-rooted (done in the probe).
2. C1 is green once the 106 unassigned artifacts are re-homed under `invariants/` or `demo/compositions/` with suffixes, the 21 non-`src` singles move beside `demo/` or their tool, and the 10 mis-derived stories get a declared styles-capsule or family home.
3. C2 is the door floor: 286 `src → _shared` and 231 other deep reaches in `src` after the carve (268 + 202 at HEAD). It needs `_shared` split into nearest-common-ancestor capsules with doors, and deep composable imports routed through subtree doors. The portfolio floor shares this row. C2 is what makes it a gate here.

Scanner limits:

- The gate's scanner is regex-based. It drops comment lines before matching, because a comment in `src/index.ts` otherwise resolved to the dead `components/index.ts` door.
- It does not resolve `#` specifiers.
- An executable version would reuse `scripts/import-dag.mjs`'s resolver.

---

## 10 · Migration cost (measured)

| item | count | source |
|---|---:|---|
| artifacts into `src` capsules | 383 (189 tests, 112 visual, 82 stories) | `tally.mjs` |
| story helpers and test fixtures moved with them | 25 | `migrate-plan.json` |
| non-`src` single artifacts beside demo or their tool | 21 | `tally.mjs` |
| cross-cutting or unassignable re-homed into harness `invariants/` or `compositions/` | 106 | `tally.mjs` |
| **path changes in total** | **535** (the portfolio estimated about 526) | |
| specifier rewrites done by the probe | 316 (276 harness `#`, 40 relative) + 68 `import.meta.url` re-roots | `migrate-report.json` |
| optional `@glass/` → relative for own-capsule imports | 390 specifiers (39 more are deep cross-capsule reaches, which are C2) | `cost.mjs` |
| config | vitest include +1; Playwright 2 lines; manifest +6, `lazy.ts` +1; `package.json` `imports` 4 keys; tsconfig +1 option; `tsconfig.build.json` −2 keys; `vite.style-assets.ts` about +15 | `wire.py` |
| cures after the carve | 26 vitest files (11 path, 15 scanner); 85 strict typecheck errors in 39 files (one `@types/pngjs` devDep clears 29); WebKit routing by suffix; 10 story subjects declared; 5 family pages → metadata; StoryPage inversion; `resolveScene` → story blocks | §8 |
| sub-capsule design for the 7 capsules left with ≥ 20 root files | not costed (§13.4) | §8 |
| floor (C2) | 583 private reaches | §9 |

---

## 11 · Consumer surface

- **Export map:** 68 → 68 keys, values identical (`JSON.stringify` equal). `typesVersions` is unchanged.
- **Pack:** −4 declaration files, none under any export key (the only wildcard is `./fonts/*`). `Textarea.vue.d.ts` stops importing through the dead `components/index.d.ts` door. All JS and CSS bytes are unchanged.
- **`package.json`** gains an `imports` field. Node scopes `#` specifiers to the package's own files, and the targets are not shipped, so consumers cannot use it. It is still a published field. The alternative is `#`-free aliases declared in each tool config (vite, demo-dist, vitest, tsconfig: 4 sites), which ship nothing.

The probe's `json.dumps` also re-escaped the em dash in `description`. That is a probe artifact: the value is identical.

---

## 12 · Backend: `scripts/` as capsules, and a sibling backend

In glass-ui:

- **One capsule per tool:** `scripts/<tool>/{<tool>.mjs, <tool>.test.ts, README.md}`, plus build modules as `build/<plugin>/` (L14-12 moves them there).
- **Tests of tools at HEAD** (`assign.json` tool refs), as they would land:
  - `comment-census` ← `gates/comment-ratio.test.ts`
  - `profile-bundle` ← `scripts/profile-bundle-value-js.test.ts`
  - `regen-spring-tokens` ← `springTokenMirror.test.ts` (a golden test that straddles the generator and `src/styles/tokens`, §13.9)
  - `minify-css` + `vite.style-fold` ← `minify-css.test.ts`, `backdrop-prefix-normalization.test.ts`
  - `vite.utility-emit` ← `emitted-utility-vars.test.ts`
  - `gen-component-styles` ← `typed-track-seam.test.ts`
  - `import-dag` ← `router-field-ownership.test.ts`
- **Modules that are not tools.** Two modules under `scripts/` are cross-capsule test support:
  - `gate-register.mjs` (739 lines) has 8 importing tests in 4 zones.
  - `lib/paint-arm.mjs` (586 lines) has 8 importing visual specs. After the carve, 3 sit in three capsules (dialog, radio-group, card) and 5 in the harness.

  By the nearest-common-ancestor rule both leave `scripts/` for `tests/_support/` and `tests-visual/_support/`.
- **`scripts/lib/`** keeps only helpers shared by two or more tools: one walker (6 copies), one repo root (8), one sha256 (4) (X.md §3.1).
- **Dead tools** (`lib/canon-doc.mjs`, `safari-probe.mjs`) are deleted, because a capsule with no entry and no test has no subject.

A sibling backend (value.js `api/`, Hono; read-only):

- It is already capsule-shaped: `src/modules/<domain>/{routes.ts, service/, repository/, schema.ts, model.ts, __tests__/}` for admin, color, meta, palette and session. That is 30 capsule tests, against 10 harness tests in `test/` and `test/conformance/`.
- D1-F carried there means:
  - `__tests__/x.test.ts` flattens to `x.test.ts` beside its subject (the suffix is the marker);
  - `test/conformance/` is the invariants harness;
  - `tsconfig.json` `"exclude": ["node_modules","dist","src/**/__tests__/**"]` becomes an entry-rooted `"files": ["src/main.ts", "src/cron.ts"]`, the same move as §2, and the exclusion disappears.
- **Python** (fourier `api/`): `test_*.py` beside the module in each domain package (pytest discovers by glob). A service is not packaged, so there is no purity concern. A published Python package would need a `find` exclude (Python has no build-side suffix rule).
- **Rust** (bbnf) already has the split natively: `#[cfg(test)]` in-file plus `tests/` (§6).

---

## 13 · Weaknesses (named counterexamples on this tree)

1. **The subject law is not fully computable for stories.** 10 of 82 mechanical story placements are wrong (§1.2), and 10 visual specs inherit them.
   - Family pages (`text-motion`, `checks`), compositions (`chassis`, `empty-states`) and token pages (`icons`, `intro`, `paper-glass`, `radii`, `shadows`, `glass-panel`) need a declared subject.
   - "Declared by location, checked by use" does not cover a token page, which imports nothing it demonstrates.
2. **Harness invariants whose only `src` references name one capsule get misfiled.**
   - `tests/gates/boot-graph.test.ts` → aurora
   - `tests/demo/dock-stage-field-layout.test.ts` → aurora
   - `tests/demo/feedback-motion-tune.test.ts` → tokens

   17 moved tests also read demo, dist or tool files. The law needs a clause: an artifact whose primary reads are harness is harness.
3. **The exclusion moves rather than vanishes.** The build needs no list, but 15 tree scanners broke until each learns the source predicate (§8 B). The predicate is one suffix rule, not a path list, and it is still something every scanner must call. `overfit-structure` (E-7) changes meaning: colocated tests no longer count as external sites.
4. **Capsule roots bloat.**
   - dock goes from 11 to 51 direct files; `src` dirs with ≥ 10 files go from 15 to 38.
   - Door-only tests carry no sub-capsule signal, so the portfolio sketch's `dock/morph/`, `dock/layers/` and `dock/search/` must be designed per family and named into place (§7.4).
   - The charter's "1 `git mv` per relocation" only holds once sub-capsules exist.
5. **One strict typecheck program surfaces 85 errors** (36 visual specs, 2 tests). Otherwise the program splits per suffix via include globs, which reintroduces a list.
6. **Filename-listed configs break silently on moves.** The WebKit project fell from 13 to 10 instances with no error (`aurora-swraster`). The `coarse-touch` project is the same kind of list.
7. **Path-literal couplings between artifacts.** 11 files, including `g-hm-layer` reading itself and `story-preview-card` reading every story by the old path convention.
8. **The stage cycle.** StoryPage → `useStoryNavigation` → manifest → `glob(stories)`. Colocating stories is sound only after the frame inversion (R3).
9. **Things that straddle capsule and tool, or capsule and harness.**
   - `springTokenMirror.test.ts` (tokens ↔ `scripts/regen-spring-tokens.mjs`).
   - Story helpers with a test importer fall to the stage (`loop-driver.ts`, aurora `presets.ts`, `options.ts`, `usePaletteStops.ts`). `pi-manifest.ts` reads `presets.ts` by literal path.
10. **The `imports` field is published,** or the harness aliases are declared four times (§11).
11. **Deep-import floor.** C2 stays at 583 after the carve. The capsule gate cannot go green until `_shared` (286 reaches from `src`) is split into nearest-common-ancestor capsules with doors.
12. **40 moved files compute paths from `__dirname`/`cwd`.** They still ran, but they are not relocation-safe.

---

## 14 · Open gaps

- **Sub-capsule placement** for door-only artifacts, and the long-dir bound N, which is an owner ruling.
- **The subject clause for harness-primary artifacts**, and declared subjects for token pages. Includes a ruling on which `src/styles` capsule receives each foundations page.
- **Not built or run in the probe:** the `isSource` predicate module and the 26 file cures; the StoryPage inversion; the `family` metadata and FamilyTabs glob; converting `resolveScene`/`pi-manifest` to `<story>` blocks. Custom-block metadata was proven on 2 of 79 stories only.
- **The visual suite was only discovered, not executed** (no server started). The 1,024 moved instances are unproven at runtime.
- **The two Chromium-launching vitest files** were not converted to `.visual.ts`.
- **C2 floor:** the `_shared` split and composable subtree doors are shared with the portfolio floor. Not costed here beyond the count.
- **Owner rulings:** `package.json` `imports` vs 4 alias sites; tests and visual specs under full `src` strictness vs a split program.
- **Gate scanner:** a production form should reuse `scripts/import-dag.mjs`'s resolver and resolve `#` specifiers. R2 (no `#` specifier or suffixed file in the entry closure) is not yet a clause; it belongs on the C3 entry-closure walk.
