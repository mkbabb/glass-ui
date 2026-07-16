<script setup lang="ts">
import { TooltipRoot as RekaTooltipRoot } from "reka-ui";

export interface TooltipProps {
    /** Controlled visibility. */
    open?: boolean;
    /** Initial visibility for an uncontrolled tooltip. */
    defaultOpen?: boolean;
    /** Per-tooltip override of the provider's opening delay. */
    delayDuration?: number;
    disabled?: boolean;
}

export interface TooltipEmits {
    "update:open": [value: boolean];
}

defineOptions({ name: "Tooltip", inheritAttrs: false });

const props = withDefaults(defineProps<TooltipProps>(), {
    open: undefined,
    defaultOpen: false,
});
const emit = defineEmits<TooltipEmits>();
defineSlots<{ default?: () => unknown }>();
</script>

<template>
    <RekaTooltipRoot
        data-slot="tooltip"
        :open="open"
        :default-open="defaultOpen"
        :delay-duration="delayDuration"
        :disabled="disabled"
        @update:open="emit('update:open', $event)"
    >
        <slot />
    </RekaTooltipRoot>
</template>
