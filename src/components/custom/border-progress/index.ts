export { default as BorderProgress } from "./BorderProgress.vue";
export type { BorderProgressProps } from "./BorderProgress.vue";
export type {
    BorderProgressCoverage,
    BorderProgressMilestone,
    BorderProgressMilestoneEvent,
} from "./constants";
// `spectrumStops` is the SYNCHRONOUS public surface (the `var()` pass-through + the
// concrete-anchor interim). The OKLCH/shorter-hue `spectrumAt`/`walkConcreteSpectrum`
// walk lives behind the dynamic `./spectrum-walk` boundary (BC.W-AX-BP-LAZY — it
// stays OFF this static barrel so `dist/border-progress.js` is value.js-free).
export { spectrumStops, type SpectrumUpgrade } from "./composables/useBorderSpectrum";
