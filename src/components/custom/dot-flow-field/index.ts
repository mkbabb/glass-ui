export { default as DotFlowField } from "./DotFlowField.vue";
export {
    useDotFlowField,
    type DotFlowFieldHandle,
    type UseDotFlowFieldOptions,
} from "./composables/useDotFlowField";
export {
    type FlowFieldConfig,
    DEFAULT_FLOW_CONFIG,
    DEFAULT_WAVE_COMPONENTS,
    WARM_IDENTITY_PALETTE,
    MAX_PARTICLES,
    MAX_WAVE_COMPONENTS,
    MAX_FLOW_STOPS,
} from "./constants";
export {
    type WaveComponent,
    type Vec2,
    sampleVelocity,
    gerstnerVelocity,
    curlFBM,
    pointerVortex,
    type VortexParams,
    buildWaveLadder,
    gridOrigin,
    sampleHeight,
    sampleDisplacement,
    waveBand,
    FLOW_GRAVITY,
    FLOW_DOMAIN_HALF,
} from "./composables/flowField";
export type { OklchStop } from "../../../composables/color";
