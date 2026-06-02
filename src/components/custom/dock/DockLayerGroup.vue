<script setup lang="ts">
import { computed, ref, useId, useTemplateRef } from "vue";
import type { Component } from "vue";
import { useOptionalDockContext } from "./composables/dockContext";
import {
    provideDockLayerGroupContext,
    type DockLayerDescriptor,
} from "./composables/dockLayerContext";
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
        showRail: true,
        railPosition: "start",
    },
);

const activeLayer = defineModel<string>("active", { required: true });
const dock = useOptionalDockContext();

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

const axis = computed(() => props.orientation ?? dock?.orientation.value ?? "horizontal");

const { onTransitionEnd, currentLayer, leavingLayer } = useLayerTransition({
    containerEl,
    activeLayer,
    axis,
});

/* AQ.W6 §Design 7 — on a View-Transitions engine the layer-stack size morph +
   pane crossfade is owned by the browser (the `useLayerTransition` native fork);
   give the stack a page-unique `view-transition-name` so it is captured, plus
   the `.gl-dock-layer` group class for the `--vt-*` duration/ease. Set only when
   supported, so the FLIP fallback path keeps its plain box. */
const supportsVT =
    typeof document !== "undefined" && "startViewTransition" in document;
const vtId = useId();
const stackVtStyle = computed<Record<string, string> | undefined>(() =>
    supportsVT
        ? {
              "view-transition-name": `gl-dock-stack-${(vtId ?? "0").replace(/[^a-zA-Z0-9_-]/g, "-")}`,
              "view-transition-class": "gl-dock-layer",
          }
        : undefined,
);

provideDockLayerGroupContext({
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
        :class="[axis, `rail-${railPosition}`]"
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
                <span v-else-if="typeof layer.icon === 'string'">{{ layer.icon }}</span>
                <span v-else>{{ (layer.label ?? layer.id).charAt(0) }}</span>
            </button>
        </nav>
        <div
            ref="containerEl"
            class="dock-layer-stack"
            :style="stackVtStyle"
            @transitionend="onTransitionEnd"
        >
            <slot />
        </div>
    </div>
</template>
