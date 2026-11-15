<script setup lang="ts">
// W-I.8 R-12: the controls dock. A small dock of action seats in a corner: a page's
// controls, a figure's filters, a canvas's tools, a code pane's actions, the theme seat.
// It renders one GlassDock and adds nothing to the DOM. Its run is plain (no scroll, no
// snap, no scroll timeline) and has no current page, so no open seat and no mark.
import { Comment, Fragment, Text, useAttrs, useTemplateRef, type Slots, type VNode } from "vue";
import { useMediaQuery } from "@vueuse/core";
import GlassDock from "./GlassDock.vue";
import DockSeparator from "./DockSeparator.vue";
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
/* RU-18 (C2-11): a controls dock whose run holds one control is that control, at rest,
   and never folds: no folded face, no linger, no travel. A second control (an outlet's,
   say) grows it by R-5, and from then it folds as `collapse` says.
   What counts is a control: any child of the run, a glass seat or not (a slider, a
   consumer's own element), a DockSeparator aside. Once the dock is mounted the count is
   the run's own (GlassDock's `controlCount`, which includes contributed controls);
   before that, on the server included, it is the authored slot's, so a one-control dock
   never paints its folded glyph first. Nothing is looked up in the DOM. */
const dockRef = useTemplateRef<{ controlCount?: number }>("dockRef");
function authored(nodes: VNode[]): number {
    let n = 0;
    for (const v of nodes) {
        if (v.type === Comment || v.type === Text || v.type === DockSeparator) continue;
        if (v.type === Fragment) n += Array.isArray(v.children) ? authored(v.children as VNode[]) : 0;
        else n += 1;
    }
    return n;
}
/* Called from the template, so the slot is read inside render. */
function collapseFor(slots: Slots): DockCollapse {
    const mounted = dockRef.value?.controlCount;
    const count = mounted !== undefined && mounted > 0 ? mounted : authored(slots.default?.() ?? []);
    return count === 1 ? false : (props.collapse ?? (phone.value ? "closed" : false));
}
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
        :collapse="collapseFor($slots)"
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
