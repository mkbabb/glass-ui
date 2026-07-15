<script setup lang="ts">
import { computed, useAttrs, type ButtonHTMLAttributes } from "vue";

import { useSortableItemContext } from "./context";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ type?: ButtonHTMLAttributes["type"] }>(), {
    type: "button",
});

const attrs = useAttrs();
const item = useSortableItemContext();
const accessibleLabel = computed(
    () => (attrs["aria-label"] as string | undefined) ?? `Reorder ${item.label.value}`,
);
</script>

<template>
    <button
        v-bind="attrs"
        :type="type"
        class="sortable-handle"
        data-sortable-handle
        :disabled="item.binding.disabled.value"
        :aria-label="accessibleLabel"
    >
        <slot />
    </button>
</template>

<style scoped>
.sortable-handle {
    display: inline-flex;
    min-width: 2.75rem;
    min-height: 2.75rem;
    align-items: center;
    justify-content: center;
    cursor: grab;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
}

.sortable-handle:active {
    cursor: grabbing;
}

.sortable-handle:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>
