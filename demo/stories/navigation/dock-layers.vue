<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Package, Layers, Library, FileText, ChevronLeft, ChevronRight } from "@lucide/vue";
import { GlassDock, DockIconButton, DockLayerGroup, DockLayer } from "../../../src/components/custom/dock";
import { cn } from "../../../src/utils/cn";

type LayerId = "root" | "assets" | "layers" | "libs";

const activeLayer = ref<LayerId>("root");
const railLayer = ref<LayerId>("assets");

/* The collapsible nested showcase: a layer group inside a collapsible (not
   always-expanded) GlassDock, so a collapse-while-switching gesture exercises
   the morph. Two panes + a switcher rail so panes can swap while the dock
   collapses/expands. */
const nestedLayer = ref<LayerId>("assets");

/* The vertical-overflow case: a vertical DockLayerGroup whose active pane
   carries more rows than fit the resting height, so the inner grid scrolls
   rather than fighting the dock's height. */
const overflowLayer = ref<LayerId>("assets");
const overflowRows = [
    "z-order surface stack",
    "shared component kits",
    "image + font tokens",
    "spacing + radius scale",
    "motion + easing tokens",
    "color ramp + tints",
    "glass tier ladder",
    "shadow + elevation set",
];

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
                                class="focus-ring inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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

        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Rail-hosted layer stack</h2>
            <p class="text-small text-muted-foreground">
                A layer group inside <code class="rounded bg-muted px-1">GlassDock variant="rail"</code>
                inherits the dock's vertical orientation without a duplicate prop.
            </p>
            <div class="flex justify-center rounded-card border border-border/40 bg-card/40 p-10">
                <GlassDock
                    variant="rail"
                    shape="rounded"
                    aria-label="Rail layer dock"
                    data-testid="dock-rail-layer-host"
                >
                    <DockLayerGroup
                        v-model:active="railLayer"
                        :show-rail="false"
                        data-testid="dock-rail-layer-group"
                    >
                        <DockLayer
                            v-for="l in layers"
                            :key="l.id"
                            :id="l.id"
                            :label="l.label"
                            :icon="l.icon"
                        >
                            <DockIconButton
                                v-for="candidate in layers"
                                :key="candidate.id"
                                :aria-label="candidate.label"
                                :aria-pressed="railLayer === candidate.id"
                                @click="railLayer = candidate.id"
                            >
                                <component :is="candidate.icon" class="h-4 w-4" />
                            </DockIconButton>
                        </DockLayer>
                    </DockLayerGroup>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Collapse-while-switching (one orchestrator)</h2>
            <p class="text-small text-muted-foreground">
                A layer group inside a <strong>collapsible</strong> dock. Hover to expand;
                switch panes via the rail. The dock box and the nested pane stack morph on
                ONE spring (one <code class="rounded bg-muted px-1">--dock-morph-t</code> clock)
                — no second engine, no double-animated pixels.
            </p>
            <div class="flex justify-center rounded-card border border-border/40 bg-card/40 p-10">
                <GlassDock fit-content data-testid="dock-nested-collapsible">
                    <DockLayerGroup
                        v-model:active="nestedLayer"
                        data-testid="dock-nested-collapsible-group"
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
                    <template #collapsed>
                        <DockIconButton aria-label="Open layers">
                            <Layers class="h-4 w-4" />
                        </DockIconButton>
                    </template>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Vertical overflow (re-adoption proof)</h2>
            <p class="text-small text-muted-foreground">
                A vertical <code class="rounded bg-muted px-1">DockLayerGroup</code> whose active
                pane carries more rows than the resting height — it reflows cleanly without
                fighting <code class="rounded bg-muted px-1">max-height</code> (the bbnf-buddy case
                the inner grid chain used to lose).
            </p>
            <div class="flex justify-center rounded-card border border-border/40 bg-card/40 p-10">
                <GlassDock
                    variant="rail"
                    shape="rounded"
                    aria-label="Vertical overflow dock"
                    data-testid="dock-vertical-overflow-host"
                >
                    <DockLayerGroup
                        v-model:active="overflowLayer"
                        orientation="vertical"
                        data-testid="dock-vertical-overflow-group"
                    >
                        <DockLayer
                            v-for="l in layers"
                            :key="l.id"
                            :id="l.id"
                            :label="l.label"
                            :icon="l.icon"
                        >
                            <div class="flex flex-col gap-1 py-1">
                                <div class="flex items-center gap-2 px-1">
                                    <component :is="l.icon" class="h-4 w-4" />
                                    <span class="text-sm font-medium">{{ l.label }}</span>
                                </div>
                                <span
                                    v-for="(row, i) in overflowRows"
                                    :key="i"
                                    class="px-1 text-xs text-muted-foreground"
                                    >{{ row }}</span
                                >
                            </div>
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
