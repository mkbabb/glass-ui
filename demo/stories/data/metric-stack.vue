<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import {
    MetricStack,
    MetricRow,
} from "../../../src/components/custom/metric-stack";
import { Download, Upload, Gauge, Waves } from "@lucide/vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="result register"
            blurb="MetricStack is the subgrid layout shell hosting a column of <MetricRow> children. The `result` register is the compact, scannable ledger — value clamp peaks at 3.5rem so a multi-row stack seats inside a bounded card."
        >
            <div class="max-w-md rounded-card border border-border/60 bg-card p-4">
                <MetricStack register="result" :rows="4">
                    <MetricRow :icon="Download" label="download" :value="248.6" unit="Mbps" />
                    <MetricRow :icon="Upload" label="upload" :value="42.1" unit="Mbps" />
                    <MetricRow :icon="Gauge" label="latency" :value="14" unit="ms" />
                    <MetricRow :icon="Waves" label="jitter" :value="2" unit="ms" />
                </MetricStack>
            </div>
        </StorySection>

        <StorySection
            label="audacious register · phase tint + active"
            blurb="The default `audacious` poster register peaks the value clamp at the display-hero scale. `colorTinted` promotes value + unit to the per-row `--phase-color`; `active` reveals the aura slot."
        >
            <div class="max-w-md rounded-card border border-border/60 bg-card p-4">
                <MetricStack :rows="2">
                    <MetricRow
                        :icon="Download"
                        label="download"
                        :value="912"
                        unit="Mbps"
                        phase-color="var(--chart-download)"
                        color-tinted
                        active
                    />
                    <MetricRow
                        :icon="Upload"
                        label="upload"
                        :value="486"
                        unit="Mbps"
                        phase-color="var(--chart-upload)"
                    />
                </MetricStack>
            </div>
        </StorySection>
    </StoryPage>
</template>
