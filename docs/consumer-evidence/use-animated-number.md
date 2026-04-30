# useAnimatedNumber

## Artefact path

`src/composables/motion/useAnimatedNumber.ts:55`

## Current consumer proof

**Project**: `speedtest`
**Source path**: `../speedtest/src/components/dashboard/charts/MetricGaugeCards.vue:15`, `../speedtest/src/components/speedtest/SpeedtestResults.vue:91`
**Use case**: Speedtest smooths dashboard metrics, live pill values, phase progress, and hero result values through `useAnimatedNumber`.
**Proof**: `rg -n '\buseAnimatedNumber\b' ../speedtest/src/components/dashboard/charts/MetricGaugeCards.vue ../speedtest/src/components/speedtest/MetricPillCluster.vue ../speedtest/src/components/speedtest/SpeedtestResults.vue`

## Keep rationale

The composable has multiple current external call sites and wraps the keyframes.js smoothing engine in Vue lifecycle state. Keeping it public avoids duplicating smoothing behavior across live metric consumers.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `useAnimatedNumber` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
