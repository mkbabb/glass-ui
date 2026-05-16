# P.Rδ—DI patterns + provide/inject audit (POST-O.W7)

**Agent**: P.Rδ (delta—dependency injection + provide/inject)
**Scope**: src/ provide/inject sites at HEAD `b201b03` (v1.7.0 untagged); verify O.W2 canonicalization held; expand audit to ALL typed-key sites (NOT just dock); identify paired-helper completion gaps under invariant 25.
**Mode**: READ-ONLY audit.

---

## §1—Angle summary

Per O.Rδ baseline, the dock subsystem was the highest-priority DI inconsistency at N close (11 provide sites; 6 raw string keys; 5 typed-helper bypass consumers across `Slider` + `HoverPopover` + `PopoverContent` + `SelectContent` + `DropdownMenuContent`). O.W2 Lane A canonicalized that surface: `DOCK_CONTEXT_KEY: InjectionKey<DockContext>` + 5-field consolidated context + strict/optional helper pair + ToggleGroup + DockLayer DRIFT cleanup.

This audit verifies at HEAD that:
1. O.W2 canonicalization HELD—zero raw-string `provide(`/`inject(` regressions.
2. The 3 pre-W2 typed-key sites (`CONFIGURATOR_DENSITY_KEY` + `SORTABLE_CONTEXT` + `GlyphFaceSilhouetteKey`) remain TYPED-KEY-ONLY without paired helpers—P-3 carry confirmed.
3. AB+1 cohort (MetricRow/MetricCell/MetricStack/AnimatedDigit/ResponsiveTabs/HeaderRibbon) introduced ZERO new provide/inject pairs—no new invariant-25 surface to canonicalize.

The audit yields a complete invariant-25 completion table and a 3-site P-wave migration list.

---

## §2—Every typed `InjectionKey<T>` site at HEAD

Six declarations across `src/` (verified `rg -n 'InjectionKey<' src/`):

| # | Module | Symbol | Type parameter |
|---|---|---|---|
| 1 | `src/components/custom/dock/composables/dockContext.ts:38` | `DOCK_CONTEXT_KEY` | `InjectionKey<DockContext>` |
| 2 | `src/components/custom/dock/composables/dockLayerContext.ts:27` | `DOCK_LAYER_GROUP_KEY` | `InjectionKey<DockLayerGroupContext>` |
| 3 | `src/components/ui/toggle-group/toggleGroupContext.ts:21` | `TOGGLE_GROUP_KEY` | `InjectionKey<ToggleGroupContext>` |
| 4 | `src/components/custom/configurator/density.ts:25` | `CONFIGURATOR_DENSITY_KEY` | `InjectionKey<ComputedRef<ConfiguratorDensity>>` |
| 5 | `src/components/custom/sortable-list/context.ts:11` | `SORTABLE_CONTEXT` | `InjectionKey<UseSortableReturn>` |
| 6 | `src/components/custom/glyph-face/keys.ts:10` | `GlyphFaceSilhouetteKey` | `InjectionKey<Ref<string \| undefined>>` |

Count unchanged from O close (6 typed keys). No new typed keys added in the AB+1 cohort.

### §2.1—Helper completion table (invariant 25)

