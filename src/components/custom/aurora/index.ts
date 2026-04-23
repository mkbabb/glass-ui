export { default as Aurora } from "./Aurora.vue";
export { useAurora } from "./composables/useAurora";
export { useCursorInteraction } from "./composables/useCursorInteraction";
export { createAurora } from "./composables/runtime";
export {
    DEFAULT_AURORA_CONFIG,
    MAX_NUCLEI,
    MAX_STOPS,
    type AuroraConfig,
    type AuroraCursorApi,
    type AuroraFlow,
    type AuroraInstance,
    type AuroraMedium,
    type AuroraNucleus,
    type FlowPattern,
    type OklchStop,
    type StrokeMode,
    type WarpMode,
} from "./presets";
export {
    cssToOklch,
    flattenPalette,
    hexToOklchStop,
    oklchStopToHex,
    oklchToLinear,
} from "./composables/color";
