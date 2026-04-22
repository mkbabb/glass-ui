<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted } from "vue";
import type { Component, Ref } from "vue";

/**
 * <DockLayer> — a named content pane inside a <DockLayerGroup>.
 *
 * Layers register themselves with their parent group via provide/inject,
 * so the group can both render a switcher rail (using each layer's
 * label/icon) and coordinate crossfade transitions when the active
 * layer changes.
 */
const props = defineProps<{
    /** Stable identifier — referenced by the parent group's `active` v-model. */
    id: string;
    /** Human-readable label; used for tooltip + fallback rail glyph. */
    label?: string;
    /** Optional icon: a Vue component, or a raw string (rendered as text). */
    icon?: Component | string;
}>();

interface DockLayerGroupContext {
    register(desc: { id: string; label?: string; icon?: Component | string }): void;
    unregister(id: string): void;
    currentLayerId: Ref<string>;
    leavingLayerId: Ref<string | null>;
}

const group = inject<DockLayerGroupContext | null>("dockLayerGroup", null);

if (!group) {
    throw new Error("<DockLayer> must be used inside <DockLayerGroup>");
}

onMounted(() => {
    group.register({
        id: props.id,
        label: props.label,
        icon: props.icon,
    });
});

onBeforeUnmount(() => {
    group.unregister(props.id);
});

const isActive = computed(() => group.currentLayerId.value === props.id);
const isLeaving = computed(() => group.leavingLayerId.value === props.id);
</script>

<template>
    <div
        class="dock-layer-item-host"
        :class="{ 'is-active': isActive, 'is-leaving': isLeaving }"
        :inert="isActive ? undefined : true"
    >
        <slot />
    </div>
</template>

<style scoped>
/*
 * Only the active layer participates in grid sizing. Inactive layers are
 * absolutely positioned at grid-area 1/1 so the parent grid track sizes
 * itself to the active layer's natural width/height. This is what lets
 * the DockLayerGroup hug a narrow tool palette and grow to 14rem when
 * the user switches to a wider layer — useLayerTransition's FLIP width
 * animation then interpolates between the two measured sizes.
 */
.dock-layer-item-host {
    grid-area: 1 / 1;
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 0.375rem;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    inset: 0;
    transition: opacity var(--duration-fast) var(--ease-standard);
}

.dock-layer-item-host.is-active {
    opacity: 1;
    pointer-events: auto;
    position: relative;
    inset: auto;
    /* max-content gives a definite width so any `w-full` / `flex-1` descendants
       resolve non-circularly against the layer's natural content width, and the
       grid track sizes correctly for useLayerTransition's FLIP measurement. */
    width: max-content;
    min-width: 0;
}

.dock-layer-item-host.is-leaving {
    opacity: 0;
    pointer-events: none;
}
</style>
