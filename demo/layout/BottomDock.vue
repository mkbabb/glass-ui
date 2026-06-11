<script setup lang="ts">
// BottomDock — the demo's viewport-anchored bottom-bar story dock (AW.W28.b).
//
// A horizontal `always-expanded fit-content overflow="scroll"` GlassDock pinned
// to the viewport bottom (NOT in document flow — it floats over the <main>
// scroll-region's bottom inset, so route scroll never displaces it). It carries
// the in-category story tabs (the DockTabButton set) PLUS the prev/next +
// prev/next-category controls that today live only as keyboard shortcuts, AND a
// mobile-only category trigger hosting the off-canvas SidebarDock in a <Sheet>.
//
// Active-story affordance = the NCSU-red underline/pill + W25 `tap-squish` on
// press; DockTabButton auto-activates its `.is-active` state when the rendered
// RouterLink carries aria-current="page". Dogfoods the dock + glass atoms +
// iOS-26 across the 3 viewports.
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    PanelLeft,
} from "@lucide/vue";
import {
    DockIconButton,
    DockRail,
    DockSeparator,
    GlassDock,
    type DockRailItem,
} from "../../src/components/custom/dock";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../src/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../src/components/ui/tooltip";
import SidebarDock from "./SidebarDock.vue";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import { useContextualDockLayers } from "../composables/useContextualDockLayers";

const { current, next, prev, nextCategory, prevCategory } =
    useStoryNavigation();

// AZ.W-RAIL3 — the FLOATING CAROUSEL rail. The third-rail redirect (USER-AUDIT R6):
// the contextual facets MOVE OUT of the dock body (the in-dock <DockLayerGroup>
// inflated the horizontal dock to ~3 rows — R6-1) and re-home as the rail's content:
// a floating cyclable strip of detached glass chips on the visible hairline OUTSIDE
// the dock box. The dock body returns to a single ~52px row. The route→facet RESOLVER
// (`useContextualDockLayers`) is KEPT — only its RENDER TARGET moves (the in-dock
// layer group → the rail strip), the SAME redirect the SidebarDock carries.
const route = useRoute();
const router = useRouter();
const { layers: contextLayers } = useContextualDockLayers(route);

// The chips ARE the route facets (Motion → Engines/Text FX/Entrance, …). The strip
// renders only when the section carries >1 facet (a single-facet section shows the
// bare arrow controls). The chip click navigates to that facet's first story — the
// SAME router navigation the prev/next arrows drive (one registry).
const railItems = computed<DockRailItem[]>(() =>
    contextLayers.value.length > 1
        ? contextLayers.value.map((l) => ({
              id: l.id,
              label: l.label,
              icon: typeof l.icon === "string" ? undefined : l.icon,
          }))
        : [],
);
const activeStoryId = computed<string | undefined>(
    () => route.meta.storyId as string | undefined,
);
const railContext = computed<string | undefined>({
    get: () => {
        const here = contextLayers.value.find((l) =>
            l.entries.some((e) => e.storyId === activeStoryId.value),
        );
        return (here ?? contextLayers.value[0])?.id;
    },
    set: (id) => {
        const facet = contextLayers.value.find((l) => l.id === id);
        const first = facet?.entries[0];
        const categoryId = route.meta.categoryId as string | undefined;
        if (first && categoryId) {
            void router.push(`/${categoryId}/${first.storyId}`);
        }
    },
});

const sheetOpen = ref(false);

const loc = computed(() => current.value);

const categoryTitle = computed(() => loc.value?.category.title ?? "Stories");

// Prev/next are disabled at the category boundaries (no wrap); the category
// arrows wrap across categories carrying at least one story.
const hasPrev = computed(() => (loc.value ? loc.value.storyIndex > 0 : false));
const hasNext = computed(() =>
    loc.value
        ? loc.value.storyIndex < loc.value.category.stories.length - 1
        : false,
);
</script>

