// The glass-ui named-spring (response, dampingFraction) pairs — THE single
// source of the iOS-canonical register vocabulary.
//
// This module is the no-second-authority root. The CSS token generator and every
// Glass JS consumer read this same table; a consumer needing an engine primitive
// imports it directly from @mkbabb/keyframes.js.
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
    | "transient"
    | "eyeglass";

/** One named-spring row: the analytic (response, dampingFraction) pair + its register doc. */
export interface SpringPresetRow {
    /** The token suffix for the generated `--spring-<name>` CSS pair. */
    readonly name: SpringPresetName;
    /** Response time in seconds (the spring's `response` solver input). */
    readonly response: number;
    /** Damping fraction ζ (1 = critical; <1 overshoots). */
    readonly dampingFraction: number;
    /** The register this curve serves (the doc-table derives from this one string). */
    readonly comment: string;
}

/**
 * iOS-canonical (response, dampingFraction) pairs. The names match the `--spring-*`
 * CSS tokens AND the CSS consumers that read `var(--spring-smooth)` etc. directly, so
 * they MUST stay stable across retunes — only the `(response, ζ)` pair and the emitted
 * curves change. Each row's `comment` describes the register it serves (the doc-table
 * on /motion/springs derives from that one string):
 *
 *   SETTLE  → smooth  — patient entrances, fades, scale-ins (no overshoot read).
 *   CONTROL → snappy  — crisp position morphs: tab underline glide, progress fill,
 *                       the continuous-marker pop, the generic crisp settle.
 *   PLAYFUL → bouncy  — deliberate emphatic one-shots ONLY: the bouncy toggle press,
 *                       dialog/success entrances. Largest overshoot.
 *   GENTLE  → gentle  — critically-damped slow settles (the patient end of the ladder).
 *   DOCK    → dock    — the dock expand/collapse morph AND everything inside it.
 *   PRESS   → press   — the iOS interactive tap-press: a sub-200ms answer, a tiny alive
 *                       rebound.
 *   TRANSIENT → transient — the center-seed materialize bloom (Toast):
 *                       a deep scale-from with a near-critically-damped settle (no flick).
 *   EYEGLASS → eyeglass — the iOS tab-pill loupe travel: snappy speed with dock-class give.
 *
 * The whole table sits at the iOS weighty-inertial pole: longer `response` (weight) +
 * through-body damping toward critically-damped-with-a-touch-of-overshoot, while keeping
 * the perceptual arrival audacious. The invariant fences:
 *   · every overshoot ∈ [0%,10%] — the "touch of overshoot" band (>10% reads too springy).
 *   · every non-gentle settle is at least as long as the calm baseline (the inertia floor);
 *     nothing gets faster (faster = the mechanical-snap defect).
 *   · t90 ∈ [50%,61%] of clock for smooth/snappy/press (the audacious-arrival floor).
 *   · gentle ζ stays exactly 1.0: a calm arrival must not overshoot.
 */
export const SPRING_PRESETS: readonly SpringPresetRow[] = [
    {
        name: "smooth",
        response: 0.58,
        dampingFraction: 0.8,
        comment:
            "The settle register — patient entrances, fades and scale-ins: weighty, with a whisper of life (+1.5%), never a dead stop.",
    },
    {
        name: "snappy",
        response: 0.48,
        dampingFraction: 0.74,
        comment:
            "The control register — the quick-but-weighty position morph (tab indicator, progress fill, the reveal bloom, page-build): arrives at half-clock with a small gooey overshoot (+3.2%).",
    },
    {
        name: "bouncy",
        response: 0.6,
        dampingFraction: 0.6,
        comment:
            "The playful register — the emphatic one-shot (dialog and success entrances, the completion seal): flowing, not flicking, with a soft 9.5% overshoot and extra inertia.",
    },
    {
        name: "gentle",
        response: 0.82,
        dampingFraction: 1.0,
        comment:
            "The gentle register — a patient critically-damped settle at ζ=1.0, so calm arrivals never overshoot.",
    },
    {
        name: "dock",
        response: 0.3,
        dampingFraction: 0.82,
        comment:
            "The dock register — the brisk iOS liquid morph: response 0.30, damping 0.82, a tiny overshoot (~1.2%). Powers the dock expand/collapse and everything inside it. Apple's liquid is brisk with coupled channels — weight is not slowness.",
    },
    {
        name: "press",
        response: 0.2,
        dampingFraction: 0.8,
        comment:
            "The press register — the interactive tap-press: a hair of inertial carry (sub-200ms) with a tiny alive rebound (+1.5%); the interruptible re-seat keeps the gesture continuous.",
    },
    {
        name: "transient",
        response: 0.62,
        dampingFraction: 0.9,
        comment:
            "The transient register — the center-seed materialize bloom for Toast: a deep scale-from with a near-critically-damped settle (~+0.15% overshoot, no flick), reaching 90% at ~0.34s and settling by ~0.46s. Consumed by the --enter-transient-* register.",
    },
    {
        name: "eyeglass",
        response: 0.36,
        dampingFraction: 0.64,
        comment:
            "The eyeglass register — the iOS tab-pill loupe travel: snappy-class speed (response 0.36) with dock-class give (ζ 0.64, ~7.3% overshoot) for a leading-edge liquid arrival. The release is edge-asymmetric — a faster lead recovery (~117ms) than trail lag (~270ms).",
    },
] as const;
//
// PER-COMPONENT REGISTERS (presets-in-consumers) — the 3 ScrubberTimeline legs
// (head/fill/press) are NOT global SPRING_PRESETS rows. They were once folded into the
// global table for ONE consumer, which bloated the generated CSS with extra curves and
// clocks. They now live LOCAL to ScrubberTimeline.vue
// as documented per-primitive defaults (JS-only, no CSS `--spring-*` token) — the
// per-primitive-default seam, NOT a second register TABLE.

/** Lookup one Glass semantic spring preset by name. */
export function springPreset(name: SpringPresetName): SpringPresetRow {
    const row = SPRING_PRESETS.find((p) => p.name === name);
    if (!row) throw new Error(`Unknown spring preset: ${name}`);
    return row;
}
