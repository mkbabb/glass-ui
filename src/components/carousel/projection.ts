// The MEMBER PROJECTION — how a member reads its own place in the travel.
//
// The distance function is the good part of what came before and it lifts intact:
// pure, engine-agnostic, and the one piece of the old item-scroller that was
// shaped like a law rather than like a binding. What changes is what it drives.
//
// LAW 1 — NO TWO CHANNELS SHARE A CLOCK. The predecessor scaled and faded every
// member off the identical `t` in the identical statement, which is one channel
// wearing two properties: the fade cannot lead, the scale cannot lag, and the
// arrival has no interior. The split is now structural rather than a matter of
// discipline: SCALE rides the INERTIAL travel clock (written per scroll frame off
// the continuous position), OPACITY rides a FIRED clock (a CSS transition keyed on
// `[data-state]`, on a governed spring). Two clocks that cannot be collapsed by
// accident, because they are not even in the same language.
//
// LAW 3 — CONTENT-LAG IS A SPRING, NEVER A PARENT TRANSFORM. The interior lag is
// written on the member's CONTENT node off the travel VELOCITY, using the same
// velocity-lag law the pager worm's trail edge runs. One law, two consumers.
//
// I4b / #29 — THE PARTICIPATION FLAG. "The neighbours do not move." An expansion
// is a WINDOW, not a track translation: in `"window"` projection only the active
// member projects at all. This is exactly why an expansion arm could never have
// been built on a track-translating tween engine — that engine moves the track.
//
// [2026-08-08 · #40 W-PAGER completion] LAW 3's "one law, two consumers" was PROSE and
// nothing else: `memberLag` re-typed the clamp inline while its own docstring said "that
// law lives in one place and this calls it". It calls it now. The second consumer is what
// the law was written for, and with no second consumer `trailOffset` was an unreachable
// export — G-OVERFIT's EXPORT-REACH arm read the gap correctly and named the file.

import { trailOffset } from "../../composables/motion/morph/useLeadTrail";

/** The scale a member loses at one member's distance from centre. */
export const MEMBER_SCALE_DROP = 0.035;

/** The interior content lag's time constant, in seconds. */
export const MEMBER_LAG_TAU_S = 0.06;

/** The interior content lag's ceiling, as a fraction of the member's extent. */
export const MEMBER_LAG_CEIL = 0.08;

/**
 * A member's distance from the viewport centre, in [0, 1] — 0 at centre, 1 at one
 * member away or further.
 *
 * @param index    the member's index
 * @param position the continuous position, in members (2.4 = 40% past member 2)
 */
export function memberDistance(index: number, position: number): number {
    const d = Math.abs(index - position);
    return d < 0 ? 0 : d > 1 ? 1 : d;
}

/** The travel-clock channel: scale from distance. */
export function memberScale(distance: number): number {
    return 1 - MEMBER_SCALE_DROP * distance;
}

/**
 * The interior content lag, as a fraction of the member's extent. The content
 * trails the housing by the distance the housing covers in `tau` seconds, bounded
 * — the same `lag = clamp(v·τ, ±ceil)` law the worm's trail edge runs, which is
 * why that law lives in one place and this calls it.
 */
export function memberLag(
    velocity: number,
    tau = MEMBER_LAG_TAU_S,
    ceil = MEMBER_LAG_CEIL,
): number {
    return trailOffset(velocity, tau, ceil);
}
