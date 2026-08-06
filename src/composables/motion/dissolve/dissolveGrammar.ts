// THE EXIT DIALECTS — five ways a surface can leave, and the one this library builds.
//
// EXEMPLARS-CODEX D3 (`:92`) is the adjudicated exit table: five named recipes, each with
// its own channel order, distinguished by WHO ENDED IT. TERMINAL-ROSTER #30 carries that
// table plus the mechanism of record for the fifth — `IOS27-ARCHIVE.md` §4b (`:182-210`),
// the Control-Centre dismissal, measured at 60fps on a background strip the panel never
// occupies. That mechanism is "a desynchronised three-channel release of the backdrop
// filter itself, with the element's own ink dropped first" — not mask erosion, not
// per-particle scatter, not displacement. It is the owner's vaporize.
//
// WHY A TABLE AND NOT FIVE STYLESHEETS. Four of the five dialects belong to surfaces this
// row does not own: the auto-expiry corner-tuck and the corner-anchored miniaturize are
// the toast's (#34 W-TOAST, CWT §TOAST), the flicked return-to-anchor is a gesture the
// sheet detent row owns (#39), and the in-place row dissolve was FOLDED INTO the vaporize
// by TR#30's own amendment list ("blur-leads-fade at 0.5×height/floor 0.30"). Writing all
// five as CSS here would author four recipes with no consumer and pre-empt three rows'
// rulings. So the table names them, each with the row that owns it, and this cut builds
// exactly the one it owns.
//
// IT MINTS NO CLOCK, on the `routeGrammar.ts` precedent. The vaporize's absolute
// durations are not written here or anywhere: the recipe reads `--exit-overlay-duration`
// (which #26's generator derives from the `panel` row's own settle) and spends it in the
// measured RATIO. "Ratios to preserve, not the absolutes" is the archive's own
// instruction, and it is what stops a dismissal outlasting the arrival it reverses.

/** The five dialects, by the name each is known by in the codex table. */
export type DissolveDialect =
    | "auto-expiry"
    | "flicked"
    | "miniaturize"
    | "row-dissolve"
    | "vaporize";

/**
 * A row states what the dialect IS, who ended it, and which roster row owns the surface
 * that speaks it. It carries no figures: a dialect that this library has not built has no
 * constants to carry, and the one it HAS built keeps its constants in
 * `VAPORIZE_CONSTANTS` below, where the CSS mirror reads them.
 */
export interface DissolveDialectRow {
    readonly dialect: DissolveDialect;
    /** Who ended it — the selector the codex row rules by ("who ended it selects the dialect"). */
    readonly endedBy: "timer" | "gesture" | "system" | "user";
    /** Built by THIS library today, or named-and-routed. */
    readonly built: boolean;
    /** The roster row that owns the surface speaking it. */
    readonly owner: string;
    readonly comment: string;
}

/** The table. Reading order is the codex row's, not a precedence. */
export const DISSOLVE_DIALECTS: readonly DissolveDialectRow[] = [
    {
        dialect: "auto-expiry",
        endedBy: "timer",
        built: false,
        owner: "#34 W-TOAST",
        comment:
            "Slide, then tuck to a miniature at CONSTANT alpha, then hold, then fade with the geometry frozen and no blur — the banner nobody dismissed. Archive §4a proves the shrink and the fade are sequential, so anything running scale and opacity on one timeline is wrong.",
    },
    {
        dialect: "flicked",
        endedBy: "gesture",
        built: false,
        owner: "#39 W-DIALOG-DETENT",
        comment:
            "Thrown off the top, re-entering from the anchor blurred, re-sharpening mid-flight and blurring out again — blur = k·|v| in both directions. A velocity-coupled profile no static recipe can produce, so it belongs to the row that owns the gesture. RECEIVED AND RULED at #39 (RT-30C, 2026-08-06), and the ruling splits the dialect: its MOTION ships — `sheet/detents/projection.ts` integrates the release velocity over the catching spring's own settle horizon, so a throw that projects short is carried back to its anchor and one that projects past the first rung resolves onto 0 and dismisses. Its INK is REFUSED here on three grounds, none of them scheduling: (1) `blur = k·|v|` puts a per-frame `filter` over the whole plate during exactly the drag-and-settle window that is this row's own falsifier — the detent is a SIZE, so the box already animates on layout, and P7's fps budget is the price that bought that geometry; spending it twice, before it has once been measured, is the second cost the row refused to pay. (2) The surface's own exit is that same spring reversed to 0; a velocity-coupled blur composed onto it is two exits on one clock — the identical ground RT-30D was refused on at this row. (3) `k` has no mechanism of record: the archive measures the vaporize's channels, not this one, and #30's own law is that a dialect with no measurement is NAMED, never authored from a guess. The row that revives it owes the measurement first.",
    },
    {
        dialect: "miniaturize",
        endedBy: "user",
        built: false,
        owner: "#34 W-TOAST",
        comment:
            "Retract, rematerialize at the corner near a quarter scale, shrink SHARP to about an eighth, then freeze the geometry and let the fade run 1.75× longer with terminal micro-blur only. RULED at codex ADJ-1 — blur is a last-third coherence loss here, never a driving channel, and no capture is owed.",
    },
    {
        dialect: "row-dissolve",
        endedBy: "user",
        built: true,
        owner: "#30 W-DISSOLVE (folded into the vaporize)",
        comment:
            "In place: the blur LEADS the fade, the centroid and width never move, and the element grows only by its own blur bleed. TR#30 folds this into the vaporize as two of its four amendments, so it ships as the vaporize's ink channel rather than as a sixth recipe.",
    },
    {
        dialect: "vaporize",
        endedBy: "system",
        built: true,
        owner: "#30 W-DISSOLVE",
        comment:
            "The backdrop filter releases in three channels on three clocks while the ink drops first — for a beat you see colour with no form. The owner's ask, and the only dialect that reaches every backdrop-bearing dismissal rather than one component's exit.",
    },
] as const;

