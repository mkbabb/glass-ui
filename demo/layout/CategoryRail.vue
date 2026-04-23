<script setup lang="ts">
import { computed } from "vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { GlassDock, DockIconButton } from "@/components/custom/dock";
import { cn } from "@/utils/cn";
import { CATEGORIES } from "../stories/manifest";
import { useStoryNavigation } from "../composables/useStoryNavigation";

const { current, firstOfCategory } = useStoryNavigation();

// Active category id falls back to the first category when no story is loaded.
const activeCategoryId = computed<string>(
    () => current.value?.category.id ?? CATEGORIES[0]!.id,
);
</script>

<template>
    <aside
        class="sticky top-14 flex h-[calc(100vh-3.5rem)] shrink-0 items-start justify-center px-3 py-4"
        aria-label="Category navigation"
    >
        <TooltipProvider :delay-duration="250">
            <GlassDock
                orientation="vertical"
                always-expanded
                fit-content
                position="inline"
                aria-label="Categories"
                role="navigation"
                :class="
                    cn(
                        'max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hidden',
                    )
                "
            >
                <Tooltip v-for="category in CATEGORIES" :key="category.id">
                    <TooltipTrigger as-child>
                        <DockIconButton
                            :aria-current="
                                category.id === activeCategoryId
                                    ? 'page'
                                    : undefined
                            "
                            :class="
                                cn(
                                    category.id === activeCategoryId &&
                                        'is-active',
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
                        </DockIconButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" :side-offset="10">
                        {{ category.title }}
                    </TooltipContent>
                </Tooltip>
            </GlassDock>
        </TooltipProvider>
    </aside>
</template>
