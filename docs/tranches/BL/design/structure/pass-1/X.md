# D1 · pass 1 · seat X: the constellation and the backend analogue

| field | value |
|---|---|
| seat | X (the constellation survey and the backend analogue) for design loop D1: structure, the colocation edict N-1 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEADs read | glass-ui `fe5df357` (docs-only since `79c3601b`: `git diff --stat 79c3601b HEAD -- src scripts tests tests-visual demo package.json vite*.ts` is empty) · value.js `62b5ecfd` on `tranche-u` (live session; figures are its working tree) · keyframes.js `60477b06` · fourier-analysis `216ffbd4` · slides `b538506a` · atlas `1e2b911b` · speedtest `7212e733` · sci-report `735ce1c8` · bbnf-lang `af15f63e` |
| instruments | `X/census.mjs`: `git ls-files -s` (submodules dropped), source extensions only (`ts tsx js mjs cjs mts cts vue css scss py rs wgsl glsl frag vert sh bbnf go sql html`), every `docs/` path excluded, bbnf-lang `restart*` excluded. It counts direct source files per directory and lines per file. Plus `grep`, `git grep`, `git ls-files`, `wc`, `diff`, `shasum`, and keyframes.js's own `scripts/gates/structure/index.mjs` run read-only (in place for keyframes; a scratch copy for glass-ui, §3.4). Node v26.0.0 |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/X/`, called `X/` below. Raw per-repo census outputs are `X/all-<repo>.txt` |
| fences kept | no sibling repo was built, tested, served or installed. The keyframes gate was run in place only without `--selftest` (the only branch that writes, `index.mjs:628-629`, and only to `tmpdir()`). `git status --porcelain` in keyframes.js was identical before and after |
| deliverable | For each repo: the unit of colocation, where composables and styles live, the top 10 files and dirs, the tooling that encodes paths, and any backend. Then the house style, the conflicts, and what "befitting" means for each backend language present |

Citations are `repo/path:line`, a command with its output, or a URL. "Measured" means a command in this session produced the number.

---

## 0 · The answer in brief

1. **This edict has already been run twice.** The same text, backend clause included, went to value.js on 2026-07-06 (`value.js/docs/tranches/T/MANDATE-2026-07-06.md:69-78`) and to keyframes.js around 2026-07-10 (`keyframes.js/docs/tranches/U/ORIGINAL-PROMPT.md:28-36`). Both produced rulings that glass-ui inherits or has to overrule (§1).
2. **A house style exists and is mostly consistent.** Seven of nine repos nest a `composables/` dir inside the module that owns it (55 such dirs). Slides and sci-report share the slug-instance-plus-`meta.ts`-glob pattern. Owned tests mostly sit outside `src`. Every source language uses a directory-owned entry file: `index.ts`, `__init__.py`, `mod.rs` (§4).
3. **Twelve conflicts need a ruling.** The load-bearing four are these. keyframes' structure gate bans `composables/` dirs, which the edict permits. The two prior runs ruled tests in opposite directions. The precept prompts prescribe re-export barrels and transitional import names, which the no-shim law forbids. Skeletons are named by the edict, rejected by the precept, and practised as `<Name>Skeleton.vue` siblings (§5).
4. **glass-ui's backend is its Node tooling, and it has three roles, not one** (§3.1). `scripts/` holds build library code imported by `vite.*.ts`, test helpers imported only by tests, CLI tools, and one dead module. The befitting treatment is family dirs with helpers placed at the lowest common ancestor of their importers. keyframes.js already landed this shape (§6.1).

---

## 1 · The edict's two prior executions

| | value.js tranche T | keyframes.js tranche U |
|---|---|---|
| edict text | `T/MANDATE-2026-07-06.md:69-78`, verbatim incl. "Similar treatment and enforcement should be applied to all backend files" | `U/ORIGINAL-PROMPT.md:28-36`, verbatim, plus "Colocation, colocation, colocation" |
| component idiom | recursive PascalCase component dirs with `composables/` inside (§2.2) | OD-U2: "every component a kebab-case dir (PascalCase SFCs + `index.ts` barrel + `constants.ts` + per-component `composables/`) … `components/custom/` dissolves", adopted from "the glass-ui post-BH idiom" (`U/OWNER-DECISIONS.md:11`) |
| tests | Q17 "Backend naming + test policy": `modules/` + `platform/`, colocated `__tests__/` per module plus a named `test/conformance/` exception. **RULED — DEFAULT (no objection)** (`T/T.md:696`) | OD-U7: **"Tests stay in their own dir."** The `test/<area>` mirror is terminal, "recorded as the edict's befitting-for-the-language carve-out" (`U/OWNER-DECISIONS.md:16`) |
| backend / scripts | api landed as `api/src/modules/<domain>/…` (`T/FINAL.md:61`: "E-1 landed WHOLE across 3 single-writer trees: src `f8e7eed` · api `dfa46c4` · demo `77d21fc`") | OD-U10: the bespoke `proof:scripts-colocated` gate was DROPPED ("sounds overfit junk"). The `scripts/` family restructure runs (U.A9), held by "the EXISTING colocation gate gaining one clause" (`U/OWNER-DECISIONS.md:19`; `U/PROGRESS.md:177-181`) |
| granularity | a 400-LoC "god-module cap" on demo SFCs (e.g. `demo/picker/controls/ComponentSliders/composables/useSliderTouchGates.ts:3`) | OD-U16: "long files break into module dirs … absurdly small modules should be abrogated … and instead made inline" (`U/OWNER-DECISIONS.md:25`) |
| one home | — | OD-U19: demo components get "EXACTLY ONE home"; `app/dock/` "needs to be straight up extirpated" (`U/OWNER-DECISIONS.md:28`) |

The owner also asked for cross-repo sameness in so many words: "Ensure homogenaity with our ther repos--what idioms have we established in glass-ui's post-BH component set?" (`value.js/docs/tranches/V/apotheosis/armB/owner-msgs-10df.txt:5030`). glass-ui is the named reference, so whatever D1 picks re-baselines the other repos.

Two things from the keyframes run matter for D1.

**The edict is only half landed in keyframes.** The library is gated and clean: `node scripts/gates/structure/index.mjs` gives "PASS: scope=src clean (0 violations across R1–R6)" (`X/kf-structure-src.txt`). The demo scope is authored but was never switched on ("`--scope=demo` # future (W8)", `index.mjs:43`). Run read-only, it fails: "FAIL: 31 violation(s) on scope=demo [R1×0 R2×2 R3×3 R4×12 R5×14 R6×0]" (`X/kf-structure-demo.txt`). `demo/app/dock/ChromeDock.vue`, which OD-U19 ordered extirpated, is still there at 649 lines (`X/all-keyframes.js.txt`).

**Its own gate contradicts its own component ruling.** R5 bans `{components, composables, utils, helpers, hooks, mixins, services}` dirs (`index.mjs:104-114`). OD-U2 prescribes per-component `composables/`. §5 row C1 has the numbers.

---

## 2 · Per-repo survey

Per-repo totals from `node X/census.mjs <repo>`. A "dir" count means direct source files.

