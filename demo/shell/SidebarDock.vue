<script setup lang="ts">
// SidebarDock — the demo's category-rail dock (AW.W28.b).
//
// An always-expanded, STATIC vertical GlassDock (`orientation="vertical"`) — the
// fixed left-column nav rail. (BI.W-DOCK-RETIRES retired the in-situ V↔H orientation
// morph decided-terminal: the platform cannot continuously interpolate a flex-column→row
// topology change, so the dock is a static vertical rail — no `SHELL_DOCK_ORIENTATION`
// track, no wide-short top-bar reshape.) It is a FIXED icon+label nav rail: it opts OUT
// of the collapse machinery via `always-expanded`, so there is no collapse↔expand
// affordance here. The only "expand" is the mobile off-canvas Sheet host the BottomDock
// owns; this component is the rail body it reuses for both the desktop fixed column and
// the mobile drawer.
//
// Dogfoods the dock + the W22-W26 glass atoms + iOS-26 Liquid Glass. The
// genuine NEW deliverable is the active-category restyle: the affordance moves
// from the bare `.is-active` colour shift onto the NCSU-red accent + a
// left-edge accent rule + W25 `tap-squish` press feedback.
import { computed, useTemplateRef } from "vue";
import {
    DockControl,
    DockSection,
    DockSeparator,
    DockStack,
    GlassDock,
    type DockSectionDescriptor,
} from "@glass/components/custom/dock";
import {
    ScrollProgressRim,
    type ScrollProgressRimCoverage,
} from "@glass/components/custom/scroll-progress-rim";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/ui/tooltip";
import { Settings2 } from "@lucide/vue";
import { cn } from "@glass/components/_shared/class-names";
import { CATEGORIES } from "../stories/manifest";
import { useStoryNavigation } from "../chassis/useStoryNavigation";
import { useShellNavDock } from "./useShellNavDock";
import { useShellScrollProgress } from "./useShellScrollProgress";
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

// BG.W-SHELL-DOCK-DRY — the shared facet-rail loop is factored ONCE into
// `useShellNavDock` (the SidebarDock + BottomDock were byte-duplicating the route→facet
// resolver wire, the railItems map, the SHELL-HOLD railContext writable computed, and
// the arrow-roving keydown). SidebarDock passes `onNavigate` so a facet activation closes
// the mobile off-canvas Sheet host it reuses; the category-nav loop (`go`) + the dock's
// own `sections` descriptors stay LOCAL.
const { railItems, railContext } = useShellNavDock({
    onNavigate: () => emit("navigate"),
});

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

// AZ.W-SHELL-CONFIG — the gear-hosted demo configurator open control. The
// floating FAB is GONE; the open is rehomed onto this trailing dock gear (the
// dock-as-configurator-chrome idiom — GlassDock + DockControl). It dispatches
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

// ── BG.W-DOCK-SCROLL-PROGRESS — the scroll progress IS the dock's border ─────
// The standalone route-scroller bar is retired; the page-scroll position wears the
// dock's own EDGE via `<ScrollProgressRim>` (the masked, radius-following,
// @property-animated progress-as-border) mounted as an inset-0 overlay hugging the
// dock plate. The rim exposes the page position as a named progressbar. Coverage is
// STATE-DRIVEN, one register per
// dock form:
//   · vertical rail (the static left column) → `inline-end-edge` — the
//     content-facing edge fills top→bottom with the scroll (the scrollbar
//     metaphor as the dock's own border);
//   · a COLLAPSED pill → `full-ring` (the circle wears the whole ring — the
//     natural morph). The shell dock is always-expanded, so this arm is
//     dormant-but-wired here and live for any collapsing consumer.
//   (BI.W-DOCK-RETIRES removed the V↔H-morph HORIZONTAL `bottom-edge` arm — the shell
//   dock no longer morphs orientation; it is a static vertical rail.)
// BI.W-SCROLL-PROGRESS-RIM (UF-D1, verbatim: "should be RAINBOW, thinner, and rounded") —
// the ink is the brand `--section-color-*` RAINBOW, superseding the BG.W-DOCK-SCROLL-PROGRESS
// warm-ink two-stop ramp that read as ss-02's chunky flat GRAY band (clean break, no alias —
// the user asked for rainbow). "rainbow" = the section-color ramp, staying in the warm
// identity: a warm→cool arc (rose → amber → forest → teal → indigo → violet) sampled off the
// 13-stop ramp so the rim reads as "a spectrum of our colors". Presets-in-consumers — the demo
// (this shell) passes the spectrum config; the tokens resolve in the cascade + flip modes for
// free. Thickness (the thin RIM rung ~4px, dock-nav.css) + pill radius ride the
// `--scroll-progress-rim-*` cascade tokens — the band inherits the dock PLATE's stadium
// (BI.W-DOCK-SPINE: the plate is `border-radius: inherit` from the pill `.glass-dock`) with
// zero measurement.
const SCROLL_RING_STOPS: readonly string[] = [
    "var(--section-color-0)", // rose
    "var(--section-color-5)", // amber
    "var(--section-color-4)", // forest
    "var(--section-color-3)", // teal-cyan
    "var(--section-color-2)", // indigo
    "var(--section-color-7)", // violet
];
const scrollProgress = useShellScrollProgress();
const dockRef = useTemplateRef<InstanceType<typeof GlassDock>>("dockRef");
const ringCoverage = computed<ScrollProgressRimCoverage>(() => {
    const dock = dockRef.value;
    // BI.W-DOCK-RETIRES — the shell dock is a static vertical rail (no V↔H morph): a
    // collapsed pill wears the full ring; the expanded rail fills its inline-end edge.
    if (dock && !dock.expanded) return "full-ring";
    return "inline-end-edge";
});
</script>

