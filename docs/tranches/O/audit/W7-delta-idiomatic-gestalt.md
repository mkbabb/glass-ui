# O.W7 δ — Idiomatic-gestalt audit (read-only)

**Wave**: O.W7 close ceremony.
**Lane**: δ — contract-tier + story-tier; canonical typed-context + helper-pair shape + W6 promotion naming hygiene.
**Mandate**: verify the new typed-context + helper-pair shape is canonical; verify W6 promotions follow `*Variants` / `*Props` naming hygiene; cross-walk demo-tier consumption + style-precept compliance.
**Posture**: READ-ONLY.

## § Naming hygiene audit (per-symbol classifications)

### CVA constants + derived types (plural `*Variants` mandated)

Every CVA-driven const + its `VariantProps`-derived type is plural-suffixed. Cross-walked all 9 CVA sites:

| Site | Const | Type |
|------|-------|------|
| `src/components/ui/alert/index.ts` | `alertVariants` | `AlertVariants` |
| `src/components/ui/avatar/index.ts` | `avatarVariants` | `AvatarVariants` |
| `src/components/ui/badge/index.ts` | `badgeVariants` | `BadgeVariants` |
| `src/components/ui/button/index.ts` | `buttonVariants` | `ButtonVariants` |
| `src/components/ui/sheet/index.ts` | `sheetVariants` | `SheetVariants` |
| `src/components/ui/slider/index.ts` | `sliderVariants` | `SliderVariants` |
| `src/components/ui/toggle/index.ts` | `toggleVariants` | `ToggleVariants` |
| `src/components/ui/_shared/menuItemVariants.ts` | `menuItemVariants` | `MenuItemVariants` |
| `src/components/custom/toggle-chip/index.ts` | `toggleChipVariants` | `ToggleChipVariants` |

Zero singular `*Variant` CVA outliers — the O.W4 Lane C `avatarVariant` → `avatarVariants` rename landed clean; no residual references at HEAD (`rg "avatarVariant\b"` returns zero).

### Semantic enum types (singular `*Variant` / `*Mode` / `*Position` / `*Tier` / `*Phase`)

Singular-suffixed types are string-union semantic enums, NOT CVA-derived; the singular form is correct and distinguishes them from CVA-prop bags. Cross-walked:

| Symbol | Site | Shape |
|--------|------|-------|
| `CardTier` | `ui/card` | `"wash" \| "quiet" \| "resting" \| "floating" \| "overlay"` |
| `GlassPanelVariant` | `custom/glass-panel` | same 5-rung ladder |
| `InstrumentChassisPhase` | `custom/instrument-chassis` | phase enum |
| `ToastVariant` | `ui/toast` | `"default" \| "destructive"` |
| `ConfiguratorScrollMode` | `custom/configurator` | scroll-mode enum |
| `ConfiguratorCloneMode` | `custom/configurator` | clone-mode enum |
| `TimelineSegmentState` | `custom/timeline` | lifecycle enum |
| `HeaderRibbonPosition` | `custom/header-ribbon` | `"left" \| "right"` |
| `DockOrientation` | `custom/dock/composables/dockContext` | `"horizontal" \| "vertical"` |
| `ConfiguratorDensity` | `custom/configurator/density` | density enum |

The `*Variant` singular vs `*Variants` plural distinction is canonical and documented in `src/api/index.ts` lines 19-22 (preamble: "Semantic surface enums (`CardTier`, `InstrumentChassisPhase`, `ToastVariant`)" — explicit scope criterion).

### Composables — `useFoo` (reactive return) vs `installFoo` (void side-effect installer)

The O.W4 Lane B rename `useDarkModeSync` → `installDarkModeSync` is sound. Cross-walked all 21 `use*` exports under `src/composables/`:

