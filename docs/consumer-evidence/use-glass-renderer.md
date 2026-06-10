# useGlassRenderer

## Artefact path

`src/composables/glass/useGlassRenderer.ts:236`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `demo/stories/composables/use-glass-renderer.vue:4` (the detection-readout story)
**Use case**: The use-glass-renderer story asks `useGlassRenderer` for the active renderer tier and exposes the detection readout. (Re-pointed AY — the GlassPanel component retired; its renderer-tier lesson lives on in the composable's own story.)
**Proof**: `rg -n '\buseGlassRenderer\b' demo/stories/composables/use-glass-renderer.vue`

## Keep rationale

The composable is the public capability-detection surface for glass rendering — the detection cascade SVG-filter → CSS backdrop-filter → fallback. Its story keeps renderer fallback behavior observable instead of hidden in component-local state.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `useGlassRenderer` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
