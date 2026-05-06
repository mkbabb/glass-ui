# useAnimatedNumber

## Artefact path

`src/composables/motion/useAnimatedNumber.ts:55`

## Current consumer proof

**Project**: `speedtest`
**Source path**: `../speedtest/src/components/dashboard/charts/MetricGaugeCards.vue:15,56-72`, `../speedtest/src/components/speedtest/Readout.vue:36,106`, `../speedtest/src/components/speedtest/MetricStrip.vue:41,135-149,253`
**Use case**: Speedtest smooths dashboard summary cards (avg download/upload/ping/jitter + total result count), hero readout (`heroValue` → `heroSmoothed`), live metric strip pills (ping/jitter/download/upload), and phase progress through `useAnimatedNumber`.
**Proof**: `rg -n '\buseAnimatedNumber\b' ../speedtest/src/components/dashboard/charts/MetricGaugeCards.vue ../speedtest/src/components/speedtest/Readout.vue ../speedtest/src/components/speedtest/MetricStrip.vue`

## Keep rationale

The composable has multiple current external call sites and wraps the keyframes.js smoothing engine in Vue lifecycle state. Keeping it public avoids duplicating smoothing behavior across live metric consumers.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `useAnimatedNumber` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
