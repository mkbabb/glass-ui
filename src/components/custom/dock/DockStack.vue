<script setup lang="ts">
import { computed, useId, useTemplateRef, type Component } from "vue";
import { Layers } from "@lucide/vue";
import DockControl from "./DockControl.vue";
import FadingScroll from "../fading-scroll/FadingScroll.vue";
import { useOptionalDockContext } from "./composables/dockContext";
import { useDockPopover, type DockPopoverAlign } from "./composables/useDockPopover";
import type { DockStackItem } from "./constants";

/**
 * <DockStack> — BI.W-DOCK-ESCAPE. The dock's satellite fan / facet strip, rebuilt as a
 * TOP-LAYER POPOVER.
 *
 * The CORE anchor is a normal in-flow dock control (the popover invoker). Its members FAN
 * OUT of a native `popover` surface promoted to the TOP LAYER — exempt from ancestor
 * `overflow`/`clip`/`contain`/`transform`/`filter` BY SPEC. "Chips overlap the dock body"
 * / "the fan clips at the port end" (UF-C2) are impossible once the surface is in the top
 * layer: there is nothing to escape from. The dock box stays INVIOLATE — the fan feeds NO
 * size into the dock's intrinsic box (it is a fixed-positioned top-layer element).
 *
 * This REPLACES the retired `.glass-dock-frame` `display:contents` sibling + the
 * `railProjection.ts` φ²-crossing ring math (PASS-4B ruling 4 — an anchored flex strip
 * needs no tier math; the fan is a plain anchored flex strip in the popover).
 *
 * PLACEMENT is the JS one-shot (`useDockPopover` — a `getBoundingClientRect` on open + a
 * resize/scroll re-place, viewport-clamped). NO native CSS anchor positioning
 * (`anchor()`/`position-anchor`/`@position-try` BANKED — the SAF-1 Safari-transform-chain
 * fence). HOVER-INTENT + light-dismiss + focus-return are wired in the composable.
 *
 *   • `mode="stack"` (DEFAULT) — the macOS Dock hover-expand glyph fan: N members, each a
 *     clear `--glass-bg-floating` glass icon.
 *   • `mode="facets"` — the context carousel: each member is an ACCENT-tinted context chip
 *     writing its OWN `--glass-accent` hue (the BB.W-GLASS-ACCENT per-instance
 *     chromatic-rim axis), the active facet on the selected-as-glass tier.
 *
 * ONE REGISTRY (KEPT). The members write the consumer-owned `v-model:selected`; this
 * primitive owns NO internal selection shadow. The hover `open` is a transient UI state.
 */

