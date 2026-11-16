<script setup lang="ts">
// A section rail at the start edge: a crest that stays, the sections, then settings
// and the theme at the foot. Folded, it is the crest and the foot.
import { ref } from "vue";
import { BookOpen, Compass, Landmark, Map, Settings2, Sprout } from "@lucide/vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/tooltip";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import DockScene from "./DockScene.vue";

withDefaults(defineProps<{ folds?: boolean }>(), { folds: true });

const SECTIONS = [
    { id: "overview", label: "Overview", icon: Compass },
    { id: "regions", label: "Regions", icon: Map },
    { id: "schools", label: "Schools", icon: Landmark },
    { id: "growth", label: "Growth", icon: Sprout },
    { id: "notes", label: "Notes", icon: BookOpen },
] as const;

const section = ref<string>("regions");
</script>

<template>
    <DockScene place="start">
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
