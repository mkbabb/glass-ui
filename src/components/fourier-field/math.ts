// The pure Fourier math leaf: the forward DFT, the truncated inverse, the epicycle
// chain, and the two spectrum generators. No Vue, no DOM — a test or a worker imports it
// without a render context.

/**
 * One Fourier phasor. `index` is the integer frequency (a counter-rotating pair is `+1`
 * and `-1`); `coefficient` is the complex coefficient `[re, im]`; `amplitude`/`phase` are
 * its polar form (the reconstruction uses the rectangular `coefficient`).
 */
export interface BasisComponent {
    index: number;
    coefficient: [number, number];
    amplitude: number;
    phase: number;
}

/**
 * Build a {@link BasisComponent} from a frequency index and its rectangular coefficient,
 * deriving the polar `amplitude`/`phase`.
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
 * The epicycle chain at parameter `t`: the running tip of each phasor stacked on the
 * last, starting at the origin. `positions[0]` is `[0, 0]`; the final entry is the curve
 * point. `maxCircles` truncates the chain.
 */
export function positionsAt(
    components: readonly BasisComponent[],
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
 * The PARTIAL-SUM curve point at `t` over the first `maxTerms` phasors — the truncated
 * inverse DFT `Σ_{k<maxTerms} c_k · e^{2πi·k·t}`. It is {@link positionsAt} read at its
 * final tip without building the chain, so the fit pass and the N axis share one
 * evaluator. Sweeping `t` over `[0,1)` traces the partial-sum curve: at `maxTerms = 1` a
 * single ellipse, growing toward the full reconstruction as `maxTerms` climbs.
 */
export function partialSumAt(
    components: readonly BasisComponent[],
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
 * The forward DFT — the inverse of {@link positionsAt}. Takes a closed sequence of
 * `[x, y]` samples around a curve (the complex signal `x + i·y`, uniformly spaced in
 * `t ∈ [0, 1)`) and returns the spectrum {@link positionsAt} reconstructs.
 *
 * Frequencies run symmetrically around 0 — `0, +1, -1, +2, -2, …` up to Nyquist. The DC
 * term (`index 0`) is the curve's centroid; the mint hoists it out as the fit anchor.
 * Any point set drives it: a glyph outline, a hand-traced path, a digitized signature.
 */
export function dftFromPoints(points: readonly [number, number][]): BasisComponent[] {
    const N = points.length;
    if (N === 0) return [];

    // The signed-frequency order: 0, +1, -1, +2, …
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
            re += px * cos - py * sin;
            im += px * sin + py * cos;
        }
        components.push(comp(k, re / N, im / N));
    }
    return components;
}

/**
 * Emit a procedural elliptic spectrum: a DOMINANT counter-rotating pair (index `+1` and
 * `-1`) of UNEQUAL magnitude — the inequality is what draws a tilted ellipse rather than
 * a circle — plus higher-order harmonics with a `1/order` falloff.
 *
 * `richness` ∈ `[0,1]` is the ONE character knob: 0 is a clean ellipse, 1 a crinkled
 * figure. It drives both how many harmonics are offered and how loud they are; the mint's
 * paint floor then decides how many of them survive, so the axis maximum is honest
 * per-seed rather than pinned to a constant.
 *
 * Deterministic in `rng`: the same seeded `() => number` yields the same spectrum.
 */
export function makeEllipticSpectrum(
    rng: () => number,
    richness = 0.5,
): BasisComponent[] {
    const r = Math.min(Math.max(richness, 0), 1);
    // The offered harmonic count and their peak magnitude both ride `richness`. The
    // offer is generous; the paint floor is what truncates it.
    const offered = 2 + Math.round(r * 22);
    const harmonicScale = 0.06 + r * 0.34;

    // The dominant counter-rotating pair. Unequal magnitudes => a tilted ellipse.
    const major = 0.62 + rng() * 0.18;
    const minor = major * (0.34 + rng() * 0.3);
    const tilt = rng() * Math.PI * 2;
    const tiltMinus = rng() * Math.PI * 2;

    const components: BasisComponent[] = [
        comp(1, major * Math.cos(tilt), major * Math.sin(tilt)),
        comp(-1, minor * Math.cos(tiltMinus), minor * Math.sin(tiltMinus)),
    ];

    // Alternating outer indices (+2, -2, +3, -3, …) with a `1/order` magnitude falloff.
    for (let i = 0; i < offered; i++) {
        const order = 2 + Math.floor(i / 2);
        const index = i % 2 === 0 ? order : -order;
        const mag = (harmonicScale / order) * (0.4 + rng() * 0.6);
        const phase = rng() * Math.PI * 2;
        components.push(comp(index, mag * Math.cos(phase), mag * Math.sin(phase)));
    }

    return components;
}

/** One integer-index harmonic term of a {@link FOURIER_FIGURES} recipe (polar form). */
export interface HarmonicTerm {
    /** The INTEGER frequency index — a closed figure requires integers (the period-1 fence). */
    index: number;
    /** The phasor magnitude (relative; the figure is scale-fit at render). */
    mag: number;
    /** The phase offset in TURNS (0..1 — multiplied by 2π). */
    phase: number;
}

/**
 * Build a spectrum from a closed-figure recipe. Because every index is an INTEGER,
 * `e^{2πi·k·t}` has period 1, so the sum CLOSES at `t = 1` by construction — no term can
 * leave the figure open. Two counter-rotating integer phasors trace an epicycloid whose
 * symmetry order is `|p − q|`; a third small term adds character without breaking closure.
 */
export function makeHarmonicFigure(terms: readonly HarmonicTerm[]): BasisComponent[] {
    return terms.map((t) => {
        const a = 2 * Math.PI * t.phase;
        return comp(t.index, t.mag * Math.cos(a), t.mag * Math.sin(a));
    });
}

/**
 * The curated closed-figure catalogue — few-term integer-ratio harmonic stacks, each a
 * deliberate figure (the symmetry order is `|p − q|` for the dominant pair). Every entry
 * states its own honest term count: two terms draw a foil, three draw a spirograph.
 */
export const FOURIER_FIGURES = {
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
    // A richer 3-term spirograph — the dominant pair plus one high harmonic.
    spiro: [
        { index: 1, mag: 0.64, phase: 0 },
        { index: -4, mag: 0.28, phase: 0.12 },
        { index: 7, mag: 0.1, phase: 0.33 },
    ],
} satisfies Record<string, HarmonicTerm[]>;

/** The ordered figure keys (the demo/consumer cycle order). */
export const FOURIER_FIGURE_KEYS = Object.keys(FOURIER_FIGURES) as (keyof typeof FOURIER_FIGURES)[];
