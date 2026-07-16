export { default as Aurora } from "./Aurora.vue";
// Adaptive render substrate. `AuroraRenderMode` is the public prop
// type; `resolveRenderMode` is the device-tier resolver (testable in isolation).
// `ResolveRenderModeOptions` carries the
// `forceWebGLUnderSoftwareRaster` escape; `isSoftwareWebGLRenderer` is the shared
// software-raster predicate (the runtime wedge catch + the resolver consume ONE
// detector — no second probe context).
export {
    resolveRenderMode,
    isSoftwareWebGLRenderer,
    type AuroraRenderMode,
    type ResolveRenderModeOptions,
} from "./constants/renderMode";
export { useAurora } from "./composables/useAurora";
// Named return shape for useAurora.
export type { UseAuroraReturn } from "./composables/useAurora";
export { useCursorInteraction } from "./composables/useCursorInteraction";
export { createAurora } from "./composables/runtime";
export type { AuroraRuntimeMode, AuroraRuntimeOptions } from "./composables/runtime";
export {
    DEFAULT_AURORA_CONFIG,
    PAPER_WASH_GROUND,
    // The chroma-floor identity, composed by consumers
    // these by name, no magic number).
    DEFAULT_VIVIDNESS,
    VIVID_TARGET,
    // Image-source axis defaults and types.
    IMAGE_BLUR_MIN_DEFAULT,
    IMAGE_BLUR_MAX_DEFAULT,
    MAX_NUCLEI,
    MAX_STOPS,
    type AuroraConfig,
    type AuroraCursorApi,
    type AuroraFlow,
    type AuroraInstance,
    type AuroraInteractivity,
    type AuroraMedium,
    type AuroraNucleus,
    type AuroraSource,
    type AuroraImageSource,
    type AuroraImageBlur,
    type FlowPattern,
    type OklchStop,
    type StrokeMode,
    type StrokeOrient,
    type WarpMode,
} from "./constants/presets";
// The resolveAtoms ≤7-atom door is the consumer surface (the full
// AuroraConfig is the INTERNAL author schema). The atom set is re-derived from the
// user's named control elements — COLOR (seed + harmony + colorEnergy), ZONES
// (count + arrangement), NOISE (one organic-boundary knob), MEDIUM (+ texture),
// MOTION. `nucleiPrior` is the ONE single-sourced nuclei prior. `DEFAULT_ATOMS`
// (the empty set) resolves to the wispy-sky default.
export {
    resolveAtoms,
    configToAtoms,
    DEFAULT_ATOMS,
    type AuroraAtoms,
    type AuroraZones,
    type AuroraMediumAtom,
    type AuroraInteractivityAtom,
    type AuroraFieldInteractivityAtom,
    type AuroraSmoothInteractivityAtom,
    type AuroraPainterlyInteractivityAtom,
} from "./composables/atoms";
export {
    nucleiPrior,
    type AuroraMotionAtom,
    type AuroraZoneArrangement,
} from "./composables/atoms-fields";
export {
    cssToOklch,
    deriveAurora,
    flattenPalette,
    hexToOklchStop,
    oklchStopToHex,
    oklchToLinear,
    paletteToCssGradient,
} from "./composables/color";
// The luminance-faithful headless fallback ground (the
// field-sampled nuclei-glow surface for the software-raster / capture substrate;
// reuses oklchToLinear — ONE color source). `sampleAuroraField` is the per-pixel
// static composite mirror the certify π measures.
export {
    auroraFallbackGround,
    sampleAuroraField,
    nucleiFieldStatic,
    relativeLuminance,
    type AuroraFallbackGround,
    type AuroraFallbackGroundOptions,
    type AuroraGroundMetrics,
} from "./composables/auroraFallbackGround";
// D10b — the seed-one-color → N-stop palette producer (composes the shipped
// value.js OKLab/gamut core). T6 wires it into the Palette configurator tab.
// W5 — the derive-color superset: more harmonies + easing + temperature.
export type {
    AuroraHarmony,
    DeriveAuroraOptions,
    DeriveEasing,
} from "./composables/color";
// W5 — the value.js HueInterpolationMethod alias for the palette hue-arc atom.
export type { AuroraHuePath } from "./constants/presets";
