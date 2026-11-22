<script setup lang="ts">
// A figure's dial bar above its figure: two captioned dials parted by a separator,
// then a year stepper. It never folds, and the figure answers each dial. Under 30rem
// the captions go, and the range and the year become selects, so the run fits without
// scrolling.
import { computed, ref } from "vue";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
import { DockTrigger } from "@glass/components/dock/trigger";
import { Select, SelectContent, SelectItem, SelectValue } from "@glass/components/select";
import { SegmentedTabs } from "@glass/components/tabs";
import { Card } from "@glass/components/card";
import DockScene from "./_parts/DockScene.vue";
import MiniBars from "./_parts/MiniBars.vue";

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

// A month's balance: a slow rise with a seasonal swing.
const month = (y: number, m: number): number => {
    const t = (y - 2015) * 12 + m;
    return 400 + 14 * t + 90 * Math.sin(t / 1.9) + 40 * Math.cos(t / 5.3);
};
const yearTotal = (y: number): number => Array.from({ length: 12 }, (_, m) => month(y, m)).reduce((a, b) => a + b, 0);
const values = computed(() => {
    if (range.value === "1y") return Array.from({ length: 12 }, (_, m) => month(year.value, m));
    const span = range.value === "5y" ? 5 : 10;
    return Array.from({ length: span }, (_, i) => yearTotal(year.value - span + 1 + i));
});
const figureLabel = computed(
    () => `Balance by ${range.value === "1y" ? "month" : "year"} to ${year.value}, ${scale.value} scale`,
);
</script>

<template>
    <DockScene v-slot="{ narrow }" place="center">
        <div class="dials">
            <GlassDock :collapse="false" fit-content aria-label="Figure filters">
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
            <Card class="dials-figure">
                <MiniBars :values="values" :log="scale === 'log'" :label="figureLabel" />
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

/* The figure the dials filter, on a library Card. */
.dials-figure {
    box-sizing: border-box;
    inline-size: 100%;
    block-size: 14rem;
    padding: var(--sp-4);
}

@container (inline-size < 30rem) {
    .dials-figure {
        block-size: 9rem;
    }
}
</style>
