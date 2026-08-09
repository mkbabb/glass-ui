// The glass-ui named-spring (response, dampingFraction) pairs — THE single
// source of the register vocabulary.
//
// This module is the no-second-authority root. The CSS token generator and every
// Glass JS consumer read this same table; a consumer needing an engine primitive
// imports it directly from @mkbabb/keyframes.js.
//
// Node 22+/26 imports this `.ts` directly (native type-stripping), so the `.mjs`
// regen script + sync gate consume it with no build step; the library TypeScript
// imports it through the `/motion` barrel. Value.js-free + keyframes-free (pure
// data) — it adds no peer edge wherever it is reached.
//
// LAW 0 — a row's first peak `M = exp(-ζπ/√(1-ζ²))` appears in the shipped curve
// iff `M > settleBand`, because the emitted `linear()` is normalized over that
// band's settle horizon. There is no tiny-rebound region: a row bounces visibly
// or lands dead, and a peak that arrives in the last fifth of the clock is a late
// tick — the worst read of the three. A row whose text promises a rebound its own
// band cannot ship is a text to delete, never a damping to lower.
//
// LAW 0b — the band is a property of the job's AMPLITUDE, not a constant. Two
// percent of a press's scale delta is invisible; two percent of a long stroke is
// plainly visible. Small-amplitude rows generate over `0.02`, room-sized ones over
// `0.005`, and `settleBand` carries that per row into both the curve horizon and
// the clock, so curve/clock parity survives the split.

/** A glass-ui named-spring preset name. */
export type SpringPresetName =
    | "press"
    | "present"
    | "dock"
    | "panel"
    | "bloom"
    | "world";

/** One named-spring row: the analytic (response, dampingFraction) pair + its register doc. */
export interface SpringPresetRow {
    /** The token suffix for the generated `--spring-<name>` CSS pair. */
    readonly name: SpringPresetName;
    /** Response time in seconds (the spring's `response` solver input). */
    readonly response: number;
    /** Damping fraction ζ (1 = critical; <1 overshoots). */
    readonly dampingFraction: number;
    /** LAW 0b — the settle band the emitted `linear()` and `-settle` clock normalize over. */
    readonly settleBand: 0.02 | 0.005;
    /** The register this curve serves (the doc-table derives from this one string). */
    readonly comment: string;
}

/**
 * The six rows. Every row owns exactly ONE job; no job is owned twice; no row
 * ships without a rider. The names match the `--spring-*` CSS tokens AND the CSS
 * consumers that read `var(--spring-press)` etc. directly, so a rename is a
 * clean break across the library and its consumers, never an alias.
 *
 * Exactly one row rebounds and it is the fired deploy — the measured corpus
 * ceiling is a clip edge, and a celebration's liveliness belongs to the LIGHT
 * channel (engageEnvelopes), never to a geometry bounce.
 *
 * Every figure describing these rows is GENERATED — the register mirror in
 * scheme-spring.css is emitted from this table by scripts/regen-spring-tokens.mjs.
 * Nothing here states a settle, a peak, or a clock in prose.
 */
export const SPRING_PRESETS: readonly SpringPresetRow[] = [
    {
        name: "press",
        response: 0.2,
        dampingFraction: 0.8,
        settleBand: 0.02,
        comment:
            "A responsive press that lands dead. The liveliness is the squish, and the light is the acknowledgement.",
    },
    {
        name: "present",
        response: 0.22,
        dampingFraction: 1.0,
        settleBand: 0.02,
        comment:
            "The anchored materialization — a menu, plate, toast, or orb born from its anchor: front-loaded attack, monotone decay, dead landing.",
    },
    {
        // The pair is centred on the measured dock-arrival brackets: the damping
        // sits inside all three, and the response is what makes the damping free —
        // the clock lands where the shipped one did while the attack gets faster.
        name: "dock",
        response: 0.3,
        dampingFraction: 0.88,
        settleBand: 0.02,
        comment:
            "The coordinated travel — member FLIP, the selection lens, indicator glide: fast attack, dead landing.",
    },
    {
        // The ONE row whose overshoot is intrinsic rather than velocity-bought. The
        // pair reproduces the measured anisotropic stroke; the band is what places
        // the peak mid-clock instead of hiding it past the horizon (LAW 0b).
        name: "panel",
        response: 0.4,
        dampingFraction: 0.71,
        settleBand: 0.005,
        comment:
            "The fired deploy — the long axis of an anisotropic stroke, the extent morph; the one row whose rebound is intrinsic, arriving mid-clock.",
    },
    {
        // The empty cell in (response, ζ) space: long response AND high damping.
        // Without it the fired deploy's rebound lands on a room-sized plate, where
        // an intrinsic overshoot reads as wobble rather than as physicality.
        name: "bloom",
        response: 0.42,
        dampingFraction: 0.9,
        settleBand: 0.005,
        comment:
            "The room-sized growth — a surface expanding to fill a sheet or a screen: big, patient, dead-landing.",
    },
    {
        // ζ stays exactly 1.0 and now has a reason rather than a preference.
        name: "world",
        response: 0.48,
        dampingFraction: 1.0,
        settleBand: 0.005,
        comment:
            "The world's recession — under-layer travel and scroll choreography, critically damped; a world that rings reads as an earthquake.",
    },
] as const;
//
// PER-PRIMITIVE REGISTERS (presets-in-consumers) — the census, OPEN.
// A pair may sit outside this table only as a per-primitive default: JS-only (no CSS
// `--spring-*` token), documented at its ONE consumer, never a second register TABLE.
// Every such form on disk:
//   · [2026-08-07 · BK #46] the ScrubberTimeline head/fill/press legs are GONE with
//     their SFC — the redesigned Timeline rides `springPreset("dock")` by name on all
//     three of its expressions and declares no local pair at all;
//   · the pager worm's lead pair + trail tau (pager-dots/constants.ts), colocated
//     with its one consumer;
//   · the blob pinch-snap pulse — an impulse response, not a transition register;
//   · the blob pointer-follow pair (blob/composables/useBlobPointer.ts);
//   · `useSpring`'s bare-primitive default (motion/spring/useSpring.ts).
// The last two are RECORDED, not ratified — their disposition is BK RT-26F, which
// is a design-seat ruling. Any new entry takes that same ruling, never a drive-by
// literal. `DRAWER_SNAP` was the third and is DISCHARGED BY SUBTRACTION: the sheet's
// detent engine names `bloom` and `dock` from this table, so the private seventh
// register died with the file that held it rather than being ratified into one.

/** Lookup one Glass semantic spring preset by name. */
export function springPreset(name: SpringPresetName): SpringPresetRow {
    const row = SPRING_PRESETS.find((p) => p.name === name);
    if (!row) throw new Error(`Unknown spring preset: ${name}`);
    return row;
}
