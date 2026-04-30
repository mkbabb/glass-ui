# buildSectionLayout

## Artefact path

`src/composables/virtual/virtualSectionLayout.ts:53`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/composables/virtual/useVirtualSectionWindow.ts:14`, `src/composables/virtual/useVirtualSectionWindow.ts:124`
**Use case**: `useVirtualSectionWindow` builds section offset metadata with `buildSectionLayout` before resolving visible and warmed ranges.
**Proof**: `rg -n '\bbuildSectionLayout\b' src/composables/virtual/useVirtualSectionWindow.ts`

## Keep rationale

The helper is a named phase in the virtual-section pipeline. Keeping it separate preserves testable layout construction and avoids folding offset bookkeeping into the windowing composable.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `buildSectionLayout` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
