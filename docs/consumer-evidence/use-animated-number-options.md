# UseAnimatedNumberOptions

## Artefact path

`src/composables/motion/useAnimatedNumber.ts:20`

## Current consumer proof

**Project**: `glass-ui` and `speedtest`
**Source path**: `src/composables/motion/useAnimatedNumber.ts:57`, `../speedtest/src/components/speedtest/MetricStrip.vue:135-149,255`, `../speedtest/src/components/speedtest/Readout.vue:106-110`, `../speedtest/src/components/dashboard/charts/MetricGaugeCards.vue:56-72`
**Use case**: `useAnimatedNumber` accepts the named options contract; speedtest supplies the shared `{ damping, snapThreshold }` shape (sourced from `DAMPING.domPill`/`SNAP_THRESHOLD.dom` constants) for live metric pills, hero readout, and dashboard summary cards.
**Proof**: `rg -n '\bUseAnimatedNumberOptions\b|damping:|snapThreshold:' src/composables/motion/useAnimatedNumber.ts ../speedtest/src/components/speedtest/MetricStrip.vue ../speedtest/src/components/speedtest/Readout.vue ../speedtest/src/components/dashboard/charts/MetricGaugeCards.vue`

## Keep rationale

The options interface names the tuning surface for the externally consumed smoothing composable. Keeping it public lets callers type reusable option objects without duplicating the composable's configuration shape.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `UseAnimatedNumberOptions` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
