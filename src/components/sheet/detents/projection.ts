// The detent projection — pure, engine-free, unit-pinnable.
//
// A release is not a threshold test. The finger hands the sheet an ENERGY, and the
// question a detent ladder has to answer is where that energy comes to rest — so the
// release velocity is integrated through the SAME second-order system that will then
// carry the sheet there, and the rung nearest that projected rest wins.
//
// The shipped alternative discarded the energy: `|v| >= 450 px/s` advanced exactly one
// index, so a 1493 px/s fling and a 625 px/s nudge landed on the same rung — 2.4× of
// measured energy thrown away, and the constant that did it was a register nobody could
// retune from the spring it was pretending to belong to.
//
// THE PROJECTION, in one sentence: **the throw coasts for exactly as long as the spring
// that catches it takes to settle.**
//
// The horizon is the register's own and is closed-form from the row's three numbers. The
// envelope of `x'' + 2ζω x' + ω²x = 0` decays as `e^(−ζωt)`, so the time it takes to fall
// inside the row's own settle band `b` is
//
//     t_settle = −ln(b) / (ζ·ω),        ω = 2π/response
//
// Stated exactly: this is the ENVELOPE horizon, and the emitted `--spring-<name>-settle`
// tokens are the generator's NUMERIC solve of the same row, which also requires the
// velocity inside the band. For the two rows this engine rides they agree closely —
// `dock` 0.212 s against a published 0.21 s, `bloom` 0.394 s against 0.37 s — and they
// are not claimed identical, because for a critically-damped row they are not.
//
// What matters is that nothing here is a tuned coefficient: response, ζ and band are the
// row's own, so retuning the row retunes the throw with it. A projection carrying a
// constant of its own is exactly what the shipped fling threshold was — a number nobody
// could move from the spring it claimed to belong to.

/** `ω₀ = 2π / response` — the register's angular frequency, in rad/s. */
export function springOmega(response: number): number {
    return (2 * Math.PI) / response;
}

/** The three numbers a projection needs — the shape a `SpringPresetRow` already has. */
export interface ProjectionRow {
    readonly response: number;
    readonly dampingFraction: number;
    readonly settleBand: number;
}

/**
 * The row's own settle horizon in seconds: how long its envelope takes to fall inside
 * its published band. This is the clock a released sheet coasts on.
 */
export function settleHorizon(row: ProjectionRow): number {
    const omega = springOmega(row.response);
    const decay = row.dampingFraction * omega;
    if (!Number.isFinite(decay) || decay <= 0) return 0;
    return -Math.log(row.settleBand) / decay;
}

/**
 * How far a release at fraction-per-second `v` carries, in fractions. Signed: the sign
 * of the velocity is the direction of the throw, and nothing here clamps it.
 */
export function throwDistance(v: number, row: ProjectionRow): number {
    return v * settleHorizon(row);
}

/**
 * Where a sheet released at fraction `x` with fraction-per-second velocity `v` comes to
 * rest if nothing catches it. Unclamped on purpose — the caller owns the ladder, and a
 * projection that ran past the ends is exactly the signal that the end is the answer.
 */
export function projectRest(x: number, v: number, row: ProjectionRow): number {
    return x + throwDistance(v, row);
}

/**
 * The rung nearest `value` in `ladder` (ascending, non-empty). Ties go to the first —
 * the ladder is sorted, so a tie resolves toward the closed end.
 */
export function nearestRung(value: number, ladder: readonly number[]): number {
    let best = ladder[0]!;
    let bestDist = Math.abs(value - best);
    for (const rung of ladder) {
        const dist = Math.abs(value - rung);
        if (dist < bestDist) {
            best = rung;
            bestDist = dist;
        }
    }
    return best;
}

/**
 * The release decision, end to end: project, then resolve against the ladder EXTENDED
 * with the dismissed rung `0`.
 *
 * `0` is a legal rung here, and that is the whole of the drag-to-dismiss fix. The
 * shipped engine floored its drag clamp at `ladder[0]` and then asked whether the target
 * was `<= 0` — a branch that could never be true for either shipped ladder, so a
 * −7826 px/s downward fling left the sheet open and the comment beside it claimed the
 * opposite. Nothing tests a threshold now: a projected rest below the first rung's
 * half-way point is nearer to `0` than to `ladder[0]` by ordinary arithmetic, and the
 * sheet closes because that is where the energy pointed.
 */
export function resolveRelease(
    x: number,
    v: number,
    ladder: readonly number[],
    row: ProjectionRow,
): number {
    const rest = projectRest(x, v, row);
    return nearestRung(rest, [0, ...ladder]);
}
