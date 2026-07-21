// The compositor-arrival distance for the opt-in per-slide scale/fade.
//
// A slide's distance from the viewport centre (0 at centre, 1 a slide away)
// drives its sub-perceptual scale + fade. Under embla `loop: true` the scroll
// progress wraps 0↔1, so the visually-adjacent seam slide (snap ≈ 0.95 while
// progress ≈ 0.02) measures a near-full |snap − progress| ≈ 0.93 and would wrongly
// drop to the FAR scale/opacity. Looping takes the SHORTEST path across the wrap
// seam, min(|d|, 1 − |d|); a non-looping carousel keeps the plain distance so the
// far edge still fades (RU-21 N4).

/**
 * Arrival distance in [0, 1] for a slide.
 *
 * @param snap       the slide's scroll-snap position (embla `scrollSnapList()[i]`)
 * @param progress   the current scroll progress (embla `scrollProgress()`)
 * @param snapCount  the number of snaps (spreads the per-slide distance across the track)
 * @param loop       whether embla is looping (shortest-path across the wrap seam)
 */
export function arrivalDistance(
    snap: number,
    progress: number,
    snapCount: number,
    loop: boolean,
): number {
    let d = Math.abs(snap - progress);
    if (loop) d = Math.min(d, 1 - d);
    return Math.min(d * (snapCount - 1 || 1), 1);
}
