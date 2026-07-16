<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import {
    TooltipContent as RekaTooltipContent,
    TooltipPortal as RekaTooltipPortal,
} from "reka-ui";
import type { Surface } from "../_shared/axes";
import { cn } from "../_shared/class-names";
import { floatingContentAttrs, type FloatingPlacementProps } from "../_shared/floating";
import { resolveSurfaceClass } from "../_shared/resolveSurfaceClass";

export interface TooltipContentProps extends FloatingPlacementProps {
    class?: HTMLAttributes["class"];
    surface?: Surface;
    /** Override the text announced through the trigger's description relation. */
    ariaLabel?: string;
}

export interface TooltipContentEmits {
    escapeKeyDown: [event: KeyboardEvent];
    pointerDownOutside: [event: Event];
}

defineOptions({ name: "TooltipContent", inheritAttrs: false });

const props = withDefaults(defineProps<TooltipContentProps>(), {
    side: "top",
    sideOffset: 4,
    align: "center",
    alignOffset: 0,
    surface: "glass",
});
const emit = defineEmits<TooltipContentEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => floatingContentAttrs(attrs));
const placementProps = computed(() => ({
    side: props.side,
    sideOffset: props.sideOffset,
    align: props.align,
    alignOffset: props.alignOffset,
    avoidCollisions: true,
}));
const contentClass = computed(() =>
    cn(
        "z-tooltip overflow-hidden rounded-tooltip border text-popover-foreground glass-reveal",
        resolveSurfaceClass("floating"),
        "[--overlay-pad-inline:--spacing(2)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) text-(length:--tooltip-text)",
        props.class,
    ),
);
</script>

<template>
    <RekaTooltipPortal>
        <RekaTooltipContent
            v-bind="{ ...placementProps, ...forwardedAttrs }"
            :aria-label="ariaLabel"
            :data-surface="surface"
            data-material="overlay"
            data-reveal="tooltip"
            :class="contentClass"
            @escape-key-down="emit('escapeKeyDown', $event)"
            @pointer-down-outside="emit('pointerDownOutside', $event)"
        >
            <slot />
        </RekaTooltipContent>
    </RekaTooltipPortal>
</template>
