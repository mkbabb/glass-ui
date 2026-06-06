<script setup lang="ts">
// PaperBackdrop — paper-grain texture substrate, two frequencies + opacity.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { PaperBackdrop } from "../../../src/subpaths/paper-backdrop";

const opacity = ref(0.5);
</script>

<template>
    <StoryPage>
        <StorySection
            label="frequency: clean | aged"
            blurb="Two SVG turbulence textures: clean (default — fine, even grain) vs aged (coarser, more variation). The texture lives at --paper-aged-texture for the aged branch."
        >
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ShowcaseFrame pad="none" class="relative h-48 overflow-hidden">
                    <PaperBackdrop frequency="clean" />
                    <div class="relative grid h-full place-items-center">
                        <code class="fira-code text-mono-caption">clean</code>
                    </div>
                </ShowcaseFrame>
                <ShowcaseFrame pad="none" class="relative h-48 overflow-hidden">
                    <PaperBackdrop frequency="aged" />
                    <div class="relative grid h-full place-items-center">
                        <code class="fira-code text-mono-caption">aged</code>
                    </div>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            label="opacity knob"
            blurb="Override --glass-grain-opacity per-instance. Useful when the backdrop sits over a busy substrate that needs the grain damped."
        >
            <ShowcaseFrame pad="none" class="relative h-40 overflow-hidden">
                <PaperBackdrop :opacity="opacity" />
                <div class="relative flex h-full items-center justify-center gap-4">
                    <code class="fira-code text-mono-caption">opacity={{ opacity.toFixed(2) }}</code>
                    <input v-model.number="opacity" type="range" min="0" max="1" step="0.05" />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="layered composition"
            blurb="PaperBackdrop sits behind any content; the surrounding host owns the radius + clip. Pair with Card or ShowcaseFrame to add the grain on demand."
        >
            <div class="relative overflow-hidden rounded-card border border-border">
                <PaperBackdrop frequency="clean" />
                <div class="relative p-10">
                    <h3 class="text-display-3 text-foreground">Paper-tier surface</h3>
                    <p class="text-prose text-muted-foreground">
                        The grain lives behind the content. Hover, focus, and active states paint
                        atop without disturbing the texture.
                    </p>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
