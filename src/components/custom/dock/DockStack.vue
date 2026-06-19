<script setup lang="ts">
import { computed, onBeforeUnmount, ref, type Component } from "vue";
import { Layers } from "@lucide/vue";
import DockIconButton from "./DockIconButton.vue";
import FadingScroll from "../fading-scroll/FadingScroll.vue";
import { useOptionalDockContext } from "./composables/dockContext";
import { HOVER_INTENT_MS } from "./constants";
import type { DockStackItem } from "./constants";

/**
 * <DockStack> — BC.W-DOCK-STACK-RAIL. The macOS Dock hover-expand STACK (the clean-break
 * rebuild of the retired divider-carousel `DockRail`). It renders in `GlassDock`'s `#rail`
 * slot, over the KEPT `.glass-dock-frame` non-clipping escape, so it extends BEYOND the
 * dock edge into its own gutter WITHOUT touching the dock box (the box-INVIOLATE
 * discipline — `deltaW = deltaH = 0`).
 *
 * THE STACK. A `core` anchor item (the always-visible glyph, sitting in the dock(1)) +
 * `items: readonly DockStackItem[]` (the members). On hover (pointer-enter) OR focus of
 * the core item, the members FAN OUT next to the rail — a column (vertical dock) / row
 * (horizontal dock) of FULLY-VISIBLE glass icons springing open beside the line, each on
 * the iOS liquid clock, staggered by `--dock-stack-stagger * var(--i)` in reading order.
 * The hover-collapse reverses on the no-overshoot `--ease-out`. Every member is a clear
 * `--glass-bg-floating` glass icon — NEVER a shadowed half-tucked chip (the "NOT shadowed"
 * verbatim ask). At rest only the core (1) shows; expanded, the n members.
 *
 * 3 CONFIGURABLE, SCROLLABLE, N-STACK. `visibleCount` (default 3) members fan at rest;
 * an >visibleCount stack routes the fanned column through `<FadingScroll>` (the one
 * scroll-fade port) so the n-stack is reachable by scrolling the rail, NOT by overflowing
 * the dock box.
 *
 * THE HOVER-HYSTERESIS (REUSED, not re-forked — AZ.W-DOCK-FLICKER). The pointer-enter
 * commits the open only after the `HOVER_INTENT_MS` intent-dwell (the SAME constant the
 * dock-collapse hysteresis reads), so a sweeping-edge enter does not flash the stack open.
 * Focus opens immediately (keyboard intent is explicit); blur/leave closes.
 *
 * ONE REGISTRY (R2 KEPT). The members write the consumer-owned `v-model:selected`; this
 * primitive owns NO internal `ref()`/`reactive()` shadow of the active member. The hover
 * `expanded` is a transient UI state (optionally `v-model:expanded` controlled), NOT a
 * selection shadow.
 */

const props = withDefaults(
    defineProps<{
        /** The stack members — the fan-out contents (NOT facet chips; the macOS stack). */
        items: readonly DockStackItem[];
        /** The core anchor glyph (the always-visible dock(1) item). Default: a layers glyph. */
        core?: Component;
        /** The core's accessible label (the stack's name). */
        coreLabel?: string;
        /** Members visible at rest before scrolling (the verbatim "3 configurable"). */
        visibleCount?: number;
        /** Which dock edge the stack anchors to. */
        position?: "start" | "end";
    }>(),
    {
        coreLabel: "Open stack",
        visibleCount: 3,
        position: "end",
    },
);

const emit = defineEmits<{ select: [id: string] }>();

/* The consumer-owned selected member (R2 — the only selection write is through this
   v-model ref; no internal store). */
const selected = defineModel<string>("selected");

/* The transient hover/focus expand state — a UI concern, optionally controlled by the
   consumer (`v-model:expanded`). NOT a selection shadow. */
const expanded = defineModel<boolean>("expanded", { default: false });

/* The orientation read — the stack fans on the dock's CROSS axis (a vertical dock's stack
   fans as a row beside the column; a horizontal dock's fans as a column above the row).
   Defaults to vertical so the stack renders standalone too. */
const dock = useOptionalDockContext();
const orientation = computed(() => dock?.orientation.value ?? "vertical");

const CoreIcon = computed<Component>(() => props.core ?? Layers);

const members = computed<DockStackItem[]>(() => [...props.items]);
/* The fan SCROLLS when the member count exceeds visibleCount; otherwise the FadingScroll
   port is inert (no overflow to feather). */
const scrolls = computed(() => members.value.length > props.visibleCount);
/* The fanned port's main-axis budget caps at visibleCount members (the rest scroll). */
const visibleBudget = computed(() => Math.min(members.value.length, props.visibleCount));

/* The hover-hysteresis (REUSED — the SAME HOVER_INTENT_MS the dock-collapse machine reads,
   AZ.W-DOCK-FLICKER). A sweeping-edge pointer-enter is canceled by a chasing leave inside
   the intent dwell, so the stack never flashes open. Focus opens immediately. */
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
        :class="[orientation, `at-${position}`, { 'is-expanded': expanded }]"
        :data-orientation="orientation"
        @pointerenter="onPointerEnter"
        @pointerleave="onPointerLeave"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
    >
        <!-- The CORE anchor — the always-visible dock(1) item. Hover/focus fans the stack
             open. It is the named expand control (the stack's accessible name). -->
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
             the n-stack. At rest the members are folded behind the core (opacity 0,
             translated toward the rail); expanded, they spring OUT staggered. Every member
             is a fully-visible --glass-bg-floating glass icon (the "NOT shadowed" ask). -->
        <FadingScroll
            :axis="orientation === 'vertical' ? 'x' : 'y'"
            class="dock-stack-fan"
            :style="{ '--dock-stack-visible': visibleBudget }"
            :data-scrolls="scrolls || undefined"
        >
            <DockIconButton
                v-for="(item, i) in members"
                :key="item.id"
                type="button"
                class="dock-stack-member"
                :class="{ 'is-active': selected === item.id }"
                :style="{ '--i': i }"
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
