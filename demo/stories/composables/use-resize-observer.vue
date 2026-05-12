<script setup lang="ts">
// useResizeObserver — threshold + rafBatch options for sub-pixel storms.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { useResizeObserver } from "../../../src/composables/dom/useResizeObserver";

const target = ref<HTMLElement | null>(null);
const size = ref<{ width: number; height: number }>({ width: 0, height: 0 });
const callbackCount = ref(0);

useResizeObserver(target, (rect) => {
    size.value = { width: Math.round(rect.width), height: Math.round(rect.height) };
    callbackCount.value += 1;
});
</script>

<template>
    <StoryPage>
        <StorySection
            label="rafBatch + threshold"
            blurb="Drag the bottom-right corner of the resizable box. rafBatch coalesces sub-pixel resize events into a single rAF tick; threshold filters movements smaller than the given delta."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-4">
                    <div
                        ref="target"
                        class="resize overflow-auto rounded-md border-2 border-border bg-card p-4"
                        style="min-width: 120px; min-height: 80px; width: 320px; height: 160px;"
                    >
                        <p class="text-mono-caption text-muted-foreground">resize me ↘</p>
                    </div>
                    <div class="grid grid-cols-3 gap-2 text-sm">
                        <div>width: <code class="fira-code">{{ size.width }}px</code></div>
                        <div>height: <code class="fira-code">{{ size.height }}px</code></div>
                        <div>callbacks: <code class="fira-code">{{ callbackCount }}</code></div>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
