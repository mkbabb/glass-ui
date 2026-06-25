<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import MetricBadge from "../../custom/metric-badge/MetricBadge.vue";
import { cn, type MetricValue } from "../../../utils";

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
        /** The primary metric. A valid `0` renders `"0"`, never the placeholder. */
        value: MetricValue;
        unit?: string;
        label?: string;
        abbreviation?: string;
        color?: string;
        /** Substitute glyph when value is empty; forwarded to `<MetricBadge>`,
         *  which owns the shared `coalesceMetric` default. */
        placeholder?: string;
        /** Defaults to `lg` — the 14px value / prose-unit ladder rung. */
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
    },
);

// BD.W-GLASS-ATOM-REGISTER — the MetricPill is a `.glass-atom` consumer (DRY): it
// composes the shared warm-glass capsule register + the loud cel cast (the metric
// pill is a cast FLAGSHIP — it lights the cartoon stamp by default, `data-cast`).
// The press-squish + the keyed rim ride the register; the K5 dark white-flip is
// fixed UPSTREAM at `--cartoon-ink` (BD.W-CARTOON-CEL-INK), no recipe edit here.
// This clears the ≥2-consumer overfit bar alongside `<Badge surface="glass">`.
const composedClass = computed(() =>
    cn("metric-pill glass-atom", props.class),
);
</script>

<template>
    <MetricBadge data-slot="metric-pill"
        :value="value"
        :unit="unit"
        :label="label"
        :abbreviation="abbreviation"
        :color="color"
        :placeholder="placeholder"
        :size="size"
        :label-position="labelPosition"
        :class="composedClass"
        :data-density="density"
        data-cast
    />
</template>
