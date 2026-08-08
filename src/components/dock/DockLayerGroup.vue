<script setup lang="ts">
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    useId,
    useTemplateRef,
    watch,
} from "vue";
import type { Component } from "vue";
import { useSelectionGroup } from "../../composables/motion/morph/useSelectionGroup";
import { useOptionalDockContext } from "./composables/dockContext";
import { provideDockSwitcherContext } from "./composables/dockSwitcherContext";
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
 * switcher built from each face's metadata.
 *
 * the FLIP/registration engine is RETIRED. The face-swap is now
 * ONE crossfade slot: this component COMPOSES `<DockCrossfade:active>` (the thin
 * controlled core — two-child opacity overlap, peak reserve, focus-transfer) and reads
 * the registered face descriptors off it for the switcher.
 *
 * the switcher is driven by the library's ONE headless selection
 * engine `useSelectionGroup` (the dock IS SegmentedTabs/ToggleGroup wearing chrome). The
 * reka `ui/tabs` substrate + its `--reka-tabs-indicator-*` position path are DEFINITION-
 * ABSENT (retired); the switcher is a plain `role="tablist"` of `role="tab"` buttons whose
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
        /** Layout axis; matches `GlassDock.orientation`. Drives the switcher + face axis. */
        orientation?: "horizontal" | "vertical";
        /** Render the embedded switcher. Hidden when there is 0 or 1 face. */
        showSwitcher?: boolean;
        /** Switcher placement relative to the face stack. */
        switcherPosition?: "start" | "end";
        /**
         * the ONE motion-weight axis. `full` (default) arms
         * pull-to-switch: the switcher indicator is draggable — pull along the switcher
         * axis to the next face chip, the fling-to-nearest on release writes `active`
         * (`useDragMorph`, consumer #2). `reduced`/`off` opt DOWN to click/keyboard-only
         * (the roving tabindex + Arrow keys stay). PRM forces `full → reduced`.
         */
        motion?: Motion;
    }>(),
    {
        showSwitcher: true,
        switcherPosition: "start",
    },
);

const motionAxis = useMotionAxis(() => props.motion);

const activeLayer = defineModel<string>("active", { required: true });
const dock = useOptionalDockContext();

const axis = computed(
    () => props.orientation ?? dock?.orientation.value ?? "horizontal",
);

// The crossfade slot owns the face registry; the switcher reads its exposed descriptors.
const crossfade = useTemplateRef<{ faces: DockFaceDescriptor[] } | null>("crossfade");
const layers = computed<DockFaceDescriptor[]>(() => crossfade.value?.faces ?? []);

/*  The switcher's visual axis is PERPENDICULAR to the group axis: a horizontal
   group renders the switcher as a COLUMN of stacked tabs (indicator travels Y); a vertical
   group renders the switcher as a ROW (indicator travels X). */
const switcherOrientation = computed<"horizontal" | "vertical">(() =>
    axis.value === "vertical" ? "horizontal" : "vertical",
);
const switcherVertical = computed<boolean>(() => switcherOrientation.value === "vertical");

// ── The ONE headless selection engine ──
// Drives the switcher's roving focus, role=tab/aria-selected, and the ONE traveling-
// indicator writer. `model` is the consumer-owned `activeLayer` (the one registry).
const switcherListEl = ref<HTMLElement | null>(null);
const switcherIndicatorEl = ref<HTMLElement | null>(null);
const switcherButtonRefs = ref<HTMLElement[]>([]);
const switcherOptions = computed(() => layers.value.map((l) => ({ value: l.id })));
const selection = useSelectionGroup<{ value: string }>({
    options: switcherOptions,
    model: activeLayer,
    mode: "single",
    // Panel navigation — role="tab" + aria-selected (the switcher picks the active face).
    role: "tablist",
    vertical: switcherVertical,
    containerRef: switcherListEl,
    indicatorRef: switcherIndicatorEl,
    buttonRefs: switcherButtonRefs,
});

// ── The tablist↔tabpanel linkage (W2-A). The switcher renders as an APG tablist only
//    when it actually paints (`showSwitcher && >1 face`); a `<DockLayer>` face reads
//    `isTablist` to decide whether to become a `role="tabpanel"`. The id derivation is
//    minted ONCE here off a group-level uid so the tab side (below) and the panel side
//    (the face) emit the SAME `aria-controls`/`aria-labelledby` strings. ──
const switcherIsTablist = computed(() => props.showSwitcher && layers.value.length > 1);
const switcherUid = useId();
const idSafe = (faceId: string) => faceId.replace(/[^a-zA-Z0-9_-]/g, "");
const switcherTabId = (faceId: string) => `dock-tab-${switcherUid}-${idSafe(faceId)}`;
const switcherPanelId = (faceId: string) => `dock-panel-${switcherUid}-${idSafe(faceId)}`;
provideDockSwitcherContext({
    isTablist: switcherIsTablist,
    tabId: switcherTabId,
    panelId: switcherPanelId,
});

