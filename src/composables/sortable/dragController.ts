/**
 * Sortable drag-state controller — the drag lifecycle + cross-list routing.
 *
 * Owns the live drag state (`dragId` / `pos` / `dropIndex` / `pointerCaptureActive`)
 * and the `beginDrag` → `onPointerMove` → `onPointerUp` → `endDrag` lifecycle. It
 * composes the leaf services: the ghost renderer (visual clone), the drop resolver
 * (collision/measure + cross-list lookup), and the touch gate (handle constraint +
 * pointer-capture optimization). Same-list reorders and foreign-list transfers are
 * both routed here through the unified resolver.
 */

import { shallowRef, type ShallowRef } from "vue";

import type { InstanceHandle, SortableId } from "./types";
import type { GhostRenderer } from "./ghostRenderer";
import { findForeignTarget, resolveDropIndexIn } from "./dropResolver";
import { acquirePointerCapture } from "./touchGate";
import { SOURCE_DRAGGING_CLASS } from "./transitionTiming";

export interface DragControllerDeps {
    /** Live items array accessor (the reactive source-of-truth). */
    getItems: () => readonly unknown[];
    getId: (item: unknown) => SortableId;
    /** Per-id element cache, shared with the row registry. */
    elements: Map<SortableId, Element | null>;
    /** This instance's registry handle (for cross-list lookups). */
    handle: InstanceHandle;
    onReorder: (next: unknown[]) => void;
    /** Horizontal-axis drop resolution (`axis === "x"`). */
    horizontal: boolean;
    ghost: GhostRenderer;
}

export interface DragController {
    /** Live id of the dragged row, or null. */
    dragId: ShallowRef<SortableId | null>;
    /** Live pointer position in page coordinates, or null. */
    pos: ShallowRef<{ x: number; y: number } | null>;
    /** Resolved local drop index, or null. */
    dropIndex: ShallowRef<number | null>;
    /** Whether the active drag holds a pointer capture. */
    pointerCaptureActive: ShallowRef<boolean>;
    /** Start a drag for the row `id` from the pointerdown event `e`. */
    beginDrag: (id: SortableId, e: PointerEvent) => void;
    /** Tear down an in-flight drag (also the defensive scope-dispose path). */
    endDrag: () => void;
}

export function createDragController(deps: DragControllerDeps): DragController {
    const { getItems, getId, elements, handle, onReorder, horizontal, ghost } = deps;

    const dragId = shallowRef<SortableId | null>(null);
    const pos = shallowRef<{ x: number; y: number } | null>(null);
    const dropIndex = shallowRef<number | null>(null);
    // Pointer-capture state for the active drag: `true` while a capture is held,
    // `false` once a drag began without one (the document listeners carry it).
    const pointerCaptureActive = shallowRef(true);

    // Foreign-drop target handle (null when the drop stays on this instance). Set
    // by `onPointerMove` when the cursor enters another instance in the same
    // group; consulted by `onPointerUp` to route the drop.
    let foreignTarget: InstanceHandle | null = null;
    // The original row the user grabbed. Restored on endDrag.
    let sourceEl: HTMLElement | null = null;

    function findIndexById(id: SortableId): number {
        const list = getItems();
        for (let i = 0; i < list.length; i++) {
            if (getId(list[i]) === id) return i;
        }
        return -1;
    }

    function resolveDropIndex(clientX: number, clientY: number): number {
        const list = getItems().map((item) => ({ id: getId(item) }));
        return resolveDropIndexIn(elements, list, clientX, clientY, horizontal);
    }

    function beginDrag(id: SortableId, e: PointerEvent): void {
        const src = elements.get(id);
        if (!(src instanceof HTMLElement)) return;

        dragId.value = id;
        pos.value = { x: e.clientX, y: e.clientY };
        dropIndex.value = findIndexById(id);
        pointerCaptureActive.value = true;
        foreignTarget = null;
        sourceEl = src;
        src.classList.add(SOURCE_DRAGGING_CLASS);

        ghost.createGhost(src, e.clientX, e.clientY);

        const host = e.currentTarget as Element | null;
        pointerCaptureActive.value = acquirePointerCapture(host, e.pointerId);

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
        document.addEventListener("pointercancel", onPointerUp);
    }

    function onPointerMove(e: PointerEvent): void {
        if (dragId.value === null) return;
        pos.value = { x: e.clientX, y: e.clientY };
        ghost.updateGhost(e.clientX, e.clientY);

        // Cross-list drop detection. If the cursor is over another instance in
        // the same group, hand drop-target resolution to that instance.
        // Otherwise resolve against our own rows.
        const foreign = findForeignTarget(handle, e.clientX, e.clientY);
        if (foreign) {
            if (foreignTarget && foreignTarget !== foreign) {
                foreignTarget.setExternalDropIndex(null);
            }
            foreignTarget = foreign;
            const list = foreign.getItems().map((item) => ({
                id: foreign.getId(item),
            }));
            const idx = resolveDropIndexIn(
                foreign.getElements(),
                list,
                e.clientX,
                e.clientY,
                horizontal,
            );
            foreign.setExternalDropIndex(idx);
            dropIndex.value = null;
        } else {
            if (foreignTarget) {
                foreignTarget.setExternalDropIndex(null);
                foreignTarget = null;
            }
            dropIndex.value = resolveDropIndex(e.clientX, e.clientY);
        }
    }

    function onPointerUp(_e: PointerEvent): void {
        const id = dragId.value;
        const foreign = foreignTarget;
        const dropLocal = dropIndex.value;

        endDrag();

        if (id === null) return;

        const list = getItems();
        const srcIndex = list.findIndex((item) => getId(item) === id);
        if (srcIndex < 0) return;

        if (foreign) {
            // Cross-list drop: remove from source, insert into the foreign
            // target. The target's external drop index was set in pointermove.
            const item = list[srcIndex];
            const next = list.slice();
            next.splice(srcIndex, 1);
            onReorder(next);
            const targetIndex = foreign.getExternalDropIndex?.() ?? null;
            foreign.setExternalDropIndex(null);
            foreign.acceptExternal(targetIndex ?? 0, item);
            return;
        }

        if (dropLocal === null) return;

        // Same-list reorder. Splice the item out + back in at the target index,
        // adjusting for the fact that removing the source shifts indices past it
        // down by one.
        let insertIndex = dropLocal;
        if (insertIndex > srcIndex) insertIndex -= 1;
        if (insertIndex === srcIndex) return;

        const next = list.slice();
        const [moved] = next.splice(srcIndex, 1);
        next.splice(insertIndex, 0, moved);
        onReorder(next);
    }

    function endDrag(): void {
        ghost.destroyGhost();
        if (sourceEl) {
            sourceEl.classList.remove(SOURCE_DRAGGING_CLASS);
            sourceEl = null;
        }
        if (foreignTarget) {
            foreignTarget.setExternalDropIndex(null);
            foreignTarget = null;
        }
        dragId.value = null;
        pos.value = null;
        dropIndex.value = null;
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerUp);
    }

    return { dragId, pos, dropIndex, pointerCaptureActive, beginDrag, endDrag };
}
