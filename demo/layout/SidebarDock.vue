<script setup lang="ts">
// SidebarDock — the demo's fixed vertical category-rail dock (AW.W28.b).
//
// A vertical, always-expanded GlassDock (AZ.W-DOCK-TAXONOMY — `orientation="vertical"`
// + `always-expanded`; the prior `variant="rail"` discriminant is retired, "rail-ness"
// is now orientation + the vertical-dock surface). It is a FIXED icon+label nav rail:
// it opts OUT of the (now orientation-agnostic) collapse machinery via `always-expanded`,
// so there is no collapse↔expand affordance here. The only "expand" is the mobile
// off-canvas Sheet host the BottomDock owns; this component is the rail body it
// reuses for both the desktop fixed column and the mobile drawer.
//
// Dogfoods the dock + the W22-W26 glass atoms + iOS-26 Liquid Glass. The
// genuine NEW deliverable is the active-category restyle: the affordance moves
// from the bare `.is-active` colour shift onto the NCSU-red accent + a
// left-edge accent rule + W25 `tap-squish` press feedback.
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    DockIconButton,
    DockSection,
    DockSeparator,
    GlassDock,
    type DockSectionDescriptor,
    type DockStackItem,
} from "@glass/components/custom/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/ui/tooltip";
import { ArrowLeftRight, Settings2 } from "@lucide/vue";
import { cn } from "@glass/utils/cn";
import { CATEGORIES } from "../stories/manifest";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import { useContextualDockLayers } from "../composables/useContextualDockLayers";
import { useConfiguratorOpen } from "../configurator/useConfiguratorOpen";

const props = withDefaults(
    defineProps<{
        /**
         * When true the rail tooltips anchor to the right (the desktop fixed
         * column). When false they anchor to the left — the mobile drawer host
         * sits at the left edge so the tooltip would clip; the drawer omits
         * them anyway, but the prop keeps the surface honest.
         */
        showTooltips?: boolean;
    }>(),
    { showTooltips: true },
);

const emit = defineEmits<{ navigate: [] }>();

const { current, firstOfCategory } = useStoryNavigation();

const activeCategoryId = computed<string | null>(() => {
    const loc = current.value;
    return loc ? loc.category.id : null;
});

// W-NAV-DOCK-FIX (defects 1, 6) — the desktop category rail is a PRIMARY nav surface,
// so it is NEVER collapsed-by-default. A collapsed dock parks its category buttons in
// the `inert`/`pointer-events:none` #default layer until a ~400ms hover-dwell (the
// user's dead-click). It is now always-expanded: the categories are clickable from
// frame 0. The mobile Sheet host already passed `:show-tooltips="false"` →
// always-expanded, so this UNIFIES both hosts on the always-expanded register (the
// collapse affordance is the BottomDock's job, not the category rail's). `showTooltips`
// keeps its tooltip-anchor meaning only.

// The primary categories ride the top of the rail. (The reference-only
// Composables shelf was removed at AZ.W-SHELL-CONFIG — the demo IA no longer
// carries a reference category; the `!c.reference` guard stays as a harmless
// forward filter, but no category sets it today.)
//
// BG.W-DOCK-PERSISTENT-CUT (D8) — the persistent ℱ brand wordmark + its Fourier
// egg are REMOVED (the iOS-26 HIG "glass is the floating NAVIGATION layer, never
// content" — the brand egg is the vanity the content-first tab bar avoids). With
// the wordmark gone, Foundations REJOINS the roving category tablist as a normal
// chip: the `c.id !== "foundations"` filter — the ℱ-as-Foundations dedup that
// depended on the now-deleted wordmark — is DROPPED. One Foundations entry, one
// tab-stop, aria-current, no duplicate (the `!c.reference` forward filter stays).
const primaryCategories = computed(() =>
    CATEGORIES.filter((c) => !c.reference),
);

function go(categoryId: string): void {
    firstOfCategory(categoryId);
    emit("navigate");
}

// AZ.W-RAIL3 — the FLOATING CAROUSEL rail. The third-rail redirect (USER-AUDIT R6):
// the contextual facets MOVE OUT of the dock body (where the in-dock <DockLayerGroup>
// inflated the dock box ~2×) and re-home as the rail's content — a floating, cyclable
// strip of detached glass chips on the visible hairline OUTSIDE the dock box. The dock
// returns to its tight icon pill (the box is INVIOLATE). The route→facet RESOLVER
// (`useContextualDockLayers`) is KEPT — the correct route-keyed seam — only its RENDER
// TARGET moves (the in-dock layer group → the rail strip).
const route = useRoute();
const router = useRouter();
const { layers: contextLayers } = useContextualDockLayers(route);

// The chips ARE the route facets (Substrates → Fields/Creatures, Forms →
// Text/Selection/Toggles, …). Each chip's id is the facet id; its label + glyph are
// the facet descriptor. The strip renders only when the section carries >1 facet (a
// single-facet or unmapped section shows the bare icon pill — no carousel clutter).
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

