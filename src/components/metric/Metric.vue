<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../_shared/class-names";
import { coalesceMetric, metricPolarity } from "./coalesce-metric";
import type { MetricProps } from "./types";

defineOptions({ name: "Metric" });

// ONE ATOM (BK #87 W-MARKS · SL-2). The family shipped as FOUR components —
// Metric, MetricCell, MetricRow, MetricStack — and three of them re-implemented the
// same readout: the same `coalesceMetric` call, the same `metric__reading` /
// `metric__value` / `metric__unit` markup, the same empty/loading stamps, three
// times. A cell is not a second readout; it is a readout with a heading row and a
// plate around it. A row is not a third; it is a readout whose term and reading
// sit on a shared grid. Both are POSTURES, and this is the atom that takes them.
const props = withDefaults(defineProps<MetricProps>(), {
    loading: false,
    posture: "inline",
    size: "md",
});

const reading = computed(() =>
    coalesceMetric(props.value, {
        placeholder: props.placeholder,
        loading: props.loading,
        compact: props.compact,
        locale: props.locale,
    }),
);

const deltaReading = computed(() =>
    props.delta == null || props.delta === ""
        ? undefined
        : coalesceMetric(props.delta, {
              placeholder: props.placeholder,
              compact: props.compact,
              locale: props.locale,
          }),
);

const polarity = computed(() => props.polarity ?? metricPolarity(props.delta));
</script>

<template>
    <span
        :class="cn('metric', $props.class)"
        :data-empty="reading.empty || undefined"
        :data-loading="reading.loading || undefined"
        :data-posture="posture"
        :data-size="size"
        :aria-busy="reading.loading || undefined"
    >
        <span v-if="$slots.label || label" class="metric__label">
            <slot name="label">{{ label }}</slot>
        </span>
        <span class="metric__reading">
            <span class="metric__value">
                <slot v-if="!reading.loading" name="value">{{ reading.display }}</slot>
                <template v-else>{{ reading.display }}</template>
            </span>
            <span v-if="$slots.unit || unit" class="metric__unit">
                <slot name="unit">{{ unit }}</slot>
            </span>
            <span
                v-if="deltaReading"
                class="metric__delta"
                :data-polarity="polarity"
            >
                <slot name="delta">{{ deltaReading.display }}</slot>
            </span>
        </span>
        <span v-if="$slots.context || context" class="metric__context">
            <slot name="context">{{ context }}</slot>
        </span>
    </span>
</template>
