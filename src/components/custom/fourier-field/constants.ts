// FourierField module constants (BB.W-CARVE3 colocation — the magic-number home
// the renderer extraction owes per the feature-dir colocation idiom).

/**
 * Curve-sampling resolution for the stable view-fit bbox pass — the renderer
 * samples the epicycle curve this many times once at mount to size it to the
 * canvas with a fixed margin (so the curve never clips and the scale is constant
 * across the run). 720 = one sample per half-degree of the unit period.
 */
export const FOURIER_FIT_SAMPLES = 720;
