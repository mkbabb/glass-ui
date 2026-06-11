export { useDockState } from "./useDockState";
export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./useDockState";

export { useLayerTransition } from "./useLayerTransition";
export type { UseLayerTransitionOptions, UseLayerTransitionReturn } from "./useLayerTransition";

export { useDockHold } from "./useDockHold";
export type { UseDockHoldOptions, UseDockHoldReturn } from "./useDockHold";

export { isTeleportedTarget } from "./isTeleportedTarget";
export {
    provideDockContext,
    useDockContext,
    useOptionalDockContext,
    DOCK_CONTEXT_KEY,
    type DockContext,
    type DockOrientation,
} from "./dockContext";
export {
    provideDockLayerGroupContext,
    useDockLayerGroupContext,
    useOptionalDockLayerGroupContext,
    DOCK_LAYER_GROUP_KEY,
    type DockLayerDescriptor,
    type DockLayerGroupContext,
} from "./dockLayerContext";
export {
    useDockMorphOrchestrator,
    provideDockMorphContext,
    useOptionalDockMorphContext,
    DOCK_MORPH_KEY,
    type DockMorphContext,
    type DockMorphGroupRegistration,
    type DockMorphGroupHandle,
    type UseDockMorphOrchestratorOptions,
    type UseDockMorphOrchestratorReturn,
} from "./dockMorphContext";

// AZ.W-MORPH-SHOWCASE — the vertical↔horizontal liquid-glass morph driver (the
// metaball-bridge, H4 arm a). Layered on the ONE `--dock-morph-t` scalar; consumer #1
// of `useLiquidFlex` (the W-LIQUID substrate).
export {
    useDockOrientationMorph,
    type DockMorphOrientation,
    type UseDockOrientationMorphOptions,
    type UseDockOrientationMorphReturn,
} from "./useDockOrientationMorph";
