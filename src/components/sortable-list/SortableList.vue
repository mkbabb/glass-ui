<script setup lang="ts" generic="T">
import { computed, toRef, useAttrs, type Ref } from "vue";

import { provideSortableContext } from "./context";
import type { SortableId } from "./types";
import { useSortable } from "./useSortable";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        /** The reactive list being reordered. */
        items: readonly T[];
        getId: (item: T) => SortableId;
        getLabel?: (item: T) => string;
        label?: string;
        group?: string;
        handleSelector?: string | null;
    }>(),
    {
        label: "Sortable list",
        handleSelector: "[data-sortable-handle]",
    },
);

const attrs = useAttrs();

const emit = defineEmits<{
    reorder: [next: T[]];
    insert: [index: number, item: unknown];
}>();

const itemsRef = toRef(props, "items") as unknown as Ref<readonly T[]>;

/**
 * A consumer's `aria-label` WINS. `label` is the transaction's name — it is spoken in
 * the cross-list announcement ("Moved Alpha from Backlog to Doing") — so it is the
 * fallback, never the override. Binding the prop after the attribute spread used to
 * swallow the consumer's label silently.
 */
const ariaLabel = computed(
    () => (attrs["aria-label"] as string | undefined) ?? props.label,
);

const sortable = useSortable<T>({
    items: itemsRef,
    getId: props.getId,
    getLabel: props.getLabel,
    label: props.label,
    group: props.group,
    handleSelector: props.handleSelector,
    onReorder: (next) => emit("reorder", next),
    onInsert: (index, item) => emit("insert", index, item),
});

provideSortableContext(sortable);

defineExpose({
    isDragging: sortable.isDragging,
    dragId: sortable.dragId,
});
</script>

<template>
    <ul
        :ref="sortable.container.ref"
        class="sortable-list"
        v-bind="{ ...attrs, ...sortable.container.dataAttrs }"
        :aria-label="ariaLabel"
    >
        <slot
            :is-dragging="sortable.isDragging.value"
            :drag-id="sortable.dragId.value"
        />
    </ul>
    <span class="sr-only" aria-live="polite" aria-atomic="true">
        {{ sortable.announcement.value }}
    </span>
</template>

<style src="./styles.css"></style>
