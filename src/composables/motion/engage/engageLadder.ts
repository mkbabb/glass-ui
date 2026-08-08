// The glass-ui ENGAGEMENT LADDER — the five rungs, made executable.
//
// MOTION-CANON §4 states the ladder in prose — rest → hover → press → engaged →
// modal, "each rung with a stated magnitude and curve" — and then lists seven things
// "a gate can check" (G1…G7). Those seven had no SUBJECT: there was no artefact
// naming the rungs, so nothing could be asked whether a rung's lead was single, its
// channel count inside budget, or its hover arm pointer-guarded. This table is that
// subject. It is the whole of what `W-ENGAGE-LADDER — breath of life, MADE CHECKABLE`
// means (WAVES:631).
//
// IT MINTS NO FIGURE, AND THAT IS THE DESIGN. Geometry vocabulary lives in
// `springPresets.ts`; light vocabulary lives in `engageEnvelopes.ts`. A rung here
// NAMES a row from each and declares which channels it is allowed to move — it never
// restates a response, a damping fraction, a settle, a scale or a millisecond.
// Restating one would be the duplicated-derived-data class: two figures, one truth,
// and no way to tell which drifted. Every clock this table implies re-derives from
// the two roots it cites, and the gate reads it through those roots rather than
// through a remembered number.
//
// THE TWO CHANNELS RUN OPPOSITE ASYMMETRIES, AND THIS IS WHERE THAT IS RULED.
//   · GEOMETRY exits FASTER than it enters. The generated `--spring-*-exit-duration`
//     is 0.6 × the row's own settle (`scripts/regen-spring-tokens.mjs`) — a departure
//     is the same motion read backwards and impatiently, and a slow exit reads as the
//     thing refusing to leave. This is §4's G4 ASYMMETRY.
//   · LIGHT exits SLOWER than it enters, by the envelope table's own charter
//     ("τ_down … Always slower than the attack"). A drain that cuts reads as
//     never-seen; a level that vanishes reads as a dropped connection.
// G4 therefore binds the SPATIAL leg ONLY. Read as a universal it forbids the
// envelope register outright — which is how a gate ends up arguing with the table it
// was written to protect. The split is stated here once, and `LADDER_EXIT_LAW` below
// is what a checker reads instead of guessing.
//
// TWO SPEC-VS-DISK DIVERGENCES ARE RESOLVED HERE RATHER THAN CARRIED (both recorded
// with their falsifiers at the row's RECORD.md §DIVERGENCE):
//   1. §4's MODAL rung names the RETIRED `transient` spring (0.20s). That name is a
//      GRAVE — BK #26 struck it (`tests/styles/spring-authority.test.ts` GRAVES) and
//      its token spelling returns zero hits in `src/`, which is why this note does not
//      spell it either: planting a dead custom-property name in source is the exact
//      thing that gate forbids. The live row whose job is MODAL's ("the anchored
//      materialization — a menu, plate, toast, or orb born from its anchor") is
//      `present`, and that is what MODAL binds.
//   2. §4's HOVER rung names `--scale-hover-btn (1.05)`. No such token exists on
//      disk (`--scale-press-sm` does; `--scale-hover-btn` does not). The ladder does
//      not mint it: a per-component hover scale is the component row's (#80 W-BUTTON),
//      and what the LADDER owns is the BUDGET the component must sit inside —
//      `HOVER_GEOMETRY_BUDGET` below, which the shipped `--scale-hover` (1.08)
//      exactly saturates.

import type { EngageRole } from "./engageEnvelopes";
import type { SpringPresetName } from "../spring/springPresets";

/** The five rungs of MOTION-CANON §4, in ascending engagement order. */
export type EngageRungName = "rest" | "hover" | "press" | "engaged" | "modal";

/**
 * The four channels a rung may move (§4 G3). `geometry` is the only one with mass and
 * therefore the only one a spring may drive; the other three are envelope territory.
 */
export type EngageChannel = "geometry" | "luminance" | "blur" | "light";

/** One rung: what it moves, what it moves ON, and the guards it carries. */
export interface EngageRungRow {
    /** The rung name — the lookup key. */
    readonly rung: EngageRungName;
    /**
     * The rank of this rung's LEADING channel. Exactly one channel leads at rank 0
     * (§4 G2); `null` means the rung sits outside the rank system entirely, which is
     * true of `rest` alone.
     */
    readonly rank: 0 | null;
    /**
     * The rank at which the WORLD channel follows the rung's lead, or `null` where the
     * rung recruits no world. §4 gives the engaged veil +6 and the modal scrim +2.
     */
    readonly worldLagRank: number | null;
    /** The geometry row this rung rides, by name. `null` = the rung moves no rect. */
    readonly spring: SpringPresetName | null;
    /** The light row this rung rides, by role. `null` = the rung drives no envelope. */
    readonly envelope: EngageRole | null;
    /** Every channel this rung is permitted to move. Length ≤ `CHANNEL_BUDGET` (G3). */
    readonly channels: readonly EngageChannel[];
    /** Whether the rung exists only on a fine pointer — `@media (hover: hover)` (G7). */
    readonly pointerFine: boolean;
    /** Whether at most one element in the document may hold this rung (G6). */
    readonly singleton: boolean;
    /** The rung's ONE job, in the register's own words. */
    readonly comment: string;
}

/**
 * §4 G3 — "no rung changes more than 2 of {geometry, luminance, blur, light}". The
 * budget is the reason the ladder reads as one language rather than as five effects
 * firing at once: a rung that moves three channels has stopped being a rung and become
 * a scene.
 */
