<script setup lang="ts">
/**
 * Wave 0 skeleton. W1-B replaces with Dock + Carousel + HeaderBar.
 * Intentionally minimal — exists only so main.ts has a mount target.
 */
import { useRoute } from "vue-router";
import { CATEGORIES } from "../stories/manifest";
import { computed } from "vue";

const route = useRoute();
const activeCategory = computed(() => route.params.category as string | undefined);
const activeStory = computed(() => route.params.story as string | undefined);
</script>

<template>
    <div class="min-h-screen bg-background text-foreground">
        <!-- Temporary top nav — Wave 1 replaces with Dock + Carousel. -->
        <header class="border-border sticky top-0 z-40 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b bg-background/90 px-6 py-3 backdrop-blur">
            <strong class="text-heading tracking-tight">glass-ui</strong>
            <nav class="flex flex-wrap gap-2 text-sm">
                <RouterLink
                    v-for="c in CATEGORIES"
                    :key="c.id"
                    :to="{ name: 'story', params: { category: c.id, story: c.stories[0].id } }"
                    class="rounded-md px-2 py-1 transition-colors hover:bg-muted"
                    :class="{ 'bg-muted font-semibold': c.id === activeCategory }"
                >
                    {{ c.title }}
                </RouterLink>
            </nav>
        </header>
        <aside
            v-if="activeCategory"
            class="border-border mx-auto hidden max-w-6xl border-b px-8 py-3 sm:flex sm:flex-wrap sm:gap-2"
        >
            <template v-for="c in CATEGORIES" :key="c.id">
                <RouterLink
                    v-for="s in c.stories"
                    v-if="c.id === activeCategory"
                    :key="s.id"
                    :to="{ name: 'story', params: { category: c.id, story: s.id } }"
                    class="text-muted-foreground rounded-md px-2 py-0.5 text-xs transition-colors hover:bg-muted hover:text-foreground"
                    :class="{ 'text-foreground font-medium underline': s.id === activeStory }"
                >
                    {{ s.title }}
                </RouterLink>
            </template>
        </aside>
        <main>
            <RouterView />
        </main>
    </div>
</template>
