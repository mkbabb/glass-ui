<script setup lang="ts">
import { computed, ref, useId, useTemplateRef } from "vue";
import type { Component } from "vue";
import { Tabs, TabsList, TabsTrigger, TabsIndicator } from "../../ui/tabs";
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
              "view-transition-name": `gl-dock-stack-${vtId.replace(/[^a-zA-Z0-9_-]/g, "-")}`,
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

/* AU.W8.4 — keep the dock open while a rail tab holds focus, so keyboard
   navigation (Arrow/Home/End) does not trip the idle-collapse timer. A boolean
   edge keeps the keep-open token reference-counted exactly once: acquired on the
   first focusin, released only when focus leaves the rail entirely (gated on
   `relatedTarget`, so tab-to-tab transit inside the rail does not double-count). */
const railHolds = ref(false);

function onRailFocusIn() {
    if (railHolds.value) return;
    railHolds.value = true;
    dock?.keepOpen();
}

function onRailFocusOut(e: FocusEvent) {
    const next = e.relatedTarget as Node | null;
    const list = e.currentTarget as HTMLElement | null;
    if (next && list?.contains(next)) return;
    if (!railHolds.value) return;
    railHolds.value = false;
    dock?.release();
}
</script>

<template>
    <div
        class="dock-layer-group"
        :class="[axis, `rail-${railPosition}`]"
    >
        <!-- AU.W8.4 — the layer-switcher rail is a reka-ui Tabs contract (APG
             tabs): role=tablist/tab + aria-selected (NOT aria-pressed), roving
             tabindex, Arrow/Home/End. Keyboard stays Left/Right always (reka's
             horizontal convention); CSS rotates the rail visually for vertical
             docks (the `dock-layer-group.vertical` flex-direction). The Tabs
             v-model binds the SAME `activeLayer` ref that drives
             useLayerTransition, so selecting a tab fires the crossfade with no
             second source of truth. The travelling TabsIndicator carries the
             active affordance (replacing the per-button background). -->
        <Tabs
            v-if="showRail && layers.length > 1"
            v-model="activeLayer"
            orientation="horizontal"
            :as-child="true"
        >
            <TabsList
                class="dock-layer-rail"
                :class="railPosition"
                @focusin="onRailFocusIn"
                @focusout="onRailFocusOut"
            >
                <TabsTrigger
                    v-for="layer in layers"
                    :key="layer.id"
                    :value="layer.id"
                    class="dock-layer-tab"
                    :title="layer.label"
                    :aria-label="layer.label ?? layer.id"
                >
                    <component
                        v-if="isComponent(layer.icon)"
                        :is="layer.icon"
                        class="size-4"
                    />
                    <span v-else-if="typeof layer.icon === 'string'">{{ layer.icon }}</span>
                    <span v-else>{{ (layer.label ?? layer.id).charAt(0) }}</span>
                </TabsTrigger>
                <TabsIndicator class="dock-layer-tab-indicator" />
            </TabsList>
        </Tabs>
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
