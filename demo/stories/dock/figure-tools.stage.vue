<script setup lang="ts">
// Three figures, each with its tools dock at the end of its header. The table seat
// stays; the rest opens on a press only, so a pointer passing over opens none.
import { reactive } from "vue";
import { ChevronDown, Download, Maximize2, MoreHorizontal, SlidersHorizontal, Table2 } from "@lucide/vue";
import { DockControl, GlassDock } from "@glass/components/dock";
import { Card, CardContent, CardTitle } from "@glass/components/card";
import { Skeleton } from "@glass/components/skeleton";

withDefaults(defineProps<{ face?: "handle" | "words" }>(), { face: "handle" });

const FIGURES = ["Revenue", "Headcount", "Churn"] as const;
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
                    <div v-if="table[f]" class="figure-rows">
                        <Skeleton v-for="i in 3" :key="i" class="h-3 w-full" />
                    </div>
                    <Skeleton v-else class="figure-chart w-full" />
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
    align-content: center;
    gap: var(--sp-3);
    block-size: 7rem;
}

@container (inline-size < 48rem) {
    .figure-chart,
    .figure-rows {
        block-size: 2.5rem;
    }
    .figure-rows {
        gap: var(--sp-2);
    }
}

/* The dock centres itself in its own box; a box sized to it holds it at the end. */
.figure-dock {
    display: flex;
    flex: none;
}
</style>
