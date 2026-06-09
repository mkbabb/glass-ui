// The ONE canonical copy of the fourier-field math: pure DFT/epicycle
// reconstruction plus the procedural elliptic-spectrum generators. No Vue, no
// DOM — a leaf a test or a worker can import without a render context.
//
// math model adopted from fourier-analysis/web/src/lib/{evaluators,bases}.ts
// (the `evaluateFourier` complex-sum + the `fourierPositionsAt` epicycle chain).

/**
 * One Fourier phasor. `index` is the integer frequency (a counter-rotating pair
 * is `+1` and `-1`); `coefficient` is the complex coefficient `[re, im]`;
 * `amplitude`/`phase` are its polar form (carried for callers that prefer the
 * polar read — the reconstruction uses the rectangular `coefficient`).
 */
export interface BasisComponent {
    index: number;
    coefficient: [number, number];
    amplitude: number;
    phase: number;
}

/**
 * Build a {@link BasisComponent} from a frequency index and its rectangular
 * coefficient `(re, im)`, deriving the polar `amplitude`/`phase`.
 */
export function comp(index: number, re: number, im: number): BasisComponent {
    return {
        index,
        coefficient: [re, im],
        amplitude: Math.hypot(re, im),
        phase: Math.atan2(im, re),
    };
}

/**
 * The epicycle chain at parameter `t`: the running tip of each phasor stacked on
 * the last, starting at the origin. `positions[0]` is `[0, 0]`; the final entry
 * is the curve point — the inverse-DFT sum `Σ c_k * exp(2*pi*i*k*t)` at the same
 * `t`. `maxCircles` truncates the chain (draw fewer arms than the spectrum
 * carries).
 */
export function positionsAt(
    components: BasisComponent[],
    t: number,
    maxCircles?: number,
): [number, number][] {
    const positions: [number, number][] = [[0, 0]];
    let cx = 0;
    let cy = 0;
    const n = maxCircles ?? components.length;
    for (let i = 0; i < n && i < components.length; i++) {
        const c = components[i];
        const angle = 2 * Math.PI * c.index * t;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        cx += c.coefficient[0] * cos - c.coefficient[1] * sin;
        cy += c.coefficient[0] * sin + c.coefficient[1] * cos;
        positions.push([cx, cy]);
    }
    return positions;
}

/** Tuning for {@link makeEllipticSpectrum}. */
export interface EllipticSpectrumOptions {
    /**
     * How many smaller higher-order harmonics to layer on top of the dominant
     * counter-rotating pair (the dominant pair is always present). Default 4.
     * The `final` preset passes a larger count for a denser, busier curve.
     */
    harmonics?: number;
    /**
     * Peak magnitude of the higher-order harmonics relative to the dominant
     * phasor. Smaller keeps the curve a clean, smooth ellipse with a little
     * character; larger crinkles it. Default ~0.22.
     */
    harmonicScale?: number;
}

/**
 * Emit a procedural elliptic spectrum: a DOMINANT counter-rotating pair (index
 * `+1` and `-1`) of UNEQUAL magnitude — the inequality is what draws a tilted
 * ellipse rather than a circle — plus a few smaller higher-order harmonics with
 * random small magnitudes and phases for character. Lower orders carry more
 * weight (a `1 / order` falloff), so the curve stays large, smooth and
 * few-big-phasor; the `harmonics` knob lifts it to the denser `final` look.
 *
 * Deterministic in `rng`: the same seeded `() => number` yields the same
 * spectrum, so a frozen frame reproduces exactly.
 */
export function makeEllipticSpectrum(
    rng: () => number,
    opts: EllipticSpectrumOptions = {},
): BasisComponent[] {
    const { harmonics = 4, harmonicScale = 0.22 } = opts;

    // The dominant counter-rotating pair. Unequal magnitudes => a tilted ellipse
    // (equal magnitudes would trace a circle). A shared random phase tilts it.
    const major = 0.62 + rng() * 0.18; // ~0.62..0.80
    const minor = major * (0.34 + rng() * 0.3); // distinctly smaller — the tilt
    const tilt = rng() * Math.PI * 2;
    const tiltMinus = rng() * Math.PI * 2;

    const components: BasisComponent[] = [
        comp(1, major * Math.cos(tilt), major * Math.sin(tilt)),
        comp(-1, minor * Math.cos(tiltMinus), minor * Math.sin(tiltMinus)),
    ];

    // Smaller higher-order harmonics for character — alternating outer indices
    // (+2, -2, +3, -3, …) with a `1 / order` magnitude falloff so the low orders
    // stay the big, smooth phasors and the high orders only add fine detail.
    for (let i = 0; i < harmonics; i++) {
        const order = 2 + Math.floor(i / 2);
        const index = i % 2 === 0 ? order : -order;
        const mag = (harmonicScale / order) * (0.4 + rng() * 0.6);
        const phase = rng() * Math.PI * 2;
        components.push(comp(index, mag * Math.cos(phase), mag * Math.sin(phase)));
    }

    return components;
}
