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
export type SpringPresetName = "smooth" | "snappy" | "bouncy" | "gentle" | "dock" | "press";

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
 * BC.W-SPRING-EASE — the retune that eases the two abrupt curves + mints the press
 * register (USER-DEFECTS §B/§D, the "squishy/quick/coupled" mandate). The retune is
 * SURGICAL — `smooth`/`dock`/`gentle` are byte-frozen KEEPS:
 *   · snappy: response 0.35 / ζ 0.65 → 0.42 / 0.78. The old pair front-loaded — its
 *     2%-band travel collapsed into the first ~16% of the clock then sat dead-flat.
 *     The eased pair spreads the travel so the 90%-point lands mid-clock (the analytic
 *     90%-travel fraction t₉₀/t_settle ≈ 0.57, in the [0.55,0.70] target band), keeping
 *     it QUICK (0.34s clock) with a whisper of life (overshoot ~+2.0%, ≤ the +7% bar).
 *   · bouncy: ζ 0.45 → 0.55. Overshoot drops +20.5% → +12.6%, into the Apple 12-18%
 *     band (apple-ios27.md §5 "ease toward ζ0.55-0.60 if abrupt"; ζ=1−bounce ⇒ bounce
 *     0.45, more playful than Apple's 0.30 but controlled). response stays 0.5. ζ 0.55
 *     is the band floor — the +14% prose target maps here once the overshoot is solved
 *     analytically (ζ 0.60 lands +9.5%, BELOW the band; the proof's S2 floor is ζ≥0.55).
 *   · press: MINTED at response 0.15 / ζ 0.86 — the Apple `interactiveSpring`
 *     (apple-ios27.md §2.2/§2.5). The press answers in the sub-100ms iOS window with a
 *     sub-perceptual alive rebound (~+0.5%). `useSpringPress` defaults re-point onto it.
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
        response: 0.42,
        dampingFraction: 0.78,
        comment: "CONTROL register — crisp position morphs (tab underline, progress fill, marker pop); eased to fill its clock (90%-travel ~0.57 of clock), overshoot ~+2.0%",
    },
    {
        name: "bouncy",
        response: 0.5,
        dampingFraction: 0.55,
        comment: "PLAYFUL register — emphatic one-shots only (bouncy toggle, dialog/success entrance, VT default), overshoot ~+12.6% (the Apple 12-18% band)",
    },
    {
        name: "gentle",
        response: 0.7,
        dampingFraction: 1.0,
        comment: "GENTLE register — patient critically-damped settle, reached via the --ease-spring-gentle @theme alias. BC.W-MOTION-PRESETS reuses this row as the brand convergence-reveal (--ease-convergence): the partial-sum settle is critically-damped with NO overshoot (ζ=1.0, overshoot 0) — measured-not-distinct, so the ALIAS, not a new row",
    },
    {
        name: "dock",
        response: 0.32,
        dampingFraction: 0.7,
        comment: "DOCK register — dock expand/collapse morph + the in-dock Slider thumb, iOS-control settled, overshoot ~+4.6%",
    },
    {
        name: "press",
        response: 0.15,
        dampingFraction: 0.86,
        comment: "PRESS register — the iOS interactive tap-press (Apple interactiveSpring 0.15/0.86); sub-100ms answer, tiny alive rebound ~+0.5%. Read by useSpringPress + the --glass-btn-press-t drive",
    },
] as const;

/** Lookup one preset row by name (used by `MOTION_CURVES` spring rows). */
export function springPreset(name: SpringPresetName): SpringPresetRow {
    const row = SPRING_PRESETS.find((p) => p.name === name);
    if (!row) throw new Error(`Unknown spring preset: ${name}`);
    return row;
}
