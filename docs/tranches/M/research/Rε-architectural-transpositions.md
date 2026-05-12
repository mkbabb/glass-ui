# M · Rε — Architectural Transpositions Across the Constellation

**Date**: 2026-05-12
**Baseline commit**: glass-ui HEAD on `o-w2_7-instrument-chassis` after L close (v1.0.0 pushed; `dist/glass-ui.js` 124K raw / 22.4K gz).
**Predecessor**: `docs/tranches/L/research/Rε-architectural-transpositions.md` (L-scoped — 9 architectural rows + 33 modularization rows + 18-entry v1.0 cohort).
**Lane**: ε — architectural transpositions across the constellation (5 of 6 parallel M-pre-research agents). The CENTERPIECE lane.
**Mode**: READ-ONLY everywhere outside this file. Read-only git only. NO mutating git anywhere. NO `git stash`.
**Scope expansion**: where L Rε surveyed only the glass-ui tree, M Rε surveys the **whole constellation** — every @mkbabb/* repo, every Vue consumer, every utility shared lib, every build-tooling repo.

---

## §0 — Scope + executive thesis

L closed v1.0 in glass-ui with the bundle "root-barrel curation + api/ discovery layer + subpath flatten + dts coherence" landing as one HEADLINE wave. The closed-clean tag is `v1.0.0`. The substrate-without-consumer invariant held; the SCC trap closed cross-repo (speedtest entry-chunk gz -32.5 KB byte-for-byte verified).

L's gestalt was **library-side**: it asked "how does glass-ui v1.0 cohere as a public surface?" and answered with the curated barrel + api/ subpath. The L cohort was substrate-aligned (everything ≤ v1.0 boundary).

M's gestalt MUST be **constellation-side**. The question is no longer "is glass-ui v1.0 coherent?" — that closed cleanly. The new question is "do the 14+ @mkbabb/* repos cohere as a constellation, or are they 14 independent semi-cohesive snowflakes?". M Rε's deliverable is the architectural-transposition catalogue across that wider boundary.

**Executive thesis**: the constellation has three structural debts visible at scale that no single repo can absorb on its own:

1. **The `cn` / `utils.ts` / `freshness-gate.mjs` / `vite.config.ts` clone graph** — at least 4 of 6 Vue consumers ship a copy-pasted `cn(...inputs) = twMerge(clsx(inputs))`; freshness-gate is cloned verbatim across glass-ui / keyframes.js / value.js with header-only divergence; tsconfig + vite.config patterns repeat with minor surface drift. There is no shared substrate. **Disposition: extract into `@mkbabb/dev-kit` (NEW build/lint/test substrate package) and `@mkbabb/std` (NEW pure-JS utility substrate). Lift the duplicated patterns; consumers depend on the new packages instead of copy-pasting.** This is the M HEADLINE candidate.

2. **The retired-subpath drift in two consumer trees** — words/frontend and fourier-analysis/web still import from `@mkbabb/glass-ui/pagination` and `@mkbabb/glass-ui/virtual`, which were retired in L.W3. These consumers will fail to resolve modules against any v1.0+ glass-ui that doesn't have the file: link pinned to a pre-L commit. Cross-tranche consumer-side surface drift; not glass-ui's bug (the subpaths were properly retired per substrate-without-consumer invariant), but a constellation-coordination failure (the breakage was not propagated). **Disposition: M.W2 cross-repo coordination wave — extend L's `coordination/speedtest-Y.md` pattern to fourier-analysis + words, document the drift, propose either (a) re-pin the consumers, (b) re-instate the subpaths under documented narrowing, or (c) migrate the consumers via codemod.**

3. **Tranche-format adoption is uneven** — speedtest (Y in flight) and bbnf-lang (BD recent) adhere to the canonical `docs/tranches/<LETTER>/` shape with FINAL.md / waves/ / research/ structure; words / keyframes.js / value.js / fourier-analysis use ad-hoc `docs/` directories or none at all. The precepts submodule is shared (5/6 Vue-bearing repos consume it via .gitmodules) but the tranche format isn't universally applied. **Disposition: M.W3 doc-format harmonization wave — propose a "minimum-viable tranche format" header for the consumer repos to adopt OR formally document that not every repo needs tranche-format (e.g. utility libs at version-bumped cadence don't need a tranche).**

The remaining §A–§H sections enumerate per-repo state, duplication inventory, library transpositions, consumer-side debts, build-tooling transpositions, namespace cohesion, the ranked HEADLINE candidates, and the anti-patterns.

---

## §A — Per-repo state survey

The constellation has 14 candidate repos; 11 are in scope (3 retired/python-only excluded). Per-repo state at HEAD (read-only `cat package.json` + filesystem walk; no build executed for this audit per read-only mandate).

| # | Repo | Stack | Build tool | Pkg mgr | glass-ui pin | Vue | reka-ui | vueuse | tw | Tranche docs? | Last tranche | precepts submodule | LOC (src/) | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **glass-ui** | Vue lib | vite 7 | npm | self (v1.0.0) | 3.5.18 | 2.0 | 14.2 | 4.1 | YES `docs/tranches/M/` (this) | L (closed) | YES | 22,798 | The substrate; v1.0.0 tag pushed 2026-05-11 |
| 2 | **speedtest** | Vue app | vite 5 | npm | `file:../glass-ui` | 3.5.11 | 2.9 | 14.0 | 4.2 | YES `docs/tranches/{G..Y}` | Y (in flight) | YES | 22,034 | Major glass-ui consumer; canonical SCC test bed; Pinia 3.0; vue-router 4.6 |
| 3 | **keyframes.js** | TS lib (Vue demo only) | vite 7 | npm | `file:../glass-ui` (devDep) | 3.5.18 | 2.0 | 14.2 | 4.1 | NO `docs/tranches/` | n/a (`scroll-morph.md` flat doc) | YES | 4,074 | `@mkbabb/keyframes.js` v2.0.0 published; depends on `@mkbabb/value.js`; consumed by 9 sites across constellation |
| 4 | **value.js** | TS lib (Vue demo only) | vite 7 | npm | `file:../glass-ui` (devDep) | 3.5.18 | 2.0 | 14.2 | 4.1 | NO `docs/tranches/` | n/a (`docs/colors/` notes) | YES | 10,052 | `@mkbabb/value.js` v0.5.1 published; CSS unit / color math; consumed by keyframes.js + bbnf-lang playground |
| 5 | **fourier-analysis/web** | Vue app | vite 7 | npm | `file:../../glass-ui` | 3.5 | 2.0 | 14.0 | 4.1 | NO `docs/tranches/` (top-repo has Python `docs/`) | n/a | (parent repo) NO precepts submodule visible | 18,606 | Vue consumer; uses retired `/pagination` subpath (P0 finding §D) |
| 6 | **words/frontend** | Vue app | vite 7 | npm | `file:./glass-ui` (workspace symlink) | 3.5.29 | 2.8 | 14.2 | 4.2 (via @tailwindcss/vite) | NO `docs/tranches/` (top-repo has `docs/` flat) | n/a | YES (top-repo) | 51,433 | Largest consumer; uses retired `/virtual` subpath (P0 finding §D); ALSO uses sonner directly (not glass-ui Toaster pattern); imports `@clerk/vue`, latex-paper, axios |
| 7 | **bbnf-lang/playground** | Vue app | vite 6 | npm (workspace) | `file:../../glass-ui` | 3.5.0 | 2.0 | 13.0 (older) | 4.1 | (parent has) `docs/tranches/{AA..BD}` 50+ tranches | BD (closed) | YES | 9,729 | Older `@vueuse/core ^13.0` mismatch with glass-ui's `^14.0` peer; monaco-editor consumer |
| 8 | **parse-that** (typescript/) | TS lib (parser combinators) | vite | npm | none | n/a | n/a | n/a | n/a | NO | n/a | NO precepts visible | ~4-6k est | `@mkbabb/parse-that` v0.8.2; published npm; underlies bbnf-lang's grammar UI |
| 9 | **vite-plugin-shebang** | TS lib (build tool) | tsc | npm | none | n/a | n/a | n/a | n/a | NO | n/a | NO | ~40 (single file) | `vite-plugin-shebang` v0.1.6; node-only; 1 file; usage NOT verified across constellation (zero grep hits in glass-ui / speedtest / keyframes / words / fourier-analysis vite configs) |
| 10 | **mkb-utils** | Python lib | poetry | poetry | n/a | n/a | n/a | n/a | n/a | NO | n/a | NO | small | Python-only; SQLAlchemy 1.3 + PyMySQL; **NOT a JS/Vue consumer** — out of M JS scope |
| 11 | **mathanim** | TS (legacy) | tsc 4.1 | npm | none | n/a | n/a | n/a | n/a | NO | n/a | NO | small | Stale: TS 4.1, no @mkbabb deps except `mkbabb/animation` github tarball; **likely abandoned** — consider M-tranche disposition (archive/retire/refresh) |
| 12 | **precepts** (submodule) | docs only | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | self | n/a | Shared submodule; sources 5+ consumer repos via `.gitmodules`; L W0 added 5 LESSONS-LEARNED + 3 SPEC; push deferred per coordination/speedtest-Y.md §8 (origin diverged 15 commits — reconciliation routed to M.W0) |
| 13 | **fourier-animate** | Python only | poetry | poetry | n/a | n/a | n/a | n/a | n/a | NO | n/a | NO | small | Python-only manim animations; **NOT a Vue consumer** — out of M JS scope |
| 14 | **bbnf-lang** (top repo, Rust) | Rust + Vue (playground) | cargo + vite | npm (workspace) | (playground) `file:../../glass-ui` | (playground) 3.5 | (playground) 2.0 | (playground) 13.0 | (playground) 4.1 | YES `docs/tranches/{AA..BD}` 50+ | BD (closed) | YES | Rust core + Vue playground | The tranche-format ORIGIN repo (per CLAUDE.md `feedback_tranche_format` row); deepest tranche-history of any constellation repo |

**Per-repo state count**: 14 candidate repos · 9 Vue-bearing (glass-ui + 8 consumers/lib) · 2 Python-only (out of M JS scope) · 1 submodule (precepts) · 2 utility/legacy (vite-plugin-shebang + mathanim). The Vue-bearing constellation core is 9 repos; the JS-bearing core is 11.

**Peer-dep coherence observation**: of the 7 Vue-active repos (glass-ui + speedtest + keyframes.js + value.js + fourier-analysis/web + words/frontend + bbnf-lang/playground), peer-dep alignment to glass-ui v1.0.0's stack (Vue 3.5 + reka-ui 2.0 + vueuse 14.0 + Tailwind 4.0) is **5/7 coherent** with 2 drift cases:

- **speedtest**: vite 5 (glass-ui ships vite 7) — likely a deliberate stability pin per X.W3 perf cohort; not a runtime concern.
- **bbnf-lang/playground**: `@vueuse/core ^13.0` (glass-ui peer-dep says `^14.0`). MINOR drift; not a runtime failure with semver-loose acceptance but a real peer-dep complaint.

---

## §B — Cross-cutting duplication inventory

For each candidate cross-cutting concern, audit duplication across the constellation. Disposition column uses 4 verbs:

- **CARVE-OUT**: extract into a NEW shared package.
- **ELEVATE**: promote glass-ui's impl to canonical; consumers consume via subpath.
- **DOCUMENT-AS-DIFFERENT**: keep separate with explicit rationale.
- **RETIRE**: one or both can be deleted.

| # | Concern | glass-ui has | speedtest has | keyframes.js has | value.js has | fourier-analysis/web has | words/frontend has | bbnf-lang/playground has | Verdict | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|
| **B.1** | `cn(...inputs)` clsx + tailwind-merge wrapper | YES `src/utils/cn.ts` (clsx + hand-rolled dedup, replaces tailwind-merge v0.9.2) | imports from `@mkbabb/glass-ui` | YES `demo/@/utils/utils.ts` (clsx + twMerge) | YES `demo/@/utils/utils.ts` (clsx + twMerge) | NO (uses glass-ui directly?) — VERIFY | NO direct duplicate found — uses glass-ui's `cn` | YES `src/lib/utils.ts` (clsx + twMerge) | 4× clone (glass-ui canonical + keyframes-demo + value-demo + bbnf-playground); 1× consumer-side `import { cn } from '@mkbabb/glass-ui'` (speedtest, words) | **ELEVATE** — glass-ui's `src/utils/cn.ts` IS canonical (and the only version that ships the hand-rolled deduplicator, dropping tailwind-merge entirely per v0.9.2). The 3 demo-clone sites should consume glass-ui's `cn` via `import { cn } from "@mkbabb/glass-ui"`. The bbnf-playground site is already a glass-ui consumer; trivial swap. Demo-side clones in keyframes.js + value.js are inside `demo/@/utils/utils.ts` which is shadcn-vue scaffolding — minor cost, but worth folding. Saves ~10 LOC × 4 sites + drops `tailwind-merge` peer requirement from 4 sites. |
| **B.2** | `useDark` / dark-mode pattern | YES `src/composables/dark/useGlobalDark.ts` — `createGlobalState(useDark)` + Safari FOUC fix | imports `useGlobalDark` from `@mkbabb/glass-ui/dark` | (demo only) | (demo only) | imports `useGlobalDark` from `@mkbabb/glass-ui` | imports `useGlobalDark` from `@mkbabb/glass-ui` (App.vue + useStateSync.ts) | (consumer of `DarkModeToggle` from `/controls`) | 1× canonical (glass-ui) + 0 parallels confirmed | **ELEVATE** — already canonical. No action. |
| **B.3** | `useLocalStorage` / typed storage | NO direct (uses vueuse's `useStorage` indirectly) | YES `src/composables/useTypedStorage.ts` — custom `typedStorage` object (NOT vueuse) | (uses vueuse where needed) | (n/a) | YES `src/composables/useSafeStorage.ts` — likely SSR-safe wrapper | (uses vueuse where needed) | (likely uses vueuse) | 2× custom (speedtest + fourier) + vueuse elsewhere | **CARVE-OUT** OR **DOCUMENT-AS-DIFFERENT** — speedtest's `typedStorage` is a JSON-serialized prefix-aware abstraction (clearPrefix support); fourier's `useSafeStorage` is SSR-safety-focused. If their semantics differ enough, keep separate. If both are "JSON-serialized vueuse useStorage wrapper", carve into `@mkbabb/std/storage`. NEEDS-DEEP-READ before disposition; tentative DOCUMENT-AS-DIFFERENT. |
| **B.4** | CSS token system / design tokens | YES `src/styles/{tokens,theme,glass,...}.css` 16 files via `src/styles/index.css` | imports `@mkbabb/glass-ui/styles` | (demo imports) | (demo imports) | imports glass-ui/styles (assumed) | imports glass-ui/styles (assumed) | imports glass-ui/styles | 1× canonical (glass-ui) + 0 parallels at consumer side | **ELEVATE** — already canonical. No action. |
| **B.5** | Animation / motion primitives (NumericAnimation, SmoothProgress, Animation) | imports from `@mkbabb/keyframes.js` (2 sites: `useAnimatedNumber`, `useSpringOrchestrator`) | imports `NumericAnimation, SmoothProgress` from `@mkbabb/keyframes.js` (1 site: `useMeterRenderer`) | self (canonical) | (n/a for animation; provides value-units to keyframes) | imports `Animation` from `@mkbabb/keyframes.js` (2 sites: `useFourierMorph`, `stores/animation`) | imports `CSSKeyframesAnimation` from `@mkbabb/keyframes.js` (2 sites: `utils/animations`, `icons/FancyF`) | imports `ScrollTimeline` from `@mkbabb/keyframes.js` (1 site: `useScrollMorph`) | 1× canonical (keyframes.js) + 9 consumer sites across 5 repos | **ELEVATE** — already canonical. No action. Note: keyframes.js itself depends on value.js — the substrate stack `value → keyframes → glass-ui` is the canonical animation flow. |
| **B.6** | Spring orchestration | YES `src/composables/motion/useSpringOrchestrator.ts` (262 LOC) | imports from glass-ui (consumer-side) | (n/a) | (n/a) | (verify) | (verify) | (n/a) | 1× canonical | **ELEVATE** — already canonical. No action. |
| **B.7** | Carousel primitives | YES — `src/components/ui/carousel/` (reka-ui embla wrapper) + `src/components/custom/glass-carousel/` (custom-styled) + `@mkbabb/glass-ui/carousel` subpath (NEW v1.0) | (no direct use found) | (n/a) | (n/a) | (verify) | (imports `embla-carousel-vue` directly in package.json top-level — NOT via glass-ui's /carousel subpath; possible drift) | (n/a) | 1× canonical (glass-ui) + 1 possible drift (words/frontend pulls embla directly) | **VERIFY** — if words/frontend wants direct embla control, its direct dep is fine (workspace-level fallback). If it could use glass-ui's `/carousel` subpath, ELEVATE. Tentative DOCUMENT-AS-DIFFERENT pending words/frontend's actual carousel usage audit. |
| **B.8** | Slider primitive | YES `src/components/ui/slider/` (reka-ui wrapper; K W7 keepDockOpen contract) | imports from glass-ui | (n/a) | (n/a) | (verify) | (verify) | (n/a) | 1× canonical | **ELEVATE** — no action. |
| **B.9** | Build config — vite.config.ts shape | YES (library mode w/ dts, freshness-gate prebuild) | YES (app mode, PWA, VueMacros, proxy) | YES (library mode w/ dts, deferLazyCSSPlugin) | YES (library mode w/ dts, source-export, Markdown) | YES (app mode, latex-paper plugin) | YES (app mode, autoprefixer + tailwindcss/vite, complex aliases) | YES (app mode, spaFallback plugin) | 7× independent; minimal shared structure | **CARVE-OUT** (selective) — extract shared `vite.library.preset.ts` and `vite.consumer.preset.ts` into `@mkbabb/dev-kit/vite` substrate package. Library preset bundles: dts(rollupTypes) + tailwindcss + vue + freshness-gate. Consumer preset bundles: vue + tailwindcss + sensible PWA defaults. Consumers `import { libraryPreset } from "@mkbabb/dev-kit/vite"` and compose. Saves ~30 LOC per consumer vite.config.ts. |
| **B.10** | tsconfig.json shape | YES (`target: ES2022`, `strict: true`, `verbatimModuleSyntax: true`, `moduleResolution: bundler`) | drift: `strict: false`, `experimentalDecorators: true`, target ESNext | aligned (matches glass-ui exactly + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`) | aligned (matches keyframes.js exactly) | (verify) | (verify) | (verify) | 3× aligned (glass-ui, keyframes, value) + 1× drift (speedtest) + 3× unknown | **CARVE-OUT** — publish `@mkbabb/dev-kit/tsconfig/{lib,app}.json` (canonical inherited tsconfigs). Consumer `"extends": "@mkbabb/dev-kit/tsconfig/lib.json"` removes ~20 LOC per consumer. Speedtest's `strict: false` is the lone non-conformist; a M-tranche speedtest-side disposition could either tighten or document the divergence. |
| **B.11** | ESLint / Prettier config | (none committed at glass-ui? — VERIFY) | (none committed? — VERIFY) | (none) | (none) | (verify) | (verify) | (verify) | Likely no shared lint config | **DOCUMENT-AS-DIFFERENT** — if no shared lint, propose `@mkbabb/dev-kit/eslint.config.js` as additive substrate. Low priority. |
| **B.12** | Test setup (vitest) | YES (root vitest; `happy-dom`; `@vue/test-utils`) | YES (vitest 4.1) | YES (vitest 3.2 + bench) | YES (vitest 3.2) | (vitest? — VERIFY) | YES (vitest mentioned) | YES (playwright e2e) | 5×+ scattered vitest configs | **CARVE-OUT** (selective) — `@mkbabb/dev-kit/vitest.lib.ts` preset (jsdom or happy-dom + @vue/test-utils + tsconfig paths). Marginal value; modest LOC savings; LOW priority. |
| **B.13** | `scripts/release.sh` pattern | YES (97 LOC; subpath-resolve probe; npm publish + git tag) | NO release.sh (consumers don't publish to npm); has `scripts/deploy.sh` for app deploy | NO | NO | NO | NO (app) | NO (app) | 1× canonical (glass-ui); 0 consumers (npm-publish-shaped) | **DOCUMENT-AS-DIFFERENT** — glass-ui + keyframes.js + value.js + parse-that all publish to npm; only glass-ui has the canonical release script. **CARVE-OUT recommendation**: lift `scripts/release.sh` into `@mkbabb/dev-kit/release` (or a standalone `mkbabb-release` CLI); have keyframes.js + value.js + parse-that consume it. Marginal LOC win; structural cohesion win across the npm-publishing subset of the constellation. |
| **B.14** | `scripts/freshness-gate.mjs` | YES (canonical, with `--pre` permissive mode + `assertDistFresh` export via `src/freshness.ts`) | NO (apps don't ship dist/) | YES (cloned from glass-ui; header-only divergence) | YES (cloned from glass-ui; header-only divergence) | NO | NO | NO | 3× clones (verified diff = comments only) | **ELEVATE** — promote glass-ui's `src/freshness.ts` export to be the substrate; OR carve into `@mkbabb/dev-kit/freshness`. keyframes.js + value.js already import from each other's pattern. Recommendation: lift the `freshness-gate.mjs` body into `@mkbabb/dev-kit/scripts/freshness-gate.mjs` (publish as CLI binary) + keep glass-ui's `src/freshness.ts` runtime export as the consumer-side API. Saves 1 file × 3 clone sites. |
| **B.15** | `scripts/profile-bundle.mjs` (bundle-budget gate) | YES (glass-ui-specific budget thresholds) | NO (apps could use one but don't) | NO | NO | NO | NO | NO | 1× | **DOCUMENT-AS-DIFFERENT** — glass-ui-specific; not portable as-is. Lifting to `@mkbabb/dev-kit/bundle-budget` is feasible but the threshold table is repo-specific. LOW priority. |
| **B.16** | Tranche format `docs/tranches/<LETTER>/` adoption | YES (V/L/M etc.) | YES (G-Y) | NO (`scroll-morph.md` flat) | NO (`docs/colors/` notes) | NO (Python `docs/` only) | NO (flat `docs/` only) | YES (AA-BD; 50+ tranches) | 3/7 Vue-active repos | **DOCUMENT-AS-DIFFERENT** — utility libs (keyframes.js, value.js, parse-that) don't need full tranche format; their cadence is npm-publish per significant feature. Apps and design-system substrates (glass-ui, speedtest, bbnf-lang, words, fourier-analysis) benefit from tranche format. Propose M.W3 doc: "Tranche format applicability matrix" in precepts; libs use CHANGELOG-only cadence, apps use full tranche format. |
| **B.17** | CHANGELOG.md convention | YES (`v1.0.0 — date — wave-headline` shape; 600+ LOC) | YES (X close noted) | NO CHANGELOG.md at HEAD | NO CHANGELOG.md at HEAD | NO | NO | (verify bbnf-lang top) | 2× (glass-ui + speedtest) + 5× absent | **ELEVATE** — adopt glass-ui's CHANGELOG.md convention across all npm-published @mkbabb/* libs (keyframes.js, value.js, parse-that). Pure-additive substrate hygiene. |
| **B.18** | MIGRATION.md convention | YES (430 LOC, v1.0 cohort) | NO | NO | NO | NO | NO | NO | 1× | **ELEVATE** — adopt for any future breaking-change cohort across @mkbabb/* libs. Currently relevant only to glass-ui's v1.0; keyframes.js v2.0 would have needed one but predates the convention. |
| **B.19** | `@mkbabb/*` namespace coordination doc | NO formal doc | (no) | (no) | (no) | (no) | (no) | (no) | 0× | **CARVE-OUT** — write a `docs/precepts/CONSTELLATION.md` in the precepts submodule that documents the cross-package dep graph, versioning policy, and which repos are upstream of which. M.W3 candidate. |
| **B.20** | Cross-repo build proof / consumer-link verification | YES (glass-ui's `scripts/proof-consumers-build.sh`, `proof-consumers-static.mjs`, `validate-consumers.sh`) | (n/a — app) | NO | NO | NO | NO | NO | 1× | **ELEVATE** (with extension) — glass-ui's consumer-link proof is unique. **Promote to `@mkbabb/dev-kit/scripts/proof-consumers`** with consumer-list configured per repo. Useful for keyframes.js + value.js when they break consumers. M.W2 candidate. |
| **B.21** | reka-ui peer-dep version | `^2.0` | `^2.9.2` | `^2.0.0` | `^2.0.0` | `^2.0` | `^2.8.2` | `^2.0.0` | spread `2.0 .. 2.9` | **DOCUMENT-AS-DIFFERENT** — semver-loose range coheres at install time. No action unless reka-ui ships breaking 2.x→2.x. |
| **B.22** | @vueuse/core peer-dep version | `^14.0` | `^14.0.0` | `^14.2.1` | `^14.2.1` | `^14.0` | `^14.2.1` | `^13.0.0` | 5/6 on 14.x + bbnf-playground on 13.x | **ELEVATE** — bbnf-lang/playground bump from `^13.0` to `^14.0` is M.W2 cross-repo coordination (single bbnf-side line change). |
| **B.23** | tailwindcss peer-dep version | `^4.0` | `^4.2.2` | `^4.1.11` | `^4.1.11` | `^4.1` | `^4.2.1` (via @tailwindcss/vite) | `^4.1.0` | All on 4.x; minor patch drift | **DOCUMENT-AS-DIFFERENT** — coheres. No action. |
| **B.24** | `cn` import dedup deduplicator (clsx vs tailwind-merge) | clsx + hand-rolled dedup (v0.9.2 drop of tailwind-merge) | (consumer of glass-ui's cn) | clsx + twMerge (older) | clsx + twMerge (older) | (verify) | (verify) | clsx + twMerge | glass-ui canonical drops twMerge; 3+ demo clones still on twMerge | **ELEVATE** — same row as B.1. Folds. |
| **B.25** | Aurora / metaballs WebGL primitives | YES (aurora 2,054 LOC incl. 799 LOC frag shader; metaballs separate) | imports aurora from glass-ui (App.vue) | (n/a) | (n/a) | (verify) | (verify; words doesn't seem to use aurora) | (n/a) | 1× canonical + 1 confirmed consumer | **DOCUMENT-AS-DIFFERENT** — single-consumer at HEAD; cross-repo audit at M.W3 should verify it's not consumer-orphaned. Per L's "5 documented narrowing entries", `cloneMode: "per-preset"` is single-consumer (aurora). No action unless β-style re-audit finds drift. |

**Duplication-inventory size**: 25 rows. Disposition distribution: **CARVE-OUT**: 6 rows (B.3, B.9, B.10, B.11, B.12, B.19); **ELEVATE**: 11 rows (B.1, B.2, B.4, B.5, B.6, B.8, B.14, B.17, B.18, B.20, B.22); **DOCUMENT-AS-DIFFERENT**: 7 rows (B.7, B.13, B.15, B.16, B.21, B.23, B.25); **RETIRE**: 0 rows (no constellation-wide retirements without consumer impact). **VERIFY-DEEP-READ**: 1 row (B.24 folds into B.1).

**HEADLINE inference**: 6× CARVE-OUT rows cluster around two NEW packages:
- `@mkbabb/dev-kit` absorbs: vite presets (B.9), tsconfig presets (B.10), eslint config (B.11), vitest preset (B.12), release script (B.13), bundle-budget (B.15), freshness-gate (B.14), consumer-build proof (B.20).
- `@mkbabb/std` absorbs: typed storage (B.3) IF the speedtest+fourier patterns converge.
- `docs/precepts/CONSTELLATION.md` absorbs: namespace coordination (B.19).

---

## §C — glass-ui v1.0 → v1.x candidate transpositions

L closed v1.0 with 38 public subpaths + the `api/` discovery layer + curated root barrel. Post-v1.0 surface smells from consumer-side reading + L-residuals:

| # | Candidate | Source | Disposition | M attribution |
|---|---|---|---|---|
| **C.1** | `useConfiguratorState<T>` cloneMode ergonomics | L.W7 closed Option-A (`cloneMode: 'per-preset'` + `cyclePreset` + `toRaw` clone hardening). Aurora is 1st consumer. Per L-residuals "5 documented narrowing": cloneMode has 1 consumer. | β re-evaluation at M close (likely WAIT-FOR-SECOND-CONSUMER); not v1.x transposition material yet | DEFER to M close-time β audit |
| **C.2** | `src/api/` 32-symbol surface — GlassPanelVariant promotion | Per L-residuals P3: `GlassPanelVariant` not re-exported from `src/api/index.ts`. Pure-additive 1-line fix. | **PROMOTE** to `src/api/` index | M.W1 (additive housekeeping) |
| **C.3** | `src/forms.ts` Textarea duplicate verify | Per L-residuals P3: re-exported via `./components/ui/textarea` AND possibly via `./components/ui/combobox/Combobox.vue` indirect; may be stale comment. | **VERIFY-READ** at M open; if duplicate, dedupe. | M.W1 housekeeping |
| **C.4** | Composables sub-trees post-W2 cohesion | L.W2 restructured into 8 sub-trees (`dark/`, `keyboard/`, `reactive/`, `dom/`, `motion/`, `glass/`, `sortable/`, `sidebar/`). 0 flat-top-level composable files. Per L-residuals G4: `motion/index.ts` cosmetic barrel-style. | **G4 fix** at M.W1 (cosmetic) | M.W1 |
| **C.5** | Dock substrate — slot count / composition cleanliness | `<GlassDock>` ships 2-layer default (default + `collapsed` slot) + `<DockLayerGroup>` + `<DockLayer>` for richer cases. Per CLAUDE.md, fourier-analysis web uses `DockPopover, DockIconButton, GlassDock, DockLayerGroup`. Words uses `/dock`. Consumer-side composition looks healthy. | **DOCUMENT-AS-DIFFERENT** — no action; dock chassis canonical at HEAD | n/a |
| **C.6** | Aurora substrate — separate subpath / size | Aurora module is 2,054 LOC incl. 799 LOC frag shader (raw embedded GLSL). `@mkbabb/glass-ui/aurora` subpath isolates it from root barrel. Tree-shaking already handles consumer-side non-use. | **DOCUMENT-AS-DIFFERENT** — separate subpath already; further extraction (e.g. `@mkbabb/aurora` standalone npm package) would orphan consumers. NO action. | n/a |
| **C.7** | Metaballs substrate — same | `@mkbabb/glass-ui/metaballs` subpath; analogous to aurora. WebGL composite. | **DOCUMENT-AS-DIFFERENT** — no action. | n/a |
| **C.8** | Toast / Notification usability — fourier-analysis wraps it | fourier-analysis/web has `composables/useToast.ts` that wraps glass-ui's `toast` + `useToast` + `ToastVariant` with a domain-flavored `ToastType` enum (`"error" | "info" | "success"` → `ToastVariant` mapping). 1 wrapper site. | **OBSERVE** — fourier's wrapper is reasonable consumer-side glue; not a glass-ui API smell. NO action. | n/a |
| **C.9** | Sidebar — types cross-cut between component/composable | L.W2 hoisted sidebar types into `composables/sidebar/types.ts`. Resolved. | (resolved at L) | n/a |
| **C.10** | Glass-renderer (`src/composables/glass/`) — internal-only? | `useGlassRenderer` + WebGL/WebGPU shader assets. Not on root barrel; `src/index.ts` doesn't reach it; not on a subpath either. Internal substrate. | **CONFIRM-OR-PROMOTE** — verify at M open: if any consumer references it, decide promote vs internal. Read-only audit owed. | M.W1 audit |
| **C.11** | `useStoryDemo` — demo-private check | L.W2 evaluation: was at `src/composables/useStoryDemo.ts`. Decision: kept public OR moved to demo-private. Read-only verification at HEAD. | **VERIFY** — confirm L disposition landed | M.W0 audit |
| **C.12** | Configurator recursion at /motion/metaballs under Lighthouse (F-ε-3 residual) | L-residuals: `toRaw` clone hardening absorbed aurora `cyclePreset` `DataCloneError`. Metaballs render path NOT touched. Best-practices=96 (1 audit failing). Lighthouse-only repro; Playwright-clean. | **INVESTIGATE** — methodical reproduction harness needed; route to M for further investigation | M.W4 substrate |
| **C.13** | `@mkbabb/glass-ui/pagination` + `/virtual` retired subpath drift | L.W3 retired the 2 subpaths. fourier-analysis/web still imports `/pagination` (2 sites); words/frontend still imports `/virtual` (3 sites). **5 broken-link consumer sites at HEAD against v1.0.0.** | **P0 — CROSS-REPO COORDINATION** — fix BEFORE M progresses. Options: (a) re-instate the subpaths under documented narrowing (would re-introduce substrate-without-consumer if no second consumer; but speedtest's useMeterRenderer doesn't use them); (b) migrate the 5 consumer sites via codemod / direct edit (preferred — clean break per `feedback_no_backwards_compat`); (c) speedtest-style coordination doc with named cross-repo PRs. | **M.W0 HARD GATE** |
| **C.14** | `@mkbabb/glass-ui/api` discovery — 0 direct importers since L close | Per L-residuals "5 documented narrowing": `src/api/` aggregator has 0 direct importers at HEAD. Pure-additive substrate. | **OBSERVE** — wait for second-consumer attestation. NO retire-pressure at M; β audit at close. | DEFER to M close β |
| **C.15** | `cloneMode: "per-preset"` 1-consumer narrowing | Same as C.1; aurora is sole consumer. | **OBSERVE** — wait for second-consumer | DEFER to M close β |

**v1.0 → v1.x transposition count**: 15 rows. **M-bound**: 5 rows (C.2, C.3, C.4 G4, C.10 audit, C.11 audit) actionable at M.W1 + C.13 as M.W0 hard gate + C.12 as M.W4 substrate investigation. **DEFER-to-close-β**: 3 rows (C.1, C.14, C.15 — all single-consumer narrowing entries awaiting second-consumer attestation). **NO action**: 5 rows.

---

## §D — Consumer-side architectural debt

For each Vue consumer (speedtest, words/frontend, fourier-analysis/web, bbnf-lang/playground), audit consumer-side architectural debt:

### D.1 — speedtest

| Question | State | Recommendation |
|---|---|---|
| `src/api/` discovery layer? | YES — `src/api/{admin,client,dashboard,health,identity,index,ip,sessions,surveys,sync,types}.ts` (12 files). Inspired by glass-ui's L.W1 Lane B pattern but predates it (speedtest's `src/api/` is for backend client modules, not type discovery). | KEEP-AS-IS — different semantic (backend API client modules vs library type-discovery). |
| Subpath imports consistent? | YES — 14 distinct `@mkbabb/glass-ui/*` subpath imports + 1 root-barrel import. Most-modular consumer in the constellation. | NO ACTION. |
| Coherent composables tree shape? | YES — 8 composable files at flat `src/composables/` (no sub-trees yet); plus per-domain sub-composables under `src/components/speedtest/composables/` (canonical chassis-bound pattern). | OBSERVE — if speedtest grows past ~15 composables, consider sub-tree restructure per glass-ui L.W2 pattern. |
| Cross-cutting duplication with siblings? | YES — `useTypedStorage` (B.3) parallel; `scripts/freshness-gate.mjs` clone not present (apps don't ship dist/) | M.W2 — evaluate `useTypedStorage` carve-out vs document-as-different. |
| Other debt | tsconfig drift (`strict: false`) per B.10. | M.W2 — tighten OR document. |

### D.2 — words/frontend

| Question | State | Recommendation |
|---|---|---|
| `src/api/` discovery layer? | YES — `src/api/{ai/,audio,core,definitions,entries,examples,health,index,lookup,media,providers,search,sse/,suggestions,users,versions,wordlists}.ts` (16+ files). Backend client API — same semantic as speedtest. | KEEP-AS-IS. |
| Subpath imports consistent? | YES — 9 distinct `@mkbabb/glass-ui/*` subpath imports + 1 root-barrel. **TWO retired-subpath imports** (`@mkbabb/glass-ui/virtual` × 3 sites). | **P0 — M.W0** fix consumer or re-instate subpath (see C.13). |
| Coherent composables tree shape? | PARTIAL — 10 composables at `src/composables/` (flat) + 1 nested sub-tree (`ios/`, `virtual/`). | OBSERVE — sub-tree maturity is healthy; flat could be split into `auth/`, `pwa/`, `lookup/`, `texture/` at ~15+ count. |
| Cross-cutting duplication with siblings? | YES — uses `sonner` directly + `vue-sonner` (NOT glass-ui's Toaster — words has its own toast layer despite glass-ui's Toaster pattern). Possible drift OR deliberate. | **VERIFY-READ** at M.W2; if deliberate, document; if drift, propose canonicalization. |
| Other debt | latex-paper consumed via local file path (workspace symlink); @clerk/vue auth substrate. Both consumer-specific. | NO ACTION. |

### D.3 — fourier-analysis/web

| Question | State | Recommendation |
|---|---|---|
| `src/api/` discovery layer? | NO — uses `src/lib/api.ts` flat file (1 file). | LOW priority — extract to `src/api/` directory only if it grows beyond 3 files. |
| Subpath imports consistent? | YES — 5 distinct subpath imports + 1 root-barrel. **ONE retired-subpath import** (`@mkbabb/glass-ui/pagination` × 2 sites). | **P0 — M.W0** fix consumer or re-instate subpath (see C.13). |
| Coherent composables tree shape? | YES — 4 composables at flat `src/composables/` (small surface). | NO ACTION. |
| Cross-cutting duplication with siblings? | YES — wraps glass-ui's toast (C.8); custom `useSafeStorage` (B.3). | NO ACTION (both are deliberate consumer-side wrappers). |
| Other debt | `@mkbabb/latex-paper` consumer; `@mkbabb/pencil-boil` consumer (separate ecosystem — NOT in this audit's scope). | NO ACTION. |

### D.4 — bbnf-lang/playground

| Question | State | Recommendation |
|---|---|---|
| `src/api/` discovery layer? | NO — playground is a Monaco-editor-driven UI, not a backend client. | NO ACTION. |
| Subpath imports consistent? | YES — 4 distinct subpath imports + 1 root-barrel. ZERO retired-subpath imports. | NO ACTION. |
| Coherent composables tree shape? | (verify) | (verify at M.W0 audit) |
| Cross-cutting duplication with siblings? | YES — `src/lib/utils.ts` clones the `cn` pattern (B.1); imports `monaco-editor` + `monaco-themes` directly. | M.W2 — fold `src/lib/utils.ts` to import from `@mkbabb/glass-ui`. |
| Other debt | `@vueuse/core ^13.0` peer-dep mismatch with glass-ui's `^14.0` (B.22). | M.W2 — bump to `^14.0`. |

**Consumer-side debt count**: 4 consumer repos audited; **2 P0** (words + fourier — retired-subpath drift; both bound to M.W0 hard gate); **3 carve-out candidates** (useTypedStorage / useSafeStorage / cn-clone); **3 OBSERVE** (composable tree maturity); **2 DOCUMENT-AS-DIFFERENT** (sonner-direct, latex-paper, pencil-boil — consumer-specific ecosystems).

---

## §E — Build tooling transpositions

### E.1 — `vite-plugin-shebang`

- **What does it do**: prepends `#!/usr/bin/env node` to bin output files in vite library mode, reading `bin` from `package.json`.
- **Is it actively maintained**: package.json says v0.1.6; tsconfig pins TS 5.2; `vite ^4.5.0` in dev deps. **STALE** — vite 4.x while constellation runs vite 6/7.
- **Consumed across constellation**: ZERO grep hits in glass-ui, speedtest, keyframes.js, value.js, words, fourier-analysis, bbnf-lang. **No active consumer in the @mkbabb/* JS constellation.**
- **Verdict**: **RETIRE-OR-REFRESH** — either (a) refresh to vite 7 + TS 5.8 if there's a planned future CLI in the constellation (e.g. a `mkbabb-release` CLI that needs a shebang); (b) formally retire / archive the repo. Pure-additive recommendation; no consumer impact.

### E.2 — Release scripts

- **glass-ui's `scripts/release.sh`**: 97 LOC; runs build + test + npm publish + git tag + subpath-resolve probe. Canonical.
- **Consumers**: keyframes.js + value.js + parse-that all publish to npm; none have a parallel release script. They likely `npm publish` manually.
- **Verdict**: **CARVE-OUT** — extract `scripts/release.sh` body into `@mkbabb/dev-kit/release.sh` (CLI binary OR copy-installable). Consumer repos add a 1-line `"release": "bash node_modules/@mkbabb/dev-kit/release.sh"` script. Subpath-resolve probe is glass-ui-specific (probes 38 subpaths); extract that to a config file so consumers can supply their own subpath list. M.W2 candidate.

### E.3 — Freshness gate

- **glass-ui's `scripts/freshness-gate.mjs`**: walks `src/` for newest mtime; compares to `dist` artefacts; emits warning in `--pre` mode, blocks in default mode. Re-exported as `assertDistFresh()` from `src/freshness.ts`.
- **Consumers**: keyframes.js + value.js have header-only-divergent CLONES of the same file.
- **Verdict**: **CARVE-OUT or ELEVATE** — preferred path: lift `freshness-gate.mjs` body into `@mkbabb/dev-kit/scripts/freshness-gate.mjs` as the canonical home. Keep glass-ui's `src/freshness.ts` runtime export as the consumer-side API surface for vite.config plugin usage. keyframes.js + value.js drop their clones, depend on `@mkbabb/dev-kit`. Saves 3 file clone sites; closes the "comments-only diff" canonical-clone smell. M.W2 candidate.

### E.4 — Bundle-budget gate

- **glass-ui's `scripts/profile-bundle.mjs`** + `npm run profile:budget`: enforces gz-budget thresholds on `dist/glass-ui.js`. Glass-ui-specific budget table (3 hard gates per L.W4).
- **Consumers**: zero parallel.
- **Verdict**: **DOCUMENT-AS-DIFFERENT** for now — generic carve-out is feasible (`@mkbabb/dev-kit/bundle-budget`) but the per-repo threshold table is the meat; the script logic is straightforward gz-size comparison. LOW priority. M.W4 nice-to-have.

### E.5 — Cross-repo build proof

- **glass-ui's `scripts/proof-consumers-build.sh` + `proof-consumers-static.mjs` + `validate-consumers.sh`**: walk a consumer list (speedtest, words, fourier-analysis, bbnf-lang) and verify each builds against the local-linked glass-ui. Critical for SCC-trap-class regressions (X.W3.c-NEW found via this proof).
- **Consumers**: zero parallel; this is glass-ui-side-only.
- **Verdict**: **ELEVATE-with-extension** — promote the proof harness to `@mkbabb/dev-kit/scripts/proof-consumers` with consumer-list configured per-repo. keyframes.js + value.js could use this when they break consumers. M.W2 candidate.

**Build-tooling transposition count**: 5 rows. **3 CARVE-OUT** (E.2, E.3, E.5); **1 RETIRE-OR-REFRESH** (E.1); **1 DOCUMENT-AS-DIFFERENT** (E.4).

---

## §F — `@mkbabb/` namespace cohesion

The constellation publishes via npm with the `@mkbabb/` scope. Currently-published packages (per dependency-graph walk):

- `@mkbabb/glass-ui` v1.0.0 (L close)
- `@mkbabb/keyframes.js` v2.0.0 (consumed by 9 sites across 5 repos)
- `@mkbabb/value.js` v0.5.1 (consumed by keyframes.js + bbnf-lang playground)
- `@mkbabb/parse-that` v0.8.2 (consumed by bbnf-lang)
- `@mkbabb/latex-paper` (consumed by fourier-analysis/web + words/frontend) — separate ecosystem, not deep-audited
- `@mkbabb/pencil-boil` (consumed by fourier-analysis/web) — separate ecosystem
- `@mkbabb/bbnf-playground` (private workspace)

**Dependency graph**:

```
value.js (0.5.1)
   ↓
keyframes.js (2.0.0)  ←  speedtest, words, fourier-analysis, bbnf-lang/playground
   ↓
glass-ui (1.0.0)  ←  speedtest, words, fourier-analysis, bbnf-lang/playground
   (peer-dep keyframes; consumes value.js transitively via keyframes)
```

**Proposed namespace cohesion artefacts** (M.W3 candidates):

1. **`docs/precepts/CONSTELLATION.md`** in the precepts submodule — single canonical document for the @mkbabb/* namespace. Sections:
   - **Dep-graph**: the diagram above + edge semantics (peer vs runtime vs devDep).
   - **Versioning policy**: glass-ui follows semver; libs use 0.x while pre-1.0 and bump to 1.x at first breaking-change cohort.
   - **Release cadence**: tied to tranche-close in apps; per-feature in libs.
   - **CHANGELOG convention**: glass-ui's pattern as canon (B.17 ELEVATE).
   - **MIGRATION convention**: glass-ui's pattern as canon (B.18 ELEVATE).
   - **Cross-package deps**: when keyframes.js publishes, who must re-link? Today: glass-ui consumes via peer-dep; glass-ui consumers re-link transitively. Document the chain.

2. **Shared dispatch template** for cross-repo tranches — already in `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md`. Extend with a cross-repo-coordination section that names: speedtest-Y.md (L's pattern); proposed: M.W2 fourier-coordination.md + words-coordination.md.

3. **Versioning policy** specifics:
   - **glass-ui** is the substrate; bumps to v1.x for additive, v2.x for next-breaking-cohort. Aligned at L close.
   - **keyframes.js** v2.0.0 — published; would need MIGRATION.md retroactively if any breaking change is identified (B.18 ELEVATE).
   - **value.js** v0.5.1 — pre-1.0; document the v1.0 trigger (likely a stable units-coalesce API per `feedback_no_backwards_compat`).
   - **parse-that** v0.8.2 — pre-1.0; bbnf-lang is sole consumer; document the v1.0 trigger.

4. **Cross-package dep graph documentation**: M.W3 candidate `docs/precepts/CONSTELLATION.md` (item 1 above).

**Namespace cohesion count**: 4 artefact proposals; all M.W3-bound.

---

## §G — Top 5-9 HEADLINE-candidate transpositions

Ranked by (Elegance · Performance · Simplicity · Cross-cutting · Risk):

### G.1 — **HEADLINE 1**: Retired-subpath drift fix (cross-repo coordination)

- **Motivation**: 5 consumer-site imports currently reference retired-in-L subpaths (`@mkbabb/glass-ui/pagination` × 2 in fourier; `@mkbabb/glass-ui/virtual` × 3 in words). Against v1.0.0, these fail to resolve.
- **Scope**: glass-ui (decide re-instate vs hold-retired) + words/frontend (3 import sites) + fourier-analysis/web (2 import sites).
- **M wave**: **M.W0 HARD GATE** — block M progress until resolved.
- **Verdict**: clean-break preferred per `feedback_no_backwards_compat` — migrate the 5 consumer sites to inline-replicate the (retired) composables OR adopt an alternate primitive. Document via 2 coordination memos (mirroring L's `coordination/speedtest-Y.md` pattern).
- **Elegance**: HIGH (closes substrate-without-consumer ledger). **Performance**: NEUTRAL. **Simplicity**: HIGH (consumer-side edit). **Cross-cutting**: 3-repo. **Risk**: LOW.

### G.2 — **HEADLINE 2**: `@mkbabb/dev-kit` carve-out — vite preset + tsconfig + freshness + release + proof-consumers + bundle-budget

- **Motivation**: 6 cross-cutting duplications (B.9 vite presets, B.10 tsconfig, B.13 release, B.14 freshness, B.15 bundle-budget, B.20 proof-consumers) cluster around a single substrate gap: there is no shared dev-tooling package in the constellation. The duplications today are header-only-divergent canonical clones (verified for freshness-gate.mjs).
- **Scope**: NEW `@mkbabb/dev-kit` package; consumers glass-ui + keyframes.js + value.js + parse-that + (selectively) speedtest + words + fourier-analysis + bbnf-lang.
- **M wave**: **M.W1 HEADLINE** — single wave introduces the package; subsequent waves migrate consumers.
- **Verdict**: build the package atomically with at least vite presets + tsconfig + freshness-gate. Release scripts + proof-consumers + bundle-budget can be incremental.
- **Elegance**: HIGH (closes 3+ canonical-clone instances). **Performance**: NEUTRAL (build-time only). **Simplicity**: HIGH (clones drop). **Cross-cutting**: 8-repo (every npm-publishing repo in the constellation). **Risk**: MEDIUM (introducing a new published package; semver bootstrap; consumer-link verification overhead at proof-consumers-build.sh shape).

### G.3 — **HEADLINE 3**: `cn` ELEVATE — fold demo-clone sites to consume glass-ui's `cn`

- **Motivation**: 3-4 sites still copy-paste `cn(...) = twMerge(clsx(inputs))` (bbnf-playground, keyframes-demo, value-demo, possibly fourier). glass-ui's v0.9.2 `cn` dropped tailwind-merge for a hand-rolled deduplicator — the demo clones are STALE.
- **Scope**: 3-4 consumer-side `utils.ts` files; glass-ui is canonical.
- **M wave**: **M.W2** — folds cleanly with the dev-kit migration.
- **Verdict**: replace each `cn` clone with `import { cn } from "@mkbabb/glass-ui"`; drop `tailwind-merge` peer-dep from those sites.
- **Elegance**: MEDIUM (cosmetic). **Performance**: SMALL gain (consumer drops tailwind-merge ~10KB peer-dep where applicable). **Simplicity**: MEDIUM. **Cross-cutting**: 3-4 sites. **Risk**: LOW.

### G.4 — **HEADLINE 4**: `docs/precepts/CONSTELLATION.md` — namespace cohesion doc

- **Motivation**: The `@mkbabb/*` namespace publishes 5+ packages with an implicit dep-graph + no shared versioning policy + no shared MIGRATION/CHANGELOG conventions across libs. The conventions exist (glass-ui ships them) but no canonical doc lifts them to namespace-canon.
- **Scope**: NEW doc in precepts submodule (cross-repo via .gitmodules); referenced from each consuming repo's CLAUDE.md.
- **M wave**: **M.W3** (doc-format harmonization).
- **Verdict**: ship a 1-page CONSTELLATION.md with dep-graph diagram + versioning policy + release-cadence policy + cross-package coordination protocol (mirroring L's `coordination/speedtest-Y.md` shape).
- **Elegance**: HIGH (turns implicit constellation into explicit substrate). **Performance**: N/A. **Simplicity**: HIGH (1 doc). **Cross-cutting**: namespace-wide. **Risk**: LOW.

### G.5 — **HEADLINE 5**: bbnf-lang/playground `@vueuse/core` peer-dep bump 13.0 → 14.0

- **Motivation**: bbnf-lang/playground is the only consumer running `^13.0` while glass-ui's peer-dep says `^14.0`. Semver-loose acceptance papers over it at install time but a peer-dep mismatch is real.
- **Scope**: bbnf-lang/playground/package.json — 1 line change.
- **M wave**: **M.W2** (cross-repo coordination).
- **Verdict**: bump; test the playground.
- **Elegance**: HIGH (closes the peer-dep drift). **Performance**: N/A. **Simplicity**: HIGH (1 line). **Cross-cutting**: 1 repo. **Risk**: LOW (vueuse 13→14 had no public-API breaks per our usage).

### G.6 — **HEADLINE 6**: vite-plugin-shebang RETIRE-OR-REFRESH

- **Motivation**: Stale (vite 4 + TS 5.2 while constellation runs vite 7 + TS 5.8); zero active consumers in the @mkbabb/* JS subset.
- **Scope**: vite-plugin-shebang repo.
- **M wave**: **M.W3** (substrate hygiene).
- **Verdict**: either (a) refresh to current vite/TS if a future CLI in the constellation will need it; (b) archive the repo with an explicit retire-rationale README block. Decision-style HEADLINE; the action is small but the substrate clarity is high.
- **Elegance**: HIGH (closes a substrate-without-consumer ledger entry at the constellation scale). **Performance**: N/A. **Simplicity**: HIGH. **Cross-cutting**: 1 repo. **Risk**: LOW.

### G.7 — **HEADLINE 7**: mathanim formal disposition (archive / retire / refresh)

- **Motivation**: Stale TS 4.1; depends on `mkbabb/animation.js` github tarball (no longer the @mkbabb/keyframes.js pattern); no @mkbabb/* deps; likely abandoned.
- **Scope**: mathanim repo.
- **M wave**: **M.W3** (substrate hygiene).
- **Verdict**: probable archive (per Y/Z-future-tranche-style retirement); does NOT block M progress.
- **Elegance**: MEDIUM. **Performance**: N/A. **Simplicity**: HIGH. **Cross-cutting**: 1 repo. **Risk**: LOW.

### G.8 — **HEADLINE 8**: Configurator recursion repro harness (F-ε-3 from L-residuals)

- **Motivation**: Configurator recursion at `/motion/metaballs` under Lighthouse — Playwright-clean, Lighthouse-reproducible. Best-practices=96; not a release blocker but a substrate-quality residual.
- **Scope**: glass-ui demo + Configurator runtime; possibly Configurator's watcher graph in `useConfiguratorState`.
- **M wave**: **M.W4** (substrate quality).
- **Verdict**: build a methodical reproduction harness; identify root cause; ship a fix in M.
- **Elegance**: MEDIUM (debug investigation). **Performance**: MAYBE (if recursion is fixable, render-path simpler). **Simplicity**: MEDIUM. **Cross-cutting**: 1 repo (glass-ui). **Risk**: MEDIUM (open-ended debug).

### G.9 — **HEADLINE 9**: words/frontend Toaster reconciliation (deliberate-or-drift verify)

- **Motivation**: words uses `sonner` + `vue-sonner` directly despite glass-ui shipping a Toaster pattern. Either deliberate (sonner's API matched words' product UX better) or drift (early bring-up before glass-ui's Toaster matured).
- **Scope**: words/frontend; possibly glass-ui (if Toaster API needs a usability concession).
- **M wave**: **M.W2** (cross-repo coordination).
- **Verdict**: VERIFY-READ at M.W2; if deliberate, document in CONSTELLATION.md "non-canonical consumer choices ledger"; if drift, propose migration.
- **Elegance**: HIGH (closes a substrate ambiguity). **Performance**: NEUTRAL. **Simplicity**: depends on outcome. **Cross-cutting**: 2 repos. **Risk**: LOW.

**HEADLINE candidate ranking** (top 5 by combined score):

1. **G.1 — Retired-subpath drift fix** (P0 hard gate; cross-repo; LOW risk) — MUST land at M.W0.
2. **G.2 — `@mkbabb/dev-kit` carve-out** (HEADLINE wave material; cross-repo; MEDIUM risk; closes 3+ canonical-clone duplications) — M.W1 HEADLINE.
3. **G.4 — `CONSTELLATION.md` namespace cohesion doc** (HIGH elegance, LOW risk, namespace-wide) — M.W3.
4. **G.3 — `cn` ELEVATE** (cosmetic but closes a stale-clone smell at 3-4 sites) — M.W2.
5. **G.5 — bbnf-lang playground vueuse bump** (HIGH simplicity, closes peer-dep drift) — M.W2.

The remaining 4 (G.6 + G.7 + G.8 + G.9) are M.W3-W4 substrate-hygiene candidates; not HEADLINE-tier but should be folded into M's scope.

---

## §H — Anti-patterns: tempting transpositions that would actually be wrong

These ideas FEEL good but should NOT land at M. Documented to prevent accidental absorption:

### H.1 — DON'T: extract aurora into `@mkbabb/aurora` standalone npm package

- **Why tempting**: aurora is 2,054 LOC incl. 799 LOC frag shader — the largest single subsystem in glass-ui. Extracting it would shrink glass-ui's dist by ~30 KB raw and orphan the WebGL renderer to its own release cadence.
- **Why wrong**: aurora's substrate dependencies (`useGlassRenderer`, `useTokenColor`, the `--phase-color` cascade, the Configurator family) are deeply glass-ui-internal. Extracting aurora would require lifting 4+ composables + the entire token-cascade-aware shader compilation pipeline to a peer-dep contract, then re-importing the same primitives into glass-ui itself (because aurora is the most prominent demo). The result: more cross-package wiring + worse tree-shaking + a v0.1.0 peer-dep that drifts. Tree-shaking already handles the consumer-side non-use of aurora via the `/aurora` subpath. Per `feedback_overfitting_audit`: every substrate has ≥ 2 consumers (or formal retire); aurora has 1 (the glass-ui demo). Splitting it would create a new substrate-without-consumer at the npm level.

### H.2 — DON'T: re-instate `@mkbabb/glass-ui/pagination` + `/virtual` subpaths as "narrowing" entries

- **Why tempting**: 5 consumer-site imports would resolve cleanly; no migration needed.
- **Why wrong**: per L W3, the composables `useOffsetPagination`, `useVirtualSectionWindow`, `useWindowedStore` were retired with explicit rationale (substrate-without-consumer in glass-ui's own demos; words + fourier-analysis discovered as cross-repo consumers AFTER retirement). Re-instating without absorbing them as canonical primitives — i.e. re-WIRING them into glass-ui's demos with proper second-consumer attestation — would re-open the substrate-without-consumer ledger. Per `feedback_no_backwards_compat`, clean break preferred. **Right path: migrate the 5 consumer sites to inline-replicate the composable bodies OR adopt vueuse equivalents (`useOffsetPagination` exists in vueuse).**

### H.3 — DON'T: lift `useTokenColor` to `@mkbabb/std`

- **Why tempting**: `useTokenColor` is a generic CSS-custom-property → ComputedRef helper. Looks general-purpose.
- **Why wrong**: it's theme-aware (resolves through `--surface-tint-*` and `--phase-color` cascades that are glass-ui-specific). Lifting to a generic substrate would either drag glass-ui's token cascade into `@mkbabb/std` (defeating the carve-out) OR de-token-aware-ify the helper (losing the design system's core feature). Per `feedback_tailwind_first`: "design references from standalone CSS must be re-expressed via @theme + @utility, never pasted raw" — `useTokenColor` IS the @theme bridge; lift it and you split the bridge.

### H.4 — DON'T: introduce `@mkbabb/std` as a NEW shared utility package without strong duplication evidence

- **Why tempting**: every constellation has a "shared utils" package. Naming it would feel canonical.
- **Why wrong**: §B B.3 (`useLocalStorage` / typed storage) is the ONLY actual cross-cutting utility duplication discovered (and even that has semantic divergence between speedtest's `typedStorage` and fourier's `useSafeStorage`). One row of disposition uncertainty does not justify a new published package. Building `@mkbabb/std` PROACTIVELY would be over-engineering; building it REACTIVELY at the next duplication event is `feedback_overfitting_audit`-aligned. **Right path: defer `@mkbabb/std` until ≥ 2 confirmed cross-cutting utility duplications surface.**

### H.5 — DON'T: enforce tranche format across keyframes.js / value.js / parse-that

- **Why tempting**: tranche format is the canonical project-management substrate in glass-ui + speedtest + bbnf-lang. Universal adoption feels aligned.
- **Why wrong**: utility libraries don't have multi-wave reform cycles (their cadence is "feature ships when ready, version-bump, publish"). Forcing tranche format would create empty FINAL.md files and dispatch templates for libs that just want to publish v0.5.2 → v0.6.0. Per CLAUDE.md `feedback_tranche_format`: "multi-wave reforms adopt bbnf-lang tranche format". Single-wave or no-wave libs use CHANGELOG-only cadence. **Right path: `docs/precepts/CONSTELLATION.md` documents the applicability matrix.**

### H.6 — DON'T: collapse `@mkbabb/glass-ui/aurora` and `/metaballs` into one `/webgl` subpath

- **Why tempting**: both are WebGL composites; naming convergence feels clean.
- **Why wrong**: aurora and metaballs have very different consumer profiles (aurora is the dominant background substrate; metaballs is a 1-consumer special-purpose particle system). Their substrate dependencies differ. Collapsing the subpath would force the metaballs consumer to load aurora's frag shader (~30KB). Tree-shaking with named exports works less well than per-subpath isolation for WebGL shader-string consumers. **Right path: separate subpaths stay separate.**

### H.7 — DON'T: rewrite glass-ui's `cn` to use `tailwind-variants` or `cva-plus` or similar

- **Why tempting**: the constellation has CVA (`class-variance-authority`) + `clsx` + glass-ui's hand-rolled dedup. Convergence on a fancier substrate (e.g. `tailwind-variants` which combines CVA + tailwind-merge in one) feels modern.
- **Why wrong**: v0.9.2 explicitly DROPPED `tailwind-merge` for a hand-rolled deduplicator per L W0 cohort. The hand-rolled is small (~50 LOC) + zero-runtime-dep + glass-ui-tuned. Adding a heavier library would reverse the v0.9.2 substrate decision. **Right path: hand-rolled `cn` stays.**

### H.8 — DON'T: extract `useSpringOrchestrator` from glass-ui into `@mkbabb/keyframes.js`

- **Why tempting**: keyframes.js owns the animation primitives (`NumericAnimation`, `SmoothProgress`); `useSpringOrchestrator` is a Vue-flavoured spring layer that depends on those primitives. Pushing it down feels gestalt-aligned.
- **Why wrong**: `useSpringOrchestrator` is Vue 3.5-coupled (`watchEffect`, `ref`, lifecycle). keyframes.js is intentionally framework-agnostic (TS-only with WAAPI bindings). Pushing the Vue composable into keyframes.js would introduce a Vue peer-dep there (breaking the framework-agnostic contract). **Right path: keyframes.js stays framework-agnostic; glass-ui keeps the Vue composables.**

### H.9 — DON'T: force every consumer onto `@mkbabb/glass-ui/api` for types

- **Why tempting**: the `api/` subpath is the discovery layer; "everyone should use it" feels aligned.
- **Why wrong**: per L-residuals "5 documented narrowing entries", `src/api/` has 0 direct importers at HEAD. That's not a bug — it's a property of a NEW additive subpath that consumers will adopt opportunistically. Forcing migration would over-engineer the type-import experience without delivering value. **Right path: let `api/` accrete consumers organically; β audit at M close.**

### H.10 — DON'T: standardize toast/notification surface across glass-ui Toaster + sonner

- **Why tempting**: words uses sonner directly; glass-ui ships Toaster (v0.9 introduced; uses success/warning/info-foreground tokens per CLAUDE.md V.W2 absorb). Unifying feels canonical.
- **Why wrong**: sonner and Toaster have different positioning/composability primitives (sonner is a stack-of-notifications model; Toaster wraps reka-ui's Toast primitive with the design system's tier vocabulary). Forcing words to migrate sonner → Toaster would erase intentional consumer-side product UX. Forcing glass-ui to absorb sonner-shaped APIs would dilute the four-state contract. **Right path: §G G.9 VERIFY-READ — if deliberate, document in CONSTELLATION.md; if drift, propose canonical migration; do NOT pre-emptively force unification.**

**Anti-pattern count**: 10 named anti-patterns; each labeled with the tempting reason + the substrate reason it's wrong + the right path.

---

## §I — Recap + recommended M-tranche shape

**Per-repo state**: 14 candidate repos surveyed; 11 in M JS scope; 9 Vue-bearing core; 7 Vue-active glass-ui consumers (incl. glass-ui itself); 4 published @mkbabb/* npm packages (glass-ui, keyframes.js, value.js, parse-that).

**Duplication-inventory**: 25 rows; 6 CARVE-OUT, 11 ELEVATE, 7 DOCUMENT-AS-DIFFERENT, 1 VERIFY-DEEP-READ.

**Consumer-side debt**: 2 P0 (retired-subpath drift), 3 carve-out candidates, 3 OBSERVE, 2 DOCUMENT-AS-DIFFERENT.

**Top 5 HEADLINE candidates (ranked)**:

1. **G.1 — Retired-subpath drift fix** (M.W0 HARD GATE; 5 consumer sites; cross-repo).
2. **G.2 — `@mkbabb/dev-kit` carve-out** (M.W1 HEADLINE; absorbs 6 duplications; new published package).
3. **G.4 — `CONSTELLATION.md`** (M.W3; namespace cohesion).
4. **G.3 — `cn` ELEVATE** (M.W2; 3-4 demo-clone fold).
5. **G.5 — bbnf-lang vueuse bump** (M.W2; 1-line peer-dep fix).

**Supporting M waves**:

- **M.W0** — hard gate: retired-subpath drift fix (G.1); precept-submodule push reconciliation (L-residual); LESSONS-LEARNED `checkout` extension (L-residual).
- **M.W1 HEADLINE** — `@mkbabb/dev-kit` carve-out (G.2); src/api/ housekeeping (C.2 + C.3); composables/motion/index.ts barrel style fix (C.4 G4); G14 ModalOverlay comment fix (L-residual).
- **M.W2** — cross-repo coordination: `cn` ELEVATE (G.3); bbnf vueuse bump (G.5); words sonner verify (G.9); useTypedStorage/useSafeStorage disposition (B.3); freshness-gate dev-kit migration (B.14); consumer-link proof migration (B.20).
- **M.W3** — namespace cohesion + substrate hygiene: `CONSTELLATION.md` (G.4); tranche-format applicability matrix (B.16); vite-plugin-shebang disposition (G.6); mathanim disposition (G.7); CHANGELOG/MIGRATION adoption per @mkbabb/* lib (B.17/B.18).
- **M.W4** — substrate quality: Configurator recursion repro (G.8 / F-ε-3); β audit + π viewport probe + δ/ε strengthened pattern from L.W8.

**Anti-patterns**: 10 named anti-patterns documented to prevent accidental M absorption.

**Total transposition catalogue**: ~50 rows across §A (14) + §B (25) + §C (15) + §D (4 repos × 5 questions = 20 row-cells) + §E (5) + §F (4 namespace artefacts) = comprehensive.

The dominant M theme is **constellation gestalt** — glass-ui v1.0 closed the LIBRARY-SIDE gestalt; M closes the CONSTELLATION-SIDE gestalt by lifting cross-cutting tooling into a shared substrate, fixing cross-repo coordination drifts, and ratifying the @mkbabb/* namespace with explicit policy. The HEADLINE wave (M.W1) introduces `@mkbabb/dev-kit` as the constellation's shared dev-tooling substrate; the surrounding waves harmonize the consumers.

---

## §J — Closing line

5 ranked HEADLINE candidates · 25-row duplication inventory · 14-repo state survey · 15-row v1.0→v1.x library candidate set · 5-row build-tooling transposition set · 4 namespace cohesion artefacts · 10 anti-patterns · M-tranche shape proposed (W0 hard gate · W1 HEADLINE · W2 cross-repo · W3 substrate hygiene · W4 substrate quality).

The constellation today is 14 semi-cohesive repos with 3 substrate debts: a clone graph (CARVE-OUT to dev-kit), a retired-subpath drift (HARD GATE), and an uneven tranche-format adoption (DOCUMENT-AS-DIFFERENT + apply-matrix). M's job is to lift those three debts and let the @mkbabb/* namespace cohere as a constellation, not 14 snowflakes.
