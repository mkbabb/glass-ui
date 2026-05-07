<script setup lang="ts">
import { computed } from "vue";
import { DockIconButton, GlassDock } from "../../src/components/custom/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../src/components/ui/tooltip";
import { cn } from "../../src/utils/cn";
import { CATEGORIES, FLAT_STORIES } from "../stories/manifest";
import { useStoryNavigation } from "../composables/useStoryNavigation";

const { current, firstOfCategory, goToFlat } = useStoryNavigation();

const activeCategoryId = computed<string | null>(() => {
    const loc = current.value;
    return loc?.kind === "category" ? loc.category.id : null;
});

const activeFlatId = computed<string | null>(() => {
    const loc = current.value;
    return loc?.kind === "flat" ? loc.story.id : null;
});
</script>

<template>
    <aside class="sticky top-0 flex h-screen shrink-0 items-start justify-center px-3 py-4">
        <GlassDock variant="rail" aria-label="Category navigation">
            <!-- Brand wordmark — lives once, at the top of the rail -->
            <RouterLink
                to="/"
                class="mb-1 flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]"
                aria-label="glass-ui home"
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

            <TooltipProvider :delay-duration="250">
                <Tooltip v-for="category in CATEGORIES" :key="category.id">
                    <TooltipTrigger as-child>
                        <DockIconButton
                            type="button"
                            :aria-current="
                                category.id === activeCategoryId
                                    ? 'page'
                                    : undefined
                            "
                            :aria-label="category.title"
                            :class="
                                cn(
                                    category.id === activeCategoryId
                                        ? 'is-active'
                                        : 'text-muted-foreground',
                                )
                            "
                            @click="firstOfCategory(category.id)"
                        >
                            <component
                                :is="category.icon"
                                class="h-4 w-4"
                                aria-hidden="true"
                            />
                        </DockIconButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" :side-offset="10">
                        {{ category.title }}
                    </TooltipContent>
                </Tooltip>

                <!--
                  Flat standalone stories (tools / playgrounds). Visually
                  separated from the component categories by a thin divider so
                  the distinction reads at a glance.
                -->
                <template v-if="FLAT_STORIES.length > 0">
                    <div
                        aria-hidden="true"
                        class="my-1 h-px w-6 self-center bg-border/50"
                    />
                    <Tooltip v-for="flat in FLAT_STORIES" :key="flat.id">
                        <TooltipTrigger as-child>
                            <DockIconButton
                                type="button"
                                :aria-current="
                                    flat.id === activeFlatId ? 'page' : undefined
                                "
                                :aria-label="flat.title"
                                :class="
                                    cn(
                                        flat.id === activeFlatId
                                            ? 'is-active'
                                            : 'text-muted-foreground',
                                    )
                                "
                                @click="goToFlat(flat.id)"
                            >
                                <component
                                    :is="flat.icon"
                                    class="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </DockIconButton>
                        </TooltipTrigger>
                        <TooltipContent side="right" :side-offset="10">
                            {{ flat.title }}
                        </TooltipContent>
                    </Tooltip>
                </template>
            </TooltipProvider>
        </GlassDock>
    </aside>
</template>
