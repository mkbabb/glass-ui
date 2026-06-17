# W-SPAVIEW-CACHE (BB.B7) — `<SpaView :max>` the bounded view-cache router pane

## The ask (the relay placement)

`docs/tranches/BB/coordination/cross-repo-inbound.md §5` line 112:
> spaview-cache `<SpaView :max>` — caches inactive views, out-in; rewires AdminDashboardLayout

A component that CACHES inactive views (a bounded LRU of mounted-but-inactive views,
so switching back is instant — no re-mount, no re-fetch) with an `:max` cap and an
`out-in` cross-fade between views.

## The mechanism — KeepAlive IS the cache (the no-fork discipline)

The platform already ships the view-cache primitive. SpaView does NOT hand-roll an
LRU — it COMPOSES Vue's built-in `<KeepAlive :max>` (the bounded LRU of inactive
component instances) inside a `<Transition mode="out-in">` (the cross-fade), behind
one prop surface:

| prop | role |
|---|---|
| `view` / `is` | the active view (dynamic `<component :is>`); `view` wins when both are set |
| `max` | the KeepAlive LRU cap (the max cached instances; unbounded when unset) |
| `include` / `exclude` | KeepAlive allow/deny pass-through |
| `transition` | the `<Transition>` out-in recipe name (default `"fade"`) |
| `viewKey` | the stable key the swap keys off (defaults to the resolved view) |

The active-view counter in the demo is the binding cache witness: click it, switch
tabs, switch back — the count SURVIVES (the cache restored the live instance). A
re-mount would reset it to 0.

## The compositor-only + PRM contract

The default `transition="fade"` is the shared opacity-only recipe
(`src/styles/transitions.css` `.fade-*`) — ZERO layout property
(`proof:no-layout-animation` owns the corpus). SpaView authors NO transition/keyframe
of its own; it rides the shared recipe, which the PRM block in transitions.css
already shortens to an effectively-instant swap under
`prefers-reduced-motion: reduce` (the vestibular floor — the swap happens, the
animation does not).

## Files

- `src/components/custom/spa-view/SpaView.vue` — the chassis (KeepAlive + Transition).
- `src/components/custom/spa-view/index.ts` — `SpaView` + `SpaViewProps` barrel.
- `src/components/custom/spa-view/README.md` — the colocation README.
- `src/subpaths/spa-view.ts` — the published-subpath mirror (`/spa-view`).
- `demo/stories/containers/spa-view.vue` — the live demo exerciser (the cache
  witness + the `:max` cap, driven by a `<SegmentedTabs>` strip).
- `docs/consumer-evidence/spa-view.md` — the ≥2-consumer evidence (booked binary
  consumer + the demo exerciser).
- `scripts/proof-spa-view.mjs` — the born-RED→GREEN gate (W1-W5 + the no-fork
  self-test bite).

## The ≥2-consumer bar

- **Binary consumer #1 (BOOKED, cross-repo)** — the speedtest `AdminDashboardLayout`
  (the placement names it verbatim: "rewires AdminDashboardLayout"). The foreign-tree
  fence holds — that edit lands in the speedtest repo on its `^4.1.0` bump, not here.
- **Demo exerciser (NOT binary)** — `demo/stories/containers/spa-view.vue`.

## The binding live-π (rides W-REFLECT3)

The painted truth — the cache survives a switch (counter preserved), the out-in fade,
both modes, the PRM instant swap — is the live readback captured at W-REFLECT3. This
DELTA is the device-free SOURCE record; the gate is the no-device CI half.

## §0 re-ground drift

Re-grepped at HEAD `bce1af11`:
- 39 custom dirs at HEAD (`ls src/components/custom/ | grep -v index.ts | wc -l` → 39);
  the §Structure custom-dir count bumps 39 → 40.
- The `expandable-container` containers-band component is the publication MODEL: a
  subpath leaf reached ONLY via its subpath (NOT the root barrel) — SpaView mirrors
  it (off the root barrel, on `/spa-view`).
- The shared `.fade` recipe in `transitions.css` is already the PRM-handled opacity-
  only out-in default — SpaView defaults to it rather than minting a new recipe (no
  new CSS, no `proof:no-layout-animation` corpus growth).
- `proof:storybook-ia` EXPECTED_TREE `containers` row is the IA home; `spa-view`
  appends there (no `expandable-container`-after issue — alphabetical-adjacent).
