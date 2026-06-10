# AZ.W-DOCK-CONTEXT — the page-driven contextual dock-layer seam

**Name**: W-DOCK-CONTEXT - the route→layer contextual facility
**Opens after**: AZ Batch 2 (after W-DOCK-TAXONOMY renames land; runs ‖ W-RAIL-EXTEND ‖ W-DOCK-NORMALIZE)
**Agents**: 1
**Hard gate**: `proof:dock-contextual-layers` (born-RED) — source witnesses (a GENERAL route-keyed seam exists covering ≥3 IA contexts, and the shell docks RENDER it) PLUS a live witness: navigating the SHELL docks between two demo route-contexts BY ROUTE ALONE swaps the dock's active DockLayer set (the dock shows different layers per page — route→layer determinism, not a 2-route special-case).
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave fills the ONE wholly-absent facility the gaps census found: docks consume ZERO
page/route context today (AZ invariant 3 — build on the named substrate, do not re-derive
the gap). The layering system (`DockLayerGroup` + `DockLayer` + the provide/inject registry)
exists and works; the gap is that layer membership is HAND-AUTHORED per story, never bound
to the active route.

Grounding findings (FLEET-DIGEST.md): **E3G-7** [GAP S2 — the absent contextual facility],
**C1-R3-14-contextual-layers-absent** [DESIGN-FINDING — docks mounted only in story routes],
**E3-gaps headline** [R3-14 is the lone wholly-absent of the 7 R3 facilities].

**The gap (E3G-7 — confirmed at HEAD this authoring).** `grep useRoute|route\.` over
`SidebarDock.vue` + `BottomDock.vue` returns EMPTY — the demo shell docks are static nav,
route-blind. The layer registry IS live: `DockLayerGroup` exposes `v-model:active`
(a string layer id, DockLayerGroup.vue:40 — defineModel("active")) + the `provideDockLayerGroupContext` /
`useDockLayerGroupContext` DI pair (dockLayerContext.ts:45), and `DockLayer` self-registers
its descriptor. But the layers are hand-authored per story (`dock/layers.vue:68-108`, static
`root`/`assets`/`layers`/`libs`), never route-context-driven. The substrate to build on is
present: `AppShell.vue:51` ALREADY reads `const route = useRoute()`; the manifest
(`demo/stories/manifest.ts`) is the category source-of-truth the shell docks already consume
(SidebarDock + BottomDock read it, manifest.ts header :8). The seam is a route→layer map
keyed off the manifest category, wired into the shell docks.

**Structural note (re-grep CONFIRMED — the shell docks have NO DockLayerGroup at HEAD).**
`grep -c 'DockLayerGroup|DockLayer' demo/layout/{SidebarDock,BottomDock}.vue` returns **0** in
each — the shell docks are hand-rolled `DockIconButton`/`DockTabButton` lists (16 in BottomDock,
5 in SidebarDock), NOT a layer-group host. So this wave does not merely "wire" an existing
group: it must ADD a `<DockLayerGroup>`/`<DockLayer>` render to the shell docks driven by the
contextual seam. That is a structural addition to the shell IA — it composes with (and must
sequence against) W-DOCK-NORMALIZE's census (shell docks read-only there) and W-SHELL-CONFIG's
gear rehoming (Batch 3, sequenced after — see Disjointness). The impl agent confirms the
shell-dock render shape before adding the group; if the contextual layer-group cannot coexist
with the existing hand-rolled nav list without an IA rebuild, that is a scope-reveal (escalate,
do not unilaterally rebuild the shell nav).

RE-GROUND command set (run all; confirm the gap + the substrate):