<template>
    <!-- W-NAV-DOCK-FIX (defects 1, 6) — the desktop category rail is a PRIMARY nav
         surface, so it is ALWAYS-EXPANDED: the category buttons are clickable from frame
         0 (a collapsed dock parked them in the inert/pointer-events:none #default layer
         until a ~400ms hover-dwell — the user's dead-click). Both hosts (desktop fixed
         column + mobile Sheet) are unified on the always-expanded register; the collapse
         affordance is the BottomDock's job, not the category rail's. The persistent ℱ
         brand wordmark is GONE (BG.W-DOCK-PERSISTENT-CUT); Foundations is a normal chip. -->
    <!-- BG.W-DOCK-SCROLL-PROGRESS — the progress-host wrapper shrink-wraps the dock
         so the `<ScrollProgressRim>` (an inset-0 sibling overlay) hugs the static
         vertical dock plate's own box (BI.W-DOCK-RETIRES retired the V↔H morph). -->
    <div class="demo-dock-progress-host min-h-0">
    <GlassDock
        ref="dockRef"
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
                            <DockControl
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
                            </DockControl>
                        </TooltipTrigger>
                        <TooltipContent
                            v-if="showTooltips"
                            side="right"
                            :side-offset="10"
                        >
                            {{ category.title }}
                        </TooltipContent>
                    </Tooltip>

                    <!-- BG.W-DOCK-RAIL-REINVENT (F3.R4) — the CONTEXTUAL FACET RAIL is now
                         the CONTAINED reinvented `<DockStack mode="facets">` in the `#rail`
                         slot below (persistent shell chrome, box-INVIOLATE): at rest a
                         contained core + the `--dock-rail-hairline` warm-ink line adjacent
                         to the categories, fanning OUT across the dock edge on hover/focus.
                         The prior always-visible in-flow `demo-facet-rail` tablist is RETIRED
                         (clean break) onto that ONE reinvented rail — no double facet-nav. -->
                </TooltipProvider>
            </template>

            <!-- AZ.W-SHELL-CONFIG — the trailing UTILITY control is the gear that opens
                 the glass-ui demo Configurator. It rides the `nav` zone (the
                 utility-at-the-end nav-pattern), demarcated from the category section by
                 the <DockSection>-rendered <DockSeparator> seam. It dispatches the SAME
                 `glass-ui-demo:toggle-configurator` event the `,` shortcut does. -->
            <template #utility>
                <TooltipProvider :delay-duration="250">
                    <!-- BI.W-DOCK-RETIRES — the V↔H orientation-morph control is
                         DEFINITION-ABSENT (the in-situ dock morph retired decided-terminal;
                         the shell dock is a static vertical rail). -->
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <DockControl
                                type="button"
                                class="demo-sidebar-gear tap-squish"
                                aria-label="Open the glass-ui demo configurator"
                                :aria-expanded="configOpen"
                                @click="openConfigurator"
                            >
                                <Settings2 class="h-4 w-4" aria-hidden="true" />
                            </DockControl>
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

        <!-- BI.W-DOCK-ESCAPE — the facet carousel is an in-flow `<DockStack mode="facets">`
             control whose chips FAN OUT of a TOP-LAYER popover (the `#rail` slot RETIRED). The
             core reads as a normal dock icon; hover/focus fans the accent-tinted facet chips
             past the dock body in the top layer (spec-exempt from the dock clip — box
             INVIOLATE, deltaW=deltaH=0). Each chip carries its per-facet `--glass-accent`
             context hue; clicking writes `railContext` (the ONE registry — the SAME router
             navigation). Rendered only when the section carries >1 facet (single-facet routes
             show no rail — no clutter). -->
        <DockStack
            v-if="railItems.length > 1"
            v-model:selected="railContext"
            mode="facets"
            :items="railItems"
            core-label="Section facets"
            position="end"
            data-testid="sidebar-facet-rail"
        />
    </GlassDock>

    <!-- The page-scroll progress as the dock's own BORDER (BG.W-DOCK-SCROLL-PROGRESS).
         An inset-0 overlay hugging the dock plate; masked to the border band only, so
         the dock's glass + controls read through untouched. PRM-safe by construction
         (the fill is scroll-COUPLED position feedback — a
         static fill at the current value, no autonomous sweep animation). -->
    <ScrollProgressRim
        class="demo-dock-scroll-ring"
        :value="scrollProgress"
        :coverage="ringCoverage"
        :stops="SCROLL_RING_STOPS"
        aria-label="Page scroll progress"
    />
    </div>
</template>
