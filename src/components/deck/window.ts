// sequenceWindow — the ONE windowing oracle of the windowed-sequence substrate.
//
// The pure, DOM-free window math: every index while they all fit, else `fit`
// indices around the active, clamped to the ends, with edge flags cueing more
// beyond. It graduated from an INDICATOR window (which dots to draw) to a MEMBER
// window (which members exist in the strip at all), so it exports from the
// substrate and both consumers — the dot rail and the carousel — read this one
// copy. There is no second implementation anywhere.
//
// TWO POLICIES, because a recentring window and a pointer are incompatible:
//
//   • `"recentre"` (keyboard / programmatic) — the window centres on the active
//     index. The active member sits mid-window, so the window slides under it and
//     the BED travels; the caller pays the travel back as a body FLIP so one hop
//     still reads as one hop.
//
//   • `"nudge"` (pointer) — the window slides the MINIMUM that keeps the activated
//     index one cell inside the edge, starting from the window the pointer saw. The
//     touched cell therefore never moves out from under the pointer: pressing a dot
//     teleported it ninety pixels before this policy existed.
//
// `margin` is one cell of interior; a window of one or two cells has no interior,
// so the margin collapses rather than fighting the clamp.

/** Which window a recompute is allowed to choose. */
export type SequenceWindowPolicy = "recentre" | "nudge";

export interface SequenceWindowOptions {
    /** The window start the caller is coming FROM (the `"nudge"` policy's anchor). */
    from?: number;
    /** Default `"recentre"`. */
    policy?: SequenceWindowPolicy;
}

export interface SequenceWindow {
    /** The 0-based member indices inside the window, in order. */
    shown: number[];
    /** The window's first index — the FLIP delta is a difference of these. */
    start: number;
    /** Members exist before the window (a dimmed leading edge cue). */
    clippedStart: boolean;
    /** Members exist after the window (a dimmed trailing edge cue). */
    clippedEnd: boolean;
}

const clamp = (n: number, lo: number, hi: number): number =>
    n < lo ? lo : n > hi ? hi : n;

/**
 * The window of members around `active`.
 *
 * @param total   the member count
 * @param active  the active 0-based index
 * @param fit     how many members the window holds
 * @param options the policy + the window the caller is coming from
 */
export function sequenceWindow(
    total: number,
    active: number,
    fit: number,
    options: SequenceWindowOptions = {},
): SequenceWindow {
    const m = Math.max(1, Math.min(fit, total));
    const maxStart = Math.max(0, total - m);
    const centred = clamp(active - Math.floor(m / 2), 0, maxStart);

    let start = centred;
    if (options.policy === "nudge" && options.from != null) {
        // one cell of interior, or none when the window is too narrow to have any
        const margin = m >= 3 ? 1 : 0;
        const lo = active - (m - 1 - margin);
        const hi = active - margin;
        start = clamp(clamp(options.from, lo, hi), 0, maxStart);
    }

    const length = Math.min(m, total);
    const shown = Array.from({ length }, (_, i) => start + i);
    return {
        shown,
        start,
        clippedStart: shown.length > 0 && shown[0]! > 0,
        clippedEnd: shown.length > 0 && shown[shown.length - 1]! < total - 1,
    };
}
