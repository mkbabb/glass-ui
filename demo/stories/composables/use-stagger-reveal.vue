<script setup lang="ts">
// useStaggerReveal — IntersectionObserver-gated entrance cascade.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { useStaggerReveal } from "../../../src/composables/motion/useStaggerReveal";

const { register, revealed } = useStaggerReveal({ staggerMs: 80, threshold: 0.2 });
</script>

<template>
    <StoryPage>
        <StorySection
            label="reveal-on-scroll cascade"
            blurb="IntersectionObserver-gated entrance cascade. Each registered target reveals in sequence as it crosses the viewport threshold. Visual demo lives at Motion / Stagger Reveal."
        >
            <ShowcaseFrame pad="lg">
                <div class="h-[60vh] overflow-y-auto rounded-md border border-border bg-card">
                    <div class="p-4">
                        <p class="text-prose mb-32 text-muted-foreground">↓ scroll to reveal</p>
                        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div
                                v-for="i in 9"
                                :key="i"
                                :ref="(el) => register(el as HTMLElement, i - 1)"
                                class="rounded-md border border-border bg-background p-6 transition-[transform,opacity] duration-500"
                                :class="revealed[i - 1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
                            >
                                <code class="fira-code">slot {{ i }}</code>
                            </div>
                        </div>
                        <p class="text-prose mt-32 text-muted-foreground">↑ scroll back</p>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
