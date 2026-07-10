<script setup lang="ts">
// DemoMatrix — the MATRIX demo KIND (BG.W-STORY-PAGE-API §4-D taxonomy).
//
// A responsive GRID of specimen cells — the variant matrix / dot grid / the
// repetition tiles ("size × variant", a swatch wall, a preset gallery). It is a
// GROUP of `<DemoSpecimen>` cells (the "matrix of specimens" — each cell inherits
// the glassy-card conformity) under ONE canonical `<StorySection>` group header,
// laid out on an auto-fit grid so the count reflows without a bespoke per-page
// grid recipe.
//
// Pass `:cells` (each `{ id, heading?, label? }`) — the matrix renders a
// `<DemoSpecimen>` per cell and hands the cell body to the scoped `#cell` slot.
// The bare `<slot/>` hosts arbitrary matrix content when the data shape does not
// fit `:cells`.
//
// A demo-private chassis primitive — NOT a library export.
import { computed, type HTMLAttributes } from "vue";
import StorySection from "../stories/StorySection.vue";
import DemoSpecimen from "./DemoSpecimen.vue";

export interface DemoMatrixCell {
    id: string | number;
    heading?: string;
    label?: string;
}

const props = withDefaults(
    defineProps<{
        /** The GROUP heading — the canonical `<StorySection>` <h2> section rung. */
        heading?: string;
        label?: string;
        blurb?: string;
        /** The specimen cells (each a glassy sub-card). */
        cells?: readonly DemoMatrixCell[];
        /** The min cell inline-size the auto-fit grid reflows against. */
        minCell?: string;
        /** The glass tier each cell composes. */
        tier?: "wash" | "quiet" | "resting" | "floating";
        class?: HTMLAttributes["class"];
    }>(),
    { minCell: "16rem", tier: "quiet" },
);

const gridStyle = computed(() => ({
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: `repeat(auto-fit, minmax(${props.minCell}, 1fr))`,
}));
</script>

<template>
    <StorySection :heading="heading" :label="label" :blurb="blurb" :class="$props.class">
        <div class="demo-matrix" :style="gridStyle">
            <!-- The data-driven matrix of specimens — one glassy cell per entry. -->
            <DemoSpecimen
                v-for="cell in cells"
                :key="cell.id"
                :tier="tier"
                pad="sm"
                :heading="cell.heading"
                :label="cell.label"
            >
                <slot name="cell" :cell="cell" />
            </DemoSpecimen>

            <!-- The escape hatch for matrix content that does not fit `:cells`. -->
            <slot />
        </div>
    </StorySection>
</template>
