<script setup lang="ts">
import { computed, ref, useId, useTemplateRef } from "vue";
import type { Component } from "vue";
import { useSelectionGroup } from "../../composables/motion/morph/useSelectionGroup";
import { useHoldToken } from "../_shared/overlay";
import { useOptionalDockContext } from "./composables/dockContext";
import { provideDockSwitcherContext } from "./composables/dockSwitcherContext";
import DockCrossfade from "./DockCrossfade.vue";
import type { DockFaceDescriptor } from "./composables/dockCrossfadeContext";

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

// [W-I.8, RULINGS-6] `orientation` (the group takes its dock's), `switcherPosition` (the
// switcher leads) and `motion` with the switcher's drag arm (click and keys select) are
// deleted: no app passed them, and both apps hide the switcher.
const props = withDefaults(
    defineProps<{
        /** Render the embedded switcher. Hidden when there is 0 or 1 face. */
        showSwitcher?: boolean;
    }>(),
    {
        showSwitcher: true,
    },
);

const activeLayer = defineModel<string>("active", { required: true });
const dock = useOptionalDockContext();

const axis = computed(() => dock?.orientation.value ?? "horizontal");

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
   (Arrow/Home/End) does not trip the idle-collapse timer. The idempotent
   acquire/release/dispose triple is `_shared/overlay`'s ONE token, not a fourth
   local copy of it — this seat's job is only deciding WHEN focus is inside. */
const switcherToken = useHoldToken(() => dock);

function onSwitcherFocusIn() {
    switcherToken.acquire();
}

function onSwitcherFocusOut(e: FocusEvent) {
    const next = e.relatedTarget as Node | null;
    const list = e.currentTarget as HTMLElement | null;
    if (next && list?.contains(next)) return;
    switcherToken.release();
}
</script>

<template>
    <div
        class="dock-layer-group"
        :class="[axis, 'switcher-start']"
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
            class="dock-layer-switcher start"
            :aria-orientation="switcherOrientation"
            @keydown="selection.onKeydown"
            @focusin="onSwitcherFocusIn"
            @focusout="onSwitcherFocusOut"
        >
            <!-- No native `title`: the family's label is the library's `<Tooltip>`, and a
                 browser title would paint over it. `aria-label` is the accessible name. -->
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
                class="dock-layer-tab-indicator"
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
