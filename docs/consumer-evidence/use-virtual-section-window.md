# Virtual section windowing — demo ownership

`@mkbabb/glass-ui/virtual` remains retired. The former consumer evidence was
invalid: words imports its own divergent local copy, and Glass's production Dock
accepts only an optional target-window callback. There is no external or `src/`
runtime consumer.

The reduced windowing implementation now lives with its two real consumers:

- `demo/composables/virtual/`
- `demo/stories/data/virtual-section.vue`
- `demo/stories/dock/dock-search.vue`

The ToC story uses `useScrollTo` + `useLazyLoader` directly; composing a virtual
window there duplicated target-mount authority. `useWindowedStore` was also
deleted because it had no runtime consumer. The surviving windower keeps only
measured heights, bounded far seating through the ordinary overscan range,
pre-target measurement reconciliation, visible items/spacers, target ensure,
and active-id readback. It has no forced range or hold timer.

The focused behavior test is `tests/demo/virtual-section-layout.test.ts`. The
package has no export, root re-export, source forwarder, declaration, or
compatibility path for this demo facility. A future public surface must be
justified anew by real binary consumers.
