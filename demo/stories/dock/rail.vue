<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import {
    Home,
    Compass,
    Shapes,
    Boxes,
    Database,
    Bell,
    Sparkles,
    LayoutDashboard,
    Navigation as NavigationIcon,
} from "@lucide/vue";
import {
    DockIconButton,
    DockLayer,
    DockLayerGroup,
    DockSeparator,
    DockStack,
    GlassDock,
} from "../../../src/components/custom/dock";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../src/components/ui/tooltip";
import { Aurora } from "../../../src/components/custom/aurora";
import { DEFAULT_AURORA_CONFIG } from "../../../src/components/custom/aurora";

interface Entry {
    id: string;
    label: string;
    icon: typeof Compass;
}

const entries: Entry[] = [
    { id: "foundations", label: "Foundations", icon: Compass },
    { id: "primitives", label: "Primitives", icon: Shapes },
    { id: "containers", label: "Containers", icon: Boxes },
    { id: "navigation", label: "Navigation", icon: NavigationIcon },
    { id: "data", label: "Data", icon: Database },
    { id: "feedback", label: "Feedback", icon: Bell },
    { id: "motion", label: "Motion", icon: Sparkles },
    { id: "compositions", label: "Compositions", icon: LayoutDashboard },
];

const active = ref<string>("primitives");

