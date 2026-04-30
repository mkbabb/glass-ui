# UseSortableReturn

## Artefact path

`src/composables/sortable/useSortable.ts:130`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/components/custom/sortable-list/context.ts:9`, `src/components/custom/sortable-list/context.ts:11`
**Use case**: Sortable child components receive the sortable context through an injection key typed as `UseSortableReturn`.
**Proof**: `rg -n '\bUseSortableReturn\b' src/components/custom/sortable-list/context.ts`

## Keep rationale

The type is the named contract between `useSortable`, `SortableList`, and child sortable primitives. It prevents the context shape from becoming an implicit structural dependency.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `UseSortableReturn` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
