# createGlassFilter

## Artefact path

`src/composables/glass/useGlassRenderer.ts:138`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/components/custom/glass-panel/GlassPanel.vue:5`, `src/components/custom/glass-panel/GlassPanel.vue:63`
**Use case**: `GlassPanel` calls `createGlassFilter` when the SVG-filter tier is selected, so the filter DOM, displacement map, and lifecycle state stay in the renderer substrate instead of being hand-built in the component.
**Proof**: `rg -n '\bcreateGlassFilter\b' src/components/custom/glass-panel/GlassPanel.vue`

## Keep rationale

The helper is the creation half of the glass substrate lifecycle and pairs with `destroyGlassFilter`. Keeping it public preserves the renderer boundary used by `GlassPanel` and gives future substrate consumers a stable construction API.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `createGlassFilter` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
