/**
 * useSortable — pointer-capture drag-reorder for Vue lists.
 *
 * Headless composable that owns all pointer handling, drop-target
 * resolution, splice math, AND a DOM-clone drag ghost. Consumers
 * spread the returned per-item binding on each row; the composable
 * handles everything else. No `#preview` slot required — the
 * ghost is a cloned snapshot of the row the user grabbed, so it
 * always looks exactly like what's being dragged regardless of the
 * row's markup.
 *
 * Why pointer events (not HTML5 DnD): HTML5 DnD is flaky inside
 * reactive rendering loops, doesn't respect `user-select: none`
 * ancestors, and can't render a non-ghost drag preview without
 * fighting the browser. Pointer capture gives us direct control
 * over the entire drag lifecycle and composes cleanly with other
 * pointer-driven UI (canvas editors, pan/zoom, hover popovers).
 *
 * Cross-list drops via `group`: two or more SortableList
 * instances that share a group id accept items from each other.
 * On drag move, the composable hit-tests `elementFromPoint` for
 * any `[data-sortable-container]` element matching the same
 * group; when the cursor crosses into a sibling instance, the
 * drop target transfers to that instance. On drop into a
 * foreign group, the source's `onReorder` emits the removal
 * and the target's `onInsert` receives the item + insertion
 * index.
 *
 * Drop resolution walks registered row elements via a data
 * attribute rather than subscribing to each row's bounding-box
 * reactively — that keeps the cost at O(rows) per pointermove
 * frame and avoids a layout thrash storm.
 */

import {
    computed,
    onScopeDispose,
    shallowRef,
    type ComputedRef,
    type Ref,
} from "vue";

/**
 * Identifier type for sortable rows. Must be stable across
 * reorders (e.g. a record id, not a positional index).
 */
export type SortableId = string | number;

