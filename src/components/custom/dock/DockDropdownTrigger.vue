<script setup lang="ts">
import { computed, type ButtonHTMLAttributes, type HTMLAttributes } from "vue";
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from "reka-ui";
import { cn } from "../../../utils";
import { vSpecular } from "../../../composables/glass";

/**
 * <DockDropdownTrigger> — variable-width DropdownMenu trigger for use inside GlassDock.
 *
 * Emits the SHARED `.dock-trigger` recipe (BD.W-DOCK-CORE A8 — the unified dock
 * overlay-trigger family: select/dropdown/popover are byte-identical geometry + style +
 * baseline alignment). Interactive styling is owned by dock-controls/triggers.css; the
 * hover-scale is OFF across the family so portaled content anchors smoothly.
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
        v-specular
        v-bind="forwardedProps"
        :class="cn('dock-trigger dock-dropdown-trigger', props.class)"
    >
        <slot />
    </DropdownMenuTrigger>
</template>
