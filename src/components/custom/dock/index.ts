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
// AX.W45 D13-c / DK5 — the orientation+layout-aware dock divider primitive
// (component-over-class: the raw `.dock-separator` was axis-blind). Reads the dock
// orientation/layout via useOptionalDockContext and paints perpendicular to the
// layout axis (vertical hairline in a row dock, horizontal rule in a column dock,
// full-row section break in a grid dock).
export { default as DockSeparator } from "./DockSeparator.vue";
// AZ.W-RAIL-EXTEND — the net-new hairline-rail facility: a divider that runs BEYOND
// the dock edge with a leading/trailing end-icon switching the dock's layer context,
// rendered as a GlassDock `#rail` chrome slot so it survives collapse (the in-dock
// switcher rail vanishes on collapse; this one persists). Composes --border-hairline
// (no hard rule) + binds the consumer-owned context model (one registry, not a
// parallel state path).
export { default as DockRail } from "./DockRail.vue";
// AZ.W-RAIL3 — the chip descriptor for the `<DockRail>` floating carousel strip
// (`items` prop). Lives in `constants.ts` because a `<script setup>` SFC cannot
// re-export a named type through the default barrel.
export type { DockRailItem } from "./constants";

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
    type DockLayout,
} from "./composables/dockContext";

// AZ.W-MORPH-SHOWCASE — the V↔H liquid-glass morph driver (the metaball-bridge, H4
// arm a; consumer #1 of `useLiquidFlex`). Published so a consumer can compose the
// two-dock morph showcase against its own docks.
export {
    useDockOrientationMorph,
    type DockMorphOrientation,
    type UseDockOrientationMorphOptions,
    type UseDockOrientationMorphReturn,
} from "./composables/useDockOrientationMorph";
