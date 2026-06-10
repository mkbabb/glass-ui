<script setup lang="ts">
import { computed, onBeforeUnmount, readonly, ref, useId, useTemplateRef } from "vue";
import type { Component, Ref } from "vue";
import { Tabs, TabsList, TabsTrigger, TabsIndicator } from "../../ui/tabs";
import { useOptionalDockContext } from "./composables/dockContext";
import {
    provideDockLayerGroupContext,
    type DockLayerDescriptor,
} from "./composables/dockLayerContext";
import { useLayerTransition } from "./composables/useLayerTransition";
import { useOptionalDockMorphContext } from "./composables/dockMorphContext";

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

/* AX.W45 DK8 — the rail's visual axis is PERPENDICULAR to the group axis: a
   horizontal group renders the rail as a COLUMN of stacked tabs (the indicator
   travels Y → reka `orientation="vertical"`); a vertical group renders the rail as
   a ROW (the indicator travels X → reka `orientation="horizontal"`). The prior
   hardcoded `orientation="horizontal"` made reka compute only the inline-axis
   position var, so on the DEFAULT (column) rail the indicator pinned at the top tab
   and never reached the active tab below it — the mis-alignment the user
   screenshotted. Threading the perpendicular axis makes reka compute the correct
   position var for the axis the rail actually flexes (the dock.css indicator rule is
   axis-aware to match). The keyboard contract stays reka's (Arrow/Home/End on the
   computed orientation). */
const railOrientation = computed<"horizontal" | "vertical">(() =>
    axis.value === "vertical" ? "horizontal" : "vertical",
);

/* AX.W02 — DEFER to the dock's single morph orchestrator when nested in a
   `<GlassDock>`; SELF-ORCHESTRATE when standalone. The dock provides
   `DockMorphContext` (W02 seam); a nested group registers its pane-stack as a
   second morph target on the dock's ONE `SpringProgress` (no second engine, one
   `--dock-morph-t` clock for a simultaneous collapse + pane-swap). Outside any
   dock — the standalone demo case — `useOptionalDockMorphContext()` reads `null`,
   so the group keeps its own `useLayerTransition` engine exactly as before. The
   befitting-silent missing-provider path is the standalone render, NOT a
   violation (hence `createOptionalContext`).

   `currentLayer`/`leavingLayer` are the same read-only crossfade-class source a
   `<DockLayer>` child reads, whether minted here (standalone) or returned by the
   orchestrator (nested) — so deferral is transparent to `<DockLayer>`. */
const morphHost = useOptionalDockMorphContext();

let currentLayer: Readonly<Ref<string>>;
let leavingLayer: Readonly<Ref<string | null>>;
let onTransitionEnd: (e: TransitionEvent) => void;

if (morphHost) {
    const handle = morphHost.registerGroup({ containerEl, activeLayer, axis });
    currentLayer = handle.currentLayer;
    leavingLayer = handle.leavingLayer;
    // The orchestrator owns the spring; there is no per-group transitionend to
    // resolve. A defensive no-op keeps the `@transitionend` binding parity.
    onTransitionEnd = () => {};
    onBeforeUnmount(() => handle.release());
} else {
    const self = useLayerTransition({
        containerEl,
        activeLayer,
        axis,
        /* AW.W3 — typed directional intent for the inner pane swap (standalone
           path only — the nested path defers to the dock's symmetric spring).
           Moving to a LATER-registered layer is `layer-forward`; an EARLIER one
           is `layer-back`. Order is the rail's registration order. */
        directionTypes: (from, to) => {
            const fromIdx = layers.value.findIndex((l) => l.id === from);
            const toIdx = layers.value.findIndex((l) => l.id === to);
            return [toIdx < fromIdx ? "layer-back" : "layer-forward"];
        },
    });
    currentLayer = readonly(self.currentLayer);
    leavingLayer = readonly(self.leavingLayer) as Readonly<Ref<string | null>>;
    onTransitionEnd = self.onTransitionEnd;
}

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