/** Look one dialect up by name. */
export function dissolveDialect(dialect: DissolveDialect): DissolveDialectRow {
    const row = DISSOLVE_DIALECTS.find((r) => r.dialect === dialect);
    if (!row) throw new Error(`Unknown dissolve dialect: ${dialect}`);
    return row;
}

/**
 * The vaporize's measured constants, carried in ONE table.
 *
 * `channelRatio` traces to `IOS27-ARCHIVE.md` §4b: saturation, dim and blur reach 95% of
 * their released values at 184 / 250 / 317 ms — 1 : 1.36 : 1.72, monotone, ease-out, zero
 * overshoot on any channel, saturation always first and blur always last. The absolutes
 * are the archive's device; the ratio is the mechanism, and it is the ratio we keep.
 *
 * The other three are TR#30's amendments, stated there verbatim: the ink collapses by 40%
 * of the travel, its alpha floors at 0.30 on the way, and its blur peaks at half the
 * element's own height. `transform-free` and `the backdrop outlives the panel by two
 * frames` are the amendments that are structural rather than numeric — the first is an
 * absence the arms check, and the second is a FLOOR the ratio already clears (see
 * `backdropOutlivesPanel`).
 */
export const VAPORIZE_CONSTANTS = {
    /** §4b: sat : dim : blur = 1 : 1.36 : 1.72, saturation first, blur last. */
    channelRatio: { saturate: 1, dim: 1.36, blur: 1.72 },
    /** Amendment: the ink's collapse completes at 40% of the travel. */
    inkCollapseFraction: 0.4,
    /** Amendment: the ink's alpha floors at 0.30 where the collapse completes. */
    inkOpacityFloor: 0.3,
    /** Amendment: the ink's blur peaks at half the element's own block size. */
    inkBlurHeightRatio: 0.5,
} as const;

/**
 * The total travel is the BLUR channel's clock, because blur is always last. Every other
 * clock in the recipe is this one times a ratio, so the recipe carries exactly one
 * duration token and spends it.
 */
export function channelFraction(channel: keyof typeof VAPORIZE_CONSTANTS.channelRatio): number {
    const { channelRatio } = VAPORIZE_CONSTANTS;
    return channelRatio[channel] / channelRatio.blur;
}

/**
 * Where the ink's blur peaks, as a fraction of the travel. The blur leads the fade by the
 * SAME ratio the saturation leads the blur — the mechanism's one ratio, spent twice,
 * rather than a second lead figure nobody measured.
 */
export function inkBlurFraction(): number {
    return VAPORIZE_CONSTANTS.inkCollapseFraction / VAPORIZE_CONSTANTS.channelRatio.blur;
}

/**
 * The panel — plate, rim and cast — is gone when the DIM channel lands; the backdrop's
 * blur runs on to the end. This is "the backdrop outlives the panel by two frames" stated
 * as what it is: a floor, in milliseconds, that a given travel either clears or does not.
 * At the shipped travel it clears it several times over, and the arm checks the arithmetic
 * rather than a remembered millisecond. The frame the floor is counted in is the shared
 * `FRAME_MS` (`motion/core/constants.ts`) — this table mints no second one.
 */
export function backdropOutlivesPanel(travelMs: number): number {
    return travelMs * (1 - channelFraction("dim"));
}

/**
 * The corner affordance's placement, from `IOS27-ARCHIVE.md` §3 as adjudicated by CWT O-10
 * (`:1293`): the disc's centre sits ON the element's corner point, nudged inward by ~6.5%
 * of its own diameter, so about 70% of it floats free and it visually rests on the corner
 * arc. `offset` is what both insets take, in units of the diameter — negative, because the
 * disc hangs outside the box. The diameter itself is 0.42 × a SQUARE host's edge; a
 * non-square host names its own, which is why `size` is a knob and not a derivation.
 */
export const CORNER_AFFORDANCE = {
    /** §3: diameter = 0.42 × the element's edge length (25.3pt on a 60pt icon). */
    edgeRatio: 0.42,
    /** §3: the centre is nudged inward by ~6.5% of the disc's own diameter. */
    inwardNudge: 0.065,
} as const;

/** The inset both axes take, in units of the diameter. Negative: the disc hangs out. */
export function cornerAffordanceOffset(): number {
    return CORNER_AFFORDANCE.inwardNudge - 0.5;
}
