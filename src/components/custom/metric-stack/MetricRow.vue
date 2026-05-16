<script setup lang="ts">
import type { HTMLAttributes, Component } from "vue";
import { computed } from "vue";
import { cn } from "../../../utils";

/**
 * MetricRow — a single row inside <MetricStack>.
 *
 * Reads four subgrid tracks from the parent stack: icon | label | value |
 * unit. The optional description slot promotes to a full-row block at
 * `@container metric-stack (min-width: 32rem)`.
 *
 * Owns:
 *  - the audacious-poster value clamp (`clamp(4.5rem, 34cqi × 3/max(3,
 *    --digit-count), --type-display-hero)`) — consumers pass digitCount so
 *    4-digit values shrink proportionally and stay inside the column.
 *  - the tabular-nums + ss01 + lnum font-feature register on the value
 *    cell so digits sit on tabular metrics regardless of consumer typography.
 *  - the optional `aura` slot host: the slot sits at `position: absolute;
 *    inset: 0` inside `.metric-row__value`, with the host marked
 *    `position: relative`. Consumers compose <Pulse variant="aura"> there
 *    when the row is the active metric.
 *  - per-row tint via `--phase-color` (inline style on `.metric-row` — set
 *    by the consumer per metric) cascading to value + unit when
 *    `data-color-tinted="true"`.
 *
 * AC.W6d — promoted from speedtest/ResultStack.vue's `.result-row` block.
 * Consumers stop hand-rolling the subgrid + clamp + aura host CSS and
 * instead pass props.
 */

export interface MetricRowProps {
    /**
     * Optional lucide icon component (e.g. `MoveDown`). Renders inside
     * the icon track at 16×16 by default. Pass `null` to omit; the
     * slot named `icon` overrides.
     */
    icon?: Component | null;
    /** Stroke width for the lucide icon. */
    iconStrokeWidth?: number;
    /** Icon pixel size — defaults to 16. */
    iconSize?: number;
    /** Label text — reads through the label slot when set. */
    label?: string;
    /** Value text (the audacious-poster hero number). */
    value?: string | number | null | undefined;
    /** Unit suffix — reads through the unit slot when set. */
    unit?: string;
    /** Placeholder glyph when value is empty/null. Defaults to "—". */
    placeholder?: string;
    /**
     * Per-row phase colour. Sets `--phase-color` inline so descendant
     * tints (value, unit, aura) consume the colour through the cascade.
     * Consumers that wire tints through Tailwind tokens may pass
     * `var(--chart-download)` etc.
     */
    phaseColor?: string;
    /**
     * Digit-count knob for the value clamp. The value cell shrinks as
     * `3 / max(3, digitCount)` so 4-digit values still fit the cell.
     * Pass the rendered string length; defaults to 3.
     */
    digitCount?: number;
    /**
     * When `true`, descendant value + unit promote from the neutral
     * `--foreground` colour to `var(--phase-color)`. Drives the
     * post-complete colour-tint cascade.
     */
    colorTinted?: boolean;
    /**
     * When `true`, the `aura` slot becomes visible. Consumers wire
     * this to their active-row gating (e.g. the metric being sampled).
     */
    active?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<MetricRowProps>(), {
    placeholder: "—",
    iconSize: 16,
    iconStrokeWidth: 2,
    digitCount: 3,
    colorTinted: false,
    active: false,
});

const rowStyle = computed(() => ({
    ...(props.phaseColor ? { "--phase-color": props.phaseColor } : {}),
    "--digit-count": String(props.digitCount),
}));
</script>

<template>
    <div
        :class="cn('metric-row', 'result-row', $props.class)"
        :data-color-tinted="colorTinted ? 'true' : 'false'"
        :data-row-active="active ? 'true' : 'false'"
        :style="rowStyle"
    >
        <slot name="icon">
            <component
                :is="icon"
                v-if="icon"
                class="metric-row__icon result-icon"
                :size="iconSize"
                :stroke-width="iconStrokeWidth"
                :style="phaseColor ? { color: phaseColor } : undefined"
                aria-hidden="true"
            />
        </slot>
        <slot name="label">
            <span class="metric-row__label result-label">{{ label }}</span>
        </slot>
        <span class="metric-row__value result-value tabular-nums">
            <slot name="aura" />
            <span class="metric-row__value-text relative">
                <slot name="value">{{
                    value === null || value === undefined || value === ""
                        ? placeholder
                        : value
                }}</slot>
            </span>
        </span>
        <slot name="unit">
            <span
                class="metric-row__unit result-unit font-mono italic text-muted-foreground"
                >{{ unit }}</span
            >
        </slot>
        <slot name="description" />
    </div>
