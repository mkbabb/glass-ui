<script setup lang="ts">
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    readonly,
    ref,
    useId,
    useTemplateRef,
    watch,
} from "vue";
import type { Component, Ref } from "vue";
import { Tabs, TabsList, TabsTrigger, TabsIndicator } from "../../ui/tabs";
import { useOptionalDockContext } from "./composables/dockContext";
import {
    provideDockLayerGroupContext,
    type DockLayerDescriptor,
} from "./composables/dockLayerContext";
import { useLayerTransition } from "./composables/useLayerTransition";
import { useOptionalDockMorphContext } from "./composables/dockMorphContext";
import { useResizeObserver } from "../../../composables/dom/useResizeObserver";
import {
    useDragMorph,
    type DragMorphSnapTarget,
} from "../../../composables/motion/useDragMorph";
// BH.W-MOTION-AXIS — the `draggable` boolean dies onto the ONE `motion` axis.
import type { Motion } from "../../ui/_shared/axes";
import { useMotionAxis } from "../../ui/_shared/useMotionAxis";

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
        /**
         * BH.W-MOTION-AXIS — the ONE motion-weight axis (the `draggable` boolean's
         * clean-break successor). `full` (default) arms pull-to-switch: the switcher-rail
         * indicator is draggable — pull along the rail axis to the next layer chip, the
         * fling-to-nearest on release writes `activeLayer` (`useDragMorph`, consumer #2).
         * This is the liquid-weight-universal default flipping ON (the boolean defaulted
         * `false`; the pull is now the register default, an enrichment over the always-
         * present click/keyboard model write — a 5.0.0 free break, MIGRATION row).
         * `reduced`/`off` opt DOWN to the click/keyboard-only rail (the drag unbinds; the
         * reka roving tabindex + Arrow keys stay — motion off, meaning never off). PRM
         * forces `full → reduced` regardless (a11y absolute).
         */
        motion?: Motion;
    }>(),
    {
        showRail: true,
        railPosition: "start",
    },
);

// BH.W-MOTION-AXIS — the resolved motion state. `armed` (resolved `full`) arms the
// pull-to-switch drag (the SAME gate the `props.draggable` boolean was; the default
// flips ON per the liquid-weight-universal law).
const motionAxis = useMotionAxis(() => props.motion);

const activeLayer = defineModel<string>("active", { required: true });
const dock = useOptionalDockContext();

const layers = ref<DockLayerDescriptor[]>([]);
const containerEl = useTemplateRef<HTMLElement>("containerEl");
const groupEl = useTemplateRef<HTMLElement>("groupEl");

function register(desc: DockLayerDescriptor) {
    if (!layers.value.find((l) => l.id === desc.id)) {
        layers.value.push(desc);
    }
    measurePeak();
}

function unregister(id: string) {
    layers.value = layers.value.filter((l) => l.id !== id);
    measurePeak();
}

/* BB.W-DOCK-MORPH-FAMILY (d) — the group SELF-RESERVES its peak-layer block-size.
   A multi-layer group swaps panes of differing intrinsic block-size; without a
   reserve the group collapses to whichever pane is active and a hosting consumer
   hand-rolls a `--dock-host-reserve` guess (the speedtest interim that over-
   reserves ~70%). The group MEASURES its registered layers' intrinsic content
   block-size and reserves the PEAK (the max across panes) as `min-block-size` on
   its OWN root (NEVER the dock root — the box-inviolate fence holds), exposed as a
   read-only `--dock-layer-peak-block-size` the consumer can READ but never has to
   COMPUTE. The measure reads each `.dock-layer-item-host` pane's `scrollHeight`
   (the intrinsic content height — robust even for the inactive absolute-stretched
   panes, which a `getBoundingClientRect().height` reads circularly as the container
   size). Re-measured on a `useResizeObserver` tick (a pane's intrinsic size can
   change with content) + on register/unregister. The reserve is the bare peak PANE
   footprint — the host's own padding is the host's concern (no double-count). */
const peakBlockSize = ref(0);

function measurePeak() {
    const stack = containerEl.value;
    const group = groupEl.value;
    if (!stack || !group) return;
    let peak = 0;
    const panes = stack.querySelectorAll<HTMLElement>(".dock-layer-item-host");
    for (const pane of panes) {
        // `scrollHeight` is the intrinsic content extent — independent of the
        // absolute-stretch the inactive panes carry (`inset:0`), so the peak is the
        // tallest pane's real content, not the container's circular size.
        const h = pane.scrollHeight;
        if (h > peak) peak = h;
    }
    // Only widen the reserve (the running peak across visited content) so a pane
    // briefly mid-morph cannot SHRINK the reserve below the tallest pane seen.
    if (peak > peakBlockSize.value) peakBlockSize.value = peak;
}

const groupReserveStyle = computed<Record<string, string> | undefined>(() =>
    peakBlockSize.value > 0
        ? {
              "min-block-size": `${peakBlockSize.value}px`,
              "--dock-layer-peak-block-size": `${peakBlockSize.value}px`,
          }
        : undefined,
);

useResizeObserver(containerEl, () => measurePeak());
watch(() => layers.value.length, () => measurePeak());

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

