<script setup lang="ts">
import { computed, h, type FunctionalComponent, type HTMLAttributes } from "vue";
import {
    SelectTrigger,
    SelectIcon,
    PopoverTrigger,
} from "reka-ui";
import { ChevronDown } from "@lucide/vue";
import { cn } from "../_shared/class-names";
import { vSpecular } from "../../composables/glass";
import DropdownMenuTrigger from "../menu/DropdownMenuTrigger.vue";
import { DOCK_SEAT_ATTR } from "./constants";

/**
 * <DockTrigger> — the ONE dock overlay trigger (folds
 * `DockSelectTrigger` / `DockDropdownTrigger` / `DockPopoverTrigger` onto the one
 * shared `.dock-trigger` recipe). The three were already byte-identical geometry +
 * style + baseline alignment (the unified family); this collapses
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
 * props (`disabled`/…) fall through via `$attrs`; the host is always `SeatHost`'s
 * `<button>`.
 *
 * A DECLARED SEAT. Every arm carries `data-glass-dock-seat` (`DOCK_SEAT_ATTR`), so a
 * trigger seated directly in a dock run is roved by it (atlas G-4, b-ii). A declared
 * seat stays focusable, so every arm renders its host through `SeatHost`, which maps
 * the `disabled` reka hands it (the trigger's own, or a disabled `Select` root's) to
 * `aria-disabled`, as `<DockControl>` does, never the native attribute: a native
 * `disabled` seat that held the run's stop would take every seat out of the Tab order,
 * and one mid-run would stop the arrows at it.
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

const seat = { [DOCK_SEAT_ATTR]: "" };

/**
 * The trigger's `<button>`, under each reka trigger's `as-child`. reka's own guards keep
 * a disabled select and menu shut (they read the state, not the attribute); the click
 * block covers the popover arm, whose reka trigger has no disabled state.
 */
function blockDisabledActivation(event: MouseEvent): void {
    event.preventDefault();
    event.stopImmediatePropagation();
}

const SeatHost: FunctionalComponent = (_, { attrs, slots }) => {
    const { disabled, ...rest } = attrs;
    const off = disabled != null && disabled !== false;
    return h(
        "button",
        {
            ...rest,
            type: rest.type ?? "button",
            ...(off
                ? { "aria-disabled": "true", onClickCapture: blockDisabledActivation }
                : {}),
        },
        slots.default?.(),
    );
};
SeatHost.inheritAttrs = false;

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
        v-bind="{ ...$attrs, ...seat }"
        as-child
        :class="triggerClass"
    >
        <SeatHost>
            <slot />
            <SelectIcon as-child>
                <slot name="icon">
                    <ChevronDown class="dock-select-trigger__chevron" aria-hidden="true" />
                </slot>
            </SelectIcon>
        </SeatHost>
    </SelectTrigger>

    <DropdownMenuTrigger
        v-else-if="props.for === 'dropdown'"
        v-specular
        v-bind="{ ...$attrs, ...seat }"
        as-child
        action="pointerdown"
        :class="triggerClass"
    >
        <SeatHost><slot /></SeatHost>
    </DropdownMenuTrigger>

    <PopoverTrigger
        v-else
        v-specular
        v-bind="{ ...$attrs, ...seat }"
        as-child
        :class="triggerClass"
    >
        <SeatHost><slot /></SeatHost>
    </PopoverTrigger>
</template>
