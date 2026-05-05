<script lang="ts">
/**
 * dockKeepOpenSink — leaf-side declarative dock keep-open primitive.
 *
 * Provided by `<DockLayerGroup>`. A leaf consumer (slider thumb,
 * scrubber, drag handle) calls `acquire()` on pointerdown and
 * `release(token)` on pointerup / pointercancel; while the sink holds
 * any token the parent dock stays open.
 *
 * The sink wraps `useDockState`'s existing `dockKeepOpen` / `dockRelease`
 * provide-keys with a `Set<symbol>` of outstanding tokens; the parent
 * counter is incremented exactly once while the set is non-empty and
 * decremented exactly once when it drains, so leaf-side double-acquires
 * or leaks cannot desync the dock's internal ref-count.
 *
 * `release(token)` is idempotent — releasing an already-released token
 * is a no-op.
 */
export interface DockKeepOpenSink {
    acquire(): symbol;
    release(token: symbol): void;
}

export const DOCK_KEEP_OPEN_SINK_KEY = "dockKeepOpenSink" as const;
</script>

<script setup lang="ts">
import { computed, inject, onUnmounted, provide, ref, useTemplateRef } from "vue";
import type { Component } from "vue";
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

// --- dockKeepOpenSink: token-based imperative API for leaf consumers ---
//
// Wraps the parent dock's `dockKeepOpen` / `dockRelease` provide-keys
// (from useDockState) with a Set<symbol> of acquired tokens. While the
// set is non-empty the parent dock's keepOpen counter is incremented
// once; when the set drains, the dock is released exactly once. This
// preserves a 1:1 acquire/release pairing into useDockState's counter
// even if a consumer leaks (or double-acquires) tokens at the leaf.
const parentKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
const parentRelease = inject<(() => void) | null>("dockRelease", null);

const acquiredTokens = new Set<symbol>();
let parentHeld = false;

function acquire(): symbol {
    const token = Symbol("dockKeepOpenToken");
    acquiredTokens.add(token);
    if (!parentHeld) {
        parentHeld = true;
        parentKeepOpen?.();
    }
    return token;
}

function release(token: symbol): void {
    if (!acquiredTokens.delete(token)) return; // idempotent
    if (acquiredTokens.size === 0 && parentHeld) {
        parentHeld = false;
        parentRelease?.();
    }
}

const sink: DockKeepOpenSink = { acquire, release };
provide(DOCK_KEEP_OPEN_SINK_KEY, sink);

onUnmounted(() => {
    // Drain any tokens still held at unmount so the parent counter unwinds.
    if (parentHeld) {
        parentHeld = false;
        parentRelease?.();
    }
    acquiredTokens.clear();
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
            @transitionend="onTransitionEnd"
        >
            <slot />
        </div>
    </div>
</template>