| repo | source files | lines | files >500 | >1000 | dirs ≥10 | dirs ≥20 |
|---|---:|---:|---:|---:|---:|---:|
| glass-ui | 1,270 | 226,653 | 58 | 5 | 30 | 5 |
| value.js | 635 | 100,655 | 26 | 3 | 12 | 4 |
| keyframes.js | 599 | 115,259 | 28 | 4 | 13 | 4 |
| fourier-analysis | 357 | 59,977 | 19 | 0 | 11 | 3 |
| slides | 103 | 16,085 | 5 | 1 | 3 | 0 |
| atlas | 402 | 65,939 | 13 | 0 | 12 | 3 |
| speedtest | 473 | 85,892 | 18 | 4 | 14 | 1 |
| sci-report | 823 | 134,538 | 44 | 6 | 10 | 3 |
| bbnf-lang (excl. `restart*`) | 1,202 | 322,707 | 94 | 31 | 26 | 3 |

### 2.1 glass-ui (no server; §3 covers the tooling in depth)

- **Unit of colocation.** The kebab-case component dir `src/components/<name>/` has an `index.ts` barrel and, where needed, `composables/`, `constants.ts`, `styles.css`/`styles/` and `shaders/`. This is `docs/design/design-idioms.md:220-256` §7. Cross-component code lives in `src/components/_shared/`. Shared composables live in `src/composables/<domain>/`.
- **Composables.** 10 component-local `composables/` dirs (aurora, blob, constellation, data-table, deck, dock, fading-scroll, infinite-scroll, tabs, typewriter), plus `src/composables`, `demo/composables` and the mirror `tests/composables` (`X/dirs-glass-ui.txt`).
- **Styles.** 140 CSS files: 79 under `src/styles`, 19 under `src/components/dock/styles`, 5 under `deck/styles`. 35 in total sit outside a `styles/` dir, i.e. colocated `styles.css` (measured). 70 of 284 SFCs carry a `<style>` block.
- **Top files (whole repo):** 1,260 `tests/styles/contrast-computed.test.ts` · 1,099 `tests/styles/glass-subtlety.test.ts` · 1,098 `demo/stories/manifest.ts` · 1,079 `scripts/verify-export-types.mjs` · 1,030 `tests/public-surface.spec.ts` · 938 `scripts/profile-bundle.mjs` · 933 `tests/components/custom/dock/g-dock-lattice.test.ts` · 884 `tests/components/easing.contract.test.ts` · 835 `tests/components/custom/constellation/constellationField.test.ts` · 824 `tests/demo/story-preview-card.test.ts`.
- **Top dirs:** 175 `tests-visual` · 43 `tests/components` · 28 `src/styles/glass` · 28 `tests/styles` · 20 `src/styles/tokens` · 19 `src/styles` · 17 `tests/demo` · 16 `src/components/aurora/composables` · 16 `src/components/menu` · 16 `tests/components/custom/dock`.
- **Path encodings.** 68 export keys. The entry map is `scripts/lib/subpath-policy.mjs` → `vite.library.ts:1`. The `@glass` alias is written in four places: `tsconfig.json:17-18`, `vite.config.ts:23-24`, `vitest.config.ts:21-22`, `demo/vite.demo-dist.config.ts:55-56`. There is one npm workspace, `"workspaces": ["tests-visual"]` (`package.json:13-15`).
- **Backend.** None. The analogue is 17 `scripts/` files (6,855 lines), 9 root `vite*.ts`/`vitest.config.ts` files (1,330 lines) and 2 workflows (143 lines).

### 2.2 value.js

- **Unit.** `src/` is split by domain: `color/ css/ transform/ foundation/ subpaths/`, 27 files, 4,673 lines. The demo is split by feature (`workbenches/<wb>/`, `palettes/`, `picker/`, `shell/`) with **recursive PascalCase component dirs**, each carrying its own `composables/`. Examples: `demo/picker/controls/ComponentSliders/composables`, `demo/workbenches/extract/ImageEyedropper/composables`, `demo/workbenches/mix/MixAnimationCanvas/composables`. There are 7 PascalCase component dirs (`X/dirs-value.js.txt`). This is the closest landed instance of the edict's "recursively for nested components".
- **Composables.** 14 `composables/` dirs, all nested. There is no global one (`X/dirs-value.js.txt`).
- **Styles.** `demo/styles/` (6 files; `foundation.css` is 890 lines) plus 3 colocated `.css` files such as `demo/picker/seat.css`. 54 of 92 SFCs carry `<style>`.
- **Top files:** 1,350 `e2e/smoke/oracles/o18-contrast-census.spec.ts` · 1,105 `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` · 1,045 `demo/shell/usePaneRouter.ts` · 890 `demo/styles/foundation.css` · 734 `e2e/smoke/views/gradient.spec.ts` · 719 `scripts/ci/boot-smoke.mjs` · 692 `e2e/visual/capture.ts` · 687 `demo/color-session/space-catalog.ts` · 675 `e2e/smoke/a11y-gradient-stop-grammar.spec.ts` · 672 `src/transform/path.ts`.
- **Top dirs:** 36 `e2e/smoke/oracles` · 29 `test` · 26 `demo/color-session` · 21 `demo/palettes` · 18 `api/src/modules/palette/__tests__` · 18 `e2e/smoke` · 17 `e2e/visual` · 15 `demo/palettes/export` · 15 `demo/test/palettes` · 10 `demo/color-picker/composables/boot`.
- **Path encodings.** 7 export keys (`./color ./value ./css ./easing ./math ./transform ./quantize`, `package.json:21`). An `@src` alias sits in `vite.config.ts:74`. `tsconfig.demo.json:42-49` and `tsconfig.test.json:28-36` map `@mkbabb/value.js/parsing` and `/units` onto `dist/subpaths/{parsing,units}.d.ts`. Neither key is in `exports` and neither file exists in `dist/subpaths` (`ls dist/subpaths` lists only color css easing math quantize transform value). That is two stale path encodings. Vite plugins live in `plugins/` (3 files).
- **Backend.** `api/` is a Hono + MongoDB + zod service (`api/package.json`). Its shape is **vertical, by domain**: `api/src/modules/{admin,color,meta,palette,session}/{routes,service,repository,__tests__}` plus `api/src/platform/{cache,db,http,migrations,text}`. Tests are colocated in 30 files under `__tests__/`, with 12 under `api/test/` (conformance). Scripts are family dirs by purpose: `scripts/{ci,deploy,dev,fonts,perf,visual}`, one file of which is Python (`scripts/fonts/build-fraunces-tnum.py`).

### 2.3 keyframes.js

- **Unit.** The library is organised by domain dirs under `src/animation/` (compile 30, physics 22, orchestration 20, engine 17, group 15 …), with **no kind dirs**, gated by R5. The demo is kind-bucketed: `demo/components/instrument/<part>/{components,composables,utils}` 79 files, `scenes/<scene>/` 64, `app/` 18, `utils` 9, `state` 9, `composables` 8, `styles` 7.
- **Composables.** 5 nested dirs plus `demo/composables`. All six fail R5 under the demo scope (`X/kf-structure-demo.txt`).
- **Styles.** `demo/styles/` (6) plus 6 colocated `.css` files. 37 of 56 SFCs carry `<style>`.
- **Top files:** 1,612 `scripts/observe/demo/live-session.mjs` · 1,202 `scripts/observe/demo/live-session-mobile.mjs` · 1,043 `scripts/lib/demo-driver.mjs` · 1,016 `demo/components/instrument/transport/channel-controls/ChannelOptions.vue` · 889 `demo/scenes/spring/SpringTarget.vue` · 873 `scripts/gates/surface/published-surface.mjs` · 844 `demo/components/instrument/timeline/components/TimelineTrack.vue` · 755 `scripts/gates/structure/index.mjs` · 749 `scripts/gates/census.mjs` · 740 `scripts/gates/surface/boundary.mjs`. `src/` max is 499 (`src/animation/ingest/cssom.ts`), 0 files over 500.
- **Top dirs:** 30 `test/demo/instrument` · 28 `test/engine` · 27 `test/compile` · 22 `test/demo/scenes` · 16 `bench` · 15 `test/physics` · 14 `demo/scenes/spring` · 14 `test/fixtures/keyframes` · 13 `test/orchestration` · 12 `test/group`.
- **Path encodings.** 2 export keys (`package.json:20`). `tsconfig.json` paths declare **11 aliases, 6 of them kind aliases**: `@components/* @utils/* @composables/* @styles/* @state @app/*`, plus `@src/* @kf-engine @assets/*` and the self path. There is also `.dependency-cruiser.cjs` and the structure gate (`package.json:37,51`).
- **Backend.** None. The tooling was restructured into families: `scripts/{gates/{surface,structure,visual},observe/demo,build/vite,release,lib}` plus 6 loose files and `bench/` (16). Vite plugins live in `scripts/build/vite/` with an `index.ts` barrel.

