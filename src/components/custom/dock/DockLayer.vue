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
