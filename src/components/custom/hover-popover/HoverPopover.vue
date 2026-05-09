<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, inject, ref, watch } from "vue";
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
 *
 * J.W3.B — `keepDockOpen` extends the primitive with the dock-keep
 * sink contract. While the popover is open inside a `<GlassDock>`,
 * the dock's collapse timer is suppressed via the parent-provided
 * `dockKeepOpen` / `dockRelease` callbacks. No-op outside a dock
 * context — the inject fallbacks are `null`, so non-dock consumers
 * pay nothing.
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
         * dock cluster. Hover-popover-specific (vs. the generic reka-ui
         * `open-delay`) so deeper-nested popovers can extend the defer
         * without colliding with sibling cadence vocabulary.
         */
        hoverOpenDelay?: number;
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
        /**
         * J.W3.B — when mounted inside a `<GlassDock>`, hold the parent
         * dock open while this popover is visible. Hooks the
         * `dockKeepOpen` / `dockRelease` provide/inject contract and
         * is a no-op outside a dock context. The dock's collapse timer
         * is ref-counted so multiple keep-open holds compose cleanly.
         * Also marks the portaled HoverCard content with
         * `data-glass-dock-portal` + `data-glass-dock-owner` so the
         * dock's click-away handler treats clicks inside the popover
         * as "inside the dock".
         */
        keepDockOpen?: boolean;
    }>(),
    {
        side: "top",
        align: "center",
        hoverOpenDelay: 250,
        closeDelay: 150,
        sideOffset: 6,
        keepDockOpen: false,
    },
);

const contentClass = computed(() =>
    cn(
        "z-popover hover-popover-panel popover-animate",
        props.class,
    ),
);

/* J.W3.B — dock-keep-open sink. Track open state via reka's
   `v-model:open`; while the popover is visible AND `keepDockOpen` is
   set, hold the parent dock open via the provide/inject contract
   `<GlassDock>` ships through `useDockState`. Outside a dock context
   the injects fall back to null and the watcher is a no-op. */
const isOpen = ref(false);
const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
const dockRelease = inject<(() => void) | null>("dockRelease", null);
const dockId = inject<string | null>("glassDockId", null);
let isHeld = false;

watch(isOpen, (open) => {
    if (!props.keepDockOpen) return;
    if (open && !isHeld) {
        dockKeepOpen?.();
        isHeld = true;
    } else if (!open && isHeld) {
        dockRelease?.();
        isHeld = false;
    }
});

/* Portaled HoverCard content lives outside the dock root, so the
   dock's click-away handler would otherwise treat clicks inside the
   popover as outside-dismiss. Marking the rendered content with the
   dock-portal attrs opts the portal into the dock's
   `isTeleportedTarget` allowlist. */
const portalAttrs = computed(() =>
    props.keepDockOpen && dockId
        ? { "data-glass-dock-portal": "", "data-glass-dock-owner": dockId }
        : {},
);
</script>

<template>
    <HoverCardRoot v-model:open="isOpen" :open-delay="hoverOpenDelay" :close-delay="closeDelay">
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
                v-bind="portalAttrs"
            >
                <slot name="content">
                    <span class="hover-popover-label">{{ content }}</span>
                </slot>
            </HoverCardContent>
        </HoverCardPortal>
    </HoverCardRoot>
</template>
