// THE ROUTE GRAMMAR — one typed transition per nav class, made checkable.
//
// WAVES:654 asks for "one typed transition grammar, one mechanism per nav class" and
// then leaves the grammar to be discovered mid-wave. TERMINAL-ROSTER #29 ⊕⁵ closes that:
// the grammar is RULED by the EXEMPLARS-CODEX #29 row (I4 · I4b), and what survives of
// WAVES:657 is F06's paint-order-vs-duration *diagnosis*, never a mechanism choice. This
// table is the ruling, executable.
//
// IT MINTS NO SPRING FIGURE, on the `engageLadder.ts` precedent. A row here NAMES the
// spring row that owns its job and the clock it reads that row on; every response, damping
// fraction and settle lives in `springPresets.ts` and is restated nowhere. The four
// measured constants the codex row DOES carry (the inhale pair, the parallax ratio, the
// opacity-cut point) live in `ROUTE_CONSTANTS` below, once, with their provenance, and are
// mirrored into `tokens/motion-registers.css` for the recipe to read — and
// `tests/styles/route-motion.test.ts` censuses every stylesheet under `src/` plus every
// module on the `composables/motion` surface and reds on a third site.
//
// ── THE FOUR CLASSES, AND WHY EACH BINDS THE ROW IT BINDS ────────────────────────────
//
//   route     `present` — the anchored materialization. The chrome-only nav: no element
//             travels, the page materialises in place, and the whole transition is the
//             alpha-conserving root cross-fade. This IS the "deliberate ≤1-frame cut"
//             GREENFIELD-TERMINAL R-D (:257) ruled for the case where nothing is
//             continuous between the two states.
//
//   zoom      `panel` — the extent morph, panel's stated ONE JOB, and the row's intrinsic
//             +4.2% mid-clock peak IS the codex's LANDING BLOOM ("the receiving icon
//             momentarily larger and crisper than final — the one sanctioned overshoot,
//             reserved for impact"). MOTION-CANON LAW 4 permits exactly one rebounding
//             row and this is it, so the bloom costs no second register and no literal.
//
//   lateral   `dock` — the coordinated travel. A sibling push is a rect travelling
//             between two positions, which is dock's job by name (BK ⊕⁴¹ made the same
//             ruling for #48's member travel).
//
//   collapse  NO SPRING. MOTION-CANON §7: an exit takes `--ease-in`, a bezier, always —
//             "an exit must not overshoot past gone" — and the codex measures the return
//             as a violent ease-in with the opacity HELD then CUT at the last tenth. Its
//             clock is the exit reader of the row it reverses (`panel`), so a recede can
//             never outlast the arrival it undoes.
//
// ── THE WORLD, AND THE ONE DEVIATION THIS TABLE SHIPS ────────────────────────────────
// Every class that moves a window also recedes its world (MOTION-CANON §3(d) RECEDE:
// translateY + blur + dim, all three together, for a world being REPLACED). The world
// binds `world` — the row whose ONE JOB is the world's recession — and the codex's
// "world at 1.7-2× the foreground clock" is therefore not a figure we set but a RATIO our
// table-fixed rows produce. Measured off the generated settles it is 1.267× for `zoom`
// (0.57 / 0.45), 2.714× for `lateral` (0.57 / 0.21) and exactly 2.000× for `collapse`
// (0.25 + 0.25, over 0.25): one class lands inside the codex's band and the other two
// BRACKET it. Reaching the band in all three would take either a route-only clock literal
// or a second row owning a job it does not own, and both are forbidden. What the band
// actually expresses — the world is strictly slower than the foreground and finishes
// LAST, in both directions — holds in every class, and that is what the gate arm checks
// against the generated tokens rather than against a remembered multiple.

import type { SpringPresetName } from "../spring/springPresets";

/** The four nav classes. One mechanism each; a navigation is exactly one of them. */
export type RouteNavClass = "route" | "zoom" | "lateral" | "collapse";

/**
 * A row is what the mechanism and the CSS mirror both READ. Nothing that neither reads
 * belongs here: whether a window travels is `nav !== "route"` at the one site that needs
 * it (`useRouteTransition`), and which channels a class moves is the recipe body's own
 * keyframe list in `styles/view-transition.css` — a second copy of either would be prose
 * in a type position, drifting the moment one of them is retuned.
 */
