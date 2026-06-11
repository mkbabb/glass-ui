<script setup lang="ts">
import { computed, type Component } from "vue";
import { ChevronRight } from "@lucide/vue";
import DockIconButton from "./DockIconButton.vue";
import { useOptionalDockContext } from "./composables/dockContext";
import type { DockRailItem } from "./constants";

/**
 * <DockRail> — AZ.W-RAIL-EXTEND → AZ.W-RAIL3. The hairline-borne, floating
 * CAROUSEL-LIKE chip STRIP: a row/column of detached glass chips that ride a
 * VISIBLE hairline running BEYOND the dock edge, OUTSIDE the dock box. Each chip
 * is one context/facet; clicking it switches the dock's layer context. The strip
 * is rendered in `GlassDock`'s `#rail` slot OUTSIDE the clipped morph aperture (the
 * `.glass-dock-frame` escape), so it NEVER changes the dock's width/height — the
 * dock box is INVIOLATE (R6 §"design REDIRECT" item 1) — and it PERSISTS when the
 * dock collapses (the in-pane switcher rail vanishes on collapse; this one does not).
 *
 * W-RAIL3 EVOLUTION (the third-rail redirect). The prior facility was a single
 * end-icon (one `DockIconButton` cycling `entries` through an invisible list behind
 * a chevron). The contextual facets used to mount as an in-dock `<DockLayerGroup>`,
 * which stretched the dock box ~2× (the R6-1/R6-2 inflation). This wave MOVES the
 * facets OUT of the dock onto THIS rail as the visible chips — "a floating carousel
 * almost" (the user's words). The chips ARE the facets (id + label + icon); the
 * active one is highlighted; when a context carries more chips than fit inline the
 * strip scrolls/cycles (CSS `overflow` + `scroll-snap`).
 *
 * Axis-aware (the `<DockSeparator>` idiom, read via `useOptionalDockContext()`):
 *   - column dock (vertical)  → the strip hangs BELOW the dock as a horizontal row
 *     of chips on a horizontal hairline (the dock is a narrow column; a horizontal
 *     chip row reads as the carousel below it).
 *   - row dock (horizontal)   → the strip runs BELOW the dock's bottom edge as a
 *     horizontal row of chips on the connective hairline.
 * The hairline is composed from the `--border-hairline` token pair (the 0.5px
 * catch-light + under-shadow the dock + instrument-chassis already speak) — a
 * whisper, NEVER a hard `1px solid` rule (R3). The beyond-edge overrun is
 * `--dock-rail-extend-length` (a dock-scoped geometry knob, consumer-overridable).
 *
 * The layer-context binding (R2 — one registry, NOT a parallel state path):
 *   The chips write the consumer-owned `v-model:context` — the SAME ref the consumer
 *   binds to its navigation state (or `<DockLayerGroup v-model:active>`). There is no
 *   internal `ref()`/`reactive()` shadow of the active state inside this facility; the
 *   context ref lives in the consumer, and `<DockRail>` only writes it. Pass `items`
 *   (the facet descriptors → the visible chips); a chip click writes its id AND emits
 *   `@advance` with it so a consumer can wire its own selection logic. (The prior
 *   single-end-icon `entries?: string[]` prop died with the evolution — a clean
 *   break, no alias; every consumer passes `items`.)
 */

const props = withDefaults(
    defineProps<{
        /**
         * `"beyond"` (default) overruns the hairline past the dock content box by
         * `--dock-rail-extend-length`; `"inset"` keeps it flush at the edge (the
         * separator-like length).
         */
        extent?: "beyond" | "inset";
        /** Which dock edge the rail anchors to (the leading/trailing end). */
        position?: "start" | "end";
        /**
         * The chip descriptors — the visible facets the strip renders. When present,
         * the strip is a CAROUSEL of these chips (the W-RAIL3 evolution). The active
         * chip (matching `v-model:context`) is highlighted; a click writes its id.
         */
        items?: readonly DockRailItem[];
        /**
         * The fallback chevron glyph (the cycle end-cap shown when no `items`
         * entry carries an icon). Default: a chevron.
         */
        icon?: Component;
        /** Accessible label for the strip group. */
        iconLabel?: string;
    }>(),
    {
        extent: "beyond",
        position: "end",
        iconLabel: "Switch dock context",
    },
);

/**
 * The dock's active layer context — a CONSUMER-OWNED model (the R2 sanctioned seam).
 * The consumer binds the SAME ref here and to its navigation state; this facility
 * owns NO shadow store of the active state. `defineModel` is the consumer's ref
 * reached through the v-model contract, not an internal `ref()`.
 */
const context = defineModel<string>("context");

const emit = defineEmits<{ advance: [next: string | undefined] }>();

/* The orientation read — the `<DockSeparator>` idiom. A row dock paints a horizontal
   hairline; a column dock hangs the strip below. The optional context defaults to
   horizontal so the rail renders standalone too. */
const dock = useOptionalDockContext();
const orientation = computed(() => dock?.orientation.value ?? "horizontal");

const FallbackIcon = computed<Component>(() => props.icon ?? ChevronRight);

/* The resolved chip list. `items` drives the visible chips; when absent the strip
   renders nothing (a no-op rail). */
const chips = computed<DockRailItem[]>(() =>
    props.items && props.items.length > 0 ? [...props.items] : [],
);

/* Select a chip — write the consumer-owned context to its id (R2: the only state
   write is through the v-model ref; no internal store). Always emits the id so a
   consumer can own the transition. */
function select(id: string): void {
    context.value = id;
    emit("advance", id);
}
</script>

<template>
    <div
        class="dock-hairline-extend"
        :class="[orientation, `extent-${extent}`, `at-${position}`]"
        :data-orientation="orientation"
        role="group"
        :aria-label="iconLabel"
    >
        <!-- The floating carousel strip — N detached glass chips on the connective
             hairline, OUTSIDE the dock box. The active chip (matching the
             consumer-owned `v-model:context`) is highlighted; a click writes its id
             (one registry, not a parallel store). The strip scrolls/cycles when the
             chips exceed the inline budget (CSS overflow + scroll-snap). -->
        <div class="dock-hairline-strip" role="tablist" :aria-label="iconLabel">
            <DockIconButton
                v-for="chip in chips"
                :key="chip.id"
                type="button"
                class="dock-hairline-extend-chip"
                :class="{ 'is-active': context === chip.id }"
                role="tab"
                :aria-selected="context === chip.id"
                :aria-label="chip.label"
                :title="chip.label"
                @click="select(chip.id)"
            >
                <component :is="chip.icon ?? FallbackIcon" class="size-4" />
                <span class="dock-hairline-extend-chip-label">{{ chip.label }}</span>
            </DockIconButton>
        </div>
    </div>
</template>
