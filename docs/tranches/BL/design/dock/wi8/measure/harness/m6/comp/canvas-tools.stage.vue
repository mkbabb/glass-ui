<script setup lang="ts">
// A tool dock floating over a canvas: four tools under tooltips, and the drawing tool
// kept at the end, in reach while the dock is folded.
import { ref } from "vue";
import { Download, Grid3x3, Layers, Maximize2, PenTool, Pencil } from "@lucide/vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/tooltip";
import { StatusDot } from "@glass/components/status-dot";
import DockScene from "./DockScene.vue";

const TOOLS = [
    { id: "grid", label: "Grid", icon: Grid3x3 },
    { id: "layers", label: "Layers", icon: Layers },
    { id: "export", label: "Export", icon: Download },
    { id: "fullscreen", label: "Full screen", icon: Maximize2 },
] as const;

const grid = ref(true);
const drawing = ref(true);
</script>

<template>
    <DockScene place="top-end">
        <TooltipProvider :delay-duration="250">
            <div class="canvas-seat">
                <GlassDock fit-content collapsed-label="Canvas tools" aria-label="Canvas tools">
                    <template #collapsed>
                        <span class="canvas-face">
                            <PenTool class="h-4 w-4" aria-hidden="true" />
                            <StatusDot state="online" size="sm" label="Saved" />
                        </span>
                    </template>

                    <Tooltip v-for="t in TOOLS" :key="t.id">
                        <TooltipTrigger as-child>
                            <DockControl
                                :aria-label="t.label"
                                :active="t.id === 'grid' && grid ? true : undefined"
                                @click="t.id === 'grid' && (grid = !grid)"
                            >
                                <component :is="t.icon" aria-hidden="true" />
                            </DockControl>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" :side-offset="10">{{ t.label }}</TooltipContent>
                    </Tooltip>

                    <template #persistent-end>
                        <DockSeparator />
                        <DockControl
                            aria-label="Draw"
                            :active="drawing ? true : undefined"
                            :aria-pressed="drawing"
                            @click="drawing = !drawing"
                        >
                            <Pencil aria-hidden="true" />
                        </DockControl>
                    </template>
                </GlassDock>
            </div>
        </TooltipProvider>
    </DockScene>
</template>

<style scoped>
/* The dock centres itself in its own box; a box sized to it holds it in the corner. */
.canvas-seat {
    display: flex;
}

.canvas-face {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding-inline: 0.25rem;
}
</style>
