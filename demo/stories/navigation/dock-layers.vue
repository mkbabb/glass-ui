<script setup lang="ts">
import { ref } from "vue";
import { Package, Layers, Library, FileText, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { GlassDock, DockLayerGroup, DockLayer } from "@/components/custom/dock";
import { cn } from "@/utils/cn";

type LayerId = "root" | "assets" | "layers" | "libs";

const activeLayer = ref<LayerId>("root");

const layers = [
    { id: "assets" as const, label: "Assets", icon: Package, blurb: "images, fonts, tokens" },
    { id: "layers" as const, label: "Layers", icon: Layers, blurb: "z-ordered surface stack" },
    { id: "libs" as const, label: "Libraries", icon: Library, blurb: "shared component kits" },
];

function open(id: LayerId) {
    activeLayer.value = id;
}

function back() {
    activeLayer.value = "root";
}
</script>

<template>
    <div class="mx-auto flex max-w-5xl flex-col gap-10 p-8">
        <header class="flex flex-col gap-1">
            <p class="text-admin-label text-muted-foreground">Navigation · DockLayerGroup</p>
            <h1 class="text-title">Dock Layers</h1>
            <p class="text-prose max-w-prose text-muted-foreground">
                <code class="rounded bg-muted px-1">DockLayerGroup</code> stacks named
                <code class="rounded bg-muted px-1">&lt;DockLayer&gt;</code> children in a CSS grid and coordinates
                crossfade + size FLIP on swap. An optional Figma-style switcher rail renders from each layer's
                metadata (label + icon).
            </p>
        </header>

        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Drill-in navigation</h2>
            <p class="text-small text-muted-foreground">
                Root pane shows three entry points. Clicking one swaps the pane; the dock resizes in place.
            </p>
            <div class="flex justify-center rounded-card border border-border/40 bg-card/40 p-10">
                <GlassDock always-expanded fit-content>
                    <DockLayerGroup v-model:active="activeLayer" :show-rail="false">
                        <DockLayer id="root" label="Root">
                            <button
                                v-for="l in layers"
                                :key="l.id"
                                class="dock-icon-btn-compact flex items-center gap-1 px-2 text-sm"
                                :aria-label="l.label"
                                @click="open(l.id)"
                            >
                                <component :is="l.icon" class="h-4 w-4" />
                                <span>{{ l.label }}</span>
                            </button>
                        </DockLayer>
                        <DockLayer
                            v-for="l in layers"
                            :key="l.id"
                            :id="l.id"
                            :label="l.label"
                            :icon="l.icon"
                        >
                            <button class="dock-icon-btn" aria-label="Back" @click="back">
                                <ChevronLeft class="h-4 w-4" />
                            </button>
                            <div class="dock-separator" />
                            <component :is="l.icon" class="h-4 w-4 opacity-70" />
                            <span class="text-sm font-medium">{{ l.label }}</span>
                            <span class="text-xs text-muted-foreground">· {{ l.blurb }}</span>
                            <div class="dock-separator" />
                            <button class="dock-icon-btn" aria-label="New item">
                                <FileText class="h-4 w-4" />
                            </button>
                            <button class="dock-icon-btn" aria-label="Forward">
                                <ChevronRight class="h-4 w-4" />
                            </button>
                        </DockLayer>
                    </DockLayerGroup>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Switcher rail</h2>
            <p class="text-small text-muted-foreground">
                Pass <code class="rounded bg-muted px-1">show-rail</code> to render the built-in switcher.
                Each <code class="rounded bg-muted px-1">DockLayer</code>'s icon + label populates the rail.
            </p>
            <div class="flex justify-center rounded-card border border-border/40 bg-card/40 p-10">
                <GlassDock always-expanded fit-content>
                    <DockLayerGroup v-model:active="activeLayer">
                        <DockLayer
                            v-for="l in layers"
                            :key="l.id"
                            :id="l.id"
                            :label="l.label"
                            :icon="l.icon"
                        >
                            <component :is="l.icon" class="h-4 w-4" />
                            <span class="px-1 text-sm font-medium">{{ l.label }}</span>
                            <span class="text-xs text-muted-foreground">{{ l.blurb }}</span>
                        </DockLayer>
                    </DockLayerGroup>
                </GlassDock>
            </div>
        </section>

        <section class="text-small flex flex-col gap-2 text-muted-foreground">
            <h2 class="text-subheading text-foreground">Mechanics</h2>
            <ol class="list-decimal space-y-1 pl-5">
                <li>Capture the container's current dimension, pin it inline.</li>
                <li>Swap active/leaving classes on the panes (grid-stacked at <code class="rounded bg-muted px-1">1 / 1</code>).</li>
                <li>Measure the new pane's natural dimension on <code class="rounded bg-muted px-1">nextTick</code>.</li>
                <li>Re-pin to old dimension, then transition to new on the next frame.</li>
                <li>Clear inline dimension on <code class="rounded bg-muted px-1">transitionend</code>.</li>
            </ol>
        </section>
    </div>
</template>
