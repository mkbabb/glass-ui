<script setup lang="ts">
import { computed } from "vue";
import StoryPage from "../StoryPage.vue";
import { cn } from "../../../src/utils/cn";
import { CATEGORIES } from "../manifest";

// The storybook front-door hero declares a live aurora wash on its manifest row;
// the page chassis renders it behind a glassy hero card so the title sits glass-
// first over the brand painterly drift. The body here is just the hero copy + the
// category index — the substrate comes from the container layer.

// Per-category one-line summaries for the front-door index. The category SET is
// derived from the live manifest (the single source the rail + docks read) so
// the front door always names the real IA; this map only carries the prose. A
// category with no summary here still renders, captioned by its first story.
const SUMMARIES: Record<string, string> = {
    foundations: "Colors, type, radii, shadows, motion, paper & glass.",
    substrates: "Aurora, GooBlob, the constellation lattice, the Fourier field.",
    forms: "Inputs, selects, toggles, sliders, chips.",
    display: "Buttons, cards, badges, metrics, status.",
    containers: "Dialogs, sheets, popovers, menus, tooltips.",
    navigation: "Tabs, deck progress, carousels.",
    dock: "The GlassDock — the headline glass primitive.",
    data: "Tables, trees, tags, avatars, sortable lists, timelines.",
    feedback: "Toasts, progress, skeletons, alerts.",
    motion: "Springs, count-up, reveal, typewriter.",
    compositions: "Heroes, dashboards, math-paper, auth shells.",
};

// The first item leads the grid (a wider span); the rest rest — a small
// lead/rest rhythm so the set is not eight identical boxes.
const categories = computed(() =>
    CATEGORIES.filter((c) => !c.reference).map((c, idx) => ({
        slug: c.id,
        title: c.title,
        blurb: SUMMARIES[c.id] ?? c.stories[0]?.blurb ?? "",
        lead: idx === 0,
    })),
);
</script>

<template>
    <StoryPage>
        <!-- The hero copy sits glass-first over the live aurora the chassis
             renders behind this card. -->
        <section class="px-2 py-12 md:px-6 md:py-20">
            <p class="text-admin-label mb-6 text-muted-foreground">
                glass-ui · storybook
            </p>

            <!-- Brand wordmark: ℱ ornament + brand serif " glass-ui", both
                 set in the published Plus Jakarta Sans display face. -->
            <div class="mb-10 flex items-baseline gap-1 font-display">
                <span class="fourier-f text-display-3 italic">ℱ</span>
                <span class="cm-serif text-display-2 text-foreground"> glass-ui</span>
            </div>

            <h1 class="text-display-4 mb-8 max-w-4xl text-foreground">
                Glass, paper, and the golden ratio.
            </h1>

            <p class="text-prose max-w-2xl text-foreground/80">
                A design system built around warm cream, cartoon offset shadows, and
                the published Plus Jakarta Sans brand face for prose and ornament.
                Tailwind-native, Vue 3.5, reka-ui primitives under the hood. Every token
                reachable as a utility; every component honest about its four states.
            </p>
        </section>

        <!-- Category index — one glass card per category, navigating to the
             category's first story via the router. The cards ride the resting
             glass rung so the aurora the chassis paints reads THROUGH them. -->
        <section class="mt-16">
            <p class="text-admin-label mb-4 text-muted-foreground">Categories</p>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <RouterLink
                    v-for="cat in categories"
                    :key="cat.slug"
                    :to="`/${cat.slug}`"
                    :class="
                        cn(
                            'glass-resting paper-grain-overlay group relative focus-ring flex flex-col gap-[calc(0.5rem_+_var(--density-gap,0rem))] rounded-card border border-[var(--glass-border-quiet)] p-[calc(1.25rem_+_var(--density-pad,0rem))]',
                            'shadow-[var(--shadow-card)] transition-transform duration-normal ease-out',
                            'hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--story-card-shadow-hover)]',
                            cat.lead && 'sm:col-span-2',
                        )
                    "
                    style="--story-card-shadow-hover: var(--shadow-card-hover, var(--shadow-cartoon-hover));"
                >
                    <span
                        :class="
                            cn(
                                'text-foreground',
                                cat.lead ? 'text-heading' : 'text-subheading',
                            )
                        "
                        >{{ cat.title }}</span
                    >
                    <span class="text-small text-muted-foreground">{{ cat.blurb }}</span>
                </RouterLink>
            </div>
        </section>
    </StoryPage>
</template>
