/**
 * useSortable — pointer-capture drag-reorder for Vue lists.
 *
 * Headless composable that owns all pointer handling, drop-target resolution,
 * splice math, AND a DOM-clone drag ghost. Consumers spread the returned per-item
 * binding on each row; the composable handles everything else. No `#preview` slot
 * required — the ghost is a cloned snapshot of the row the user grabbed, so it
 * always looks exactly like what's being dragged regardless of the row's markup.
 *
 * Why pointer events (not HTML5 DnD): HTML5 DnD is flaky inside reactive rendering
 * loops, doesn't respect `user-select: none` ancestors, and can't render a
 * non-ghost drag preview without fighting the browser. Pointer capture gives us
 * direct control over the entire drag lifecycle and composes cleanly with other
 * pointer-driven UI (canvas editors, pan/zoom, hover popovers).
 *
 * Cross-list drops via `group`: two or more SortableList instances that share a
 * group id accept items from each other. On drag move, the composable hit-tests
 * the sibling instance registry; when the cursor crosses into a sibling instance,
 * the drop target transfers to that instance. On drop into a foreign group, the
 * source's `onReorder` emits the removal and the target's `onInsert` receives the
 * item + insertion index.
 *
 * This module is the thin orchestrator. It composes five cohesive services:
 *   - dragController   — the drag-state lifecycle + cross-list routing
 *   - dropResolver     — pure collision/measure math + the instance registry
 *   - ghostRenderer    — the snap-physics + visual clone
 *   - touchGate        — the handle constraint + pointer-capture optimization
 *   - transitionTiming — the drop-target class grammar
 */

import { computed, onScopeDispose, shallowRef } from "vue";

import type {
    InstanceHandle,
    SortableContainerBinding,
    SortableId,
    SortableOptions,
    SortableRowBinding,
    UseSortableReturn,
} from "./types";
import { instances } from "./dropResolver";
import { createGhostRenderer, isNonZeroRadius } from "./ghostRenderer";
import { targetIsHandle } from "./touchGate";
import { computeDropClasses } from "./transitionTiming";
import { createDragController } from "./dragController";

const DEFAULT_HANDLE_SELECTOR = "[data-sortable-handle]";

export function useSortable<T>(options: SortableOptions<T>): UseSortableReturn {
    const {
        items,
        getId,
        onReorder,
        onInsert,
        group,
        handleSelector = DEFAULT_HANDLE_SELECTOR,
        axis = "y",
    } = options;

    // Per-id element cache + binding cache for stable v-bind identity.
    const elements = new Map<SortableId, Element | null>();
    const bindings = new Map<SortableId, SortableRowBinding>();

    // Container reference used for hit-testing cross-list drops.
    let containerEl: Element | null = null;

    // External drop index — set by a sibling instance when it's dragging an item
    // over this list. Drives drop-target highlighting on this instance's rows
    // during a foreign drag.
    const _externalDropIndex = shallowRef<number | null>(null);

    function getItemsArray(): readonly T[] {
        return items.value;
    }

    function findIndexById(id: SortableId): number {
        const list = getItemsArray();
        for (let i = 0; i < list.length; i++) {
            if (getId(list[i]!) === id) return i;
        }
        return -1;
    }

    // Register this instance in the module-level set for cross-list lookups. The
    // controller references this handle for foreign-target routing.
    const handle: InstanceHandle = {
        group,
        getContainer: () => containerEl,
        getItems: () => items.value as readonly unknown[],
        getId: (item) => getId(item as T),
        getElements: () => elements,
        setExternalDropIndex: (index) => {
            _externalDropIndex.value = index;
        },
        acceptExternal: (index, item) => {
            if (!onInsert) return;
            onInsert(index, item);
        },
        getExternalDropIndex: () => _externalDropIndex.value,
    };

    const ghost = createGhostRenderer();
    const controller = createDragController({
        getItems: () => items.value as readonly unknown[],
        getId: (item) => getId(item as T),
        elements,
        handle,
        onReorder: (next) => onReorder(next as T[]),
        horizontal: axis === "x",
        ghost,
    });

    function registerItem(id: SortableId): SortableRowBinding {
        const cached = bindings.get(id);
        if (cached) return cached;

        const setEl = (el: Element | null) => {
            if (el === null) {
                elements.delete(id);
            } else {
                elements.set(id, el);
            }
        };

        const classComputed = computed<Record<string, boolean>>(() =>
            computeDropClasses({
                rowIndex: findIndexById(id),
                listLength: getItemsArray().length,
                localDrop: controller.dropIndex.value,
                isLocalDragging: controller.dragId.value !== null,
                externalDrop: _externalDropIndex.value,
            }),
        );

        const binding: SortableRowBinding = {
            ref: setEl,
            dataAttrs: { "data-sortable-id": String(id) },
            class: classComputed,
            onPointerdown: (e: PointerEvent) => {
                if (e.button !== 0) return;
                if (!targetIsHandle(e.target, handleSelector)) return;
                e.preventDefault();
                controller.beginDrag(id, e);
            },
        };

        bindings.set(id, binding);
        return binding;
    }

    const container: SortableContainerBinding = {
        ref: (el) => {
            containerEl = el;
        },
        dataAttrs: {
            "data-sortable-container": group ?? "",
        },
    };

    instances.add(handle);
    onScopeDispose(() => {
        instances.delete(handle);
        // Defensive cleanup if the scope is torn down mid-drag.
        controller.endDrag();
    });

    return {
        registerItem,
        container,
        isDragging: computed(() => controller.dragId.value !== null),
        dragId: computed(() => controller.dragId.value),
        dragPosition: computed(() => controller.pos.value),
        dropIndex: computed(() => controller.dropIndex.value),
        pointerCaptureActive: computed(() => controller.pointerCaptureActive.value),
    };
}

// `isNonZeroRadius` stays a standalone exported util — the D9 drag-ring regression
// test imports it from this module path.
export { isNonZeroRadius };

// Re-export the public contract types unchanged — the same set the pre-split
// module exported (`SortableId`, `SortableContainerBinding`, `UseSortableReturn`).
export type { SortableId, SortableContainerBinding, UseSortableReturn } from "./types";
