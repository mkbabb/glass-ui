<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import { Package, Layers, Library, FileText, ChevronLeft, ChevronRight, Image, Type } from "@lucide/vue";
import { GlassDock, DockControl, DockLayerGroup, DockLayer, DockCrossfade, DockSeparator } from "@glass/components/custom/dock";
import { cn } from "@glass/utils/cn";
import DockStage from "./DockStage.vue";

type LayerId = "root" | "assets" | "layers" | "libs";

// The drill-in group OWNS the `root` pane + three drill-in panes — it opens on
// `root`. The switcher-rail group has NO `root` pane (it shows the three layers
// directly), so it MUST init to a layer that EXISTS in its set — `assets` — or no
// pane matches `active` and the dock collapses to an empty stub (the B6 break: the
// shared `root` ref left the rail group with no active pane). Each group gets its
// own ref scoped to its own pane set.
const activeLayer = ref<LayerId>("root");
const switcherLayer = ref<Exclude<LayerId, "root">>("assets");
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

/* The CONTROLLED-NO-RAIL case (X3): the thin <DockCrossfade :active> consumed directly
   (the speedtest 5-pane pattern), driven by an external strip — no switcher rail, no
   selection engine. Faces of genuinely differing height exercise the peak reserve. */
const controlled = ref("assets");
const controlledPanes = [
    { id: "assets", label: "Assets", icon: Package, rows: ["images", "fonts"] },
    { id: "layers", label: "Layers", icon: Layers, rows: ["surface stack", "z-order", "blend", "opacity"] },
    { id: "media", label: "Media", icon: Image, rows: ["photos", "video", "audio"] },
    { id: "type", label: "Type", icon: Type, rows: ["families", "weights", "features", "tracking", "leading"] },
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
        <!-- BA.W-STAGE scope 8/9 (FD-DOCK-1) — the dock-layers demos sit over ONE
             shared, offscreen-paused aurora field (DockStage); the flat bg-card/40
             panels become transparent `.dock-stage-tile` framed slots so the
             DockLayerGroup glass floats over the live field. -->
        <DockStage #default="{ backgroundCanvas }">
        <StorySection heading="Drill-in navigation" gap="md">
            <p class="text-small text-muted-foreground">
                Root pane shows three entry points. Clicking one swaps the pane; the dock resizes in place.
            </p>
            <p class="text-mono-caption text-muted-foreground" data-testid="dock-layer-readout">
                active layer = {{ activeLayer }}
            </p>
            <div class="dock-stage-tile flex justify-center rounded-card border border-border/30 p-10">
                <GlassDock :background-canvas="backgroundCanvas" always-expanded fit-content>
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
                            <DockControl aria-label="Back" @click="back">
                                <ChevronLeft />
                            </DockControl>
                            <DockSeparator />
                            <component :is="l.icon" class="h-4 w-4 opacity-70" />
                            <span class="text-sm font-medium">{{ l.label }}</span>
                            <span class="text-xs text-muted-foreground">· {{ l.blurb }}</span>
                            <DockSeparator />
                            <DockControl aria-label="New item">
                                <FileText />
                            </DockControl>
                            <DockControl aria-label="Forward">
                                <ChevronRight />
                            </DockControl>
                        </DockLayer>
                    </DockLayerGroup>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection heading="Switcher rail — pull-to-switch" gap="md">
            <p class="text-small text-muted-foreground">
                Pass <code class="rounded bg-muted px-1">show-rail</code> to render the built-in switcher.
                Each <code class="rounded bg-muted px-1">DockLayer</code>'s icon + label populates the rail.
                With <code class="rounded bg-muted px-1">draggable</code> the rail is pull-to-switch:
                drag along the rail axis and fling to the nearest layer (the <code class="rounded bg-muted px-1">useDragMorph</code>
                consumer #2; the reka Arrow-key roving stays).
            </p>
            <div class="dock-stage-tile flex justify-center rounded-card border border-border/30 p-10">
                <GlassDock :background-canvas="backgroundCanvas" always-expanded fit-content>
                    <DockLayerGroup
                        v-model:active="switcherLayer"
                        draggable
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
        </StorySection>

        <StorySection heading="Rail-hosted layer stack" gap="md">
            <p class="text-small text-muted-foreground">
                A layer group inside a <code class="rounded bg-muted px-1">GlassDock orientation="vertical"</code>
                inherits the dock's vertical orientation without a duplicate prop.
            </p>
            <div class="dock-stage-tile flex justify-center rounded-card border border-border/30 p-10">
                <GlassDock :background-canvas="backgroundCanvas"
                    orientation="vertical"
                    always-expanded
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
                            <DockControl
                                v-for="candidate in layers"
                                :key="candidate.id"
                                :aria-label="candidate.label"
                                :aria-pressed="railLayer === candidate.id"
                                @click="railLayer = candidate.id"
                            >
                                <component :is="candidate.icon" />
                            </DockControl>
                        </DockLayer>
                    </DockLayerGroup>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection heading="Collapse while switching layers" gap="md">
            <p class="text-small text-muted-foreground">
                A layer group inside a <strong>collapsible</strong> dock. Hover to expand;
                switch panes via the rail. The dock box and the nested pane stack morph on
                ONE spring (one <code class="rounded bg-muted px-1">--dock-morph-t</code> clock)
                — no second engine, no double-animated pixels.
            </p>
            <div class="dock-stage-tile flex justify-center rounded-card border border-border/30 p-10">
                <GlassDock :background-canvas="backgroundCanvas" fit-content data-testid="dock-nested-collapsible">
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
                        <DockControl aria-label="Open layers">
                            <Layers />
                        </DockControl>
                    </template>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection heading="Vertical overflow — a tall pane scrolls cleanly" gap="md">
            <p class="text-small text-muted-foreground">
                A vertical <code class="rounded bg-muted px-1">DockLayerGroup</code> whose active
                pane carries more rows than the resting height — it scrolls its own block axis
                cleanly without fighting <code class="rounded bg-muted px-1">max-height</code>.
            </p>
            <div class="dock-stage-tile flex justify-center rounded-card border border-border/30 p-10">
                <GlassDock :background-canvas="backgroundCanvas"
                    orientation="vertical"
                    always-expanded
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
        </StorySection>

        <StorySection heading="Controlled — no rail" gap="md">
            <p class="text-small text-muted-foreground">
                The thin <code class="rounded bg-muted px-1">&lt;DockCrossfade :active&gt;</code>
                core consumed DIRECTLY — a controlled 4-pane crossfade with NO switcher rail
                (the speedtest pattern). An external strip drives <code class="rounded bg-muted px-1">active</code>;
                the faces cross-dissolve on the per-face <code class="rounded bg-muted px-1">--dock-t</code>
                spring, the box holds the PEAK face (differing heights never jump).
            </p>
            <div class="flex flex-wrap justify-center gap-1">
                <button
                    v-for="p in controlledPanes"
                    :key="p.id"
                    class="focus-ring inline-flex items-center gap-1 rounded-[var(--radius-pill)] border border-border/30 px-2 py-1 text-sm"
                    :class="controlled === p.id ? 'bg-muted text-foreground' : 'text-muted-foreground'"
                    :aria-pressed="controlled === p.id"
                    :data-testid="`dock-crossfade-select-${p.id}`"
                    @click="controlled = p.id"
                >
                    <component :is="p.icon" class="h-4 w-4" />
                    <span>{{ p.label }}</span>
                </button>
            </div>
            <div class="dock-stage-tile flex justify-center rounded-card border border-border/30 p-10">
                <GlassDock :background-canvas="backgroundCanvas" always-expanded fit-content>
                    <DockCrossfade :active="controlled" data-testid="dock-crossfade-controlled">
                        <DockLayer
                            v-for="p in controlledPanes"
                            :key="p.id"
                            :id="p.id"
                            :label="p.label"
                            :icon="p.icon"
                        >
                            <div class="flex flex-col gap-1 py-1">
                                <div class="flex items-center gap-2 px-1">
                                    <component :is="p.icon" class="h-4 w-4" />
                                    <span class="text-sm font-medium">{{ p.label }}</span>
                                </div>
                                <span
                                    v-for="(row, i) in p.rows"
                                    :key="i"
                                    class="dock-face-content px-1 text-xs text-muted-foreground"
                                    >{{ row }}</span
                                >
                            </div>
                        </DockLayer>
                    </DockCrossfade>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection heading="Mechanics" gap="sm">
            <ol class="text-small list-decimal space-y-1 pl-5 text-muted-foreground">
                <li>Faces stack on a CSS grid at <code class="rounded bg-muted px-1">1 / 1</code>; the box reserves the PEAK face height ONCE (never a per-swap FLIP).</li>
                <li>A switch cross-dissolves the two faces: the entering reads <code class="rounded bg-muted px-1">opacity: var(--dock-t)</code>, the leaving <code class="rounded bg-muted px-1">calc(1 - var(--dock-t))</code>.</li>
                <li>The <code class="rounded bg-muted px-1">--dock-t</code> scalar rides ONE interruptible <code class="rounded bg-muted px-1">useDockSpring</code> — a rapid re-toggle re-bases velocity-continuously (no hard cut, the liquid-weight edict; crossfade beats View Transitions).</li>
                <li>A dissolving focus-holder transfers focus to its successor (un-inert-before-focus).</li>
                <li>During a simultaneous collapse the <code class="rounded bg-muted px-1">.dock-face-content</code> wrapper clips off <code class="rounded bg-muted px-1">--dock-morph-t</code> — the interactive run's hover plates still overflow at rest.</li>
            </ol>
        </StorySection>
        </DockStage>
    </StoryPage>
</template>

<style scoped>
/* BA.W-STAGE scope 9 — transparent demo tiles over the shared DockStage field. */
.dock-stage-tile {
    background: transparent;
}
</style>
