<script setup lang="ts">
// W-I.8 R-12: the controls dock. A small dock of action seats in a corner: a page's
// controls, a figure's filters, a canvas's tools, a code pane's actions, the theme seat.
// It renders one GlassDock and adds nothing to the DOM. Its run is plain (no scroll, no
// snap, no scroll timeline) and has no current page, so no open seat and no mark.
import { computed, onBeforeUnmount, onMounted, ref, useAttrs, useTemplateRef } from "vue";
import { useMediaQuery } from "@vueuse/core";
import GlassDock from "./GlassDock.vue";
import { DOCK_SEAT_ATTR } from "./constants";
import type { DockCollapse } from "./composables/useDockShellProps";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        /** The toolbar's and the folded face's accessible name. */
        label: string;
        corner?: "bottom-end" | "bottom-start" | "top-end" | "top-start";
        /** `viewport`: fixed to the window, inside the safe area. `parent`: absolute in its
         *  containing block (a figure, a pane). */
        within?: "viewport" | "parent";
        /** As GlassDock's. Unset: folds on a phone, never folds wider. */
        collapse?: DockCollapse;
        pinned?: boolean;
    }>(),
    { corner: "bottom-end", within: "viewport", collapse: undefined, pinned: undefined },
);
const emit = defineEmits<{ "update:pinned": [value: boolean] }>();
const attrs = useAttrs();
const phone = useMediaQuery("(max-width: 40rem)");
/* RU-18: a controls dock whose run holds one seat is that seat, at rest, and never
   folds: no folded face, no linger, no travel. A second seat (an outlet's, say) grows it
   by R-5, and from then it folds as `collapse` says. The seats are counted on the run,
   the dock's own element, so contributed seats count. */
const dockRef = useTemplateRef<{ $el: HTMLElement }>("dockRef");
const seats = ref(0);
let mo: MutationObserver | null = null;
function countSeats(run: Element): void {
    seats.value = Array.from(run.children).filter((c) => c.hasAttribute(DOCK_SEAT_ATTR)).length;
}
onMounted(() => {
    const run = dockRef.value?.$el?.querySelector(":scope > .dock-controls > .dock-layers > .dock-run");
    if (!run) return;
    countSeats(run);
    mo = new MutationObserver(() => countSeats(run));
    mo.observe(run, { childList: true });
});
onBeforeUnmount(() => mo?.disconnect());
const collapse = computed<DockCollapse>(() =>
    seats.value === 1 ? false : (props.collapse ?? (phone.value ? "closed" : false)),
);
</script>

<template>
    <GlassDock
        ref="dockRef"
        v-bind="attrs"
        class="controls-dock"
        data-preset="controls"
        :data-corner="corner"
        :data-within="within"
        :aria-label="label"
        :collapsed-label="label"
        :collapse="collapse"
        :pinned="pinned"
        :anchor="corner.endsWith('end') ? 'end' : 'start'"
        run="plain"
        @update:pinned="(v: boolean) => emit('update:pinned', v)"
    >
        <slot />
        <template v-if="$slots.collapsed" #collapsed><slot name="collapsed" /></template>
        <template v-if="$slots.persistent" #persistent><slot name="persistent" /></template>
        <template v-if="$slots['persistent-end']" #persistent-end><slot name="persistent-end" /></template>
    </GlassDock>
</template>
