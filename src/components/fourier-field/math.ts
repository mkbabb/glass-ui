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

/**
 * The PARTIAL-SUM curve point at parameter `t` over the FIRST `maxTerms` phasors
 * — the inverse-DFT truncated summation `Σ_{k<maxTerms} c_k * exp(2*pi*i*k*t)`.
 * It is {@link positionsAt} truncated at `maxTerms` and read at the FINAL tip:
 * the single curve POINT (not the whole chain). The truncation axis is the SAME
 * one `positionsAt`'s `maxCircles` arg drives — `maxCircles` reads the whole
 * chain truncated, `partialSumAt` reads only its endpoint — so the studio's
 * N-harmonics slider can draw the assembling chain (`positionsAt(.., N)`) AND the
 * resolving curve point (`partialSumAt(.., t, N)`) off the ONE axis. Sweeping `t`
 * over `[0,1)` and joining the points traces the partial-sum CURVE: at `maxTerms`
 * = 1 a single ellipse, growing toward the full reconstruction as `maxTerms`
 * climbs to `components.length` (the reference's "watch it sum" beauty).
 *
 * `maxTerms` omitted (or ≥ `components.length`) is the full reconstruction — the
 * same point `positionsAt(components, t)` returns at its final tip.
 */
export function partialSumAt(
    components: BasisComponent[],
    t: number,
    maxTerms?: number,
): [number, number] {
    let cx = 0;
    let cy = 0;
    const n = maxTerms ?? components.length;
    for (let i = 0; i < n && i < components.length; i++) {
        const c = components[i];
        const angle = 2 * Math.PI * c.index * t;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        cx += c.coefficient[0] * cos - c.coefficient[1] * sin;
        cy += c.coefficient[0] * sin + c.coefficient[1] * cos;
    }
    return [cx, cy];
}

/**
 * The forward DFT — the inverse of {@link positionsAt}. Takes a closed sequence
 * of `[x, y]` samples around a curve (treated as the complex signal `x + i·y`,
 * uniformly spaced in the parameter `t ∈ [0, 1)`) and returns the
 * {@link BasisComponent} spectrum that {@link positionsAt} reconstructs.
 *
 * Frequencies run symmetrically around 0 — `0, +1, -1, +2, -2, …` up to the
 * Nyquist limit — which is the index ordering the epicycle chain wants (the big
 * low-order phasors first). The DC term (`index 0`) is the curve's centroid; the
 * caller can subtract it (draw the chain centered) or keep it (draw at the
 * sampled position).
 *
 * General: any point set drives it (a glyph outline, a hand-traced path, a
 * digitized signature). It is NOT a special case — it is the literal forward
 * transform whose inverse already ships as `positionsAt`.
 */
export function dftFromPoints(points: [number, number][]): BasisComponent[] {
    const N = points.length;
    if (N === 0) return [];

    // The signed-frequency order the epicycle chain consumes: 0, +1, -1, +2, …
    const order: number[] = [0];
    const half = Math.floor(N / 2);
    for (let f = 1; f <= half; f++) {
        order.push(f);
        if (f !== N - f) order.push(-f); // skip the doubled Nyquist on even N
    }

    const components: BasisComponent[] = [];
    for (const k of order) {
        let re = 0;
        let im = 0;
        for (let n = 0; n < N; n++) {
            const [px, py] = points[n];
            // c_k = (1/N) Σ_n (x_n + i·y_n) · exp(-2πi·k·n/N)
            const angle = (-2 * Math.PI * k * n) / N;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            // (px + i·py)(cos + i·sin) = (px·cos − py·sin) + i(px·sin + py·cos)
            re += px * cos - py * sin;
            im += px * sin + py * cos;
        }
        components.push(comp(k, re / N, im / N));
    }
    return components;
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

// ── The coefficient-driven closed-figure family ─────────
//
// A DELIBERATE figure, not a scribble: a few-term INTEGER-index harmonic stack. Because
// every phasor index is an INTEGER, `exp(2πi·k·t)` has period 1, so the sum CLOSES at t=1
// by construction (`z(0) === z(1)`) — no arbitrary/irrational term can leave the figure
// open. Two counter-rotating integer phasors `a·e^{i·2π·p·t} + b·e^{i·2π·q·t}` trace a clean
// epicycloid/hypotrochoid whose symmetry order is `|p − q|` (the spirograph/fourier-flower
// family); a third small term adds character without breaking closure. This is the sharp
// primitive the random `makeEllipticSpectrum` "boring ellipse" is NOT — the same evaluator
// (`partialSumAt`/`positionsAt`) reconstructs both.

/** One integer-index harmonic term of a {@link FOURIER_FIGURES} recipe (polar form). */
export interface HarmonicTerm {
    /** The INTEGER frequency index (a closed figure requires integers — the period-1 fence). */
    index: number;
    /** The phasor magnitude (relative; the figure is scale-fit at render). */
    mag: number;
    /** The phase offset in turns (0..1 — multiplied by 2π; a phase rotates the figure). */
    phase: number;
}

/**
 * Build a {@link BasisComponent} spectrum from a closed-figure recipe (a list of integer-index
 * {@link HarmonicTerm}s). The recipe's `phase` is in TURNS; the rectangular coefficient is
 * `mag·(cos, sin)` at `2π·phase`. The result CLOSES (all indices integer) — feed it straight
 * to `partialSumAt`/`positionsAt`.
 */
export function makeHarmonicFigure(terms: readonly HarmonicTerm[]): BasisComponent[] {
    return terms.map((t) => {
        const a = 2 * Math.PI * t.phase;
        return comp(t.index, t.mag * Math.cos(a), t.mag * Math.sin(a));
    });
}

/**
 * The curated FLOWER / closed-epicycle figure catalogue — few-term integer-ratio harmonic
 * stacks, each a deliberate figure (the symmetry order is `|p − q|` for the dominant pair).
 * Selectable/cyclable by key; the LIBRARY beauty register the `boring` random ellipse lacked.
 * The magnitudes stay large + few-phasor so the figure reads bold, not crinkled.
 */
export const FOURIER_FIGURES: Record<string, HarmonicTerm[]> = {
    // 3-fold deltoid flower (|1 − (−2)| = 3).
    trefoil: [
        { index: 1, mag: 0.72, phase: 0 },
        { index: -2, mag: 0.34, phase: 0 },
    ],
    // 4-fold astroid flower (|1 − (−3)| = 4).
    quatrefoil: [
        { index: 1, mag: 0.7, phase: 0 },
        { index: -3, mag: 0.3, phase: 0 },
    ],
    // 5-fold flower (|1 − (−4)| = 5).
    pentafoil: [
        { index: 1, mag: 0.7, phase: 0 },
        { index: -4, mag: 0.26, phase: 0 },
    ],
    // 6-fold flower (|1 − (−5)| = 6).
    hexafoil: [
        { index: 1, mag: 0.68, phase: 0 },
        { index: -5, mag: 0.24, phase: 0 },
    ],
    // A richer 3-term spirograph — the dominant pair + a small high harmonic for character.
    spiro: [
        { index: 1, mag: 0.64, phase: 0 },
        { index: -4, mag: 0.28, phase: 0.12 },
        { index: 7, mag: 0.1, phase: 0.33 },
    ],
};

/** The ordered figure keys (the demo/consumer cycle order). */
export const FOURIER_FIGURE_KEYS = Object.keys(FOURIER_FIGURES);