/* pull-to-switch (consumer #2). The switcher is draggable: pull
   along the switcher axis to the adjacent face chip, the fling-to-nearest writes the
   consumer-owned `active` model (no shadow state — the one-registry discipline). This
   adds the pull GESTURE on the switcher; the face-swap crossfade is `<DockCrossfade>`'s. */
const switcherDragAxis = computed<"x" | "y">(() =>
    switcherVertical.value ? "y" : "x",
);

function resolveSwitcherSnapTargets(): DragMorphSnapTarget<string>[] {
    const list = switcherListEl.value;
    if (!list) return [];
    const tabs = Array.from(list.querySelectorAll<HTMLElement>(".dock-layer-tab"));
    return layers.value.map((layer, idx) => {
        const r = tabs[idx]?.getBoundingClientRect();
        const center = r
            ? switcherDragAxis.value === "y"
                ? r.top + r.height / 2
                : r.left + r.width / 2
            : 0;
        return { value: layer.id, center };
    });
}

const switcherDrag = useDragMorph<string>({
    handle: switcherListEl,
    surface: switcherIndicatorEl,
    axis: () => switcherDragAxis.value,
    snapTargets: resolveSwitcherSnapTargets,
    onSnap: (id) => {
        if (motionAxis.armed.value && activeLayer.value !== id)
            activeLayer.value = id;
    },
});

watch(
    () =>
        [
            layers.value.length,
            switcherOrientation.value,
            motionAxis.armed.value,
        ] as const,
    () => {
        if (motionAxis.armed.value) nextTick(() => switcherDrag.refresh());
    },
);

onMounted(() => {
    if (motionAxis.armed.value) nextTick(() => switcherDrag.refresh());
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

/* Keep the dock open while a switcher tab holds focus, so keyboard navigation
   (Arrow/Home/End) does not trip the idle-collapse timer. A boolean edge keeps the
   keep-open token reference-counted exactly once. */
const switcherHolds = ref(false);

function onSwitcherFocusIn() {
    if (switcherHolds.value) return;
    switcherHolds.value = true;
    dock?.keepOpen();
}

function onSwitcherFocusOut(e: FocusEvent) {
    const next = e.relatedTarget as Node | null;
    const list = e.currentTarget as HTMLElement | null;
    if (next && list?.contains(next)) return;
    if (!switcherHolds.value) return;
    switcherHolds.value = false;
    dock?.release();
}

onBeforeUnmount(() => {
    if (switcherHolds.value) dock?.release();
});
</script>

<template>
    <div
        class="dock-layer-group"
        :class="[axis, `switcher-${switcherPosition}`]"
        :data-motion="motionAxis.dataMotion.value"
        :style="motionAxis.hostStyle.value"
    >
        <!-- the layer switcher is a plain APG tablist driven by
             `useSelectionGroup` (role=tablist/tab + aria-selected, roving tabindex,
             Arrow/Home/End). The engine's model binds the SAME `activeLayer` ref the
             crossfade slot reads, so selecting a tab drives the face-swap with no second
             source of truth. The `.dock-layer-tab-indicator` reads the ONE traveling-
             indicator writer's inline style (`singleSliderStyle`) — the reka
             `--reka-tabs-indicator-*` path is retired, so Chrome ≡ Safari by construction. -->
        <div
            v-if="switcherIsTablist"
            ref="switcherListEl"
            role="tablist"
            class="dock-layer-switcher"
            :class="[
                switcherPosition,
                motionAxis.armed.value && 'glass-drag-grabbable',
            ]"
            :aria-orientation="switcherOrientation"
            @keydown="selection.onKeydown"
            @focusin="onSwitcherFocusIn"
            @focusout="onSwitcherFocusOut"
        >
            <!-- ~~`:title="layer.label"`~~ [2026-08-05 · A11Y O-8] STRUCK. The dock
                 family's label affordance is the library's own `<Tooltip side="right">`
                 — the switcher story wraps every entry in one, and `controls/touch-floor.css`
                 records it as the family's documented tooltip. A native `title` on the
                 same control paints the BROWSER's unstyled square-cornered rect over the
                 styled one, on the browser's own delay, occluding the control it
                 describes. The accessible name is untouched: `aria-label` is what AT
                 reads here and `title` was never the name. -->
            <button
                v-for="(layer, idx) in layers"
                :key="layer.id"
                :ref="(el: any) => { if (el) switcherButtonRefs[idx] = el as HTMLElement }"
                type="button"
                class="dock-layer-tab"
                :id="switcherTabId(layer.id)"
                :tabindex="selection.rovingTabindex(idx)"
                v-bind="selection.itemAttrs(layer.id)"
                :aria-controls="switcherPanelId(layer.id)"
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
                ref="switcherIndicatorEl"
                :class="[
                    'dock-layer-tab-indicator',
                    motionAxis.armed.value && switcherDrag.dragging.value && 'glass-drag-lift',
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