### 2.4 fourier-analysis

- **Unit.** The web app uses `web/src/components/<feature>/{composables,lib,<sub-feature>}`, plus top-level `web/src/{composables,lib,stores,router}`. The Python library is `src/fourier_analysis/{contours,figures,symbolic}`, in **src-layout** (`pyproject.toml:40`: `packages = ["src/fourier_analysis"]`).
- **Composables.** 2 nested (`components/equation/composables`, `components/visualization/composables`) plus the global `web/src/composables` (5).
- **Styles.** 1 CSS file. 53 of 62 SFCs carry `<style>`.
- **Top files:** 889 `api/routers/visualizations.py` · 847 `web/src/components/visualization/gallery/AdminUserList.vue` · 807 `web/src/components/paper/PaperView.vue` · 749 `web/src/lib/api.ts` · 705 `web/e2e/visualization-crud.spec.ts` · 699 `web/src/components/equation/EquationView.vue` · 665 `web/src/components/visualization/VisualizationView.vue` · 652 `api/routers/admin.py` · 620 `web/src/components/equation/ConvergencePlot.vue` · 613 `web/src/components/visualization/gallery/AdminFlaggedPanel.vue`.
- **Top dirs:** 28 `src/fourier_analysis/figures` · 24 `web/e2e` · 20 `web/src/lib` · 19 `api/tests/conformance` · 19 `api/tests` · 18 `web/src/components/visualization` · 13 `src/fourier_analysis/contours` · 13 `web/src/components/visualization/gallery` · 11 `scripts` · 11 `src/fourier_analysis`.
- **Path encodings.** `@/*` → `web/src/*` (`web/tsconfig.json`). The console script is `fourier = "fourier_analysis.cli:main"`.
- **Backend.** `api/` is FastAPI + Motor, **layered horizontally by role**: `api/{routers,services,models,lib/crud,scripts}` with `main.py config.py dependencies.py responses.py`. Tests sit in `api/tests/` (38 files) and also in the Jest-style `api/services/__tests__/` (3 files, a JS idiom inside Python). `api/slugs.py` is a live compatibility wrapper: "Thin wrapper around ``api.lib.crud.slugs`` … The public surface is preserved for existing call sites" (`api/slugs.py:3-12`). Its one importer is `api/routers/sessions.py:15`. Infrastructure: `docker-compose{,.prod}.yml`, `nginx/`, `infra/apache/`, `api/Dockerfile`, `web/Dockerfile`, and `scripts/` (11 flat, mostly `.sh`).

### 2.5 slides

- **Unit.** A slug instance: `src/decks/<slug>/{meta.ts,deck.ts,slides/,components/,theme.css}`, discovered by a one-level glob, `import.meta.glob(["./*/meta.ts", "!./_*/meta.ts"])` (`src/decks/registry.ts:15-18`). The engine is `src/deck/`, 15 flat files, with its composables (`useDeck.ts useDeckNav.ts useEdgeZones.ts useCountup.ts`) loose in the dir and no `composables/` dir.
- **Styles.** `src/styles/` (3) with `deck.css` at 1,453 lines, the repo's largest file. There is also one per-deck `theme.css`.
- **Top files:** 1,453 `src/styles/deck.css` · 814 `src/decks/til-briefing/constellation.ts` · 567 `src/decks/feedback-coder/theme.css` · 565 `scripts/proof-deck-copy-conformance.mjs` · 516 `src/decks/feedback-coder/slides/Slide05.vue` · 470 `src/decks/til-briefing/slides/SlideIdeaBoard.vue` · 467 `src/deck/DeckSettings.vue` · 447 `src/decks/feedback-coder/slides/Slide03.vue` · 408 `src/decks/feedback-coder/components/CodeTree.vue` · 402 `src/deck/DeckView.vue`.
- **Top dirs:** 19 `scripts` · 18 `tests/e2e` · 15 `src/deck` · 9 `src/decks/til-briefing/slides` · 5 `src` · 5 `src/decks/feedback-coder` · 5 `src/decks/feedback-coder/slides` · 5 `src/views` · 4 `.` · 4 `tests/unit`.
- **Path encodings.** The `@/*` alias and the glob registry. No precepts submodule (`.gitmodules` absent).
- **Backend.** One Cloudflare Pages Function, `functions/_middleware.ts` (106 lines), an HMAC link gate. The token contract `` `${slug}.${exp}` `` + HMAC-SHA256 is implemented twice: in the edge function (WebCrypto, `functions/_middleware.ts:1-13,27-28`) and in `scripts/sign-deck.mjs:10,27` (`node:crypto`). `scripts/` is 19 flat files, five of them wave one-offs (`wf-l-*.js`) plus `_diag-r11-flat-menu.mjs`.

### 2.6 atlas

- **Unit.** A domain module `src/<domain>/` (charts, filter, platform, design, editorial, motion, story …). **Composables nest inside the domain**: `src/charts/composables`, `src/filter/composables`, `src/platform/composables`, `src/platform/chrome/{background,dock}/composables`. Barrel coverage is the highest in the constellation: 36 of 40 multi-file production dirs have `index.ts` (measured, §4 row H4).
- **Styles.** `src/design/{tokens,recipes,foundations,overlays}` (19 files) plus `styles/` (2). 83 of 90 SFCs carry `<style>`.
- **Top files:** 900 `src/interaction/SelectionDrilldownPanel.vue` · 744 `scripts/glyph-pipeline/charter.mjs` · 742 `src/charts/geo/GeoChoropleth.vue` · 728 `src/design/tokens/color.css` · 716 `tests/gates/cream-law.gate.ts` · 713 `src/design/recipes/recipes.css` · 668 `src/filter/ui/SourceDataBrowser.vue` · 651 `scripts/bake-glyph-registry.mjs` · 627 `src/editorial/DashboardEssay.vue` · 564 `src/charts/scene/StickyScene.vue`.
- **Top dirs:** 40 `tests/unit` · 25 `src/motion` · 21 `src/editorial` · 17 `src/charts/frame` · 16 `src/charts/composables` · 16 `src/interaction` · 14 `src/data` · 14 `src/platform/provenance` · 13 `src/charts/legend` · 12 `src/story`.
- **Path encodings.** 22 export keys, including the kind-named public subpaths `./composables` and `./lib`. The entry map is **explicit `name → path`**, so placement is already decoupled from the public name: `composables: src("platform/composables/index.ts")`, `chrome: src("platform/chrome/index.ts")` (`vite.lib.config.mts:32-51`). This is the re-key that `PORTFOLIO.md` §2.2 row 6 asks glass-ui for, already landed next door. Alias `@/` → `src/`.
- **Backend.** None. `scripts/glyph-pipeline/` is a 7-file directory-module. `build/critical-css.mjs` (237 lines) and `build/postcss-custom-media.mjs` (57) have **0 importers** in atlas (`git grep -n "critical-css\|postcss-custom-media" -- ':!*.md'` hits only the files themselves and a CSS comment), and `build/` is not in `files` (`["dist","types"]`).