```
grep -n 'useRoute\|route\.\|\$route' demo/layout/SidebarDock.vue demo/layout/BottomDock.vue  # MUST be empty (the gap)
sed -n '25,45p' src/components/custom/dock/DockLayerGroup.vue                                  # v-model:active + props
sed -n '40,55p' src/components/custom/dock/composables/dockLayerContext.ts                     # the live registry
sed -n '60,110p' demo/stories/dock/layers.vue                                                  # the hand-authored, route-blind layers
grep -n 'useRoute\|manifest\|category' demo/layout/AppShell.vue                                # route IS read; manifest IS consumed
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the state |
|---|---|---|---|
| 1 | E3G-7 contextual layers absent [S2] | `demo/layout/SidebarDock.vue` + `BottomDock.vue` (grep useRoute = EMPTY); `audit/USER-AUDIT-2026-06-10-R3.md:35` (R3-14) | docks consume zero route context; layer membership is route-blind |
| 2 | the live registry substrate | `src/components/custom/dock/composables/dockLayerContext.ts:45`; `DockLayerGroup.vue:40` (`defineModel<string>("active")`) | the layer registry + active-layer model exist and work |
| 3 | the route substrate | `demo/layout/AppShell.vue:51` (`useRoute()` already present); `demo/stories/manifest.ts:8` (category source the docks consume) | the route + the manifest category map are available, just unused by docks |
| 4 | the hand-authored layers | `demo/stories/dock/layers.vue:68-108` | layers are static per story, never bound to the active route |

## Goal criterion

The demo dock shows DIFFERENT DockLayer sets based on the page's context — navigating
between route-contexts swaps which layers the dock displays — so the dock's layering system
reads as a page-aware contextual facility (the R3-14 first-principles redesign), with the
demo shell as the reference consumer. The seam is a thin, idiomatic route→layer map over the
EXISTING layer registry, not a new compositing path.

## Scope

1. Mint the route→layer-set seam: a `useContextualDockLayers(route)` demo composable (and/or
   a thin library `<DockLayerGroup :context>` prop) that maps the active category/route to a
   `DockLayer` set the dock renders. The library half (if any) is a SINGLE thin prop reading
   the existing `v-model:active` + a registered route→layer map — NOT a new layer machinery
   (the registry already exists). The recommendation: a DEMO-SIDE composable +
   per-route-context layer manifest, with the library seam minimal (the ≥2-consumer bar:
   the demo shell SidebarDock + BottomDock are the 2 consumers).
2. Wire the demo shell docks (SidebarDock + BottomDock) to the seam: each reads the active
   route (the `useRoute()` AppShell already has, or its own) and renders the contextual
   DockLayer set for the current category — so the dock's layers change as the user navigates
   the storybook IA (Foundations / Substrates / Dock / Motion / … each surfaces its own
   contextual layer set).
3. Author the per-route-context layer manifest: a map from manifest category (or route key)
   to a `DockLayer` descriptor set, co-located with the demo IA (the manifest's category
   tree is the natural key). Keep it data-driven so adding a category's contextual layers is
   a manifest row, not a code edit (mirroring the manifest's own "adding a story is a row"
   discipline).
4. Author `proof:dock-contextual-layers` (born-RED): source witnesses (the seam is a GENERAL
   route-keyed lookup covering ≥3 IA contexts + the shell docks RENDER its return) + a LIVE
   witness (the SHELL dock, navigated by route alone, shows two route-contexts → two distinct
   active DockLayer sets — the route→layer determinism).

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if the contextual seam cannot be a
  thin prop/composable over the existing `v-model:active` registry and requires re-architecting
  `dockLayerContext.ts` (the provide/inject DI core, a shared library surface), that is a
  scope-reveal — triumvirate. The registry is the substrate; this wave layers a route-map
  ON it, it does not rebuild it.
- **Hard-gate failures not local-edit-recoverable**: if the live witness cannot show a
  per-route layer swap (the layers do not change on navigation) after the wiring lands, that
  is a wiring miss — triumvirate; do not loop on the route-watch.
- **Diagnostic loop halt**: if the shell-dock route-context wiring conflicts with
  W-DOCK-NORMALIZE's census edits or W-SHELL-CONFIG's gear rehoming (both touch the shell IA)
  and three iterations have not deconflicted, halt and triumvirate the shell-dock ownership.

## File Bounds

| File | Access |
|---|---|
| `demo/composables/useContextualDockLayers.ts` | create (the route→layer demo composable) |
| `demo/layout/SidebarDock.vue` | modify (consume the contextual seam) |
| `demo/layout/BottomDock.vue` | modify (consume the contextual seam) |
| `demo/stories/dock-layer-contexts.ts` | create (the per-route-context layer manifest) |
| `src/components/custom/dock/DockLayerGroup.vue` | modify (ONLY if a thin `:context`-class prop is the chosen library half; else untouched) |
| `scripts/proof-dock-contextual-layers.mjs` | create (the born-RED gate) |
| `package.json` | modify (register `proof:dock-contextual-layers` + parity) |
| `scripts/gates.mjs` | modify (register the gate row in the gate registry) |
| `CLAUDE.md` | modify (record the contextual-layer facility in the dock section, if a library prop lands) |

Do NOT touch: `dockLayerContext.ts` (the registry DI core — read-only substrate; rebuilding
it fires the triumvirate above); `dock/layer-group.css` / the rail (W-DOCK-RAIL / W-RAIL-EXTEND
own those); the feature-demo docks (W-DOCK-NORMALIZE's exempt set); `dock/overview.vue:370-389`
(W-DOCK-NORMALIZE owns that exact range).

### Disjointness

Single agent. **Across Batch 2 — the shell-dock co-write hazard**: this wave modifies
`SidebarDock.vue` + `BottomDock.vue` (the contextual-seam consumers). The full SidebarDock.vue
co-writer set across the tranche is W-DOCK-TAXONOMY, this wave, W-RAIL-EXTEND (all Batch 2),
W-SHELL-CONFIG + W-SHELL-IDENTITY (Batch 3), with W-DOCK-NORMALIZE a read-only census subject —
so the disjointness must be stated against EACH:
- **W-DOCK-TAXONOMY (Batch-2 HEAD, sequenced first via the `→` in the DAG).** Taxonomy re-points
  the `<GlassDock>` invocation off `variant="rail"` BEFORE this wave + the other Batch-2 siblings
  run, so this wave re-grounds the post-rename SidebarDock template.
- **W-RAIL-EXTEND (Batch-2 PARALLEL sibling — the in-batch shared-write).** W-RAIL-EXTEND ALSO
  writes `SidebarDock.vue` (it adds the beyond-dock hairline facility as consumer #1). At the layer
  registry the coordination is contract-only (this wave writes the layer-SET, the end-icon writes
  `active`), but the FILE is shared-write, so the two SEQUENCE on `SidebarDock.vue` — this wave
  lands the contextual `<DockLayerGroup>` render FIRST (it shifts the template lines the facility
  slot targets), then W-RAIL-EXTEND adds its chrome slot against the post-context render — OR they
  run in sibling worktrees with an orchestrator-merged non-overlapping range. They do NOT both hold
  an uncommitted `SidebarDock.vue`. (The `EXECUTION-DAG.md §"BATCH 2"` rationale names this same
  co-write; W-RAIL-EXTEND §6 names this wave reciprocally.)
- **W-DOCK-NORMALIZE (Batch 2).** Declares the shell docks read-only (its only demo edit is
  `dock/overview.vue:370-389`), so no conflict on the shell docks with NORMALIZE.
- **W-SHELL-CONFIG (Batch 3, CROSS-batch sequence).** ALSO edits `SidebarDock.vue` (removing the
  standalone dark toggle, rehoming the gear) — Batch 2 < Batch 3 enforces the order (CONTEXT lands
  first, SHELL-CONFIG builds on the contextual shell). The two must NOT run in parallel against the
  same `SidebarDock.vue`.

`useContextualDockLayers.ts` + `dock-layer-contexts.ts` are new files owned solely here.

## Agent Units

### AZ.W-DOCK-CONTEXT.1 the route→layer seam + manifest

- Goal: a thin, data-driven seam maps the active route to a DockLayer descriptor set over the
  existing layer registry.
- Mechanism: `useContextualDockLayers(route)` (demo composable) reads the active route
  (category key) and returns the `DockLayer` set from `dock-layer-contexts.ts` (the per-route
  manifest). If a library `<DockLayerGroup :context>` prop is chosen, it is a SINGLE prop
  that swaps `v-model:active`'s layer membership from a registered map — minimal, over the
  existing `provideDockLayerGroupContext` registry.
- Files: `demo/composables/useContextualDockLayers.ts`, `demo/stories/dock-layer-contexts.ts`,
  optionally `DockLayerGroup.vue`.
- Sub-gate: the gate's W1 source witness — `useContextualDockLayers` exists, reads the route
  via a GENERAL route-keyed lookup (not a 2-entry special-case), and the context manifest maps
  ≥3 categories to distinct layer sets (so the 2-route capture cannot be the whole map).

### AZ.W-DOCK-CONTEXT.2 the shell docks as reference consumers

- Goal: the demo shell docks display different layers per page.
- Mechanism: SidebarDock + BottomDock consume `useContextualDockLayers` and render the
  contextual `DockLayer` set for the current route; navigating the IA swaps the dock's layers.
- Files: `demo/layout/SidebarDock.vue`, `demo/layout/BottomDock.vue`.
- Sub-gate: the gate's W2 source witness — both shell docks import/consume the contextual
  seam (grep `useContextualDockLayers` in each is non-empty, the inverse of the HEAD-empty
  `useRoute` grep) AND bind its return to a rendered `<DockLayerGroup>`/`<DockLayer>` (not an
  unrendered import); the live witness (W3) shows the layer swap on the shell dock by route alone.

## Hard Gate

`proof:dock-contextual-layers` (born-RED at HEAD, driven GREEN by the wave):

1. **W1 — the seam exists AND is route-KEYED (general, not a 2-entry special-case).**
   `useContextualDockLayers` (and the `dock-layer-contexts.ts` route→layer manifest) exist and
   map the route/category to a DockLayer set via a GENERAL lookup keyed off the active route
   (the manifest category tree is the key), NOT a hardcoded `if (route === A) ... else if (B)`
   pair tuned to pass the two captured routes. **Bite-tightening (anti-evasion)**: the manifest
   covers the demo IA's categories (≥3 distinct mapped contexts so the gate's 2-route capture
   cannot be the WHOLE map — a 2-entry map is a demo-of-two, not the page-aware facility R3-14
   names), and the swap is a route-INDEXED read (assert the composable indexes its return off
   the route key, so the binding is `route → layers`, deterministic, not a manual toggle that
   merely happens to differ on two routes). RED at HEAD: no such composable/manifest; layers
   are hand-authored per story.
2. **W2 — the shell docks consume it AND render it.** SidebarDock + BottomDock import the
   contextual seam AND bind its return to a `<DockLayerGroup>`/`<DockLayer>` render (an import
   that is never rendered is a no-op decoy). RED at HEAD: `grep useRoute|route\.` over both
   shell docks is EMPTY — they are route-blind static nav. **Bite-tightening**: the source
   witness asserts the composable's return is BOUND in the template (the layer set drives the
   rendered DockLayer set), not merely imported.
3. **W3 — the live per-route layer swap on the SHELL DOCKS (THE binding observable).**
   Navigating the SHELL docks (SidebarDock/BottomDock — the named reference consumers, NOT a
   `dock/layers.vue` story route that already carries hand-authored layers) between two demo
   route-contexts at `:5199`, BY ROUTE ALONE (no other interaction), shows the dock's active
   DockLayer set CHANGE — the SAME dock component renders a DIFFERENT layer set purely because
   the route changed (the route→layer determinism, not an incidental difference). The capture
   pins which dock (the shell dock), which two routes, and the layer-set delta. RED at HEAD:
   the docks show the same static nav on every route.
4. **The π binding DELTA** (cardinal-lesson, own-surface): a captured before/after of two
   route-contexts (e.g. Substrates vs Motion) on the SHELL dock, showing the distinct dock
   layer sets, to `docs/tranches/AZ/audit/visual/W-DOCK-CONTEXT-DELTA.md`.

W1+W2 are the device-free CI half; W3 + the π DELTA are the binding live truth. The failure
class the gate forecloses: (a) seam-exists-but-does-not-swap (the gate proves the SWAP, not
the API), (b) swaps-on-two-cherry-picked-routes-only (W1 requires the general route-keyed map
+ ≥3 contexts), (c) swaps-but-not-on-the-shell-docks (W3 pins the named reference consumer).

## Format And Lint Cadence

`npm run typecheck` after the composable + shell-dock edits; `npm run build` if a library
prop lands; `node scripts/proof-dock-contextual-layers.mjs` born-RED before the seam,
GREEN at close; `npm run proof:gate-script-parity` after registration; `git diff --check`
before close.

## Verification Artefacts

- `docs/tranches/AZ/audit/visual/W-DOCK-CONTEXT-DELTA.md` — the two-route-context capture
  showing the distinct dock layer sets + the layer-set delta readback.
- The `proof:dock-contextual-layers` JSON artefact (born-RED + GREEN logs).

## Commit Plan

- impl commit: `feat(demo): page-driven contextual dock layers — route→layer seam + shell-dock consumers (AZ.W-DOCK-CONTEXT)`.
- gate commit: `test(dock): proof:dock-contextual-layers born-RED→GREEN (live per-route swap) + parity`.
- doc/status commit: the CLAUDE.md facility record (if a library prop lands) + the DELTA + PROGRESS row.

## Dependencies

- **Depends on**: W-DOCK-TAXONOMY (Batch 2 head) — the taxonomy rename settles the dock
  family names + whether the layering system is first-class on both orientations; the
  contextual seam must target the post-rename DockLayerGroup. Re-ground after the taxonomy
  lands.
- **Blocks**: W-SHELL-CONFIG (Batch 3) — SHELL-CONFIG rehomes the gear into a dock control on
  the SAME shell docks this wave wires for context; CONTEXT lands first so SHELL-CONFIG builds
  on the contextual shell (sequenced, not parallel — see Disjointness). W-DOCK-NORMALIZE
  (sibling Batch 2) reads the same shell docks for its census; coordinate so the census
  reflects the contextual wiring.

## Archaeology

No prior attempt — R3-14 is a NEW redesign mandate (A1-11: post-dates the AY close, never
claimed addressed). The substrate (the layer registry + `v-model:active` + the manifest
category tree + the AppShell `useRoute`) is all present and untouched by AY; this wave is the
first to bind page context to dock layers. The guardrail against over-building: the seam is a
thin route→layer map over the EXISTING registry (the gate asserts the SWAP, not a new
machinery), honoring the ≥2-consumer bar with the two demo shell docks — no speculative
library surface beyond a single optional `:context` prop.
