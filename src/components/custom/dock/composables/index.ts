export { useDockState } from "./useDockState";
export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./useDockState";

// BC.W-DOCK-SEARCH — the dock-as-native-dynamic-search-bar seam. Composes useDockState +
// the SHIPPED /search fuzzy pipeline (useFuzzySearch, the VSCode scorer — no re-fork) +
// the dock's own --dock-morph-t metaball morph + the optional useScrollChrome shrink +
// the ToC ensureTargetWindow/scrollTo subsume. A consuming seam BESIDE the morph engine
// (dockMorphContext/DOCK_SPRING byte-untouched — the box-inviolate fence).
export { useDockSearch } from "./useDockSearch";
export type { UseDockSearchOptions, UseDockSearchReturn } from "./useDockSearch";

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

// BE.W-DOCK-FISSION — the n-ary detach orchestrator. A CONSUMING seam BESIDE the morph
// engine (dockMorphContext/DOCK_SPRING byte-untouched — box-inviolate): ONE SpringProgress
// on DOCK_SPRING writing --dock-split-t + per-piece DIRECTION-VECTOR off a DockSplitSignature,
// the snap-recoil on useLiquidFlex, the seam-tension on usePointerVelocityField (fed from
// inside the ONE loop), PRM sync-seated. The N-seam goo bridge is fission-bridge.css.
export {
    useDockFission,
    DOCK_SPLIT_SIGNATURES,
    type DockSplitContext,
    type DockSplitVector,
    type DockSplitSquishPeak,
    type DockSplitSignature,
    type DockFissionPieceRegistration,
    type DockFissionPieceHandle,
    type UseDockFissionOptions,
    type UseDockFissionReturn,
} from "./useDockFission";

// BG.W-SIRI-DOCK-CAPABILITY — the Siri-as-a-dock-capability seam. Composes the ONE
// `useDockSpring` factory (form morph) + `useLiquidReveal` (source-rect bloom) + the
// existing `useDockSearch` pipeline — no second engine. NOT a subpath/api export (the
// capability reaches consumers via the `/dock` subpath only).
export {
    useSiriDock,
    type UseSiriDockOptions,
    type UseSiriDockReturn,
} from "./useSiriDock";
