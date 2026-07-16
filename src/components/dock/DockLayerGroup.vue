<script setup lang="ts">
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    useTemplateRef,
    watch,
} from "vue";
import type { Component } from "vue";
import { useSelectionGroup } from "../../composables/motion/morph/useSelectionGroup";
import { useOptionalDockContext } from "./composables/dockContext";
import DockCrossfade from "./DockCrossfade.vue";
import type { DockFaceDescriptor } from "./composables/dockCrossfadeContext";
import {
    useDragMorph,
    type DragMorphSnapTarget,
} from "../../composables/motion/morph/useDragMorph";
// the `draggable` boolean dies onto the ONE `motion` axis.
import type { Motion } from "../_shared/axes";
import { useMotionAxis } from "../_shared/useMotionAxis";

/**
 * <DockLayerGroup> — a stack of <DockLayer> faces with an optional Figma-style
 * switcher rail built from each face's metadata.
 *
 * the FLIP/registration engine is RETIRED. The face-swap is now
 * ONE crossfade slot: this component COMPOSES `<DockCrossfade:active>` (the thin
 * controlled core — two-child opacity overlap, peak reserve, focus-transfer) and reads
 * the registered face descriptors off it for the rail.
 *
 * the switcher rail is driven by the library's ONE headless selection
 * engine `useSelectionGroup` (the dock IS SegmentedTabs/ToggleGroup wearing chrome). The
 * reka `ui/tabs` substrate + its `--reka-tabs-indicator-*` position path are DEFINITION-
 * ABSENT (retired); the rail is a plain `role="tablist"` of `role="tab"` buttons whose
 * roving focus (Arrow/Home/End), role-per-mode ARIA, and the ONE traveling-indicator
 * writer (`useSelectionIndicator`, Safari-identical by construction) come from the engine.
 * Selecting a tab writes the SAME `activeLayer` the crossfade slot reads — one registry,
 * no second source of truth.
 *
 * Usage:
 *   <DockLayerGroup v-model:active="layer">
 *     <DockLayer id="assets" label="Assets":icon="AssetsIcon">...</DockLayer>
 *     <DockLayer id="layers" label="Layers":icon="LayersIcon">...</DockLayer>
 *   </DockLayerGroup>
 */

const props = withDefaults(
    defineProps<{
        /** Layout axis; matches `GlassDock.orientation`. Drives the rail + face axis. */
        orientation?: "horizontal" | "vertical";
        /** Render the embedded switcher rail. Hidden when there is 0 or 1 face. */
        showRail?: boolean;
        /** Rail placement relative to the face stack. */
        railPosition?: "start" | "end";
        /**
         * the ONE motion-weight axis. `full` (default) arms
         * pull-to-switch: the switcher-rail indicator is draggable — pull along the rail
         * axis to the next face chip, the fling-to-nearest on release writes `active`
         * (`useDragMorph`, consumer #2). `reduced`/`off` opt DOWN to click/keyboard-only
         * (the roving tabindex + Arrow keys stay). PRM forces `full → reduced`.
         */
        motion?: Motion;
    }>(),
    {
        showRail: true,
        railPosition: "start",
    },
);

const motionAxis = useMotionAxis(() => props.motion);

const activeLayer = defineModel<string>("active", { required: true });
const dock = useOptionalDockContext();

const axis = computed(
    () => props.orientation ?? dock?.orientation.value ?? "horizontal",
);

// The crossfade slot owns the face registry; the rail reads its exposed descriptors.
const crossfade = useTemplateRef<{ faces: DockFaceDescriptor[] } | null>("crossfade");
const layers = computed<DockFaceDescriptor[]>(() => crossfade.value?.faces ?? []);

/*  DK8 — the rail's visual axis is PERPENDICULAR to the group axis: a horizontal
   group renders the rail as a COLUMN of stacked tabs (indicator travels Y); a vertical
   group renders the rail as a ROW (indicator travels X). */
const railOrientation = computed<"horizontal" | "vertical">(() =>
    axis.value === "vertical" ? "horizontal" : "vertical",
);
const railVertical = computed<boolean>(() => railOrientation.value === "vertical");

// ── The ONE headless selection engine ──
// Drives the rail's roving focus, role=tab/aria-selected, and the ONE traveling-
// indicator writer. `model` is the consumer-owned `activeLayer` (the one registry).
const railListEl = ref<HTMLElement | null>(null);
const railIndicatorEl = ref<HTMLElement | null>(null);
const railButtonRefs = ref<HTMLElement[]>([]);
const railOptions = computed(() => layers.value.map((l) => ({ value: l.id })));
const selection = useSelectionGroup<{ value: string }>({
    options: railOptions,
    model: activeLayer,
    mode: "single",
    // Panel navigation — role="tab" + aria-selected (the switcher picks the active face).
    role: "tablist",
    vertical: railVertical,
    containerRef: railListEl,
    indicatorRef: railIndicatorEl,
    buttonRefs: railButtonRefs,
});

