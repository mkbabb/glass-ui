# findSectionOffset

## Artefact path

`src/composables/virtual/virtualSectionLayout.ts:202`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/composables/virtual/useVirtualSectionWindow.ts:15`, `src/composables/virtual/useVirtualSectionWindow.ts:225`
**Use case**: `useVirtualSectionWindow` exposes offset lookup by delegating section-id searches to `findSectionOffset`.
**Proof**: `rg -n '\bfindSectionOffset\b' src/composables/virtual/useVirtualSectionWindow.ts`

## Keep rationale

Offset lookup is a reusable part of the virtual-section contract. Keeping the helper named makes active-section and scroll-position behavior auditable outside the primary composable.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `findSectionOffset` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
