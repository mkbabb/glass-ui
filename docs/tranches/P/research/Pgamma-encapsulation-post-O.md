# Pγ—Encapsulation + service boundaries (post-O)

**Tranche:** P (round-1 backend audit, lane γ).
**Method:** read-only walk of `src/` at HEAD `b201b03` (v1.7.0 untagged) measured against O.W4 Lane A/B/C proofs + O.Rγ baseline.
**Window:** O close `8e741ba` (v1.4.1) → HEAD. AB+1 cohort = the 8 source commits between v1.4.1 and v1.7.0 (per P findings §2 inheritance ledger; primaries `bb1f15b`, `d813c63`, `8dad58d`).

---

## § Angle summary

The audit asks four questions, each comparing HEAD against the O.W4 close-state:

1. **`/api` hygiene at HEAD**—did the AB+1 cohort respect the W4-Lane-A `/api` policy? Are there NEW unpromoted types under `src/components/custom/*/types.ts` paralleling promoted siblings?
2. **Invariant-25 helper-pair shape**—did W4 Lane B/C fixes hold? Did the AB+1 cohort introduce new `provide`/`inject` sites? Are the 3 known pre-W2 typed-key sites still non-paired?
3. **Leaky-abstraction sweep**—did O.W4 Lane B's three fixes hold (`UseDockStateOptions`/`DockState` re-export; `UseAuroraReturn`; `useDarkModeSync` → `installDarkModeSync`)? Are there NEW inline-typed composable returns or barrel re-export gaps from AB+1?
4. **Service-boundary inconsistencies**—were any NEW module-scope process-singleton registries added post-O? Are they captured in the W4-Lane-C DESIGN.md catalogue?

Headline verdict: **O.W4's three fixes held; AB+1 introduced ZERO new provide/inject and ZERO new module-scope registries, BUT it ALSO introduced FIVE new SFCs (MetricCell, MetricStack, MetricRow, AnimatedDigit, ResponsiveTabs) where the package barrels DO NOT export Props types—diverging from the `header-ribbon`/`stacked-icons`/`tabs` precedent set at O.W6.** The 3 pre-W2 typed-key sites still lack paired helpers (P-3 confirmed). Two pre-existing composables (`useDockState`, `useTypewriter`) still have no annotated return interface (parallel to the pre-W4 `useAurora` outlier; not in W4 Lane B's three-fix cohort).

---

## § /api hygiene audit

### Surface count at HEAD

`src/api/index.ts` exposes **55 canonical public symbols (51 types + 4 constants)**—not 53 (49 + 4) as written in `src/api/index.ts:51,57` preamble + `docs/tranches/O/FINAL.md §2 W4 row`. The miscount is 2 types, traced to the W4 Lane A proof claiming "49 types + 4 constants" while the cohort actually added 12 types (sidebar 6 + search 5 + MenuItemVariants 1 → +12). Pre-W4 baseline at M.W2 close = 33 types + 4 constants (37 total—the proof said "29 types + 8 constants" which is **also** miscounted; aurora ships 3 constants not 8, so the constants count is 4).

**Per-source breakdown** (`/api/index.ts` re-exports at HEAD):

| Source | Types | Constants |
|---|---:|---:|
| aurora | 12 | 3 |
| configurator | 5 | 0 |
| metaballs | 1 | 1 |
| timeline | 3 | 0 |
| card | 1 | 0 |
| glass-panel | 2 (Variant + Props) | 0 |
| instrument-chassis | 1 | 0 |
| toast | 2 (Variant + Type) | 0 |
| CVA Variants (8 in `ui/` + 1 in `custom/toggle-chip` + 1 in `ui/_shared`) | 10 | 0 |
| sidebar | 6 | 0 |
| search | 5 | 0 |
| useClipboard | 2 | 0 |
| header-ribbon | 2 | 0 |
| **Total** | **51** | **4** |

Pγ assigns this to **P-7 doc-counter wave** (already on the P-open ledger as "γ-M5 CHANGELOG v1.3.0 '8 constants' typo"). The miscount needs to land at the `/api/index.ts` preamble, FINAL.md §2 W4 row, FINAL.md §2 W6 row, and any structure-block in CLAUDE.md (currently CLAUDE.md says "32 canonical public symbols (28 types + 4 constants)" at `src/api/` directory comment line—multiple-tranche-stale).