</template>

<style scoped>
/* Subgrid inheritance — the row reads the parent stack's 4 tracks.
   `grid-template-rows: auto auto` opens row 2 for the optional
   description slot; `grid-auto-flow: row dense` lets the description
   self-promote to a full-row span without re-ordering the row-1 quartet. */
.metric-row {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: auto auto;
    grid-auto-flow: row dense;
    grid-column: 1 / -1;
    padding-block: clamp(0.125rem, 0.5cqi, 0.5rem);
    min-width: 0;
}

.metric-row > .metric-row__icon,
.metric-row > .metric-row__label,
.metric-row > .metric-row__value,
.metric-row > .metric-row__unit {
    align-self: baseline;
    grid-row: 1;
}

.metric-row__label {
    text-transform: uppercase;
    font-size: clamp(
        1.125rem,
        calc(5cqi * var(--result-row-scale, 1)),
        2.75rem
    );
    letter-spacing: 0.18em;
    font-weight: 500;
    color: var(--muted-foreground);
    white-space: nowrap;
}

/* Audacious-poster value register. `--digit-count` shrinks the clamp
   proportionally as digits accrue. The text-align is left so the value
   sits at the LEFT edge of its track (reading order: label → value →
   unit). The aura slot mounts at position: absolute; the host is
   relative so the inset resolves locally.

   P.W5 Lane E.3 (substrate extension): the clamp endpoints route through
   `--metric-row-value-clamp-{min,max}` tokens so consumers shrinking the
   register (e.g. words/frontend's compact metric cells targeting
   text-title…text-4xl ≈ 1.5rem…2.25rem) can retint at `:root` or per-row
   without forking the SFC. Defaults preserve the audacious-poster
   behaviour bit-for-bit (4.5rem → var(--type-display-hero)).
   Canonical custom-property cascade per DESIGN.md texture-system pattern. */
.metric-row__value {
    --digit-count: 3;
    position: relative;
    font-size: clamp(
        var(--metric-row-value-clamp-min, 4.5rem),
        calc(
            34cqi * var(--result-row-scale, 1) * 3 /
                max(3, var(--digit-count))
        ),
        var(--metric-row-value-clamp-max, var(--type-display-hero))
    );
    line-height: 0.95;
    font-weight: 400;
    letter-spacing: var(--type-tracking-tight);
    font-feature-settings: "ss01", "tnum", "lnum";
    font-variant-numeric: tabular-nums lining-nums;
    color: var(--foreground);
    transition: color 220ms ease-out;
    text-align: left;
    min-width: 0;
}

.metric-row__unit {
    font-size: clamp(
        var(--metric-row-unit-clamp-min, 1.5rem),
        calc(6cqi * var(--result-row-scale, 1)),
        var(--metric-row-unit-clamp-max, 3.25rem)
    );
    line-height: 1;
    font-weight: 500;
    color: var(--muted-foreground);
    transition: color 220ms ease-out;
    white-space: nowrap;
}

.metric-row[data-color-tinted="true"] .metric-row__value,
.metric-row[data-color-tinted="true"] .metric-row__unit {
    color: var(--phase-color);
}

.metric-row__icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
}

/* Description slot promotion at ≥ 32rem container width. The slot
   self-paints (consumers provide `<MetricRow><template #description>
   {{ m.description }}</template></MetricRow>`); the primitive just
   reserves grid row 2 + the promotion gate. */
.metric-row :slotted(.metric-row__description),
.metric-row :slotted(.result-description) {
    display: none;
    grid-column: 1 / -1;
    grid-row: 2;
    font-size: var(--type-small);
    color: var(--muted-foreground);
    line-height: 1.4;
    margin-block-start: 0.125rem;
}

@container metric-stack (min-width: 32rem) {
    .metric-row :slotted(.metric-row__description),
    .metric-row :slotted(.result-description) {
        display: block;
    }
}
</style>
