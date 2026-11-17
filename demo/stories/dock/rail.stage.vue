<script setup lang="ts">
// A section rail at the start edge: a crest that stays, the sections, then settings
// and the theme at the foot. Folded, it is the crest and the foot. The page beside it
// is the current section's dashboard: a press cross-fades its title and swaps each of
// its three figures.
import { computed, ref } from "vue";
import { BookOpen, Compass, Landmark, Map, Settings2, Sprout } from "@lucide/vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/tooltip";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import { Metric } from "@glass/components/metric";
import DockScene from "./_parts/DockScene.vue";
import ScenePage from "./_parts/ScenePage.vue";

withDefaults(defineProps<{ folds?: boolean }>(), { folds: true });

const SECTIONS = [
    { id: "overview", label: "Overview", icon: Compass },
    { id: "regions", label: "Regions", icon: Map },
    { id: "schools", label: "Schools", icon: Landmark },
    { id: "growth", label: "Growth", icon: Sprout },
    { id: "notes", label: "Notes", icon: BookOpen },
] as const;

// Each section's three figures.
type Figure = { label: string; value: string; delta?: number };
const FIGURES: Record<string, readonly Figure[]> = {
    overview: [
        { label: "Districts", value: "115" },
        { label: "Schools", value: "2,612" },
        { label: "Students", value: "1.5M" },
    ],
    regions: [
        { label: "Coast", value: "31" },
        { label: "Piedmont", value: "58" },
        { label: "Mountains", value: "26" },
    ],
    schools: [
        { label: "Elementary", value: "1,480" },
        { label: "Middle", value: "560" },
        { label: "High", value: "572" },
    ],
    growth: [
        { label: "Enrolment", value: "1.52M", delta: 1.2 },
        { label: "Teachers", value: "98.4k", delta: 0.8 },
        { label: "Graduates", value: "112k", delta: 2.1 },
    ],
    notes: [
        { label: "Open", value: "24" },
        { label: "Drafts", value: "3" },
        { label: "Shared", value: "9" },
    ],
};

const section = ref<string>("regions");
const title = computed(() => SECTIONS.find((s) => s.id === section.value)?.label ?? "");
const figures = computed(() => FIGURES[section.value] ?? []);
</script>

<template>
    <DockScene place="start">
        <template #context>
            <ScenePage shape="column" :title="title">
                <div class="rail-figures">
                    <div v-for="(f, i) in figures" :key="i" class="rail-figure">
                        <Transition name="metric-swap" mode="out-in">
                            <Metric
                                :key="`${section}-${i}`"
                                posture="stacked"
                                size="lg"
                                :label="f.label"
                                :value="f.value"
                                :delta="f.delta"
                            />
                        </Transition>
                    </div>
                </div>
            </ScenePage>
        </template>
        <TooltipProvider :delay-duration="250">
            <Transition name="fade" mode="out-in">
                <div :key="String(folds)" class="scene-swap">
                    <GlassDock
                        orientation="vertical"
                        :collapse="folds ? 'closed' : false"
                        collapsed-label="Open sections"
                        aria-label="Sections"
                    >
                        <template #persistent>
                            <span class="rail-crest" aria-hidden="true">A</span>
                        </template>

                        <div class="contents" role="group" aria-label="Sections">
                            <Tooltip v-for="s in SECTIONS" :key="s.id">
                                <TooltipTrigger as-child>
                                    <DockControl
                                        :active="section === s.id ? true : undefined"
                                        :aria-current="section === s.id ? 'page' : undefined"
                                        :aria-label="s.label"
                                        @click="section = s.id"
                                    >
                                        <component :is="s.icon" class="h-4 w-4" aria-hidden="true" />
                                    </DockControl>
                                </TooltipTrigger>
                                <TooltipContent side="right" :side-offset="10">
                                    {{ s.label }}
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <template #persistent-end>
                            <DockSeparator />
                            <DockControl aria-label="Settings">
                                <Settings2 class="h-4 w-4" aria-hidden="true" />
                            </DockControl>
                            <DarkModeToggle size="dock" />
                        </template>
                    </GlassDock>
                </div>
            </Transition>
        </TooltipProvider>
    </DockScene>
</template>

<style scoped>
/* Three figures across; one column where the context is under 30rem. */
.rail-figures {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--sp-4);
}

@container scene-context (inline-size < 30rem) {
    .rail-figures {
        grid-template-columns: minmax(0, 1fr);
        gap: var(--sp-3);
    }
}

.rail-figure {
    min-inline-size: 0;
}

.rail-crest {
    display: grid;
    place-items: center;
    inline-size: 2.75rem;
    block-size: 2.75rem;
    font-family: var(--font-display);
    font-size: var(--text-subheading, 1.25rem);
    color: var(--foreground);
}
</style>
