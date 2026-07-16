<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
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
    DockControl,
    DockSeparator,
    GlassDock,
} from "@glass/components/dock";
import { Tooltip, TooltipContent, TooltipTrigger } from "@glass/components/tooltip";
import { Aurora } from "@glass/components/aurora";
import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora";

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

const initialPostures = [
    { startCollapsed: true, label: "Starts compact" },
    { startCollapsed: false, label: "Starts open" },
] as const;

</script>

<template>
    <StoryPage>
        <StorySection heading="Vertical dock" gap="md">
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
                 because the empty-cream frame defeated the headline
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
                        <DockControl type="button" aria-label="Home">
                            <Home />
                        </DockControl>
                    </template>
                    <DockSeparator />
                    <Tooltip v-for="e in entries" :key="e.id">
                        <TooltipTrigger as-child>
                            <DockControl
                                type="button"
                                class="text-muted-foreground"
                                :aria-pressed="active === e.id"
                                :aria-current="active === e.id ? 'page' : undefined"
                                @click="active = e.id"
                            >
                                <component :is="e.icon" />
                                <span class="sr-only">{{ e.label }}</span>
                            </DockControl>
                        </TooltipTrigger>
                        <TooltipContent side="right">{{ e.label }}</TooltipContent>
                    </Tooltip>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection heading="Rounded shape" gap="md">
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
                        <DockControl type="button" aria-label="Home">
                            <Home />
                        </DockControl>
                    </template>
                    <DockSeparator />
                    <DockControl
                        v-for="e in entries.slice(0, 4)"
                        :key="e.id"
                        type="button"
                        class="text-muted-foreground"
                        :aria-label="e.label"
                    >
                        <component :is="e.icon" />
                    </DockControl>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection heading="Collapsible vertical dock — it morphs its height" gap="md">
            <p class="text-small text-muted-foreground">
                A vertical dock collapses and morphs its height like a horizontal dock does its
                width — it animates its
                <code class="rounded bg-muted px-1">height</code> on the
                <code class="rounded bg-muted px-1">--dock-morph-t</code> spring. Hover to expand;
                the dock grows its block axis open and shrinks back to the collapsed circle on idle.
                Both examples remain collapsible — the open posture is not pinned.
            </p>
            <div class="flex min-h-[18rem] flex-wrap items-start gap-8 p-6">
                <div
                    v-for="posture in initialPostures"
                    :key="posture.label"
                    class="flex flex-col items-start gap-3"
                >
                    <span class="text-mono-caption text-muted-foreground">{{ posture.label }}</span>
                    <GlassDock
                        orientation="vertical"
                        role="toolbar"
                        aria-orientation="vertical"
                        :start-collapsed="posture.startCollapsed"
                        :aria-label="`${posture.label} vertical dock`"
                        :data-testid="`dock-vertical-${posture.startCollapsed ? 'collapsed' : 'expanded'}-first-paint`"
                    >
                        <template #persistent>
                            <DockControl type="button" aria-label="Home">
                                <Home />
                            </DockControl>
                        </template>
                        <DockSeparator />
                        <DockControl
                            v-for="e in entries.slice(0, 5)"
                            :key="e.id"
                            type="button"
                            class="text-muted-foreground"
                            :aria-label="e.label"
                        >
                            <component :is="e.icon" />
                        </DockControl>
                        <template #collapsed>
                            <DockControl type="button" aria-label="Open navigation">
                                <component :is="NavigationIcon" />
                            </DockControl>
                        </template>
                    </GlassDock>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