export const CHANNEL_BUDGET = 2;

/**
 * §4 HOVER — "size ≤8%". Stated as the multiplicative ceiling a hover scale may reach,
 * so a component row's own token is checkable against the ladder without the ladder
 * knowing that component exists. The shipped `--scale-hover` (1.08) sits exactly on it.
 */
export const HOVER_GEOMETRY_BUDGET = 1.08;

/**
 * Which channel each asymmetry law governs — the ruling the two roots' opposite
 * charters force (see the header). A checker reads THIS rather than assuming one
 * direction is universal.
 *
 * THE CONTROL SURFACE RUNS TWO CLOCKS, AND THIS IS THE LAW THAT KEEPS THEM APART.
 * A control's colour/border/shadow legs are clocked by an ATTACK channel and a RELEASE
 * channel, and neither may be re-pointed at the other:
 *   · ATTACK is bounded ABOVE by `ACKNOWLEDGE_WINDOW_MS` — `--duration-control` (the
 *     0.12s control beat, `@utility transition-control`) and `--engage-*-attack` both
 *     sit inside it. The standing strike against the 0.2s calm clock at
 *     `utilities/btn.css` is a statement about THIS channel and no other.
 *   · RELEASE is bounded BELOW by its own attack, by `light` here. A release inside the
 *     acknowledge window is not a faster acknowledgement, it is a cut.
 * A gate or a seat that reads one channel's bound as universal will "fix" the other into
 * nonexistence; that is the collision this constant exists to forbid.
 */
export const LADDER_EXIT_LAW = {
    /** Spatial legs depart faster than they arrive; the generator ships 0.6 ×. */
    geometry: "faster-than-entry",
    /** Light legs outlive their attack; the envelope table ships release > attack. */
    light: "slower-than-entry",
} as const;

/**
 * The ladder. Ordered by ascending engagement, which is also the order a control
 * climbs: no rung may be reached without its predecessor being reachable.
 */
export const ENGAGE_LADDER: readonly EngageRungRow[] = [
    {
        rung: "rest",
        rank: null,
        worldLagRank: null,
        spring: null,
        envelope: null,
        channels: ["light"],
        pointerFine: false,
        singleton: false,
        // R-4, ruled: material at rest, the ladder alive on interaction. REST binds no
        // envelope BECAUSE the envelope table is the ENGAGEMENT register and rest is
        // not an engagement — §4's "breath is a floor, not a loop" puts a control's
        // rest response in its material's answer to the pointer field, and rules that
        // "a control never carries a decorative idle animation". The one legal idle
        // loop belongs to an AMBIENT surface at sub-interactive tempo, which is a
        // different axis and not scored on this ladder.
        comment:
            "The floor, not a loop — a control at rest answers the pointer field through its material and reports its state truthfully; it runs no idle animation.",
    },
    {
        rung: "hover",
        rank: 0,
        worldLagRank: null,
        spring: "press",
        envelope: "control-engage",
        channels: ["geometry", "luminance"],
        pointerFine: true,
        singleton: false,
        comment:
            "The pointer's acknowledgement — one ladder rung up and a light answer inside the acknowledge window; it does not exist on a coarse pointer.",
    },
    {
        rung: "press",
        rank: 0,
        worldLagRank: null,
        spring: "press",
        envelope: "press-drain",
        channels: ["geometry", "luminance"],
        pointerFine: false,
        singleton: false,
        // The `press` spring lands DEAD by construction (LAW 0, BK #26). That is the
        // ladder's GROUND for putting the liveliness in the squish and the light
        // rather than in a positional rebound: a press answers by compressing and by
        // brightening, and the drain is what makes an abandoned press read as
        // released rather than as never-seen.
        comment:
            "The finger's answer — the squish and the light that acknowledges it, never a positional rebound; the drain makes an abandoned press read as released.",
    },
    {
        rung: "engaged",
        rank: 0,
        worldLagRank: 6,
        spring: "dock",
        envelope: "control-engage",
        channels: ["geometry", "blur"],
        pointerFine: false,
        singleton: true,
        comment:
            "The control promoted out of its own footprint — it grows into a temporary overlay of itself while its rest footprint stays visible beneath, and the world recedes behind the focus veil.",
    },
    {
        rung: "modal",
        rank: 0,
        worldLagRank: 2,
        spring: "present",
        envelope: null,
        channels: ["geometry", "blur"],
        pointerFine: false,
        singleton: false,
        // MODAL binds no envelope, and the omission is a ROUTING rather than a ruling:
        // §4 puts the scrim's dim on the `world` SPRING clock, which the envelope
        // table's own division of labour forbids ("a spring never dims a lens"). The
        // scrim is #38 W-DIALOG's material; the re-point is recorded and routed there
        // rather than cut from under it here.
        comment:
            "The plate is presented — born from its anchor edge with the volume-preserving squish, its content condensing to crisp exactly at settle.",
    },
] as const;

/** Look one rung up by name. */
export function engageRung(rung: EngageRungName): EngageRungRow {
    const row = ENGAGE_LADDER.find((candidate) => candidate.rung === rung);
    if (!row) throw new Error(`Unknown engage rung: ${rung}`);
    return row;
}

/**
 * The rungs that ride a given envelope role — the reverse index the light-channel
 * gate reads so a role's CSS clock can be checked against every rung that consumes it
 * without the check enumerating rungs by hand.
 */
export function rungsForEnvelope(role: EngageRole): readonly EngageRungRow[] {
    return ENGAGE_LADDER.filter((row) => row.envelope === role);
}