// BC.W-DOCK-STACK-RAIL — the macOS hover-expand STACK (the clean-break rebuild of the
// retired divider-carousel). A `<DockStack>` is a core anchor item whose members fan OUT
// next to the rail on hover/focus, extending BEYOND the dock edge into its gutter (the
// kept `.glass-dock-frame` escape). The `railLayer` ref is bound to BOTH the
// `<DockLayerGroup v-model:active>` AND `<DockStack v-model:selected>` (ONE registry — the
// stack writes the same ref the layer group reads; no parallel state). The members ARE
// `railLayers` (id + label + icon).
const railLayer = ref<string>("assets");
const railLayers = [
    { id: "assets", label: "Assets", icon: Shapes },
    { id: "layers", label: "Layers", icon: Boxes },
    { id: "libraries", label: "Libraries", icon: Database },
];
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Vertical dock</h2>
            <p class="text-small text-muted-foreground">
                A vertical <code class="rounded bg-muted px-1">&lt;GlassDock orientation="vertical"&gt;</code>
                is the side-nav column. There is ONE way to express orientation — the
                <code class="rounded bg-muted px-1">orientation</code> prop — and a vertical dock carries the
                SAME nav pattern every dock follows: a home control in the leading
                <code class="rounded bg-muted px-1">#persistent</code> slot (home-left), the nav items, and
                <code class="rounded bg-muted px-1">&lt;DockSeparator&gt;</code> dividers between groups. The
                selected item reads as a glass tier over the dock substrate via
                <code class="rounded bg-muted px-1">aria-pressed</code> — no hand-rolled active class.
            </p>
            <!-- The dock is glass — stage a low-intensity contained Aurora wash
                 behind the specimen so the dock reads as glass against a backdrop
                 (W-SB-STAGE §2.2; the empty-cream frame defeated the headline
                 primitive). ONE Aurora context per page — within the WebGL budget. -->
            <div class="relative flex justify-start overflow-hidden rounded-[var(--radius-card)] p-6">
                <Aurora
                    :config="DEFAULT_AURORA_CONFIG"
                    :opacity-ceiling="0.4"
                    class="absolute inset-0"
                    aria-hidden="true"
                />
                <GlassDock
                    orientation="vertical"
                    always-expanded
                    class="relative z-10"
                    aria-label="Example vertical dock"
                >
                    <!-- Home is the persistent leading anchor (home-left), the same
                         #persistent slot the showcase dock uses. -->
                    <template #persistent>
                        <DockIconButton type="button" aria-label="Home">
                            <Home />
                        </DockIconButton>
                    </template>
                    <DockSeparator />
                    <Tooltip v-for="e in entries" :key="e.id">
                        <TooltipTrigger as-child>
                            <DockIconButton
                                type="button"
                                class="text-muted-foreground"
                                :aria-pressed="active === e.id"
                                :aria-current="active === e.id ? 'page' : undefined"
                                @click="active = e.id"
                            >
                                <component :is="e.icon" />
                                <span class="sr-only">{{ e.label }}</span>
                            </DockIconButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">{{ e.label }}</TooltipContent>
                    </Tooltip>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Rounded shape</h2>
            <p class="text-small text-muted-foreground">
                Consumers can switch to rectangular corners via
                <code class="rounded bg-muted px-1">shape="rounded"</code> when the dock hosts a
                tool palette rather than a category nav. The nav pattern holds — home-left
                <code class="rounded bg-muted px-1">#persistent</code> + a
                <code class="rounded bg-muted px-1">&lt;DockSeparator&gt;</code> before the tool group.
            </p>
            <div class="flex justify-start">
                <GlassDock
                    orientation="vertical"
                    always-expanded
                    shape="rounded"
                    aria-label="Rounded vertical dock"
                >
                    <template #persistent>
                        <DockIconButton type="button" aria-label="Home">
                            <Home />
                        </DockIconButton>
                    </template>
                    <DockSeparator />
                    <DockIconButton
                        v-for="e in entries.slice(0, 4)"
                        :key="e.id"
                        type="button"
                        class="text-muted-foreground"
                        :aria-label="e.label"
                    >
                        <component :is="e.icon" />
                    </DockIconButton>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Collapsible vertical dock — it morphs its height</h2>
            <p class="text-small text-muted-foreground">
                A vertical dock collapses and morphs its height like a horizontal dock does its
                width — it animates its
                <code class="rounded bg-muted px-1">height</code> on the
                <code class="rounded bg-muted px-1">--dock-morph-t</code> spring. Hover to expand;
                the dock grows its block axis open and shrinks back to the collapsed circle on idle.
            </p>
            <div class="flex min-h-[18rem] items-start justify-start p-6">
                <GlassDock
                    orientation="vertical"
                    :start-collapsed="true"
                    aria-label="Collapsible vertical dock"
                    data-testid="dock-vertical-collapsible"
                >
                    <template #persistent>
                        <DockIconButton type="button" aria-label="Home">
                            <Home />
                        </DockIconButton>
                    </template>
                    <DockSeparator />
                    <DockIconButton
                        v-for="e in entries.slice(0, 5)"
                        :key="e.id"
                        type="button"
                        class="text-muted-foreground"
                        :aria-label="e.label"
                    >
                        <component :is="e.icon" />
                    </DockIconButton>
                    <template #collapsed>
                        <DockIconButton type="button" aria-label="Open navigation">
                            <component :is="NavigationIcon" />
                        </DockIconButton>
                    </template>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Stack rail — the macOS hover-expand stack beyond the dock edge</h2>
            <p class="text-small text-muted-foreground">
                <code class="rounded bg-muted px-1">&lt;DockStack&gt;</code> is the macOS Dock
                hover-expand STACK: a thin rail extending BEYOND the dock edge into its own
                gutter, carrying a core anchor item. Hover (or focus) the core and its members
                FAN OUT next to the rail — a column of fully-visible glass icons springing open
                beside the line, each on the iOS liquid clock. It is dock CHROME — rendered in the
                <code class="rounded bg-muted px-1">#rail</code> slot OUTSIDE the clipped morph
                aperture — so it NEVER changes the dock's width/height (the box is INVIOLATE), it
                clears <code class="rounded bg-muted px-1">&lt;main&gt;</code> by topology (the fan
                extends into the gutter, away from content), and it PERSISTS when the dock
                collapses. The members write the SAME
                <code class="rounded bg-muted px-1">railLayer</code> ref the
                <code class="rounded bg-muted px-1">&lt;DockLayerGroup&gt;</code> reads (one
                registry, no parallel state). 3 visible at rest; a longer stack scrolls.
            </p>
            <p class="text-mono-caption text-muted-foreground" data-testid="dock-rail-readout">
                active layer = {{ railLayer }}
            </p>
            <div class="flex min-h-[20rem] items-start justify-start p-10">
                <GlassDock
                    orientation="vertical"
                    :start-collapsed="true"
                    aria-label="Dock with a hairline context rail"
                    data-testid="dock-with-rail"
                >
                    <template #persistent>
                        <DockIconButton type="button" aria-label="Home">
                            <Home />
                        </DockIconButton>
                    </template>
                    <DockSeparator />
                    <DockLayerGroup
                        v-model:active="railLayer"
                        :show-rail="false"
                        data-testid="dock-with-rail-group"
                    >
                        <DockLayer
                            v-for="l in railLayers"
                            :key="l.id"
                            :id="l.id"
                            :label="l.label"
                            :icon="l.icon"
                        >
                            <component :is="l.icon" class="h-4 w-4" />
                            <span class="px-1 text-sm font-medium">{{ l.label }}</span>
                        </DockLayer>
                    </DockLayerGroup>
                    <template #collapsed>
                        <DockIconButton type="button" aria-label="Open navigation">
                            <component :is="NavigationIcon" />
                        </DockIconButton>
                    </template>
                    <!-- The macOS hover-expand stack — the core anchor sits at the dock
                         edge; hover/focus fans its members OUT into the gutter beyond the
                         dock's block edge. Clicking one switches the active layer. Persists
                         on collapse (it is chrome), the box stays INVIOLATE. -->
                    <template #rail>
                        <DockStack
                            v-model:selected="railLayer"
                            :items="railLayers"
                            core-label="Dock layers"
                            data-testid="dock-stack-control"
                        />
                    </template>
                </GlassDock>
            </div>
        </section>
    </StoryPage>
</template>
