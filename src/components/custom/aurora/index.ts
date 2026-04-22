export { default as Aurora } from "./Aurora.vue";
export type { AuroraProps } from "./Aurora.vue";
export { useAurora } from "./composables/useAurora";
export {
    DEFAULT_AURORA_CONFIG,
    OPENAI_DAWN_PRESET,
    OPENAI_SKY_PRESET,
    OPENAI_MEADOW_PRESET,
    PASTEL_STORM_PRESET,
    MAX_PALETTE_STOPS,
    type AuroraConfig,
    type OklchStop,
    type FlowPattern,
} from "./presets";
export {
    oklchStopToHex,
    hexToOklchStop,
    cssToOklch,
    bakePalette,
} from "./composables/color";
