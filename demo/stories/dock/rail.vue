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
    DockSeparator,
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
                A vertical dock now carries the SAME collapse / morph / shrink machinery a
                horizontal dock does (AZ.W-DOCK-TAXONOMY) — it animates its
                <code class="rounded bg-muted px-1">height</code> on the
                <code class="rounded bg-muted px-1">--dock-morph-t</code> spring, the machinery the
                old rail variant denied. Hover to expand; the dock grows its block axis open and
                shrinks back to the collapsed circle on idle.
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

        <section class="flex flex-col gap-2 text-sm text-muted-foreground">
            <h2 class="text-subheading text-foreground">One dock taxonomy</h2>
            <p>
                A dock is HORIZONTAL or VERTICAL — one
                <code class="rounded bg-muted px-1">orientation</code> axis, no second way to express
                "vertical." Both orientations carry the layering system AND the collapse / morph /
                shrink machinery (a vertical dock morphs its
                <code class="rounded bg-muted px-1">height</code>, a horizontal dock its
                <code class="rounded bg-muted px-1">width</code>); a vertical nav column that wants the
                static always-expanded look passes
                <code class="rounded bg-muted px-1">always-expanded</code>.
            </p>
            <p>
                The ONLY "rail" left in the dock band is the
                <code class="rounded bg-muted px-1">.dock-layer-rail</code> switcher inside a
                <code class="rounded bg-muted px-1">&lt;DockLayerGroup&gt;</code> (Dock Layers) — a tab strip,
                not a nav column. The noun is otherwise free.
            </p>
        </section>
    </StoryPage>
</template>
