# API + COLOCATION — SOTA research (KS-C · lane API researcher)

**Date** 2026-07-01 · **HEAD** `f6fa1767` (tranche/BG) · **Scope** research-only; feeds `KS-API-COLOCATION.md`
(the F6-band + BH.B2 keystone). Cites corpus `file:line`; names/links SOTA. Fences: siblings read-only;
the per-subpath JS split + 1-GL-per-route budget + `useSurfaceAxis` grammar model are PROTECTED (SYNTHESIS §4);
5.0.0 is the free clean break; write only this file.

Lane waves this grounds: **F6.1** BH.W-AXIS-GRAMMAR · **F6.2** BH.W-SIZE-UNIFY · **F6.3** BH.W-MOTION-AXIS ·
**F6.5** W-GOD-MODULE-STRUCTURAL · **W-COLOCATE** · **W-DEAD-SWEEP** · **W-DESHADCN** ·
**BH.B2-export-reshape** · **BH.B2-leaf-verify** (+ the `/axes` types-only subpath).

---

## 1. The hallmark delineated — what the API IS

glass-ui's structural signature is **a world-class material behind ONE legible grammar**. A stranger reads
the library by two facts: (a) every visual behaviour is a CSS custom property a consumer retunes from
`:root` with zero library edit (token-first, J-invariant), and (b) every component speaks the SAME small set
of orthogonal axes — a look axis, a scale axis, a surface-decoration axis, a motion axis — never a per-component
dialect. The disease the RESPEC audit named (`SYNTHESIS-PASS1.md:10-24`) is that the MATERIAL is excellent but
the SKELETON over-articulated: 96 export entries, homonym axes (`surface` means the {glass·veil·opaque}
decoration on Card but the indicator-plate boolean on TabsIndicator), a `default` size rung that hides its own
scale, a 7-boolean motion scatter, a 711-line `GlassDock.vue`, and a `shadcn`-inherited idiom that never got
owned. KS-API-COLOCATION's job: collapse the grammar to ONE vocabulary (`_shared/axes.ts`), decompose the
god-modules ONCE against a hardened ratchet CONTRACT, sweep the dead exports, own the idiom (de-shadcn), and
reshape the export surface at the 5.0.0 free break — WITHOUT touching the protected material identity.

The bar: **a consumer learns three axis words once and every component obeys them; a bundler pulls exactly
one component's chunk and nothing else; a major-version migration is a mechanical rename map, never a silent
break.**

---

## 2. SOTA research — findings, ADOPT / REJECT, links

### 2.1 Prop-grammar convergence — the 2026 headless/styled landscape

