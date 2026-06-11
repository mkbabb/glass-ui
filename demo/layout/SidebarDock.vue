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
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
    DockIconButton,
    DockLayer,
    DockLayerGroup,
    DockRail,
    DockSeparator,
    GlassDock,
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

const { current, firstOfCategory, goTo } = useStoryNavigation();

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

function goStory(categoryId: string, storyId: string): void {
    goTo(categoryId, storyId);
    emit("navigate");
}

// The hairline-rail context model (AZ.W-RAIL-EXTEND). The `<DockRail>`'s end-icon
// writes this — a writable computed mirroring `activeCategoryId` whose setter
// navigates the rail to that category. ONE registry: the rail and the category nav
// read/write the SAME navigation state (no parallel store). `railContextIds` is the
// ordered primary-category set the end-icon advances through.
const railContext = computed<string | undefined>({
    get: () => activeCategoryId.value ?? undefined,
    set: (id) => {
        if (id) go(id);
    },
});
// The rail cycle spans EVERY non-reference category — Foundations included. The
// ℱ home control is Foundations' rail entry (it is dropped from the visible
// DockIconButton nav loop per W-SHELL-IDENTITY D1, but the rail end-icon still
// advances through it so the category cycle stays complete).
const railContextIds = computed(() =>
    CATEGORIES.filter((c) => !c.reference).map((c) => c.id),
);

// AZ.W-DOCK-CONTEXT — the page-driven contextual dock-layer seam. The rail
// surfaces the active SECTION's contextual facets as a secondary `<DockLayerGroup>`
// (Substrates → Fields/Creatures, Forms → Text/Selection/Toggles, …). The layer SET
// is route-keyed: `useContextualDockLayers(route)` maps the active category to its
// facet layers, so the SAME dock renders a DIFFERENT layer set purely because the
// route changed — the route→layer determinism R3-14 names, over the EXISTING layer
// registry (no new layer machinery).
const route = useRoute();
const { layers: contextLayers } = useContextualDockLayers(route);

// The active facet — defaults to the first layer of the current route-context, and
// resets when the route-context (and thus the layer set) changes.
const activeContextLayer = ref<string>(contextLayers.value[0]?.id ?? "");
watch(
    contextLayers,
    (next) => {
        if (!next.some((l) => l.id === activeContextLayer.value)) {
            activeContextLayer.value = next[0]?.id ?? "";
        }
    },
    { immediate: true },
);
// The contextual facet group only renders when the section has >1 facet (a
// single-facet or unmapped section shows the primary nav alone — no clutter).
const showContextGroup = computed(() => contextLayers.value.length > 1);

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

        <!-- AZ.W-DOCK-CONTEXT — the page-driven contextual facet group. A vertical
             <DockLayerGroup> whose layer SET is the active section's facets
             (route-keyed via useContextualDockLayers). Navigating between sections
             swaps which facets the dock surfaces — the route→layer determinism, over
             the EXISTING layer registry. Rendered only when the section carries >1
             facet, behind a divider from the primary category nav above. -->
        <template v-if="showContextGroup">
            <DockSeparator />
            <DockLayerGroup
                v-model:active="activeContextLayer"
                orientation="vertical"
                rail-position="start"
                class="demo-sidebar-context"
                data-testid="sidebar-dock-context-group"
            >
                <DockLayer
                    v-for="layer in contextLayers"
                    :key="layer.id"
                    :id="layer.id"
                    :label="layer.label"
                    :icon="layer.icon"
                >
                    <TooltipProvider :delay-duration="250">
                        <Tooltip
                            v-for="entry in layer.entries"
                            :key="entry.storyId"
                        >
                            <TooltipTrigger as-child>
                                <DockIconButton
                                    type="button"
                                    class="demo-sidebar-context-item tap-squish"
                                    :aria-label="entry.label"
                                    @click="
                                        activeCategoryId &&
                                        goStory(activeCategoryId, entry.storyId)
                                    "
                                >
                                    <component
                                        :is="layer.icon"
                                        class="h-4 w-4 opacity-70"
                                        aria-hidden="true"
                                    />
                                </DockIconButton>
                            </TooltipTrigger>
                            <TooltipContent
                                v-if="showTooltips"
                                side="right"
                                :side-offset="10"
                            >
                                {{ entry.label }}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DockLayer>
            </DockLayerGroup>
        </template>

        <!-- AZ.W-SHELL-CONFIG — the trailing UTILITY control is now the gear that
             opens the glass-ui demo Configurator (the dark-mode toggle's chrome home
             moved INTO that configurator as its single dark Switch; the standalone
             rail toggle is removed). The gear rides the #collapsed slot, which the
             vertical GlassDock renders as a bottom section below an automatic
             <DockSeparator> (the home-top / utility-at-the-end nav-pattern). It
             dispatches the SAME `glass-ui-demo:toggle-configurator` event the `,`
             shortcut does — one event path. -->
        <template #collapsed>
            <TooltipProvider :delay-duration="250">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <DockIconButton
                            type="button"
                            class="demo-sidebar-gear tap-squish"
                            aria-label="Open the glass-ui demo configurator"
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
        </template>

        <!-- The hairline rail (AZ.W-RAIL-EXTEND) — a context control beyond the rail's
             bottom edge. Its end-icon advances the active category (the SAME navigation
             state the nav items drive — one registry). It is dock chrome, so it sits
             outside the morph aperture and reads as a finished iOS-26 whisper hairline. -->
        <template #rail>
            <DockRail
                v-model:context="railContext"
                :entries="railContextIds"
                icon-label="Next category"
                data-testid="sidebar-dock-rail"
            />
        </template>
    </GlassDock>
</template>
