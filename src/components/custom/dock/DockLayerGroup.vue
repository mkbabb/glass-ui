<script setup lang="ts">
import { computed, inject, provide, ref, useTemplateRef, watch } from "vue";
import type { Component, Ref } from "vue";
import { useDockContext } from "./composables/dockContext";
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
        /**
         * When the resolved value is truthy, the parent dock is held open
         * via the canonical `keepOpen` / `release` pair — closes the
         * 3-watcher-hooks-per-consumer drift surfaced in synthesis #41.
         * Accepts a Ref or a getter for ergonomic call-site composition.
         */
        keepOpenWhile?: Ref<boolean> | (() => boolean) | boolean;
    }>(),
    {
        showRail: true,
        railPosition: "start",
    },
);

const activeLayer = defineModel<string>("active", { required: true });
const dock = useDockContext();

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

provide("dockLayerGroup", {
    register,
    unregister,
    currentLayerId: currentLayer,
    leavingLayerId: leavingLayer,
});

function isComponent(icon: unknown): icon is Component {
    return typeof icon === "object" && icon !== null;
}

// `keepOpenWhile`: auto-bind the canonical keepOpen/release pattern so
// consumers don't wire 3 watcher hooks per use site.
const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
const dockRelease = inject<(() => void) | null>("dockRelease", null);

const keepOpenResolved = computed(() => {
    const raw = props.keepOpenWhile;
    if (raw === undefined) return false;
    if (typeof raw === "boolean") return raw;
    if (typeof raw === "function") return Boolean(raw());
    return Boolean(raw.value);
});

watch(
    keepOpenResolved,
    (v, prev) => {
        if (v && !prev) dockKeepOpen?.();
        else if (!v && prev) dockRelease?.();
    },
    { immediate: true },
);
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
            @transitionend="onTransitionEnd"
        >
            <slot />
        </div>
    </div>
</template>
