# GlassTier

## Artefact path

`src/composables/glass/useGlassRenderer.ts:3`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/composables/glass/useGlassRenderer.ts:3` (declared + returned as the `tier` ref), consumed by `demo/stories/composables/use-glass-renderer.vue`
**Use case**: `useGlassRenderer` returns the active `GlassTier` and the use-glass-renderer story reads it to distinguish SVG-filter, CSS, and fallback renderer paths. (Re-pointed AY — the GlassPanel component retired; `useGlassRenderer` is the surviving composer.)
**Proof**: `rg -n '\bGlassTier\b' src/composables/glass/useGlassRenderer.ts; rg -n '\buseGlassRenderer\b' demo/stories/composables/use-glass-renderer.vue`

## Keep rationale

The union is the named capability tier contract for the glass substrate. It documents the supported renderer states and lets component props and stories stay aligned with the renderer implementation.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `GlassTier` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
