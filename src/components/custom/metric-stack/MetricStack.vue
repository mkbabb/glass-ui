<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "../../../utils";

/**
 * MetricStack — the layout shell that hosts a stack of <MetricRow> children.
 *
 * Owns:
 *  - container-query host (`container-type: inline-size`) with a configurable
 *    `container-name` so each row can rebind layout against the same name.
 *  - 4-column subgrid track template (`icon | label | value | unit`). All
 *    rows inherit via `grid-template-columns: subgrid`.
 *  - the `--phase-color` cascade origin — consumers can retint individual
 *    rows by setting `--phase-color` at the row-level inline style.
 *  - the audacious-poster row register (the value clamp + tabular-nums
 *    + ss01 register live at MetricRow; the stack reserves a min-block-size
 *    to pre-allocate against the row hero clamp so the surface doesn't CLS
 *    while the values fade in).
 *
 * AC.W6d — promoted from speedtest/ResultStack.vue. The W3.5 era
 * `.results-stack` rules absorb directly. Consumers configure their phase
 * colours per row + describe their digit-counts so the value clamp shrinks
 * proportionally as 4-digit values arrive.
 *
 * The `as` prop lets the stack render as a Vue `<TransitionGroup>` (with
 * `tag="div"`) when the consumer needs per-row enter/leave animation
 * while preserving the immediate-child subgrid contract. Pass the
 * component (e.g. `TransitionGroup`) plus the relevant transition props
 * (`name`, `appear`, etc.) — they're forwarded via `v-bind="$attrs"`.
 */

type MetricStackVariant = string | undefined;
type MetricStackAs = string | Component;

const props = withDefaults(
    defineProps<{
        /**
         * Container-name handle for the inline-size container. Children
         * can `@container <name>` against this for responsive
         * promotion (e.g. the description row appearing at ≥ 32rem).
         */
        containerName?: string;
        /**
         * Variant tag mirrored to a `data-variant` attribute. Optional;
         * consumers use it to differentiate row-count + scale multipliers
         * (e.g. speedtest's `dpi` variant lifts `--result-row-scale: 1.25`).
         */
        variant?: MetricStackVariant;
        /**
         * Row count for the min-block-size pre-allocation. Defaults to 4
         * (the speedtest 4-metric default). The pre-allocation clamp reads
         * `clamp(4rem * rows, 48cqi, 7rem * rows)` so the panel reserves
         * a sane height even before the rows hydrate.
         */
        rows?: number;
        /**
         * Render-as tag. Defaults to `"div"`. Pass a Vue component
         * (e.g. `TransitionGroup`) when per-row enter/leave animation is
         * required and the subgrid contract must hold (the rendered root
         * is the grid container; rows are immediate children).
         */
        as?: MetricStackAs;
        class?: HTMLAttributes["class"];
    }>(),
    {
        containerName: "metric-stack",
        rows: 4,
        as: "div",
    },
);

const classes = computed(() => cn("metric-stack", "results-stack", props.class));
</script>

<template>
    <component
        :is="as"
        :class="classes"
        :data-variant="variant"
        :style="{
            '--metric-stack-rows': String(rows),
            containerName: containerName,
        }"
    >
        <slot />
    </component>
</template>

<style scoped>
/* Geometry mirrors speedtest/ResultStack.vue's `.results-stack` so the
   consumer migration is a 1:1 swap (the speedtest scoped block drops
   wholesale + the primitive owns the canon). The min-block-size
   pre-allocation pegs against `--metric-stack-rows` so consumers that
   render fewer or more rows still pre-reserve the right floor. */
.metric-stack {
    container-type: inline-size;
    width: 100%;
    max-width: min(54rem, 100%);
    margin-inline: auto;
    display: grid;
    grid-template-columns:
        [icon] minmax(0, auto)
        [label] minmax(0, auto)
        [value] minmax(0, auto)
        [unit] minmax(0, auto);
    row-gap: clamp(0.25rem, 1cqi, 0.75rem);
    column-gap: clamp(0.5rem, 2cqi, 1.25rem);
    --result-row-scale: 1;
    /* Pre-allocate against the rows count so 2-row variants don't
       reserve the same floor as 4-row variants. The floor is 4rem/row,
       the ceiling 7rem/row; the cqi term floats between them so taller
       containers expand proportionally. */
    min-block-size: clamp(
        calc(4rem * var(--metric-stack-rows, 4)),
        48cqi,
        calc(7rem * var(--metric-stack-rows, 4))
    );
}

/* Variant scale knob — consumers tag their stack via the `variant`
   prop and the consumer-side @container rule (or a custom prop)
   adjusts `--result-row-scale`. The primitive ships one example: a
   2-row stack reads at 1.25× to compensate for the missing rows. */
.metric-stack[data-variant="dpi"] {
    --result-row-scale: 1.25;
}
</style>