const props = withDefaults(
    defineProps<{
        /** The stack/facet members — the fan-out contents. */
        items: readonly DockStackItem[];
        /**
         * The render mode. `"stack"` (default) = the macOS hover-expand glyph fan.
         * `"facets"` = the accent-tinted context carousel (each chip writes its own
         * `--glass-accent` hue).
         */
        mode?: "stack" | "facets";
        /** The core anchor glyph (the always-visible dock(1) invoker). Default: a layers glyph. */
        core?: Component;
        /** The core's accessible label (the stack's name). */
        coreLabel?: string;
        /** Members visible in the fan before it overflows the `<FadingScroll>` port. */
        visibleCount?: number;
        /** WRAP a >`visibleCount` fan into a second rank instead of scrolling. */
        wrap?: boolean;
        /**
         * Which end of the anchor the fan aligns to (the cross-axis alignment of the
         * top-layer placement). `"end"` (default) trails the anchor's leading edge.
         */
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

/* The consumer-owned selected member (the ONLY selection write is through this v-model
   ref; no internal store). */
const selected = defineModel<string>("selected");

/* The orientation read — the fan crosses the dock's edge. Defaults vertical so the stack
   renders standalone too. */
const dock = useOptionalDockContext();
const orientation = computed(() => dock?.orientation.value ?? "vertical");

const CoreIcon = computed<Component>(() => props.core ?? Layers);
const members = computed<DockStackItem[]>(() => [...props.items]);
const isFacets = computed(() => props.mode === "facets");

/* The fan SCROLLS when the member count exceeds visibleCount; otherwise the FadingScroll
   port is inert (no overflow to feather). */
const scrolls = computed(() => members.value.length > props.visibleCount);

const fanId = `dock-stack-fan-${useId()}`;
const stackRoot = useTemplateRef<HTMLElement>("stackRoot");
const fanEl = useTemplateRef<HTMLElement>("fanEl");

/* The top-layer popover — the JS one-shot placement + the hover-intent × light-dismiss ×
   focus-return interop. The fan fans OUTWARD from the dock edge: a vertical dock fans to
   the inline-end ("right"), a horizontal (bottom) dock fans "up" (side "top"). The
   `position` prop maps to the cross-axis align. */
const popover = useDockPopover({
    anchor: () => stackRoot.value?.querySelector<HTMLElement>(".dock-stack-core") ?? null,
    popover: fanEl,
    side: () => (orientation.value === "vertical" ? "right" : "top"),
    align: computed<DockPopoverAlign>(() => (props.position === "start" ? "start" : "end")),
});

function select(item: DockStackItem): void {
    selected.value = item.id;
    item.onSelect?.();
    emit("select", item.id);
    popover.hide();
}
</script>

<template>
    <div
        ref="stackRoot"
        class="dock-stack"
        :class="[orientation, `mode-${mode}`, `at-${position}`]"
        :data-orientation="orientation"
        :data-mode="mode"
        @focusin="popover.onFocusIn"
        @focusout="popover.onFocusOut($event)"
    >
        <!-- The CORE anchor — an in-flow dock control (the popover invoker). Hover/focus
             fans the members OUT of the top-layer surface; click toggles. -->
        <DockControl
            type="button"
            class="dock-stack-core"
            :aria-label="coreLabel"
            :aria-expanded="popover.open.value"
            :aria-controls="fanId"
            :title="coreLabel"
            @pointerenter="popover.onAnchorEnter"
            @pointerleave="popover.onAnchorLeave"
            @click="popover.toggle"
        >
            <component :is="CoreIcon" class="size-4" aria-hidden="true" />
        </DockControl>

        <!-- THE FAN — a native `popover` surface, promoted to the TOP LAYER on show (exempt
             from ancestor clip/contain/transform/filter BY SPEC). `popover="manual"` +
             hand-wired dismiss (the G5-CLOSED degrade arm): hover-close, light-dismiss, and
             Esc-returns-focus are owned by useDockPopover — deterministic on both engines,
             where `popover=auto`'s light-dismiss races the hover re-open. Placement is the
             JS one-shot (`position: fixed; top/left` off getBoundingClientRect) — NO
             anchor-name/position-anchor/@position-try (banked, the SAF-1 fence).

             mode="stack": every member is a clear --glass-bg-floating glass icon.
             mode="facets": every member is an ACCENT-tinted context chip writing its own
             `--glass-accent` (the per-instance chromatic-rim axis). -->
        <div
            :id="fanId"
            ref="fanEl"
            popover="manual"
            class="dock-stack-fan"
            :class="[orientation, `mode-${mode}`, { 'mode-facets': isFacets }]"
            :data-scrolls="(scrolls && !wrap) || undefined"
            :data-wrap="wrap || undefined"
            @pointerenter="popover.onPopoverEnter"
            @pointerleave="popover.onPopoverLeave"
            @keydown.escape="popover.hide"
        >
            <FadingScroll
                :axis="orientation === 'vertical' ? 'x' : 'y'"
                class="dock-stack-fan-scroll"
                :data-scrolls="(scrolls && !wrap) || undefined"
                :data-wrap="wrap || undefined"
            >
                <DockControl
                    v-for="(item, i) in members"
                    :key="item.id"
                    type="button"
                    class="dock-stack-member"
                    :class="{ 'is-active': selected === item.id, 'dock-facet-chip': isFacets }"
                    :style="{
                        '--i': i,
                        // BB.W-GLASS-ACCENT — the per-facet accent hue (facets mode only). A
                        // complete <color> tinting the chip's rim+glint; the stack mode
                        // leaves the resting transparent/0% no-op floor untouched.
                        ...(isFacets && item.accent
                            ? { '--glass-accent': item.accent, '--glass-accent-strength': 'var(--dock-facet-accent-strength)' }
                            : {}),
                    }"
                    :aria-label="item.label"
                    :aria-pressed="selected === item.id"
                    :title="item.label"
                    @click="select(item)"
                >
                    <component :is="item.icon ?? CoreIcon" class="size-4" aria-hidden="true" />
                </DockControl>
            </FadingScroll>
        </div>
    </div>
</template>
