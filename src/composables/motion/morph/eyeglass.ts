// The EYEGLASS — the traveling indicator's organ, as pure law.
//
// The owner's standing ruling is that the eyeglass IS the tabs default, not a third
// variant: "Pill — eyeglass (the iOS-27 loupe) should become the default tabs option…
// We don't need a million fucking variants that are essentially the same thing."
// So nothing here mints a variant. This module is the LAW the ONE traveling-indicator
// writer (`useSelectionIndicator`) applies to the deform channels it already owns, and
// a surface arms it by declaring `--eyeglass-span-max` in its own cascade. A surface
// that declares nothing keeps the fraction law byte-identical — the organ is opted
// INTO by the surface that paints it, never switched on behind one.
//
// PURE DATA + PURE FUNCTIONS. No Vue, no DOM, no cascade reads: every figure below is
// checkable by hand and by a gate with no browser in the room, exactly as
// `springPresets.ts` and `engageEnvelopes.ts` are.
//
// ── WHY THIS IS NOT THE SQUISH IT REPLACES ────────────────────────────────────────
// The retired plate law read a travel FRACTION and inflated by ≤11% about the centre,
// pairing a reciprocal cross-axis compression so the area stayed put. That is a pump.
// The measured organ does something else entirely: on a hop it **spans origin and
// destination** — it genuinely covers the ground it is about to cross — and then
// retracts onto the destination. Volume is NOT preserved and must not be: a span that
// preserved volume would thin to a sliver at exactly the moment it is meant to read as
// a body of glass. So the reciprocal pairing is gone, the separate area-inflation
// channel is gone with it (one area law per surface, never two composed), and what
// remains is the pair the footage actually shows: a longitudinal SPAN and a cross-axis
// SWELL, both peaking at travel extremes, both released at arrival.
//
// ── THE FIGURES, AND WHERE EACH ONE COMES FROM ────────────────────────────────────
// Every constant below is a transcription of a measurement in
// `docs/tranches/BJ/addenda/2026-07-24-refinement/EXEMPLARS-CODEX.md` §C1 (the seat's
// own words are quoted at each site). Nothing here is tuned by taste, and nothing here
// is derived twice: `EYEGLASS_ORIGIN_FRACTION` is COMPUTED from the edge ratio rather
// than transcribed, because the two would be duplicated derived data and there would be
// no way to tell which had drifted.

/**
 * §C1: "On a hop it **spans origin and destination** (1.5×, max 1.6×) then retracts
 * onto the destination." The ceiling, not the nominal — a hop whose real span is
 * shorter than this spans its real distance and no further. The span law is
 * geometry-true first and capped second.
 */
export const EYEGLASS_SPAN_MAX = 1.6;

/**
 * §C1 (v1b): "**1.22× vertical swell largest at travel extremes** — a slug piling at
 * the wall." The cross-axis channel. It is a SWELL, not the reciprocal of the span:
 * the body thickens as it piles into its travel, which is the whole reason the moving
 * pill ends up taller than the bar it rides in.
 */
export const EYEGLASS_SWELL_MAX = 1.22;

/**
 * §C1: "**Leading edge outruns trailing 2:1** (one 83ms frame: −54 vs −28px)." The
 * asymmetry that makes mid-travel "an egg leaning into travel" rather than a symmetric
 * balloon. Expressed as the ratio itself so the origin below can be derived from it.
 */
export const EYEGLASS_EDGE_RATIO = 2;

/**
 * The transform-origin that PRODUCES the 2:1 asymmetry, measured as a fraction of the
 * box's longitudinal extent FROM THE LEADING EDGE. Derived, never transcribed:
 *
 *   scaling a box of extent w by k about a point at fraction f from the leading edge
 *   moves the leading edge by (1 − f)·(k − 1)·w and the trailing edge by f·(k − 1)·w,
 *   so leading : trailing = (1 − f) : f, and (1 − f)/f = R ⇒ f = 1/(1 + R).
 *
 * At R = 2 that is exactly 1/3. One scale write, on the compositor, produces the whole
 * asymmetry — no second channel, no per-edge animation, no layout.
 */