// BA.W-DOCK-SECTIONS — the declarative tripartite descriptor. The deleted in-dock
// section model returns WITHOUT inflation: <DockSection> GROUPS the EXISTING in-flow
// nav controls (categories) + the trailing utility (gear) into a rail-core | section |
// nav silhouette demarcated by <DockSeparator>, adding only the divider seams (the
// chassis is display:contents — the dock box shrink-wraps as before).
//
// BC.W-DOCK-STACK-RAIL — the section's contextual facets ride the dock's `#rail` stack
// (the macOS hover-expand `<DockStack>` below), OUTSIDE the dock box. The divider-seam
// anchor mechanism is RETIRED with the divider-carousel: the stack seats at the dock edge
// (its own gutter topology — dock-nav.css), not a measured `<DockSeparator>` seam, so the
// `anchor-id` is no longer load-bearing (the stack clears <main> by topology at EVERY y).
const sections = computed<DockSectionDescriptor[]>(() => [
    { kind: "section", id: "categories", label: "Categories", layers: railItems.value },
    { kind: "nav", id: "utility", label: "Utilities" },
]);

// The active facet — the one whose entries contain the current story (so the carousel
// highlight tracks where you are). Selecting a chip navigates to that facet's first
// story. ONE registry: the rail writes the SAME navigation state the category nav does
// (a writable computed over the router), no parallel store.
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
            emit("navigate");
        }
    },
});

// AZ.W-SHELL-CONFIG — the gear-hosted demo configurator open control. The
// floating FAB is GONE; the open is rehomed onto this trailing dock gear (the
// dock-as-configurator-chrome idiom — GlassDock + DockIconButton). It dispatches
// the SAME `glass-ui-demo:toggle-configurator` window event the `,` shortcut does
// (PresetEditor.vue listens for it) — one event path, no parallel open machinery.
//
// AZ.R4-SHELL — the gear is the INTERACTIVE trigger, so it carries
// `aria-expanded` reflecting the shared configurator open ref (the a11y contract —
// the GlassDock root is presentational and must NOT carry aria-expanded; see the
// CLAUDE.md GlassDock aria contract). `configOpen` is the SAME singleton the
// PresetEditor binds its Sheet to, so the gear's announced state stays honest
// whether the panel opened via the gear, the `,` shortcut, or the window event.
const { open: configOpen } = useConfiguratorOpen();

function openConfigurator(): void {
    window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-configurator"));
}

// BA.W-DOCK-MORPH-INSITU — the in-situ V↔H orientation-morph control. It opens the
// shell's focused morph stage (AppShell hosts the state + the useDockOrientationMorph
// driver — the shell is the AZ driver's binary consumer #2). It dispatches the SAME
// `glass-ui-demo:toggle-dock-morph` window event the BottomDock control fires — ONE
// event path, no parallel open machinery, no second morph engine.
function openDockMorph(): void {
    window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-dock-morph"));
}

// W-NAV-DOCK-FIX F8 — arrow-key roving across the facet tablist (the a11y contract for
// a `role="tablist"`; the active chip is the only tab-stop, arrows move + activate). The
// vertical rail roves on Up/Down; Home/End jump to the ends. Activating a facet writes
// `railContext` (the ONE registry — navigates to the facet's first story).
function onFacetKeydown(e: KeyboardEvent, index: number): void {
    const items = railItems.value;
    if (items.length === 0) return;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % items.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        next = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    railContext.value = items[next]?.id;
}
</script>