/* pull-to-switch (consumer #2). The switcher rail is draggable: pull
   along the rail axis to the adjacent face chip, the fling-to-nearest writes the
   consumer-owned `active` model (no shadow state — the one-registry discipline). This
   adds the pull GESTURE on the rail; the face-swap crossfade is `<DockCrossfade>`'s. */
const railDragAxis = computed<"x" | "y">(() =>
    railVertical.value ? "y" : "x",
);

function resolveRailSnapTargets(): DragMorphSnapTarget<string>[] {
    const list = railListEl.value;
    if (!list) return [];
    const tabs = Array.from(list.querySelectorAll<HTMLElement>(".dock-layer-tab"));
    return layers.value.map((layer, idx) => {
        const r = tabs[idx]?.getBoundingClientRect();
        const center = r
            ? railDragAxis.value === "y"
                ? r.top + r.height / 2
                : r.left + r.width / 2
            : 0;
        return { value: layer.id, center };
    });
}

const railDrag = useDragMorph<string>({
    handle: railListEl,
    surface: railIndicatorEl,
    axis: () => railDragAxis.value,
    snapTargets: resolveRailSnapTargets,
    onSnap: (id) => {
        if (motionAxis.armed.value && activeLayer.value !== id)
            activeLayer.value = id;
    },
});

watch(
    () =>
        [
            layers.value.length,
            railOrientation.value,
            motionAxis.armed.value,
        ] as const,
    () => {
        if (motionAxis.armed.value) nextTick(() => railDrag.refresh());
    },
);

onMounted(() => {
    if (motionAxis.armed.value) nextTick(() => railDrag.refresh());
});

/*  B6 — a Vue component icon can be an OBJECT (SFC) OR a FUNCTION
   (a `@lucide/vue` v1 functional render component); a non-empty string is the explicit
   text-glyph case. Accept both component forms so lucide icons render (not the
   first-letter fallback). */
function isComponent(icon: unknown): icon is Component {
    return (
        (typeof icon === "object" && icon !== null) || typeof icon === "function"
    );
}

/* Keep the dock open while a rail tab holds focus, so keyboard navigation
   (Arrow/Home/End) does not trip the idle-collapse timer. A boolean edge keeps the
   keep-open token reference-counted exactly once. */
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

onBeforeUnmount(() => {
    if (railHolds.value) dock?.release();
});
</script>

<template>
    <div
        class="dock-layer-group"
        :class="[axis, `rail-${railPosition}`]"
        :data-motion="motionAxis.dataMotion.value"
        :style="motionAxis.hostStyle.value"
    >
        <!-- the layer-switcher rail is a plain APG tablist driven by
             `useSelectionGroup` (role=tablist/tab + aria-selected, roving tabindex,
             Arrow/Home/End). The engine's model binds the SAME `activeLayer` ref the
             crossfade slot reads, so selecting a tab drives the face-swap with no second
             source of truth. The `.dock-layer-tab-indicator` reads the ONE traveling-
             indicator writer's inline style (`singleSliderStyle`) — the reka
             `--reka-tabs-indicator-*` path is retired, so Chrome ≡ Safari by construction. -->
        <div
            v-if="showRail && layers.length > 1"
            ref="railListEl"
            role="tablist"
            class="dock-layer-rail"
            :class="[
                railPosition,
                motionAxis.armed.value && 'glass-drag-grabbable',
            ]"
            :aria-orientation="railOrientation"
            @keydown="selection.onKeydown"
            @focusin="onRailFocusIn"
            @focusout="onRailFocusOut"
        >
            <button
                v-for="(layer, idx) in layers"
                :key="layer.id"
                :ref="(el: any) => { if (el) railButtonRefs[idx] = el as HTMLElement }"
                type="button"
                class="dock-layer-tab"
                :tabindex="selection.rovingTabindex(idx)"
                v-bind="selection.itemAttrs(layer.id)"
                :title="layer.label"
                :aria-label="layer.label ?? layer.id"
                @click="selection.select(layer.id, idx)"
            >
                <component
                    v-if="isComponent(layer.icon)"
                    :is="layer.icon"
                    class="size-4"
                />
                <span v-else-if="typeof layer.icon === 'string'">{{ layer.icon }}</span>
                <span v-else>{{ (layer.label ?? layer.id).charAt(0) }}</span>
            </button>
            <div
                ref="railIndicatorEl"
                :class="[
                    'dock-layer-tab-indicator',
                    motionAxis.armed.value && railDrag.dragging.value && 'glass-drag-lift',
                ]"
                :style="selection.singleSliderStyle.value"
                aria-hidden="true"
            />
        </div>
        <!-- The ONE crossfade slot — the thin controlled face-swap core. The face
             children (<DockLayer>) register with it; it owns the two-child opacity
             overlap on `--dock-t`, the measure-once peak reserve, and the
             focus-transfer-on-dissolve. -->
        <DockCrossfade ref="crossfade" :active="activeLayer">
            <slot />
        </DockCrossfade>
    </div>
</template>
