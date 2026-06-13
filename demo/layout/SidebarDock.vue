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
    DockSection,
    DockSeparator,
    GlassDock,
    type DockRailItem,
    type DockSectionDescriptor,
} from "../../src/components/custom/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../src/components/ui/tooltip";
import { ArrowLeftRight, Settings2 } from "@lucide/vue";
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

// BA.W-DOCK-SECTIONS — the declarative tripartite descriptor. The deleted in-dock
// section model returns WITHOUT inflation: <DockSection> GROUPS the EXISTING in-flow
// nav controls (categories) + the trailing utility (gear) into a rail-core | section |
// nav silhouette demarcated by <DockSeparator>, adding only the divider seams (the
// chassis is display:contents — the dock box shrink-wraps as before). The `nav`
// descriptor's leading separator is the rail's anchor seam (the gear-divider on the
// sidebar; the ℱ-home separator in #persistent is the alternate seam, anchored there).
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

// BA.W-DOCK-MORPH-INSITU — the in-situ V↔H orientation-morph control. It opens the
// shell's focused morph stage (AppShell hosts the state + the useDockOrientationMorph
// driver — the shell is the AZ driver's binary consumer #2). It dispatches the SAME
// `glass-ui-demo:toggle-dock-morph` window event the BottomDock control fires — ONE
// event path, no parallel open machinery, no second morph engine.
function openDockMorph(): void {
    window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-dock-morph"));
}
</script>

<template>
    <GlassDock
        orientation="vertical"
        always-expanded
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
                 separator. BA.W-DOCK-SECTIONS — this ℱ-home separator is the rail's
                 ANCHOR seam (direction b): the facet rail co-locates with THIS divider
                 (the TOP divider the spec names), so the floating chips ride the
                 ℱ-home seam, not the dock midline. -->
            <DockSeparator anchor />
        </template>

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
            anchor-id="categories"
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
