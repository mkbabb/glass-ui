<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import {
    HoverCardContent,
    HoverCardPortal,
    HoverCardRoot,
    HoverCardTrigger,
} from "reka-ui";
import { cn } from "../../../utils";

/**
 * <HoverPopover> — hover-triggered floating label.
 *
 * Substrate carry-forward of A5 §10 row 4 — IconTooltip's tooltip register
 * is too quiet for chassis-tier dock-icon-button consumers (SettingsCog,
 * ActionCluster). HoverPopover ships a popover-tier substrate (glass +
 * border + radius) at tooltip cadence: hover-trigger, defer-on-leave
 * timer, adaptive `side`/`align` that auto-flips off viewport edges.
 *
 * Default register: a single line of label text, sized for icon-button
 * accompaniment (max-width clamps; subtle vertical padding). Pass a
 * default slot for richer content (kbd hints, secondary lines). The
 * `content` prop is the convenience path — most consumers want a single
 * label string.
 *
 * Composition rests on reka-ui's HoverCard primitives so the
 * collision-avoidance + open/close timer machinery come for free; this
 * component is mostly a tighter substrate + a label-shaped default.
 */

const props = withDefaults(
    defineProps<{
        /** Convenience: label text. Slot wins if both supplied. */
        content?: string;
        /** Side relative to trigger. Defaults `top` (tooltip register). */
        side?: "top" | "right" | "bottom" | "left";
        /** Alignment along the side. Defaults `center`. */
        align?: "start" | "center" | "end";
        /**
         * ms before opening on hover. Defaults 250 — same as IconTooltip's
         * TooltipProvider cadence so the two read in unison across the
         * dock cluster.
         */
        openDelay?: number;
        /**
         * ms before closing on hover-leave. The "defer-on-leave" timer
         * the dispatch packet calls for; ~150ms gives the pointer time
         * to skim across cluster gaps without flickering.
         */
        closeDelay?: number;
        /** sideOffset in px. Defaults 6 — wider than tooltip's 4. */
        sideOffset?: number;
        /** Class merged onto the rendered HoverPopover content element. */
        class?: HTMLAttributes["class"];
    }>(),
    {
        side: "top",
        align: "center",
        openDelay: 250,
        closeDelay: 150,
        sideOffset: 6,
    },
);

const contentClass = computed(() =>
    cn(
        "z-popover hover-popover-panel",
        props.class,
    ),
);
</script>

<template>
    <HoverCardRoot :open-delay="openDelay" :close-delay="closeDelay">
        <HoverCardTrigger as-child>
            <slot name="trigger">
                <slot />
            </slot>
        </HoverCardTrigger>
        <HoverCardPortal>
            <HoverCardContent
                :side="side"
                :align="align"
                :side-offset="sideOffset"
                :avoid-collisions="true"
                :class="contentClass"
            >
                <slot name="content">
                    <span class="hover-popover-label">{{ content }}</span>
                </slot>
            </HoverCardContent>
        </HoverCardPortal>
    </HoverCardRoot>
</template>
