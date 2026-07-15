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
 * The shared surface-decoration axis — three rungs, ONE grammar.
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
 *
 * (BE.W-CLEAR-VARIANT's `clear` member was RETIRED at BI.W-CLEAR-FOLD — a full
 * mechanism with zero binding consumers; the substrate-without-consumer invariant
 * J-inv-10 retires it. proof:surface-axis W9 (member-consumption) gate-locks the
 * union against a future dead member riding vacuously.)
 */
export type Surface = "glass" | "veil" | "opaque";

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
 *
 * @param surface the decoration rung (`glass` default · `veil` · `opaque`)
 * @param tier    the base ladder rung (default `resting`)
 */
export function surfaceClass(
    surface: Surface = "glass",
    tier: SurfaceTier = "resting",
): string {
    const base = `glass-${tier}`;
    const deco = decorationClass(surface);
    return deco ? `${base} ${deco}` : base;
}

/**
 * Resolve ONLY the decoration class for a surface — no base-tier prefix
 * (BI.W-SURFACE-EXTRACT). The SINGLE source of the veil/opaque decoration
 * string; `surfaceClass()` (above) composes it after the base tier. This KILLS
 * the `surfaceClass(x).replace(/^glass-.../, "")` tier-strip DRY wart every
 * reka-portaled overlay hand-rolled to strip the base tier off `surfaceClass`'s
 * output (the `^glass-<tier>` prefix, whitespace-trimmed): a
 * surface that already composes its OWN base tier (Card `glass-${tier}`,
 * Dialog/Sheet/Popover's baked `glass-floating`, the drawer recipe) reaches
 * for the decoration ALONE through this function — ONE regex-free source.
 *
 *   decorationClass("glass")  → ""              (the identity — the bare tier paints)
 *   decorationClass("veil")   → "veil-surface"
 *   decorationClass("opaque") → "glass-opaque"
 *
 * @param surface the decoration rung (`glass` default · `veil` · `opaque`)
 */
export function decorationClass(surface: Surface = "glass"): string {
    if (surface === "veil") return "veil-surface";
    if (surface === "opaque") return "glass-opaque";
    return "";
}
