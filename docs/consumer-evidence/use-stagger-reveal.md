# useStaggerReveal

## Artefact path

`src/composables/motion/useStaggerReveal.ts:21`

## Current consumer proof

**Project**: `glass-ui demo`
**Source path**: `demo/stories/motion/stagger.vue:5`, `demo/stories/motion/stagger.vue:11`
**Use case**: The stagger motion story registers reveal items through `useStaggerReveal` and binds the resulting reveal state in the route.
**Proof**: `rg -n '\buseStaggerReveal\b' demo/stories/motion/stagger.vue`

## Keep rationale

The composable owns reusable stagger timing and registration behavior. Its story is a current route-level consumer that exercises the API without duplicating the reveal bookkeeping inline.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `useStaggerReveal` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
