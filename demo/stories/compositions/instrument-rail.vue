<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { InstrumentRail } from "../../../src/components/custom/instrument-rail";
import { MetricBadge } from "../../../src/components/custom/metric-badge";
import { StatusDot } from "../../../src/components/custom/status-dot";
</script>

<template>
    <StoryPage>
        <StorySection
            label="vertical cockpit rail"
            blurb="A flex-basis cockpit-ratio rail (1/φ² ≈ 0.382) with engraved bezel hairlines and a twin-line divider rule between children. The rail roots an <aside> landmark and stands beside a primary panel as the sidekick column."
        >
            <div class="flex gap-4 rounded-card border border-border/60 bg-card p-4">
                <InstrumentRail variant="vertical">
                    <template #status>
                        <div class="flex items-center gap-2 px-1 py-1">
                            <StatusDot variant="active" aria-label="link · up" />
                            <span class="text-admin-label text-muted-foreground">LINK</span>
                        </div>
                    </template>
                    <MetricBadge label="download" :amount="248.6" unit="Mbps" />
                    <MetricBadge label="upload" :amount="42.1" unit="Mbps" />
                    <MetricBadge label="latency" :amount="14" unit="ms" />
                    <MetricBadge label="jitter" :amount="2" unit="ms" />
                </InstrumentRail>
                <div
                    class="flex flex-1 items-center justify-center rounded-panel bg-muted/30 p-8 text-mono-caption text-muted-foreground"
                >
                    primary panel
                </div>
            </div>
        </StorySection>

        <StorySection
            label="horizontal rail · flush"
            blurb="The horizontal variant lays the rail as a row binding flex-basis on the block axis; dividerRule=false drops the internal groove for a flush composition."
        >
            <div class="flex flex-col gap-4 rounded-card border border-border/60 bg-card p-4">
                <InstrumentRail variant="horizontal" :divider-rule="false">
                    <MetricBadge label="peak" :amount="912" unit="Mbps" />
                    <MetricBadge label="mean" :amount="486" unit="Mbps" />
                    <MetricBadge label="loss" :amount="0.0" unit="%" />
                </InstrumentRail>
            </div>
        </StorySection>
    </StoryPage>
</template>
