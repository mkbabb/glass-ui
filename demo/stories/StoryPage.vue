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
        <!-- BB.W-SCROLL-MOTION: the route-enter PAGE-BUILD host. On each navigation
             the <article> mounts inside the AppShell route <Transition>, and the
             `.scroll-build` register assembles the page in reading order: on a
             CONTENT page the <header> chrome (beat 0) rises, then the <StoryHero>
             body (beat 1) follows; on a HERO page the chrome header is suppressed
             (the descriptor is re-homed into the StoryHero cluster — W-HIERARCHY2),
             so <StoryHero> is the lone beat 0 and the cluster's eyebrow→title→blurb
             3-stage stagger carries the reading-order arrival. Each beat is on a
             `--scroll-build-step` coordinated stagger (the SOTA page-assembles-itself
             read). A pure @keyframes-on-mount — NO setTimeout, so the entrance never
             races the AppShell scroll-to-top reset (it is the <Transition> hook's
             ordering, not a timer). The hero cluster inside <StoryHero> rides its own
             `.story-hero-cluster--enter` register (a deep grandchild, not a direct
             `.scroll-build` child — no double-bind). PRM → no build binds (the
             recipe's outer @media gate; the page mounts at its terminal state). The
             reading-ORDER (the ordered cluster: eyebrow → title → blurb → body) is
             W-HIERARCHY2's; this register threads the entrance ON that order. -->
        <article class="scroll-build mx-auto w-full max-w-6xl">
            <!-- BB.W-HIERARCHY2 — the chrome <header> hosts the ordered cluster on a
                 CONTENT page (variant="page") ONLY: eyebrow → chrome <h1> → blurb,
                 already in correct reading order. On a HERO page the descriptor
                 (eyebrow + blurb) is re-homed INTO the StoryHero cluster alongside
                 the display <h1> (the reading-order inversion fix), so the WHOLE
                 chrome header is suppressed on the hero path — the descriptor is
                 shown ONCE, never split across the chrome/card boundary (the D1-4
                 double-<h1> suppression GENERALIZED to the eyebrow + blurb). -->
            <header
                v-if="variant === 'page'"
                class="flex flex-col gap-2"
                :style="{ '--i': 0 }"
            >
                <p v-if="eyebrow" class="text-admin-label text-muted-foreground">
                    {{ eyebrow }}
                </p>
                <!-- HS-2 (BA.W-SUFFUSE2, applied by W-STAGE on its behalf): the
                     content-page title lifts ONE √φ rung (text-heading 25.9px →
                     text-title 32.9px) so it DOMINATES the section <h2>
                     (text-subheading 20.4px) — the display ladder GRADES instead of
                     cliffing. The chrome <h1> is the content-page title; the hero
                     title's audacious DISPLAY-register upgrade is W-SUFFUSE's D2-1. -->
                <h1 v-if="title" class="text-title">
                    {{ title }}
                </h1>
                <p v-if="blurb" class="text-small max-w-prose text-muted-foreground">
                    {{ blurb }}
                </p>
            </header>

            <!-- The body sits in a glass card over the per-page background. The
                 page's StorySection stack flows inside the card. On a HERO page the
                 chassis hosts the ordered eyebrow→title→blurb cluster (the re-homed
                 descriptor); on a CONTENT page the eyebrow+blurb are the chrome
                 header above, so the chassis ignores them. -->
            <StoryHero
                :background="background"
                :variant="variant"
                :title="title"
                :eyebrow="eyebrow"
                :blurb="blurb"
                :hero-title="props.heroTitle"
                :class="variant === 'page' ? 'mt-8' : undefined"
                :style="{ '--i': variant === 'page' ? 1 : 0 }"
            >
                <!-- BB.W-SCROLL-MOTION: the orchestrated section-CASCADE host
                     (supersedes the bare BA.W-ANIMATE `[data-scroll-reveal]` 6px
                     fade — a clean break, no parallel alias). Each direct child (a
                     StorySection block) builds in on entry via its OWN view()
                     timeline keyed off the <main> scroller — the implicit stagger,
                     NO setTimeout cascade — but the entrance is now the spring-clocked
                     coupled transform+opacity build (the SOTA coordinated cascade,
                     scroll-choreography.css `.scroll-cascade`). PRM → static terminal
                     state + non-supporting engines the static layout (the recipe's
                     outer @media + @supports gate). -->
                <section
                    class="scroll-cascade"
                    :class="cn('flex flex-col gap-10', props.contentClass)"
                >
                    <slot />
                </section>
            </StoryHero>
        </article>
    </TooltipProvider>
</template>
