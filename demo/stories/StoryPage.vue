<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../src/utils/cn";
import { TooltipProvider } from "../../src/components/ui/tooltip";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import StoryHero from "./StoryHero.vue";
import StoryHeader from "./StoryHeader.vue";

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
    /**
     * BC.W-PAGE-HIERARCHY — the section-delimiter chassis affordance (Part B).
     * Default `true`: consecutive top-level body sections are separated by a
     * visible hairline rule on the dark-adaptive `--configurator-divider` token
     * (so the seam survives the dark glass plate — CLAUDE.md §BA.W-CONFIG-CHASSIS),
     * applied AUTOMATICALLY by the chassis (no per-SFC hand-rolled `<hr>`). A page
     * whose body is its OWN single composition (a bento landing, a front-door
     * grid, a scene with a bespoke interior) sets `:delimited="false"` so the
     * chassis draws no inter-section seams. The user's "delimit sections with hr
     * lines OR in different cards" bar (USER-DEFECTS §C) — the `hr` mode.
     */
    delimited?: boolean;
}

const props = withDefaults(defineProps<StoryPageProps>(), {
    heroTitle: true,
    delimited: true,
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

// BC.W-PAGE-CHASSIS — the explicit subpath chip + the depth-keyed hero rung resolve
// from the manifest row (the binding per-route table) and thread to the chassis.
const subpath = computed(() => current.value?.story.subpath ?? null);
const heroScale = computed(() => current.value?.story.heroScale ?? "4");
const depth = computed(() => current.value?.story.depth);
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
        <!-- BC.W-STORYBOOK-META — the article width is the tokenized rhythm
             (`--story-page-max-inline`, was `max-w-6xl`) so every page is bounded
             to the SAME generous-whitespace width (axis-3). -->
        <article
            class="scroll-build story-page-article mx-auto w-full"
            :style="{ maxInlineSize: 'var(--story-page-max-inline)' }"
        >
            <!-- BC.W-PAGE-CHASSIS — the chrome <header> hosts the AUDACIOUS hero cluster
                 on a CONTENT page (variant="page"): the ONE standardized page idiom
                 (the user-mandate uniformity — EVERY page carries the LARGE audacious
                 title + the explicit Fira-Code subpath chip that SHRINKS ON SCROLL).
                 The cluster is the StoryHeader unit in reading order (eyebrow → subpath
                 → display <h1> → blurb), the display <h1> at the per-route depth-keyed
                 `heroScale` rung (≥ text-display-4 — the prior text-title 32.9px chrome
                 title is RETIRED), wrapped in the `.story-hero-shrink` sticky register
                 so it shrinks into a slim sticky header on scroll (the iOS-27 large-title
                 collapse). On a HERO page this whole chrome header is suppressed — the
                 descriptor is re-homed INTO the StoryHero cluster over the live field
                 (the D1-4 double-<h1> suppression). -->
            <header v-if="variant === 'page'" :style="{ '--i': 0 }">
                <StoryHeader
                    :eyebrow="eyebrow"
                    :subpath="subpath"
                    :blurb="blurb"
                    class="story-hero-cluster story-hero-shrink"
                    :data-depth="depth"
                >
                    <h1
                        v-if="title"
                        :class="
                            cn(
                                'story-hero-title story-hero-title--enter',
                                `text-display-${heroScale}`,
                            )
                        "
                    >
                        {{ title }}
                    </h1>
                </StoryHeader>
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
                :subpath="subpath"
                :blurb="blurb"
                :hero-scale="heroScale"
                :depth="depth"
                :hero-title="props.heroTitle"
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
                <!-- BC.W-PAGE-HIERARCHY (Part B) — the section-delimiter chassis
                     affordance. `.story-sections--delimited` draws a visible
                     hairline on the dark-adaptive `--configurator-divider` token
                     BETWEEN consecutive top-level body sections (the `> * + *`
                     adjacent-sibling seam), so the page reads as cleanly DELIMITED
                     sections — never an undelimited gap-stack where every block
                     blurs into the next (USER-DEFECTS §C). The seam is a hairline
                     whisper (the `.glass-menu-section` register precedent), reading
                     the dark-adaptive token so it survives the dark glass plate —
                     NEVER an inline `border-border/N` alpha. The delimiter sits
                     INSIDE the `.scroll-cascade` build (it does not re-author the
                     section-entrance). -->
                <!-- BC.W-STORYBOOK-META — the inter-section gap is the tokenized
                     rhythm (`--story-page-section-gap`, was the hardcoded `gap-10`)
                     so every page's section cadence is the SAME measured rhythm
                     (axis-3; the meta-gate asserts ≥ this minimum, no cramped page). -->
                <section
                    class="scroll-cascade story-sections flex flex-col"
                    :style="{ gap: 'var(--story-page-section-gap)' }"
                    :class="
                        cn(
                            props.delimited && 'story-sections--delimited',
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
