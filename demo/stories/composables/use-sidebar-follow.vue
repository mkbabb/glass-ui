<script setup lang="ts">
// useSidebarFollow — sticky / follow-cursor sidebar behaviour.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="sticky / follow-cursor sidebar"
            blurb="Drives the sticky-while-scrolling + follow-the-active-section behaviour for nested sidebars. Pairs with useScrollTracker for active-state and useTreeIndex for the section graph."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre v-pre class="fira-code text-sm overflow-x-auto"><code>const { offsetTop, isFollowing } = useSidebarFollow({
  sidebar: sidebarEl,
  activeSection: scrollTracker.activeId,
  followMargin: 24,
});</code></pre>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="see also"
            blurb="Live composition: Navigation / Sidebar (the dedicated primitive demo). useSidebarState orchestrates this composable + useScrollTracker + useTreeIndex into a single API."
        />
    </StoryPage>
</template>
