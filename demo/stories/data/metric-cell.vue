<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { MetricCell } from "../../../src/components/custom/metric-cell";
import { Download, Upload, Gauge, Activity } from "@lucide/vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="dashboard register"
            blurb="The compact metric card — icon + label row over a value/unit pair on a wash-tier surface. The default `dashboard` appearance carries p-3 padding and the mono-prose value."
        >
            <div class="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                <MetricCell :icon="Download" label="download" :value="248.6" unit="Mbps" />
                <MetricCell :icon="Upload" label="upload" :value="42.1" unit="Mbps" />
                <MetricCell :icon="Gauge" label="latency" :value="14" unit="ms" />
                <MetricCell :icon="Activity" label="jitter" :value="2" unit="ms" />
            </div>
        </StorySection>

        <StorySection
            label="compact register + placeholder"
            blurb="The compact appearance tightens padding to p-2 with the mono-small value; a null value reads the placeholder glyph."
        >
            <div class="grid max-w-xl grid-cols-3 gap-2">
                <MetricCell appearance="compact" label="peak" :value="912" unit="Mbps" />
                <MetricCell appearance="compact" label="mean" :value="486" unit="Mbps" />
                <MetricCell appearance="compact" label="pending" :value="null" unit="Mbps" />
            </div>
        </StorySection>
    </StoryPage>
</template>
