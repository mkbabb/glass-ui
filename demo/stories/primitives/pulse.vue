<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { Pulse } from "../../../src/components/custom/pulse";
</script>

<template>
    <StoryPage>
        <!-- Dots: vary speed and count. -->
        <StorySection label="dots variant">
            <div class="flex flex-wrap items-center gap-8">
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" speed="slow" :count="3" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">slow · 3</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" speed="normal" :count="3" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">normal · 3</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" speed="fast" :count="3" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">fast · 3</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" :count="5" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">5 dots</span>
                </div>
            </div>
        </StorySection>

        <!-- Ring: speed variants. -->
        <StorySection label="ring variant">
            <div class="flex flex-wrap items-center gap-8">
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="ring" speed="slow" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">slow</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="ring" speed="normal" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">normal</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="ring" speed="fast" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">fast</span>
                </div>
            </div>
        </StorySection>

        <!-- currentColor demo — tint by setting text color. -->
        <StorySection label="currentColor tint">
            <div class="flex flex-wrap items-center gap-8">
                <Pulse variant="dots" class="text-viz-fourier" />
                <Pulse variant="dots" class="text-viz-chebyshev" />
                <Pulse variant="dots" class="text-viz-legendre" />
                <Pulse variant="ring" class="text-viz-fourier" />
            </div>
        </StorySection>

        <!-- Inline in a status line. -->
        <StorySection label="inline usage">
            <div
                class="flex items-center gap-3 rounded-card border border-border bg-card px-4 py-3"
            >
                <Pulse variant="dots" class="text-viz-chebyshev" />
                <span class="text-small text-foreground">Computing projection…</span>
            </div>
        </StorySection>
    </StoryPage>
</template>