export interface RouteNavRow {
    readonly nav: RouteNavClass;
    /** The spring row the FOREGROUND binds, or `null` where the class takes a bezier. */
    readonly foreground: SpringPresetName | null;
    /** The bezier a `null`-foreground class takes instead (§7 — an exit is never a spring). */
    readonly ease: "--ease-in" | null;
    /** The row the WORLD recedes/recovers on; `null` where no world moves. */
    readonly world: SpringPresetName | null;
    /** The class's foreground clock: `duration` on an entrance, `exit-duration` on an exit. */
    readonly clock: "duration" | "exit-duration";
    /** The world starts only after the foreground is gone — an exit's recovery order. */
    readonly worldWaitsForForeground: boolean;
    readonly comment: string;
}

/** The grammar. Order is the reading order of the record, not a precedence. */
export const ROUTE_GRAMMAR: readonly RouteNavRow[] = [
    {
        nav: "route",
        foreground: "present",
        ease: null,
        world: null,
        clock: "duration",
        worldWaitsForForeground: false,
        comment:
            "The chrome-only nav — nothing is continuous between the two states, so the whole transition is one alpha-conserving cross-fade of the root pair.",
    },
    {
        nav: "zoom",
        foreground: "panel",
        ease: null,
        world: "world",
        clock: "duration",
        worldWaitsForForeground: false,
        comment:
            "Forward, into the tapped cell — the window's extent morph carries the landing bloom in the one rebounding row, while the world it left recedes behind it.",
    },
    {
        nav: "lateral",
        foreground: "dock",
        ease: null,
        world: "world",
        clock: "duration",
        worldWaitsForForeground: false,
        comment:
            "Sibling to sibling — the coordinated push, with the world trailing at the parallax ratio so depth reads without anything else moving.",
    },
    {
        nav: "collapse",
        foreground: null,
        ease: "--ease-in",
        world: "world",
        clock: "exit-duration",
        worldWaitsForForeground: true,
        comment:
            "Back, out of the window — a violent ease-in with the opacity held then cut at the last tenth, and the world recovering only once the window is gone.",
    },
] as const;

/**
 * The measured constants of the codex row, carried in ONE table.
 *
 * Every one traces to `EXEMPLARS-CODEX.md` rows I4 (`:131`, the icon↔app morph) and I4b
 * (`:132`, the windowing transition). They are measurements of a corpus, not derivations,
 * so they cannot be re-derived from the spring table — which is exactly why they are
 * fenced here rather than sprinkled. Three of the four are mirrored into
 * `tokens/motion-registers.css` for the recipe to read, and those two sites are the whole
 * census: `route-motion.test.ts` reads every stylesheet under `src/` and every module on
 * the `composables/motion` surface, comments and string literals stripped, and reds on a
 * third site or on a `--route-*` token declared in a second file.
 */
export const ROUTE_CONSTANTS = {
    /** I4: "the tapped icon alone scales to 1.57× in 42ms, razor sharp, z-lifted". */
    inhaleScale: 1.57,
    /** I4, the same beat's window. The label is already gone by the time it ends. */
    inhaleMs: 42,
    /** I4b: "the lateral push runs parallax ~1:8". One ratio, both parallax cases. */
    parallax: 1 / 8,
    /** I4: "opacity held then CUT at the last tenth" — the hold ends at 90% of the exit. */
    opacityCutAt: 0.9,
} as const;

/** Look one class up by name. */
export function routeNav(nav: RouteNavClass): RouteNavRow {
    const row = ROUTE_GRAMMAR.find((r) => r.nav === nav);
    if (!row) throw new Error(`Unknown route nav class: ${nav}`);
    return row;
}

// ── THE TOKEN NAMES A ROW BINDS ──────────────────────────────────────────────────────
// A clock is never a number here. These return the NAME of the generated custom property
// the register must carry, so the CSS mirror and the ordering check both resolve through
// `scheme-spring.css` — the one place a settle is written down — instead of through a
// second arithmetic that could drift from the generator.

/** The curve the foreground rides: a spring row's curve, or the exit bezier. */
export function foregroundCurveToken(row: RouteNavRow): string {
    return row.foreground ? `--spring-${row.foreground}` : (row.ease as string);
}

/**
 * The foreground's clock. An exit reverses `zoom`, so it reads THAT row's exit reader —
 * BK #26's law that a register binds the exit reader of its own entering row, which is
 * what stops a recede outlasting the arrival it undoes.
 */
export function foregroundClockToken(row: RouteNavRow): string {
    const name = row.foreground ?? routeNav("zoom").foreground;
    return `--spring-${name}-${row.clock}`;
}

/** The world's clock, or `null` where no world moves. */
export function worldClockToken(row: RouteNavRow): string | null {
    return row.world ? `--spring-${row.world}-${row.clock}` : null;
}
