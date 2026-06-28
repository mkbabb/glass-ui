# Lane η — Web SOTA Research (2025-2026) for the glass-ui BH restructure

Read-only research lane. Goal: ground the BH cleanup/refactor tranche in current, cited best
practices. Each pattern below ends with **→ glass-ui mapping** tying it to a concrete BH band.

Repo facts grounded at HEAD (cwd `/Users/mkbabb/Programming/glass-ui`, branch `tranche/BG`):
- `src/subpaths/*.ts` mirror barrels: **79** files.
- `package.json` `exports` entries: **96**.
- `src/` files > 500 lines (god-module candidates): GlassDock.vue 711, createCanvasLifecycle.ts 695,
  useWebGPUCanvas.ts 606, useDockFission.ts 604, CarouselContent.vue 577, useDockContextSilhouette.ts 551,
  useGlassBackdropLuminance.ts 542, useBlobSatellites.ts 533, metaball.wgsl.ts 529, flow-field.glsl.ts 517,
  SegmentedTabs.vue 512, metaball.frag.ts 510, PagerDots.vue 509, useGooDotMatrix.ts 508, useBloomUp.ts 507,
  **api/index.ts 505** (the discovery barrel itself is a god-module).
- `:deep(` usages across src+demo: **16** (manageable; audit each).
- vite library configs: `vite.config.ts`, `vite.library.ts`, `vite.style-assets.ts`, `vite.iter.config.ts`.

---

## 1. Vue 3.5/3.6 component + composable COLOCATION

