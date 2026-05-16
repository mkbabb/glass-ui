# P.W2 Lane B—`SORTABLE_CONTEXT` paired helpers

**Status**: COMPLETED.
**Lane**: P.W2 Lane B (Invariant-25 paired-helper completion—sortable subsystem).
**Files touched**: 4 (`context.ts` + `SortableList.vue` + `SortableItem.vue` + `index.ts`).

---

## §1 Scope

Per `docs/tranches/P/research/Pdelta-di-patterns-post-O.md` §2.2:

> `SORTABLE_CONTEXT`—currently the consumer (`SortableItem.vue:29-34`) uses raw
> `inject(SORTABLE_CONTEXT)` + an inline `if (!sortable) throw new Error(...)`.
> The semantics are **strict** by intent. The canonical P-wave fix is to author
> `provideSortableContext()` + `useSortableContext()` (strict—moves the inline
> throw into the helper). **No optional counterpart needed** (`<SortableItem>`
> is meaningless without a list).

This lane ships the strict-only helper pair. The optional counterpart is
deliberately omitted per Pδ §2.2 intent and invariant 25's "per intent" clause —
a `<SortableItem>` rendered outside a `<SortableList>` has no registration
target and cannot function, so `useOptionalSortableContext()` would be dead
code with no valid call site.

### Name-collision avoidance (Pδ R1)

The composable `useSortable<T>()` already exists at
`src/composables/sortable/useSortable.ts` and is the underlying primitive that
`<SortableList>` instantiates. To avoid the collision, the strict helper is
named `useSortableContext()` (matching the symbol name `SORTABLE_CONTEXT`),
following the Pδ §6.2 naming canon used for `useDockContext` /
`useDockLayerGroupContext`.

---

## §2 Edits (per-file diff summary)

### `src/components/custom/sortable-list/context.ts`

- Added `inject, provide` to the runtime import (was type-only `InjectionKey`).
- Added `provideSortableContext(sortable: UseSortableReturn): void`—wraps the
  raw `provide(SORTABLE_CONTEXT, sortable)` call.
- Added `useSortableContext(): UseSortableReturn`—strict; throws when used
  outside `<SortableList>`. Throw message preserves the `[glass-ui:sortable]`
  prefix + the runtime-debugging string `"<SortableItem> must be used inside
  <SortableList>"` from the prior inline form.
- Expanded the module docstring to document the strict-only intent + the
  rationale for omitting the optional counterpart (Pδ §2.2 cite).
- `SORTABLE_CONTEXT` symbol preserved unchanged for downstream-package parity
  with the prior published shape.

### `src/components/custom/sortable-list/SortableList.vue`

- Dropped `provide` from the `vue` import.
- Replaced the named-symbol import `import { SORTABLE_CONTEXT } from "./context"`
  with `import { provideSortableContext } from "./context"`.
- Replaced `provide(SORTABLE_CONTEXT, sortable)` (line 80) with
  `provideSortableContext(sortable)`.

### `src/components/custom/sortable-list/SortableItem.vue`

- Dropped `inject` from the `vue` import.
- Replaced the named-symbol import `import { SORTABLE_CONTEXT } from "./context"`
  with `import { useSortableContext } from "./context"`.
- Replaced the 6-line raw-inject + inline-throw block (lines 29-34) with the
  1-line helper call `const sortable = useSortableContext()`. Net -5 lines at
  the call site.

### `src/components/custom/sortable-list/index.ts`

- Expanded the existing single-symbol re-export
  `export { SORTABLE_CONTEXT } from "./context"` into a three-symbol named
  re-export, adding `provideSortableContext` + `useSortableContext` for parity.
  `SORTABLE_CONTEXT` is preserved for any direct-symbol consumers (no
  backwards-compat break).

---

## §3 Throw-message parity

The pre-lane inline throw at `SortableItem.vue:30-34`:

```ts
throw new Error(
    "[glass-ui] <SortableItem> must be used inside <SortableList>",
);
```

The post-lane helper throw in `context.ts:useSortableContext`:

```ts
throw new Error(
    "[glass-ui:sortable] <SortableItem> must be used inside <SortableList>",
);
```

The runtime-debugging payload (the `<SortableItem> must be used inside
<SortableList>` clause) is preserved verbatim. The package-prefix is upgraded
from `[glass-ui]` → `[glass-ui:sortable]` to match the canonical
`[glass-ui:<subsystem>]` shape used by `useDockContext` and other O.W2
helpers—strictly additive context for runtime grepping; no consumer-visible
regression.

Per Pδ R2: the stack frame for the throw now points at
`sortable-list/context.ts:useSortableContext` instead of the call site, which
is the canonical helper-contract behaviour (the helper IS the contract). The
error message itself names `<SortableItem>` explicitly so the affected DOM
ancestor remains diagnosable from the message alone.

---

## §4 Verification

```
$ npm run typecheck
> @mkbabb/glass-ui@1.7.1 typecheck
> vue-tsc --noEmit
(exit 0)

$ NODE_OPTIONS=--max-old-space-size=8192 npm run build
…
[vite:dts] Declaration files built in 28684ms.
built in 29.44s
(exit 0)

$ npm test
> @mkbabb/glass-ui@1.7.1 test
> vitest run

Test Files  32 passed (32)
     Tests  361 passed (361)
(exit 0)
```

All three gates green. No test changes—existing 361-test suite covers the
SortableList ↔ SortableItem cooperation surface via the existing component
specs.

---

## §5 Invariant-25 compliance

Strict-only per intent; optional counterpart omitted as invalid per Pδ §2.2.

Invariant 25 requires that every typed `InjectionKey<T>` site ship the
helper-pair shape APPROPRIATE TO ITS INTENT—not a uniform strict + optional
pair at every site. The "per intent" clause governs:

- `DOCK_CONTEXT_KEY` ships strict + optional (cross-substrate consumers may
  render outside the dock).
- `TOGGLE_GROUP_KEY` ships optional-only (`<ToggleGroupItem>` may render
  bare).
- `SORTABLE_CONTEXT` ships strict-only—`<SortableItem>` has no valid
  bare-render path. An optional helper would be unreachable substrate per
  invariant 8.

Post-lane `SORTABLE_CONTEXT` helper-completion status:

| Helper | Status |
|---|---|
| `provideSortableContext(sortable)` | SHIPPED |
| `useSortableContext()` (strict) | SHIPPED |
| `useOptionalSortableContext()` | INTENT-ABSENT (per Pδ §2.2) |

`SORTABLE_CONTEXT` row in the invariant-25 completion table transitions from
**MISSING-BOTH** → **COMPLETE (strict-only per intent)**.

---

## §6 Status

COMPLETED.
