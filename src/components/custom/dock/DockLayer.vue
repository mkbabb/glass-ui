<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from "vue";
import type { Component } from "vue";
import { useDockLayerGroupContext } from "./composables/dockLayerContext";

/**
 * <DockLayer> — a named content pane inside a <DockLayerGroup>.
 *
 * Layers register themselves with their parent group via provide/inject,
 * so the group can both render a switcher rail (using each layer's
 * label/icon) and coordinate crossfade transitions when the active
 * layer changes.
 *
 * O.W2 Lane A — typed-key DI via `useDockLayerGroupContext()` (strict;
 * throws when used outside `<DockLayerGroup>`). Replaces the prior
 * `inject("dockLayerGroup", null) + manual !group throw` shape.
 */
const props = defineProps<{
    /** Stable identifier — referenced by the parent group's `active` v-model. */
    id: string;
    /** Human-readable label; used for tooltip + fallback rail glyph. */
    label?: string;
    /** Optional icon: a Vue component, or a raw string (rendered as text). */
    icon?: Component | string;
}>();

const group = useDockLayerGroupContext();

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