/* AU.W8b.6 — the morph driver (the dock orchestrator when nested, this group's
   own `useLayerTransition` when standalone) owns the WRITABLE
   `currentLayer`/`leavingLayer` refs and keeps mutating them; the context
   projection is read-only so a `<DockLayer>` child can read the active-layer
   state but never write the group-orchestrated value. Both `currentLayer` and
   `leavingLayer` are already read-only projections (the orchestrator returns
   `readonly()` handles; the standalone `useLayerTransition` refs are projected
   `readonly` here). */
provideDockLayerGroupContext({
    register,
    unregister,
    currentLayerId: currentLayer,
    leavingLayerId: leavingLayer,
});

/* AY.W-DOCK-NAV B6 — a Vue component icon can be an OBJECT (an options/SFC
   component) OR a FUNCTION (a functional component — `@lucide/vue` v1 ships its
   icons as functional render components). The prior `typeof icon === "object"`
   guard rejected the function form, so every lucide icon fell through to the
   first-letter fallback (the "A/L/L" rail glyphs the user saw instead of the
   Package/Layers/Library icons). Accepting both the object and function forms (a
   non-empty string is the explicit text-glyph case, handled separately) restores
   the icon render. */
function isComponent(icon: unknown): icon is Component {
    return (
        (typeof icon === "object" && icon !== null) || typeof icon === "function"
    );
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
        <!-- AY.W-DOCK2 (D5 persistence) — BOOKED: AY.W-GOD1. The switcher rail lives
             inside the layer-group, which sits in the dock's clipped `--full` pane, so
             on collapse the rail disappears with the pane (no persistent way to switch
             layers; H-dock §D7 L3). LANDING a persistent rail (rendered OUTSIDE the
             clipped pane so it survives collapse) needs a `GlassDock` chrome slot the
             band does not yet have — and a vertical rail dock has no collapse machinery
             at all (SidebarDock has no collapse). Both are GlassDock-structural changes
             that belong with the W-GOD1 GlassDock carve, NOT this disjoint W-DOCK2 edit.
             So persistence is formally BOOKED to AY.W-GOD1; the single-indicator + the
             one-clock fixes (the two pixel defects) LAND here. The successor gate is
             `proof:dock-rail-cohesion` (the persistence clause). -->
        <!-- AU.W8.4 / AX.W45 DK8 — the layer-switcher rail is a reka-ui Tabs
             contract (APG tabs): role=tablist/tab + aria-selected (NOT aria-pressed),
             roving tabindex, Arrow/Home/End. The orientation is now the rail's VISUAL
             axis (`railOrientation`, perpendicular to the group axis), so reka
             computes the indicator position for the axis the rail actually flexes
             (the indicator was pinned at the top tab and never reached the active one
             below — the DK8 mis-alignment). reka's keyboard convention follows
             orientation (a vertical/column rail uses Up/Down per APG, a horizontal/row
             rail Left/Right) — the correct APG mapping for each axis. The Tabs v-model
             binds the SAME `activeLayer` ref that drives the morph, so selecting a tab
             fires the crossfade with no second source of truth. The travelling
             TabsIndicator carries the active affordance. -->
        <Tabs
            v-if="showRail && layers.length > 1"
            v-model="activeLayer"
            :orientation="railOrientation"
            :as-child="true"
        >
            <!-- AY.W-DOCK2 (D5 single-indicator) — `:indicator="false"` kills the
                 phantom default `<TabsIndicator>` TabsList renders (its `bg-[var(--glass-bg-quiet)]`
                 plate). The rail drives its OWN explicit `.dock-layer-tab-indicator`
                 (the `--primary 15%` plate) below, so without this the rail painted
                 TWO indicators (H-dock §D7 L1). -->
            <TabsList
                class="dock-layer-rail"
                :class="railPosition"
                :indicator="false"
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
