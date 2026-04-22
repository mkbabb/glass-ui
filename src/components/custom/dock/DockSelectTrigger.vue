<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from "reka-ui";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "../../../utils";

/**
 * <DockSelectTrigger> — variable-width Select trigger for use inside GlassDock.
 *
 * Self-contained: scoped styles cover all four interactive states
 * plus aria-expanded highlight when the dropdown is open. Unlike
 * DockIconButton, does NOT scale on hover (just bg darken) so that
 * dropdown content anchors smoothly to the trigger.
 *
 * The trailing chevron is built-in; override via :icon slot.
 */
const props = defineProps<SelectTriggerProps & {
    class?: HTMLAttributes["class"];
}>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectTrigger
        v-bind="forwardedProps"
        :class="cn('dock-select-trigger', props.class)"
    >
        <slot />
        <SelectIcon as-child>
            <slot name="icon">
                <ChevronDown class="dock-select-trigger__chevron" />
            </slot>
        </SelectIcon>
    </SelectTrigger>
</template>

<style scoped>
.dock-select-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    white-space: nowrap;
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

.dock-select-trigger:hover:not(:disabled) {
    background: var(--muted);
    color: var(--btn-hover-color, var(--foreground));
}

.dock-select-trigger:active:not(:disabled) {
    transform: scale(var(--scale-press-dock));
}

.dock-select-trigger:focus:not(:focus-visible) {
    box-shadow: none;
    outline: none;
}

.dock-select-trigger:focus-visible {
    box-shadow: var(--focus-ring-shadow);
    outline: none;
    transition:
        background-color var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        opacity var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.dock-select-trigger:disabled {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
}

.dock-select-trigger:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"]) {
    background: var(--muted);
    color: var(--foreground);
}

.dock-select-trigger__chevron {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
    opacity: 0.5;
    transition: transform var(--duration-fast) var(--ease-standard);
}

.dock-select-trigger[data-state="open"] .dock-select-trigger__chevron {
    transform: rotate(180deg);
}
</style>