### 2.7 speedtest

- **Unit.** Two tiers. There is a feature slice, `src/features/speedtest/{ui,composables,engine,state}` (70 files), beside legacy layers `src/{components 56, stores 13, api 13, composables 10, views 9, design 8, utils 4}`. The boundary checker spells out the history: "AV.W2 consolidated the three scattered 'speedtest' homes … into ONE feature slice … feature-slicing wins over flat layer-discipline as the org axis" (`scripts/check-internal-boundaries.mjs:1-40`).
- **Composables.** Nested in `src/components/{dashboard,survey}/composables` and `src/features/speedtest/composables` (13), plus the global `src/composables`. Tests mirror all four under `tests/`.
- **Styles.** `src/design/tokens.css` (1,210 lines) plus `src/features/speedtest/ui/styles` (2). No other CSS is colocated. 26 of 50 SFCs carry `<style>`.
- **Top files:** 2,265 `src/features/speedtest/ui/SpeedtestResults.vue` · 2,249 `workers/speedtest-edge/tmp/edge-bundle/index.js` · 1,210 `src/design/tokens.css` · 1,057 `vite.config.mjs` · 833 `src/App.vue` · 780 `tests/e2e/aj-w1-p0-smoke.spec.ts` · 774 `src/components/Dock.vue` · 758 `tests/components/survey/composables/useSurvey.test.ts` · 697 `src/features/speedtest/ui/ResultStack.vue` · 693 `src/features/speedtest/composables/useMeterRenderer.ts`.
- **Top dirs:** 37 `scripts` · 14 `src/components/dashboard` · 13 `src/features/speedtest/composables` · 13 `src/features/speedtest/engine` · 12 `src/features/speedtest/ui` · 11 `server/tests/routes` · 11 `src/features/speedtest/state` · 11 `tests/features/speedtest/composables` · 10 `scripts/probes` · 10 `server/src/middleware`.
- **Path encodings.** The frontend `tsconfig.json:15-22` declares 7 aliases: `@src/* @design @design/* @utils/* @features/* @speedtest/*` (→ `features/speedtest/engine`) and `@assets/*`. The server declares `@/*` and `@tests/*`, rewritten post-emit by `tsc-alias`. npm workspaces are `server`, `workers/speedtest-edge` and `scripts/lighthouse-plugins/speedtest-skeleton-paint` (`package.json:6`).
- **Backend.** Three kinds.
  - `server/` is Hono + MongoDB + zod (the same stack as value.js `api/`), **layered horizontally**: `server/src/{routes/{admin,dashboard,surveys},middleware 10,validation 10,services 6,utils 6,logging,cache,events,sync,trie}`, with `server/tests/{routes,services,utils,db,_harness}` mirroring it. 0 of its 95 files exceed 300 lines.
  - `workers/speedtest-edge/` is a Cloudflare Worker package (`src/ tests/ wrangler.toml`). It commits a wrangler build output, `tmp/edge-bundle/index.js` (2,249 lines) plus its `.map`, and nothing references it (`grep -rn edge-bundle` outside docs: 0 hits).
  - `functions/api/[[path]].ts` (55 lines) is a Pages Function proxy.
  - `scripts/` is 37 flat files, **19 of them named for a tranche or wave** (`ae-*`, `ao-*`, `w8-…w22-*`, `*-w3r4`; `grep -cE "^scripts/(ae|ao|w[0-9]+)-|w3r4"` → 19).

### 2.8 sci-report

- **Unit.** A slug instance, `dashboards/<slug>/`, with an **isomorphic shape across slugs**: 8 `meta.ts`, 8 `dashboard.ts`, 8 `context.ts`, 8 `DashboardBody.vue`, 7 `store.ts`, plus `features/<feature>/`, `story/points/NN-name/`, `store/`, `lib/`, `styles/` (`git ls-files dashboards | awk -F/ '{print $3}' | sort | uniq -c`). Discovery is by glob (`dashboards/meta.ts:11`, `dashboards/registry.ts:40-44`).
- **Composables.** 16 dirs. Fifteen sit at feature depth (`dashboards/<slug>/features/<feature>/composables`) and one at dashboard depth (`dashboards/usf/composables`). There is no global one. Of the nine repos, this is the most literal reading of "a composables/ dir therein".
- **Styles.** 9 CSS files, all under a slug's `styles/` or `design/`. 83 of 113 SFCs carry `<style>`.
- **Top files:** 1,216 `dashboards/sci/features/scatter/SciScatter.vue` · 1,178 `tools/atlas_data/usac/consultant_anomaly/external/irs_eo.py` · 1,108 `…/external/cooperatives.py` · 1,052 `…/consultant_anomaly/feed.py` · 1,029 `…/external/spin_registry.py` · 1,028 `dashboards/ecf/features/districts/DistrictChoropleth.vue` · 929 `…/external/dyad_capture.py` · 927 `dashboards/bead/features/providers/BuilderClassPlate.vue` · 913 `dashboards/sci/features/map/SchoolMap.vue` · 884 `…/consultant_anomaly/registry.py`.
- **Top dirs:** 31 `tests/unit` · 23 `tools/atlas_data/tests/usac` · 21 `tools/atlas_data/usac/consultant_anomaly` · 16 `…/consultant_anomaly/external` · 14 `dashboards` · 14 `tools/atlas_data/svf/steps` · 13 `tools/atlas_data/usac/urban_rural` · 12 `tools/atlas_data/utils` · 11 `tools/atlas_data/svf/utils` · 10 `dashboards/usf-integrity/store`.
- **Path encodings.** `@/*` → `dashboards/*` (`tsconfig.json`). The workspace is `["dashboards"]` (`package.json:11`). Python uses `hatch packages = ["atlas_data"]` and `testpaths = ["atlas_data/tests"]` (`tools/pyproject.toml:61,130`).
- **Backend.**
  - **The Python data backbone** `tools/atlas_data` is 429 files and 74,204 lines, in **flat layout** (no `src/`), as a `uv` project. Three of its 14 sub-packages carry the full `downloaders/ parsers/ pipelines/ steps/` quad (`sci_report`, `svf`, `usf`), `ecf` carries two of the four, and `usac` (75 files) uses domain-named sub-packages instead (measured).
  - Two god namespaces remain, `atlas_data/utils` (12 files) and `atlas_data/svf/utils` (11 files plus `formatting/` and `nces_recovery/`): 4,458 lines together, 34 paths (`xargs wc -l`; `X/py-sci-report.txt`).
  - Tests sit **inside the package**, excluded from the wheel: "RT7 — tests colocate inside the package (atlas_data/tests) but must NOT ship" (`tools/pyproject.toml:63-65`).
  - Cloudflare Pages Functions `dashboards/functions/{_middleware.ts, api/[dashboard].ts 494, api/speedtest.ts 501}` define **`fetchWithTimeout` twice** (`[dashboard].ts:93-105`, `speedtest.ts:289-300`), and each also defines its own `TTL_SECONDS`, `UPSTREAM_TIMEOUT_MS` and `toEnvelope`.
  - `dashboards/vite/critical-css.mjs` is a copy of atlas `build/critical-css.mjs`. Both are 237 lines, and `diff` shows one changed line (`--ring` vs `--focus-ring-color`, line 31).

