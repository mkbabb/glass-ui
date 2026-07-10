<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { MetricStack, MetricRow } from "@glass/components/custom/metric-stack";
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
                    <MetricRow
                        :icon="Download"
                        label="download"
                        :value="248.6"
                        unit="Mbps"
                    />
                    <MetricRow
                        :icon="Upload"
                        label="upload"
                        :value="42.1"
                        unit="Mbps"
                    />
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

        <StorySection
            label="poster hero · the audacious display tier"
            blurb="The single result that wins the page — the audacious display tiers (mega 177px / audacious 352px) on the metric surface, their natural home. The number is warm ink; the tier IS the event (no second color)."
        >
            <div class="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
                <div
                    class="flex flex-col items-start gap-2 rounded-card border border-border/60 bg-card/50 px-6 py-6"
                >
                    <span class="text-admin-label text-muted-foreground"
                        >peak throughput</span
                    >
                    <p
                        class="text-display-mega tabular-nums leading-none text-foreground"
                    >
                        912
                    </p>
                    <span class="text-mono-caption text-muted-foreground"
                        >Mbps · 99th pct</span
                    >
                </div>
                <div
                    class="flex flex-col items-start gap-2 rounded-card border border-border/60 bg-card/50 px-6 py-6"
                >
                    <span class="text-admin-label text-muted-foreground">uptime</span>
                    <p
                        class="text-display-audacious tabular-nums leading-none text-foreground"
                    >
                        100<span class="text-display-3 text-muted-foreground">%</span>
                    </p>
                    <span class="text-mono-caption text-muted-foreground"
                        >30-day window</span
                    >
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
