# AnimatedNumber

## Artefact path

`src/composables/motion/useAnimatedNumber.ts:37`

## Current consumer proof

**Project**: `glass-ui` and `speedtest`
**Source path**: `src/composables/motion/useAnimatedNumber.ts:58`, `../speedtest/src/components/speedtest/MetricStrip.vue:253`, `../speedtest/src/components/speedtest/Readout.vue:106`
**Use case**: `useAnimatedNumber` returns the named `AnimatedNumber` contract; speedtest consumes the `current` field of that return shape through destructured bindings (`{ current: smoothedProgress }` in `MetricStrip.vue`, `{ current: heroSmoothed }` in `Readout.vue`) to drive live metric strip and hero readout values.
**Proof**: `rg -n '\bAnimatedNumber\b|useAnimatedNumber\b' src/composables/motion/useAnimatedNumber.ts ../speedtest/src/components/speedtest/MetricStrip.vue ../speedtest/src/components/speedtest/Readout.vue`

## Keep rationale

The interface is the public return contract of a currently used composable. It keeps `current`, `isAnimating`, `snap`, and `reset` named as an API rather than forcing consumers to infer the shape from implementation.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `AnimatedNumber` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
