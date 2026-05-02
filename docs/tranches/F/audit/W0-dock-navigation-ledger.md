# F.W0 Dock And Navigation Ledger

The vertical rail is already a `GlassDock` variant, but the dock family has split authority across props, CSS, popover globals, transition timers, portal detection, and story-specific controls. W2 owns these repairs before broader style consolidation.

## Runtime Contract Findings

| Surface | Current behavior | Expected contract | W2 action |
|---|---|---|---|
| `GlassDock.vue` | `variant="rail"` implies vertical orientation, but layer children do not inherit that orientation automatically | the dock provides orientation context; explicit child props still win | add dock context and tests for rail/layer vertical behavior |
| `DockLayerGroup.vue` | default orientation is horizontal; icon strings can render HTML | inherit dock orientation by default; render component/plain text icons only | consume context and remove HTML icon branch |
| `useLayerTransition.ts` | cleanup uses hard-coded 400ms timing | cleanup follows CSS/runtime transition duration and cancellation | listen for transition end/cancel and use a bounded fallback derived from runtime duration |
| `useDockState.ts` | `isTransitioning` guard appears inert; deferred document listener can orphan | make transition state real or remove guard; cancel/clean deferred click-away registration | W2 lifecycle tests/runtime smoke |
| `DockPopover.vue` | global registry and arithmetic `50 + offset` z-index | popup ownership is scoped per dock and z-index comes from named tokens | add owner id/data attributes and token tier |
| Portal detection | broad role/class/Reka assumptions identify outside targets | owned teleports are marked by glass-ui data attributes | add explicit portal marker and registry scope |
| `--glass-blur-dock` | reduced blur exists but route proof is missing | subtle blur is present in horizontal and rail variants | W2 computed-style/browser proof |

## Navigation Story Findings

| File | Current issue | W2 action |
|---|---|---|
| `demo/layout/CategoryRail.vue` | uses `GlassDock variant="rail"` but rebuilds raw button styling | introduce or consume a dock-owned rail item/control pattern |
| `demo/stories/navigation/rail.vue` | raw dock button examples risk diverging from component contract | update examples to use the shared dock item/control contract |
| `demo/stories/navigation/dock.vue` | route must prove horizontal dock blur, focus, layering, and active states | add runtime selectors/assertions through W1 proof substrate |
| `demo/stories/navigation/dock-layers.vue` | route must prove layer orientation, animation cleanup, and popover ownership | add runtime selectors/assertions through W1 proof substrate |
| `demo/stories/foundations/intro.vue` | hash links conflict with history router | W2 or W4 changes to `RouterLink` if nav substrate owns story navigation |

## W2 Owned Files

- `src/components/custom/dock/GlassDock.vue`
- `src/components/custom/dock/DockLayerGroup.vue`
- `src/components/custom/dock/DockPopover.vue`
- `src/components/custom/dock/DockIconButton.vue`
- `src/components/custom/dock/DockTabButton.vue`
- `src/components/custom/dock/composables/useDockState.ts`
- `src/components/custom/dock/composables/useLayerTransition.ts`
- new dock context/registry helpers if needed under `src/components/custom/dock/composables/`
- `src/components/custom/dock/index.ts`
- `demo/layout/CategoryRail.vue`
- `demo/stories/navigation/dock.vue`
- `demo/stories/navigation/rail.vue`
- `demo/stories/navigation/dock-layers.vue`
- dock-owned style/token files named by W2, with broader consolidation deferred to W4

## W2 Proof Requirements

- Runtime route proof for `/navigation/dock`, `/navigation/rail`, and `/navigation/dock-layers`.
- Horizontal and vertical docks show a non-empty computed `backdrop-filter`.
- Rail layer groups remain vertical under open/close interactions.
- Popovers use named token tiers and owned portal markers.
- No stale transition state after repeated open/close/route changes.
