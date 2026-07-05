<script setup lang="ts">
// SidebarDock — the demo's category-rail dock (AW.W28.b).
//
// An always-expanded GlassDock whose `orientation` TRACKS the shell's settled V↔H morph
// (BG.W-SHELL-MORPH-PAINT-REPAIR F3.R3 — `:orientation="dockOrientation"`, the injected
// `SHELL_DOCK_ORIENTATION` the in-place morph commits at the occluded 0.5-crossing). At
// rest it is the vertical left rail; when the shell settles horizontal the SAME GlassDock
// lays out as a wide-short top bar (it drops `.glass-dock.vertical`'s column grid), so the
// content re-margin clears it instead of sliding UNDER a persistent vertical rail. The prior
// hardcoded `orientation="vertical"` is retired — a static vertical prop pinned the column
// grid forever (the content-occlusion paint FAIL). It is a FIXED icon+label nav rail:
// it opts OUT of the (now orientation-agnostic) collapse machinery via `always-expanded`,
// so there is no collapse↔expand affordance here. The only "expand" is the mobile
// off-canvas Sheet host the BottomDock owns; this component is the rail body it
// reuses for both the desktop fixed column and the mobile drawer.
//
// Dogfoods the dock + the W22-W26 glass atoms + iOS-26 Liquid Glass. The
// genuine NEW deliverable is the active-category restyle: the affordance moves
// from the bare `.is-active` colour shift onto the NCSU-red accent + a
// left-edge accent rule + W25 `tap-squish` press feedback.
import { computed, useTemplateRef } from "vue";
import {
    DockIconButton,
    DockSection,
    DockSeparator,
    DockStack,
    GlassDock,
    type DockSectionDescriptor,
} from "@glass/components/custom/dock";
import { BorderProgress } from "@glass/components/custom/border-progress";
import type { BorderProgressCoverage } from "@glass/components/custom/border-progress";
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
import { useShellNavDock } from "../shell/useShellNavDock";
import {
    useShellDockOrientation,
    useShellScrollProgress,
} from "../shell/useShellScrollProgress";
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

// BG.W-SHELL-DOCK-DRY — the shared facet-rail loop + the morph-button wiring are
// factored ONCE into `useShellNavDock` (the SidebarDock + BottomDock were byte-
// duplicating the route→facet resolver wire, the railItems map, the SHELL-HOLD
// railContext writable computed, the arrow-roving keydown, and the morph-event
// dispatch). The composable stays ⟂ to the desktop↔mobile responsive SWAP (that is a
// pure `dock-nav.css` media query, a SEPARATE axis from the user-driven V↔H morph — it
// must not fight the 768px breakpoint). SidebarDock passes `onNavigate` so a facet
// activation closes the mobile off-canvas Sheet host it reuses; the category-nav loop
// (`go`) + the dock's own `sections` descriptors stay LOCAL.
const { railItems, railContext, openDockMorph } = useShellNavDock({
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

// ── BG.W-DOCK-SCROLL-PROGRESS — the scroll progress IS the dock's border ─────
// The standalone route-scroller bar is retired; the page-scroll position wears the
// dock's own EDGE via `<BorderProgress>` (the masked, radius-following,
// @property-animated progress-as-border) mounted as an inset-0 overlay hugging the
// dock plate. Decorative-informational: `aria-hidden` (the scroll position stays
// reachable via the scroller itself). Coverage is STATE-DRIVEN, one register per
// dock form:
//   · vertical rail (the settled left column) → `inline-end-edge` — the
//     content-facing edge fills top→bottom with the scroll (the scrollbar
//     metaphor as the dock's own border);
//   · the V↔H morph settled HORIZONTAL top bar → `bottom-edge` (the content-facing
//     edge of the floating bar);
//   · a COLLAPSED pill → `full-ring` (the circle wears the whole ring — the
//     natural morph). The shell dock is always-expanded, so this arm is
//     dormant-but-wired here and live for any collapsing consumer.
// The ink is the calm warm-ink two-stop ramp (NOT the 13-stop brand rainbow — the
// dock is chrome, and a rainbow border is a second color event; the warm ink flips
// modes for free). Thickness + pill radius ride the `--border-progress-*` cascade
// tokens (dock-nav.css) — the ring follows the dock's stadium with zero
// measurement.
const SCROLL_RING_STOPS: readonly string[] = [
    "color-mix(in srgb, var(--foreground) 45%, transparent)",
    "var(--foreground)",
];
const scrollProgress = useShellScrollProgress();
const dockOrientation = useShellDockOrientation();
const dockRef = useTemplateRef<InstanceType<typeof GlassDock>>("dockRef");
const ringCoverage = computed<BorderProgressCoverage>(() => {
    const dock = dockRef.value;
    if (dock && !dock.expanded) return "full-ring";
    return dockOrientation.value === "horizontal"
        ? "bottom-edge"
        : "inline-end-edge";
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
         so the `<BorderProgress>` ring (an inset-0 sibling overlay) hugs the dock
         plate's own box in every settled form; the ring dissolves in lockstep with
         the dock under the [data-dock-morphing] goo window (dock-nav.css). -->
    <div class="demo-dock-progress-host min-h-0">
    <GlassDock
        ref="dockRef"
        :orientation="dockOrientation"
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

        <!-- BG.W-DOCK-RAIL-REINVENT (F3.R4) — the reinvented CONTAINED rail restored to the
             persistent shell chrome (the BD.W-DOCK-CORE A1 removal REVERSED under the
             inverted topology). At rest the stack is ENTIRELY CONTAINED in the dock box —
             the `mode="facets"` core reads as a normal dock icon seated at the trailing edge
             + the `--dock-rail-hairline` warm-ink line; on hover/focus the facet chips FAN
             OUT across the dock edge into the gutter (asymmetric-golden, box-INVIOLATE
             deltaW=deltaH=0). Each chip carries its per-facet `--glass-accent` context hue.
             Clicking writes `railContext` (the ONE registry — the SAME router navigation).
             Rendered only when the section carries >1 facet (single-facet routes show no
             rail — no clutter). This is the ground the BD-removed broken carousel could not
             stand on: the new topology never collides with the dock content. -->
        <template #rail>
            <DockStack
                v-if="railItems.length > 1"
                v-model:selected="railContext"
                mode="facets"
                :items="railItems"
                core-label="Section facets"
                position="end"
                data-testid="sidebar-facet-rail"
            />
        </template>
    </GlassDock>

    <!-- The page-scroll progress as the dock's own BORDER (BG.W-DOCK-SCROLL-PROGRESS).
         An inset-0 overlay hugging the dock plate; masked to the border band only, so
         the dock's glass + controls read through untouched. Decorative (aria-hidden);
         PRM-safe by construction (the fill is scroll-COUPLED position feedback — a
         static fill at the current value, no autonomous sweep animation). -->
    <BorderProgress
        class="demo-dock-scroll-ring"
        :value="scrollProgress"
        :coverage="ringCoverage"
        :stops="SCROLL_RING_STOPS"
        aria-hidden="true"
    />
    </div>
</template>
