# useSortable

## Artefact path

`src/composables/sortable/useSortable.ts:206`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/components/custom/sortable-list/SortableList.vue:27`, `src/components/custom/sortable-list/SortableList.vue:70`
**Use case**: `SortableList` delegates pointer-capture reorder state, item bindings, and drag lifecycle handling to `useSortable`.
**Proof**: `rg -n '\buseSortable\b' src/components/custom/sortable-list/SortableList.vue`

## Keep rationale

The composable is the implementation substrate for the public sortable-list component. Keeping it public preserves a lower-level escape hatch while the component continues to prove the behavior in source and demo routes.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `useSortable` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
