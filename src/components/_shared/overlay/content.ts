import { cn, type ClassValue } from "../class-names";
import { surfaceClass } from "../surface/resolve";
import type { DockPortalAttrs } from "./participation";

/**
 * ══ THE ONE OVERLAY REGISTER ══
 *
 * Three surfaces that are one register used to paint through three cascade
 * origins and six independent spellings of the literal `"floating"`. This is the
 * seam they collapse to.
 *
 * The ROLE is the register row, and it rides the EXISTING `data-reveal` axis —
 * nothing parallel is minted. A `hint` is an annotation (bezier, no mass, the
 * tight pad); a `menu` is an anchored materialization; a `panel` is a body that
 * arrives with weight. The three differ in exactly three declared values — pad,
 * corner, minimum measure — and `styles/glass/overlay-plate.css` states them
 * once, keyed off `.glass-overlay-plate` and the role attribute this writes.
 *
 * `data-material` and the content-level `data-surface` are GONE. The first keyed
 * a role-shadow grammar deleted at #86; the second was a per-component knob for
 * a decision the rung already owns.
 */
export type OverlayRole = "hint" | "menu" | "panel";

/**
 * Role → the motion register it binds. `panel` reads `overlay` because that row
 * IS the panel row (`--enter-overlay-*`, the `--spring-panel` arrival); the name
 * on the attribute is the register's, the name in the API is the surface's.
 */
const ROLE_REVEAL: Record<OverlayRole, "tooltip" | "menu" | "overlay"> = {
    hint: "tooltip",
    menu: "menu",
    panel: "overlay",
};

export interface OverlayAttrs extends DockPortalAttrs {
    class: string;
    "data-slot": string;
    "data-reveal": "tooltip" | "menu" | "overlay";
}

/**
 * Every attribute a portalled overlay root carries, from one place.
 *
 * Composes `surfaceClass()` — the plain resolver, never a `useSurface()`: the
 * attrs half would ship with exactly one consumer, which is this function.
 */
export function overlayContentAttrs(o: {
    role: OverlayRole;
    slot: string;
    /** The stamp pair from `useDockParticipation()`. Absent outside a dock. */
    dock?: DockPortalAttrs;
    /** Consumer classes, merged last so a consumer still wins. */
    class?: ClassValue;
}): OverlayAttrs {
    return {
        class: cn(
            surfaceClass("floating"),
            "glass-overlay-plate glass-reveal",
            o.class,
        ),
        "data-slot": o.slot,
        "data-reveal": ROLE_REVEAL[o.role],
        ...o.dock,
    };
}