| Key | Provide helper | Strict `useFooContext()` | Optional `useOptionalFooContext()` | Status |
|---|---|---|---|---|
| `DOCK_CONTEXT_KEY` | `provideDockContext()` | `useDockContext()`—throws | `useOptionalDockContext()` | **COMPLETE** |
| `DOCK_LAYER_GROUP_KEY` | `provideDockLayerGroupContext()` | `useDockLayerGroupContext()`—throws | `useOptionalDockLayerGroupContext()` | **COMPLETE** |
| `TOGGLE_GROUP_KEY` | `provideToggleGroupContext()` | (none—strict surface would be dead code; `<ToggleGroupItem>` is allowed bare) | `useOptionalToggleGroupContext()` | **OPTIONAL-ONLY (befitting)** |
| `CONFIGURATOR_DENSITY_KEY` | (none—provider calls raw `provide(CONFIGURATOR_DENSITY_KEY, ...)`) | (none) | (none—consumer calls raw `inject(CONFIGURATOR_DENSITY_KEY, undefined)`) | **MISSING-BOTH** (P-3 carry) |
| `SORTABLE_CONTEXT` | (none—provider calls raw `provide(SORTABLE_CONTEXT, sortable)`) | (none—consumer calls raw `inject(SORTABLE_CONTEXT)` + inline throw) | (none—befitting absent: `<SortableItem>` must be inside `<SortableList>`) | **MISSING-BOTH** (P-3 carry; strict-only by intent) |
| `GlyphFaceSilhouetteKey` | (none—provider calls raw `provide(GlyphFaceSilhouetteKey, ref)`) | (none—strict surface would be dead code; `<DiscoGlyph>` is allowed bare) | (none—consumer calls raw `inject(GlyphFaceSilhouetteKey, null)`) | **MISSING-BOTH** (P-3 carry; optional-only by intent) |

Six typed keys total; three COMPLETE (or befitting-OPTIONAL-ONLY), three MISSING-BOTH. All three MISSING-BOTH sites are pre-W2; the 3-site P-3 carry from O.W7 δ audit is verified intact at HEAD.

### §2.2—Disposition rationale per MISSING-BOTH site

**`CONFIGURATOR_DENSITY_KEY`**—currently the consumer (`ConfiguratorRow.vue:62`) uses raw `inject(CONFIGURATOR_DENSITY_KEY, undefined)` then prop-over-inject precedence on `props.density ?? injectedDensity?.value`. The semantics are **optional** (the row can render bare; density falls through to `undefined` which maps to no `data-density` attr—bit-for-bit-preserved pre-N.W2 visual). The canonical P-wave fix is to author `provideConfiguratorDensity(density: ComputedRef<ConfiguratorDensity>)` + `useOptionalConfiguratorDensity(): ComputedRef<ConfiguratorDensity> | undefined`. No strict counterpart needed (rows can render bare).

**`SORTABLE_CONTEXT`**—currently the consumer (`SortableItem.vue:29-34`) uses raw `inject(SORTABLE_CONTEXT)` + an inline `if (!sortable) throw new Error("[glass-ui] <SortableItem> must be used inside <SortableList>")`. The semantics are **strict** by intent. The canonical P-wave fix is to author `provideSortableContext()` + `useSortableContext()` (strict—moves the inline throw into the helper). No optional counterpart needed (`<SortableItem>` is meaningless without a list).

**`GlyphFaceSilhouetteKey`**—currently the consumer (`DiscoGlyph.vue:82`) uses raw `inject(GlyphFaceSilhouetteKey, null)` + silent-no-op (`if (slot) { watch(...) }`). The semantics are **optional** by design—`<DiscoGlyph>` cooperates with a wrapping `<GlyphFace>` when present, otherwise stands alone. The canonical P-wave fix is to author `provideGlyphFaceSilhouette(slot: Ref<string | undefined>)` + `useOptionalGlyphFaceSilhouette(): Ref<string | undefined> | null`. No strict counterpart (silent default is befitting).

All three sites are call-pattern preservation refactors—runtime semantics unchanged; only the call site shape changes from raw `inject(KEY, default)` → typed helper.

---

## §3—Every raw `provide(string, …)` / `inject(string, …)` site

**Result**: ZERO at HEAD. The O.W2 sweep held.

Verification commands + outputs:

