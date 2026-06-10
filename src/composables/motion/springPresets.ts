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
export type SpringPresetName = "smooth" | "snappy" | "bouncy" | "gentle" | "dock";

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
 */
export const SPRING_PRESETS: readonly SpringPresetRow[] = [
    {
        name: "smooth",
        response: 0.5,
        dampingFraction: 0.86,
        comment: "SETTLE register — entrances/fades/scale-ins, no overshoot read",
    },
    {
        name: "snappy",
        response: 0.35,
        dampingFraction: 0.65,
        comment: "CONTROL register — crisp position morphs (tab underline, progress fill, marker pop), overshoot ~+6.8%",
    },
    {
        name: "bouncy",
        response: 0.5,
        dampingFraction: 0.45,
        comment: "PLAYFUL register — emphatic one-shots only (bouncy toggle, dialog/success entrance, VT default), overshoot ~+20.5%",
    },
    {
        name: "gentle",
        response: 0.7,
        dampingFraction: 1.0,
        comment: "GENTLE register — patient critically-damped settle, reached via the --ease-spring-gentle @theme alias",
    },
    {
        name: "dock",
        response: 0.32,
        dampingFraction: 0.7,
        comment: "DOCK register — dock expand/collapse morph + the in-dock Slider thumb, iOS-control settled, overshoot ~+4.6%",
    },
] as const;

/** Lookup one preset row by name (used by `MOTION_CURVES` spring rows). */
export function springPreset(name: SpringPresetName): SpringPresetRow {
    const row = SPRING_PRESETS.find((p) => p.name === name);
    if (!row) throw new Error(`Unknown spring preset: ${name}`);
    return row;
}
