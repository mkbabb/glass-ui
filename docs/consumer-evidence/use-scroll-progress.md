# useScrollProgress

## Artefact path

`src/composables/motion/useScrollProgress.ts:26`

## Current consumer proof

**Project**: `glass-ui demo`
**Source path**: `demo/stories/motion/scroll-type.vue:6`, `demo/stories/motion/scroll-type.vue:11`
**Use case**: The scroll-driven type story binds viewport progress to type animation controls through `useScrollProgress`.
**Proof**: `rg -n '\buseScrollProgress\b' demo/stories/motion/scroll-type.vue`

## Keep rationale

The composable encapsulates the scroll measurement contract for motion stories and future consumers. The demo route gives it a current, Playwright-walked consumer instead of leaving it as a theoretical motion primitive.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `useScrollProgress` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
