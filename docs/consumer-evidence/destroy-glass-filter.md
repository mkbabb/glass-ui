# destroyGlassFilter

## Artefact path

`src/composables/glass/useGlassRenderer.ts:226`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/components/custom/glass-panel/GlassPanel.vue:6`, `src/components/custom/glass-panel/GlassPanel.vue:73`
**Use case**: `GlassPanel` tears down SVG filter state through `destroyGlassFilter` when renderer state changes or the component unmounts.
**Proof**: `rg -n '\bdestroyGlassFilter\b' src/components/custom/glass-panel/GlassPanel.vue`

## Keep rationale

The helper prevents `GlassPanel` from leaking implementation details about filter DOM cleanup. It is semantically paired with `createGlassFilter`, so keeping both preserves a coherent lifecycle surface.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `destroyGlassFilter` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
