<script setup lang="ts">
// BottomDock — the demo's viewport-anchored bottom-bar story dock (AW.W28.b).
//
// A horizontal `always-expanded fit-content` GlassDock pinned
// to the viewport bottom (NOT in document flow — it floats over the <main>
// scroll-region's bottom inset, so route scroll never displaces it). It carries
// the in-category story tabs (the DockControl (shape="tab") set) PLUS the prev/next +
// prev/next-category controls that today live only as keyboard shortcuts, AND a
// mobile-only category trigger hosting the off-canvas SidebarDock in a left-placement <Dialog>.
//
// Active-story affordance = the NCSU-red underline/pill + W25 `tap-squish` on
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
    DockSection,
    DockSeparator,
    DockStack,
    GlassDock,
    type DockSectionDescriptor,
} from "@glass/components/custom/dock";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/ui/tooltip";
import { FadingScroll } from "@glass/components/custom/fading-scroll";
import SidebarDock from "./SidebarDock.vue";
import { useStoryNavigation } from "../chassis/useStoryNavigation";
import { useShellNavDock } from "./useShellNavDock";

const { current, next, prev, nextCategory, prevCategory, goTo } =
    useStoryNavigation();

// W-NAV-DOCK-FIX (defect 5) — the FULL in-category page list (NOT a ≤4 summary slice).
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

// BG.W-SHELL-DOCK-DRY — the shared facet-rail loop is factored ONCE into
// `useShellNavDock` (the SidebarDock + BottomDock were byte-duplicating the route→facet
// resolver wire, the railItems map, the SHELL-HOLD railContext writable computed, and the
// arrow-roving keydown). The BottomDock is the persistent bar, so it passes no
// `onNavigate` (a facet click just changes route); the in-category story-nav loop + the
// dock's own `sections` descriptors stay LOCAL. (BI.W-DOCK-RETIRES removed the in-situ
// V↔H dock-morph button — the morph retired decided-terminal.)
const { railItems, railContext } = useShellNavDock();