```
$ rg -n 'provide\(|inject\(|inject<' src/
src/components/custom/dock/DockLayer.vue:16:        // [docstring reference to RETIRED inject("dockLayerGroup", null) shape]
src/components/custom/glyph-face/GlyphFace.vue:68:provide(GlyphFaceSilhouetteKey, injectedSilhouette);
src/components/custom/sortable-list/SortableList.vue:80:provide(SORTABLE_CONTEXT, sortable);
src/components/custom/disco-glyph/DiscoGlyph.vue:82:const slot = inject(GlyphFaceSilhouetteKey, null);
src/components/custom/sortable-list/SortableItem.vue:29:const sortable = inject(SORTABLE_CONTEXT);
src/components/custom/configurator/Configurator.vue:79:provide(CONFIGURATOR_DENSITY_KEY, computed(() => props.density));
src/components/custom/configurator/ConfiguratorRow.vue:62:const injectedDensity = inject(CONFIGURATOR_DENSITY_KEY, undefined);
src/components/ui/toggle-group/toggleGroupContext.ts:11:    // [docstring reference to RETIRED provide("toggleGroup", {...}) shape]
src/components/ui/toggle-group/toggleGroupContext.ts:12:    // [docstring reference to RETIRED inject<ToggleGroupVariants>("toggleGroup") shape]
src/components/ui/toggle-group/toggleGroupContext.ts:26:    provide(TOGGLE_GROUP_KEY, context);
src/components/ui/toggle-group/toggleGroupContext.ts:31:    return inject(TOGGLE_GROUP_KEY, null);
src/components/custom/dock/composables/dockLayerContext.ts:9:    // [docstring reference to RETIRED raw provide("dockLayerGroup", {...}) shape]
src/components/custom/dock/composables/dockLayerContext.ts:32:    provide(DOCK_LAYER_GROUP_KEY, context);
src/components/custom/dock/composables/dockLayerContext.ts:37:    const ctx = inject(DOCK_LAYER_GROUP_KEY);
src/components/custom/dock/composables/dockLayerContext.ts:48:    return inject(DOCK_LAYER_GROUP_KEY, null);
src/components/custom/dock/composables/dockContext.ts:41:    provide(DOCK_CONTEXT_KEY, context);
src/components/custom/dock/composables/dockContext.ts:46:    const ctx = inject(DOCK_CONTEXT_KEY);
src/components/custom/dock/composables/dockContext.ts:57:    return inject(DOCK_CONTEXT_KEY, null);
```

Every `provide(` / `inject(` call site passes a typed `InjectionKey<T>` symbol—no string keys anywhere in code. The string-key mentions (`"dockLayerGroup"`, `"toggleGroup"`, `"glassDockContext"`, `"dockKeepOpen"`, `"dockRelease"`, `"dockHeld"`, `"dockExpanded"`, `"glassDockId"`) appear ONLY in docstrings / migration comments documenting the pre-W2 shape.

Verification via the stricter regex confirms the same:

```
$ rg -n 'glassDockContext|glassDockId|dockKeepOpen|dockRelease|dockHeld|dockExpanded|dockLayerGroup|toggleGroup"' src/
src/components/custom/dock/DockLayer.vue:16:        // [docstring]
src/components/custom/dock/GlassDock.vue:111-114:   // [docstring]
src/components/custom/dock/composables/dockLayerContext.ts:9:    // [docstring]
src/components/custom/dock/composables/dockContext.ts:10-14:   // [docstring]
src/components/custom/dock/composables/useDockState.ts:232:    // [docstring]
src/components/custom/hover-popover/HoverPopover.vue:35,89:     // [docstring]
src/styles/dock.css:239:    // [docstring]
src/components/ui/slider/Slider.vue:17,19,89:    // [docstring]
src/components/ui/toggle-group/toggleGroupContext.ts:11-12:    // [docstring]
```

All hits are docstrings. No live string keys.

---

## §4—AB+1 cohort DI verification

The AB+1 minor cohort shipped 6 new primitive subpaths between v1.4.1 close and HEAD `b201b03`:

