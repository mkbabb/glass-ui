/**
 * Sortable drag ghost — the snap-physics + visual clone of the grabbed row.
 *
 * The ghost is a fixed-position DOM clone of the source row, positioned under the
 * grab point so it tracks the cursor rather than teleporting. The clone inherits
 * scoped `data-v-*` attributes + classes so stylesheet selectors continue to
 * match, giving a pixel-faithful preview without any per-consumer markup.
 *
 * `createGhostRenderer()` returns the stateful trio (`createGhost` / `updateGhost`
 * / `destroyGhost`) closing over the live ghost element + its cursor offset.
 */

import { DRAG_GHOST_CLASS } from "./transitionTiming";

/**
 * True when a computed `border-radius` string has any non-zero corner. Computed
 * values resolve to space-separated lengths (e.g. `"0px"`, `"6px"`, `"12px 12px
 * 0px 0px"`) with an optional `/` separating the horizontal/vertical radii of
 * elliptical corners. A radius is "zero" only when every numeric component parses
 * to 0; a non-length token (`%`, `auto`) counts as non-zero so we never miss a
 * rounded corner.
 *
 * Exported (and re-exported from `useSortable`) for the D9 drag-ring regression
 * test — keep it a pure string predicate.
 */
export function isNonZeroRadius(radius: string): boolean {
    if (!radius) return false;
    return radius
        .replace(/\//g, " ")
        .split(/\s+/)
        .filter(Boolean)
        .some((part) => parseFloat(part) !== 0);
}

/**
 * Resolve the effective VISIBLE corner radius for the dragged content. Returns
 * the source's own computed `border-radius` when it is non-zero; otherwise walks
 * descendants depth-first and returns the first element's non-zero radius (the
 * common case where the SortableItem root is unrounded and the rounded surface
 * lives on an inner child). Returns `null` when nothing in the subtree is rounded
 * — caller leaves the ghost radius untouched.
 */
export function resolveVisibleRadius(source: HTMLElement): string | null {
    const own = getComputedStyle(source).borderRadius;
    if (isNonZeroRadius(own)) return own;
    for (const el of source.querySelectorAll<HTMLElement>("*")) {
        const r = getComputedStyle(el).borderRadius;
        if (isNonZeroRadius(r)) return r;
    }
    return null;
}

export interface GhostRenderer {
    /**
     * Build the drag ghost by cloning the source row's DOM and positioning a
     * fixed copy at its current bounding rect.
     */
    createGhost: (source: HTMLElement, clientX: number, clientY: number) => void;
    /** Track the ghost under the cursor at its captured grab offset. */
    updateGhost: (clientX: number, clientY: number) => void;
    /** Remove the ghost from the document. */
    destroyGhost: () => void;
}

export function createGhostRenderer(): GhostRenderer {
    let ghostEl: HTMLElement | null = null;
    // Offset from cursor to the source element's top-left, so the ghost tracks
    // under the grab point rather than teleporting to the cursor.
    let ghostOffsetX = 0;
    let ghostOffsetY = 0;

    function createGhost(source: HTMLElement, clientX: number, clientY: number): void {
        const rect = source.getBoundingClientRect();
        ghostOffsetX = clientX - rect.left;
        ghostOffsetY = clientY - rect.top;

        const clone = source.cloneNode(true) as HTMLElement;
        clone.classList.add(DRAG_GHOST_CLASS);
        // Adopt the dragged content's effective VISIBLE corner radius onto the
        // ghost root so the gold drag ring (a `0 0 0 2px` box-shadow on the ghost
        // root — see SortableList.vue) traces the real corner. The SortableItem
        // root often has `border-radius: 0` while the rounded surface lives on an
        // inner child; without this the ring renders square around a rounded card.
        // Read the source's own radius first; if all-zero, walk descendants
        // depth-first for the first non-zero radius. Set it inline so nothing in
        // the cascade overrides it on the floating clone.
        const adoptedRadius = resolveVisibleRadius(source);
        if (adoptedRadius) clone.style.borderRadius = adoptedRadius;
        clone.style.position = "fixed";
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.margin = "0";
        clone.style.pointerEvents = "none";
        clone.style.zIndex = "9999";
        // Drop any id attributes on the clone so subtree query selectors don't
        // double-match the original.
        if (clone.id) clone.removeAttribute("id");
        for (const el of clone.querySelectorAll<HTMLElement>("[id]")) {
            el.removeAttribute("id");
        }
        document.body.appendChild(clone);
        ghostEl = clone;
    }

    function updateGhost(clientX: number, clientY: number): void {
        if (!ghostEl) return;
        ghostEl.style.left = `${clientX - ghostOffsetX}px`;
        ghostEl.style.top = `${clientY - ghostOffsetY}px`;
    }

    function destroyGhost(): void {
        if (ghostEl && ghostEl.parentNode) {
            ghostEl.parentNode.removeChild(ghostEl);
        }
        ghostEl = null;
    }

    return { createGhost, updateGhost, destroyGhost };
}
