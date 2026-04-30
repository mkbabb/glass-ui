# UseAnimatedNumberOptions

## Artefact path

`src/composables/motion/useAnimatedNumber.ts:20`

## Current consumer proof

**Project**: `glass-ui` and `speedtest`
**Source path**: `src/composables/motion/useAnimatedNumber.ts:57`, `../speedtest/src/components/speedtest/MetricPillCluster.vue:104`
**Use case**: `useAnimatedNumber` accepts the named options contract, and speedtest supplies shared damping/snap options for live metric smoothing.
**Proof**: `rg -n '\bUseAnimatedNumberOptions\b|pillOpts|damping|snapThreshold' src/composables/motion/useAnimatedNumber.ts ../speedtest/src/components/speedtest/MetricPillCluster.vue`

## Keep rationale

The options interface names the tuning surface for the externally consumed smoothing composable. Keeping it public lets callers type reusable option objects without duplicating the composable's configuration shape.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `UseAnimatedNumberOptions` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
