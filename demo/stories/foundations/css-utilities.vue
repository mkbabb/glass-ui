<script setup lang="ts">
// scale-on-hover — the hover-transform utility.
//
// Single-token recipe over --scale-hover (default 1.08). Replaces
// `hover:scale-105`-style arbitrary-scale recipes across consumers
// across consuming demos. Transition
// + easing bind to --duration-fast + --ease-standard.
import { Heart, Sparkles, Star, Zap } from "@lucide/vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="default --scale-hover = 1.08"
            blurb="Hover any of the four chips — each lifts to 108% scale with `--duration-fast` + `--ease-standard`. The utility is a single-rule recipe: `transform: scale(var(--scale-hover))` plus a transition-transform shorthand."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-center justify-center gap-6">
                    <!-- the demo glyphs read the IDENTITY
                         palette (`--section-color-N`), not raw Tailwind off-brand
                         hues (the stray-blue idiom-adherence sweep — the "WTF is
                         this blue" close). Each glyph pops one ramp stop. -->
                    <div class="scale-on-hover flex h-14 w-14 items-center justify-center rounded-full bg-card border border-border shadow-cartoon">
                        <Heart class="h-5 w-5" :style="{ color: 'var(--section-color-8)' }" />
                    </div>
                    <div class="scale-on-hover flex h-14 w-14 items-center justify-center rounded-full bg-card border border-border shadow-cartoon">
                        <Star class="h-5 w-5" :style="{ color: 'var(--section-color-2)' }" />
                    </div>
                    <div class="scale-on-hover flex h-14 w-14 items-center justify-center rounded-full bg-card border border-border shadow-cartoon">
                        <Sparkles class="h-5 w-5" :style="{ color: 'var(--section-color-7)' }" />
                    </div>
                    <div class="scale-on-hover flex h-14 w-14 items-center justify-center rounded-full bg-card border border-border shadow-cartoon">
                        <Zap class="h-5 w-5" :style="{ color: 'var(--section-color-5)' }" />
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="per-instance --scale-hover override"
            blurb="Override the token at any ancestor scope to retune the lift. The utility re-reads on every hover — no recompile needed."
        >
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <ShowcaseFrame pad="md" tier="quiet" class="scope-subtle">
                    <div class="flex flex-col items-center gap-2">
                        <div class="scale-on-hover h-12 w-12 rounded-card bg-primary text-primary-foreground" />
                        <code class="fira-code text-mono-caption">1.04</code>
                        <span class="text-mono-caption text-muted-foreground">subtle</span>
                    </div>
                </ShowcaseFrame>
                <ShowcaseFrame pad="md" tier="quiet" class="scope-default">
                    <div class="flex flex-col items-center gap-2">
                        <div class="scale-on-hover h-12 w-12 rounded-card bg-primary text-primary-foreground" />
                        <code class="fira-code text-mono-caption">1.08</code>
                        <span class="text-mono-caption text-muted-foreground">default</span>
                    </div>
                </ShowcaseFrame>
                <ShowcaseFrame pad="md" tier="quiet" class="scope-boomed">
                    <div class="flex flex-col items-center gap-2">
                        <div class="scale-on-hover h-12 w-12 rounded-card bg-primary text-primary-foreground" />
                        <code class="fira-code text-mono-caption">1.15</code>
                        <span class="text-mono-caption text-muted-foreground">boomed</span>
                    </div>
                </ShowcaseFrame>
                <ShowcaseFrame pad="md" tier="quiet" class="scope-audacious">
                    <div class="flex flex-col items-center gap-2">
                        <div class="scale-on-hover h-12 w-12 rounded-card bg-primary text-primary-foreground" />
                        <code class="fira-code text-mono-caption">1.25</code>
                        <span class="text-mono-caption text-muted-foreground">audacious</span>
                    </div>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            label="token surface"
            blurb="One token, one utility, one transition recipe."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <ul class="text-prose text-muted-foreground list-disc pl-5 space-y-1">
                    <li>
                        <code class="fira-code bg-muted px-1 rounded">--scale-hover</code>
                        — default 1.08; consumers retune at any ancestor scope.
                    </li>
                    <li>
                        Transition: <code class="fira-code">--duration-fast</code> +
                        <code class="fira-code">--ease-standard</code>.
                    </li>
                    <li>
                        Sibling token <code class="fira-code">--scale-hover-dock</code> (default 1.1) lives in the
                        dock geometry block — keep the hover ladder visually homogenous across substrates.
                    </li>
                </ul>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.scope-subtle {
    --scale-hover: 1.04;
}
.scope-default {
    --scale-hover: 1.08;
}
.scope-boomed {
    --scale-hover: 1.15;
}
.scope-audacious {
    --scale-hover: 1.25;
}
</style>