| Primitive | Path | Provide/inject? | Verdict |
|---|---|---|---|
| `MetricRow` (v1.6.0) | `src/components/custom/metric-stack/MetricRow.vue` | NO (docstring only—"consumers provide `<MetricRow><template #description>") | clean |
| `MetricStack` (v1.6.0) | `src/components/custom/metric-stack/MetricStack.vue` | NO | clean |
| `AnimatedDigit` (v1.6.0) | `src/components/custom/animated-digit/AnimatedDigit.vue` | NO (test-string mentions "when provided") | clean |
| `MetricCell` (v1.7.0) | `src/components/custom/metric-cell/MetricCell.vue` | NO | clean |
| `ResponsiveTabs` (v1.7.0) | `src/components/custom/responsive-tabs/ResponsiveTabs.vue` | NO | clean |
| `HeaderRibbon` (v1.5.x cohort) | `src/components/custom/header-ribbon/HeaderRibbon.vue` | NO | clean |
| `ToggleGroupItem` `card` variant (v1.7.0) | `src/components/ui/toggle-group/ToggleGroupItem.vue` | unchanged DI surface—still `useOptionalToggleGroupContext()` | clean (no new pair; only variant added) |

The AB+1 cohort introduced ZERO new provide/inject pairs. All six new primitives are leaf components consuming props/slots only—no parent/descendant cooperation surfaces.

**Verification command**:

