// BE.W-DOCK-RAIL-REALIZE — railProjection: the PURE φ-tier / ring-carousel projection
// math, harvested out of the deleted `useLiquidRail` spike (the no-dual-path
// W-PRUNE-CONSOLIDATE discipline — the spike is harvested, then deleted wholesale).
//
// This is the ONLY thing worth keeping from the spike: the negative-safe signed
// shortest-arc ring offset + the φ-tiered slot span. It is a STATELESS function — no
// spring loop, no rAF, no DOM measure, no SpringProgress (DockStack already speaks the
// ONE `--spring-dock` clock; the facet mode rides the dock's own CSS spring, NOT a
// re-forked JS spring). The facet-carousel mode calls `projectFacets()` once per render
// to lay out the chips; the at-rest fan is a pure CSS-transition over the projected
// resting transforms (the macOS-stack discipline the live `.dock-stack` already uses).

/** The signed shortest-arc offset on a wrap ring (the "negative-infinity modulus" — a
 *  naive `raw % N` breaks the backward wrap). Wraps to `[-N/2, N/2)`. */
export function ringOffset(raw: number, n: number): number {
    if (n <= 0) return 0;
    return ((((raw + n / 2) % n) + n) % n) - n / 2;
}

/** The φ-tiered slot SPAN to a given absolute slot-distance — the chosen→neighbour gap
 *  is wider than the neighbour→far gap (the recession compresses as items recede, the
 *  depth read). The tier ratio is EXPRESSED in the accumulation, never a flat resolved
 *  rebake (the W-CARD-PAD φ-ladder fence). */
export function tieredSpan(adist: number, base: number, ratio: number): number {
    let span = 0;
    let gap = base;
    const whole = Math.floor(adist);
    for (let k = 0; k < whole; k++) {
        span += gap;
        gap /= ratio;
    }
    // the fractional remainder of the current (compressing) gap
    span += (adist - whole) * gap;
    return span;
}

/** The geometry knobs for the facet carousel — the φ-tier spacing + the fade model. */
export interface RailProjectionGeometry {
    /** The active→neighbour base slot gap, in px (the tier-0 spacing). Default 44. */
    slotSpacing?: number;
    /** The φ tier ratio — each receding tier compresses by this. Default 1.618. */
    tierRatio?: number;
    /** The slot-distance at which the fade begins (active + immediate neighbour stay
     *  full). Default 0.5. */
    fadeStart?: number;
    /** The slot-span the fade runs over. Default 2.5. */
    fadeRange?: number;
    /** The far floor alpha — a LEGIBLE whisper floor, NOT 0 (BG.W-DOCK-FISSION-WIRE, the
     *  C-DOCK "rail facets fade to 0" defect). The receding φ-tier facets must stay readable
     *  (the R-7 macOS-Dock-stack model: all items visible, receding by tier, never to 0).
     *  Default 0.2. */
    fadeMinAlpha?: number;
    /** The per-slot scale recession (the depth read). Default 0.06. */
    scaleStep?: number;
    /** The max slots the scale recession clamps at. Default 4. */
    scaleClampSlots?: number;
}

const DEFAULT_GEOMETRY: Required<RailProjectionGeometry> = {
    slotSpacing: 44,
    tierRatio: 1.618,
    fadeStart: 0.5,
    fadeRange: 2.5,
    // BG.W-DOCK-FISSION-WIRE — the legible whisper floor (was 0: the receding facets faded
    // to invisible — the C-DOCK "rail facets fade to 0" defect). 0.2 keeps every tier
    // readable (the macOS-Dock-stack model: all items visible, receding by tier).
    fadeMinAlpha: 0.2,
    scaleStep: 0.06,
    scaleClampSlots: 4,
} as const;

/** One projected facet — the compositor-only transform tier for the ring item. */
export interface RailFacetProjection {
    /** The stable ring index `0..count-1` (the `v-for` key). */
    index: number;
    /** The signed shortest-arc slot offset from the active facet. */
    offset: number;
    /** The px translate along the rail's main axis. */
    translate: number;
    /** The faded alpha (0..1). */
    opacity: number;
    /** The recession scale (≤1). */
    scale: number;
    /** Whether this is the active facet (offset 0). */
    active: boolean;
}

/** Project the facet ring around the `active` index, fanned by `expand` (0 collapsed → 1
 *  fully fanned). Returns the virtualized WINDOW of `±ceil(fadeRange+1)` items, each with
 *  its compositor-only `{ translate, opacity, scale }`. PURE — no state, no measure. */
export function projectFacets(
    count: number,
    active: number,
    expand: number,
    geometry: RailProjectionGeometry = {},
): RailFacetProjection[] {
    const n = Math.max(0, Math.floor(count));
    if (n === 0) return [];

    const g = { ...DEFAULT_GEOMETRY, ...geometry };
    const half = Math.ceil(g.fadeRange + 1);
    const seen = new Set<number>();
    const out: RailFacetProjection[] = [];

    for (let d = -half; d <= half; d++) {
        const ringIdx = (((Math.round(active) + d) % n) + n) % n;
        if (seen.has(ringIdx)) continue;
        seen.add(ringIdx);

        const off = ringOffset(ringIdx - active, n);
        const adist = Math.abs(off);

        // the φ-tiered translate × the expand progress (collapsed ⇒ items collapse onto
        // the active at the line; expanded ⇒ they fan).
        const span = tieredSpan(adist, g.slotSpacing, g.tierRatio);
        const translate = Math.sign(off) * span * expand;

        // the fade-by-|offset| (FadeRange/FadeMinAlpha), MULTIPLIED by expand so off-active
        // facets are invisible collapsed.
        const faded = 1 - (adist - g.fadeStart) / Math.max(1e-6, g.fadeRange);
        const baseAlpha = Math.min(1, Math.max(g.fadeMinAlpha, faded));
        const opacity = adist === 0 ? 1 : baseAlpha * expand;

        const scale = 1 - Math.min(adist, g.scaleClampSlots) * g.scaleStep;

        out.push({
            index: ringIdx,
            offset: off,
            translate,
            opacity,
            scale,
            active: adist === 0,
        });
    }

    // ring-stable order so a keyed v-for never re-mounts a wrapping facet.
    out.sort((a, b) => a.index - b.index);
    return out;
}
