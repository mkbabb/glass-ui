<script setup lang="ts">
// PermutationGrid — the cartesian variant grid the storybook schema `permute`
// driver renders (BI.W-SPECIMEN-FRAME; renamed from the BG-era DemoMatrix, kept as
// the ONE grid primitive the sub-type fold retains).
//
// A responsive GRID of specimen cells — the variant matrix / dot grid / preset
// gallery ("size × variant", a swatch wall). Each cell is a `<SpecimenFrame>` (the
// glassy-card conformity + the bounded w-full carve), laid on an auto-fit grid so
// the count reflows without a bespoke per-page grid recipe, under ONE canonical
// `<StorySection>` group header.
//
// Pass `:cells` (each `{ id, heading?, label? }`) — the grid renders a
// `<SpecimenFrame>` per cell and hands the cell body to the scoped `#cell` slot. The
// bare `<slot/>` hosts arbitrary grid content when the data shape does not fit `:cells`.
//
// A demo-private chassis primitive — NOT a library export.
import { computed, type HTMLAttributes } from "vue";
import StorySection from "./section/StorySection.vue";
import SpecimenFrame from "./showcase/SpecimenFrame.vue";

export interface PermutationGridCell {
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
        cells?: readonly PermutationGridCell[];
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
        <div class="permutation-grid" :style="gridStyle">
            <!-- The data-driven grid of specimens — one glassy cell per entry. Cells
                 fill their track (`size="fluid"`); the bounded w-full carve still
                 keeps a lone interactive cell child from ballooning. -->
            <SpecimenFrame
                v-for="cell in cells"
                :key="cell.id"
                :tier="tier"
                size="fluid"
                pad="sm"
                :heading="cell.heading"
                :label="cell.label"
            >
                <slot name="cell" :cell="cell" />
            </SpecimenFrame>

            <!-- The escape hatch for grid content that does not fit `:cells`. -->
            <slot />
        </div>
    </StorySection>
</template>
