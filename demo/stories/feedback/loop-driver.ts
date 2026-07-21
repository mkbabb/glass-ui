// The demo progress-loop driver re-homed off `setInterval` (J7 / F22).
//
// The HEAD loop was a `setInterval(120ms)` stepping the value +3% per tick — a
// stepped staircase interrupting the Progress fill's 300ms transition — and at the
// wrap it snapped `animated = 0`, which the same 300ms transition then glided
// BACKWARDS across the full track (a full-width rewind every cycle).
//
// The re-home is a continuous eased breath that OWNS its return leg: phase → an
// ease-in-out triangle that fills 0→100 then drains 100→0, both smoothstep-eased.
// The value is a continuous function of time — no stepped tick, and no
// instantaneous 100→0 snap for the transition to rewind. A private demo helper,
// so the shape is unit-testable (continuity + easing) rather than eyeballed.

/** Smoothstep ease-in-out (the canonical S-curve; zero slope at both endpoints). */
export function easeInOut(t: number): number {
    const c = t < 0 ? 0 : t > 1 ? 1 : t;
    return c * c * (3 - 2 * c);
}

/**
 * Map a loop phase to the eased fill value in [0, 100].
 *
 * `phase` is `elapsed / period` (any real; wrapped into [0, 1)). The first half
 * fills, the second half drains — a symmetric triangle, each leg smoothstep-eased.
 * Continuous at the wrap: `loopProgressValue(0) === loopProgressValue(1⁻) === 0`,
 * so there is never a backward wrap frame.
 */
export function loopProgressValue(phase: number): number {
    const wrapped = ((phase % 1) + 1) % 1;
    const triangle = wrapped < 0.5 ? wrapped * 2 : (1 - wrapped) * 2;
    return easeInOut(triangle) * 100;
}
