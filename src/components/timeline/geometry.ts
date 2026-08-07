/**
 * Timeline geometry — the partition, the ordinal hue law and the aggregate.
 *
 * Pure functions only: no Vue runtime, no element, no side effect beyond the
 * DEV monotone warning. The file exists so the suite can assert the rules
 * without a mount (happy-dom is not needed to check arithmetic).
 */

import type { TimelineSegment } from "./types";

/**
 * THE ORDINAL HUE LAW — span `i` without an `accent` takes
 * `--section-color-((HUE_OFFSET + HUE_STRIDE·i) mod HUE_STOPS)` over the
 * 13-stop jewel ramp (`tokens/color-radius.css` §sections).
 *
 * `gcd(HUE_STRIDE, HUE_STOPS) = gcd(4, 13) = 1`, so all thirteen stops are
 * visited before the sequence repeats — adjacent spans land far apart on the
 * ramp by construction. The two integers live HERE, as constants, and never as
 * tokens: BK #68's L-4 refused both the low-chroma retune and the ordinal
 * rename, and ruled these `geometry.ts` constants their home.
 */
export const HUE_OFFSET = 2;
export const HUE_STRIDE = 4;
export const HUE_STOPS = 13;

/** One resolved span on the unit axis. `at` is the span's END boundary. */
export interface TimelineSpan {
    left: number;
    width: number;
    at: number;
}

function clamp01(n: number): number {
    if (!Number.isFinite(n)) return 0;
    return n < 0 ? 0 : n > 1 ? 1 : n;
}

function isPinned(seg: TimelineSegment): boolean {
    return typeof seg.at === "number" && Number.isFinite(seg.at);
}

/**
 * THE PARTITION.
 *
 * 1. Authored `at` values are clamped monotone non-decreasing in [0, 1]:
 *    `at_i = max(at_{i−1}, clamp01(at_i))`. They are NEVER sorted — keys,
 *    labels and states travel with `at`, so a sort turns one typo into a
 *    silently reordered narrative. The clamp preserves author order and
 *    renders the violation VISIBLE (a zero-width span with its mark stacked on
 *    its neighbour's).
 * 2. Omitted `at` runs take equal shares of the axis remaining between their
 *    pinned neighbours; a trailing run runs to 1. All-omitted is therefore the
 *    plain equal split.
 * 3. A trailing remainder (`Σwidth < 1`, e.g. a dataset ending at 0.94) is an
 *    OPEN AXIS: the groove paints it, no span owns it, no mark sits on it.
 * 4. Zero-width and coincident spans are legal — no fill, mark at the shared
 *    point, the later `key` stacking above.
 */
export function layout(segments: readonly TimelineSegment[]): TimelineSpan[] {
    const n = segments.length;
    if (n === 0) return [];

    // Pass 1 — clamp the AUTHORED boundaries monotone in [0, 1].
    let floor = 0;
    let violated = false;
    const pinned: (number | null)[] = segments.map((seg) => {
        if (!isPinned(seg)) return null;
        const raw = clamp01(seg.at as number);
        const held = raw < floor ? floor : raw;
        if (held !== raw) violated = true;
        floor = held;
        return held;
    });

    if (violated && import.meta.env.DEV) {
        console.warn(
            "[Timeline] non-monotone `at`: a segment's END boundary sits before " +
                "its predecessor's. The boundaries are CLAMPED monotone (author " +
                "order preserved, the offending span rendered zero-width) rather " +
                "than sorted — sorting would silently reorder the phases.",
        );
    }

    // Pass 2 — omitted runs share the remainder between pinned anchors.
    const ends = new Array<number>(n);
    let i = 0;
    let prev = 0;
    while (i < n) {
        const here = pinned[i];
        if (here !== null && here !== undefined) {
            ends[i] = here;
            prev = here;
            i += 1;
            continue;
        }
        let j = i;
        while (j < n && (pinned[j] === null || pinned[j] === undefined)) j += 1;
        const anchored = j < n;
        const ceiling = anchored ? (pinned[j] as number) : 1;
        const count = j - i;
        // The interval [prev, ceiling] is shared by the omitted run AND — when a
        // pinned successor closes it — by that successor, which is why the
        // divisor counts it. `[0.2, ·, ·, 0.8]` therefore lands on four equal
        // 0.2 spans rather than crushing the anchored one to nothing.
        const share = (ceiling - prev) / (count + (anchored ? 1 : 0));
        for (let k = 0; k < count; k += 1) ends[i + k] = prev + share * (k + 1);
        prev = ends[j - 1] as number;
        i = j;
    }

    return ends.map((at, k) => {
        const left = k === 0 ? 0 : (ends[k - 1] as number);
        return { left, width: at - left, at };
    });
}

/**
 * The span's EFFECTIVE fill fraction, or `null` for INDETERMINATE.
 *
 * Explicit `progress` wins (clamped). Otherwise `completed` is 1 and `pending`
 * is 0. `active` with `progress` omitted returns `null`: it is a phase underway
 * with unknown progress, and fabricating either 0.5 or 0 for it paints a
 * running phase as something it is not.
 */
export function fillFor(seg: TimelineSegment): number | null {
    if (typeof seg.progress === "number") return clamp01(seg.progress);
    if (seg.state === "completed") return 1;
    if (seg.state === "active") return null;
    return 0;
}

/**
 * The span-weighted aggregate over the OWNED axis: `Σ(width·eff) / Σwidth`.
 *
 * The denominator is `Σwidth`, not 1 — a process scoped to 94% of the axis
 * reports 1.0 when all of ITS phases complete, rather than stalling at 0.94
 * forever. Indeterminate spans contribute 0 (they report nothing measurable);
 * they surface in `aria-valuetext` instead.
 */
export function aggregate(segments: readonly TimelineSegment[]): number {
    const spans = layout(segments);
    let owned = 0;
    let filled = 0;
    for (let i = 0; i < spans.length; i += 1) {
        const w = (spans[i] as TimelineSpan).width;
        owned += w;
        filled += w * (fillFor(segments[i] as TimelineSegment) ?? 0);
    }
    return owned > 0 ? filled / owned : 0;
}

/** The ordinal hue for span `i` — see {@link HUE_OFFSET}. */
export function accentFor(i: number): string {
    const stop = (HUE_OFFSET + HUE_STRIDE * i) % HUE_STOPS;
    return `var(--section-color-${stop})`;
}
