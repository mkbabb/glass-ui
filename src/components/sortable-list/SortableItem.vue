<script setup lang="ts">
import { computed } from "vue";

import type { SortableId } from "./composables/types";
import {
    provideSortableItemContext,
    useSortableContext,
} from "./context";

const props = withDefaults(
    defineProps<{
        id: SortableId;
        disabled?: boolean;
    }>(),
    { disabled: false },
);

const sortable = useSortableContext();
const binding = sortable.registerItem(props.id, () => props.disabled);
const label = computed(() => sortable.getItemLabel(props.id));
const isBeingDragged = computed(() => sortable.dragId.value === props.id);

provideSortableItemContext({ id: props.id, label, binding });
</script>

<template>
    <li
        :ref="binding.ref"
        :class="[
            'sortable-item',
            binding.class.value,
            { 'is-sortable-dragging': isBeingDragged },
        ]"
        v-bind="binding.dataAttrs"
        :aria-disabled="disabled || undefined"
        :data-disabled="disabled || undefined"
        @pointerdown="binding.onPointerdown"
        @keydown="binding.onKeydown"
    >
        <slot :is-being-dragged="isBeingDragged" />
    </li>
</template>

<style scoped>
.sortable-item {
    user-select: none;
    -webkit-user-select: none;
}

</style>
