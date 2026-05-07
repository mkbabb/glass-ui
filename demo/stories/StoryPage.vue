<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../src/utils/cn";
import { TooltipProvider } from "../../src/components/ui/tooltip";
import { useStoryNavigation } from "../composables/useStoryNavigation";

interface StoryPageProps {
    /** Override the max-width on the content section. */
    contentClass?: string;
}

const props = defineProps<StoryPageProps>();

const { current } = useStoryNavigation();

const eyebrow = computed(() => {
    const loc = current.value;
    if (!loc) return null;
    if (loc.kind === "category") {
        return `${loc.category.title} · ${loc.story.title}`;
    }
    return loc.story.title;
});

const title = computed(() => current.value?.story.title ?? "");
const blurb = computed(() => current.value?.story.blurb);
</script>

<template>
    <TooltipProvider :delay-duration="250">
        <article class="mx-auto w-full max-w-6xl">
            <header class="flex flex-col gap-2">
                <p v-if="eyebrow" class="text-admin-label text-muted-foreground">
                    {{ eyebrow }}
                </p>
                <h1 v-if="title" class="text-title">{{ title }}</h1>
                <p
                    v-if="blurb"
                    class="text-prose max-w-prose text-muted-foreground"
                >
                    {{ blurb }}
                </p>
            </header>

            <section
                :class="
                    cn(
                        'mt-8 flex flex-col gap-10',
                        props.contentClass,
                    )
                "
            >
                <slot />
            </section>
        </article>
    </TooltipProvider>
</template>
