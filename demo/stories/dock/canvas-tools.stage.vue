<script setup lang="ts">
// A tool dock floating over a canvas: four tools under tooltips, and the drawing tool
// kept at the end, in reach while the dock is folded. The artboard below the dock is
// what the tools act on: Grid shows its grid, and Draw shows the anchors and handles
// of the path the pen edits. Both fade.
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
import DockScene from "./_parts/DockScene.vue";
import ScenePage from "./_parts/ScenePage.vue";

const TOOLS = [
    { id: "grid", label: "Grid", icon: Grid3x3 },
    { id: "layers", label: "Layers", icon: Layers },
    { id: "export", label: "Export", icon: Download },
    { id: "fullscreen", label: "Full screen", icon: Maximize2 },
] as const;

const grid = ref(true);
const drawing = ref(true);

// The board is 160 by 90; the grid falls every tenth of each side. The path runs
// through three anchors; the middle one is selected, so its two handles show.
const COLS = [16, 32, 48, 64, 80, 96, 112, 128, 144];
const ROWS = [9, 18, 27, 36, 45, 54, 63, 72, 81];
const PATH = "M16 66 C34 68 50 30 80 36 S122 70 144 52";
const ANCHORS = [
    [16, 66],
    [80, 36],
    [144, 52],
] as const;
const HANDLES = [
    [50, 30],
    [110, 42],
] as const;
const SELECTED = ANCHORS[1];
</script>

<template>
    <DockScene place="top-end">
        <template #context>
            <ScenePage shape="figure">
                <svg class="artboard" role="img" aria-label="Artboard" viewBox="0 0 160 90">
                    <g class="artboard-layer artboard-grid" :style="{ opacity: grid ? 1 : 0 }">
                        <line v-for="x in COLS" :key="`c${x}`" :x1="x" y1="0" :x2="x" y2="90" />
                        <line v-for="y in ROWS" :key="`r${y}`" x1="0" :y1="y" x2="160" :y2="y" />
                    </g>
                    <path class="artboard-path" :d="PATH" />
                    <g class="artboard-layer artboard-edit" :style="{ opacity: drawing ? 1 : 0 }">
                        <line
                            v-for="([x, y], i) in HANDLES"
                            :key="`h${i}`"
                            :x1="SELECTED[0]"
                            :y1="SELECTED[1]"
                            :x2="x"
                            :y2="y"
                        />
                        <circle v-for="([x, y], i) in HANDLES" :key="`d${i}`" :cx="x" :cy="y" r="1.1" />
                        <rect
                            v-for="([x, y], i) in ANCHORS"
                            :key="`a${i}`"
                            :x="x - 1.5"
                            :y="y - 1.5"
                            width="3"
                            height="3"
                        />
                    </g>
                </svg>
            </ScenePage>
        </template>
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

/* Ink on the Card: hairlines at the seam alpha, the path and its anchors in the
   foreground. Strokes keep their width at any size of the board. */
.artboard {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    color: var(--foreground);
}

.artboard line,
.artboard path {
    fill: none;
    vector-effect: non-scaling-stroke;
}

.artboard-grid line {
    stroke: oklch(from var(--foreground) l c h / var(--ink-seam));
    stroke-width: 1;
}

.artboard-path {
    stroke: currentcolor;
    stroke-width: 2;
    stroke-linecap: round;
}

.artboard-edit line {
    stroke: currentcolor;
    stroke-width: 1;
}

.artboard-edit circle,
.artboard-edit rect {
    fill: currentcolor;
}

.artboard-layer {
    transition: opacity var(--duration-normal) var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
    .artboard-layer {
        transition: none;
    }
}
</style>
