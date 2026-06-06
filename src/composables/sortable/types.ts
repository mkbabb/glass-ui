/**
 * Sortable shared types — the contract surface the controller + services share.
 *
 * Kept in one leaf module so the five cohesive services + the `useSortable`
 * orchestrator import the same definitions without a circular edge. The public
 * `useSortable` / `UseSortableReturn` / `SortableId` surface is re-exported
 * unchanged from `useSortable.ts` (the consumer contract is byte-identical).
 */

import type { ComputedRef, Ref } from "vue";

/**
 * Identifier type for sortable rows. Must be stable across reorders (e.g. a
 * record id, not a positional index).
 */
export type SortableId = string | number;

export interface SortableOptions<T> {
    /** The reactive array being reordered. */
    items: Ref<readonly T[]> | ComputedRef<readonly T[]>;
    /**
     * Extract a stable id from an item. The id is used both as the drop-target
     * key (via `data-sortable-id`) and as the row registration key. Two items
     * with the same id in the same list is undefined behavior.
     */
    getId: (item: T) => SortableId;
    /**
     * Called once per successful same-list drop with the full reordered array.
     * Also called with the post-removal array when an item is transferred OUT to
     * another list in the same group.
     */
    onReorder: (next: T[]) => void;
    /**
     * Cross-list group id. Instances that share a group id accept drops from each
     * other. Undefined (the default) isolates this instance — drags stay within
     * the same list.
     */
    group?: string;
    /**
     * Called when a foreign item is dropped into this list. The consumer is
     * responsible for the insert (typically by calling its own onReorder
     * counterpart to mutate the source-of-truth). The item type is `unknown`
     * because the source list may own a different T — the group id is the only
     * contract that asserts compatibility.
     */
    onInsert?: (index: number, item: unknown) => void;
    /**
     * Optional grip constraint. When set, drag only starts if the pointerdown
     * target is (or is a descendant of) an element matching this selector.
     * Defaults to `[data-sortable-handle]` — the selector that <SortableHandle>
     * emits. Pass `null` to allow drag from anywhere on the row.
     */
    handleSelector?: string | null;
    /**
     * Axis constraint for drop resolution. `"y"` uses row midpoint Y (vertical
     * list), `"x"` uses row midpoint X (horizontal list). Default: `"y"`.
     */
    axis?: "x" | "y";
}

/**
 * Handlers + attrs to spread on a row element. `SortableList` calls
 * `registerItem(id)` once per row and forwards these via a `v-bind` on the row's
 * root.
 */
export interface SortableRowBinding {
    /** Template ref callback. Spread on the row's root element via `:ref`. */
    ref: (el: Element | null) => void;
    /** Data attribute set — includes `data-sortable-id`. */
    dataAttrs: Record<string, string>;
    /**
     * Reactive class object — carries the drop-target hint classes
     * (`is-sortable-drop-above` / `-below`) when this row is the live drop target
     * during a drag.
     */
    class: ComputedRef<Record<string, boolean>>;
    /** Pointerdown handler — spread as `@pointerdown`. */
    onPointerdown: (e: PointerEvent) => void;
}

/**
 * Container binding — spread on the list's root element so the composable can
 * hit-test it during cross-list drags.
 */
export interface SortableContainerBinding {
    ref: (el: Element | null) => void;
    dataAttrs: Record<string, string>;
}

export interface UseSortableReturn {
    /**
     * Register a row by its stable id. Returns the binding object the row should
     * spread on its root element. Idempotent — calling with the same id returns
     * the same binding so Vue's `v-bind` stays stable across rerenders.
     */
    registerItem: (id: SortableId) => SortableRowBinding;
    /**
     * Binding to spread on the list's container element. Marks it as a drop
     * target for cross-list drags in the same group and exposes the container
     * bounding rect for hit testing.
     */
    container: SortableContainerBinding;
    /** True while a drag is in progress. */
    isDragging: ComputedRef<boolean>;
    /** Id of the row currently being dragged, or null. */
    dragId: ComputedRef<SortableId | null>;
    /** Live pointer position in page coordinates while a drag is in progress. */
    dragPosition: ComputedRef<{ x: number; y: number } | null>;
    /** Index the drop will land at, or null when no target. */
    dropIndex: ComputedRef<number | null>;
    /**
     * `true` while the active drag holds a pointer capture; `false` when the
     * `setPointerCapture` optimization was unavailable and the drag is running on
     * the document `pointermove`/`pointerup` listeners alone (still fully
     * functional). Surfaced so a consumer can observe the degraded-but-correct
     * path instead of it being an invisible swallow.
     */
    pointerCaptureActive: ComputedRef<boolean>;
}

/**
 * Module-level registry entry for a live `useSortable` instance. Used for
 * cross-list drop resolution — on drag move, the source instance looks up any
 * other instance in the same group whose container contains the cursor, and
 * transfers the drop target to it.
 */
export interface InstanceHandle {
    group?: string;
    getContainer: () => Element | null;
    getItems: () => readonly unknown[];
    getId: (item: unknown) => SortableId;
    getElements: () => Map<SortableId, Element | null>;
    setExternalDropIndex: (index: number | null) => void;
    acceptExternal: (index: number, item: unknown) => void;
    /** The target insertion index at drop time (set by pointermove). */
    getExternalDropIndex?: () => number | null;
}
