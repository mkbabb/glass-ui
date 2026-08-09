<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import {
    TooltipContent as RekaTooltipContent,
    TooltipPortal as RekaTooltipPortal,
} from "reka-ui";
import {
    overlayContentAttrs,
    useDockParticipation,
    type FloatingPlacementProps,
} from "../_shared/overlay";

export interface TooltipContentProps extends FloatingPlacementProps {
    class?: HTMLAttributes["class"];
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
});
const emit = defineEmits<TooltipContentEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => ({ ...attrs }));
const placementProps = computed(() => ({
    side: props.side,
    sideOffset: props.sideOffset,
    align: props.align,
    alignOffset: props.alignOffset,
    avoidCollisions: true,
}));

/* THE HINT PARTICIPATES IN THE DOCK. It emitted no portal stamp at all, so a
   dock-anchored icon's own tooltip read as "the pointer left the dock" and
   collapsed the thing the pointer was still pointing at. The hint takes no HOLD
   — a hint is not a hand and must not pin the dock open — only the stamp, so
   click-away and pointer-out can tell a dock's own overlay from the page. */
const dock = useDockParticipation();

/* `z-tooltip` is the per-host rung and stays on the component; everything else
   the plate is comes from the ONE register. The retired
   `border text-popover-foreground rounded-tooltip overflow-hidden` utilities
   were a SECOND boundary author over `.glass-floating`'s rim (the bare `border`
   resolved to the raw shadcn `--border` ink and painted the 2px black rule the
   codex stills measured) plus a corner off the dead
   `--radius-tooltip → --radius-lg → --radius` 0.625rem chain. */
const contentAttrs = computed(() =>
    overlayContentAttrs({
        role: "hint",
        slot: "tooltip-content",
        dock: dock.portalAttrs.value,
        class: ["z-tooltip", props.class],
    }),
);
</script>

<template>
    <RekaTooltipPortal>
        <!-- NO `aria-label`. The content-side override used to replace the very
           node the trigger's `aria-describedby` relation reads, so the hint
           announced text it did not paint. A hint is a DESCRIPTION of its
           trigger (WCAG 1.4.13): the rendered text is the announcement, and an
           icon-only trigger labels ITSELF. -->
        <RekaTooltipContent
            v-bind="{ ...placementProps, ...forwardedAttrs, ...contentAttrs }"
            @escape-key-down="emit('escapeKeyDown', $event)"
            @pointer-down-outside="emit('pointerDownOutside', $event)"
        >
            <slot />
        </RekaTooltipContent>
    </RekaTooltipPortal>
</template>
