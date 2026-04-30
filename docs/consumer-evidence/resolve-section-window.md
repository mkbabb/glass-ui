# resolveSectionWindow

## Artefact path

`src/composables/virtual/virtualSectionLayout.ts:127`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/composables/virtual/useVirtualSectionWindow.ts:17`, `src/composables/virtual/useVirtualSectionWindow.ts:133`
**Use case**: `useVirtualSectionWindow` delegates visible range and warm-range calculation to `resolveSectionWindow`.
**Proof**: `rg -n '\bresolveSectionWindow\b' src/composables/virtual/useVirtualSectionWindow.ts`

## Keep rationale

The function encapsulates the core section-windowing algorithm. Keeping it separate gives the virtual composable a clear resolver boundary and avoids silent one-off range math.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `resolveSectionWindow` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
