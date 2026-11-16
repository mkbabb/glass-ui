export { useDockState } from "./useDockState";
export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./useDockState";

export { useDockHold } from "./useDockHold";
export type { UseDockHoldOptions, UseDockHoldReturn } from "./useDockHold";

/* The portal predicate moved to `_shared/overlay/` — beside `overlayContentAttrs`,
   the writer of the very attribute pair it parses. The dock re-exports it because
   the dock is where consumers reach for it; the direction is dock → _shared. */
export { isTeleportedTarget } from "../../_shared/overlay/isTeleportedTarget";
export {
    provideDockContext,
    useDockContext,
    useOptionalDockContext,
    DOCK_CONTEXT_KEY,
    type DockContext,
    type DockOrientation,
} from "./dockContext";
// The face registry provided by DockCrossfade, consumed by DockLayer and the switcher.
export {
    provideDockCrossfadeContext,
    useDockCrossfadeContext,
    DOCK_CROSSFADE_KEY,
    type DockFaceDescriptor,
    type DockFaceRegistration,
    type DockCrossfadeContext,
} from "./dockCrossfadeContext";

// The V↔H orientation morph (`useDockOrientationMorph`), the fission
// facility (`useDockFission` + `dockFissionSignatures`), and the Siri island (`useSiriDock`)
// are DEFINITION-ABSENT (decided-terminal, clean break, no alias). The V↔H flip is the
// crossfade (`<DockCrossfade>`); the fission spectacle + the Siri island were demo-only
// zero-binary-consumer mechanisms + the prime Safari suspect (goo `filter:url()`
// stacked with `backdrop-filter`).
