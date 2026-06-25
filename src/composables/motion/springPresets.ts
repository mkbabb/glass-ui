// The five glass-ui named-spring (response, dampingFraction) pairs — THE single
// source of the iOS-canonical register vocabulary (AY.W-MOTION2).
//
// This module is the no-second-authority root: BOTH `scripts/regen-spring-tokens.mjs`
// (which solves each pair into a CSS `linear()` string via keyframes.js
// `springLinearStops`) AND the `MOTION_CURVES` curve table (which solves the SAME
// pair into a JS `Easing` via keyframes.js `springTimingFunction`) import the
// `SPRING_PRESETS` table from here. A future retune edits ONE table and both halves
// — the CSS token and the JS twin — re-derive from it, drift-proof by construction.
//
// Node 22+/26 imports this `.ts` directly (native type-stripping), so the `.mjs`
// regen script + sync gate consume it with no build step; the library TypeScript
// imports it through the `/motion` barrel. Value.js-free + keyframes-free (pure
// data) — it adds no peer edge wherever it is reached.

/** A glass-ui named-spring preset name. */
export type SpringPresetName =
    | "smooth"
    | "snappy"
    | "bouncy"
    | "gentle"
    | "dock"
    | "press"
    | "timeline-head"
    | "timeline-fill"
    | "timeline-press";

/** One named-spring row: the analytic (response, dampingFraction) pair + its register doc. */
export interface SpringPresetRow {
    /** The token suffix — `--spring-<name>` (CSS) and the `MOTION_CURVES` key. */
    readonly name: SpringPresetName;
    /** Response time in seconds (the spring's `response` solver input). */
    readonly response: number;
    /** Damping fraction ζ (1 = critical; <1 overshoots). */
    readonly dampingFraction: number;
    /** The register this curve serves (the doc-table derives from this one string). */
    readonly comment: string;
}

/**
 * iOS-canonical (response, dampingFraction) pairs per AL-X4 §3. The names match
 * the `--spring-*` CSS tokens AND the speedtest CSS consumers that read
 * `var(--spring-smooth)` etc. directly, so they MUST stay stable across retunes —
 * only the `(response, ζ)` pair and the emitted curves change.
 *
 * GOVERNED iOS-SPRING VOCABULARY (AX.W05) — the SINGLE source of the register
 * vocabulary. Each row's `comment` names the surface-class that rides it:
 *
 *   SETTLE  → smooth  — patient entrances, fades, scale-ins (no overshoot read).
 *   CONTROL → snappy  — crisp position morphs: tab underline glide, progress fill,
 *                       the continuous-marker pop, the generic crisp settle.
 *   PLAYFUL → bouncy  — deliberate emphatic one-shots ONLY: the bouncy toggle press,
 *                       dialog/success entrances, the VT default. Largest overshoot.
 *   GENTLE  → gentle  — critically-damped slow settles (the patient end of the ladder).
 *   DOCK    → dock    — the dock expand/collapse morph AND everything inside it.
 *   PRESS   → press   — the iOS interactive tap-press: sub-100ms answer, a tiny alive
 *                       rebound. `useSpringPress` reads this row's (response, ζ).
 *
 * BD.W-ANIM-IOS27-TUNE — the GLOBAL re-calibration toward the iOS-27
 * weighty-gooey-inertial pole (USER law: "SMOOTH, CONTROLLED, INERTIA, AUDACIOUS;
 * NO overly tight and springy; MORPH MORE on move"). ALL SIX rows are re-tuned in
 * lockstep toward lower stiffness (longer `response` → inertia/weight) + higher
 * through-body damping toward critically-damped-with-a-TOUCH-of-overshoot (kill the
 * pointed flick) + longer settle (the flowing arrival) — WHILE keeping the perceptual
 * arrival AUDACIOUS (t90 mid-clock for smooth/snappy/press; bouncy/dock arrive earlier
 * via the overshoot carry = the FLOWING-mass read). There are NO byte-frozen KEEPS any
 * more (the BC.W-SPRING-EASE surgical KEEP fence is RETIRED). The invariant fences:
 *   · every overshoot ∈ [0%,10%] — the "touch of overshoot" band; the OLD pointed
 *     bouncy 12.6% / dock 10.7% are RETIRED (>10% is the "too springy" defect).
 *   · every NON-gentle settle LENGTHENS vs the pre-BD baseline (the inertia floor);
 *     nothing gets faster (faster = the mechanical-snap defect).
 *   · t90 ∈ [50%,61%] of clock for smooth/snappy/press (the audacious-arrival floor).
 *   · gentle ζ stays EXACTLY 1.0 (the --ease-convergence alias depends on overshoot==0).
 */
