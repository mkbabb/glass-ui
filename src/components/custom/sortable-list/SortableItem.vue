<script setup lang="ts">
/**
 * SortableItem — a draggable row within a <SortableList>.
 *
 * Injects the sortable context, registers itself by its
 * stable `id`, and binds the returned ref / pointerdown / data
 * attrs / drop-target classes on its root element. The default
 * slot renders the row's content; styling is the consumer's
 * concern.
 *
 * The root is a `<div>` by default but consumers can swap via
 * the `as` prop if they need a semantic element (`<li>`, etc).
 * The binding spread works on any native element.
 */
import { inject, computed, type Component } from "vue";
import type { SortableId } from "../../../composables/sortable";
import { SORTABLE_CONTEXT } from "./context";

const props = withDefaults(
    defineProps<{
        /** Stable id for this row — must match the parent list. */
        id: SortableId;
        /** Root element tag. Default `"div"`. */
        as?: string | Component;
    }>(),
    { as: "div" },
);

const sortable = inject(SORTABLE_CONTEXT);
if (!sortable) {
    throw new Error(
        "[glass-ui] <SortableItem> must be used inside <SortableList>",
    );
}

const binding = computed(() => sortable.registerItem(props.id));
const isBeingDragged = computed(() => sortable.dragId.value === props.id);
</script>

<template>
    <component
        :is="as"
        :ref="binding.ref"
        :class="[
            'sortable-item',
            binding.class.value,
            { 'is-sortable-dragging': isBeingDragged },
        ]"
        v-bind="binding.dataAttrs"
        @pointerdown="binding.onPointerdown"
    >
        <slot :is-being-dragged="isBeingDragged" />
    </component>
</template>

<style scoped>
.sortable-item {
    /* Opt-out of text selection during drag so pointer capture
       doesn't fight with native selection. Consumers can
       re-enable on child content if they need selection. */
    user-select: none;
    -webkit-user-select: none;
}
</style>