### Pattern 1.1 — Feature-folder colocation (components + composables + constants + tests together)
Organize **by domain/feature, not by type**. Group related UI blocks, composables, constants and
assets in one dedicated directory; co-locate unit tests next to the code (Feature-Sliced Design).
Sources: [How to Structure Vue Projects — alexop.dev](https://alexop.dev/posts/how-to-structure-vue-projects/),
[Good practices for Vue Composables — DEV](https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk).

→ **glass-ui mapping:** glass-ui ALREADY does feature-dir colocation under `src/components/custom/<feat>/`
(components at root, `composables/`, `constants.ts`, `shaders/`, `skeleton/`, `README.md`). This is the
correct SOTA shape — BH should EXTEND it, not invent. The exception/violation the SOTA condemns is
**test colocation INTO src** — glass-ui's CLAUDE rule "no test files under src" is correct (tests mirror
in top-level `tests/`). Keep that. The one tension: SOTA says co-locate tests with code; glass-ui chose a
mirror tree for library-publish cleanliness (tests must not ship). The mirror tree is the right call for a
PUBLISHED library (don't relitigate), but the rule should be documented in the new docs/canon home.

### Pattern 1.2 — `use`-prefixed naming + named exports
Composable files and functions start with `use` (searchability, tree-shake by named import, Nuxt
auto-import alignment). Source:
[DEV — composables good practices](https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk).
→ glass-ui already conforms. Add as an explicit lint/canon rule in the new home.

### Pattern 1.3 — Return shape: refs (destructurable, reactivity-preserving), not a `reactive()` blob
Return individual refs so consumers can destructure while keeping reactivity. Document stateless-vs-stateful
intent per composable. Source: DEV (above), [Vue.js Composables guide](https://vuejs.org/guide/reusability/composables).
→ Audit glass-ui composables for `reactive()` return blobs (lose reactivity on destructure) — flag as a
BH lint sweep, not a per-file rewrite.

### Pattern 1.4 — `MaybeRefOrGetter<T>` + `toValue()` for arguments
Accept ref | getter | primitive; unwrap with `toValue()`. The canonical 2025 flexible-input idiom.
Source: DEV (above), [Vue.js Composables guide](https://vuejs.org/guide/reusability/composables).
→ glass-ui's `useVirtualSectionWindow` already uses `MaybeRefOrGetter`. Make it the canon for ALL new
composable args; flag positional-multi-arg composables for an options-object refactor (Pattern 1.7).

### Pattern 1.5 — Split large domains into focused single-responsibility composables
Prefer `useAddToCart` + `useFetchCart` over a monolith `useCart`. Smaller = testable, lower cognitive load.
Source: DEV (above). This is the SOTA articulation of the **NO-GOD-MODULE** directive.
→ Direct mapping to BH's >500L split band. The 16 god-modules above (esp. `GlassDock.vue` 711,
`createCanvasLifecycle.ts` 695, `useWebGPUCanvas.ts` 606, `useDockFission.ts` 604, `api/index.ts` 505)
each need a cohesive sub-module carve. Carve by RESPONSIBILITY (measure vs render vs lifecycle vs event),
not by arbitrary line-count slicing.

### Pattern 1.6 — Extract pure helpers OUTSIDE the composable scope
Pure utility/handler functions declared outside the exported `useX` avoid re-instantiation per call and
allocate less. Source: DEV (above).
→ BH carve sub-modules should land pure helpers in `constants.ts`/a `*-core.ts` leaf (glass-ui's existing
`railProjection.ts`/`virtualSectionLayout` "pure core" precedent).

### Pattern 1.7 — Options-object args + lifecycle cleanup
Config via an options object (optional fields, additive-safe). Side effects acquired in `onMounted`/scope and
released in `onUnmounted`/`onScopeDispose`. Source: DEV (above).
→ glass-ui's `onScopeDispose` usage is correct. Canon it; lint for raw `addEventListener` without cleanup.

---

## 2. Vue state / store / DI (2026)

### Pattern 2.1 — Three-tier decision rule (composable singleton ↔ provide/inject ↔ Pinia)
- **Composable (per-instance)** for non-singleton local state; ~1.5x faster than Pinia for reactive changes,
  ~20x for ref changes.
- **Module-level ref singleton** (refs declared OUTSIDE the `useX` body, exposed via getter) ONLY for
  genuinely global concerns.
- **provide/inject** for SUBTREE-scoped context (theme, nested form/dock context) — avoids prop-drilling,
  but makes dependencies implicit (document them).
- **Pinia** only for truly app-global, persisted, plugin/SSR-needing monolithic state.
Sources: [mokkapps — Vue state management](https://mokkapps.de/blog/vue-state-management-composables-provide-inject-pinia),
[Vue School — Composables vs Provide/Inject vs Pinia](https://vueschool.io/articles/vuejs-tutorials/composables-vs-provide-inject-vs-pinia-when-to-use-what/),
[iamjeremie.me](https://iamjeremie.me/post/2025-01/composables-vs-pinia-vs-provide-inject/).
→ glass-ui is a LIBRARY: it correctly avoids Pinia (would force a store dep on consumers). Its
`createStrictContext`/`createOptionalContext` factory pair (`src/composables/context/`) IS the SOTA
provide/inject DI pattern (typed, fail-explicit on missing provider — the "make implicit deps explicit"
fix). BH should: (a) canon the factory as THE DI seam, (b) audit the dock/toggle-group/sortable/configurator
provide-inject triplets are all routed through it (CLAUDE claims they collapsed onto it — verify on disk,
gate on EVIDENCE not grep), (c) ensure no module-level singleton ref leaks shared state where a consumer
expects per-instance (the `useGlobalDark`/keyboard-registry singletons are intentional — document them).

### Pattern 2.2 — Fail-explicit DI (`createStrictContext` throws on missing provider)
A strict context factory that throws when `inject` returns nothing is the 2026 idiom for required DI —
it converts the silent-undefined footgun into a loud error. Aligns with the user's fail-explicit rule.
→ Already present. Make it the binding pattern; forbid raw `inject(key)` without the factory in new code.

---

## 3. Component-library source structure (2026)

### Pattern 3.1 — Per-component directory + per-part SFC + `index.ts` barrel (shadcn-vue / reka-ui)
Vue SFC = one component per file, so multi-part components live as a directory of `Part.vue` files with one
`index.ts` exporting all parts. shadcn-vue@latest installs on top of reka-ui v2.
Source: [shadcn-vue contribution/changelog](https://www.shadcn-vue.com/docs/changelog),
[DEV — shadcn-vue](https://dev.to/jacobandrewsky/shadcn-vue-elegant-customizable-ui-components-for-modern-vue-apps-cd),
[unovue/shadcn-vue GitHub](https://github.com/unovue/shadcn-vue).
→ glass-ui's `ui/<component>/{Part.vue,index.ts}` matches exactly. KEEP. The `index.ts` per-component barrel
is FINE (small, component-local, not a god-barrel) — the barrel anti-pattern (§4) is about the ROOT mega-barrel
and the 79 mirror-barrels, not per-component `index.ts`.

### Pattern 3.2 — CVA variants co-exported from the component's `index.ts`
shadcn idiom: `buttonVariants`, `badgeVariants` etc. live beside the component. glass-ui conforms.
→ KEEP. When `src/api` folds into typed per-subpath surfaces (BH framing #2), the variant TYPES should be
re-exported from the per-component `index.ts` (the type lives once, at its component), not re-collected into a
central `api/index.ts` god-barrel (which is itself 505 lines — a god-module to dissolve).

---

## 4. Barrel-file / mirror-barrel anti-pattern (the 79-subpath kill)

### Pattern 4.1 — Root mega-barrels defeat tree-shaking; provide granular entrypoints instead
Barrel files obscure import-module relationships, cause unnecessary code retention and inflated bundles, and
break tree-shaking/code-splitting in webpack/Next consumers. The fix: **be explicit; provide granular
entrypoints with sensible functional grouping** — do not funnel everything through one re-export file.
One documented case: −400 KB by deleting a single SVG barrel.
Sources: [DEV — practical guide against barrel files for library authors](https://dev.to/thepassle/a-practical-guide-against-barrel-files-for-library-authors-118c),
[Medium — Burn the Barrel](https://uglow.medium.com/burn-the-barrel-c282578f21b6),
[Medium — Are TS Barrel Files an Anti-pattern](https://steven-lemon182.medium.com/are-typescript-barrel-files-an-anti-pattern-72a713004250),
[webpack discussion #16863](https://github.com/webpack/webpack/discussions/16863).
→ Direct support for BH framing #2: **`src/subpaths/` (79 mirror barrels) DIES.** A mirror barrel that does
`export * from "../components/X"` adds a hop and a re-export indirection for zero benefit once the export map
points straight at the component dir. See §5 for the wildcard-exports replacement that removes the need for
ANY mirror file.

### Pattern 4.2 — `sideEffects: false` is required for tree-shaking; CSS imports must be declared
A library must declare `"sideEffects": false` (or a precise array including `*.css`) in package.json so
bundlers can drop unused re-exports. Source: [Vite issue #5174](https://github.com/vitejs/vite/issues/5174),
[DEV — tree-shakable lib with Vite/Rollup](https://dev.to/morewings/how-to-build-a-tree-shakable-library-with-vite-and-rollup-16cb).
→ BH should verify glass-ui's `sideEffects` field correctly lists the CSS/style entry points (the `/styles`
cascade has side effects) while the JS subpaths are side-effect-free. A wrong `sideEffects` silently negates
the whole subpath-split effort.

---

## 5. Vite 8 / Rolldown library mode — ship many subpaths WITHOUT mirror-barrel files

### Pattern 5.1 — "Every file is an entry point" over `preserveModules`
To convert a file set to a distributable format while preserving structure + export signatures, the
recommended approach is **turning every source file into an entry point** (multiple `input` entries), NOT
`output.preserveModules` (which can over-tree-shake plugin-emitted virtual files and reproduces the
`node_modules/` dir into dist). Source:
[Jeremy Richardson — preserveModules for libraries](https://jeremyrichardson.dev/blog/vite-rollup-preservemodules-for-libraries),
[Rollup docs via DEV](https://dev.to/morewings/how-to-build-a-tree-shakable-library-with-vite-and-rollup-16cb).
→ glass-ui's `vite.library.ts` already globs `src/subpaths/*.ts` as entries. The SOTA refinement: glob the
REAL component/composable entry files directly (`src/components/custom/*/index.ts`,
`src/composables/*/index.ts`) as the multi-entry set, deleting the 79 mirror `src/subpaths/*.ts` files
entirely. Each `dist/<name>.js` still emits; one fewer indirection layer.

### Pattern 5.2 — `exports` subpath WILDCARD pattern removes manual per-entry listing
`package.json` `exports` supports one `*` per side: `"./*": { "types": "./dist/*.d.ts", "import": "./dist/*.js" }`
maps every dist entry without hand-listing 96 keys. Caveats: (a) automatic extension lookup is disabled
(explicit extensions required), (b) ANY file becomes importable so even internal-file changes become
semver-breaking — so scope the wildcard to a curated dir, OR keep an explicit curated key set for the public
surface. Sources: [Hiroki Osame — exports field guide](https://hirok.io/posts/package-json-exports),
[newline — exports and conditions](https://www.newline.co/courses/bundling-and-automation-in-monorepos/packagejson-exports-and-conditions),
[TS handbook — modules reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html).
→ BH 5.0.0 reshape: collapse the 96 hand-maintained `exports` keys. Two options — (A) curated explicit keys
(safer semver boundary, matches glass-ui's "binary publication" discipline + the `proof:subpath-enumeration`
gate; recommend this), or (B) a scoped wildcard over a curated `dist/` (less maintenance, weaker semver
fence). RECOMMEND **(A) curated explicit but GENERATED from the entry glob** (single source of truth =
the entry set; the gate verifies dist ≡ exports), so no hand-listing AND a hard public-surface boundary.

### Pattern 5.3 — Rolldown `codeSplitting` (formerly `advancedChunks`) + library mode
Vite 8 (Rolldown, stable ~Feb 2026) replaces esbuild+Rollup (~7.7x faster, ~50% less memory). It exposes
`output.codeSplitting` (renamed from `advancedChunks`) for declarative grouping + priority + size constraints.
Library mode is "simple and opinionated"; for advanced flows use tsdown / Rolldown directly. WARNING:
`advancedChunks`/`codeSplitting` can produce broken bundles via side-effects (re-confirms §4.2 `sideEffects`).
Sources: [Vite 8 Beta announcement](https://vite.dev/blog/announcing-vite8-beta),
[Vite Rolldown integration guide](https://vite.dev/guide/rolldown.html),
[Announcing Rolldown 1.0 RC — VoidZero](https://voidzero.dev/posts/announcing-rolldown-rc),
[vite issue #21414 — advancedChunks→codeSplitting rename](https://github.com/vitejs/vite/issues/21414).
→ BH should NOT chase Vite 8 migration as part of the cleanup (scope creep, BG-collision risk). BUT: the
multi-entry per-subpath model (§5.1) is the Rolldown-future-proof shape (per-entry chunks need no
`manualChunks`). Note glass-ui's CLAUDE already warns "Rolldown ignores `manualChunks` if `advancedChunks`
is set — never both." Keep that fence; track the `codeSplitting` rename for the eventual bump.

---

## 6. Tailwind v4 colocation

### Pattern 6.1 — Global `@theme`/`@utility` is the v4 config home; scoped SFC styles need `@reference`
v4 moves config from `tailwind.config.js` into CSS via `@theme` (tokens as CSS custom properties) and
`@utility` (replaces `@layer components/utilities` for variant-aware custom utilities). In SCOPED contexts
(Vue SFC `<style scoped>`), theme vars/utilities are NOT auto-available — either `@reference "main.css"` or,
preferred for perf, **use the CSS variable directly (`var(--color-brand-500)`) instead of `@apply`**.
Sources: [Tailwind v4 functions-and-directives](https://tailwindcss.com/docs/functions-and-directives),
[Tailwind v4 adding-custom-styles](https://tailwindcss.com/docs/adding-custom-styles),
[Tailwind v4.0 blog](https://tailwindcss.com/blog/tailwindcss-v4),
[LogRocket — Tailwind in 2026](https://blog.logrocket.com/tailwind-css-guide/).
→ glass-ui is token-first (every behaviour is a CSS custom property) — this IS the SOTA direction. The BH
CSS-colocation question: glass-ui keeps a GLOBAL cascade (`src/styles/`) for the shared design system AND
per-SFC `<style scoped>` for component-local. SOTA verdict: **global cascade for the design-token system +
cross-cutting recipes (correct — DRY, single source for the glass ladder); SFC-scoped only for genuinely
component-local geometry.** Audit for `@apply` in scoped blocks that should be direct `var()` reads (perf).
The CLAUDE `--reference` requirement for scoped blocks is real — verify build config injects it.

### Pattern 6.2 — Colocated styling reduces context-switching (the v4 + LLM-era argument)
Style colocation (utilities in markup) eliminates CSS-file context-switching; an LLM-era bonus is that
models trained on Tailwind HTML generate styled components directly.
Source: [Tailwind v4.0 blog](https://tailwindcss.com/blog/tailwindcss-v4), [LogRocket](https://blog.logrocket.com/tailwind-css-guide/).
→ Supports keeping utility classes inline in templates (don't extract to scoped CSS unless geometry demands
it). The `:deep()`/scoped-CSS reductions BH wants align with this — push toward token `var()` + inline
utilities, away from brittle scoped selectors.

---

## 7. Non-idiomatic Tailwind / cn() / cva / brittle-selector anti-patterns to detect

### Pattern 7.1 — `cn()` = clsx + conflict resolver is the canonical merge seam
`cn()` combining `clsx` + a conflict resolver (tailwind-merge upstream; glass-ui ships its own hand-rolled
deduplicator since v0.9.2) is the standard. CVA defines variants; the merge layer resolves host-override
conflicts (`p-4` vs `p-8`). Wrap CVA output through `cn()`/twMerge for predictable overrides.
Sources: [DEV — Tailwind patterns that scale: cva, cn(), tokens](https://dev.to/whoffagents/tailwind-css-patterns-that-actually-scale-cva-cn-and-design-tokens-3cbo),
[cva docs](https://cva.style/docs), [shuvo.dev — scaling with tailwind-merge + cva](https://shuvo.dev/blogs/scaling-tailwind-css-components-with-tailwind-merge-and-cva).
→ glass-ui's hand-rolled `cn.ts` deduplicator is a DELIBERATE keep (CLAUDE documents it; do NOT "upgrade"
back to tailwind-merge). BH should verify the deduplicator still correctly handles the v4 arbitrary-selector
tokens and the `:not([class*=size-])` guards (CLAUDE notes this) — gate on a UNIT TEST of conflict buckets,
not prose.

### Pattern 7.2 — Anti-patterns to scan for (the BH "non-idiomatic" lint band)
From the design-token/cva scaling literature + general CSS hygiene, the detectable anti-patterns:
- **`:deep()` / `:slotted()` / `> [data-slot]` brittle scoped reaches** — glass-ui has 16 `:deep(` usages.
  SOTA: prefer a consumer-readable CSS custom property (`var(--token, fallback)`) over reaching into a
  child's internals (glass-ui's own `MetricRow --metric-row-* ` precedent — "component-over-class" axis).
  Audit each of the 16; keep only where a scoped-slot selector is unavoidable (CardHeader `:slotted` shrink
  lanes), kill the rest in favour of tokens.
- **Magic numbers / opaque `calc()` chains / raw viewport units / hardcoded z-index** — replace with named
  tokens. glass-ui is largely token-first already; the BH sweep should grep for `z-[0-9]`, raw `px`/`vh`
  literals in SFCs, and inline `calc()` that should be a `--token`.
- **`@apply` overuse in scoped blocks** (§6.1) — prefer `var()`.
- **Raw-Tailwind off-token colors** (`bg-emerald-500`) — glass-ui's `proof:glass-cohesion` already bans
  these; generalize the rule.
Sources: [DEV — cva/cn/tokens that scale](https://dev.to/whoffagents/tailwind-css-patterns-that-actually-scale-cva-cn-and-design-tokens-3cbo),
[Medium — twMerge conflict resolution](https://medium.com/@settahkader/mastering-tailwind-css-resolving-class-conflicts-with-twmerge-and-custom-configurations-5ff2853abf2d).

---

## 8. Consolidated "patterns to adopt" → BH band map

| # | Pattern (cited) | BH band | Action |
|---|---|---|---|
| P1 | Feature-folder colocation (alexop, DEV) | colocation | KEEP+extend `custom/<feat>/` shape; canon it in new docs home |
| P2 | `use`-prefix + named exports + ref-return + `MaybeRefOrGetter`/`toValue` (Vue docs, DEV) | composable-hygiene | lint sweep; reactive-blob + positional-arg flags |
| P3 | Split monolith composables (DEV) | god-module-split | carve the 16 >500L files by responsibility (GlassDock 711, createCanvasLifecycle 695, useWebGPUCanvas 606, useDockFission 604, api/index 505 first) |
| P4 | Pure helpers outside scope (DEV) | god-module-split | land carved helpers in `*-core.ts`/`constants.ts` pure leaves |
| P5 | 3-tier DI rule + `createStrictContext` fail-explicit (mokkapps, VueSchool) | DI/encapsulation | canon the context factory as THE DI seam; verify provide/inject triplets routed through it (EVIDENCE) |
| P6 | Per-component dir + per-part SFC + local `index.ts` + co-exported CVA (shadcn-vue) | structure | KEEP `ui/`+`custom/` shape; fold variant TYPES to per-component, dissolve `api/index.ts` god-barrel |
| P7 | Kill mirror barrels; granular entrypoints (thepassle, uglow) | export-reshape (5.0.0) | DELETE `src/subpaths/` 79 mirror files |
| P8 | `sideEffects` correct (Vite #5174) | export-reshape | verify CSS-only side-effects declared, JS subpaths pure |
| P9 | Multi-entry "every file is an entry" over preserveModules (J.Richardson) | build | glob real `*/index.ts` entries in `vite.library.ts`; drop subpath glob |
| P10 | `exports` curated-but-GENERATED from entry glob (Hiroki Osame, TS handbook) | export-reshape | single source = entry set; gate dist≡exports; collapse 96 hand keys |
| P11 | Global `@theme`/`@utility` + `var()` over `@apply` in scoped (Tailwind v4 docs) | css-hygiene | audit scoped `@apply`→`var()`; keep global cascade for tokens |
| P12 | Token `var(--x, fallback)` over `:deep()` brittle reach (cva/token lit) | selector-hygiene | audit 16 `:deep(`; keep only unavoidable scoped-slot; rest→tokens |
| P13 | `cn()`/cva merge canon; keep hand-rolled deduplicator (cva docs, CLAUDE) | css-hygiene | unit-test conflict buckets; do NOT revert to tailwind-merge |

## 9. Things SOTA says glass-ui already does RIGHT (do not relitigate / don't "fix")
- Feature-dir colocation; `use`-prefix; per-component dir + per-part SFC + co-exported CVA — all current SOTA.
- Token-first design system in a global cascade — the v4-correct shape (don't shatter the cascade into SFCs).
- Hand-rolled `cn()` deduplicator — deliberate, documented keep.
- No Pinia in a library; typed `createStrictContext` DI — the 2026 library DI idiom.
- Tests in a mirror tree (not in src) — correct for a PUBLISHED lib (SOTA's "co-locate tests" applies to apps).

## 10. Net steer for BH (research-grounded)
1. The 79 mirror-barrels + 96 hand `exports` + 505-line `api/index.ts` are the THREE redundancy layers the
   barrel-anti-pattern + multi-entry + wildcard-exports literature jointly condemn → collapse to ONE source
   of truth: the real per-feature `index.ts` entry set, glob it for both the vite multi-entry AND the
   generated `exports` map, dissolve `api/index.ts` (types live at their component).
2. The 16 >500L god-modules map 1:1 to the "split monolith composables / single-responsibility" SOTA → carve
   by responsibility into pure-core + thin-shell leaves (glass-ui's own railProjection/virtualSectionLayout
   precedent is the model).
3. Selector + Tailwind hygiene: push `:deep()`→`var(--token)`, scoped `@apply`→`var()`, magic numbers→tokens.
4. Don't chase Vite 8/Rolldown migration in BH (scope + BG-collision); just adopt the multi-entry shape that
   is Rolldown-future-proof and verify `sideEffects`.

---

### Sources
- https://alexop.dev/posts/how-to-structure-vue-projects/
- https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk
- https://vuejs.org/guide/reusability/composables
- https://mokkapps.de/blog/vue-state-management-composables-provide-inject-pinia
- https://vueschool.io/articles/vuejs-tutorials/composables-vs-provide-inject-vs-pinia-when-to-use-what/
- https://iamjeremie.me/post/2025-01/composables-vs-pinia-vs-provide-inject/
- https://www.shadcn-vue.com/docs/changelog
- https://github.com/unovue/shadcn-vue
- https://dev.to/jacobandrewsky/shadcn-vue-elegant-customizable-ui-components-for-modern-vue-apps-cd
- https://dev.to/thepassle/a-practical-guide-against-barrel-files-for-library-authors-118c
- https://uglow.medium.com/burn-the-barrel-c282578f21b6
- https://steven-lemon182.medium.com/are-typescript-barrel-files-an-anti-pattern-72a713004250
- https://github.com/webpack/webpack/discussions/16863
- https://jeremyrichardson.dev/blog/vite-rollup-preservemodules-for-libraries
- https://dev.to/morewings/how-to-build-a-tree-shakable-library-with-vite-and-rollup-16cb
- https://github.com/vitejs/vite/issues/5174
- https://vite.dev/blog/announcing-vite8-beta
- https://vite.dev/guide/rolldown.html
- https://voidzero.dev/posts/announcing-rolldown-rc
- https://github.com/vitejs/vite/issues/21414
- https://hirok.io/posts/package-json-exports
- https://www.newline.co/courses/bundling-and-automation-in-monorepos/packagejson-exports-and-conditions
- https://www.typescriptlang.org/docs/handbook/modules/reference.html
- https://tailwindcss.com/docs/functions-and-directives
- https://tailwindcss.com/docs/adding-custom-styles
- https://tailwindcss.com/blog/tailwindcss-v4
- https://blog.logrocket.com/tailwind-css-guide/
- https://dev.to/whoffagents/tailwind-css-patterns-that-actually-scale-cva-cn-and-design-tokens-3cbo
- https://cva.style/docs
- https://shuvo.dev/blogs/scaling-tailwind-css-components-with-tailwind-merge-and-cva
