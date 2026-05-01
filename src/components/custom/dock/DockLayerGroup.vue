<script setup lang="ts">
import { computed, provide, ref, useTemplateRef } from "vue";
import type { Component } from "vue";
import { useLayerTransition } from "./composables/useLayerTransition";

/**
 * <DockLayerGroup> — a stack of <DockLayer> children with crossfade +
 * FLIP size animation between layers, and an optional Figma-style
 * switcher rail built from each child's metadata.
 *
 * Usage:
 *   <DockLayerGroup v-model:active="layer">
 *     <DockLayer id="assets" label="Assets" :icon="AssetsIcon">...</DockLayer>
 *     <DockLayer id="layers" label="Layers" :icon="LayersIcon">...</DockLayer>
 *   </DockLayerGroup>
 */
interface DockLayerDescriptor {
    id: string;
    label?: string;
    icon?: Component | string;
}

const props = withDefaults(
    defineProps<{
        /** Layout axis; matches `GlassDock.orientation`. Controls FLIP dim. */
        orientation?: "horizontal" | "vertical";
        /** Render the embedded switcher rail. Hidden when there is 0 or 1 layer. */
        showRail?: boolean;
        /** Rail placement relative to the layer stack. */
        railPosition?: "start" | "end";
    }>(),
    {
        orientation: "horizontal",
        showRail: true,
        railPosition: "start",
    },
);

const activeLayer = defineModel<string>("active", { required: true });

const layers = ref<DockLayerDescriptor[]>([]);
const containerEl = useTemplateRef<HTMLElement>("containerEl");

function register(desc: DockLayerDescriptor) {
    if (!layers.value.find((l) => l.id === desc.id)) {
        layers.value.push(desc);
    }
}

function unregister(id: string) {
    layers.value = layers.value.filter((l) => l.id !== id);
}

const axis = computed(() => props.orientation);

const { onTransitionEnd, currentLayer, leavingLayer } = useLayerTransition({
    containerEl,
    activeLayer,
    axis,
});

provide("dockLayerGroup", {
    register,
    unregister,
    currentLayerId: currentLayer,
    leavingLayerId: leavingLayer,
});

function isComponent(icon: unknown): icon is Component {
    return typeof icon === "object" && icon !== null;
}
</script>

<template>
    <div
        class="dock-layer-group"
        :class="[orientation, `rail-${railPosition}`]"
    >
        <nav
            v-if="showRail && layers.length > 1"
            class="dock-layer-rail"
            :class="railPosition"
        >
            <button
                v-for="layer in layers"
                :key="layer.id"
                type="button"
                class="dock-layer-tab"
                :class="{ 'is-active': activeLayer === layer.id }"
                :title="layer.label"
                :aria-label="layer.label ?? layer.id"
                :aria-pressed="activeLayer === layer.id"
                @click="activeLayer = layer.id"
            >
                <component
                    v-if="isComponent(layer.icon)"
                    :is="layer.icon"
                    class="size-4"
                />
                <span
                    v-else-if="typeof layer.icon === 'string' && layer.icon.trim().startsWith('<')"
                    class="inline-flex size-4 items-center justify-center"
                    v-html="layer.icon"
                />
                <span v-else-if="typeof layer.icon === 'string'">{{ layer.icon }}</span>
                <span v-else>{{ (layer.label ?? layer.id).charAt(0) }}</span>
            </button>
        </nav>
        <div
            ref="containerEl"
            class="dock-layer-stack"
            @transitionend="onTransitionEnd"
        >
            <slot />
        </div>
    </div>
</template>

<style scoped>
.dock-layer-group {
    display: flex;
    gap: var(--dock-layer-group-gap, var(--dock-layer-gap, 0.25rem));
    min-width: 0;
    min-height: 0;
}

.dock-layer-group.horizontal {
    flex-direction: row;
    align-items: stretch;
}

.dock-layer-group.horizontal.rail-end {
    flex-direction: row-reverse;
}

.dock-layer-group.vertical {
    flex-direction: column;
    align-items: stretch;
}

.dock-layer-group.vertical.rail-end {
    flex-direction: column-reverse;
}

.dock-layer-rail {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: var(--dock-layer-rail-gap, 0.125rem);
    padding: var(--dock-layer-rail-padding, 0.125rem);
    border-right: 1px solid color-mix(in srgb, var(--border) 30%, transparent);
}

.dock-layer-group.vertical .dock-layer-rail {
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid color-mix(in srgb, var(--border) 30%, transparent);
}

.dock-layer-group.horizontal.rail-end .dock-layer-rail {
    border-right: none;
    border-left: 1px solid color-mix(in srgb, var(--border) 30%, transparent);
}

.dock-layer-group.vertical.rail-end .dock-layer-rail {
    border-bottom: none;
    border-top: 1px solid color-mix(in srgb, var(--border) 30%, transparent);
}

.dock-layer-rail .dock-layer-tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--dock-layer-tab-size, var(--dock-control-size, 1.75rem));
    height: var(--dock-layer-tab-size, var(--dock-control-size, 1.75rem));
    border: 0;
    border-radius: var(--dock-layer-tab-radius, var(--radius-sm));
    background: transparent;
    color: var(--muted-foreground);
    cursor: pointer;
    font: inherit;
    font-size: 0.75rem;
    transition:
        background var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard);
}

.dock-layer-rail .dock-layer-tab:hover {
    background: color-mix(in srgb, var(--accent) 40%, transparent);
    color: var(--foreground);
}

.dock-layer-rail .dock-layer-tab.is-active {
    background: color-mix(in srgb, var(--primary) 15%, transparent);
    color: var(--primary);
}

.dock-layer-stack {
    position: relative;
    display: grid;
    transition:
        width var(--duration-normal) var(--spring-snappy),
        height var(--duration-normal) var(--spring-snappy);
}
</style>
