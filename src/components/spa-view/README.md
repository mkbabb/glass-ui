# SpaView

The bounded view-cache router pane (`@mkbabb/glass-ui/spa-view`, BB.B7 —
W-SPAVIEW-CACHE). A thin chassis that CACHES inactive views so switching back is
instant — no re-mount, no re-fetch — with an `:max` LRU cap and an out-in
cross-fade between views.

```vue
<!-- driving the active view from a `:is` prop (the dynamic-component form) -->
<SpaView :is="activeView" :max="4" />

<!-- driving the active view from the slot (the consumer owns `:is` inside) -->
<SpaView :view-key="active" :max="4">
    <component :is="viewFor(active)" />
</SpaView>
```

## The mechanism — KeepAlive IS the cache (no hand-rolled LRU)

The platform already ships the view-cache primitive: Vue's built-in
`<KeepAlive :max>` is a bounded LRU of mounted-but-inactive component instances.
SpaView does NOT hand-roll a cache (the no-fork discipline) — it COMPOSES
`<KeepAlive>` inside a `<Transition mode="out-in">`:

- **`<KeepAlive :max>`** caches the inactive views. `:max` is the LRU cap (the max
  number of cached instances); `include`/`exclude` pass straight through. Switching
  back to a cached view restores the live instance — its scroll position, form
  state, and any fetched data survive (the "instant back-switch, no re-fetch" ask).
- **`<Transition mode="out-in">`** is the cross-fade between views: the outgoing
  view fades out, THEN the incoming view fades in (the `out-in` ordering, never an
  overlapping cross-dissolve that would double-stack two router panes).

## The transition is compositor-only + PRM-gated

The default `transition="fade"` is the shared opacity-only recipe
(`src/styles/transitions.css` `.fade-*`) — a view-swap fade with ZERO layout
property (`proof:no-layout-animation` owns the library-wide enforcement). Under
`prefers-reduced-motion: reduce` the `.fade` recipe shortens to an
effectively-instant swap (the vestibular floor — the swap still happens, the
animation does not). A consumer overrides `:transition` with any other
`mode="out-in"`-safe recipe name (`pane-swap`, &c.).

## Props

| prop | type | default | role |
|---|---|---|---|
| `view` / `is` | `Component \| string` | — | the active view (dynamic `<component :is>`); `view` wins when both are set |
| `max` | `number` | — | the KeepAlive LRU cap (unbounded when unset) |
| `include` / `exclude` | `string \| RegExp \| (string\|RegExp)[]` | — | KeepAlive allow/deny pass-through |
| `transition` | `string` | `"fade"` | the `<Transition>` out-in recipe name |
| `viewKey` | `string \| number` | resolved view | the stable key the swap keys off |

## Consumers (the ≥2-consumer bar)

See `docs/consumer-evidence/spa-view.md`. The booked binary consumer is the
speedtest `AdminDashboardLayout` (the cross-repo CONSUME contract — the
"rewires AdminDashboardLayout" placement; the foreign-tree fence holds, that edit
lands in the speedtest repo on its `^4.1.0` bump). The in-repo demo story
(`demo/stories/containers/spa-view.vue`) is the live exerciser.
