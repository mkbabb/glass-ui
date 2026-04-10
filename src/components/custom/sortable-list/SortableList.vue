<script setup lang="ts" generic="T">
/**
 * SortableList — headless root of the sortable composition.
 *
 * Calls `useSortable` against the consumer's reactive items +
 * reorder callback, then provides the composable's return value
 * to descendant <SortableItem> + <SortableHandle> via
 * provide/inject. The root renders a plain slot — no wrapper
 * element styling — so the consumer decides the list chrome
 * (`<ul>`, `<div>`, Card, etc).
 *
 * The reorder contract stays functional: on drop, the consumer
 * receives the full reordered array via the `reorder` event
 * (or the `onReorder` prop for non-SFC call sites). Nothing is
 * mutated in place.
 *
 * Optional slots:
 *   - default — the list rows (wrapped in <SortableItem>s)
 *   - preview — rendered via <Teleport to="body"> while a drag
 *     is in progress. Receives `{ dragId, x, y }` slot props so
 *     consumers can render a floating label at the cursor.
 */
import { provide, toRef, type Ref } from "vue";
import { useSortable, type SortableId } from "../../../composables/sortable";
import { SORTABLE_CONTEXT } from "./context";

const props = withDefaults(
    defineProps<{
        /** The reactive list being reordered. */
        items: readonly T[];
        /** Extract a stable id from an item. */
        getId: (item: T) => SortableId;
        /**
         * Handle selector. `null` enables drag-from-anywhere.
         * Default `[data-sortable-handle]` matches what the
         * <SortableHandle> component emits.
         */
        handleSelector?: string | null;
        /** Axis constraint for drop resolution. Default `"y"`. */
        axis?: "x" | "y";
    }>(),
    {
        handleSelector: "[data-sortable-handle]",
        axis: "y",
    },
);

const emit = defineEmits<{
    reorder: [next: T[]];
}>();

// `toRef` on a prop gives a reactive ref that tracks the prop
// updates — the composable can then call `items.value` and get
// the current array on every pointermove tick.
const itemsRef = toRef(props, "items") as unknown as Ref<readonly T[]>;

const sortable = useSortable<T>({
    items: itemsRef,
    getId: props.getId,
    handleSelector: props.handleSelector,
    axis: props.axis,
    onReorder: (next) => emit("reorder", next),
});

provide(SORTABLE_CONTEXT, sortable);

defineExpose({
    isDragging: sortable.isDragging,
    dragId: sortable.dragId,
});
</script>

<template>
    <slot
        :is-dragging="sortable.isDragging.value"
        :drag-id="sortable.dragId.value"
    />
    <Teleport to="body">
        <template v-if="sortable.isDragging.value && sortable.dragPosition.value">
            <slot
                name="preview"
                :drag-id="sortable.dragId.value"
                :x="sortable.dragPosition.value.x"
                :y="sortable.dragPosition.value.y"
            />
        </template>
    </Teleport>
</template>
