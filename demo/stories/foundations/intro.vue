<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { cn } from "@/utils/cn";

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
        <!-- Hero wash: pastel radial bloom behind audacious display title. -->
        <section
        :class="
            cn(
                'relative overflow-hidden rounded-card px-8 py-20 md:px-16 md:py-32',
                'bg-[radial-gradient(ellipse_80%_70%_at_20%_20%,color-mix(in_srgb,var(--rainbow-pastel-red)_45%,transparent),transparent_60%),radial-gradient(ellipse_70%_60%_at_80%_30%,color-mix(in_srgb,var(--rainbow-pastel-blue)_40%,transparent),transparent_55%),radial-gradient(ellipse_75%_65%_at_50%_90%,color-mix(in_srgb,var(--rainbow-pastel-yellow)_35%,transparent),transparent_60%)]',
                'paper-grain-overlay'
            )
        "
    >
        <p class="text-admin-label mb-6 text-muted-foreground">
            glass-ui · storybook
        </p>

        <!-- Brand wordmark: Fraunces WONK ℱ + CM serif " glass-ui". -->
        <div class="mb-10 flex items-baseline gap-1 font-display">
            <span
                class="fourier-f text-display-3 italic"
                style="font-variation-settings: 'WONK' 1, 'SOFT' 0;"
                >ℱ</span
            >
            <span class="cm-serif text-display-2 text-foreground"> glass-ui</span>
        </div>

        <h1 class="text-display-4 mb-8 max-w-4xl text-foreground">
            Glass, paper, and the golden ratio.
        </h1>

        <p class="text-prose max-w-2xl text-foreground/80">
            A design system built around warm cream, cartoon offset shadows, Computer
            Modern for prose, and Fraunces for ornament. Tailwind-native, Vue 3.5,
            reka-ui primitives under the hood. Every token reachable as a utility;
            every component honest about its four states.
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
                        'group relative flex flex-col gap-2 rounded-card border border-border bg-card p-5',
                        'shadow-cartoon transition-transform duration-normal ease-out',
                        'hover:-translate-x-px hover:-translate-y-px hover:shadow-cartoon-hover',
                        'focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]'
                    )
                "
            >
                <span class="text-subheading text-foreground">{{ cat.title }}</span>
                <span class="text-small text-muted-foreground">{{ cat.blurb }}</span>
            </a>
        </div>
    </section>
    </StoryPage>
</template>