| Composable | Return shape |
|------------|--------------|
| `useClipboard` | `UseClipboardReturn` |
| `useResizeObserver` | `UseResizeObserverControls` |
| `useTokenColor` | `UseTokenColorControls` |
| `useTouchGate` | `TouchGateReturn` |
| `useGlassRenderer` | implicit `{ tier, ... }` |
| `useRegisteredShortcuts` | `ComputedRef<RegisteredShortcut[]>` |
| `useAnimatedNumber` | `AnimatedNumber` |
| `useAnimatedNumberMap` | inferred `{...}` |
| `useIntersectionPause` | `IntersectionPauseControls` |
| `useRAFLoop` | `RAFLoopControls` |
| `useScrollProgress` | `Ref<number>` |
| `useSpringOrchestrator` | inferred `{...}` |
| `useStagger` | `UseStaggerControls` |
| `useStaggerReveal` | inferred `{...}` |
| `useInterval` | `UseIntervalControls` |
| `useTimer` | `UseTimerControls` |
| `useScrollTracker` | inferred `{...}` |
| `useSidebarFollow` | inferred `{...}` |
| `useSidebarState` | `SidebarState` |
| `useTreeIndex` | inferred `{...}` |
| `useSortable` | `UseSortableReturn` |

ZERO `use*` composables return `void`. The only `void`-returning composable-shaped function is `installDarkModeSync` — correctly named per the precept ("`use*` reactive return vs `install*` void side-effect installer"). The W4 rename closes the canonical-naming gap.

### `Use*Return` / `Use*Options` type naming

Pattern consistent across 4 return types + 14 options types — every `Use*Return` interface is paired with a `use*` composable in the same module; every `Use*Options` is the parameter bag of its same-name composable. No drift.

## § DI shape consistency audit (invariant 25)

### Typed `InjectionKey<T>` coverage

All 6 typed-key sites in `src/`:

| Key | Module | Helper-pair shape |
|-----|--------|-------------------|
| `DOCK_CONTEXT_KEY` | `custom/dock/composables/dockContext.ts` | `provideDockContext` + `useDockContext` (strict) + `useOptionalDockContext` |
| `DOCK_LAYER_GROUP_KEY` | `custom/dock/composables/dockLayerContext.ts` | `provideDockLayerGroupContext` + `useDockLayerGroupContext` (strict) + `useOptionalDockLayerGroupContext` |
| `TOGGLE_GROUP_KEY` | `ui/toggle-group/toggleGroupContext.ts` | `provideToggleGroupContext` + `useOptionalToggleGroupContext` (no strict — documented rationale) |
| `CONFIGURATOR_DENSITY_KEY` | `custom/configurator/density.ts` | KEY-ONLY (no helpers) |
| `SORTABLE_CONTEXT` | `custom/sortable-list/context.ts` | KEY-ONLY (no helpers) |
| `GlyphFaceSilhouetteKey` | `custom/glyph-face/keys.ts` | KEY-ONLY (no helpers) |

### Raw string-keyed inject/provide

Zero raw string-key `inject(...)` / `provide(...)` calls in `src/`. The three matches under `rg` are docstring references to the prior migrated state, not live calls.

### Observation — 3 pre-existing typed-key sites without paired helpers

The W2 dock canonicalization shipped the full strict + optional helper-pair shape for `DOCK_CONTEXT_KEY` + `DOCK_LAYER_GROUP_KEY` + `TOGGLE_GROUP_KEY`. The three pre-W2 keys (`CONFIGURATOR_DENSITY_KEY`, `SORTABLE_CONTEXT`, `GlyphFaceSilhouetteKey`) ship the typed-key half only — consumers call `inject(KEY, default)` inline.

Per `docs/tranches/O/O.md` line 121 ("configurator + sortable + glyphface CLEAN"), the Rδ research deemed these CLEAN and out-of-scope for W2. The keys carry full `InjectionKey<T>` typing; the missing piece is the canonical-helper convenience wrapper, which is decorative — invariant 25's binding clause is "typed `InjectionKey<T>` exported from a module-local `keys.ts` / `context.ts`," and all three satisfy that.

