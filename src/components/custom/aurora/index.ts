export { default as Aurora } from "./Aurora.vue";
// AM.W1 — adaptive render substrate. `AuroraRenderMode` is the public prop
// type; `resolveRenderMode` is the device-tier resolver (testable in isolation).
export { resolveRenderMode, type AuroraRenderMode } from "./constants/renderMode";
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
    type AuroraInteractivity,
    type AuroraMedium,
    type AuroraNucleus,
    type FlowPattern,
    type OklchStop,
    type StrokeMode,
    type StrokeOrient,
    type WarpMode,
} from "./constants/presets";
// AX.W10 — the resolveAtoms ≤7-atom door is THE consumer surface (the full
// AuroraConfig is the INTERNAL author schema). The atom set is re-derived from the
// user's named control elements — COLOR (seed + harmony + colorEnergy), ZONES
// (count + arrangement), NOISE (one organic-boundary knob), MEDIUM (+ texture),
// MOTION. `nucleiPrior` is the ONE single-sourced nuclei prior. `DEFAULT_ATOMS`
// (the empty set) resolves to the wispy-sky default.
export {
    resolveAtoms,
    nucleiPrior,
    DEFAULT_ATOMS,
    type AuroraAtoms,
    type AuroraMotionAtom,
    type AuroraZones,
    type AuroraZoneArrangement,
    type AuroraMediumAtom,
    type AuroraInteractivityAtom,
} from "./composables/atoms";
export {
    cssToOklch,
    deriveAurora,
    flattenPalette,
    hexToOklchStop,
    oklchStopToHex,
    oklchToLinear,
    paletteToCssGradient,
} from "./composables/color";
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
