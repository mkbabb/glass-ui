<script setup lang="ts">
import { TooltipProvider as RekaTooltipProvider } from "reka-ui";

export interface TooltipProviderProps {
    /** Pointer dwell before the first tooltip opens, in milliseconds. */
    delayDuration?: number;
    /** Grace period for moving between sibling tooltips, in milliseconds. */
    skipDelayDuration?: number;
}

defineOptions({ name: "TooltipProvider", inheritAttrs: false });

const props = withDefaults(defineProps<TooltipProviderProps>(), {
    delayDuration: 700,
    skipDelayDuration: 300,
});
defineSlots<{ default?: () => unknown }>();
</script>

<template>
    <RekaTooltipProvider
        :delay-duration="delayDuration"
        :skip-delay-duration="skipDelayDuration"
    >
        <slot />
    </RekaTooltipProvider>
</template>
