<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { cn } from "../../../src/utils/cn";

// The storybook front-door hero declares a live aurora wash on its manifest row;
// the page chassis renders it behind a glassy hero card so the title sits glass-
// first over the brand painterly drift. The body here is just the hero copy + the
// category index — the substrate comes from the container layer.

// Anchor links to every category — resolved by the router via the manifest.
const categories: { slug: string; title: string; blurb: string }[] = [
    { slug: "foundations", title: "Foundations", blurb: "Colors, type, radii, shadows, motion, paper & glass." },
    { slug: "primitives", title: "Primitives", blurb: "Buttons, inputs, toggles, sliders, chips." },
    { slug: "containers", title: "Containers", blurb: "Cards, dialogs, sheets, popovers, menus." },
    { slug: "navigation", title: "Navigation", blurb: "Tabs, docks, carousels, command." },
    { slug: "data", title: "Data", blurb: "Tables, trees, tags, avatars, sortable lists." },
    { slug: "feedback", title: "Feedback", blurb: "Toasts, progress, skeletons, alerts." },
    { slug: "motion", title: "Motion", blurb: "Transitions, springs, scroll-driven type." },
    { slug: "compositions", title: "Compositions", blurb: "Heroes, dashboards, math-paper, auth." },
];
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

        <!-- Category index — one card per category, linked via router. -->
        <section class="mt-16">
            <p class="text-admin-label mb-4 text-muted-foreground">Categories</p>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <a
                    v-for="cat in categories"
                    :key="cat.slug"
                    :href="`#/${cat.slug}`"
                    :class="
                        cn(
                            'group relative focus-ring flex flex-col gap-[calc(0.5rem_+_var(--density-gap,0rem))] rounded-card border border-border bg-card p-[calc(1.25rem_+_var(--density-pad,0rem))]',
                            'shadow-[var(--shadow-card)] transition-transform duration-normal ease-out',
                            'hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--story-card-shadow-hover)]',
                        )
                    "
                    style="--story-card-shadow-hover: var(--shadow-card-hover, var(--shadow-cartoon-hover));"
                >
                    <span class="text-subheading text-foreground">{{ cat.title }}</span>
                    <span class="text-small text-muted-foreground">{{ cat.blurb }}</span>
                </a>
            </div>
        </section>
    </StoryPage>
</template>
