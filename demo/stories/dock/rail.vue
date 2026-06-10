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
const activeVertical = ref<string>("primitives");
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Default pill</h2>
            <p class="text-small text-muted-foreground">
                Vertical <code class="rounded bg-muted px-1">GlassDock</code> rail composes the SAME
                nav pattern every dock follows: a home control in the leading
                <code class="rounded bg-muted px-1">#persistent</code> slot (home-left), the nav
                items, and <code class="rounded bg-muted px-1">&lt;DockSeparator&gt;</code> dividers
                between groups. The selected item reads as a glass tier over the dock substrate via
                <code class="rounded bg-muted px-1">aria-pressed</code> — no hand-rolled active class.
            </p>
            <!-- The rail is glass — stage a low-intensity contained Aurora wash
                 behind the specimen so the rail reads as glass against a backdrop
                 (W-SB-STAGE §2.2; the empty-cream frame defeated the headline
                 primitive). ONE Aurora context per page — within the WebGL budget. -->
            <div class="relative flex justify-start overflow-hidden rounded-[var(--radius-card)] p-6">
                <Aurora
                    :config="DEFAULT_AURORA_CONFIG"
                    :opacity-ceiling="0.4"
                    class="absolute inset-0"
                    aria-hidden="true"
                />
                <GlassDock variant="rail" class="relative z-10" aria-label="Example dock rail">
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
                <GlassDock variant="rail" shape="rounded" aria-label="Rounded dock rail">
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
            <h2 class="text-subheading">Vertical dock vs. rail — the contrast (DK9 / DK10)</h2>
            <p class="text-small text-muted-foreground">
                The rail is NOT just a vertical dock. A plain
                <code class="rounded bg-muted px-1">&lt;GlassDock orientation="vertical"&gt;</code> (left) is a
                generic vertical tool palette — no nav-item affordance. The
                <code class="rounded bg-muted px-1">variant="rail"</code> (right) is a recognizable navigation
                column: the active-item accent + the leading-edge accent rule (now SHIPPED in the variant CSS,
                tokenized via <code class="rounded bg-muted px-1">--dock-rail-active-accent</code>) + the rail
                plate make it read as a purpose-built side nav. Architecturally distinct, not 6 surface rules
                apart from a generic vertical dock.
            </p>
            <div class="flex flex-wrap items-start gap-10">
                <div class="flex flex-col items-center gap-2">
                    <span class="text-xs uppercase tracking-wider text-muted-foreground">orientation="vertical"</span>
                    <GlassDock orientation="vertical" always-expanded aria-label="Plain vertical dock">
                        <DockIconButton
                            v-for="e in entries.slice(0, 5)"
                            :key="e.id"
                            type="button"
                            class="text-muted-foreground"
                            :aria-label="e.label"
                        >
                            <component :is="e.icon" />
                        </DockIconButton>
                    </GlassDock>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <span class="text-xs uppercase tracking-wider text-muted-foreground">variant="rail"</span>
                    <GlassDock variant="rail" aria-label="Refined nav rail">
                        <Tooltip v-for="e in entries.slice(0, 5)" :key="e.id">
                            <TooltipTrigger as-child>
                                <DockIconButton
                                    type="button"
                                    class="text-muted-foreground"
                                    :aria-pressed="activeVertical === e.id"
                                    :aria-current="activeVertical === e.id ? 'page' : undefined"
                                    @click="activeVertical = e.id"
                                >
                                    <component :is="e.icon" />
                                    <span class="sr-only">{{ e.label }}</span>
                                </DockIconButton>
                            </TooltipTrigger>
                            <TooltipContent side="right">{{ e.label }}</TooltipContent>
                        </Tooltip>
                    </GlassDock>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-2 text-sm text-muted-foreground">
            <h2 class="text-subheading text-foreground">Naming — three rails, three things</h2>
            <ul class="list-disc space-y-1 pl-5">
                <li>
                    <strong>Dock Rail</strong> — <code class="rounded bg-muted px-1">GlassDock variant="rail"</code>,
                    this page. A vertical nav column, vertical-always-expanded by contract:
                    <code class="rounded bg-muted px-1">collapseDelay</code> /
                    <code class="rounded bg-muted px-1">startCollapsed</code> /
                    <code class="rounded bg-muted px-1">layout</code> are a COMPILE error under the rail variant
                    (the inapplicable collapse surface is type-narrowed away — the honest rail contract).
                </li>
                <li>
                    <strong>Layer-switcher rail</strong> — the
                    <code class="rounded bg-muted px-1">.dock-layer-rail</code> inside a
                    <code class="rounded bg-muted px-1">&lt;DockLayerGroup&gt;</code> (Dock Layers). A tab strip,
                    not a nav column.
                </li>
            </ul>
        </section>
    </StoryPage>
</template>
