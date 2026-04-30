# SpringSnapshot

## Artefact path

`src/composables/motion/useSpringOrchestrator.ts:10`

## Current consumer proof

**Project**: `glass-ui demo`
**Source path**: `demo/stories/motion/springs.vue:9`, `demo/stories/motion/springs.vue:69`
**Use case**: The spring orchestrator story uses `SpringSnapshot` to type the animated values passed through its multi-value spring example.
**Proof**: `rg -n '\bSpringSnapshot\b' demo/stories/motion/springs.vue`

## Keep rationale

The type is the named value-shape contract for `useSpringOrchestrator`. Keeping it public makes multi-key spring snapshots explicit for demos and consumers using the orchestrator directly.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `SpringSnapshot` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
