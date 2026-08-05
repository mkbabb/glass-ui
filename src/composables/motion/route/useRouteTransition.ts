// routeTransition — the typed route grammar's ONE mutation owner.
//
// `startViewTransition` is the substrate; this is the grammar on top of it. It does the
// two things the substrate deliberately refuses to do (`useViewTransition.ts` header:
// "does NOT manage `view-transition-name` assignment") and that a ROUTE change cannot do
// without: it names the ONE element that participates, and it types the transition so the
// paired CSS can fork a curve per nav class.
//
// WINDOW-NOT-CAROUSEL IS ENFORCED HERE, NOT DOCUMENTED HERE. EXEMPLARS-CODEX I4b measures
// the exemplar's restraint literally — "the neighbours do not move; no scatter, no
// push-aside, no global dim … only the tapped cell participates" — and the View
// Transitions runtime turns that into a hard requirement anyway: two elements sharing one
// `view-transition-name` in a single state skip the whole transition SILENTLY. So the
// helper holds at most one window name and one label name at a time, clears both before
// it sets either, and clears them again on `finished` whatever the outcome. A caller
// cannot leak a name, and a caller cannot name two cells.
//
// THE LABEL IS ITS OWN NAME, AND THAT IS THE WHOLE OF "LABEL-DROPS-FIRST". I4 measures the
// tapped icon inhaling "its label already gone". A label inside the window's snapshot
// cannot leave before the window it is painted into, so the label is lifted into its own
// named element and given the inhale's own clock — by the time the inhale beat ends the
// label is gone, and the window flies without it. One extra name, no rank arithmetic, and
// no `--motion-beat` quantum minted for one consumer.
//
// ROUTER-AGNOSTIC BY CONSTRUCTION. No `vue`, no `vue-router`, no `@vueuse/core` — the
// mutation is a callback, the destination is resolved by a callback, so this ships on the
// engine-free `motion-core` subpath beside the substrate it wraps.

import { startViewTransition } from "../core/useViewTransition";
import type { RouteNavClass } from "./routeGrammar";

/** The name the travelling window carries. One per document state, always. */
export const ROUTE_WINDOW_NAME = "gl-route-window";
/** The name the window's own label carries, so it can leave before the window does. */
export const ROUTE_LABEL_NAME = "gl-route-label";
/** The attribute a destination marks its window with, read after the mutation. */
export const ROUTE_WINDOW_ATTR = "data-route-window";
/** The attribute a source marks its label with, read before the mutation. */
export const ROUTE_LABEL_ATTR = "data-route-label";
/** The root property the `lateral` class reads its push direction from. */
export const ROUTE_DIRECTION_PROP = "--route-direction";

export interface RouteTransitionOptions {
    /** Which grammar class this navigation is. */
    nav: RouteNavClass;
    /** The DOM mutation — typically an awaited router push plus a render tick. */
    mutate: () => void | Promise<void>;
    /**
     * The tapped element. Named `gl-route-window` for the OLD state; its
     * `[data-route-label]` descendant, if any, is named `gl-route-label`.
     */
    source?: HTMLElement | null;
    /**
     * Resolves the destination's window AFTER `mutate` settles, still inside the update
     * callback — the last moment before the new state is snapshotted.
     */
    target?: () => HTMLElement | null;
    /** `lateral` only: +1 forward, −1 back, 0 unknown (the push degrades to a fade). */
    direction?: number;
}

/** Everything this helper wrote, so the cleanup is a list rather than a guess. */
interface NamedElement {
    readonly el: HTMLElement;
    readonly previous: string;
}

// `viewTransitionName` is absent from older DOM typings, so every read/write goes
// through the property API — which is also the only form that survives a `style`
// attribute the engine has not yet reflected onto a typed accessor.
const VT_NAME_PROP = "view-transition-name";

