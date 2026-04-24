<script setup lang="ts">
import { computed } from "vue";
import { Rail } from "@/components/custom/rail";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";
import { CATEGORIES } from "../stories/manifest";
import { useStoryNavigation } from "../composables/useStoryNavigation";

const { current, firstOfCategory } = useStoryNavigation();

const activeCategoryId = computed<string>(
    () => current.value?.category.id ?? CATEGORIES[0]!.id,
);
</script>

<template>
    <Rail sticky aria-label="Category navigation">
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
                    <button
                        type="button"
                        :aria-current="
                            category.id === activeCategoryId
                                ? 'page'
                                : undefined
                        "
                        :aria-label="category.title"
                        :class="
                            cn(
                                'inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                                'hover:bg-foreground/8',
                                'focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]',
                                'active:scale-[0.97]',
                                category.id === activeCategoryId
                                    ? 'text-foreground bg-foreground/8'
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
                    </button>
                </TooltipTrigger>
                <TooltipContent side="right" :side-offset="10">
                    {{ category.title }}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </Rail>
</template>
