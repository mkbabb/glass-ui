<script setup lang="ts">
import { computed, type ButtonHTMLAttributes, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";

/**
 * <DockIconButton> — fixed-square icon button for use inside GlassDock.
 *
 * Self-contained: scoped styles cover all four interactive states
 * (rest, hover, focus-visible, active, disabled, and toggled via
 *  aria-expanded / aria-pressed / .is-active). Consumers don't need
 *  to remember companion classes.
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

<style scoped>
.dock-icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--size-icon-btn);
    height: var(--size-icon-btn);
    padding: 0;
    cursor: pointer;
    border: none;
    background: transparent;
    border-radius: var(--radius-pill);
    color: color-mix(in srgb, var(--foreground) calc(var(--opacity-icon-muted) * 100%), transparent);
    outline: none;
    transition:
        background-color var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        opacity var(--duration-fast) var(--ease-standard);
}

.dock-icon-button--compact {
    width: auto;
    height: auto;
    min-width: 0;
    padding: 0.25rem;
}

.dock-icon-button:hover:not(:disabled) {
    background: var(--muted);
    color: var(--btn-hover-color, var(--foreground));
    transform: scale(var(--scale-hover-dock));
}

.dock-icon-button:active:not(:disabled) {
    transform: scale(var(--scale-press-dock));
}

.dock-icon-button:focus:not(:focus-visible) {
    box-shadow: none;
    outline: none;
}

.dock-icon-button:focus-visible {
    box-shadow: var(--focus-ring-shadow);
    outline: none;
    transition:
        background-color var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        opacity var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.dock-icon-button:disabled {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
}

.dock-icon-button:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"]) {
    background: var(--muted);
    color: var(--foreground);
}
</style>
