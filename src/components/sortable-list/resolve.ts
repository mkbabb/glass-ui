/**
 * Sortable drop resolution — pure collision math over a rect cache taken at LIFT.
 *
 * THE CACHE IS NOT AN OPTIMISATION, IT IS THE CORRECTNESS FIX (E4). The parting
 * animation writes `transform` on the very rows the midpoint scan reads, and
 * `getBoundingClientRect()` reports the TRANSFORMED box — so a live per-frame scan
 * resolves against geometry the previous frame's resolution produced. That loop
 * oscillates at the boundary between two rows. Rows are snapshotted ONCE at lift, in
 * their RESTING layout, and every frame resolves against that snapshot: one input,
 * one output, no feedback path. The O(rows) walk stays O(rows) and stops touching
 * layout mid-gesture.
 *
 * A scroll or a resize during a drag invalidates the snapshot, so both re-take it.
 */

import type { InstanceHandle, SortableId } from "./types";

/**
 * Every live `useSortable` instance registers here for cross-list lookups. On drag
 * move, the source instance looks up any other instance in the same group whose
 * container contains the cursor, and transfers the drop target to it. Entries are
 * removed on scope dispose.
 */
export const instances = new Set<InstanceHandle>();

/**
 * One row's resting geometry. The ORIGIN is stored, never the midpoint: the scan wants
 * a midpoint and the release flight wants a landing corner, and two stored numbers for
 * one measurement is how they drift apart. The midpoint is derived where it is used.
 */
export interface RowRect {
    readonly id: SortableId;
    readonly top: number;
    readonly left: number;
    readonly block: number;
}

/** The resting snapshot of one list, plus the container box the cursor is tested against. */
export interface ListRects {
    readonly rows: readonly RowRect[];
    /** Distance between consecutive row starts — the block size a vacancy opens by. */
    readonly pitch: number;
}

/**
 * Snapshot a list's resting row geometry. Rows already carrying a parting transform
 * are read through it (`offsetTop`-free): the caller takes the snapshot before any
 * transform is written, which is what `lift` does.
 */
export function snapshotRows(
    elements: Map<SortableId, Element | null>,
    order: readonly SortableId[],
): ListRects {
    const rows: RowRect[] = [];
    let previousStart: number | null = null;
    let pitch = 0;
    for (const id of order) {
        const el = elements.get(id);
        if (!(el instanceof HTMLElement)) continue;
        const rect = el.getBoundingClientRect();
        rows.push({ id, top: rect.top, left: rect.left, block: rect.height });
        if (previousStart !== null) pitch = Math.max(pitch, rect.top - previousStart);
        previousStart = rect.top;
    }
    // A single-row list has no measurable pitch; its own block IS the vacancy size.
    if (pitch === 0 && rows.length > 0) pitch = rows[0]!.block;
    return { rows, pitch };
}

/**
 * Resolve an insertion BOUNDARY (0…rows.length) by walking the resting snapshot for
 * the first row whose midpoint is past the cursor.
 */
export function resolveBoundary(rects: ListRects, clientY: number): number {
    for (let i = 0; i < rects.rows.length; i++) {
        const row = rects.rows[i]!;
        if (clientY < row.top + row.block / 2) return i;
    }
    return rects.rows.length;
}

/**
 * Find a sibling instance in the same group whose container bounds contain the
 * cursor — the foreign drop target. Returns null when the source has no group or the
 * cursor is over no sibling.
 */
export function findForeignTarget(
    sourceHandle: InstanceHandle,
    clientX: number,
    clientY: number,
): InstanceHandle | null {
    if (!sourceHandle.group) return null;
    for (const inst of instances) {
        if (inst === sourceHandle) continue;
        if (inst.group !== sourceHandle.group) continue;
        const container = inst.getContainer();
        if (!container) continue;
        const rect = (container as HTMLElement).getBoundingClientRect();
        if (
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
        ) {
            return inst;
        }
    }
    return null;
}
