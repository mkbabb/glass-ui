<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { injectDropdownMenuRootContext } from "reka-ui";
import type { PrimitiveProps } from "../_shared/primitive";
import { fixedHostAttrs } from "../_shared/primitive";
import { cn } from "../_shared/class-names";
import { useMenuPart, useMenuTrigger } from "./useMenuTrigger";

export type DropdownMenuTriggerAction = "click" | "pointerdown";

export interface DropdownMenuTriggerProps {
    /** Merge trigger behavior into one interactive child. */
    asChild?: PrimitiveProps["asChild"];
    disabled?: boolean;
    /** Open on pointerdown for dock controls while preserving keyboard click. */
    action?: DropdownMenuTriggerAction;
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "DropdownMenuTrigger", inheritAttrs: false });

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
    action: "click",
    asChild: false,
    disabled: false,
});
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const forwarded = fixedHostAttrs(attrs);
    return props.asChild ? forwarded : { ...forwarded, type: "button" };
});
const menuTrigger = useMenuTrigger();
const TriggerComp = useMenuPart("Trigger");
const root = injectDropdownMenuRootContext(null);

let suppressTrailingClick = false;

function onPointerDown(event: PointerEvent): void {
    if (
        props.action !== "pointerdown" ||
        menuTrigger.value !== "click" ||
        !root ||
        props.disabled ||
        event.button !== 0 ||
        event.ctrlKey
    )
        return;

    suppressTrailingClick = true;
    root.onOpenToggle();
    if (root.open.value) event.preventDefault();
}

function onClickCapture(event: MouseEvent): void {
    if (!suppressTrailingClick) return;
    suppressTrailingClick = false;
    if (event.detail === 0) return;
    event.preventDefault();
    event.stopImmediatePropagation();
}
</script>

<template>
    <component
        :is="TriggerComp"
        v-bind="forwardedAttrs"
        as="button"
        :as-child="asChild"
        :disabled="disabled"
        :class="cn('dropdown-menu__trigger', props.class)"
        data-slot="dropdown-menu-trigger"
        @pointerdown.capture="onPointerDown"
        @pointercancel.capture="suppressTrailingClick = false"
        @click.capture="onClickCapture"
    >
        <slot />
    </component>
</template>
