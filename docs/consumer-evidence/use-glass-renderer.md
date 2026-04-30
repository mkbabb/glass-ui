# useGlassRenderer

## Artefact path

`src/composables/glass/useGlassRenderer.ts:236`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/components/custom/glass-panel/GlassPanel.vue:4`, `demo/stories/foundations/paper-glass.vue:5`
**Use case**: `GlassPanel` asks `useGlassRenderer` for the active renderer tier, and the paper/glass story exposes the same detection readout.
**Proof**: `rg -n '\buseGlassRenderer\b' src/components/custom/glass-panel/GlassPanel.vue demo/stories/foundations/paper-glass.vue`

## Keep rationale

The composable is the public capability-detection surface for glass rendering. It is shared by the component and its story, which keeps renderer fallback behavior observable instead of hidden in component-local state.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `useGlassRenderer` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