- **The converged axis names.** Across the styled + headless field the vocabulary has settled: `variant`
  (the LOOK/intent axis) + `size` (the SCALE axis) + `orientation` (the layout axis), with cva
  (`class-variance-authority`) as the near-universal expression — base styles, a `variants` object, a
  `defaultVariants` block ([shadcn Button `variant`/`size`](https://www.shadcn.io/ui/button);
  [cva scaling Tailwind](https://dev.to/i3b/using-cva-class-variance-authority-to-scale-tailwindcss-3jgj);
  [Storybook · CVA design systems](https://stevekinney.com/courses/storybook/class-variance-authority)).
  **ADOPT — glass-ui already speaks it** (`buttonVariants`/`toggleVariants`/`badgeVariants` co-exported per
  CLAUDE.md §Component architecture). F6.1's job is to make the axis SET explicit + homonym-free, not to
  re-invent names.
- **The community PUNISHES two things.** (1) Renaming an axis across a boundary without a codemod — the most
  widely-taught breaking-change example in the field is literally Button `type` → `variant`, always shipped
  WITH `npx @company/ds-codemod` ([Hypermod · automating DS evolution](https://www.hypermod.io/blog/7-automating-design-system-evolution);
  [Martin Fowler · codemods for API refactoring](https://martinfowler.com/articles/codemods-api-refactoring.html)).
  (2) A HOMONYM — the same prop name meaning different things on different components (the exact `surface`
  overload the audit found). **ADOPT both lessons:** F6.1 kills the homonym (`TabsIndicator surface`→`plate`;
  GlassPanel `variant`→`tier`); every F6.1/F6.2/F6.3 rename ships a MIGRATION row + a rename-map line (§2.5).
- **Radix `asChild` vs Base UI render-prop vs Ark state-machine.** Radix threads composition through
  `asChild` (Slot merges child props over `$attrs`); Base UI (2026) prefers an explicit render prop and a
  single consolidated dependency; Ark UI drives complex components with XState machines and ships across
  React/Vue/Solid ([Base UI vs Radix vs Ark — PkgPulse 2026](https://www.pkgpulse.com/guides/base-ui-vs-radix-ui-vs-ark-ui-guide-for-headless-react-components-2026);
  [Base vs Radix variants — DeepWiki](https://deepwiki.com/shadcn-ui/ui/6.3-base-vs-radix-component-variants);
  [LogRocket · headless alternatives](https://blog.logrocket.com/headless-ui-alternatives/)).
  **ADOPT the `asChild`/Slot discipline as the composition seam** (glass-ui rides reka-ui = the Vue Radix port;
  the ToggleGroup `role` override already documents the `mergeProps(attrs, child.props)` fact). **REJECT**
  importing Base UI's render-prop or Ark's XState — reka is the substrate; the grammar wave is about the PROP
  SURFACE, not the primitive engine.
- **The `default` size anti-pattern.** shadcn ships `size: default | sm | lg` — naming the MIDDLE SCALE RUNG
  `"default"` conflates "the default value" with "the medium size," so `size="default"` reads as a non-answer
  and can't be reasoned about on a scale ([shadcn size discussion](https://github.com/shadcn-ui/ui/discussions/4098)).
  **ADOPT the fix (F6.2):** the middle rung is `md`; `sm|md|lg` is an honest ordinal scale, and `md` stays the
  `defaultVariants` value (default-ness is a cva concern, not a rung NAME).

### 2.2 Token-first theming — CSS custom properties vs theme objects

- **The runtime-token layer is the SOTA, and it is CSS custom properties.** The 2026 consensus: design tokens
  land as CSS variables resolved at runtime through the cascade; a three-layer split (global primitives →
  semantic → component) lets a consumer retheme by overriding ONLY the semantic layer at `:root` or a scoped
  selector — components never change; this is the only real path to flash-free instant dark mode
  ([webtoolshub · DS in 2026](https://www.webtoolshub.online/blog/css-variables-design-tokens-dark-mode-system-2026);
  [penpot · tokens + CSS variables](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/);
  [Fluent UI design tokens](https://learn.microsoft.com/en-us/fluent-ui/web-components/design-system/design-tokens);
  [Vuetify theming](https://0.vuetifyjs.com/guide/features/theming)). **ADOPT — glass-ui is already the
  reference implementation** (the `--glass-*` ladders, `light-dark()`/`.dark` arms, the `--dock-scale`
  re-declare seam, the substitution-vs-inheritance discipline). This VALIDATES the KEEP: the grammar waves
  reshape the TS PROP surface, they must NOT convert the token model to a JS theme object (that would forfeit
  runtime-retune + FOUC-safety). F6.3's `Motion` prop is a CSS-var-BACKED enum (`full|reduced|off` writes
  `--motion-weight`), the same inversion at the prop + CSS layer (SYNTHESIS ruling #6).
- **REJECT the theme-object temptation.** A JS theme object (the Fluent/token-provider pattern for
  frameworks that lack cascade-native theming) buys typed autocomplete at the cost of runtime retune and a
  provider wall. glass-ui's identity is the cascade; the typed surface is the `/api` types layer + the new
  `/axes` types, NOT a `<ThemeProvider>`.

### 2.3 Package-exports architecture — subpath exports at scale, tree-shaking reality

- **The barrel is the trap; the per-subpath split is the cure — and glass-ui already made the cut.** The
  field's hardest-won lesson: importing ONE symbol from a root barrel drags the whole module graph — measured
  as 210-255KB first-load JS for a single Button, +123 modules for one `http` import, and Atlassian's
  **75% faster Jira builds** after removing barrels
  ([practical guide against barrels](https://dev.to/thepassle/a-practical-guide-against-barrel-files-for-library-authors-118c);
  [the barrel trap](https://dev.to/elmay/the-barrel-trap-how-i-learned-to-stop-re-exporting-and-love-explicit-imports-3872);
  [hidden costs of barrel files](https://articles.wesionary.team/the-hidden-costs-of-barrel-files-25de560b9f63)).
  **ADOPT — glass-ui's 72-JS-subpath split IS this cure** (each `dist/<name>.js` tree-shakes independently;
  the root barrel is deliberately vueuse-FREE so it can't drag the heavy leaves). The protected-set fences it
  (SYNTHESIS §4). The disease was never "too many subpaths" — a per-component subpath is CORRECT; the disease
  is the 96 EXPORT ENTRIES carrying homonyms, dead entries, and the `goo-blob` mis-name.
- **"How many import paths is too many?"** The guide's heuristic ("sensible grouping; msw split ONE barrel
  into FIVE entrypoints; 5-6 categories for a moderate lib") is for a UTILITY library. For a COMPONENT
  library the honest unit is one-family-per-subpath (the substrate-isolation invariant) — the count is high
  BY DESIGN and correct, PROVIDED (a) the root barrel stays free of the heavy leaves and (b) `sideEffects`
  is accurate. **ADOPT the reframing:** BH.B2-export-reshape's win is NOT "fewer subpaths"; it is
  net-indirection LOC DOWN + zero dead/homonym/mis-named entries + `sideEffects` correctness (the CSS-import
  side-effect must NOT be stripped).
- **Rolldown/Vite 8 tree-shaking reality (2026).** Rolldown (the Rust bundler unifying Vite dev+build,
  replacing esbuild+Rollup) does STATEMENT-LEVEL tree-shaking (dead exports removed below module
  granularity), but it trusts `sideEffects` STRICTLY — a wrong `sideEffects: false` drops a layout
  stylesheet and renders unstyled, and Vite 8 has live SSR regressions removing side-effect-only imports
  ([Vite 8 SSR regression #608](https://github.com/vitejs/rolldown-vite/issues/608);
  [Vite 8 sideEffects allowlist #22620](https://github.com/vitejs/vite/issues/22620);
  [tree-shakable lib with Vite/Rollup](https://dev.to/morewings/how-to-build-a-tree-shakable-library-with-vite-and-rollup-16cb)).
  **ADOPT as a hard BH.B2 acceptance clause:** the export reshape must re-verify `sideEffects` (the `/styles`
  + font CSS entries are TRUE side effects and must be allowlisted, NEVER blanket-`false`), and the
  `verify-export-types` + `subpath-enumeration` + `diff -r dist/styles` EMPTY probes are the regression floor.
  **REJECT** a blanket `sideEffects: false` — it is the exact Rolldown footgun for a CSS-shipping library.

### 2.4 Colocation / module law in big TS design systems

- **Feature-folder wins in the frontend; god-module prevention is a CONTRACT, not a code review.** The 2026
  read: vertical-slice/feature folders beat layer folders for frontend adaptability, teams work without
  barrel conflicts, and dead-feature elimination is cleaner; a folder's barrel is its PUBLIC INTERFACE
  (everything else is implementation detail); and architecture is best ENFORCED, not hoped for — `tsarch`-style
  fitness functions assert layering as a test ([feature vs layer folders 2025](https://dev.to/pramod_boda/recommended-folder-structure-for-nodets-2025-39jl);
  [tsarch for AI agents](https://www.angulararchitects.io/en/blog/architecture-beyond-layers-tsarch-for-ai-agents/);
  [JS module system = first architecture decision](https://css-tricks.com/the-javascript-module-system-architecture/)).
  **ADOPT — glass-ui's `custom/<feature>/` colocation (components + `composables/` + `constants.ts` +
  `shaders/` + README) IS the feature-slice model, and `proof:no-god-module` + `proof:colocation` are the
  fitness-function contract made machine-real.** F6.5's decomposition should cut along ENGINE SEAMS
  (measure/spring/hit/reserve — the single-writer of a scalar is the load-bearing boundary), NOT arbitrary
  line-count splits — the vertical-slice discipline.
- **The barrel-vs-explicit-import nuance for INTERNAL modules.** The same articles warn barrels obscure the
  real dependency graph when imports resolve through re-exports rather than to source. **ADOPT:** the F6.5
  ratchet + W-COLOCATE keep per-feature barrels (the public interface) but the carved leaves import each
  other by SOURCE path (the AV.W14 relative-import discipline the repo already runs). The god-module contract:
  a NEW baseline over 500L needs a companion carve-successor wave-id OR the cap — the ratchet is the standing
  fitness function, drained to a VISIBLE cut gate (F6.5 makes the 16-baseline drain the tag-cut condition).
- **The shader/generated-content exemption.** A `.glsl.ts`/`.wgsl.ts` shader string is a single indivisible
  literal — line-count carving it is meaningless and would break the GL fence. **ADOPT the STRICT-shape
  exemption:** `*.{wgsl,glsl,frag,vert}.ts` shader-exempt + `property-regs.css` as a `css-registration-manifest`
  class (declaration-list only; any selector-block/logic disqualifies — the CRIT-3 WATCH-2 strict check). This
  is the "generated/manifest content is not a god-module" carve, precisely bounded so it can't be abused.

### 2.5 Clean-break major-version migration — codemods, rename maps, praise vs hate

- **Consumers PRAISE codemods + rename maps + a MIGRATION doc; they HATE silent renames.** The unanimous
  field position: a major that renames APIs / changes import paths / drops deprecated features MUST ship a
  migration guide and codemods; the canonical praised example is a rename shipped WITH an automated codemod
  (Button `type`→`variant`; Vercel AI SDK 5 shipped July-2025 with codemods for "the easy parts")
  ([DSP · major/minor/patch](https://designsystemproblems.com/versioning-releases/major-minor-patch-releases/);
  [versioning without breaking client sites](https://www.designsystemscollective.com/versioning-your-design-system-without-breaking-client-sites-93b7c652f960);
  [Vercel AI SDK 5 migration 2026](https://www.pkgpulse.com/guides/vercel-ai-sdk-5-migration-2026);
  [Morningstar · versioning + breaking changes](https://designsystem.morningstar.com/getting-started/versioning-and-breaking-changes/)).
  **ADOPT for 5.0.0 — this is the whole no-legacy discipline done RIGHT:** every clean break in this lane
  (`goo-blob`→`blob`, `--ring`→`--focus-ring-color`, `default`→`md`, `surface`→`plate`/`tier`, the
  `--corner-shape-*` + `selectableChipVariants` deletes, the density→size merge) is a MIGRATION.md row +
  a rename-map LINE. The library's no-alias law (memory: no-backwards-compat) is HONORED not by silence but
  by a complete rename map at the free break — "clean break" and "mechanical migration" are the SAME act.
- **The rename-map as an artifact (the KS ADD, recorded as a fold-candidate note for the orchestrator).**
  The strongest field practice is a MACHINE-READABLE rename map (`{ from, to, kind }` rows) that (a) drives
  MIGRATION.md generation and (b) COULD back a codemod. glass-ui ships no codemod runner today; a full
  jscodeshift codemod is over-scope for BG. **ADOPT the middle path:** BH.B2-export-reshape emits the rename
  map as the MIGRATION table's source-of-truth (the 203-row `/api` map arm already regenerates the export set
  — the rename lines ride it), and a codemod is booked as a successor-tranche seed IFF a consumer asks (the
  ≥2-consumer discipline applies to tooling too). **REJECT** hand-writing a codemod now (no consumer demand;
  the four siblings migrate by-name).
- **The peer-bump discipline.** A major that also bumps peers must do it at ONE site (the constellation
  reads glass-ui as version authority). **ADOPT — BH.B2-export-reshape is the SOLE peer-bump site**
  (kf `^5.0.0→^5.1.0`, value.js `^1.0.0→^1.1.1`, NEVER `^1.2.0`); it closes the WS7→WS12
  `proof:peer-conformance` born-RED window. No other wave touches `package.json` peers.

---

## 3. Corpus grounding (build on; never re-derive) — the disk reality

| Fact | Location | KS implication |
|---|---|---|
| `Surface` union already 4-member (`glass·veil·opaque·clear`) + `surfaceClass` resolver, homonym-free HOME | `src/components/ui/_shared/useSurfaceAxis.ts:1-40+` | F6.1 mints `_shared/axes.ts` as the ONE axis home; `Surface` stays 4-member; `cartoon` STAYS off it (Card-local) |
| 96 export entries; 72 JS subpaths + CSS/font entries | `package.json exports` (verified: 96 keys) | BH.B2 net-indirection must DROP; `/axes` adds a TYPES-ONLY entry (zero JS weight) |
| homonym: `surface` = decoration on Card, plate-boolean on TabsIndicator | plan F6.1 row; `TabsIndicator surface`→`plate` | kill the homonym (§2.1) |
| `default` middle size rung (shadcn inheritance) | plan F6.2 row (`default`→`md`) | honest ordinal `sm\|md\|lg` (§2.1) |
| 7-boolean motion scatter → ONE `Motion` enum | plan F6.3 row (`full\|reduced\|off`) | CSS-var-backed enum, same inversion as F5.2 (§2.2) |
| `GlassDock.vue` 711L · `ladder.css`/`shell.css` god-modules; 16-baseline ratchet | plan F6.5 row; `proof:no-god-module` | decompose along ENGINE seams; ratchet = fitness contract; VISIBLE drain (§2.4) |
| `createCanvasLifecycle`695 + `useWebGPUCanvas`606 → 10.12; luma534 → SOLE 10.13; SegmentedTabs512; std140-builder | plan W-COLOCATE row | 3 dir moves; `[data-size]` inline KEPT; reader gates FOLLOW into leaves |
| dead: `--corner-shape-card/-pill`; `selectableChipVariants.ts` alias | plan W-DEAD-SWEEP row | clean-break delete + MIGRATION (§2.5); runs FIRST (net-negative) |
| shadcn idiom un-owned: `--ring`, no-shadcn-default 233-file sweep | plan W-DESHADCN row | own the material; `--ring`→`--focus-ring-color` break; tailwind-v4-idiom |
| `goo-blob`→`blob` rename pinned to the reshape regen wave | R14; BH.B2-export-reshape row | rename LINE + MIGRATION row; 5.0.0 free break |
| sole peer-bump; `verify-export-types`+`subpath-enumeration`+`diff -r dist/styles` EMPTY | BH.B2-export-reshape row | `sideEffects` re-verify (§2.3); the CSS entries are TRUE side effects |
| `@property` inheriting tokens back the axis enums (`--glass-level`/`--motion-weight`) | protected set §4; property-regs | grammar prop = CSS-var write, cascade-native (§2.2) |

---

## 4. First-principles hooks per assigned wave (what the SOTA SHARPENS)

- **F6.1 AXIS-GRAMMAR.** Mint `_shared/axes.ts` as the SINGLE axis vocabulary home — no private
  surface/tier/density union may exist outside it (the machine-locked "one grammar" clause). `Surface` stays
  4-member; `cartoon` STAYS a Card-local superset (not a {glass·veil·opaque·clear} member — the DAG §5
  second-axis prohibition). Kill the homonyms: `GlassPanel variant`→`tier`, `TabsIndicator surface`→`plate`
  (§2.1 — a homonym is the field's most-punished API sin). Publish `/axes` as a TYPES-ONLY subpath, GENERATED
  from `axes.ts` (zero JS weight — types distribution as a separate concern, the `/api` precedent). Every
  rename → MIGRATION row + rename-map line (§2.5). Sequenced after B2.1-mech (landed), BEFORE B2.1-swap regen.
- **F6.2 SIZE-UNIFY.** Clean-break `density`/`size` → ONE `Size` axis; the middle rung `default`→`md` (§2.1,
  the honest ordinal); ONE compactness word (the density ladder and the size ladder are the SAME scale — two
  names for one axis is the homonym in mirror). AFTER F6.5 (decompose the dock BEFORE density→size so the
  carved leaves rename once). MIGRATION rows for every `default`→`md` + `density`→`size` call site.
- **F6.3 MOTION-AXIS.** Collapse the 7-boolean motion scatter → ONE `Motion` enum (`full|reduced|off`) — the
  "boolean prop explosion" anti-pattern (Base UI/Radix keep few ORTHOGONAL props, never N booleans that
  encode one axis). CSS-var-backed (`--motion-weight`), so the prop and the F5.2 CSS default are the same
  inversion at two layers (SYNTHESIS ruling #6). PRM maps to `reduced`; `off` is the hard opt-out.
- **F6.5 GOD-MODULE-STRUCTURAL.** Decompose ONCE along ENGINE seams (§2.4 — single-writer-of-a-scalar is the
  boundary, not line count): `GlassDock`/`ladder.css`/`shell.css` < 500. Harden the ratchet as the standing
  fitness CONTRACT: a new baseline needs a companion carve-successor wave-id OR the cap; the STRICT-shape
  shader-exempt (`*.{wgsl,glsl,frag,vert}.ts`) + `property-regs.css` css-registration-manifest exempt
  (declaration-list only). Make the 16-baseline drain chain VISIBLE = a tag-cut gate (`RATCHET_BASELINES ==
  {}`). BEFORE F6.2.
- **W-COLOCATE.** The WS4 carve fold — feature-slice colocation (§2.4): 3 dir moves + carve the oversize
  leaves (`createCanvasLifecycle`, `useWebGPUCanvas`, `useGlassBackdropLuminance` to SOLE owner, `SegmentedTabs`,
  timeline, Slider partials, std140-builder). `[data-size]` inline KEPT (structural-arbitrary precompile, not
  a colocation target). Reader gates FOLLOW the carve into the leaf (the `proof:webgl-substrate-single`
  precedent — asserts follow composition). AFTER WS5 (viz).
- **W-DEAD-SWEEP.** Runs FIRST (net-negative). Clean-break DELETE + MIGRATION per symbol (§2.5): cut
  `--corner-shape-card/-pill` (with the `proof:squircle-language` negative-guard so a re-mint reds), delete
  `selectableChipVariants.ts` (alias-kill). Dead EXPORTED code is a gestalt lie at a major (SYNTHESIS
  ruling #2 — the `useHaptic`/`useCelebrationBurst` class); the sweep is the no-legacy law made mechanical.
- **W-DESHADCN.** ONE concern (the WS4/WS10 split dies). OWN the idiom: a published library is NOT a
  copy-paste shadcn starter — shadcn's patterns (`--ring`, the vendored variant recipes) are a STARTER
  convention, not a dependency-library API. De-shadcn HEAD-mode + no-shadcn-default 233-file sweep +
  tailwind-v4-idiom + the `--ring`→`--focus-ring-color` break (the token-first `.focus-ring` divergence the
  library already owns, completed) + the binding-sweep (stale reka-ui prop/emit no-ops — memory: glass-ui
  binding verification). AFTER WS4 W0 + WS3-M5 (3.5).
- **BH.B2-export-reshape.** The FINAL `package.json` writer + SOLE peer-bump (§2.3/§2.5). Re-verify
  `sideEffects` accuracy (the CSS/font entries are TRUE side effects — never blanket-`false`, the Rolldown
  footgun). `verify-export-types` + `subpath-enumeration` re-pinned + the 203-row `/api` map arm +
  `diff -r dist/styles` EMPTY. `goo-blob`→`blob` rename LINE + MIGRATION row (R14). Closes the born-RED
  peer-conformance window. Net-indirection LOC MUST DROP (the measure — the reshape is a COLLAPSE, not a grow).
- **BH.B2-leaf-verify.** Verify the BG-landed leaves (GlassDock/fission/canvas/tabs/luma/blob/goo-dot) and
  re-point BH reader-gates IFF BG's landed leaf diverged. ONE row, 3 preconds (WS2·WS4·WS5). Pure verify —
  the SOTA lesson is the reader-gates-FOLLOW-composition discipline (§2.4).

---

## 5. Gestalt bar (the acceptance language KS-API-COLOCATION inherits)

- **One grammar** — a consumer learns `variant` (look) · `Size` (`sm|md|lg`, `md` default) · `Surface`
  (`glass|veil|opaque|clear`) · `Motion` (`full|reduced|off`) ONCE, and EVERY component obeys; zero homonyms
  (no prop name means two things); zero private axis union outside `_shared/axes.ts`.
- **Tree-shaking honesty** — a bundler pulls exactly one family's chunk (`dist/<name>.js`) and nothing else;
  the root barrel drags no heavy leaf; `sideEffects` is accurate (CSS never stripped); net-indirection LOC
  DROPS at the reshape.
- **God-module contract** — `GlassDock`/`ladder.css`/`shell.css` < 500; the ratchet is a standing fitness
  function drained to a VISIBLE tag-cut gate; shader + registration-manifest exemptions strictly bounded.
- **Clean break = mechanical migration** — every rename ships a MIGRATION row + rename-map line; no silent
  break, no legacy alias; the free 5.0.0 break is a complete rename map, not a wall of surprises.
- **Token-first preserved** — the grammar reshapes the TS prop surface; the CSS-custom-property runtime-retune
  model is UNTOUCHED (the axis enums WRITE CSS vars; no JS theme object, no provider wall, FOUC-safe).

---

## 6. Fences honored

Siblings read-only (the four constellation repos migrate by-name; every sibling change is a BY-NAME ASK,
never an edit) · the per-subpath JS split + `useSurfaceAxis` grammar model + `--glass-level`/`--motion-weight`
token model PROTECTED (SYNTHESIS §4) · `_shared/axes.ts` is the ONE axis home, `cartoon` STAYS Card-local ·
5.0.0 is the free clean break, every rename carries a MIGRATION row · `sideEffects` never blanket-`false`
(CSS side effects) · DOCK_SPRING + identity values untouched (this lane is structural, zero paint) · wrote
ONLY this file.

### Sources
- [shadcn Button (`variant`/`size`)](https://www.shadcn.io/ui/button) · [cva scaling Tailwind](https://dev.to/i3b/using-cva-class-variance-authority-to-scale-tailwindcss-3jgj) · [CVA design systems (Storybook)](https://stevekinney.com/courses/storybook/class-variance-authority) · [shadcn size discussion #4098](https://github.com/shadcn-ui/ui/discussions/4098)
- [Base UI vs Radix vs Ark — PkgPulse 2026](https://www.pkgpulse.com/guides/base-ui-vs-radix-ui-vs-ark-ui-guide-for-headless-react-components-2026) · [Base vs Radix variants — DeepWiki](https://deepwiki.com/shadcn-ui/ui/6.3-base-vs-radix-component-variants) · [LogRocket · headless alternatives](https://blog.logrocket.com/headless-ui-alternatives/) · [GreatFrontend · top headless 2026](https://www.greatfrontend.com/blog/top-headless-ui-libraries-for-react-in-2026)
- [DS in 2026 (CSS vars + tokens)](https://www.webtoolshub.online/blog/css-variables-design-tokens-dark-mode-system-2026) · [penpot · tokens + CSS variables](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) · [Fluent UI design tokens](https://learn.microsoft.com/en-us/fluent-ui/web-components/design-system/design-tokens) · [Vuetify theming](https://0.vuetifyjs.com/guide/features/theming)
- [practical guide against barrels](https://dev.to/thepassle/a-practical-guide-against-barrel-files-for-library-authors-118c) · [the barrel trap](https://dev.to/elmay/the-barrel-trap-how-i-learned-to-stop-re-exporting-and-love-explicit-imports-3872) · [hidden costs of barrel files](https://articles.wesionary.team/the-hidden-costs-of-barrel-files-25de560b9f63) · [webpack · barrel discussion #16863](https://github.com/webpack/webpack/discussions/16863)
- [tree-shakable lib with Vite/Rollup](https://dev.to/morewings/how-to-build-a-tree-shakable-library-with-vite-and-rollup-16cb) · [Vite 8 SSR sideEffects regression #608](https://github.com/vitejs/rolldown-vite/issues/608) · [Vite 8 sideEffects allowlist #22620](https://github.com/vitejs/vite/issues/22620) · [Vite 6 optimization 2026](https://pavanrangani.com/blog/vite-6-build-tool-optimization-guide)
- [feature vs layer folders 2025](https://dev.to/pramod_boda/recommended-folder-structure-for-nodets-2025-39jl) · [tsarch for AI agents](https://www.angulararchitects.io/en/blog/architecture-beyond-layers-tsarch-for-ai-agents/) · [JS module system = first architecture decision](https://css-tricks.com/the-javascript-module-system-architecture/) · [barrel files in 2026 (dissent)](https://codecompose.com/articles/why-i-prefer-barrel-files-in-2026/)
- [Hypermod · automating DS evolution (codemods)](https://www.hypermod.io/blog/7-automating-design-system-evolution) · [Martin Fowler · codemods for API refactoring](https://martinfowler.com/articles/codemods-api-refactoring.html) · [DSP · major/minor/patch](https://designsystemproblems.com/versioning-releases/major-minor-patch-releases/) · [versioning without breaking client sites](https://www.designsystemscollective.com/versioning-your-design-system-without-breaking-client-sites-93b7c652f960) · [Vercel AI SDK 5 migration 2026](https://www.pkgpulse.com/guides/vercel-ai-sdk-5-migration-2026) · [Morningstar · versioning + breaking changes](https://designsystem.morningstar.com/getting-started/versioning-and-breaking-changes/)
