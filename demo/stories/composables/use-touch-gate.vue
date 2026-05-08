<script setup lang="ts">
// useTouchGate — touch-vs-pointer disambiguation with a deactivation timer.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { useTouchGate } from "../../../src/composables/useTouchGate";

const gate = useTouchGate(3000);
</script>

<template>
    <StoryPage>
        <StorySection
            label="touch-vs-pointer disambiguation"
            blurb="Distinguishes touch sessions from pointer sessions. Returns { isActive, isTouchDevice, handleTouchStart, handleScrollCheck, handleTouchEnd, resetTimer, deactivate, suppressDeactivate }. Used internally by hover-popover, dock primitives, and other components that hide hover-only affordances on touch."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-3">
                    <div class="grid grid-cols-2 gap-3 text-sm">
                        <div class="rounded-md border border-border bg-card p-3">
                            <code class="fira-code text-mono-caption">isActive</code>
                            <p class="text-display-3 font-mono">{{ gate.isActive.value }}</p>
                        </div>
                        <div class="rounded-md border border-border bg-card p-3">
                            <code class="fira-code text-mono-caption">isTouchDevice</code>
                            <p class="text-display-3 font-mono">{{ gate.isTouchDevice }}</p>
                        </div>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