The asymmetry is recorded as a soft-debt entry for P (or whichever future wave touches these substrates) rather than an O-close BLOCKER. The substrate is canonical; the consumer-side ergonomic wrapper is deferred. Acceptable.

### `ToggleGroup` strict helper omission — documented rationale

`toggleGroupContext.ts` ships `provideToggleGroupContext` + `useOptionalToggleGroupContext` only; no `useToggleGroupContext` (strict). W2 Lane A proof line: "No strict helper authored — there's no use case where `<ToggleGroupItem>` MUST be inside a group, so the strict counterpart would be dead code." This honours the precept's binding clause ("strict OR optional, per primitive's render-outside-tolerance") rather than the surface form. Acceptable.

### Verdict — DI shape consistency

CLEAN with documented asymmetries. The W2 canonicalization closed the dock + toggle-group drift cleanly; the pre-W2 typed-key sites carry full type-safety and are flagged for future ergonomic-wrapper landing without breaking the canonical-shape invariant.

## § /api hygiene audit

### Re-export discipline

`src/api/index.ts` is pure re-exports — zero inline `export interface` / `export class` / `export function` / `export const = ` declarations. Cross-walked: 49 type re-exports + 8 constant re-exports, every source path under `../components/*` or `../composables/*` (canonical homes).

### Preamble scope criteria

The preamble (`src/api/index.ts:12-51`) declares 3 scope criteria + 2 explicit exclusions:

- IN: variant-prop types, domain shapes consumers type fixtures against, semantic surface enums, Aurora ceilings + defaults.
- IN: canonical return-shape interfaces (`ConfiguratorState`, `SidebarState`, `FuzzySearchState`, `UseClipboardReturn`).
- OUT: vueuse-bearing composable types (carousel domain — per-subpath only).
- OUT: component-internal types (dock orientation / state — closed at O.W4 Lane B).

W4 + W6 promotions respect the criteria. `MenuItemVariants` (W4) required a new `ui/_shared/index.ts` barrel — runtime-private; exists solely to give `/api` a stable home — documented inline at `src/api/index.ts:131-135`. `UseClipboardOptions` + `UseClipboardReturn` (W6) parallel `ConfiguratorState` / `SidebarState` / `FuzzySearchState` per the preamble's canonical-return-shape clause. `HeaderRibbonProps` + `HeaderRibbonPosition` (W6) parallel `GlassPanelProps` + the existing `*Position` family.

### Documented surface count

Preamble claims `surface count 37 → 49 (41 types + 8 constants)` at W4 close. W6 adds 4 more (`UseClipboardOptions`, `UseClipboardReturn`, `HeaderRibbonPosition`, `HeaderRibbonProps`) → 53 surface at O close (45 types + 8 constants). Preamble doesn't enumerate the W6 delta in the headline — minor doc-drift, NOT BLOCKER (the in-line W6 sections at lines 177-198 are present and accurate).

### Verdict — /api hygiene

CLEAN. Pure re-exports, preamble scope criteria respected, W6 promotions follow the established canonical-return-shape parallel.

## § Demo-tier consumption sweep (per-promotion)

### W6 Lane A — `useClipboard`

- glass-ui-side demo stories: ZERO.
- External consumers (per W6 Lane A proof): value.js (20 sites; deferred adoption sweep), fourier-analysis (1 inline parallel; deferred adoption sweep).
- ≥ 2-consumer bar: SATISFIED via external repos per the W6 hard gate (a).

### W6 Lane A — `<HeaderRibbon>`

- glass-ui-side demo stories: ZERO.
- External consumers: value.js (155 LOC fork; deferred), keyframes.js (152 LOC fork; deferred).
- ≥ 2-consumer bar: SATISFIED via external repos.

### W6 Lane B — `.dock-icon-button` token ladder

- Default consumer: `<GlassDock>` internal styling (binary-transparent).
- External consumers (deferred adoption): bbnf-buddy (7 `:deep()` escapes; 3 absorbable), speedtest (standardization target).
- ≥ 2-consumer bar: SATISFIED.