export const SPRING_PRESETS: readonly SpringPresetRow[] = [
    {
        name: "smooth",
        response: 0.58,
        dampingFraction: 0.8,
        comment: "SETTLE register — the inertial settle (entrances/fades/scale-ins): weighty, a whisper of life (+1.5%), never a dead stop. BD.W-ANIM-IOS27-TUNE",
    },
    {
        name: "snappy",
        response: 0.48,
        dampingFraction: 0.74,
        comment: "CONTROL register — the quick-but-WEIGHTY position morph (tab indicator, progress fill, .glass-reveal SPATIAL bloom, page-build); arrives at half-clock (audacious) with a small gooey overshoot (+3.2%). BD.W-ANIM-IOS27-TUNE",
    },
    {
        name: "bouncy",
        response: 0.6,
        dampingFraction: 0.6,
        comment: "PLAYFUL register — the emphatic one-shot (dialog/success entrance, VT default, completion-seal): FLOWING not flicking — overshoot softened 12.6%→9.5%, slower for inertia. BD.W-ANIM-IOS27-TUNE",
    },
    {
        name: "gentle",
        response: 0.82,
        dampingFraction: 1.0,
        comment: "GENTLE register — the patient critically-damped settle (--ease-convergence alias); slow inertial arrival, ζ=1.0 (NO overshoot by definition — the convergence-reveal depends on it). BD.W-ANIM-IOS27-TUNE",
    },
    {
        name: "dock",
        response: 0.68,
        dampingFraction: 0.64,
        comment: "DOCK register — THE WEIGHTY GOOEY MORPH (collapse/expand + V↔H + fission + in-situ shell): slow inertial mass, the settle a graceful +7.3% (un-pointed liquid), the 'MORPH MORE on move' reference. BD.W-ANIM-IOS27-TUNE",
    },
    {
        name: "press",
        response: 0.2,
        dampingFraction: 0.8,
        comment: "PRESS register — the iOS interactive tap (useSpringPress + --glass-btn-press-t): a hair of inertial carry (sub-200ms iOS window) + a tiny alive rebound (+1.5%); the interruptible re-seat keeps the gesture continuous. BD.W-ANIM-IOS27-TUNE",
    },
    {
        name: "timeline-head",
        response: 0.34,
        dampingFraction: 0.74,
        comment: "TIMELINE-HEAD register — the ScrubberTimeline warm-glass lozenge travel (LEG-2): the head LAGS the pointer a hair then settles with a whisper of fling-overshoot (+3.2%). The fast head clock the fill trails. BD.W-TIMELINE-RAIL-UNIFY",
    },
    {
        name: "timeline-fill",
        response: 0.46,
        dampingFraction: 0.82,
        comment: "TIMELINE-FILL register — the ScrubberTimeline lane fill (LEG-2): a slower clock than the head so the fill TRAILS the bead (the lane reads as liquid trailing), settling with a hint of carry (+1.1%). BD.W-TIMELINE-RAIL-UNIFY",
    },
    {
        name: "timeline-press",
        response: 0.22,
        dampingFraction: 0.7,
        comment: "TIMELINE-PRESS register — the ScrubberTimeline grab-anticipation (LEG-2): the head's pointerdown squash on the cartoon-punch clock, a crisp short-response press settle (+4.6%) feeding the --scale-press dip. BD.W-TIMELINE-RAIL-UNIFY",
    },
] as const;

/** Lookup one preset row by name (used by `MOTION_CURVES` spring rows). */
export function springPreset(name: SpringPresetName): SpringPresetRow {
    const row = SPRING_PRESETS.find((p) => p.name === name);
    if (!row) throw new Error(`Unknown spring preset: ${name}`);
    return row;
}
