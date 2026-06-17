<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from "reka-ui";
import { ChevronDown } from "@lucide/vue";
import { cn } from "../../../utils";
import { vSpecular } from "../../../composables/glass";

/**
 * <DockSelectTrigger> — variable-width Select trigger for use inside GlassDock.
 *
 * Emits the dock select-trigger class contract. Interactive styling is owned
 * by src/styles/dock.css. Unlike DockIconButton, this does NOT scale on hover
 * so dropdown content anchors smoothly to the trigger.
 *
 * The trailing chevron is built-in; override via :icon slot.
 */
const props = defineProps<SelectTriggerProps & {
    class?: HTMLAttributes["class"];
}>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectTrigger
        v-specular
        v-bind="forwardedProps"
        :class="cn('dock-select-trigger', props.class)"
    >
        <slot />
        <SelectIcon as-child>
            <slot name="icon">
                <ChevronDown class="dock-select-trigger__chevron" />
            </slot>
        </SelectIcon>
    </SelectTrigger>
</template>