### AB+1 cohort: 5 new primitives, ZERO Props types on `/api`

The 5 new SFCs that landed between O close and HEAD:

| Primitive | Subpath | Props type? | Inline appearance/variant type? | Barrel exports |
|---|---|---|---|---|
| `MetricCell` (`bb1f15b` → `8dad58d`) | `/metric-cell` | Inline `defineProps<{...}>` only | `type MetricCellAppearance = "dashboard"|"compact"|"bare"` declared INSIDE `MetricCell.vue:52`—NOT exported | 1 symbol only (the SFC default export) |
| `MetricStack` (`bb1f15b`) | `/metric-stack` | Inline `defineProps<{...}>` only | `type MetricStackVariant = string|undefined`, `type MetricStackAs = string|Component` declared INSIDE `MetricStack.vue:33-34`—NOT exported | 1 symbol (SFC default) |
| `MetricRow` (`bb1f15b`) | `/metric-stack` (shared barrel) | Inline `defineProps<{...}>` only | none | 1 symbol (SFC default) |
| `AnimatedDigit` (`bb1f15b`) | `/animated-digit` | Inline `defineProps<{...}>` only | inline `"absolute"|"progress"` for `mode`—NOT exported | 1 symbol (SFC default) |
| `ResponsiveTabs` (`8dad58d`) | `/responsive-tabs` | Inline `defineProps<{...}>` only | composes `TabOption` (re-exported from `../tabs`) but does NOT re-export it from its own barrel | 1 symbol (SFC default) |

**Verdict against W4-Lane-A precedent + O.W6 precedent.** The O.W6 cohort that shipped `HeaderRibbon` set the canonical AB+ precedent at `src/components/custom/header-ribbon/`:

```ts
// header-ribbon/index.ts
export { default as HeaderRibbon } from "./HeaderRibbon.vue";
export type { HeaderRibbonPosition, HeaderRibbonProps } from "./types";
```

…with the matching `/api` re-export at `src/api/index.ts:201-204`. The same shape exists at `stacked-icons/index.ts:2` (`StackedIconGroupProps`), `tabs/index.ts:4-5` (`TabOption`, `ToggleOption`, `BouncyToggleProps`), `sidebar/index.ts` (full 6-type promotion at W4), `glass-panel/index.ts` (`GlassPanelProps` at W4).

The AB+1 5-primitive cohort skipped this canon. Every consumer that wraps `<MetricCell>` (e.g. a domain-specific `<DownloadCard>`) must either redeclare the prop shape inline or use `ComponentProps<typeof MetricCell>` (Vue 3.5 typed-template shape)—exactly the pattern Rγ §3.1 L2 flagged as a leaky abstraction for `useAurora`.

**Missing /api promotions for the AB+1 cohort:**

| Promoted shape | Source file | Notes |
|---|---|---|
| `MetricCellProps` | new export from `MetricCell.vue` or new `metric-cell/types.ts` | Parallels `GlassPanelProps` + `HeaderRibbonProps`. |
| `MetricCellAppearance` | currently private at `MetricCell.vue:52` | Parallels `GlassPanelVariant` / `CardTier` (string enum + named-export). |
| `MetricStackProps` + `MetricRowProps` | new exports from the SFCs | Two distinct shapes; both have ≥ 1 consumer per AC.W6d. |
| `MetricStackVariant` | currently private | Currently typed `string \| undefined`—a more useful canon is the union of known consumer tags (`"dpi"`, `"results"`, …) OR the lib publishes it as `string` and lets consumers extend; either way it should be exported. |
| `AnimatedDigitProps` | new export from `AnimatedDigit.vue` | Includes the `mode: "absolute"|"progress"` axis that consumers wiring the wrapper need to forward. |
| `ResponsiveTabsProps` | new export from `ResponsiveTabs.vue` | Parallels `BouncyToggleProps`. Note: `TabOption` is re-exported from `../tabs/index.ts` and ALREADY consumed by ResponsiveTabs—`ResponsiveTabs`'s own barrel should at minimum re-export `TabOption` for ergonomic consumption (one import path instead of two). |

