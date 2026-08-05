import { computed, nextTick, onScopeDispose, shallowRef } from "vue";

import { createDragController } from "./dragController";
import { instances } from "./dropResolver";
import { createGhostRenderer, isNonZeroRadius } from "./ghostRenderer";
import { eventTargetIsGrip, targetIsHandle } from "./touchGate";
import { computeDropClasses } from "./transitionTiming";
import type {
    InstanceHandle,
    SortableContainerBinding,
    SortableId,
    SortableOptions,
    SortableRowBinding,
    UseSortableReturn,
} from "./types";

const DEFAULT_HANDLE_SELECTOR = "[data-sortable-handle]";

export function useSortable<T>(options: SortableOptions<T>): UseSortableReturn {
    const {
        items,
        getId,
        getLabel = (item) => String(getId(item)),
        label = "Sortable list",
        onReorder,
        onInsert,
        group,
        handleSelector = DEFAULT_HANDLE_SELECTOR,
        axis = "y",
    } = options;

    const elements = new Map<SortableId, Element | null>();
    const bindings = new Map<SortableId, SortableRowBinding>();
    const externalDropIndex = shallowRef<number | null>(null);
    const announcement = shallowRef("");
    let containerEl: Element | null = null;

    function findIndex(id: SortableId): number {
        return items.value.findIndex((item) => getId(item) === id);
    }

    function getItemLabel(id: SortableId): string {
        const item = items.value.find((candidate) => getId(candidate) === id);
        return item === undefined ? String(id) : getLabel(item);
    }

    function focusItem(id: SortableId): void {
        void nextTick(() => {
            const row = elements.get(id);
            row?.querySelector<HTMLButtonElement>("[data-sortable-handle]")?.focus();
        });
    }

    const handle: InstanceHandle = {
        group,
        label,
        getContainer: () => containerEl,
        getItems: () => items.value as readonly unknown[],
        getId: (item) => getId(item as T),
        getElements: () => elements,
        setExternalDropIndex: (index) => {
            externalDropIndex.value = index;
        },
        acceptExternal: (index, item) => onInsert?.(index, item),
        focusItem,
    };

    const controller = createDragController({
        getItems: () => items.value as readonly unknown[],
        getId: (item) => getId(item as T),
        getLabel: (item) => getLabel(item as T),
        elements,
        handle,
        onReorder: (next) => onReorder(next as T[]),
        horizontal: axis === "x",
        ghost: createGhostRenderer(),
        announce: (message) => {
            announcement.value = message;
        },
        focusItem,
    });

    function registerItem(
        id: SortableId,
        isDisabled: () => boolean = () => false,
    ): SortableRowBinding {
        const cached = bindings.get(id);
        if (cached) return cached;

        const disabled = computed(isDisabled);
        const binding: SortableRowBinding = {
            ref: (element) => {
                if (element instanceof Element) elements.set(id, element);
                else elements.delete(id);
            },
            dataAttrs: { "data-sortable-id": String(id) },
            disabled,
            class: computed(() => {
                const sourceIndex = controller.dragId.value === null
                    ? -1
                    : findIndex(controller.dragId.value);
                const finalIndex = controller.dropIndex.value;
                const localBoundary = finalIndex === null || sourceIndex < 0
                    ? null
                    : finalIndex > sourceIndex
                      ? finalIndex + 1
                      : finalIndex;
                return computeDropClasses({
                    rowIndex: findIndex(id),
                    listLength: items.value.length,
                    localDrop: localBoundary,
                    isLocalDragging: controller.dragId.value !== null,
                    externalDrop: externalDropIndex.value,
                });
            }),
            onPointerdown: (event) => {
                if (disabled.value || event.button !== 0) return;
                if (!targetIsHandle(event.target, handleSelector)) return;
                controller.beginPointer(id, event);
            },
            onKeydown: (event) => {
                if (disabled.value) return;
                // The SAME grip constraint the pointer path enforces one branch up
                // (G-KEY-SCOPE) — a delegated row handler may not consume a key that
                // belongs to the control the key was pressed in.
                if (!eventTargetIsGrip(event, handleSelector)) return;
                controller.onKeydown(id, event);
            },
        };

        bindings.set(id, binding);
        return binding;
    }

    const container: SortableContainerBinding = {
        ref: (element) => {
            containerEl = element instanceof Element ? element : null;
        },
        dataAttrs: { "data-sortable-container": group ?? "" },
    };

    instances.add(handle);
    onScopeDispose(() => {
        instances.delete(handle);
        controller.dispose();
    });

    return {
        registerItem,
        container,
        isDragging: computed(() => controller.dragId.value !== null),
        dragId: computed(() => controller.dragId.value),
        dragPosition: computed(() => controller.pos.value),
        dropIndex: computed(() => controller.dropIndex.value),
        pointerCaptureActive: computed(() => controller.pointerCaptureActive.value),
        announcement: computed(() => announcement.value),
        getItemLabel,
    };
}

export type { SortableId, SortableContainerBinding, UseSortableReturn } from "./types";
