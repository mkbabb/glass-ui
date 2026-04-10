/**
 * useSortable — pointer-capture drag-reorder for Vue lists.
 *
 * Headless composable: returns state + per-item registration
 * callbacks that a consumer (or the <SortableList> wrapper)
 * spreads on each row element. The composable owns all pointer
 * handling, drop-target resolution, and splice math; the consumer
 * owns the visual markup, the reactive data, and the `onReorder`
 * commit.
 *
 * Why pointer events (not HTML5 DnD): HTML5 DnD is flaky inside
 * reactive rendering loops, doesn't respect `user-select: none`
 * ancestors, and can't render a non-ghost drag preview without
 * fighting the browser. Pointer capture gives us direct control
 * over the entire drag lifecycle and composes cleanly with other
 * pointer-driven UI (canvas editors, pan/zoom, hover popovers).
 *
 * Drop resolution walks rendered rows via a data attribute rather
 * than subscribing to each row's bounding-box reactively — that
 * keeps the cost at O(rows) per pointermove frame and avoids a
 * layout thrash storm.
 *
 * Typical usage (via the <SortableList> wrapper):
 *
 *     <SortableList :items="rows" :get-id="(r) => r.id" @reorder="commit">
 *       <SortableItem v-for="row in rows" :key="row.id" :id="row.id">
 *         <SortableHandle class="my-grip">⋮⋮</SortableHandle>
 *         <span>{{ row.label }}</span>
 *       </SortableItem>
 *     </SortableList>
 *
 * Direct composable usage is also supported for consumers that
 * want raw control and don't need the component shell.
 */

import {
    computed,
    shallowRef,
    type ComputedRef,
    type Ref,
} from "vue";

/**
 * Identifier type for sortable rows. Must be stable across
 * reorders (e.g. a record id, not a positional index).
 */
export type SortableId = string | number;

export interface UseSortableOptions<T> {
    /** The reactive array being reordered. */
    items: Ref<readonly T[]> | ComputedRef<readonly T[]>;
    /**
     * Extract a stable id from an item. The id is used both as
     * the drop-target key (via `data-sortable-id`) and as the
     * row registration key. Two items with the same id in the
     * same list is undefined behavior.
     */
    getId: (item: T) => SortableId;
    /**
     * Called once per successful drop with the full reordered
     * array. The consumer is responsible for committing the new
     * order back to its source of truth (store, emit, etc).
     * Never mutates the input array.
     */
    onReorder: (next: T[]) => void;
    /**
     * Optional grip constraint. When set, drag only starts if
     * the pointerdown target is (or is a descendant of) an
     * element matching this selector. Defaults to
     * `[data-sortable-handle]` — the selector that
     * <SortableHandle> emits. Pass `null` to allow drag from
     * anywhere on the row.
     */
    handleSelector?: string | null;
    /**
     * Axis constraint for drop resolution. `"y"` uses row
     * midpoint Y (vertical list), `"x"` uses row midpoint X
     * (horizontal list). Default: `"y"`.
     */
    axis?: "x" | "y";
}

/**
 * Handlers + attrs to spread on a row element. `SortableList`
 * calls `registerItem(id)` once per row and forwards these via
 * a `v-bind` on the row's root.
 */
export interface SortableItemBinding {
    /**
     * Template ref callback. Spread on the row's root element
     * via `:ref="binding.ref"`.
     */
    ref: (el: Element | null) => void;
    /** Data attribute set — includes `data-sortable-id`. */
    dataAttrs: Record<string, string>;
    /**
     * Reactive class object — carries the drop-target hint
     * classes (`is-sortable-drop-above` / `-below`) when this
     * row is the live drop target during a drag.
     */
    class: ComputedRef<Record<string, boolean>>;
    /** Pointerdown handler — spread as `@pointerdown`. */
    onPointerdown: (e: PointerEvent) => void;
}

export interface UseSortableReturn {
    /**
     * Register a row by its stable id. Returns the binding
     * object the row should spread on its root element.
     * Idempotent — calling with the same id returns the same
     * binding so Vue's `v-bind` stays stable across rerenders.
     */
    registerItem: (id: SortableId) => SortableItemBinding;
    /** True while a drag is in progress. */
    isDragging: ComputedRef<boolean>;
    /** Id of the row currently being dragged, or null. */
    dragId: ComputedRef<SortableId | null>;
    /**
     * Live pointer position in page coordinates while a drag
     * is in progress. Use this to render a floating drag
     * preview via `<Teleport to="body">`.
     */
    dragPosition: ComputedRef<{ x: number; y: number } | null>;
    /** Index the drop will land at, or null when no target. */
    dropIndex: ComputedRef<number | null>;
}

const DEFAULT_HANDLE_SELECTOR = "[data-sortable-handle]";
const DROP_ABOVE_CLASS = "is-sortable-drop-above";
const DROP_BELOW_CLASS = "is-sortable-drop-below";

