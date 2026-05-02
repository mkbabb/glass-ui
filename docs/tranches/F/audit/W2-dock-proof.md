# F.W2 Dock, Rail, Layering, And Navigation Proof

W2 hardens the dock as one component family. The vertical dock is `GlassDock variant="rail"`; layer groups inherit dock orientation; popovers and teleported content carry explicit dock ownership; transition cleanup follows CSS timing; and navigation rail examples consume dock controls instead of rebuilding button behavior.

## Changes Landed

| Area | Files | Result |
|---|---|---|
| Dock context | `GlassDock.vue`, `composables/dockContext.ts` | each dock provides a stable owner id, resolved orientation, and scoped popover registry |
| Layer orientation | `DockLayerGroup.vue`, tests | `DockLayerGroup` inherits dock orientation unless an explicit prop overrides it |
| Unsafe icon path | `DockLayerGroup.vue` | raw HTML string icon rendering removed |
| Transition cleanup | `useLayerTransition.ts`, `GlassDock.vue` | layer cleanup uses computed CSS transition duration/delay and transition cancel/end; dock transition state is real and clears by event/fallback |
| Portal ownership | `DockPopover.vue`, `DropdownMenuContent.vue`, `SelectContent.vue`, `PopoverContent.vue`, `isTeleportedTarget.ts` | dock-owned portals are marked with `data-glass-dock-portal` and `data-glass-dock-owner`; click-away no longer relies on Reka selectors or broad roles/classes |
| Popup registry | `DockPopover.vue`, `dockContext.ts` | popover open/close coordination is scoped per owning dock |
| Z-index | `DockPopover.vue` | arithmetic inline z-index removed; popover layers through `--z-popover` |
| Navigation stories | `CategoryRail.vue`, `navigation/rail.vue`, `navigation/dock-layers.vue` | rail examples consume `DockIconButton`; dock-layers adds a rail-hosted layer stack to prove orientation inheritance |
| Runtime proof | `scripts/proof-runtime.mjs` | W2 route assertions check computed dock blur, owned portal markers, and vertical layer inheritance |

## Command Evidence

| Command | Result |
|---|---|
| `npm run iter-check` | pass |
| `npm run iter-test` | pass, 13 files / 234 tests |
| `npm run iter-build` | pass |
| `GLASS_UI_RUNTIME_ARTIFACT=docs/tranches/F/audit/W2-runtime-smoke.json GLASS_UI_RUNTIME_SCREENSHOT_DIR=docs/tranches/F/audit/screenshots/W2/runtime npm run proof:runtime` | pass, 71 routes |

## Runtime Assertions

`W2-runtime-smoke.json` includes dock-specific assertions:

| Route | Assertion | Result |
|---|---|---|
| `/navigation/dock` | every dock surface has non-`none` computed `backdrop-filter` | pass |
| `/navigation/dock` | dropdown content opened from the dock has `data-glass-dock-portal` and a non-empty owner id | pass |
| `/navigation/rail` | a `variant-rail vertical` dock has non-`none` computed `backdrop-filter` | pass |
| `/navigation/dock-layers` | rail-hosted `DockLayerGroup` class includes `vertical` | pass |

Local screenshots were captured under `docs/tranches/F/audit/screenshots/W2/runtime/`; PNGs remain git-ignored, while the JSON artifact records the screenshot paths.

## Residual Routed To W4

W2 intentionally leaves full dock CSS authority convergence to W4. It removed the runtime/style contradictions needed for behavior proof; W4 still owns global `src/styles/dock.css` vs scoped dock style consolidation.