function nameElement(el: HTMLElement | null | undefined, name: string): NamedElement[] {
    if (!el) return [];
    const previous = el.style.getPropertyValue(VT_NAME_PROP);
    el.style.setProperty(VT_NAME_PROP, name);
    return [{ el, previous }];
}

function labelOf(source: HTMLElement | null | undefined): HTMLElement | null {
    return source?.querySelector<HTMLElement>(`[${ROUTE_LABEL_ATTR}]`) ?? null;
}

/**
 * Run a route mutation under the typed grammar.
 *
 * @returns `{ finished }` — await it to route focus, per the substrate's a11y MANDATORY.
 *
 * @example
 *   await routeTransition({
 *       nav: "zoom",
 *       source: cardEl,
 *       target: () => document.querySelector("[data-route-window]"),
 *       mutate: async () => { await router.push(to); await nextTick(); },
 *   }).finished;
 */
export function routeTransition(options: RouteTransitionOptions): {
    finished: Promise<void>;
} {
    const { nav, mutate, source, target, direction } = options;

    const root =
        typeof document === "undefined" ? null : document.documentElement;
    // A stale name from an interrupted predecessor is the silent-skip case, so the sweep
    // runs unconditionally rather than only over what this call is about to write.
    sweepStaleNames();

    const named: NamedElement[] = [];
    let sourceNamed = false;
    if (nav !== "route") {
        const sourceMark = nameElement(source, ROUTE_WINDOW_NAME);
        sourceNamed = sourceMark.length > 0;
        named.push(...sourceMark);
        named.push(...nameElement(labelOf(source), ROUTE_LABEL_NAME));
    }
    if (root && direction !== undefined) {
        root.style.setProperty(ROUTE_DIRECTION_PROP, String(Math.sign(direction)));
    }

    const update = async (): Promise<void> => {
        await mutate();
        if (nav === "route") return;
        // A NAME IS ONLY WORTH WRITING IF IT COMPLETES A PAIR. The old state is already
        // captured, so `sourceNamed` is settled fact by now: if nothing in it carried the
        // window name there is no pair to complete, and a lone new half is not a
        // transition — it is an extra layer composited over the root pair under
        // `plus-lighter`, reaching α=1 on the handover clock while the root pair is still
        // conserving to 1. Declining leaves the class on the alpha-conserving root
        // cross-fade its own grammar row documents, which is the honest read of "nothing
        // was continuous between these two states".
        //
        // The mirror — a source that resolved and a destination that did not — is not
        // JS's to fix: the name is inside a snapshot the runtime already took. That half
        // is conserved in the sheet, by the `:only-child` forks in `view-transition.css`.
        if (!sourceNamed) return;
        // Naming the destination here hands the runtime a matched pair, which is what
        // makes the group interpolate a rect instead of cross-fading two unrelated
        // snapshots.
        named.push(...nameElement(target?.() ?? null, ROUTE_WINDOW_NAME));
    };

    const { finished } = startViewTransition(update, { types: [nav] });

    return {
        finished: finished.then(() => {
            for (const { el, previous } of named) {
                if (previous) el.style.setProperty(VT_NAME_PROP, previous);
                else el.style.removeProperty(VT_NAME_PROP);
            }
            root?.style.removeProperty(ROUTE_DIRECTION_PROP);
        }),
    };
}

/**
 * Clear any window/label name this helper may have left behind. An aborted transition
 * settles `finished` without running the caller's cleanup in every engine, and one
 * survivor is enough to skip the NEXT transition silently — the exact class of defect
 * that reads as "the animation just stopped working" and has no error to find.
 */
function sweepStaleNames(): void {
    if (typeof document === "undefined") return;
    const marked = document.querySelectorAll<HTMLElement>(
        `[style*="${VT_NAME_PROP}"]`,
    );
    for (const el of marked) {
        const name = el.style.getPropertyValue(VT_NAME_PROP);
        if (name === ROUTE_WINDOW_NAME || name === ROUTE_LABEL_NAME) {
            el.style.removeProperty(VT_NAME_PROP);
        }
    }
}
