// The six glass-ui named-spring (response, dampingFraction) pairs — THE single
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
    | "transient";

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
 *   TRANSIENT → transient — the gentle-class CENTER-SEED materialize bloom (Toast +
 *                       Notification): a deep scale-from with a near-critically-damped
 *                       settle (no flick), the `enter-transient` register (BI.W-REGISTER-TABLE).
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
        name: "transient",
        response: 0.62,
        dampingFraction: 0.9,
        comment: "TRANSIENT register — the enter-transient CENTER-SEED materialize bloom (Toast + Notification): a deep scale-from with a near-critically-damped settle (overshoot ~+0.15%, no flick), t90 ~0.34s / 2%-settle 0.46s — the gentle-class MOTION-LADDER M5 bloom. Consumed by the --enter-transient-* register (BI.W-REGISTER-TABLE).",
    },
] as const;
//
// PER-COMPONENT REGISTERS (presets-in-consumers) — the 3 ScrubberTimeline legs
// (head/fill/press) are NO LONGER global SPRING_PRESETS rows (BG.W-SPRING-REGISTER-TIDY,
// table→6). They were per-component registers folded into the global table for ONE
// consumer, bloating the generated CSS (9 `linear()` curves + 9 duration clocks) + the
// MOTION_CURVES twin. They now live LOCAL to ScrubberTimeline.vue as documented
// per-primitive defaults (JS-only, no CSS `--spring-*` token) and are sanctioned in the
// proof:motion-one-clock SPRING_DEFAULTS_ALLOWLIST (TIMELINE_HEAD/FILL/PRESS) — the
// canon's per-primitive-default seam (motion-canon.md §P7), NOT a second register TABLE.

/** Lookup one preset row by name (used by `MOTION_CURVES` spring rows). */
export function springPreset(name: SpringPresetName): SpringPresetRow {
    const row = SPRING_PRESETS.find((p) => p.name === name);
    if (!row) throw new Error(`Unknown spring preset: ${name}`);
    return row;
}
