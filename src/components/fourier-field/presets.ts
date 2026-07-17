// The FourierField variant PRESETS — the configuration-BUNDLE definitions
// (`hero` epicycles-on/fewer-harmonics, `final` epicycles-off/denser) + the
// VariantPreset shape they fill. A pure data
// module (no Vue, no DOM). The variant IS the bundle: every paint magnitude is a
// per-variant field scaled by the ONE outer `intensity` prop at the paint layer.
export interface VariantPreset {
    /** Higher-order harmonics layered over the dominant counter-rotating pair. */
    harmonics: number;
    /** Peak magnitude of those harmonics relative to the dominant phasor. */
    harmonicScale: number;
    /** Draw the nested epicycle circles + arms underneath the curve. */
    epicycles: boolean;
    /** Comet-trail capacity (frames of head history). ~1/3 of the period so the
     *  comet reads as a substantial arc, not a stub (the fourier-analysis bar). */
    trailLength: number;
    /** Hue offset (degrees) of the epicycle second hue away from the outline hue. */
    epicycleHueShift: number;
    /** Forward-clock period for one full curve traversal, in ms. */
    durationMs: number;
    /** A constant per-variant seed used under `freeze` so a capture is deterministic. */
    frozenSeed: string;
    /** The parameter `t` of the static best-frame painted under `freeze`. */
    frozenT: number;

    // ── The render BUNDLE (the fourier-analysis renderer's procedural
    // sibling register: a PRESENT stroke weight, a real phosphor glow in BOTH
    // modes, a glowing comet head, rainbow epicycle scaffolding). Every paint
    // magnitude is a per-variant field scaled by the ONE outer `intensity` prop —
    // the variant IS the bundle.
    /** Comet-trail PEAK alpha (the head segment). The reference trail rides ~0.9
     *  near-opaque — present, not a 0.45 hairline whisper. */
    peakAlpha: number;
    /** Trail stroke weight in CSS px (the reference is a BOLD 3.5px stroke, not
     *  a 1.6 hairline). The single biggest faintness lever. */
    trailWidth: number;
    /** Head-glow alpha — the STRONGEST layer (head-forward: > peakAlpha). */
    headGlowAlpha: number;
    /** Head-glow `shadowBlur` bloom radius, in px. */
    headGlowBlur: number;
    /** The comet HEAD DOT radius in CSS px (the reference's glowing tip — a
     *  saturated core + white highlight + soft halo). 0 disables it. */
    headDotRadius: number;
    /** Epicycle scaffolding alphas ÷ peak (hero only; {0,0} disables the scaffold).
     *  The reference circles/arms are PRESENT (≈0.5/0.75), not a 0.18 ghost. */
    epicycleRatios: { circle: number; arm: number };
    /** Epicycle circle / arm stroke weights in CSS px (the reference uses a bold
     *  ≈2.5/2 chain, the joints carry filled dots). */
    epicycleWidths: { circle: number; arm: number };
    /** Paint the epicycle chain as a rainbow across the spectrum (the
     *  fourier-analysis signature) vs one analogous second hue. Hero only. */
    epicycleRainbow: boolean;
    /** Trail persistence exponent — SOFT (1..2), never the quadratic that kills the body. */
    trailFadeExp: number;
    /** Min trail alpha ÷ peak — the body survives, never decays to 0. The
     *  reference body reads near-uniform; the floor sits HIGH (≈0.35) so the
     *  comet body has real presence on cream too (the light-mode floor fork). */
    trailFloor: number;
}

export const PRESETS: Record<"hero" | "final", VariantPreset> = {
    hero: {
        harmonics: 5,
        harmonicScale: 0.24,
        epicycles: true,
        trailLength: 260,
        epicycleHueShift: 42,
        durationMs: 16000,
        frozenSeed: "fourier-field/hero",
        frozenT: 0.34,
        peakAlpha: 0.92,
        trailWidth: 3,
        headGlowAlpha: 0.95,
        headGlowBlur: 18,
        headDotRadius: 5,
        epicycleRatios: { circle: 0.5, arm: 0.72 },
        epicycleWidths: { circle: 2.4, arm: 2 },
        epicycleRainbow: true,
        trailFadeExp: 1.35,
        trailFloor: 0.34,
    },
    final: {
        harmonics: 11,
        harmonicScale: 0.17,
        epicycles: false,
        trailLength: 360,
        epicycleHueShift: 36,
        durationMs: 21000,
        frozenSeed: "fourier-field/final",
        frozenT: 0.42,
        peakAlpha: 0.88,
        trailWidth: 3.2,
        headGlowAlpha: 0.92,
        headGlowBlur: 16,
        headDotRadius: 4.5,
        epicycleRatios: { circle: 0, arm: 0 },
        epicycleWidths: { circle: 0, arm: 0 },
        epicycleRainbow: false,
        trailFadeExp: 1.45,
        trailFloor: 0.36,
    },
};
