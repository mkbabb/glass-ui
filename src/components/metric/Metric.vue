<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../_shared/class-names";
import { coalesceMetric } from "./coalesce-metric";
import type { MetricProps } from "./types";

defineOptions({ name: "Metric" });

const props = withDefaults(defineProps<MetricProps>(), {
    loading: false,
    orientation: "inline",
    size: "md",
});
const reading = computed(() =>
    coalesceMetric(props.value, props.placeholder, props.loading),
);
</script>

<template>
    <span
        :class="cn('metric', $props.class)"
        :data-empty="reading.empty || undefined"
        :data-loading="reading.loading || undefined"
        :data-orientation="orientation"
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
        </span>
        <span v-if="$slots.context || context" class="metric__context">
            <slot name="context">{{ context }}</slot>
        </span>
    </span>
</template>