**Surface delta if the AB+1 promotions land at P:** +5 Props types + 2 enum types (MetricCellAppearance + the AnimatedDigit mode union) = 51 + 7 = **58 types**, total 62 symbols. Still well within the L.W1 charter's ~50–60 scale; no architectural strain.

### Unpromoted types under `src/components/custom/*/types.ts`

`find src/components/custom -name types.ts` returns 8 files. Cross-check each against `/api`:

| File | Symbols | On `/api`? |
|---|---|---|
| `sidebar/types.ts` | `TreeNode`, `TreeIndexEntry`, `SidebarSection`, `SidebarIndexEntry`, `SidebarState`, `ScrollTrackerOptions` | ✓ YES (all 6, O.W4 Lane A) |
| `search/composables/types.ts` | `SearchableItem`, `SearchResult`, `FuzzySearchState`, `UseFuzzySearchOptions`, `SearchIndex` | ✓ YES (all 5, O.W4 Lane A) |
| `header-ribbon/types.ts` | `HeaderRibbonPosition`, `HeaderRibbonProps` | ✓ YES (both, O.W6 Lane A) |
| `metaballs/types.ts` | `MetaballConfig` + `DEFAULT_METABALL_CONFIG` | ✓ YES (both) |
| `timeline/types.ts` | `TimelineSegment`, `TimelineSegmentGradient`, `TimelineSegmentState` | ✓ YES (all 3, M.W2 Lane B) |
| `stacked-icons/types.ts` | `StackedIconGroupProps<TItem>` | ✗ NO (R-O.γ baseline §2.3 flagged it; W4-Lane-A did NOT include it in the triad—Pγ candidate for promotion; ≥ 1 consumer via word-frontend) |
| `typewriter/types.ts` | `KeyPosition`, `TypewriterWord`, `TypoState`, `TypoContext`, `TypoAction`, `CancellationToken`, `TypewriterOptions`, `DEFAULTS` | ✗ NO (none promoted; typewriter is component-internal logic in Rγ baseline; **keep status-quo**—the types are state-machine internals, not consumer-typing surface) |
| `infinite-scroll/composables/types.ts` | `InfiniteScrollOptions`, `InfiniteScrollReturn` | ✗ NO (status-quo; composable option/return is /api-excluded per preamble §"NOT in scope") |

**Net `/api` gap from AB+1 + carryover:** 5 Props + 2 enums (AB+1) + 1 `StackedIconGroupProps` (carryover from Rγ baseline; missed at W4 Lane A) = **8 type-only additions**.

---

## § Typed-key + helper-pair audit (invariant 25)

Walked every `provide()` and `inject()` call at HEAD. Six DI sites total:

| Site | Typed key | Helper pair | Status |
|---|---|---|---|
| `src/components/ui/toggle-group/toggleGroupContext.ts` | `TOGGLE_GROUP_KEY: InjectionKey<ToggleGroupContext>` (O.W2 Lane A canonical) | `provideToggleGroupContext` + `useOptionalToggleGroupContext` | ✓ COMPLIANT (W2 close `7dce645`) |
| `src/components/custom/dock/composables/dockContext.ts` | `DOCK_CONTEXT_KEY: InjectionKey<DockContext>` (O.W2 HEADLINE) | `provideDockContext` + `useDockContext` (strict) + `useOptionalDockContext` (silent) | ✓ COMPLIANT |
| `src/components/custom/dock/composables/dockLayerContext.ts` | `DOCK_LAYER_GROUP_KEY: InjectionKey<DockLayerGroupContext>` (O.W2 Lane A) | `provideDockLayerGroupContext` + `useDockLayerGroupContext` (strict) + `useOptionalDockLayerGroupContext` (silent—reserved for future consumers per O.W7 β audit) | ✓ COMPLIANT |
| `src/components/custom/configurator/density.ts` | `CONFIGURATOR_DENSITY_KEY: InjectionKey<ComputedRef<ConfiguratorDensity>>` (N.W2 Lane A) | **NONE**—`Configurator.vue:79` does raw `provide(CONFIGURATOR_DENSITY_KEY, ...)`; `ConfiguratorRow.vue:62` does raw `inject(CONFIGURATOR_DENSITY_KEY, undefined)` | ✗ NON-COMPLIANT (P-3 carry-forward) |
| `src/components/custom/sortable-list/context.ts` | `SORTABLE_CONTEXT: InjectionKey<UseSortableReturn>` | **NONE**—`SortableList.vue:80` does raw `provide(SORTABLE_CONTEXT, sortable)`; `SortableItem.vue:29` does raw `inject(SORTABLE_CONTEXT)` | ✗ NON-COMPLIANT (P-3 carry-forward) |
| `src/components/custom/glyph-face/keys.ts` | `GlyphFaceSilhouetteKey: InjectionKey<Ref<string \| undefined>>` | **NONE**—`GlyphFace.vue:68` does raw `provide(GlyphFaceSilhouetteKey, injectedSilhouette)`; `DiscoGlyph.vue:82` does raw `inject(GlyphFaceSilhouetteKey, null)` | ✗ NON-COMPLIANT (P-3 carry-forward) |