export const EYEGLASS_ORIGIN_FRACTION = 1 / (1 + EYEGLASS_EDGE_RATIO);

/**
 * §C1: "**It breaks its own track**: moving pill ~8px taller than the bar —
 * `overflow:hidden` kills the organ", and the codex's own gloss, "licensed to overflow
 * ~10% of height". The fraction of its own cross extent the body hangs outside the
 * track on EACH side, DERIVED from the swell rather than transcribed beside it: a
 * symmetric swell of s hangs (s − 1)/2 out per side, so 1.22 gives 11% — the same ~10%
 * the seat wrote down, arrived at from the other measurement.
 *
 * Two independent numbers in the footage agreeing to a point is the corroboration; two
 * independent numbers in SOURCE is a drift waiting to happen, which is why only one of
 * them is written here. The figure is a LICENCE, not a target — the swell produces the
 * overflow and this is what the track must be prepared to let through. A track that
 * clips is not a tidier track, it is a dead organ.
 */
export const EYEGLASS_OVERFLOW_LICENSE = (EYEGLASS_SWELL_MAX - 1) / 2;

/**
 * §C3 (the commit cascade) states its ladder in RANKS — "geometry(0) → annotation(+6) →
 * content(≈+15) → light decay to +30" — and its clock in milliseconds: "recolour
 * +80–160ms · page content commits +250–450ms · glow decays +500ms after geometry
 * stops". One unit reconciles them and it is the display frame:
 *
 *   +6  × 16.67ms = 100ms  → inside the measured 80–160ms recolour band
 *   +15 × 16.67ms = 250ms  → the measured content band's own opening edge
 *   +30 × 16.67ms = 500ms  → the measured glow decay, exactly
 *
 * The rank ladder is therefore not a second clock — it is the same clock counted in
 * frames, which is why the cascade reads as one gesture rather than four timers.
 */
export const CASCADE_RANK_MS = 1000 / 60;

/** The ranks §C3 measures, by the name it gives each stage of the one gesture. */
export const CASCADE_RANKS = {
    /** The object itself. Rank 0 — the pill arrives at t0 and everything else is late. */
    geometry: 0,
    /** The selected label taking its ink. §C3's "recolour +80–160ms". */
    annotation: 6,
    /** Whatever the strip governs. §C3's "page content commits +250–450ms". */
    content: 15,
    /** §C3: "the object stops, the light does not" — the wake's tail, +500ms. */
    light: 30,
} as const;

/** A cascade rank in milliseconds. The ONE conversion; no site does this arithmetic. */
export function cascadeRankMs(rank: number): number {
    return rank * CASCADE_RANK_MS;
}

/** One longitudinal interval on the travel axis, in the container's own coordinates. */
export interface EyeglassInterval {
    /** The leading-edge-most coordinate (left, or top on a vertical strip). */
    readonly start: number;
    /** The trailing-edge-most coordinate (right, or bottom on a vertical strip). */
    readonly end: number;
}

export interface EyeglassSpanParams {
    /** Where the body is leaving. */
    readonly from: EyeglassInterval;
    /** Where the body is arriving. */
    readonly to: EyeglassInterval;
    /**
     * The track's own inner interval on the same axis. The body may not span past it —
     * §C1's "Driven into the end it **clamps**, compressing against the bar's inner
     * edge". Omit only where no track exists to clamp against.
     */
    readonly track?: EyeglassInterval;
    /** The surface's declared ceiling; defaults to the measured `EYEGLASS_SPAN_MAX`. */
    readonly spanMax?: number;
}

export interface EyeglassSpan {
    /**
     * The longitudinal scalar to write, ≥ 1. `1` means the body does not span — a
     * same-tab commit, or a hop the ceiling has fully absorbed.
     */
    readonly span: number;
    /**
     * True when the ceiling or the track boundary shortened the geometric span. §C1's
     * clamp is a REPORTED state, not a silent floor: a paint that wants to read
     * "compressing against the bar's inner edge" has to know it happened.
     */
    readonly clamped: boolean;
    /**
     * `1` when travel runs toward increasing coordinates, `-1` when it runs back, `0`
     * for no travel. The sign the origin below flips on.
     */
    readonly direction: -1 | 0 | 1;
}

