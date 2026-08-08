<script setup lang="ts">
import { cn } from "../_shared/class-names";
import type { MetricRowProps } from "./types";

defineOptions({ name: "MetricRow" });

// A PURE LAYOUT COMPOSER — zero visual authority of its own. It owns subgrid
// placement inside a `<MetricStack>` and nothing else: no type, no ink, no
// spacing of its own, no readout. It used to render a whole metric (its own
// `coalesceMetric` call, its own value/unit markup), which is why the family had
// three copies of one readout. The readout is `<Metric posture="row">`; this is
// where it sits.
defineProps<MetricRowProps>();
</script>

<template>
    <div :class="cn('metric-row', $props.class)">
        <slot />
    </div>
</template>
