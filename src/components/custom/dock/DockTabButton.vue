<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../../utils";

/**
 * <DockTabButton> — text-tab button for use inside a horizontal GlassDock.
 *
 * Self-contained: scoped styles cover four interactive states (rest, hover,
 * focus-visible, active via aria-current="page" / aria-pressed / .is-active,
 * disabled). Sibling to <DockIconButton> — DockIconButton is fixed-square
 * for icons; DockTabButton is auto-sized for short text labels (story names,
 * filter keywords).
 *
 * Use `as-child` to render as a <RouterLink> or <a>: the active state
 * automatically activates when the rendered element carries
 * aria-current="page" (which RouterLink sets).
 */
const props = withDefaults(
    defineProps<{
        as?: string;
        asChild?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    { as: "button", asChild: false },
);

const classes = computed(() => cn("dock-tab-button", props.class));
</script>

<template>
    <Primitive :as="as" :as-child="asChild" :class="classes">
        <slot />
    </Primitive>
</template>

<style scoped>
.dock-tab-button {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    padding-inline: 0.75rem;
    padding-block: 0.375rem;
    border: none;
    background: transparent;
    border-radius: var(--radius-pill);
    font-size: var(--type-small);
    line-height: 1;
    color: var(--muted-foreground);
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    transition:
        background-color var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard);
}

.dock-tab-button:hover:not(:disabled) {
    background: color-mix(in srgb, var(--foreground) 8%, transparent);
    color: var(--foreground);
}

.dock-tab-button:active:not(:disabled) {
    transform: scale(var(--scale-press-dock));
}

.dock-tab-button:focus:not(:focus-visible) {
    box-shadow: none;
}

.dock-tab-button:focus-visible {
    box-shadow: var(--focus-ring-shadow);
    outline: none;
}

.dock-tab-button:disabled {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
}

.dock-tab-button:is(.is-active, .active, [aria-current="page"], [aria-pressed="true"]) {
    background: color-mix(in srgb, var(--foreground) 10%, transparent);
    color: var(--foreground);
}
</style>