/* BB.W-DRAG-MORPH — pull-to-switch (consumer #2, the ≥2-consumer bar at birth). The
   switcher rail becomes draggable: pull along the rail axis to the adjacent layer
   chip, the fling-to-nearest writes the consumer-owned `activeLayer` model (no shadow
   state — the one-registry discipline). The drag axis is the rail's VISUAL flex axis
   (a COLUMN rail / `railOrientation==="vertical"` flexes Y; a ROW rail flexes X). The
   snap centers are the registered layer-tab centers in CLIENT space (the same space
   kf `Draggable` tracks). The rail keeps reka's roving tabindex + Arrow keys (the
   keyboard path is untouched; the pull is the additive pointer gesture). This wave
   adds the GESTURE on the rail — it does NOT edit the dock morph orchestrator
   (`dockMorphContext`/`useLayerTransition` — W-DOCK-MORPH-FAMILY's surface). */
// reka `TabsList` exposes its DOM via `$el` (useForwardExpose), so the template ref
// resolves the component instance; `railDomEl` unwraps the real element the drag
// captures. Populated on mount + re-resolved on rail re-render.
const railListEl = useTemplateRef<{ $el?: HTMLElement } | HTMLElement | null>(
    "railListEl",
);
const railDomEl = ref<HTMLElement | null>(null);
function resolveRailDom(): void {
    const node = railListEl.value;
    railDomEl.value = node
        ? ((node as { $el?: HTMLElement }).$el ?? (node as HTMLElement))
        : null;
}
const railDragAxis = computed<"x" | "y">(() =>
    railOrientation.value === "vertical" ? "y" : "x",
);

function resolveRailSnapTargets(): DragMorphSnapTarget<string>[] {
    const list = railDomEl.value;
    if (!list) return [];
    const tabs = Array.from(
        list.querySelectorAll<HTMLElement>(".dock-layer-tab"),
    );
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
    el: railDomEl,
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
        resolveRailDom();
        if (motionAxis.armed.value) nextTick(() => railDrag.refresh());
    },
);

onMounted(() => {
    resolveRailDom();
    if (motionAxis.armed.value) nextTick(() => railDrag.refresh());
});

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
        ref="groupEl"
        class="dock-layer-group"
        :class="[axis, `rail-${railPosition}`]"
        :data-motion="motionAxis.dataMotion.value"
        :style="[groupReserveStyle, motionAxis.hostStyle.value]"
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
                 phantom default `<TabsIndicator>` TabsList renders (its `bg-(--glass-bg-quiet)`
                 plate). The rail drives its OWN explicit `.dock-layer-tab-indicator`
                 (the `--primary 15%` plate) below, so without this the rail painted
                 TWO indicators (H-dock §D7 L1). -->
            <TabsList
                ref="railListEl"
                class="dock-layer-rail"
                :class="[
                    railPosition,
                    motionAxis.armed.value && 'glass-drag-grabbable',
                    motionAxis.armed.value &&
                        railDrag.dragging.value &&
                        'glass-drag-lift',
                ]"
                :style="motionAxis.armed.value ? railDrag.dragStyle.value : undefined"
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
                <!-- AZ.W-DOCK-RAIL — `:plate="false"` drops the baked
                     `bg-(--glass-bg-quiet) [backdrop-filter:…]` plate the reka
                     `<TabsIndicator>` wrapper renders unconditionally. That baked
                     utility (unlayered) beat the `@layer components`
                     `.dock-layer-tab-indicator` token rule, so the rail indicator
                     painted the near-white glass plate instead of the intended
                     `--dock-layer-rail-active` register. With the plate suppressed
                     the token rule is the SOLE paint. -->
                <TabsIndicator class="dock-layer-tab-indicator" :plate="false" />
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

