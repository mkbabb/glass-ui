<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import {
    SelectTrigger,
    SelectIcon,
    DropdownMenuTrigger,
    PopoverTrigger,
} from "reka-ui";
import { ChevronDown } from "@lucide/vue";
import { cn } from "../../../utils";
import { vSpecular } from "../../../composables/glass";

/**
 * <DockTrigger> — the ONE dock overlay trigger (BI.W-DOCK-CONTROLS; folds
 * `DockSelectTrigger` / `DockDropdownTrigger` / `DockPopoverTrigger` onto the one
 * shared `.dock-trigger` recipe). The three were already byte-identical geometry +
 * style + baseline alignment (BD.W-DOCK-CORE A8's unified family); this collapses
 * them to ONE component with a `for` discriminant selecting the reka trigger it
 * hosts:
 *
 *   • `for="select"`   → reka `SelectTrigger` + the built-in trailing chevron;
 *   • `for="dropdown"` → reka `DropdownMenuTrigger`;
 *   • `for="popover"`  → reka `PopoverTrigger`.
 *
 * The hover-scale is OFF across the family (dock-controls/triggers.css) so
 * portaled content anchors smoothly to the trigger. Label policy is native — the
 * greenfield trigger clamps its own label (the retired `clampLabel` prop's
 * disposition, decided-terminal: label-clamp is a native trigger concern). Reka's
 * props (`as`/`as-child`/`disabled`/…) fall through via `$attrs`.
 */
defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        /** Which overlay this trigger opens. */
        for?: "select" | "dropdown" | "popover";
        class?: HTMLAttributes["class"];
    }>(),
    { for: "select" },
);

const triggerClass = computed(() =>
    cn(
        "dock-trigger",
        props.for === "select" && "dock-select-trigger",
        props.for !== "select" && "dock-dropdown-trigger",
        props.class,
    ),
);
</script>

<template>
    <SelectTrigger
        v-if="props.for === 'select'"
        v-specular
        v-bind="$attrs"
        :class="triggerClass"
    >
        <slot />
        <SelectIcon as-child>
            <slot name="icon">
                <ChevronDown class="dock-select-trigger__chevron" />
            </slot>
        </SelectIcon>
    </SelectTrigger>

    <DropdownMenuTrigger
        v-else-if="props.for === 'dropdown'"
        v-specular
        v-bind="$attrs"
        :class="triggerClass"
    >
        <slot />
    </DropdownMenuTrigger>

    <PopoverTrigger v-else v-specular v-bind="$attrs" :class="triggerClass">
        <slot />
    </PopoverTrigger>
</template>
