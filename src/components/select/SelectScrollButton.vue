<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface SelectScrollButtonProps {
    /** Which end of the listbox this button scrolls toward. */
    direction: "up" | "down";
    class?: HTMLAttributes["class"];
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import {
    SelectScrollDownButton as RekaSelectScrollDownButton,
    SelectScrollUpButton as RekaSelectScrollUpButton,
} from "reka-ui";
import { ChevronDown, ChevronUp } from "@lucide/vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

/* ONE component, one axis. The two ends of a listbox are the SAME affordance
 * pointed the other way — two SFCs meant two copies of the row geometry that
 * could drift apart, and neither was reachable from the barrel.
 *
 * The row is a real tap target: `min-h-11` = 44px, the same floor
 * `.glass-menu-row` holds for the options it sits between, so a thumb aiming at
 * the scroll edge of a long listbox is not aiming at a 24px sliver. */
defineOptions({ name: "SelectScrollButton", inheritAttrs: false });

const props = defineProps<SelectScrollButtonProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));

const rootClass = computed(() =>
    cn(
        "flex min-h-11 cursor-default items-center justify-center",
        props.class,
    ),
);
</script>

<template>
    <RekaSelectScrollUpButton
        v-if="props.direction === 'up'"
        v-bind="forwardedAttrs"
        :class="rootClass"
    >
        <slot>
            <ChevronUp class="h-4 w-4" />
        </slot>
    </RekaSelectScrollUpButton>
    <RekaSelectScrollDownButton v-else v-bind="forwardedAttrs" :class="rootClass">
        <slot>
            <ChevronDown class="h-4 w-4" />
        </slot>
    </RekaSelectScrollDownButton>
</template>