<!-- BG.W-DOCK-PANE-OVERLAP (F3.R2 · IOS27-MOTION-TRUTH §2.2) — the group pane swap
     is an OVERLAPPED crossfade on the ONE `--dock-morph-t` scalar, not a SEQUENTIAL
     out-fade→blank-glass-plate→in-fade. HEAD faded the leaving pane to gone (the
     scalar `calc(1 − t)` in the nested case, an instant `opacity:0` in the standalone
     case) while the entering pane was STATICALLY `opacity:1`, "revealed by the clip
     aperture" alone — so mid-morph, while the box was shrink-wrapped narrow around the
     emptying stack, NEITHER pane read: the ~100–150ms blank-glass-plate dead-zone the
     motion judge frame-confirmed (switch-2: root t2103 → near-empty small plate
     t2126–2217 → legible t2276), plus the double-exposure label ghost.

     THE FIX (§2.2 vocab a) — OVERLAP the opacity on the SAME `t` (no second clock, no
     `<Transition>`): the leaving pane persists to t≈0.6, the entering pane engages by
     t≈0.15, so both are co-present through t∈[0.15,0.6] — there is no frame where the
     max of the two reads below ~0.3 alpha, and the content swap is perceptually ≤120ms
     under the `--spring-dock`/`--dock-morph-t` box glide. The ghost dies with the
     overlap: the outgoing is gone (leaving alpha → 0 at t≈0.6) before the incoming
     passes ~50% alpha at its own position.

     This is expressed HERE (an unlayered SFC `<style>` — unlayered wins over the
     `@layer components` base ramps in `dock/layers.css` at any specificity, the
     documented AZ.W-DOCK-RAIL `@layer`-vs-utility cascade idiom) rather than in the
     component-layer CSS, because the pane-swap crossfade is DockLayerGroup's own
     mechanism. Scoped to `.dock-layer-item-host` (the INNER group pane — the outer
     GlassDock collapse↔expand `.dock-layer` pair keeps its aperture-reveal model,
     W-DOCK-GLYPH-RIGID's surface, byte-untouched). Gated on an ancestor `[data-morphing]`
     so it covers BOTH the nested path (`--dock-morph-t`/`data-morphing` on the `.glass-dock`
     root, written by the orchestrator `dockMorphContext`) AND the standalone path
     (both on the `.dock-layer-stack` morphRoot, written by `useLayerTransition`); at
     REST (no `[data-morphing]`) these rules do not match and the base
     `.is-active { opacity: 1 }` aperture-reveal governs. `--dock-morph-t` is the
     `inherits: true` registered property (dock.css), so it cascades to the panes for
     the `calc()` read. The box FLIP itself (`useLayerTransition.armSpring`) already
     interpolates MONOTONICALLY between the two pre-measured `--dock-morph-from`/`-to`
     endpoints — never a mid-flight re-measure through the emptying stack (the pin at
     `from=to`, scalar 0, held through the one-rAF measurement gap; the `max-content`
     force lifts the pin for a SINGLE measure then re-pins in the same frame) — so the
     "box dips below both endpoints" leg of §2.2 is closed by construction here.

     PRM: the spring's `respectReducedMotion` jumps `--dock-morph-t` 0→1 in one frame,
     so the entering pane lands at opacity 1 and the leaving at 0 with zero intermediate
     frames — the crossfade snaps (fade-keeps/transform-drops; the box scale/translate
     the global PRM gate already strips). -->
<style>
:where(.glass-dock, .dock-layer-group)[data-morphing]
    .dock-layer-item-host.is-active,
:where(.glass-dock, .dock-layer-group) [data-morphing]
    .dock-layer-item-host.is-active {
    /* entering pane — engages by t≈0.15, full by t≈0.65 (co-present with the
       leaving pane through the swap; overrides the base static opacity:1). */
    opacity: clamp(0, calc((var(--dock-morph-t) - 0.15) / 0.5), 1);
}

:where(.glass-dock, .dock-layer-group)[data-morphing]
    .dock-layer-item-host.is-leaving,
:where(.glass-dock, .dock-layer-group) [data-morphing]
    .dock-layer-item-host.is-leaving {
    /* leaving pane — persists to t≈0.6, then gone (overrides the base `calc(1 − t)` /
       instant `opacity:0`); stays painted + untouchable through the fade (the base
       `.is-leaving` rule keeps `visibility:visible; pointer-events:none`). */
    opacity: calc(1 - clamp(0, calc(var(--dock-morph-t) / 0.6), 1));
}

/* BG.W-DOCK-PANE-OVERLAP (§2.2 vocab b) — the STANDALONE-stack box FLIP is monotonic
   between the two pre-measured endpoints. `useLayerTransition` (the standalone driver —
   a nested group defers to the orchestrator's convex-blend box, already monotonic, and
   NEVER carries these vars) reserves the MAX endpoint on the morph axis (one layout
   solve → the grid shrink-wrap is CAPPED, so the box can never dip BELOW the smaller
   endpoint) + writes a compositor `--dock-stack-reveal` fraction per frame; here the
   reserve applies + a `clip-path: inset()` APERTURE reveals the reserved box from the
   leading edge, so the plate glides A→B without the mid-flight shrink-wrap collapse HEAD
   painted. Content-RIGID (the aperture reveals, it does NOT scale the panes — glyphs
   never distort, the W-DOCK-GLYPH-RIGID discipline preserved on the standalone path).
   Compositor-only (`clip-path`, never a per-frame layout write — the
   `proof:no-layout-animation` floor). The VAR PRESENCE is the gate (the engine writes
   them only for the standalone path); the vars are absent at rest, so at settle the box
   hands back to the natural grid shrink-wrap. */
.dock-layer-group.horizontal
    .dock-layer-stack[style*="--dock-stack-morph-reserve"] {
    inline-size: var(--dock-stack-morph-reserve);
    /* reveal from the LEADING (inline-start) edge: clip the trailing remainder. */
    clip-path: inset(0 calc((1 - var(--dock-stack-reveal, 1)) * 100%) 0 0);
    will-change: clip-path;
}
.dock-layer-group.vertical
    .dock-layer-stack[style*="--dock-stack-morph-reserve"] {
    block-size: var(--dock-stack-morph-reserve);
    /* reveal from the TOP (block-start) edge: clip the bottom remainder. */
    clip-path: inset(0 0 calc((1 - var(--dock-stack-reveal, 1)) * 100%) 0);
    will-change: clip-path;
}
</style>