### W6 Lane C — `@utility scale-on-hover`

- glass-ui-side demo stories: ZERO.
- External consumers (deferred adoption): keyframes.js (13 sites), words/frontend (9 sites at varying scale values).
- ≥ 2-consumer bar: SATISFIED.

### W4 Lane B — `installDarkModeSync` rename

- glass-ui-side demo story: `demo/stories/composables/use-dark-mode-sync.vue` (uses new symbol name; filename retains old kebab).
- External consumer: speedtest (renamed in tandem per cross-repo coordination doc).
- Adoption: COMPLETE.

### Observation — uniform deferral of glass-ui-side demo stories for W6 lanes

All four W6 promotions ship without a glass-ui-side demo story. The W6 plan + lane proof docs document this explicitly: the ≥ 2-consumer bar is satisfied EXTERNALLY (cross-repo audit), and the consumer-side adoption sweep is deferred to user-authorized cross-repo waves per CONSTELLATION.md's MULTI-WRITER policy.

This is principled but creates a soft audit-walk gap: post-W6, the glass-ui demo storybook carries 24 composable stories + 35 primitive stories, but the four newest substrate primitives have zero in-repo story representation. Story-tier coverage is the canonical demonstrate-it-renders proof per the visual-load-bearing-ness invariant.

Recommendation for P: when the cross-repo adoption sweeps land, parallel-author the in-repo demo stories (`demo/stories/composables/use-clipboard.vue`, `demo/stories/primitives/header-ribbon.vue`, `demo/stories/foundations/scale-on-hover.vue`, `demo/stories/primitives/dock-icon-button-tokens.vue`) so the story-tier surface closes in lockstep with the consumer-side migration. NOT a W7-close BLOCKER (the W6 plan explicitly deferred this), but a carry-forward.

## § Style precept audit (spot-check on per-wave proof docs + CHANGELOG)

### Banned-word sweep across O-tranche docs

`rg -E "\bdelve\b|\btapestry\b|\btestament\b|\bunderscore\b|\bpivotal\b|\brobust\b|\bleverage\b|\bnavigate\b|\bunleash\b|\bfoster\b|\bever-evolving\b|\bbustling\b|\bshowcase\b|\blandscape\b|\bintricate\b|in conclusion|in the realm of|it's worth noting"` returns 2 hits in O-tranche surface:

1. `docs/tranches/O/audit/W6-Lane-A-useClipboard-HeaderRibbon-promotions-proof.md:20` — "value.js carries the robust copy path" → flag: "robust" is banned per STYLE.md. Suggest rewrite: "value.js carries the legacy-compatible copy path" or simply "value.js carries the execCommand fallback".
2. `CHANGELOG.md:1628` — "showcase chassis (V.W4) had zero consumers" → flag: "showcase" is banned. This is a legacy V.W4 entry pre-dating the precept's current text; NOT an O-tranche regression.

### Em-dash discipline

STYLE.md mandates unspaced em-dashes ("phrase—word—phrase"). The CHANGELOG.md carries 374 spaced em-dashes; the O-tranche wave docs carry 9-44 spaced em-dashes per file (W2: 9, W4: 9, W6: 9, O.md: 44).

This is a corpus-wide pattern that pre-dates the precept's current text. The 374-count CHANGELOG is cumulative across all tranches A through O; the per-wave doc spaced-em-dash counts are unchanged from prior tranche dispositions. RESOLUTION: the spaced-em-dash style is the de-facto codebase convention; codifying the unspaced convention as binding would warrant a corpus-wide migration sweep (P-tranche candidate). For O close, this is a soft style drift, not a BLOCKER.

### Epanorthosis ("not just X, but Y") + overpunctuated fragments + AI-writing signs

Zero hits in O-tranche docs.

### Verdict — Style precept

