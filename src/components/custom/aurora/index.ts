export { default as Aurora } from "./Aurora.vue";
// AM.W1 — adaptive render substrate. `AuroraRenderMode` is the public prop
// type; `resolveRenderMode` is the device-tier resolver (testable in isolation).
export { resolveRenderMode, type AuroraRenderMode } from "./renderMode";
export { useAurora } from "./composables/useAurora";
// O.W4 Lane B — Fix 2 (Rγ L2): named return shape for useAurora.
export type { UseAuroraReturn } from "./composables/useAurora";
export { useCursorInteraction } from "./composables/useCursorInteraction";
export { createAurora } from "./composables/runtime";
export type { AuroraRuntimeMode, AuroraRuntimeOptions } from "./composables/runtime";
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
    paletteToCssGradient,
} from "./composables/color";
