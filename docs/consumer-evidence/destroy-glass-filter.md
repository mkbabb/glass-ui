# destroyGlassFilter

## Artefact path

`src/composables/glass/useGlassRenderer.ts:226`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/composables/glass/useGlassRenderer.ts:235`, re-exported via `src/composables/glass/index.ts`
**Use case**: `useGlassRenderer` tears down SVG filter state through `destroyGlassFilter` when renderer state changes or its effect scope disposes. (Re-pointed AY — the GlassPanel component retired; `useGlassRenderer` is the surviving composer.)
**Proof**: `rg -n '\bdestroyGlassFilter\b' src/composables/glass/useGlassRenderer.ts`

## Keep rationale

The helper keeps filter DOM cleanup behind the renderer boundary instead of in consumer code. It is semantically paired with `createGlassFilter`, so keeping both preserves a coherent lifecycle surface.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `destroyGlassFilter` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
