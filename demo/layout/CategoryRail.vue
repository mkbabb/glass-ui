<script setup lang="ts">
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

// Active category id falls back to the first category when no story is loaded.
const activeCategoryId = (): string =>
    current.value?.category.id ?? CATEGORIES[0]!.id;
</script>

<template>
    <aside
        class="sticky top-14 flex h-[calc(100vh-3.5rem)] shrink-0 items-start justify-center px-3 py-4"
        aria-label="Category navigation"
    >
        <TooltipProvider :delay-duration="250">
            <nav
                :class="
                    cn(
                        'glass-subtle flex flex-col items-center gap-1 rounded-[var(--radius-pill)] p-1.5',
                    )
                "
                aria-label="Categories"
            >
                <Tooltip v-for="category in CATEGORIES" :key="category.id">
                    <TooltipTrigger as-child>
                        <button
                            type="button"
                            :aria-current="
                                category.id === activeCategoryId()
                                    ? 'page'
                                    : undefined
                            "
                            :class="
                                cn(
                                    'group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                                    'text-muted-foreground hover:bg-foreground/5 hover:text-foreground',
                                    'focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]',
                                    category.id === activeCategoryId() &&
                                        'bg-foreground/10 text-foreground',
                                )
                            "
                            @click="firstOfCategory(category.id)"
                        >
                            <component
                                :is="category.icon"
                                class="h-4 w-4"
                                aria-hidden="true"
                            />
                            <span class="sr-only">{{ category.title }}</span>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" :side-offset="10">
                        {{ category.title }}
                    </TooltipContent>
                </Tooltip>
            </nav>
        </TooltipProvider>
    </aside>
</template>