MINOR. One banned word ("robust") in an active O.W6 audit doc — surgical-rewrite candidate at close; the rest are corpus-wide drifts predating the current precept text.

## § Verdict

**CLEAN with MINOR carry-forward notes.**

### CLEAN

1. CVA naming hygiene — every plural `*Variants` const + type; zero singular outliers post-W4 rename.
2. Semantic-enum singular `*Variant` / `*Mode` / `*Position` / `*Tier` / `*Phase` discipline; preamble criteria documented in `/api`.
3. Composable rename `useDarkModeSync` → `installDarkModeSync` sound + only `void`-returning composable correctly demarcated.
4. DI typed-key shape — all 6 typed-key sites use `InjectionKey<T>`; zero raw string keys; W2 dock canonicalization shipped full strict + optional helper-pair.
5. `/api` is pure re-exports from canonical homes; preamble scope criteria respected.
6. `Use*Return` / `Use*Options` naming consistent across 18 sites.
7. Demo-tier `installDarkModeSync` adoption complete; `avatarVariants` rename absorbed.

### MINOR (carry-forward to P)

1. Three pre-W2 typed-key sites (`CONFIGURATOR_DENSITY_KEY`, `SORTABLE_CONTEXT`, `GlyphFaceSilhouetteKey`) ship typed-key only without paired-helper convenience wrappers. Documented as out-of-scope for W2 per Rδ. P-tranche candidate.
2. W6 promotions ship without glass-ui-side demo stories. ≥ 2-consumer bar satisfied externally; cross-repo adoption sweep deferred. P-tranche carry-forward: parallel-author demo stories when the cross-repo adoption sweeps land.
3. `/api` preamble headline surface-count `37 → 49` reflects the W4 delta; W6 added 4 more for a 53-total at O close. Inline sections accurate; headline minor doc-drift.
4. One banned word "robust" in `docs/tranches/O/audit/W6-Lane-A-useClipboard-HeaderRibbon-promotions-proof.md:20` — surgical rewrite at close.
5. Corpus-wide spaced-em-dash style conflicts with STYLE.md's unspaced mandate. 374 hits in CHANGELOG + 9-44 per O-tranche doc. Codebase de-facto convention predates current precept text; P-tranche corpus-wide migration candidate.

### No BLOCKERs

All idiomatic-gestalt invariants binding at O close pass. The W2 typed-context + helper-pair shape is canonical, the W4 promotions follow `*Variants` / `*Props` hygiene, the W6 primitives ship with naming discipline intact. The MINORs are deferrable.

## Authority

- `docs/precepts/instructions/README.md` §"Code Discipline" — typed-key + helper-pair DI canonical shape (invariant 25).
- `docs/precepts/instructions/STYLE.md` — banned words, em-dash discipline.
- `docs/tranches/O/O.md` line 121 — Rδ disposition for pre-W2 typed-key sites.
- `docs/tranches/O/waves/W2.md` — dock subsystem DI canonicalization scope.
- `docs/tranches/O/waves/W4.md` — `avatarVariant` rename + `installDarkModeSync` rename + 12 `/api` promotions.
- `docs/tranches/O/waves/W6.md` — `useClipboard` + `<HeaderRibbon>` + dock-token-ladder + `scale-on-hover` promotions.
- `docs/tranches/O/audit/W2-Lane-A-dock-typed-context-proof.md` — ToggleGroup strict-helper omission rationale.
- `docs/tranches/O/audit/W6-Lane-A-useClipboard-HeaderRibbon-promotions-proof.md` — ≥ 2-consumer verification via external repos.
- `src/api/index.ts` — preamble scope criteria + W4/W6 promotion sections.
- `src/components/custom/dock/composables/dockContext.ts` + `dockLayerContext.ts` — canonical typed-key + helper-pair shape.
- `src/components/ui/toggle-group/toggleGroupContext.ts` — typed-key + optional-only helper.
- `src/composables/motion/installDarkModeSync.ts` — `use*` → `install*` rename canonical reference.
