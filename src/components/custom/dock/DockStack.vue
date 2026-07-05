<script setup lang="ts">
import { computed, onBeforeUnmount, ref, type Component } from "vue";
import { Layers } from "@lucide/vue";
import DockIconButton from "./DockIconButton.vue";
import FadingScroll from "../fading-scroll/FadingScroll.vue";
import { useOptionalDockContext } from "./composables/dockContext";
import { HOVER_INTENT_MS } from "./constants";
import type { DockStackItem } from "./constants";
import { projectFacets, RAIL_GOLDEN_SQ } from "./composables/railProjection";

/**
 * <DockStack> — BC.W-DOCK-STACK-RAIL + BE.W-DOCK-RAIL-REALIZE + BG.W-DOCK-RAIL-REINVENT.
 * The ONE rail engine on the KEPT `.glass-dock-frame` non-clipping escape, with TWO render
 * modes.
 *
 * BG.W-DOCK-RAIL-REINVENT — the TOPOLOGY is INVERTED (USER 07-05 + IMG_1880). At REST the
 * stack is ENTIRELY CONTAINED inside the dock box — the core reads as a normal dock icon
 * seated in the dock's own control run, distinguished ONLY by a `--dock-rail-hairline`
 * warm-ink line adjacent to it (ZERO gutter presence). On HOVER/CLICK the members FAN OUT
 * as a macOS-STACK, CROSSING the dock edge asymmetric-golden — the fan overhangs OUTWARD
 * (into the gutter) ~φ² (2.618) MORE than it reaches INWARD, the crossing weight sourced
 * ONCE from `RAIL_GOLDEN_SQ` (written to `--dock-rail-golden`, read by the CSS
 * `--dock-rail-overhang` calc). The dock box stays INVIOLATE (`deltaW = deltaH = 0`) — the
 * fan is an absolute-positioned compositor-only transform over the non-clipping frame.
 * ONE engine (a re-shape of `<DockStack>` — no second component, no second spring; the fan
 * rides the SAME `--spring-dock` clock).
 *
 *   • `mode="stack"` (DEFAULT — the BC byte-identical path). The macOS Dock
 *     hover-expand STACK: a `core` anchor glyph + N members that FAN OUT on hover/focus
 *     beside the rail, each a clear `--glass-bg-floating` glass icon.
 *
 *   • `mode="facets"` (BE.W-DOCK-RAIL-REALIZE — the re-instated AZ context carousel).
 *     The members render as a CONTEXT CAROUSEL — a flex strip of facet-CHIPS that fans
 *     in the SAME gutter, each chip carrying its OWN `--glass-accent` hue (the
 *     per-instance chromatic-rim axis), the active facet lit on the selected-as-glass
 *     `--dock-control-active-bg` tier. Clicking a chip writes the consumer-owned
 *     `v-model:selected`. This is a RENDER MODE, NOT a second component — there is no
 *     `DockRail.vue`/`DockFacetRail.vue`; `<DockStack>` owns both modes.
 *
 * THE KEPT ESCAPE (both modes). It renders in `GlassDock`'s `#rail` slot, over the
 * `.glass-dock-frame` shell — a `display:contents`-by-default wrapper that becomes a
 * NON-clipping positioning context only on `data-has-rail`, so the rail extends BEYOND
 * the dock edge into its own gutter WITHOUT touching the dock box (the box-INVIOLATE
 * discipline — `deltaW = deltaH = 0`; the chips feed NO size into the dock's intrinsic
 * box).
 *
 * 3 CONFIGURABLE, SCROLLABLE, N-STACK (both modes). `visibleCount` (default 3) members
 * fan at rest; an >visibleCount set routes the fanned strip through `<FadingScroll>`
 * (the one scroll-fade port) so the n-set is reachable by scrolling the rail, NOT by
 * overflowing the dock box.
 *
 * THE HOVER-HYSTERESIS (REUSED, not re-forked — AZ.W-DOCK-FLICKER). The pointer-enter
 * commits the open only after the `HOVER_INTENT_MS` intent-dwell. Focus opens
 * immediately; blur/leave closes.
 *
 * ONE REGISTRY (R4 KEPT). The members write the consumer-owned `v-model:selected`; this
 * primitive owns NO internal `ref()`/`reactive()` shadow of the active member. The hover
 * `expanded` is a transient UI state (optionally `v-model:expanded` controlled), NOT a
 * selection shadow.
 */

