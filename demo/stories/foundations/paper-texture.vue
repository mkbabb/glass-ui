<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";

const sections = [
    [
        "One material owner",
        "The route chooses the paper context once. Content inherits that decision instead of carrying opacity, frequency, or texture variants from panel to panel.",
    ],
    [
        "A quiet reading rhythm",
        "Warm tooth supports the page without competing with headings, rules, or ink. The same field continues behind long prose rather than restarting at each section boundary.",
    ],
    [
        "Environment-resolved",
        "Light and dark choose their physical blend law; reduced transparency removes the grain; print leaves the synthetic tooth behind because the sheet already provides it.",
    ],
] as const;
</script>

<template>
    <StoryPage>
        <StorySection
            label="shared content field"
            blurb="The `.paper-underpaint` recipe mounts once. The route owns context through inherited paper variables; nothing introduces a second material system."
        >
            <ShowcaseFrame
                pad="none"
                class="paper-field-example relative overflow-hidden"
            >
                <div class="paper-underpaint" aria-hidden="true" />
                <article class="relative mx-auto max-w-prose px-8 py-12 sm:px-12 sm:py-16">
                    <header class="space-y-3 pb-8">
                        <p class="text-label text-muted-foreground">Paper as content field</p>
                        <h3 class="text-display-3 text-foreground">A quiet field behind content</h3>
                        <p class="text-prose text-muted-foreground">
                            One semantic mount carries the shared paper recipe through an
                            extended reading surface.
                        </p>
                    </header>

                    <section
                        v-for="[heading, body] in sections"
                        :key="heading"
                        class="space-y-3 border-t border-border/50 py-8"
                    >
                        <h4 class="text-title text-foreground">{{ heading }}</h4>
                        <p class="text-prose text-muted-foreground">{{ body }}</p>
                    </section>
                </article>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.paper-field-example {
    contain: paint;
    background: var(--background);
}
</style>
