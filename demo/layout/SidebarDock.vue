<script setup lang="ts">
// SidebarDock — the demo's fixed vertical category-rail dock (AW.W28.b).
//
// A `variant="rail"` GlassDock (the rail variant forces vertical — no
// `orientation` prop). It is a FIXED, always-expanded icon+label rail: the
// shipped GlassDock has NO collapse machinery for a vertical rail, so there is
// no collapse↔expand affordance here. The only "expand" is the mobile
// off-canvas Sheet host the BottomDock owns; this component is the rail body it
// reuses for both the desktop fixed column and the mobile drawer.
//
// Dogfoods the dock + the W22-W26 glass atoms + iOS-26 Liquid Glass. The
// genuine NEW deliverable is the active-category restyle: the affordance moves
// from the bare `.is-active` colour shift onto the NCSU-red accent + a
// left-edge accent rule + W25 `tap-squish` press feedback.
import { computed } from "vue";
import {
    DockIconButton,
    DockSeparator,
    GlassDock,
} from "../../src/components/custom/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../src/components/ui/tooltip";
import { DarkModeToggle } from "../../src/components/custom/controls";
import { cn } from "../../src/utils/cn";
import { CATEGORIES } from "../stories/manifest";
import { useStoryNavigation } from "../composables/useStoryNavigation";
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

// The primary categories ride the top of the rail; the reference-only shelf
// (Composables) sits below a divider, collapsed below the fold.
const primaryCategories = computed(() => CATEGORIES.filter((c) => !c.reference));
const referenceCategories = computed(() => CATEGORIES.filter((c) => c.reference));

function go(categoryId: string): void {
    firstOfCategory(categoryId);
    emit("navigate");
}

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
</script>

<template>
    <GlassDock
        variant="rail"
        overflow="scroll"
        class="demo-sidebar-dock min-h-0"
        aria-label="Category navigation"
    >
        <!-- The brand wordmark is the home-left anchor — it lives in the
             #persistent region so it stays put as the category set scrolls.
             Long-press / double-click it to redraw the ℱ as a Fourier epicycle
             curve (E1). The dark-mode toggle is NOT here — per the dock nav-pattern
             (home-top, utility controls at the trailing END behind a divider) it
             rides the #collapsed trailing section at the BOTTOM of the rail (below). -->
        <template #persistent>
            <RouterLink
                to="/"
                class="focus-ring tap-squish flex h-10 w-10 items-center justify-center rounded-full"
                aria-label="glass-ui home"
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
                        font-size: 1.875rem;
                        font-variation-settings: 'WONK' 1, 'SOFT' 0;
                        font-optical-sizing: auto;
                    "
                >
                    &#x2131;
                </span>
            </RouterLink>
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

            <!--
              Reference-only shelf (Composables). Visually separated from the
              component categories by a divider so the distinction reads at
              a glance — these are reference docs, not surfaces.
            -->
            <template v-if="referenceCategories.length > 0">
                <DockSeparator />
                <Tooltip
                    v-for="category in referenceCategories"
                    :key="category.id"
                >
                    <TooltipTrigger as-child>
                        <DockIconButton
                            type="button"
                            :aria-current="
                                category.id === activeCategoryId
                                    ? 'page'
                                    : undefined
                            "
                            :aria-label="`${category.title} (reference)`"
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
                        {{ category.title }} · reference
                    </TooltipContent>
                </Tooltip>
            </template>
        </TooltipProvider>

        <!-- The dark-mode toggle is the trailing UTILITY control: it rides the
             #collapsed slot, which the vertical GlassDock renders as a bottom section
             below an automatic <DockSeparator> (the home-top / utility-at-the-end
             nav-pattern). Sized to the standard dock-icon-button register (size="dock"
             insets the glyph to the nav register — no h-9/w-9 override). -->
        <template #collapsed>
            <DarkModeToggle
                size="dock"
                eclipse
                class="demo-sidebar-dark-toggle"
            />
        </template>
    </GlassDock>
</template>
