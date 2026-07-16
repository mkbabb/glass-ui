export { useDockState } from "./useDockState";
export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./useDockState";

// BC.W-DOCK-SEARCH — the dock-as-native-dynamic-search-bar seam. Composes useDockState +
// the SHIPPED /search fuzzy pipeline (useFuzzySearch, the VSCode scorer — no re-fork) +
// the dock's own --dock-morph-t metaball morph + the optional useScrollChrome shrink +
// the ToC ensureTargetWindow/scrollTo subsume. A consuming seam BESIDE the morph engine
// (useDockMorph/DOCK_SPRING byte-untouched — the box-inviolate fence).
export { useDockSearch } from "./useDockSearch";
export type { UseDockSearchOptions, UseDockSearchReturn } from "./useDockSearch";

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
// The face registry provided by DockCrossfade, consumed by DockLayer and the switcher rail.
export {
    provideDockCrossfadeContext,
    useDockCrossfadeContext,
    useOptionalDockCrossfadeContext,
    DOCK_CROSSFADE_KEY,
    type DockFaceDescriptor,
    type DockFaceRegistration,
    type DockCrossfadeContext,
} from "./dockCrossfadeContext";
export {
    useDockMorphOrchestrator,
    type UseDockMorphOrchestratorOptions,
    type UseDockMorphOrchestratorReturn,
} from "./useDockMorph";

// BI.W-DOCK-RETIRES — the V↔H orientation morph (`useDockOrientationMorph`), the fission
// facility (`useDockFission` + `dockFissionSignatures`), and the Siri island (`useSiriDock`)
// are DEFINITION-ABSENT (decided-terminal, clean break, no alias). The V↔H flip is the
// crossfade (`<DockCrossfade>`); the fission spectacle + the Siri island were demo-only
// zero-binary-consumer mechanisms + the prime UF-C3 Safari suspect (goo `filter:url()`
// stacked with `backdrop-filter`). See docs/tranches/AX/audit/DISPOSITION-REGISTER.json
// (retiredBy: BI.W-DOCK-RETIRES).
