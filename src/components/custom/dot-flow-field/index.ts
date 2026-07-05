export { default as DotFlowField } from "./DotFlowField.vue";
export {
    useDotFlowField,
    type DotFlowFieldHandle,
    type UseDotFlowFieldOptions,
} from "./composables/useDotFlowField";
export {
    type FlowFieldConfig,
    DEFAULT_FLOW_CONFIG,
    WARM_IDENTITY_PALETTE,
    WARM_NEAR_BLACK_FLOOR,
    MAX_FLOW_STOPS,
} from "./constants";
export {
    type Vec2,
    type StreamFieldParams,
    sampleStreamField,
    curlFBM,
    potentialFBM,
    beadPhase,
    FLOW_LINE_SPACING,
    CURL_EPS,
} from "./composables/flowField";
export type { OklchStop } from "../../../composables/color";