export function useSortable<T>(
    options: UseSortableOptions<T>,
): UseSortableReturn {
    const {
        items,
        getId,
        onReorder,
        handleSelector = DEFAULT_HANDLE_SELECTOR,
        axis = "y",
    } = options;

    // Drag state. `_dragId` + `_dropIndex` drive the computed
    // surface; `_pos` updates on every pointermove so a drag
    // preview can track the cursor without reading the event
    // stream directly.
    const _dragId = shallowRef<SortableId | null>(null);
    const _pos = shallowRef<{ x: number; y: number } | null>(null);
    const _dropIndex = shallowRef<number | null>(null);

    // Per-id element cache. Populated by `registerItem` via the
    // template ref callback. Keyed by id so the live row
    // reference is always current even after reordering.
    const elements = new Map<SortableId, Element | null>();

    // Binding cache. `registerItem` is called during render, so
    // we memoize the returned object to keep v-bind identity
    // stable frame-to-frame. Without this the row would
    // re-bind on every render tick.
    const bindings = new Map<SortableId, SortableItemBinding>();

    function getItemsArray(): readonly T[] {
        return items.value;
    }

    function findIndexById(id: SortableId): number {
        const list = getItemsArray();
        for (let i = 0; i < list.length; i++) {
            if (getId(list[i]) === id) return i;
        }
        return -1;
    }

    /**
     * Resolve the drop index for a cursor position. Walks the
     * currently-registered row elements in document order and
     * returns the first index whose row midpoint is past the
     * cursor. Past the last row → length (append). Empty list
     * → 0.
     */
    function resolveDropIndex(clientX: number, clientY: number): number {
        const list = getItemsArray();
        const horizontal = axis === "x";
        const cursor = horizontal ? clientX : clientY;
        for (let i = 0; i < list.length; i++) {
            const id = getId(list[i]);
            const el = elements.get(id);
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
     * Does a pointerdown target pass the handle filter? When
     * `handleSelector` is null, every pointerdown on the row
     * counts. Otherwise the target must be inside an element
     * matching the selector.
     */
    function targetIsHandle(target: EventTarget | null): boolean {
        if (handleSelector === null) return true;
        if (!(target instanceof Element)) return false;
        return target.closest(handleSelector) !== null;
    }

    function beginDrag(id: SortableId, e: PointerEvent): void {
        _dragId.value = id;
        _pos.value = { x: e.clientX, y: e.clientY };
        _dropIndex.value = findIndexById(id);

        const host = e.currentTarget as Element | null;
        if (host && "setPointerCapture" in host) {
            try {
                (host as HTMLElement).setPointerCapture(e.pointerId);
            } catch {
                /* capture failed — drag still works via document listeners */
            }
        }

        // Attach document-level move/up so a drag that leaves
        // the row element still tracks + commits. Removed on
        // endDrag.
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
        document.addEventListener("pointercancel", onPointerUp);
    }

    function onPointerMove(e: PointerEvent): void {
        if (_dragId.value === null) return;
        _pos.value = { x: e.clientX, y: e.clientY };
        _dropIndex.value = resolveDropIndex(e.clientX, e.clientY);
    }

    function onPointerUp(_e: PointerEvent): void {
        const id = _dragId.value;
        const target = _dropIndex.value;
        endDrag();
        if (id === null || target === null) return;

        const list = getItemsArray();
        const srcIndex = findIndexById(id);
        if (srcIndex < 0) return;

        // Splice semantics: when dropping below the source row,
        // the removal shifts every index past srcIndex back by
        // one. Clamp + adjust so the user's visual intent
        // ("drop here") matches the landed position.
        let insertIndex = target;
        if (insertIndex > srcIndex) insertIndex -= 1;
        if (insertIndex === srcIndex) return; // no-op

        const next = list.slice();
        const [moved] = next.splice(srcIndex, 1);
        next.splice(insertIndex, 0, moved);
        onReorder(next);
    }

    function endDrag(): void {
        _dragId.value = null;
        _pos.value = null;
        _dropIndex.value = null;
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerUp);
    }

    function registerItem(id: SortableId): SortableItemBinding {
        const cached = bindings.get(id);
        if (cached) return cached;

        const setEl = (el: Element | null) => {
            if (el === null) {
                elements.delete(id);
            } else {
                elements.set(id, el);
            }
        };

        const classComputed = computed<Record<string, boolean>>(() => {
            const result: Record<string, boolean> = {
                [DROP_ABOVE_CLASS]: false,
                [DROP_BELOW_CLASS]: false,
            };
            if (_dragId.value === null) return result;
            if (_dropIndex.value === null) return result;
            const idx = findIndexById(id);
            if (idx < 0) return result;
            // The drop index names the slot BEFORE which the
            // item will land. So dropIndex === i means the row
            // at index i is "below" the drop line, and the row
            // at i-1 is "above" it.
            const drop = _dropIndex.value;
            result[DROP_ABOVE_CLASS] = idx === drop - 1;
            result[DROP_BELOW_CLASS] = idx === drop;
            return result;
        });

        const binding: SortableItemBinding = {
            ref: setEl,
            dataAttrs: { "data-sortable-id": String(id) },
            class: classComputed,
            onPointerdown: (e: PointerEvent) => {
                if (e.button !== 0) return;
                if (!targetIsHandle(e.target)) return;
                e.preventDefault();
                beginDrag(id, e);
            },
        };

        bindings.set(id, binding);
        return binding;
    }

    return {
        registerItem,
        isDragging: computed(() => _dragId.value !== null),
        dragId: computed(() => _dragId.value),
        dragPosition: computed(() => _pos.value),
        dropIndex: computed(() => _dropIndex.value),
    };
}
