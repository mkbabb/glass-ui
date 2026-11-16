<script setup lang="ts">
// A figure's dial bar above its card: two captioned dials parted by a separator, then
// a period stepper. It never folds. Under 30rem the captions go, and the range and
// the period become selects, so the run fits without scrolling.
import { computed, ref } from "vue";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
import { DockTrigger } from "@glass/components/dock/trigger";
import { Select, SelectContent, SelectItem, SelectValue } from "@glass/components/select";
import { SegmentedTabs } from "@glass/components/tabs";
import { Card, CardContent, CardTitle } from "@glass/components/card";
import { Skeleton } from "@glass/components/skeleton";
import DockScene from "./_parts/DockScene.vue";

const RANGES = [
    { value: "1y", label: "1Y" },
    { value: "5y", label: "5Y" },
    { value: "all", label: "All" },
];
const range = ref("5y");
const scale = ref("linear");
const year = ref(2024);
const YEARS = ["2021", "2022", "2023", "2024", "2025"];
const yearValue = computed({ get: () => String(year.value), set: (v: string) => (year.value = Number(v)) });
</script>

<template>
    <DockScene v-slot="{ narrow }" place="center">
        <div class="dials">
            <GlassDock :collapse="false" fit-content aria-label="Fund balance filters">
                <Select v-if="narrow" v-model="range">
                    <DockTrigger for="select" aria-label="Range">
                        <SelectValue class="text-small" />
                    </DockTrigger>
                    <SelectContent>
                        <SelectItem v-for="r in RANGES" :key="r.value" :value="r.value">{{ r.label }}</SelectItem>
                    </SelectContent>
                </Select>
                <div v-else class="dial">
                    <span class="dial-caption text-small">Range</span>
                    <SegmentedTabs v-model="range" aria-label="Range" :options="RANGES" />
                </div>
                <DockSeparator />
                <div class="dial">
                    <span v-if="!narrow" class="dial-caption text-small">Scale</span>
                    <SegmentedTabs
                        v-model="scale"
                        aria-label="Scale"
                        :options="[
                            { value: 'linear', label: 'Lin' },
                            { value: 'log', label: 'Log' },
                        ]"
                    />
                </div>
                <DockSeparator />
                <Select v-if="narrow" v-model="yearValue">
                    <DockTrigger for="select" aria-label="Year">
                        <SelectValue class="text-small tabular-nums" />
                    </DockTrigger>
                    <SelectContent>
                        <SelectItem v-for="y in YEARS" :key="y" :value="y">{{ y }}</SelectItem>
                    </SelectContent>
                </Select>
                <div v-else class="contents" role="group" aria-label="Year">
                    <DockControl aria-label="Previous year" @click="year--">
                        <ChevronLeft aria-hidden="true" />
                    </DockControl>
                    <Transition name="metric-swap" mode="out-in">
                        <span :key="year" class="dial-year text-small tabular-nums">{{ year }}</span>
                    </Transition>
                    <DockControl aria-label="Next year" @click="year++">
                        <ChevronRight aria-hidden="true" />
                    </DockControl>
                </div>
            </GlassDock>
            <Card size="sm" class="dials-card">
                <CardTitle as="h3" class="dials-title text-body">Fund balance</CardTitle>
                <CardContent>
                    <Skeleton class="dials-chart w-full" />
                </CardContent>
            </Card>
        </div>
    </DockScene>
</template>

<style scoped>
.dials {
    display: grid;
    justify-items: center;
    gap: var(--sp-4);
    inline-size: min(100%, 40rem);
    min-inline-size: 20rem;
}

.dial {
    display: flex;
    align-items: center;
    gap: var(--sp-2);
}

.dial-caption {
    padding-inline-start: var(--sp-2);
    color: var(--foreground);
}

.dial-year {
    min-inline-size: 2.75rem;
    text-align: center;
}

.dials-card {
    inline-size: 100%;
}

.dials-title {
    padding: var(--sp-4) var(--sp-4) 0;
}

.dials-chart {
    block-size: 9rem;
}

@container (inline-size < 30rem) {
    .dials-chart {
        block-size: 6rem;
    }
}
</style>
