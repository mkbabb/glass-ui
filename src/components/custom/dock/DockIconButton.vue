<script setup lang="ts">
import {
    computed,
    type ButtonHTMLAttributes,
    type Component,
    type HTMLAttributes,
} from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../../utils";

/**
 * <DockIconButton> — fixed-square icon button for use inside GlassDock.
 *
 * Emits the dock icon-button class contract. Interactive styling is owned by
 * src/styles/dock.css so all dock controls share one public style authority.
 *
 * Use `as`/`as-child` to render as a <RouterLink> or <a> without a wrapper:
 * `as="a"` swaps the host tag, `as-child` merges the dock class onto a slotted
 * child (the reka-ui Primitive idiom). `type` is emitted only on a <button>
 * host (an anchor/RouterLink carries no `type`).
 */
const props = withDefaults(
    defineProps<{
        /** Compact variant: auto-sized instead of fixed 2.5rem square. */
        compact?: boolean;
        /** Button type attribute (default: "button" to prevent form submission). */
        type?: ButtonHTMLAttributes["type"];
        /** Host tag/component (reka-ui Primitive `as`; default "button"). */
        as?: string | Component;
        /** Merge props onto a slotted child instead of rendering a host tag. */
        asChild?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    { compact: false, type: "button", as: "button", asChild: false },
);

const classes = computed(() =>
    cn(
        "dock-icon-button",
        { "dock-icon-button--compact": props.compact },
        props.class,
    ),
);

// `type` is a <button>-only attribute; emit it only when the host is a button.
const buttonType = computed(() =>
    !props.asChild && props.as === "button" ? props.type : undefined,
);
</script>

<template>
    <Primitive :as="as" :as-child="asChild" :type="buttonType" :class="classes">
        <slot />
    </Primitive>
</template>