**Completion table:**

- Compliant: 3/6 (50%)—all from the O.W2 cohort.
- Non-compliant: 3/6 (50%)—all are pre-W2 sites flagged by O.W7 δ audit, carried forward as **P-3**.
- AB+1 cohort: ZERO new DI sites—primitives are pure SFCs with `defineProps` only.

**Recommended P wave action.** Author paired helpers for the 3 non-compliant sites. Mechanical refactors (no semver-visible API change because the typed key + raw call-sites already exist at HEAD—adding helpers + redirecting the 6 in-repo call-sites is library-internal):

```ts
// configurator/density.ts (proposed addition)
export function provideConfiguratorDensity(density: ComputedRef<ConfiguratorDensity>): void {
    provide(CONFIGURATOR_DENSITY_KEY, density);
}
export function useOptionalConfiguratorDensity(): ComputedRef<ConfiguratorDensity> | undefined {
    return inject(CONFIGURATOR_DENSITY_KEY, undefined);
}
```

```ts
// sortable-list/context.ts (proposed addition)
export function provideSortableContext(sortable: UseSortableReturn): void {
    provide(SORTABLE_CONTEXT, sortable);
}
export function useSortableContext(): UseSortableReturn {
    const ctx = inject(SORTABLE_CONTEXT);
    if (!ctx) throw new Error("[glass-ui:sortable] useSortableContext() called outside <SortableList>");
    return ctx;
}
```

```ts
// glyph-face/keys.ts (proposed addition)
export function provideGlyphFaceSilhouette(silhouette: Ref<string | undefined>): void {
    provide(GlyphFaceSilhouetteKey, silhouette);
}
export function useOptionalGlyphFaceSilhouette(): Ref<string | undefined> | null {
    return inject(GlyphFaceSilhouetteKey, null);
}
```

All three are 6-line additions per site; the 6 in-repo call-sites flip to the helpers in 6 single-line edits.

---

## § Leaky abstraction audit (post-O)

### Hold-state of O.W4 Lane B's three fixes

| Fix | Site | HEAD state | Verdict |
|---|---|---|---|
| L1—`UseDockStateOptions` + `DockState` re-export from `/dock` barrel | `src/components/custom/dock/index.ts:13` | `export type { UseDockStateOptions, DockState } from "./composables";` present | ✓ HELD |
| L2—`UseAuroraReturn` named interface | `src/components/custom/aurora/composables/useAurora.ts:19` + `aurora/index.ts:4` | Interface present + re-exported from barrel; `useAurora(...): UseAuroraReturn` at line 42 | ✓ HELD |
| L3—`useDarkModeSync` → `installDarkModeSync` rename | `src/composables/motion/installDarkModeSync.ts:25` + `motion/index.ts:12` | Function renamed; old filename absent; barrel re-exports the new name | ✓ HELD |

### AB+1 cohort: NEW inline-typed-return outliers?

No new composables shipped in AB+1; the 5 new primitives are pure SFCs with `<script setup>`. Zero new composables means zero new `useFoo() → inline {...}` leaks from the AB+1 window.

### Pre-existing composables still without named return shape (post-W4)

W4 Lane B fixed `useAurora` only. A scan of the wider composable surface shows two pre-W4 composables that **still** return an inferred shape (no `: UseFooReturn` annotation):