const props = withDefaults(
    defineProps<{
        /** The stack/facet members — the fan-out contents. */
        items: readonly DockStackItem[];
        /**
         * The render mode. `"stack"` (default) = the macOS hover-expand glyph fan (the BC
         * byte-identical path). `"facets"` = the re-instated AZ context carousel of
         * accent-tinted facet chips (each chip writes its own `--glass-accent` hue).
         */
        mode?: "stack" | "facets";
        /** The core anchor glyph (the always-visible dock(1) item). Default: a layers glyph. */
        core?: Component;
        /** The core's accessible label (the stack's name). */
        coreLabel?: string;
        /** Members visible in the fan before it overflows (the verbatim "3 configurable"). */
        visibleCount?: number;
        /**
         * BG.W-DOCK-RAIL-REINVENT — the DISPLAY-OPTIONS axis (the user's "number of elements
         * to show, wrapping"). When `false` (default) a >`visibleCount` fan SCROLLS through
         * the ONE `<FadingScroll>` port; when `true` it WRAPS into a second rank instead of
         * scrolling. Additive default-off (the scroll path is byte-identical).
         */
        wrap?: boolean;
        /** Which dock edge the stack anchors to. */
        position?: "start" | "end";
    }>(),
    {
        mode: "stack",
        coreLabel: "Open stack",
        visibleCount: 3,
        wrap: false,
        position: "end",
    },
);

const emit = defineEmits<{ select: [id: string] }>();

/* The consumer-owned selected member (R4 — the only selection write is through this
   v-model ref; no internal store). */
const selected = defineModel<string>("selected");

/* The transient hover/focus expand state — a UI concern, optionally controlled by the
   consumer (`v-model:expanded`). NOT a selection shadow. */
const expanded = defineModel<boolean>("expanded", { default: false });

/* The orientation read — the stack fans on the dock's CROSS axis. Defaults to vertical
   so the stack renders standalone too. */
const dock = useOptionalDockContext();
const orientation = computed(() => dock?.orientation.value ?? "vertical");

const CoreIcon = computed<Component>(() => props.core ?? Layers);

const members = computed<DockStackItem[]>(() => [...props.items]);
/* The fan SCROLLS when the member count exceeds visibleCount; otherwise the FadingScroll
   port is inert (no overflow to feather). */
const scrolls = computed(() => members.value.length > props.visibleCount);
/* The fanned port's main-axis budget caps at visibleCount members (the rest scroll). */
const visibleBudget = computed(() => Math.min(members.value.length, props.visibleCount));

const isFacets = computed(() => props.mode === "facets");

/* BE.W-DOCK-RAIL-REALIZE — the facet-carousel PROJECTION (facets mode only). The
   harvested PURE φ-tier/ring math (`projectFacets`, railProjection.ts — the spike's only
   keepable: the ringOffset modulo + the tiered span) gives each facet its DEPTH read: a
   recession SCALE + OPACITY keyed off the signed shortest-arc distance from the ACTIVE
   facet, so the strip reads as a tiered context carousel (the active forward + full, the
   neighbours receding) — NOT a flat row. The translate is owned by the flex layout (the
   gutter strip); the projection owns the compositor-only scale/opacity tier. Re-projects
   off `selected`/the item set. (Stack mode never reads it — the macOS glyph fan owns its
   own fold→expand transition.) */
const activeFacetIndex = computed(() =>
    Math.max(0, members.value.findIndex((m) => m.id === selected.value)),
);
const facetProjection = computed(() =>
    isFacets.value
        ? projectFacets(members.value.length, activeFacetIndex.value, 1)
        : [],
);
/** The per-facet depth tier (scale + opacity), keyed by ring index — the projection's
 *  compositor-only recession read. Defaults to the identity (1/1) for a missing index. */
function facetTier(index: number): { scale: number; opacity: number } {
    const p = facetProjection.value.find((f) => f.index === index);
    return p ? { scale: p.scale, opacity: p.opacity } : { scale: 1, opacity: 1 };
}

/* The hover-hysteresis (REUSED — the SAME HOVER_INTENT_MS the dock-collapse machine reads,
   AZ.W-DOCK-FLICKER). A sweeping-edge pointer-enter is canceled by a chasing leave inside
   the intent dwell, so the strip never flashes open. Focus opens immediately. */
