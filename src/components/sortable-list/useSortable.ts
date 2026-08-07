import { computed, nextTick, onScopeDispose, shallowRef } from "vue";

import { createDragController } from "./drag";
import { instances } from "./resolve";
import type {
    InstanceHandle,
    SortableContainerBinding,
    SortableId,
    SortableOptions,
    SortableRowBinding,
    UseSortableReturn,
} from "./types";

const DEFAULT_HANDLE_SELECTOR = "[data-sortable-handle]";

/**
 * THE GRIP TEST — ONE predicate, both input paths.
 *
 * The row's handlers are delegated on the `<li>`, so every pointerdown and every key
 * pressed anywhere inside the row arrives here, and the controller consumes Space and
 * Enter with `preventDefault()`. Before the fold, only `pointerdown` asked whether the
 * event started at the grip; `keydown` consumed unconditionally, so a nested `<input>`
 * inside a sortable row could not type a space and any nested `<button>` had its own
 * Space activation swallowed (the live victim was the aurora colour-stop row).
 *
 *   • a handle selector is declared → the grip is the handle, so only an event that
 *     starts at the handle drives the drag;
 *   • no handle selector (`null`, the documented drag-from-anywhere contract) → the
 *     ROW ITSELF is the grip, so the event must start on the row and not on a
 *     descendant that owns its own keys.
 *
 * The `null` branch takes nothing away that worked: with no handle and no author-set
 * `tabindex` the row is not focusable, so a row-targeted keydown could only ever have
 * arrived from a focusable DESCENDANT — which is the case this closes.
 */
function targetIsGrip(
    event: Pick<Event, "target" | "currentTarget">,
    handleSelector: string | null,
): boolean {
    if (handleSelector === null) return event.target === event.currentTarget;
    if (!(event.target instanceof Element)) return false;
    return event.target.closest(handleSelector) !== null;
}

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
    } = options;

    const elements = new Map<SortableId, Element | null>();
    const announcement = shallowRef("");
    let containerEl: Element | null = null;
    let externalIndex: number | null = null;
    let externalBlock: number | null = null;

    function getItemLabel(id: SortableId): string {
        const item = items.value.find((candidate) => getId(candidate) === id);
        return item === undefined ? String(id) : getLabel(item);
    }

    function focusItem(id: SortableId): void {
        void nextTick(() => {
            const row = elements.get(id);
            row?.querySelector<HTMLButtonElement>(DEFAULT_HANDLE_SELECTOR)?.focus();
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
            externalIndex = index;
            controller.partForExternal(externalIndex, externalBlock);
        },
        setExternalSubjectBlock: (block) => {
            externalBlock = block;
        },
        getVacancyOrigin: (index) => controller.vacancyOrigin(index),
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
        announce: (message) => {
            announcement.value = message;
        },
        focusItem,
    });

    /**
     * NO BINDING CACHE. The 7.0.0 map returned the first binding ever made for an id
     * and never evicted it, so a remounted row kept the DEAD `isDisabled` getter — a
     * row could paint `aria-disabled="true"` while its button was enabled — and the map
     * grew without bound for the life of the instance. Each registration is fresh, and
     * `release()` (called from the row's unmount) is the eviction the map never had.
     */
    function registerItem(
        id: SortableId,
        isDisabled: () => boolean = () => false,
    ): SortableRowBinding {
        const disabled = computed(isDisabled);
        return {
            ref: (element) => {
                if (element instanceof Element) elements.set(id, element);
                else elements.delete(id);
            },
            dataAttrs: { "data-sortable-id": String(id) },
            disabled,
            onPointerdown: (event) => {
                if (disabled.value || event.button !== 0) return;
                if (!targetIsGrip(event, handleSelector)) return;
                controller.beginPointer(id, event);
            },
            onKeydown: (event) => {
                if (disabled.value) return;
                if (!targetIsGrip(event, handleSelector)) return;
                controller.onKeydown(id, event);
            },
            release: () => {
                elements.delete(id);
            },
        };
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
        dropIndex: computed(() => controller.dropIndex.value),
        announcement: computed(() => announcement.value),
        getItemLabel,
    };
}

export type { SortableId, SortableContainerBinding, UseSortableReturn } from "./types";
