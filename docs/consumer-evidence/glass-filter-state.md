# GlassFilterState

## Artefact path

`src/composables/glass/useGlassRenderer.ts:118`

## Current consumer proof

**Project**: `glass-ui`
**Source path**: `src/composables/glass/useGlassRenderer.ts:127`, re-exported via `src/composables/glass/index.ts`
**Use case**: `useGlassRenderer` stores the current SVG filter allocation as `GlassFilterState | null` so it can safely destroy and recreate renderer state. (Re-pointed AY — the GlassPanel component retired; `useGlassRenderer` is the surviving composer.)
**Proof**: `rg -n '\bGlassFilterState\b' src/composables/glass/useGlassRenderer.ts`

## Keep rationale

The type names the renderer lifecycle contract shared by filter creation and teardown. Preserving it keeps the substrate API explicit rather than relying on inferred structural types at call sites.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `GlassFilterState` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
