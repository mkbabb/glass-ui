<script setup lang="ts">
// BottomDock — the demo's shell-anchored bottom-bar story dock (.b).
//
// A horizontal `always-expanded fit-content` GlassDock seated after the independently
// scrolling <main>. Its intrinsic height reserves the interaction-safe footer while
// route scroll never displaces it. It carries
// the in-category story tabs (the DockControl (shape="tab") set) PLUS the prev/next +
// prev/next-category controls that today live only as keyboard shortcuts, AND a
// mobile-only category trigger hosting the off-canvas SidebarDock in a left-side <SheetContent>.
//
// Active-story affordance uses the NCSU-red underline/pill and `tap-squish` on
// press; DockControl (shape="tab") auto-activates its `.is-active` state when the rendered
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
    DockControl,
    DockSeparator,
    GlassDock,
} from "@glass/components/dock";
// The shell mounts SHEETS, never the centred plate. Deep-import the root and the three
// text atoms so the dialog BARREL does not drag `DialogContent` — and its lucide ✕ — into
// the eager boot graph for a surface that can never show either.
import Dialog from "@glass/components/dialog/Dialog.vue";
import DialogDescription from "@glass/components/dialog/DialogDescription.vue";
import DialogHeader from "@glass/components/dialog/DialogHeader.vue";
import DialogTitle from "@glass/components/dialog/DialogTitle.vue";
import { DialogTrigger } from "reka-ui";
import SheetContent from "@glass/components/sheet/SheetContent.vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/tooltip";
import { FadingScroll } from "@glass/components/fading-scroll";
import SidebarDock from "./SidebarDock.vue";
import DockFacetMenu from "./DockFacetMenu.vue";
import { useStoryNavigation } from "../chassis/useStoryNavigation";
import { useShellNavDock } from "./useShellNavDock";

const { current, next, prev, nextCategory, prevCategory, goTo } = useStoryNavigation();

// Full in-category page list, not a summary slice.
// Every story in the active category is a jump-to-page tab in the scrolling strip; the
// active one carries aria-current="page" (DockControl (shape="tab") auto-lifts its selected-as-glass
// tier). The strip scrolls horizontally inside the <FadingScroll> port — the dock box
// stays one row (box-INVIOLATE).
const categoryStories = computed(() => {
    const loc = current.value;
    if (!loc) return [];
    return loc.category.stories.map((story, index) => ({
        story,
        index,
        active: index === loc.storyIndex,
    }));
});

function goToStory(storyId: string): void {
    const loc = current.value;
    if (loc) goTo(loc.category.id, storyId);
}

// Both shell docks share one route-to-facet resolver. The existing dropdown primitive
// owns focus, keyboard navigation, and top-layer positioning.
const { railItems, railContext } = useShellNavDock();
const sheetOpen = ref(false);

const loc = computed(() => current.value);

const categoryTitle = computed(() => loc.value?.category.title ?? "Stories");

// Prev/next are disabled at the category boundaries (no wrap); the category
// arrows wrap across categories carrying at least one story.
const hasPrev = computed(() => (loc.value ? loc.value.storyIndex > 0 : false));
const hasNext = computed(() =>
    loc.value ? loc.value.storyIndex < loc.value.category.stories.length - 1 : false,
);
</script>

