<script setup lang="ts">
import { computed } from "vue";
import { ChevronRight, Settings2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/custom/controls";
import { cn } from "@/utils/cn";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import BrandWordmark from "./BrandWordmark.vue";

const { current } = useStoryNavigation();

const crumbs = computed(() => {
    const loc = current.value;
    if (!loc) return null;
    return { category: loc.category.title, story: loc.story.title };
});

function openConfigurator(): void {
    window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-configurator"));
}
</script>

<template>
    <header
        :class="
            cn(
                'sticky top-0 z-40 flex h-14 items-center gap-3 px-4',
                'border-b border-border/60',
                'bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/55',
            )
        "
    >
        <RouterLink
            to="/"
            class="flex items-center rounded-md px-1.5 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <BrandWordmark class="text-base" />
        </RouterLink>

        <div
            v-if="crumbs"
            class="mx-auto flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground"
        >
            <span class="truncate">{{ crumbs.category }}</span>
            <ChevronRight class="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
            <span class="truncate font-medium text-foreground">{{ crumbs.story }}</span>
        </div>
        <div v-else class="mx-auto" />

        <div class="flex items-center gap-1.5">
            <DarkModeToggle />
            <Button
                variant="ghost"
                size="icon"
                aria-label="Open configurator"
                title="Configurator (,)"
                @click="openConfigurator"
            >
                <Settings2 class="h-4 w-4" />
            </Button>
        </div>
    </header>
</template>
