# SectionLayout

## Artefact path

`src/composables/virtual/virtualSectionLayout.ts:28`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/composables/virtual/useVirtualSectionWindow.ts:19`, `src/composables/virtual/useVirtualSectionWindow.ts:72`
**Use case**: `useVirtualSectionWindow` stores the computed section offsets and total height as a `SectionLayout<T>` ref.
**Proof**: `rg -n '\bSectionLayout\b' src/composables/virtual/useVirtualSectionWindow.ts`

## Keep rationale

The type is the shared data model for all virtual-section helpers. Keeping it public lets consumers and tests name the layout shape instead of depending on inferred internal structure.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `SectionLayout` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
