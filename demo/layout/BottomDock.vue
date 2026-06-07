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
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    PanelLeft,
} from "@lucide/vue";
import {
    DockIconButton,
    DockTabButton,
    GlassDock,
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

const { current, next, prev, nextCategory, prevCategory } =
    useStoryNavigation();

const sheetOpen = ref(false);

const loc = computed(() => current.value);

interface PagerEntry {
    id: string;
    title: string;
    to: string;
}

const entries = computed<PagerEntry[]>(() =>
    loc.value
        ? loc.value.category.stories.map((s) => ({
              id: s.id,
              title: s.title,
              to: `/${loc.value!.category.id}/${s.id}`,
          }))
        : [],
);

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
            <TooltipProvider :delay-duration="250">
                <!-- Mobile-only: off-canvas SidebarDock category trigger. The
                     Sheet primitive owns the open/close + aria-expanded native
                     a11y contract (no hand-bound dock collapse state). -->
                <Sheet v-model:open="sheetOpen">
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

                <span class="demo-bottom-dock__sep" aria-hidden="true" />

                <!-- Prev / next within the category. -->
                <Tooltip>
                    <TooltipTrigger as-child>
                        <DockIconButton
                            type="button"
                            class="tap-squish"
                            v-bind="{ disabled: !hasPrev }"
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

                <!-- In-category story tabs. -->
                <div class="demo-bottom-dock__tabs">
                    <DockTabButton
                        v-for="entry in entries"
                        :key="entry.id"
                        as-child
                        class="demo-bottom-dock__tab tap-squish"
                    >
                        <RouterLink :to="entry.to">{{ entry.title }}</RouterLink>
                    </DockTabButton>
                </div>

                <Tooltip>
                    <TooltipTrigger as-child>
                        <DockIconButton
                            type="button"
                            class="tap-squish"
                            v-bind="{ disabled: !hasNext }"
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

                <span class="demo-bottom-dock__sep" aria-hidden="true" />

                <!-- Prev / next category (wraps). -->
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
        </GlassDock>
    </nav>
</template>
