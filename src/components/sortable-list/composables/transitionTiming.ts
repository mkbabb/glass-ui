/**
 * Sortable visual-transition timing — the drop-target class grammar.
 *
 * Owns the drop-hint class names and the single-row insertion-line resolution:
 * exactly ONE class at most per row (never both), so the user sees one insertion
 * line instead of a doubled pair at adjacent edges. The drag-state controller
 * drives these; the row binding reflects them as a reactive class object.
 */

import type { SortableId } from "./types";

export const DROP_ABOVE_CLASS = "is-sortable-drop-above";
export const DROP_BELOW_CLASS = "is-sortable-drop-below";
export const DRAG_GHOST_CLASS = "sortable-drag-ghost";
export const SOURCE_DRAGGING_CLASS = "is-sortable-dragging";

/**
 * Drop-target class flags for a single row under a given drop index. ONE class at
 * most — never both — so the user sees exactly one insertion line.
 *
 * Insertion-line convention:
 *   drop === 0           → top of row 0 (DROP_ABOVE on row 0)
 *   drop === k (middle)  → top of row k (DROP_ABOVE on row k)
 *   drop === length      → bottom of last row (DROP_BELOW on last)
 *
 * Two rows adjacent to the insertion line sharing the line visually equals one
 * drawn border (not two) — picking a single row eliminates the prior "doubled
 * and wrong" appearance.
 *
 * `rowIndex` is the row's current index in the list; pass `< 0` (not found) to
 * receive the all-false result.
 */
export function flagsFor(
    rowIndex: number,
    drop: number,
    listLength: number,
): { above: boolean; below: boolean } {
    if (rowIndex < 0) return { above: false, below: false };
    if (drop === listLength) {
        return { above: false, below: rowIndex === listLength - 1 };
    }
    return { above: rowIndex === drop, below: false };
}

/**
 * Compose the reactive drop-target class object for a row from the live local +
 * external drop indices. Local and external are mutually exclusive in practice —
 * either this instance owns the drag or a sibling does — but both are honored so a
 * stale value can never double-paint.
 */
export function computeDropClasses(args: {
    rowIndex: number;
    listLength: number;
    /** Local same-list drop index, or null when this instance is not dragging. */
    localDrop: number | null;
    /** True while this instance owns an active drag. */
    isLocalDragging: boolean;
    /** External (foreign-source) drop index set via the registry, or null. */
    externalDrop: number | null;
}): Record<string, boolean> {
    const result: Record<string, boolean> = {
        [DROP_ABOVE_CLASS]: false,
        [DROP_BELOW_CLASS]: false,
    };
    if (args.isLocalDragging && args.localDrop !== null) {
        const flags = flagsFor(args.rowIndex, args.localDrop, args.listLength);
        if (flags.above) result[DROP_ABOVE_CLASS] = true;
        if (flags.below) result[DROP_BELOW_CLASS] = true;
    }
    if (args.externalDrop !== null && !args.isLocalDragging) {
        const flags = flagsFor(args.rowIndex, args.externalDrop, args.listLength);
        if (flags.above) result[DROP_ABOVE_CLASS] = true;
        if (flags.below) result[DROP_BELOW_CLASS] = true;
    }
    return result;
}

// `SortableId` is re-exported for callers that compose the timing helpers without
// reaching back into the controller module.
export type { SortableId };
