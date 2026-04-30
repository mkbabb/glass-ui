# ForcedSectionWindowRange

## Artefact path

`src/composables/virtual/virtualSectionLayout.ts:42`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/composables/virtual/useVirtualSectionWindow.ts:18`, `src/composables/virtual/useVirtualSectionWindow.ts:83`
**Use case**: `useVirtualSectionWindow` stores an optional forced warm range as `ForcedSectionWindowRange | null` before resolving the visible window.
**Proof**: `rg -n '\bForcedSectionWindowRange\b' src/composables/virtual/useVirtualSectionWindow.ts`

## Keep rationale

The type names the override range used by the section-window resolver. Keeping it public keeps the warm-range contract explicit instead of burying it in object literals.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `ForcedSectionWindowRange` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
