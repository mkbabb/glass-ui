# AZ.W-DOCK-CONTEXT — the page-driven contextual dock-layer seam · DELTA

<!-- surface-paths: demo/composables/useContextualDockLayers.ts, demo/stories/dock-layer-contexts.ts, demo/layout/SidebarDock.vue, demo/layout/BottomDock.vue -->
<!-- surface-hash: 1dbe356042ae924179f66a9e829931084bdef2493e13b502c634c61d443e912e -->
<!-- AZ.W-GATES (D6) content-hash freshness model: fresh IFF the four surface-paths'
     bytes are byte-identical to capture time (sha256 of the "\n"-joined bytes,
     computed via proof-live-verified-ledger.mjs::surfaceHash). Stamped at the
     own-surface capture against the current AZ-tree bytes — the live shell docks
     were navigated by route alone on :5199 with the wave's source edits in place. -->

The ONE wholly-absent facility the R3 gaps census found (E3G-7 / R3-14): the demo
shell docks consumed ZERO page/route context — layer membership was hand-authored
per story, never bound to the active route. The dock layering system (`DockLayerGroup`
+ `DockLayer` + the provide/inject registry) existed and worked; the gap was the
binding. This wave mints the thin route→layer seam over the EXISTING registry (no new
layer machinery) and wires the shell docks to render it, so the SAME dock surfaces a
DIFFERENT `DockLayer` set per page-context — the route→layer determinism R3-14 names.

## The seam (thin, data-driven, general route-keyed)

- `demo/stories/dock-layer-contexts.ts` — `CONTEXT_LAYER_MAP`, a `Record<categoryId,
  ContextLayer[]>` keyed off the manifest `Category.id`. **11 distinct route-contexts**
  mapped (≥3 required so the live 2-route capture cannot be the whole map), **26
  distinct facet layer ids** across them (the contexts carry DISTINCT facet sets, not
  the same set re-keyed). Adding a section's contextual layers is a manifest ROW —
  mirroring the story manifest's own "adding a story is a row" discipline.
- `demo/composables/useContextualDockLayers.ts` — reads `route.meta.categoryId` (the
  router-stamped category key) and indexes `CONTEXT_LAYER_MAP[categoryId]`. A GENERAL
  route-INDEXED read (`route → layers`, deterministic), NOT a hardcoded `if (route ===
  A) … else if (B)` pair. An unmapped/no-category route falls back to a single generic
  section layer.

## The shell docks as reference consumers (≥2-consumer bar)

- `demo/layout/BottomDock.vue` — the prior flat route-blind story-tab `<div>` is now a
  route-driven `<DockLayerGroup v-model:active>` whose layer SET is the active
  section's facets; the switcher rail drills between facets, each facet pane holds its
  quick-jump `<DockTabButton>` RouterLinks. (`data-testid="bottom-dock-context-group"`.)
- `demo/layout/SidebarDock.vue` — a secondary vertical `<DockLayerGroup>` below the
  primary category nav surfaces the active section's facets (rendered only when the
  section carries >1 facet, behind a divider). Co-written this batch with W-RAIL-EXTEND
  (the `#rail` `<DockRail>` end-icon) on a non-overlapping range — the two facilities
  read the SAME navigation state, no parallel store.
  (`data-testid="sidebar-dock-context-group"`.)

The library half is MINIMAL — no new prop, no `dockLayerContext.ts` edit. The existing
`<DockLayerGroup>` + `<DockLayer>` registry + `v-model:active` is the substrate; this
wave layers a route-keyed map ON it (the gate asserts the SWAP, not a new machinery).

## W3 — the live per-route layer swap (the binding observable)

Captured at 1280×800 on :5199, navigating the SHELL docks between two route-contexts
BY ROUTE ALONE (no other interaction). Readback: `W-DOCK-CONTEXT-readback.json`.

| route-context | both shell docks' facet rail | active facet entries |
|---|---|---|
| `/forms/inputs` (Forms) | **Text · Selection · Toggles** | Inputs · Textarea · Number Field |
| `/data/table` (Data) | **Tables · Lists · Series** | Table · Data Table · Tags Input |

`bottomRailDiffers: true`, `sidebarRailDiffers: true` — the SAME dock component renders
a DIFFERENT facet layer set purely because the route changed. The route→layer
determinism, not an incidental difference.

- `W-DOCK-CONTEXT-shell-forms.png` (1280×260) — the shell dock over the Forms page:
  the rail icons {Text/Selection/Toggles} + the Inputs · Textarea · Number Field tabs.
- `W-DOCK-CONTEXT-shell-data.png` (1280×260) — the SAME dock over the Data page: the
  rail icons swapped to {Tables/Lists/Series} + the Table · Data Table · Tags Input tabs.

The W3 live arm is local-only (the dock-animation-live runner-truth disposition — it
needs a served demo + real navigation); it closes under this π DELTA +
proof:live-verified-ledger. The device-free `proof:dock-contextual-layers` W1+W2 arms
(the seam is route-keyed + ≥3 contexts; both shell docks consume + render the seam)
are the CI half — born-RED at HEAD, GREEN at close.

## Gate

`proof:dock-contextual-layers` (`scripts/proof-dock-contextual-layers.mjs`) — born-RED,
driven GREEN by the wave. Bite-verified: collapse the map to a 2-entry hardcode → W1
RED (hardcoded `route === <category>` branch + <3 contexts); drop the `<DockLayerGroup>`
render from a shell dock → W2 RED (import-only decoy); revert the seam → all RED.
