# L · Rε — Architectural Transpositions + Modularization Audit

**Date**: 2026-05-11
**Baseline commit**: `c5f196c` (K W8 close; v0.9.3 tagged + pushed)
**Predecessor**: `docs/tranches/K/research/Rε-architectural-transpositions.md` (K W0 sweep — 11 B-candidates, 4-wave shape)
**Lane**: ε — gestalt-collapse / canonical-primitive / retire-or-wire candidates, plus the L-specific modularization scan per user directive
**Mode**: READ-ONLY. Read-only git only. NO `git stash`.
**Pattern source**: J Rα–Rζ + K Rε. L Rε extends with the new user directive: *"Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc"* — this is the centerpiece of §B below.

---

## §0 — Scope

L Rε emits three sections:

- **§A — Architectural transpositions surfaced post-K** (gestalt-collapse / canonical-primitive candidates; 9 rows).
- **§B — Modularization audit** (the user's new L directive; B.1 sub-module boundaries · B.2 cohesion · B.3 import shape · B.4 `api/` hypothesis · B.5 misc; 23 rows total).
- **§C — v1.0 cohort scope** (named list of breaking changes + structural restructures).

Plus a single HEADLINE recommendation for L (the top architectural transposition).

---

## §A — Architectural transpositions surfaced post-K

Each row: source-state file:line citation · target-state · WIRE / RETIRE / LIFT verdict · L-wave attribution.

### A1 — WS Phase 2 — root-barrel removal of vueuse-bearing symbols *(HEADLINE candidate)*

- **Source state**: `src/index.ts:3` (`export * from "./components/ui"`) currently re-exports `Input` (`src/components/ui/input/Input.vue:?`), `Textarea` (`src/components/ui/textarea/Textarea.vue:?`), 10 `Combobox*` components (`src/components/ui/combobox/*.vue`), and `Carousel` (via `src/components/ui/carousel/useCarousel.ts:1`). All 4 packages directly import from `@vueuse/core` (verified — `useVModel`, `reactiveOmit`, `createInjectionState`). `src/index.ts:26-28` additionally re-exports `useGlobalDark` + `useKeyboardShortcuts` (`src/composables/useGlobalDark.ts:1`, `src/composables/useKeyboardShortcuts.ts` — both directly import `createGlobalState` / `useDark` / `useToggle` / `useEventListener` from `@vueuse/core`). Speedtest X.W3.c re-probe at v0.9.3 confirmed +1.92 KB regression byte-for-byte matches glass-ui's audit — Phase 1 alone does NOT close the SCC trap.
- **Target state**: drop `Input` / `Textarea` / `Combobox*` / `Carousel` / `useGlobalDark` / `useKeyboardShortcuts` from `src/index.ts`. Consumers reach them via `@mkbabb/glass-ui/forms` · `@mkbabb/glass-ui/carousel` (NEW subpath needed — currently no carousel subpath; `glass-carousel` is a different module) · `@mkbabb/glass-ui/composables/dark` · `@mkbabb/glass-ui/composables/keyboard`. The split between `src/components/ui/index.ts` (which still includes these 4 packages) and `src/index.ts` requires a structural change: either remove the 4 packages from `src/components/ui/index.ts` AND from `src/forms.ts` add a `forms-or-carousel.ts` distinction, OR carve a `src/components/ui/vueuse-bearing.ts` partition + a `src/components/ui/vueuse-free.ts` partition with `src/index.ts` consuming only the latter.
- **Verdict**: **RETIRE-FROM-BARREL** — breaking-change cohort, v1.0 bump. Clean break per `feedback_no_backwards_compat`.
- **L wave**: **L.W1 HEADLINE**.

### A2 — `src/composables/{dark,keyboard}.ts` dts publication gap

- **Source state**: `dist/composables/dark.d.ts` (50 bytes) and `dist/composables/keyboard.d.ts` (54 bytes) emit a broken `export * from '../src/composables/dark'` (the line is `export * from '../src/composables/dark'\nexport {}`). Per `package.json:319-322` only `dist` + `src/styles` are published to npm, so the `'../src/...'` path resolves to nothing at consumer side. `dist/forms.d.ts` by contrast is correctly bundled as a full d.ts (`rollupTypes: true` worked for `forms`). `vite.config.ts:18` sets `rollupTypes: true`; the regression is specific to entries whose name contains `/` (nested in `libraryEntries` at `vite.library.ts:41-42`). Surfaced as **X.W3.c-NEW** P0 in L Rγ.
- **Target state**: either (a) flatten subpath name to `composables-dark` / `composables-keyboard` (eliminates the `/` from the dts entry name — speculative fix for vite-plugin-dts internal pathing); (b) move the two `composables/<name>.ts` barrels to `src/dark.ts` + `src/keyboard.ts` flat-named; (c) emit dts via `vue-tsc --declaration --emitDeclarationOnly` over `tsconfig.src.json` and let rollup-types bundle only the JS — keeps dts loyal to source structure; (d) publish `src/composables/*` to npm by adding `"src/composables"` to `package.json:319-322 files`. Option (b) flat-naming is the cleanest gestalt fix because it removes the slash from BOTH the import path and the dts entry — but is a breaking change to the `@mkbabb/glass-ui/composables/dark` consumer surface (currently shipped at v0.9.3).
- **Verdict**: **STRUCTURAL FIX** — pair with A1 in the v1.0 cohort. Recommendation: flatten to `@mkbabb/glass-ui/dark` + `@mkbabb/glass-ui/keyboard` (option b). Consumer surface aligns with the other 30+ flat per-package subpaths; the `composables/` nesting was speculative for "namespace isolation" but it's the only nested subpath in the entire `exports` map (`package.json:308-316`).
- **L wave**: **L.W1** (pair with HEADLINE).

### A3 — `<DockShowcaseFrame>` zero consumers since V.W4

- **Source state**: `demo/stories/DockShowcaseFrame.vue` exists; `rg "DockShowcaseFrame" demo/` returns ONLY the self-definition file. ZERO consumers. Per V FINAL.md the chassis was named alongside `<ShowcaseFrame>` + `<StorySection>` (which both have 25-30 consumers each).
- **Target state**: either wire it into the 13 dock-tier demo stories (`demo/stories/navigation/dock*.vue` cohort) so the dock visual fidelity gets its second-consumer attestation, OR delete the file outright. The substrate-without-consumer invariant is binary.
- **Verdict**: **RETIRE** (recommendation) — the 13 dock stories at HEAD use raw `<ShowcaseFrame>` or none; they don't need a dock-flavoured chassis. Per K δ deferred this; L should close it.
- **L wave**: **L.W3** (retire-or-wire cohort).

### A4 — `<DiscoGlyph>` / `<DockGroup>` / `<InstrumentChassis>` — P-tranche 1-consumer fidelity

- **Source state**: `rg "DiscoGlyph|DockGroup|InstrumentChassis" demo/` shows each appears in exactly ONE demo story file: `demo/stories/primitives/disco-glyph.vue`, `demo/stories/primitives/dock-group.vue`, `demo/stories/compositions/instrument-chassis.vue`. `<GlyphFace>` has 2 demo consumers (the primitives page + the compositions page) — passes. Plus a 4th appearance of `<DiscoGlyph>` in `demo/stories/foundations/chart-chassis-palette.vue` per a broader grep — verify, but `dock-group` + `instrument-chassis` remain 1-consumer.
- **Target state**: per K Rε B9 + K cross-tranche debt + L Rβ L8 — each P-tranche package needs ≥ 2 consumers OR formal retire. Speedtest cross-repo audit could wire as their consumers. Alternative: lift the 1-consumer demos into a second demo story (compositions/<package>-pair.vue) per package.
- **Verdict**: **WIRE 2nd CONSUMER** for `<DockGroup>` + `<InstrumentChassis>`; verify `<DiscoGlyph>` 2nd-consumer claim. Cross-repo wiring (speedtest) preferred over additive demo proliferation.
- **L wave**: **L.W3**.

### A5 — `useRAFLoop` / `useIntersectionPause` / `useDarkModeSync` — 0 prod consumers

- **Source state**: `rg "useRAFLoop|useIntersectionPause|useDarkModeSync" src/ demo/` shows ZERO production-side `src/` consumers + 1 demo story each (`demo/stories/composables/use-*.vue`). Plus tests at `src/composables/__tests__/useRAFLoop.test.ts` + `useIntersectionPause.test.ts`. The composables are exported from `src/composables/motion/index.ts:15-28` to the public surface.
- **Target state**: per K Rε B5 + L Rβ L6: WIRE into Pulse / Typewriter / aurora / metaballs runtime (those all run private RAF loops); OR RETIRE. Tests prove correctness, not consumption. `feedback_overfitting_audit` library-orphan verdict applies.
- **Verdict**: **WIRE 2 of 3** (likely `useRAFLoop` into `Pulse.vue` + `TypewriterText.vue` — they have local RAF / setInterval timers; `useDarkModeSync` into `useTokenColor` reactive invalidation cycle); **RETIRE** the 3rd if no second consumer found. Cross-repo speedtest audit owed.
- **L wave**: **L.W3** (pair with A4 cross-repo audit).

### A6 — `useOffsetPagination` / `useVirtualSectionWindow` / `useWindowedStore` — 0 prod consumers

- **Source state**: `rg "useOffsetPagination|useVirtualSectionWindow|useWindowedStore" src/` returns ONLY the composable sources themselves + 1 demo story each. Public-surface composables exported from `src/composables/pagination/index.ts:30` + `src/composables/virtual/index.ts:2,6`. Same pattern as A5.
- **Target state**: cross-repo audit owed. Speedtest consumers DO use offset pagination patterns (`speedtest/.../admin/*`); verifying whether they import from `@mkbabb/glass-ui/pagination` vs hand-rolled is the gate.
- **Verdict**: **WIRE OR RETIRE** binary verdict. Recommendation lean: if speedtest is consumer-of-record, document that and update CLAUDE.md ledger; if not, retire.
- **L wave**: **L.W3**.

### A7 — Pulse + Typewriter keyframes → animations.css

- **Source state**: `src/components/custom/pulse/Pulse.vue:67` `@keyframes pulse-dot-bounce`; `src/components/custom/pulse/Pulse.vue:82` `@keyframes pulse-ring-spin`; `src/components/custom/typewriter/TypewriterText.vue:250` `@keyframes tw-cursor-blink`. Component-local `<style>` blocks. `src/styles/animations.css` already hosts 15 keyframes (dialog-in/out, dock-in, sparkle-sweep, shimmer-sweep, gold-shimmer-slide, etc.) — canonical animation grammar.
- **Target state**: lift the 3 keyframes into `src/styles/animations.css` as `pulse-bounce` / `pulse-spin` / `cursor-blink`; component scoped CSS just references `animation: pulse-bounce ...`.
- **Verdict**: **LIFT-TO-ANIMATIONS** — cohesion gain; canonical grammar wins. Zero runtime impact (keyframe names are globally scoped already).
- **L wave**: **L.W7** (vocab cohort).

### A8 — `useAuroraStudio` + `<AuroraConfigDock>` parallel chrome under `<Configurator>`

- **Source state**: `demo/stories/aurora/useAuroraStudio.ts` (63 LOC) defines `AuroraStudio` interface with `current` (Ref), `currentConfig` (ComputedRef), `currentMeta` (ComputedRef), **`liveConfigs: Record<PresetKey, AuroraConfig>`** (per-preset deep-clone map — distinguishing semantic vs `useConfiguratorState<T>` which holds a single live `config`). `src/components/custom/configurator/useConfiguratorState.ts:84` holds single `config = reactive(initialConfig)`. Per K W1 REVISION + DESIGN.md, this divergence was the documented Option-B-with-rationale because per-preset clone semantics ("slider edits persist when user switches presets and returns") is genuine API divergence.
- **Target state**: Option-A unify: extend `useConfiguratorState<T>` to accept a `cloneMode: 'shared' | 'per-preset'` option that, when `per-preset`, allocates a `Map<presetKey, T>` internally and returns the active preset's clone as `config`. The four call methods (`selectPreset` / `resetCurrent` / `cyclePreset` / `getPreset`) then write/read the appropriate slot. `useAuroraStudio` collapses to a thin wrapper that calls `useConfiguratorState<AuroraConfig>({ presets: PRESETS_AS_DESCRIPTORS, cloneMode: 'per-preset' })`.
- **Verdict**: **LIFT-CLONE-MODE** — Option-A is the canonical path. The per-preset clone is a property of the configurator's state-management strategy, not of aurora-as-domain. `<Configurator>` then earns its single canonical state primitive. Demo-private `<AuroraConfigDock>` chrome can stay aurora-private (it composes Configurator layers + aurora-specific knobs).
- **L wave**: **L.W7** (decision wave per L Rβ L11; recommend pursue).

### A9 — `<Carousel>` has no subpath — root-barrel-only vueuse exposure

- **Source state**: `src/components/ui/carousel/useCarousel.ts:1` imports `createInjectionState` from `@vueuse/core`. The `carousel` package is in `src/components/ui/index.ts:8` (`export * from "./carousel"`), which is re-exported via `src/index.ts:3`. There is NO `@mkbabb/glass-ui/carousel` subpath (the existing `/glass-carousel` is a different custom package — `src/components/custom/glass-carousel/`). When A1 lands (root-barrel removal), consumers of `<Carousel>` lose access entirely unless a `/carousel` subpath is added.
- **Target state**: add `/carousel` subpath entry: `src/carousel.ts` → `export * from "./components/ui/carousel"`. Add to `vite.library.ts:libraryEntries` + `package.json:exports` + `package.json:typesVersions`.
- **Verdict**: **WIRE NEW SUBPATH** — prerequisite for A1 (HEADLINE) landing without losing `<Carousel>` consumer surface.
- **L wave**: **L.W1** (atomic with HEADLINE).

---

**Transposition count**: 9 rows (A1 HEADLINE + 8 supporting).

---

## §B — Modularization audit (user's new L directive — CENTERPIECE)

User directive verbatim: *"Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc"*

This audit walks the entire `src/` tree per the 5 sub-questions B.1–B.5 from the dispatch brief.

### §B.1 — Sub-module boundary coherence

| # | Boundary | State | Recommendation |
|---|---|---|---|
| **B.1.1** | `src/components/ui/` (44 pkgs + `_shared/`) | COHERENT — shadcn-vue pattern; ~44 reka-ui-derived packages; `_shared/` (V.W3) for `ModalOverlay` + `menuItemVariants` (10 importers verified). One-package-per-directory invariant holds. | KEEP-AS-IS at structural level; surface the 4 vueuse-bearing packages (carousel/combobox/input/textarea) per A1 (HEADLINE). `_shared/` stays internal (consumed as `../_shared/...` relative path; 10 import sites; not on public surface). |
| **B.1.2** | `src/components/custom/` (30 pkgs, no top-level `index.ts`) | HALF-COHERENT — 30 package dirs but **NO `src/components/custom/index.ts` barrel**. The root barrel at `src/index.ts:6-16` cherry-picks only 6 custom packages (instrument-chassis, glyph-face, dock-group, disco-glyph, hover-popover, configurator, scrolling-text). The other 24 custom packages reach the public surface ONLY via per-package subpaths. This is deliberate but undocumented. | DOCUMENT the cherry-pick rationale in CLAUDE.md. Alternative: add `src/components/custom/index.ts` that re-exports the 7 root-barrel-eligible packages only, and have `src/index.ts:6-16` reduce to one `export * from "./components/custom"`. Cosmetic cleanup. |
| **B.1.3** | `src/composables/` — 6 sub-trees + 8 top-level files + `__tests__/` | INCOHERENT — sub-trees are `glass/`, `motion/`, `pagination/`, `sidebar/`, `sortable/`, `virtual/`. Top-level files: `useGlobalDark.ts`, `useInterval.ts`, `useKeyboardShortcuts.ts`, `useResizeObserver.ts`, `useStagger.ts`, `useStoryDemo.ts`, `useTimer.ts`, `useTokenColor.ts`, `useTouchGate.ts`, `dark.ts`, `keyboard.ts` (subpath barrels). Plus `__tests__/`. The 6 sub-trees are domain-coherent BUT the top-level 8 are a mixed bag — `useResizeObserver`/`useInterval`/`useTimer` are platform primitives; `useTokenColor`/`useStoryDemo` are reactive/test helpers; `useGlobalDark` is vueuse-bearing; `useKeyboardShortcuts` is vueuse-bearing. | **RESTRUCTURE** in L: split top-level into sub-trees by domain. Proposed: `composables/platform/` (`useInterval`, `useTimer`, `useResizeObserver`, `useTouchGate`); `composables/reactive/` (`useTokenColor`, `useStoryDemo`, `useStagger`); `composables/dark/` (`useGlobalDark` — already moves there per A2); `composables/keyboard/` (`useKeyboardShortcuts` — already moves there per A2). Result: every public composable lives in exactly one sub-tree. The flat-top-level layer collapses. |
| **B.1.4** | `src/utils/` | UNDERUSED — single file (`cn.ts`). `src/utils/index.ts:1` re-exports `cn` only. `__tests__/` for it. | KEEP-AS-IS — the directory naming is appropriate (utilities = side-effect-free pure helpers); single file is fine; do NOT promote to `lib/`. The directory exists for future-pure-helpers; no churn needed. |
| **B.1.5** | `src/styles/` (16 CSS files via `src/styles/index.css`) | COHERENT — cascade order documented in `src/styles/index.css:18-35`. tokens → typography → theme → glass → paper → dock → cards → floating-panel → transitions → animations → utilities → instrument-chassis → glyph-face → dock-group → disco-glyph → hover-popover. Per-package CSS is co-located with the package (CLAUDE.md documents this). | KEEP-AS-IS. The CSS cascade is the existing canon and consumers import the unified bundle via `@mkbabb/glass-ui/styles`. |
| **B.1.6** | `src/<flat-files>` — 33 single-file subpath barrels (aurora.ts, dock.ts, etc.) + index.ts + forms.ts + tokens.ts + freshness.ts | INCOHERENT-BUT-INTENTIONAL — 33 single-line `export * from "./components/<dir>"` barrels at the `src/` flat top level. Each one is a 1-line file. This is the per-package subpath surface (the `/dock`, `/aurora`, etc. subpaths). The pattern is correct but the flat-file proliferation noise-reduces other top-level signal (`index.ts` is hard to spot among 33 siblings). | **NEW: `src/subpaths/` directory** — move all 33 single-file subpath barrels under `src/subpaths/{aurora,dock,...}.ts`. Update `vite.library.ts:libraryEntries` to point `resolve(rootDir, "src/subpaths/dock.ts")` instead of `src/dock.ts`. `package.json:exports` `"./dock"` → `"./subpaths/dock"` would be a breaking change unless aliased. Alternative (less invasive): keep at `src/` but accept the noise. Recommendation: **ACCEPT-AS-IS** unless the v1.0 cohort wants to relocate alongside other restructuring. |

### §B.2 — Cohesion with sibling modules

| # | Cohesion gap | State | Recommendation |
|---|---|---|---|
| **B.2.1** | WS subpath barrels (`src/forms.ts` + `src/composables/{dark,keyboard}.ts`) — ad-hoc placement | Half-coherent — `forms.ts` is a single-line file at `src/` top level (alongside the other 33 subpath barrels) but is named `forms` (not the package name it re-exports). It's a composite barrel (re-exports 3 packages: input + textarea + combobox). `composables/{dark,keyboard}.ts` are nested under `composables/` because they re-export composables — but every OTHER subpath barrel is flat at `src/` regardless of what it re-exports (e.g. `src/sidebar.ts` re-exports `composables/sidebar/` AND `components/custom/sidebar/`). The nested placement is structurally inconsistent. | **FLATTEN per A2** — `src/composables/dark.ts` → `src/dark.ts`; `src/composables/keyboard.ts` → `src/keyboard.ts`. Subpath becomes `@mkbabb/glass-ui/dark` (matches the 30+ flat per-package subpath naming). Also resolves the dts-publication bug (A2). Breaking-subpath-rename → v1.0 cohort. |
| **B.2.2** | Root barrel `src/index.ts` re-exports a NON-ALPHABETIC, NON-CATEGORICAL subset of components/custom (line 6-16) | Inconsistent grouping. Comment markers ("Custom composites — instrument-cluster chassis", "Custom composites — configurator primitive", "Custom composites — overflow-marquee primitive") group 3 categories but the actual selection criterion isn't documented — why these 7 and not the other 23 custom packages? The pattern seems to be "components NOT in their own subpath" — but `dock` has a subpath AND is NOT in the root barrel; `configurator` has a subpath AND IS in the root barrel. Inconsistent. | **CURATE Phase 2 root barrel** — root barrel should be a TIGHT CURATED public surface: the 44 vueuse-free ui/ primitives + `cn()` + maybe 3-5 canonical composables (`useTokenColor`, `useStagger`, `useStoryDemo`). Everything else goes to per-package subpaths only. This converts the root barrel from "everything except vueuse" to "canonical primitives only", which is also the tree-shaking gestalt win. Breaking change → v1.0 cohort. |
| **B.2.3** | Composable sub-tree `sidebar/` cross-imports `components/custom/sidebar/types` | `src/composables/sidebar/index.ts:25-32` re-exports types from `../../components/custom/sidebar/types`. The composable sub-tree owns the runtime; the component sub-tree owns the types. Cross-cutting. | **HOIST sidebar types into `composables/sidebar/types.ts`** — types belong where the runtime lives. The component imports types from the composable, not vice-versa. Mechanical fix. Pair with B.1.3 restructure. |
| **B.2.4** | `infinite-scroll` — composables co-located inside the component package (`src/components/custom/infinite-scroll/composables/`) rather than under `src/composables/` | `src/composables/index.ts:15` re-exports from `../components/custom/infinite-scroll/composables`. Same cross-cutting violation as B.2.3. | **MOVE to `src/composables/infinite-scroll/`** — mirror sidebar pattern. Mechanical. |
| **B.2.5** | `src/components/custom/dock/composables/` (4 files: dockContext, useDockState, useLayerTransition, isTeleportedTarget) | Dock-internal composables. These are component-scoped and NOT public surface (not re-exported from `src/dock.ts`). Co-located with the component package. Per-package internal composables are fine. | KEEP-AS-IS — component-internal sub-composables are correctly co-located. Only public composables move to `src/composables/`. |
| **B.2.6** | Aurora `composables/` (`src/components/custom/aurora/composables/`) — same component-internal pattern | Aurora internals: `useAurora`, `useCursorInteraction`, `runtime`, `color` — all exported from `src/components/custom/aurora/index.ts:2-27`. PUBLIC surface but lives nested in the component package. | KEEP-AS-IS — aurora is a self-contained composite; nested public composables that are aurora-domain are correctly aurora-internal. The pattern differs from sidebar/infinite-scroll because aurora is one cohesive composite, while sidebar/infinite-scroll were promoted from component-internal to composable-of-record. Consistent boundary criterion: "if the composable is reusable beyond the component, hoist to `src/composables/`; if domain-bound, keep nested." |
| **B.2.7** | Top-level top-level composables (`useTimer`, `useInterval`, `useResizeObserver`, `useTouchGate`) — orphan namespace | All 4 are platform primitives (DOM/timer); each is a single file at `src/composables/`. No sub-tree, no logical grouping. | **GROUP under `composables/platform/`** per B.1.3. Single-file-per-sub-tree is fine for `glass/` already (which has `useGlassRenderer.ts` + `webgl/` shaders); the platform sub-tree would have 4 files. |
| **B.2.8** | `useStoryDemo` — demo-private composable in the LIBRARY's public surface | `src/composables/useStoryDemo.ts` — its docstring at line 1-3 describes "canonical play/reset/status harness with cleanup discipline" — but the consumer surface is the demo-storybook chassis. It's not domain-canonical for non-demo consumers. | **EVALUATE**: either (a) move to `demo/stories/useStoryDemo.ts` (demo-private; matches the V.W4 chassis primitives in `demo/stories/`); (b) keep public but document as "test/demo harness — not a runtime primitive". Recommendation: (a) — move to demo-private. Reduces public surface, no consumer impact (1 consumer file: demo tests). |

### §B.3 — Import shape from consumers' perspective

| # | Import-shape pattern | State | Recommendation |
|---|---|---|---|
| **B.3.1** | Root barrel `@mkbabb/glass-ui` — currently exports ~120+ symbols | At HEAD, the root barrel re-exports every ui/ package (44) + 7 cherry-picked custom packages + ~17 composables + `cn()`. Tree-shaking works in modern bundlers BUT module-graph traversal still happens for the SCC; that's the trap. | **PHASE 2 (HEADLINE) tight-curated root** per B.2.2: 40 vueuse-free ui/ + ~5 canonical composables. Everything else → subpath. |
| **B.3.2** | Per-package subpaths — 35 active (`/dock`, `/aurora`, etc.) | Active count is 36 per L Rβ row L2 (37 if you count `/styles` which is CSS-only). All flat-named except `composables/dark` + `composables/keyboard` (the 2 nested subpaths) — see B.2.1. | **FLATTEN the 2 nested** per A2/B.2.1. Result: every subpath is one flat hyphenated name; the API is regular. |
| **B.3.3** | No `@mkbabb/glass-ui/api` subpath for types + constants | At HEAD, types are SCATTERED — `ButtonVariants` from `@mkbabb/glass-ui` (root); `AuroraConfig` from `@mkbabb/glass-ui/aurora`; `MAX_NUCLEI` + `MAX_STOPS` + `DEFAULT_AURORA_CONFIG` from `@mkbabb/glass-ui/aurora`; `MenuItemVariants` from internal `_shared` (NOT public). Consumers who want "the type for the slider variant" must already know the package. Type-grep'ing the public surface is a discovery problem. | **NEW `src/api.ts` + `@mkbabb/glass-ui/api` subpath** — see B.4 hypothesis below. |
| **B.3.4** | CSS via `@mkbabb/glass-ui/styles` — single import | Clean. `src/styles/index.css` is the canonical entry. | KEEP-AS-IS. |
| **B.3.5** | Tokens via `@mkbabb/glass-ui/tokens` (runtime JS) | `src/tokens.ts` ships `chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm` — the JS-side projection of select CSS tokens that echarts/canvas can't resolve via CSS-var lookup. 36 LOC. | KEEP-AS-IS structurally; consider extending under the proposed `api/` umbrella per B.4. |
| **B.3.6** | Carousel has NO subpath despite being vueuse-bearing | Per A9 — `<Carousel>` only reachable through root barrel. Phase 2 removes it without subpath. | **ADD `/carousel` subpath** per A9; prerequisite for HEADLINE. |
| **B.3.7** | `dock` subpath name collides with `dock-group` + `dock-with-slider` story | The `@mkbabb/glass-ui/dock` subpath exports `GlassDock` + dock helpers. The `@mkbabb/glass-ui/dock-group` subpath is the `<DockGroup>` chassis-strip wrapper. Two `dock*` subpaths. Naming is clear but consumers must know the distinction. | KEEP-AS-IS — name is precise (`dock-group` is its own component); but document the pair in CLAUDE.md / DESIGN.md. |
| **B.3.8** | `src/components/custom/glass-carousel/` reaches the surface as `@mkbabb/glass-ui/glass-carousel` — NOT collision with `@mkbabb/glass-ui/carousel` (which doesn't exist) | The `glass-carousel` package is a different component from `carousel` (ui/carousel is the reka-ui pager primitive; glass-carousel is the custom-styled glass carousel). Two carousel-themed subpaths once A9 lands. | KEEP-AS-IS — same as B.3.7; naming is precise; document. |

### §B.4 — `api/` directory hypothesis

User specifically named: *"potentially having an api dir, etc"*. Evaluation:

**Proposed shape**:

```
src/api.ts                      # public re-export aggregator
src/api/
├── variants.ts                 # all CVA variant types (ButtonVariants, BadgeVariants, ...)
├── tokens.ts                   # token-name string literal unions + the runtime tokens.ts content
├── config.ts                   # AuroraConfig, ConfiguratorState<T>, default config objects
├── constants.ts                # MAX_NUCLEI, MAX_STOPS, glass tier names, easing names
└── index.ts                    # barrel
```

**Subpath**: `@mkbabb/glass-ui/api` resolves to `src/api.ts` → `src/api/index.ts`.

**Pros**:

1. **Discovery**: consumers `import type { ... } from "@mkbabb/glass-ui/api"` get every public TYPE without component-runtime dependency. Pure-types subpath; resolves to .d.ts; zero JS payload at consumer build time.
2. **Type-only consumers** (test fixtures, factories, mocks) can import without dragging Vue runtime.
3. **Constants centralisation**: `MAX_NUCLEI`, `MAX_STOPS`, `chartHeights`, `chartMargin`, glass tier names (`"wash" | "quiet" | "resting" | "floating" | "overlay"` as a `GlassTier` type) all live under one umbrella.
4. **Token-name string-literal unions**: emit `type SurfaceTintRung = 4 | 6 | 8 | 10 | 12 | 15 | 18 | 22 | 25;` etc. for design-system consumers who want typed token references.
5. **Tree-shaking gestalt**: pure-types subpath has ZERO contribution to consumer JS — types erase. Adds 0 KB to consumer bundle by definition.

**Cons / risks**:

1. **Source-of-truth duplication risk**: if `api/variants.ts` re-exports `ButtonVariants` separately from the button package, the type can drift. Mitigation: `api/variants.ts` is a pure re-export: `export type { ButtonVariants } from "../components/ui/button"`. No copy.
2. **`tokens.ts` already exists at `src/tokens.ts`** — proposed `api/tokens.ts` overlaps. Resolution: keep `src/tokens.ts` as the runtime-JS-tokens subpath (`@mkbabb/glass-ui/tokens`); make `api/tokens.ts` a pure-type module (token-name unions + literal-typed constants) that re-exports from `src/tokens.ts`.
3. **Adds another subpath** to maintain — `package.json:exports` + `typesVersions` + `vite.library.ts:libraryEntries`. Marginal maintenance.
4. **Pure-additive vs structural**: this is pure-additive (Phase-1-shape compatible). Does NOT conflict with HEADLINE A1 / WS Phase 2 because it doesn't move any existing export.

**Verdict**: **PURSUE — pure-additive, low risk, high consumer-discoverability gain**. Lands as part of L.W2 (modularization). Does not need v1.0 cohort gate — could ship at v1.0 alongside Phase 2 or separately at v0.9.4.

**Recommendation**: ship `api/` in L.W2 as ADDITIVE; promote to v1.0 ledger only if it requires breaking another existing surface.

### §B.5 — Misc modularization candidates

| # | Candidate | State | Recommendation |
|---|---|---|---|
| **B.5.1** | `src/styles/` cascade-order documentation | `src/styles/index.css:11-17` has a comment explaining font imports stay in consumer; `:18-19` says "Order matters". The cascade isn't otherwise documented. CLAUDE.md L127-144 enumerates the files but doesn't justify the cascade order. | **DOCUMENT in DESIGN.md** the cascade-order rationale (tokens-first; @theme after tokens; component layers after typography because component classes reference type-* tokens; etc.). One paragraph. |
| **B.5.2** | `src/styles/api.css` hypothesis | Per dispatch: "Should there be a `styles/api.css` that re-exports the canonical layer for consumers?" — `src/styles/index.css` IS that. No additional `api.css` needed. | NO ACTION — `index.css` is canonical-by-name. |
| **B.5.3** | `src/components/ui/_shared/` — public-surface promotion? | `_shared/` has 2 files (`ModalOverlay.vue` + `menuItemVariants.ts`); 10 internal importers (verified). NOT in public surface. Leading underscore signals "internal". | KEEP-AS-INTERNAL. The leading `_` is the well-established convention for "private to the package". Public-surface promotion would require renaming (drop `_`) AND adding to `src/components/ui/index.ts` exports. No external consumer pressure. |
| **B.5.4** | Dist composables typing publication bug (`dist/composables/{dark,keyboard}.d.ts` broken re-export) | Per A2: structural (subpath nesting + vite-plugin-dts rollupTypes interaction). | **FIX in L.W1** per A2 (flatten to `src/dark.ts` / `src/keyboard.ts`). |
| **B.5.5** | `src/freshness.ts` — node-bearing helper at top level | Node-built-in import (`node:fs` / `node:path` / `node:url`). NOT in root barrel (`src/index.ts:18-23` documents the intentional exclusion). Reaches consumers via `@mkbabb/glass-ui/freshness` subpath only. | KEEP-AS-IS — the exclusion is documented; freshness is a build-time helper, not a runtime primitive. Consider relocating to `src/build/freshness.ts` under a new `src/build/` directory IF more build-time helpers materialize. Single file = no relocation pressure. |
| **B.5.6** | No `src/api/` directory at HEAD | Per B.4 — proposed. | **NEW per B.4**. |
| **B.5.7** | No `src/build/` directory at HEAD | `freshness.ts` is the only build-time helper. | Defer until 2+ build-time helpers exist. |
| **B.5.8** | No `src/test/` directory at HEAD | Test fixtures live in `src/composables/__tests__/` + `src/utils/__tests__/` + per-package `__tests__/` co-located. | KEEP-AS-IS — co-located tests are vue/vitest canon. |
| **B.5.9** | No `src/types/` directory at HEAD | Types are co-located with their owning module (`Configurator.vue` exports `ConfiguratorPreset<T>` etc.; `aurora/presets.ts` exports `AuroraConfig`). | KEEP-AS-IS unless `api/` (B.4) is pursued. `api/` is the discovery layer; types-of-record stay co-located. |
| **B.5.10** | No `src/lib/` directory at HEAD | `src/utils/` is the lib-helpers slot (per B.1.4). | KEEP-AS-IS — `utils/` is functionally `lib/`. Renaming is cosmetic, no consumer impact (internal only). |

---

**Modularization-finding count**: B.1 = 6 rows · B.2 = 8 rows · B.3 = 8 rows · B.4 = 1 hypothesis (PURSUE) · B.5 = 10 rows. **Total**: 33 rows.

---

## §C — v1.0 cohort scope proposal

L is the v1.0 release per K invariant 4 + L findings.md item 4. The v1.0 cohort is the breaking-change cohort. Everything below either:

- **(i) BREAKING** — alters/removes a public surface;
- **(ii) STRUCTURAL** — restructures internals in a way that's still pure-additive at consumer surface BUT lands cleanly only alongside breaking changes;
- **(iii) WHILE-WE'RE-HERE** — non-breaking polish that should land in the v1.0 release for cohesion.

| Cohort entry | Category | Source row | Why v1.0 |
|---|---|---|---|
| **(1) WS Phase 2 — root-barrel removal of vueuse-bearing symbols** | (i) BREAKING — HEADLINE | A1 | Closes SCC trap; user directive; speedtest X.W3.c blocker; L Rβ L5; L Rγ K-CTD-1 |
| **(2) Flatten `composables/dark` + `composables/keyboard` → `dark` + `keyboard`** | (i) BREAKING (subpath rename) | A2 / B.2.1 | Fixes dts publication bug; aligns subpath naming convention; pair with (1) |
| **(3) Add `/carousel` subpath** | (ii) STRUCTURAL — pure-additive | A9 / B.3.6 | Prerequisite for (1) without losing `<Carousel>` consumer surface |
| **(4) `_shared/` STAYS internal** (decision) | — | B.5.3 | NO-CHANGE entry — documents the v1.0 decision |
| **(5) Tight-curated root barrel** (the 44 ui/ vueuse-free primitives + `cn()` + 3-5 canonical composables only) | (i) BREAKING — gestalt | B.2.2 | Implements the user's gestalt directive; tree-shaking gestalt; superset of (1) |
| **(6) Restructure `src/composables/` flat-top-level → sub-trees (`platform/`, `reactive/`)** | (ii) STRUCTURAL — internal, consumer-shape preserved | B.1.3 / B.2.7 | The public composable names don't change; only the internal file paths. Pure-additive at consumer surface BUT shipped at v1.0 to avoid mid-cycle churn |
| **(7) Hoist `composables/sidebar/types` from `components/custom/sidebar/types`** | (ii) STRUCTURAL | B.2.3 | Internal cross-cutting fix; sidebar types belong with sidebar composables |
| **(8) Move `infinite-scroll` composables to `src/composables/infinite-scroll/`** | (ii) STRUCTURAL | B.2.4 | Mirror sidebar pattern; cohesion |
| **(9) Move `useStoryDemo` to `demo/stories/` (demo-private)** | (i) BREAKING — public surface contraction | B.2.8 | Reduces public surface; aligns with V.W4 chassis-primitives-are-demo-private rule |
| **(10) NEW `src/api/` + `@mkbabb/glass-ui/api` subpath** | (ii) STRUCTURAL — pure-additive | B.4 | User directive ("potentially having an api dir"); type discovery; zero-JS subpath |
| **(11) `useRAFLoop` / `useIntersectionPause` / `useDarkModeSync` — wire OR retire** | (i) BREAKING (retire path) OR (iii) (wire path) | A5 | substrate-without-consumer binary; cross-repo audit owed |
| **(12) `useOffsetPagination` / `useVirtualSection*` / `useWindowedStore` — wire OR retire** | (i) OR (iii) | A6 | Same as (11) |
| **(13) `<DockShowcaseFrame>` retire** (recommendation) | (i) BREAKING — surface removal | A3 | Zero consumers since V.W4 |
| **(14) `<DiscoGlyph>` / `<DockGroup>` / `<InstrumentChassis>` — 2nd consumer wired** | (iii) WHILE-WE'RE-HERE | A4 | P-tranche second-consumer fidelity |
| **(15) Pulse + Typewriter keyframes lift to `animations.css`** | (ii) STRUCTURAL | A7 | Cohesion gain; zero runtime impact |
| **(16) Aurora chrome Option-A unification (`useAuroraStudio` → `useConfiguratorState` with `cloneMode: 'per-preset'`)** | (ii) STRUCTURAL | A8 | Decision wave; canonical primitive consolidation |
| **(17) CLAUDE.md + README.md migration guide v0.9.x → v1.0** | (iii) WHILE-WE'RE-HERE | K-R2 / L Rβ L2 | Required for any breaking-change release |
| **(18) Migration codemod for vueuse-bearing imports** *(optional)* | (iii) WHILE-WE'RE-HERE | (1) | A small `jscodeshift` or `ts-morph` script that rewrites `import { Input, Textarea, Combobox, Carousel, useGlobalDark, useKeyboardShortcuts } from "@mkbabb/glass-ui"` → the appropriate subpaths. Speedtest's 5 consumer files are the canonical test. |

**v1.0 cohort size**: 18 entries (10 BREAKING + 5 STRUCTURAL + 3 WHILE-WE'RE-HERE).

**Strict-essential subset** (if scope must shrink): (1) + (2) + (3) + (5) + (10) + (11) + (12) + (13) + (15) + (17) — 10 entries that are user-directive-aligned + substrate-hygiene + doc-required.

---

## §D — HEADLINE recommendation for L

**L HEADLINE: WS Phase 2 — root-barrel removal of vueuse-bearing symbols, paired with the tight-curated root + `api/` subpath introduction.**

Rationale stack:

1. **User directive alignment**: the L-open prompt directly named the modularization audit + sub-modules + an api/ dir as the new L directive. The HEADLINE folds those into the same architectural gestalt: the v1.0 root barrel becomes a CURATED public surface (not "everything except vueuse"), with the `api/` subpath providing the type-discovery layer that the consumer's import-shape question has implicitly been asking since J.
2. **Substrate convergence**: closes the SCC trap (speedtest X.W3.c blocker — independently confirmed +1.92 KB byte-for-byte regression at v0.9.3); flips the speedtest W3.b.1 disposition from `ACCEPT-AS-PHASE-1-LANDED-TRAP-DEFERRED` → `LANDED`; unblocks Y.A3 (speedtest's parallel-tranche glass-ui-side lane).
3. **Architectural transposition density**: 1 HEADLINE wave delivers (a) breaking change at the boundary (`@mkbabb/glass-ui` root barrel shape changes), (b) structural restructuring at internals (tight-curated barrel + flattened composables + api/ dir), (c) dts publication-gap fix, (d) carousel subpath addition. Four transpositions in one wave with one consumer-side migration path.
4. **v1.0 cohort gate satisfied**: L was already named the v1.0 cohort by precedent (K WS marked Phase 2 as v1.0). The HEADLINE realizes the precedent.
5. **No-legacy-code invariant**: clean break per `feedback_no_backwards_compat`; no deprecation aliases; consumers migrate atomically with the supplied codemod (entry 18 above) and the migration guide (entry 17).

The HEADLINE wave name: **L.W1 — Root-barrel Phase 2 + tight-curated public surface + `api/` discovery layer**.

---

## §E — Closing line

9 architectural-transposition rows · 33 modularization-audit rows (B.1 boundaries 6 · B.2 cohesion 8 · B.3 import-shape 8 · B.4 api/ hypothesis 1 · B.5 misc 10) · 18-entry v1.0 cohort · 1 HEADLINE that folds the L-specific modularization directive into the WS Phase 2 cohort.

The dominant L theme is **public-surface gestalt** — the v1.0 cohort is not "WS Phase 2 alone" but "WS Phase 2 AS THE GATEWAY to a curated, discoverable, tree-shakable public API surface". The user's modularization directive is the gestalt frame, and WS Phase 2 is the canonical artefact that lands it.
