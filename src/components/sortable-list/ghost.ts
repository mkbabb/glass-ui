/**
 * The drag ghost — the lifted row, promoted from cell to floating glass plate.
 *
 * TWO ELEMENTS, TWO JOBS, AND THAT IS WHY THERE IS NO TIMER HERE. The outer plate
 * owns the FOLLOW channel: one `translate3d`, never transitioned, so the plate stays
 * welded to the finger (MOTION-CANON §4:334). The inner clone owns the PROMOTION
 * channel: scale and tilt, transitioned on the press curve. Writing both on one
 * element would force the follow to share the promotion's transition — the lag the
 * canon forbids — or force a timer to strip the transition mid-gesture.
 *
 * THE CLONE IS TAKEN BEFORE THE SOURCE IS MARKED. The 7.0.0 ghost was stamped
 * `.is-sortable-dragging` on the source and THEN cloned, so the clone inherited the
 * source's own 0.35 fade at equal specificity and the whole authored lift kit painted
 * at 35% — invisible, and structurally so. Order is the fix; nothing else was needed.
 *
 * The corner is AUTHORED, not hunted: the plate's radius is a role token, so the
 * 26-line `getComputedStyle` descendant walk that used to guess it is gone.
 */

import { tiltFor } from "./motion";

export interface Ghost {
    /** The plate element, for measurement at release. */
    readonly plate: HTMLElement;
    /** Move the plate to a viewport position (its top-left). Compositor only. */
    follow: (x: number, y: number) => void;
    /** Re-derive the tilt from the live horizontal velocity. */
    tilt: (velocityX: number) => void;
    /** Current top-left, as last written. */
    position: () => { x: number; y: number };
    /** Release the promotion (radius, frost, swell) — the landing half of the flight. */
    land: () => void;
    /** Remove the plate from the document. */
    destroy: () => void;
}

/**
 * Build the ghost from a source row. `rect` is the source's resting box, measured by
 * the caller BEFORE any state is written to the DOM.
 */
export function createGhost(source: HTMLElement, rect: DOMRect): Ghost {
    const clone = source.cloneNode(true) as HTMLElement;
    // Strip ids so subtree queries on the page cannot double-match the original.
    if (clone.id) clone.removeAttribute("id");
    for (const el of clone.querySelectorAll<HTMLElement>("[id]")) el.removeAttribute("id");
    clone.removeAttribute("data-sortable-id");
    clone.classList.add("sortable-ghost__row");

    const plate = document.createElement("div");
    plate.className = "sortable-ghost";
    plate.setAttribute("aria-hidden", "true");
    // The measured box is written inline because it IS a measurement — authoring it in
    // the stylesheet would be a second, guessed source for the same number.
    plate.style.position = "fixed";
    plate.style.insetBlockStart = "0";
    plate.style.insetInlineStart = "0";
    plate.style.inlineSize = `${rect.width}px`;
    plate.style.blockSize = `${rect.height}px`;
    plate.appendChild(clone);

    let x = rect.left;
    let y = rect.top;

    // The two channels never share a property: the plate writes `transform`, the row
    // writes `rotate`, and the SWELL is a stylesheet `scale` keyed off `[data-lift]`.
    // Three writers, three properties, no composition order to get wrong.
    const writePlate = (): void => {
        plate.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    writePlate();
    clone.style.rotate = "0deg";
    document.body.appendChild(plate);

    // The promotion runs on the NEXT frame so the transition has a start value to
    // travel from — a class added in the same frame as the element is an initial
    // value, not a transition.
    requestAnimationFrame(() => {
        if (!plate.isConnected) return;
        plate.classList.add("glass-floating");
        plate.dataset.lift = "";
    });

    return {
        plate,
        follow: (nextX, nextY) => {
            x = nextX;
            y = nextY;
            writePlate();
        },
        tilt: (velocityX) => {
            clone.style.rotate = `${tiltFor(velocityX)}deg`;
        },
        position: () => ({ x, y }),
        land: () => {
            clone.style.rotate = "0deg";
            delete plate.dataset.lift;
            plate.classList.remove("glass-floating");
        },
        destroy: () => {
            plate.remove();
        },
    };
}
