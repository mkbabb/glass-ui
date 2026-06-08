export { default as GlassDock } from "./GlassDock.vue";
export { default as DockLayerGroup } from "./DockLayerGroup.vue";
export { default as DockLayer } from "./DockLayer.vue";
export { default as DockIconButton } from "./DockIconButton.vue";
// AV.W7 G2 — the WCAG 2.2.2 Level-A pause/play toggle for the AV backgrounds
// (Aurora/GooBlob), bound by the consumer to the renderer's pause()/resume().
export { default as DockBackgroundToggle } from "./DockBackgroundToggle.vue";
export { default as DockTabButton } from "./DockTabButton.vue";
export { default as DockSelectTrigger } from "./DockSelectTrigger.vue";
export { default as DockDropdownTrigger } from "./DockDropdownTrigger.vue";

// O.W4 Lane B — Fix 1 (Rγ L1): re-export composable types so consumers can
// type wrappers around the published surface. Previously `UseDockStateOptions`
// and `DockState` were exported only from `./composables/index.ts`, which is
// not reachable through the `@mkbabb/glass-ui/dock` subpath.
//
// P.W2 Lane D (Pγ.3): `UseDockStateReturn` joins the cohort — the named
// composable-return shape paralleling `UseClipboardReturn` / `UseAuroraReturn`.
export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./composables";

// AX.W01 — expose the rebuilt single-scalar `useLayerTransition` on the `/dock`
// subpath barrel (substrate-WITH-consumer). value.js maintains a local FLIP-width
// fork ONLY because this barrel never re-exported the primitive; with the export
// landed the consumer-adoption leg (value.js deletes its fork + re-points
// ActionBarLayer.vue) routes to AX.W34. The primitive is the same one
// `<DockLayerGroup>` already composes — one mechanism, one published surface.
export { useLayerTransition } from "./composables";
export type {
    UseLayerTransitionOptions,
    UseLayerTransitionReturn,
} from "./composables";

// P.W1 Lane B — Fix 2 (P11/b CR-2 prerequisite): re-export the dock-context
// canonical DI primitives so consumers can migrate from the retired
// pre-O.W2 string keys (`"dockKeepOpen"` / `"dockRelease"`) to the typed-key
// helpers without reaching for the deep-import path. fourier-analysis's 2
// silent `inject<...>("dockKeepOpen", null)` sites at SliderControl.vue + GlassTimeline.vue
// (which silently no-op at v1.7.0; functional regression on scrub gestures)
// migrate via `useOptionalDockContext()` once this re-export ships.
export {
    DOCK_CONTEXT_KEY,
    useDockContext,
    useOptionalDockContext,
    provideDockContext,
    type DockContext,
    type DockOrientation,
} from "./composables/dockContext";