/**
 * The SPAN law. The body's transient extent is the union of where it is leaving and
 * where it is arriving — that is what "spans origin and destination" means literally —
 * expressed as a multiple of the DESTINATION extent, because the destination is what it
 * retracts onto and therefore what the scale is relative to.
 *
 * Two fences, in this order, both of them geometry rather than taste:
 *   1. the surface's ceiling (`spanMax`), and
 *   2. the track's inner edge — the body is licensed to overflow its track on the CROSS
 *      axis (`EYEGLASS_OVERFLOW_LICENSE`) and on that axis only. Longitudinally it
 *      clamps, which is the compression §C1 photographs at the ends of the bar.
 */
export function eyeglassSpan(params: EyeglassSpanParams): EyeglassSpan {
    const { from, to, track } = params;
    const spanMax = params.spanMax ?? EYEGLASS_SPAN_MAX;

    const toExtent = to.end - to.start;
    if (!(toExtent > 0)) return { span: 1, clamped: false, direction: 0 };

    const unionStart = Math.min(from.start, to.start);
    const unionEnd = Math.max(from.end, to.end);
    const geometric = (unionEnd - unionStart) / toExtent;
    if (!(geometric > 1)) return { span: 1, clamped: false, direction: 0 };

    const toCentre = (to.start + to.end) / 2;
    const fromCentre = (from.start + from.end) / 2;
    const direction: -1 | 0 | 1 =
        toCentre > fromCentre ? 1 : toCentre < fromCentre ? -1 : 0;

    // The boundary clamp. The body grows about the derived origin, so the two edges
    // travel by different amounts; the ceiling is whichever of them reaches the track
    // first. Solving (1 − f)·(k − 1)·w ≤ headroom_leading and f·(k − 1)·w ≤
    // headroom_trailing for k gives the two bounds below.
    let boundary = Number.POSITIVE_INFINITY;
    if (track) {
        const f = EYEGLASS_ORIGIN_FRACTION;
        const leadingHeadroom = direction >= 0 ? track.end - to.end : to.start - track.start;
        const trailingHeadroom = direction >= 0 ? to.start - track.start : track.end - to.end;
        const leadBound = 1 + Math.max(0, leadingHeadroom) / ((1 - f) * toExtent);
        const trailBound = 1 + Math.max(0, trailingHeadroom) / (f * toExtent);
        boundary = Math.min(leadBound, trailBound);
    }

    const span = Math.min(geometric, spanMax, boundary);
    return { span: Math.max(1, span), clamped: span < geometric, direction };
}

/**
 * The cross-axis SWELL, largest at travel extremes. `frac` is the travel distance
 * normalised by the container extent — the same geometry-relative fraction the writer
 * already computes — so a neighbouring hop barely thickens and a full-strip jump piles
 * into the wall.
 */
export function eyeglassSwell(frac: number, swellMax = EYEGLASS_SWELL_MAX): number {
    const clamped = frac < 0 ? 0 : frac > 1 ? 1 : frac;
    return 1 + clamped * (swellMax - 1);
}

/**
 * The `transform-origin` percentage along the travel axis that yields the 2:1 lead.
 * Travelling toward increasing coordinates the leading edge is the FAR one, so the
 * origin sits `EYEGLASS_ORIGIN_FRACTION` in from that end — i.e. at (1 − f) of the box.
 * Travelling back it mirrors. Zero travel keeps the centre, so a same-tab commit cannot
 * lean.
 */
export function eyeglassOriginPercent(direction: -1 | 0 | 1): number {
    if (direction === 0) return 50;
    const f = EYEGLASS_ORIGIN_FRACTION * 100;
    return direction > 0 ? 100 - f : f;
}