| Composable | Location | Return | Leak severity |
|---|---|---|---|
| `useDockState` | `src/components/custom/dock/composables/useDockState.ts:40` (`export function useDockState(options: UseDockStateOptions) {`) | Inferred—`UseDockStateOptions` and `DockState` are exported as option-arg + value-enum, but the function itself has NO `UseDockStateReturn` interface. Consumer must use `ReturnType<typeof useDockState>` to annotate a wrapper variable. | MEDIUM—`useDockState` is component-internal (only `GlassDock.vue` invokes it); but the dock barrel re-exports `useDockState` per Rγ baseline §"composables exports". Anyone wrapping GlassDock to embed a custom dock chassis would face the same gap that O.W4 Lane B fixed for `useAurora`. |
| `useTypewriter` | `src/components/custom/typewriter/composables/useTypewriter.ts:21` (`export function useTypewriter(options: TypewriterOptions) {`) | Inferred—`TypewriterOptions` is exported; no `UseTypewriterReturn` interface. | LOW—`useTypewriter` is consumed by the `<TypewriterText>` SFC only; not on the public surface today. |
| `useGlassRenderer` | `src/composables/glass/useGlassRenderer.ts:236` (`export function useGlassRenderer(options?: ...)`) | Inferred—returns `{ tier }` (one ref). | LOW—return is trivially small; Rγ baseline §2.2 already classified as "single ref; no actions" so the inline-return cost is near-zero. Skip unless consumers ask. |
| `useCursorInteraction` | `src/components/custom/aurora/composables/useCursorInteraction.ts:26` | Inferred | LOW—internal helper for `useAurora`. |
| `useLayerTransition` | `src/components/custom/dock/composables/useLayerTransition.ts:38` | `: UseLayerTransitionReturn` ✓ ANNOTATED | n/a |

**Recommended P wave action.** Add `UseDockStateReturn` interface mirroring the W4 `UseAuroraReturn` pattern; add `UseTypewriterReturn` if it lands on the public surface during P. `useGlassRenderer` + `useCursorInteraction` may stay inferred (single-ref / internal).

### Composable-barrel re-export gaps (parallels Rγ §3.1 L1 dock-state)

Checked every `custom/*/composables/index.ts` against the parent package barrel:

| Package | composables barrel | Parent barrel re-exports? |
|---|---|---|
| `aurora` | exports `useAurora`, `useCursorInteraction`, `UseAuroraReturn` (post-W4) + runtime types | ✓ all on parent (re-exported via `export * from "./composables/useAurora"` and explicit type re-exports) |
| `dock` | exports `useDockState` + `UseDockStateOptions` + `DockState` + `useLayerTransition` + `UseLayerTransitionOptions` + `UseLayerTransitionReturn` | ✓ `useDockState` + types re-exported at `dock/index.ts:13` (post-W4); `useLayerTransition` re-exported via `dock/index.ts` `export * from "./composables"`—verified |
| `infinite-scroll` | exports `useInfiniteScroll` + `InfiniteScrollOptions` + `InfiniteScrollReturn` | ✓ re-exported via `infinite-scroll/index.ts` |
| `search` | exports `useFuzzySearch` + `buildIndex` + `searchIndex` + all 5 search types | ✓ all on parent + on `/api` (W4 Lane A) |
| `typewriter` | exports `useTypewriter` only | ✓ on parent |

No new composable-barrel re-export gaps from AB+1 (which shipped zero composables)—but the existing post-W4 surface is now fully consistent.

### Naming-convention drift sweep (post-W4 avatarVariants)

`rg '(?<!Variants)Variant\b' src/components/**/index.ts`:

Zero singular-form CVA const remaining in `src/`. The W4 Lane C `avatarVariants` rename held and was not regressed by AB+1. `GlassPanelVariant` survives as a TYPE name (not a CVA const) which is intentional per W4 Lane A—it's the surface enum, not a CVA-derived type, so the singular form is correct (parallels `CardTier`, `InstrumentChassisPhase`, `ToastVariant`).

---

## § Service-boundary audit

### Module-scope process-singleton registries

W4 Lane C authored `DESIGN.md §"Module-scope process-singleton registries"` cataloguing 4 registries: `gateRegistry`, sortable `instances`, typewriter `activeTimers`, `toasts` + `toastTimeouts`.

