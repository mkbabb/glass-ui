# SpaView

## Artefact path

`src/components/custom/spa-view/SpaView.vue` (PUBLISHED — `@mkbabb/glass-ui/spa-view`, the `/spa-view` subpath leaf; reached only via the subpath, NOT the root barrel — the `expandable-container` precedent for a containers-band component).

## Disposition: published subpath + booked cross-repo binary consumer

BB.B7 (W-SPAVIEW-CACHE) builds the bounded view-cache router pane at the relay placement (`docs/tranches/BB/coordination/cross-repo-inbound.md §5`: "spaview-cache `<SpaView :max>` — caches inactive views, out-in; rewires AdminDashboardLayout"). The ≥2-consumer bar (J invariant 10) is met by ONE binary consumer + the in-repo demo exerciser, with the binary consumer BOOKED by name (the cross-repo foreign-tree fence — the speedtest edit lands in the speedtest repo on its `^4.1.0` bump, NOT here).

## Current consumers

**Binary consumer #1 (BOOKED, cross-repo)**: speedtest `AdminDashboardLayout` — the placement names it verbatim ("rewires AdminDashboardLayout"). The admin dashboard's tab/view shell re-points its hand-rolled view-swap onto `<SpaView :max>` so the inactive admin views (charts, tables, settings) stay cached — switching back is instant, no re-mount, no re-fetch. This is the FOREIGN-TREE consume contract: the edit is THEIRS, on their `^4.1.0` bump; glass-ui does NOT edit the speedtest repo. Recorded by name per the E4-9 evidence discipline.

**Demo exerciser (NOT binary)**: `demo/stories/containers/spa-view.vue` — mounts a three-view `<SpaView :is :max="3">` driven by a `<SegmentedTabs>` strip; each view carries a local click-counter that SURVIVES a tab switch (the binding cache witness — a re-mount would reset it). Per W-PRUNE2 E4-3 the demo mount is NOT a binary consumer.
**Proof**: `rg -n 'SpaView' demo/stories/containers/spa-view.vue`

## The no-fork discipline (why this is a thin chassis, not a cache)

SpaView does NOT hand-roll an LRU. Vue's built-in `<KeepAlive :max>` IS the bounded view-cache primitive; `<Transition mode="out-in">` IS the cross-fade. SpaView composes the two behind one prop surface (`view`/`is`, `max`, `include`/`exclude`, `transition`, `viewKey`). The transition is compositor-only (the shared opacity-only `.fade` recipe, `proof:no-layout-animation`) and PRM-gated (instant swap under `prefers-reduced-motion: reduce`). The component is the visual-load-bearing chassis the booked consumer + the demo bind; the platform primitive is the cache.

## Booked promotion / no-op trigger

If the speedtest AdminDashboardLayout adopt does NOT land on the `^4.1.0` bump (the booked binary consumer fails to materialize) AND no second in-repo binary mount appears, the published subpath is re-examined at the next prune census (the substrate-without-consumer bar, L invariant 8) — the demo exerciser alone does not clear the ≥2-binary bar, so a published leaf with only a demo consumer is the booked re-examination trigger.
