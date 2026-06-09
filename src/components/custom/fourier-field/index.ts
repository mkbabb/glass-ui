import type { ColorResolver } from "../../../composables/color";

export { default as FourierField } from "./FourierField.vue";
export {
    comp,
    positionsAt,
    makeEllipticSpectrum,
    type BasisComponent,
    type EllipticSpectrumOptions,
} from "./math";

/** The configuration-BUNDLE axis — `hero` (epicycles on, fewer harmonics) vs
 *  `final` (epicycles off, denser). Not a recolour of one curve; one engine,
 *  two presets. */
export type FourierFieldVariant = "hero" | "final";

/** The props a consumer forwards when wrapping `<FourierField>` (the seeded
 *  inverse-DFT epicycle background; ships via `/fourier-field`). Mirrors the
 *  component's inline `defineProps` shape (an SFC cannot export its inline
 *  props type). */
export interface FourierFieldProps {
    /** Configuration bundle. Default `hero`. */
    variant?: FourierFieldVariant;
    /** Base CSS color (a `var()`/`light-dark()` token resolves against the host). */
    color: string;
    /** REQUIRED color seam — resolves a concrete color to a gamma-sRGB [r,g,b] triple in [0,1]. */
    colorResolver: ColorResolver;
    /** Extra seed mixed into the spectrum PRNG for a unique-but-reproducible curve. Default "". */
    seed?: string;
    /** Paint ONE static deterministic best-frame and never animate (the capture lever). Default false. */
    freeze?: boolean;
    /** Outer loudness envelope (the Aurora `opacityCeiling` shape). Scales the
     *  resolved `peakAlpha`/`headGlowAlpha` at the paint layer. Default 1; clamped [0, 2]. */
    intensity?: number;
}
