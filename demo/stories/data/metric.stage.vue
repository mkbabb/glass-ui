<script setup lang="ts">
// Metric's stage: four readouts, with a change beside two of them and one with no
// value yet.
import { Metric } from "@glass/components/metric";
</script>

<template>
    <div class="metric-stage">
        <Metric label="Download" :value="482.7" unit="Mbps" size="lg" posture="stacked" />
        <Metric label="Requests" :value="1240000" compact unit="/s" :delta="12.4" size="lg" posture="stacked" />
        <Metric label="Errors" :value="318" :delta="-7" size="lg" posture="stacked" />
        <Metric label="Jitter" :value="null" unit="ms" size="lg" posture="stacked" />
    </div>
</template>

<style scoped>
.metric-stage {
    display: grid;
    grid-template-columns: repeat(4, max-content);
    justify-content: center;
    gap: var(--sp-5) var(--sp-6);
}

@container (inline-size < 40rem) {
    .metric-stage {
        grid-template-columns: repeat(2, max-content);
    }
}

@container (inline-size < 20rem) {
    .metric-stage {
        grid-template-columns: max-content;
    }
}
</style>
