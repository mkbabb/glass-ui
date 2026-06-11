<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { MetricCell } from "../../../src/components/custom/metric-cell";
import { Download, Upload, Gauge, Activity } from "@lucide/vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="dashboard register · semantic glyph tint"
            blurb="The compact metric card — icon + label row over a value/unit pair on a wash-tier surface. The leading glyph tints to its semantic --chart-* viz color (the ONE color event per cell); the value + unit stay neutral ink (the one-color-event proportion rule)."
        >
            <div class="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                <MetricCell
                    :icon="Download"
                    icon-color="var(--chart-download)"
                    label="download"
                    :value="248.6"
                    unit="Mbps"
                />
                <MetricCell
                    :icon="Upload"
                    icon-color="var(--chart-upload)"
                    label="upload"
                    :value="42.1"
                    unit="Mbps"
                />
                <MetricCell
                    :icon="Gauge"
                    icon-color="var(--chart-ping)"
                    label="latency"
                    :value="14"
                    unit="ms"
                />
                <MetricCell
                    :icon="Activity"
                    icon-color="var(--chart-jitter)"
                    label="jitter"
                    :value="2"
                    unit="ms"
                />
            </div>
        </StorySection>

        <StorySection
            label="compact register + placeholder"
            blurb="The compact appearance tightens padding to p-2 with the mono-small value; a null value reads the placeholder glyph."
        >
            <div class="grid max-w-xl grid-cols-3 gap-2">
                <MetricCell
                    appearance="compact"
                    label="peak"
                    :value="912"
                    unit="Mbps"
                />
                <MetricCell
                    appearance="compact"
                    label="mean"
                    :value="486"
                    unit="Mbps"
                />
                <MetricCell
                    appearance="compact"
                    label="pending"
                    :value="null"
                    unit="Mbps"
                />
            </div>
        </StorySection>

        <StorySection
            label="hero metric · the audacious display tier"
            blurb="The fast.com peg — the result number IS the page. The mega/audacious display tiers (φ^(9/2) peak 177px, φ^(11/2) peak 352px) activate on the metric surface, their natural home (AZ.W-SUFFUSE D2-3). The leading glyph tints to its semantic --chart-* viz color; the number stays warm ink (the one-color-event rule)."
        >
            <div class="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
                <div
                    class="flex flex-col items-start gap-1 rounded-card border border-border/60 bg-card/50 px-6 py-5"
                >
                    <div
                        class="text-micro text-muted-foreground flex items-center gap-1.5"
                    >
                        <Download
                            :size="14"
                            :stroke-width="2"
                            :style="{ color: 'var(--chart-download)' }"
                            aria-hidden="true"
                        />
                        <span>download</span>
                    </div>
                    <p
                        class="text-display-mega tabular-nums leading-none text-foreground"
                    >
                        912<span class="text-display-3 text-muted-foreground"
                            >Mbps</span
                        >
                    </p>
                </div>
                <div
                    class="flex flex-col items-start gap-1 rounded-card border border-border/60 bg-card/50 px-6 py-5"
                >
                    <div
                        class="text-micro text-muted-foreground flex items-center gap-1.5"
                    >
                        <Gauge
                            :size="14"
                            :stroke-width="2"
                            :style="{ color: 'var(--chart-ping)' }"
                            aria-hidden="true"
                        />
                        <span>latency</span>
                    </div>
                    <p
                        class="text-display-audacious tabular-nums leading-none text-foreground"
                    >
                        14<span class="text-display-3 text-muted-foreground">ms</span>
                    </p>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