// BA.W-DOCK-SECTIONS — the declarative tripartite descriptor. The deleted section
// model returns WITHOUT inflation: <DockSection> GROUPS the EXISTING in-flow controls —
// the in-category story nav (`section` zone) + the trailing category-jump group (`nav`
// zone) — and adds only the <DockSeparator> seam between them (display:contents — the
// dock body stays a single row, box INVIOLATE). The `nav` descriptor's leading separator
// is the rail's anchor seam (the nav-separator on the bottom dock, the spec's named
// anchor). The facets (`layers`) ride the seam rail OUTSIDE the dock box.
const sections = computed<DockSectionDescriptor[]>(() => [
    { kind: "section", id: "story-nav", label: "Story navigation", layers: railItems.value },
    { kind: "nav", id: "category-jump", label: "Category navigation" },
]);
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
        <!-- W-NAV-DOCK-FIX (defects 2, 5) — the bottom dock is ALWAYS-EXPANDED (a single
             ~52px row): the persistent category trigger + the SCROLLING category-page tab
             strip (a <FadingScroll axis="x"> of every in-category page) + the persistent
             prev/next + category-jump nav group, all co-resident. The ≤4 collapsed-summary
             register is retired — the full page strip in the story-nav zone supersedes it.
             `fit-content` keeps the dock shrink-wrapped; the strip scrolls INSIDE its port
             so the box never inflates (box-INVIOLATE). -->
        <GlassDock
            orientation="horizontal"
            fit-content
            always-expanded
            class="demo-bottom-dock__shell"
            data-testid="bottom-dock-collapsible"
        >
            <!-- The category trigger is the home-left anchor — it lives in the
                 #persistent region so it stays put as the story tabs scroll. On
                 the mobile viewport it opens the off-canvas SidebarDock as a
                 left-placement Dialog. The Dialog primitive owns the open/close + aria-expanded native
                 a11y contract (no hand-bound dock collapse state). -->
            <template #persistent>
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
                                        <PanelLeft class="h-4 w-4" aria-hidden="true" />
                                    </DockControl>
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="top" :side-offset="10">
                                Categories
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DialogContent
                        placement="left"
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
                    </DialogContent>
                </Dialog>
            </template>

            <!-- A divider after the home-left category trigger, before the in-category
                 nav group (B9 — separating the persistent control from the nav run). -->
            <DockSeparator />

            <!-- BA.W-DOCK-SECTIONS — the tripartite section model RETURNS to the shell
                 WITHOUT inflation (R8-9 "the docks COMPLETELY lack sections"). <DockSection>
                 GROUPS the EXISTING in-flow controls — the in-category story nav (`section`
                 zone) + the trailing category-jump group (`nav` zone) — and adds only the
                 <DockSeparator> seam between them (display:contents — the dock body stays a
                 single row, box INVIOLATE; the W-RAIL3 deletion REVERSED as a grouping, not
                 a re-mounted layer group that inflated it to ~3 rows). The contextual facets
                 (`section` `layers`) ride the seam rail OUTSIDE the dock box (`#rail` below).
                 The `nav` zone's leading seam is the rail's ANCHOR (the nav-separator). -->
            <DockSection :sections="sections" aria-label="Story dock sections">
                <template #story-nav>
                    <TooltipProvider :delay-duration="250">
                        <!-- BG.W-DOCK-RAIL-REINVENT (F3.R4) — the CONTEXTUAL FACET RAIL is now
                             the CONTAINED reinvented `<DockStack mode="facets">` in the `#rail`
                             slot below (persistent shell chrome, box-INVIOLATE): at rest a
                             contained core + the `--dock-rail-hairline` line at the dock's top
                             edge, fanning UP across the edge on hover/focus. The prior
                             always-visible in-flow `demo-facet-rail` tablist is RETIRED (clean
                             break) onto that ONE reinvented rail — no double facet-nav. -->

                        <!-- W-NAV-DOCK-FIX (defect 2) — prev/next are PERSISTENT four-state
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
                                <kbd class="font-mono text-[0.7em]">[</kbd>
                            </TooltipContent>
                        </Tooltip>

                        <!-- W-NAV-DOCK-FIX (defect 5) — the SCROLLING category-page tab
                             strip. Every story in the active category as a jump-to-page
                             DockControl (shape="tab"), wrapped in the shipped <FadingScroll axis="x">
                             (start sharp at rest, end feathered while overflowing). The
                             strip scrolls INSIDE the port — the dock box stays one row
                             (box-INVIOLATE). Clicking a tab navigates via goToStory (one
                             registry). -->
                        <FadingScroll axis="x" class="demo-bottom-dock__tabs">
                            <DockControl shape="tab"
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

                        <!-- W-NAV-DOCK-FIX (defect 2) — next is PERSISTENT, disabled (not
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
                                Next story · <kbd class="font-mono text-[0.7em]">]</kbd>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </template>

                <!-- The trailing category-jump group rides the `nav` zone. The category
                     arrows WRAP across categories so they are always live (never dead
                     chrome), visually distinct from the in-category story arrows by the
                     chevrons-DOUBLE glyph (B8 — single = story, double = category). -->
                <template #category-jump>
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
                                <kbd class="font-mono text-[0.7em]">{</kbd>
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
                                Next category · <kbd class="font-mono text-[0.7em]">}</kbd>
                            </TooltipContent>
                        </Tooltip>
                        <!-- BI.W-DOCK-RETIRES — the V↔H orientation-morph control is
                             DEFINITION-ABSENT (the in-situ dock morph retired
                             decided-terminal; the shell docks no longer morph orientation). -->
                    </TooltipProvider>
                </template>
            </DockSection>

            <!-- BI.W-DOCK-ESCAPE — the facet carousel is an in-flow `<DockStack mode="facets">`
                 control whose chips FAN UP out of a TOP-LAYER popover (the `#rail` slot
                 RETIRED). The core reads as a normal control; hover/focus fans the accent-
                 tinted facet chips above the bottom-anchored bar in the top layer (spec-exempt
                 from the dock clip — box INVIOLATE, deltaW=deltaH=0, on-screen). Each chip
                 carries its per-facet `--glass-accent` context hue; clicking writes
                 `railContext` (the ONE registry). Rendered only when >1 facet. -->
            <DockStack
                v-if="railItems.length > 1"
                v-model:selected="railContext"
                mode="facets"
                :items="railItems"
                core-label="Section facets"
                position="end"
                data-testid="bottom-facet-rail"
            />
        </GlassDock>
    </nav>
</template>

<style scoped>
/* W-NAV-DOCK-FIX (defect 5) — the category-page tab strip scrolls horizontally inside
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
