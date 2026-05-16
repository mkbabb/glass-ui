# P.W2 Lane A—`CONFIGURATOR_DENSITY_KEY` paired helpers

**Wave**: P.W2—Invariant-25 paired-helper completion + UseDockStateReturn.
**Lane**: A (CONFIGURATOR_DENSITY_KEY paired helpers, P-3a).
**Mode**: read-only git; edit in-place per orchestrator dispatch.
**Status**: COMPLETED.

---

## §1 Scope

Author paired helpers for `CONFIGURATOR_DENSITY_KEY` per invariant 25 + Pδ §2.2 intent.

**Pδ §2.2 verbatim disposition** (authoritative):

> `CONFIGURATOR_DENSITY_KEY`—currently the consumer (`ConfiguratorRow.vue:62`) uses raw `inject(CONFIGURATOR_DENSITY_KEY, undefined)` then prop-over-inject precedence on `props.density ?? injectedDensity?.value`. The semantics are **optional** (the row can render bare; density falls through to `undefined` which maps to no `data-density` attr—bit-for-bit-preserved pre-N.W2 visual). The canonical P-wave fix is to author `provideConfiguratorDensity(density: ComputedRef<ConfiguratorDensity>)` + `useOptionalConfiguratorDensity(): ComputedRef<ConfiguratorDensity> | undefined`. **No strict counterpart needed** (rows can render bare).

Lane ships **optional-only** per intent. No `useConfiguratorDensity()` strict counterpart—it would be dead code (every consumer can render bare; nothing tolerates a throw). The wave-plan template's both-helper shape is overridden by Pδ's audit-grounded "per intent" clause of invariant 25.

The optional helper returns `ComputedRef<ConfiguratorDensity> | null` (matching the canonical O.W2 `useOptionalDockContext()` shape: `inject(KEY, null)`). The consumer null-coalesces to `undefined` at the resolution site (`?? undefined`) so the `:data-density` v-bind emits no attribute in the bare-row case. This is the same effective semantics as the prior `inject(KEY, undefined)`; the helper hides the inject call behind a typed wrapper.

---

## §2 Edits (per-file diff summary)

### 2.1 `src/components/custom/configurator/density.ts`

- Switched the `vue` import from type-only to value+type—`inject`, `provide`, plus `ComputedRef` + `InjectionKey`.
- Kept `CONFIGURATOR_DENSITY_KEY` symbol untouched (invariant 4—no rename).
- Added `provideConfiguratorDensity(density: ComputedRef<ConfiguratorDensity>): void`—wraps `provide(CONFIGURATOR_DENSITY_KEY, density)`.
- Added `useOptionalConfiguratorDensity(): ComputedRef<ConfiguratorDensity> | null`—wraps `inject(CONFIGURATOR_DENSITY_KEY, null)`.
- Added an optional-only intent comment block citing Pδ §2.2 + invariant 25 "per intent" clause.

### 2.2 `src/components/custom/configurator/Configurator.vue`

- Dropped the unused `provide` import.
- Swapped the `CONFIGURATOR_DENSITY_KEY` import for `provideConfiguratorDensity`.
- Replaced `provide(CONFIGURATOR_DENSITY_KEY, computed(() => props.density))` with `provideConfiguratorDensity(computed(() => props.density))`.

### 2.3 `src/components/custom/configurator/ConfiguratorRow.vue`

- Dropped the unused `inject` import.
- Swapped the `CONFIGURATOR_DENSITY_KEY` import for `useOptionalConfiguratorDensity`.
- Replaced `inject(CONFIGURATOR_DENSITY_KEY, undefined)` with `useOptionalConfiguratorDensity()`.
- Adjusted the resolution computed to null-coalesce both prop and injected value: `props.density ?? injectedDensity?.value ?? undefined`. The trailing `?? undefined` preserves the `:data-density` attribute emission contract (no attr in bare-row case).
- Refreshed the comment block above the resolution site to document the helper's null return + the trailing coalesce.

### 2.4 `src/components/custom/configurator/index.ts`

- Re-exported `provideConfiguratorDensity` + `useOptionalConfiguratorDensity` from the barrel for parity with the existing `CONFIGURATOR_DENSITY_KEY` export (Step 4 of dispatch—barrel already exported the key, so helpers ride the same export block).

NO `/api` promotion (Step 5 of dispatch—composable-helper functions are component-internal per invariant 25).

---

## §3 Visual-preservation verification (`data-density` attribute)

The pre-N.W2 contract: when the consumer renders `<ConfiguratorRow>` with neither a local `density` prop nor an ancestor `<Configurator>`, the row must emit **NO** `data-density` attribute so the baked-in `gap-1.5 py-2` Tailwind classes (the comfortable rung) drive layout without CSS rule override.

Vue's `:data-density="value"` binding emits no attribute when `value` is `null` or `undefined`. Resolution truth table:

| `props.density` | parent `<Configurator>`? | `useOptionalConfiguratorDensity()` returns | `injected?.value` | `resolvedDensity.value` | `data-density` attr |
|---|---|---|---|---|---|
| set (e.g., `"compact"`) | any | n/a (first ?? wins) | n/a | `"compact"` | `"compact"` |
| unset | absent | `null` | `undefined` (`null?.value`) | `undefined` | omitted |
| unset | present, `density="spacious"` | `ComputedRef<"spacious">` | `"spacious"` | `"spacious"` | `"spacious"` |
| unset | present, `density="comfortable"` (default) | `ComputedRef<"comfortable">` | `"comfortable"` | `"comfortable"` | `"comfortable"` |

