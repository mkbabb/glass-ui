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
    | "panel"
    | "orb-drop";

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
 *   PANEL   → panel   — the fired presentation deploy: both axes ONE spring, an
 *                       intrinsic overshoot that is NOT velocity-bought.
 *   ORB-DROP → orb-drop — the invocation drop: a dead critically-damped landing whose
 *                       energy is the light build that follows, never a bounce.
 *
 * PANEL and ORB-DROP are the two-registers-two-intents split: a deployed panel is
 * underdamped because a fired surface that lands dead reads inert, while an invoked orb
 * IS critical because its liveliness belongs to the light channel. One is never the
 * other's tuning.
 *
 * The whole table sits at the iOS weighty-inertial pole: longer `response` (weight) +
 * through-body damping toward critically-damped-with-a-touch-of-overshoot, while keeping
 * the perceptual arrival audacious. The invariant fences:
 *   · every overshoot ∈ [0%,10%] — the "touch of overshoot" band (>10% reads too springy).
 *   · every non-gentle settle is at least as long as the calm baseline (the inertia floor);
 *     nothing gets faster (faster = the mechanical-snap defect).
 *   · t90 (the 90%-arrival fraction of the response clock) is NOT a single tight band —
 *     it varies materially by preset (snappy arrives earlier than smooth/press). The
 *     inertia is carried by the `response`/ζ pair below, not by a t90 fence.
 *   · gentle ζ stays exactly 1.0: a calm arrival must not overshoot.
 */
export const SPRING_PRESETS: readonly SpringPresetRow[] = [
    {
        name: "smooth",
        response: 0.58,
        dampingFraction: 0.8,
        comment:
            "Patient entrances, fades, and scale-ins with a quiet sense of weight.",
    },
    {
        name: "snappy",
        response: 0.48,
        dampingFraction: 0.74,
        comment:
            "Quick, weighty control movement for indicators, progress, and reveals.",
    },
    {
        name: "bouncy",
        response: 0.6,
        dampingFraction: 0.6,
        comment:
            "Playful emphasis for dialogs, success moments, and the completion seal.",
    },
    {
        name: "gentle",
        response: 0.82,
        dampingFraction: 1.0,
        comment:
            "A calm, patient arrival with no overshoot.",
    },
    {
        // The row is named for DOCK landings, so it centers on dock events rather than
        // on the cross-surface mean: response 0.35 at ζ 0.82 sits inside every measured
        // dock-arrival bracket. ζ=0.82 is the corpus union center: the measured damping
        // ratios cluster tightly across surfaces while the damped frequency does not.
        // A popover enter that reads dead under this row takes a per-consumer response
        // override at the presets-in-consumers seam; the table never forks.
        name: "dock",
        response: 0.35,
        dampingFraction: 0.82,
        comment:
            "A brisk liquid morph for the dock and its coordinated contents.",
    },
    {
        name: "press",
        response: 0.2,
        dampingFraction: 0.8,
        comment:
            "A responsive press with a subtle rebound and continuous interruption.",
    },
    {
        name: "transient",
        response: 0.62,
        dampingFraction: 0.9,
        comment:
            "A centered materialize bloom for brief surfaces such as Toast.",
    },
    {
        // response 0.40 is the only value reproducing the measured (ζ=0.71, f_d≈1.76Hz)
        // fit. Panel is the ONE class whose overshoot is intrinsic, not velocity-bought.
        name: "panel",
        response: 0.4,
        dampingFraction: 0.71,
        comment:
            "A fired presentation deploy — both axes one spring, intrinsic 4-5% overshoot, text born blurred condensing ~190ms, the rim flare celebrating the data (+0.5s/+0.85s).",
    },
    {
        // ζ=1.0 is measured critical — the extent pins dead at the arrival frame. The
        // response is [DESIGN] inside the measured flight bracket.
        name: "orb-drop",
        response: 0.22,
        dampingFraction: 1.0,
        comment:
            "The invocation drop — a dead critically-damped landing; the energy is the light build.",
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
