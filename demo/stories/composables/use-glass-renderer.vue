<script setup lang="ts">
// useGlassRenderer — detection cascade probe (svg-filter / css / fallback).
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { useGlassRenderer } from "../../../src/composables/glass/useGlassRenderer";

const auto = useGlassRenderer();
const forcedSvg = useGlassRenderer({ preferredTier: "svg-filter" });
const forcedCss = useGlassRenderer({ preferredTier: "css" });
const forcedFallback = useGlassRenderer({ preferredTier: "fallback" });
</script>

<template>
    <StoryPage>
        <StorySection
            label="detection cascade"
            blurb="The renderer probes Chromium SVG-filter → CSS backdrop-filter → fallback. Each call returns the picked tier; preferredTier overrides when the host supports it."
        >
            <ShowcaseFrame pad="md">
                <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div class="rounded-md border border-border bg-card p-3">
                        <code class="fira-code text-mono-caption text-muted-foreground">auto</code>
                        <p class="text-sm mt-1"><code class="fira-code">{{ auto.tier }}</code></p>
                    </div>
                    <div class="rounded-md border border-border bg-card p-3">
                        <code class="fira-code text-mono-caption text-muted-foreground">force=svg-filter</code>
                        <p class="text-sm mt-1"><code class="fira-code">{{ forcedSvg.tier }}</code></p>
                    </div>
                    <div class="rounded-md border border-border bg-card p-3">
                        <code class="fira-code text-mono-caption text-muted-foreground">force=css</code>
                        <p class="text-sm mt-1"><code class="fira-code">{{ forcedCss.tier }}</code></p>
                    </div>
                    <div class="rounded-md border border-border bg-card p-3">
                        <code class="fira-code text-mono-caption text-muted-foreground">force=fallback</code>
                        <p class="text-sm mt-1"><code class="fira-code">{{ forcedFallback.tier }}</code></p>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
