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
    <!-- `.glass-drag-grabbable` is the SHARED rest affordance (grab cursor +
         `touch-action: none`), composed here rather than forked — the register's home
         move out of `tabs/styles/` is W-TABS's, and this component only consumes it. -->
    <button
        v-bind="attrs"
        :type="type"
        class="sortable-handle glass-drag-grabbable"
        data-sortable-handle
        data-control-target
        :disabled="item.binding.disabled.value"
        :aria-label="accessibleLabel"
    >
        <slot />
    </button>
</template>
