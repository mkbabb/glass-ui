<script setup lang="ts">
import { computed, type ButtonHTMLAttributes, type HTMLAttributes } from "vue";
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from "reka-ui";
import { cn } from "../../../utils";

/**
 * <DockDropdownTrigger> — variable-width DropdownMenu trigger for use inside GlassDock.
 *
 * Emits the dock dropdown-trigger class contract. Interactive styling is owned
 * by src/styles/dock.css. Matches DockIconButton's hover-scale behaviour
 * unlike DockSelectTrigger, which doesn't scale.
 *
 * Consumers provide the button content (icon + text + optional chevron)
 * via the default slot.
 */
const props = defineProps<DropdownMenuTriggerProps & {
    type?: ButtonHTMLAttributes["type"];
    class?: HTMLAttributes["class"];
}>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <DropdownMenuTrigger
        v-bind="forwardedProps"
        :class="cn('dock-dropdown-trigger', props.class)"
    >
        <slot />
    </DropdownMenuTrigger>
</template>
