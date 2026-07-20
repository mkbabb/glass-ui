// The glass-ui engagement ENVELOPE register — the (attack, release) pairs that
// govern the LIGHT and MEDIUM channels, and the companion root to springPresets.ts.
//
// The division of labour is the register's whole charter: first-order envelopes are the
// vocabulary of channels WITHOUT mass (opacity, luminance, backdrop softening); springs
// are the vocabulary of GEOMETRY. An envelope never moves a rect, a spring never dims a
// lens. A surface whose light is driven by a spring reads as a wobbling lamp; a rect
// moved by an envelope reads as a slide with no weight in it.
//
// Engagement light is STATE, not event: a held engagement charges, peaks, SUSTAINS for
// the hold's entire multi-second life, and releases on the envelope's own clock after
// the commit — never on the geometry's. A press that only pulses has misread this.
//
// Pure data (no Vue, no keyframes.js), so the token generators and gates read it with
// no build step, exactly as they read the spring table.

/** An engagement-envelope role name. */
export type EngageRole =
    | "press-drain"
    | "medium-exit"
    | "control-engage"
    | "signal-decay";

/** One envelope row: the (attack, release) time constants + who rides it. */
export interface EngageEnvelopeRow {
    /** The role this envelope serves — the lookup key. */
    readonly role: EngageRole;
    /** τ_up: the first-order attack time constant in ms (the shared acknowledge class). */
    readonly attackMs: number;
    /** τ_down: the release time constant in ms. Always slower than the attack. */
    readonly releaseMs: number;
    /** The named surface this row was measured on — one rider per row. */
    readonly rider: string;
    /** The register this envelope serves. */
    readonly comment: string;
}

/**
 * The ONE press-acknowledge attack class every role shares. Attacks do not vary by
 * role — an acknowledge is an acknowledge — so the class is a BAND that every row's
 * τ_up must sit inside, not a per-row invention. Releases are where the roles differ:
 * that is what makes a drain feel like a cancel and a decay feel like a level falling.
 */
export const ENGAGE_ATTACK_CLASS = { minMs: 40, maxMs: 60 } as const;

/**
 * The acknowledge window: a press must be visibly answered within this budget, measured
 * as the envelope's t90 rather than its time constant. The class band above is drawn so
 * that even its slowest attack lands inside this window.
 */
export const ACKNOWLEDGE_WINDOW_MS = 150;

/**
 * The engagement envelopes. No envelope constant may be minted outside this table: a
 * new engagement earns a new ROW here, never a literal at a call site. That is the same
 * no-second-authority rule the spring table holds, for the channel springs do not own.
 */
export const ENGAGE_ENVELOPES: readonly EngageEnvelopeRow[] = [
    {
        role: "press-drain",
        attackMs: 55,
        releaseMs: 120,
        rider: "the perch charge",
        comment:
            "A felt cancel — the charge drains rather than cutting, so an abandoned press reads as released, not as never-seen.",
    },
    {
        role: "medium-exit",
        attackMs: 55,
        releaseMs: 160,
        rider: "the ambient lens",
        comment:
            "The world un-softens after a recruited medium lets go; the backdrop returns slower than it yielded.",
    },
    {
        role: "control-engage",
        attackMs: 60,
        releaseMs: 180,
        rider: "the frosted control wash",
        comment:
            "The engagement wash and bloom on a control surface, cooling well after the finger leaves.",
    },
    {
        role: "signal-decay",
        attackMs: 40,
        releaseMs: 220,
        rider: "the level meter",
        comment:
            "A level DRAINS, never vanishes — the slowest release in the register, because a signal that cuts reads as a dropped connection.",
    },
] as const;

/** Look one engagement envelope up by role. */
export function engageEnvelope(role: EngageRole): EngageEnvelopeRow {
    const row = ENGAGE_ENVELOPES.find((envelope) => envelope.role === role);
    if (!row) throw new Error(`Unknown engage envelope: ${role}`);
    return row;
}

/**
 * The role's acknowledge time — when the attack reaches 90% of its target. A first-order
 * envelope's t90 is `τ·ln(10)`; it is DERIVED here so the acknowledge budget is checked
 * against the shipped time constant rather than against a remembered millisecond figure.
 */
export function engageAttackT90Ms(role: EngageRole): number {
    return engageEnvelope(role).attackMs * Math.LN10;
}
