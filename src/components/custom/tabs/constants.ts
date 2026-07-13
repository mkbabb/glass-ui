// AY.W-COLOCATE — the SegmentedTabs feature-dir constants home. The elastic-
// indicator travel-squish magic numbers are RE-EXPORTED from the ONE writer's
// home (BI.W-DOCK-CONTROLS): `useTabIndicator` was PROMOTED to
// `composables/motion/useSelectionIndicator.ts` (the library's single
// traveling-indicator writer — the dock IS SegmentedTabs/ToggleGroup wearing
// chrome). Its squish/blob/release constants live WITH it there; this file
// re-exports them so the tabs feature-dir consumers (`useTabDragMorph`, the SFC)
// keep their `../constants` import — ONE source of the cap/peak/release numbers,
// never a fork. The re-export direction is components → composables (the correct
// layering).
export {
    DEFAULT_INDICATOR_MAX_STRETCH,
    DEFAULT_INDICATOR_BLOB_MAX,
    INDICATOR_RELEASE_AT_ARRIVAL,
} from "../../../composables/motion/useSelectionIndicator";
