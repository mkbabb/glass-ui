<script setup lang="ts">
import { computed, type ButtonHTMLAttributes, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";

/**
 * <DockIconButton> — fixed-square icon button for use inside GlassDock.
 *
 * Emits the dock icon-button class contract. Interactive styling is owned by
 * src/styles/dock.css so all dock controls share one public style authority.
 */
const props = withDefaults(
    defineProps<{
        /** Compact variant: auto-sized instead of fixed 2.5rem square. */
        compact?: boolean;
        /** Button type attribute (default: "button" to prevent form submission). */
        type?: ButtonHTMLAttributes["type"];
        class?: HTMLAttributes["class"];
    }>(),
    { compact: false, type: "button" },
);

const classes = computed(() =>
    cn(
        "dock-icon-button",
        { "dock-icon-button--compact": props.compact },
        props.class,
    ),
);
</script>

<template>
    <button :type="type" :class="classes">
        <slot />
    </button>
</template>
