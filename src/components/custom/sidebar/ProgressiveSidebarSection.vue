<script setup lang="ts">
/**
 * <ProgressiveSidebarSection> — slotted section primitive for the
 * `<ProgressiveSidebar>` slotted-chassis composition path.
 *
 * P.W3 Lane B. Pairs with `<ProgressiveSidebar>` chassis in slotted mode
 * (no `state` prop). The section renders its own header (icon + label,
 * or a custom `#header` slot) + default-slot content, and registers
 * itself with the chassis on mount via the typed-key DI context.
 *
 * Sections may render standalone (e.g. in isolated tests) — the optional
 * context helper falls back to a no-op when no chassis is present.
 */
import { computed, onBeforeUnmount, onMounted, type Component } from "vue";
import { useOptionalProgressiveSidebarContext } from "./context";

const props = defineProps<{
    id: string;
    label?: string;
    icon?: Component;
}>();

defineSlots<{
    /** Custom header replacement; defaults to icon + label composition. */
    header?: () => unknown;
    /** Section body content. */
    default?: () => unknown;
}>();

const ctx = useOptionalProgressiveSidebarContext();

const isActive = computed(() => (ctx ? ctx.isActive(props.id) : false));

onMounted(() => {
    ctx?.register({ id: props.id, label: props.label, icon: props.icon });
});

onBeforeUnmount(() => {
    ctx?.unregister(props.id);
});
</script>

<template>
    <section
        class="progressive-sidebar-section"
        :data-section-id="id"
        :data-active="isActive ? '' : null"
    >
        <header v-if="$slots.header || label || icon" class="progressive-sidebar-section__header">
            <slot name="header">
                <component
                    v-if="icon"
                    :is="icon"
                    class="progressive-sidebar-section__icon"
                    aria-hidden="true"
                />
                <span v-if="label" class="progressive-sidebar-section__label">{{ label }}</span>
            </slot>
        </header>
        <div class="progressive-sidebar-section__body">
            <slot />
        </div>
    </section>
</template>

<style scoped>
.progressive-sidebar-section {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
}

.progressive-sidebar-section__header {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0 0.625rem;
    color: color-mix(in srgb, var(--muted-foreground) 60%, transparent);
    font-size: var(--type-small);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.progressive-sidebar-section[data-active] .progressive-sidebar-section__header {
    color: var(--primary);
}

.progressive-sidebar-section__icon {
    width: 0.875rem;
    height: 0.875rem;
    flex-shrink: 0;
}

.progressive-sidebar-section__label {
    line-height: 1.2;
}

.progressive-sidebar-section__body {
    display: flex;
    flex-direction: column;
}
</style>
