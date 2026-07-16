<script setup lang="ts">
import { ref } from "vue";
import { Activity } from "@lucide/vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Button } from "@glass/components/button";
import { Metric, MetricCell, MetricRow, MetricStack } from "@glass/components/metric";

const loading = ref(true);
</script>

<template>
    <StoryPage>
        <StorySection
            label="readouts"
            blurb="Values, absence, and loading remain distinct without invented status or interaction."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-end gap-6">
                    <Metric label="Download" :value="482.7" unit="Mbps" />
                    <Metric label="Loss" :value="0" unit="%" context="No dropped packets" />
                    <Metric label="Jitter" :value="null" unit="ms" />
                    <Metric
                        label="Sample"
                        :value="917"
                        unit="req/s"
                        :loading="loading"
                        orientation="stacked"
                        size="xl"
                    />
                    <Button size="sm" @click="loading = !loading">
                        {{ loading ? "Show sample" : "Mask sample" }}
                    </Button>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="cells"
            blurb="A bounded cell adds one wash-tier surface and an optional direct glyph."
        >
            <div class="grid gap-3 sm:grid-cols-2">
                <MetricCell
                    :icon="Activity"
                    label="Requests"
                    :value="1204"
                    unit="/s"
                    context="Rolling five-minute window"
                />
                <MetricCell
                    label="Queue depth"
                    :value="18"
                    context="Without an icon"
                />
            </div>
        </StorySection>

        <StorySection
            label="ledger"
            blurb="Rows share one responsive definition-list grid; long labels wrap on narrow hosts."
        >
            <ShowcaseFrame pad="lg">
                <div class="max-w-xl">
                    <MetricStack density="compact">
                        <MetricRow label="Requests" context="Current throughput" :value="9" unit="/s" />
                        <MetricRow label="Median latency" context="Last 100 samples" :value="42.8" unit="ms" />
                        <MetricRow
                            label="Extraordinarily long checkpoint description"
                            context="Wraps without clipping or changing value order"
                            :value="12048"
                            unit="events"
                        />
                        <MetricRow label="Unresolved" :value="Number.NaN" placeholder="n/a" />
                    </MetricStack>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
