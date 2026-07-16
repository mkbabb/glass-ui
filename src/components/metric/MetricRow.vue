<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../_shared/class-names";
import { coalesceMetric } from "./coalesce-metric";
import type { MetricRowProps } from "./types";

defineOptions({ name: "MetricRow" });

const props = withDefaults(defineProps<MetricRowProps>(), { loading: false });
const reading = computed(() =>
    coalesceMetric(props.value, props.placeholder, props.loading),
);
</script>

<template>
    <div
        :class="cn('metric-row', $props.class)"
        :data-empty="reading.empty || undefined"
        :data-loading="reading.loading || undefined"
        :aria-busy="reading.loading || undefined"
    >
        <span class="metric-row__term">
            <span class="metric__label"><slot name="label">{{ label }}</slot></span>
            <span v-if="$slots.context || context" class="metric__context">
                <slot name="context">{{ context }}</slot>
            </span>
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
    </div>
</template>
