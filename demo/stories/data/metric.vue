<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Button } from "@glass/components/button";
import { Metric, MetricRow, MetricStack } from "@glass/components/metric";

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
                        posture="stacked"
                        size="xl"
                    />
                    <Button size="sm" @click="loading = !loading">
                        {{ loading ? "Show sample" : "Mask sample" }}
                    </Button>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="delta + compact"
            blurb="A numeric delta carries its own polarity and paints as status ink on the neutral material — never a coloured plate. `compact` renders a number in its locale's compact form through the family's one data-shaping seam."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-end gap-6">
                    <Metric label="Requests" :value="1240000" compact unit="/s" :delta="12.4" />
                    <Metric label="Errors" :value="318" :delta="-7" />
                    <Metric label="Sessions" :value="88400" compact :delta="0" />
                    <Metric label="Backlog" :value="42" delta="steady" polarity="flat" />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="cell posture"
            blurb="A cell is a POSTURE of the one readout, not a second component — a bounded wash-tier plate around the same atom."
        >
            <div class="grid gap-3 sm:grid-cols-2">
                <Metric
                    posture="cell"
                    label="Requests"
                    :value="1204"
                    unit="/s"
                    context="Rolling five-minute window"
                />
                <Metric
                    posture="cell"
                    label="Queue depth"
                    :value="18"
                    :delta="-4"
                    context="Down four since the last window"
                />
            </div>
        </StorySection>

        <StorySection
            label="ledger"
            blurb="Rows share one responsive definition-list subgrid; long labels wrap on narrow hosts. MetricStack and MetricRow place; the Metric paints."
        >
            <ShowcaseFrame pad="lg">
                <div class="max-w-xl">
                    <MetricStack density="compact">
                        <MetricRow>
                            <Metric
                                posture="row"
                                label="Requests"
                                context="Current throughput"
                                :value="9"
                                unit="/s"
                            />
                        </MetricRow>
                        <MetricRow>
                            <Metric
                                posture="row"
                                label="Median latency"
                                context="Last 100 samples"
                                :value="42.8"
                                unit="ms"
                            />
                        </MetricRow>
                        <MetricRow>
                            <Metric
                                posture="row"
                                label="Extraordinarily long checkpoint description"
                                context="Wraps without clipping or changing value order"
                                :value="12048"
                                unit="events"
                            />
                        </MetricRow>
                        <MetricRow>
                            <Metric
                                posture="row"
                                label="Unresolved"
                                :value="Number.NaN"
                                placeholder="n/a"
                            />
                        </MetricRow>
                    </MetricStack>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
