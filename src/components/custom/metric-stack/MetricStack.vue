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

export interface MetricStackProps {
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
    variant?: string;
    /**
     * Typographic register, mirrored to a `data-register` attribute.
     *
     *  - `"audacious"` (default) — the poster-scale hero register: the
     *    value clamp peaks at `--type-display-hero` (~287px). This is the
     *    register for a single giant number the user watches climb. The
     *    default writes NOTHING, so every existing consumer is untouched.
     *  - `"result"` — a compact, scannable ledger register: the value
     *    clamp peaks at `3.5rem`, the binding `cqi` arm drops to `11cqi`.
     *    This is the register for a multi-row stack of FINISHED values
     *    (e.g. speedtest's complete-screen `ResultStack`), where all rows
     *    plus surrounding chrome must seat inside a bounded card. The
     *    `min-block-size` pre-allocation re-derives to match the compact
     *    rows so the stack reserves no dead air.
     */
    register?: "audacious" | "result";
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
    as?: string | Component;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<MetricStackProps>(), {
    containerName: "metric-stack",
    rows: 4,
    as: "div",
    register: "audacious",
});

const classes = computed(() => cn("metric-stack", "results-stack", props.class));
</script>

<template>
    <component
        :is="as"
        :class="classes"
        :data-variant="variant"
        :data-register="register"
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

/* Compact result register (AE.W1 Cluster A). The default `audacious`
   register is the poster-scale hero clamp — correct for a single giant
   number the user watches climb, wrong for a multi-row ledger of
   finished values that must seat inside a bounded card. The `result`
   register retunes all three clamp arms — including the binding `cqi`
   middle arm — down to a compact, scannable register so a 4-row (or
   2-row, dpi) stack fits the chassis budget with zero clip and zero
   scroll. The `audacious` default writes none of these tokens, so the
   poster register is preserved bit-for-bit for every other consumer. */
.metric-stack[data-register="result"] {
    --metric-row-value-clamp-min: 2rem;
    --metric-row-value-clamp-cqi: 11cqi;
    --metric-row-value-clamp-max: 3.5rem;
    --metric-row-unit-clamp-min: 0.875rem;
    --metric-row-unit-clamp-max: 1.5rem;

    /* Re-derive the CLS pre-allocation against the compact register. The
       default `clamp(4rem×rows, 48cqi, 7rem×rows)` floor is sized for the
       poster rows; under the result register the rows are ~2.75-4.5rem
       tall, so the pre-allocation shrinks to match — otherwise the stack
       reserves a poster-height floor for compact content and the surplus
       reads as dead air. Scales with `--metric-stack-rows` so the 2-row
       dpi stack reserves proportionally less than the 4-row default. */
    min-block-size: clamp(
        calc(2.75rem * var(--metric-stack-rows, 4)),
        28cqi,
        calc(4.5rem * var(--metric-stack-rows, 4))
    );
}
</style>
