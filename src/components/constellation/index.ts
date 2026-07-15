// The Constellation package barrel.
export { default as Constellation } from "./Constellation.vue";
export {
    seedField,
    stepField,
    refitField,
    buildEdges,
    appendPointerWeb,
    parallaxNodePos,
    BASE_WIDTH,
} from "./constellationField";
export {
    DEFAULT_K_FLOOR,
    DEFAULT_PARALLAX,
    MAX_NODES,
    MAX_DEGREE,
    E_MAX,
} from "./constants";
export {
    stepWell,
    nearestNode,
    readInteractionConfig,
    warpStep,
    warpTo,
    setWarpTarget,
    warpSettled,
    pickWanderTarget,
    stepPinnedDrift,
    makePinnedDrift,
    DEFAULT_WELL_CONFIG,
    DEFAULT_WANDER_IDLE,
    DEFAULT_WANDER_JITTER,
    DEFAULT_PINNED_DRIFT_FRAC,
    DEFAULT_PINNED_DRIFT_DUR,
    DEFAULT_PINNED_DRIFT_IDLE,
    DEFAULT_PINNED_DRIFT_JITTER,
    WARP_RESPONSE,
    WARP_ZETA,
    fireBurst,
    BURST_FIRE_THRESHOLD,
} from "./constellationInteraction";
export {
    kVisOf,
    readPalette,
    DEFAULT_PALETTE,
} from "./constellationRender";
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
