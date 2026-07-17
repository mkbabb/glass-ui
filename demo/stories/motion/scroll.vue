<script setup lang="ts">
// The Motion Scroll family.
// The three scroll registers (native scroll-driven · the reader trigger system · the
// choreography register) render as THREE <StorySection> registers on this ONE page in
// dependency order (native → reader → choreography). Each render body lives bare
// in a colocated PascalCase body sub-component (Scroll{Native,Reader,Choreography}Body) —
// no per-member wrapper route or <FamilyTabs> switcher (clean break).
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ScrollNativeBody from "./scroll/ScrollNativeBody.vue";
import ScrollReaderBody from "./scroll/ScrollReaderBody.vue";
import ScrollChoreographyBody from "./scroll/ScrollChoreographyBody.vue";
</script>

<template>
    <StoryPage>
        <!-- The motion band's ONE coherent color event — the ink-mark underline reads
             the demo-local --motion-accent violet (the --viz-legendre twin; never a
             library token). -->
        <div
            :style="{
                '--paper-ink-mark-color': 'var(--motion-accent)',
                '--section-label-accent': 'var(--motion-accent)',
            }"
            class="flex flex-col gap-8"
        >
            <StorySection heading="Native scroll-driven">
                <ScrollNativeBody />
            </StorySection>

            <StorySection heading="Reader trigger system">
                <ScrollReaderBody />
            </StorySection>

            <StorySection heading="Choreography">
                <ScrollChoreographyBody />
            </StorySection>
        </div>
    </StoryPage>
</template>