let intentTimer: ReturnType<typeof setTimeout> | null = null;
function clearIntent(): void {
    if (intentTimer != null) {
        clearTimeout(intentTimer);
        intentTimer = null;
    }
}
function onPointerEnter(): void {
    clearIntent();
    intentTimer = setTimeout(() => {
        expanded.value = true;
        intentTimer = null;
    }, HOVER_INTENT_MS);
}
function onPointerLeave(): void {
    clearIntent();
    expanded.value = false;
}
function onFocusIn(): void {
    clearIntent();
    expanded.value = true;
}
function onFocusOut(event: FocusEvent): void {
    // Only collapse when focus leaves the whole stack (not on inner member traversal).
    const next = event.relatedTarget as Node | null;
    const root = event.currentTarget as HTMLElement | null;
    if (root && next && root.contains(next)) return;
    expanded.value = false;
}
onBeforeUnmount(clearIntent);

function select(item: DockStackItem): void {
    selected.value = item.id;
    item.onSelect?.();
    emit("select", item.id);
}
</script>

<template>
    <div
        class="dock-stack"
        :class="[orientation, `at-${position}`, `mode-${mode}`, { 'is-expanded': expanded, 'is-wrap': wrap }]"
        :data-orientation="orientation"
        :data-mode="mode"
        :style="{
            // BG.W-DOCK-RAIL-REINVENT — the φ² crossing weight, sourced ONCE from
            // RAIL_GOLDEN_SQ. The element-level `--dock-rail-overhang` calc (stack-rail.css)
            // reads it, so JS and CSS share ONE φ² constant (the CSS 2.618 fallback mirrors it).
            '--dock-rail-golden': RAIL_GOLDEN_SQ,
            // the visible-member budget the fan STRIP length (and thus the golden crossing
            // reaches) derive from — declared on the root so the .dock-stack overhang calc
            // reads it (a fan-only write would not reach the ancestor derivation).
            '--dock-stack-visible': visibleBudget,
        }"
        @pointerenter="onPointerEnter"
        @pointerleave="onPointerLeave"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
    >
        <!-- The CORE anchor — the always-visible dock(1) item. Hover/focus fans the
             strip open. It is the named expand control (the strip's accessible name). -->
        <DockIconButton
            type="button"
            class="dock-stack-core"
            :aria-label="coreLabel"
            :aria-expanded="expanded"
            :title="coreLabel"
        >
            <component :is="CoreIcon" class="size-4" aria-hidden="true" />
        </DockIconButton>

        <!-- The fanned members — a FadingScroll port (the one scroll-fade port) holding
             the n-set. At rest the members are folded behind the core (opacity 0,
             translated toward the rail); expanded, they spring OUT staggered.

             mode="stack": every member is a clear --glass-bg-floating glass icon.
             mode="facets": every member is an ACCENT-tinted context chip — it writes its
             own `--glass-accent` (the per-instance chromatic-rim axis) so each context
             facet carries its OWN rim+glint hue (the AZ context-carousel identity). -->
        <FadingScroll
            :axis="orientation === 'vertical' ? 'x' : 'y'"
            class="dock-stack-fan"
            :data-scrolls="(scrolls && !wrap) || undefined"
            :data-wrap="wrap || undefined"
        >
            <DockIconButton
                v-for="(item, i) in members"
                :key="item.id"
                type="button"
                class="dock-stack-member"
                :class="{ 'is-active': selected === item.id, 'dock-facet-chip': isFacets }"
                :style="{
                    '--i': i,
                    // BE.W-DOCK-RAIL-REALIZE — the per-facet accent hue (facets mode
                    // only). A complete <color> tinting the chip's rim+glint via the
                    // BB.W-GLASS-ACCENT axis; the facet mode engages the strength so the
                    // hue reads, while the stack mode leaves the resting transparent/0%
                    // no-op floor untouched.
                    ...(isFacets && item.accent
                        ? { '--glass-accent': item.accent, '--glass-accent-strength': 'var(--dock-facet-accent-strength)' }
                        : {}),
                    // the φ-tier projection (facets mode) — the recession scale + opacity
                    // depth read off distance-from-active (railProjection.projectFacets).
                    ...(isFacets
                        ? {
                              '--dock-facet-tier-scale': `${facetTier(i).scale}`,
                              '--dock-facet-tier-opacity': `${facetTier(i).opacity}`,
                          }
                        : {}),
                }"
                :aria-label="item.label"
                :aria-pressed="selected === item.id"
                :title="item.label"
                @click="select(item)"
            >
                <component :is="item.icon ?? CoreIcon" class="size-4" aria-hidden="true" />
            </DockIconButton>
        </FadingScroll>
    </div>
</template>
