# useDarkModeSync

## Artefact path

`src/composables/motion/useDarkModeSync.ts:16`

## Current consumer proof

**Project**: `speedtest`
**Source path**: `../speedtest/src/components/speedtest/SpeedtestMeter.vue:11`, `../speedtest/src/components/speedtest/SpeedtestMeter.vue:36`
**Use case**: Speedtest reinitializes its canvas meter after dark-mode changes through `useDarkModeSync`, which waits for Vue and the browser frame before reading CSS variables.
**Proof**: `rg -n '\buseDarkModeSync\b' ../speedtest/src/components/speedtest/SpeedtestMeter.vue`

## Keep rationale

The composable packages a timing-sensitive theme-sync contract that is easy to get wrong in canvas consumers. Its current speedtest usage justifies keeping the API while the meter depends on it.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `useDarkModeSync` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
