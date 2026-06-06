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
import { CATEGORIES } from "../stories/manifest";
import { useStoryNavigation } from "../composables/useStoryNavigation";

const { current, firstOfCategory } = useStoryNavigation();

const activeCategoryId = computed<string | null>(() => {
    const loc = current.value;
    return loc ? loc.category.id : null;
});

// The primary categories ride the top of the rail; the reference-only
// shelf (Composables) sits below a divider, collapsed below the fold.
const primaryCategories = computed(() =>
    CATEGORIES.filter((c) => !c.reference),
);
const referenceCategories = computed(() =>
    CATEGORIES.filter((c) => c.reference),
);
</script>

<template>
    <aside class="flex h-full min-h-0 shrink-0 flex-col items-center px-3 py-4">
        <GlassDock
            variant="rail"
            overflow="scroll"
            class="min-h-0"
            aria-label="Category navigation"
        >
            <!-- Brand wordmark — lives once, at the top of the rail -->
            <RouterLink
                to="/"
                class="focus-ring mb-1 flex h-10 w-10 items-center justify-center rounded-full"
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
                <Tooltip
                    v-for="category in primaryCategories"
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
                  Reference-only shelf (Composables). Visually separated from
                  the component categories by a thin divider so the distinction
                  reads at a glance — these are reference docs, not surfaces.
                -->
                <template v-if="referenceCategories.length > 0">
                    <div
                        aria-hidden="true"
                        class="my-1 h-px w-6 self-center bg-border/50"
                    />
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
                            {{ category.title }} · reference
                        </TooltipContent>
                    </Tooltip>
                </template>
            </TooltipProvider>
        </GlassDock>
    </aside>
</template>
