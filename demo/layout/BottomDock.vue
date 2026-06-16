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
    ArrowLeftRight,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    PanelLeft,
} from "@lucide/vue";
import {
    DockIconButton,
    DockRail,
    DockSection,
    DockSeparator,
    GlassDock,
    type DockRailItem,
    type DockSectionDescriptor,
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
        // BA.W-SHELL-HOLD (FD-FS-4) — the page must HOLD. The `set` navigates ONLY on
        // a genuine user chip activation, NEVER from a non-interactive v-model echo of
        // the `get` fallback. The equality short-circuit IS the user-activation
        // discriminator: a real chip click on a facet writes an id DIFFERENT from the
        // one `get` already resolved (so it falls through and navigates), while any
        // echo re-writes the value `get` just returned (id === railContext.value →
        // short-circuit, no `router.push`). A chip click on the already-active facet
        // is a legitimate no-op (you are already there) — the only suppressed real
        // click, and it would navigate to the page you are on.
        if (id === undefined || id === railContext.value) {
            return;
        }
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

// BA.W-DOCK-MORPH-INSITU — the in-situ V↔H orientation-morph control. It opens the
// shell's focused morph stage (AppShell hosts the state + the useDockOrientationMorph
// driver — the shell is the AZ driver's binary consumer #2). It dispatches the SAME
// `glass-ui-demo:toggle-dock-morph` window event the SidebarDock control fires — ONE
// event path, no parallel open machinery, no second morph engine.
function openDockMorph(): void {
    window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-dock-morph"));
}
</script>

<template>
    <nav class="demo-bottom-dock" aria-label="Stories in category">
        <GlassDock
            orientation="horizontal"
            always-expanded
            fit-content
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
                        <!-- Prev within the category — ADAPTIVE (B9): rendered only when
                             there IS a previous story (no greyed-out dead chrome). -->
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
                        <!-- BA.W-DOCK-MORPH-INSITU — the V↔H orientation-morph control.
                             It opens the shell's focused morph demonstration (the dock
                             flows vertical↔horizontal on the ONE --dock-morph-t scalar —
                             the AZ driver consumed in-situ, the shell is consumer #2). -->
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <DockIconButton
                                    type="button"
                                    class="demo-bottom-dock__morph tap-squish"
                                    aria-label="Demonstrate the vertical-horizontal dock morph"
                                    @click="openDockMorph"
                                >
                                    <ArrowLeftRight class="h-4 w-4" aria-hidden="true" />
                                </DockIconButton>
                            </TooltipTrigger>
                            <TooltipContent side="top" :side-offset="10">
                                Dock morph (V ↔ H)
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </template>
            </DockSection>

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
