# SectionWindowRange

## Artefact path

`src/composables/virtual/virtualSectionLayout.ts:34`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/composables/virtual/useVirtualSectionWindow.ts:20`, `src/composables/virtual/useVirtualSectionWindow.ts:76`
**Use case**: `useVirtualSectionWindow` tracks the resolved visible and warmed range as `SectionWindowRange`.
**Proof**: `rg -n '\bSectionWindowRange\b' src/composables/virtual/useVirtualSectionWindow.ts`

## Keep rationale

The type names the resolver output used by virtualized section consumers. Keeping it public preserves a clear contract for range state and downstream rendering logic.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `SectionWindowRange` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
