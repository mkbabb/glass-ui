<script setup lang="ts">
// BottomDock — the demo's viewport-anchored bottom-bar story dock (AW.W28.b).
//
// A horizontal `always-expanded fit-content` GlassDock pinned
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
    DockSection,
    DockSeparator,
    DockTabButton,
    GlassDock,
    type DockSectionDescriptor,
    type DockStackItem,
} from "@glass/components/custom/dock";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@glass/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/ui/tooltip";
import { FadingScroll } from "@glass/components/custom/fading-scroll";
import SidebarDock from "./SidebarDock.vue";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import { useContextualDockLayers } from "../composables/useContextualDockLayers";

const { current, next, prev, nextCategory, prevCategory, goTo } =
    useStoryNavigation();

// W-NAV-DOCK-FIX (defect 5) — the FULL in-category page list (NOT a ≤4 summary slice).
// Every story in the active category is a jump-to-page tab in the scrolling strip; the
// active one carries aria-current="page" (DockTabButton auto-lifts its selected-as-glass
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
const railItems = computed<DockStackItem[]>(() =>
    contextLayers.value.length > 1
        ? contextLayers.value.map((l) => ({
              id: l.id,
              label: l.label,
              icon: typeof l.icon === "string" ? undefined : l.icon,
              // W-NAV-DOCK-FIX — the per-facet context hue (the mode="facets" carousel's
              // --glass-accent rim; a --section-color-N library identity).
              accent: l.accent,
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

// W-NAV-DOCK-FIX F8 — arrow-key roving across the facet tablist (the a11y contract; the
// active chip is the only tab-stop, arrows move + activate). The horizontal rail roves on
// Left/Right; Home/End jump to the ends. Activating writes `railContext` (the ONE registry).
function onFacetKeydown(e: KeyboardEvent, index: number): void {
    const items = railItems.value;
    if (items.length === 0) return;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % items.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        next = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    railContext.value = items[next]?.id;
}
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
                        <!-- W-NAV-DOCK-FIX F8 / GOLDEN M3-c — the CONTEXTUAL FACET RAIL (the
                             horizontal twin of the SidebarDock rail). The route→facet
                             resolver (`useContextualDockLayers` → `railItems`) was a DEAD
                             computed; it now drives a real roving tablist of facet chips
                             leading the story-nav zone, rendered ONLY when the section
                             carries >1 facet. Each chip is a <DockIconButton :active> that
                             COMPOSES the SHARED `.glass-capsule` register — the selected chip
                             re-points `--glass-capsule-fill` toward its WARM facet accent
                             (the post-fence `--section-color-N`), travels on the capsule's
                             glide+lift, and fires a one-shot warm accent-flood
                             (`--dock-facet-flood`, dock-nav.css). Clicking writes
                             `railContext` (the ONE registry). role="tablist"/role="tab" +
                             aria-selected + arrow-key roving is the affordance. -->
                        <template v-if="railItems.length > 1">
                            <div
                                class="demo-facet-rail demo-facet-rail--horizontal"
                                role="tablist"
                                aria-orientation="horizontal"
                                aria-label="Section facets"
                                data-testid="bottom-facet-rail"
                            >
                                <Tooltip
                                    v-for="(facet, fi) in railItems"
                                    :key="facet.id"
                                >
                                    <TooltipTrigger as-child>
                                        <DockIconButton
                                            type="button"
                                            role="tab"
                                            class="demo-facet-chip tap-squish"
                                            :active="facet.id === railContext"
                                            :aria-selected="facet.id === railContext"
                                            :aria-label="facet.label"
                                            :tabindex="facet.id === railContext ? 0 : -1"
                                            :style="
                                                facet.accent
                                                    ? { '--dock-facet-accent': facet.accent }
                                                    : undefined
                                            "
                                            @click="railContext = facet.id"
                                            @keydown="onFacetKeydown($event, fi)"
                                        >
                                            <component
                                                :is="facet.icon"
                                                v-if="facet.icon"
                                                class="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                            <span
                                                v-else
                                                class="demo-facet-chip__dot"
                                                aria-hidden="true"
                                            />
                                        </DockIconButton>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" :side-offset="10">
                                        {{ facet.label }}
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <DockSeparator />
                        </template>

                        <!-- W-NAV-DOCK-FIX (defect 2) — prev/next are PERSISTENT four-state
                             controls, never DOM-absent mid-row. Disabled (not removed) at a
                             true boundary so the row geometry holds and the control reads
                             honestly, never "flaky". -->
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <DockIconButton
                                    type="button"
                                    class="tap-squish"
                                    aria-label="Previous story"
                                    :disabled="!hasPrev"
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

                        <!-- W-NAV-DOCK-FIX (defect 5) — the SCROLLING category-page tab
                             strip. Every story in the active category as a jump-to-page
                             DockTabButton, wrapped in the shipped <FadingScroll axis="x">
                             (start sharp at rest, end feathered while overflowing). The
                             strip scrolls INSIDE the port — the dock box stays one row
                             (box-INVIOLATE). Clicking a tab navigates via goToStory (one
                             registry). -->
                        <FadingScroll axis="x" class="demo-bottom-dock__tabs">
                            <DockTabButton
                                v-for="entry in categoryStories"
                                :key="entry.story.id"
                                class="tap-squish"
                                :aria-current="entry.active ? 'page' : undefined"
                                :aria-label="entry.story.title"
                                @click="goToStory(entry.story.id)"
                            >
                                {{ entry.story.title }}
                            </DockTabButton>
                        </FadingScroll>

                        <!-- W-NAV-DOCK-FIX (defect 2) — next is PERSISTENT, disabled (not
                             removed) at the last story; the row geometry never shifts. -->
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <DockIconButton
                                    type="button"
                                    class="tap-squish"
                                    aria-label="Next story"
                                    :disabled="!hasNext"
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

            <!-- BD.W-DOCK-CORE (A1) — the broken `mode="facets"` carousel rail is REMOVED
                 (clean break, no alias). The half-rendered facet carousel collided with the
                 dock content (the user's "erroneous BROKEN RAIL element"). The in-category
                 nav-facet context is already carried by the in-flow `<DockSection>` tabs +
                 the `nav`-zone category-jump group above (the dock's own tabs facility) — no
                 orphaned carousel. The macOS-fan `mode="stack"` <DockStack> survives in
                 stories that genuinely want the hover-expand stack; it is the facets carousel
                 that was broken, removed from the SHELL nav dock specifically. -->
        </GlassDock>
    </nav>
</template>

<style scoped>
/* W-NAV-DOCK-FIX (defect 5) — the category-page tab strip scrolls horizontally inside
   the FadingScroll port (the `.demo-bottom-dock__tabs` class is merged onto the
   <FadingScroll> root, which IS the `.fading-scroll--x` scroll port). Lay the slotted
   DockTabButtons in a row and cap the inline-size so overflow SCROLLS, never widening
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