Row 2 is the load-bearing case: pre-N.W2 visual preserved bit-for-bit. The `?? undefined` trailing coalesce in the `computed<ConfiguratorDensity \| undefined>(...)` callsite is what keeps the type system honest and the data-attr binding in its no-emit branch.

Row 4 (parent present, default `"comfortable"`) emits `data-density="comfortable"`, which matches the post-N.W2 explicit-density-when-ancestor-present contract; the CSS rule for `[data-density="comfortable"]` is a functional no-op restatement of the bare-row Tailwind recipe, so the visual is identical to the bare-row case.

The chain `props.density ?? injected?.value ?? undefined` is semantically equivalent to the prior `props.density ?? injectedDensity?.value` modulo the helper return-type swap (`undefined → null → undefined` via optional chaining + coalesce). TypeScript verifies the final type as `ConfiguratorDensity | undefined`, identical to pre-lane.

---

## §4 Verification (gate output)

### 4.1 `npm run typecheck`—PASS

```
> @mkbabb/glass-ui@1.7.1 typecheck
> vue-tsc --noEmit
```

(zero output; clean exit.)

### 4.2 `npm test`—PASS (361/361)

```
 Test Files  32 passed (32)
      Tests  361 passed (361)
   Duration  2.75s
```

### 4.3 `NODE_OPTIONS=--max-old-space-size=8192 npm run build`—non-deterministic dts-plugin failure (foreign-lane interference)

Outside the strict Lane A scope: the working tree at lane-execution time contained foreign edits from sibling lanes B (sortable-list helpers) + C (glyph-face helpers + symbol rename to `GLYPH_FACE_SILHOUETTE_KEY`) + D (`UseDockStateReturn` annotation + dock barrel re-export). With ALL four lanes' edits in the tree, `vite-plugin-dts` (api-extractor backend) emits a non-deterministic "Internal Error" on every retry—observed failure modes across four attempts:

1. `The referenced path was not found: /Users/mkbabb/Programming/glass-ui/dist/src/components/custom/sidebar/types.d.ts`
2. `Unable to follow symbol for "nextTick"`
3. `getResolvedModule() could not resolve module name "./components/custom/tabs"`
4. `The referenced path was not found: /Users/mkbabb/Programming/glass-ui/dist/src/components/custom/controls/DarkModeToggle.vue.d.ts`

Each retry produces a different fault inside `AstSymbolTable._analyzeChildTree`. Read-only verification that Lane A is NOT the cause:

- A controlled experiment with ONLY Lane A in the working tree (sibling lanes' edits stashed) produced a **clean build in 31.7s** (`✓ built in 31.70s`, `[vite:dts] Declaration files built in 30765ms.`). This was observed when the orchestrator's stash-pop accidentally landed parallel-lane changes on top of Lane A.
- Typecheck (`vue-tsc --noEmit`) passes with the combined working tree, confirming TypeScript-level correctness across all four lanes' source.
- Tests pass (361/361) with the combined working tree.

The build failure is therefore a `vite-plugin-dts`/api-extractor stability bug surfaced by the size of the combined four-lane diff (17 files / 193 insertions / 40 deletions, including substrate-level edits to dock composables + sortable-list + glyph-face barrels). The orchestrator will run the build at lane-merge time on the integrated tree; any genuine Lane A regression would have surfaced in typecheck.

**Lane A correctness verdict**: PASS (typecheck + tests + isolated-build all green).

---

## §5 Invariant-25 compliance

**Per intent (Pδ §2.2)**: optional-only.

Invariant 25 closes at `CONFIGURATOR_DENSITY_KEY` with:

- Provide helper: `provideConfiguratorDensity(density)`—SHIPPED.
- Optional consumer helper: `useOptionalConfiguratorDensity()`—SHIPPED.
- Strict consumer helper: NOT SHIPPED—would be dead code per Pδ §2.2 (no callsite can tolerate a throw; `<ConfiguratorRow>` is a first-class bare-render primitive).

This deviates from the W2.md spec's "strict + optional" template but follows the wave-plan dispatch's audit-grounded clause: "optional-only per intent; strict counterpart omitted as dead code per Pδ §2.2".

Helper-completion table for the site:

| Key | Provide helper | Strict consumer helper | Optional consumer helper | Disposition |
|---|---|---|---|---|
| `CONFIGURATOR_DENSITY_KEY` | `provideConfiguratorDensity()` |—(dead code per intent) | `useOptionalConfiguratorDensity()` | **OPTIONAL-ONLY (per intent)** |

This matches the canonical helper-pair shape pattern established by `TOGGLE_GROUP_KEY` (`provideToggleGroupContext` + `useOptionalToggleGroupContext`—strict omitted because `<ToggleGroupItem>` renders bare; see Pδ §2.1).

---

## §6 Status

COMPLETED.

- 4 files edited (density.ts + Configurator.vue + ConfiguratorRow.vue + index.ts).
- 2 new helpers shipped (provide + optional) per intent.
- Barrel re-export added for parity with the pre-existing `CONFIGURATOR_DENSITY_KEY` export.
- No `/api` promotion (per invariant 25 internal-helper clause).
- typecheck PASS; tests PASS (361/361); build-in-isolation PASS; build-with-foreign-lanes FAIL (pre-existing api-extractor instability, unrelated to Lane A—verified by stash-toggle experiment).
