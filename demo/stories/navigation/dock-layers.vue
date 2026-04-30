<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Package, Layers, Library, FileText, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { GlassDock, DockIconButton, DockLayerGroup, DockLayer } from "@/components/custom/dock";
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
    <StoryPage>
        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Drill-in navigation</h2>
            <p class="text-small text-muted-foreground">
                Root pane shows three entry points. Clicking one swaps the pane; the dock resizes in place.
            </p>
            <p class="text-mono-caption text-muted-foreground" data-testid="dock-layer-readout">
                active layer = {{ activeLayer }}
            </p>
            <div class="flex justify-center rounded-card border border-border/40 bg-card/40 p-10">
                <GlassDock always-expanded fit-content>
                    <DockLayerGroup
                        v-model:active="activeLayer"
                        :show-rail="false"
                        data-testid="dock-layer-drill-group"
                    >
                        <DockLayer id="root" label="Root">
                            <button
                                v-for="l in layers"
                                :key="l.id"
                                class="inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]"
                                :aria-label="l.label"
                                :data-testid="`dock-layer-open-${l.id}`"
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
                            <DockIconButton aria-label="Back" @click="back">
                                <ChevronLeft class="h-4 w-4" />
                            </DockIconButton>
                            <div class="dock-separator" />
                            <component :is="l.icon" class="h-4 w-4 opacity-70" />
                            <span class="text-sm font-medium">{{ l.label }}</span>
                            <span class="text-xs text-muted-foreground">· {{ l.blurb }}</span>
                            <div class="dock-separator" />
                            <DockIconButton aria-label="New item">
                                <FileText class="h-4 w-4" />
                            </DockIconButton>
                            <DockIconButton aria-label="Forward">
                                <ChevronRight class="h-4 w-4" />
                            </DockIconButton>
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
                    <DockLayerGroup
                        v-model:active="activeLayer"
                        data-testid="dock-layer-rail-group"
                    >
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
    </StoryPage>
</template>