Walked `rg 'const \w+ = new (Set|Map|WeakMap|WeakSet)' src/` + `rg 'createGlobalState' src/` at HEAD. **Findings:**

#### Captured by DESIGN.md (matches W4 Lane C catalogue)

- ✓ `gateRegistry`—`src/composables/dom/useTouchGate.ts:21`
- ✓ sortable `instances`—`src/composables/sortable/useSortable.ts:180`
- ✓ typewriter `activeTimers`—`src/components/custom/typewriter/TypewriterText.vue:141`
- ✓ `toasts` + `toastTimeouts`—`src/components/ui/toast/use-toast.ts:26,44`
- ✓ typewriter `listeners`—`src/components/custom/typewriter/utils/timing.ts:6` (sub-registry of typewriter, implicitly covered by "typewriter `activeTimers`" entry—flag as a minor doc precision issue, not a separate registry)

#### NOT captured by DESIGN.md (Pγ findings)

- ✗ `generatedRowIds: WeakMap<object, symbol>`—`src/components/ui/data-table/DataTable.vue:61`. WeakMap of row-identity → generated row symbol. Module-scope cache for `<DataTable>` row keys. **Pre-O (tranche f.w3 `f1cd338`); missed at W4 Lane C catalogue.** Severity: LOW—WeakMap keys are GC'd with row objects; the registry doesn't accumulate; no consumer-visible behaviour from cross-instance sharing. Still, the W4 canon binds: every module-scope registry is listed.
- ✗ `warnedRowIdentityIssues: Set<string>`—`src/components/ui/data-table/DataTable.vue:62`. Set of issue-kinds already warned (so DEV warnings fire once per kind across the process). Module-scope by design. Severity: LOW (dev-only)—same canon binding as above.
- ✗ vueuse `createGlobalState` factories—`useGlobalDark` (`src/composables/dark/useGlobalDark.ts:15`) and `useShortcutRegistry` (`src/composables/keyboard/useKeyboardShortcuts.ts:214`). These are NOT raw module-state but rather vueuse's controlled-process-singleton primitive. They're confined to the `/dark` and `/keyboard` subpaths per L.W1 Lane C SCC carve-out. **W4 Lane C catalogue intentionally did not list them** (the catalogue scoped to non-vueuse module-state); for completeness Pγ flags that the DESIGN.md section could close the gap by adding a one-line "Plus two vueuse-wrapped registries on the `/dark` and `/keyboard` subpaths" sentence.

#### AB+1 cohort

- The 5 new SFCs (MetricCell, MetricStack, MetricRow, AnimatedDigit, ResponsiveTabs) contain ZERO module-scope registries. AnimatedDigit composes `useAnimatedNumber` (per-instance state via `useRAFLoop`); ResponsiveTabs composes a per-instance matchMedia listener (`onMounted` + `onBeforeUnmount`). Both follow component-local-state canon.

**Recommended P wave action.** Update `DESIGN.md §"Module-scope process-singleton registries"` to add `generatedRowIds` + `warnedRowIdentityIssues` entries (2-line doc fix); fold into P-7 doc-tier wave alongside the surface-count corrections.

### Provide/inject idiom triple status

O.Rγ §3.2 B1 flagged three different DI idioms at N close (dock string-key, sortable typed-symbol, configurator typed-symbol-with-value-union). At HEAD:

- ✓ Dock: O.W2 canonicalised to typed `InjectionKey<DockContext>` + paired helpers. Resolved.
- Partial: Configurator (`CONFIGURATOR_DENSITY_KEY`) + Sortable (`SORTABLE_CONTEXT`) still have typed keys but **no helper pair**—they're the same idiom (typed `InjectionKey` exported + raw `provide`/`inject` at call-sites). This is invariant-25 PARTIAL compliance (key is typed but helpers are absent—see §"Typed-key + helper-pair audit" above for P-3 disposition).

After the P-3 fix lands, all 6 DI sites will share the same shape (typed key + paired helpers)—the idiom-triple gap closes fully.

### `useToast` module-state disposition

W4 Lane C decision-doc verdict: **KEEP** (shadcn-vue parity preserved). No new evidence in AB+1 to revisit. The decision stands.

