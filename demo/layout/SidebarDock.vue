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
    DockRail,
    DockSeparator,
    GlassDock,
    type DockRailItem,
} from "../../src/components/custom/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../src/components/ui/tooltip";
import { Settings2 } from "@lucide/vue";
import { cn } from "../../src/utils/cn";
import { CATEGORIES } from "../stories/manifest";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import { useContextualDockLayers } from "../composables/useContextualDockLayers";
import { useConfiguratorOpen } from "../configurator/useConfiguratorOpen";
import { useLongPress } from "../eggs/useLongPress";

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

// The primary categories ride the top of the rail. (The reference-only
// Composables shelf was removed at AZ.W-SHELL-CONFIG — the demo IA no longer
// carries a reference category; the `!c.reference` guard stays as a harmless
// forward filter, but no category sets it today.)
//
// AZ.W-SHELL-IDENTITY (D1) — Foundations is EXCLUDED from the DockIconButton nav
// loop: the ℱ wordmark home control (#persistent slot, RouterLink to="/" →
// firstStoryPath() = /foundations/intro) IS the single Foundations affordance.
// The prior render stacked TWO Foundations entries — the ℱ AND the Foundations
// category's Compass DockIconButton — with no divider (the user's "duplicated
// compass," R3-12). The ℱ-as-Foundations is the dedup; a <DockSeparator>
// demarcates it below the home control.
const primaryCategories = computed(() =>
    CATEGORIES.filter((c) => !c.reference && c.id !== "foundations"),
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
const railItems = computed<DockRailItem[]>(() =>
    contextLayers.value.length > 1
        ? contextLayers.value.map((l) => ({
              id: l.id,
              label: l.label,
              icon: typeof l.icon === "string" ? undefined : l.icon,
          }))
        : [],
);

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
        const facet = contextLayers.value.find((l) => l.id === id);
        const first = facet?.entries[0];
        const categoryId = route.meta.categoryId as string | undefined;
        if (first && categoryId) {
            void router.push(`/${categoryId}/${first.storyId}`);
            emit("navigate");
        }
    },
});

// E1 — the ℱ wordmark redraws itself as a Fourier epicycle curve. A long-press
// (or dbl-click) fires the redraw; a short tap falls through to the RouterLink
// home navigation. The overlay lives at the shell root (AppShell listens for the
// event), so the dispatch is a window CustomEvent.
function fireRedraw(): void {
    window.dispatchEvent(new CustomEvent("glass-ui-demo:f-redraw"));
}
const { handlers: wordmarkPress, fired: redrawFired } = useLongPress(fireRedraw);

function onWordmarkClick(e: MouseEvent): void {
    // The long-press already fired the egg — swallow this click so it doesn't
    // ALSO navigate home. A genuine short tap falls through to navigate.
    if (redrawFired()) {
        e.preventDefault();
        return;
    }
    emit("navigate");
}

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
</script>

<template>
    <GlassDock
        orientation="vertical"
        always-expanded
        overflow="scroll"
        class="demo-sidebar-dock min-h-0"
        aria-label="Category navigation"
    >
        <!-- The brand wordmark is the home-left anchor — it lives in the
             #persistent region so it stays put as the category set scrolls.
             Long-press / double-click it to redraw the ℱ as a Fourier epicycle
             curve (E1). The dark-mode toggle is NOT here — per the dock nav-pattern
             (home-top, utility controls at the trailing END behind a divider) it
             rides the #collapsed trailing section at the BOTTOM of the rail (below).

             AZ.W-SHELL-IDENTITY — the ℱ IS the single Foundations affordance (the
             Compass category-nav dup is dropped). It renders AS a DockIconButton
             (as-child onto the RouterLink) so it carries the SAME first-class
             dock-control glass hover register the category controls do (the bg →
             --dock-control-hover-bg glass tier + the travelling specular gleam +
             --scale-hover-dock lift, R3-6 / W-REGISTER-IOS) — NOT a bare transparent
             circle (R3-15 / D3). A <DockSeparator> demarcates it below (D1). The
             optical-center transform (.demo-sidebar-home > span in dock-nav.css)
             re-seats the italic script-ℱ ink-mass on the box center (D2). -->
        <template #persistent>
            <DockIconButton
                as-child
                class="demo-sidebar-home"
                aria-label="glass-ui home"
            >
                <RouterLink
                    to="/"
                    class="focus-ring tap-squish"
                    @click="onWordmarkClick"
                    @dblclick="fireRedraw"
                    @pointerdown="wordmarkPress.onpointerdown"
                    @pointerup="wordmarkPress.onpointerup"
                    @pointerleave="wordmarkPress.onpointerleave"
                    @pointercancel="wordmarkPress.onpointercancel"
                >
                    <span
                        aria-hidden="true"
                        class="font-display italic leading-none text-viz-fourier select-none"
                        style="
                            font-variation-settings: 'WONK' 1, 'SOFT' 0;
                            font-optical-sizing: auto;
                        "
                    >
                        &#x2131;
                    </span>
                </RouterLink>
            </DockIconButton>
            <!-- Demarcate the home control from the category nav below (D1) — the
                 home-top nav-pattern divider, the same idiom as the reference-shelf
                 separator. -->
            <DockSeparator />
        </template>

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
                <TooltipContent v-if="showTooltips" side="right" :side-offset="10">
                    {{ category.title }}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <!-- AZ.W-RAIL3 — the page-driven contextual FACET set NO LONGER mounts inside
             the dock body (the prior in-dock <DockLayerGroup> inflated the dock box ~2×
             — R6-2 "FAR TOO WIDE"). The facets re-home as the rail's floating carousel
             strip OUTSIDE the dock box (the `#rail` slot below). The dock body is
             icons-only → it shrink-wraps to the tight pill (G1 — box INVIOLATE). -->

        <!-- AZ.W-SHELL-CONFIG — the trailing UTILITY control is the gear that opens
             the glass-ui demo Configurator (the dark-mode toggle's chrome home moved
             INTO that configurator as its single dark Switch; the standalone rail
             toggle is removed). It rides the END of the default (#full) slot, behind a
             <DockSeparator> — the home-top / utility-at-the-end nav-pattern. (NOT the
             #collapsed slot: an `always-expanded` dock NEVER collapses, so its summary
             pane — which hosts #collapsed — stays opacity:0/visibility:hidden; the
             utility belongs in the always-visible full pane's tail.) It dispatches the
             SAME `glass-ui-demo:toggle-configurator` event the `,` shortcut does — one
             event path. -->
        <DockSeparator />
        <TooltipProvider :delay-duration="250">
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
                <TooltipContent v-if="showTooltips" side="right" :side-offset="10">
                    Configurator
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <!-- AZ.W-RAIL3 — the FLOATING CAROUSEL rail. The active section's contextual
             facets ride OUTSIDE the dock box as a strip of detached glass chips on the
             visible connective hairline (the user's "floating carousel almost"). The
             active facet (the one containing the current story) is highlighted;
             selecting a chip navigates to that facet's first story — the SAME
             navigation state the nav items drive (one registry, no parallel store). It
             is dock chrome, so it sits outside the morph aperture and NEVER changes the
             dock's width/height. Rendered only when the section carries >1 facet. -->
        <template #rail>
            <DockRail
                v-if="railItems.length"
                v-model:context="railContext"
                :items="railItems"
                icon-label="Section facets"
                data-testid="sidebar-dock-rail"
            />
        </template>
    </GlassDock>
</template>