<template>
    <!-- W-NAV-DOCK-FIX (defects 1, 6) — the desktop category rail is a PRIMARY nav
         surface, so it is ALWAYS-EXPANDED: the category buttons are clickable from frame
         0 (a collapsed dock parked them in the inert/pointer-events:none #default layer
         until a ~400ms hover-dwell — the user's dead-click). Both hosts (desktop fixed
         column + mobile Sheet) are unified on the always-expanded register; the collapse
         affordance is the BottomDock's job, not the category rail's. The persistent ℱ
         brand wordmark is GONE (BG.W-DOCK-PERSISTENT-CUT); Foundations is a normal chip. -->
    <GlassDock
        orientation="vertical"
        always-expanded
        class="demo-sidebar-dock min-h-0"
        aria-label="Category navigation"
        data-testid="sidebar-dock-collapsible"
    >
        <!-- BG.W-DOCK-PERSISTENT-CUT — the persistent ℱ brand wordmark + its
             anchored home separator are GONE (D8). Foundations is now a normal
             category chip in the roving tablist below, so there is no home-left
             anchor to demarcate; the dock opens directly on the category section. -->

        <!-- BA.W-DOCK-SECTIONS — the tripartite section model RETURNS to the shell
             WITHOUT inflation (R8-9 "the docks COMPLETELY lack sections"). <DockSection>
             GROUPS the EXISTING in-flow controls — the category nav (`section` zone) +
             the trailing gear utility (`nav` zone) — and adds only the <DockSeparator>
             seam between them (the chassis is display:contents, so the dock body
             shrink-wraps to the tight pill exactly as before — box INVIOLATE). The
             page-driven contextual facets (the `section`'s `layers`) ride the seam rail
             OUTSIDE the dock box (the `#rail` slot below), never re-inflating it (the
             W-RAIL3 deletion REVERSED as a grouping, not a re-mounted layer group). -->
        <DockSection
            :sections="sections"
            anchor-id="__none__"
            aria-label="Sidebar sections"
        >
            <template #categories>
                <TooltipProvider :delay-duration="250">
                    <Tooltip v-for="category in primaryCategories" :key="category.id">
                        <TooltipTrigger as-child>
                            <DockIconButton
                                type="button"
                                :aria-current="
                                    category.id === activeCategoryId ? 'page' : undefined
                                "
                                :aria-label="category.title"
                                :class="
                                    cn(
                                        'demo-sidebar-item tap-squish',
                                        category.id === activeCategoryId
                                            ? 'is-active'
                                            : 'text-muted-foreground',
                                    )
                                "
                                @click="go(category.id)"
                            >
                                <component
                                    :is="category.icon"
                                    class="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </DockIconButton>
                        </TooltipTrigger>
                        <TooltipContent
                            v-if="showTooltips"
                            side="right"
                            :side-offset="10"
                        >
                            {{ category.title }}
                        </TooltipContent>
                    </Tooltip>

                    <!-- W-NAV-DOCK-FIX F8 / GOLDEN M3-c — the CONTEXTUAL FACET RAIL. The
                         route→facet resolver (`useContextualDockLayers` → `railItems`) was
                         a DEAD computed (never rendered); it now drives a real roving
                         tablist of facet chips, seated below the categories behind a
                         <DockSeparator> seam, rendered ONLY when the section carries >1
                         facet (a single-facet section shows no rail — no clutter). Each
                         chip is a <DockIconButton :active> so it COMPOSES the SHARED
                         `.glass-capsule` register (the ONE warm lifted-lozenge recipe) —
                         the selected chip re-points `--glass-capsule-fill` toward its facet
                         accent (the post-fence WARM `--section-color-N`), NEVER a parallel
                         selected-fill. The active chip TRAVELS on a `data-active` flip with
                         the capsule's own glide+lift; a one-shot warm accent-flood rides the
                         `--dock-facet-flood` envelope (dock-nav.css). Clicking a chip writes
                         `railContext` (the ONE registry — the SAME router navigation the
                         category nav drives). role="tablist"/role="tab" + aria-selected +
                         arrow-key roving = the real affordance; the flood is aria-hidden
                         decoration. -->
                    <template v-if="railItems.length > 1">
                        <DockSeparator />
                        <div
                            class="demo-facet-rail demo-facet-rail--vertical"
                            role="tablist"
                            aria-orientation="vertical"
                            aria-label="Section facets"
                            data-testid="sidebar-facet-rail"
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
                                <TooltipContent
                                    v-if="showTooltips"
                                    side="right"
                                    :side-offset="10"
                                >
                                    {{ facet.label }}
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </template>
                </TooltipProvider>
            </template>

            <!-- AZ.W-SHELL-CONFIG — the trailing UTILITY control is the gear that opens
                 the glass-ui demo Configurator. It rides the `nav` zone (the
                 utility-at-the-end nav-pattern), demarcated from the category section by
                 the <DockSection>-rendered <DockSeparator> seam. It dispatches the SAME
                 `glass-ui-demo:toggle-configurator` event the `,` shortcut does. -->
            <template #utility>
                <TooltipProvider :delay-duration="250">
                    <!-- BA.W-DOCK-MORPH-INSITU — the V↔H orientation-morph control. It
                         opens the shell's focused morph demonstration (the dock flows
                         vertical↔horizontal on the ONE --dock-morph-t scalar — the AZ
                         driver consumed in-situ, the shell is binary consumer #2). -->
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <DockIconButton
                                type="button"
                                class="demo-sidebar-morph tap-squish"
                                aria-label="Demonstrate the vertical-horizontal dock morph"
                                @click="openDockMorph"
                            >
                                <ArrowLeftRight class="h-4 w-4" aria-hidden="true" />
                            </DockIconButton>
                        </TooltipTrigger>
                        <TooltipContent
                            v-if="showTooltips"
                            side="right"
                            :side-offset="10"
                        >
                            Dock morph (V ↔ H)
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <DockIconButton
                                type="button"
                                class="demo-sidebar-gear tap-squish"
                                aria-label="Open the glass-ui demo configurator"
                                :aria-expanded="configOpen"
                                @click="openConfigurator"
                            >
                                <Settings2 class="h-4 w-4" aria-hidden="true" />
                            </DockIconButton>
                        </TooltipTrigger>
                        <TooltipContent
                            v-if="showTooltips"
                            side="right"
                            :side-offset="10"
                        >
                            Configurator
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </template>
        </DockSection>

        <!-- BD.W-DOCK-CORE (A1) — the broken `mode="facets"` carousel rail is REMOVED
             (clean break, no alias). The half-rendered facet carousel collided with the
             dock content (the user's "erroneous BROKEN RAIL element"). The section's
             contextual facets are carried by the in-flow `<DockSection>` category nav above
             (the dock's own tabs/sections facility) — no orphaned carousel. -->
    </GlassDock>
</template>
