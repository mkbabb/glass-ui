<script setup lang="ts">
// W-I.8 R-12: the controls dock. A small dock of action seats in a corner: a page's
// controls, a figure's filters, a canvas's tools, a code pane's actions, the theme seat.
// It renders one GlassDock and adds nothing to the DOM. Its run is plain (no scroll, no
// snap, no scroll timeline) and has no current page, so no open seat and no mark.
import { computed, useAttrs } from "vue";
import { useMediaQuery } from "@vueuse/core";
import GlassDock from "./GlassDock.vue";
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
const collapse = computed<DockCollapse>(() => props.collapse ?? (phone.value ? "closed" : false));
</script>

<template>
    <GlassDock
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
    </GlassDock>
</template>
