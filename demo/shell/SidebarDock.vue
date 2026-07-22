<script setup lang="ts">
// SidebarDock — the demo's category-rail dock (.b).
//
// An always-expanded, STATIC vertical GlassDock (`orientation="vertical"`) — the
// fixed left-column nav rail. The platform cannot continuously interpolate a
// flex-column→row topology change, so this is a static vertical rail. It is a fixed
// icon+label nav rail that opts out
// of the collapse machinery via `always-expanded`, so there is no collapse↔expand
// affordance here. The only "expand" is the mobile off-canvas Sheet host the BottomDock
// owns; this component is the rail body it reuses for both the desktop fixed column and
// the mobile drawer.
//
// The active category uses the neutral luminance-lift glass register (the shared
// `--dock-selected-accent` material-lift plate, per dock-nav.css), a left-edge rule,
// and `tap-squish` press feedback. The former NCSU-red interactive accent is retired.
import { computed } from "vue";
import {
    DockControl,
    DockSeparator,
    GlassDock,
} from "@glass/components/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/tooltip";
import { Settings2 } from "@lucide/vue";
import { cn } from "@glass/components/_shared/class-names";
import { CATEGORIES } from "../stories/manifest";
import { useStoryNavigation } from "../chassis/useStoryNavigation";
import { useShellNavDock } from "./useShellNavDock";
import { useConfiguratorOpen } from "./configurator/useConfiguratorOpen";
import DockFacetMenu from "./DockFacetMenu.vue";

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

// The desktop category rail is a primary navigation surface,
// so it is NEVER collapsed-by-default. A collapsed dock parks its category buttons in
// the `inert`/`pointer-events:none` #default layer until a ~400ms hover-dwell (the
// user's dead-click). It is now always-expanded: the categories are clickable from
// frame 0. The mobile Sheet host already passed `:show-tooltips="false"` →
// always-expanded, so this UNIFIES both hosts on the always-expanded register (the
// collapse affordance is the BottomDock's job, not the category rail's). `showTooltips`
// keeps its tooltip-anchor meaning only.

// The primary categories ride the top of the rail. The demo IA has no standalone
// Composables shelf. The `!c.reference` guard
// remains a harmless forward filter, though no category sets it today.
//
// Foundations participates in the roving category tablist as a normal chip. There
// is one Foundations entry, one tab stop, and one `aria-current` owner.
const primaryCategories = computed(() => CATEGORIES.filter((c) => !c.reference));

function go(categoryId: string): void {
    firstOfCategory(categoryId);
    emit("navigate");
}

// A facet selection closes the mobile drawer host after navigating.
const { railItems, railContext } = useShellNavDock({
    onNavigate: () => emit("navigate"),
});

// The trailing dock gear opens the demo configurator. It dispatches the same
// `glass-ui-demo:toggle-configurator` window event the `,` shortcut does
// (PresetEditor.vue listens for it) — one event path, no parallel open machinery.
//
// The gear is the interactive trigger, so it carries
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
    <!-- The desktop category rail is a primary navigation
         surface, so it is ALWAYS-EXPANDED: the category buttons are clickable from frame
         0 (a collapsed dock parked them in the inert/pointer-events:none #default layer
         until a ~400ms hover-dwell — the user's dead-click). Both hosts (desktop fixed
         column + mobile Sheet) are unified on the always-expanded register; the collapse
         affordance is the BottomDock's job, not the category rail's. The persistent ℱ
         Foundations is a normal chip. -->
    <GlassDock
        orientation="vertical"
        always-expanded
        class="demo-sidebar-dock min-h-0"
        data-testid="sidebar-dock-collapsible"
    >
        <!-- Foundations is a normal category chip in the roving tablist; the dock
             opens directly on the category section. -->

        <div class="contents" role="group" aria-label="Categories">
                <TooltipProvider :delay-duration="250">
                    <Tooltip v-for="category in primaryCategories" :key="category.id">
                        <TooltipTrigger as-child>
                            <DockControl
                                type="button"
                                :aria-current="
                                    category.id === activeCategoryId
                                        ? 'page'
                                        : undefined
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
                </TooltipProvider>
        </div>

        <DockSeparator />

        <div class="contents" role="group" aria-label="Utilities">
                <TooltipProvider :delay-duration="250">
                    <!-- the V↔H orientation-morph control is
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
        </div>

        <DockFacetMenu
            v-if="railItems.length > 1"
            :items="railItems"
            :selected="railContext"
            side="right"
            data-testid="sidebar-facet-rail"
            @select="railContext = $event"
        />
    </GlassDock>
</template>