### 2.9 bbnf-lang

- **Unit.** The crate: a Cargo workspace of 14 members (`crates/*` + `xtask`; `Cargo.toml:1-4`). Inside a crate, modules are directory modules via `mod.rs`: 104 `mod.rs` dirs against 1 `foo.rs + foo/` sibling (measured over `crates/**/src`).
- **Composables and styles.** Only in `playground/src/{composables,components,lib}`, a Vue app.
- **Top files:** 21,211 `crates/core/src/grammar/generated/bbnf.rs` · 13,781 `…/generated/google_sheets.rs` · 11,863 `skinny/crates/bbnf-bench/src/report.rs` · 8,867 `…/generated/css_pretty.rs` · 7,474 `…/generated/ebnf.rs` · 5,973 `skinny/crates/bbnf-bench/src/bin/gate.rs` · 5,283 `skinny/crates/bbnf-bench/src/lock14_baseline.rs` · 4,575 `xtask/src/regen_simple_runtime.rs` · 4,321 `skinny/crates/bbnf-bench/src/generated_real_typed.rs` · 3,320 `…/generated/json.rs`. Six of the ten are generator output committed under `src/`.
- **Top dirs:** 106 `crates/core/tests` · 23 `crates/ir/src/passes/recognizers` · 21 `crates/ir/tests/passes` · 19 `skinny/crates/bbnf-simd/src/aarch64` · 18 `skinny/crates/bbnf-bench/src` · 17 `skinny/crates/bbnf-simd/tests` · 15 `grammar/css/l4` · 15 `scripts` · 14 `crates/ir/src/passes/recognizers/shape_dispatch` · 13 `crates/analysis/src/features`.
- **Path encodings.** `[workspace] members` plus `[workspace.metadata.bbnf] grammars` (the regen manifest, `Cargo.toml:18-29`). `wasm` is excluded from the workspace. npm workspace `["playground"]`.
- **Backend.** An LSP (`crates/lsp`). What `server/` holds is a **committed 7.6 MB Mach-O arm64 binary**, `server/bbnf-lsp` (`git ls-files -s` mode 100755; `file` → "Mach-O 64-bit executable arm64"). There is also a VS Code extension, `wasm/`, **a second Cargo workspace with its own xtask** (`skinny/Cargo.toml`, `skinny/xtask/src/main.rs` 2,780 lines), and 15 flat `scripts/` (14 `.sh`, 1 `.py`). Tests follow Cargo: 199 integration test files under `crates/*/tests/` against 12 `src` files with inline `#[cfg(test)]`.

---

## 3 · glass-ui's backend analogue, in depth

### 3.1 `scripts/`: three roles in one flat dir

17 files, 6,855 lines (`git ls-files scripts | xargs wc -l`). These are the actual importers, found by grepping import statements across `src tests tests-visual demo vite*.ts vitest.config.ts scripts`:

| role | file (lines) | importers |
|---|---|---|
| build library | `lib/subpath-policy.mjs` (388) | `vite.library.ts`, `vite.style-fold.ts`, `flatten-subpath-types.mjs`, `regen-exports.mjs`, `tests/gates/{orphan-css-partial,overfit-structure}.test.ts` |
| build library | `lib/minify-css.mjs` (198) + `.d.mts` (2) | `vite.style-fold.ts`, `tests/styles/minify-css.test.ts` |
| build library | `gen-component-styles.mjs` (60), `flatten-subpath-types.mjs` (135), `verify-export-types.mjs` (1,079, also `npm run verify:package`) | `vite.style-assets.ts:27-29` only |
| test helper | `lib/paint-arm.mjs` (586) | **8 specs, all in `tests-visual/`** (adaptive-glass-live, customizability, dialog-glass, glass-identity, glass-legibility, metal-shimmer, no-shadcn-default, selection-card) |
| test helper | `gate-register.mjs` (739) | `tests/gates/gate-register.test.ts:29` only |
| test helper | `comment-census.mjs` (725) | `tests/gates/comment-ratio.test.ts` only |
| test helper + CLI | `regen-spring-tokens.mjs` (313) | `tests/composables/motion/springTokenMirror.test.ts` only |
| test helper + CLI | `profile-bundle.mjs` (938, `npm run profile:bundle`) | `tests/scripts/profile-bundle-value-js.test.ts` only |
| CLI only | `regen-exports.mjs` (210), `import-dag.mjs` (628), `reflect-capture-verify.mjs` (583), `safari-probe.mjs` (44), `release.sh` (61) | none. `reflect-capture-verify` and `safari-probe` have no reference outside `docs/` |
| dead | `lib/canon-doc.mjs` (166) | **0**. `grep -rln canon-doc` outside docs/dist finds only the file itself. Its header describes a CLAUDE.md-era seam that BH retired |

What this means for the edict:

