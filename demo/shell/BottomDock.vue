<script setup lang="ts">
// BottomDock: the pager dock. Folded, it names the current page and keeps Previous and
// Next live; open, it lists the section's pages and steps between sections. It opens
// on hover where the pointer is fine and on a press where it is coarse. Where there is
// no rail, its leading seat opens the categories in a Sheet.
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    PanelLeft,
} from "@lucide/vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
// The shell mounts Sheets only; deep imports keep the centred dialog plate out of the
// boot graph.
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
import { useStoryNavigation } from "../chassis/useStoryNavigation";

const { current, next, prev, nextCategory, prevCategory, goTo } = useStoryNavigation();
const route = useRoute();

const pageTitle = computed(() => String(route.meta.title ?? "Glass UI"));

const categoryStories = computed(() => {
    const loc = current.value;
    if (!loc) return [];
    return loc.category.stories.map((story, index) => ({
        story,
        active: index === loc.storyIndex,
    }));
});

function goToStory(storyId: string): void {
    const loc = current.value;
    if (loc) goTo(loc.category.id, storyId);
}

const sheetOpen = ref(false);

// Hover opens the dock under a fine pointer; a coarse pointer opens it by a press.
const coarse = ref(false);
let mql: MediaQueryList | null = null;
const onPointerChange = (e: MediaQueryListEvent | MediaQueryList) => {
    coarse.value = e.matches;
};
onMounted(() => {
    mql = window.matchMedia("(pointer: coarse)");
    onPointerChange(mql);
    mql.addEventListener("change", onPointerChange);
});
onBeforeUnmount(() => mql?.removeEventListener("change", onPointerChange));
</script>

<template>
    <nav class="demo-bottom-dock" aria-label="Pages in this section">
        <GlassDock
            orientation="horizontal"
            fit-content
            collapse="closed"
            :expand-on="coarse ? 'press' : 'hover'"
            collapsed-label="Pages in this section"
            class="demo-bottom-dock__shell"
            data-testid="bottom-dock-collapsible"
        >
            <!-- The categories seat, only where there is no rail. -->
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
                                            class="demo-bottom-dock__menu"
                                            aria-label="Open category navigation"
                                        >
                                            <PanelLeft class="h-4 w-4" aria-hidden="true" />
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
                                <DialogDescription>Jump to a category.</DialogDescription>
                            </DialogHeader>
                            <SidebarDock
                                :show-tooltips="false"
                                :folds="false"
                                @navigate="sheetOpen = false"
                            />
                        </SheetContent>
                    </Dialog>
                    <DockSeparator />
                </div>
            </template>

            <template #collapsed>
                <span class="demo-pager-title text-small text-foreground" data-pager-title>{{ pageTitle }}</span>
            </template>

            <TooltipProvider :delay-duration="250">
                <FadingScroll axis="x" class="demo-bottom-dock__tabs">
                    <DockControl
                        v-for="entry in categoryStories"
                        :key="entry.story.id"
                        shape="tab"
                        :aria-current="entry.active ? 'page' : undefined"
                        :aria-label="entry.story.title"
                        @click="goToStory(entry.story.id)"
                    >
                        {{ entry.story.title }}
                    </DockControl>
                </FadingScroll>

                <DockSeparator v-if="categoryStories.length" />

                <div class="contents" role="group" aria-label="Sections">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <DockControl
                                type="button"
                                aria-label="Previous section"
                                @click="prevCategory()"
                            >
                                <ChevronsLeft class="h-4 w-4" aria-hidden="true" />
                            </DockControl>
                        </TooltipTrigger>
                        <TooltipContent side="top" :side-offset="10">
                            Previous section · <kbd class="font-mono text-micro">{</kbd>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <DockControl
                                type="button"
                                aria-label="Next section"
                                @click="nextCategory()"
                            >
                                <ChevronsRight class="h-4 w-4" aria-hidden="true" />
                            </DockControl>
                        </TooltipTrigger>
                        <TooltipContent side="top" :side-offset="10">
                            Next section · <kbd class="font-mono text-micro">}</kbd>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>

            <!-- Previous and Next stay live while the dock is folded. -->
            <template #persistent-end>
                <TooltipProvider :delay-duration="250">
                    <div class="contents" role="group" aria-label="Pages">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <DockControl
                                    type="button"
                                    aria-label="Previous page"
                                    @click="prev()"
                                >
                                    <ChevronLeft class="h-4 w-4" aria-hidden="true" />
                                </DockControl>
                            </TooltipTrigger>
                            <TooltipContent side="top" :side-offset="10">
                                Previous page · <kbd class="font-mono text-micro">[</kbd>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <DockControl
                                    type="button"
                                    aria-label="Next page"
                                    @click="next()"
                                >
                                    <ChevronRight class="h-4 w-4" aria-hidden="true" />
                                </DockControl>
                            </TooltipTrigger>
                            <TooltipContent side="top" :side-offset="10">
                                Next page · <kbd class="font-mono text-micro">]</kbd>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </template>
        </GlassDock>
    </nav>
</template>

<style scoped>
/* The page strip scrolls sideways inside its port, so the dock stays one row. */
.demo-bottom-dock__tabs {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    min-inline-size: 0;
    max-inline-size: min(60vw, 42rem);
    flex: 1 1 auto;
    white-space: nowrap;
}
.demo-bottom-dock__tabs > * {
    flex: 0 0 auto;
}

/* The folded face: the page's title, one line. The library holds the folded face to
   a fixed square today, so the title is clipped to it (LIBRARY-FAULTS, recorded in
   the P0 record); it sizes to its words when the face sizes to its content. */
.demo-pager-title {
    display: block;
    max-inline-size: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
