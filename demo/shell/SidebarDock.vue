<script setup lang="ts">
// SidebarDock: the category rail. It mounts open, so every category answers from the
// first frame; it folds to the current section's icon once the pointer and focus have
// left it, and opens again on hover or focus. Inside the phone's Sheet it never folds.
import { computed } from "vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/tooltip";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import { Settings2 } from "@lucide/vue";
import { CATEGORIES } from "../stories/manifest";
import { useStoryNavigation } from "../chassis/useStoryNavigation";
import { useRoute } from "vue-router";
import { useConfiguratorOpen } from "./configurator/useConfiguratorOpen";

const props = withDefaults(
    defineProps<{
        /** Tooltips anchor to the right of the desktop column; the Sheet omits them. */
        showTooltips?: boolean;
        /** The desktop rail folds; the rail inside the Sheet does not. */
        folds?: boolean;
    }>(),
    { showTooltips: true, folds: true },
);

const emit = defineEmits<{ navigate: [] }>();

const { firstOfCategory } = useStoryNavigation();
const route = useRoute();

const activeCategoryId = computed<string | null>(
    () => (route.meta.categoryId as string | undefined) ?? null,
);
const activeCategory = computed(
    () => CATEGORIES.find((c) => c.id === activeCategoryId.value) ?? CATEGORIES[0]!,
);

function go(categoryId: string): void {
    firstOfCategory(categoryId);
    emit("navigate");
}

// The gear opens the demo configurator through the same window event as the `,`
// shortcut; `aria-expanded` reads the configurator's shared open state.
const { open: configOpen } = useConfiguratorOpen();

function openConfigurator(): void {
    window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-configurator"));
}
</script>

<template>
    <GlassDock
        orientation="vertical"
        :collapse="props.folds ? 'open' : false"
        expand-on="hover"
        :collapsed-label="`Categories: ${activeCategory.title}`"
        class="demo-sidebar-dock min-h-0"
        data-testid="sidebar-dock-collapsible"
    >
        <template #collapsed>
            <span class="demo-sidebar-face" aria-hidden="true">
                <component :is="activeCategory.icon" class="h-4 w-4" />
            </span>
        </template>

        <TooltipProvider :delay-duration="250">
            <div class="contents" role="group" aria-label="Categories">
                <Tooltip v-for="category in CATEGORIES" :key="category.id">
                    <TooltipTrigger as-child>
                        <DockControl
                            type="button"
                            :active="category.id === activeCategoryId ? true : undefined"
                            :aria-current="
                                category.id === activeCategoryId ? 'page' : undefined
                            "
                            :aria-label="category.title"
                            class="demo-sidebar-item"
                            @click="go(category.id)"
                        >
                            <component
                                :is="category.icon"
                                class="h-4 w-4"
                                aria-hidden="true"
                            />
                        </DockControl>
                    </TooltipTrigger>
                    <TooltipContent v-if="showTooltips" side="right" :side-offset="10">
                        {{ category.title }}
                    </TooltipContent>
                </Tooltip>
            </div>

            <DockSeparator />

            <div class="contents" role="group" aria-label="Settings">
                <DarkModeToggle size="dock" />
                <Tooltip>
                    <TooltipTrigger as-child>
                        <DockControl
                            type="button"
                            class="demo-sidebar-gear"
                            aria-label="Open the configurator"
                            :aria-expanded="configOpen"
                            @click="openConfigurator"
                        >
                            <Settings2 class="h-4 w-4" aria-hidden="true" />
                        </DockControl>
                    </TooltipTrigger>
                    <TooltipContent v-if="showTooltips" side="right" :side-offset="10">
                        Configurator
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    </GlassDock>
</template>

<style scoped>
.demo-sidebar-face {
    display: grid;
    place-items: center;
    inline-size: 2.75rem;
    block-size: 2.75rem;
}
</style>
