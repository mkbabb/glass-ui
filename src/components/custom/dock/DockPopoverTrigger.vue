<script setup lang="ts">
// BD.W-DOCK-CORE (A8) — <DockPopoverTrigger>: the variable-width Popover trigger for
// use inside GlassDock, the THIRD member of the unified dock overlay-trigger family.
//
// HEAD had no dock popover trigger — consumers reached a raw <DockIconButton> as a
// PopoverTrigger, which hover-SCALED and carried a DIFFERENT geometry/baseline than the
// dropdown trigger (the user's A8 "the POPOVER trigger is misaligned + differs from the
// dropdown"). This mirrors DockDropdownTrigger exactly (a reka PopoverTrigger emitting
// the SHARED `.dock-trigger` recipe), so a popover trigger inside a dock is byte-identical
// geometry + style + baseline alignment to the dropdown trigger. The hover-scale is OFF
// across the family (dock-controls/triggers.css) so portaled content anchors smoothly.
//
// Consumers provide the button content (icon + text + optional chevron) via the default
// slot — the same surface DockDropdownTrigger exposes.
import { computed, type ButtonHTMLAttributes, type HTMLAttributes } from "vue";
import { PopoverTrigger, type PopoverTriggerProps, useForwardProps } from "reka-ui";
import { cn } from "../../../utils";
import { vSpecular } from "../../../composables/glass";

const props = defineProps<PopoverTriggerProps & {
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
    <PopoverTrigger
        v-specular
        v-bind="forwardedProps"
        :class="cn('dock-trigger dock-dropdown-trigger', props.class)"
    >
        <slot />
    </PopoverTrigger>
</template>
