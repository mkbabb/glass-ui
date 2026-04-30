# GlassTier

## Artefact path

`src/composables/glass/useGlassRenderer.ts:3`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/components/custom/glass-panel/GlassPanel.vue:7`, `demo/stories/foundations/paper-glass.vue:5`
**Use case**: `GlassPanel` and the paper/glass story use `GlassTier` to distinguish SVG-filter, CSS, and fallback renderer paths.
**Proof**: `rg -n '\bGlassTier\b' src/components/custom/glass-panel/GlassPanel.vue demo/stories/foundations/paper-glass.vue`

## Keep rationale

The union is the named capability tier contract for the glass substrate. It documents the supported renderer states and lets component props and stories stay aligned with the renderer implementation.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `GlassTier` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