- **Placement.** `paint-arm.mjs` sits in `scripts/lib/`, but all 8 of its importers are in `tests-visual/`. `gate-register` and `comment-census` each have exactly one importer, in `tests/gates/`. Under an importer-placement law (D1-A) these three, 2,050 lines between them, leave `scripts/`.
- **Build code has two homes.** Build logic is split between 4 root plugin modules (`vite.dark-stamp.ts 35`, `vite.style-assets.ts 189`, `vite.style-fold.ts 586`, `vite.utility-emit.ts 317` = 1,127 lines) and the `scripts/` modules they import. keyframes puts all of its plugins in `scripts/build/vite/` behind an `index.ts` (§2.3).
- **Duplicated helpers across the tooling (measured):**
  - 6 hand-written recursive directory walks: `import-dag.mjs:134`, `profile-bundle.mjs:417`, `verify-export-types.mjs:112` (`listFiles`), `flatten-subpath-types.mjs:76`, `vite.style-assets.ts:42`, and `vite.style-fold.ts:105`, which alone uses the native form. `readdirSync(..., { recursive: true })` exists "v18.17.0" onward ([nodejs.org fs.readdirSync](https://nodejs.org/api/fs.html#fsreaddirsyncpath-options)) and `engines.node` is `>=22` (`package.json`).
  - 8 repo-root resolutions under 3 names (`ROOT`, `root`, `REPO_ROOT`): `flatten-subpath-types.mjs:15`, `profile-bundle.mjs:16`, `reflect-capture-verify.mjs:19`, `regen-spring-tokens.mjs:33`, `verify-export-types.mjs:27`, `gen-component-styles.mjs:9`, `lib/canon-doc.mjs:25`, `lib/subpath-policy.mjs:40`. Two of them are exported.
  - 4 sha256-hex helpers in `scripts/`: `import-dag.mjs:145`, `gate-register.mjs:139`, `reflect-capture-verify.mjs:66`, `verify-export-types.mjs:680`.
- **Seven files exceed 500 lines:** verify-export-types 1,079 · profile-bundle 938 · gate-register 739 · comment-census 725 · import-dag 628 · paint-arm 586 · reflect-capture-verify 583.

### 3.2 `tests/`: a mirror that drifted

`tests/` has 256 tracked files. `tests/components/` (143 files) mixes three placement schemes:

- 43 flat `<name>.contract.test.ts` files directly in the dir;
- real-name dirs (`dialog/ sheet/ select/ …`);
- **two namespaces that no longer exist in `src/`**: `tests/components/custom/` (50 files) and `tests/components/ui/` (13 files). `src/components/` has neither `custom` nor `ui` (`ls src/components`).

`tests/components/{a11y,control-bit,field}` also have no `src` twin. So the mirror is drifted, not maintained. keyframes ruled its own mirror terminal (OD-U7), so a mirror is a legitimate house shape. This one needs a re-key either way.

### 3.3 `tests-visual/`: the longest dir in the constellation's frontends

This is an npm workspace with its own `package.json` ("DEV-ONLY … OFF the library's zero-dep publish surface", `tests-visual/package.json:6`). Its 167 specs sit **flat** in one dir, 183 tracked files in all. The first word of the file names already implies the grouping: dock 10, blob 8, aurora 8, glass 7, constellation 5, viz 4, reflect 4 (`sed -E 's#[-.].*##' | uniq -c`). 21 of the 167 are underscore-prefixed capture or debug specs or wave-coded (`_cohere-*`, `_sb1-capture`, `w1-radius-redress`, `w38-w47-verify`, `ba-animate` …; `grep -cE "^(w[0-9]+|b[a-z][0-9]*-|a[a-z]-|_)"` → 21). Among frontend repos only speedtest's `scripts/` (37) comes close. value.js's largest spec dir is 36 (`e2e/smoke/oracles`).

### 3.4 keyframes' structure grammar, applied to glass-ui `src` (measured)

I copied keyframes' gate to scratch and pointed its `demo` scope (`.ts` + `.vue`) at glass-ui `src` through a scratch symlink, which was removed afterwards. Results:

- R1 = 1 (`_shared/disclosure/disclosure-context.ts`)
- R2 = 23
- R3 = 3 (impure barrels `alert/index.ts`, `badge/index.ts`, `composables/color/index.ts`)
- R4 = 12 (`.ts`/`.vue` over 500; `src/index.ts` 585 among them)
- **R5 = 13**: `components/`, 10 component `composables/`, `typewriter/utils/`, `composables/`

**12 of the 23 R2 hits are the house component idiom itself.** The gate treats `button/Button.vue` as a "single-member fragment … not eponymous with its dir" because its eponymy check is case-sensitive, so a PascalCase SFC in a kebab-case dir never matches. keyframes' grammar and the glass-ui idiom that keyframes' own OD-U2 adopted cannot both hold unless R2 and R5 are amended (`X/kfgate-glass-R*.txt`).

---

## 4 · The de facto house style

These recur in at least four repos and can be built on.

| # | convention | where (measured) | where not |
|---|---|---|---|
| H1 | **`composables/` nested in the owning module** | 55 nested dirs: sci-report 16, value.js 14, glass-ui 10, keyframes 5, atlas 5, speedtest 3, fourier 2 (`X/dirs-*.txt`) | slides (flat `use*.ts` in `src/deck`), bbnf |
| H2 | **a module- or global-level `composables/` only where genuinely shared** | glass-ui `src/composables`, speedtest `src/composables`, fourier `web/src/composables`, keyframes `demo/composables`, atlas `src/platform/composables` (exported as `./composables`) | value.js and sci-report have none. Everything nests |
| H3 | **one directory = one module with an entry file inside it** | TS `index.ts`: atlas 36/40 multi-file prod dirs, glass-ui 73/126, keyframes 34/70, speedtest 20/41, sci-report 33/91, value.js 18/72, fourier 2/21, slides 0/10. Python `__init__.py`: sci-report 79/80 dirs, fourier 14/17. Rust `mod.rs`: 104/105 | the ratio varies from 0% to 90% |
| H4 | **slug instances found by a one-level glob over `meta.ts`** | slides `src/decks/registry.ts:15-18`, sci-report `dashboards/meta.ts:11` + `registry.ts:40-44`. Also restructure-frontend Law 3 ("The registry glob is single-level `./*/meta.ts`", `docs/precepts/instructions/prompts/restructure-frontend.md:42-46`) | glass-ui's demo uses one central `demo/stories/manifest.ts` (1,098 lines, the demo's largest file; 0 `meta.ts` under `demo/stories`) |
| H5 | **tests outside the source tree** | glass-ui, keyframes (ruled, OD-U7), speedtest (`tests/` + `server/tests/` mirrors), slides, atlas (`tests/{unit,gates}`), fourier lib, bbnf integration tests (199 files) | value.js `api/**/__tests__` (30) and `demo/test` (32); fourier `api/services/__tests__` (3); sci-report `atlas_data/tests` in-package |
| H6 | **a 500-line god-module floor** | keyframes gates it (`scripts/gates/structure/index.mjs:75`, src scope). glass-ui cites it in code (e.g. `src/components/aurora/constants/shaders/metal-medium.glsl.ts:2` "no-god-module 500-line bound"). atlas/sci-report tranche workflows say "NO god-modules (>500L carves)" (`sci-report/atlas/docs/tranches/L/exec/l-arc-execute.wf.js:100`) | value.js demo uses 400 (§5 C5). No repo gates tests, scripts or demo |
| H7 | **tooling in family dirs by purpose** | keyframes `scripts/{gates,observe,build,release,lib}`, value.js `scripts/{ci,deploy,dev,fonts,perf,visual}`, atlas `scripts/glyph-pipeline/`, sci-report Python `downloaders/parsers/pipelines/steps` | flat: glass-ui (12 + `lib/`), slides (19), speedtest (37), fourier (11), bbnf (15) |
| H8 | **backends packaged as workspace members** | speedtest (`server`, `workers/speedtest-edge`, a lighthouse plugin), sci-report (`dashboards`), bbnf (`playground`), glass-ui (`tests-visual`) | value.js `api/` has its own `package.json` but is not a workspace; fourier's `web/` likewise |
| H9 | **the kebab-case component dir** | glass-ui (0 PascalCase dirs), atlas, sci-report, speedtest, slides (0 each), keyframes OD-U2 | value.js 7 PascalCase dirs, keyframes 4 (`X/dirs-*.txt`) |
| H10 | **Tailwind v4, one design home, and colocated plate CSS through an explicit `@import`** | written once in `styling-localization.md:28-32` and glass-ui `design-idioms.md` §7; practised by glass-ui (35 colocated CSS), atlas (`src/design/`), sci-report (per-slug `styles/`) | speedtest (1,210-line `src/design/tokens.css`, nothing colocated), slides (1,453-line `deck.css`) |

These rows describe one shape: **the module directory owns its children, with an entry file inside it.** Helpers that module owns sit beside or below it, and a kind-named child dir is allowed only inside a module. A shared helper sits at the lowest dir that covers all its importers. D1-A (graph home) and D1-B (sealed family modules) formalise this. keyframes' `src/` is D1-B already, apart from the R5 disagreement.

---

## 5 · Where the constellation conflicts

| # | conflict | side A (evidence) | side B (evidence) |
|---|---|---|---|
| C1 | **kind dirs inside a module** | keyframes R5 bans `components composables utils helpers hooks mixins services` everywhere (`structure/index.mjs:104-114`, the set at `:106`). It would red 13 dirs in glass-ui `src` and reds 14 in keyframes' own demo | the edict: "Composables that are truly module-level … can be found within a composables/ dir therein". restructure-frontend Law 6: "`Component.vue` beside its `composables/`" (`restructure-frontend.md:61-66`). OD-U2 prescribes per-component `composables/`. 55 nested dirs exist (H1) |
| C2 | **test placement** | keyframes OD-U7, owner verbatim: "Tests stay in their own dir" (`U/OWNER-DECISIONS.md:16`). restructure-backend Law 6: "`tests/<package>/`, never a co-located `*_test.py`" (`restructure-backend.md:55-57`) | value.js Q17: colocated `__tests__/` per module, "DEFAULT (no objection)" (`T/T.md:696`). sci-report puts tests in-package (`tools/pyproject.toml:63-65`). The Rust book puts unit tests "in the _src_ directory in each file with the code that they're testing" ([Rust book ch11-03](https://doc.rust-lang.org/book/ch11-03-test-organization.html)) |
| C3 | **Python layout** | restructure-backend Law 3: "Flat package layout — no `src/` reversal" (`restructure-backend.md:37-39`). sci-report `tools/atlas_data` is flat | fourier `src/fourier_analysis` (`pyproject.toml:40`). pytest: "it is **strongly** suggested to use a `src` layout" ([pytest good practices](https://docs.pytest.org/en/stable/explanation/goodpractices.html)). PyPA: the src layout "helps prevent accidental usage of the in-development copy of the code" ([packaging.python.org](https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/)) |
| C4 | **component dir case** | kebab: glass-ui, OD-U2 | PascalCase dirs: value.js 7 (`demo/picker/controls/ComponentSliders` …), keyframes 4 (`demo/components/CopyButton`, `…/transport/TransportDock` …) |
| C5 | **line floor** | 500: keyframes (gated), glass-ui, atlas/sci-report | 400: value.js ("keeping the SFC under the 400-LoC god-module cap", `useSliderTouchGates.ts:3`; `T/FINAL.md:369` "2 files > 400 LoC") |
| C6 | **skeletons** | the edict names "skeletons" as a colocated child. glass-ui §7: "skeletons in `<dir>/skeleton/` (each 'if needed')" (`design-idioms.md:222-227`) | restructure-frontend Law 6: "There is no `.skeleton.vue` convention (zero repo precedent — reject it)" (`restructure-frontend.md:64-65`); styling-localization forbids "a `.skeleton.vue` reservation ceremony" (`:86`). **Practice**: `<Name>Skeleton.vue` sibling ×4 (value.js `PaletteCardSkeleton.vue`, `AdminListSkeleton.vue`; atlas `PlateSkeleton.vue`; speedtest `MapSkeleton.vue`), `App.skeleton.vue` ×1 (keyframes). **0 `skeleton/` dirs** in any repo |
| C7 | **barrels and transitional names vs the no-shim law** | restructure-frontend Law 4: "A family regroup ships as RE-EXPORT BARRELS so consumer imports stay byte-stable" (`:51-52`). restructure-backend Law 7: "keep the import name transitionally" (`:60-61`). fourier `api/slugs.py` is such a wrapper, live | the standing law: clean breaks, no aliases, no shims. `feedback_consumer_updates_ruling`: consumer dependence never preserves an obsolete API |
| C8 | **server shape on the same stack** | value.js `api/src/modules/<domain>/{routes,service,repository}` + `platform/` (vertical) | speedtest `server/src/{routes,middleware,validation,services,utils}` (horizontal). fourier `api/{routers,services,models,lib}` (horizontal, FastAPI) |
| C9 | **alias vocabulary** | glass-ui `@glass/*`; atlas, slides, fourier web and speedtest server `@/*`; sci-report `@/*` → `dashboards/*` | `@src/*` (keyframes, value.js vite, speedtest) plus **kind aliases** that write kind dirs into config: keyframes `@components @utils @composables @styles @state @app`, speedtest `@design @utils @features @speedtest` |
| C10 | **home of Vite plugins** | glass-ui: root `vite.*.ts` ×4 and `scripts/` | keyframes `scripts/build/vite/`, value.js `plugins/`, atlas `build/` + `src/vite/` (exported `./vite`), sci-report `dashboards/vite/`. Same code in two repos: atlas `build/critical-css.mjs` ≈ sci-report `dashboards/vite/critical-css.mjs` (1 line differs; atlas's copy has 0 importers) |
| C11 | **which precepts apply** | glass-ui pins precepts `b0f6134` and sci-report pins `1f44742`. Both include the four prompts, which came from "atlas L8-PROMPTS" (`git log --follow instructions/prompts/restructure-frontend.md` → `1f44742`) | value.js and bbnf pin `63240e6`; keyframes, fourier and speedtest pin `8ccf9f4`. All predate the prompts (`git merge-base --is-ancestor`), and `ls docs/precepts/instructions/prompts` is empty in those five. slides and atlas have no precepts submodule |
| C12 | **the demo registry** | glass-ui `demo/stories/manifest.ts` (1,098 lines, central) | slides and sci-report: per-instance `meta.ts` found by glob (H4) |

**Precept vs its own source repo.** restructure-backend was distilled partly from sci-report's Python. Laws 1 and 6 still contradict that repo: 34 `utils/` paths (4,458 lines) and in-package tests remain. A rule that its own origin still breaks shows what landing it costs. It is not a reason to drop the rule.

---

## 6 · What "befitting for those languages" means, backend by backend

The edict has four clauses: (a) colocate a unit with its private parts, recursively; (b) a shared-helper dir only at module or global level, "therein"; (c) long dirs break into common modules; (d) enforcement. The subsections below map each clause onto each backend present.

### 6.1 Node tooling: glass-ui `scripts/` + root `vite.*.ts` (the only backend glass-ui has)

- **(a) unit = a tool family.** `release`, `exports` (regen-exports, flatten-subpath-types, verify-export-types, subpath-policy), `styles` (gen-component-styles, minify-css, the four `vite.*` plugins), `census` (import-dag, comment-census, profile-bundle), and the capture tools. Each family is `scripts/<family>/index.mjs` with its private helpers beside it. keyframes' U.A9 is the landed precedent, and its OD-U10 ruling shows the owner wants **no bespoke gate** for it, only one clause on the existing structure check.
- **(b) "therein".** A family-local `lib/` only when two or more tools in that family share a helper. `scripts/lib/` holds only the cross-family helpers: one walker (6 copies today), one repo root (8), one sha256 (4). Test-only helpers leave `scripts/` for their consumers' tree. That is `paint-arm` → `tests-visual/`, and `gate-register` and `comment-census` → `tests/gates/` (§3.1). `canon-doc.mjs` is deleted (0 importers).
- **(c) long dirs.** `tests-visual/` (167 flat specs) breaks by subject; the file-name words already give the keys (§3.3). The 7 tooling files over 500 lines are decomposed, never re-headed.
- **(d) enforcement.** The same import-graph law as `src/`, applied to `scripts/`, `tests/`, `tests-visual/` and the root `vite.*.ts`. `scripts/import-dag.mjs` already resolves every specifier, and PORTFOLIO's `graph.mjs` covers these roots (`PORTFOLIO.md` header).

### 6.2 TypeScript servers on Hono (value.js `api/`, speedtest `server/`)

- **(a)** unit = a domain module `modules/<domain>/` with `routes`, `service`, `repository` and its zod `schema` beside it. value.js has landed this. speedtest's split, `validation/` (10) apart from `routes/` (9 + sub-dirs), is the kind-bucket version of the same code.
- **(b)** `platform/` is the "therein" dir for cross-module infrastructure: db, http, cache, migrations, logging. speedtest's `utils/` (6) and `middleware/` (10) would partition between `platform/` and the owning module.
- **(c)** 0 of speedtest's 95 server files exceed 300 lines, so the pressure here is placement, not length.
- **(d)** Tests follow whichever C2 ruling is made. Either value.js's colocated `__tests__/` plus a named conformance dir, or speedtest's mirrored `server/tests/`. Today the two same-stack servers disagree.

### 6.3 Python: FastAPI service (fourier `api/`) and data libraries (fourier `src/fourier_analysis`, sci-report `tools/atlas_data`)

- **(a)** unit = a package directory whose `__init__.py` is the barrel (H3). For the FastAPI service: `api/<domain>/{router.py, service.py, models.py}` for visualizations, sessions, gallery, admin, images, contours and equations. That replaces the role-layered `routers/ services/ models/`. `visualizations.py` (889) and `admin.py` (652) become package dirs.
- **(b)** A shared helper sits at the lowest package that covers its importers. `utils/`-style namespaces are restructure-backend Law 1's named god modules. sci-report carries 34 such paths (4,458 lines), and `svf/utils/nces_recovery/pipeline.py` is a pipeline filed under `utils`.
- **(c)** Directory-modules, not flat siblings (restructure-backend Law 2). `usac/consultant_anomaly/external` (16 files, four of them over 1,000 lines) is the first candidate.
- **(d)** Delete `api/slugs.py`; `sessions.py` imports `api.lib.crud.slugs` directly (C7). Move `api/services/__tests__` into whichever test home C2 picks. `__tests__` is Jest's convention; pytest discovers `test_*.py` by glob and has no such dir name ([pytest good practices](https://docs.pytest.org/en/stable/explanation/goodpractices.html)). The flat-vs-src question (C3) has to be settled once for both Python projects.

### 6.4 Cloudflare: Pages Functions (slides, speedtest, sci-report) and a Worker (speedtest-edge)

- **(a)** For Pages Functions the route file's location is fixed by the router: "Your `/functions` directory structure determines the designated routes" ([CF Pages routing](https://developers.cloudflare.com/pages/functions/routing/)). Colocation therefore cannot move route files by concern. It can only decide where their helpers go.
- **(b)** Cloudflare's own module example imports a helper from outside `functions/`: `import { greeting } from "../src/greeting.ts"` ([CF module support](https://developers.cloudflare.com/pages/functions/module-support/)). The befitting home for sci-report's two `fetchWithTimeout` and `toEnvelope` copies is one shared module beside `functions/`. slides' HMAC token contract, now written twice (edge `_middleware.ts` and `scripts/sign-deck.mjs`), becomes one module both import. That is P-3, one source of record.
- **(c)** A Worker is its own package, already the case for `workers/speedtest-edge` (`src/ tests/ wrangler.toml`). Its committed `tmp/edge-bundle/` (2,249 lines + map, 0 references) is build output and belongs to `.gitignore`.
- **(d)** No new mechanism. The same import-graph law applies, with `functions/` treated as a fixed-path leaf layer.

### 6.5 Rust (bbnf-lang)

- **(a)** unit = the crate, and inside it the directory module. bbnf uses `foo/mod.rs` 104 times out of 105. The reference allows both forms but "encouraged to use the new naming convention", `foo.rs` + `foo/` ([Rust reference, modules](https://doc.rust-lang.org/reference/items/modules.html)). For this edict `mod.rs` has one practical advantage: the module stays a single directory that moves as a unit, like `index.ts` and `__init__.py` (H3). This is a real choice (open question 9).
- **(b)** Colocated tests are the language's own idiom for unit tests (`#[cfg(test)] mod tests` in the same file). Integration tests go in `tests/` ([Cargo layout](https://doc.rust-lang.org/cargo/guide/project-layout.html): "Integration tests go in the `tests` directory"). So for Rust, "befitting" means following Cargo, whatever C2 rules for TS.
- **(c)** Generated code (`crates/core/src/grammar/generated/*.rs`, six files over 1,000 lines, up to 21,211) needs a generator-provenance exemption from any line floor. A per-file allowlist would be the wrong tool. Hand-written outliers (`skinny/crates/bbnf-bench/src/report.rs` 11,863; `xtask/src/regen_simple_runtime.rs` 4,575) do not qualify.
- **(d)** Two workspaces with two xtasks (root and `skinny/`) are a dual path at repo scale. The committed `server/bbnf-lsp` binary (7.6 MB) is build output.

---

## 7 · Bearing on the D1 families

Evidence only; this seat picks no winner.

- **D1-A (graph-derived home).** Every repo would benefit, and the tooling is the easiest place to start: §3.1's importer table is the LCA computation done by hand. No repo gates it today.
- **D1-B (sealed family modules).** keyframes `src/` (gated) and atlas `src/` (90% barrels, explicit entry map) are working instances. value.js `api/modules` is the backend instance.
- **D1-C (workspace packages).** Already used for backends in speedtest (3 members) and sci-report, and for tests in glass-ui (`tests-visual`). It is the literal "backend treatment" in 3 of the 4 repos with a server-shaped package.
- **D1-D (declared strata).** speedtest's `check-internal-boundaries.mjs` is a two-tier strata checker already in use (layers outside features, a direction stack inside them).
- **D1-E (unit manifests + generated wiring).** slides and sci-report `meta.ts` + glob, atlas's explicit entry map, and bbnf's `[workspace.metadata.bbnf] grammars` manifest feeding `cargo xtask regen`.
- **D1-F (lifecycle capsules).** No repo does this. The nearest thing is sci-report's per-slug `story/points/NN-name/`.

---

## 8 · Open questions for the owner

1. **Tests (C2).** Two prior runs of this edict ruled opposite ways: "Tests stay in their own dir" (keyframes, owner verbatim) against colocated `__tests__/` (value.js Q17, default with no objection). Does the keyframes wording bind glass-ui, and if so is value.js `api/` re-ruled? Rust keeps its inline unit tests in either case.
2. **Kind dirs (C1).** Is a `composables/` (or `utils/`) child of a module allowed, as the edict and glass-ui/atlas/sci-report have it, or banned, as keyframes' R5 has it? If allowed, R5 and the case-sensitive R2 need amending before keyframes' demo scope can go green.
3. **Skeletons (C6).** The edict lists skeletons. The precept rejects `.skeleton.vue`. The repos practise `<Name>Skeleton.vue` siblings, and no repo has a `skeleton/` dir. Which one becomes the rule? glass-ui §7 currently names a `skeleton/` dir that nothing uses.
4. **Precept amendments (C7).** restructure-frontend Law 4 (re-export barrels for byte-stable imports) and restructure-backend Law 7 (transitional import names) contradict the no-shim law. Are they struck before D1 cites the precepts?
5. **Line floor (C5).** 400 or 500? Does it cover tests, tooling, CSS and demo code, or only library source? How are generated files handled?
6. **Precepts drift (C11).** Five repos pin a precepts SHA from before the four prompts, and slides and atlas pin none. Should the prompts reach them before glass-ui's D1 becomes the reference the owner asked for?
7. **Demo registry (C12).** Does `demo/stories/manifest.ts` (1,098 lines) split into per-story `meta.ts` found by glob, as slides and sci-report do?
8. **Python layout (C3).** The precept says flat; pytest and PyPA recommend src; fourier is src and sci-report is flat. Does one ruling cover both?
9. **Rust modules.** `mod.rs` (bbnf today, directory-contained) or `foo.rs + foo/` (the reference's preference)?
10. **Cross-repo shared tooling (C10).** Should build plugins used by two repos (critical-css, custom-media) live in one exported place, e.g. atlas `./vite`, instead of being copied?
11. **Aliases (C9).** Is there one alias spelling across repos, and are kind aliases (`@components`, `@utils`, …) retired along with kind dirs?