```
$ rg -n 'provide|inject' src/components/custom/metric-cell src/components/custom/metric-stack \
                          src/components/custom/animated-digit src/components/custom/responsive-tabs \
                          src/components/custom/header-ribbon
src/components/custom/metric-stack/MetricRow.vue:223:   self-paints (consumers provide `<MetricRow><template #description>
src/components/custom/animated-digit/__tests__/AnimatedDigit.test.ts:30:    it("applies the consumer formatter when provided", …)
```

Both hits are non-DI false positives (slot-API docstring + test-string for `formatter` prop).

**Invariant 25 verdict for AB+1**: COMPLIANT BY VACUOUS-TRUTH (no new pairs to canonicalize).

---

## §5—Cross-substrate DI

Per O.Rδ §3.1 + O.W2 Lane A, the dock cross-substrate consumers (`Slider`, `HoverPopover`, `PopoverContent`, `SelectContent`, `DropdownMenuContent`) ALL migrated from raw-string `inject(...)` to `useOptionalDockContext()`. Verified at HEAD:

| Consumer | File | Pattern |
|---|---|---|
| `Slider` | `src/components/ui/slider/Slider.vue:53` | `const dock = useOptionalDockContext()` |
| `HoverPopover` | `src/components/custom/hover-popover/HoverPopover.vue:143` | `const dock = useOptionalDockContext()` |
| `PopoverContent` | `src/components/ui/popover/PopoverContent.vue:34` | `const dockContext = useOptionalDockContext()` |
| `SelectContent` | `src/components/ui/select/SelectContent.vue:36` | `const dockContext = useOptionalDockContext()` |
| `DropdownMenuContent` | `src/components/ui/dropdown-menu/DropdownMenuContent.vue:28` | `const dockContext = useOptionalDockContext()` |
| `DockLayerGroup` | `src/components/custom/dock/DockLayerGroup.vue:39` | `const dock = useOptionalDockContext()` |
| `DockLayer` | `src/components/custom/dock/DockLayer.vue:27` | `const group = useDockLayerGroupContext()` (strict) |
| `ToggleGroupItem` | `src/components/ui/toggle-group/ToggleGroupItem.vue:14` | `const context = useOptionalToggleGroupContext()` |

Six cross-substrate consumers + one strict descendant consumer + one cross-tier consumer (`ToggleGroupItem`)—all on the typed-key helper API. ZERO string-key regressions.

---

## §6—Proposed plan implications: P-wave invariant-25 completion sweep

### §6.1—Wave scope

Author paired helpers for the 3 MISSING-BOTH typed-key sites (P-3 carry):

| Site | New helpers to author | Call sites to migrate |
|---|---|---|
| `configurator/density.ts` | `provideConfiguratorDensity(density)` + `useOptionalConfiguratorDensity()` | 2 sites—`Configurator.vue:79` (provider) + `ConfiguratorRow.vue:62` (consumer) |
| `sortable-list/context.ts` | `provideSortableContext(sortable)` + `useSortableContext()` (strict; moves inline throw into helper) | 2 sites—`SortableList.vue:80` (provider) + `SortableItem.vue:29-34` (consumer; deletes 6-line inline throw) |
| `glyph-face/keys.ts` | `provideGlyphFaceSilhouette(slot)` + `useOptionalGlyphFaceSilhouette()` | 2 sites—`GlyphFace.vue:68` (provider) + `DiscoGlyph.vue:82` (consumer) |

Total: 6 author + 6 migrate = 12 line-touch points (excluding deletions). Per-file diff:

```
M src/components/custom/configurator/density.ts       —add 2 helpers (~14 lines)
M src/components/custom/configurator/Configurator.vue —swap raw provide → helper
M src/components/custom/configurator/ConfiguratorRow.vue—swap raw inject → helper
M src/components/custom/configurator/index.ts         —export new helpers
M src/components/custom/sortable-list/context.ts      —add 2 helpers (~16 lines)
M src/components/custom/sortable-list/SortableList.vue—swap raw provide → helper
M src/components/custom/sortable-list/SortableItem.vue—swap raw inject + inline throw → helper
M src/components/custom/sortable-list/index.ts        —export new helpers
M src/components/custom/glyph-face/keys.ts            —add 2 helpers (~14 lines)
M src/components/custom/glyph-face/GlyphFace.vue      —swap raw provide → helper
M src/components/custom/disco-glyph/DiscoGlyph.vue    —swap raw inject → helper
M src/components/custom/glyph-face/index.ts           —export new helpers
```

12 files, ~+50/-15 lines. Single-agent lane, no brittleness window (all atomic per-site).

### §6.2—Naming convention

Match the O.W2 canonical naming for symmetry:

- `provide<Foo>Context(ctx)` for the provider helper.
- `use<Foo>Context()` for strict (throws inline).
- `useOptional<Foo>Context()` for the silent default.

Where the typed-key name diverges from `*_KEY` convention (`SORTABLE_CONTEXT`, `GlyphFaceSilhouetteKey`), the P-wave should NOT rename the symbol (no backwards-compat—but no churn for symmetry either; the helpers wrap whatever symbol name is canonical). Helpers follow the component name, not the symbol name:

- `provideConfiguratorDensity` / `useOptionalConfiguratorDensity` (key = `CONFIGURATOR_DENSITY_KEY`).
- `provideSortableContext` / `useSortableContext` (key = `SORTABLE_CONTEXT`).
- `provideGlyphFaceSilhouette` / `useOptionalGlyphFaceSilhouette` (key = `GlyphFaceSilhouetteKey`).

### §6.3—Wave assignment

This work is one HEADLINE lane in a P invariant-25-completion wave (analog of O.W2 Lane A, but lighter—no transitional brittleness window because all 3 sites are atomic—Lane A owns both ends of each pair).

Suggested wave label: `P.W<n>—DI helper-pair completion sweep (3-site invariant-25 closure)`.

### §6.4—Invariant 25 freeze

After this sweep lands, ALL 6 typed `InjectionKey<T>` sites in `src/` carry helper-pair canonical shape. Invariant 25 becomes a closed invariant—any NEW typed key authored after P close MUST ship with helper pair at provide-time, never as TYPED-KEY-ONLY. The next typed key authored in tranche Q or later should be reviewed against this invariant at PR time.

---

## §7—Risks

- **R1—invariant-25 enforcement is convention, not type system.** A future contributor can still call `provide(SORTABLE_CONTEXT, sortable)` directly even after `provideSortableContext()` exists. The type system accepts both. Mitigation: ESLint rule disallowing `provide(<typed-key>, ...)` and forcing the helper, OR a tranche-close δ-style audit that re-scans for raw `provide(`/`inject(` against typed-key symbols. Documentation in CLAUDE.md (§Component architecture) suffices for now; the rule lift can land in a later tranche.

- **R2—`<SortableItem>` strict helper inverts the call-site error-thrower.** Currently, the inline throw at `SortableItem.vue:30-34` produces stack frames pointing at the call site. Moving the throw into `useSortableContext()` re-points the stack frame at the helper (`sortable-list/context.ts:NN`). For debugging this is marginally worse (one more frame), but for the contract surface it's significantly clearer (the helper IS the contract). Net positive; mitigation = make the error message explicit about the missing parent component (which it already is).

- **R3—`ConfiguratorDensity`'s default semantics are subtle.** Current code: `inject(CONFIGURATOR_DENSITY_KEY, undefined)` then `injectedDensity?.value`. The `undefined` default + optional-chain is load-bearing—when no `<Configurator>` ancestor, no `data-density` attr is emitted, preserving pre-N.W2 visual. The helper `useOptionalConfiguratorDensity()` must return `ComputedRef<ConfiguratorDensity> | undefined` (NOT `| null`) to preserve the exact `?.value` access pattern at the call site. Subtle but enforced by typecheck—failure mode is loud, not silent.

- **R4—no new typed-key sites at HEAD after the sweep.** Invariant 25 then has 6/6 completion. The AB+1 cohort verified zero new pairs introduced—but this MUST be re-verified at P close (the round-2 consumer audit may surface new substrate proposals that ship under P that introduce new DI surfaces; each MUST ship helper-pair-first).

- **R5—round-2 consumer audit may surface external string-key injects.** External consumers (downstream apps, demo chrome, fourier-analysis, value.js, speedtest) MAY still reach for the retired string keys (`"glassDockContext"`, `"dockKeepOpen"`, etc.) if they were previously cargo-cult-copied from the pre-O.W2 library. MIGRATION.md should document the v1.0.x → v1.1+ migration path (string-key → `useOptionalDockContext()`). This is OUT OF SCOPE for this lane but flagged for P.Rζ + P11/* round-2 audits.

---

## §8—Verification

### §8.1—Read commands

```
rg -n 'InjectionKey<' src/
rg -n 'provide\(|inject\(|inject<' src/
rg -n 'glassDockContext|glassDockId|dockKeepOpen|dockRelease|dockHeld|dockExpanded|dockLayerGroup|toggleGroup"' src/
rg -n 'useDockContext|useOptionalDockContext|useDockLayerGroupContext|useOptionalToggleGroupContext|provideDockContext|provideDockLayerGroupContext|provideToggleGroupContext' src/
rg -n 'CONFIGURATOR_DENSITY_KEY|configuratorDensity' src/
rg -n 'GlyphFaceSilhouetteKey' src/
rg -n 'SORTABLE_CONTEXT' src/
rg -n 'provide|inject' src/components/custom/metric-cell src/components/custom/metric-stack src/components/custom/animated-digit src/components/custom/responsive-tabs src/components/custom/header-ribbon
```

### §8.2—Spot-verified files

- `src/components/custom/dock/composables/dockContext.ts`—typed key + helper triple (provide + strict + optional) confirmed.
- `src/components/custom/dock/composables/dockLayerContext.ts`—typed key + helper triple confirmed.
- `src/components/ui/toggle-group/toggleGroupContext.ts`—typed key + provide-helper + optional-helper (no strict; befitting).
- `src/components/custom/configurator/density.ts`—typed key only; NO helpers.
- `src/components/custom/configurator/Configurator.vue:79`—raw `provide(CONFIGURATOR_DENSITY_KEY, computed(...))`.
- `src/components/custom/configurator/ConfiguratorRow.vue:62`—raw `inject(CONFIGURATOR_DENSITY_KEY, undefined)`.
- `src/components/custom/sortable-list/context.ts`—typed key only; NO helpers.
- `src/components/custom/sortable-list/SortableList.vue:80`—raw `provide(SORTABLE_CONTEXT, sortable)`.
- `src/components/custom/sortable-list/SortableItem.vue:29-34`—raw `inject(SORTABLE_CONTEXT)` + inline throw.
- `src/components/custom/glyph-face/keys.ts`—typed key only; NO helpers.
- `src/components/custom/glyph-face/GlyphFace.vue:68`—raw `provide(GlyphFaceSilhouetteKey, injectedSilhouette)`.
- `src/components/custom/disco-glyph/DiscoGlyph.vue:82`—raw `inject(GlyphFaceSilhouetteKey, null)`.
- `src/components/custom/dock/GlassDock.vue:116`—`provideDockContext({...})`.
- `src/components/custom/dock/DockLayerGroup.vue:39,62`—`useOptionalDockContext()` + `provideDockLayerGroupContext()`.
- `src/components/custom/dock/DockLayer.vue:27`—`useDockLayerGroupContext()`.
- `src/components/ui/slider/Slider.vue:53`—`useOptionalDockContext()`.
- `src/components/custom/hover-popover/HoverPopover.vue:143`—`useOptionalDockContext()`.
- `src/components/ui/popover/PopoverContent.vue:34`—`useOptionalDockContext()`.
- `src/components/ui/select/SelectContent.vue:36`—`useOptionalDockContext()`.
- `src/components/ui/dropdown-menu/DropdownMenuContent.vue:28`—`useOptionalDockContext()`.
- `src/components/ui/toggle-group/ToggleGroup.vue:14`—`provideToggleGroupContext({...})`.
- `src/components/ui/toggle-group/ToggleGroupItem.vue:14`—`useOptionalToggleGroupContext()`.
- AB+1 cohort dirs (metric-cell, metric-stack, animated-digit, responsive-tabs, header-ribbon)—zero DI surfaces; non-DI false positives only.

### §8.3—Worktree diff

Read-only lane. No diff.

---

## §9—Open questions for orchestrator

1. **Naming for `<SortableItem>` strict helper**—`useSortableContext()` or `useSortable()`? The latter collides with the composable `useSortable<T>()` at `src/composables/sortable/`. Recommend `useSortableContext()` for clarity (matches the symbol `SORTABLE_CONTEXT`).

2. **`GlyphFaceSilhouetteKey` symbol rename**—currently the symbol is `GlyphFaceSilhouetteKey` (PascalCase + `Key` suffix), diverging from `DOCK_CONTEXT_KEY` (SCREAMING_SNAKE + `_KEY` suffix). The P-wave could either:
   - Leave the symbol name as-is (NO_BACKWARDS_COMPAT is OK because there are zero downstream callers of the raw symbol—only the helpers will be used post-sweep).
   - Rename to `GLYPH_FACE_SILHOUETTE_KEY` for convention symmetry.
   Recommend rename: it's exported from the package barrel (`glyph-face/index.ts:2`), and the convention-break is one of three cosmetic outliers—easier to fix once than leave forever.

3. **ESLint rule for invariant 25**—should the P-wave land an ESLint rule disallowing raw `provide(<key>, ...)` / `inject(<key>, ...)` calls against any `InjectionKey<T>` symbol, forcing helper-only usage? Recommend YES at tranche Q or later; out of scope for the helper-completion sweep itself.

4. **`useOptionalDockLayerGroupContext` still unused**—flagged at O.W2 Lane A close as a symmetry helper. At HEAD verified still unused. Either:
   - Retire (substrate-without-consumer-binary per invariant 8).
   - Leave (one line of export + one helper; the symmetry value is documentation).
   Recommend RETIRE under L invariant 8; folds into a different P-wave (substrate-residual sweep).

5. **`useDockContext()` (strict) is currently unused**—only `useOptionalDockContext()` is used at HEAD across 5 consumers. The strict helper exists for completeness but has no caller. Same disposition as Q4—invariant 8 says retire if zero consumers, but it's contract-completeness substrate (matches the helper-pair canon). Recommend KEEP—different category than Q4 because the strict helper is the canonical primary form (the canonical shape per O.W2 §4.1).
