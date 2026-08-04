<script setup lang="ts">
import { computed, ref } from "vue";
import { Activity, RotateCcw } from "@lucide/vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Button } from "@glass/components/button";
import { Card, CardContent } from "@glass/components/card";
import {
    InstrumentChassis,
    type InstrumentChassisReserve,
    type InstrumentChassisState,
} from "@glass/components/instrument-chassis";
import { Metric, MetricCell, MetricRow, MetricStack } from "@glass/components/metric";

const state = ref<InstrumentChassisState>("ready");
const coolTone = ref(false);
const tone = computed(() => coolTone.value ? "var(--viz-fourier)" : "var(--viz-amber)");
const states: InstrumentChassisState[] = ["ready", "active", "complete", "loading"];
const reserves: InstrumentChassisReserve[] = ["none", "stage", "inspector", "both"];
</script>

<template>
    <StoryPage>
        <StorySection
            label="live instrument"
            blurb="One landmark-neutral sleeve keeps the specimen, inspector, and actions in a stable physical hierarchy."
        >
            <div class="mb-4 flex flex-wrap gap-2">
                <Button
                    v-for="option in states"
                    :key="option"
                    size="sm"
                    :emphasis="state === option ? 'primary' : 'secondary'"
                    :aria-pressed="state === option"
                    @click="state = option"
                >
                    {{ option }}
                </Button>
                <Button size="sm" @click="coolTone = !coolTone">
                    {{ coolTone ? "Warm tone" : "Cool tone" }}
                </Button>
            </div>

            <InstrumentChassis
                :state="state"
                :tone="tone"
                proportion="golden"
                :boundaries="['stage-inspector', 'inspector-action']"
            >
                <template #stage>
                    <div class="instrument-demo__stage">
                        <div class="instrument-demo__dial" aria-hidden="true">
                            <div class="instrument-demo__needle" />
                        </div>
                        <Metric
                            label="Throughput"
                            :value="state === 'loading' ? null : 482.7"
                            unit="Mbps"
                            size="lg"
                            orientation="stacked"
                            :loading="state === 'loading'"
                        />
                    </div>
                </template>

                <template #inspector>
                    <MetricStack density="compact">
                        <MetricRow label="Latency" :value="18" unit="ms" />
                        <MetricRow label="Jitter" :value="1.4" unit="ms" />
                        <MetricRow label="Loss" :value="0" unit="%" context="No dropped packets" />
                    </MetricStack>
                </template>

                <template #action>
                    <Button
                        size="sm"
                        :disabled="state === 'ready'"
                        @click="state = 'ready'"
                    >
                        <RotateCcw class="size-4" />
                        Reset state
                    </Button>
                </template>
            </InstrumentChassis>
        </StorySection>

        <StorySection
            label="composition"
            blurb="Preview-dominant and stage-only sleeves preserve the same outer spacing without manufacturing empty regions."
        >
            <div class="grid gap-4">
                <InstrumentChassis proportion="preview-dominant" state="active" tone="var(--viz-chebyshev)">
                    <template #stage>
                        <div class="instrument-demo__preview">Container-scaled preview</div>
                    </template>
                    <template #inspector>
                        <MetricCell
                            :icon="Activity"
                            label="Samples"
                            :value="2048"
                            context="Inspector remains subordinate"
                        />
                    </template>
                </InstrumentChassis>

                <InstrumentChassis>
                    <template #stage>
                        <Card>
                            <CardContent>
                                A nested Card remains visibly distinct from the physical sleeve.
                            </CardContent>
                        </Card>
                    </template>
                </InstrumentChassis>
            </div>
        </StorySection>

        <StorySection
            label="explicit reserve"
            blurb="The caller may reserve either physical region, or both, without changing the chassis spacing authority."
        >
            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <InstrumentChassis
                    v-for="reserve in reserves"
                    :key="reserve"
                    :reserve="reserve"
                    :style="{
                        '--instrument-stage-reserve': '6rem',
                        '--instrument-inspector-reserve': '4.5rem',
                    }"
                >
                    <template #stage>
                        <span class="text-small">Stage · {{ reserve }}</span>
                    </template>
                    <template #inspector>
                        <span class="text-small text-muted-foreground">
                            Inspector
                        </span>
                    </template>
                </InstrumentChassis>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.instrument-demo__stage {
    display: grid;
    grid-template-columns: minmax(8rem, 0.8fr) minmax(0, 1fr);
    align-items: center;
    gap: clamp(1rem, 3cqi, 2rem);
}

.instrument-demo__dial {
    position: relative;
    aspect-ratio: 1;
    border: 1px solid var(--glass-border-resting);
    border-radius: 50%;
    background:
        radial-gradient(circle, transparent 54%, var(--surface-tint-8) 55% 56%, transparent 57%),
        var(--glass-plate-wash);
}

.instrument-demo__needle {
    position: absolute;
    inset: 50% 50% auto auto;
    inline-size: 38%;
    block-size: 2px;
    transform-origin: right center;
    rotate: 25deg;
    border-radius: var(--radius-pill);
    background: var(--instrument-tone, var(--foreground));
}

.instrument-demo__preview {
    display: grid;
    min-block-size: 12rem;
    place-items: center;
    border-radius: var(--radius-card);
    background: var(--glass-plate-wash);
    color: var(--muted-foreground);
}

@container (max-width: 30rem) {
    .instrument-demo__stage {
        grid-template-columns: minmax(0, 1fr);
    }

    .instrument-demo__dial {
        max-inline-size: 12rem;
    }
}
</style>
