<script setup lang="ts">
// Three figures, each with its tools dock at the end of its header. The table seat
// stays; the rest opens on a press only, so a pointer passing over opens none.
import { reactive } from "vue";
import { ChevronDown, Download, Maximize2, MoreHorizontal, SlidersHorizontal, Table2 } from "@lucide/vue";
import { DockControl, GlassDock } from "@glass/components/dock";
import { Card, CardContent, CardTitle } from "@glass/components/card";
import MiniBars from "./_parts/MiniBars.vue";

withDefaults(defineProps<{ face?: "handle" | "words" }>(), { face: "handle" });

const FIGURES = ["Revenue", "Headcount", "Churn"] as const;
// Eight quarters of each figure; the table view lists the last four.
const SERIES: Record<(typeof FIGURES)[number], number[]> = {
    Revenue: [32, 41, 38, 52, 61, 58, 70, 76],
    Headcount: [12, 13, 15, 15, 18, 20, 21, 24],
    Churn: [8, 7, 9, 6, 5, 6, 4, 4],
};
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const table = reactive<Record<string, boolean>>({});
</script>

<template>
    <div class="figures">
        <Card v-for="f in FIGURES" :key="f" size="sm" class="figure">
            <div class="figure-head">
                <CardTitle as="h3" class="figure-title text-body">{{ f }}</CardTitle>
                <div class="figure-dock">
                    <GlassDock
                        collapse="closed"
                        expand-on="press"
                        fit-content
                        :collapsed-label="`Tools for ${f}`"
                        :aria-label="`${f} tools`"
                    >
                        <template #collapsed>
                            <Transition name="fade" mode="out-in">
                                <MoreHorizontal v-if="face === 'handle'" class="h-4 w-4" aria-hidden="true" />
                                <span v-else class="figure-words text-small">
                                    Tools <ChevronDown class="h-3 w-3" aria-hidden="true" />
                                </span>
                            </Transition>
                        </template>

                        <DockControl aria-label="Options"><SlidersHorizontal aria-hidden="true" /></DockControl>
                        <DockControl aria-label="Download"><Download aria-hidden="true" /></DockControl>
                        <DockControl aria-label="Enlarge"><Maximize2 aria-hidden="true" /></DockControl>

                        <template #persistent-end>
                            <DockControl
                                aria-label="Table view"
                                :active="table[f] ? true : undefined"
                                :aria-pressed="!!table[f]"
                                @click="table[f] = !table[f]"
                            >
                                <Table2 aria-hidden="true" />
                            </DockControl>
                        </template>
                    </GlassDock>
                </div>
            </div>
            <CardContent class="figure-body">
                <Transition name="fade" mode="out-in">
                    <dl v-if="table[f]" class="figure-rows text-small tabular-nums">
                        <div v-for="(q, i) in QUARTERS" :key="q" class="figure-row">
                            <dt>{{ q }}</dt>
                            <dd>{{ SERIES[f][4 + i] }}</dd>
                        </div>
                    </dl>
                    <div v-else class="figure-chart">
                        <MiniBars :values="SERIES[f]" :label="`${f} by quarter`" />
                    </div>
                </Transition>
            </CardContent>
        </Card>
    </div>
</template>

<style scoped>
.figures {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-content: center;
    gap: var(--sp-4);
    box-sizing: border-box;
    block-size: 100%;
    min-inline-size: 18rem;
    padding: var(--sp-5);
}

@container (inline-size < 48rem) {
    .figures {
        grid-template-columns: minmax(0, 1fr);
        gap: var(--sp-3);
        padding: var(--sp-3);
    }
}

.figure-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-3);
    padding: var(--sp-3) var(--sp-3) 0 var(--sp-4);
}

.figure-title {
    min-inline-size: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.figure-words {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding-inline: 0.5rem;
}

.figure-chart {
    block-size: 7rem;
}

.figure-rows {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-content: center;
    gap: var(--sp-2) var(--sp-4);
    block-size: 7rem;
    margin: 0;
    color: var(--foreground);
}

.figure-row {
    display: flex;
    justify-content: space-between;
    gap: var(--sp-2);
}

.figure-row dd {
    margin: 0;
}

@container (inline-size < 48rem) {
    .figure-chart,
    .figure-rows {
        block-size: 2.5rem;
    }
    .figure-rows {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--sp-2);
    }
}

/* The dock centres itself in its own box; a box sized to it holds it at the end. */
.figure-dock {
    display: flex;
    flex: none;
}
</style>
