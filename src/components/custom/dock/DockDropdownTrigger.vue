<script setup lang="ts">
import { computed, type ButtonHTMLAttributes, type HTMLAttributes } from "vue";
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from "reka-ui";
import { cn } from "../../../utils";

/**
 * <DockDropdownTrigger> — variable-width DropdownMenu trigger for use inside GlassDock.
 *
 * Self-contained: scoped styles cover all four interactive states plus
 * aria-expanded highlight. Matches DockIconButton's hover-scale behaviour
 * (unlike DockSelectTrigger, which doesn't scale).
 *
 * Consumers provide the button content (icon + text + optional chevron)
 * via the default slot.
 */
const props = defineProps<DropdownMenuTriggerProps & {
    type?: ButtonHTMLAttributes["type"];
    class?: HTMLAttributes["class"];
}>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <DropdownMenuTrigger
        v-bind="forwardedProps"
        :class="cn('dock-dropdown-trigger', props.class)"
    >
        <slot />
    </DropdownMenuTrigger>
</template>

<style scoped>
.dock-dropdown-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    gap: var(--dock-trigger-gap, 0.25rem);
    min-height: var(--dock-trigger-min-height, auto);
    padding:
        var(--dock-trigger-padding-block, 0.25rem)
        var(--dock-trigger-padding-inline, 0.5rem);
    white-space: nowrap;
    cursor: pointer;
    border: none;
    background: transparent;
    border-radius: var(--dock-control-radius, var(--radius-pill));
    color: color-mix(in srgb, var(--foreground) calc(var(--opacity-icon-muted) * 100%), transparent);
    outline: none;
    transition:
        background-color var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        opacity var(--duration-fast) var(--ease-standard);
}

.dock-dropdown-trigger:hover:not(:disabled) {
    background: var(--muted);
    color: var(--btn-hover-color, var(--foreground));
    transform: scale(var(--scale-hover-dock));
}

.dock-dropdown-trigger:active:not(:disabled) {
    transform: scale(var(--scale-press-dock));
}

.dock-dropdown-trigger:focus:not(:focus-visible) {
    box-shadow: none;
    outline: none;
}

.dock-dropdown-trigger:focus-visible {
    box-shadow: var(--focus-ring-shadow);
    outline: none;
    transition:
        background-color var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        opacity var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.dock-dropdown-trigger:disabled {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
}

.dock-dropdown-trigger:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"]) {
    background: var(--muted);
    color: var(--foreground);
}
</style>
