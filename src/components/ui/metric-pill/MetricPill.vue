<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import MetricBadge from "../../custom/metric-badge/MetricBadge.vue";
import { cn } from "../../../utils";

/**
 * MetricPill — the speedtest stacked-pill default, composed over `<MetricBadge>`.
 *
 * Defaults bake in the audit-B-spec recipe: `labelPosition="stacked"` +
 * `density="spacious"` + `size="lg"`. The result is a 2-row pill (label / value
 * + unit baseline-aligned) that lands at the 2.625rem floor declared by
 * `--metric-badge-min-height-stacked`. The component is composition-only — no
 * parallel logic vs `<MetricBadge>` — so any visual change to the underlying
 * badge surface composes here without divergence.
 *
 * The `density` prop is the dock-tier knob lifted onto the pill: `spacious`
 * (default) widens block padding so the pill reads as a proper chassis-strip
 * citizen; `comfortable` keeps the tighter compact register where pills nest in
 * a denser dock. The class modifier adjusts the metric-badge padding tokens
 * locally; the underlying badge stays unchanged.
 */
type MetricPillSize = "sm" | "md" | "lg" | "xl";
type MetricPillLabelPosition = "inline" | "stacked";
type MetricPillDensity = "comfortable" | "spacious";

const props = withDefaults(
    defineProps<{
        amount: string | number | null | undefined;
        unit?: string;
        label?: string;
        abbreviation?: string;
        color?: string;
        placeholder?: string;
        /** Defaults to `lg` — the 14px amount / prose-unit ladder rung. */
        size?: MetricPillSize;
        /** Defaults to `stacked` — the 2-row label-above-value reading. */
        labelPosition?: MetricPillLabelPosition;
        /** Defaults to `spacious` — chassis-strip block padding. */
        density?: MetricPillDensity;
        class?: HTMLAttributes["class"];
    }>(),
    {
        size: "lg",
        labelPosition: "stacked",
        density: "spacious",
        placeholder: "—",
    },
);

const composedClass = computed(() => cn("metric-pill", props.class));
</script>

<template>
    <MetricBadge
        :amount="amount"
        :unit="unit"
        :label="label"
        :abbreviation="abbreviation"
        :color="color"
        :placeholder="placeholder"
        :size="size"
        :label-position="labelPosition"
        :class="composedClass"
        :data-density="density"
    />
</template>
