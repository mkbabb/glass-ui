<script setup lang="ts">
import { computed, onUnmounted } from "vue";

import { provideSortableItemContext, useSortableContext } from "./context";
import type { SortableId } from "./types";

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

// The registration is EVICTED on unmount. Without this the instance's element map
// grew for the life of the list and a remounted row could keep a dead binding.
onUnmounted(binding.release);

provideSortableItemContext({ id: props.id, label, binding });
</script>

<template>
    <li
        :ref="binding.ref"
        class="sortable-item"
        v-bind="binding.dataAttrs"
        :aria-disabled="disabled || undefined"
        :data-disabled="disabled || undefined"
        @pointerdown="binding.onPointerdown"
        @keydown="binding.onKeydown"
    >
        <div class="sortable-item__content">
            <slot :is-being-dragged="isBeingDragged" />
        </div>
    </li>
</template>
