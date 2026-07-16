<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../_shared/class-names";
import { coalesceMetric } from "./coalesce-metric";
import type { MetricCellProps } from "./types";

defineOptions({ name: "MetricCell" });

const props = withDefaults(defineProps<MetricCellProps>(), {
    iconSize: 16,
    iconStrokeWidth: 2,
    loading: false,
});
const reading = computed(() =>
    coalesceMetric(props.value, props.placeholder, props.loading),
);
</script>

<template>
    <div
        :class="cn('metric-cell', $props.class)"
        :data-empty="reading.empty || undefined"
        :data-loading="reading.loading || undefined"
        :aria-busy="reading.loading || undefined"
    >
        <div v-if="$slots.icon || icon || $slots.label || label" class="metric-cell__heading">
            <slot name="icon">
                <component
                    :is="icon"
                    v-if="icon"
                    class="metric-cell__icon"
                    :size="iconSize"
                    :stroke-width="iconStrokeWidth"
                    aria-hidden="true"
                />
            </slot>
            <span v-if="$slots.label || label" class="metric__label">
                <slot name="label">{{ label }}</slot>
            </span>
        </div>
        <span class="metric__reading">
            <span class="metric__value">
                <slot v-if="!reading.loading" name="value">{{ reading.display }}</slot>
                <template v-else>{{ reading.display }}</template>
            </span>
            <span v-if="$slots.unit || unit" class="metric__unit">
                <slot name="unit">{{ unit }}</slot>
            </span>
        </span>
        <span v-if="$slots.context || context" class="metric__context">
            <slot name="context">{{ context }}</slot>
        </span>
    </div>
</template>