---

## § Proposed plan implications (P-wave assignments—ZERO DEFERRAL)

Per the P-open binding constraint (§1—ZERO DEFERRAL), every Pγ finding lands or formally retires. Pγ enumerates 6 work cohorts:

### Pγ.1—AB+1 Props/types `/api` promotion cohort (Lane A-style)

**Scope:** 7 type promotions to `src/api/index.ts` + 5 barrel-side type exports.

| File | Change |
|---|---|
| `src/components/custom/metric-cell/MetricCell.vue` | Lift `MetricCellAppearance` + `MetricCellProps` to top-level `export type` (Vue 3.5 `defineProps<MetricCellProps>()` pattern). Or author `metric-cell/types.ts` mirroring `header-ribbon/types.ts`. |
| `src/components/custom/metric-cell/index.ts` | `export type { MetricCellAppearance, MetricCellProps } from "./MetricCell.vue";` (or `from "./types"`) |
| `src/components/custom/metric-stack/MetricStack.vue` + `MetricRow.vue` | Lift `MetricStackProps` + `MetricRowProps` to exports |
| `src/components/custom/metric-stack/index.ts` | re-export both Props types |
| `src/components/custom/animated-digit/AnimatedDigit.vue` | Lift `AnimatedDigitProps` + (optionally) `AnimatedDigitMode = "absolute" \| "progress"` |
| `src/components/custom/animated-digit/index.ts` | re-export |
| `src/components/custom/responsive-tabs/ResponsiveTabs.vue` | Lift `ResponsiveTabsProps` |
| `src/components/custom/responsive-tabs/index.ts` | re-export `ResponsiveTabsProps` + re-export `TabOption` from `../tabs` so single subpath suffices |
| `src/api/index.ts` | 7 new type re-exports—section "AB+1 primitives" (or distribute alongside existing sections) |
| `src/components/custom/stacked-icons/index.ts` already exports `StackedIconGroupProps`; `src/api/index.ts` adds 1-line re-export | StackedIconGroup `/api` promotion (Rγ-baseline carry-over) |

**Surface delta:** 51 → 59 types (+8); 4 constants unchanged; total 55 → 63 symbols.

**Semver:** strictly additive; v1.7.x patch is appropriate.

### Pγ.2—Invariant-25 helper-pair sweep (P-3)

3 sites × ~6 LOC each = ~18 LOC additions + 6 call-site flips.

| File | Add | Flip |
|---|---|---|
| `src/components/custom/configurator/density.ts` | `provideConfiguratorDensity` + `useOptionalConfiguratorDensity` | `Configurator.vue:79` (provide); `ConfiguratorRow.vue:62` (inject) |
| `src/components/custom/sortable-list/context.ts` | `provideSortableContext` + `useSortableContext` | `SortableList.vue:80` (provide); `SortableItem.vue:29` (inject) |
| `src/components/custom/glyph-face/keys.ts` | `provideGlyphFaceSilhouette` + `useOptionalGlyphFaceSilhouette` | `GlyphFace.vue:68` (provide); `DiscoGlyph.vue:82` (inject) |

**Semver:** library-internal mechanical refactor; the existing typed-keys remain re-exported for any consumer that bypasses the helpers; no breaking change. v1.7.x patch.

### Pγ.3—Composable named-return interface sweep (Rγ L2 carry)

Add `UseDockStateReturn` to `useDockState.ts`; annotate the function. Optional: `UseTypewriterReturn` (currently component-internal; promote only if the consumer story justifies).

**Semver:** type-only addition + return-annotation tightening. Patch.

### Pγ.4—Module-scope registry doc completion

Add `generatedRowIds` + `warnedRowIdentityIssues` (DataTable) to DESIGN.md `§"Module-scope process-singleton registries"`. Add the vueuse-wrapped registry footnote (`useGlobalDark`, `useShortcutRegistry`). 4-line doc fix.

### Pγ.5—`/api` surface-count doc-counter correction (folds into P-7)

