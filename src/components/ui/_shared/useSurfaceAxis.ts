// _shared/useSurfaceAxis.ts — the ONE shared {glass·veil·opaque} surface-
// decoration resolver (BA.W-SURFACE-AXIS).
//
// The CSS half is `src/styles/glass/surface-axis.css` (the `[data-surface]`
// decoration rules over a base glass tier). This is the TS half: the `Surface`
// union every enrolled surface threads + the `surfaceClass` resolver that maps a
// (surface, tier) pair to the class string a surface composes today — so the
// adoption is byte-identical for the three shared rungs Card already emitted
// (`veil-surface` / `glass-opaque`), a refactor onto ONE resolver, not a visual
// change.
//
// NO second axis. `cartoon` is NOT a {glass·veil·opaque} member — it is a
// Card-local decoration superset member (the Memphis-sticker look), so it lives
// on Card's own `CardSurface` union, NOT here. A consumer wave forking its own
// three-rung surface recipe is forbidden by construction (the DAG §5 second-axis
// prohibition, machine-locked by `proof:surface-axis` W1). W-FEEDBACK-TONE and
// W-MENU-GLASS CONSUME this resolver (they import `Surface` + `surfaceClass`);
// they do not re-author it.

/**
 * The shared surface-decoration axis — four rungs, ONE grammar.
 *
 *   glass   — the resolved tier's plain glass rung (default). The translucent
 *             blur surface, the maximal glass-first register.
 *   veil    — the borderless/rimless text-legibility plate: the `--glass-bg-quiet`
 *             fill + blur with the box border AND rim STRIPPED (the boxed look
 *             reads as a dividing line on a text plate). Reads the same `--glass-*`
 *             ladder + W55 `--glass-tint-*` seam, so `--glass-level` / the bright
 *             bucket retune it in lockstep with every glass surface.
 *   opaque  — the `--glass-level:0` solid-card escape: solid `--card` + `blur(0)`
 *             through the ONE level knob. The explicit opt-out from the maximal
 *             glass default.
 *   clear   — BE.W-CLEAR-VARIANT: the Apple-Clear MAXIMALLY translucent register —
 *             the `--glass-bg-clear` (0.58) plate, the clearest the library ships
 *             (the album grid bleeds genuinely through). STRUCTURALLY coupled to a
 *             MANDATORY `::before` legibility scrim (a near-transparent plate → the
 *             text needs a scrim floor) whose strength derives from the sampled
 *             `--glass-backdrop-luma` (it dims MORE over a bright backdrop). A
 *             scrim-less clear surface is FORBIDDEN — the `.glass-clear` decoration
 *             class carries the scrim in the SAME rule (the Apple Clear contract).
 */
export type Surface = "glass" | "veil" | "opaque" | "clear";

/**
 * The 5-rung glass-ladder tier the surface paints its base over. Mirrors the
 * `.glass-{wash,quiet,resting,floating,overlay}` ladder. A surface passes the rung
 * it already paints (Card's `resting`, Dialog/Sheet/Popover's `floating`); the
 * resolver maps it to the `glass-${tier}` base class. `opaque` is NOT a ladder
 * rung here — it is a decoration on TOP of a base tier (the `.glass-opaque`
 * escape keeps the tier's edge/rim), exactly as Card composes it.
 */
export type SurfaceTier =
    | "wash"
    | "quiet"
    | "resting"
    | "floating"
    | "overlay";

/**
 * Resolve a (surface, tier) pair to the class string a surface composes. Pairs
 * with a `:data-surface="surface"` attribute binding on the same element — the
 * CSS seam (`surface-axis.css`) reads the attr to apply the veil/opaque
 * decoration UNIFORMLY, while this resolver emits the back-compat decoration
 * classes (`veil-surface` / `glass-opaque`) so Card's three shared rungs stay
 * byte-identical and a surface composing the class set alone (no attr) still
 * paints correctly.
 *
 *   surfaceClass("glass",  "floating") → "glass-floating"
 *   surfaceClass("veil",   "floating") → "glass-floating veil-surface"
 *   surfaceClass("opaque", "floating") → "glass-floating glass-opaque"
 *   surfaceClass("clear",  "floating") → "glass-floating glass-clear"
 *
 * The `glass-clear` decoration class (BE.W-CLEAR-VARIANT) is scrim-COUPLED: its CSS
 * rule carries the MANDATORY `::before` legibility scrim in the SAME seam, so a
 * `surface="clear"` surface can NEVER paint the maximally-translucent plate without
 * the dim — the Apple Clear contract is structural, not opt-out.
 *
 * @param surface the decoration rung (`glass` default · `veil` · `opaque` · `clear`)
 * @param tier    the base ladder rung (default `resting`)
 */
export function surfaceClass(
    surface: Surface = "glass",
    tier: SurfaceTier = "resting",
): string {
    const base = `glass-${tier}`;
    if (surface === "veil") return `${base} veil-surface`;
    if (surface === "opaque") return `${base} glass-opaque`;
    if (surface === "clear") return `${base} glass-clear`;
    return base;
}
