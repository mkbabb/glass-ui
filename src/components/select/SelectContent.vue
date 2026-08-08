<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { Surface } from "../_shared/axes";
import type { FloatingPlacementProps } from "../_shared/floating";
import type { PointerDownOutsideEvent } from "../_shared/interaction";

export interface SelectContentProps extends FloatingPlacementProps {
    class?: HTMLAttributes["class"];
    surface?: Surface;
}

export interface SelectContentEmits {
    closeAutoFocus: [event: Event];
    escapeKeyDown: [event: KeyboardEvent];
    pointerDownOutside: [event: PointerDownOutsideEvent];
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import {
    SelectContent as RekaSelectContent,
    SelectPortal as RekaSelectPortal,
    SelectViewport as RekaSelectViewport,
} from "reka-ui";
import SelectScrollButton from "./SelectScrollButton.vue";
import { cn } from "../_shared/class-names";
import { useOptionalDockContext } from "../dock/composables/dockContext";

defineOptions({
    name: "SelectContent",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<SelectContentProps>(), {
    side: "bottom",
    sideOffset: 0,
    align: "start",
    alignOffset: 0,
    surface: "glass",
});
const emit = defineEmits<SelectContentEmits>();
const attrs = useAttrs();

/* The placement contract is the component's, so it is spread LAST — that is what
 * makes it a contract, and it is why there is no local three-key attribute
 * denylist here any more. A denylist that exists only to stop a consumer from
 * winning an argument the spread order already settles is a second authority on
 * the same question. (The library-wide retired-attribute list is W-OVERLAY's one
 * home; this component owes it nothing.) */
const rootAttrs = computed(() => ({
    ...attrs,
    position: "popper" as const,
    side: props.side,
    sideOffset: props.sideOffset,
    align: props.align,
    alignOffset: props.alignOffset,
    avoidCollisions: true,
    collisionPadding: 16,
}));
const dockContext = useOptionalDockContext();
</script>

<template>
    <RekaSelectPortal>
        <!--
      THE PLATE IS PRECOMPILED, and it has to be. Every rule that decides how this
      listbox looks and how tall it may grow — the collision bound, the overlay
      veil, the 1px perimeter ink, the warm portal field, the scale origin — lives
      in `styles/glass/overlay-plate.css` as plain attribute-selector CSS keyed on
      `[data-slot="select-content"]`. A Tailwind utility here would compile only
      into a `dist/*.js` render chunk that no consumer content-scan reaches; a
      precompiled rule ships in `dist/glass-ui.css` whatever the consumer's JIT
      does. SelectContent clips at the bound and SelectViewport is the only
      vertical scroll owner, which is what keeps reka's active-option scrolling
      correct (one scroll port, never nested).
    -->
        <RekaSelectContent
            v-bind="rootAttrs"
            :data-glass-dock-portal="dockContext?.id ? '' : undefined"
            :data-glass-dock-owner="dockContext?.id"
            :data-surface="props.surface"
            data-material="overlay"
            data-reveal="menu"
            data-slot="select-content"
            :class="
                cn(
                    'relative z-popover min-w-(--overlay-min-width) overflow-hidden rounded-card text-popover-foreground glass-reveal',
                    'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                    'glass-floating glass-field-portal',
                    props.class,
                )
            "
            @close-auto-focus="emit('closeAutoFocus', $event)"
            @escape-key-down="emit('escapeKeyDown', $event)"
            @pointer-down-outside="emit('pointerDownOutside', $event)"
        >
            <SelectScrollButton direction="up" />
            <!-- The viewport is the scroll port AND the fade port: one element, so the
                 edge feather reads the SAME scroll state reka scrolls. Its inset and
                 the option corner derived from it are precompiled together in
                 glass/overlay-plate.css — the law lives beside the plate it measures
                 against, not in a utility here. -->
            <RekaSelectViewport
                data-slot="select-viewport"
                data-fade-start
                data-fade-end
                :class="
                    cn(
                        'fading-scroll fading-scroll--y max-h-[inherit] w-full min-w-(--reka-select-trigger-width)',
                    )
                "
            >
                <slot />
            </RekaSelectViewport>
            <SelectScrollButton direction="down" />
        </RekaSelectContent>
    </RekaSelectPortal>
</template>