<template>
    <nav class="demo-bottom-dock" aria-label="Stories in category">
        <!-- The bottom dock is always expanded (a single
             ~52px row): the persistent category trigger + the SCROLLING category-page tab
             strip (a <FadingScroll axis="x"> of every in-category page) + the persistent
             prev/next + category-jump nav group, all co-resident. The ≤4 collapsed-summary
             register is retired — the full page strip in the story-nav zone supersedes it.
             `fit-content` keeps the dock shrink-wrapped; the strip scrolls INSIDE its port
             so the box never inflates (box-INVIOLATE). -->
        <GlassDock
            orientation="horizontal"
            fit-content
            :collapse="false"
            class="demo-bottom-dock__shell"
            data-testid="bottom-dock-collapsible"
        >
            <!-- The desktop sidebar already owns category navigation. This compact
                 trigger exists only below that sidebar's breakpoint. -->
            <template #persistent>
                <div
                    class="demo-shell-category-menu contents"
                    data-shell-region="category-navigation"
                >
                    <Dialog v-model:open="sheetOpen">
                        <TooltipProvider :delay-duration="250">
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <DialogTrigger as-child>
                                        <DockControl
                                            type="button"
                                            class="demo-bottom-dock__menu tap-squish"
                                            aria-label="Open category navigation"
                                        >
                                            <PanelLeft
                                                class="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                        </DockControl>
                                    </DialogTrigger>
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
                            <DialogHeader class="sr-only">
                                <DialogTitle>Category navigation</DialogTitle>
                                <DialogDescription>
                                    Jump to a story category.
                                </DialogDescription>
                            </DialogHeader>
                            <SidebarDock
                                :show-tooltips="false"
                                @navigate="sheetOpen = false"
                            />
                        </SheetContent>
                    </Dialog>
                </div>
            </template>

            <DockSeparator class="demo-shell-category-menu" />

            <div class="contents" role="group" aria-label="Story navigation">
                    <TooltipProvider :delay-duration="250">
                        <!-- Previous and next remain persistent four-state
                             controls, never DOM-absent mid-row. Disabled (not removed) at a
                             true boundary so the row geometry holds and the control reads
                             honestly, never "flaky". -->
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <DockControl
                                    type="button"
                                    class="tap-squish"
                                    aria-label="Previous story"
                                    :disabled="!hasPrev"
                                    @click="prev()"
                                >
                                    <ChevronLeft class="h-4 w-4" aria-hidden="true" />
                                </DockControl>
                            </TooltipTrigger>
                            <TooltipContent side="top" :side-offset="10">
                                Previous story ·
                                <kbd class="font-mono text-micro">[</kbd>
                            </TooltipContent>
                        </Tooltip>

                        <!-- Scrolling category-page tab
                             strip. Every story in the active category as a jump-to-page
                             DockControl (shape="tab"), wrapped in the shipped <FadingScroll axis="x">
                             (start sharp at rest, end feathered while overflowing). The
                             strip scrolls INSIDE the port — the dock box stays one row
                             (box-INVIOLATE). Clicking a tab navigates via goToStory (one
                             registry). -->
                        <FadingScroll axis="x" class="demo-bottom-dock__tabs">
                            <DockControl
                                shape="tab"
                                v-for="entry in categoryStories"
                                :key="entry.story.id"
                                class="tap-squish"
                                :aria-current="entry.active ? 'page' : undefined"
                                :aria-label="entry.story.title"
                                @click="goToStory(entry.story.id)"
                            >
                                {{ entry.story.title }}
                            </DockControl>
                        </FadingScroll>

                        <!-- Next remains persistent and disabled (not
                             removed) at the last story; the row geometry never shifts. -->
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <DockControl
                                    type="button"
                                    class="tap-squish"
                                    aria-label="Next story"
                                    :disabled="!hasNext"
                                    @click="next()"
                                >
                                    <ChevronRight class="h-4 w-4" aria-hidden="true" />
                                </DockControl>
                            </TooltipTrigger>
                            <TooltipContent side="top" :side-offset="10">
                                Next story · <kbd class="font-mono text-micro">]</kbd>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
            </div>

            <DockSeparator />

            <div class="contents" role="group" aria-label="Category navigation">
                <!-- The trailing category-jump group rides the `nav` zone. The category
                     arrows WRAP across categories so they are always live (never dead
                     chrome), visually distinct from the in-category story arrows by the
                     chevrons-DOUBLE glyph (B8 — single = story, double = category). -->
                    <TooltipProvider :delay-duration="250">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <DockControl
                                    type="button"
                                    class="tap-squish"
                                    :aria-label="`Previous category (current: ${categoryTitle})`"
                                    @click="prevCategory()"
                                >
                                    <ChevronsLeft class="h-4 w-4" aria-hidden="true" />
                                </DockControl>
                            </TooltipTrigger>
                            <TooltipContent side="top" :side-offset="10">
                                Previous category ·
                                <kbd class="font-mono text-micro">{</kbd>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <DockControl
                                    type="button"
                                    class="tap-squish"
                                    :aria-label="`Next category (current: ${categoryTitle})`"
                                    @click="nextCategory()"
                                >
                                    <ChevronsRight class="h-4 w-4" aria-hidden="true" />
                                </DockControl>
                            </TooltipTrigger>
                            <TooltipContent side="top" :side-offset="10">
                                Next category ·
                                <kbd class="font-mono text-micro">}</kbd>
                            </TooltipContent>
                        </Tooltip>
                        <!-- the V↔H orientation-morph control is
                             DEFINITION-ABSENT (the in-situ dock morph retired
                             decided-terminal; the shell docks no longer morph orientation). -->
                    </TooltipProvider>
            </div>

            <DockFacetMenu
                v-if="railItems.length > 1"
                :items="railItems"
                :selected="railContext"
                side="top"
                data-testid="bottom-facet-rail"
                @select="railContext = $event"
            />
        </GlassDock>
    </nav>
</template>

<style scoped>
/* The category-page tab strip scrolls horizontally inside
   the FadingScroll port (the `.demo-bottom-dock__tabs` class is merged onto the
   <FadingScroll> root, which IS the `.fading-scroll--x` scroll port). Lay the slotted
   tab-shape DockControls in a row and cap the inline-size so overflow SCROLLS, never widening
   the dock box (box-INVIOLATE). `min-inline-size: 0` lets the flex child shrink below
   content; the cap keeps the strip a bounded scroller. */
.demo-bottom-dock__tabs {
    display: flex;
    align-items: center;
    gap: var(--dock-gap, 0.25rem);
    min-inline-size: 0;
    max-inline-size: min(60vw, 42rem);
    flex: 1 1 auto;
    /* The tab labels are short; keep each on one line so the strip reads as a row. */
    white-space: nowrap;
}
.demo-bottom-dock__tabs > * {
    flex: 0 0 auto;
}
</style>
