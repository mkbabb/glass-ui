# ExpandableContainer

## Artefact path

`src/components/custom/expandable-container/index.ts:1` exports `ExpandableContainer` from `src/components/custom/expandable-container/ExpandableContainer.vue`.

## Current consumer proof

**Project**: `speedtest`
**Source path**: `../speedtest/src/views/ChartsView.vue:50`, `../speedtest/src/views/MapView.vue:11`
**Use case**: Speedtest wraps chart and map panels in `ExpandableContainer` so dense data views can expand without each consumer reimplementing fullscreen chrome, escape handling, and trigger placement.
**Proof**: `rg -n '\bExpandableContainer\b' ../speedtest/src/views/ChartsView.vue ../speedtest/src/views/MapView.vue`

## Keep rationale

`ExpandableContainer` owns a reusable interaction boundary rather than a one-off layout wrapper. The external speedtest views use it for two distinct panels, which proves the abstraction belongs in the library surface while the implementation remains centralized.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for `ExpandableContainer` only while the proof command still finds a current consumer. If the grep fails, the verdict returns to `library-orphan`.
