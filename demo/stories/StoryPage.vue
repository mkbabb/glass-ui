<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../src/utils/cn";
import { TooltipProvider } from "../../src/components/ui/tooltip";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import StoryHero from "./StoryHero.vue";

interface StoryPageProps {
    /** Override the max-width on the content section. */
    contentClass?: string;
    /**
     * Whether the chassis renders the display-register hero <h1> on a hero page
     * (AZ.W-SUFFUSE D2-1). Default `true`. A bespoke front-door composition
     * (intro / hero / auth-shell) that hand-authors its own hero <h1> sets
     * `:hero-title="false"` so the chassis does not double the title.
     */
    heroTitle?: boolean;
}

const props = withDefaults(defineProps<StoryPageProps>(), {
    heroTitle: true,
});

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
                <!-- D1-4 (AZ.W-HIERARCHY): the chrome <h1> renders on a CONTENT
                     page (variant="page") only. On a HERO page the hero card owns
                     the document <h1> (its display-register title), so a chrome
                     <h1> here would be a duplicate top-level heading in the outline.
                     This is the STRUCTURAL double-<h1> suppression; the hero title's
                     audacious DISPLAY-register upgrade is W-SUFFUSE's D2-1. -->
                <!-- HS-2 (BA.W-SUFFUSE2, applied by W-STAGE on its behalf): the
                     content-page title lifts ONE √φ rung (text-heading 25.9px →
                     text-title 32.9px) so it DOMINATES the section <h2>
                     (text-subheading 20.4px) — the display ladder GRADES instead of
                     cliffing. The D1-4 double-<h1> suppression (the variant==='page'
                     guard) is preserved. -->
                <h1 v-if="title && variant === 'page'" class="text-title">
                    {{ title }}
                </h1>
                <p v-if="blurb" class="text-small max-w-prose text-muted-foreground">
                    {{ blurb }}
                </p>
            </header>

            <!-- The body sits in a glass card over the per-page background. The
                 page's StorySection stack flows inside the card. -->
            <StoryHero
                :background="background"
                :variant="variant"
                :title="title"
                :hero-title="props.heroTitle"
                class="mt-8"
            >
                <!-- BA.W-ANIMATE scope 3 (applied by W-STAGE on its behalf): the
                     section-stagger host. Each direct child (a StorySection block)
                     fades + lifts on entry via its OWN view() timeline keyed off the
                     <main> scroller — the implicit stagger, NO setTimeout cascade
                     (scroll-driven.css [data-scroll-reveal] recipe). PRM → static
                     terminal state (the recipe's outer @media gate). -->
                <section
                    data-scroll-reveal
                    :class="cn('flex flex-col gap-10', props.contentClass)"
                >
                    <slot />
                </section>
            </StoryHero>
        </article>
    </TooltipProvider>
</template>