interface SortableOptions<T> {
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
     * Called once per successful same-list drop with the full
     * reordered array. Also called with the post-removal array
     * when an item is transferred OUT to another list in the
     * same group.
     */
    onReorder: (next: T[]) => void;
    /**
     * Cross-list group id. Instances that share a group id
     * accept drops from each other. Undefined (the default)
     * isolates this instance — drags stay within the same list.
     */
    group?: string;
    /**
     * Called when a foreign item is dropped into this list. The
     * consumer is responsible for the insert (typically by
     * calling its own onReorder counterpart to mutate the
     * source-of-truth). The item type is `unknown` because the
     * source list may own a different T — the group id is the
     * only contract that asserts compatibility.
     */
    onInsert?: (index: number, item: unknown) => void;
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
interface SortableRowBinding {
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

/**
 * Container binding — spread on the list's root element so the
 * composable can hit-test it during cross-list drags.
 */
export interface SortableContainerBinding {
    ref: (el: Element | null) => void;
    dataAttrs: Record<string, string>;
}

export interface UseSortableReturn {
    /**
     * Register a row by its stable id. Returns the binding
     * object the row should spread on its root element.
     * Idempotent — calling with the same id returns the same
     * binding so Vue's `v-bind` stays stable across rerenders.
     */
    registerItem: (id: SortableId) => SortableRowBinding;
    /**
     * Binding to spread on the list's container element. Marks
     * it as a drop target for cross-list drags in the same
     * group and exposes the container bounding rect for hit
     * testing.
     */
    container: SortableContainerBinding;
    /** True while a drag is in progress. */
    isDragging: ComputedRef<boolean>;
    /** Id of the row currently being dragged, or null. */
    dragId: ComputedRef<SortableId | null>;
    /**
     * Live pointer position in page coordinates while a drag
     * is in progress.
     */
    dragPosition: ComputedRef<{ x: number; y: number } | null>;
    /** Index the drop will land at, or null when no target. */
    dropIndex: ComputedRef<number | null>;
}

/**
 * True when a computed `border-radius` string has any non-zero
 * corner. Computed values resolve to space-separated lengths
 * (e.g. `"0px"`, `"6px"`, `"12px 12px 0px 0px"`) with an optional
 * `/` separating the horizontal/vertical radii of elliptical
 * corners. A radius is "zero" only when every numeric component
 * parses to 0; a non-length token (`%`, `auto`) counts as
 * non-zero so we never miss a rounded corner.
 *
 * Exported (not re-exported from the package barrel) for the D9 drag-ring
 * regression test — keep it a pure string predicate.
 */
export function isNonZeroRadius(radius: string): boolean {
    if (!radius) return false;
    return radius
        .replace(/\//g, " ")
        .split(/\s+/)
        .filter(Boolean)
        .some((part) => parseFloat(part) !== 0);
}

const DEFAULT_HANDLE_SELECTOR = "[data-sortable-handle]";
const DROP_ABOVE_CLASS = "is-sortable-drop-above";
const DROP_BELOW_CLASS = "is-sortable-drop-below";
const DRAG_GHOST_CLASS = "sortable-drag-ghost";
const SOURCE_DRAGGING_CLASS = "is-sortable-dragging";

/**
 * Module-level registry of every live `useSortable` instance.
 * Used for cross-list drop resolution — on drag move, the source
 * instance looks up any other instance in the same group whose
 * container contains the cursor, and transfers the drop target
 * to it. Entries are removed on scope dispose.
 */
interface InstanceHandle {
    group?: string;
    getContainer: () => Element | null;
    getItems: () => readonly unknown[];
    getId: (item: unknown) => SortableId;
    getElements: () => Map<SortableId, Element | null>;
    setExternalDropIndex: (index: number | null) => void;
    acceptExternal: (index: number, item: unknown) => void;
}
const instances = new Set<InstanceHandle>();

function findForeignTarget(
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

export function useSortable<T>(
    options: SortableOptions<T>,
): UseSortableReturn {
    const {
        items,
        getId,
        onReorder,
        onInsert,
        group,
        handleSelector = DEFAULT_HANDLE_SELECTOR,
        axis = "y",
    } = options;

    // Drag state.
    const _dragId = shallowRef<SortableId | null>(null);
    const _pos = shallowRef<{ x: number; y: number } | null>(null);
    const _dropIndex = shallowRef<number | null>(null);
    /**
     * Foreign-drop target handle (null when the drop stays on
     * this instance). Set by `onPointerMove` when the cursor
     * enters another instance in the same group; consulted by
     * `onPointerUp` to route the drop.
     */
    let foreignTarget: InstanceHandle | null = null;
    /** Captured source element for the drag ghost. */
    let ghostEl: HTMLElement | null = null;
    /** Offset from cursor to the source element's top-left, so
     *  the ghost tracks under the grab point rather than
     *  teleporting to the cursor. */
    let ghostOffsetX = 0;
    let ghostOffsetY = 0;
    /** The original row the user grabbed. Restored on endDrag. */
    let sourceEl: HTMLElement | null = null;

    /** Container reference used for hit-testing cross-list drops. */
    let containerEl: Element | null = null;

    // Per-id element cache.
    const elements = new Map<SortableId, Element | null>();

    // Binding cache for stable v-bind identity.
    const bindings = new Map<SortableId, SortableRowBinding>();

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

    function resolveDropIndexIn(
        elMap: Map<SortableId, Element | null>,
        list: readonly { id: SortableId }[],
        clientX: number,
        clientY: number,
        horizontal: boolean,
    ): number {
        const cursor = horizontal ? clientX : clientY;
        for (let i = 0; i < list.length; i++) {
            const el = elMap.get(list[i].id);
            if (!el) continue;
            const rect = (el as HTMLElement).getBoundingClientRect();
            const mid = horizontal
                ? rect.left + rect.width / 2
                : rect.top + rect.height / 2;
            if (cursor < mid) return i;
        }
        return list.length;
    }

    function resolveDropIndex(clientX: number, clientY: number): number {
        const list = getItemsArray().map((item) => ({ id: getId(item) }));
        return resolveDropIndexIn(elements, list, clientX, clientY, axis === "x");
    }

    function targetIsHandle(target: EventTarget | null): boolean {
        if (handleSelector === null) return true;
        if (!(target instanceof Element)) return false;
        return target.closest(handleSelector) !== null;
    }

    /**
     * Resolve the effective VISIBLE corner radius for the dragged
     * content. Returns the source's own computed `border-radius`
     * when it is non-zero; otherwise walks descendants depth-first
     * and returns the first element's non-zero radius (the common
     * case where the SortableItem root is unrounded and the
     * rounded surface lives on an inner child). Returns `null`
     * when nothing in the subtree is rounded — caller leaves the
     * ghost radius untouched.
     */
    function resolveVisibleRadius(source: HTMLElement): string | null {
        const own = getComputedStyle(source).borderRadius;
        if (isNonZeroRadius(own)) return own;
        for (const el of source.querySelectorAll<HTMLElement>("*")) {
            const r = getComputedStyle(el).borderRadius;
            if (isNonZeroRadius(r)) return r;
        }
        return null;
    }

    /**
     * Build the drag ghost by cloning the source row's DOM and
     * positioning a fixed copy at its current bounding rect.
     * The clone inherits scoped data-v-* attributes + classes so
     * stylesheet selectors continue to match, giving a pixel-
     * faithful preview without any per-consumer markup.
     */
    function createGhost(source: HTMLElement, clientX: number, clientY: number): void {
        const rect = source.getBoundingClientRect();
        ghostOffsetX = clientX - rect.left;
        ghostOffsetY = clientY - rect.top;

        const clone = source.cloneNode(true) as HTMLElement;
        clone.classList.add(DRAG_GHOST_CLASS);
        // Adopt the dragged content's effective VISIBLE corner radius onto the
        // ghost root so the gold drag ring (a `0 0 0 2px` box-shadow on the
        // ghost root — see SortableList.vue) traces the real corner. The
        // SortableItem root often has `border-radius: 0` while the rounded
        // surface lives on an inner child; without this the ring renders
        // square around a rounded card. Read the source's own radius first;
        // if all-zero, walk descendants depth-first for the first non-zero
        // radius. Set it inline so nothing in the cascade overrides it on the
        // floating clone.
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
        // Drop any id attributes on the clone so subtree query
        // selectors don't double-match the original.
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

    function beginDrag(id: SortableId, e: PointerEvent): void {
        const src = elements.get(id);
        if (!(src instanceof HTMLElement)) return;

        _dragId.value = id;
        _pos.value = { x: e.clientX, y: e.clientY };
        _dropIndex.value = findIndexById(id);
        foreignTarget = null;
        sourceEl = src;
        src.classList.add(SOURCE_DRAGGING_CLASS);

        createGhost(src, e.clientX, e.clientY);

        const host = e.currentTarget as Element | null;
        if (host && "setPointerCapture" in host) {
            try {
                (host as HTMLElement).setPointerCapture(e.pointerId);
            } catch {
                /* capture failed — drag still works via document listeners */
            }
        }

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
        document.addEventListener("pointercancel", onPointerUp);
    }

    function onPointerMove(e: PointerEvent): void {
        if (_dragId.value === null) return;
        _pos.value = { x: e.clientX, y: e.clientY };
        updateGhost(e.clientX, e.clientY);

        // Cross-list drop detection. If the cursor is over
        // another instance in the same group, hand drop target
        // resolution to that instance. Otherwise resolve against
        // our own rows.
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
                axis === "x",
            );
            foreign.setExternalDropIndex(idx);
            _dropIndex.value = null;
        } else {
            if (foreignTarget) {
                foreignTarget.setExternalDropIndex(null);
                foreignTarget = null;
            }
            _dropIndex.value = resolveDropIndex(e.clientX, e.clientY);
        }
    }

    function onPointerUp(_e: PointerEvent): void {
        const id = _dragId.value;
        const foreign = foreignTarget;
        const dropLocal = _dropIndex.value;

        endDrag();

        if (id === null) return;

        const list = getItemsArray();
        const srcIndex = list.findIndex((item) => getId(item) === id);
        if (srcIndex < 0) return;

        if (foreign) {
            // Cross-list drop: remove from source, insert into
            // the foreign target. Note the target's external
            // drop index was set in pointermove.
            const item = list[srcIndex];
            const next = list.slice();
            next.splice(srcIndex, 1);
            onReorder(next);
            // Adjust the target's insertion index only if the
            // target is THIS instance (a noop here since foreign
            // ≠ this). `setExternalDropIndex(null)` clears its
            // hint class first.
            const targetIndex = (foreign as unknown as {
                getExternalDropIndex?: () => number | null;
            }).getExternalDropIndex?.() ?? null;
            foreign.setExternalDropIndex(null);
            foreign.acceptExternal(targetIndex ?? 0, item);
            return;
        }

        if (dropLocal === null) return;

        // Same-list reorder. Splice the item out + back in at
        // the target index, adjusting for the fact that removing
        // the source shifts indices past it down by one.
        let insertIndex = dropLocal;
        if (insertIndex > srcIndex) insertIndex -= 1;
        if (insertIndex === srcIndex) return;

        const next = list.slice();
        const [moved] = next.splice(srcIndex, 1);
        next.splice(insertIndex, 0, moved);
        onReorder(next);
    }

    function endDrag(): void {
        destroyGhost();
        if (sourceEl) {
            sourceEl.classList.remove(SOURCE_DRAGGING_CLASS);
            sourceEl = null;
        }
        if (foreignTarget) {
            foreignTarget.setExternalDropIndex(null);
            foreignTarget = null;
        }
        _dragId.value = null;
        _pos.value = null;
        _dropIndex.value = null;
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerUp);
    }

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

        /**
         * Drop-target class for a single row under a given drop
         * index. ONE class at most — never both — so the user
         * sees exactly one insertion line instead of a doubled
         * pair at adjacent edges.
         *
         * Insertion-line convention:
         *   drop === 0           → top of row 0 (DROP_ABOVE on row 0)
         *   drop === k (middle)  → top of row k (DROP_ABOVE on row k)
         *   drop === length      → bottom of last row (DROP_BELOW on last)
         *
         * Two rows adjacent to the insertion line sharing the
         * line visually equals one drawn border (not two) —
         * picking a single row eliminates the prior "doubled
         * and wrong" appearance.
         */
        function flagsFor(drop: number, listLength: number): {
            above: boolean;
            below: boolean;
        } {
            const idx = findIndexById(id);
            if (idx < 0) return { above: false, below: false };
            if (drop === listLength) {
                return { above: false, below: idx === listLength - 1 };
            }
            return { above: idx === drop, below: false };
        }

        const classComputed = computed<Record<string, boolean>>(() => {
            const result: Record<string, boolean> = {
                [DROP_ABOVE_CLASS]: false,
                [DROP_BELOW_CLASS]: false,
            };
            // Local drop hint (same-list case).
            if (_dragId.value !== null && _dropIndex.value !== null) {
                const flags = flagsFor(_dropIndex.value, getItemsArray().length);
                if (flags.above) result[DROP_ABOVE_CLASS] = true;
                if (flags.below) result[DROP_BELOW_CLASS] = true;
            }
            // External drop hint (this instance is receiving a
            // foreign drag). `_externalDropIndex` is set by a
            // source instance through the module-level registry.
            // Local and external are mutually exclusive in
            // practice — either we own the drag or a sibling does —
            // but guard anyway so a stale value can't double-paint.
            if (
                _externalDropIndex.value !== null &&
                _dragId.value === null
            ) {
                const flags = flagsFor(
                    _externalDropIndex.value,
                    getItemsArray().length,
                );
                if (flags.above) result[DROP_ABOVE_CLASS] = true;
                if (flags.below) result[DROP_BELOW_CLASS] = true;
            }
            return result;
        });

        const binding: SortableRowBinding = {
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

    // External drop index — set by a sibling instance when it's
    // dragging an item over this list. Drives drop-target
    // highlighting on this instance's rows during a foreign
    // drag.
    const _externalDropIndex = shallowRef<number | null>(null);

    const container: SortableContainerBinding = {
        ref: (el) => {
            containerEl = el;
        },
        dataAttrs: {
            "data-sortable-container": group ?? "",
        },
    };

    // Register this instance in the module-level set for
    // cross-list lookups. Captured after all closures are
    // defined so the handle's callbacks can reference them.
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
    };
    // Extra getter for the external drop index (used by the
    // source instance's pointerup to find the target insertion
    // index at drop time).
    (handle as unknown as {
        getExternalDropIndex: () => number | null;
    }).getExternalDropIndex = () => _externalDropIndex.value;

    instances.add(handle);
    onScopeDispose(() => {
        instances.delete(handle);
        // Defensive cleanup if the scope is torn down mid-drag.
        endDrag();
    });

    return {
        registerItem,
        container,
        isDragging: computed(() => _dragId.value !== null),
        dragId: computed(() => _dragId.value),
        dragPosition: computed(() => _pos.value),
        dropIndex: computed(() => _dropIndex.value),
    };
}
