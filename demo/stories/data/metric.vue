<script setup lang="ts">
import { Metric, MetricRow, MetricStack } from "@glass/components/metric";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import MetricStage from "./metric.stage.vue";

const snippet = `<script setup lang="ts">
import { Metric } from "@mkbabb/glass-ui/metric";
<\/script>

<template>
    <Metric label="Download" :value="482.7" unit="Mbps" />
    <Metric label="Errors" :value="318" :delta="-7" posture="cell" />
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <MetricStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Layouts">
                    <Metric posture="cell" label="Queue" :value="18" :delta="-4" />
                    <MetricStack density="compact" class="metric-ledger">
                        <MetricRow>
                            <Metric posture="row" label="Latency" :value="42.8" unit="ms" />
                        </MetricRow>
                        <MetricRow>
                            <Metric posture="row" label="Uptime" :value="99.9" unit="%" />
                        </MetricRow>
                    </MetricStack>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>

<style scoped>
.metric-ledger {
    min-inline-size: 14rem;
}
</style>
