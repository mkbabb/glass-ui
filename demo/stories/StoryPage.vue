<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../src/utils/cn";
import { TooltipProvider } from "../../src/components/ui/tooltip";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import StoryHero from "./StoryHero.vue";

interface StoryPageProps {
    /** Override the max-width on the content section. */
    contentClass?: string;
}

const props = defineProps<StoryPageProps>();

const { current } = useStoryNavigation();

const eyebrow = computed(() => {
    const loc = current.value;
    if (!loc) return null;
    return `${loc.category.title} · ${loc.story.title}`;
});

const title = computed(() => current.value?.story.title ?? "");
const blurb = computed(() => current.value?.story.blurb);

// The page declares its background + register on its manifest row; the chassis
// reads it once and renders the body inside a glass card over that substrate.
const background = computed(() => current.value?.story.background);
const variant = computed<"hero" | "page">(() =>
    current.value?.story.hero ? "hero" : "page",
);
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

            <!-- The body sits in a glass card over the per-page background. The
                 page's StorySection stack flows inside the card. -->
            <StoryHero
                :background="background"
                :variant="variant"
                class="mt-8"
            >
                <section
                    :class="
                        cn(
                            'flex flex-col gap-10',
                            props.contentClass,
                        )
                    "
                >
                    <slot />
                </section>
            </StoryHero>
        </article>
    </TooltipProvider>
</template>
