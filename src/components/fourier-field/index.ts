import type { OklchStop } from "../../composables/color";
import type { FourierFieldConfig } from "./constants";
import type { BasisComponent } from "./math";

export { default as FourierField } from "./FourierField.vue";
export {
    comp,
    positionsAt,
    partialSumAt,
    dftFromPoints,
    makeEllipticSpectrum,
    makeHarmonicFigure,
    FOURIER_FIGURES,
    FOURIER_FIGURE_KEYS,
    type BasisComponent,
    type EllipticSpectrumOptions,
    type HarmonicTerm,
} from "./math";
export {
    DEFAULT_FOURIER_CONFIG,
    WARM_IDENTITY_PALETTE,
    MAX_PHASORS,
    MAX_CURVE_SAMPLES,
    type FourierFieldConfig,
} from "./constants";
export {
    useFourierField,
    type FourierFieldHandle,
    type UseFourierFieldOptions,
} from "./composables/useFourierField";

/**
 * The props a consumer forwards when wrapping `<FourierField>` (the GPU-substrate epicycle
 * field; ships via `/fourier-field`). Mirrors the component's inline `defineProps` shape because
 * an SFC cannot export its inline props type. Visual bundles live in config presets; the
 * renderer is the WGSL-primary GPU substrate.
 */
export interface FourierFieldProps {
    /** The full author config (the studio's `useConfiguratorState` model). Defaults to the warm identity. */
    config?: FourierFieldConfig;
    /** An explicit CPU-minted spectrum (a curated shape's DFT). When absent, a seeded elliptic spectrum is generated. */
    spectrum?: readonly BasisComponent[];
    /** Resolve the curve palette as OKLCh (the studio themes it). */
    getPalette?: () => OklchStop[];
}