<template>
    <nav class="demo-bottom-dock" aria-label="Stories in category">
        <GlassDock
            orientation="horizontal"
            always-expanded
            fit-content
            overflow="scroll"
            class="demo-bottom-dock__shell"
        >
            <!-- The category trigger is the home-left anchor — it lives in the
                 #persistent region so it stays put as the story tabs scroll. On
                 the mobile viewport it opens the off-canvas SidebarDock Sheet.
                 The Sheet primitive owns the open/close + aria-expanded native
                 a11y contract (no hand-bound dock collapse state). -->
            <template #persistent>
                <Sheet v-model:open="sheetOpen">
                    <TooltipProvider :delay-duration="250">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <SheetTrigger as-child>
                                    <DockIconButton
                                        type="button"
                                        class="demo-bottom-dock__menu tap-squish"
                                        aria-label="Open category navigation"
                                    >
                                        <PanelLeft class="h-4 w-4" aria-hidden="true" />
                                    </DockIconButton>
                                </SheetTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="top" :side-offset="10">
                                Categories
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <SheetContent
                        side="left"
                        class="demo-bottom-dock__sheet w-fit max-w-[18rem]"
                    >
                        <SheetHeader class="sr-only">
                            <SheetTitle>Category navigation</SheetTitle>
                            <SheetDescription>
                                Jump to a story category.
                            </SheetDescription>
                        </SheetHeader>
                        <SidebarDock
                            :show-tooltips="false"
                            @navigate="sheetOpen = false"
                        />
                    </SheetContent>
                </Sheet>
            </template>

            <TooltipProvider :delay-duration="250">
                <!-- A divider after the home-left category trigger, before the
                     in-category nav group (B9 — a divider separating the persistent
                     control from the nav run). -->
                <DockSeparator />

                <!-- Prev within the category — ADAPTIVE: rendered only when there IS
                     a previous story (B9 — no greyed-out dead chrome; the control is
                     absent when nothing's there, not a disabled stub). -->
                <Tooltip v-if="hasPrev">
                    <TooltipTrigger as-child>
                        <DockIconButton
                            type="button"
                            class="tap-squish"
                            aria-label="Previous story"
                            @click="prev()"
                        >
                            <ChevronLeft class="h-4 w-4" aria-hidden="true" />
                        </DockIconButton>
                    </TooltipTrigger>
                    <TooltipContent side="top" :side-offset="10">
                        Previous story ·
                        <kbd class="font-mono text-[0.7em]">[</kbd>
                    </TooltipContent>
                </Tooltip>

                <!-- AZ.W-RAIL3 — the in-category contextual FACET set NO LONGER mounts
                     inside the dock body (the prior in-dock <DockLayerGroup>'s column
                     switcher rail inflated the horizontal dock to ~3 rows — R6-1). The
                     facets re-home as the rail's floating carousel strip OUTSIDE the
                     dock box (the `#rail` slot below). The dock body keeps the
                     prev/next + category arrows ONLY → it returns to a single row
                     (G1 — box INVIOLATE). -->

                <!-- Next within the category — ADAPTIVE (B9): absent at the last
                     story, never a greyed forward arrow. -->
                <Tooltip v-if="hasNext">
                    <TooltipTrigger as-child>
                        <DockIconButton
                            type="button"
                            class="tap-squish"
                            aria-label="Next story"
                            @click="next()"
                        >
                            <ChevronRight class="h-4 w-4" aria-hidden="true" />
                        </DockIconButton>
                    </TooltipTrigger>
                    <TooltipContent side="top" :side-offset="10">
                        Next story · <kbd class="font-mono text-[0.7em]">]</kbd>
                    </TooltipContent>
                </Tooltip>

                <!-- A divider before the trailing category-jump group (B9 — a
                     dividing line before the right item). The category arrows WRAP
                     across categories, so they are always live (never dead chrome) —
                     they stay as the persistent trailing group, visually distinct
                     from the in-category story arrows by the chevrons-DOUBLE glyph
                     (B8 — the two arrow pairs are differentiated: single = story,
                     double = category). -->
                <DockSeparator />

                <!-- Prev / next category (wraps — always live). -->
                <Tooltip>
                    <TooltipTrigger as-child>
                        <DockIconButton
                            type="button"
                            class="tap-squish"
                            :aria-label="`Previous category (current: ${categoryTitle})`"
                            @click="prevCategory()"
                        >
                            <ChevronsLeft class="h-4 w-4" aria-hidden="true" />
                        </DockIconButton>
                    </TooltipTrigger>
                    <TooltipContent side="top" :side-offset="10">
                        Previous category ·
                        <kbd class="font-mono text-[0.7em]">{</kbd>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <DockIconButton
                            type="button"
                            class="tap-squish"
                            :aria-label="`Next category (current: ${categoryTitle})`"
                            @click="nextCategory()"
                        >
                            <ChevronsRight class="h-4 w-4" aria-hidden="true" />
                        </DockIconButton>
                    </TooltipTrigger>
                    <TooltipContent side="top" :side-offset="10">
                        Next category · <kbd class="font-mono text-[0.7em]">}</kbd>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <!-- AZ.W-RAIL3 — the FLOATING CAROUSEL rail. The in-category contextual
                 facets ride OUTSIDE the dock box as a strip of detached glass chips on
                 the visible connective hairline below the dock (the "floating carousel
                 almost"). The active facet (the one containing the current story) is
                 highlighted; selecting a chip navigates to that facet's first story —
                 the SAME router navigation the arrows drive (one registry). It is dock
                 chrome, so it never changes the dock's height. Rendered only when the
                 section carries >1 facet. -->
            <template #rail>
                <DockRail
                    v-if="railItems.length"
                    v-model:context="railContext"
                    :items="railItems"
                    icon-label="Section facets"
                    data-testid="bottom-dock-rail"
                />
            </template>
        </GlassDock>
    </nav>
</template>
