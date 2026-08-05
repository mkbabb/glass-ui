// The Constellation package barrel.
export { default as Constellation } from "./Constellation.vue";
export {
    seedField,
    stepField,
    refitField,
    buildEdges,
    appendPointerWeb,
    parallaxNodePos,
} from "./constellationField";
// Every tuning constant ships from its OWN home (`constants`), the algorithms from
// theirs — no module holds a re-export of a neighbour's symbol to freeze a barrel
// path (BK #19 W-SHIM-PURGE).
export {
    DEFAULT_K_FLOOR,
    DEFAULT_PARALLAX,
    BASE_WIDTH,
    MAX_NODES,
    MAX_DEGREE,
    E_MAX,
    DEFAULT_WELL_CONFIG,
    DEFAULT_WANDER_IDLE,
    DEFAULT_WANDER_JITTER,
    WARP_RESPONSE,
    WARP_ZETA,
    DEFAULT_PINNED_DRIFT_FRAC,
    DEFAULT_PINNED_DRIFT_DUR,
    DEFAULT_PINNED_DRIFT_IDLE,
    DEFAULT_PINNED_DRIFT_JITTER,
} from "./constants";
export { stepWell } from "./constellationWell";
export {
    nearestNode,
    readInteractionConfig,
    warpStep,
    warpTo,
    setWarpTarget,
    warpSettled,
    pickWanderTarget,
    stepPinnedDrift,
    makePinnedDrift,
    fireBurst,
    BURST_FIRE_THRESHOLD,
} from "./constellationInteraction";
export { kVisOf, readPalette } from "./constellationRender";
export { DEFAULT_PALETTE } from "./constants";
export type {
    ConstellationNode,
    ConstellationEdge,
    ConstellationRipple,
    ConstellationPointer,
    ConstellationPalette,
    ConstellationField,
    ConstellationWarp,
    ConstellationWarpConfig,
    ConstellationWander,
    ConstellationWell,
    ConstellationWellConfig,
    ConstellationPinnedDrift,
    ConstellationProps,
} from "./constellationTypes";
