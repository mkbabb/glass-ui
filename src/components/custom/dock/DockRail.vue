<script setup lang="ts">
import { computed, type Component } from "vue";
import { ChevronRight } from "@lucide/vue";
import DockIconButton from "./DockIconButton.vue";
import { useOptionalDockContext } from "./composables/dockContext";

/**
 * <DockRail> — AZ.W-RAIL-EXTEND. The net-new hairline-rail facility: an extended
 * dividing line that runs BEYOND the dock edge, carrying a leading/trailing end-icon
 * that switches the dock's layer context.
 *
 * This EXTENDS the `<DockSeparator>` idiom (the orientation-aware perpendicular
 * paint, reading `useOptionalDockContext()`) past the dock content box, and adds the
 * one thing the separator cannot: a beyond-edge extent + a context-switch end-icon.
 * It is dock CHROME — rendered in `GlassDock`'s `#rail` slot OUTSIDE the clipped
 * morph aperture, so the hairline + its end-icon PERSIST when the dock collapses (the
 * in-pane switcher rail vanishes on collapse; this one does not).
 *
 * Axis-aware (the `<DockSeparator>` idiom):
 *   - row dock (horizontal)   → a VERTICAL hairline that overruns past the BLOCK edge
 *   - column dock (vertical)  → a HORIZONTAL rule that overruns past the BLOCK edge
 * The hairline is composed from the `--border-hairline` token pair (the 0.5px
 * catch-light + under-shadow the dock + instrument-chassis already speak) — a whisper,
 * NEVER a hard `1px solid` rule. The beyond-edge overrun is `--dock-rail-extend-length`
 * (a dock-scoped geometry knob, consumer-overridable).
 *
 * The layer-context binding (R2 — one registry, NOT a parallel state path):
 *   The end-icon writes the consumer-owned `v-model:context` — the SAME ref the
 *   consumer binds to `<DockLayerGroup v-model:active>`. There is no internal
 *   `ref()`/`reactive()` shadow of the active state inside this facility; the context
 *   ref lives in the consumer, and `<DockRail>` only writes it (the sanctioned
 *   no-group seam — the consumer's ref, not the facility's store). Pass `entries`
 *   (the ordered context ids) so the end-icon advances to the next id; click also
 *   emits the resolved id so a consumer can wire its own selection logic.
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
        /** The end-icon glyph (default: a chevron — "advance the context"). */
        icon?: Component;
        /**
         * The ordered context ids the end-icon cycles through. When present, a click
         * advances `v-model:context` to the next id (wrapping). Optional: a consumer
         * can instead listen to `@advance` and own the transition.
         */
        entries?: readonly string[];
        /** Accessible label for the end-icon control. */
        iconLabel?: string;
    }>(),
    {
        extent: "beyond",
        position: "end",
        iconLabel: "Switch dock context",
    },
);

/**
 * The dock's active layer context — a CONSUMER-OWNED model (the R2 sanctioned seam
 * ii). The consumer binds the SAME ref to `<DockLayerGroup v-model:active>` and here;
 * this facility owns NO shadow store of the active state. `defineModel` is the
 * consumer's ref reached through the v-model contract, not an internal `ref()`.
 */
const context = defineModel<string>("context");

const emit = defineEmits<{ advance: [next: string | undefined] }>();

/* The orientation read — the `<DockSeparator>` idiom. A row dock paints a vertical
   hairline; a column dock paints a horizontal rule (both overrun the block edge). The
   optional context defaults to horizontal so the rail renders standalone too. */
const dock = useOptionalDockContext();
const orientation = computed(() => dock?.orientation.value ?? "horizontal");

const EndIcon = computed<Component>(() => props.icon ?? ChevronRight);

/* Advance the consumer-owned context to the NEXT id in `entries` (wrapping). Writes
   ONLY through the v-model ref — no internal active-state store. Always emits the
   resolved next id so a consumer without `entries` can own the transition. */
function advance(): void {
    const ids = props.entries;
    if (ids && ids.length > 0) {
        const i = context.value ? ids.indexOf(context.value) : -1;
        const next = ids[(i + 1) % ids.length];
        context.value = next;
        emit("advance", next);
        return;
    }
    emit("advance", context.value);
}
</script>

<template>
    <div
        class="dock-hairline-extend"
        :class="[orientation, `extent-${extent}`, `at-${position}`]"
        :data-orientation="orientation"
        role="separator"
        :aria-orientation="orientation === 'vertical' ? 'horizontal' : 'vertical'"
    >
        <!-- The end-icon is a real DockIconButton context control — it writes the
             consumer-owned `v-model:context` (one registry, not a parallel store). It
             sits at the `position` end of the overrun. -->
        <DockIconButton
            type="button"
            class="dock-hairline-extend-icon"
            :aria-label="iconLabel"
            @click="advance"
        >
            <slot name="icon">
                <component :is="EndIcon" class="size-4" />
            </slot>
        </DockIconButton>
    </div>
</template>
