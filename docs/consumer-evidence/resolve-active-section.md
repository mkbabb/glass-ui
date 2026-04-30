# resolveActiveSection

## Artefact path

`src/composables/virtual/virtualSectionLayout.ts:178`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/composables/virtual/useVirtualSectionWindow.ts:16`, `src/composables/virtual/useVirtualSectionWindow.ts:141`
**Use case**: `useVirtualSectionWindow` resolves the active section from current scroll state through `resolveActiveSection`.
**Proof**: `rg -n '\bresolveActiveSection\b' src/composables/virtual/useVirtualSectionWindow.ts`

## Keep rationale

Active-section resolution is a separate virtual-list concern from range calculation. Keeping it named preserves the algorithm boundary and future test surface.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `resolveActiveSection` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
