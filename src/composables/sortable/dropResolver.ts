/**
 * Sortable drop resolution — pure collision/measure math over the elements map.
 *
 * No DOM mutation: these read row bounding rects and resolve an insertion index.
 * Walking registered row elements via the elements map (rather than subscribing
 * to each row's box reactively) keeps the cost at O(rows) per pointermove frame
 * and avoids a layout-thrash storm.
 *
 * The module-level instance registry lives here too — it is the cross-list
 * resolution home: `findForeignTarget` hit-tests sibling instances in the same
 * group, unifying the local-drop vs foreign-drop index math behind one resolver.
 */

import type { InstanceHandle, SortableId } from "./types";

/**
 * Every live `useSortable` instance registers here for cross-list lookups. On
 * drag move, the source instance looks up any other instance in the same group
 * whose container contains the cursor, and transfers the drop target to it.
 * Entries are removed on scope dispose.
 */
export const instances = new Set<InstanceHandle>();

/**
 * Resolve an insertion index by walking the registered row elements and finding
 * the first row whose axis midpoint is past the cursor. Returns `list.length`
 * (drop at end) when the cursor is past every row.
 */
export function resolveDropIndexIn(
    elMap: Map<SortableId, Element | null>,
    list: readonly { id: SortableId }[],
    clientX: number,
    clientY: number,
    horizontal: boolean,
): number {
    const cursor = horizontal ? clientX : clientY;
    for (let i = 0; i < list.length; i++) {
        const el = elMap.get(list[i]!.id);
        if (!el) continue;
        const rect = (el as HTMLElement).getBoundingClientRect();
        const mid = horizontal
            ? rect.left + rect.width / 2
            : rect.top + rect.height / 2;
        if (cursor < mid) return i;
    }
    return list.length;
}

/**
 * Find a sibling instance in the same group whose container bounds contain the
 * cursor — the foreign drop target. Returns null when the source has no group or
 * the cursor is over no sibling.
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