5 sites carry the stale count:
- `src/api/index.ts:51`—"Surface count 37 → 49 (45 types + 4 constants)" (W4 Lane A header comment; should be `37 → 49 (49 types + 4 constants)` per the OLD count, OR truthful: actual W4 close = 51 types + 4 constants because the actual /api carries those—see audit body).
- `src/api/index.ts:57`—"Surface count 49 → 53 (49 types + 4 constants)" (W6 Lane A header comment; actual = 51 + 4 = 55).
- CLAUDE.md `src/api/` directory comment line—"32 canonical public symbols (28 types + 4 constants)"—multi-tranche stale (L-era).
- `docs/tranches/O/FINAL.md §2` row for W4—claims "37 → 49"; truthful audit shows 37 → 51 if all promotions land cleanly.
- O FINAL.md §2 row for W6—claims "49 → 53"; truthful actual = 53 (49 + 4) if base was 49, OR 55 (51 + 4) if base was 51.

**Recommended canon:** rebaseline by counting symbols at HEAD (Pγ method above) and writing **55 (51 types + 4 constants)** at the `/api` preamble + CLAUDE.md + any other surface; then add `+8 types` for Pγ.1 → land HEAD = **63 (59 types + 4 constants)** post-P.

### Pγ.6—Subpath-coverage spot check (NEW finding)

Each AB+1 primitive subpath (`/metric-cell`, `/metric-stack`, `/animated-digit`, `/responsive-tabs`) exists per `package.json.exports`. Verify the subpath probe (`npm run verify-export-types`) covers all four (Pγ did not run the probe; read-only—flag for P W0 verification gate).

---

## § Risks

1. **Adding Props types to the AB+1 cohort is strictly additive and zero-risk**—`defineProps<Props>()` accepts the same prop bag whether Props is inline or named-exported. Consumer wrappers gain typeability; no behaviour change.

2. **Adding helper functions for the 3 P-3 sites is library-internal**—the typed keys remain re-exported so any consumer that wired raw `provide`/`inject` against the symbol still works. The library's 6 in-repo call-sites flip to helpers; consumers can flip on their own schedule (or never).

3. **`UseDockStateReturn` annotation may surface a type that includes refs the implementation currently treats as internal**—reading `useDockState.ts:1-30` shows the return shape exposes `state` (Ref), `isCollapsed`/`isHover`/`isPinned` (computed flags), event handlers, ref-counted hold counters. Authoring the interface freezes today's shape; future refactors of `useDockState` must update the interface in lockstep (matches the `UseAuroraReturn` lifecycle binding at L invariant 16). Mitigation: same as W4 Lane B—the interface lives next to the function; one-file change per refactor.

4. **The `MetricStackVariant = string | undefined` shape is too permissive to be useful as a `/api` type**—promoting it as-is exports `string | undefined` which any consumer already has. Either narrow to a known union (`"dpi" | "results" | undefined`) and let consumers extend, OR document the shape as "consumer-extensible string" and skip the promotion. Pγ recommends the latter (skip), folding into Pγ.1's surgical scope (5 Props + 2 enums = `MetricCellAppearance` + `AnimatedDigitMode` only).

5. **Pγ.5 (surface-count) is independently a Pε / Pζ concern**—overlapping with the doc-drift audit and the chronic-fold audit. Coordinate the rebaseline in a single wave to avoid two-edits-to-same-line conflicts.

6. **None of the Pγ findings require user prompt review**—every item maps to an existing P-open ledger entry (P-3 carry; P-7 doc-fix; P4–P7 process mandates) or is a strictly-additive surface refinement. Zero deferral risk.

---

## § Appendix—counts

- `/api` symbols at HEAD: **55** (51 types + 4 constants).
- `/api` symbols if Pγ.1 lands: **63** (59 types + 4 constants).
- DI sites in src/: **6** (3 compliant, 3 non-compliant per invariant 25).
- Module-scope registries in src/: **7** (5 in DESIGN.md catalogue; 2 missed at DataTable).
- AB+1 primitives without exported Props types: **5/5**.
- Composables without named-return interface (post-W4): **4** (`useDockState`, `useTypewriter`, `useGlassRenderer`, `useCursorInteraction`); 2 high-severity, 2 low.
- O.W4 Lane B fixes that held: **3/3**.
- O.W4 Lane C fixes that held: **3/3** (avatarVariants rename, useToast KEEP, module-scope registry doc—modulo the 2 missed DataTable entries above).
